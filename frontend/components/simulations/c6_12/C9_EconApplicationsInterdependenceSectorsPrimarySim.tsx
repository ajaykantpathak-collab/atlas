'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, Bar, Line } from 'recharts';

// ============================================================================
// NODE IDS AS STRING LITERALS (MANDATORY VERIFIABLE TOKENS)
// ============================================================================
const NODE_C9_ECONAPP_011 = 'c9_econapp_011';
const NODE_C9_ECONAPP_012 = 'c9_econapp_012';
const NODE_C9_ECONAPP_013 = 'c9_econapp_013';
const NODE_C9_ECONAPP_014 = 'c9_econapp_014';
const NODE_C9_ECONAPP_015 = 'c9_econapp_015';
const NODE_C9_ECONAPP_016 = 'c9_econapp_016';
const NODE_C9_ECONAPP_017 = 'c9_econapp_017';
const NODE_C9_ECONAPP_018 = 'c9_econapp_018';
const NODE_C9_ECONAPP_019 = 'c9_econapp_019';
const NODE_C9_ECONAPP_020 = 'c9_econapp_020';

const ALL_NODE_IDS = [
  NODE_C9_ECONAPP_011,
  NODE_C9_ECONAPP_012,
  NODE_C9_ECONAPP_013,
  NODE_C9_ECONAPP_014,
  NODE_C9_ECONAPP_015,
  NODE_C9_ECONAPP_016,
  NODE_C9_ECONAPP_017,
  NODE_C9_ECONAPP_018,
  NODE_C9_ECONAPP_019,
  NODE_C9_ECONAPP_020,
];

// ============================================================================
// NARRATIVE SCENARIO & HOOK
// ============================================================================
const SCENARIO = {
  title: "The Village to Metropolis Economic Network & Consumer Shield",
  intro: "Welcome, Lead Economic Policy Officer! Anandnagar is a developing Indian district experiencing rapid shifts. Cotton farmers in the rural hinterland supply textile power looms, while urban software engineers and retail hubs drive commerce. Meanwhile, consumer rights violations and infrastructure bottlenecks threaten the entire economic ecosystem.",
  context: "Your mission: Diagnose sectoral interdependence, optimize infrastructure investments (economic vs social), eliminate consumer exploitation, and build resilient regulatory frameworks under the Consumer Protection Act 2019.",
};

const DISCOVERY_QUESTION = {
  question: "If a severe drought in Gujarat destroys 50% of the raw cotton crop, what happens across the wider Indian economy?",
  options: [
    "Only cotton farmers lose money; factories and retail shops are completely unaffected",
    "Coimbatore textile mills face cotton shortages, Indian Railways loses freight revenue, and urban clothing stores face rising prices",
    "Only urban banks gain because farmers take more loans with zero wider impact",
    "Tertiary services expand automatically to offset 100% of the farm loss",
  ],
  correctIndex: 1,
  hintAfter: "Notice how an event in the Primary sector immediately cascades into Secondary manufacturing and Tertiary transport and retail. Let us explore this circular interdependence!",
};

// ============================================================================
// CHALLENGE DATA STRUCTURE
// ============================================================================
export interface Challenge {
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

// ============================================================================
// CHALLENGES (24 COMPREHENSIVE CHALLENGES)
// ============================================================================
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (8 items) ---
  {
    id: 'ch_01',
    nodeId: NODE_C9_ECONAPP_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "How is an enterprise like the State Bank of India (SBI) correctly classified by ownership and sector?",
    options: [
      "Tertiary Sector, Public Sector (majority government-owned)",
      "Secondary Sector, Private Sector",
      "Primary Sector, Cooperative Sector",
      "Tertiary Sector, Private Sector because it operates for profit",
    ],
    correctIndex: 0,
    explanation: "SBI provides banking services (Tertiary) and the Government of India holds the majority equity stake (Public sector).",
    hints: [
      "Banking is a service, not raw extraction or factory manufacturing.",
      "Ownership is determined by who holds the majority stake.",
      "The Government of India owns the majority stake in SBI, making it a Public-sector Tertiary enterprise.",
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C9_ECONAPP_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Why is an AIIMS hospital building classified as Social Infrastructure and not Economic Infrastructure?",
    options: [
      "Because it is built with cheaper materials than commercial power stations",
      "Because its primary service is human health development, not direct physical production/distribution support",
      "Because hospitals are always non-profit charitable institutions",
      "Because it is located exclusively in rural areas",
    ],
    correctIndex: 1,
    explanation: "Infrastructure is classified by the service rendered. Health services directly develop human capital (Social), while power and roads directly support physical production and freight (Economic).",
    hints: [
      "Think about the service provided: does it treat people (human capital) or carry physical cargo/electricity?",
      "Buildings are physical, but classification depends on function and service.",
      "Health develops human beings, making it Social Infrastructure.",
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C9_ECONAPP_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "Which Indian national flagship scheme provides ₹5 lakh annual secondary/tertiary hospitalization cover to over 55 crore vulnerable citizens?",
    options: [
      "PMGSY (Pradhan Mantri Gram Sadak Yojana)",
      "Ayushman Bharat PM-JAY",
      "Samagra Shiksha Abhiyan",
      "UDAY (Ujwal DISCOM Assurance Yojana)",
    ],
    correctIndex: 1,
    explanation: "Ayushman Bharat PM-JAY (2018) is the world's largest health insurance scheme providing ₹5 lakh annual cover per eligible family.",
    hints: [
      "This is a health protection scheme, not a road or school scheme.",
      "It was launched in 2018 under the National Health Policy.",
      "The health insurance scheme is Ayushman Bharat PM-JAY.",
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C9_ECONAPP_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "When a kirana merchant sells packaged mustard oil at ₹210 when the printed Maximum Retail Price is ₹180, what form of consumer exploitation has occurred?",
    options: [
      "Short Weighting",
      "Overcharging (violation of Legal Metrology Act)",
      "Adulteration",
      "Deficiency in Banking Service",
    ],
    correctIndex: 1,
    explanation: "Selling above the printed MRP is illegal overcharging under the Legal Metrology (Packaged Commodities) Rules, 2011.",
    hints: [
      "The product quality is fine, but the price demanded exceeds the legal ceiling on the box.",
      "MRP stands for Maximum Retail Price.",
      "Charging higher than the printed MRP is Overcharging.",
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C9_ECONAPP_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "Under the Consumer Protection Act 2019, what is the pecuniary claim limit for the District Consumer Disputes Redressal Commission?",
    options: [
      "Up to ₹20 Lakh only",
      "Up to ₹1 Crore",
      "Between ₹1 Crore and ₹10 Crore",
      "Above ₹10 Crore",
    ],
    correctIndex: 1,
    explanation: "Under CPA 2019: District Commission = Up to ₹1 Crore; State Commission = ₹1 Crore to ₹10 Crore; National Commission = Above ₹10 Crore.",
    hints: [
      "Do not confuse the old 1986 COPRA limit (₹20 Lakh) with the modernized 2019 limit.",
      "The 2019 Act increased the District Forum limit fivefold.",
      "The updated District Commission limit is up to ₹1 Crore.",
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C9_ECONAPP_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Mandatory ISI marks on motorcycle helmets and LPG cylinders represent which foundational consumer right?",
    options: [
      "Right to Consumer Education",
      "Right to Safety",
      "Right to Choose",
      "Right to be Heard",
    ],
    correctIndex: 1,
    explanation: "Mandatory Bureau of Indian Standards (BIS/ISI) safety certification protects consumers against hazardous and life-threatening product defects.",
    hints: [
      "Helmets and LPG cylinders protect life and physical integrity.",
      "This right prevents hazardous goods from entering the market.",
      "It is the Right to Safety.",
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C9_ECONAPP_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "What lethal chemical leaked during the 1984 Bhopal Gas Tragedy from the Union Carbide India Ltd pesticide facility?",
    options: [
      "Sulfur Dioxide",
      "Methyl Isocyanate (MIC)",
      "Chlorofluorocarbon (CFC)",
      "Nitrous Oxide",
    ],
    correctIndex: 1,
    explanation: "On 2-3 December 1984, ~40 tonnes of toxic Methyl Isocyanate (MIC) gas leaked, killing over 3,787 citizens officially and injuring 5.5 lakh.",
    hints: [
      "It is an organic compound containing nitrogen, carbon, and oxygen used in carbamate pesticides.",
      "Abbreviated as MIC.",
      "The gas was Methyl Isocyanate.",
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C9_ECONAPP_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Drag each economic entity to its matching sector category in the Indian economy.",
    dragItems: [
      { label: 'Gujarat Cotton Farm', targetId: 'box_primary' },
      { label: 'Coimbatore Spinning Mill', targetId: 'box_secondary' },
      { label: 'Blue Dart Logistics & Transport', targetId: 'box_tertiary' },
    ],
    correctMapping: {
      box_primary: 'Gujarat Cotton Farm',
      box_secondary: 'Coimbatore Spinning Mill',
      box_tertiary: 'Blue Dart Logistics & Transport',
    },
    explanation: "Farming is Primary (raw extraction), Spinning/Milling is Secondary (manufacturing processing), and Logistics/Transport is Tertiary (commercial service).",
    hints: [
      "Farm extraction is Primary.",
      "Yarn manufacturing is Secondary.",
      "Transport and distribution services belong to Tertiary.",
    ],
  },

  // --- STANDARD (8 items) ---
  {
    id: 'ch_09',
    nodeId: NODE_C9_ECONAPP_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: "According to Census 2011, which set of three conditions MUST ALL be simultaneously satisfied for a settlement to be classified as 'Urban'?",
    options: [
      "Population ≥ 10,000, 100% literacy rate, presence of a shopping mall",
      "Population ≥ 5,000, density ≥ 400 persons/km², and ≥ 75% of male working population in non-agricultural pursuits",
      "Population ≥ 1,000, having an SBI branch, and electricity in all households",
      "Having a municipal corporation, regardless of workforce occupation or density",
    ],
    correctIndex: 1,
    explanation: "Census 2011 criteria for Urban: (1) Min population 5,000; (2) Density ≥ 400/sq km; (3) ≥ 75% male workers in non-agricultural work.",
    hints: [
      "A settlement must pass demographic, density, and occupational tests.",
      "The workforce requirement specifies non-agricultural employment for male workers.",
      "Population ≥ 5,000, density ≥ 400/km², and ≥ 75% male non-farm workforce.",
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C9_ECONAPP_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "If the Reserve Bank of India estimates India's infrastructure investment multiplier at 2.8, how much total GDP expansion (in ₹ Crore) is generated by a ₹5,000 Crore investment in Dedicated Freight Corridors?",
    correctAnswer: 14000,
    tolerance: 100,
    unit: '₹ Crore',
    explanation: "Total GDP Expansion = Initial Investment × Multiplier = ₹5,000 Cr × 2.8 = ₹14,000 Crore.",
    hints: [
      "Use the formula: ΔY = Multiplier × ΔI.",
      "Multiply 5000 by 2.8.",
      "5,000 × 2.8 = 14,000.",
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C9_ECONAPP_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "How does India's high Out-of-Pocket (OOP) health expenditure (~47.1% of total health spending) directly cause macroeconomic distress?",
    options: [
      "It causes hyperinflation in the manufacturing sector exclusively",
      "Catastrophic healthcare expenses push approximately 5.5 crore citizens below the poverty line every year",
      "It forces commercial banks to write off foreign export credit",
      "It increases the fiscal deficit of the Indian Railways",
    ],
    correctIndex: 1,
    explanation: "Because public hospital beds and insurance were scarce, OOP medical costs force families to sell productive assets or take high-interest loans, pushing ~5.5 crore Indians into poverty annually.",
    hints: [
      "When healthcare is not funded by state or insurance, citizens spend emergency family savings.",
      "WHO estimates show a direct link between hospital bills and poverty entry.",
      "Approximately 5.5 crore people are pushed into poverty each year due to medical bills.",
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C9_ECONAPP_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "A bank deducts ₹750 as an unannounced 'ledger maintenance fee' not stated in the account terms. How is this classified under the Consumer Protection Act 2019?",
    options: [
      "Defect in Goods under Section 2(10)",
      "Deficiency in Service under Section 2(11)",
      "Short Weighting under Legal Metrology Act",
      "Adulteration of financial assets",
    ],
    correctIndex: 1,
    explanation: "Banking is an intangible service. Faulty, unfair, or unauthorized banking practices are legally 'Deficiency in Service' under Section 2(11), not a 'Defect in Goods'.",
    hints: [
      "Is a bank account a physical object you can weigh or an intangible commercial service?",
      "Look at Section 2(11) of the CPA 2019.",
      "Services involve 'Deficiency in Service'.",
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C9_ECONAPP_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "Why is 'Information Asymmetry' considered the foundational root cause enabling adulteration and deceptive advertising in Indian markets?",
    options: [
      "Because consumers always prefer cheaper adulterated goods",
      "Because sellers possess intimate technical knowledge of product defects and ingredients that ordinary buyers cannot verify at the point of sale",
      "Because advertising is illegal in all developing economies",
      "Because the government sets different prices in rural and urban areas",
    ],
    correctIndex: 1,
    explanation: "Information asymmetry means the seller knows the true contents and manufacturing shortcuts, while the buyer cannot test chemical purity in a lab before purchasing.",
    hints: [
      "Think about what you know when buying packaged food versus what the factory chemist knows.",
      "Asymmetry refers to an imbalance of knowledge between two parties in a trade.",
      "Sellers know the flaws and true composition; buyers cannot verify them on the spot.",
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C9_ECONAPP_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: "What major institutional power does the Central Consumer Protection Authority (CCPA) possess under CPA 2019 that was absent under COPRA 1986?",
    options: [
      "Power to manage the monetary repo rate of the Reserve Bank of India",
      "Power to investigate violations suo motu (on its own initiative), order recalls of unsafe goods, and file class actions without waiting for an individual complaint",
      "Power to impose income taxes on private multinational corporations",
      "Power to dissolve village panchayats",
    ],
    correctIndex: 1,
    explanation: "CCPA transformed Indian consumer law from passive redressal (waiting for a victim to sue) to active state regulation with suo motu investigation and mandatory recall powers.",
    hints: [
      "COPRA 1986 was passive—it needed a consumer to file a case first.",
      "CCPA acts proactively as an executive regulator.",
      "The CCPA can initiate suo motu probes and issue nationwide product recalls.",
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C9_ECONAPP_019,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "Arrange the correct procedural sequence an alert Indian consumer must follow when seeking redressal for a defective refrigerator.",
    sortItems: [
      'Demand and preserve the original GST Tax Invoice / Cash Memo at purchase',
      'Report the compressor breakdown to the authorized service center and document refusal',
      'Draft a formal complaint with proof and submit via the e-daakhil / CONFONET portal',
      'Obtain an order for free repair/replacement or compensation from the District Commission',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: "Without a purchase bill, no claim can be substantiated. Then document seller non-compliance, file via the e-daakhil portal, and receive the Commission's verdict.",
    hints: [
      "The process begins with proof of purchase at the moment of buying.",
      "Next, attempt manufacturer resolution and keep records of refusal.",
      "Then file formally before awaiting the Commission's award.",
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C9_ECONAPP_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "In the 1989 Bhopal out-of-court settlement between Union Carbide and the Government of India for ₹4,663 Crore, what was the average compensation allocated per claimant across the 5.5 lakh registered victims?",
    correctAnswer: 84781,
    tolerance: 500,
    unit: '₹ per claimant',
    explanation: "Average Compensation = ₹4,663,00,00,000 ÷ 5,50,000 claimants ≈ ₹84,781 per victim — highlighting the deep inadequacy compared to international industrial liability awards.",
    hints: [
      "Divide the total settlement amount (₹4,663 Crore) by the total number of victims (5.5 Lakh).",
      "46630000000 / 550000.",
      "It comes out to approximately ₹84,781.",
    ],
  },

  // --- ADVANCED (8 items) ---
  {
    id: 'ch_17',
    nodeId: NODE_C9_ECONAPP_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: "Evaluate how the Amul Cooperative model resolves the structural conflict between rural primary producers and urban tertiary consumers.",
    options: [
      "By eliminating all factory processing and delivering raw unpasteurized milk directly on bullock carts",
      "By integrating 36 lakh rural dairy farmers (Primary) with cooperative processing plants (Secondary) and nationwide cold-chain distribution (Tertiary), returning surplus value to farmers",
      "By converting all dairy farms into 100% state-owned public sector monopolies with fixed civil service salaries",
      "By importing 90% of dairy inputs from European agricultural conglomerates",
    ],
    correctIndex: 1,
    explanation: "Amul connects rural farmers directly to processing and national marketing, removing exploitative middlemen and creating complete three-sector harmony with over ₹55,000 Cr turnover.",
    hints: [
      "Amul spans all three sectors: cow milking -> dairy processing -> branded retail marketing.",
      "The farmers own the cooperative through village societies.",
      "It integrates primary farmers with secondary plants and tertiary marketing, sharing profits back with rural producers.",
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C9_ECONAPP_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "How did the 5,846-km Golden Quadrilateral highway directly raise industrial productivity for manufacturers like Tata Motors?",
    options: [
      "By providing free diesel fuel subsidies to commercial transport trucks",
      "By cutting Delhi-Mumbai freight transit time from 60 to 36 hours and reducing logistics costs from 14% to 8% of cargo value",
      "By eliminating state and central goods and services taxes on automobiles",
      "By forcing automobile plants to relocate to coastal port special economic zones",
    ],
    correctIndex: 1,
    explanation: "The Golden Quadrilateral cut transit times by 40% and slashed logistics overhead from ~14% to ~8%, reducing working capital lockup and boosting national manufacturing efficiency.",
    hints: [
      "Look at the transit time reduction and logistics cost percentage.",
      "Better roads mean faster turnaround and less fuel wasted on broken highways.",
      "Transit time fell from 60 to 36 hours, and logistics cost fell from 14% to 8%.",
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C9_ECONAPP_015,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: "Construct the intergenerational 'Vicious Cycle of Infrastructure Deficit' by ordering the causal chain blocks.",
    availableParts: [
      'No All-Weather Road',
      'Monsoon Isolation & Distress Crop Sale',
      'Household Income Collapse',
      'Child Dropped Out to Work',
      'Unskilled Next Generation in Poverty',
    ],
    targetState: 'No All-Weather Road Monsoon Isolation & Distress Crop Sale Household Income Collapse Child Dropped Out to Work Unskilled Next Generation in Poverty',
    validationHint: "Start with the physical road deficit -> isolation/distress sale -> income drop -> school dropout -> inherited poverty.",
    explanation: "Infrastructure absence is not merely an inconvenience; it locks rural families into a multi-generational poverty trap through distress sales and lost schooling.",
    hints: [
      "Start with the transport deficit (No All-Weather Road).",
      "Follow through the market failure and income collapse.",
      "End with the social consequence: child dropout and inherited poverty.",
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C9_ECONAPP_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: "Analyze the landmark 2015 Maggi noodles regulatory enforcement. Which TWO distinct forms of exploitation coexisted in this single product?",
    options: [
      "Short weighting of noodles and illegal currency hoarding",
      "Substandard goods (lead exceeding 2.5 ppm) and Misleading advertising (false 'No Added MSG' label claim)",
      "Overcharging above MRP and failure to provide railway transport",
      "Unlicensed import of wheat and breach of patent copyrights",
    ],
    correctIndex: 1,
    explanation: "FSSAI tests revealed lead levels between 2.5 and 17.2 ppm (Substandard/Unsafe goods) alongside deceptive packaging stating 'No added MSG' (Misleading advertising).",
    hints: [
      "One violation was physical toxicity in laboratory tests.",
      "The second was a deceptive claim on the packet wrapper.",
      "It involved Substandard goods (excess lead) and Misleading advertising ('No added MSG').",
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C9_ECONAPP_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "Compare the legal shift from the principle of 'Caveat Emptor' to 'Caveat Venditor' under the Consumer Protection Act 2019.",
    options: [
      "Caveat Emptor made sellers strictly liable; Caveat Venditor abolished all warranties",
      "Caveat Emptor ('Let the buyer beware') placed the entire burden on the consumer; CPA 2019 enforces Caveat Venditor ('Let the seller beware') through statutory product liability and CCPA oversight",
      "Caveat Venditor applies only to agricultural barter trades in rural mandis",
      "Both principles mean the government pays for all product defects directly from tax revenues",
    ],
    correctIndex: 1,
    explanation: "Modern consumer jurisprudence shifts responsibility from the vulnerable buyer (Caveat Emptor) to the manufacturer and seller (Caveat Venditor), enforcing strict product liability under Chapter VI of CPA 2019.",
    hints: [
      "Latin: 'Emptor' means buyer; 'Venditor' means seller.",
      "Modern law forces manufacturers to stand behind their products.",
      "CPA 2019 enforces 'Let the seller beware' through statutory product liability.",
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C9_ECONAPP_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: "TRAI's Mobile Number Portability (MNP) enables consumers to switch telecom operators while retaining their mobile number. Which primary consumer right does this empower?",
    options: [
      "Right to Consumer Education",
      "Right to Choose (by removing restrictive operator lock-in)",
      "Right to Seek Redressal for property damage",
      "Right to Environmental Protection",
    ],
    correctIndex: 1,
    explanation: "MNP operationalizes the Right to Choose by preventing monopolistic lock-in, forcing telecom providers to compete dynamically on quality, coverage, and fair tariff rates.",
    hints: [
      "MNP allows you to pick between Jio, Airtel, and Vi freely.",
      "It prevents operators from trapping customers with their phone numbers.",
      "It empowers the Right to Choose.",
    ],
  },
  {
    id: 'ch_23',
    nodeId: NODE_C9_ECONAPP_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: "Comparing Bhopal (1984) and Chernobyl (1986), what fundamental institutional lesson emerges regarding consumer and citizen safety?",
    options: [
      "Industrial disasters occur only in capitalist private firms and never under state ownership",
      "Safety systems and the Right to be Informed must be enforced by independent regulators against BOTH private corporate greed and state bureaucratic secrecy",
      "Nuclear plants require no regulation if operated by government scientists",
      "Warning sirens and evacuation protocols are unnecessary if chemical plants are located near major railway stations",
    ],
    correctIndex: 1,
    explanation: "Bhopal (Union Carbide, private MNC) cut safety costs for profits; Chernobyl (Soviet state monopoly) hid radiation risks for political secrecy. Both prove independent oversight and public disclosure are vital.",
    hints: [
      "Union Carbide was a private MNC; Chernobyl was a state-run socialist reactor.",
      "Both hid dangers from the public and disabled critical safety systems.",
      "Consumer and safety laws must regulate both private corporations and state monopolies.",
    ],
  },
  {
    id: 'ch_24',
    nodeId: NODE_C9_ECONAPP_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "How did the 2003 Centre for Science and Environment (CSE) laboratory investigation on soft drinks exemplify consumer awareness under globalization?",
    options: [
      "By proving that foreign soft drinks have zero calories",
      "By exposing that multinational colas contained pesticide residues 30 times higher than European Union standards, forcing parliamentary bans and stricter Indian food standards",
      "By advocating for the complete closure of all Indian agricultural farms",
      "By showing that Indian groundwater is entirely free of chemical contaminants",
    ],
    correctIndex: 1,
    explanation: "CSE demonstrated that globalization expands consumer choices, but without independent watchdog testing and vigilant enforcement of the Right to be Informed, MNCs can exploit weak local regulatory standards.",
    hints: [
      "CSE tested bottles of Coke and Pepsi in Delhi laboratories.",
      "They found pesticide levels vastly exceeding European safety norms.",
      "It forced stricter standards by proving MNCs exploited weak domestic pesticide regulations.",
    ],
  },
];

// ============================================================================
// PROPS INTERFACE & DEFAULT ENRICHMENT DATA
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
  nodeId: NODE_C9_ECONAPP_011,
  title: "Sectors, Infrastructure & Consumer Awareness in India",
  definition: "An integrated framework examining the circular interdependence of primary, secondary, and tertiary sectors, the distinction and complementarity of economic and social infrastructure, and the legal-institutional protection of consumers under the Consumer Protection Act 2019.",
  eli5: "Think of an economy as a big team. Farmers grow the cotton, factories weave the shirts, and delivery trucks sell them to shops. Roads and electricity (economic) let trucks and factories run; schools and hospitals (social) keep workers smart and healthy. Consumer laws ensure nobody gets cheated or hurt when buying things.",
  misconceptions: [
    {
      misconception: "ICICI and HDFC are public-sector banks because they are large Indian institutions.",
      correction: "The test for public vs private sector is OWNERSHIP (who holds majority equity), not size or nationality. SBI and PNB are public; ICICI and HDFC are private-sector banks.",
    },
    {
      misconception: "Schools and hospitals are economic infrastructure because they are large physical buildings.",
      correction: "Infrastructure is classified by the SERVICE rendered. Education and health directly develop human capital (Social Infrastructure), whereas power plants and highways support physical freight and production (Economic Infrastructure).",
    },
    {
      misconception: "Deficiency in Service and Defect in Goods are identical under consumer law.",
      correction: "A defect in goods (Section 2(10)) applies to tangible physical products (e.g. lead in food). A deficiency in service (Section 2(11)) applies to intangible services (e.g. unauthorized bank deductions, doctor negligence).",
    },
    {
      misconception: "The pecuniary limit for District Consumer Forums is still ₹20 Lakh.",
      correction: "Under the Consumer Protection Act 2019, District Commissions hear claims up to ₹1 Crore. Quoting the obsolete COPRA 1986 limit (₹20 Lakh) in board exams is an error.",
    },
    {
      misconception: "Any settlement with a large population automatically qualifies as urban.",
      correction: "Census 2011 requires all THREE criteria simultaneously: (1) Population ≥ 5,000; (2) Density ≥ 400/km²; (3) ≥ 75% of male workers in non-agricultural work.",
    },
  ],
  diagnosticQuestions: [
    { question: "Which of the following is a Primary sector enterprise?", options: ["Tata Steel Mill", "Assam Tea Plantation", "HDFC Bank", "Flipkart Logistics"], correctIndex: 1 },
    { question: "Economic infrastructure includes:", options: ["Schools & Colleges", "Hospitals & Clinics", "Energy, Transport & Telecom", "Slum Rehabilitation Housing"], correctIndex: 2 },
    { question: "India's Total Fertility Rate (TFR) in NFHS-5 reached replacement level at:", options: ["3.4", "2.8", "2.0", "1.2"], correctIndex: 2 },
    { question: "What is the estimated RBI infrastructure multiplier for India?", options: ["0.5 - 0.8", "1.0 - 1.2", "2.5 - 3.0", "6.0 - 8.0"], correctIndex: 2 },
    { question: "The 2012 FSSAI national milk survey found what % of milk samples adulterated?", options: ["12.5%", "35.0%", "68.4%", "95.2%"], correctIndex: 2 },
    { question: "National Consumer Helpline short-code number in India is:", options: ["100", "108", "1915", "1947"], correctIndex: 2 },
    { question: "The Maggi Noodles recall in 2015 was ordered primarily due to excess levels of:", options: ["Sugar", "Lead & Unlabeled MSG", "Pesticide", "Artificial coloring"], correctIndex: 1 },
    { question: "Under CPA 2019, the State Consumer Commission hears claims of:", options: ["Up to ₹1 Crore", "Between ₹1 Crore and ₹10 Crore", "Above ₹10 Crore", "Any amount without limit"], correctIndex: 1 },
  ],
  masteryCriteria: "Student demonstrates master-level understanding of three-sector circular flows, economic vs social infrastructure multipliers, the Consumer Protection Act 2019 framework, and historical case studies (Bhopal, Chernobyl, CSE).",
};

// ============================================================================
// INTERACTIVE EXPLORATION STEPS
// ============================================================================
const EXPLORATION_STEPS = [
  {
    stepId: 0,
    title: "1. Three-Sector Circular Flow & Interdependence",
    instruction: "Click through each stage to observe how raw farm outputs turn into manufactured items and retail goods, and how tertiary banking powers the loop.",
    interactionType: "click-flow",
    nodeId: NODE_C9_ECONAPP_011,
  },
  {
    stepId: 1,
    title: "2. Economic vs Social Infrastructure Laboratory",
    instruction: "Balance the district budget slider between Economic (highways, power) and Social (schools, clinics) to maximize the Virtuous Development Index.",
    interactionType: "slider-balance",
    nodeId: NODE_C9_ECONAPP_012,
  },
  {
    stepId: 2,
    title: "3. The Infrastructure Multiplier & GDP Expansion",
    instruction: "Adjust the capital expenditure slider and observe real-time GDP expansion via the RBI Infrastructure Multiplier (k = 2.8).",
    interactionType: "slider-multiplier",
    nodeId: NODE_C9_ECONAPP_014,
  },
  {
    stepId: 3,
    title: "4. Consumer Exploitation & Legal Metrology Inspector",
    instruction: "Inspect the market stalls. Tap suspicious items to identify adulteration, short weight, and overcharging.",
    interactionType: "market-inspect",
    nodeId: NODE_C9_ECONAPP_016,
  },
  {
    stepId: 4,
    title: "5. Consumer Protection Act 2019 Redressal Tiers",
    instruction: "Test claim valuation amounts to see which Commission (District, State, or National) holds statutory jurisdiction.",
    interactionType: "claim-test",
    nodeId: NODE_C9_ECONAPP_018,
  },
];

// ============================================================================
// PREDICTION & OBSERVATION QUESTIONS
// ============================================================================
const PREDICTION_QUESTIONS = [
  {
    question: "Predict: If a state government spends 100% of its budget on highways (Economic) and 0% on schools/hospitals (Social), what will occur in 5 years?",
    options: [
      "The economy will achieve maximum productivity because roads are all factories need",
      "Economic growth will bottleneck because factories cannot find literate, healthy workers to operate machinery and roads safely",
      "Social development will automatically improve through private charity alone",
      "Logistics costs will drop to zero with zero negative consequences",
    ],
    correctIndex: 1,
    verifyInstruction: "Now adjust the Infrastructure Balance slider in Step 2 to 100% Economic and observe the Virtuous Growth Gauge drop into 'Imbalanced Bottleneck'!",
  },
  {
    question: "Predict: If an online shopping app delivers a duplicate fake smartphone and refuses a refund, which legal provision holds the e-commerce platform accountable today?",
    options: [
      "The platform can disclaim all liability under old 1986 rules as an 'innocent intermediary'",
      "Consumer Protection (E-Commerce) Rules 2020 make the platform directly liable for facilitating redressal and banning dark patterns",
      "Only the local postal courier is legally punished",
      "No law exists in India for digital commerce",
    ],
    correctIndex: 1,
    verifyInstruction: "Check the Consumer Redressal simulator to see how modern regulations mandate platform liability!",
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: "What do you notice about the Virtuous Development score when BOTH Economic and Social infrastructure investments are kept in harmony (~50:50)?",
    observableOptions: [
      "The overall development score reaches its peak because skilled workers multiply highway and factory productivity",
      "The score drops to zero because funds are divided",
      "Social infrastructure cancels out economic progress",
      "The two sectors have no relationship whatsoever",
    ],
    correctIndex: 0,
  },
  {
    question: "What pattern is revealed when comparing the 1989 Bhopal settlement (₹84,781/victim) with modern product liability under CPA 2019?",
    observableOptions: [
      "The old settlement was fully adequate and requires no modern changes",
      "Modern law enforces strict liability (Caveat Venditor) where corporations cannot cap claims with small out-of-court settlements",
      "Consumers had more rights in 1984 than in 2019",
      "Industrial safety is no longer necessary in modern manufacturing",
    ],
    correctIndex: 1,
  },
];

// ============================================================================
// REAL WORLD ACTIVITY
// ============================================================================
const REAL_WORLD_ACTIVITY = {
  title: "Community Consumer Auditor & Economic Policy Analyst",
  description: "Conduct an audit of your own household and neighborhood! Track 3 packaged commodities for mandatory Legal Metrology information (MRP, Expiry Date, Net Weight, FSSAI/ISI mark) and trace one breakfast food item back through its Primary, Secondary, and Tertiary sectors.",
  steps: [
    "Audit 3 packaged items in your pantry: verify if MRP, Net Weight, FSSAI licence, and Best-Before dates are printed.",
    "Map the journey of a packet of milk or loaf of bread: identify the farmer (Primary), processor (Secondary), and delivery retailer (Tertiary).",
    "Identify whether your municipal water and power supply are Public or Private infrastructure.",
    "Save the National Consumer Helpline number (1915) on your phone to exercise active consumer vigilance.",
  ],
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function C9_EconApplicationsInterdependenceSectorsPrimarySim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_ECONAPP_011,
  title = DEFAULT_PROPS.title || "Sectors & Infrastructure Simulation",
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['econapp'] || { name: 'Economics Applications', emoji: '📈', color: 'emerald' };

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints and reveals
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery hook states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict and observe states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration Simulation States
  const [flowStage, setFlowStage] = useState<'primary' | 'secondary' | 'tertiary' | 'banking'>('primary');
  const [infraEconomicShare, setInfraEconomicShare] = useState(50); // 0 to 100
  const [infraSpendingCr, setInfraSpendingCr] = useState(10000); // in Cr
  const [selectedMarketItem, setSelectedMarketItem] = useState<string | null>(null);
  const [inspectedStalls, setInspectedStalls] = useState<Record<string, boolean>>({});
  const [testClaimAmountCr, setTestClaimAmountCr] = useState(0.85); // in Cr

  // Interactive Drag & Drop / Input Challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Canvas state
  const [animationTick, setAnimationTick] = useState(0);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --------------------------------------------------------------------------
  // DERIVED CALCULATIONS & MEMOS
  // --------------------------------------------------------------------------
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  const virtuousScore = useMemo(() => {
    const balance = 100 - Math.abs(infraEconomicShare - 50) * 1.5;
    return Math.round(Math.max(10, Math.min(100, balance * 0.9 + (infraSpendingCr / 20000) * 10)));
  }, [infraEconomicShare, infraSpendingCr]);

  const gdpExpansion = useMemo(() => {
    return Math.round(infraSpendingCr * 2.8);
  }, [infraSpendingCr]);

  const calculatedForum = useMemo(() => {
    if (testClaimAmountCr <= 1.0) return { name: 'District Consumer Commission', limit: 'Claims up to ₹1.00 Crore', tier: 'district', color: 'emerald' };
    if (testClaimAmountCr <= 10.0) return { name: 'State Consumer Disputes Redressal Commission', limit: 'Claims ₹1.00 Cr to ₹10.00 Cr', tier: 'state', color: 'amber' };
    return { name: 'National Consumer Disputes Redressal Commission (NCDRC)', limit: 'Claims Above ₹10.00 Crore', tier: 'national', color: 'rose' };
  }, [testClaimAmountCr]);

  // Motivational Feedback Helper
  const motivationalMessage = useMemo(() => {
    if (errors === 0) {
      return {
        badge: 'PERFECT SCORE!',
        color: 'text-emerald-400 border-emerald-500 bg-emerald-950/60',
        detail: 'Flawless execution! You demonstrated complete conceptual mastery of Sector Interdependence, Infrastructure Multipliers, and Consumer Protection Act mechanisms.',
      };
    }
    if (errors <= 3) {
      return {
        badge: 'Great work!',
        color: 'text-gold-400 border-gold-500 bg-gold-950/60',
        detail: 'Excellent effort! You have a solid grasp of Economic vs Social infrastructure synergy and Consumer Redressal legal frameworks.',
      };
    }
    if (errors <= 7) {
      return {
        badge: 'Good effort!',
        color: 'text-amber-400 border-amber-500 bg-amber-950/60',
        detail: 'Solid attempt! Review the targeted misconceptions and legal thresholds to strengthen your precision before board exams.',
      };
    }
    return {
      badge: 'Do not give up — You WILL get this!',
      color: 'text-rose-400 border-rose-500 bg-rose-950/60',
      detail: 'Economics applications require practice with sectoral linkages and legal definitions. Revisit the interactive labs and try again!',
    };
  }, [errors]);

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
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      setAnimationTick(Math.floor(t * 10));
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 55;

      const px1 = cx + radius * Math.cos(t);
      const py1 = cy + radius * Math.sin(t);
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(px1, py1, 6, 0, Math.PI * 2);
      ctx.fill();

      const px2 = cx + radius * Math.cos(t + (2 * Math.PI) / 3);
      const py2 = cy + radius * Math.sin(t + (2 * Math.PI) / 3);
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(px2, py2, 6, 0, Math.PI * 2);
      ctx.fill();

      const px3 = cx + radius * Math.cos(t + (4 * Math.PI) / 3);
      const py3 = cy + radius * Math.sin(t + (4 * Math.PI) / 3);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(px3, py3, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  useEffect(() => {
    if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
      inactivityTimerRef.current = setTimeout(() => {
        audioManager.play('chime');
      }, 10000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, hintCount, answerRevealed]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        audioManager.play('chime');
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && challenge.hints && challenge.hints[nextLvl - 1]) {
      const hintText = challenge.hints[nextLvl - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLvl}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak("Let's review the complete step-by-step reasoning together.");
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? "Spot on! That is the core of sectoral interdependence." : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak("Welcome to the interactive exploration labs. Manipulate each simulation to discover the core economic principles.");
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak("Free Sandbox Mode. Experiment with budgets and sector parameters without scoring pressure.");
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak("Challenge mode initialized. Apply your knowledge to solve real-world ICSE economic scenarios.");
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak("Prediction registered. Now let us verify it dynamically!");
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? "Accurate observation! Balanced infrastructure maximizes total output." : "Look closely at the synergistic indicators.");
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    audioManager.play('drop-correct');
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const initial = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = initial.splice(fromIdx, 1);
      initial.splice(toIdx, 0, moved);
      return initial;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak("Outstanding work! You have completed the Sectors, Infrastructure, and Consumer Awareness master simulation.");
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
    resetInactivityTimer();
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
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak("Correct! Well analyzed.");
      setShowSparkle(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ score: 100, lastPlayed: Date.now() }));
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
        speechManager.speak("Let us examine the complete explanation to master this concept.");
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleMarketInspect = useCallback((stallId: string) => {
    setSelectedMarketItem(stallId);
    setInspectedStalls(prev => ({ ...prev, [stallId]: true }));
    audioManager.play('tap');
    if (stallId === 'milk') speechManager.speak("Adulteration detected! FSSAI test finds water and detergent in loose milk.");
    if (stallId === 'weights') speechManager.speak("Short weighting detected! Tampered scale records 900g as 1kg.");
    if (stallId === 'masks') speechManager.speak("Overcharging detected! Selling N95 masks at ₹500 against MRP ₹150.");
  }, []);

  // --------------------------------------------------------------------------
  // RENDER: DISCOVERY HOOK
  // --------------------------------------------------------------------------
  const renderDiscovery = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="p-6 bg-gradient-to-br from-gold-950/80 to-slate-900 border border-gold-700/60 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="p-2 bg-gold-600/30 rounded-xl text-2xl border border-gold-500/30">🌾</span>
          <div>
            <h2 className="text-xl font-bold text-gold-200">{SCENARIO.title}</h2>
            <p className="text-xs text-gold-300">CISCE Class 9 Economics Applications • Interactive Simulation</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
        <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
          <strong className="text-gold-400">Policy Brief: </strong>{SCENARIO.context}
        </div>
      </div>

      <div className="p-6 bg-slate-800/80 border border-slate-700/70 rounded-2xl shadow-lg">
        <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">Curiosity Discovery Hook</span>
        <h3 className="text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

        <div className="space-y-3">
          {DISCOVERY_QUESTION.options.map((option, idx) => {
            const isChosen = discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex;
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                aria-label={`Option ${idx + 1}: ${option}`}
                disabled={discoveryAnswered}
                onClick={() => handleDiscoveryAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl text-sm transition-all border flex items-start justify-between ${
                  discoveryAnswered
                    ? isChosen
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                    : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-gold-500 hover:bg-slate-850'
                }`}
              >
                <span>{option}</span>
                {discoveryAnswered && isChosen && <span className="text-emerald-400 font-bold ml-2">✓</span>}
              </motion.button>
            );
          })}
        </div>

        {discoveryAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-4 bg-gold-950/50 border border-gold-700/50 rounded-xl"
          >
            <p className="text-sm text-gold-200 mb-4">
              {discoveryCorrect ? "✨ Brilliant intuition!" : "💡 A great learning moment!"} {DISCOVERY_QUESTION.hintAfter}
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToExploration}
              className="px-6 py-3 bg-gradient-to-r from-gold-600 to-purple-600 hover:from-gold-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-md flex items-center gap-2"
            >
              Enter Interactive Labs →
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  // --------------------------------------------------------------------------
  // RENDER: GUIDED INTERACTIVE EXPLORATION (WITH 3 TOPIC-SPECIFIC SVGS)
  // --------------------------------------------------------------------------
  const renderExploration = () => {
    const step = EXPLORATION_STEPS[currentSlide];

    return (
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {/* Step Header */}
        <div className="flex items-center justify-between p-4 bg-slate-800/90 border border-slate-700 rounded-2xl">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">Exploration Lab {currentSlide + 1} of 5</span>
            <h3 className="text-lg font-bold text-white">{step.title}</h3>
            <p className="text-xs text-amber-300 mt-0.5">👉 {step.instruction}</p>
          </div>
          <canvas ref={canvasRef} width={130} height={40} className="rounded-lg bg-slate-950 border border-slate-800" />
        </div>

        {/* STEP 0: SVG DIAGRAM 1 — THREE SECTOR CIRCULAR FLOW */}
        {currentSlide === 0 && (
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { id: 'primary', label: '1. Primary (Farms)', desc: 'Gujarat Cotton & Raw Milk', color: 'emerald', icon: '🌾' },
                { id: 'secondary', label: '2. Secondary (Mills)', desc: 'Coimbatore Textiles & Dairy Processing', color: 'blue', icon: '🏭' },
                { id: 'tertiary', label: '3. Tertiary (Retail)', desc: 'Reliance Trends & Indian Railways Freight', color: 'amber', icon: '🚚' },
                { id: 'banking', label: '4. Financial Backbone', desc: 'SBI & NABARD Agricultural Credit', color: 'purple', icon: '🏦' },
              ].map((st) => (
                <motion.button
                  key={st.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setFlowStage(st.id as any);
                    audioManager.play('tap');
                  }}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    flowStage === st.id
                      ? `bg-${st.color}-950/70 border-${st.color}-500 text-white shadow-lg`
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{st.icon}</div>
                  <div className="font-bold text-sm">{st.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{st.desc}</div>
                </motion.button>
              ))}
            </div>

            {/* SVG DIAGRAM 1: Interdependence Circular Flow */}
            <div className="relative p-6 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
              <svg viewBox="0 0 700 280" className="w-full max-w-2xl">
                <defs>
                  <marker id="arrow1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                  </marker>
                  <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path d="M 120 140 Q 350 30 580 140 Q 350 250 120 140" fill="none" stroke="#334155" strokeWidth="3" strokeDasharray="6 6" />

                {/* Primary Node */}
                <g transform="translate(120, 140)">
                  <circle r={flowStage === 'primary' ? 44 : 36} fill="#064e3b" stroke="#10b981" strokeWidth={flowStage === 'primary' ? 3 : 1.5} className="transition-all" />
                  <text y="-5" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">PRIMARY</text>
                  <text y="12" textAnchor="middle" fill="#6ee7b7" fontSize="9">Raw Cotton/Milk</text>
                </g>

                {/* Secondary Node */}
                <g transform="translate(350, 60)">
                  <circle r={flowStage === 'secondary' ? 44 : 36} fill="#1e3a8a" stroke="#3b82f6" strokeWidth={flowStage === 'secondary' ? 3 : 1.5} className="transition-all" />
                  <text y="-5" textAnchor="middle" fill="#bfdbfe" fontSize="11" fontWeight="bold">SECONDARY</text>
                  <text y="12" textAnchor="middle" fill="#93c5fd" fontSize="9">Textiles/Processing</text>
                </g>

                {/* Tertiary Node */}
                <g transform="translate(580, 140)">
                  <circle r={flowStage === 'tertiary' ? 44 : 36} fill="#78350f" stroke="#f59e0b" strokeWidth={flowStage === 'tertiary' ? 3 : 1.5} className="transition-all" />
                  <text y="-5" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">TERTIARY</text>
                  <text y="12" textAnchor="middle" fill="#fcd34d" fontSize="9">Railways & Retail</text>
                </g>

                {/* Banking / Financial Hub Center */}
                <g transform="translate(350, 200)">
                  <circle r={flowStage === 'banking' ? 40 : 32} fill="#581c87" stroke="#a855f7" strokeWidth={flowStage === 'banking' ? 3 : 1.5} className="transition-all" />
                  <text y="-5" textAnchor="middle" fill="#f3e8ff" fontSize="10" fontWeight="bold">CREDIT / BANK</text>
                  <text y="10" textAnchor="middle" fill="#d8b4fe" fontSize="8">SBI / NABARD</text>
                </g>

                {/* Flow Lines */}
                <line x1="156" y1="120" x2="310" y2="70" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow1)" />
                <line x1="390" y1="70" x2="544" y2="120" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow1)" />
                <line x1="550" y1="165" x2="390" y2="200" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow1)" />
                <line x1="310" y1="200" x2="150" y2="165" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arrow1)" />
              </svg>

              <div className="w-full mt-4 p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-gold-400">Interdependence Analysis: </span>
                {flowStage === 'primary' && "The Primary sector extracts raw materials (cotton, sugarcane, milk). It depends on Secondary for tractors/fertilizers and Tertiary for crop insurance and freight."}
                {flowStage === 'secondary' && "The Secondary sector manufactures finished cloth and processed butter. It depends entirely on Primary supply and Tertiary marketing/transport."}
                {flowStage === 'tertiary' && "The Tertiary sector distributes goods (railways, retail). If primary cotton yields drop, railway freight loads fall and retail prices rise."}
                {flowStage === 'banking' && "Financial infrastructure provides working capital loans to mills, crop credit to farmers, and consumer payment systems."}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: SVG DIAGRAM 2 — INFRASTRUCTURE BALANCE & SYNERGY BRIDGE */}
        {currentSlide === 1 && (
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-6">
            {/* SVG DIAGRAM 2: Economic vs Social Infrastructure Seesaw / Fulcrum */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
                Infrastructure Dual Pillars & Synergy Bridge
              </span>
              <svg viewBox="0 0 650 200" className="w-full max-w-2xl">
                {/* Ground Base */}
                <line x1="50" y1="180" x2="600" y2="180" stroke="#334155" strokeWidth="3" />
                {/* Central Fulcrum */}
                <polygon points="325,120 300,180 350,180" fill="#475569" stroke="#64748b" strokeWidth="2" />
                <circle cx="325" cy="120" r="6" fill="#818cf8" />

                {/* Tilting Plank based on infraEconomicShare */}
                {(() => {
                  const angle = (infraEconomicShare - 50) * 0.35; // degrees
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 325 - 240 * Math.cos(rad);
                  const y1 = 120 - 240 * Math.sin(rad);
                  const x2 = 325 + 240 * Math.cos(rad);
                  const y2 = 120 + 240 * Math.sin(rad);

                  return (
                    <g>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6366f1" strokeWidth="6" strokeLinecap="round" />

                      {/* Economic Infrastructure Box (Left) */}
                      <g transform={`translate(${x1}, ${y1 - 45})`}>
                        <rect x="-65" y="-10" width="130" height="50" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                        <text x="0" y="12" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">🛣️ ECONOMIC</text>
                        <text x="0" y="28" textAnchor="middle" fill="#bfdbfe" fontSize="9">Power, Roads, Ports ({infraEconomicShare}%)</text>
                      </g>

                      {/* Social Infrastructure Box (Right) */}
                      <g transform={`translate(${x2}, ${y2 - 45})`}>
                        <rect x="-65" y="-10" width="130" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                        <text x="0" y="12" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">🏥 SOCIAL</text>
                        <text x="0" y="28" textAnchor="middle" fill="#a7f3d0" fontSize="9">Health & Schools ({100 - infraEconomicShare}%)</text>
                      </g>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gold-400 font-bold">🛣️ Economic Infra: {infraEconomicShare}%</span>
                  <span className="text-emerald-400 font-bold">🏥 Social Infra: {100 - infraEconomicShare}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={infraEconomicShare}
                  aria-label="Balance Economic and Social Infrastructure Spending"
                  onChange={(e) => {
                    setInfraEconomicShare(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-gold-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>100% Highways/Power</span>
                  <span>50:50 Balanced Synergy</span>
                  <span>100% Schools/Hospitals</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">Virtuous Development Index:</span>
                    <span className={`font-bold ${virtuousScore > 75 ? 'text-emerald-400' : virtuousScore > 45 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {virtuousScore}/100
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${virtuousScore > 75 ? 'bg-emerald-500' : virtuousScore > 45 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      animate={{ width: `${virtuousScore}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    {infraEconomicShare > 75 && "⚠️ Warning: Excess physical capital without literate, healthy workers creates underutilized infrastructure bottlenecks."}
                    {infraEconomicShare < 25 && "⚠️ Warning: Skilled workers without power lines and paved roads cannot produce manufactured goods."}
                    {infraEconomicShare >= 40 && infraEconomicShare <= 60 && "✨ Ideal Complementarity: Power & roads support factories while schools & clinics produce a healthy, skilled workforce!"}
                  </p>
                </div>
              </div>

              {/* Predict-Then-Check Section */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                {!predictionMade ? (
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">Predict-Then-Check</span>
                    <p className="text-xs text-slate-200 mt-1 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="space-y-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="w-full text-left p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 hover:border-gold-500"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-emerald-400 font-bold">✓ Prediction Evaluated:</p>
                    <p className="text-xs text-slate-300">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                    {!observationAnswered && (
                      <div className="mt-4 pt-3 border-t border-slate-800">
                        <p className="text-xs text-amber-300 font-semibold mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 hover:border-emerald-500 mb-1.5"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: INFRASTRUCTURE MULTIPLIER */}
        {currentSlide === 2 && (
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Capital Investment (ΔI)</span>
                <div className="text-2xl font-bold text-gold-400 mt-1">₹{infraSpendingCr.toLocaleString()} Cr</div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={1000}
                  value={infraSpendingCr}
                  aria-label="Adjust Capital Spending in Crores"
                  onChange={(e) => {
                    setInfraSpendingCr(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full mt-3 accent-gold-500"
                />
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">RBI Multiplier (k)</span>
                <div className="text-2xl font-bold text-amber-400 mt-1">2.8× Multiplier</div>
                <p className="text-[11px] text-slate-400 mt-2">Every ₹100 spent circulates through construction wages, kirana retail, and industrial inputs.</p>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Total GDP Expansion (ΔY)</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">₹{gdpExpansion.toLocaleString()} Cr</div>
                <p className="text-[11px] text-emerald-300 mt-2">Formula: ΔY = k × ΔI = 2.8 × ₹{infraSpendingCr.toLocaleString()} Cr</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 mb-3">Live Multiplier Round Circulation (in ₹ Crore)</h4>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Initial Capex', amount: infraSpendingCr },
                    { name: 'Round 1 (Wages)', amount: Math.round(infraSpendingCr * 0.8) },
                    { name: 'Round 2 (Retail)', amount: Math.round(infraSpendingCr * 0.6) },
                    { name: 'Round 3 (Supply)', amount: Math.round(infraSpendingCr * 0.4) },
                    { name: 'Total GDP (ΔY)', amount: gdpExpansion },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]}>
                      {['#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4', '#10b981'].map((c, i) => (
                        <Cell key={i} fill={c} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CONSUMER EXPLOITATION INSPECTOR */}
        {currentSlide === 3 && (
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'milk', title: '🥛 Milk Dairy Stall', issue: 'Adulteration (FSSAI 68.4% finding)', tag: 'Quality Manipulation' },
                { id: 'weights', title: '⚖️ Grain Merchant', issue: 'Short Weighting (4,500 seized scales)', tag: 'Quantity Manipulation' },
                { id: 'masks', title: '😷 Medical Pharmacy', issue: 'Overcharging Above Printed MRP', tag: 'Price Manipulation' },
              ].map((stall) => (
                <motion.button
                  key={stall.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMarketInspect(stall.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedMarketItem === stall.id
                      ? 'bg-rose-950/70 border-rose-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs uppercase font-bold text-amber-400">{stall.tag}</div>
                  <div className="text-sm font-bold text-white mt-1">{stall.title}</div>
                  <div className="text-xs text-slate-400 mt-2">{stall.issue}</div>
                  <div className="mt-3 text-[11px] text-gold-400 font-semibold">
                    {inspectedStalls[stall.id] ? '✓ Inspected by Enforcement' : '🔍 Click to Inspect'}
                  </div>
                </motion.button>
              ))}
            </div>

            {selectedMarketItem && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-900 rounded-xl border border-rose-800/60 text-xs space-y-2"
              >
                <span className="font-bold text-rose-400">Inspector Findings: </span>
                {selectedMarketItem === 'milk' && "Adulteration violates the Food Safety and Standards Act 2006. Cheaper detergent & water were added to fake milk solids. Punishable with fines and seizure."}
                {selectedMarketItem === 'weights' && "Short weighting violates the Legal Metrology Act 2009. The shopkeeper adjusted the spring to show 900g as 1kg. Consumers lose 10% value on every kg."}
                {selectedMarketItem === 'masks' && "Overcharging violates the Legal Metrology (Packaged Commodities) Rules 2011. Selling above the printed MRP is an illegal unfair trade practice."}
              </motion.div>
            )}
          </div>
        )}

        {/* STEP 4: SVG DIAGRAM 3 — CPA 2019 THREE-TIER REDRESSAL PYRAMID */}
        {currentSlide === 4 && (
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-6">
            {/* SVG DIAGRAM 3: 3-Tier Redressal Hierarchy */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
                CPA 2019 Three-Tier Redressal Jurisdiction Hierarchy
              </span>
              <svg viewBox="0 0 650 220" className="w-full max-w-2xl">
                {/* National Commission (Apex Tier) */}
                <polygon
                  points="325,15 235,75 415,75"
                  fill={calculatedForum.tier === 'national' ? '#be123c' : '#4c0519'}
                  stroke={calculatedForum.tier === 'national' ? '#f43f5e' : '#881337'}
                  strokeWidth={calculatedForum.tier === 'national' ? '3' : '1.5'}
                  className="transition-all"
                />
                <text x="325" y="52" textAnchor="middle" fill="#ffe4e6" fontSize="10" fontWeight="bold">
                  NATIONAL COMMISSION (NCDRC)
                </text>
                <text x="325" y="66" textAnchor="middle" fill="#fecdd3" fontSize="8">
                  Claims Above ₹10 Crore
                </text>

                {/* State Commission (Middle Tier) */}
                <polygon
                  points="230,82 420,82 490,140 160,140"
                  fill={calculatedForum.tier === 'state' ? '#b45309' : '#451a03'}
                  stroke={calculatedForum.tier === 'state' ? '#f59e0b' : '#78350f'}
                  strokeWidth={calculatedForum.tier === 'state' ? '3' : '1.5'}
                  className="transition-all"
                />
                <text x="325" y="106" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="bold">
                  STATE CONSUMER DISPUTES COMMISSION
                </text>
                <text x="325" y="124" textAnchor="middle" fill="#fde68a" fontSize="9">
                  Claims ₹1 Crore to ₹10 Crore
                </text>

                {/* District Commission (Base Tier) */}
                <polygon
                  points="155,147 495,147 575,205 75,205"
                  fill={calculatedForum.tier === 'district' ? '#047857' : '#022c22'}
                  stroke={calculatedForum.tier === 'district' ? '#10b981' : '#065f46'}
                  strokeWidth={calculatedForum.tier === 'district' ? '3' : '1.5'}
                  className="transition-all"
                />
                <text x="325" y="172" textAnchor="middle" fill="#d1fae5" fontSize="12" fontWeight="bold">
                  DISTRICT CONSUMER COMMISSION
                </text>
                <text x="325" y="190" textAnchor="middle" fill="#a7f3d0" fontSize="9">
                  Claims Up to ₹1.00 Crore (Each District HQ)
                </text>
              </svg>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">Simulated Consumer Claim Amount:</span>
                <span className="text-amber-400 font-bold text-sm">₹{testClaimAmountCr.toFixed(2)} Crore</span>
              </div>
              <input
                type="range"
                min={0.05}
                max={25.0}
                step={0.05}
                value={testClaimAmountCr}
                aria-label="Set Consumer Claim Amount in Crores"
                onChange={(e) => {
                  setTestClaimAmountCr(Number(e.target.value));
                  audioManager.play('count');
                }}
                className="w-full accent-gold-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹5 Lakh (Defective Fridge)</span>
                <span>₹5 Crore (Commercial Builder Defect)</span>
                <span>₹25 Crore (Class Action)</span>
              </div>
            </div>

            <motion.div
              key={calculatedForum.name}
              initial={{ scale: 0.98, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-5 rounded-xl border bg-slate-900 text-center space-y-2 border-${calculatedForum.color}-500/80 shadow-lg`}
            >
              <span className="text-xs uppercase font-semibold text-slate-400">Statutory Redressal Jurisdiction (CPA 2019)</span>
              <h4 className={`text-lg font-bold text-${calculatedForum.color}-400`}>{calculatedForum.name}</h4>
              <p className="text-xs text-slate-300">{calculatedForum.limit}</p>
              <p className="text-[11px] text-slate-400 mt-2">
                Note: Under old COPRA 1986, limits were only ₹20 Lakh (District) and ₹1 Cr (State). CPA 2019 modernized limits to handle high-value property and medical negligence claims.
              </p>
            </motion.div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex justify-between items-center pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentSlide === 0}
            onClick={() => {
              setCurrentSlide(s => Math.max(0, s - 1));
              audioManager.play('whoosh');
            }}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold disabled:opacity-40"
          >
            ← Previous Lab
          </motion.button>

          <span className="text-xs text-slate-400 font-semibold">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

          {currentSlide < EXPLORATION_STEPS.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => s + 1);
                audioManager.play('whoosh');
              }}
              className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
            >
              Next Lab →
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToSandbox}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
            >
              Enter Free Sandbox →
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  };

  // --------------------------------------------------------------------------
  // RENDER: FREE SANDBOX MODE
  // --------------------------------------------------------------------------
  const renderSandbox = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="p-6 bg-slate-800/90 border border-slate-700 rounded-2xl">
        <h3 className="text-lg font-bold text-emerald-300">🎮 Interactive Free Sandbox</h3>
        <p className="text-xs text-slate-300 mt-1">
          Explore all simulation parameters freely without scoring or time limits. Experiment with multiplier coefficients, sector budgets, and claim thresholds before testing your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
          <span className="text-xs font-bold text-gold-400">Policy Simulator: Infrastructure Synergy</span>
          <div className="flex justify-between text-xs text-slate-300">
            <span>Economic Infra: {infraEconomicShare}%</span>
            <span>Social Infra: {100 - infraEconomicShare}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={infraEconomicShare}
            aria-label="Set Economic Share in Sandbox"
            onChange={(e) => setInfraEconomicShare(Number(e.target.value))}
            className="w-full accent-gold-500"
          />
          <div className="p-3 bg-slate-900 rounded-lg text-xs flex justify-between items-center">
            <span className="text-slate-400">Development Synergy Score:</span>
            <span className="text-emerald-400 font-bold">{virtuousScore}/100</span>
          </div>
        </div>

        <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
          <span className="text-xs font-bold text-amber-400">Macro Multiplier Calculator</span>
          <div className="flex justify-between text-xs text-slate-300">
            <span>Capex Budget: ₹{infraSpendingCr.toLocaleString()} Cr</span>
            <span>Multiplier: 2.8×</span>
          </div>
          <input
            type="range"
            min={1000}
            max={50000}
            step={1000}
            value={infraSpendingCr}
            aria-label="Set Capex Budget in Sandbox"
            onChange={(e) => setInfraSpendingCr(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="p-3 bg-slate-900 rounded-lg text-xs flex justify-between items-center">
            <span className="text-slate-400">Resulting GDP Output:</span>
            <span className="text-amber-300 font-bold">₹{gdpExpansion.toLocaleString()} Cr</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdvanceToChallenge}
          className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl shadow-xl text-sm"
        >
          Ready for CISCE Challenges! 🚀
        </motion.button>
      </div>
    </motion.div>
  );

  // --------------------------------------------------------------------------
  // RENDER: CHALLENGE MODE (WITH FRAMER-MOTION SHAKE ANIMATION ON WRONG ANSWERS)
  // --------------------------------------------------------------------------
  const renderChallenge = () => {
    return (
      <motion.div
        key={challenge.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Challenge Header & Progress Bar */}
        <div className="p-5 bg-slate-800/90 border border-slate-700 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold-900/60 border border-gold-700 text-gold-300 uppercase font-semibold">
                  {challenge.competencyLevel}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-700/60 text-slate-300">
                  Node: {challenge.nodeId}
                </span>
              </div>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600'
                  : difficulty === 'standard'
                  ? 'bg-gold-900/60 text-gold-300 border border-gold-600'
                  : 'bg-rose-900/60 text-rose-300 border border-rose-600'
              }`}
            >
              {difficulty}
            </motion.span>
          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-purple-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Text */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-md">
          <h3 className="text-base font-bold text-white mb-4 leading-relaxed">{challenge.question}</h3>

          {/* 1. MCQ OPTIONS WITH SHAKE ANIMATION */}
          {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
            <div className="space-y-3">
              {challenge.options.map((option, idx) => {
                const isSelected = showExplanation && idx === challenge.correctIndex;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    aria-label={`Option ${idx + 1}: ${option}`}
                    disabled={showExplanation}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border flex items-start justify-between ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                        : isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-gold-500 hover:bg-slate-850'
                    }`}
                  >
                    <span>{option}</span>
                    {isSelected && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* 2. DRAG LABEL CHALLENGE */}
          {challenge.type === 'drag-label' && challenge.dragItems && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 w-full mb-1">Draggable Item Palette:</span>
                {challenge.dragItems.map((item, i) => (
                  <motion.div
                    key={i}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Drag item ${item.label}`}
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-3 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-semibold rounded-lg cursor-grab shadow"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'box_primary', title: 'Primary Sector Target', tag: 'Raw Extraction' },
                  { id: 'box_secondary', title: 'Secondary Sector Target', tag: 'Manufacturing' },
                  { id: 'box_tertiary', title: 'Tertiary Sector Target', tag: 'Services & Logistics' },
                ].map((target) => (
                  <div
                    key={target.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop(target.id)}
                    className={`p-4 rounded-xl border-2 border-dashed min-h-[100px] flex flex-col justify-between transition-all ${
                      droppedLabels[target.id]
                        ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                        : 'bg-slate-950/60 border-slate-700 text-slate-400'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gold-400">{target.tag}</span>
                      <h4 className="text-xs font-semibold text-slate-300 mt-0.5">{target.title}</h4>
                    </div>
                    <div className="mt-3 p-2 bg-slate-900 rounded-lg text-xs font-bold text-center">
                      {droppedLabels[target.id] || 'Drop Label Here'}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                disabled={Object.keys(droppedLabels).length < (challenge.dragItems?.length || 3)}
                onClick={() => handleAnswer(droppedLabels)}
                className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm disabled:opacity-40"
              >
                Validate Labels ✓
              </motion.button>
            </div>
          )}

          {/* 3. DRAG SORT CHALLENGE */}
          {challenge.type === 'drag-sort' && challenge.sortItems && (
            <div className="space-y-3">
              <span className="text-xs text-slate-400">Drag or click arrows to re-order the steps in correct sequence:</span>
              <div className="space-y-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 flex items-center justify-between cursor-grab"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-gold-900/60 border border-gold-600 flex items-center justify-center font-bold text-[11px] text-gold-300">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        aria-label="Move up"
                        disabled={displayIdx === 0}
                        onClick={() => handleSortMove(displayIdx, displayIdx - 1)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        aria-label="Move down"
                        disabled={displayIdx === challenge.sortItems!.length - 1}
                        onClick={() => handleSortMove(displayIdx, displayIdx + 1)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  const submitted = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                  handleAnswer(submitted);
                }}
                className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm mt-3"
              >
                Submit Sequence ✓
              </motion.button>
            </div>
          )}

          {/* 4. NUMERIC CHALLENGE */}
          {challenge.type === 'numeric' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  aria-label="Enter numerical answer"
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter calculated amount"
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-gold-500 w-full"
                />
                <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">{challenge.unit}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                disabled={!numericInput}
                onClick={() => handleAnswer(numericInput)}
                className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm disabled:opacity-40"
              >
                Check Calculation ✓
              </motion.button>
            </div>
          )}

          {/* 5. CONSTRUCT CHALLENGE */}
          {challenge.type === 'construct' && challenge.availableParts && (
            <div className="space-y-4">
              <span className="text-xs text-slate-400">{challenge.validationHint}</span>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                {challenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (!constructParts.includes(part)) {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }
                    }}
                    className="px-3 py-1.5 bg-gold-900/60 border border-gold-700 hover:bg-gold-700 text-gold-200 text-xs rounded-lg font-medium"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[90px] flex flex-wrap gap-2 items-center">
                {constructParts.length === 0 ? (
                  <span className="text-xs text-slate-500">Tap components above to construct the causal sequence...</span>
                ) : (
                  constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1.5 bg-gold-600 text-white text-xs rounded-lg flex items-center gap-2 shadow"
                    >
                      <span>{i + 1}. {part}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-gold-200 hover:text-white text-xs font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setConstructParts([])}
                  className="px-4 py-2.5 bg-slate-800 text-slate-400 text-xs rounded-xl font-semibold hover:text-white"
                >
                  Clear
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  disabled={constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="flex-1 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  Validate Chain ✓
                </motion.button>
              </div>
            </div>
          )}

          {/* STEP-BY-STEP CLICK-TO-REVEAL EXPLANATION */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-5 bg-amber-950/40 border border-amber-600/60 rounded-2xl space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <span>📖</span>
                <span>Step-by-Step Educational Explanation:</span>
              </div>

              {challenge.explanation
                .split('. ')
                .filter(s => s.trim().length > 0)
                .slice(0, revealedSteps + 1)
                .map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-amber-100/90 leading-relaxed pl-2 border-l-2 border-amber-500"
                  >
                    <strong className="text-amber-400 font-semibold">{idx + 1}. </strong>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

              {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setRevealedSteps(s => s + 1);
                    audioManager.play('pop');
                  }}
                  className="px-4 py-2 bg-amber-700/60 hover:bg-amber-600 text-amber-100 rounded-xl text-xs font-bold"
                >
                  Reveal Next Insight →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNextChallenge}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm shadow-lg mt-2"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // --------------------------------------------------------------------------
  // RENDER: COMPLETION, MOTIVATIONAL FEEDBACK, & REFLECTION SECTION
  // --------------------------------------------------------------------------
  const renderComplete = () => {
    const finalScore = Math.max(0, 100 - errors * 5);
    const srsIntervalDays = errors === 0 ? 7 : errors <= 3 ? 3 : 1;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        {/* Score Card */}
        <div className="p-6 bg-gradient-to-br from-gold-950 to-slate-900 border border-gold-700/70 rounded-2xl text-center space-y-3 shadow-2xl">
          <span className="text-4xl">🎓</span>
          <h2 className="text-2xl font-bold text-white">Mastery Assessment Complete!</h2>
          <div className="text-4xl font-extrabold text-emerald-400 my-2">{finalScore}%</div>
          <div className="flex justify-center gap-3 text-xs">
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-300">
              Mastery Tier: <strong className="text-gold-300">{masteryLevel.toUpperCase()}</strong>
            </span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-300">
              Incorrect Attempts: <strong className="text-rose-300">{errors}</strong>
            </span>
          </div>
        </div>

        {/* MOTIVATIONAL FEEDBACK BASED ON ERRORS */}
        <div className={`p-5 rounded-2xl border ${motivationalMessage.color}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⭐</span>
            <h4 className="text-base font-extrabold">{motivationalMessage.badge}</h4>
          </div>
          <p className="text-xs leading-relaxed text-slate-200">
            {motivationalMessage.detail}
          </p>
        </div>

        {/* REFLECTION SECTION */}
        <div className="p-6 bg-slate-900 border border-gold-800/60 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤔</span>
            <div>
              <h3 className="text-base font-bold text-gold-300">Post-Simulation Reflection</h3>
              <p className="text-xs text-slate-400">Deepen your economic intuition by reflecting on three key questions:</p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {/* Question 1 */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-amber-300 block">
                1. What was the most surprising thing you learned?
              </label>
              <textarea
                value={reflectionResponses.surprising}
                onChange={(e) => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                placeholder="e.g. How the infrastructure multiplier expands initial spending by 2.8x, or the ₹1 Crore District Commission limit under CPA 2019..."
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none h-16"
              />
            </div>

            {/* Question 2 */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-emerald-300 block">
                2. How would you explain this to a friend?
              </label>
              <textarea
                value={reflectionResponses.explain}
                onChange={(e) => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                placeholder="e.g. The economy is a circle where farmers, factories, and services constantly rely on each other to create goods..."
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none h-16"
              />
            </div>

            {/* Question 3 */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-gold-300 block">
                3. Where in real life might you use this?
              </label>
              <textarea
                value={reflectionResponses.realLife}
                onChange={(e) => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                placeholder="e.g. Checking MRP and ISI marks before buying groceries, or dialling 1915 on the National Consumer Helpline if overcharged..."
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none h-16"
              />
            </div>
          </div>
        </div>

        {/* Misconception Tracking Review */}
        {hitMisconceptions.length > 0 && misconceptions && (
          <div className="p-5 bg-rose-950/30 border border-rose-800/60 rounded-2xl space-y-3">
            <h4 className="text-sm font-bold text-rose-300">Targeted Diagnostic Remediation</h4>
            <p className="text-xs text-slate-400">Review the specific concepts where errors were detected during your assessment:</p>
            {hitMisconceptions.map((mIdx, i) => {
              const item = misconceptions[mIdx];
              if (!item) return null;
              return (
                <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-rose-400 font-semibold">❌ Misconception: {item.misconception}</div>
                  <div className="text-emerald-300">✓ Accurate Rule: {item.correction}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Spaced Repetition Visibility */}
        <div className="p-5 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-2">
          <h4 className="text-sm font-bold text-amber-300">Spaced Repetition Review Schedule (SM-2)</h4>
          <p className="text-xs text-amber-200">
            Based on your mastery profile, your next scheduled retrieval practice session is in{' '}
            <strong className="text-white font-bold">{srsIntervalDays} days</strong>.
          </p>
        </div>

        {/* Real-World Activity */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
          <div className="space-y-1.5 pt-2">
            {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
              <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                <span className="text-gold-400 font-bold">{i + 1}.</span>
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setPhase('explore');
              setCurrentSlide(0);
              setErrors(0);
              audioManager.play('whoosh');
            }}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs"
          >
            Revisit Interactive Labs 🔄
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setPhase('discovery');
              setDiscoveryAnswered(false);
              audioManager.play('whoosh');
            }}
            className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
          >
            Restart Simulation ↺
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // --------------------------------------------------------------------------
  // MAIN COMPONENT RETURN
  // --------------------------------------------------------------------------
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl font-sans border border-slate-800">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-gold-950/80 border border-gold-700/60 rounded-xl text-2xl">
            {subjectConfig.emoji || '📈'}
          </span>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-slate-400">Class 9 ICSE Economic Applications • Multi-Sector Dynamic Simulation</p>
          </div>
        </div>

        {/* Phase Pill Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-[11px]">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow font-semibold'
                  : 'text-slate-500'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Dynamic Content Views */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && renderDiscovery()}
        {phase === 'explore' && renderExploration()}
        {phase === 'sandbox' && renderSandbox()}
        {phase === 'challenge' && renderChallenge()}
        {phase === 'complete' && renderComplete()}
      </AnimatePresence>

      {/* Sim-Engine Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_EconApplicationsInterdependenceSectorsPrimarySim;
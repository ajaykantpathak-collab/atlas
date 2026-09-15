'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 COMMERCE NODE IDS ───
const NODE_C11_COMM_051 = 'c11_comm_051'; // Export Documents: Documentary Bill of Exchange (DA & DP)
const NODE_C11_COMM_052 = 'c11_comm_052'; // Import Documents: Licence, Indent, L/C, Bill of Entry, Bill of Sight, Port Dues
const NODE_C11_COMM_053 = 'c11_comm_053'; // WTO: Meaning & Objectives
const NODE_C11_COMM_054 = 'c11_comm_054'; // Insurance: Meaning, Re-insurance & Double Insurance
const NODE_C11_COMM_055 = 'c11_comm_055'; // Business Risks: Insurable vs Non-insurable
const NODE_C11_COMM_056 = 'c11_comm_056'; // Characteristics of Insurable Risks
const NODE_C11_COMM_057 = 'c11_comm_057'; // Principles: Utmost Good Faith, Insurable Interest, Indemnity
const NODE_C11_COMM_058 = 'c11_comm_058'; // Principles: Contribution, Subrogation, Causa Proxima, Mitigation
const NODE_C11_COMM_059 = 'c11_comm_059'; // Types: Life, Health, Fire, Marine
const NODE_C11_COMM_060 = 'c11_comm_060'; // Types: Motor, Social, Fidelity

const ALL_NODE_IDS = [
  NODE_C11_COMM_051,
  NODE_C11_COMM_052,
  NODE_C11_COMM_053,
  NODE_C11_COMM_054,
  NODE_C11_COMM_055,
  NODE_C11_COMM_056,
  NODE_C11_COMM_057,
  NODE_C11_COMM_058,
  NODE_C11_COMM_059,
  NODE_C11_COMM_060,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Global Trade & Enterprise Risk Directorate: The Bharat-Euro Corridor',
  intro: 'You are appointed Chief Commercial Officer at Shahi Bharat Exports & Logistics in Mumbai. Your firm is handling a high-stakes ₹500 Crore cross-border shipment to Rotterdam, dealing with documentary credit, maritime hazards, custom clearances, and multi-layered corporate insurance syndication.',
  context: 'A storm in the Arabian Sea has damaged cargo, an overseas buyer is demanding credit terms under DA, customs demands documentation at JNPT port, and a multi-insurer claim requires precise indemnity and contribution calculation under Indian statutes.',
};

// ─── BRILLIANT-STYLE PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If a warehouse worth ₹100 Lakh is insured for only ₹60 Lakh (40% under-insured) and suffers an actual fire loss of ₹30 Lakh, what will the insurance company actually pay under the statutory Average Clause?',
    options: [
      'The full ₹30 Lakh because the loss is well within the ₹60 Lakh policy limit',
      '₹18 Lakh, which is exactly 60% of the actual loss',
      'Zero, because under-insuring voids the entire policy under Indian law',
      '₹60 Lakh, the entire insured sum'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Sum Insured slider to ₹60 Lakh and Fire Damage slider to ₹30 Lakh in Lab 3 to verify how the Average Clause reduces the claim.',
    explanation: 'Under the statutory Average Clause: Payout = (Sum Insured / Actual Value) × Loss = (₹60L / ₹100L) × ₹30L = ₹18 Lakh.'
  },
  {
    id: 'pred_2',
    question: 'If an exporter switches payment terms from DA (Documents Against Acceptance) to DP (Documents Against Payment), how does the exporter\'s direct default credit risk change?',
    options: [
      'Increases significantly because the remitting bank delays clearance',
      'Drops to 0% because the foreign buyer cannot receive the Bill of Lading without full cash settlement at sight',
      'Remains unchanged because both require 60 days usance',
      'Doubles because international banks charge higher fees'
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the bill mechanism between DA and DP in Lab 1 to observe the Exporter Risk gauge drop to 0% immediately.',
    explanation: 'Under DP, the collecting bank only hands over title documents (Bill of Lading) against immediate payment at sight, eliminating non-payment risk.'
  }
];

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'What do you notice in the Average Clause visualization when you increase the Sum Insured to match the full Property Value (100%)?',
    observableOptions: [
      'The self-insured penalty gap disappears completely and the insurer pays 100% of the loss',
      'The insurer repudiates payment due to over-coverage',
      'The payout doubles automatically beyond the loss amount',
      'The actual fire loss increases in proportion to the slider'
    ],
    correctIndex: 0,
    explanation: 'When Sum Insured equals or exceeds the actual property value, under-insurance ceases to exist and the insurer indemnifies the full partial loss without any average clause penalty.'
  },
  {
    id: 'obs_2',
    question: 'In the Double Insurance matrix, what do you notice happens to the total client recovery when you vary the individual covers of Insurer A and B?',
    observableOptions: [
      'The total payout changes based on which policy was signed first',
      'The combined payout from both insurers always exactly equals the actual loss, never allowing double recovery',
      'The client receives the sum of both policy covers regardless of actual damage',
      'Insurer A always pays 100% while Insurer B pays nothing'
    ],
    correctIndex: 1,
    explanation: 'Under the Principle of Contribution and Indemnity (Sec 2(11) Insurance Act 1938), insurers share the loss rateably so that total reimbursement never exceeds the actual financial loss.'
  }
];

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Shahi Exports sends a USD 500,000 consignment with a 60-day DA (Documents against Acceptance) bill. When can the foreign buyer legally collect the physical goods from the port?',
  options: [
    'Only after paying the full USD 500,000 at the end of 60 days',
    'Immediately upon accepting (signing) the bill of exchange, before paying',
    'As soon as the ship docks, without signing or paying',
    'Only after providing a government-backed bank guarantee'
  ],
  correctIndex: 1,
  hintAfter: 'A common surprise! In DA, Acceptance unlocks the Bill of Lading (document of title) immediately; payment happens 60 days later, creating credit risk for the exporter.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // Foundation (1-7)
  {
    id: 'ch_001_da_dp_def',
    nodeId: NODE_C11_COMM_051,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does a Documents Against Payment (DP) bill fundamentally protect the Indian exporter compared to a Documents Against Acceptance (DA) bill?',
    options: [
      'In DP, the overseas buyer gets the Bill of Lading only upon immediate cash payment at sight.',
      'In DP, the exporter receives payment directly from the WTO dispute body.',
      'In DP, the buyer signs an acceptance and pays 90 days after collecting goods.',
      'In DP, no bank intermediary is involved in document transmission.'
    ],
    correctIndex: 0,
    explanation: 'Under DP (Documents Against Payment), the collecting bank releases shipping documents (especially the Bill of Lading, which is the document of title) ONLY when the drawee pays the sight bill immediately.',
    hints: [
      'Think about the letter P in DP: Payment before documents.',
      'In DP, the importer cannot touch the cargo without paying the bank first.',
      'The Bill of Lading is released strictly against immediate payment at sight.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_import_docs_sort',
    nodeId: NODE_C11_COMM_052,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of documents filed/used in an Indian import transaction from origin to port clearance.',
    sortItems: [
      'Indent (Purchase Order sent to foreign seller)',
      'Letter of Credit (Opened by Importer Bank)',
      'Bill of Entry (Customs duty declaration under Sec 46)',
      'Port Trust Dues Receipt (Wharfage & handling settlement)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Procedural flow: Indent establishes demand -> L/C provides bank guarantee -> Bill of Entry assesses customs duty -> Port Trust Dues Receipt clears port charges for final cargo release.',
    hints: [
      'Commercial order comes first before bank financing.',
      'Customs declaration happens upon vessel arrival before port wharfage payment.',
      'The sequence is: Indent -> L/C -> Bill of Entry -> Port Trust Dues Receipt.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_wto_obj',
    nodeId: NODE_C11_COMM_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The WTO was established on 1 January 1995 via the Marrakesh Agreement. Which of the following is an explicit core objective set in its Preamble?',
    options: [
      'To fix currency exchange rates for developing countries',
      'Raising standards of living and ensuring full employment through sustainable global trade expansion',
      'To act as a commercial insurance underwriter for shipping lines',
      'To enforce mandatory uniform income tax rates across all member nations'
    ],
    correctIndex: 1,
    explanation: 'The Marrakesh Agreement Preamble outlines five core WTO objectives: raising standards of living, ensuring full employment, expanding production/trade in goods & services, optimal resource use, and sustainable development.',
    hints: [
      'WTO deals with trade liberalisation and living standards, not monetary policy.',
      'It replaced GATT to govern goods, services (GATS), and intellectual property (TRIPS).',
      'Core goals focus on living standards, employment growth, and sustainable trade expansion.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_004_pure_vs_speculative',
    nodeId: NODE_C11_COMM_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A sudden crash in the BSE Sensex causes a corporate stock portfolio to drop by ₹10 Crore. Why is this risk non-insurable under Indian insurance law?',
    options: [
      'It is a speculative risk with possibilities of gain, loss, or break-even, driven by market forces.',
      'General insurers in India are prohibited from insuring companies with more than 100 employees.',
      'The loss happened during market trading hours rather than overnight.',
      'The stock exchange automatically acts as an insurer under SEBI Act 1992.'
    ],
    correctIndex: 0,
    explanation: 'Under Section 2(6A) of the Insurance Act 1938, insurance covers pure risks (loss or no loss, purely accidental). Speculative risks involve the potential for gain and cannot be separated from commercial market forces.',
    hints: [
      'Can an investor profit from a stock price movement? If yes, it is speculative.',
      'Insurance covers only pure risks where there is no possibility of gain.',
      'Speculative market risks are managed through hedging or diversification, not insurance.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_005_good_faith_sec45',
    nodeId: NODE_C11_COMM_057,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the principle of Utmost Good Faith (Uberrimae Fidei) and Section 45 of the Insurance Act 1938, what is the incontestability window for life insurance?',
    options: [
      '1 year from policy issuance',
      '3 years from policy issuance or revival',
      '10 years from the date of first premium receipt',
      'The policy can be questioned at any time indefinitely for unintentional errors'
    ],
    correctIndex: 1,
    explanation: 'Under Section 45 of the Insurance Act 1938 (amended 2015), no life insurance policy can be called in question by an insurer on any ground after the expiry of three years from issuance or revival.',
    hints: [
      'The 2015 Amendment created a strict time window to protect policyholder nominees.',
      'Count exactly 36 months.',
      'The incontestability period is 3 years.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_006_motor_compulsory',
    nodeId: NODE_C11_COMM_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 146 of the Motor Vehicles Act 1988, which component of motor insurance is legally compulsory for every vehicle plying on Indian roads?',
    options: [
      'Own-Damage (OD) Cover for vehicle body dents and paint repair',
      'Third-Party (TP) Liability Cover for death, bodily injury, or third-party property damage',
      'Zero Depreciation bumper-to-bumper rider',
      'Engine protection and roadside assistance add-on'
    ],
    correctIndex: 1,
    explanation: 'Section 146 of the Motor Vehicles Act 1988 makes Third-Party Liability insurance compulsory to safeguard innocent victims. Own-Damage cover is optional under IRDAI regulations.',
    hints: [
      'The law aims to protect innocent pedestrians and other road users.',
      'Own-damage covers your car; third-party covers harm done to others.',
      'Third-party cover is statutory and mandatory; own-damage is voluntary.'
    ],
  },
  {
    id: 'ch_007_life_indemnity_exception',
    nodeId: NODE_C11_COMM_059,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is Life Insurance treated as an EXCEPTION to the fundamental Principle of Indemnity?',
    options: [
      'Human life has no quantifiable, objective monetary replacement valuation.',
      'Life insurance premiums are exempt from GST under Ministry of Finance rules.',
      'Life insurance policies cannot be assigned or nominated to family members.',
      'Life insurance companies are fully owned by the Reserve Bank of India.'
    ],
    correctIndex: 0,
    explanation: 'Indemnity requires restoring the insured to the exact financial pre-loss state. Because human life cannot be priced in money, life insurance is a contract of guarantee/assurance paying the fixed Sum Assured.',
    hints: [
      'Can an actuary calculate the exact monetary loss of a human soul to perfection?',
      'Property has replacement value; human life is priceless.',
      'Life insurance pays the pre-agreed sum assured, not a calculated indemnity.'
    ],
    misconceptionIndex: 0,
  },

  // Standard (8-15)
  {
    id: 'ch_008_average_clause_calc',
    nodeId: NODE_C11_COMM_057,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Tata Motors godown valued at ₹80,00,000 is under-insured for ₹60,00,000 under a Fire Policy. A fire causes an actual partial loss of ₹32,00,000. Applying the Average Clause, calculate the exact claim payout in Rupees.',
    correctAnswer: 2400000,
    tolerance: 1000,
    unit: '₹',
    explanation: 'Average Clause Formula = (Sum Insured / Actual Value) × Loss. Here: (₹60,00,000 / ₹80,00,000) × ₹32,00,000 = 0.75 × ₹32,00,000 = ₹24,00,000.',
    hints: [
      'The ratio of under-insurance is Sum Insured / Total Actual Value.',
      '60 lakh / 80 lakh = 3/4 or 75%.',
      'Multiply 0.75 by the actual loss of 32,00,000 to get 24,00,000.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_009_double_ins_contribution_calc',
    nodeId: NODE_C11_COMM_058,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Surat textile mill insures fabric stock with National Insurance for ₹6,00,000 and Oriental Insurance for ₹4,00,000. A fire causes a loss of ₹5,00,000. Calculate National Insurance\'s rateable contribution in Rupees.',
    correctAnswer: 300000,
    tolerance: 500,
    unit: '₹',
    explanation: 'Total Sum Insured = ₹6L + ₹4L = ₹10L. National Insurance share = (₹6L / ₹10L) × ₹5,00,000 = 60% × ₹5,00,000 = ₹3,00,000.',
    hints: [
      'Calculate the total coverage across both policies first (6L + 4L = 10L).',
      'National Insurance covers 6 out of 10 parts of the total risk.',
      'National pays 6/10 × 5,00,000 = 3,00,000.'
    ],
  },
  {
    id: 'ch_010_reinsurance_retention_calc',
    nodeId: NODE_C11_COMM_054,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'New India Assurance underwrites a ₹1,000 Crore refinery policy. Its board retention limit is ₹200 Crore (20%), and it cedes ₹800 Crore (80%) to GIC Re. When a ₹500 Crore explosion occurs, how much does New India recover from GIC Re in Crores?',
    correctAnswer: 400,
    tolerance: 1,
    unit: 'Crores',
    explanation: 'New India cedes 80% of risk (800/1000). On a loss of ₹500 Cr, recovery from reinsurer = 80% × ₹500 Cr = ₹400 Cr. New India pays ₹500 Cr to client and recovers ₹400 Cr from GIC Re, retaining ₹100 Cr net loss.',
    hints: [
      'Calculate the ceded percentage: 800 Crore / 1000 Crore = 80%.',
      'The reinsurer pays its proportionate share of the actual loss.',
      '80% of 500 Crore is 400 Crore.'
    ],
  },
  {
    id: 'ch_011_subrogation_action',
    nodeId: NODE_C11_COMM_058,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'ICICI Lombard indemnifies a car owner with ₹8,00,000 after an accident caused by a rash commercial truck. Which statement correctly outlines the legal standing under Subrogation?',
    options: [
      'The car owner can also sue the truck owner in the Motor Accidents Claims Tribunal and keep both sums.',
      'ICICI Lombard steps into the shoes of the insured to sue the truck owner for ₹8,00,000 and retains the car salvage.',
      'The truck owner is completely absolved of all civil and criminal liabilities.',
      'The claim amount must be refunded to ICICI Lombard by the state transport department.'
    ],
    correctIndex: 1,
    explanation: 'Under Subrogation (codified in Marine Insurance Act 1963 and general law), upon paying indemnity the insurer acquires all rights of action against negligent third parties and salvage rights, preventing double recovery.',
    hints: [
      'Subrogation prevents the insured from enriching themselves twice.',
      'The insurer assumes the legal rights of the insured against the tortfeasor.',
      'The insurer sues the negligent third party in the insured\'s name.'
    ],
  },
  {
    id: 'ch_012_causa_proxima_marine',
    nodeId: NODE_C11_COMM_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A cargo vessel insured against Fire (peril included) but NOT against Collision (peril excluded) suffers a severe collision that punctures fuel tanks, causing an immediate massive fire. Is the insurer liable?',
    options: [
      'Yes, because fire occurred right before the ship sank in chronological time.',
      'No, because the proximate (nearest in efficiency / dominant) cause was Collision, which was an excluded peril.',
      'Yes, because all marine policies automatically convert into full comprehensive cover in international waters.',
      'No, because marine insurance contracts are governed strictly by caveat emptor without proximate cause.'
    ],
    correctIndex: 1,
    explanation: 'Causa Proxima non remota spectatur looks at the dominant, effective cause that set the chain in motion (Collision), not the nearest in time (Fire). Since Collision is excluded, the insurer is not liable.',
    hints: [
      'Proximate cause means nearest in efficiency, not nearest in time.',
      'What was the initiating dominant cause that caused the fuel leak and fire?',
      'Collision caused the fire; since collision is excluded, liability is denied.'
    ],
  },
  {
    id: 'ch_013_bill_of_sight_usage',
    nodeId: NODE_C11_COMM_052,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Under what specific circumstance will an Indian customs broker file a "Bill of Sight" instead of a regular "Bill of Entry" at JNPT port?',
    options: [
      'When goods arrive without complete invoices or specifications to allow provisional assessment',
      'When importing non-commercial gifts valued below ₹5,000',
      'When the importer holds an advance export licence from DGFT',
      'When the vessel captain refuses to sign the Mate\'s Receipt'
    ],
    correctIndex: 0,
    explanation: 'A Bill of Sight is a provisional customs entry filed under Customs Act 1962 when complete invoice/specification details are missing upon landing, later regularised with a Supplementary Bill of Entry.',
    hints: [
      'Think of an importer who cannot see or determine exact prices or invoice breakdowns yet.',
      'It is a provisional document to avoid port congestion and demurrage.',
      'Used for provisional assessment until full invoices arrive.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_014_pmfby_subsidy_calc',
    nodeId: NODE_C11_COMM_060,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Vidarbha farmer insures his Kharif cotton crop under PMFBY for a Sum Insured of ₹2,00,000. The actuarial commercial premium is 8% (₹16,000). The farmer pays the statutorily capped Kharif rate of 2%. What is the Government subsidy amount in Rupees?',
    correctAnswer: 12000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Total actuarial premium = 8% of ₹2,00,000 = ₹16,000. Farmer pays capped 2% = ₹4,000. Government subsidy (shared by State and Centre) = ₹16,000 - ₹4,000 = ₹12,000.',
    hints: [
      'Calculate total premium: 8% of 2,00,000 = 16,000.',
      'Calculate farmer share: 2% of 2,00,000 = 4,000.',
      'Subtract farmer share from total premium: 16,000 - 4,000 = 12,000.'
    ],
  },
  {
    id: 'ch_015_fidelity_guarantee_scope',
    nodeId: NODE_C11_COMM_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'State Bank of India holds a Fidelity Guarantee Policy from New India Assurance. Which of the following events qualifies for a valid claim payout?',
    options: [
      'A loan default caused by general economic recession and poor market demand',
      'A branch cashier forging client withdrawal slips and embezzling ₹45,00,000 in cash',
      'A teller making an innocent clerical typing error on an RTGS transfer slip',
      'A branch building suffering structural wall cracks during heavy monsoon rain'
    ],
    correctIndex: 1,
    explanation: 'Fidelity Guarantee insurance specifically indemnifies employers against financial losses caused by dishonest or fraudulent acts of employees (IPC Sec 406/420), not errors of judgement or natural perils.',
    hints: [
      'Fidelity refers to faithfulness/honesty in positions of trust.',
      'Covers fraud, embezzlement, and forgery by employees.',
      'Embezzlement and forgery are dishonest acts triggering fidelity cover.'
    ],
  },

  // Advanced (16-22)
  {
    id: 'ch_016_drag_label_principles',
    nodeId: NODE_C11_COMM_057,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match each Insurance Principle with its core statutory mechanism.',
    dragItems: [
      { label: 'Uberrimae Fidei', targetId: 'part_top' },
      { label: 'Insurable Interest', targetId: 'part_middle' },
      { label: 'Indemnity', targetId: 'part_bottom' },
      { label: 'Subrogation', targetId: 'part_side' }
    ],
    correctMapping: {
      part_top: 'Uberrimae Fidei',
      part_middle: 'Insurable Interest',
      part_bottom: 'Indemnity',
      part_side: 'Subrogation'
    },
    explanation: 'Uberrimae Fidei mandates full material disclosure; Insurable Interest prevents wagering (Sec 26 Contract Act); Indemnity restores pre-loss status; Subrogation transfers rights against third parties.',
    hints: [
      'Top: Duty of full honest disclosure at proposal stage.',
      'Middle: Legal financial stake in the subject matter.',
      'Bottom: Exact compensation of actual loss (no profit).',
    ],
  },
  {
    id: 'ch_017_insurable_interest_timing',
    nodeId: NODE_C11_COMM_057,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare the required timing of Insurable Interest across Life, Fire, and Marine Insurance under Indian law.',
    options: [
      'Life: At inception only; Fire: At inception AND loss; Marine: At the time of loss only.',
      'Life: At the time of loss only; Fire: At inception only; Marine: Continuous 3-year presence.',
      'Life: Both inception and loss; Fire: At loss only; Marine: Never required.',
      'All three classes require insurable interest strictly only on the date of policy expiry.'
    ],
    correctIndex: 0,
    explanation: 'In Life insurance, interest must exist at inception (e.g. spouse, creditor); in Fire, at inception AND at time of loss (ownership must continue); in Marine, at the time of loss only (Sec 51 Marine Ins Act, as cargo is traded en route).',
    hints: [
      'Marine cargo changes ownership multiple times on the high seas.',
      'Fire requires you to own the property when insuring and when it burns.',
      'Life requires insurable interest only when taking the policy.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_018_ecgc_da_hedging',
    nodeId: NODE_C11_COMM_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A Tirupur garment exporter is offering a 90-day DA bill of USD 1,000,000 to a new buyer in an emerging market. How can the exporter strategically mitigate the severe credit risk inherent in DA?',
    options: [
      'Insist on converting the contract into an unconditional gift agreement under WTO rules.',
      'Procure an ECGC (Export Credit Guarantee Corporation) policy covering up to 90% of default risk.',
      'Request the shipping line to hold the cargo in the ship\'s hull forever.',
      'Draw the bill on the Reserve Bank of India rather than the buyer.'
    ],
    correctIndex: 1,
    explanation: 'ECGC under the Ministry of Commerce provides credit risk insurance covering up to 90% of losses on DA usance bills arising from overseas buyer insolvency or protracted default.',
    hints: [
      'Which Indian state agency specialises in insuring export credit risks?',
      'ECGC stands for Export Credit Guarantee Corporation.',
      'ECGC covers up to 90% of commercial and political default risks.'
    ],
  },
  {
    id: 'ch_019_mitigation_breach_eval',
    nodeId: NODE_C11_COMM_058,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During Mumbai flash floods, rising water enters a ground-floor electronics showroom. The owner refuses to move ₹10 Lakh worth of laptops to the dry first floor, stating "New India Assurance will pay." How does the law respond?',
    options: [
      'The insurer must pay the full ₹10 Lakh plus a 20% moral bonus.',
      'The insurer can repudiate or reduce the claim proportionately due to breach of the duty to Mitigate Loss under Section 73 Indian Contract Act.',
      'The owner is entitled to double compensation from municipal authorities and insurer.',
      'The claim is automatically transferred to the WTO dispute panel.'
    ],
    correctIndex: 1,
    explanation: 'The Principle of Mitigation requires the insured to take all reasonable steps a prudent uninsured person would take. Deliberate failure to save property allows the insurer to disallow aggravated losses.',
    hints: [
      'Can an insured stand by and watch property drown because they have insurance?',
      'The insured must act as a prudent uninsured person.',
      'Breach of mitigation allows insurers to disallow or reduce the claim.'
    ],
  },
  {
    id: 'ch_020_wto_india_food_sec',
    nodeId: NODE_C11_COMM_053,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At WTO Ministerial Conferences (MC13 Abu Dhabi / Bali), India defended its Public Stockholding & MSP food security programmes by invoking which mechanism?',
    options: [
      'The "Peace Clause" shielding developing nations from dispute challenges for exceeding agricultural support limits',
      'A complete unilateral withdrawal from the Marrakesh Agreement',
      'The TRIPS compulsory software patent waiver',
      'An emergency loan facility from the International Monetary Fund'
    ],
    correctIndex: 0,
    explanation: 'India relies on the Bali "Peace Clause" and MC13 negotiations to protect its Minimum Support Price (MSP) and Public Distribution System for 80 crore beneficiaries from being penalised under WTO subsidy caps.',
    hints: [
      'Think of the agricultural subsidy dispute shielding clause secured in Bali (2013).',
      'It prevents other countries from taking legal action against food security stockpiles.',
      'It is called the Peace Clause.'
    ],
  },
  {
    id: 'ch_021_insurable_characteristics_construct',
    nodeId: NODE_C11_COMM_056,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Select the 4 essential operational characteristics required for a risk to be statistically and actuarially insurable.',
    availableParts: [
      'Homogeneous Pool',
      'Accidental Loss',
      'Measurable Loss',
      'Economically Feasible Premium',
      'Guaranteed Speculative Gain',
      'Catastrophic High Correlation',
      'Subjective Sentimental Value'
    ],
    targetState: 'Homogeneous Pool Accidental Loss Measurable Loss Economically Feasible Premium',
    validationHint: 'Select: Homogeneous Pool, Accidental Loss, Measurable Loss, Economically Feasible Premium',
    explanation: 'The six conditions for insurability include: large homogeneous pool, fortuitous (accidental) loss, financial measurability, non-catastrophic spread, calculable probability, and feasible premium.',
    hints: [
      'Exclude speculative gain and subjective emotions.',
      'Select the 4 core actuarial traits: pool, accidental, measurable, feasible.',
      'Click the 4 valid cards to assemble the risk profile.'
    ],
  },
  {
    id: 'ch_022_double_vs_reinsurance_eval',
    nodeId: NODE_C11_COMM_054,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Contrast Re-insurance and Double Insurance on the basis of initiating party and privity of contract with the original policyholder.',
    options: [
      'Re-insurance: Initiated by Insurer (no privity between client & reinsurer); Double Insurance: Initiated by Insured (client has direct contracts with all insurers).',
      'Re-insurance: Initiated by Client; Double Insurance: Initiated by GIC Re exclusively.',
      'Re-insurance: Violates indemnity; Double Insurance: Guarantees double profits.',
      'There is no structural or legal difference; both are interchangeable terms in the Insurance Act.'
    ],
    correctIndex: 0,
    explanation: 'In Re-insurance, the ceding insurer transfers risk to protect solvency; the client has no contract with the reinsurer. In Double Insurance, the client buys multiple policies on the same subject, governed by Contribution.',
    hints: [
      'Who initiates re-insurance? The insurance company.',
      'Who initiates double insurance? The policyholder (insured).',
      'In re-insurance, the client cannot sue the reinsurer directly.'
    ],
    misconceptionIndex: 0,
  }
];

// ─── DEFAULT PROPS ───
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
  nodeId: NODE_C11_COMM_051,
  title: 'Export-Import Documentation, WTO & Insurance Architecture',
  definition: 'An integrated framework of international documentary trade mechanisms (DA/DP bills, L/C, Customs Entry), multilateral WTO governance, and statutory insurance risk transfer principles (Uberrimae Fidei, Insurable Interest, Indemnity, Contribution, Subrogation).',
  eli5: 'Think of global trade like an adventure: shipping documents ensure your cargo and money swap safely across oceans, the WTO sets fair playground rules, and insurance acts as a safety net so accidents do not bankrupt businesses.',
  misconceptions: [
    {
      misconception: 'DA means Documents Against Amount, and the importer pays before taking delivery.',
      correction: 'DA stands for Documents Against Acceptance. The importer signs an acceptance on a usance bill, takes delivery immediately, and pays on the due date (e.g. 60 days later).'
    },
    {
      misconception: 'Every import into India requires a restricted import licence.',
      correction: 'Freely importable items under Open General Licence (OGL) need only an IEC (Import Export Code). Licences are reserved for restricted items.'
    },
    {
      misconception: 'Under-insurance in fire policy still pays the full partial loss without reduction.',
      correction: 'Under the Average Clause, if property is insured for less than its real value, any partial loss claim is reduced proportionately: (Sum Insured / Actual Value) × Loss.'
    },
    {
      misconception: 'Double insurance allows a businessman to collect full claims from multiple insurers and profit.',
      correction: 'Under the Principle of Contribution and Indemnity (Sec 2(11) Insurance Act 1938), insurers share the loss rateably. Total payout never exceeds the actual loss.'
    },
    {
      misconception: 'Life insurance is an indemnity contract that reimburses financial loss upon death.',
      correction: 'Life insurance is an exception to indemnity because human life cannot be assigned a monetary value; it pays the full pre-fixed Sum Assured.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What does DA stand for in documentary bills?', options: ['Documents Against Amount', 'Documents Against Acceptance', 'Delivery After Authorization', 'Discounted Asset'], correctIndex: 1 },
    { question: 'Which document represents title to goods in marine export?', options: ['Certificate of Origin', 'Bill of Lading', 'Shipping Order', 'Commercial Invoice'], correctIndex: 1 },
    { question: 'In double insurance, how do insurers settle claims?', options: ['First insurer pays all', 'Insurers contribute rateably', 'Client gets double payout', 'Government pays difference'], correctIndex: 1 },
    { question: 'Which statutory body fixes third-party motor premium rates in India?', options: ['RBI', 'IRDAI', 'SEBI', 'Ministry of Road Transport'], correctIndex: 1 },
    { question: 'What is the incontestability period under Section 45 Insurance Act 1938?', options: ['1 Year', '2 Years', '3 Years', '5 Years'], correctIndex: 2 },
    { question: 'Which WTO agreement governs international trade in services like IT?', options: ['GATT', 'GATS', 'TRIPS', 'TRIMS'], correctIndex: 1 },
    { question: 'A provisional bill filed when invoice details are incomplete is called:', options: ['Bill of Lading', 'Bill of Sight', 'Bill of Entry', 'Shipping Bill'], correctIndex: 1 },
    { question: 'What is the primary national reinsurer in India?', options: ['LIC of India', 'GIC Re', 'SBI General', 'New India Assurance'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is achieved when the student accurately analyses DA/DP trade risks, computes Average Clause and Double Insurance apportionments, and navigates statutory insurance principles.',
};

// ─── 5 INTERACTIVE EXPLORATION LAB STEPS ───
const EXPLORATION_STEPS = [
  {
    id: 'step_dadp',
    title: 'Lab 1: The DA vs DP Trade Finance Simulator',
    instruction: 'Toggle between DA (Documents Against Acceptance) and DP (Documents Against Payment) and adjust the Credit Tenor slider to observe real-time Exporter Risk vs Importer Cash Flow.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_051,
  },
  {
    id: 'step_import_flow',
    title: 'Lab 2: The JNPT Customs Document Pipeline',
    instruction: 'Click each stage of the import cargo clearance sequence to inspect statutory authorities (DGFT, Bank, Customs, Port Trust) and document validity.',
    interactionType: 'click-stage',
    nodeId: NODE_C11_COMM_052,
  },
  {
    id: 'step_average_clause',
    title: 'Lab 3: Fire Under-Insurance & Average Clause Workbench',
    instruction: 'Manipulate Property Value, Sum Insured, and Fire Damage sliders to witness how the statutory Average Clause dynamically reduces claim payouts.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_057,
  },
  {
    id: 'step_contribution_matrix',
    title: 'Lab 4: Double Insurance Contribution Calculator',
    instruction: 'Adjust policy covers across Insurer A (National) and Insurer B (Oriental) to observe the rateable mathematical apportionment of loss without violating Indemnity.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_058,
  },
  {
    id: 'step_reinsurance_syndicate',
    title: 'Lab 5: Re-Insurance Solvency & Risk Cession Model',
    instruction: 'Simulate a ₹1,000 Cr catastrophic claim on an oil refinery: set New India\'s Board Retention limit and see the cession flow to GIC Re and Lloyd\'s.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_054,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Export Risk Officer Capstone: Auditing a ₹100 Crore Consignment',
  description: 'Apply your mastery to structure an end-to-end commercial trade package for an Indian pharmaceutical exporter shipping vaccines to South America.',
  steps: [
    'Evaluate buyer credit rating and determine whether to issue a 60-day DA or sight DP bill.',
    'Apply for ECGC export credit insurance covering 90% of political and insolvency risk.',
    'Execute Open Marine Cargo Insurance on CIF terms under Institute Cargo Clauses (A).',
    'Structure customs documentation: Bill of Lading, Certificate of Origin, and Port Trust Dues clearance.'
  ],
};

function C11_CommerceExportDocumentsDocumentarySim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {

  // Subject Config
  const subjectConfig = SUBJECT_CONFIG['commerce'] || { name: 'Commerce', emoji: '📜', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Lab 1: DA vs DP Interactive State
  const [billType, setBillType] = useState<'DA' | 'DP'>('DA');
  const [creditTenorDays, setCreditTenorDays] = useState(60);
  const [ecgcCoverActive, setEcgcCoverActive] = useState(true);

  // Lab 2: Import Pipeline State
  const [activeImportStage, setActiveImportStage] = useState<number>(0);

  // Lab 3: Average Clause Interactive State
  const [propertyValueLakh, setPropertyValueLakh] = useState(100);
  const [sumInsuredLakh, setSumInsuredLakh] = useState(60);
  const [fireLossLakh, setFireLossLakh] = useState(30);

  // Lab 4: Double Insurance State
  const [insurerACover, setInsurerACover] = useState(60);
  const [insurerBCover, setInsurerBCover] = useState(40);
  const [doubleLossAmount, setDoubleLossAmount] = useState(50);

  // Lab 5: Reinsurance State
  const [grossRefineryRisk] = useState(1000);
  const [retentionPercent, setRetentionPercent] = useState(20);
  const [refineryExplosionLoss, setRefineryExplosionLoss] = useState(400);

  // Prediction & Observation Interactive States
  const [predictionAnswers, setPredictionAnswers] = useState<Record<string, number>>({});
  const [predictionRevealed, setPredictionRevealed] = useState<Record<string, boolean>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number>>({});
  const [observationRevealed, setObservationRevealed] = useState<Record<string, boolean>>({});

  // Adaptive BKT & SRS State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interaction Feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Drag-and-drop & Non-MCQ challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
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

  // ─── LIVE CALCULATIONS ───
  // Average Clause calculation
  const averageClausePayout = useMemo(() => {
    if (propertyValueLakh <= 0) return 0;
    const actualLoss = Math.min(fireLossLakh, propertyValueLakh);
    if (sumInsuredLakh >= propertyValueLakh) return actualLoss;
    return Number(((sumInsuredLakh / propertyValueLakh) * actualLoss).toFixed(2));
  }, [propertyValueLakh, sumInsuredLakh, fireLossLakh]);

  // Double Insurance Contribution calculation
  const doubleInsurancePayout = useMemo(() => {
    const totalCover = insurerACover + insurerBCover;
    if (totalCover <= 0) return { insurerA: 0, insurerB: 0, total: 0 };
    const cappedLoss = Math.min(doubleLossAmount, totalCover);
    const shareA = Number(((insurerACover / totalCover) * cappedLoss).toFixed(2));
    const shareB = Number(((insurerBCover / totalCover) * cappedLoss).toFixed(2));
    return { insurerA: shareA, insurerB: shareB, total: Number((shareA + shareB).toFixed(2)) };
  }, [insurerACover, insurerBCover, doubleLossAmount]);

  // Re-insurance retention calculation
  const reinsuranceCalc = useMemo(() => {
    const retentionAmt = (grossRefineryRisk * retentionPercent) / 100;
    const cededAmt = grossRefineryRisk - retentionAmt;
    const cededRatio = grossRefineryRisk > 0 ? cededAmt / grossRefineryRisk : 0;
    const recoveryFromGIC = Number((refineryExplosionLoss * cededRatio).toFixed(2));
    const netInsurerLoss = Number((refineryExplosionLoss - recoveryFromGIC).toFixed(2));
    return { retentionAmt, cededAmt, recoveryFromGIC, netInsurerLoss };
  }, [grossRefineryRisk, retentionPercent, refineryExplosionLoss]);

  // ─── 2D CANVAS ANIMATION (Trade Flow & Bill Processing) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const render = () => {
      particleOffset = (particleOffset + 1.2) % 100;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Track
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Trade route line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(30, 30);
      ctx.lineTo(canvas.width - 30, 30);
      ctx.stroke();

      // Flowing document / cargo packets
      const totalWidth = canvas.width - 60;
      for (let i = 0; i < 4; i++) {
        const x = 30 + ((particleOffset + i * 25) % 100) * (totalWidth / 100);
        ctx.beginPath();
        ctx.arc(x, 30, 6, 0, Math.PI * 2);
        ctx.fillStyle = billType === 'DP' ? '#10b981' : '#f59e0b';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Origin and Destination Ports
      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('⚓ JNPT Mumbai', 20, 52);
      ctx.fillText('🚢 Rotterdam Port', canvas.width - 100, 52);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [billType]);

  // ─── ESCALATING HINTS CALLBACK ───
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
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding observation!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setPropertyValueLakh(val);
  }, []);

  // ─── PREDICTION HANDLER ───
  const handlePredictionSubmit = useCallback((predId: string, optIndex: number) => {
    setPredictionAnswers(prev => ({ ...prev, [predId]: optIndex }));
    setPredictionRevealed(prev => ({ ...prev, [predId]: true }));
    const q = PREDICTION_QUESTIONS.find(p => p.id === predId);
    if (q) {
      const isCorrect = optIndex === q.correctIndex;
      audioManager.play(isCorrect ? 'success' : 'pop');
      speechManager.speak(isCorrect ? 'Great prediction! Now verify it on the live workbench.' : 'Interesting prediction! Test the interactive sliders below to verify.');
    }
  }, []);

  // ─── OBSERVATION HANDLER ───
  const handleObservationSubmit = useCallback((obsId: string, optIndex: number) => {
    setObservationAnswers(prev => ({ ...prev, [obsId]: optIndex }));
    setObservationRevealed(prev => ({ ...prev, [obsId]: true }));
    const q = OBSERVATION_QUESTIONS.find(o => o.id === obsId);
    if (q) {
      const isCorrect = optIndex === q.correctIndex;
      audioManager.play(isCorrect ? 'success' : 'pop');
      speechManager.speak(isCorrect ? 'Spot on observation!' : 'Check the live numbers and bars above to observe the statutory behavior.');
    }
  }, []);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate the variables to discover how trade and insurance function.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all parameters with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Apply your insights to solve CISCE examination scenarios.');
  }, []);

  // ─── SIMULATION LAB CONTROL HANDLERS ───
  const handleBillTypeToggle = useCallback((type: 'DA' | 'DP') => {
    setBillType(type);
    audioManager.play('tap');
    speechManager.speak(type === 'DA' ? 'Documents Against Acceptance selected. Importer receives goods against signature.' : 'Documents Against Payment selected. Payment required at sight before goods release.');
  }, []);

  const handleCreditTenorChange = useCallback((tenor: number) => {
    setCreditTenorDays(tenor);
    audioManager.play('count');
  }, []);

  const handleEcgcToggle = useCallback(() => {
    setEcgcCoverActive(prev => {
      audioManager.play('tap');
      return !prev;
    });
  }, []);

  const handleImportStageClick = useCallback((stageIndex: number) => {
    setActiveImportStage(stageIndex);
    audioManager.play('tap');
  }, []);

  const handlePropertyValueChange = useCallback((val: number) => {
    setPropertyValueLakh(val);
    audioManager.play('count');
  }, []);

  const handleSumInsuredChange = useCallback((val: number) => {
    setSumInsuredLakh(val);
    audioManager.play('count');
  }, []);

  const handleFireLossChange = useCallback((val: number) => {
    setFireLossLakh(val);
    audioManager.play('count');
  }, []);

  const handleInsurerACoverChange = useCallback((val: number) => {
    setInsurerACover(val);
    audioManager.play('count');
  }, []);

  const handleInsurerBCoverChange = useCallback((val: number) => {
    setInsurerBCover(val);
    audioManager.play('count');
  }, []);

  const handleDoubleLossChange = useCallback((val: number) => {
    setDoubleLossAmount(val);
    audioManager.play('count');
  }, []);

  const handleRetentionPercentChange = useCallback((val: number) => {
    setRetentionPercent(val);
    audioManager.play('count');
  }, []);

  const handleRefineryLossChange = useCallback((val: number) => {
    setRefineryExplosionLoss(val);
    audioManager.play('count');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the simulation with a mastery score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE RESET ───
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

  // ─── DRAG & DROP HANDLERS ───
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

  // ─── ANSWER SUBMIT HANDLER ───
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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent mastery.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us review the step-by-step statutory explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, showNextHint, hitMisconceptions]);

  // ─── INACTIVITY AUTO-HINT ───
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (phase === 'challenge' && !showExplanation && !answerRevealed && hintCount === 0) {
      inactivityTimerRef.current = setTimeout(() => {
        showNextHint();
      }, 10000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, showExplanation, answerRevealed, hintCount, showNextHint, currentChallenge]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      
      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-800">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/50 px-2.5 py-0.5 rounded-full border border-indigo-800/60">
                ISC Class 11 • Commercial Studies
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 text-rose-400 border border-rose-700'
                    : 'bg-amber-950/80 text-amber-400 border border-amber-700'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-white mt-1">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(tab => (
            <motion.button
              key={tab}
              aria-label={`Switch to ${tab} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(tab);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition-colors ${
                phase === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/80">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🌐</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/50 text-xs text-indigo-200">
              <strong>Scenario Backdrop:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Curiosity Challenge</span>
            <p className="text-base font-semibold text-white mt-2">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Discovery option ${String.fromCharCode(65 + i)}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-500'
                      : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : discoveryAnswered ? '✗ ' : ''}
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on!' : '💡 Key Insight:'} {DISCOVERY_QUESTION.hintAfter}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    aria-label="Enter interactive trade and risk labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2"
                  >
                    Enter Interactive Trade & Risk Labs →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED EXPLORATION LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Lab Step Selector */}
          <div className="flex flex-wrap gap-2">
            {EXPLORATION_STEPS.map((s, idx) => (
              <motion.button
                key={s.id}
                aria-label={`Go to Lab step ${idx + 1}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                  ISC Commerce Interactive Simulation Lab {currentSlide + 1} of 5
                </span>
                <h2 className="text-lg font-bold text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-xs text-amber-300/90 mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: DA vs DP SIMULATOR (WITH SVG DIAGRAM 1) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Prediction Question 2: Predict-then-Check Pattern */}
                  <div className="p-4 bg-indigo-950/40 border border-indigo-800/80 rounded-xl space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 bg-indigo-600 text-white rounded-md uppercase">Predict First</span>
                      <span className="text-xs text-indigo-300 font-semibold">{PREDICTION_QUESTIONS[1].question}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {PREDICTION_QUESTIONS[1].options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handlePredictionSubmit(PREDICTION_QUESTIONS[1].id, oIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition-all border ${
                            predictionRevealed[PREDICTION_QUESTIONS[1].id]
                              ? oIdx === PREDICTION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                                : predictionAnswers[PREDICTION_QUESTIONS[1].id] === oIdx
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                : 'bg-slate-950/50 border-slate-800 text-slate-500'
                              : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-bold text-indigo-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                    {predictionRevealed[PREDICTION_QUESTIONS[1].id] && (
                      <p className="text-xs text-amber-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 flex items-start gap-1.5">
                        <span>🔍</span> <span><strong>Verify Instruction:</strong> {PREDICTION_QUESTIONS[1].verifyInstruction}</span>
                      </p>
                    )}
                  </div>

                  {/* Topic-Specific SVG Diagram 1: Documentary Trade Flow */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase mb-2">Statutory Trade Flow Representation (SVG 1)</span>
                    <svg viewBox="0 0 700 130" className="w-full max-h-36 rounded-lg bg-slate-900/80">
                      {/* Exporter Node */}
                      <rect x="20" y="20" width="130" height="80" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="85" y="45" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">🇮🇳 Indian Exporter</text>
                      <text x="85" y="65" fill="#a5b4fc" fontSize="10" textAnchor="middle">Shahi Logistics</text>
                      <text x="85" y="85" fill="#818cf8" fontSize="9" textAnchor="middle">Draws {billType} Bill</text>

                      {/* Exporter Bank Node */}
                      <rect x="190" y="20" width="130" height="80" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="255" y="45" fill="#bae6fd" fontSize="12" fontWeight="bold" textAnchor="middle">Remitting Bank</text>
                      <text x="255" y="65" fill="#7dd3fc" fontSize="10" textAnchor="middle">SBI Mumbai</text>
                      <text x="255" y="85" fill="#38bdf8" fontSize="9" textAnchor="middle">Dispatches B/L</text>

                      {/* Foreign Bank Node */}
                      <rect x="370" y="20" width="130" height="80" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="435" y="45" fill="#bae6fd" fontSize="12" fontWeight="bold" textAnchor="middle">Collecting Bank</text>
                      <text x="435" y="65" fill="#7dd3fc" fontSize="10" textAnchor="middle">Rotterdam Bank</text>
                      <text x="435" y="85" fill={billType === 'DP' ? '#34d399' : '#fbbf24'} fontSize="9" fontWeight="bold" textAnchor="middle">
                        {billType === 'DP' ? 'Releases B/L on Cash' : `Releases B/L on Sign (${creditTenorDays}d)`}
                      </text>

                      {/* Importer Node */}
                      <rect x="545" y="20" width="135" height="80" rx="8" fill={billType === 'DP' ? '#064e3b' : '#78350f'} stroke={billType === 'DP' ? '#10b981' : '#f59e0b'} strokeWidth="2" />
                      <text x="612" y="45" fill="#fef3c7" fontSize="12" fontWeight="bold" textAnchor="middle">🇳🇱 European Buyer</text>
                      <text x="612" y="65" fill="#fde68a" fontSize="10" textAnchor="middle">Rotterdam Port</text>
                      <text x="612" y="85" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                        {billType === 'DP' ? '✓ Immediate Payment' : `✓ Goods Now / Pay ${creditTenorDays}d`}
                      </text>

                      {/* Arrows */}
                      <path d="M 150 60 L 190 60" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
                      <path d="M 320 60 L 370 60" stroke="#38bdf8" strokeWidth="2" />
                      <path d="M 500 60 L 545 60" stroke={billType === 'DP' ? '#10b981' : '#f59e0b'} strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Real-time Canvas Vessel Route */}
                  <canvas ref={canvasRef} width={600} height={70} className="w-full rounded-xl border border-slate-800" />

                  {/* Controls with aria-labels & range inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-bold text-slate-300">Bill of Exchange Mechanism:</label>
                      <div className="flex gap-2 mt-2">
                        <motion.button
                          aria-label="Select Documents Against Acceptance bill"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleBillTypeToggle('DA')}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                            billType === 'DA' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          DA (Acceptance)
                        </motion.button>
                        <motion.button
                          aria-label="Select Documents Against Payment bill"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleBillTypeToggle('DP')}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                            billType === 'DP' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          DP (Payment)
                        </motion.button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Credit Tenor (Usance):</span>
                        <span className="text-indigo-400">{billType === 'DA' ? `${creditTenorDays} Days` : 'Sight (0 Days)'}</span>
                      </div>
                      <input
                        aria-label="Adjust credit tenor days"
                        type="range"
                        min={30}
                        max={120}
                        step={30}
                        disabled={billType === 'DP'}
                        value={creditTenorDays}
                        onChange={e => handleCreditTenorChange(Number(e.target.value))}
                        className="w-full mt-3 accent-indigo-500 cursor-pointer disabled:opacity-40"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300">ECGC 90% Credit Insurance:</label>
                      <motion.button
                        aria-label="Toggle ECGC credit insurance"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleEcgcToggle}
                        className={`w-full mt-2 py-2 text-xs font-bold rounded-lg border ${
                          ecgcCoverActive ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {ecgcCoverActive ? '🛡️ Active (90% Cover)' : '⚠️ Uninsured (100% Risk)'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Dynamic Risk Gauge */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase">Exporter Risk Profile</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Default Exposure:</span>
                          <span className={billType === 'DA' && !ecgcCoverActive ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {billType === 'DA' ? (ecgcCoverActive ? '✓ 10% (90% Protected by ECGC)' : '✗ 100% (High Credit Risk)') : '✓ 0% (Payment at Sight)'}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${billType === 'DA' && !ecgcCoverActive ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            animate={{ width: billType === 'DA' ? (ecgcCoverActive ? '10%' : '100%') : '0%' }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">
                        {billType === 'DA'
                          ? 'Buyer gets Bill of Lading upon signing acceptance. If buyer defaults after 60 days, exporter loses funds unless insured by ECGC.'
                          : 'Bank withholds shipping documents until full cash payment is made at sight. Exporter retains complete control.'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase">Overseas Buyer Advantage</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Cash Flow Liquidity:</span>
                          <span className={billType === 'DA' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                            {billType === 'DA' ? `✓ ${creditTenorDays} Days Free Working Capital` : '✗ Immediate Cash Outflow Required'}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-indigo-500"
                            animate={{ width: billType === 'DA' ? `${(creditTenorDays / 120) * 100}%` : '15%' }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">
                        {billType === 'DA'
                          ? 'Importer receives goods, sells them in European markets, and uses revenue to settle the usance bill on maturity.'
                          : 'Importer must pay upfront before inspecting or selling goods, which may strain working capital.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: IMPORT CUSTOMS PIPELINE ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { name: '1. Indent / Licence', authority: 'DGFT / Buyer', desc: 'Authorisation & Purchase Order' },
                      { name: '2. Letter of Credit', authority: 'Authorised Bank', desc: 'Bank Payment Guarantee' },
                      { name: '3. Bill of Entry/Sight', authority: 'Indian Customs', desc: 'Sec 46 Duty Declaration' },
                      { name: '4. Port Dues Receipt', authority: 'JNPT Port Trust', desc: 'Wharfage & Out of Charge' },
                    ].map((stg, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Select customs stage ${i + 1}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleImportStageClick(i)}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          activeImportStage === i
                            ? 'bg-indigo-950 border-indigo-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="text-xs font-bold text-indigo-400">{stg.name}</div>
                        <div className="text-[11px] text-slate-300 mt-1">{stg.authority}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{stg.desc}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
                    {activeImportStage === 0 && (
                      <div className="space-y-2 text-xs">
                        <h4 className="font-bold text-indigo-300 text-sm">Stage 1: Import Licence vs IEC Code</h4>
                        <p className="text-slate-300">
                          Freely importable goods under Open General Licence (OGL) require only a 10-digit Import Export Code (IEC) from DGFT.
                          Restricted items (like gold or dual-use chemicals) require a specific Import Licence under Sec 7 Foreign Trade Act 1992.
                        </p>
                      </div>
                    )}
                    {activeImportStage === 1 && (
                      <div className="space-y-2 text-xs">
                        <h4 className="font-bold text-indigo-300 text-sm">Stage 2: Letter of Credit (L/C)</h4>
                        <p className="text-slate-300">
                          Opened by the Indian importer’s bank (Authorised Dealer under FEMA). It substitutes the bank’s creditworthiness for the importer’s,
                          promising to pay the foreign supplier upon presentation of compliant shipping documents (Bill of Lading, Invoice, Insurance).
                        </p>
                      </div>
                    )}
                    {activeImportStage === 2 && (
                      <div className="space-y-2 text-xs">
                        <h4 className="font-bold text-indigo-300 text-sm">Stage 3: Bill of Entry vs Bill of Sight (Customs Act 1962)</h4>
                        <p className="text-slate-300">
                          <strong>Bill of Entry (Sec 46):</strong> Standard declaration with complete invoice & HS codes for final duty assessment.
                        </p>
                        <p className="text-slate-300">
                          <strong>Bill of Sight:</strong> Filed when invoices or prices are incomplete. Permits provisional assessment and landing, followed by a Supplementary Bill of Entry once invoices arrive.
                        </p>
                      </div>
                    )}
                    {activeImportStage === 3 && (
                      <div className="space-y-2 text-xs">
                        <h4 className="font-bold text-indigo-300 text-sm">Stage 4: Port Trust Dues Receipt</h4>
                        <p className="text-slate-300">
                          Issued by Port Trust (e.g. JNPT, Mumbai Port) after payment of wharfage and handling charges. Customs verifies this receipt before issuing the statutory “Out of Charge” order for physical truck loading.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 3: AVERAGE CLAUSE (WITH SVG DIAGRAM 2 & MULTI-REPRESENTATION) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* Prediction Question 1: Predict-then-Check Pattern */}
                  <div className="p-4 bg-indigo-950/40 border border-indigo-800/80 rounded-xl space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 bg-indigo-600 text-white rounded-md uppercase">Predict First</span>
                      <span className="text-xs text-indigo-300 font-semibold">{PREDICTION_QUESTIONS[0].question}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handlePredictionSubmit(PREDICTION_QUESTIONS[0].id, oIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition-all border ${
                            predictionRevealed[PREDICTION_QUESTIONS[0].id]
                              ? oIdx === PREDICTION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                                : predictionAnswers[PREDICTION_QUESTIONS[0].id] === oIdx
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                : 'bg-slate-950/50 border-slate-800 text-slate-500'
                              : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-bold text-indigo-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                    {predictionRevealed[PREDICTION_QUESTIONS[0].id] && (
                      <p className="text-xs text-amber-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 flex items-start gap-1.5">
                        <span>🔍</span> <span><strong>Verify Instruction:</strong> {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      </p>
                    )}
                  </div>

                  {/* Topic-Specific SVG Diagram 2: Average Clause Proportional Breakdown */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase mb-2">Multi-Representation: Visual Proportional Under-Insurance (SVG 2)</span>
                    <svg viewBox="0 0 650 140" className="w-full max-h-40 rounded-lg bg-slate-900/90">
                      {/* Property Total Bar */}
                      <text x="20" y="25" fill="#94a3b8" fontSize="11" fontWeight="bold">Total Property Value: ₹{propertyValueLakh}L (100%)</text>
                      <rect x="20" y="32" width="610" height="20" rx="4" fill="#334155" />
                      
                      {/* Sum Insured Overlaid */}
                      <rect
                        x="20"
                        y="32"
                        width={Math.max(10, Math.min(610, (sumInsuredLakh / propertyValueLakh) * 610))}
                        height="20"
                        rx="4"
                        fill={sumInsuredLakh >= propertyValueLakh ? '#10b981' : '#f59e0b'}
                      />
                      <text x="25" y="47" fill="#ffffff" fontSize="10" fontWeight="bold">
                        Policy Cover: ₹{sumInsuredLakh}L ({Math.min(100, Math.round((sumInsuredLakh / propertyValueLakh) * 100))}%)
                      </text>

                      {/* Loss Distribution Bar */}
                      <text x="20" y="80" fill="#94a3b8" fontSize="11" fontWeight="bold">Actual Fire Loss: ₹{fireLossLakh}L Apportionment</text>
                      <rect x="20" y="87" width="610" height="24" rx="4" fill="#1e293b" />
                      
                      {/* Insurer Paid Portion */}
                      <rect
                        x="20"
                        y="87"
                        width={Math.max(10, Math.min(610, (averageClausePayout / fireLossLakh) * 610))}
                        height="24"
                        rx="4"
                        fill="#059669"
                      />
                      <text x="30" y="103" fill="#ffffff" fontSize="11" fontWeight="bold">
                        ✓ Insurer Pays: ₹{averageClausePayout}L
                      </text>

                      {/* Self Insured Penalty Portion */}
                      {averageClausePayout < fireLossLakh && (
                        <text x={Math.min(500, Math.max(180, (averageClausePayout / fireLossLakh) * 610 + 30))} y="103" fill="#f87171" fontSize="10" fontWeight="bold">
                          ✗ Self Penalty: ₹{Number((fireLossLakh - averageClausePayout).toFixed(2))}L
                        </text>
                      )}
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Actual Property Value:</span>
                        <span className="text-indigo-400">₹{propertyValueLakh} Lakh</span>
                      </div>
                      <input
                        aria-label="Adjust actual property value"
                        type="range"
                        min={50}
                        max={200}
                        step={10}
                        value={propertyValueLakh}
                        onChange={e => handlePropertyValueChange(Number(e.target.value))}
                        className="w-full mt-3 accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Sum Insured (Policy Cover):</span>
                        <span className={sumInsuredLakh < propertyValueLakh ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                          ₹{sumInsuredLakh} Lakh ({Math.round((sumInsuredLakh / propertyValueLakh) * 100)}%)
                        </span>
                      </div>
                      <input
                        aria-label="Adjust sum insured policy cover"
                        type="range"
                        min={20}
                        max={200}
                        step={5}
                        value={sumInsuredLakh}
                        onChange={e => handleSumInsuredChange(Number(e.target.value))}
                        className="w-full mt-3 accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Actual Fire Damage:</span>
                        <span className="text-rose-400">₹{fireLossLakh} Lakh</span>
                      </div>
                      <input
                        aria-label="Adjust actual fire damage amount"
                        type="range"
                        min={10}
                        max={propertyValueLakh}
                        step={5}
                        value={fireLossLakh}
                        onChange={e => handleFireLossChange(Number(e.target.value))}
                        className="w-full mt-3 accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Observation Question 1: What Do You Notice? */}
                  <div className="p-4 bg-slate-950 border border-amber-800/60 rounded-xl space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 bg-amber-600 text-white rounded-md uppercase">What Do You Notice?</span>
                      <span className="text-xs text-amber-200 font-semibold">{OBSERVATION_QUESTIONS[0].question}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleObservationSubmit(OBSERVATION_QUESTIONS[0].id, oIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition-all border ${
                            observationRevealed[OBSERVATION_QUESTIONS[0].id]
                              ? oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                                : observationAnswers[OBSERVATION_QUESTIONS[0].id] === oIdx
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                : 'bg-slate-950/50 border-slate-800 text-slate-500'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-bold text-amber-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mathematical Visual Display */}
                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-xs text-slate-400">Average Clause Formula:</span>
                        <div className="text-sm font-mono text-indigo-300 font-bold">
                          Payout = (Sum Insured ÷ Property Value) × Actual Loss
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400">Insurer Payout:</span>
                        <div className="text-xl font-mono text-emerald-400 font-extrabold">
                          ₹{averageClausePayout} Lakh
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                      <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-800/60">
                        <span className="text-slate-400">✓ Insurer Liability:</span>
                        <div className="text-base font-bold text-emerald-300">₹{averageClausePayout} Lakh</div>
                        <p className="text-[11px] text-slate-400 mt-1">Paid by general insurer</p>
                      </div>
                      <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800/60">
                        <span className="text-slate-400">✗ Self-Insured Penalty Gap:</span>
                        <div className="text-base font-bold text-rose-300">
                          ₹{Number((Math.min(fireLossLakh, propertyValueLakh) - averageClausePayout).toFixed(2))} Lakh
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Loss borne by insured due to under-insurance</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: DOUBLE INSURANCE CONTRIBUTION (WITH SVG DIAGRAM 3) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* Topic-Specific SVG Diagram 3: Rateable Contribution Model */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase mb-2">Rateable Apportionment Diagram (SVG 3)</span>
                    <svg viewBox="0 0 650 130" className="w-full max-h-36 rounded-lg bg-slate-900/90">
                      {/* Insurer A Box */}
                      <rect x="30" y="25" width="180" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="120" y="50" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">National Insurance (A)</text>
                      <text x="120" y="70" fill="#a5b4fc" fontSize="11" textAnchor="middle">Cover: ₹{insurerACover}L</text>
                      <text x="120" y="88" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Pays: ₹{doubleInsurancePayout.insurerA}L</text>

                      {/* Plus Icon */}
                      <text x="245" y="70" fill="#94a3b8" fontSize="24" fontWeight="bold" textAnchor="middle">+</text>

                      {/* Insurer B Box */}
                      <rect x="280" y="25" width="180" height="75" rx="8" fill="#2e1065" stroke="#a855f7" strokeWidth="2" />
                      <text x="370" y="50" fill="#f3e8ff" fontSize="12" fontWeight="bold" textAnchor="middle">Oriental Insurance (B)</text>
                      <text x="370" y="70" fill="#e9d5ff" fontSize="11" textAnchor="middle">Cover: ₹{insurerBCover}L</text>
                      <text x="370" y="88" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">Pays: ₹{doubleInsurancePayout.insurerB}L</text>

                      {/* Equals Sign */}
                      <text x="490" y="70" fill="#94a3b8" fontSize="24" fontWeight="bold" textAnchor="middle">=</text>

                      {/* Total Payout */}
                      <rect x="520" y="25" width="105" height="75" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="572" y="50" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">Total Claim</text>
                      <text x="572" y="70" fill="#34d399" fontSize="13" fontWeight="black" textAnchor="middle">₹{doubleInsurancePayout.total}L</text>
                      <text x="572" y="88" fill="#ecfdf5" fontSize="9" textAnchor="middle">✓ Exact Loss</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Insurer A (National Ins):</span>
                        <span className="text-indigo-400">₹{insurerACover} Lakh</span>
                      </div>
                      <input
                        aria-label="Adjust insurer A cover amount"
                        type="range"
                        min={10}
                        max={100}
                        step={5}
                        value={insurerACover}
                        onChange={e => handleInsurerACoverChange(Number(e.target.value))}
                        className="w-full mt-3 accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Insurer B (Oriental Ins):</span>
                        <span className="text-purple-400">₹{insurerBCover} Lakh</span>
                      </div>
                      <input
                        aria-label="Adjust insurer B cover amount"
                        type="range"
                        min={10}
                        max={100}
                        step={5}
                        value={insurerBCover}
                        onChange={e => handleInsurerBCoverChange(Number(e.target.value))}
                        className="w-full mt-3 accent-purple-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Fire Loss on Stock:</span>
                        <span className="text-rose-400">₹{doubleLossAmount} Lakh</span>
                      </div>
                      <input
                        aria-label="Adjust fire loss amount on stock"
                        type="range"
                        min={10}
                        max={insurerACover + insurerBCover}
                        step={5}
                        value={doubleLossAmount}
                        onChange={e => handleDoubleLossChange(Number(e.target.value))}
                        className="w-full mt-3 accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Observation Question 2: What Do You Notice? */}
                  <div className="p-4 bg-slate-950 border border-purple-800/60 rounded-xl space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 bg-purple-600 text-white rounded-md uppercase">What Do You Notice?</span>
                      <span className="text-xs text-purple-200 font-semibold">{OBSERVATION_QUESTIONS[1].question}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleObservationSubmit(OBSERVATION_QUESTIONS[1].id, oIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition-all border ${
                            observationRevealed[OBSERVATION_QUESTIONS[1].id]
                              ? oIdx === OBSERVATION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                                : observationAnswers[OBSERVATION_QUESTIONS[1].id] === oIdx
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                : 'bg-slate-950/50 border-slate-800 text-slate-500'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-bold text-purple-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">Rateable Apportionment (Sec 2(11) Insurance Act 1938)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-indigo-950/50 rounded-lg border border-indigo-800 text-center">
                        <span className="text-xs text-indigo-300">Insurer A Pays</span>
                        <div className="text-lg font-mono font-bold text-indigo-200 mt-1">₹{doubleInsurancePayout.insurerA} Lakh</div>
                        <span className="text-[10px] text-slate-400 font-mono">({insurerACover}/{insurerACover + insurerBCover}) × Loss</span>
                      </div>
                      <div className="p-3 bg-purple-950/50 rounded-lg border border-purple-800 text-center">
                        <span className="text-xs text-purple-300">Insurer B Pays</span>
                        <div className="text-lg font-mono font-bold text-purple-200 mt-1">₹{doubleInsurancePayout.insurerB} Lakh</div>
                        <span className="text-[10px] text-slate-400 font-mono">({insurerBCover}/{insurerACover + insurerBCover}) × Loss</span>
                      </div>
                      <div className="p-3 bg-emerald-950/50 rounded-lg border border-emerald-800 text-center">
                        <span className="text-xs text-emerald-300">Total Client Recovery</span>
                        <div className="text-lg font-mono font-bold text-emerald-200 mt-1">₹{doubleInsurancePayout.total} Lakh</div>
                        <span className="text-[10px] text-emerald-400 font-mono">Indemnity Capped: Zero Profit</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: RE-INSURANCE CESSION ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>New India Board Retention Limit:</span>
                        <span className="text-indigo-400">{retentionPercent}% (₹{reinsuranceCalc.retentionAmt} Cr)</span>
                      </div>
                      <input
                        aria-label="Adjust retention percent limit"
                        type="range"
                        min={10}
                        max={50}
                        step={5}
                        value={retentionPercent}
                        onChange={e => handleRetentionPercentChange(Number(e.target.value))}
                        className="w-full mt-3 accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Refinery Loss Claim:</span>
                        <span className="text-rose-400">₹{refineryExplosionLoss} Crore</span>
                      </div>
                      <input
                        aria-label="Adjust refinery explosion loss claim"
                        type="range"
                        min={100}
                        max={grossRefineryRisk}
                        step={50}
                        value={refineryExplosionLoss}
                        onChange={e => handleRefineryLossChange(Number(e.target.value))}
                        className="w-full mt-3 accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">Solvency Protection & Claim Recovery Flow</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-400">1. Original Insurer Action:</span>
                        <p className="text-xs text-white font-bold mt-1">Pays ₹{refineryExplosionLoss} Cr to Refinery</p>
                        <p className="text-[10px] text-slate-400 mt-1">Direct privity of contract</p>
                      </div>
                      <div className="p-3 bg-indigo-950/50 rounded-lg border border-indigo-800">
                        <span className="text-xs text-indigo-300">2. Recovery from GIC Re:</span>
                        <p className="text-xs text-indigo-200 font-bold mt-1">Recovers ₹{reinsuranceCalc.recoveryFromGIC} Cr ({100 - retentionPercent}%)</p>
                        <p className="text-[10px] text-slate-400 mt-1">Reinsurance treaty settlement</p>
                      </div>
                      <div className="p-3 bg-emerald-950/50 rounded-lg border border-emerald-800">
                        <span className="text-xs text-emerald-300">3. Net Retention Hit:</span>
                        <p className="text-xs text-emerald-200 font-bold mt-1">₹{reinsuranceCalc.netInsurerLoss} Cr Net Loss</p>
                        <p className="text-[10px] text-emerald-400 mt-1">Solvency ratio fully protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Bar inside Explore */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Go to previous lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentSlide === 0}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-xl text-xs font-bold"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs font-mono text-slate-400">Lab {currentSlide + 1} of 5</span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Go to next lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter free sandbox mode"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/60 rounded-2xl border border-indigo-900/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Ungraded Exploration Sandbox</span>
              <h2 className="text-lg font-bold text-white mt-1">Multi-Variable Enterprise Risk Console</h2>
              <p className="text-xs text-slate-300 mt-1">
                Freely adjust and balance documentary terms, fire under-insurance, and re-insurance syndication with zero grading.
              </p>
            </div>
            <motion.button
              aria-label="Ready to start challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              Ready for Challenges! 🚀
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Sandbox Column: Trade & Under-Insurance */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-indigo-300 uppercase">1. Average Clause Stress Tester</h3>
              <div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Godown Value: ₹{propertyValueLakh}L</span>
                  <span>Cover: ₹{sumInsuredLakh}L</span>
                  <span>Loss: ₹{fireLossLakh}L</span>
                </div>
                <input
                  aria-label="Sandbox adjust sum insured"
                  type="range"
                  min={20}
                  max={200}
                  step={5}
                  value={sumInsuredLakh}
                  onChange={e => handleSumInsuredChange(Number(e.target.value))}
                  className="w-full mt-2 accent-indigo-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span>Computed Payout:</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">₹{averageClausePayout} Lakh</span>
              </div>
            </div>

            {/* Right Sandbox Column: Reinsurance Syndication */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-purple-300 uppercase">2. Re-Insurance Cession Stress Tester</h3>
              <div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Retention: {retentionPercent}%</span>
                  <span>Refinery Loss: ₹{refineryExplosionLoss} Cr</span>
                </div>
                <input
                  aria-label="Sandbox adjust retention percent"
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={retentionPercent}
                  onChange={e => handleRetentionPercentChange(Number(e.target.value))}
                  className="w-full mt-2 accent-purple-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span>GIC Re Recovery:</span>
                <span className="text-indigo-300 font-mono font-bold text-sm">₹{reinsuranceCalc.recoveryFromGIC} Crore</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress & Metadata */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-800">
                  NEP 2020: {challenge.competencyLevel}
                </span>
                <span className="font-mono text-slate-400">Score: {Math.max(0, 100 - errors * 5)}%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base font-semibold text-white leading-relaxed">{challenge.question}</p>

            {/* MCQ & Distinguish Challenges */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5 mt-4">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`text-left p-3.5 rounded-xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">
                      {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="mt-4 flex flex-col md:flex-row items-center gap-3">
                <input
                  aria-label="Enter calculated numeric answer"
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter computed value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-full md:w-64"
                />
                <span className="text-xs text-slate-400">{challenge.unit}</span>
                <motion.button
                  aria-label="Verify numerical calculation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  disabled={showExplanation || !numericInput}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Verify Calculation
                </motion.button>
              </div>
            )}

            {/* Drag Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-4 space-y-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    role="button"
                    aria-label={`Draggable sort item ${displayIndex + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 flex items-center gap-3 cursor-grab"
                  >
                    <span className="font-mono text-indigo-400 font-bold">#{displayIndex + 1}</span>
                    <span>{item}</span>
                  </motion.div>
                ))}
                <motion.button
                  aria-label="Confirm sequence order"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="mt-3 px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl"
                >
                  Confirm Procedural Sequence
                </motion.button>
              </div>
            )}

            {/* Drag Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      aria-label={`Draggable principle card: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-900 border border-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'part_top', title: 'Utmost Good Faith' },
                    { id: 'part_middle', title: 'Insurable Interest' },
                    { id: 'part_bottom', title: 'Indemnity' },
                    { id: 'part_side', title: 'Subrogation' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3 bg-slate-950 border-2 border-dashed border-slate-800 rounded-xl min-h-[60px] flex flex-col justify-center items-center text-center"
                    >
                      <span className="text-[10px] text-slate-500 uppercase">{target.title}</span>
                      <span className="text-xs font-bold text-emerald-400 mt-1">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Card Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify principles mapping"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="mt-2 px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl"
                >
                  Verify Principles Mapping
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((p, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add risk attribute ${p}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => (prev.includes(p) ? prev : [...prev, p]))}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-200"
                    >
                      + {p}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <span
                      key={idx}
                      onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                      className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-700 rounded-md text-xs font-bold cursor-pointer hover:bg-rose-950 hover:text-rose-300"
                    >
                      {p} ✕
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click attributes above to assemble</span>}
                </div>

                <motion.button
                  aria-label="Verify assembled risk architecture"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl"
                >
                  Verify Risk Architecture
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Click-to-Reveal Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-amber-950/40 border border-amber-800/80 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Statutory Explanation & Analysis</h4>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-amber-200 leading-relaxed"
                    >
                      <strong className="text-amber-400">Step {sIdx + 1}:</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next explanation step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Proceed to next scenario challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Directorate Review →' : 'Next Scenario Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MASTERY COMPLETION & CAPSTONE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-800 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Commercial Directorate Certification Complete</h2>
            <p className="text-sm text-indigo-300">
              Mastery Tier: <strong className="text-white uppercase">{masteryLevel}</strong> • Final Assessment Score:{' '}
              <strong className="text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK (EXACT REQUIREMENT) */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl text-center">
            <h3 className="text-sm font-extrabold text-emerald-300">
              {errors === 0 && 'PERFECT SCORE!'}
              {errors >= 1 && errors <= 3 && 'Great work!'}
              {errors >= 4 && errors <= 7 && 'Good effort!'}
              {errors >= 8 && 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {errors === 0
                ? 'Absolute precision demonstrated across all international commercial documentation and insurance statutory formulas.'
                : errors <= 3
                ? 'Strong understanding of export mechanisms, double insurance rateable share, and WTO trade parameters.'
                : 'Solid effort! Review the Average Clause mathematical relationship and DA/DP risk exposures to master full marks.'}
            </p>
          </div>

          {/* REFLECTION SECTION (EXACT REQUIREMENT) */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-indigo-900/60 space-y-3">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <span>💭</span> Post-Simulation Deep Reflection
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-200">1. What was the most surprising thing you learned?</span>
                <p className="text-slate-400 mt-1">
                  How the statutory Average Clause drastically reduces claim payouts if a godown is under-insured, effectively treating the owner as a co-insurer.
                </p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-200">2. How would you explain this to a friend?</span>
                <p className="text-slate-400 mt-1">
                  In DP, no money means no goods. In DA, a signature unlocks the cargo while payment waits for 60 days, requiring ECGC insurance to stay safe.
                </p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-200">3. Where in real life might you use this?</span>
                <p className="text-slate-400 mt-1">
                  When establishing an export business, negotiating Letters of Credit with banks, or evaluating commercial property insurance coverage limits.
                </p>
              </div>
            </div>
          </div>

          {/* Misconceptions profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 border border-rose-900/60 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold text-rose-300 uppercase">Your Personalised Misconception Diagnosis</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">✗ {m.misconception}</p>
                    <p className="text-emerald-400 font-semibold">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <span className="font-bold text-slate-300">SM-2 Spaced Repetition Protocol:</span>
              <p className="text-slate-400 mt-0.5">
                Next automated review scheduled in{' '}
                <strong className="text-indigo-400 font-mono">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</strong>.
              </p>
            </div>
            <span className="text-xl">📅</span>
          </div>

          {/* Real World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 uppercase">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">#{idx + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Directorate Scenario Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C11_CommerceExportDocumentsDocumentarySim;
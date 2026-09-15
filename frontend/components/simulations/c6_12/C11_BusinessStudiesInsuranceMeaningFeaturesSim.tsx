'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell, PieChart, Pie } from 'recharts';
import * as d3 from 'd3';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ═══════════════════════════════════════════════════════════════════════════════════════
// ISC CLASS 11 BUSINESS STUDIES SYLLABUS NODE TAXONOMY
// ═══════════════════════════════════════════════════════════════════════════════════════
const NODE_C11_BS_031 = 'c11_bs_031'; // Insurance — Meaning, Essential Elements & Legal Nature
const NODE_C11_BS_032 = 'c11_bs_032'; // Fundamental Principles I — Utmost Good Faith, Insurable Interest, Indemnity, Contribution
const NODE_C11_BS_033 = 'c11_bs_033'; // Fundamental Principles II — Subrogation, Causa Proxima, Mitigation of Loss
const NODE_C11_BS_034 = 'c11_bs_034'; // Re-insurance, Double Insurance, Retrocession & Assurance vs Insurance
const NODE_C11_BS_035 = 'c11_bs_035'; // Types of Insurance — Life, Marine, Fire, Health, Motor, Social, Fidelity, Burglary
const ALL_NODE_IDS = [NODE_C11_BS_031, NODE_C11_BS_032, NODE_C11_BS_033, NODE_C11_BS_034, NODE_C11_BS_035];

// ═══════════════════════════════════════════════════════════════════════════════════════
// STATUTORY ACTS & LANDMARK JURISPRUDENCE DATABASE
// ═══════════════════════════════════════════════════════════════════════════════════════
const STATUTORY_REFERENCES = [
  { act: 'Insurance Act 1938', section: 'Section 45', title: 'Incontestability Clause (3-Year Rule)', desc: 'No life policy can be called in question after 3 years on grounds of innocent misstatement.' },
  { act: 'Insurance Act 1938', section: 'Section 64VB', title: 'No Risk Without Advance Premium', desc: 'No risk assumed by insurer unless premium is received in advance or guaranteed.' },
  { act: 'Marine Insurance Act 1963', section: 'Section 6', title: 'Insurable Interest at Time of Loss', desc: 'The assured must be interested in the subject-matter insured at the time of the loss.' },
  { act: 'Motor Vehicles Act 1988', section: 'Section 146', title: 'Compulsory Third-Party Liability', desc: 'No person shall use a motor vehicle in a public place without a valid third-party policy.' },
  { act: 'Indian Contract Act 1872', section: 'Section 30', title: 'Agreements by Way of Wager Void', desc: 'Distinguishes contingent insurance contracts backed by insurable interest from void wagers.' },
  { act: 'IRDAI Act 1999', section: 'Section 14', title: 'Powers & Functions of the Authority', desc: 'Empowers IRDAI to regulate, promote, and ensure orderly growth of insurance & reinsurance.' },
];

const LANDMARK_CASE_LAWS = [
  {
    name: 'Carter v. Boehm (1766)',
    doctrine: 'Uberrimae Fidei (Utmost Good Faith)',
    ruling: 'Lord Mansfield held that insurance is a contract of speculation where the special facts lie most commonly in the knowledge of the insured alone; good faith forbids either party from concealing material facts.',
    appliedTo: 'Duty of Full Disclosure in Proposal Stage',
  },
  {
    name: 'Dalby v. The India & London Life Assurance Co. (1854)',
    doctrine: 'Insurable Interest in Life Assurance',
    ruling: 'Insurable interest in life assurance must exist at the time the policy is effected; it need not continue until the time of death.',
    appliedTo: 'Creditor-Debtor & Spousal Life Assurance validity post-divorce or loan repayment.',
  },
  {
    name: 'Castellain v. Preston (1883)',
    doctrine: 'Principle of Indemnity & Subrogation',
    ruling: 'Brett L.J. laid down that the insured shall be fully indemnified, but shall never more than fully indemnified. Insurer is entitled to every right of the insured against third parties.',
    appliedTo: 'Subrogation and Prevention of Double Recovery.',
  },
  {
    name: 'Hamilton, Fraser & Co. v. Pandorf & Co. (1887)',
    doctrine: 'Causa Proxima (Proximate Cause)',
    ruling: 'Rats gnawed a lead pipe allowing seawater to enter cargo hold. House of Lords held that seawater influx was an insured Peril of the Sea, which was the proximate cause of rice damage.',
    appliedTo: 'Chain of Causation and Active Dominant Peril Identification.',
  },
  {
    name: 'LIC of India v. Smt. Asha Goel (2001)',
    doctrine: 'Fraudulent Misrepresentation Standards',
    ruling: 'Supreme Court of India ruled that Section 45 repudiation requires proving that the statement was on a material matter, was false to the knowledge of the insured, and made with fraudulent intent.',
    appliedTo: 'Rebutting Arbitrary Claim Repudiations by Public Insurers.',
  },
  {
    name: 'New India Assurance Co. v. Pradeep Kumar (2009)',
    doctrine: 'Surveyor Assessment vs True Indemnity',
    ruling: 'Supreme Court held that a surveyor report under Section 64UM of the Insurance Act 1938 is important but not the final word; courts can award actual proven damages.',
    appliedTo: 'Assessment of Quantum in Commercial Property Claims.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════════════
// NARRATIVE SCENARIO: TATA ENTERPRISE RISK CRISIS
// ══════════════════════════════════════��════════════════════════════════════════════════
const SCENARIO = {
  title: 'Operation Suraksha: Tata Global Logistics & Conglomerate Risk Command',
  intro: 'You are appointed Chief Risk Officer (CRO) at Tata Global Logistics & Infrastructure Ltd. A Category-4 Cyclone is barrelling towards the Mundra Port container terminal (₹350 Crore exposure), while an electrical fire has erupted in the Chakan automobile warehouse (₹80 Crore inventory). Simultaneously, export ships carrying steel coils are navigating the Red Sea.',
  context: 'Your mandate: Execute real-time legal adjudications under the Insurance Act 1938, Marine Insurance Act 1963, Motor Vehicles Act 1988, and IRDAI 2018 Re-insurance Guidelines. Calculate exact rateable contributions, apply the average clause, structure GIC Re quota treaties, and safeguard multi-billion rupee solvency.',
  milestones: [
    { title: 'Phase 1: Risk Pooling & Actuarial Foundations', desc: 'Pool aggregation and variance reduction via Law of Large Numbers.' },
    { title: 'Phase 2: Fundamental Principles Adjudication', desc: '7 cardinal doctrines tested against real-life claims and fraud disputes.' },
    { title: 'Phase 3: Treaty Reinsurance & Solvency Architecture', desc: 'Layering cedant retentions, GIC Re statutory cessions, and London retrocessions.' },
    { title: 'Phase 4: Multi-Line Commercial Portfolio Audit', desc: 'Structuring Marine, Fire, Motor, Fidelity, Health, and Social schemes.' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════════════
// CURIOSITY DISCOVERY HOOK
// ═══════════════════════════════════════════════════════════════════════════════════════
const DISCOVERY_QUESTION = {
  question: 'Your Chakan Pune warehouse holding ₹50 Lakh stock is insured for ₹90 Lakh with New India Assurance. An electrical short-circuit triggers a fire destroying ₹30 Lakh of stock. How much will the surveyor authorise for payout under Indian law?',
  options: [
    '₹90 Lakh — Because you paid premiums for the full ₹90 Lakh Sum Insured ceiling',
    '₹30 Lakh — The exact actual financial loss suffered (Principle of Indemnity)',
    '₹50 Lakh — The total market value of goods stored in the warehouse before the fire',
    '₹0 — Over-insuring property constitutes an illegal wager under Section 30 of the Contract Act',
  ],
  correctIndex: 1,
  hintAfter: 'Under the Principle of Indemnity (Castellain v Preston), insurance restores the insured to their exact pre-loss financial position. You cannot make a profit from a disaster!',
  analysisSteps: [
    'Step 1: Identify that the policy is a contract of Indemnity (Commercial Fire Policy).',
    'Step 2: Compare Sum Insured (₹90 Lakh) vs Actual Loss (₹30 Lakh).',
    'Step 3: Apply the golden rule: Payout = Min(Actual Loss, Sum Insured). Payout is capped at ₹30 Lakh.',
    'Step 4: Over-insurance does not yield bonus money; it only results in wasted excess premium.',
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════════════
// CHALLENGE DATA STRUCTURE (NEP 2020 & CISCE 2026 BENCHMARKED)
// ═══════════════════════════════════════════════════════════════════════════════════════
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  scenarioSnippet?: string;
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
  statuteRef?: string;
  caseRef?: string;
}

const CHALLENGES: Challenge[] = [
  // ────────────────── FOUNDATION TIER (10 Challenges) ──────────────────
  {
    id: 'ch_bs_001_f',
    nodeId: NODE_C11_BS_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which statutory body established under a 1999 parliamentary statute regulates, licenses, and oversees all general and life insurers across the Republic of India?',
    scenarioSnippet: 'Regulatory compliance filing for new domestic micro-insurance products.',
    options: [
      'SEBI (Securities and Exchange Board of India)',
      'IRDAI (Insurance Regulatory and Development Authority of India)',
      'RBI (Reserve Bank of India)',
      'Competition Commission of India (CCI)',
    ],
    correctIndex: 1,
    explanation: 'IRDAI was constituted under the Insurance Regulatory and Development Authority Act 1999 following the recommendations of the Malhotra Committee to protect policyholder interests and regulate insurance industry solvency.',
    hints: [
      'Think of the dedicated authority that regulates policies, premium rates, and solvency margins.',
      'Its acronym starts with "I" and stands for Insurance Regulatory and Development Authority.',
      'Headquartered in Hyderabad, it is IRDAI.',
    ],
    misconceptionIndex: 0,
    statuteRef: 'IRDAI Act 1999 s.3',
  },
  {
    id: 'ch_bs_002_f',
    nodeId: NODE_C11_BS_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each core legal element of an insurance contract to its precise commercial definition.',
    dragItems: [
      { label: 'Premium', targetId: 'box_consideration' },
      { label: 'Sum Insured', targetId: 'box_max_payout' },
      { label: 'Insured Peril', targetId: 'box_risk_event' },
      { label: 'Policy Bond', targetId: 'box_document' },
    ],
    correctMapping: {
      box_consideration: 'Premium',
      box_max_payout: 'Sum Insured',
      box_risk_event: 'Insured Peril',
      box_document: 'Policy Bond',
    },
    explanation: 'Premium is the monetary consideration under Contract Act s.2(d); Sum Insured is the maximum indemnification liability ceiling; Insured Peril is the contingency covered (e.g. fire, flood); Policy Bond is the written evidentiary contract.',
    hints: [
      'Consideration paid by the proposer is the premium.',
      'The upper monetary ceiling of insurer liability is the sum insured.',
      'The hazard or contingency being insured is the peril.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bs_003_f',
    nodeId: NODE_C11_BS_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 45 of the Insurance Act 1938, after what time duration can a life insurance policy NOT be repudiated on grounds of innocent misrepresentation?',
    scenarioSnippet: 'A policyholder missed listing minor childhood jaundice in the proposal form 4 years ago.',
    options: ['1 Year', '2 Years', '3 Years', '5 Years'],
    correctIndex: 2,
    explanation: 'Section 45 (amended in 2014) imposes a strict 3-year incontestability bar. Once 3 years have elapsed from policy inception or revival, no insurer can call a life policy in question on grounds of misstatement, unless fraudulent intentional concealment is proven beyond doubt.',
    hints: [
      'The statutory incontestability window under the amended Insurance Act is between 2 and 4 years.',
      'Count 36 months from the date of issuance or revival of the policy.',
      'The exact statutory period is 3 years.',
    ],
    misconceptionIndex: 3,
    statuteRef: 'Insurance Act 1938 s.45',
  },
  {
    id: 'ch_bs_004_f',
    nodeId: NODE_C11_BS_034,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is Life Insurance legally categorized as a contract of "Assurance" rather than a contract of "Insurance"?',
    options: [
      'Because death or maturity is an absolute certainty, only its exact timing is uncertain; human life cannot be monetised for indemnity',
      'Because life policies are strictly non-taxable under Section 80C of the Income Tax Act',
      'Because life policies can only be issued by government-owned corporations like LIC',
      'Because the sum assured is adjusted annually for wholesale price index inflation',
    ],
    correctIndex: 0,
    explanation: 'Insurance deals with contingent losses that may or may not occur (e.g., fire, shipwreck). Assurance deals with events that are inevitable (death or reaching maturity age). Because human life cannot be valued with invoices, assurance pays the agreed Sum Assured without applying indemnity.',
    hints: [
      'Is death an uncertain possibility like fire, or an inevitable certainty?',
      'Can you calculate the depreciated book value of a human heart or brain?',
      'Since death/maturity is certain and life is priceless, it is Assurance, not an indemnity contract.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bs_005_f',
    nodeId: NODE_C11_BS_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which component of motor vehicle insurance is made strictly mandatory by Indian statute under Section 146 of the Motor Vehicles Act 1988?',
    options: [
      'Own-Damage Comprehensive Cover',
      'Zero Depreciation Bumper-to-Bumper Cover',
      'Third-Party Liability Cover',
      'Engine Protection & Consumables Rider',
    ],
    correctIndex: 2,
    explanation: 'Section 146 of the Motor Vehicles Act 1988 mandates that no motor vehicle can ply on a public road without Third-Party Insurance. This ensures compensation to innocent pedestrians or third parties injured or killed in road accidents.',
    hints: [
      'The law protects innocent road users and pedestrians rather than your vehicle repair bills.',
      'Look for the cover that addresses liability to external third parties.',
      'Third-Party Liability is strictly compulsory; Own Damage is optional.',
    ],
    misconceptionIndex: 4,
    statuteRef: 'Motor Vehicles Act 1988 s.146',
  },
  {
    id: 'ch_bs_006_f',
    nodeId: NODE_C11_BS_035,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What specific risk exposure does a commercial "Fidelity Insurance" policy indemnify for an enterprise?',
    options: [
      'Loss from cyber espionage by foreign nation-state hackers',
      'Direct financial loss resulting from dishonesty, embezzlement, or fraud committed by employees handling funds',
      'Structural damages caused by earthquakes, floods, and natural calamities',
      'Loss of sales revenue due to union-mandated strikes and lockouts',
    ],
    correctIndex: 1,
    explanation: 'Fidelity insurance protects employers against pecuniary loss caused by infidelity, larceny, forgery, or fraudulent misappropriation committed by bonded employees who hold positions of financial trust (e.g., cashiers, storekeepers).',
    hints: [
      '"Fidelity" means faithfulness and honesty.',
      'Think of a bank teller or warehouse storekeeper running away with cash or goods.',
      'It indemnifies the employer against employee dishonesty and theft.',
    ],
  },
  {
    id: 'ch_bs_007_f',
    nodeId: NODE_C11_BS_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which public sector enterprise serves as India’s sole designated National Reinsurer under IRDAI Re-insurance Regulations 2018?',
    options: [
      'Life Insurance Corporation of India (LIC)',
      'General Insurance Corporation of India (GIC Re)',
      'National Insurance Company Ltd (NICL)',
      'Export Credit Guarantee Corporation (ECGC)',
    ],
    correctIndex: 1,
    explanation: 'GIC Re (General Insurance Corporation of India) is India’s national reinsurer. Under IRDAI regulations, all Indian non-life direct insurers are required to cede a mandatory percentage (obligatory cession) of their underwritten sums to GIC Re.',
    hints: [
      'Look for the corporation with "Re" in its abbreviated name.',
      'It is headquartered in Mumbai and acts as the reinsurer of first choice.',
      'GIC Re is the National Reinsurer.',
    ],
  },
  {
    id: 'ch_bs_008_f',
    nodeId: NODE_C11_BS_031,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does an insurance contract legally differ from a wagering contract (betting) under Section 30 of the Indian Contract Act 1872?',
    options: [
      'Insurance protects a pre-existing insurable interest against potential loss; wagering creates a brand-new artificial risk solely for speculative gain',
      'Insurance contracts are exempt from GST whereas wagers are taxed at 18%',
      'Insurance policies can only be purchased by Indian citizens over 21 years of age',
      'Wagering agreements are valid if registered before a First Class Judicial Magistrate',
    ],
    correctIndex: 0,
    explanation: 'In insurance, the insured has a legitimate financial/legal interest in the preservation of the subject-matter prior to contract formation. In a wager, parties have no interest other than the stake money, and the risk is created artificially.',
    hints: [
      'Does a gambler lose their house if a stranger loses a cricket match? No, the risk was artificial.',
      'Does a factory owner suffer financial damage if their factory burns? Yes, insurable interest.',
      'Insurable interest and indemnity distinguish insurance from illegal gambling.',
    ],
    statuteRef: 'Indian Contract Act 1872 s.30',
  },
  {
    id: 'ch_bs_009_f',
    nodeId: NODE_C11_BS_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Principle of Mitigation of Loss, what legal duty does the insured owe when a covered peril occurs?',
    options: [
      'To allow the property to burn completely so that maximum sum insured can be claimed',
      'To take all reasonable, prudent steps to avert or minimise loss as if the property were uninsured',
      'To immediately vacate the country until the surveyor submits the claim report',
      'To surrender the land deed to the local municipal corporation',
    ],
    correctIndex: 1,
    explanation: 'Mitigation of Loss imposes a duty on the insured to take all reasonable precautions and emergency actions to minimise property damage, equivalent to what a prudent uninsured owner would do.',
    hints: [
      'Can you stand by and watch a small fire grow just because you have insurance?',
      'You must act like a reasonable person who has no insurance.',
      'Call the fire brigade, use extinguishers, and rescue undamaged goods.',
    ],
  },
  {
    id: 'ch_bs_010_f',
    nodeId: NODE_C11_BS_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Latin maxim "Uberrimae Fidei" which forms the bedrock of all insurance contracts translates to which legal doctrine?',
    options: [
      'Buyer Beware (Caveat Emptor)',
      'Utmost Good Faith and Full Material Disclosure',
      'Right to Sue Negligent Third Parties',
      'Proportionate Contribution Among Multiple Insurers',
    ],
    correctIndex: 1,
    explanation: 'Uberrimae Fidei means "Utmost Good Faith". Unlike commercial sales contracts governed by Caveat Emptor, insurance requires both proposer and insurer to disclose all material facts fully and honestly.',
    hints: [
      'It is the opposite of hiding medical history or past fire incidents.',
      'It represents the highest standard of honesty and transparency.',
      'Utmost Good Faith (Uberrimae Fidei).',
    ],
    caseRef: 'Carter v. Boehm (1766)',
  },

  // ────────────────── STANDARD TIER (10 Challenges) ──────────────────
  {
    id: 'ch_bs_011_s',
    nodeId: NODE_C11_BS_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Tata Textiles double-insures ₹120 Lakh of inventory: ₹80 Lakh with New India Assurance and ₹40 Lakh with Oriental Insurance. A flash flood causes ₹45 Lakh actual damage. How much (in ₹ Lakh) will New India Assurance pay under the Contribution Principle?',
    scenarioSnippet: 'Two concurrent valid fire/flood policies with no average clause dispute.',
    correctAnswer: 30,
    tolerance: 0.1,
    unit: 'Lakh',
    explanation: 'Rateable Proportion = (Individual Sum Insured / Total Sum Insured) × Loss = (80 / (80 + 40)) × 45 = (80 / 120) × 45 = (2/3) × 45 = ₹30 Lakh. Oriental Insurance pays the remaining (1/3) × 45 = ₹15 Lakh.',
    hints: [
      'Total Sum Insured = ₹80 Lakh + ₹40 Lakh = ₹120 Lakh.',
      'New India fraction = 80 / 120 = 2/3.',
      'Multiply (2/3) by the actual loss of ₹45 Lakh = ₹30 Lakh.',
    ],
  },
  {
    id: 'ch_bs_012_s',
    nodeId: NODE_C11_BS_032,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'At what exact points in time must "Insurable Interest" exist in (1) Life Assurance versus (2) Marine Cargo Insurance?',
    options: [
      'Life: At inception only; Marine Cargo: At the time of loss (and inception in practice)',
      'Life: At time of death only; Marine Cargo: At inception only',
      'Life: Both at inception and death; Marine Cargo: Never required under 1963 Act',
      'Life: At time of claim only; Marine Cargo: Continuous uninterrupted ownership required',
    ],
    correctIndex: 0,
    explanation: 'In Life Assurance (Dalby v India & London Life Assurance), insurable interest must exist at the time the contract is effected; subsequent cessation (e.g. divorce or loan repayment) does not invalidate the policy. In Marine Cargo Insurance (s.6 Marine Insurance Act 1963), interest must exist at the time of loss, because ownership bills of lading change hands at sea.',
    hints: [
      'If a wife insures her husband and later gets divorced, can she claim if he dies? Yes, life interest is required at inception only.',
      'In shipping, goods are sold on high seas via Bills of Lading, so the owner at the moment of sinking claims the loss.',
      'Life: At inception only; Marine: At time of loss.',
    ],
    caseRef: 'Dalby v. India & London Life Assurance Co. (1854)',
    statuteRef: 'Marine Insurance Act 1963 s.6',
  },
  {
    id: 'ch_bs_013_s',
    nodeId: NODE_C11_BS_033,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the 4 operational steps of a Post-Loss Property Claim Settlement in correct chronological and legal sequence.',
    sortItems: [
      'Insured exercises immediate mitigation actions to stop damage escalation (Mitigation)',
      'Independent IRDAI-licensed surveyor inspects wreckage to establish proximate cause (Causa Proxima)',
      'Insurer adjudicates liability and disburses net indemnification cheque (Indemnity)',
      'Insurer steps into insured’s shoes to sue the negligent tortfeasor who caused the peril (Subrogation)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: '1. Mitigation occurs on-site during the disaster. 2. Surveyor assesses Causa Proxima and quantum. 3. Insurer indemnifies the insured. 4. Subrogation rights transfer only AFTER the insurer has fully paid the claim.',
    hints: [
      'What must the property owner do first while the fire or leak is occurring?',
      'Surveyors evaluate cause before any cheque is written.',
      'Subrogation can legally happen ONLY after the claim has been settled and paid.',
    ],
    caseRef: 'Castellain v. Preston (1883)',
  },
  {
    id: 'ch_bs_014_s',
    nodeId: NODE_C11_BS_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A ship’s hull pipe is gnawed by rats, causing seawater influx that ruins a ₹70 Lakh cargo of basmati rice. The marine policy covers "Perils of the Sea" but explicitly excludes "Vermin and Rodent Infestation". Under the landmark doctrine of Causa Proxima (Hamilton v. Pandorf), how will the claim be decided?',
    options: [
      'Repudiated — Because rats were the initial initiating factor in the timeline',
      'Admitted — The active, efficient, and proximate cause that ruined the rice was seawater incursion, a Peril of the Sea',
      'Settled at 50% under the principle of contributory negligence',
      'Transferred to the municipal sanitation department for compensation',
    ],
    correctIndex: 1,
    explanation: 'In Hamilton, Fraser & Co. v. Pandorf & Co. (1887), the House of Lords established that proximate cause is the active, dominant, and efficient cause that directly produces the damage. The sea water was the proximate cause of the ruined cargo, making the insurer liable under Perils of the Sea.',
    hints: [
      'Look at the immediate physical agent that destroyed the grain.',
      'Was the rice eaten by rats or drowned by seawater?',
      'The seawater was the proximate cause, so the claim is admitted.',
    ],
    caseRef: 'Hamilton, Fraser & Co. v. Pandorf & Co. (1887)',
  },
  {
    id: 'ch_bs_015_s',
    nodeId: NODE_C11_BS_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A speeding private bus rams into a logistics truck insured with ICICI Lombard. ICICI Lombard pays the full ₹12 Lakh repair cost. The truck owner subsequently receives an out-of-court cash settlement of ₹4 Lakh from the bus company. What does the Principle of Subrogation dictate?',
    options: [
      'The truck owner is entitled to keep both amounts as additional punitive damages',
      'The truck owner must refund the ₹4 Lakh to ICICI Lombard to avoid double recovery beyond indemnity',
      'The bus company is prosecuted for criminal contempt of insurance court',
      'ICICI Lombard forfeits future premium collection rights on the truck',
    ],
    correctIndex: 1,
    explanation: 'Under Subrogation (Castellain v Preston), after paying the full indemnity of ₹12 Lakh, the insurer is subrogated to all recovery rights against negligent third parties. If the insured recovers ₹4 Lakh from the wrongdoer, that money belongs to the insurer to prevent unjust enrichment.',
    hints: [
      'Can the truck owner recover ₹12L + ₹4L = ₹16L for a ₹12L loss?',
      'No, that violates the principle of indemnity.',
      'The ₹4 Lakh recovered from the wrongdoer must be surrendered to ICICI Lombard.',
    ],
    caseRef: 'Castellain v. Preston (1883)',
  },
  {
    id: 'ch_bs_016_s',
    nodeId: NODE_C11_BS_034,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following statements correctly distinguishes Double Insurance from Re-insurance?',
    options: [
      'Double Insurance: One insured insures same subject-matter with multiple insurers; Re-insurance: Insurer cedes excess liability to another insurer',
      'Double Insurance: Regulated by RBI; Re-insurance: Regulated by SEBI',
      'Double Insurance: Applies only to Marine Hull; Re-insurance: Applies only to Life Annuities',
      'Double Insurance: Illegal under Contract Act; Re-insurance: Mandatory for individual citizens',
    ],
    correctIndex: 0,
    explanation: 'Double insurance is arranged by the policyholder (one insured, multiple policies on same risk). Re-insurance is a B2B arrangement between insurers where the primary direct insurer (cedant) cedes part of its underwriting risk to a reinsurer (e.g. GIC Re) to protect balance sheet solvency.',
    hints: [
      'Who enters into the contract in double insurance? The consumer/insured.',
      'Who enters into the contract in re-insurance? The insurance company.',
      'Double insurance involves multiple policies by one insured; reinsurance is insurer-to-insurer risk cession.',
    ],
  },
  {
    id: 'ch_bs_017_s',
    nodeId: NODE_C11_BS_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under the Pradhan Mantri Fasal Bima Yojana (PMFBY) and Ayushman Bharat (PM-JAY), premiums are heavily subsidised by central/state governments for farmers and vulnerable citizens. Why are these statutory programs classified as "Social Insurance"?',
    options: [
      'Because they are traded on the National Stock Exchange under ESG derivatives',
      'Because they are state-sponsored risk pooling instruments designed for socio-economic welfare rather than commercial underwriting profit',
      'Because they only indemnify damages to social media and digital accounts',
      'Because private insurance companies are strictly forbidden from participating in claims administration',
    ],
    correctIndex: 1,
    explanation: 'Social Insurance refers to statutory, state-backed protection programs where risk is pooled across broad populations and subsidised via public finance to safeguard economically weaker sections against catastrophic healthcare, crop, or unemployment shocks.',
    hints: [
      'Consider the social welfare objective and government funding support.',
      'They protect vulnerable socio-economic classes against poverty traps.',
      'State-sponsored welfare risk pooling characterizes Social Insurance.',
    ],
  },
  {
    id: 'ch_bs_018_s',
    nodeId: NODE_C11_BS_031,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'According to Actuarial Science and the Law of Large Numbers, why does an insurance pool of 1,00,000 policyholders remain solvent, whereas a pool of 20 policyholders is doomed to bankruptcy?',
    options: [
      'In a 20-member pool, random claim variance is massive; in a 1,00,000-member pool, actual loss frequency converges tightly to expected probability, enabling precise premium pricing',
      'A 20-member pool is prohibited from opening bank accounts in India',
      'The Law of Large Numbers ensures that fires and natural disasters never occur in large groups',
      'Large pools allow insurers to invest heavily in speculative real estate markets',
    ],
    correctIndex: 0,
    explanation: 'The Law of Large Numbers dictates that as the number of independent exposure units increases, the relative standard error decreases (proportional to 1/√N). This allows actuaries to predict aggregate claim costs with high precision.',
    hints: [
      'What happens if 2 out of 20 members suffer total loss in month one? 10% claim spike ruins the fund.',
      'What happens if 2,000 out of 1,00,000 suffer loss? Exactly 2%, matching the budgeted premium reserve.',
      'Variance diminishes with large sample sizes, making risk predictable.',
    ],
  },
  {
    id: 'ch_bs_019_s',
    nodeId: NODE_C11_BS_035,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the specific Marine Insurance Policy type with its exact statutory subject-matter under the Marine Insurance Act 1963.',
    options: [
      'Hull: Ship structure | Cargo: Goods in transit | Freight: Carrier shipping revenue',
      'Hull: Goods in transit | Cargo: Ship captain life | Freight: Port construction',
      'Hull: Customs duty | Cargo: Ship hull | Freight: Passenger baggage',
      'Hull: Crew health | Cargo: Port crane | Freight: Fuel bunker',
    ],
    correctIndex: 0,
    explanation: 'Marine Hull Insurance covers the vessel and machinery; Marine Cargo Insurance covers the merchandise transported; Marine Freight Insurance covers the shipping charges payable on safe arrival.',
    hints: [
      'Hull = the physical body and machinery of the vessel.',
      'Cargo = the commodities/goods being shipped.',
      'Freight = the consideration/revenue payable for transporting the cargo.',
    ],
    statuteRef: 'Marine Insurance Act 1963 s.3',
  },
  {
    id: 'ch_bs_020_s',
    nodeId: NODE_C11_BS_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under the Average Clause in Fire Insurance: A godown holding ₹100 Lakh stock is under-insured for ₹60 Lakh. A fire causes ₹40 Lakh partial damage. How much (in ₹ Lakh) will the insurer pay under Section 64UM / Average Clause?',
    scenarioSnippet: 'Formula: Claim = (Sum Insured / Total Market Value of Goods) × Actual Loss',
    correctAnswer: 24,
    tolerance: 0.1,
    unit: 'Lakh',
    explanation: 'Under the Average Clause: Claim = (Sum Insured / Market Value) × Loss = (60 / 100) × 40 = 0.60 × 40 = ₹24 Lakh. The insured is considered their own insurer for the remaining 40% (₹16 Lakh) because they under-insured the property to save on premium.',
    hints: [
      'The property was insured for only 60% of its true value (60 / 100).',
      'Therefore, the insurer pays only 60% of the partial loss.',
      'Calculate: 60% of ₹40 Lakh = ₹24 Lakh.',
    ],
  },

  // ────────────────── ADVANCED TIER (10 Challenges) ──────────────────
  {
    id: 'ch_bs_021_a',
    nodeId: NODE_C11_BS_032,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the exact legal and mathematical formula for calculating Rateable Proportion under the Principle of Contribution in Double Insurance.',
    availableParts: ['(Sum Insured of that Policy', '/', 'Total Sum Insured all Policies)', '*', 'Actual Loss Suffered', 'Total Market Value', '+', 'Annual Premium Paid'],
    targetState: '(Sum Insured of that Policy / Total Sum Insured all Policies) * Actual Loss Suffered',
    validationHint: 'Formula: (Sum Insured of Policy / Total Sum Insured) * Actual Loss',
    explanation: 'The Principle of Contribution establishes that each insurer pays its rateable share: Rateable Liability = (Policy Sum Insured / Aggregate Sum Insured under all concurrent policies) × Actual Assessed Loss.',
    hints: [
      'Start with the fraction: (Sum Insured of that Policy / Total Sum Insured all Policies)',
      'Multiply by the actual loss: * Actual Loss Suffered',
      'Select the 5 matching blocks in order.',
    ],
  },
  {
    id: 'ch_bs_022_a',
    nodeId: NODE_C11_BS_034,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Tata Steel underwrites a ₹2,000 Crore mega-blast furnace with New India Assurance. New India retains ₹400 Crore (20%), cedes ₹1,000 Crore (50%) to GIC Re under a Quota Share Treaty, and cedes ₹600 Crore (30%) to Swiss Re. If an explosion causes ₹500 Crore loss, how much (in ₹ Crore) will GIC Re reimburse to New India?',
    scenarioSnippet: 'Proportional Quota Share Reinsurance Treaty claim settlement.',
    correctAnswer: 250,
    tolerance: 0.1,
    unit: 'Crore',
    explanation: 'Under a 50% Quota Share Treaty, GIC Re assumes 50% of all premiums and 50% of all incurred losses. Loss = ₹500 Crore. GIC Re share = 50% × ₹500 Crore = ₹250 Crore. New India bears ₹100 Cr (20%) and Swiss Re bears ₹150 Cr (30%).',
    hints: [
      'Find GIC Re’s quota share percentage: 1,000 / 2,000 = 50%.',
      'Apply 50% directly to the total claim of ₹500 Crore.',
      '50% of 500 = ₹250 Crore.',
    ],
  },
  {
    id: 'ch_bs_023_a',
    nodeId: NODE_C11_BS_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A chemical plant owner insured for ₹5 Crore notices a minor valve fire. Rather than deploying automatic FM-200 fire extinguishers, he intentionally records social media reels while the plant burns completely. The surveyor proves timely suppression would have restricted loss to ₹25 Lakh. How much will the insurer pay?',
    options: [
      '₹5 Crore — The full Sum Insured because fire was an insured peril',
      '₹25 Lakh — The insurer deducts the ₹4.75 Crore aggravated loss directly caused by the insured’s breach of the Duty to Mitigate Loss',
      '₹0 — Complete repudiation and criminal prosecution for willful arson',
      '₹2.5 Crore — 50% equitable split under consumer court guidelines',
    ],
    correctIndex: 1,
    explanation: 'Under the Principle of Mitigation of Loss, the insured cannot recover damages resulting from their own gross negligence or intentional inaction. The insurer is liable only for the unavoidable loss (₹25 Lakh) and is entitled to deduct the avoidable aggravated loss (₹4.75 Crore).',
    hints: [
      'Did the owner act as a prudent uninsured owner would have acted?',
      'No, he breached the legal duty to mitigate.',
      'The insurer pays only the initial unavoidable ₹25 Lakh.',
    ],
  },
  {
    id: 'ch_bs_024_a',
    nodeId: NODE_C11_BS_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In LIC of India v. Smt. Asha Goel (2001), the Supreme Court laid down 3 cumulative conditions for an insurer to repudiate a life assurance policy under Section 45. Which of the following is NOT one of those mandatory conditions?',
    options: [
      'The statement was on a material matter or suppressed a material fact',
      'The suppression was fraudulently made by the policyholder knowing it was false',
      'The policyholder failed to maintain a minimum bank balance of ₹10 Lakh at the time of claim',
      'The policyholder knew at the time of making the statement that it was false or concealed',
    ],
    correctIndex: 2,
    explanation: 'The Supreme Court ruled that Section 45 repudiation requires: (1) statement was material, (2) made fraudulently, and (3) known to be false by the proposer. Financial status or bank balance at death is completely irrelevant.',
    hints: [
      'Look for the option that has no connection to disclosure or health truthfulness.',
      'Bank balance has zero legal bearing on life assurance validity.',
      'Option C is completely extraneous.',
    ],
    caseRef: 'LIC of India v. Smt. Asha Goel (2001)',
    statuteRef: 'Insurance Act 1938 s.45',
  },
  {
    id: 'ch_bs_025_a',
    nodeId: NODE_C11_BS_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During Cyclone Biparjoy, GIC Re ceded 30% of its accumulated offshore energy risk pool to Munich Re and Lloyd’s syndicates in London. What is this secondary transfer from one reinsurer to another reinsurer termed in international insurance law?',
    options: ['Co-insurance Cession', 'Retrocession', 'Double Re-insurance', 'Subrogated Indemnity'],
    correctIndex: 1,
    explanation: 'When a reinsurer cedes a portion of the reinsurance risk it has accepted from primary cedants to another reinsurer, the transaction is called "Retrocession", the ceding reinsurer is a "Retrocedant", and the assuming entity is a "Retrocessionaire".',
    hints: [
      'Customer → Direct Insurer = Insurance.',
      'Direct Insurer → Reinsurer = Re-insurance.',
      'Reinsurer → Secondary Reinsurer = Retrocession.',
    ],
  },
  {
    id: 'ch_bs_026_a',
    nodeId: NODE_C11_BS_035,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange these 4 insurance policies in descending order of Strictness of Indemnity Application (from Strictest Invoice/Replacement Cap to Pure Fixed Assurance).',
    sortItems: [
      'Marine Cargo Policy (Strict Commercial Indemnity: Invoice + Shipping + Agreed Profit Markup)',
      'Fire Property Policy (Indemnity: Reinstatement cost minus calculated depreciation)',
      'Health Mediclaim Reimbursement (Indemnity: Actual hospitalisation invoices up to Sum Insured cap)',
      'Term Life Assurance (Pure Assurance: Agreed Sum Assured paid on death with ZERO indemnity calculation)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Commercial property & transit policies enforce strict financial indemnity; health covers reimburse actual incurred medical expenses; life assurance has zero indemnity because human life cannot be monetised.',
    hints: [
      'Commercial freight & property come first as strict indemnity contracts.',
      'Expense reimbursement (health) follows.',
      'Life assurance is pure assurance with zero indemnity calculation and goes last.',
    ],
  },
  {
    id: 'ch_bs_027_a',
    nodeId: NODE_C11_BS_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A warehouse is damaged by fire. While water hoses are being used to extinguish the fire, 200 bags of sugar stored in an adjacent room are ruined by water runoff. The policy covers "Fire" but excludes "Water Damage". Is the sugar loss indemnifiable?',
    options: [
      'No — Because the immediate physical agent ruining the sugar was water, an excluded peril',
      'Yes — Because water was deployed as a direct and natural consequence of the fire; Fire was the active, efficient proximate cause',
      'No — The warehouse keeper is barred under the doctrine of mitigation',
      'Yes — But only if the water was sourced from municipal tap water',
    ],
    correctIndex: 1,
    explanation: 'In insurance law, water used reasonably to extinguish an accidental fire is treated as an integral part of the fire peril itself. Fire remains the active efficient proximate cause, so the damage is covered under the Fire Policy.',
    hints: [
      'Why was the water there in the first place? To extinguish the fire.',
      'The fire set the whole causal chain into motion.',
      'Fire is the proximate cause; therefore the water damage to sugar is indemnifiable.',
    ],
    caseRef: 'Stanley v. Western Insurance Co. (1868)',
  },
  {
    id: 'ch_bs_028_a',
    nodeId: NODE_C11_BS_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does Section 64VB of the Insurance Act 1938 make advance payment of premium a statutory condition precedent for risk attachment in India?',
    options: [
      'To prevent insurers from going insolvent by ensuring risk assumption is backed by collected liquid reserves before claims can arise',
      'To ensure the central government receives immediate GST revenue',
      'To discourage citizens from buying private insurance',
      'To eliminate the need for IRDAI regulatory inspections',
    ],
    correctIndex: 0,
    explanation: 'Section 64VB mandates "No risk to be assumed unless premium is received in advance". This statutory bedrock guarantees that insurers collect the consideration upfront, maintaining the solvency margin needed to pay claims without financial distress.',
    hints: [
      'Can an insurer pay sudden flood claims if policyholders have not paid their premiums yet?',
      'Section 64VB protects insurance fund liquidity and solvency.',
      'No premium = No risk attachment.',
    ],
    statuteRef: 'Insurance Act 1938 s.64VB',
  },
  {
    id: 'ch_bs_029_a',
    nodeId: NODE_C11_BS_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An industrialist takes a ₹20 Crore Key-Person Assurance policy on the company Chief Technology Officer (CTO). Two years later, the CTO resigns to start a rival firm. Six months after resigning, the former CTO tragically passes away. Can the industrialist’s company legally claim the ₹20 Crore death benefit from LIC?',
    options: [
      'No — Because insurable interest ceased the moment the CTO resigned from employment',
      'Yes — Because in Life Assurance (Dalby v. India & London Life Assurance), insurable interest is required ONLY at the time of policy inception',
      'No — The claim is forfeited and transferred to the Prime Minister’s Relief Fund',
      'Yes — But only if the former CTO gave written consent in his last will and testament',
    ],
    correctIndex: 1,
    explanation: 'Under the landmark precedent Dalby v. India & London Life Assurance Co. (1854), insurable interest in Life Assurance must exist at the date the contract is effected. The subsequent cessation of employment or interest before death does not invalidate the insurer’s liability.',
    hints: [
      'Remember the Dalby rule for Life Assurance.',
      'Does life assurance require insurable interest at death, or only at inception?',
      'Only at inception! The policy remains valid and payable to the policyholder.',
    ],
    caseRef: 'Dalby v. The India & London Life Assurance Co. (1854)',
  },
  {
    id: 'ch_bs_030_a',
    nodeId: NODE_C11_BS_034,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct mathematical formula for calculating the Average Clause Under-Insurance Claim Payout.',
    availableParts: ['(Sum Insured', '/', 'Total Market Value of Property)', '*', 'Actual Loss Suffered', 'Total Premium Paid', '-', 'Depreciation Reserve'],
    targetState: '(Sum Insured / Total Market Value of Property) * Actual Loss Suffered',
    validationHint: 'Formula: (Sum Insured / Total Market Value) * Actual Loss',
    explanation: 'Average Clause Claim = (Sum Insured ÷ Total Market Value of the Insured Property) × Actual Loss Suffered. If a property is under-insured, the owner bears a pro-rata fraction of any partial loss.',
    hints: [
      'Start with the under-insurance ratio: (Sum Insured / Total Market Value of Property)',
      'Multiply by the damage incurred: * Actual Loss Suffered',
      'Select the 5 matching blocks in order.',
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════════════
// GUIDED INTERACTIVE EXPLORATION LABS (5 Deep Experimental Modules)
// ═════════════════════════════════════��═════════════════════════════════════════════════
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Actuarial Risk Pooling & The Law of Large Numbers',
    instruction: 'Slide the pool size from 100 to 50,000 policyholders. Observe how the stochastic volatility curve collapses into a rock-solid, predictable actuarial line.',
    interactionType: 'slider-pool',
    nodeId: NODE_C11_BS_031,
  },
  {
    title: 'Lab 2: The Indemnity & Average Clause Balance Engine',
    instruction: 'Adjust Stock Value, Sum Insured, and Fire Damage sliders. Observe how Indemnity prevents windfall profits and how Under-Insurance penalises partial claims.',
    interactionType: 'indemnity-calc',
    nodeId: NODE_C11_BS_032,
  },
  {
    title: 'Lab 3: Causa Proxima Multi-Link Causation Chain',
    instruction: 'Click each link in the disaster chain (Rats → Seawater → Wet Sugar → Spoilage) to isolate the Active Efficient Cause versus Remote Initiators.',
    interactionType: 'cause-chain',
    nodeId: NODE_C11_BS_033,
  },
  {
    title: 'Lab 4: Re-insurance & Retrocession Solvency Architecture',
    instruction: 'Adjust Cedant Retention, GIC Re Quota Share, and Global Retrocession sliders to stress-test a ₹1,000 Crore cyclone claim.',
    interactionType: 'reinsurance-layer',
    nodeId: NODE_C11_BS_034,
  },
  {
    title: 'Lab 5: Multi-Line Corporate Insurance Portfolio Architect',
    instruction: 'Bind 6 major corporate asset classes (Vehicle Fleet, Ship Cargo, Chemical Plant, Key CTO, Cashier, Employees) to their exact statutory policy types.',
    interactionType: 'portfolio-builder',
    nodeId: NODE_C11_BS_035,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you insure a ₹100 Crore factory for ₹160 Crore (Over-Insurance) and suffer a ₹50 Crore fire loss, how much will the surveyor authorise for payout?',
    options: ['₹160 Crore (Full Sum Insured)', '₹100 Crore (Market Value)', '₹50 Crore (Actual Loss Suffered)', '₹0 (Void for fraud)'],
    correctIndex: 2,
    verifyInstruction: 'Now move the Actual Loss slider to ₹50 Cr in Lab 2 to verify the indemnity ceiling in real time.',
    nodeId: NODE_C11_BS_032,
  },
  {
    question: 'Predict: If an insurer with a ₹300 Crore capital base retains 100% of a ₹1,500 Crore port catastrophe risk without reinsurance, what happens during a ₹800 Crore cyclone disaster?',
    options: ['The government automatically pays the ₹500 Cr deficit', 'The insurer suffers immediate technical insolvency & collapse', 'Policyholders must forfeit all claim rights', 'The policy is converted into government bonds'],
    correctIndex: 1,
    verifyInstruction: 'In Lab 4, set Cedant Retention to 100% and watch the Solvency Deficit gauge turn critical red.',
    nodeId: NODE_C11_BS_034,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the Observed Claim Volatility as the Risk Pool size expands from 100 to 50,000 members?',
    observableOptions: [
      'Random variance collapses and claim frequency converges tightly to the actuarial expected line (2.0%)',
      'The claim cost per member skyrockets exponentially',
      'Total claims drop to zero because large pools prevent accidents',
      'Insurers lose all underwriting margin and go bankrupt',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_BS_031,
  },
  {
    question: 'Observation: When a property is under-insured by 40% (Sum Insured = ₹60L, Market Value = ₹100L), what happens to a partial fire claim of ₹40L under the Average Clause?',
    observableOptions: [
      'The insurer pays only 60% of the loss (₹24L); the owner bears the remaining ₹16L as co-insurer',
      'The insurer pays the full ₹40L because it is below the ₹60L Sum Insured limit',
      'The insurer refunds all past premiums with compound interest',
      'The policy is cancelled immediately without payment',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_BS_032,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════════════
// REAL-WORLD ENTERPRISE ACTION PROJECT (CRO CAPSTONE)
// ═══════════════════════════════════════════════════════════════════════════════════════
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Risk Officer Executive Brief: Tata Motors & Tata Steel Infrastructure Audit',
  description: 'You have completed the risk management simulation. Here is your enterprise risk memorandum for the Board of Directors, structuring ₹5,000 Crore of aggregate assets across 5 legal doctrines and 3 statutory acts.',
  steps: [
    'Fleet Transport: 3,500 commercial haulage trucks bound under Section 146 MV Act 1988 (Compulsory Third-Party Liability) + Comprehensive Own Damage with zero depreciation riders.',
    'Manufacturing Infrastructure: Jamshedpur & Pune stamping facilities (₹1,800 Cr) covered under Bharat Sookshma/Griha Raksha Fire & Allied Perils with Standard Average Clause protections.',
    'High Seas Exports: Bulk steel shipments to Port of Rotterdam insured under Marine Cargo (Institute Cargo Clauses A) with Insurable Interest anchored at time of loss (Marine Ins. Act 1963 s.6).',
    'Re-insurance Treaty: 45% Quota Share treaty ceded to GIC Re under IRDAI 2018 Guidelines, with 25% retroceded to Munich Re & Swiss Re to safeguard solvency margins above 150%.',
    'Corporate Governance: Fidelity Guarantee Policies issued on treasury personnel, alongside ₹50 Cr Key-Person Life Assurance on executive engineering directors under the Dalby doctrine.',
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════════════
// TOPIC SPECIFIC SVG DIAGRAM COMPONENTS (3+ High Quality Vector Graphics)
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * SVG DIAGRAM 1: Risk Pooling & Law of Large Numbers Architecture
 */
function RiskPoolingSvgDiagram({ poolSize = 1000 }: { poolSize: number }) {
  const stabilityPct = Math.min(100, Math.round(20 + Math.log10(poolSize) * 20));
  return (
    <div className="w-full bg-slate-950 p-4 rounded-2xl border border-indigo-900/60 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2 px-2">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">SVG Diagram 1: Actuarial Risk Pooling Mechanism</span>
        <span className="text-xs text-emerald-400 font-mono">Pool Stability: {stabilityPct}%</span>
      </div>
      <svg viewBox="0 0 800 320" className="w-full h-auto max-h-72 select-none" aria-label="Risk Pooling Architecture Diagram">
        <defs>
          <linearGradient id="poolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312e81" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="claimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Background Grid */}
        <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#1e293b" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="20" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <rect width="800" height="320" fill="url(#gridPattern)" rx="12" />

        {/* LEFT: Policyholders Individual Risks */}
        <g transform="translate(40, 40)">
          <rect x="0" y="0" width="180" height="240" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="90" y="28" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
            {poolSize.toLocaleString()} Policyholders
          </text>
          <text x="90" y="44" fill="#64748b" fontSize="10" textAnchor="middle">
            (Exposed to Perils)
          </text>

          {/* Micro Policyholder Nodes */}
          {[
            { cx: 35, cy: 75, r: 12, label: 'P1' },
            { cx: 75, cy: 75, r: 12, label: 'P2' },
            { cx: 115, cy: 75, r: 12, label: 'P3' },
            { cx: 155, cy: 75, r: 12, label: 'P4' },
            { cx: 35, cy: 115, r: 12, label: 'P5' },
            { cx: 75, cy: 115, r: 12, label: 'P6' },
            { cx: 115, cy: 115, r: 12, label: 'P7' },
            { cx: 155, cy: 115, r: 12, label: 'P8' },
            { cx: 35, cy: 155, r: 12, label: 'P9' },
            { cx: 75, cy: 155, r: 12, label: 'P10' },
            { cx: 115, cy: 155, r: 12, label: 'P11' },
            { cx: 155, cy: 155, r: 12, label: 'P12' },
          ].map((dot, idx) => (
            <g key={idx}>
              <circle cx={dot.cx} cy={dot.cy} r={dot.r} fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x={dot.cx} y={dot.cy + 3.5} fill="#e2e8f0" fontSize="8" fontWeight="bold" textAnchor="middle">
                {dot.label}
              </text>
            </g>
          ))}
          <text x="90" y="195" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
            Small Annual Premiums
          </text>
          <text x="90" y="215" fill="#64748b" fontSize="9" textAnchor="middle">
            Consideration s.2(d)
          </text>
        </g>

        {/* Premium Flow Arrows (Left to Center) */}
        <g>
          <path d="M 220 120 C 270 120, 280 140, 320 150" fill="none" stroke="url(#flowGrad1)" strokeWidth="3" strokeDasharray="6 4" />
          <path d="M 220 160 C 270 160, 280 160, 320 160" fill="none" stroke="url(#flowGrad1)" strokeWidth="3" strokeDasharray="6 4" />
          <path d="M 220 200 C 270 200, 280 180, 320 170" fill="none" stroke="url(#flowGrad1)" strokeWidth="3" strokeDasharray="6 4" />
          <polygon points="325,160 315,153 315,167" fill="#6366f1" />
          <text x="270" y="105" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
            ₹ Premiums
          </text>
        </g>

        {/* CENTER: Central Actuarial Common Reserve Pool */}
        <g transform="translate(330, 45)">
          <rect x="0" y="0" width="180" height="230" rx="16" fill="url(#poolGrad)" stroke="#6366f1" strokeWidth="2" filter="url(#glow)" />
          <circle cx="90" cy="50" r="28" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
          <text x="90" y="55" fill="#ffffff" fontSize="20" textAnchor="middle">🛡️</text>
          <text x="90" y="100" fill="#ffffff" fontSize="13" fontWeight="extrabold" textAnchor="middle">
            ACTUARIAL POOL
          </text>
          <text x="90" y="118" fill="#c7d2fe" fontSize="10" textAnchor="middle">
            Common Risk Fund
          </text>

          {/* Solvency Reserve Meter inside Pool */}
          <rect x="20" y="135" width="140" height="18" rx="9" fill="#0f172a" stroke="#475569" />
          <rect x="22" y="137" width={136 * (stabilityPct / 100)} height="14" rx="7" fill="#10b981" />
          <text x="90" y="148" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
            Solvency Ratio: {120 + stabilityPct}%
          </text>

          <text x="90" y="180" fill="#94a3b8" fontSize="9" textAnchor="middle">
            Law of Large Numbers:
          </text>
          <text x="90" y="195" fill="#a5f3fc" fontSize="10" fontWeight="mono" textAnchor="middle">
            σ = σ₀ / √N
          </text>
          <text x="90" y="212" fill="#34d399" fontSize="9" textAnchor="middle">
            {poolSize >= 5000 ? '✓ High Predictability' : '⚠️ Low Predictability'}
          </text>
        </g>

        {/* Claim Flow Arrows (Center to Right) */}
        <g>
          <path d="M 510 160 C 545 160, 560 160, 580 160" fill="none" stroke="url(#claimGrad)" strokeWidth="3" strokeDasharray="6 4" />
          <polygon points="585,160 575,153 575,167" fill="#f43f5e" />
          <text x="548" y="145" fill="#fb7185" fontSize="10" fontWeight="bold" textAnchor="middle">
            Indemnity Payout
          </text>
        </g>

        {/* RIGHT: The Few Misfortune Victims (Indemnification) */}
        <g transform="translate(590, 40)">
          <rect x="0" y="0" width="170" height="240" rx="12" fill="#0f172a" stroke="#881337" strokeWidth="1.5" />
          <text x="85" y="28" fill="#fda4af" fontSize="12" fontWeight="bold" textAnchor="middle">
            Few Affected Victims
          </text>
          <text x="85" y="44" fill="#64748b" fontSize="10" textAnchor="middle">
            (Suffered Loss from Peril)
          </text>

          {/* Calamity Icons */}
          <g transform="translate(25, 60)">
            <rect x="0" y="0" width="120" height="40" rx="8" fill="#1e1b4b" stroke="#f43f5e" />
            <text x="15" y="25" fontSize="16">🔥</text>
            <text x="40" y="18" fill="#ffffff" fontSize="10" fontWeight="bold">Fire Loss</text>
            <text x="40" y="32" fill="#fda4af" fontSize="8">₹35 Lakh Compensated</text>
          </g>

          <g transform="translate(25, 110)">
            <rect x="0" y="0" width="120" height="40" rx="8" fill="#1e1b4b" stroke="#f43f5e" />
            <text x="15" y="25" fontSize="16">🌊</text>
            <text x="40" y="18" fill="#ffffff" fontSize="10" fontWeight="bold">Flood Loss</text>
            <text x="40" y="32" fill="#fda4af" fontSize="8">₹50 Lakh Compensated</text>
          </g>

          <text x="85" y="180" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
            Principle of Indemnity
          </text>
          <text x="85" y="196" fill="#94a3b8" fontSize="9" textAnchor="middle">
            Restored to pre-loss state
          </text>
          <text x="85" y="212" fill="#64748b" fontSize="8" textAnchor="middle">
            No profit • No windfall
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * SVG DIAGRAM 2: 7 Fundamental Principles of Insurance Ecosystem Architecture
 */
function PrinciplesEcosystemSvgDiagram() {
  const [hoveredPrinciple, setHoveredPrinciple] = useState<number | null>(null);

  const principles = [
    { title: '1. Uberrimae Fidei', subtitle: 'Utmost Good Faith', angle: 0, color: '#6366f1', statute: 'Carter v Boehm (1766)' },
    { title: '2. Insurable Interest', subtitle: 'Pecuniary Interest', angle: 51.4, color: '#38bdf8', statute: 'Dalby Case / MIA s.6' },
    { title: '3. Indemnity', subtitle: 'Exact Loss Restored', angle: 102.8, color: '#10b981', statute: 'Castellain v Preston' },
    { title: '4. Contribution', subtitle: 'Rateable Burden Split', angle: 154.2, color: '#f59e0b', statute: 'Double Insurance Rule' },
    { title: '5. Subrogation', subtitle: 'Insurer Steps in Shoes', angle: 205.6, color: '#ec4899', statute: 'Tort Recovery Right' },
    { title: '6. Causa Proxima', subtitle: 'Active Dominant Cause', angle: 257, color: '#8b5cf6', statute: 'Hamilton v Pandorf' },
    { title: '7. Mitigation', subtitle: 'Minimise Escalation', angle: 308.4, color: '#14b8a6', statute: 'Section 73 Contract Act' },
  ];

  return (
    <div className="w-full bg-slate-950 p-4 rounded-2xl border border-indigo-900/60 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2 px-2">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">SVG Diagram 2: 7 Cardinal Principles of Insurance Law</span>
        <span className="text-xs text-slate-400">Hover nodes to reveal judicial doctrine</span>
      </div>
      <svg viewBox="0 0 800 380" className="w-full h-auto max-h-80 select-none" aria-label="7 Principles of Insurance Ecosystem Diagram">
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Central Core */}
        <circle cx="400" cy="190" r="65" fill="url(#centerGlow)" stroke="#6366f1" strokeWidth="2" />
        <text x="400" y="180" fill="#ffffff" fontSize="13" fontWeight="extrabold" textAnchor="middle">
          INSURANCE ACT
        </text>
        <text x="400" y="196" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
          1938 & 1999
        </text>
        <text x="400" y="212" fill="#94a3b8" fontSize="8" textAnchor="middle">
          Common Law Bedrock
        </text>

        {/* Surrounding Orbiting Principles */}
        {principles.map((p, idx) => {
          const rad = (p.angle - 90) * (Math.PI / 180);
          const cx = 400 + 200 * Math.cos(rad);
          const cy = 190 + 130 * Math.sin(rad);
          const isHovered = hoveredPrinciple === idx;

          return (
            <g
              key={idx}
              onMouseEnter={() => setHoveredPrinciple(idx)}
              onMouseLeave={() => setHoveredPrinciple(null)}
              className="cursor-pointer transition-all duration-300"
            >
              {/* Connector Spoke */}
              <line
                x1="400"
                y1="190"
                x2={cx}
                y2={cy}
                stroke={isHovered ? p.color : '#334155'}
                strokeWidth={isHovered ? 2.5 : 1}
                strokeDasharray={isHovered ? 'none' : '4 3'}
              />

              {/* Principle Node Box */}
              <rect
                x={cx - 70}
                y={cy - 28}
                width="140"
                height="56"
                rx="10"
                fill={isHovered ? '#1e1b4b' : '#0f172a'}
                stroke={isHovered ? p.color : '#475569'}
                strokeWidth={isHovered ? 2 : 1}
              />
              <text x={cx} y={cy - 8} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                {p.title}
              </text>
              <text x={cx} y={cy + 6} fill={p.color} fontSize="9" fontWeight="semibold" textAnchor="middle">
                {p.subtitle}
              </text>
              <text x={cx} y={cy + 18} fill="#64748b" fontSize="7.5" textAnchor="middle">
                {p.statute}
              </text>
            </g>
          );
        })}
      </svg>
      {hoveredPrinciple !== null && (
        <div className="w-full mt-2 p-3 bg-indigo-950/80 rounded-xl border border-indigo-700 text-xs text-indigo-200 text-center">
          <span className="font-bold text-white">{principles[hoveredPrinciple].title}: </span>
          {hoveredPrinciple === 0 && 'Both proposer and insurer must disclose all material facts fully without concealment (Carter v Boehm).'}
          {hoveredPrinciple === 1 && 'Proposer must suffer direct financial loss upon destruction of subject-matter (Dalby Case).'}
          {hoveredPrinciple === 2 && 'Insured is restored to exact pre-loss financial position without any profit (Castellain v Preston).'}
          {hoveredPrinciple === 3 && 'Multiple concurrent insurers share the net claim loss in rateable proportion.'}
          {hoveredPrinciple === 4 && 'After claim settlement, insurer assumes all rights to sue negligent third parties.'}
          {hoveredPrinciple === 5 && 'The active, efficient, proximate cause determines coverage admissibility (Hamilton v Pandorf).'}
          {hoveredPrinciple === 6 && 'Insured has a legal duty to take all reasonable steps to prevent and minimise damage escalation.'}
        </div>
      )}
    </div>
  );
}

/**
 * SVG DIAGRAM 3: Multi-Layer Re-insurance & Retrocession Architecture Flowchart
 */
function ReinsuranceLayeringSvgDiagram({
  retention = 30,
  gicReShare = 50,
  retrocession = 20,
}: {
  retention: number;
  gicReShare: number;
  retrocession: number;
}) {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-2xl border border-indigo-900/60 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2 px-2">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">SVG Diagram 3: Treaty Re-insurance & Retrocession Waterfall</span>
        <span className="text-xs text-purple-400 font-mono">₹1,000 Cr Risk Allocation</span>
      </div>
      <svg viewBox="0 0 800 300" className="w-full h-auto max-h-72 select-none" aria-label="Reinsurance Layering Architecture Diagram">
        <defs>
          <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="gicGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="retroGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#581c87" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* TOP LEVEL: Original Corporate Insured */}
        <g transform="translate(260, 20)">
          <rect x="0" y="0" width="280" height="45" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="140" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
            ORIGINAL INSURED: TATA CONGLOMERATE
          </text>
          <text x="140" y="35" fill="#38bdf8" fontSize="9" textAnchor="middle">
            ₹1,000 Crore Port & Stamping Facility Sum Insured
          </text>
        </g>

        {/* Flow Arrow to Direct Insurer */}
        <line x1="400" y1="65" x2="400" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
        <polygon points="400,95 395,87 405,87" fill="#38bdf8" />

        {/* MIDDLE LEVEL 1: Primary Direct Insurer (Cedant) */}
        <g transform="translate(60, 100)">
          <rect x="0" y="0" width="680" height="70" rx="12" fill="url(#primaryGrad)" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="340" y="24" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
            PRIMARY DIRECT INSURER (CEDANT) — New India Assurance Co. Ltd.
          </text>
          <text x="340" y="40" fill="#93c5fd" fontSize="10" textAnchor="middle">
            Underwrites 100% Policy with Customer • Own Net Retention = {retention}% (₹{10 * retention} Cr)
          </text>

          {/* Retention Bar Segment */}
          <rect x="40" y="48" width="600" height="12" rx="6" fill="#0f172a" />
          <rect x="40" y="48" width={600 * (retention / 100)} height="12" rx="6" fill="#3b82f6" />
          <text x={40 + 300 * (retention / 100)} y="57.5" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
            Cedant Retention ({retention}%)
          </text>
        </g>

        {/* Reinsurance Cession Arrow */}
        <line x1="300" y1="170" x2="300" y2="195" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
        <polygon points="300,200 295,192 305,192" fill="#10b981" />

        {/* Retrocession Arrow */}
        <line x1="560" y1="170" x2="560" y2="195" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
        <polygon points="560,200 555,192 565,192" fill="#a855f7" />

        {/* BOTTOM LEVEL LEFT: National Reinsurer (GIC Re) */}
        <g transform="translate(60, 205)">
          <rect x="0" y="0" width="320" height="80" rx="12" fill="url(#gicGrad)" stroke="#10b981" strokeWidth="1.5" />
          <text x="160" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
            NATIONAL REINSURER (GIC Re)
          </text>
          <text x="160" y="40" fill="#6ee7b7" fontSize="9.5" textAnchor="middle">
            Statutory Treaty Cession: {gicReShare}% (₹{10 * gicReShare} Cr)
          </text>
          <text x="160" y="56" fill="#94a3b8" fontSize="8" textAnchor="middle">
            Under IRDAI (Re-insurance) Regulations 2018
          </text>
          <text x="160" y="70" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">
            Domestic Solvency Shield
          </text>
        </g>

        {/* BOTTOM LEVEL RIGHT: Global Retrocessionaires */}
        <g transform="translate(420, 205)">
          <rect x="0" y="0" width="320" height="80" rx="12" fill="url(#retroGrad)" stroke="#a855f7" strokeWidth="1.5" />
          <text x="160" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
            GLOBAL RETROCESSIONAIRES
          </text>
          <text x="160" y="40" fill="#d8b4fe" fontSize="9.5" textAnchor="middle">
            Swiss Re, Munich Re & Lloyd’s: {retrocession}% (₹{10 * retrocession} Cr)
          </text>
          <text x="160" y="56" fill="#94a3b8" fontSize="8" textAnchor="middle">
            Cross-Border Catastrophe Risk Offloading
          </text>
          <text x="160" y="70" fill="#f3e8ff" fontSize="8" fontWeight="bold" textAnchor="middle">
            Secondary Risk Transfer (Retrocession)
          </text>
        </g>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════════════
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
  nodeId: NODE_C11_BS_031,
  title: 'Insurance: Meaning, Principles, Reinsurance & Multi-Line Types (ISC Class 11)',
  definition: 'Insurance is a contractual risk-transfer agreement under the Insurance Act 1938 and IRDAI Act 1999 whereby an insurer, in consideration of an advance premium under Section 64VB, undertakes to indemnify the insured against loss arising from specified contingencies through actuarial risk pooling, governed strictly by 7 cardinal principles: Utmost Good Faith, Insurable Interest, Indemnity, Contribution, Subrogation, Causa Proxima, and Mitigation of Loss.',
  eli5: 'Think of insurance like a giant community safety box. If 10,000 shopkeepers each put ₹1,000 in a box, and one shop catches fire, the box pays for the repairs. Nobody gets rich from the box (indemnity), everybody must tell the exact truth about their wiring (good faith), and only the shop owner can collect (insurable interest).',
  misconceptions: [
    { misconception: 'Insurance physically prevents fires, shipwrecks, and accidents from happening.', correction: 'Insurance does NOT prevent physical peril; it purely compensates the financial loss after the contingency occurs.' },
    { misconception: 'Sum Insured and Annual Premium are the exact same rupee figure.', correction: 'Premium is the small annual cost of buying protection (e.g. ₹25,000); Sum Insured is the maximum claim ceiling payable on destruction (e.g. ₹50 Lakh).' },
    { misconception: 'Life Insurance is a contract of indemnity just like Fire or Marine insurance.', correction: 'Life assurance is Assurance, not indemnity. Human life cannot be appraised with cash invoices; the full agreed Sum Assured is paid on death/maturity.' },
    { misconception: 'In Double Insurance, you can collect the full loss amount from every insurer and make a multi-crore profit.', correction: 'Under the Principle of Contribution, insurers pay only their rateable proportion, capping total recovery at the actual loss.' },
    { misconception: 'Motor insurance is entirely voluntary in India.', correction: 'Third-Party Liability cover is strictly mandatory by statute under Section 146 of the Motor Vehicles Act 1988 before plying on any public road.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the consideration paid by the insured in an insurance contract?', options: ['Sum Insured', 'Premium', 'Policy Bond', 'Dividend'], correctIndex: 1 },
    { question: 'Which principle prevents an insured from making a windfall profit from a fire loss?', options: ['Causa Proxima', 'Subrogation', 'Indemnity', 'Uberrimae Fidei'], correctIndex: 2 },
    { question: 'In life assurance, when must insurable interest be present?', options: ['At inception of policy', 'At time of death only', 'At both inception and death', 'Never required'], correctIndex: 0 },
    { question: 'Who are the contractual parties in a re-insurance agreement?', options: ['Policyholder and Insurer', 'Two Insurance Companies (Cedant & Reinsurer)', 'Insurer and IRDAI', 'Policyholder and Broker'], correctIndex: 1 },
    { question: 'Which principle allows the insurer to sue the negligent party after paying the claim?', options: ['Subrogation', 'Contribution', 'Mitigation', 'Wager'], correctIndex: 0 },
    { question: 'What is the proximate cause in insurance law?', options: ['The very first event in time', 'The active, efficient, dominant cause', 'The most expensive damage', 'The last event before police arrived'], correctIndex: 1 },
    { question: 'Which insurance policy is compulsory by Indian statute for motor vehicles?', options: ['Own Damage', 'Zero Depreciation', 'Third-Party Liability', 'Bumper to Bumper'], correctIndex: 2 },
    { question: 'Ayushman Bharat PM-JAY is an example of which insurance category?', options: ['Fidelity Insurance', 'Social Insurance', 'Marine Cargo Insurance', 'Key-Person Assurance'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master all 7 insurance principles, treaty re-insurance mathematics, double insurance rateable contributions, and multi-line statutory covers with Indian case law applications.',
};

export function C11_BusinessStudiesInsuranceMeaningFeaturesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_BS_031,
  title = DEFAULT_PROPS.title || 'Insurance: Meaning & Features',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bs'] || { name: 'Business Studies', emoji: '🏢', color: 'indigo' };

  // ────────────────── PHASE FLOW STATE ──────────────────
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ────────────────── PREDICTION & OBSERVATION STATE ──────────────────
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ────────────────── SIMULATION LAB STATE (5 Sliders & Toggles) ──────────────────
  const [poolMembers, setPoolMembers] = useState(1000); // Lab 1: 100 to 50,000
  const [stockValue, setStockValue] = useState(100); // Lab 2: ₹ Lakh
  const [sumInsured, setSumInsured] = useState(60); // Lab 2: ₹ Lakh
  const [actualLoss, setActualLoss] = useState(40); // Lab 2: ₹ Lakh
  const [applyAverageClause, setApplyAverageClause] = useState(true); // Lab 2: Toggle Average Clause
  const [retentionPct, setRetentionPct] = useState(30); // Lab 4: %
  const [gicReSharePct, setGicReSharePct] = useState(50); // Lab 4: %
  const [activeCauseStep, setActiveCauseStep] = useState<number | null>(null); // Lab 3
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null); // Lab 5
  const [portfolioCoverage, setPortfolioCoverage] = useState<Record<string, string>>({}); // Lab 5

  // ────────────────── ADAPTIVE LEARNING & MASTERY STATE ──────────────────
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ────────────────── CHALLENGE ATTEMPT & HINT STATE ──────────────────
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ────────────────── INTERACTIVE CHALLENGE INPUTS ──────────────────
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ────────────────── DISCOVERY STATE ──────────────────
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ────────────────── CASE LAW & STATUTE MODAL TABS ──────────────────
  const [activeTab, setActiveTab] = useState<'simulation' | 'caselaws' | 'statutes' | 'glossary'>('simulation');

  // ────────────────── FEEDBACK & ANIMATION STATE ──────────────────
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // ────────────────── REFS ──────────────────
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ────────────────── FILTERED CHALLENGES BY CURRENT TIER ──────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ────────────────── REACTIVE CALCULATIONS ──────────────────
  const isUnderInsured = useMemo(() => sumInsured < stockValue, [sumInsured, stockValue]);

  const calculatedIndemnityPayout = useMemo(() => {
    if (applyAverageClause && isUnderInsured) {
      // Average Clause: Claim = (Sum Insured / Market Value) * Actual Loss
      return parseFloat(((sumInsured / stockValue) * actualLoss).toFixed(2));
    }
    return Math.min(actualLoss, sumInsured);
  }, [actualLoss, sumInsured, stockValue, applyAverageClause, isUnderInsured]);

  const poolSimulationData = useMemo(() => {
    const data = [];
    const expectedRate = 2.0; // 2% claim rate
    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      const sampleSize = Math.round((poolMembers / steps) * i);
      const noise = (Math.sin(i * 3.4) * 1.5) / Math.sqrt(sampleSize / 100);
      const observedRate = Math.max(0.2, expectedRate + noise);
      data.push({
        sample: `${sampleSize}`,
        observed: parseFloat(observedRate.toFixed(2)),
        expected: expectedRate,
      });
    }
    return data;
  }, [poolMembers]);

  const globalRetrocessionPct = useMemo(() => {
    return Math.max(0, 100 - retentionPct - gicReSharePct);
  }, [retentionPct, gicReSharePct]);

  // ────────────────── INITIAL MOUNT CHECK ──────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ────────────────── BKT ADAPTIVE UPDATE EFFECT ──────────────────
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

  // ────────────────── 2D CANVAS ACTUARIAL WAVE ANIMATION ──────────────────
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
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      const amplitude = Math.max(1.5, 18 - Math.log10(poolMembers) * 4);
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 1.8) * 0.05) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [poolMembers]);

  // ────────────────── INACTIVITY AUTO-HINT TIMER ──────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ────────────────── EVENT HANDLERS (useCallback) ──────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Correct! Indemnity strictly restores actual loss.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Insurance Interactive Risk Labs. Let us learn by experimenting.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox Mode unlocked. Stress-test variables without scoring pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode initiated. Apply your legal principles to real corporate scenarios.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the engine below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb deduction! Law of Large Numbers flattens volatility.' : 'Notice how larger pools stabilize risk variance.');
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
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === (challenge.sortItems?.length || 0) ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [challenge]);

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
      audioManager.play('success');
      speechManager.speak('Spot on! Your analysis adheres strictly to Indian insurance jurisprudence.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
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
        speechManager.speak('Let us study the complete legal reasoning and statutory citation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 3);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Simulation complete with score ${finalScore} percent.`);
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ────────────────── HEADER TOP BAR ────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.2 }}
            className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">ISC Class 11 Business Studies • Statutory Nodes: c11_bs_031 to c11_bs_035</p>
          </div>
        </div>

        {/* Navigation Mode Pill Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'simulation' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            🎮 Risk Engine
          </button>
          <button
            onClick={() => setActiveTab('caselaws')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'caselaws' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚖️ Landmark Cases ({LANDMARK_CASE_LAWS.length})
          </button>
          <button
            onClick={() => setActiveTab('statutes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'statutes' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            📜 Statutes & Acts
          </button>
        </div>

        {/* Tier & Solvency Indicator */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border border-rose-700'
                : 'bg-indigo-950 text-indigo-400 border border-indigo-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Mastery Level</span>
            <span className="text-sm font-semibold text-emerald-300 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ────────────────── CASE LAW REFERENCE TAB ────────────────── */}
      {activeTab === 'caselaws' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white">Landmark Indian & English Insurance Case Laws</h2>
              <p className="text-xs text-slate-400">Mandatory judicial precedents for ISC Class 11 examination answers.</p>
            </div>
            <button
              onClick={() => setActiveTab('simulation')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
            >
              Back to Sim
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LANDMARK_CASE_LAWS.map((c, i) => (
              <div key={i} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-indigo-300">{c.name}</h3>
                  <span className="text-[10px] bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded border border-indigo-800">
                    {c.doctrine}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{c.ruling}</p>
                <p className="text-[11px] text-emerald-400 pt-1">
                  <span className="text-slate-500">ISC Exam Relevance: </span>{c.appliedTo}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ────────────────── STATUTES & ACTS TAB ────────────────── */}
      {activeTab === 'statutes' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white">Statutory Sections & Regulatory Mandates</h2>
              <p className="text-xs text-slate-400">Legal sections governing insurance underwriting, premiums, and claims in India.</p>
            </div>
            <button
              onClick={() => setActiveTab('simulation')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
            >
              Back to Sim
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STATUTORY_REFERENCES.map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block">{s.act}</span>
                <h4 className="text-sm font-bold text-white">{s.section}: {s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ────────────────── MAIN SIMULATION TAB ────────────────── */}
      {activeTab === 'simulation' && (
        <>
          {/* ══════════════════════════════════════════════════════════
              PHASE 1: CURIOSITY DISCOVERY & NARRATIVE MISSION HOOK
             ══════════════════════════════════════════════════════════ */}
          {phase === 'discovery' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
              {/* Executive Scenario Narrative */}
              <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
                  <span>⚡</span>
                  <span>CRO EXECUTIVE CRISIS DIRECTIVE</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white">{SCENARIO.title}</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
                <div className="p-3 bg-indigo-900/30 rounded-xl border border-indigo-800/40 text-xs text-indigo-300/90">
                  {SCENARIO.context}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {SCENARIO.milestones.map((m, i) => (
                    <div key={i} className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 text-xs">
                      <span className="font-bold text-indigo-400 block mb-0.5">{m.title}</span>
                      <span className="text-slate-400">{m.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discovery Curiosity Puzzle */}
              <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">Discovery Question (Ungraded Instinct Check)</span>
                  <span className="text-xs text-slate-400">No score penalty</span>
                </div>
                <p className="text-base md:text-lg font-medium text-white">{DISCOVERY_QUESTION.question}</p>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  {DISCOVERY_QUESTION.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleDiscoveryAnswer(idx)}
                      disabled={discoveryAnswered}
                      aria-label={`Option: ${option}`}
                      className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                        discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg'
                          : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                          ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </motion.button>
                  ))}
                </div>

                {discoveryAnswered && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4 border-t border-slate-800">
                    <div className={`p-4 rounded-xl text-sm ${discoveryCorrect ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' : 'bg-amber-950/60 text-amber-300 border border-amber-800'}`}>
                      <p className="font-semibold mb-1">{discoveryCorrect ? '🎯 Spot on Deduction!' : '💡 Classic Commercial Misconception!'}</p>
                      <p className="text-xs leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                    </div>

                    {/* Step-by-step logic breakdown */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-400 block uppercase">Legal Step-by-Step Adjudication:</span>
                      {DISCOVERY_QUESTION.analysisSteps.map((step, sIdx) => (
                        <p key={sIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-indigo-400 font-bold">✓</span>
                          <span>{step}</span>
                        </p>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdvanceToExploration}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
                      >
                        <span>Enter Guided Interactive Risk Labs</span>
                        <span>→</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              PHASE 2: GUIDED INTERACTIVE LABS (5 Deep Modules + 3 SVGs)
             ══════════════════════════════════════════════════════════ */}
          {phase === 'explore' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
              {/* Progress Navigator */}
              <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Interactive Risk Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <div className="flex gap-1.5">
                  {EXPLORATION_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentSlide ? 'w-8 bg-indigo-500' : i < currentSlide ? 'w-3 bg-emerald-500' : 'w-3 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Slide Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                    <p className="text-amber-400 text-sm mt-1 flex items-center gap-2">
                      <span>👉</span>
                      <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
                    </p>
                  </div>

                  {/* ────────────────── LAB 1: RISK POOLING & LAW OF LARGE NUMBERS ────────────────── */}
                  {currentSlide === 0 && (
                    <div className="space-y-6">
                      {/* Integrated SVG Diagram 1 */}
                      <RiskPoolingSvgDiagram poolSize={poolMembers} />

                      <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <label className="text-xs text-slate-400 block mb-1">Pool Size (N Insured Units):</label>
                            <span className="text-2xl font-bold text-indigo-400">{poolMembers.toLocaleString()} Lives / Units</span>
                          </div>
                          <div className="w-full md:w-80">
                            <input
                              type="range"
                              min={100}
                              max={50000}
                              step={500}
                              value={poolMembers}
                              onChange={(e) => {
                                setPoolMembers(Number(e.target.value));
                                audioManager.play('count');
                              }}
                              aria-label="Adjust pool size slider"
                              className="w-full accent-indigo-500 cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                              <span>100 (High Volatility)</span>
                              <span>25,000</span>
                              <span>50,000 (Actuarially Stable)</span>
                            </div>
                          </div>
                        </div>

                        {/* Recharts Convergence Chart */}
                        <div className="h-64 w-full pt-2">
                          <p className="text-xs text-slate-400 text-center mb-2">
                            Claim Rate Volatility (%) vs Actuarial Expectation (2.0%) across Sample Iterations
                          </p>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={poolSimulationData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                              <XAxis dataKey="sample" stroke="#94a3b8" fontSize={11} label={{ value: 'Sub-Sample Size', position: 'insideBottom', offset: -4 }} />
                              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 4.5]} label={{ value: 'Claim %', angle: -90, position: 'insideLeft' }} />
                              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                              <Legend />
                              <Line type="monotone" dataKey="observed" stroke="#f43f5e" name="Observed Claim % (Variance)" strokeWidth={2.5} dot={{ r: 3 }} />
                              <Line type="monotone" dataKey="expected" stroke="#10b981" name="Actuarial Expected (2.0%)" strokeWidth={2} strokeDasharray="5 5" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Canvas Live Wave */}
                        <div>
                          <span className="text-xs text-slate-500 block mb-1">Live Actuarial Solvency Pulse (Frequency Convergence)</span>
                          <canvas ref={canvasRef} width={700} height={40} className="w-full bg-slate-900 rounded-lg border border-slate-800" />
                        </div>

                        {/* Guided Observation Check */}
                        <div className="p-4 bg-slate-900 rounded-xl border border-indigo-900/50">
                          <p className="text-sm font-semibold text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, idx) => (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleObservation(idx)}
                                className={`p-3 rounded-lg text-left text-xs border ${
                                  observationAnswered && idx === OBSERVATION_QUESTIONS[0].correctIndex
                                    ? 'bg-emerald-950 border-emerald-600 text-emerald-200 font-medium'
                                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                                }`}
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ────────────────── LAB 2: THE INDEMNITY & AVERAGE CLAUSE ENGINE ────────────────── */}
                  {currentSlide === 1 && (
                    <div className="space-y-6">
                      {/* Integrated SVG Diagram 2 */}
                      <PrinciplesEcosystemSvgDiagram />

                      <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                        {/* Predict-First Question Hook */}
                        {!predictionMade && (
                          <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-800">
                            <p className="text-sm font-bold text-indigo-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                                <motion.button
                                  key={idx}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handlePrediction(idx)}
                                  className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-left text-slate-200 border border-slate-700"
                                >
                                  {opt}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                            <label className="text-xs text-slate-400 block mb-1">Godown Total Stock Value</label>
                            <span className="text-xl font-bold text-white mb-2 block">₹{stockValue} Lakh</span>
                            <input
                              type="range"
                              min={20}
                              max={150}
                              value={stockValue}
                              onChange={(e) => {
                                setStockValue(Number(e.target.value));
                                audioManager.play('count');
                              }}
                              aria-label="Stock Value Slider"
                              className="w-full accent-blue-500"
                            />
                          </div>

                          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                            <label className="text-xs text-slate-400 block mb-1">Sum Insured (Policy Ceiling)</label>
                            <span className="text-xl font-bold text-indigo-400 mb-2 block">₹{sumInsured} Lakh</span>
                            <input
                              type="range"
                              min={10}
                              max={200}
                              value={sumInsured}
                              onChange={(e) => {
                                setSumInsured(Number(e.target.value));
                                audioManager.play('count');
                              }}
                              aria-label="Sum Insured Slider"
                              className="w-full accent-indigo-500"
                            />
                          </div>

                          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                            <label className="text-xs text-slate-400 block mb-1">Actual Fire Damage Incurred</label>
                            <span className="text-xl font-bold text-rose-400 mb-2 block">₹{actualLoss} Lakh</span>
                            <input
                              type="range"
                              min={0}
                              max={stockValue}
                              value={actualLoss}
                              onChange={(e) => {
                                setActualLoss(Number(e.target.value));
                                audioManager.play('count');
                              }}
                              aria-label="Actual Loss Slider"
                              className="w-full accent-rose-500"
                            />
                          </div>
                        </div>

                        {/* Average Clause Toggle */}
                        <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="avgClauseToggle"
                              checked={applyAverageClause}
                              onChange={(e) => setApplyAverageClause(e.target.checked)}
                              className="h-4 w-4 accent-indigo-600 rounded cursor-pointer"
                            />
                            <label htmlFor="avgClauseToggle" className="text-xs text-slate-300 font-semibold cursor-pointer">
                              Apply Average Clause (Enforces Pro-Rata Under-Insurance Penalty on Partial Losses)
                            </label>
                          </div>
                          <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                            isUnderInsured ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}>
                            {isUnderInsured ? '⚠️ Under-Insured Property' : '✓ Adequately Insured'}
                          </span>
                        </div>

                        {/* Calculated Payout Panel */}
                        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 rounded-2xl border border-indigo-800 flex flex-col md:flex-row items-center justify-between gap-4">
                          <div>
                            <span className="text-xs uppercase font-bold text-slate-400 block">Surveyor Admitted Indemnity Payout</span>
                            <h4 className="text-3xl font-extrabold text-emerald-400">₹{calculatedIndemnityPayout} Lakh</h4>
                            <p className="text-xs text-slate-400 mt-1">
                              {applyAverageClause && isUnderInsured ? (
                                <span>Formula: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">(₹{sumInsured}L / ₹{stockValue}L) × ₹{actualLoss}L = ₹{calculatedIndemnityPayout}L</code></span>
                              ) : (
                                <span>Formula: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">Min(Loss: ₹{actualLoss}L, Sum Insured: ₹{sumInsured}L)</code></span>
                              )}
                            </p>
                          </div>

                          <div className="text-right">
                            {isUnderInsured && applyAverageClause && (
                              <span className="text-xs text-rose-400 block mb-1">
                                Self-Insured Penalty: ₹{(actualLoss - calculatedIndemnityPayout).toFixed(2)} Lakh borne by owner
                              </span>
                            )}
                            <span className="text-xs text-slate-400">Castellain v Preston (1883)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ────────────────── LAB 3: CAUSA PROXIMA MULTI-LINK CHAIN ────────────���───── */}
                  {currentSlide === 2 && (
                    <div className="space-y-6">
                      <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Multi-Link Causation Chain Lab</span>
                          <span className="text-xs text-slate-400">Hamilton v. Pandorf (1887) Case Study</span>
                        </div>
                        <p className="text-xs text-slate-300">
                          Click each link in the disaster sequence below to classify whether it is an Excluded Remote Cause, an Active Dominant Proximate Cause, or Resulting Consequential Damage:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          {[
                            { step: 1, title: 'Step 1: Rats Gnaw Pipe', type: 'Remote Cause', status: 'Excluded Peril', desc: 'Rats bite a lead water pipe on the ship during voyage.' },
                            { step: 2, title: 'Step 2: Seawater Inundation', type: 'PROXIMATE CAUSE', status: 'Peril of the Sea (Insured)', desc: 'High-pressure sea brine rushes directly into cargo hold.' },
                            { step: 3, title: 'Step 3: Rice Sacks Soaked', type: 'Direct Physical Agent', status: 'Immediate Impact', desc: '4,000 bags of basmati rice become submerged in saltwater.' },
                            { step: 4, title: 'Step 4: Grain Rot & Loss', type: 'Resulting Loss', status: 'Indemnifiable Damage', desc: '₹70 Lakh consignment ruined and declared total commercial loss.' },
                          ].map((item) => (
                            <motion.div
                              key={item.step}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setActiveCauseStep(item.step);
                                audioManager.play('tap');
                              }}
                              className={`p-4 rounded-xl cursor-pointer border transition-all ${
                                activeCauseStep === item.step
                                  ? 'bg-indigo-950/90 border-indigo-500 ring-2 ring-indigo-400/30'
                                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <span className="text-xs font-bold text-indigo-400 block mb-1">Link #{item.step}</span>
                              <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block mb-2 ${
                                item.step === 2
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                  : 'bg-slate-800 text-slate-300'
                              }`}>
                                {item.type}
                              </span>
                              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                          ))}
                        </div>

                        {activeCauseStep !== null && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-800 text-xs text-indigo-200 leading-relaxed">
                            <span className="font-bold text-white">Judicial Ruling Breakdown: </span>
                            In <em>Hamilton, Fraser & Co v. Pandorf (1887)</em>, the House of Lords held that the active, efficient, proximate cause was the incursion of sea water, which is a Peril of the Sea. The rat bites were a remote cause. Therefore, the claim was fully admitted despite the policy excluding vermin damage!
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ─────────────��──── LAB 4: RE-INSURANCE & RETROCESSION ARCHITECTURE ────────────────── */}
                  {currentSlide === 3 && (
                    <div className="space-y-6">
                      {/* Integrated SVG Diagram 3 */}
                      <ReinsuranceLayeringSvgDiagram
                        retention={retentionPct}
                        gicReShare={gicReSharePct}
                        retrocession={globalRetrocessionPct}
                      />

                      <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                            <label className="text-xs text-slate-400 block mb-1">Direct Insurer Net Retention Limit (%)</label>
                            <span className="text-xl font-bold text-blue-400 mb-2 block">{retentionPct}% (₹{10 * retentionPct} Crore)</span>
                            <input
                              type="range"
                              min={10}
                              max={60}
                              value={retentionPct}
                              onChange={(e) => {
                                setRetentionPct(Number(e.target.value));
                                audioManager.play('count');
                              }}
                              aria-label="Direct insurer retention slider"
                              className="w-full accent-blue-500"
                            />
                          </div>

                          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                            <label className="text-xs text-slate-400 block mb-1">GIC Re Statutory Cession (%)</label>
                            <span className="text-xl font-bold text-emerald-400 mb-2 block">{gicReSharePct}% (₹{10 * gicReSharePct} Crore)</span>
                            <input
                              type="range"
                              min={10}
                              max={60}
                              value={gicReSharePct}
                              onChange={(e) => {
                                setGicReSharePct(Number(e.target.value));
                                audioManager.play('count');
                              }}
                              aria-label="GIC Re Cession slider"
                              className="w-full accent-emerald-500"
                            />
                          </div>
                        </div>

                        {/* Catastrophe Claim Stress Test Result */}
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                          <div>
                            <span className="text-xs text-slate-400 uppercase font-bold block">₹500 Crore Cyclone Claim Settlement Split</span>
                            <div className="flex gap-4 mt-1 text-xs">
                              <span className="text-blue-400 font-bold">Cedant: ₹{(500 * (retentionPct / 100)).toFixed(1)} Cr</span>
                              <span className="text-emerald-400 font-bold">GIC Re: ₹{(500 * (gicReSharePct / 100)).toFixed(1)} Cr</span>
                              <span className="text-purple-400 font-bold">Retrocession: ₹{(500 * (globalRetrocessionPct / 100)).toFixed(1)} Cr</span>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400">IRDAI (Re-insurance) Regulations 2018</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ────────────────── LAB 5: MULTI-LINE CORPORATE PORTFOLIO BUILDER ────────────────── */}
                  {currentSlide === 4 && (
                    <div className="space-y-6">
                      <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Multi-Line Asset Binding Lab</span>
                          <span className="text-xs text-slate-400">ISC Class 11 Corporate Taxonomy</span>
                        </div>
                        <p className="text-xs text-slate-300">
                          Click each corporate asset to bind its mandatory statutory policy and identify whether Indemnity or Assurance applies:
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            { id: 'trucks', label: '2,500 Delivery Trucks', policy: 'Motor (TP Compulsory + OD)', nature: 'Indemnity', statute: 'MV Act 1988 s.146' },
                            { id: 'cargo', label: 'Export Steel Coils', policy: 'Marine Cargo (Transit)', nature: 'Indemnity', statute: 'Marine Ins. Act 1963' },
                            { id: 'plant', label: 'Pune Godown & Inventory', policy: 'Bharat Griha / Fire', nature: 'Indemnity', statute: 'Insurance Act 1938' },
                            { id: 'cashier', label: 'Treasury & Accounts Staff', policy: 'Fidelity Guarantee Policy', nature: 'Indemnity', statute: 'Contract Act 1872' },
                            { id: 'cto', label: 'Chief Technology Officer', policy: 'Key-Person Assurance', nature: 'Assurance (Pure)', statute: 'Dalby Case (1854)' },
                            { id: 'factory_workers', label: '10,000 Contract Labourers', policy: 'PM-JAY / ESI Healthcare', nature: 'Social Insurance', statute: 'ESI Act 1948' },
                          ].map((asset) => (
                            <motion.button
                              key={asset.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setSelectedAsset(asset.id);
                                setPortfolioCoverage(prev => ({ ...prev, [asset.id]: asset.policy }));
                                audioManager.play('drop-correct');
                              }}
                              className={`p-3.5 rounded-xl text-left border transition-all ${
                                portfolioCoverage[asset.id]
                                  ? 'bg-indigo-950/80 border-indigo-500 ring-1 ring-indigo-400/30'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <span className="text-xs font-bold text-white block mb-1">{asset.label}</span>
                              <span className="text-[11px] text-emerald-400 block mb-0.5">Policy: {asset.policy}</span>
                              <div className="flex justify-between items-center text-[9px] text-slate-500 pt-1">
                                <span>{asset.nature}</span>
                                <span>{asset.statute}</span>
                              </div>
                            </motion.button>
                          ))}
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
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('whoosh');
                  }}
                  disabled={currentSlide === 0}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-sm rounded-xl font-medium border border-slate-700"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-xl font-bold shadow-lg"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-xl font-bold shadow-lg"
                  >
                    Open Sandbox Risk Deck →
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              PHASE 3: UNGRADED SANDBOX FREE PLAY
             ═══════��══════════════════════════════════════════════════ */}
          {phase === 'sandbox' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
              <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">🧪 Sandbox Free Simulation Deck</h3>
                    <p className="text-xs text-slate-400">Stress-test any variable combinations without score penalty before entering graded challenges.</p>
                  </div>
                  <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-700 px-3 py-1 rounded-full font-semibold">
                    Ungraded Free Play
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 block mb-1">Stock Value: ₹{stockValue}L</label>
                    <input
                      type="range"
                      min={20}
                      max={200}
                      value={stockValue}
                      onChange={(e) => setStockValue(Number(e.target.value))}
                      aria-label="Sandbox stock slider"
                      className="w-full accent-blue-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 block mb-1">Sum Insured: ₹{sumInsured}L</label>
                    <input
                      type="range"
                      min={10}
                      max={250}
                      value={sumInsured}
                      onChange={(e) => setSumInsured(Number(e.target.value))}
                      aria-label="Sandbox sum insured slider"
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 block mb-1">Fire Damage: ₹{actualLoss}L</label>
                    <input
                      type="range"
                      min={0}
                      max={stockValue}
                      value={actualLoss}
                      onChange={(e) => setActualLoss(Number(e.target.value))}
                      aria-label="Sandbox damage slider"
                      className="w-full accent-rose-500"
                    />
                  </div>
                </div>

                <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block">Calculated Claim Indemnity Payout:</span>
                    <span className="text-2xl font-bold text-emerald-400">₹{calculatedIndemnityPayout} Lakh</span>
                  </div>
                  <span className="text-xs text-slate-400 max-w-sm text-right">
                    Under the Principle of Indemnity, payouts never exceed the actual financial loss of ₹{actualLoss} Lakh.
                  </span>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToChallenge}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold shadow-lg"
                  >
                    Enter Graded Challenges →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════���═════════════════════════════════════════
              PHASE 4: GRADED CHALLENGE SUITE (NEP 2020 Aligned)
             ══════════════════════════════════════════════════════════ */}
          {phase === 'challenge' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
              {/* Challenge Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">
                    Challenge {currentChallenge + 1} of {filteredChallenges.length}
                  </span>
                  <span className="text-xs text-slate-400">
                    NEP 2020 Competency: <span className="text-slate-200 capitalize font-medium">{challenge.competencyLevel}</span>
                    {challenge.statuteRef && <span className="ml-2 text-emerald-400">({challenge.statuteRef})</span>}
                  </span>
                </div>

                <div className="w-full md:w-64">
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                      animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Challenge Card with Shake & Flash on Error */}
              <motion.div
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-6 rounded-2xl border transition-colors ${
                  wrongFlash
                    ? 'bg-rose-950/70 border-rose-600'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                {challenge.scenarioSnippet && (
                  <div className="mb-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-indigo-300">
                    <span className="font-bold text-indigo-400">Case Scenario: </span>{challenge.scenarioSnippet}
                  </div>
                )}

                <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">{challenge.question}</h3>

                {/* MCQ Mode */}
                {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                  <div className="space-y-3">
                    {challenge.options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(idx)}
                        disabled={answerRevealed || showExplanation}
                        aria-label={`Select option: ${opt}`}
                        className={`w-full text-left p-4 rounded-xl text-sm border transition-all ${
                          showExplanation && idx === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium shadow-md'
                            : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Drag-Label Mode */}
                {challenge.type === 'drag-label' && challenge.dragItems && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                      {challenge.dragItems.map((item, idx) => (
                        <motion.div
                          key={idx}
                          draggable
                          onDragStart={() => handleDragStart(item.label)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          role="button"
                          aria-label={`Draggable label: ${item.label}`}
                          className="px-3.5 py-2 bg-indigo-700 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                        >
                          {item.label}
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { id: 'box_consideration', title: 'Consideration Paid by Insured (s.2(d))' },
                        { id: 'box_max_payout', title: 'Maximum Ceiling on Claim Payout' },
                        { id: 'box_risk_event', title: 'Specified Risk Event (e.g. Fire)' },
                        { id: 'box_document', title: 'Written Evidentiary Contract Policy' },
                      ].map((target) => (
                        <div
                          key={target.id}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDragDrop(target.id)}
                          className={`p-4 rounded-xl border-2 border-dashed min-h-[70px] flex items-center justify-between ${
                            droppedLabels[target.id] ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-950 border-slate-700'
                          }`}
                        >
                          <span className="text-xs text-slate-400">{target.title}</span>
                          <span className="text-xs font-bold text-emerald-300">
                            {droppedLabels[target.id] || 'Drop Label Here'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(droppedLabels)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                    >
                      Verify Legal Mappings
                    </motion.button>
                  </div>
                )}

                {/* Drag-Sort Mode */}
                {challenge.type === 'drag-sort' && challenge.sortItems && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">Drag or reorder steps in chronological sequence:</p>
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map(idx => challenge.sortItems![idx])
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
                        whileTap={{ scale: 0.99 }}
                        className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                      >
                        <span className="h-6 w-6 rounded-full bg-indigo-900 text-indigo-300 flex items-center justify-center font-bold">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </motion.div>
                    ))}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                        handleAnswer(answer);
                      }}
                      disabled={showExplanation}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                    >
                      Validate Sequence
                    </motion.button>
                  </div>
                )}

                {/* Numeric Input Mode */}
                {challenge.type === 'numeric' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 max-w-md">
                      <input
                        type="number"
                        value={numericInput}
                        onChange={(e) => setNumericInput(e.target.value)}
                        placeholder="Enter numerical value..."
                        aria-label="Numeric answer input"
                        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                      />
                      <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">{challenge.unit}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(numericInput)}
                        disabled={showExplanation || !numericInput}
                        className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
                      >
                        Submit
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Formula Construction Mode */}
                {challenge.type === 'construct' && challenge.availableParts && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                    <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                      {challenge.availableParts.map((part, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setConstructParts(prev => [...prev, part])}
                          className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white text-xs rounded-lg font-medium"
                        >
                          + {part}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                      {constructParts.map((part, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="px-2.5 py-1 bg-indigo-900 text-indigo-200 rounded-lg text-xs font-mono flex items-center gap-1.5 border border-indigo-700"
                        >
                          {part}
                          <button
                            onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                            className="text-rose-400 hover:text-rose-300 ml-1"
                          >
                            ✕
                          </button>
                        </motion.span>
                      ))}
                      {constructParts.length === 0 && (
                        <span className="text-xs text-slate-500">Click formula blocks above to assemble the equation...</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(constructParts.join(' '))}
                        disabled={constructParts.length === 0 || showExplanation}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
                      >
                        Validate Formula
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts([])}
                        className="px-4 py-2.5 bg-slate-800 text-slate-400 text-xs rounded-xl"
                      >
                        Clear
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Step-by-Step Explanation Breakdown */}
                {showExplanation && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <span>📖</span>
                      <span>ISC Class 11 Examination Adjudication</span>
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
                            className="text-amber-200/90 text-xs leading-relaxed"
                          >
                            <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}
                            {!sentence.endsWith('.') && '.'}
                          </motion.p>
                        ))}
                    </div>

                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow"
                      >
                        Show Next Analytical Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise & Review Portfolio →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              PHASE 5: MASTERY COMPLETION & REFLECTION
             ═════════════��════════════════════════════════════════════ */}
          {phase === 'complete' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
              {/* Executive Milestone Score Banner */}
              <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800 text-center space-y-3">
                <span className="text-4xl">🏆</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Chief Risk Officer Capstone Mastered!</h2>
                <p className="text-slate-300 text-sm max-w-lg mx-auto">
                  Final Assessed Score: <span className="font-bold text-emerald-400">{Math.max(0, 100 - errors * 3)}%</span> • Mastery Tier: <span className="font-bold text-indigo-400 capitalize">{masteryLevel}</span>
                </p>

                <div className="p-4 bg-emerald-950/50 rounded-xl border border-emerald-800/80 max-w-xl mx-auto text-xs text-emerald-300 leading-relaxed">
                  {errors === 0
                    ? 'PERFECT SCORE! Flawless command of Indian insurance jurisprudence, IRDAI regulations, and reinsurance mechanics.'
                    : errors <= 3
                    ? 'EXCELLENT PERFORMANCE! High analytical capability in applying indemnity, contribution, and average clause formulas.'
                    : 'GOOD EFFORT! Review the targeted misconceptions below to polish your ISC exam answers.'}
                </div>
              </div>

              {/* Misconception Diagnostic Breakdown */}
              {hitMisconceptions.length > 0 && (
                <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
                  <h3 className="text-rose-300 font-bold text-sm flex items-center gap-2">
                    <span>⚠️</span>
                    <span>Targeted Diagnostic Remediation Profile</span>
                  </h3>
                  <p className="text-xs text-slate-400">Personalised corrections based on your challenge responses:</p>
                  <div className="space-y-2">
                    {hitMisconceptions.map((idx, i) => {
                      const m = misconceptions?.[idx];
                      if (!m) return null;
                      return (
                        <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 text-xs">
                          <p className="text-rose-300 font-bold mb-1">❌ Fallacy: {m.misconception}</p>
                          <p className="text-emerald-300">✓ Statutory Reality: {m.correction}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Spaced Repetition Protocol Schedule */}
              <div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-800/50 flex items-center justify-between">
                <div>
                  <h4 className="text-amber-300 font-bold text-sm">Spaced Repetition Schedule (SM-2 Algorithm)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Next memory retention review in: <span className="text-amber-400 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>
                  </p>
                </div>
                <span className="text-2xl">📅</span>
              </div>

              {/* Real World Executive Memorandum */}
              <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
                  <span>💼</span>
                  <span>{REAL_WORLD_ACTIVITY.title}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
                <div className="space-y-2">
                  {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* ────────────────── OVERLAYS & SOUND BUBBLES ────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Enterprise Risk Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BusinessStudiesInsuranceMeaningFeaturesSim;
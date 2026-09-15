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

// ─── NAMED NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C10_COMMSTUD_031 = 'c10_commstud_031';
const NODE_C10_COMMSTUD_032 = 'c10_commstud_032';
const NODE_C10_COMMSTUD_033 = 'c10_commstud_033';
const NODE_C10_COMMSTUD_034 = 'c10_commstud_034';
const NODE_C10_COMMSTUD_035 = 'c10_commstud_035';
const NODE_C10_COMMSTUD_036 = 'c10_commstud_036';
const NODE_C10_COMMSTUD_037 = 'c10_commstud_037';
const NODE_C10_COMMSTUD_038 = 'c10_commstud_038';
const NODE_C10_COMMSTUD_039 = 'c10_commstud_039';
const NODE_C10_COMMSTUD_040 = 'c10_commstud_040';

const ALL_NODE_IDS = [
  NODE_C10_COMMSTUD_031,
  NODE_C10_COMMSTUD_032,
  NODE_C10_COMMSTUD_033,
  NODE_C10_COMMSTUD_034,
  NODE_C10_COMMSTUD_035,
  NODE_C10_COMMSTUD_036,
  NODE_C10_COMMSTUD_037,
  NODE_C10_COMMSTUD_038,
  NODE_C10_COMMSTUD_039,
  NODE_C10_COMMSTUD_040,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Bharat Mega-Enterprise Operations & Industrial Crisis',
  intro:
    'You are the newly appointed Chief Operations & Commercial Officer of Bharat Dynamic Industries Ltd. (a diversified Indian conglomerate with manufacturing plants, nationwide logistics, import-export depots, and banking operations). A major dispute has erupted at your Pune auto plant, your supply chain across NH-48 and DFC is stalling, and monetary shifts by the RBI are impacting your working capital loans.',
  context:
    'You must resolve labour relations, calculate statutory employee security, configure multimodal transportation and warehousing, ensure risk coverage under insurance principles, optimise supply chain logistics, and navigate central banking operations.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'A dispute over shift extensions erupts at your Pune plant. The plant manager locks the main gates, while workers begin an indefinite demonstration. What is the fundamental legal distinction between their actions under the Industrial Relations Code 2020?',
  options: [
    'Lockout is initiated by the employer; strike is initiated by workers.',
    'Both terms refer to the identical action, initiated by the trade union.',
    'Strike is illegal by default; lockout is completely unrestricted.',
    'Lockout involves government intervention; strike involves commercial banks.',
  ],
  correctIndex: 0,
  hintAfter:
    "Don't worry if this felt tricky! Industrial relations is a tripartite system balancing employers, employees, and the government.",
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

// ─── 22 CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c10_commstud_031)
  {
    id: 'ch_ir_01',
    nodeId: NODE_C10_COMMSTUD_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Industrial Relations in India is legally defined as a tripartite relationship. Which three entities constitute this relationship?',
    options: [
      'Employers, Employees (through Trade Unions), and the Government',
      'Shareholders, Suppliers, and Customers',
      'Commercial Banks, Central Bank, and Borrowers',
      'Supervisors, Factory Inspectors, and Municipal Corporations',
    ],
    correctIndex: 0,
    explanation:
      'Industrial relations is tripartite because it involves employers seeking productivity, employees seeking fair terms through trade unions, and the government providing legislative framework and conciliation machinery.',
    hints: [
      'Think beyond a single worker and supervisor.',
      'A neutral regulatory body enacts the labour codes and appoints conciliation officers.',
      'The three pillars are the company owners/managers, the workforce representatives, and the State.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c10_commstud_032)
  {
    id: 'ch_tu_02',
    nodeId: NODE_C10_COMMSTUD_032,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Which of the following correctly distinguishes a Trade Union from a Trade Association?',
    options: [
      'A Trade Union is formed by workers to protect labour interests; a Trade Association is formed by employers to protect business interests.',
      'A Trade Union is managed by the RBI; a Trade Association is managed by the EPFO.',
      'A Trade Union provides general insurance; a Trade Association provides life insurance.',
      'A Trade Union is always an arm of the government; a Trade Association is completely voluntary.',
    ],
    correctIndex: 0,
    explanation:
      'Trade unions (e.g., INTUC, BMS, AITUC) represent workers at the bargaining table, while trade associations (e.g., FICCI, CII, ASSOCHAM) represent business owners and employers.',
    hints: [
      'Look at who forms each organisation and whose voice they represent.',
      'FICCI represents employers; BMS represents employees.',
      'They sit on opposite sides of collective bargaining.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Numeric (c10_commstud_033)
  {
    id: 'ch_ss_03',
    nodeId: NODE_C10_COMMSTUD_033,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'Under the Payment of Gratuity Act 1972, what is the mandatory divisor used to calculate daily wage rate from monthly basic wages?',
    correctAnswer: 26,
    tolerance: 0,
    unit: 'working days',
    explanation:
      'The statutory divisor is 26 working days per month (excluding 4 Sundays), ensuring calculation reflects working-day wage rates rather than calendar days.',
    hints: [
      'It represents the standard number of working days in a month (excluding weekly holidays).',
      'It is not 30 or 31 calendar days.',
      '6 days per week for 4.33 weeks yields 26.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Classify (c10_commstud_034)
  {
    id: 'ch_tr_04',
    nodeId: NODE_C10_COMMSTUD_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Which transportation mode creates direct "door-to-door" place utility without requiring intermediate transhipment at terminals or railheads?',
    options: [
      'Road Transport',
      'Rail Transport',
      'Air Cargo',
      'Coastal Shipping',
    ],
    correctIndex: 0,
    explanation:
      'Road transport provides direct point-to-point and door-to-door connectivity, eliminating the time and handling costs of multi-stage transhipment.',
    hints: [
      'Consider which vehicle can load directly at a factory dock and unload directly at a shop.',
      'Trains and ships require goods sheds, sidings, or container freight stations.',
      'Motor trucks and vans use the national highway and arterial road network.',
    ],
  },
  // 5. Foundation - Drag-Label (c10_commstud_035)
  {
    id: 'ch_wh_05',
    nodeId: NODE_C10_COMMSTUD_035,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag each warehouse type to its defining regulatory and ownership description.',
    dragItems: [
      { label: 'Public Warehouse', targetId: 'box_pub' },
      { label: 'Private Warehouse', targetId: 'box_priv' },
      { label: 'Bonded Warehouse', targetId: 'box_bond' },
    ],
    correctMapping: {
      box_pub: 'Public Warehouse',
      box_priv: 'Private Warehouse',
      box_bond: 'Bonded Warehouse',
    },
    explanation:
      'Public warehouses (CWC) offer rented storage to any trader; Private warehouses offer exclusive company storage; Bonded warehouses hold imported cargo with deferred customs duty.',
    hints: [
      'Bonded warehouses are regulated by customs under the Customs Act 1962.',
      'CWC is an example of an open shared facility.',
      'A single manufacturer owns or leases a private facility exclusively.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Match (c10_commstud_036)
  {
    id: 'ch_ins_06',
    nodeId: NODE_C10_COMMSTUD_036,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which statutory regulatory authority regulates all life and general insurance companies in India under the IRDA Act 1999?',
    options: [
      'IRDAI (Insurance Regulatory and Development Authority of India)',
      'RBI (Reserve Bank of India)',
      'SEBI (Securities and Exchange Board of India)',
      'EPFO (Employees Provident Fund Organisation)',
    ],
    correctIndex: 0,
    explanation:
      'IRDAI is the statutory body regulating insurers, fixing solvency margins, and safeguarding policyholder interests.',
    hints: [
      'RBI regulates banking; SEBI regulates stock markets.',
      'The acronym directly references Insurance Regulatory and Development Authority.',
      'It was established under the 1999 Act.',
    ],
  },
  // 7. Foundation - Classify (c10_commstud_037)
  {
    id: 'ch_inst_07',
    nodeId: NODE_C10_COMMSTUD_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Under the Insurance Act 1938, why is Health Insurance classified as General Insurance rather than Life Insurance?',
    options: [
      'It covers an uncertain event (hospitalisation) and operates as pure indemnity with no savings or maturity payout.',
      'It is issued exclusively by commercial banks rather than LIC.',
      'It provides double the sum assured in the event of accidental death.',
      'It is only purchased by corporate employers for directors.',
    ],
    correctIndex: 0,
    explanation:
      'Health insurance covers uncertain hospitalisation expenses and reimburses actual incurred bills (indemnity) without any maturity savings benefit.',
    hints: [
      'Is getting hospitalised guaranteed to happen to every person at a set date?',
      'If you do not fall ill during the policy year, do you get a maturity bonus back in general insurance?',
      'Life insurance covers certain death; general insurance covers uncertain contingencies.',
    ],
    misconceptionIndex: 4,
  },
  // 8. Standard - Application (c10_commstud_038)
  {
    id: 'ch_pr_08',
    nodeId: NODE_C10_COMMSTUD_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A merchant insures a godown worth ₹40 lakh with New India Assurance for ₹20 lakh and Oriental Insurance for ₹20 lakh. A fire causes ₹10 lakh in damage. Under the principle of Contribution, what is the liability of New India Assurance?',
    options: [
      '₹5 lakh (proportional share: 20L/40L × ₹10L)',
      '₹10 lakh (full loss recovered from one insurer)',
      '₹20 lakh (full policy sum assured)',
      '₹0 (the merchant must bear it as co-insurer)',
    ],
    correctIndex: 0,
    explanation:
      'Under the principle of Contribution (a corollary of Indemnity), multiple insurers share the actual loss proportionally based on their sum assured: (20L / 40L) × 10L = ₹5 lakh each.',
    hints: [
      'The total loss is ₹10 lakh. Can the insured collect more than ₹10 lakh in total?',
      'Both insurers hold equal ₹20 lakh shares of the ₹40 lakh total cover.',
      'Each insurer pays 50% of the actual ₹10 lakh loss.',
    ],
    misconceptionIndex: 5,
  },
  // 9. Standard - Drag-Sort (c10_commstud_039)
  {
    id: 'ch_log_09',
    nodeId: NODE_C10_COMMSTUD_039,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange the logistics flows in their chronological supply-chain sequence from raw material acquisition to after-sales return.',
    sortItems: [
      'Inbound Logistics: Raw materials transported from suppliers to factory warehouse',
      'Manufacturing & Internal Processing: Assembly of finished goods',
      'Outbound Logistics: Finished inventory distributed through hubs to retail customers',
      'Reverse Logistics: Defective or end-of-life products returned from customers for repair/recycling',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Supply chain flow moves from supplier inward (Inbound) → production → outward to customer (Outbound) → and back upstream upon return or recycle (Reverse).',
    hints: [
      'Goods must arrive from suppliers before they can be manufactured.',
      'Finished goods are dispatched to consumers before any customer returns occur.',
      'Reverse logistics is the final downstream-to-upstream recovery loop.',
    ],
    misconceptionIndex: 6,
  },
  // 10. Standard - Distinguish (c10_commstud_040)
  {
    id: 'ch_rb_10',
    nodeId: NODE_C10_COMMSTUD_040,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Which statement accurately contrasts the Reserve Bank of India (RBI) with a commercial bank like the State Bank of India (SBI)?',
    options: [
      'RBI is the apex regulator dealing only with governments and banks; SBI is a commercial entity accepting public deposits and lending to citizens.',
      'RBI provides retail savings accounts at 4% interest; SBI issues all currency notes of ₹500.',
      'RBI is privately owned by corporate shareholders; SBI is 100% owned by the RBI.',
      'RBI operates over 22,000 local branches; SBI operates only 30 regional offices.',
    ],
    correctIndex: 0,
    explanation:
      'RBI was nationalised on 1 Jan 1949 and functions as banker to the government and banks. It does not accept deposits from or lend to ordinary retail citizens.',
    hints: [
      'Can an individual walk into RBI Fort Mumbai to open a personal savings account?',
      'Who has the sole statutory right to issue currency notes above ₹1?',
      'SBI is the regulated commercial bank; RBI is the central regulator.',
    ],
    misconceptionIndex: 7,
  },
  // 11. Standard - Numeric (c10_commstud_033)
  {
    id: 'ch_gr_11',
    nodeId: NODE_C10_COMMSTUD_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'An engineer at Tata Motors retires after 26 years of continuous service with a last drawn monthly basic salary + DA of ₹52,000. Calculate his statutory Gratuity in rupees using the formula: (Wages / 26) × 15 × Years.',
    correctAnswer: 780000,
    tolerance: 100,
    unit: '₹',
    explanation:
      'Gratuity = (₹52,000 / 26) × 15 × 26 = ���2,000 × 15 × 26 = ₹7,80,000 (well within the statutory cap of ₹20 lakh).',
    hints: [
      'First calculate daily wage: ₹52,000 divided by 26 = ₹2,000.',
      'Multiply daily wage by 15 days = ₹30,000 per year of service.',
      'Multiply ₹30,000 by 26 years of service.',
    ],
  },
  // 12. Standard - Analysis (c10_commstud_034)
  {
    id: 'ch_mod_12',
    nodeId: NODE_C10_COMMSTUD_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Bharat Petrochemicals must transport 60,000 tonnes of bulk crude oil from the Persian Gulf to its Jamnagar refinery. Which mode is economically viable, and why?',
    options: [
      'Water Transport (Bulk Oil Tankers) — lowest cost per tonne-km and massive carrying capacity for non-urgent bulk cargo.',
      'Air Cargo — rapid overnight transit prevents oxidation of volatile hydrocarbons.',
      'Road Tanker Fleets — flexible door-to-door transit avoids port demurrage fees.',
      'Rail Container Rakes — highest speed across international oceanic borders.',
    ],
    correctIndex: 0,
    explanation:
      'Water transport offers the lowest freight cost per tonne-km and can carry 60,000+ tonnes in a single voyage over international sea lanes.',
    hints: [
      'Air freight costs 15-25 times more than the actual value of bulk crude oil.',
      'Trucks and trains cannot cross international open oceans without roll-on ships.',
      'Water transport handles over 90% of international trade volume for heavy commodities.',
    ],
  },
  // 13. Standard - Application (c10_commstud_035)
  {
    id: 'ch_whs_13',
    nodeId: NODE_C10_COMMSTUD_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'An electronics firm in Bengaluru imports 5,000 semiconductor chipsets from Taiwan. The firm wishes to defer paying the ₹2 crore customs duty until individual batches are sold. Where should the cargo be stored?',
    options: [
      'In a Customs Bonded Warehouse at Chennai Port under Sections 57-73 of the Customs Act 1962.',
      'In a CWC Public Godown under general ambient storage rules.',
      'In the company’s private retail showroom stockroom.',
      'In an unregulated agricultural cold-storage facility.',
    ],
    correctIndex: 0,
    explanation:
      'Bonded warehouses allow duty deferment under customs supervision. Duty is paid only when batches are withdrawn for domestic sale, conserving working capital.',
    hints: [
      'The key requirement is deferring customs import duty until withdrawal.',
      'Public and private domestic godowns require customs duty to be cleared before release from port.',
      'The Customs Act 1962 provides for customs-bonded warehousing.',
    ],
  },
  // 14. Standard - Evaluation (c10_commstud_031)
  {
    id: 'ch_case_14',
    nodeId: NODE_C10_COMMSTUD_031,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Contrast the Tata Motors Jamshedpur record (50+ years strike-free) with the Maruti Suzuki Manesar 2012 crisis. What is the fundamental lesson for industrial relations?',
    options: [
      'Good industrial relations relies on structured joint consultation and early dispute escalation channels, not the complete absence of grievances.',
      'Industrial peace requires the total prohibition of all trade unions in factory premises.',
      'Employers should unilaterally declare lockouts whenever worker grievances are raised.',
      'Wages should be determined exclusively by central bank repo rate adjustments.',
    ],
    correctIndex: 0,
    explanation:
      'Tata Jamshedpur maintained regular Works Councils to resolve disputes proactively. The Manesar disaster resulted from broken communication and lack of functional conciliation.',
    hints: [
      'Disagreements happen in every factory; the difference is the presence of a structured resolution process.',
      'Tata Motors uses Joint Departmental Councils meeting monthly.',
      'Structured dispute mechanisms prevent disagreements from becoming ₹750 crore strikes.',
    ],
  },
  // 15. Advanced - Construct (c10_commstud_038)
  {
    id: 'ch_prin_15',
    nodeId: NODE_C10_COMMSTUD_038,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Construct the valid sequence of insurance principles applied when an insurer pays a fire claim caused by a negligent third-party contractor, and then sues that contractor.',
    availableParts: [
      'Utmost Good Faith',
      'Insurable Interest',
      'Indemnity (Actual Loss Paid)',
      'Subrogation (Stepping into Insured Shoes)',
      'Wager Agreement',
    ],
    targetState:
      'Utmost Good Faith Insurable Interest Indemnity (Actual Loss Paid) Subrogation (Stepping into Insured Shoes)',
    validationHint:
      'Assemble the 4 valid principles in logical order: Disclosure → Financial Stake → Compensation → Recovery Right.',
    explanation:
      'Contract begins with full disclosure (Good Faith), requires property ownership (Insurable Interest), pays exact loss (Indemnity), and transfers third-party recovery rights to the insurer (Subrogation).',
    hints: [
      'Start with the disclosure principle at policy signing.',
      'Next is the financial stake in the property.',
      'After loss, the insurer indemnifies the insured, then exercises subrogation against the wrongdoer.',
    ],
  },
  // 16. Advanced - Analysis (c10_commstud_038)
  {
    id: 'ch_life_ind_16',
    nodeId: NODE_C10_COMMSTUD_038,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why does the principle of Indemnity strictly NOT apply to Life Insurance contracts?',
    options: [
      'Human life has no measurable monetary value; therefore life policies are benefit contracts paying a fixed sum assured rather than actual loss compensation.',
      'Life insurance is regulated by the Ministry of Finance instead of IRDAI.',
      'Life policies never mature while the policyholder is alive.',
      'The principle of Utmost Good Faith is exempt in all life policies.',
    ],
    correctIndex: 0,
    explanation:
      'Indemnity requires quantifiable physical loss calculation. Since human life is priceless, life insurance pays the pre-agreed Sum Assured, making it a benefit contract.',
    hints: [
      'Can you put an exact rupee bill on human life the way you do on a burnt car or damaged warehouse?',
      'Life insurance pays the sum assured agreed upon, not a repair invoice.',
      'Life insurance is a benefit contract, not an indemnity contract.',
    ],
    misconceptionIndex: 8,
  },
  // 17. Advanced - Evaluation (c10_commstud_039)
  {
    id: 'ch_nlp_17',
    nodeId: NODE_C10_COMMSTUD_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'India’s National Logistics Policy (2022) targets reducing national logistics costs from ~14% of GDP to 8%. How does this directly enhance export competitiveness for Indian manufacturers?',
    options: [
      'It narrows the delivered price gap against competitor nations whose logistics costs are only 8-9% of GDP.',
      'It eliminates the need for any transit cargo insurance under IRDAI guidelines.',
      'It allows commercial banks to issue currency notes directly to exporters.',
      'It replaces all railway freight lines with private motorways.',
    ],
    correctIndex: 0,
    explanation:
      'Lower logistics costs decrease the delivered export price of Indian merchandise, making Made-in-India products price-competitive in global markets.',
    hints: [
      'A garment costing ₹500 to manufacture costs ₹570 delivered if logistics is 14%, but only ₹540 if logistics is 8%.',
      'Think about delivered pricing in international trade.',
      'Competitor economies operate at 8-9% logistics cost.',
    ],
  },
  // 18. Advanced - Application (c10_commstud_040)
  {
    id: 'ch_cr_18',
    nodeId: NODE_C10_COMMSTUD_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'When the RBI’s Monetary Policy Committee increases the Repo Rate by 50 basis points to curb inflation, what is the direct transmission mechanism to retail borrowers?',
    options: [
      'Commercial banks borrow at higher rates from RBI, raising their Marginal Cost of Lending (MCLR), which increases retail home and car loan EMIs.',
      'The RBI directly debits 50 basis points from all citizen savings bank accounts.',
      'Commercial banks are forced to shut down rural branch operations.',
      'The Ministry of Finance cancels all one-rupee notes in circulation.',
    ],
    correctIndex: 0,
    explanation:
      'The repo rate is the rate at which RBI lends to commercial banks. When it rises, banks pass on higher borrowing costs to consumers via increased lending rates and EMIs.',
    hints: [
      'Repo rate is the benchmark lending rate from RBI to commercial banks.',
      'Commercial banks protect their interest margins by raising retail loan interest rates.',
      'Higher interest rates increase EMIs, dampening consumer credit demand.',
    ],
  },
  // 19. Advanced - Application (c10_commstud_033)
  {
    id: 'ch_epf_19',
    nodeId: NODE_C10_COMMSTUD_033,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Under statutory EPF norms, an employer contributes 12% of basic wages + DA. How is this employer contribution internally divided between EPF and the Employees’ Pension Scheme (EPS)?',
    options: [
      '8.33% to Employees’ Pension Scheme (EPS) and 3.67% to the EPF accumulation account.',
      '6% to EPS and 6% to EPF.',
      '12% entirely to EPS with zero allocation to EPF.',
      '10% to NPS Tier-1 and 2% to ESIC medical pool.',
    ],
    correctIndex: 0,
    explanation:
      'Of the employer’s 12% contribution, 8.33% goes to the EPS (monthly lifelong pension pool) and 3.67% goes into the employee’s EPF provident fund account.',
    hints: [
      'The larger share of the employer portion funds the statutory pension scheme.',
      'The employee’s full 12% goes directly to EPF.',
      'The split is 8.33% (EPS) and 3.67% (EPF).',
    ],
  },
  // 20. Advanced - Drag-Label (c10_commstud_034)
  {
    id: 'ch_dfc_20',
    nodeId: NODE_C10_COMMSTUD_034,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Match each dedicated transportation corridor project and modal initiative with its primary strategic objective.',
    dragItems: [
      { label: 'Western & Eastern DFC', targetId: 'tar_rail' },
      { label: 'Sagarmala Project', targetId: 'tar_sea' },
      { label: 'Bharatmala Pariyojana', targetId: 'tar_road' },
    ],
    correctMapping: {
      tar_rail: 'Western & Eastern DFC',
      tar_sea: 'Sagarmala Project',
      tar_road: 'Bharatmala Pariyojana',
    },
    explanation:
      'Dedicated Freight Corridors shift heavy rail container transit off passenger lines; Sagarmala enhances port-led coastal shipping; Bharatmala develops national highway corridors.',
    hints: [
      'DFC stands for Dedicated Freight Corridor (Indian Railways).',
      'Sagar refers to ocean/ports; Bharat-mala focuses on economic road corridors.',
      'Match rail, coastal shipping, and highway projects accordingly.',
    ],
  },
  // 21. Advanced - Evaluation (c10_commstud_038)
  {
    id: 'ch_sub_21',
    nodeId: NODE_C10_COMMSTUD_038,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A speeding truck destroys a warehouse wall causing ₹6 lakh damage. The insurer pays ₹6 lakh to the godown owner. Can the godown owner still sue the truck company to pocket an additional ₹6 lakh?',
    options: [
      'No — under Subrogation, the right to recover damages transfers to the insurer upon claim settlement to prevent double recovery.',
      'Yes — the owner suffered the original shock and is entitled to double compensation.',
      'Yes — provided the truck owner agrees to pay cash without receipts.',
      'No — because the truck company automatically becomes the owner of the godown.',
    ],
    correctIndex: 0,
    explanation:
      'Under Subrogation, the insurer steps into the insured’s legal shoes. The insured cannot recover twice for the same loss (Indemnity).',
    hints: [
      'Insurance aims to restore pre-loss condition, never to create double profits.',
      'The insurer paid the ₹6 lakh and now holds the legal right to sue the wrongdoer.',
      'Subrogation prevents unjust enrichment of the policyholder.',
    ],
  },
  // 22. Advanced - Analysis (c10_commstud_040)
  {
    id: 'ch_coin_22',
    nodeId: NODE_C10_COMMSTUD_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'recall',
    question:
      'Under Indian statutory monetary framework, who issues the One-Rupee Note and metallic coins, and whose signature appears on the One-Rupee Note?',
    options: [
      'Issued by Ministry of Finance (Govt. of India), signed by the Finance Secretary.',
      'Issued by RBI, signed by the RBI Governor.',
      'Issued by State Bank of India, signed by the SBI Chairman.',
      'Issued by NITI Aayog, signed by the Prime Minister.',
    ],
    correctIndex: 0,
    explanation:
      'Under the Coinage Act 2011, coins and ₹1 notes are issued by the Ministry of Finance and bear the Finance Secretary’s signature. Notes of ₹2 and above are issued by RBI under the RBI Act 1934.',
    hints: [
      'Look at a ₹1 note — it does not carry the signature of the RBI Governor.',
      'The Coinage Act 2011 governs metallic coins and the historic one-rupee paper currency.',
      'The administrative head of the Ministry of Finance signs the ₹1 note.',
    ],
  },
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Industrial Relations Tripartite Balance',
    instruction:
      'Adjust the Wage & Benefit slider and Conciliation strictness to observe the dynamic balance between Employer Profitability, Trade Union Satisfaction, and Government Industrial Peace.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_COMMSTUD_031,
  },
  {
    title: 'Lab 2: Trade Union Functions in Action',
    instruction:
      'Click each Trade Union functional pillar to see how modern federations (INTUC, BMS, AITUC) operate beyond strikes (Economic, Protective, Social, Fraternal).',
    interactionType: 'click-parts',
    nodeId: NODE_C10_COMMSTUD_032,
  },
  {
    title: 'Lab 3: Social Security & Gratuity Calculator',
    instruction:
      'Change basic salary and service years to simulate EPF (12% + 12%) and calculate statutory Gratuity with the legal divisor of 26.',
    interactionType: 'numeric-calc',
    nodeId: NODE_C10_COMMSTUD_033,
  },
  {
    title: 'Lab 4: Multimodal Transport & Logistics Cost Engine',
    instruction:
      'Switch between Road, Rail DFC, Air, and Water modes for different cargo weights and distances to observe transit time, carbon footprint, and cost per tonne-km.',
    interactionType: 'mode-selector',
    nodeId: NODE_C10_COMMSTUD_034,
  },
  {
    title: 'Lab 5: Central Bank Repo Rate & Credit Flow Matrix',
    instruction:
      'Toggle the RBI Repo Rate and observe how CRR and commercial bank lending rates transmit to corporate borrowing and inflation control.',
    interactionType: 'rbi-matrix',
    nodeId: NODE_C10_COMMSTUD_040,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS (AT LEAST 2 REQUIRED) ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If you choose Rail DFC instead of Highway Road Trucking for 500 tonnes of steel over 1,400 km, what will happen to your total freight cost?',
    options: [
      'Freight cost will drop by more than 50% due to bulk rail efficiencies.',
      'Freight cost will triple because trains require electric power.',
      'Freight cost will stay identical down to the exact rupee.',
      'Rail freight is legally prohibited for steel cargo in India.',
    ],
    correctIndex: 0,
    verifyInstruction:
      'Now select Rail DFC in the Transport Lab below to verify the real-time cost-per-tonne-km calculation!',
    nodeId: NODE_C10_COMMSTUD_034,
  },
  {
    question:
      'Predict: If the RBI increases the benchmark Repo Rate from 4.0% to 7.0%, what will happen to commercial bank lending rates (MCLR) and public borrowing demand?',
    options: [
      'Commercial bank lending rates will rise, causing borrowing demand to contract and cooling inflation.',
      'Commercial bank lending rates will drop to zero because the RBI absorbs all loan interest.',
      'Commercial banks will immediately double customer loans without interest.',
      'There is no change as commercial banks operate completely outside RBI jurisdiction.',
    ],
    correctIndex: 0,
    verifyInstruction:
      'Adjust the RBI Repo Rate slider in Lab 5 below to observe the dynamic transmission to commercial lending rates!',
    nodeId: NODE_C10_COMMSTUD_040,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What pattern do you observe when you increase basic monthly salary and service years in the Gratuity calculator?',
    observableOptions: [
      'Gratuity increases proportionally with both salary and years, capped at ₹20 lakh.',
      'Gratuity decreases as service years increase.',
      'Gratuity remains fixed at ₹15,000 regardless of parameters.',
      'Gratuity only applies if service is less than 2 years.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_COMMSTUD_033,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Industrial Operations Audit',
  description:
    'Formulate a complete commercial strategy for a newly established EV manufacturing plant in Chakan, Maharashtra.',
  steps: [
    'Establish a 10-member Joint Works Council with elected trade union representatives under the Industrial Relations Code 2020.',
    'Set up statutory EPF (12% employee + 12% employer with 8.33% EPS split) and Gratuity reserves with divisor 26.',
    'Formulate a multimodal transport plan: Rail DFC for steel & battery shipments, road trucks for local dealership distribution.',
    'Contract a Customs Bonded warehouse near Nhava Sheva (JNPT) for imported electric drive motors to defer customs duty.',
    'Insure godowns under Utmost Good Faith and Indemnity principles, and track RBI repo rate announcements to time corporate debt issues.',
  ],
};

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
  nodeId: NODE_C10_COMMSTUD_031,
  title: 'Industrial Relations, Trade Unions, Social Security, Transport, Insurance & Central Banking',
  definition:
    'A comprehensive study of industrial relations as a tripartite framework, trade union functions, social security schemes (EPF, Gratuity, NPS), transport modes, warehousing types, insurance principles, logistics classification, and the Reserve Bank of India’s apex role.',
  eli5:
    'Think of commerce like a giant nationwide machine: Industrial Relations keeps workers and managers cooperating happily, Social Security provides piggy banks for retirement, Transport & Warehousing move and store goods across the country, Insurance shields against disaster, and the RBI acts as the master referee keeping the money supply healthy.',
  misconceptions: [
    {
      misconception: 'Industrial relations is just the daily talk between a worker and their immediate supervisor.',
      correction:
        'Industrial relations is a formal tripartite system involving employers, trade unions, and the government (labour commissioners and industrial tribunals).',
    },
    {
      misconception: 'Trade unions and Trade associations are the same thing.',
      correction:
        'Trade unions represent workers demanding fair wages; trade associations (FICCI, CII) represent employers and business owners.',
    },
    {
      misconception: 'Gratuity is calculated by dividing monthly salary by 30 or 31 calendar days.',
      correction:
        'Under the Payment of Gratuity Act 1972, the statutory divisor is strictly 26 working days.',
    },
    {
      misconception: 'Bonded warehouses belong only to private companies giving a commercial bond.',
      correction:
        'Bonded warehouses are customs-licensed facilities storing imported goods where customs duty is deferred until withdrawal.',
    },
    {
      misconception: 'Health insurance is a type of Life Insurance because health relates to human life.',
      correction:
        'Health insurance covers uncertain hospitalisation and operates on pure indemnity (no maturity savings), classifying it as General Insurance.',
    },
    {
      misconception: 'If you insure property with two insurers, you can claim 100% from both and double your money.',
      correction:
        'The principle of Contribution requires insurers to share the actual loss proportionally so the insured never profits from misfortune.',
    },
    {
      misconception: 'Logistics is simply another word for transportation.',
      correction:
        'Transportation is only one component of logistics; logistics integrates transport, warehousing, insurance, inventory control, and information systems.',
    },
    {
      misconception: 'The Reserve Bank of India accepts savings deposits and gives home loans to ordinary citizens.',
      correction:
        'The RBI deals only with the government and commercial banks. It is the apex regulator, not a retail bank.',
    },
    {
      misconception: 'The principle of Indemnity applies to Life Insurance.',
      correction:
        'Human life cannot be assigned a monetary price tag; life insurance is a benefit contract that pays the contracted Sum Assured upon death or maturity.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Who are the three parties in the tripartite industrial relations framework?',
      options: [
        'Employers, Trade Unions (Workers), and the Government',
        'Consumers, Retailers, and Wholesalers',
        'Shareholders, Auditors, and SEBI',
        'Central Bank, Commercial Banks, and Borrowers',
      ],
      correctIndex: 0,
    },
    {
      question: 'What is the statutory divisor in the Payment of Gratuity formula?',
      options: ['26', '30', '31', '365'],
      correctIndex: 0,
    },
    {
      question: 'Which warehouse allows deferment of customs import duties?',
      options: ['Bonded Warehouse', 'Public Warehouse', 'Private Godown', 'Cooperative Silo'],
      correctIndex: 0,
    },
    {
      question: 'Does the principle of Indemnity apply to Life Insurance contracts?',
      options: ['No, life insurance is a benefit contract', 'Yes, always', 'Only after age 60', 'Only if approved by IRDAI'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Demonstrates complete comprehension of the 10 core commerce nodes: industrial relations tripartite mechanisms, union functions, social security calculations (EPF/Gratuity), transport trade-offs, warehouse classifications, insurance principles & categories, logistics flows, and RBI central banking mechanisms.',
};

// ─── MAIN COMPONENT ───
export function C10_CommercialStudiesIndustrialRelationsMeaningSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || {
    name: 'Commercial Studies',
    emoji: '📊',
    color: 'indigo',
  };

  // Phase State: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observation State (For multiple predictions)
  const [predictionStates, setPredictionStates] = useState<Record<number, { selected: number; verified: boolean }>>({});
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration Controls State
  // Lab 1: IR Tripartite
  const [wageOffer, setWageOffer] = useState<number>(50);
  const [conciliationRigor, setConciliationRigor] = useState<number>(50);
  // Lab 2: Union Pillar Click
  const [selectedUnionPillar, setSelectedUnionPillar] = useState<string>('economic');
  // Lab 3: Social Security Calculator
  const [calcSalary, setCalcSalary] = useState<number>(40000);
  const [calcYears, setCalcYears] = useState<number>(15);
  // Multi-representation selector for Lab 3
  const [gratuityViewMode, setGratuityViewMode] = useState<'equation' | 'breakdown' | 'visual' | 'table'>('equation');
  // Lab 4: Transport Modes
  const [selectedMode, setSelectedMode] = useState<'road' | 'rail' | 'air' | 'water'>('rail');
  const [cargoTonnage, setCargoTonnage] = useState<number>(200);
  const [cargoDistance, setCargoDistance] = useState<number>(1200);
  // Lab 5: RBI & Credit
  const [repoRate, setRepoRate] = useState<number>(6.5);
  const [crrRate, setCrrRate] = useState<number>(4.5);

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Escalating Hints & Progressive Disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Wrong feedback animation state
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Challenge Drag & Drop / Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual Banner Feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Inactivity Auto-Hint Timer
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // HTML Canvas ref for dynamic animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED LAB CALCULATIONS ───
  const irBalanceMetrics = useMemo(() => {
    const employerProfitability = Math.max(10, Math.min(100, 100 - wageOffer * 0.7 + conciliationRigor * 0.2));
    const unionSatisfaction = Math.max(10, Math.min(100, wageOffer * 0.85 + conciliationRigor * 0.15));
    const industrialPeace = Math.max(5, Math.min(100, 100 - Math.abs(wageOffer - 60) * 1.2 + conciliationRigor * 0.4));
    let strikeRisk = 'Low';
    if (industrialPeace < 50) strikeRisk = 'High (Risk of Strike/Lockout)';
    else if (industrialPeace < 75) strikeRisk = 'Moderate Tension';
    return { employerProfitability, unionSatisfaction, industrialPeace, strikeRisk };
  }, [wageOffer, conciliationRigor]);

  const socialSecurityCalc = useMemo(() => {
    const employeeEPF = calcSalary * 0.12;
    const employerTotal = calcSalary * 0.12;
    const employerEPS = calcSalary * 0.0833;
    const employerEPF = calcSalary * 0.0367;
    const dailyWageRate = calcSalary / 26;
    const rawGratuity = dailyWageRate * 15 * calcYears;
    const cappedGratuity = Math.min(2000000, Math.round(rawGratuity));
    return { employeeEPF, employerTotal, employerEPS, employerEPF, dailyWageRate: Math.round(dailyWageRate), rawGratuity: Math.round(rawGratuity), cappedGratuity };
  }, [calcSalary, calcYears]);

  const transportMetrics = useMemo(() => {
    let ratePerTonneKm = 3.8;
    let speedKmh = 45;
    let co2PerTonneKm = 62;
    if (selectedMode === 'rail') {
      ratePerTonneKm = 1.4;
      speedKmh = 65;
      co2PerTonneKm = 18;
    } else if (selectedMode === 'air') {
      ratePerTonneKm = 18.5;
      speedKmh = 600;
      co2PerTonneKm = 480;
    } else if (selectedMode === 'water') {
      ratePerTonneKm = 0.35;
      speedKmh = 25;
      co2PerTonneKm = 9;
    }
    const totalCost = Math.round(cargoTonnage * cargoDistance * ratePerTonneKm);
    const transitHours = Math.round((cargoDistance / speedKmh) * 10) / 10;
    const totalCo2Kg = Math.round((cargoTonnage * cargoDistance * co2PerTonneKm) / 1000);
    return { ratePerTonneKm, totalCost, transitHours, totalCo2Kg };
  }, [selectedMode, cargoTonnage, cargoDistance]);

  const rbiMetrics = useMemo(() => {
    const commercialLendingRate = (repoRate + 3.25).toFixed(2);
    const depositRate = (repoRate - 1.25).toFixed(2);
    const creditMultiplier = (1 / (crrRate / 100)).toFixed(1);
    let policyStance = 'Neutral';
    if (repoRate > 6.75) policyStance = 'Contractionary / Hawkish (Tackling Inflation)';
    else if (repoRate < 5.5) policyStance = 'Accommodative / Dovish (Boosting Growth)';
    return { commercialLendingRate, depositRate, creditMultiplier, policyStance };
  }, [repoRate, crrRate]);

  // ─── INITIAL LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION EFFECT ───
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

  // ─── CANVAS ANIMATION EFFECT ───
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

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(canvas.width, 20);
      ctx.stroke();

      const xPos = (frame * 3) % canvas.width;
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(xPos, 20, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(30, 20, 4, 0, Math.PI * 2);
      ctx.arc(canvas.width / 2, 20, 4, 0, Math.PI * 2);
      ctx.arc(canvas.width - 30, 20, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextHint = activeChallenge.hints[0];
        if (nextHint) {
          setCurrentHint(nextHint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Here is a hint to guide you.');
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, activeChallenge]);

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
    }
  }, [hintCount, activeChallenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(
      isCorr
        ? 'Spot on! A lockout is declared by the employer; a strike is launched by workers.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive operations labs. Manipulate each simulation to discover the concepts!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to free sandbox mode. Experiment freely with all sliders and calculators without grading!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase begins! Solve these real-world commercial scenarios.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((qIndex: number, optIndex: number) => {
    setPredictionStates((prev) => ({
      ...prev,
      [qIndex]: { selected: optIndex, verified: false },
    }));
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test it in the simulation below to check your hypothesis.');
  }, []);

  const handleVerifyPrediction = useCallback((qIndex: number) => {
    setPredictionStates((prev) => ({
      ...prev,
      [qIndex]: { ...prev[qIndex], verified: true },
    }));
    audioManager.play('success');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(
      isCorr ? 'Excellent observation! Real-time simulation confirms your insight.' : 'Observe the calculated values closely.'
    );
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the comprehensive Industrial Relations and Operations module.');
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

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant deduction.');
        setShowSparkle(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + activeChallenge.nodeId, 'mastered');
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
          speechManager.speak('Let us study the complete solution and legal rationale.');
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
    [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      if (prev.length === 0 && activeChallenge.sortItems) {
        prev = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const ans =
      sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(ans);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleUnionPillarClick = useCallback((pillar: string) => {
    setSelectedUnionPillar(pillar);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      economic: 'Collective bargaining for fair wages, Dearness Allowance (DA), and bonus increments.',
      protective: 'Defending members against unfair dismissal, arbitrary disciplinary action, and safety hazards.',
      social: 'Running member libraries, welfare crèches, sports complexes, and health dispensaries.',
      fraternal: 'Mutual aid funds, death-in-service relief grants, and distress loans for worker families.',
    };
    speechManager.speak(descriptions[pillar] || '');
  }, []);

  const handleModeChange = useCallback((mode: 'road' | 'rail' | 'air' | 'water') => {
    setSelectedMode(mode);
    audioManager.play('tap');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-800">
                ICSE Class 10 Commercial Studies
              </span>
              <span className="text-xs text-slate-400">Nodes 031–040</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-700'
                  : 'bg-indigo-950/80 text-indigo-300 border-indigo-700'
              }`}
            >
              TIER: {difficulty.toUpperCase()}
            </motion.span>
          )}

          <div className="flex gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
              <span
                key={p}
                className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-lg transition-colors ${
                  phase === p ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏭</span>
              <h2 className="text-lg font-bold text-indigo-200">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-2 font-medium">{SCENARIO.context}</p>
          </div>

          <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-md">
                CURIOSITY HOOK (UNGRADED)
              </span>
              <span className="text-xs text-slate-400">Discover through inquiry</span>
            </div>
            <p className="text-white font-medium text-base mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                      : 'bg-slate-900/90 hover:bg-indigo-950/50 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-700"
              >
                <p
                  className={`text-sm font-semibold mb-3 ${
                    discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '✓ Spot on! A lockout is declared by the employer; a strike is launched by workers.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Operations Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT LABS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {diagnosticQuestions && (
            <div className="px-4 py-2 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>📚 10 Syllabus Sub-Units Loaded</span>
              <span>Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-5 sm:p-6 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xl space-y-4"
            >
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Interactive Lab #{currentSlide + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 mt-1 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: IR TRIPARTITE SIMULATION (Node 031) WITH SVG DIAGRAM 1 ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-indigo-300">Wage & Benefit Concession Level</span>
                          <span className="text-white">{wageOffer}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={wageOffer}
                          onChange={(e) => {
                            setWageOffer(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set wage and benefit concession level"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                          <span>Low (Owner Profit Focus)</span>
                          <span>High (Worker Wage Demands)</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-emerald-300">Govt. Conciliation Officer Mediation Rigour</span>
                          <span className="text-white">{conciliationRigor}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={conciliationRigor}
                          onChange={(e) => {
                            setConciliationRigor(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set government conciliation rigor"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                          <span>Passive Mediation</span>
                          <span>Strict IR Code 2020 Compliance</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                        <p className="font-bold text-indigo-300">Legal Framework: Industrial Relations Code 2020</p>
                        <p>Amalgamates Industrial Disputes Act 1947, Trade Unions Act 1926, and Standing Orders Act 1946.</p>
                        <p className="text-amber-400">
                          Status: <span className="font-semibold">{irBalanceMetrics.strikeRisk}</span>
                        </p>
                      </div>
                    </div>

                    {/* Tripartite Visual Gauges */}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">
                        Tripartite Stakeholder Balance Matrix
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-blue-300 mb-1">
                            <span>🏢 Employer (Profit & Productivity)</span>
                            <span>{Math.round(irBalanceMetrics.employerProfitability)}%</span>
                          </div>
                          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-blue-500 rounded-full"
                              animate={{ width: `${irBalanceMetrics.employerProfitability}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-amber-300 mb-1">
                            <span>👷 Trade Union / Employees (Welfare & Wages)</span>
                            <span>{Math.round(irBalanceMetrics.unionSatisfaction)}%</span>
                          </div>
                          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-amber-500 rounded-full"
                              animate={{ width: `${irBalanceMetrics.unionSatisfaction}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-emerald-300 mb-1">
                            <span>⚖️ Government (Industrial Peace & Growth)</span>
                            <span>{Math.round(irBalanceMetrics.industrialPeace)}%</span>
                          </div>
                          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-emerald-500 rounded-full"
                              animate={{ width: `${irBalanceMetrics.industrialPeace}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Tata Jamshedpur: 50+ yrs strike-free</span>
                        <span className="text-rose-400">Maruti Manesar 2012: ₹750 Cr Loss</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG DIAGRAM 1: TOPIC-SPECIFIC TRIPARTITE INDUSTRIAL RELATIONS ARCHITECTURE */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">
                      Topic Diagram 1: Tripartite Framework Architecture (IR Code 2020)
                    </span>
                    <svg viewBox="0 0 700 220" className="w-full h-44 bg-slate-900/90 rounded-lg p-2">
                      <defs>
                        <linearGradient id="irGradGov" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id="irGradEmp" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id="irGradUnion" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#b45309" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>

                      {/* Connecting Relationship Lines */}
                      <line x1="350" y1="45" x2="160" y2="165" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
                      <line x1="350" y1="45" x2="540" y2="165" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
                      <line x1="160" y1="165" x2="540" y2="165" stroke="#ec4899" strokeWidth="2" />

                      {/* Top Node: Government */}
                      <g>
                        <circle cx="350" cy="45" r="36" fill="url(#irGradGov)" stroke="#34d399" strokeWidth="2" />
                        <text x="350" y="42" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">GOVERNMENT</text>
                        <text x="350" y="55" textAnchor="middle" fill="#d1fae5" fontSize="8">IR Code & Conciliation</text>
                      </g>

                      {/* Bottom Left Node: Employers */}
                      <g>
                        <circle cx="160" cy="165" r="36" fill="url(#irGradEmp)" stroke="#60a5fa" strokeWidth="2" />
                        <text x="160" y="162" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">EMPLOYERS</text>
                        <text x="160" y="175" textAnchor="middle" fill="#dbeafe" fontSize="8">Management / FICCI</text>
                      </g>

                      {/* Bottom Right Node: Trade Unions */}
                      <g>
                        <circle cx="540" cy="165" r="36" fill="url(#irGradUnion)" stroke="#fbbf24" strokeWidth="2" />
                        <text x="540" y="162" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">WORKFORCE</text>
                        <text x="540" y="175" textAnchor="middle" fill="#fef3c7" fontSize="8">Trade Unions (BMS/INTUC)</text>
                      </g>

                      {/* Relationship Badges */}
                      <rect x="300" y="152" width="100" height="24" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
                      <text x="350" y="168" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="bold">Collective Bargaining</text>

                      <rect x="205" y="85" width="80" height="18" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
                      <text x="245" y="97" textAnchor="middle" fill="#a7f3d0" fontSize="8">Labor Laws</text>

                      <rect x="415" y="85" width="80" height="18" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
                      <text x="455" y="97" textAnchor="middle" fill="#a7f3d0" fontSize="8">Tribunals</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: TRADE UNION FUNCTIONS (Node 032) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'economic', label: '1. Economic', icon: '💰', color: 'border-blue-500' },
                      { id: 'protective', label: '2. Protective', icon: '🛡️', color: 'border-emerald-500' },
                      { id: 'social', label: '3. Social', icon: '🏥', color: 'border-amber-500' },
                      { id: 'fraternal', label: '4. Fraternal', icon: '🤝', color: 'border-purple-500' },
                    ].map((p) => (
                      <motion.button
                        key={p.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleUnionPillarClick(p.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedUnionPillar === p.id
                            ? `bg-indigo-950/80 ${p.color} text-white shadow-lg`
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-xl block mb-1">{p.icon}</span>
                        <span className="text-xs font-bold block">{p.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 text-sm">
                    {selectedUnionPillar === 'economic' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <p className="font-bold text-blue-300">Economic Function: Collective Bargaining</p>
                        <p className="text-slate-300 text-xs">
                          Negotiating biennial wage revisions, overtime remuneration, and Dearness Allowance.
                          (e.g., Datta Samant’s Mumbai Port Union securing ₹1,000/mo hikes).
                        </p>
                      </motion.div>
                    )}
                    {selectedUnionPillar === 'protective' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <p className="font-bold text-emerald-300">Protective Function: Legal & Service Defense</p>
                        <p className="text-slate-300 text-xs">
                          Appearing in Labour Courts against wrongful termination, enforcing safety protocols, and
                          preventing illegal retrenchment under the IR Code 2020.
                        </p>
                      </motion.div>
                    )}
                    {selectedUnionPillar === 'social' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <p className="font-bold text-amber-300">Social Function: Member Welfare</p>
                        <p className="text-slate-300 text-xs">
                          Operating community reading rooms, worker recreation centres, crèches for children of factory
                          employees, and health check-up camps (e.g., Tata Workers’ Union Jamshedpur).
                        </p>
                      </motion.div>
                    )}
                    {selectedUnionPillar === 'fraternal' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <p className="font-bold text-purple-300">Fraternal Function: Mutual Aid & Solidarity</p>
                        <p className="text-slate-300 text-xs">
                          Collecting voluntary member funds to provide emergency lumpsum relief grants to families of
                          workers who die in harness or face catastrophic illness.
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-indigo-300 flex flex-wrap justify-between gap-2">
                    <span>Central Federations: INTUC (Congress), BMS (RSS - 1.7 Cr Members), AITUC (CPI - Oldest)</span>
                    <span className="font-bold text-amber-400">Distinction: Trade Union (Workers) vs FICCI/CII (Employers)</span>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: SOCIAL SECURITY & GRATUITY MULTI-REPRESENTATION (Node 033) WITH SVG DIAGRAM 2 ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Monthly Basic Salary + DA</span>
                          <span className="text-indigo-300 font-bold">₹{calcSalary.toLocaleString('en-IN')}</span>
                        </div>
                        <input
                          type="range"
                          min={15000}
                          max={150000}
                          step={5000}
                          value={calcSalary}
                          onChange={(e) => {
                            setCalcSalary(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set monthly basic salary"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Completed Continuous Service</span>
                          <span className="text-emerald-300 font-bold">{calcYears} Years</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={40}
                          step={1}
                          value={calcYears}
                          onChange={(e) => {
                            setCalcYears(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set completed years of service"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      {!observationAnswered && (
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs space-y-2">
                          <p className="font-bold text-amber-300">{OBSERVATION_QUESTIONS[0].question}</p>
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-indigo-950 border border-slate-700 text-[11px] text-slate-300 block"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        Statutory Calculations (EPF & Gratuity Act 1972)
                      </h4>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Employee EPF (12%)</span>
                          <span className="text-white font-bold">₹{socialSecurityCalc.employeeEPF.toLocaleString('en-IN')}/mo</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Employer Total (12%)</span>
                          <span className="text-white font-bold">₹{socialSecurityCalc.employerTotal.toLocaleString('en-IN')}/mo</span>
                        </div>
                        <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px]">
                          <span className="text-emerald-400 font-semibold block">→ EPS Share (8.33%):</span>
                          <span>₹{Math.round(socialSecurityCalc.employerEPS).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px]">
                          <span className="text-blue-400 font-semibold block">→ EPF Share (3.67%):</span>
                          <span>₹{Math.round(socialSecurityCalc.employerEPF).toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-indigo-950 to-slate-900 rounded-xl border border-indigo-700">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-amber-300">
                            Statutory Gratuity Pay
                          </span>
                          <span className="text-xs font-bold text-white bg-indigo-600 px-2 py-0.5 rounded">
                            Cap: ₹20 Lakh
                          </span>
                        </div>
                        <p className="text-xl font-extrabold text-white mt-1">
                          ₹{socialSecurityCalc.cappedGratuity.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Formula: (Monthly Salary ÷ 26) × 15 × Service Years
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ─── MULTI-REPRESENTATION PANEL: EQUATION VS VISUAL BREAKDOWN VS MATRIX TABLE ─── */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/60 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        Multi-Representation Mode: Statutory Gratuity Formula Dual View
                      </span>
                      <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                        {(['equation', 'breakdown', 'table'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setGratuityViewMode(mode)}
                            className={`text-[10px] uppercase font-bold px-2 py-1 rounded transition-colors ${
                              gratuityViewMode === mode ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {mode} View
                          </button>
                        ))}
                      </div>
                    </div>

                    {gratuityViewMode === 'equation' && (
                      <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-center space-y-2">
                        <p className="text-xs text-slate-400 uppercase font-semibold">Representation A: Statutory Algebraic Equation</p>
                        <div className="text-sm sm:text-base font-mono text-emerald-300 font-bold">
                          Gratuity = <span className="text-indigo-300">(Monthly Wages ÷ 26)</span> × <span className="text-amber-300">15 Days</span> × <span className="text-purple-300">Completed Years</span>
                        </div>
                        <div className="text-xs font-mono text-slate-300 pt-1">
                          = (₹{calcSalary.toLocaleString('en-IN')} ÷ 26) × 15 × {calcYears} = ₹{socialSecurityCalc.dailyWageRate.toLocaleString('en-IN')} × 15 × {calcYears} = <span className="text-amber-300 font-bold">₹{socialSecurityCalc.cappedGratuity.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    )}

                    {gratuityViewMode === 'breakdown' && (
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">1. Daily Wage Rate</span>
                          <span className="text-indigo-300 font-bold font-mono">₹{calcSalary} ÷ 26 = ₹{socialSecurityCalc.dailyWageRate}</span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">2. Annual Unit (15 Days)</span>
                          <span className="text-amber-300 font-bold font-mono">₹{socialSecurityCalc.dailyWageRate} × 15 = ₹{socialSecurityCalc.dailyWageRate * 15}</span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">3. Total {calcYears} Years</span>
                          <span className="text-emerald-300 font-bold font-mono">₹{socialSecurityCalc.cappedGratuity.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    )}

                    {gratuityViewMode === 'table' && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] text-left text-slate-300 border border-slate-800">
                          <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase font-bold">
                            <tr>
                              <th className="p-2 border-b border-slate-800">Component</th>
                              <th className="p-2 border-b border-slate-800">Statutory Rate / Divisor</th>
                              <th className="p-2 border-b border-slate-800">Computed Value</th>
                              <th className="p-2 border-b border-slate-800">Governing Act</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-slate-800/60">
                              <td className="p-2 font-medium">Daily Wage Divisor</td>
                              <td className="p-2 text-amber-300 font-bold">26 Working Days</td>
                              <td className="p-2 font-mono">₹{socialSecurityCalc.dailyWageRate} / day</td>
                              <td className="p-2 text-slate-400">Payment of Gratuity Act 1972</td>
                            </tr>
                            <tr className="border-b border-slate-800/60">
                              <td className="p-2 font-medium">Employee EPF</td>
                              <td className="p-2 text-indigo-300 font-bold">12% Basic + DA</td>
                              <td className="p-2 font-mono">₹{socialSecurityCalc.employeeEPF} / mo</td>
                              <td className="p-2 text-slate-400">EPF & MP Act 1952</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-medium">Employer Pension (EPS)</td>
                              <td className="p-2 text-emerald-300 font-bold">8.33% Basic + DA</td>
                              <td className="p-2 font-mono">₹{Math.round(socialSecurityCalc.employerEPS)} / mo</td>
                              <td className="p-2 text-slate-400">Employees' Pension Scheme 1995</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* SVG DIAGRAM 2: TOPIC-SPECIFIC SOCIAL SECURITY & GRATUITY FLOW */}
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-400 block mb-1">
                        Topic Diagram 2: Statutory Contribution & Divisor Mechanism
                      </span>
                      <svg viewBox="0 0 700 130" className="w-full h-28 bg-slate-900/90 rounded-lg p-1.5">
                        <rect x="20" y="25" width="130" height="80" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                        <text x="85" y="55" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">Monthly Wage</text>
                        <text x="85" y="75" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">₹{calcSalary}</text>

                        <line x1="150" y1="65" x2="210" y2="65" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />

                        <rect x="210" y="25" width="130" height="80" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                        <text x="275" y="55" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">Divisor: 26 Days</text>
                        <text x="275" y="75" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">₹{socialSecurityCalc.dailyWageRate}/day</text>

                        <line x1="340" y1="65" x2="400" y2="65" stroke="#34d399" strokeWidth="2" />

                        <rect x="400" y="25" width="130" height="80" rx="8" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
                        <text x="465" y="55" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">× 15 × {calcYears} Yrs</text>
                        <text x="465" y="75" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Annual Tenure</text>

                        <line x1="530" y1="65" x2="570" y2="65" stroke="#fbbf24" strokeWidth="2" />

                        <rect x="570" y="25" width="110" height="80" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                        <text x="625" y="52" textAnchor="middle" fill="#ffe4e6" fontSize="9" fontWeight="bold">Statutory Gratuity</text>
                        <text x="625" y="72" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">₹{socialSecurityCalc.cappedGratuity.toLocaleString('en-IN')}</text>
                        <text x="625" y="88" textAnchor="middle" fill="#fca5a5" fontSize="8">(Max ₹20L Cap)</text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: TRANSPORT & LOGISTICS COST ENGINE (Nodes 034 & 039) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 pt-2">
                  {!predictionStates[0]?.selected && (
                    <div className="p-4 bg-indigo-950/70 rounded-xl border border-indigo-800 text-xs space-y-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                        PREDICT-THEN-CHECK #1
                      </span>
                      <p className="font-semibold text-white text-sm">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(0, i)}
                            className="text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionStates[0]?.selected !== undefined && !predictionStates[0]?.verified && (
                    <div className="p-3 bg-emerald-950/70 rounded-xl border border-emerald-700 text-xs text-emerald-300 flex flex-wrap justify-between items-center gap-2">
                      <span>✓ {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVerifyPrediction(0)}
                        className="px-3 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold"
                      >
                        Verify Prediction #1
                      </motion.button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'road', name: 'Road (NH-48 Trucks)', icon: '🚛', rate: '₹3.8/t-km' },
                      { id: 'rail', name: 'Rail (DFC Corridors)', icon: '🚆', rate: '₹1.4/t-km' },
                      { id: 'air', name: 'Air Cargo Express', icon: '✈️', rate: '₹18.5/t-km' },
                      { id: 'water', name: 'Coastal Shipping/Sea', icon: '🚢', rate: '₹0.35/t-km' },
                    ].map((m) => (
                      <motion.button
                        key={m.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleModeChange(m.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedMode === m.id
                            ? 'bg-indigo-950 border-indigo-500 text-white shadow-lg'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{m.icon}</span>
                        <span className="text-xs font-bold block">{m.name}</span>
                        <span className="text-[10px] text-indigo-400 font-semibold">{m.rate}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block">Total Freight Cost:</span>
                      <span className="text-lg font-bold text-white">
                        ₹{transportMetrics.totalCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Estimated Transit Duration:</span>
                      <span className="text-lg font-bold text-indigo-300">
                        {transportMetrics.transitHours} Hours
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Carbon Emission Total:</span>
                      <span className="text-lg font-bold text-emerald-300">
                        {transportMetrics.totalCo2Kg.toLocaleString('en-IN')} kg CO₂
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: RBI REPO & CENTRAL BANKING MATRIX (Node 040) WITH PREDICTION #2 ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 pt-2">
                  {/* PREDICTION QUESTION #2 */}
                  {predictionStates[1]?.selected === undefined && (
                    <div className="p-4 bg-indigo-950/70 rounded-xl border border-indigo-800 text-xs space-y-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                        PREDICT-THEN-CHECK #2
                      </span>
                      <p className="font-semibold text-white text-sm">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(1, i)}
                            className="text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionStates[1]?.selected !== undefined && !predictionStates[1]?.verified && (
                    <div className="p-3 bg-emerald-950/70 rounded-xl border border-emerald-700 text-xs text-emerald-300 flex flex-wrap justify-between items-center gap-2">
                      <span>✓ {PREDICTION_QUESTIONS[1].verifyInstruction}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVerifyPrediction(1)}
                        className="px-3 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold"
                      >
                        Verify Prediction #2
                      </motion.button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-indigo-300">RBI Repo Rate (MPC Benchmark)</span>
                          <span className="text-white font-bold">{repoRate}%</span>
                        </div>
                        <input
                          type="range"
                          min={4.0}
                          max={8.5}
                          step={0.25}
                          value={repoRate}
                          onChange={(e) => {
                            setRepoRate(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set RBI repo rate"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-emerald-300">Cash Reserve Ratio (CRR under Section 42)</span>
                          <span className="text-white font-bold">{crrRate}%</span>
                        </div>
                        <input
                          type="range"
                          min={3.0}
                          max={7.0}
                          step={0.25}
                          value={crrRate}
                          onChange={(e) => {
                            setCrrRate(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set Cash Reserve Ratio"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1">
                        <p className="font-bold text-indigo-300">Policy Stance: {rbiMetrics.policyStance}</p>
                        <p className="text-slate-400">
                          Credit Creation Multiplier (1 ÷ CRR): <span className="font-bold text-white">{rbiMetrics.creditMultiplier}x</span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Transmission to Commercial Banking (SBI / Retail)
                      </h4>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                          <span className="text-slate-400">Commercial Lending Rate (MCLR + Spread):</span>
                          <span className="font-bold text-rose-400">{rbiMetrics.commercialLendingRate}%</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                          <span className="text-slate-400">Commercial Fixed Deposit Rate:</span>
                          <span className="font-bold text-emerald-400">{rbiMetrics.depositRate}%</span>
                        </div>
                      </div>

                      <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800 text-[11px] text-slate-300 space-y-1">
                        <p className="font-bold text-indigo-300">Statutory Apex Role vs Commercial:</p>
                        <p>
                          RBI issues all notes ₹2 and above; One-rupee notes & coins issued by Ministry of Finance.
                          RBI deals ONLY with Govt & Commercial Banks.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SVG DIAGRAM 3: TOPIC-SPECIFIC MONETARY POLICY TRANSMISSION */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">
                      Topic Diagram 3: RBI Monetary Policy Transmission Mechanism
                    </span>
                    <svg viewBox="0 0 700 140" className="w-full h-32 bg-slate-900/90 rounded-lg p-2">
                      <rect x="20" y="20" width="180" height="95" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="110" y="45" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">RESERVE BANK (RBI)</text>
                      <text x="110" y="65" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Repo Rate: {repoRate}%</text>
                      <text x="110" y="85" textAnchor="middle" fill="#a5b4fc" fontSize="9">CRR Reserve: {crrRate}%</text>

                      <line x1="200" y1="67" x2="260" y2="67" stroke="#818cf8" strokeWidth="2.5" />
                      <polygon points="260,67 252,62 252,72" fill="#818cf8" />

                      <rect x="260" y="20" width="180" height="95" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                      <text x="350" y="45" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">COMMERCIAL BANKS</text>
                      <text x="350" y="65" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">MCLR: {rbiMetrics.commercialLendingRate}%</text>
                      <text x="350" y="85" textAnchor="middle" fill="#6ee7b7" fontSize="9">Credit Base: {rbiMetrics.creditMultiplier}x</text>

                      <line x1="440" y1="67" x2="500" y2="67" stroke="#34d399" strokeWidth="2.5" />
                      <polygon points="500,67 492,62 492,72" fill="#34d399" />

                      <rect x="500" y="20" width="180" height="95" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                      <text x="590" y="45" textAnchor="middle" fill="#fecdd3" fontSize="11" fontWeight="bold">BORROWERS / PUBLIC</text>
                      <text x="590" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Home & Corp EMIs</text>
                      <text x="590" y="85" textAnchor="middle" fill="#fda4af" fontSize="9">Demand & Inflation Control</text>
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls for Labs */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-semibold">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-indigo-300">Commercial Operations Free Sandbox</h3>
              <p className="text-xs text-slate-400">
                Explore all sliders, calculate gratuity, simulate logistics cost trade-offs, and test RBI repo effects without grading.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
            >
              Ready for Scenarios & Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase">Interactive Gratuity Simulator</span>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Monthly Basic: ₹{calcSalary.toLocaleString('en-IN')}</span>
                  <span className="text-slate-400">Years: {calcYears}</span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={120000}
                  step={5000}
                  value={calcSalary}
                  onChange={(e) => setCalcSalary(Number(e.target.value))}
                  aria-label="Sandbox monthly salary"
                  className="w-full accent-indigo-500"
                />
                <input
                  type="range"
                  min={5}
                  max={35}
                  step={1}
                  value={calcYears}
                  onChange={(e) => setCalcYears(Number(e.target.value))}
                  aria-label="Sandbox years of service"
                  className="w-full accent-emerald-500"
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span>Gratuity Payout:</span>
                <span className="text-base font-bold text-amber-300">₹{socialSecurityCalc.cappedGratuity.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase">Multimodal Transport Optimizer</span>
              <div className="flex gap-2">
                {(['road', 'rail', 'air', 'water'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                      selectedMode === m
                        ? 'bg-emerald-950 border-emerald-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span>Total Freight Cost ({cargoTonnage}T / {cargoDistance}km):</span>
                <span className="text-base font-bold text-indigo-300">₹{transportMetrics.totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (ADAPTIVE & WITH SHAKE ANIMATION) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <canvas ref={canvasRef} width={600} height={35} className="w-full h-7 block" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              Mastery: <span className="font-bold text-indigo-400 capitalize">{masteryLevel}</span> (
              {scoreBreakdown.correct}/{scoreBreakdown.total} Correct)
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.3 }}
            className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                : 'bg-slate-800/90 border-slate-700 text-slate-100'
            }`}
          >
            <p className="text-base font-semibold text-white mb-4 leading-relaxed">
              {activeChallenge.question}
            </p>

            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Select option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : showExplanation && i !== activeChallenge.correctIndex
                          ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                          : 'bg-slate-900 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each label into the matching box below:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label ${item.label}`}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-semibold mb-1">
                        {targetId.replace('box_', '').replace('tar_', '')} Zone
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          droppedLabels[targetId] ? 'text-emerald-300' : 'text-slate-500'
                        }`}
                      >
                        {droppedLabels[targetId] || 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Drop Assignments
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block">Drag items or arrange them in proper sequence:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${idx + 1}`}
                      className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    aria-label="Numerical answer input"
                    className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 w-48"
                  />
                  <span className="text-sm font-semibold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts((prev) => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 border border-slate-700 text-indigo-300 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-indigo-900/80 border border-indigo-700 text-white rounded-md text-xs font-medium flex items-center gap-1"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 ml-1 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click parts above to assemble sequence</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold"
                >
                  Verify Principle Sequence
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Educational Solution */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 sm:p-5 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-xl border border-indigo-700/80 space-y-3"
              >
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Step-by-Step Educational Solution:
                </span>

                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-indigo-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap gap-3">
                  {revealedSteps <
                    activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Module →' : 'Next Scenario →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700 shadow-2xl text-center space-y-3">
            <span className="text-4xl block">🎓</span>
            <h2 className="text-2xl font-extrabold text-white">Module Mastery Achieved!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have mastered Industrial Relations, Trade Unions, Social Security statutory funds, Transport logistics,
              Insurance legal principles, and RBI Central Banking.
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="text-center">
                <span className="text-xs text-slate-400 block uppercase">Final Score</span>
                <span className="text-2xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="text-center">
                <span className="text-xs text-slate-400 block uppercase">Mastery Tier</span>
                <span className="text-2xl font-bold text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* ─── REQUIRED MOTIVATIONAL FEEDBACK TIERS ─── */}
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-center space-y-2">
            <div className="text-lg font-black tracking-wide text-amber-300 uppercase">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              {errors === 0
                ? 'Flawless execution! You demonstrated immaculate mastery across all ICSE commercial units.'
                : errors <= 3
                ? 'Strong command of statutory formulas, IR frameworks, and logistics trade-offs.'
                : errors <= 7
                ? 'You have built a solid foundation. Revisit challenging questions to master all statutory details.'
                : 'Keep practicing! Review the detailed steps and formula breakdowns above to conquer the concepts.'}
            </p>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY (PROMINENT SRS SCHEDULE DISPLAY) ─── */}
          <div className="p-5 bg-gradient-to-br from-indigo-950/80 to-slate-900 rounded-2xl border-2 border-indigo-500/60 shadow-xl space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🧠</span>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Spaced Repetition System (SRS) Schedule
                  </h4>
                  <p className="text-xs text-indigo-300">
                    Optimised retention intervals calculated based on your performance
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide border shadow ${
                  errors === 0
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                    : errors <= 3
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-500'
                    : 'bg-amber-950 text-amber-300 border-amber-500'
                }`}
              >
                {errors === 0
                  ? 'Review in 7 days'
                  : errors <= 3
                  ? 'Review in 3 days'
                  : 'Review in 1 day'}
              </span>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-indigo-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-400 block">Recommended Review Cadence:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {errors === 0
                    ? '🗓️ Review in 7 days (0 errors — Long-term retention)'
                    : errors <= 3
                    ? '🗓️ Review in 3 days (1–3 errors — Reinforce key statutory rules)'
                    : '🗓️ Review in 1 day (4+ errors — Urgent memory consolidation needed)'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                Next Review: {errors === 0 ? '+7 Days' : errors <= 3 ? '+3 Days' : '+1 Day'}
              </span>
            </div>
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personalised Misconception Diagnosis
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="font-semibold text-rose-300">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 space-y-2 text-xs text-slate-300">
            <h3 className="text-sm font-bold text-indigo-300">💡 Reflective Operations Analysis</h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400">
              <li>Why is the statutory gratuity divisor 26 rather than 30 calendar days?</li>
              <li>How does the Dedicated Freight Corridor (DFC) lower India’s national logistics cost?</li>
              <li>How does Subrogation protect insurers from policyholders profiting twice off the same loss?</li>
            </ul>
          </div>

          <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300">💼 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="font-bold text-indigo-400">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && (
        <SuccessBanner message="Mastery Challenge Complete!" onComplete={() => setShowSuccess(false)} />
      )}
      {showSparkle && (
        <SparkleBurst x={sparklePos.x || 300} y={sparklePos.y || 200} onComplete={() => setShowSparkle(false)} />
      )}
    </div>
  );
}

export default C10_CommercialStudiesIndustrialRelationsMeaningSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── MANDATORY NODE IDENTIFIERS ───
const NODE_C11_BS_001 = 'c11_bs_001';
const NODE_C11_BS_002 = 'c11_bs_002';
const NODE_C11_BS_003 = 'c11_bs_003';
const NODE_C11_BS_004 = 'c11_bs_004';
const NODE_C11_BS_005 = 'c11_bs_005';
const NODE_C11_BS_006 = 'c11_bs_006';
const NODE_C11_BS_007 = 'c11_bs_007';
const NODE_C11_BS_008 = 'c11_bs_008';
const NODE_C11_BS_009 = 'c11_bs_009';
const NODE_C11_BS_010 = 'c11_bs_010';

const ALL_NODE_IDS = [
  NODE_C11_BS_001,
  NODE_C11_BS_002,
  NODE_C11_BS_003,
  NODE_C11_BS_004,
  NODE_C11_BS_005,
  NODE_C11_BS_006,
  NODE_C11_BS_007,
  NODE_C11_BS_008,
  NODE_C11_BS_009,
  NODE_C11_BS_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Venture Bharat: From Street Corner to Stock Exchange',
  intro: 'Aarav and Diya are setting out on an entrepreneurial journey across India. Starting from a modest artisanal bakery in Pune, they dream of scaling into a nationwide food and logistics powerhouse. Along the way, they must navigate the 6 features of business, balance profits with mandatory CSR, choose the right industrial and commercial channels, and decide when to evolve from a Sole Proprietorship to a Partnership and ultimately a Public Joint Stock Company.',
  context: 'As their senior business architect, you will test scenarios, balance trade-offs, identify partner liabilities under the Indian Partnership Act 1932, and construct corporate structures under the Companies Act 2013.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Aarav sells his personal motorcycle for ₹65,000 to raise initial funds for his bakery. Is this single motorcycle sale legally classified as a "business activity" under ISC Business Studies?',
  options: [
    'Yes — because money was received and a capital surplus was created',
    'No — it is an isolated sale of a personal asset lacking regularity in dealings',
    'Yes — any transaction that involves high risk is a business',
    'No — only registered corporations can perform business transactions',
  ],
  correctIndex: 1,
  hintAfter: 'Don’t worry if you were unsure! Let us explore the 6 interlocking features of business to uncover why regularity is essential.',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7 items) ---
  {
    id: 'ch_001_f_recall',
    nodeId: NODE_C11_BS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 2(17) of the Income Tax Act 1961 and general business theory, which of the following is NOT one of the six essential features of business?',
    options: [
      'Regularity in dealings',
      'Guaranteed fixed return on capital',
      'Profit motive',
      'Element of risk and uncertainty',
    ],
    correctIndex: 1,
    explanation: 'Business inherently involves uncertainty of return and risk. No business can guarantee a fixed return on capital; fixed returns without risk characterise debt or fixed deposits, not enterprise.',
    hints: [
      'Recall the 6 features: Economic activity, Production/Procurement, Sale/Exchange, Regularity, Profit motive, Risk/Uncertainty.',
      'Does a shopkeeper or entrepreneur always know the exact return they will make tomorrow?',
      'A guaranteed fixed return eliminates the core element of risk and uncertainty.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_002_f_draglabel',
    nodeId: NODE_C11_BS_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the commerce aids to trade to the specific obstacle/gap each resolves.',
    dragItems: [
      { label: 'Transport', targetId: 'gap_place' },
      { label: 'Warehousing', targetId: 'gap_time' },
      { label: 'Banking', targetId: 'gap_finance' },
      { label: 'Insurance', targetId: 'gap_risk' },
    ],
    correctMapping: {
      gap_place: 'Transport',
      gap_time: 'Warehousing',
      gap_finance: 'Banking',
      gap_risk: 'Insurance',
    },
    explanation: 'Commerce bridges market hindrances: Transport removes the gap of place, Warehousing bridges the gap of time between production and demand, Banking eliminates the finance gap, and Insurance mitigates risk.',
    hints: [
      'Think about what carries goods across 2,000 kilometres from factory to city.',
      'What facility holds seasonal harvest from April until winter?',
      'Banks provide credit lines; Insurance covers transit and fire losses.',
    ],
  },
  {
    id: 'ch_003_f_recall',
    nodeId: NODE_C11_BS_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which sector of industry is directly concerned with the extraction and direct reproduction of natural resources like coal mining, agriculture, and fishing?',
    options: [
      'Primary Industry',
      'Secondary Industry',
      'Tertiary Industry',
      'Quaternary Industry',
    ],
    correctIndex: 0,
    explanation: 'Primary industry comprises extraction (mining, farming, forestry) and genetic activities (poultry, cattle breeding) that directly tap into natural resources.',
    hints: [
      'Think about the first stage of any supply chain — extracting raw materials from the earth.',
      'Coal India and Punjab wheat farming are classic examples.',
      'Primary industry extracts; Secondary manufactures; Tertiary provides services.',
    ],
  },
  {
    id: 'ch_004_f_understanding',
    nodeId: NODE_C11_BS_007,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does a Sole Proprietor face "unlimited liability" in the eyes of Indian commercial law?',
    options: [
      'Because the law limits their losses to their initial capital deposit',
      'Because there is no separate legal entity between the proprietor and the business',
      'Because the proprietor must register with the Registrar of Companies',
      'Because sole proprietorships cannot borrow money from nationalised banks',
    ],
    correctIndex: 1,
    explanation: 'A sole proprietorship has no separate legal entity. In legal proceedings, the owner and firm are one single persona. Hence, personal assets can be attached to satisfy business debts.',
    hints: [
      'Does the court distinguish between Mr. Kulkarni and Kulkarni Kirana Store?',
      'If the business owes ₹10 lakh and only has ₹2 lakh in inventory, who pays the rest?',
      'The absence of a separate legal persona exposes personal property.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_005_f_recall',
    nodeId: NODE_C11_BS_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 4 of the Indian Partnership Act 1932, what is the defining legal principle that establishes that each partner acts as both principal and agent for all other partners?',
    options: [
      'Perpetual Succession',
      'Mutual Agency',
      'Ultra Vires Doctrine',
      'Corporate Veil',
    ],
    correctIndex: 1,
    explanation: 'Mutual agency ("carried on by all or any of them acting for all") means each partner binds the firm by their acts in the ordinary course of business, acting simultaneously as principal and agent.',
    hints: [
      'Think about the phrase "acting for all".',
      'When one partner signs a supplier deal, it binds all others.',
      'The term is Mutual Agency.',
    ],
  },
  {
    id: 'ch_006_f_understanding',
    nodeId: NODE_C11_BS_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary difference in level of operation between Business Ethics and Corporate Social Responsibility (CSR)?',
    options: [
      'Business ethics is a statutory requirement, whereas CSR is purely voluntary for all firms',
      'Business ethics governs HOW a firm conducts its internal operations; CSR governs WHAT it gives back to society beyond operations',
      'Business ethics applies only to private firms, while CSR applies solely to public sector undertakings',
      'There is no distinction; they are identical legal concepts',
    ],
    correctIndex: 1,
    explanation: 'Business ethics represents moral standards governing how the firm operates internally (truthful ads, fair wages, honest accounting). CSR governs what external contributions the firm makes to society.',
    hints: [
      'Think "HOW you conduct yourself" vs "WHAT you contribute to the community".',
      'Tata refusing tobacco is an ethical decision; spending ₹267 crore on tribal hospitals is CSR.',
      'Ethics is firm-level conduct; CSR is society-level contribution.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_007_f_recall',
    nodeId: NODE_C11_BS_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which landmark 1897 English legal case established the universal doctrine of "Separate Legal Entity" for incorporated joint stock companies?',
    options: [
      'Salomon v. Salomon & Co. Ltd',
      'Carlill v. Carbolic Smoke Ball Co.',
      'Hadley v. Baxendale',
      'T.K. Palaniappa Chettiar v. M. Arunachalam',
    ],
    correctIndex: 0,
    explanation: 'Salomon v. Salomon & Co. Ltd (1897) ruled that an incorporated company is a separate artificial person distinct from its shareholders, even if one person holds 99% of shares.',
    hints: [
      'It involved a boot and leather manufacturer in England named Aron.',
      'The House of Lords affirmed that the company is not an agent of the founder.',
      'The case is Salomon v. Salomon.',
    ],
  },

  // --- STANDARD (8 items) ---
  {
    id: 'ch_008_s_numeric',
    nodeId: NODE_C11_BS_002,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Bharat Foods Ltd had an average net profit of ₹180 crore over the preceding 3 financial years. Under Section 135 of the Companies Act 2013, calculate the mandatory minimum CSR expenditure required (in ₹ crore).',
    correctAnswer: 3.6,
    tolerance: 0.1,
    unit: 'crore',
    explanation: 'Under Section 135(5) of the Companies Act 2013, qualifying companies must spend at least 2% of the average net profits of the preceding 3 financial years on CSR: 2% of ₹180 crore = ₹3.6 crore.',
    hints: [
      'What percentage of average net profit does Section 135 mandate?',
      'The statutory percentage is exactly 2%.',
      'Calculate 180 × 0.02.',
    ],
  },
  {
    id: 'ch_009_s_application',
    nodeId: NODE_C11_BS_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Anand Precision Auto has an investment in plant & machinery of ��8.5 crore and an annual turnover of ₹42 crore. Under the revised 2020 MSMED Act composite criteria, how is this enterprise classified?',
    options: [
      'Micro Enterprise (Investment ≤ ₹1 cr & Turnover ≤ ₹5 cr)',
      'Small Enterprise (Investment ≤ ₹10 cr & Turnover ≤ ₹50 cr)',
      'Medium Enterprise (Investment ≤ ₹50 cr & Turnover ≤ ₹250 cr)',
      'Large Enterprise (Exceeds medium thresholds)',
    ],
    correctIndex: 1,
    explanation: 'Under the 2020 revised MSMED composite criteria, Small Enterprise limits are: Investment ≤ ₹10 crore AND Turnover ≤ ₹50 crore. Anand Precision satisfies both (₹8.5 cr ≤ 10 cr and ₹42 cr ≤ 50 cr).',
    hints: [
      'Check both investment and turnover against the 2020 composite thresholds.',
      'Micro is 1 cr / 5 cr. Small is 10 cr / 50 cr. Medium is 50 cr / 250 cr.',
      'Both ₹8.5 cr and ₹42 cr fit within the Small Enterprise tier.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_010_s_analysis',
    nodeId: NODE_C11_BS_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Dr. Mehra invested ₹25 lakh in a diagnostic clinic partnership, receives 20% of profits, but never visits or manages the clinic. Her name appears on the firm registration. What type of partner is Dr. Mehra?',
    options: [
      'Secret Partner (Active in management, concealed from public)',
      'Sleeping / Dormant Partner (Contributes capital, shares profit, inactive in management, known to public)',
      'Nominal Partner (Contributes no capital, takes no profit, lends name)',
      'Partner in Profits Only (No losses, no capital)',
    ],
    correctIndex: 1,
    explanation: 'A sleeping (dormant) partner contributes capital and shares profits, is known to the public on the register, but takes no active part in the day-to-day management of the business.',
    hints: [
      'Did she invest capital and share profits? Yes.',
      'Does she actively manage operations? No.',
      'Known to outsiders but inactive in management = Sleeping / Dormant partner.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_011_s_application',
    nodeId: NODE_C11_BS_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Apex Traders is an unregistered partnership firm in Nagpur. A buyer defaults on an invoice of ₹8,00,000. Under Section 69 of the Indian Partnership Act 1932, what is Apex Traders’ legal position?',
    options: [
      'The firm can sue immediately in the High Court without registering',
      'The firm cannot sue the third party in court to enforce the contract until it gets registered',
      'The debt is automatically cancelled by the Registrar of Firms',
      'The partners are personally imprisoned for running an illegal firm',
    ],
    correctIndex: 1,
    explanation: 'Under Section 69, an unregistered firm cannot file a suit against a third party to enforce a contractual right. However, registration is not illegal; the firm can cure the disability by registering before filing suit.',
    hints: [
      'Remember Section 69 imposes a procedural disability on suing third parties.',
      'Registration of partnership is voluntary, but non-registration blocks civil recovery suits.',
      'The firm must register with the Registrar of Firms to acquire the right to sue.',
    ],
  },
  {
    id: 'ch_012_s_dragsort',
    nodeId: NODE_C11_BS_010,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the progression of business organisation forms in order of increasing capital-raising capability and structural complexity.',
    sortItems: [
      'Sole Proprietorship (Single owner, direct control, unlimited liability)',
      'General Partnership (2 to 50 partners, mutual agency, pooled capital)',
      'Private Limited Company (2 to 200 members, separate entity, restricted share transfer)',
      'Public Joint Stock Company (7+ members, no cap, public subscription, listed shares)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Business structures evolve from Sole Proprietorship (simplest, limited capital) → Partnership → Private Limited Company → Public Joint Stock Company (most complex, multi-thousand crore capital potential).',
    hints: [
      'Start with the single-individual form with zero statutory incorporation.',
      'Next comes 2 to 50 partners pooling funds under a deed.',
      'Private company comes before public listed corporation.',
    ],
  },
  {
    id: 'ch_013_s_analysis',
    nodeId: NODE_C11_BS_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Oil and Natural Gas Corporation (ONGC) has shares actively traded on BSE and NSE, yet it is classified as a "Public Sector Enterprise". Why?',
    options: [
      'Because any listed company is automatically in the public sector',
      'Because the Government of India holds the majority ownership stake (58.89%)',
      'Because it pays dividend taxes to the Reserve Bank of India',
      'Because it manufactures essential consumer goods',
    ],
    correctIndex: 1,
    explanation: 'The sector classification (Public vs Private) is determined by WHO owns and controls the equity. ONGC is a Public Sector Undertaking because the Government of India holds majority ownership (>51%).',
    hints: [
      'Do not confuse "publicly traded" (legal listing) with "Public Sector" (government ownership).',
      'Who owns the majority of ONGC shares?',
      'Majority state ownership defines a Public Sector Enterprise.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_014_s_application',
    nodeId: NODE_C11_BS_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Tata Motors manufactures the Nexon at its Sanand plant in Gujarat. It then ships 200 units to a dealership in London, United Kingdom. What type of trade is this transaction?',
    options: [
      'Internal Wholesale Trade',
      'External Export Trade',
      'Entrepot Trade',
      'Auxiliary Agency Trade',
    ],
    correctIndex: 1,
    explanation: 'Selling and dispatching goods produced domestically across national political borders to a foreign destination constitutes External Export Trade.',
    hints: [
      'The transaction crosses international political borders (India to UK).',
      'Goods are exiting India for foreign sale.',
      'This is external export trade.',
    ],
  },
  {
    id: 'ch_015_s_construct',
    nodeId: NODE_C11_BS_001,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the comprehensive legal definition equation of Business by selecting all mandatory elements.',
    availableParts: [
      'Economic Activity',
      'Regular Production or Exchange',
      'Profit Motive',
      'Risk & Uncertainty',
      'Statutory University Degree',
      'Philanthropic Donation',
    ],
    targetState: 'Economic Activity Regular Production or Exchange Profit Motive Risk & Uncertainty',
    validationHint: 'Select only the 4 core criteria that constitute the formal business definition.',
    explanation: 'Business = Economic Activity + Regular Production/Procurement/Exchange + Profit Motive + Risk & Uncertainty. Statutory degree is for profession, and charity is non-economic/philanthropic.',
    hints: [
      'Exclude requirements specific to professions like medicine or law.',
      'Exclude purely non-economic charitable actions.',
      'Include: Economic, Regular production/exchange, Profit, and Risk.',
    ],
  },

  // --- ADVANCED (7 items) ---
  {
    id: 'ch_016_a_application',
    nodeId: NODE_C11_BS_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Industrialist Mr. Singhania allowed his nephew’s new firm "Singhania Logistics" to display his photograph and prominent name on brochures. He contributed ₹0 capital and took 0% profit. Relying on his name, Punjab National Bank extended a ₹2 crore loan. When the firm defaulted, PNB sued Mr. Singhania. Based on Section 28 of the Partnership Act and T.K. Palaniappa Chettiar (1969), what is the verdict?',
    options: [
      'Mr. Singhania is not liable because he never signed the loan or shared profits',
      'Mr. Singhania is liable as a Partner by Estoppel / Nominal Partner under the doctrine of Holding Out',
      'PNB loses the case because only active partners are liable under Section 25',
      'The firm must be liquidated and Mr. Singhania receives compensation',
    ],
    correctIndex: 1,
    explanation: 'Under Section 28 (Holding Out / Estoppel), anyone who knowingly permits themselves to be represented as a partner is liable to creditors who advanced credit relying on that representation.',
    hints: [
      'Did Mr. Singhania knowingly allow his name and reputation to be used to induce credit?',
      'The doctrine of estoppel prevents him from denying partnership after credit was granted.',
      'He is held liable under Section 28.',
    ],
  },
  {
    id: 'ch_017_a_analysis',
    nodeId: NODE_C11_BS_007,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Ramesh runs a sole proprietorship electrical dealership. The business fails with liabilities of ₹32,00,000. The total business stock & fixtures realise ₹12,00,000. Ramesh has a personal house worth ₹45,00,000 and ₹4,00,000 personal savings. How much in total (₹ in lakhs) can the creditors legally recover from his personal assets under court execution?',
    correctAnswer: 20,
    tolerance: 0.1,
    unit: 'lakhs',
    explanation: 'Total debt = ₹32L. Business assets pay ₹12L. Remaining shortfall = ₹20L. Because liability is unlimited, creditors can attach personal savings and property up to the full remaining ₹20L.',
    hints: [
      'Compute the deficiency left after liquidating business assets: ₹32L - ₹12L.',
      'Since liability is unlimited, personal assets are fully attachable for the balance.',
      'Deficiency = ₹20 lakhs.',
    ],
  },
  {
    id: 'ch_018_a_evaluation',
    nodeId: NODE_C11_BS_005,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'PharmaTech India spends ₹40 crore annually building drinking water facilities in rural areas (Schedule VII CSR), but an investigation reveals it manipulated clinical trial data to gain drug approvals. How should its performance be evaluated in Business Studies?',
    options: [
      'The company is fully responsible because CSR expenditure offsets operational irregularities',
      'The company demonstrates Greenwashing/CSR compliance, but suffers from severe Business Ethics failure; CSR cannot legitimise unethical core operations',
      'The company is ethical because clinical trials are secondary to community drinking water',
      'The company is exempt from the Competition Act because of its CSR track record',
    ],
    correctIndex: 1,
    explanation: 'CSR and Business Ethics are distinct dimensions. Doing heavy CSR while engaging in fraud or falsification in core operations is greenwashing. Ethical failure destroys corporate legitimacy regardless of CSR spend.',
    hints: [
      'Can social charity erase criminal falsification of medical data?',
      'Ethics is HOW you run your business; CSR is WHAT you give back.',
      'It is CSR-compliant but an ethical failure.',
    ],
  },
  {
    id: 'ch_019_a_analysis',
    nodeId: NODE_C11_BS_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'CloudForge IT Solutions in Bengaluru develops cloud enterprise software and generated ₹120 crore revenue in FY23. Why is CloudForge classified as a "Tertiary Industry" and NOT a Secondary Industry?',
    options: [
      'Because software is classified as a service rather than physical manufacturing/construction',
      'Because it has fewer than 500 physical employees',
      'Because software companies are prohibited from registering under the MSMED Act',
      'Because it does not export products outside Karnataka',
    ],
    correctIndex: 0,
    explanation: 'Secondary industry involves manufacturing physical goods from raw materials or construction. IT consulting, software programming, and digital solutions are intangible services, placing them squarely in the Tertiary sector.',
    hints: [
      'Does software programming involve physical blast furnaces, fabrication, or raw material transformation into physical matter?',
      'Services = Tertiary Sector.',
      'Software is an intangible service product.',
    ],
  },
  {
    id: 'ch_020_a_evaluation',
    nodeId: NODE_C11_BS_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A state government needs to construct a 400-km high-speed expressway costing ₹24,000 crore. Why is a Public-Private Partnership (PPP / Joint Sector Concession) preferred over pure departmental government execution?',
    options: [
      'It allows the state to evade all safety regulations and environmental laws',
      'It pools private capital and managerial efficiency while sharing risks according to the Model Concession Agreement',
      'It guarantees 100% tax exemption for all road users permanently',
      'It automatically converts the road into a private company with no government oversight',
    ],
    correctIndex: 1,
    explanation: 'PPPs combine private sector capital, operational agility, and technical efficiency with public authority, distributing construction risk to private partners and regulatory/land acquisition to government.',
    hints: [
      'Think of capital constraints and operational project speed.',
      'The Model Concession Agreement allocates risk to the party best able to bear it.',
      'Private capital + efficiency + public interest = PPP advantage.',
    ],
  },
  {
    id: 'ch_021_a_creativity',
    nodeId: NODE_C11_BS_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A fast-growing fintech startup with 3 co-founders has reached ₹80 crore annual turnover and wants to raise ₹150 crore from venture capital funds and issue ESOPs to 300 engineers. Which organisation form must they adopt to enable this?',
    options: [
      'Sole Proprietorship',
      'General Partnership under the 1932 Act (Max 50 partners)',
      'Joint Stock Company (Private Limited / Public Limited under Companies Act 2013)',
      'Departmental Undertaking',
    ],
    correctIndex: 2,
    explanation: 'A Joint Stock Company provides limited liability, distinct legal personality, ability to issue shares/ESOPs to institutional investors and employees, and perpetual succession necessary for institutional scale.',
    hints: [
      'Partnerships are capped at 50 members and cannot issue equity shares or ESOPs.',
      'Sole proprietorship has only 1 owner with unlimited liability.',
      'Only an incorporated Company structure supports VC equity and ESOP issuance.',
    ],
  },
  {
    id: 'ch_022_a_evaluation',
    nodeId: NODE_C11_BS_002,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which statement accurately describes the modern Business Studies perspective on the "Role of Profit"?',
    options: [
      'Profit is the sole purpose of business; social obligations are unnecessary market distortions',
      'Profit is the indispensable means and reward for risk that funds growth, measures efficiency, and enables social/CSR commitments',
      'Profit and social responsibility are mutually exclusive opposites; a company must choose one',
      'Profit is an accounting convention with no bearing on long-term survival',
    ],
    correctIndex: 1,
    explanation: 'Profit is the bridge: it provides the reward for risk-bearing, capital for expansion, index of efficiency, and the financial surplus required to sustain employment and CSR initiatives.',
    hints: [
      'Is profit the enemy of social objectives, or the fuel that finances them?',
      'Tata Steel spent ₹267 crore on CSR because it earned ₹8,077 crore profit.',
      'Profit is the means, not the sole isolated end.',
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
  nodeId: NODE_C11_BS_001,
  title: 'Foundations of Business, Trade & Enterprise Organisation',
  definition: 'Business is a human economic activity involving the regular production, procurement, or exchange of goods and services undertaken with the primary motive of earning profit, accompanied by risk and uncertainty of return. It spans industry, commerce, ethical conduct, and evolves across structural forms from sole proprietorship to joint stock corporations.',
  eli5: 'Think of business like building a massive city. It starts with raw materials (industry), uses roads and warehouses to deliver goods (commerce), requires fair play and charity (ethics & CSR), and changes its building foundation from a single brick (sole proprietorship) to a shared blueprint (partnership) and a skyscraper owned by thousands (joint stock company).',
  misconceptions: [
    {
      misconception: 'A doctor’s private clinic is a business because it charges money and earns income.',
      correction: 'A doctor’s clinic is a profession because the reward is professional fees for specialised expertise requiring statutory qualification (MBBS/MCI), not profit from trade of goods.',
    },
    {
      misconception: 'A one-time sale of personal property (like an old car) is a business transaction.',
      correction: 'An isolated sale lacks "regularity in dealings". Regularity is a mandatory interlocking feature of business.',
    },
    {
      misconception: 'A Sole Proprietor has limited liability because there is only one owner.',
      correction: 'Sole proprietors have UNLIMITED liability because there is no separate legal entity between owner and firm; personal property can be attached for business debts.',
    },
    {
      misconception: 'MSME size classification is based solely on investment.',
      correction: 'Under the 2020 revised MSMED Act, size uses composite criteria of BOTH investment in plant & machinery AND annual turnover.',
    },
    {
      misconception: 'A sleeping partner and a secret partner are identical.',
      correction: 'They are mirror opposites: a sleeping partner is known to the public but inactive in management; a secret partner is active in management but concealed from the public.',
    },
    {
      misconception: 'Public sector enterprise means a company whose shares are listed on stock exchanges.',
      correction: 'Public sector means majority GOVERNMENT ownership (>51%). A listed company owned by private citizens (like Tata Motors) is in the private sector.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which of the following is an economic activity?', options: ['Cooking for family', 'Teaching own son at home', 'Running a retail grocery shop', 'Donating blood'], correctIndex: 2 },
    { question: 'What is the reward of a profession?', options: ['Profit', 'Professional Fees', 'Wages', 'Dividends'], correctIndex: 1 },
    { question: 'Which aid to trade eliminates the gap of place?', options: ['Warehousing', 'Transport', 'Insurance', 'Advertising'], correctIndex: 1 },
    { question: 'What is the minimum statutory CSR spend under Section 135 for qualifying companies?', options: ['1% of net profit', '2% of average net profit of 3 years', '5% of turnover', '10% of gross margin'], correctIndex: 1 },
    { question: 'What is the maximum number of partners in a general partnership firm?', options: ['10', '20', '50', '200'], correctIndex: 2 },
    { question: 'Does a joint stock company dissolve when a major shareholder passes away?', options: ['Yes, immediately', 'No, because of perpetual succession', 'Only if the government intervenes', 'Yes, within 30 days'], correctIndex: 1 },
    { question: 'What liability does a nominal partner bear to outside creditors under Section 28?', options: ['Zero liability', 'Limited to ₹10,000', 'Unlimited liability due to holding out', 'Criminal liability only'], correctIndex: 2 },
    { question: 'Which industry converts iron ore and coking coal into structural steel?', options: ['Primary Industry', 'Secondary Industry', 'Tertiary Industry', 'Commercial Agency'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrates complete mastery of business features, commerce ecosystem, MSME classification, ethics/CSR, partnership agency, and company corporate personhood.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE — LEARN BY DOING) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The 6 Pillars of Business',
    instruction: 'Click on all 6 foundational pillars around the enterprise hub to verify the interlocking features of business.',
    interactionType: 'click-pillars',
    nodeId: NODE_C11_BS_001,
  },
  {
    title: 'Lab 2: Economic vs Social Objectives & Profit Bridge',
    instruction: 'Adjust the Net Profit slider to observe how surplus enables both capital expansion and mandatory 2% CSR.',
    interactionType: 'profit-bridge',
    nodeId: NODE_C11_BS_002,
  },
  {
    title: 'Lab 3: Sectoral Journey & 2020 MSME Classifier',
    instruction: 'Adjust Investment and Turnover sliders to simulate dynamic MSME classification under the 2020 composite rule.',
    interactionType: 'msme-simulator',
    nodeId: NODE_C11_BS_003,
  },
  {
    title: 'Lab 4: The Commerce Bridge (Trade + Aids to Trade)',
    instruction: 'Click each trade gap on the freight route to activate the corresponding aid to trade.',
    interactionType: 'commerce-flow',
    nodeId: NODE_C11_BS_004,
  },
  {
    title: 'Lab 5: Corporate Veil & Organisation Matrix',
    instruction: 'Toggle between Sole Proprietorship, Partnership, and Joint Stock Company to see the shift in liability & legal persona.',
    interactionType: 'forms-matrix',
    nodeId: NODE_C11_BS_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a company increases its net profit from ₹100 crore to ₹500 crore, what happens to its mandatory Section 135 CSR commitment?',
    options: [
      'CSR spend stays fixed at ₹2 crore',
      'CSR spend increases 5x proportionally because it is 2% of average net profit',
      'The company becomes exempt from CSR because it is too large',
      'CSR spend drops to 1% to encourage reinvestment',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the Net Profit slider to ₹500 crore in the simulation below to verify the statutory 2% calculation.',
  },
  {
    question: 'Predict: If an enterprise has ₹4 crore investment (within Small tier) but its turnover spikes to ₹60 crore (above Small tier), which class will it be assigned under the 2020 composite rule?',
    options: [
      'Micro Enterprise',
      'Small Enterprise (because investment is under ₹10 cr)',
      'Medium Enterprise (because exceeding turnover triggers the higher class)',
      'Large Enterprise',
    ],
    correctIndex: 2,
    verifyInstruction: 'Set Investment to ₹4 cr and Turnover to ₹60 cr on the sliders to witness the composite rule trigger.',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the liability exposure of personal assets as an organisation converts from Sole Proprietorship to a Joint Stock Company?',
    observableOptions: [
      'Personal assets remain 100% exposed to business creditors',
      'Personal assets become completely shielded behind the corporate veil (liability limited to unpaid share value)',
      'The government absorbs all personal liabilities',
      'Creditors can seize company assets only after seizing personal cars',
    ],
    correctIndex: 1,
  },
];

// ─── REAL WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Boardroom Strategy: Scaling "IndiBakes Ltd"',
  description: 'Apply all 10 Business Studies nodes to craft a comprehensive corporate expansion blueprint for an Indian enterprise.',
  steps: [
    'Phase 1: Define the economic & social objectives for IndiBakes, integrating 2% CSR into rural wheat farming communities.',
    'Phase 2: Classify the procurement of flour (Primary), baking facilities (Secondary), and delivery app (Tertiary).',
    'Phase 3: Transition from a 3-member partnership to an incorporated Public Limited Company under Companies Act 2013.',
    'Phase 4: Establish internal business ethics protocols to prevent greenwashing and protect consumer trust.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_BusinessStudiesMeaningFeaturesBusinessSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_BS_001,
  title = DEFAULT_PROPS.title || 'Business Studies Fundamentals',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['business-studies'] || { name: 'Business Studies', emoji: '🏢', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery & Exploration State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [unlockedPillars, setUnlockedPillars] = useState<string[]>([]);
  const [activePillarDetail, setActivePillarDetail] = useState<string | null>(null);

  // Sliders for interactive labs
  const [simNetProfit, setSimNetProfit] = useState(250); // in crore
  const [simInvestment, setSimInvestment] = useState(8); // in crore
  const [simTurnover, setSimTurnover] = useState(35); // in crore
  const [selectedForm, setSelectedForm] = useState<'sole' | 'partner' | 'company'>('sole');
  const [activatedAids, setActivatedAids] = useState<string[]>(['transport']);
  const [csrRatio, setCsrRatio] = useState(2); // %

  // Predict-then-check state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Challenge interaction state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Input state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [selectedWrongOption, setSelectedWrongOption] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // BKT Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DYNAMIC MSME CLASSIFICATION CALCULATOR ───
  const msmeClassResult = useMemo(() => {
    if (simInvestment <= 1 && simTurnover <= 5) {
      return { tier: 'Micro Enterprise', color: '#10b981', badge: 'Micro (≤₹1cr / ≤₹5cr)' };
    }
    if (simInvestment <= 10 && simTurnover <= 50) {
      return { tier: 'Small Enterprise', color: '#3b82f6', badge: 'Small (≤₹10cr / ≤₹50cr)' };
    }
    if (simInvestment <= 50 && simTurnover <= 250) {
      return { tier: 'Medium Enterprise', color: '#8b5cf6', badge: 'Medium (≤₹50cr / ≤₹250cr)' };
    }
    return { tier: 'Large Enterprise', color: '#ef4444', badge: 'Large (>₹50cr or >₹250cr)' };
  }, [simInvestment, simTurnover]);

  // ─── DYNAMIC PROFIT ALLOCATION DATA ───
  const profitAllocationData = useMemo(() => {
    const mandatoryCsr = Number(((simNetProfit * csrRatio) / 100).toFixed(2));
    const retainedGrowth = Number((simNetProfit * 0.55).toFixed(2));
    const dividendPayout = Number((simNetProfit - mandatoryCsr - retainedGrowth).toFixed(2));
    return [
      { name: 'Retained Growth Capital', amount: retainedGrowth, fill: '#6366f1' },
      { name: 'Shareholder Dividends', amount: Math.max(0, dividendPayout), fill: '#3b82f6' },
      { name: 'Mandatory CSR (Sec 135)', amount: mandatoryCsr, fill: '#10b981' },
    ];
  }, [simNetProfit, csrRatio]);

  // ─── DYNAMIC ORGANISATION COMPARISON DATA ───
  const orgComparisonMatrix = useMemo(() => {
    switch (selectedForm) {
      case 'sole':
        return {
          title: 'Sole Proprietorship',
          liability: 'UNLIMITED (Personal house/assets exposed)',
          entity: 'NO Separate Legal Entity',
          continuity: 'Uncertain (Ends with death/insolvency)',
          governance: 'Direct personal control, 100% secrecy',
          statute: 'Shops & Est. Act / Income Tax Sec 28-44',
          maxMembers: '1',
          riskLevel: 'Highest Personal Risk',
        };
      case 'partner':
        return {
          title: 'General Partnership',
          liability: 'UNLIMITED (Joint & Several under Sec 25)',
          entity: 'NO Separate Legal Entity (Firm = Collective)',
          continuity: 'Dissolves on partner exit unless deed specifies',
          governance: 'Mutual Agency (Each binds all partners)',
          statute: 'Indian Partnership Act 1932',
          maxMembers: '50 (Cos Misc Rules 2014)',
          riskLevel: 'Mutual Agency Exposure',
        };
      case 'company':
        return {
          title: 'Joint Stock Company (Ltd)',
          liability: 'LIMITED to unpaid share capital value',
          entity: 'YES — Separate Artificial Person (Salomon Rule)',
          continuity: 'PERPETUAL SUCCESSION (Unaffected by deaths)',
          governance: 'Board of Directors elected by shareholders',
          statute: 'Companies Act 2013 (Sec 2(20), Sec 3)',
          maxMembers: 'Unlimited for Public Ltd',
          riskLevel: 'Shielded by Corporate Veil',
        };
    }
  }, [selectedForm]);

  // ─── INITIAL MASTERY LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY EFFECT ───
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

  // ─── 2D CANVAS ANIMATION EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background pulse track
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render flowing commercial artery
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#6366f1');
      gradient.addColorStop(0.5, '#10b981');
      gradient.addColorStop(1, '#3b82f6');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2 + Math.sin(frame * 0.05) * 4);
      for (let x = 0; x < canvas.width; x += 10) {
        ctx.lineTo(x, canvas.height / 2 + Math.sin((frame + x) * 0.04) * 4);
      }
      ctx.stroke();

      // Moving shipment packet
      const packetX = (frame * 2) % canvas.width;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(packetX, canvas.height / 2 + Math.sin((frame + packetX) * 0.04) * 4, 5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CLEANUP TIMER ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── SOUND & SPEECH TRIGGERS ON SLIDE TRANSITION ───
  useEffect(() => {
    if (phase === 'explore') {
      const msgs = [
        'Explore the six fundamental pillars of business enterprise.',
        'See how business profits act as the bridge to fund both corporate expansion and social CSR.',
        'Test the composite MSMED 2020 rules for micro, small, and medium enterprises.',
        'Observe how commerce bridges the five crucial gaps between producer and consumer.',
        'Compare the corporate veil across sole proprietorship, partnership, and joint stock companies.',
      ];
      speechManager.speak(msgs[currentSlide] || 'Continue your exploration.');
    }
  }, [phase, currentSlide]);

  // ─── HANDLERS ───
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
      audioManager.play('pop');
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
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot on! A one-off personal sale lacks regularity.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Enterprise Sandbox. Experiment freely with zero grading pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenges. Read each scenario carefully.');
  }, []);

  const handlePillarClick = useCallback((pillarId: string, name: string) => {
    audioManager.play('tap');
    setActivePillarDetail(name);
    setUnlockedPillars(prev => prev.includes(pillarId) ? prev : [...prev, pillarId]);
    speechManager.speak(`Feature: ${name}`);
  }, []);

  const handlePredictionSubmit = useCallback(() => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now interact with the sliders below to check if you were right.');
  }, []);

  const handleObservationSubmit = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Brilliant observation! You noticed the fundamental legal mechanism.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Look closely at the corporate veil indicator in the diagram.');
    }
  }, []);

  const handleToggleAid = useCallback((aidId: string) => {
    audioManager.play('tap');
    setActivatedAids(prev =>
      prev.includes(aidId) ? prev.filter(a => a !== aidId) : [...prev, aidId]
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
    speechManager.speak('Outstanding work! You have successfully mastered Class 11 Business Studies foundations.');
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
    setSelectedWrongOption(null);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

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
      setSelectedWrongOption(null);
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent application of business law.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ bestScore: 100, lastPlayed: Date.now() }));
      }
    } else {
      if (typeof answer === 'number') {
        setSelectedWrongOption(answer);
      }
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => {
        setWrongShake(false);
        setSelectedWrongOption(null);
      }, 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us examine the legal principle step-by-step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]);

  // Personalized motivational feedback text
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Outstanding mastery of Business Studies principles and corporate jurisprudence.';
    if (errors >= 1 && errors <= 3) return 'Great work! You demonstrated strong application of business features, MSME thresholds, and commercial structures.';
    if (errors >= 4 && errors <= 7) return 'Good effort! Review the core company law precedents and partnership liabilities to sharpen your precision.';
    return 'Do not give up — You WILL get this! Business concepts become intuitive with regular review.';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">

      {/* ─── HEADER BAR WITH BKT MASTERY AND DYNAMIC BADGES ─���─ */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              ISC Class 11 Business Studies • Nodes c11_bs_001 to c11_bs_010
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-indigo-950/60 text-indigo-400 border-indigo-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>

          <div className="px-3 py-1 bg-slate-900 rounded-full text-xs font-semibold text-slate-300 border border-slate-700">
            Mastery: <span className="text-amber-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">🏛️</div>
            <span className="px-2.5 py-1 bg-indigo-600/30 text-indigo-300 text-xs font-bold rounded-md border border-indigo-500/40 uppercase tracking-wide">
              Case Narrative
            </span>
            <h2 className="text-2xl font-bold text-white mt-2 mb-1">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-3xl mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 font-medium italic">{SCENARIO.context}</p>
          </div>

          {/* Interactive Curiosity Hook */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">❓</span>
              <h3 className="text-base font-bold text-amber-400 uppercase tracking-wide">
                Curiosity Hook: Is this Business?
              </h3>
            </div>
            <p className="text-white text-base font-semibold leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <p className={`text-sm flex items-center gap-1.5 ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  <span>{discoveryCorrect ? '✓' : 'ℹ️'}</span>
                  <span>
                    {discoveryCorrect
                      ? 'Spot on! Regularity in dealings is a mandatory feature of business under Section 2(17).'
                      : DISCOVERY_QUESTION.hintAfter}
                  </span>
                </p>

                <motion.button
                  aria-label="Enter interactive labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS (BRILLIANT-STYLE) ─── */}
      {phase === 'explore' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Step Navigation Pill Indicator */}
          <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
            <div className="flex gap-2">
              {EXPLORATION_STEPS.map((s, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to Lab ${idx + 1}: ${s.title}`}
                  onClick={() => { setCurrentSlide(idx); audioManager.play('tap'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentSlide === idx
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Lab {idx + 1}
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Interactive Exploration
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-amber-400 text-sm mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: THE 6 PILLARS OF BUSINESS (SVG DIAGRAM 1) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 320" className="w-full max-h-[320px]" aria-label="Interactive 6 Pillars of Business Diagram">
                      {/* Central Enterprise Core */}
                      <circle cx="300" cy="160" r="50" fill="#312e81" stroke="#6366f1" strokeWidth="3" />
                      <text x="300" y="155" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                        BUSINESS
                      </text>
                      <text x="300" y="172" textAnchor="middle" fill="#93c5fd" fontSize="9">
                        Sec 2(17) IT Act
                      </text>

                      {/* 6 Interlocking Feature Pillars */}
                      {[
                        { id: 'p1', name: '1. Economic Activity', x: 300, y: 40, col: '#3b82f6', desc: 'Uses scarce capital, labour & time for monetary output. Not for love/affection.' },
                        { id: 'p2', name: '2. Production/Procure', x: 480, y: 90, col: '#10b981', desc: 'Either manufactures (Tata Steel) or procures for resale (Reliance Retail).' },
                        { id: 'p3', name: '3. Sale / Exchange', x: 480, y: 230, col: '#f59e0b', desc: 'Goods transferred to buyers for value. Self-consumption is not business.' },
                        { id: 'p4', name: '4. Regularity in Dealings', x: 300, y: 280, col: '#ec4899', desc: 'Continuous repeated transactions. One-off car sale is non-business.' },
                        { id: 'p5', name: '5. Profit Motive', x: 120, y: 230, col: '#8b5cf6', desc: 'Primary driving surplus of revenue over cost; reward for risk-bearing.' },
                        { id: 'p6', name: '6. Risk & Uncertainty', x: 120, y: 90, col: '#ef4444', desc: 'Return cannot be guaranteed; vulnerable to competition & spoilage.' },
                      ].map(pillar => {
                        const isUnlocked = unlockedPillars.includes(pillar.id);
                        return (
                          <g
                            key={pillar.id}
                            role="button"
                            tabIndex={0}
                            aria-label={`Explore ${pillar.name}`}
                            onClick={() => handlePillarClick(pillar.id, `${pillar.name}: ${pillar.desc}`)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePillarClick(pillar.id, `${pillar.name}: ${pillar.desc}`); }}
                            style={{ cursor: 'pointer' }}
                          >
                            <line
                              x1="300"
                              y1="160"
                              x2={pillar.x}
                              y2={pillar.y}
                              stroke={isUnlocked ? pillar.col : '#334155'}
                              strokeWidth="2"
                              strokeDasharray={isUnlocked ? '0' : '4'}
                            />
                            <rect
                              x={pillar.x - 70}
                              y={pillar.y - 20}
                              width="140"
                              height="40"
                              rx="10"
                              fill={isUnlocked ? pillar.col : '#1e293b'}
                              stroke={isUnlocked ? '#ffffff' : '#475569'}
                              strokeWidth="1.5"
                            />
                            <text
                              x={pillar.x}
                              y={pillar.y + 4}
                              textAnchor="middle"
                              fill={isUnlocked ? '#ffffff' : '#94a3b8'}
                              fontSize="10"
                              fontWeight="bold"
                            >
                              {pillar.name}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {activePillarDetail && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-indigo-950/80 rounded-xl border border-indigo-700 text-xs text-indigo-200"
                      >
                        <span className="font-bold text-white">✓ Pillar Verified:</span> {activePillarDetail}
                      </motion.div>
                    )}
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-300">
                    <p className="font-semibold text-slate-200 mb-1">💡 Peter Drucker & ISC Statutory Rule:</p>
                    "The purpose of business is to create a customer." All six features must coexist together — having risk alone (gambling) or receiving money alone (salary) does not make an activity a business!
                  </div>
                </div>
              )}

              {/* ─── LAB 2: ECONOMIC VS SOCIAL OBJECTIVES & 2% CSR ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {!predictionMade ? (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-900/60 space-y-3">
                      <p className="text-sm font-bold text-white">
                        🔮 {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <button
                            key={i}
                            aria-label={`Prediction choice: ${opt}`}
                            onClick={() => handlePredictionSubmit()}
                            className="p-3 text-left bg-slate-800 hover:bg-slate-700 text-xs rounded-xl text-slate-200 font-medium"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-700 text-xs text-indigo-300 flex items-center justify-between">
                      <span>✓ {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <span className="font-bold text-amber-400">Prediction Active</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Annual Net Profit (Avg 3 Yrs):</span>
                          <span className="text-indigo-400 font-bold">₹{simNetProfit} Crore</span>
                        </div>
                        <input
                          type="range"
                          aria-label="Annual Net Profit slider in crores"
                          min={20}
                          max={1000}
                          step={10}
                          value={simNetProfit}
                          onChange={e => {
                            setSimNetProfit(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">CSR Statutory Allocation Rate:</span>
                          <span className="text-emerald-400 font-bold">{csrRatio}% (Companies Act 2013 Sec 135)</span>
                        </div>
                        <input
                          type="range"
                          aria-label="CSR allocation percentage slider"
                          min={2}
                          max={10}
                          step={1}
                          value={csrRatio}
                          onChange={e => setCsrRatio(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Mandatory Schedule VII CSR Spend:</span>
                          <span className="text-emerald-400 font-bold">
                            ₹{((simNetProfit * csrRatio) / 100).toFixed(2)} Crore
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Retained for Growth & Innovation:</span>
                          <span className="text-indigo-300 font-bold">
                            ₹{(simNetProfit * 0.55).toFixed(2)} Crore
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 pt-1">
                          *Section 135 applies to firms with Net Worth ≥ ₹500cr, Turnover ≥ ₹1,000cr, or Net Profit ≥ ₹5cr.
                        </p>
                        {/* Live derived readouts with units */}
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                            <p className="text-[10px] text-slate-500">Sec 135 status (threshold ₹5cr)</p>
                            <p className={`font-mono font-bold ${simNetProfit >= 5 ? 'text-emerald-300' : 'text-rose-300'}`}>
                              {simNetProfit >= 5 ? 'APPLIES' : 'EXEMPT'}
                            </p>
                          </div>
                          <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                            <p className="text-[10px] text-slate-500">Extra social investment vs 2% floor</p>
                            <p className="font-mono font-bold text-amber-300">
                              ₹{(((csrRatio - 2) * simNetProfit) / 100).toFixed(2)} Crore
                            </p>
                          </div>
                          <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                            <p className="text-[10px] text-slate-500">Owner dividend share (45%)</p>
                            <p className="font-mono font-bold text-indigo-300">₹{(simNetProfit * 0.45).toFixed(2)} Crore</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Misconception killer: profit is NOT free money for the owner — it is the RESIDUAL reward left
                          after employees, suppliers, lenders and government are paid, and it exists only because the
                          owner bore RISK. Drop profit to the ₹20cr floor: CSR money shrinks too, social goals and
                          business profit are linked, not opposed.
                        </p>
                        <button
                          onClick={() => { setSimNetProfit(250); setCsrRatio(2); }}
                          aria-label="Reset profit and CSR sliders"
                          className="text-[10px] px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                        >
                          ↺ Reset (₹250cr, 2%)
                        </button>
                      </div>
                    </div>

                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={profitAllocationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                          <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }} />
                          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                            {profitAllocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: 2020 MSME COMPOSITE CLASSIFIER ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {!predictionVerified && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-900/60 space-y-3">
                      <p className="text-sm font-bold text-white">
                        🔮 {PREDICTION_QUESTIONS[1].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <button
                            key={i}
                            aria-label={`Prediction choice: ${opt}`}
                            onClick={() => {
                              setPredictionVerified(true);
                              audioManager.play('tap');
                            }}
                            className="p-3 text-left bg-slate-800 hover:bg-slate-700 text-xs rounded-xl text-slate-200 font-medium"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Investment in Plant & Machinery:</span>
                          <span className="text-indigo-400 font-bold">₹{simInvestment} Crore</span>
                        </div>
                        <input
                          type="range"
                          aria-label="Investment in plant and machinery in crores"
                          min={0.2}
                          max={70}
                          step={0.5}
                          value={simInvestment}
                          onChange={e => {
                            setSimInvestment(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Annual Net Turnover:</span>
                          <span className="text-indigo-400 font-bold">₹{simTurnover} Crore</span>
                        </div>
                        <input
                          type="range"
                          aria-label="Annual net turnover in crores"
                          min={1}
                          max={300}
                          step={2}
                          value={simTurnover}
                          onChange={e => {
                            setSimTurnover(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-2 text-[10px]">
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                          <span className="text-emerald-400 font-bold block">✓ Micro</span>
                          Inv ≤ ₹1cr<br />Turn ≤ ₹5cr
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                          <span className="text-blue-400 font-bold block">✓ Small</span>
                          Inv ≤ ₹10cr<br />Turn ≤ ₹50cr
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                          <span className="text-purple-400 font-bold block">✓ Medium</span>
                          Inv ≤ ₹50cr<br />Turn ≤ ₹250cr
                        </div>
                      </div>
                    </div>

                    <motion.div
                      animate={{ borderColor: msmeClassResult.color }}
                      className="p-6 bg-slate-900 rounded-2xl border-2 flex flex-col items-center justify-center text-center space-y-3"
                    >
                      <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                        Calculated Legal Classification
                      </span>
                      <h4 className="text-2xl font-black text-white" style={{ color: msmeClassResult.color }}>
                        {msmeClassResult.tier}
                      </h4>
                      <p className="text-xs text-slate-300">
                        {msmeClassResult.badge}
                      </p>
                      <div className="p-3 bg-slate-950/80 rounded-xl text-[11px] text-slate-400 w-full text-left">
                        <span className="font-bold text-slate-200">Rule Trigger:</span> If an enterprise crosses either investment OR turnover ceiling, it automatically shifts to the higher category.
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: THE COMMERCE BRIDGE (SVG DIAGRAM 2) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <p className="text-xs text-slate-300">
                      Commerce = <strong className="text-indigo-400">Trade (Buying/Selling)</strong> + <strong className="text-emerald-400">Aids to Trade (Support Services)</strong>. Click the barriers below to deploy the corresponding aid:
                    </p>

                    {/* SVG Diagram 2: Commerce Ecosystem Architecture */}
                    <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
                      <svg viewBox="0 0 700 160" className="w-full max-h-[160px]" aria-label="Commerce Gaps and Aids to Trade Diagram">
                        {/* Producer Node */}
                        <rect x="20" y="50" width="100" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                        <text x="70" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">PRODUCER</text>
                        <text x="70" y="95" textAnchor="middle" fill="#a5b4fc" fontSize="10">Factory / Farm</text>

                        {/* Arrow across */}
                        <line x1="120" y1="80" x2="580" y2="80" stroke="#475569" strokeWidth="3" strokeDasharray="6" />

                        {/* 5 Gaps Bridge Modules */}
                        {[
                          { id: 'transport', label: 'Transport', gap: 'Place Gap', x: 170, color: '#3b82f6' },
                          { id: 'warehouse', label: 'Warehousing', gap: 'Time Gap', x: 260, color: '#10b981' },
                          { id: 'banking', label: 'Banking', gap: 'Finance Gap', x: 350, color: '#f59e0b' },
                          { id: 'insurance', label: 'Insurance', gap: 'Risk Gap', x: 440, color: '#ec4899' },
                          { id: 'advertising', label: 'Advertising', gap: 'Info Gap', x: 530, color: '#8b5cf6' },
                        ].map(bridge => {
                          const isAct = activatedAids.includes(bridge.id);
                          return (
                            <g key={bridge.id} onClick={() => handleToggleAid(bridge.id)} style={{ cursor: 'pointer' }}>
                              <circle cx={bridge.x} cy="80" r="28" fill={isAct ? bridge.color : '#1e293b'} stroke={isAct ? '#ffffff' : '#64748b'} strokeWidth="2" />
                              <text x={bridge.x} y="77" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">{bridge.label.slice(0, 5)}</text>
                              <text x={bridge.x} y="90" textAnchor="middle" fill={isAct ? '#ffffff' : '#94a3b8'} fontSize="7">{isAct ? '✓ ACTIVE' : '✗ BLOCKED'}</text>
                              <text x={bridge.x} y="125" textAnchor="middle" fill={bridge.color} fontSize="9" fontWeight="bold">{bridge.gap}</text>
                            </g>
                          );
                        })}

                        {/* Consumer Node */}
                        <rect x="580" y="50" width="100" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                        <text x="630" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">CONSUMER</text>
                        <text x="630" y="95" textAnchor="middle" fill="#6ee7b7" fontSize="10">Market / Home</text>
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { id: 'transport', name: 'Transport', gap: 'Gap of Place', icon: '🚚', desc: 'Moves goods 2,500 km from Punjab wheat fields to Chennai.' },
                        { id: 'warehouse', name: 'Warehousing', gap: 'Gap of Time', icon: '🏭', desc: 'Stores April harvests for consumption in December.' },
                        { id: 'banking', name: 'Banking', gap: 'Gap of Finance', icon: '🏦', desc: 'Provides working capital loans and trade credit.' },
                        { id: 'insurance', name: 'Insurance', gap: 'Gap of Risk', icon: '🛡️', desc: 'Covers transit damage, fire, and theft risks.' },
                        { id: 'advertising', name: 'Advertising', gap: 'Gap of Knowledge', icon: '📢', desc: 'Informs consumers about product quality & pricing.' },
                      ].map(aid => {
                        const isActive = activatedAids.includes(aid.id);
                        return (
                          <motion.button
                            key={aid.id}
                            aria-label={`Toggle ${aid.name}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleToggleAid(aid.id)}
                            className={`p-3.5 rounded-xl text-left border transition-all ${
                              isActive
                                ? 'bg-indigo-950/80 border-indigo-500 shadow-md shadow-indigo-600/20'
                                : 'bg-slate-900 border-slate-800 opacity-60'
                            }`}
                          >
                            <div className="text-2xl mb-1" aria-hidden="true">{aid.icon}</div>
                            <h5 className="text-xs font-bold text-white flex items-center justify-between">
                              <span>{aid.name}</span>
                              <span className="text-[10px]">{isActive ? '✓' : '✗'}</span>
                            </h5>
                            <span className="text-[10px] text-amber-400 font-semibold block">{aid.gap}</span>
                            <p className="text-[10px] text-slate-400 mt-1 leading-tight">{aid.desc}</p>
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                      <span>Factory Gate Dividing Line: Inside = <strong className="text-indigo-300">Industry (Manufacturing)</strong> | Outside = <strong className="text-emerald-300">Commerce (Distribution)</strong></span>
                      <span className="text-amber-400 font-bold">5 Gaps Bridged</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: ORGANISATION FORMS & CORPORATE VEIL (SVG DIAGRAM 3) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  {!observationAnswered && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-900/60 space-y-3">
                      <p className="text-sm font-bold text-white">
                        🔍 {OBSERVATION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <button
                            key={i}
                            aria-label={`Observation choice: ${opt}`}
                            onClick={() => handleObservationSubmit(i)}
                            className="p-3 text-left bg-slate-800 hover:bg-slate-700 text-xs rounded-xl text-slate-200 font-medium"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SVG Diagram 3: Corporate Veil and Liability Shield */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 650 140" className="w-full max-h-[140px]" aria-label="Corporate Veil and Legal Shield Diagram">
                      {/* Structure 1: Sole Prop (No Veil) */}
                      <g onClick={() => setSelectedForm('sole')} style={{ cursor: 'pointer' }}>
                        <rect x="20" y="20" width="180" height="100" rx="10" fill={selectedForm === 'sole' ? '#1e1b4b' : '#0f172a'} stroke={selectedForm === 'sole' ? '#ef4444' : '#334155'} strokeWidth="2" />
                        <text x="110" y="45" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">Sole Proprietorship</text>
                        <text x="110" y="65" textAnchor="middle" fill="#f87171" fontSize="10">✗ NO Legal Separation</text>
                        <text x="110" y="85" textAnchor="middle" fill="#cbd5e1" fontSize="9">Owner = Firm Person</text>
                        <text x="110" y="102" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">Unlimited Liability</text>
                      </g>

                      {/* Structure 2: Partnership (Mutual Agency) */}
                      <g onClick={() => setSelectedForm('partner')} style={{ cursor: 'pointer' }}>
                        <rect x="235" y="20" width="180" height="100" rx="10" fill={selectedForm === 'partner' ? '#1e1b4b' : '#0f172a'} stroke={selectedForm === 'partner' ? '#f59e0b' : '#334155'} strokeWidth="2" />
                        <text x="325" y="45" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">General Partnership</text>
                        <text x="325" y="65" textAnchor="middle" fill="#fbbf24" fontSize="10">⇄ Mutual Agency</text>
                        <text x="325" y="85" textAnchor="middle" fill="#cbd5e1" fontSize="9">Joint & Several Exposure</text>
                        <text x="325" y="102" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Unlimited Liability</text>
                      </g>

                      {/* Structure 3: Company (Corporate Veil Shield) */}
                      <g onClick={() => setSelectedForm('company')} style={{ cursor: 'pointer' }}>
                        <rect x="450" y="20" width="180" height="100" rx="10" fill={selectedForm === 'company' ? '#064e3b' : '#0f172a'} stroke={selectedForm === 'company' ? '#10b981' : '#334155'} strokeWidth="2" />
                        <text x="540" y="45" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">Joint Stock Company</text>
                        <text x="540" y="65" textAnchor="middle" fill="#34d399" fontSize="10">🛡️ Corporate Veil Active</text>
                        <text x="540" y="85" textAnchor="middle" fill="#cbd5e1" fontSize="9">Salomon v. Salomon 1897</text>
                        <text x="540" y="102" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">✓ Limited Liability</text>
                      </g>
                    </svg>
                  </div>

                  <div className="space-y-4">
                    {/* Structure Selector Tabs */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'sole', label: '1. Sole Proprietorship' },
                        { id: 'partner', label: '2. Partnership Firm' },
                        { id: 'company', label: '3. Joint Stock Company' },
                      ].map(tab => (
                        <button
                          key={tab.id}
                          aria-label={`Select ${tab.label}`}
                          onClick={() => {
                            setSelectedForm(tab.id as 'sole' | 'partner' | 'company');
                            audioManager.play('tap');
                          }}
                          className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${
                            selectedForm === tab.id
                              ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Dynamic Legal Matrix Card */}
                    <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-black text-indigo-300">
                            {orgComparisonMatrix.title}
                          </h4>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-700">
                            {orgComparisonMatrix.riskLevel}
                          </span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 bg-slate-900 rounded-lg">
                            <span className="text-slate-400 block font-medium">Liability of Members:</span>
                            <span className="text-white font-bold">{orgComparisonMatrix.liability}</span>
                          </div>
                          <div className="p-2.5 bg-slate-900 rounded-lg">
                            <span className="text-slate-400 block font-medium">Separate Legal Personality:</span>
                            <span className="text-white font-bold">{orgComparisonMatrix.entity}</span>
                          </div>
                          <div className="p-2.5 bg-slate-900 rounded-lg">
                            <span className="text-slate-400 block font-medium">Continuity & Life:</span>
                            <span className="text-white font-bold">{orgComparisonMatrix.continuity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 bg-slate-900 rounded-lg">
                            <span className="text-slate-400 block font-medium">Decision Making & Agency:</span>
                            <span className="text-indigo-300 font-bold">{orgComparisonMatrix.governance}</span>
                          </div>
                          <div className="p-2.5 bg-slate-900 rounded-lg">
                            <span className="text-slate-400 block font-medium">Governing Statute in India:</span>
                            <span className="text-emerald-300 font-bold">{orgComparisonMatrix.statute}</span>
                          </div>
                          <div className="p-2.5 bg-slate-900 rounded-lg">
                            <span className="text-slate-400 block font-medium">Maximum Permitted Members:</span>
                            <span className="text-amber-300 font-bold">{orgComparisonMatrix.maxMembers}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Footer Navigation */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('tap'); }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('tap'); }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Free Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE (NO GRADING) ─── */}
      {phase === 'sandbox' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-700">
                  Free Play Sandbox
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Enterprise Architecture Simulator
                </h3>
                <p className="text-slate-400 text-xs">
                  Freely tweak all parameters without any grading. Test legal boundaries, CSR allocations, and MSME thresholds.
                </p>
              </div>

              <motion.button
                aria-label="Advance to Competency Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 text-xs flex items-center gap-2"
              >
                Ready for Competency Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-indigo-400 uppercase">Profit & CSR Dial</span>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Profit:</span>
                    <span className="text-white font-bold">₹{simNetProfit} cr</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Sandbox profit dial in crores"
                    min={10}
                    max={1200}
                    value={simNetProfit}
                    onChange={e => setSimNetProfit(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-emerald-400 font-semibold">
                  2% Mandatory CSR = ₹{((simNetProfit * 2) / 100).toFixed(2)} cr
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-blue-400 uppercase">2020 MSME Scale</span>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Turnover:</span>
                    <span className="text-white font-bold">₹{simTurnover} cr</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Sandbox turnover scale in crores"
                    min={1}
                    max={300}
                    value={simTurnover}
                    onChange={e => setSimTurnover(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <p className="text-[11px] font-bold" style={{ color: msmeClassResult.color }}>
                  Current Status: {msmeClassResult.tier}
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-purple-400 uppercase">Legal Structure</span>
                <div className="flex gap-2">
                  {(['sole', 'partner', 'company'] as const).map(f => (
                    <button
                      key={f}
                      aria-label={`Select structure ${f}`}
                      onClick={() => setSelectedForm(f)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold capitalize flex-1 border ${
                        selectedForm === f
                          ? 'bg-purple-600 border-purple-400 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-300">
                  Liability: <strong>{selectedForm === 'company' ? 'Limited' : 'UNLIMITED'}</strong>
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE (NEP 2020 / CISCE COMPETENCY) ─── */}
      {phase === 'challenge' && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Animated 2D Canvas Artery Header */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
            <canvas ref={canvasRef} width={800} height={26} className="w-full block" />
          </div>

          {/* Progress & Competency Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded text-[10px] font-bold border border-indigo-800 uppercase">
                  Competency: {challenge.competencyLevel}
                </span>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-bold border border-slate-700">
                  Node: {challenge.nodeId}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                aria-label={`Get hint. ${hintCount} of 3 used.`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showNextHint}
                disabled={hintCount >= 3 || answerRevealed}
                className="px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-700 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-40"
              >
                <span>💡 Hint ({hintCount}/3)</span>
              </motion.button>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Question Card with Visual Feedback */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border-2 transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white leading-snug mb-4">
              {challenge.question}
            </h3>

            {/* ─── MCQ / CLASSIFY / DISTINGUISH ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenge.options.map((opt, i) => {
                  const isWrongSelected = selectedWrongOption === i;
                  const isCorrectRevealed = showExplanation && i === challenge.correctIndex;
                  return (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      animate={isWrongSelected ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`p-4 text-left rounded-2xl text-xs md:text-sm font-medium transition-all border ${
                        isCorrectRevealed
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                          : isWrongSelected
                          ? 'bg-rose-950/90 border-rose-500 text-rose-200'
                          : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isCorrectRevealed ? 'bg-emerald-700 text-white' : isWrongSelected ? 'bg-rose-700 text-white' : 'bg-slate-700'
                        }`}>
                          {isCorrectRevealed ? '✓' : isWrongSelected ? '✗' : String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* ─── DRAG-LABEL CHALLENGE ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'gap_place', title: 'Hindrance of Place' },
                    { id: 'gap_time', title: 'Hindrance of Time' },
                    { id: 'gap_finance', title: 'Hindrance of Finance' },
                    { id: 'gap_risk', title: 'Hindrance of Risk' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-2xl border-2 border-dashed text-center min-h-[90px] flex flex-col justify-center items-center ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[11px] font-semibold block">{target.title}</span>
                      <span className="text-xs font-bold text-white mt-1">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Aid Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* ─── DRAG-SORT CHALLENGE ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Drag and re-order the items from lowest to highest structural scale:
                </p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Position ${idx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        const to = idx;
                        setSortArrangement(prev => {
                          const base = prev.length ? [...prev] : challenge.sortItems!.map((_, i) => i);
                          const [moved] = base.splice(from, 1);
                          base.splice(to, 0, moved);
                          return base;
                        });
                        audioManager.play('pickup');
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Confirm item order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Confirm Order
                </motion.button>
              </div>
            )}

            {/* ─── NUMERIC CHALLENGE ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    aria-label="Numerical answer input"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm max-w-xs focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-sm font-semibold text-slate-300">{challenge.unit}</span>

                  <motion.button
                    aria-label="Submit calculation answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CONSTRUCT CHALLENGE ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setConstructParts(prev => prev.includes(part) ? prev : [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-200 border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-indigo-900/80 text-indigo-200 rounded-lg text-xs font-bold border border-indigo-700 flex items-center gap-1.5"
                    >
                      {p}
                      <button
                        aria-label={`Remove part ${p}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble the equation...</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify construction equation"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* ─── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-indigo-950/40 border border-indigo-800/80 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                    Legal & Conceptual Walkthrough
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <strong className="text-indigo-400">{i + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next step of explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-2 bg-indigo-800 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to next challenge or completion"
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
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION PHASE WITH SRS, REFLECTIONS & MOTIVATION ─── */}
      {phase === 'complete' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Hero Banner */}
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/60 shadow-2xl text-center space-y-3">
            <span className="text-4xl" aria-hidden="true">🎓</span>
            <h2 className="text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have navigated the foundational landscape of Class 11 Business Studies — from the 6 features to the Salomon doctrine of corporate personhood.
            </p>

            <div className="flex justify-center gap-6 pt-3">
              <div className="px-5 py-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">
                  {Math.max(0, 100 - errors * 5)}%
                </span>
              </div>
              <div className="px-5 py-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold">BKT Mastery Level</span>
                <span className="text-2xl font-black text-indigo-400 capitalize">
                  {masteryLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback Banner */}
          <div className="p-5 bg-indigo-950/50 rounded-2xl border border-indigo-700/60 text-xs md:text-sm text-indigo-100 flex items-start gap-3">
            <span className="text-2xl" aria-hidden="true">🎯</span>
            <div>
              <span className="font-bold text-amber-300 block mb-1">Motivational Feedback:</span>
              <p>{motivationalMessage}</p>
            </div>
          </div>

          {/* Spaced Repetition (SRS) Visibility Banner */}
          <div className="p-6 bg-gradient-to-r from-amber-950/50 via-slate-900 to-indigo-950/50 rounded-3xl border border-amber-600/40 shadow-lg space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl" aria-hidden="true">📅</span>
                <h3 className="text-sm md:text-base font-bold text-white tracking-wide">
                  Spaced Repetition (SRS) Review Schedule
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className={`p-3.5 rounded-2xl border text-center transition-all ${
                errors === 0
                  ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/40 text-emerald-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-60'
              }`}>
                <span className="text-xs font-bold block mb-0.5">0 Errors</span>
                <span className="text-sm font-black text-emerald-400">review in 7 days</span>
                <p className="text-[10px] text-slate-400 mt-1">High retention mastery locked</p>
              </div>

              <div className={`p-3.5 rounded-2xl border text-center transition-all ${
                errors >= 1 && errors <= 3
                  ? 'bg-amber-950/70 border-amber-500 ring-2 ring-amber-500/40 text-amber-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-60'
              }`}>
                <span className="text-xs font-bold block mb-0.5">1–3 Errors</span>
                <span className="text-sm font-black text-amber-400">review in 3 days</span>
                <p className="text-[10px] text-slate-400 mt-1">Strengthen conceptual recall</p>
              </div>

              <div className={`p-3.5 rounded-2xl border text-center transition-all ${
                errors >= 4
                  ? 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-500/40 text-rose-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-60'
              }`}>
                <span className="text-xs font-bold block mb-0.5">4+ Errors</span>
                <span className="text-sm font-black text-rose-400">review in 1 day</span>
                <p className="text-[10px] text-slate-400 mt-1">Immediate active repetition needed</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 pt-1">
              Based on your session with <strong>{errors} error{errors === 1 ? '' : 's'}</strong>, your personalized SM-2 spaced repetition reminder is set: please <strong className="text-amber-300 font-bold">{errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}</strong> to lock in long-term memory for ISC exams.
            </p>
          </div>

          {/* Structured Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <h3 className="text-base font-bold text-white">Post-Simulation Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your understanding by answering these reflection questions:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="ref-surprising" className="text-xs font-bold text-indigo-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="ref-surprising"
                  value={reflections.surprising}
                  onChange={e => setReflections({ ...reflections, surprising: e.target.value })}
                  placeholder="e.g., That selling a personal car isn't business due to lack of regularity..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="ref-explain" className="text-xs font-bold text-emerald-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="ref-explain"
                  value={reflections.explain}
                  onChange={e => setReflections({ ...reflections, explain: e.target.value })}
                  placeholder="e.g., A company is a separate legal person shielding owners behind a corporate veil..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  rows={2}
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="ref-reallife" className="text-xs font-bold text-amber-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="ref-reallife"
                  value={reflections.realLife}
                  onChange={e => setReflections({ ...reflections, realLife: e.target.value })}
                  placeholder="e.g., Deciding whether to register my new venture as a Private Limited vs Partnership..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wide">
                Your Targeted Misconception Profile
              </h4>
              <p className="text-xs text-slate-400">
                These specific conceptual gaps were identified during your challenges:
              </p>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs font-bold text-rose-300">✗ Misconception: {m.misconception}</p>
                      <p className="text-xs text-emerald-300 font-medium">✓ Legal Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Capstone Executive Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚀</span>
              <h4 className="text-base font-bold text-white">
                Capstone Activity: {REAL_WORLD_ACTIVITY.title}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {REAL_WORLD_ACTIVITY.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-200 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Set Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BusinessStudiesMeaningFeaturesBusinessSim;
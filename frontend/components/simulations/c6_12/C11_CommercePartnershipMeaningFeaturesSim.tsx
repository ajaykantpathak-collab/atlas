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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

// ============================================================================
// 1. NODE IDS & CONSTANTS
// ============================================================================
const NODE_C11_COMM_011 = 'c11_comm_011';
const NODE_C11_COMM_012 = 'c11_comm_012';
const NODE_C11_COMM_013 = 'c11_comm_013';
const NODE_C11_COMM_014 = 'c11_comm_014';
const NODE_C11_COMM_015 = 'c11_comm_015';
const NODE_C11_COMM_016 = 'c11_comm_016';
const NODE_C11_COMM_017 = 'c11_comm_017';
const NODE_C11_COMM_018 = 'c11_comm_018';
const NODE_C11_COMM_019 = 'c11_comm_019';
const NODE_C11_COMM_020 = 'c11_comm_020';

const ALL_NODE_IDS = [
  NODE_C11_COMM_011,
  NODE_C11_COMM_012,
  NODE_C11_COMM_013,
  NODE_C11_COMM_014,
  NODE_C11_COMM_015,
  NODE_C11_COMM_016,
  NODE_C11_COMM_017,
  NODE_C11_COMM_018,
  NODE_C11_COMM_019,
  NODE_C11_COMM_020,
];

// ============================================================================
// 2. NARRATIVE SCENARIO & DISCOVERY HOOK
// ============================================================================
const SCENARIO = {
  title: 'From Chai Stall to Conglomerate: The Genesis of Bharat TechCraft',
  intro:
    'In Bengaluru, two software engineers (Arjun & Rohit) started with ₹50,000 borrowed from family. To scale, they brought in an angel investor, drafted legal deeds, converted to a Joint Stock Company, and issued equity and preference shares on the public market.',
  context:
    'Every business form comes with vital legal boundaries: mutual agency, unlimited vs limited liability, statutory incorporation hurdles, corporate veil doctrines, and SEBI listing safeguards.',
};

const DISCOVERY_QUESTION = {
  question:
    'Arjun and Rohit sign a partnership to sell AI software. Without Rohit knowing, Arjun signs a ₹30 lakh equipment lease in the firm name and absconds. Is Rohit personally liable to pay the ₹30 lakh from his personal savings?',
  options: [
    'No — Rohit never signed the lease or knew about it',
    'Yes — Mutual agency and joint & several liability bind Rohit under Section 25',
    'No — Liability is strictly limited to Arjun’s initial ₹25,000 capital',
    'Yes — But only if Rohit was registered as the Managing Director',
  ],
  correctIndex: 1,
  hintAfter:
    'In a partnership, every partner is an agent of the firm! Mutual agency means any partner can bind all partners. Let us explore the mechanics!',
};

// ============================================================================
// 3. OBSERVATION & PREDICTION QUESTIONS
// ============================================================================
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    nodeId: NODE_C11_COMM_011,
    prompt: 'Observation: In the Mutual Agency network, what happens to personal liability when you switch between Active, Sleeping, and Nominal partner profiles?',
    observableOptions: [
      'Only the Active partner bears unlimited personal liability',
      'All partner types (Active, Sleeping, Nominal, Secret) retain unlimited joint & several liability to outside creditors',
      'Nominal partners have zero liability because they do not invest capital',
      'Liability changes to limited liability for dormant partners',
    ],
    correctIndex: 1,
    explanation: 'Under Sections 25 and 28 of the Indian Partnership Act 1932, all partners (including nominal partners by holding out and sleeping partners) are jointly and severally liable without limit.',
  },
  {
    id: 'obs_2',
    nodeId: NODE_C11_COMM_014,
    prompt: 'Observation: In the Corporate Veil Lab, what occurs to the promoter’s personal estate when the "Simulate Intentional Fraud" checkbox is toggled?',
    observableOptions: [
      'The personal estate remains 100% protected under the Salomon rule regardless of fraud',
      'The corporate veil is pierced, exposing personal assets to direct creditor claims under Section 447',
      'The company debt is automatically forgiven by the Registrar of Companies',
      'The debt is converted into government equity shares',
    ],
    correctIndex: 1,
    explanation: 'Courts lift/pierce the corporate veil when the entity is used as a sham or vehicle for fraud (e.g., Salomon exception, Satyam scam), holding human controllers personally liable.',
  },
];

export const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If a company makes ₹0 profit in Year 1 & 2, but makes ₹10 lakh profit in Year 3, what happens to Cumulative Preference Shareholders who were promised ₹2 lakh/year?',
    options: [
      'They receive ₹2 lakh only for Year 3; past missed years are lost permanently',
      'They receive ₹6 lakh total in Year 3 (₹4 lakh past arrears + ₹2 lakh current year) before equity gets a rupee',
      'They receive 50% equity voting shares instead',
      'They receive zero because profits were irregular',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the profit slider in Lab 5 to test how cumulative arrears are recovered in Year 3!',
    nodeId: NODE_C11_COMM_020,
  },
  {
    question:
      'Predict: If an unregistered partnership firm files a lawsuit to recover ₹15 Lakh from a debtor, while that debtor sues the firm for ₹20 Lakh, what will the civil court decide under Section 69?',
    options: [
      'The court will dismiss both suits as unregistered firms cannot enter litigation',
      'The firm’s ₹15 Lakh suit is barred and dismissed, but the debtor’s ₹20 Lakh suit against the firm is fully valid',
      'The firm is granted automatic registration upon paying a nominal fine',
      'The court permits the firm to set off the full ₹15 Lakh against the debt',
    ],
    correctIndex: 1,
    verifyInstruction: 'Check Lab 2 and simulate Scenario A & B to see Section 69 asymmetric bar in action!',
    nodeId: NODE_C11_COMM_012,
  },
];

// ============================================================================
// 4. CHALLENGE INTERFACE & NEP-ALIGNED CHALLENGES
// ============================================================================
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

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_comm_011_f1',
    nodeId: NODE_C11_COMM_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 4 of the Indian Partnership Act 1932, what is the decisive "true test" of a partnership?',
    options: [
      'Sharing of gross receipts',
      'Mutual agency — business carried on by all or any of them acting for all',
      'Co-ownership of fixed commercial property',
      'Equal capital contribution by all members',
    ],
    correctIndex: 1,
    explanation: 'Section 6 of the Partnership Act confirms that profit sharing is prima facie evidence, but mutual agency is the conclusive test of partnership.',
    hints: [
      'Think about whether one person can act as both agent and principal for others.',
      'Mere co-ownership or sharing gross receipts does not create a firm.',
      'Mutual agency means each partner acts on behalf of all partners in the ordinary course of business.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_comm_011_s1',
    nodeId: NODE_C11_COMM_011,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following correctly distinguishes a "Sleeping/Dormant Partner" from a "Nominal Partner"?',
    options: [
      'Sleeping partner contributes capital and shares profits; Nominal partner lends name without capital or profit share',
      'Sleeping partner has zero liability; Nominal partner has unlimited liability',
      'Sleeping partner is visible to the public; Nominal partner is hidden from the public',
      'Sleeping partner actively manages; Nominal partner only provides loans',
    ],
    correctIndex: 0,
    explanation: 'A sleeping partner contributes capital and shares profits but does not participate in management. A nominal partner contributes no capital, receives no profits, but lends their name (and is liable under Section 28 holding out).',
    hints: [
      'Does a sleeping partner invest real money? Yes.',
      'Does a nominal partner invest money or receive profit? No, they only lend their name.',
      'Both have liability to third parties, but only the sleeping partner shares the profit.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_comm_011_a1',
    nodeId: NODE_C11_COMM_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Mr. Rathi, a renowned retired banker, allows a textile firm "Rathi & Sons" to use his name on its signboards. A vendor gives ₹25 lakh credit relying on his reputation. The firm defaults. What is Mr. Rathi\'s legal status?',
    options: [
      'He is not liable because he signed no contract',
      'Partner by Estoppel / Holding Out (Section 28) — personally liable for ₹25 lakh',
      'Secret Partner with liability capped at ₹1,000',
      'Minor admitted to benefits with zero personal liability',
    ],
    correctIndex: 1,
    explanation: 'Under Section 28, anyone who knowingly represents or permits themselves to be represented as a partner is liable to third parties who extended credit on that faith.',
    hints: [
      'Did Mr. Rathi allow his name to induce trust among suppliers?',
      'Section 28 covers holding out / estoppel.',
      'He cannot disclaim liability after inducing third parties to extend credit.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_comm_012_f1',
    nodeId: NODE_C11_COMM_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Is registration of a partnership firm compulsory in India under the Indian Partnership Act 1932?',
    options: [
      'Yes — Unregistered firms are illegal and shut down by police',
      'No — Section 58 uses "may"; non-registration is legal but carries procedural disabilities under Section 69',
      'Yes — All partnerships must register with SEBI within 7 days',
      'No — Only CA and law firms are allowed to register',
    ],
    correctIndex: 1,
    explanation: 'Registration is optional under Section 58. An unregistered firm is legal, but Section 69 prevents it from suing third parties or partners to enforce contract rights.',
    hints: [
      'Look at the wording of Section 58 ("may be effected").',
      'An unregistered firm can still legally operate and enter contracts.',
      'The punishment is procedural: the firm cannot sue third parties in court.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_comm_012_s1',
    nodeId: NODE_C11_COMM_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Vendor X owes ₹15 lakh to an unregistered partnership firm "Apex Traders", while Apex Traders owes ₹20 lakh to Vendor X. Vendor X sues Apex. What can Apex legally do in court?',
    options: [
      'Apex can file a countersuit and claim ₹15 lakh set-off',
      'Apex cannot claim a set-off or countersue due to Section 69, but Vendor X can enforce the full ₹20 lakh',
      'The court will dismiss Vendor X\'s case because Apex is unregistered',
      'Apex can dissolve Vendor X by filing Form INC-22',
    ],
    correctIndex: 1,
    explanation: 'The Section 69 bar is asymmetric (one-way). Third parties CAN sue the unregistered firm, but the firm cannot sue outsiders nor claim a set-off exceeding ₹100.',
    hints: [
      'Is the Section 69 bar a two-way street or one-way?',
      'Can third parties sue an unregistered firm? Yes, always.',
      'The unregistered firm cannot sue or claim set-off in defense.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_comm_013_s1',
    nodeId: NODE_C11_COMM_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare Sole Proprietorship vs Partnership regarding liability and decision speed:',
    options: [
      'Sole Prop: Unlimited & quick decisions; Partnership: Unlimited (joint & several) & slower consensus',
      'Sole Prop: Limited liability; Partnership: Unlimited liability',
      'Sole Prop: Slower decisions; Partnership: Quick autonomous decisions',
      'Sole Prop: Minimum 2 owners; Partnership: Maximum 200 owners',
    ],
    correctIndex: 0,
    explanation: 'Sole proprietors decide alone (fast) with personal unlimited liability. Partnerships have joint & several unlimited liability (Section 25) and require consensus (slower).',
    hints: [
      'How many people must agree in a sole proprietorship? Just one.',
      'In partnership, liability is shared jointly and severally across all partners.',
      'Consensus among partners slows down strategic shifts.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_comm_014_f1',
    nodeId: NODE_C11_COMM_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What foundational landmark English legal case established the doctrine of Separate Legal Entity / Corporate Veil?',
    options: [
      'Carlill v. Carbolic Smoke Ball Co.',
      'Salomon v. Salomon & Co. Ltd (1897 AC 22)',
      'Ashbury Railway Carriage v. Riche',
      'Royal British Bank v. Turquand',
    ],
    correctIndex: 1,
    explanation: 'Salomon v. Salomon & Co. Ltd established that a company is an artificial person independent of its shareholders, so its debts are not personal debts of the owners.',
    hints: [
      'Think of the leather boot manufacturer who sold his business to his own family company.',
      'The House of Lords ruled in 1897 that the company is a separate person.',
      'The case is Salomon v. Salomon & Co. Ltd.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_comm_014_s1',
    nodeId: NODE_C11_COMM_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Under the Companies Act 2013, which pair correctly matches the minimum members for Private vs Public companies?',
    options: [
      'Private: 2 members (1 for OPC); Public: 7 members',
      'Private: 7 members; Public: 50 members',
      'Private: 1 member; Public: 200 members',
      'Private: 10 members; Public: Unlimited',
    ],
    correctIndex: 0,
    explanation: 'Section 2(68) specifies a private company requires at least 2 members (or 1 for an OPC under Section 2(62)), capped at 200. Section 2(71) requires a minimum of 7 for a public company with no upper limit.',
    hints: [
      'A private company needs at least a pair of founders (or 1 for One Person Company).',
      'A public company requires at least 7 subscribers to its MOA.',
      'The maximum for private is 200 (excluding employees).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_comm_014_a1',
    nodeId: NODE_C11_COMM_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When will Indian courts lift ("pierce") the corporate veil despite the Salomon principle?',
    options: [
      'Whenever the company makes a quarterly net loss',
      'When the corporate form is used as a sham/facade for fraud, tax evasion, or circumventing statutory duty (e.g. Satyam / LIC v. Escorts)',
      'Whenever an employee resigns without notice',
      'Never — the corporate veil is absolute and permanently impenetrable under Section 9',
    ],
    correctIndex: 1,
    explanation: 'Courts pierce the corporate veil to unmask the human controllers when the corporate vehicle is abused for fraud, money laundering, tax evasion, or illegal activities.',
    hints: [
      'Is the corporate shield a license to commit fraud?',
      'Cases like Satyam (2009) and LIC v. Escorts (1986) pierced the veil.',
      'The corporate personality yields to equity and justice when abused.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_comm_015_f1',
    nodeId: NODE_C11_COMM_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How is a "Promoter" defined under Section 2(69) of the Companies Act 2013?',
    options: [
      'Any stockbroker who buys more than 100 shares during an IPO',
      'A person named in the prospectus/annual return, or who exercises control, or on whose directions the Board is accustomed to act',
      'The Registrar of Companies appointed by the Ministry of Corporate Affairs',
      'The Chief Financial Officer who prepares annual income tax filings',
    ],
    correctIndex: 1,
    explanation: 'Section 2(69) provides a 3-limb statutory definition: (a) named in prospectus/annual return, (b) having direct/indirect control, (c) shadow promoter guiding the Board.',
    hints: [
      'The 2013 Act was the first in India to statutorily define promoter.',
      'It covers formal promoters, controlling shareholders, and shadow directors.',
      'Look for the 3-limb definition.',
    ],
  },
  {
    id: 'ch_comm_015_s1',
    nodeId: NODE_C11_COMM_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Before incorporation, promoter Kabir signs a 3-year office lease for "CloudNova Pvt Ltd (to be formed)". After incorporation, who is legally bound by the lease?',
    options: [
      'The company is automatically bound by operation of law',
      'Kabir remains personally liable until the company formally ratifies the contract and the landlord agrees to novate',
      'The lease automatically becomes void and illegal',
      'The Registrar of Companies must pay the rent',
    ],
    correctIndex: 1,
    explanation: 'Pre-incorporation contracts do not automatically bind an unborn company. Under Section 15D of the Specific Relief Act / Companies Act principles, the promoter is personally liable until ratification and novation.',
    hints: [
      'Can an unborn company enter into a contract before its birth?',
      'The promoter signs in personal capacity until the company ratifies.',
      'Novation releases the promoter and binds the new corporate entity.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_comm_016_f1',
    nodeId: NODE_C11_COMM_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which integrated electronic web form on the MCA21 portal handles name reservation, incorporation, DIN, PAN, TAN, EPFO, ESIC, and GSTIN simultaneously?',
    options: ['SPICe+ (INC-32)', 'Form PAS-3', 'Schedule III', 'Form Form-A'],
    correctIndex: 0,
    explanation: 'SPICe+ (Simplified Proforma for Incorporating Company Electronically Plus), introduced in 2020, bundles 10 incorporation and statutory registrations into one unified filing.',
    hints: [
      'It was introduced by MCA in 2020 to boost Ease of Doing Business.',
      'Part A is name reservation, Part B is incorporation.',
      'The form is SPICe+.',
    ],
  },
  {
    id: 'ch_comm_016_s1',
    nodeId: NODE_C11_COMM_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the conclusive legal effect of the Certificate of Incorporation (Form INC-11) issued under Section 7?',
    options: [
      'It serves as a temporary trading permit valid for 30 days only',
      'It is conclusive evidence that all incorporation requirements have been complied with and marks the legal birth of the separate entity',
      'It exempts the company from paying Corporate Income Tax forever',
      'It automatically lists the company on the National Stock Exchange',
    ],
    correctIndex: 1,
    explanation: 'As settled in Moosa Goolam Arif v. Ebrahim Goolam Ariff, the Certificate of Incorporation is conclusive proof of due formation and gives birth to the separate legal person with its 21-digit CIN.',
    hints: [
      'Think of it as the company\'s official birth certificate.',
      'Can someone challenge defects in prior paperwork after the certificate is issued? No.',
      'The certificate conclusively establishes legal existence.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_comm_017_s1',
    nodeId: NODE_C11_COMM_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Bharat Solar Ltd issues ₹200 crore worth of public equity. What is the MINIMUM subscription (in ₹ crore) required under SEBI ICDR / Section 39 to avoid refunding all monies?',
    correctAnswer: 180,
    tolerance: 0,
    unit: '₹ crore',
    explanation: 'Under SEBI ICDR Regulations 2018 and Section 39, the minimum subscription for a public issue is 90% of the total issue size (90% of ₹200 crore = ₹180 crore).',
    hints: [
      'What percentage of the issue must be subscribed by the public?',
      'SEBI mandates a 90% threshold.',
      '90% of 200 = 180 crore.',
    ],
  },
  {
    id: 'ch_comm_017_a1',
    nodeId: NODE_C11_COMM_017,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do Commencement of Business requirements under Section 10A differ between Private and Public companies?',
    options: [
      'Private: Only files director declaration Form INC-20A; Public: Must additionally prove minimum subscription & prospectus filing before formal commencement',
      'Private: Requires a formal physical inspection by ROC; Public: Needs no filings',
      'Both must wait 3 years before earning commercial revenue',
      'Private companies are prohibited from ever commencing business',
    ],
    correctIndex: 0,
    explanation: 'Private companies only need to file a declaration that subscribers paid for their shares within 180 days (Form INC-20A). Public companies must achieve minimum subscription and comply with capital raising mandates.',
    hints: [
      'Private companies cannot invite the public, so investor protection rules differ.',
      'Under Section 10A, private companies file a simple director declaration.',
      'Public companies have rigorous prospectus and subscription checkpoints.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_comm_018_f1',
    nodeId: NODE_C11_COMM_018,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the 4 MOA clauses to their matching legal descriptions on the corporate charter.',
    dragItems: [
      { label: 'Name Clause', targetId: 'box_name' },
      { label: 'Situation Clause', targetId: 'box_situation' },
      { label: 'Object Clause', targetId: 'box_object' },
      { label: 'Capital Clause', targetId: 'box_capital' },
    ],
    correctMapping: {
      box_name: 'Name Clause',
      box_situation: 'Situation Clause',
      box_object: 'Object Clause',
      box_capital: 'Capital Clause',
    },
    explanation: 'The Memorandum of Association contains 6 fundamental clauses: Name, Situation (Registered Office state), Object (scope/ultra vires boundary), Liability, Capital, and Subscription.',
    hints: [
      'Where does the company state what state its headquarters is in? Situation clause.',
      'Which clause defines the core business scope? Object clause.',
      'Which clause specifies the company name with "Limited" or "Pvt Ltd"? Name clause.',
    ],
  },
  {
    id: 'ch_comm_018_s1',
    nodeId: NODE_C11_COMM_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the fundamental difference between an act in breach of the MOA Object Clause vs an act in breach of the AOA?',
    options: [
      'MOA breach is ultra vires and VOID (cannot be ratified); AOA breach is an internal irregularity (can be ratified by shareholders)',
      'MOA breach is fine; AOA breach leads to immediate criminal jailing of all shareholders',
      'Both are automatically valid if approved by the local police',
      'MOA relates to internal meetings; AOA defines the external charter',
    ],
    correctIndex: 0,
    explanation: 'As established in Ashbury Railway Carriage v. Riche (1875), acts beyond the MOA Object Clause are ultra vires and void ab initio. AOA violations are internal irregularities ratifiable by shareholders.',
    hints: [
      'Remember the ultra vires doctrine.',
      'Can shareholders ratify an act that is completely outside the MOA object clause? No, never.',
      'AOA rules are internal bylaws and can be cured/ratified by general resolution.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_comm_019_s1',
    nodeId: NODE_C11_COMM_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When is a "Statement in Lieu of Prospectus" (Schedule III) filed with the ROC instead of a standard Prospectus?',
    options: [
      'When a public company raises initial capital privately without public invitation, but later accesses the public within 2 years',
      'When a private company wants to advertise on national television',
      'Whenever a company changes its statutory auditor',
      'When the company is declared bankrupt',
    ],
    correctIndex: 0,
    explanation: 'Under Section 70 / Schedule III, a public company that did not issue a prospectus because it arranged capital privately must file a Statement in Lieu of Prospectus with the ROC.',
    hints: [
      '"In lieu of" means "in place of".',
      'If capital was arranged through private connections, no public prospectus was circulated.',
      'The statement provides official ROC disclosure of the private arrangement.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_comm_020_f1',
    nodeId: NODE_C11_COMM_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 43 of the Companies Act 2013, what are the ONLY two statutory types of share capital permitted in India?',
    options: [
      'Equity Share Capital and Preference Share Capital',
      'Deferred Shares and Founders Shares',
      'Bearer Warrants and Promissory Notes',
      'Government Bonds and Mutual Funds',
    ],
    correctIndex: 0,
    explanation: 'The Companies Act 2013 abolished deferred/founders shares. Section 43 allows only Equity and Preference share capital (equity may carry differential voting rights).',
    hints: [
      'The 2013 Act simplified share classes into two broad categories.',
      'One class has fixed dividend preference; the other bears residual ownership risk.',
      'The two types are Equity and Preference.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_comm_020_s1',
    nodeId: NODE_C11_COMM_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'NexGen Ltd has 10,000 Cumulative 10% Preference Shares of ₹100 face value (Total ₹10,00,000). The company paid NO dividend in Year 1 or Year 2. In Year 3, the board declares ₹4,50,000 total dividend. How much preference dividend (in ₹) MUST be paid before equity gets anything?',
    correctAnswer: 300000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Annual preference dividend = 10% of ₹10,00,000 = ₹1,00,000. Cumulative shares accumulate arrears: Year 1 (₹1L) + Year 2 (₹1L) + Year 3 (₹1L) = ₹3,00,000 total claim before equity gets ₹1,50,000.',
    hints: [
      'Calculate the yearly dividend: 10,000 shares * ₹100 * 10% = ₹1,00,000 per year.',
      'Since they are cumulative, arrears from skipped years carry forward.',
      'Total preference payout = 3 years * ₹1,00,000 = ₹3,00,000.',
    ],
  },
  {
    id: 'ch_comm_020_a1',
    nodeId: NODE_C11_COMM_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Distinguish between "Bonus Shares" (Section 63) and "Sweat Equity Shares" (Section 54):',
    options: [
      'Bonus shares are issued free to existing shareholders by capitalising reserves; Sweat equity is issued to employees/directors for know-how/IP value addition',
      'Bonus shares are for employees only; Sweat equity is for preference shareholders',
      'Bonus shares carry 10x voting rights; Sweat equity carries zero dividend rights',
      'Bonus shares bring in fresh cash; Sweat equity is illegal under SEBI regulations',
    ],
    correctIndex: 0,
    explanation: 'Bonus shares capitalise free reserves and go free to existing equity holders. Sweat equity rewards employees/directors for intellectual property or value additions (non-cash contribution).',
    hints: [
      'Where does the value come from in bonus shares? Accumulated company reserves.',
      'Why is "sweat" in the name of sweat equity? It rewards human effort, know-how, and IP.',
      'Bonus shares require no new contribution; sweat equity requires intellectual or technical value addition.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_comm_formation_sort',
    nodeId: NODE_C11_COMM_015,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Arrange the 4 primary stages of establishing a Public Joint Stock Company in chronological order.',
    sortItems: [
      'Stage 1: Promotion (Idea, Feasibility & SPICe+ Part A Name Reservation)',
      'Stage 2: Incorporation (Filing SPICe+ Part B & getting Certificate of Incorporation Form INC-11)',
      'Stage 3: Capital Subscription (Issue of Prospectus & achieving 90% Minimum Subscription)',
      'Stage 4: Commencement of Business (Filing Form INC-20A / INC-22A ACTIVE for trading approval)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Company formation follows a strict statutory sequence: Promotion → Incorporation → Capital Subscription (Public Co.) → Commencement of Business.',
    hints: [
      'Does promotion come before or after legal birth?',
      'Incorporation creates the legal person before that person can invite the public for funds.',
      'Trading permission (commencement) is the final milestone.',
    ],
  },
  {
    id: 'ch_comm_construct_1',
    nodeId: NODE_C11_COMM_014,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the legal statement explaining why Salomon v. Salomon protects shareholders:',
    availableParts: [
      'A registered company is',
      'an artificial legal person',
      'distinct from its members',
      'with limited liability',
    ],
    targetState: 'A registered company is an artificial legal person distinct from its members with limited liability',
    validationHint: 'Combine: Subject → Entity nature → Separation principle → Liability consequence',
    explanation: 'The Salomon ruling established that the company is an artificial person distinct from its members, capping shareholder liability at unpaid share capital.',
    hints: [
      'Start with "A registered company is"',
      'Add the legal status: "an artificial legal person"',
      'Add the separation: "distinct from its members"',
      'End with the liability protection: "with limited liability"',
    ],
  },
];

// ============================================================================
// 5. PROPS & DEFAULT VALUES
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
  nodeId: 'c11_comm_011',
  title: 'Forms of Business Organisation — Partnership & Company Law',
  definition:
    'A comprehensive examination of Indian business structures under the Indian Partnership Act 1932 and the Companies Act 2013, encompassing mutual agency, registration consequences under Section 69, promotion, incorporation via SPICe+, capital subscription, constitutional documents (MOA/AOA), and share capital dynamics.',
  eli5:
    'Partnership is teaming up with friends where everyone is responsible for each other\'s actions. A company is like creating a legally recognized puppet that owns things itself, so if things fail, you only lose the money you put into the puppet, not your own home.',
  misconceptions: [
    {
      misconception: 'A sleeping partner does not share profits because they do not manage.',
      correction:
        'Sleeping partners DO invest capital and DO share profits; they simply abstain from day-to-day active management.',
    },
    {
      misconception: 'An unregistered partnership is illegal and can be shut down.',
      correction:
        'Unregistered partnerships are 100% legal; they only suffer procedural disability under Section 69 (cannot sue third parties or partners).',
    },
    {
      misconception: 'The corporate veil protects promoters from liability even when committing fraud.',
      correction:
        'Courts pierce the corporate veil in cases of fraud, tax evasion, or statutory evasion (e.g. Satyam, LIC v. Escorts).',
    },
    {
      misconception: 'Shareholders can ratify an act done by directors that violates the MOA Object Clause.',
      correction:
        'Acts outside the MOA Object Clause are ultra vires and void ab initio; no shareholder majority can ratify them.',
    },
    {
      misconception: 'Preference shareholders are always guaranteed an 8% dividend every year regardless of profits.',
      correction:
        'The dividend rate is fixed, but payment is contingent on the Board declaring a divisible profit.',
    },
  ],
  masteryCriteria:
    'Mastery of CISCE Class 11 Commerce principles spanning Partnership (IPA 1932) and Company Law (Companies Act 2013), verified across 20+ NEP competency challenges.',
};

// ============================================================================
// 6. EXPLORATION LAB STEPS
// ============================================================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Mutual Agency & Partner Types (Network Model)',
    instruction: 'Click on each partner node to toggle their management & liability status.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C11_COMM_011,
  },
  {
    title: 'Lab 2: Section 69 Asymmetric Courtroom Bar Engine',
    instruction: 'Simulate legal actions between the firm and external vendors to observe Section 69 in action.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_012,
  },
  {
    title: 'Lab 3: Salomon Corporate Veil & Piercing Fortress',
    instruction: 'Adjust company debts and personal wealth to observe the corporate shield and veil piercing.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_014,
  },
  {
    title: 'Lab 4: Ultra Vires Boundary Inspector (MOA vs AOA)',
    instruction: 'Test various business activities against the MOA Object Clause to detect Ultra Vires breaches.',
    interactionType: 'drag-classify',
    nodeId: NODE_C11_COMM_018,
  },
  {
    title: 'Lab 5: Dividend Waterfall Engine (Cumulative Preference vs Equity)',
    instruction: 'Adjust the annual company profit slider to see how dividends flow through preference arrears to equity.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_020,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Executive Legal Architect: Launch Your Indian Enterprise',
  description:
    'Draft your own venture structure. Choose between Partnership, Private Ltd, or Public Ltd. Specify your MOA object clause, determine initial equity/preference share ratios, and simulate a ₹50 crore public capital raise.',
  steps: [
    'Choose your firm structure (e.g., TechCraft AI Solutions Pvt Ltd).',
    'Write a concise 2-sentence MOA Object Clause defining your permitted operations.',
    'Formulate your capital structure: calculate Equity vs 9% Cumulative Preference shares.',
    'Audit your compliance: verify CIN structure, SPICe+ filing checklist, and Section 10A commencement.',
  ],
};

// ============================================================================
// 7. MAIN SIMULATION COMPONENT
// ============================================================================
function C11_CommercePartnershipMeaningFeaturesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commerce'] || {
    name: 'Commerce',
    emoji: '📈',
    color: 'emerald',
  };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant-style Interactive Prediction & Observation States
  const [predictionMade, setPredictionMade] = useState<Record<number, boolean>>({});
  const [predictionSelected, setPredictionSelected] = useState<Record<number, number>>({});
  const [observationAnswered, setObservationAnswered] = useState<Record<number, boolean>>({});
  const [observationSelected, setObservationSelected] = useState<Record<number, number>>({});

  // Interactive Lab Simulation States
  const [selectedPartner, setSelectedPartner] = useState<'active' | 'sleeping' | 'nominal' | 'secret'>('active');
  const [partnershipDebt, setPartnershipDebt] = useState(25); // in ₹ Lakhs
  const [isRegistered, setIsRegistered] = useState(false);
  const [courtResult, setCourtResult] = useState<string>('');

  // Corporate Veil Lab State
  const [companyDebt, setCompanyDebt] = useState(100); // in ₹ Lakhs
  const [promoterPersonalWealth, setPromoterPersonalWealth] = useState(250); // in ₹ Lakhs
  const [fraudCommitted, setFraudCommitted] = useState(false);

  // Ultra Vires Lab State
  const [testedActivity, setTestedActivity] = useState<string | null>(null);

  // Dividend Engine State
  const [annualProfit, setAnnualProfit] = useState(12); // in ₹ Lakhs
  const [missedYears, setMissedYears] = useState(2);
  const [prefType, setPrefType] = useState<'cumulative' | 'non-cumulative'>('cumulative');

  // Adaptive Difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hint & Feedback States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Drag & Sort States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Gamification & Animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection Inputs
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges by current difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Motivational message based on errors
  const motivationalMessage = useMemo(() => {
    if (errors === 0) {
      return {
        title: 'PERFECT SCORE!',
        subtitle: 'Outstanding mastery of Indian Partnership and Company Law!',
        badgeCol: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        icon: '🏆',
      };
    }
    if (errors <= 3) {
      return {
        title: 'Great work!',
        subtitle: 'You demonstrated solid legal analysis and commercial acumen.',
        badgeCol: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
        icon: '⭐',
      };
    }
    if (errors <= 7) {
      return {
        title: 'Good effort!',
        subtitle: 'You are building strong competence — revisit the Section 69 and Ultra Vires rules.',
        badgeCol: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        icon: '👍',
      };
    }
    return {
      title: 'Do not give up — You WILL get this!',
      subtitle: 'Review the step-by-step statutory breakdowns and try the interactive labs again.',
      badgeCol: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
      icon: '💪',
    };
  }, [errors]);

  // Initial load from mastery store
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive effect
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

  // Canvas monitor animation
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

      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 1;
      const spacing = 20;
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const pulse = Math.sin(frame * 0.04) * 4;
      ctx.beginPath();
      ctx.arc(canvas.width - 30, 18, 8 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = isRegistered ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.5)';
      ctx.fill();

      const flowX = (frame * 2) % canvas.width;
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(flowX, canvas.height - 4, 30, 4);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [isRegistered]);

  // Callbacks
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'error');
    speechManager.speak(
      isCorr
        ? 'Excellent intuition! Under Section 25, partners have joint and several liability.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive business law labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test all financial and legal parameters freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Demonstrate your CISCE Commerce mastery.');
  }, []);

  const handlePrediction = useCallback((pIdx: number, optIdx: number) => {
    setPredictionSelected((prev) => ({ ...prev, [pIdx]: optIdx }));
    setPredictionMade((prev) => ({ ...prev, [pIdx]: true }));
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive controls to verify.');
  }, []);

  const handleObservation = useCallback((oIdx: number, optIdx: number) => {
    setObservationSelected((prev) => ({ ...prev, [oIdx]: optIdx }));
    setObservationAnswered((prev) => ({ ...prev, [oIdx]: true }));
    const isCorr = optIdx === OBSERVATION_QUESTIONS[oIdx].correctIndex;
    audioManager.play(isCorr ? 'success' : 'error');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Indian Partnership and Company Law simulation.');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;
      if (!challenge) return;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding analysis.');
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
          speechManager.speak('Let us review the statutory explanation together.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSimulateCourt = useCallback(
    (action: 'firm_sues_vendor' | 'vendor_sues_firm') => {
      audioManager.play('tap');
      if (action === 'firm_sues_vendor') {
        if (!isRegistered) {
          setCourtResult('✗ DISMISSED UNDER SECTION 69: Unregistered firms cannot sue third parties in contract claims.');
          audioManager.play('error');
          speechManager.speak('Suit dismissed! Section 69 bars unregistered firms from suing.');
        } else {
          setCourtResult('✓ ADMITTED & DECREED: Registered firm successfully enforces debt of ₹15 Lakh.');
          audioManager.play('success');
          speechManager.speak('Court admitted claim! The firm is properly registered.');
        }
      } else {
        setCourtResult('✓ SUIT MAINTAINABLE: Vendor sues firm for ₹20 Lakh. Section 69 does NOT protect unregistered firms from outside lawsuits!');
        audioManager.play('pop');
        speechManager.speak('Outside vendor lawsuit is 100% valid. Section 69 is an asymmetric bar.');
      }
    },
    [isRegistered]
  );

  const handleTestUltraVires = useCallback((activity: string) => {
    setTestedActivity(activity);
    audioManager.play('tap');
    if (activity === 'IT Software Development' || activity === 'BPO Services') {
      speechManager.speak('Within MOA Object Clause. Legally Valid and binding.');
    } else {
      speechManager.speak('Breach of Object Clause! Ultra Vires and Void ab initio.');
    }
  }, []);

  // Live Calculations for Waterfall
  const calculatedDividend = useMemo(() => {
    const prefRate = 0.1; // 10%
    const prefCapital = 10; // ₹10 Lakh face value
    const annualPrefObligation = prefCapital * prefRate; // ₹1 Lakh
    const totalPrefRequired =
      prefType === 'cumulative' ? annualPrefObligation * (missedYears + 1) : annualPrefObligation;

    const prefPayout = Math.min(annualProfit, totalPrefRequired);
    const equityResidual = Math.max(0, annualProfit - prefPayout);

    return {
      prefPayout,
      equityResidual,
      unpaidArrears: Math.max(0, totalPrefRequired - prefPayout),
    };
  }, [annualProfit, missedYears, prefType]);

  const dividendChartData = useMemo(() => {
    return [
      { name: 'Available Profit', amount: annualProfit, fill: '#6366f1' },
      { name: 'Preference Dividend', amount: calculatedDividend.prefPayout, fill: '#ec4899' },
      { name: 'Equity Residual', amount: calculatedDividend.equityResidual, fill: '#10b981' },
    ];
  }, [annualProfit, calculatedDividend]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ============================================================================
  // 8. RENDER
  // ============================================================================
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ── Header Bar ── */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium">
              ISC Class 11 Commerce • Indian Partnership Act 1932 & Companies Act 2013
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Mastery: <strong className="text-amber-400 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </header>

      {/* ── Mini 2D Canvas Monitor ── */}
      <div className="mb-4 rounded-xl overflow-hidden border border-slate-800/80 bg-slate-900/60 shadow-inner">
        <canvas ref={canvasRef} width={800} height={36} className="w-full block" />
      </div>

      {/* ── PHASE 1: DISCOVERY HOOK ── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60">
            <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
              Real-World Narrative
            </span>
            <h2 className="text-2xl font-black text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 bg-indigo-950/40 p-3 rounded-lg border border-indigo-900/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>⚡</span> Curiosity Discovery Hook: What Would The Law Decide?
            </h3>
            <p className="text-slate-200 text-sm font-medium leading-snug">
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
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : ''}
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Correct! Under Section 25, partner liability is joint and several, backed by mutual agency.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Launch Interactive Law Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                >
                  Launch Interactive Law Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 2: INTERACTIVE EXPLORATION LABS ── */}
      {phase === 'explore' && (
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              {/* Slide Heading */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-indigo-400">
                    Interactive Discovery Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-amber-300 text-xs mt-1 font-semibold flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 0: Mutual Agency & Partner Types Network ── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
                      <svg viewBox="0 0 500 280" className="w-full h-auto" role="img" aria-label="Diagram of partnership mutual agency network">
                        <circle cx="250" cy="140" r="50" fill="#312e81" stroke="#6366f1" strokeWidth="3" />
                        <text x="250" y="136" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">
                          BHARAT FIRM
                        </text>
                        <text x="250" y="152" textAnchor="middle" fill="#a5b4fc" fontSize="9">
                          Debt: ₹{partnershipDebt} Lakh
                        </text>

                        {[
                          { id: 'active' as const, label: 'Active Partner', cx: 120, cy: 70, col: '#10b981' },
                          { id: 'sleeping' as const, label: 'Sleeping Partner', cx: 380, cy: 70, col: '#3b82f6' },
                          { id: 'nominal' as const, label: 'Nominal Partner', cx: 120, cy: 210, col: '#f59e0b' },
                          { id: 'secret' as const, label: 'Secret Partner', cx: 380, cy: 210, col: '#ec4899' },
                        ].map((p) => {
                          const isSel = selectedPartner === p.id;
                          return (
                            <g
                              key={p.id}
                              role="button"
                              tabIndex={0}
                              aria-label={`Select ${p.label}`}
                              onClick={() => {
                                setSelectedPartner(p.id);
                                audioManager.play('tap');
                              }}
                              className="cursor-pointer"
                            >
                              <line
                                x1={p.cx}
                                y1={p.cy}
                                x2="250"
                                y2="140"
                                stroke={isSel ? p.col : '#334155'}
                                strokeWidth={isSel ? 3 : 1.5}
                                strokeDasharray={p.id === 'nominal' ? '4,4' : 'none'}
                              />
                              <circle
                                cx={p.cx}
                                cy={p.cy}
                                r={isSel ? 34 : 28}
                                fill="#1e293b"
                                stroke={p.col}
                                strokeWidth={isSel ? 3 : 1.5}
                              />
                              <text x={p.cx} y={p.cy - 4} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
                                {p.label.split(' ')[0]}
                              </text>
                              <text x={p.cx} y={p.cy + 10} textAnchor="middle" fill="#94a3b8" fontSize="8">
                                {p.label.split(' ')[1]}
                              </text>
                            </g>
                          );
                        })}
                      </svg>

                      <div className="w-full mt-4 flex items-center justify-between text-xs text-slate-400">
                        <span>Firm Debt Incurred by Partner Action:</span>
                        <strong className="text-rose-400 text-sm">₹{partnershipDebt} Lakh</strong>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={100}
                        value={partnershipDebt}
                        aria-label="Adjust partnership debt amount"
                        onChange={(e) => setPartnershipDebt(Number(e.target.value))}
                        className="w-full accent-indigo-500 mt-1 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs uppercase font-bold text-slate-500">Selected Partner Profile</span>
                        <h4 className="text-lg font-black text-indigo-300 capitalize">{selectedPartner} Partner</h4>

                        <div className="mt-4 space-y-2.5 text-xs">
                          <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                            <span className="text-slate-400">Contributes Capital:</span>
                            <strong className={selectedPartner === 'nominal' ? 'text-rose-400' : 'text-emerald-400'}>
                              {selectedPartner === 'nominal' ? '✗ No (Lends Name Only)' : '✓ Yes'}
                            </strong>
                          </div>
                          <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                            <span className="text-slate-400">Shares Profits:</span>
                            <strong className={selectedPartner === 'nominal' ? 'text-rose-400' : 'text-emerald-400'}>
                              {selectedPartner === 'nominal' ? '✗ No' : '✓ Yes'}
                            </strong>
                          </div>
                          <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                            <span className="text-slate-400">Manages Operations:</span>
                            <strong className={selectedPartner === 'active' || selectedPartner === 'secret' ? 'text-emerald-400' : 'text-slate-500'}>
                              {selectedPartner === 'active' || selectedPartner === 'secret' ? '✓ Yes' : '✗ No'}
                            </strong>
                          </div>
                          <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                            <span className="text-slate-400">Personal Liability to Outsiders:</span>
                            <strong className="text-rose-400">
                              ⚠️ UNLIMITED (Joint & Several)
                            </strong>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 mt-4 italic bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-900/40">
                        💡 Even dormant & nominal partners risk personal assets for the full ₹{partnershipDebt} Lakh under Section 25 & 28!
                      </p>
                    </div>
                  </div>

                  {/* Observation Question 1 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/40 space-y-3">
                    <span className="text-xs uppercase font-extrabold text-amber-400 flex items-center gap-1.5">
                      <span>🔍</span> Brilliant Observation Check (What Do You Notice?)
                    </span>
                    <p className="text-sm font-semibold text-slate-200">{OBSERVATION_QUESTIONS[0].prompt}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          aria-label={`Observation option ${String.fromCharCode(65 + i)}: ${opt}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(0, i)}
                          disabled={observationAnswered[0]}
                          className={`p-3 rounded-lg text-left text-xs font-medium border transition-all ${
                            observationAnswered[0] && i === OBSERVATION_QUESTIONS[0].correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : observationAnswered[0] && i === observationSelected[0]
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-1.5 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                    {observationAnswered[0] && (
                      <p className="text-xs text-emerald-400 font-semibold mt-2">
                        ✓ {OBSERVATION_QUESTIONS[0].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 1: Section 69 Asymmetric Courtroom Bar Engine ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 200" className="w-full h-auto" role="img" aria-label="Section 69 Asymmetric Legal Bar Architecture">
                      <rect x="20" y="50" width="150" height="100" rx="12" fill={isRegistered ? '#064e3b' : '#450a0a'} stroke={isRegistered ? '#10b981' : '#ef4444'} strokeWidth="2" />
                      <text x="95" y="85" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                        {isRegistered ? 'REGISTERED FIRM' : 'UNREGISTERED FIRM'}
                      </text>
                      <text x="95" y="105" textAnchor="middle" fill={isRegistered ? '#6ee7b7' : '#fca5a5'} fontSize="10">
                        {isRegistered ? '✓ Section 59 Complied' : '✗ Section 69 Barred'}
                      </text>

                      <rect x="430" y="50" width="150" height="100" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="505" y="85" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                        THIRD PARTY / VENDOR
                      </text>
                      <text x="505" y="105" textAnchor="middle" fill="#c7d2fe" fontSize="10">
                        Outside Creditor / Debtor
                      </text>

                      <circle cx="300" cy="100" r="32" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                      <text x="300" y="96" textAnchor="middle" fill="#fbbf24" fontSize="18">⚖️</text>
                      <text x="300" y="118" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">CIVIL COURT</text>

                      <path d="M 170 75 Q 300 40 430 75" fill="none" stroke={isRegistered ? '#10b981' : '#ef4444'} strokeWidth="3" strokeDasharray={isRegistered ? 'none' : '4,4'} />
                      <text x="300" y="32" textAnchor="middle" fill={isRegistered ? '#34d399' : '#f87171'} fontSize="9" fontWeight="bold">
                        {isRegistered ? '✓ Lawsuit Permitted (Enforceable)' : '✗ Lawsuit BARRED under Sec 69'}
                      </text>

                      <path d="M 430 125 Q 300 160 170 125" fill="none" stroke="#10b981" strokeWidth="3" />
                      <text x="300" y="176" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                        ✓ Outsider ALWAYS Permitted to Sue Firm
                      </text>
                    </svg>
                  </div>

                  {/* Prediction Question 2 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/40 space-y-3">
                    <span className="text-xs uppercase font-extrabold text-indigo-400">
                      Predict Before You Test: {PREDICTION_QUESTIONS[1].verifyInstruction}
                    </span>
                    <p className="text-sm font-semibold text-slate-200">{PREDICTION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          aria-label={`Prediction option ${String.fromCharCode(65 + i)}: ${opt}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(1, i)}
                          className={`p-2.5 rounded-lg text-left text-xs font-medium border transition-all ${
                            predictionMade[1] && i === PREDICTION_QUESTIONS[1].correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : predictionMade[1] && i === predictionSelected[1]
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-1 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-400">Firm Registration Status:</span>
                      <h4 className={`text-base font-bold ${isRegistered ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isRegistered ? '✓ REGISTERED FIRM (Section 59 Complied)' : '✗ UNREGISTERED FIRM'}
                      </h4>
                    </div>
                    <motion.button
                      aria-label="Toggle firm registration status"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsRegistered((r) => !r);
                        audioManager.play('pop');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold ${
                        isRegistered ? 'bg-rose-900/60 text-rose-300 border border-rose-600' : 'bg-emerald-600 text-white shadow-lg'
                      }`}
                    >
                      {isRegistered ? '✗ Deregister Firm' : '✓ Register Firm with Registrar'}
                    </motion.button>
                  </div>

                  {/* Courtroom Trial Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-sm font-bold text-slate-200">Scenario A: Firm Sues Defaulting Buyer (₹15 Lakh)</h4>
                      <p className="text-xs text-slate-400">Buyer received goods but refused payment. Firm files suit in Civil Court.</p>
                      <motion.button
                        aria-label="File recovery suit against buyer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSimulateCourt('firm_sues_vendor')}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                      >
                        File Recovery Suit Against Buyer →
                      </motion.button>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-sm font-bold text-slate-200">Scenario B: Raw Material Supplier Sues Firm (₹20 Lakh)</h4>
                      <p className="text-xs text-slate-400">Firm defaulted on fabric purchase. Supplier drags firm to court.</p>
                      <motion.button
                        aria-label="Supplier files lawsuit against firm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSimulateCourt('vendor_sues_firm')}
                        className="w-full py-2.5 bg-rose-700 hover:bg-rose-600 text-white rounded-xl text-xs font-bold"
                      >
                        Supplier Files Lawsuit Against Firm →
                      </motion.button>
                    </div>
                  </div>

                  {courtResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-xs font-medium text-slate-200"
                    >
                      <strong className="text-amber-300 block mb-1">Judicial Verdict:</strong>
                      {courtResult}
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── LAB 2: Salomon Corporate Veil & Piercing Fortress ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 200" className="w-full h-auto" role="img" aria-label="Salomon corporate veil and separation shield">
                      <rect x="30" y="30" width="180" height="140" rx="16" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                      <text x="120" y="60" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">PROMOTER PERSONAL ESTATE</text>
                      <text x="120" y="85" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">₹{promoterPersonalWealth} Lakh</text>
                      <text x="120" y="110" textAnchor="middle" fill="#64748b" fontSize="10">Villas, Stocks & Savings</text>
                      <text x="120" y="135" textAnchor="middle" fill={fraudCommitted ? '#ef4444' : '#10b981'} fontSize="11" fontWeight="bold">
                        {fraudCommitted ? '⚠️ Exposed to Seizure' : '✓ Protected by Law'}
                      </text>

                      <rect x="260" y="20" width="80" height="160" rx="10" fill={fraudCommitted ? '#7f1d1d' : '#1e1b4b'} stroke={fraudCommitted ? '#ef4444' : '#818cf8'} strokeWidth="3" strokeDasharray={fraudCommitted ? '6,6' : 'none'} />
                      <text x="300" y="80" textAnchor="middle" fill="#fff" fontSize="18">{fraudCommitted ? '⚡' : '🛡️'}</text>
                      <text x="300" y="105" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
                        {fraudCommitted ? 'VEIL PIERCED' : 'SALOMON VEIL'}
                      </text>
                      <text x="300" y="125" textAnchor="middle" fill="#cbd5e1" fontSize="8">
                        {fraudCommitted ? 'Sec 447 Fraud' : 'Sec 9 Separate'}
                      </text>

                      <rect x="390" y="30" width="180" height="140" rx="16" fill="#0f172a" stroke="#ec4899" strokeWidth="2" />
                      <text x="480" y="60" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="bold">COMPANY DEBTS & SUITS</text>
                      <text x="480" y="85" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">₹{companyDebt} Lakh</text>
                      <text x="480" y="110" textAnchor="middle" fill="#64748b" fontSize="10">Vendor Liabilities</text>
                      <text x="480" y="135" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
                        Artificial Legal Person
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-sm font-bold text-indigo-300">Company vs Promoter Balance Sheet</h4>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Company Outstanding Debt:</span>
                          <strong className="text-rose-400">₹{companyDebt} Lakh</strong>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={500}
                          value={companyDebt}
                          aria-label="Adjust company outstanding debt"
                          onChange={(e) => setCompanyDebt(Number(e.target.value))}
                          className="w-full accent-rose-500 mt-1 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Promoter Personal Estate (Villas/Bonds):</span>
                          <strong className="text-emerald-400">₹{promoterPersonalWealth} Lakh</strong>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={1000}
                          value={promoterPersonalWealth}
                          aria-label="Adjust promoter personal wealth"
                          onChange={(e) => setPromoterPersonalWealth(Number(e.target.value))}
                          className="w-full accent-emerald-500 mt-1 cursor-pointer"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-300">Simulate Intentional Fraud / Sham Scheme:</span>
                        <input
                          type="checkbox"
                          checked={fraudCommitted}
                          aria-label="Simulate intentional corporate fraud"
                          onChange={(e) => {
                            setFraudCommitted(e.target.checked);
                            audioManager.play('pop');
                            if (e.target.checked) speechManager.speak('Corporate Veil Pierced! The court will attach personal assets.');
                          }}
                          className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs uppercase font-bold text-slate-500">Legal Status</span>
                        <h4 className="text-base font-bold text-white mt-1">
                          {fraudCommitted ? '⚠️ Corporate Veil Lifted (Section 447)' : '🛡️ Corporate Veil Intact (Salomon Doctrine)'}
                        </h4>

                        <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                          {fraudCommitted
                            ? `Fraud proven! The court penetrates the corporate entity. Creditors CAN seize ₹${Math.min(companyDebt, promoterPersonalWealth)} Lakh from the promoter's personal estate.`
                            : `Under Salomon v. Salomon (1897), the company is an independent legal person. Creditors CANNOT touch the promoter's ₹${promoterPersonalWealth} Lakh personal wealth; their claim is limited strictly to company assets.`}
                        </p>
                      </div>

                      <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                        <strong>Indian Precedent:</strong> In <em>LIC v. Escorts (1986)</em> and the <em>Satyam Scam (2009)</em>, the Supreme Court held that the corporate veil yields whenever it is used to defeat public convenience or commit fraud.
                      </div>
                    </div>
                  </div>

                  {/* Observation Question 2 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/40 space-y-3">
                    <span className="text-xs uppercase font-extrabold text-amber-400 flex items-center gap-1.5">
                      <span>🔍</span> Brilliant Observation Check (What Do You Notice?)
                    </span>
                    <p className="text-sm font-semibold text-slate-200">{OBSERVATION_QUESTIONS[1].prompt}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          aria-label={`Observation option ${String.fromCharCode(65 + i)}: ${opt}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(1, i)}
                          disabled={observationAnswered[1]}
                          className={`p-3 rounded-lg text-left text-xs font-medium border transition-all ${
                            observationAnswered[1] && i === OBSERVATION_QUESTIONS[1].correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : observationAnswered[1] && i === observationSelected[1]
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-1.5 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                    {observationAnswered[1] && (
                      <p className="text-xs text-emerald-400 font-semibold mt-2">
                        ✓ {OBSERVATION_QUESTIONS[1].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 3: MOA Ultra Vires Inspector ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 200" className="w-full h-auto" role="img" aria-label="MOA Object Clause Ultra Vires Boundary Inspector">
                      <rect x="20" y="20" width="560" height="160" rx="16" fill="#1c1917" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,4" />
                      <text x="50" y="45" fill="#ef4444" fontSize="11" fontWeight="bold">⚠️ ULTRA VIRES ZONE (Void Ab Initio - Cannot Ratify)</text>

                      <rect x="80" y="60" width="440" height="100" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
                      <text x="300" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        MOA OBJECT CLAUSE BOUNDARY (Clause III)
                      </text>
                      <text x="300" y="112" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        "IT Software, Cloud Architecture & BPO Consulting"
                      </text>
                      <text x="300" y="135" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">
                        ✓ INTRA VIRES: Fully Valid & Legally Enforceable
                      </text>
                    </svg>
                  </div>

                  <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60">
                    <span className="text-xs text-indigo-400 font-bold uppercase">Charter Document Inspector</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">
                      TechCraft Solutions Ltd — MOA Object Clause (Clause III)
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 italic">
                      "To carry on the business of computer programming, cloud software architecture, BPO consulting and data analytics in India and abroad."
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 font-semibold">Test whether the Board has legal authority to execute these contracts:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'IT Software Development', valid: true },
                      { name: 'Acquire Goa Luxury Casino Hotel', valid: false },
                      { name: 'BPO Services Expansion', valid: true },
                    ].map((item, idx) => (
                      <motion.button
                        key={idx}
                        aria-label={`Test contract activity: ${item.name}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTestUltraVires(item.name)}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                          testedActivity === item.name
                            ? item.valid
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {item.name}
                      </motion.button>
                    ))}
                  </div>

                  {testedActivity && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs leading-relaxed"
                    >
                      <strong className="text-amber-300">Analysis: </strong>
                      {testedActivity === 'Acquire Goa Luxury Casino Hotel' ? (
                        <span className="text-rose-300">
                          <strong>✗ ULTRA VIRES AND VOID AB INITIO!</strong> (Ashbury Railway Carriage v. Riche). Running a casino is completely outside the software object clause. Even a 100% unanimous shareholder vote cannot ratify this contract!
                        </span>
                      ) : (
                        <span className="text-emerald-300">
                          <strong>✓ INTRA VIRES AND VALID.</strong> This activity falls directly within the lawful scope sanctioned by the MOA Object Clause.
                        </span>
                      )}
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── LAB 4: Dividend Waterfall & Recharts ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-sm font-bold text-indigo-300">Profit & Arrears Controls</h4>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Current Year Distributable Profit:</span>
                          <strong className="text-indigo-400">₹{annualProfit} Lakh</strong>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={30}
                          value={annualProfit}
                          aria-label="Adjust current year distributable profit"
                          onChange={(e) => setAnnualProfit(Number(e.target.value))}
                          className="w-full accent-indigo-500 mt-1 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Past Skipped Dividend Years (Zero Profit):</span>
                          <strong className="text-amber-400">{missedYears} Years</strong>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={4}
                          value={missedYears}
                          aria-label="Adjust past skipped dividend years"
                          onChange={(e) => setMissedYears(Number(e.target.value))}
                          className="w-full accent-amber-500 mt-1 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <span className="text-xs text-slate-300">Preference Share Type:</span>
                        <div className="flex gap-2">
                          {(['cumulative', 'non-cumulative'] as const).map((t) => (
                            <button
                              key={t}
                              aria-label={`Select ${t} preference share type`}
                              onClick={() => {
                                setPrefType(t);
                                audioManager.play('tap');
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize ${
                                prefType === t ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1.5 border border-slate-800">
                        <div className="flex justify-between text-slate-300">
                          <span>10% Preference Share Claim:</span>
                          <strong className="text-pink-400">₹{calculatedDividend.prefPayout} Lakh</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Equity Residual Shareholder Claim:</span>
                          <strong className="text-emerald-400">₹{calculatedDividend.equityResidual} Lakh</strong>
                        </div>
                      </div>
                    </div>

                    {/* Recharts Dividend Waterfall Visualisation */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Dividend Distribution Waterfall
                      </h4>
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={dividendChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                            <YAxis stroke="#94a3b8" fontSize={10} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                            />
                            <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                              {dividendChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <p className="text-[11px] text-slate-400 mt-2 bg-slate-900 p-2 rounded border border-slate-800">
                        {prefType === 'cumulative'
                          ? `Cumulative preference holders absorb ₹${calculatedDividend.prefPayout} Lakh (clearing past ${missedYears} skipped years first) before equity gets a rupee.`
                          : `Non-cumulative shares receive ₹1 Lakh for current year only. All ${missedYears} skipped years lapsed permanently.`}
                      </p>
                    </div>
                  </div>

                  {/* Prediction 1 Interactive Card */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/40 space-y-3">
                    <span className="text-xs uppercase font-extrabold text-indigo-400">
                      Predict & Verify: {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </span>
                    <p className="text-sm font-semibold text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          aria-label={`Prediction option ${String.fromCharCode(65 + i)}: ${opt}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(0, i)}
                          className={`p-2.5 rounded-lg text-left text-xs font-medium border transition-all ${
                            predictionMade[0] && i === PREDICTION_QUESTIONS[0].correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : predictionMade[0] && i === predictionSelected[0]
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-1 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Navigate to previous discovery lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-xl disabled:opacity-40 disabled:hover:bg-slate-800"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-medium">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Navigate to next discovery lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter free sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* ── PHASE 3: FREE SANDBOX MODE ── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-black text-white">Commercial Law Sandbox Engine</h3>
            <p className="text-xs text-slate-400 mt-1">
              Test all variables with zero pressure or grading. Manipulate capital structures, registration status, and legal doctrines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-indigo-400">1. Firm Status</h4>
              <button
                aria-label="Toggle sandbox firm registration"
                onClick={() => setIsRegistered((r) => !r)}
                className={`w-full py-2 rounded-xl text-xs font-bold ${
                  isRegistered ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {isRegistered ? '✓ Status: Registered Firm' : '✗ Status: Unregistered Firm'}
              </button>
              <p className="text-[11px] text-slate-400">
                {isRegistered ? 'Can enforce rights under Section 59' : 'Section 69 bar applies'}
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-indigo-400">2. Corporate Entity</h4>
              <button
                aria-label="Toggle sandbox fraud corporate veil state"
                onClick={() => setFraudCommitted((f) => !f)}
                className={`w-full py-2 rounded-xl text-xs font-bold ${
                  fraudCommitted ? 'bg-rose-700 text-white' : 'bg-indigo-700 text-white'
                }`}
              >
                {fraudCommitted ? '⚠️ Veil Lifted (Fraud Detected)' : '🛡️ Salomon Veil Intact'}
              </button>
              <p className="text-[11px] text-slate-400">
                {fraudCommitted ? 'Personal assets exposed' : 'Limited liability preserved'}
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-indigo-400">3. Distributable Profit</h4>
              <input
                type="range"
                min={0}
                max={50}
                value={annualProfit}
                aria-label="Sandbox profit slider"
                onChange={(e) => setAnnualProfit(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-emerald-400 font-bold">₹{annualProfit} Lakh Annual Profit</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <motion.button
              aria-label="Advance to graded challenge mode"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white rounded-xl font-black text-sm shadow-xl shadow-emerald-600/20"
            >
              I Am Ready for Challenges! 🚀 →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ── PHASE 4: PROGRESSIVE CHALLENGES ── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Bar & Badges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                Challenge <strong className="text-white">{currentChallenge + 1}</strong> of{' '}
                <strong className="text-white">{filteredChallenges.length}</strong>
              </span>
              <span className="capitalize text-indigo-400 font-bold font-mono">
                Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Challenge Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase font-extrabold text-indigo-400">
                Question #{currentChallenge + 1} • {challenge.type.toUpperCase()}
              </span>
              <span className="text-xs text-slate-500 font-mono">Node: {challenge.nodeId}</span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white leading-snug">
              {challenge.question}
            </h3>

            {/* --- MCQ Style Challenges --- */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5 pt-2">
                  {challenge.options.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      onClick={() => handleAnswer(idx)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full p-4 rounded-xl text-left text-xs md:text-sm font-medium transition-colors border ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && idx === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-indigo-400 mr-2">
                        {showExplanation && idx === challenge.correctIndex ? '✓ ' : ''}
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* --- Drag Label Challenges --- */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 w-full mb-1">Drag each label:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'box_name', title: 'Name & Suffix Statement' },
                    { id: 'box_situation', title: 'State of Registered Office' },
                    { id: 'box_object', title: 'Scope of Lawful Operations (Ultra Vires)' },
                    { id: 'box_capital', title: 'Max Share Capital Authorised' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-colors ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-500'
                      }`}
                    >
                      <span className="text-xs font-semibold text-slate-400 mb-1">{target.title}</span>
                      <strong className="text-sm">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Clause Here'}
                      </strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify clause placements"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Clause Placements →
                </motion.button>
              </div>
            )}

            {/* --- Drag Sort Challenges --- */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Drag items to rearrange into the correct statutory sequence:</p>
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
                      aria-label={`Draggable sequence item: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-xs md:text-sm font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-1 bg-indigo-950 text-indigo-400 rounded-lg font-mono font-bold text-xs">
                        #{displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check sequence order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
                >
                  Check Sequence Order →
                </motion.button>
              </div>
            )}

            {/* --- Numeric Input Challenges --- */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Numeric calculation answer input"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-sm text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric calculation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Calculation →
                  </motion.button>
                </div>
              </div>
            )}

            {/* --- Construct Challenges --- */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 w-full mb-1">Click fragments to build:</span>
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add fragment: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800/80 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-lg text-xs font-medium flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        aria-label={`Remove fragment ${part}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click pieces above to assemble sentence</span>
                  )}
                </div>

                <motion.button
                  aria-label="Validate legal construct statement"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
                >
                  Validate Legal Construct →
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Reveal */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-700/60 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-amber-400">
                    Statutory Step-by-Step Breakdown
                  </span>
                  <span className="text-xs text-slate-400">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <strong className="text-amber-400 font-mono mr-2">{i + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next legal step in explanation"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl border border-amber-500/30"
                    >
                      Show Next Legal Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Advance to next challenge or completion"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish & View Mastery Profile 🎓'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 5: COMPLETION & REFLECTION ── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Motivational Feedback Banner */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/90 via-slate-900 to-emerald-950/90 rounded-3xl border border-indigo-700/60 text-center space-y-3">
            <span className="text-5xl">{motivationalMessage.icon}</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">{motivationalMessage.title}</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">{motivationalMessage.subtitle}</p>
            <div className="inline-block mt-2">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${motivationalMessage.badgeCol}`}>
                Final Score: {Math.max(0, 100 - errors * 5)}% • Errors: {errors}
              </span>
            </div>
          </div>

          {/* Performance & Spaced Repetition Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400">Final Mastery Tier</span>
              <h4 className="text-xl font-bold text-indigo-400 capitalize">✓ {masteryLevel}</h4>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400">Challenges Solved</span>
              <h4 className="text-xl font-bold text-emerald-400">
                ✓ {scoreBreakdown.correct} / {scoreBreakdown.total}
              </h4>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400">Recommended Spaced Review</span>
              <h4 className="text-xl font-bold text-amber-400">
                {errors === 0 ? '✓ Review in 7 Days (Optimal)' : errors <= 3 ? '✓ Review in 3 Days' : '⚠️ Review in 1 Day (Tomorrow)'}
              </h4>
              <p className="text-[10px] text-slate-500 mt-1">
                SM-2 algorithm scheduled revision based on {errors} mistake{errors === 1 ? '' : 's'}.
              </p>
            </div>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
              <span>🤔</span> Reflection & Conceptual Consolidation
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  aria-label="What was the most surprising thing you learned?"
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., Even nominal or dormant partners face unlimited joint & several liability under Section 25 & 28..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  aria-label="How would you explain this to a friend?"
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., A company is a separate artificial person born via Certificate of Incorporation that protects personal assets..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  aria-label="Where in real life might you use this?"
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., Deciding whether to register an LLP vs Private Limited company before leasing an office..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Breakdown */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Remediation Profile
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950/90 rounded-xl border border-rose-900/40 text-xs">
                      <p className="text-rose-400 font-bold">✗ Trap: {m.misconception}</p>
                      <p className="text-emerald-400 font-medium mt-1">✓ Correct Statutory Rule: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs text-indigo-400 font-extrabold uppercase tracking-wider">
              Capstone Commercial Project
            </span>
            <h3 className="text-lg font-black text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-400 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ── Gamification Feedback Elements ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_CommercePartnershipMeaningFeaturesSim;
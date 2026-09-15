'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_BS_011 = 'c11_bs_011';
const NODE_C11_BS_012 = 'c11_bs_012';
const NODE_C11_BS_013 = 'c11_bs_013';
const NODE_C11_BS_014 = 'c11_bs_014';
const NODE_C11_BS_015 = 'c11_bs_015';
const NODE_C11_BS_016 = 'c11_bs_016';
const NODE_C11_BS_017 = 'c11_bs_017';
const NODE_C11_BS_018 = 'c11_bs_018';
const NODE_C11_BS_019 = 'c11_bs_019';
const NODE_C11_BS_020 = 'c11_bs_020';

const ALL_NODE_IDS = [
  NODE_C11_BS_011,
  NODE_C11_BS_012,
  NODE_C11_BS_013,
  NODE_C11_BS_014,
  NODE_C11_BS_015,
  NODE_C11_BS_016,
  NODE_C11_BS_017,
  NODE_C11_BS_018,
  NODE_C11_BS_019,
  NODE_C11_BS_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Bharat Enterprise Odyssey: From Idea to Global Titan',
  intro:
    'You are the chief corporate legal & business strategist for "BharatVanguard Ventures". Over three decades, you will guide dynamic Indian enterprises: structuring family startups vs public titans, filing statutory SPICe+ charters, defending ultra vires corporate actions, expanding multinational footprints, building dairy cooperatives, scaling Q-Commerce dark stores, and safeguarding supply chains with blockchain immutable ledgers.',
  context:
    'Every decision alters capital access, compliance burden, democratic voting rights, delivery speeds, and legal validity under the Companies Act 2013, IT Act 2000, and CPA 2019.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question:
    'Tata Sons Pvt Ltd controls the multi-billion dollar Tata conglomerate with global entities like TCS and Tata Motors. Is Tata Sons Pvt Ltd a Public Company because of its colossal market valuation?',
  options: [
    'Yes — any company with over ₹10,000 Cr assets is legally deemed a public company.',
    'No — its legal status is governed by statutory restrictions (≤200 members, restricted transfer, no public issue), not by balance sheet size.',
    'Yes — because TCS and Tata Motors are listed on the BSE and NSE.',
    'No — only government PSUs qualify as public companies in India.',
  ],
  correctIndex: 1,
  hintAfter:
    'Surprised? Legal classification under Section 2(68) depends on Articles of Association and membership rules — not asset size or fame! Let us explore the mechanics!',
};

// ─── CHALLENGE DEFINITION ───
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Competency Aligned) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_011_f1',
    nodeId: NODE_C11_BS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 2(68) of the Companies Act 2013, what are the statutory minimum and maximum member limits for a Private Company (excluding employee-members)?',
    options: [
      'Min 7, Max Unlimited',
      'Min 2, Max 200',
      'Min 2, Max 50',
      'Min 1, Max 20',
    ],
    correctIndex: 1,
    explanation: 'Section 2(68) sets minimum 2 members and maximum 200 members (raised from 50 in the 1956 Act). Public companies under Section 2(71) require minimum 7 with no upper limit.',
    hints: [
      'Think of a private circle: at least a pair is needed, and the 2013 Act expanded the limit four-fold from 50.',
      'The minimum is 2 members, and the modern cap accommodates startup ESOPs up to two centuries of people.',
      'Select: Min 2, Max 200.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_011_f2',
    nodeId: NODE_C11_BS_011,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does Rule 8 of Companies (Incorporation) Rules 2014 mandate the exact suffix "Pvt Ltd" or "Ltd"?',
    options: [
      'It is merely a stylistic branding recommendation by the MCA with no legal force.',
      'It signals to the public and prospective creditors the transferability of shares and scope of member liability.',
      'It allows companies to avoid paying corporate income taxes in their state.',
      'It indicates whether the company is owned by the Central Government.',
    ],
    correctIndex: 1,
    explanation: 'The suffix provides notice to third parties regarding the restricted vs unrestricted transfer of shares and statutory compliance requirements.',
    hints: [
      'The public has a right to know if share transfer is restricted before doing business.',
      'Suffixes prevent deception regarding whether shares can be publicly subscribed.',
      'Select option explaining disclosure to creditors and the public.',
    ],
  },
  {
    id: 'ch_012_f1',
    nodeId: NODE_C11_BS_012,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the four sequential stages of forming a Public Limited Company in correct statutory order.',
    sortItems: [
      'Promotion (Idea, Feasibility & SPICe+ Part A)',
      'Incorporation (SPICe+ Part B & Certificate of Incorporation)',
      'Capital Subscription (Prospectus / SEBI RHP)',
      'Commencement of Business (Section 10A / INC-20A)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Public company formation proceeds through Promotion → Incorporation → Capital Subscription → Commencement of Business. A private company skips stages 3 and 4.',
    hints: [
      'Conception happens before legal birth (Incorporation).',
      'You cannot invite the public for funds before the company legally exists.',
      'Commencement declaration under Section 10A is the final hurdle before operations start.',
    ],
  },
  {
    id: 'ch_012_f2',
    nodeId: NODE_C11_BS_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following describes a promoter under Section 2(69) of the Companies Act 2013?',
    options: [
      'A marketing manager hired to run TV advertisements and social media campaigns.',
      'A person named in prospectus/annual return, or who controls company affairs, or on whose advice the Board is accustomed to act.',
      'Any stockbroker who buys more than 10 shares during an IPO.',
      'The government officer who issues the PAN card.',
    ],
    correctIndex: 1,
    explanation: 'Section 2(69) broadens promoter definition across three limbs: named in prospectus/annual return, controlling affairs directly/indirectly, or directing Board actions.',
    hints: [
      'Legal promoters are architects and controllers, not sales advertising executives.',
      'Look for the three statutory limbs under Section 2(69).',
      'Select the option citing control and board influence.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_013_f1',
    nodeId: NODE_C11_BS_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How did the introduction of SPICe+ (INC-32) on 15 Feb 2020 transform company incorporation in India?',
    options: [
      'It eliminated the requirement of having a Board of Directors entirely.',
      'It integrated 10 distinct regulatory registrations (Name, Incorporation, DIN, PAN, TAN, EPFO, ESIC, Prof Tax, Bank A/c, GSTIN) into a single electronic window.',
      'It allowed foreign companies to operate without any RBI or MCA registration.',
      'It converted all existing private companies into public listed companies automatically.',
    ],
    correctIndex: 1,
    explanation: 'SPICe+ collapsed multiple fragmented departmental applications into a single electronic window, slashing incorporation turnaround from weeks to under 72 hours.',
    hints: [
      'Think of single-window digital governance for Indian ease of doing business.',
      'It clusters PAN, TAN, EPFO, ESIC, DIN and Bank accounts into one master form.',
      'Select the 10-in-1 integrated service option.',
    ],
  },
  {
    id: 'ch_011_s1',
    nodeId: NODE_C11_BS_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Verma Agritech Pvt Ltd was incorporated with 5 founders. By December 2024, rapid angel funding expanded its non-employee shareholder base to 215 members. What is its legal obligation?',
    options: [
      'Nothing; private companies can have up to 500 members under 2024 rules.',
      'It must either convert to a Public Company (altering Articles under Sec 18) or reduce non-employee members to ≤200.',
      'The company is automatically dissolved by the RoC without notice.',
      'It must forfeit the shares of the latest 15 investors without repayment.',
    ],
    correctIndex: 1,
    explanation: 'Crossing the Section 2(68) cap of 200 non-employee members voids private company privileges. It must alter Articles via Special Resolution to convert to a public entity or execute buybacks.',
    hints: [
      'Section 2(68)(c) sets a rigid ceiling of 200 non-employee members.',
      'To accommodate >200 members legally, the suffix and Articles must transition to "Limited".',
      'Select conversion under Section 18 or reduction to 200.',
    ],
  },
  {
    id: 'ch_014_s1',
    nodeId: NODE_C11_BS_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The MOA Objects clause of "Shanti Cotton Mills Ltd" specifies "manufacture and export of cotton textiles and yarn". The Board enters an ₹80 Cr contract to construct luxury hotels. What is the legal status?',
    options: [
      'Valid, because the Board of Directors has unlimited executive discretion.',
      'Ultra Vires the MOA and completely VOID; it cannot be ratified even by a 100% unanimous shareholder vote.',
      'Valid as an internal irregularity, binding against the company with director fines.',
      'Valid if the state tourism minister grants verbal permission.',
    ],
    correctIndex: 1,
    explanation: 'Per Ashbury Railway Carriage v. Riche (1875), acts beyond the MOA Objects clause are ultra vires, null and void ab initio, incapable of ratification by any shareholder majority.',
    hints: [
      'The MOA defines the outer legal boundaries of corporate existence.',
      'Hospitality/hotels is neither cotton manufacturing nor an ancillary necessity.',
      'Ultra vires acts are legal nullities (void).',
    ],
  },
  {
    id: 'ch_014_s2',
    nodeId: NODE_C11_BS_014,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match each vital MOA clause to its statutory function under Section 4 of the Companies Act 2013.',
    dragItems: [
      { label: 'Name Clause', targetId: 'box_name' },
      { label: 'Registered Office Clause', targetId: 'box_domicile' },
      { label: 'Objects Clause', targetId: 'box_objects' },
      { label: 'Liability Clause', targetId: 'box_liability' },
    ],
    correctMapping: {
      box_name: 'Name Clause',
      box_domicile: 'Registered Office Clause',
      box_objects: 'Objects Clause',
      box_liability: 'Liability Clause',
    },
    explanation: 'Name Clause defines corporate identity/suffix; Registered Office fixes State jurisdiction of RoC; Objects Clause sets permissible activities (ultra vires boundary); Liability Clause defines member risk.',
    hints: [
      'Jurisdiction of RoC and courts depends on the State named in the domicile clause.',
      'The objects clause prevents management from speculative deviation.',
      'Liability specifies limited by shares or guarantee.',
    ],
  },
  {
    id: 'ch_015_s1',
    nodeId: NODE_C11_BS_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Himalaya Solar Power Ltd received its Certificate of Incorporation on 10 March 2025. Can it commence power generation sales on 11 March 2025?',
    options: [
      'Yes; incorporation confers instantaneous commercial trading rights to all companies.',
      'No; a public company must first file Form INC-20A declaration under Section 10A verifying receipt of subscription capital.',
      'Yes, provided it pays an additional fee to the local municipal corporation.',
      'No; it must wait exactly 5 years before generating electricity.',
    ],
    correctIndex: 1,
    explanation: 'Section 10A mandates that public companies must file a verified declaration (INC-20A) proving subscribers paid their share capital before commencing business operations.',
    hints: [
      'Legal existence (birth) is distinct from operational commencement for public companies.',
      'Look for Section 10A and Form INC-20A verification.',
      'Subscription funds must be verified in the company bank account first.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_015_s2',
    nodeId: NODE_C11_BS_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When does a Public Limited Company file a "Statement in Lieu of Prospectus" with the RoC instead of issuing a public Prospectus?',
    options: [
      'When it raises capital through Private Placement to a select group of ≤200 investors under Section 42 without a public issue.',
      'When it goes bankrupt and closes down operations.',
      'When it decides to hide its annual losses from SEBI regulators.',
      'When its shares are listed on the New York Stock Exchange.',
    ],
    correctIndex: 0,
    explanation: 'A Statement in Lieu of Prospectus is filed when capital is arranged privately from institutional/select investors (Section 42) rather than floating an open public invitation (Section 23).',
    hints: [
      'Private placement involves a select group without open public advertising.',
      'The RoC still requires official disclosure on record.',
      'Select the private placement under Section 42 option.',
    ],
  },
  {
    id: 'ch_016_s1',
    nodeId: NODE_C11_BS_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does a Transnational Corporation (TNC like Unilever) differ from a pure Global Company (like Coca-Cola)?',
    options: [
      'A TNC has no head office anywhere in the world.',
      'A TNC combines global supply-chain integration with local product responsiveness, whereas a Global Company sells standardized products worldwide.',
      'A TNC only operates in developing nations.',
      'A Global Company is owned exclusively by the United Nations.',
    ],
    correctIndex: 1,
    explanation: 'Global companies standardize worldwide (Coca-Cola formula); TNCs maintain integrated global platforms while customizing formulations/packaging for local markets (HUL Lifebuoy/Surf Excel).',
    hints: [
      'Think of standardisation (global) versus global efficiency + local tailoring (transnational).',
      'Unilever reformulates for Indian hard water while keeping global brand architecture.',
      'Select the integration with local responsiveness option.',
    ],
  },
  {
    id: 'ch_017_s1',
    nodeId: NODE_C11_BS_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Farmer Ramesh holds ₹500 share capital in Amul and supplied 12,000 L milk. Farmer Suresh holds ₹5,000 share capital and supplied 1,200 L milk. Who receives the larger year-end bonus surplus?',
    options: [
      'Suresh — because his invested capital is 10 times higher (capitalist dividend principle).',
      'Ramesh — because cooperative surplus is distributed in proportion to patronage (volume of business transacted), not capital.',
      'Both receive exactly the same rupee bonus regardless of milk or capital.',
      'The District Collector receives the surplus as state tax.',
    ],
    correctIndex: 1,
    explanation: 'In cooperatives, surplus is distributed based on patronage/transactions (milk supplied), rewarding user participation. Share dividend is capped at ~15% and is purely secondary.',
    hints: [
      'Cooperatives reward service patronage, not passive financial capital.',
      'Ramesh supplied 10x more milk to the dairy union than Suresh.',
      'Select Ramesh based on patronage/volume of transactions.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_017_s2',
    nodeId: NODE_C11_BS_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Anand Milk Cooperative has ₹20,00,000 surplus to distribute among members after reserves. Total milk procured is 10,00,000 litres. Farmer Anita supplied 4,500 litres. What is Anita\'s patronage bonus in Rupees?',
    correctAnswer: 9000,
    tolerance: 10,
    unit: '₹',
    explanation: 'Surplus rate per litre = ₹20,00,000 / 10,00,000 L = ₹2.00 per litre. Anita\'s bonus = 4,500 L × ₹2.00/L = ₹9,000.',
    hints: [
      'Calculate the bonus rate per litre first: Total Surplus ÷ Total Litres.',
      '₹20 Lakhs ÷ 10 Lakh Litres = ₹2 per litre.',
      'Multiply ₹2 by Anita\'s 4,500 litres.',
    ],
  },
  {
    id: 'ch_018_s1',
    nodeId: NODE_C11_BS_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When Zoho Corporation uses its internal Zoho People software for employee leave approvals and payroll, which e-business scope category does this represent?',
    options: ['B2B', 'B2C', 'Intra-B', 'C2C'],
    correctIndex: 2,
    explanation: 'Intra-B (Intra-Business) encompasses internal electronic interactions and workflow management among departments within a single enterprise.',
    hints: [
      'The interaction occurs entirely inside the company boundary.',
      'It connects employees, HR, and internal management.',
      'Prefix "Intra" means within.',
    ],
  },
  {
    id: 'ch_019_a1',
    nodeId: NODE_C11_BS_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does an immutable blockchain ledger prevent pharmaceutical counterfeit drug injection more effectively than a centralized SQL database?',
    options: [
      'Blockchain runs without requiring electrical power or computers.',
      'In blockchain, cryptographic block hashing and multi-node consensus mean no single party or rogue administrator can rewrite historic batch records without detection.',
      'Centralized databases are illegal under the Drugs and Cosmetics Act 1940.',
      'Blockchain automatically cures patient illnesses via smart contracts.',
    ],
    correctIndex: 1,
    explanation: 'In centralized databases, a rogue administrator can alter batch records. Blockchain distributes ledger replicas across nodes where altering Block N alters its cryptographic hash, instantly breaking all subsequent chained blocks.',
    hints: [
      'Tampering with one block changes its SHA-256 hash.',
      'Multi-party nodes reject blocks that do not match consensus.',
      'Select cryptographic hashing and multi-node consensus.',
    ],
  },
  {
    id: 'ch_019_a2',
    nodeId: NODE_C11_BS_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the fundamental legal and economic difference between the RBI\'s Digital Rupee (e-Rupee) and Bitcoin?',
    options: [
      'Bitcoin is sovereign legal tender in India backed by the RBI, while e-Rupee is decentralised.',
      'e-Rupee is a sovereign Central Bank Digital Currency (CBDC) pegged 1:1 to fiat with RBI backing; Bitcoin is a private, volatile, decentralised asset without sovereign backing.',
      'Both are identical tokens issued by SEBI under the Income Tax Act 1961.',
      'e-Rupee changes value by 50% every day based on crypto mining.',
    ],
    correctIndex: 1,
    explanation: 'The e-Rupee is sovereign fiat digital money issued by RBI (centralized). Bitcoin is a decentralized protocol asset with no sovereign backing, subject to high price volatility and Section 194S TDS.',
    hints: [
      'Look at the issuer: Central Bank vs decentralized miners.',
      'CBDC is legal tender pegged 1:1 to cash currency.',
      'Select the option highlighting sovereign backing vs private volatility.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_020_a1',
    nodeId: NODE_C11_BS_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do Blinkit and Zepto achieve 10-minute delivery compared to standard e-commerce (1-3 days)?',
    options: [
      'By breaking traffic laws with supersonic delivery drones.',
      'By operating hyperlocal "dark stores" within 2-3 km carrying 2,000-6,000 high-velocity SKUs pre-positioned by predictive AI demand algorithms.',
      'By manufacturing all groceries inside the delivery rider\'s backpack.',
      'By selling only digital e-books that do not require physical transit.',
    ],
    correctIndex: 1,
    explanation: 'Q-Commerce relies on hundreds of dark stores positioned 2-3 km from consumers with 2,000-6,000 fast-moving SKUs. Pickers pack in 2 mins, and riders travel short distances.',
    hints: [
      'Standard e-commerce uses massive 50,000+ SKU warehouses 50-200 km away.',
      'Hyperlocal proximity (2-3 km) and narrow SKU catalogs are key.',
      'Select the dark store + predictive AI option.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_020_a2',
    nodeId: NODE_C11_BS_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under the Consumer Protection (E-Commerce) Rules 2020, which of the following practices is explicitly illegal for online marketplaces?',
    options: [
      'Offering UPI and Netbanking payment methods.',
      'Using deceptive "dark patterns" (e.g. false countdown timers, pre-ticked hidden insurance charges) and failing to appoint a grievance officer.',
      'Providing 24x7 customer support through AI chatbots like Flipbot.',
      'Delivering goods within 15 minutes of ordering.',
    ],
    correctIndex: 1,
    explanation: 'CPA 2020 E-Commerce Rules ban deceptive dark patterns, mandate 48-hour grievance officer acknowledgment with 30-day resolution, and require full price breakdown disclosures.',
    hints: [
      'The law protects consumers from manipulative design tricks.',
      'Dark patterns trick buyers into paying extra unconsented fees.',
      'Select the option prohibiting dark patterns and mandating grievance officers.',
    ],
  },
  {
    id: 'ch_016_a1',
    nodeId: NODE_C11_BS_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When Tata Motors acquired UK-based Jaguar Land Rover for $2.3 Billion in 2008, which structural corporate characteristic prevented Indian family promoters from facing personal bankruptcy if JLR collapsed?',
    options: [
      'Unlimited personal liability of shareholders.',
      'Separate Legal Entity and Limited Liability of the Joint Stock Company structure.',
      'The Multi-State Cooperative Societies Act 2002.',
      'The Emblems and Names Act 1950.',
    ],
    correctIndex: 1,
    explanation: 'Limited liability and distinct legal personality protect shareholders: their exposure is capped at their invested capital, shielding personal estates from cross-border subsidiary defaults.',
    hints: [
      'Partnerships lack this shield because partners face unlimited liability.',
      'The joint stock company separates owner wealth from corporate debt.',
      'Select Separate Legal Entity and Limited Liability.',
    ],
  },
  {
    id: 'ch_014_a1',
    nodeId: NODE_C11_BS_014,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct statutory legal hierarchy governing an Indian company from highest supreme authority to subordinate internal rules.',
    availableParts: ['Companies Act 2013', 'MOA (Memorandum)', 'AOA (Articles)', 'Board Resolutions'],
    targetState: 'Companies Act 2013 > MOA (Memorandum) > AOA (Articles) > Board Resolutions',
    validationHint: 'Hierarchy: Statute law > Corporate Charter > Internal Regulations > Executive Board decisions.',
    explanation: 'Section 6 establishes that the Companies Act overrides MOA and AOA. In turn, MOA overrides subordinate AOA regulations, which govern internal Board resolutions.',
    hints: [
      'Parliament\'s statutory enactment stands at the very apex.',
      'The charter (MOA) defines powers; the rulebook (AOA) is subordinate to it.',
      'Connect them with ">" symbols in order.',
    ],
  },
  {
    id: 'ch_017_a1',
    nodeId: NODE_C11_BS_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'IFFCO has 36,000 member cooperatives across 28 Indian States. Why is it registered under the Multi-State Cooperative Societies Act 2002 instead of the State 1912 Act?',
    options: [
      'Because the 1912 Act is strictly limited to single-state jurisdiction, whereas the 2002 federal Act empowers nationwide operations under the Central Registrar.',
      'Because state acts prohibit manufacturing chemical fertilizers.',
      'Because multistate cooperatives do not have to hold democratic elections.',
      'Because it is an American multinational company.',
    ],
    correctIndex: 0,
    explanation: 'State cooperative acts restrict operations within state boundaries. Cooperatives operating across state lines require registration under MSCS Act 2002 with the Central Registrar.',
    hints: [
      'Think of state versus federal jurisdiction in the Indian Constitution (Part IXB).',
      'The Central Registrar administers multistate federal bodies.',
      'Select the 2002 Act nationwide jurisdiction option.',
    ],
  },
  {
    id: 'ch_013_a1',
    nodeId: NODE_C11_BS_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Analyse the 21-digit Corporate Identity Number "U72200KA2025PTC123456". What does "PTC" indicate to an investor?',
    options: [
      'Public Trading Corporation listed on BSE.',
      'Private Limited Company (Company Limited by Shares).',
      'Proprietorship Tax Clearance.',
      'Producer Training Center under Ministry of Agriculture.',
    ],
    correctIndex: 1,
    explanation: 'In MCA\'s 21-digit CIN: "U" = Unlisted, "72200" = NIC software code, "KA" = Karnataka, "2025" = Year, "PTC" = Private Limited Company (PLC = Public Limited Company).',
    hints: [
      'PLC stands for Public Limited Company.',
      'PTC indicates private status (Private Limited Company).',
      'Select Private Limited Company.',
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
  nodeId: NODE_C11_BS_011,
  title: 'Public vs Private Companies & Modern Business Formations',
  definition:
    'A comparative study of Private vs Public Companies under Companies Act 2013, four stages of corporate formation (Promotion, Incorporation via SPICe+, Capital Subscription, Commencement u/s 10A), MOA vs AOA, Global Enterprises, Cooperative Societies, e-Business, Blockchain in Supply Chains, and Q-Commerce AI models.',
  eli5:
    'A private company is an exclusive club with locked doors; a public company is a grand stadium open to all ticket holders. Behind them run digital registration portals (SPICe+), constitution charters (MOA), democratic cooperatives (Amul), 10-minute dark stores (Blinkit), and unhackable supply ledgers (Blockchain)!',
  misconceptions: [
    {
      misconception: 'A private company means a company that is not listed on a stock exchange.',
      correction:
        'A company is private based on statutory restrictions in its Articles (Section 2(68): max 200 members, restricted transfer, no public issue). Public companies can also be unlisted.',
    },
    {
      misconception: 'Surplus in a cooperative society is distributed based on share capital like corporate dividends.',
      correction:
        'Cooperative surplus is distributed in proportion to patronage (volume of transactions/milk supplied), upholding mutual aid. Share dividend is capped at ~15%.',
    },
    {
      misconception: 'Blockchain and Bitcoin are identical concepts.',
      correction:
        'Blockchain is the underlying distributed, immutable ledger technology. Bitcoin is merely one crypto-asset application. Blockchain powers tea and pharma supply chains independently.',
    },
    {
      misconception: 'Q-Commerce is simply regular e-commerce with faster delivery motorbikes.',
      correction:
        'Q-Commerce is an architectural overhaul: hundreds of 2-3 km dark stores stocking 2,000-6,000 fast-moving SKUs pre-positioned by predictive AI demand algorithms.',
    },
    {
      misconception: 'Ultra vires contracts can be validated if all shareholders vote in favor.',
      correction:
        'Acts outside the MOA Objects clause are void ab initio and legal nullities (Ashbury v. Riche); no shareholder vote, even 100% unanimous, can ratify them.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the maximum non-employee member limit for a Private Company under Companies Act 2013?',
      options: ['50 members', '100 members', '200 members', 'Unlimited'],
      correctIndex: 2,
    },
    {
      question: 'Which stage of formation is omitted for a Private Company?',
      options: ['Promotion', 'Incorporation', 'Capital Subscription & Commencement of Business', 'Name Approval'],
      correctIndex: 2,
    },
    {
      question: 'What is the legal effect of a contract beyond the MOA Objects clause?',
      options: ['Valid with penalty', 'Void ab initio (Ultra Vires)', 'Valid if signed by CEO', 'Voidable at option of buyer'],
      correctIndex: 1,
    },
    {
      question: 'Which electronic form integrated 10 registrations in Feb 2020?',
      options: ['RUN Form', 'SPICe+ (INC-32)', 'DIN-3', 'Form INC-20A'],
      correctIndex: 1,
    },
    {
      question: 'What voting principle governs a Cooperative Society?',
      options: ['One share, one vote', 'One member, one vote', 'One rupee, one vote', 'Directors decide all votes'],
      correctIndex: 1,
    },
    {
      question: 'What does a TNC (Transnational Corporation) balance?',
      options: ['High taxes with low wages', 'Global integration with local responsiveness', 'Only domestic trade', 'Exporting without foreign offices'],
      correctIndex: 1,
    },
    {
      question: 'What is the typical delivery radius for a Q-Commerce dark store?',
      options: ['50 to 100 km', '20 to 30 km', '2 to 3 km', 'State-wide'],
      correctIndex: 2,
    },
    {
      question: 'Is the RBI Digital Rupee (e-Rupee) a decentralized crypto-asset?',
      options: ['Yes, exactly like Bitcoin', 'No, it is a sovereign Central Bank Digital Currency (CBDC)', 'Yes, mined on Ethereum', 'No, it is a credit card'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Demonstrates total mastery of Section 2(68)/2(71) thresholds, SPICe+ incorporation flow, MOA ultra vires boundaries, Cooperative patronage economics, and Blockchain/Q-Commerce architectures.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Public vs Private Company Spectrum & Capital Mobilization',
    instruction:
      'Adjust the Member Count and Public Capital Sliders to witness corporate status transition, RoC regulatory oversight, and statutory compliance thresholds under Section 2(68) vs 2(71).',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_BS_011,
  },
  {
    title: 'Lab 2: Digital Incorporation Engine (SPICe+ Part A & Part B)',
    instruction:
      'Click through the SPICe+ digital pipeline to assemble name reservation, MOA/AOA e-filing, and inspect the integrated 10-in-1 statutory architecture.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_BS_013,
  },
  {
    title: 'Lab 3: MOA Objects Clause & Ultra Vires Radar',
    instruction:
      'Test business actions against the company\'s charter. Watch the legal shield turn emerald (intra vires) or crimson void (ultra vires - Ashbury v. Riche rule).',
    interactionType: 'drag-classify',
    nodeId: NODE_C11_BS_014,
  },
  {
    title: 'Lab 4: Cooperative Patronage vs Corporate Dividend Simulator',
    instruction:
      'Slide member milk deliveries and share capital to compare how Amul rewards user patronage versus how public companies reward equity capital.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_BS_017,
  },
  {
    title: 'Lab 5: Blockchain Provenance & Q-Commerce Dark Store Hub',
    instruction:
      'Simulate an unhackable supply chain ledger with tamper-proof hashing, and toggle dark store radiuses to achieve 10-minute delivery.',
    interactionType: 'drag-match',
    nodeId: NODE_C11_BS_019,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If a private startup expands from 190 to 220 non-employee angel shareholders, what statutory roadblock will occur?',
    options: [
      'No issue; private companies have no member limit.',
      'The company breaches Section 2(68) and must either convert to a Public Limited Company or reduce membership.',
      'The Ministry of Corporate Affairs automatically confiscates all company assets.',
      'The company is automatically transformed into a Multistate Cooperative.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the member counter past 200 in Lab 1 to observe the statutory alarm activate!',
    nodeId: NODE_C11_BS_011,
  },
  {
    question:
      'Predict: If a member in a dairy cooperative owns 50% of the total share capital but supplies only 1% of the milk, what portion of the surplus bonus will they receive?',
    options: [
      '50% of surplus (rewarding capital contribution).',
      'Only 1% of surplus (rewarding patronage/milk supplied).',
      '100% because capital owners control cooperative boards.',
      'Zero bonus, and their capital is seized.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Cooperative simulator sliders in Lab 4 to verify the patronage dividend principle!',
    nodeId: NODE_C11_BS_017,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the legal validity of a transaction when the action falls outside the MOA Objects Clause?',
    observableOptions: [
      'It becomes Ultra Vires and completely VOID ab initio; even 100% shareholder votes cannot ratify it.',
      'It remains fully valid, but directors pay a small ₹500 fine.',
      'It is automatically converted into an AOA internal guideline.',
      'It becomes valid after 30 days automatically.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_BS_014,
  },
  {
    question: 'In the cooperative simulator, how does increasing milk supply versus capital share alter the year-end surplus reward?',
    observableOptions: [
      'Surplus rewards user patronage (milk supplied) directly, keeping capital share purely secondary.',
      'Surplus rewards 100% capital ownership, ignoring milk volume supplied.',
      'Surplus is strictly divided equally among all village residents regardless of participation.',
      'Surplus is paid only to directors of the district cooperative bank.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_BS_017,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Corporate Strategist: Draft Your Enterprise Roadmap',
  description:
    'Choose an innovative Indian startup idea (e.g., AI Drone Deliveries, Organic Herbal Dairy, or Solar Microgrids). Complete the 4-phase statutory roadmap:',
  steps: [
    '1. Choose Entity Type: Justify Private Ltd (Pvt Ltd) vs Public Ltd vs Multistate Cooperative under Companies Act 2013 / MSCS Act 2002.',
    '2. Draft the MOA Objects Clause: Define main objects and ancillary activities to prevent future Ultra Vires legal disputes.',
    '3. Plan Capital & Filings: Detail SPICe+ filings (INC-32, 33, 34) and determine whether a Section 10A commencement declaration is required.',
    '4. Emerging Tech Integration: Design either a Blockchain supply-chain provenance pipeline or a Hyperlocal Q-Commerce dark store logistics network.',
  ],
};

// ═════════════════════════════════════════════════════════════════════
// MAIN COMPONENT EXPORT
// ═════════════════════════════════════════════════════════════════════
function C11_BusinessStudiesPublicPrivateCompaniesSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['business-studies'] || {
    name: 'Business Studies',
    emoji: '🏢',
    color: 'emerald',
  };

  // Phase Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Difficulty & Adaptive Engine
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback State
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [hintCount, setHintCount] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Animation & Particle Overlays
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-Then-Check & Reflections
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [reflectionAnswers, setReflectionAnswers] = useState({ q1: '', q2: '', q3: '' });

  // Interactive Lab State
  const [labMembersCount, setLabMembersCount] = useState(15);
  const [labPublicCapitalCr, setLabPublicCapitalCr] = useState(2);
  const [labSpiceStage, setLabSpiceStage] = useState(0);
  const [labTestedAction, setLabTestedAction] = useState<string | null>(null);
  const [labCoopMilkSupply, setLabCoopMilkSupply] = useState(4000);
  const [labCoopCapitalShare, setLabCoopCapitalShare] = useState(10);
  const [labBlockTampered, setLabBlockTampered] = useState(false);
  const [labDarkStoreRadiusKm, setLabDarkStoreRadiusKm] = useState(2.5);
  const [labDarkStoreSKUs, setLabDarkStoreSKUs] = useState(3500);

  // Challenge Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Interactive Tab switch
  const [activeLabTab, setActiveLabTab] = useState<'sim' | 'chart' | 'statute'>('sim');

  // Persistence Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED ADAPTIVE DIFFICULTY EFFECT ───
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
    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS PULSING STATUS ANIMATION ───
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

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e293b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = difficulty === 'advanced' ? '#ef4444' : difficulty === 'standard' ? '#3b82f6' : '#10b981';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 15 + Math.sin((x + frame * 2) * 0.05) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulseRadius = 4 + Math.sin(frame * 0.1) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 15, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = difficulty === 'advanced' ? '#f87171' : difficulty === 'standard' ? '#60a5fa' : '#34d399';
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(`CISCE Stream: ${difficulty.toUpperCase()} | BKT P(K): ${(bktStateRef.current.pKnown * 100).toFixed(0)}%`, 10, 18);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [difficulty]);

  // ─── AUTO HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0 && challenge) {
        if (challenge.hints && challenge.hints.length > 0) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Need a clue? Here is a hint.');
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallenge]);

  // ─── MEMOISED HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (challenge && challenge.hints && nextLevel <= challenge.hints.length) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant observation! Legal status is defined by statutory restrictions, not financial scale.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate parameters to discover statutory rules.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with variables without grade pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Starting competency challenges. Apply your learning to real-world corporate scenarios.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation sliders to verify your hypothesis.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Odyssey complete! You have demonstrated corporate governance and enterprise mastery.');
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

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      if (!challenge) return;
      let isCorrect = false;

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
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
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
        const updatedSrs = sm2Update(srsItem, 5, 3500);
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

        if (hintCount < (challenge.hints?.length || 3)) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us inspect the legal reasoning together.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('pop');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructAdd = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts((prev) => [...prev, part]);
  }, []);

  const handleConstructRemove = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSparkleClick = useCallback((e: React.MouseEvent) => {
    setSparklePos({ x: e.clientX, y: e.clientY });
    setShowSparkle(true);
    audioManager.play('sparkle');
  }, []);

  // ─── DERIVED METRICS ───
  const isPrivateValid = labMembersCount >= 2 && labMembersCount <= 200;
  const isPublicValid = labMembersCount >= 7;
  const suggestedEntity = labMembersCount > 200 ? 'Public Limited Company (MANDATORY u/s 18)' : labMembersCount >= 7 && labPublicCapitalCr > 5 ? 'Public Limited Company' : 'Private Limited Company';

  const coopVsCorpChartData = useMemo(() => {
    const totalMilk = 10000;
    const totalCap = 100;
    const surplusPool = 100000;

    const coopBonus = (labCoopMilkSupply / totalMilk) * surplusPool;
    const corpDividend = (labCoopCapitalShare / totalCap) * surplusPool;

    return [
      { name: 'Member Reward (₹)', Cooperative_Amul: Math.round(coopBonus), Corporate_JSC: Math.round(corpDividend) },
    ];
  }, [labCoopMilkSupply, labCoopCapitalShare]);

  const estimatedDeliveryMins = useMemo(() => {
    const pickTime = (labDarkStoreSKUs / 1000) * 0.8;
    const transitTime = labDarkStoreRadiusKm * 3.2;
    return Math.round(pickTime + transitTime);
  }, [labDarkStoreRadiusKm, labDarkStoreSKUs]);

  // Personalized Motivational Feedback Message
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Flawless mastery! You navigated statutory law with the precision of a Supreme Court Senior Advocate!';
    if (errors <= 3) return 'Great work! You have strong command over corporate formations and emerging digital business architectures!';
    if (errors <= 7) return 'Good effort! You are making steady progress across company law, ultra vires rules, and cooperative principles!';
    return 'Do not give up — You WILL get this! Re-examine the statutory member limits, MOA object boundaries, and try the interactive labs again!';
  }, [errors]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans relative overflow-hidden"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ rotate: 15, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Sparkle burst Easter Egg"
            className="p-3 bg-emerald-950/80 border border-emerald-700 rounded-2xl text-2xl shadow-inner cursor-pointer"
            onClick={handleSparkleClick}
          >
            {subjectConfig.emoji}
          </motion.button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-900/60 border border-emerald-600/60 text-emerald-300 rounded-full">
                ISC Class 11 Commerce
              </span>
              <span className="text-xs text-slate-400 font-mono">10 Topics Integrated</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white mt-1 tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800" role="tablist" aria-label="Learning Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Navigate to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge') handleAdvanceToChallenge();
                else if (p === 'explore') handleAdvanceToExploration();
                else if (p === 'sandbox') handleAdvanceToSandbox();
                else setPhase(p);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-6"
          >
            {/* Scenario Card */}
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-800/60 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2">
                <span>⚡ Executive Scenario</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
                Jurisdiction: Companies Act 2013 | Multi-State Co-op Act 2002 | IT Act 2000 | Consumer Protection Act 2019
              </div>
            </motion.div>

            {/* Hook Curiosity Challenge */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Curiosity Pre-Test (Ungraded Discovery)
                </span>
                <span className="text-xs text-slate-500 font-mono">Think like a Senior Counsel</span>
              </div>
              <p className="text-lg font-semibold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-xl text-sm transition-all border ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-950/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/70 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-emerald-500/60'
                    }`}
                  >
                    <span className="font-mono font-bold mr-2 text-emerald-400">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="mr-1 text-emerald-400">✓ </span>}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="mr-1 text-rose-400">✗ </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-950/50 border border-emerald-700 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 mt-4"
                >
                  <p className="text-sm text-emerald-300 font-medium leading-relaxed">
                    {discoveryCorrect
                      ? '✓ Spot on! Section 2(68) defines private status by 3 statutory restrictions, independent of balance sheet scale!'
                      : `👉 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    aria-label="Enter Interactive Laboratories"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm shadow-lg shadow-emerald-500/20 whitespace-nowrap"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-6"
          >
            {/* Step Selector & Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-slate-300 text-xs md:text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* Lab Tab switch */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-center" role="tablist">
                <motion.button
                  role="tab"
                  aria-selected={activeLabTab === 'sim'}
                  aria-label="Switch to Simulation View"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveLabTab('sim')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    activeLabTab === 'sim' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Simulation
                </motion.button>
                <motion.button
                  role="tab"
                  aria-selected={activeLabTab === 'chart'}
                  aria-label="Switch to Analytics View"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveLabTab('chart')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    activeLabTab === 'chart' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Analytics
                </motion.button>
                <motion.button
                  role="tab"
                  aria-selected={activeLabTab === 'statute'}
                  aria-label="Switch to Statute Brief View"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveLabTab('statute')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    activeLabTab === 'statute' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Statute Brief
                </motion.button>
              </div>
            </motion.div>

            {/* ─── LAB 1: PUBLIC VS PRIVATE SIMULATOR (WITH SVG 1) ─── */}
            {currentSlide === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-5">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    Interactive Controls: Capital & Shareholder Structure
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <label htmlFor="members-range">Total Non-Employee Members:</label>
                      <span className="font-mono font-bold text-emerald-400">{labMembersCount} Members</span>
                    </div>
                    <input
                      id="members-range"
                      aria-label="Total Non-Employee Members Slider"
                      type="range"
                      min={1}
                      max={350}
                      value={labMembersCount}
                      onChange={(e) => {
                        setLabMembersCount(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                      <span>1 (Solo OPC)</span>
                      <span className="text-amber-400">200 (Private Max Ceiling)</span>
                      <span>350+ (Public Open)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <label htmlFor="capital-range">Target Capital Mobilization from Public:</label>
                      <span className="font-mono font-bold text-indigo-400">₹{labPublicCapitalCr} Crores</span>
                    </div>
                    <input
                      id="capital-range"
                      aria-label="Target Capital Mobilization Slider"
                      type="range"
                      min={0}
                      max={50}
                      value={labPublicCapitalCr}
                      onChange={(e) => {
                        setLabPublicCapitalCr(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  {/* Dynamic Status Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <motion.div
                      animate={{ scale: isPrivateValid ? [1, 1.02, 1] : 1 }}
                      className={`p-3 rounded-xl border ${
                        isPrivateValid
                          ? 'bg-emerald-950/50 border-emerald-700/80 text-emerald-300'
                          : 'bg-rose-950/40 border-rose-800/80 text-rose-300'
                      }`}
                    >
                      <div className="text-[11px] font-bold uppercase flex items-center gap-1">
                        <span>{isPrivateValid ? '✓' : '✗'}</span> Private Status (Sec 2(68))
                      </div>
                      <div className="text-xs mt-1 font-semibold">
                        {labMembersCount < 2
                          ? '✗ Sub-minimum (<2 members)'
                          : labMembersCount > 200
                          ? '✗ Breached (>200 cap, must convert)'
                          : '✓ Valid Private Ltd (2-200 members)'}
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ scale: isPublicValid ? [1, 1.02, 1] : 1 }}
                      className={`p-3 rounded-xl border ${
                        isPublicValid
                          ? 'bg-blue-950/50 border-blue-700/80 text-blue-300'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="text-[11px] font-bold uppercase flex items-center gap-1">
                        <span>{isPublicValid ? '✓' : '✗'}</span> Public Status (Sec 2(71))
                      </div>
                      <div className="text-xs mt-1 font-semibold">
                        {isPublicValid ? '✓ Eligible for Public Issue (≥7 members)' : '✗ Ineligible (<7 members required)'}
                      </div>
                    </motion.div>
                  </div>

                  {/* Predict Then Check widget in Lab 1 */}
                  {!predictionMade ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800"
                    >
                      <p className="text-xs font-bold text-amber-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction Option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2 bg-slate-800/60 hover:bg-slate-800 text-xs rounded-lg text-slate-300 border border-slate-700/50"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-indigo-950/40 border border-indigo-700/60 rounded-xl text-xs text-indigo-200"
                    >
                      🎯 <span className="font-bold">Prediction Verified:</span> Notice how crossing 200 members turns the Private status crimson void and recommends statutory conversion under Section 18.
                    </motion.div>
                  )}
                </div>

                {/* SVG 1: Corporate Structure & Member Capacity Orbit Diagram */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Topic SVG 1: Corporate Structure & Member Orbit
                  </div>

                  <svg viewBox="0 0 320 220" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800/80" aria-label="Corporate structure orbital diagram">
                    <circle cx="160" cy="110" r="45" fill={labMembersCount > 200 ? '#1e3a8a' : '#064e3b'} stroke={labMembersCount > 200 ? '#3b82f6' : '#10b981'} strokeWidth="2" />
                    <text x="160" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                      {labMembersCount > 200 ? 'BHARAT LTD' : 'BHARAT PVT LTD'}
                    </text>
                    <text x="160" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      {labMembersCount} Members
                    </text>

                    {Array.from({ length: Math.min(12, Math.ceil(labMembersCount / 25)) }).map((_, i) => {
                      const count = Math.min(12, Math.ceil(labMembersCount / 25));
                      const angle = (i * 2 * Math.PI) / count;
                      const x = 160 + Math.cos(angle) * 75;
                      const y = 110 + Math.sin(angle) * 75;
                      return (
                        <g key={i}>
                          <circle cx={x} cy={y} r="6" fill={labMembersCount > 200 ? '#60a5fa' : '#34d399'} />
                          <line x1="160" y1="110" x2={x} y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
                        </g>
                      );
                    })}

                    <rect x="20" y="180" width="280" height="28" rx="6" fill="#0f172a" stroke="#334155" />
                    <text x="160" y="198" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">
                      Classification: {suggestedEntity}
                    </text>
                  </svg>

                  <div className="text-[11px] text-slate-400 mt-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    💡 <span className="text-white font-semibold">Statutory Rule:</span> Section 2(68) prohibits private
                    companies from inviting public capital. Suffix must legally switch from &quot;Pvt Ltd&quot; to &quot;Ltd&quot;.
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 2: SPICe+ DIGITAL INCORPORATION PIPELINE (WITH SVG 2) ─── */}
            {currentSlide === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    SPICe+ Integrated Electronic Incorporation (INC-32)
                  </h3>

                  <div className="space-y-2.5">
                    {[
                      { step: 0, name: 'Part A: Name Reservation (RUN / SPICe+ Part A)', desc: 'Valid for 20 days. Verified against existing trademarks & prohibited names.' },
                      { step: 1, name: 'Part B: MOA (e-INC-33) & AOA (e-INC-34) E-Sign', desc: 'Six MOA clauses digitally signed by subscribers with DSC certificates.' },
                      { step: 2, name: 'Integrated DIN, PAN, TAN & Bank Account Allotment', desc: 'Allotted simultaneously across CBDT and MCA within 48-72 hours.' },
                      { step: 3, name: 'INC-11: Issuance of Certificate of Incorporation & 21-Digit CIN', desc: 'Company is born as a body corporate with perpetual succession.' },
                    ].map((item) => (
                      <motion.button
                        key={item.step}
                        aria-label={`Select Incorporation Step ${item.step + 1}: ${item.name}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setLabSpiceStage(item.step);
                          audioManager.play('tap');
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all ${
                          labSpiceStage >= item.step
                            ? 'bg-emerald-950/40 border-emerald-500/80 text-slate-100'
                            : 'bg-slate-950/50 border-slate-800 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-mono text-emerald-400">Step {item.step + 1}</span>
                          {labSpiceStage >= item.step && <span className="text-xs text-emerald-400 font-bold">✓ Filed</span>}
                        </div>
                        <div className="text-sm font-semibold text-white mt-1">{item.name}</div>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* SVG 2: SPICe+ Integrated 10-in-1 Architecture Flowchart */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                    Topic SVG 2: SPICe+ 10-in-1 Portal Flowchart
                  </div>

                  <svg viewBox="0 0 320 220" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800/80" aria-label="SPICe+ Integration Flowchart">
                    {/* Central SPICe+ Hub */}
                    <rect x="100" y="85" width="120" height="50" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="160" y="106" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">SPICe+ INC-32</text>
                    <text x="160" y="122" textAnchor="middle" fill="#6ee7b7" fontSize="8">Single Electronic Window</text>

                    {/* Surrounding Connected Regulatory Portals */}
                    <rect x="15" y="15" width="80" height="26" rx="6" fill="#1e293b" stroke="#38bdf8" />
                    <text x="55" y="31" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">MCA (Name/DIN)</text>
                    <line x1="95" y1="35" x2="115" y2="85" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2,2" />

                    <rect x="225" y="15" width="80" height="26" rx="6" fill="#1e293b" stroke="#f59e0b" />
                    <text x="265" y="31" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">CBDT (PAN/TAN)</text>
                    <line x1="225" y1="35" x2="205" y2="85" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />

                    <rect x="15" y="175" width="80" height="26" rx="6" fill="#1e293b" stroke="#ec4899" />
                    <text x="55" y="191" textAnchor="middle" fill="#ec4899" fontSize="8" fontWeight="bold">EPFO / ESIC</text>
                    <line x1="95" y1="180" x2="115" y2="135" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="2,2" />

                    <rect x="225" y="175" width="80" height="26" rx="6" fill="#1e293b" stroke="#a855f7" />
                    <text x="265" y="191" textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="bold">GSTIN & Bank A/c</text>
                    <line x1="225" y1="180" x2="205" y2="135" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="2,2" />
                  </svg>

                  <div className="p-3 bg-amber-950/30 border border-amber-800/60 rounded-xl text-xs text-amber-200 mt-3">
                    ⚖️ <span className="font-bold">Section 7 Conclusiveness:</span> The Certificate of Incorporation with 21-digit CIN is conclusive proof that all statutory incorporation stages have been fulfilled.
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 3: MOA OBJECTS CLAUSE & ULTRA VIRES RADAR (WITH SVG 3) ─── */}
            {currentSlide === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    Charter Scope: AgroHarvest Mills Ltd (MOA Objects: Organic Flours & Milling)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Click proposed corporate actions to test them against the MOA Objects Clause:
                  </p>

                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      {
                        action: 'Purchasing 20 modern grain-milling roller machines for ₹15 Crores',
                        intra: true,
                        reason: 'Intra Vires (Directly in furtherance of main milling objects clause).',
                      },
                      {
                        action: 'Investing ₹50 Crores to acquire a luxury casino cruise in Goa',
                        intra: false,
                        reason: 'Ultra Vires & VOID ab initio! (Beyond permitted objects - Ashbury v. Riche rule).',
                      },
                      {
                        action: 'Borrowing ₹5 Crores from SBI to build automated flour packaging silos',
                        intra: true,
                        reason: 'Intra Vires (Ancillary object necessary for preserving finished flour).',
                      },
                      {
                        action: 'Speculating in foreign currency cryptocurrency derivatives for quick profits',
                        intra: false,
                        reason: 'Ultra Vires & VOID! Unrelated speculative trading not authorized by MOA.',
                      },
                    ].map((item, idx) => (
                      <motion.button
                        key={idx}
                        aria-label={`Test Corporate Action: ${item.action}`}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => {
                          setLabTestedAction(item.action);
                          audioManager.play(item.intra ? 'success' : 'error');
                        }}
                        className={`text-left p-3.5 rounded-xl border transition-all text-xs ${
                          labTestedAction === item.action
                            ? item.intra
                              ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100'
                              : 'bg-rose-950/70 border-rose-500 text-rose-100'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="font-semibold text-white">{item.action}</div>
                        {labTestedAction === item.action && (
                          <div className={`mt-2 font-bold ${item.intra ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {item.intra ? '✓ VALID (Intra Vires)' : '✗ VOID AB INITIO (Ultra Vires)'}: {item.reason}
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* SVG 3: MOA Boundary Shield & Ultra Vires Radar */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Topic SVG 3: MOA Objects Boundary Shield
                  </div>

                  <svg viewBox="0 0 320 220" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800/80" aria-label="MOA Ultra Vires Boundary Diagram">
                    {/* Outer Boundary Perimeter */}
                    <circle cx="160" cy="110" r="85" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="4,4" />
                    <text x="160" y="20" textAnchor="middle" fill="#fb7185" fontSize="8" fontWeight="bold">ULTRA VIRES ZONE (VOID AB INITIO)</text>

                    {/* Permitted MOA Objects Safe Shield */}
                    <circle cx="160" cy="110" r="55" fill="#064e3b" fillOpacity="0.7" stroke="#10b981" strokeWidth="2" />
                    <text x="160" y="105" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">MOA OBJECTS</text>
                    <text x="160" y="118" textAnchor="middle" fill="#6ee7b7" fontSize="8">Intra Vires (Safe Harbor)</text>

                    {/* Ashbury v Riche Doctrine Banner */}
                    <rect x="25" y="185" width="270" height="24" rx="5" fill="#0f172a" stroke="#334155" />
                    <text x="160" y="201" textAnchor="middle" fill="#fcd34d" fontSize="8" fontWeight="bold">Ashbury v. Riche (1875): 100% Shareholder Vote Cannot Ratify Void Acts</text>
                  </svg>

                  <div className="p-3 bg-indigo-950/40 border border-indigo-700/60 rounded-xl text-xs text-indigo-200 mt-3">
                    🛡️ <span className="font-bold">Dual Protection:</span> Protects shareholders from speculative detour and protects lenders from unauthorized capital misuse.
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 4: COOPERATIVE PATRONAGE SIMULATOR ─── */}
            {currentSlide === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    Amul Cooperative Model: Patronage Dividend vs Corporate Dividend
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <label htmlFor="milk-supply-range">Farmer Milk Supply to Dairy Union:</label>
                      <span className="font-mono font-bold text-emerald-400">{labCoopMilkSupply} Litres</span>
                    </div>
                    <input
                      id="milk-supply-range"
                      aria-label="Farmer Milk Supply Range"
                      type="range"
                      min={500}
                      max={10000}
                      step={500}
                      value={labCoopMilkSupply}
                      onChange={(e) => {
                        setLabCoopMilkSupply(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <label htmlFor="capital-share-range">Farmer Share Capital Owned in Society:</label>
                      <span className="font-mono font-bold text-indigo-400">{labCoopCapitalShare}% of Total Equity</span>
                    </div>
                    <input
                      id="capital-share-range"
                      aria-label="Farmer Share Capital Range"
                      type="range"
                      min={1}
                      max={50}
                      value={labCoopCapitalShare}
                      onChange={(e) => {
                        setLabCoopCapitalShare(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  {/* Dynamic Recharts Bar Comparison */}
                  <div className="h-44 w-full bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={coopVsCorpChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                        <Bar dataKey="Cooperative_Amul" fill="#10b981" name="Co-op Bonus (Patronage Based)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Corporate_JSC" fill="#6366f1" name="Corporate Dividend (Capital Based)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Core Philosophical Distinction
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="text-emerald-400 font-bold">1. Democratic Voting Rule:</div>
                    <p className="text-slate-300">
                      Cooperative: <span className="text-white font-bold">One Member, One Vote</span> (regardless of shares).
                      Joint Stock Company: One Share, One Vote (capital controls power).
                    </p>

                    <div className="text-indigo-400 font-bold pt-2">2. Surplus Distribution:</div>
                    <p className="text-slate-300">
                      Cooperative: Distributed in proportion to <span className="text-white font-bold">patronage/transactions</span>.
                      JSC: Distributed in proportion to financial capital.
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-950/40 border border-emerald-700/60 rounded-xl text-xs text-emerald-200 mt-3">
                    🏛️ <span className="font-bold">97th Constitutional Amendment (Part IXB):</span> Elevated right to
                    form cooperatives to a Fundamental Right (Art 19(1)(c)).
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 5: BLOCKCHAIN PROVENANCE & Q-COMMERCE DARK STORES ─── */}
            {currentSlide === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                      Blockchain Pharma Supply Chain
                    </h3>
                    <motion.button
                      aria-label="Toggle Tampering on Blockchain"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setLabBlockTampered(!labBlockTampered);
                        audioManager.play(labBlockTampered ? 'success' : 'error');
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] font-bold rounded-lg border border-slate-700 text-amber-300"
                    >
                      {labBlockTampered ? '✓ Restore Chain' : '✗ Simulate Counterfeit Tamper'}
                    </motion.button>
                  </div>

                  {/* Blockchain nodes visual */}
                  <div className="space-y-2">
                    {[
                      { block: 1, stage: 'Mfr: Hyderabad Plant (Batch #9021)', hash: '000a89f2...', prev: 'GENESIS' },
                      {
                        block: 2,
                        stage: 'Distributor: Patna Cold Storage',
                        hash: labBlockTampered ? 'TAMPERED_INVALID_HASH' : '000b12c4...',
                        prev: '000a89f2...',
                        tampered: labBlockTampered,
                      },
                      {
                        block: 3,
                        stage: 'Retail Pharmacy: Gaya Dispensary',
                        hash: labBlockTampered ? 'BROKEN_CHAIN_ERROR' : '000c98e1...',
                        prev: labBlockTampered ? 'TAMPERED_INVALID_HASH' : '000b12c4...',
                        broken: labBlockTampered,
                      },
                    ].map((b) => (
                      <motion.div
                        key={b.block}
                        animate={b.tampered || b.broken ? { x: [-2, 2, -2, 2, 0] } : {}}
                        className={`p-3 rounded-xl border font-mono text-xs ${
                          b.tampered || b.broken
                            ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-slate-950 border-emerald-600/60 text-emerald-300'
                        }`}
                      >
                        <div className="flex justify-between font-bold">
                          <span>Block #{b.block} [{b.stage}]</span>
                          <span>{b.tampered ? '✗ 🚨 Tampered' : b.broken ? '✗ ⚠️ Broken Chain' : '✓ Verified'}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Hash: {b.hash} | PrevHash: {b.prev}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400">
                    {labBlockTampered
                      ? '✗ Tampering with Block 2 broke cryptographic linkage to Block 3! Point-of-sale scanner immediately rejects fake drug.'
                      : '✓ Cryptographic hashes ensure end-to-end immutability and provenance tracking.'}
                  </p>
                </div>

                {/* Q-Commerce Dark Store Hub */}
                <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                    Q-Commerce 10-Min Hyperlocal Engine (Blinkit / Zepto)
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <label htmlFor="darkstore-radius">Dark Store Proximity Radius:</label>
                      <span className="font-mono font-bold text-indigo-400">{labDarkStoreRadiusKm} km</span>
                    </div>
                    <input
                      id="darkstore-radius"
                      aria-label="Dark Store Proximity Radius"
                      type="range"
                      min={0.5}
                      max={10}
                      step={0.5}
                      value={labDarkStoreRadiusKm}
                      onChange={(e) => {
                        setLabDarkStoreRadiusKm(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <label htmlFor="darkstore-skus">Dark Store Fast-Moving SKUs:</label>
                      <span className="font-mono font-bold text-emerald-400">{labDarkStoreSKUs} SKUs</span>
                    </div>
                    <input
                      id="darkstore-skus"
                      aria-label="Dark Store SKU count"
                      type="range"
                      min={1000}
                      max={15000}
                      step={500}
                      value={labDarkStoreSKUs}
                      onChange={(e) => {
                        setLabDarkStoreSKUs(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400">Estimated Delivery Time:</div>
                      <div className={`text-xl font-extrabold ${estimatedDeliveryMins <= 12 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        ⏱️ {estimatedDeliveryMins} Minutes
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <span className={`px-2.5 py-1 rounded-full font-bold ${estimatedDeliveryMins <= 12 ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-amber-950 text-amber-300 border border-amber-600'}`}>
                        {estimatedDeliveryMins <= 12 ? '✓ 10-Min Promise Kept' : '⚠️ Standard Delayed'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <motion.button
                aria-label="Navigate to previous lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              <div className="flex items-center gap-1.5">
                {EXPLORATION_STEPS.map((_, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Jump to lab ${i + 1}`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      setCurrentSlide(i);
                      audioManager.play('tap');
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === i ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Navigate to next lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Proceed to Free Sandbox Mode"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-600/20"
                >
                  Enter Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-6"
          >
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Free Sandbox Simulation Mode
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">Executive Stress-Testing Workbench</h2>
                  <p className="text-slate-300 text-sm mt-1">
                    Simulate extreme stress scenarios across corporate capitalization, ultra vires boundaries, and
                    supply chain networks. No grades or timers.
                  </p>
                </div>
                <motion.button
                  aria-label="Start Graded Challenges"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm shadow-xl shadow-emerald-500/30 whitespace-nowrap"
                >
                  Start Graded Challenges →
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <motion.div whileHover={{ y: -3 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-emerald-400">1. Private Startup Unicorn Scenario</div>
                  <p className="text-xs text-slate-400">
                    Scale a private firm with ₹100 Cr valuation and 195 angel investors. What happens if 6 more employees exercise stock options?
                  </p>
                  <motion.button
                    aria-label="Simulate 201 Members Breach"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setLabMembersCount(201);
                      audioManager.play('pop');
                    }}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-emerald-300 font-bold border border-slate-700"
                  >
                    Simulate 201 Members Breach
                  </motion.button>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-indigo-400">2. Dairy Cooperative Price Difference</div>
                  <p className="text-xs text-slate-400">
                    Compare year-end bonus pool of ₹50 Lakhs across 500 village milk producers versus private dairy shareholders.
                  </p>
                  <motion.button
                    aria-label="Set Max Patronage Volume"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setLabCoopMilkSupply(8000);
                      audioManager.play('pop');
                    }}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-indigo-300 font-bold border border-slate-700"
                  >
                    Set Max Patronage Volume
                  </motion.button>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-purple-400">3. Dark Store Hyper-Optimization</div>
                  <p className="text-xs text-slate-400">
                    Position dark store at 1.5 km with 3,000 AI-predicted items to test sub-8-minute ultra delivery.
                  </p>
                  <motion.button
                    aria-label="Set Hyperlocal 1.5 km"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setLabDarkStoreRadiusKm(1.5);
                      setLabDarkStoreSKUs(3000);
                      audioManager.play('pop');
                    }}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-purple-300 font-bold border border-slate-700"
                  >
                    Set Hyperlocal 1.5 km
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: COMPETENCY CHALLENGE ENGINE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-6"
          >
            {/* Challenge Header & Progress */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    Challenge {currentChallenge + 1} of {filteredChallenges.length}
                  </span>
                  <motion.span
                    key={difficulty}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                      difficulty === 'foundation'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : difficulty === 'standard'
                        ? 'bg-blue-950 text-blue-300 border border-blue-700'
                        : 'bg-rose-950 text-rose-300 border border-rose-700'
                    }`}
                  >
                    {difficulty} TIER
                  </motion.span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                    NEP 2020: {challenge.competencyLevel}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Score: <span className="text-emerald-400 font-bold">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>

              {/* 2D Canvas wave status */}
              <canvas ref={canvasRef} width={600} height={30} className="w-full rounded-lg h-6 hidden md:block" />
            </motion.div>

            {/* Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">{challenge.question}</h3>

              {/* ─── CHALLENGE TYPE 1: MCQ ─── */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
                challenge.options && (
                  <div className="grid grid-cols-1 gap-3 mt-5">
                    {challenge.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Select answer option ${String.fromCharCode(65 + i)}: ${opt}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        onClick={() => handleAnswer(i)}
                        disabled={answerRevealed || showExplanation}
                        className={`text-left p-4 rounded-xl text-xs md:text-sm transition-all border ${
                          showExplanation && i === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                            : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="font-mono font-bold mr-2 text-emerald-400">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {showExplanation && i === challenge.correctIndex && <span className="mr-1 text-emerald-400">✓ </span>}
                        {showExplanation && i !== challenge.correctIndex && <span className="mr-1 text-slate-500">✗ </span>}
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* ─── CHALLENGE TYPE 2: DRAG-LABEL (MOA Clauses Diagram) ─── */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="mt-5 space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold self-center mr-2">Drag Labels:</span>
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
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'box_name', label: '1. Name & Suffix Clause', desc: 'Mandatory Ltd / Pvt Ltd identifier' },
                      { id: 'box_domicile', label: '2. Registered Office Clause', desc: 'Fixes State jurisdiction of RoC' },
                      { id: 'box_objects', label: '3. Objects Clause', desc: 'Defines ultra vires boundary of activities' },
                      { id: 'box_liability', label: '4. Liability Clause', desc: 'Limits member risk to unpaid share value' },
                    ].map((target) => (
                      <div
                        key={target.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 hover:border-emerald-500 transition-all flex flex-col justify-between min-h-[90px]"
                      >
                        <div className="text-xs text-slate-400">{target.label}</div>
                        <div className="text-xs text-slate-500 font-mono">{target.desc}</div>
                        <div className="mt-2 text-sm font-bold text-emerald-400">
                          {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop matching clause here'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Submit MOA Clauses Mapping"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs"
                  >
                    Submit Clauses Mapping
                  </motion.button>
                </div>
              )}

              {/* ─── CHALLENGE TYPE 3: DRAG-SORT ─── */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="mt-5 space-y-3">
                  <p className="text-xs text-slate-400">
                    Drag items to reorder them into the correct statutory sequence:
                  </p>
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map((idx) => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Formation stage item ${displayIdx + 1}: ${item}`}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3.5 bg-slate-950 border border-slate-800 hover:border-indigo-500/60 rounded-xl text-xs md:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                      >
                        <span className="font-mono font-bold text-indigo-400 mr-2">Stage {displayIdx + 1}:</span>
                        <span className="flex-1 font-semibold">{item}</span>
                        <span className="text-slate-500 text-xs">☰ Drag</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Check Sequence Order"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs"
                  >
                    Check Order
                  </motion.button>
                </div>
              )}

              {/* ─── CHALLENGE TYPE 4: NUMERIC ─── */}
              {challenge.type === 'numeric' && (
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      aria-label="Calculated Patronage Bonus Input"
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter calculated amount"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-sm font-bold text-slate-300">{challenge.unit}</span>
                    <motion.button
                      aria-label="Verify Calculation"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs"
                    >
                      Verify Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ─── CHALLENGE TYPE 5: CONSTRUCT ─── */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="mt-5 space-y-3">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>

                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add hierarchy element ${part}`}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleConstructAdd(part)}
                        className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                    {constructParts.map((part, i) => (
                      <React.Fragment key={i}>
                        <span className="px-3 py-1 bg-emerald-950 border border-emerald-600 text-emerald-300 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5">
                          {part}
                          <motion.button
                            aria-label={`Remove ${part}`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => handleConstructRemove(i)}
                            className="text-rose-400 hover:text-rose-200"
                          >
                            ×
                          </motion.button>
                        </span>
                        {i < constructParts.length - 1 && <span className="text-slate-500 font-bold">&gt;</span>}
                      </React.Fragment>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-slate-600 text-xs font-mono">Click parts above to assemble statutory hierarchy</span>
                    )}
                  </div>

                  <motion.button
                    aria-label="Validate Hierarchy Construction"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(constructParts.join(' > '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs"
                  >
                    Validate Construction
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 to-slate-950 border border-amber-700/80 rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Step-by-Step Statutory Breakdown
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter((s) => s.trim()).length}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {challenge.explanation
                      .split('. ')
                      .filter((s) => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs md:text-sm text-amber-100 leading-relaxed"
                        >
                          <span className="font-bold text-amber-400 font-mono mr-1.5">{i + 1}.</span>
                          {sentence}
                          {!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim()).length - 1 ? (
                      <motion.button
                        aria-label="Show next explanation step"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setRevealedSteps((s) => s + 1);
                          audioManager.play('pop');
                        }}
                        className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg text-xs"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <div className="text-[11px] text-emerald-400 font-bold">✓ Full analysis revealed</div>
                    )}

                    {revealedSteps >= challenge.explanation.split('. ').filter((s) => s.trim()).length - 1 && (
                      <motion.button
                        aria-label="Proceed to next challenge"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-emerald-500/20"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Odyssey →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION, REFLECTIONS & MOTIVATIONAL FEEDBACK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-600 rounded-3xl text-center space-y-4 shadow-2xl"
            >
              <span className="text-4xl">🏆</span>
              <h2 className="text-3xl font-extrabold text-white">Enterprise Mastery Achieved!</h2>
              <div className="text-5xl font-black text-emerald-400 font-mono tracking-tight">
                {Math.max(0, 100 - errors * 5)}%
              </div>
              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                BKT Mastery Status: <span className="font-bold text-white uppercase font-mono">{masteryLevel}</span>. You
                have navigated statutory company formation, ultra vires doctrine, cooperative democracy, and emerging tech architectures!
              </p>

              {/* MOTIVATIONAL FEEDBACK SECTION */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="p-4 bg-slate-950/80 border border-emerald-700/60 rounded-2xl max-w-xl mx-auto text-xs text-emerald-200 font-medium leading-relaxed"
              >
                {motivationalMessage}
              </motion.div>
            </motion.div>

            {/* REFLECTION SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>🤔</span> Executive Reflection & Metacognition
              </h3>
              <p className="text-xs text-slate-300">
                Cement your conceptual understanding by reflecting on the core statutory tenets you just explored:
              </p>

              <div className="space-y-4 pt-1">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="ref-q1" className="text-xs font-bold text-indigo-300 block">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    id="ref-q1"
                    rows={2}
                    value={reflectionAnswers.q1}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q1: e.target.value })}
                    placeholder="E.g., How Ultra Vires acts are totally void and cannot be ratified even by 100% of shareholders..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="ref-q2" className="text-xs font-bold text-indigo-300 block">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    id="ref-q2"
                    rows={2}
                    value={reflectionAnswers.q2}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q2: e.target.value })}
                    placeholder="E.g., A private company is like a closed VIP room capped at 200 members, while public companies invite anyone..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="ref-q3" className="text-xs font-bold text-indigo-300 block">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    id="ref-q3"
                    rows={2}
                    value={reflectionAnswers.q3}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q3: e.target.value })}
                    placeholder="E.g., Incorporating my own agritech or D2C startup via SPICe+ and drafting its MOA Objects clause..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* Misconception Tracking Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                  <span>🚨</span> Identified Conceptual Gaps & Statutory Corrections
                </h3>
                <div className="space-y-2.5">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                        <div className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</div>
                        <div className="text-emerald-300 font-medium mt-1">✓ Statutory Correction: {m.correction}</div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Real World Activity Arc */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-xs md:text-sm">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    {step}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Spaced Repetition SRS Notification */}
            <div className="p-4 bg-amber-950/40 border border-amber-800/80 rounded-2xl flex items-center justify-between text-xs text-amber-200">
              <div>
                <span className="font-bold">📅 SM-2 Spaced Repetition Active:</span> Next review scheduled in{' '}
                <span className="font-bold text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
              </div>
              <motion.button
                aria-label="Re-explore interactive laboratories"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentSlide(0);
                  audioManager.play('whoosh');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold"
              >
                Re-Explore Labs
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Statutory Milestone Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C11_BusinessStudiesPublicPrivateCompaniesSim;
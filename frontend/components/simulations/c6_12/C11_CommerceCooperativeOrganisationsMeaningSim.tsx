'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// ─��─ NODE CONSTANTS ──────────────────────────────────────────────────────────
const NODE_C11_COMM_021 = 'c11_comm_021';
const NODE_C11_COMM_022 = 'c11_comm_022';
const NODE_C11_COMM_023 = 'c11_comm_023';
const NODE_C11_COMM_024 = 'c11_comm_024';
const NODE_C11_COMM_025 = 'c11_comm_025';
const NODE_C11_COMM_026 = 'c11_comm_026';
const NODE_C11_COMM_027 = 'c11_comm_027';
const NODE_C11_COMM_028 = 'c11_comm_028';
const NODE_C11_COMM_029 = 'c11_comm_029';
const NODE_C11_COMM_030 = 'c11_comm_030';

const ALL_NODE_IDS = [
  NODE_C11_COMM_021,
  NODE_C11_COMM_022,
  NODE_C11_COMM_023,
  NODE_C11_COMM_024,
  NODE_C11_COMM_025,
  NODE_C11_COMM_026,
  NODE_C11_COMM_027,
  NODE_C11_COMM_028,
  NODE_C11_COMM_029,
  NODE_C11_COMM_030,
];

// ─── NARRATIVE SCENARIO ──────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Anand to Cyber Hub: The Great Commerce Transformation',
  intro: 'You are appointed Chief Strategy Consultant to Navodaya Enterprises, an Indian business advisory council. From dairy farmers in Gujarat establishing Amul under the Co-operative Societies Act 1912 to ancestral HUFs, ethical corporate boards, and digital platforms processing UPI payments, your decisions dictate whether Indian enterprises achieve democratic equity, statutory compliance, and digital security.',
  context: 'Balance member welfare against capital return, enforce CSR mandates (Sec 135 Companies Act 2013), protect consumer safety (FSSAI/CPA 2019), and secure online transaction gateways against cyber threats (IT Act 2000, DPDP Act 2023).',
};

// ─── DISCOVERY QUESTION ──────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: "In 1946, milk farmers in Kaira District rebelled against Polson Dairy's monopoly by forming Amul. If Farmer Rajesh contributes 10x more capital than Farmer Anand, but Anand delivers 10x more milk, who holds more voting power and who gets the larger profit surplus?",
  options: [
    'Rajesh has 10x votes (capital rule); Rajesh gets 10x surplus (dividend rule)',
    'Equal votes (1 member 1 vote); Anand gets 10x surplus (patronage refund)',
    'Equal votes; Rajesh gets 10x surplus because capital generates profit',
    'Anand has 10x votes because milk volume equals voting weight; equal surplus',
  ],
  correctIndex: 1,
  hintAfter: 'Co-operatives follow "One Member, One Vote" for control, but distribute surplus by patronage (business done), not capital invested! Let us explore why.',
};

// ─── CHALLENGE INTERFACE ─────────────────────────────────────────────────────
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

// ─── 22 COMPREHENSIVE CHALLENGES ─────────────────────────────────────────────
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-7)
  {
    id: 'ch_01_coop_basics',
    nodeId: NODE_C11_COMM_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 5 of the Co-operative Societies Act 1912 and the 97th Constitutional Amendment 2011, which principle governs voting in a registered co-operative society?',
    options: ['One Share, One Vote', 'One Member, One Vote', 'Weighted Voting by Land Ownership', 'Voting proportioned to Annual Turnover'],
    correctIndex: 1,
    explanation: 'A co-operative society follows democratic control on the principle of "one member, one vote" regardless of capital contributed (unlike a joint-stock company where voting follows "one share, one vote").',
    hints: [
      'Think about democratic equality versus capital dominance.',
      'Does a farmer with 50 shares get more votes than a farmer with 1 share in Amul?',
      'Every human member has exactly one single vote.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_huf_karta',
    nodeId: NODE_C11_COMM_022,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a Joint Hindu Family (HUF) business governed by the Mitakshara school, how is liability structured between the Karta and the other coparceners?',
    options: [
      'All coparceners have unlimited personal liability equally',
      'The Karta has unlimited liability; other coparceners are limited to their share in family property',
      'The Karta has limited liability; coparceners bear unlimited joint liability',
      'All members have liability capped strictly at ₹1,00,000 under the Hindu Succession Act',
    ],
    correctIndex: 1,
    explanation: 'Only the Karta has unlimited liability because he possesses the sole executive power to bind the family. Other coparceners have liability strictly limited to their undivided share in joint family property.',
    hints: [
      'Who makes the business decisions and signs binding loan contracts in an HUF?',
      'The person who holds the power also bears the unlimited risk.',
      'The Karta has unlimited liability, while other coparceners enjoy limited liability.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_csr_threshold',
    nodeId: NODE_C11_COMM_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 135 of the Companies Act 2013, what minimum percentage of average net profits of the preceding 3 financial years must a qualifying company spend on CSR?',
    options: ['1%', '2%', '5%', '10%'],
    correctIndex: 1,
    explanation: 'Section 135 mandates that qualifying companies (net worth ≥ ₹500cr, turnover ≥ ₹1000cr, or net profit ≥ ₹5cr) must spend at least 2% of their average net profit of the preceding 3 years on Schedule VII CSR activities.',
    hints: [
      'It is a single-digit percentage established by Parliament in 2013.',
      'Think of the 2-rupee spend per 100 rupees of average profit.',
      'The statutory mandate is exactly 2%.',
    ],
  },
  {
    id: 'ch_04_ebiz_scope_drag',
    nodeId: NODE_C11_COMM_027,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each transaction model to its correct real-world Indian platform example.',
    dragItems: [
      { label: 'IndiaMART (Wholesale supply)', targetId: 'box_b2b' },
      { label: 'Flipkart / Nykaa (Consumer retail)', targetId: 'box_b2c' },
      { label: 'TCS Ultimatix Portal (Internal HR)', targetId: 'box_intrab' },
      { label: 'OLX India (Used cycle resale)', targetId: 'box_c2c' },
    ],
    correctMapping: {
      box_b2b: 'IndiaMART (Wholesale supply)',
      box_b2c: 'Flipkart / Nykaa (Consumer retail)',
      box_intrab: 'TCS Ultimatix Portal (Internal HR)',
      box_c2c: 'OLX India (Used cycle resale)',
    },
    explanation: 'IndiaMART connects business to business (B2B); Flipkart connects business to consumer (B2C); TCS internal portal operates intra-business (Intra-B); OLX facilitates consumer-to-consumer (C2C) exchanges.',
    hints: [
      'Look at who is selling and who is buying in each transaction.',
      'Internal employee apps within a single enterprise represent Intra-B.',
      'C2C involves two private individuals trading used goods.',
    ],
  },
  {
    id: 'ch_05_ecommerce_subset',
    nodeId: NODE_C11_COMM_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement correctly defines the mathematical set relationship between E-commerce and E-business?',
    options: [
      'E-commerce ⊂ E-business (E-commerce is a narrow subset covering online buying and selling)',
      'E-business ⊂ E-commerce (E-business is a subset of online retailing)',
      'E-commerce = E-business (They are completely identical synonyms)',
      'E-commerce and E-business are completely disjoint sets with zero operational overlap',
    ],
    correctIndex: 0,
    explanation: 'E-commerce covers specifically the buying and selling transaction layer. E-business is the broader superset encompassing ERP, supply chain, digital HR, inventory, finance, and marketing.',
    hints: [
      'Is selling goods online the ONLY digital business process?',
      'What about inventory tracking, digital payroll, and internal communication?',
      'E-commerce is a subset: E-commerce ⊂ E-business.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_06_security_phishing',
    nodeId: NODE_C11_COMM_029,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An employee receives an SMS claiming "SBI KYC Expired: Click link to update" which leads to a spoofed web page that captures login credentials. How is this attack classified?',
    options: ['Technical Hacking (SQL injection)', 'Phishing (Social engineering deception)', 'Ransomware worm attack', 'Denial of Service (DoS)'],
    correctIndex: 1,
    explanation: 'Phishing attacks the human mind via social engineering and lookalike interfaces to steal credentials. Hacking attacks technical vulnerabilities in hardware/software without user cooperation.',
    hints: [
      'Did the attacker break the server\'s code, or trick the person into revealing their password?',
      'Manipulating a person with a fake message is social engineering.',
      'This is classic Phishing.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_07_payment_resources',
    nodeId: NODE_C11_COMM_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is the physical resource indispensable for an e-business selling tangible consumer goods?',
    options: ['Cloud Virtual Machine', 'Logistics / Courier Partner (e.g., Delhivery, BlueDart)', 'SSL Certificate authority', 'Graphic Design Suite'],
    correctIndex: 1,
    explanation: 'While websites and gateways capture orders digitally, physical goods require a logistics and courier partner to fulfill the physical last-mile delivery to the customer.',
    hints: [
      'After an online payment succeeds, how does a Varanasi saree reach a buyer in Mumbai?',
      'Digital code cannot physically transport physical cotton fabric.',
      'You must have a physical logistics and delivery partner.',
    ],
  },

  // Standard Tier (8-15)
  {
    id: 'ch_08_csr_calc_numeric',
    nodeId: NODE_C11_COMM_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Hind Chem Ltd earned net profits of ₹120 crore in Year 1, ₹150 crore in Year 2, and ₹180 crore in Year 3. What is its mandatory minimum CSR spend (in ₹ crore) for Year 4 under Section 135?',
    correctAnswer: 3,
    tolerance: 0.1,
    unit: 'crore',
    explanation: 'Average net profit = (120 + 150 + 180) / 3 = ₹150 crore. Mandatory CSR spend = 2% of ₹150 crore = ₹3.0 crore.',
    hints: [
      'Step 1: Calculate the 3-year average net profit: (120 + 150 + 180) / 3.',
      'Step 2: Take 2% of that average amount.',
      '150 crore × 0.02 = 3.0 crore.',
    ],
  },
  {
    id: 'ch_09_ethics_vs_law',
    nodeId: NODE_C11_COMM_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A factory in Tirupur pays its garment stitchers the statutory minimum wage of ₹8,000/month (legal), while the owner earns ₹40 crore profit and workers cannot afford basic nutrition. How is this characterized?',
    options: [
      'Legally compliant and fully ethical because the statutory floor is met',
      'Legally compliant but ethically deficient (Law sets the minimum floor; ethics demands a living wage)',
      'Illegal under the Companies Act 2013 Section 166',
      'A criminal violation of the Prevention of Corruption Act 1988',
    ],
    correctIndex: 1,
    explanation: 'Law establishes the minimum compulsory floor below which punishment occurs. Ethics sets a higher voluntary standard. Meeting the legal wage while exploiting labour during massive profits is legal but unethical.',
    hints: [
      'Is obeying the minimum statutory law synonymous with doing what is morally right?',
      'Think of "the floor" (law) versus "the ceiling/standard" (ethics).',
      'The factory satisfies legal compliance but falls short of ethical responsibility.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_10_coop_vs_company',
    nodeId: NODE_C11_COMM_021,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the 4 structural steps in how Amul (GCMMF) operates from farmer milk collection to surplus distribution.',
    sortItems: [
      'Village milk producers voluntarily pool daily milk at collection centres',
      'Democratic election of managing committee on "One Member, One Vote" basis',
      'Processing into butter, cheese, and packaged milk sold nationwide under Amul brand',
      'Annual financial surplus distributed to farmers as Patronage Refund based on milk supplied',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Co-operative workflow: 1. Pooling of produce -> 2. Democratic member governance -> 3. Value-add processing -> 4. Surplus sharing based on patronage (volume supplied, not capital).',
    hints: [
      'Start with the grassroot farmer delivering milk.',
      'Democratic elections govern the infrastructure.',
      'Processing and marketing precede the final patronage refund.',
    ],
  },
  {
    id: 'ch_11_stakeholder_mapping',
    nodeId: NODE_C11_COMM_024,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the corporate crisis to the specific stakeholder responsibility failure and statutory breach.',
    options: [
      'Nestlé Maggi 2015 Ban (Lead/MSG) → Consumer safety failure under Consumer Protection Act & FSSAI',
      'Maruti Manesar 2012 Strike → Investor dividend failure under SEBI LODR',
      'Satyam 2009 ₹7,000cr Fraud → Community afforestation breach under Water Act 1974',
      'Vedanta Sterlite Tuticorin 2018 → Employee minimum wage breach under EPF Act 1952',
    ],
    correctIndex: 0,
    explanation: 'The Maggi ban of 2015 involved high lead/MSG violating consumer safety under FSSAI and the Consumer Protection Act. Maruti was an employee relations breakdown, Satyam was investor/accounting fraud, and Sterlite was environmental pollution.',
    hints: [
      'Look for the case where product toxicity endangered eaters.',
      'Maggi noodles directly affected consumers buying food items.',
      'Option A correctly pairs Maggi with Consumer safety and FSSAI regulation.',
    ],
  },
  {
    id: 'ch_12_vineeta_sharma_huf',
    nodeId: NODE_C11_COMM_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Following the Hindu Succession (Amendment) Act 2005 and the landmark Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020), what is the legal coparcenary status of a daughter born in a Mitakshara HUF?',
    options: [
      'Daughters are coparceners by birth with rights equal to sons, irrespective of whether the father was alive in 2005',
      'Daughters only receive maintenance rights and cannot demand partition of ancestral property',
      'Daughters become coparceners only if there are no surviving male coparceners in the family',
      'Daughters lose all coparcenary claims upon marriage under the Dayabhaga school',
    ],
    correctIndex: 0,
    explanation: 'The Supreme Court ruled in Vineeta Sharma (2020) that daughters inherit coparcenary rights by birth on equal footing with sons in Mitakshara families, regardless of whether the father was alive on 9 September 2005.',
    hints: [
      'Did the 2005 amendment create complete equality for daughters from birth?',
      'The 2020 Supreme Court judgment removed the requirement that the father must be alive in 2005.',
      'Daughters hold full coparcenary rights by birth equal to sons.',
    ],
  },
  {
    id: 'ch_13_gateway_vs_wallet',
    nodeId: NODE_C11_COMM_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the decisive structural difference between Razorpay (Payment Gateway) and Paytm Wallet (Prepaid Payment Instrument)?',
    options: [
      'Razorpay stores pre-loaded customer cash; Paytm Wallet only transmits encrypted card data',
      'Paytm Wallet is a licensed PPI storing pre-loaded stored value; Razorpay is a technology bridge transmitting credentials without storing cash value',
      'Payment gateways charge zero fees; Wallets always charge 10% MDR to merchants',
      'Gateways are regulated by TRAI, whereas Wallets are regulated by SEBI',
    ],
    correctIndex: 1,
    explanation: 'Under RBI\'s Master Directions on PPIs, a digital wallet stores pre-loaded monetary value. A payment gateway is an encrypted conduit that passes transaction credentials between customer, gateway, and bank.',
    hints: [
      'Does Razorpay keep your balance in an account, or just pass your UPI PIN/card info to SBI?',
      'A wallet holds stored funds loaded in advance.',
      'Paytm Wallet stores value; Razorpay acts as a transmission gateway.',
    ],
  },
  {
    id: 'ch_14_environmental_ngt',
    nodeId: NODE_C11_COMM_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When the Tamil Nadu Pollution Control Board closed Vedanta\'s Sterlite copper smelter in 2018 costing ₹3,000 crore revenue, which environmental jurisprudence principle established in the Vellore Citizens case (1996) was enforced?',
    options: ['Caveat Emptor', 'Polluter Pays Principle', 'Laissez-Faire Doctrine', 'Corporate Veil Immunity'],
    correctIndex: 1,
    explanation: 'The National Green Tribunal and Supreme Court enforce the "Polluter Pays" principle (Vellore Citizens case 1996), making industrial polluters liable for full environmental cleanup, remediation, and statutory shutdown.',
    hints: [
      'Who must bear the financial cost of industrial pollution and toxic effluent damage?',
      'The enterprise causing the pollution must pay the penalty and cleanup costs.',
      'It is the "Polluter Pays" principle.',
    ],
  },
  {
    id: 'ch_15_dpdp_act_penalty',
    nodeId: NODE_C11_COMM_029,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Under the Digital Personal Data Protection Act 2023 (DPDP Act), what is the maximum statutory penalty (in ₹ crore) that the Data Protection Board can impose on a company for failing to prevent a significant data breach?',
    correctAnswer: 250,
    tolerance: 0,
    unit: 'crore',
    explanation: 'The DPDP Act 2023 escalated corporate data accountability significantly by establishing penalties up to ₹250 crore for failure to observe reasonable security safeguards to prevent personal data breaches.',
    hints: [
      'It is a massive three-digit crore figure enacted by Parliament in August 2023.',
      'Quarter of a thousand crore rupees.',
      'The penalty is up to ₹250 crore.',
    ],
  },

  // Advanced Tier (16-22)
  {
    id: 'ch_16_construct_governance',
    nodeId: NODE_C11_COMM_026,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the three core pillars that distinguish an ethical enterprise from a merely legal one.',
    availableParts: ['Statutory Compliance Floor', 'Fiduciary Director Duties (Sec 166)', 'Voluntary Moral Standard (Tata Code)', 'Maximising Short-term Stock Bubble', 'Misleading Advertisements'],
    targetState: 'Statutory Compliance Floor Fiduciary Director Duties (Sec 166) Voluntary Moral Standard (Tata Code)',
    validationHint: 'Select the legal baseline, the statutory governance duty, and the voluntary ethical code.',
    explanation: 'A comprehensive governance framework combines the legal floor (statutory compliance), statutory fiduciary responsibilities (Companies Act Sec 166), and voluntary moral codes (e.g. Tata Code of Conduct).',
    hints: [
      'Choose the three constructive governance elements.',
      'Exclude misleading ads and short-term stock manipulation.',
      'Assemble: Statutory Compliance Floor + Fiduciary Director Duties + Voluntary Moral Standard.',
    ],
  },
  {
    id: 'ch_17_patronage_math_numeric',
    nodeId: NODE_C11_COMM_021,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Kaira Milk Co-op has ₹10,00,000 surplus to distribute as patronage refund after statutory reserves. Total milk collected was 50,000 litres. Farmer Dev contributed 2,500 litres. How much patronage refund (in ₹) will Dev receive?',
    correctAnswer: 50000,
    tolerance: 100,
    unit: 'rupees',
    explanation: 'Patronage refund per litre = ₹10,00,000 / 50,000 litres = ₹20 per litre. Dev\'s share = 2,500 litres × ₹20 = ₹50,000.',
    hints: [
      'Step 1: Divide total surplus ₹10,00,000 by 50,000 litres to find surplus per litre.',
      '₹10,00,000 / 50,000 = ₹20/litre.',
      'Step 2: Multiply 2,500 litres by ₹20/litre.',
    ],
  },
  {
    id: 'ch_18_ondc_duopoly_eval',
    nodeId: NODE_C11_COMM_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does the Open Network for Digital Commerce (ONDC launched by DPIIT in 2022) structurally alter the Indian e-commerce landscape compared to Amazon and Flipkart?',
    options: [
      'It creates a single government-owned monopoly retail store that buys all physical goods',
      'It unbundles buyer and seller apps into an open interoperable network (like UPI for payments), breaking platform lock-in for small kiranas',
      'It bans all private couriers and requires India Post to handle 100% of e-commerce parcels',
      'It eliminates the need for payment gateways and forces strictly Cash-On-Delivery',
    ],
    correctIndex: 1,
    explanation: 'ONDC operates as an open protocol where buyers on any app (e.g., Paytm/Magicpin) can purchase from sellers on any other app without being trapped in closed platform monopolies.',
    hints: [
      'Think of how UPI lets a Google Pay user send money to a PhonePe user.',
      'ONDC does the same thing for commerce: any buyer app connects to any seller app.',
      'It is an open interoperable protocol breaking platform lock-in.',
    ],
  },
  {
    id: 'ch_19_security_stack_drag',
    nodeId: NODE_C11_COMM_029,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Map each cybersecurity defensive technology to the exact vulnerability layer it safeguards.',
    dragItems: [
      { label: 'SSL / TLS Certificate', targetId: 'layer_channel' },
      { label: 'Two-Factor Authentication (OTP/Biometric)', targetId: 'layer_identity' },
      { label: 'Web Application Firewall (WAF)', targetId: 'layer_perimeter' },
      { label: 'Air-Gapped Offline Backups', targetId: 'layer_ransomware' },
    ],
    correctMapping: {
      layer_channel: 'SSL / TLS Certificate',
      layer_identity: 'Two-Factor Authentication (OTP/Biometric)',
      layer_perimeter: 'Web Application Firewall (WAF)',
      layer_ransomware: 'Air-Gapped Offline Backups',
    },
    explanation: 'SSL protects data in transit across the communication channel; 2FA authenticates human identity; WAF filters malicious network payloads; offline backups safeguard against ransomware encryption.',
    hints: [
      'Which layer encrypts data flying across public Wi-Fi? (Channel)',
      'Which measure prevents stolen passwords from logging in? (Identity)',
      'Which measure guarantees data restoration after ransomware? (Offline Backups)',
    ],
  },
  {
    id: 'ch_20_dayabhaga_vs_mitakshara',
    nodeId: NODE_C11_COMM_022,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare the Dayabhaga school of Hindu Law (Bengal & Assam) with the Mitakshara school (Rest of India). Which statement accurately captures the coparcenary origin?',
    options: [
      'Under Mitakshara, coparcenary rights arise at birth; under Dayabhaga, rights arise only upon the death of the father/last holder',
      'Under Dayabhaga, daughters were Kartas since 1850; Mitakshara banned women permanently',
      'Mitakshara requires partnership deed registration; Dayabhaga operates under Companies Act 2013',
      'Dayabhaga allows unlimited liability for all members, whereas Mitakshara limits Karta liability',
    ],
    correctIndex: 0,
    explanation: 'Mitakshara confers coparcenary ownership right by birth (Janmaswatvavada). Dayabhaga confers ownership only upon the demise of the ancestor (Uparamaswatvavada).',
    hints: [
      'When does a son or daughter acquire interest in Mitakshara vs Dayabhaga?',
      'Mitakshara = Right by birth.',
      'Dayabhaga = Right only at succession after death.',
    ],
  },
  {
    id: 'ch_21_satyam_governance',
    nodeId: NODE_C11_COMM_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the Satyam Computers 2009 fraud (₹7,000 crore inflated cash balance), which corporate governance safeguard required under SEBI LODR Regulation 9A was critically subverted?',
    options: ['Whistleblower mechanism and independent internal audit verification', 'Foreign direct investment quota filing', 'GST input tax credit reconciliation', 'Pollution Control Board Consent to Operate'],
    correctIndex: 0,
    explanation: 'The Satyam scandal exposed deep breakdowns in independent audit verification, board oversight, and whistleblower escalation channels, leading to major reforms in the Companies Act 2013 (Sec 177 Vigil Mechanism).',
    hints: [
      'How are fake bank fixed-deposit receipts and inflated balance sheets kept secret from investors?',
      'Independent audit verification and internal whistleblower channels were suppressed.',
      'Option A highlights the whistleblower and independent audit breakdown.',
    ],
  },
  {
    id: 'ch_22_cod_inclusion_tradeoff',
    nodeId: NODE_C11_COMM_028,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do Indian e-commerce marketplaces (e.g. Meesho) maintain Cash on Delivery (COD) despite a high Return-To-Origin (RTO) penalty cost of ₹20-40 per order?',
    options: [
      'RBI mandates that 100% of all Indian e-commerce orders must be paid by physical currency notes',
      'Over 19 crore Indian adults remain under-banked, making COD an ethical and commercial bridge for Tier-3/rural consumer inclusion',
      'Couriers charge zero handling fees on cash transactions compared to credit card interchange',
      'COD transactions provide instant real-time bank settlement within 2 seconds',
    ],
    correctIndex: 1,
    explanation: 'COD overcomes the digital trust deficit and banking barriers for ~19 crore under-banked citizens in semi-urban and rural Bharat, trading operational returns cost for massive market reach.',
    hints: [
      'Does every Indian citizen in rural villages hold a funded credit card or active UPI app?',
      'Cash on delivery enables unbanked citizens to participate in digital commerce.',
      'Option B correctly identifies financial inclusion and trust in Bharat.',
    ],
  },
];

// ─── PROPS & DEFAULTS ────────────────────────────────────────────────────────
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
  nodeId: NODE_C11_COMM_021,
  title: 'Co-operative Organisations, HUF, Social Responsibility, Ethics & E-Commerce',
  definition: 'Comprehensive mastery of Indian organizational structures (Co-operatives under Act 1912, HUF under Hindu Succession Act 1956), statutory CSR (Sec 135 Companies Act 2013), business ethics (Sec 166), and electronic business systems (IT Act 2000, DPDP Act 2023).',
  eli5: 'Learn how Indian farmers build democratic dairies (Amul), how families run shops by birthright (HUF), why companies must share 2% profit with society (CSR), and how online stores (Flipkart/UPI) deliver goods securely without getting hacked!',
  misconceptions: [
    {
      misconception: 'In co-operatives, members who contribute more capital get more votes like companies.',
      correction: 'Co-operatives strictly follow "One Member, One Vote" regardless of capital. Surplus is distributed by patronage (business done), not capital shares.',
    },
    {
      misconception: 'All HUF family members have unlimited liability for business debts.',
      correction: 'Only the Karta has unlimited liability. All other coparceners have liability strictly limited to their share in joint ancestral property.',
    },
    {
      misconception: 'E-commerce and E-business are completely identical terms.',
      correction: 'E-commerce (buying/selling online) is a narrow subset of E-business, which covers all digital business operations (ERP, HR, procurement).',
    },
    {
      misconception: 'Phishing is just a software bug or server hacking technique.',
      correction: 'Phishing attacks the human via deception and social engineering (fake SMS/email); hacking attacks technical vulnerabilities in computer code.',
    },
    {
      misconception: 'A company that obeys the minimum statutory wage law is automatically ethical.',
      correction: 'Law sets the minimum compulsory floor; ethics represents a higher voluntary moral standard for human dignity and living wages.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the voting principle in a registered co-operative society?', options: ['One Share, One Vote', 'One Member, One Vote', 'Weighted by capital', 'Seniority based'], correctIndex: 1 },
    { question: 'Who bears unlimited liability in a Joint Hindu Family business?', options: ['All Coparceners', 'Only the Karta', 'Only Minor Sons', 'External creditors'], correctIndex: 1 },
    { question: 'What minimum CSR percentage is mandated under Section 135 of Companies Act 2013?', options: ['1%', '2%', '5%', '10%'], correctIndex: 1 },
    { question: 'What is the relationship between e-commerce and e-business?', options: ['E-commerce ⊂ E-business', 'E-business ⊂ E-commerce', 'E-commerce = E-business', 'Completely unrelated'], correctIndex: 0 },
    { question: 'Which Supreme Court case established the "Polluter Pays" principle in India?', options: ['Bhopal Gas Case', 'Vellore Citizens Welfare Forum (1996)', 'Vineeta Sharma (2020)', 'Satyam Scam (2009)'], correctIndex: 1 },
    { question: 'What is the statutory penalty ceiling under DPDP Act 2023 for severe data breaches?', options: ['₹50 Lakh', '₹10 Crore', '₹250 Crore', '₹1,000 Crore'], correctIndex: 2 },
    { question: 'Under Mitakshara law, when does a coparcener acquire interest in family property?', options: ['At marriage', 'By birth', 'Upon father\'s death', 'At age 21'], correctIndex: 1 },
    { question: 'Which protocol was launched in 2022 to break e-commerce platform duopolies?', options: ['UPI', 'ONDC', 'NEFT', 'IMPS'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full proficiency across Indian co-operative principles, HUF governance, statutory CSR calculations, business ethics, and digital commerce architectures.',
};

// ─── EXPLORATION STEPS ───────────────────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Co-operative Economics Lab: Voting vs Patronage',
    instruction: 'Adjust the milk supply and capital contributions of Farmer Dev and Farmer Gita. Observe how democratic voting power remains equal while surplus follows patronage.',
    interactionType: 'slider-coop',
    nodeId: NODE_C11_COMM_021,
  },
  {
    title: 'HUF Liability & Coparcenary Simulator',
    instruction: 'Simulate business debts and daughter coparcenary inclusion. Observe how Karta personal assets absorb liability while coparceners are protected.',
    interactionType: 'toggle-huf',
    nodeId: NODE_C11_COMM_022,
  },
  {
    title: 'Statutory CSR Calculator (Sec 135 Companies Act)',
    instruction: 'Modify the 3-year net profits of an enterprise to calculate mandatory 2% CSR spend and allocate funds across Schedule VII projects.',
    interactionType: 'calc-csr',
    nodeId: NODE_C11_COMM_023,
  },
  {
    title: 'E-Business vs E-Commerce Architectural Scope',
    instruction: 'Click different corporate modules (ERP, Inventory, Web Checkout, HR Portal) to see whether they fall under E-Commerce, E-Business, or both.',
    interactionType: 'scope-explorer',
    nodeId: NODE_C11_COMM_027,
  },
  {
    title: 'Cybersecurity Threat & Defense Matrix',
    instruction: 'Simulate simulated attacks (Phishing SMS, Server Exploit, Ransomware) and activate defensive shields (2FA, SSL, WAF, Offline Backups).',
    interactionType: 'cyber-defense',
    nodeId: NODE_C11_COMM_029,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ──────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Farmer Dev invests 80% of total capital into a co-operative dairy but delivers only 10% of total milk, what percentage of annual surplus refund will Dev receive?',
    options: ['80% (Capital share proportion)', '10% (Patronage volume proportion)', '50% (Equal split)', '0% (Capital is confiscated)'],
    correctIndex: 1,
    verifyInstruction: 'Adjust the sliders in the Co-operative Lab below to confirm that surplus strictly follows milk patronage!',
    nodeId: NODE_C11_COMM_021,
  },
  {
    question: 'Predict: If a company increases its average 3-year net profit from ₹100 crore to ₹250 crore, how will its mandatory statutory CSR spend change?',
    options: ['Increases from ₹2 crore to ₹5 crore', 'Remains fixed at ₹1 crore cap', 'Increases from ₹10 crore to ₹25 crore', 'Drops to ₹0 if spent on worker salaries'],
    correctIndex: 0,
    verifyInstruction: 'Use the CSR Calculator to verify that 2% of ₹250 crore equals ₹5.0 crore!',
    nodeId: NODE_C11_COMM_023,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you increased Farmer Dev\'s capital contribution tenfold, what happened to Dev\'s voting power in the general meeting?',
    observableOptions: [
      'Voting power remained exactly 1 vote (Equal democratic control)',
      'Voting power increased to 10 votes',
      'Dev automatically became permanent Chairman',
      'Dev lost all voting rights',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_COMM_021,
  },
  {
    question: 'Observation: In the E-Business scope explorer, why did the Internal Employee HR Portal classify as E-Business but NOT E-Commerce?',
    observableOptions: [
      'Because it involves digital business workflow without any buying/selling exchange',
      'Because HR portals are strictly prohibited from using the internet',
      'Because government laws ban HR from e-commerce classification',
      'Because it runs on Android rather than Windows',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_COMM_030,
  },
];

// ─── REAL WORLD ACTIVITY ─────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Advisory Project: The Bharat Rural Commerce Blueprint',
  description: 'Design a comprehensive business plan for an Indian agro-dairy collective connecting 5,000 organic farmers in Vidarbha, Maharashtra with urban consumers in Mumbai and Pune.',
  steps: [
    'Choose the legal form: Co-operative Society (Act 1912) vs Producer Company vs Joint Stock Company',
    'Calculate the annual surplus allocation based on milk/grain patronage and reserve funds',
    'Structure an ONDC-enabled E-commerce digital storefront integrated with UPI & COD options',
    'Draft a 5-point DPDP Act 2023 cybersecurity compliance policy protecting farmer bank details',
    'Allocate 2% of projected net profits into local groundwater recharge & solar pumps under Schedule VII CSR',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN SIMULATION COMPONENT ───────────────────────────────────────────────
function C11_CommerceCooperativeOrganisationsMeaningSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commerce'] || { name: 'Commerce', emoji: '📊', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org interactive flow state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive difficulty & mastery state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Per-challenge interaction state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Drag-and-drop / numeric / construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Simulation Lab Specific States
  const [farmerDevCapital, setFarmerDevCapital] = useState(80); // percentage
  const [farmerDevMilk, setFarmerDevMilk] = useState(20); // percentage
  const [coopTotalSurplus, setCoopTotalSurplus] = useState(500000); // ₹

  const [hufDebtAmount, setHufDebtAmount] = useState(50); // in ₹ Lakh
  const [hufAncestralValue, setHufAncestralValue] = useState(30); // in ₹ Lakh
  const [daughterCoparcenerActive, setDaughterCoparcenerActive] = useState(true);

  const [csrProfits, setCsrProfits] = useState([100, 150, 200]); // Year 1, 2, 3 in ₹ Cr
  const [selectedCsrProject, setSelectedCsrProject] = useState<'health' | 'education' | 'environment'>('education');

  const [activeScopeModule, setActiveScopeModule] = useState<'erp' | 'checkout' | 'hr' | 'crm'>('checkout');

  const [cyberShields, setCyberShields] = useState({
    ssl: true,
    twoFactor: false,
    waf: false,
    offlineBackup: false,
  });
  const [activeAttack, setActiveAttack] = useState<'none' | 'phishing' | 'sqlInjection' | 'ransomware'>('none');
  const [attackResult, setAttackResult] = useState<string>('System secure.');

  // UI / Feedback state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTERING ──────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD EFFECT ──────────────────────────────────��────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ─────────────────────────────────────────────────
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

  // ─── CANVAS 2D ANIMATION EFFECT ───────���────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#4f46e5');
      gradient.addColorStop(0.5, '#06b6d4');
      gradient.addColorStop(1, '#10b981');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, 4);

      for (let i = 0; i < 5; i++) {
        const x = (frame * (2 + i) + i * 80) % canvas.width;
        ctx.beginPath();
        ctx.arc(x, 15, 3 + Math.sin(frame * 0.05 + i) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#34d399';
        ctx.fill();
      }

      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`CISCE Interactive Simulation • Node: ${challenge.nodeId}`, 10, 26);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [challenge.nodeId]);

  // ─── ESCALATING HINTS CALLBACK ─────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY AUTO-HINT TIMER ────────────────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── HANDLER: DISCOVERY ────────────────────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding prediction! You grasp the co-operative patronage principle.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE TRANSITION HANDLERS ─────────────────────────────────────────────
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Let us discover the principles by doing.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox Mode. Manipulate variables with zero pressure before beginning challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase initiated. Test your analytical understanding.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ────────────────────���────────────────
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! The simulation proves democratic equality.' : 'Look carefully at the gauge values.');
  }, []);

  // ─── COMPLETION HANDLER ────────────────────────────────────────────────────
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Simulation complete with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ────────────────────────────────────────────────
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

  // ─── ANSWER SUBMISSION HANDLER ─────────────────────────────────────────────
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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent reasoning.');
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
          speechManager.speak('Let us review the statutory analysis together.');
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

  // ─── DRAG & SORT HANDLERS ──────────────────────────────────────────────────
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
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── CYBER DEFENSE SIMULATION HANDLER ─────────────────────────────────────
  const handleSimulateAttack = useCallback(
    (attackType: 'phishing' | 'sqlInjection' | 'ransomware') => {
      setActiveAttack(attackType);
      audioManager.play('pop');

      if (attackType === 'phishing') {
        if (cyberShields.twoFactor) {
          setAttackResult('✓ Blocked! 2FA OTP requirement prevented fraudulent login.');
          audioManager.play('success');
        } else {
          setAttackResult('✗ Breach! Password captured on spoofed page because 2FA was disabled.');
          audioManager.play('error');
        }
      } else if (attackType === 'sqlInjection') {
        if (cyberShields.waf) {
          setAttackResult('✓ Blocked! Web Application Firewall filtered malicious SQL payload.');
          audioManager.play('success');
        } else {
          setAttackResult('✗ Breach! Database dumped due to unprotected web application endpoints.');
          audioManager.play('error');
        }
      } else if (attackType === 'ransomware') {
        if (cyberShields.offlineBackup) {
          setAttackResult('✓ Neutralized! Server wiped and restored within 1 hour from Air-Gapped Backups.');
          audioManager.play('success');
        } else {
          setAttackResult('✗ Catastrophe! Live database encrypted with no offline recovery copy.');
          audioManager.play('error');
        }
      }
    },
    [cyberShields]
  );

  // ─── REAL-TIME CALCULATIONS (MEMOIZED) ──────────────────────────────────────
  const calculatedCsr = useMemo(() => {
    const avgProfit = (csrProfits[0] + csrProfits[1] + csrProfits[2]) / 3;
    const mandatorySpend = avgProfit * 0.02;
    return {
      avgProfit: avgProfit.toFixed(2),
      mandatorySpend: mandatorySpend.toFixed(2),
    };
  }, [csrProfits]);

  const coopPatronageDev = useMemo(() => {
    const devShare = coopTotalSurplus * (farmerDevMilk / 100);
    const gitaShare = coopTotalSurplus * ((100 - farmerDevMilk) / 100);
    return { devShare, gitaShare };
  }, [coopTotalSurplus, farmerDevMilk]);

  const hufLiabilityAnalysis = useMemo(() => {
    const deficit = Math.max(0, hufDebtAmount - hufAncestralValue);
    return {
      coveredByFamilyProperty: Math.min(hufDebtAmount, hufAncestralValue),
      kartaPersonalExposure: deficit,
      coparcenerPersonalExposure: 0,
    };
  }, [hufDebtAmount, hufAncestralValue]);

  // Chart data for CSR 3-year performance
  const csrChartData = useMemo(() => {
    return [
      { year: 'Year 1', profit: csrProfits[0] },
      { year: 'Year 2', profit: csrProfits[1] },
      { year: 'Year 3', profit: csrProfits[2] },
      { year: 'Mandatory CSR (2%)', profit: parseFloat(calculatedCsr.mandatorySpend) },
    ];
  }, [csrProfits, calculatedCsr]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─────────────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="flex items-center gap-3">
          <motion.span whileHover={{ rotate: 10 }} className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50">{subjectConfig.emoji}</motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">ISC Class 11 Commerce</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">CISCE 2026 Ready</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{title}</h1>
          </div>
        </motion.div>

        {/* Difficulty & Mastery Badges */}
        <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-black uppercase rounded-xl border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-cyan-950/60 text-cyan-400 border-cyan-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.span whileHover={{ scale: 1.05 }} className="text-xs px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Mastery: <strong className="text-indigo-400 capitalize">{masteryLevel}</strong>
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ─── LIVE 2D CANVAS STRIP ───────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/50">
        <canvas ref={canvasRef} width={800} height={32} className="w-full h-8 block" />
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ───────────────────��───────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
          <motion.div whileHover={{ scale: 1.005 }} className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-black rounded-full bg-indigo-600 text-white uppercase">Historical Dilemma</span>
              <span className="text-xs text-indigo-300">1946 Kaira Milk Union (Amul Genesis)</span>
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 leading-relaxed text-sm">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-200/80 mt-3 p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40">{SCENARIO.context}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Curiosity Discovery Challenge</h3>
            <p className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-2xl font-medium transition-all text-sm border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-750 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && (i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : '✗ ')}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Co-operatives distribute surplus by patronage, not by capital.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Enter Interactive Labs"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap text-sm"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ───────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Navigator */}
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400">LAB {currentSlide + 1} OF {EXPLORATION_STEPS.length}:</span>
              <span className="text-sm font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{ scale: idx === currentSlide ? 1.25 : 1 }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-indigo-500' : idx < currentSlide ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Interactive Lab Content based on slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </motion.p>

              {/* LAB 1: CO-OPERATIVE ECONOMICS & SVG 1 */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* TOPIC SVG 1: CO-OP PATRONAGE FLOW */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 130" className="w-full max-w-lg" aria-label="Co-operative Democratic vs Capital Allocation Diagram">
                      <rect x="10" y="10" width="220" height="110" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="25" y="32" fill="#a5b4fc" fontSize="12" fontWeight="bold">Co-operative Society (Amul Model)</text>
                      <text x="25" y="55" fill="#e0e7ff" fontSize="11">✓ Control: 1 Member = 1 Vote</text>
                      <text x="25" y="75" fill="#34d399" fontSize="11">✓ Surplus: Patronage (Milk Delivered)</text>
                      <text x="25" y="95" fill="#94a3b8" fontSize="10">Capital return strictly capped by statute</text>

                      <rect x="260" y="10" width="230" height="110" rx="10" fill="#2e1065" stroke="#a855f7" strokeWidth="2" />
                      <text x="275" y="32" fill="#f0abfc" fontSize="12" fontWeight="bold">Joint Stock Corporation</text>
                      <text x="275" y="55" fill="#f5d0fe" fontSize="11">✗ Control: 1 Share = 1 Vote</text>
                      <text x="275" y="75" fill="#f43f5e" fontSize="11">✗ Surplus: Equity Shares / Capital</text>
                      <text x="275" y="95" fill="#94a3b8" fontSize="10">Profit maximisation over worker patronage</text>
                    </svg>
                  </div>

                  {/* Predict then check */}
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 mb-4">
                      <p className="text-sm font-bold text-indigo-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`Prediction option ${idx + 1}: ${opt}`}
                            onClick={() => handlePrediction(idx)}
                            className="p-2.5 text-xs text-left rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Controls */}
                    <div className="space-y-4">
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Farmer Dev Capital Contribution: <strong>{farmerDevCapital}%</strong></span>
                          <span>Farmer Gita: <strong>{100 - farmerDevCapital}%</strong></span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={90}
                          aria-label="Farmer Dev Capital Contribution Slider"
                          value={farmerDevCapital}
                          onChange={(e) => setFarmerDevCapital(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.01 }}>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Farmer Dev Daily Milk Supply (Patronage): <strong>{farmerDevMilk}%</strong></span>
                          <span>Farmer Gita: <strong>{100 - farmerDevMilk}%</strong></span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={95}
                          aria-label="Farmer Dev Daily Milk Supply Slider"
                          value={farmerDevMilk}
                          onChange={(e) => setFarmerDevMilk(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.01 }}>
                        <label className="text-xs text-slate-400 block mb-1">Annual Co-op Net Surplus: ₹{coopTotalSurplus.toLocaleString('en-IN')}</label>
                        <input
                          type="range"
                          min={100000}
                          max={2000000}
                          step={50000}
                          aria-label="Annual Co-operative Surplus Slider"
                          value={coopTotalSurplus}
                          onChange={(e) => setCoopTotalSurplus(Number(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </motion.div>
                    </div>

                    {/* Comparative Visual Matrix */}
                    <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="font-bold text-slate-300">Feature</span>
                        <span className="font-bold text-indigo-400">Co-operative Society (Act 1912)</span>
                        <span className="font-bold text-amber-400">Joint Stock Company</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Voting Weight:</span>
                        <span className="font-bold text-emerald-400">✓ 1 Vote : 1 Vote (Equal)</span>
                        <span className="text-slate-400">✗ {farmerDevCapital}% : {100 - farmerDevCapital}%</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Farmer Dev Surplus:</span>
                        <span className="font-bold text-emerald-400">₹{coopPatronageDev.devShare.toLocaleString('en-IN')} (Patronage)</span>
                        <span className="text-slate-400">₹{(coopTotalSurplus * (farmerDevCapital / 100)).toLocaleString('en-IN')} (Capital)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Farmer Gita Surplus:</span>
                        <span className="font-bold text-emerald-400">₹{coopPatronageDev.gitaShare.toLocaleString('en-IN')} (Patronage)</span>
                        <span className="text-slate-400">₹{(coopTotalSurplus * ((100 - farmerDevCapital) / 100)).toLocaleString('en-IN')} (Capital)</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Observation check */}
                  {predictionMade && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-amber-400 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-xs text-left rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* LAB 2: HUF ASYMMETRIC LIABILITY & SVG 2 */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* TOPIC SVG 2: HUF COPARCENARY HIERARCHY */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 130" className="w-full max-w-lg" aria-label="Joint Hindu Family Governance Structure Diagram">
                      {/* Ancestor / Karta */}
                      <rect x="175" y="10" width="150" height="36" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                      <text x="250" y="32" textAnchor="middle" fill="#ffe4e6" fontSize="12" fontWeight="bold">Karta (Unlimited Liability)</text>
                      {/* Lines */}
                      <line x1="250" y1="46" x2="250" y2="70" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="100" y1="70" x2="400" y2="70" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="100" y1="70" x2="100" y2="85" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="250" y1="70" x2="250" y2="85" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="400" y1="70" x2="400" y2="85" stroke="#94a3b8" strokeWidth="2" />
                      {/* Coparceners */}
                      <rect x="30" y="85" width="140" height="34" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="100" y="106" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="bold">Son (Coparcener: Ltd)</text>

                      <rect x="180" y="85" width="140" height="34" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="250" y="106" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="bold">Daughter (2005 SC: Ltd)</text>

                      <rect x="330" y="85" width="140" height="34" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="400" y="106" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="bold">Son (Coparcener: Ltd)</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Total HUF Business Debt: <strong>₹{hufDebtAmount} Lakh</strong></span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          aria-label="HUF Business Debt Slider"
                          value={hufDebtAmount}
                          onChange={(e) => setHufDebtAmount(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.01 }}>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Ancestral Family Property Value: <strong>₹{hufAncestralValue} Lakh</strong></span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          aria-label="HUF Ancestral Property Value Slider"
                          value={hufAncestralValue}
                          onChange={(e) => setHufAncestralValue(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-300">Daughter Equal Coparcener (2005 Act):</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Toggle Daughter Coparcenary Status"
                          onClick={() => setDaughterCoparcenerActive(!daughterCoparcenerActive)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            daughterCoparcenerActive ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {daughterCoparcenerActive ? '✓ Active (Vineeta Sharma 2020)' : '✗ Traditional Pre-2005'}
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Liability Attachment Breakdown */}
                    <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
                      <h4 className="font-bold text-indigo-300 uppercase">Legal Debt Attachment Status</h4>
                      <div className="p-2.5 rounded-lg bg-slate-850 flex justify-between">
                        <span>Paid from Ancestral Assets:</span>
                        <strong className="text-emerald-400">₹{hufLiabilityAnalysis.coveredByFamilyProperty} Lakh</strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/40 flex justify-between">
                        <span>Karta Personal Assets Attached (Unlimited):</span>
                        <strong className="text-rose-400">₹{hufLiabilityAnalysis.kartaPersonalExposure} Lakh</strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 flex justify-between">
                        <span>Other Coparceners Personal Assets Attached:</span>
                        <strong className="text-emerald-400">✓ ₹0.00 (Protected / Limited)</strong>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-2">
                        {daughterCoparcenerActive
                          ? '✓ Daughters hold identical birthright coparcenary share with right to demand partition.'
                          : '✗ Pre-2005: Daughters only had maintenance rights without coparcenary title.'}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* LAB 3: CSR STATUTORY CALCULATOR */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase">Input Preceding 3 Years Net Profit (₹ Crore)</h4>
                      {[0, 1, 2].map((yr) => (
                        <motion.div key={yr} whileHover={{ scale: 1.01 }} className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 w-16">Year {yr + 1}:</span>
                          <input
                            type="range"
                            min={10}
                            max={500}
                            aria-label={`Year ${yr + 1} Net Profit Slider`}
                            value={csrProfits[yr]}
                            onChange={(e) => {
                              const updated = [...csrProfits];
                              updated[yr] = Number(e.target.value);
                              setCsrProfits(updated);
                            }}
                            className="w-full accent-indigo-500"
                          />
                          <span className="text-xs font-mono text-indigo-300 w-16 text-right">₹{csrProfits[yr]} Cr</span>
                        </motion.div>
                      ))}

                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800/60 mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>3-Year Average Net Profit:</span>
                          <strong>₹{calculatedCsr.avgProfit} Cr</strong>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-emerald-400">
                          <span>Mandatory 2% CSR (Sec 135):</span>
                          <span>✓ ₹{calculatedCsr.mandatorySpend} Crore</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* CSR Recharts Visualization */}
                    <motion.div whileHover={{ scale: 1.01 }} className="h-56 bg-slate-900 p-2 rounded-xl border border-slate-800">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={csrChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} />
                          <YAxis stroke="#94a3b8" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                          <Bar dataKey="profit" fill="#6366f1" radius={[4, 4, 0, 0]}>
                            {csrChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 3 ? '#10b981' : '#6366f1'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* LAB 4: E-BUSINESS VS E-COMMERCE SCOPE & SVG 3 */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'checkout' as const, label: 'Online Store Checkout', type: 'E-Commerce ⊂ E-Business' },
                      { id: 'erp' as const, label: 'Supply Chain ERP', type: 'E-Business Only' },
                      { id: 'hr' as const, label: 'Internal Employee HR App', type: 'E-Business Only (Intra-B)' },
                      { id: 'crm' as const, label: 'Customer Support CRM', type: 'E-Business Only' },
                    ].map((mod) => (
                      <motion.button
                        key={mod.id}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        aria-label={`Module: ${mod.label}`}
                        onClick={() => {
                          setActiveScopeModule(mod.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          activeScopeModule === mod.id
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <strong className="block text-sm mb-1">{mod.label}</strong>
                        <span className="text-[10px] opacity-80">{mod.type}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* TOPIC SVG 3: VENN SCOPE DIAGRAM */}
                  <motion.div whileHover={{ scale: 1.01 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 450 200" className="w-full max-w-md" aria-label="E-Business Superset vs E-Commerce Subset Diagram">
                      <rect x="20" y="20" width="410" height="160" rx="20" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
                      <text x="40" y="45" fill="#a5b4fc" fontSize="12" fontWeight="bold">E-Business Superset (All digital processes: ERP, HR, Finance)</text>

                      <rect x="180" y="60" width="230" height="100" rx="15" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="200" y="85" fill="#6ee7b7" fontSize="11" fontWeight="bold">E-Commerce Subset (Buying & Selling)</text>
                      <text x="200" y="105" fill="#d1fae5" fontSize="10">Cart • Gateway • Delivery</text>

                      {activeScopeModule === 'checkout' && (
                        <circle cx="295" cy="125" r="8" fill="#34d399" className="animate-ping" />
                      )}
                      {activeScopeModule !== 'checkout' && (
                        <circle cx="100" cy="110" r="8" fill="#818cf8" className="animate-ping" />
                      )}
                    </svg>
                    <p className="text-xs text-slate-300 mt-3 text-center">
                      Selected Module: <strong className="text-indigo-400 uppercase">{activeScopeModule}</strong> is categorized as{' '}
                      <strong className={activeScopeModule === 'checkout' ? 'text-emerald-400' : 'text-indigo-300'}>
                        {activeScopeModule === 'checkout' ? 'E-Commerce (and also E-Business)' : 'E-Business only (No buying/selling exchange)'}
                      </strong>.
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* LAB 5: CYBER DEFENSE MATRIX & SVG 4 */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* TOPIC SVG 4: CYBER DEFENSIVE ARCHITECTURE */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 110" className="w-full max-w-lg" aria-label="Cybersecurity Defense Architecture Diagram">
                      <rect x="10" y="15" width="110" height="80" rx="8" fill="#1e293b" stroke={cyberShields.ssl ? '#10b981' : '#64748b'} strokeWidth="2" />
                      <text x="65" y="45" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Channel</text>
                      <text x="65" y="65" textAnchor="middle" fill={cyberShields.ssl ? '#34d399' : '#94a3b8'} fontSize="10">SSL / TLS</text>

                      <rect x="135" y="15" width="110" height="80" rx="8" fill="#1e293b" stroke={cyberShields.twoFactor ? '#10b981' : '#64748b'} strokeWidth="2" />
                      <text x="190" y="45" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Identity</text>
                      <text x="190" y="65" textAnchor="middle" fill={cyberShields.twoFactor ? '#34d399' : '#94a3b8'} fontSize="10">2FA / Biometric</text>

                      <rect x="260" y="15" width="110" height="80" rx="8" fill="#1e293b" stroke={cyberShields.waf ? '#10b981' : '#64748b'} strokeWidth="2" />
                      <text x="315" y="45" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Perimeter</text>
                      <text x="315" y="65" textAnchor="middle" fill={cyberShields.waf ? '#34d399' : '#94a3b8'} fontSize="10">WAF Rules</text>

                      <rect x="385" y="15" width="105" height="80" rx="8" fill="#1e293b" stroke={cyberShields.offlineBackup ? '#10b981' : '#64748b'} strokeWidth="2" />
                      <text x="437" y="45" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Resilience</text>
                      <text x="437" y="65" textAnchor="middle" fill={cyberShields.offlineBackup ? '#34d399' : '#94a3b8'} fontSize="10">Offline Backup</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Defensive Toggles */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase">Configure Enterprise Security Shields</h4>
                      {[
                        { key: 'ssl' as const, label: 'SSL / TLS Channel Encryption', desc: 'Protects card numbers in transit' },
                        { key: 'twoFactor' as const, label: 'Two-Factor Authentication (2FA / OTP)', desc: 'Blocks phishing credential theft' },
                        { key: 'waf' as const, label: 'Web Application Firewall (WAF)', desc: 'Blocks SQL injection & exploit payloads' },
                        { key: 'offlineBackup' as const, label: 'Air-Gapped Offline Backups', desc: 'Enables instant ransomware restoration' },
                      ].map((shield) => (
                        <motion.div
                          key={shield.key}
                          role="button"
                          tabIndex={0}
                          aria-label={`Toggle ${shield.label}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setCyberShields((prev) => ({ ...prev, [shield.key]: !prev[shield.key] }));
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                            cyberShields[shield.key]
                              ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div>
                            <strong className="block text-slate-200">{shield.label}</strong>
                            <span className="text-[10px] opacity-75">{shield.desc}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            cyberShields[shield.key] ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {cyberShields[shield.key] ? '✓ ENABLED' : '✗ DISABLED'}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Threat Simulator */}
                    <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                      <h4 className="text-xs font-bold text-rose-400 uppercase">Simulate Cyber Threat Attacks</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          aria-label="Simulate Phishing SMS"
                          onClick={() => handleSimulateAttack('phishing')}
                          className="p-2.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-700 text-rose-200 text-xs font-bold"
                        >
                          Launch Phishing SMS
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          aria-label="Simulate Server Exploit"
                          onClick={() => handleSimulateAttack('sqlInjection')}
                          className="p-2.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-700 text-amber-200 text-xs font-bold"
                        >
                          Server Exploit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          aria-label="Simulate Ransomware Worm"
                          onClick={() => handleSimulateAttack('ransomware')}
                          className="p-2.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-700 text-purple-200 text-xs font-bold"
                        >
                          Ransomware Worm
                        </motion.button>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[90px] flex items-center justify-center text-center">
                        <p className={`text-sm font-bold ${attackResult.startsWith('✓') ? 'text-emerald-400' : attackResult.startsWith('✗') ? 'text-rose-400' : 'text-slate-400'}`}>
                          {attackResult}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Go to Previous Lab"
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 disabled:opacity-40 text-xs font-bold text-white border border-slate-750"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Go to Next Lab"
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Enter Free Sandbox Mode"
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-black text-white">Interactive Sandbox & Variable Lab</h3>
                <p className="text-xs text-slate-400 mt-1">Experiment freely with all economic parameters. No grading or penalties.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Ready for Graded Challenges"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg text-sm"
              >
                Ready for Graded Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1 */}
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-indigo-400 uppercase">Co-op Patronage Calculator</h4>
                <label className="text-[11px] text-slate-400">Farmer Dev Patronage: {farmerDevMilk}%</label>
                <input
                  type="range"
                  min={5}
                  max={95}
                  aria-label="Sandbox Farmer Dev Patronage Slider"
                  value={farmerDevMilk}
                  onChange={(e) => setFarmerDevMilk(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="text-xs p-2 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                  Surplus Share: ₹{coopPatronageDev.devShare.toLocaleString('en-IN')}
                </div>
              </motion.div>

              {/* Box 2 */}
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase">HUF Karta Liability Engine</h4>
                <label className="text-[11px] text-slate-400">Total Debt: ₹{hufDebtAmount} Lakh</label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  aria-label="Sandbox HUF Debt Slider"
                  value={hufDebtAmount}
                  onChange={(e) => setHufDebtAmount(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="text-xs p-2 bg-slate-900 rounded-lg text-rose-300 font-bold">
                  Karta Risk: ₹{hufLiabilityAnalysis.kartaPersonalExposure} Lakh
                </div>
              </motion.div>

              {/* Box 3 */}
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase">CSR Section 135 Mandate</h4>
                <label className="text-[11px] text-slate-400">Year 3 Profit: ₹{csrProfits[2]} Cr</label>
                <input
                  type="range"
                  min={50}
                  max={500}
                  aria-label="Sandbox CSR Profit Slider"
                  value={csrProfits[2]}
                  onChange={(e) => {
                    const up = [...csrProfits];
                    up[2] = Number(e.target.value);
                    setCsrProfits(up);
                  }}
                  className="w-full accent-emerald-500"
                />
                <div className="text-xs p-2 bg-slate-900 rounded-lg text-indigo-300 font-bold">
                  2% Mandatory: ₹{calculatedCsr.mandatorySpend} Cr
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: GRADED CHALLENGES ────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Top Bar */}
          <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-black uppercase text-indigo-400 tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <motion.span whileHover={{ scale: 1.05 }} className="text-xs px-2 py-0.5 bg-slate-800 rounded font-mono text-slate-300 uppercase">
                  NEP Level: {challenge.competencyLevel}
                </motion.span>
                <span className="text-xs px-2 py-0.5 bg-slate-800 rounded font-mono text-slate-400">
                  Node: {challenge.nodeId}
                </span>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-36 sm:w-48 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
            className={`p-6 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">{challenge.question}</h3>

            {/* MCQ / Distinguish / Classify Rendering */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-medium border transition-all ${
                      showExplanation
                        ? i === challenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                        : 'bg-slate-850 hover:bg-slate-800 border-slate-750 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                    {showExplanation && (i === challenge.correctIndex ? '✓ ' : '✗ ')}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Rendering */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items into the matching category targets:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl cursor-grab text-white text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetKey) => (
                    <motion.div
                      key={targetKey}
                      whileHover={{ scale: 1.01 }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className={`p-4 rounded-2xl border-2 border-dashed min-h-[70px] flex flex-col justify-center transition-all ${
                        droppedLabels[targetKey]
                          ? 'border-emerald-500 bg-emerald-950/30'
                          : 'border-slate-700 bg-slate-950/50'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-slate-400 uppercase">{targetKey.replace('box_', '').replace('layer_', '')}</span>
                      <p className="text-xs font-bold text-emerald-300 mt-1">
                        {droppedLabels[targetKey] ? `✓ ${droppedLabels[targetKey]}` : 'Drop matching label here'}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify Target Mappings"
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Target Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Rendering */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or click order to arrange steps correctly:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-850 hover:bg-slate-800 rounded-2xl border border-slate-750 text-slate-200 text-xs sm:text-sm cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-indigo-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">☰</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify Step Sequence"
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Step Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Input Rendering */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    aria-label="Calculated answer input"
                    placeholder="Enter calculated value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-sm focus:border-indigo-500 outline-none w-48"
                  />
                  <span className="text-xs font-bold text-slate-400 uppercase">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Check Calculation"
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge Rendering */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Add part: ${part}`}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-indigo-300 rounded-xl text-xs border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <motion.span key={idx} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="px-3 py-1 bg-indigo-900/60 border border-indigo-700 rounded-lg text-xs text-white flex items-center gap-1.5">
                      {part}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        aria-label={`Remove part: ${part}`}
                        onClick={() => setConstructParts((p) => p.filter((_, j) => j !== idx))}
                        className="text-rose-400 font-bold"
                      >
                        ×
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click elements above to assemble answer...</span>}
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify Assembly"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Assembly
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-amber-400">Step-by-Step Statutory Explanation</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                      <strong className="text-amber-400 mr-1.5">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Show Next Analytical Step"
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg text-xs"
                  >
                    Show Next Analytical Step →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next Challenge or Finalize"
                    onClick={handleNextChallenge}
                    className="block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-600/30 mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Score →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ───────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <motion.div whileHover={{ scale: 1.005 }} className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700 text-center space-y-4">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }} className="text-5xl inline-block">🏆</motion.span>
            <h2 className="text-3xl font-black text-white">Curriculum Simulation Complete!</h2>
            <div className="flex justify-center gap-6 text-sm">
              <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-xs">Final Mastery Score</span>
                <strong className="text-2xl text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</strong>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-xs">BKT Cognitive Tier</span>
                <strong className="text-2xl text-indigo-400 capitalize">{masteryLevel}</strong>
              </motion.div>
            </div>

            {/* Motivational feedback */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-700/50 text-xs sm:text-sm text-emerald-300 max-w-xl mx-auto">
              {errors === 0
                ? '✓ PERFECT SCORE! You have mastered Indian co-operative statutes, HUF liability rules, statutory CSR, and e-commerce security architectures!'
                : errors <= 3
                ? '✓ Great analytical proficiency! You clearly comprehend the difference between democratic co-ops and shareholder corporations.'
                : '💡 Good effort! Review your misconception profile below and re-test the interactive simulation labs.'}
            </motion.div>
          </motion.div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-rose-950/30 rounded-3xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Identified Misconception Profile</h3>
              <p className="text-xs text-slate-400">Targeted review points to secure high scores in CISCE board examinations:</p>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div key={idx} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-bold">✗ {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ {m.correction}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Spaced Repetition Schedule */}
          <motion.div whileHover={{ scale: 1.005 }} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-amber-300 uppercase">SM-2 Spaced Repetition Schedule</h3>
              <p className="text-xs text-slate-400 mt-1">
                Optimal retention review scheduled in{' '}
                <strong className="text-amber-300 font-bold">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>.
              </p>
            </div>
            <motion.span whileHover={{ scale: 1.05 }} className="text-xs px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-700 text-amber-300 font-mono">
              Next Review Interval: {REVIEW_INTERVAL_DAYS[errors === 0 ? 2 : errors <= 3 ? 1 : 0]} Days
            </motion.span>
          </motion.div>

          {/* Real World Advisory Blueprint */}
          <motion.div whileHover={{ scale: 1.005 }} className="p-6 bg-gradient-to-br from-indigo-950/50 to-slate-900 rounded-3xl border border-indigo-800/60 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <motion.div key={i} whileHover={{ x: 3 }} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span>
                  <span>{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── INTERACTIVE ENGINE FEEDBACK OVERLAYS ───────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Challenge Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C11_CommerceCooperativeOrganisationsMeaningSim;
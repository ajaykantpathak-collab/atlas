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

// ─── NODE CONSTANTS ──────────────────────��─────────────────────────────────
const NODE_C10_COMMSTUD_001 = 'c10_commstud_001'; // Meaning of Stakeholder
const NODE_C10_COMMSTUD_002 = 'c10_commstud_002'; // Internal Stakeholders — Shareholder, Employee, Employer
const NODE_C10_COMMSTUD_003 = 'c10_commstud_003'; // External Stakeholders — Supplier, Creditor, Government, Society
const NODE_C10_COMMSTUD_004 = 'c10_commstud_004'; // Differences Between Internal and External Stakeholders
const NODE_C10_COMMSTUD_005 = 'c10_commstud_005'; // Expectations of Employers and Employees
const NODE_C10_COMMSTUD_006 = 'c10_commstud_006'; // Expectations of Creditors and Suppliers
const NODE_C10_COMMSTUD_007 = 'c10_commstud_007'; // Expectations of Government and Society
const NODE_C10_COMMSTUD_008 = 'c10_commstud_008'; // Marketing — Meaning, Objectives & Distinction from Sales
const NODE_C10_COMMSTUD_009 = 'c10_commstud_009'; // Product and Service — Meaning & Difference
const NODE_C10_COMMSTUD_010 = 'c10_commstud_010'; // Pricing — Meaning and Objectives

const ALL_NODE_IDS = [
  NODE_C10_COMMSTUD_001,
  NODE_C10_COMMSTUD_002,
  NODE_C10_COMMSTUD_003,
  NODE_C10_COMMSTUD_004,
  NODE_C10_COMMSTUD_005,
  NODE_C10_COMMSTUD_006,
  NODE_C10_COMMSTUD_007,
  NODE_C10_COMMSTUD_008,
  NODE_C10_COMMSTUD_009,
  NODE_C10_COMMSTUD_010,
];

// ─── SCENARIO & DISCOVERY ──────────────────────────────────────────────────
const SCENARIO = {
  title: 'Crisis at Bharat Mobility Ltd (Tata Motors & Jio Case Study)',
  intro:
    'Bharat Mobility Ltd is expanding its Electric Vehicle (EV) division while adjusting digital subscription tariffs. Shareholders want record dividends, factory workers at Pune demand higher wages, HDFC Bank monitors debt covenants, and the local municipal board raises emission concerns.',
  context:
    'As Lead Commercial Analyst, you must balance competing internal and external stakeholder expectations, navigate marketing vs sales strategies, distinguish products from bundled services, and optimize pricing.',
};

const DISCOVERY_QUESTION = {
  question:
    'Suppose Bharat Mobility raises its EV fleet prices by 20% to increase short-term profits for shareholders. What is the MOST immediate ripple effect on external and internal stakeholders?',
  options: [
    'Only shareholders are affected because they receive higher dividend payouts.',
    'Customers face higher ownership costs, reducing demand; factory workers may face bonus cuts if sales drop, while competitor market share rises.',
    'Suppliers immediately double raw material prices because the company is richer.',
    'Government waives all corporate taxes because profits increased.',
  ],
  correctIndex: 1,
  hintAfter:
    "Every business decision ripples through an interconnected network of internal and external stakeholders. Let's see how!",
};

// ─── CHALLENGE INTERFACE ───────────────────────────────────────────────────
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

// ─── 24 PROGRESSIVE CHALLENGES ACROSS 10 NODES ─────────────────────────────
const CHALLENGES: Challenge[] = [
  // Foundation (1-8)
  {
    id: 'ch_01',
    nodeId: NODE_C10_COMMSTUD_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Reliance Jio has over 450 million active telecom subscribers across India. Under Commercial Studies principles, how are these subscribers classified?',
    options: [
      'Shareholders — because their recharges fund the company assets.',
      'Stakeholders — because their daily communication and wallets are directly affected by Jio decisions.',
      'Employers — because customer demand dictates what workers do.',
      'Not stakeholders — only equity investors hold a legitimate stake.',
    ],
    correctIndex: 1,
    explanation:
      'A stakeholder is ANY party with an interest in or affected by an organisation. All shareholders are stakeholders, but not all stakeholders are shareholders.',
    hints: [
      'Think about who is affected when tariff prices change by ₹50.',
      'Does a subscriber own equity shares in Reliance Industries on BSE/NSE?',
      'Subscribers hold a financial and utility interest without owning company shares.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C10_COMMSTUD_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Who is the legal "EMPLOYER" when Infosys Limited hires 1,000 software engineers at its Mysuru campus?',
    options: [
      'The Chief Executive Officer (Salil Parekh) in his personal capacity.',
      'The Board of Directors individually.',
      'Infosys Limited itself as an incorporated artificial legal person under Section 7 of the Companies Act 2013.',
      'N.R. Narayana Murthy as the primary promoter.',
    ],
    correctIndex: 2,
    explanation:
      'A registered company is a separate legal person distinct from its members and directors. The CEO is himself a high-ranking employee; the corporate entity is the employer.',
    hints: [
      'Is the CEO an employee hired by the board, or is he the company itself?',
      'Check the name that appears on an official appointment letter and TDS certificate.',
      'The corporate artificial entity (Infosys Limited) is the legal employer.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C10_COMMSTUD_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each external stakeholder to their primary role in Asian Paints operations.',
    dragItems: [
      { label: 'BASF India (Titanium Dioxide)', targetId: 'role_supplier' },
      { label: 'HDFC Bank (Working Capital Loan)', targetId: 'role_creditor' },
      { label: 'CBIC / GST Dept (Tax Collector)', targetId: 'role_govt' },
      { label: 'Bhandup Colony Residents (Clean Air/Water)', targetId: 'role_society' },
    ],
    correctMapping: {
      role_supplier: 'BASF India (Titanium Dioxide)',
      role_creditor: 'HDFC Bank (Working Capital Loan)',
      role_govt: 'CBIC / GST Dept (Tax Collector)',
      role_society: 'Bhandup Colony Residents (Clean Air/Water)',
    },
    explanation:
      'Suppliers provide raw material inputs; Creditors lend funds; Government regulates and levies taxes; Society experiences environmental and local community impacts.',
    hints: [
      'Who delivers chemicals to the factory gate? That is a supplier.',
      'Who lends ₹500 crore for short-term working capital? That is a creditor.',
      'Tax authorities represent government; local residents represent society.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C10_COMMSTUD_008,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What is the fundamental distinction regarding the STARTING POINT of Marketing versus Sales?',
    options: [
      'Marketing starts in the factory with finished goods; Sales starts in the market with customer research.',
      'Marketing starts in the market by identifying customer needs before production; Sales starts at the factory with finished goods.',
      'Both start simultaneously when the product reaches retail shelves.',
      'Sales starts during product design; Marketing starts only after the warranty expires.',
    ],
    correctIndex: 1,
    explanation:
      'Marketing begins before a product exists (Market → Factory) through need identification. Sales is a product-push activity beginning after production (Factory → Market).',
    hints: [
      'Did Ratan Tata identify the need for an affordable family car before or after building the Nano?',
      'Sales requires ready stock to hand over in exchange for cash.',
      'Marketing: Market to Factory. Sales: Factory to Market.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C10_COMMSTUD_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why is a 1-night stay at the Taj Mahal Palace Hotel in Mumbai classified as a SERVICE rather than a PRODUCT?',
    options: [
      'Because the room building is made of concrete and marble.',
      'Because the guest buys permanent ownership of room 402.',
      'Because the room-night is intangible right-to-use, perishable (if unsold tonight it cannot be stored for tomorrow), and produced-consumed simultaneously.',
      'Because hotels are prohibited from charging Goods and Services Tax (GST).',
    ],
    correctIndex: 2,
    explanation:
      'Services are intangible, perishable, non-transferable, and cannot be inventoried. An unsold hotel room-night represents lost capacity that perishes forever.',
    hints: [
      'Can a hotel store tonight’s empty room and sell 200 rooms tomorrow when it only has 100?',
      'Does ownership of the real estate transfer to the guest?',
      'Service capacity is perishable and produced simultaneously with consumption.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C10_COMMSTUD_010,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'A manufacturing unit produces an LED TV at a total factory cost of ₹18,000 per unit. The marketing board sets a profit margin mark-up of 25% on cost. What is the selling price to the customer in Rupees (₹)?',
    correctAnswer: 22500,
    tolerance: 50,
    unit: '₹',
    explanation:
      'Cost = ₹18,000. Profit Mark-up = 25% of 18,000 = ₹4,500. Selling Price = Cost + Profit = ₹18,000 + ₹4,500 = ₹22,500.',
    hints: [
      'Calculate 25% of ₹18,000 first (18,000 × 0.25).',
      '25% of 18,000 is 4,500.',
      'Add the ₹4,500 margin to the base cost of ₹18,000.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C10_COMMSTUD_005,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Match the internal stakeholder expectation to its corresponding Indian statutory framework:',
    options: [
      'Fair minimum wage & timely payment → Code on Wages 2019; Safe factory conditions → Factories Act 1948 / OSH Code 2020.',
      'Shareholder dividend guarantee → Minimum Wages Act; Worker retrenchment notice → SEBI ICDR Regulations.',
      'Manager bonus → Factories Act 1948; Employee daily hours → Companies Act Section 135.',
      'Worker canteen facility → Indian Contract Act 1872; Dividend distribution → Industrial Disputes Act 1947.',
    ],
    correctIndex: 0,
    explanation:
      'The Code on Wages 2019 codifies timely wage payment and floor wages, while the Factories Act 1948 (OSH Code 2020) mandates workplace safety, machine guarding, and 48-hour weekly limits.',
    hints: [
      'Which law governs minimum wages across India?',
      'Which historic act mandates safety guards on factory machines?',
      'Wages = Code on Wages 2019; Workplace safety = Factories Act 1948.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C10_COMMSTUD_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which single governing test determines whether a party is an INTERNAL or EXTERNAL stakeholder of a company?',
    options: [
      'Whether the party is a citizen of India or a foreign entity.',
      'Whether the party participates directly in the daily operations, internal governance, or equity ownership of that specific reference organisation.',
      'Whether the party is profitable or non-profit.',
      'Whether the party pays GST or Corporate Income Tax.',
    ],
    correctIndex: 1,
    explanation:
      'Internal stakeholders participate directly inside the company boundary (ownership, management, workforce), whereas external stakeholders interact across the company boundary.',
    hints: [
      'Does an SBI loan officer sit inside Tata Steel blast furnaces running daily shifts?',
      'Look at the location of participation relative to the reference enterprise.',
      'Direct participation in daily operations and ownership defines internal status.',
    ],
  },

  // Standard Challenges (9-16)
  {
    id: 'ch_09',
    nodeId: NODE_C10_COMMSTUD_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Analyze the dual role of the Government of India relative to Hindustan Aeronautics Limited (HAL) versus Indian Railways:',
    options: [
      'Government is always external to all public and private enterprises.',
      'Government is an INTERNAL stakeholder of HAL (owning ~75% equity & appointing Board), but acts as an EXTERNAL customer when the Ministry of Defence purchases Tejas fighter jets.',
      'Government is internal only during war and external during peacetime.',
      'Indian Railways has no external stakeholders because it is fully state-owned.',
    ],
    correctIndex: 1,
    explanation:
      'Classification depends on the specific relationship to the reference organisation. As owner, the Govt is internal; as buyer/customer placing procurement contracts, the Ministry is external.',
    hints: [
      'Does the President of India hold 75% of HAL equity shares on paper?',
      'Does the Ministry of Defence act as an external buyer placing purchase orders?',
      'The same entity can hold both internal (owner) and external (customer) roles.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C10_COMMSTUD_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'During the Kingfisher Airlines crisis, how did the expectations and recovery rights of Financial Creditors (SBI Consortium) differ from Operational Suppliers (HPCL Aviation Fuel & Airport Authority)?',
    options: [
      'Suppliers had secured mortgage charges over aircraft; banks had no legal recourse.',
      'Banks as secured financial creditors had mortgage charges over physical assets/brand under SARFAESI & priority in IBC 2016; suppliers held unsecured supply contracts.',
      'Creditors expected repeat orders; suppliers expected repayment of debenture interest.',
      'Both had identical legal standing under the Industrial Disputes Act 1947.',
    ],
    correctIndex: 1,
    explanation:
      'Financial creditors lend money expecting loan repayment + interest backed by collateral charges. Suppliers deliver goods on credit and hold unsecured commercial claims.',
    hints: [
      'Did SBI lend ₹9,000 crore in loans or did SBI supply aviation turbine fuel?',
      'Who holds mortgage charges over the company land and corporate brand?',
      'Financial creditors hold debt security under SARFAESI / IBC; suppliers hold unsecured trade invoices.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C10_COMMSTUD_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Under Section 135 of the Companies Act 2013, Tata Steel had average net profits of ₹12,000 crore over the preceding three financial years. What is its mandatory minimum CSR expenditure in Rupees (₹ Crores)?',
    correctAnswer: 240,
    tolerance: 1,
    unit: '₹ Crore',
    explanation:
      'Section 135 mandates that qualifying companies spend at least 2% of average net profits of the preceding 3 years on CSR. 2% of ₹12,000 crore = 0.02 × 12,000 = ₹240 crore.',
    hints: [
      'What percentage does Section 135 mandate on 3-year average net profits?',
      'Multiply ₹12,000 crore by 2% (or 0.02).',
      '12,000 × 2 / 100 = 240.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C10_COMMSTUD_008,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange the chronological stages of a customer-centric Marketing-to-Sales cycle in an Indian FMCG company (like HUL or Dabur):',
    sortItems: [
      'Market Research: Identify unmet consumer need in tier-2 towns',
      'Product Development & Packaging Design (Sachet Formulation)',
      'Pricing & Promotional Campaign Planning',
      'Distribution channel setup and retail shelf placement',
      'Sales field force books retailer orders and closes cash transactions',
      'Post-purchase feedback & customer satisfaction evaluation',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation:
      'Marketing starts with consumer research (need identification), moves to product design, pricing/promotion, distribution, followed by transactional selling, and concludes with post-sales satisfaction.',
    hints: [
      'Does consumer research happen before or after factory production?',
      'When does the sales field force collect distributor bookings?',
      'Marketing research is step 1; closing retail cash is step 5; post-purchase loyalty is step 6.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C10_COMMSTUD_010,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Match the Indian corporate pricing scenario to its exact strategic PRICING OBJECTIVE:',
    options: [
      'Reliance Jio Free Preview (2016) → Penetration / Market Share; Apple iPhone 15 Pro Max ₹1,59,900 → Price Skimming; NPPA Ceiling on Insulin ₹250 → Social Welfare; Tata Salt ₹28/kg → Price Stability.',
      'Reliance Jio → Skimming; Apple iPhone → Social Welfare; Tata Salt → Penetration; NPPA Insulin → Profit Maximisation.',
      'Reliance Jio → Price Stability; Apple iPhone → Survival; NPPA Insulin → Penetration; Tata Salt → Skimming.',
      'All four represent identical cost-plus pricing strategies.',
    ],
    correctIndex: 0,
    explanation:
      'Jio aimed for mass market penetration; Apple skims high-income early adopters; NPPA enforces affordable public health (social welfare); Tata Salt maintains long-term stable pricing for trust.',
    hints: [
      'What was Jio’s goal when offering data free for 3 months to reach 100M users?',
      'Why does Apple charge ₹1.6 lakh on day 1 and reduce it over time?',
      'NPPA regulates essential medicine prices for public welfare.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C10_COMMSTUD_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'During the 2012 Maruti Suzuki Manesar plant labor unrest, what was the CORE structural conflict between employer expectations and employee expectations?',
    options: [
      'Workers demanded the company relocate the plant to Japan.',
      'Management expected high line productivity (~1,500 cars/day) and tight cost control; workers expected equal pay for contract labor, wage hikes, and an independent union.',
      'Workers demanded that Maruti Suzuki stop manufacturing petrol engines immediately.',
      'Management wanted to eliminate quality testing altogether.',
    ],
    correctIndex: 1,
    explanation:
      'Employer expectations (cost efficiency, productivity, disciplined output) inherently clash with employee expectations (higher real wages, job regularisation, union autonomy). Managing this balance is the primary role of HR.',
    hints: [
      'Why do higher wages reduce retained profits for shareholders in the short term?',
      'Look at the difference in treatment between permanent staff and contract workers at Manesar.',
      'Conflict stemmed from wage parity, union recognition, and production speed targets.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C10_COMMSTUD_009,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question:
      'Construct a complete "Product-with-Service Bundle" offering for an Indian commercial enterprise by assembling the required components in order:',
    availableParts: [
      'Tangible Hardware (Voltas Inverter AC Unit)',
      'Free 1-Year Doorstep Installation & Maintenance Service',
      'Extended 5-Year Compressor Warranty & Digital SLA Support',
      'Pure Intangible Advice Only',
    ],
    targetState:
      'Tangible Hardware (Voltas Inverter AC Unit) Free 1-Year Doorstep Installation & Maintenance Service Extended 5-Year Compressor Warranty & Digital SLA Support',
    validationHint:
      'Combine the physical product with its installation service and warranty support (exclude pure advice).',
    explanation:
      'Modern commerce predominantly bundles tangible products (AC hardware) with intangible service agreements (installation, warranty, doorstep repair) to create holistic consumer value.',
    hints: [
      'A bundle requires BOTH a physical good and ongoing service support.',
      'Select the Voltas AC hardware, the 1-year doorstep service, and the warranty support.',
      'Do not include the pure intangible advice component.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C10_COMMSTUD_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Why does financial transparency (audited financial statements under Ind AS) matter to BOTH Creditors and Suppliers, despite their different business roles?',
    options: [
      'Because both creditors and suppliers vote at Annual General Meetings as equity shareholders.',
      'Creditors examine Debt-Service Coverage Ratios (DSCR) for loan repayment ability; Suppliers examine Liquidity & Current Ratios to ensure payment within 30-45 day credit terms.',
      'Neither party cares about audited accounts; only tax inspectors review them.',
      'Both evaluate the statements solely to purchase stock on BSE/NSE.',
    ],
    correctIndex: 1,
    explanation:
      'Both need solvency assurance: lenders evaluate long-term debt servicing (DSCR, interest coverage), whereas trade suppliers evaluate short-term liquidity (current ratio, trade payables turnover).',
    hints: [
      'Does a bank check if the firm has enough cash flow to service quarterly EMIs?',
      'Does a raw material supplier check if the firm can clear 30-day invoices?',
      'Lenders focus on debt coverage; suppliers focus on working capital liquidity.',
    ],
  },

  // Advanced Competency Challenges (17-24)
  {
    id: 'ch_17',
    nodeId: NODE_C10_COMMSTUD_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Section 166(2) of the Companies Act 2013 mandates: "A director shall act in good faith to promote the objects of the company for the benefit of its members as a whole, and in the best interests of the company, its employees, the shareholders, the community and for the protection of the environment." What is the legal significance and limitation of this clause?',
    options: [
      'It grants local communities the direct right to sue directors for damages if local air quality decreases.',
      'It legally codifies multi-stakeholder governance as a fiduciary standard, though direct statutory enforcement remains owed to the company as a whole.',
      'It eliminates the role of equity shareholders entirely.',
      'It makes company directors government civil servants under the Union Public Service Commission.',
    ],
    correctIndex: 1,
    explanation:
      'Section 166 elevates stakeholder governance beyond shareholder supremacy by explicitly naming employees, community, and environment, setting the benchmark for directorial fiduciary duty in India.',
    hints: [
      'Does Section 166 mention only shareholders or multiple stakeholder groups?',
      'Can an individual villager file a direct civil suit under Section 166 without environmental law statutes?',
      'It creates a fiduciary obligation to the company encompassing diverse stakeholder welfare.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C10_COMMSTUD_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'PureSip Beverages launches a cold-pressed wellness drink in Mumbai. Variable manufacturing cost is ₹60/bottle; fixed monthly marketing overhead is ₹6,00,000. If the bottle is priced at ₹120, how many bottles must PureSip sell per month to achieve BREAK-EVEN (zero profit, zero loss)?',
    correctAnswer: 10000,
    tolerance: 50,
    unit: 'bottles',
    explanation:
      'Contribution Margin per bottle = Price − Variable Cost = ₹120 − ₹60 = ₹60. Break-Even Volume = Fixed Overhead / Contribution Margin = ₹6,00,000 / ₹60 = 10,000 bottles.',
    hints: [
      'Calculate contribution margin: Selling Price (₹120) minus Variable Cost (₹60).',
      'Contribution per bottle is ₹60.',
      'Divide fixed overhead ₹6,00,000 by ₹60 per bottle.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C10_COMMSTUD_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'FreshCo Snacks launched a "Buy 1 Get 1 Free" campaign for Diwali and booked record quarterly sales of ₹400 crore. However, in Q4 sales collapsed by 65%, dealer complaints surged, and brand equity dropped. Why did this represent a SALES success but a MARKETING failure?',
    options: [
      'Because the GST department disallowed discounts.',
      'Sales focused on short-term transactional volume push, but marketing failed to identify sustainable consumer preferences, build brand loyalty, or ensure repeat purchase willingness at standard MRP.',
      'Because Diwali is an unsuitable festive season for commercial campaigns.',
      'Because customer satisfaction and sales volume are legally identical.',
    ],
    correctIndex: 1,
    explanation:
      'High short-term turnover is a transactional sales metric. Marketing requires creating durable brand utility, long-term customer satisfaction, and profitable repeat demand.',
    hints: [
      'Did deep discounts attract deal-seekers or loyal brand advocates?',
      'What happened when the product returned to full price without promotional push?',
      'Sales achieved short-term volume; marketing failed in long-term value creation.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C10_COMMSTUD_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A chemical plant near the Ganga in Uttar Pradesh releases toxic untreated effluents. Contrast the enforcement mechanism of the Government versus Society in this scenario:',
    options: [
      'Society files tax notices; Government organises consumer boycotts.',
      'Government enforces statutory penalties, closure notices, and criminal prosecution via CPCB / Water Act 1974; Society exercises moral and market pressure through public protests, PILs, and reputational damage.',
      'Neither party holds legitimate power over a privately owned factory.',
      'The factory can ignore government closure orders if local villagers support employment.',
    ],
    correctIndex: 1,
    explanation:
      'Government expectations are backed by statutory coercion and legal penalties (Water Act, NGT, EPA). Society expectations operate through social licence, protests, media scrutiny, and public interest litigation.',
    hints: [
      'Which body has the power to seal factory gates under the Water Act 1974?',
      'How do local citizens and environmental NGOs create accountability?',
      'Government uses statutory legal authority; Society uses democratic and reputational pressure.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C10_COMMSTUD_003,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Classify the 36 lakh dairy farmers supplying milk to AMUL (GCMMF) under stakeholder theory:',
    options: [
      'They are internal employees receiving fixed monthly salaries under the Factories Act 1948.',
      'They are primary external SUPPLIERS who deliver raw milk daily, but simultaneously democratic member-owners of village cooperative societies that govern the federation.',
      'They are financial creditors holding mortgage debentures over AMUL processing plants.',
      'They are government regulatory officers overseeing quality standards.',
    ],
    correctIndex: 1,
    explanation:
      'Amul is a cooperative model: dairy farmers are external raw material suppliers in daily transactions, yet collectively form the ultimate cooperative ownership base.',
    hints: [
      'Do dairy farmers supply raw milk twice a day to village collection centers?',
      'Who owns the Anand Milk Union Limited cooperative structure?',
      'They act as suppliers of raw materials and cooperative member-owners.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C10_COMMSTUD_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Under the Consumer Protection Act 2019, why is evidence collection and redressal handled differently for a DEFECTIVE PRODUCT (e.g. exploding phone battery) versus a DEFICIENT SERVICE (e.g. negligent hospital surgery or delayed flight)?',
    options: [
      'Because products are exempt from consumer court jurisdictions.',
      'A defective product can be physically sealed, tested in approved laboratories, and replaced; a deficient service is an intangible past performance that requires expert testimony and contemporaneous records.',
      'Services carry mandatory 10-year physical replacement warranties.',
      'Product defects are civil matters, while all service deficiencies are handled by SEBI.',
    ],
    correctIndex: 1,
    explanation:
      'Physical goods leave tangible evidentiary artifacts suitable for laboratory analysis; services leave intangible results requiring process audits, medical records, or flight logs.',
    hints: [
      'Can an engineer inspect a cracked smartphone screen in an ISO testing lab?',
      'Can a court re-run a completed flight or medical procedure?',
      'Products leave tangible physical proof; services require process documentation.',
    ],
  },
  {
    id: 'ch_23',
    nodeId: NODE_C10_COMMSTUD_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'When formulating the price of a life-saving oncology injection, evaluate the tension between the "Cost–Demand–Competition Triangle" and the National Pharmaceutical Pricing Authority (NPPA) ceiling under DPCO 2013:',
    options: [
      'The company can freely set prices at ₹5,00,000 because consumer demand is inelastic.',
      'The statutory ceiling price enforced by NPPA prioritises Social Welfare and public health, legally capping prices regardless of maximum profit willingness to pay.',
      'Competition law requires all medicines to be sold free of charge.',
      'Cost of production has no mathematical connection to pharmaceutical drug development.',
    ],
    correctIndex: 1,
    explanation:
      'In essential goods (medicines, railway second class), government regulatory intervention overrides commercial profit maximisation in favor of social welfare and constitutional right to health.',
    hints: [
      'What does the Drugs (Prices Control) Order 2013 empower NPPA to do?',
      'Can a pharma company charge unlimited amounts for an essential medicine on the NLEM list?',
      'Statutory social welfare ceilings legally override free-market price skimming.',
    ],
  },
  {
    id: 'ch_24',
    nodeId: NODE_C10_COMMSTUD_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'An IT consultant in Bengaluru holds 500 equity shares of Wipro Limited and simultaneously works full-time as a Lead Software Architect at Wipro. How is this individual classified in stakeholder analysis?',
    options: [
      'He becomes the legal employer of Wipro Limited under the Companies Act 2013.',
      'He holds DUAL internal stakeholder roles: an OWNER (Shareholder) bearing capital risk and an EMPLOYEE providing contractual technical labour for monthly salary.',
      'His employment contract automatically converts him into an external supplier.',
      'Holding shares disqualifies him from receiving monthly employment salary.',
    ],
    correctIndex: 1,
    explanation:
      'Stakeholder analysis is role-based: one individual can concurrently hold multiple internal stakeholder identities (shareholder via equity ownership and employee via contract of service).',
    hints: [
      'Does he receive dividends when Wipro declares quarterly profits?',
      'Does he receive a salary slip under Section 192 TDS each month?',
      'He occupies dual internal roles: shareholder and employee.',
    ],
    misconceptionIndex: 2,
  },
];

// ─── PROPS & DEFAULTS ──────────────────────────────────────────────────────
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
  nodeId: NODE_C10_COMMSTUD_001,
  title: 'Commercial Studies: Meaning of Stakeholders, Marketing & Pricing',
  definition:
    'A stakeholder is any individual, group, or institution that has an interest in or is affected by a commercial organisation. Commercial operations encompass internal stakeholders (shareholders, employees, employers) and external stakeholders (suppliers, creditors, government, society), while marketing and pricing frameworks balance customer satisfaction and commercial profitability.',
  eli5: 'Think of a company like an IPL cricket team: shareholders own the franchise, players are employees, the franchise entity is the employer, ticket-buying fans are customers, sponsors are suppliers, banks are creditors, and the cricket board is the government regulator!',
  misconceptions: [
    {
      misconception: 'Stakeholder and shareholder mean the same thing.',
      correction:
        'Shareholders are one specific type of internal stakeholder who own equity shares. Stakeholders include non-owners like employees, customers, suppliers, banks, government, and society.',
    },
    {
      misconception: 'The CEO or Managing Director is the legal employer.',
      correction:
        'The employer is the company itself as an artificial legal entity. The CEO is a senior employee appointed by the Board of Directors on behalf of the company.',
    },
    {
      misconception: 'An employee who owns shares through an ESOP becomes the employer.',
      correction:
        'Holding shares makes an employee dual-status (shareholder + employee), but the company remains the legal employer.',
    },
    {
      misconception: 'If an offering has physical packaging (like software in a box), it is a product.',
      correction:
        'The box is merely the delivery medium. The core offering is intangible software service. Services are non-inventoriable, perishable, and intangible.',
    },
    {
      misconception: 'Low price always means low profit, and high price always means high profit.',
      correction:
        'Total Profit = (Price − Cost) × Sales Volume. Reliance Jio low pricing captured 450M users, creating massive total profit through scale.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Who is a stakeholder in a commercial organisation?',
      options: [
        'Only persons who hold equity shares',
        'Any party with an interest in or affected by the organisation',
        'Only full-time workers on payroll',
        'Only banks that lend money',
      ],
      correctIndex: 1,
    },
    {
      question: 'Which of the following is an INTERNAL stakeholder?',
      options: ['Trade Supplier', 'Factory Employee', 'GST Department', 'Commercial Bank'],
      correctIndex: 1,
    },
    {
      question: 'Which external stakeholder provides debt capital expecting timely repayment and interest?',
      options: ['Trade Supplier', 'Creditor Bank', 'Local Society', 'Municipal Corporation'],
      correctIndex: 1,
    },
    {
      question: 'Marketing begins at which stage of the business process?',
      options: [
        'After finished stock fills the warehouse',
        'Before production, by identifying customer needs and market opportunities',
        'Only after advertising agencies launch TV commercials',
        'When customer warranty claims expire',
      ],
      correctIndex: 1,
    },
    {
      question: 'What is the primary characteristic that distinguishes a service from a physical product?',
      options: [
        'Services can be stored in godowns for 5 years',
        'Services are intangible, perishable, and produced-consumed simultaneously',
        'Products can never be transferred from seller to buyer',
        'Services are exempt from all commercial laws',
      ],
      correctIndex: 1,
    },
    {
      question: 'Under Section 135 of the Companies Act 2013, what minimum CSR percentage is mandated?',
      options: [
        '10% of total revenue',
        '2% of average net profits of preceding 3 years',
        '50% of annual dividends',
        '1% of share capital',
      ],
      correctIndex: 1,
    },
    {
      question: 'Setting a high initial price to extract maximum margin from early adopters is called:',
      options: ['Penetration Pricing', 'Price Skimming', 'Social Welfare Pricing', 'Survival Pricing'],
      correctIndex: 1,
    },
    {
      question: 'Can the Government of India be both internal and external to the same enterprise?',
      options: [
        'No, government is always external',
        'Yes, internal as majority shareholder and external as customer/regulator',
        'No, government can only be an employer',
        'Only during financial emergencies',
      ],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Demonstrate comprehensive mastery across all 10 Commercial Studies nodes: identifying stakeholders, classifying internal vs external, evaluating legal expectations under Companies Act & Code on Wages, distinguishing marketing from sales, comparing products & services, and applying the cost-demand-competition pricing model.',
};

// ─── INTERACTIVE EXPLORATION STEPS ─────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Interactive Stakeholder Network',
    instruction:
      'Click on any stakeholder node around Bharat Mobility Ltd to inspect their core stake, financial flows, and legal standing.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C10_COMMSTUD_001,
  },
  {
    title: 'Internal vs External Boundary Matrix',
    instruction:
      'Toggle the enterprise boundary filter to visualize how direct operational participation separates internal members from external market partners.',
    interactionType: 'boundary-filter',
    nodeId: NODE_C10_COMMSTUD_004,
  },
  {
    title: 'Dynamic Stakeholder Tension Simulator',
    instruction:
      'Adjust the Price Slider and Wage Slider. Watch in real-time how shareholder returns, worker satisfaction, and customer demand interact!',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_COMMSTUD_005,
  },
  {
    title: 'Marketing vs Sales Funnel Flow',
    instruction:
      'Step through the 6-stage commercial pipeline to observe why Marketing spans before and after the transactional sales exchange.',
    interactionType: 'funnel-step',
    nodeId: NODE_C10_COMMSTUD_008,
  },
  {
    title: 'Cost–Demand–Competition Pricing Lab',
    instruction:
      'Manipulate production cost, competitor benchmark, and demand elasticity to find the optimum strategic pricing zone.',
    interactionType: 'pricing-lab',
    nodeId: NODE_C10_COMMSTUD_010,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question:
      'PREDICT: If Bharat Mobility raises EV base price from ₹12 Lakh to ₹15 Lakh while freezing factory wages, what will happen to shareholder dividend vs customer demand?',
    options: [
      'Both customer demand and shareholder dividends will increase indefinitely.',
      'Per-unit margin rises for shareholders in the short term, but customer demand drops significantly as price elasticity takes effect.',
      'Factory worker satisfaction will rise to 100%.',
      'Creditor banks will immediately cancel all working capital facilities.',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Now drag the Price slider to +25% and Wage slider to 0% in the simulator to verify your prediction!',
    nodeId: NODE_C10_COMMSTUD_005,
  },
  {
    question:
      'PREDICT: If management lowers price by 30% to execute Penetration Pricing (Jio Strategy), what will happen to unit sales volume?',
    options: [
      'Unit volume will collapse to zero.',
      'Unit sales volume and market share will surge dramatically, spreading fixed overhead costs over a larger base.',
      'Competitors will immediately cease operations in India.',
      'GST tax rates will automatically drop to 0%.',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Drag the Price slider to -30% and observe the Market Share and Volume gauges update in real-time!',
    nodeId: NODE_C10_COMMSTUD_010,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question:
      'OBSERVE: What happens to the "Employee Satisfaction Gauge" when you increase factory wages by 20%?',
    observableOptions: [
      'Satisfaction gauge turns bright green (>80%) as wage fairness expectations under the Code on Wages 2019 are satisfied.',
      'Satisfaction drops to zero because workers prefer lower wages.',
      'Shareholder margin automatically triples.',
      'Government closes the factory.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_COMMSTUD_005,
  },
  {
    question:
      'OBSERVE: In the Marketing Funnel, which stage occurs BEFORE physical manufacturing takes place?',
    observableOptions: [
      'Retail cash collection at dealer counters.',
      'Consumer Need Identification and Market Opportunity Research.',
      'Filing annual audited accounts with the Registrar of Companies.',
      'Handling consumer defect court appeals.',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_COMMSTUD_008,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Executive Commercial Strategy Audit',
  description:
    'Choose an iconic Indian company (e.g. Tata Motors, Reliance Retail, Infosys, or Amul). Map 6 distinct stakeholders across internal/external boundaries, list one legal right for each (under Companies Act 2013, Code on Wages, or CPA 2019), and design a 3-tier pricing strategy for their flagship product.',
  steps: [
    'Identify 3 internal stakeholders (Shareholders, Employees, Board) and 3 external (Suppliers, Creditors, Society/Govt).',
    'Specify statutory compliance requirements (Section 135 CSR, Section 166 Duties, TDS, GST).',
    'Evaluate whether their primary offering is a pure good, service, or bundled solution.',
    'Formulate a pricing recommendation balancing cost floor, competitor reference, and demand ceiling.',
  ],
};

// ─── COMPONENT IMPLEMENTATION ──────────────────────────────────────────────
function C10_CommercialStudiesMeaningStakeholderSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_COMMSTUD_001,
  title = DEFAULT_PROPS.title || 'Stakeholder Analysis & Commercial Principles',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || {
    name: 'Commercial Studies',
    emoji: '📊',
    color: 'indigo',
  };

  // ─── STATE DECLARATIONS ──────────────────────────────────────────────────
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState('beginner');

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [discoverySelectedIdx, setDiscoverySelectedIdx] = useState<number | null>(null);

  // Predict & Observe states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox states
  const [selectedStakeholder, setSelectedStakeholder] = useState<string | null>('shareholders');
  const [boundaryFilter, setBoundaryFilter] = useState<'all' | 'internal' | 'external'>('all');
  const [priceSlider, setPriceSlider] = useState<number>(0); // -40% to +40%
  const [wageSlider, setWageSlider] = useState<number>(0); // -20% to +30%
  const [funnelStage, setFunnelStage] = useState<number>(0); // 0 to 5
  const [costInput, setCostInput] = useState<number>(100);
  const [markupSlider, setMarkupSlider] = useState<number>(25);
  const [competitorPrice, setCompetitorPrice] = useState<number>(130);
  const [demandElasticity, setDemandElasticity] = useState<'elastic' | 'inelastic'>('elastic');

  // Challenge execution states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Challenge Drag & Drop / Numeric / Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback & Visual Animation states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Tab & Live Calculation states
  const [activeTab, setActiveTab] = useState<'network' | 'tension' | 'pricing'>('network');
  const [csrBudgetSpend, setCsrBudgetSpend] = useState<number>(240);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED METRICS ─────────────────────────────────────────────────────
  const simMetrics = useMemo(() => {
    const baseShareholderVal = 60;
    const baseCustomerDemand = 70;
    const baseEmployeeSat = 55;
    const baseSocietyAppr = 50;

    const calculatedShareholder = Math.min(
      100,
      Math.max(10, baseShareholderVal + priceSlider * 0.9 - wageSlider * 0.7)
    );
    const calculatedCustomer = Math.min(
      100,
      Math.max(10, baseCustomerDemand - priceSlider * 1.1)
    );
    const calculatedEmployee = Math.min(
      100,
      Math.max(15, baseEmployeeSat + wageSlider * 1.3)
    );
    const calculatedSociety = Math.min(
      100,
      Math.max(20, baseSocietyAppr + (csrBudgetSpend >= 240 ? 25 : -15))
    );

    const calculatedSellingPrice = Math.round(costInput * (1 + markupSlider / 100));
    const profitMarginUnit = calculatedSellingPrice - costInput;
    const estimatedVolume =
      demandElasticity === 'elastic'
        ? Math.max(100, Math.round(10000 - (calculatedSellingPrice - competitorPrice) * 120))
        : Math.max(500, Math.round(8000 - (calculatedSellingPrice - competitorPrice) * 35));
    const totalGrossProfit = Math.max(0, profitMarginUnit * estimatedVolume);

    return {
      shareholderScore: Math.round(calculatedShareholder),
      customerScore: Math.round(calculatedCustomer),
      employeeScore: Math.round(calculatedEmployee),
      societyScore: Math.round(calculatedSociety),
      sellingPrice: calculatedSellingPrice,
      marginPerUnit: profitMarginUnit,
      volume: estimatedVolume,
      totalProfit: totalGrossProfit,
    };
  }, [priceSlider, wageSlider, csrBudgetSpend, costInput, markupSlider, competitorPrice, demandElasticity]);

  // Adaptive Challenges Filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECTS ─────────────────────────────────────────────────────────────
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
    const newDiff: 'foundation' | 'standard' | 'advanced' =
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let particleOffset = 0;

    const render = () => {
      particleOffset += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#6366f1';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = centerY + Math.sin(x * 0.03 + particleOffset) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      for (let i = 0; i < 6; i++) {
        const px = ((particleOffset * 50 + i * 80) % (canvas.width - 20)) + 10;
        const py = centerY + Math.sin(px * 0.03 + particleOffset) * 8;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(
        `Commercial Revenue Flow: ₹${simMetrics.sellingPrice * simMetrics.volume} | CSR: ₹${csrBudgetSpend} Cr`,
        12,
        15
      );

      animFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameId);
  }, [simMetrics, csrBudgetSpend]);

  useEffect(() => {
    if (phase !== 'challenge' || answerRevealed || hintCount > 0) return;
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (currentChallengeObj.hints && currentChallengeObj.hints.length > 0) {
        setCurrentHint(currentChallengeObj.hints[0]);
        setShowHint(true);
        setHintCount(1);
        audioManager.play('hint');
        speechManager.speak('Here is a helpful clue to guide you.');
      }
    }, 12000);

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, answerRevealed, hintCount, currentChallengeObj]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───────────────────────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
  }, []);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    setDiscoverySelectedIdx(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Stakeholders are interconnected in an intricate commercial web.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive commercial exploration lab.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test your intuition in the free sandbox simulator.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenge questions.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now adjust the sliders to test it.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Excellent observation!' : 'Review the satisfaction meters closely.');
  }, []);

  const handleStakeholderSelect = useCallback((key: string) => {
    setSelectedStakeholder(key);
    audioManager.play('tap');
    const speechMap: Record<string, string> = {
      shareholders: 'Shareholders expect dividends, capital appreciation, and efficient operations.',
      employees: 'Employees expect fair minimum wages, job security, and safe working conditions under the Factories Act.',
      employer: 'The employer is the company itself as a legal person under Section 7 of Companies Act 2013.',
      suppliers: 'Suppliers expect prompt payment within 30 to 45 days and repeat orders.',
      creditors: 'Creditors expect loan principal and interest repayment backed by asset security.',
      government: 'Government expects statutory tax compliance and adherence to industrial regulations.',
      society: 'Society expects environmental protection, local hiring, and mandatory 2 percent CSR.',
    };
    if (speechMap[key]) speechManager.speak(speechMap[key]);
  }, []);

  const handlePriceChange = useCallback((val: number) => {
    setPriceSlider(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified) setPredictionVerified(true);
  }, [predictionMade, predictionVerified]);

  const handleWageChange = useCallback((val: number) => {
    setWageSlider(val);
    audioManager.play('count');
  }, []);

  const handleCsrChange = useCallback((val: number) => {
    setCsrBudgetSpend(val);
    audioManager.play('balance');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Commercial Studies mastery simulation.');
  }, [errors, onComplete]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeObj.hints[nextLevel - 1]) {
      setCurrentHint(currentChallengeObj.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentChallengeObj.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete step-by-step commercial explanation.');
    }
  }, [hintCount, currentChallengeObj]);

  const handleAnswer = useCallback(
    (ans: number | Record<string, string> | number[] | string) => {
      resetInactivityTimer();
      let isCorrect = false;

      if (
        currentChallengeObj.type === 'classify' ||
        currentChallengeObj.type === 'distinguish' ||
        currentChallengeObj.type === 'match'
      ) {
        isCorrect = ans === currentChallengeObj.correctIndex;
      } else if (currentChallengeObj.type === 'drag-label') {
        isCorrect =
          JSON.stringify(ans) === JSON.stringify(currentChallengeObj.correctMapping);
      } else if (currentChallengeObj.type === 'drag-sort') {
        isCorrect =
          JSON.stringify(ans) === JSON.stringify(currentChallengeObj.correctOrder);
      } else if (currentChallengeObj.type === 'numeric') {
        const numVal = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
        isCorrect =
          Math.abs(numVal - (currentChallengeObj.correctAnswer || 0)) <=
          (currentChallengeObj.tolerance || 0);
      } else if (currentChallengeObj.type === 'construct') {
        isCorrect = ans === currentChallengeObj.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding analysis.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(
          currentChallengeObj.nodeId,
          currentChallengeObj.question
        );
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(
            'srs_' + currentChallengeObj.nodeId,
            JSON.stringify(updatedSrs)
          );
        }
      } else {
        setErrors((e) => e + 1);
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          currentChallengeObj.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, currentChallengeObj.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the solution together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(
            currentChallengeObj.nodeId,
            currentChallengeObj.question
          );
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(
              'srs_' + currentChallengeObj.nodeId,
              JSON.stringify(updatedSrs)
            );
          }
        }
      }
    },
    [currentChallengeObj, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]
  );

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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = currentChallengeObj.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, currentChallengeObj]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const items =
        prev.length === 0 && currentChallengeObj.sortItems
          ? currentChallengeObj.sortItems.map((_, i) => i)
          : [...prev];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [currentChallengeObj]);

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : currentChallengeObj.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, currentChallengeObj, handleAnswer]);

  // ─── STAKEHOLDER DETAIL INFO MAP ──────────────────────────────────────────
  const stakeholderInfo: Record<
    string,
    { title: string; category: string; law: string; expected: string; example: string }
  > = {
    shareholders: {
      title: 'Shareholders (Owners)',
      category: 'Internal Stakeholder',
      law: 'Section 41 & 166, Companies Act 2013',
      expected: 'Dividend yield, share price appreciation, growth, and fiduciary accountability.',
      example: 'Tata Sons, LIC, retail investors on BSE/NSE holding Tata Motors shares.',
    },
    employees: {
      title: 'Employees (Workforce)',
      category: 'Internal Stakeholder',
      law: 'Code on Wages 2019, Factories Act 1948, Industrial Relations Code 2020',
      expected: 'Fair remuneration, job security, safe working conditions, health & welfare.',
      example: '80,000+ assembly engineers at Tata Motors Pune & Sanand plants.',
    },
    employer: {
      title: 'Employer (Corporate Entity)',
      category: 'Internal Stakeholder',
      law: 'Section 7 (Separate Legal Personality), Companies Act 2013',
      expected: 'Discipline, productivity, operational continuity, and profit margin delivery.',
      example: 'Bharat Mobility Ltd / Tata Motors Ltd as a separate artificial legal person.',
    },
    suppliers: {
      title: 'Suppliers (Raw Materials & Parts)',
      category: 'External Stakeholder',
      law: 'Indian Contract Act 1872, MSMED Act 2006 (Section 16: 45-day rule)',
      expected: 'Prompt payment within credit period (30-45 days), repeat purchase orders, fair terms.',
      example: 'Bosch India (Fuel Systems), Bharat Forge (Forgings), MRF (Tyres).',
    },
    creditors: {
      title: 'Creditors (Banks & Financial Institutions)',
      category: 'External Stakeholder',
      law: 'Insolvency and Bankruptcy Code 2016, SARFAESI Act 2002',
      expected: 'Timely EMI/Interest servicing, collateral security, debt covenants (DSCR > 1.0).',
      example: 'State Bank of India & HDFC Bank syndicated working-capital consortium.',
    },
    government: {
      title: 'Government & Statutory Regulators',
      category: 'External Stakeholder',
      law: 'Income Tax Act 1961, CGST Act 2017, SEBI, Ministry of Corporate Affairs',
      expected: 'Honest tax payment (GST & Corporate Tax), legal compliance, employment generation.',
      example: 'Central Board of Direct Taxes (CBDT), CBIC, Ministry of Heavy Industries.',
    },
    society: {
      title: 'Society & Local Communities',
      category: 'External Stakeholder',
      law: 'Section 135 (Mandatory 2% CSR), Environment Protection Act 1986',
      expected: 'Zero effluent pollution, local employment, healthcare, and educational CSR initiatives.',
      example: 'Sanand village panchayats and Subarnarekha river basin communities.',
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ─── HEADER BAR ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="text-3xl p-2 bg-indigo-900/50 rounded-xl border border-indigo-700/50"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-indigo-300 font-medium">
              ICSE Class 10 Commercial Studies • Comprehensive Stakeholder & Marketing Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 border border-emerald-500 text-emerald-400'
                : difficulty === 'advanced'
                ? 'bg-rose-950 border border-rose-500 text-rose-400'
                : 'bg-indigo-950 border border-indigo-500 text-indigo-400'
            }`}
          >
            {difficulty} TIER
          </motion.div>

          <div className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold text-slate-300 border border-slate-700">
            Mastery: <span className="text-amber-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🌟</span> Real-World Business Dilemma
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-amber-300">
              Curiosity Discovery Hook: What Do You Predict?
            </h3>
            <p className="text-sm text-slate-200">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => {
                const isChosen = discoverySelectedIdx === idx;
                const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                let btnStyle = 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200';
                if (discoveryAnswered) {
                  if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                  else if (isChosen) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: discoveryAnswered ? 1 : 1.01 }}
                    whileTap={{ scale: discoveryAnswered ? 1 : 0.99 }}
                    onClick={() => !discoveryAnswered && handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${idx + 1}: ${option}`}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="font-bold text-xs px-2 py-1 bg-slate-950 rounded-lg text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-indigo-700/60 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p
                    className={`text-sm font-bold ${
                      discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {discoveryCorrect
                      ? '✓ Exactly right! Commercial entities operate in an interconnected stakeholder web.'
                      : '⚡ Intriguing thought! No stakeholder operates in isolation.'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Let us step into the interactive simulation lab to see how stakeholders, marketing, and pricing function!
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                >
                  Enter Visual Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Discovery Lab
            </span>
            <div className="flex items-center gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === i ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-xl font-black text-white">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 mt-1 flex items-center gap-2">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: Interactive Stakeholder Network SVG (SVG Diagram 1) */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[340px]">
                    <svg viewBox="0 0 500 360" className="w-full h-auto max-h-[340px]">
                      {/* Connection Lines */}
                      {[
                        { x: 250, y: 70 },
                        { x: 100, y: 130 },
                        { x: 100, y: 240 },
                        { x: 400, y: 130 },
                        { x: 400, y: 240 },
                        { x: 250, y: 300 },
                      ].map((pos, i) => (
                        <line
                          key={i}
                          x1="250"
                          y1="180"
                          x2={pos.x}
                          y2={pos.y}
                          stroke="#334155"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                      ))}

                      {/* Enterprise Center Node */}
                      <circle
                        cx="250"
                        cy="180"
                        r="45"
                        fill="#1e1b4b"
                        stroke="#6366f1"
                        strokeWidth="3"
                      />
                      <text x="250" y="176" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                        BHARAT MOBILITY
                      </text>
                      <text x="250" y="192" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        (Corporate Entity)
                      </text>

                      {/* Stakeholder Circular Nodes */}
                      {[
                        { id: 'shareholders', label: 'Shareholders', x: 250, y: 70, color: '#10b981', tag: 'Internal' },
                        { id: 'employees', label: 'Employees', x: 100, y: 130, color: '#3b82f6', tag: 'Internal' },
                        { id: 'suppliers', label: 'Suppliers', x: 100, y: 240, color: '#f59e0b', tag: 'External' },
                        { id: 'creditors', label: 'Creditors (Banks)', x: 400, y: 130, color: '#ec4899', tag: 'External' },
                        { id: 'government', label: 'Government', x: 400, y: 240, color: '#8b5cf6', tag: 'External' },
                        { id: 'society', label: 'Society & CSR', x: 250, y: 300, color: '#14b8a6', tag: 'External' },
                      ].map((node) => {
                        const isSelected = selectedStakeholder === node.id;
                        return (
                          <g
                            key={node.id}
                            onClick={() => handleStakeholderSelect(node.id)}
                            className="cursor-pointer transition-transform"
                          >
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={isSelected ? 36 : 30}
                              fill={isSelected ? node.color : '#1e293b'}
                              stroke={node.color}
                              strokeWidth={isSelected ? 3 : 1.5}
                              className="transition-all duration-200"
                            />
                            <text
                              x={node.x}
                              y={node.y - 2}
                              textAnchor="middle"
                              fill={isSelected ? '#ffffff' : '#e2e8f0'}
                              fontWeight="bold"
                              fontSize="9.5"
                            >
                              {node.label}
                            </text>
                            <text
                              x={node.x}
                              y={node.y + 11}
                              textAnchor="middle"
                              fill={isSelected ? '#0f172a' : '#94a3b8'}
                              fontSize="7.5"
                              fontWeight="600"
                            >
                              [{node.tag}]
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Stakeholder Details Panel */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    {selectedStakeholder && stakeholderInfo[selectedStakeholder] ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-extrabold text-white">
                            {stakeholderInfo[selectedStakeholder].title}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-950 text-indigo-400 border border-indigo-700">
                            {stakeholderInfo[selectedStakeholder].category}
                          </span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                          <p className="text-slate-400 font-semibold">
                            Legal Anchor: <span className="text-slate-200 font-normal">{stakeholderInfo[selectedStakeholder].law}</span>
                          </p>
                          <p className="text-slate-400 font-semibold">
                            Primary Stake: <span className="text-amber-300 font-normal">{stakeholderInfo[selectedStakeholder].expected}</span>
                          </p>
                          <p className="text-slate-400 font-semibold">
                            Indian Example: <span className="text-indigo-300 font-normal">{stakeholderInfo[selectedStakeholder].example}</span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">Click on any node on the left to inspect.</p>
                    )}
                    <p className="text-[11px] text-slate-500 pt-3 border-t border-slate-800">
                      💡 <strong>Key Principle:</strong> Stakeholders include anyone affected by or affecting the firm, whether or not they own shares.
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Internal vs External Boundary Matrix */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-semibold">Filter Boundary:</span>
                    {(['all', 'internal', 'external'] as const).map((mode) => (
                      <motion.button
                        key={mode}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setBoundaryFilter(mode);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                          boundaryFilter === mode
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {mode}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Internal Box */}
                    {(boundaryFilter === 'all' || boundaryFilter === 'internal') && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-emerald-300">
                            🏢 Internal Stakeholders (Inside Boundary)
                          </h4>
                          <span className="text-[10px] text-emerald-400 font-mono">Participates Daily</span>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-2">
                          <li className="p-2 bg-slate-900/80 rounded-lg">
                            <strong>Shareholders:</strong> Provide equity risk capital; receive dividend payouts & voting rights (Sec 41 Companies Act).
                          </li>
                          <li className="p-2 bg-slate-900/80 rounded-lg">
                            <strong>Employees:</strong> Provide physical/mental labour under employment contracts for monthly wages (Code on Wages 2019).
                          </li>
                          <li className="p-2 bg-slate-900/80 rounded-lg">
                            <strong>Employer:</strong> The incorporated company as a distinct artificial legal person (Sec 7 Companies Act 2013).
                          </li>
                        </ul>
                      </motion.div>
                    )}

                    {/* External Box */}
                    {(boundaryFilter === 'all' || boundaryFilter === 'external') && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-purple-950/40 rounded-2xl border border-purple-700/60 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-purple-300">
                            🌐 External Stakeholders (Outside Boundary)
                          </h4>
                          <span className="text-[10px] text-purple-400 font-mono">Affected from Outside</span>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-2">
                          <li className="p-2 bg-slate-900/80 rounded-lg">
                            <strong>Suppliers:</strong> Supply raw components on trade credit; protected by MSMED Act 45-day rules.
                          </li>
                          <li className="p-2 bg-slate-900/80 rounded-lg">
                            <strong>Creditors:</strong> Provide debt capital expecting timely EMI servicing under SARFAESI / IBC 2016.
                          </li>
                          <li className="p-2 bg-slate-900/80 rounded-lg">
                            <strong>Government:</strong> Regulates and taxes commercial surplus via GST and Income Tax.
                          </li>
                          <li className="p-2 bg-slate-900/80 rounded-lg">
                            <strong>Society:</strong> Local communities demanding clean water, clean air, and mandatory 2% CSR.
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 2: Predict-then-Check & Stakeholder Tension Slider */}
              {currentSlide === 2 && (
                <div className="space-y-5">
                  {!predictionMade && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-indigo-950/70 rounded-2xl border border-indigo-700 space-y-3"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        Step 1: Make Your Commercial Prediction
                      </span>
                      <p className="text-sm text-slate-100">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && (
                    <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-amber-400 font-bold">
                          Step 2: Test Variables In Real Time
                        </span>
                        <span className="text-slate-400">
                          {PREDICTION_QUESTIONS[0].verifyInstruction}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Price Slider */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-slate-300">
                            <span>EV Selling Price Adjustment</span>
                            <span className="font-mono font-bold text-indigo-400">
                              {priceSlider > 0 ? `+${priceSlider}%` : `${priceSlider}%`}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={-40}
                            max={40}
                            value={priceSlider}
                            onChange={(e) => handlePriceChange(Number(e.target.value))}
                            aria-label="Price adjustment slider"
                            className="w-full accent-indigo-500"
                          />
                        </div>

                        {/* Wage Slider */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-slate-300">
                            <span>Factory Wage Increment</span>
                            <span className="font-mono font-bold text-emerald-400">
                              {wageSlider > 0 ? `+${wageSlider}%` : `${wageSlider}%`}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={-20}
                            max={30}
                            value={wageSlider}
                            onChange={(e) => handleWageChange(Number(e.target.value))}
                            aria-label="Wage adjustment slider"
                            className="w-full accent-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Real-time Visual Reaction Gauges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {[
                          { name: 'Shareholder Return', score: simMetrics.shareholderScore },
                          { name: 'Customer Demand', score: simMetrics.customerScore },
                          { name: 'Employee Morale', score: simMetrics.employeeScore },
                          { name: 'Society CSR Approval', score: simMetrics.societyScore },
                        ].map((gauge, i) => {
                          const barColor =
                            gauge.score >= 70
                              ? 'bg-emerald-500'
                              : gauge.score >= 40
                              ? 'bg-amber-500'
                              : 'bg-rose-500';
                          return (
                            <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                              <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                                <span>{gauge.name}</span>
                                <span className="font-mono">{gauge.score}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                                <motion.div
                                  className={`h-full ${barColor}`}
                                  animate={{ width: `${gauge.score}%` }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Observation Question */}
                      {Math.abs(priceSlider) > 10 && !observationAnswered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 p-3 bg-slate-900 rounded-xl border border-indigo-700/60 space-y-2"
                        >
                          <p className="text-xs font-bold text-indigo-300">
                            🔍 Observation: {OBSERVATION_QUESTIONS[0].question}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oi) => (
                              <motion.button
                                key={oi}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleObservation(oi)}
                                className="p-2 text-left text-xs bg-slate-950 hover:bg-slate-800 rounded-lg text-slate-300 border border-slate-700"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 3: Marketing vs Sales Funnel Flow (SVG Diagram 2) */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 540 180" className="w-full h-auto max-h-[180px]">
                      {/* Funnel Chevron Pipeline */}
                      {[
                        { step: '1. Need Research', domain: 'Marketing', color: '#6366f1', x: 10 },
                        { step: '2. Product Design', domain: 'Marketing', color: '#4f46e5', x: 95 },
                        { step: '3. Pricing & MRP', domain: 'Marketing', color: '#4338ca', x: 180 },
                        { step: '4. Distribution', domain: 'Marketing', color: '#3730a3', x: 265 },
                        { step: '5. Sales Close', domain: 'Sales', color: '#f59e0b', x: 350 },
                        { step: '6. Post-Sale Care', domain: 'Marketing', color: '#10b981', x: 435 },
                      ].map((s, idx) => (
                        <g
                          key={idx}
                          onClick={() => {
                            setFunnelStage(idx);
                            audioManager.play('tap');
                          }}
                          className="cursor-pointer"
                        >
                          <rect
                            x={s.x}
                            y="40"
                            width="80"
                            height="85"
                            rx="8"
                            fill={funnelStage === idx ? s.color : '#1e293b'}
                            stroke={s.color}
                            strokeWidth={funnelStage === idx ? 2.5 : 1}
                          />
                          <text
                            x={s.x + 40}
                            y="65"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="8"
                            fontWeight="bold"
                          >
                            {s.step.split(' ')[0]}
                          </text>
                          <text
                            x={s.x + 40}
                            y="80"
                            textAnchor="middle"
                            fill="#e2e8f0"
                            fontSize="7.5"
                          >
                            {s.step.split(' ').slice(1).join(' ')}
                          </text>
                          <rect
                            x={s.x + 8}
                            y="95"
                            width="64"
                            height="18"
                            rx="4"
                            fill={s.domain === 'Sales' ? '#b45309' : '#312e81'}
                          />
                          <text
                            x={s.x + 40}
                            y="107"
                            textAnchor="middle"
                            fill={s.domain === 'Sales' ? '#fef3c7' : '#c7d2fe'}
                            fontSize="7"
                            fontWeight="bold"
                          >
                            {s.domain}
                          </text>
                        </g>
                      ))}

                      {/* Domain span brackets */}
                      <path d="M 15 140 L 340 140" stroke="#6366f1" strokeWidth="2" fill="none" />
                      <text x="175" y="155" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="bold">
                        ◀─── Marketing Domain: Before Production & Market Opportunity ───▶
                      </text>
                      <path d="M 355 140 L 425 140" stroke="#f59e0b" strokeWidth="2" fill="none" />
                      <text x="390" y="155" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">
                        Sales
                      </text>
                      <path d="M 440 140 L 515 140" stroke="#10b981" strokeWidth="2" fill="none" />
                      <text x="477" y="155" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">
                        Post-Sale
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      '1. Need Research',
                      '2. Product Design',
                      '3. Pricing/Promotion',
                      '4. Distribution',
                      '5. Sales Closure',
                      '6. Post-Sale Care',
                    ].map((step, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setFunnelStage(idx);
                          audioManager.play('tap');
                        }}
                        className={`p-2 rounded-xl text-xs font-bold text-center transition-all ${
                          funnelStage === idx
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {step}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 font-bold border border-indigo-700">
                        {funnelStage < 4 || funnelStage === 5 ? 'MARKETING DOMAIN' : 'TRANSACTIONAL SALES DOMAIN'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {funnelStage < 4 ? 'Before Production / Launch' : funnelStage === 4 ? 'Moment of Exchange' : 'After Purchase'}
                      </span>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs leading-relaxed text-slate-300">
                      {funnelStage === 0 && (
                        <p>
                          <strong>Stage 1 — Customer Need Identification:</strong> Marketing begins BEFORE the product exists. Tata surveyed families on two-wheelers in Pune before drafting the ₹1 Lakh car concept. (Market → Factory)
                        </p>
                      )}
                      {funnelStage === 1 && (
                        <p>
                          <strong>Stage 2 — Product Formulation & Packaging:</strong> Developing formulations, EV battery capacities, and sachet sizes (e.g. HUL Project Shakti sachets) to meet the discovered need.
                        </p>
                      )}
                      {funnelStage === 2 && (
                        <p>
                          <strong>Stage 3 — Strategic Pricing & Promotion:</strong> Formulating MRP balancing cost, demand, and competitor reference points, alongside national brand building campaigns.
                        </p>
                      )}
                      {funnelStage === 3 && (
                        <p>
                          <strong>Stage 4 — Place & Distribution Logistics:</strong> Partnering with 1,500+ dealers and retail networks to ensure form, place, and time utility.
                        </p>
                      )}
                      {funnelStage === 4 && (
                        <p className="text-amber-300">
                          <strong>Stage 5 — Sales Execution (Transaction):</strong> The narrow, transactional activity where the showroom executive converts customer interest into cash realization and vehicle handover. (Factory → Market)
                        </p>
                      )}
                      {funnelStage === 5 && (
                        <p>
                          <strong>Stage 6 — Post-Purchase Customer Satisfaction:</strong> Warranty servicing, SLA support, and repeat loyalty generation. Marketing continues long after the sales invoice is closed.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Cost-Demand-Competition Pricing Lab (SVG Diagram 3: Strategic Triangle) */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* Strategic Pricing Triangle SVG */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 500 180" className="w-full h-auto max-h-[180px]">
                      {/* Triangle background */}
                      <polygon points="250,20 100,150 400,150" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" opacity="0.6" />
                      {/* Corner nodes */}
                      <circle cx="250" cy="20" r="18" fill="#10b981" />
                      <text x="250" y="24" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Demand</text>
                      <text x="250" y="4" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">Ceiling (Willingness to Pay)</text>

                      <circle cx="100" cy="150" r="18" fill="#ef4444" />
                      <text x="100" y="154" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Cost</text>
                      <text x="100" y="174" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="bold">Price Floor (Base Cost)</text>

                      <circle cx="400" cy="150" r="18" fill="#f59e0b" />
                      <text x="400" y="154" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Comp</text>
                      <text x="400" y="174" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Reference Benchmark</text>

                      {/* Optimal pricing zone center */}
                      <circle cx="250" cy="115" r="28" fill="#6366f1" stroke="#a5b4fc" strokeWidth="2" />
                      <text x="250" y="112" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">OPTIMAL MRP</text>
                      <text x="250" y="124" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">₹{simMetrics.sellingPrice}</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Cost Floor */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <label className="text-xs font-semibold text-slate-400">1. Cost Floor (₹)</label>
                      <input
                        type="number"
                        value={costInput}
                        onChange={(e) => setCostInput(Math.max(10, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm"
                      />
                      <p className="text-[11px] text-slate-500">The absolute minimum price floor to avoid continuous operating losses.</p>
                    </div>

                    {/* Competitor Benchmark */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <label className="text-xs font-semibold text-slate-400">2. Competitor Benchmark (₹)</label>
                      <input
                        type="number"
                        value={competitorPrice}
                        onChange={(e) => setCompetitorPrice(Math.max(10, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm"
                      />
                      <p className="text-[11px] text-slate-500">The market reference price customers use to judge fairness.</p>
                    </div>

                    {/* Margin Slider */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>3. Desired Mark-up</span>
                        <span className="font-mono font-bold text-indigo-400">+{markupSlider}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={markupSlider}
                        onChange={(e) => setMarkupSlider(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                      <p className="text-[11px] text-slate-500">Mark-up determines your final selling price MRP.</p>
                    </div>
                  </div>

                  {/* Pricing Output Dashboard */}
                  <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950/60 rounded-2xl border border-indigo-800 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Calculated Selling Price (MRP)</p>
                      <p className="text-2xl font-black text-white font-mono">₹{simMetrics.sellingPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Unit Profit Margin</p>
                      <p className="text-xl font-bold text-emerald-400 font-mono">+₹{simMetrics.marginPerUnit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Estimated Monthly Units</p>
                      <p className="text-xl font-bold text-indigo-300 font-mono">{simMetrics.volume.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Total Monthly Gross Profit</p>
                      <p className="text-2xl font-black text-amber-400 font-mono">₹{simMetrics.totalProfit.toLocaleString()}</p>
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
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ──────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">Commercial Sandbox Simulator</h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero grading stress! Adjust parameters, record live commercial flows, and inspect stakeholder equilibrium.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
            >
              Start Challenges! →
            </motion.button>
          </div>

          {/* HTML5 Canvas live financial flow */}
          <canvas ref={canvasRef} width={600} height={40} className="w-full rounded-xl border border-slate-800" />

          {/* Sandbox Navigation Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'network', label: 'Stakeholder Map' },
              { id: 'tension', label: 'Tension & CSR Lab' },
              { id: 'pricing', label: 'Live Pricing Engine' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveTab(tab.id as 'network' | 'tension' | 'pricing');
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {activeTab === 'network' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Select Any Stakeholder Entity to Explore</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.keys(stakeholderInfo).map((key) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleStakeholderSelect(key)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedStakeholder === key
                        ? 'bg-indigo-950 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <p className="text-xs font-bold capitalize">{key}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{stakeholderInfo[key].category}</p>
                  </motion.button>
                ))}
              </div>

              {selectedStakeholder && stakeholderInfo[selectedStakeholder] && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                  <p className="font-bold text-indigo-300">{stakeholderInfo[selectedStakeholder].title}</p>
                  <p className="text-slate-300">
                    <strong>Governing Statute:</strong> {stakeholderInfo[selectedStakeholder].law}
                  </p>
                  <p className="text-slate-300">
                    <strong>Specific Expectation:</strong> {stakeholderInfo[selectedStakeholder].expected}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tension' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-semibold">EV Pricing Level ({priceSlider}%)</label>
                  <input
                    type="range"
                    min={-40}
                    max={40}
                    value={priceSlider}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-semibold">Worker Wage Level ({wageSlider}%)</label>
                  <input
                    type="range"
                    min={-20}
                    max={30}
                    value={wageSlider}
                    onChange={(e) => handleWageChange(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-semibold">CSR Budget (₹{csrBudgetSpend} Cr)</label>
                  <input
                    type="range"
                    min={50}
                    max={400}
                    value={csrBudgetSpend}
                    onChange={(e) => handleCsrChange(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <p className="text-[11px] text-slate-400">Shareholder Return</p>
                  <p className="text-lg font-bold text-emerald-400">{simMetrics.shareholderScore}%</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <p className="text-[11px] text-slate-400">Customer Demand</p>
                  <p className="text-lg font-bold text-indigo-300">{simMetrics.customerScore}%</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <p className="text-[11px] text-slate-400">Employee Morale</p>
                  <p className="text-lg font-bold text-amber-400">{simMetrics.employeeScore}%</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <p className="text-[11px] text-slate-400">Society Approval</p>
                  <p className="text-lg font-bold text-purple-400">{simMetrics.societyScore}%</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex gap-4">
                <span className="text-xs text-slate-400 self-center">Demand Elasticity:</span>
                {(['elastic', 'inelastic'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setDemandElasticity(type)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold uppercase ${
                      demandElasticity === type ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-400">MRP Selling Price</p>
                  <p className="text-xl font-bold text-white font-mono">₹{simMetrics.sellingPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Unit Margin</p>
                  <p className="text-xl font-bold text-emerald-400 font-mono">₹{simMetrics.marginPerUnit}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Monthly Volume</p>
                  <p className="text-xl font-bold text-indigo-300 font-mono">{simMetrics.volume.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Gross Total Profit</p>
                  <p className="text-xl font-bold text-amber-400 font-mono">₹{simMetrics.totalProfit.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE STAGE ────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress and Level Bar */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase bg-slate-800 text-indigo-300 border border-slate-700">
                Competency: {currentChallengeObj.competencyLevel}
              </span>
            </div>

            <div className="w-full sm:w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                animate={{
                  width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-all duration-300 ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-rose-900/50 shadow-lg'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white leading-relaxed">
              {currentChallengeObj.question}
            </p>

            {/* MCQ / Classify / Distinguish / Match */}
            {(currentChallengeObj.type === 'classify' ||
              currentChallengeObj.type === 'distinguish' ||
              currentChallengeObj.type === 'match') &&
              currentChallengeObj.options && (
                <div className="grid grid-cols-1 gap-3 pt-5">
                  {currentChallengeObj.options.map((opt, i) => {
                    const isCorrect = i === currentChallengeObj.correctIndex;
                    let btnClass = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200';
                    if (showExplanation) {
                      if (isCorrect) btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                      else btnClass = 'bg-slate-900 border-slate-800 text-slate-500 opacity-60';
                    }

                    return (
                      <motion.button
                        key={i}
                        animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={wrongShake ? { duration: 0.4 } : {}}
                        whileHover={{ scale: showExplanation ? 1 : 1.01 }}
                        whileTap={{ scale: showExplanation ? 1 : 0.99 }}
                        onClick={() => !showExplanation && handleAnswer(i)}
                        disabled={showExplanation || answerRevealed}
                        aria-label={`Option ${i + 1}: ${opt}`}
                        className={`w-full text-left p-4 rounded-xl border text-sm font-medium flex items-start gap-3 transition-all ${btnClass}`}
                      >
                        <span className="font-bold text-xs px-2 py-1 bg-slate-950 rounded-lg text-slate-400">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {showExplanation && isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                      </motion.button>
                    );
                  })}
                </div>
              )}

            {/* Drag-Label Type Challenge */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl text-xs font-bold text-white cursor-grab shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'role_supplier', title: '1. Raw Material Supplier Role' },
                    { id: 'role_creditor', title: '2. Working Capital Creditor Role' },
                    { id: 'role_govt', title: '3. Tax & Regulatory Govt Authority' },
                    { id: 'role_society', title: '4. Local Society & Community Role' },
                  ].map((slot) => (
                    <div
                      key={slot.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 text-xs min-h-[70px] flex flex-col justify-between"
                    >
                      <span className="text-slate-400 font-bold">{slot.title}</span>
                      <p className="text-amber-300 font-semibold pt-1">
                        {droppedLabels[slot.id] ? `✓ ${droppedLabels[slot.id]}` : '[Drop label here]'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type Challenge */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into chronological sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === currentChallengeObj.sortItems.length
                    ? sortArrangement.map((idx) => currentChallengeObj.sortItems![idx])
                    : currentChallengeObj.sortItems
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
                      className="p-3 bg-slate-950 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-1 bg-slate-800 rounded font-bold text-indigo-400">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Type Challenge */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 outline-none"
                  />
                  <span className="text-xs font-bold text-slate-400">{currentChallengeObj.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type Challenge */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-400">{currentChallengeObj.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-indigo-300 rounded-xl font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2">
                  {constructParts.map((p, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 bg-indigo-950 text-indigo-200 border border-indigo-700 rounded-lg text-xs flex items-center gap-2"
                    >
                      <span>{p}</span>
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click parts above to construct the bundle.</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Constructed Offering
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-600/70 rounded-2xl space-y-4"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <span>💡</span> Step-by-Step Commercial Explanation
                </h4>

                <div className="space-y-2">
                  {currentChallengeObj.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-2">{idx + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {revealedSteps <
                    currentChallengeObj.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Insight →
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 ml-auto"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Review →' : 'Next Challenge →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION MASTERY & REFLECTION ─────────────────────── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-black text-white">Commercial Studies Mastered!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have completed all competency challenges covering Stakeholders, Internal vs External classifications, statutory expectations, Marketing funnels, Product-Service matrices, and the Cost-Demand-Competition triangle!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              <div className="px-5 py-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Final Precision Score</p>
                <p className="text-2xl font-black text-emerald-400 font-mono">
                  {Math.max(0, 100 - errors * 4)}%
                </p>
              </div>
              <div className="px-5 py-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">BKT Knowledge State</p>
                <p className="text-2xl font-black text-indigo-300 capitalize font-mono">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-emerald-950/50 rounded-2xl border border-emerald-700/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
              Performance Feedback
            </h3>
            <p className="text-xs md:text-sm text-emerald-200">
              {errors === 0
                ? 'PERFECT SCORE! Flawless conceptual precision across all 10 ICSE Commercial Studies nodes!'
                : errors <= 3
                ? 'Great work! You have developed strong analytical and application competencies.'
                : errors <= 7
                ? 'Good effort! Every mistake resolved has deepened your commercial intuition.'
                : 'Do not give up — You WILL get this! Re-explore the visual simulation labs and review the core misconceptions below.'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && misconceptions && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Identified Misconception Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Schedule */}
          <div className="p-5 bg-indigo-950/50 rounded-2xl border border-indigo-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Spaced Repetition Review Schedule (SM-2 Algorithm)
            </h3>
            <p className="text-xs text-slate-300">
              Based on your response precision, this topic is scheduled for review in{' '}
              <strong className="text-amber-400">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              . Returning on schedule guarantees long-term retention for the ICSE Board Examinations!
            </p>
          </div>

          {/* Real-World Activity Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Level Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_CommercialStudiesMeaningStakeholderSim;
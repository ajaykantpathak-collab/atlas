'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// ─── NODE IDENTIFIERS ───
const NODE_C12_COMM_041 = 'c12_comm_041';
const NODE_C12_COMM_042 = 'c12_comm_042';
const NODE_C12_COMM_043 = 'c12_comm_043';
const NODE_C12_COMM_044 = 'c12_comm_044';
const NODE_C12_COMM_045 = 'c12_comm_045';
const NODE_C12_COMM_046 = 'c12_comm_046';
const NODE_C12_COMM_047 = 'c12_comm_047';
const NODE_C12_COMM_048 = 'c12_comm_048';
const NODE_C12_COMM_049 = 'c12_comm_049';
const NODE_C12_COMM_050 = 'c12_comm_050';

const ALL_NODE_IDS = [
  NODE_C12_COMM_041,
  NODE_C12_COMM_042,
  NODE_C12_COMM_043,
  NODE_C12_COMM_044,
  NODE_C12_COMM_045,
  NODE_C12_COMM_046,
  NODE_C12_COMM_047,
  NODE_C12_COMM_048,
  NODE_C12_COMM_049,
  NODE_C12_COMM_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Bharat Mart Launchpad: From Kirana to National FMCG Giant',
  intro: 'You are appointed Chief Marketing Officer (CMO) for "Bharat Foods & Care Ltd." Your task is to launch an indigenous FMCG line (herbal tea, smart sanitiser dispenser, luxury natural soap) across India. You must navigate market types, marketing concepts, full product-price-place-promotion mix decisions, and regulatory statutes (Legal Metrology Act, DPCO, CPA 2019, Trade Marks Act 1999).',
  context: 'Balance consumer satisfaction, cost-efficiency, distributor margins, and legal compliance across physical and digital markets to achieve ₹100 Crore turnover.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you want to launch a new organic tea brand across India, which action should come FIRST according to the Modern Marketing Concept?',
  options: [
    'Manufacture 50,000 packs in the factory and hire salespeople to push them to retailers',
    'Conduct marketing research on Indian tea consumption habits and urban health preferences',
    'Run full-page advertisements in national newspapers to create immediate hype',
    'Offer buy-one-get-one free discounts at all metro supermarkets immediately'
  ],
  correctIndex: 1,
  hintAfter: 'Remember: The Modern Marketing Concept starts with customer needs BEFORE production, whereas the selling concept starts at the factory!',
};

// ─── REAL WORLD ACTIVITY SPECIFICATION ───
const REAL_WORLD_ACTIVITY = {
  title: 'Real-World Field Project: FMCG Brand Marketing Audit & Strategy Blueprint',
  description: 'Apply your 4 Ps marketing mastery to audit a real Indian consumer product (such as Amul Butter, Tata Tea, Dabur Chyawanprash, or Patanjali Dant Kanti) and formulate an upgraded commercial strategy for both rural and digital retail.',
  steps: [
    'Step 1: Product & Label Audit — Inspect a physical pack at a local kirana or modern supermarket. Verify all 6 mandatory statutory disclosures under Legal Metrology Act 2009 & FSSAI (Net Quantity, MRP incl. taxes, Mfg/Expiry, Batch, FSSAI logo & address).',
    'Step 2: Price Elasticity & Channel Margins Analysis — Record the printed MRP and actual selling price at three different touchpoints (Local Kirana, Supermarket, and Quick-Commerce/Blinkit/Zepto). Calculate the retailer margin percentage.',
    'Step 3: Distribution Hierarchy Mapping — Trace whether the brand uses a 1-level, 2-level, or 3-level channel (C&F Agent → Wholesaler / Distributor → Kirana → Consumer) to reach tier-3 and rural villages.',
    'Step 4: Integrated Promotion Assessment — Identify current active campaigns across mass media (TV/IPL ads), consumer sales promotions (discounts/coupons), trade promotions, and public relations.',
    'Step 5: Executive Strategy Brief — Draft a concise 1-page CMO strategy blueprint proposing how the brand can leverage the ONDC network to lower channel costs while increasing direct rural reach.'
  ]
};

// ─── INTERFACES ───
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
  bloomLevel?: string;
}

export interface Props {
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
  nodeId: NODE_C12_COMM_041,
  title: 'Markets, Marketing Concepts & Marketing Mix (4 Ps)',
  definition: 'Comprehensive marketing encompasses market classification, customer-oriented marketing philosophies, 8 core marketing functions, and the 4 Ps marketing mix: Product (goods vs services, branding, packaging, labelling), Price (pricing factors and strategies), Place (channels of distribution and physical logistics), and Promotion (advertising, sales promotion, personal selling, public relations).',
  eli5: 'Think of marketing as preparing a grand community feast. First, you discover what guests love to eat (research), prepare the right dish and pack it neatly (product), charge a fair fee (price), bring it to their dining table efficiently (place), and inform everyone with a warm invitation (promotion).',
  misconceptions: [
    {
      misconception: 'A market is always a physical bazaar or shop.',
      correction: 'A market is the aggregate network of actual/potential buyers and sellers and their exchange relationship, physical or digital (e.g., Amazon, ONDC).'
    },
    {
      misconception: 'Marketing and advertising/selling are identical.',
      correction: 'Selling and advertising are small subsets of promotion. Marketing begins before production (research) and continues after sale (after-sales service).'
    },
    {
      misconception: 'MRP (Maximum Retail Price) is the fixed transaction price.',
      correction: 'MRP under the Legal Metrology Act 2009 is a legal ceiling. Retailers can sell below MRP (discounts) but never above it.'
    },
    {
      misconception: 'Services can be inventoried and stored just like physical goods.',
      correction: 'Services are perishable (IHIP: Intangible, Heterogeneous, Inseparable, Perishable); an empty flight seat or doctor slot is lost forever once time passes.'
    },
    {
      misconception: 'Price skimming and penetration pricing are the same as regular discounts.',
      correction: 'Skimming starts high to capture early adopters then lowers price; penetration starts low to gain mass market share and raises later.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is a market in modern commercial terms?', options: ['A concrete bazaar building', 'Set of actual and potential buyers and sellers', 'A wholesale mandi only', 'A stock exchange exclusively'], correctIndex: 1 },
    { question: 'Which concept starts with existing products and uses aggressive push selling?', options: ['Marketing Concept', 'Societal Marketing Concept', 'Selling Concept', 'Production Concept'], correctIndex: 2 },
    { question: 'Which marketing function is governed by the Agricultural Produce (Grading and Marking) Act, 1937?', options: ['Branding', 'Standardisation and Grading (AGMARK)', 'Pricing', 'Promotion'], correctIndex: 1 },
    { question: 'Which feature of services means production and consumption happen simultaneously?', options: ['Perishability', 'Intangibility', 'Inseparability', 'Heterogeneity'], correctIndex: 2 },
    { question: 'Under the Trade Marks Act 1999, what converts a brand into a trademark?', options: ['Printing on package', 'Legal registration', 'High sales volume', 'Celebrity endorsement'], correctIndex: 1 },
    { question: 'Which pricing strategy starts with a high initial price to extract consumer surplus from early adopters?', options: ['Penetration', 'Price Skimming', 'Cost-Plus', 'Competitive'], correctIndex: 1 },
    { question: 'What is the channel level for: Producer -> Wholesaler -> Retailer -> Consumer?', options: ['Zero-level', 'One-level', 'Two-level', 'Three-level'], correctIndex: 2 },
    { question: 'Which promotion element involves face-to-face, two-way communication to close sales?', options: ['Advertising', 'Public Relations', 'Personal Selling', 'Sales Promotion'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery across all 10 nodes: market classification, modern marketing philosophy, 8 marketing functions, goods vs services, branding/packaging/labelling, price determination, 5 pricing strategies, channels of distribution, 4 physical distribution elements, and 4 promotion mix elements.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Step 1: Market Typology & Mediums (c12_comm_041)',
    instruction: 'Select a market type (Consumer, Industrial, Reseller, Digital/ONDC) to observe buyer traits, transaction volumes, and strategy requirements.',
    interactionType: 'click-market',
    nodeId: NODE_C12_COMM_041,
  },
  {
    title: 'Step 2: Marketing Philosophies & Evolution (c12_comm_042 & 043)',
    instruction: 'Toggle between Product, Selling, Modern Marketing, and Societal Marketing philosophies to see their starting points and outcomes.',
    interactionType: 'toggle-philosophy',
    nodeId: NODE_C12_COMM_042,
  },
  {
    title: 'Step 3: Product Mix: Goods vs Services & 3 Layers (c12_comm_044 & 045)',
    instruction: 'Inspect product attributes (IHIP service features vs Tangible Goods) and explore the 3 packaging and branding layers.',
    interactionType: 'product-builder',
    nodeId: NODE_C12_COMM_044,
  },
  {
    title: 'Step 4: Price Mix & Strategy Dynamics (c12_comm_046 & 047)',
    instruction: 'Slide the Price and Strategy sliders (Skimming, Penetration, Cost-Plus) to see revenue curves and market adoption in real-time.',
    interactionType: 'price-sim',
    nodeId: NODE_C12_COMM_047,
  },
  {
    title: 'Step 5: Place & Promotion Mix Integrator (c12_comm_048 - 050)',
    instruction: 'Configure distribution channels (0-3 level), balance logistics trade-offs (Warehousing vs Transport), and allocate the Promotion Budget.',
    interactionType: 'place-promo-sim',
    nodeId: NODE_C12_COMM_050,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Bharat Foods uses Price Skimming (₹800/kg) for its new Organic Kashmiri Saffron Tea instead of Penetration (₹199/kg), what will happen to initial sales volume and unit margins?',
    options: [
      'High sales volume with low unit margins from day one',
      'Lower sales volume with very high unit margins capturing early adopter surplus',
      'Zero sales volume and immediate brand bankruptcy',
      'Identical sales volume to mass-market tea brands'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now open the Price Mix simulator below and drag the strategy slider to "Price Skimming" to verify unit profit vs volume!',
    nodeId: NODE_C12_COMM_047,
  },
  {
    question: 'Predict: What happens if Bharat Foods replaces 5 regional warehouses with a single centralised warehouse in Nagpur for its daily-consumed convenience goods?',
    options: [
      'Warehousing cost falls, but transport cost and delivery lead times to remote states increase significantly',
      'Both warehousing costs and transport costs decrease to zero',
      'Transport speed increases by 400% across all 19,000 pin codes',
      'Retailers in Assam and Kerala will receive goods within 2 hours without extra freight'
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Warehousing slider in the Physical Distribution lab to observe the total cost trade-off!',
    nodeId: NODE_C12_COMM_049,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Pricing Simulator, what happens to unit profit when you switch from Cost-Plus (15% markup on ₹100 cost) to Value-Based Pricing for a unique patented herbal tonic?',
    observableOptions: [
      'Unit profit stays locked at ₹15 regardless of customer perceived value',
      'Unit profit expands significantly because price is anchored to customer willingness-to-pay (₹350) rather than manufacturing cost',
      'Total revenue collapses to zero',
      'Cost of production automatically doubles'
    ],
    correctIndex: 1,
    nodeId: NODE_C12_COMM_047,
  },
  {
    question: 'In the Promotion Allocation tool, what pattern emerges when you shift 80% budget to Personal Selling for a ₹20 mass-market detergent?',
    observableOptions: [
      'Customer acquisition cost skyrockets because personal selling has an extremely high cost per contact unsuitable for low-margin FMCG',
      'Personal selling reaches 100 million households cheaper than a TV commercial',
      'Personal selling requires zero salesforce commission',
      'Brand awareness triples instantly across rural India'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_COMM_050,
  },
];

// ─── 24 RICH CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION (8 Challenges)
  {
    id: 'c12_ch_001',
    nodeId: NODE_C12_COMM_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Hindustan Unilever (HUL) sells Surf Excel to millions of households, while buying soda ash from Tata Chemicals in bulk. Which market type describes the soda ash transaction?',
    options: ['Consumer Market', 'Industrial (B2B) Market', 'Reseller Market', 'Local Municipal Market'],
    correctIndex: 1,
    explanation: 'The soda ash purchase is an Industrial (B2B) market transaction because HUL is a business buyer using the chemical as a raw material input to manufacture detergents.',
    hints: [
      'Ask: Who is the buyer and what will they do with the product?',
      'Households buying detergent = consumer market; a factory buying raw materials = industrial market.',
      'Tata Chemicals selling to manufacturer HUL is an industrial (business) transaction.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c12_ch_002',
    nodeId: NODE_C12_COMM_042,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which marketing philosophy starts at the factory, focuses on existing inventory, and relies on heavy promotion to maximise sales volume?',
    options: ['Modern Marketing Concept', 'Production Concept', 'Selling Concept', 'Societal Marketing Concept'],
    correctIndex: 2,
    explanation: 'The Selling Concept starts with factory output and attempts to push existing products onto consumers through aggressive selling and advertising.',
    hints: [
      'Recall the sequence: Factory -> Existing Product -> Pushing/Selling -> Profit via volume.',
      'Modern marketing starts with consumer research; this concept starts with existing factory stock.',
      'The "push" philosophy that treats customers as passive targets is the Selling Concept.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c12_ch_003',
    nodeId: NODE_C12_COMM_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Organic spices sold in India carry the AGMARK Grade-1 seal. Which marketing function and statute are involved?',
    options: [
      'Pricing under Essential Commodities Act 1955',
      'Standardisation and Grading under Agricultural Produce (Grading and Marking) Act, 1937',
      'Branding under Trade Marks Act 1999',
      'Advertising under Cable Television Networks Rules 1994'
    ],
    correctIndex: 1,
    explanation: 'AGMARK represents Standardisation and Grading, administered by the Directorate of Marketing and Inspection (DMI) under the Agricultural Produce (Grading and Marking) Act, 1937.',
    hints: [
      'AGMARK stands for Agricultural Marking.',
      'It certifies product grade, purity, and uniformity for agricultural goods.',
      'The governing statute is the Agricultural Produce (Grading and Marking) Act, 1937.'
    ],
  },
  {
    id: 'c12_ch_004',
    nodeId: NODE_C12_COMM_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An unbooked seat on an IndiGo flight from Delhi to Mumbai at 6:00 AM cannot be stored or sold once the plane departs. Which service characteristic does this illustrate?',
    options: ['Intangibility', 'Inseparability', 'Heterogeneity', 'Perishability'],
    correctIndex: 3,
    explanation: 'Perishability (the "P" in IHIP) means services cannot be warehoused or inventoried for future sale; unutilised service capacity is revenue lost permanently.',
    hints: [
      'Think about what happens to an empty flight seat or vacant hotel room after departure time.',
      'Unlike a packet of biscuits that stays on a shelf, unused service capacity expires immediately.',
      'This feature is Perishability.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c12_ch_005',
    nodeId: NODE_C12_COMM_045,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What turns an ordinary commercial brand name like "Amul" or "Tata" into a legally enforceable Trademark?',
    options: [
      'Designing an attractive logo',
      'Formal registration under the Trade Marks Act, 1999',
      'Achieving ₹1,000 Crore annual sales turnover',
      'Printing the brand name on secondary packaging'
    ],
    correctIndex: 1,
    explanation: 'A brand becomes a Trademark when registered under Section 2(1)(zb) of the Trade Marks Act, 1999 with the Trade Marks Registry, conferring exclusive legal rights to sue infringers.',
    hints: [
      'A brand is an identifier; a trademark has statutory backing.',
      'Which central legislation protects brand names against copycats in India?',
      'Registration under the Trade Marks Act, 1999 provides legal exclusivity.'
    ],
  },
  {
    id: 'c12_ch_006',
    nodeId: NODE_C12_COMM_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A shopkeeper sells a bottle of hand sanitiser with MRP ₹150 at ₹135 after offering a festive discount. Is this lawful under the Legal Metrology Act 2009?',
    options: [
      'No, because products must strictly be sold at exactly the printed MRP',
      'Yes, because MRP is a legal ceiling price; selling below MRP is lawful, but selling above is an offence',
      'No, discounts require prior permission from the Central Consumer Protection Authority',
      'Yes, only if the buyer produces a government ration card'
    ],
    correctIndex: 1,
    explanation: 'Under Section 18 of the Legal Metrology Act 2009 read with the Packaged Commodities Rules 2011, MRP is the Maximum Retail Price. Selling below MRP is lawful; charging above MRP is an offence under Section 36.',
    hints: [
      'What does the "M" in MRP stand for?',
      'MRP is a maximum ceiling, not a mandatory fixed price.',
      'Discounts below MRP are legitimate commercial decisions.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c12_ch_007',
    nodeId: NODE_C12_COMM_048,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Identify the channel of distribution level for: Amul Ice Cream Plant -> Village Parlour Retailer -> Consumer.',
    options: ['Zero-level (Direct)', 'One-level channel', 'Two-level channel', 'Three-level channel'],
    correctIndex: 1,
    explanation: 'Channel level counts the number of intermediaries between producer and consumer. Here, there is only one intermediary (the retailer), making it a One-level channel.',
    hints: [
      'Count ONLY the intermediaries between producer and consumer.',
      'Producer (Amul) -> 1 intermediary (Retailer) -> Consumer.',
      'One intermediary = One-level channel.'
    ],
  },
  {
    id: 'c12_ch_008',
    nodeId: NODE_C12_COMM_050,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the promotion element: Cadbury airing its iconic "Kuch Khaas Hai" 30-second television spot during the IPL.',
    options: ['Personal Selling', 'Public Relations', 'Advertising', 'Trade Sales Promotion'],
    correctIndex: 2,
    explanation: 'Advertising is a paid, non-personal mass communication transmitted through mass media by an identified sponsor.',
    hints: [
      'Is the message one-to-one (personal) or broadcast to millions (mass)?',
      'It is paid media time with an identified sponsor.',
      'Broadcast television commercials are Advertising.'
    ],
  },

  // ── STANDARD (8 Challenges)
  {
    id: 'c12_ch_009',
    nodeId: NODE_C12_COMM_041,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag each market structure to its correct Indian operational example.',
    dragItems: [
      { label: 'Consumer Market', targetId: 'target_consumer' },
      { label: 'Industrial Market', targetId: 'target_industrial' },
      { label: 'Reseller Market', targetId: 'target_reseller' },
      { label: 'Digital Open Network', targetId: 'target_digital' }
    ],
    correctMapping: {
      target_consumer: 'Consumer Market',
      target_industrial: 'Industrial Market',
      target_reseller: 'Reseller Market',
      target_digital: 'Digital Open Network'
    },
    explanation: 'Indian households buying FMCG = Consumer; Maruti buying steel from Tata Steel = Industrial; Kirana buying wholesale = Reseller; ONDC protocol = Digital Open Network.',
    hints: [
      'Match end-consumers to Consumer Market, factory inputs to Industrial Market.',
      'Wholesale intermediaries buying for resale belong to Reseller Market.',
      'ONDC represents the Digital Open Network initiative.'
    ],
  },
  {
    id: 'c12_ch_010',
    nodeId: NODE_C12_COMM_042,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In 2008, Tata Motors launched the Nano as "The ₹1 Lakh Car" with brilliant low-cost engineering, yet sales failed because buyers felt socially stigmatised. Which marketing philosophy pitfall did this reflect?',
    options: [
      'Societal Marketing failure due to excessive environmental concerns',
      'Product Concept failure — engineering a product first without researching consumer psychological & status needs',
      'Holistic Marketing failure in logistics and warehousing',
      'Selling Concept success because heavy television ads were run'
    ],
    correctIndex: 1,
    explanation: 'The Tata Nano was a classic Product Concept failure: focusing solely on engineering a low-cost product without researching consumer psychological needs (status, aspirational value).',
    hints: [
      'The engineering was innovative, but did consumers want to be seen in the "cheapest" car?',
      'Focusing on the product itself rather than consumer desires is the hallmark of the Product Concept.',
      'Customer orientation was missing.'
    ],
  },
  {
    id: 'c12_ch_011',
    nodeId: NODE_C12_COMM_044,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the 4 stages of the consumer goods classification spectrum in order of increasing shopping effort and brand insistence (Lowest effort to Highest brand insistence).',
    sortItems: [
      'Convenience Goods (e.g. Parle-G, Salt)',
      'Shopping Goods (e.g. Samsung Smartphone, Refrigerator)',
      'Specialty Goods (e.g. Royal Enfield Classic 350, Rolex)',
      'Unsought Goods (e.g. Life Insurance, Disaster kits)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Convenience goods require minimum routine effort; shopping goods involve feature/price comparison; specialty goods command intense brand insistence; unsought goods require awareness creation.',
    hints: [
      'Start with everyday routine items bought without much thought.',
      'Follow with items where you compare specs across stores.',
      'End with items where you insist on one specific brand or need active persuasion.'
    ],
  },
  {
    id: 'c12_ch_012',
    nodeId: NODE_C12_COMM_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The National Pharmaceutical Pricing Authority (NPPA) under DPCO 2013 fixes the maximum ceiling price of Paracetamol 500mg tablets at ₹1.18 per 10 tablets. Which pricing determinant is dominant?',
    options: ['Product Manufacturing Cost', 'Competitor Brand Positioning', 'Government Regulation (External Factor)', 'Elasticity of Consumer Demand'],
    correctIndex: 2,
    explanation: 'In scheduled pharmaceuticals, Government Regulation via DPCO 2013 under the Essential Commodities Act 1955 legally caps prices, overriding manufacturing cost and market demand.',
    hints: [
      'Is the price set by corporate accountants, consumer willingness, or the government?',
      'NPPA is a statutory pricing authority.',
      'Government regulation is an external binding factor.'
    ],
  },
  {
    id: 'c12_ch_013',
    nodeId: NODE_C12_COMM_047,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When Xiaomi entered the Indian smartphone market in 2014, it priced the Redmi 1S at ₹5,999 (almost half of comparable Samsung models) to capture 23% market share rapidly. Which pricing strategy was this?',
    options: ['Price Skimming', 'Cost-Plus Markup Pricing', 'Penetration Pricing', 'Value-Based Prestige Pricing'],
    correctIndex: 2,
    explanation: 'Penetration pricing sets an aggressive low initial price to capture mass market share quickly in price-elastic markets, establishing scale before expanding product lines.',
    hints: [
      'Did Xiaomi start high or deliberately low to grab market share?',
      'Starting low to penetrate deep into the mass market is Penetration Pricing.',
      'Apple uses skimming; Xiaomi famously used penetration.'
    ],
  },
  {
    id: 'c12_ch_014',
    nodeId: NODE_C12_COMM_048,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Under Section 182 of the Indian Contract Act 1872, how does a Clearing & Forwarding (C&F) Agent differ legally and commercially from a Wholesaler?',
    options: [
      'A C&F agent takes ownership title of goods and earns profit margin, whereas a wholesaler earns only commission',
      'A C&F agent acts on behalf of the principal without taking title of goods (earning commission), while a wholesaler buys goods outright (taking title) and earns resale margins',
      'Both have identical legal titles and functions under the Sales of Goods Act 1930',
      'Wholesalers are illegal in interstate commerce under GST 2017'
    ],
    correctIndex: 1,
    explanation: 'An Agent represents the principal without taking title to goods (earning commission), whereas a Wholesaler purchases title to goods and earns a commercial profit margin upon resale.',
    hints: [
      'Who actually OWNS the goods while sitting in the warehouse?',
      'If the intermediary pays and takes ownership title, they are a wholesaler.',
      'If they hold stock on behalf of the company for a commission, they are an agent.'
    ],
  },
  {
    id: 'c12_ch_015',
    nodeId: NODE_C12_COMM_049,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Bharat Foods sells 50,000 cartons/year. Option A (1 central depot in Nagpur) costs ₹2,00,000 in rent + ₹6/carton in freight. Option B (4 regional depots) costs ₹6,00,000 in rent + ₹2/carton in freight. What is the total annual cost difference between Option A and Option B in Rupees? (Calculate Cost B - Cost A)',
    correctAnswer: 200000,
    tolerance: 1000,
    unit: '₹',
    explanation: 'Option A: ₹2,00,000 + (50,000 × ₹6) = ₹5,00,000. Option B: ₹6,00,000 + (50,000 × ₹2) = ₹7,00,000. Difference = ₹7,00,000 - ₹5,00,000 = ₹2,00,000.',
    hints: [
      'Calculate Total Cost A = Warehouse Rent A + (50,000 × ₹6).',
      'Calculate Total Cost B = Warehouse Rent B + (50,000 × ₹2).',
      'Cost A = ₹5,00,000; Cost B = ₹7,00,000. Find the difference.'
    ],
  },
  {
    id: 'c12_ch_016',
    nodeId: NODE_C12_COMM_050,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why did Eureka Forbes deploy 60,000+ door-to-door sales representatives for Aquaguard water purifiers in 1982 instead of relying on TV advertising?',
    options: [
      'Because television advertising was completely banned in India in 1982',
      'Water purifiers were a novel, complex, high-involvement product requiring live demonstration, customer education, and immediate objection handling',
      'Personal selling is cheaper per thousand contacts than mass print media',
      'Door-to-door salesmen are exempt from CPA 2019 regulations'
    ],
    correctIndex: 1,
    explanation: 'Novel, high-involvement products with technological scepticism require personal selling to provide live demonstrations, answer questions, and build immediate trust.',
    hints: [
      'Did Indian families in 1982 already understand ultraviolet water purification?',
      'New high-involvement appliances require live demonstration and two-way interaction.',
      'Personal selling excels at demonstration and objection handling.'
    ],
  },

  // ── ADVANCED (8 Challenges)
  {
    id: 'c12_ch_017',
    nodeId: NODE_C12_COMM_042,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'HUL rebranded "Fair & Lovely" to "Glow & Lovely" in 2020 after severe public criticism regarding colourism and artificial anxiety creation. Which marketing orientation mandates balancing customer desires, company profit, AND long-term societal well-being?',
    options: ['Holistic Production Concept', 'Selling Concept', 'Societal Marketing Concept', 'Cost-Plus Philosophy'],
    correctIndex: 2,
    explanation: 'The Societal Marketing Concept requires businesses to satisfy consumer needs and generate profits while preserving or enhancing long-term individual and social welfare.',
    hints: [
      'This concept adds ethical responsibility and social welfare to marketing.',
      'It prevents manipulative advertising that harms societal values.',
      'It is the Societal Marketing Concept.'
    ],
  },
  {
    id: 'c12_ch_018',
    nodeId: NODE_C12_COMM_043,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the 8 core Marketing Functions in their correct logical operational sequence from pre-production to post-sale.',
    sortItems: [
      '1. Marketing Research (Needs Identification)',
      '2. Product Planning & Development',
      '3. Standardisation, Grading, Packaging & Labelling',
      '4. Branding & Pricing',
      '5. Promotion & Distribution Channels',
      '6. After-Sales Customer Service & Feedback'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'Marketing begins with Research, moves to Product Design, Quality Grading & Packaging, Pricing & Branding, Promotion/Distribution, and closes with After-Sales Service.',
    hints: [
      'Research always comes first before any product is manufactured.',
      'Design, grading, and packaging precede market launch and pricing.',
      'After-sales service and feedback form the final loop feeding back to research.'
    ],
  },
  {
    id: 'c12_ch_019',
    nodeId: NODE_C12_COMM_045,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the mandatory label components for a pre-packaged Ayurvedic food product as prescribed under the Legal Metrology Act 2009 and FSSAI Regulations 2011.',
    availableParts: [
      'Brand Name',
      'Net Quantity',
      'Maximum Retail Price (MRP incl. of all taxes)',
      'Date of Manufacture & Best Before Date',
      'Manufacturer Name & Complete Address',
      'FSSAI License Logo & Number',
      'Promoter Personal Phone Number'
    ],
    targetState: 'Brand Name Net Quantity Maximum Retail Price (MRP incl. of all taxes) Date of Manufacture & Best Before Date Manufacturer Name & Complete Address FSSAI License Logo & Number',
    validationHint: 'Add all mandatory statutory elements under Legal Metrology & FSSAI (exclude personal non-statutory items like promoter phone).',
    explanation: 'Mandatory label elements include Brand Name, Net Quantity, MRP (all taxes incl.), Mfg/Expiry Dates, Full Manufacturer Address, and FSSAI License credentials.',
    hints: [
      'Include all consumer protection and legal compliance requirements.',
      'Do not include private personal phone numbers.',
      'Select the 6 statutory components and click Check.'
    ],
  },
  {
    id: 'c12_ch_020',
    nodeId: NODE_C12_COMM_047,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under Section 4 of the Competition Act 2002, when does aggressive Penetration Pricing become illegal "Predatory Pricing" investigated by the Competition Commission of India (CCI)?',
    options: [
      'Whenever any discount exceeds 10% of MRP',
      'When a dominant enterprise prices below its average variable cost with the deliberate anti-competitive intent to eliminate market rivals',
      'Whenever a firm advertises on national television during prime time',
      'When goods are sold through direct zero-level channels without wholesale intermediaries'
    ],
    correctIndex: 1,
    explanation: 'Predatory Pricing under Section 4 of Competition Act 2002 requires a dominant enterprise to sell below average variable cost with intent to eliminate competitors and abuse market dominance.',
    hints: [
      'Look for the legal definition involving cost thresholds and anti-competitive intent.',
      'Pricing below average variable cost by a dominant player to kill rivals is predatory.',
      'The Competition Commission of India (CCI) enforces this standard.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'c12_ch_021',
    nodeId: NODE_C12_COMM_048,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'HUL deployed the "Project Shakti" model, empowering over 1,60,000 rural women micro-entrepreneurs. How does this modify the conventional Place Mix in remote Indian villages?',
    options: [
      'It completely eliminates all manufacturing plants in India',
      'It bridges the last-mile distribution gap where traditional 2-level wholesale networks cannot operate economically, combining commercial reach with rural empowerment',
      'It violates the Indian Contract Act 1872 by avoiding registered wholesalers',
      'It forces villagers to buy goods exclusively through international credit cards'
    ],
    correctIndex: 1,
    explanation: 'Project Shakti creates a dedicated rural micro-distribution channel, allowing HUL to penetrate inaccessible villages while generating sustainable rural livelihoods.',
    hints: [
      'How do you deliver low-margin soap to a village of 400 people without a paved road?',
      'Local micro-distributors overcome geographic dispersion.',
      'It extends the Place Mix through community-based distribution.'
    ],
  },
  {
    id: 'c12_ch_022',
    nodeId: NODE_C12_COMM_049,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Maruti Suzuki operates a Just-in-Time (JIT) inventory model at its Manesar plant, holding only 4 hours of component stock with 400+ suppliers located within a 100km radius. What is the fundamental operational trade-off of this system?',
    options: [
      'High storage warehouse rent is traded for zero transport liability',
      'Holding cost and capital lock-in are minimised to near zero, but vulnerability to supply disruptions or logistics delays is extremely high',
      'Total product quality decreases by 50%',
      'The company is exempt from paying GST on vehicle dispatches'
    ],
    correctIndex: 1,
    explanation: 'JIT achieves extreme capital efficiency by eliminating warehousing and holding costs, but requires near-perfect vendor reliability since any transit delay halts the entire assembly line.',
    hints: [
      'What happens if a single truck carrying brake pads is delayed in traffic for 5 hours?',
      'Low inventory cost vs high disruption risk.',
      'Holding cost is minimised, but system fragility increases.'
    ],
  },
  {
    id: 'c12_ch_023',
    nodeId: NODE_C12_COMM_050,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under the Consumer Protection Act 2019 (Section 2(28)) and ASCI guidelines, what legal risk do celebrity brand endorsers face for misleading advertisements?',
    options: [
      'Celebrity endorsers have absolute statutory immunity from all consumer claims',
      'Endorsers can be fined up to ₹50 Lakh and barred from making any endorsement for up to 3 years if due diligence on claims was not performed',
      'Only the printer of the newspaper advertisement is held criminally liable',
      'Celebrities are required to pay 100% of the firm’s annual corporate tax'
    ],
    correctIndex: 1,
    explanation: 'Under CPA 2019, celebrity endorsers who endorse misleading advertisements without due diligence face fines up to ₹10 Lakh (first offence) to ₹50 Lakh, plus endorsement bans up to 3 years.',
    hints: [
      'CPA 2019 introduced direct liability for celebrity endorsements.',
      'Can celebrities claim they just read the script without verifying claims?',
      'Penalties include hefty fines up to ₹50 Lakh and endorsement bans.'
    ],
  },
  {
    id: 'c12_ch_024',
    nodeId: NODE_C12_COMM_050,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When the Tata Group donated ₹1,500 Crore during COVID-19 and received extensive front-page editorial coverage in national dailies, which promotional tool was demonstrated, and what is its defining characteristic?',
    options: [
      'Sales Promotion — because it offered an immediate cash discount to citizens',
      'Public Relations / Publicity — unpaid, third-party media coverage generating long-term corporate goodwill and trust',
      'Direct Personal Selling — closing deals with hospital administrators',
      'Surrogate Commercial Advertising — promoting automobile engines covertly'
    ],
    correctIndex: 1,
    explanation: 'PR and Publicity generate unpaid, credible third-party editorial coverage that builds brand equity, stakeholder goodwill, and institutional trust.',
    hints: [
      'Did Tata pay newspapers for ad space, or was it editorial news coverage?',
      'Unpaid news coverage of goodwill initiatives is Publicity/PR.',
      'It builds long-term goodwill rather than pushing immediate product sales.'
    ],
  },
];

// ─── MAIN COMPONENT ───
export function C12_CommerceMarketsMeaningTypesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_COMM_041,
  title = DEFAULT_PROPS.title || 'Markets, Marketing Concepts & 4 Ps',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['commerce'] || { name: 'Commerce', emoji: '📦', color: 'amber' };

  // ─── PHASE FLOW ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [selectedMarketTab, setSelectedMarketTab] = useState<'consumer' | 'industrial' | 'reseller' | 'digital'>('consumer');
  const [selectedPhilosophy, setSelectedPhilosophy] = useState<'product' | 'selling' | 'marketing' | 'societal'>('marketing');

  // Product mix interactive states
  const [selectedProductType, setSelectedProductType] = useState<'good' | 'service'>('good');
  const [selectedPackagingType, setSelectedPackagingType] = useState<'primary' | 'secondary' | 'transport'>('primary');

  // Pricing interactive states
  const [baseCost, setBaseCost] = useState(120);
  const [markupPercent, setMarkupPercent] = useState(25);
  const [pricingStrategy, setPricingStrategy] = useState<'costplus' | 'skimming' | 'penetration' | 'valuebased'>('costplus');
  const [perceivedValue, setPerceivedValue] = useState(300);

  // Place & logistics interactive states
  const [warehouseCount, setWarehouseCount] = useState(3);
  const [annualShipments] = useState(40000);
  const [channelChoice, setChannelChoice] = useState<'zero' | 'one' | 'two' | 'three'>('two');

  // Promotion interactive budget states
  const [adBudget, setAdBudget] = useState(40);
  const [personalSellingBudget, setPersonalSellingBudget] = useState(30);
  const [prBudget, setPrBudget] = useState(10);

  // ─── CHALLENGE & ADAPTIVITY STATES ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [selectedWrongOptionIdx, setSelectedWrongOptionIdx] = useState<number | null>(null);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Construction
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryIdx, setSelectedDiscoveryIdx] = useState<number | null>(null);

  // Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

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

  // ─── LOAD INITIAL MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── COMPUTED PRICING METRICS ───
  const computedPrice = useMemo(() => {
    if (pricingStrategy === 'costplus') {
      return baseCost * (1 + markupPercent / 100);
    }
    if (pricingStrategy === 'skimming') {
      return baseCost * 2.5;
    }
    if (pricingStrategy === 'penetration') {
      return baseCost * 1.05;
    }
    return perceivedValue * 0.85;
  }, [baseCost, markupPercent, pricingStrategy, perceivedValue]);

  // ─── COMPUTED LOGISTICS COSTS ───
  const logisticsCostData = useMemo(() => {
    const warehouseRent = warehouseCount * 120000;
    const transportPerUnit = Math.max(2, 14 - warehouseCount * 2.2);
    const totalTransport = annualShipments * transportPerUnit;
    const totalCost = warehouseRent + totalTransport;
    const leadTimeDays = Math.max(1, 6 - warehouseCount);

    return {
      warehouseRent,
      totalTransport,
      totalCost,
      leadTimeDays,
      transportPerUnit
    };
  }, [warehouseCount, annualShipments]);

  // ─── RECHARTS DATA FOR PRICING CURVE ───
  const priceChartData = useMemo(() => {
    return [
      { name: 'Cost Floor', value: baseCost },
      { name: 'Cost-Plus', value: Math.round(baseCost * 1.25) },
      { name: 'Penetration', value: Math.round(baseCost * 1.05) },
      { name: 'Selected Strategy', value: Math.round(computedPrice) },
      { name: 'Skimming Launch', value: Math.round(baseCost * 2.5) },
      { name: 'Perceived Ceiling', value: perceivedValue },
    ];
  }, [baseCost, computedPrice, perceivedValue]);

  // ─── CANVAS ANIMATION (Logistics & Market Flow) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let offset = 0;

    const render = () => {
      offset += 1.2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Animated supply line packets
      const nodes = [
        { x: 50, y: 35, label: 'Factory' },
        { x: 160, y: 35, label: 'Depot (CWC)' },
        { x: 270, y: 35, label: 'Wholesale' },
        { x: 380, y: 35, label: 'Kirana' },
        { x: 480, y: 35, label: 'Consumer' },
      ];

      // Draw connecting path
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);
      ctx.lineDashOffset = -offset;
      ctx.beginPath();
      ctx.moveTo(50, 35);
      ctx.lineTo(480, 35);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw nodes
      nodes.forEach((n, idx) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = idx === 0 ? '#10b981' : idx === nodes.length - 1 ? '#f59e0b' : '#6366f1';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + 26);
      });

      // Flowing trucks/cargo indicator
      const cargoX = 50 + (offset % 430);
      ctx.beginPath();
      ctx.arc(cargoX, 35, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CALLBACKS ───
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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    setSelectedDiscoveryIdx(selectedIndex);
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent! Modern marketing starts with customer needs, before production.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the 5 foundational pillars of marketing and the 4 Ps.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Bharat Mart Sandbox. Manipulate product, price, logistics, and promotion variables freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Time for board-level challenges. Apply your marketing mastery to real Indian scenarios!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulator to verify your hypothesis.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered ISC Class 12 Markets, Marketing Concepts, and the complete 4 Ps Mix.');
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
    setSelectedWrongOptionIdx(null);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
      if (!isCorrect && typeof answer === 'number') {
        setSelectedWrongOptionIdx(answer);
      }
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
      setSelectedWrongOptionIdx(null);
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! That is the correct commercial reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => {
        setWrongShake(false);
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
        speechManager.speak('Let us study the complete step-by-step reasoning.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('tap');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 ? (challenge.sortItems ? challenge.sortItems.map((_, i) => i) : []) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('tap');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('tap');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans min-h-[850px] flex flex-col justify-between">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl" aria-hidden="true">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">ISC Class 12 • Commerce</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">10 Core Nodes</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Dynamic Mode / Mastery Badges */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">Mastery Level</p>
            <p className="text-sm font-bold text-indigo-400 capitalize">{masteryLevel}</p>
          </div>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-600'
                : 'bg-amber-950/60 text-amber-400 border-amber-600'
            }`}
          >
            {difficulty} Tier
          </motion.span>
        </div>
      </motion.div>

      {/* ─── MAIN CONTENT PHASES ─── */}
      <div className="flex-1">
        {/* ─── 1. DISCOVERY PHASE ─── */}
        {phase === 'discovery' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-600/40 rounded-2xl">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-2">
                <span>🎯 Commercial Scenario Case</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-3">{SCENARIO.intro}</p>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-amber-300">
                📌 <strong>Decision Mandate:</strong> {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Curiosity Question */}
            <div className="p-6 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase">Curiosity Hook</span>
                <span className="text-xs text-slate-400">Test your business instincts before we dive in</span>
              </div>
              <h3 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => {
                  const isSelected = selectedDiscoveryIdx === idx;
                  const isCorrectOpt = idx === DISCOVERY_QUESTION.correctIndex;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={discoveryAnswered && isSelected && !isCorrectOpt ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleDiscoveryAnswer(idx)}
                      disabled={discoveryAnswered}
                      aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                      className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        discoveryAnswered
                          ? isCorrectOpt
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : isSelected
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-500'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-amber-500/60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
                          {discoveryAnswered ? (isCorrectOpt ? '✓' : isSelected ? '✗' : String.fromCharCode(65 + idx)) : String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-700 space-y-4">
                  <div className={`p-4 rounded-xl border ${discoveryCorrect ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300' : 'bg-amber-950/40 border-amber-600 text-amber-300'} text-sm`}>
                    {discoveryCorrect
                      ? '✓ Brilliant! Modern marketing is customer-centric: research needs first, create the right product, then deliver satisfaction.'
                      : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Interactive Marketing Labs"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold rounded-xl text-base shadow-lg shadow-amber-500/20"
                  >
                    Enter Interactive Marketing Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── 2. EXPLORATION PHASE (BRILLIANT-STYLE INTERACTIVE LABS) ─── */}
        {phase === 'explore' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between bg-slate-800/60 px-4 py-2.5 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Interactive Concept Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <div className="flex gap-1.5" role="tablist" aria-label="Exploration steps">
                {EXPLORATION_STEPS.map((_, i) => (
                  <div
                    key={i}
                    role="tab"
                    aria-selected={i === currentSlide}
                    aria-label={`Lab step ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700'}`}
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
                className="p-5 md:p-6 bg-slate-800/90 border border-slate-700 rounded-2xl space-y-5"
              >
                <div>
                  <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-amber-400 text-sm mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>

                {/* SLIDE 0: MARKETS MEANING & TYPES LAB (WITH SVG 1: 4 Ps Core Architecture) */}
                {currentSlide === 0 && (
                  <div className="space-y-4">
                    {/* SVG DIAGRAM 1: The 4 Ps Marketing Mix Architecture */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        📐 Figure 1.1: The 4 Ps Marketing Mix Architecture Surrounding Customer Target Market
                      </span>
                      <svg viewBox="0 0 600 240" className="w-full max-w-lg h-auto" aria-label="4 Ps Marketing Mix Diagram" role="img">
                        <defs>
                          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
                          </radialGradient>
                          <linearGradient id="pGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.6" />
                          </linearGradient>
                          <linearGradient id="pGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#047857" stopOpacity="0.6" />
                          </linearGradient>
                          <linearGradient id="pGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.6" />
                          </linearGradient>
                          <linearGradient id="pGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#be185d" stopOpacity="0.6" />
                          </linearGradient>
                        </defs>

                        {/* Orbit Circles */}
                        <circle cx="300" cy="120" r="95" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

                        {/* 4 Quadrant Pillars */}
                        {/* 1. Product (Top Left) */}
                        <g transform="translate(140, 45)">
                          <rect x="0" y="0" width="120" height="55" rx="8" fill="url(#pGrad1)" stroke="#60a5fa" strokeWidth="1.5" />
                          <text x="60" y="22" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1. PRODUCT</text>
                          <text x="60" y="38" fill="#dbeafe" fontSize="8.5" textAnchor="middle">Goods, Quality, Brand,</text>
                          <text x="60" y="48" fill="#dbeafe" fontSize="8.5" textAnchor="middle">Packaging & Label</text>
                        </g>

                        {/* 2. Price (Top Right) */}
                        <g transform="translate(340, 45)">
                          <rect x="0" y="0" width="120" height="55" rx="8" fill="url(#pGrad2)" stroke="#34d399" strokeWidth="1.5" />
                          <text x="60" y="22" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2. PRICE</text>
                          <text x="60" y="38" fill="#d1fae5" fontSize="8.5" textAnchor="middle">Cost-plus, Skimming,</text>
                          <text x="60" y="48" fill="#d1fae5" fontSize="8.5" textAnchor="middle">Penetration, MRP</text>
                        </g>

                        {/* 3. Place (Bottom Left) */}
                        <g transform="translate(140, 140)">
                          <rect x="0" y="0" width="120" height="55" rx="8" fill="url(#pGrad3)" stroke="#a78bfa" strokeWidth="1.5" />
                          <text x="60" y="22" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3. PLACE</text>
                          <text x="60" y="38" fill="#ede9fe" fontSize="8.5" textAnchor="middle">Channels (0-3),</text>
                          <text x="60" y="48" fill="#ede9fe" fontSize="8.5" textAnchor="middle">Logistics & Warehousing</text>
                        </g>

                        {/* 4. Promotion (Bottom Right) */}
                        <g transform="translate(340, 140)">
                          <rect x="0" y="0" width="120" height="55" rx="8" fill="url(#pGrad4)" stroke="#f472b6" strokeWidth="1.5" />
                          <text x="60" y="22" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4. PROMOTION</text>
                          <text x="60" y="38" fill="#fce7f3" fontSize="8.5" textAnchor="middle">Ads, Personal Selling,</text>
                          <text x="60" y="48" fill="#fce7f3" fontSize="8.5" textAnchor="middle">Sales Promo & PR</text>
                        </g>

                        {/* Center Target Market */}
                        <circle cx="300" cy="120" r="38" fill="url(#centerGrad)" stroke="#fbbf24" strokeWidth="2" />
                        <text x="300" y="116" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">TARGET</text>
                        <text x="300" y="129" fill="#fef3c7" fontSize="9" fontWeight="bold" textAnchor="middle">CONSUMER</text>
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'consumer', label: '1. Consumer Market', icon: '🛒' },
                        { id: 'industrial', label: '2. Industrial (B2B)', icon: '🏭' },
                        { id: 'reseller', label: '3. Reseller Market', icon: '🏪' },
                        { id: 'digital', label: '4. Digital / ONDC', icon: '🌐' }
                      ].map(t => (
                        <motion.button
                          key={t.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setSelectedMarketTab(t.id as any);
                            audioManager.play('tap');
                          }}
                          aria-label={`Select market tab ${t.label}`}
                          className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                            selectedMarketTab === t.id
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                              : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          <div className="text-base mb-1" aria-hidden="true">{t.icon}</div>
                          {t.label}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[160px]">
                      {selectedMarketTab === 'consumer' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-sm font-bold text-amber-400">✓ Consumer Market (End-Users)</span>
                            <span className="text-xs text-slate-400">Standardised • Emotional • Small Quantities</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Millions of households buying goods (Surf Excel, Maggi, Tea) for personal consumption. Features many small buyers, mass advertising, brand loyalty, and short sales cycles.
                          </p>
                          <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                            <strong>Indian Example:</strong> HUL selling Dove soap or Tata Consumer Products selling Tata Tea to 100+ million families.
                          </div>
                        </motion.div>
                      )}

                      {selectedMarketTab === 'industrial' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-sm font-bold text-indigo-400">✓ Industrial / B2B Market</span>
                            <span className="text-xs text-slate-400">Fewer Buyers • Large Volume • Rational Specs</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Organisations buying goods as inputs for production or business operations. Involves negotiated formal contracts, technical quality parameters, and professional purchasing committees.
                          </p>
                          <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                            <strong>Indian Example:</strong> Maruti Suzuki procuring automotive steel sheets from Tata Steel; HUL purchasing raw soda ash from Tata Chemicals.
                          </div>
                        </motion.div>
                      )}

                      {selectedMarketTab === 'reseller' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-sm font-bold text-emerald-400">✓ Reseller Market (Trade Intermediaries)</span>
                            <span className="text-xs text-slate-400">Wholesalers & Retailers • Profit Margins</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Intermediaries who buy finished NEW goods not to consume them, but to resell at a margin. Acts as the commercial bridge linking manufacturers to consumer households.
                          </p>
                          <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                            <strong>Indian Example:</strong> Reliance Retail or 9 million neighbourhood Kirana stores purchasing biscuit cartons from Britannia distributors.
                          </div>
                        </motion.div>
                      )}

                      {selectedMarketTab === 'digital' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-sm font-bold text-cyan-400">✓ Digital Markets & ONDC Network</span>
                            <span className="text-xs text-slate-400">Zero Physical Boundary • Open Protocols</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Transactions conducted online. ONDC (Open Network for Digital Commerce, launched 2022) democratises digital trade by allowing any buyer app (Paytm) to transact with any seller app (SellerApp) without platform monopoly.
                          </p>
                          <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                            <strong>Institutional Significance:</strong> Prevents gatekeeping by giant platforms and protects local Indian kirana merchants.
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* SLIDE 1: MARKETING CONCEPTS EVOLUTION */}
                {currentSlide === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'product', label: 'Product Concept' },
                        { id: 'selling', label: 'Selling Concept' },
                        { id: 'marketing', label: 'Modern Marketing' },
                        { id: 'societal', label: 'Societal Marketing' }
                      ].map(p => (
                        <motion.button
                          key={p.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedPhilosophy(p.id as any);
                            audioManager.play('tap');
                          }}
                          aria-label={`Select philosophy ${p.label}`}
                          className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                            selectedPhilosophy === p.id
                              ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                              : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          {p.label}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="space-y-2 text-xs flex-1">
                          <p className="text-slate-400">
                            <strong className="text-white">Starting Point:</strong>{' '}
                            {selectedPhilosophy === 'product' && 'The Factory (Product Engineering)'}
                            {selectedPhilosophy === 'selling' && 'The Factory (Existing Output)'}
                            {selectedPhilosophy === 'marketing' && 'The Market (Customer Needs Research)'}
                            {selectedPhilosophy === 'societal' && 'The Society & Market (Needs + Long-term Welfare)'}
                          </p>
                          <p className="text-slate-400">
                            <strong className="text-white">Primary Means:</strong>{' '}
                            {selectedPhilosophy === 'product' && 'Continuous Product Improvements'}
                            {selectedPhilosophy === 'selling' && 'Aggressive Selling, Pushing & Advertising'}
                            {selectedPhilosophy === 'marketing' && 'Integrated Marketing across all 4 Ps'}
                            {selectedPhilosophy === 'societal' && 'Ethical Integrated Marketing & Sustainable Practices'}
                          </p>
                          <p className="text-slate-400">
                            <strong className="text-white">Ends / Goal:</strong>{' '}
                            {selectedPhilosophy === 'product' && 'Profit through product superiority (Risk: Tata Nano)'}
                            {selectedPhilosophy === 'selling' && 'Profit through sales volume push'}
                            {selectedPhilosophy === 'marketing' && 'Profit through customer satisfaction (Amul, Maruti)'}
                            {selectedPhilosophy === 'societal' && 'Profit through sustainable customer & societal well-being'}
                          </p>
                        </div>

                        {/* Interactive flow diagram */}
                        <div className="w-full md:w-64 p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center text-center">
                          <span className="text-xs text-amber-400 font-bold uppercase mb-1">Philosophy Sequence</span>
                          <div className="text-xs text-slate-200 bg-slate-800 p-2 rounded-lg w-full mb-1">
                            {selectedPhilosophy === 'product' && 'Factory ➔ Quality Spec ➔ Sell'}
                            {selectedPhilosophy === 'selling' && 'Factory ➔ Existing Stock ➔ Heavy Ads ➔ Push'}
                            {selectedPhilosophy === 'marketing' && 'Consumer Need ➔ Design ➔ Satisfaction ➔ Repeat Profit'}
                            {selectedPhilosophy === 'societal' && 'Public Need + Ethics ➔ Green Design ➔ Social Value ➔ Profit'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 2: PRODUCT MIX LAB (WITH SVG 2: Packaging Layers & Label Standards) */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    {/* SVG DIAGRAM 2: Product Packaging Hierarchy */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        📐 Figure 1.2: The Three Packaging Layers & Legal Labelling Hierarchy
                      </span>
                      <svg viewBox="0 0 600 200" className="w-full max-w-lg h-auto" aria-label="3 Layers of Packaging and Labelling Diagram" role="img">
                        <defs>
                          <linearGradient id="packGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#065f46" stopOpacity="0.8" />
                          </linearGradient>
                          <linearGradient id="packGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
                          </linearGradient>
                          <linearGradient id="packGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#92400e" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>

                        {/* Layer 1: Primary */}
                        <g transform="translate(30, 20)">
                          <rect x="0" y="0" width="160" height="150" rx="10" fill="url(#packGrad1)" stroke="#34d399" strokeWidth="1.5" />
                          <circle cx="80" cy="55" r="28" fill="#10b981" stroke="#a7f3d0" strokeWidth="1.5" />
                          <text x="80" y="52" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">CORE</text>
                          <text x="80" y="63" fill="#ffffff" fontSize="8" textAnchor="middle">GOOD</text>
                          <text x="80" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1. PRIMARY PACK</text>
                          <text x="80" y="122" fill="#d1fae5" fontSize="8.5" textAnchor="middle">Direct Contact</text>
                          <text x="80" y="134" fill="#d1fae5" fontSize="8" textAnchor="middle">(Tube / Foil / Bottle)</text>
                        </g>

                        {/* Arrow 1 to 2 */}
                        <path d="M 200 95 L 225 95" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                        <polygon points="225,95 218,91 218,99" fill="#94a3b8" />

                        {/* Layer 2: Secondary */}
                        <g transform="translate(235, 20)">
                          <rect x="0" y="0" width="160" height="150" rx="10" fill="url(#packGrad2)" stroke="#60a5fa" strokeWidth="1.5" />
                          <rect x="25" y="25" width="110" height="55" rx="6" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" />
                          <text x="80" y="44" fill="#60a5fa" fontSize="8" fontWeight="bold" textAnchor="middle">LEGAL METROLOGY</text>
                          <text x="80" y="56" fill="#bfdbfe" fontSize="7.5" textAnchor="middle">MRP, Mfg Date, FSSAI</text>
                          <text x="80" y="67" fill="#bfdbfe" fontSize="7.5" textAnchor="middle">Net Qty & Brand Mark</text>
                          <text x="80" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2. SECONDARY PACK</text>
                          <text x="80" y="122" fill="#dbeafe" fontSize="8.5" textAnchor="middle">Shelf Appeal & Protection</text>
                          <text x="80" y="134" fill="#dbeafe" fontSize="8" textAnchor="middle">(Printed Outer Carton)</text>
                        </g>

                        {/* Arrow 2 to 3 */}
                        <polygon points="430,95 423,91 423,99" fill="#94a3b8" />
                        <line x1="405" y1="95" x2="430" y2="95" stroke="#94a3b8" strokeWidth="2" />

                        {/* Layer 3: Transport */}
                        <g transform="translate(440, 20)">
                          <rect x="0" y="0" width="140" height="150" rx="10" fill="url(#packGrad3)" stroke="#fbbf24" strokeWidth="1.5" />
                          <rect x="20" y="25" width="100" height="55" rx="4" fill="#78350f" stroke="#fde68a" strokeWidth="1" />
                          <text x="70" y="50" fill="#fde68a" fontSize="8.5" fontWeight="bold" textAnchor="middle">📦 BULK BOX</text>
                          <text x="70" y="64" fill="#fef3c7" fontSize="7.5" textAnchor="middle">24 Units Corrugated</text>
                          <text x="70" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3. TRANSPORT</text>
                          <text x="70" y="122" fill="#fef3c7" fontSize="8.5" textAnchor="middle">Logistics & Transit</text>
                          <text x="70" y="134" fill="#fef3c7" fontSize="8" textAnchor="middle">(Corrugated Master)</text>
                        </g>
                      </svg>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedProductType('good')}
                        aria-label="Select Tangible Good"
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                          selectedProductType === 'good' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        📦 Tangible Good (e.g. Herbal Soap)
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedProductType('service')}
                        aria-label="Select Intangible Service"
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                          selectedProductType === 'service' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        ⚡ Intangible Service (e.g. Wellness Spa / Flight)
                      </motion.button>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      {selectedProductType === 'good' ? (
                        <div className="space-y-3">
                          <span className="text-xs font-bold text-amber-400">Three Packaging & Labelling Layers:</span>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() => setSelectedPackagingType('primary')}
                              aria-label="Inspect Primary packaging"
                              className={`p-2 rounded-lg text-xs font-medium border ${selectedPackagingType === 'primary' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-slate-800 bg-slate-900 text-slate-400'}`}
                            >
                              1. Primary (Foil/Pouch)
                            </button>
                            <button
                              onClick={() => setSelectedPackagingType('secondary')}
                              aria-label="Inspect Secondary packaging"
                              className={`p-2 rounded-lg text-xs font-medium border ${selectedPackagingType === 'secondary' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-slate-800 bg-slate-900 text-slate-400'}`}
                            >
                              2. Secondary (Printed Box)
                            </button>
                            <button
                              onClick={() => setSelectedPackagingType('transport')}
                              aria-label="Inspect Transport packaging"
                              className={`p-2 rounded-lg text-xs font-medium border ${selectedPackagingType === 'transport' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-slate-800 bg-slate-900 text-slate-400'}`}
                            >
                              3. Transportation (Carton)
                            </button>
                          </div>
                          <p className="text-xs text-slate-300">
                            {selectedPackagingType === 'primary' && 'Primary Packaging: In direct physical contact with product (e.g., Amul foil butter wrapper, Frooti Tetra Pak). Protects against contamination.'}
                            {selectedPackagingType === 'secondary' && 'Secondary Packaging: Outer branded carton protecting primary pack and providing shelf appeal and Legal Metrology label space.'}
                            {selectedPackagingType === 'transport' && 'Transportation Packaging: Bulk corrugated boxes for warehouse storage and truck transport.'}
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                          {[
                            { code: 'I', title: 'Intangibility', desc: 'Cannot be seen/touched before purchase' },
                            { code: 'H', title: 'Heterogeneity', desc: 'Service quality varies by person/day' },
                            { code: 'I', title: 'Inseparability', desc: 'Produced & consumed simultaneously' },
                            { code: 'P', title: 'Perishability', desc: 'Cannot be stored for future resale' },
                          ].map(item => (
                            <div key={item.title} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                              <div className="text-base font-black text-indigo-400">{item.code}</div>
                              <div className="text-xs font-bold text-white mt-0.5">{item.title}</div>
                              <div className="text-[10px] text-slate-400 mt-1">{item.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SLIDE 3: PRICE MIX SIMULATOR */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    {/* Prediction check */}
                    {!predictionMade && (
                      <div className="p-3 bg-amber-950/40 border border-amber-600/50 rounded-xl space-y-2">
                        <span className="text-xs font-bold text-amber-300">🎯 Predict-Then-Check (Brilliant Pattern)</span>
                        <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handlePrediction(i)}
                              aria-label={`Prediction option ${i + 1}: ${opt}`}
                              className="text-left p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs text-slate-300"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {predictionMade && (
                      <div className="p-2.5 bg-emerald-950/40 border border-emerald-600/50 rounded-xl text-xs text-emerald-300">
                        ✓ Prediction recorded! Drag the Base Cost and Strategy selectors below to inspect price formation.
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Base Unit Cost:</span>
                            <span className="font-bold text-white">₹{baseCost}</span>
                          </div>
                          <input
                            type="range"
                            min={40}
                            max={300}
                            value={baseCost}
                            onChange={e => setBaseCost(Number(e.target.value))}
                            aria-label="Base unit manufacturing cost slider"
                            className="w-full accent-amber-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Customer Perceived Value:</span>
                            <span className="font-bold text-cyan-400">₹{perceivedValue}</span>
                          </div>
                          <input
                            type="range"
                            min={150}
                            max={600}
                            value={perceivedValue}
                            onChange={e => setPerceivedValue(Number(e.target.value))}
                            aria-label="Customer perceived value slider"
                            className="w-full accent-cyan-500"
                          />
                        </div>

                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                          <span className="text-slate-400">Effective Selling Price:</span>
                          <span className="text-lg font-black text-amber-400">₹{Math.round(computedPrice)}</span>
                        </div>
                      </div>

                      {/* Real-time Recharts Chart */}
                      <div className="h-44 bg-slate-950 p-2 rounded-xl border border-slate-800">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={priceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} />
                            <YAxis stroke="#94a3b8" fontSize={9} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                            <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]}>
                              {priceChartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={index === 3 ? '#10b981' : '#6366f1'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 4: PLACE & PROMOTION MIX LAB (WITH SVG 3: Channel Levels 0 to 3) */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    {/* SVG DIAGRAM 3: Channels of Distribution Structure */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        📐 Figure 1.3: Channels of Distribution Hierarchy (0-Level to 3-Level Channel Structure)
                      </span>
                      <svg viewBox="0 0 620 180" className="w-full max-w-lg h-auto" aria-label="Channels of Distribution Diagram" role="img">
                        <defs>
                          <linearGradient id="chNodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1e293b" />
                            <stop offset="100%" stopColor="#0f172a" />
                          </linearGradient>
                        </defs>

                        {/* Level 0: Direct */}
                        <g transform="translate(10, 15)">
                          <text x="0" y="16" fill="#f59e0b" fontSize="9.5" fontWeight="bold">0-Level (Direct D2C):</text>
                          <rect x="130" y="3" width="90" height="22" rx="4" fill="#065f46" stroke="#10b981" strokeWidth="1" />
                          <text x="175" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Manufacturer</text>
                          <line x1="225" y1="14" x2="495" y2="14" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                          <polygon points="495,14 489,11 489,17" fill="#64748b" />
                          <rect x="500" y="3" width="90" height="22" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                          <text x="545" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Consumer</text>
                        </g>

                        {/* Level 1: 1 Intermediary */}
                        <g transform="translate(10, 55)">
                          <text x="0" y="16" fill="#60a5fa" fontSize="9.5" fontWeight="bold">1-Level (Retailer):</text>
                          <rect x="130" y="3" width="90" height="22" rx="4" fill="#065f46" stroke="#10b981" strokeWidth="1" />
                          <text x="175" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Manufacturer</text>
                          <line x1="225" y1="14" x2="310" y2="14" stroke="#64748b" strokeWidth="1.5" />
                          <polygon points="310,14 304,11 304,17" fill="#64748b" />
                          <rect x="315" y="3" width="90" height="22" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
                          <text x="360" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Retailer / Mart</text>
                          <line x1="410" y1="14" x2="495" y2="14" stroke="#64748b" strokeWidth="1.5" />
                          <polygon points="495,14 489,11 489,17" fill="#64748b" />
                          <rect x="500" y="3" width="90" height="22" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                          <text x="545" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Consumer</text>
                        </g>

                        {/* Level 2: 2 Intermediaries */}
                        <g transform="translate(10, 95)">
                          <text x="0" y="16" fill="#a78bfa" fontSize="9.5" fontWeight="bold">2-Level (Traditional):</text>
                          <rect x="130" y="3" width="80" height="22" rx="4" fill="#065f46" stroke="#10b981" strokeWidth="1" />
                          <text x="170" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Producer</text>
                          <line x1="215" y1="14" x2="255" y2="14" stroke="#64748b" strokeWidth="1.5" />
                          <polygon points="255,14 250,11 250,17" fill="#64748b" />
                          <rect x="260" y="3" width="80" height="22" rx="4" fill="#4c1d95" stroke="#8b5cf6" strokeWidth="1" />
                          <text x="300" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Wholesaler</text>
                          <line x1="345" y1="14" x2="385" y2="14" stroke="#64748b" strokeWidth="1.5" />
                          <polygon points="385,14 380,11 380,17" fill="#64748b" />
                          <rect x="390" y="3" width="75" height="22" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
                          <text x="427" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Kirana Store</text>
                          <line x1="470" y1="14" x2="510" y2="14" stroke="#64748b" strokeWidth="1.5" />
                          <polygon points="510,14 505,11 505,17" fill="#64748b" />
                          <rect x="515" y="3" width="75" height="22" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                          <text x="552" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Consumer</text>
                        </g>

                        {/* Level 3: 3 Intermediaries */}
                        <g transform="translate(10, 135)">
                          <text x="0" y="16" fill="#34d399" fontSize="9.5" fontWeight="bold">3-Level (C&F Agent):</text>
                          <rect x="130" y="3" width="65" height="22" rx="4" fill="#065f46" stroke="#10b981" strokeWidth="1" />
                          <text x="162" y="17" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">Producer</text>
                          <line x1="200" y1="14" x2="225" y2="14" stroke="#64748b" strokeWidth="1.5" />
                          <rect x="230" y="3" width="65" height="22" rx="4" fill="#0f766e" stroke="#14b8a6" strokeWidth="1" />
                          <text x="262" y="17" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">C&F Agent</text>
                          <line x1="300" y1="14" x2="325" y2="14" stroke="#64748b" strokeWidth="1.5" />
                          <rect x="330" y="3" width="65" height="22" rx="4" fill="#4c1d95" stroke="#8b5cf6" strokeWidth="1" />
                          <text x="362" y="17" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">Distributor</text>
                          <line x1="400" y1="14" x2="425" y2="14" stroke="#64748b" strokeWidth="1.5" />
                          <rect x="430" y="3" width="65" height="22" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
                          <text x="462" y="17" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">Retailer</text>
                          <line x1="500" y1="14" x2="525" y2="14" stroke="#64748b" strokeWidth="1.5" />
                          <rect x="530" y="3" width="65" height="22" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                          <text x="562" y="17" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">Consumer</text>
                        </g>
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Physical distribution trade-off */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <span className="text-xs font-bold text-cyan-400">Physical Logistics Trade-off (c12_comm_049)</span>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Regional Warehouses:</span>
                            <span className="font-bold text-white">{warehouseCount} Depots</span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={8}
                            value={warehouseCount}
                            onChange={e => setWarehouseCount(Number(e.target.value))}
                            aria-label="Regional warehouse depots count slider"
                            className="w-full accent-cyan-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                            <div className="text-slate-400">Storage Rent:</div>
                            <div className="font-bold text-rose-400">₹{(logisticsCostData.warehouseRent / 100000).toFixed(1)}L</div>
                          </div>
                          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                            <div className="text-slate-400">Freight Transport:</div>
                            <div className="font-bold text-emerald-400">₹{(logisticsCostData.totalTransport / 100000).toFixed(1)}L</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
                          <span className="text-slate-400">Delivery Lead Time:</span>
                          <span className="font-bold text-amber-400">{logisticsCostData.leadTimeDays} Days</span>
                        </div>
                      </div>

                      {/* Promotion mix 4 elements budget */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-amber-400">Promotion Mix Budget % (c12_comm_050)</span>
                        <div className="space-y-2 text-xs">
                          <div>
                            <div className="flex justify-between text-slate-400">
                              <span>Advertising (Mass): {adBudget}%</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={70}
                              value={adBudget}
                              onChange={e => setAdBudget(Number(e.target.value))}
                              aria-label="Advertising budget percentage slider"
                              className="w-full accent-amber-500"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-slate-400">
                              <span>Personal Selling (1-on-1): {personalSellingBudget}%</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={60}
                              value={personalSellingBudget}
                              onChange={e => setPersonalSellingBudget(Number(e.target.value))}
                              aria-label="Personal selling budget percentage slider"
                              className="w-full accent-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                aria-label="Go to previous lab"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 rounded-xl text-xs font-bold border border-slate-700"
              >
                ← Previous Lab
              </motion.button>
              <span className="text-xs text-slate-400">Use labs to discover commercial principles</span>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextSlide}
                  aria-label="Go to next lab"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  aria-label="Open sandbox mode"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-900/40"
                >
                  Open Sandbox Mode →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── 3. SANDBOX FREE-PLAY PHASE ─── */}
        {phase === 'sandbox' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="p-4 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Interactive Sandbox: Bharat Mart Command Center</h3>
                <p className="text-xs text-slate-400">Zero pressure testing environment. Manipulate variables and watch live metrics update.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to challenges"
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-lg"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            {/* Canvas Animated Supply Line */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Physical Distribution Canvas (Rail/Road Flow)</span>
              <canvas ref={canvasRef} width={550} height={75} className="w-full bg-slate-900 rounded-xl" aria-label="Animated supply line distribution stream" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-amber-400">1. Product & Pricing Mix</span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Strategy:</span>
                    <select
                      value={pricingStrategy}
                      onChange={e => setPricingStrategy(e.target.value as any)}
                      aria-label="Select Pricing Strategy"
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-amber-300"
                    >
                      <option value="costplus">Cost-Plus (15%)</option>
                      <option value="skimming">Price Skimming</option>
                      <option value="penetration">Penetration Pricing</option>
                      <option value="valuebased">Value-Based Pricing</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Computed MRP:</span>
                    <span className="font-bold text-white">₹{Math.round(computedPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-cyan-400">2. Place & Distribution</span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Channel Type:</span>
                    <select
                      value={channelChoice}
                      onChange={e => setChannelChoice(e.target.value as any)}
                      aria-label="Select Distribution Channel"
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-cyan-300"
                    >
                      <option value="zero">Zero-Level (D2C Direct)</option>
                      <option value="one">1-Level (Retailer)</option>
                      <option value="two">2-Level (Wholesale+Retail)</option>
                      <option value="three">3-Level (C&F Agent)</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Market Reach:</span>
                    <span className="font-bold text-white">
                      {channelChoice === 'zero' ? 'Selected Metro Flagships' : channelChoice === 'one' ? 'Modern Retail Stores' : '9 Million Kirana Outlets'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-indigo-400">3. Promotion Blend</span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Focus:</span>
                    <span className="font-bold text-indigo-300">
                      {adBudget > personalSellingBudget ? 'Pull Strategy (Mass Ads)' : 'Push Strategy (Direct Salesforce)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">PR Allocation:</span>
                    <span className="font-bold text-emerald-400">₹{(prBudget * 10000).toLocaleString('en-IN')} / Mo</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── 4. CHALLENGE PHASE ─── */}
        {phase === 'challenge' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Progress and status header */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Competency:</span>
                <span className="px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700 font-bold uppercase">
                  {challenge.competencyLevel}
                </span>
              </div>
            </div>

            {/* Motion Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Challenge Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-5 md:p-6 rounded-2xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                  : 'bg-slate-800/90 border-slate-700 text-slate-100'
              }`}
            >
              <h2 className="text-base md:text-lg font-bold text-white mb-4">{challenge.question}</h2>

              {/* MCQ & DISTINGUISH TYPES */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, idx) => {
                    const isSelectedWrong = selectedWrongOptionIdx === idx;
                    const isCorrect = showExplanation && idx === challenge.correctIndex;
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        animate={isSelectedWrong && wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => handleAnswer(idx)}
                        disabled={showExplanation || answerRevealed}
                        aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all ${
                          isCorrect
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : isSelectedWrong
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-amber-400 shrink-0">
                            {isCorrect ? '✓' : isSelectedWrong ? '✗' : String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* DRAG-LABEL TYPE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable item: ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {challenge.dragItems.map((item, idx) => (
                      <div
                        key={idx}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        aria-label={`Drop target for ${item.targetId.replace('target_', '').toUpperCase()}`}
                        className="p-3 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl min-h-[50px] flex items-center justify-between"
                      >
                        <span className="text-xs text-slate-400">Target: {item.targetId.replace('target_', '').toUpperCase()}</span>
                        <span className="text-xs font-bold text-amber-400">{droppedLabels[item.targetId] || '[Drop Here]'}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    aria-label="Submit label matching answer"
                    className="px-5 py-2 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                  >
                    Submit Label Matching
                  </motion.button>
                </div>
              )}

              {/* DRAG-SORT TYPE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag to arrange in correct chronological order:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map(i => challenge.sortItems![i])
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <div
                        key={displayIdx}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => {
                          const from = parseInt(draggedItem || '0');
                          handleSortMove(from, displayIdx);
                        }}
                        className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-2"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    aria-label="Check sequence order"
                    className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
                  >
                    Check Sequence Order
                  </motion.button>
                </div>
              )}

              {/* NUMERIC TYPE */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter calculation"
                      aria-label="Enter numerical calculation result"
                      className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-48"
                    />
                    <span className="text-xs text-slate-400">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation}
                      aria-label="Calculate and verify numeric answer"
                      className="px-5 py-2 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                    >
                      Calculate & Verify
                    </motion.button>
                  </div>
                </div>
              )}

              {/* CONSTRUCT TYPE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, idx) => (
                      <button
                        key={idx}
                        onClick={() => setConstructParts(p => [...p, part])}
                        aria-label={`Add component: ${part}`}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-amber-300 hover:border-amber-500"
                      >
                        + {part}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-indigo-900/60 border border-indigo-600 text-xs text-white flex items-center gap-1">
                        {part}
                        <button
                          onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                          aria-label={`Remove component ${part}`}
                          className="text-rose-400 font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    aria-label="Check label composition"
                    className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                  >
                    Check Label Composition
                  </motion.button>
                </div>
              )}

              {/* Progressive Explanation Reveal */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-amber-950/40 border border-amber-600/60 rounded-xl space-y-3"
                >
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step-by-Step Commercial Explanation:</span>
                  <div className="space-y-1.5 text-xs text-slate-200">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, idx) => (
                        <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                          <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next explanation step"
                      className="px-3 py-1 bg-amber-600 text-slate-950 font-bold rounded-lg text-xs"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to next challenge"
                      className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Marketing Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── 5. COMPLETION PHASE ─── */}
        {phase === 'complete' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
            <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 rounded-3xl text-center space-y-3">
              <span className="text-4xl" aria-hidden="true">🏆</span>
              <h2 className="text-2xl font-black text-white">Simulation Completed Successfully!</h2>
              <p className="text-sm text-slate-300">
                You have steered Bharat Mart through all 10 Commerce Marketing Modules with a final score of:
              </p>
              <div className="text-3xl font-black text-amber-400">
                {Math.max(0, 100 - errors * 4)}% Mastery
              </div>
            </div>

            {/* Motivational Feedback */}
            <div className="p-4 bg-emerald-950/40 border border-emerald-600/50 rounded-2xl text-xs md:text-sm text-emerald-300">
              {errors === 0
                ? '✓ Flawless Mastery! You demonstrated exceptional understanding of marketing philosophies, the complete 4 Ps mix, and Indian regulatory compliance.'
                : errors <= 3
                ? '✓ Outstanding Performance! Strong grasp of commercial strategies. Review the highlighted misconceptions below to achieve 100% precision.'
                : '✓ Good Effort! Marketing requires balancing multiple trade-offs. Review the diagnostic points and spaced review schedule below.'}
            </div>

            {/* Misconception Tracking Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">Identified Misconception Profile:</span>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                        <div className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</div>
                        <div className="text-emerald-300 mt-1">✓ Statutory & Commercial Correction: {m.correction}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spaced Repetition Schedule */}
            <div className="p-4 bg-indigo-950/40 border border-indigo-700/50 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-indigo-300 block">SM-2 Spaced Repetition Schedule</span>
                <span className="text-slate-400">
                  Next review due in <strong className="text-amber-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</strong>.
                </span>
              </div>
              <span className="text-xl" aria-hidden="true">📅</span>
            </div>

            {/* REAL WORLD ACTIVITY WITH STRUCTURED TITLE, DESCRIPTION, AND STEPS */}
            <div className="p-5 bg-slate-800/90 border border-slate-700 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">📋</span>
                <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {REAL_WORLD_ACTIVITY.description}
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-700/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Execution Steps:</span>
                <ul className="space-y-2 text-xs text-slate-200">
                  {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                    <li key={sIdx} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ─── TOAST / BANNER FEEDBACK WRAPPERS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_CommerceMarketsMeaningTypesSim;
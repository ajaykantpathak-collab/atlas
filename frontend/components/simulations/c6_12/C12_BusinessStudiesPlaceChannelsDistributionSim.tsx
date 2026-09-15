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

// ─── NODE ID CONSTANTS (MANDATORY TO DECLARE AS STRING LITERALS) ───────��───────
const NODE_C12_BS_041 = 'c12_bs_041'; // Place Mix — Channels of Distribution & Types
const NODE_C12_BS_042 = 'c12_bs_042'; // Place Mix — Physical Distribution Elements
const NODE_C12_BS_043 = 'c12_bs_043'; // Promotion Mix — Adv, Sales Prom, Personal Selling, PR
const NODE_C12_BS_044 = 'c12_bs_044'; // Digital Marketing, Social Media & Influencer Marketing
const NODE_C12_BS_045 = 'c12_bs_045'; // Product Life Cycle — Stages & Extension Strategies
const NODE_C12_BS_046 = 'c12_bs_046'; // Consumer Protection — Need, Methods & CPA 2019 Rights
const NODE_C12_BS_047 = 'c12_bs_047'; // Redressal Mechanism — District, State, National Commissions
const NODE_C12_BS_048 = 'c12_bs_048'; // CPA 2023 Rules — Misleading Advertisements & Endorser Liability

const ALL_NODE_IDS = [
  NODE_C12_BS_041,
  NODE_C12_BS_042,
  NODE_C12_BS_043,
  NODE_C12_BS_044,
  NODE_C12_BS_045,
  NODE_C12_BS_046,
  NODE_C12_BS_047,
  NODE_C12_BS_048,
];

// ─── NARRATIVE SCENARIO HOOK ──────────────────────────────────────────────────
const SCENARIO = {
  title: 'Bharat Omnichannel & Consumer Trust War',
  intro:
    'You have been appointed Chief Marketing & Compliance Officer of "VedicVibe Naturals" — a fast-growing Indian FMCG challenger brand based in Pune. You are launching Ayurvedic wellness drinks and electronics across kiranas, D2C portals, and modern retail. At the same time, competitor counterfeiters and misleading claim litigations are escalating under CPA 2019/2023.',
  context:
    'Your mission: Architect the optimal multi-tier distribution channels, balance warehouse logistics vs JIT holding costs, deploy a high-ROI promo & digital influencer mix, navigate the Product Life Cycle across 4 product lines, and ensure zero-defect regulatory compliance across the 3-tier consumer redressal commissions.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ─────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question:
    'VedicVibe lists its ₹1,200 Ayurvedic drink on the Amazon India app for express delivery. What channel level is this transaction?',
  options: [
    'Zero-level (Direct) — because the customer buys digitally on an app with no middleman salesman',
    'One-level — Amazon is an online retailer/intermediary holding inventory and processing orders',
    'Two-level — because the internet service provider and Amazon both act as distributors',
    'Three-level — because manufacturer, software platform, logistics rider, and customer are four parties',
  ],
  correctIndex: 1,
  hintAfter:
    "Don't worry! Many confuse digital app purchases with direct channels. Let's explore how counting intermediary firms defines channel levels!",
};

// ─── PLC DATASET FOR VISUALIZATION ─────────────────────────────────────────────
const PLC_DATA = [
  { stage: 'Dev', time: 0, sales: 0, profit: -40, competitors: 0, desc: 'Heavy R&D, Negative ROI' },
  { stage: 'Intro', time: 2, sales: 25, profit: -10, competitors: 1, desc: 'High Promotion, Low Awareness' },
  { stage: 'Growth', time: 5, sales: 90, profit: 55, competitors: 6, desc: 'Rapid Adoption, Scale Economies' },
  { stage: 'Maturity', time: 9, sales: 130, profit: 60, competitors: 15, desc: 'Peak Saturation, Price Defense' },
  { stage: 'Decline', time: 13, sales: 45, profit: 10, competitors: 3, desc: 'Substitutes Enter, Obsolescence' },
  { stage: 'Extension', time: 16, sales: 110, profit: 50, competitors: 8, desc: 'Rejuvenated via Modification' },
];

// ─── CHALLENGE INTERFACE ───────────────────────────────────────────────────────
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

// ─── 24 RICH CHALLENGES (Foundation, Standard, Advanced) ───────────────────────
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_bs_001',
    nodeId: NODE_C12_BS_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Hindustan Unilever moves Lux soap via: HUL Factory → Carrying & Forwarding Agent (CFA) → Redistribution Stockist → Kirana Store Retailer → Consumer. How many channel levels is this?',
    options: ['One-level channel', 'Two-level channel', 'Three-level channel', 'Four-level channel'],
    correctIndex: 2,
    explanation:
      'Channel level is defined by the number of independent intermediary firms between producer and consumer. Here there are 3 intermediaries (CFA, Stockist, Retailer), making it a Three-Level channel.',
    hints: [
      'Count only the intermediary institutions standing between HUL and the final consumer.',
      'Intermediaries: (1) CFA, (2) Redistribution Stockist, (3) Retailer.',
      'Three intermediaries equal a three-level channel. Do not count arrows or endpoints.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bs_002',
    nodeId: NODE_C12_BS_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Maruti Suzuki maintains only 4 hours of assembly components at its Manesar facility using Just-in-Time (JIT) deliveries. Which element of physical distribution is this decision?',
    options: ['Transportation mode selection', 'Warehousing location planning', 'Inventory control (quantity decision)', 'Order processing automation'],
    correctIndex: 2,
    explanation:
      'Inventory control answers "HOW MUCH stock to hold to balance stockouts vs holding costs". Warehousing decides WHERE goods are stored, while inventory control decides the quantity.',
    hints: [
      'Is this deciding the geographical facility location (WHERE) or the volume of components held (HOW MUCH)?',
      'Holding 4 hours of parts minimizes working capital lock-in and storage costs.',
      'Decisions on buffer stock, reorder levels, and JIT quantities represent Inventory Control.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bs_003',
    nodeId: NODE_C12_BS_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Big Bazaar runs its "Sabse Saste 5 Din" offering a 50% discount on cooking oil and advertises it on Star Sports TV. What promotional tool is the 50% discount itself?',
    options: ['Advertising (paid mass communication)', 'Sales Promotion (short-term monetary incentive)', 'Public Relations (unpaid publicity)', 'Personal Selling (oral conversation)'],
    correctIndex: 1,
    explanation:
      'The 50% discount is Sales Promotion (a short-term incentive to accelerate purchase). The TV commercial is merely the medium used to announce that sales promotion offer.',
    hints: [
      'Separate the medium of broadcast from the actual promotional incentive being given.',
      'Discounts, buy-one-get-one, and coupons provide immediate monetary reasons to buy now.',
      'Short-term price reductions are Sales Promotion, even if advertised across national media.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bs_004',
    nodeId: NODE_C12_BS_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Under ASCI Influencer Guidelines 2023 and CPA 2019 rules, what must a social media influencer mandatorily disclose when endorsing a commercial brand?',
    options: [
      'Disclose their personal PAN card and GST registration number in the video',
      'Prominently include disclosure labels such as #ad, #sponsored, or "Paid Partnership"',
      'Give a written affidavit from the Ministry of Corporate Affairs',
      'Offer a 100% money-back guarantee funded by the influencer personally',
    ],
    correctIndex: 1,
    explanation:
      'ASCI Guidelines 2023 mandate clear and prominent disclosure labels (#ad, #collab, #sponsored, Paid Partnership) so consumers know the review is commercially incentivised.',
    hints: [
      'Think about how consumers identify whether a post is an organic opinion or a commercial partnership.',
      'ASCI and CCPA mandate upfront disclosure tags on reels, stories, and videos.',
      'Labels like #ad or #sponsored prevent deceptive native advertising.',
    ],
  },
  {
    id: 'ch_bs_005',
    nodeId: NODE_C12_BS_042,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag each physical distribution function to its core strategic managerial question.',
    dragItems: [
      { label: 'Transportation', targetId: 'slot_how_move' },
      { label: 'Warehousing', targetId: 'slot_where_store' },
      { label: 'Inventory Control', targetId: 'slot_how_much' },
      { label: 'Order Processing', targetId: 'slot_how_track' },
    ],
    correctMapping: {
      slot_how_move: 'Transportation',
      slot_where_store: 'Warehousing',
      slot_how_much: 'Inventory Control',
      slot_how_track: 'Order Processing',
    },
    explanation:
      'Physical distribution aligns all four: Transportation (HOW goods move), Warehousing (WHERE stored), Inventory Control (HOW MUCH held), and Order Processing (HOW orders are captured and fulfilled).',
    hints: [
      'Transportation selects routes and vehicles (road, rail, air).',
      'Warehousing manages depots and fulfilment centres (Bhiwandi, Cold Stores).',
      'Inventory Control calculates reorder quantities and safety buffers.',
    ],
  },
  {
    id: 'ch_bs_006',
    nodeId: NODE_C12_BS_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'In which stage of the Product Life Cycle do sales peak and plateau, competition reaches its highest intensity, and brand defense price wars begin?',
    options: ['Product Development', 'Introduction', 'Growth', 'Maturity'],
    correctIndex: 3,
    explanation:
      'In the Maturity stage, market demand is saturated, sales peak and stabilise, competition is fiercest, and firms defend shelf share through extension strategies and price promotions.',
    hints: [
      'In Introduction sales are tiny; in Growth sales rise rapidly; in Decline sales collapse.',
      'Parle-G and Royal Enfield Classic 350 have stable peak sales with high competitor rivalry.',
      'Peak sales and intense margin defense characterize the Maturity stage.',
    ],
  },
  {
    id: 'ch_bs_007',
    nodeId: NODE_C12_BS_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'FSSAI mandates that all packaged foods in India must clearly print manufacturing date, expiry, net weight, ingredients, and allergen warnings. Which consumer right is enforced?',
    options: ['Right to Safety', 'Right to be Informed', 'Right to Choose', 'Right to Consumer Education'],
    correctIndex: 1,
    explanation:
      'The Right to be Informed guarantees consumers accurate information regarding purity, quantity, potency, date, and price so they can make rational buying choices.',
    hints: [
      'Safety is protection against hazardous goods (e.g. exploding battery).',
      'Printing ingredients, manufacturing dates, and dietary disclosures informs the buyer.',
      'Accurate label disclosure is the bedrock of the Right to be Informed.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_bs_008',
    nodeId: NODE_C12_BS_047,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'Under the revised Consumer Protection Rules 2020 (Rule 21), what is the maximum pecuniary claim limit (in Lakhs of Rupees) that can be filed before the District Commission?',
    correctAnswer: 50,
    tolerance: 0,
    unit: 'Lakhs (₹)',
    explanation:
      'Under Rule 21 of the CPA 2020 Rules, the District Commission hears claims up to ₹50 Lakh. The State Commission hears claims from ₹50 Lakh to ₹2 Crore, and the National Commission hears claims above ₹2 Crore.',
    hints: [
      'Remember the 2020 revision updated the old COPRA limits.',
      'District: up to ₹50 Lakh; State: ₹50L to ₹2 Cr; National: above ₹2 Cr.',
      'Enter 50 as the upper limit in Lakhs.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_bs_009',
    nodeId: NODE_C12_BS_041,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'ITC’s e-Choupal set up internet kiosks in rural Madhya Pradesh allowing soyabean farmers to sell directly to ITC processing plants, bypassing the APMC mandi commission agents (arhatiyas). This collapsed a traditional channel from:',
    options: [
      'A Three-level channel (Farmer → Arhatiya → Wholesaler → Processor) into a Zero-level direct channel',
      'A Zero-level channel into a Two-level channel',
      'A Four-level channel into a Three-level channel',
      'A One-level retailer channel into an Amazon affiliate',
    ],
    correctIndex: 0,
    explanation:
      'Traditional agricultural mandi trade involved arhatiyas (agents) and wholesale stockists (three intermediaries). e-Choupal connected farmer directly to ITC (zero intermediary = zero-level direct channel).',
    hints: [
      'Identify how many middlemen sat between the farm gate and ITC’s factories under the old mandi setup.',
      'Arhatiyas served as agents and mandi traders as wholesalers.',
      'Direct purchase from farmer to processor is a 0-level (direct) channel.',
    ],
  },
  {
    id: 'ch_bs_008b',
    nodeId: NODE_C12_BS_042,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Tata Steel ships heavy steel coils from Jamshedpur to Mumbai. The Dedicated Freight Corridor (DFC) reduces transit time from 72h to 18h. Why will road trucking STILL remain vital?',
    options: [
      'Trucks are legally mandatory under the Motor Vehicles Act 1988 for all metal cargo',
      'Rail provides long-haul terminal-to-terminal transit, but road trucks are indispensable for last-mile delivery to warehouses and job sites',
      'Rail freight cannot operate when ambient temperature exceeds 35°C in Indian summers',
      'Road transport is 5 times cheaper than DFC rail for 2,000 km bulk haulage',
    ],
    correctIndex: 1,
    explanation:
      'Transportation modes are complementary: Rail/DFC provides high-speed, cost-effective long-haul bulk movement, but road transport provides door-to-door flexibility and last-mile connectivity.',
    hints: [
      'Can a freight train pull up directly to the backyard of every distributor and fabricator?',
      'Think about terminal-to-door vs door-to-door transit.',
      'Road transport completes the last-mile leg from railheads to end destinations.',
    ],
  },
  {
    id: 'ch_bs_010',
    nodeId: NODE_C12_BS_047,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange the statutory appeal hierarchy under Section 41 of CPA 2019 in order from the initial trial forum to the apex judicial body.',
    sortItems: [
      'District Consumer Disputes Redressal Commission',
      'State Consumer Disputes Redressal Commission',
      'National Consumer Disputes Redressal Commission (NCDRC)',
      'Supreme Court of India',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Under CPA 2019 Section 41, an appeal strictly follows the hierarchy: District → State (within 30 days) → National (within 30 days) → Supreme Court (within 30 days). No tier can be skipped.',
    hints: [
      'Start with the local district commission representing claims up to ₹50 Lakh.',
      'Next is the state commission, followed by the national commission in New Delhi.',
      'The final court of appeal in India is the Supreme Court.',
    ],
  },
  {
    id: 'ch_bs_011',
    nodeId: NODE_C12_BS_043,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Eureka Forbes sells ₹25,000 Aquaguard RO water purifiers. Why does it rely heavily on Personal Selling (demonstrators visiting homes) rather than just TV ads?',
    options: [
      'TV advertising is prohibited for consumer durables under the Cable TV Networks Act',
      'High-involvement, technical products require custom demonstration, water testing, and two-way objection handling to build buyer trust',
      'Personal selling requires zero marketing expenditure compared to print ads',
      'Kirana stores refuse to stock water purifiers due to weight limits',
    ],
    correctIndex: 1,
    explanation:
      'Complex, high-value, or technical products (water purifiers, insurance, industrial tools) demand personal selling where trained representatives demonstrate features and answer consumer doubts face-to-face.',
    hints: [
      'Does a buyer spend ₹25,000 on a water purifier after merely watching a 10-second TV cartoon?',
      'Personal selling allows live water sample testing and immediate query resolution.',
      'High price and technical complexity elevate the necessity of personal selling.',
    ],
  },
  {
    id: 'ch_bs_012',
    nodeId: NODE_C12_BS_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Mamaearth partners with 100 mommy vloggers on YouTube to review its toxin-free baby shampoo. Which specific hierarchical categorization is accurate?',
    options: [
      'It is Influencer Marketing, which is a sub-element of Social Media Marketing, which is part of Digital Marketing',
      'It is Traditional Advertising because YouTube is viewed on smart TVs',
      'It is Public Relations because vloggers are independent journalists under the Press Council of India',
      'It is Zero-level Personal Selling because the vlogger talks directly to camera',
    ],
    correctIndex: 0,
    explanation:
      'The hierarchy is: Digital Marketing (umbrella) > Social Media Marketing (platforms like YouTube/Instagram) > Influencer Marketing (third-party creators with followings recommending products).',
    hints: [
      'Mommy vloggers have dedicated followings and create authentic-styled reviews.',
      'Social platforms are the medium; influencer collaboration is the specific tactic.',
      'The umbrella is Digital Marketing, nested into SMM, nested into Influencer Marketing.',
    ],
  },
  {
    id: 'ch_bs_013',
    nodeId: NODE_C12_BS_045,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Parle-G was launched in 1939 (over 85 years old) and sells 1 billion packets monthly in 2024. Why is it classified in MATURITY rather than DECLINE?',
    options: [
      'Because all food products are legally prohibited from entering the decline stage',
      'PLC stage is governed by sales and profit trajectory (stable peak volume), NOT the age or launch year of the product',
      'Because Parle-G holds a government patent granting perpetual growth status',
      'Because its price has never changed from ₹5 since 1939',
    ],
    correctIndex: 1,
    explanation:
      'Product Life Cycle stage is dictated entirely by sales volume trajectory. A product with massive, stable, peak demand and intense market saturation is in prolonged Maturity, regardless of its chronological age.',
    hints: [
      'Does age determine the stage, or does the trajectory of sales and revenue?',
      'Are Parle-G sales collapsing or holding steady at peak volume across India?',
      'Stable peak sales = Maturity stage. Old chronological age does not mean decline.',
    ],
  },
  {
    id: 'ch_bs_014',
    nodeId: NODE_C12_BS_048,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question:
      'Under CPA 2019 / 2023 Guidelines, what is the maximum statutory monetary penalty (in Lakhs of ₹) that CCPA can impose on a celebrity endorser for a FIRST offence of misleading endorsement without due diligence?',
    correctAnswer: 10,
    tolerance: 0,
    unit: 'Lakhs (₹)',
    explanation:
      'Under Section 21 of CPA 2019 and the 2023 rules, a celebrity endorser faces up to ₹10 Lakh for a first offence (and up to ₹50 Lakh plus a 1-3 year endorsement ban for subsequent offences). The manufacturer faces up to ₹50 Lakh.',
    hints: [
      'Distinguish between manufacturer liability (up to ₹50L) and celebrity endorser liability.',
      'For a first offence, an endorser can be fined up to ₹10 Lakh.',
      'Enter 10.',
    ],
  },
  {
    id: 'ch_bs_015',
    nodeId: NODE_C12_BS_047,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Assemble the correct sequential steps for a consumer who bought a defective ₹75 Lakh luxury electric SUV in Mumbai with unrectified motor failure.',
    availableParts: [
      'Claim value is ₹75 Lakh (> ₹50L & ≤ ₹2 Cr)',
      'File complaint at State Consumer Disputes Redressal Commission',
      'If aggrieved, appeal within 30 days to National Commission (NCDRC)',
      'File at District Commission because it is an automobile',
    ],
    targetState:
      'Claim value is ₹75 Lakh (> ₹50L & ≤ ₹2 Cr) File complaint at State Consumer Disputes Redressal Commission If aggrieved, appeal within 30 days to National Commission (NCDRC)',
    validationHint:
      'Select the ₹75L claim threshold, followed by the State Commission filing, then the appeal to NCDRC.',
    explanation:
      'Since ₹75 Lakh exceeds ₹50 Lakh but is within ₹2 Crore, original jurisdiction lies with the State Commission. Subsequent appeals go to the National Commission within 30 days.',
    hints: [
      'Rule 21: District is up to ₹50 Lakh; State is ₹50 Lakh to ₹2 Crore.',
      '₹75 Lakh falls into the State Commission tier.',
      'An appeal from the State Commission lies exclusively before the National Commission.',
    ],
  },
  {
    id: 'ch_bs_016',
    nodeId: NODE_C12_BS_048,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A leading pan masala company airs glamorous IPL commercials featuring top Bollywood superstars promoting "Silver Coated Elaichi" with identical brand fonts, logos, and packaging as its tobacco gutkha. Evaluate this under CPA 2023 and COTPA 2003.',
    options: [
      'Completely legal because Elaichi (cardamom) is an edible spice with no tobacco content',
      'It is an illegal Surrogate Advertisement designed to circumvent tobacco advertising bans; CCPA can penalise both the manufacturer (up to ₹50L) and celebrity endorsers (up to ₹10L + ban)',
      'Legal only if the stars donate 25% of their endorsement fees to cancer hospitals',
      'Permissible if telecast after 11 PM under Cable TV Network Rules',
    ],
    correctIndex: 1,
    explanation:
      'Surrogate advertising uses a benign product (elaichi, soda) to promote a restricted brand (tobacco, liquor). CPA 2023 and CCPA guidelines strictly prohibit surrogate ads, making both manufacturer and celebrity endorsers jointly liable.',
    hints: [
      'What is the real underlying product the brand identity is keeping alive in viewers minds?',
      'The law looks at the intent and brand linkage, not just the nominal spice being shown.',
      'Surrogate ads violate CPA 2019/2023 rules and attract joint liability on endorsers.',
    ],
  },
  {
    id: 'ch_bs_017',
    nodeId: NODE_C12_BS_046,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Ramesh, a self-employed tailor, buys a Usha industrial sewing machine for his own shop. Suresh, a wholesale garment factory owner with 200 workers, buys 50 identical Usha sewing machines. Both machines turn out defective. Who is a "Consumer" under Section 2(7) of CPA 2019?',
    options: [
      'Both Ramesh and Suresh are consumers because both paid consideration to Usha',
      'Neither is a consumer because buying machinery always constitutes commercial use',
      'Only Ramesh is a consumer; goods bought exclusively for earning livelihood via self-employment are included, whereas Suresh bought for commercial enterprise/resale',
      'Only Suresh is a consumer because his claim value is higher',
    ],
    correctIndex: 2,
    explanation:
      'Section 2(7) excludes purchases for "commercial purpose", but explicitly carves out an exception: goods purchased exclusively for the purpose of earning a livelihood by means of self-employment are protected.',
    hints: [
      'Check the self-employment livelihood exception in Section 2(7) of CPA 2019.',
      'A solo tailor using a machine to earn his daily bread is protected.',
      'A factory owner buying 50 machines operates a large commercial enterprise outside CPA scope.',
    ],
  },
  {
    id: 'ch_bs_018',
    nodeId: NODE_C12_BS_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Cadbury Dairy Milk noticed growth slowing in the late 2000s. To prevent decline, Cadbury launched "Dairy Milk Silk" (softer formulation for adults) and "Kuch Meetha Ho Jaaye" (festive celebrations). These strategies represent:',
    options: [
      'Liquidation and product harvesting',
      'Product Modification (Silk formulation) and Repositioning (adult celebration occasions) to prolong Maturity',
      'Switching from a 2-level channel to a 0-level direct channel',
      'Surrogate advertising under Cable TV Act',
    ],
    correctIndex: 1,
    explanation:
      'Extension strategies extend the maturity stage. Launching "Silk" is Product Modification (improved recipe/premium tier), while "Kuch Meetha Ho Jaaye" is Repositioning (broadening from kids to adult family celebrations).',
    hints: [
      'How did Cadbury modify the physical chocolate and the emotional buying occasion?',
      'Changing texture/formulation is Product Modification.',
      'Changing target audience from children to adult Diwali gift-givers is Repositioning.',
    ],
  },
  {
    id: 'ch_bs_019',
    nodeId: NODE_C12_BS_048,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Distinguish between the Central Consumer Protection Authority (CCPA) and the Advertising Standards Council of India (ASCI):',
    options: [
      'CCPA is a statutory regulatory body with legal enforcement & penalty powers; ASCI is a voluntary, self-regulatory industry body with no statutory fining power',
      'ASCI is created by Parliament under CPA 2019; CCPA is an NGO funded by advertisers',
      'CCPA only reviews newspaper print ads; ASCI handles all digital and TV commercials',
      'Both have identical powers to order jail terms and seize corporate bank accounts',
    ],
    correctIndex: 0,
    explanation:
      'CCPA was established under Section 10 of CPA 2019 with statutory teeth to issue recall orders, file class actions, and impose fines up to ₹50L. ASCI (est. 1985) is an industry self-regulatory body with voluntary compliance.',
    hints: [
      'Which body was created by Parliament under CPA 2019 with powers to levy penalties?',
      'ASCI handles voluntary complaints; CCPA is the government statutory regulator.',
      'CCPA holds statutory authority; ASCI relies on industry self-discipline.',
    ],
  },
  {
    id: 'ch_bs_020',
    nodeId: NODE_C12_BS_046,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'A consumer in Pune buys an electric geyser. Due to an uninsulated internal heating coil (manufacturing defect), the geyser bursts, causing severe burn injuries and ₹80,000 bathroom damage. Under CPA 2019 Section 84, what can be claimed?',
    options: [
      'Only replacement of the ₹4,000 geyser unit; collateral personal injuries cannot be compensated',
      'Product Liability action against the manufacturer for harm, medical expenses, property damage, and compensation up to statutory limits',
      'The consumer cannot sue because electrical appliances are bought at buyer’s risk (caveat emptor)',
      'The consumer must first file an FIR in the High Court before approaching any commission',
    ],
    correctIndex: 1,
    explanation:
      'Section 84 of CPA 2019 introduced statutory Product Liability in India. A manufacturer is strictly liable to compensate consumers for physical injury, death, or property damage caused by defective products.',
    hints: [
      'Does CPA 2019 limit remedies to just replacing the product, or did it introduce comprehensive Product Liability for harm caused?',
      'Section 84 covers injury, hospitalisation, and property damage caused by defective manufacture.',
      'Product Liability holds manufacturers accountable for consequential harm.',
    ],
  },
  {
    id: 'ch_bs_021',
    nodeId: NODE_C12_BS_042,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A company cuts warehouses from 30 regional depots down to 2 central mega-warehouses to save storage rent. What is the most likely consequence on total physical distribution performance?',
    options: [
      'Total distribution cost will drop to zero and order transit time will become instantaneous',
      'Warehousing costs drop, but transportation costs increase (longer delivery legs) and order fulfilment lead time to retail kiranas rises, risking lost sales from stockouts',
      'The company is automatically exempt from the Consumer Protection Act',
      'Inventory holding costs will double at every kirana store in India',
    ],
    correctIndex: 1,
    explanation:
      'Physical distribution requires balancing system trade-offs: fewer warehouses reduce fixed facility rent, but increase outward long-distance transportation costs and prolong delivery times to retailers.',
    hints: [
      'Think about the distance between 2 central warehouses and 1 crore kirana stores across India.',
      'Shorter distances reduce freight and speed up restocking.',
      'Fewer depots save storage costs but escalate freight bills and stockout risks.',
    ],
  },
  {
    id: 'ch_bs_022',
    nodeId: NODE_C12_BS_043,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Order the comprehensive commercial launch sequence for VedicVibe’s new health supplement in compliance with Indian law.',
    sortItems: [
      'Formulate product with FSSAI & BIS ingredient compliance testing',
      'Design Place Mix: Setup CFAs, Regional Depots, and 2-Level Kirana Distribution',
      'Draft Promotion Mix & ASCI-compliant Influencer briefs with mandatory #ad tags',
      'Deploy E-Daakhil consumer grievance cell to monitor warranty & redressal claims',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'A sound business launch progresses from Product Safety/R&D → Physical Distribution & Channel Architecture → Compliant Promotion Mix → Post-Sale Redressal & Product Liability Governance.',
    hints: [
      'First ensure the product meets safety and regulatory standards.',
      'Second, build the distribution pipeline to get goods into stores.',
      'Third, launch promotional campaigns with legal ad disclosures.',
      'Finally, maintain post-sales grievance and consumer redressal systems.',
    ],
  },
  {
    id: 'ch_bs_023',
    nodeId: NODE_C12_BS_041,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'VedicVibe produces an Ayurvedic tonic at ₹100 factory cost. The Wholesaler adds a 20% margin on factory cost (₹20). The Retailer adds a 25% margin on the wholesale price (₹120 + 25% of ₹120 = ₹30). What is the final Maximum Retail Price (MRP) in Rupees?',
    correctAnswer: 150,
    tolerance: 0,
    unit: '₹ (INR)',
    explanation:
      'Factory Price = ₹100. Wholesaler price = ₹100 + 20% = ₹120. Retailer adds 25% on ₹120 (which is ₹30), resulting in a final consumer MRP of ₹120 + ₹30 = ₹150.',
    hints: [
      'Calculate wholesaler price: ₹100 + (0.20 × ₹100) = ₹120.',
      'Calculate retailer price: ₹120 + (0.25 × ₹120) = ₹120 + ₹30.',
      'Final MRP = ₹150.',
    ],
  },
];

// ─── PROPS INTERFACE ───────────────────────────────────────────────────────────
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

// ─── DEFAULT ENRICHMENT DATA ───────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_BS_041,
  title: 'Place, Promotion, PLC & Consumer Protection Comprehensive Mastery',
  definition:
    'Place mix encompasses channel structures (0 to 3 levels) and physical distribution (transportation, warehousing, order processing, inventory control). Promotion mix integrates advertising, sales promotion, personal selling, PR, and digital/influencer marketing. Product Life Cycle tracks products across 5 stages, prolonged via extension strategies. Consumer Protection Act 2019/2023 safeguards consumer rights through product liability, a 3-tier quasi-judicial redressal mechanism (District ≤ ₹50L, State ₹50L-₹2Cr, National > ₹2Cr), and strict penalties on misleading ads and celebrity endorsers.',
  eli5:
    'Think of running a great brand: First you build roads and warehouses to get your goods to every corner shop (Place). Next you tell exciting stories on TV and Instagram so people want to buy (Promotion). As your product grows old, you give it fresh packaging to keep it popular (PLC). And if anything goes wrong, consumer courts and fair-ad laws protect your customers (Consumer Protection).',
  misconceptions: [
    {
      misconception: 'The number of channel levels equals the number of arrows in a diagram.',
      correction:
        'Channel levels equal the number of independent intermediary FIRMS between producer and consumer. Producer → Retailer → Consumer is a ONE-level channel (one intermediary).',
    },
    {
      misconception: 'Warehousing and inventory control are identical functions.',
      correction:
        'Warehousing is about WHERE goods are stored (locations, cold-chains, depots). Inventory control is about HOW MUCH stock to hold (quantities, JIT, reorder buffers).',
    },
    {
      misconception: 'A discount advertised on television is classified as advertising.',
      correction:
        'The monetary discount itself is Sales Promotion; the television broadcast is merely the media channel used to announce that incentive.',
    },
    {
      misconception: 'Right to Safety and Right to be Informed are the same thing.',
      correction:
        'Right to Safety protects against physical hazards (e.g. exploding battery). Right to be Informed protects accurate disclosure of ingredients, dates, and prices.',
    },
    {
      misconception: 'CPA 2019 pecuniary limits are District up to ₹20L, State up to ₹1Cr, National > ₹1Cr.',
      correction:
        'Under Rule 21 of the 2020 Rules, limits are District up to ₹50 Lakh, State above ₹50 Lakh up to ₹2 Crore, and National above ₹2 Crore.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which of the following is a Zero-level distribution channel?',
      options: ['Bata selling shoes in its exclusive retail stores', 'Amul selling ice-cream online directly to consumers', 'Maruti Suzuki selling via car dealerships', 'HUL selling Lux via stockists and kiranas'],
      correctIndex: 1,
    },
    {
      question: 'What does Just-in-Time (JIT) inventory primarily minimize?',
      options: ['Transportation speed', 'Holding and warehousing storage costs', 'Consumer redressal disputes', 'Advertising agency fees'],
      correctIndex: 1,
    },
    {
      question: 'What separates Advertising from Publicity?',
      options: ['Advertising is unpaid and uncontrolled; Publicity is paid', 'Advertising is paid and company-controlled; Publicity is unpaid editorial coverage', 'Publicity is strictly prohibited under CPA 2019', 'Advertising is only conducted on mobile apps'],
      correctIndex: 1,
    },
    {
      question: 'Which body possesses statutory authority to levy monetary penalties on misleading advertisers in India?',
      options: ['Advertising Standards Council of India (ASCI)', 'Central Consumer Protection Authority (CCPA)', 'Press Council of India', 'Indian Medical Association'],
      correctIndex: 1,
    },
    {
      question: 'What is the pecuniary jurisdiction of the State Consumer Commission under CPA 2020 Rules?',
      options: ['Up to ₹50 Lakh', 'Above ₹50 Lakh and up to ₹2 Crore', 'Above ₹2 Crore up to ₹10 Crore', 'Unlimited original jurisdiction'],
      correctIndex: 1,
    },
    {
      question: 'What is an extension strategy in the Product Life Cycle?',
      options: ['Discontinuing a product immediately when sales dip', 'Deliberate actions like product modification or repositioning to prolong the maturity stage', 'Selling goods at a 90% loss to bankrupt competitors', 'Filing an appeal in the Supreme Court'],
      correctIndex: 1,
    },
    {
      question: 'Under Section 2(7) of CPA 2019, who is excluded from the definition of a consumer?',
      options: ['A person buying goods online', 'A person buying goods for resale or commercial enterprise', 'A freelance tailor buying a sewing machine for self-employment', 'A patient buying medicines from a pharmacy'],
      correctIndex: 1,
    },
    {
      question: 'What is the maximum penalty for a celebrity endorser on a first offence for misleading ads under CPA 2023?',
      options: ['₹1 Lakh', '₹10 Lakh', '₹50 Lakh', '₹1 Crore'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student accurately distinguishes 0-3 channel levels, physical distribution functions (Where vs How Much), 4 promotion mix elements + digital SMM/influencer hierarchy, maps 5 PLC stages & extension strategies, and masters CPA 2019/2023 3-tier redressal thresholds, product liability, and endorser compliance.',
};

// ─── INTERACTIVE EXPLORATION STEPS ─────────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Channel Level Architect & Intermediary Pipeline',
    instruction: 'Click different channel structures to observe intermediary layers, markups, and retail reach across India.',
    interactionType: 'channel-simulator',
    nodeId: NODE_C12_BS_041,
  },
  {
    title: 'Lab 2: Physical Distribution Cost Optimization & Trade-off Curve',
    instruction: 'Drag the Warehouse Count slider in real-time. Watch how storage rent increases while freight & stockouts plummet to create a minimum total cost U-curve!',
    interactionType: 'logistics-tradeoff',
    nodeId: NODE_C12_BS_042,
  },
  {
    title: 'Lab 3: Promotion Mix Budget & Communication Hierarchy',
    instruction: 'Allocate promotional budget between Mass Ads, Sales Promotion, Personal Selling, and Influencer SMM.',
    interactionType: 'promo-allocator',
    nodeId: NODE_C12_BS_043,
  },
  {
    title: 'Lab 4: Product Life Cycle (PLC) Trajectory & Extension Engine',
    instruction: 'Scrub through time from Launch to Maturity. Trigger an Extension Strategy (Product Modification) to rescue sales!',
    interactionType: 'plc-curve',
    nodeId: NODE_C12_BS_045,
  },
  {
    title: 'Lab 5: CPA 2019/2023 3-Tier Redressal Hierarchy & Statutory Thresholds',
    instruction: 'Input different consumer dispute claim amounts on the live slider to visualize which Commission holds pecuniary jurisdiction.',
    interactionType: 'redressal-bench',
    nodeId: NODE_C12_BS_047,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS (MINIMUM 2) ──────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If VedicVibe reduces its regional warehouses from 25 down to just 2 central hubs, what happens to outward delivery times to village kiranas?',
    options: [
      'Outward delivery time will drop drastically because centralized logistics are faster',
      'Outward delivery time will increase significantly, elevating the risk of retail stockouts',
      'Delivery time remains completely unchanged regardless of depot count',
      'The company will be legally forced to switch to air cargo only',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test your prediction by dragging the Warehouse Count slider below down to 2!',
    nodeId: NODE_C12_BS_042,
  },
  {
    question:
      'Predict: If a consumer dispute claim is filed for ₹1.25 Crore, which consumer dispute redressal forum has pecuniary jurisdiction under CPA 2020 rules?',
    options: [
      'District Commission (claims up to ₹50 Lakh)',
      'State Commission (claims between ₹50 Lakh and ₹2 Crore)',
      'National Commission (only claims above ₹10 Crore)',
      'Supreme Court directly in the first instance',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test your prediction by setting the Claim Slider to ₹125 Lakhs in Lab 5!',
    nodeId: NODE_C12_BS_047,
  },
];

// ─── OBSERVATION QUESTIONS ─────────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question:
      'Observation: Looking at the live Logistics Trade-off curve, what happens to Total Cost when warehouse count is around 8 to 12?',
    observableOptions: [
      'Total distribution cost reaches an optimal minimum where holding cost and transit cost balance',
      'Total cost rises to infinity',
      'Warehousing costs and transport costs both become zero simultaneously',
      'The company stops paying GST',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BS_042,
  },
];

// ─── REAL-WORLD ACTIVITY ───────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Boardroom Strategy & Legal Audit',
  description:
    'You have guided VedicVibe Naturals through explosive market growth while keeping it 100% compliant with CPA 2019/2023. Now synthesize your learnings into a real-world boardroom action plan.',
  steps: [
    'Audit a FMCG product in your home: Identify its channel level from factory to your hand.',
    'Review an Instagram or YouTube reel for an Indian D2C brand: Check if #ad or "Paid Partnership" is prominently displayed as per ASCI 2023 rules.',
    'Visit the E-Daakhil portal (edaakhil.nic.in): Explore how Indian consumers file claims online across District, State, and National commissions.',
    'Identify one Indian legacy brand currently employing a PLC extension strategy (e.g. Maggi Atta Noodles, Amul Single-serve butter).',
  ],
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function C12_BusinessStudiesPlaceChannelsDistributionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_BS_041,
  title = DEFAULT_PROPS.title || 'Place, Promotion, PLC & Consumer Protection Simulation',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Config
  const subjectConfig = SUBJECT_CONFIG['bs'] || { name: 'Business Studies', emoji: '🏢', color: 'indigo' };

  // Phase Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Discovery & Predict State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox Controls (Direct Slider Binding)
  const [selectedChannelTier, setSelectedChannelTier] = useState<0 | 1 | 2 | 3>(2);
  const [warehouseCount, setWarehouseCount] = useState<number>(10);
  const [adSpend, setAdSpend] = useState<number>(40);
  const [salesPromoSpend, setSalesPromoSpend] = useState<number>(30);
  const [personalSellingSpend, setPersonalSellingSpend] = useState<number>(15);
  const [influencerSpend, setInfluencerSpend] = useState<number>(15);
  const [plcTimeIndex, setPlcTimeIndex] = useState<number>(3);
  const [plcExtensionActive, setPlcExtensionActive] = useState<boolean>(false);
  const [simClaimAmount, setSimClaimAmount] = useState<number>(45); // in Lakhs
  const [adClaimVerifiable, setAdClaimVerifiable] = useState<boolean>(true);
  const [hasAdDisclosureTag, setHasAdDisclosureTag] = useState<boolean>(true);

  // HTML5 Canvas Animation Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Challenges State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Construct
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback Visuals
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Inactivity & Timers
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── CANVAS ANIMATION LOOP (HTML5 Canvas requirement) ────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; speed: number; size: number; color: string; label: string }[] = [];

    const colors = ['#818cf8', '#38bdf8', '#34d399', '#f59e0b', '#ec4899'];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * 600,
        y: 20 + Math.random() * 60,
        speed: 1 + Math.random() * 2 * (warehouseCount / 10),
        size: 3 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        label: i % 3 === 0 ? '📦' : i % 3 === 1 ? '🚚' : '🏷️',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background track
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(30, 50);
      ctx.lineTo(canvas.width - 30, 50);
      ctx.stroke();
      ctx.setLineDash([]);

      // Nodes
      const nodeLabels = ['Factory', 'Regional Depot', 'Stockist', 'Kirana Retail', 'Consumer'];
      const spacing = (canvas.width - 60) / (nodeLabels.length - 1);
      nodeLabels.forEach((label, i) => {
        const nx = 30 + i * spacing;
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(nx, 50, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, nx, 75);
      });

      // Animated freight flow particles
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > canvas.width - 30) {
          p.x = 30;
          p.y = 25 + Math.random() * 35;
        }

        ctx.font = '12px sans-serif';
        ctx.fillText(p.label, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [warehouseCount, selectedChannelTier]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── CALCULATED VALUES (Real-Time Economics Simulation) ───────────────────────
  const logisticsMetrics = useMemo(() => {
    const facilityRentCost = warehouseCount * 3.5; // in Lakhs
    const freightCost = Math.max(8, (35 / (warehouseCount + 1)) * 4.2);
    const stockoutLoss = warehouseCount < 5 ? (5 - warehouseCount) * 6.0 : 0;
    const totalCost = facilityRentCost + freightCost + stockoutLoss;
    const deliverySpeedDays = Math.max(1, Math.round(18 / Math.sqrt(warehouseCount)));
    return { facilityRentCost, freightCost, stockoutLoss, totalCost, deliverySpeedDays };
  }, [warehouseCount]);

  const promoProjectedReach = useMemo(() => {
    const massImpressionsM = (adSpend * 0.45).toFixed(1);
    const immediateSalesBoostPct = Math.round(salesPromoSpend * 1.6);
    const directRetailTrustIdx = Math.round(personalSellingSpend * 2.2);
    const socialEngagementK = Math.round(influencerSpend * 48);
    return { massImpressionsM, immediateSalesBoostPct, directRetailTrustIdx, socialEngagementK };
  }, [adSpend, salesPromoSpend, personalSellingSpend, influencerSpend]);

  const claimJurisdictionInfo = useMemo(() => {
    if (simClaimAmount <= 50) {
      return {
        forum: 'District Consumer Disputes Redressal Commission',
        president: 'District Judge',
        appeal: 'State Commission (within 30 days)',
        color: 'text-emerald-400',
        badgeBg: 'bg-emerald-950/80 border-emerald-500',
        section: 'Rule 21, CPA Rules 2020: Claims up to ₹50 Lakh',
        tierIndex: 0,
      };
    } else if (simClaimAmount <= 200) {
      return {
        forum: 'State Consumer Disputes Redressal Commission',
        president: 'High Court Judge',
        appeal: 'National Commission (within 30 days)',
        color: 'text-amber-400',
        badgeBg: 'bg-amber-950/80 border-amber-500',
        section: 'Rule 21, CPA Rules 2020: Claims > ₹50 Lakh up to ₹2 Crore',
        tierIndex: 1,
      };
    } else {
      return {
        forum: 'National Consumer Disputes Redressal Commission (NCDRC)',
        president: 'Supreme Court Judge',
        appeal: 'Supreme Court of India (within 30 days)',
        color: 'text-rose-400',
        badgeBg: 'bg-rose-950/80 border-rose-500',
        section: 'Rule 21, CPA Rules 2020: Claims exceeding ₹2 Crore',
        tierIndex: 2,
      };
    }
  }, [simClaimAmount]);

  // ─── LOAD PERSISTED MASTERY ON MOUNT ─────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY UPDATE ──────────────────────────────────────────
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

  // ─── HANDLERS & USECALLBACKS ────────────────────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextH = currentChallengeObj.hints[0];
        if (nextH) {
          setCurrentHint(nextH);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Here is a hint to guide your thinking.');
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, currentChallengeObj]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeObj.hints[nextLevel - 1]) {
      const hintText = currentChallengeObj.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
    }
  }, [hintCount, currentChallengeObj]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(
      isCorr
        ? 'Excellent insight! Amazon acts as an intermediary firm.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration labs. Learn by doing!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all variables without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Ready for board-level challenges. Read carefully and apply your knowledge!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test it live on the simulation.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Sharp business observation!' : 'Look closely at the graph inflection point.');
  }, []);

  const handleChannelSelect = useCallback((tier: 0 | 1 | 2 | 3) => {
    setSelectedChannelTier(tier);
    audioManager.play('tap');
  }, []);

  const handlePromoBudgetChange = useCallback((tool: 'ad' | 'sp' | 'ps' | 'inf', val: number) => {
    if (tool === 'ad') setAdSpend(val);
    if (tool === 'sp') setSalesPromoSpend(val);
    if (tool === 'ps') setPersonalSellingSpend(val);
    if (tool === 'inf') setInfluencerSpend(val);
    audioManager.play('count');
  }, []);

  const handlePlcExtensionToggle = useCallback(() => {
    setPlcExtensionActive((prev) => !prev);
    audioManager.play('sparkle');
    speechManager.speak('Product modification launched! Extending maturity stage.');
    if (predictionMade && !predictionVerified) setPredictionVerified(true);
  }, [predictionMade, predictionVerified]);

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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      let arr = prev.length === 4 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the simulation.');
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
    (ans: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;
      const ch = currentChallengeObj;

      if (ch.type === 'classify' || ch.type === 'distinguish' || ch.type === 'match') {
        isCorrect = ans === ch.correctIndex;
      } else if (ch.type === 'drag-label') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(ch.correctMapping);
      } else if (ch.type === 'drag-sort') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(ch.correctOrder);
      } else if (ch.type === 'numeric') {
        const numVal = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
        isCorrect = Math.abs(numVal - (ch.correctAnswer || 0)) <= (ch.tolerance || 0);
      } else if (ch.type === 'construct') {
        isCorrect = (ans as string).trim() === (ch.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Accurate analysis! Well done.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(ch.nodeId, ch.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + ch.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (ch.misconceptionIndex !== undefined && !hitMisconceptions.includes(ch.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, ch.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step statutory and business rationale.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(ch.nodeId, ch.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + ch.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [currentChallengeObj, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
              ISC Class 12 • {subjectConfig.name}
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Dynamic Phase / Difficulty Badge */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : difficulty === 'standard'
                ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                : 'bg-rose-950/80 text-rose-300 border-rose-600'
            }`}
          >
            Tier: {difficulty.toUpperCase()}
          </motion.span>
          <span className="px-3 py-1 text-xs font-medium bg-slate-900 border border-slate-700 rounded-full text-slate-300">
            Mastery: {masteryLevel}
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <h2 className="text-xl font-bold text-indigo-200 mb-2">🎯 Case Scenario: {SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-3 font-medium bg-indigo-900/30 p-3 rounded-xl border border-indigo-800/40">
              📌 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold bg-amber-500/20 text-amber-300 rounded-md border border-amber-500/40">
                Curiosity Discovery Challenge
              </span>
              <span className="text-xs text-slate-400">(Ungraded warm-up)</span>
            </div>
            <p className="text-base md:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-750 text-slate-200 hover:bg-slate-800 hover:border-indigo-500'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 space-y-4">
                <div
                  className={`p-4 rounded-xl text-sm border ${
                    discoveryCorrect
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-700 text-amber-300'
                  }`}
                >
                  <p className="font-semibold">{discoveryCorrect ? '✓ Spot on!' : '💡 Key Concept to Discover:'}</p>
                  <p className="mt-1 text-xs md:text-sm">
                    {discoveryCorrect
                      ? 'Amazon is an independent online retailer firm performing warehousing and order fulfillment. Because exactly 1 intermediary sits between Samsung/VedicVibe and you, it is a One-Level channel!'
                      : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Guided Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORE (Guided Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Real-Time Supply Chain Motion Canvas */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                <span>⚡ Live Physical Distribution & Channel Pipeline Canvas Animation</span>
              </span>
              <span className="text-[10px] text-slate-400">requestAnimationFrame Engine</span>
            </div>
            <canvas
              ref={canvasRef}
              width={700}
              height={90}
              className="w-full bg-slate-950 rounded-xl border border-slate-800/80"
            />
          </div>

          {/* Lab Step Nav Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-800 no-scrollbar">
            {EXPLORATION_STEPS.map((st, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentSlide(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Lab {idx + 1}: {st.title.split(':')[1] || st.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Interactive Exploration {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white mt-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-amber-300 text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: Channels of Distribution (c12_bs_041) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { level: 0, name: 'Zero-Level (Direct)', desc: 'Producer → Consumer (e.g. Amul.in, e-Choupal)' },
                      { level: 1, name: 'One-Level', desc: 'Producer → Retailer → Consumer (e.g. Maruti, Amazon)' },
                      { level: 2, name: 'Two-Level (Standard FMCG)', desc: 'Producer → Wholesaler → Retailer → Consumer (e.g. Tata Salt)' },
                      { level: 3, name: 'Three-Level (Widespread)', desc: 'Producer → Agent/CFA → Stockist → Retailer → Consumer (e.g. HUL Lux)' },
                    ].map((lvl) => (
                      <motion.button
                        key={lvl.level}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChannelSelect(lvl.level as 0 | 1 | 2 | 3)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left ${
                          selectedChannelTier === lvl.level
                            ? 'bg-indigo-600 border-indigo-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                        }`}
                      >
                        <div>{lvl.name}</div>
                        <div className="text-[10px] font-normal opacity-80">{lvl.desc}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* TOPIC SVG DIAGRAM 1: Channel Level Architecture */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-indigo-300">📊 Diagram 1: Multi-Tier Distribution Pipeline Architecture</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-200 border border-indigo-700/50">
                        {selectedChannelTier} Intermediary Level{selectedChannelTier !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <svg viewBox="0 0 800 160" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <linearGradient id="producerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#4338ca" />
                          <stop offset="100%" stopColor="#312e81" />
                        </linearGradient>
                        <linearGradient id="agentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#7e22ce" />
                          <stop offset="100%" stopColor="#581c87" />
                        </linearGradient>
                        <linearGradient id="wholesalerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#d97706" />
                          <stop offset="100%" stopColor="#92400e" />
                        </linearGradient>
                        <linearGradient id="retailerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0891b2" />
                          <stop offset="100%" stopColor="#155e75" />
                        </linearGradient>
                        <linearGradient id="consumerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#059669" />
                          <stop offset="100%" stopColor="#065f46" />
                        </linearGradient>
                        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 8 5 L 0 9 z" fill="#818cf8" />
                        </marker>
                      </defs>

                      <path d="M 120 75 L 680 75" stroke="#334155" strokeWidth="4" strokeDasharray="6 6" />

                      {/* Producer Node */}
                      <g transform="translate(40, 35)">
                        <rect width="110" height="80" rx="12" fill="url(#producerGrad)" stroke="#818cf8" strokeWidth="2" />
                        <text x="55" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">PRODUCER</text>
                        <text x="55" y="52" textAnchor="middle" fill="#c7d2fe" fontSize="10">VedicVibe Factory</text>
                        <text x="55" y="68" textAnchor="middle" fill="#a5b4fc" fontSize="9">Originator (₹100)</text>
                      </g>

                      {/* Level 3 Agent */}
                      {selectedChannelTier >= 3 && (
                        <g transform="translate(195, 35)">
                          <line x1="-35" y1="40" x2="-5" y2="40" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                          <rect width="110" height="80" rx="12" fill="url(#agentGrad)" stroke="#c084fc" strokeWidth="2" />
                          <text x="55" y="30" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">AGENT / CFA</text>
                          <text x="55" y="48" textAnchor="middle" fill="#f3e8ff" fontSize="10">State Depot</text>
                          <text x="55" y="66" textAnchor="middle" fill="#e9d5ff" fontSize="9">Takes Commission</text>
                        </g>
                      )}

                      {/* Level 2 Wholesaler */}
                      {selectedChannelTier >= 2 && (
                        <g transform={selectedChannelTier === 2 ? 'translate(260, 35)' : 'translate(350, 35)'}>
                          <line x1="-35" y1="40" x2="-5" y2="40" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                          <rect width="120" height="80" rx="12" fill="url(#wholesalerGrad)" stroke="#fcd34d" strokeWidth="2" />
                          <text x="60" y="30" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">WHOLESALER</text>
                          <text x="60" y="48" textAnchor="middle" fill="#fef3c7" fontSize="10">Bulk Distributor</text>
                          <text x="60" y="66" textAnchor="middle" fill="#fde68a" fontSize="9">Margin: +20% (₹120)</text>
                        </g>
                      )}

                      {/* Level 1 Retailer */}
                      {selectedChannelTier >= 1 && (
                        <g transform={selectedChannelTier === 1 ? 'translate(360, 35)' : selectedChannelTier === 2 ? 'translate(470, 35)' : 'translate(510, 35)'}>
                          <line x1="-35" y1="40" x2="-5" y2="40" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                          <rect width="110" height="80" rx="12" fill="url(#retailerGrad)" stroke="#38bdf8" strokeWidth="2" />
                          <text x="55" y="30" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">RETAILER</text>
                          <text x="55" y="48" textAnchor="middle" fill="#e0f2fe" fontSize="10">Kirana / D2C</text>
                          <text x="55" y="66" textAnchor="middle" fill="#bae6fd" fontSize="9">Margin: +25% (₹150)</text>
                        </g>
                      )}

                      {/* Consumer Node */}
                      <g transform="translate(660, 35)">
                        <line x1="-35" y1="40" x2="-5" y2="40" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                        <rect width="105" height="80" rx="12" fill="url(#consumerGrad)" stroke="#34d399" strokeWidth="2" />
                        <text x="52" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">CONSUMER</text>
                        <text x="52" y="52" textAnchor="middle" fill="#d1fae5" fontSize="10">End Buyer</text>
                        <text x="52" y="68" textAnchor="middle" fill="#a7f3d0" fontSize="9">Final MRP ₹150</text>
                      </g>
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-800/70 rounded-xl text-xs space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>Intermediary Count Rule:</span>
                      <span className="font-bold text-white">{selectedChannelTier} Intermediary Firms between Producer and Consumer</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Estimated Pan-India Market Reach:</span>
                      <span className="font-bold text-indigo-400">
                        {selectedChannelTier === 0
                          ? 'D2C Urban Metros (15 Lakh consumers)'
                          : selectedChannelTier === 1
                          ? 'Tier 1/2 Cities (50 Lakh consumers)'
                          : selectedChannelTier === 2
                          ? 'National Tier 1-3 & Towns (4 Crore consumers)'
                          : 'Deep Rural & Pan-India (140 Crore consumers)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: Physical Distribution (c12_bs_042) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-5">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/50 space-y-3">
                      <p className="text-xs font-bold text-amber-400 uppercase">Step 1: Make your prediction first!</p>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left rounded-lg bg-slate-800 border border-slate-700 text-xs hover:border-indigo-500"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Real-time Slider connected to live visualization */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>⚡ Interactive Real-Time Warehouse Slider: <strong className="text-indigo-400 text-sm">{warehouseCount} Regional Depots</strong></span>
                      <span>Restock Lead Time: <strong className="text-emerald-400 text-sm">{logisticsMetrics.deliverySpeedDays} Days</strong></span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={warehouseCount}
                      onChange={(e) => {
                        setWarehouseCount(Number(e.target.value));
                        if (predictionMade && !predictionVerified) setPredictionVerified(true);
                      }}
                      className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      aria-label="Set number of regional warehouses"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>1 Depot (Central Mega-Hub)</span>
                      <span>10 Depots (Optimal Inflection)</span>
                      <span>30 Depots (Hyper-Local Saturation)</span>
                    </div>
                  </div>

                  {/* TOPIC SVG DIAGRAM 2: Logistics Cost Optimization Curves */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-indigo-300">📈 Diagram 2: Physical Distribution System Cost Trade-Off Curves</span>
                      <span className="text-xs font-bold text-amber-300">Total: ₹{logisticsMetrics.totalCost.toFixed(1)} L</span>
                    </div>

                    <svg viewBox="0 0 700 220" className="w-full h-auto">
                      <line x1="50" y1="190" x2="660" y2="190" stroke="#475569" strokeWidth="2" />
                      <line x1="50" y1="20" x2="50" y2="190" stroke="#475569" strokeWidth="2" />
                      <text x="650" y="210" textAnchor="end" fill="#94a3b8" fontSize="11">Warehouse Count (1 to 30) →</text>
                      <text x="20" y="25" fill="#94a3b8" fontSize="11" transform="rotate(-90 20,25)">Cost (₹ Lakhs) ↑</text>

                      {/* Warehousing Cost */}
                      <path d="M 50 180 Q 350 100 650 30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                      <text x="560" y="45" fill="#f59e0b" fontSize="11" fontWeight="bold">Warehousing Holding Cost ↗</text>

                      {/* Transport Cost */}
                      <path d="M 50 40 Q 150 150 650 175" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
                      <text x="140" y="110" fill="#06b6d4" fontSize="11" fontWeight="bold">↘ Transport & Stockout Cost</text>

                      {/* Total Cost Curve */}
                      <path d="M 50 150 Q 280 185 650 60" fill="none" stroke="#a855f7" strokeWidth="3.5" />
                      <text x="440" y="120" fill="#c084fc" fontSize="12" fontWeight="bold">Total Physical Distribution Cost</text>

                      {/* Dynamic Cursor Point */}
                      {(() => {
                        const xPos = 50 + ((warehouseCount - 1) / 29) * 600;
                        const t = (warehouseCount - 1) / 29;
                        const p0 = 150, p1 = 185, p2 = 60;
                        const yPos = (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
                        return (
                          <g>
                            <line x1={xPos} y1="20" x2={xPos} y2="190" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4 4" />
                            <circle cx={xPos} cy={yPos} r="7" fill="#ec4899" stroke="#ffffff" strokeWidth="2.5" />
                            <rect x={Math.min(540, Math.max(50, xPos - 55))} y={yPos - 32} width="110" height="22" rx="4" fill="#1e1b4b" stroke="#ec4899" strokeWidth="1" />
                            <text x={Math.min(540, Math.max(50, xPos - 55)) + 55} y={yPos - 17} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                              ��{logisticsMetrics.totalCost.toFixed(1)}L @ {warehouseCount} Hubs
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400">Warehouse Rent</span>
                      <p className="text-lg font-bold text-amber-400">₹{logisticsMetrics.facilityRentCost.toFixed(1)} L</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400">Freight Outward</span>
                      <p className="text-lg font-bold text-cyan-400">₹{logisticsMetrics.freightCost.toFixed(1)} L</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400">Stockout Risk Loss</span>
                      <p className="text-lg font-bold text-rose-400">₹{logisticsMetrics.stockoutLoss.toFixed(1)} L</p>
                    </div>
                    <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-700/70">
                      <span className="text-indigo-300 font-bold">Total Physical Dist.</span>
                      <p className="text-xl font-black text-white">₹{logisticsMetrics.totalCost.toFixed(1)} L</p>
                    </div>
                  </div>

                  {predictionVerified && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-2">
                      <p className="text-xs font-bold text-amber-300">Observation Check: What do you observe?</p>
                      <p className="text-sm text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 rounded bg-slate-900 border border-slate-700 text-xs hover:border-indigo-500"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 3: Promotion Mix (c12_bs_043 & 044) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase">Allocate 4P Promotion Budget</h4>
                      <div className="space-y-2 text-xs">
                        <div>
                          <div className="flex justify-between text-slate-300">
                            <span>Mass TV & Print Advertising:</span>
                            <span className="font-bold text-white">{adSpend}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={60}
                            value={adSpend}
                            onChange={(e) => handlePromoBudgetChange('ad', Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-slate-300">
                            <span>Sales Promotion (Discounts, BOGO):</span>
                            <span className="font-bold text-white">{salesPromoSpend}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={60}
                            value={salesPromoSpend}
                            onChange={(e) => handlePromoBudgetChange('sp', Number(e.target.value))}
                            className="w-full accent-amber-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-slate-300">
                            <span>Personal Selling (Demonstrators):</span>
                            <span className="font-bold text-white">{personalSellingSpend}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={40}
                            value={personalSellingSpend}
                            onChange={(e) => handlePromoBudgetChange('ps', Number(e.target.value))}
                            className="w-full accent-emerald-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-slate-300">
                            <span>Influencer Marketing (#ad):</span>
                            <span className="font-bold text-white">{influencerSpend}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={50}
                            value={influencerSpend}
                            onChange={(e) => handlePromoBudgetChange('inf', Number(e.target.value))}
                            className="w-full accent-purple-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-indigo-950/40 to-slate-950 rounded-xl border border-indigo-800/50 space-y-3 text-xs">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase">Projected Market Communication Impact</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400">Mass Awareness</span>
                          <p className="text-base font-bold text-indigo-300">{promoProjectedReach.massImpressionsM}M Views</p>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400">Immediate Purchase Push</span>
                          <p className="text-base font-bold text-amber-300">+{promoProjectedReach.immediateSalesBoostPct}% Sales</p>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400">In-Store Conversion Trust</span>
                          <p className="text-base font-bold text-emerald-300">{promoProjectedReach.directRetailTrustIdx}/100 Score</p>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400">Digital D2C Engagement</span>
                          <p className="text-base font-bold text-purple-300">{promoProjectedReach.socialEngagementK}K Clicks</p>
                        </div>
                      </div>
                      <div className="p-2 bg-indigo-900/30 rounded-lg border border-indigo-700/30 text-[11px] text-slate-300">
                        ✨ <strong>Hierarchy:</strong> Digital Marketing ➔ Social Media (Instagram/YouTube) ➔ Influencer Marketing.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: Product Life Cycle (c12_bs_045) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300">
                      Selected PLC Stage: <strong className="text-indigo-400">{PLC_DATA[plcTimeIndex].stage}</strong> ({PLC_DATA[plcTimeIndex].desc})
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePlcExtensionToggle}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        plcExtensionActive
                          ? 'bg-emerald-600 border-emerald-400 text-white'
                          : 'bg-indigo-900/60 border-indigo-500 text-indigo-200 hover:bg-indigo-700'
                      }`}
                    >
                      {plcExtensionActive ? '✓ Extension Strategy Active (Silk/Sachet)' : '+ Apply Extension Strategy'}
                    </motion.button>
                  </div>

                  {/* TOPIC SVG DIAGRAM 3: Product Life Cycle Stages & Extension Trajectory */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-indigo-300">📊 Diagram 3: Five Stages of PLC & Extension Curve</span>
                      <span className="text-xs font-semibold text-emerald-400">Green = Profit | Indigo = Sales</span>
                    </div>

                    <svg viewBox="0 0 760 210" className="w-full h-auto">
                      <rect x="50" y="20" width="130" height="150" fill="#1e1b4b" opacity="0.4" />
                      <rect x="180" y="20" width="130" height="150" fill="#172554" opacity="0.4" />
                      <rect x="310" y="20" width="150" height="150" fill="#042f2e" opacity="0.4" />
                      <rect x="460" y="20" width="130" height="150" fill="#450a0a" opacity="0.4" />
                      <rect x="590" y="20" width="130" height="150" fill="#064e3b" opacity="0.5" />

                      <text x="115" y="38" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">1. INTRO</text>
                      <text x="245" y="38" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">2. GROWTH</text>
                      <text x="385" y="38" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">3. MATURITY</text>
                      <text x="525" y="38" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">4. DECLINE</text>
                      <text x="655" y="38" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">5. EXTENSION</text>

                      {/* Base Sales Curve */}
                      <path d="M 50 160 C 130 155, 180 130, 245 70 C 310 30, 420 30, 480 50 C 530 80, 570 140, 600 160" fill="none" stroke="#6366f1" strokeWidth="3.5" />

                      {/* Extension Sales Rebound Curve */}
                      {plcExtensionActive && (
                        <path d="M 460 45 C 520 20, 580 20, 710 40" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="5 5" />
                      )}

                      {/* Profit Curve */}
                      <path d="M 50 180 C 120 185, 180 140, 245 95 C 310 60, 420 55, 480 85 C 530 120, 570 160, 600 170" fill="none" stroke="#34d399" strokeWidth="2.5" />

                      {/* Axes */}
                      <line x1="50" y1="170" x2="720" y2="170" stroke="#475569" strokeWidth="2" />
                      <line x1="50" y1="20" x2="50" y2="170" stroke="#475569" strokeWidth="2" />
                      <text x="710" y="195" textAnchor="end" fill="#94a3b8" fontSize="10">Time (Years) →</text>
                      <text x="25" y="25" fill="#94a3b8" fontSize="10" transform="rotate(-90 25,25)">Sales / Profit ↑</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Competitors in Market:</span>
                      <p className="font-bold text-white">{PLC_DATA[plcTimeIndex].competitors} Rival Brands</p>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Profit Margin State:</span>
                      <p className="font-bold text-emerald-400">{PLC_DATA[plcTimeIndex].profit > 0 ? `+₹${PLC_DATA[plcTimeIndex].profit} Cr` : `-₹${Math.abs(PLC_DATA[plcTimeIndex].profit)} Cr`}</p>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 col-span-2">
                      <span className="text-slate-400">Strategic Rule:</span>
                      <p className="text-[11px] text-indigo-300">
                        {plcTimeIndex <= 1 ? 'Heavy Promotional Investment' : plcTimeIndex === 2 ? 'Expand Distribution Network' : plcTimeIndex === 3 ? 'Defend Market Share & Modify Formulations' : 'Harvest or Reposition'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: Redressal Pecuniary Bench (c12_bs_046 & 047) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-5">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>⚡ Interactive Claim Slider: <strong className="text-indigo-400 text-sm">₹{simClaimAmount} Lakhs</strong></span>
                      <span className="text-slate-400">(Drag to test CPA 2020 pecuniary tier thresholds)</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={350}
                      value={simClaimAmount}
                      onChange={(e) => setSimClaimAmount(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      aria-label="Set claim value in Lakhs"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>₹0</span>
                      <span className="text-emerald-400 font-bold">₹50 Lakh (District Cap)</span>
                      <span className="text-amber-400 font-bold">₹2 Crore (State Cap)</span>
                      <span className="text-rose-400 font-bold">₹3.5 Crore+ (National)</span>
                    </div>
                  </div>

                  {/* TOPIC SVG DIAGRAM 4: CPA 2019/2020 3-Tier Redressal Hierarchy */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-indigo-300">🏛️ Diagram 4: Statutory 3-Tier Consumer Disputes Redressal Hierarchy</span>
                      <span className="text-xs font-bold text-amber-300">Rule 21 (2020 Revision)</span>
                    </div>

                    <svg viewBox="0 0 760 170" className="w-full h-auto">
                      <defs>
                        <marker id="appealArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" />
                        </marker>
                      </defs>

                      {/* District Commission */}
                      <g transform="translate(30, 25)">
                        <rect
                          width="160"
                          height="115"
                          rx="10"
                          fill={claimJurisdictionInfo.tierIndex === 0 ? '#064e3b' : '#0f172a'}
                          stroke={claimJurisdictionInfo.tierIndex === 0 ? '#10b981' : '#334155'}
                          strokeWidth={claimJurisdictionInfo.tierIndex === 0 ? '3' : '1.5'}
                        />
                        <text x="80" y="28" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">DISTRICT COMM.</text>
                        <text x="80" y="50" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">Up to ₹50 Lakh</text>
                        <text x="80" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="9">Pres: District Judge</text>
                        <text x="80" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8.5">Local District Headquarter</text>
                      </g>

                      {/* Appeal 1 */}
                      <line x1="195" y1="80" x2="225" y2="80" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#appealArrow)" />
                      <text x="210" y="72" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">30 Days</text>

                      {/* State Commission */}
                      <g transform="translate(230, 25)">
                        <rect
                          width="160"
                          height="115"
                          rx="10"
                          fill={claimJurisdictionInfo.tierIndex === 1 ? '#78350f' : '#0f172a'}
                          stroke={claimJurisdictionInfo.tierIndex === 1 ? '#f59e0b' : '#334155'}
                          strokeWidth={claimJurisdictionInfo.tierIndex === 1 ? '3' : '1.5'}
                        />
                        <text x="80" y="28" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">STATE COMM.</text>
                        <text x="80" y="50" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">₹50 Lakh to ₹2 Crore</text>
                        <text x="80" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="9">Pres: High Court Judge</text>
                        <text x="80" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8.5">State Capital</text>
                      </g>

                      {/* Appeal 2 */}
                      <line x1="395" y1="80" x2="425" y2="80" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#appealArrow)" />
                      <text x="410" y="72" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">30 Days</text>

                      {/* National Commission (NCDRC) */}
                      <g transform="translate(430, 25)">
                        <rect
                          width="160"
                          height="115"
                          rx="10"
                          fill={claimJurisdictionInfo.tierIndex === 2 ? '#881337' : '#0f172a'}
                          stroke={claimJurisdictionInfo.tierIndex === 2 ? '#f43f5e' : '#334155'}
                          strokeWidth={claimJurisdictionInfo.tierIndex === 2 ? '3' : '1.5'}
                        />
                        <text x="80" y="28" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">NATIONAL COMM.</text>
                        <text x="80" y="50" textAnchor="middle" fill="#fecdd3" fontSize="10" fontWeight="bold">Exceeding ₹2 Crore</text>
                        <text x="80" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="9">Pres: Supreme Court Judge</text>
                        <text x="80" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8.5">New Delhi (Apex Forum)</text>
                      </g>

                      {/* Appeal 3 */}
                      <line x1="595" y1="80" x2="625" y2="80" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#appealArrow)" />
                      <text x="610" y="72" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">30 Days</text>

                      {/* Supreme Court */}
                      <g transform="translate(630, 25)">
                        <rect width="105" height="115" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                        <text x="52" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">SUPREME</text>
                        <text x="52" y="48" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">COURT</text>
                        <text x="52" y="75" textAnchor="middle" fill="#c7d2fe" fontSize="9">Final Appeal</text>
                        <text x="52" y="95" textAnchor="middle" fill="#a5b4fc" fontSize="8">Constitution</text>
                      </g>
                    </svg>
                  </div>

                  <div className={`p-4 rounded-xl border transition-all ${claimJurisdictionInfo.badgeBg} space-y-1`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Active Original Jurisdiction:</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-black/40 border border-white/10 text-white">{claimJurisdictionInfo.section}</span>
                    </div>
                    <h4 className={`text-base font-black ${claimJurisdictionInfo.color}`}>{claimJurisdictionInfo.forum}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                      <p className="text-slate-300">👨‍⚖️ <strong>Presiding Officer:</strong> {claimJurisdictionInfo.president}</p>
                      <p className="text-slate-300">⚖️ <strong>Statutory Appeal:</strong> {claimJurisdictionInfo.appeal}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Prev Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
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
                Go to Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/70 rounded-2xl border border-indigo-800/50">
            <h2 className="text-lg font-bold text-indigo-300">🧪 Omnichannel Executive Sandbox (Zero Pressure)</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              Test live variables across channels, warehouse counts, promo budgets, and consumer claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-amber-400 uppercase">Distribution & Warehousing Sandbox</span>
              <div className="space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Warehouse Nodes:</span>
                  <span className="font-bold text-white">{warehouseCount} Depots</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={warehouseCount}
                  onChange={(e) => setWarehouseCount(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                <span>Total Logistics Cost:</span>
                <strong className="text-white">₹{logisticsMetrics.totalCost.toFixed(1)} Lakhs</strong>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase">Redressal Jurisdiction Calculator</span>
              <div className="space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Test Claim:</span>
                  <span className="font-bold text-white">₹{simClaimAmount} Lakhs</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={350}
                  value={simClaimAmount}
                  onChange={(e) => setSimClaimAmount(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400">Jurisdiction:</span>
                <p className={`font-bold ${claimJurisdictionInfo.color}`}>{claimJurisdictionInfo.forum}</p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-black text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            I Am Ready for Graded Board Challenges! 🚀
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE (Adaptive Exam Simulations) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-700 text-indigo-300 font-semibold uppercase">
                  NEP: {currentChallengeObj.competencyLevel}
                </span>
                <span className="text-slate-400 font-medium">
                  Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
                </span>
              </div>
            </div>

            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <motion.div
            key={currentChallengeObj.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 md:p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white leading-snug">
              {currentChallengeObj.question}
            </p>

            {(currentChallengeObj.type === 'classify' ||
              currentChallengeObj.type === 'distinguish' ||
              currentChallengeObj.type === 'match') &&
              currentChallengeObj.options && (
                <div className="grid grid-cols-1 gap-3 mt-5">
                  {currentChallengeObj.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`text-left p-4 rounded-xl text-sm transition-all border ${
                        showExplanation && i === currentChallengeObj.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-indigo-500'
                      }`}
                      aria-label={`Option ${i + 1}: ${opt}`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 mr-2 self-center font-bold">Palette:</span>
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { slot: 'slot_how_move', title: 'Route & Vehicle Selection (HOW goods move)' },
                    { slot: 'slot_where_store', title: 'Location & Cold-Chain Facility (WHERE goods stored)' },
                    { slot: 'slot_how_much', title: 'Stock Buffers & JIT Levels (HOW MUCH stock held)' },
                    { slot: 'slot_how_track', title: 'Order Capture to Dispatch (HOW orders are fulfilled)' },
                  ].map((s) => (
                    <div
                      key={s.slot}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(s.slot)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[85px]"
                    >
                      <span className="text-[11px] text-slate-400">{s.title}</span>
                      <div className="mt-2 text-sm font-bold text-emerald-400">
                        {droppedLabels[s.slot] ? `✓ ${droppedLabels[s.slot]}` : <span className="text-slate-600 font-normal text-xs">[Drop matching element here]</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Validate Labels
                </motion.button>
              </div>
            )}

            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400 font-medium">Drag or swap items to form the proper legal sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === 4
                    ? sortArrangement.map((idx) => currentChallengeObj.sortItems![idx])
                    : currentChallengeObj.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 flex items-center justify-center font-bold text-indigo-300">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length === 4 ? sortArrangement : [0, 1, 2, 3];
                    handleAnswer(ans);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Submit Sequence Order
                </motion.button>
              </div>
            )}

            {currentChallengeObj.type === 'numeric' && (
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold w-48 text-sm focus:border-indigo-500 outline-none"
                    aria-label="Enter numeric answer"
                  />
                  <span className="text-sm text-indigo-300 font-semibold">{currentChallengeObj.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Check Figure
                  </motion.button>
                </div>
              </div>
            )}

            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400">{currentChallengeObj.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 hover:border-indigo-500"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-950 border border-indigo-700 text-indigo-300 rounded text-xs flex items-center gap-1">
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600 text-xs">Click parts above to construct the statutory route</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  Check Construction
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 md:p-5 bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-700/60 rounded-xl space-y-3"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step-by-Step Statutory & Management Rationale:
                </h4>
                {currentChallengeObj.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-amber-400 mr-1.5">{i + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                currentChallengeObj.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finish & View Boardroom Audit →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 rounded-2xl border border-indigo-700 text-center space-y-2">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">Boardroom Simulation Mastered!</h2>
            <p className="text-slate-300 text-sm">
              Your Final Compliance & Strategy Score: <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/80 rounded-2xl border border-indigo-600 shadow-xl space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {errors === 0 ? '🏆' : errors <= 3 ? '🌟' : errors <= 7 ? '👍' : '🎯'}
              </span>
              <h3 className="text-xl font-black text-white">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-300">
              {errors === 0
                ? 'Flawless analysis across all distribution channels, 4P promo allocations, PLC stages, and CPA 2019/2023 legal redressals.'
                : errors <= 3
                ? 'Your understanding of business channels and consumer protection law is strong. Review the concepts below for final polish!'
                : errors <= 7
                ? 'You are developing sharp business instincts. Revisit the interactive labs and misconception review to clear remaining doubts.'
                : 'Every attempt builds stronger understanding. Master the statutory thresholds and retry to achieve board excellence!'}
            </p>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                ⚠️ Your Targeted Conceptual Profile (Reviewed & Clarified):
              </h3>
              <div className="space-y-2 text-xs">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Board Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reflection Prompts */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 text-xs md:text-sm">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">🧠 Board Exam Synthesis & Reflection:</h3>
            <ul className="space-y-1.5 text-slate-300 list-disc pl-5 text-xs">
              <li>Why is counting independent intermediary firms the only reliable rule for channel levels?</li>
              <li>How does Section 84 Product Liability protect consumers far beyond simple product replacement?</li>
              <li>How do ASCI and CCPA collaborate as voluntary filter vs statutory legal backstop?</li>
            </ul>
          </div>

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800 text-xs flex justify-between items-center text-slate-300">
            <span>📅 <strong>Spaced Repetition Schedule:</strong></span>
            <span className="font-bold text-amber-300">
              Next Review in {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
            </span>
          </div>

          {/* Real-World Boardroom Activity */}
          <div className="p-5 bg-indigo-950/50 rounded-2xl border border-indigo-800 space-y-2">
            <h3 className="text-sm font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="font-bold text-indigo-400 mr-1">{i + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Statutory & Strategy Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C12_BusinessStudiesPlaceChannelsDistributionSim };
export default C12_BusinessStudiesPlaceChannelsDistributionSim;
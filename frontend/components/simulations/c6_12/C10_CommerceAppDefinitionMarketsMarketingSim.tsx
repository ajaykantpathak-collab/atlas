'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

// Node IDs as string literals
const NODE_C10_COMMAPP_001 = 'c10_commapp_001';
const NODE_C10_COMMAPP_002 = 'c10_commapp_002';
const NODE_C10_COMMAPP_003 = 'c10_commapp_003';
const NODE_C10_COMMAPP_004 = 'c10_commapp_004';
const NODE_C10_COMMAPP_005 = 'c10_commapp_005';
const NODE_C10_COMMAPP_006 = 'c10_commapp_006';
const NODE_C10_COMMAPP_007 = 'c10_commapp_007';
const NODE_C10_COMMAPP_008 = 'c10_commapp_008';
const NODE_C10_COMMAPP_009 = 'c10_commapp_009';
const NODE_C10_COMMAPP_010 = 'c10_commapp_010';

const ALL_NODE_IDS = [
  NODE_C10_COMMAPP_001,
  NODE_C10_COMMAPP_002,
  NODE_C10_COMMAPP_003,
  NODE_C10_COMMAPP_004,
  NODE_C10_COMMAPP_005,
  NODE_C10_COMMAPP_006,
  NODE_C10_COMMAPP_007,
  NODE_C10_COMMAPP_008,
  NODE_C10_COMMAPP_009,
  NODE_C10_COMMAPP_010,
];

// Narrative Scenario
const SCENARIO = {
  title: 'BharatBrands Incubation Challenge',
  intro: 'You are appointed Chief Marketing Strategist at BharatBrands FMCG & Services incubator in Bengaluru. Your mission is to conceptualise, price, distribute, brand, and promote high-impact Indian market offerings across rural, semi-urban, and metro markets.',
  context: 'Navigate real Indian business realities: from Amul dairy supply chains and Tata Motors product launches to Patanjali swadeshi positioning, Maggi brand revival, and Jio penetration warfare.'
};

// Prediction Questions (Brilliant.org Predict-then-Verify Pattern)
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'Prediction: If a FMCG brand doubles its retail store presence (Place) without changing Price or Quality, what will happen to unit profit margin?',
    options: [
      'Unit profit margin stays unchanged because margin depends on Price minus Unit Cost',
      'Unit profit margin doubles automatically',
      'Unit profit margin drops to zero immediately',
      'Unit profit margin becomes negative due to advertising laws'
    ],
    correctIndex: 0,
    explanation: 'Place expansion increases total sales volume and market reach, but unit margin (MRP − Unit Cost) remains identical unless production economies of scale or distributor discounts are altered.',
    verifyInstruction: 'Go to Lab 1 (4 Ps Mix Engine) and adjust Place Outlets from 1,000 to 10,000 while keeping Price and Quality constant to verify that unit profit margin stays flat.'
  },
  {
    id: 'pred_2',
    question: 'Prediction: In the Introduction stage of a brand-new product category life cycle, what will the net profit be?',
    options: [
      'Negative (net loss) due to massive initial R&D, tooling, and promotional launch expenditures',
      'Highest profit in the entire life cycle',
      'Equal to the maturity stage profit',
      'Exactly zero because taxes cancel out revenues'
    ],
    correctIndex: 0,
    explanation: 'During category introduction, sales volume is low while capital expenditures for R&D, manufacturing setup, and educational launch promotion are peak, producing negative net profits.',
    verifyInstruction: 'Go to Lab 2 (Product Life Cycle) and click Stage 1 (Intro) to verify that the profit curve is in the negative red zone.'
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between Price and Unit Profit Margin in the 4 Ps Mix Engine?',
    observableOptions: [
      'As Price increases, unit profit margin increases proportionally (✓)',
      'As Price increases, unit profit margin decreases (✗)',
      'Price has no effect on unit profit margin (✗)',
      'Unit profit margin is always zero regardless of Price (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'In the Product Life Cycle simulation, what happens to net profit during the Growth stage compared to Introduction?',
    observableOptions: [
      'Net profit rises sharply as sales volume increases and unit costs fall (✓)',
      'Net profit stays negative like Introduction (✗)',
      'Net profit drops to zero (✗)',
      'Net profit becomes unpredictable and random (✗)',
    ],
    correctIndex: 0,
  },
];

// Discovery Question
const DISCOVERY_QUESTION = {
  question: 'When Reliance Jio gave away SIM cards with free 4G data & voice for 6 months in Sept 2016 to gain 10 crore users, what was their core pricing strategy?',
  options: [
    'Skimming Strategy (skimming high revenue from early rich adopters)',
    'Penetration Strategy (setting rock-bottom/free prices to capture mass volume quickly)',
    'Parity Pricing (matching Airtel and Vodafone price-to-price)',
    'Cost-Plus Pricing (taking data tower costs and adding a 30% margin)'
  ],
  correctIndex: 1,
  hintAfter: "Don't worry if you thought 'skimming' meant stealing customers! In commerce, 'skimming' means skimming high-value cream like Apple. Jio did penetration pricing!",
};

// Challenge Interface
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

// 22 Challenges spanning all 10 nodes
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_mkt_def',
    nodeId: NODE_C10_COMMAPP_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the Chartered Institute of Marketing (CIM) and ICSE syllabus, what are the three core stages of marketing in correct chronological order?',
    options: [
      'Identification → Anticipation → Satisfaction (profitably)',
      'Advertising → Selling → Billing',
      'Production → Distribution → Promotion',
      'Pricing → Wholesaling → Retailing'
    ],
    correctIndex: 0,
    explanation: 'Marketing identifies customer needs via research, anticipates future demand trends, and satisfies those needs profitably. Selling & advertising occur only in the final satisfaction stage.',
    hints: [
      'You cannot satisfy a need you have not researched or forecasted.',
      'It starts with discovering what customers lack through surveys.',
      'The sequence is: Identify customer need, Anticipate future demand, Satisfy profitably.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_02_non_trad',
    nodeId: NODE_C10_COMMAPP_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Eureka Forbes built a ₹2,000 crore empire in India by sending Aquaguard demonstrators to households in Pune for live water-testing. Which non-traditional market form is this?',
    options: [
      'Direct Sales Market (face-to-face demonstration by company representative)',
      'E-Market platform',
      'Catalogue Market',
      'Tele-market'
    ],
    correctIndex: 0,
    explanation: 'Direct selling involves face-to-face interaction and demonstration by the firm\'s own representative at the buyer’s home or workplace without a physical retail store.',
    hints: [
      'Think about whether the demonstrator meets the buyer in person.',
      'No shop or intermediary website was involved; a human demonstrator visited the living room.',
      'This is direct sales because the company’s own staff sold face-to-face.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_03_ihip_features',
    nodeId: NODE_C10_COMMAPP_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the IHIP service characteristic to the Indian market situation.',
    dragItems: [
      { label: 'Intangibility', targetId: 'target_apollo' },
      { label: 'Perishability', targetId: 'target_ola' },
      { label: 'Inseparability', targetId: 'target_haircut' },
      { label: 'Heterogeneity', targetId: 'target_consult' }
    ],
    correctMapping: {
      target_apollo: 'Intangibility',
      target_ola: 'Perishability',
      target_haircut: 'Inseparability',
      target_consult: 'Heterogeneity'
    },
    explanation: 'Intangible (Apollo surgery cannot be held in hand); Perishable (an empty 2 PM Ola ride cannot be saved for 6 PM peak); Inseparable (Lakmé haircut is created and consumed at the exact same moment); Heterogeneous (doctor consultation depth varies with every patient).',
    hints: [
      'Perishability means unused capacity is lost forever if not consumed immediately.',
      'Inseparability means the service provider and customer must interact during production.',
      'Intangibility is the inability to touch, while Heterogeneity is variation in delivery.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_04_cost_plus_calc',
    nodeId: NODE_C10_COMMAPP_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Amul incurs a production and packaging cost of ₹48 to manufacture a 500g butter brick. If GCMMF applies a Cost-Plus pricing margin of 25% on cost, what is the selling MRP in ₹?',
    correctAnswer: 60,
    tolerance: 0.5,
    unit: '₹',
    explanation: 'Cost-Plus Price = Cost × (1 + Margin%) = ₹48 × (1 + 0.25) = ₹48 × 1.25 = ₹60. In ICSE Commerce, markup is computed directly on cost.',
    hints: [
      'Formula: Price = Cost × (1 + Margin%).',
      'Calculate 25% of ₹48 first: 0.25 × 48 = 12.',
      'Add profit of ₹12 to cost ₹48 to get ₹60.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_05_plc_stages',
    nodeId: NODE_C10_COMMAPP_005,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the 5 Product Life Cycle stages in the chronological order of a category lifecycle.',
    sortItems: [
      'Introduction (Heavy R&D/launch losses, building trial)',
      'Growth (Rapid sales surge, profit turns positive)',
      'Maturity (Peak volume, fierce battle for market share)',
      'Saturation (Plateau, pure replacement demand)',
      'Decline (Sales fall as superior substitutes take over)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The classic Theodore Levitt PLC sequence progresses from Introduction → Growth → Maturity → Saturation → Decline.',
    hints: [
      'Introduction comes first when heavy launch costs create initial negative profits.',
      'Growth is followed by Maturity (peak sales) and Saturation (plateau).',
      'Decline is the final stage when substitutes replace the category.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_06_4p_consistency',
    nodeId: NODE_C10_COMMAPP_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A manufacturer creates a ₹5 plastic disposable pen, prices it at ₹850, restricts distribution strictly to 5-star Taj Hotel boutiques, and advertises in luxury architectural magazines. Why does this mix fail?',
    options: [
      'Lack of 4P Marketing Mix Consistency (Contradictory product quality, price, and place signals)',
      'Because ballpoint pens are illegal in hotel lobbies',
      'Because promotion was done without newspaper coupons',
      'Because the company forgot the 5th P (Packaging)'
    ],
    correctIndex: 0,
    explanation: 'Mix consistency requires all 4 Ps to tell one unified value story. A ₹5 utility pen cannot command a luxury price or justify boutique placement without causing immediate customer rejection.',
    hints: [
      'Look at whether the 4 Ps harmonize or contradict one another.',
      'Can a basic plastic pen be bought for ₹850 by luxury guests?',
      'The 4 Ps must be internally aligned with the target customer profile.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_07_channel_count',
    nodeId: NODE_C10_COMMAPP_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Hindustan Unilever manufactures Surf Excel at its Dapada factory. It ships to a Carrying & Forwarding Distributor (Wholesaler), who supplies 400 local Kirana shops (Retailers), who sell to households. How many channel levels is this?',
    options: [
      'Two-level channel (Wholesaler + Retailer)',
      'Four-level channel (Manufacturer + Wholesaler + Retailer + Consumer)',
      'Three-level channel',
      'One-level channel'
    ],
    correctIndex: 0,
    explanation: 'Channel levels count ONLY independent intermediaries between producer and consumer. Manufacturer and consumer are NEVER counted. Intermediaries = Wholesaler (1) + Retailer (2) = Two-level channel.',
    hints: [
      'Remember the ICSE counting rule: exclude the producer and the final consumer!',
      'Count only independent businesses in the middle.',
      'Wholesaler + Retailer = 2 independent intermediary levels.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_08_adv_vs_pub',
    nodeId: NODE_C10_COMMAPP_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'On 11 Jan 2008, Times of India ran a front-page editorial: "Ratan Tata unveils ₹1 lakh People\'s Car". On page 5, Tata Motors placed a full-page photo ad with dealer phone numbers. How are these two classified?',
    options: [
      'Front-page news = Publicity (unpaid, editorial); Page 5 ad = Advertising (paid, identified sponsor)',
      'Both are advertising because both promote Tata Nano',
      'Both are publicity because Ratan Tata is famous',
      'Front-page news = Sales promotion; Page 5 ad = Direct selling'
    ],
    correctIndex: 0,
    explanation: 'The decisive test is payment and control. Tata did not pay TOI for the news report (Publicity = unpaid, high credibility, uncontrolled). Tata paid for the Page 5 ad (Advertising = paid, identified sponsor, controlled message).',
    hints: [
      'Did the company pay the newspaper for the front-page editorial story?',
      'Advertising is always paid for by an identified sponsor.',
      'Publicity is earned news coverage that is unpaid and independent.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_09_adv_types',
    nodeId: NODE_C10_COMMAPP_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The Government of India broadcasts a TV advertisement featuring Sachin Tendulkar urging citizens to use toilets and keep public spaces clean under Swachh Bharat Abhiyan. Which type of advertising is this?',
    options: [
      'Social-Service Advertising (objective is public behavioral & social change)',
      'Institutional Advertising (because Government is an institution)',
      'Product Advertising',
      'Financial Advertising'
    ],
    correctIndex: 0,
    explanation: 'Advertising type is determined by its OBJECTIVE, not the sponsor. Swachh Bharat aims at behavioural reform for public hygiene (Social-Service). Institutional ads aim at building corporate image.',
    hints: [
      'Look at what the ad is attempting to achieve: sell a good, build a company image, or change public social behaviour?',
      'Urging people to stop open defecation is a societal welfare mission.',
      'The objective is public social welfare → Social-Service Advertising.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_10_loyalty_vs_equity',
    nodeId: NODE_C10_COMMAPP_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In 2015, Nestlé Maggi was banned for 5 months due to FSSAI lead allegations. In Nov 2015, millions of Indian households rushed to buy Maggi on its relaunch, helping Brand Finance value Maggi at ₹1,200 crore in 2023. What does this demonstrate?',
    options: [
      'Brand Loyalty (individual repeat-buying behaviour) acted as a buffer to protect and rebuild Brand Equity (firm-level monetary brand valuation)',
      'Brand Equity and Brand Loyalty are identical terms with no distinction',
      'Brand Loyalty is measured in rupees, Brand Equity is measured in kilograms',
      'Maggi survived only because of zero-level direct selling'
    ],
    correctIndex: 0,
    explanation: 'Brand Loyalty is customer behaviour (repeated purchase despite crises); Brand Equity is the financial value in rupees added by the brand name (₹1,200 cr). Deep customer loyalty shielded the equity from destruction.',
    hints: [
      'One is customer psychological habit/behaviour; the other is the rupee asset valuation.',
      'Customer loyalty means people returned as soon as it hit shelves.',
      'That behavioral trust saved the ₹1,200 crore monetary brand equity.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_11_skimming_vs_pen',
    nodeId: NODE_C10_COMMAPP_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Apple launches the iPhone 15 Pro Max at ₹1,59,900 in Mumbai, targeting inelastic high-income buyers before releasing trade-in discounts later. Xiaomi launched Redmi 1S at ₹6,999 in 2014 to capture 40% online market share. Which pair of strategies was used?',
    options: [
      'Apple: Skimming Strategy | Xiaomi: Penetration Strategy',
      'Apple: Cost-Plus Pricing | Xiaomi: Parity Pricing',
      'Apple: Penetration Strategy | Xiaomi: Skimming Strategy',
      'Apple: Parity Pricing | Xiaomi: Discriminatory Pricing'
    ],
    correctIndex: 0,
    explanation: 'Apple used Skimming (high launch price skimming the top layer with inelastic demand). Xiaomi used Penetration (low launch price in price-sensitive mass segment to capture quick market share).',
    hints: [
      'High price for premium innovation = Skimming.',
      'Low entry price to grab volume = Penetration.',
      'Apple = Skimming; Xiaomi Redmi 1S = Penetration.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_12_goods_vs_serv_fd',
    nodeId: NODE_C10_COMMAPP_003,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "An SBI Fixed Deposit is a tangible product because the bank hands over a paper fixed deposit certificate with an interest rate printed on it." How should a commerce scholar evaluate this?',
    options: [
      'Incorrect. The FD is a financial service; the paper certificate is merely legal proof of deposit. No physical object is sold and principal ownership is retained by the depositor',
      'Correct. Any offering that comes with a printed paper is a physical consumer good',
      'Incorrect. It is an industrial raw material',
      'Correct. Because interest acts as product warranty'
    ],
    correctIndex: 0,
    explanation: 'The paper receipt is documentation, not the core offering. The FD is an intangible financial service: the bank performs the ongoing activity of safeguarding money and paying interest without transferring asset ownership.',
    hints: [
      'Does ownership of the money transfer permanently like buying soap, or is it lent?',
      'The certificate is only evidence of an intangible contractual agreement.',
      'It is a consumer financial service, not a tangible product.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_13_amul_multi_tier',
    nodeId: NODE_C10_COMMAPP_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does Amul (GCMMF) use a multi-level cooperative channel (Village Society → District Union → State Federation → Distributor → Retailer) instead of a direct zero-level channel despite milk being perishable?',
    options: [
      'To aggregate micro-surpluses from 36 lakh scattered rural dairy farmers and feed cold-chain processing into millions of urban homes',
      'Because cooperative laws prohibit direct selling of milk',
      'Because cold storage tankers eliminate the need for retailers',
      'Because zero-level channels are illegal in Gujarat'
    ],
    correctIndex: 0,
    explanation: 'Individual smallholder farmers produce 2-5 litres daily. A multi-tier channel is mandatory to aggregate tiny fragmented quantities into bulk tankers, supported by chilling infrastructure across the distribution chain.',
    hints: [
      'Can one farmer in Anand deliver 3 litres directly to a consumer in Delhi daily?',
      'Aggregation of millions of small rural producers requires cooperative tiers.',
      'The channel solves supply aggregation and processing scale.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_14_plc_chetak_relaunch',
    nodeId: NODE_C10_COMMAPP_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The Bajaj Chetak petrol scooter peaked in the 1990s, faced severe decline against motorcycles like Hero Splendor, and was discontinued in 2005. In Jan 2020, Bajaj re-launched Chetak as an Electric Scooter. In PLC terms, what happened?',
    options: [
      'An Extension & Brand Re-launch Strategy initiated a brand-new Life Cycle for the heritage brand',
      'The old petrol scooter life cycle entered maturity for the second time',
      'The scooter proved that product life cycles never decline',
      'Bajaj violated the Levitt product life cycle rule'
    ],
    correctIndex: 0,
    explanation: 'A re-launch with new technology (EV) does not merely prolong the dead petrol curve; it creates an entirely new Introduction stage and product life cycle under an established heritage brand name.',
    hints: [
      'Did the old petrol scooter revive, or did a new EV product adopt the trusted name?',
      'Re-launching as an EV starts a fresh curve from Introduction stage.',
      'This is an extension/re-launch strategy starting a new PLC.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_15_market_concept',
    nodeId: NODE_C10_COMMAPP_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is a virtual consumer market in India?',
    options: [
      'Amazon India / Flipkart shopping app',
      'Crawford Market fruit stalls in South Mumbai',
      'APMC Wholesale Grain Yard at Vashi',
      'D-Mart Hypermarket at Thane'
    ],
    correctIndex: 0,
    explanation: 'A virtual market operates electronically over the internet without physical face-to-face contact in a shop, yet fulfills all exchange criteria (buyer, seller, good/service, agreed price).',
    hints: [
      'Identify which platform operates on mobile apps/websites rather than physical aisles.',
      'Amazon and Flipkart are digital/e-commerce platforms.',
      'They are virtual markets.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_16_construct_mix',
    nodeId: NODE_C10_COMMAPP_004,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Assemble the 4 Ps for a rural ₹10 fortified iron biscuit "SwasthyaBite" targeting village schools in Bihar.',
    availableParts: ['₹10 Affordable Sachet', 'Village Haats & Kiranas', 'AIR Rural Radio & School Demos', 'Fortified Iron Biscuit'],
    targetState: 'Fortified Iron Biscuit ₹10 Affordable Sachet Village Haats & Kiranas AIR Rural Radio & School Demos',
    validationHint: 'Select in order: Product → Price → Place → Promotion',
    explanation: 'A well-aligned 4P rural mix: Product (Fortified Iron Biscuit) + Price (₹10 Sachet) + Place (Village Haats & Kiranas) + Promotion (AIR Radio & School Demos).',
    hints: [
      'Start with Product, then Price, then Place, then Promotion.',
      'Product is the fortified biscuit; Price is ₹10 sachet.',
      'Place is village haats; Promotion is AIR radio and school sampling.'
    ]
  },
  {
    id: 'ch_17_maggi_negative_pub',
    nodeId: NODE_C10_COMMAPP_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A marketer asserts: "Publicity is always superior to advertising because it costs zero media rupees." Why is this statement dangerously flawed?',
    options: [
      'Publicity is uncontrolled by the company; negative news (e.g. 2015 Maggi lead scare) can destroy brand value, whereas advertising offers message control',
      'Publicity is illegal under the Consumer Protection Act 2019',
      'Advertising is always free on digital platforms',
      'Publicity cannot be carried by newspapers'
    ],
    correctIndex: 0,
    explanation: 'Publicity is a double-edged sword. While credible and unpaid, the firm has ZERO control over tone, timing, or content. Unfavourable news coverage can cause catastrophic losses that no ad could create.',
    hints: [
      'Can a company stop a news reporter from exposing a product defect?',
      'Consider the Maggi 2015 crisis: news reports caused ₹400+ cr losses.',
      'Publicity lacks company message control.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_18_adv_features',
    nodeId: NODE_C10_COMMAPP_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT a mandatory feature of commercial advertising?',
    options: [
      'Personal face-to-face consultation with each customer',
      'Paid form of communication',
      'Identified sponsor named in the message',
      'Transmission through mass media'
    ],
    correctIndex: 0,
    explanation: 'Advertising is explicitly NON-PERSONAL. Face-to-face consultation is the defining attribute of Personal/Direct Selling, not advertising.',
    hints: [
      'Review the 4-part definition: Paid, Non-personal, Identified sponsor, Mass medium.',
      'Face-to-face talk is personal selling.',
      'Advertising uses non-personal mass communication.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_19_market_basis_apmc',
    nodeId: NODE_C10_COMMAPP_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Classify APMC Vashi wholesale agricultural market on the 4 ICSE bases (Geography, Time, Transaction, Competition):',
    options: [
      'Regional | Very Short Period (Daily Auction) | Spot Market | Approximates Perfect Competition',
      'International | Long Period | Future Market | Pure Monopoly',
      'Local | Short Period | Future Market | Monopolistic Competition',
      'National | Very Short Period | Future Market | Oligopoly'
    ],
    correctIndex: 0,
    explanation: 'APMC Vashi serves Maharashtra (Regional), prices fluctuate daily by auction (Very Short Period), delivery occurs on payment (Spot), and has numerous farmers/agents selling homogeneous onions (Approximates Perfect Competition).',
    hints: [
      'Geography: serves Maharashtra state. Time: daily morning auctions.',
      'Transaction: immediate physical delivery against cash.',
      'Competition: many buyers/sellers of identical agricultural produce.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_20_trademark_act',
    nodeId: NODE_C10_COMMAPP_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under which Indian statutory Act is a brand name, logo, or mark granted legal protection against duplication?',
    options: [
      'Trade Marks Act, 1999',
      'Companies Act, 2013',
      'Consumer Protection Act, 2019',
      'Indian Partnership Act, 1932'
    ],
    correctIndex: 0,
    explanation: 'The Trade Marks Act, 1999 gives brand owners exclusive statutory rights to use their registered brand name/symbol and prevent infringement in India.',
    hints: [
      'Look for the Act specifically named after trade marks.',
      'It was passed in 1999 replacing the 1958 Merchandise Marks act.',
      'Trade Marks Act, 1999.'
    ]
  },
  {
    id: 'ch_21_maruti_cost_plus',
    nodeId: NODE_C10_COMMAPP_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Maruti Suzuki incurs total manufacturing and overhead costs of ₹5,00,000 to assemble a Swift hatchback. If it targets an 18% cost-plus markup, what is the ex-showroom invoice price in ₹?',
    correctAnswer: 590000,
    tolerance: 1000,
    unit: '₹',
    explanation: 'Ex-showroom Price = ₹5,00,000 × (1 + 0.18) = ₹5,00,000 × 1.18 = ₹5,90,000. Profit margin is ₹90,000.',
    hints: [
      'Cost × (1 + Margin%).',
      '18% of 5,00,000 = 90,000.',
      '5,00,000 + 90,000 = 5,90,000.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_22_adv_vs_sales_promo',
    nodeId: NODE_C10_COMMAPP_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Colgate runs a "Strong Teeth" TV commercial on Star Plus every evening for 5 years, while offering a "₹15 off on 200g pack" sticker coupon at DMart for 2 weeks. How do their strategic horizons differ?',
    options: [
      'TV Commercial = Advertising (Long-term brand equity & awareness) | ₹15 Sticker = Sales Promotion (Short-term immediate purchase incentive)',
      'Both are short-term sales promotions with zero brand equity value',
      'TV Commercial = Direct selling | Sticker = Institutional advertising',
      'Both are publicity because DMart is an intermediary'
    ],
    correctIndex: 0,
    explanation: 'Advertising builds enduring psychological brand recall and equity over years. Sales promotion provides an immediate, time-bound economic trigger to accelerate purchasing volume in the short term.',
    hints: [
      'One is repeated over 5 years to build mindshare; one lasts 2 weeks to clear inventory.',
      'Advertising is strategic & long-term; Sales Promotion is tactical & short-term.',
      'TV ad = Advertising; ₹15 sticker = Sales Promotion.'
    ]
  }
];

// 5 Interactive Guided Exploration Steps
const EXPLORATION_STEPS = [
  {
    title: 'Stage 1: The 4 Ps Marketing Mix Engine',
    instruction: 'Adjust the 4 Ps sliders (Quality R&D, Price, Distribution Outlets, Media Promotion) to balance customer adoption and profit margin.',
    interactionType: 'slider-4p-balance',
    nodeId: NODE_C10_COMMAPP_004,
  },
  {
    title: 'Stage 2: Product Life Cycle (PLC) Simulator',
    instruction: 'Click each stage of the life cycle (Intro → Growth → Maturity → Saturation → Decline) to observe how sales and profit curves behave.',
    interactionType: 'click-plc-stages',
    nodeId: NODE_C10_COMMAPP_005,
  },
  {
    title: 'Stage 3: Pricing Strategy Laboratory',
    instruction: 'Test Cost-Plus, Penetration, Skimming, and Parity pricing models against market adoption rates and unit margins.',
    interactionType: 'pricing-strategy-test',
    nodeId: NODE_C10_COMMAPP_006,
  },
  {
    title: 'Stage 4: Distribution Channel Flow (Place)',
    instruction: 'Switch between Zero-level (Eureka Forbes), 1-level (Car dealer), 2-level (FMCG Kirana), and 3-level (Amul) to see intermediary margins and control.',
    interactionType: 'channel-flow-visualizer',
    nodeId: NODE_C10_COMMAPP_007,
  },
  {
    title: 'Stage 5: Promotion & Brand Equity Matrix',
    instruction: 'Balance Advertising, Direct Selling, Sales Promotion, and PR to see how Brand Loyalty builds Brand Equity over time.',
    interactionType: 'brand-equity-matrix',
    nodeId: NODE_C10_COMMAPP_010,
  },
];

// Real-World Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Marketing Officer (CMO) Blueprint',
  description: 'Select an authentic Indian product (e.g. Tata EV, Paper Boat Aamras, or Mamaearth Rice Water Shampoo). Structure its full Marketing Plan across 4 Ps, target PLC stage, distribution channel count, and brand defense plan.',
  steps: [
    'Specify Target Market Segment & Value Proposition',
    'Design the 4 Ps: Product Specs, Price Strategy (Skimming/Penetration/Cost-Plus), Distribution Channel (0-3 level), Promotion Mix',
    'Map expected Product Life Cycle curve and launch strategy',
    'Formulate a Brand Loyalty strategy to safeguard long-term Brand Equity against competitor price wars'
  ]
};

// Props Interface
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

// Default Props
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_COMMAPP_001,
  title: 'Markets, Marketing & 4 Ps Mix Mastery',
  definition: 'A market is any physical or virtual arrangement where buyers and sellers exchange goods/services for a price. Marketing is the comprehensive process of identifying, anticipating, and satisfying customer needs profitably via the 4 Ps (Product, Price, Place, Promotion).',
  eli5: 'Markets are where buying and selling happen. Marketing is figuring out what people need, making it, pricing it right, bringing it to their neighbourhood, and making them excited to buy it repeatedly.',
  misconceptions: [
    {
      misconception: 'Amazon India is a direct sales market because goods are delivered to my door.',
      correction: 'Direct sales requires face-to-face selling by the company\'s own representative (e.g. Eureka Forbes). Amazon is an e-market intermediary platform.'
    },
    {
      misconception: 'Marketing and selling are the exact same thing.',
      correction: 'Selling focuses on converting existing goods into cash. Marketing begins before production (research & forecasting) and continues after sales.'
    },
    {
      misconception: 'An SBI Fixed Deposit is a product because it has a printed certificate.',
      correction: 'An FD is an intangible financial service. The certificate is merely legal evidence; no physical object is purchased or transferred.'
    },
    {
      misconception: 'Jio giving free SIMs was skimming because it skimmed users from rivals.',
      correction: 'In pricing, skimming means setting a high launch price like Apple. Jio used penetration pricing (free/low prices to capture mass volume).'
    },
    {
      misconception: 'Product life cycle tracks the physical lifespan or warranty of a single machine.',
      correction: 'PLC tracks aggregate market demand for a product category or brand over time, not the physical wear and tear of a unit.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is a market in modern commerce?', options: ['Only a physical bazaar', 'Any physical or virtual space of exchange at a price', 'A government office', 'A bank vault'], correctIndex: 1 },
    { question: 'What is the correct order of marketing stages?', options: ['Identify → Anticipate → Satisfy', 'Sell → Produce → Price', 'Advertise → Ship → Bill', 'Stock → Discount → Profit'], correctIndex: 0 },
    { question: 'Which is a consumer service?', options: ['Lifebuoy soap', 'Apollo cardiac consultation', 'Tata Steel billet', 'Amul butter pack'], correctIndex: 1 },
    { question: 'Which pricing strategy sets price equal to competitors?', options: ['Skimming', 'Penetration', 'Parity', 'Cost-Plus'], correctIndex: 2 }
  ],
  masteryCriteria: 'Student can analyze market forms, compute cost-plus pricing, design balanced 4P mixes, map PLC stages, categorize distribution channels, and distinguish brand loyalty from brand equity with authentic Indian business cases.'
};

function C10_CommerceAppDefinitionMarketsMarketingSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_COMMAPP_001,
  title = DEFAULT_PROPS.title || 'Markets & Marketing Masterclass',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['commapp'] || { name: 'Commercial Applications', emoji: '📈', color: 'blue' };

  // Phase flow: discovery -> predict -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Prediction states (Brilliant.org pattern)
  const [currentPredictionIdx, setCurrentPredictionIdx] = useState<number>(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});

  // 4 Ps Interactive Lab States
  const [productQuality, setProductQuality] = useState<number>(75);
  const [priceSlider, setPriceSlider] = useState<number>(60);
  const [outletsCount, setOutletsCount] = useState<number>(5000);
  const [promoSpend, setPromoSpend] = useState<number>(30);
  const [targetSegment, setTargetSegment] = useState<'mass' | 'premium'>('mass');

  // PLC Interactive States
  const [selectedPlcStage, setSelectedPlcStage] = useState<number>(2);

  // Pricing Strategy Interactive States
  const [unitCost, setUnitCost] = useState<number>(50);
  const [selectedPricingMode, setSelectedPricingMode] = useState<'cost-plus' | 'skimming' | 'penetration' | 'parity'>('cost-plus');
  const [markupPercent, setMarkupPercent] = useState<number>(25);

  // Distribution Channel Interactive States
  const [selectedChannelLevel, setSelectedChannelLevel] = useState<number>(2);

  // Promotion & Brand Equity States
  const [advBudget, setAdvBudget] = useState<number>(40);
  const [prBudget] = useState<number>(15);
  const [simulatedLoyaltyYears, setSimulatedLoyaltyYears] = useState<number>(5);

  // Challenge Engine States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Hints and answers
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Drag & Drop / Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Canvas Animation Ref for Live Market Flow
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.025;
      const width = (canvas.width = canvas.offsetWidth);
      const height = (canvas.height = canvas.offsetHeight);

      ctx.clearRect(0, 0, width, height);

      // Draw background network grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 4 Distribution Network Hubs
      const nodes = [
        { label: 'Producers', x: width * 0.12, y: height * 0.5, color: '#38bdf8' },
        { label: 'C&F Wholesaler', x: width * 0.38, y: height * 0.5, color: '#f59e0b' },
        { label: 'Kirana Retailers', x: width * 0.65, y: height * 0.5, color: '#a855f7' },
        { label: 'Urban & Rural Buyers', x: width * 0.90, y: height * 0.5, color: '#10b981' }
      ];

      // Draw channel connection pipelines
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
      }
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Flowing market trade particles
      for (let i = 0; i < 7; i++) {
        const progress = (t * 0.28 + i * 0.15) % 1;
        const segmentCount = nodes.length - 1;
        const currentSegment = Math.min(Math.floor(progress * segmentCount), segmentCount - 1);
        const segmentProgress = (progress * segmentCount) % 1;

        const startNode = nodes[currentSegment];
        const endNode = nodes[currentSegment + 1];

        const px = startNode.x + (endNode.x - startNode.x) * segmentProgress;
        const py = startNode.y + Math.sin(progress * Math.PI * 4 + i) * 6;

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#60a5fa';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw distribution hubs
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 13, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 9.5px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 24);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase, currentSlide]);

  // Derived 4P Mix Simulator Metrics
  const calculated4PMetrics = useMemo(() => {
    const expectedPriceForQuality = targetSegment === 'mass' ? 20 + productQuality * 0.5 : 80 + productQuality * 1.5;
    const priceFitRatio = expectedPriceForQuality / (priceSlider || 1);
    const reachFactor = outletsCount / 10000;
    const awarenessFactor = Math.min(1.0, promoSpend / 50);

    const customerAdoption = Math.max(5, Math.min(100, Math.round(50 * priceFitRatio * reachFactor * (0.5 + awarenessFactor * 0.5))));
    const unitMargin = Math.max(-10, Math.round(priceSlider - (productQuality * 0.4 + 15)));
    const projectedMonthlyProfitLakhs = Math.round((customerAdoption * 1000 * unitMargin) / 100000);

    let consistencyVerdict = 'Balanced Mix';
    if (priceSlider > 100 && productQuality < 50) {
      consistencyVerdict = 'Inconsistent: Overpriced low-quality item';
    } else if (priceSlider < 40 && targetSegment === 'premium') {
      consistencyVerdict = 'Inconsistent: Price too low for premium positioning';
    } else if (outletsCount < 1000 && targetSegment === 'mass') {
      consistencyVerdict = 'Weak Place: Mass product needs wide retail distribution';
    }

    return { customerAdoption, unitMargin, projectedMonthlyProfitLakhs, consistencyVerdict };
  }, [productQuality, priceSlider, outletsCount, promoSpend, targetSegment]);

  // Derived Pricing Calculations
  const calculatedPricingMetrics = useMemo(() => {
    let price = 0;
    let desc = '';
    if (selectedPricingMode === 'cost-plus') {
      price = unitCost * (1 + markupPercent / 100);
      desc = `Cost-Plus: ₹${unitCost} cost + ${markupPercent}% margin = ₹${price.toFixed(2)}`;
    } else if (selectedPricingMode === 'skimming') {
      price = unitCost * 2.8;
      desc = `Skimming: High launch pricing (₹${price.toFixed(2)}) skimming affluent early adopters.`;
    } else if (selectedPricingMode === 'penetration') {
      price = unitCost * 1.05;
      desc = `Penetration: Low introductory price (₹${price.toFixed(2)}) to grab massive market share.`;
    } else if (selectedPricingMode === 'parity') {
      price = unitCost * 1.35;
      desc = `Parity: Matching standard competitor market benchmark at ₹${price.toFixed(2)}.`;
    }
    const marginPerUnit = price - unitCost;
    return { price, marginPerUnit, desc };
  }, [unitCost, selectedPricingMode, markupPercent]);

  // Derived PLC Stage Data for Recharts
  const plcChartData = useMemo(() => {
    return [
      { stage: 'Intro', sales: 15, profit: -20, desc: 'Jio 2016 (Free data, heavy Capex)' },
      { stage: 'Growth', sales: 65, profit: 35, desc: 'Ola Electric S1 (Rapid scaling)' },
      { stage: 'Maturity', sales: 100, profit: 85, desc: 'Jio 2024 / Maggi (Peak volume & profit)' },
      { stage: 'Saturation', sales: 92, profit: 70, desc: 'Feature phones (Pure replacement)' },
      { stage: 'Decline', sales: 30, profit: 5, desc: 'DVDs / Landlines (Substituted)' },
    ];
  }, []);

  // Derived Brand Equity / Loyalty Simulator
  const calculatedBrandEquity = useMemo(() => {
    const baseEquity = (advBudget * 1.2 + prBudget * 1.5 + simulatedLoyaltyYears * 8);
    const calculatedCrores = Math.round(baseEquity * 10);
    const premiumPercentage = Math.min(60, Math.round(simulatedLoyaltyYears * 4 + advBudget * 0.3));
    return { calculatedCrores, premiumPercentage };
  }, [advBudget, prBudget, simulatedLoyaltyYears]);

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty via BKT after answers
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

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Escalating hints callback
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
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
      speechManager.speak('Let us review the step-by-step ICSE solution.');
    }
  }, [hintCount, challenge]);

  // Discovery answer handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Superb! You understand penetration pricing.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  // Prediction Submit Handler
  const handlePredictionSubmit = useCallback((predIdx: number, optIdx: number) => {
    setPredictionSelected(optIdx);
    setPredictionSubmitted(true);
    setPredictionAnswers(prev => ({ ...prev, [predIdx]: optIdx }));
    const currentPred = PREDICTION_QUESTIONS[predIdx];
    if (optIdx === currentPred.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Great prediction! Now let us verify it in the lab.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Interesting hypothesis. Let us verify it in the lab.');
    }
  }, []);

  // Phase Transitions
  const handleAdvanceToPredict = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
    speechManager.speak('Predict the outcomes before testing them in the laboratory.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive marketing discovery labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with market variables freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the Commercial Applications Mastery Challenges.');
  }, []);

  // Reset auto-hint inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Completion Handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the simulation.`);
  }, [errors, onComplete]);

  // Next Challenge Handler
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

  // General Answer Handler
  const handleAnswer = useCallback(
    (ans: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = ans === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = ans === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Excellent! Correct commercial deduction.');
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
          speechManager.speak('Hints exhausted. Let us study the ICSE model answer.');
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // Drag Handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const expected = challenge.correctMapping?.[targetId];
      if (expected === draggedItem) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Motivational feedback computation
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // Review schedule recommendation
  const srsReviewSchedule = useMemo(() => {
    if (errors === 0) return { days: 7, label: 'Review in 7 days (Optimal Mastery)' };
    if (errors <= 3) return { days: 3, label: 'Review in 3 days (Consolidation)' };
    return { days: 1, label: 'Review in 1 day (Active Reinforcement Required)' };
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-blue-900/40 border border-blue-500/30 rounded-2xl" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">
              ICSE Class 10 Commercial Applications
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border-rose-700'
                : 'bg-blue-950 text-blue-400 border-blue-700'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <div className="text-xs bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
            Mastery: <span className="font-bold text-amber-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* PHASE 1: DISCOVERY HOOK                                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 rounded-2xl border border-blue-800/40">
            <h2 className="text-lg font-bold text-blue-300 flex items-center gap-2">
              <span aria-hidden="true">🎯</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-md">
                Discovery Curiosity Hook
              </span>
            </div>
            <p className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`text-left p-3.5 rounded-xl text-sm border transition-all flex items-center justify-between ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </div>
                  {discoveryAnswered && (
                    <span className="font-bold text-base ml-2">
                      {i === DISCOVERY_QUESTION.correctIndex ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800">
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Penetration pricing captures rapid scale by sacrificing short-term margin for massive customer base.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToPredict}
                    aria-label="Proceed to Brilliant-style Prediction Stage"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 text-sm"
                  >
                    <span>Proceed to Prediction Stage</span>
                    <span aria-hidden="true">→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* PHASE 2: BRILLIANT-STYLE PREDICT-THEN-VERIFY STAGE          */}
      {/* ─────────────────────────────────────────────────────────── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-purple-950/50 via-slate-900 to-blue-950/50 rounded-2xl border border-purple-800/40">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">
              Step 1 of Scientific Inquiry: Predict Before Testing
            </span>
            <h2 className="text-lg font-bold text-white mt-1">
              Hypothesis Formulation ({currentPredictionIdx + 1} of {PREDICTION_QUESTIONS.length})
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Commercial thinkers form hypotheses before running live campaigns. Predict the market outcome below.
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-semibold text-white">
              {PREDICTION_QUESTIONS[currentPredictionIdx].question}
            </h3>

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {PREDICTION_QUESTIONS[currentPredictionIdx].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handlePredictionSubmit(currentPredictionIdx, i)}
                  disabled={predictionSubmitted}
                  className={`text-left p-3.5 rounded-xl text-sm border transition-all flex items-center justify-between ${
                    predictionSubmitted
                      ? i === PREDICTION_QUESTIONS[currentPredictionIdx].correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : predictionSelected === i
                        ? 'bg-rose-950/70 border-rose-600 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'
                  }`}
                >
                  <div>
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </div>
                  {predictionSubmitted && (
                    <span className="font-bold text-sm ml-2">
                      {i === PREDICTION_QUESTIONS[currentPredictionIdx].correctIndex ? '✓ Correct Hypothesis' : ''}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {predictionSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-blue-900/50 space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-blue-400">Scientific Explanation:</strong> {PREDICTION_QUESTIONS[currentPredictionIdx].explanation}
                </p>
                <div className="p-2.5 bg-blue-950/40 rounded-lg border border-blue-800/40 text-xs text-amber-300 font-medium">
                  🔍 <strong className="text-amber-200">How to Verify:</strong> {PREDICTION_QUESTIONS[currentPredictionIdx].verifyInstruction}
                </div>

                <div className="flex justify-end pt-2">
                  {currentPredictionIdx + 1 < PREDICTION_QUESTIONS.length ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setCurrentPredictionIdx(idx => idx + 1);
                        setPredictionSubmitted(false);
                        setPredictionSelected(null);
                        audioManager.play('tap');
                      }}
                      className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg"
                    >
                      Next Prediction Hypothesis →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleAdvanceToExploration}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
                    >
                      Enter Interactive Labs to Verify Predictions →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* PHASE 3: INTERACTIVE GUIDED EXPLORATION (Brilliant Style)   */}
      {/* ─────────────────────────────────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          {/* Real-Time Market Trade Pipeline HTML Canvas Animation */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live HTML5 Simulation Canvas: Pan-India Trade & Logistics Pipeline
              </span>
              <span className="text-slate-500 text-[10px]">requestAnimationFrame Active</span>
            </div>
            <canvas
              ref={canvasRef}
              className="w-full h-24 sm:h-28 rounded-xl bg-slate-950 border border-slate-800"
            />
          </div>

          {/* Progress Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-800 no-scrollbar" role="tablist" aria-label="Exploration Stages">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                role="tab"
                aria-selected={currentSlide === idx}
                aria-label={`Switch to ${step.title}`}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Guided Discovery Lab</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs sm:text-sm text-amber-300 mt-1 flex items-center gap-1.5">
                  <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 0: 4 Ps Marketing Mix Simulator ── */}
              {currentSlide === 0 && (
                <div className="space-y-4 pt-2">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider">
                      SVG Concept Map: The 4 Ps Marketing Mix Interaction
                    </span>
                    <svg
                      viewBox="0 0 500 180"
                      className="w-full max-w-lg h-auto"
                      role="img"
                      aria-label="Diagram showing the 4 Ps of marketing: Product, Price, Place, Promotion centered around Customer Value"
                    >
                      <rect width="500" height="180" rx="12" fill="#0f172a" />
                      <circle cx="250" cy="90" r="38" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                      <text x="250" y="86" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">TARGET</text>
                      <text x="250" y="100" textAnchor="middle" fill="#f8fafc" fontSize="10">CONSUMER</text>

                      <g transform="translate(40, 20)">
                        <rect width="130" height="58" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                        <text x="65" y="24" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">1. PRODUCT</text>
                        <text x="65" y="44" textAnchor="middle" fill="#94a3b8" fontSize="9">Quality, R&D, Packaging</text>
                        <line x1="130" y1="29" x2="175" y2="65" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 2" />
                      </g>

                      <g transform="translate(330, 20)">
                        <rect width="130" height="58" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                        <text x="65" y="24" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">2. PRICE</text>
                        <text x="65" y="44" textAnchor="middle" fill="#94a3b8" fontSize="9">MRP, Discounts, Margins</text>
                        <line x1="0" y1="29" x2="-45" y2="65" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                      </g>

                      <g transform="translate(40, 102)">
                        <rect width="130" height="58" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                        <text x="65" y="24" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">3. PLACE</text>
                        <text x="65" y="44" textAnchor="middle" fill="#94a3b8" fontSize="9">Retail, Kiranas, Logistics</text>
                        <line x1="130" y1="29" x2="175" y2="-5" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
                      </g>

                      <g transform="translate(330, 102)">
                        <rect width="130" height="58" rx="8" fill="#831843" stroke="#ec4899" strokeWidth="2" />
                        <text x="65" y="24" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">4. PROMOTION</text>
                        <text x="65" y="44" textAnchor="middle" fill="#94a3b8" fontSize="9">Ads, TV, PR, Personal Selling</text>
                        <line x1="0" y1="29" x2="-45" y2="-5" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4 2" />
                      </g>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
                    <div className="lg:col-span-6 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300">Target Segment:</label>
                        <div className="flex gap-2">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setTargetSegment('mass')}
                            aria-label="Select Mass FMCG segment"
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              targetSegment === 'mass' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Mass FMCG (Tata Salt / Patanjali)
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setTargetSegment('premium')}
                            aria-label="Select Affluent Luxury segment"
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              targetSegment === 'premium' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Affluent Luxury (Rolex / Apple)
                          </motion.button>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Product Quality & R&D:</span>
                          <span className="font-bold text-blue-400">{productQuality}/100</span>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={100}
                          value={productQuality}
                          aria-label="Adjust product quality from 20 to 100"
                          onChange={e => {
                            setProductQuality(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-blue-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Price P (MRP in ₹):</span>
                          <span className="font-bold text-emerald-400">₹{priceSlider}</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={200}
                          value={priceSlider}
                          aria-label="Adjust MRP price in rupees from 10 to 200"
                          onChange={e => {
                            setPriceSlider(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Place P (Retail Stockists / Outlets):</span>
                          <span className="font-bold text-amber-400">{outletsCount.toLocaleString()} outlets</span>
                        </div>
                        <input
                          type="range"
                          min={500}
                          max={10000}
                          step={500}
                          value={outletsCount}
                          aria-label="Adjust retail outlets count from 500 to 10000"
                          onChange={e => {
                            setOutletsCount(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Promotion P (TV / Digital Ad Spend):</span>
                          <span className="font-bold text-pink-400">₹{promoSpend} Lakhs</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={50}
                          value={promoSpend}
                          aria-label="Adjust promotion budget in lakhs from 5 to 50"
                          onChange={e => {
                            setPromoSpend(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-pink-500"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Live 4P Mix Performance</h4>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                            <p className="text-xs text-slate-400">Market Adoption</p>
                            <p className="text-xl font-black text-blue-400">{calculated4PMetrics.customerAdoption}%</p>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                              <motion.div
                                className="h-full bg-blue-500"
                                animate={{ width: `${calculated4PMetrics.customerAdoption}%` }}
                              />
                            </div>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                            <p className="text-xs text-slate-400">Unit Profit Margin</p>
                            <p
                              className={`text-xl font-black ${
                                calculated4PMetrics.unitMargin >= 0 ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {calculated4PMetrics.unitMargin >= 0 ? '✓ ' : '✗ '}₹{calculated4PMetrics.unitMargin}
                            </p>
                            <p className="text-[10px] text-slate-500">Price minus product cost</p>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 mt-3">
                          <p className="text-xs text-slate-400">Estimated Monthly Profit</p>
                          <p className="text-lg font-bold text-amber-400">₹{calculated4PMetrics.projectedMonthlyProfitLakhs} Lakhs</p>
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-xl text-xs font-bold border ${
                          calculated4PMetrics.consistencyVerdict.includes('Inconsistent')
                            ? 'bg-rose-950/60 border-rose-700 text-rose-300'
                            : calculated4PMetrics.consistencyVerdict.includes('Weak')
                            ? 'bg-amber-950/60 border-amber-700 text-amber-300'
                            : 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                        }`}
                      >
                        <span>
                          {calculated4PMetrics.consistencyVerdict.includes('Inconsistent') ? '✗ ' : '✓ '}
                          Consistency Check:{' '}
                        </span>
                        {calculated4PMetrics.consistencyVerdict}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 1: Product Life Cycle (PLC) Interactive Graph ── */}
              {currentSlide === 1 && (
                <div className="space-y-4 pt-2">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">
                      SVG Diagram: The 5 Stages of the Product Life Cycle (Theodore Levitt Curve)
                    </span>
                    <svg
                      viewBox="0 0 540 160"
                      className="w-full max-w-xl h-auto"
                      role="img"
                      aria-label="Product Life Cycle diagram illustrating Introduction, Growth, Maturity, Saturation, and Decline stages"
                    >
                      <rect width="540" height="160" rx="10" fill="#0f172a" />
                      <line x1="60" y1="130" x2="510" y2="130" stroke="#475569" strokeWidth="2" />
                      <line x1="60" y1="20" x2="60" y2="130" stroke="#475569" strokeWidth="2" />
                      <text x="500" y="145" fill="#94a3b8" fontSize="10" textAnchor="end">Time (Category Longevity) →</text>
                      <text x="35" y="30" fill="#94a3b8" fontSize="10" transform="rotate(-90 35,30)" textAnchor="end">Volume / Profit</text>

                      <line x1="150" y1="20" x2="150" y2="130" stroke="#334155" strokeDasharray="3 3" />
                      <line x1="240" y1="20" x2="240" y2="130" stroke="#334155" strokeDasharray="3 3" />
                      <line x1="330" y1="20" x2="330" y2="130" stroke="#334155" strokeDasharray="3 3" />
                      <line x1="420" y1="20" x2="420" y2="130" stroke="#334155" strokeDasharray="3 3" />

                      <text x="105" y="145" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">1. Intro</text>
                      <text x="195" y="145" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">2. Growth</text>
                      <text x="285" y="145" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">3. Maturity</text>
                      <text x="375" y="145" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">4. Saturation</text>
                      <text x="465" y="145" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">5. Decline</text>

                      <path
                        d="M 60 120 Q 120 115 150 95 T 240 45 T 330 35 T 420 45 T 510 110"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M 60 138 Q 110 145 150 125 T 240 60 T 330 50 T 420 70 T 510 125"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeDasharray="6 3"
                      />

                      <line x1="350" y1="18" x2="375" y2="18" stroke="#38bdf8" strokeWidth="3" />
                      <text x="382" y="21" fill="#cbd5e1" fontSize="9">Sales Curve</text>
                      <line x1="440" y1="18" x2="465" y2="18" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 2" />
                      <text x="472" y="21" fill="#cbd5e1" fontSize="9">Net Profit</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {plcChartData.map((d, idx) => (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedPlcStage(idx);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select PLC Stage ${idx + 1}: ${d.stage}`}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedPlcStage === idx
                            ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        <div>Stage {idx + 1}</div>
                        <div className="text-sm font-extrabold">{d.stage}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={plcChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="stage" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <RechartsTooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          name="Sales Volume"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          name="Net Profit"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-xs font-bold text-blue-400">Selected: {plcChartData[selectedPlcStage].stage} Stage</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        <strong className="text-amber-300">Indian Business Example:</strong> {plcChartData[selectedPlcStage].desc}
                      </p>
                    </div>
                    <div className="text-xs bg-slate-900 p-2 rounded-lg border border-slate-800 text-slate-300">
                      Sales: <span className="font-bold text-blue-400">{plcChartData[selectedPlcStage].sales} pts</span> | Profit:{' '}
                      <span
                        className={`font-bold ${
                          plcChartData[selectedPlcStage].profit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {plcChartData[selectedPlcStage].profit >= 0 ? '✓ ' : '✗ '}
                        {plcChartData[selectedPlcStage].profit} pts
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: Pricing Strategy Laboratory ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'cost-plus' as const, name: 'Cost-Plus', tag: 'Amul Butter' },
                      { id: 'skimming' as const, name: 'Skimming', tag: 'Apple iPhone 15' },
                      { id: 'penetration' as const, name: 'Penetration', tag: 'Reliance Jio 2016' },
                      { id: 'parity' as const, name: 'Parity', tag: 'Tata Salt' }
                    ].map(strat => (
                      <motion.button
                        key={strat.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedPricingMode(strat.id);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select Pricing Mode: ${strat.name}`}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedPricingMode === strat.id
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        <div className="text-xs font-bold">{strat.name}</div>
                        <div className="text-[10px] opacity-80">{strat.tag}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Base Unit Cost (C):</span>
                          <span className="font-bold text-amber-400">₹{unitCost}</span>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={200}
                          value={unitCost}
                          aria-label="Adjust base unit manufacturing cost in rupees"
                          onChange={e => {
                            setUnitCost(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      {selectedPricingMode === 'cost-plus' && (
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Target Margin Markup %:</span>
                            <span className="font-bold text-emerald-400">{markupPercent}%</span>
                          </div>
                          <input
                            type="range"
                            min={5}
                            max={60}
                            value={markupPercent}
                            aria-label="Adjust cost-plus target margin percentage"
                            onChange={e => {
                              setMarkupPercent(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-emerald-500"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-center space-y-1.5">
                      <p className="text-xs text-slate-400">Calculated Final Selling Price</p>
                      <p className="text-2xl font-black text-emerald-400">₹{calculatedPricingMetrics.price.toFixed(2)}</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{calculatedPricingMetrics.desc}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: Distribution Channel Flow (Place) ── */}
              {currentSlide === 3 && (
                <div className="space-y-4 pt-2">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wider">
                      SVG Diagram: ICSE Commercial Channels of Distribution (0 to 3 Levels)
                    </span>
                    <svg
                      viewBox="0 0 540 180"
                      className="w-full max-w-xl h-auto"
                      role="img"
                      aria-label="Diagram of distribution channels from Zero-Level Direct to Three-Level Agent Wholesaler Retailer"
                    >
                      <rect width="540" height="180" rx="10" fill="#0f172a" />
                      <g transform="translate(15, 15)">
                        <rect width="65" height="26" rx="5" fill="#1e3a8a" />
                        <text x="32" y="17" fill="#bfdbfe" fontSize="8.5" fontWeight="bold" textAnchor="middle">Producer</text>
                        <line x1="70" y1="13" x2="430" y2="13" stroke="#3b82f6" strokeWidth="1.5" />
                        <rect x="435" width="70" height="26" rx="5" fill="#065f46" />
                        <text x="470" y="17" fill="#a7f3d0" fontSize="8.5" fontWeight="bold" textAnchor="middle">Consumer</text>
                        <text x="255" y="17" fill="#93c5fd" fontSize="8" textAnchor="middle">0-Level: Eureka Forbes (Direct)</text>
                      </g>

                      <g transform="translate(15, 55)">
                        <rect width="65" height="26" rx="5" fill="#1e3a8a" />
                        <text x="32" y="17" fill="#bfdbfe" fontSize="8.5" fontWeight="bold" textAnchor="middle">Producer</text>
                        <line x1="70" y1="13" x2="225" y2="13" stroke="#60a5fa" strokeWidth="1.5" />
                        <rect x="230" width="65" height="26" rx="5" fill="#78350f" />
                        <text x="262" y="17" fill="#fde68a" fontSize="8.5" fontWeight="bold" textAnchor="middle">Retailer</text>
                        <line x1="300" y1="13" x2="430" y2="13" stroke="#60a5fa" strokeWidth="1.5" />
                        <rect x="435" width="70" height="26" rx="5" fill="#065f46" />
                        <text x="470" y="17" fill="#a7f3d0" fontSize="8.5" fontWeight="bold" textAnchor="middle">Consumer</text>
                        <text x="365" y="9" fill="#fcd34d" fontSize="7">1-Level: Tata Motors Dealership</text>
                      </g>

                      <g transform="translate(15, 95)">
                        <rect width="65" height="26" rx="5" fill="#1e3a8a" />
                        <text x="32" y="17" fill="#bfdbfe" fontSize="8.5" fontWeight="bold" textAnchor="middle">Producer</text>
                        <line x1="70" y1="13" x2="145" y2="13" stroke="#60a5fa" strokeWidth="1.5" />
                        <rect x="150" width="70" height="26" rx="5" fill="#7c2d12" />
                        <text x="185" y="17" fill="#fed7aa" fontSize="8.5" fontWeight="bold" textAnchor="middle">Wholesaler</text>
                        <line x1="225" y1="13" x2="305" y2="13" stroke="#60a5fa" strokeWidth="1.5" />
                        <rect x="310" width="65" height="26" rx="5" fill="#78350f" />
                        <text x="342" y="17" fill="#fde68a" fontSize="8.5" fontWeight="bold" textAnchor="middle">Retailer</text>
                        <line x1="380" y1="13" x2="430" y2="13" stroke="#60a5fa" strokeWidth="1.5" />
                        <rect x="435" width="70" height="26" rx="5" fill="#065f46" />
                        <text x="470" y="17" fill="#a7f3d0" fontSize="8.5" fontWeight="bold" textAnchor="middle">Consumer</text>
                        <text x="260" y="9" fill="#fed7aa" fontSize="7">2-Level: FMCG Surf Excel / Parle-G</text>
                      </g>

                      <g transform="translate(15, 135)">
                        <rect width="60" height="26" rx="5" fill="#1e3a8a" />
                        <text x="30" y="17" fill="#bfdbfe" fontSize="8" fontWeight="bold" textAnchor="middle">Producer</text>
                        <line x1="65" y1="13" x2="105" y2="13" stroke="#60a5fa" strokeWidth="1.5" />
                        <rect x="110" width="60" height="26" rx="5" fill="#581c87" />
                        <text x="140" y="17" fill="#e9d5ff" fontSize="8" fontWeight="bold" textAnchor="middle">Agent</text>
                        <line x1="175" y1="13" x2="215" y2="13" stroke="#60a5fa" strokeWidth="1.5" />
                        <rect x="220" width="65" height="26" rx="5" fill="#7c2d12" />
                        <text x="252" y="17" fill="#fed7aa" fontSize="8.5" fontWeight="bold" textAnchor="middle">Wholesaler</text>
                        <line x1="290" y1="13" x2="330" y2="13" stroke="#60a5fa" strokeWidth="1.5" />
                        <rect x="335" width="60" height="26" rx="5" fill="#78350f" />
                        <text x="365" y="17" fill="#fde68a" fontSize="8.5" fontWeight="bold" textAnchor="middle">Retailer</text>
                        <line x1="400" y1="13" x2="440" y2="13" stroke="#60a5fa" strokeWidth="1.5" />
                        <rect x="445" width="65" height="26" rx="5" fill="#065f46" />
                        <text x="477" y="17" fill="#a7f3d0" fontSize="8.5" fontWeight="bold" textAnchor="middle">Consumer</text>
                      </g>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { level: 0, title: 'Zero-Level', sub: 'Eureka Forbes (Direct)' },
                      { level: 1, title: 'One-Level', sub: 'Tata Motors Dealership' },
                      { level: 2, title: 'Two-Level', sub: 'HUL Surf Excel (Kirana)' },
                      { level: 3, title: 'Three-Level', sub: 'Amul Dairy Cooperative' }
                    ].map(ch => (
                      <motion.button
                        key={ch.level}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedChannelLevel(ch.level);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select ${ch.title}: ${ch.sub}`}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedChannelLevel === ch.level
                            ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        <div className="text-xs font-bold">{ch.title}</div>
                        <div className="text-[10px] opacity-80">{ch.sub}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-slate-400">Control Over Price/Brand</p>
                      <p className="font-bold text-white mt-1">
                        {selectedChannelLevel === 0
                          ? '100% Maximum Direct Control'
                          : selectedChannelLevel === 1
                          ? 'High (Via Franchise Agreement)'
                          : 'Moderate/Low (Kiranas set local margins)'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-slate-400">Market Coverage & Reach</p>
                      <p className="font-bold text-white mt-1">
                        {selectedChannelLevel === 0
                          ? 'Limited to Sales Rep Footprint'
                          : selectedChannelLevel <= 2
                          ? 'Very Wide (10 Lakh+ Retailers)'
                          : 'Massive Pan-India Agricultural Reach'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-slate-400">Intermediary Margin Cut</p>
                      <p className="font-bold text-amber-400 mt-1">
                        {selectedChannelLevel === 0
                          ? '0% (Direct to Producer)'
                          : selectedChannelLevel === 1
                          ? '10% - 15% Dealer Margin'
                          : '25% - 35% Multi-Tier Margin'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: Brand Promotion & Brand Equity ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-300">Brand Cultivation Years:</h4>
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Consecutive Years of Customer Trust:</span>
                          <span className="font-bold text-amber-400">{simulatedLoyaltyYears} Years</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={25}
                          value={simulatedLoyaltyYears}
                          aria-label="Adjust consecutive customer trust years from 1 to 25"
                          onChange={e => {
                            setSimulatedLoyaltyYears(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Consistent Annual Advertising (₹ Cr):</span>
                          <span className="font-bold text-blue-400">₹{advBudget} Cr</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={100}
                          value={advBudget}
                          aria-label="Adjust consistent annual advertising budget in crore rupees"
                          onChange={e => {
                            setAdvBudget(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-blue-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-center space-y-3">
                      <div>
                        <p className="text-xs text-slate-400">Calculated Brand Equity (Rupee Asset Value)</p>
                        <p className="text-2xl font-black text-amber-400">₹{calculatedBrandEquity.calculatedCrores} Crores</p>
                        <p className="text-[10px] text-slate-500">e.g. Maggi Brand Finance valuation (₹1,200 Cr)</p>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <p className="text-xs text-slate-400">Price Premium Power vs Unbranded</p>
                        <p className="text-lg font-bold text-emerald-400">+{calculatedBrandEquity.premiumPercentage}%</p>
                        <p className="text-[10px] text-slate-400">
                          (Haldiram charging 40% more than local unbranded namkeen)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              aria-label="Go to previous lab"
              className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-semibold text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                aria-label="Go to next lab"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter free sandbox mode"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* PHASE 4: FREE PLAY SANDBOX MODE                             */}
      {/* ─────────────────────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span aria-hidden="true">🧪</span> Strategy Sandbox — Free Unrestricted Play
              </h3>
              <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-md">
                Ungraded Zone
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tweak all commercial mix parameters simultaneously: pricing model, channel length, and marketing budget.
              Observe how all four Ps interact before facing ICSE Board-style challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-blue-400 uppercase">1. Product & Price</h4>
              <div>
                <label className="text-xs text-slate-400">Unit Cost: ₹{unitCost}</label>
                <input
                  type="range"
                  min={10}
                  max={200}
                  value={unitCost}
                  aria-label="Sandbox adjust unit cost in rupees"
                  onChange={e => setUnitCost(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Markup %: {markupPercent}%</label>
                <input
                  type="range"
                  min={10}
                  max={80}
                  value={markupPercent}
                  aria-label="Sandbox adjust markup percentage"
                  onChange={e => setMarkupPercent(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl text-xs text-slate-300">
                Cost-Plus Price: <strong className="text-emerald-400">₹{(unitCost * (1 + markupPercent / 100)).toFixed(2)}</strong>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase">2. Place (Channel)</h4>
              <div>
                <label className="text-xs text-slate-400">Channel Level: {selectedChannelLevel}</label>
                <input
                  type="range"
                  min={0}
                  max={3}
                  value={selectedChannelLevel}
                  aria-label="Sandbox adjust channel level from 0 to 3"
                  onChange={e => setSelectedChannelLevel(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl text-xs text-slate-300">
                {selectedChannelLevel === 0 && '0-Level: Direct Selling (Eureka Forbes)'}
                {selectedChannelLevel === 1 && '1-Level: Retailer (Tata Motors Dealership)'}
                {selectedChannelLevel === 2 && '2-Level: Wholesaler + Retailer (HUL Surf Excel)'}
                {selectedChannelLevel === 3 && '3-Level: Agent + Wholesaler + Retailer (Amul)'}
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-pink-400 uppercase">3. Brand Equity Outcome</h4>
              <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1 text-slate-300">
                <p>
                  Estimated Equity: <strong className="text-amber-400">₹{calculatedBrandEquity.calculatedCrores} Cr</strong>
                </p>
                <p>
                  Customer Loyalty Multiplier: <strong className="text-emerald-400">{simulatedLoyaltyYears}x</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Mastery Challenges"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 text-sm"
            >
              <span>Ready for Mastery Challenges!</span>
              <span aria-hidden="true">→</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* PHASE 5: CHALLENGES & BOARD MASTERY                         */}
      {/* ─────────────────────────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-5">
          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Progress</span>
              <h2 className="text-sm sm:text-base font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-900/60 text-blue-300 border border-blue-700/50 rounded uppercase">
                {challenge.competencyLevel}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 rounded uppercase">
                {challenge.type}
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/50 border-rose-600'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed mb-4">
              {challenge.question}
            </p>

            {/* MCQ Types */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm border transition-all flex items-center justify-between ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-950/80 hover:bg-slate-800/90 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </div>
                      {showExplanation && (
                        <span className="font-bold ml-2">
                          {i === challenge.correctIndex ? '✓ Correct' : ''}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable service attribute: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'target_apollo', name: 'Apollo Hospital Heart Surgery' },
                    { id: 'target_ola', name: 'Empty 2 PM Ola Cab Ride' },
                    { id: 'target_haircut', name: 'Lakmé Salon Haircut & Styling' },
                    { id: 'target_consult', name: 'Doctor Patient Consultation' }
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3.5 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex justify-between items-center"
                    >
                      <span className="text-xs text-slate-300">{target.name}</span>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${
                          droppedLabels[target.id]
                            ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                            : 'bg-slate-900 text-slate-500'
                        }`}
                      >
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  aria-label="Validate placed labels"
                  className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Validate Placements
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder items into the correct sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      aria-label={`Position ${displayIdx + 1}: ${item}. Drag to reorder.`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="font-bold text-blue-400">{displayIdx + 1}.</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Verify the arranged order of stages"
                  className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Numeric answer input in rupees"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-40 focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric calculation"
                    className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 rounded-lg text-xs font-bold border border-indigo-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[60px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        aria-label={`Remove part: ${part}`}
                        className="text-rose-300 hover:text-white"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above to assemble the strategy</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify strategy formulation"
                  className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Formulation
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-slate-950 rounded-xl border border-amber-800/40 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-xs">📖 ICSE Commercial Explanation:</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-300 leading-relaxed"
                    >
                      <strong className="text-amber-400">{i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show next concept step"
                      className="px-3 py-1.5 bg-amber-900/60 hover:bg-amber-800 text-amber-200 text-xs font-bold rounded-lg border border-amber-700"
                    >
                      Show Next Concept Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to next challenge"
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Masterclass →' : 'Next Challenge →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* PHASE 6: COMPLETION, REFLECTION & SPACED REPETITION (SRS)   */}
      {/* ─────────────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-blue-950/60 rounded-3xl border border-emerald-700/50 text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Commercial Applications Mastered!</h2>
            <p className="text-sm text-slate-300">
              Final Score: <span className="font-extrabold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span> |
              Mastery Tier: <span className="font-bold text-amber-400 capitalize">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Feedback Banner */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-2">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wide">Performance Appraisal</h3>
            <div className="text-xl font-black text-amber-300 py-1">
              {motivationalMessage}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
              {errors === 0
                ? '🌟 Flawless strategic accuracy across all 10 ICSE Commercial Applications syllabus topics!'
                : errors <= 3
                ? '👏 Strong conceptual understanding of pricing, channels, 4 Ps mix, and brand equity.'
                : errors <= 7
                ? '💪 Solid attempt! Review the specific diagnostic misconceptions below to strengthen your understanding.'
                : '🎯 Consistent practice makes masters. Re-explore the guided interactive labs and retry!'}
            </p>
          </div>

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 rounded-2xl border border-amber-700/50 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <span>📅</span> SM-2 Spaced Repetition Memory Schedule
              </h3>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-600/40">
                {srsReviewSchedule.label}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cognitive science shows that memory decays along an exponential forgetting curve. Based on your performance ({errors} error{errors !== 1 ? 's' : ''}), your next active recall reactivation session is scheduled in <strong className="text-amber-300">{srsReviewSchedule.days} day{srsReviewSchedule.days > 1 ? 's' : ''}</strong>.
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wide">
                Targeted Misconception Diagnostics
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ ICSE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-blue-300 flex items-center gap-2">
              <span aria-hidden="true">💼</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-blue-400">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Persistent Audio/Visual Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={0} y={0} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_CommerceAppDefinitionMarketsMarketingSim;
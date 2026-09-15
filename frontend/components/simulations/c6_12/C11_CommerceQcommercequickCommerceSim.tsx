'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C11_COMM_031 = 'c11_comm_031';
const NODE_C11_COMM_032 = 'c11_comm_032';
const NODE_C11_COMM_033 = 'c11_comm_033';
const NODE_C11_COMM_034 = 'c11_comm_034';
const NODE_C11_COMM_035 = 'c11_comm_035';
const NODE_C11_COMM_036 = 'c11_comm_036';
const NODE_C11_COMM_037 = 'c11_comm_037';
const NODE_C11_COMM_038 = 'c11_comm_038';
const NODE_C11_COMM_039 = 'c11_comm_039';
const NODE_C11_COMM_040 = 'c11_comm_040';

const ALL_NODE_IDS = [
  NODE_C11_COMM_031,
  NODE_C11_COMM_032,
  NODE_C11_COMM_033,
  NODE_C11_COMM_034,
  NODE_C11_COMM_035,
  NODE_C11_COMM_036,
  NODE_C11_COMM_037,
  NODE_C11_COMM_038,
  NODE_C11_COMM_039,
  NODE_C11_COMM_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Commerce & Capital Revolution',
  intro: 'Welcome, Commerce Strategist! From Zepto & Blinkit revolutionising last-mile retail in 10 minutes, to HUL managing wholesale channels, and stock exchanges matching billions of rupees in equity trades on BSE and NSE under SEBI’s watchful eye — you are about to master modern Indian internal trade and capital markets.',
  context: 'Trace the entire economic pipeline: from FMCG factories in Haridwar down to local kiranas, dark store micro-fulfilment, stock exchange floor-to-screen evolution, and paperless Demat investing.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Zepto promises milk delivery in 10 minutes in Mumbai. Amazon takes 24 hours. What is the fundamental backend reason for this 10-minute speed?',
  options: [
    'Zepto uses modified super-fast delivery bikes that violate traffic speed limits',
    'Zepto ships from hyperlocal "Dark Stores" 1–2 km away, whereas Amazon ships from centralised warehouses 40–50 km away',
    'Zepto manufactures its own milk directly inside the delivery vehicle while travelling',
    'Zepto delivers only to customers who live on the ground floor of grocery stores',
  ],
  correctIndex: 1,
  hintAfter: 'Delivery speed is about PROXIMITY (closeness), not velocity (bike speed)! Let us explore how dark stores, trade channels, and capital markets really operate.',
};

// ─── PREDICTION QUESTIONS (PREDICT-THEN-CHECK) ───
export interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  predictionReasoning: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_01',
    question: 'If a Q-commerce company expands its dark store delivery radius from 2 km to 10 km, what will happen to delivery times and operating warehouse rents?',
    options: [
      'Delivery time remains under 10 minutes, but rent doubles',
      'Delivery time increases dramatically (beyond 30 mins) while outskirts rent drops significantly',
      'Delivery time drops to 1 minute and rent drops to zero',
      'Both delivery time and rent stay completely unchanged',
    ],
    correctIndex: 1,
    predictionReasoning: 'In dense Indian metropolitan traffic, 10-minute delivery is physically impossible across a 10 km radius, even though outer industrial godowns have much lower rent.',
    verifyInstruction: 'Adjust the Dark Store Radius slider in Explore Slide 1 to 10 km to verify how simulated delivery time and rent fluctuate.',
  },
  {
    id: 'pred_02',
    question: 'When high buying pressure (Bulls / Tejiwalas) floods the BSE/NSE matching engine, what happens to the market equilibrium price?',
    options: [
      'The clearing price surges upwards as buyers outbid limited supply',
      'The clearing price drops to zero immediately',
      'The price stays permanently locked by government price control',
      'The stock exchange closes permanently',
    ],
    correctIndex: 0,
    predictionReasoning: 'When demand exceeds supply in a continuous double auction matching engine, buyers must raise their bids, pushing up the equilibrium market price.',
    verifyInstruction: 'Move the Market Demand slider to high Bullish (>75) in Explore Slide 3 to verify the live price surge on the chart.',
  },
];

// ─── OBSERVATION QUESTIONS ('WHAT DO YOU NOTICE?') ───
export interface ObservationQuestion {
  id: string;
  question: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    question: 'Observe Slide 2 (FMCG Distribution Channel): What happens to pack sizes and gross margin percentages as goods travel from Factory to Kirana Retailer?',
    observableOptions: [
      'Pack sizes decrease (bulk truckloads to single units) while gross margin percentages increase (5% wholesale to 15%–40% retail)',
      'Pack sizes increase while gross margins drop to zero',
      'Pack sizes and gross margins remain identical at every tier',
      'Retailers sell in larger volume crates than factory manufacturers',
    ],
    correctIndex: 0,
    explanation: 'Wholesalers move large bulk lots on slim 5%–10% margins, whereas kirana retailers sell single individual packs and require 15%–40% margins to cover prime residential rent, display costs, and customer udhaar risk.',
  },
  {
    id: 'obs_02',
    question: 'Observe Slide 4 (Paperless Demat Ecosystem): What is the core observable role of the Clearing Corporation (NCCL) between Buyer and Seller Demat accounts?',
    observableOptions: [
      'It acts as central legal counterparty via novation to guarantee that settlement occurs without default on T+1',
      'It prints physical paper certificates to mail to investors',
      'It provides bank mortgage loans for commercial warehouses',
      'It sets retail milk prices for dark stores',
    ],
    correctIndex: 0,
    explanation: 'The clearing corporation steps in between buyer and seller via novation, becoming buyer to every seller and seller to every buyer, guaranteeing zero counterparty settlement failure.',
  },
];

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

// ─── 22 CHALLENGES (FOUNDATION, STANDARD, ADVANCED) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_COMM_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does BigBasket’s AI demand forecasting algorithm primarily help prevent financial loss on perishables like milk and vegetables?',
    options: [
      'By automatically increasing retail prices during rainy days',
      'By computing historical sales averages per pin-code per hour to pre-position exact quantities and cut wastage',
      'By manufacturing synthetic milk when local supply drops',
      'By replacing all human delivery riders with autonomous drones',
    ],
    correctIndex: 1,
    explanation: 'BigBasket uses AI demand forecasting by calculating historical mean sales per pin-code and hour, reducing perishable inventory wastage by up to 22%.',
    hints: [
      'Think about statistical averaging per neighbourhood pin-code.',
      'AI helps forecast demand so stores do not overstock or run out.',
      'It averages past sales per pin-code per hour to stock just the right amount.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_COMM_032,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is a 2,000 sq ft Zepto Dark Store in Bandra, Mumbai called "dark"?',
    options: [
      'It operates completely without electricity or indoor lighting to save costs',
      'It has no walk-in storefront for retail customers and processes only online orders',
      'It trades exclusively in illegal or untaxed contraband goods',
      'It is buried deep underground in building basements',
    ],
    correctIndex: 1,
    explanation: '"Dark" refers solely to the absence of a walk-in retail storefront. It is a fully registered, brightly lit micro-fulfilment centre operating solely for online order picking.',
    hints: [
      'Does a regular walk-in shopper go inside a dark store?',
      '"Dark" describes customer access, not the presence of electrical light.',
      'It means there is no customer-facing entrance — pickers pack app orders exclusively.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_COMM_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When an investor buys 100 shares of Reliance Industries on the NSE from another investor, who receives the purchase money?',
    options: [
      'Reliance Industries Ltd directly into its corporate bank account',
      'The selling investor who owned and sold those existing shares',
      'SEBI as a regulatory security deposit',
      'The Ministry of Finance, Government of India',
    ],
    correctIndex: 1,
    explanation: 'The stock exchange is a secondary market. Money flows from buyer to selling investor; the company receives funds only during an IPO/FPO in the primary market.',
    hints: [
      'Is Reliance issuing brand new shares in this daily trade?',
      'The stock exchange is a resale platform between investors.',
      'The transaction is between two investors; the money goes to the seller.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_COMM_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following is NOT a legitimate function of a stock exchange?',
    options: [
      'Providing continuous liquidity and ready market for existing securities',
      'Providing direct long-term commercial loans to struggling joint stock companies',
      'Continuous price determination through aggregate demand and supply order matching',
      'Acting as an economic barometer through indices like Sensex and Nifty 50',
    ],
    correctIndex: 1,
    explanation: 'A stock exchange provides liquidity and a secondary market for equity trading, but it DOES NOT lend money. Lending is performed by commercial banks and financial institutions.',
    hints: [
      'Differentiate between bank debt financing and stock market equity trading.',
      'Does a stock exchange give out bank loans?',
      'Stock exchanges facilitate share trading between investors, not corporate lending.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_COMM_039,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label each level in the traditional FMCG trade distribution hierarchy correctly.',
    dragItems: [
      { label: 'Manufacturer (Factory)', targetId: 'slot_1' },
      { label: 'Wholesaler (Bulk Godown)', targetId: 'slot_2' },
      { label: 'Retailer (Kirana / Store)', targetId: 'slot_3' },
      { label: 'Final Consumer (Household)', targetId: 'slot_4' },
    ],
    correctMapping: {
      slot_1: 'Manufacturer (Factory)',
      slot_2: 'Wholesaler (Bulk Godown)',
      slot_3: 'Retailer (Kirana / Store)',
      slot_4: 'Final Consumer (Household)',
    },
    explanation: 'Goods flow from Manufacturer → Wholesaler (bulk breaking & financing) → Retailer (single units & display) → Final Consumer.',
    hints: [
      'Who creates the goods at the very top?',
      'Who buys in truckloads and breaks bulk before selling to kirana shops?',
      'Order: Factory -> Wholesaler -> Retailer -> End Consumer.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_COMM_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Indian stock exchange was Asia’s first (established 1875 at Dalal Street) and launched the Sensex index?',
    options: [
      'National Stock Exchange (NSE)',
      'Bombay Stock Exchange (BSE)',
      'Calcutta Stock Exchange (CSE)',
      'Over the Counter Exchange of India (OTCEI)',
    ],
    correctIndex: 1,
    explanation: 'BSE was established in 1875 as The Native Share & Stock Brokers Association at Dalal Street, Mumbai, and maintains the 30-stock Sensex.',
    hints: [
      'It is located at Dalal Street, Mumbai.',
      'It began under a banyan tree in 1875.',
      'BSE (Bombay Stock Exchange) is Asia’s oldest.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_COMM_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In stock market terminology, an operator who anticipates prices will FALL and sells shares to buy them back cheaper later is called a:',
    options: [
      'Bull (Tejiwala)',
      'Bear (Mandiwala)',
      'Stag',
      'Lame Duck',
    ],
    correctIndex: 1,
    explanation: 'A Bear (Mandiwala) is pessimistic, expecting prices to drop, and sells shares intending to buy them back at a lower price for profit.',
    hints: [
      'Bulls throw up (rise), while Bears swipe down (fall).',
      'Think of Mandiwala (mandi = slowdown/slump).',
      'The operator is a Bear.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_COMM_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary role of a Demat (Dematerialised) account in India under the Depositories Act, 1996?',
    options: [
      'To hold physical bank cash balances and earn fixed monthly savings interest',
      'To hold shares and securities in electronic paperless form linked via a 16-digit BO ID',
      'To provide personal medical and life insurance policies to investors',
      'To store physical gold ornaments in a bank vault',
    ],
    correctIndex: 1,
    explanation: 'A Demat account stores securities (shares, bonds, ETFs) in electronic ledger form, eliminating the risks of theft, loss, and fake paper certificates.',
    hints: [
      'Demat is short for "Dematerialised".',
      'It replaces physical paper share certificates with digital book entries.',
      'It holds electronic shares and securities under NSDL/CDSL.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_COMM_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Zepto dark store in Mumbai receives 800 orders/day with an average order value (AOV) of ₹450. What is its total MONTHLY revenue in Lakhs (assume a 30-day month)?',
    correctAnswer: 108,
    tolerance: 1,
    unit: 'Lakhs (₹)',
    explanation: 'Daily revenue = 800 × ₹450 = ₹3,60,000 (3.6 Lakhs). Monthly revenue = ₹3,60,000 × 30 = ₹1,08,00,000 = ₹108 Lakhs (1.08 Crore).',
    hints: [
      'Calculate daily revenue first: Orders per day × Average order value.',
      '800 × 450 = 360,000 rupees per day.',
      'Multiply by 30 days: 360,000 × 30 = 10,800,000 rupees = 108 Lakhs.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_COMM_038,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential steps of an electronic equity share purchase on the NSE under T+1 settlement.',
    sortItems: [
      'Investor places buy order through registered Broker (e.g., Zerodha app)',
      'NSE NEAT matching engine pairs buy order with matching sell order on Day T',
      'Clearing Corporation (NCCL) calculates net cash and security obligations',
      'On Day T+1, funds are debited from buyer bank and shares credited to CDSL/NSDL Demat account',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Trade execution begins with the client order via broker, order matching at the exchange engine on Day T, clearing novation, and T+1 Demat settlement delivery.',
    hints: [
      'Order entry always comes first via your broker terminal.',
      'Exchange matching engine executes before clearing house calculates net obligations.',
      'Final Demat credit and bank debit happen on Day T+1.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_COMM_039,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Redington India buys 10,000 iPhones outright from Apple Inc. and resells them to Croma. An APMC Arhtiya sells wheat on behalf of a farmer for a 2% fee without taking ownership. Which is the Wholesaler?',
    options: [
      'Both are commission agents because both operate in distribution',
      'Redington is a Wholesaler (takes title/ownership); the Arhtiya is a Commission Agent (does not take title)',
      'The Arhtiya is a Wholesaler because agricultural goods have special legal status',
      'Neither is a wholesaler because only government agencies can wholesale',
    ],
    correctIndex: 1,
    explanation: 'The critical legal test of a wholesaler is "taking title to goods" (buying outright and assuming inventory risk). Commission agents act as brokers on behalf of principals without ownership.',
    hints: [
      'Who actually buys and owns the inventory while stored?',
      'Wholesalers take ownership (title) and earn a profit margin.',
      'Redington takes title, so Redington is the wholesaler.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_COMM_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A distributor sells 50 cartons of Parle-G biscuits to a school canteen. The canteen resells individual ₹5 packets to students. What type of trade is the distributor-to-canteen transaction?',
    options: [
      'Retail trade because a school canteen is a small local educational facility',
      'Wholesale trade because the canteen buys the goods for RESALE, not personal consumption',
      'Direct consumer trade because school children are end users',
      'Foreign trade because biscuits contain imported wheat flour',
    ],
    correctIndex: 1,
    explanation: 'The test of retail vs wholesale is NOT the size of the entity, but whether the buyer consumes or resells. The canteen resells the biscuits, making the distributor’s sale wholesale trade.',
    hints: [
      'Does the canteen staff eat all 50 cartons of biscuits?',
      'If the buyer intends to resell the goods to others, it is wholesale trade.',
      'Resale = Wholesale trade.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_COMM_037,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'SEBI imposing a ₹447 crore penalty on a corporate entity for insider trading (UPSI) falls under which functional category of SEBI?',
    options: [
      'Developmental Function (promoting market growth and training)',
      'Protective Function (prohibiting insider trading and unfair fraudulent practices)',
      'Fiscal Function (raising tax revenue for government budget)',
      'Monetary Function (regulating repo rates and cash reserve ratios)',
    ],
    correctIndex: 1,
    explanation: 'Protective functions of SEBI prohibit insider trading, fraudulent trade practices, price rigging, and protect investors. Regulatory functions handle registration/audits; developmental functions handle ASBA, NISM training, and SROs.',
    hints: [
      'Look at what the action aims to do: protect small investors from cheating.',
      'Insider trading bans and fraud penalties protect market integrity.',
      'This is a Protective Function.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_COMM_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Infosys declares a ₹25/share dividend with Record Date 15 Nov. An investor buys shares on 14 Nov (Cum-Dividend). On 15 Nov the stock trades Ex-Dividend. What will happen to the market price on 15 Nov morning?',
    options: [
      'The share price typically drops by approximately ₹25 because the dividend cash leaves the company valuation',
      'The share price doubles because dividends attract millions of buyers',
      'The share price stays permanently fixed by SEBI regulation',
      'The company ceases trading forever on BSE and NSE',
    ],
    correctIndex: 0,
    explanation: 'On the Ex-Dividend date, the buyer is no longer entitled to the declared dividend. The market price naturally adjusts downward by approximately the dividend payout value.',
    hints: [
      'When cash leaves a company to pay shareholders, company value drops by that amount.',
      'Ex-dividend shares trade without the right to the declared dividend.',
      'Price adjusts downwards by roughly the dividend amount (₹25).',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_COMM_038,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'If a discount broker like Zerodha or Groww goes bankrupt, what happens to the investor’s shares held in their Demat account?',
    options: [
      'The shares are permanently lost because the broker owns the depository vaults',
      'The shares remain 100% safe because they are recorded with CDSL/NSDL (Depository); the broker is only a Depository Participant (DP)',
      'SEBI converts all shares into government treasury bonds automatically',
      'The Reserve Bank of India liquidates the shares to pay bank debts',
    ],
    correctIndex: 1,
    explanation: 'The broker is only an agent (Depository Participant). The actual legal ledger of shares is maintained centrally by CDSL or NSDL. If a DP fails, the investor simply transfers DP mapping.',
    hints: [
      'Recall the distinction between the broker (DP agent) and the central Depository (CDSL/NSDL).',
      'Are your shares stored on Zerodha’s balance sheet or at CDSL/NSDL?',
      'Central depositories hold the records, keeping client holdings secure.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_COMM_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under Section 24 of the CGST Act 2017, what is the mandatory turnover threshold above which an Indian trader of goods must compulsorily register for GST in standard states?',
    options: [
      '₹5 Lakhs',
      '₹20 Lakhs',
      '₹40 Lakhs',
      '₹1.5 Crores',
    ],
    correctIndex: 2,
    explanation: 'For exclusive suppliers of goods in standard states, compulsory GST registration is required at ₹40 Lakhs aggregate turnover. Retailers up to ₹1.5 Crore can opt for the 1% Composition Scheme under Section 10.',
    hints: [
      'Standard goods threshold is higher than services (₹20L).',
      'It is ₹40 Lakhs for goods (₹20L for special category states).',
      'The answer is ₹40 Lakhs.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_COMM_036,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the precise 4-word trading sequence for a Bull (Tejiwala) operator seeking capital gains.',
    availableParts: ['BUY_LOW', 'WAIT_FOR_RISE', 'SELL_HIGH', 'EARN_CAPITAL_GAIN', 'SHORT_SELL', 'WAIT_FOR_FALL', 'BUY_BACK_CHEAP'],
    targetState: 'BUY_LOW WAIT_FOR_RISE SELL_HIGH EARN_CAPITAL_GAIN',
    validationHint: 'Bull expects price increase: Buy low -> wait for price rise -> sell high -> capital gain.',
    explanation: 'A Bull (optimist) buys securities expecting a price rise, holds during the rally, sells at a higher quotation, and captures capital appreciation.',
    hints: [
      'Bulls want prices to go UP.',
      'Start with BUY_LOW, then WAIT_FOR_RISE.',
      'Sequence: BUY_LOW WAIT_FOR_RISE SELL_HIGH EARN_CAPITAL_GAIN.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_COMM_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did SEBI mandate the "De-mutualisation" of the Bombay Stock Exchange in 2005?',
    options: [
      'To allow brokers to trade without paying any government taxes',
      'To separate ownership, management, and trading rights, eliminating broker conflicts of interest where brokers governed the exchange',
      'To merge BSE completely into the Reserve Bank of India',
      'To stop all computer screen trading and return to physical banyan tree trading',
    ],
    correctIndex: 1,
    explanation: 'De-mutualisation converted broker-owned mutual clubs into corporatised public shareholder entities, preventing brokers from rigging listing rules and disciplinary actions to their own advantage.',
    hints: [
      'Consider conflict of interest: what happens when traders also write the exchange laws?',
      'De-mutualisation separates ownership from trading rights.',
      'It stops broker-owners from manipulating rules for private gain.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_COMM_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A Q-commerce founder wants to cut costs by moving a dark store from Bandra (rent ₹4 Lakh/mo) to Bhiwandi outskirts (rent ₹40,000/mo). What fatal commercial flaw will occur?',
    options: [
      'The store will have too much space to hold 100,000 SKUs',
      'The 45 km transit distance makes 10-minute delivery physically impossible, destroying the core value proposition of quick commerce',
      'Bhiwandi does not have electricity or internet connectivity',
      'FSSAI licences are not valid outside south Mumbai',
    ],
    correctIndex: 1,
    explanation: 'Q-commerce is fundamentally about hyperlocal proximity. If you move 45 km away, a two-wheeler takes 45+ minutes; you cease to be a quick-commerce player and become a traditional e-commerce warehouse.',
    hints: [
      'Can a rider ride 45 km in 10 minutes in Mumbai traffic?',
      'The location proximity IS the product.',
      '10-minute delivery is impossible across 45 km, destroying customer retention.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_COMM_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During a sudden onion shortage, large agricultural mandi wholesalers hoard stock to artificially drive prices from ₹30/kg to ₹90/kg. Which statute empowers the government to impose mandatory stock limits?',
    options: [
      'Securities Contracts (Regulation) Act, 1956',
      'Essential Commodities Act, 1955 (amended 2020)',
      'Depositories Act, 1996',
      'SEBI (Stock Brokers) Regulations, 1992',
    ],
    correctIndex: 1,
    explanation: 'The Essential Commodities Act, 1955 empowers State and Central governments to impose stock limits and penalise hoarding and black-marketing in essentials like onions, pulses, and edible oil.',
    hints: [
      'This law governs foodgrains, vegetables, and daily necessities.',
      'It prevents artificial hoarding and profiteering in essential goods.',
      'Essential Commodities Act, 1955.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_COMM_037,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How did SEBI’s introduction of ASBA (Application Supported by Blocked Amount) in 2008 protect retail investors during IPO subscriptions?',
    options: [
      'By guaranteeing that every single applicant receives 100% allotment of shares',
      'By ensuring money remains in the investor’s own interest-earning bank account and is debited ONLY upon confirmed allotment',
      'By eliminating the requirement to have a Demat account for IPOs',
      'By making IPO shares completely free of cost for college students',
    ],
    correctIndex: 1,
    explanation: 'ASBA blocked funds in the investor’s own bank account without transferring cash to the issuer until allotment, earning savings interest and preventing merchant banker float misuse.',
    hints: [
      'Before ASBA, companies held investor money for months before refunding.',
      'With ASBA, application money stays in your bank account earning interest until shares are allotted.',
      'It blocks money without debiting until allotment is confirmed.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C11_COMM_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why do retailers typically enjoy wider gross profit margins (15%–40%) than bulk wholesalers (5%–10%)?',
    options: [
      'Retailers sell illegal products that have higher black-market markups',
      'Retailers bear higher operating costs of prime residential locations, showroom displays, break-bulk risk, and personalised customer services',
      'Wholesalers are legally barred by SEBI from earning more than 5%',
      'Retailers do not pay any GST or state municipal taxes',
    ],
    correctIndex: 1,
    explanation: 'Retailers operate in high-rent residential localities, bear unit holding costs, provide attractive display & credit (udhaar), and handle single-unit sales, requiring higher gross margins.',
    hints: [
      'Think about rent in prime residential shopping markets vs an industrial godown.',
      'Retailers handle small single-item transactions and customer-facing expenses.',
      'Higher overheads, prime location rents, and personalised services justify higher margins.',
    ],
  },
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Hyperlocal Dark Store Engine (Q-Commerce)',
    instruction: 'Adjust the Dark Store Radius slider. Observe how proximity enables sub-10 minute delivery while restricting the warehouse SKU capacity to fast-moving items.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_031,
  },
  {
    title: '2. The Distribution Pipeline: Wholesale vs Retail',
    instruction: 'Click each stage of the FMCG supply chain to see how bulk breaking, financing credit, and gross margins transform from Factory to Kitchen.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_COMM_039,
  },
  {
    title: '3. Stock Market Order Book & Price Discovery',
    instruction: 'Move the Market Demand slider to simulate high buying pressure (Bulls) vs selling pressure (Bears) on the BSE/NSE matching engine.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_COMM_034,
  },
  {
    title: '4. Paperless Demat & Settlement Ecosystem (T+1)',
    instruction: 'Click the steps to trace 100 shares flowing seamlessly from Seller Demat → Clearing House (NCCL) → Buyer Demat via CDSL/NSDL.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_COMM_038,
  },
  {
    title: '5. SEBI 3-Pillar Regulatory Shield',
    instruction: 'Select each SEBI operational pillar (Protective, Regulatory, Developmental) to inspect real landmark Indian market enforcements.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_COMM_037,
  },
];

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Commerce Architect: Audit Your Local Economy',
  description: 'Apply your Class 11 commerce knowledge to analyze real enterprises in your neighbourhood:',
  steps: [
    'Identify a local Kirana store vs a Q-Commerce dark store (Zepto/Blinkit/Instamart) within 2 km of your home. Compare their SKU variety and order delivery time.',
    'Interview a local grocery retailer: Ask if they buy on 15–30 days credit (udhaar) from a mandi wholesaler and what GST composition scheme they use.',
    'Visit BSE (bseindia.com) or NSE (nseindia.com) and track the Sensex/Nifty 50 movement today. Check whether Bulls or Bears dominated trading.',
    'Check a family member’s Demat holding statement: Identify the 16-digit BO ID, the Depository (CDSL or NSDL), and the Depository Participant (broker bank).',
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
  nodeId: NODE_C11_COMM_031,
  title: 'Q-Commerce, Internal Trade & Capital Markets Ecosystem',
  definition: 'An integrated study of modern commercial channels — from AI-driven quick commerce and dark stores, wholesale bulk-breaking, retail final consumer sales, to stock exchange mechanics, Demat infrastructure, and SEBI statutory regulation.',
  eli5: 'Think of trade and markets like a giant river: Goods flow from factories through wholesalers and dark stores right to your doorstep in 10 minutes, while money and shares flow electronically through stock exchanges and Demat accounts protected by SEBI!',
  misconceptions: [
    {
      misconception: 'Dark stores are dark, closed, or illegal underground warehouses.',
      correction: '"Dark" means no walk-in retail shoppers are allowed. They are fully licensed, brightly lit micro-warehouses fulfilling online app orders in 10 mins.',
    },
    {
      misconception: 'AI in e-business means physical humanoid robots packing boxes.',
      correction: 'Most AI in commerce is server software algorithms: recommendation engines (driving 35% of Amazon sales), chatbots (Flippi), and pin-code demand forecasting.',
    },
    {
      misconception: 'A company receives money every time its shares trade on BSE or NSE.',
      correction: 'A company raises capital ONLY at the IPO/FPO stage in the Primary Market. Subsequent trades on the Stock Exchange (Secondary Market) transfer money solely between investors.',
    },
    {
      misconception: 'A Bear is a bankrupt, broken trader who is forced to sell in desperation.',
      correction: 'A Bear (Mandiwala) is a calculated speculator who anticipates price drops and intentionally short-sells to buy back cheaper later for profit.',
    },
    {
      misconception: 'The broker (Zerodha/Groww) is the depository that stores your shares.',
      correction: 'The broker is merely a Depository Participant (DP) agent. The actual digital shares are stored in central national depositories (CDSL or NSDL).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the standard delivery time promise of Q-Commerce?', options: ['1 to 2 days', '10 to 30 minutes', '1 to 2 weeks', '1 month'], correctIndex: 1 },
    { question: 'Where are Dark Stores physically located?', options: ['Industrial outskirts 50 km away', 'Inside residential neighbourhoods (1–3 km radius)', 'At international shipping ports', 'In deep rural forests'], correctIndex: 1 },
    { question: 'Which body is the statutory capital market regulator in India?', options: ['RBI', 'SEBI', 'IRDAI', 'CCI'], correctIndex: 1 },
    { question: 'What does a Demat account store?', options: ['Paper banknotes', 'Digital shares & securities', 'Gold coins', 'Trade invoices'], correctIndex: 1 },
    { question: 'Does a wholesaler sell to the final consumer?', options: ['Always', 'Never — sells only to retailers/institutions', 'Only on weekends', 'Only via mobile apps'], correctIndex: 1 },
    { question: 'What is the benchmark index of the National Stock Exchange?', options: ['Sensex', 'Nifty 50', 'Dow Jones', 'Nikkei'], correctIndex: 1 },
    { question: 'What is the standard stock settlement cycle in India since 2023?', options: ['T+5', 'T+3', 'T+1', 'T+14'], correctIndex: 2 },
    { question: 'Which Act requires displaying MRP on pre-packaged goods?', options: ['Legal Metrology Act 2009', 'Companies Act 2013', 'SCRA 1956', 'Depositories Act 1996'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery over Q-Commerce backend, dark store economics, stock exchange functions, Demat lifecycle, SEBI powers, wholesale services, and retail characteristics.',
};

function C11_CommerceQcommercequickCommerceSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_COMM_031,
    title = DEFAULT_PROPS.title || 'Q-Commerce & Capital Markets',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['commerce'] || { name: 'Commerce', emoji: '🏢', color: 'indigo' };

  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'prediction' | 'explore' | 'observation' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Progressive Disclosure State (Click-to-reveal)
  const [revealedSteps, setRevealedSteps] = useState<number>(1);

  // Prediction and Observation State
  const [currentPredictionIdx, setCurrentPredictionIdx] = useState(0);
  const [predictionAnswered, setPredictionAnswered] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);

  const [currentObservationIdx, setCurrentObservationIdx] = useState(0);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState<number | null>(null);

  // Hints & feedback state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery Interactive State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Live simulation interactive variables
  const [darkStoreRadius, setDarkStoreRadius] = useState<number>(1.8);
  const [orderDemandIndex, setOrderDemandIndex] = useState<number>(65);
  const [activeChannelStage, setActiveChannelStage] = useState<'factory' | 'wholesaler' | 'retailer' | 'consumer'>('wholesaler');
  const [activeDematStep, setActiveDematStep] = useState<number>(1);
  const [activeSebiPillar, setActiveSebiPillar] = useState<'protective' | 'regulatory' | 'developmental'>('protective');
  const [sandboxAOV, setSandboxAOV] = useState<number>(450);
  const [sandboxDailyOrders, setSandboxDailyOrders] = useState<number>(750);
  const [sandboxRent, setSandboxRent] = useState<number>(350000);

  // Challenge drag / sort / construct / numeric state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection inputs
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES ───
  const simulatedDeliveryTime = useMemo(() => {
    return Math.round(2 + darkStoreRadius * 2.8);
  }, [darkStoreRadius]);

  const simulatedUrbanRent = useMemo(() => {
    if (darkStoreRadius <= 3) return 380000;
    if (darkStoreRadius <= 8) return 180000;
    return 45000;
  }, [darkStoreRadius]);

  const stockMarketPrice = useMemo(() => {
    const basePrice = 2850;
    const delta = (orderDemandIndex - 50) * 14;
    return basePrice + delta;
  }, [orderDemandIndex]);

  const sandboxMonthlyProfit = useMemo(() => {
    const revenue = sandboxDailyOrders * sandboxAOV * 30;
    const grossMargin = revenue * 0.18;
    const staffSalary = 10 * 22000;
    const electricityAndOther = 65000;
    const totalCost = sandboxRent + staffSalary + electricityAndOther;
    return Math.round(grossMargin - totalCost);
  }, [sandboxDailyOrders, sandboxAOV, sandboxRent]);

  const chartData = useMemo(() => {
    const data = [];
    let p = 2800;
    for (let i = 1; i <= 10; i++) {
      const shift = (orderDemandIndex - 50) * 3 + (Math.sin(i * 1.5) * 20);
      p = Math.round(p + shift);
      data.push({ time: `10:${i * 5} AM`, price: p });
    }
    return data;
  }, [orderDemandIndex]);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  const explanationSteps = useMemo(() => {
    if (!challenge.explanation) return [];
    return challenge.explanation
      .split('. ')
      .filter(s => s.trim().length > 0)
      .map(s => s.endsWith('.') ? s : `${s}.`);
  }, [challenge.explanation]);

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) {
      return {
        title: 'PERFECT SCORE!',
        message: 'Master strategist! You nailed every supply chain calculation and regulatory nuance with zero errors.',
        color: 'from-emerald-500/20 border-emerald-500 text-emerald-300',
        badge: 'Flawless Execution 🏆',
      };
    }
    if (errors <= 3) {
      return {
        title: 'Great work!',
        message: 'Impressive analytical acumen across Q-commerce dark stores, wholesale title transfers, and capital markets.',
        color: 'from-sky-500/20 border-sky-500 text-sky-300',
        badge: 'High Distinction 🌟',
      };
    }
    if (errors <= 7) {
      return {
        title: 'Good effort!',
        message: 'You have formed solid mental models. Review the targeted misconception breakdown below to lock in total mastery.',
        color: 'from-amber-500/20 border-amber-500 text-amber-300',
        badge: 'Strong Progress 📈',
      };
    }
    return {
      title: 'Do not give up — You WILL get this!',
      message: 'Indian commerce and financial ecosystems have many moving parts. With spaced repetition practice, these concepts will become second nature!',
      color: 'from-rose-500/20 border-rose-500 text-rose-300',
      badge: 'Keep Pushing Forward 💪',
    };
  }, [errors]);

  // ─── EFFECTS ───
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
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

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

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height / 2 + Math.sin((x + frame * 3) * 0.05) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const packetX = (frame * 4) % canvas.width;
      const packetY = canvas.height / 2 + Math.sin((packetX + frame * 3) * 0.05) * 12;
      ctx.beginPath();
      ctx.arc(packetX, packetY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
      inactivityTimerRef.current = setTimeout(() => {
        const nextHint = challenge.hints[0];
        if (nextHint) {
          setCurrentHint(nextHint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(nextHint);
        }
      }, 12000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      setRevealedSteps(1);
      speechManager.speak('Let us review the step-by-step concept together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot on! Dark stores inside neighbourhoods create true proximity.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handleAdvanceToPrediction = useCallback(() => {
    setPhase('prediction');
    setPredictionAnswered(false);
    setSelectedPrediction(null);
    audioManager.play('whoosh');
    speechManager.speak('Predict the market behavior before you test it.');
  }, []);

  const handlePredictionSelect = useCallback((idx: number) => {
    setSelectedPrediction(idx);
    setPredictionAnswered(true);
    const pred = PREDICTION_QUESTIONS[currentPredictionIdx];
    if (idx === pred.correctIndex) {
      audioManager.play('success');
    } else {
      audioManager.play('pop');
    }
  }, [currentPredictionIdx]);

  const handleNextPredictionOrExplore = useCallback(() => {
    if (currentPredictionIdx + 1 < PREDICTION_QUESTIONS.length) {
      setCurrentPredictionIdx(p => p + 1);
      setPredictionAnswered(false);
      setSelectedPrediction(null);
      audioManager.play('whoosh');
    } else {
      setPhase('explore');
      audioManager.play('whoosh');
      speechManager.speak('Welcome to the interactive exploration lab. Manipulate the live systems and verify your predictions.');
    }
  }, [currentPredictionIdx]);

  const handleAdvanceToObservation = useCallback(() => {
    setPhase('observation');
    setObservationAnswered(false);
    setSelectedObservation(null);
    setCurrentObservationIdx(0);
    audioManager.play('whoosh');
    speechManager.speak('Now reflect on what you observed during simulation.');
  }, []);

  const handleObservationSelect = useCallback((idx: number) => {
    setSelectedObservation(idx);
    setObservationAnswered(true);
    const obs = OBSERVATION_QUESTIONS[currentObservationIdx];
    if (idx === obs.correctIndex) {
      audioManager.play('success');
    } else {
      audioManager.play('pop');
    }
  }, [currentObservationIdx]);

  const handleNextObservationOrSandbox = useCallback(() => {
    if (currentObservationIdx + 1 < OBSERVATION_QUESTIONS.length) {
      setCurrentObservationIdx(o => o + 1);
      setObservationAnswered(false);
      setSelectedObservation(null);
      audioManager.play('whoosh');
    } else {
      setPhase('sandbox');
      audioManager.play('whoosh');
      speechManager.speak('Now test your intuition in the free commerce sandbox.');
    }
  }, [currentObservationIdx]);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test your intuition in the free commerce sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setRevealedSteps(1);
    audioManager.play('whoosh');
    speechManager.speak('Ready for ISC board-level challenges? Test your knowledge!');
  }, []);

  const handleDarkStoreRadiusChange = useCallback((radius: number) => {
    setDarkStoreRadius(radius);
    audioManager.play('count');
  }, []);

  const handleOrderDemandChange = useCallback((demand: number) => {
    setOrderDemandIndex(demand);
    audioManager.play('balance');
  }, []);

  const handleChannelStageSelect = useCallback((stage: 'factory' | 'wholesaler' | 'retailer' | 'consumer') => {
    setActiveChannelStage(stage);
    audioManager.play('tap');
  }, []);

  const handleDematStepSelect = useCallback((step: number) => {
    setActiveDematStep(step);
    audioManager.play('tap');
  }, []);

  const handleSebiPillarSelect = useCallback((pillar: 'protective' | 'regulatory' | 'developmental') => {
    setActiveSebiPillar(pillar);
    audioManager.play('tap');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Commerce & Capital Markets simulation.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setRevealedSteps(1);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string, event?: React.MouseEvent) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      setSparklePos({ x: rect.left + rect.width / 2, y: rect.top });
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowSparkle(true);
      setShowExplanation(true);
      setRevealedSteps(1);
      speechManager.speak('Correct! Excellent commercial reasoning.');

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ score: 100, lastUpdated: Date.now() }));
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
        setRevealedSteps(1);
        speechManager.speak('Let us study the complete explanation below.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, showNextHint, hitMisconceptions]);

  // Drag handlers
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
      const initial = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = initial.splice(fromIndex, 1);
      initial.splice(toIndex, 0, moved);
      return initial;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const order = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(order);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ──��� HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 backdrop-blur"
      >
        <motion.div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-3xl p-2 bg-indigo-950/80 rounded-xl border border-indigo-700/50 block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent"
            >
              {title}
            </motion.h1>
            <motion.p className="text-xs text-slate-400">ISC Class 11 Commerce • Nodes 031–040</motion.p>
          </div>
        </motion.div>

        <motion.div className="flex items-center gap-3">
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700"
          >
            Mastery: <span className="text-emerald-400 capitalize">{masteryLevel}</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ─── LIVE ANIMATED DATA STREAM CANVAS ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative mb-6 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 h-10 flex items-center justify-between px-4"
      >
        <canvas ref={canvasRef} width={600} height={40} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />
        <motion.span className="relative z-10 text-xs font-mono text-cyan-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          NSE / BSE T+1 LIVE FEED • 10-MIN Q-COMMERCE MICRO-STORE SIMULATOR
        </motion.span>
        <motion.span className="relative z-10 text-xs font-mono text-slate-400">
          SENSEX: 74,250 | NIFTY 50: 22,500
        </motion.span>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <motion.div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/60">
            <motion.h2 className="text-xl font-bold text-indigo-200 mb-2">{SCENARIO.title}</motion.h2>
            <motion.p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</motion.p>
            <motion.p className="text-xs text-indigo-400 font-mono">{SCENARIO.context}</motion.p>
          </motion.div>

          <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <motion.div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <span>⚡ Discovery Question</span>
            </motion.div>
            <motion.p className="text-base text-slate-100 font-medium">{DISCOVERY_QUESTION.question}</motion.p>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                  aria-label={`Discovery option ${i + 1}`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </motion.div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <motion.div className={`p-4 rounded-xl text-sm ${discoveryCorrect ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800' : 'bg-amber-950/50 text-amber-300 border border-amber-800'}`}>
                  {discoveryCorrect ? '✓ Exactly right! Hyperlocal proximity compresses the delivery radius to 1–2 km.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToPrediction}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Proceed to Predictions Phase →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE: PREDICTION (PREDICT-THEN-CHECK PATTERN) ─── */}
      {phase === 'prediction' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-4 bg-indigo-950/50 border border-indigo-800/60 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wide">Predict-Then-Check Pattern</span>
              <h2 className="text-base md:text-lg font-bold text-white">Prediction {currentPredictionIdx + 1} of {PREDICTION_QUESTIONS.length}</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900/80 text-indigo-300 border border-indigo-700">
              Formulate Hypothesis
            </span>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-sm md:text-base text-slate-100 font-medium">
              {PREDICTION_QUESTIONS[currentPredictionIdx].question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {PREDICTION_QUESTIONS[currentPredictionIdx].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePredictionSelect(i)}
                  disabled={predictionAnswered}
                  className={`text-left p-4 rounded-xl border text-sm transition-all ${
                    predictionAnswered
                      ? i === PREDICTION_QUESTIONS[currentPredictionIdx].correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : selectedPrediction === i
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {predictionAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-xs font-bold text-indigo-300 uppercase">Predicted Reasoning:</p>
                  <p className="text-xs md:text-sm text-slate-300">{PREDICTION_QUESTIONS[currentPredictionIdx].predictionReasoning}</p>
                  <p className="text-xs font-semibold text-amber-300 pt-1">
                    🔍 Verification Task: {PREDICTION_QUESTIONS[currentPredictionIdx].verifyInstruction}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextPredictionOrExplore}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 text-sm"
                >
                  {currentPredictionIdx + 1 < PREDICTION_QUESTIONS.length ? 'Next Prediction Question →' : 'Launch Visual Lab to Verify Predictions →'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <motion.div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wide">
                Interactive Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </motion.div>
            <motion.div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-sm"
              >
                ← Prev
              </motion.button>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => s + 1)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Next →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToObservation}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm"
                >
                  Proceed to Observation Check →
                </motion.button>
              )}
            </motion.div>
          </motion.div>

          <motion.p className="text-sm text-amber-300 bg-amber-950/30 border border-amber-900/50 p-3 rounded-xl flex items-center gap-2">
            <span>👉 Action:</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 min-h-[420px]"
            >
              {/* SLIDE 1: DARK STORE & Q-COMMERCE RADIUS SIMULATOR */}
              {currentSlide === 0 && (
                <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <motion.div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 320" className="w-full h-auto">
                      <rect x="10" y="10" width="480" height="300" rx="16" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
                      <rect x="30" y="30" width="100" height="60" rx="8" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                      <text x="80" y="55" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">Central Warehouse</text>
                      <text x="80" y="72" textAnchor="middle" fill="#64748b" fontSize="9">45 km away (1-2 days)</text>

                      <circle cx="280" cy="170" r={darkStoreRadius * 7} fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                      <circle cx="280" cy="170" r="22" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="280" y="174" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Dark Store</text>
                      <text x="280" y="210" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">
                        Radius: {darkStoreRadius} km
                      </text>

                      <circle cx="340" cy="140" r="14" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" />
                      <text x="340" y="144" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">You</text>

                      <path d="M 280 170 Q 310 145 340 140" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 6" />
                      <text x="315" y="180" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        ⚡ {simulatedDeliveryTime} Mins
                      </text>
                    </svg>
                  </motion.div>

                  <motion.div className="lg:col-span-5 space-y-4">
                    <motion.div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
                      <label className="text-xs text-slate-300 font-semibold flex justify-between">
                        <span>Dark Store Service Radius:</span>
                        <span className="text-emerald-400 font-bold">{darkStoreRadius} km</span>
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={15}
                        step={0.5}
                        value={darkStoreRadius}
                        onChange={(e) => handleDarkStoreRadiusChange(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Adjust dark store radius"
                      />
                      <motion.div className="grid grid-cols-2 gap-2 text-xs pt-2">
                        <motion.div className="p-2 bg-slate-900 rounded-lg">
                          <span className="text-slate-400 block">Est. Delivery Time:</span>
                          <span className="text-base font-bold text-amber-400">{simulatedDeliveryTime} Mins</span>
                        </motion.div>
                        <motion.div className="p-2 bg-slate-900 rounded-lg">
                          <span className="text-slate-400 block">Monthly Rent:</span>
                          <span className="text-base font-bold text-rose-400">₹{(simulatedUrbanRent / 100000).toFixed(1)}L / mo</span>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    <motion.div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/50 text-xs text-slate-300 space-y-1">
                      <p className="font-bold text-indigo-300">💡 Q-Commerce Tradeoff:</p>
                      <p>High urban rents in residential zones (₹4L/mo) are the price paid for proximity. Only 2,000–3,000 fast-moving SKUs (milk, bread, chips) can justify this space!</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* SLIDE 2: THE 4-STAGE FMCG DISTRIBUTION CHANNEL */}
              {currentSlide === 1 && (
                <motion.div className="space-y-6">
                  <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'factory' as const, label: '1. Factory / Producer', role: 'Bulk Production (10,000s)', margin: 'Production Cost + Margin' },
                      { id: 'wholesaler' as const, label: '2. Wholesaler (Godown)', role: 'Bulk Breaking & Financing', margin: 'Thin Margin: 5%–10%' },
                      { id: 'retailer' as const, label: '3. Retailer (Kirana)', role: 'Single Units & Display', margin: 'Wider Margin: 15%–40%' },
                      { id: 'consumer' as const, label: '4. Final Consumer', role: 'End Household Consumption', margin: 'Pays Maximum Retail Price (MRP)' },
                    ].map((stage) => (
                      <motion.button
                        key={stage.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChannelStageSelect(stage.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeChannelStage === stage.id
                            ? 'bg-indigo-900/60 border-indigo-400 text-white shadow-lg shadow-indigo-950'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <p className="font-bold text-xs md:text-sm">{stage.label}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{stage.role}</p>
                        <p className="text-[10px] text-emerald-400 font-mono mt-1">{stage.margin}</p>
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    {activeChannelStage === 'factory' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <h4 className="text-base font-bold text-indigo-300">🏭 Producer / Factory (e.g. HUL Haridwar Plant)</h4>
                        <p className="text-sm text-slate-300">Produces millions of units. Cannot economically manage 9 million small kiranas directly. Sells in truckloads to regional wholesalers.</p>
                        <div className="flex gap-4 text-xs font-mono text-slate-400 pt-2">
                          <span>📦 Pack Size: 10,000 Soap Bars</span>
                          <span>💰 Cash Flow: Paid promptly by Wholesaler</span>
                        </div>
                      </motion.div>
                    )}
                    {activeChannelStage === 'wholesaler' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <h4 className="text-base font-bold text-amber-300">🏢 Wholesaler (e.g. Redington / Azadpur APMC Wholesaler)</h4>
                        <p className="text-sm text-slate-300">Takes TITLE (ownership) to the goods. Renders 6 vital services: Bulk-breaking, 30-day credit financing, warehousing, risk-bearing, market intelligence, and product assortment.</p>
                        <div className="flex gap-4 text-xs font-mono text-slate-400 pt-2">
                          <span>📦 Pack Size: 50–100 Units</span>
                          <span>⚠️ Risk: Bears price fluctuation & spoilage risk</span>
                        </div>
                      </motion.div>
                    )}
                    {activeChannelStage === 'retailer' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <h4 className="text-base font-bold text-emerald-300">🏪 Retailer (e.g. Apna Bazaar Kirana / Reliance Smart)</h4>
                        <p className="text-sm text-slate-300">The ONLY link having direct contact with the final consumer. Offers location convenience, 500–2,000 SKU assortment, credit (udhaar), and single unit sales.</p>
                        <div className="flex gap-4 text-xs font-mono text-slate-400 pt-2">
                          <span>📦 Pack Size: 1 Unit (Single Bar)</span>
                          <span>📜 Law: Governed by Legal Metrology MRP rules & CGST</span>
                        </div>
                      </motion.div>
                    )}
                    {activeChannelStage === 'consumer' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <h4 className="text-base font-bold text-sky-300">🏠 Final Consumer (Household / End User)</h4>
                        <p className="text-sm text-slate-300">Consumes the good for personal living. Crucial distinction: If a school canteen resells biscuits to students, the canteen is a reseller (wholesale purchase), NOT the final consumer!</p>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {/* SLIDE 3: STOCK EXCHANGE ORDER BOOK & PRICE DISCOVERY */}
              {currentSlide === 2 && (
                <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <motion.div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-400">Reliance Industries (NSE: RELIANCE)</span>
                      <span className="text-sm font-mono font-bold text-emerald-400">₹{stockMarketPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="priceColor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="time" stroke="#475569" fontSize={10} />
                          <YAxis domain={['auto', 'auto']} stroke="#475569" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                          <Area type="monotone" dataKey="price" stroke="#38bdf8" fillOpacity={1} fill="url(#priceColor)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div className="lg:col-span-5 space-y-4">
                    <motion.div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
                      <label className="text-xs text-slate-300 font-semibold flex justify-between">
                        <span>Market Sentiment:</span>
                        <span className={orderDemandIndex >= 50 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          {orderDemandIndex >= 50 ? '🐂 Bullish (Tejiwala)' : '🐻 Bearish (Mandiwala)'}
                        </span>
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={orderDemandIndex}
                        onChange={(e) => handleOrderDemandChange(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="Adjust order book demand"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Heavy Sell Orders (Bears)</span>
                        <span>Heavy Buy Orders (Bulls)</span>
                      </div>
                    </motion.div>

                    <motion.div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-slate-300 font-semibold">⚖️ Continuous Price Discovery:</p>
                      <p className="text-slate-400">Stock exchange prices are NOT fixed by the company or SEBI. They emerge in real-time as the equilibrium of thousands of bids (buy) and asks (sell).</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* SLIDE 4: PAPERLESS DEMAT ECOSYSTEM (T+1 SETTLEMENT) */}
              {currentSlide === 3 && (
                <motion.div className="space-y-4">
                  <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    {[
                      { step: 1, title: '1. Order Match (Day T)', text: 'Buyer & Seller match on NSE NEAT terminal at 10:15 AM.' },
                      { step: 2, title: '2. Clearing Novation', text: 'NCCL becomes legal counterparty guaranteeing settlement.' },
                      { step: 3, title: '3. Broker Transfer', text: 'Seller DP debits Demat; Buyer broker blocks bank funds.' },
                      { step: 4, title: '4. T+1 Demat Credit', text: 'Shares credited to CDSL/NSDL Demat; cash credited to Seller.' },
                    ].map((item) => (
                      <motion.button
                        key={item.step}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDematStepSelect(item.step)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeDematStep === item.step
                            ? 'bg-sky-950 border-sky-400 text-sky-200'
                            : 'bg-slate-800/50 border-slate-700 text-slate-400'
                        }`}
                      >
                        <p className="font-bold text-xs">{item.title}</p>
                        <p className="text-[11px] text-slate-300 mt-1">{item.text}</p>
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.div className="p-6 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 180" className="w-full h-auto">
                      <rect x="20" y="50" width="120" height="80" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="80" y="80" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">Seller Demat</text>
                      <text x="80" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">16-Digit BO ID</text>

                      <rect x="240" y="30" width="120" height="120" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="300" y="70" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Central Depository</text>
                      <text x="300" y="90" textAnchor="middle" fill="#34d399" fontSize="9">CDSL / NSDL</text>
                      <text x="300" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="8">+ Clearing House</text>

                      <rect x="460" y="50" width="120" height="80" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                      <text x="520" y="80" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Buyer Demat</text>
                      <text x="520" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">16-Digit BO ID</text>

                      <path d="M 140 90 L 240 90" stroke="#f59e0b" strokeWidth="3" />
                      <path d="M 360 90 L 460 90" stroke="#10b981" strokeWidth="3" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}

              {/* SLIDE 5: SEBI 3-PILLAR REGULATORY SHIELD */}
              {currentSlide === 4 && (
                <motion.div className="space-y-4">
                  <motion.div className="flex gap-3">
                    {[
                      { id: 'protective' as const, label: '1. Protective Functions', icon: '🛡️' },
                      { id: 'regulatory' as const, label: '2. Regulatory Functions', icon: '⚖️' },
                      { id: 'developmental' as const, label: '3. Developmental Functions', icon: '🚀' },
                    ].map((pillar) => (
                      <motion.button
                        key={pillar.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSebiPillarSelect(pillar.id)}
                        className={`flex-1 p-3 rounded-xl border text-center font-bold text-xs md:text-sm transition-all ${
                          activeSebiPillar === pillar.id
                            ? 'bg-indigo-900 border-indigo-400 text-white shadow-lg'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {pillar.icon} {pillar.label}
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    {activeSebiPillar === 'protective' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h4 className="text-base font-bold text-rose-300">🛡️ Protective Functions (Investor Defense)</h4>
                        <ul className="text-xs text-slate-300 space-y-2 mt-2">
                          <li>• <strong>Prohibition of Insider Trading:</strong> Penalising misuse of Unpublished Price Sensitive Information (e.g. ₹447 Cr RIL order).</li>
                          <li>• <strong>Banning Fraud & Price Manipulation:</strong> Barring manipulators like Ketan Parekh for 14 years.</li>
                          <li>• <strong>Grievance Redressal:</strong> Online SCORES platform ensuring investor complaints are resolved.</li>
                        </ul>
                      </motion.div>
                    )}
                    {activeSebiPillar === 'regulatory' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h4 className="text-base font-bold text-amber-300">⚖️ Regulatory Functions (Market Rules & Supervision)</h4>
                        <ul className="text-xs text-slate-300 space-y-2 mt-2">
                          <li>• <strong>Intermediary Registration:</strong> Mandatory registration of Brokers (Zerodha), Merchant Bankers, and DPs.</li>
                          <li>• <strong>Audit of Exchanges:</strong> Annual inspections of BSE & NSE listing agreements and bye-laws.</li>
                          <li>• <strong>Takeover Regulations:</strong> Mandatory open offers under SEBI SAST Regulations 2011.</li>
                        </ul>
                      </motion.div>
                    )}
                    {activeSebiPillar === 'developmental' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h4 className="text-base font-bold text-emerald-300">🚀 Developmental Functions (Market Modernisation)</h4>
                        <ul className="text-xs text-slate-300 space-y-2 mt-2">
                          <li>• <strong>ASBA Mandate (2008):</strong> IPO funds remain in applicant’s bank account earning interest until allotment.</li>
                          <li>• <strong>NISM Intermediary Training:</strong> Compulsory certifications for financial advisors and mutual fund agents.</li>
                          <li>• <strong>Nationwide Electronic Screen Trading:</strong> Rolling out NEAT and BOLT across all Indian cities.</li>
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE: OBSERVATION ('WHAT DO YOU NOTICE?') ─── */}
      {phase === 'observation' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-4 bg-sky-950/50 border border-sky-800/60 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-wide">Observation & Synthesis</span>
              <h2 className="text-base md:text-lg font-bold text-white">Observation Question {currentObservationIdx + 1} of {OBSERVATION_QUESTIONS.length}</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-sky-900/80 text-sky-300 border border-sky-700">
              What Do You Notice?
            </span>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-sm md:text-base text-slate-100 font-medium">
              {OBSERVATION_QUESTIONS[currentObservationIdx].question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {OBSERVATION_QUESTIONS[currentObservationIdx].observableOptions.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleObservationSelect(i)}
                  disabled={observationAnswered}
                  className={`text-left p-4 rounded-xl border text-sm transition-all ${
                    observationAnswered
                      ? i === OBSERVATION_QUESTIONS[currentObservationIdx].correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : selectedObservation === i
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-sky-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {observationAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <p className="text-xs font-bold text-sky-300 uppercase">Analysis:</p>
                  <p className="text-xs md:text-sm text-slate-300">{OBSERVATION_QUESTIONS[currentObservationIdx].explanation}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextObservationOrSandbox}
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 text-sm"
                >
                  {currentObservationIdx + 1 < OBSERVATION_QUESTIONS.length ? 'Next Observation Question →' : 'Enter Free Financial Sandbox →'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE COMMERCE SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-lg font-bold text-indigo-200">🧪 Hyperlocal Dark Store Financial Sandbox</h2>
            <p className="text-xs text-slate-400 mt-1">
              Test real unit economics without grading: Adjust Average Order Value (AOV), daily order density, and commercial rent to simulate store profitability.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <label className="text-xs text-slate-300 font-semibold flex justify-between">
                <span>Daily Orders / Store:</span>
                <span className="text-cyan-400 font-bold">{sandboxDailyOrders} orders</span>
              </label>
              <input
                type="range"
                min={200}
                max={2000}
                step={50}
                value={sandboxDailyOrders}
                onChange={(e) => setSandboxDailyOrders(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
                aria-label="Sandbox daily orders"
              />
            </motion.div>

            <motion.div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <label className="text-xs text-slate-300 font-semibold flex justify-between">
                <span>Average Order Value (AOV):</span>
                <span className="text-amber-400 font-bold">₹{sandboxAOV}</span>
              </label>
              <input
                type="range"
                min={150}
                max={900}
                step={25}
                value={sandboxAOV}
                onChange={(e) => setSandboxAOV(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
                aria-label="Sandbox average order value"
              />
            </motion.div>

            <motion.div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <label className="text-xs text-slate-300 font-semibold flex justify-between">
                <span>Monthly Rent (Location):</span>
                <span className="text-rose-400 font-bold">₹{(sandboxRent / 100000).toFixed(2)}L</span>
              </label>
              <input
                type="range"
                min={80000}
                max={600000}
                step={20000}
                value={sandboxRent}
                onChange={(e) => setSandboxRent(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
                aria-label="Sandbox monthly rent"
              />
            </motion.div>
          </motion.div>

          <motion.div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400 font-mono">ESTIMATED NET MONTHLY STORE RESULT:</p>
              <p className={`text-2xl md:text-3xl font-bold font-mono ${sandboxMonthlyProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {sandboxMonthlyProfit >= 0 ? '+' : ''}₹{sandboxMonthlyProfit.toLocaleString('en-IN')} / mo
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Gross Margin (18% on revenue) − (Rent + ₹2.2L Staff Salaries + ₹65k Power)
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/30"
            >
              Start Graded Challenges →
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES & GRADED ADAPTIVE PRACTICE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="font-mono text-indigo-400">
                Competency: <span className="capitalize">{challenge.competencyLevel}</span>
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <motion.h3 className="text-base md:text-lg font-semibold text-white mb-4 leading-relaxed">
              {challenge.question}
            </motion.h3>

            {/* TYPE 1: MCQ */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <motion.div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleAnswer(i, e)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* TYPE 2: DRAG-LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <motion.div className="space-y-4">
                <motion.div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Items:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['slot_1', 'slot_2', 'slot_3', 'slot_4'].map((slotId, idx) => (
                    <motion.div
                      key={slotId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-400">Position {idx + 1}:</span>
                      <span className="text-sm font-bold text-amber-300">
                        {droppedLabels[slotId] || 'Drop Label Here'}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAnswer(droppedLabels, e)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Verify Hierarchy Mapping
                </motion.button>
              </motion.div>
            )}

            {/* TYPE 3: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <motion.div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or reorder steps into correct sequential order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-sm cursor-grab flex items-center gap-3"
                    >
                      <span className="font-bold text-indigo-400 font-mono">{displayIdx + 1}.</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Verify Step Order
                </motion.button>
              </motion.div>
            )}

            {/* TYPE 4: NUMERIC */}
            {challenge.type === 'numeric' && (
              <motion.div className="space-y-3">
                <div className="flex items-center gap-3 max-w-md">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                    aria-label="Numeric calculation answer"
                  />
                  <span className="text-sm text-slate-400 font-semibold">{challenge.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAnswer(numericInput, e)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Submit Calculation
                </motion.button>
              </motion.div>
            )}

            {/* TYPE 5: CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <motion.div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <motion.div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-700 text-slate-200 hover:text-white rounded-lg text-xs font-mono border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </motion.div>

                <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-indigo-900/80 text-indigo-200 rounded-lg text-xs font-mono flex items-center gap-2"
                    >
                      {part}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))}
                        className="text-rose-400"
                      >
                        ✕
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click components above to build strategy sequence</span>}
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAnswer(constructParts.join(' '), e)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Validate Sequence
                </motion.button>
              </motion.div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD (CLICK-TO-REVEAL) */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-indigo-950/40 border border-indigo-800/60 rounded-xl space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Detailed Concept Review (Step-by-Step Breakdown):</p>
                <div className="space-y-2">
                  {explanationSteps.slice(0, revealedSteps).map((step, sIdx) => (
                    <motion.div key={sIdx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-slate-200 leading-relaxed flex items-start gap-2">
                      <span className="text-indigo-400 font-bold font-mono">Step {sIdx + 1}:</span>
                      <span>{step}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {revealedSteps < explanationSteps.length && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(r => r + 1)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                    >
                      Show next step ({revealedSteps}/{explanationSteps.length}) →
                    </motion.button>
                  )}
                  {revealedSteps >= explanationSteps.length && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* TOP COMPLETION BANNER */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-3xl border border-emerald-800 text-center space-y-2"
          >
            <motion.h2 className="text-2xl md:text-3xl font-bold text-white">Simulation Completed!</motion.h2>
            <motion.p className="text-lg font-mono text-emerald-400">Score: {Math.max(0, 100 - errors * 5)}% • Level: {masteryLevel.toUpperCase()}</motion.p>
            <motion.p className="text-xs text-slate-400">All 10 curriculum nodes (031–040) updated in your persistent learning record.</motion.p>
          </motion.div>

          {/* MOTIVATIONAL FEEDBACK SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl border bg-gradient-to-r ${motivationalFeedback.color} space-y-2`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <motion.h3 className="text-xl font-bold tracking-tight">{motivationalFeedback.title}</motion.h3>
              <motion.span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900/80 border border-slate-700">
                {motivationalFeedback.badge}
              </motion.span>
            </div>
            <motion.p className="text-sm text-slate-200 leading-relaxed">{motivationalFeedback.message}</motion.p>
          </motion.div>

          {/* REFLECTION SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-slate-900 rounded-2xl border border-indigo-900/60 space-y-4"
          >
            <motion.h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>💭</span> Reflection & Deep Processing
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-indigo-400">1. Key Surprise</p>
                <p className="text-xs text-slate-300 font-medium">What was the most surprising thing you learned?</p>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="e.g., How proximity matters more than speed in dark stores..."
                  className="w-full h-20 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-sky-400">2. Peer Explanation</p>
                <p className="text-xs text-slate-300 font-medium">How would you explain this to a friend?</p>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="e.g., The stock market is just a secondary resale platform..."
                  className="w-full h-20 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-emerald-400">3. Practical Application</p>
                <p className="text-xs text-slate-300 font-medium">Where in real life might you use this?</p>
                <textarea
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="e.g., Opening a Demat account or analyzing local retail udhaar..."
                  className="w-full h-20 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* MISCONCEPTION PROFILE */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3"
            >
              <motion.h3 className="text-sm font-bold text-rose-300 uppercase tracking-wide">⚠️ Key Misconceptions Reviewed:</motion.h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl text-xs space-y-1"
                    >
                      <p className="text-rose-400 font-bold">❌ Common Myth: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Commercial Reality: {m.correction}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* SPACED REPETITION SCHEDULE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-slate-300">Spaced Repetition (SM-2):</p>
              <p className="text-xs text-slate-400">Optimal review date in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}.</p>
            </div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-xs font-mono px-3 py-1 bg-indigo-950 text-indigo-300 rounded-lg border border-indigo-800"
            >
              Interval: {REVIEW_INTERVAL_DAYS[Math.min(5, 5 - Math.min(4, errors))]} Days
            </motion.span>
          </motion.div>

          {/* REAL-WORLD ACTIVITY */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
          >
            <motion.h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</motion.h3>
            <motion.p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</motion.p>
            <ul className="space-y-2 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 4 }}
                  className="flex gap-2"
                >
                  <span className="text-indigo-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C11_CommerceQcommercequickCommerceSim;
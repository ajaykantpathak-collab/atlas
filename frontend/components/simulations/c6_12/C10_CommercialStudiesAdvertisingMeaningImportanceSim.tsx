'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ──────────────────────────���─────────────────────
const NODE_C10_COMMSTUD_011 = 'c10_commstud_011';
const NODE_C10_COMMSTUD_012 = 'c10_commstud_012';
const NODE_C10_COMMSTUD_013 = 'c10_commstud_013';
const NODE_C10_COMMSTUD_014 = 'c10_commstud_014';
const NODE_C10_COMMSTUD_015 = 'c10_commstud_015';
const NODE_C10_COMMSTUD_016 = 'c10_commstud_016';
const NODE_C10_COMMSTUD_017 = 'c10_commstud_017';
const NODE_C10_COMMSTUD_018 = 'c10_commstud_018';
const NODE_C10_COMMSTUD_019 = 'c10_commstud_019';
const NODE_C10_COMMSTUD_020 = 'c10_commstud_020';

const ALL_NODE_IDS = [
  NODE_C10_COMMSTUD_011,
  NODE_C10_COMMSTUD_012,
  NODE_C10_COMMSTUD_013,
  NODE_C10_COMMSTUD_014,
  NODE_C10_COMMSTUD_015,
  NODE_C10_COMMSTUD_016,
  NODE_C10_COMMSTUD_017,
  NODE_C10_COMMSTUD_018,
  NODE_C10_COMMSTUD_019,
  NODE_C10_COMMSTUD_020,
];

// ─── NARRATIVE SCENARIO ─────────────────────────────────────────────────────
const SCENARIO = {
  title: 'The "Swadeshi Naturals" Business Expansion Odyssey',
  intro: 'You have been hired as Chief Commercial Strategist for Swadeshi Naturals, an Indian FMCG brand competing with HUL and Dabur. You must plan high-impact advertising, coordinate with top ad agencies, launch social awareness and sales promotions, enforce consumer rights under CPA 2019, scale via e-commerce ERP, and balance capital/revenue accounting to build the final Trading Account.',
  context: 'Your decisions will directly impact brand reach, legal compliance, inventory turnover, and gross profit.',
};

// ─── REAL-WORLD ACTIVITY ────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Real-World FMCG Commercial Strategy & Accounts Plan',
  description: 'Apply your commercial studies knowledge by creating a comprehensive 4-pillar launch strategy for an Indian enterprise (such as Swadeshi Naturals, Amul, or Tata Consumer Products).',
  steps: [
    'Step 1 (Promotion & Publicity): Formulate a 30-day launch plan contrasting a paid TV commercial campaign (identifying sponsor, target audience, and media reach) with an unpaid CSR publicity initiative.',
    'Step 2 (Sales Promotion): Design a short-term festive promotion (e.g., premium gift bundle or 5-day rebate) ensuring it triggers volume spikes without causing permanent price erosion.',
    'Step 3 (Consumer Protection & ERP): Establish mandatory CCPA compliance protocols under CPA 2019 (safe labeling, transparent refund terms) and configure ERP modules (MM, SD, FI) for synchronized order handling.',
    'Step 4 (Final Accounts Preparation): Assemble a verified pro-forma Trading Account separating direct factory expenses from administrative costs to determine accurate Gross Profit.',
  ],
};

// ─── DISCOVERY HOOK ─────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'Swadeshi Naturals spends ₹50 Lakhs on an IPL prime-time television slot, while a national daily publishes a glowing unpaid editorial about their organic herbs. Which statement is TRUE?',
  options: [
    'Both are advertising because both promote the brand.',
    'The TV slot is paid Advertising (sponsor-controlled); the newspaper article is unpaid Publicity (uncontrolled).',
    'The editorial is advertising because it generates brand goodwill.',
    'Neither is promotion because only personal selling counts.',
  ],
  correctIndex: 1,
  hintAfter: 'Follow the money and control: If money is paid to the medium by an identified sponsor, it is Advertising. Unpaid, third-party coverage is Publicity!',
};

// ─── INTERFACES ─────────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ──────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_COMMSTUD_011,
  title: 'Commercial Studies: Promotion, Consumer Protection, E-Commerce & Financial Statements',
  definition: 'Comprehensive commercial mastery: Advertising, Publicity, Agency Functions, Social Media, Sales Promotion, Consumer Protection Act 2019, Consumer Exploitation, E-Commerce, ERP, Capital vs Revenue Receipts/Expenditure, and Trading Account Preparation.',
  eli5: 'Learn how modern businesses promote goods ethically, safeguard buyers under the law, use digital tools and ERP, and calculate their real trading gross profit.',
  misconceptions: [
    { misconception: 'Any brand mention in the media is advertising.', correction: 'Advertising requires money paid by an identified sponsor. Unpaid media mentions are publicity.' },
    { misconception: 'Sales promotion and advertising are the same thing.', correction: 'Advertising is long-term brand building; sales promotion offers short-term time-bound incentives for an immediate sales spike.' },
    { misconception: 'The Tata Tea Jaago Re campaign is pure social advertising.', correction: 'It is cause-related marketing because a commercial company gains brand equity and sales from social messaging.' },
    { misconception: 'A loan taken from a bank is a revenue receipt because cash enters the business.', correction: 'A loan creates a liability to repay, making it a capital receipt shown on the Balance Sheet.' },
    { misconception: 'Closing stock goes on the debit side of the Trading Account like Opening stock.', correction: 'Closing stock represents unsold goods and goes on the credit side to reduce the Cost of Goods Sold.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the primary defining hallmark of advertising?', options: ['Free word of mouth', 'Paid non-personal promotion by identified sponsor', 'Door-to-door selling', 'Government notification'], correctIndex: 1 },
    { question: 'Which agency created the famous "Daag Achhe Hain" campaign?', options: ['Mudra', 'Ogilvy India / Lowe Lintas', 'McCann', 'FCB Ulka'], correctIndex: 1 },
    { question: 'What was the historic social ad tagline for India’s Polio campaign?', options: ['Swachh Bharat', 'Do Boond Zindagi Ki', 'Jaago Grahak Jaago', 'Atithi Devo Bhava'], correctIndex: 1 },
    { question: 'A "Buy 1 Get 1 Free" Republic Day sale is classified as:', options: ['Pricing decision', 'Sales promotion technique (premium/discount)', 'Publicity', 'Direct selling'], correctIndex: 1 },
    { question: 'When did the Consumer Protection Act 2019 come into force?', options: ['15 August 1986', '20 July 2020', '26 January 2021', '1 April 2019'], correctIndex: 1 },
    { question: 'What central regulatory authority was established under Section 10 of CPA 2019?', options: ['TRAI', 'FSSAI', 'CCPA', 'SEBI'], correctIndex: 2 },
    { question: 'Which ERP module automates purchase orders and vendor material tracking?', options: ['Finance (FI)', 'Sales (SD)', 'Materials Management (MM)', 'Human Resources (HR)'], correctIndex: 2 },
    { question: 'Formula for Gross Profit in the Trading Account is:', options: ['Sales + Closing Stock', 'Net Sales − Cost of Goods Sold', 'Total Debits + Credits', 'Purchases − Returns'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of advertising, publicity, sales promotion, CPA 2019, consumer awareness, e-commerce ERP systems, capital vs revenue classification, and Trading Account preparation.',
};

// ─── EXPLORATION STEPS ──────────────────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: '1. Ad Agency Workflow & Media Buying',
    instruction: 'Select each agency department below to see how a ₹10 Lakh campaign moves from Client Brief to Prime-Time Airing.',
    interactionType: 'click-parts',
    nodeId: NODE_C10_COMMSTUD_012,
  },
  {
    title: '2. Social Advertising vs Cause Marketing',
    instruction: 'Toggle between "Pulse Polio" (pure social ad) and "Jaago Re" (cause-related marketing) to see the revenue loop difference.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_COMMSTUD_013,
  },
  {
    title: '3. Sales Promotion vs Permanent Price Cuts',
    instruction: 'Adjust the promotion discount duration slider and observe the spike in weekly volume vs long-term brand equity.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_COMMSTUD_014,
  },
  {
    title: '4. Consumer Protection Act 2019 Defense Matrix',
    instruction: 'Click on different commercial violations to activate the corresponding consumer right and CCPA regulatory power.',
    interactionType: 'click-parts',
    nodeId: NODE_C10_COMMSTUD_015,
  },
  {
    title: '5. Interactive Trading Account Simulator',
    instruction: 'Adjust Opening Stock, Purchases, Direct Wages, and Closing Stock to see real-time Gross Profit calculation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_COMMSTUD_020,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ─────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Swadeshi Naturals invests ₹40 Lakhs in high-frequency TV advertising during Diwali, what will happen to unit production costs as volume surges?',
    options: [
      'Unit production costs will skyrocket due to ad fees.',
      'Unit fixed costs will decrease due to economies of scale from mass demand.',
      'No change in cost or volume whatsoever.',
      'Retailers will immediately stop stocking the product.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Notice how advertising generates massive volume that spreads factory overheads across millions of packets!',
    nodeId: NODE_C10_COMMSTUD_011,
  },
  {
    question: 'Predict: If a company spends ₹6,00,000 on a heavy brand launch ad with benefits lasting 3 years, how should Year 1 P&L be debited?',
    options: [
      'Debit all ₹6,00,000 to Year 1 as revenue expenditure.',
      'Debit ₹2,00,000 to Year 1 P&L as deferred revenue write-off, showing ₹4,00,000 on the Balance Sheet.',
      'Capitalise the full ₹6,00,000 as permanent plant machinery.',
      'Do not record it until Year 3 ends.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Deferred revenue expenditure is written off systematically across the multi-year benefit period!',
    nodeId: NODE_C10_COMMSTUD_019,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about Gross Profit when Closing Stock increases while sales and purchases stay fixed?',
    observableOptions: [
      'Gross Profit increases because unsold stock reduces Cost of Goods Sold.',
      'Gross Profit decreases because unsold stock is an expense.',
      'Gross Profit remains unchanged.',
      'Gross Profit becomes negative immediately.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_COMMSTUD_020,
  },
  {
    question: 'What happens in an ERP system when an e-tailing order is placed on Flipkart?',
    observableOptions: [
      'Only the customer receives an email; inventory is updated manually weeks later.',
      'SD (Sales), MM (Inventory), and FI (Finance) modules update simultaneously in a single unified database.',
      'The transaction is deleted from accounting records.',
      'ERP only handles employee payroll.',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_COMMSTUD_017,
  },
];

// ─── 22 COMPREHENSIVE CHALLENGES ────────────────────────────────────────────
const CHALLENGES: Challenge[] = [
  // 1. NODE 011 - Foundation Recall
  {
    id: 'ch_011_f1',
    nodeId: NODE_C10_COMMSTUD_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following contains the three essential defining elements of Advertising?',
    options: [
      'Paid, Personal selling, Secret sponsor',
      'Paid, Non-personal communication, Identified sponsor',
      'Unpaid, Personal interview, Government medium',
      'Unpaid, Non-personal broadcast, Anonymous author',
    ],
    correctIndex: 1,
    explanation: 'Advertising is defined as paid, non-personal communication by an identified sponsor through mass media.',
    hints: [
      'Think about why a brand spends money and shows its logo.',
      'It is non-personal because it addresses a mass audience, not one customer.',
      'The three key words: Paid, Non-personal, Identified sponsor.',
    ],
    misconceptionIndex: 0,
  },
  // 2. NODE 011 - Standard Application (ASCI Regulation)
  {
    id: 'ch_011_s1',
    nodeId: NODE_C10_COMMSTUD_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A water purifier company airs a TV commercial claiming "Cooked food is poison without our purifier". ASCI upholds 1,200+ consumer complaints. Under which rule is this curb enforced on cable TV?',
    options: [
      'Factories Act 1948 Section 12',
      'Cable Television Networks (Regulation) Act 1995, Rule 7',
      'Partnership Act 1932 Section 4',
      'Indian Contract Act 1872 Section 10',
    ],
    correctIndex: 1,
    explanation: 'Rule 7 of the Cable Television Networks (Regulation) Act 1995 makes compliance with the ASCI Code mandatory for all TV advertisements.',
    hints: [
      'Look for the regulation specifically governing cable television in India.',
      'It was enacted in 1995 to regulate television broadcasts.',
      'It is the Cable Television Networks (Regulation) Act 1995, Rule 7.',
    ],
  },
  // 3. NODE 012 - Foundation Distinguish (Ad vs Publicity)
  {
    id: 'ch_012_f1',
    nodeId: NODE_C10_COMMSTUD_012,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does Advertising differ essentially from Publicity in terms of payment and control?',
    options: [
      'Advertising is unpaid and uncontrolled; Publicity is paid and controlled.',
      'Advertising is paid and sponsor-controlled; Publicity is unpaid and third-party controlled.',
      'Both are paid by the company and completely controlled.',
      'Publicity always has a positive tone while Advertising is always negative.',
    ],
    correctIndex: 1,
    explanation: 'Advertising is paid for and fully controlled by the sponsor. Publicity is unpaid, third-party originated, and can even turn negative.',
    hints: [
      'Who pays for the newspaper space or TV broadcast?',
      'Can Nestlé control negative news reports during a product recall?',
      'Advertising = Paid + Controlled; Publicity = Unpaid + Uncontrolled.',
    ],
    misconceptionIndex: 0,
  },
  // 4. NODE 012 - Standard Analysis (Maggi 2015 Case)
  {
    id: 'ch_012_s1',
    nodeId: NODE_C10_COMMSTUD_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In June 2015, news channels aired widespread reports of lead in Maggi noodles. In November 2015, Nestlé launched the "We Miss You Too" TV campaign through McCann Worldgroup. Classify these two events in order:',
    options: [
      'Event 1: Negative Advertising; Event 2: Unpaid Publicity',
      'Event 1: Negative Publicity; Event 2: Paid Advertising',
      'Event 1: Sales Promotion; Event 2: Personal Selling',
      'Event 1: Public Relations; Event 2: ERP Integration',
    ],
    correctIndex: 1,
    explanation: 'The June news coverage was unpaid, uncontrolled Negative Publicity. The November campaign was paid, sponsor-controlled Advertising created by ad agency McCann.',
    hints: [
      'Did Nestlé pay TV channels to broadcast the lead contamination news?',
      'Did Nestlé pay McCann to design the emotional "We Miss You Too" campaign?',
      'The first is unpaid negative publicity; the second is paid promotional advertising.',
    ],
  },
  // 5. NODE 012 - Drag Sort (Ad Agency Workflow)
  {
    id: 'ch_012_adv_sort',
    nodeId: NODE_C10_COMMSTUD_012,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the 5 sequential steps of an Advertising Agency workflow in the correct chronological order:',
    sortItems: [
      'Receive Client Brief & Goals',
      'Conduct Market Research & Target Profiling',
      'Copywriting & Creative Design Execution',
      'Media Selection & Slot Buying (TV/Digital)',
      'Campaign Launch & Post-Ad Evaluation',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Agency workflow begins with the Client Brief, moves to Market Research, creative development, media placement, and finishes with post-campaign evaluation.',
    hints: [
      'The agency cannot write copy until they receive the client brief and conduct research.',
      'Creative design precedes media buying.',
      'Post-campaign evaluation is always the final step.',
    ],
  },
  // 6. NODE 013 - Foundation Recall (Social Ad Examples)
  {
    id: 'ch_013_f1',
    nodeId: NODE_C10_COMMSTUD_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Indian official agency under the Ministry of Information & Broadcasting releases Government social advertisements across Doordarshan and AIR?',
    options: [
      'BOC (Bureau of Outreach and Communication, formerly DAVP)',
      'IRDAI',
      'SEBI',
      'ASCI',
    ],
    correctIndex: 0,
    explanation: 'The Bureau of Outreach and Communication (BOC, formerly DAVP) is the nodal government agency for releasing public social awareness ads.',
    hints: [
      'It was formerly known as DAVP (Directorate of Advertising & Visual Publicity).',
      'It operates under the Ministry of Information & Broadcasting.',
      'It is the BOC (Bureau of Outreach and Communication).',
    ],
  },
  // 7. NODE 013 - Standard Evaluation (Social Ad vs Cause-Related Marketing)
  {
    id: 'ch_013_s1',
    nodeId: NODE_C10_COMMSTUD_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why is the Tata Tea "Jaago Re" campaign classified as Cause-Related Marketing rather than Pure Social Advertising?',
    options: [
      'Because it only ran on radio channels without video.',
      'Because a commercial profit-seeking firm gains brand equity and sales revenue from the social messaging.',
      'Because it did not feature any celebrity actors.',
      'Because the government banned the advertisement.',
    ],
    correctIndex: 1,
    explanation: 'Pure social advertising has no commercial revenue loop for the sponsor. Tata Tea uses social awakeness themes to boost its commercial tea brand equity and sales.',
    hints: [
      'Ask: Does the sponsor sell a commercial product tied to the campaign?',
      'Tata Tea is a profit-seeking corporation, not a government ministry or charitable NGO.',
      'Commercial brand benefit = Cause-Related Marketing.',
    ],
    misconceptionIndex: 2,
  },
  // 8. NODE 014 - Foundation Distinguish (Sales Promotion vs Ad)
  {
    id: 'ch_014_f1',
    nodeId: NODE_C10_COMMSTUD_014,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which pair correctly highlights the difference in Time Horizon and Objective between Advertising and Sales Promotion?',
    options: [
      'Advertising: Short-term cash push | Sales Promotion: Long-term goodwill',
      'Advertising: Long-term brand image building | Sales Promotion: Short-term immediate sales volume spike',
      'Advertising: Unpaid media | Sales Promotion: Television broadcasts only',
      'Advertising: Zero cost | Sales Promotion: Fixed media fee only',
    ],
    correctIndex: 1,
    explanation: 'Advertising builds durable brand recall and image over years, while Sales Promotion offers temporary incentives for immediate sales spikes.',
    hints: [
      'Think about the Cadbury Dairy Milk campaign (years) vs Big Bazaar 5-day sale.',
      'Sales promotion is by definition short-term and time-bound.',
      'Advertising = Long-term Brand Image; Sales Promotion = Short-term Sales Volume.',
    ],
    misconceptionIndex: 1,
  },
  // 9. NODE 014 - Standard Application (Identify Sales Promotion Technique)
  {
    id: 'ch_014_s1',
    nodeId: NODE_C10_COMMSTUD_014,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Colgate attaches a free 50g toothbrush sample to a 200g family toothpaste pack. Which sales promotion technique is being used?',
    options: [
      'Rebate',
      'Premium (Free Gift / Bundled Offer)',
      'Contest',
      'Point-of-Purchase Display',
    ],
    correctIndex: 1,
    explanation: 'A premium or free gift offers an extra item at no extra cost alongside the purchase of the main product.',
    hints: [
      'The consumer receives an extra physical item along with the product.',
      'It is not a cashback refund (rebate) or a lottery contest.',
      'It is called a Premium (or Free Gift) technique.',
    ],
  },
  // 10. NODE 014 - Advanced Analysis (Permanent Cut vs Promotion)
  {
    id: 'ch_014_adv1',
    nodeId: NODE_C10_COMMSTUD_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Hindustan Unilever reduces the printed MRP of Lux soap from ₹40 to ₹35 indefinitely. Separately, Amazon runs "FESTIVE50" for 3 days only. Classify these two actions:',
    options: [
      'Lux = Sales Promotion; Amazon = Pricing Decision',
      'Lux = Pricing Decision (permanent); Amazon = Sales Promotion (temporary incentive)',
      'Both are Advertising expenses',
      'Both are Capital expenditures',
    ],
    correctIndex: 1,
    explanation: 'A permanent reduction in price is a core Pricing decision under the marketing mix. A time-bound discount or coupon is a Sales Promotion.',
    hints: [
      'Check the temporariness test: Is the offer temporary or permanent?',
      'Permanent price changes belong to the Pricing function.',
      'Temporary coupon codes belong to Sales Promotion.',
    ],
  },
  // 11. NODE 015 - Foundation Recall (CPA 2019 Enforcement & Rights)
  {
    id: 'ch_015_f1',
    nodeId: NODE_C10_COMMSTUD_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Consumer Protection Act 2019 (effective 20 July 2020), which new central regulatory authority was established with suo motu investigation powers?',
    options: [
      'Central Vigilance Commission (CVC)',
      'Central Consumer Protection Authority (CCPA)',
      'National Company Law Tribunal (NCLT)',
      'Competition Commission of India (CCI)',
    ],
    correctIndex: 1,
    explanation: 'Section 10 of CPA 2019 established the CCPA (Central Consumer Protection Authority) to proactively investigate consumer violations and misleading ads.',
    hints: [
      'It has the acronym CCPA.',
      'It is the Central Consumer Protection Authority.',
    ],
  },
  // 12. NODE 015 - Drag Label (Consumer Rights Diagram)
  {
    id: 'ch_015_drag_rights',
    nodeId: NODE_C10_COMMSTUD_015,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the four scenario violations to the specific Consumer Right guaranteed under CPA 2019:',
    dragItems: [
      { label: 'Right to Safety', targetId: 'box_safety' },
      { label: 'Right to be Informed', targetId: 'box_informed' },
      { label: 'Right to Choose', targetId: 'box_choose' },
      { label: 'Right to Seek Redressal', targetId: 'box_redressal' },
    ],
    correctMapping: {
      box_safety: 'Right to Safety',
      box_informed: 'Right to be Informed',
      box_choose: 'Right to Choose',
      box_redressal: 'Right to Seek Redressal',
    },
    explanation: 'The statutory consumer rights protect against hazardous goods (Safety), false claims/missing MRP (Informed), forced bundling (Choose), and ensure monetary compensation (Redressal).',
    hints: [
      'Exploding appliances violate the Right to Safety.',
      'Hidden ingredients or fake MRP violate the Right to be Informed.',
      'Forced tied-in sales violate the Right to Choose.',
    ],
  },
  // 13. NODE 015 - Advanced Application (E-Commerce Jurisdiction)
  {
    id: 'ch_015_adv1',
    nodeId: NODE_C10_COMMSTUD_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A customer in Ranchi buys a defective smartwatch for ₹45,000 on Flipkart. Flipkart customer care refuses return citing "No Refund" policy. Under CPA 2019, where should the consumer file a case?',
    options: [
      'District Consumer Disputes Redressal Commission (Jurisdiction up to ₹1 Crore)',
      'Directly to the Supreme Court of India',
      'State Commission only (Jurisdiction ₹10 to ₹50 Crore)',
      'Nowhere, because e-commerce is outside consumer law',
    ],
    correctIndex: 0,
    explanation: 'Section 2(7) of CPA 2019 covers e-commerce buyers as consumers, and the District Commission has pecuniary jurisdiction up to ₹1 Crore.',
    hints: [
      'The claim amount is ₹45,000, which is well below ₹1 Crore.',
      'The first-tier tribunal for claims under ₹1 Crore is the District Commission.',
      'CPA 2019 Section 2(7) explicitly protects online buyers.',
    ],
  },
  // 14. NODE 016 - Standard Analysis (Consumer Exploitation Types)
  {
    id: 'ch_016_s1',
    nodeId: NODE_C10_COMMSTUD_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During the 2020 lockdown, a trader stockpiles 10,000 N95 masks in a godown to create artificial scarcity, and then sells them at ₹250 each against an MRP of ₹50. What two exploitation practices occurred in sequence?',
    options: [
      'Under-weighing followed by Adulteration',
      'Hoarding (stockpiling in godown) followed by Black Marketing (selling above MRP)',
      'Sales Promotion followed by Publicity',
      'E-tailing followed by ERP sync',
    ],
    correctIndex: 1,
    explanation: 'Hoarding is the deliberate accumulation of goods to manufacture scarcity (the cause); Black Marketing is selling them above MRP (the price effect).',
    hints: [
      'Storing goods away to create a shortage is hoarding.',
      'Selling above the printed Maximum Retail Price is black marketing.',
      'Sequence: Hoarding -> Black Marketing.',
    ],
    misconceptionIndex: 0,
  },
  // 15. NODE 017 - Foundation Recall (ERP Modules)
  {
    id: 'ch_017_f1',
    nodeId: NODE_C10_COMMSTUD_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the core defining feature of an Enterprise Resource Planning (ERP) software system like SAP or Oracle?',
    options: [
      'It is purely a standalone spreadsheet for typing letters.',
      'It integrates all core business functions (Finance, Sales, HR, Inventory, Procurement) into a single unified database.',
      'It only tracks social media followers on Instagram.',
      'It replaces the need for a physical warehouse.',
    ],
    correctIndex: 1,
    explanation: 'ERP integrates multiple business processes into one centralized database, eliminating duplicate data entry and streamlining cross-functional workflows.',
    hints: [
      'Think about SAP S/4HANA at Tata Steel or Reliance.',
      'It connects finance, materials, sales, and HR together.',
      'Single unified database across all business departments.',
    ],
  },
  // 16. NODE 017 - Standard Application (E-Commerce Sub-Functions)
  {
    id: 'ch_017_s1',
    nodeId: NODE_C10_COMMSTUD_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Differentiate E-Advertising from E-Marketing using the Indian retail landscape:',
    options: [
      'E-Advertising is the paid digital ad (e.g. Google PPC banner); E-Marketing is the broader strategy (SEO, email campaigns, content, influencers).',
      'E-Advertising is free; E-Marketing is only TV commercials.',
      'E-Advertising only sells hardware; E-Marketing only sells groceries.',
      'There is no difference whatsoever between them.',
    ],
    correctIndex: 0,
    explanation: 'E-advertising is a single paid tool (e.g., Google Ads banner). E-marketing is the total overarching digital strategy including paid ads, organic SEO, emails, and content.',
    hints: [
      'Remember the toolbox analogy: E-advertising is the hammer; E-marketing is carpentry.',
      'Paid click ad = E-Advertising; Whole digital strategy = E-Marketing.',
    ],
  },
  // 17. NODE 018 - Standard Classify (Capital vs Revenue Receipts)
  {
    id: 'ch_018_s1',
    nodeId: NODE_C10_COMMSTUD_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Classify the following two cash inflows for Tata Motors: (1) ₹25,000 Crore collected from selling cars in showrooms, (2) ₹5,000 Crore bank loan taken from SBI for 7 years.',
    options: [
      '(1) Capital Receipt, (2) Revenue Receipt',
      '(1) Revenue Receipt (recurring sales income), (2) Capital Receipt (creates a long-term liability)',
      'Both are Revenue Receipts',
      'Both are Capital Receipts',
    ],
    correctIndex: 1,
    explanation: 'Sale of cars is routine operating revenue income (P&L credit). A bank loan is a non-recurring borrowing that creates a liability on the Balance Sheet (Capital Receipt).',
    hints: [
      'Selling cars is regular, daily, recurring business.',
      'A ₹5,000 Cr loan must be repaid and creates a long-term liability.',
      '(1) = Revenue Receipt, (2) = Capital Receipt.',
    ],
    misconceptionIndex: 3,
  },
  // 18. NODE 018 - Advanced Evaluation (Government Receipts)
  {
    id: 'ch_018_adv1',
    nodeId: NODE_C10_COMMSTUD_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In May 2022, the Government of India received ₹20,557 Crore from the LIC IPO disinvestment. Why is this classified as a Capital Receipt in the Union Budget?',
    options: [
      'Because it is monthly recurring tax collection.',
      'Because it is non-recurring and reduces a government asset (ownership stake in LIC).',
      'Because the money was spent on salaries.',
      'Because it came directly from foreign tourist visas.',
    ],
    correctIndex: 1,
    explanation: 'Disinvestment proceeds are non-recurring and directly reduce government equity assets, satisfying the strict test of a Capital Receipt.',
    hints: [
      'Does the government sell LIC shares every single month?',
      'Does selling shares reduce the government’s owned asset base?',
      'Non-recurring + Asset Reduction = Capital Receipt.',
    ],
  },
  // 19. NODE 019 - Standard Classify (Capital vs Revenue Expenditure)
  {
    id: 'ch_019_s1',
    nodeId: NODE_C10_COMMSTUD_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Classify these expenses: (A) ₹50 Lakhs spent by Tata Steel on monthly factory worker wages, (B) ₹3,500 Crore spent on erecting a new blast furnace with a 25-year lifespan.',
    options: [
      '(A) Capital Expenditure, (B) Revenue Expenditure',
      '(A) Revenue Expenditure (routine operating cost), (B) Capital Expenditure (creates long-term productive asset)',
      'Both are Deferred Revenue Expenditures',
      'Both are Capital Receipts',
    ],
    correctIndex: 1,
    explanation: 'Wages are routine monthly operating expenses charged to Trading/P&L. The blast furnace creates a permanent fixed asset shown on the Balance Sheet.',
    hints: [
      'Which expense is consumed this month? Which creates an asset for 25 years?',
      'Wages = Revenue Expenditure; Blast Furnace = Capital Expenditure.',
    ],
  },
  // 20. NODE 019 - Numeric Calculation (Deferred Revenue Write-off)
  {
    id: 'ch_019_num1',
    nodeId: NODE_C10_COMMSTUD_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Reliance Jio spent ₹4,000 Crore on its nationwide 4G launch campaign, deciding to write it off equally over 4 years. What is the unwritten balance remaining on the Balance Sheet under Fictitious Assets at the end of Year 2 (in ₹ Crores)?',
    correctAnswer: 2000,
    tolerance: 0,
    unit: 'Crores',
    explanation: 'Annual write-off = ₹4,000 Cr ÷ 4 = ₹1,000 Cr/yr. After 2 years, total written off = ₹2,000 Cr. Remaining balance = ₹4,000 − ₹2,000 = ₹2,000 Crore.',
    hints: [
      'First calculate the annual write-off: Total ÷ 4 years.',
      'Multiply the annual write-off by 2 years to find the total amortised amount.',
      'Subtract the 2-year amortised sum from ₹4,000 Crore: 4000 - 2000 = ?',
    ],
  },
  // 21. NODE 020 - Numeric Trading Account (Gross Profit Computation)
  {
    id: 'ch_020_num_gp',
    nodeId: NODE_C10_COMMSTUD_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate Gross Profit from the following Trial Balance items: Net Sales = ₹10,00,000; Opening Stock = ₹1,50,000; Net Purchases = ₹5,50,000; Direct Wages & Freight = ₹1,00,000; Closing Stock = ₹2,00,000. (Enter amount in ₹):',
    correctAnswer: 400000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Cost of Goods Sold = Opening Stock (₹1,50,000) + Net Purchases (₹5,50,000) + Direct Expenses (₹1,00,000) − Closing Stock (₹2,00,000) = ₹6,00,000. Gross Profit = Net Sales (₹10,00,000) − ₹6,00,000 = ₹4,00,000.',
    hints: [
      'Formula: Cost of Goods Sold = Opening Stock + Purchases + Direct Expenses - Closing Stock.',
      'COGS = 1,50,000 + 5,50,000 + 1,00,000 - 2,00,000 = 6,00,000.',
      'Gross Profit = Net Sales (10,00,000) - COGS (6,00,000) = ?',
    ],
  },
  // 22. NODE 020 - Advanced Construct (Trading Account T-Format)
  {
    id: 'ch_020_adv_construct',
    nodeId: NODE_C10_COMMSTUD_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct items that belong on the DEBIT side of a CISCE Trading Account by selecting them below:',
    availableParts: [
      'To Opening Stock',
      'To Net Purchases',
      'To Direct Wages & Carriage Inwards',
      'By Net Sales',
      'By Closing Stock',
      'To Office Salaries & Rent',
    ],
    targetState: 'To Opening Stock To Net Purchases To Direct Wages & Carriage Inwards',
    validationHint: 'Select all direct cost debit items only. Do not select Credit items or Indirect P&L expenses!',
    explanation: 'Debit side of Trading Account contains: To Opening Stock, To Net Purchases, and Direct Expenses (Wages, Carriage Inwards). Sales and Closing Stock are credit items; Office Rent belongs in the Profit & Loss Account.',
    hints: [
      'Opening Stock, Net Purchases, and Direct Wages go on the Debit side.',
      'Sales and Closing Stock go on the Credit side.',
      'Office Salaries go to P&L, not Trading Account.',
    ],
  },
];

// ─── MAIN SIMULATION COMPONENT ──────────────────────────────────────────────
function C10_CommercialStudiesAdvertisingMeaningImportanceSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || { name: 'Commercial Studies', emoji: '📊', color: 'indigo' };

  // Phase State: 'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery & Prediction State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox State
  const [selectedAgencyDept, setSelectedAgencyDept] = useState<'brief' | 'research' | 'creative' | 'media' | 'eval'>('brief');
  const [causeMarketingType, setCauseMarketingType] = useState<'pure_social' | 'cause_related'>('pure_social');
  const [promoDiscountPct, setPromoDiscountPct] = useState(25);
  const [promoDurationDays, setPromoDurationDays] = useState(5);
  const [activeViolation, setActiveViolation] = useState<'fake_ad' | 'hazard' | 'hoarding' | 'no_refund'>('fake_ad');

  // Live Trading Account Interactive Simulator State
  const [simOpeningStock, setSimOpeningStock] = useState(80000);
  const [simPurchases, setSimPurchases] = useState(420000);
  const [simDirectWages, setSimDirectWages] = useState(60000);
  const [simCarriageInwards, setSimCarriageInwards] = useState(15000);
  const [simSales, setSimSales] = useState(750000);
  const [simClosingStock, setSimClosingStock] = useState(120000);

  // Live Derived Calculation
  const simCOGS = useMemo(() => {
    return simOpeningStock + simPurchases + simDirectWages + simCarriageInwards - simClosingStock;
  }, [simOpeningStock, simPurchases, simDirectWages, simCarriageInwards, simClosingStock]);

  const simGrossProfit = useMemo(() => {
    return simSales - simCOGS;
  }, [simSales, simCOGS]);

  // Scoring, Adaptation & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Challenge Input & Interaction State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [numericInput, setNumericInput] = useState('');
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback Flags
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ────���───────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 85) setDifficulty('advanced');
      else if (existing.bestScore >= 55) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE UPDATE EFFECT ───────────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' :
      mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS PULSING GRAPHIC (2D HTML Canvas) ──────────────────────────────
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

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#6366f1');
      gradient.addColorStop(0.5, '#a855f7');
      gradient.addColorStop(1, '#ec4899');

      ctx.beginPath();
      ctx.moveTo(0, 20 + Math.sin(frame * 0.05) * 6);
      for (let x = 0; x < canvas.width; x += 15) {
        const y = 20 + Math.sin(frame * 0.05 + x * 0.03) * 8;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      const pulseX = (frame * 2) % canvas.width;
      const pulseY = 20 + Math.sin(frame * 0.05 + pulseX * 0.03) * 8;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── ESCALATING HINTS CALLBACK ────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
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

  // ─── INACTIVITY AUTO-HINT TIMER ───────────────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ─────────────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb! You correctly identified Advertising vs Publicity.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── NAVIGATION CALLBACKS ─────────────────────────────────────────────────
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore how advertising agencies, social media, consumer law, and final accounts work.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive sandbox! Experiment freely with all trading and marketing controls.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the Commercial Mastery Challenges! Think carefully.');
  }, []);

  // ─── DRAG & DROP HANDLERS ─────────────────────────────────────────────────
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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Perfect agency sequence!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  // ─── COMPLETION HANDLER ───────────────────────────────────────────────────
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered ICSE Class 10 Commercial Studies!');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ─────────────────────────────��─────────────────
  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setRevealedSteps(0);
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

  // ─── UNIVERSAL ANSWER SUBMISSION ──────────────────────────────────────────
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (typeof answer === 'string' ? answer.trim() : '') === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Excellent analysis! That is 100% correct.');
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
        speechManager.speak('Let us study the complete solution step by step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/30 text-2xl" aria-hidden="true">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">ICSE Class 10 Commercial Studies</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20">CISCE 2026 Aligned</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Controls */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
              difficulty === 'advanced' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
              'bg-blue-500/20 text-blue-400 border-blue-500/30'
            }`}
          >
            {difficulty.toUpperCase()} TIER
          </motion.span>
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700" aria-label={`Score: ${scoreBreakdown.correct} correct out of ${scoreBreakdown.total}`}>
            Score: {scoreBreakdown.correct} / {scoreBreakdown.total}
          </span>
        </div>
      </motion.div>

      {/* ─── 2D ANIMATED STATUS WAVE (HTML Canvas) ───────────────────────── */}
      <div className="relative mb-6 rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800/80 p-2">
        <canvas ref={canvasRef} width={600} height={40} className="w-full h-8 block" aria-label="Commercial Growth Engine Animation" />
        <div className="absolute inset-y-0 right-4 flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">Live Business Engine Active</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 rounded-3xl border border-indigo-800/50 relative overflow-hidden">
            <div className="relative z-10">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30">
                Discovery Scenario
              </span>
              <h2 className="text-2xl font-black text-white mt-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs mt-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                💡 <strong className="text-indigo-300">Context:</strong> {SCENARIO.context}
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-800/60 rounded-3xl border border-slate-700/60 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg" aria-hidden="true">🤔</span>
              <h3 className="text-base font-bold text-white">{DISCOVERY_QUESTION.question}</h3>
            </div>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-2xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-indigo-300 border border-slate-700 shrink-0">
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
                className="pt-4 mt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Bingo! You understand the paid & sponsor-controlled core of advertising.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Launch interactive discovery labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 text-sm whitespace-nowrap"
                >
                  Launch Interactive Discovery →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ───────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-indigo-500' : 'w-2.5 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-xl space-y-5"
            >
              <div>
                <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-xs sm:text-sm font-semibold mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── SLIDE 0: AD AGENCY WORKFLOW BUILDER ─── */}
              {currentSlide === 0 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { key: 'brief', title: '1. Brief', desc: 'Client Account Manager receives goals from Swadeshi' },
                      { key: 'research', title: '2. Research', desc: 'Surveys Indian mothers regarding organic toothpaste' },
                      { key: 'creative', title: '3. Creative', desc: 'Ogilvy copywriter pens tagline & storyboard' },
                      { key: 'media', title: '4. Media Plan', desc: 'Negotiates prime-time IPL slots on Star Sports' },
                      { key: 'eval', title: '5. Evaluation', desc: 'Tracks sales lift vs ₹10 Lakh campaign spend' },
                    ].map(dept => (
                      <motion.button
                        key={dept.key}
                        aria-label={`Select agency department: ${dept.title}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedAgencyDept(dept.key as 'brief' | 'research' | 'creative' | 'media' | 'eval')}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedAgencyDept === dept.key
                            ? 'bg-indigo-600/30 border-indigo-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <p className="text-xs font-bold text-indigo-300">{dept.title}</p>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{dept.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 120" className="w-full" aria-label="Ad Agency Flow Diagram">
                      <line x1="50" y1="60" x2="450" y2="60" stroke="#334155" strokeWidth="3" strokeDasharray="6 6" />
                      {[
                        { x: 50, label: 'Brief' },
                        { x: 150, label: 'Research' },
                        { x: 250, label: 'Creative' },
                        { x: 350, label: 'Media Plan' },
                        { x: 450, label: 'Launch' },
                      ].map((node, i) => (
                        <g key={i}>
                          <circle
                            cx={node.x}
                            cy="60"
                            r="16"
                            fill={
                              (selectedAgencyDept === 'brief' && i === 0) ||
                              (selectedAgencyDept === 'research' && i === 1) ||
                              (selectedAgencyDept === 'creative' && i === 2) ||
                              (selectedAgencyDept === 'media' && i === 3) ||
                              (selectedAgencyDept === 'eval' && i === 4)
                                ? '#6366f1'
                                : '#1e293b'
                            }
                            stroke="#4f46e5"
                            strokeWidth="2"
                          />
                          <text x={node.x} y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
                            {i + 1}
                          </text>
                          <text x={node.x} y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">
                            {node.label}
                          </text>
                        </g>
                      ))}
                    </svg>
                    <p className="text-center text-xs text-indigo-300 mt-2">
                      Active Department Action:{' '}
                      <strong className="text-white">
                        {selectedAgencyDept === 'brief' && 'Account Management synchronizing client objectives.'}
                        {selectedAgencyDept === 'research' && 'Market Research validating consumer pain points.'}
                        {selectedAgencyDept === 'creative' && 'Copywriting & Design producing emotional storyboard.'}
                        {selectedAgencyDept === 'media' && 'Media Planners purchasing optimal high-TRP television spots.'}
                        {selectedAgencyDept === 'eval' && 'Post-Campaign Analytics auditing return on investment (ROI).'}
                      </strong>
                    </p>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: SOCIAL AD VS CAUSE MARKETING ─── */}
              {currentSlide === 1 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      aria-label="Toggle Pulse Polio Pure Social Ad"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setCauseMarketingType('pure_social')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        causeMarketingType === 'pure_social'
                          ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      ✓ Pulse Polio (Pure Social Ad)
                    </motion.button>
                    <motion.button
                      aria-label="Toggle Tata Tea Jaago Re Cause-Related Marketing"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setCauseMarketingType('cause_related')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        causeMarketingType === 'cause_related'
                          ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      ✓ Tata Tea "Jaago Re" (Cause-Related)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-slate-300">Revenue Loop Visualizer:</p>
                      <svg viewBox="0 0 300 130" className="w-full" aria-label="Revenue Loop Model">
                        <rect x="20" y="20" width="100" height="40" rx="8" fill="#1e293b" stroke="#334155" />
                        <text x="70" y="44" textAnchor="middle" fill="#fff" fontSize="10">Sponsor</text>
                        <path d="M 120 40 L 180 40" stroke="#6366f1" strokeWidth="2" />
                        <rect x="180" y="20" width="100" height="40" rx="8" fill="#1e293b" stroke="#334155" />
                        <text x="230" y="44" textAnchor="middle" fill="#fff" fontSize="10">Viewer Action</text>

                        {causeMarketingType === 'cause_related' ? (
                          <g>
                            <path d="M 230 60 L 230 100 L 70 100 L 70 60" stroke="#a855f7" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                            <text x="150" y="115" textAnchor="middle" fill="#c084fc" fontSize="9">Product Sales Revenue Loop ($$$)</text>
                          </g>
                        ) : (
                          <g>
                            <text x="150" y="95" textAnchor="middle" fill="#4ade80" fontSize="9">No Revenue Loop (Pure Public Health Welfare)</text>
                          </g>
                        )}
                      </svg>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                      <p className="text-indigo-300 font-bold">Key ICSE Distinctions:</p>
                      <p className="text-slate-300">
                        <strong>Sponsor:</strong> {causeMarketingType === 'pure_social' ? 'Ministry of Health / BOC' : 'Tata Consumer Products (Corporate)'}
                      </p>
                      <p className="text-slate-300">
                        <strong>Primary Motive:</strong> {causeMarketingType === 'pure_social' ? 'Behavioral change (Zero polio cases)' : 'Brand equity + Social consciousness'}
                      </p>
                      <p className="text-slate-300">
                        <strong>Success Metric:</strong> {causeMarketingType === 'pure_social' ? 'Immunization rate / WHO Certification' : 'Tea market share + Brand recall'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: SALES PROMOTION SPIKE SIMULATOR ─── */}
              {currentSlide === 2 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="promoDiscountInput" className="text-xs text-slate-400 font-semibold flex justify-between">
                        <span>Discount Percentage:</span>
                        <span className="text-amber-300 font-bold">{promoDiscountPct}% OFF</span>
                      </label>
                      <input
                        id="promoDiscountInput"
                        aria-label="Set promotion discount percentage"
                        type="range"
                        min={5}
                        max={60}
                        value={promoDiscountPct}
                        onChange={e => setPromoDiscountPct(Number(e.target.value))}
                        className="w-full mt-1.5 accent-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="promoDurationInput" className="text-xs text-slate-400 font-semibold flex justify-between">
                        <span>Promotion Duration:</span>
                        <span className="text-purple-300 font-bold">{promoDurationDays} Days (Short-term)</span>
                      </label>
                      <input
                        id="promoDurationInput"
                        aria-label="Set promotion duration in days"
                        type="range"
                        min={1}
                        max={14}
                        value={promoDurationDays}
                        onChange={e => setPromoDurationDays(Number(e.target.value))}
                        className="w-full mt-1.5 accent-purple-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-slate-300 mb-2">Simulated Weekly Sales Volume (Units Sold):</p>
                    <div className="flex items-end gap-2 h-28 pt-4 border-b border-slate-700" aria-label="Sales Volume Chart">
                      {[100, 110, 105, 100 + promoDiscountPct * 8, 100 + promoDiscountPct * 6, 120, 115].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <motion.div
                            animate={{ height: `${Math.min(100, (val / 500) * 100)}%` }}
                            className={`w-full rounded-t-md ${
                              idx === 3 || idx === 4 ? 'bg-gradient-to-t from-amber-600 to-amber-400' : 'bg-slate-700'
                            }`}
                          />
                          <span className="text-[9px] text-slate-500">Day {idx + 1}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-amber-300 mt-2 text-center">
                      ⚡ <strong>Observation:</strong> Sales promotion triggers an immediate surge on Days 4-5 without permanently altering the long-term price structure!
                    </p>
                    {/* Live economics: does the promo actually pay for itself? */}
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                        <p className="text-[10px] text-slate-500">Promo price (base ₹200)</p>
                        <p className="font-mono font-bold text-amber-300">₹{(200 * (1 - promoDiscountPct / 100)).toFixed(0)}</p>
                      </div>
                      <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                        <p className="text-[10px] text-slate-500">Contribution/unit (cost ₹120)</p>
                        <p className={`font-mono font-bold ${200 * (1 - promoDiscountPct / 100) - 120 >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>₹{(200 * (1 - promoDiscountPct / 100) - 120).toFixed(0)}</p>
                      </div>
                      <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                        <p className="text-[10px] text-slate-500">Profit Δ on Days 4-5</p>
                        <p className={`font-mono font-bold ${((100 + promoDiscountPct * 8) * (80 - 2 * promoDiscountPct) - 8000) + ((100 + promoDiscountPct * 6) * (80 - 2 * promoDiscountPct) - 8000) >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>₹{(((100 + promoDiscountPct * 8) * (80 - 2 * promoDiscountPct) - 8000) + ((100 + promoDiscountPct * 6) * (80 - 2 * promoDiscountPct) - 8000)).toFixed(0)}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Misconception killer: a discount above 40% makes contribution per unit NEGATIVE (₹200 × d% &gt; ₹80 margin) —
                      the shop sells MORE units and still earns LESS. Push the slider past 40% and watch the profit Δ flip red.
                    </p>
                    <button
                      onClick={() => { setPromoDiscountPct(25); setPromoDurationDays(5); }}
                      aria-label="Reset promotion simulator"
                      className="text-[10px] px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 mt-2"
                    >
                      ↺ Reset promo (25% off, 5 days)
                    </button>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: CPA 2019 DEFENSE MATRIX ─── */}
              {currentSlide === 3 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'fake_ad', label: 'Misleading Ad (Horlicks)', fine: 'CCPA ₹50L Penalty' },
                      { key: 'hazard', label: 'Defective Cooker Burst', fine: 'Sec 82 Product Liability' },
                      { key: 'hoarding', label: 'Mask Hoarding & Over-MRP', fine: 'Sec 2(47) Unfair Trade' },
                      { key: 'no_refund', label: 'E-Commerce Refusal', fine: 'Sec 2(7) E-Tailing Rule' },
                    ].map(item => (
                      <motion.button
                        key={item.key}
                        aria-label={`Select violation type: ${item.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveViolation(item.key as 'fake_ad' | 'hazard' | 'hoarding' | 'no_refund')}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          activeViolation === item.key
                            ? 'bg-rose-950/60 border-rose-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <p className="text-xs font-bold text-rose-300">{item.label}</p>
                        <p className="text-[10px] text-amber-400 mt-1">{item.fine}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-4">
                    <div className="text-4xl" aria-hidden="true">🛡️</div>
                    <div className="text-xs space-y-1">
                      <p className="text-white font-bold">
                        {activeViolation === 'fake_ad' && 'Right Violated: Right to be Informed (Truth in Advertising)'}
                        {activeViolation === 'hazard' && 'Right Violated: Right to Safety (Bodily & Property Protection)'}
                        {activeViolation === 'hoarding' && 'Right Violated: Protection Against Unfair Trade Practices'}
                        {activeViolation === 'no_refund' && 'Right Violated: Right to Seek Redressal (District Commission Jurisdiction)'}
                      </p>
                      <p className="text-slate-400">
                        Central Regulator: <strong className="text-indigo-300">Central Consumer Protection Authority (CCPA)</strong> established under Section 10 of CPA 2019.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: TRADING ACCOUNT LIVE SIMULATOR ─── */}
              {currentSlide === 4 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="simOpeningStockInput" className="text-[11px] text-slate-400">Opening Stock (₹):</label>
                      <input
                        id="simOpeningStockInput"
                        aria-label="Set opening stock value"
                        type="number"
                        value={simOpeningStock}
                        onChange={e => setSimOpeningStock(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="simPurchasesInput" className="text-[11px] text-slate-400">Net Purchases (₹):</label>
                      <input
                        id="simPurchasesInput"
                        aria-label="Set net purchases value"
                        type="number"
                        value={simPurchases}
                        onChange={e => setSimPurchases(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="simDirectWagesInput" className="text-[11px] text-slate-400">Direct Wages (₹):</label>
                      <input
                        id="simDirectWagesInput"
                        aria-label="Set direct wages value"
                        type="number"
                        value={simDirectWages}
                        onChange={e => setSimDirectWages(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="simSalesInput" className="text-[11px] text-slate-400">Net Sales (₹):</label>
                      <input
                        id="simSalesInput"
                        aria-label="Set net sales value"
                        type="number"
                        value={simSales}
                        onChange={e => setSimSales(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="simClosingStockInput" className="text-[11px] text-slate-400">Closing Stock (₹):</label>
                      <input
                        id="simClosingStockInput"
                        aria-label="Set closing stock value"
                        type="number"
                        value={simClosingStock}
                        onChange={e => setSimClosingStock(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div className="p-2 bg-indigo-950/60 rounded-xl border border-indigo-700 flex flex-col justify-center">
                      <span className="text-[10px] text-indigo-300 font-bold uppercase">Computed Gross Profit</span>
                      <span className="text-base font-black text-emerald-400">₹{simGrossProfit.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex justify-between">
                    <span className="text-slate-400">
                      Cost of Goods Sold (COGS) = <strong className="text-white">₹{simCOGS.toLocaleString('en-IN')}</strong>
                    </span>
                    <span className="text-indigo-300">
                      Formula: Opening + Purchases + Wages − Closing Stock
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold text-sm disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-mono">Step {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Proceed to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter free sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ──────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-800/80 rounded-3xl border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🎛️</span>
              <h2 className="text-lg font-black text-white">Commercial Sandbox & Live Trading Engine</h2>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Manipulate business variables freely. Observe how Advertising Budgets, Sales Promotions, and Closing Stock interact before entering graded challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promotion & Media Sandbox */}
            <div className="p-5 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-300">1. Promotional Strategy Controls</h3>
              <div>
                <label htmlFor="sandboxPromoDiscount" className="text-xs text-slate-400">Discount Promotion: {promoDiscountPct}%</label>
                <input
                  id="sandboxPromoDiscount"
                  aria-label="Adjust promotional discount percentage"
                  type="range"
                  min={5}
                  max={50}
                  value={promoDiscountPct}
                  onChange={e => setPromoDiscountPct(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-300">Expected Customer Footfall Lift: <strong className="text-emerald-400">+{promoDiscountPct * 3.5}%</strong></p>
                <p className="text-slate-400 text-[11px]">Short-term volume acceleration without permanent price degradation.</p>
              </div>
            </div>

            {/* Trading Account Simulator */}
            <div className="p-5 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-purple-300">2. Financial Trading Engine</h3>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Closing Stock: ₹{simClosingStock.toLocaleString('en-IN')}</span>
                <span className="text-emerald-400 font-bold">Gross Profit: ₹{simGrossProfit.toLocaleString('en-IN')}</span>
              </div>
              <input
                aria-label="Adjust closing stock level for trading account"
                type="range"
                min={20000}
                max={300000}
                step={5000}
                value={simClosingStock}
                onChange={e => setSimClosingStock(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
              <p className="text-[11px] text-slate-400">
                Notice: Higher closing stock directly lowers Cost of Goods Sold and raises Trading Account Gross Profit.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              aria-label="Ready to start challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20"
            >
              I am Ready for the Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ───────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Bar & Question Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-mono font-bold">
                NEP 2020: {challenge.competencyLevel.toUpperCase()}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-800/90 border-slate-700/80 shadow-2xl'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-bold border border-indigo-500/30">
                Q{currentChallenge + 1}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {challenge.question}
              </h2>
            </div>

            {/* ─── CHALLENGE TYPE 1: MCQ (Classify / Distinguish / Match) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3 mt-6">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-2xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/90 hover:bg-slate-850 text-slate-200 border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-indigo-400 border border-slate-700 shrink-0">
                        {showExplanation && i === challenge.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── CHALLENGE TYPE 2: DRAG-LABEL (Interactive Diagram) ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels onto the diagram targets below:</span>
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
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-grab shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'box_safety', scenario: 'Exploding defective pressure cooker causing injury' },
                    { id: 'box_informed', scenario: 'Fake "100% Organic" label without genuine certification' },
                    { id: 'box_choose', scenario: 'Retailer forcing buyer to take insurance with phone' },
                    { id: 'box_redressal', scenario: 'Filing claim up to ₹1 Crore for defective laptop' },
                  ].map(target => (
                    <div
                      key={target.id}
                      role="region"
                      aria-label={`Target area for ${target.scenario}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-2xl border-2 border-dashed transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-750 text-slate-400'
                      }`}
                    >
                      <p className="text-[11px] text-slate-400">{target.scenario}</p>
                      <p className="text-sm font-black text-indigo-300 mt-2">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Corresponding Right Here'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify consumer rights mapping"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Verify Rights Mapping
                </motion.button>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 3: DRAG-SORT (Workflow Ordering) ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-6 space-y-3">
                <p className="text-xs text-slate-400 mb-2">Drag and arrange into the correct operational sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Workflow step ${displayIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
                <motion.button
                  aria-label="Confirm workflow sequence"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  className="mt-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Confirm Workflow Order
                </motion.button>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 4: NUMERIC CALCULATION ─── */}
            {challenge.type === 'numeric' && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Enter numeric calculation answer"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 w-64"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric calculation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 5: CONSTRUCT BUILDER ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-6 space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3.5 py-2 bg-indigo-700/60 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold border border-indigo-500/30"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-lg text-xs font-semibold flex items-center gap-2 border border-indigo-700"
                    >
                      {part}
                      <button
                        aria-label={`Remove part ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-600 text-xs">Click elements above to assemble the Debit side of Trading Account</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify assembled trading account structure"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs disabled:opacity-40"
                >
                  Verify Trading Structure
                </motion.button>
              </div>
            )}

            {/* ─── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-indigo-800/60 rounded-2xl space-y-3"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Detailed Board Examination Solution:</p>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">✓ Step {i + 1}:</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Reveal next step of explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-indigo-700/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'View final summary' : 'Proceed to next question'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-600/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Results →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/70 rounded-3xl border border-indigo-700 text-center space-y-3">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Commercial Studies Mastery Unlocked!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have completed all ICSE Class 10 concepts covering Advertising, Publicity, Agency Roles, Social Media, Sales Promotions, Consumer Protection Act 2019, E-Commerce ERP, and Final Trading Accounts!
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700">
                <p className="text-[10px] uppercase text-slate-400 font-bold">Accuracy Score</p>
                <p className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700">
                <p className="text-[10px] uppercase text-slate-400 font-bold">Mastery Level</p>
                <p className="text-xl font-black text-indigo-300 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-slate-800/80 rounded-3xl border border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-emerald-400">Personalized Evaluation:</h3>
            <p className="text-sm font-black text-indigo-300">
              {errors === 0 && 'PERFECT SCORE!'}
              {errors >= 1 && errors <= 3 && 'Great work!'}
              {errors >= 4 && errors <= 7 && 'Good effort!'}
              {errors >= 8 && 'Do not give up — You WILL get this!'}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {errors === 0
                ? '🌟 Flawless Mastery! You possess complete command of commercial terminology, consumer law sections, and final accounts calculations.'
                : errors <= 3
                ? '👏 Excellent Performance! Your conceptual foundation across advertising, ERP, and capital/revenue classification is remarkably solid.'
                : errors <= 7
                ? '👍 Good progress! Review the specific misconception corrections below to reinforce your knowledge before the ICSE Board Exam.'
                : '💪 Keep practicing! Commercial concepts and accounting rules become clearer with each review.'}
            </p>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Your Targeted Revision Checklist:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Board Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Review Schedule */}
          <div className="p-5 bg-amber-950/40 rounded-3xl border border-amber-800/50 flex items-center gap-4">
            <span className="text-3xl" aria-hidden="true">📅</span>
            <div className="text-xs space-y-1">
              <p className="text-amber-300 font-bold">Spaced Repetition Schedule (SM-2 Algorithm):</p>
              <p className="text-slate-300">
                Based on your performance, review this module in{' '}
                <strong className="text-amber-300 font-bold">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </strong>{' '}
                to cement long-term synaptic recall.
              </p>
            </div>
          </div>

          {/* ─── REAL-WORLD ACTIVITY SECTION ────────────────────────────── */}
          <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">📋</span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{REAL_WORLD_ACTIVITY.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── TOAST / SIM FEEDBACK OVERLAYS ──────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Commercial Mastery Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_CommercialStudiesAdvertisingMeaningImportanceSim;
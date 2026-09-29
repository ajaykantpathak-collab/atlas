'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C9_ECON_041 = 'c9_econ_041';
const NODE_C9_ECON_042 = 'c9_econ_042';
const NODE_C9_ECON_043 = 'c9_econ_043';
const NODE_C9_ECON_044 = 'c9_econ_044';
const NODE_C9_ECON_045 = 'c9_econ_045';
const NODE_C9_ECON_046 = 'c9_econ_046';
const ALL_NODE_IDS = [
  NODE_C9_ECON_041,
  NODE_C9_ECON_042,
  NODE_C9_ECON_043,
  NODE_C9_ECON_044,
  NODE_C9_ECON_045,
  NODE_C9_ECON_046,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Transforming Bharat: From Licence Raj to Digital Powerhouse',
  intro: 'You are an Economic Policy Advisor appointed to the Ministry of Finance and NITI Aayog. India is overcoming historical poverty and unemployment through targeted welfare schemes (MGNREGA, PKVY, HRIDAY), landmark 1991 LPG reforms (Liberalisation, Privatisation, Globalisation), and modern urban-digital transformations (Smart Cities, Digital India, Skill India).',
  context: 'Your task is to balance welfare safety nets, deregulate private enterprise, manage strategic disinvestment, expand global trade, and power citizen empowerment through the JAM trinity.',
};

// ─── DISCOVERY QUESTION ─��─
const DISCOVERY_QUESTION = {
  question: 'In July 1991, India was left with barely $1.1 billion in foreign exchange (3 weeks of imports) and airlifted 67 tonnes of gold. What core policy shift rescued and reshaped the Indian economy?',
  options: [
    'Nationalising all private banks and closing foreign trade entirely',
    'Launching the LPG reforms: Liberalisation, Privatisation, and Globalisation',
    'Banning all industrial imports and reviving the Licence Raj',
    'Replacing currency notes with barter trading coupons',
  ],
  correctIndex: 1,
  hintAfter: 'Let us dive into the simulation to discover how welfare schemes and the LPG transformation built modern India!',
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
  bloomLevel?: string;
}

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-8)
  {
    id: 'ch_01',
    nodeId: NODE_C9_ECON_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under MGNREGA (2005), what is the statutory employment guarantee provided to rural India?',
    options: [
      '100 days of guaranteed wage employment per rural household per year',
      '100 days of guaranteed wage employment per individual person per year',
      '365 days of permanent government job placement per family',
      '50 days of free agricultural seeds and chemical fertilisers',
    ],
    correctIndex: 0,
    explanation: 'MGNREGA provides a legal guarantee of 100 days of wage employment per rural HOUSEHOLD (not per person) per financial year for adult members volunteering for unskilled manual work.',
    hints: [
      'Focus on whether the entitlement is given to each individual person or shared across the household.',
      'It provides 100 days of wage work during the agricultural lean season.',
      'The law specifies 100 days per rural household per year.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C9_ECON_041,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does IRDP (1980) fundamentally differ from MGNREGA (2005) in its anti-poverty approach?',
    options: [
      'IRDP gave productive assets for self-employment; MGNREGA provides temporary wage employment on public works',
      'IRDP provided free internet; MGNREGA provided bank loans for large factories',
      'IRDP was an urban metro project; MGNREGA is an IT skill certification program',
      'IRDP was a legal constitutional right; MGNREGA was a voluntary charity program',
    ],
    correctIndex: 0,
    explanation: 'IRDP provided subsidised loans and productive assets (cows, sewing machines) for self-employment. MGNREGA guarantees wage employment on public infrastructure works.',
    hints: [
      'Think about what the beneficiary actually receives: an asset to sell milk/sew clothes vs a daily wage for manual labor.',
      'IRDP = Asset creation (self-employment); MGNREGA = Wage labor.',
      'Choice 1 correctly identifies asset transfer vs wage labor.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C9_ECON_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was the central feature of "Liberalisation" introduced in India in July 1991?',
    options: [
      'Abolishing the industrial Licence Raj and dismantling rigid government controls on business',
      'Mandating 100% government ownership of all consumer goods factories',
      'Increasing peak import tariffs from 113% to over 300%',
      'Nationalising private IT companies like TCS and Infosys',
    ],
    correctIndex: 0,
    explanation: 'Liberalisation refers to relaxing and removing government restrictions, quotas, and licensing controls (ending the Licence Raj) so private businesses can operate freely.',
    hints: [
      'Liberalisation is about changing the RULES and freeing private enterprise.',
      'Before 1991, entrepreneurs waited years for government permits (Licence Raj).',
      'It abolished licensing for almost all industrial sectors.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C9_ECON_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Selling a 3.5% minority stake in Life Insurance Corporation (LIC) via IPO in 2022 while the government retains 96.5% is an example of:',
    options: [
      'Partial Disinvestment',
      'Complete Outright Privatisation',
      'Foreign Military Concession',
      'Pure Domestic Liberalisation',
    ],
    correctIndex: 0,
    explanation: 'Partial disinvestment involves selling a minority stake (like LIC’s 3.5% IPO) while the government retains majority ownership and management control.',
    hints: [
      'Did the government transfer 100% control or keep 96.5%?',
      'Since the government retained majority ownership, it is a partial stake sale.',
      'This form is called partial disinvestment.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C9_ECON_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which international body did India join as a founding member on 1 January 1995 to integrate with multilateral global trade?',
    options: [
      'World Trade Organisation (WTO)',
      'North Atlantic Treaty Organisation (NATO)',
      'Organisation of the Petroleum Exporting Countries (OPEC)',
      'European Central Bank (ECB)',
    ],
    correctIndex: 0,
    explanation: 'India became a founding member of the World Trade Organisation (WTO) on 1 January 1995, agreeing to global multilateral rules for goods, services, and intellectual property.',
    hints: [
      'This body regulates international trade and replaced GATT.',
      'Its acronym is WTO.',
      'World Trade Organisation is the correct body.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C9_ECON_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to the official Smart Cities Mission framework, which prerequisite must come FIRST?',
    options: [
      'Core physical infrastructure (24x7 water, electricity, sanitation, public transport)',
      'High-speed commercial advertising digital billboards',
      'Luxury sports stadiums in every residential ward',
      'Cryptocurrency trading kiosks across slum clusters',
    ],
    correctIndex: 0,
    explanation: 'The Smart Cities Mission establishes that core physical infrastructure (water, sanitation, transport, affordable housing) is the foundation, upon which digital smart solutions are layered.',
    hints: [
      'Does digital technology work if there is no running water or sanitation?',
      'Physical livability infrastructure always comes before digital overlays.',
      'Core infrastructure (water, sanitation, electricity, transport) is the primary layer.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C9_ECON_046,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the diagnostic test separating Digital India from Skill India initiatives?',
    options: [
      'Digital India outputs digital systems and e-services; Skill India trains human beings in employable job skills',
      'Digital India is only for foreign tourists; Skill India is exclusively for space scientists',
      'Digital India builds physical highways; Skill India prints school textbooks',
      'Digital India was launched in 1947; Skill India was launched in 1991',
    ],
    correctIndex: 0,
    explanation: 'The core test: Digital India builds the digital system (UPI, Aadhaar, DigiLocker, CSCs), while Skill India trains the human driver (PMKVY vocational trades, ITI certificates, NSDC modules).',
    hints: [
      'Ask: Is the end output a digital software/system, or a skilled human worker?',
      'Digital India builds the road; Skill India trains the driver.',
      'Choice 1 cleanly separates digital systems from human training.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C9_ECON_041,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each national government scheme to its primary economic intervention category.',
    dragItems: [
      { label: 'IRDP (1980)', targetId: 'cat_self' },
      { label: 'MGNREGA (2005)', targetId: 'cat_wage' },
      { label: 'PKVY (2015)', targetId: 'cat_agri' },
      { label: 'HRIDAY (2015)', targetId: 'cat_urban' },
    ],
    correctMapping: {
      cat_self: 'IRDP (1980)',
      cat_wage: 'MGNREGA (2005)',
      cat_agri: 'PKVY (2015)',
      cat_urban: 'HRIDAY (2015)',
    },
    explanation: 'IRDP is self-employment (assets); MGNREGA is wage employment (guaranteed public works); PKVY is agricultural sustainability (organic farming); HRIDAY is urban heritage infrastructure.',
    hints: [
      'Match IRDP to self-employment assets like milch cows.',
      'Match MGNREGA to rural wage labor.',
      'Match PKVY to organic agriculture and HRIDAY to heritage urban tourism.',
    ],
  },

  // Standard Tier (9-16)
  {
    id: 'ch_09',
    nodeId: NODE_C9_ECON_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A rural household in Rajasthan works 75 days under MGNREGA at a notified state daily wage rate of ₹240. What is their total wage earnings in Rupees?',
    correctAnswer: 18000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Total Earnings = Days Worked × Daily Wage = 75 days × ₹240/day = ₹18,000.',
    hints: [
      'Multiply the number of days worked by the daily wage rate.',
      'Calculation: 75 × 240.',
      '75 × 240 = 18,000.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C9_ECON_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under the 100-day statutory entitlement at ₹240/day, what was the maximum possible annual earnings ceiling for that household in Rupees?',
    correctAnswer: 24000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Maximum Entitlement = 100 days × ₹240/day = ₹24,000 per household per year.',
    hints: [
      'Multiply 100 days by the daily wage rate of ₹240.',
      '100 × 240 = 24,000.',
      'The ceiling is ₹24,000.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C9_ECON_042,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Before 1991, an imported TV had an average customs duty of 113%. Following tariff rationalisation to 15%, how did consumer welfare and market competition change?',
    options: [
      'Consumers gained lower prices, superior technology choices, and domestic firms had to innovate to survive',
      'Domestic monopolies grew stronger and doubled their prices without foreign competition',
      'Electronic goods completely disappeared from Indian retail markets',
      'The government banned all private electronics assembly factories',
    ],
    correctIndex: 0,
    explanation: 'Lowering tariffs from 113% to 15% dismantled protective barriers, bringing international brands (Sony, Samsung), forcing Indian producers to improve quality and cut costs, and benefiting consumers.',
    hints: [
      'Think about what happens to imported goods prices when tariffs fall from 113% to 15%.',
      'Lower prices and more brands create intense competition and consumer benefits.',
      'Choice 1 captures both consumer choice and the efficiency pressure on domestic manufacturers.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C9_ECON_043,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In 2001, the government sold a 51% controlling stake in BALCO to Sterlite Industries for ₹551 crore. If a new disinvestment sells 20,00,000 shares of a PSU at ₹350 per share, calculate the total disinvestment receipt in Crores of Rupees (1 Crore = 10,000,000).',
    correctAnswer: 70,
    tolerance: 0,
    unit: 'Crore ₹',
    explanation: 'Disinvestment Receipt = 2,000,000 shares × ₹350 = ₹700,000,000 = ₹70 Crore.',
    hints: [
      'Multiply the shares sold by the price per share: 2,000,000 × 350.',
      '2,000,000 × 350 = 700,000,000 Rupees.',
      'Convert 700,000,000 Rupees into Crores (divide by 10,000,000) = 70.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C9_ECON_044,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Indian IT-BPM exports grew from $6 billion in the year 2000 to $150 billion in 2022. By what percentage did IT exports grow over this period?',
    correctAnswer: 2400,
    tolerance: 10,
    unit: '%',
    explanation: 'Percentage Growth = [($150B - $6B) / $6B] × 100 = (144 / 6) × 100 = 24 × 100 = 2,400%.',
    hints: [
      'Formula: ((Final - Initial) / Initial) × 100.',
      'Calculation: ((150 - 6) / 6) × 100 = (144 / 6) × 100.',
      '144 / 6 = 24; 24 × 100 = 2,400%.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C9_ECON_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the July 1991 Rupee devaluation (from ₹17.9 to ₹25.9 per US Dollar) accelerate Indian export competitiveness?',
    options: [
      'It made Indian services and goods cheaper in foreign dollar terms, attracting international buyers',
      'It made all foreign goods free of cost inside Indian shopping malls',
      'It legally prohibited foreign multinational companies from trading in Asia',
      'It doubled domestic interest rates on small cottage handloom loans',
    ],
    correctIndex: 0,
    explanation: 'A weaker rupee meant foreign clients needed fewer dollars to purchase Indian software, textiles, and generic medicines, directly boosting export demand and building foreign exchange reserves.',
    hints: [
      'Consider how an American company views Indian software when $1 buys ₹26 instead of ₹18.',
      'The software becomes cheaper in dollar terms, driving up export orders.',
      'Choice 1 correctly explains price competitiveness in global markets.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C9_ECON_045,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Pune Smart City, the installation of 13,000 smart LED streetlights with automated motion sensors resulted in which documented outcome?',
    options: [
      '40% reduction in municipal energy consumption and lower operational municipal costs',
      'Complete shutdown of urban nighttime street security surveillance',
      '100% loss of municipal electricity grid connections',
      'Tripling of municipal coal consumption for lighting',
    ],
    correctIndex: 0,
    explanation: 'Smart streetlights in Pune reduced energy consumption by 40% through LED efficiency and motion-sensing dimming, reducing operational costs while improving safety.',
    hints: [
      'Smart LEDs with automated sensors optimize electricity usage.',
      'They resulted in substantial power savings of approximately 40%.',
      'Choice 1 is the documented environmental and economic saving.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C9_ECON_046,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the causal steps of the JAM trinity in eliminating subsidy leakage and empowering citizens.',
    sortItems: [
      'Government transfers direct cash welfare into beneficiary Jan Dhan bank account',
      'Citizen opens a zero-balance Jan Dhan bank account using biometric Aadhaar identity',
      'Beneficiary receives SMS alert on linked mobile phone and withdraws funds without middlemen',
      'Fiscal savings from eliminated ghost beneficiaries are redirected to skill development',
    ],
    correctOrder: [1, 0, 2, 3],
    explanation: 'Sequence: 1. Identity & Account Setup (Aadhaar + Jan Dhan) → 2. Direct Benefit Transfer (DBT) → 3. Mobile SMS notification & direct withdrawal → 4. Reinvestment of fiscal savings (₹2.7 lakh crore saved).',
    hints: [
      'First, the citizen must have an Aadhaar-linked Jan Dhan bank account.',
      'Next, the government sends the welfare funds directly via DBT.',
      'Then the mobile alert confirms receipt, eliminating middlemen.',
    ],
  },

  // Advanced Tier (17-24)
  {
    id: 'ch_17',
    nodeId: NODE_C9_ECON_043,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why the government carried out a complete strategic disinvestment of Air India to the Tata Group (₹18,000 cr, 2022) but chose only partial disinvestment for LIC (2022).',
    options: [
      'Air India had accumulated ₹60,000+ cr losses needing private turnaround; LIC was highly profitable and strategically vital for domestic social savings',
      'Air India was generating record profits while LIC was bankrupt and had no customers',
      'The government is constitutionally barred from selling airline assets under any circumstances',
      'LIC was sold to foreign airlines while Air India was converted into a rural hospital network',
    ],
    correctIndex: 0,
    explanation: 'Chronic loss-makers like Air India require management transfer to stop recurring fiscal drains. Profitable, strategic institutions like LIC only need partial disinvestment to raise capital and enhance transparency while retaining sovereign control.',
    hints: [
      'Compare the profitability and recurring taxpayer burden of Air India vs LIC.',
      'Air India had bled over ₹60,000 crore in losses requiring continuous government bailouts.',
      'LIC was profitable and provides life insurance to hundreds of millions of policyholders.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C9_ECON_044,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does post-1991 globalisation fundamentally contrast with colonial-era British trade integration (1757–1947)?',
    options: [
      'Post-1991 integration is based on sovereign comparative advantage in high-value IT and pharma; colonial trade was coercive extraction of raw materials that deindustrialised Indian crafts',
      'Post-1991 integration forced India to export only raw indigo and opium to London mills',
      'Colonial trade brought high-tech software engineering hubs to rural Bengal',
      'There is no economic distinction between colonial drain of wealth and modern software exports',
    ],
    correctIndex: 0,
    explanation: 'Colonial integration was an unequal extractive drain (raw cotton/indigo out, British factory textiles in, destroying domestic weavers). Post-1991 globalisation is voluntary sovereign trade exporting high-value services (IT) and generic pharmaceuticals while importing technology and capital.',
    hints: [
      'Think about what India exported under British rule vs what TCS, Infosys, and Serum Institute export today.',
      'Colonial trade deindustrialised Indian handlooms through forced raw material exports.',
      'Modern trade is based on software engineering, pharmaceuticals, and sovereign equality.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C9_ECON_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do Smart Cities directly alleviate urban poverty alongside building high-tech infrastructure?',
    options: [
      'Through PMAY slum redevelopment into pucca housing, BRTS transport to jobs, and sanitation upgrades in low-income settlements',
      'By banning street vending and evicting all informal wage workers outside city borders',
      'By replacing public drinking water fountains with expensive private bottled water kiosks',
      'By restricting public bus transit exclusively to corporate executives',
    ],
    correctIndex: 0,
    explanation: 'Smart Cities integrate poverty alleviation via PMAY (e.g. Pune relocated 12,000+ slum families to pucca homes), affordable BRTS transit linking workers to industrial hubs like Hinjewadi, and localized sanitation.',
    hints: [
      'Look at social welfare programs integrated into the Smart Cities Mission like PMAY.',
      'Affordable public transit connects peripheral low-income workers to high-paying job corridors.',
      'Choice 1 describes tangible housing and transport benefits for the urban poor.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C9_ECON_046,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In FY2022-23, India’s Unified Payments Interface (UPI) processed 8,685 crore transactions worth ₹139 lakh crore. Calculate the approximate average transaction value in Rupees (rounded to nearest whole rupee).',
    correctAnswer: 1600,
    tolerance: 50,
    unit: '₹',
    explanation: 'Total Value = ₹139 lakh crore = ₹13,900,000 crore. Number of transactions = 8,685 crore. Average Value = 13,900,000 / 8,685 ≈ ₹1,600.46 per transaction.',
    hints: [
      'Divide the total transaction value by the total number of transactions.',
      'Calculation: (139 × 100,000 crore) / 8,685 crore = 13,900,000 / 8,685.',
      '13,900,000 ÷ 8,685 ≈ 1,600.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C9_ECON_041,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 4 structural pillars of the PKVY (Paramparagat Krishi Vikas Yojana) sustainable farming model.',
    availableParts: [
      '50-Acre Clusters',
      '₹50,000/ha Support',
      'Zero Chemical Pesticides',
      'PGS-India Certification',
      'Imported Chemical Urea',
      'Heavy Diesel Subsidies',
    ],
    targetState: '50-Acre Clusters ₹50,000/ha Support Zero Chemical Pesticides PGS-India Certification',
    validationHint: 'Select the 4 components that establish organic cluster farming without chemical inputs.',
    explanation: 'PKVY supports organic farming in 50-acre farmer clusters, providing ₹50,000/ha financial support over 3 years, eliminating expensive chemical inputs to slash farm costs by 30-40%, and providing PGS organic certification.',
    hints: [
      'PKVY eliminates chemical fertilisers to reduce farm input costs.',
      'It works in 50-acre clusters and provides ₹50,000/hectare assistance.',
      'Do not include chemical urea or diesel subsidies.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C9_ECON_042,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the macroeconomic reform sequence of the July 1991 New Economic Policy.',
    sortItems: [
      'Air-lifting 67 tonnes of gold as collateral due to $1.1B forex crisis',
      'Devaluing Rupee by 18-19% and approaching IMF/World Bank for structural assistance',
      'Abolishing industrial licensing for most sectors and cutting tariffs from 113%',
      'Accelerating GDP growth past 7.5% and accumulating $600B+ forex reserves',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Macroeconomic Timeline: 1. Balance of Payments Crisis ($1.1B reserves & gold pledge) → 2. Rupee Devaluation & Structural Adjustment → 3. Industrial Deregulation & Tariff Slashes → 4. Sustained High Growth & $600B+ Forex Reserves.',
    hints: [
      'Start with the 1991 BoP crisis and gold pledge.',
      'Next came emergency rupee devaluation and IMF assistance.',
      'Then industrial licensing was abolished, leading to long-term high growth.',
    ],
  },
  {
    id: 'ch_23',
    nodeId: NODE_C9_ECON_046,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under Skill India, the national aspirational target was to train 40 crore people by 2022. If PMKVY directly trained 1.4 crore candidates by 2023, calculate PMKVY’s exact percentage achievement against this single national target.',
    correctAnswer: 3.5,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Achievement Rate = (1.4 crore / 40 crore) × 100 = 0.035 × 100 = 3.5%. This highlights the massive implementation challenge of vocational skilling across diverse trades.',
    hints: [
      'Formula: (Trained / Target) × 100.',
      'Calculation: (1.4 / 40) × 100.',
      '1.4 ÷ 40 = 0.035; 0.035 × 100 = 3.5%.',
    ],
  },
  {
    id: 'ch_24',
    nodeId: NODE_C9_ECON_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A city municipal corporation proposes spending 90% of its Smart City budget on a luxury VR metaverse gaming theme park while 45% of residents lack piped drainage and clean drinking water. Does this comply with the Smart Cities Mission philosophy?',
    options: [
      'No — the Mission prioritises core physical livability infrastructure (water, drainage, housing) before entertainment technologies',
      'Yes — any digital technology automatically qualifies a city as smart',
      'Yes — theme parks generate more foreign exchange than running water networks',
      'No — smart city grants can only be spent on buying foreign commercial aircraft',
    ],
    correctIndex: 0,
    explanation: 'The Smart Cities Mission mandates core physical infrastructure (water, sanitation, transport, housing) as the essential foundation. Technology must serve basic civic efficiency, not frivolous luxury spending.',
    hints: [
      'Remember the foundational rule: core physical infrastructure comes first.',
      'A city with Wi-Fi/VR but no sanitation fails the smart city mandate.',
      'Choice 1 correctly identifies the non-compliance with the Mission’s philosophy.',
    ],
  },
  // ─── Class 10 board-depth additions: globalisation diagnostics ───
  {
    id: 'ch_depth_gov_mnc_shoes',
    nodeId: 'c10_eco_cbse_04_001',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An MNC designs sports shoes with 100 hours of skilled design labour at $30/hour in the USA, but needs 1,500 hours of stitching at $2/hour. Where does each stage locate, and why?',
    options: [
      'Design stays in the USA (skilled, high-value, close to headquarters); stitching shifts to a low-wage country (India/Bangladesh/Vietnam) -- the MNC splits production so each stage sits where its input is cheapest, then assembles and brands globally',
      'Both stages stay in the USA to protect quality',
      'Both stages move to the cheapest country on earth regardless of skill',
      'Stitching stays in the USA because machines are banned elsewhere'
    ],
    correctIndex: 0,
    explanation: 'This is the classic MNC production-across-countries pattern: skill-intensive stages in skill-rich rich countries, labour-intensive stages in labour-abundant poor countries. Design a wooden-toy chain: design (Germany), raw wood (Brazil), components (China), stitching/assembly (India), branding and retail (global HQ) -- a true "global production chain" answer names a country per stage with a reason per stage.',
    hints: [
      'Match each stage to its cheapest suitable input.',
      'Design hours cost $30 -- stitch hours cost $2.',
      'Every stage needs a WHY, not just a country.'
    ],
  },
  {
    id: 'ch_depth_gov_liberalisation_sequence',
    nodeId: 'c10_eco_cbse_04_004',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design a 3-step policy sequence for a developing country that wants to liberalise foreign trade and investment without wrecking domestic producers.',
    options: [
      'Step 1: remove quantitative barriers gradually (import licences) while keeping moderate tariffs; Step 2: open FDI in sectors where local firms can compete, keeping sensitive sectors (agriculture, small-scale reserved list) protected; Step 3: full tariff alignment with WTO commitments plus support schemes (technology upgradation, credit) so local firms upgrade before full competition',
      'Open everything to all imports overnight with no transition',
      'Ban all imports forever, then announce liberalisation',
      'Liberalise only luxury goods and keep essentials banned'
    ],
    correctIndex: 0,
    explanation: 'India\'s 1991 New Economic Policy followed roughly this ladder: dismantling licence-raj quantitative controls, rupee devaluation, phased tariff cuts (average tariffs fell from over 300% to under 15%), and FDI opening with sector caps. The sequencing lesson: give domestic industry time and tools (credit, technology) to face competition -- otherwise liberalisation destroys jobs faster than it creates them.',
    hints: [
      'Sequence = order matters; what must come FIRST?',
      'Which sectors need a shield during transition?',
      'Support schemes are the safety rope for local firms.'
    ],
  },
  {
    id: 'ch_depth_gov_wto_tariffs',
    nodeId: 'c10_eco_cbse_04_005',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'India\'s BOUND tariff for agriculture is 113% but its APPLIED rate is far lower. What is the difference, how does the WTO AoA hit Indian and US/EU farmers differently, and design a 3-point strategy to make WTO dispute settlement work for India?',
    options: [
      'Bound = the WTO ceiling a country promises not to exceed; applied = the rate actually charged (India keeps headroom by applying less than the bound). AoA allows rich-country SUPPORT (US/EU farm subsidies inflate their volumes, pushing world prices down and hurting competitive Indian farmers who get little support); strategy: (1) build coalitions with other developing countries (G-20/G-33), (2) document subsidy data meticulously for disputes, (3) push the permanent "public stockholding for food security" solution at Ministerials',
      'Bound and applied are the same number; the AoA treats all countries identically; disputes need no evidence',
      'Bound tariffs are the minimum allowed; rich farmers get no subsidies at all',
      'India must leave the WTO to protect farmers'
    ],
    correctIndex: 0,
    explanation: 'The AoA\'s "box" system (amber = trade-distorting support, green = permitted) lets developed countries spend billions in green-box subsidies while disciplining developing-country price support -- the core asymmetry Indian farmers face. The headroom between bound (113%) and applied tariffs is India\'s policy shield: it can raise applied rates legally without breaching commitments.',
    hints: [
      'Ceiling vs actual -- a speed limit you drive under.',
      'Whose "green box" subsidies distort world prices?',
      'Coalitions multiply small countries\' voice.'
    ],
  },
  {
    id: 'ch_depth_gov_ev_framework',
    nodeId: 'c10_eco_cbse_04_009',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Design a 3-point policy framework for India to maximise benefits and minimise concerns from MNCs in the electric-vehicle sector.',
    options: [
      '(1) Localisation conditions: FDI allowed but with phased local-content and battery-manufacturing requirements so technology and jobs stay; (2) technology transfer + skilling: assembly plants must run training academies and source components from Indian MSMEs; (3) regulation and standards: battery-disposal norms, safety certification and a charging-infrastructure mandate so public concerns (pollution shift, safety, job loss) are answered',
      'Let MNCs import fully-built cars with zero conditions',
      'Ban all foreign EV makers permanently',
      'Subsidise petrol cars to compete with EVs'
    ],
    correctIndex: 0,
    explanation: 'The framework balances the two faces of MNCs: benefit = capital, technology, jobs, exports; concern = profit repatriation, domestic-firm crowding-out, strategic dependence. Localisation + skilling + standards convert raw FDI into capability building -- the same logic as PLI (Production Linked Incentive) schemes and phased manufacturing programmes used for phones and now EVs.',
    hints: [
      'For every benefit, ask what condition locks it in.',
      'Batteries are the strategic heart of the EV chain.',
      'Standards protect consumers AND the environment.'
    ],
  }
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
  nodeId: NODE_C9_ECON_041,
  title: 'Government Schemes, LPG Reforms & Digital Transformations',
  definition: 'An integrated study of poverty/unemployment alleviation schemes (IRDP, JRY, MGNREGA, PKVY, HRIDAY), the 1991 LPG reforms (Liberalisation, Privatisation, Globalisation), and modern emerging trends (Smart Cities Mission, Digital India, and Skill India).',
  eli5: 'Think of India as building a strong house: government schemes provide the solid floor (safety net), LPG reforms open up windows and doors for business and world trade, and Smart Cities plus Digital India install the modern electrical and smart systems so everyone can thrive.',
  misconceptions: [
    {
      misconception: 'IRDP and MGNREGA are identical wage-labour schemes.',
      correction: 'IRDP gave productive assets (cows, sewing machines) for self-employment, whereas MGNREGA provides a legal guarantee of 100 days of wage employment per rural household on public works.',
    },
    {
      misconception: 'MGNREGA guarantees 100 days of work per person per year.',
      correction: 'The guarantee is strictly 100 days per rural HOUSEHOLD per year, shared among all adult working members.',
    },
    {
      misconception: 'Liberalisation and Privatisation mean the same thing.',
      correction: 'Liberalisation changes the RULES (removes licensing, tariffs, quotas); Privatisation changes the OWNERSHIP of government enterprises.',
    },
    {
      misconception: 'Globalisation only benefits foreign MNCs at the expense of Indian firms.',
      correction: 'Globalisation enabled Indian giants like TCS, Infosys, Sun Pharma, and Serum Institute to export over $150B in IT and become global leaders in pharmaceuticals and vaccines.',
    },
    {
      misconception: 'A Smart City is merely a city with free Wi-Fi and mobile apps.',
      correction: 'A smart city MUST have core physical infrastructure (24x7 water, sanitation, transport, affordable housing) first, with digital technology layered on top.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which scheme offers a statutory guarantee of 100 days of wage work per household?',
      options: ['IRDP', 'MGNREGA', 'PKVY', 'HRIDAY'],
      correctIndex: 1,
    },
    {
      question: 'What triggered the 1991 New Economic Policy reforms?',
      options: ['Foreign exchange crisis ($1.1B reserves)', 'Excess food grain surplus', 'Overvalued real estate bubble', 'Hyper-export boom'],
      correctIndex: 0,
    },
    {
      question: 'Selling 100% of Air India to the Tata Group in 2022 is an example of:',
      options: ['Complete Strategic Disinvestment', 'Partial Disinvestment', 'Industrial Licensing', 'Import Substitution'],
      correctIndex: 0,
    },
    {
      question: 'Which body succeeded GATT on 1 January 1995 with India as a founder?',
      options: ['WTO', 'IMF', 'World Bank', 'UNESCO'],
      correctIndex: 0,
    },
    {
      question: 'In the JAM trinity, what does the letter "A" stand for?',
      options: ['Air India', 'Aadhaar', 'Automobile', 'Agriculture'],
      correctIndex: 1,
    },
    {
      question: 'Which state became India’s first 100% certified organic farming state under PKVY framework?',
      options: ['Punjab', 'Sikkim', 'Maharashtra', 'Haryana'],
      correctIndex: 1,
    },
    {
      question: 'What percentage of MGNREGA beneficiaries are women on average?',
      options: ['Around 60%', 'Less than 10%', 'Exactly 5%', '0%'],
      correctIndex: 0,
    },
    {
      question: 'What is the primary role of DigiLocker under Digital India?',
      options: ['Physical iron vault for cash', 'Paperless digital storage of authentic documents', 'Stock trading platform', 'Agricultural tractor booking'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Master all 6 ICSE Class 9 Economics nodes: Government schemes, LPG pillars, Smart Cities, and Digital/Skill India.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Safety Net: MGNREGA Household Wage Simulator',
    instruction: 'Adjust the days worked slider (0-100) and daily wage to calculate rural household income and evaluate lean-season poverty alleviation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_ECON_041,
  },
  {
    title: '2. 1991 Turning Point: The LPG Reform Matrix',
    instruction: 'Click each pillar of the 1991 New Economic Policy to inspect its core mechanism and economic impact.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C9_ECON_042,
  },
  {
    title: '3. Privatisation Spectrum: Strategic vs Partial Disinvestment',
    instruction: 'Adjust the government equity slider (0% to 100%) to observe the shift between State Ownership, Partial Disinvestment, Strategic Sale, and Outright Privatisation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_ECON_043,
  },
  {
    title: '4. Globalisation Engine: IT Exports & Forex Growth',
    instruction: 'Explore the historical growth curve of India’s IT-BPM exports and foreign exchange reserves from 1991 to 2023.',
    interactionType: 'chart-explore',
    nodeId: NODE_C9_ECON_044,
  },
  {
    title: '5. Modern India: Smart Cities & The JAM Trinity',
    instruction: 'Toggle city infrastructure layers (Water, BRTS, Solar, Command Centre) to see urban livability index and citizen empowerment.',
    interactionType: 'layer-toggle',
    nodeId: NODE_C9_ECON_045,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a rural family has 3 working adults, what is the maximum total MGNREGA wage days they can collectively claim in a financial year?',
    options: ['300 days (100 days per person)', '100 days (100 days per household ceiling)', '50 days total', 'Unlimited days on demand'],
    correctIndex: 1,
    verifyInstruction: 'Notice how the statutory ceiling applies to the entire household unit, preventing fiscal over-expansion while ensuring lean-season security.',
    nodeId: NODE_C9_ECON_041,
  },
  {
    question: 'Predict: If the government reduces its shareholding in a PSU from 100% to 75%, does the private buyer gain management control?',
    options: ['Yes, any private share grants full management control', 'No, the government retains majority control (75% > 50%) — this is partial disinvestment', 'Yes, only foreign investors get control', 'No, the PSU immediately ceases operations'],
    correctIndex: 1,
    verifyInstruction: 'Drag the equity slider in the Disinvestment Simulator above 50% to confirm the government retains majority control!',
    nodeId: NODE_C9_ECON_043,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What pattern do you observe in India’s Foreign Exchange Reserves after the 1991 LPG reforms?',
    observableOptions: [
      'Reserves rose dramatically from $1.1 billion in 1991 to over $600 billion by 2023',
      'Reserves permanently crashed to zero',
      'Reserves remained completely flat at $1.1 billion for 30 years',
      'India stopped using foreign currencies entirely',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_ECON_044,
  },
  {
    question: 'What happens to net farm income under the PKVY organic model when expensive chemical fertilisers are eliminated?',
    observableOptions: [
      'Input costs drop by 30-40%, increasing net profit margins and restoring soil fertility',
      'Net farm profit drops to zero immediately',
      'Crops can no longer grow in Indian soil',
      'Farmers are forced to abandon agricultural land',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_ECON_041,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Economic Policy Analyst Case Study',
  description: 'Select an Indian enterprise or public project (e.g. Air India turnaround under Tata, UPI transaction ecosystem, or Pune Smart City BRTS). Write a 4-point briefing note explaining how welfare safety, deregulation, and technology work together in that case.',
  steps: [
    'Choose your case study: Air India Disinvestment, UPI/Jan Dhan Revolution, or Pune Smart City.',
    'Identify whether it represents Liberalisation, Privatisation, Globalisation, or Digital India.',
    'Detail one direct benefit to low-income citizens (employment, housing, or zero-cost payments).',
    'Calculate the economic efficiency gain (subsidy saving, energy saved, or export revenue).',
  ],
};

// ─── DATA FOR RECHARTS & CHARTS ───
const MACRO_GROWTH_DATA = [
  { year: '1991', gdpGrowth: 1.1, forexReserves: 1.1, itExports: 0.5 },
  { year: '1995', gdpGrowth: 7.6, forexReserves: 25.2, itExports: 1.8 },
  { year: '2000', gdpGrowth: 4.4, forexReserves: 38.0, itExports: 6.0 },
  { year: '2005', gdpGrowth: 9.3, forexReserves: 145.0, itExports: 24.0 },
  { year: '2010', gdpGrowth: 8.5, forexReserves: 297.0, itExports: 59.0 },
  { year: '2015', gdpGrowth: 8.0, forexReserves: 350.0, itExports: 100.0 },
  { year: '2020', gdpGrowth: -5.8, forexReserves: 580.0, itExports: 140.0 },
  { year: '2023', gdpGrowth: 7.2, forexReserves: 620.0, itExports: 155.0 },
];

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: MGNREGA RURAL SAFETY NET ARCHITECTURE ───
const MgnregaSafetyNetSvg = () => (
  <svg viewBox="0 0 720 180" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-inner">
    <defs>
      <linearGradient id="mgnregaGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="mgnregaGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
      <linearGradient id="mgnregaGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <marker id="arrowMgnrega" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M 0 0 L 8 4 L 0 8 z" fill="#10b981" />
      </marker>
    </defs>

    {/* Stage 1: Rural Household */}
    <g transform="translate(15, 25)">
      <rect width="145" height="130" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
      <circle cx="72.5" cy="40" r="22" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
      <text x="72.5" y="46" textAnchor="middle" fontSize="20">👨‍🌾👩‍🌾</text>
      <text x="72.5" y="80" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">Rural Household</text>
      <text x="72.5" y="98" textAnchor="middle" fill="#94a3b8" fontSize="10">Applies for Job Card</text>
      <rect x="20" y="108" width="105" height="18" rx="6" fill="#065f46" />
      <text x="72.5" y="121" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">100-Day Right</text>
    </g>

    {/* Arrow 1 */}
    <path d="M 165 90 L 195 90" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowMgnrega)" />

    {/* Stage 2: Public Works Infrastructure */}
    <g transform="translate(200, 25)">
      <rect width="150" height="130" rx="12" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
      <circle cx="75" cy="40" r="22" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="75" y="46" textAnchor="middle" fontSize="20">⛏️💧</text>
      <text x="75" y="80" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">Public Assets Built</text>
      <text x="75" y="98" textAnchor="middle" fill="#94a3b8" fontSize="10">Ponds, Bunds & Roads</text>
      <rect x="20" y="108" width="110" height="18" rx="6" fill="#0369a1" />
      <text x="75" y="121" textAnchor="middle" fill="#bae6fd" fontSize="9" fontWeight="bold">60% Female Quota</text>
    </g>

    {/* Arrow 2 */}
    <path d="M 355 90 L 385 90" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowMgnrega)" />

    {/* Stage 3: Direct Benefit Transfer (DBT) */}
    <g transform="translate(390, 25)">
      <rect width="150" height="130" rx="12" fill="#0f172a" stroke="#d97706" strokeWidth="2" />
      <circle cx="75" cy="40" r="22" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="75" y="46" textAnchor="middle" fontSize="20">🏦📲</text>
      <text x="75" y="80" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">Jan Dhan Bank DBT</text>
      <text x="75" y="98" textAnchor="middle" fill="#94a3b8" fontSize="10">Biometric Aadhaar Link</text>
      <rect x="18" y="108" width="114" height="18" rx="6" fill="#b45309" />
      <text x="75" y="121" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">Direct Cash Wages</text>
    </g>

    {/* Arrow 3 */}
    <path d="M 545 90 L 575 90" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowMgnrega)" />

    {/* Stage 4: Poverty Alleviation Impact */}
    <g transform="translate(580, 25)">
      <rect width="125" height="130" rx="12" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
      <circle cx="62.5" cy="40" r="22" fill="#022c22" stroke="#6ee7b7" strokeWidth="1.5" />
      <text x="62.5" y="46" textAnchor="middle" fontSize="20">🛡️📈</text>
      <text x="62.5" y="80" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Lean Safety Net</text>
      <text x="62.5" y="96" textAnchor="middle" fill="#a7f3d0" fontSize="9">Prevents Distress</text>
      <text x="62.5" y="110" textAnchor="middle" fill="#a7f3d0" fontSize="9">Rural Migration</text>
      <text x="62.5" y="126" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">Wage Floor Set</text>
    </g>
  </svg>
);

// ─── TOPIC-SPECIFIC SVG DIAGRAM 2: 1991 LPG REFORMS TRIAD ───
const LpgReformsTriadSvg = () => (
  <svg viewBox="0 0 720 190" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-inner">
    <defs>
      <linearGradient id="libGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="privGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#581c87" />
      </linearGradient>
      <linearGradient id="globGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>
    </defs>

    {/* Header banner */}
    <rect x="220" y="8" width="280" height="26" rx="8" fill="#1e293b" stroke="#475569" />
    <text x="360" y="25" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">JULY 1991 NEW ECONOMIC POLICY (NEP)</text>

    {/* Pillar 1: Liberalisation */}
    <g transform="translate(25, 45)">
      <rect width="205" height="135" rx="12" fill="url(#libGrad)" stroke="#60a5fa" strokeWidth="1.5" />
      <rect x="15" y="10" width="175" height="24" rx="6" fill="#1e1b4b" />
      <text x="102" y="26" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">🔓 1. LIBERALISATION</text>
      <text x="20" y="52" fill="#ffffff" fontSize="10" fontWeight="bold">• Abolished Licence Raj</text>
      <text x="20" y="70" fill="#cbd5e1" fontSize="9.5">• Ended industrial red tape</text>
      <text x="20" y="88" fill="#cbd5e1" fontSize="9.5">• Slashed import tariffs (113%→15%)</text>
      <text x="20" y="106" fill="#cbd5e1" fontSize="9.5">• Reserved sectors cut (17 → 3)</text>
      <text x="20" y="124" fill="#93c5fd" fontSize="9.5" fontWeight="bold">Impact: Consumer Choice & Quality</text>
    </g>

    {/* Pillar 2: Privatisation */}
    <g transform="translate(255, 45)">
      <rect width="205" height="135" rx="12" fill="url(#privGrad)" stroke="#c084fc" strokeWidth="1.5" />
      <rect x="15" y="10" width="175" height="24" rx="6" fill="#2e1065" />
      <text x="102" y="26" textAnchor="middle" fill="#e9d5ff" fontSize="12" fontWeight="bold">🏢 2. PRIVATISATION</text>
      <text x="20" y="52" fill="#ffffff" fontSize="10" fontWeight="bold">• Disinvestment Spectrum</text>
      <text x="20" y="70" fill="#cbd5e1" fontSize="9.5">• Partial sale (LIC IPO 3.5%)</text>
      <text x="20" y="88" fill="#cbd5e1" fontSize="9.5">• Strategic sale (BALCO 51%)</text>
      <text x="20" y="106" fill="#cbd5e1" fontSize="9.5">• Outright 100% (Air India/Tata)</text>
      <text x="20" y="124" fill="#e9d5ff" fontSize="9.5" fontWeight="bold">Impact: Ended Loss-Making PSUs</text>
    </g>

    {/* Pillar 3: Globalisation */}
    <g transform="translate(485, 45)">
      <rect width="205" height="135" rx="12" fill="url(#globGrad)" stroke="#34d399" strokeWidth="1.5" />
      <rect x="15" y="10" width="175" height="24" rx="6" fill="#022c22" />
      <text x="102" y="26" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">🌐 3. GLOBALISATION</text>
      <text x="20" y="52" fill="#ffffff" fontSize="10" fontWeight="bold">• 1991 Rupee Devaluation</text>
      <text x="20" y="70" fill="#cbd5e1" fontSize="9.5">• WTO Founding Member (1995)</text>
      <text x="20" y="88" fill="#cbd5e1" fontSize="9.5">• IT-BPM Exports ($0.5B→$155B)</text>
      <text x="20" y="106" fill="#cbd5e1" fontSize="9.5">• Pharmacy of World (60% Vaccines)</text>
      <text x="20" y="124" fill="#6ee7b7" fontSize="9.5" fontWeight="bold">Impact: $620B+ Forex Reserves</text>
    </g>
  </svg>
);

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: JAM TRINITY & DIGITAL GOVERNANCE ───
const JamTrinitySvg = () => (
  <svg viewBox="0 0 720 190" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-inner">
    <defs>
      <marker id="jamArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M 0 0 L 8 4 L 0 8 z" fill="#f59e0b" />
      </marker>
    </defs>

    {/* Center Engine Hub */}
    <g transform="translate(260, 65)">
      <rect width="200" height="95" rx="16" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
      <text x="100" y="30" textAnchor="middle" fill="#c7d2fe" fontSize="13" fontWeight="bold">⚡ JAM DBT ENGINE</text>
      <text x="100" y="52" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="extrabold">₹2.7 Lakh Crore</text>
      <text x="100" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10">Subsidy Leakage Prevented</text>
      <text x="100" y="84" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Zero Ghost Beneficiaries</text>
    </g>

    {/* J - Jan Dhan */}
    <g transform="translate(20, 25)">
      <rect width="180" height="70" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
      <circle cx="35" cy="35" r="18" fill="#064e3b" />
      <text x="35" y="41" textAnchor="middle" fontSize="16">🏦</text>
      <text x="65" y="30" fill="#6ee7b7" fontSize="12" fontWeight="bold">J: Jan Dhan</text>
      <text x="65" y="46" fill="#cbd5e1" fontSize="10">50+ Crore Accounts</text>
      <text x="65" y="58" fill="#94a3b8" fontSize="9">Zero-Balance Banking</text>
    </g>
    <path d="M 205 60 L 255 90" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 2" markerEnd="url(#jamArrow)" />

    {/* A - Aadhaar */}
    <g transform="translate(270, 5)">
      <rect width="180" height="50" rx="12" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
      <circle cx="30" cy="25" r="15" fill="#0c4a6e" />
      <text x="30" y="30" textAnchor="middle" fontSize="14">🆔</text>
      <text x="55" y="24" fill="#38bdf8" fontSize="12" fontWeight="bold">A: Aadhaar</text>
      <text x="55" y="40" fill="#94a3b8" fontSize="9.5">135+ Cr Biometric IDs</text>
    </g>
    <path d="M 360 55 L 360 62" stroke="#0ea5e9" strokeWidth="2.5" markerEnd="url(#jamArrow)" />

    {/* M - Mobile */}
    <g transform="translate(520, 25)">
      <rect width="180" height="70" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="35" cy="35" r="18" fill="#78350f" />
      <text x="35" y="41" textAnchor="middle" fontSize="16">📱</text>
      <text x="65" y="30" fill="#fde68a" fontSize="12" fontWeight="bold">M: Mobile</text>
      <text x="65" y="46" fill="#cbd5e1" fontSize="10">114+ Cr Connections</text>
      <text x="65" y="58" fill="#94a3b8" fontSize="9">SMS Alerts & UPI Rails</text>
    </g>
    <path d="M 515 60 L 465 90" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" markerEnd="url(#jamArrow)" />

    {/* Beneficiary Empowerment Bar */}
    <g transform="translate(100, 165)">
      <rect width="520" height="20" rx="6" fill="#064e3b" stroke="#10b981" />
      <text x="260" y="179" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">
        DIRECT TO BENEFICIARY: 100% of ₹1 reaches the poor (No middlemen cut)
      </text>
    </g>
  </svg>
);

// ─── MAIN SIMULATION COMPONENT ───
export function C9_EconomicsGovernmentSchemesRemoveSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_ECON_041,
  title = DEFAULT_PROPS.title || 'Economics Simulation',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org Interaction State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [selectedLpgPillar, setSelectedLpgPillar] = useState<'lib' | 'priv' | 'glob'>('lib');

  // Reflection section states
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Simulation Sliders / Controls
  const [mgnregaDays, setMgnregaDays] = useState<number>(70);
  const [mgnregaWage, setMgnregaWage] = useState<number>(240);
  const [govtGovEquity, setGovtEquity] = useState<number>(75);
  const [smartLayers, setSmartLayers] = useState({
    water247: true,
    brtsMetro: true,
    smartLighting: true,
    commandCentre: true,
    pmayHousing: true,
  });

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag-and-drop & Non-MCQ states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES / REAL-TIME CALCULATIONS ───
  const householdTotalWage = useMemo(() => {
    return mgnregaDays * mgnregaWage;
  }, [mgnregaDays, mgnregaWage]);

  const maxHouseholdEntitlement = useMemo(() => {
    return 100 * mgnregaWage;
  }, [mgnregaWage]);

  const disinvestmentCategory = useMemo(() => {
    if (govtGovEquity === 100) return '100% State-Owned PSU';
    if (govtGovEquity > 50) return 'Partial Disinvestment (Govt Retains Majority Control)';
    if (govtGovEquity > 0) return 'Strategic Disinvestment (Private Buyer Holds Majority)';
    return '100% Outright Disinvestment / Full Privatisation';
  }, [govtGovEquity]);

  const urbanLivabilityScore = useMemo(() => {
    let score = 40;
    if (smartLayers.water247) score += 15;
    if (smartLayers.brtsMetro) score += 15;
    if (smartLayers.smartLighting) score += 10;
    if (smartLayers.commandCentre) score += 10;
    if (smartLayers.pmayHousing) score += 10;
    return score;
  }, [smartLayers]);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── ADAPTIVE DIFFICULTY ON MOUNT ───
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

  // ─── CANVAS 2D ANIMATION EFFECT ───
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

      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 15 + Math.sin((x + frame * 2) * 0.04) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const particleX = (frame * 3) % canvas.width;
      const particleY = 15 + Math.sin((particleX + frame * 2) * 0.04) * 8;
      ctx.beginPath();
      ctx.arc(particleX, particleY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

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
      speechManager.speak('Let us review the step-by-step concept explanation.');
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent insight! The 1991 LPG reforms transformed the Indian economy.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive policy labs. Let us explore how reforms work!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment freely with economic policies!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Test your understanding.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now test your prediction using the interactive controls!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! That aligns with India’s growth data.' : 'Look closer at the trend lines.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You scored ${finalScore}% and mastered the economic reforms chapter.`);
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
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

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
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Spot on! Excellent economic analysis.');
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
          speechManager.speak('Let us study the complete solution breakdown together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 5000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
      setSortArrangement(prev => {
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
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSmartLayerToggle = useCallback((layerKey: keyof typeof smartLayers) => {
    setSmartLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
    audioManager.play('tap');
  }, [smartLayers]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-xl border border-emerald-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">ICSE Class 9 Economics</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">Poverty, Reforms & Modern India</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white">{title}</h1>
          </div>
        </div>

        {/* Phase & Live Canvas Status */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-36 h-8 bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
            <canvas ref={canvasRef} width={144} height={32} className="w-full h-full" />
          </div>

          <div className="flex gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
              <motion.button
                key={p}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (p === 'discovery') setPhase('discovery');
                  else if (p === 'explore') setPhase('explore');
                  else if (p === 'sandbox') setPhase('sandbox');
                  else if (p === 'challenge') setPhase('challenge');
                  audioManager.play('tap');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all capitalize ${
                  phase === p
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label={`Switch to ${p} phase`}
              >
                {p}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/60">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Policy Mission Briefing
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-400/90 mt-2 font-medium">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg">💡</span>
              <h3 className="text-base font-bold text-slate-100">Discovery Hook: The 1991 Crisis & The Turning Point</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-semibold">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700/50'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-750 border border-slate-700/80'
                  }`}
                  aria-label={`Discovery option ${i + 1}`}
                >
                  <span className="inline-block w-6 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4"
              >
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! The 1991 LPG reforms dismantled the Licence Raj and launched modern Indian growth.'
                    : `⚠️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-950/60 flex items-center gap-2"
                  aria-label="Proceed to interactive exploration labs"
                >
                  Enter Policy Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Selector Pills */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white border border-emerald-400/50 shadow-md shadow-emerald-950'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                Step {idx + 1}: {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          {/* Interactive Slide Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Interactive Lab</span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-amber-400 text-xs sm:text-sm mt-1.5 font-medium flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: MGNREGA Household Wage Simulator + SVG 1 */}
              {currentSlide === 0 && (
                <div className="space-y-6 bg-slate-950 p-5 rounded-xl border border-slate-800/80">
                  {/* Topic-Specific SVG Diagram 1 */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Figure 1: Statutory Rural Wage & Asset Architecture (MGNREGA / DBT)
                      </span>
                    </div>
                    <MgnregaSafetyNetSvg />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                          <span>Household Days Worked (Max 100):</span>
                          <span className="text-emerald-400 font-bold">{mgnregaDays} Days</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={mgnregaDays}
                          onChange={e => {
                            setMgnregaDays(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-emerald-500 cursor-pointer"
                          aria-label="MGNREGA days worked slider"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                          <span>Notified State Daily Wage Rate:</span>
                          <span className="text-amber-400 font-bold">₹{mgnregaWage} / day</span>
                        </div>
                        <input
                          type="range"
                          min={180}
                          max={350}
                          step={10}
                          value={mgnregaWage}
                          onChange={e => {
                            setMgnregaWage(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-amber-500 cursor-pointer"
                          aria-label="MGNREGA wage rate slider"
                        />
                      </div>

                      {/* Prediction verification */}
                      {!predictionMade ? (
                        <div className="p-3.5 bg-slate-900 rounded-xl border border-gold-800/60 space-y-2">
                          <p className="text-xs font-bold text-gold-300">{PREDICTION_QUESTIONS[0].question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handlePrediction(i)}
                                className="p-2 text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium border border-slate-700"
                                aria-label={`Prediction choice ${i + 1}`}
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-700/60 text-xs text-emerald-300"
                        >
                          <span className="font-bold">✓ Prediction Verified:</span> {PREDICTION_QUESTIONS[0].verifyInstruction}
                        </motion.div>
                      )}
                    </div>

                    {/* Live Calculation Board */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Household Income Metrics</span>
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-300">Total Actual Earned:</span>
                            <span className="text-xl font-extrabold text-emerald-400">₹{householdTotalWage.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">100-Day Maximum Ceiling:</span>
                            <span className="font-bold text-slate-200">₹{maxHouseholdEntitlement.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Shortfall from Maximum:</span>
                            <span className="font-bold text-rose-400">₹{(maxHouseholdEntitlement - householdTotalWage).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar of Entitlement */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Entitlement Utilisation</span>
                          <span>{mgnregaDays}%</span>
                        </div>
                        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                            animate={{ width: `${mgnregaDays}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 italic">
                        *Note: MGNREGA features social audit accountability & unemployment allowance if work is not given in 15 days.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: 1991 LPG Reform Matrix + SVG 2 */}
              {currentSlide === 1 && (
                <div className="space-y-6 bg-slate-950 p-5 rounded-xl border border-slate-800/80">
                  {/* Topic-Specific SVG Diagram 2 */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                        Figure 2: The 1991 New Economic Policy LPG Pillars Framework
                      </span>
                    </div>
                    <LpgReformsTriadSvg />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { id: 'lib', name: '1. Liberalisation', icon: '🔓', focus: 'Rules & Deregulation' },
                      { id: 'priv', name: '2. Privatisation', icon: '🏢', focus: 'Ownership Transfer' },
                      { id: 'glob', name: '3. Globalisation', icon: '🌐', focus: 'Border Integration' },
                    ].map(p => (
                      <motion.button
                        key={p.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedLpgPillar(p.id as 'lib' | 'priv' | 'glob');
                          audioManager.play('tap');
                        }}
                        className={`p-3.5 rounded-xl text-left border transition-all ${
                          selectedLpgPillar === p.id
                            ? 'bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-950'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                        aria-label={`Select ${p.name}`}
                      >
                        <span className="text-2xl">{p.icon}</span>
                        <h4 className="text-sm font-bold text-white mt-1">{p.name}</h4>
                        <p className="text-xs text-slate-400">{p.focus}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Dynamic Inspection Card */}
                  <div className="p-5 bg-slate-900 rounded-xl border border-slate-800">
                    {selectedLpgPillar === 'lib' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-gold-500/20 text-gold-300">
                            Liberalisation Concept
                          </span>
                          <span className="text-xs text-slate-400">Removing Government Regulations & Controls</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          Abolished the <strong className="text-white">Licence Raj</strong> for most industries, reduced public sector monopolies from 17 to 3, and slashed peak customs tariffs from 113% to 15%. Consumers gained immediate choices in scooters, televisions, and electronics.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">Pre-1991 Tariff:</span>
                            <span className="font-bold text-rose-400 text-sm">113% Average</span>
                          </div>
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">Post-1991 Tariff:</span>
                            <span className="font-bold text-emerald-400 text-sm">10-15% Duty</span>
                          </div>
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">Reserved Sectors:</span>
                            <span className="font-bold text-gold-400 text-sm">Cut 17 → 3</span>
                          </div>
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">FDI Inflows:</span>
                            <span className="font-bold text-amber-400 text-sm">Auto-Approval 51%</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {selectedLpgPillar === 'priv' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                            Privatisation Concept
                          </span>
                          <span className="text-xs text-slate-400">Transfer of Public Ownership & Management</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          DIPAM oversees partial disinvestment (e.g. LIC IPO 3.5% stake sale for ₹21,000 cr) and strategic sales (e.g. Air India sold to Tata Group for ₹18,000 cr, ending ₹60,000+ cr recurring losses).
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs">
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">Partial Disinvestment:</span>
                            <span className="font-bold text-emerald-400">LIC IPO (3.5% sold, govt retains 96.5%)</span>
                          </div>
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">Strategic Disinvestment:</span>
                            <span className="font-bold text-amber-400">BALCO (51% sold, Sterlite 2001)</span>
                          </div>
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">Complete Outright Sale:</span>
                            <span className="font-bold text-purple-400">Air India (100% to Tata, 2022)</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {selectedLpgPillar === 'glob' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            Globalisation Concept
                          </span>
                          <span className="text-xs text-slate-400">Cross-Border Integration of Goods, Capital & Services</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          Encompasses the July 1991 Rupee Devaluation (from ₹17.9 to ₹25.9 per USD), founding membership in the WTO (1995), and the rise of India as the global IT-BPM hub and the "Pharmacy of the World".
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">IT-BPM Exports:</span>
                            <span className="font-bold text-emerald-400 text-sm">$155B+ (2023)</span>
                          </div>
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">Vaccine Supply:</span>
                            <span className="font-bold text-gold-400 text-sm">60% World Total</span>
                          </div>
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">Forex Reserves:</span>
                            <span className="font-bold text-amber-400 text-sm">$620B+ (from $1.1B)</span>
                          </div>
                          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block">WTO Integration:</span>
                            <span className="font-bold text-gold-400 text-sm">Founder (1995)</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 2: Privatisation Spectrum Simulator */}
              {currentSlide === 2 && (
                <div className="space-y-6 bg-slate-950 p-5 rounded-xl border border-slate-800/80">
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Government Shareholding:</span>
                      <span className="text-xl font-extrabold text-emerald-400">{govtGovEquity}% Equity</span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={govtGovEquity}
                      onChange={e => {
                        setGovtEquity(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                      aria-label="Government equity slider"
                    />

                    {/* Visual Ownership Bar */}
                    <div className="h-6 bg-slate-800 rounded-lg overflow-hidden flex border border-slate-700">
                      <motion.div
                        className="bg-emerald-600 flex items-center justify-center text-[11px] font-bold text-white overflow-hidden"
                        animate={{ width: `${govtGovEquity}%` }}
                      >
                        {govtGovEquity >= 20 && `Govt: ${govtGovEquity}%`}
                      </motion.div>
                      <motion.div
                        className="bg-purple-600 flex items-center justify-center text-[11px] font-bold text-white overflow-hidden"
                        animate={{ width: `${100 - govtGovEquity}%` }}
                      >
                        {100 - govtGovEquity >= 20 && `Private: ${100 - govtGovEquity}%`}
                      </motion.div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block font-bold uppercase">Classification Result</span>
                        <span className="text-sm sm:text-base font-extrabold text-white">{disinvestmentCategory}</span>
                      </div>
                      <span className="text-2xl">
                        {govtGovEquity > 50 ? '🏛️' : govtGovEquity > 0 ? '🤝' : '🏭'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Globalisation Chart Exploration */}
              {currentSlide === 3 && (
                <div className="space-y-6 bg-slate-950 p-5 rounded-xl border border-slate-800/80">
                  <div className="h-64 sm:h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={MACRO_GROWTH_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="year" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="forexReserves"
                          name="Forex Reserves ($ Billion)"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: '#10b981', r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="itExports"
                          name="IT-BPM Exports ($ Billion)"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="gdpGrowth"
                          name="GDP Growth Rate (%)"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ fill: '#f59e0b', r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered ? (
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg border border-slate-700 font-medium"
                            aria-label={`Observation answer choice ${i + 1}`}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-700 text-xs text-emerald-300"
                    >
                      <span className="font-bold">✓ Empirical Observation Verified:</span> Forex reserves jumped from $1.1B to $620B+, insulating India against external financial shocks!
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 4: Smart Cities & The JAM Trinity + SVG 3 */}
              {currentSlide === 4 && (
                <div className="space-y-6 bg-slate-950 p-5 rounded-xl border border-slate-800/80">
                  {/* Topic-Specific SVG Diagram 3 */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Figure 3: The JAM Trinity Direct Benefit Transfer (DBT) Ecosystem
                      </span>
                    </div>
                    <JamTrinitySvg />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Layer Toggles */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Smart City Modules (Pune Case Study)</span>
                      <div className="space-y-2">
                        {[
                          { key: 'water247', label: '24x7 Piped Clean Water (10 Wards)', icon: '💧' },
                          { key: 'brtsMetro', label: '125km BRTS & 31km Metro Transit', icon: '🚆' },
                          { key: 'smartLighting', label: '13,000 Smart LED Lights (40% Saved)', icon: '💡' },
                          { key: 'commandCentre', label: 'Integrated Command & Control Centre', icon: '🖥️' },
                          { key: 'pmayHousing', label: 'PMAY Slum Relocation (12,000 Homes)', icon: '🏠' },
                        ].map(item => (
                          <motion.button
                            key={item.key}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleSmartLayerToggle(item.key as keyof typeof smartLayers)}
                            className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                              smartLayers[item.key as keyof typeof smartLayers]
                                ? 'bg-emerald-950/60 border-emerald-500/80 text-white'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                            }`}
                            aria-label={`Toggle ${item.label}`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{item.icon}</span>
                              <span>{item.label}</span>
                            </span>
                            <span className="font-bold">
                              {smartLayers[item.key as keyof typeof smartLayers] ? 'ON' : 'OFF'}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Urban Livability & JAM Status */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Urban Livability Index</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-3xl font-black text-emerald-400">{urbanLivabilityScore}</span>
                          <span className="text-xs text-slate-400">/ 100 Index Points</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-xs">
                        <span className="font-bold text-amber-400">JAM Trinity Direct Benefit Transfer (DBT):</span>
                        <p className="text-slate-300">
                          <strong>J</strong>an Dhan (50Cr+) + <strong>A</strong>adhaar (135Cr+) + <strong>M</strong>obile (114Cr+) = <strong>₹2.7 Lakh Crore</strong> subsidy leakage saved!
                        </p>
                      </div>

                      <p className="text-[11px] text-slate-400">
                        *Note: Digital India builds the digital road; Skill India (PMKVY) trains the skilled driver.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
                  aria-label="Previous lab slide"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs font-bold text-slate-400">
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
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950"
                    aria-label="Next lab slide"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                    aria-label="Enter sandbox free play"
                  >
                    Open Policy Sandbox 🔬
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Free Exploration Mode
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">National Economic Policy Sandbox</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Freely experiment with rural wage rates, disinvestment thresholds, and smart city services with no grading pressure.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-950/60 flex items-center gap-2"
              aria-label="Proceed to challenges"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sandbox Module 1: MGNREGA Calculator */}
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🌾</span> MGNREGA Wage Net
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-400">Days: {mgnregaDays}</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={mgnregaDays}
                    onChange={e => setMgnregaDays(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                    aria-label="Sandbox MGNREGA days"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Daily Wage: ₹{mgnregaWage}</label>
                  <input
                    type="range"
                    min={180}
                    max={350}
                    step={10}
                    value={mgnregaWage}
                    onChange={e => setMgnregaWage(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                    aria-label="Sandbox MGNREGA wage"
                  />
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between font-bold">
                  <span className="text-slate-300">Total Wage:</span>
                  <span className="text-emerald-400">₹{householdTotalWage.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Sandbox Module 2: Disinvestment Spectrum */}
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-purple-400 flex items-center gap-1.5">
                <span>🏢</span> Disinvestment Equity
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-400">Govt Stake: {govtGovEquity}%</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={govtGovEquity}
                    onChange={e => setGovtEquity(Number(e.target.value))}
                    className="w-full accent-purple-500"
                    aria-label="Sandbox disinvestment equity"
                  />
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-bold text-slate-300">
                  {disinvestmentCategory}
                </div>
              </div>
            </div>

            {/* Sandbox Module 3: Urban Livability Index */}
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-gold-400 flex items-center gap-1.5">
                <span>🏙️</span> Smart City Livability
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Current Livability Index:</span>
                  <span className="text-lg font-black text-gold-400">{urbanLivabilityScore} / 100</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {Object.entries(smartLayers).map(([key, val]) => (
                    <motion.button
                      key={key}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSmartLayerToggle(key as keyof typeof smartLayers)}
                      className={`p-1.5 text-[10px] rounded font-bold ${
                        val ? 'bg-gold-600 text-white' : 'bg-slate-950 text-slate-500'
                      }`}
                      aria-label={`Toggle sandbox ${key}`}
                    >
                      {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress Bar */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Challenge</span>
                <span className="text-base font-extrabold text-white">
                  {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-emerald-400 capitalize">{challenge.competencyLevel} competency</span>
              </div>

              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>

            <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-gold-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card with Visual Feedback */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl transition-colors border ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-xl shadow-rose-950'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="p-2 bg-emerald-950 rounded-xl text-emerald-400 text-sm font-bold border border-emerald-800/60">
                Q{currentChallenge + 1}
              </span>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  NEP 2020 Competency: {challenge.competencyLevel}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-1">{challenge.question}</h3>
              </div>
            </div>

            {/* MCQ OPTIONS */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5 pt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                        showExplanation
                          ? i === challenge.correctIndex
                            ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-950'
                            : 'bg-slate-950/50 text-slate-500 border border-slate-800/60'
                          : 'bg-slate-950 text-slate-200 hover:bg-slate-800 border border-slate-800'
                      }`}
                      aria-label={`Option ${i + 1}`}
                    >
                      <span className="inline-block w-6 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block w-full mb-1">Drag items below into correct targets:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg cursor-grab text-white text-xs font-bold shadow-md shadow-emerald-950"
                      role="button"
                      aria-label={`Draggable label ${item.label}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'cat_self', title: 'Self-Employment (Asset Transfer)' },
                    { id: 'cat_wage', title: 'Wage Employment (Guaranteed Works)' },
                    { id: 'cat_agri', title: 'Agricultural Sustainability' },
                    { id: 'cat_urban', title: 'Urban Heritage Infrastructure' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-emerald-500 transition-colors"
                    >
                      <span className="text-xs text-slate-400 block font-semibold">{target.title}</span>
                      <div className="mt-2 min-h-[36px] flex items-center justify-center bg-slate-900 rounded-lg p-2 text-sm font-bold text-emerald-300">
                        {droppedLabels[target.id] || <span className="text-slate-600 font-normal text-xs">Drop scheme here</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                  aria-label="Submit label assignments"
                >
                  Verify Label Assignments →
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4 pt-2">
                <span className="text-xs text-slate-400 block">Drag & drop cards to arrange sequence in correct chronological/causal order:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium cursor-grab flex items-center gap-3"
                      role="button"
                      aria-label={`Sort item ${displayIndex + 1}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-800/80">
                        {displayIndex + 1}
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
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                  aria-label="Submit sort order"
                >
                  Submit Order →
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-bold focus:outline-none focus:border-emerald-500 w-56"
                    aria-label="Numeric input"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                    aria-label="Check calculation"
                  >
                    Check Calculation →
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => (prev.includes(part) ? prev : [...prev, part]))}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-emerald-300 rounded-lg text-xs font-semibold border border-slate-800"
                      aria-label={`Add part ${part}`}
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[64px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-emerald-900 text-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-emerald-700"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200 ml-1"
                        aria-label="Remove part"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click parts above to assemble components</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                  aria-label="Validate assembled model"
                >
                  Verify Model Assembly →
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-slate-950 to-emerald-950/40 rounded-2xl border border-emerald-700/60 space-y-4"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <span>📘</span> Step-by-Step Economic Walkthrough
                </div>

                <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2"
                      >
                        <span className="font-bold text-emerald-400">{idx + 1}.</span>
                        <span>
                          {sentence}
                          {!sentence.endsWith('.') && '.'}
                        </span>
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg text-xs font-bold border border-slate-700"
                      aria-label="Reveal next explanation step"
                    >
                      Show Next Detail →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-950 ml-auto"
                      aria-label="Proceed to next challenge"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Chapter Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950 to-slate-900 rounded-3xl border border-emerald-700/60 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Assessment Complete!</h2>
            <div className="flex justify-center items-center gap-6 pt-2">
              <div>
                <span className="text-xs text-slate-400 block font-bold uppercase">Final Score</span>
                <span className="text-3xl font-extrabold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="h-10 w-px bg-slate-800" />
              <div>
                <span className="text-xs text-slate-400 block font-bold uppercase">Mastery Tier</span>
                <span className="text-xl font-extrabold text-gold-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="h-10 w-px bg-slate-800" />
              <div>
                <span className="text-xs text-slate-400 block font-bold uppercase">Total Mistakes</span>
                <span className={`text-xl font-extrabold ${errors === 0 ? 'text-emerald-400' : errors <= 3 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {errors} {errors === 1 ? 'error' : 'errors'}
                </span>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Policy Advisor Performance Rating</h3>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              {errors === 0
                ? '🌟 Outstanding Mastermind! You scored 100% and demonstrated flawless understanding of Indian welfare schemes, LPG reforms, and digital transformations.'
                : errors <= 3
                ? '👏 Great work! You exhibit strong analytical command over the concepts. Review the slight gaps below to achieve complete mastery.'
                : '📈 Good foundational effort! Every economic mistake provides a stepping stone to deep learning. Review the misconception notes below and re-run the policy simulations.'}
            </p>
          </div>

          {/* ─── HIGHLY VISIBLE SPACED REPETITION SCHEDULE (SRS) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 rounded-2xl border-2 border-amber-500/50 shadow-xl space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-2xl">
                  📅
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Spaced Repetition System (SRS)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-extrabold text-amber-300 uppercase">
                      Active SM-2 Algorithm
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                    Next Recommended Review Schedule
                  </h3>
                </div>
              </div>

              {/* Primary SRS Target Badge */}
              <div className="px-4 py-2 rounded-xl bg-amber-500/10 border-2 border-amber-400 flex items-center gap-2">
                <span className="text-xs text-slate-300 font-medium">Target:</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-300">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Based on your session performance ({errors === 0 ? '0 errors — peak retention' : `${errors} ${errors === 1 ? 'error' : 'errors'} logged`}), our spaced repetition engine calculated optimal memory consolidation timing:
            </p>

            {/* SRS Intervals Visualiser */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  errors === 0
                    ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-950 ring-2 ring-emerald-500/40'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">0 Mistakes</span>
                  <span className="font-bold text-emerald-400">Mastery Retained</span>
                </div>
                <div className="mt-1 text-sm font-black text-white">Review in 7 Days</div>
                <p className="text-[11px] text-slate-400 mt-0.5">Consolidates long-term memory traces into permanent schema.</p>
              </div>

              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  errors >= 1 && errors <= 3
                    ? 'bg-amber-950/80 border-amber-400 shadow-lg shadow-amber-950 ring-2 ring-amber-500/40'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">1 – 3 Mistakes</span>
                  <span className="font-bold text-amber-400">Developing Grip</span>
                </div>
                <div className="mt-1 text-sm font-black text-white">Review in 3 Days</div>
                <p className="text-[11px] text-slate-400 mt-0.5">Reinforces concepts before the initial forgetting curve drops.</p>
              </div>

              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  errors >= 4
                    ? 'bg-rose-950/80 border-rose-400 shadow-lg shadow-rose-950 ring-2 ring-rose-500/40'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">4+ Mistakes</span>
                  <span className="font-bold text-rose-400">Needs Remediation</span>
                </div>
                <div className="mt-1 text-sm font-black text-white">Review in 1 Day</div>
                <p className="text-[11px] text-slate-400 mt-0.5">Quick turnaround review to overwrite misconceptions immediately.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400 italic">
              <span>💡</span>
              <span>
                Your spaced repetition prompt has been logged to your local study queue. Consistent reviews improve board exam retention by over 300%.
              </span>
            </div>
          </motion.div>

          {/* ─── REFLECTION SECTION ─��─ */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-gold-950/30 to-slate-900 rounded-2xl border border-gold-700/50 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <div>
                <h3 className="text-base font-bold text-white">Post-Simulation Reflection</h3>
                <p className="text-xs text-slate-400">Synthesize your policy insights and real-world understanding</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-emerald-400 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="E.g., How India's foreign exchange reserves rose from barely $1.1B in 1991 to over $620B+, or how MGNREGA guarantee is per household rather than per individual..."
                  className="w-full h-20 p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  aria-label="Reflection question 1"
                />
              </div>

              {/* Question 2 */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-gold-400 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="E.g., India's economy is like building a house: welfare schemes create the protective floor, LPG reforms opened the doors and windows for trade, and Digital India installed the smart electrical system..."
                  className="w-full h-20 p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500 resize-none"
                  aria-label="Reflection question 2"
                />
              </div>

              {/* Question 3 */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-amber-400 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="E.g., Understanding UPI and Direct Benefit Transfers when seeing zero-fee digital payments, or evaluating public disinvestment debates in the news..."
                  className="w-full h-20 p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  aria-label="Reflection question 3"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setReflectionSubmitted(true);
                  audioManager.play('success');
                }}
                className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-950"
                aria-label="Save reflections"
              >
                {reflectionSubmitted ? '✓ Reflections Saved' : 'Submit Reflections →'}
              </motion.button>
              {reflectionSubmitted && (
                <span className="text-xs text-emerald-400 font-semibold">
                  Reflections saved to your policy learning portfolio!
                </span>
              )}
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Remediation
              </h3>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-semibold">✓ Correct Economic Principle: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>📝</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-emerald-400 mr-1.5">{idx + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK COMPONENT OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Assessment Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_EconomicsGovernmentSchemesRemoveSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, XAxis, YAxis } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ───
const NODE_C9_ECON_001 = 'c9_econ_001';
const NODE_C9_ECON_002 = 'c9_econ_002';
const NODE_C9_ECON_003 = 'c9_econ_003';
const NODE_C9_ECON_004 = 'c9_econ_004';
const NODE_C9_ECON_005 = 'c9_econ_005';
const NODE_C9_ECON_006 = 'c9_econ_006';
const NODE_C9_ECON_007 = 'c9_econ_007';
const NODE_C9_ECON_008 = 'c9_econ_008';
const NODE_C9_ECON_009 = 'c9_econ_009';
const NODE_C9_ECON_010 = 'c9_econ_010';

const ALL_NODE_IDS = [
  NODE_C9_ECON_001,
  NODE_C9_ECON_002,
  NODE_C9_ECON_003,
  NODE_C9_ECON_004,
  NODE_C9_ECON_005,
  NODE_C9_ECON_006,
  NODE_C9_ECON_007,
  NODE_C9_ECON_008,
  NODE_C9_ECON_009,
  NODE_C9_ECON_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Blueprint of Prosperity: Rebuilding Bharatnagar',
  intro: 'Welcome, Chief Economic Advisor! The newly developing district of Bharatnagar needs an economic blueprint. From deciding how to define national wealth and human welfare, to setting up factor markets, managing the water-diamond paradox, and balancing household saving against district growth, your decisions will shape the livelihoods of 500,000 citizens.',
  context: 'Navigate through classical foundations (Smith, Marshall, Robbins, Samuelson), classify micro and macro dynamics, separate economic from non-economic work, and manage factors of production in real-time simulations.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 1776, Adam Smith wrote that economics is the study of the wealth of nations. If the Reserve Bank of India prints ₹10 lakh crore of new currency notes tomorrow, does India instantly become wealthier under Smith\'s definition?',
  options: [
    'Yes — currency notes are the exact definition of national wealth.',
    'No — wealth consists of tangible material goods produced (wheat, cloth, steel), not printed paper currency.',
    'Yes — because more money directly means higher welfare for everyone.',
    'No — because paper money is considered a non-economic civic service.',
  ],
  correctIndex: 1,
  hintAfter: 'Adam Smith defined wealth as real material goods produced by human labour, not mere currency tokens! Let us dive into the evolution of economic thought.',
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

// ─── 24 RICH CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // Tier 1: Foundation (8 challenges)
  {
    id: 'ch_001_smith_basic',
    nodeId: NODE_C9_ECON_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Adam Smith\'s 1776 definition, which of the following is considered "wealth"?',
    options: [
      '₹2,000 currency notes in a bank vault',
      '1,000 tonnes of Punjab wheat and Tata steel',
      'The teaching skills of a Delhi school instructor',
      'The spiritual blessings of a temple priest',
    ],
    correctIndex: 1,
    explanation: 'Adam Smith defined wealth as the tangible material goods produced by human labour and exchanged in markets, such as wheat, cloth, and steel.',
    hints: [
      'Smith focused on material goods that you can physically touch and store.',
      'Paper money is only a medium of exchange, not the real material good itself.',
      'Tangible commodities like wheat and steel constitute wealth in Smith\'s framework.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_marshall_welfare',
    nodeId: NODE_C9_ECON_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How did Alfred Marshall (1890) shift the central focus of economics compared to Adam Smith?',
    options: [
      'He made gold accumulation the sole purpose of foreign trade.',
      'He shifted the centre from wealth alone to human welfare and the material requisites of well-being.',
      'He argued that all services are non-economic and should be excluded.',
      'He eliminated the study of consumption and focused only on industrial factories.',
    ],
    correctIndex: 1,
    explanation: 'Marshall defined economics as the study of mankind in the ordinary business of life, specifically focusing on the attainment and use of the material requisites of well-being.',
    hints: [
      'Think about whether Marshall cared more about things or the humans using them.',
      'Marshall made wealth the means and human well-being the ultimate end.',
      'His definition is famously known as the Welfare Definition.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_robbins_scarcity',
    nodeId: NODE_C9_ECON_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Lionel Robbins (1932) defined economics around which fundamental universal condition?',
    options: [
      'Only poor countries face economic dilemmas.',
      'Human ends are unlimited, while means are scarce and have alternative uses.',
      'Governments should print money to eliminate all shortages.',
      'Economics only studies business firms operating in industrial cities.',
    ],
    correctIndex: 1,
    explanation: 'Robbins formulated economics as the science studying human behaviour as a relationship between unlimited ends and scarce means that have alternative uses.',
    hints: [
      'What happens when your desires exceed your pocket money or resources?',
      'Robbins emphasised that means are limited and can be put to different uses.',
      'The relationship between unlimited ends and scarce means requires choice.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_004_economic_activity',
    nodeId: NODE_C9_ECON_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following is an Economic Activity?',
    options: [
      'A mother cooking breakfast for her children out of love',
      'A chef cooking dinner in a Chennai restaurant for a monthly salary of ₹25,000',
      'A student donating blood at an AIIMS camp out of humanitarian duty',
      'A citizen standing in line to cast their vote in the Lok Sabha election',
    ],
    correctIndex: 1,
    explanation: 'The chef works for a monetary motive (salary), making it an economic activity. The mother, blood donor, and voter act out of love, sympathy, or civic duty.',
    hints: [
      'Look for the presence of a monetary motive (wages, salary, fees, or profit).',
      'The same physical task (cooking) is economic only when performed for money.',
      'Salary earned by the restaurant chef makes it economic.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_005_factors_drag',
    nodeId: NODE_C9_ECON_009,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match each of the 4 classical Factors of Production to its corresponding economic reward.',
    dragItems: [
      { label: 'Rent', targetId: 'factor_land' },
      { label: 'Wages', targetId: 'factor_labour' },
      { label: 'Interest', targetId: 'factor_capital' },
      { label: 'Profit', targetId: 'factor_ent' },
    ],
    correctMapping: {
      factor_land: 'Rent',
      factor_labour: 'Wages',
      factor_capital: 'Interest',
      factor_ent: 'Profit',
    },
    explanation: 'The four classical factor-reward pairs are: Land → Rent, Labour → Wages, Capital → Interest, and Entrepreneurship/Organisation → Profit.',
    hints: [
      'What do you pay to use a plot of land or office space? Rent.',
      'What does a worker or engineer receive for their human effort? Wages.',
      'Capital earns interest, while the risk-taking entrepreneur earns profit.',
    ],
  },
  {
    id: 'ch_006_micro_macro_terms',
    nodeId: NODE_C9_ECON_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement correctly distinguishes Microeconomics from Macroeconomics?',
    options: [
      'Microeconomics deals with large corporations like Reliance; Macroeconomics deals with small tea stalls.',
      'Microeconomics studies individual units (a consumer, single firm, tomato price in Azadpur mandi); Macroeconomics studies the whole economy (national GDP, CPI inflation).',
      'Microeconomics studies money supply; Macroeconomics studies the utility of an apple.',
      'Microeconomics is normative while Macroeconomics is completely unscientific.',
    ],
    correctIndex: 1,
    explanation: 'Microeconomics examines individual economic units and specific markets (Price Theory), whereas Macroeconomics analyzes economy-wide aggregates like GDP and general inflation (Income Theory).',
    hints: [
      'Micro comes from Greek "mikros" (small unit); Macro comes from "makros" (large/aggregate).',
      'The size of a firm does NOT make it macro — Tata Motors as a single firm is still micro.',
      'Look for individual units vs whole-economy aggregates.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_007_goods_services',
    nodeId: NODE_C9_ECON_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary distinguishing characteristic between an economic Good and an economic Service?',
    options: [
      'Goods are free gifts of nature, while services always cost money.',
      'Goods are tangible material items that can be touched and stored; Services are intangible activities consumed when delivered.',
      'Goods only satisfy physical desires, whereas services satisfy economic wants.',
      'Goods are always durable for 50 years; services expire within 1 second.',
    ],
    correctIndex: 1,
    explanation: 'Goods are tangible material objects (like a bag of atta or a laptop), while services are intangible activities (like a haircut, bus ride, or doctor’s consultation).',
    hints: [
      'Can you physically touch and store a haircut in a box? No, but you can store a smartphone.',
      'Tangibility is the core criterion.',
      'Goods are tangible; services are intangible.',
    ],
  },
  {
    id: 'ch_008_saving_calc_basic',
    nodeId: NODE_C9_ECON_010,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A software engineer in Pune earns ₹80,000 per month (Income Y) and spends ₹55,000 per month on rent, groceries, and travel (Consumption C). Calculate her monthly Saving (S in ₹).',
    correctAnswer: 25000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Using the fundamental saving formula S = Y - C: S = ₹80,000 - ₹55,000 = ₹25,000 per month.',
    hints: [
      'Remember the fundamental formula: Saving = Income − Consumption.',
      'Subtract the consumption spending from the total income earned.',
      '80000 − 55000 = ?',
    ],
  },

  // Tier 2: Standard (8 challenges)
  {
    id: 'ch_009_smith_criticism_service',
    nodeId: NODE_C9_ECON_001,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A senior surgeon at AIIMS Delhi performs life-saving open heart surgeries, while a factory worker in Surat weaves polyester sarees. Under Adam Smith\'s narrow Wealth definition, why was the surgeon excluded from being an "economic person"?',
    options: [
      'Because surgery is an illegal non-commercial activity in classical economics.',
      'Because Smith\'s definition restricted economics to tangible material commodities, treating intangible services as non-productive.',
      'Because government employees do not earn any factor rewards.',
      'Because Marshall proved doctors do not generate any form of utility.',
    ],
    correctIndex: 1,
    explanation: 'Adam Smith restricted wealth to tangible material goods. Services like healthcare, teaching, and legal counsel produced no physical goods and were therefore excluded as non-material.',
    hints: [
      'Did the surgeon create a physical commodity you can put in a warehouse?',
      'Smith\'s definition was heavily criticized for ignoring the services sector.',
      'Intangible services were excluded from Smith\'s concept of material wealth.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_009b_definitions_evolution_sort',
    nodeId: NODE_C9_ECON_004,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the four foundational economists in chronological order of their published economic definitions.',
    sortItems: [
      'Adam Smith (Wealth Definition — Wealth of Nations, 1776)',
      'Alfred Marshall (Welfare Definition — Principles of Economics, 1890)',
      'Lionel Robbins (Scarcity & Choice Definition — Essay on Economic Science, 1932)',
      'Paul Samuelson (Dynamic Growth & Time Dimension Definition — Economics, 1948)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The historical sequence of economic definitions: Adam Smith (1776) → Alfred Marshall (1890) → Lionel Robbins (1932) → Paul Samuelson (1948).',
    hints: [
      'Smith wrote in 1776 during the early Industrial Revolution.',
      'Marshall came in 1890 focusing on material requisites of well-being.',
      'Robbins formulated scarcity in 1932, and Samuelson added dynamic growth in 1948.',
    ],
  },
  {
    id: 'ch_010_samuelson_time_dim',
    nodeId: NODE_C9_ECON_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does Paul Samuelson\'s definition improve upon Lionel Robbins\' scarcity framework?',
    options: [
      'Samuelson eliminated scarcity and assumed all resources are infinitely abundant.',
      'Samuelson made economics purely static and focused exclusively on barter economies.',
      'Samuelson retained scarcity and choice but added production, distribution, and the dynamic time dimension (growth over present and future).',
      'Samuelson argued that only agricultural commodities count as national income.',
    ],
    correctIndex: 2,
    explanation: 'Samuelson synthesised prior thought by keeping Robbins\' scarcity and choice, but incorporating production, distribution, consumption, and the crucial element of growth over time (present vs future).',
    hints: [
      'Does society\'s resource base stay fixed forever, or does it expand through technology and investment?',
      'Samuelson added the time dimension: how today\'s choices expand future possibilities.',
      'Look for the synthesis of scarcity, production, distribution, and future growth.',
    ],
  },
  {
    id: 'ch_011_utility_types_app',
    nodeId: NODE_C9_ECON_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A logistics firm transports fresh Kashmiri apples to Chennai markets in October, while a cold-storage facility in Nashik preserves onions harvested in March for release during the November festival season. What types of utility were created respectively?',
    options: [
      'Form utility in Kashmir; Service utility in Nashik',
      'Place utility by transport to Chennai; Time utility by cold storage in Nashik',
      'Service utility by transport; Natural utility by storage',
      'Time utility by transport; Form utility by cold storage',
    ],
    correctIndex: 1,
    explanation: 'Moving goods from where they are abundant to where they are scarce creates Place Utility. Storing goods from harvest time to off-season creates Time Utility.',
    hints: [
      'Transporting across geography creates which utility? Place utility.',
      'Preserving across seasons from March to November creates which utility? Time utility.',
      'The pair is Place utility and Time utility.',
    ],
  },
  {
    id: 'ch_012_water_diamond_paradox',
    nodeId: NODE_C9_ECON_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Mumbai, 1,000 litres of tap water costs ₹15, while a 1-carat diamond sells for ₹4,00,000. How does economic science resolve this famous Water-Diamond Paradox?',
    options: [
      'Water has zero economic value because it falls freely from clouds.',
      'Water has immense Value-in-Use (essential for life) but low Value-in-Exchange (due to abundance); Diamonds have low Value-in-Use but high Value-in-Exchange (due to extreme scarcity).',
      'Diamonds possess greater life-sustaining utility than water under Indian law.',
      'Price always equals Value-in-Use under all market conditions.',
    ],
    correctIndex: 1,
    explanation: 'The paradox highlights the distinction between Value-in-Use (usefulness) and Value-in-Exchange (market price). Abundant water has high use-value but low exchange-value; scarce diamonds have low use-value but high exchange-value.',
    hints: [
      'Think about whether you can survive without diamonds vs without water.',
      'Value-in-use is usefulness; Value-in-exchange is what it commands in trade.',
      'Abundance lowers exchange price; extreme scarcity drives it up.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_013_macro_fallacy_thrift',
    nodeId: NODE_C9_ECON_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'If one household in Jaipur increases its monthly savings, it becomes financially secure. But if EVERY household in India simultaneously doubles its savings and stops buying goods, aggregate demand collapses, businesses shut down, and national income falls. This phenomenon illustrates:',
    options: [
      'The law of diminishing marginal utility',
      'The Fallacy of Composition (Paradox of Thrift)',
      'Adam Smith\'s invisible hand theorem',
      'Marshall\'s definition of non-economic civic duty',
    ],
    correctIndex: 1,
    explanation: 'The Paradox of Thrift exemplifies the Fallacy of Composition: what is advantageous for a single micro unit can be disastrous if practiced by all macro units simultaneously.',
    hints: [
      'What is true for one part is not necessarily true for the entire aggregate.',
      'This paradox was famously explained by John Maynard Keynes.',
      'It is known as the Fallacy of Composition or Paradox of Thrift.',
    ],
  },
  {
    id: 'ch_014_unpaid_care_gdp',
    nodeId: NODE_C9_ECON_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'According to the NSO Time Use Survey 2019, Indian women spend ~5.8 hours daily on unpaid household care work (cooking, eldercare). Why is this massive productive effort excluded from India\'s official GDP calculation?',
    options: [
      'Because household work generates zero human satisfaction or welfare.',
      'Because it is performed without a market transaction and lacks a direct monetary motive/price, classifying it as non-economic activity in national accounts.',
      'Because the Indian Constitution explicitly bans counting domestic labour in statistics.',
      'Because Adam Smith proved only foreign exports count toward national product.',
    ],
    correctIndex: 1,
    explanation: 'National income accounting includes only economic activities with market monetary transactions. Unpaid domestic care is performed out of family duty/love (non-economic) and lacks a market price tag.',
    hints: [
      'Is there a monetary wage paid when a mother cares for her own family?',
      'GDP only records transactions where money exchanges hands in the market.',
      'Without market exchange or monetary motive, it is excluded from GDP.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_015_stock_vs_flow_math',
    nodeId: NODE_C9_ECON_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A retired professor in Kolkata owns an ancestral home worth ₹1.8 crore on 31st March 2025, and receives a monthly pension of ₹35,000. How are these two values classified in economic terms?',
    options: [
      'Both are economic flows measured over an annual duration.',
      'The ₹1.8 crore house is a Stock (Wealth at a point in time); the ₹35,000 pension is a Flow (Income over a period of time).',
      'The house is a Flow of utility; the pension is a non-economic Stock.',
      'Both are capital factors receiving rent as their sole factor reward.',
    ],
    correctIndex: 1,
    explanation: 'Wealth is a stock variable measured at a specific point in time (as of 31 March). Income is a flow variable measured over a duration of time (per month or year).',
    hints: [
      'Is wealth a snapshot at a single moment or a flow over a duration?',
      'The house value is an asset stock at a date; the pension is a recurring monthly flow.',
      'Stock = at a point in time; Flow = over a period.',
    ],
    misconceptionIndex: 6,
  },

  // Tier 3: Advanced (8 challenges)
  {
    id: 'ch_016_budget_opportunity_cost',
    nodeId: NODE_C9_ECON_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In the Union Budget, the Finance Minister allocates ₹6.21 lakh crore to Defence. Applying Lionel Robbins\' scarcity framework, what constitutes the "Opportunity Cost" of this expenditure?',
    options: [
      'The total interest paid to the Reserve Bank of India on past borrowings',
      'The alternative public goods (such as world-class hospitals, schools, and highways) that could have been funded with that same ₹6.21 lakh crore',
      'The physical gold stored in the vaults of the central bank',
      'The total salary paid to soldiers during the financial year',
    ],
    correctIndex: 1,
    explanation: 'Opportunity cost is the value of the next best alternative foregone. When ₹6.21 lakh crore is spent on defence, the opportunity cost is the schools, healthcare, or infrastructure not built.',
    hints: [
      'What did the nation give up to secure defence funding?',
      'Opportunity cost is always the next best alternative sacrificed.',
      'The foregone schools and healthcare represent the opportunity cost.',
    ],
  },
  {
    id: 'ch_017_disposable_income_calc',
    nodeId: NODE_C9_ECON_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Dr. Anita in Bengaluru earns ₹1,50,000/month from clinic fees and ₹30,000/month from commercial property rent. She pays ₹35,000/month in income tax and spends ₹95,000/month on household consumption. Calculate her Annual Savings in Lakhs of Rupees (₹ Lakhs).',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: 'Lakhs',
    explanation: 'Total Income Y = 1,50,000 + 30,000 = ₹1,80,000. Disposable Income = Y - T = 1,80,000 - 35,000 = ₹1,45,000. Monthly Saving S = 1,45,000 - 95,000 = ₹50,000. Annual Saving = ₹50,000 × 12 = ₹6,00,000 = 6 Lakhs.',
    hints: [
      'Find Total Monthly Income: 150000 + 30000 = 180000.',
      'Calculate Disposable Income by subtracting Tax: 180000 - 35000 = 145000.',
      'Monthly Saving = 145000 - 95000 = 50000. Multiply by 12 to get annual saving in Lakhs.',
    ],
  },
  {
    id: 'ch_018_construct_economic_chain',
    nodeId: NODE_C9_ECON_008,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the complete cyclical chain of economic activity from initial human need to the regeneration of resources.',
    availableParts: ['Wants', 'Production (Adds Utility)', 'Markets & Exchange', 'Consumption (Destroys Utility)', 'Factor Incomes'],
    targetState: 'Wants Production (Adds Utility) Markets & Exchange Consumption (Destroys Utility) Factor Incomes',
    validationHint: 'Click all 5 steps in correct sequential order.',
    explanation: 'The fundamental economic cycle: Human Wants drive Production (adding utility), goods flow through Markets & Exchange, Consumption satisfies wants by destroying utility, generating Factor Incomes to begin the cycle anew.',
    hints: [
      'Start with the origin of all activity: Wants.',
      'Follow with the creation of utility (Production) and then its trade in Markets.',
      'End with Consumption and resulting Factor Incomes.',
    ],
  },
  {
    id: 'ch_019_mgnrega_policy_eval',
    nodeId: NODE_C9_ECON_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When the MGNREGA scheme provides 100 days of guaranteed wage work (₹267/day) to rural workers previously performing unpaid farm chores, how does this affect India\'s measured GDP and national welfare?',
    options: [
      'GDP declines because government spending is non-economic waste.',
      'Measured GDP increases because previously unpaid labour is converted into monetised wage employment, while rural household purchasing power and welfare expand.',
      'GDP remains strictly unchanged because only factory manufactured goods count toward GDP.',
      'It converts economic activities into non-economic volunteer work.',
    ],
    correctIndex: 1,
    explanation: 'MGNREGA monetises previously unpaid labour into formal wage employment. This adds measurable monetary value to GDP and enhances rural living standards and material well-being.',
    hints: [
      'Does paying a daily wage convert unpaid work into a market transaction?',
      'When money is paid for labour, it enters GDP as compensation of employees.',
      'Both measured GDP and rural welfare increase.',
    ],
  },
  {
    id: 'ch_020_wealth_characteristics_eval',
    nodeId: NODE_C9_ECON_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does an illegal stolen luxury car worth ₹50 lakh FAIL to qualify as "Wealth" in formal economic theory, despite having utility, scarcity, and a high black-market price?',
    options: [
      'Because luxury cars produce zero utility in city traffic.',
      'Because it lacks legal transferability of legitimate ownership rights in open markets.',
      'Because only gold held by the Reserve Bank of India counts as wealth.',
      'Because stolen goods automatically lose their physical form utility.',
    ],
    correctIndex: 1,
    explanation: 'Wealth requires all four characteristics: Utility, Scarcity, Transferability (legal right of transfer), and Value in money. A stolen asset lacks legal transferability of property rights.',
    hints: [
      'Can the thief legally transfer genuine property title to a buyer in a registered court?',
      'All 4 criteria must hold: Utility, Scarcity, Legal Transferability, and Money Value.',
      'Legal transferability is violated.',
    ],
  },
  {
    id: 'ch_021_green_revolution_samuelson',
    nodeId: NODE_C9_ECON_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'India\'s Green Revolution (1965-70) increased national wheat output from 11 million tonnes to over 110 million tonnes by 2023. Why is this best analyzed using Paul Samuelson\'s definition rather than Lionel Robbins\' static framework?',
    options: [
      'Because Robbins completely rejected the existence of agriculture.',
      'Because Robbins only analyzed allocating a fixed stock of resources today, whereas Samuelson incorporates technological investment that expands the productive capacity and resource base over time.',
      'Because Samuelson argued that high-yield seeds are free gifts of nature requiring no capital.',
      'Because the Green Revolution was an entirely non-economic spiritual movement.',
    ],
    correctIndex: 1,
    explanation: 'Robbins\' framework is static (allocating fixed resources). Samuelson\'s dynamic growth framework captures how investments in HYV technology, irrigation, and capital expand the entire production possibility frontier over decades.',
    hints: [
      'Did India merely reallocate existing land, or did it multiply output per acre through technological growth?',
      'Samuelson specifically added the dynamic time dimension of expanding resources.',
      'Static allocation vs dynamic long-term growth is the key distinction.',
    ],
  },
  {
    id: 'ch_022_money_not_factor',
    nodeId: NODE_C9_ECON_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why do economists strictly reject the claim that "Money" is a fifth Factor of Production?',
    options: [
      'Because money has no value in international trade.',
      'Because money is merely a financial claim and medium of exchange; physical banknotes cannot directly produce goods unless converted into real capital (machines, tools, buildings).',
      'Because only land and labour existed during Adam Smith\'s lifetime.',
      'Because money is classified exclusively as a non-economic civic service.',
    ],
    correctIndex: 1,
    explanation: 'Financial capital (money) facilitates transactions, but real physical capital (plant, machinery, tools) is the actual factor that combines with labour and land to produce utility.',
    hints: [
      'Can a pile of ₹500 notes sitting on a field sow wheat or weave cloth by itself?',
      'Money buys capital goods, but money itself is not a physical means of production.',
      'Real capital produces goods; money is only a financial medium of exchange.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_023_free_vs_econ_water_chennai',
    nodeId: NODE_C9_ECON_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During the 2019 Chennai "Day Zero" water crisis, tanker water sold for ₹2,000 per load. What fundamental economic shift occurred?',
    options: [
      'Water changed from a consumer good to a non-economic luxury good.',
      'Water shifted from being an abundant Free Good (gift of nature) into a scarce Economic Good requiring human extraction effort and commanding a market price.',
      'Water permanently lost all of its Value-in-Use.',
      'The government declared water to be a capital factor earning interest.',
    ],
    correctIndex: 1,
    explanation: 'When a natural resource becomes scarce and requires human labour, capital transport, and price rationing, it transforms from a free gift of nature into an economic good.',
    hints: [
      'Free goods require zero cost/effort; economic goods involve cost, scarcity, and effort.',
      'Scarcity and transport costs forced consumers to pay a market price.',
      'Free good transformed into an economic good.',
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
  nodeId: NODE_C9_ECON_001,
  title: 'Foundations of Economics: Definitions, Scope & Core Terminology',
  definition: 'Economics is the social science studying how individuals and societies allocate scarce productive resources across time to produce, distribute, and consume goods and services for human well-being and growth.',
  eli5: 'Economics is the science of making smart choices when you cannot have everything at once. From Adam Smith’s factories to modern nation-building budgets, it explains how we create goods, earn incomes, and build a prosperous future.',
  misconceptions: [
    {
      misconception: 'Adam Smith\'s "wealth" means piles of cash and gold coins.',
      correction: 'Smith meant the actual stock of useful material goods produced (wheat, steel, cloth), not paper currency.',
    },
    {
      misconception: 'Alfred Marshall included all forms of happiness, like friendship and peace of mind.',
      correction: 'Marshall restricted economics to material welfare — well-being derived from measurable goods and services.',
    },
    {
      misconception: 'Scarcity only affects poor families, while billionaires like Mukesh Ambani face zero scarcity.',
      correction: 'Scarcity is universal; even billionaires and nation-states face finite capital, time, and competing investment priorities.',
    },
    {
      misconception: 'A mother cooking at home is an economic activity because delicious food is produced.',
      correction: 'The test is the MOTIVE. Home cooking is done out of love and duty (non-economic); cooking in a restaurant for salary is economic.',
    },
    {
      misconception: 'Tata Motors is macroeconomics because it is a multi-billion rupee corporation.',
      correction: 'The test is individual unit vs whole economy. Tata Motors is a single firm, so studying its pricing or sales is microeconomics.',
    },
    {
      misconception: 'Price and value are always identical.',
      correction: 'Value-in-use (usefulness) and value-in-exchange (market price) often diverge, as shown in the Water-Diamond paradox.',
    },
    {
      misconception: 'A person who owns a large ancestral mansion must have a high income.',
      correction: 'A house is wealth (a stock at a point in time), whereas income is a flow earned over a period. A retired person can have high wealth but low income.',
    },
    {
      misconception: 'Money is a fifth factor of production alongside land, labour, capital, and entrepreneurship.',
      correction: 'Money is a medium of exchange that buys real capital. Banknotes themselves do not weave cloth or sow wheat.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Who is regarded as the Father of Modern Economics?', options: ['Alfred Marshall', 'Adam Smith', 'Lionel Robbins', 'Paul Samuelson'], correctIndex: 1 },
    { question: 'What is the central focus of Robbins\' 1932 definition?', options: ['Material wealth only', 'Scarcity and choice', 'Spiritual welfare', 'Labour unions'], correctIndex: 1 },
    { question: 'Which branch of economics studies the national CPI inflation rate?', options: ['Microeconomics', 'Macroeconomics', 'Non-economic analysis', 'Partial equilibrium'], correctIndex: 1 },
    { question: 'What is the reward earned by Land in production?', options: ['Wages', 'Interest', 'Rent', 'Profit'], correctIndex: 2 },
    { question: 'Which of the following is an intangible service?', options: ['A Maruti Swift car', 'A 5 kg bag of rice', 'A doctor\'s consultation', 'A gold necklace'], correctIndex: 2 },
    { question: 'What is the formula for household saving?', options: ['S = Y + C', 'S = Y - C', 'S = C - Y', 'S = Y × C'], correctIndex: 1 },
    { question: 'Which economist introduced the dynamic time dimension and economic growth?', options: ['Adam Smith', 'Thomas Carlyle', 'Paul Samuelson', 'Dadabhai Naoroji'], correctIndex: 2 },
    { question: 'Is unpaid eldercare at home included in official GDP?', options: ['Yes, always', 'No, because it lacks a market transaction', 'Only in urban metros', 'Only if done by men'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student understands the 4 classical definitions (Smith, Marshall, Robbins, Samuelson), can distinguish micro/macro and economic/non-economic activities, and masters the 10 basic economic terms.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Four Definitions Spectrum',
    instruction: 'Click each economist on the timeline to inspect their core definition, focus, and historical correction.',
    interactionType: 'click-timeline',
    nodeId: NODE_C9_ECON_001,
  },
  {
    title: '2. Micro vs Macro Lens',
    instruction: 'Toggle between the Micro Microscope (individual firms & markets) and the Macro Telescope (national GDP & inflation).',
    interactionType: 'lens-toggle',
    nodeId: NODE_C9_ECON_005,
  },
  {
    title: '3. Economic Motive Classifier',
    instruction: 'Adjust the compensation and motive sliders to observe when an activity shifts between Economic and Non-Economic.',
    interactionType: 'motive-slider',
    nodeId: NODE_C9_ECON_006,
  },
  {
    title: '4. The Water-Diamond Paradox Lab',
    instruction: 'Manipulate the scarcity and essentiality sliders to see how Value-in-Use and Value-in-Exchange separate.',
    interactionType: 'paradox-lab',
    nodeId: NODE_C9_ECON_010,
  },
  {
    title: '5. Bharatnagar Factor Market & Circular Flow',
    instruction: 'Allocate land, labour, and capital inputs to generate output, distribute factor rewards, and balance household savings.',
    interactionType: 'factor-allocator',
    nodeId: NODE_C9_ECON_009,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an economy experiences a massive surge in the production of high-tech capital goods while keeping consumer goods constant, what happens to its future Production Possibility over the next 10 years?',
    options: [
      'Future production capacity shrinks because machines cannot be eaten.',
      'Future production capacity expands significantly because capital investments compound productivity (Samuelson’s Growth Dimension).',
      'Future output stays strictly unchanged under all economic laws.',
      'Scarcity permanently disappears for all citizens.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Capital Investment slider in the simulation to +40% and watch the projected 10-year GDP growth line curve upward.',
    nodeId: NODE_C9_ECON_004,
  },
  {
    question: 'Predict: In a severe drought, what will happen to the market price (Value-in-Exchange) of clean drinking water in a private tanker market?',
    options: [
      'Price will drop to ₹0 because water is a natural necessity.',
      'Price will skyrocket because extreme scarcity forces intense competitive bidding among buyers.',
      'Price will equal diamond prices automatically under Smith’s rule.',
      'Value-in-use will drop to zero.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Water Scarcity slider to 90% and observe the equilibrium exchange price spike.',
    nodeId: NODE_C9_ECON_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between Value-in-Use and Value-in-Exchange as a commodity becomes extremely abundant (like air or river water)?',
    observableOptions: [
      'Value-in-use stays high, but Value-in-exchange drops toward zero.',
      'Both value-in-use and value-in-exchange rise to infinity.',
      'Value-in-use collapses completely.',
      'Abundance creates higher prices for consumers.',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_ECON_010,
  },
  {
    question: 'When you increase the monthly savings rate of Bharatnagar households in the simulation while holding income constant, what immediately happens to Current Consumption (C)?',
    observableOptions: [
      'Current Consumption increases simultaneously.',
      'Current Consumption decreases dollar-for-dollar (since S = Y - C).',
      'Income automatically doubles.',
      'Factor rewards for land turn into wages.',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_ECON_010,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'District Economic Blueprint: Bharatnagar 2030',
  description: 'Apply the 4 definitions and basic terms to your hometown. Identify 2 tangible goods produced locally, 2 essential services, 1 microeconomic pricing decision, and 1 macroeconomic policy that affects your community.',
  steps: [
    'Identify a local manufacturer or farm (Adam Smith’s material wealth)',
    'Document a local welfare initiative like Mid-Day Meals or Ayushman Bharat (Alfred Marshall’s welfare requisites)',
    'Analyze a scarcity trade-off made by your local municipality (Lionel Robbins’ opportunity cost)',
    'Draft a 5-year capital investment recommendation to expand future capacity (Paul Samuelson’s growth dimension)',
  ],
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: EVOLUTION OF DEFINITIONS TIMELINE ───
function DefinitionsTimelineSVG({ selected, onSelect }: { selected: string; onSelect: (key: string) => void }) {
  const nodes = [
    { key: 'smith', label: '1776: Adam Smith', subtitle: 'Wealth Definition', color: '#6366f1', x: 65, y: 55 },
    { key: 'marshall', label: '1890: Marshall', subtitle: 'Welfare Definition', color: '#3b82f6', x: 225, y: 55 },
    { key: 'robbins', label: '1932: Robbins', subtitle: 'Scarcity & Choice', color: '#f59e0b', x: 385, y: 55 },
    { key: 'samuelson', label: '1948: Samuelson', subtitle: 'Growth & Time', color: '#10b981', x: 545, y: 55 },
  ];

  return (
    <svg viewBox="0 0 610 110" className="w-full h-auto bg-slate-950 rounded-2xl border border-slate-800 p-2 shadow-inner">
      <defs>
        <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="33%" stopColor="#3b82f6" />
          <stop offset="66%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      {/* Connecting Axis */}
      <line x1="65" y1="55" x2="545" y2="55" stroke="url(#timelineGrad)" strokeWidth="4" strokeDasharray="6 3" />
      {nodes.map(n => {
        const isSel = selected === n.key;
        return (
          <g key={n.key} onClick={() => onSelect(n.key)} className="cursor-pointer group">
            <circle
              cx={n.x}
              cy={n.y}
              r={isSel ? 20 : 14}
              fill={isSel ? n.color : '#1e293b'}
              stroke={n.color}
              strokeWidth={isSel ? 4 : 2}
              className="transition-all duration-200 group-hover:scale-110"
            />
            {isSel && (
              <circle cx={n.x} cy={n.y} r={8} fill="#ffffff" />
            )}
            <text x={n.x} y={n.y - 25} textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
              {n.label}
            </text>
            <text x={n.x} y={n.y + 32} textAnchor="middle" fill={isSel ? n.color : '#94a3b8'} fontSize="10" fontWeight="600">
              {n.subtitle}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 2: WATER-DIAMOND PARADOX BALANCE SCALE ───
function WaterDiamondScaleSVG({ waterScarcity, diamondScarcity }: { waterScarcity: number; diamondScarcity: number }) {
  const waterExchangePrice = (waterScarcity * 20);
  const diamondExchangePrice = (diamondScarcity * 5000);

  return (
    <svg viewBox="0 0 500 160" className="w-full h-auto bg-slate-950 rounded-2xl border border-slate-800 p-2">
      {/* Water Column */}
      <g transform="translate(60, 20)">
        <rect x="0" y="0" width="160" height="120" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="80" y="24" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">💧 Clean Water</text>
        <text x="15" y="50" fill="#94a3b8" fontSize="10">Value-in-Use (Utility):</text>
        <rect x="15" y="56" width="130" height="8" rx="4" fill="#334155" />
        <rect x="15" y="56" width="130" height="8" rx="4" fill="#10b981" />
        <text x="15" y="85" fill="#94a3b8" fontSize="10">Value-in-Exchange (Price):</text>
        <rect x="15" y="91" width="130" height="8" rx="4" fill="#334155" />
        <rect x="15" y="91" width={Math.max(8, (waterScarcity / 100) * 130)} height="8" rx="4" fill="#38bdf8" />
        <text x="80" y="112" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">Price: ₹{waterExchangePrice}/tanker</text>
      </g>

      {/* Center Paradox Symbol */}
      <g transform="translate(250, 75)">
        <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">VS</text>
      </g>

      {/* Diamond Column */}
      <g transform="translate(280, 20)">
        <rect x="0" y="0" width="160" height="120" rx="12" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="80" y="24" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">💎 Diamond</text>
        <text x="15" y="50" fill="#94a3b8" fontSize="10">Value-in-Use (Utility):</text>
        <rect x="15" y="56" width="130" height="8" rx="4" fill="#334155" />
        <rect x="15" y="56" width="18" height="8" rx="4" fill="#f43f5e" />
        <text x="15" y="85" fill="#94a3b8" fontSize="10">Value-in-Exchange (Price):</text>
        <rect x="15" y="91" width="130" height="8" rx="4" fill="#334155" />
        <rect x="15" y="91" width={Math.max(15, (diamondScarcity / 100) * 130)} height="8" rx="4" fill="#fbbf24" />
        <text x="80" y="112" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">Price: ₹{diamondExchangePrice.toLocaleString()}</text>
      </g>
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: CIRCULAR FLOW OF FACTORS & REWARDS ───
function CircularFlowSVG() {
  return (
    <svg viewBox="0 0 540 180" className="w-full h-auto bg-slate-950 rounded-2xl border border-slate-800 p-2 shadow-inner">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
        <marker id="arrowBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
        </marker>
      </defs>

      {/* Households Node */}
      <rect x="20" y="50" width="120" height="80" rx="12" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
      <text x="80" y="85" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">🏠 Households</text>
      <text x="80" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Supply Factors</text>

      {/* Firms Node */}
      <rect x="400" y="50" width="120" height="80" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
      <text x="460" y="85" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">🏭 Business Firms</text>
      <text x="460" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Produce Goods</text>

      {/* Top Arc: Real Flow (Factor Services & Goods) */}
      <path d="M 140 65 C 240 20, 300 20, 400 65" fill="none" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowBlue)" />
      <text x="270" y="32" textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="bold">
        Factor Services (Land, Labour, Capital, Org) ➔
      </text>

      {/* Bottom Arc: Money Flow (Factor Rewards & Consumption Spend) */}
      <path d="M 400 115 C 300 160, 240 160, 140 115" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="270" y="160" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
        Factor Rewards (Rent, Wages, Interest, Profit) ➔
      </text>
    </svg>
  );
}

// ─── MAIN COMPONENT ───
function C9_EconomicsDefinitionEconomicsAdamSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Brilliant.org Interaction State
  const [selectedEconomist, setSelectedEconomist] = useState<string>('smith');
  const [activeLens, setActiveLens] = useState<'micro' | 'macro'>('micro');
  const [motiveSalary, setMotiveSalary] = useState<number>(30000);
  const [motiveAffection, setMotiveAffection] = useState<number>(20);
  const [waterScarcity, setWaterScarcity] = useState<number>(20);
  const [diamondScarcity, setDiamondScarcity] = useState<number>(95);
  const [capitalInvestment, setCapitalInvestment] = useState<number>(25);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);

  // Adaptive BKT & Mastery
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Hint & Answer Reveal State
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Drag & Sort & Numeric & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Feedback Animations
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Simulation parameters for Bharatnagar District
  const [districtWorkers, setDistrictWorkers] = useState<number>(2000);
  const [districtLandAcres, setDistrictLandAcres] = useState<number>(500);
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState<number>(60000);
  const [monthlySpendInput, setMonthlySpendInput] = useState<number>(42000);

  // BKT Ref
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

  // Motivational feedback based on errors
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── INITIAL LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C9_ECON_001);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── LIVE CALCULATIONS FOR BHARATNAGAR SIMULATION ───
  const calculatedOutput = useMemo(() => {
    return Math.round(districtWorkers * 1.5 + districtLandAcres * 3.2 + capitalInvestment * 45);
  }, [districtWorkers, districtLandAcres, capitalInvestment]);

  const calculatedSavings = useMemo(() => {
    return Math.max(0, monthlyIncomeInput - monthlySpendInput);
  }, [monthlyIncomeInput, monthlySpendInput]);

  const calculatedSavingsRate = useMemo(() => {
    if (monthlyIncomeInput <= 0) return 0;
    return Math.round((calculatedSavings / monthlyIncomeInput) * 100);
  }, [calculatedSavings, monthlyIncomeInput]);

  // Time series projection for Samuelson Growth (Recharts data)
  const growthProjectionData = useMemo(() => {
    const baseOutput = calculatedOutput;
    const rate = 1 + (capitalInvestment * 0.003);
    const data = [];
    for (let yr = 0; yr <= 10; yr++) {
      data.push({
        year: `Year ${yr}`,
        output: Math.round(baseOutput * Math.pow(rate, yr)),
        staticOutput: Math.round(baseOutput * (1 + yr * 0.02)),
      });
    }
    return data;
  }, [calculatedOutput, capitalInvestment]);

  // ─── 2D CANVAS ANIMATION (CIRCULAR FLOW OF INCOME) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let particleOffset = 0;

    const render = () => {
      particleOffset = (particleOffset + 1.2) % 400;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background circuit
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.strokeRect(30, 20, canvas.width - 60, canvas.height - 40);

      // Draw particle representing factor services / money flow
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;

      let px = 30;
      let py = 20;
      const w = canvas.width - 60;
      const h = canvas.height - 40;
      const totalPerimeter = 2 * (w + h);
      const pos = (particleOffset / 400) * totalPerimeter;

      if (pos < w) {
        px = 30 + pos;
        py = 20;
      } else if (pos < w + h) {
        px = 30 + w;
        py = 20 + (pos - w);
      } else if (pos < 2 * w + h) {
        px = 30 + w - (pos - (w + h));
        py = 20 + h;
      } else {
        px = 30;
        py = 20 + h - (pos - (2 * w + h));
      }

      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      // Flow label
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText('Goods & Services Flow ➔ Factor Incomes', 45, canvas.height / 2 + 3);

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // ─── USECALLBACK HANDLERS ───
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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb! Adam Smith focused on tangible material wealth.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the 4 definitions and core economic principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Bharatnagar Economic Sandbox. Feel free to experiment!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting the economics mastery challenges. Good luck!');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test it using the simulator controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! Value in use and exchange operate differently.' : 'Examine the curves closely.');
  }, []);

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
      let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered the foundations of Economics.');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
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
        speechManager.speak('Let us review the complete economic rationale.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleEconomistSelect = useCallback((econKey: string) => {
    setSelectedEconomist(econKey);
    audioManager.play('tap');
  }, []);

  const handleLensToggle = useCallback((lens: 'micro' | 'macro') => {
    setActiveLens(lens);
    audioManager.play('pop');
  }, []);

  const handleConstructAdd = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleConstructRemove = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, idx) => idx !== index));
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── ECONOMISTS DATA ───
  const economistsData: Record<string, { name: string; year: string; book: string; title: string; desc: string; example: string; critique: string }> = {
    smith: {
      name: 'Adam Smith',
      year: '1776',
      book: 'Wealth of Nations',
      title: 'Wealth Definition',
      desc: 'Economics is the science of wealth. It studies the nature and causes of material goods produced by human labour and exchanged in markets.',
      example: 'Punjab wheat harvested or Tata Steel fabricated at Jamshedpur.',
      critique: 'Materialistic & narrow: excluded human welfare and vital services like doctors, nurses, and teachers.',
    },
    marshall: {
      name: 'Alfred Marshall',
      year: '1890',
      book: 'Principles of Economics',
      title: 'Welfare Definition',
      desc: 'Economics is a study of mankind in the ordinary business of life; it examines the attainment and use of the material requisites of well-being.',
      example: 'Tamil Nadu Mid-Day Meal Scheme nourishing school children.',
      critique: 'Restricted only to material welfare measurable in money; welfare is subjective and difficult to quantify.',
    },
    robbins: {
      name: 'Lionel Robbins',
      year: '1932',
      book: 'Nature & Significance of Economic Science',
      title: 'Scarcity & Choice Definition',
      desc: 'Economics is the science which studies human behaviour as a relationship between unlimited ends and scarce means which have alternative uses.',
      example: 'Union Budget allocating ₹48 lakh crore between Defence, Education, and Healthcare.',
      critique: 'Static framework: ignored dynamic economic growth, inequality, and policy guidance for developing nations.',
    },
    samuelson: {
      name: 'Paul Samuelson',
      year: '1948',
      book: 'Economics: An Introductory Analysis',
      title: 'Growth-Based Dynamic Definition',
      desc: 'Economics studies how people and society choose to use scarce resources to produce commodities over time and distribute them for consumption — now and in the future.',
      example: 'India’s 1991 LPG reforms and investments in Delhi Metro to expand future economic capacity.',
      critique: 'Emphasised continuous growth which may raise sustainability and natural resource depletion concerns.',
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                ICSE Class 9 Commercial Studies & Economics
              </span>
              <span className="text-xs text-slate-400">Nodes 001 - 010</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Difficulty Badge & Score HUD */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
            Mastery: <span className="text-emerald-400 font-bold">{masteryLevel}</span>
          </div>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wide mb-2">
              <span>🏛️</span> Narrative Scenario Hook
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 bg-indigo-900/40 p-3 rounded-xl border border-indigo-700/50">
              📌 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>🤔</span> Initial Curiosity Hook (Ungraded)
            </div>
            <p className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                      : 'bg-slate-800 border-slate-700 hover:border-indigo-500 hover:bg-slate-750 text-slate-200'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-sm border mt-4 flex flex-col md:flex-row items-center justify-between gap-4 ${
                  discoveryCorrect
                    ? 'bg-emerald-950/70 border-emerald-700 text-emerald-300'
                    : 'bg-amber-950/70 border-amber-700 text-amber-300'
                }`}
              >
                <div>
                  <p className="font-bold">{discoveryCorrect ? '✓ Exact Insight!' : '💡 Discover Why:'}</p>
                  <p className="text-xs mt-1 text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm whitespace-nowrap shadow-lg shadow-indigo-600/30"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Navigation Pill */}
          <div className="flex items-center justify-between bg-slate-800/60 p-2 rounded-2xl border border-slate-700">
            <div className="flex gap-1.5 overflow-x-auto py-1 px-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    currentSlide === idx
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}. {step.title.split('.')[1] || step.title}
                </motion.button>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400 px-3">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Concept Lab {currentSlide + 1}
                </div>
                <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-sm mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── LAB 1: FOUR DEFINITIONS SPECTRUM ── */}
              {currentSlide === 0 && (
                <div className="space-y-4 pt-2">
                  {/* TOPIC-SPECIFIC SVG DIAGRAM 1: DEFINITIONS TIMELINE */}
                  <DefinitionsTimelineSVG selected={selectedEconomist} onSelect={handleEconomistSelect} />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.keys(economistsData).map(key => {
                      const econ = economistsData[key];
                      const isSel = selectedEconomist === key;
                      return (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleEconomistSelect(key)}
                          className={`p-3.5 rounded-xl text-left border transition-all ${
                            isSel
                              ? 'bg-indigo-900/60 border-indigo-500 shadow-md shadow-indigo-900/40'
                              : 'bg-slate-900/80 border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          <div className="text-xs font-mono text-indigo-400 font-bold">{econ.year}</div>
                          <div className="text-sm font-black text-white">{econ.name}</div>
                          <div className="text-xs text-slate-400 truncate">{econ.title}</div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.div
                    key={selectedEconomist}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-lg font-bold text-indigo-300">
                        {economistsData[selectedEconomist].name} — {economistsData[selectedEconomist].title} ({economistsData[selectedEconomist].year})
                      </h4>
                      <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded-md">
                        Book: {economistsData[selectedEconomist].book}
                      </span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-serif italic border-l-2 border-indigo-500 pl-3">
                      &quot;{economistsData[selectedEconomist].desc}&quot;
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="font-bold text-emerald-400 block mb-1">🇮🇳 Real Indian Example:</span>
                        <span className="text-slate-300">{economistsData[selectedEconomist].example}</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="font-bold text-rose-400 block mb-1">⚠️ Major Criticism / Limitation:</span>
                        <span className="text-slate-300">{economistsData[selectedEconomist].critique}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ── LAB 2: MICRO VS MACRO LENS ── */}
              {currentSlide === 1 && (
                <div className="space-y-4 pt-2">
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLensToggle('micro')}
                      className={`flex-1 p-3 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 ${
                        activeLens === 'micro'
                          ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-md'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span>🔬</span> Microeconomics (Individual Units)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLensToggle('macro')}
                      className={`flex-1 p-3 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 ${
                        activeLens === 'macro'
                          ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 shadow-md'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span>🔭</span> Macroeconomics (Whole Economy)
                    </motion.button>
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                    {activeLens === 'micro' ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-blue-400 font-bold">
                          <span>Focus: Price Theory & Partial Equilibrium</span>
                          <span>Unit: Single Consumer / Firm / Mandi</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                            <span className="font-bold text-white block mb-1">🍅 Azadpur Mandi Tomato Price</span>
                            <span className="text-slate-400">Wholesale price determined by daily truck arrivals vs local Delhi demand.</span>
                          </div>
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                            <span className="font-bold text-white block mb-1">📱 Reliance Jio ₹299 Tariff</span>
                            <span className="text-slate-400">Single firm setting prepaid plan price to compete with Airtel in telecom market.</span>
                          </div>
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                            <span className="font-bold text-white block mb-1">🌾 Gujarat Farmer BT Cotton</span>
                            <span className="text-slate-400">Individual farmer deciding whether to plant cotton or groundnut after price drop.</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                          <span>Focus: Income Theory & General Equilibrium</span>
                          <span>Unit: Aggregate National Variables</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                            <span className="font-bold text-white block mb-1">🇮🇳 India GDP 8.2% Growth</span>
                            <span className="text-slate-400">Total economic output of 140 crore citizens across all agriculture, industry & services.</span>
                          </div>
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                            <span className="font-bold text-white block mb-1">🏦 RBI Repo Rate 6.5%</span>
                            <span className="text-slate-400">Monetary policy lever controlling total money supply & credit for all commercial banks.</span>
                          </div>
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                            <span className="font-bold text-white block mb-1">📊 National CPI Inflation 5.4%</span>
                            <span className="text-slate-400">Average change in the general price level across all consumer goods basket.</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 3: ECONOMIC VS NON-ECONOMIC MOTIVE CLASSIFIER ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-emerald-400">Monetary Compensation (Salary / Price):</span>
                        <span className="font-mono text-white">₹{motiveSalary.toLocaleString()}/mo</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100000}
                        step={5000}
                        value={motiveSalary}
                        onChange={e => {
                          setMotiveSalary(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Monetary Compensation Slider"
                      />

                      <div className="flex justify-between text-xs font-bold pt-2">
                        <span className="text-rose-400">Emotional / Family / Civic Motive:</span>
                        <span className="font-mono text-white">{motiveAffection}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={motiveAffection}
                        onChange={e => {
                          setMotiveAffection(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                        aria-label="Emotional Motive Slider"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-2 text-center">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Live Classification</span>
                      <div
                        className={`text-xl font-black py-2 px-4 rounded-xl border inline-block ${
                          motiveSalary > 0
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                            : 'bg-rose-950/80 text-rose-300 border-rose-600'
                        }`}
                      >
                        {motiveSalary > 0 ? '💼 Economic Activity' : '❤️ Non-Economic Activity'}
                      </div>
                      <p className="text-xs text-slate-300 px-4">
                        {motiveSalary > 0
                          ? `Carried out for monetary livelihood (₹${motiveSalary.toLocaleString()}). Included in official GDP & National Income.`
                          : 'Carried out purely out of love, sympathy, religion, or civic duty. Generates psychic income but excluded from official GDP.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: WATER-DIAMOND PARADOX LAB ── */}
              {currentSlide === 3 && (
                <div className="space-y-4 pt-2">
                  {/* TOPIC-SPECIFIC SVG DIAGRAM 2: WATER-DIAMOND PARADOX BALANCE SCALE */}
                  <WaterDiamondScaleSVG waterScarcity={waterScarcity} diamondScarcity={diamondScarcity} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-sky-400">
                        <span>💧 Water Scarcity (Chennai / Vidarbha):</span>
                        <span className="font-mono">{waterScarcity}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={95}
                        value={waterScarcity}
                        onChange={e => {
                          setWaterScarcity(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-sky-500 cursor-pointer"
                        aria-label="Water Scarcity"
                      />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Value-in-Use: <strong className="text-emerald-400">100% (Vital)</strong></span>
                        <span>Value-in-Exchange: <strong className="text-sky-300">₹{(waterScarcity * 20).toFixed(0)}/tanker</strong></span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                        <span>💎 Diamond Scarcity (Zaveri Bazaar):</span>
                        <span className="font-mono">{diamondScarcity}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={95}
                        value={diamondScarcity}
                        onChange={e => {
                          setDiamondScarcity(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Diamond Scarcity"
                      />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Value-in-Use: <strong className="text-rose-400">5% (Ornamental)</strong></span>
                        <span>Value-in-Exchange: <strong className="text-amber-300">₹{(diamondScarcity * 5000).toLocaleString()}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-indigo-400">Adam Smith’s Insight:</strong> Price is governed by marginal scarcity and production costs (Value-in-Exchange), NOT by total life-supporting usefulness (Value-in-Use).
                  </div>
                </div>
              )}

              {/* ── LAB 5: BHARATNAGAR FACTOR MARKET & CIRCULAR FLOW ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 pt-2">
                  {/* TOPIC-SPECIFIC SVG DIAGRAM 3: CIRCULAR FLOW DIAGRAM */}
                  <CircularFlowSVG />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <label className="text-xs font-bold text-amber-300">🌾 Land (Acres): {districtLandAcres}</label>
                      <input
                        type="range"
                        min={100}
                        max={2000}
                        step={50}
                        value={districtLandAcres}
                        onChange={e => setDistrictLandAcres(Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Land allocation slider"
                      />
                      <span className="text-[11px] text-slate-400">Reward: Rent paid to landowners</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <label className="text-xs font-bold text-sky-300">👷 Labour (Workers): {districtWorkers}</label>
                      <input
                        type="range"
                        min={500}
                        max={10000}
                        step={100}
                        value={districtWorkers}
                        onChange={e => setDistrictWorkers(Number(e.target.value))}
                        className="w-full accent-sky-500"
                        aria-label="Labour allocation slider"
                      />
                      <span className="text-[11px] text-slate-400">Reward: Wages paid to workers</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <label className="text-xs font-bold text-purple-300">🏭 Capital Investment: {capitalInvestment}%</label>
                      <input
                        type="range"
                        min={5}
                        max={80}
                        step={5}
                        value={capitalInvestment}
                        onChange={e => setCapitalInvestment(Number(e.target.value))}
                        className="w-full accent-purple-500"
                        aria-label="Capital investment slider"
                      />
                      <span className="text-[11px] text-slate-400">Reward: Interest on capital</span>
                    </div>
                  </div>

                  {/* 2D Canvas Flow + Live Output HUD */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-1/2">
                      <canvas ref={canvasRef} width={280} height={70} className="w-full rounded-xl bg-slate-900/80 border border-slate-800" />
                    </div>
                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Total District Output:</span>
                        <span className="text-lg font-mono font-black text-emerald-400">{calculatedOutput.toLocaleString()} units</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Entrepreneur Profit Margin:</span>
                        <span className="text-lg font-mono font-black text-amber-400">~18.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Step Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-sm font-bold border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30"
              >
                Next Concept Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter District Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE-PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sandbox Playground</span>
                <h3 className="text-xl font-black text-white">Bharatnagar Integrated Economic Dashboard</h3>
              </div>
              <span className="text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-semibold">
                Ungraded Free Exploration
              </span>
            </div>

            {/* PREDICT-THEN-CHECK ACCORDION */}
            {!predictionMade ? (
              <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60 space-y-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">🔬 Predict Before You Simulate:</span>
                <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePrediction(i)}
                      className="text-left p-3 rounded-lg text-xs bg-slate-900 border border-slate-700 hover:border-indigo-400 text-slate-200"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800 text-xs text-indigo-300 flex items-center justify-between">
                <span>✓ Prediction Recorded! Test with the 10-Year Growth Projection below.</span>
                <span className="text-amber-400 font-bold">{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
              </div>
            )}

            {/* Live Chart: Samuelson Dynamic Growth Projection */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-white">Paul Samuelson 10-Year Dynamic Growth Projection</span>
                <span className="text-xs font-mono text-purple-400 font-bold">
                  Capital Accumulation: {capitalInvestment}%
                </span>
              </div>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthProjectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="output" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Dynamic Growth (Samuelson)" />
                    <Line type="monotone" dataKey="staticOutput" stroke="#94a3b8" strokeDasharray="4 4" name="Static Allocation (Robbins)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Household Savings Equation Simulator */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Household Savings & Consumption Balance (S = Y - C)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Monthly Income (Y):</span>
                    <span className="font-mono text-emerald-400 font-bold">₹{monthlyIncomeInput.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={20000}
                    max={200000}
                    step={5000}
                    value={monthlyIncomeInput}
                    onChange={e => setMonthlyIncomeInput(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                    aria-label="Monthly income slider"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Monthly Consumption (C):</span>
                    <span className="font-mono text-rose-400 font-bold">₹{monthlySpendInput.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={monthlyIncomeInput}
                    step={2000}
                    value={monthlySpendInput}
                    onChange={e => setMonthlySpendInput(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                    aria-label="Monthly consumption slider"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">Monthly Savings (S)</span>
                  <span className="font-mono font-bold text-emerald-400">₹{calculatedSavings.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">Savings Rate (%)</span>
                  <span className="font-mono font-bold text-indigo-400">{calculatedSavingsRate}%</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">Wealth Addition (10 Yrs)</span>
                  <span className="font-mono font-bold text-amber-400">₹{(calculatedSavings * 120 / 100000).toFixed(1)} Lakhs</span>
                </div>
              </div>
            </div>

            {/* OBSERVATION QUESTION IN SANDBOX */}
            {!observationAnswered ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">🔍 Observation Check:</span>
                <p className="text-sm text-white font-semibold">{OBSERVATION_QUESTIONS[1].question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleObservation(i)}
                      className="text-left p-2.5 rounded-lg text-xs bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-200"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-800 text-xs text-emerald-300">
                ✓ Valid observation! Every rupee saved is a rupee subtracted from current consumption.
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2"
            >
              <span>🚀</span> Ready for CISCE Mastery Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (24 PROGRESSIVE TIERS) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Tier HUD */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="font-mono text-indigo-400 font-semibold uppercase">
                Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-purple-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-800/90 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded">
                Node {challenge.nodeId}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                challenge.difficulty === 'foundation' ? 'text-emerald-400 bg-emerald-950/50'
                : challenge.difficulty === 'advanced' ? 'text-purple-400 bg-purple-950/50'
                : 'text-blue-400 bg-blue-950/50'
              }`}>
                {challenge.difficulty}
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-white mb-4 leading-snug">{challenge.question}</h3>

            {/* MCQ Types: Classify / Distinguish / Match */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/80 border-slate-700 hover:border-indigo-500 hover:bg-slate-750 text-slate-200'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full font-bold mb-1">Draggable Factor Rewards:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl cursor-grab text-white text-xs font-bold shadow-md"
                      role="button"
                      aria-label={`Drag item: ${item.label}`}
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'factor_land', name: '1. Land (Natural Resources)' },
                    { id: 'factor_labour', name: '2. Labour (Human Effort)' },
                    { id: 'factor_capital', name: '3. Capital (Machines/Tools)' },
                    { id: 'factor_ent', name: '4. Entrepreneurship (Risk)' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col justify-center items-center transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[11px] font-bold block mb-1">{target.name}</span>
                      <span className="text-xs font-extrabold text-white">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Reward Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Verify Factor Rewards →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Drag to reorder into correct chronological timeline:</p>
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
                      className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-3 cursor-grab hover:border-indigo-500"
                    >
                      <span className="w-5 h-5 rounded-md bg-indigo-900/60 text-indigo-300 flex items-center justify-center font-bold">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Check Sequence Order →
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 focus:outline-none w-64"
                    aria-label="Numerical answer input"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                  >
                    Submit Calculation →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructAdd(part)}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-indigo-400 rounded-xl text-xs text-slate-200 font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1.5 bg-indigo-900/80 border border-indigo-600 rounded-xl text-xs font-bold text-indigo-200 flex items-center gap-2"
                    >
                      <span>{idx + 1}. {part}</span>
                      <button onClick={() => handleConstructRemove(idx)} className="text-rose-400 hover:text-rose-300 font-black">
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click blocks above to construct the complete economic chain...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Validate Chain Structure →
                </motion.button>
              </div>
            )}

            {/* Explanation & Progressive Disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-indigo-950/60 to-slate-950 rounded-2xl border border-indigo-800/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Step-by-Step Educational Rationale:
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(Boolean).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(Boolean)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed font-serif"
                      >
                        <span className="font-bold text-indigo-400 font-sans mr-1">{idx + 1}.</span>
                        {sentence.trim()}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(Boolean).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-indigo-800 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
                  >
                    Show Next Insight Step →
                  </motion.button>
                ) : (
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Review →' : 'Next CISCE Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700/60 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              🏆
            </div>

            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-block px-6 py-2 rounded-2xl text-base md:text-lg font-black tracking-wide border shadow-lg ${
                errors === 0
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-emerald-500/20'
                  : errors <= 3
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500 shadow-blue-500/20'
                  : errors <= 7
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-amber-500/20'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500 shadow-purple-500/20'
              }`}
            >
              {motivationalMessage}
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-black text-white">Economics Mastery Attained!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have systematically mastered the four defining traditions of economics, micro and macro paradigms, and the foundational terms governing markets and national prosperity.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 text-center">
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-mono font-black text-emerald-400">
                  {Math.max(0, 100 - errors * 4)}%
                </span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Total Errors</span>
                <span className="text-xl font-mono font-black text-amber-400">{errors}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Accuracy</span>
                <span className="text-xl font-mono font-black text-purple-400">
                  {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
                </span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Review Due In</span>
                <span className="text-xl font-mono font-black text-indigo-400">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </span>
              </div>
            </div>
          </div>

          {/* MISCONCEPTION PROFILE (IF ANY TRIPPED) */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>⚠️</span> Your Personalized Misconception Diagnostic:
              </div>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="font-bold text-rose-300">❌ Trapped by: {m.misconception}</p>
                      <p className="text-emerald-300 font-serif italic">✓ Scientific Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* REAL WORLD CAPSTONE */}
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <span>📋</span> Capstone Field Assignment: {REAL_WORLD_ACTIVITY.title}
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-start gap-2 text-slate-300">
                  <span className="font-bold text-indigo-400 font-mono">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* REFLECTION & REPETITION SCHEDULE */}
          <div className="p-6 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-bold text-indigo-300 block">Spaced Repetition Schedule (SM-2):</span>
              <span>Based on your responses, an adaptive flash review has been scheduled in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to cement long-term memory.</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('discovery');
                setCurrentChallenge(0);
                setCurrentSlide(0);
                setErrors(0);
                setScoreBreakdown({ correct: 0, total: 0 });
                setDiscoveryAnswered(false);
                setPredictionMade(false);
                setObservationAnswered(false);
                audioManager.play('whoosh');
              }}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-600 shrink-0"
            >
              🔄 Re-explore Simulation
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION NOTIFICATION OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Milestone Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C9_EconomicsDefinitionEconomicsAdamSim };
export default C9_EconomicsDefinitionEconomicsAdamSim;
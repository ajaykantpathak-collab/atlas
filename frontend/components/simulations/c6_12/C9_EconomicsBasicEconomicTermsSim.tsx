'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Bar
} from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID DECLARATIONS ───
const NODE_C9_ECON_011 = 'c9_econ_011';
const NODE_C9_ECON_012 = 'c9_econ_012';
const NODE_C9_ECON_013 = 'c9_econ_013';
const NODE_C9_ECON_014 = 'c9_econ_014';
const NODE_C9_ECON_015 = 'c9_econ_015';
const NODE_C9_ECON_016 = 'c9_econ_016';
const NODE_C9_ECON_017 = 'c9_econ_017';
const NODE_C9_ECON_018 = 'c9_econ_018';
const NODE_C9_ECON_019 = 'c9_econ_019';
const NODE_C9_ECON_020 = 'c9_econ_020';

const ALL_NODE_IDS = [
  NODE_C9_ECON_011,
  NODE_C9_ECON_012,
  NODE_C9_ECON_013,
  NODE_C9_ECON_014,
  NODE_C9_ECON_015,
  NODE_C9_ECON_016,
  NODE_C9_ECON_017,
  NODE_C9_ECON_018,
  NODE_C9_ECON_019,
  NODE_C9_ECON_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Bharatpur Economic Transformation Project',
  intro: 'You have been appointed Chief Economic Advisor to the National Planning Council of Bharatpur. A major policy transition is underway: transforming from an agrarian developing society into a sustainable, high-welfare mixed economy.',
  context: 'Balance resource constraints, manage the 4-entity circular flow of ₹300+ lakh crore, align public and private incentives, and elevate the Human Development Index beyond mere GDP numbers.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'India is the world\'s 5th largest economy (~$3.7 trillion GDP in 2023), yet is officially classified as a developing economy. What is the fundamental economic reason?',
  options: [
    'India produces zero manufactured goods and has no space programme',
    'Its large GDP is distributed across 1.4 billion people, yielding a low per capita income ($2,500) and modest HDI rank (134)',
    'Developing classification depends purely on having zero corporate taxes',
    'The Reserve Bank of India has not issued international bonds'
  ],
  correctIndex: 1,
  hintAfter: 'Development is measured per person and across multidimensional well-being indicators, not by total GDP alone!',
};

// ─── PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
const PREDICTION_QUESTIONS = [
  {
    id: 'pred_01',
    question: 'If weekly work hours increase from 40 to 80 hrs with double salary, what will happen to Composite Total Welfare?',
    options: [
      'Total Welfare will double because monetary income is doubled',
      'Total Welfare will decline because health, leisure, and non-material well-being collapse',
      'Total Welfare stays completely unchanged regardless of work hours',
      'Non-material welfare will rise while material welfare falls'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Work Hours slider past 70 hrs/week in Lab Step 1 to observe how Composite Welfare collapses despite high income.',
    explanation: 'Economic welfare includes non-material factors like leisure and health. Beyond 50-60 hours, severe exhaustion outweighs incremental material earnings.'
  },
  {
    id: 'pred_02',
    question: 'In the circular flow equilibrium identity (S + T + M = I + G + X), what happens if Government Spending (G) increases while Savings (S), Taxes (T), and Imports (M) stay constant?',
    options: [
      'The economy enters a contractionary leakage drain',
      'Total Injections exceed Total Leakages, creating an expansionary injection surplus',
      'Imports automatically drop to zero without any other change',
      'The circular flow immediately stalls and shuts down'
    ],
    correctIndex: 1,
    verifyInstruction: 'In the Macroeconomic Sandbox, increase Govt Expenditure (G) to ₹35k cr and verify that the Flow Gap becomes positive (Expansionary).',
    explanation: 'Government expenditure (G) is an injection of purchasing power. When Injections > Leakages, aggregate demand and national income expand.'
  }
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c9_econ_011)
  {
    id: 'ch_econ_001',
    nodeId: NODE_C9_ECON_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following best defines "Welfare" in economics?',
    options: [
      'The total monetary stock of currency hoarded in commercial banks',
      'The overall sense of well-being or satisfaction derived from material and non-material life conditions',
      'Strictly the annual turnover of large private corporations',
      'The total amount of gold held in foreign exchange reserves'
    ],
    correctIndex: 1,
    explanation: 'Welfare encompasses both material well-being (purchasable goods/services) and non-material well-being (clean air, leisure, health, freedom).',
    hints: [
      'Think beyond just money in a bank account.',
      'Remember Alfred Marshall\'s material focus vs modern broad well-being concepts.',
      'Welfare includes health, environment, leisure, and purchasing satisfaction.'
    ],
    misconceptionIndex: 0
  },

  // 2. Foundation - Understanding (c9_econ_012)
  {
    id: 'ch_econ_002',
    nodeId: NODE_C9_ECON_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is a single-person Kirana shop in Lucknow buying rice at ₹40/kg and selling at ₹48/kg classified as a "Firm"?',
    options: [
      'Because it is registered on the New York Stock Exchange',
      'Because it produces/retails for the market with a profit motive and combines factors of production',
      'Only because it receives direct subsidies from the World Bank',
      'It is not a firm; only companies with over 5,000 employees are firms'
    ],
    correctIndex: 1,
    explanation: 'A firm is defined by production/distribution for sale with profit motive and factor employment, regardless of scale.',
    hints: [
      'Does size define what a firm is?',
      'Check the 4 features of a firm: market production, profit motive, factor usage, organization.',
      'Even a roadside tea stall or small kirana store satisfies the definition of a firm.'
    ],
    misconceptionIndex: 1
  },

  // 3. Foundation - Understanding (c9_econ_020)
  {
    id: 'ch_econ_003',
    nodeId: NODE_C9_ECON_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is a ₹500 currency note NOT an economic resource?',
    options: [
      'Because it is too small to be recorded in GDP',
      'Money is a medium of exchange and a claim on resources, not an input that directly produces goods',
      'Because it is a non-renewable natural resource',
      'Because paper currency degrades within 24 hours'
    ],
    correctIndex: 1,
    explanation: 'Money is a medium of exchange. Productive resources are the actual inputs (land, labour, machinery) that money buys.',
    hints: [
      'Can a ₹500 note grow wheat or assemble a car by itself?',
      'Differentiate between physical production inputs and financial payment tokens.',
      'Money buys land, labour, and capital, but is not an input factor itself.'
    ],
    misconceptionIndex: 3
  },

  // 4. Foundation - Drag Label (c9_econ_014)
  {
    id: 'ch_econ_004',
    nodeId: NODE_C9_ECON_014,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the four core economic entities in the circular flow of an economy.',
    dragItems: [
      { label: 'Households', targetId: 'box_top' },
      { label: 'Firms', targetId: 'box_bottom' },
      { label: 'Government', targetId: 'box_left' },
      { label: 'Foreign Sector', targetId: 'box_right' },
    ],
    correctMapping: {
      box_top: 'Households',
      box_bottom: 'Firms',
      box_left: 'Government',
      box_right: 'Foreign Sector'
    },
    explanation: 'Households supply factors and consume; Firms produce goods; Government taxes and provides public goods; Foreign sector manages exports/imports.',
    hints: [
      'Top position represents the primary suppliers of factor inputs (labour, land, capital).',
      'Bottom position represents the productive units transforming inputs into goods and services.',
      'Left & Right represent the regulator/spending state and the external rest-of-the-world entity.'
    ],
  },

  // 5. Foundation - Recall (c9_econ_015)
  {
    id: 'ch_econ_005',
    nodeId: NODE_C9_ECON_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What term did Adam Smith use in 1776 to describe the self-regulating price mechanism in a capitalist economy?',
    options: ['The Iron Fist', 'The Central Planning Directive', 'The Invisible Hand', 'The Fiscal Multiplier'],
    correctIndex: 2,
    explanation: 'Adam Smith coined the term "invisible hand" to explain how self-interested actions coordinated by market prices allocate resources efficiently.',
    hints: [
      'It represents market coordination without central command.',
      'Found in Adam Smith\'s landmark book "The Wealth of Nations".',
      'Invisible ____.'
    ],
  },

  // 6. Foundation - Drag Sort (c9_econ_016)
  {
    id: 'ch_econ_006',
    nodeId: NODE_C9_ECON_016,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of how a Socialist Central Planning authority solves economic allocation.',
    sortItems: [
      'Assess societal needs and resource inventory',
      'Set national physical production targets (Five-Year Plan)',
      'Assign production quotas to State-Owned Enterprises',
      'Distribute goods through state ration channels at fixed prices'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Socialist central planning starts with needs assessment, sets macro quotas (Five-Year Plans), assigns SOE targets, and distributes at controlled prices.',
    hints: [
      'Planners must first know what the society lacks before setting quotas.',
      'Macro targets are drafted before specific state factories receive their assignments.',
      'Distribution to citizens happens after production targets are executed.'
    ],
  },

  // 7. Foundation - Application (c9_econ_011)
  {
    id: 'ch_econ_007',
    nodeId: NODE_C9_ECON_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Which of the following represents Sustainable Consumption in an Indian household?',
    options: [
      'Buying 10 single-use plastic carry bags daily from street vendors',
      'Using a 5-star BEE-rated inverter AC and carrying reusable cloth bags for groceries',
      'Running diesel generators 24/7 inside home premises to save municipal water',
      'Stopping all food consumption to conserve agricultural land'
    ],
    correctIndex: 1,
    explanation: 'Sustainable consumption means meeting current needs efficiently with less resource waste and environmental harm, preserving resources for future generations.',
    hints: [
      'Sustainable consumption is about efficiency, not deprivation.',
      'Look for the option using certified energy-efficient appliances and reusable alternatives.',
      'BEE star ratings directly reduce power consumption and carbon emissions.'
    ],
  },

  // 8. Standard - Application (c9_econ_013)
  {
    id: 'ch_econ_008',
    nodeId: NODE_C9_ECON_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An NRI software architect in Dubai sends ₹75,000 monthly to her parents in Thrissur, Kerala. How is this transaction classified?',
    options: [
      'Government indirect tax transfer',
      'Merchandise trade export deficit',
      'Foreign sector inflow as private remittance',
      'Domestic factor wage payment by an Indian firm'
    ],
    correctIndex: 2,
    explanation: 'Remittances from non-resident workers abroad represent money flow from the foreign sector into domestic households.',
    hints: [
      'The money originates outside India from an individual working abroad.',
      'India received ~$125 billion in such inflows in 2023, the highest globally.',
      'It is an external inward remittance to a household.'
    ],
  },

  // 9. Standard - Numeric (c9_econ_019)
  {
    id: 'ch_econ_009',
    nodeId: NODE_C9_ECON_019,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A country\'s real GDP in 2022 was ₹150 lakh crore and rose to ₹162 lakh crore in 2023. Calculate the annual Economic Growth Rate percentage.',
    correctAnswer: 8.0,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Growth Rate = [(162 - 150) / 150] × 100 = (12 / 150) × 100 = 8.0%.',
    hints: [
      'Formula: [(GDP_current - GDP_previous) / GDP_previous] * 100.',
      'Change in GDP is ₹12 lakh crore.',
      'Divide 12 by 150, then multiply by 100.'
    ],
  },

  // 10. Standard - Analysis (c9_econ_014)
  {
    id: 'ch_econ_010',
    nodeId: NODE_C9_ECON_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the macroeconomic circular flow equilibrium identity (S + T + M = I + G + X), which of the following represents LEAKAGES from the income stream?',
    options: [
      'Investment (I), Government Spending (G), Exports (X)',
      'Savings (S), Taxes (T), Imports (M)',
      'Wages (W), Rent (R), Profits (P)',
      'Subsidies, Public Goods, Remittances'
    ],
    correctIndex: 1,
    explanation: 'Leakages withdraw purchasing power from the domestic flow: Savings (S), Taxes (T), and Imports (M).',
    hints: [
      'Leakages are money exiting the circular flow.',
      'When you save money in a vault, pay tax, or buy imported goods, money leaves domestic circulation.',
      'S + T + M are leakages; I + G + X are injections.'
    ],
  },

  // 11. Standard - Analysis (c9_econ_017)
  {
    id: 'ch_econ_011',
    nodeId: NODE_C9_ECON_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do SBI (public sector) and HDFC Bank (private sector) uniquely illustrate the coexistence in India\'s Mixed Economy?',
    options: [
      'SBI is forbidden from earning any revenue, while HDFC prints its own currency',
      'Both provide banking services, but SBI also handles social obligations (rural branches, priority sector lending) while HDFC targets market-driven retail returns',
      'HDFC is entirely owned by the Reserve Bank of India, whereas SBI is a US multinational',
      'There is no coexistence; public and private sectors are legally banned from the same industry in India'
    ],
    correctIndex: 1,
    explanation: 'Mixed economies feature public enterprises serving broader social welfare alongside profit-maximizing private firms under common regulation.',
    hints: [
      'Both operate in the same market under RBI regulation.',
      'SBI maintains thousands of unremunerative rural branches to fulfill national financial inclusion goals.',
      'Private banks focus predominantly on profitable urban segments.'
    ],
    misconceptionIndex: 2
  },

  // 12. Standard - Evaluation (c9_econ_018)
  {
    id: 'ch_econ_012',
    nodeId: NODE_C9_ECON_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Qatar has a GDP per capita of ~$85,000, yet Japan (~$34,000 per capita) is more unambiguously classified as fully developed. Why?',
    options: [
      'Japan has larger physical land area than Qatar',
      'Japan has a diversified industrial base (robotics, autos), high human capital (99% literacy, HDI rank 16), whereas Qatar is heavily dependent on oil/gas extraction',
      'Qatar has zero natural resources compared to Japan',
      'International agencies only classify countries in East Asia as developed'
    ],
    correctIndex: 1,
    explanation: 'Development is multidimensional: diversification, advanced domestic technology, human capital, and social indicators outweigh single-commodity resource windfalls.',
    hints: [
      'Consider economic diversification vs single commodity dependence.',
      'Evaluate human development indicators and industrial manufacturing depth.',
      'Japan produces global technology leaders like Toyota and Sony despite importing raw oil.'
    ],
    misconceptionIndex: 4
  },

  // 13. Standard - Construct (c9_econ_020)
  {
    id: 'ch_econ_013',
    nodeId: NODE_C9_ECON_020,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Assemble the 3 essential components required to generate agricultural production on a Punjab wheat farm.',
    availableParts: ['Fertile Agricultural Land', 'Skilled Farm Labour', 'Mahindra Tractor Machinery', 'Paper Currency Notes', 'Gold Bullion'],
    targetState: 'Fertile Agricultural Land Skilled Farm Labour Mahindra Tractor Machinery',
    validationHint: 'Select one Natural Resource, one Human Resource, and one Man-made Capital Resource.',
    explanation: 'Production requires Land (Natural), Labour (Human), and Capital/Tractor (Man-made). Currency notes are tokens, not direct inputs.',
    hints: [
      'Pick the gift of nature first (land).',
      'Add human physical and mental effort.',
      'Add the manufactured capital tool (tractor).'
    ],
  },

  // 14. Standard - Application (c9_econ_019)
  {
    id: 'ch_econ_014',
    nodeId: NODE_C9_ECON_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Kerala has lower per capita income (~₹2.2 lakh) than Haryana (~₹3.5 lakh), yet ranks higher in literacy (96.2%), life expectancy (77.3 yrs), and infant health. What does this demonstrate?',
    options: [
      'Economic growth and economic development are identical metrics',
      'Public investment in health and education can convert moderate growth into superior human development outcomes',
      'High per capita income automatically guarantees the highest life expectancy',
      'Haryana has abolished all healthcare services'
    ],
    correctIndex: 1,
    explanation: 'Kerala converted moderate economic growth into high human development through deliberate public investments in schooling and primary healthcare.',
    hints: [
      'Income alone does not determine education and health.',
      'Focus on the distinction between quantitative growth and qualitative development.',
      'Public policy prioritization transforms income into welfare.'
    ],
  },

  // 15. Advanced - Analysis (c9_econ_014)
  {
    id: 'ch_econ_015',
    nodeId: NODE_C9_ECON_014,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Given an economy where Savings (S) = ₹30k cr, Taxes (T) = ₹15k cr, Imports (M) = ₹20k cr, Investment (I) = ₹25k cr, and Govt Spending (G) = ₹20k cr. What level of Exports (X) in ₹k cr is required for equilibrium (S + T + M = I + G + X)?',
    correctAnswer: 20,
    tolerance: 0,
    unit: 'k crore',
    explanation: 'Total Leakages = 30 + 15 + 20 = 65k cr. Total Injections = 25 + 20 + X = 45 + X. For equilibrium: 65 = 45 + X => X = 20k cr.',
    hints: [
      'Calculate Total Leakages: S + T + M.',
      'Leakages = 30 + 15 + 20 = 65.',
      'Solve 65 = 25 + 20 + X.'
    ],
  },

  // 16. Advanced - Evaluation (c9_econ_015)
  {
    id: 'ch_econ_016',
    nodeId: NODE_C9_ECON_015,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do pure capitalist economies still establish regulatory bodies like SEBI, the US SEC, and the Competition Commission of India?',
    options: [
      'To enforce socialist central five-year planning quotas on all bakeries',
      'Because market failures (monopolies, information asymmetry, negative externalities) distort the price mechanism, requiring legal safeguards to preserve competitive markets',
      'To confiscate all private property without compensation',
      'Capitalist economies never have regulatory bodies under any circumstances'
    ],
    correctIndex: 1,
    explanation: 'Capitalism relies on competitive markets; regulation prevents anti-competitive cartels, monopolies, and fraudulent practices that undermine market efficiency.',
    hints: [
      'Does capitalism mean zero laws and zero refereeing?',
      'Think of antitrust laws (Sherman Act) and monopoly prevention.',
      'Regulators ensure fair rules of the game without taking over direct production.'
    ],
    misconceptionIndex: 2
  },

  // 17. Advanced - Analysis (c9_econ_016)
  {
    id: 'ch_econ_017',
    nodeId: NODE_C9_ECON_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What was the primary systemic vulnerability that led to chronic consumer goods shortages in the Soviet socialist economy (Gosplan)?',
    options: [
      'Central planners could not calculate the dispersed, rapidly changing needs of 290 million citizens without market price signals',
      'Private firms produced too many luxury cars in Moscow',
      'The USSR completely banned electricity and industrial machinery',
      'The economy was overburdened by private stock exchange speculations'
    ],
    correctIndex: 0,
    explanation: 'Without free market price signals, central planners suffered from an information calculation problem, leading to massive surpluses in some goods and acute shortages in others.',
    hints: [
      'Can a central planning committee accurately estimate shoe sizes and bread tastes for 290 million people?',
      'Consider the role of price signals in communicating consumer demand.',
      'The information problem and lack of profit incentive caused systemic rigidities.'
    ],
  },

  // 18. Advanced - Drag Sort (c9_econ_018)
  {
    id: 'ch_econ_018',
    nodeId: NODE_C9_ECON_018,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the structural stages through which advanced developed nations shifted their employment workforce historically.',
    sortItems: [
      'Agrarian stage (>70% workforce in low-productivity agriculture)',
      'Early Industrialization (Mass manufacturing, textile mills, coal mines)',
      'Advanced Industrial & Heavy Engineering era',
      'Post-Industrial Services & High-Tech Innovation economy (>75% in services)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Developed nations historically transitioned from agriculture to manufacturing, then heavy industry, and finally knowledge-driven services.',
    hints: [
      'Societies begin with subsistence farming.',
      'Industrial revolution shifts labour to urban factories.',
      'Mature economies culminate in high-tech research, finance, and services.'
    ],
  },

  // 19. Advanced - Application (c9_econ_020)
  {
    id: 'ch_econ_019',
    nodeId: NODE_C9_ECON_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'India has a workforce of ~471 million people, yet Tata Motors Sanand faces shortages of robotics technicians and certified EV battery welders. Why?',
    options: [
      'Workers in India are legally barred from using electric equipment',
      'India possesses raw demographic quantity, but skilled human capital is scarce as only 4-5% of workers have formal vocational training',
      'Robotics is categorized as a non-renewable natural resource',
      'Electric vehicles require zero labour inputs in modern assembly lines'
    ],
    correctIndex: 1,
    explanation: 'Economic limitation refers to effective, skilled supply relative to demand. Raw population size does not equal skilled human resources.',
    hints: [
      'Distinguish between total population headcount and specialized skill certification.',
      'Review NSO/PLFS vocational training statistics.',
      'Demographic quantity differs from skilled human capital quality.'
    ],
  },

  // 20. Advanced - Evaluation (c9_econ_017)
  {
    id: 'ch_econ_020',
    nodeId: NODE_C9_ECON_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did India retain public sector control over Indian Railways and atomic energy even after the comprehensive 1991 LPG reforms?',
    options: [
      'The government intended to abolish all private enterprises by 2000',
      'These sectors are strategic natural monopolies and critical national security domains requiring non-profit universal access and state control',
      'Private firms refused to accept Indian rupee currency',
      'The World Bank mandated that transport cannot use modern technology'
    ],
    correctIndex: 1,
    explanation: 'Mixed economies deliberately retain public ownership over strategic sectors and natural monopolies to protect national security and ensure affordable public access.',
    hints: [
      'Think about public goods, strategic national defence, and natural network monopolies.',
      'Would a profit-driven firm maintain loss-making remote railway routes for poor citizens?',
      'Strategic autonomy and social equity guide public sector retention.'
    ],
  },

  // 21. Advanced - Creativity / Policy Formulation (c9_econ_011)
  {
    id: 'ch_econ_021',
    nodeId: NODE_C9_ECON_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'As Chief Advisor, design a sustainable consumption initiative for urban transit. Which policy package optimally balances quality of life and resource conservation?',
    options: [
      'Subsidizing diesel fuel for single-occupancy luxury SUVs',
      'Expanding zero-emission electric bus rapid transit (e-BRT), dedicated bicycle corridors, and solar-powered metro networks',
      'Banning all citizens from leaving their homes indefinitely',
      'Increasing private vehicle parking subsidies across downtown core areas'
    ],
    correctIndex: 1,
    explanation: 'Sustainable consumption in transport utilizes clean energy infrastructure (solar metro, e-buses, cycling) meeting transit needs with minimum emissions.',
    hints: [
      'Focus on meeting transit needs efficiently with minimal fossil fuel depletion.',
      'Electric mass transit replaces polluting single-occupancy vehicles.',
      'Clean energy transport aligns with the 3 pillars of sustainability.'
    ],
  },

  // 22. Advanced - Analysis / Real-world synthesis (c9_econ_019)
  {
    id: 'ch_econ_022',
    nodeId: NODE_C9_ECON_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did the British colonial Drain of Wealth (1757-1947) generate statistical export volumes without generating economic development in India?',
    options: [
      'Export revenues were reinvested directly into Indian village schools and public hospitals',
      'The surplus generated from exports was repatriated to Britain as Home Charges and colonial profits rather than accumulating domestic human and capital resources',
      'India imported too much British gold which caused severe inflation',
      'Indian handloom weavers refused to accept monetary payments'
    ],
    correctIndex: 1,
    explanation: 'The drain of wealth represented an uncompensated leakage of economic surplus to Britain, breaking the link between production and domestic capital accumulation.',
    hints: [
      'Recall Dadabhai Naoroji\'s Drain of Wealth theory.',
      'Were export proceeds used to build Indian universities and public health systems?',
      'Profits exited the domestic circular flow to fund British industrialization.'
    ],
  },
  // ─── Class 10 board-depth additions: development-scenarios diagnostic ───
  {
    id: 'ch_depth_bas_development_scenarios',
    nodeId: 'c10_eco_cbse_01_007',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare two development scenarios for a tribal district in Odisha: Scenario A opens a bauxite mine bringing jobs, revenue and displacement of 40 villages; Scenario B builds a forest-based economy (lac, tamarind, eco-tourism) with lower income but no displacement. Frame the comparison using development goals.',
    options: [
      'Scenario A maximises income (national development logic) but violates other development goals -- security, dignity, equal treatment of communities and a clean environment; Scenario B protects livelihood sustainability and cultural identity at lower income. The comparison shows development goals CONFLICT, so the mix chosen is a value judgement -- which is why "development" needs multiple indicators (HDI), not just per capita income',
      'Scenario A is better by every measure; tribal consent is irrelevant',
      'Income comparisons alone settle such disputes completely',
      'Scenario B is always better regardless of local preferences'
    ],
    correctIndex: 0,
    explanation:
      'The Niyamgiri bauxite controversy is the live example: the Supreme Court (2013) let gram sabhas decide -- development goals are contested BY the affected people, not only computed for them. Board framing: list each scenario\'s gains and losses against the goal list (income, health, education, security, environment, dignity), then argue -- and mark that different persons weight goals differently (a landless labourer vs a forest-dependent family).',
    hints: [
      'Whose development? Ask the displaced vs the employed.',
      'Income is ONE goal among many -- name three others.',
      'Conflicting goals mean the choice is political, not just arithmetic.'
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
  nodeId: NODE_C9_ECON_011,
  title: 'Basic Economic Terms & Economic Systems',
  definition: 'An economy is the organised system of production, distribution, and consumption. Economic systems (Capitalist, Socialist, Mixed) resolve the central allocation problems, while resources (Human, Natural, Capital) define production frontiers. Growth measures real output expansion, whereas Development encompasses quality of life, HDI, and sustainable welfare.',
  eli5: 'An economy is the giant team of households, shops, governments, and overseas partners making and sharing goods. Growth is earning more money; development is your life actually getting healthier, smarter, and cleaner.',
  misconceptions: [
    { misconception: 'Welfare is identical to high monetary income.', correction: 'Welfare includes non-material factors: clean air, health, family leisure, and security. A stressed executive earning ₹4 lakh/mo may have lower welfare than a healthy teacher earning ₹60,000.' },
    { misconception: 'Firms must be giant corporations like Tata or Reliance.', correction: 'Any unit producing goods or services for sale to earn profit (like a neighbourhood kirana store or tea vendor) is a firm.' },
    { misconception: 'A Mixed Economy is always a rigid 50-50 government/private split.', correction: 'Mixed economies vary dynamically: India shifted from a heavy public tilt pre-1991 to over 70% private GDP contribution today while retaining public control in strategic domains.' },
    { misconception: 'Money is an economic natural resource.', correction: 'Money is a medium of exchange and token claim. The true resources are physical land, skilled labour, and manufactured capital.' },
    { misconception: 'High GDP per capita automatically means a fully developed country.', correction: 'Oil-rich states like Qatar have high GDP per capita but lack broad industrial diversification and human development depth compared to diversified economies like Japan.' }
  ],
  diagnosticQuestions: [
    { question: 'What are the three pillars of sustainable consumption?', options: ['Spending all savings, cutting trees, importing oil', 'Basic needs, quality of life, inter-generational equity', 'Banning all businesses, printing cash, borrowing abroad', 'Taxing 100% of income, closing schools, subsidizing coal'], correctIndex: 1 },
    { question: 'Which entity primarily supplies factors of production (land, labour, capital)?', options: ['Foreign Sector only', 'Households', 'Central Tax Tribunals', 'Planning Commissions'], correctIndex: 1 },
    { question: 'What is the macroeconomic condition for circular flow equilibrium?', options: ['S + T + M = I + G + X', 'S + I = T + G', 'Imports = 0', 'Taxes = Total GDP'], correctIndex: 0 },
    { question: 'Which economic system relies primarily on the "invisible hand" price mechanism?', options: ['Command Socialist Economy', 'Pure Capitalist Economy', 'Feudal Manor System', 'Subsistence Agrarian Clan'], correctIndex: 1 },
    { question: 'What was the central planning agency of the Soviet Union called?', options: ['SEBI', 'Gosplan', 'Federal Reserve', 'NITI Aayog'], correctIndex: 1 },
    { question: 'Which article of the Indian Constitution directs the state toward equitable resource distribution?', options: ['Article 39', 'Article 370', 'Article 1', 'Article 356'], correctIndex: 0 },
    { question: 'What dimensions comprise the UN Human Development Index (HDI)?', options: ['Only stock market index numbers', 'Health (Life Expectancy), Education (Schooling), Standard of Living (GNI per capita)', 'Military size, foreign debt, gold holdings', 'Number of cars produced per month'], correctIndex: 1 },
    { question: 'Which of the following is a non-renewable natural resource?', options: ['Bhadla solar radiation', 'Muppandal wind power', 'Jharia coal deposits', 'Hydrological rainfall cycle'], correctIndex: 2 }
  ],
  masteryCriteria: 'Master basic economic terms (welfare, sustainable consumption), identify the 4 entities and circular flow equilibrium, distinguish capitalist/socialist/mixed systems with Indian reference, contrast growth vs development (HDI), and classify resource scarcity.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Brilliant Style) ───
const EXPLORATION_STEPS = [
  {
    stepId: 'step_welfare',
    nodeId: NODE_C9_ECON_011,
    title: '1. Welfare: Income vs Quality of Life',
    instruction: 'Adjust the Work Hours and Clean Environment sliders to discover how non-material factors determine Total Welfare.',
    interactionType: 'slider-observe',
  },
  {
    stepId: 'step_circular',
    nodeId: NODE_C9_ECON_014,
    title: '2. The 4-Entity Circular Flow Engine',
    instruction: 'Interact with the 4 economic entities (Households, Firms, Government, Foreign Sector) to see real and money flows in motion.',
    interactionType: 'click-stakeholder',
  },
  {
    stepId: 'step_systems',
    nodeId: NODE_C9_ECON_017,
    title: '3. Economic Systems Spectrum (India\'s Mix)',
    instruction: 'Drag the State Control slider across Capitalism, Mixed Economy, and Socialism to observe sector balance and market outcomes.',
    interactionType: 'slider-observe',
  },
  {
    stepId: 'step_growth_dev',
    nodeId: NODE_C9_ECON_019,
    title: '4. Growth (GDP) vs Development (HDI)',
    instruction: 'Simulate public social investment to see why GDP expansion alone does not guarantee high Human Development.',
    interactionType: 'slider-observe',
  },
  {
    stepId: 'step_resources',
    nodeId: NODE_C9_ECON_020,
    title: '5. Resource Scarcity & Human Capital',
    instruction: 'Upgrade vocational training and renewable technology to overcome natural resource depletion and labour skill shortages.',
    interactionType: 'click-stakeholder',
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the "Total Welfare" gauge when working hours increase beyond 70 hrs/week despite a rising monthly salary?',
    observableOptions: [
      'Welfare continues rising exponentially',
      'Total Welfare plateaus and collapses due to steep depletion in health, sleep, and non-material leisure satisfaction',
      'Health scores automatically increase with overwork',
      'Air pollution drops to zero'
    ],
    correctIndex: 1,
    nodeId: NODE_C9_ECON_011
  },
  {
    question: 'What pattern emerges on the Mixed Economy slider when moving from 0% (Pure Capitalism) to 50% (Indian Mixed Framework)?',
    observableOptions: [
      'All private companies like Tata and Infosys are shut down',
      'Private enterprise creates market efficiency while public sectors like Indian Railways ensure affordable public goods',
      'Prices of all food items are set to zero by law',
      'Tax collections drop to zero'
    ],
    correctIndex: 1,
    nodeId: NODE_C9_ECON_017
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Lead the Bharatpur Macroeconomic Strategy Review',
  description: 'Apply your understanding of basic economic terms to conduct a structural audit of a state or city in India (e.g., Kerala, Maharashtra, or your home district).',
  steps: [
    'Identify 2 Public Sector enterprises (e.g., Indian Railways, SBI) and 2 Private Sector firms (e.g., Tata, Reliance) coexisting in your region.',
    'Trace one complete 4-entity circular flow transaction: Household labour -> Firm wages -> Government GST -> Foreign remittance/import.',
    'Formulate 3 actionable recommendations to convert your district\'s economic growth into higher Human Development (health, schooling, clean energy).'
  ]
};

// ─── MAIN COMPONENT ───
function C9_EconomicsBasicEconomicTermsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_ECON_011,
  title = DEFAULT_PROPS.title || 'Basic Economic Terms & Systems',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {

  // Subject Configuration
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase Management
  const [phase, setPhase] = useState<'discovery' | 'prediction' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction State (Predict-Then-Check Pattern)
  const [currentPredictionIdx, setCurrentPredictionIdx] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);
  const [predictionResults, setPredictionResults] = useState<Record<number, boolean>>({});

  // Interaction State
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Interactive Exploration Interactive States (Sliders & Toggles)
  const [workHours, setWorkHours] = useState(40); // 20 to 90 hrs/wk
  const [cleanEnvScore, setCleanEnvScore] = useState(70); // 0 to 100
  const [activeEntity, setActiveEntity] = useState<'households' | 'firms' | 'government' | 'foreign'>('households');
  const [mixedEcoSlider, setMixedEcoSlider] = useState(50); // 0 = Pure Capitalism, 50 = Mixed (India), 100 = Socialism
  const [growthGdpRate, setGrowthGdpRate] = useState(7.5); // 0 to 12%
  const [socialInvestRate, setSocialInvestRate] = useState(4.0); // 1 to 10% of GDP
  const [skilledVocationalShare, setSkilledVocationalShare] = useState(5); // 4% to 60%

  // Sandbox State Controls
  const [sandboxLeakages, setSandboxLeakages] = useState({ s: 30, t: 15, m: 20 });
  const [sandboxInjections, setSandboxInjections] = useState({ i: 25, g: 20, x: 20 });

  // Adaptive Difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Challenge Handling States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual Feedback Animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Drag & Drop / Input Challenge States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Persistent BKT & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES & REAL-TIME CALCULATIONS ───
  // 1. Welfare Calculator
  const calculatedWelfare = useMemo(() => {
    const baseSalary = 30000 + (workHours - 20) * 1200;
    const materialWellbeing = Math.min(100, (baseSalary / 100000) * 100);
    const healthAndLeisure = Math.max(0, 100 - Math.pow(Math.max(0, workHours - 35), 1.5) * 1.8);
    const nonMaterialWellbeing = (healthAndLeisure * 0.6) + (cleanEnvScore * 0.4);
    const totalWelfare = Math.round((materialWellbeing * 0.45) + (nonMaterialWellbeing * 0.55));
    return { baseSalary, materialWellbeing, nonMaterialWellbeing, totalWelfare };
  }, [workHours, cleanEnvScore]);

  // 2. Simulated HDI & Development Score
  const calculatedHdiMetrics = useMemo(() => {
    const lifeExpectancy = Math.min(84, 62 + (socialInvestRate * 2.2));
    const meanSchoolingYears = Math.min(14, 5.5 + (socialInvestRate * 0.8));
    const gniPerCapitaUsd = Math.round(2000 * Math.pow(1 + (growthGdpRate / 100), 5));
    const simulatedHdi = Math.min(0.95, (0.45 + (lifeExpectancy / 160) + (meanSchoolingYears / 30) + (Math.log(gniPerCapitaUsd) / 25)) / 2.1);
    const hdiRank = Math.max(1, Math.round(193 - (simulatedHdi * 180)));
    return { lifeExpectancy: lifeExpectancy.toFixed(1), meanSchoolingYears: meanSchoolingYears.toFixed(1), gniPerCapitaUsd, simulatedHdi: simulatedHdi.toFixed(3), hdiRank };
  }, [growthGdpRate, socialInvestRate]);

  // 3. Circular Flow Injections vs Leakages
  const circularFlowBalance = useMemo(() => {
    const totalLeakages = sandboxLeakages.s + sandboxLeakages.t + sandboxLeakages.m;
    const totalInjections = sandboxInjections.i + sandboxInjections.g + sandboxInjections.x;
    const gap = totalInjections - totalLeakages;
    const status = gap === 0 ? 'Equilibrium' : gap > 0 ? 'Expansionary (Injection Surplus)' : 'Contractionary (Leakage Drain)';
    return { totalLeakages, totalInjections, gap, status };
  }, [sandboxLeakages, sandboxInjections]);

  // 4. Comparison Chart Data for Developed vs Developing (USA vs India)
  const economicComparisonData = useMemo(() => [
    { indicator: 'GDP/Capita ($k)', USA: 76, India: 2.5 },
    { indicator: 'HDI Score (x100)', USA: 92, India: 64 },
    { indicator: 'Literacy %', USA: 99, India: 78 },
    { indicator: 'Non-Agri Work %', USA: 98.5, India: 54 },
    { indicator: 'Life Expectancy (yrs)', USA: 78, India: 71 },
  ], []);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIALIZATION & PERSISTENCE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${challenge.hints[nextLevel - 1]}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY ANSWER CALLBACK ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction! Let us formulate predictions before experimenting.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PREDICTION SUBMIT CALLBACK ───
  const handlePredictionSubmit = useCallback((optIdx: number) => {
    setPredictionSelected(optIdx);
    setPredictionSubmitted(true);
    const currentQ = PREDICTION_QUESTIONS[currentPredictionIdx];
    const isCorrect = optIdx === currentQ.correctIndex;
    setPredictionResults(prev => ({ ...prev, [currentPredictionIdx]: isCorrect }));
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Smart prediction! Now let us verify it experimentally in the lab.' : 'Interesting hypothesis! Test it directly in the interactive simulation.');
  }, [currentPredictionIdx]);

  const handleNextPrediction = useCallback(() => {
    if (currentPredictionIdx < PREDICTION_QUESTIONS.length - 1) {
      setCurrentPredictionIdx(prev => prev + 1);
      setPredictionSelected(null);
      setPredictionSubmitted(false);
      audioManager.play('tap');
    } else {
      setPhase('explore');
      audioManager.play('whoosh');
      speechManager.speak('Welcome to the interactive exploration lab. Manipulate the models to verify your predictions.');
    }
  }, [currentPredictionIdx]);

  // ─── PHASE NAVIGATION CALLBACKS ───
  const handleAdvanceToPrediction = useCallback(() => {
    setPhase('prediction');
    audioManager.play('whoosh');
    speechManager.speak('Make your economic predictions first, then verify them in the lab.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate the models to understand economic mechanisms.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test your intuition freely in the sandbox without scoring pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the adaptive challenge series.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Observe how welfare reacts to steep work hours.');
  }, []);

  // ─── COMPLETION CALLBACK ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Economic Systems and Concepts simulation.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE CALLBACK ───
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

  // ─── AUTO-HINT INACTIVITY TIMER CALLBACK ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── ANSWER SUBMISSION & VALIDATION CALLBACK ───
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
      speechManager.speak('Correct analysis! Well done.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(getMasteryLevel(bktStateRef.current.pKnown)));
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
        speechManager.speak('Let us review the step-by-step economic principles.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── DRAG AND DROP EVENT HANDLERS ───
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
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── 2D CANVAS ANIMATION (Background Economic Pulse) ───
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
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 15 + Math.sin((x * 0.03) + (frame * 0.05)) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans relative overflow-hidden">
      {/* Background Pulse Canvas */}
      <canvas ref={canvasRef} width={600} height={30} className="w-full h-8 absolute top-0 left-0 pointer-events-none opacity-40" />

      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between border-b border-slate-800/80 pb-4 mb-6 relative z-10 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-600 to-emerald-500 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/20"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-950/60 px-2.5 py-0.5 rounded-full border border-gold-800/50">
                Class 9 ICSE • Commerce
              </span>
              <span className="text-xs text-slate-400">c9_econ_011 — 020</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Indicators */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap">
          {(['discovery', 'prediction', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'complete' && phase !== 'complete') return;
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p === 'prediction' ? '🔮 Predict' : p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Narrative Scenario Box */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-2xl border border-gold-700/40 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <span className="text-3xl p-3 bg-gold-900/60 rounded-xl border border-gold-500/30">🏛️</span>
                <div>
                  <h2 className="text-xl font-black text-gold-300">{SCENARIO.title}</h2>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">{SCENARIO.intro}</p>
                  <p className="text-xs text-gold-400/90 font-semibold mt-3 bg-gold-950/90 p-2.5 rounded-lg border border-gold-800/40">
                    💡 Mission: {SCENARIO.context}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Discovery Hook Question */}
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/50">
                Curiosity Hook • Pre-Exploration
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-4 leading-snug">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all flex items-start gap-3 border ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-700/80 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{discoveryCorrect ? '🎯' : '💡'}</span>
                    <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                      {discoveryCorrect
                        ? 'Spot on! Growth ≠ Development. High GDP can coexist with low HDI per person.'
                        : DISCOVERY_QUESTION.hintAfter}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToPrediction}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-gold-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/30 flex items-center gap-2"
                  >
                    Next: Make Economic Predictions 🔮 →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* ─── PHASE: PREDICTION (Brilliant.org Predict-Then-Check Pattern) ─── */}
        {phase === 'prediction' && (
          <motion.section
            key="prediction-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-purple-950/60 via-slate-900 to-gold-950/60 rounded-2xl border border-purple-700/40 shadow-xl">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-widest bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
                  Brilliant Predict-Then-Check • Question {currentPredictionIdx + 1} of {PREDICTION_QUESTIONS.length}
                </span>
                <span className="text-xs text-purple-400 font-semibold">Formulate intuition before testing</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                {PREDICTION_QUESTIONS[currentPredictionIdx].question}
              </h3>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {PREDICTION_QUESTIONS[currentPredictionIdx].options.map((opt, optIdx) => (
                  <motion.button
                    key={optIdx}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => !predictionSubmitted && handlePredictionSubmit(optIdx)}
                    disabled={predictionSubmitted}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all flex items-start gap-3 border ${
                      predictionSubmitted
                        ? optIdx === PREDICTION_QUESTIONS[currentPredictionIdx].correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : optIdx === predictionSelected
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>

              {predictionSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                >
                  <div className="p-3 bg-purple-950/50 rounded-lg border border-purple-800/50 flex items-start gap-2">
                    <span className="text-lg">🔬</span>
                    <div>
                      <strong className="text-purple-300 text-xs block uppercase font-black">Interactive Verification Instruction:</strong>
                      <p className="text-xs text-slate-200 mt-0.5">{PREDICTION_QUESTIONS[currentPredictionIdx].verifyInstruction}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-gold-400">Economic Rationale: </strong>
                    {PREDICTION_QUESTIONS[currentPredictionIdx].explanation}
                  </p>

                  <div className="flex justify-end pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextPrediction}
                      className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-gold-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 flex items-center gap-2"
                    >
                      {currentPredictionIdx < PREDICTION_QUESTIONS.length - 1 ? 'Next Prediction Question →' : 'Enter Interactive Lab to Verify →'}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* ─── PHASE 2: BRILLIANT.ORG INTERACTIVE EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.section
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Exploration Slide Navigation */}
            <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-gold-950 text-gold-300 border border-gold-800/60">
                  Lab Step {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>
                <span className="text-sm font-black text-white hidden sm:inline">
                  {EXPLORATION_STEPS[currentSlide].title}
                </span>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentSlide === 0}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-200"
                >
                  ← Prev
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (currentSlide < EXPLORATION_STEPS.length - 1) {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    } else {
                      handleAdvanceToSandbox();
                    }
                  }}
                  className="px-4 py-1.5 rounded-lg bg-gold-600 hover:bg-gold-500 text-xs font-bold text-white shadow-md"
                >
                  {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Free Sandbox →' : 'Next Step →'}
                </motion.button>
              </div>
            </div>

            {/* Step Content Container */}
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800/80 shadow-xl">
              <p className="text-sm text-amber-300/90 font-medium mb-4 flex items-center gap-2 bg-amber-950/40 p-3 rounded-xl border border-amber-800/30">
                <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── SLIDE 0: WELFARE SIMULATOR (c9_econ_011) ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Weekly Work Duration:</span>
                        <span className="text-gold-400 font-black">{workHours} hrs / week</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={90}
                        step={5}
                        value={workHours}
                        onChange={(e) => {
                          setWorkHours(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Set weekly work hours"
                      />
                      <span className="text-[11px] text-slate-400">Overworked corporate banker (80+ hrs) vs balanced teacher (35 hrs)</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Environment & Clean Air Score:</span>
                        <span className="text-emerald-400 font-black">{cleanEnvScore} / 100</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        step={5}
                        value={cleanEnvScore}
                        onChange={(e) => {
                          setCleanEnvScore(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Set clean environment score"
                      />
                      <span className="text-[11px] text-slate-400">Non-material welfare: Clean drinking water, green parks, zero toxic smog</span>
                    </div>

                    <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Estimated Monthly Salary:</span>
                        <span className="font-bold text-white">₹{calculatedWelfare.baseSalary.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Material Welfare Index:</span>
                        <span className="font-bold text-gold-300">{calculatedWelfare.materialWellbeing.toFixed(0)} / 100</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Non-Material Welfare Index:</span>
                        <span className="font-bold text-emerald-300">{calculatedWelfare.nonMaterialWellbeing.toFixed(0)} / 100</span>
                      </div>
                    </div>
                  </div>

                  {/* Welfare Visual Gauges */}
                  <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-2">Multi-Representation: Marshall vs Robbins Welfare Matrix</h4>
                      <div className="space-y-3 mt-4">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gold-300 font-semibold">Material (Purchasable Goods)</span>
                            <span className="text-xs text-gold-400 font-bold">{calculatedWelfare.materialWellbeing.toFixed(0)}%</span>
                          </div>
                          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
                              animate={{ width: `${calculatedWelfare.materialWellbeing}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-emerald-300 font-semibold">Non-Material (Health, Leisure, Air)</span>
                            <span className="text-xs text-emerald-400 font-bold">{calculatedWelfare.nonMaterialWellbeing.toFixed(0)}%</span>
                          </div>
                          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                              animate={{ width: `${calculatedWelfare.nonMaterialWellbeing}%` }}
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800">
                          <div className="flex justify-between text-sm font-black mb-1">
                            <span className="text-amber-300">Composite Total Welfare Score:</span>
                            <span className="text-amber-400">{calculatedWelfare.totalWelfare} / 100</span>
                          </div>
                          <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-gold-500"
                              animate={{ width: `${calculatedWelfare.totalWelfare}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Observation Question Trigger */}
                    {workHours >= 75 && !observationAnswered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-3.5 bg-amber-950/60 rounded-xl border border-amber-800/50"
                      >
                        <p className="text-xs font-bold text-amber-200 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-2 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-200 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: 4-ENTITY CIRCULAR FLOW (c9_econ_012, c9_econ_013, c9_econ_014) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 justify-center mb-2">
                    {[
                      { id: 'households', label: '1. Households' },
                      { id: 'firms', label: '2. Firms (Private & PSUs)' },
                      { id: 'government', label: '3. Government Sector' },
                      { id: 'foreign', label: '4. Foreign Sector' }
                    ].map((ent) => (
                      <motion.button
                        key={ent.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveEntity(ent.id as 'households' | 'firms' | 'government' | 'foreign');
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          activeEntity === ent.id
                            ? 'bg-gold-600 text-white border-gold-400 shadow-lg'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {ent.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Interactive SVG Diagram for Circular Flow */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 600 340" className="w-full max-w-2xl h-auto select-none">
                      {/* Background Flow Loops */}
                      <ellipse cx="300" cy="170" rx="230" ry="120" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
                      <ellipse cx="300" cy="170" rx="170" ry="85" fill="none" stroke="#1e293b" strokeWidth="1.5" />

                      {/* Entity 1: Households (Top) */}
                      <g
                        transform="translate(230, 20)"
                        onClick={() => { setActiveEntity('households'); audioManager.play('tap'); }}
                        className="cursor-pointer"
                      >
                        <rect width="140" height="50" rx="12" fill={activeEntity === 'households' ? '#4338ca' : '#1e293b'} stroke="#6366f1" strokeWidth={activeEntity === 'households' ? 3 : 1} />
                        <text x="70" y="24" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">HOUSEHOLDS</text>
                        <text x="70" y="40" fill="#cbd5e1" textAnchor="middle" fontSize="9">Supply Factors • Consume</text>
                      </g>

                      {/* Entity 2: Firms (Bottom) */}
                      <g
                        transform="translate(230, 270)"
                        onClick={() => { setActiveEntity('firms'); audioManager.play('tap'); }}
                        className="cursor-pointer"
                      >
                        <rect width="140" height="50" rx="12" fill={activeEntity === 'firms' ? '#047857' : '#1e293b'} stroke="#10b981" strokeWidth={activeEntity === 'firms' ? 3 : 1} />
                        <text x="70" y="24" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">FIRMS (Pvt & PSUs)</text>
                        <text x="70" y="40" fill="#cbd5e1" textAnchor="middle" fontSize="9">Produce • Pay Wages/Rent</text>
                      </g>

                      {/* Entity 3: Government (Left) */}
                      <g
                        transform="translate(30, 145)"
                        onClick={() => { setActiveEntity('government'); audioManager.play('tap'); }}
                        className="cursor-pointer"
                      >
                        <rect width="130" height="50" rx="12" fill={activeEntity === 'government' ? '#b45309' : '#1e293b'} stroke="#f59e0b" strokeWidth={activeEntity === 'government' ? 3 : 1} />
                        <text x="65" y="24" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">GOVERNMENT</text>
                        <text x="65" y="40" fill="#cbd5e1" textAnchor="middle" fontSize="9">Taxes • Public Goods</text>
                      </g>

                      {/* Entity 4: Foreign Sector (Right) */}
                      <g
                        transform="translate(440, 145)"
                        onClick={() => { setActiveEntity('foreign'); audioManager.play('tap'); }}
                        className="cursor-pointer"
                      >
                        <rect width="130" height="50" rx="12" fill={activeEntity === 'foreign' ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth={activeEntity === 'foreign' ? 3 : 1} />
                        <text x="65" y="24" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">FOREIGN SECTOR</text>
                        <text x="65" y="40" fill="#cbd5e1" textAnchor="middle" fontSize="9">Exports • Imports • NRI</text>
                      </g>

                      {/* Flow Arrows & Labels */}
                      <text x="140" y="70" fill="#818cf8" fontSize="8" fontWeight="bold">Real: Labour →</text>
                      <text x="140" y="85" fill="#34d399" fontSize="8" fontWeight="bold">Money: ← Wages</text>

                      <text x="440" y="70" fill="#f59e0b" fontSize="8" fontWeight="bold">Taxes: (GST/Income) →</text>
                      <text x="440" y="85" fill="#38bdf8" fontSize="8" fontWeight="bold">← Remittances ($125B)</text>

                      <text x="140" y="260" fill="#f59e0b" fontSize="8" fontWeight="bold">Govt Purchases →</text>
                      <text x="140" y="275" fill="#34d399" fontSize="8" fontWeight="bold">← Subsidies & Infra</text>

                      <text x="440" y="260" fill="#38bdf8" fontSize="8" fontWeight="bold">Exports ($778B) →</text>
                      <text x="440" y="275" fill="#f43f5e" fontSize="8" fontWeight="bold">← Oil Imports ($170B)</text>
                    </svg>
                  </div>

                  {/* Entity Focus Details Card */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
                    {activeEntity === 'households' && (
                      <p className="text-gold-200">
                        <strong className="text-white">Households (27+ crore in India):</strong> Primary suppliers of factor inputs (Land, Labour, Capital). They earn factor incomes (wages, rent, dividends), consume goods (ITC, HUL), save in bank FDs (~30.2% saving rate), and pay Income Tax & GST.
                      </p>
                    )}
                    {activeEntity === 'firms' && (
                      <p className="text-emerald-200">
                        <strong className="text-white">Firms (6.3+ crore MSMEs & Giants):</strong> Transform factors of production into goods/services for sale at a profit. Includes private enterprises (Tata Motors, Infosys) and Public Sector Undertakings (ONGC, SAIL, NTPC).
                      </p>
                    )}
                    {activeEntity === 'government' && (
                      <p className="text-amber-200">
                        <strong className="text-white">Government Sector (Centre + 28 States + Local Bodies):</strong> Performs 4 roles: (1) Public Goods (Defence ₹6.2L cr, NHAI Highways), (2) Redistribution (MGNREGA ₹86k cr, PDS foodgrain), (3) Regulation (RBI, SEBI, CCI), (4) Macro Stabilization.
                      </p>
                    )}
                    {activeEntity === 'foreign' && (
                      <p className="text-gold-200">
                        <strong className="text-white">Foreign Sector (Rest of World):</strong> Interacts via Exports ($778B goods & services in 2023-24), Imports ($170B crude oil from Iraq/Saudi), inward NRI Remittances ($125B World Bank #1), and FDI inflows ($71B).
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: ECONOMIC SYSTEMS SPECTRUM (c9_econ_015, c9_econ_016, c9_econ_017) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
                      <span>Economic Structure Model:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${
                        mixedEcoSlider < 30 ? 'bg-gold-950 text-gold-400 border border-gold-800' :
                        mixedEcoSlider > 70 ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                        'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {mixedEcoSlider < 30 ? 'Pure Capitalism (USA)' : mixedEcoSlider > 70 ? 'Command Socialism (USSR Gosplan)' : 'Mixed Economy (India Post-1991)'}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={mixedEcoSlider}
                      onChange={(e) => {
                        setMixedEcoSlider(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-gold-500 cursor-pointer"
                      aria-label="Set economic systems balance"
                    />

                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>0% (Market Price Mechanism)</span>
                      <span className="font-bold text-emerald-400">50% (Public-Private Coexistence)</span>
                      <span>100% (Central Planning Quotas)</span>
                    </div>
                  </div>

                  {/* Systems Comparison Table */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className={`p-4 rounded-xl border transition-all ${mixedEcoSlider < 35 ? 'bg-gold-950/60 border-gold-500' : 'bg-slate-900/40 border-slate-800 opacity-60'}`}>
                      <h4 className="font-bold text-gold-300 text-sm mb-1.5">Capitalism (USA)</h4>
                      <ul className="space-y-1 text-slate-300">
                        <li>• Means of production: <strong>Private Ownership</strong></li>
                        <li>• Driver: <strong>Profit Motive & Consumer Sovereignty</strong></li>
                        <li>• Price determined by: <strong>Demand & Supply (Invisible Hand)</strong></li>
                        <li>• State: <strong>Minimal (Regulator, e.g. SEC, FDA)</strong></li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-xl border transition-all ${mixedEcoSlider >= 35 && mixedEcoSlider <= 65 ? 'bg-emerald-950/60 border-emerald-500' : 'bg-slate-900/40 border-slate-800 opacity-60'}`}>
                      <h4 className="font-bold text-emerald-300 text-sm mb-1.5">Mixed Economy (India)</h4>
                      <ul className="space-y-1 text-slate-300">
                        <li>• Coexistence: <strong>Public (SBI, SAIL) & Private (HDFC, Tata)</strong></li>
                        <li>• Strategic goods: <strong>Railways & Nuclear in State hands</strong></li>
                        <li>• Consumer goods: <strong>Market Competition & Efficiency</strong></li>
                        <li>• Constitution: <strong>Directive Principles (Art. 39)</strong></li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-xl border transition-all ${mixedEcoSlider > 65 ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900/40 border-slate-800 opacity-60'}`}>
                      <h4 className="font-bold text-rose-300 text-sm mb-1.5">Socialism (USSR Gosplan)</h4>
                      <ul className="space-y-1 text-slate-300">
                        <li>• Means of production: <strong>State Collective Ownership</strong></li>
                        <li>• Driver: <strong>Social Welfare over Profit</strong></li>
                        <li>• What to produce: <strong>Central Planning Quotas (Five-Year Plans)</strong></li>
                        <li>• Limitation: <strong>Information & Shortage bottlenecks</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: GROWTH VS DEVELOPMENT (c9_econ_018, c9_econ_019) ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Real GDP Annual Growth Rate:</span>
                        <span className="text-gold-400 font-black">{growthGdpRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={12}
                        step={0.5}
                        value={growthGdpRate}
                        onChange={(e) => {
                          setGrowthGdpRate(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Set real GDP growth rate"
                      />
                      <span className="text-[11px] text-slate-400">Quantitative increase in goods & services output</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Public Health & Education Spending:</span>
                        <span className="text-emerald-400 font-black">{socialInvestRate}% of GDP</span>
                      </div>
                      <input
                        type="range"
                        min={1.0}
                        max={10.0}
                        step={0.5}
                        value={socialInvestRate}
                        onChange={(e) => {
                          setSocialInvestRate(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Set social investment share"
                      />
                      <span className="text-[11px] text-slate-400">India spends ~2.1% on health; WHO recommends 4-5%</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Projected GNI / Capita:</span>
                        <span className="font-bold text-white">${calculatedHdiMetrics.gniPerCapitaUsd.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Life Expectancy at Birth:</span>
                        <span className="font-bold text-emerald-300">{calculatedHdiMetrics.lifeExpectancy} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Mean Schooling:</span>
                        <span className="font-bold text-gold-300">{calculatedHdiMetrics.meanSchoolingYears} years</span>
                      </div>
                    </div>
                  </div>

                  {/* Recharts Live Chart Comparison */}
                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 mb-2">Developed (USA) vs Developing (India) Benchmark</h4>
                      <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={economicComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="indicator" stroke="#94a3b8" fontSize={9} />
                            <YAxis stroke="#94a3b8" fontSize={9} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="USA" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="India" fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="p-2.5 bg-gold-950/40 rounded-lg border border-gold-800/40 mt-2 text-center">
                      <span className="text-xs text-gold-300 font-bold">Simulated HDI Score: {calculatedHdiMetrics.simulatedHdi} (Rank ~{calculatedHdiMetrics.hdiRank}/193)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: RESOURCE SCARCITY & CAPITAL (c9_econ_020) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xl">🌿</span>
                      <h4 className="font-bold text-white text-sm mt-1 mb-1">1. Natural Resources</h4>
                      <p className="text-slate-400 leading-relaxed">
                        Gifts of nature: Land (India has 2.4% world land, 18% world population), Water, Minerals.<br/>
                        • <strong>Renewable:</strong> Bhadla Solar (2,245 MW)<br/>
                        • <strong>Non-Renewable:</strong> Jharia Coal, Mumbai High Petroleum
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xl">👷</span>
                      <h4 className="font-bold text-white text-sm mt-1 mb-1">2. Human Resources</h4>
                      <p className="text-slate-400 leading-relaxed">
                        Physical & mental labour + Entrepreneurship (Kiran Mazumdar-Shaw, Biocon).<br/>
                        • <strong>Paradox:</strong> ~471M workforce, but only 4-5% have formal vocational skills!
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xl">🏭</span>
                      <h4 className="font-bold text-white text-sm mt-1 mb-1">3. Man-made Capital</h4>
                      <p className="text-slate-400 leading-relaxed">
                        Produced goods used to produce other goods: Bhakra Nangal Dam (irrigates 40L hectares), Mahindra tractors, CNC machines.<br/>
                        • <strong>Limitation:</strong> Requires prior savings and investment time.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-gold-400">Skill India Mission Simulator:</span>
                      <p className="text-xs text-slate-300">Upgrade vocational training percentage from 5% to 40%</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={5}
                        max={60}
                        step={5}
                        value={skilledVocationalShare}
                        onChange={(e) => {
                          setSkilledVocationalShare(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-32 accent-gold-500 cursor-pointer"
                        aria-label="Set vocational skill percentage"
                      />
                      <span className="text-xs font-bold text-gold-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                        {skilledVocationalShare}% Skilled
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX (No Grading) ─── */}
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-5 bg-gradient-to-r from-slate-900 via-gold-950 to-slate-900 rounded-2xl border border-gold-700/50 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                  Free Sandbox • Macroeconomic Equilibrium Tester
                </span>
                <h3 className="text-lg font-bold text-white mt-2">Adjust Leakages (S + T + M) vs Injections (I + G + X)</h3>
                <p className="text-xs text-slate-300 mt-1">Discover what happens when government spending, investments, or import dependencies change.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-gold-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            {/* Sandbox Macro Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/90 p-6 rounded-2xl border border-slate-800">
              {/* Leakages Controls */}
              <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-rose-900/40">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <span>📉</span> Leakages (Withdrawals from Flow)
                </h4>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Household Savings (S):</span>
                    <span className="text-rose-300 font-bold">₹{sandboxLeakages.s}k cr</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    value={sandboxLeakages.s}
                    onChange={(e) => setSandboxLeakages(prev => ({ ...prev, s: Number(e.target.value) }))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Taxes Collected (T):</span>
                    <span className="text-rose-300 font-bold">₹{sandboxLeakages.t}k cr</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={40}
                    value={sandboxLeakages.t}
                    onChange={(e) => setSandboxLeakages(prev => ({ ...prev, t: Number(e.target.value) }))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Merchandise Imports (M):</span>
                    <span className="text-rose-300 font-bold">₹{sandboxLeakages.m}k cr</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={40}
                    value={sandboxLeakages.m}
                    onChange={(e) => setSandboxLeakages(prev => ({ ...prev, m: Number(e.target.value) }))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div className="pt-2 border-t border-rose-900/30 text-xs font-bold text-rose-300 flex justify-between">
                  <span>Total Leakages (S + T + M):</span>
                  <span>₹{circularFlowBalance.totalLeakages}k cr</span>
                </div>
              </div>

              {/* Injections Controls */}
              <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-emerald-900/40">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span>📈</span> Injections (Additions to Flow)
                </h4>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Domestic Investment (I):</span>
                    <span className="text-emerald-300 font-bold">₹{sandboxInjections.i}k cr</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    value={sandboxInjections.i}
                    onChange={(e) => setSandboxInjections(prev => ({ ...prev, i: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Govt Expenditure (G):</span>
                    <span className="text-emerald-300 font-bold">₹{sandboxInjections.g}k cr</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={40}
                    value={sandboxInjections.g}
                    onChange={(e) => setSandboxInjections(prev => ({ ...prev, g: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Merchandise Exports (X):</span>
                    <span className="text-emerald-300 font-bold">₹{sandboxInjections.x}k cr</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={40}
                    value={sandboxInjections.x}
                    onChange={(e) => setSandboxInjections(prev => ({ ...prev, x: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="pt-2 border-t border-emerald-900/30 text-xs font-bold text-emerald-300 flex justify-between">
                  <span>Total Injections (I + G + X):</span>
                  <span>₹{circularFlowBalance.totalInjections}k cr</span>
                </div>
              </div>
            </div>

            {/* Sandbox Output Status Card */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-300">
                Macroeconomic Flow Gap: <strong className={circularFlowBalance.gap === 0 ? 'text-emerald-400' : 'text-amber-400'}>{circularFlowBalance.gap > 0 ? `+₹${circularFlowBalance.gap}k cr` : `₹${circularFlowBalance.gap}k cr`}</strong>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-950 font-bold text-slate-200 border border-slate-700">
                Status: {circularFlowBalance.status}
              </span>
            </div>
          </motion.section>
        )}

        {/* ─── PHASE 4: CHALLENGE STAGE (Adaptive BKT & 20+ Questions) ─── */}
        {phase === 'challenge' && (
          <motion.section
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Challenge Progress Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs font-bold text-gold-400 bg-gold-950 px-2.5 py-0.5 rounded-full border border-gold-800/60 uppercase">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                    difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    difficulty === 'standard' ? 'bg-gold-950 text-gold-400 border border-gold-800' :
                    'bg-purple-950 text-purple-400 border border-purple-800'
                  }`}
                >
                  {difficulty} TIER
                </motion.span>
                <span className="text-xs text-slate-400">Mastery: <strong className="text-white capitalize">{masteryLevel}</strong></span>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>

            {/* Challenge Interactive Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-6 rounded-2xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Node ID: {challenge.nodeId}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
                {challenge.question}
              </h3>

              {/* 1. MCQ / Classify / Distinguish / Match */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-start gap-3 border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. Drag-Label Diagram */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  {/* Palette */}
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 self-center mr-2">Drag Entities:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow-sm"
                      >
                        ⠿ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Drop Targets SVG Diagram */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-lg h-auto select-none">
                      {/* Top Box: Households */}
                      <rect x="180" y="10" width="140" height="45" rx="8" fill="#1e293b" stroke="#6366f1" strokeDasharray="4 4" />
                      <text x="250" y="38" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                        {droppedLabels.box_top || '[ Drop: Top Node ]'}
                      </text>
                      <rect x="180" y="10" width="140" height="45" rx="8" fill="transparent"
                        onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('box_top')} className="cursor-pointer" />

                      {/* Bottom Box: Firms */}
                      <rect x="180" y="180" width="140" height="45" rx="8" fill="#1e293b" stroke="#10b981" strokeDasharray="4 4" />
                      <text x="250" y="208" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                        {droppedLabels.box_bottom || '[ Drop: Bottom Node ]'}
                      </text>
                      <rect x="180" y="180" width="140" height="45" rx="8" fill="transparent"
                        onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('box_bottom')} className="cursor-pointer" />

                      {/* Left Box: Government */}
                      <rect x="20" y="95" width="130" height="45" rx="8" fill="#1e293b" stroke="#f59e0b" strokeDasharray="4 4" />
                      <text x="85" y="123" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                        {droppedLabels.box_left || '[ Drop: Left Node ]'}
                      </text>
                      <rect x="20" y="95" width="130" height="45" rx="8" fill="transparent"
                        onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('box_left')} className="cursor-pointer" />

                      {/* Right Box: Foreign Sector */}
                      <rect x="350" y="95" width="130" height="45" rx="8" fill="#1e293b" stroke="#38bdf8" strokeDasharray="4 4" />
                      <text x="415" y="123" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                        {droppedLabels.box_right || '[ Drop: Right Node ]'}
                      </text>
                      <rect x="350" y="95" width="130" height="45" rx="8" fill="transparent"
                        onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('box_right')} className="cursor-pointer" />
                    </svg>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check Entity Placement
                  </motion.button>
                </div>
              )}

              {/* 3. Drag-Sort Challenge */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <span className="text-xs text-slate-400">Drag or use arrow buttons to arrange in correct chronological/structural sequence:</span>
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
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
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-200 cursor-grab"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-gold-400">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleSortMove(displayIdx, Math.max(0, displayIdx - 1))}
                          disabled={displayIdx === 0}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-300 font-bold"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleSortMove(displayIdx, Math.min(challenge.sortItems!.length - 1, displayIdx + 1))}
                          disabled={displayIdx === 0}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-300 font-bold"
                        >
                          ▼
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check Order
                  </motion.button>
                </div>
              )}

              {/* 4. Numeric Challenge */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter calculation result"
                      className="px-4 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500 w-48"
                      aria-label="Enter numeric answer"
                    />
                    <span className="text-sm font-bold text-slate-300">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || numericInput === ''}
                      className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow"
                    >
                      Verify Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. Construct Challenge */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (!constructParts.includes(part)) {
                            setConstructParts(prev => [...prev, part]);
                            audioManager.play('tap');
                          }
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-200 border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-gold-900/80 text-gold-200 border border-gold-700 rounded-lg text-xs font-semibold flex items-center gap-2"
                      >
                        {part}
                        <button
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 font-black ml-1"
                        >
                          ✕
                        </button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click elements above to assemble production inputs</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Validate Assembly
                  </motion.button>
                </div>
              )}

              {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION CARD ─── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
                >
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                    Step-by-Step Economic Walkthrough
                  </span>

                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((stepSentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-amber-100/90 leading-relaxed"
                    >
                      <strong className="text-amber-400">{idx + 1}.</strong> {stepSentence}{!stepSentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                      >
                        Reveal Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Simulation →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}

        {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
        {phase === 'complete' && (
          <motion.section
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Completion Hero Banner */}
            <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-gold-950 rounded-2xl border border-emerald-600/50 text-center space-y-3">
              <span className="text-4xl">🏆</span>
              <h2 className="text-2xl font-black text-white">Mastery Simulation Complete!</h2>
              <p className="text-sm text-emerald-300 font-semibold">
                Score: {Math.max(0, 100 - errors * 5)}% • Accuracy: {scoreBreakdown.correct} / {scoreBreakdown.total}
              </p>
              <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/40 text-xs text-slate-200">
                Final BKT Mastery Status: <strong className="text-emerald-400 capitalize">{masteryLevel}</strong>
              </div>
            </div>

            {/* Personalized Motivational Feedback */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-1">Advisor Evaluation Summary:</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {errors === 0
                  ? 'PERFECT SCORE! You have mastered economic systems, the 4-entity circular flow, and the critical distinction between growth and multidimensional development.'
                  : errors <= 3
                  ? 'Outstanding analytical precision! Review the subtle nuances of socialist informational bottlenecks and circular leakages below.'
                  : errors <= 7
                  ? 'Strong foundational understanding! Re-examine the multi-representation labs to solidify the leakages-injections identity.'
                  : 'Every error is a stepping stone. Review the targeted misconception profiles below and retry the challenge series!'}
              </p>
            </div>

            {/* Targeted Misconception Profile Tracker */}
            {hitMisconceptions.length > 0 && (
              <div className="p-4 bg-rose-950/40 rounded-xl border border-rose-900/60 space-y-3">
                <h3 className="text-xs font-bold text-rose-300 uppercase tracking-widest flex items-center gap-2">
                  <span>⚠️</span> Identified Misconception Profile & Corrections:
                </h3>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-lg border border-rose-800/40 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ ICSE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Spaced Repetition (SM-2) Schedule Visibility */}
            <div className="p-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 rounded-2xl border-2 border-amber-500/60 text-xs shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-900/60 px-2.5 py-0.5 rounded-full border border-amber-700/50">
                    Spaced Repetition System (SRS) Schedule
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">Next Review Recommendation</h4>
                  <p className="text-slate-300">
                    Based on your performance ({errors} error{errors === 1 ? '' : 's'}), your optimal memory retention interval is:
                  </p>
                </div>
                <div className="text-center px-4 py-3 bg-amber-500/20 rounded-xl border border-amber-500/40">
                  <span className="text-2xl font-black text-amber-300 block">
                    {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-400">
                    {errors === 0 ? '0 errors (Mastered)' : errors <= 3 ? '1-3 errors (Consolidating)' : '4+ errors (Reinforcement required)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Real-World Activity Completion Arc */}
            <div className="p-5 bg-gold-950/50 rounded-xl border border-gold-800/60 space-y-2">
              <h3 className="text-sm font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-gold-400 font-bold">{i + 1}.</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Series Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C9_EconomicsBasicEconomicTermsSim;
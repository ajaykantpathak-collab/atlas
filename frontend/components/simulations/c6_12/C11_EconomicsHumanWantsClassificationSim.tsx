'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';

// Node IDs as string literals
const NODE_C11_ECON_011 = 'c11_econ_011';
const NODE_C11_ECON_012 = 'c11_econ_012';
const NODE_C11_ECON_013 = 'c11_econ_013';
const NODE_C11_ECON_014 = 'c11_econ_014';
const NODE_C11_ECON_015 = 'c11_econ_015';
const NODE_C11_ECON_016 = 'c11_econ_016';
const NODE_C11_ECON_017 = 'c11_econ_017';
const NODE_C11_ECON_018 = 'c11_econ_018';
const NODE_C11_ECON_019 = 'c11_econ_019';
const NODE_C11_ECON_020 = 'c11_econ_020';

const ALL_NODE_IDS = [
  NODE_C11_ECON_011,
  NODE_C11_ECON_012,
  NODE_C11_ECON_013,
  NODE_C11_ECON_014,
  NODE_C11_ECON_015,
  NODE_C11_ECON_016,
  NODE_C11_ECON_017,
  NODE_C11_ECON_018,
  NODE_C11_ECON_019,
  NODE_C11_ECON_020,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Economic Frontier: The Transformation of Bharatpur',
  intro: 'Welcome, Chief Economic Advisor! The emerging district of Bharatpur has finite land, labour, and capital, but its citizens have unlimited wants. From rationing food grains under NFSA to choosing between automated factories and handloom clusters, every decision has an opportunity cost.',
  context: 'Your mission is to guide Bharatpur from scarcity to prosperity: classify wants, organise the four factors of production, balance diminishing utility, navigate the Production Possibility Frontier, and establish fair market policies.',
};

// Discovery Question
const DISCOVERY_QUESTION = {
  question: 'Bharatpur has ₹100 crore in development budget. If the district magistrate spends ₹60 crore on building a high-tech expressway instead of rural primary healthcare centres, what is the economic sacrifice termed?',
  options: [
    'Sunk Cost — money that cannot be recovered',
    'Opportunity Cost — the next-best alternative health benefits foregone',
    'Marginal Utility — the extra satisfaction from the expressway',
    'Accounting Deficit — the remaining ₹40 crore balance',
  ],
  correctIndex: 1,
  hintAfter: 'Every choice with scarce resources creates an opportunity cost — the value of the next best alternative given up!',
};

// Brilliant.org 'What do you notice?' Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    prompt: 'What do you notice about the relationship between Total Utility (TU) and Marginal Utility (MU) on the graph?',
    observableOptions: [
      'Total Utility reaches its highest peak at the exact point where Marginal Utility hits zero (MU = 0)',
      'Total Utility and Marginal Utility both increase infinitely at the same pace',
      'Total Utility decreases while Marginal Utility is still positive',
      'Marginal Utility increases with every additional unit of consumption',
    ],
    correctIndex: 0,
    explanation: 'Observation confirms that Total Utility peaks at the point of saturation where MU = 0. Once MU turns negative, Total Utility begins to fall.',
  },
  {
    id: 'obs_2',
    prompt: 'When you upgrade Agricultural Technology alone, what do you notice about the Production Possibility Curve (PPC)?',
    observableOptions: [
      'The curve rotates outward only on the Foodgrains axis while the Machinery intercept stays fixed',
      'The entire frontier shifts outward equally along both axes',
      'The curve shifts inward toward the origin due to technological disruption',
      'The curve changes into a straight diagonal line',
    ],
    correctIndex: 0,
    explanation: 'Sector-specific technological progress produces an asymmetric rotation pivoting around the unaffected good, rather than a parallel shift.',
  },
];

// Reflection Prompts for post-completion
const REFLECTION_PROMPTS = [
  {
    id: 'refl_1',
    icon: '💡',
    question: 'What was the most surprising thing you learned about human wants and diminishing utility?',
    placeholder: 'e.g., How marginal utility turns negative and causes total satisfaction to fall after saturation...',
  },
  {
    id: 'refl_2',
    icon: '🗣️',
    question: 'How would you explain the Production Possibility Curve (PPC) and Opportunity Cost to a friend?',
    placeholder: 'e.g., Because resources are specialized, producing more of one good requires sacrificing increasingly larger amounts of another...',
  },
  {
    id: 'refl_3',
    icon: '🌐',
    question: 'Where in real life might you observe the four factors of production working together?',
    placeholder: 'e.g., A local bakery where land is shop rent, labour is the bakers, capital is the commercial ovens, and the owner is the entrepreneur...',
  },
];

// Challenges Interface
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

// 22 Comprehensive Challenges
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_ECON_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under India\'s GST tax slabs, essential food grains (rice, wheat) have 0% GST, while luxury cars have 28% GST + cess. This tax structure directly mirrors which classification of human wants?',
    options: [
      'Classification by Nature (Individual vs Collective)',
      'Classification by Time (Present vs Future)',
      'Classification by Urgency (Necessities, Comforts, Luxuries)',
      'Classification by Excludability (Economic vs Non-economic)',
    ],
    correctIndex: 2,
    explanation: 'The GST Council classifies goods by urgency: 0% on necessities (food grains, NFSA staples), 12-18% on comforts (fans, phones), and 28% on luxuries (supercars, tobacco).',
    hints: [
      'Think about how basic survival items differ from high-end status symbols.',
      'Necessities keep us alive, comforts make life easier, and luxuries are high-status non-essentials.',
      'The category is Urgency (Necessities vs Comforts vs Luxuries).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_ECON_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A software engineer at TCS receives ₹85,000/month as fixed wages, while an entrepreneur launching a tech startup earns what type of reward?',
    options: [
      'Contractual Interest on bank deposits',
      'Economic Rent on patented software',
      'Residual Profit (or loss) after paying all costs',
      'Fixed Salary guaranteed by government',
    ],
    correctIndex: 2,
    explanation: 'The entrepreneur is the risk-bearer and organiser whose reward is residual profit: Total Revenue − Total Costs (Rent + Wages + Interest). Unlike labour, profit is not guaranteed and can be negative.',
    hints: [
      'Labour gets wages and capital gets interest.',
      'The entrepreneur gets whatever remains after paying all factor inputs.',
      'The residual income after all expenses is Profit.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_ECON_013,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A student consumes samosas. Total Utility (TU) at 3 samosas is 27 utils, and at 4 samosas it is 31 utils. What is the Marginal Utility (MU) of the 4th samosa?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'utils',
    explanation: 'Marginal Utility MU(n) = TU(n) − TU(n−1) = 31 − 27 = 4 utils.',
    hints: [
      'Use the formula: MU of 4th unit = TU(4) − TU(3).',
      'Subtract the total utility of 3 samosas (27) from 4 samosas (31).',
      '31 − 27 = 4 utils.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_ECON_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'At the 5th glass of lassi on a hot afternoon in Jaipur, a student finds Marginal Utility (MU) is exactly 0. What does this indicate about Total Utility (TU)?',
    options: [
      'Total Utility is at its minimum',
      'Total Utility is zero',
      'Total Utility is at its maximum (Saturation Point)',
      'Total Utility is falling rapidly into disutility',
    ],
    correctIndex: 2,
    explanation: 'When MU = 0, the consumer has reached the Saturation Point. Total Utility reaches its peak. Consuming beyond this point yields negative MU (disutility) and causes TU to decline.',
    hints: [
      'As long as MU is positive, TU increases. When MU becomes 0, no additional satisfaction is added.',
      'Think of the peak of the inverted-U curve of Total Utility.',
      'MU = 0 marks the maximum point of Total Utility (Saturation).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_ECON_018,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each production point to its correct economic status on the Production Possibility Curve (PPC) diagram.',
    dragItems: [
      { label: 'Point A (On Curve)', targetId: 'target_on' },
      { label: 'Point B (Inside Curve)', targetId: 'target_inside' },
      { label: 'Point C (Outside Curve)', targetId: 'target_outside' },
    ],
    correctMapping: {
      target_on: 'Point A (On Curve)',
      target_inside: 'Point B (Inside Curve)',
      target_outside: 'Point C (Outside Curve)',
    },
    explanation: 'Points ON the PPC represent full & efficient resource utilisation. Points INSIDE represent unemployment or underutilisation (inefficient). Points OUTSIDE are unattainable with current technology and resources.',
    hints: [
      'The boundary line itself represents maximum possible output (efficient).',
      'Idle factories like during COVID-19 lie inside the boundary.',
      'Points beyond the frontier cannot be achieved without economic growth or technological shift.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_ECON_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under MGNREGA, the Indian government mandates a 60:40 wage-to-material expenditure ratio for rural road works. Which fundamental problem of an economy does this policy directly address?',
    options: [
      'What to Produce — choosing between roads and schools',
      'How to Produce — mandating labour-intensive over capital-intensive techniques',
      'For Whom to Produce — allocating cars to urban elites',
      'When to Produce — shifting consumption from present to future',
    ],
    correctIndex: 1,
    explanation: 'The 60:40 ratio forces contractors to hire manual rural workers (labour-intensive technique) rather than relying exclusively on bulldozers and heavy machinery (capital-intensive technique), directly solving "How to Produce".',
    hints: [
      'Does this rule choose the product itself, or the method/technique of making it?',
      'Labour-intensive vs Capital-intensive is the choice of technique.',
      'Choice of technique is the "How to Produce" problem.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_ECON_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An economy produces Foodgrains and Steel. Moving from Point X to Point Y, Steel production rises from 10 to 18 million tonnes, while Foodgrain production falls from 95 to 85 million tonnes. Calculate the Marginal Opportunity Cost (MOC) of Steel.',
    correctAnswer: 1.25,
    tolerance: 0.05,
    unit: 'tonnes foodgrain/tonne steel',
    explanation: 'MOC = ΔFoodgrains (sacrifice) / ΔSteel (gain) = (95 − 85) / (18 − 10) = 10 / 8 = 1.25 tonnes of foodgrain sacrificed per tonne of steel gained.',
    hints: [
      'Formula: MOC = Loss in Good Y / Gain in Good X.',
      'Loss in foodgrains = 95 − 85 = 10. Gain in steel = 18 − 10 = 8.',
      'Divide 10 by 8 to get 1.25.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_ECON_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The introduction of Norman Borlaug and M.S. Swaminathan\'s High Yielding Variety (HYV) dwarf wheat seeds in Punjab doubled wheat yields without directly altering cotton harvesting technology. On a Wheat-Cotton PPC, this causes:',
    options: [
      'A parallel outward shift of the entire curve along both axes',
      'An outward rotation pivoting around the unchanged Cotton intercept',
      'An inward shift due to soil degradation',
      'A movement from a point inside to a point on the curve',
    ],
    correctIndex: 1,
    explanation: 'When technology improves in ONLY one sector, only that sector\'s maximum intercept increases. The curve pivots or rotates outward on the Wheat axis while Cotton remains fixed.',
    hints: [
      'Does the technology improve both goods or only wheat?',
      'If only one intercept changes while the other stays fixed, the curve rotates.',
      'It is an outward rotation along the Wheat axis.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_ECON_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Punjab produces 4,371 kg of rice per hectare (high technical yield), but heavy water extraction depletes the water table by 1 metre per year in semi-arid zones. How do economists evaluate this?',
    options: [
      'It is both productively efficient and allocatively efficient',
      'It is productively efficient (high output/ha) but allocatively inefficient (unaccounted environmental cost)',
      'It is productively inefficient because it wastes water',
      'It represents Pareto optimality with zero externalities',
    ],
    correctIndex: 1,
    explanation: 'Productive efficiency means getting maximum output from inputs (high yield). Allocative efficiency requires producing what is socially optimal considering all social costs and long-term sustainability.',
    hints: [
      'Productive efficiency looks at output per input.',
      'Allocative efficiency considers social welfare, future generations, and true resource costs.',
      'Punjab achieves high yield (productive efficiency) but causes groundwater depletion (allocative inefficiency).',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_ECON_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is considered the core coordinating mechanism of a pure capitalist economy according to Adam Smith?',
    options: [
      'Central Planning Commission 5-Year Directives',
      'The Price Mechanism driven by the Invisible Hand and profit motive',
      'Mandatory Public Distribution Ration Cards',
      'Universal basic factor wage caps',
    ],
    correctIndex: 1,
    explanation: 'In a capitalist economy, the Price Mechanism (forces of demand and supply) acts as the "invisible hand" allocating resources based on consumer sovereignty and profitability.',
    hints: [
      'Capitalism relies on decentralised markets, not government planning.',
      'Prices signal what to produce and what to buy.',
      'It is the Price Mechanism (Invisible Hand).',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_ECON_012,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of factor payments and income calculation in correct economic order for a manufacturing firm.',
    sortItems: [
      'Calculate Total Sales Revenue from output',
      'Pay contractual Rent to landowner and Interest to bank',
      'Pay contractual Wages to factory labourers',
      'Residual balance accrues as Profit or Loss to Entrepreneur',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Revenue is earned first. Contractual obligations (Rent, Interest, Wages) must be paid next. The entrepreneur takes the final residual reward: Profit = Revenue − (Rent + Wages + Interest).',
    hints: [
      'Start with the gross money coming in (Revenue).',
      'Fixed and contractual factor costs must be paid before the owner keeps anything.',
      'The residual remaining at the very end is the entrepreneur\'s profit.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_ECON_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following scenarios would directly VIOLATE the assumptions of the Law of Diminishing Marginal Utility?',
    options: [
      'A consumer drinks 5 identical standard cups of tea continuously within 30 minutes',
      'A stamp collector acquires a 100th rare postal stamp that completes an antique set',
      'A hungry person consumes equal-sized rotis at lunch',
      'A student listens to a recorded lecture with constant focus',
    ],
    correctIndex: 1,
    explanation: 'Hobbies, rare collections, and addictive goods are classic exceptions because the goods are non-homogenous and psychological attachment increases marginal desire as the collection nears completion.',
    hints: [
      'Look for the case where the commodity is unique or part of an addictive/collection hobby.',
      'Collecting the final missing piece of an antique set often gives MORE excitement than the first piece.',
      'Rare collections violate the assumption of homogenous units and constant preference.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_ECON_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Indian Union Budget allocated ₹6.2 lakh crore to National Defence and ₹1.48 lakh crore to Education. This macro-level choice demonstrates:',
    options: [
      'The "For Whom to Produce" distribution dilemma',
      'The "What to Produce" trade-off between military security and human capital development',
      'A technical failure of labour productivity',
      'An inward rotation of the agricultural PPC',
    ],
    correctIndex: 1,
    explanation: 'Deciding the quantity and proportion of Defence (security goods) versus Education (social capital) is a classic "What to Produce" resource allocation decision.',
    hints: [
      'Does this decision select what goods/services the nation will create, or how to manufacture them?',
      'Choosing between guns (defence) and butter/books (civilian services) is the fundamental "What to Produce" choice.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_ECON_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the Production Possibility Curve normally CONCAVE (bowed outward) to the origin rather than a straight diagonal line?',
    options: [
      'Because all factors of production are equally adaptable across all industries',
      'Because resources are not equally efficient in producing both goods, causing Increasing Marginal Opportunity Cost',
      'Because total national resources expand continuously during the production period',
      'Because the government enforces price ceilings on consumer staples',
    ],
    correctIndex: 1,
    explanation: 'The PPC is concave because resources are specialized. As more resources shift from Agriculture to Industry, increasingly less-suitable farm resources must be transferred, increasing the marginal sacrifice (Increasing MOC).',
    hints: [
      'A straight line implies constant opportunity cost (perfectly adaptable resources).',
      'In reality, skilled farmers are not instantly productive robotic engineers.',
      'Specialised resources lead to Increasing Marginal Opportunity Cost, giving the PPC its concave shape.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_ECON_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When Kashmir apples are transported by cold-chain logistics to Chennai retail markets where they command ₹220/kg instead of ₹80/kg at orchards, what type of utility is created?',
    options: [
      'Form Utility',
      'Time Utility',
      'Place Utility',
      'Knowledge Utility',
    ],
    correctIndex: 2,
    explanation: 'Place Utility is created by transporting commodities from a location of relative abundance/lower utility to a location of high demand/higher utility.',
    hints: [
      'Moving goods from farm to distant urban markets changes their physical location.',
      'Transport creates Place Utility.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_ECON_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When Reliance Jio entered the Indian telecom market in 2016 with aggressive free pricing, it consolidated the sector from 12 operators down to 3. Which demerit of capitalism does this demonstrate?',
    options: [
      'Total absence of private innovation',
      'Tendency toward Monopoly / Oligopolistic concentration',
      'Government ownership of all telecom lines',
      'Inability to produce consumer goods',
    ],
    correctIndex: 1,
    explanation: 'A major demerit of unregulated capitalism is market concentration and monopoly tendencies, where dominant players eliminate smaller rivals, necessitating watchdog oversight like the CCI (Competition Commission of India).',
    hints: [
      'When strong firms knock out weaker rivals until only 2-3 remain, market power concentrates.',
      'This is the Monopoly / Market Concentration tendency of capitalism.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_ECON_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Indian auto component plant has a maximum rated capacity of 50,000 engine blocks per month. Due to supply chain bottlenecks, it produces 36,500 units. What is its capacity utilisation percentage?',
    correctAnswer: 73,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Capacity Utilisation = (Actual Output / Maximum Capacity) × 100 = (36,500 / 50,000) × 100 = 73%. The 27% idle capacity represents productive inefficiency.',
    hints: [
      'Divide actual output (36,500) by maximum capacity (50,000).',
      'Multiply the decimal result by 100 to get percentage.',
      '(36,500 / 50,000) * 100 = 73%.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_ECON_019,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the economic equation for determining whether a PPC shift is symmetric economic growth or asymmetric rotation.',
    availableParts: ['PPC Growth =', '(New Max − Old Max)', '/', 'Old Max', '× 100', 'If Both Change = Shift', 'If One Changes = Rotation'],
    targetState: 'PPC Growth = (New Max − Old Max) / Old Max × 100 If Both Change = Shift If One Changes = Rotation',
    validationHint: 'Assemble the formula: PPC Growth = (New Max − Old Max) / Old Max × 100 followed by the shift and rotation conditions.',
    explanation: 'PPC Growth Rate = ((New Max − Old Max) / Old Max) × 100. If both goods\' intercepts increase proportionally, it is a Shift (broad-based growth). If only one good\'s intercept expands, it is a Sectoral Rotation.',
    hints: [
      'Start with the formula for percentage change in maximum intercept.',
      'PPC Growth = (New Max − Old Max) / Old Max * 100.',
      'Add the rule: If Both Change = Shift, If One Changes = Rotation.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_ECON_011,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does an economic want differ from a mere psychological wish or daydream in classical economics?',
    options: [
      'Economic wants only exist for manufactured electronics',
      'An economic want is desire backed by both the Willingness and Ability to Pay (purchasing power)',
      'Economic wants can never be satiated under any condition',
      'Psychological wishes are subject to GST taxation while economic wants are exempt',
    ],
    correctIndex: 1,
    explanation: 'In economics, a desire becomes an economic want and creates demand only when backed by purchasing power (ability to pay) and readiness to spend. A desire for a luxury yacht without funds is merely a wish.',
    hints: [
      'Can demand exist without money to buy the good?',
      'Economic wants require purchasing power.',
      'It is desire backed by willingness and ability to pay.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_ECON_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Tirupur textile mill can produce 10,000 shirts using Technique A (200 workers @ ₹500/day + 5 machines @ ₹4,000/day) or Technique B (20 workers @ ₹500/day + 50 machines @ ₹4,000/day). What is the total cost of the cheaper technique in rupees?',
    correctAnswer: 120000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Technique A (Labour-intensive) Cost = (200 × 500) + (5 × 4,000) = ₹1,00,000 + ₹20,000 = ₹1,20,000. Technique B (Capital-intensive) Cost = (20 × 500) + (50 × 4,000) = ₹10,00,0 + ₹2,00,000 = ₹2,10,000. Technique A is cheaper at ₹1,20,000.',
    hints: [
      'Calculate Cost A: (200 * 500) + (5 * 4000).',
      'Calculate Cost B: (20 * 500) + (50 * 4000).',
      'Cost A = 1,20,000; Cost B = 2,10,000. Enter 120000.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_ECON_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If a consumer eats 6 puris at dinner and the 6th puri produces negative marginal utility (−4 utils), what happens to Total Utility (TU)?',
    options: [
      'Total Utility continues to rise at a slower pace',
      'Total Utility stays at its exact peak saturation level',
      'Total Utility declines because the 6th unit causes disutility',
      'Total Utility becomes zero instantly',
    ],
    correctIndex: 2,
    explanation: 'When Marginal Utility turns negative, adding that negative value reduces Total Utility (TU(6) = TU(5) + (−4) = TU(5) − 4). This is the region of disutility/oversaturation.',
    hints: [
      'TU(n) = TU(n-1) + MU(n).',
      'If you add a negative number, the total decreases.',
      'Total Utility declines when MU is negative.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_22',
    nodeId: NODE_C11_ECON_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is India classified as a "Mixed Economy leaning capitalist" rather than a pure capitalist economy like 19th-century Britain?',
    options: [
      'India completely bans private corporations and stock markets',
      'Private enterprise operates alongside key State Public Sector Undertakings (PSUs), government welfare schemes (PMAY/PDS), and regulatory bodies (SEBI, CCI)',
      'The Indian Constitution prohibits any profit-making business',
      'The price mechanism is completely suspended across all industries in India',
    ],
    correctIndex: 1,
    explanation: 'India blends a vibrant private capitalist sector (BSE listed firms, unicorns, private telecom/airlines) with massive state welfare programmes (NFSA, PMAY) and public enterprises (Railways, SBI, Coal India), making it a mixed economy.',
    hints: [
      'Does the Indian government own companies like Indian Railways and SBI while allowing Reliance and Tata to operate?',
      'Coexistence of private sector and public sector with social welfare defines a mixed economy.',
    ],
  },
];

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
  nodeId: NODE_C11_ECON_011,
  title: 'Human Wants Classification & Economic Foundations',
  definition: 'A human want is the desire for a good or service that contributes to well-being, transformed into economic demand when backed by purchasing power. Economics analyses how scarce resources are allocated via production, utility maximisation, and macroeconomic frontiers.',
  eli5: 'Wants are unlimited, but resources like land, workers, and money are limited. Economics is the art of making the best choices: deciding what to make, how to make it, and who gets it!',
  misconceptions: [
    {
      misconception: 'Comforts and luxuries are identical because both are non-essential for biological survival.',
      correction: 'Comforts improve efficiency and standard of living at moderate cost (ceiling fan in summer), while luxuries are expensive status goods (luxury sports cars, diamond jewellery).',
    },
    {
      misconception: 'The entrepreneur is simply another form of skilled white-collar labour.',
      correction: 'Labour earns a fixed contractual wage regardless of firm profits; the entrepreneur bears the financial risk and receives the residual profit (or loss).',
    },
    {
      misconception: 'Diminishing Marginal Utility means Total Utility must also be falling.',
      correction: 'Total Utility continues to RISE at a decreasing rate as long as Marginal Utility is positive. Total Utility peaks when MU = 0 and only falls when MU becomes negative.',
    },
    {
      misconception: 'The Production Possibility Curve is always a straight diagonal line.',
      correction: 'The PPC is concave (bowed out) to the origin because resources are specialised and non-adaptable, leading to Increasing Marginal Opportunity Cost.',
    },
    {
      misconception: 'Any technological advancement will shift the whole PPC outward.',
      correction: 'If a technological breakthrough happens in only ONE sector (e.g., hybrid rice seeds), the PPC rotates outward on that single axis while the other remains fixed.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which characteristic of human wants is the basis for the Law of Diminishing Marginal Utility?', options: ['Wants are unlimited', 'Wants are competitive', 'Wants are satiable in a single episode', 'Wants are complementary'], correctIndex: 2 },
    { question: 'What is the economic reward earned by the factor "Land"?', options: ['Wages', 'Rent', 'Interest', 'Profit'], correctIndex: 1 },
    { question: 'At what point does a consumer achieve the Saturation Point?', options: ['When TU = 0', 'When MU is maximum', 'When MU = 0 and TU is at its peak', 'When MU is negative'], correctIndex: 2 },
    { question: 'What does a point INSIDE the Production Possibility Frontier signify?', options: ['Unattainable output', 'Resource underutilisation / unemployment', 'Technological progress', 'Perfect allocative efficiency'], correctIndex: 1 },
    { question: 'Which factor of production is considered completely perishable if not used today?', options: ['Land', 'Capital', 'Labour', 'Entrepreneurship'], correctIndex: 2 },
    { question: 'The choice between Labour-Intensive and Capital-Intensive techniques solves:', options: ['What to produce', 'How to produce', 'For whom to produce', 'When to produce'], correctIndex: 1 },
    { question: 'A pure capitalist economy coordinates production primarily through:', options: ['Central Planning Authority', 'The Price Mechanism', 'Military Commands', 'Rationing Quotas'], correctIndex: 1 },
    { question: 'Which GST slab in India is typically assigned to essential food grains?', options: ['28%', '18%', '12%', '0%'], correctIndex: 3 },
  ],
  masteryCriteria: 'Student can classify wants, explain the 4 factors of production, construct TU/MU schedules, calculate opportunity cost along the PPC, and analyse capitalist market mechanisms.',
};

// Exploration Steps
const EXPLORATION_STEPS = [
  {
    title: '1. Human Wants & The Urgency Ladder',
    instruction: 'Adjust the household monthly income slider and observe how spending shifts from biological Necessities to Comforts and Luxuries.',
    interactionType: 'income-slider',
    nodeId: NODE_C11_ECON_011,
  },
  {
    title: '2. Four Factors of Production & Factor Shares',
    instruction: 'Allocate Bharatpur\'s municipal capital into Land, Labour, Capital, and Entrepreneurship to see total output and factor payments.',
    interactionType: 'factor-allocator',
    nodeId: NODE_C11_ECON_012,
  },
  {
    title: '3. Diminishing Marginal Utility & Saturation',
    instruction: 'Consume successive glasses of water on a hot day. Track how Marginal Utility declines and Total Utility reaches its peak.',
    interactionType: 'utility-simulator',
    nodeId: NODE_C11_ECON_013,
  },
  {
    title: '4. The Production Possibility Frontier (PPC)',
    instruction: 'Slide resource allocation between Foodgrains and Heavy Machinery. Watch the Marginal Opportunity Cost rise due to resource specialisation.',
    interactionType: 'ppc-explorer',
    nodeId: NODE_C11_ECON_018,
  },
  {
    title: '5. Sectoral Technology: Shift vs Rotation',
    instruction: 'Trigger technological breakthroughs in Agriculture vs Industry and observe whether the PPC shifts symmetrically or rotates asymmetrically.',
    interactionType: 'tech-shift',
    nodeId: NODE_C11_ECON_019,
  },
];

// Predict-then-Check items
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you drink 5 glasses of water consecutively, what happens to the Marginal Utility (satisfaction) of the 5th glass compared to the 1st glass?',
    options: [
      'The 5th glass gives much higher satisfaction than the 1st',
      'The 5th glass gives equal satisfaction to the 1st',
      'The 5th glass gives significantly less satisfaction (or zero) as thirst is quenched',
      'Marginal utility becomes infinitely large',
    ],
    correctIndex: 2,
    verifyInstruction: 'Now use the Utility Simulator below: click "Drink Glass" 5 times and check the live MU curve!',
    nodeId: NODE_C11_ECON_014,
  },
  {
    question: 'Predict: If Bharatpur introduces high-speed automated drone harvesting in Agriculture ONLY, what will happen to the Foodgrain-Steel PPC?',
    options: [
      'The entire curve shifts outward on both axes equally',
      'The curve rotates outward only along the Foodgrain axis',
      'The curve shifts inward due to technological disruption',
      'The curve becomes a straight 45-degree line',
    ],
    correctIndex: 1,
    verifyInstruction: 'Click "Upgrade Farm Tech" on Step 5 and see the curve pivot around the Steel intercept!',
    nodeId: NODE_C11_ECON_019,
  },
];

// Real-world Activity
const REAL_WORLD_ACTIVITY = {
  title: 'District Economic Blueprint: Bharatpur 2030',
  description: 'Apply your economic mastery to your hometown or state. Select 3 real products/services and evaluate their classification, factor composition, and PPC trade-off.',
  steps: [
    'Identify one Necessity (e.g., PDS wheat @ ₹2/kg), one Comfort (metro pass), and one Luxury (iPhone 15 Pro) in your city.',
    'Map the 4 factors of production for a local enterprise (e.g., a local bakery or dairy unit) and identify Rent, Wages, Interest, and Profit.',
    'Formulate a 1-page recommendation on whether your state government should invest capital in labour-intensive tourism or capital-intensive semiconductor fabrication.',
  ],
};

function C11_EconomicsHumanWantsClassificationSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_ECON_011,
  title = DEFAULT_PROPS.title || 'Human Wants Classification & Economic Foundations',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['econ'] || { name: 'Economics', emoji: '📈', color: 'indigo' };

  // Phase flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Observation questions state
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsSubmitted, setObsSubmitted] = useState<Record<number, boolean>>({});

  // Brilliant Exploration State
  const [incomeLevel, setIncomeLevel] = useState<number>(25000); // ₹10,000 to ₹2,00,000
  const [factorAlloc, setFactorAlloc] = useState({ land: 25, labour: 35, capital: 25, entrepreneur: 15 });
  const [waterGlasses, setWaterGlasses] = useState<number>(1);
  const [ppcFoodResource, setPpcFoodResource] = useState<number>(60); // 0 to 100%
  const [agriTechLevel, setAgriTechLevel] = useState<number>(1); // 1 to 2x
  const [indTechLevel, setIndTechLevel] = useState<number>(1); // 1 to 2x

  // Predict & Observe State
  const [pred1Made, setPred1Made] = useState(false);
  const [pred1Index, setPred1Index] = useState(-1);

  // Sandbox State
  const [sandboxTab, setSandboxTab] = useState<'ppc' | 'utility' | 'factors'>('ppc');
  const [sandboxPpcRatio, setSandboxPpcRatio] = useState(50);
  const [sandboxTechAgri, setSandboxTechAgri] = useState(1);
  const [sandboxTechInd, setSandboxTechInd] = useState(1);
  const [sandboxUnitsConsumed, setSandboxUnitsConsumed] = useState(3);

  // Adaptive & Scoring State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflections, setReflections] = useState<Record<string, string>>({
    refl_1: '',
    refl_2: '',
    refl_3: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Feedback & Hint State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Interactive Challenges Data State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual effects
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // SRS interval based on error count
  const srsReviewDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // Filtered Challenges
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive effect
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

  // Canvas animated pulse for Economic Indicator
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw active economic pulse line
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.05) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing node marker
      const pulseRadius = 4 + Math.sin(frame * 0.1) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, canvas.height / 2, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`ISC Econ Lab | Challenge ${currentChallenge + 1}/${filteredChallenges.length}`, 12, canvas.height / 2 + 4);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length]);

  // Escalating hints handler
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  // Auto hint inactivity reset
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Discovery handlers
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding economic insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core economic principles interactively.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Economic Sandbox. Manipulate the parameters freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time to put your mastery to the test!');
  }, []);

  // Exploration Slide Controls
  const handleNextSlide = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide(s => s + 1);
      audioManager.play('whoosh');
    } else {
      handleAdvanceToSandbox();
    }
  }, [currentSlide, handleAdvanceToSandbox]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // Observation check handler
  const handleSelectObservation = useCallback((qIndex: number, optIndex: number) => {
    setObsAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    setObsSubmitted(prev => ({ ...prev, [qIndex]: true }));
    const isCorrect = optIndex === OBSERVATION_QUESTIONS[qIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation!' : 'Review the visualization graph carefully.');
  }, []);

  // Utility Simulation Drink Action
  const handleDrinkWater = useCallback(() => {
    if (waterGlasses < 7) {
      setWaterGlasses(prev => prev + 1);
      audioManager.play('pop');
      if (waterGlasses === 4) {
        speechManager.speak('Saturation reached! Marginal utility is now zero.');
      } else if (waterGlasses >= 5) {
        speechManager.speak('Disutility! Further consumption reduces total satisfaction.');
      }
    }
  }, [waterGlasses]);

  const handleResetWater = useCallback(() => {
    setWaterGlasses(1);
    audioManager.play('tap');
  }, []);

  // Drag and drop handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  // Drag sort handler
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const current = prev.length === activeChallenge.sortItems?.length ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [activeChallenge]);

  // Complete Simulation
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the ISC Economics Simulation.');
  }, [errors, onComplete]);

  // Next Challenge
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

  // Main Answer Evaluator
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === activeChallenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent economic reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the step-by-step solution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  // Calculations for Step 1: Human Wants Budget breakdown
  const wantsBreakdown = useMemo(() => {
    const necessity = Math.min(incomeLevel, 15000);
    const comfort = Math.min(Math.max(0, incomeLevel - 15000), 50000);
    const luxury = Math.max(0, incomeLevel - 65000);
    const total = necessity + comfort + luxury;
    return {
      necessityPct: Math.round((necessity / total) * 100),
      comfortPct: Math.round((comfort / total) * 100),
      luxuryPct: Math.round((luxury / total) * 100),
      necessityVal: necessity,
      comfortVal: comfort,
      luxuryVal: luxury,
    };
  }, [incomeLevel]);

  // Calculations for Step 3: Utility Schedule
  const utilityData = useMemo(() => {
    const muSchedule = [16, 12, 8, 4, 0, -4, -8];
    const data = [];
    let runningTu = 0;
    for (let i = 0; i < 7; i++) {
      const units = i + 1;
      const mu = muSchedule[i];
      runningTu += mu;
      data.push({
        unit: `Glass ${units}`,
        units,
        mu,
        tu: runningTu,
        isCurrent: units === waterGlasses,
      });
    }
    return data;
  }, [waterGlasses]);

  // Calculations for Step 4: PPC Curve generator
  const ppcCurveData = useMemo(() => {
    const points = [];
    const maxSteel = 80 * indTechLevel;
    for (let f = 0; f <= 100; f += 10) {
      const actualF = f * agriTechLevel;
      const s = Math.round(maxSteel * Math.sqrt(Math.max(0, 1 - Math.pow(f / 100, 2))));
      points.push({ food: actualF, steel: s });
    }
    return points;
  }, [agriTechLevel, indTechLevel]);

  // Current Operating Point on PPC
  const currentPpcPoint = useMemo(() => {
    const maxSteel = 80 * indTechLevel;
    const foodProduced = Math.round(ppcFoodResource * agriTechLevel);
    const steelProduced = Math.round(maxSteel * Math.sqrt(Math.max(0, 1 - Math.pow(ppcFoodResource / 100, 2))));
    const moc = ppcFoodResource === 0 ? 0 : Number((foodProduced / Math.max(1, steelProduced)).toFixed(2));
    return { foodProduced, steelProduced, moc };
  }, [ppcFoodResource, agriTechLevel, indTechLevel]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* Top Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="p-3 bg-indigo-950/80 rounded-2xl text-2xl border border-indigo-700/50 shadow-inner inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-800/40">
                ISC Class 11 Commerce
              </span>
              <span className="text-xs text-slate-400 font-mono">Economics Core</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5 tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="px-3 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs flex items-center gap-2"
          >
            <span className="text-slate-400">Mastery:</span>
            <span className="font-bold text-emerald-400 uppercase tracking-wide">{masteryLevel}</span>
          </motion.div>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase border tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-300 border-rose-700/50'
                : 'bg-indigo-950/60 text-indigo-300 border-indigo-700/50'
            }`}
          >
            {difficulty} Tier
          </motion.span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                  Narrative Scenario
                </span>
                <span className="text-xs text-slate-400 font-mono">District of Bharatpur</span>
              </div>
              <h2 className="text-xl font-bold text-white">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-indigo-200/80 mt-3 p-3 bg-indigo-900/30 rounded-xl border border-indigo-800/40"
              >
                💡 {SCENARIO.context}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Curiosity Discovery Challenge</span>
              <h3 className="text-base md:text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>
              <div className="space-y-2.5">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-100 shadow-md'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border border-slate-800 text-slate-400'
                        : 'bg-slate-800 hover:bg-slate-700/80 border border-slate-600/60 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                        <span className="text-emerald-400 font-bold">✓ Correct</span>
                      )}
                      {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                        <span className="text-rose-400 font-bold">✗</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 pt-4 border-t border-slate-700/60"
                >
                  <p className={`text-sm font-medium mb-4 ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {discoveryCorrect ? '🎯 Spot on! That is the essence of opportunity cost.' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Interactive Economic Labs"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 text-sm flex items-center gap-2"
                  >
                    Enter Interactive Economic Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: BRILLIANT GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.section
            key="explore-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
          >
            {/* Progress Steps Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between bg-slate-800/50 p-3 rounded-2xl border border-slate-700"
            >
              <div className="flex items-center gap-2">
                <motion.span
                  key={currentSlide}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold"
                >
                  {currentSlide + 1}
                </motion.span>
                <span className="text-sm font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</span>
              </div>
              <div className="flex gap-1.5">
                {EXPLORATION_STEPS.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ width: idx === currentSlide ? 32 : 8 }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'bg-indigo-500' : idx < currentSlide ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              layout
              className="p-4 md:p-6 bg-slate-800/70 rounded-2xl border border-slate-700 shadow-xl min-h-[440px]"
            >
              <motion.p
                key={`instr-${currentSlide}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-amber-300 text-sm font-semibold mb-4 flex items-center gap-2"
              >
                <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </motion.p>

              {/* Step 1: Human Wants Classification Simulator */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="income-range" className="text-xs font-bold text-slate-300">
                        Monthly Family Income: ₹{incomeLevel.toLocaleString('en-IN')}
                      </label>
                      <span className="text-xs font-mono text-indigo-400">
                        {incomeLevel <= 25000 ? 'Low Income (Subsistence)' : incomeLevel <= 80000 ? 'Middle Class' : 'High Income (Affluent)'}
                      </span>
                    </div>
                    <input
                      id="income-range"
                      type="range"
                      min={10000}
                      max={200000}
                      step={5000}
                      value={incomeLevel}
                      aria-label="Household monthly income slider"
                      onChange={(e) => {
                        setIncomeLevel(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Live Expenditure Distribution Gauge */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/60">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-emerald-400">1. Necessities</span>
                        <span className="text-xs font-bold text-emerald-300">{wantsBreakdown.necessityPct}%</span>
                      </div>
                      <p className="text-lg font-black text-white mt-1">₹{wantsBreakdown.necessityVal.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-slate-400 mt-1">Rice, Dal under NFSA, basic shelter & life-saving drugs.</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-blue-950/40 rounded-xl border border-blue-800/60">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-400">2. Comforts</span>
                        <span className="text-xs font-bold text-blue-300">{wantsBreakdown.comfortPct}%</span>
                      </div>
                      <p className="text-lg font-black text-white mt-1">₹{wantsBreakdown.comfortVal.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-slate-400 mt-1">Ceiling fans, smartphones, gas stove & bus passes.</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-purple-950/40 rounded-xl border border-purple-800/60">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-purple-400">3. Luxuries</span>
                        <span className="text-xs font-bold text-purple-300">{wantsBreakdown.luxuryPct}%</span>
                      </div>
                      <p className="text-lg font-black text-white mt-1">₹{wantsBreakdown.luxuryVal.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-slate-400 mt-1">Luxury cars, five-star dining & designer apparel.</p>
                    </motion.div>
                  </div>

                  {/* Graphical Proportion Bar */}
                  <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-950 border border-slate-700">
                    <motion.div
                      animate={{ width: `${wantsBreakdown.necessityPct}%` }}
                      className="bg-emerald-500 h-full transition-all duration-300"
                    />
                    <motion.div
                      animate={{ width: `${wantsBreakdown.comfortPct}%` }}
                      className="bg-blue-500 h-full transition-all duration-300"
                    />
                    <motion.div
                      animate={{ width: `${wantsBreakdown.luxuryPct}%` }}
                      className="bg-purple-500 h-full transition-all duration-300"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Factors of Production Simulator */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: 'land', name: 'Land (Natural)', reward: 'Rent', icon: '🌾', color: 'emerald', desc: 'Free gift of nature, fixed in supply (328.7M ha in India).' },
                      { key: 'labour', name: 'Labour (Human)', reward: 'Wages', icon: '👷', color: 'blue', desc: 'Perishable effort; lost days cannot be recovered.' },
                      { key: 'capital', name: 'Capital (Man-made)', reward: 'Interest', icon: '⚙️', color: 'amber', desc: 'Machinery & refineries that depreciate over time.' },
                      { key: 'entrepreneur', name: 'Entrepreneur', reward: 'Profit/Loss', icon: '💡', color: 'purple', desc: 'Organises other 3 factors & bears business risk.' },
                    ].map((f) => (
                      <motion.div
                        key={f.key}
                        whileHover={{ scale: 1.03 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-700"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{f.icon}</span>
                          <div>
                            <p className="text-xs font-bold text-white">{f.name}</p>
                            <p className="text-[10px] font-bold text-indigo-300">Reward: {f.reward}</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight mt-1">{f.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center"
                  >
                    <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">National Income Identity</p>
                    <div className="flex flex-wrap justify-center items-center gap-2 text-sm md:text-base font-black text-slate-200">
                      <span className="px-2.5 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg">Rent</span>
                      <span>+</span>
                      <span className="px-2.5 py-1 bg-blue-950 border border-blue-700 text-blue-300 rounded-lg">Wages</span>
                      <span>+</span>
                      <span className="px-2.5 py-1 bg-amber-950 border border-amber-700 text-amber-300 rounded-lg">Interest</span>
                      <span>+</span>
                      <span className="px-2.5 py-1 bg-purple-950 border border-purple-700 text-purple-300 rounded-lg">Profit</span>
                      <span>=</span>
                      <span className="px-3 py-1 bg-indigo-900 border border-indigo-500 text-white rounded-lg">Total Factor Output (GNP)</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Law of Diminishing Marginal Utility Interactive Lab */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {/* Predict-then-check container */}
                  {!pred1Made ? (
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700">
                      <span className="text-xs font-bold text-amber-300 uppercase">Predict First</span>
                      <p className="text-sm font-semibold text-white mt-1 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Predict option ${i + 1}`}
                            onClick={() => {
                              setPred1Index(i);
                              setPred1Made(true);
                              audioManager.play('tap');
                              speechManager.speak('Now drink the glasses in the simulation to test your hypothesis!');
                            }}
                            className="text-left p-2.5 text-xs bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Simulator Controls */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="w-full md:w-1/3 p-4 bg-slate-900 rounded-xl border border-slate-700 flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-xs font-bold text-indigo-400 uppercase">Glasses Consumed</span>
                            <div className="text-3xl font-black text-white mt-1 mb-2">{waterGlasses} of 7</div>
                            <div className="flex gap-1 mb-4">
                              {Array.from({ length: 7 }).map((_, idx) => (
                                <motion.span
                                  key={idx}
                                  animate={{ scale: idx < waterGlasses ? 1.1 : 1 }}
                                  className={`text-xl ${idx < waterGlasses ? 'opacity-100' : 'opacity-20 grayscale'} transition-all inline-block`}
                                >
                                  🥛
                                </motion.span>
                              ))}
                            </div>
                            <p className="text-xs text-slate-300">
                              {waterGlasses <= 3 ? 'Thirsty: High Marginal Satisfaction!' : waterGlasses === 4 ? 'Quenched: Saturation Point (MU=0, TU Peak)' : 'Overfilled: Negative Utility / Acidity!'}
                            </p>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleDrinkWater}
                              disabled={waterGlasses >= 7}
                              aria-label="Drink one more glass of water"
                              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold rounded-lg text-xs shadow-md"
                            >
                              Drink Glass +1
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleResetWater}
                              aria-label="Reset water consumption"
                              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs border border-slate-600"
                            >
                              Reset
                            </motion.button>
                          </div>
                        </motion.div>

                        {/* Recharts TU/MU Chart */}
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="w-full md:w-2/3 h-64 bg-slate-950 p-2 rounded-xl border border-slate-800"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={utilityData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                              <XAxis dataKey="units" stroke="#94a3b8" fontSize={11} />
                              <YAxis stroke="#94a3b8" fontSize={11} />
                              <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', borderRadius: '8px', fontSize: '12px' }}
                              />
                              <ReferenceLine y={0} stroke="#e2e8f0" strokeWidth={1.5} />
                              <Line type="monotone" dataKey="tu" name="Total Utility (TU)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                              <Line type="monotone" dataKey="mu" name="Marginal Utility (MU)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </motion.div>
                      </div>

                      {/* Observation Question 1 */}
                      <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-700/60 space-y-2.5">
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                          🔍 Brilliant Observation: What do you notice?
                        </span>
                        <p className="text-xs md:text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[0].prompt}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectObservation(0, oIdx)}
                              className={`text-left p-2.5 rounded-lg text-xs transition-all border ${
                                obsSubmitted[0] && oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                  ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold'
                                  : obsSubmitted[0] && obsAnswers[0] === oIdx
                                  ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                                  : 'bg-slate-900/90 border-slate-700 hover:bg-slate-800 text-slate-300'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {obsSubmitted[0] && (
                          <p className="text-xs text-emerald-300 pt-1 font-medium">{OBSERVATION_QUESTIONS[0].explanation}</p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Production Possibility Curve (PPC) */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-3">
                      <label htmlFor="ppc-resource-range" className="text-xs font-bold text-slate-300">
                        Agricultural Allocation: {ppcFoodResource}% (Balance to Steel)
                      </label>
                      <input
                        id="ppc-resource-range"
                        type="range"
                        min={0}
                        max={100}
                        value={ppcFoodResource}
                        aria-label="Agricultural resource allocation percentage"
                        onChange={(e) => {
                          setPpcFoodResource(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                      />

                      <div className="p-3 bg-slate-950 rounded-lg space-y-1.5 border border-slate-800">
                        <div className="flex justify-between text-xs">
                          <span className="text-emerald-400 font-bold">🌾 Foodgrains Output:</span>
                          <span className="font-mono text-white font-bold">{currentPpcPoint.foodProduced} MT</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-blue-400 font-bold">⚙️ Heavy Machinery:</span>
                          <span className="font-mono text-white font-bold">{currentPpcPoint.steelProduced} Units</span>
                        </div>
                        <div className="flex justify-between text-xs pt-1 border-t border-slate-800">
                          <span className="text-amber-400 font-bold">Slope (MOC):</span>
                          <span className="font-mono text-amber-300 font-bold">{currentPpcPoint.moc} sacrifice</span>
                        </div>
                      </div>
                    </div>

                    {/* SVG Concave PPC Curve Visualization */}
                    <div className="col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                      <svg viewBox="0 0 320 220" className="w-full max-w-sm">
                        {/* Axes */}
                        <line x1="40" y1="20" x2="40" y2="180" stroke="#64748b" strokeWidth="2" />
                        <line x1="40" y1="180" x2="300" y2="180" stroke="#64748b" strokeWidth="2" />

                        {/* Labels */}
                        <text x="45" y="30" fill="#10b981" fontSize="10" fontWeight="bold">Foodgrains (MT)</text>
                        <text x="220" y="198" fill="#3b82f6" fontSize="10" fontWeight="bold">Machinery (Units)</text>

                        {/* Concave PPC Arc */}
                        <path
                          d="M 40 40 Q 200 45 280 180"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="3"
                        />

                        {/* Dynamic Point on Curve */}
                        {(() => {
                          const t = ppcFoodResource / 100;
                          const cx = (1 - t) * (1 - t) * 280 + 2 * (1 - t) * t * 200 + t * t * 40;
                          const cy = (1 - t) * (1 - t) * 180 + 2 * (1 - t) * t * 45 + t * t * 40;
                          return (
                            <g>
                              <circle cx={cx} cy={cy} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                              <text x={cx + 10} y={cy - 5} fill="#f59e0b" fontSize="10" fontWeight="bold">
                                Operating Point
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Technology Shift vs Rotation */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-3">
                      <span className="text-xs font-bold text-indigo-400 uppercase">Technological Interventions</span>
                      <div className="space-y-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Toggle Agricultural Tech Upgrade"
                          onClick={() => {
                            setAgriTechLevel(prev => (prev === 1 ? 1.5 : 1));
                            audioManager.play('tap');
                          }}
                          className={`w-full p-2.5 rounded-lg text-xs font-bold text-left border flex justify-between items-center ${
                            agriTechLevel > 1 ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <span>🌾 Upgrade Agricultural Tech (HYV Seeds)</span>
                          <span>{agriTechLevel > 1 ? 'ACTIVE (1.5x)' : 'OFF'}</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Toggle Industrial Tech Upgrade"
                          onClick={() => {
                            setIndTechLevel(prev => (prev === 1 ? 1.5 : 1));
                            audioManager.play('tap');
                          }}
                          className={`w-full p-2.5 rounded-lg text-xs font-bold text-left border flex justify-between items-center ${
                            indTechLevel > 1 ? 'bg-blue-950/70 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <span>⚙️ Upgrade Industrial Tech (Robotics)</span>
                          <span>{indTechLevel > 1 ? 'ACTIVE (1.5x)' : 'OFF'}</span>
                        </motion.button>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                        <p className="font-bold text-amber-300">PPC Behavior Diagnosis:</p>
                        <p className="text-slate-300 mt-1">
                          {agriTechLevel > 1 && indTechLevel > 1
                            ? '✨ Symmetric Outward Shift: Economic growth across all sectors.'
                            : agriTechLevel > 1
                            ? '🔄 Asymmetric Rotation on Farm Axis: Steel intercept remains unchanged.'
                            : indTechLevel > 1
                            ? '🔄 Asymmetric Rotation on Steel Axis: Farm intercept remains unchanged.'
                            : 'Baseline PPC: Constant technology frontier.'}
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Shift vs Rotation Graph */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                      <svg viewBox="0 0 320 220" className="w-full max-w-sm">
                        <line x1="40" y1="20" x2="40" y2="180" stroke="#64748b" strokeWidth="2" />
                        <line x1="40" y1="180" x2="300" y2="180" stroke="#64748b" strokeWidth="2" />

                        {/* Original Base Curve */}
                        <path d="M 40 50 Q 180 55 240 180" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                        <text x="180" y="80" fill="#64748b" fontSize="9">Original PPC</text>

                        {/* Modified Dynamic Curve */}
                        <path
                          d={`M 40 ${50 - (agriTechLevel - 1) * 35} Q ${180 + (indTechLevel - 1) * 30} ${55 - (agriTechLevel - 1) * 20} ${240 + (indTechLevel - 1) * 50} 180`}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                        />
                        <text x="210" y="140" fill="#10b981" fontSize="10" fontWeight="bold">New Frontier</text>
                      </svg>
                    </div>
                  </div>

                  {/* Observation Question 2 */}
                  <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-700/60 space-y-2.5">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      🔍 Brilliant Observation: What do you notice?
                    </span>
                    <p className="text-xs md:text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[1].prompt}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectObservation(1, oIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition-all border ${
                            obsSubmitted[1] && oIdx === OBSERVATION_QUESTIONS[1].correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold'
                              : obsSubmitted[1] && obsAnswers[1] === oIdx
                              ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900/90 border-slate-700 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {obsSubmitted[1] && (
                      <p className="text-xs text-emerald-300 pt-1 font-medium">{OBSERVATION_QUESTIONS[1].explanation}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                aria-label="Go to previous exploration step"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs font-mono text-slate-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                aria-label="Go to next exploration step"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
              >
                {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Enter Free Sandbox →' : 'Next Interactive Lab →'}
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY ECONOMIC SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox-phase"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-5"
          >
            <div className="p-4 md:p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">🧪 Bharatpur Economic Sandbox</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Free play mode: test any economic combination without grading constraints.</p>
                </div>
                <div className="flex gap-2">
                  {(['ppc', 'utility', 'factors'] as const).map((tab) => (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Switch to ${tab} sandbox lab`}
                      onClick={() => {
                        setSandboxTab(tab);
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider border transition-all ${
                        sandboxTab === tab
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab} Lab
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sandbox Tab Content */}
              <motion.div
                key={sandboxTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-slate-950 rounded-xl border border-slate-800 min-h-[280px]"
              >
                {sandboxTab === 'ppc' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="sandbox-ppc-slider" className="text-xs text-slate-300 font-bold">
                          PPC Resource Ratio: {sandboxPpcRatio}% Food
                        </label>
                        <input
                          id="sandbox-ppc-slider"
                          type="range"
                          min={0}
                          max={100}
                          value={sandboxPpcRatio}
                          aria-label="Sandbox PPC food ratio slider"
                          onChange={(e) => setSandboxPpcRatio(Number(e.target.value))}
                          className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg"
                        />
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Toggle Sandbox Agri Tech"
                          onClick={() => setSandboxTechAgri(t => (t === 1 ? 1.4 : 1))}
                          className={`flex-1 p-2 rounded-lg text-xs font-bold border ${
                            sandboxTechAgri > 1 ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          Agri Tech ({sandboxTechAgri}x)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Toggle Sandbox Industrial Tech"
                          onClick={() => setSandboxTechInd(t => (t === 1 ? 1.4 : 1))}
                          className={`flex-1 p-2 rounded-lg text-xs font-bold border ${
                            sandboxTechInd > 1 ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          Ind Tech ({sandboxTechInd}x)
                        </motion.button>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between"><span className="text-slate-400">Foodgrains:</span><span className="font-mono text-emerald-400">{Math.round(sandboxPpcRatio * sandboxTechAgri)} MT</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Steel / Machinery:</span><span className="font-mono text-blue-400">{Math.round(80 * sandboxTechInd * Math.sqrt(Math.max(0, 1 - Math.pow(sandboxPpcRatio / 100, 2))))} Units</span></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center p-2 bg-slate-900/40 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400 text-center leading-relaxed">
                        Notice how pushing resource allocation to extremes causes the opportunity cost of the sacrificed good to spike dramatically!
                      </p>
                    </div>
                  </div>
                )}

                {sandboxTab === 'utility' && (
                  <div className="space-y-4 text-center">
                    <p className="text-xs text-slate-300 font-semibold">Select Number of Units Consumed to Inspect Marginal vs Total Utility</p>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((u) => (
                        <motion.button
                          key={u}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Consume ${u} units`}
                          onClick={() => {
                            setSandboxUnitsConsumed(u);
                            audioManager.play('pop');
                          }}
                          className={`w-10 h-10 rounded-xl font-bold text-sm ${
                            sandboxUnitsConsumed === u ? 'bg-amber-500 text-slate-950 scale-110 shadow-lg' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {u}
                        </motion.button>
                      ))}
                    </div>
                    <motion.div
                      layout
                      className="p-4 bg-slate-900 rounded-xl max-w-md mx-auto grid grid-cols-2 gap-4 border border-slate-800"
                    >
                      <div>
                        <p className="text-xs text-slate-400">Marginal Utility (MU)</p>
                        <p className={`text-xl font-black ${sandboxUnitsConsumed === 5 ? 'text-amber-400' : sandboxUnitsConsumed > 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {sandboxUnitsConsumed === 5 ? '0 (Saturation)' : sandboxUnitsConsumed === 6 ? '−4 (Disutility)' : sandboxUnitsConsumed === 7 ? '−8' : `${20 - sandboxUnitsConsumed * 4} utils`}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Total Utility (TU)</p>
                        <p className="text-xl font-black text-indigo-300">
                          {sandboxUnitsConsumed === 1 ? '16' : sandboxUnitsConsumed === 2 ? '28' : sandboxUnitsConsumed === 3 ? '36' : sandboxUnitsConsumed === 4 ? '40' : sandboxUnitsConsumed === 5 ? '40 (Peak)' : sandboxUnitsConsumed === 6 ? '36' : '28'} utils
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}

                {sandboxTab === 'factors' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">Simulate factor reward distribution across a ₹10,00,000 industrial turnover in Bharatpur:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-lg border border-slate-800"><span className="text-emerald-400 font-bold">Land Rent:</span> ₹1,20,000 (12%)</motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-lg border border-slate-800"><span className="text-blue-400 font-bold">Labour Wages:</span> ₹5,20,000 (52%)</motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-lg border border-slate-800"><span className="text-amber-400 font-bold">Capital Interest:</span> ₹1,60,000 (16%)</motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-lg border border-slate-800"><span className="text-purple-400 font-bold">Residual Profit:</span> ₹2,00,000 (20%)</motion.div>
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Advance to examination challenges"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl text-sm shadow-xl shadow-emerald-600/20 uppercase tracking-wider"
              >
                I Am Ready for Examination Challenges →
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: ADAPTIVE CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.section
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Active Canvas Animation Header */}
            <canvas ref={canvasRef} width={600} height={28} className="w-full rounded-lg border border-slate-800" />

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 px-1">
              <span className="font-semibold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-indigo-400 uppercase text-[10px] tracking-wider">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>

            {/* Main Challenge Card */}
            <motion.div
              layout
              className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                wrongFlash ? 'bg-rose-950/70 border-rose-500 shadow-rose-900/50' : 'bg-slate-800/80 border-slate-700'
              }`}
            >
              <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">{activeChallenge.question}</h3>

              {/* Render: MCQ Options */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') &&
                activeChallenge.options && (
                  <div className="space-y-2.5">
                    {activeChallenge.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={wrongShake ? { duration: 0.4 } : {}}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation || answerRevealed}
                        aria-label={`Choice ${i + 1}: ${opt}`}
                        className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                          showExplanation && i === activeChallenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100'
                            : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {showExplanation && i === activeChallenge.correctIndex && (
                            <span className="text-emerald-400 font-black">✓ Correct</span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* Render: Drag-Label Challenge */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    {activeChallenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable item: ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { targetId: 'target_on', title: 'On the Curve', desc: 'Full & Efficient Employment' },
                      { targetId: 'target_inside', title: 'Inside the Curve', desc: 'Underutilisation / Unemployment' },
                      { targetId: 'target_outside', title: 'Outside the Curve', desc: 'Unattainable with Current Resources' },
                    ].map((dropzone) => (
                      <div
                        key={dropzone.targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(dropzone.targetId)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[110px] flex flex-col justify-center items-center"
                      >
                        <p className="text-xs font-bold text-indigo-300">{dropzone.title}</p>
                        <p className="text-[11px] text-slate-500 mb-2">{dropzone.desc}</p>
                        <span className="px-3 py-1 bg-slate-800 rounded-md text-xs font-mono text-amber-300 font-bold border border-slate-700">
                          {droppedLabels[dropzone.targetId] || 'Drop Label Here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    aria-label="Verify Drag Placement"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Verify Drag Placement
                  </motion.button>
                </div>
              )}

              {/* Render: Drag-Sort Challenge */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag items to rearrange into proper chronological order:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === activeChallenge.sortItems.length
                      ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                      : activeChallenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Sortable item ${displayIdx + 1}: ${item}`}
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-3 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 cursor-grab flex items-center gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-400 flex items-center justify-center font-bold text-[10px] border border-indigo-700">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
                      handleAnswer(ans);
                    }}
                    disabled={showExplanation}
                    aria-label="Confirm Order Sequence"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Confirm Order Sequence
                  </motion.button>
                </div>
              )}

              {/* Render: Numeric Challenge */}
              {activeChallenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical answer"
                      aria-label="Numerical answer input"
                      className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                    />
                    <span className="text-xs font-bold text-slate-400">{activeChallenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      aria-label="Check numeric answer"
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                    >
                      Check
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Render: Construct Challenge */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    {activeChallenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Add part ${part}`}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg text-xs font-mono border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-1.5 items-center">
                    {constructParts.map((p, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="px-2.5 py-1 bg-indigo-950 text-indigo-200 rounded-md text-xs font-mono border border-indigo-700 cursor-pointer hover:bg-rose-950 hover:text-rose-300"
                      >
                        {p} ✕
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600">Click blocks above to construct rule</span>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    aria-label="Validate Assembled Formula"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    Validate Assembled Formula
                  </motion.button>
                </div>
              )}

              {/* Progressive Step-by-Step Explanation Reveal */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-slate-900 rounded-xl border border-amber-500/50 space-y-3"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">ISC Expert Walkthrough</span>
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-300">{idx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="pt-2 flex justify-between items-center">
                    {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Show next step of solution"
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white font-bold rounded-lg text-xs"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Proceed to next challenge or final assessment"
                        onClick={handleNextChallenge}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-600/20"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & REFLECTION SYNTHESIS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.section
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl border border-emerald-500/50 text-center space-y-3"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-4xl inline-block"
              >
                🎓
              </motion.span>
              <h2 className="text-2xl font-black text-white">ISC Economics Mastery Attained!</h2>
              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                You have successfully balanced wants, factor returns, diminishing marginal utility, and the Production Possibility Frontier for Bharatpur.
              </p>
              <div className="inline-flex items-center gap-4 p-3 bg-slate-900/80 rounded-xl border border-slate-700">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Accuracy Score</p>
                  <p className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
                </div>
                <div className="h-8 w-px bg-slate-700" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">BKT Mastery</p>
                  <p className="text-2xl font-black text-indigo-300 uppercase">{masteryLevel}</p>
                </div>
              </div>
            </motion.div>

            {/* Motivational Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-700/60 text-xs md:text-sm text-emerald-200 flex items-center gap-2"
            >
              <span>✓</span>
              <span>
                {errors === 0
                  ? 'Flawless Mastery! You displayed rigorous understanding of cardinal utility, PPC concavity, and factor distribution.'
                  : errors <= 3
                  ? 'High Distinction! You demonstrated solid analytical capability across CISCE Class 11 economics topics.'
                  : 'Good effort! Review your misconception profile below to solidify your understanding before board examinations.'}
              </span>
            </motion.div>

            {/* Spaced Repetition SRS Notification Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border-2 border-amber-500/60 text-xs space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-amber-700/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧠</span>
                  <span className="font-black text-amber-300 text-sm uppercase tracking-wide">
                    Spaced Repetition System (SRS) Schedule
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-mono font-bold rounded-lg border border-amber-500/30">
                  SM-2 Algorithm
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className={`p-3 rounded-xl border text-center ${errors === 0 ? 'bg-emerald-950/60 border-emerald-500 shadow-sm' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                  <p className="text-[10px] uppercase font-bold text-slate-400">0 Errors</p>
                  <p className="text-base font-black text-emerald-300 mt-0.5">Review in 7 days</p>
                  <p className="text-[10px] text-slate-400">Long-term consolidation</p>
                </div>
                <div className={`p-3 rounded-xl border text-center ${errors >= 1 && errors <= 3 ? 'bg-amber-950/60 border-amber-500 shadow-sm' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                  <p className="text-[10px] uppercase font-bold text-slate-400">1–3 Errors</p>
                  <p className="text-base font-black text-amber-300 mt-0.5">Review in 3 days</p>
                  <p className="text-[10px] text-slate-400">Targeted reinforcement</p>
                </div>
                <div className={`p-3 rounded-xl border text-center ${errors >= 4 ? 'bg-rose-950/60 border-rose-500 shadow-sm' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                  <p className="text-[10px] uppercase font-bold text-slate-400">4+ Errors</p>
                  <p className="text-base font-black text-rose-300 mt-0.5">Review in 1 day</p>
                  <p className="text-[10px] text-slate-400">Immediate remedial practice</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300 font-medium">
                  Your Personalized Recommendation: Review this module in{' '}
                  <strong className="text-amber-400 font-bold">{srsReviewDays} {srsReviewDays === 1 ? 'day' : 'days'}</strong> (based on {errors} {errors === 1 ? 'error' : 'errors'} recorded).
                </span>
                <span className="text-emerald-400 font-mono font-bold text-xs">✓ Active SRS Synced</span>
              </div>
            </motion.div>

            {/* Reflection Questions Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 bg-slate-800/80 rounded-2xl border border-indigo-700/50 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🤔</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Metacognitive Reflection</h3>
              </div>
              <p className="text-xs text-slate-400">Deepen your conceptual mastery by reflecting on what you have experienced.</p>
              <div className="space-y-3">
                {REFLECTION_PROMPTS.map((prompt) => (
                  <div key={prompt.id} className="p-3 bg-slate-900 rounded-xl border border-slate-700/80 space-y-2">
                    <label htmlFor={`refl-input-${prompt.id}`} className="text-xs font-bold text-indigo-200 flex items-center gap-1.5">
                      <span>{prompt.icon}</span> {prompt.question}
                    </label>
                    <textarea
                      id={`refl-input-${prompt.id}`}
                      rows={2}
                      value={reflections[prompt.id] || ''}
                      onChange={(e) => setReflections({ ...reflections, [prompt.id]: e.target.value })}
                      placeholder={prompt.placeholder}
                      aria-label={prompt.question}
                      className="w-full p-2 bg-slate-950 text-xs text-slate-200 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none font-sans"
                    />
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Save reflection entries"
                onClick={() => {
                  setReflectionSubmitted(true);
                  audioManager.play('success');
                  speechManager.speak('Great reflections! Thinking about economics in real life cements your knowledge.');
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md"
              >
                {reflectionSubmitted ? '✓ Reflections Recorded for Revision' : 'Save Reflection Journal'}
              </motion.button>
            </motion.div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-rose-950/40 rounded-xl border border-rose-800/60 space-y-2.5"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Your Diagnostic Misconception Profile:</span>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-slate-900 rounded-lg text-xs space-y-1"
                    >
                      <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Economic Correction: {m.correction}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Real World Activity Blueprint */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-3"
            >
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <motion.li key={i} whileHover={{ x: 3 }} className="flex gap-2 items-start">
                    <span className="font-bold text-indigo-400">{i + 1}.</span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Auxiliary Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_EconomicsHumanWantsClassificationSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

// Node IDs as string literals
const NODE_C10_ECON_001 = 'c10_econ_001';
const NODE_C10_ECON_002 = 'c10_econ_002';
const NODE_C10_ECON_003 = 'c10_econ_003';
const NODE_C10_ECON_004 = 'c10_econ_004';
const NODE_C10_ECON_005 = 'c10_econ_005';
const NODE_C10_ECON_006 = 'c10_econ_006';
const NODE_C10_ECON_007 = 'c10_econ_007';
const NODE_C10_ECON_008 = 'c10_econ_008';
const NODE_C10_ECON_009 = 'c10_econ_009';
const NODE_C10_ECON_010 = 'c10_econ_010';

const ALL_NODE_IDS = [
  NODE_C10_ECON_001,
  NODE_C10_ECON_002,
  NODE_C10_ECON_003,
  NODE_C10_ECON_004,
  NODE_C10_ECON_005,
  NODE_C10_ECON_006,
  NODE_C10_ECON_007,
  NODE_C10_ECON_008,
  NODE_C10_ECON_009,
  NODE_C10_ECON_010,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Bharat Agro-Industrial Venture: The Production & Market Simulation',
  intro: 'You have been appointed Chief Economic Advisor to a diversified enterprise operating across Punjab, Maharashtra, and Karnataka. From raw farm land to modern processing mills and nationwide retail markets, your task is to allocate the 4 factors of production efficiently, optimize labour productivity, oversee capital formation, and navigate shifting consumer demand.',
  context: 'Balance land fertility with irrigation, organize assembly-line division of labour, mobilize savings into productive capital goods, and forecast market price movements during supply shocks.',
};

// Discovery Question (Curiosity Hook)
const DISCOVERY_QUESTION = {
  question: 'In Economics, if a mining corporation discovers a massive underground coal deposit in Jharkhand and builds a ₹50 crore drilling rig on top of it, how are the deposit and the rig classified?',
  options: [
    'Both are Capital because they are worth crores of rupees.',
    'The coal deposit is Land (free gift of nature) and the drilling rig is Capital (man-made).',
    'Both are Land because they are physically attached to the earth.',
    'The coal is Capital (inventory) and the rig is Labour (active asset).',
  ],
  correctIndex: 1,
  hintAfter: "Surprised? In Economics, 'Land' means all free gifts of nature, not just farming soil!",
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

// 22 Comprehensive Challenges
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C10_ECON_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "Which of the following is strictly classified as 'Land' in the economic sense?",
    options: [
      'A tractor manufactured by Mahindra in Gujarat',
      'The natural groundwater reservoir beneath the Indo-Gangetic plain',
      'A concrete warehouse built for grain storage',
      'A Kisan Credit Card bank loan of ₹2,00,000',
    ],
    correctIndex: 1,
    explanation: "In Economics, Land encompasses all free gifts of nature (soil, water, mineral deposits, sunshine, rainfall), whereas tractors and warehouses are man-made capital.",
    hints: [
      "Think about which item was provided directly by nature rather than manufactured by human effort.",
      "Tractors and warehouses are man-made means of production.",
      "Groundwater is a natural resource existing prior to human production, making it Land.",
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C10_ECON_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each production element to its correct factor of production category.',
    dragItems: [
      { label: 'River Bhagirathi', targetId: 'slot_land' },
      { label: 'Factory Worker', targetId: 'slot_labour' },
      { label: 'Power Loom Machine', targetId: 'slot_capital' },
      { label: 'Business Founder', targetId: 'slot_entrepreneur' },
    ],
    correctMapping: {
      slot_land: 'River Bhagirathi',
      slot_labour: 'Factory Worker',
      slot_capital: 'Power Loom Machine',
      slot_entrepreneur: 'Business Founder',
    },
    explanation: 'Land is nature-given (River), Labour is human mental/physical exertion (Worker), Capital is man-made tool (Loom), and Entrepreneur is the risk-bearing coordinator (Founder).',
    hints: [
      'Identify which is a natural watercourse (Land).',
      'Identify who exerts human effort for a wage (Labour).',
      'Match the man-made machine to Capital and the organizer/risk-taker to Entrepreneur.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C10_ECON_002,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A farmer in Ludhiana harvests 15,000 kg of wheat from a 3-hectare irrigated alluvial plot. What is the land productivity in kg per hectare?',
    correctAnswer: 5000,
    tolerance: 0,
    unit: 'kg/ha',
    explanation: 'Productivity of land = Total Output ÷ Total Land Area = 15,000 kg ÷ 3 hectares = 5,000 kg/ha.',
    hints: [
      'Productivity is defined as output yielded per unit of land area.',
      'Divide the total wheat output (15,000 kg) by the total number of hectares (3).',
      '15000 / 3 = 5000 kg/ha.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C10_ECON_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "Punjab produces ~5,000 kg/ha of wheat while Bihar yields ~2,200 kg/ha despite both sharing the fertile Indo-Gangetic alluvial belt. Which human-made factor explains the largest part of this productivity gap?",
    options: [
      'Punjab has over 98% assured canal/tubewell irrigation coverage whereas Bihar relies heavily on erratic monsoons',
      'Bihar soil has zero natural minerals compared to Punjab',
      'Punjab farmers work 24 hours a day without sleep',
      'Bihar produces only spices and no food grains',
    ],
    correctIndex: 0,
    explanation: 'While natural fertility is similar, human-made irrigation (over 98% in Punjab) unlocks the full complementary potential of HYV seeds and chemical fertilisers.',
    hints: [
      'Natural fertility alone does not guarantee yield if water supply is erratic.',
      'Look for the human-made infrastructure factor that enables timely sowing and fertilizer absorption.',
      'Assured irrigation coverage is over 98% in Punjab compared to much lower levels in Bihar.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C10_ECON_003,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Which of the following activities counts as 'Labour' in the strict economic sense?",
    options: [
      'A student solving mathematics problems for 4 hours to prepare for board exams',
      'A mother cooking a five-course dinner for her children at home',
      'A surgeon performing a 3-hour cardiac operation at AIIMS for a monthly salary',
      'A volunteer planting trees in a municipal park on Sunday for personal joy',
    ],
    correctIndex: 2,
    explanation: 'Economic labour requires: (1) Human exertion, (2) Mental/physical effort, and (3) An economic reward (wage, salary, fee). Unpaid exertion is non-economic.',
    hints: [
      'The economic definition requires exertion WITH the motive of earning an economic reward.',
      'Exam preparation, mother cooking for family, and volunteering earn no wage or salary.',
      'The salaried surgeon receives economic remuneration for professional human exertion.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C10_ECON_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "In Maruti Suzuki's Manesar plant, car assembly is split across 200+ specialized stations (engine fitting, door mounting, windshield installation). What type of division of labour is this?",
    options: [
      'Product-based (Simple) Division of Labour',
      'Process-based (Complex) Division of Labour',
      'Territorial (Geographical) Division of Labour',
      'Primary Agricultural Division of Labour',
    ],
    correctIndex: 1,
    explanation: 'Process-based (complex) division of labour splits the sequential manufacture of a single product into specific sub-tasks performed by different specialized workers.',
    hints: [
      'Is one complete car made by one worker, or is the single product split into sequential steps?',
      'Simple division is when one worker makes an entire product; complex division splits one product into sub-operations.',
      'An assembly line with 200 stations for one car is process-based division.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C10_ECON_003,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence demonstrating how process-based division of labour lowers unit production cost:',
    sortItems: [
      'Single production process is split into specialized sub-tasks',
      'Workers repeat specific operations, gaining speed and dexterity',
      'Tool-switching idle time is eliminated and output per hour surges',
      'Fixed factory overheads are spread over massive output, lowering cost per unit',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Splitting tasks -> dexterity & speed -> eliminated downtime -> massive output lowering average cost (economies of scale).',
    hints: [
      'Start with the organizational division of tasks.',
      'Next comes worker repetition and skill development.',
      'Then output rises with zero tool downtime, leading finally to lower per-unit cost.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C10_ECON_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: "Which of the following is a structural reason for the lower efficiency of Indian labour compared to developed nations?",
    options: [
      'Indian workers are biologically and culturally disinclined to work hard',
      'Only 2-3% of India’s workforce has received formal vocational training compared to 60-80% in South Korea/Germany',
      'Indian factories operate without any human labour',
      'India’s population is too small to achieve any scale',
    ],
    correctIndex: 1,
    explanation: 'Efficiency differences are systemic and environmental: lack of vocational training (2-3% vs 80%), poor nutrition (stunting), outdated tools, and extreme summer heat reduce output per hour.',
    hints: [
      'Economics rejects biological or racial explanations of labour efficiency.',
      'Look for the structural skill and training gap between India and developed economies.',
      'Formal vocational training coverage in India is only ~2-3% vs ~80% in South Korea.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C10_ECON_004,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Tiruppur workshop has 100 handloom weavers producing 2 metres/day each (Total = 200m). If 50 weavers are trained on power looms yielding 50 metres/day each, while 50 remain on handlooms (2m/day), what is the new total daily output in metres?',
    correctAnswer: 2600,
    tolerance: 0,
    unit: 'metres',
    explanation: 'New Output = (50 power-loom weavers × 50m) + (50 handloom weavers × 2m) = 2,500m + 100m = 2,600 metres/day.',
    hints: [
      'Calculate power-loom output: 50 weavers × 50 metres.',
      'Calculate handloom output: 50 weavers × 2 metres.',
      'Add 2,500 + 100 = 2,600 metres.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C10_ECON_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Why is a ₹500 currency note classified as 'Financial Capital' rather than 'Physical Capital'?",
    options: [
      'Because paper currency degrades in water',
      'Because currency is a medium of exchange/claim that buys productive assets, but does not directly produce physical goods itself',
      'Because only coins are physical and paper notes are invisible',
      'Because the Reserve Bank of India is a government entity',
    ],
    correctIndex: 1,
    explanation: 'Physical capital directly enters production (machines, tools, factory sheds). Financial capital consists of money, shares, and loans that purchase or claim physical capital.',
    hints: [
      'Does a ₹500 note directly weld steel, sow seeds, or assemble cars?',
      'Tangibility is not the test; direct participation in the physical production process is.',
      'Money is a financial claim/medium that facilitates the purchase of physical tools.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C10_ECON_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the asset: A newly installed robotic arm at Tata Motors Sanand Plant is ___, while 1,000 equity shares of Tata Motors held by an investor are ___.',
    options: [
      'Physical Capital; Financial Capital',
      'Financial Capital; Physical Capital',
      'Land; Labour',
      'Working Capital; Fixed Land',
    ],
    correctIndex: 0,
    explanation: 'The robotic arm is a tangible, man-made tool directly welding car bodies (Physical Capital). The shares represent financial ownership claims on corporate profits (Financial Capital).',
    hints: [
      'Which item physically welds metal in the factory?',
      'Which item is a paper or demat financial claim on profits?',
      'Robotic arm = Physical Capital; Equity shares = Financial Capital.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C10_ECON_006,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the three mandatory stages of Capital Formation in their logical chronological order:',
    sortItems: [
      'Creation of Savings (Foregoing current consumption from income)',
      'Mobilisation of Savings (Channeling funds via banks, post offices, and capital markets)',
      'Investment of Mobilised Funds (Purchasing real physical capital goods like machinery and roads)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Capital formation strictly requires all 3 stages: Income saved -> Mobilised through financial intermediaries -> Real investment in physical capital goods.',
    hints: [
      'First, households must refrain from consuming all their income (Saving).',
      'Second, financial institutions must pool and channel these deposits (Mobilisation).',
      'Third, entrepreneurs must spend these funds to build physical assets (Investment).',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C10_ECON_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An engineer saves ₹50,000 and locks it in a home safe in cash for 3 years. Did capital formation occur?',
    options: [
      'Yes, because saving money is identical to capital formation.',
      'No, because stages 2 (mobilisation via financial system) and 3 (investment in real physical capital) never took place.',
      'Yes, because the currency note gained interest while resting in the safe.',
      'No, because only government spending counts as capital formation.',
    ],
    correctIndex: 1,
    explanation: 'Idle hoarded cash completes Stage 1 (saving) but fails Stage 2 (mobilisation) and Stage 3 (investment). Real capital formation requires new physical productive assets to be created.',
    hints: [
      'Did this money purchase a new tractor, machine, or factory shed?',
      'Saving alone is only the first of three stages.',
      'Without mobilisation through banks and investment in physical goods, capital stock remains unchanged.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C10_ECON_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does an Entrepreneur fundamentally differ from a Salaried General Manager?',
    options: [
      'The manager bears residual risk of business loss, whereas the entrepreneur receives a fixed contract salary',
      'The entrepreneur takes initiative, coordinates factors, and bears residual uncertainty/risk of profit or loss; the manager administers operations for a fixed salary',
      'The manager owns the factory while the entrepreneur is an employee',
      'There is zero difference; both terms are 100% interchangeable in Economics',
    ],
    correctIndex: 1,
    explanation: 'The defining attributes of an entrepreneur are initiative and bearing non-insurable residual risk. The manager is a salaried employee performing delegated administrative duties.',
    hints: [
      'Who bears the risk if the company goes bankrupt?',
      'Who receives residual profit vs a contractual monthly wage/salary?',
      'The entrepreneur initiates and bears the risk of loss; the manager executes operations for a salary.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C10_ECON_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "Kiran Mazumdar-Shaw founded Biocon in 1978 in a rented garage with ₹10,000 seed capital, pioneering industrial enzyme and recombinant insulin production in India. Which entrepreneurial function is best highlighted by introducing recombinant insulin?",
    options: [
      'Routine administrative bookkeeping',
      'Innovation (introducing a new product and biotechnology process)',
      'Avoiding all commercial risks',
      'Passive land ownership',
    ],
    correctIndex: 1,
    explanation: 'Joseph Schumpeter emphasized Innovation (new product, new production method, opening new markets) as the hallmark entrepreneurial function.',
    hints: [
      'Developing a brand new biotechnology product in India represents what core business concept?',
      'Think of Schumpeter’s definition of introducing new goods or technical methods.',
      'Recombinant insulin manufacturing is an example of product and process innovation.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C10_ECON_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "A student states: 'I really desire a ₹80 lakh Porsche sports car, but my total bank balance is ₹1,500.' Does this constitute economic demand?",
    options: [
      'Yes, because strong emotional desire is the only requirement for demand.',
      'No, because economic demand strictly requires Willingness + Ability to Pay + Specific Price & Time reference.',
      'Yes, because sports cars have high status value.',
      'No, because only food items can be demanded in economics.',
    ],
    correctIndex: 1,
    explanation: 'Demand is a desire backed by the purchasing power (ability to pay) at a specified price and time. Without purchasing power, it remains a mere wish or desire.',
    hints: [
      'Can the student buy the car with ₹1,500?',
      'Demand = Willingness + Ability to Pay + Price & Time reference.',
      'Desire without purchasing power cannot translate into market transactions.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_17',
    nodeId: NODE_C10_ECON_008,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "Match the type of demand: Electricity (used for lights, air conditioning, heaters, and factories) is ___, while Automobile Steel (demanded because consumers buy cars) is ___.",
    options: [
      'Composite Demand; Derived Demand',
      'Joint Demand; Direct Demand',
      'Direct Demand; Autonomous Demand',
      'Derived Demand; Composite Demand',
    ],
    correctIndex: 0,
    explanation: 'Composite demand exists when one commodity has multiple uses (electricity, milk). Derived demand exists when a good is demanded as an input to produce another final good (steel for cars).',
    hints: [
      'One good satisfying many wants = Composite demand (one good, many uses).',
      'An input demanded because of final consumer demand = Derived demand.',
      'Electricity has composite demand; steel for automotive manufacturing has derived demand.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C10_ECON_009,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the formal statement for the Law of Demand by arranging the fundamental economic conditions:',
    availableParts: ['Ceteris Paribus,', 'when price rises,', 'quantity demanded falls,', 'and when price falls,', 'quantity demanded rises.'],
    targetState: 'Ceteris Paribus, when price rises, quantity demanded falls, and when price falls, quantity demanded rises.',
    validationHint: 'Begin with the Latin clause meaning other things remaining equal, followed by the inverse price-quantity relationship.',
    explanation: 'The Law of Demand states that, ceteris paribus (other factors remaining constant), price and quantity demanded share an inverse relationship.',
    hints: [
      'Start with the Latin phrase for other things being equal (Ceteris Paribus).',
      'State what happens when price increases (quantity demanded falls).',
      'Complete the inverse statement for when price falls.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C10_ECON_009,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'At ₹50/kg of basmati rice, Family A demands 14 kg/month, Family B demands 11 kg/month, and Family C demands 25 kg/month. What is the total Market Demand at ₹50/kg?',
    correctAnswer: 50,
    tolerance: 0,
    unit: 'kg',
    explanation: 'Market Demand is the horizontal summation of all individual demands at that price: 14 + 11 + 25 = 50 kg/month.',
    hints: [
      'Market demand is found by horizontal summation (adding individual quantities at a given price).',
      'Add the quantities of Family A (14), Family B (11), and Family C (25).',
      '14 + 11 + 25 = 50 kg.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C10_ECON_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "When the retail price of petrol in Delhi increases from ₹90/litre to ₹100/litre, a car owner reduces monthly consumption from 40 litres to 32 litres. Geometrically, this represents:",
    options: [
      'A leftward shift of the entire petrol demand curve (Decrease in Demand)',
      'An upward movement along the same demand curve (Contraction of Demand)',
      'A rightward shift of the petrol demand curve (Increase in Demand)',
      'A downward movement along the same demand curve (Expansion of Demand)',
    ],
    correctIndex: 1,
    explanation: 'A change in the good’s OWN price causes a movement along the same curve (contraction as price rises). Non-price factors cause shifts.',
    hints: [
      'Did the good’s OWN price change, or did a non-price factor like income or tastes change?',
      'Own-price changes cause movement along the existing curve.',
      'A price rise causes an upward movement along the curve, known as contraction of demand.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_21',
    nodeId: NODE_C10_ECON_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: "Under the PM-KISAN scheme, direct income transfers of ₹6,000/year are credited to 11 crore rural families. At existing prices, rural demand for FMCG goods (packaged soap, biscuits) expands significantly. How is this illustrated graphically?",
    options: [
      'Downward movement along the existing FMCG demand curve (Expansion of Demand)',
      'Rightward shift of the entire FMCG demand curve (Increase in Demand)',
      'Upward movement along the FMCG demand curve (Contraction of Demand)',
      'Leftward shift of the FMCG demand curve (Decrease in Demand)',
    ],
    correctIndex: 1,
    explanation: 'An increase in consumer income is a non-price determinant. At every price level, consumers now purchase more, shifting the entire demand curve rightward.',
    hints: [
      'Did the price of soap and biscuits fall, or did consumer income increase?',
      'Income is a non-price factor.',
      'An increase in income shifts the entire demand curve to the right (Increase in Demand).',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_22',
    nodeId: NODE_C10_ECON_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'If electric vehicle (EV) charging prices plummet by 50% while consumer environmental awareness surges, what simultaneous double effect occurs in the market for Petrol Cars?',
    options: [
      'Petrol car demand curve shifts right due to cheap electricity',
      'The demand curve for Petrol Cars shifts leftward (substitute EV becomes cheaper and preferred), causing lower sales at every petrol car price point',
      'Movement downward along the petrol car demand curve with zero shift',
      'No effect whatsoever on petrol vehicles',
    ],
    correctIndex: 1,
    explanation: 'EVs are substitutes for petrol cars. Cheaper EV charging + higher eco-tastes make EVs attractive, shifting the demand curve for petrol cars leftward.',
    hints: [
      'Electric cars and petrol cars are substitute goods.',
      'When a substitute becomes cheaper and more popular, demand for the original good falls.',
      'This non-price factor shifts the petrol car demand curve leftward.',
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
  nodeId: NODE_C10_ECON_001,
  title: 'Class 10 Economics: Production Factors & Demand Theory Masterclass',
  definition: 'Comprehensive mastery of the four factors of production (Land, Labour, Capital, Entrepreneur) and the foundational Law of Demand, Schedules, Curves, and Curve Movements.',
  eli5: 'Learn how natural land, human labour, man-made machines, and daring entrepreneurs combine to make everything in an economy, and how price rules consumer shopping decisions!',
  misconceptions: [
    { misconception: "Land means only agricultural farming soil.", correction: "In Economics, Land includes all free gifts of nature (rivers, sunlight, minerals, forests, location)." },
    { misconception: "A tubewell or irrigation pump is Land because it is sunk in the ground.", correction: "Tubewells are man-made tools (Capital); only the underground water itself is Land." },
    { misconception: "Money in your wallet is Physical Capital.", correction: "Money is Financial Capital; it does not directly fabricate goods, but purchases physical machinery." },
    { misconception: "Land productivity depends purely on nature, so human policy cannot change it.", correction: "Human factors like 98% irrigation in Punjab raise yields to double those of rain-fed regions." },
    { misconception: "Desire and Demand mean the exact same thing.", correction: "Demand must be backed by purchasing power (ability to pay) and specified at a price and time." },
    { misconception: "A change in price causes the entire demand curve to shift.", correction: "Own-price changes cause movement along the same curve; non-price factors cause shifts." },
  ],
  diagnosticQuestions: [
    { question: 'Which factor of production is considered geographically immobile and fixed in total supply?', options: ['Capital', 'Labour', 'Land', 'Entrepreneur'], correctIndex: 2 },
    { question: 'What is the productivity of land if 2 hectares produce 8,000 kg of wheat?', options: ['2,000 kg/ha', '4,000 kg/ha', '8,000 kg/ha', '16,000 kg/ha'], correctIndex: 1 },
    { question: 'Which of the following is an example of territorial division of labour?', options: ['Maruti assembly line in Manesar', 'A single tailor stitching a shirt', 'Bengaluru specializing in IT and Tiruppur in knitwear', 'A carpenter making a chair'], correctIndex: 2 },
    { question: 'Which organization stage is missing if a farmer saves cash in an earthen pot at home?', options: ['Stage 1 Saving', 'Stage 2 Mobilisation & Stage 3 Investment', 'Stage 1 and 2', 'None'], correctIndex: 1 },
    { question: 'What is the reward earned by an entrepreneur for bearing residual business risk?', options: ['Fixed Salary', 'Contractual Interest', 'Economic Profit or Loss', 'Ground Rent'], correctIndex: 2 },
    { question: 'Demand for steel used to build bridges and cars is an example of:', options: ['Direct Demand', 'Composite Demand', 'Derived Demand', 'Joint Demand'], correctIndex: 2 },
    { question: 'The Law of Demand states an inverse relationship between price and quantity under the condition of:', options: ['Continuous Inflation', 'Ceteris Paribus (other things equal)', 'Variable Incomes', 'Monopoly'], correctIndex: 1 },
    { question: 'An increase in consumers’ disposable income shifts the demand curve for normal goods:', options: ['Upward along the curve', 'Leftward', 'Rightward', 'Downward along the curve'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student can systematically classify all 4 factors of production, calculate land productivity, analyze labour efficiency, trace capital formation stages, and model demand curve shifts vs movements.',
};

// Exploration Steps
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Land Productivity & The Irrigation Multiplier',
    instruction: 'Adjust the irrigation level and fertiliser inputs to observe how human capital unlocks soil fertility in Punjab vs Bihar.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_ECON_002,
  },
  {
    title: 'Lab 2: Assembly Line Division of Labour',
    instruction: 'Toggle between artisan single-worker mode and 4-stage division of labour to see output and unit costs transform in real-time.',
    interactionType: 'toggle-compare',
    nodeId: NODE_C10_ECON_003,
  },
  {
    title: 'Lab 3: The 3-Stage Capital Formation Pipeline',
    instruction: 'Slide household savings into bank mobilization and watch funds convert into physical capital goods.',
    interactionType: 'pipeline-flow',
    nodeId: NODE_C10_ECON_006,
  },
  {
    title: 'Lab 4: The Interactive Law of Demand Curve',
    instruction: 'Move the Price slider up and down to observe real-time movement along the downward-sloping demand curve.',
    interactionType: 'curve-plotter',
    nodeId: NODE_C10_ECON_009,
  },
  {
    title: 'Lab 5: Movement Along vs. Curve Shift Simulator',
    instruction: 'Test the crucial difference: change own price (movement) vs change consumer income or taste (curve shift).',
    interactionType: 'shift-simulator',
    nodeId: NODE_C10_ECON_010,
  },
];

// Predict-then-Check Questions
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If a factory owner shifts from 1 tailor making an entire shirt to 4 workers specializing in cutting, stitching, buttoning, and packing, what will happen to daily output?',
    options: [
      'Output will drop because workers get confused.',
      'Output will stay exactly the same because the number of hands is unchanged.',
      'Output will increase dramatically due to dexterity, zero tool-switching delay, and specialized rhythm.',
      'Output will become zero due to worker strikes.',
    ],
    correctIndex: 2,
    verifyInstruction: 'Now toggle the Division of Labour switch in Lab 2 to see the output meter jump from 20 to 180 shirts/day!',
    nodeId: NODE_C10_ECON_003,
  },
  {
    question: 'Prediction: If household income in a city doubles due to an economic boom, will this cause a movement along the milk demand curve or a shift?',
    options: [
      'Movement along the curve because milk is white.',
      'A rightward shift of the entire demand curve because income is a non-price factor that raises demand at every price.',
      'A leftward shift because people stop drinking milk.',
      'No graphical change whatsoever.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Consumer Income slider in Lab 5 to verify that the entire curve relocates rightward!',
    nodeId: NODE_C10_ECON_010,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: Look closely at the Land Productivity graph in Lab 1. What happens when you apply heavy fertiliser to dry, non-irrigated land?',
    observableOptions: [
      'Crop yield skyrockets to 10,000 kg/ha immediately.',
      'Without water, chemical fertiliser cannot be absorbed effectively and may scorch crops, yielding little gain.',
      'The land turns into gold.',
      'Rainfall automatically begins.',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_ECON_002,
  },
  {
    question: 'Observation: In Lab 4, what is the geometric direction of movement along the demand curve as price rises from ₹20 to ₹80?',
    observableOptions: [
      'The point slides upward and to the left (contraction of demand).',
      'The point slides downward and to the right (expansion of demand).',
      'The entire line jumps to the opposite corner.',
      'The graph rotates 360 degrees.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_ECON_009,
  },
];

// Real World Capstone Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Economic Planner: Design an Agro-Processing Enterprise',
  description: 'Apply all 4 factors of production and demand principles to establish a sustainable fruit-juice processing venture in rural Maharashtra.',
  steps: [
    'Factor 1 (Land): Select a 5-hectare plot near Nagpur with reliable groundwater access and orchard connectivity.',
    'Factor 2 (Labour): Implement process-based division of labour (Washing -> Peeling -> Pulping -> Packaging) and sponsor PMKVY vocational training.',
    'Factor 3 (Capital): Mobilize ₹40 lakh via bank loan (Financial Capital) to acquire stainless steel pasteurizers and cold storage (Physical Capital).',
    'Factor 4 (Entrepreneur): Innovate with organic packaging and analyze market demand curves to set remunerative price points.',
  ],
};

// Main Component
export function C10_EconomicsLandMeaningCharacteristicsSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Interaction States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Simulation Sliders / Controls
  // Lab 1: Land Productivity
  const [simSoilFertility, setSimSoilFertility] = useState<number>(60);
  const [simIrrigationLevel, setSimIrrigationLevel] = useState<number>(85);
  const [simFertiliserInput, setSimFertiliserInput] = useState<number>(70);
  const [simTenureSecurity, setSimTenureSecurity] = useState<boolean>(true);

  // Lab 2: Division of Labour
  const [divisionOfLabourActive, setDivisionOfLabourActive] = useState<boolean>(true);
  const [workerTrainingLevel, setWorkerTrainingLevel] = useState<number>(75);

  // Lab 3: Capital Formation Pipeline
  const [householdIncome, setHouseholdIncome] = useState<number>(100000);
  const [savingsRatePercent, setSavingsRatePercent] = useState<number>(30);
  const [bankingMobilisationRate, setBankingMobilisationRate] = useState<number>(85);

  // Lab 4 & 5: Demand Curves
  const [simMarketPrice, setSimMarketPrice] = useState<number>(40);
  const [simConsumerIncomeLevel, setSimConsumerIncomeLevel] = useState<number>(100);
  const [simSubstitutePrice, setSimSubstitutePrice] = useState<number>(100);
  const [simConsumerTasteIndex, setSimConsumerTasteIndex] = useState<number>(100);

  // Sandbox Free Play State
  const [sandboxActiveTab, setSandboxActiveTab] = useState<'land' | 'labour' | 'capital' | 'demand'>('land');

  // Challenge & Evaluation States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag, Sort & Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual / Audio Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Persistent BKT ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges based on adaptive mastery
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentCh = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Calculated Real-Time Metrics for Simulations
  // 1. Land Productivity Yield (kg/ha)
  const calculatedYield = useMemo(() => {
    const base = 1500;
    const fertilityBonus = (simSoilFertility / 100) * 1200;
    const waterMultiplier = (simIrrigationLevel / 100);
    const fertBonus = (simFertiliserInput / 100) * 1500 * (waterMultiplier > 0.4 ? waterMultiplier : 0.2);
    const tenureBonus = simTenureSecurity ? 800 : 0;
    return Math.round(base + fertilityBonus + fertBonus + tenureBonus);
  }, [simSoilFertility, simIrrigationLevel, simFertiliserInput, simTenureSecurity]);

  // 2. Factory Labour Output (units/day) and Unit Cost (₹/unit)
  const calculatedLabourMetrics = useMemo(() => {
    if (!divisionOfLabourActive) {
      const output = Math.round(20 * (1 + (workerTrainingLevel / 200)));
      const unitCost = Math.round(12000 / Math.max(1, output));
      return { output, unitCost, efficiencyRating: 'Low (Artisan craft)' };
    } else {
      const output = Math.round(180 * (1 + (workerTrainingLevel / 100)));
      const unitCost = Math.round(18000 / Math.max(1, output));
      return { output, unitCost, efficiencyRating: 'High (Industrial scale)' };
    }
  }, [divisionOfLabourActive, workerTrainingLevel]);

  // 3. Capital Formation Pipeline Values
  const capitalPipelineMetrics = useMemo(() => {
    const totalSaved = Math.round(householdIncome * (savingsRatePercent / 100));
    const totalMobilised = Math.round(totalSaved * (bankingMobilisationRate / 100));
    const physicalCapitalFormed = totalMobilised;
    const idleHoardedSavings = totalSaved - totalMobilised;
    return { totalSaved, totalMobilised, physicalCapitalFormed, idleHoardedSavings };
  }, [householdIncome, savingsRatePercent, bankingMobilisationRate]);

  // 4. Demand Curve Generator
  const demandCurveData = useMemo(() => {
    const shiftMultiplier = (simConsumerIncomeLevel / 100) * (simSubstitutePrice / 100) * (simConsumerTasteIndex / 100);
    const baseIntercept = 120 * shiftMultiplier;
    const slope = 1.0;

    const prices = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    return prices.map(p => {
      const q = Math.max(0, Math.round(baseIntercept - (slope * p)));
      return { price: p, quantity: q };
    });
  }, [simConsumerIncomeLevel, simSubstitutePrice, simConsumerTasteIndex]);

  // Current Quantity Demanded at simMarketPrice
  const currentQuantityDemanded = useMemo(() => {
    const shiftMultiplier = (simConsumerIncomeLevel / 100) * (simSubstitutePrice / 100) * (simConsumerTasteIndex / 100);
    const baseIntercept = 120 * shiftMultiplier;
    return Math.max(0, Math.round(baseIntercept - (1.0 * simMarketPrice)));
  }, [simMarketPrice, simConsumerIncomeLevel, simSubstitutePrice, simConsumerTasteIndex]);

  // Mount effect: Load saved mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty when BKT state updates
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas Animation loop for Economic Flows
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
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const pulseX = (frame * 2) % canvas.width;
      const gradient = ctx.createRadialGradient(pulseX, 15, 0, pulseX, 15, 40);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.6)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Production Ecosystem Live: Land · Labour · Capital · Entrepreneur`, 12, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Handlers
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentCh.hints[nextLevel - 1]) {
      setCurrentHint(currentCh.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentCh.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentCh]);

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
    speechManager.speak('Welcome to the Interactive Economics Laboratories. Let us discover by doing!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free exploration sandbox. Experiment with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Prepare for structured CISCE competency challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate economic observation!' : 'Check the data metrics again carefully.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You have completed the simulation with a mastery score of ${finalScore} percent.`);
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match') {
      isCorrect = answer === currentCh.correctIndex;
    } else if (currentCh.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctMapping);
    } else if (currentCh.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctOrder);
    } else if (currentCh.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (currentCh.correctAnswer || 0)) <= (currentCh.tolerance || 0);
    } else if (currentCh.type === 'construct') {
      isCorrect = (answer as string).trim() === currentCh.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${currentCh.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${currentCh.nodeId}`, JSON.stringify({ bestScore: 100, lastPlayed: Date.now() }));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentCh.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentCh.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentCh.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the complete step-by-step concept together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${currentCh.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentCh, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentCh.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentCh]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === 0 && currentCh.sortItems ? currentCh.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentCh]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (currentCh.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, currentCh, handleAnswer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* Top Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                ICSE Class 10 Economics
              </span>
              <span className="text-xs text-slate-400">Chapters 1 & 2</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                : difficulty === 'standard'
                ? 'bg-gold-950/80 text-gold-300 border-gold-700/60'
                : 'bg-purple-950/80 text-purple-300 border-purple-700/60'
            }`}
          >
            Tier: {difficulty}
          </motion.div>

          <div className="px-3 py-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium text-slate-300">
            Mastery: <span className="font-bold text-emerald-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* Dynamic Animated Canvas Header Flow */}
      <div className="my-4 rounded-xl overflow-hidden border border-slate-800/80 bg-slate-900/60">
        <canvas ref={canvasRef} width={600} height={28} className="w-full block" />
      </div>

      {/* ─── PHASE 1: DISCOVERY & SCENARIO HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-700/40 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm mb-2 uppercase tracking-wider">
              <span>🚀</span> Narrative Mission Brief
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-3 bg-gold-950/40 p-3 rounded-xl border border-gold-800/30">
              💡 <span className="font-semibold text-gold-200">Advisory Scope:</span> {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Curiosity Discovery Hook</span>
            </div>
            <p className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500 ring-2 ring-emerald-500/40'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 text-slate-500 border-slate-800 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-850 border border-slate-700">
                <p className={`text-sm font-semibold mb-3 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! You already think like an economist.' : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter interactive labs"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Bar */}
          <div className="flex items-center justify-between gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-800">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <span className="text-sm font-bold text-white hidden sm:inline">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                aria-label="Previous Lab"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white rounded-lg border border-slate-700"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                disabled={currentSlide === EXPLORATION_STEPS.length - 1}
                aria-label="Next Lab"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white rounded-lg border border-slate-700"
              >
                Next →
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl space-y-6"
            >
              <div>
                <h3 className="text-xl font-black text-emerald-400">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-sm mt-1 font-medium bg-amber-950/30 p-2.5 rounded-xl border border-amber-800/40">
                  👉 <span className="font-bold">Active Experiment:</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: Land Productivity Simulator (TOPIC SVG 1) */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
                        <span>Soil Natural Fertility (Natural)</span>
                        <span className="text-emerald-400 font-bold">{simSoilFertility}%</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        value={simSoilFertility}
                        onChange={(e) => setSimSoilFertility(Number(e.target.value))}
                        aria-label="Soil Fertility Slider"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
                        <span>Assured Irrigation Coverage (Human)</span>
                        <span className="text-gold-400 font-bold">{simIrrigationLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={simIrrigationLevel}
                        onChange={(e) => setSimIrrigationLevel(Number(e.target.value))}
                        aria-label="Irrigation Level Slider"
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
                        <span>HYV Seeds & Fertiliser Input (Capital)</span>
                        <span className="text-amber-400 font-bold">{simFertiliserInput} kg/ha</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={150}
                        value={simFertiliserInput}
                        onChange={(e) => setSimFertiliserInput(Number(e.target.value))}
                        aria-label="Fertiliser Input Slider"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-xs font-semibold text-slate-300">Tenure System</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSimTenureSecurity(!simTenureSecurity)}
                        aria-label="Toggle Land Tenure"
                        className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                          simTenureSecurity
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                            : 'bg-rose-950 text-rose-300 border-rose-600'
                        }`}
                      >
                        {simTenureSecurity ? '✓ Owner-Cultivator (Punjab)' : '✗ Insecure Tenant (Rainfed)'}
                      </motion.button>
                    </div>
                  </div>

                  {/* SVG 1: Live Land & Wheat Field Ecosystem */}
                  <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
                    <svg viewBox="0 0 320 140" className="w-full max-w-sm" aria-label="Land Productivity & Irrigation Diagram">
                      <defs>
                        <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#451a03" />
                          <stop offset="100%" stopColor="#271103" />
                        </linearGradient>
                        <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0284c7" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>
                      <rect x="15" y="85" width="290" height="45" rx="8" fill="url(#soilGrad)" stroke="#78350f" strokeWidth="2" />
                      {/* Irrigation Water Layer */}
                      <rect
                        x="15"
                        y="80"
                        width={290 * (simIrrigationLevel / 100)}
                        height="8"
                        rx="4"
                        fill="url(#waterGrad)"
                        opacity={0.85}
                      />
                      {/* Sun representing natural energy */}
                      <circle cx="280" cy="30" r="16" fill="#f59e0b" opacity="0.8" />
                      <path d="M280 8 L280 12 M280 48 L280 52 M258 30 L262 30 M298 30 L302 30" stroke="#fbbf24" strokeWidth="2" />
                      {/* Wheat stalks generated based on yield */}
                      {Array.from({ length: Math.min(18, Math.max(3, Math.round(calculatedYield / 300))) }).map((_, idx) => (
                        <g key={idx} transform={`translate(${30 + idx * 14}, 85)`}>
                          <line x1="0" y1="0" x2="0" y2="-45" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="0" cy="-48" r="4" fill="#eab308" />
                          <line x1="-3" y1="-30" x2="3" y2="-38" stroke="#eab308" strokeWidth="2" />
                          <line x1="3" y1="-25" x2="-3" y2="-33" stroke="#eab308" strokeWidth="2" />
                        </g>
                      ))}
                      <text x="25" y="120" fill="#a1a1aa" fontSize="10" fontWeight="bold">Natural Subsoil & Minerals (Land Factor)</text>
                    </svg>

                    <div className="text-center mt-3">
                      <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Total Land Productivity</div>
                      <div className="text-3xl font-black text-emerald-400">{calculatedYield.toLocaleString()} <span className="text-base font-medium text-slate-300">kg/hectare</span></div>
                      <p className="text-xs text-slate-400 mt-1">
                        {calculatedYield > 4500
                          ? '🌟 High Green Revolution Peak (comparable to Punjab / Haryana)'
                          : calculatedYield > 3000
                          ? '📈 Moderate Yield (Partial irrigation / Rain-fed fertile)'
                          : '⚠️ Low Productivity (Constrained by water & insecure tenure)'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Division of Labour Simulator (TOPIC SVG 2) */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-gold-950/60 rounded-2xl border border-gold-800">
                      <div className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">🎯 Step 1: Predict Before Testing</div>
                      <p className="text-sm font-semibold text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction choice ${i + 1}`}
                            className="p-3 text-left bg-slate-900 hover:bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && (
                    <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/60 text-xs text-gold-300 flex items-center justify-between">
                      <span>✓ Your prediction is locked. Now toggle the mode below to see the proof in action!</span>
                      <span className="font-bold text-emerald-400">Prediction Recorded</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-5 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 uppercase">Production Mode</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setDivisionOfLabourActive(!divisionOfLabourActive);
                            audioManager.play('pop');
                          }}
                          aria-label="Toggle Division of Labour"
                          className={`px-4 py-2 text-xs font-black rounded-xl border ${
                            divisionOfLabourActive
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500 ring-2 ring-emerald-500/30'
                              : 'bg-amber-950 text-amber-300 border-amber-600'
                          }`}
                        >
                          {divisionOfLabourActive ? '⚡ 4-Stage Division of Labour' : '✂ 1 Artisan Makes Whole Shirt'}
                        </motion.button>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
                          <span>Vocational Training (Skill India PMKVY)</span>
                          <span className="text-gold-400 font-bold">{workerTrainingLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={workerTrainingLevel}
                          onChange={(e) => setWorkerTrainingLevel(Number(e.target.value))}
                          aria-label="Worker Training Slider"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* SVG 2: Industrial Assembly Line Flow Diagram */}
                    <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <svg viewBox="0 0 400 110" className="w-full" aria-label="Assembly Line Division of Labour Diagram">
                        {/* Conveyor Belt track */}
                        <rect x="20" y="65" width="360" height="14" rx="7" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                        {/* 4 Workstations */}
                        {[
                          { name: '1. Cut', x: 50, col: '#6366f1' },
                          { name: '2. Stitch', x: 140, col: '#06b6d4' },
                          { name: '3. Button', x: 230, col: '#f59e0b' },
                          { name: '4. Pack', x: 320, col: '#10b981' },
                        ].map((st, i) => (
                          <g key={i}>
                            {/* Worker Head & Torso */}
                            <circle cx={st.x} cy="30" r="10" fill={divisionOfLabourActive ? st.col : '#64748b'} />
                            <path d={`M${st.x - 12} 55 Q${st.x} 42 ${st.x + 12} 55 Z`} fill={divisionOfLabourActive ? st.col : '#475569'} />
                            {/* Station label */}
                            <text x={st.x} y="95" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">{st.name}</text>
                            {/* Moving component on belt */}
                            <rect x={st.x - 8} y="68" width="16" height="8" rx="2" fill="#e2e8f0" />
                          </g>
                        ))}
                      </svg>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-center">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="text-[11px] text-slate-400 font-bold uppercase">Daily Output</div>
                          <div className="text-2xl font-black text-emerald-400">{calculatedLabourMetrics.output} shirts/day</div>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="text-[11px] text-slate-400 font-bold uppercase">Production Cost per Unit</div>
                          <div className="text-2xl font-black text-gold-400">₹{calculatedLabourMetrics.unitCost} / shirt</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Capital Formation Pipeline (TOPIC SVG 3) */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase">Stage 1: Savings</div>
                      <div className="text-lg font-black text-emerald-400 mt-1">₹{capitalPipelineMetrics.totalSaved.toLocaleString()}</div>
                      <p className="text-[11px] text-slate-400 mt-1">Foregone consumption by households</p>
                      <input
                        type="range"
                        min={10}
                        max={60}
                        value={savingsRatePercent}
                        onChange={(e) => setSavingsRatePercent(Number(e.target.value))}
                        aria-label="Savings rate slider"
                        className="w-full mt-2 accent-emerald-500"
                      />
                      <span className="text-[10px] text-slate-400 font-semibold">Savings Rate: {savingsRatePercent}%</span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase">Stage 2: Mobilisation</div>
                      <div className="text-lg font-black text-gold-400 mt-1">₹{capitalPipelineMetrics.totalMobilised.toLocaleString()}</div>
                      <p className="text-[11px] text-slate-400 mt-1">Deposited into Banks (Jan Dhan / Post Offices)</p>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={bankingMobilisationRate}
                        onChange={(e) => setBankingMobilisationRate(Number(e.target.value))}
                        aria-label="Mobilisation rate slider"
                        className="w-full mt-2 accent-gold-500"
                      />
                      <span className="text-[10px] text-slate-400 font-semibold">Banking Efficiency: {bankingMobilisationRate}%</span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase">Stage 3: Physical Investment</div>
                      <div className="text-lg font-black text-gold-400 mt-1">₹{capitalPipelineMetrics.physicalCapitalFormed.toLocaleString()}</div>
                      <p className="text-[11px] text-slate-400 mt-1">Spent on CNC Lathes, Tractors & Plant</p>
                      <div className="text-[11px] text-amber-400 font-bold mt-3">
                        ⚠️ Idle Cash (Hoarded): ₹{capitalPipelineMetrics.idleHoardedSavings.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* SVG 3: 3-Stage Capital Formation Flow Architecture */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 420 95" className="w-full" aria-label="3-Stage Capital Formation Pipeline Diagram">
                      {/* Box 1: Households Saving */}
                      <rect x="15" y="20" width="100" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="65" y="42" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">1. Savings</text>
                      <text x="65" y="58" fill="#6ee7b7" fontSize="8" textAnchor="middle">₹{capitalPipelineMetrics.totalSaved.toLocaleString()}</text>

                      {/* Arrow 1 */}
                      <path d="M 120 48 L 150 48" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />
                      <polygon points="152,48 144,43 144,53" fill="#10b981" />

                      {/* Box 2: Banking Mobilisation */}
                      <rect x="160" y="20" width="100" height="55" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="210" y="42" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. Mobilisation</text>
                      <text x="210" y="58" fill="#a5b4fc" fontSize="8" textAnchor="middle">₹{capitalPipelineMetrics.totalMobilised.toLocaleString()}</text>

                      {/* Arrow 2 */}
                      <path d="M 265 48 L 295 48" stroke="#6366f1" strokeWidth="2.5" />
                      <polygon points="297,48 289,43 289,53" fill="#6366f1" />

                      {/* Box 3: Physical Capital Formation */}
                      <rect x="305" y="20" width="100" height="55" rx="8" fill="#164e63" stroke="#06b6d4" strokeWidth="1.5" />
                      <text x="355" y="42" fill="#cffafe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Investment</text>
                      <text x="355" y="58" fill="#67e8f9" fontSize="8" textAnchor="middle">₹{capitalPipelineMetrics.physicalCapitalFormed.toLocaleString()}</text>
                    </svg>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 mt-2">Live Economic Flow:</h4>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                      <motion.div
                        className="bg-emerald-500 h-full"
                        animate={{ width: `${(capitalPipelineMetrics.physicalCapitalFormed / (householdIncome || 1)) * 100}%` }}
                      />
                      <motion.div
                        className="bg-amber-500 h-full"
                        animate={{ width: `${(capitalPipelineMetrics.idleHoardedSavings / (householdIncome || 1)) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/> Productive Capital Formed</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"/> Unmobilised Cash (Zero Capital)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Interactive Law of Demand Curve */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
                        <span>Market Price (P) on Vertical Y-Axis</span>
                        <span className="text-emerald-400 font-bold">₹{simMarketPrice} / kg</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={simMarketPrice}
                        onChange={(e) => setSimMarketPrice(Number(e.target.value))}
                        aria-label="Price Slider"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs text-slate-400 font-bold uppercase">Resulting Market Quantity Demanded:</div>
                      <div className="text-3xl font-black text-gold-400">{currentQuantityDemanded} <span className="text-sm font-medium text-slate-300">kg / month</span></div>
                      <p className="text-xs text-slate-400">
                        {simMarketPrice > 70
                          ? '🔼 High Price -> Contraction of Demand (Income & Substitution effects bite)'
                          : simMarketPrice < 30
                          ? '🔽 Low Price -> Expansion of Demand (Consumers buy more willingly)'
                          : '⚖ Mid-range equilibrium demand point'}
                      </p>
                    </div>
                  </div>

                  {/* Recharts Interactive Demand Curve */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={demandCurveData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis
                          dataKey="quantity"
                          type="number"
                          domain={[0, 150]}
                          stroke="#94a3b8"
                          label={{ value: 'Quantity Demanded (Q) ->', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 11 }}
                        />
                        <YAxis
                          dataKey="price"
                          type="number"
                          domain={[0, 110]}
                          stroke="#94a3b8"
                          label={{ value: 'Price (₹) ->', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
                        />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Movement Along vs Shift Simulator */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-slate-300">1. Own Price (Movement)</span>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={simMarketPrice}
                        onChange={(e) => setSimMarketPrice(Number(e.target.value))}
                        aria-label="Own price change"
                        className="w-full mt-2 accent-emerald-500"
                      />
                      <span className="text-[11px] text-emerald-400 font-bold">Price: ₹{simMarketPrice}</span>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-300">2. Consumer Income (Shift)</span>
                      <input
                        type="range"
                        min={50}
                        max={180}
                        value={simConsumerIncomeLevel}
                        onChange={(e) => setSimConsumerIncomeLevel(Number(e.target.value))}
                        aria-label="Income level shift"
                        className="w-full mt-2 accent-gold-500"
                      />
                      <span className="text-[11px] text-gold-400 font-bold">Income Index: {simConsumerIncomeLevel}%</span>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-300">3. Consumer Taste (Shift)</span>
                      <input
                        type="range"
                        min={50}
                        max={180}
                        value={simConsumerTasteIndex}
                        onChange={(e) => setSimConsumerTasteIndex(Number(e.target.value))}
                        aria-label="Taste index shift"
                        className="w-full mt-2 accent-amber-500"
                      />
                      <span className="text-[11px] text-amber-400 font-bold">Taste Index: {simConsumerTasteIndex}%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Current State Diagnostic:</div>
                      <div className="text-base font-black text-white mt-1">
                        {simConsumerIncomeLevel === 100 && simConsumerTasteIndex === 100
                          ? '📌 Pure Movement along original DD curve (Own Price changed)'
                          : simConsumerIncomeLevel > 100 || simConsumerTasteIndex > 100
                          ? '⏩ Rightward Shift (Increase in Demand: D1D1 drawn right)'
                          : '⏪ Leftward Shift (Decrease in Demand: D2D2 drawn left)'}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSimMarketPrice(40);
                        setSimConsumerIncomeLevel(100);
                        setSimConsumerTasteIndex(100);
                      }}
                      aria-label="Reset Curve Parameters"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl border border-slate-700"
                    >
                      Reset to Baseline
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Exploration Finish Button */}
              <div className="flex justify-end pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToSandbox}
                  aria-label="Enter Free Exploration Sandbox"
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-2xl shadow-xl flex items-center gap-2"
                >
                  Enter Free Exploration Sandbox →
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-white">Free Exploration Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">Manipulate all parameters across the 4 factors and demand freely with zero grading.</p>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {(['land', 'labour', 'capital', 'demand'] as const).map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSandboxActiveTab(tab);
                      audioManager.play('tap');
                    }}
                    aria-label={`Switch to ${tab} sandbox`}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                      sandboxActiveTab === tab
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sandbox Tab Content */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 min-h-[220px]">
              {sandboxActiveTab === 'land' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-3">
                    <label className="text-xs text-slate-300 font-semibold block">Irrigation (%): {simIrrigationLevel}%</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={simIrrigationLevel}
                      onChange={(e) => setSimIrrigationLevel(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                    <label className="text-xs text-slate-300 font-semibold block">Fertiliser (kg/ha): {simFertiliserInput}</label>
                    <input
                      type="range"
                      min={0}
                      max={150}
                      value={simFertiliserInput}
                      onChange={(e) => setSimFertiliserInput(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div className="text-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-bold uppercase">Simulated Output</div>
                    <div className="text-3xl font-black text-emerald-400 mt-1">{calculatedYield} kg/ha</div>
                  </div>
                </div>
              )}

              {sandboxActiveTab === 'labour' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-3">
                    <label className="text-xs text-slate-300 font-semibold block">PMKVY Vocational Training: {workerTrainingLevel}%</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={workerTrainingLevel}
                      onChange={(e) => setWorkerTrainingLevel(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDivisionOfLabourActive(!divisionOfLabourActive)}
                      className="w-full py-2 bg-gold-900 text-gold-200 text-xs font-bold rounded-lg"
                    >
                      Toggle Mode: {divisionOfLabourActive ? 'Complex Assembly Line' : 'Single Artisan'}
                    </motion.button>
                  </div>
                  <div className="text-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-bold uppercase">Daily Output / Unit Cost</div>
                    <div className="text-2xl font-black text-gold-400 mt-1">{calculatedLabourMetrics.output} units / ₹{calculatedLabourMetrics.unitCost}</div>
                  </div>
                </div>
              )}

              {sandboxActiveTab === 'capital' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-3">
                    <label className="text-xs text-slate-300 font-semibold block">Household Savings Rate: {savingsRatePercent}%</label>
                    <input
                      type="range"
                      min={5}
                      max={60}
                      value={savingsRatePercent}
                      onChange={(e) => setSavingsRatePercent(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                    <label className="text-xs text-slate-300 font-semibold block">Bank Mobilisation Efficiency: {bankingMobilisationRate}%</label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={bankingMobilisationRate}
                      onChange={(e) => setBankingMobilisationRate(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div className="text-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-bold uppercase">Real Capital Formed</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">₹{capitalPipelineMetrics.physicalCapitalFormed.toLocaleString()}</div>
                  </div>
                </div>
              )}

              {sandboxActiveTab === 'demand' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-3">
                    <label className="text-xs text-slate-300 font-semibold block">Market Price: ₹{simMarketPrice}</label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={simMarketPrice}
                      onChange={(e) => setSimMarketPrice(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                    <label className="text-xs text-slate-300 font-semibold block">Consumer Income Shift: {simConsumerIncomeLevel}%</label>
                    <input
                      type="range"
                      min={50}
                      max={180}
                      value={simConsumerIncomeLevel}
                      onChange={(e) => setSimConsumerIncomeLevel(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div className="text-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-bold uppercase">Monthly Quantity Demanded</div>
                    <div className="text-3xl font-black text-gold-400 mt-1">{currentQuantityDemanded} kg</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400">Feel confident with the core concepts?</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to challenges"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg"
              >
                Ready for CISCE Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: STRUCTURED COMPETENCY CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress Bar */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase font-semibold">
                  {currentCh.competencyLevel}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Score: <span className="text-emerald-400 font-bold">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
              </div>
            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentCh.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border shadow-2xl transition-colors duration-300 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-500/40'
                : 'border-slate-800'
            }`}
          >
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed mb-4">
              {currentCh.question}
            </h3>

            {/* MCQ Type Render */}
            {(currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match') && currentCh.options && (
              <div className="space-y-3">
                {currentCh.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.012 }}
                    whileTap={{ scale: 0.988 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full p-4 text-left rounded-2xl text-sm font-medium transition-all duration-200 border ${
                      showExplanation && i === currentCh.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40'
                        : wrongFlash
                        ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                        : 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-emerald-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Type Render */}
            {currentCh.type === 'drag-label' && currentCh.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 self-center mr-2">Drag Items:</span>
                  {currentCh.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable element: ${item.label}`}
                      role="button"
                      tabIndex={0}
                      className="px-3 py-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs font-bold rounded-lg cursor-grab border border-emerald-700"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'slot_land', name: 'Factor 1: Land' },
                    { id: 'slot_labour', name: 'Factor 2: Labour' },
                    { id: 'slot_capital', name: 'Factor 3: Capital' },
                    { id: 'slot_entrepreneur', name: 'Factor 4: Entrepreneur' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[100px] text-center"
                    >
                      <span className="text-xs font-bold text-slate-400 mb-1">{target.name}</span>
                      <span className="text-xs font-black text-emerald-300">
                        {droppedLabels[target.id] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Factor Mapping
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type Render */}
            {currentCh.type === 'drag-sort' && currentCh.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === currentCh.sortItems.length
                  ? sortArrangement.map((idx) => currentCh.sortItems![idx])
                  : currentCh.sortItems
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
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 rounded-xl text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 rounded-lg bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center text-xs">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
                >
                  Confirm Chronological Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge Render */}
            {currentCh.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    aria-label="Numerical answer input"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 w-64"
                  />
                  <span className="text-xs font-bold text-slate-400">{currentCh.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg disabled:opacity-50"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge Render */}
            {currentCh.type === 'construct' && currentCh.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 self-center mr-2">Available Clauses:</span>
                  {currentCh.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add clause ${part}`}
                      className="px-3 py-1.5 bg-gold-900/80 hover:bg-gold-800 text-gold-200 text-xs font-semibold rounded-lg border border-gold-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[90px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-700 flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-black hover:text-rose-300"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click clauses above to formulate the Law of Demand</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl disabled:opacity-50"
                >
                  Check Economic Formulation
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-emerald-700/60 rounded-2xl space-y-4"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span>💡</span> Step-by-Step Analytical Breakdown:
                </div>

                <div className="space-y-2">
                  {currentCh.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-200 text-sm leading-relaxed"
                    >
                      <span className="font-bold text-emerald-400 mr-1.5">{i + 1}.</span>
                      {sentence}{!sentence.endsWith('.') ? '.' : ''}
                    </motion.p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                  {revealedSteps < currentCh.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700"
                    >
                      Show Next Logical Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish & View Certificate →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MASTERY COMPLETION & MOTIVATIONAL FEEDBACK ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/60 text-center space-y-4 shadow-2xl">
            <div className="text-5xl">🏆</div>

            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="inline-block px-5 py-2 rounded-2xl bg-slate-950/90 border border-emerald-500/50 shadow-inner">
              <span className={`text-xl sm:text-2xl font-black tracking-wide ${
                errors === 0
                  ? 'text-emerald-400'
                  : errors <= 3
                  ? 'text-gold-300'
                  : errors <= 7
                  ? 'text-amber-300'
                  : 'text-purple-300'
              }`}>
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </span>
            </div>

            <h2 className="text-3xl font-black text-white">Economics Simulation Mastered!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have demonstrated full command over the 4 factors of production, productivity drivers, capital formation stages, and demand curve mechanics.
            </p>

            {/* PROMINENT SPACED REPETITION (SRS) VISIBILITY BANNER */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gold-950/70 border border-gold-500/50 rounded-2xl max-w-xl mx-auto flex items-center justify-between text-left gap-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-900/80 border border-gold-400/40 flex items-center justify-center text-xl flex-shrink-0">
                  📅
                </div>
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-gold-300">
                    Spaced Repetition Schedule (SM-2)
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {errors === 0
                      ? 'Review in 7 days — Flawless recall detected!'
                      : errors <= 3
                      ? 'Review in 3 days — Good retention, quick refresh advised!'
                      : 'Review in 1 day — Reinforce concepts tomorrow!'}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="px-3 py-1.5 bg-gold-500/20 text-gold-300 border border-gold-500/40 rounded-xl text-xs font-bold uppercase tracking-wider">
                  {errors === 0 ? '🗓 Next: In 7 Days' : errors <= 3 ? '🗓 Next: In 3 Days' : '🗓 Next: In 1 Day'}
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Accuracy Score</div>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Mastery Level</div>
                <div className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Questions Solved</div>
                <div className="text-2xl font-black text-gold-400">{filteredChallenges.length}</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Next Review</div>
                <div className="text-2xl font-black text-amber-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</div>
              </div>
            </div>
          </div>

          {/* Misconceptions Remediation Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">🎯 Your Personalized Remediation Profile:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 font-semibold mt-1">✓ ICSE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Capstone */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-emerald-400 mr-2">{i + 1}.</span> {step}
                </div>
              ))}
            </div>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-gold-950/40 rounded-3xl border border-gold-800/50 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">🧠 Metacognitive Reflection</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>1. Why is human capital (irrigation, training, technology) more decisive than raw soil in explaining Indian productivity differences?</li>
              <li>2. How does process-based division of labour make manufactured goods like cars and T-shirts affordable for middle-class consumers?</li>
              <li>3. If the government announces a GST reduction on hybrid cars, why does that cause an expansion of hybrid demand but a leftward shift for petrol cars?</li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Floating Interactive Engine Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_EconomicsLandMeaningCharacteristicsSim;
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
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C10_ECON_011 = 'c10_econ_011';
const NODE_C10_ECON_012 = 'c10_econ_012';
const NODE_C10_ECON_013 = 'c10_econ_013';
const NODE_C10_ECON_014 = 'c10_econ_014';
const NODE_C10_ECON_015 = 'c10_econ_015';
const NODE_C10_ECON_016 = 'c10_econ_016';
const NODE_C10_ECON_017 = 'c10_econ_017';
const NODE_C10_ECON_018 = 'c10_econ_018';
const NODE_C10_ECON_019 = 'c10_econ_019';
const NODE_C10_ECON_020 = 'c10_econ_020';

const ALL_NODE_IDS = [
  NODE_C10_ECON_011,
  NODE_C10_ECON_012,
  NODE_C10_ECON_013,
  NODE_C10_ECON_014,
  NODE_C10_ECON_015,
  NODE_C10_ECON_016,
  NODE_C10_ECON_017,
  NODE_C10_ECON_018,
  NODE_C10_ECON_019,
  NODE_C10_ECON_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Agri-Commerce & Market Simulator',
  subtitle: 'Executive Decision Room • Nashik, Azadpur, Tiruppur & Dalal Street',
  intro: 'You are appointed as the Senior Economic Advisor to the National Agricultural & Industrial Commerce Grid. From Lasalgaon onion auctions and Punjab wheat granaries to Bengaluru smartphone retail, Tiruppur textile export hubs, and Mumbai stock exchanges, market forces are continuously colliding. Monsoon shocks, GST policy shifts, wedding season demand spikes, supply chain bottlenecks, and electronic mandis (e-NAM) require rigorous analytical precision.',
  context: 'Master non-price demand shifts, Giffen and Veblen paradoxes, stock versus supply distinctions, cost-curve shifters, perishable vertical supply schedules, price elasticity formulas (Ed & Es), total revenue tests, and virtual market architectures.',
  missionGoal: 'Diagnose 22 real-world market disruptions, balance multi-variable market shifts, evaluate supply-chain elasticity, and design optimal price structures.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In July 2023, torrential unseasonal rains destroyed 40% of tomato crops across Karnataka and Himachal Pradesh, while international diesel prices pushed transport freight up by 25%. What happens to the supply curve of tomatoes in Delhi’s Azadpur mandi?',
  options: [
    'Upward movement along the existing static supply curve because market retail prices climbed',
    'Leftward shift of the entire supply curve due to crop destruction and higher per-unit freight costs',
    'Rightward shift because distressed farmers rush to dump whatever tomatoes they have',
    'The demand curve shifts rightward while the tomato supply schedule remains completely static',
  ],
  correctIndex: 1,
  hintAfter: 'Crop destruction directly cuts physical harvest capacity, and diesel price increases per-unit production/transport cost! These are fundamental non-price supply shifters that displace the entire supply curve leftward. Let us explore the exact mathematics!',
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
}

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the price of tea (a substitute for coffee) doubles overnight, what will happen to the demand curve for coffee?',
    options: [
      'Coffee demand curve shifts rightward as consumers switch from expensive tea (✓)',
      'Coffee demand curve shifts leftward',
      'No change — they are unrelated goods',
      'Coffee demand curve becomes vertical',
    ],
    correctIndex: 0,
    verifyInstruction: 'In the Substitute Price lab, slide the tea price to ₹200/kg and observe the coffee demand curve shifting rightward.',
  },
  {
    question: 'Predict: If a government announces a future 20% income tax cut effective next month, what happens to current demand for luxury cars?',
    options: [
      'Current demand rises immediately due to anticipated higher disposable income (✓)',
      'Current demand falls as people wait',
      'No change until the tax cut takes effect',
      'Demand shifts leftward permanently',
    ],
    correctIndex: 0,
    verifyInstruction: 'In the Income Expectations lab, toggle "Announce Tax Cut" and watch current demand for luxury cars shift rightward before the cut even takes effect.',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when you increase consumer income in the Demand Shift Simulator?',
    observableOptions: [
      'The demand curve for normal goods shifts rightward (✓)',
      'The demand curve for normal goods shifts leftward (✗)',
      'The demand curve becomes perfectly horizontal (✗)',
      'Nothing changes — income does not affect demand (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When the price of a complementary good (petrol) rises sharply, what happens to the demand for cars in the simulator?',
    observableOptions: [
      'Car demand curve shifts leftward as complementary cost rises (✓)',
      'Car demand curve shifts rightward (✗)',
      'Car demand curve stays in the same position (✗)',
      'Car demand becomes perfectly elastic (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 24 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C10_ECON_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following events causes a structural SHIFT of the demand curve for coffee rather than a movement along it?',
    options: [
      'A change in the retail price of coffee powder itself',
      'A steep rise in the price of tea (a close substitute good)',
      'A temporary promotional discount offered by coffee cafes',
      'An annual clearance sale on filter coffee decoction packs',
    ],
    correctIndex: 1,
    explanation: 'A change in the price of a substitute (tea) is an exogenous non-price determinant for coffee, shifting the entire coffee demand curve rightward. Any change in coffee’s own price produces only a contraction or expansion (movement along) its own existing demand curve.',
    hints: [
      'Ask yourself: Did coffee’s own price change, or did a related good change?',
      'Tea and coffee are substitute goods for everyday beverage drinkers.',
      'A price hike in tea shifts the entire demand curve for coffee rightward.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C10_ECON_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A farmer in Khanna, Punjab harvests 120 quintals of wheat. She keeps 20 quintals for domestic family consumption, 10 quintals for next season seeds, and transports 90 quintals to the APMC mandi at the current MSP of ₹2,275/quintal. What are her total stock and market supply?',
    options: [
      'Stock = 90 quintals, Supply = 120 quintals',
      'Stock = 120 quintals, Supply = 90 quintals',
      'Stock = 120 quintals, Supply = 120 quintals',
      'Stock = 90 quintals, Supply = 30 quintals',
    ],
    correctIndex: 1,
    explanation: 'Stock is the total aggregate quantity physically in existence and available with the producer (120 quintals). Supply is strictly the specific portion actually brought to market and offered for sale at the given price during that period (90 quintals).',
    hints: [
      'Stock represents the entire harvest stored in the barn/godown.',
      'Supply represents the portion offered for sale in the market at the ruling price.',
      'Stock is 120 quintals; supply is 90 quintals.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C10_ECON_020,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the 4 indispensable pillars of a Market to their correct functional definitions in economic theory.',
    dragItems: [
      { label: 'Demand Agents (Buyers)', targetId: 'box_buyers' },
      { label: 'Supply Agents (Sellers)', targetId: 'box_sellers' },
      { label: 'Tradable Entity (Commodity)', targetId: 'box_good' },
      { label: 'Exchange Ratio (Price)', targetId: 'box_price' },
    ],
    correctMapping: {
      box_buyers: 'Demand Agents (Buyers)',
      box_sellers: 'Supply Agents (Sellers)',
      box_good: 'Tradable Entity (Commodity)',
      box_price: 'Exchange Ratio (Price)',
    },
    explanation: 'Every economic market arrangement requires four core elements: Buyers (creating demand), Sellers (providing supply), a well-defined Commodity or Service, and an agreed Price (ratio of exchange). A physical building is not required.',
    hints: [
      'Who creates the demand side of the economic transaction?',
      'Who supplies the goods or services in exchange for revenue?',
      'What item is traded, and what monetary value facilitates the deal?',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C10_ECON_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why does the normal law-abiding supply curve slope upward from left to right?',
    options: [
      'Because higher prices erode consumer purchasing power and reduce utility',
      'Because higher market prices expand profit margins and enable producers to cover rising marginal costs',
      'Because of the law of diminishing marginal utility of money for buyers',
      'Because total production stock across the nation is permanently fixed by nature',
    ],
    correctIndex: 1,
    explanation: 'The upward slope demonstrates the positive relationship between price and quantity supplied. Higher prices increase profitability per unit, motivating firms to allocate more resources, hire extra labour shifts, and cover the rising marginal costs of expansion.',
    hints: [
      'Look at incentives through the eyes of a profit-seeking business owner.',
      'Higher selling prices mean higher profit margins per unit produced.',
      'The profit motive and increasing marginal cost explain the upward slope.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C10_ECON_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'At Kolkata’s Howrah wholesale fish market at 7:00 PM, why do fishmongers drastically slash selling prices without withdrawing fresh fish from the auction floor?',
    options: [
      'Fresh fish is classified as a Veblen luxury item with upward sloping demand',
      'Fresh fish is perishable and cannot be stored overnight without freezing assets, rendering daily supply vertical (Es = 0)',
      'The elasticity of supply of fresh fish is infinite in the market period',
      'Fishermen expect fish prices across Bengal to double tomorrow morning',
    ],
    correctIndex: 1,
    explanation: 'Perishable commodities have zero shelf-life without refrigerated warehousing. In the market day period, the supply curve is perfectly inelastic (vertical). Sellers must liquidate the entire stock at whatever clearing price buyers bid.',
    hints: [
      'What happens to fresh seafood if it is not sold before morning arrives?',
      'Perishable goods cannot be withheld from the market to wait for better prices.',
      'This creates a vertical supply schedule (an exception to the normal law of supply).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C10_ECON_018,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'When the price of petrol in Mumbai rises from ₹100 to ₹110 per litre (a 10% increase), the monthly quantity demanded in a district falls from 500,000 litres to 475,000 litres (a 5% decline). Compute the absolute Price Elasticity of Demand (|Ed|).',
    correctAnswer: 0.5,
    tolerance: 0.05,
    unit: '',
    explanation: '%ΔP = (10 / 100) × 100 = 10%. %ΔQd = (-25,000 / 500,000) × 100 = -5%. |Ed| = |-5% / 10%| = 0.50 (Inelastic Demand, |Ed| < 1).',
    hints: [
      'Formula: |Ed| = |(% change in Quantity Demanded) / (% change in Price)|.',
      'Percentage change in quantity is 5%, and price rose by 10%.',
      '5 divided by 10 = 0.50.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C10_ECON_015,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of economic events demonstrating how a Government Subsidy on solar irrigation pumps expands agricultural crop supply.',
    sortItems: [
      'Ministry of Agriculture rolls out a 50% capital subsidy on PM-KUSUM solar pumps',
      'Per-acre irrigation electricity and diesel operational expenses decline significantly',
      'Farmers gain higher profit margins at every existing market crop price level',
      'The entire agricultural crop supply curve shifts rightward (Increase in Supply)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'A government subsidy reduces the per-unit cost of production, widening profit margins across all price tiers and causing an outward rightward shift of the supply schedule.',
    hints: [
      'Begin with the government policy intervention.',
      'How does the subsidy affect operational farming input costs?',
      'Cost reductions expand profit margins, prompting higher output at all prices.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C10_ECON_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Following an annual salary hike for tech employees in Whitefield, Bengaluru, sales of unbranded loose coarse grains drop by 18% as families switch to organic branded quinoa and basmati rice. In economic theory, unbranded coarse grain is classified as:',
    options: [
      'A normal good with high luxury elasticity',
      'An inferior good whose demand curve shifts leftward as consumer income increases',
      'A Veblen good purchased solely for conspicuous status display',
      'A complementary good to packaged organic basmati rice',
    ],
    correctIndex: 1,
    explanation: 'For inferior goods, an increase in real consumer income leads to a decrease in demand (leftward shift of the demand curve) as consumers substitute superior, higher-grade branded alternatives.',
    hints: [
      'Notice that Income went UP, but Demand for coarse grain went DOWN.',
      'When income and demand move in opposite directions, the commodity is called...',
      'It is an Inferior Good.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C10_ECON_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A handcrafted bridal lehenga collection by a luxury couturier priced at ₹6,00,000 witnesses an INCREASE in booking orders after its price is hiked to ₹8,50,000, because ultra-high-net-worth buyers seek greater social prestige. This phenomenon illustrates:',
    options: [
      'Giffen Good paradox in agricultural staples',
      'Veblen Good effect (Conspicuous Consumption & Snob Appeal)',
      'Speculative hoarding during hyperinflation',
      'Contraction of supply caused by raw silk bottlenecks',
    ],
    correctIndex: 1,
    explanation: 'Veblen goods (named after Thorstein Veblen) are luxury status items whose demand rises as price rises because high price confers exclusive prestige and conspicuous social recognition.',
    hints: [
      'Is the good purchased by poor households for survival or by wealthy elites for status?',
      'High price signals exclusivity and snob appeal.',
      'This is the Veblen Effect (Conspicuous Consumption).',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C10_ECON_019,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A textile mill in Tiruppur supplies 4,000 export shirts/month when price is ₹500/shirt. When international market price rises to ₹600/shirt (a 20% price increase), the factory operates an overtime shift and supplies 5,200 shirts/month (a 30% quantity increase). Compute the Price Elasticity of Supply (Es).',
    correctAnswer: 1.5,
    tolerance: 0.05,
    unit: '',
    explanation: '%ΔP = (100 / 500) × 100 = 20%. %ΔQs = (1,200 / 4,000) × 100 = 30%. Es = (%ΔQs) / (%ΔP) = 30% / 20% = 1.50 (Elastic Supply, Es > 1). Supply elasticity is always positive.',
    hints: [
      'Formula: Es = (% change in Quantity Supplied) / (% change in Price).',
      '%ΔQs = 30% and %ΔP = 20%.',
      '30 / 20 = 1.50.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C10_ECON_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In 2022, imported coking coal prices surged by 60%, escalating steel production costs for Tata Steel. Concurrently, national highway and bridge projects pushed domestic finished steel selling prices from ₹55,000 to ₹68,000 per tonne. How are these two simultaneous forces represented on a steel supply diagram?',
    options: [
      'Both forces cause a rightward shift of the steel supply curve',
      'Coking coal price surge shifts the entire supply curve leftward; the rise in finished steel selling price causes an upward movement along the shifted curve',
      'Coking coal causes an upward movement along the curve; finished steel price shifts the curve rightward',
      'Both forces trigger a contraction of demand along the demand curve',
    ],
    correctIndex: 1,
    explanation: 'Coking coal is an INPUT price (an exogenous non-price determinant for steel), shifting the steel supply curve leftward. The rise in steel’s OWN market price causes an expansion/movement along that supply curve.',
    hints: [
      'Differentiate between an input cost and the output’s own selling price.',
      'Input cost changes SHIFT the entire curve.',
      'Output selling price changes cause MOVEMENT along the curve.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C10_ECON_018,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match each Indian commodity with its theoretical Price Elasticity of Demand (|Ed|) profile.',
    dragItems: [
      { label: 'Life-saving Insulin Injection (|Ed| = 0)', targetId: 'box_perf_inel' },
      { label: 'Common Iodized Cooking Salt (|Ed| < 1)', targetId: 'box_inel' },
      { label: 'Air India Business Class Holiday Flight (|Ed| > 1)', targetId: 'box_el' },
      { label: 'Single Farmer Wheat in Mandi (|Ed| = ∞)', targetId: 'box_perf_el' },
    ],
    correctMapping: {
      box_perf_inel: 'Life-saving Insulin Injection (|Ed| = 0)',
      box_inel: 'Common Iodized Cooking Salt (|Ed| < 1)',
      box_el: 'Air India Business Class Holiday Flight (|Ed| > 1)',
      box_perf_el: 'Single Farmer Wheat in Mandi (|Ed| = ∞)',
    },
    explanation: 'Insulin has no substitutes (perfectly inelastic |Ed|=0); Salt is an essential tiny fraction of income (inelastic |Ed|<1); Luxury air travel has close train/car substitutes (elastic |Ed|>1); Standardized agricultural output under perfect competition faces a horizontal demand line (|Ed|=∞).',
    hints: [
      'Which good is medically vital with zero possible substitutes?',
      'Which kitchen staple costs minimal expenditure and has inelastic demand?',
      'Which travel luxury has easily accessible high-speed rail substitutes?',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C10_ECON_012,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the precise 3-condition theoretical chain required for a classic Giffen Good paradox to occur in a low-income household.',
    availableParts: [
      'Inferior Staple Good',
      'Consumes Massive Budget Share (>70%)',
      'Negative Income Effect Overwhelms Substitution Effect',
      'High Luxury Brand Prestige',
      'Horizontal Demand Curve',
    ],
    targetState: 'Inferior Staple Good Consumes Massive Budget Share (>70%) Negative Income Effect Overwhelms Substitution Effect',
    validationHint: 'Select and assemble the 3 conditions: good classification, budget dominance, and negative income effect dominance.',
    explanation: 'A Giffen good must be an inferior staple good occupying the dominant share of a poor family’s budget, where the real income reduction from a price rise forces the family to buy more of the cheapest calorie source.',
    hints: [
      'Start with the staple good classification (Inferior Staple Good).',
      'Add the condition regarding household budget dominance.',
      'Conclude with the condition where the negative income effect outweighs the substitution effect.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C10_ECON_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'The Government of India’s e-NAM (National Agriculture Market) connects over 1,360 APMC mandis across 23 states via a unified cloud trading portal. In economic theory, this proves that a Market is fundamentally defined as:',
    options: [
      'A physical bazaar with brick-and-mortar stalls and covered sheds',
      'An institutional arrangement enabling buyers and sellers to interact and exchange at a price, irrespective of physical location',
      'A charitable government welfare distribution network that eliminates prices',
      'A state monopoly where government officers set all transaction quotas',
    ],
    correctIndex: 1,
    explanation: 'In economics, a market is not a physical geographical place, but any institutional arrangement, mechanism, or platform that facilitates interaction between buyers and sellers to establish an exchange price.',
    hints: [
      'Does trading on e-NAM or Amazon require buyers and sellers to stand in the same room?',
      'What is the true economic definition of a market?',
      'Market = an arrangement facilitating exchange at a price.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C10_ECON_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Indian Railways evaluates a 10% fare hike on Sleeper Class vs Executive AC Chair Car. Why does Total Revenue RISE on Sleeper Class but FALL on Executive Chair Car?',
    options: [
      'Sleeper demand is elastic (|Ed| > 1); Executive demand is perfectly inelastic (|Ed| = 0)',
      'Sleeper demand is inelastic (|Ed| < 1, no viable cheap alternatives); Executive demand is elastic (|Ed| > 1, passengers switch to IndiGo flights and AC buses)',
      'Both travel classes possess unitary elasticity (|Ed| = 1)',
      'Marginal operating costs on Sleeper Class trains are strictly zero',
    ],
    correctIndex: 1,
    explanation: 'By the Total Revenue rule: when |Ed| < 1 (inelastic Sleeper), the % drop in passenger volume is smaller than the 10% fare hike, raising total revenue. When |Ed| > 1 (elastic Executive), the % passenger loss exceeds 10% as commuters switch to airlines, decreasing total revenue.',
    hints: [
      'Recall the Total Revenue Test: Price hike increases TR only when demand is inelastic (|Ed| < 1).',
      'Do low-income sleeper passengers have easy fast substitutes for 1,000 km trips?',
      'Executive passengers can readily switch to budget airlines.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C10_ECON_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In 2023, the Production Linked Incentive (PLI) scheme granted a 6% production subsidy to domestic Air Conditioner manufacturers. Simultaneously, global copper tubing prices rose by 20%. If copper accounts for exactly 15% of total AC manufacturing cost, what is the NET shift of the AC market supply curve?',
    options: [
      'Net leftward shift because copper price rose by 20%',
      'Net rightward shift because the 6% subsidy exceeds the 3% cost increase from copper (20% × 15%)',
      'Zero shift because taxes and subsidies cancel each other out',
      'Supply curve becomes completely vertical at current factory capacity',
    ],
    correctIndex: 1,
    explanation: 'The copper price increase raises total production cost by only 3% (20% × 0.15 = 3%). The PLI subsidy lowers production cost by 6%. The net outcome is a 3% net cost reduction, which shifts the AC supply curve RIGHTWARD.',
    hints: [
      'Calculate the weighted cost impact of copper: 20% × 15% = 3%.',
      'Compare the 3% cost increase against the 6% subsidy cost reduction.',
      'Net cost fell by 3%, causing a rightward supply shift.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C10_ECON_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In Delhi, domestic subsidized LPG cylinder price increased from ₹900 to ₹1,125 (a 25% price increase). Average monthly household consumption contracted from 1.6 to 1.4 cylinders. Calculate the absolute Price Elasticity of Demand (|Ed|) rounded to 2 decimal places.',
    correctAnswer: 0.5,
    tolerance: 0.05,
    unit: '',
    explanation: '%ΔP = ((1,125 - 900) / 900) × 100 = 25%. %ΔQd = ((1.4 - 1.6) / 1.6) × 100 = -12.5%. |Ed| = |-12.5% / 25%| = 0.50 (Inelastic Demand).',
    hints: [
      '%ΔP = (225 / 900) × 100 = 25%.',
      '%ΔQd = (-0.2 / 1.6) × 100 = -12.5%.',
      '|-12.5% / 25%| = 0.50.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C10_ECON_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During April 2021, Serum Institute of India could not expand Covishield vaccine output beyond 2.5 million doses/day despite urgent price incentives. By December 2021, daily output scaled past 8 million doses. What primary economic determinant explains this shift in supply elasticity?',
    options: [
      'Consumer demand became perfectly elastic over time',
      'Time Period factor: Supply was highly inelastic in the short run due to fixed bioreactor capacity, but became highly elastic in the long run as new production lines were constructed',
      'Vaccines transformed from Giffen goods into Veblen goods',
      'The law of supply failed permanently in medical manufacturing',
    ],
    correctIndex: 1,
    explanation: 'Time is the primary determinant of supply elasticity. In the market/short period, fixed physical capital prevents rapid expansion (Es < 1). In the long run, all factors of production are variable, enabling highly elastic supply responses (Es > 1).',
    hints: [
      'Why cannot pharmaceutical bioreactors be built and certified overnight?',
      'Consider the distinction between short-run fixed inputs and long-run variable scale.',
      'Time period is the master determinant of supply elasticity.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C10_ECON_014,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Arrange the 4 methodological steps to construct the Market Supply Schedule from individual farmers via Horizontal Summation.',
    sortItems: [
      'Establish uniform price levels on the vertical axis (e.g., ₹2,000, ₹2,500, ₹3,000/qtl)',
      'Record quantities supplied by Farmer Ramesh, Farmer Suresh, and Farmer Priya at each price point',
      'Perform horizontal summation: Q_market = Q_Ramesh + Q_Suresh + Q_Priya at each price level',
      'Plot the aggregate market supply curve to the right of the individual supply curves',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Market supply schedule derivation requires establishing price benchmarks, tabulating individual quantities at each price, summing those quantities horizontally, and plotting the aggregate schedule.',
    hints: [
      'First establish the uniform price scale.',
      'Gather individual supply schedules from each farmer.',
      'Add quantities horizontally across each price level.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C10_ECON_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An original 1902 oil painting by Raja Ravi Varma is auctioned at Sotheby’s Mumbai for ₹42 Crore. What is the Price Elasticity of Supply (Es) of this historical artifact, and what determines its clearing price?',
    options: [
      'Es = ∞; price is determined by the production cost of canvas and paint',
      'Es = 0 (perfectly vertical supply); price is determined solely by buyer demand intensity and bidding competition',
      'Es = 1.0; price is determined by horizontal summation of art galleries',
      'Es is negative because historical paintings are inferior goods',
    ],
    correctIndex: 1,
    explanation: 'Historical antiques and deceased master artists’ works have permanently fixed physical stock that cannot increase regardless of price (Es = 0, vertical supply). Price is determined exclusively by the position and height of the demand curve.',
    hints: [
      'Can any modern painter create an authentic 1902 Raja Ravi Varma original?',
      'Physical supply is permanently fixed at existing specimens.',
      'Es = 0 (vertical supply curve), meaning demand alone dictates price.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C10_ECON_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In Union Budget 2024, the government slashed customs duty on physical gold from 15% to 6%, lowering domestic retail gold prices. Concurrently, the festive wedding season began across India. How do these two forces interact graphically in the gold jewellery market?',
    options: [
      'Both forces cause a leftward shift of the jewellery demand curve',
      'The duty reduction lowers gold retail price (causing downward expansion/movement along the demand curve), while the wedding season shifts the entire demand curve rightward',
      'The duty cut shifts demand leftward; wedding season causes contraction along the curve',
      'Both forces cause movements along the existing supply curve only',
    ],
    correctIndex: 1,
    explanation: 'A reduction in gold’s own retail price leads to an expansion of demand (movement downward along the demand curve). The festive wedding season represents a favourable cultural taste/preference shock (a non-price determinant shifting the demand curve rightward).',
    hints: [
      'Differentiate gold’s own price change from the cultural season preference.',
      'Own price reduction = movement along the demand curve.',
      'Cultural wedding season = rightward shift of the demand curve.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C10_ECON_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which of the following economic transactions FAILS the 4-pillar theoretical criteria of a Market transaction?',
    options: [
      'Purchasing 100 shares of Reliance Industries on BSE via Zerodha at ₹2,950/share',
      'Selling 50 bags of soybean on e-NAM to an oil processor in Indore at ₹4,800/quintal',
      'A charitable temple trust in Tirupati distributing free laddus to 10,000 pilgrims daily',
      'A weekly Sunday village haat in rural Bihar where clay pots are sold for ₹40 each',
    ],
    correctIndex: 2,
    explanation: 'A charitable free distribution lacks a Price (an exchange ratio). Without a quid pro quo price mechanism between buyers and sellers, it is a non-market unilateral welfare transfer, not a market transaction.',
    hints: [
      'Evaluate the 4 pillars: Buyers, Sellers, Commodity, and Agreed Price.',
      'Which option involves zero price and zero reciprocal financial consideration?',
      'Free charitable distribution lacks the price element.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_23',
    nodeId: NODE_C10_ECON_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A multiplex cinema in Gurugram drops weekend ticket prices from ₹400 to ₹300 (a 25% price cut). In response, weekend ticket admissions surge from 1,000 to 1,500 tickets (a 50% increase). Compute the Price Elasticity of Demand (|Ed|).',
    correctAnswer: 2.0,
    tolerance: 0.05,
    unit: '',
    explanation: '%ΔP = ((300 - 400) / 400) × 100 = -25%. %ΔQd = ((1,500 - 1,000) / 1,000) × 100 = +50%. |Ed| = |+50% / -25%| = 2.00 (Highly Elastic Demand, |Ed| > 1).',
    hints: [
      '%ΔP = -25%, %ΔQd = +50%.',
      'Formula: |Ed| = |%ΔQd / %ΔP|.',
      '50 / 25 = 2.00.',
    ],
  },
  {
    id: 'ch_24',
    nodeId: NODE_C10_ECON_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'When onions are harvested in Lasalgaon during December, total godown stock is 500,000 quintals. If wholesale mandi prices plunge to an unremunerative ₹800/quintal, what will farmers with cold-storage access do regarding stock and supply?',
    options: [
      'Increase supply above 500,000 quintals by borrowing from other states',
      'Hold physical stock in cold storage and reduce current market supply to prevent selling at a loss',
      'Permanently destroy the stock because supply cannot be adjusted',
      'Supply the entire 500,000 quintals immediately regardless of price',
    ],
    correctIndex: 1,
    explanation: 'Storable commodities allow producers to regulate market supply independently of physical stock. When price falls below expected future prices, farmers withhold stock in godowns, reducing current supply.',
    hints: [
      'Onions can be held in modern cold-storage godowns for several months.',
      'Stock is physical availability; supply is what is offered at the ruling price.',
      'Farmers withhold stock to supply later when prices recover.',
    ],
    misconceptionIndex: 1,
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
  nodeId: NODE_C10_ECON_011,
  title: 'Determinants of Demand, Supply & Market Mechanisms',
  definition: 'An interactive microeconomic laboratory exploring non-price demand shifters, law of supply, elasticity measures (Ed & Es), exceptions (Giffen/Veblen/Perishables), and modern virtual market architectures.',
  eli5: 'Think of demand and supply like two opposing dancers on a stage. Price moves them back and forth along their tracks, but weather, income, taxes, and technology can pick up the entire stage and move it!',
  misconceptions: [
    {
      misconception: 'When the price of tea rises, the demand curve for tea shifts rightward.',
      correction: 'A rise in tea price causes a MOVEMENT along the tea curve (contraction), but SHIFTS the demand curve for coffee (a substitute) rightward.',
    },
    {
      misconception: 'Stock and Supply are identical concepts in economics.',
      correction: 'Stock is the total physically available quantity in godowns. Supply is strictly the portion offered for sale at a given price in a specific period.',
    },
    {
      misconception: 'A rise in income always shifts the demand curve rightward for every commodity.',
      correction: 'Income increases shift normal goods rightward, but shift INFERIOR goods leftward as consumers switch to superior options.',
    },
    {
      misconception: 'All agricultural crops are exceptions to the law of supply.',
      correction: 'Only perishable agricultural goods in the very short run (a single market day) have vertical supply. Storable crops (wheat/rice/oilseeds) obey the law across seasons.',
    },
    {
      misconception: 'A market must be a physical bazaar with brick-and-mortar buildings.',
      correction: 'A market is any institutional arrangement (such as e-NAM, Amazon, or the BSE) bringing buyers and sellers together to exchange at a price.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which is a non-price determinant of demand?', options: ['Own price', 'Consumer income', 'Cost of inputs', 'Production capacity'], correctIndex: 1 },
    { question: 'What is the shape of a perfectly inelastic supply curve?', options: ['Horizontal', 'Upward sloping', 'Vertical', 'Downward sloping'], correctIndex: 2 },
    { question: 'If |Ed| = 0.4, how is demand classified?', options: ['Elastic', 'Inelastic', 'Unitary', 'Perfectly elastic'], correctIndex: 1 },
    { question: 'What is the mathematical sign of Price Elasticity of Supply (Es)?', options: ['Always negative', 'Always positive', 'Zero always', 'Undefined'], correctIndex: 1 },
    { question: 'Which good exhibits an upward-sloping demand curve due to prestige?', options: ['Giffen good', 'Veblen good', 'Normal good', 'Complementary good'], correctIndex: 1 },
    { question: 'Horizontal summation of individual supply schedules yields:', options: ['Market demand', 'Market supply', 'Total stock', 'Equilibrium price'], correctIndex: 1 },
    { question: 'A government capital subsidy on solar pumps causes:', options: ['Leftward supply shift', 'Rightward supply shift', 'Contraction of supply', 'Demand shift only'], correctIndex: 1 },
    { question: 'e-NAM is an example of:', options: ['Physical market only', 'Electronic market arrangement', 'Non-market charity', 'Bilateral monopoly'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is achieved by demonstrating proficiency in differentiating movement vs shift, calculating Ed and Es, classifying exceptions, and modeling market determinants across Indian agri-commerce and industrial scenarios.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Demand Shift Engine (Income & Related Goods)',
    instruction: 'Adjust Consumer Income and Substitute/Complement prices. Watch the Demand Curve D0 shift right (D1) or left (D2) in real-time!',
    interactionType: 'demand-shift-lab',
    nodeId: NODE_C10_ECON_011,
  },
  {
    title: '2. The Supply Lab: Movement vs Shift & Production Shocks',
    instruction: 'Toggle between changing Crop Market Price (movement along curve) and changing Fertilizer/Diesel Costs (shifting the entire curve).',
    interactionType: 'supply-shift-lab',
    nodeId: NODE_C10_ECON_015,
  },
  {
    title: '3. The Exceptions Arena: Veblen, Giffen & Fresh Fish',
    instruction: 'Select an Exception type (Veblen Luxury, Giffen Staple, or Perishable Fish) and drag the Price Slider to observe upward-sloping or vertical curves.',
    interactionType: 'exceptions-lab',
    nodeId: NODE_C10_ECON_012,
  },
  {
    title: '4. Elasticity Matrix (Ed & Es Interactive Calculator)',
    instruction: 'Simulate % Price Change vs % Quantity Change. Observe how the curve flattens (elastic > 1) or steepens (inelastic < 1) with real Indian revenue metrics.',
    interactionType: 'elasticity-lab',
    nodeId: NODE_C10_ECON_018,
  },
  {
    title: '5. Virtual Market Architecture (e-NAM & BSE Simulator)',
    instruction: 'Connect mandi farmers to pan-India buyers across 23 states. Watch price discovery occur without a physical brick-and-mortar bazaar.',
    interactionType: 'market-architecture-lab',
    nodeId: NODE_C10_ECON_020,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Agri-Commerce Analyst: Real-Life Mandi Audit',
  description: 'Conduct an economic audit of a local Indian agricultural mandi or supermarket chain (e.g., Reliance Smart, BigBasket, or your local vegetable market).',
  steps: [
    'Select 2 perishable goods (Tomatoes, Fresh Milk) and 2 storable goods (Wheat, Mustard Oil).',
    'Record how prices fluctuate between morning peak auction hours and evening closing at the mandi.',
    'Identify 1 substitute pair (Tea vs Coffee or Butter vs Margarine) and record how a price hike in one alters sales volume of the other.',
    'Map out how an electronic platform (e-NAM, Zepto, Blinkit) acts as a virtual market arrangement without requiring buyers to visit physical stalls.',
  ],
};

// ─── MAIN COMPONENT ───
function C10_EconomicsDeterminantsDemandNonpriceSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_ECON_011,
  title = DEFAULT_PROPS.title || 'Economics Determinants & Markets',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Simulation Sliders / Dynamic Parameters
  const [incomeLevel, setIncomeLevel] = useState<number>(0); // -50% to +50%
  const [isInferiorGood, setIsInferiorGood] = useState<boolean>(false);
  const [substitutePriceDelta, setSubstitutePriceDelta] = useState<number>(0);
  const [complementPriceDelta, setComplementPriceDelta] = useState<number>(0);
  const [inputCostDelta, setInputCostDelta] = useState<number>(0);
  const [taxSubsidyDelta, setTaxSubsidyDelta] = useState<number>(0);
  const [marketSellingPrice, setMarketSellingPrice] = useState<number>(50);
  const [selectedExceptionType, setSelectedExceptionType] = useState<'veblen' | 'giffen' | 'perishable'>('veblen');
  const [exceptionPrice, setExceptionPrice] = useState<number>(100);
  const [elasticityPctP, setElasticityPctP] = useState<number>(20);
  const [elasticityPctQ, setElasticityPctQ] = useState<number>(30);
  const [activeMandiConnections, setActiveMandiConnections] = useState<number>(4);

  // Game Engine & BKT States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating Hints & Progressive Disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Construction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual Feedback FX States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [lastClickedOption, setLastClickedOption] = useState<number | null>(null);

  // Reflection States
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIALIZE MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── LIVE CALCULATIONS: DEMAND CURVE SHIFT ───
  const demandShiftOffset = useMemo(() => {
    let shift = 0;
    if (isInferiorGood) {
      shift -= incomeLevel * 0.8;
    } else {
      shift += incomeLevel * 0.8;
    }
    shift += substitutePriceDelta * 0.7;
    shift -= complementPriceDelta * 0.7;
    return Math.max(-40, Math.min(40, shift));
  }, [incomeLevel, isInferiorGood, substitutePriceDelta, complementPriceDelta]);

  // ─── LIVE CALCULATIONS: SUPPLY CURVE SHIFT & QUANTITY ───
  const supplyShiftOffset = useMemo(() => {
    let shift = 0;
    shift -= inputCostDelta * 0.75;
    shift += taxSubsidyDelta * 0.75;
    return Math.max(-40, Math.min(40, shift));
  }, [inputCostDelta, taxSubsidyDelta]);

  const calculatedSupplyQty = useMemo(() => {
    const baseQty = marketSellingPrice * 1.2;
    return Math.max(10, Math.round(baseQty + supplyShiftOffset));
  }, [marketSellingPrice, supplyShiftOffset]);

  // ─── LIVE CALCULATIONS: ELASTICITY VALUES ───
  const calculatedEd = useMemo(() => {
    if (elasticityPctP === 0) return 0;
    return Math.abs(elasticityPctQ / elasticityPctP);
  }, [elasticityPctP, elasticityPctQ]);

  // ─── RECHARTS DATASET FOR DEMAND & SUPPLY SIMULATION ───
  const marketChartData = useMemo(() => {
    const data = [];
    for (let p = 20; p <= 100; p += 10) {
      const baseQd = 120 - p;
      const shiftedQd = Math.max(0, baseQd + demandShiftOffset);
      const baseQs = p - 10;
      const shiftedQs = Math.max(0, baseQs + supplyShiftOffset);

      data.push({
        price: p,
        BaseDemand: baseQd,
        ShiftedDemand: shiftedQd,
        BaseSupply: baseQs,
        ShiftedSupply: shiftedQs,
        RevenueBase: baseQd * p,
        RevenueShifted: shiftedQd * p,
      });
    }
    return data;
  }, [demandShiftOffset, supplyShiftOffset]);

  // ─── CANVAS PARTICLE ENGINE ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2.5 + 1.5,
        color: i % 2 === 0 ? '#10b981' : '#6366f1',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
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
      speechManager.speak('Let us examine the complete economic rationale together.');
    }
  }, [hintCount, challenge]);

  // ─── AUTOHINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    setLastClickedOption(idx);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Outstanding economic intuition! Non-price shocks shift the entire schedule.');
    } else {
      audioManager.play('error');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  // ─── PHASE TRANSITIONS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate economic variables and observe curve behaviors.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are now in the Free Market Sandbox. Experiment without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing competency challenges. Read carefully and apply your economic principles.');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You have completed the simulation with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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
    setLastClickedOption(null);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── MASTER ANSWER HANDLER ───
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (typeof answer === 'number') {
        setLastClickedOption(answer);
      }

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent economic analysis.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ score: 100, lastPlayed: Date.now() }));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step resolution.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 3500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isTargetMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
        setWrongShake(true);
        setTimeout(() => setWrongShake(false), 400);
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
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
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── SLIDER & INTERACTION CHANGE HANDLERS ───
  const handleIncomeChange = useCallback((val: number) => {
    setIncomeLevel(val);
    audioManager.play('count');
  }, []);

  const handleSubstituteChange = useCallback((val: number) => {
    setSubstitutePriceDelta(val);
    audioManager.play('count');
  }, []);

  const handleComplementChange = useCallback((val: number) => {
    setComplementPriceDelta(val);
    audioManager.play('count');
  }, []);

  const handleInputCostChange = useCallback((val: number) => {
    setInputCostDelta(val);
    audioManager.play('count');
  }, []);

  const handleTaxSubsidyChange = useCallback((val: number) => {
    setTaxSubsidyDelta(val);
    audioManager.play('count');
  }, []);

  const handleMarketSellingPriceChange = useCallback((val: number) => {
    setMarketSellingPrice(val);
    audioManager.play('count');
  }, []);

  // ─── MOTIVATIONAL FEEDBACK MESSAGE GENERATOR ───
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return { title: 'PERFECT SCORE!', desc: 'Flawless economic mastery! You demonstrate complete conceptual fluency in demand, supply, elasticity, and market institutions.', badge: '🏆 MASTER OF COMMERCE' };
    if (errCount <= 3) return { title: 'Great work!', desc: 'Superb analytical grasp! You handled market shifts, elasticity equations, and exceptions with great economic rigor.', badge: '🥈 ADVANCED ANALYST' };
    if (errCount <= 7) return { title: 'Good effort!', desc: 'Solid progress! Review the step-by-step rationales and non-price determinant distinctions to sharpen your exam scores.', badge: '🥉 DEVELOPING ECONOMIST' };
    return { title: 'Do not give up — You WILL get this!', desc: 'Economics is a structured journey. Replay the interactive exploration labs and master how price versus non-price variables operate.', badge: '🌱 RESILIENT SCHOLAR' };
  };

  const srsDays = errors === 0 ? 7 : errors <= 3 ? 3 : 1;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans relative overflow-hidden">
      {/* Background Canvas Ambient Particle Field */}
      <canvas ref={canvasRef} width={800} height={200} className="absolute top-0 right-0 w-full h-48 opacity-20 pointer-events-none" />

      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ rotate: 12, scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-2xl text-3xl shadow-inner cursor-pointer" role="img" aria-label="Economics Logo">
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <motion.span whileHover={{ scale: 1.05 }} className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                ICSE Class 10
              </motion.span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">CISCE Economics Core • Demand, Supply, Elasticity & Virtual Markets</p>
          </div>
        </div>

        {/* Adaptive Difficulty & Live Status */}
        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 rounded-xl border bg-slate-900/90 text-xs font-bold tracking-wider flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: difficulty === 'foundation' ? '#22c55e' : difficulty === 'standard' ? '#3b82f6' : '#ef4444' }} />
            <span className={difficulty === 'foundation' ? 'text-emerald-400' : difficulty === 'standard' ? 'text-blue-400' : 'text-rose-400'}>{difficulty.toUpperCase()} TIER</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            BKT: <span className="text-emerald-400 font-bold capitalize">{masteryLevel}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div key="discovery-phase" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }} className="space-y-6 relative z-10">
            <motion.div whileHover={{ scale: 1.005 }} className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-indigo-950/40 rounded-3xl border border-emerald-800/40 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-black uppercase tracking-wider mb-2">
                <span>🏛️</span> Narrative Hook & Discovery Mission
              </div>
              <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
              <p className="text-xs font-mono text-emerald-300 mb-2">{SCENARIO.subtitle}</p>
              <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono flex items-center gap-2">
                <span className="text-emerald-400">⚡ Core Directive:</span> {SCENARIO.missionGoal}
              </div>
            </motion.div>

            <motion.div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>💡</span> Curiosity Check (Ungraded)
                </span>
                <span className="text-xs text-slate-500 font-mono">Predict First</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-100 leading-snug">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => {
                  const isSelected = lastClickedOption === i;
                  const isCorrect = i === DISCOVERY_QUESTION.correctIndex;
                  const shouldShake = wrongShake && isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={shouldShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={shouldShake ? { duration: 0.4 } : { duration: 0.2 }}
                      onClick={() => handleDiscoveryAnswer(i)}
                      disabled={discoveryAnswered}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`p-4 text-left rounded-2xl text-sm font-medium border transition-all ${
                        discoveryAnswered && isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : discoveryAnswered && isSelected && !isCorrect
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : discoveryAnswered && !isSelected
                          ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/80 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-950/70 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="leading-snug">
                          {opt} {discoveryAnswered && isCorrect && <span className="text-emerald-400 font-bold ml-1">✓ Correct</span>}
                          {discoveryAnswered && isSelected && !isCorrect && <span className="text-rose-400 font-bold ml-1">✗ Incorrect</span>}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! Adverse weather and input hikes shift supply curves leftward.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAdvanceToExploration} aria-label="Enter Exploration Lab" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/30 whitespace-nowrap">
                    Enter Exploration Lab →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 2. EXPLORATION PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div key="explore-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-6 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-5">
                {/* Slide Title & Dynamic Instruction */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400">STAGE {currentSlide + 1} OF {EXPLORATION_STEPS.length}</span>
                    <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                  </div>
                  <motion.span whileHover={{ scale: 1.05 }} className="text-xs px-3 py-1 bg-slate-800 rounded-full text-slate-300 font-mono">
                    Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                  </motion.span>
                </div>

                <motion.p whileHover={{ scale: 1.005 }} className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40 flex items-center gap-2">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </motion.p>

                {/* ─── INTERACTIVE LAB 1: DEMAND SHIFTS ─── */}
                {currentSlide === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-5 space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <label htmlFor="income-range" className="text-xs font-bold text-slate-300 uppercase">Consumer Income Change</label>
                        <span className="text-xs font-mono font-bold text-emerald-400">{incomeLevel > 0 ? `+${incomeLevel}%` : `${incomeLevel}%`}</span>
                      </div>
                      <input id="income-range" aria-label="Consumer Income Range Slider" type="range" min={-50} max={50} step={5} value={incomeLevel} onChange={(e) => handleIncomeChange(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />

                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-xs text-slate-400">Good Classification:</span>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsInferiorGood(false)} aria-label="Select Normal Good" className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${!isInferiorGood ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400'}`}>
                          ✓ Normal Good
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsInferiorGood(true)} aria-label="Select Inferior Good" className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${isInferiorGood ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-800 text-slate-400'}`}>
                          ✗ Inferior Good
                        </motion.button>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80">
                        <div className="flex items-center justify-between">
                          <label htmlFor="sub-price-range" className="text-xs font-bold text-slate-300 uppercase">Price of Substitute (e.g., Tea)</label>
                          <span className="text-xs font-mono font-bold text-blue-400">{substitutePriceDelta > 0 ? `+${substitutePriceDelta}%` : `${substitutePriceDelta}%`}</span>
                        </div>
                        <input id="sub-price-range" aria-label="Substitute Price Range Slider" type="range" min={-40} max={40} step={5} value={substitutePriceDelta} onChange={(e) => handleSubstituteChange(Number(e.target.value))} className="w-full accent-blue-500 cursor-pointer" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="comp-price-range" className="text-xs font-bold text-slate-300 uppercase">Price of Complement (e.g., Petrol / Sugar)</label>
                          <span className="text-xs font-mono font-bold text-amber-400">{complementPriceDelta > 0 ? `+${complementPriceDelta}%` : `${complementPriceDelta}%`}</span>
                        </div>
                        <input id="comp-price-range" aria-label="Complement Price Range Slider" type="range" min={-40} max={40} step={5} value={complementPriceDelta} onChange={(e) => handleComplementChange(Number(e.target.value))} className="w-full accent-amber-500 cursor-pointer" />
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
                        Rule: <span className="text-emerald-300 font-bold">Substitutes move in SAME direction</span>, while <span className="text-amber-300 font-bold">Complements move in OPPOSITE direction</span>.
                      </motion.div>
                    </div>

                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={marketChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="price" label={{ value: 'Price (₹)', position: 'insideBottomRight', offset: -5, fill: '#94a3b8' }} stroke="#64748b" />
                            <YAxis label={{ value: 'Quantity Demanded (Q)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} stroke="#64748b" />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                            <Line type="monotone" dataKey="BaseDemand" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" name="Original D0" dot={false} />
                            <Line type="monotone" dataKey="ShiftedDemand" stroke="#10b981" strokeWidth={3.5} name="Shifted D1" dot={{ r: 4 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 4 }} className="text-xs text-center text-slate-400 font-mono mt-2 p-2 bg-slate-900 rounded-xl border border-slate-800">
                        Shift Status:{' '}
                        <span className={demandShiftOffset > 0 ? 'text-emerald-400 font-bold' : demandShiftOffset < 0 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                          {demandShiftOffset > 0 ? `Rightward Shift (+${demandShiftOffset.toFixed(0)} units at every price)` : demandShiftOffset < 0 ? `Leftward Shift (${demandShiftOffset.toFixed(0)} units)` : 'No Non-Price Shift (D0 = D1)'}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ─── INTERACTIVE LAB 2: SUPPLY LAB ─── */}
                {currentSlide === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-5 space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                      <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl">
                        <span className="text-xs font-bold text-indigo-300 uppercase block mb-1">A. Own Output Price (Movement Along SS)</span>
                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                          <span className="text-slate-400">Market Price: ₹{marketSellingPrice}/qtl</span>
                          <span className="text-indigo-400 font-bold">Qty Supplied: {calculatedSupplyQty} qtl</span>
                        </div>
                        <input id="market-selling-price" aria-label="Market Selling Price Range" type="range" min={20} max={100} step={5} value={marketSellingPrice} onChange={(e) => handleMarketSellingPriceChange(Number(e.target.value))} className="w-full accent-indigo-500 cursor-pointer" />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl space-y-3">
                        <span className="text-xs font-bold text-emerald-300 uppercase block">B. Non-Price Factors (Shifting Entire SS)</span>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <label htmlFor="input-cost-range">Input Cost (Diesel/Fertilizer):</label>
                            <span className="font-mono text-rose-400">{inputCostDelta > 0 ? `+${inputCostDelta}%` : `${inputCostDelta}%`}</span>
                          </div>
                          <input id="input-cost-range" aria-label="Input Cost Range" type="range" min={-40} max={40} step={5} value={inputCostDelta} onChange={(e) => handleInputCostChange(Number(e.target.value))} className="w-full accent-rose-500 cursor-pointer" />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <label htmlFor="tax-subsidy-range">Govt Policy (Subsidy vs Tax):</label>
                            <span className="font-mono text-emerald-400">{taxSubsidyDelta > 0 ? `+${taxSubsidyDelta}% Subsidy` : taxSubsidyDelta < 0 ? `${Math.abs(taxSubsidyDelta)}% Tax` : 'Neutral'}</span>
                          </div>
                          <input id="tax-subsidy-range" aria-label="Government Policy Tax Subsidy Range" type="range" min={-30} max={30} step={5} value={taxSubsidyDelta} onChange={(e) => handleTaxSubsidyChange(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
                        </div>
                      </motion.div>
                    </div>

                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={marketChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="price" stroke="#64748b" label={{ value: 'Price (₹)', position: 'insideBottomRight', offset: -5, fill: '#94a3b8' }} />
                            <YAxis stroke="#64748b" label={{ value: 'Quantity Supplied (Qs)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                            <Line type="monotone" dataKey="BaseSupply" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" name="Original SS" dot={false} />
                            <Line type="monotone" dataKey="ShiftedSupply" stroke="#6366f1" strokeWidth={3.5} name="Active Supply S1" dot={{ r: 4 }} />
                            <ReferenceLine x={marketSellingPrice} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: `Operating Point`, fill: '#fbbf24', fontSize: 10 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <motion.div whileHover={{ scale: 1.01 }} className="p-2 bg-slate-900 rounded-xl text-xs text-center font-mono text-slate-300">
                        {inputCostDelta !== 0 || taxSubsidyDelta !== 0
                          ? `Entire SS Curve has shifted ${supplyShiftOffset > 0 ? 'RIGHTWARD (Increase in Supply)' : 'LEFTWARD (Decrease in Supply)'}`
                          : `Movement along SS Curve to Price = ₹${marketSellingPrice}, Qs = ${calculatedSupplyQty}`}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ─── INTERACTIVE LAB 3: EXCEPTIONS ARENA ─── */}
                {currentSlide === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'veblen' as const, label: '💍 Veblen Luxury (Sabyasachi Lehenga)', desc: 'Conspicuous consumption: Higher price increases prestige & quantity demanded!' },
                        { id: 'giffen' as const, label: '🌾 Giffen Good (Coarse Millet in Poverty)', desc: 'Inferior calorie staple: High price leaves no budget for pulses, forcing more millet.' },
                        { id: 'perishable' as const, label: '🐟 Perishable Daily Catch (Howrah Fish)', desc: 'Cannot store overnight: Day supply is fixed vertically (Es = 0) regardless of price.' },
                      ].map((t) => (
                        <motion.button
                          key={t.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedExceptionType(t.id)}
                          aria-label={`Select exception mode ${t.label}`}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-all border ${
                            selectedExceptionType === t.id ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {t.label}
                        </motion.button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                      <div className="md:col-span-5 space-y-4">
                        <label htmlFor="exception-price-slider" className="text-xs font-bold text-slate-300 uppercase block">Simulate Price (₹): ₹{exceptionPrice}</label>
                        <input id="exception-price-slider" aria-label="Exception Price Slider" type="range" min={50} max={300} step={10} value={exceptionPrice} onChange={(e) => setExceptionPrice(Number(e.target.value))} className="w-full accent-indigo-500 cursor-pointer" />
                        <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          {selectedExceptionType === 'veblen' && 'Notice how the demand curve slopes UPWARD! Wealthy buyers treat ₹300 as a more exclusive social status symbol than ₹50.'}
                          {selectedExceptionType === 'giffen' && 'As price rises to ₹300, poverty forces the household to drop milk/meat completely and buy MORE millet to survive calories.'}
                          {selectedExceptionType === 'perishable' && 'The supply curve is completely VERTICAL at 5,000 kg. Price fluctuates wildly depending on buyer bidding, but daily quantity cannot expand.'}
                        </motion.div>
                      </div>

                      <div className="md:col-span-7 flex items-center justify-center bg-slate-900/60 rounded-xl p-4 min-h-[220px]">
                        <svg viewBox="0 0 320 200" className="w-full h-48" role="img" aria-label="Exception Curve SVG Graph">
                          <line x1="40" y1="170" x2="300" y2="170" stroke="#64748b" strokeWidth="2" />
                          <line x1="40" y1="20" x2="40" y2="170" stroke="#64748b" strokeWidth="2" />
                          <text x="300" y="190" textAnchor="end" fill="#94a3b8" fontSize="10">Quantity (Q)</text>
                          <text x="25" y="25" textAnchor="start" fill="#94a3b8" fontSize="10">Price (P)</text>

                          {selectedExceptionType === 'veblen' && (
                            <g>
                              <line x1="60" y1="150" x2="270" y2="40" stroke="#f43f5e" strokeWidth="3.5" />
                              <circle cx={60 + (exceptionPrice / 300) * 210} cy={150 - (exceptionPrice / 300) * 110} r="6" fill="#fbbf24" />
                              <text x="180" y="90" fill="#f43f5e" fontSize="11" fontWeight="bold">Upward Sloping Demand</text>
                            </g>
                          )}

                          {selectedExceptionType === 'giffen' && (
                            <g>
                              <line x1="60" y1="140" x2="260" y2="50" stroke="#ec4899" strokeWidth="3.5" />
                              <circle cx={60 + (exceptionPrice / 300) * 200} cy={140 - (exceptionPrice / 300) * 90} r="6" fill="#fbbf24" />
                              <text x="170" y="80" fill="#ec4899" fontSize="11" fontWeight="bold">Giffen Paradox Curve</text>
                            </g>
                          )}

                          {selectedExceptionType === 'perishable' && (
                            <g>
                              <line x1="160" y1="30" x2="160" y2="170" stroke="#06b6d4" strokeWidth="4" />
                              <circle cx="160" cy={170 - (exceptionPrice / 300) * 130} r="6" fill="#fbbf24" />
                              <text x="170" y="50" fill="#06b6d4" fontSize="11" fontWeight="bold">Vertical Supply (Es = 0)</text>
                            </g>
                          )}
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── INTERACTIVE LAB 4: ELASTICITY CALCULATOR ─── */}
                {currentSlide === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Percentage Method Formula Engine</span>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <label htmlFor="elasticity-p-range">% Change in Price (%ΔP):</label>
                          <span className="font-mono font-bold text-white">{elasticityPctP}%</span>
                        </div>
                        <input id="elasticity-p-range" aria-label="Percentage Price Change Slider" type="range" min={5} max={50} step={5} value={elasticityPctP} onChange={(e) => setElasticityPctP(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <label htmlFor="elasticity-q-range">% Change in Quantity (%ΔQ):</label>
                          <span className="font-mono font-bold text-white">{elasticityPctQ}%</span>
                        </div>
                        <input id="elasticity-q-range" aria-label="Percentage Quantity Change Slider" type="range" min={5} max={80} step={5} value={elasticityPctQ} onChange={(e) => setElasticityPctQ(Number(e.target.value))} className="w-full accent-indigo-500 cursor-pointer" />
                      </div>

                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Formula:</span>
                          <span className="font-mono text-slate-200">|%ΔQ / %ΔP|</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-slate-300">Calculated Elasticity:</span>
                          <span className="text-emerald-400 font-mono text-base">{calculatedEd.toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Classification:{' '}
                          <span className="font-bold text-amber-400">
                            {calculatedEd > 1 ? 'ELASTIC (|Ed| > 1) - Flatter Curve' : calculatedEd === 1 ? 'UNITARY (|Ed| = 1)' : 'INELASTIC (|Ed| < 1) - Steeper Curve'}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Revenue (TR) Impact Rule</h3>
                      <div className="space-y-3 text-xs">
                        <motion.div whileHover={{ scale: 1.02 }} className={`p-3 rounded-xl border ${calculatedEd < 1 ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                          <span className="font-bold block">✓ Inelastic Demand (|Ed| &lt; 1, e.g., Salt, Railway Sleeper):</span>
                          Raising Price INCREASES Total Revenue (Quantity drop is negligible).
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} className={`p-3 rounded-xl border ${calculatedEd > 1 ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                          <span className="font-bold block">✓ Elastic Demand (|Ed| &gt; 1, e.g., Air Travel, Branded Electronics):</span>
                          Raising Price DECREASES Total Revenue (Consumers flee to substitutes).
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── INTERACTIVE LAB 5: VIRTUAL MARKET ARCHITECTURE ─── */}
                {currentSlide === 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-white">e-NAM Pan-India Mandi Grid Simulator</h3>
                        <p className="text-xs text-slate-400">Market = Institutional Arrangement, Not a Physical Place</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Integrated Mandis:</span>
                        {[2, 4, 8, 16].map((num) => (
                          <motion.button key={num} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveMandiConnections(num)} aria-label={`Connect ${num * 100} mandis`} className={`px-2.5 py-1 rounded-lg text-xs font-bold ${activeMandiConnections === num ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                            {num * 100}+
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <svg viewBox="0 0 500 200" className="w-full h-52 bg-slate-900/50 rounded-xl" role="img" aria-label="e-NAM electronic mandi diagram">
                      <circle cx="250" cy="100" r="38" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
                      <text x="250" y="97" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">e-NAM / BSE</text>
                      <text x="250" y="112" textAnchor="middle" fill="#6366f1" fontSize="8">Price Engine</text>

                      {[
                        { name: 'Telangana Farmer', x: 80, y: 50 },
                        { name: 'Delhi Wholesale Buyer', x: 420, y: 50 },
                        { name: 'Nashik Onion Trader', x: 80, y: 150 },
                        { name: 'Kolkata Retail Chain', x: 420, y: 150 },
                      ].map((n, i) => (
                        <g key={i}>
                          <line x1={n.x} y1={n.y} x2="250" y2="100" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
                          <circle cx={n.x} cy={n.y} r="22" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                          <text x={n.x} y={n.y + 3} textAnchor="middle" fill="#f8fafc" fontSize="7" fontWeight="bold">{n.name.split(' ')[0]}</text>
                          <text x={n.x} y={n.y + 12} textAnchor="middle" fill="#94a3b8" fontSize="6">{n.name.split(' ')[1] || ''}</text>
                        </g>
                      ))}
                    </svg>
                    <p className="text-xs text-slate-400 text-center font-mono">130+ Commodities traded across 23 States without physical meeting: Market 4-Pillar Test ✓ PASS.</p>
                  </motion.div>
                )}

                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))} disabled={currentSlide === 0} aria-label="Previous Lab" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold">
                    ← Previous Lab
                  </motion.button>
                  <span className="text-xs text-slate-500 font-mono">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
                  {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentSlide((s) => s + 1)} aria-label="Next Concept Lab" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950">
                      Next Concept Lab →
                    </motion.button>
                  ) : (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAdvanceToSandbox} aria-label="Proceed to Free Sandbox" className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg">
                      Proceed to Free Sandbox →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 3. FREE SANDBOX PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div key="sandbox-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-6 relative z-10">
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-400">FREE MARKETPLAY ARENA</span>
                  <h2 className="text-xl font-bold text-white">Multi-Variable Equilibrium Simulator</h2>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAdvanceToChallenge} aria-label="Proceed to Competency Challenges" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-900/40">
                  Ready for Challenges! →
                </motion.button>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">Test multi-variable interactions simultaneously. Shift demand and supply curves simultaneously and observe how market equilibrium prices adjust.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <label htmlFor="sandbox-income" className="text-[10px] font-bold text-slate-400 uppercase block">Income Shock: {incomeLevel}%</label>
                  <input id="sandbox-income" aria-label="Sandbox Income Shock" type="range" min={-40} max={40} value={incomeLevel} onChange={(e) => handleIncomeChange(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <label htmlFor="sandbox-substitute" className="text-[10px] font-bold text-slate-400 uppercase block">Substitute Shock: {substitutePriceDelta}%</label>
                  <input id="sandbox-substitute" aria-label="Sandbox Substitute Shock" type="range" min={-40} max={40} value={substitutePriceDelta} onChange={(e) => handleSubstituteChange(Number(e.target.value))} className="w-full accent-blue-500 cursor-pointer" />
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <label htmlFor="sandbox-input-cost" className="text-[10px] font-bold text-slate-400 uppercase block">Input Cost Shock: {inputCostDelta}%</label>
                  <input id="sandbox-input-cost" aria-label="Sandbox Input Cost Shock" type="range" min={-40} max={40} value={inputCostDelta} onChange={(e) => handleInputCostChange(Number(e.target.value))} className="w-full accent-rose-500 cursor-pointer" />
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <label htmlFor="sandbox-subsidy" className="text-[10px] font-bold text-slate-400 uppercase block">Policy Subsidy: {taxSubsidyDelta}%</label>
                  <input id="sandbox-subsidy" aria-label="Sandbox Policy Subsidy" type="range" min={-30} max={30} value={taxSubsidyDelta} onChange={(e) => handleTaxSubsidyChange(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
                </div>
              </div>

              <div className="h-64 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="price" stroke="#64748b" label={{ value: 'Price (₹)', position: 'insideBottomRight', offset: -5, fill: '#94a3b8' }} />
                    <YAxis stroke="#64748b" label={{ value: 'Quantity (Q)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    <Line type="monotone" dataKey="ShiftedDemand" stroke="#10b981" strokeWidth={3} name="Current Demand D1" dot={false} />
                    <Line type="monotone" dataKey="ShiftedSupply" stroke="#6366f1" strokeWidth={3} name="Current Supply S1" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 4. CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div key="challenge-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-6 relative z-10">
            <div className="flex items-center justify-between bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono font-bold uppercase">{challenge.competencyLevel}</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Node Ref: {challenge.nodeId}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">Accuracy: {scoreBreakdown.total > 0 ? `${Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100)}%` : '100%'}</span>
              </div>
            </div>

            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full" animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }} transition={{ duration: 0.3 }} />
            </div>

            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-6 bg-slate-900 rounded-3xl border transition-all ${wrongFlash ? 'bg-rose-950/40 border-rose-600' : 'border-slate-800'}`}
            >
              <h3 className="text-lg font-bold text-white leading-snug mb-4">{challenge.question}</h3>

              {/* MCQ TYPE */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => {
                    const isSelected = lastClickedOption === i;
                    const isCorrect = i === challenge.correctIndex;
                    const shouldShake = wrongShake && isSelected && !isCorrect;

                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        animate={shouldShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={shouldShake ? { duration: 0.4 } : { duration: 0.2 }}
                        onClick={() => handleAnswer(i)}
                        disabled={answerRevealed || showExplanation}
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                        className={`p-4 text-left rounded-2xl text-sm font-medium border transition-all ${
                          showExplanation && isCorrect
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : isSelected && !isCorrect
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/80 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="leading-snug">
                            {opt} {showExplanation && isCorrect && <span className="text-emerald-400 font-bold ml-1">✓ Correct</span>}
                            {isSelected && !isCorrect && <span className="text-rose-400 font-bold ml-1">✗ Incorrect</span>}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* DRAG-LABEL TYPE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Draggable Concepts:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable concept: ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                      <div
                        key={targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center min-h-[90px] text-center"
                      >
                        <span className="text-xs font-mono text-slate-500 uppercase mb-1">Target Slot: {targetId.replace('box_', '')}</span>
                        <span className="text-sm font-bold text-emerald-400">
                          {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop matching item here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleAnswer(droppedLabels)} aria-label="Validate Target Mappings" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md">
                    Validate Target Mappings
                  </motion.button>
                </div>
              )}

              {/* DRAG-SORT TYPE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map((idx) => challenge.sortItems![idx]) : challenge.sortItems).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${idx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-mono font-bold text-indigo-400">{idx + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSortSubmit} disabled={showExplanation} aria-label="Verify Sequence Order" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs mt-2 shadow-md">
                    Verify Sequence Order
                  </motion.button>
                </div>
              )}

              {/* NUMERIC TYPE */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      id="numeric-answer-input"
                      aria-label="Numeric answer input"
                      type="number"
                      step="0.01"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="e.g. 0.50 or 1.50"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500 w-48"
                    />
                    <span className="text-xs text-slate-400">{challenge.unit}</span>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleAnswer(numericInput)} disabled={showExplanation} aria-label="Submit Computation" className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md">
                      Submit Computation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* CONSTRUCT TYPE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Click to assemble conditions:</span>
                    {challenge.availableParts.map((part, i) => (
                      <motion.button key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setConstructParts((prev) => [...prev, part])} aria-label={`Add condition part: ${part}`} className="px-3 py-1.5 bg-indigo-900/60 hover:bg-indigo-700 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-medium">
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl min-h-[70px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.div key={i} whileHover={{ scale: 1.02 }} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-2">
                        <span>✓ {part}</span>
                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))} aria-label={`Remove part: ${part}`} className="text-indigo-200 hover:text-white">
                          ✕
                        </motion.button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600">No parts selected yet.</span>}
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleAnswer(constructParts.join(' '))} disabled={constructParts.length === 0 || showExplanation} aria-label="Test Economic Assembly" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md">
                      Test Economic Assembly
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setConstructParts([])} aria-label="Clear All Selected Parts" className="text-xs text-slate-400 hover:text-white px-3 py-1">
                      Clear All
                    </motion.button>
                  </div>
                </div>
              )}

              {/* STEP-BY-STEP EXPLANATION */}
              {showExplanation && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-6 p-5 bg-amber-950/30 border border-amber-800/50 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <span>📖</span> Detailed Step-by-Step Economic Rationale
                  </div>
                  <div className="space-y-2">
                    {challenge.explanation.split('. ').filter((s) => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                        <span className="font-bold text-amber-400 font-mono mr-1.5">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setRevealedSteps((s) => s + 1)} aria-label="Reveal Next Sub-step" className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow">
                        Reveal Next Sub-step →
                      </motion.button>
                    ) : (
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleNextChallenge} aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation' : 'Next Challenge'} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950">
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 5. COMPLETION PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div key="complete-phase" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-6 relative z-10">
            {/* Motivational Banner */}
            {(() => {
              const feedback = getMotivationalFeedback(errors);
              return (
                <motion.div whileHover={{ scale: 1.005 }} className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-3xl border border-emerald-700/60 text-center space-y-4 shadow-2xl">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }} className="text-5xl inline-block">
                    🏆
                  </motion.span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{feedback.title}</h2>
                  <motion.div whileHover={{ scale: 1.05 }} className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold">
                    {feedback.badge}
                  </motion.div>
                  <p className="text-sm text-slate-300 max-w-xl mx-auto">{feedback.desc}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-4">
                    <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Final Score</span>
                      <span className="text-xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 4)}%</span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Mastery Level</span>
                      <span className="text-base font-bold text-indigo-400 font-mono capitalize">{masteryLevel}</span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Errors Logged</span>
                      <span className="text-xl font-black text-rose-400 font-mono">{errors}</span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">SRS Review</span>
                      <span className="text-base font-bold text-amber-400 font-mono">review in {srsDays} {srsDays === 1 ? 'day' : 'days'}</span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })()}

            {/* SPACED REPETITION VISIBILITY CARD */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="p-6 bg-slate-900/90 border border-amber-500/40 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span>📅</span> Spaced Repetition Schedule (SRS Memory Engine)
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
                  Target: Review in {srsDays} {srsDays === 1 ? 'day' : 'days'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                To solidify demand shift rules, elasticity formulas, and market paradoxes into permanent long-term memory, return to review this simulation:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className={`p-3 rounded-xl border text-xs ${errors === 0 ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                  0 Errors → Review in 7 days {errors === 0 && '👈 (Your schedule)'}
                </div>
                <div className={`p-3 rounded-xl border text-xs ${errors >= 1 && errors <= 3 ? 'bg-blue-950/60 border-blue-500 text-blue-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                  1–3 Errors → Review in 3 days {errors >= 1 && errors <= 3 && '👈 (Your schedule)'}
                </div>
                <div className={`p-3 rounded-xl border text-xs ${errors >= 4 ? 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                  4+ Errors → Review in 1 day {errors >= 4 && '👈 (Your schedule)'}
                </div>
              </div>
            </motion.div>

            {/* REFLECTION SECTION */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="p-6 bg-slate-900/90 border border-indigo-500/40 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <span>🤔</span> Conceptual Reflection & Metacognition
              </h3>
              <p className="text-xs text-slate-400">Deepen your economic intuition by reflecting on these core questions:</p>
              
              <div className="space-y-3">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <label htmlFor="ref-surprising" className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>1.</span> What was the most surprising thing you learned?
                  </label>
                  <textarea
                    id="ref-surprising"
                    rows={2}
                    value={reflectionResponses.surprising}
                    onChange={(e) => setReflectionResponses({ ...reflectionResponses, surprising: e.target.value })}
                    placeholder="e.g. How Veblen luxury demand slopes upward, or how fresh fish supply is strictly vertical..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <label htmlFor="ref-friend" className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>2.</span> How would you explain the difference between a movement along a curve vs a shift to a friend?
                  </label>
                  <textarea
                    id="ref-friend"
                    rows={2}
                    value={reflectionResponses.explanation}
                    onChange={(e) => setReflectionResponses({ ...reflectionResponses, explanation: e.target.value })}
                    placeholder="e.g. Own price changes move along the curve, while income, substitutes, and taxes shift the whole curve..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <label htmlFor="ref-reallife" className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>3.</span> Where in real life might you use this economic insight?
                  </label>
                  <textarea
                    id="ref-reallife"
                    rows={2}
                    value={reflectionResponses.realLife}
                    onChange={(e) => setReflectionResponses({ ...reflectionResponses, realLife: e.target.value })}
                    placeholder="e.g. Setting prices for my future startup, analyzing festival discounts, or tracking onion mandi prices..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Misconceptions Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="p-6 bg-rose-950/30 border border-rose-900/60 rounded-3xl space-y-3">
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                  <span>🎯</span> Personalized Diagnostic Feedback
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((idx) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div key={idx} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                        <p className="text-rose-400 font-bold">✗ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ ICSE Correction: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Real-World Mandi Activity */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="p-6 bg-indigo-950/30 border border-indigo-900/60 rounded-3xl space-y-3">
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">🌍 {REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400">
                    <span className="text-indigo-400 font-mono font-bold mr-1.5">{idx + 1}.</span> {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIM-ENGINE CONDITIONAL POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_EconomicsDeterminantsDemandNonpriceSim;
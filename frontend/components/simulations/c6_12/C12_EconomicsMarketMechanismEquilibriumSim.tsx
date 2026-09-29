'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
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
  Legend,
  ReferenceLine
} from 'recharts';

// Node IDs as string literals
const NODE_C12_ECON_031 = 'c12_econ_031';
const NODE_C12_ECON_032 = 'c12_econ_032';
const NODE_C12_ECON_033 = 'c12_econ_033';
const NODE_C12_ECON_034 = 'c12_econ_034';
const NODE_C12_ECON_035 = 'c12_econ_035';
const NODE_C12_ECON_036 = 'c12_econ_036';
const NODE_C12_ECON_037 = 'c12_econ_037';
const NODE_C12_ECON_038 = 'c12_econ_038';
const NODE_C12_ECON_039 = 'c12_econ_039';
const NODE_C12_ECON_040 = 'c12_econ_040';

const ALL_NODE_IDS = [
  NODE_C12_ECON_031,
  NODE_C12_ECON_032,
  NODE_C12_ECON_033,
  NODE_C12_ECON_034,
  NODE_C12_ECON_035,
  NODE_C12_ECON_036,
  NODE_C12_ECON_037,
  NODE_C12_ECON_038,
  NODE_C12_ECON_039,
  NODE_C12_ECON_040
];

const SCENARIO = {
  title: 'Azadpur Mandi & Tirupur Mills: The Twin Engines of Price & Production',
  intro: 'Welcome Chief Market Analyst! Asia’s largest wholesale agricultural hub, Azadpur Mandi in Delhi, is reeling under volatile tomato and onion supplies, while Tirupur garment factories and Reliance Jamnagar struggle to optimise short-run production stages and marginal costs.',
  context: 'Your task is to steer market price discovery, predict demand-supply shocks, evaluate MSP price floors vs price ceilings, map short-run variable proportions, and find the profit-maximising producer equilibrium.'
};

const DISCOVERY_QUESTION = {
  question: 'In Azadpur Mandi, if wholesale tomato prices drop from ₹50/kg to ₹30/kg while demand stays strong, what happens immediately on the market floor before any new crops arrive?',
  options: [
    'Sellers experience unsold surplus piling up in godowns',
    'A shortage (excess demand) occurs because buyers want more than farmers supply at ₹30',
    'The market demand curve immediately shifts to the left',
    'Government MSP automatically forces price to ₹60'
  ],
  correctIndex: 1,
  hintAfter: 'At a low price, consumers want to buy more (Qd rises) but farmers supply less (Qs drops) → Excess Demand (Shortage)!'
};

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

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C12_ECON_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'At Azadpur Mandi, tomato demand is Qd = 120 - P and supply is Qs = 20 + P (P in ₹/kg). What is the market-clearing equilibrium price (Pe)?',
    options: ['₹40 / kg', '₹50 / kg', '₹60 / kg', '₹70 / kg'],
    correctIndex: 1,
    explanation: 'Setting Qd = Qs gives 120 - P = 20 + P => 2P = 100 => P = ₹50/kg. At ₹50, Qd = Qs = 70 tonnes.',
    hints: [
      'Equilibrium occurs precisely where Quantity Demanded equals Quantity Supplied.',
      'Equate the two linear equations: 120 - P = 20 + P.',
      'Add P to both sides and subtract 20: 2P = 100, so P = 50.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_ECON_031,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If the tomato price in Azadpur is set at ₹30/kg when Qd = 120 - P and Qs = 20 + P, calculate the magnitude of Excess Demand (Shortage) in tonnes.',
    correctAnswer: 40,
    tolerance: 0,
    unit: 'tonnes',
    explanation: 'At P = ₹30: Qd = 120 - 30 = 90 tonnes; Qs = 20 + 30 = 50 tonnes. Shortage = Qd - Qs = 90 - 50 = 40 tonnes.',
    hints: [
      'Calculate Qd at ₹30 and Qs at ₹30 separately.',
      'Qd(30) = 90 tonnes, while Qs(30) = 50 tonnes.',
      'Excess demand = Qd - Qs = 90 - 50 = 40 tonnes.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_ECON_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A bumper harvest in Maharashtra shifts the onion supply curve to the RIGHT. Assuming consumer demand remains unchanged, what happens to equilibrium price (Pe) and quantity (Qe)?',
    options: [
      'Pe rises, Qe rises',
      'Pe falls, Qe rises',
      'Pe rises, Qe falls',
      'Pe falls, Qe falls'
    ],
    correctIndex: 1,
    explanation: 'A rightward shift of supply creates excess supply at the old price. Price falls to clear the surplus, inducing a movement down along the demand curve so Qe rises.',
    hints: [
      'When supply expands, goods become more abundant.',
      'Abundance drives price down in a competitive mandi.',
      'Lower price encourages buyers to purchase more: Pe falls, Qe rises.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_ECON_032,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'During Dhanteras, festive buying shifts gold jewellery demand to the RIGHT while physical bullion stocks are fixed in the short run. Which statement is correct?',
    options: [
      'Both Pe and Qe rise; equilibrium moves UP along the existing supply curve',
      'Pe rises but Qe falls; supply curve shifts left',
      'Both demand and supply curves shift simultaneously to the right',
      'Pe falls because jewellers offer festive discounts'
    ],
    correctIndex: 0,
    explanation: 'Demand shift right causes excess demand at initial price. Bidding pushes Pe up, prompting suppliers to extend quantity supplied along the stable SS curve (Pe up, Qe up).',
    hints: [
      'Festivals change consumer taste/preferences (a non-price determinant of demand).',
      'Demand shifts right; the supply curve itself does NOT shift.',
      'Both Pe and Qe move in the same direction for a demand increase: Pe up, Qe up.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_ECON_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During COVID lockdowns in India, laptop demand shifted RIGHT (online schooling) while laptop supply shifted LEFT (global semiconductor chip shortage). What is the certain outcome?',
    options: [
      'Equilibrium quantity (Qe) certainly rises; Pe is ambiguous',
      'Equilibrium price (Pe) certainly rises; Qe is ambiguous',
      'Both Pe and Qe certainly rise',
      'Both Pe and Qe certainly fall'
    ],
    correctIndex: 1,
    explanation: 'Demand right pushes Pe up; Supply left pushes Pe up (reinforcing -> Pe certainly rises). Demand right pushes Qe up, but Supply left pushes Qe down (opposing -> Qe is ambiguous).',
    hints: [
      'Look at what each shift does to Price: Demand right -> P up; Supply left -> P up.',
      'Since both shifts raise price, Price definitely rises.',
      'For Quantity: Demand right -> Q up, but Supply left -> Q down. They oppose, so Q is ambiguous.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_ECON_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Under the PM-Surya Ghar Muft Bijli scheme, solar panel demand shifts RIGHT, and domestic PLI manufacturing shifts solar panel supply RIGHT. What is the theoretical certainty?',
    options: [
      'Pe certainly rises; Qe is ambiguous',
      'Qe certainly rises; Pe is ambiguous (depends on shift magnitudes)',
      'Both Pe and Qe are ambiguous',
      'Pe certainly falls; Qe certainly falls'
    ],
    correctIndex: 1,
    explanation: 'Both shifts expand volume (Qe reinforces upwards). However, Demand right pushes Pe up while Supply right pushes Pe down (opposing -> Pe is ambiguous).',
    hints: [
      'Both more buyers and more sellers mean total quantity traded must expand.',
      'Buyers bidding up opposes sellers offering cheaper scale output.',
      'Therefore, Qe certainly rises, while Pe depends on which shift is bigger.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_ECON_034,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Tamil Nadu, the Universal PDS provides rice at ₹1/kg when the market clearing equilibrium is ₹40/kg. Why is non-price rationing (family cards capped at 20 kg) mandatory?',
    options: [
      'To prevent the demand curve from shifting to the right',
      'Because at ₹1/kg, Qd hugely exceeds Qs, creating an artificial shortage that price cannot clear',
      'Because rice supply at ₹1/kg exceeds total demand in Tamil Nadu',
      'To enable farmers to earn higher agricultural profits directly'
    ],
    correctIndex: 1,
    explanation: 'A binding price ceiling (Pc < Pe) causes a massive shortage (Qd > Qs). Because price cannot rise to equilibrate the market, the state must allocate the limited Qs using ration quotas.',
    hints: [
      'What happens when price is legally capped way below equilibrium?',
      'At ₹1/kg, buyers want unlimited rice but procurement is limited.',
      'Rationing is the non-price allocation device to distribute limited stock fairly.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_ECON_035,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the correct economic labels to identify the components of Price Intervention on the Market Diagram.',
    dragItems: [
      { label: 'Price Floor (MSP > Pe)', targetId: 'top_line' },
      { label: 'Market Equilibrium (Pe, Qe)', targetId: 'center_pt' },
      { label: 'Price Ceiling (Pc < Pe)', targetId: 'bottom_line' },
      { label: 'Buffer Stock Surplus', targetId: 'top_gap' }
    ],
    correctMapping: {
      top_line: 'Price Floor (MSP > Pe)',
      center_pt: 'Market Equilibrium (Pe, Qe)',
      bottom_line: 'Price Ceiling (Pc < Pe)',
      top_gap: 'Buffer Stock Surplus'
    },
    explanation: 'A Floor is imposed ABOVE Pe to protect farmers (creating surplus bought by FCI). A Ceiling is set BELOW Pe to protect consumers (creating shortage rationed by PDS).',
    hints: [
      'A floor holds prices UP above the natural intersection.',
      'A ceiling caps prices DOWN below the natural intersection.',
      'The gap above the intersection represents excess supply (procured surplus).'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_ECON_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If the central government sets a maximum price of ₹60/kg on sugar when the free market equilibrium is ₹40/kg, what is the effect on the sugar market?',
    options: [
      'A severe shortage of sugar develops in all grocery stores',
      'It is non-binding and has NO effect because market clears below the ceiling',
      'FCI must procure 50 lakh tonnes of surplus sugar',
      'Sugar mills will shut down production immediately'
    ],
    correctIndex: 1,
    explanation: 'A price ceiling set ABOVE equilibrium is non-binding. The market freely transactions at ₹40/kg without violating the ₹60 legal cap.',
    hints: [
      'A ceiling restricts charging MORE than ₹60.',
      'The market is currently happily charging only ₹40.',
      'Since ₹40 < ₹60, nobody is constrained; the ceiling has zero impact.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_ECON_036,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following describes "Returns to a Factor" rather than "Returns to Scale"?',
    options: [
      'Amul doubles both milk processing plant capacity and tanker fleet across India',
      'Maruti Suzuki adds a third worker shift at its fixed Manesar assembly plant line',
      'TCS opens 10 new software campuses with 20,000 newly hired engineers and new servers',
      'A farmer doubles both farm acreage and tractor fleet proportionally'
    ],
    correctIndex: 1,
    explanation: 'Returns to a factor is a short-run concept where one factor (labour shifts) is varied while capital (the plant line) remains fixed. Changing all inputs is returns to scale.',
    hints: [
      'Look for the case where at least ONE factor remains strictly fixed.',
      'Assembly plant is fixed, while labour hours/workers vary.',
      'This is the short-run law of variable proportions (returns to a factor).'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_ECON_037,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Tirupur garment unit with 5 fixed sewing machines records TPP: L=2 tailors produce 22 shirts, L=3 tailors produce 36 shirts. What is the Marginal Physical Product (MPP) of the 3rd tailor?',
    correctAnswer: 14,
    tolerance: 0,
    unit: 'shirts',
    explanation: 'MPP = ΔTPP / ΔL = TPP(3) - TPP(2) = 36 - 22 = 14 shirts.',
    hints: [
      'MPP is the marginal addition to total product, NOT average product.',
      'Subtract TPP at 2 workers from TPP at 3 workers.',
      '36 - 22 = 14 shirts.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_ECON_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'At the exact output level where Average Physical Product (APP) reaches its maximum peak, what is the exact mathematical relationship with Marginal Physical Product (MPP)?',
    options: [
      'MPP is at its maximum peak',
      'MPP = 0',
      'MPP = APP (MPP cuts APP from above)',
      'MPP is negative'
    ],
    correctIndex: 2,
    explanation: 'Whenever a marginal value exceeds average, average rises; when below, average falls. Thus APP reaches its maximum exactly where MPP = APP.',
    hints: [
      'Think of cricket batting averages: if your next innings score equals your average, the average does not change.',
      'The marginal curve always intersects the average curve at the average\'s stationary peak.',
      'Hence MPP = APP at APP maximum.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_ECON_038,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of the Three Stages of the Law of Variable Proportions in order of increasing labour input.',
    sortItems: [
      'Stage I: Specialisation gains; MPP > APP; APP rises to its maximum (MPP = APP)',
      'Stage II: Diminishing returns; 0 < MPP < APP; TPP reaches maximum when MPP = 0',
      'Stage III: Congestion & overcrowding; MPP < 0; TPP begins falling'
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Stage I ends where MPP = APP (APP max). Stage II ends where MPP = 0 (TPP max). Stage III is negative returns where MPP < 0.',
    hints: [
      'First, workers specialise and output per worker rises (Stage I).',
      'Next, fixed capital is fully loaded so extra workers add less and less (Stage II).',
      'Finally, excessive workers get in each other\'s way reducing total output (Stage III).'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_14',
    nodeId: NODE_C12_ECON_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does a rational firm manager in Tirupur choose to operate strictly in Stage II, and NEVER in Stage I or Stage III?',
    options: [
      'Because Stage II has the highest MPP of any individual worker',
      'In Stage I fixed capital is underutilised (APP still rising), while in Stage III extra labour reduces total output (MPP < 0)',
      'Because Stage II produces zero total variable cost',
      'Because government labour laws prohibit operating in Stage I'
    ],
    correctIndex: 1,
    explanation: 'In Stage I, hiring more workers raises average efficiency of fixed plant. In Stage III, marginal output is negative. Only in Stage II are both fixed and variable factors efficiently balanced.',
    hints: [
      'Why not stop in Stage I? Because average product is still increasing; the machine is underused.',
      'Why not operate in Stage III? Because adding a worker actually DESTROYS total output.',
      'Stage II is the only economically rational zone.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_15',
    nodeId: NODE_C12_ECON_039,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Kavita runs a Delhi kirana store. Paid-out expenses (stock, electricity, helper) = ₹14 lakh. She foregoes ₹3.6 lakh rent on her own shop and ₹4.8 lakh salary from her previous job. Annual revenue is ₹18 lakh. Calculate her Economic Profit in lakhs (use negative sign if loss).',
    correctAnswer: -4.4,
    tolerance: 0.1,
    unit: 'lakhs',
    explanation: 'Explicit Cost = ₹14L. Implicit Cost = ₹3.6L + ₹4.8L = ₹8.4L. Economic Cost = 14 + 8.4 = ₹22.4L. Economic Profit = TR - EC = 18 - 22.4 = -₹4.4 lakh (Economic loss of ₹4.4 lakh despite accounting profit of ₹4L).',
    hints: [
      'Economic Cost = Explicit Costs + Implicit Costs.',
      'Implicit costs = ₹3.6L (rent) + ₹4.8L (salary) = ₹8.4L. Total Economic Cost = ₹22.4L.',
      'Economic Profit = Revenue (₹18L) - Economic Cost (₹22.4L) = -4.4 lakh.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_16',
    nodeId: NODE_C12_ECON_039,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When Tata Steel Jamshedpur discharges unpriced emissions into the Subarnarekha river causing health costs to local residents, how is Social Cost defined?',
    options: [
      'Social Cost = Accounting Cost - Depreciation',
      'Social Cost = Private Cost + External Pollution Cost',
      'Social Cost = Total Revenue - Explicit Wages',
      'Social Cost = Fixed Cost + Variable Cost only'
    ],
    correctIndex: 1,
    explanation: 'Social Cost encompasses the private costs paid by the producer PLUS the external costs (uncompensated negative externalities like health & environmental damages) imposed on society.',
    hints: [
      'Private cost is what the company pays for ore, coal, wages.',
      'Society also suffers from smoke and water contamination.',
      'Social Cost = Private Cost + External Cost.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_ECON_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'At Reliance Jamnagar refinery, Total Fixed Cost is ₹1,000 Cr. As refined output increases from 10 lakh to 50 lakh barrels, what happens to the Average Fixed Cost (AFC) curve?',
    options: [
      'AFC rises continuously as a straight line',
      'AFC stays completely constant at all outputs',
      'AFC declines continuously, tracing a rectangular hyperbola (AFC * Q = TFC)',
      'AFC is U-shaped, dropping and then rising steeply'
    ],
    correctIndex: 2,
    explanation: 'AFC = TFC / Q. Since numerator TFC is constant (₹1000 Cr), as Q expands AFC approaches zero asymptotically, forming a rectangular hyperbola.',
    hints: [
      'Dividing a fixed ₹1,000 Cr across more and more barrels spreads the overhead.',
      'AFC = TFC / Q.',
      'As Q increases, AFC must decline continuously towards the X-axis.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_18',
    nodeId: NODE_C12_ECON_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the Marginal Cost (MC) curve ALWAYS intersect the Average Total Cost (AC) and Average Variable Cost (AVC) curves at their lowest minimum points?',
    options: [
      'Because government price ceilings fix MC equal to AC',
      'When MC < AC, it pulls the average down; when MC > AC, it pulls the average up; transition is at AC minimum',
      'Because total fixed cost becomes zero at AC minimum',
      'Because returns to scale only exist at the minimum point'
    ],
    correctIndex: 1,
    explanation: 'This is the universal mathematical property of averages and marginals. As long as the next unit costs less than the average, average falls. Once it costs more, average rises. Thus MC crosses AC at min AC.',
    hints: [
      'Think about average marks in class: if your next test score is lower than average, your average drops.',
      'If your next test score is higher than average, your average rises.',
      'The minimum of AC occurs exactly where MC = AC.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_ECON_040,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the TWO mandatory conditions required for Producer Equilibrium (Profit Maximisation) under the MR-MC approach.',
    availableParts: ['MR = MC', 'MC is rising (cuts MR from below)', 'TR = TC', 'AR = AC', 'MC is falling'],
    targetState: 'MR = MC MC is rising (cuts MR from below)',
    validationHint: 'Select the primary first-order condition and the essential second-order stability condition.',
    explanation: 'Condition 1: MR = MC. Condition 2: MC must be rising at that output (MC cuts MR from below). If MC were falling, producing more would increase profits further.',
    hints: [
      'The first rule is equating marginal revenue to marginal cost.',
      'The second rule ensures you are at maximum profit, not minimum profit.',
      'Click "MR = MC" followed by "MC is rising (cuts MR from below)".'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_20',
    nodeId: NODE_C12_ECON_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A Surat textile weaver operates in a perfectly competitive yarn market selling at ₹50/meter, while a Mumbai fashion boutique has monopoly pricing power. How do their Revenue curves compare?',
    options: [
      'Surat weaver: horizontal AR = MR = P; Mumbai boutique: downward sloping AR with MR lying below AR',
      'Both have downward sloping AR and MR curves',
      'Surat weaver has MR < AR, while Mumbai boutique has MR = AR = P',
      'Surat weaver faces U-shaped revenue, while boutique faces linear revenue'
    ],
    correctIndex: 0,
    explanation: 'Under perfect competition the firm is a price taker so AR = MR = ₹50 (horizontal). Under monopoly/imperfect competition, to sell an additional unit price must be lowered on all units, making MR < AR.',
    hints: [
      'A price taker can sell any quantity at the prevailing market price: AR = MR = P.',
      'A price maker must reduce price to expand sales volume: MR falls twice as fast as AR.',
      'Option 1 correctly identifies both market revenue geometries.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_21',
    nodeId: NODE_C12_ECON_039,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the Cost Concept to its exact economic definition: Total Cost (TC) at zero output is equal to:',
    options: [
      'Total Variable Cost (TVC)',
      'Total Fixed Cost (TFC)',
      'Marginal Cost (MC)',
      'Zero'
    ],
    correctIndex: 1,
    explanation: 'At Q = 0, TVC = 0. Since TC = TFC + TVC, at zero production TC is exactly equal to TFC (fixed overheads like factory rent).',
    hints: [
      'Think about whether a landlord still charges rent if a factory is temporarily shut for a day.',
      'Fixed costs are incurred regardless of output level.',
      'Thus at zero output, TC = TFC.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_22',
    nodeId: NODE_C12_ECON_038,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At 4 units of labour, TPP is 48 shirts. At 5 units, TPP is 50 shirts. At 6 units, TPP drops to 48 shirts. What is the Marginal Physical Product (MPP) of the 6th tailor in shirts?',
    correctAnswer: -2,
    tolerance: 0,
    unit: 'shirts',
    explanation: 'MPP(6) = TPP(6) - TPP(5) = 48 - 50 = -2 shirts. This exemplifies Stage III (negative marginal returns).',
    hints: [
      'MPP = TPP at current units minus TPP at previous units.',
      'MPP(6) = 48 - 50.',
      'The result is a negative number: -2.'
    ],
    misconceptionIndex: 0
  }
];

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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_ECON_031,
  title: 'Market Mechanism & Theory of Production and Cost',
  definition: 'Market mechanism is the self-correcting process through which competitive demand and supply establish equilibrium price (Qd=Qs). Production functions link input factors to physical output in short and long runs, determining cost geometries and producer equilibrium.',
  eli5: 'Think of market price as a seesaw balancing buyers and sellers. In a workshop, adding helpers first boosts efficiency, then clogs up the machines, shaping the cost curves that tell owners how much to produce!',
  misconceptions: [
    {
      misconception: 'Equilibrium occurs at the midpoint or highest price of the schedule',
      correction: 'Equilibrium occurs ONLY where quantity demanded equals quantity supplied (Qd = Qs).'
    },
    {
      misconception: 'Price controls eliminate shortages or surpluses',
      correction: 'A price ceiling below equilibrium CREATES a shortage; a price floor above equilibrium CREATES a surplus.'
    },
    {
      misconception: 'Returns to a factor and returns to scale are identical',
      correction: 'Returns to a factor alters ONE input (short run); returns to scale scales ALL inputs proportionally (long run).'
    },
    {
      misconception: 'Producer equilibrium only requires MR = MC',
      correction: 'MR = MC is necessary, but MC must also be RISING at the intersection point.'
    },
    {
      misconception: 'Accounting profit equals economic profit',
      correction: 'Economic profit subtracts both explicit AND implicit opportunity costs from revenue.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the condition for market equilibrium?', options: ['Qd > Qs', 'Qd = Qs', 'Qs > Qd', 'P = 0'], correctIndex: 1 },
    { question: 'A price ceiling below Pe leads to:', options: ['Excess Supply', 'Shortage (Excess Demand)', 'No effect', 'Buffer stock'], correctIndex: 1 },
    { question: 'Stage I of Variable Proportions ends where:', options: ['MPP = 0', 'MPP = APP', 'TPP is falling', 'MPP is negative'], correctIndex: 1 },
    { question: 'Economic Cost equals:', options: ['Explicit cost only', 'Explicit + Implicit cost', 'Implicit cost only', 'Social cost - Private cost'], correctIndex: 1 },
    { question: 'MC intersects AC at:', options: ['AC maximum', 'AC minimum', 'AC midpoint', 'AC inflection'], correctIndex: 1 },
    { question: 'Under perfect competition:', options: ['AR > MR', 'AR = MR = Price', 'MR is negative', 'AR falls steeply'], correctIndex: 1 },
    { question: 'MSP set above Pe is an example of a:', options: ['Price Ceiling', 'Price Floor', 'Black Market', 'Ration quota'], correctIndex: 1 },
    { question: 'When MPP < APP, APP is:', options: ['Rising', 'Falling', 'Constant', 'Zero'], correctIndex: 1 }
  ],
  masteryCriteria: 'Student demonstrates master-level competency in price mechanism, comparative statics, price ceilings/floors, short-run production stages, cost curves, and producer equilibrium.',
  onComplete: undefined
};

const EXPLORATION_STEPS = [
  {
    title: '1. The Market Scissors: Azadpur Tomato Mandi',
    instruction: 'Drag the Price Slider from ₹10 to ₹90. Watch how buyers bid up during shortages and sellers discount during surpluses.',
    interactionType: 'slider-mandi',
    nodeId: NODE_C12_ECON_031
  },
  {
    title: '2. Demand & Supply Shifts: The Comparative Statics Lab',
    instruction: 'Toggle demand and supply shocks (Monsoon harvest, festive buying, subsidy changes) to see new equilibrium intersections.',
    interactionType: 'toggle-shifts',
    nodeId: NODE_C12_ECON_033
  },
  {
    title: '3. Price Interventions: PDS Ceiling vs MSP Floor',
    instruction: 'Switch between Market Free Play, Price Ceiling (PDS Rice ₹20), and Price Floor (MSP Wheat ₹75). Observe Shortage & Surplus.',
    interactionType: 'policy-switch',
    nodeId: NODE_C12_ECON_035
  },
  {
    title: '4. Law of Variable Proportions: Tirupur Garment Floor',
    instruction: 'Add tailors (Labour 1 to 7) to 5 fixed sewing machines. Observe the 3 Stages (Specialisation -> Diminishing -> Congestion).',
    interactionType: 'labour-slider',
    nodeId: NODE_C12_ECON_038
  },
  {
    title: '5. Cost & Revenue Geometries: Reliance Jamnagar Refinery',
    instruction: 'Adjust barrel output to view AFC hyperbola, U-shaped AVC, AC, MC, and find the exact profit-maximising Producer Equilibrium.',
    interactionType: 'cost-explorer',
    nodeId: NODE_C12_ECON_040
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the government fixes wheat procurement MSP at ₹2,500/quintal while market clearing price is ₹1,800/quintal, what will occur?',
    options: [
      'A shortage; millers cannot find enough grain',
      'A surplus; FCI must procure unsold wheat into buffer godowns',
      'Demand for wheat will immediately triple',
      'Equilibrium price will drop to ₹1,000'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now activate the Price Floor policy toggle in Lab 3 to inspect the resulting surplus buffer gap.'
  },
  {
    question: 'Predict: If 6 tailors are added to only 2 sewing machines in a small room, what will happen to Marginal Product of the 6th tailor?',
    options: [
      'MPP will reach an all-time record high',
      'MPP will become zero or negative due to physical congestion and machine queuing',
      'APP will double',
      'Fixed cost will disappear'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Labour input to 6 in Lab 4 and observe MPP dipping below zero.'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the Marginal Cost (MC) line relative to Average Cost (AC) as output increases?',
    observableOptions: [
      'MC crosses AC precisely at AC\'s lowest trough (minimum point)',
      'MC is always above AC at every single output level',
      'MC is completely horizontal',
      'MC never intersects AC'
    ],
    correctIndex: 0
  },
  {
    question: 'What pattern occurs to the gap between Average Total Cost (AC) and Average Variable Cost (AVC) as production expands?',
    observableOptions: [
      'The gap widens continuously',
      'The gap narrows because Average Fixed Cost (AFC) gets smaller and smaller',
      'The two curves cross and reverse',
      'AVC rises above AC'
    ],
    correctIndex: 1
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Senior Economic Consultant: Real-World Mandi Audit',
  description: 'Choose any real enterprise in India (e.g., Mother Dairy, Tata Power Solar, or your neighbourhood bakery). Write down: (1) Their fixed vs variable inputs, (2) An external social cost they generate, and (3) How a ₹10 change in product price would alter their producer equilibrium.',
  steps: [
    'Identify 2 Fixed factors (e.g., blast furnace, factory lease) & 2 Variable factors (crude oil, hourly labour).',
    'Calculate the opportunity cost of the entrepreneur’s time and owned premises.',
    'Map whether the firm is operating in Stage II of production.',
    'Formulate a 3-sentence policy brief for the Ministry of Commerce & Industry.'
  ]
};

function C12_EconomicsMarketMechanismEquilibriumSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_ECON_031,
    title = DEFAULT_PROPS.title,
    definition = DEFAULT_PROPS.definition,
    eli5 = DEFAULT_PROPS.eli5,
    misconceptions = DEFAULT_PROPS.misconceptions,
    diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
    masteryCriteria = DEFAULT_PROPS.masteryCriteria,
    onComplete
  } = props;

  const subjectConfig = SUBJECT_CONFIG['econ'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase management
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant Predict-Then-Check State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // Observation State
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab Variables (Real-time reactive sliders)
  const [mandiPrice, setMandiPrice] = useState(50); // ₹10 - ₹90
  const [demandShiftVal, setDemandShiftVal] = useState(0); // -30 to +30
  const [supplyShiftVal, setSupplyShiftVal] = useState(0); // -30 to +30
  const [policyMode, setPolicyMode] = useState<'free' | 'ceiling' | 'floor'>('free');
  const [labourUnits, setLabourUnits] = useState(3); // 1 - 7 tailors
  const [barrelOutput, setBarrelOutput] = useState(3); // 1 - 6 units (Jamnagar)
  const [isMonopoly, setIsMonopoly] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'graph' | 'insight'>('graph');

  // Challenge & Adaptive Engine State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hint & Feedback State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Non-MCQ State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection Responses
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Visual Effects State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Initial Load of Mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. Filter challenges by difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // 3. Adaptive Difficulty on Score Update
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

  // 4. HTML5 Canvas Live Animation (Mandis & Output particles)
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

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 20 + Math.sin((x + frame * 2) * 0.05) * 8 * (mandiPrice / 50);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Mandi Live Price: ₹${mandiPrice}/kg | Output Flow: ${labourUnits * 10} t/hr`, 10, 36);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [mandiPrice, labourUnits]);

  // Derived Mandi Calculations (c12_econ_031 - 035)
  const mandiQd = useMemo(() => Math.max(0, 120 - mandiPrice + demandShiftVal), [mandiPrice, demandShiftVal]);
  const mandiQs = useMemo(() => Math.max(0, 20 + mandiPrice + supplyShiftVal), [mandiPrice, supplyShiftVal]);
  const mandiShortage = useMemo(() => Math.max(0, mandiQd - mandiQs), [mandiQd, mandiQs]);
  const mandiSurplus = useMemo(() => Math.max(0, mandiQs - mandiQd), [mandiQd, mandiQs]);

  // Derived Law of Variable Proportions Data (c12_econ_037, 038)
  const productionData = useMemo(() => {
    return [
      { l: 0, tpp: 0, app: 0, mpp: 0 },
      { l: 1, tpp: 10, app: 10, mpp: 10 },
      { l: 2, tpp: 24, app: 12, mpp: 14 },
      { l: 3, tpp: 39, app: 13, mpp: 15 },
      { l: 4, tpp: 48, app: 12, mpp: 9 },
      { l: 5, tpp: 50, app: 10, mpp: 2 },
      { l: 6, tpp: 48, app: 8, mpp: -2 },
      { l: 7, tpp: 42, app: 6, mpp: -6 }
    ];
  }, []);

  const currentProductionRow = useMemo(() => {
    return productionData[labourUnits] || productionData[1];
  }, [productionData, labourUnits]);

  // Derived Cost Data (c12_econ_040)
  const costData = useMemo(() => {
    const tfc = 100;
    const tvcArr = [0, 40, 70, 90, 120, 170, 240];
    return [1, 2, 3, 4, 5, 6].map(q => {
      const tvc = tvcArr[q] || 50 * q;
      const tc = tfc + tvc;
      const afc = Number((tfc / q).toFixed(1));
      const avc = Number((tvc / q).toFixed(1));
      const ac = Number((tc / q).toFixed(1));
      const prevTc = q === 1 ? tfc : tfc + (tvcArr[q - 1] || 0);
      const mc = tc - prevTc;
      const p = isMonopoly ? Math.max(20, 90 - q * 10) : 50;
      const tr = p * q;
      const mr = isMonopoly ? 90 - 20 * q : 50;
      const ar = p;
      const profit = tr - tc;
      return { q, tfc, tvc, tc, afc, avc, ac, mc, ar, mr, tr, profit };
    });
  }, [isMonopoly]);

  // Event Handlers
  const handleDiscoveryAnswer = useCallback((index: number) => {
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding economic instinct!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Step 1: Explore how price clears shortages and surpluses in Azadpur Mandi.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setMandiPrice(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free play! Experiment with all 5 economic laboratories with real-time sliders.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode initiated. Test your analytical depth across ISC scenarios!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation sliders to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! MC always intersects AC at its minimum.' : 'Look closer at the graph minimum.');
  }, []);

  const handleMandiSliderChange = useCallback((val: number) => {
    setMandiPrice(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified) {
      setPredictionVerified(true);
    }
  }, [predictionMade, predictionVerified]);

  const handleLabourChange = useCallback((units: number) => {
    setLabourUnits(units);
    audioManager.play('count');
  }, []);

  const handleBarrelChange = useCallback((units: number) => {
    setBarrelOutput(units);
    audioManager.play('count');
  }, []);

  const handleShocksReset = useCallback(() => {
    setDemandShiftVal(0);
    setSupplyShiftVal(0);
    audioManager.play('pop');
  }, []);

  const handlePolicyToggle = useCallback((mode: 'free' | 'ceiling' | 'floor') => {
    setPolicyMode(mode);
    audioManager.play('tap');
    if (mode === 'ceiling') setMandiPrice(20);
    else if (mode === 'floor') setMandiPrice(75);
    else setMandiPrice(50);
  }, []);

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
    }
  }, [hintCount, challenge]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Sensational! You have mastered ISC Class 12 Market Mechanism and Production Theory.');
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
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
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! That is correct.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ score: 100, date: Date.now() }));
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
        speechManager.speak('Let us study the complete step-by-step resolution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 ? (challenge.sortItems?.map((_, i) => i) || []) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Simulation Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700/50 rounded-2xl shadow-inner inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-900/60 text-emerald-300 rounded-md border border-emerald-700/40">
                ISC Class 12 Commerce
              </span>
              <span className="text-xs text-slate-400">Economics • Microeconomics</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300'
                : difficulty === 'advanced'
                ? 'bg-rose-900/40 border-rose-500 text-rose-300'
                : 'bg-gold-900/40 border-gold-500 text-gold-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right">
            <p className="text-xs text-slate-400 font-medium">BKT Mastery</p>
            <p className="text-xs font-bold text-emerald-400 capitalize">{masteryLevel}</p>
          </div>
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/60 shadow-lg"
          >
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Real-World Scenario Arc</span>
            <h2 className="text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-300/80 mt-2 italic">{SCENARIO.context}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <span>⚡ Discovery Challenge: Test Your Intuition</span>
            </div>
            <p className="text-base text-slate-100 font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-white'
                        : 'bg-slate-800/50 text-slate-400 opacity-60'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700/80 border border-slate-700/60'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Exactly right! Shortage emerges.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED BRILLIANT EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Guided Discovery Lab • Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-xl font-black text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{ scale: idx === currentSlide ? 1.2 : 1 }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-amber-300/90 font-medium bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl"
          >
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-5"
            >
              {/* STEP 1: MANDI EQUILIBRIUM & DISEQUILIBRIUM */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <p className="text-xs text-slate-400 uppercase font-bold">Wholesale Price (P)</p>
                      <p className="text-2xl font-black text-emerald-400">₹{mandiPrice} / kg</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <p className="text-xs text-slate-400 uppercase font-bold">Demand (Qd) vs Supply (Qs)</p>
                      <p className="text-lg font-bold text-white">
                        <span className="text-gold-400">{mandiQd} t</span> vs <span className="text-amber-400">{mandiQs} t</span>
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-xl border ${mandiShortage > 0 ? 'bg-rose-950/50 border-rose-700' : mandiSurplus > 0 ? 'bg-amber-950/50 border-amber-700' : 'bg-emerald-950/50 border-emerald-700'}`}
                    >
                      <p className="text-xs uppercase font-bold text-slate-300">Market Status</p>
                      <p className="text-sm font-black">
                        {mandiShortage > 0 && `Shortage: ${mandiShortage} tonnes (Price Bids UP)`}
                        {mandiSurplus > 0 && `Surplus: ${mandiSurplus} tonnes (Price Cuts DOWN)`}
                        {mandiShortage === 0 && mandiSurplus === 0 && 'Equilibrium Cleared! (Qd = Qs = 70t)'}
                      </p>
                    </motion.div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-400 font-semibold">
                      <span>₹10 (Extreme Shortage)</span>
                      <span className="text-emerald-400 font-bold">Equilibrium: ₹50</span>
                      <span>₹90 (Extreme Surplus)</span>
                    </div>
                    {/* Real-time slider immediately updating visualization without submit */}
                    <input
                      type="range"
                      min={10}
                      max={90}
                      value={mandiPrice}
                      onChange={e => handleMandiSliderChange(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      aria-label="Adjust Mandi Wholesale Price"
                    />
                  </div>

                  {/* SVG Diagram 1: Market Scissors & Disequilibrium Zones */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 240" className="w-full h-48">
                      <line x1="50" y1="20" x2="50" y2="200" stroke="#334155" strokeWidth="2" />
                      <line x1="50" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="2" />
                      <text x="25" y="25" fill="#94a3b8" fontSize="10">Price (₹)</text>
                      <text x="430" y="215" fill="#94a3b8" fontSize="10">Quantity (t)</text>

                      {/* Demand Curve DD */}
                      <line x1="80" y1="40" x2="440" y2="180" stroke="#818cf8" strokeWidth="3" />
                      <text x="445" y="185" fill="#818cf8" fontSize="11" fontWeight="bold">DD (120 - P)</text>

                      {/* Supply Curve SS */}
                      <line x1="80" y1="180" x2="440" y2="40" stroke="#fbbf24" strokeWidth="3" />
                      <text x="445" y="45" fill="#fbbf24" fontSize="11" fontWeight="bold">SS (20 + P)</text>

                      {/* Equilibrium Point E */}
                      <circle cx="260" cy="110" r="5" fill="#10b981" />
                      <text x="265" y="105" fill="#10b981" fontSize="11" fontWeight="bold">E (Pe=₹50, Qe=70)</text>

                      {/* Dynamic Price Line and Disequilibrium Shading */}
                      {(() => {
                        const yPos = 200 - (mandiPrice / 100) * 180;
                        const qdPos = 50 + ((120 - mandiPrice) / 120) * 380;
                        const qsPos = 50 + ((20 + mandiPrice) / 120) * 380;
                        return (
                          <g>
                            <line x1="50" y1={yPos} x2="480" y2={yPos} stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
                            <circle cx={qdPos} cy={yPos} r="4" fill="#818cf8" />
                            <circle cx={qsPos} cy={yPos} r="4" fill="#fbbf24" />
                            <text x="55" y={yPos - 5} fill="#f43f5e" fontSize="10" fontWeight="bold">P = ₹{mandiPrice}</text>
                            {mandiShortage > 0 && (
                              <rect x={Math.min(qdPos, qsPos)} y={yPos - 4} width={Math.abs(qdPos - qsPos)} height="8" fill="#f43f5e" opacity="0.4" rx="2" />
                            )}
                            {mandiSurplus > 0 && (
                              <rect x={Math.min(qdPos, qsPos)} y={yPos - 4} width={Math.abs(qdPos - qsPos)} height="8" fill="#fbbf24" opacity="0.4" rx="2" />
                            )}
                          </g>
                        );
                      })()}
                    </svg>
                  </motion.div>
                </div>
              )}

              {/* STEP 2: COMPARATIVE STATICS SHIFTS */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDemandShiftVal(prev => prev === 20 ? 0 : 20)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${demandShiftVal > 0 ? 'bg-gold-900/70 border-gold-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      {demandShiftVal > 0 ? '✓ Festival Demand (+)' : '+ Festival Demand (Right Shift)'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSupplyShiftVal(prev => prev === 25 ? 0 : 25)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${supplyShiftVal > 0 ? 'bg-amber-900/70 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      {supplyShiftVal > 0 ? '✓ Bumper Crop (+)' : '+ Bumper Harvest (Supply Right)'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSupplyShiftVal(prev => prev === -25 ? 0 : -25)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${supplyShiftVal < 0 ? 'bg-rose-900/70 border-rose-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      {supplyShiftVal < 0 ? '✓ Crop Failure (-)' : '- Flood/Drought (Supply Left)'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShocksReset}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-700 text-slate-300 hover:bg-slate-600"
                    >
                      Reset Shocks
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-400">Demand Curve Shift:</p>
                      <p className="font-bold text-gold-300">{demandShiftVal > 0 ? `+${demandShiftVal} (Rightward Shift)` : 'Zero Shift (Stable DD)'}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Supply Curve Shift:</p>
                      <p className="font-bold text-amber-300">{supplyShiftVal !== 0 ? `${supplyShiftVal > 0 ? '+' : ''}${supplyShiftVal} (Supply Shift)` : 'Zero Shift (Stable SS)'}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300">
                    Rule to internalise: When <strong>one curve shifts</strong>, equilibrium moves ALONG the other stable curve. When <strong>both curves shift</strong>, exactly one variable (Price or Quantity) is certain, and the other is ambiguous without exact magnitudes.
                  </p>
                </div>
              )}

              {/* STEP 3: PRICE CONTROLS & RATIONING */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePolicyToggle('free')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border flex-1 ${policyMode === 'free' ? 'bg-emerald-900/70 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      Free Market (Pe = ₹50)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePolicyToggle('ceiling')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border flex-1 ${policyMode === 'ceiling' ? 'bg-rose-900/70 border-rose-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      Price Ceiling (PDS Rice ₹20)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePolicyToggle('floor')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border flex-1 ${policyMode === 'floor' ? 'bg-amber-900/70 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      Price Floor (MSP Wheat ₹75)
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    {policyMode === 'ceiling' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-300 text-xs space-y-1">
                        <p className="font-bold text-sm">Binding Price Ceiling Imposed (Pc = ₹20 &lt; Pe):</p>
                        <p>• Quantity Demanded (Qd) = 100 tonnes vs Quantity Supplied (Qs) = 40 tonnes.</p>
                        <p>• <strong>Shortage = 60 tonnes.</strong> Rationing is essential (family ration cards) to distribute the limited 40 tonnes and prevent black-market emergence.</p>
                      </motion.div>
                    )}
                    {policyMode === 'floor' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-300 text-xs space-y-1">
                        <p className="font-bold text-sm">Binding Price Floor Imposed (MSP Pf = ₹75 &gt; Pe):</p>
                        <p>• Quantity Supplied (Qs) = 95 tonnes vs Quantity Demanded (Qd) = 45 tonnes.</p>
                        <p>• <strong>Surplus = 50 tonnes.</strong> Food Corporation of India (FCI) must procure this 50-tonne surplus into buffer stock to sustain the price floor.</p>
                      </motion.div>
                    )}
                    {policyMode === 'free' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-300 text-xs">
                        Free Market Equilibrium: Demand (70t) = Supply (70t) at ₹50/kg. Zero artificial shortage or surplus.
                      </motion.p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: LAW OF VARIABLE PROPORTIONS & SVG 2 */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-bold">
                      Fixed Capital: 5 Sewing Machines | Variable Tailors (L): {labourUnits}
                    </span>
                    <motion.span
                      key={labourUnits}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className={`text-xs px-2.5 py-1 rounded-full font-bold ${labourUnits <= 3 ? 'bg-emerald-900/60 text-emerald-300' : labourUnits <= 5 ? 'bg-gold-900/60 text-gold-300' : 'bg-rose-900/60 text-rose-300'}`}
                    >
                      {labourUnits <= 3 ? 'Stage I (Increasing Returns)' : labourUnits <= 5 ? 'Stage II (Rational Diminishing Returns)' : 'Stage III (Negative Overcrowding)'}
                    </motion.span>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={7}
                    value={labourUnits}
                    onChange={e => handleLabourChange(Number(e.target.value))}
                    className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    aria-label="Select Number of Workers"
                  />

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-800/80 rounded-xl">
                      <p className="text-xs text-slate-400">Total Output (TPP)</p>
                      <p className="text-xl font-bold text-white">{currentProductionRow.tpp} shirts</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-800/80 rounded-xl">
                      <p className="text-xs text-slate-400">Average Output (APP)</p>
                      <p className="text-xl font-bold text-gold-400">{currentProductionRow.app} / tailor</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-800/80 rounded-xl">
                      <p className="text-xs text-slate-400">Marginal Output (MPP)</p>
                      <p className={`text-xl font-bold ${currentProductionRow.mpp < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {currentProductionRow.mpp} shirts
                      </p>
                    </motion.div>
                  </div>

                  {/* SVG Diagram 2: Three Stages of Variable Proportions */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 220" className="w-full h-44">
                      {/* Axes */}
                      <line x1="40" y1="20" x2="40" y2="180" stroke="#475569" strokeWidth="2" />
                      <line x1="40" y1="180" x2="480" y2="180" stroke="#475569" strokeWidth="2" />
                      <text x="15" y="25" fill="#94a3b8" fontSize="10">Output</text>
                      <text x="440" y="195" fill="#94a3b8" fontSize="10">Labour (L)</text>

                      {/* Stage demarcation verticals */}
                      <line x1="180" y1="20" x2="180" y2="180" stroke="#64748b" strokeDasharray="3 3" />
                      <line x1="330" y1="20" x2="330" y2="180" stroke="#64748b" strokeDasharray="3 3" />
                      <text x="90" y="35" fill="#10b981" fontSize="10" fontWeight="bold">Stage I</text>
                      <text x="240" y="35" fill="#38bdf8" fontSize="10" fontWeight="bold">Stage II (Rational)</text>
                      <text x="380" y="35" fill="#f43f5e" fontSize="10" fontWeight="bold">Stage III</text>

                      {/* Curves: TPP, APP, MPP */}
                      <path d="M 40 180 Q 150 120 220 70 T 340 50 Q 420 70 470 120" fill="none" stroke="#38bdf8" strokeWidth="3" />
                      <path d="M 40 180 Q 180 90 280 120 T 470 150" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                      <path d="M 40 180 Q 120 60 180 90 T 330 180 Q 400 210 470 215" fill="none" stroke="#f43f5e" strokeWidth="2.5" />

                      {/* Indicator of current L */}
                      {(() => {
                        const x = 40 + (labourUnits / 7) * 420;
                        return (
                          <g>
                            <line x1={x} y1="20" x2={x} y2="180" stroke="#fbbf24" strokeWidth="2" />
                            <circle cx={x} cy="100" r="4" fill="#fbbf24" />
                            <text x={x - 12} y="15" fill="#fbbf24" fontSize="10" fontWeight="bold">L={labourUnits}</text>
                          </g>
                        );
                      })()}
                    </svg>
                  </motion.div>
                </div>
              )}

              {/* STEP 5: COST GEOMETRIES & SVG 3 */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-300 font-bold">Output Barrels (Q): {barrelOutput}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMonopoly(prev => !prev)}
                        className={`text-xs px-3 py-1 rounded-lg border font-bold ${isMonopoly ? 'bg-purple-900/60 border-purple-500 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                      >
                        {isMonopoly ? 'Market: Monopoly (AR > MR)' : 'Market: Perfect Comp (AR = MR = ₹50)'}
                      </motion.button>
                    </div>
                    <div className="text-xs text-emerald-400 font-bold">
                      {barrelOutput === 4 ? '★ Producer Equilibrium (MR = MC = 50, MC rising)' : 'Adjust Q to find MR = MC'}
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={6}
                    value={barrelOutput}
                    onChange={e => handleBarrelChange(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    aria-label="Adjust Output Quantity"
                  />

                  {/* SVG Diagram 3: Cost Curves AC, AVC, AFC Hyperbola, and MC cutting min AC */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 220" className="w-full h-44">
                      {/* Axes */}
                      <line x1="40" y1="20" x2="40" y2="180" stroke="#475569" strokeWidth="2" />
                      <line x1="40" y1="180" x2="480" y2="180" stroke="#475569" strokeWidth="2" />
                      <text x="15" y="25" fill="#94a3b8" fontSize="10">Cost (₹)</text>
                      <text x="440" y="195" fill="#94a3b8" fontSize="10">Output (Q)</text>

                      {/* AFC Rectangular Hyperbola */}
                      <path d="M 60 40 Q 100 120 460 165" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="440" y="155" fill="#64748b" fontSize="9">AFC</text>

                      {/* AVC U-curve */}
                      <path d="M 60 140 Q 180 90 460 110" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                      <text x="440" y="105" fill="#f59e0b" fontSize="9">AVC</text>

                      {/* AC U-curve */}
                      <path d="M 60 70 Q 240 85 460 65" fill="none" stroke="#38bdf8" strokeWidth="3" />
                      <text x="440" y="60" fill="#38bdf8" fontSize="9">AC</text>

                      {/* MC cutting min AC and min AVC from below */}
                      <path d="M 60 160 Q 140 130 240 85 T 460 30" fill="none" stroke="#f43f5e" strokeWidth="3" />
                      <text x="440" y="25" fill="#f43f5e" fontSize="9" fontWeight="bold">MC</text>

                      {/* Price / MR Line */}
                      <line x1="40" y1="85" x2="480" y2="85" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                      <text x="45" y="80" fill="#10b981" fontSize="9" fontWeight="bold">MR = P (₹50)</text>

                      {/* Producer equilibrium point */}
                      <circle cx="240" cy="85" r="5" fill="#10b981" />
                      <text x="245" y="80" fill="#10b981" fontSize="9" fontWeight="bold">E (MR = MC)</text>
                    </svg>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Prev Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-bold">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-950"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-3"
          >
            <div>
              <h2 className="text-lg font-bold text-white">Full Economic Sandbox: Free Manipulation</h2>
              <p className="text-xs text-slate-400">Play with price mechanisms, short-run factor proportions, and cost relationships with instant slider reactivity.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Sandbox: Mandi Controls */}
            <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400">Azadpur Mandi Interactive Simulator</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Price: ₹{mandiPrice}</span>
                  <span>Qd: {mandiQd}t | Qs: {mandiQs}t</span>
                </div>
                {/* Instant reactive slider */}
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={mandiPrice}
                  onChange={e => handleMandiSliderChange(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  aria-label="Sandbox Mandi Price"
                />
              </div>
              <canvas ref={canvasRef} width={450} height={50} className="w-full rounded-lg border border-slate-800" />
            </motion.div>

            {/* Right Sandbox: Production & Cost Controls */}
            <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-gold-400">Tirupur & Jamnagar Production Engine</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Tailors: {labourUnits}</span>
                  <span>TPP: {currentProductionRow.tpp} | MPP: {currentProductionRow.mpp}</span>
                </div>
                {/* Instant reactive slider */}
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={labourUnits}
                  onChange={e => handleLabourChange(Number(e.target.value))}
                  className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  aria-label="Sandbox Labour"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <p className="text-slate-400">AC</p>
                  <p className="font-bold text-white">₹{costData[barrelOutput - 1]?.ac}</p>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg">
                  <p className="text-slate-400">MC</p>
                  <p className="font-bold text-rose-400">₹{costData[barrelOutput - 1]?.mc}</p>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg">
                  <p className="text-slate-400">Profit</p>
                  <p className="font-bold text-emerald-400">₹{costData[barrelOutput - 1]?.profit}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-5">
          {/* Progress Bar with Motion */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span className="text-emerald-400 font-bold">
                Competency: <span className="uppercase tracking-wider">{challenge.competencyLevel}</span>
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card with Visual Feedback animations */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-2 border-rose-500 shadow-rose-950/50 shadow-xl'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 uppercase"
              >
                {challenge.type}
              </motion.span>
              <span className="text-xs text-slate-500">Node: {challenge.nodeId}</span>
            </div>

            <p className="text-base md:text-lg font-bold text-white mb-5 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ & Distinguish Rendering */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-white font-bold'
                        : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700 border border-slate-700/60'
                    }`}
                  >
                    <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Numeric Challenge Rendering */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold w-48 text-center text-lg focus:outline-none focus:border-emerald-500"
                    disabled={showExplanation}
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-950"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Drag Label Challenge Rendering */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 font-bold self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onDragStart={() => handleDragStart(item.label)}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'top_line', label: 'Top Horizontal Line (Above Pe)' },
                    { id: 'center_pt', label: 'Center Intersection Point E' },
                    { id: 'bottom_line', label: 'Bottom Horizontal Line (Below Pe)' },
                    { id: 'top_gap', label: 'Top Horizontal Gap (Qs - Qd)' }
                  ].map(target => (
                    <motion.div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl min-h-[70px] flex flex-col justify-center"
                    >
                      <span className="text-xs text-slate-400 mb-1">{target.label}:</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {droppedLabels[target.id] || <span className="text-slate-600 italic">Drop corresponding label here</span>}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-950"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort Challenge Rendering */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange in correct economic sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      whileHover={{ scale: 1.02 }}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold text-xs">
                        {displayIdx + 1}
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
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-950"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* Construct Challenge Rendering */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white text-xs font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold rounded-lg flex items-center gap-2"
                    >
                      {part}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-bold hover:text-rose-300"
                      >
                        ✕
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click elements above to assemble condition rule</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-950"
                >
                  Validate Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-slate-950 border border-emerald-800/80 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span>✓ Step-by-Step Resolution:</span>
                </div>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-slate-200 leading-relaxed">
                    <span className="font-bold text-emerald-400">{idx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex justify-between items-center">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold"
                    >
                      Show next step →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise & Review →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY PROFILE PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="p-6 bg-gradient-to-r from-emerald-950/80 to-slate-900 rounded-2xl border border-emerald-700 text-center space-y-2"
          >
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">ISC Module Mastery Achieved!</h2>
            <p className="text-sm text-emerald-300">
              Final Composite Score: <span className="font-bold text-white">{Math.max(0, 100 - errors * 5)}%</span> | BKT Level: <span className="font-bold uppercase text-white">{masteryLevel}</span>
            </p>
          </motion.div>

          {/* MOTIVATIONAL FEEDBACK SECTION based strictly on error count */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border text-center font-bold ${
              errors === 0
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                : errors <= 3
                ? 'bg-teal-950/70 border-teal-500 text-teal-200'
                : errors <= 7
                ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                : 'bg-rose-950/70 border-rose-500 text-rose-200'
            }`}
          >
            <h3 className="text-lg font-black uppercase tracking-wide">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs md:text-sm mt-1 text-slate-300 font-normal">
              {errors === 0
                ? 'Flawless performance across Marshallian scissors, price controls, short-run returns to factor, and dual producer equilibrium conditions!'
                : errors <= 3
                ? 'Solid grasp of microeconomic equilibria and cost structures. A quick spaced repetition review will solidify full mastery.'
                : errors <= 7
                ? 'You demonstrated good analytical foundation. Review the specific cost curves and disequilibrium adjustments.'
                : 'Economics takes practice! Re-run the interactive simulation sliders and revisit the step-by-step solutions.'}
            </p>
          </motion.div>

          {/* REFLECTION SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
              <span>💭 Deep Conceptual Reflection</span>
            </div>
            <p className="text-xs text-slate-400">Consolidate your learning by answering these three metacognitive prompts:</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  type="text"
                  value={reflection1}
                  onChange={e => setReflection1(e.target.value)}
                  placeholder="e.g., Why MC always cuts AC at the exact minimum..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  2. How would you explain this to a friend?
                </label>
                <input
                  type="text"
                  value={reflection2}
                  onChange={e => setReflection2(e.target.value)}
                  placeholder="e.g., Prices act like traffic signals balancing buyers and sellers..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  3. Where in real life might you use this?
                </label>
                <input
                  type="text"
                  value={reflection3}
                  onChange={e => setReflection3(e.target.value)}
                  placeholder="e.g., Analysing festival vegetable prices or planning a business production line..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setReflectionSaved(true);
                  audioManager.play('success');
                }}
                className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                {reflectionSaved ? '✓ Reflections Saved' : 'Save Reflection Journal'}
              </motion.button>
            </div>
          </motion.div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3"
            >
              <h3 className="text-sm font-bold text-rose-300">Targeted Conceptual Correction Profile:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <motion.div key={i} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-400 font-semibold">✓ Board Standard Correction: {m.correction}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Spaced Repetition Schedule Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/60 flex items-center justify-between"
          >
            <div>
              <h4 className="text-xs font-bold text-gold-300 uppercase">Spaced Repetition (SM-2 Algorithm)</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Next adaptive review recommended in <span className="text-emerald-400 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
              </p>
            </div>
            <motion.span whileHover={{ scale: 1.05 }} className="text-xs px-3 py-1 bg-gold-900 text-gold-200 rounded-full font-bold">
              SM-2 Active
            </motion.span>
          </motion.div>

          {/* Real-World Activity Arc */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-400 font-bold">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}

      {/* Auxiliary Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_EconomicsMarketMechanismEquilibriumSim;
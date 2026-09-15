'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, Bar, ReferenceLine, Label } from 'recharts';
import * as d3 from 'd3';

// ─── ISC ECONOMICS NODE IDS ───
const NODE_C12_ECON_011 = 'c12_econ_011'; // Equimarginal Utility Statement & Schedule
const NODE_C12_ECON_012 = 'c12_econ_012'; // Consumer Equilibrium MU Conditions
const NODE_C12_ECON_013 = 'c12_econ_013'; // Ordinal Utility IC Meaning & Properties
const NODE_C12_ECON_014 = 'c12_econ_014'; // Indifference Curve MRS & Diminishing MRS
const NODE_C12_ECON_015 = 'c12_econ_015'; // Indifference Map & Budget Line
const NODE_C12_ECON_016 = 'c12_econ_016'; // Consumer Equilibrium IC Approach
const NODE_C12_ECON_017 = 'c12_econ_017'; // Elasticity Meaning & 5 Degrees
const NODE_C12_ECON_018 = 'c12_econ_018'; // Elasticity Point/Percentage Method
const NODE_C12_ECON_019 = 'c12_econ_019'; // Elasticity Total Expenditure Method
const NODE_C12_ECON_020 = 'c12_econ_020'; // Elasticity Geometric Method

const ALL_NODE_IDS = [
  NODE_C12_ECON_011,
  NODE_C12_ECON_012,
  NODE_C12_ECON_013,
  NODE_C12_ECON_014,
  NODE_C12_ECON_015,
  NODE_C12_ECON_016,
  NODE_C12_ECON_017,
  NODE_C12_ECON_018,
  NODE_C12_ECON_019,
  NODE_C12_ECON_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Consumer & Market Intelligence Lab',
  intro: 'You are the Chief Consumer Economist advising retail behemoths (Amul, Tata Consumer, Reliance Retail) and the Ministry of Finance. Indian households and enterprises navigate strict budgets, shifting prices of essentials vs luxuries, and dynamic price elasticities.',
  context: 'From allocating monthly food budgets across rice and pulses under PDS subsidies to pricing Rajdhani flexi-fares and predicting oil demand shocks, you must master cardinal equimarginal utility, ordinal indifference curve tangency, and all three elasticity measurement techniques.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A Bengaluru student has ₹100 for snacks. Samosas cost ₹20 each and yield 60 utils of MU; Chai costs ₹10 each and yields 40 utils of MU. Where should the student spend the next ₹1?',
  options: [
    'Samosa — because 60 utils > 40 utils',
    'Chai — because 40/10 = 4 utils/₹ > 60/20 = 3 utils/₹',
    'Equally split — because both provide satisfaction',
    'Neither — total utility is already maximized',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: A rational consumer compares marginal utility per RUPEE (MU/P), not raw utils! Let us discover why.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ACROSS 10 NODES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C12_ECON_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the Law of Equimarginal Utility, what condition must hold for a consumer allocating income across two goods X and Y?',
    options: [
      'MUx = MUy',
      'MUx / Px = MUy / Py = MUm',
      'TUx = TUy',
      'Px · X = Py · Y',
    ],
    correctIndex: 1,
    explanation: 'Equimarginal equilibrium requires the marginal utility per rupee spent to be equal across all goods: MUx/Px = MUy/Py = MUm. Raw MU cannot be compared directly because goods have different rupee prices.',
    hints: [
      'Remember that ₹1 is the common denominator across all commodities.',
      'A rupee spent on cheap rice must yield the same satisfaction as a rupee spent on costly dal.',
      'Divide marginal utility of each good by its respective unit price: MUx/Px = MUy/Py.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_ECON_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A Lucknow consumer observes MUtea/Ptea = 4 utils/₹ and MUbiscuit/Pbiscuit = 2.5 utils/₹. How should the consumer reallocate spending?',
    options: [
      'Buy more biscuits and less tea',
      'Shift rupees from biscuits to tea to gain net satisfaction',
      'Maintain current spending because budget is exhausted',
      'Stop buying both goods immediately',
    ],
    correctIndex: 1,
    explanation: 'Since MUtea/Ptea (4) > MUbiscuit/Pbiscuit (2.5), every rupee shifted from biscuits to tea gains 4 utils while only losing 2.5 utils (net gain = +1.5 utils/₹). Buying more tea lowers MUtea via LDMU until equality is restored.',
    hints: [
      'Compare where each additional rupee gives the higher marginal bang for the buck.',
      'Shifting ₹1 to tea adds 4 utils; taking ₹1 from biscuits loses only 2.5 utils.',
      'The consumer should buy more of the high MU/P good (tea) and less of the low MU/P good (biscuits).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_ECON_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the necessary and sufficient conditions to their mathematical statements in Consumer Equilibrium.',
    dragItems: [
      { label: 'MUx/Px = MUy/Py = MUm', targetId: 'box_cardinal_foc' },
      { label: 'Px·X + Py·Y = M', targetId: 'box_budget' },
      { label: 'MRSxy = Px/Py', targetId: 'box_ordinal_foc' },
      { label: 'Diminishing MRS (Convex IC)', targetId: 'box_soc' },
    ],
    correctMapping: {
      box_cardinal_foc: 'MUx/Px = MUy/Py = MUm',
      box_budget: 'Px·X + Py·Y = M',
      box_ordinal_foc: 'MRSxy = Px/Py',
      box_soc: 'Diminishing MRS (Convex IC)',
    },
    explanation: 'Equilibrium requires both the equimarginal/tangency rule (first-order necessary condition) and complete budget exhaustion (PxX + PyY = M), backed by diminishing marginal rate of substitution (second-order sufficient condition).',
    hints: [
      'Look for the formula with MU/P for cardinal first-order condition.',
      'Budget exhaustion means total spending equals income M.',
      'Ordinal first-order condition equates MRSxy to price ratio Px/Py.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_ECON_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT a standard property of an Indifference Curve for normal goods?',
    options: [
      'It slopes downward from left to right',
      'It is concave to the origin',
      'A higher indifference curve represents higher utility',
      'Two indifference curves can never intersect',
    ],
    correctIndex: 1,
    explanation: 'Indifference curves are strictly CONVEX to the origin due to the Law of Diminishing Marginal Rate of Substitution (DMRS). Concave curves would imply increasing MRS (pathological preference).',
    hints: [
      'Think about whether your willingness to sacrifice good Y increases or decreases as you acquire more X.',
      'As you drink more cups of tea, each additional cup is worth fewer biscuits.',
      'This diminishing sacrifice creates a curve that bows towards the origin: convex, never concave.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_ECON_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A consumer moves on an IC from Bundle A (2 units X, 15 units Y) to Bundle B (3 units X, 11 units Y). Calculate MRSxy (units of Y sacrificed per unit of X gained).',
    correctAnswer: 4,
    tolerance: 0.1,
    unit: 'units of Y/X',
    explanation: 'MRSxy = |ΔY / ΔX| = |(11 - 15) / (3 - 2)| = |-4 / 1| = 4. The consumer is willing to give up 4 units of Y for 1 extra unit of X.',
    hints: [
      'Formula: MRSxy = ΔY / ΔX (Y sacrificed over X gained).',
      'Change in Y is 15 - 11 = 4 units. Change in X is 3 - 2 = 1 unit.',
      '4 / 1 = 4.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_ECON_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Pune consumer has income M = ₹2,400. Milk (X) is ₹60/litre, Bread (Y) is ₹30/loaf. What is the maximum litres of milk (X-intercept = M/Px) affordable?',
    correctAnswer: 40,
    tolerance: 0.5,
    unit: 'litres',
    explanation: 'The X-intercept represents spending entire income M solely on good X: X-intercept = M / Px = 2400 / 60 = 40 litres.',
    hints: [
      'Assume 0 loaves of bread are bought (Y = 0).',
      'Divide total income by the unit price of milk: 2400 / 60.',
      '2400 / 60 = 40.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_ECON_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'If the consumer\'s income rises by 50% while prices Px and Py stay constant, what happens to the budget line?',
    options: [
      'It pivots inward on the X-axis',
      'It shifts outward in a parallel manner (slope unchanged)',
      'It pivots outward on the Y-axis',
      'It becomes steeper because the consumer buys only luxury goods',
    ],
    correctIndex: 1,
    explanation: 'An income change increases both intercepts (M/Px and M/Py) proportionally while the slope (-Px/Py) remains constant. Hence, it shifts parallel outward.',
    hints: [
      'Slope depends only on the price ratio -Px/Py.',
      'Since neither Px nor Py changed, the slope cannot change.',
      'Both intercepts expand equally, creating a parallel outward shift.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_ECON_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'At the current consumption bundle, MRSxy = 3 while Px/Py = 1.5. What action must a rational consumer take to attain equilibrium?',
    options: [
      'Buy less X and more Y',
      'Buy more X and less Y, causing MRSxy to fall until MRSxy = 1.5',
      'Stop consuming because MRSxy exceeds the market exchange rate',
      'Demand an increase in money income M from the employer',
    ],
    correctIndex: 1,
    explanation: 'Since MRSxy (3) > Px/Py (1.5), the consumer subjectively values an extra unit of X at 3 units of Y, but the market only demands 1.5 units of Y. The consumer gains by buying more X. As X increases, DMRS forces MRSxy down until it equates with 1.5.',
    hints: [
      'The consumer is willing to give up 3 Y for 1 X, but the market only charges 1.5 Y.',
      'X is a bargain for the consumer! So the consumer should buy more X.',
      'By Diminishing MRS, buying more X reduces MRSxy until it reaches 1.5.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_ECON_017,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'What is the shape of the demand curve when price elasticity of demand |Ed| = 1 (Unitary Elastic)?',
    options: [
      'Horizontal straight line',
      'Vertical straight line',
      'Rectangular hyperbola (P × Q = constant)',
      'Downward straight line with a constant 45° slope everywhere',
    ],
    correctIndex: 2,
    explanation: 'When |Ed| = 1 everywhere, total expenditure P × Q is constant at all price levels. Graphically, this locus forms a rectangular hyperbola.',
    hints: [
      'Unitary elasticity means percentage change in quantity matches percentage change in price.',
      'Total outlay (P × Q) remains constant.',
      'The geometric curve where area under every point (P × Q) is equal is a rectangular hyperbola.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_ECON_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Price of onions in Delhi mandi rises from ₹40 to ₹50/kg (ΔP = +10). Quantity demanded falls from 100 kg to 80 kg (ΔQ = -20). Using ISC initial base convention, compute |Ed|.',
    correctAnswer: 0.8,
    tolerance: 0.05,
    unit: '|Ed|',
    explanation: '%ΔP = (10/40) × 100 = 25%. %ΔQ = (-20/100) × 100 = -20%. Ed = -20% / 25% = -0.80. Thus |Ed| = 0.80 (Inelastic demand).',
    hints: [
      'ISC convention uses the ORIGINAL base: P = 40, Q = 100.',
      '%ΔP = (50 - 40)/40 = +25%; %ΔQ = (80 - 100)/100 = -20%.',
      '|Ed| = |-20% / 25%| = 0.80.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_ECON_018,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the methodological steps for calculating and interpreting Price Elasticity of Demand under the ISC Percentage Method.',
    sortItems: [
      'Identify initial base values (P, Q) and changes (ΔP, ΔQ)',
      'Calculate %ΔP = (ΔP/P)×100 and %ΔQ = (ΔQ/Q)×100',
      'Compute Ed = %ΔQ / %ΔP = (ΔQ/ΔP) × (P/Q)',
      'Take absolute magnitude |Ed| and classify degree (elastic/inelastic/unitary)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First extract original base values (not final values), calculate proportionate percentage changes, compute the quotient Ed, and finally take |Ed| to classify elasticity.',
    hints: [
      'Start by identifying initial P and Q from the problem text.',
      'Next convert absolute differences to percentage changes.',
      'Divide %ΔQ by %ΔP and interpret the absolute magnitude.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_ECON_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A chai stall in Pune cuts tea price from ₹10 to ₹8. Daily quantity sold surges from 100 to 150 cups. What is the elasticity of demand under Marshall\'s Expenditure Method?',
    options: [
      'Inelastic (|Ed| < 1)',
      'Unitary (|Ed| = 1)',
      'Elastic (|Ed| > 1)',
      'Perfectively Inelastic (|Ed| = 0)',
    ],
    correctIndex: 2,
    explanation: 'Initial Total Outlay = 10 × 100 = ₹1,000. New Total Outlay = 8 × 150 = ₹1,200. When Price FALLS and Total Expenditure RISES, demand is ELASTIC (|Ed| > 1) because the quantity surge outweighs the price cut.',
    hints: [
      'Calculate TE before: ₹10 × 100 = ₹1,000.',
      'Calculate TE after: ₹8 × 150 = ₹1,200.',
      'Price fell and Total Expenditure rose → Quantity effect dominates → Elastic.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_ECON_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Electricity tariff in Mumbai rises from ₹6/unit to ₹8/unit. Total expenditure of a household rises from ₹1,800 to ₹2,000. A student claims demand is elastic because TE rose. Evaluate this claim.',
    options: [
      'Student is correct — any rise in TE indicates elastic demand',
      'Student is incorrect — when Price RISES and TE RISES, demand is INELASTIC (|Ed| < 1)',
      'Student is correct because electricity is a luxury good',
      'Student is incorrect because electricity demand is perfectly elastic',
    ],
    correctIndex: 1,
    explanation: 'The classic "half-rule trap": When price RISES, a rise in Total Expenditure proves consumers were unable to cut back consumption significantly (price effect dominates), so demand is INELASTIC (|Ed| < 1).',
    hints: [
      'Always anchor the direction of TE to the direction of Price change!',
      'When price goes UP and consumers spend MORE, they are trapped with the good.',
      'Price Rise + TE Rise = Inelastic (|Ed| < 1).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C12_ECON_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'On a downward sloping linear demand curve AB (A on Y-axis, B on X-axis), what is the formula for elasticity at point P using the Geometric Method?',
    options: [
      'Ed = Upper Segment / Lower Segment = PA / PB',
      'Ed = Lower Segment / Upper Segment = PB / PA',
      'Ed = (PA + PB) / 2',
      'Ed = Slope of AB × 100',
    ],
    correctIndex: 1,
    explanation: 'Marshall\'s Geometric Method states: Point Elasticity Ed = (Lower Segment) / (Upper Segment) = PB / PA. At the midpoint M, MB = MA so Ed = 1.',
    hints: [
      'Remember: "Lower is the Numerator".',
      'Higher points on the curve have a longer lower segment, making Ed > 1.',
      'Formula is Lower Segment PB divided by Upper Segment PA.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C12_ECON_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A linear demand curve has Y-intercept at P = ₹20 and X-intercept at Q = 80 units. What is the value of Ed at the point where quantity Q = 20 units?',
    correctAnswer: 3,
    tolerance: 0.1,
    unit: 'Ed',
    explanation: 'At Q = 20, the upper segment along the horizontal axis is 20 units (from 0 to 20), and the lower segment is 60 units (from 20 to 80). Ed = Lower / Upper = 60 / 20 = 3.0 (Elastic zone).',
    hints: [
      'Upper segment PA spans from Q = 0 to Q = 20 (length = 20).',
      'Lower segment PB spans from Q = 20 to Q = 80 (length = 60).',
      'Ed = Lower / Upper = 60 / 20 = 3.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C12_ECON_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A rural household has ₹500 budget. Rice is ₹50/kg, Dal is ₹120/kg. Household buys 5 kg rice (₹250) and 2 kg dal (₹240). Total utility from 5kg rice is 300 utils, from 2kg dal is 210 utils. What is the Total Utility (TU) in utils?',
    correctAnswer: 510,
    tolerance: 1,
    unit: 'utils',
    explanation: 'Total Utility = TU_rice + TU_dal = 300 + 210 = 510 utils. Expenditure = 5×50 + 2×120 = 250 + 240 = ₹490 (optimal discrete allocation under ₹500 budget).',
    hints: [
      'Add the total utility obtained from rice to the total utility obtained from dal.',
      '300 utils (from rice) + 210 utils (from dal).',
      '300 + 210 = 510 utils.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_ECON_012,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the symbolic joint condition of Consumer Equilibrium for Goods X and Y with Money Income M.',
    availableParts: ['MUx/Px', '=', 'MUy/Py', '=', 'MUm', 'and', 'Px·X', '+', 'Py·Y', '=', 'M'],
    targetState: 'MUx/Px = MUy/Py = MUm and Px·X + Py·Y = M',
    validationHint: 'Assemble: Equimarginal equality with MUm, followed by "and", followed by the budget constraint equation.',
    explanation: 'Consumer Equilibrium in cardinal analysis strictly requires both the equimarginal condition MUx/Px = MUy/Py = MUm AND the budget exhaustion condition Px·X + Py·Y = M.',
    hints: [
      'First part: MUx/Px = MUy/Py = MUm',
      'Connector: and',
      'Second part: Px·X + Py·Y = M',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C12_ECON_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The Government of India levies substantial excise duties on petrol & diesel (|Ed| ≈ 0.4). Applying the Ramsey Inverse Elasticity rule, why is this economically efficient yet socially regressive?',
    options: [
      'It causes huge deadweight loss because consumers stop driving completely',
      'Inelastic demand ensures high, stable tax revenue with low distortion, but burdens lower-income commuters who lack public transit',
      'It reduces total government revenue because drivers switch en masse to electric helicopters',
      'It makes petrol demand perfectly elastic in the long run',
    ],
    correctIndex: 1,
    explanation: 'Taxing inelastic goods (|Ed| < 1) minimises deadweight distortion and secures steady revenue because consumption persists. However, it is regressive because energy takes a large share of lower-income household budgets.',
    hints: [
      'Think about what happens to tax revenue when quantity demanded does not drop much.',
      'Inelastic demand = stable tax base.',
      'Regressive impact = lower-income citizens spend a larger percentage of their salary on fuel.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_ECON_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does elasticity vary from ∞ to 0 along a straight-line demand curve even though its geometric slope (ΔP/ΔQ) is constant?',
    options: [
      'Because the price of related substitute goods changes at every point',
      'Because Ed = (1/Slope) × (P/Q), and the price-to-quantity ratio (P/Q) falls continuously from top to bottom',
      'Because the consumer becomes irrational at the lower end of the curve',
      'Because Marshall\'s law breaks down on straight lines',
    ],
    correctIndex: 1,
    explanation: 'Elasticity is a percentage measure: Ed = (ΔQ/ΔP) × (P/Q). While (ΔQ/ΔP) is constant on a straight line, P falls and Q rises as you move downward, causing the scaling factor (P/Q) to decline monotonically from ∞ to 0.',
    hints: [
      'Slope is absolute change ΔP/ΔQ.',
      'Elasticity scales the inverse slope by the ratio of current Price to current Quantity (P/Q).',
      'At high prices, P/Q is huge; near the X-axis, P is near 0 so P/Q is tiny.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_20',
    nodeId: NODE_C12_ECON_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'When PM Ujjwala LPG refill prices rose from ₹500 to ₹900 per cylinder for rural households (firewood cost = ₹0), what graphical shift occurred in their budget space?',
    options: [
      'Parallel outward shift of the entire budget line',
      'Parallel inward shift of the entire budget line',
      'Inward pivot of the budget line on the LPG axis, leaving the firewood intercept fixed',
      'Outward pivot on the firewood axis',
    ],
    correctIndex: 2,
    explanation: 'A price hike in one good (LPG) reduces only its maximum affordable quantity (M/P_lpg). The Y-intercept (firewood) remains unchanged because its price and income M are constant, causing an inward pivot on the LPG axis.',
    hints: [
      'Only the price of LPG changed; the other good\'s price and income remained identical.',
      'An individual good\'s price hike shrinks that specific axis intercept.',
      'This creates an inward rotation (pivot) anchored at the other good\'s intercept.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C12_ECON_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If two goods are Perfect Substitutes (e.g., two identical brands of table salt with constant MRS = 1), what is the nature of the Consumer Equilibrium?',
    options: [
      'A smooth interior tangency point where IC touches the budget line in the middle',
      'A Corner Solution where the consumer spends 100% of income on whichever brand is cheaper per unit',
      'Equilibrium is mathematically impossible',
      'The consumer buys equal quantities of both brands regardless of price',
    ],
    correctIndex: 1,
    explanation: 'For perfect substitutes, indifference curves are straight lines. Unless the budget line slope happens to match MRS exactly, the consumer reaches the highest IC at a corner (spending everything on the cheaper brand).',
    hints: [
      'Indifference curves for perfect substitutes are straight lines, not convex curves.',
      'A straight IC hits a straight budget line at the extreme axis intercept.',
      'The consumer will buy only the brand that gives the lower market price (Corner Solution).',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C12_ECON_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'As a firm lowers its product price continuously from the prohibitive price (where Q=0) to zero, what pattern does its Total Revenue / Consumer Total Expenditure trace?',
    options: [
      'Continuously falls from maximum to zero',
      'Traces an inverted-U curve: rises in the elastic zone (|Ed|>1), reaches maximum at unitary point (|Ed|=1), and falls in the inelastic zone (|Ed|<1)',
      'Remains constant throughout because demand is linear',
      'Rises exponentially without bound',
    ],
    correctIndex: 1,
    explanation: 'Total Expenditure P×Q starts at 0 (when Q=0), increases as price falls through the elastic region (|Ed|>1), peaks at the midpoint where |Ed|=1 (MR=0), and declines toward 0 as price falls through the inelastic region (|Ed|<1).',
    hints: [
      'When demand is elastic, price cuts raise total revenue.',
      'When demand is inelastic, price cuts reduce total revenue.',
      'This creates an inverted-U curve peaking at the unitary elasticity midpoint.',
    ],
  },
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Cardinal Lab: The Equimarginal Principle',
    instruction: 'Adjust the price and quantity sliders for Rice & Dal. Observe how MU/P changes and balances out.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_011,
  },
  {
    title: 'Ordinal Lab: Indifference Curve & Diminishing MRS',
    instruction: 'Move along the Indifference Curve. Watch how MRSxy = |ΔY/ΔX| gets flatter (Diminishing MRS).',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_014,
  },
  {
    title: 'Budget Space: Shifts vs Pivots',
    instruction: 'Manipulate Income M vs Price Px to visually see parallel shifts versus axis pivots.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_015,
  },
  {
    title: 'Consumer Equilibrium Tangency',
    instruction: 'Slide your consumption point to find where the Indifference Curve is tangent to the Budget Line (MRS = Px/Py).',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_016,
  },
  {
    title: 'Elasticity Master Lab: 3 Methods',
    instruction: 'Drag the price marker on the linear demand curve. Compare Percentage, Expenditure, and Geometric elasticity simultaneously!',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_020,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Tata Salt raises its price from ₹25 to ₹28 (+12%), what will happen to Total Consumer Expenditure on salt?',
    options: [
      'Total expenditure will fall drastically',
      'Total expenditure will RISE because salt is a strict necessity with inelastic demand (|Ed| < 1)',
      'Total expenditure will drop to zero',
      'Total expenditure will remain exactly unchanged',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in the Elasticity Lab: when price rises on an inelastic good, TE moves with the price and rises!',
    nodeId: NODE_C12_ECON_019,
  },
  {
    question: 'Predict: At the exact midpoint of a linear demand curve, what is the value of Price Elasticity of Demand (Ed)?',
    options: [
      'Ed = 0 (Perfect Inelasticity)',
      'Ed = ∞ (Perfect Elasticity)',
      'Ed = 1 (Unitary Elasticity, Lower Segment = Upper Segment)',
      'Ed = 0.5',
    ],
    correctIndex: 2,
    verifyInstruction: 'Check the Geometric Method segment ratio: at midpoint M, PB / PA = 1.0!',
    nodeId: NODE_C12_ECON_020,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the slope of the Indifference Curve as you consume more Tea (X) and give up Biscuits (Y)?',
    observableOptions: [
      'The curve becomes progressively flatter (diminishing MRSxy)',
      'The curve becomes steeper',
      'The curve turns into a straight 45-degree line',
      'The curve bends upwards towards the ceiling',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ECON_014,
  },
  {
    question: 'In the Expenditure Method, what happens to Total Expenditure when you lower the price in the ELASTIC region (|Ed| > 1)?',
    observableOptions: [
      'Total Expenditure falls',
      'Total Expenditure rises because the percentage increase in quantity demanded exceeds the percentage drop in price',
      'Total Expenditure is zero',
      'Total Expenditure fluctuates randomly',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ECON_019,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Pricing Strategist: Indian Railways & FMCG Analysis',
  description: 'Apply your elasticity and consumer equilibrium knowledge to real Indian economic challenges.',
  steps: [
    'Analyze Vande Bharat vs Sleeper Class fares: classify their price elasticities and recommend optimal surge pricing limits.',
    'Formulate a rural PDS bundle optimization: verify how ₹3/kg rice alters consumer MRS relative to open-market pulses.',
    'Audit a local FMCG brand (e.g. Amul Butter): calculate how a 5% price revision impacts total retail outlay.',
    'Present your findings to your economics peer group or teacher.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_ECON_011,
  title: "Law of Equimarginal Utility & Consumer's Equilibrium",
  definition: 'The Law of Equimarginal Utility states that a rational consumer allocates money expenditure such that marginal utility per rupee is equal across all goods (MUx/Px = MUy/Py = MUm) subject to the budget constraint.',
  eli5: 'Spend your next rupee on whichever item gives you the highest happiness per rupee spent. Keep balancing until every rupee spent gives equal satisfaction!',
  misconceptions: [
    {
      misconception: 'Equilibrium is where raw MUx = MUy without dividing by prices.',
      correction: 'Goods have different prices! You must divide by price: MUx/Px = MUy/Py = MUm.',
    },
    {
      misconception: 'An indifference curve can be concave or a straight line for normal goods.',
      correction: 'Standard indifference curves are strictly convex to the origin due to Diminishing MRS.',
    },
    {
      misconception: 'A steep demand curve is elastic because it stretches tall.',
      correction: 'Steep means stubborn/inelastic (quantity barely changes). Flat means flexible/elastic.',
    },
    {
      misconception: 'If total expenditure rises when price rises, demand is elastic.',
      correction: 'When price rises and spending rises, consumers are trapped with the good: demand is INELASTIC.',
    },
    {
      misconception: 'Geometric method formula is Upper Segment / Lower Segment.',
      correction: 'The formula is Lower Segment / Upper Segment (PB / PA). Lower is the numerator!',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the cardinal equilibrium condition for two goods?',
      options: ['MUx = MUy', 'MUx/Px = MUy/Py = MUm', 'TUx = TUy', 'Px = Py'],
      correctIndex: 1,
    },
    {
      question: 'What causes the convexity of an indifference curve?',
      options: ['Constant MRS', 'Diminishing MRS', 'Increasing MRS', 'Zero MRS'],
      correctIndex: 1,
    },
    {
      question: 'What does the slope of the budget line represent?',
      options: ['Income M', 'Ratio of prices -Px/Py', 'Total utility', 'Marginal utility of money'],
      correctIndex: 1,
    },
    {
      question: 'At the point of ordinal consumer equilibrium, which condition holds?',
      options: ['MRSxy = Px/Py and budget is spent', 'MRSxy > Px/Py', 'IC cuts budget line at two points', 'MRSxy = 0'],
      correctIndex: 0,
    },
    {
      question: 'If |Ed| = 0, what is the shape of the demand curve?',
      options: ['Horizontal', 'Vertical', 'Rectangular hyperbola', 'Upward sloping'],
      correctIndex: 1,
    },
    {
      question: 'Under the percentage method, which base must be used per ISC convention?',
      options: ['Final price & quantity', 'Average of initial and final', 'Original (initial) price & quantity', 'Arbitrary base'],
      correctIndex: 2,
    },
    {
      question: 'If price falls and Total Expenditure rises, demand is:',
      options: ['Elastic (|Ed| > 1)', 'Inelastic (|Ed| < 1)', 'Unitary (|Ed| = 1)', 'Zero'],
      correctIndex: 0,
    },
    {
      question: 'What is the value of Ed at the midpoint of a linear demand curve?',
      options: ['0', '0.5', '1 (Unitary)', '∞'],
      correctIndex: 2,
    },
  ],
  masteryCriteria: 'Demonstrate rigorous understanding of Equimarginal Utility schedules, IC tangency conditions, and all 3 Elasticity measurement methods.',
};

export function C12_EconomicsEquimarginalUtilityStatementSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_ECON_011,
  title = DEFAULT_PROPS.title || "Consumer Equilibrium & Elasticity of Demand",
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox Sliders
  const [riceQty, setRiceQty] = useState(4); // kg
  const [dalQty, setDalQty] = useState(2); // kg
  const [ricePrice, setRicePrice] = useState(50); // ₹/kg
  const [dalPrice, setDalPrice] = useState(120); // ₹/kg
  const [consumerIncome, setConsumerIncome] = useState(1000); // ₹
  const [goodXPrice, setGoodXPrice] = useState(50); // Px ₹
  const [goodYPrice, setGoodYPrice] = useState(40); // Py ₹
  const [icXPos, setIcXPos] = useState(6); // current consumption on IC
  const [simDemandPrice, setSimDemandPrice] = useState(6); // Price on linear demand curve (0 to 12)
  const [activeTab, setActiveTab] = useState<'cardinal' | 'ordinal' | 'budget' | 'equilibrium' | 'elasticity'>('cardinal');

  // Challenge Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection State
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Persistent BKT & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED LIVE ECONOMIC CALCULATIONS ───
  const muRice = useMemo(() => Math.max(10, 120 - riceQty * 18), [riceQty]);
  const muDal = useMemo(() => Math.max(15, 160 - dalQty * 35), [dalQty]);
  const muPerRupeeRice = useMemo(() => Number((muRice / ricePrice).toFixed(2)), [muRice, ricePrice]);
  const muPerRupeeDal = useMemo(() => Number((muDal / dalPrice).toFixed(2)), [muDal, dalPrice]);
  const totalExpenditureCardinal = useMemo(() => riceQty * ricePrice + dalQty * dalPrice, [riceQty, ricePrice, dalQty, dalPrice]);

  const icYPos = useMemo(() => Number((40 / Math.max(1, icXPos)).toFixed(1)), [icXPos]);
  const mrsValue = useMemo(() => Number((40 / Math.pow(Math.max(1, icXPos), 2)).toFixed(2)), [icXPos]);

  const xIntercept = useMemo(() => Number((consumerIncome / goodXPrice).toFixed(1)), [consumerIncome, goodXPrice]);
  const yIntercept = useMemo(() => Number((consumerIncome / goodYPrice).toFixed(1)), [consumerIncome, goodYPrice]);
  const budgetSlope = useMemo(() => Number((goodXPrice / goodYPrice).toFixed(2)), [goodXPrice, goodYPrice]);

  const simDemandQty = useMemo(() => Math.max(0, 12 - simDemandPrice), [simDemandPrice]);
  const simTotalExp = useMemo(() => simDemandPrice * simDemandQty, [simDemandPrice, simDemandQty]);
  const simLowerSegment = useMemo(() => simDemandQty, [simDemandQty]);
  const simUpperSegment = useMemo(() => 12 - simDemandQty, [simDemandQty]);
  const simGeometricEd = useMemo(() => {
    if (simUpperSegment <= 0) return 999;
    return Number((simLowerSegment / simUpperSegment).toFixed(2));
  }, [simLowerSegment, simUpperSegment]);

  const elasticityOutlayChartData = useMemo(() => {
    const data = [];
    for (let p = 0; p <= 12; p += 1) {
      const q = 12 - p;
      const te = p * q;
      const ed = p === 12 ? 999 : p === 0 ? 0 : Number(((12 - p) / p).toFixed(2));
      data.push({ price: p, quantity: q, totalExpenditure: te, elasticity: ed });
    }
    return data;
  }, []);

  const motivationalFeedback = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  const srsInterval = useMemo(() => {
    if (errors === 0) return 'review in 7 days';
    if (errors <= 3) return 'review in 3 days';
    return 'review in 1 day';
  }, [errors]);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

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

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#312e81');
      grad.addColorStop(1, '#065f46');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const diff = Math.abs(muPerRupeeRice - muPerRupeeDal);
      const isBalanced = diff < 0.15;
      const centerX = canvas.width / 2;
      const tilt = Math.max(-40, Math.min(40, (muPerRupeeRice - muPerRupeeDal) * 25));

      ctx.save();
      ctx.translate(centerX, canvas.height / 2);
      ctx.rotate((tilt * Math.PI) / 180);

      ctx.strokeStyle = isBalanced ? '#34d399' : '#f87171';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-100, 0);
      ctx.lineTo(100, 0);
      ctx.stroke();

      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(-100, 10, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(100, 10, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillStyle = isBalanced ? '#a7f3d0' : '#fecdd3';
      ctx.textAlign = 'center';
      const statusText = isBalanced
        ? '✓ EQUIMARGINAL EQUILIBRIUM: MUx/Px ≈ MUy/Py'
        : `REALLOCATE: ${muPerRupeeRice > muPerRupeeDal ? 'Buy More Rice →' : '← Buy More Dal'}`;
      ctx.fillText(statusText, centerX, canvas.height - 6);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [muPerRupeeRice, muPerRupeeDal]);

  useEffect(() => {
    if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        showNextHint();
      }, 10000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, hintCount, answerRevealed]);

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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Brilliant intuition! You got it right.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Touch and discover!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test any scenario freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now test your mastery on CISCE board scenarios!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now verify it in the lab.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const correct = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Sharp observation! That is Diminishing MRS.' : 'Observe the curve curvature again.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Simulation complete. Final score: ${finalScore}%`);
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

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding economics analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete step-by-step breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, showNextHint, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
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
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <motion.span whileHover={{ rotate: 10 }} className="text-3xl p-2 bg-indigo-900/40 border border-indigo-700/60 rounded-2xl">{subjectConfig.emoji}</motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">ISC Class 12 Economics</span>
              <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full">✓ NEP 2020 Aligned</motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 text-xs font-bold rounded-full border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                  : 'bg-indigo-950/80 text-indigo-300 border-indigo-600'
              }`}
            >
              TIER: {difficulty.toUpperCase()}
            </motion.span>
          )}
          <motion.span whileHover={{ scale: 1.05 }} className="text-xs font-medium text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            Phase: <span className="text-white capitalize font-bold">{phase}</span>
          </motion.span>
        </div>
      </motion.div>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 space-y-6">
          <motion.div whileHover={{ scale: 1.01 }} className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-200/70 mt-2 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/50">{SCENARIO.context}</p>
          </motion.div>

          <motion.div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <span>💡</span> Curiosity Discovery Hook:
            </div>
            <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Discovery option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-indigo-900/40 border border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 font-bold mr-1">✗ </span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! You intuitively evaluated Marginal Utility per Rupee!' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter interactive discovery labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ──��� EXPLORE PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 space-y-5">
          <motion.div whileHover={{ scale: 1.01 }} className="flex justify-between items-center bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">
              Lab Step <span className="text-indigo-400 font-bold">{currentSlide + 1}</span> of {EXPLORATION_STEPS.length}
            </span>
            <span className="text-slate-400 font-mono">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-lg font-black text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-xs font-semibold mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* STEP 0: CARDINAL EQUIMARGINAL UTILITY */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <canvas ref={canvasRef} width={500} height={40} className="w-full rounded-xl border border-slate-800 shadow-inner" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    {/* Rice Controls */}
                    <motion.div whileHover={{ scale: 1.01 }} className="space-y-2 p-3 bg-slate-900/80 rounded-lg border border-blue-900/40">
                      <div className="flex justify-between text-xs font-bold text-blue-400">
                        <span>Good X: Rice (P = ₹{ricePrice}/kg)</span>
                        <span>Qty: {riceQty} kg</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Rice quantity in kilograms"
                        min={1}
                        max={6}
                        value={riceQty}
                        onChange={e => setRiceQty(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-slate-300">
                        <span>MUx: {muRice} utils</span>
                        <span className="font-bold text-blue-300">MUx / Px = {muPerRupeeRice} utils/₹</span>
                      </div>
                    </motion.div>

                    {/* Dal Controls */}
                    <motion.div whileHover={{ scale: 1.01 }} className="space-y-2 p-3 bg-slate-900/80 rounded-lg border border-amber-900/40">
                      <div className="flex justify-between text-xs font-bold text-amber-400">
                        <span>Good Y: Dal (P = ₹{dalPrice}/kg)</span>
                        <span>Qty: {dalQty} kg</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Dal quantity in kilograms"
                        min={1}
                        max={4}
                        value={dalQty}
                        onChange={e => setDalQty(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-slate-300">
                        <span>MUy: {muDal} utils</span>
                        <span className="font-bold text-amber-300">MUy / Py = {muPerRupeeDal} utils/₹</span>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-indigo-950/40 border border-indigo-800/50 rounded-xl flex flex-wrap justify-between items-center text-xs">
                    <span>Total Outlay: <strong className="text-white">₹{totalExpenditureCardinal}</strong> (Budget ₹500)</span>
                    <span className="text-slate-300">
                      Equimarginal Condition: <strong className={Math.abs(muPerRupeeRice - muPerRupeeDal) < 0.15 ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                        {Math.abs(muPerRupeeRice - muPerRupeeDal) < 0.15 ? '✓ MUx/Px ≈ MUy/Py (EQUILIBRIUM)' : `✗ MUx/Px (${muPerRupeeRice}) ≠ MUy/Py (${muPerRupeeDal})`}
                      </strong>
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {/* STEP 1: ORDINAL INDIFFERENCE CURVE & DMRS */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-3">
                      <label className="text-xs font-semibold text-slate-300">Move Consumption Along Indifference Curve (Good X: Tea):</label>
                      <input
                        type="range"
                        aria-label="Consumption of Good X along indifference curve"
                        min={2}
                        max={10}
                        step={0.5}
                        value={icXPos}
                        onChange={e => setIcXPos(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                      <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900 rounded-lg text-xs space-y-1.5 border border-slate-800">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Bundle Coordinates:</span>
                          <span className="text-white font-bold font-mono">({icXPos} Tea, {icYPos} Biscuits)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Slope |ΔY/ΔX| (MRSxy):</span>
                          <span className="text-indigo-400 font-bold font-mono">{mrsValue} biscuits/tea</span>
                        </div>
                        <p className="text-[11px] text-slate-400 italic pt-1">
                          Notice: As Tea accumulates ({icXPos}), MRSxy drops from ~10.0 to ~0.4 (Diminishing MRS).
                        </p>
                      </motion.div>
                    </div>

                    <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center justify-center">
                      <svg viewBox="0 0 300 180" className="w-full h-44">
                        <line x1="30" y1="10" x2="30" y2="150" stroke="#475569" strokeWidth="2" />
                        <line x1="30" y1="150" x2="280" y2="150" stroke="#475569" strokeWidth="2" />
                        <text x="15" y="20" fill="#94a3b8" fontSize="9">Y (Biscuits)</text>
                        <text x="240" y="165" fill="#94a3b8" fontSize="9">X (Tea)</text>
                        <path d="M 45 30 Q 80 110 260 142" fill="none" stroke="#6366f1" strokeWidth="3" />
                        <text x="265" y="140" fill="#818cf8" fontSize="9" fontWeight="bold">IC₁</text>
                        {(() => {
                          const px = 30 + (icXPos / 10) * 220;
                          const py = 150 - (icYPos / 20) * 130;
                          return (
                            <g>
                              <circle cx={px} cy={py} r="6" fill="#f43f5e" className="animate-pulse" />
                              <text x={px + 8} y={py - 5} fill="#fda4af" fontSize="9" fontWeight="bold">
                                MRS={mrsValue}
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    </div>
                  </div>

                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-xl border border-amber-900/50 space-y-2">
                      <p className="text-xs font-bold text-amber-300">Observation Check: {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-left text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: BUDGET SPACE */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">Consumer Income (M): ₹{consumerIncome}</label>
                      <input
                        type="range"
                        aria-label="Consumer Income M"
                        min={600}
                        max={1800}
                        step={100}
                        value={consumerIncome}
                        onChange={e => setConsumerIncome(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">Price of Good X (Px): ₹{goodXPrice}</label>
                      <input
                        type="range"
                        aria-label="Price of Good X"
                        min={25}
                        max={100}
                        step={5}
                        value={goodXPrice}
                        onChange={e => setGoodXPrice(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">Price of Good Y (Py): ₹{goodYPrice}</label>
                      <input
                        type="range"
                        aria-label="Price of Good Y"
                        min={20}
                        max={80}
                        step={5}
                        value={goodYPrice}
                        onChange={e => setGoodYPrice(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-2 text-xs">
                      <motion.div whileHover={{ scale: 1.01 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                        <span className="text-slate-400">X-Intercept (M / Px):</span>
                        <span className="text-white font-bold">{xIntercept} units</span>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.01 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                        <span className="text-slate-400">Y-Intercept (M / Py):</span>
                        <span className="text-white font-bold">{yIntercept} units</span>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.01 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                        <span className="text-slate-400">Budget Line Slope (-Px / Py):</span>
                        <span className="text-indigo-400 font-bold font-mono">-{budgetSlope}</span>
                      </motion.div>
                      <p className="text-[11px] text-emerald-400 font-medium">
                        ✓ Rule: Changing Income M creates a PARALLEL SHIFT. Changing Px causes an AXIS PIVOT.
                      </p>
                    </div>

                    <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 260 160" className="w-full h-40">
                        <line x1="30" y1="10" x2="30" y2="135" stroke="#475569" strokeWidth="2" />
                        <line x1="30" y1="135" x2="240" y2="135" stroke="#475569" strokeWidth="2" />
                        {(() => {
                          const px = Math.min(230, 30 + (xIntercept / 50) * 190);
                          const py = Math.max(15, 135 - (yIntercept / 60) * 115);
                          return (
                            <g>
                              <polygon points={`30,135 30,${py} ${px},135`} fill="rgba(99, 102, 241, 0.15)" />
                              <line x1="30" y1={py} x2={px} y2="135" stroke="#10b981" strokeWidth="3" />
                              <circle cx="30" cy={py} r="4" fill="#34d399" />
                              <circle cx={px} cy="135" r="4" fill="#34d399" />
                              <text x="35" y={py + 10} fill="#6ee7b7" fontSize="8 font-bold">Y_max={yIntercept}</text>
                              <text x={px - 35} y="130" fill="#6ee7b7" fontSize="8 font-bold">X_max={xIntercept}</text>
                            </g>
                          );
                        })()}
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: ORDINAL EQUILIBRIUM TANGENCY */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs text-slate-300">
                      Equilibrium occurs where the highest attainable Indifference Curve is tangent to the Budget Line:
                      <strong className="text-indigo-300 font-mono"> MRSxy = Px / Py</strong>.
                    </p>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 320 180" className="w-full h-44">
                        <line x1="30" y1="10" x2="30" y2="155" stroke="#475569" strokeWidth="2" />
                        <line x1="30" y1="155" x2="300" y2="155" stroke="#475569" strokeWidth="2" />
                        <line x1="30" y1="30" x2="250" y2="155" stroke="#10b981" strokeWidth="2.5" />
                        <text x="255" y="155" fill="#34d399" fontSize="9" fontWeight="bold">B (Budget)</text>
                        <path d="M 45 40 Q 90 125 240 145" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
                        <text x="245" y="145" fill="#94a3b8" fontSize="8">IC₁ (Inferior)</text>
                        <path d="M 60 30 Q 115 105 270 135" fill="none" stroke="#6366f1" strokeWidth="3" />
                        <text x="275" y="135" fill="#a5b4fc" fontSize="9" fontWeight="bold">IC₂ (Optimal)</text>
                        <path d="M 85 20 Q 145 90 295 120" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
                        <text x="285" y="115" fill="#f87171" fontSize="8">IC₃ (Unattainable)</text>
                        <circle cx="128" cy="86" r="5" fill="#f59e0b" className="animate-ping" />
                        <circle cx="128" cy="86" r="4" fill="#f59e0b" />
                        <text x="136" y="84" fill="#fbbf24" fontSize="10" fontWeight="bold">E (MRS = Px/Py)</text>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: ELASTICITY MASTER LAB */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-xl border border-indigo-900/50 space-y-2">
                      <p className="text-xs font-bold text-indigo-300">Predict: {PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-left text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Drag Price Marker (P): ₹{simDemandPrice}</span>
                        <span>Quantity (Q = 12 - P): {simDemandQty} units</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Price on linear demand curve"
                        min={1}
                        max={11}
                        step={0.5}
                        value={simDemandPrice}
                        onChange={e => setSimDemandPrice(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-[10px] text-slate-400">Geometric |Ed|</p>
                          <p className="text-base font-black text-indigo-400">{simGeometricEd}</p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-[10px] text-slate-400">Total Outlay (P×Q)</p>
                          <p className="text-base font-black text-emerald-400">₹{simTotalExp}</p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-[10px] text-slate-400">Zone</p>
                          <p className={`text-xs font-bold mt-1 ${simGeometricEd > 1 ? 'text-blue-400' : simGeometricEd < 1 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {simGeometricEd > 1 ? 'ELASTIC' : simGeometricEd < 1 ? 'INELASTIC' : 'UNITARY'}
                          </p>
                        </motion.div>
                      </div>
                    </div>

                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={elasticityOutlayChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="price" stroke="#94a3b8" fontSize={10} label={{ value: 'Price (₹)', position: 'insideBottom', offset: -4, fontSize: 9, fill: '#94a3b8' }} />
                          <YAxis stroke="#94a3b8" fontSize={10} label={{ value: 'TE (₹)', angle: -90, position: 'insideLeft', fontSize: 9, fill: '#94a3b8' }} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Line type="monotone" dataKey="totalExpenditure" stroke="#10b981" strokeWidth={2} dot={false} />
                          <ReferenceLine x={simDemandPrice} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: `P=₹${simDemandPrice}`, fill: '#f43f5e', fontSize: 10 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-800">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Free Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-emerald-400">🎮 Free Interactive Economics Sandbox</h2>
              <span className="text-xs text-slate-400">Zero pressure • Test all economic hypotheses</span>
            </div>

            {/* Sandbox Tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-b border-slate-800 pb-3">
              {(['cardinal', 'ordinal', 'budget', 'elasticity'] as const).map(tab => (
                <motion.button
                  key={tab}
                  aria-label={`${tab} simulator tab`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {tab} Simulator
                </motion.button>
              ))}
            </div>

            {/* Dynamic Sandbox View with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[220px]"
              >
                {activeTab === 'cardinal' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-300">Set quantities and price ratios for Rice and Dal to see how rupees rebalance:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-blue-400">Rice Qty: {riceQty} kg (Price: ₹{ricePrice}/kg)</label>
                        <input
                          type="range"
                          aria-label="Sandbox Rice Quantity"
                          min={1}
                          max={8}
                          value={riceQty}
                          onChange={e => setRiceQty(Number(e.target.value))}
                          className="w-full accent-blue-500 cursor-pointer"
                        />
                        <div className="text-xs text-slate-400">MU/P = {muPerRupeeRice} utils/₹</div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-amber-400">Dal Qty: {dalQty} kg (Price: ₹{dalPrice}/kg)</label>
                        <input
                          type="range"
                          aria-label="Sandbox Dal Quantity"
                          min={1}
                          max={5}
                          value={dalQty}
                          onChange={e => setDalQty(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="text-xs text-slate-400">MU/P = {muPerRupeeDal} utils/₹</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ordinal' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300">Explore Diminishing MRS on the tea-biscuit curve:</p>
                    <input
                      type="range"
                      aria-label="Sandbox Indifference Curve X Position"
                      min={1}
                      max={10}
                      step={0.2}
                      value={icXPos}
                      onChange={e => setIcXPos(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                    <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-indigo-300">
                      Current Point: ({icXPos} Tea, {icYPos} Biscuits) | MRSxy = {mrsValue} biscuits per tea
                    </div>
                  </div>
                )}

                {activeTab === 'budget' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300">Test how varying Income M vs Price Px manipulates the budget boundary:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="range"
                        aria-label="Sandbox Consumer Income"
                        min={500}
                        max={2500}
                        step={100}
                        value={consumerIncome}
                        onChange={e => setConsumerIncome(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <input
                        type="range"
                        aria-label="Sandbox Price of Good X"
                        min={20}
                        max={100}
                        step={5}
                        value={goodXPrice}
                        onChange={e => setGoodXPrice(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>
                    <div className="text-xs text-slate-300">X-intercept = {xIntercept} units | Y-intercept = {yIntercept} units | Slope = -{budgetSlope}</div>
                  </div>
                )}

                {activeTab === 'elasticity' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300">Linear Demand Curve AB (Price 0 to 12):</p>
                    <input
                      type="range"
                      aria-label="Sandbox Linear Demand Curve Price"
                      min={0.5}
                      max={11.5}
                      step={0.5}
                      value={simDemandPrice}
                      onChange={e => setSimDemandPrice(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                    <div className="text-xs text-slate-300 flex justify-between">
                      <span>Price: ₹{simDemandPrice}</span>
                      <span>Quantity: {simDemandQty}</span>
                      <span>Total Exp: ₹{simTotalExp}</span>
                      <span className="font-bold text-indigo-400">|Ed| = {simGeometricEd}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              aria-label="Proceed to CISCE Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg"
            >
              I Am Ready for CISCE Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 space-y-5">
          {/* Progress & Metadata Bar */}
          <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">
                Challenge <span className="text-white font-bold">{currentChallenge + 1}</span> of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-mono text-[11px]">NEP: {challenge.competencyLevel.toUpperCase()}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'border-rose-500 bg-rose-950/30' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 rounded-md border border-slate-700">
                {challenge.type}
              </motion.span>
              <span className="text-xs text-slate-400 font-mono">{challenge.nodeId}</span>
            </div>

            <p className="text-base md:text-lg text-white font-semibold leading-relaxed mb-6">
              {challenge.question}
            </p>

            {/* MCQ & Distinguish & Classify & Match */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                        : wrongFlash
                        ? 'bg-rose-950/40 border border-rose-800/80 text-rose-200'
                        : 'bg-slate-800/80 hover:bg-indigo-950/50 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-3 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                    {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable formula ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'box_cardinal_foc', title: 'Cardinal 1st-Order Condition' },
                    { id: 'box_budget', title: 'Budget Exhaustion Condition' },
                    { id: 'box_ordinal_foc', title: 'Ordinal Tangency Condition' },
                    { id: 'box_soc', title: 'Second-Order Convexity Condition' },
                  ].map(target => (
                    <motion.div
                      key={target.id}
                      whileHover={{ scale: 1.01 }}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 space-y-2 min-h-[80px]"
                    >
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{target.title}</p>
                      <div className="p-2 bg-slate-900 rounded-lg text-xs font-mono font-bold text-emerald-300">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : <span className="text-slate-600">Drag matching formula here...</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Submit Formula Match"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Formula Match
                </motion.button>
              </div>
            )}

            {/* Drag-sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 italic">Drag items to rearrange into proper sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl text-xs font-medium text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 flex items-center justify-center bg-indigo-900 text-indigo-300 font-bold rounded-md">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Check Sequence Order"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Numerical answer input"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 w-60"
                  />
                  <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Verify numerical answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-50"
                  >
                    Verify Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add token ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-900/60 hover:bg-indigo-700 border border-indigo-700 text-indigo-200 text-xs font-mono font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span key={i} whileHover={{ scale: 1.05 }} className="px-2.5 py-1 bg-indigo-700 text-white font-mono text-xs rounded-md flex items-center gap-1.5">
                      {part}
                      <motion.button
                        aria-label={`Remove token ${part}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 font-bold hover:text-white"
                      >
                        ✕
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click tokens above to construct the joint condition</span>}
                </motion.div>

                <div className="flex gap-2">
                  <motion.button
                    aria-label="Check construction"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check Construction
                  </motion.button>
                  <motion.button
                    aria-label="Clear constructed tokens"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setConstructParts([])}
                    className="px-3 py-2 bg-slate-800 text-slate-400 text-xs rounded-xl hover:text-white"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            )}

            {/* Click-to-Reveal Step-by-Step Progressive Disclosure */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Step-by-Step Examiner Explanation:</p>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-200 leading-relaxed">
                    <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Show next proof step"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Proof Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment' : 'Next Challenge'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <motion.div whileHover={{ scale: 1.01 }} className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/60 shadow-2xl space-y-4 text-center">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl font-black text-white">ISC Economics Simulation Mastery Attained!</h2>
            <div className="flex justify-center gap-6 text-sm">
              <motion.span whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                Score: <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                Mastery Level: <strong className="text-indigo-400 text-lg capitalize">{masteryLevel}</strong>
              </motion.span>
            </div>
          </motion.div>

          {/* MOTIVATIONAL FEEDBACK */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 border rounded-2xl ${
              errors === 0
                ? 'bg-emerald-950/50 border-emerald-500/80'
                : errors <= 3
                ? 'bg-blue-950/50 border-blue-500/80'
                : errors <= 7
                ? 'bg-amber-950/50 border-amber-500/80'
                : 'bg-rose-950/50 border-rose-500/80'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">
                {errors === 0 ? '🌟' : errors <= 3 ? '👏' : errors <= 7 ? '👍' : '💪'}
              </span>
              <h3 className="text-base font-black text-white">
                {motivationalFeedback}
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {errors === 0 && 'Flawless analysis across cardinal utility, ordinal indifference curve tangencies, and elasticity measurements!'}
              {errors >= 1 && errors <= 3 && 'Solid understanding across all modules! A few quick reviews will guarantee full marks on board exams.'}
              {errors >= 4 && errors <= 7 && 'Good groundwork established. Keep practicing budget line pivots and the 3 elasticity formulas.'}
              {errors >= 8 && 'Stay persistent! Economics intuition takes repetition. Review the step-by-step guides and test again.'}
            </p>
          </motion.div>

          {/* SPACED REPETITION VISIBILITY */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="p-5 bg-indigo-950/40 border border-indigo-800/50 rounded-2xl flex items-center justify-between text-xs"
          >
            <div>
              <p className="font-bold text-indigo-300 flex items-center gap-1.5">
                <span>📅</span> SM-2 Spaced Repetition Schedule
              </p>
              <p className="text-slate-300 mt-1">
                To maximize long-term CISCE retention, your recommended schedule is: <span className="text-emerald-400 font-bold uppercase">{srsInterval}</span> ({errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}).
              </p>
            </div>
            <span className="text-2xl">🧠</span>
          </motion.div>

          {/* REFLECTION SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <span>✍️</span> Student Reflection
            </h3>

            <div className="space-y-3 text-xs">
              <motion.div whileHover={{ scale: 1.005 }} className="space-y-1">
                <label className="text-slate-300 font-semibold">1. What was the most surprising thing you learned?</label>
                <input
                  type="text"
                  aria-label="What was the most surprising thing you learned?"
                  placeholder="e.g., How Total Expenditure actually drops when price cuts hit inelastic goods..."
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.005 }} className="space-y-1">
                <label className="text-slate-300 font-semibold">2. How would you explain this to a friend?</label>
                <input
                  type="text"
                  aria-label="How would you explain this to a friend?"
                  placeholder="e.g., Always equate the marginal satisfaction per rupee, not just total utils!"
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.005 }} className="space-y-1">
                <label className="text-slate-300 font-semibold">3. Where in real life might you use this?</label>
                <input
                  type="text"
                  aria-label="Where in real life might you use this?"
                  placeholder="e.g., Managing monthly grocery budgets between essentials and dining out..."
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Misconception Gaps */}
          {hitMisconceptions.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">Your Diagnostic Misconception Review:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <motion.div key={i} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">✗ Common Trap: {m.misconception}</p>
                    <p className="text-emerald-300">✓ CISCE Standard: {m.correction}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Real World Application Arc */}
          <motion.div whileHover={{ scale: 1.01 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>🚀</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <motion.li key={i} whileHover={{ x: 3 }} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}

      {/* Floating Feedback Modals */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Perfect!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_EconomicsEquimarginalUtilityStatementSim;
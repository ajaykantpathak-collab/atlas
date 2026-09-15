'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, ScatterChart, Scatter, ZAxis } from 'recharts';
import * as d3 from 'd3';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC SYLLABUS NODE CONSTANTS ──────────────────────────────────────────────
const NODE_C12_ECON_021 = 'c12_econ_021'; // Cross Elasticity of Demand
const NODE_C12_ECON_022 = 'c12_econ_022'; // Income Elasticity of Demand
const NODE_C12_ECON_023 = 'c12_econ_023'; // Degrees of Elasticity of Demand
const NODE_C12_ECON_024 = 'c12_econ_024'; // Factors Affecting Elasticity of Demand
const NODE_C12_ECON_025 = 'c12_econ_025'; // Supply - Meaning; Stock vs Supply
const NODE_C12_ECON_026 = 'c12_econ_026'; // Supply Function & Law of Supply
const NODE_C12_ECON_027 = 'c12_econ_027'; // Derivation of Market Supply, Movement vs Shift
const NODE_C12_ECON_028 = 'c12_econ_028'; // Exceptions to Law of Supply
const NODE_C12_ECON_029 = 'c12_econ_029'; // Elasticity of Supply - Meaning & Degrees
const NODE_C12_ECON_030 = 'c12_econ_030'; // Elasticity of Supply - Percentage & Geometric Methods

const ALL_NODE_IDS = [
  NODE_C12_ECON_021,
  NODE_C12_ECON_022,
  NODE_C12_ECON_023,
  NODE_C12_ECON_024,
  NODE_C12_ECON_025,
  NODE_C12_ECON_026,
  NODE_C12_ECON_027,
  NODE_C12_ECON_028,
  NODE_C12_ECON_029,
  NODE_C12_ECON_030,
];

// ─── PREDICTION QUESTIONS (BRILLIANT PREDICT-THEN-CHECK PATTERN) ───────────────
export interface PredictionQuestion {
  id: string;
  nodeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_001',
    nodeId: NODE_C12_ECON_021,
    question: 'If the market price of Coffee rises by 30%, what do you predict will happen to the quantity demanded for Tea (a close substitute)?',
    options: [
      'Demand for Tea will increase (positive cross-price elasticity, Exy > 0)',
      'Demand for Tea will decrease because all beverages become more expensive',
      'Demand for Tea will remain completely unchanged (zero cross elasticity)',
      'Demand for Tea will immediately crash to zero',
    ],
    correctIndex: 0,
    explanation: 'Substitutes satisfy the same consumer desire. When Coffee prices rise, consumers switch to Tea, shifting the demand for Tea upward (Exy > 0).',
    verifyInstruction: 'In Lab 1, toggle to "Substitutes" and drag the Price Slider of Good Y to +30% to verify the demand increase in Good X.',
  },
  {
    id: 'pred_002',
    nodeId: NODE_C12_ECON_027,
    question: 'If commercial diesel prices increase tractor operating costs for all farmers, what do you predict will happen to the market supply curve of wheat?',
    options: [
      'The entire supply curve will shift LEFTWARD (decrease in supply at every price)',
      'There will be an expansion of supply (movement up along the same curve)',
      'The supply curve will become horizontal at all price levels',
      'The supply curve will shift rightward to compensate for fuel costs',
    ],
    correctIndex: 0,
    explanation: 'Diesel is an input factor (Pf). A rise in input costs reduces profitability at each price, causing a leftward shift of the entire supply curve.',
    verifyInstruction: 'In Lab 4, adjust the "Diesel Input Cost Δ (Pf)" slider to +40% and watch the green supply curve shift left of the baseline.',
  },
];

// ─── OBSERVATION QUESTIONS (BRILLIANT WHAT-DO-YOU-NOTICE PATTERN) ───────���─────
export interface ObservationQuestion {
  id: string;
  nodeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  observableOptions: string[];
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_001',
    nodeId: NODE_C12_ECON_022,
    question: 'In Lab 2, as household income rises from ₹8,000 to ₹80,000, what do you notice about the consumption of coarse cereals (Jowar) compared to luxury dairy/discretionary spend?',
    options: [
      'Coarse cereals decrease (Ey < 0, inferior) while luxury spend accelerates exponentially (Ey > 1)',
      'Both coarse cereals and luxuries grow at identical linear rates',
      'Coarse cereals remain constant while luxuries drop to zero',
      'Coarse cereals grow 10x faster than packaged dairy',
    ],
    correctIndex: 0,
    explanation: 'As household income rises, consumers substitute away from coarse grains (inferior goods with Ey < 0) and rapidly increase budget allocations to superior and luxury goods (Ey > 1).',
    observableOptions: [
      'Coarse cereals (Jowar) curve downwards as income increases (Ey < 0)',
      'Staple rice demand flattens out to a modest positive slope (0 < Ey < 1)',
      'Packaged dairy and luxury discretionary spending expand exponentially (Ey > 1)',
    ],
  },
  {
    id: 'obs_002',
    nodeId: NODE_C12_ECON_030,
    question: 'In Lab 5, when the linear supply curve is configured to meet the vertical price axis ABOVE the origin (c > 0), what do you observe about the calculated Price Elasticity of Supply (Es)?',
    options: [
      'Es is strictly greater than 1 (Relatively Elastic, Es > 1.0)',
      'Es equals exactly 1.0 at all points on the curve',
      'Es is less than 1 (Inelastic, Es < 1.0)',
      'Es is strictly zero (Perfect Inelastic)',
    ],
    correctIndex: 0,
    explanation: 'Geometrically and by calculus: Es = 1 + c/(m*Q). When the intercept c > 0 (intersects price axis above origin), Es > 1 for every point along that straight line.',
    observableOptions: [
      'Positive price-axis intercept (above origin) yields Es > 1',
      'Passage straight through the origin (0,0) yields Es = 1',
      'Positive quantity-axis intercept (below origin) yields Es < 1',
    ],
  },
];

// ─── NARRATIVE SCENARIO ────────────────────────────────────────────────────────
const SCENARIO = {
  title: 'The Great Indian Market Equilibrium Challenge',
  intro: 'You have been appointed Chief Economic Advisor to the Ministry of Commerce and National Mandi Board. Across Indian agricultural markets and corporate sectors (from Punjab wheat mandis and Azadpur tomato wholesale to Jio-Airtel telecom and automotive giants), prices, cross-elasticities, incomes, and supply curves are in flux.',
  context: 'Your task is to analyze price cross-shocks, income shifts, stock-vs-supply retention, mandi supply responses, and geometric elasticity to guide national policy and antitrust market definitions.',
};

// ─── DISCOVERY HOOK ────────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'In July 2024, Reliance Jio raised mobile tariffs by 20%. Immediately, Bharti Airtel saw a surge in mobile number port-ins without changing its price. Meanwhile, petrol prices in Mumbai crossed ₹105/L, causing sales of petrol passenger cars to drop. What explains these opposite cross-price behaviors?',
  options: [
    'Jio & Airtel are substitutes (positive cross elasticity), while petrol & cars are complements (negative cross elasticity).',
    'Both pairs are complements because all modern goods are consumed together in cities.',
    'Jio & Airtel are inferior goods, whereas cars are luxury goods that ignore petrol prices.',
    'It is a violation of the Law of Supply caused by hoarding in mandis.',
  ],
  correctIndex: 0,
  hintAfter: 'Substitutes swap (price of Y up → demand for X up: positive), while complements collapse together (price of Y up → demand for X down: negative)! Let us explore this visually.',
};

// ─── CHALLENGE INTERFACE ───────────────────────────────────────────────────────
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ──────────────────
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (Cross Elasticity sign)
  {
    id: 'ch_econ_001',
    nodeId: NODE_C12_ECON_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If the cross elasticity of demand between good X and good Y is positive (Exy > 0), how are the two goods related?',
    options: ['They are Substitutes', 'They are Complements', 'They are Unrelated goods', 'They are Giffen goods'],
    correctIndex: 0,
    explanation: 'When Exy > 0, an increase in the price of Y causes consumers to switch to X, increasing demand for X. Hence, they are substitutes (e.g., Tea and Coffee).',
    hints: [
      'Think: If coffee price rises, does demand for tea rise or fall?',
      'Both move in the same direction (+ΔPy leads to +ΔQx).',
      'Same direction movement means positive cross elasticity, which defines substitute goods.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label (Degrees of Elasticity Curves)
  {
    id: 'ch_econ_002',
    nodeId: NODE_C12_ECON_023,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each demand curve shape to its corresponding degree of price elasticity.',
    dragItems: [
      { label: 'Ed = 0 (Perfect Inelastic)', targetId: 'box_vert' },
      { label: 'Ed = ∞ (Perfect Elastic)', targetId: 'box_horiz' },
      { label: 'Ed = 1 (Unitary Hyperbola)', targetId: 'box_hyper' },
      { label: '0 < Ed < 1 (Steep)', targetId: 'box_steep' },
    ],
    correctMapping: {
      box_vert: 'Ed = 0 (Perfect Inelastic)',
      box_horiz: 'Ed = ∞ (Perfect Elastic)',
      box_hyper: 'Ed = 1 (Unitary Hyperbola)',
      box_steep: '0 < Ed < 1 (Steep)',
    },
    explanation: 'A vertical curve represents Ed=0 (fixed quantity like insulin); horizontal represents Ed=∞ (competitive price taker); rectangular hyperbola represents Ed=1 (constant P×Q); steep curve represents Ed<1 (necessities like salt).',
    hints: [
      'A vertical line means quantity never changes no matter the price (Ed = 0).',
      'A horizontal line means price is locked at market level (Ed = ∞).',
      'A rectangular hyperbola maintains constant total expenditure (Ed = 1).',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Numeric (Income Elasticity Calculation)
  {
    id: 'ch_econ_003',
    nodeId: NODE_C12_ECON_022,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A rural UP household receiving PM-KISAN sees monthly income rise by 10%. Their consumption of milk rises from 10L to 12L (a 20% increase). Compute the Income Elasticity of Demand (Ey).',
    correctAnswer: 2.0,
    tolerance: 0.1,
    unit: 'Ey value',
    explanation: 'Ey = (% change in Q) / (% change in Y) = +20% / +10% = 2.0. Since Ey > 1, branded milk behaves as a luxury/superior good for this income threshold.',
    hints: [
      'Formula: Ey = (%ΔQ) / (%ΔY).',
      'Here %ΔQ = +20% and %ΔY = +10%.',
      'Divide 20 by 10 to get 2.0.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Classify (Stock vs Supply)
  {
    id: 'ch_econ_004',
    nodeId: NODE_C12_ECON_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A Punjab farmer harvests 100 quintals of wheat. He stores 20 quintals for family seed/consumption and brings 80 quintals to Khanna Mandi at ₹2,125/q. What are the Stock and Supply?',
    options: [
      'Stock = 100 quintals, Supply = 80 quintals',
      'Stock = 80 quintals, Supply = 100 quintals',
      'Stock = 20 quintals, Supply = 80 quintals',
      'Stock = 100 quintals, Supply = 20 quintals',
    ],
    correctIndex: 0,
    explanation: 'Stock is the total physical inventory available (100q). Supply is the quantity offered for sale at the given price (80q). Retention = 20q. Supply ≤ Stock always.',
    hints: [
      'Stock is everything the producer physically has.',
      'Supply is only what is offered on the market at that price.',
      '100 harvested is stock; 80 offered at MSP is supply.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation - Drag Sort (Stakeholder / Supply Derivation Steps)
  {
    id: 'ch_econ_005',
    nodeId: NODE_C12_ECON_027,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of deriving a Market Supply Curve from individual farmers.',
    sortItems: [
      'Record individual seller supply schedules at each common market price',
      'Perform horizontal summation by adding quantities (Qs_total = Q1 + Q2 + ...)',
      'Plot market price on Y-axis and aggregated market quantities on X-axis',
      'Connect points to obtain the flatter, upward-sloping Market Supply Curve',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Market supply derivation begins with individual schedules, horizontal summation of quantities at common prices, plotting on price-quantity axes, and joining points.',
    hints: [
      'Start with individual supply data before aggregating.',
      'Horizontal summation adds quantities on the X-axis, never prices.',
      'Plotting and connecting the curve is the final visual step.',
    ],
  },
  // 6. Foundation - Understanding (Exceptions to Law of Supply)
  {
    id: 'ch_econ_006',
    nodeId: NODE_C12_ECON_028,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does the supply curve of fresh tomatoes at Azadpur Mandi at 7:00 PM violate the standard upward-sloping Law of Supply?',
    options: [
      'Perishability: The crop rots overnight and cold storage is uneconomic, forcing full stock liquidation regardless of price crash',
      'Tomatoes are Giffen goods that consumers hoard when prices crash',
      'The government imposes a price ceiling under the Competition Act 2002',
      'Tomatoes have zero cost of production in Nashik',
    ],
    correctIndex: 0,
    explanation: 'Perishable goods must be cleared before spoiling. When price crashes at dusk, the seller still supplies all remaining stock rather than withholding, breaking the Law of Supply.',
    hints: [
      'Can the vegetable vendor keep fresh tomatoes for 2 weeks in an open cart?',
      'High storage costs and quick spoilage prevent withholding stock.',
      'The storability assumption of the Law of Supply fails for perishables.',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - Construct (Supply Function formula)
  {
    id: 'ch_econ_007',
    nodeId: NODE_C12_ECON_026,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Assemble the standard economic multivariate Supply Function from the given tokens.',
    availableParts: ['Sx =', 'f(', 'Px,', 'Pr,', 'Pf,', 'T,', 'E,', 'O)'],
    targetState: 'Sx = f( Px, Pr, Pf, T, E, O)',
    validationHint: 'Select the tokens in exact economic order: Sx =, f(, Px,, Pr,, Pf,, T,, E,, O)',
    explanation: 'The supply function Sx = f(Px, Pr, Pf, T, E, O) states that quantity supplied depends on own price (Px), related goods (Pr), factor input costs (Pf), technology (T), expectations (E), and other factors (O).',
    hints: [
      'Begin with the dependent variable Sx =',
      'Open the functional notation with f(',
      'Add the variables: own price, related price, factor price, tech, expectations, other factors.',
    ],
  },
  // 8. Standard - Application (Cross Elasticity Samsung vs Xiaomi)
  {
    id: 'ch_econ_008',
    nodeId: NODE_C12_ECON_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Indian electronics retail, Samsung cuts its Galaxy A-series price from ₹20,000 to ₹16,000 (a 20% fall). Consequently, quarterly demand for Xiaomi Redmi falls from 50,000 to 44,000 units (a 12% fall). Calculate the Cross Elasticity of Demand (Exy).',
    correctAnswer: 0.6,
    tolerance: 0.05,
    unit: 'Exy',
    explanation: 'Exy = (%ΔQ_Xiaomi) / (%ΔP_Samsung) = (-12%) / (-20%) = +0.60. The positive sign proves they are substitutes with moderate substitutability.',
    hints: [
      'Formula: Exy = (% change in Qx) / (% change in Py).',
      '%ΔQx = -12%, %ΔPy = -20%.',
      'Divide -12 by -20 to get +0.60.',
    ],
    misconceptionIndex: 0,
  },
  // 9. Standard - Analysis (Movement vs Shift)
  {
    id: 'ch_econ_009',
    nodeId: NODE_C12_ECON_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The Central Government raises the GST on commercial diesel by 15%, increasing tractor operating costs for Punjab farmers. What happens to the Wheat Supply Curve?',
    options: [
      'Leftward Shift of the entire supply curve (Decrease in Supply at every price)',
      'Contraction of supply (Movement down along the same curve)',
      'Rightward Shift of the supply curve (Increase in Supply)',
      'Expansion of supply (Movement up along the same curve)',
    ],
    correctIndex: 0,
    explanation: 'A rise in diesel prices is a change in factor cost (Pf), a non-price determinant. It raises production costs at every price, shifting the entire supply curve to the left.',
    hints: [
      'Did the market price of wheat change, or did input cost change?',
      'Changes in input costs (diesel) are non-price factors (Pf).',
      'Non-price cost increases cause a leftward shift, NOT a movement.',
    ],
    misconceptionIndex: 5,
  },
  // 10. Standard - Application (Geometric Elasticity of Supply)
  {
    id: 'ch_econ_010',
    nodeId: NODE_C12_ECON_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A linear supply curve passes straight through the origin (0,0) at a 45-degree angle. According to the geometric method, what is the elasticity of supply (Es) at ANY point on this curve?',
    options: [
      'Es = 1 (Unitary elastic at all points)',
      'Es = 0 (Perfectly inelastic)',
      'Es > 1 (Elastic)',
      'Es depends on the specific price chosen on the line',
    ],
    correctIndex: 0,
    explanation: 'For any straight-line supply curve originating from (0,0), the ratio of the distance to the X-intercept (PA) and distance to the Y-intercept (PB) is identical (PA=PB), making Es = 1 throughout.',
    hints: [
      'Recall the geometric rule: Es = PA / PB.',
      'When the curve passes through the origin, both intercepts meet at (0,0).',
      'Hence PA = PB, so Es is always exactly 1.',
    ],
    misconceptionIndex: 6,
  },
  // 11. Standard - Evaluation (Backward-Bending Labour Supply)
  {
    id: 'ch_econ_011',
    nodeId: NODE_C12_ECON_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A senior Bengaluru AI architect earning ₹3.5 Lakh/month turns down a weekend consulting offer at ₹5,000/hour to spend time with family. Which economic mechanism explains this backward bend in labor supply?',
    options: [
      'The Income Effect (preference for leisure as a normal good) dominates the Substitution Effect',
      'The Substitution Effect dominates the Income Effect',
      'The worker is exhibiting irrational economic behavior',
      'A shift in the supply curve caused by higher corporate income tax',
    ],
    correctIndex: 0,
    explanation: 'At very high wages, the income effect overpowers the substitution effect: the worker has high purchasing power and values leisure (a normal good) more than additional money.',
    hints: [
      'Two opposing forces: Substitution effect (work more) vs Income effect (buy more leisure).',
      'At high wealth levels, leisure becomes highly desirable.',
      'When income effect > substitution effect, the curve bends backward.',
    ],
  },
  // 12. Standard - Numeric (Percentage Method Cement Supply)
  {
    id: 'ch_econ_012',
    nodeId: NODE_C12_ECON_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'UltraTech Cement raises its price from ₹350 to ₹385 per bag (a 10% increase). Output supplied expands from 100 million bags to 115 million bags (a 15% increase). Compute the Price Elasticity of Supply (Es).',
    correctAnswer: 1.5,
    tolerance: 0.05,
    unit: 'Es',
    explanation: 'Es = (%ΔQs) / (%ΔP) = (+15%) / (+10%) = 1.50. Supply is relatively elastic (Es > 1) because modern industrial plants can add shifts quickly.',
    hints: [
      'Formula: Es = (% change in Qs) / (% change in P).',
      '%ΔQs = 15%, %ΔP = 10%.',
      '15 / 10 = 1.5.',
    ],
  },
  // 13. Standard - Analysis (Factors Affecting Demand Elasticity)
  {
    id: 'ch_econ_013',
    nodeId: NODE_C12_ECON_024,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the Indian government levy a 28% GST plus cess on tobacco and cigarettes while maintaining high fiscal revenue without collapsing sales?',
    options: [
      'Habit-forming addiction creates highly price-inelastic demand (Ed between 0.3 and 0.5)',
      'Tobacco has many close substitutes like green tea and fruit juice',
      'Cigarettes take up 90% of an average consumer budget',
      'The supply curve of tobacco is perfectly elastic in mandis',
    ],
    correctIndex: 0,
    explanation: 'Habit-forming goods lack substitutes and exhibit inelastic demand (Ed < 1). When tax increases price, quantity falls only slightly, generating large tax revenues for the exchequer.',
    hints: [
      'Consider the biological addiction factor in elasticity.',
      'Addictive goods have low price responsiveness (inelastic).',
      'Inelastic demand ensures tax hikes raise substantial government revenue.',
    ],
  },
  // 14. Standard - Drag Label (Supply Intercepts & Geometric Es)
  {
    id: 'ch_econ_014',
    nodeId: NODE_C12_ECON_030,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Drag the correct Elasticity of Supply classification to its linear curve intercept description.',
    dragItems: [
      { label: 'Es > 1 (Meets Y-axis above origin)', targetId: 'int_above' },
      { label: 'Es = 1 (Passes through origin)', targetId: 'int_origin' },
      { label: 'Es < 1 (Meets X-axis / below origin)', targetId: 'int_below' },
    ],
    correctMapping: {
      int_above: 'Es > 1 (Meets Y-axis above origin)',
      int_origin: 'Es = 1 (Passes through origin)',
      int_below: 'Es < 1 (Meets X-axis / below origin)',
    },
    explanation: 'By calculus and geometry (Es = 1 + c/(m*Q)): when price intercept c > 0 (meets Y-axis above origin), Es > 1. Through origin (c=0), Es=1. Meets positive X-axis (c < 0), Es < 1.',
    hints: [
      'Through origin is the benchmark where Es = 1.',
      'Intersecting the positive price axis (Y-axis above 0) gives elastic supply (Es > 1).',
      'Intersecting the positive quantity axis (X-axis) gives inelastic supply (Es < 1).',
    ],
  },
  // 15. Advanced - Analysis (Antitrust & Competition Act 2002)
  {
    id: 'ch_econ_015',
    nodeId: NODE_C12_ECON_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under Section 2(t) of the Competition Act 2002, the Competition Commission of India (CCI) investigates whether two products belong to the same "Relevant Product Market". Which economic metric is the most decisive empirical test?',
    options: [
      'A high positive Cross Elasticity of Demand (Exy >> 0), indicating strong consumer substitutability',
      'A negative Income Elasticity of Demand (Ey < 0)',
      'The total physical stock in warehouse inventory',
      'A unitary elasticity of supply across all seasons',
    ],
    correctIndex: 0,
    explanation: 'Relevant product market is defined by substitutability. A high positive cross-elasticity proves that consumers treat the two goods as interchangeable replacements, placing them in the same antitrust market.',
    hints: [
      'How does the CCI test if Tata Tea and Brooke Bond compete in the same market?',
      'If tea A price rises, do buyers readily swap to tea B?',
      'High positive cross elasticity is the gold standard for defining substitute product markets.',
    ],
  },
  // 16. Advanced - Evaluation (Inferior vs Necessity vs Luxury under NSSO)
  {
    id: 'ch_econ_016',
    nodeId: NODE_C12_ECON_022,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'NSSO 75th round consumer expenditure data shows that as Indian household per-capita income rises, spending on coarse cereals (jowar/bajra) decreases, rice grows by 3%, and passenger SUVs grow by 25%. Classify these three goods respectively.',
    options: [
      'Jowar: Inferior (Ey < 0); Rice: Necessity (0 < Ey < 1); SUVs: Luxury (Ey > 1)',
      'Jowar: Luxury; Rice: Inferior; SUVs: Necessity',
      'Jowar: Giffen; Rice: Normal; SUVs: Veblen only',
      'All three are normal goods with varying own-price elasticities',
    ],
    correctIndex: 0,
    explanation: 'Ey < 0 indicates an inferior good (demand falls as income rises). 0 < Ey < 1 indicates a necessity (demand rises less than proportionally). Ey > 1 indicates a luxury (demand rises more than proportionally).',
    hints: [
      'Demand drops when richer → Inferior (negative Ey).',
      'Demand grows slowly (3% vs income growth) → Necessity (0 to 1).',
      'Demand surges faster than income (25%) → Luxury (> 1).',
    ],
  },
  // 17. Advanced - Numeric (Multi-farmer Market Supply Shift)
  {
    id: 'ch_econ_017',
    nodeId: NODE_C12_ECON_027,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Three Andhra paddy farmers supply 40q, 50q, and 60q at an MSP of ₹2,300/q. A new biotech seed increases each farmer\'s yield by 25% at every price. What is the NEW total Market Supply in quintals at ₹2,300/q?',
    correctAnswer: 187.5,
    tolerance: 0.5,
    unit: 'quintals',
    explanation: 'Initial market supply = 40 + 50 + 60 = 150 quintals. With a 25% technology yield increase, new market supply = 150 × 1.25 = 187.5 quintals (a rightward shift).',
    hints: [
      'Find initial market supply by summing 40 + 50 + 60.',
      'Initial total = 150 quintals.',
      'Multiply 150 by 1.25 to calculate the 25% boost.',
    ],
  },
  // 18. Advanced - Analysis (Law of Supply Ceteris Paribus Breakdown)
  {
    id: 'ch_econ_018',
    nodeId: NODE_C12_ECON_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During 2021-22, global steel prices rose from ₹55,000 to ₹70,000/tonne. Simultaneously, coking coal input costs spiked by 80%. Tata Steel maintained output instead of expanding. Did this violate the Law of Supply?',
    options: [
      'No: The Law of Supply requires ceteris paribus; the simultaneous spike in input costs (Pf) shifted the curve left, neutralizing the price expansion.',
      'Yes: Tata Steel acted irrationally contrary to profit maximization.',
      'Yes: Steel is a perishable commodity with vertical supply.',
      'No: Steel supply is governed exclusively by income elasticity.',
    ],
    correctIndex: 0,
    explanation: 'The Law of Supply isolates own price holding input costs constant. When factor costs (coking coal) rise concurrently, the supply curve shifts leftward, offsetting the upward price incentive.',
    hints: [
      'Remember the condition: "other things remaining constant" (ceteris paribus).',
      'Did factor input costs (coking coal) stay constant? No, they spiked.',
      'The law was not violated; a non-price shift occurred alongside the price change.',
    ],
  },
  // 19. Advanced - Drag Sort (Short run to Long run Elasticity Progression)
  {
    id: 'ch_econ_019',
    nodeId: NODE_C12_ECON_029,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the time periods of agricultural wheat supply in order of INCREASING price elasticity (from least elastic to most elastic).',
    sortItems: [
      'Market Period / Same-day mandi arrival (Es = 0, perfectly inelastic stock)',
      'Short Run / Single crop cycle (0 < Es < 1, limited acreage reallocation)',
      'Long Run / Multi-year horizon (Es > 1, tube-wells, new land, tech adoption)',
      'Very Long Run / Secular period (Es >> 1, full structural & genetic transformation)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Elasticity of supply increases over time as producers overcome physical constraints: from completely fixed stock in the market period to full technological adaptability in the long run.',
    hints: [
      'Start with the immediate day of harvest where no extra grain can be produced.',
      'Next is one season where farmers can only reallocate existing plots.',
      'Multi-year horizons allow capital investments and tube-well installations.',
    ],
  },
  // 20. Advanced - Evaluation (Essential Commodities Act & Stock Limits)
  {
    id: 'ch_econ_020',
    nodeId: NODE_C12_ECON_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does Section 3 of the Essential Commodities Act 1955 empower the Central Government to impose statutory stock limits on wholesale onion traders during price spikes?',
    options: [
      'To force traders to convert hoarded stock into active market supply, closing the artificial retention gap and stabilizing mandi prices',
      'To eliminate the concept of supply and make onions a free public good',
      'To convert perishable onions into manufactured industrial durables',
      'To force all traders into becoming monopolists',
    ],
    correctIndex: 0,
    explanation: 'Market price is determined by active supply (what is offered), not total stock (what is hoarded in godowns). Stock limits prevent speculative retention (Supply = Stock - Retention), driving hoarded inventory into supply.',
    hints: [
      'Remember: Market price depends on SUPPLY, not total hoarded STOCK.',
      'Traders withhold retention in cold storage to induce artificial scarcity.',
      'Stock limits compel sellers to release goods into active market circulation.',
    ],
  },
  // 21. Advanced - Creativity (Design a Policy Mix for Electric Vehicles)
  {
    id: 'ch_econ_021',
    nodeId: NODE_C12_ECON_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To accelerate EV adoption (Tata Nexon EV, Ola Electric), the government cuts GST on EV batteries and installs 50,000 public chargers. From an elasticity perspective, how does this drive adoption?',
    options: [
      'It creates close infrastructure substitutes to petrol cars and lowers total cost of ownership in the elastic discretionary auto segment',
      'It turns EVs into perfectly inelastic Veblen goods with vertical demand curves',
      'It makes cross elasticity between EVs and electricity strictly negative',
      'It removes all factors of production from the supply function',
    ],
    correctIndex: 0,
    explanation: 'By making chargers ubiquitous and batteries cheaper, EVs become closer substitutes to internal combustion vehicles. In an income-elastic, high-budget discretionary sector, this shifts consumer choice rapidly.',
    hints: [
      'Automobiles absorb a large share of household income (elastic demand).',
      'Public chargers make EVs a viable, close substitute for petrol cars.',
      'More substitutes + high proportion of income spent = high price responsiveness.',
    ],
  },
  // 22. Advanced - Analysis (Second-hand goods & Heritage Assets)
  {
    id: 'ch_econ_022',
    nodeId: NODE_C12_ECON_028,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At an auction in Mumbai, an authentic original painting by M.F. Husain sells for ₹15 Crore. Why is its supply curve perfectly inelastic (Es = 0) regardless of how high bidding goes?',
    options: [
      'Fixed historical stock: The artist cannot produce additional original paintings, so new production is zero',
      'Art buyers have negative income elasticity for heritage paintings',
      'The auction house is legally bound by the Drugs Prices Control Order',
      'The painting is a perishable agricultural commodity',
    ],
    correctIndex: 0,
    explanation: 'For rare second-hand goods, antiques, and deceased artists\' masterworks, the total stock is physically fixed. Higher prices cannot elicit new manufacturing; only the existing single unit changes hands.',
    hints: [
      'Can more original paintings by a deceased artist be manufactured?',
      'The stock is strictly capped at existing historical units.',
      'Zero production response to price yields a vertical (Es = 0) supply curve.',
    ],
  },
];

// ─── COMPONENT PROPS & DEFAULTS ────────────────────────────────────────────────
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
  nodeId: NODE_C12_ECON_021,
  title: 'ISC Class 12 Economics: Elasticity of Demand & Supply Mastery',
  definition: 'Cross elasticity of demand measures responsiveness of quantity demanded of good X to changes in price of good Y. Supply represents the willingness and ability of producers to offer goods for sale at specific prices, governed by the Law of Supply and measured by percentage and geometric methods.',
  eli5: 'When coffee gets expensive, you switch to tea (substitutes, positive cross elasticity). When petrol gets expensive, you buy fewer cars (complements, negative cross elasticity). On the supply side, farmers and factories supply more when prices rise because profits expand, unless blocked by perishability or biological time lags.',
  misconceptions: [
    {
      misconception: 'Complements have positive cross elasticity because they go together.',
      correction: 'Complements have NEGATIVE cross elasticity. When price of Y rises, you buy less of Y and therefore less of X (opposite directions = negative).',
    },
    {
      misconception: 'A perfectly elastic demand curve is vertical because quantity can stretch endlessly.',
      correction: 'Perfect inelastic is vertical (quantity stuck at Q*). Perfect elastic is horizontal (price stuck at market level; any rise drops demand to 0).',
    },
    {
      misconception: 'Any good with positive income elasticity is a luxury.',
      correction: 'Positive Ey only means the good is Normal. It is a Necessity if 0 < Ey < 1, and a Luxury only if Ey > 1.',
    },
    {
      misconception: 'Stock and supply are identical quantities.',
      correction: 'Stock is total physical inventory. Supply is only the portion offered for sale at a price (Supply = Stock - Retention).',
    },
    {
      misconception: 'Tomatoes dumped at sunset in mandi violate Law of Supply because farmers are irrational.',
      correction: 'Perishable goods rot rapidly. The storable-output assumption of the Law of Supply fails, forcing full stock liquidation.',
    },
    {
      misconception: 'A new tax on inputs causes a contraction of supply.',
      correction: 'A tax is a non-price determinant that shifts the entire supply curve LEFT (decrease in supply), not a movement along the curve.',
    },
    {
      misconception: 'A supply curve passing through the origin has Es = 0.',
      correction: 'Any straight-line supply curve passing through the origin has Es = 1 (Unitary) at every single point.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the sign of cross elasticity for close substitutes like Jio and Airtel?', options: ['Positive (Exy > 0)', 'Negative (Exy < 0)', 'Zero', 'Infinite negative'], correctIndex: 0 },
    { question: 'If income rises by 10% and demand for jowar falls by 5%, jowar is:', options: ['An Inferior good (Ey < 0)', 'A Luxury good (Ey > 1)', 'A Necessity (0 < Ey < 1)', 'A Veblen good'], correctIndex: 0 },
    { question: 'What is the shape of a perfectly inelastic demand curve (e.g., Insulin)?', options: ['Vertical line parallel to price axis', 'Horizontal line parallel to quantity axis', 'Rectangular hyperbola', 'Upward sloping line'], correctIndex: 0 },
    { question: 'Which factor makes tobacco demand highly price inelastic in India?', options: ['Habit-forming physiological addiction', 'Large availability of cheap substitutes', 'Small number of consumers', 'Perishability in rain'], correctIndex: 0 },
    { question: 'If a farmer holds 100 quintals of wheat and retains 30q for family, his supply at MSP is:', options: ['70 quintals', '100 quintals', '30 quintals', '130 quintals'], correctIndex: 0 },
    { question: 'A movement upward along a supply curve is termed:', options: ['Expansion of supply', 'Increase in supply', 'Contraction of supply', 'Rightward shift'], correctIndex: 0 },
    { question: 'Why does the labor supply curve bend backward at very high executive salaries?', options: ['Income effect for leisure dominates substitution effect', 'Workers lose ability to work', 'Income tax becomes 100%', 'Substitution effect dominates income effect'], correctIndex: 0 },
    { question: 'What is the elasticity of supply for a linear curve meeting the price axis above the origin?', options: ['Es > 1 (Relatively elastic)', 'Es = 1 (Unitary)', 'Es < 1 (Relatively inelastic)', 'Es = 0'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master cross & income elasticity, distinguish stock vs supply, understand shifts vs movements, and compute supply elasticity by percentage and geometric methods.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG INTERACTIVE DISCOVERY LABS) ──────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Cross-Price Elasticity Simulator (Substitutes vs Complements)',
    instruction: 'Drag the Price Slider of Good Y (e.g. Coffee or Petrol) and watch the real-time cross-demand curve and quantity response of Good X (Tea or Cars).',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_021,
  },
  {
    title: 'Lab 2: Income Elasticity Spectrum (Engel Shift Dynamics)',
    instruction: 'Adjust monthly household income from ₹8,000 to ₹80,000. Observe how the consumption basket dynamically rebalances between Coarse Cereals (Inferior), Rice (Necessity), and Premium Milk/EVs (Luxury).',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_022,
  },
  {
    title: 'Lab 3: Mandi Stock vs Supply Retention Bucket',
    instruction: 'Allocate harvested crop between Family Consumption, Seed Retention, and Godown Hoarding. See how active Mandi Supply is derived and how hoarding spikes market prices.',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_ECON_025,
  },
  {
    title: 'Lab 4: Supply Dynamics — Movement vs Shift Visualizer',
    instruction: 'Toggle between changing the Mandi Market Price (Movement along SS) and changing Input Costs / Seed Tech / GST (Shift of SS curve).',
    interactionType: 'click-parts',
    nodeId: NODE_C12_ECON_027,
  },
  {
    title: 'Lab 5: Geometric Elasticity Ruler & Axis Intercepts',
    instruction: 'Move the supply curve intercept along the Y-axis and X-axis. Watch the geometric segments PA and PB calculate the point elasticity Es instantly.',
    interactionType: 'drag-position',
    nodeId: NODE_C12_ECON_030,
  },
];

// ─── REAL WORLD ACTIVITY ───────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Economic Advisor: Indian Mandi & Tariff Strategic Brief',
  description: 'Apply your elasticity toolkit to advise the Ministry on real-world Indian policy decisions:',
  steps: [
    'Analyze whether high GST on cigarettes (28% + cess) meets fiscal revenue goals given habit inelasticity (Ed ≈ 0.4).',
    'Evaluate why onion price surges trigger the Essential Commodities Act stock limits to convert hoarded stock into supply.',
    'Formulate an MSP procurement target for Kharif Paddy considering a short-run agricultural supply elasticity of Es ≈ 0.3.',
    'Use Cross Elasticity data (Exy = +1.8) to define the relevant market in an antitrust merger between two Indian beverage companies.',
  ],
};

// ─── MAIN COMPONENT IMPLEMENTATION ─────────────────────────────────────────────
export function C12_EconomicsCrossElasticityDemandSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_ECON_021,
  title = DEFAULT_PROPS.title || 'Economics Cross & Supply Elasticity',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['econ'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // ─── CORE PHASE FLOW ────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── PREDICTION & OBSERVATION STATE (BRILLIANT PATTERN) ──────────────────────
  const [currentPredictionIdx, setCurrentPredictionIdx] = useState<number>(0);
  const [predictionAnswered, setPredictionAnswered] = useState<boolean>(false);
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);

  const [currentObservationIdx, setCurrentObservationIdx] = useState<number>(0);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [selectedObservation, setSelectedObservation] = useState<number | null>(null);

  // ─── REFLECTION RESPONSES ────────────────────────────────────────────────────
  const [reflections, setReflections] = useState<{ [key: string]: string }>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── BRILLIANT DISCOVERY STATE ───────────────────────────────────────────────
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── LAB 1: CROSS ELASTICITY STATE ──────────────────────────────────────────
  const [goodYType, setGoodYType] = useState<'substitute' | 'complement' | 'unrelated'>('substitute');
  const [priceYChange, setPriceYChange] = useState<number>(0); // -50% to +50%
  const [baseGoodXDemand, setBaseGoodXDemand] = useState<number>(100);

  // ─── LAB 2: INCOME ELASTICITY STATE ────────────────────────────────��────────
  const [householdIncome, setHouseholdIncome] = useState<number>(20000); // ₹8,000 to ₹80,000

  // ─── LAB 3: STOCK VS SUPPLY RETENTION STATE ─────────────────────────────────
  const [totalHarvestStock, setTotalHarvestStock] = useState<number>(100); // Quintals
  const [familyRetention, setFamilyRetention] = useState<number>(15);
  const [seedRetention, setSeedRetention] = useState<number>(10);
  const [godownHoarding, setGodownHoarding] = useState<number>(15);
  const [mandiPrice, setMandiPrice] = useState<number>(2125); // ₹/quintal MSP

  // ─── LAB 4: SUPPLY SHIFT & MOVEMENT STATE ───────────────────────────────────
  const [simSupplyPrice, setSimSupplyPrice] = useState<number>(50); // ₹10 to ₹100
  const [dieselInputCostDelta, setDieselInputCostDelta] = useState<number>(0); // -30 to +50
  const [seedTechYieldBoost, setSeedTechYieldBoost] = useState<number>(0); // 0 to 40%
  const [gstRateShift, setGstRateShift] = useState<number>(0); // 0 to 28%

  // ─── LAB 5: GEOMETRIC METHOD INTERCEPT STATE ────────────────────────────────
  const [geoInterceptY, setGeoInterceptY] = useState<number>(0); // -40 (below), 0 (origin), +40 (above)
  const [geoSlope, setGeoSlope] = useState<number>(1.0);
  const [geoPointQ, setGeoPointQ] = useState<number>(50);

  // ─── CHALLENGE INTERACTIVE & DRAG-DROP STATE ─────────────────────────────────
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── FEEDBACK VISUALS ───────────────────────────────────────────────────────
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS & PERSISTENCE ─────────────────────────────────────────────────────
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTER ─────────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY LOAD ─────────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION EFFECT ──────────────────────────────────────────
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

  // ─── 2D CANVAS ANIMATION (MANDI GRAIN FLOW) ─────────────────────────────────
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox' && phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.5 + Math.random() * 1.5,
      radius: 1.5 + Math.random() * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#f59e0b';
      particles.forEach(p => {
        p.y += p.speed;
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.fillRect(8, 4, 180, 20);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px sans-serif';
      ctx.fillText('Live Mandi Trading Flow Pulse', 14, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── DERIVED VALUES FOR LAB 1: CROSS ELASTICITY ─────────────────────────────
  const calculatedCrossDemand = useMemo(() => {
    let exy = 0.6; // default substitute
    if (goodYType === 'complement') exy = -0.5;
    if (goodYType === 'unrelated') exy = 0;

    const percentChangeX = exy * priceYChange;
    const newDemandX = Math.max(10, Math.round(baseGoodXDemand * (1 + percentChangeX / 100)));
    return { exy, percentChangeX, newDemandX };
  }, [goodYType, priceYChange, baseGoodXDemand]);

  // ─── DERIVED VALUES FOR LAB 2: INCOME ELASTICITY ────────────────────────────
  const incomeBasket = useMemo(() => {
    const baseInc = 20000;
    const incRatio = householdIncome / baseInc;

    const jowarKg = Math.max(2, Math.round(15 * Math.pow(incRatio, -0.6)));
    const riceKg = Math.round(20 * Math.pow(incRatio, 0.4));
    const milkLitres = Math.round(10 * Math.pow(incRatio, 1.5));
    const discretionarySpend = Math.round(1000 * Math.pow(incRatio, 2.5));

    return { jowarKg, riceKg, milkLitres, discretionarySpend };
  }, [householdIncome]);

  // ─── DERIVED VALUES FOR LAB 3: STOCK & MANDI SUPPLY ─────────────────────────
  const mandiSupplyDerived = useMemo(() => {
    const totalRetention = familyRetention + seedRetention + godownHoarding;
    const activeSupply = Math.max(0, totalHarvestStock - totalRetention);
    const equilibriumPrice = Math.round(mandiPrice * (1 + Math.max(0, (50 - activeSupply) / 60)));
    return { totalRetention, activeSupply, equilibriumPrice };
  }, [totalHarvestStock, familyRetention, seedRetention, godownHoarding, mandiPrice]);

  // ─── DERIVED VALUES FOR LAB 4: SUPPLY SHIFT & CURVE DATA ────────────────────
  const supplyCurvePoints = useMemo(() => {
    const netShift = (seedTechYieldBoost * 0.8) - (dieselInputCostDelta * 0.5) - (gstRateShift * 0.4);
    const data = [];
    for (let p = 10; p <= 100; p += 10) {
      const qBase = p * 1.2;
      const qShifted = Math.max(0, Math.round(qBase + netShift));
      data.push({ price: p, baseQuantity: qBase, currentQuantity: qShifted });
    }
    return { data, netShift };
  }, [seedTechYieldBoost, dieselInputCostDelta, gstRateShift]);

  // ─── DERIVED VALUES FOR LAB 5: GEOMETRIC METHOD ─────────────────────────────
  const geometricResult = useMemo(() => {
    const currentPrice = geoSlope * geoPointQ + geoInterceptY;
    const qIntercept = -geoInterceptY / geoSlope;
    const esValue = Number((1 + (geoInterceptY / (geoSlope * geoPointQ))).toFixed(2));
    let classification = 'Unitary (Es = 1.0)';
    if (esValue > 1.0) classification = 'Relatively Elastic (Es > 1.0)';
    if (esValue < 1.0 && esValue >= 0) classification = 'Relatively Inelastic (Es < 1.0)';
    if (esValue === 0) classification = 'Perfect Inelastic (Es = 0)';

    return { currentPrice, qIntercept, esValue, classification };
  }, [geoInterceptY, geoSlope, geoPointQ]);

  // ─── ESCALATING HINTS HANDLER ───────────────────────────────────────────────
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

  // ─── DISCOVERY HANDLER ──────────────────────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding economic reasoning!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PREDICTION HANDLERS ────────────────────────────────────────────────────
  const handlePredictionChoice = useCallback((idx: number) => {
    setSelectedPrediction(idx);
    setPredictionAnswered(true);
    const pred = PREDICTION_QUESTIONS[currentPredictionIdx];
    const isCorrect = idx === pred.correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Prediction recorded! Now test and verify in the simulation.' : 'Interesting prediction! Let us test it in the lab.');
  }, [currentPredictionIdx]);

  const handleNextPrediction = useCallback(() => {
    if (currentPredictionIdx < PREDICTION_QUESTIONS.length - 1) {
      setCurrentPredictionIdx(p => p + 1);
      setPredictionAnswered(false);
      setSelectedPrediction(null);
      audioManager.play('whoosh');
    } else {
      setPhase('explore');
      audioManager.play('whoosh');
      speechManager.speak('Enter the Interactive Discovery Labs. Verify your predictions using the controls.');
    }
  }, [currentPredictionIdx]);

  // ─── OBSERVATION HANDLERS ───────────────────────────────────────────────────
  const handleObservationChoice = useCallback((idx: number) => {
    setSelectedObservation(idx);
    setObservationAnswered(true);
    const obs = OBSERVATION_QUESTIONS[currentObservationIdx];
    const isCorrect = idx === obs.correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great observation!' : 'Review the graph details.');
  }, [currentObservationIdx]);

  const handleNextObservation = useCallback(() => {
    if (currentObservationIdx < OBSERVATION_QUESTIONS.length - 1) {
      setCurrentObservationIdx(o => o + 1);
      setObservationAnswered(false);
      setSelectedObservation(null);
      audioManager.play('whoosh');
    } else {
      setPhase('sandbox');
      audioManager.play('whoosh');
      speechManager.speak('Great observations! Free Sandbox Mode activated.');
    }
  }, [currentObservationIdx]);

  // ─── PHASE ADVANCE HANDLERS ─────────────────────────────────────────────────
  const handleAdvanceToPrediction = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
    speechManager.speak('Make your economic predictions before testing in the labs.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Economics Discovery Labs. Explore and manipulate the variables.');
  }, []);

  const handleAdvanceToObservation = useCallback(() => {
    setPhase('observe');
    audioManager.play('whoosh');
    speechManager.speak('What patterns did you notice? Complete these guided observation checks.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox Mode activated. Experiment with all parameters without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenges initiated. Apply your understanding to solve real Indian economic problems.');
  }, []);

  // ─── LAB CONTROLS HANDLERS ──────────────────────────────────────────────────
  const handleGoodYPriceChange = useCallback((val: number) => {
    setPriceYChange(val);
    audioManager.play('count');
  }, []);

  const handleIncomeSlider = useCallback((val: number) => {
    setHouseholdIncome(val);
    audioManager.play('count');
  }, []);

  const handleRetentionChange = useCallback((type: 'family' | 'seed' | 'hoarding', val: number) => {
    if (type === 'family') setFamilyRetention(val);
    if (type === 'seed') setSeedRetention(val);
    if (type === 'hoarding') setGodownHoarding(val);
    audioManager.play('tap');
  }, []);

  const handleSupplyShiftControl = useCallback((type: 'diesel' | 'tech' | 'gst', val: number) => {
    if (type === 'diesel') setDieselInputCostDelta(val);
    if (type === 'tech') setSeedTechYieldBoost(val);
    if (type === 'gst') setGstRateShift(val);
    audioManager.play('count');
  }, []);

  const handleGeoInterceptChange = useCallback((val: number) => {
    setGeoInterceptY(val);
    audioManager.play('tap');
  }, []);

  // ─── DRAG AND DROP HANDLERS ─────────────────────────────────────────────────
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
      audioManager.play('success');
      speechManager.speak('Order arrangement correct!');
      setShowConfetti(true);
      setShowExplanation(true);
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  // ─── COMPLETION HANDLER ─────────────────────────────────────────────────────
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Comprehensive Elasticity and Supply Module completed successfully!');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ─────────────────────────────────────────────────
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

  // ─── ANSWER SUBMIT HANDLER ──────────────────────────────────────────────────
  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = ans === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant economic deduction.');
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
        speechManager.speak('Review the step-by-step economics explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, hitMisconceptions, showNextHint]);

  // ─── INACTIVITY AUTO-HINT TIMER ────────────────────────────────────────────
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (phase === 'challenge' && !showExplanation && !answerRevealed && hintCount === 0) {
      inactivityTimerRef.current = setTimeout(() => {
        showNextHint();
      }, 10000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, showExplanation, answerRevealed, hintCount, showNextHint]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ─── HEADER BAR ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-700 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">ISC Class 12 Commerce & Economics</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">CISCE 2026</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-xs px-3 py-1 font-extrabold uppercase rounded-full border ${
              difficulty === 'foundation' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600' :
              difficulty === 'advanced' ? 'bg-rose-950/60 text-rose-400 border-rose-600' :
              'bg-cyan-950/60 text-cyan-400 border-cyan-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            Mastery: <span className="font-bold text-emerald-400">{masteryLevel}</span>
          </div>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🏛️ Real-World Mandi & Market Scenario</span>
            </div>
            <h2 className="text-xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/80">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">?</span>
              <h3 className="font-bold text-white text-base">Curiosity Discovery Hook (Ungraded)</h3>
            </div>
            <p className="text-slate-200 text-sm font-medium mb-4 leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm font-semibold mb-3 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Excellent instinct! Let us make our predictions before testing.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToPrediction}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40 flex items-center gap-2"
                >
                  Proceed to Predictions (Predict-Then-Check) →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE: BRILLIANT PREDICTION QUESTIONS ─────────────────────────── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-4 bg-indigo-950/40 border border-indigo-800/60 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                🔮 Step 1: Predict Before You Interact ({currentPredictionIdx + 1} of {PREDICTION_QUESTIONS.length})
              </span>
              <span className="text-xs text-slate-400 font-mono">Brilliant.org Predict-Check Pattern</span>
            </div>
            <p className="text-sm text-slate-200">Form a clear hypothesis before manipulating the interactive economic models.</p>
          </div>

          <div className="p-5 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-white">{PREDICTION_QUESTIONS[currentPredictionIdx].question}</h3>

            <div className="space-y-2.5">
              {PREDICTION_QUESTIONS[currentPredictionIdx].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handlePredictionChoice(i)}
                  disabled={predictionAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    predictionAnswered && i === PREDICTION_QUESTIONS[currentPredictionIdx].correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : predictionAnswered && i === selectedPrediction && i !== PREDICTION_QUESTIONS[currentPredictionIdx].correctIndex
                      ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {predictionAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className="text-xs text-slate-300">
                  <strong className="text-emerald-400">Economic Theory: </strong>
                  {PREDICTION_QUESTIONS[currentPredictionIdx].explanation}
                </p>
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                  <span>🔬</span>
                  <span><strong>Verification Guide: </strong>{PREDICTION_QUESTIONS[currentPredictionIdx].verifyInstruction}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNextPrediction}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950"
                >
                  {currentPredictionIdx < PREDICTION_QUESTIONS.length - 1 ? 'Next Prediction Question →' : 'Enter Interactive Discovery Labs →'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION (BRILLIANT LABS) ────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Diagnostic status banner */}
          <div className="flex items-center justify-between bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Diagnostic Readiness Check: <strong className="text-emerald-400">{diagnosticQuestions?.length || 8} Board Questions Active</strong></span>
            <span className="text-slate-500">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
          </div>

          {/* Slide Navigation */}
          <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}:</span>
              <span className="text-sm font-bold text-white hidden sm:inline">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded-lg text-xs font-bold text-white"
              >
                ← Prev Lab
              </motion.button>
              <span className="text-xs text-slate-400 font-mono px-2">{currentSlide + 1}/{EXPLORATION_STEPS.length}</span>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => s + 1)}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold text-white shadow"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToObservation}
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-xs font-bold text-white shadow-lg shadow-cyan-900/50"
                >
                  Observation Checks →
                </motion.button>
              )}
            </div>
          </div>

          {/* Current Step Instruction */}
          <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl">
            <p className="text-emerald-300 text-sm font-semibold flex items-center gap-2">
              <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
            </p>
          </div>

          {/* ─── LAB VISUALIZATIONS BASED ON SLIDE INDEX ───────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 min-h-[380px]"
            >
              {/* LAB 1: CROSS ELASTICITY (SVG DIAGRAM 1) */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setGoodYType('substitute')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${goodYType === 'substitute' ? 'bg-emerald-900 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        Substitutes (Jio / Airtel)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setGoodYType('complement')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${goodYType === 'complement' ? 'bg-rose-900 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        Complements (Petrol / Cars)
                      </motion.button>
                    </div>

                    <div className="md:col-span-2 bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col justify-center">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Price Change of Good Y (ΔPy):</span>
                        <span className={`font-mono font-bold ${priceYChange > 0 ? 'text-rose-400' : priceYChange < 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                          {priceYChange > 0 ? `+${priceYChange}%` : `${priceYChange}%`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={-50}
                        max={50}
                        step={5}
                        value={priceYChange}
                        onChange={(e) => handleGoodYPriceChange(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Price Change of Good Y"
                      />
                    </div>
                  </div>

                  {/* Visual Cross-Response Gauges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs uppercase font-bold text-slate-400 mb-3">Live Cross-Demand Impact on Good X (Tea / Cars)</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">Base Quantity Demanded:</span>
                            <span className="font-mono text-slate-400">100 Units</span>
                          </div>
                          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-600 rounded-full w-1/2" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">New Demand for Good X:</span>
                            <span className={`font-mono font-bold ${calculatedCrossDemand.newDemandX > 100 ? 'text-emerald-400' : calculatedCrossDemand.newDemandX < 100 ? 'text-rose-400' : 'text-slate-200'}`}>
                              {calculatedCrossDemand.newDemandX} Units ({calculatedCrossDemand.percentChangeX > 0 ? `+${calculatedCrossDemand.percentChangeX.toFixed(1)}%` : `${calculatedCrossDemand.percentChangeX.toFixed(1)}%`})
                            </span>
                          </div>
                          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${calculatedCrossDemand.newDemandX >= 100 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                              animate={{ width: `${Math.min(100, (calculatedCrossDemand.newDemandX / 160) * 100)}%` }}
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono border border-slate-800">
                          <span className="text-slate-400">Exy Formula: </span>
                          <span className="text-emerald-400">({calculatedCrossDemand.percentChangeX.toFixed(1)}%) / ({priceYChange}%) = </span>
                          <strong className="text-white">{calculatedCrossDemand.exy > 0 ? `+${calculatedCrossDemand.exy}` : calculatedCrossDemand.exy}</strong>
                        </div>
                      </div>
                    </div>

                    {/* SVG Diagram 1: Cross Price Curve */}
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-center items-center">
                      <svg viewBox="0 0 320 180" className="w-full max-h-[160px]">
                        <line x1="30" y1="150" x2="290" y2="150" stroke="#475569" strokeWidth="2" />
                        <line x1="30" y1="20" x2="30" y2="150" stroke="#475569" strokeWidth="2" />
                        <text x="290" y="165" fill="#94a3b8" fontSize="10" textAnchor="end">Price of Y (Py)</text>
                        <text x="20" y="20" fill="#94a3b8" fontSize="10" transform="rotate(-90 20,20)" textAnchor="end">Demand for X (Qx)</text>

                        {/* Curve based on good type */}
                        {goodYType === 'substitute' ? (
                          <motion.path
                            d="M 50 130 L 270 40"
                            stroke="#10b981"
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                          />
                        ) : (
                          <motion.path
                            d="M 50 40 L 270 130"
                            stroke="#f43f5e"
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                          />
                        )}

                        <circle
                          cx={160 + (priceYChange * 2)}
                          cy={goodYType === 'substitute' ? 85 - (priceYChange * 0.9) : 85 + (priceYChange * 0.9)}
                          r="6"
                          fill="#f59e0b"
                        />
                        <text x="160" y="30" fill="#38bdf8" fontSize="10" textAnchor="middle">
                          {goodYType === 'substitute' ? 'Upward: Positive Exy (Substitutes)' : 'Downward: Negative Exy (Complements)'}
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: INCOME ELASTICITY (SVG DIAGRAM 2: ENGEL CURVES) */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">Monthly Household Income (Y):</span>
                      <span className="text-base font-black text-emerald-400 font-mono">₹{householdIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={8000}
                      max={80000}
                      step={2000}
                      value={householdIncome}
                      onChange={(e) => handleIncomeSlider(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                      aria-label="Monthly Household Income"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>₹8,000 (Subsistence)</span>
                      <span>₹20,000 (Median Rural)</span>
                      <span>₹50,000 (Middle Class)</span>
                      <span>₹80,000+ (Upper Middle)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* SVG Diagram 2: Engel Curve Vectors */}
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-center items-center">
                      <h4 className="text-xs uppercase font-bold text-slate-400 mb-2 w-full text-left">Engel Curves by Commodity Class</h4>
                      <svg viewBox="0 0 320 180" className="w-full max-h-[160px]">
                        <line x1="30" y1="150" x2="300" y2="150" stroke="#475569" strokeWidth="2" />
                        <line x1="30" y1="20" x2="30" y2="150" stroke="#475569" strokeWidth="2" />
                        <text x="300" y="165" fill="#94a3b8" fontSize="9" textAnchor="end">Household Income (Y)</text>
                        <text x="20" y="20" fill="#94a3b8" fontSize="9" transform="rotate(-90 20,20)" textAnchor="end">Quantity Demanded (Q)</text>

                        {/* Luxury Curve (Ey > 1): Curves upward */}
                        <path d="M 30 140 Q 150 135 290 30" stroke="#10b981" strokeWidth="2.5" fill="none" />
                        <text x="280" y="25" fill="#10b981" fontSize="9" fontWeight="bold">Luxury (Ey&gt;1)</text>

                        {/* Necessity Curve (0 < Ey < 1): Concave flattening */}
                        <path d="M 30 140 Q 120 70 290 70" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                        <text x="280" y="65" fill="#38bdf8" fontSize="9" fontWeight="bold">Necessity (0&lt;Ey&lt;1)</text>

                        {/* Inferior Good Curve (Ey < 0): Bends backward / down */}
                        <path d="M 30 140 Q 110 60 290 145" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
                        <text x="280" y="140" fill="#f59e0b" fontSize="9" fontWeight="bold">Inferior (Ey&lt;0)</text>

                        {/* Current Income Marker Line */}
                        <line
                          x1={30 + (householdIncome - 8000) * (260 / 72000)}
                          y1="25"
                          x2={30 + (householdIncome - 8000) * (260 / 72000)}
                          y2="150"
                          stroke="#e2e8f0"
                          strokeDasharray="3 3"
                        />
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Jowar / Coarse Cereals */}
                      <motion.div whileHover={{ y: -2 }} className="bg-slate-900 p-3 rounded-xl border border-amber-900/40 bg-gradient-to-b from-amber-950/20 to-slate-900">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold text-amber-400">Jowar (Inferior)</span>
                          <span className="text-[10px] text-rose-400 font-mono">Ey &lt; 0</span>
                        </div>
                        <div className="text-xl font-black text-white font-mono my-1">{incomeBasket.jowarKg} <span className="text-xs text-slate-400">kg/mo</span></div>
                        <p className="text-[10px] text-slate-400">Switched out for Basmati as income increases.</p>
                      </motion.div>

                      {/* Basmati Rice */}
                      <motion.div whileHover={{ y: -2 }} className="bg-slate-900 p-3 rounded-xl border border-cyan-900/40 bg-gradient-to-b from-cyan-950/20 to-slate-900">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold text-cyan-400">Rice (Necessity)</span>
                          <span className="text-[10px] text-cyan-400 font-mono">0 &lt; Ey &lt; 1</span>
                        </div>
                        <div className="text-xl font-black text-white font-mono my-1">{incomeBasket.riceKg} <span className="text-xs text-slate-400">kg/mo</span></div>
                        <p className="text-[10px] text-slate-400">Stable food staple; modest positive growth.</p>
                      </motion.div>

                      {/* Branded Milk / Luxury */}
                      <motion.div whileHover={{ y: -2 }} className="bg-slate-900 p-3 rounded-xl border border-emerald-900/40 bg-gradient-to-b from-emerald-950/20 to-slate-900 sm:col-span-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold text-emerald-400">Packaged Dairy &amp; Discretionary (Luxury)</span>
                          <span className="text-[10px] text-emerald-400 font-mono">Ey &gt; 1</span>
                        </div>
                        <div className="text-xl font-black text-white font-mono my-1">{incomeBasket.milkLitres} <span className="text-xs text-slate-400">L/mo</span></div>
                        <p className="text-[10px] text-slate-400">Expands faster than income once threshold is crossed.</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: MANDI STOCK VS SUPPLY */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase text-slate-300">Farmer Harvest &amp; Retention Controls (Quintals)</h4>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Total Harvest Stock (Physical Inventory):</span>
                          <span className="font-mono font-bold text-amber-400">{totalHarvestStock} q</span>
                        </div>
                        <input
                          type="range" min={50} max={150} value={totalHarvestStock}
                          onChange={(e) => setTotalHarvestStock(Number(e.target.value))}
                          className="w-full accent-amber-500"
                          aria-label="Total Harvest Stock"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Family Consumption Retention:</span>
                          <span className="font-mono text-slate-300">{familyRetention} q</span>
                        </div>
                        <input
                          type="range" min={0} max={30} value={familyRetention}
                          onChange={(e) => handleRetentionChange('family', Number(e.target.value))}
                          className="w-full accent-cyan-500"
                          aria-label="Family Consumption Retention"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Next Sowing Seed Retention:</span>
                          <span className="font-mono text-slate-300">{seedRetention} q</span>
                        </div>
                        <input
                          type="range" min={0} max={25} value={seedRetention}
                          onChange={(e) => handleRetentionChange('seed', Number(e.target.value))}
                          className="w-full accent-indigo-500"
                          aria-label="Seed Retention"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Godown Hoarding / Speculation:</span>
                          <span className="font-mono text-rose-400">{godownHoarding} q</span>
                        </div>
                        <input
                          type="range" min={0} max={40} value={godownHoarding}
                          onChange={(e) => handleRetentionChange('hoarding', Number(e.target.value))}
                          className="w-full accent-rose-500"
                          aria-label="Godown Hoarding"
                        />
                      </div>
                    </div>

                    {/* Stock vs Supply Bucket Visualization */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <h4 className="text-xs font-bold uppercase text-slate-300 mb-2">Mandi Availability &amp; Price Impact</h4>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Stock (Warehouse):</span>
                          <span className="text-amber-400 font-bold">{totalHarvestStock} q</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Retention Withheld:</span>
                          <span className="text-rose-400 font-bold">-{mandiSupplyDerived.totalRetention} q</span>
                        </div>
                        <div className="border-t border-slate-800 pt-2 flex justify-between text-sm">
                          <span className="text-emerald-400 font-bold">Active Mandi Supply:</span>
                          <span className="text-emerald-300 font-black">{mandiSupplyDerived.activeSupply} quintals</span>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Effective Mandi Clearing Price:</span>
                          <span className="text-base font-black text-emerald-400 font-mono">₹{mandiSupplyDerived.equilibriumPrice}/q</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {mandiSupplyDerived.activeSupply < 40 ? '⚠️ Severe shortage from hoarding! Essential Commodities Act stock limits needed.' : '✓ Adequate supply flowing into procurement mandis.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: MOVEMENT VS SHIFT */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-400">Diesel Input Cost Δ (Pf):</span>
                      <div className="text-xs text-rose-400 font-mono font-bold mb-1">{dieselInputCostDelta > 0 ? `+${dieselInputCostDelta}%` : `${dieselInputCostDelta}%`}</div>
                      <input
                        type="range" min={-30} max={50} value={dieselInputCostDelta}
                        onChange={(e) => handleSupplyShiftControl('diesel', Number(e.target.value))}
                        className="w-full accent-rose-500"
                        aria-label="Diesel Input Cost Delta"
                      />
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-400">Biotech Seed Yield Boost (T):</span>
                      <div className="text-xs text-emerald-400 font-mono font-bold mb-1">+{seedTechYieldBoost}% Yield</div>
                      <input
                        type="range" min={0} max={40} value={seedTechYieldBoost}
                        onChange={(e) => handleSupplyShiftControl('tech', Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Biotech Seed Yield Boost"
                      />
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-400">GST on Fertilizers (Tax O):</span>
                      <div className="text-xs text-amber-400 font-mono font-bold mb-1">{gstRateShift}% GST</div>
                      <input
                        type="range" min={0} max={28} value={gstRateShift}
                        onChange={(e) => handleSupplyShiftControl('gst', Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="GST on Fertilizers"
                      />
                    </div>
                  </div>

                  {/* Recharts Supply Curve with Live Shift */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 h-[220px]">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-bold text-slate-300">Supply Curve: Base SS vs Shifted SS Curve</span>
                      <span className={`font-bold font-mono ${supplyCurvePoints.netShift > 0 ? 'text-emerald-400' : supplyCurvePoints.netShift < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                        {supplyCurvePoints.netShift > 0 ? 'Rightward Shift (Increase in Supply)' : supplyCurvePoints.netShift < 0 ? 'Leftward Shift (Decrease in Supply)' : 'Base Position'}
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height="80%">
                      <LineChart data={supplyCurvePoints.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="currentQuantity" label={{ value: 'Quantity Supplied (Q)', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 10 }} stroke="#64748b" />
                        <YAxis dataKey="price" label={{ value: 'Price (₹)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }} stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                        <Line type="monotone" dataKey="baseQuantity" stroke="#64748b" strokeDasharray="4 4" name="Original Base SS" dot={false} />
                        <Line type="monotone" dataKey="currentQuantity" stroke="#10b981" strokeWidth={3} name="Shifted Supply Curve" dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* LAB 5: GEOMETRIC METHOD (SVG DIAGRAM 3: GEOMETRIC INTERCEPT RULER) */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase text-slate-300">Curve Intercept Presets (Price Axis Y)</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleGeoInterceptChange(30)}
                          className={`p-2 rounded-xl text-xs font-bold border ${geoInterceptY > 0 ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                        >
                          Above Origin (c &gt; 0)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleGeoInterceptChange(0)}
                          className={`p-2 rounded-xl text-xs font-bold border ${geoInterceptY === 0 ? 'bg-cyan-950 border-cyan-500 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                        >
                          Through Origin (c = 0)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleGeoInterceptChange(-30)}
                          className={`p-2 rounded-xl text-xs font-bold border ${geoInterceptY < 0 ? 'bg-amber-950 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                        >
                          Below Origin (c &lt; 0)
                        </motion.button>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Selected Point Quantity (Q):</span>
                          <span className="font-mono text-emerald-400 font-bold">{geoPointQ} Units</span>
                        </div>
                        <input
                          type="range" min={20} max={100} value={geoPointQ}
                          onChange={(e) => setGeoPointQ(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                          aria-label="Selected Point Quantity"
                        />
                      </div>

                      {/* SVG Diagram 3: Geometric Supply Ruler */}
                      <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                        <svg viewBox="0 0 280 140" className="w-full max-h-[130px]">
                          <line x1="30" y1="120" x2="260" y2="120" stroke="#475569" strokeWidth="2" />
                          <line x1="30" y1="10" x2="30" y2="120" stroke="#475569" strokeWidth="2" />
                          <text x="260" y="132" fill="#94a3b8" fontSize="8" textAnchor="end">Quantity (Q)</text>
                          <text x="25" y="15" fill="#94a3b8" fontSize="8" transform="rotate(-90 25,15)" textAnchor="end">Price (P)</text>

                          {/* Dynamic Supply Line based on intercept */}
                          <line
                            x1={geoInterceptY < 0 ? 30 - geoInterceptY * 1.2 : 30}
                            y1={geoInterceptY >= 0 ? 120 - geoInterceptY * 1.5 : 120}
                            x2="250"
                            y2={Math.max(15, 120 - (geoInterceptY * 1.5 + 85))}
                            stroke={geoInterceptY > 0 ? '#10b981' : geoInterceptY === 0 ? '#38bdf8' : '#f59e0b'}
                            strokeWidth="3"
                          />

                          {/* Origin Marker */}
                          <circle cx="30" cy="120" r="3" fill="#cbd5e1" />
                          <text x="22" y="132" fill="#94a3b8" fontSize="8">O</text>

                          {/* Point P on curve */}
                          <circle cx="160" cy={120 - (geoInterceptY * 0.8 + 45)} r="4" fill="#ec4899" />
                          <text x="165" y={115 - (geoInterceptY * 0.8 + 45)} fill="#ec4899" fontSize="8" fontWeight="bold">Point P</text>
                        </svg>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <h4 className="text-xs font-bold uppercase text-slate-300 mb-2">Geometric Segment Ratio (PA / PB)</h4>
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Point Coordinates:</span>
                          <span className="text-white">P = ({geoPointQ}, ₹{geometricResult.currentPrice})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Intercept with Y-axis (c):</span>
                          <span className="text-cyan-400 font-bold">{geoInterceptY}</span>
                        </div>
                        <div className="border-t border-slate-800 pt-2 flex justify-between text-sm">
                          <span className="text-emerald-400 font-bold">Calculated Es:</span>
                          <span className="text-emerald-300 font-black">{geometricResult.esValue}</span>
                        </div>
                        <div className="text-[11px] text-amber-300 pt-1">
                          Classification: <strong className="text-white">{geometricResult.classification}</strong>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 mt-2">
                        *Rule: Intercept on Y-axis above origin &rarr; Es &gt; 1; Through (0,0) &rarr; Es = 1; Positive X-intercept &rarr; Es &lt; 1.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE: BRILLIANT OBSERVATION QUESTIONS ���────────────────────────── */}
      {phase === 'observe' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                🔍 Step 2: What Did You Notice? ({currentObservationIdx + 1} of {OBSERVATION_QUESTIONS.length})
              </span>
              <span className="text-xs text-slate-400 font-mono">Brilliant.org Observation Check</span>
            </div>
            <p className="text-sm text-slate-200">Reflect on the patterns that emerged during your laboratory simulations.</p>
          </div>

          <div className="p-5 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-white">{OBSERVATION_QUESTIONS[currentObservationIdx].question}</h3>

            {/* Observable options recap */}
            {OBSERVATION_QUESTIONS[currentObservationIdx].observableOptions && (
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                <span className="font-bold text-cyan-300 block mb-1">Key Observable Patterns:</span>
                {OBSERVATION_QUESTIONS[currentObservationIdx].observableOptions.map((obs, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-400">
                    <span className="text-emerald-400">✔</span>
                    <span>{obs}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2.5">
              {OBSERVATION_QUESTIONS[currentObservationIdx].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleObservationChoice(i)}
                  disabled={observationAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    observationAnswered && i === OBSERVATION_QUESTIONS[currentObservationIdx].correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : observationAnswered && i === selectedObservation && i !== OBSERVATION_QUESTIONS[currentObservationIdx].correctIndex
                      ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {observationAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className="text-xs text-slate-300">
                  <strong className="text-cyan-400">Key Takeaway: </strong>
                  {OBSERVATION_QUESTIONS[currentObservationIdx].explanation}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNextObservation}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-cyan-950"
                >
                  {currentObservationIdx < OBSERVATION_QUESTIONS.length - 1 ? 'Next Observation Check →' : 'Proceed to Sandbox Mode →'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX PLAY ──────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-emerald-300">Free Market Sandbox — Ungraded Exploration</h3>
            <p className="text-slate-300 text-sm mt-1">Manipulate all parameters across consumer cross-elasticities and producer supply curves freely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase text-emerald-400">Mandi Price &amp; Supply Simulation</h4>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Mandi Price: ₹{simSupplyPrice}/q</span>
                <span className="text-slate-400">Output: {(simSupplyPrice * 1.5).toFixed(0)}q</span>
              </div>
              <input
                type="range" min={10} max={100} value={simSupplyPrice}
                onChange={(e) => setSimSupplyPrice(Number(e.target.value))}
                className="w-full accent-emerald-500"
                aria-label="Mandi Price"
              />
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div className="h-full bg-emerald-500" animate={{ width: `${simSupplyPrice}%` }} />
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase text-cyan-400">Income Elasticity Slider</h4>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Household Income:</span>
                <span className="font-mono text-cyan-300">₹{householdIncome.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range" min={8000} max={80000} step={4000} value={householdIncome}
                onChange={(e) => handleIncomeSlider(Number(e.target.value))}
                className="w-full accent-cyan-500"
                aria-label="Household Income"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-950 flex items-center gap-2 text-base"
            >
              Start Competency Challenges →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (20+ NEP 2020 COMPETENCY CHALLENGES) ────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={360} height={26} className="w-full rounded-lg border border-slate-800" />

          {/* Progress and Level Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Challenge</span>
              <span className="text-base font-black text-white">{currentChallenge + 1}</span>
              <span className="text-xs text-slate-500">of {filteredChallenges.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase tracking-wider">
                {challenge.competencyLevel}
              </span>
              <motion.span
                key={challenge.difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                  challenge.difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border-emerald-700' :
                  challenge.difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border-rose-700' :
                  'bg-cyan-950 text-cyan-400 border-cyan-700'
                }`}
              >
                {challenge.difficulty}
              </motion.span>
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className={`p-5 rounded-2xl border transition-all duration-300 ${
            wrongFlash ? 'bg-rose-950/40 border-rose-600' : 'bg-slate-800/70 border-slate-700'
          }`}>
            <h3 className="text-base font-bold text-white mb-4 leading-relaxed">{challenge.question}</h3>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) WITH SHAKE ANIMATION */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: DRAG LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, idx) => (
                    <div
                      key={idx}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-center items-center min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400 mb-1">Target Zone {idx + 1}</span>
                      <span className="text-sm font-bold text-emerald-400">{droppedLabels[item.targetId] || 'Drop Label Here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm"
                >
                  Validate Placements
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder items into the correct logical economic sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
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
                    className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-xs">{displayIdx + 1}</span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm mt-2"
                >
                  Verify Logical Sequence
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC INPUT */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="0.01"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500 w-52"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl text-sm"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT FORMULA */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-emerald-400 border border-slate-700 rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-md text-xs font-mono font-bold flex items-center gap-1">
                      {part}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 hover:text-rose-200">×</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click tokens above to assemble the equation</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm"
                >
                  Verify Constructed Function
                </motion.button>
              </div>
            )}

            {/* Explanation & Progressive Step Disclosure */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-emerald-950/40 border border-emerald-800 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step-by-Step Economic Explanation:</h4>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-slate-200 text-xs leading-relaxed">
                    <span className="font-bold text-emerald-400 font-mono mr-1">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex items-center gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-700/50"
                    >
                      Show Next Step &rarr;
                    </motion.button>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK & REFLECTION ───────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="text-center p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-700 rounded-3xl shadow-xl">
            <span className="text-5xl mb-3 block">🏆</span>
            <h2 className="text-2xl font-black text-white mb-1">ISC Economics Mastery Attained!</h2>
            <p className="text-sm text-emerald-400 font-semibold mb-4">Cross Elasticity, Income Shifts, &amp; Mandi Supply Mechanisms</p>

            <div className="flex justify-center gap-6 text-center my-4">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[100px]">
                <div className="text-2xl font-black text-white">{Math.max(0, 100 - errors * 5)}%</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Accuracy Score</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[100px]">
                <div className="text-2xl font-black text-emerald-400 capitalize">{masteryLevel}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Mastery Level</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[100px]">
                <div className="text-2xl font-black text-cyan-400 font-mono">10 Nodes</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Coverage</div>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK SECTION (EXACT ERROR-BASED MESSAGES) */}
          <div className="p-5 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-600/60 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {errors === 0 ? '🌟' : errors <= 3 ? '👏' : errors <= 7 ? '💪' : '🎯'}
              </span>
              <div>
                <h3 className="text-lg font-black text-white tracking-wide">
                  {errors === 0
                    ? 'PERFECT SCORE!'
                    : errors <= 3
                    ? 'Great work!'
                    : errors <= 7
                    ? 'Good effort!'
                    : 'Do not give up — You WILL get this!'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {errors === 0
                    ? 'Flawless performance across all elasticity and supply principles.'
                    : errors <= 3
                    ? 'You demonstrated strong analytical precision and conceptual depth.'
                    : errors <= 7
                    ? 'Good conceptual foundation. With targeted practice on curve shifts, you will reach top tier.'
                    : 'Economics mastery takes repetition. Review the step explanations and try again!'}
                </p>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧠</span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Post-Simulation Reflection</h3>
            </div>
            <p className="text-xs text-slate-300">Take a moment to solidify your understanding with these reflection prompts:</p>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700/80 space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflections.surprising}
                  onChange={(e) => setReflections(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g., How hoarded stock directly impacts active supply and mandi clearing prices..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700/80 space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflections.explain}
                  onChange={(e) => setReflections(r => ({ ...r, explain: e.target.value }))}
                  placeholder="e.g., Substitutes move together in cross-price, while supply shifts whenever input costs or technology change..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700/80 space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflections.realLife}
                  onChange={(e) => setReflections(r => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g., Pricing mobile subscriptions, evaluating GST tax incidence, or analyzing agricultural commodity hoarding..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 border border-rose-800/60 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">Targeted Diagnostic Misconception Profile:</h4>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions?.[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">❌ Trap: {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 rounded-2xl border border-indigo-700/50 flex flex-wrap justify-between items-center gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <span className="font-black text-white uppercase tracking-wider">SM-2 Spaced Repetition Schedule</span>
              </div>
              <p className="text-slate-300">
                Next Review Recommendation: <strong className="text-emerald-400 text-sm">{errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Rule: 0 errors &rarr; 7 days | 1–3 errors &rarr; 3 days | 4+ errors &rarr; 1 day (Optimized for long-term memory retention).
              </p>
            </div>
            <div className="px-4 py-2 bg-indigo-950/80 border border-indigo-500/50 rounded-xl text-center">
              <span className="block text-xs uppercase font-bold text-indigo-300">SRS Interval</span>
              <span className="text-lg font-black text-white">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</span>
            </div>
          </div>

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>💼</span> {REAL_WORLD_ACTIVITY.title}
            </h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE MODAL COMPONENTS ─────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ISC Economics Mastery Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_EconomicsCrossElasticityDemandSim;
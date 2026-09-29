'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE MAP
// ==========================================

const ALL_NODE_IDS = [
  'c12_eco_cbse_263',
  'c12_eco_cbse_264',
  'c12_eco_cbse_265',
  'c12_eco_cbse_266',
  'c12_eco_cbse_267',
  'c12_eco_cbse_268',
  'c12_eco_cbse_269',
  'c12_eco_cbse_270',
  'c12_eco_cbse_271',
  'c12_eco_cbse_272',
  'c12_eco_cbse_273',
  'c12_eco_cbse_274',
  'c12_eco_cbse_275',
  'c12_eco_cbse_276',
  'c12_eco_cbse_277',
  'c12_eco_cbse_278',
  'c12_eco_cbse_279',
  'c12_eco_cbse_280',
  'c12_eco_cbse_281',
  'c12_eco_cbse_282',
  'c12_eco_cbse_283',
  'c12_eco_cbse_284',
  'c12_eco_cbse_285',
  'c12_eco_cbse_286',
  'c12_eco_cbse_287',
  'c12_eco_cbse_288',
  'c12_eco_cbse_289',
  'c12_eco_cbse_290',
  'c12_eco_cbse_291',
  'c12_eco_cbse_292',
  'c12_eco_cbse_293',
  'c12_eco_cbse_294',
  'c12_eco_cbse_295',
  'c12_eco_cbse_296',
  'c12_eco_cbse_297',
  'c12_eco_cbse_298',
  'c12_eco_cbse_299',
  'c12_eco_cbse_300',
  'c12_eco_cbse_301',
  'c12_eco_cbse_302',
  'c12_eco_cbse_303',
  'c12_eco_cbse_304',
  'c12_eco_cbse_305',
  'c12_eco_cbse_306',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// SECTION 1: SCENARIO
const SCENARIO = {
  title: "The Consumer Choice & Market Dynamics Lab",
  intro: "Step into the shoes of a Chief Behavioural Economist analyzing consumer decision-making in digital retail platforms. You will evaluate how income changes, price swings, and consumer preference shifts govern total utility, demand elasticity, and market equilibrium.",
  context: "Using utility curves, indifference maps, budget constraints, and elasticity equations, discover how rational consumers maximize satisfaction and how aggregate market demand curves are derived.",
};

// SECTION 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: "If a consumer spends their entire budget on two goods X and Y, and the price of Good X falls, under what rare circumstance will the consumer actually BUY LESS of Good X?",
  options: [
    "When Good X is a normal good with high income elasticity",
    "When Good X is a Giffen good where the negative income effect outweighs the substitution effect",
    "When Good X has perfect linear indifference curves with Good Y",
    "When price elasticity of demand for Good X is exactly unitary (|Ed| = 1)",
  ],
  correctIndex: 1,
  hintAfter: "Giffen goods are extreme inferior goods where the income effect (buying less as real purchasing power rises due to price drop) dominates the substitution effect (buying more because it is cheaper).",
};

// SECTION 3: EXPLORATION_STEPS
const EXPLORATION_STEPS = [
  {
    title: "Lab 1: Diminishing Marginal Utility & Equi-Marginal Principle",
    instruction: "Adjust the consumption units of Goods X and Y to observe how Total Utility (TU) peaks when Marginal Utility (MU) reaches zero, and find where MUx / Px = MUy / Py.",
    interactionType: "cardinal-utility-slider",
    nodeId: "c12_eco_cbse_268" as NodeId,
  },
  {
    title: "Lab 2: Indifference Map & Tangency Equilibrium",
    instruction: "Change income (M) and prices (Px, Py) to find the tangency point where the Marginal Rate of Substitution (MRS_xy) equals the price ratio (Px/Py).",
    interactionType: "indifference-budget-tangency",
    nodeId: "c12_eco_cbse_285" as NodeId,
  },
  {
    title: "Lab 3: Price Consumption Curve & Deriving Demand",
    instruction: "Vary the price of Good X while keeping income and Py constant. Observe how the optimal consumption bundle traces the Price Consumption Curve (PCC) to form the Demand Curve.",
    interactionType: "pcc-demand-derivation",
    nodeId: "c12_eco_cbse_288" as NodeId,
  },
  {
    title: "Lab 4: Geometric Point Elasticity & Outlay Method",
    instruction: "Slide a point along a linear demand curve to measure Point Elasticity (Lower Segment / Upper Segment) and verify how Total Expenditure reacts to price changes.",
    interactionType: "geometric-elasticity-slider",
    nodeId: "c12_eco_cbse_300" as NodeId,
  },
  {
    title: "Lab 5: Horizontal Summation for Market Demand",
    instruction: "Combine individual consumer demand curves (Consumer A + Consumer B) horizontally at each price level to build the overall Market Demand curve.",
    interactionType: "market-demand-summation",
    nodeId: "c12_eco_cbse_297" as NodeId,
  },
];

// SECTION 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question: "Predict: What happens to the budget line if the price of Good X doubles while income and the price of Good Y remain constant?",
    options: [
      "The budget line shifts outward parallelly to the right",
      "The budget line pivots inward along the X-axis, making the slope steeper (-Px/Py increases in steepness)",
      "The budget line pivots outward along the Y-axis",
      "The budget line remains completely unchanged",
    ],
    correctIndex: 1,
    verifyInstruction: "Test this in Lab 2 by doubling Px while holding M and Py fixed.",
    nodeId: "c12_eco_cbse_284" as NodeId,
  },
  {
    question: "Predict: If demand for a product is inelastic (|Ed| < 1), what happens to total expenditure when its price increases?",
    options: [
      "Total expenditure decreases",
      "Total expenditure increases",
      "Total expenditure remains constant",
      "Total expenditure drops to zero immediately",
    ],
    correctIndex: 1,
    verifyInstruction: "In Lab 4, select the inelastic region of the linear demand curve (lower half) and increase price.",
    nodeId: "c12_eco_cbse_303" as NodeId,
  },
];

// SECTION 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question: "What do you notice about the value of Marginal Utility (MU) at the exact point where Total Utility (TU) reaches its maximum?",
    observableOptions: [
      "MU is at its maximum positive value",
      "MU is equal to 1",
      "MU is exactly zero",
      "MU becomes negative",
    ],
    correctIndex: 2,
    nodeId: "c12_eco_cbse_266" as NodeId,
  },
  {
    question: "What happens to point price elasticity along a straight-line (linear) demand curve as you move from the midpoint down towards the X-axis intercept?",
    observableOptions: [
      "Elasticity increases from 1 to infinity",
      "Elasticity remains constant at 1 throughout",
      "Elasticity decreases from 1 towards 0",
      "Elasticity oscillates between 0 and 5",
    ],
    correctIndex: 2,
    nodeId: "c12_eco_cbse_299" as NodeId,
  },
];

// SECTION 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: "Pricing Strategy & Elasticity Analysis for a Streaming Service",
  description: "As a lead pricing analyst for a digital subscription platform in India (e.g., streaming service), determine optimal monthly pricing based on consumer demand functions and elasticity calculations.",
  steps: [
    "Given linear demand curve equation: Qd = 500,000 - 1,000 * P (where P is monthly subscription price in INR).",
    "Calculate quantity demanded and total revenue (TR = P * Q) at price levels: ₹100, ₹250, ₹400, and ₹500.",
    "Calculate point elasticity at P = ₹250 using formula Ed = (-b) * (P / Q).",
    "Determine revenue-maximizing price point where Ed = -1 (midpoint of linear demand curve: P = a / 2b).",
  ],
};

// SECTION 7: MISCONCEPTIONS
const MISCONCEPTIONS = [
  {
    id: "m1",
    misconception: "Total utility increases as long as marginal utility is declining.",
    correction: "Total utility increases as long as marginal utility is POSITIVE (even if declining). Once marginal utility becomes negative, total utility decreases.",
    nodeId: "c12_eco_cbse_267" as NodeId,
  },
  {
    id: "m2",
    misconception: "Two indifference curves can intersect at higher income levels.",
    correction: "Indifference curves can NEVER intersect because intersecting ICs would violate the transitive property of preferences and the principle of monotonic preferences.",
    nodeId: "c12_eco_cbse_280" as NodeId,
  },
  {
    id: "m3",
    misconception: "Elasticity is constant along a linear straight-line demand curve.",
    correction: "Slope is constant along a linear demand curve, but price elasticity (Ed = dq/dp * p/q) varies continuously from infinity at the Y-intercept to 0 at the X-intercept.",
    nodeId: "c12_eco_cbse_299" as NodeId,
  },
  {
    id: "m4",
    misconception: "A change in price causes a shift of the demand curve.",
    correction: "A change in own price causes a MOVEMENT along the demand curve (change in quantity demanded). Only non-price factors (income, tastes, substitute prices) SHIFT the curve.",
    nodeId: "c12_eco_cbse_296" as NodeId,
  },
  {
    id: "m5",
    misconception: "All inferior goods are Giffen goods.",
    correction: "All Giffen goods are inferior goods, but not all inferior goods are Giffen goods. A Giffen good requires the negative income effect to be stronger than the substitution effect.",
    nodeId: "c12_eco_cbse_293" as NodeId,
  },
  {
    id: "m6",
    misconception: "If price elasticity is zero, demand curve is horizontal.",
    correction: "Zero elasticity (|Ed| = 0) represents Perfectly Inelastic demand, which is a VERTICAL line. A horizontal demand curve represents Perfectly Elastic demand (|Ed| = ∞).",
    nodeId: "c12_eco_cbse_301" as NodeId,
  },
];

// SECTION 8: DIAGNOSTIC QUESTIONS
const DIAGNOSTIC_QUESTIONS = [
  {
    id: "diag1",
    question: "When Marginal Utility is zero, Total Utility is:",
    options: ["Zero", "Minimum", "Maximum", "Negative"],
    correctIndex: 2,
    nodeId: "c12_eco_cbse_266" as NodeId,
  },
  {
    id: "diag2",
    question: "The slope of an Indifference Curve is given by:",
    options: ["Marginal Utility of X", "Price Ratio (Px/Py)", "Marginal Rate of Substitution (MRS_xy)", "Total Utility ratio"],
    correctIndex: 2,
    nodeId: "c12_eco_cbse_273" as NodeId,
  },
  {
    id: "diag3",
    question: "The budget line equation for two goods X and Y with income M is:",
    options: ["Px*X + Py*Y = M", "Px/Py = M", "X + Y = M", "Px*Py = M"],
    correctIndex: 0,
    nodeId: "c12_eco_cbse_282" as NodeId,
  },
  {
    id: "diag4",
    question: "Consumer equilibrium in ordinal utility approach is achieved where:",
    options: ["MRS_xy > Px/Py", "MRS_xy < Px/Py", "MRS_xy = Px/Py", "MUx = MUy"],
    correctIndex: 2,
    nodeId: "c12_eco_cbse_285" as NodeId,
  },
  {
    id: "diag5",
    question: "Point elasticity at the midpoint of a linear demand curve is:",
    options: ["0", "1", "Infinity", "Greater than 1"],
    correctIndex: 1,
    nodeId: "c12_eco_cbse_300" as NodeId,
  },
  {
    id: "diag6",
    question: "If price of Good X rises and demand for Good Y rises, Goods X and Y are:",
    options: ["Complements", "Substitutes", "Inferior", "Giffen"],
    correctIndex: 1,
    nodeId: "c12_eco_cbse_294" as NodeId,
  },
  {
    id: "diag7",
    question: "Market demand curve is obtained by:",
    options: ["Vertical summation of individual demand curves", "Horizontal summation of individual demand curves", "Multiplying individual demand curves", "Averaging individual demand curves"],
    correctIndex: 1,
    nodeId: "c12_eco_cbse_297" as NodeId,
  },
  {
    id: "diag8",
    question: "When price falls and total expenditure increases, elasticity of demand is:",
    options: ["Less than 1", "Equal to 1", "Greater than 1", "Zero"],
    correctIndex: 2,
    nodeId: "c12_eco_cbse_303" as NodeId,
  },
];

// SECTION 9: CHALLENGES (22 challenges across foundation, standard, advanced)
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple_choice' | 'numeric' | 'matching' | 'drag_sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'Recall' | 'Understanding' | 'Application' | 'Analysis' | 'Evaluation' | 'Creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  matchingPairs?: { left: string; right: string }[];
  sortItems?: string[];
  correctOrder?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'ch1',
    nodeId: 'c12_eco_cbse_263',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the fundamental assumption regarding consumer behavior in economic theory?',
    options: [
      'The consumer acts impulsively to spend all income immediately',
      'The consumer is rational and seeks to maximize total utility given income and prices',
      'The consumer always prefers equal quantities of all available goods',
      'The consumer minimizes total expenditure regardless of satisfaction'
    ],
    correctIndex: 1,
    explanation: 'Economics assumes rational consumer behavior: consumers make choices aimed at maximizing satisfaction (utility) subject to their budget constraint.',
    hints: [
      'Think about what goal a smart buyer tries to achieve with limited money.',
      'Rationality implies utility maximization.',
      'Consumers aim to get maximum satisfaction within budget boundaries.'
    ]
  },
  {
    id: 'ch2',
    nodeId: 'c12_eco_cbse_266',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is Total Utility (TU)?',
    options: [
      'The satisfaction derived from consuming one additional unit',
      'The sum total of satisfaction obtained from consuming all units of a commodity',
      'The price paid for consuming a given quantity',
      'The ratio of marginal utility to price'
    ],
    correctIndex: 1,
    explanation: 'Total Utility (TU) is the aggregate satisfaction obtained from consuming a specific total quantity of a good or service.',
    hints: [
      'Consider aggregate vs incremental satisfaction.',
      'Total utility sums up utility across all consumed units.',
      'TU = MU1 + MU2 + ... + MUn.'
    ]
  },
  {
    id: 'ch3',
    nodeId: 'c12_eco_cbse_268',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'The Law of Diminishing Marginal Utility states that as consumption of a commodity increases:',
    options: [
      'Total utility continuously decreases',
      'Marginal utility derived from each successive unit decreases',
      'Marginal utility remains constant',
      'Price of the commodity decreases'
    ],
    correctIndex: 1,
    explanation: 'The Law of Diminishing Marginal Utility states that as a consumer consumes more units of a commodity, the additional satisfaction (MU) from each extra unit declines.',
    hints: [
      'Think of eating slices of pizza when hungry.',
      'The 1st slice gives huge joy; the 5th slice gives much less joy.',
      'Each successive unit adds less utility than the previous one.'
    ]
  },
  {
    id: 'ch4',
    nodeId: 'c12_eco_cbse_272',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'An Indifference Curve (IC) represents bundles of two goods that give the consumer:',
    options: [
      'Different levels of satisfaction',
      'The exact same level of total satisfaction',
      'Maximum income outlay',
      'Zero total utility'
    ],
    correctIndex: 1,
    explanation: 'An indifference curve represents all combinations of two goods that provide equal satisfaction (utility) to the consumer.',
    hints: [
      'Why is it called "indifference"?',
      'The consumer is indifferent between any two points on the same curve.',
      'All points on IC yield equal total utility.'
    ]
  },
  {
    id: 'ch5',
    nodeId: 'c12_eco_cbse_283',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'The slope of a budget line is mathematically equal to:',
    options: [
      '- MUx / MUy',
      '- Px / Py',
      '- Py / Px',
      '- Income / Px'
    ],
    correctIndex: 1,
    explanation: 'The slope of the budget line measures the rate at which market allows substitution between two goods, given by - (Px / Py).',
    hints: [
      'Budget line equation is Px*X + Py*Y = M.',
      'Rearrange for Y: Y = (M/Py) - (Px/Py)*X.',
      'The coefficient of X is -Px/Py.'
    ]
  },
  {
    id: 'ch6',
    nodeId: 'c12_eco_cbse_289',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The Law of Demand states that, ceteris paribus, there is an inverse relationship between:',
    options: [
      'Income and quantity demanded',
      'Price of a commodity and its quantity demanded',
      'Price of substitutes and quantity demanded of original good',
      'Supply and demand of a commodity'
    ],
    correctIndex: 1,
    explanation: 'The Law of Demand states that keeping other factors constant, when price increases, quantity demanded decreases, and vice-versa.',
    hints: [
      'What happens when prices go up at a store?',
      'Higher price leads to lower demand.',
      'Inverse relationship between P and Q.'
    ]
  },
  {
    id: 'ch7',
    nodeId: 'c12_eco_cbse_301',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'A vertical demand curve parallel to the price axis represents demand that is:',
    options: [
      'Perfectly elastic (|Ed| = ∞)',
      'Unitary elastic (|Ed| = 1)',
      'Perfectly inelastic (|Ed| = 0)',
      'Relatively elastic (|Ed| > 1)'
    ],
    correctIndex: 2,
    explanation: 'A vertical demand curve means quantity demanded remains unchanged regardless of price change, so price elasticity of demand is zero (|Ed| = 0).',
    hints: [
      'Vertical line means delta Q = 0.',
      'Ed = % delta Q / % delta P.',
      'If delta Q is 0, Ed is zero (perfectly inelastic).'
    ]
  },

  // --- STANDARD (8) ---
  {
    id: 'ch8',
    nodeId: 'c12_eco_cbse_270',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A consumer buys two goods X and Y. Price of X is ₹10 and Price of Y is ₹5. If MUy is 20 utils, what must MUx be at cardinal equilibrium?',
    correctAnswer: 40,
    tolerance: 0.1,
    explanation: 'Equi-marginal utility condition: MUx / Px = MUy / Py. Thus MUx / 10 = 20 / 5 = 4 => MUx = 40 utils.',
    hints: [
      'Use the formula MUx / Px = MUy / Py.',
      'MUy / Py = 20 / 5 = 4.',
      'MUx = 4 * Px = 4 * 10 = 40.'
    ]
  },
  {
    id: 'ch9',
    nodeId: 'c12_eco_cbse_273',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A consumer is on indifference curve where MRS_xy = 3. If price of X is ₹15 and price of Y is ₹5, is the consumer in equilibrium? Calculate the slope of budget line (absolute value Px/Py).',
    correctAnswer: 3,
    tolerance: 0.1,
    explanation: 'Absolute slope of budget line = Px / Py = 15 / 5 = 3. Since MRS_xy (3) = Px/Py (3), the consumer IS in equilibrium!',
    hints: [
      'Calculate price ratio Px / Py.',
      '15 divided by 5 equals 3.',
      'Compare 3 with given MRS of 3.'
    ]
  },
  {
    id: 'ch10',
    nodeId: 'c12_eco_cbse_282',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A consumer has income M = ₹200 to spend on Good X (Px = ₹20) and Good Y (Py = ₹10). What is the maximum quantity of Good Y the consumer can buy if X = 0?',
    correctAnswer: 20,
    tolerance: 0.1,
    explanation: 'Y-intercept of budget line = M / Py = 200 / 10 = 20 units.',
    hints: [
      'Budget line equation: Px*X + Py*Y = M.',
      'Set X = 0.',
      'Y = M / Py = 200 / 10 = 20.'
    ]
  },
  {
    id: 'ch11',
    nodeId: 'c12_eco_cbse_298',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'When price of a commodity falls from ₹20 to ₹16, quantity demanded rises from 100 units to 140 units. Calculate absolute price elasticity of demand (|Ed|).',
    correctAnswer: 2.0,
    tolerance: 0.1,
    explanation: '%ΔQ = (40 / 100) * 100 = 40%. %ΔP = (-4 / 20) * 100 = -20%. |Ed| = 40% / 20% = 2.0.',
    hints: [
      'Formula: |Ed| = (ΔQ / ΔP) * (P / Q).',
      'ΔQ = 140 - 100 = 40. ΔP = 4.',
      '|Ed| = (40 / 4) * (20 / 100) = 10 * 0.2 = 2.0.'
    ]
  },
  {
    id: 'ch12',
    nodeId: 'c12_eco_cbse_294',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'If the price of Tea increases, leading to an increase in demand for Coffee, Tea and Coffee are:',
    options: [
      'Complementary Goods',
      'Substitute Goods',
      'Inferior Goods',
      'Unrelated Goods'
    ],
    correctIndex: 1,
    explanation: 'Substitute goods are goods consumed in place of one another. An increase in price of one increases demand for the other (positive cross-price elasticity).',
    hints: [
      'If tea gets expensive, people switch to coffee.',
      'They replace each other.',
      'Positive cross price elasticity defines substitute goods.'
    ]
  },
  {
    id: 'ch13',
    nodeId: 'c12_eco_cbse_295',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'When price of Good X falls, consumer buys more Good X because it is relatively cheaper than Good Y. This mechanism is called:',
    options: [
      'Income Effect',
      'Substitution Effect',
      'Bandwagon Effect',
      'Snob Effect'
    ],
    correctIndex: 1,
    explanation: 'The substitution effect measures the change in consumption of a good due to a change in its relative price, holding real purchasing power constant.',
    hints: [
      'It involves substituting the cheaper good for the relatively expensive good.',
      'Holding real utility constant while prices change.',
      'This is the Substitution Effect.'
    ]
  },
  {
    id: 'ch14',
    nodeId: 'c12_eco_cbse_297',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In a market with 2 consumers, Consumer A demand curve is Qa = 20 - 2P and Consumer B demand curve is Qb = 30 - 3P. At Price P = ₹4, calculate total Market Demand Qm.',
    correctAnswer: 38,
    tolerance: 0.1,
    explanation: 'At P = 4: Qa = 20 - 2(4) = 12. Qb = 30 - 3(4) = 18. Market demand Qm = Qa + Qb = 12 + 18 = 38 units.',
    hints: [
      'Market demand is the horizontal sum: Qm = Qa + Qb.',
      'Qa at P=4 is 20 - 8 = 12.',
      'Qb at P=4 is 30 - 12 = 18. Sum = 38.'
    ]
  },
  {
    id: 'ch15',
    nodeId: 'c12_eco_cbse_303',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'If a 10% decrease in price leads to a 10% increase in total expenditure, the price elasticity of demand is:',
    options: [
      'Equal to 1 (Unitary)',
      'Greater than 1 (Elastic)',
      'Less than 1 (Inelastic)',
      'Zero'
    ],
    correctIndex: 1,
    explanation: 'Under Total Expenditure method: If price falls and Total Expenditure INCREASES, demand is elastic (|Ed| > 1).',
    hints: [
      'Remember outlay rules: Price falls & TE rises => Elastic.',
      'Price falls & TE constant => Unitary.',
      'Price falls & TE falls => Inelastic.'
    ]
  },

  // --- ADVANCED (7) ---
  {
    id: 'ch16',
    nodeId: 'c12_eco_cbse_293',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why does the demand curve for a Giffen Good slope UPWARD (violating the Law of Demand)?',
    options: [
      'Because positive substitution effect is greater than negative income effect',
      'Because negative income effect is STRONGER than positive substitution effect',
      'Because consumer preferences are non-monotonic',
      'Because cross elasticity of demand is infinite'
    ],
    correctIndex: 1,
    explanation: 'For a Giffen good (an extreme inferior good), when price falls, the increase in real income causes such a strong decrease in demand (negative income effect) that it overpowers the positive substitution effect.',
    hints: [
      'Giffen goods are extreme inferior goods.',
      'Substitution effect makes you buy more when price falls.',
      'Income effect makes you buy LESS when real income rises. For Giffen, Income effect > Substitution effect.'
    ]
  },
  {
    id: 'ch17',
    nodeId: 'c12_eco_cbse_300',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'On a linear demand curve intersecting price axis at point A (P = 50) and quantity axis at point B (Q = 100), calculate point elasticity |Ed| at point C where Price P = ₹35.',
    correctAnswer: 2.33,
    tolerance: 0.1,
    explanation: 'At P = 35, Q = 100 - (100/50)*35 = 30. Lower segment length/Upper segment length = (100 - 30) / 30 = 70 / 30 ≈ 2.33 (or using Ed = (dQ/dP)*(P/Q) = 2 * (35/30) = 70/30 = 2.33).',
    hints: [
      'Point elasticity = Lower segment / Upper segment OR Ed = (dQ/dP)*(P/Q).',
      'dQ/dP = 100 / 50 = 2.',
      'Ed = 2 * (35 / 30) = 70 / 30 = 2.33.'
    ]
  },
  {
    id: 'ch18',
    nodeId: 'c12_eco_cbse_306',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Application',
    question: 'Given linear demand function Qd = 120 - 4P, at what price level is total revenue (or consumer total expenditure) MAXIMIZED?',
    correctAnswer: 15,
    tolerance: 0.1,
    explanation: 'Total revenue TR = P * Q = 120P - 4P^2. Set dTR/dP = 120 - 8P = 0 => P = 15. This is also the midpoint of linear demand curve where |Ed| = 1.',
    hints: [
      'Total expenditure / revenue is maximized at the midpoint of linear demand curve.',
      'Price intercept is when Q=0 => 4P = 120 => P = 30.',
      'Midpoint price is P = 30 / 2 = 15.'
    ]
  },
  {
    id: 'ch19',
    nodeId: 'c12_eco_cbse_276',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'If two goods X and Y are PERFECT SUBSTITUTES, what is the shape of the Indifference Curve and what happens to MRS_xy?',
    options: [
      'L-shaped IC; MRS_xy is zero everywhere',
      'Straight line downward sloping; MRS_xy is constant',
      'Convex to origin; MRS_xy is diminishing',
      'Concave to origin; MRS_xy is increasing'
    ],
    correctIndex: 1,
    explanation: 'Perfect substitutes have a constant marginal rate of substitution (MRS_xy = constant), resulting in a straight-line downward sloping indifference curve.',
    hints: [
      'Can you trade 1 unit of X for 1 unit of Y at a fixed rate always?',
      'If trade-off rate never changes, slope is constant.',
      'Constant slope means linear (straight line) IC.'
    ]
  },
  {
    id: 'ch20',
    nodeId: 'c12_eco_cbse_277',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'For PERFECT COMPLEMENTS (like left shoes and right shoes), what is the shape of the Indifference Curve?',
    options: [
      'Straight line downward sloping',
      'L-shaped (right-angled) indifference curves',
      'Circular around origin',
      'Horizontal line parallel to X axis'
    ],
    correctIndex: 1,
    explanation: 'Perfect complements are consumed in fixed proportions. Adding more of one good without the other adds zero utility, producing L-shaped (right-angled) indifference curves.',
    hints: [
      'Having 1 left shoe and 5 right shoes gives same utility as 1 pair.',
      'The corner of the L shape represents the optimal ratio.',
      'Hence, L-shaped indifference curves.'
    ]
  },
  {
    id: 'ch21',
    nodeId: 'c12_eco_cbse_285',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Suppose MRS_xy = 4 while Px/Py = 2. How should a rational consumer adjust consumption of X and Y to reach optimal tangency equilibrium?',
    options: [
      'Increase Y and decrease X until MRS_xy falls to 2',
      'Increase X and decrease Y until MRS_xy falls to 2',
      'Decrease both X and Y simultaneously',
      'Do nothing because the consumer is already at maximum utility'
    ],
    correctIndex: 1,
    explanation: 'When MRS_xy (4) > Px/Py (2), the consumer values X more than the market price ratio. Consuming more X (and less Y) reduces MRS_xy due to diminishing MRS until MRS_xy = Px/Py = 2.',
    hints: [
      'MRS = willingness to sacrifice Y for X (4). Market asks sacrifice of 2 Y for X.',
      'X is worth more to the consumer than it costs in market!',
      'So buy MORE X and LESS Y.'
    ]
  },
  {
    id: 'ch22',
    nodeId: 'c12_eco_cbse_305',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Application',
    question: 'If price of Good A increases by 20% and quantity demanded of Good B decreases by 10%, calculate cross-price elasticity of demand (Exy).',
    correctAnswer: -0.5,
    tolerance: 0.05,
    explanation: 'Cross price elasticity Exy = (%ΔQ_B) / (%ΔP_A) = (-10%) / (+20%) = -0.5. (Negative cross elasticity indicates complementary goods).',
    hints: [
      'Formula: Exy = % change in Q_B / % change in P_A.',
      'Change in Q_B = -10%. Change in P_A = +20%.',
      '-10 / 20 = -0.5.'
    ]
  },
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Cardinal Utility Curves (TU & MU)
const UtilityCurveDiagram: React.FC<{ consumptionUnits: number }> = ({ consumptionUnits }) => {
  // Generate curve data points
  // TU = 12*Q - Q^2 (Max at Q=6, TU=36)
  // MU = 12 - 2*Q (Zero at Q=6)
  const points = [];
  for (let q = 0; q <= 10; q += 0.5) {
    const tu = Math.max(0, 12 * q - q * q);
    const mu = 12 - 2 * q;
    points.push({ q, tu, mu });
  }

  // Map coords: Q -> [40, 360], Utility -> [220, 20]
  const qToX = (q: number) => 40 + (q / 10) * 320;
  const tuToY = (tu: number) => 220 - (tu / 40) * 190;
  const muToY = (mu: number) => 220 - ((mu + 10) / 25) * 190;

  const tuPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${qToX(p.q)} ${tuToY(p.tu)}`).join(' ');
  const muPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${qToX(p.q)} ${muToY(p.mu)}`).join(' ');

  const currTu = Math.max(0, 12 * consumptionUnits - consumptionUnits * consumptionUnits);
  const currMu = 12 - 2 * consumptionUnits;

  const currX = qToX(consumptionUnits);
  const currTuY = tuToY(currTu);
  const currMuY = muToY(currMu);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-emerald-400">Total Utility (TU) & Marginal Utility (MU)</h4>
        <div className="flex items-center space-x-4 text-xs">
          <span className="flex items-center"><span className="w-3 h-3 bg-emerald-500 rounded-full mr-1 inline-block"></span> Total Utility</span>
          <span className="flex items-center"><span className="w-3 h-3 bg-amber-500 rounded-full mr-1 inline-block"></span> Marginal Utility</span>
        </div>
      </div>
      <svg width="100%" height="240" viewBox="0 0 400 240" className="overflow-visible">
        {/* Grid lines */}
        <line x1="40" y1="220" x2="380" y2="220" stroke="#475569" strokeWidth="2" />
        <line x1="40" y1="10" x2="40" y2="220" stroke="#475569" strokeWidth="2" />

        {/* Axis labels */}
        <text x="380" y="235" fill="#94a3b8" fontSize="10" textAnchor="end">Quantity (Q)</text>
        <text x="10" y="20" fill="#94a3b8" fontSize="10" textAnchor="start">Utility (Utils)</text>

        {/* TU Curve */}
        <path d={tuPath} fill="none" stroke="#10b981" strokeWidth="3" />
        {/* MU Curve */}
        <path d={muPath} fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4,4" />

        {/* Zero MU Reference Line */}
        <line x1="40" y1={muToY(0)} x2="380" y2={muToY(0)} stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
        <text x="45" y={muToY(0) - 4} fill="#64748b" fontSize="9">MU = 0 (Satiety Point)</text>

        {/* Peak TU marker */}
        <circle cx={qToX(6)} cy={tuToY(36)} r="4" fill="#10b981" />
        <line x1={qToX(6)} y1={tuToY(36)} x2={qToX(6)} y2="220" stroke="#10b981" strokeDasharray="2,2" />
        <text x={qToX(6)} y={tuToY(36) - 8} fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">Max TU (36)</text>

        {/* Current consumption point indicator */}
        <circle cx={currX} cy={currTuY} r="6" fill="#34d399" stroke="#ffffff" strokeWidth="2" />
        <circle cx={currX} cy={currMuY} r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
        <line x1={currX} y1="220" x2={currX} y2="10" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />

        <text x={currX} y={currTuY - 10} fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">TU: {currTu}</text>
        <text x={currX} y={currMuY + 15} fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">MU: {currMu}</text>
      </svg>
    </div>
  );
};

// Diagram 2: Indifference Curve Map & Budget Line Tangency
const IndifferenceBudgetDiagram: React.FC<{
  income: number;
  px: number;
  py: number;
  selectedX: number;
  setSelectedX: (val: number) => void;
}> = ({ income, px, py, selectedX, setSelectedX }) => {
  // Budget Line: Px*X + Py*Y = M => Y = (M - Px*X) / Py
  const maxX = income / px;
  const maxY = income / py;

  // Tangency point for Cobb-Douglas U = X*Y is X* = M / (2*Px), Y* = M / (2*Py)
  const optimalX = income / (2 * px);
  const optimalY = income / (2 * py);
  const optimalU = optimalX * optimalY;

  // Selected Y on budget line
  const selectedY = Math.max(0, (income - px * selectedX) / py);
  const selectedU = selectedX * selectedY;

  // Slope of budget line = - Px / Py
  const budgetSlope = (px / py).toFixed(2);
  // MRS_xy at selected bundle (for U = X*Y, MRS = Y / X)
  const currentMrs = selectedX > 0 ? (selectedY / selectedX).toFixed(2) : '∞';

  // Coordinate mapping (X: 0..30 -> 50..370, Y: 0..30 -> 210..20)
  const mapX = (x: number) => 50 + (x / 30) * 320;
  const mapY = (y: number) => 210 - (y / 30) * 190;

  // Curve generator for utility U = X * Y => Y = U / X
  const generateICPath = (uVal: number) => {
    const pts = [];
    for (let x = 0.5; x <= 30; x += 0.5) {
      const y = uVal / x;
      if (y <= 30) {
        pts.push(`${pts.length === 0 ? 'M' : 'L'} ${mapX(x)} ${mapY(y)}`);
      }
    }
    return pts.join(' ');
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-gold-400">Ordinal Consumer Equilibrium (Tangency Condition)</h4>
        <div className="text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700">
          Optimal Tangency: <span className="text-gold-300 font-bold">MRS_xy ({budgetSlope}) = Px/Py ({budgetSlope})</span>
        </div>
      </div>

      <svg width="100%" height="240" viewBox="0 0 400 240" className="overflow-visible">
        {/* Axes */}
        <line x1="50" y1="210" x2="380" y2="210" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="10" x2="50" y2="210" stroke="#475569" strokeWidth="2" />

        <text x="380" y="228" fill="#94a3b8" fontSize="10" textAnchor="end">Good X (Units)</text>
        <text x="15" y="20" fill="#94a3b8" fontSize="10" textAnchor="start">Good Y (Units)</text>

        {/* Indifference Map Curves (IC1, IC2 optimal, IC3) */}
        <path d={generateICPath(optimalU * 0.5)} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
        <text x={mapX(26)} y={mapY((optimalU * 0.5) / 26) - 4} fill="#38bdf8" fontSize="9" opacity="0.7">IC1</text>

        <path d={generateICPath(optimalU)} fill="none" stroke="#38bdf8" strokeWidth="3" />
        <text x={mapX(26)} y={mapY(optimalU / 26) - 4} fill="#38bdf8" fontSize="10" fontWeight="bold">IC2 (Optimal)</text>

        <path d={generateICPath(optimalU * 1.5)} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
        <text x={mapX(26)} y={mapY((optimalU * 1.5) / 26) - 4} fill="#38bdf8" fontSize="9" opacity="0.7">IC3</text>

        {/* Budget Line */}
        <line x1={mapX(0)} y1={mapY(maxY)} x2={mapX(maxX)} y2={mapY(0)} stroke="#f43f5e" strokeWidth="3" />

        {/* Optimal Equilibrium Tangency Point E */}
        <circle cx={mapX(optimalX)} cy={mapY(optimalY)} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        <text x={mapX(optimalX) + 8} y={mapY(optimalY) - 8} fill="#10b981" fontSize="11" fontWeight="bold">E (Equilibrium)</text>

        {/* Current user selected bundle point */}
        <circle cx={mapX(selectedX)} cy={mapY(selectedY)} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
        <line x1={mapX(selectedX)} y1="210" x2={mapX(selectedX)} y2={mapY(selectedY)} stroke="#f59e0b" strokeDasharray="2,2" />
        <line x1="50" y1={mapY(selectedY)} x2={mapX(selectedX)} y2={mapY(selectedY)} stroke="#f59e0b" strokeDasharray="2,2" />
      </svg>

      {/* Info bar below diagram */}
      <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-center">
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <div className="text-slate-400">Selected Bundle (X, Y)</div>
          <div className="text-amber-400 font-bold">({selectedX.toFixed(1)}, {selectedY.toFixed(1)})</div>
        </div>
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <div className="text-slate-400">MRS_xy (Y / X)</div>
          <div className="text-amber-400 font-bold">{currentMrs}</div>
        </div>
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <div className="text-slate-400">Price Ratio (Px / Py)</div>
          <div className="text-rose-400 font-bold">{budgetSlope}</div>
        </div>
      </div>
    </div>
  );
};

// Diagram 3: Geometric Point Elasticity along Linear Demand Curve
const GeometricElasticityDiagram: React.FC<{
  price: number;
  setPrice: (p: number) => void;
}> = ({ price, setPrice }) => {
  // Linear Demand: Q = 100 - 2*P (Price intercept = 50, Quantity intercept = 100)
  const maxP = 50;
  const maxQ = 100;
  const currentQ = Math.max(0, 100 - 2 * price);

  // Geometric Point Elasticity = Lower Segment / Upper Segment
  // Lower segment length along demand curve is proportional to (maxP - price)
  // Upper segment length along demand curve is proportional to price
  // Ed = (100 - Q) / Q = (2*P) / (100 - 2*P) = P / (50 - P)
  const lowerSegmentVal = maxP - price; // vertical lower segment
  const upperSegmentVal = price; // vertical upper segment
  const pointEd = price === 50 ? 'Infinity' : (price / (50 - price)).toFixed(2);
  const totalExpenditure = price * currentQ;

  // Coordinates: Q: 0..100 -> 50..370, P: 0..50 -> 210..20
  const mapQ = (q: number) => 50 + (q / maxQ) * 320;
  const mapP = (p: number) => 210 - (p / maxP) * 190;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-purple-400">Geometric Method & Outlay Elasticity</h4>
        <span className="text-xs text-purple-300 font-medium">Point Elasticity Ed = Lower Segment / Upper Segment</span>
      </div>

      <svg width="100%" height="240" viewBox="0 0 400 240" className="overflow-visible">
        {/* Axes */}
        <line x1="50" y1="210" x2="380" y2="210" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="10" x2="50" y2="210" stroke="#475569" strokeWidth="2" />

        <text x="380" y="228" fill="#94a3b8" fontSize="10" textAnchor="end">Quantity Demanded (Q)</text>
        <text x="15" y="20" fill="#94a3b8" fontSize="10" textAnchor="start">Price (₹ P)</text>

        {/* Total Expenditure Rectangle (P * Q) */}
        <rect
          x="50"
          y={mapP(price)}
          width={mapQ(currentQ) - 50}
          height={210 - mapP(price)}
          fill="#8b5cf6"
          fillOpacity="0.25"
          stroke="#8b5cf6"
          strokeDasharray="3,3"
        />

        {/* Linear Demand Curve Line */}
        <line x1={mapQ(0)} y1={mapP(maxP)} x2={mapQ(maxQ)} y2={mapP(0)} stroke="#a855f7" strokeWidth="3" />

        {/* Midpoint marker (|Ed| = 1) */}
        <circle cx={mapQ(50)} cy={mapP(25)} r="4" fill="#e9d5ff" />
        <text x={mapQ(50) + 8} y={mapP(25)} fill="#e9d5ff" fontSize="9">Midpoint (|Ed|=1)</text>

        {/* Selected Point on Demand Curve */}
        <circle cx={mapQ(currentQ)} cy={mapP(price)} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />

        <text x={mapQ(currentQ) + 8} y={mapP(price) - 8} fill="#f43f5e" fontSize="11" fontWeight="bold">
          P = ₹{price}, Q = {currentQ}
        </text>
      </svg>

      <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-center">
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <div className="text-slate-400">Point Elasticity (|Ed|)</div>
          <div className="text-purple-300 font-bold text-base">{pointEd}</div>
        </div>
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <div className="text-slate-400">Total Expenditure (P×Q)</div>
          <div className="text-emerald-400 font-bold text-base">₹{totalExpenditure}</div>
        </div>
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <div className="text-slate-400">Elasticity Region</div>
          <div className="text-amber-300 font-bold text-base">
            {price > 25 ? 'Elastic (|Ed| > 1)' : price === 25 ? 'Unitary (|Ed| = 1)' : 'Inelastic (|Ed| < 1)'}
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// MAIN COMPONENT
// ==========================================

export default function C12_EcoConsumerBehaviourCBSESim({ onComplete }: { onComplete?: (score: number) => void }) {
  // Navigation & Tab state
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Discovery tab state
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);
  const [showDiscoveryFeedback, setShowDiscoveryFeedback] = useState(false);
  const [predAnswers, setPredAnswers] = useState<{ [key: number]: number }>({});
  const [predSubmitted, setPredSubmitted] = useState<{ [key: number]: boolean }>({});

  // Lab tab state
  const [activeLabIndex, setActiveLabIndex] = useState(0);

  // Lab 1: Cardinal Utility state
  const [consumptionUnits, setConsumptionUnits] = useState<number>(4);

  // Lab 2: Indifference & Budget state
  const [income, setIncome] = useState<number>(100);
  const [priceX, setPriceX] = useState<number>(10);
  const [priceY, setPriceY] = useState<number>(10);
  const [selectedX, setSelectedX] = useState<number>(5);

  // Lab 4: Geometric Elasticity state
  const [elasticityPrice, setElasticityPrice] = useState<number>(30);

  // Lab 5: Market Demand Summation state
  const [marketPrice, setMarketPrice] = useState<number>(5);

  // Observation questions state
  const [obsAnswers, setObsAnswers] = useState<{ [key: number]: number }>({});
  const [obsSubmitted, setObsSubmitted] = useState<{ [key: number]: boolean }>({});

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userMcqChoice, setUserMcqChoice] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>(new Array(CHALLENGES.length).fill(false));
  const [score, setScore] = useState<number>(0);

  // SRS & BKT Tracking State
  const [bktStateMap, setBktStateMap] = useState<{ [key in NodeId]?: ReturnType<typeof createBKTState> }>({});

  // Feedback FX & Speech state
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHintText, setCurrentHintText] = useState('');

  // Auto-hint timer reference
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize BKT states
  useEffect(() => {
    const initialMap: { [key in NodeId]?: ReturnType<typeof createBKTState> } = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState();
    });
    setBktStateMap(initialMap);

    speechManager.speak("Welcome to the Theory of Consumer Behaviour Simulation. Let us explore rational choices, utility, and market demand!");
  }, []);

  // Reset auto-hint timer on interaction
  const resetHintTimer = (hintMsg: string) => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
    hintTimerRef.current = setTimeout(() => {
      setCurrentHintText(hintMsg);
      setShowHint(true);
      audioManager.play('hint');
    }, 12000); // 12 seconds of inactivity triggers hint
  };

  useEffect(() => {
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  // Handlers for Discovery Tab
  const handleDiscoverySubmit = () => {
    if (selectedDiscoveryOpt === null) return;
    setShowDiscoveryFeedback(true);
    if (selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak("Correct! Giffen goods violate the law of demand because the income effect dominates.");
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
    }
  };

  const handlePredictionSubmit = (index: number) => {
    const selected = predAnswers[index];
    if (selected === undefined) return;
    setPredSubmitted((prev) => ({ ...prev, [index]: true }));

    const isCorrect = selected === PREDICTION_QUESTIONS[index].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak("Excellent prediction! You accurately anticipated the market adjustment.");
    } else {
      audioManager.play('error');
    }
  };

  const handleObservationSubmit = (index: number) => {
    const selected = obsAnswers[index];
    if (selected === undefined) return;
    setObsSubmitted((prev) => ({ ...prev, [index]: true }));

    const isCorrect = selected === OBSERVATION_QUESTIONS[index].correctIndex;
    if (isCorrect) {
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  // Challenge Handling
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (ch.type === 'multiple_choice') {
      if (userMcqChoice === null) return;
      isCorrect = userMcqChoice === ch.correctIndex;
    } else if (ch.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (isNaN(val)) return;
      const target = ch.correctAnswer ?? 0;
      const tol = ch.tolerance ?? 0.01;
      isCorrect = Math.abs(val - target) <= tol;
    }

    // BKT & SRS Update
    const currentBKT = bktStateMap[ch.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStateMap((prev) => ({ ...prev, [ch.nodeId]: updatedBKT }));

    const srsItem = createReviewItem(ch.nodeId);
    sm2Update(srsItem, isCorrect ? 5 : 2);

    if (isCorrect) {
      audioManager.play('success');
      setChallengeFeedback({ isCorrect: true, text: `Correct! ${ch.explanation}` });
      setShowSuccess(true);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);

      const newCompleted = [...completedChallenges];
      if (!newCompleted[currentChallengeIndex]) {
        newCompleted[currentChallengeIndex] = true;
        setCompletedChallenges(newCompleted);
        const newScore = score + 10;
        setScore(newScore);
        recordGameScore(ch.nodeId, newScore, 100);
      }
    } else {
      audioManager.play('error');
      setChallengeFeedback({ isCorrect: false, text: `Not quite right. ${ch.explanation}` });
    }
  };

  const nextChallenge = () => {
    setChallengeFeedback(null);
    setUserMcqChoice(null);
    setUserNumericInput('');
    setShowSuccess(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      speechManager.speak("Congratulations! You have completed all consumer behavior challenges.");
      if (onComplete) onComplete(score);
    }
  };

  // Lab 5 Market Demand Calculations
  const qA = Math.max(0, 20 - 2 * marketPrice);
  const qB = Math.max(0, 30 - 3 * marketPrice);
  const qMarket = qA + qB;

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-950 text-slate-100 min-h-screen p-4 md:p-6 font-sans">
      {/* UI OVERLAY FEEDBACK COMPONENTS */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Solved Successfully!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* HEADER SECTION */}
      <header className="mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-bold tracking-wider uppercase mb-1">
              <span>ISC Class 12 Economics</span>
              <span>•</span>
              <span>Microeconomics Unit 2</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{SCENARIO.title}</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">{SCENARIO.intro}</p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-800/80 backdrop-blur border border-slate-700 p-3 rounded-xl">
            <div className="text-center">
              <div className="text-xs text-slate-400">Mastery Score</div>
              <div className="text-xl font-black text-emerald-400">{score} pts</div>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center">
              <div className="text-xs text-slate-400">Challenges</div>
              <div className="text-xl font-black text-gold-400">
                {completedChallenges.filter(Boolean).length}/{CHALLENGES.length}
              </div>
            </div>
          </div>
        </div>

        {/* TOP NAVIGATION TABS */}
        <div className="flex space-x-2 mt-6 border-b border-slate-800 pb-2">
          <button
            onClick={() => {
              setActiveTab('discovery');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'discovery'
                ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            1. Scenario & Discovery
          </button>
          <button
            onClick={() => {
              setActiveTab('lab');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'lab'
                ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            2. Interactive Labs
          </button>
          <button
            onClick={() => {
              setActiveTab('challenges');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'challenges'
                ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            3. Challenges ({CHALLENGES.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('summary');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'summary'
                ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            4. Summary & Application
          </button>
        </div>
      </header>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gold-400 mb-2">Scenario Context</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">{SCENARIO.context}</p>

            {/* DISCOVERY QUESTION CARD */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full font-semibold border border-amber-500/30">
                  Discovery Challenge
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDiscoveryOpt(idx);
                      audioManager.play('tap');
                    }}
                    className={`p-3 text-left rounded-xl border text-sm transition-all ${
                      selectedDiscoveryOpt === idx
                        ? 'bg-gold-950 border-gold-500 text-gold-200 font-medium'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <span className="inline-block w-6 text-slate-400 font-mono">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {!showDiscoveryFeedback ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={selectedDiscoveryOpt === null}
                  className="w-full py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg"
                >
                  Verify Discovery Answer
                </button>
              ) : (
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-600 text-rose-200'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>
          </div>

          {/* PREDICTION QUESTIONS SECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Hypothesis & Predictions</h3>
            <div className="space-y-6">
              {PREDICTION_QUESTIONS.map((pred, idx) => (
                <div key={idx} className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
                  <p className="font-semibold text-sm text-slate-200 mb-3">{pred.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {pred.options.map((o, oIdx) => (
                      <button
                        key={oIdx}
                        disabled={predSubmitted[idx]}
                        onClick={() => {
                          setPredAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 text-xs text-left rounded-lg border transition-all ${
                          predAnswers[idx] === oIdx
                            ? 'bg-purple-950 border-purple-500 text-purple-200 font-semibold'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>

                  {!predSubmitted[idx] ? (
                    <button
                      onClick={() => handlePredictionSubmit(idx)}
                      disabled={predAnswers[idx] === undefined}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-all"
                    >
                      Check Prediction
                    </button>
                  ) : (
                    <div
                      className={`p-3 rounded-lg text-xs ${
                        predAnswers[idx] === pred.correctIndex
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700'
                          : 'bg-rose-950/60 text-rose-300 border border-rose-700'
                      }`}
                    >
                      <p className="font-bold">
                        {predAnswers[idx] === pred.correctIndex ? 'Prediction Confirmed!' : 'Incorrect Prediction'}
                      </p>
                      <p className="mt-1 text-slate-300">{pred.verifyInstruction}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE LABS */}
      {activeTab === 'lab' && (
        <div className="space-y-6">
          {/* LAB SELECTOR SUB-NAVS */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveLabIndex(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeLabIndex === idx
                    ? 'bg-gold-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {step.title.split(':')[0]}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gold-400 mb-1">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
            <p className="text-slate-400 text-xs mb-6">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>

            {/* LAB 1 INTERACTIVE UI */}
            {activeLabIndex === 0 && (
              <div className="space-y-6">
                <UtilityCurveDiagram consumptionUnits={consumptionUnits} />
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-200">Consumption Units (Q): {consumptionUnits}</label>
                    <span className="text-xs text-amber-400">Diminishing MU active</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={consumptionUnits}
                    onChange={(e) => {
                      setConsumptionUnits(parseInt(e.target.value));
                      resetHintTimer("Notice how Total Utility increases until Marginal Utility drops to zero at Q = 6!");
                    }}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1 unit (High MU)</span>
                    <span>6 units (TU Peak, MU=0)</span>
                    <span>10 units (Negative MU)</span>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2 INTERACTIVE UI */}
            {activeLabIndex === 1 && (
              <div className="space-y-6">
                <IndifferenceBudgetDiagram
                  income={income}
                  px={priceX}
                  py={priceY}
                  selectedX={selectedX}
                  setSelectedX={setSelectedX}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Consumer Income (M): ₹{income}</label>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      step="10"
                      value={income}
                      onChange={(e) => {
                        setIncome(parseInt(e.target.value));
                        resetHintTimer("Increasing income shifts the budget line outwards parallelly.");
                      }}
                      className="w-full accent-gold-500 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Price of X (Px): ₹{priceX}</label>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="1"
                      value={priceX}
                      onChange={(e) => {
                        setPriceX(parseInt(e.target.value));
                        resetHintTimer("Increasing Px pivots the budget line inward along X axis.");
                      }}
                      className="w-full accent-rose-500 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Price of Y (Py): ₹{priceY}</label>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="1"
                      value={priceY}
                      onChange={(e) => {
                        setPriceY(parseInt(e.target.value));
                        resetHintTimer("Increasing Py pivots the budget line inward along Y axis.");
                      }}
                      className="w-full accent-amber-500 mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3 INTERACTIVE PCC & DEMAND UI */}
            {activeLabIndex === 2 && (
              <div className="space-y-6">
                <div className="bg-slate-850 border border-slate-700 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gold-300 mb-2">Price Consumption Curve (PCC) Derivation</h4>
                  <p className="text-xs text-slate-400 mb-4">
                    As Px changes from ₹5 to ₹20 while Py=₹10 and M=₹100 remain fixed, the tangency point traces out the demand curve for Good X.
                  </p>

                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {[5, 10, 15, 20].map((pVal) => {
                      const optX = 100 / (2 * pVal);
                      return (
                        <div
                          key={pVal}
                          onClick={() => {
                            setPriceX(pVal);
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            priceX === pVal
                              ? 'bg-gold-950 border-gold-500 text-gold-200'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                          }`}
                        >
                          <div className="font-bold">Px = ₹{pVal}</div>
                          <div className="text-emerald-400 mt-1">Optimal X = {optX.toFixed(1)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <IndifferenceBudgetDiagram
                  income={100}
                  px={priceX}
                  py={10}
                  selectedX={100 / (2 * priceX)}
                  setSelectedX={() => {}}
                />
              </div>
            )}

            {/* LAB 4 INTERACTIVE GEOMETRIC ELASTICITY UI */}
            {activeLabIndex === 3 && (
              <div className="space-y-6">
                <GeometricElasticityDiagram price={elasticityPrice} setPrice={setElasticityPrice} />
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <label className="text-sm font-semibold text-purple-300">Set Price Level along Linear Demand Curve: ₹{elasticityPrice}</label>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    step="1"
                    value={elasticityPrice}
                    onChange={(e) => {
                      setElasticityPrice(parseInt(e.target.value));
                      resetHintTimer("Notice how Total Expenditure peaks at P=25 where point elasticity is exactly 1!");
                    }}
                    className="w-full accent-purple-500 mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Inelastic Region (P &lt; ₹25)</span>
                    <span>Unitary Midpoint (P = ₹25)</span>
                    <span>Elastic Region (P &gt; ₹25)</span>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5 INTERACTIVE MARKET DEMAND UI */}
            {activeLabIndex === 4 && (
              <div className="space-y-6">
                <div className="bg-slate-850 border border-slate-700 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-emerald-300 mb-2">Horizontal Summation of Individual Demands</h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Market Demand Qm = Qa + Qb at price P.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-center">
                      <div className="text-xs text-slate-400">Consumer A (Qa = 20 - 2P)</div>
                      <div className="text-lg font-bold text-gold-400">{qA} units</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-center">
                      <div className="text-xs text-slate-400">Consumer B (Qb = 30 - 3P)</div>
                      <div className="text-lg font-bold text-purple-400">{qB} units</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-emerald-600 text-center">
                      <div className="text-xs text-slate-400">Market Demand (Qm = Qa + Qb)</div>
                      <div className="text-xl font-black text-emerald-400">{qMarket} units</div>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <label className="text-xs font-semibold text-slate-300">Market Price Level (P): ₹{marketPrice}</label>
                    <input
                      type="range"
                      min="1"
                      max="9"
                      step="1"
                      value={marketPrice}
                      onChange={(e) => {
                        setMarketPrice(parseInt(e.target.value));
                        resetHintTimer("Notice how horizontal summation combines individual quantities at each price.");
                      }}
                      className="w-full accent-emerald-500 mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* OBSERVATION QUESTIONS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-emerald-400 mb-4">Lab Observations</h3>
            <div className="space-y-4">
              {OBSERVATION_QUESTIONS.map((obs, idx) => (
                <div key={idx} className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
                  <p className="font-semibold text-sm text-slate-200 mb-3">{obs.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {obs.observableOptions.map((o, oIdx) => (
                      <button
                        key={oIdx}
                        disabled={obsSubmitted[idx]}
                        onClick={() => {
                          setObsAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 text-xs text-left rounded-lg border transition-all ${
                          obsAnswers[idx] === oIdx
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-semibold'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>

                  {!obsSubmitted[idx] ? (
                    <button
                      onClick={() => handleObservationSubmit(idx)}
                      disabled={obsAnswers[idx] === undefined}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-all"
                    >
                      Verify Observation
                    </button>
                  ) : (
                    <div
                      className={`p-3 rounded-lg text-xs ${
                        obsAnswers[idx] === obs.correctIndex
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700'
                          : 'bg-rose-950/60 text-rose-300 border border-rose-700'
                      }`}
                    >
                      <p className="font-bold">
                        {obsAnswers[idx] === obs.correctIndex ? 'Observation Validated!' : 'Re-examine the lab graph.'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Challenge progress bar */}
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</span>
            <span className="capitalize font-semibold text-gold-400">
              Tier: {CHALLENGES[currentChallengeIndex].difficulty} ({CHALLENGES[currentChallengeIndex].competencyLevel})
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gold-500 h-full transition-all duration-300"
              style={{ width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%` }}
            ></div>
          </div>

          {/* CHALLENGE CARD */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
            <h3 className="text-base font-bold text-white mb-4">
              {CHALLENGES[currentChallengeIndex].question}
            </h3>

            {/* Multiple Choice Options */}
            {CHALLENGES[currentChallengeIndex].type === 'multiple_choice' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {CHALLENGES[currentChallengeIndex].options?.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    disabled={challengeFeedback !== null}
                    onClick={() => {
                      setUserMcqChoice(oIdx);
                      audioManager.play('tap');
                    }}
                    className={`p-3 text-left rounded-xl border text-sm transition-all ${
                      userMcqChoice === oIdx
                        ? 'bg-gold-950 border-gold-500 text-gold-200 font-semibold'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <span className="inline-block w-6 text-slate-400 font-mono">{String.fromCharCode(65 + oIdx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Numeric Input */}
            {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
              <div className="mb-4">
                <input
                  type="number"
                  step="any"
                  disabled={challengeFeedback !== null}
                  value={userNumericInput}
                  onChange={(e) => setUserNumericInput(e.target.value)}
                  placeholder="Enter numerical answer..."
                  className="w-full md:w-64 p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            )}

            {/* Submit / Next Buttons */}
            {challengeFeedback === null ? (
              <button
                onClick={handleChallengeSubmit}
                disabled={
                  (CHALLENGES[currentChallengeIndex].type === 'multiple_choice' && userMcqChoice === null) ||
                  (CHALLENGES[currentChallengeIndex].type === 'numeric' && userNumericInput === '')
                }
                className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg"
              >
                Submit Answer
              </button>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-600 text-rose-200'
                  }`}
                >
                  <p className="font-bold mb-1">{challengeFeedback.isCorrect ? 'Correct!' : 'Incorrect'}</p>
                  <p>{challengeFeedback.text}</p>
                </div>

                <button
                  onClick={nextChallenge}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg"
                >
                  {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete All Challenges! 🎉'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: SUMMARY & REAL-WORLD APPLICATION */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* REAL WORLD ACTIVITY */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase mb-2">
              <span>Real-World Economics Case Study</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
            <p className="text-slate-300 text-sm mb-6">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gold-300">Step-by-Step Analytical Execution:</h3>
              <ol className="list-decimal list-inside space-y-3 text-sm text-slate-300">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <li key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/80">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* MISCONCEPTIONS & CORRECTIONS LIST */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 mb-4">Key Conceptual Misconceptions & Corrections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold">
                    <span>⚠️ Misconception</span>
                  </div>
                  <p className="text-xs font-medium text-slate-300 italic">"{m.misconception}"</p>
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold pt-2 border-t border-slate-700/50">
                    <span>✓ Correction</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.correction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
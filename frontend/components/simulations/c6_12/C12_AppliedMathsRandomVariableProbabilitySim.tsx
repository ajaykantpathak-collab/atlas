'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC APPLIED MATHS NODE IDS ───
const NODE_C12_APPMATH_051 = 'c12_appmath_051'; // Random variable and probability distribution
const NODE_C12_APPMATH_052 = 'c12_appmath_052'; // Mean and variance of random variable
const NODE_C12_APPMATH_053 = 'c12_appmath_053'; // Binomial distribution
const NODE_C12_APPMATH_054 = 'c12_appmath_054'; // Poisson distribution
const NODE_C12_APPMATH_055 = 'c12_appmath_055'; // Normal distribution
const NODE_C12_APPMATH_056 = 'c12_appmath_056'; // Linear Programming - intro & terminology
const NODE_C12_APPMATH_057 = 'c12_appmath_057'; // Linear Programming - formulation
const NODE_C12_APPMATH_058 = 'c12_appmath_058'; // Linear Programming - graphical & feasible region
const NODE_C12_APPMATH_059 = 'c12_appmath_059'; // Linear Programming - optimal solutions
const NODE_C12_APPMATH_060 = 'c12_appmath_060'; // Financial Mathematics - perpetuity & sinking funds

const ALL_NODE_IDS = [
  NODE_C12_APPMATH_051,
  NODE_C12_APPMATH_052,
  NODE_C12_APPMATH_053,
  NODE_C12_APPMATH_054,
  NODE_C12_APPMATH_055,
  NODE_C12_APPMATH_056,
  NODE_C12_APPMATH_057,
  NODE_C12_APPMATH_058,
  NODE_C12_APPMATH_059,
  NODE_C12_APPMATH_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Bengaluru Metro Operations & Finance Crisis',
  intro: 'You are the Chief Quantitative Analyst for Bengaluru Namma Metro and Bangalore Logistics Hub. You must model train delays using Poisson models, predict passenger surges via Normal bell curves, optimise feeder bus scheduling with Linear Programming, and finance multi-crore infrastructure maintenance using Perpetuities and Sinking Funds.',
  context: 'Use probabilistic modelling, constrained linear optimisation, and actuarial finance to make data-driven decisions that keep the city moving efficiently.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Namma Metro receives an average of 4 minor sensor alarms per hour. What is the probability that in a randomly chosen hour, EXACTLY zero alarms occur?',
  options: [
    '0% (Because the average is 4, alarms must happen every hour)',
    'e⁻⁴ ≈ 1.83% (Rare independent events follow Poisson P(X=0) = e⁻⁴·4⁰/0!)',
    '25% (1 in 4 chance)',
    '50% (Either alarms happen or they do not)',
  ],
  correctIndex: 1,
  hintAfter: 'Even when the average rate is 4 per hour, chance variation means zero occurrences still has a positive probability governed by the exponential decay e⁻⁴!',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Random Variable (c12_appmath_051)
  {
    id: 'ch_prob_01',
    nodeId: NODE_C12_APPMATH_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following describes a valid discrete probability distribution for random variable X with values {0, 1, 2}?',
    options: [
      'P(X=0) = 0.3, P(X=1) = 0.5, P(X=2) = 0.2',
      'P(X=0) = 0.4, P(X=1) = 0.7, P(X=2) = -0.1',
      'P(X=0) = 0.5, P(X=1) = 0.2, P(X=2) = 0.4',
      'P(X=0) = 0.6, P(X=1) = 0.6, P(X=2) = 0.0',
    ],
    correctIndex: 0,
    explanation: 'A valid discrete probability distribution requires all individual probabilities P(X=xᵢ) ≥ 0 and their total sum ΣP(X=xᵢ) = 1.0. Here 0.3 + 0.5 + 0.2 = 1.0.',
    hints: [
      'Check two conditions: are all probabilities non-negative (between 0 and 1)?',
      'Add up the probabilities in each option. The sum must equal exactly 1.0.',
      '0.3 + 0.5 + 0.2 = 1.0, satisfying both Kolmogorov axioms for discrete distributions.',
    ],
    misconceptionIndex: 0,
  },

  // 2. Foundation - Expected Value (c12_appmath_052)
  {
    id: 'ch_mean_02',
    nodeId: NODE_C12_APPMATH_052,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A smart ticket machine in Kolkata has daily breakdown count X with P(X=0)=0.6, P(X=1)=0.3, P(X=2)=0.1. Calculate the expected number of breakdowns E(X).',
    correctAnswer: 0.5,
    tolerance: 0.02,
    unit: 'breakdowns',
    explanation: 'E(X) = Σ xᵢ·P(X=xᵢ) = (0 × 0.6) + (1 × 0.3) + (2 × 0.1) = 0 + 0.3 + 0.2 = 0.5.',
    hints: [
      'Multiply each value of x by its corresponding probability P(X=x).',
      'Sum the products: (0 × 0.6) + (1 × 0.3) + (2 × 0.1).',
      '0 + 0.3 + 0.2 = 0.5. Enter 0.5.',
    ],
    misconceptionIndex: 1,
  },

  // 3. Foundation - Binomial Identification (c12_appmath_053)
  {
    id: 'ch_bino_03',
    nodeId: NODE_C12_APPMATH_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A quality inspector at Surat textile mill tests 10 shirts with replacement. Why does this count of defectives follow a Binomial distribution B(n, p)?',
    options: [
      'Fixed n=10, exactly 2 outcomes (defective/good), constant p, independent trials',
      'Because the sample size is infinite and events are rare',
      'Because measurements are continuous and bell-shaped',
      'Because trials are dependent without replacement',
    ],
    correctIndex: 0,
    explanation: 'The Binomial model requires 4 Bernoulli conditions: fixed finite trials n, dichotomy (success/failure), constant success probability p, and mutual independence.',
    hints: [
      'Recall the 4 Bernoulli conditions for Binomial distributions.',
      'Testing with replacement guarantees independence and constant probability p.',
      'Option A lists all 4 fundamental Binomial criteria.',
    ],
    misconceptionIndex: 2,
  },

  // 4. Foundation - Drag-label LPP Terminology (c12_appmath_056)
  {
    id: 'ch_lpp_drag_04',
    nodeId: NODE_C12_APPMATH_056,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each mathematical component to its correct role in the Linear Programming Problem.',
    dragItems: [
      { label: 'Maximise Z = 50x + 40y', targetId: 'target_obj' },
      { label: '2x + 3y ≤ 120', targetId: 'target_const' },
      { label: 'x ≥ 0, y ≥ 0', targetId: 'target_nonneg' },
      { label: 'x = Chairs, y = Tables', targetId: 'target_var' },
    ],
    correctMapping: {
      target_obj: 'Maximise Z = 50x + 40y',
      target_const: '2x + 3y ≤ 120',
      target_nonneg: 'x ≥ 0, y ≥ 0',
      target_var: 'x = Chairs, y = Tables',
    },
    explanation: 'An LPP consists of Decision Variables (quantities to decide), Objective Function (to optimise), Resource Constraints (inequalities), and Non-negativity restrictions.',
    hints: [
      'Identify the expression with "Maximise" as the Objective Function.',
      'x ≥ 0, y ≥ 0 represents the non-negativity constraint.',
      '2x + 3y ≤ 120 is the structural resource constraint.',
    ],
  },

  // 5. Standard - Binomial Probability Calculation (c12_appmath_053)
  {
    id: 'ch_bino_calc_05',
    nodeId: NODE_C12_APPMATH_053,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A fair coin is tossed 4 times. What is the probability of getting exactly 3 heads? (Express as a decimal: e.g. 0.25)',
    correctAnswer: 0.25,
    tolerance: 0.01,
    unit: 'probability',
    explanation: 'P(X=3) = ⁴C₃ · (0.5)³ · (0.5)¹ = 4 × 0.125 × 0.5 = 0.25 (or 4/16 = 1/4).',
    hints: [
      'Use the Binomial pmf formula: P(X=k) = ⁿCₖ · pᵏ · qⁿ⁻ᵏ with n=4, k=3, p=0.5, q=0.5.',
      '⁴C₃ = 4! / (3! · 1!) = 4.',
      '4 × (1/2)⁴ = 4 / 16 = 0.25.',
    ],
    misconceptionIndex: 2,
  },

  // 6. Standard - Poisson Formula Application (c12_appmath_054)
  {
    id: 'ch_pois_calc_06',
    nodeId: NODE_C12_APPMATH_054,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Mumbai cyber helpdesk receives an average of λ = 2 distress calls per minute. What is the expression for P(X ≤ 1) (at most 1 call in a minute)?',
    options: [
      'e⁻² · (1 + 2) = 3e⁻²',
      'e⁻² · 2² / 2! = 2e⁻²',
      '1 - e⁻²',
      'e⁻² · 2¹ / 1! = 2e⁻²',
    ],
    correctIndex: 0,
    explanation: 'P(X ≤ 1) = P(X=0) + P(X=1) = e⁻²·2⁰/0! + e⁻²·2¹/1! = e⁻²(1 + 2) = 3e⁻² ≈ 0.406.',
    hints: [
      '"At most 1" means X = 0 OR X = 1. Add both probabilities together.',
      'P(X=0) = e⁻² · 2⁰ / 0! = e⁻²; P(X=1) = e⁻² · 2¹ / 1! = 2e⁻².',
      'Summing them yields e⁻²(1 + 2) = 3e⁻².',
    ],
    misconceptionIndex: 3,
  },

  // 7. Standard - Normal Distribution Empirical Rule (c12_appmath_055)
  {
    id: 'ch_norm_emp_07',
    nodeId: NODE_C12_APPMATH_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'ISC Applied Maths scores in Bengaluru follow N(μ=70, σ²=25, so σ=5). By the Empirical 68-95-99.7 Rule, what percentage of students score between 65 and 75?',
    options: [
      'Approximately 68%',
      'Approximately 95%',
      'Approximately 50%',
      'Approximately 99.7%',
    ],
    correctIndex: 0,
    explanation: '65 = μ - 1σ (70 - 5) and 75 = μ + 1σ (70 + 5). The area within 1 standard deviation of the mean under any normal curve is approximately 68.27% (≈68%).',
    hints: [
      'Calculate Z for 65: Z = (65 - 70)/5 = -1.',
      'Calculate Z for 75: Z = (75 - 70)/5 = +1.',
      'Between Z = -1 and Z = +1 encapsulates roughly 68% of the population.',
    ],
    misconceptionIndex: 4,
  },

  // 8. Standard - Perpetuity Formula (c12_appmath_060)
  {
    id: 'ch_perp_08',
    nodeId: NODE_C12_APPMATH_060,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A philanthropist endows an annual research award of ₹60,000 in perpetuity to IIT Madras starting 1 year from now (perpetuity-immediate). If the fund earns 6% annual effective interest (r=0.06), what present corpus must be deposited today? (in Lakhs of ₹, enter 10 for 10 Lakhs)',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: 'Lakh ₹',
    explanation: 'For a perpetuity-immediate: PV = A / r = 60,000 / 0.06 = ₹10,00,000 = ₹10 Lakh.',
    hints: [
      'Perpetuity-immediate present value formula is PV = A / r.',
      'A = 60,000 and r = 0.06.',
      '60,000 / 0.06 = 10,00,000 = 10 Lakh. Enter 10.',
    ],
  },

  // 9. Standard - Sinking Fund vs Savings Account (c12_appmath_060)
  {
    id: 'ch_sink_09',
    nodeId: NODE_C12_APPMATH_060,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does a corporate Sinking Fund fundamentally differ from a standard general savings recurring deposit?',
    options: [
      'A sinking fund is strictly linked to a specific future debt/liability with a fixed target & maturity date',
      'A sinking fund allows unlimited immediate withdrawals for day-to-day petty cash',
      'A sinking fund does not earn interest compound accumulation',
      'A sinking fund pays out annuities in perpetuity forever',
    ],
    correctIndex: 0,
    explanation: 'A sinking fund is a structured accumulation fund created specifically to discharge a known capital liability (such as debenture redemption or machine replacement) by a predetermined date.',
    hints: [
      'Think about why companies create sinking funds for debentures or heavy plant machinery.',
      'Is it open-ended or earmarked for a specific obligation?',
      'Option A defines the exact legal and accounting purpose of a sinking fund.',
    ],
  },

  // 10. Standard - LPP Corner Point Method (c12_appmath_058)
  {
    id: 'ch_corner_10',
    nodeId: NODE_C12_APPMATH_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A bounded feasible region has vertices (0,0), (6,0), (4,3), and (0,5). What is the maximum value of the objective function Z = 4x + 5y?',
    options: [
      'Z = 31 at vertex (4,3)',
      'Z = 25 at vertex (0,5)',
      'Z = 24 at vertex (6,0)',
      'Z = 35 at interior point (5,3)',
    ],
    correctIndex: 0,
    explanation: 'Evaluate Z at each corner: Z(0,0)=0, Z(6,0)=24, Z(4,3)=4(4)+5(3)=31, Z(0,5)=25. By the Corner Point Theorem, the global optimum occurs at vertex (4,3) with Z=31.',
    hints: [
      'Evaluate Z = 4x + 5y at each given corner point.',
      'Z(6,0) = 24; Z(0,5) = 25; Z(4,3) = 16 + 15 = 31.',
      'The maximum value is 31 at (4,3).',
    ],
  },

  // 11. Advanced - Binomial Parameter Recovery (c12_appmath_053)
  {
    id: 'ch_bino_param_11',
    nodeId: NODE_C12_APPMATH_053,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For a Binomial distribution B(n, p), the Mean is 6 and the Variance is 4. What are the values of n, p, and q?',
    options: [
      'n = 18, p = 1/3, q = 2/3',
      'n = 12, p = 1/2, q = 1/2',
      'n = 24, p = 1/4, q = 3/4',
      'n = 9, p = 2/3, q = 1/3',
    ],
    correctIndex: 0,
    explanation: 'Mean = np = 6, Variance = npq = 4. Dividing gives q = (npq)/(np) = 4/6 = 2/3. Then p = 1 - q = 1/3. Since np = 6 => n(1/3) = 6 => n = 18.',
    hints: [
      'Divide Variance by Mean: (npq)/(np) = q.',
      'q = 4/6 = 2/3, which means p = 1 - 2/3 = 1/3.',
      'Now substitute p into np = 6 to find n: n = 6 / (1/3) = 18.',
    ],
    misconceptionIndex: 2,
  },

  // 12. Advanced - Drag-sort Order of LPP Graphical Solution (c12_appmath_058)
  {
    id: 'ch_lpp_sort_12',
    nodeId: NODE_C12_APPMATH_058,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the systematic steps for solving a Linear Programming Problem graphically in the correct chronological order.',
    sortItems: [
      'Formulate decision variables, objective function, and constraints inequations',
      'Plot boundary lines using axis intercepts and determine half-planes using test point (0,0)',
      'Identify the intersection Feasible Region and locate all corner vertices',
      'Evaluate the objective function Z = ax + by at every corner point',
      'Select vertex with highest (maximisation) or lowest (minimisation) value and verify boundedness',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Proper mathematical sequence: Formulation -> Graphing & Shading -> Identifying Feasible Polytope & Vertices -> Evaluating Z at Vertices -> Selecting Optimal Solution.',
    hints: [
      'You cannot graph without formulating mathematical inequations first.',
      'Plotting boundary lines precedes finding their common intersection feasible region.',
      'Evaluating the objective function at corner points is the second-to-last step before final selection.',
    ],
  },

  // 13. Advanced - Poisson Rate Equality Property (c12_appmath_054)
  {
    id: 'ch_pois_var_13',
    nodeId: NODE_C12_APPMATH_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A transport statistician claims that for weekly accident counts at a Silk Board junction, the Mean is 5.0 and the Variance is 5.0. What does this indicate about the distribution?',
    options: [
      'It strongly supports a Poisson model because Mean = Variance = λ',
      'It disproves a Poisson model because Variance must always be npq < Mean',
      'It implies a continuous Normal distribution with σ = 5.0',
      'It indicates that trials are dependent and biased',
    ],
    correctIndex: 0,
    explanation: 'A unique identifying signature of the Poisson distribution is that its Expected Value and Variance are identical: E(X) = Var(X) = λ = 5.0.',
    hints: [
      'Compare this to Binomial where Var = npq < Mean = np.',
      'In a Poisson distribution, Mean = λ and Variance = λ.',
      'Equidispersion (Mean = Variance) is the textbook hallmark of a Poisson process.',
    ],
    misconceptionIndex: 3,
  },

  // 14. Advanced - Normal Standardisation Z-Score (c12_appmath_055)
  {
    id: 'ch_norm_z_14',
    nodeId: NODE_C12_APPMATH_055,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Chennai courier delivery time follows Normal N(μ=45 mins, σ=6 mins). A package takes 57 mins. What is its standard normal Z-score?',
    correctAnswer: 2,
    tolerance: 0.05,
    unit: 'standard deviations',
    explanation: 'Z = (X - μ) / σ = (57 - 45) / 6 = 12 / 6 = 2.0. The delivery took 2 standard deviations longer than average.',
    hints: [
      'Use the standardisation formula: Z = (X - μ) / σ.',
      'Subtract the mean 45 from 57: 57 - 45 = 12.',
      'Divide 12 by the standard deviation 6: 12 / 6 = 2.0.',
    ],
    misconceptionIndex: 4,
  },

  // 15. Advanced - Perpetuity-Due vs Immediate (c12_appmath_060)
  {
    id: 'ch_perp_due_15',
    nodeId: NODE_C12_APPMATH_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the Present Value of a Perpetuity-Due (payment A made at the START of each period) larger than a Perpetuity-Immediate by a factor of (1 + r)?',
    options: [
      'Because the first payment of A is received immediately today without discounting',
      'Because payments continue for more years than a perpetuity-immediate',
      'Because the interest rate compounds twice per year',
      'Because sinking fund amortization deducts interest expense',
    ],
    correctIndex: 0,
    explanation: 'PV(Due) = A + A/r = A(1 + 1/r) = A(1+r)/r = (1+r) · PV(Immediate). The initial payment is in hand today with zero discount factor.',
    hints: [
      'In a perpetuity-due, when does the very first payment arrive?',
      'The first payment arrives at t=0, so its present value is exactly A (not discounted).',
      'The remaining stream is an immediate perpetuity, giving total PV = A + A/r = A(1+r)/r.',
    ],
  },

  // 16. Foundation - Variance Definition for Random Variable (c12_appmath_052)
  {
    id: 'ch_var_def_16',
    nodeId: NODE_C12_APPMATH_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the correct theoretical formula for the Variance σ² of a discrete random variable X?',
    options: [
      'σ² = Σ (xᵢ - μ)² · P(X = xᵢ) = E(X²) - [E(X)]²',
      'σ² = Σ (xᵢ - μ) / n',
      'σ² = [Σ xᵢ · P(X = xᵢ)]²',
      'σ² = √(npq)',
    ],
    correctIndex: 0,
    explanation: 'Variance is the probability-weighted average of squared deviations from the mean: σ² = Σ (xᵢ - μ)² · P(X = xᵢ) = E(X²) - μ².',
    hints: [
      'Variance measures squared dispersion weighted by probabilities.',
      'Recall the algebraic identity: E[(X - μ)²] = E(X²) - (E(X))².',
      'Option A correctly states both the definition and the computational formula.',
    ],
    misconceptionIndex: 1,
  },

  // 17. Standard - Unbounded Feasible Region Optimisation (c12_appmath_059)
  {
    id: 'ch_unbounded_17',
    nodeId: NODE_C12_APPMATH_059,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An LPP has constraints x + y ≥ 4, x ≥ 0, y ≥ 0. The objective is to MAXIMISE Z = 3x + 5y. What is the optimal solution?',
    options: [
      'No maximum exists (Z is unbounded and can increase to infinity in the first quadrant)',
      'Maximum is Z = 20 at (0,4)',
      'Maximum is Z = 12 at (4,0)',
      'Maximum is Z = 0 at (0,0)',
    ],
    correctIndex: 0,
    explanation: 'The feasible region extends infinitely upward and rightward in the 1st quadrant. Since coefficients of Z are positive (+3, +5), Z increases without upper bound, so no finite maximum exists.',
    hints: [
      'Check the feasible region for x + y ≥ 4: does it have an upper ceiling?',
      'As x and y grow to 1,000,000, what happens to Z = 3x + 5y?',
      'Since Z can grow indefinitely without violating constraints, the problem has no maximum.',
    ],
  },

  // 18. Advanced - Sinking Fund Annual Deposit Calculation (c12_appmath_060)
  {
    id: 'ch_sink_calc_18',
    nodeId: NODE_C12_APPMATH_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Pune manufacturing firm needs ₹9,00,000 in 5 years to replace a CNC machine. The sinking fund earns r = 5% effective annual interest. Using the annuity factor [(1.05)⁵ - 1]/0.05 ≈ 5.5256, what is the required annual deposit A?',
    options: [
      'A = 9,00,000 / 5.5256 ≈ ₹1,62,878',
      'A = 9,00,000 / 5 = ₹1,80,000',
      'A = 9,00,000 × 0.05 = ₹45,000',
      'A = 9,00,000 × (1.05)⁵ ≈ ₹11,48,700',
    ],
    correctIndex: 0,
    explanation: 'S = A · [((1+r)ⁿ - 1)/r] => 9,00,000 = A × 5.5256 => A = 9,00,000 / 5.5256 ≈ ₹1,62,878 per year.',
    hints: [
      'The future accumulation formula is S = A · s_{n|r}.',
      'Divide the target amount ₹9,00,000 by the accumulation factor 5.5256.',
      '9,00,000 / 5.5256 ≈ 1,62,878.',
    ],
  },

  // 19. Advanced - Construct LPP Inequation Formulation (c12_appmath_057)
  {
    id: 'ch_const_lpp_19',
    nodeId: NODE_C12_APPMATH_057,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the labour constraint inequation: Each luxury silk stole (x) requires 4 hours and each cotton stole (y) requires 2 hours, with at most 80 weaver hours available.',
    availableParts: ['4x', '+', '2y', '≤', '80', '≥', '2x', 'y'],
    targetState: '4x + 2y ≤ 80',
    validationHint: 'Assemble the linear expression: 4 times x plus 2 times y is at most (≤) 80.',
    explanation: '4 hours per silk stole (4x) + 2 hours per cotton stole (2y) cannot exceed 80 hours total (≤ 80). Thus 4x + 2y ≤ 80.',
    hints: [
      'Start with the time consumed by silk stoles: 4x.',
      'Add the time consumed by cotton stoles: + 2y.',
      'The total must be at most 80: ≤ 80.',
    ],
  },

  // 20. Foundation - Normal Symmetry (c12_appmath_055)
  {
    id: 'ch_norm_sym_20',
    nodeId: NODE_C12_APPMATH_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For any continuous Normal distribution N(μ, σ²), what is the exact probability P(X > μ)?',
    options: [
      '0.50 (50% area to the right of the mean due to perfect symmetry)',
      '1.00 (100%)',
      '0.68 (68%)',
      '0.00',
    ],
    correctIndex: 0,
    explanation: 'The Normal density function is symmetric about its central axis x = μ. Because the total integral/area is 1.0, exactly half (0.50 or 50%) lies on each side.',
    hints: [
      'The normal curve is a symmetric bell centered at μ.',
      'Total area under the entire curve is 1.0.',
      'Dividing by 2 gives exactly 0.50.',
    ],
    misconceptionIndex: 4,
  },

  // 21. Advanced - Poisson Limiting Form (c12_appmath_054)
  {
    id: 'ch_pois_limit_21',
    nodeId: NODE_C12_APPMATH_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under what specific mathematical limits does the Binomial distribution B(n, p) converge to the Poisson distribution with parameter λ?',
    options: [
      'As n → ∞ and p → 0 such that the product np remains constant at λ',
      'As n → 0 and p → 1 such that n/p = λ',
      'As both n → ∞ and p → ∞ simultaneously',
      'As p → 0.5 for any small fixed n',
    ],
    correctIndex: 0,
    explanation: 'The law of rare events proves that Binomial B(n, p) approaches Poisson(λ) when trials n become infinitely large, success probability p becomes negligibly small, and expected occurrences np = λ remains fixed.',
    hints: [
      'Think of rare events occurring in massive populations (e.g. meteor strikes, rare typographical errors).',
      'n must be large (n → ∞) and p must be tiny (p → 0).',
      'The average rate np is held constant as λ.',
    ],
    misconceptionIndex: 3,
  },

  // 22. Standard - Linear Programming Infeasible Region (c12_appmath_058)
  {
    id: 'ch_lpp_infeas_22',
    nodeId: NODE_C12_APPMATH_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'If an LPP has constraints x + y ≤ 2 and x + y ≥ 5 with x ≥ 0, y ≥ 0, what can you conclude about the feasible region?',
    options: [
      'The feasible region is empty / infeasible (no coordinate point satisfies both conditions)',
      'The feasible region is an unbounded polygon',
      'The optimal maximum is Z = 5',
      'The feasible region is a bounded triangle',
    ],
    correctIndex: 0,
    explanation: 'The two half-planes x + y ≤ 2 (near origin) and x + y ≥ 5 (far from origin) are parallel and do not overlap. Hence the intersection is empty (infeasible).',
    hints: [
      'Can a sum x + y be both less than 2 AND greater than 5 at the same time?',
      'Since no point (x,y) satisfies both simultaneously, the intersection set is empty.',
      'An empty intersection means the problem has no feasible solutions (infeasible).',
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
  nodeId: NODE_C12_APPMATH_051,
  title: 'Applied Mathematics: Probability & Optimisation Engine',
  definition: 'Comprehensive mastery of Discrete Random Variables, Binomial, Poisson & Normal Distributions, 2D Linear Programming Formulation & Graphical Optimization, and Actuarial Perpetuities & Sinking Funds.',
  eli5: 'Think of this as your quantitative toolkit: probability distributions help predict the future, linear programming helps make the best choices under tight limits, and financial math ensures your wealth lasts forever.',
  misconceptions: [
    { misconception: 'A discrete probability distribution can have negative probabilities or sum to any value.', correction: 'Every probability must be non-negative (0 ≤ P(X) ≤ 1) and their grand sum ΣP(X) must equal exactly 1.0.' },
    { misconception: 'The variance of a random variable is the same as sample variance divided by (n-1).', correction: 'Theoretical random variable variance is probability-weighted: σ² = Σ(xᵢ - μ)²·P(X=xᵢ) = E(X²) - (E(X))².' },
    { misconception: 'Binomial distribution can be used when trials are dependent without replacement.', correction: 'Binomial trials must be independent with constant p (Bernoulli trials with replacement).' },
    { misconception: 'Poisson distribution variance is npq.', correction: 'In a Poisson distribution, both Mean and Variance are equal to the single rate parameter λ.' },
    { misconception: 'Z-score formula is (μ - X)/σ or divides by variance σ².', correction: 'Standard normal variate is strictly Z = (X - μ) / σ, measuring distance from mean in standard deviations.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the sum of all probabilities in a valid discrete probability distribution?', options: ['0.5', '1.0', '100', 'Depends on n'], correctIndex: 1 },
    { question: 'What is the expected value E(X) for fair die roll {1,2,3,4,5,6}?', options: ['3.0', '3.5', '4.0', '6.0'], correctIndex: 1 },
    { question: 'What is the variance of a Poisson distribution with mean λ = 4?', options: ['2', '4', '16', '0.25'], correctIndex: 1 },
    { question: 'Under Normal N(μ, σ²), what percent of data falls within μ ± 2σ?', options: ['68%', '95%', '99.7%', '50%'], correctIndex: 1 },
    { question: 'What is the present value of a perpetuity-immediate paying ₹50,000/yr at 5%?', options: ['₹2,50,000', '₹10,00,000', '₹5,00,000', '₹50,00,000'], correctIndex: 1 },
    { question: 'In LPP, where does the optimal solution of a bounded region always lie?', options: ['At the center', 'At an extreme corner vertex', 'Along the x-axis only', 'Outside the region'], correctIndex: 1 },
    { question: 'What does the constraint x ≥ 0, y ≥ 0 represent in LPP?', options: ['Non-negativity restriction', 'Objective function', 'Labour constraint', 'Unboundedness'], correctIndex: 0 },
    { question: 'How is perpetuity-due PV calculated compared to perpetuity-immediate?', options: ['PV_due = PV_imm / (1+r)', 'PV_due = PV_imm · (1+r)', 'PV_due = PV_imm - A', 'PV_due = 2 · PV_imm'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates deep understanding across probability models (Binomial/Poisson/Normal), 2D LPP formulation & graphical optimisation, and financial perpetuities/sinking funds.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Random Variable Expectation & Variance Balance',
    instruction: 'Adjust the probability sliders for values X={0, 1, 2, 3}. Observe how the center of mass (Mean μ) and spread (Variance σ²) dynamically shift.',
    interactionType: 'rv-balance',
    nodeId: NODE_C12_APPMATH_052,
  },
  {
    title: 'Lab 2: Binomial vs Poisson Convergence',
    instruction: 'Increase trials n and decrease success probability p while keeping np = λ constant. Watch the Binomial bars converge onto the Poisson curve.',
    interactionType: 'distribution-convergence',
    nodeId: NODE_C12_APPMATH_054,
  },
  {
    title: 'Lab 3: Normal Bell Curve & Empirical 68-95-99.7 Zones',
    instruction: 'Slide the Mean μ and Standard Deviation σ. Drag the Z-score slider to shade cumulative tail probabilities.',
    interactionType: 'normal-interactive',
    nodeId: NODE_C12_APPMATH_055,
  },
  {
    title: 'Lab 4: 2D Linear Programming Feasible Polytope & Iso-Profit Sweep',
    instruction: 'Modify constraint capacities and slide the Objective Profit line Z = ax + by to visually verify why optima occur at corner vertices.',
    interactionType: 'lpp-solver',
    nodeId: NODE_C12_APPMATH_058,
  },
  {
    title: 'Lab 5: Actuarial Wealth Engine — Perpetuity & Sinking Fund',
    instruction: 'Toggle between infinite perpetual endowments (PV = A/r) and targeted Sinking Fund accumulation curves over time.',
    interactionType: 'finance-engine',
    nodeId: NODE_C12_APPMATH_060,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase the standard deviation σ of a Normal curve while keeping mean μ constant, what happens to the height of the peak at μ?',
    options: [
      'The peak becomes taller and narrower',
      'The peak becomes flatter/lower to preserve total area = 1',
      'The peak shifts to the right',
      'The peak stays exactly the same height',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the σ slider in Lab 3 from 2 to 6 and observe how the bell curve flattens out while maintaining total area equal to 1.0!',
    nodeId: NODE_C12_APPMATH_055,
  },
  {
    question: 'Predict: In an LPP where you want to maximise profit Z = 50x + 40y, will an interior point in the middle of the feasible region ever give a higher profit than ALL corner vertices?',
    options: [
      'Yes, interior points always have higher synergy',
      'No, because linear functions attain their absolute maximum at the boundaries/vertices',
      'Only if constraints are non-linear',
      'Only if x = y',
    ],
    correctIndex: 1,
    verifyInstruction: 'Sweep the Iso-Profit line in Lab 4 across the feasible region and observe that the highest profit line touches the boundary corner vertex last!',
    nodeId: NODE_C12_APPMATH_059,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Binomial-Poisson convergence lab, what happens when n=100 and p=0.03 (so λ=3)?',
    observableOptions: [
      'The Binomial discrete bar heights become almost identical to the Poisson curve points',
      'The Binomial distribution becomes completely flat',
      'The Poisson distribution shifts into negative numbers',
      'The total probability becomes greater than 1.0',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_APPMATH_054,
  },
  {
    question: 'In the Sinking Fund growth timeline, what causes the curve to accelerate upward in later years?',
    observableOptions: [
      'Fresh annual deposits increase every year',
      'Compound interest on earlier accumulated balances multiplies the annual growth',
      'The interest rate automatically doubles',
      'The target amount reduces over time',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_APPMATH_060,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Quantitative Brief: Namma Metro Expansion Plan',
  description: 'Design a 3-part quantitative strategy for Bengaluru Metro: (1) Model hourly escalator breakdown probabilities using Poisson(λ=1.5); (2) Formulate an LPP to allocate 200 security guards and 150 ticketing staff across 30 stations to maximize passenger throughput; (3) Structure a ₹50 Crore Sinking Fund over 15 years at 7.5% interest for fleet overhaul.',
  steps: [
    'Calculate P(X=0) and P(X ≥ 2) for escalator breakdowns during peak hours.',
    'Write the linear constraint inequations and objective function for station staff allocation.',
    'Compute the annual sinking fund deposit required: A = S / s_{15|0.075}.',
    'Present your mathematical findings in an executive dashboard summary.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── HELPER MATH FUNCTIONS ───
function factorial(n: number): number {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function binomialPMF(n: number, p: number, k: number): number {
  return nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function poissonPMF(lambda: number, k: number): number {
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
}

function normalPDF(x: number, mu: number, sigma: number): number {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
}

// ─── MAIN SIMULATION COMPONENT ───
function C12_AppliedMathsRandomVariableProbabilitySim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org interaction states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints & visual feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive Challenge types state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── RICH INTERACTIVE SIMULATION LAB STATES ───
  // Lab 1: Random Variable balance state
  const [p0, setP0] = useState(0.4);
  const [p1, setP1] = useState(0.3);
  const [p2, setP2] = useState(0.2);
  const [p3, setP3] = useState(0.1);

  // Lab 2: Binomial / Poisson convergence state
  const [binomN, setBinomN] = useState(20);
  const [binomP, setBinomP] = useState(0.15);
  const [poissonLambda, setPoissonLambda] = useState(3.0);

  // Lab 3: Normal distribution state
  const [normalMu, setNormalMu] = useState(70);
  const [normalSigma, setNormalSigma] = useState(5);
  const [normalZSlider, setNormalZSlider] = useState(1.0);

  // Lab 4: Linear Programming Solver state
  const [lppCapacity1, setLppCapacity1] = useState(60); // 2x + y <= C1
  const [lppCapacity2, setLppCapacity2] = useState(80); // x + 2y <= C2
  const [lppObjA, setLppObjA] = useState(40);          // Z = ax + by
  const [lppObjB, setLppObjB] = useState(30);
  const [lppZSweep, setLppZSweep] = useState(1200);

  // Lab 5: Finance Engine state
  const [perpPayment, setPerpPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(0.06);
  const [isPerpDue, setIsPerpDue] = useState(false);
  const [sinkingTarget, setSinkingTarget] = useState(900000);
  const [sinkingYears, setSinkingYears] = useState(5);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES ───
  // RV Calculations
  const normProbSum = useMemo(() => p0 + p1 + p2 + p3, [p0, p1, p2, p3]);
  const normP0 = useMemo(() => (normProbSum > 0 ? p0 / normProbSum : 0.25), [p0, normProbSum]);
  const normP1 = useMemo(() => (normProbSum > 0 ? p1 / normProbSum : 0.25), [p1, normProbSum]);
  const normP2 = useMemo(() => (normProbSum > 0 ? p2 / normProbSum : 0.25), [p2, normProbSum]);
  const normP3 = useMemo(() => (normProbSum > 0 ? p3 / normProbSum : 0.25), [p3, normProbSum]);

  const rvMean = useMemo(() => 0 * normP0 + 1 * normP1 + 2 * normP2 + 3 * normP3, [normP0, normP1, normP2, normP3]);
  const rvVar = useMemo(() => {
    const eX2 = 0 * normP0 + 1 * normP1 + 4 * normP2 + 9 * normP3;
    return Math.max(0, eX2 - rvMean * rvMean);
  }, [normP0, normP1, normP2, normP3, rvMean]);
  const rvSD = useMemo(() => Math.sqrt(rvVar), [rvVar]);

  // LPP Corner Points Calculation
  const lppCorners = useMemo(() => {
    const ptOrigin = { x: 0, y: 0, label: 'O(0,0)' };
    const ptX1 = { x: lppCapacity1 / 2, y: 0, label: `A(${ (lppCapacity1 / 2).toFixed(0) },0)` };
    const ptY2 = { x: 0, y: lppCapacity2 / 2, label: `B(0,${ (lppCapacity2 / 2).toFixed(0) })` };
    const interX = Math.max(0, (2 * lppCapacity1 - lppCapacity2) / 3);
    const interY = Math.max(0, (2 * lppCapacity2 - lppCapacity1) / 3);
    const ptInter = { x: interX, y: interY, label: `C(${ interX.toFixed(1) }, ${ interY.toFixed(1) })` };

    const pts = [ptOrigin, ptX1, ptInter, ptY2];
    return pts.map(p => ({
      ...p,
      zVal: lppObjA * p.x + lppObjB * p.y,
    }));
  }, [lppCapacity1, lppCapacity2, lppObjA, lppObjB]);

  const lppMaxCorner = useMemo(() => {
    let maxPt = lppCorners[0];
    for (const pt of lppCorners) {
      if (pt.zVal > maxPt.zVal) maxPt = pt;
    }
    return maxPt;
  }, [lppCorners]);

  // Financial Calculations
  const perpPV = useMemo(() => {
    if (interestRate <= 0) return 0;
    const base = perpPayment / interestRate;
    return isPerpDue ? base * (1 + interestRate) : base;
  }, [perpPayment, interestRate, isPerpDue]);

  const sinkingAnnualDeposit = useMemo(() => {
    if (interestRate <= 0 || sinkingYears <= 0) return 0;
    const factor = (Math.pow(1 + interestRate, sinkingYears) - 1) / interestRate;
    return sinkingTarget / factor;
  }, [sinkingTarget, interestRate, sinkingYears]);

  // Adaptive Challenges Filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C12_APPMATH_051);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS PARTICLE WAVE ANIMATION EFFECT ───
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

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.sin(x * 0.03 + frame * 0.05) * 8 * Math.cos(frame * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── 14 EXTRACTED USECALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding probabilistic intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Applied Maths Labs. Manipulate variables and discover the core principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox Mode activated. Experiment with all models without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode initiated. Apply your quantitative mastery to solve real-world problems.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation slider to test your prediction.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation!' : 'Observe the convergence graph closely.');
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('tap');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('tap');
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
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Applied Mathematics Probability and Optimisation Engine.');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent mathematical reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
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
        speechManager.speak('Let us review the step-by-step solution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, hitMisconceptions, showNextHint]);

  // Clean inactivity timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400">
              ISC Class 12 • {subjectConfig.name}
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-500/40'
                : 'bg-indigo-950/60 text-indigo-400 border-indigo-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right text-xs text-slate-400">
            <div>Mastery: <span className="font-bold text-white capitalize">{masteryLevel}</span></div>
            <div>Score: <span className="font-bold text-indigo-300">{scoreBreakdown.correct}/{scoreBreakdown.total}</span></div>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Narrative Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
              <span>🚇</span> NARRATIVE CASE STUDY
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-indigo-200">
              💡 {SCENARIO.context}
            </div>
          </div>

          {/* Curiosity Discovery Hook */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Curiosity Hook • Pre-Exploration Challenge
              </span>
              <span className="text-xs text-slate-400">No grading • Test your instinct</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 mt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '🎯 Spot on! Exact Poisson formula P(X=0) = e⁻⁴ ≈ 0.0183.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Slide Navigation Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentSlide(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[1] || step.title}
              </motion.button>
            ))}
          </div>

          {/* Interactive Lab Container */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-400 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 font-mono self-start md:self-auto">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
            </div>

            {/* LAB 1: RANDOM VARIABLE BALANCE */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  {/* Controls */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="text-xs font-bold uppercase text-indigo-400 tracking-wider">
                      Probability Mass Sliders (Normalized automatically)
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>P(X=0) Weight</span>
                        <span className="font-mono text-indigo-300">{normP0.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={p0}
                        onChange={e => setP0(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="P0 probability weight"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>P(X=1) Weight</span>
                        <span className="font-mono text-indigo-300">{normP1.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={p1}
                        onChange={e => setP1(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="P1 probability weight"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>P(X=2) Weight</span>
                        <span className="font-mono text-indigo-300">{normP2.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={p2}
                        onChange={e => setP2(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="P2 probability weight"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>P(X=3) Weight</span>
                        <span className="font-mono text-indigo-300">{normP3.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={p3}
                        onChange={e => setP3(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="P3 probability weight"
                      />
                    </div>
                  </div>

                  {/* Visual Balance Beam & Calculations */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between h-full">
                    <div className="grid grid-cols-3 gap-2 text-center mb-4">
                      <div className="p-3 bg-slate-900 rounded-lg border border-indigo-500/30">
                        <div className="text-xs text-slate-400">Mean E(X)</div>
                        <div className="text-xl font-mono font-bold text-indigo-400">{rvMean.toFixed(2)}</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-purple-500/30">
                        <div className="text-xs text-slate-400">Variance σ²</div>
                        <div className="text-xl font-mono font-bold text-purple-400">{rvVar.toFixed(2)}</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-pink-500/30">
                        <div className="text-xs text-slate-400">Std Dev σ</div>
                        <div className="text-xl font-mono font-bold text-pink-400">{rvSD.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* SVG Visual Balance Beam */}
                    <svg viewBox="0 0 400 160" className="w-full bg-slate-900/50 rounded-lg">
                      {/* Fulcrum at Mean */}
                      <polygon
                        points={`${50 + rvMean * 100},140 ${40 + rvMean * 100},160 ${60 + rvMean * 100},160`}
                        fill="#6366f1"
                      />
                      <text x={50 + rvMean * 100} y="158" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="bold">
                        ▲ μ={rvMean.toFixed(2)}
                      </text>

                      {/* Beam */}
                      <line x1="30" y1="135" x2="370" y2="135" stroke="#94a3b8" strokeWidth="4" />

                      {/* Weights on Beam */}
                      {[
                        { x: 0, p: normP0, pos: 50 },
                        { x: 1, p: normP1, pos: 150 },
                        { x: 2, p: normP2, pos: 250 },
                        { x: 3, p: normP3, pos: 350 },
                      ].map(item => (
                        <g key={item.x}>
                          <rect
                            x={item.pos - 15}
                            y={135 - item.p * 120}
                            width="30"
                            height={Math.max(4, item.p * 120)}
                            rx="4"
                            fill="#3b82f6"
                            opacity="0.85"
                          />
                          <text x={item.pos} y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                            X={item.x}
                          </text>
                          <text x={item.pos} y={120 - item.p * 120} textAnchor="middle" fill="#93c5fd" fontSize="9">
                            {(item.p * 100).toFixed(0)}%
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: BINOMIAL VS POISSON CONVERGENCE */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="text-xs font-bold uppercase text-indigo-400 tracking-wider">
                      Convergence Controls: np → λ
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Trials n (Binomial)</span>
                        <span className="font-mono text-indigo-300">{binomN}</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        step="5"
                        value={binomN}
                        onChange={e => setBinomN(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Success Prob p (Binomial)</span>
                        <span className="font-mono text-indigo-300">{binomP.toFixed(3)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.01"
                        max="0.5"
                        step="0.01"
                        value={binomP}
                        onChange={e => setBinomP(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Rate Parameter λ (Poisson)</span>
                        <span className="font-mono text-indigo-300">{(binomN * binomP).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Notice how the product np = {(binomN * binomP).toFixed(2)} acts as the exact Poisson rate λ.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-blue-400 font-bold">■ Binomial Mean (np):</span>
                        <span>{(binomN * binomP).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-400 font-bold">■ Binomial Variance (npq):</span>
                        <span>{(binomN * binomP * (1 - binomP)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-400 font-bold">● Poisson Mean = Var (λ):</span>
                        <span>{(binomN * binomP).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Convergence Chart */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-blue-400 font-semibold">■ Binomial B({binomN}, {binomP.toFixed(2)})</span>
                      <span className="text-emerald-400 font-semibold">● Poisson(λ={(binomN * binomP).toFixed(2)})</span>
                    </div>
                    <svg viewBox="0 0 350 180" className="w-full bg-slate-900/50 rounded-lg">
                      {/* Grid Lines */}
                      <line x1="30" y1="150" x2="340" y2="150" stroke="#475569" strokeWidth="1" />
                      <line x1="30" y1="20" x2="30" y2="150" stroke="#475569" strokeWidth="1" />

                      {/* Bars & Points for k=0 to 10 */}
                      {Array.from({ length: 11 }, (_, k) => {
                        const lambda = binomN * binomP;
                        const bProb = binomialPMF(binomN, binomP, k);
                        const pProb = poissonPMF(lambda, k);
                        const x = 45 + k * 26;
                        const yBinom = 150 - bProb * 300;
                        const yPois = 150 - pProb * 300;

                        return (
                          <g key={k}>
                            {/* Binomial bar */}
                            <rect
                              x={x - 6}
                              y={Math.max(20, yBinom)}
                              width="12"
                              height={Math.max(1, 150 - Math.max(20, yBinom))}
                              fill="#3b82f6"
                              opacity="0.65"
                              rx="2"
                            />
                            {/* Poisson point */}
                            <circle cx={x} cy={Math.max(20, yPois)} r="4" fill="#10b981" />
                            <text x={x} y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">
                              {k}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: NORMAL DISTRIBUTION BELL CURVE */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                {/* Predict then Check */}
                {!predictionMade ? (
                  <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-500/30">
                    <p className="text-sm font-semibold text-white mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="p-3 text-left rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 text-xs text-emerald-300">
                    ✓ Prediction logged! {PREDICTION_QUESTIONS[0].verifyInstruction}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Mean μ</span>
                        <span className="font-mono text-indigo-300">{normalMu}</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="90"
                        step="1"
                        value={normalMu}
                        onChange={e => setNormalMu(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Standard Deviation σ</span>
                        <span className="font-mono text-indigo-300">{normalSigma}</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="10"
                        step="0.5"
                        value={normalSigma}
                        onChange={e => setNormalSigma(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Standard Normal Z cutoff</span>
                        <span className="font-mono text-indigo-300">Z = {normalZSlider.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min="-3"
                        max="3"
                        step="0.1"
                        value={normalZSlider}
                        onChange={e => setNormalZSlider(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
                      <div className="font-bold text-indigo-300">Empirical Rule Boundaries:</div>
                      <div>68% Zone: [{normalMu - normalSigma}, {normalMu + normalSigma}] (μ ± 1σ)</div>
                      <div>95% Zone: [{normalMu - 2 * normalSigma}, {normalMu + 2 * normalSigma}] (μ ± 2σ)</div>
                      <div>99.7% Zone: [{normalMu - 3 * normalSigma}, {normalMu + 3 * normalSigma}] (μ ± 3σ)</div>
                    </div>
                  </div>

                  {/* SVG Normal Bell Curve */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 350 180" className="w-full bg-slate-900/50 rounded-lg">
                      {/* Bell Curve Path */}
                      <path
                        d={(() => {
                          let d = '';
                          for (let px = 20; px <= 330; px += 2) {
                            const xVal = normalMu + ((px - 175) / 140) * (3.5 * normalSigma);
                            const yVal = normalPDF(xVal, normalMu, normalSigma);
                            const py = 150 - yVal * 1200 * (normalSigma / 5);
                            if (px === 20) d += `M ${px} ${Math.max(20, py)}`;
                            else d += ` L ${px} ${Math.max(20, py)}`;
                          }
                          return d;
                        })()}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="3"
                      />

                      {/* Mean Axis */}
                      <line x1="175" y1="20" x2="175" y2="150" stroke="#f59e0b" strokeDasharray="3,3" strokeWidth="2" />
                      <text x="175" y="165" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">
                        μ={normalMu}
                      </text>

                      {/* Cutoff Marker */}
                      {(() => {
                        const cutoffX = 175 + (normalZSlider / 3.5) * 140;
                        return (
                          <g>
                            <line x1={cutoffX} y1="30" x2={cutoffX} y2="150" stroke="#ec4899" strokeWidth="2" />
                            <text x={cutoffX} y="25" textAnchor="middle" fill="#f472b6" fontSize="8" fontWeight="bold">
                              Z={normalZSlider.toFixed(1)}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: 2D LINEAR PROGRAMMING OPTIMISER */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="text-xs font-bold uppercase text-indigo-400 tracking-wider">
                      LPP Constraints & Iso-Profit Sweeper
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Labour Capacity C1 (2x + y ≤ C1)</span>
                        <span className="font-mono text-indigo-300">{lppCapacity1}</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="100"
                        step="5"
                        value={lppCapacity1}
                        onChange={e => setLppCapacity1(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Material Capacity C2 (x + 2y ≤ C2)</span>
                        <span className="font-mono text-indigo-300">{lppCapacity2}</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="100"
                        step="5"
                        value={lppCapacity2}
                        onChange={e => setLppCapacity2(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Objective Function Z = {lppObjA}x + {lppObjB}y</span>
                        <span className="font-mono text-emerald-400">Max Z = ₹{lppMaxCorner.zVal.toFixed(0)}</span>
                      </div>
                    </div>

                    {/* Corner Points Table */}
                    <div className="p-3 bg-slate-900 rounded-lg text-xs">
                      <div className="font-bold text-slate-300 mb-1">Corner Point Evaluations:</div>
                      <div className="grid grid-cols-2 gap-1 text-[11px]">
                        {lppCorners.map((pt, i) => (
                          <div
                            key={i}
                            className={`p-1.5 rounded ${
                              pt === lppMaxCorner ? 'bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold' : 'text-slate-400'
                            }`}
                          >
                            {pt.label}: Z = ₹{pt.zVal.toFixed(0)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SVG Feasible Region Polygon */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 320 220" className="w-full bg-slate-900/50 rounded-lg">
                      {/* Axes */}
                      <line x1="30" y1="190" x2="300" y2="190" stroke="#64748b" strokeWidth="2" />
                      <line x1="30" y1="20" x2="30" y2="190" stroke="#64748b" strokeWidth="2" />
                      <text x="290" y="205" fill="#94a3b8" fontSize="9">x</text>
                      <text x="15" y="30" fill="#94a3b8" fontSize="9">y</text>

                      {/* Feasible Region Polygon */}
                      <polygon
                        points={`
                          30,190
                          ${30 + (lppCapacity1 / 2) * 2.8},190
                          ${30 + lppMaxCorner.x * 2.8},${190 - lppMaxCorner.y * 2.8}
                          30,${190 - (lppCapacity2 / 2) * 2.8}
                        `}
                        fill="#6366f1"
                        fillOpacity="0.35"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />

                      {/* Corner vertices dots */}
                      {lppCorners.map((pt, i) => (
                        <g key={i}>
                          <circle
                            cx={30 + pt.x * 2.8}
                            cy={190 - pt.y * 2.8}
                            r={pt === lppMaxCorner ? '5' : '3'}
                            fill={pt === lppMaxCorner ? '#10b981' : '#f59e0b'}
                          />
                          <text
                            x={30 + pt.x * 2.8 + 6}
                            y={190 - pt.y * 2.8 - 4}
                            fill={pt === lppMaxCorner ? '#34d399' : '#cbd5e1'}
                            fontSize="8"
                            fontWeight={pt === lppMaxCorner ? 'bold' : 'normal'}
                          >
                            {pt.label}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: ACTUARIAL WEALTH ENGINE */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Controls */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-indigo-400 tracking-wider">
                        Perpetuity & Sinking Fund Engine
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsPerpDue(!isPerpDue)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                          isPerpDue ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {isPerpDue ? 'Perpetuity-Due (t=0)' : 'Perpetuity-Immediate (t=1)'}
                      </motion.button>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Annual Endowment Payment A</span>
                        <span className="font-mono text-indigo-300">₹{perpPayment.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="10000"
                        max="200000"
                        step="10000"
                        value={perpPayment}
                        onChange={e => setPerpPayment(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Effective Annual Interest Rate r</span>
                        <span className="font-mono text-indigo-300">{(interestRate * 100).toFixed(1)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.02"
                        max="0.12"
                        step="0.005"
                        value={interestRate}
                        onChange={e => setInterestRate(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Sinking Fund Target (Machinery Replacement)</span>
                        <span className="font-mono text-indigo-300">₹{sinkingTarget.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="200000"
                        max="2000000"
                        step="50000"
                        value={sinkingTarget}
                        onChange={e => setSinkingTarget(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Visual Output Card */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-500/30">
                        <div className="text-xs text-indigo-300 font-bold uppercase">Perpetuity Present Value Required Today</div>
                        <div className="text-2xl font-mono font-black text-white mt-1">₹{perpPV.toFixed(0).toLocaleString()}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          Formula: {isPerpDue ? 'PV = A(1+r)/r' : 'PV = A/r'}
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                        <div className="text-xs text-emerald-300 font-bold uppercase">Sinking Fund Annual Deposit (5 Years)</div>
                        <div className="text-2xl font-mono font-black text-white mt-1">
                          ₹{sinkingAnnualDeposit.toFixed(0).toLocaleString()} / yr
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Formula: A = S / s_{'{n|r}'}</div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-3">
                      💡 A sinking fund disciplined schedule eliminates sudden capital shocks when debt or plant replacements mature.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNextSlide}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
                >
                  Enter Free Sandbox Mode →
                </motion.button>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Sandbox Mode • Zero Pressure Exploration
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Multi-Model Quantitative Playground</h3>
              <p className="text-xs text-slate-400 mt-1">
                Freely manipulate continuous distributions, change LPP limits, or compute perpetuities before entering scored challenges.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 whitespace-nowrap"
            >
              Start Board Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sandbox Model 1: Dynamic LPP Solver */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-indigo-300">📐 Real-Time LPP Feasible Region</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-slate-400">Labour Limit (C1): {lppCapacity1}</label>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={lppCapacity1}
                    onChange={e => setLppCapacity1(parseInt(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Material Limit (C2): {lppCapacity2}</label>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={lppCapacity2}
                    onChange={e => setLppCapacity2(parseInt(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs flex justify-between items-center">
                <span className="text-slate-300">Optimal Vertex: <b className="text-emerald-400">{lppMaxCorner.label}</b></span>
                <span className="text-slate-300">Max Z: <b className="text-emerald-400">₹{lppMaxCorner.zVal.toFixed(0)}</b></span>
              </div>
            </div>

            {/* Sandbox Model 2: Poisson & Normal Evaluator */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-indigo-300">📊 Poisson Rate & Normal Evaluator</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-slate-400">Poisson Rate λ: {poissonLambda}</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={poissonLambda}
                    onChange={e => setPoissonLambda(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Normal Z: {normalZSlider}</label>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.1"
                    value={normalZSlider}
                    onChange={e => setNormalZSlider(parseFloat(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs flex justify-between items-center">
                <span className="text-slate-300">P(X=0 | λ): <b className="text-emerald-400">{(Math.exp(-poissonLambda) * 100).toFixed(2)}%</b></span>
                <span className="text-slate-300">Perp PV (6%): <b className="text-pink-400">₹{(perpPayment / 0.06).toLocaleString()}</b></span>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: STRUCTURED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Canvas Wave Animation Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-3">
            <canvas ref={canvasRef} width={600} height={32} className="w-full h-8 block" />
            <div className="flex items-center justify-between text-xs px-2 mt-1">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-mono uppercase tracking-wider">
                Competency: {challenge.competencyLevel}
              </span>
            </div>
            {/* Animated Progress Bar */}
            <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
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
            className={`p-6 rounded-2xl bg-slate-900 border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Node ID: {challenge.nodeId}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 capitalize">
                {challenge.difficulty}
              </span>
            </div>

            <h3 className="text-base md:text-lg font-semibold text-white mb-6 leading-relaxed">
              {challenge.question}
            </h3>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`w-full p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* TYPE 2: DRAG-LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items into the slots below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400">Target Role: {item.targetId.replace('target_', '').toUpperCase()}</span>
                      <div className="mt-2 text-sm font-mono font-bold text-indigo-300">
                        {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : 'Drop matching label here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Verify Dragged Labels
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Drag to reorder steps into correct sequential hierarchy:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-600/40 text-indigo-300 flex items-center justify-center font-bold text-[11px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC INPUT */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 focus:outline-none w-64"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-md disabled:opacity-50"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>

                {/* Palette */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-600/70 hover:bg-indigo-600 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Construction workspace */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-indigo-900 border border-indigo-500/40 text-indigo-200 rounded-lg text-xs font-mono font-bold flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click blocks above to construct the inequation</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm shadow-md"
                  >
                    Validate Inequation
                  </motion.button>
                  <button
                    onClick={() => setConstructParts([])}
                    className="px-4 py-2.5 bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-xl bg-amber-950/40 border border-amber-600/40 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Step-by-Step Board Examination Walkthrough
                  </span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200 leading-relaxed"
                    >
                      <b className="text-amber-400 mr-2">Step {idx + 1}:</b> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-amber-800/40">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 rounded-lg bg-amber-700/60 hover:bg-amber-600 text-white text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'View Final Mastery Summary →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: MASTERY SUMMARY & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Score Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/40 text-center space-y-2">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Module Mastery Attained!</h2>
            <div className="text-3xl font-mono font-black text-emerald-400">
              {Math.max(0, 100 - errors * 5)}%
            </div>
            <p className="text-xs text-slate-400">
              Assessed Knowledge Level: <span className="font-bold text-indigo-300 capitalize">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
            <div className="font-bold text-base mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </div>
            <p className="text-xs text-slate-300">
              {errors === 0
                ? 'Flawless execution! You possess complete ISC Board-level mastery in probability distributions, linear programming, and financial perpetuities.'
                : errors <= 3
                ? 'You demonstrated robust mathematical reasoning across models. Review any targeted concepts below to solidify your mastery.'
                : errors <= 7
                ? 'Probability and constrained optimisation take practice. Study the step-by-step methods and try again!'
                : 'Keep practicing! Review the fundamental concepts, study the misconception notes, and you will master this topic.'}
            </p>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Your Personal Diagnostic Gap Profile
              </div>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-300">❌ <b>Misconception:</b> {m.misconception}</div>
                      <div className="text-emerald-300">✓ <b>Board Correction:</b> {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/30 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-amber-400">Spaced Repetition Schedule (SM-2)</div>
              <div className="text-xs text-slate-300 mt-0.5">
                Next scheduled review interval:{' '}
                <b className="text-white">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </b>
              </div>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Capstone Assignment */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Real-World Capstone Activity: {REAL_WORLD_ACTIVITY.title}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{idx + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_AppliedMathsRandomVariableProbabilitySim;
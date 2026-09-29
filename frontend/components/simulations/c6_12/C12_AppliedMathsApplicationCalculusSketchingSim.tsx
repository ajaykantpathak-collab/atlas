'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C12_APPMATH_041 = 'c12_appmath_041';
const NODE_C12_APPMATH_042 = 'c12_appmath_042';
const NODE_C12_APPMATH_043 = 'c12_appmath_043';
const NODE_C12_APPMATH_044 = 'c12_appmath_044';
const NODE_C12_APPMATH_045 = 'c12_appmath_045';
const NODE_C12_APPMATH_046 = 'c12_appmath_046';
const NODE_C12_APPMATH_047 = 'c12_appmath_047';
const NODE_C12_APPMATH_048 = 'c12_appmath_048';
const NODE_C12_APPMATH_049 = 'c12_appmath_049';
const NODE_C12_APPMATH_050 = 'c12_appmath_050';

const ALL_NODE_IDS = [
  NODE_C12_APPMATH_041,
  NODE_C12_APPMATH_042,
  NODE_C12_APPMATH_043,
  NODE_C12_APPMATH_044,
  NODE_C12_APPMATH_045,
  NODE_C12_APPMATH_046,
  NODE_C12_APPMATH_047,
  NODE_C12_APPMATH_048,
  NODE_C12_APPMATH_049,
  NODE_C12_APPMATH_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Industrial Optimization Dilemma',
  intro: 'You are the Chief Quantitative Strategist for Bharat Electronics & Textile Syndicate. Your task is to mathematically model manufacturing cost-revenue dynamics, calculate market welfare surplus in the national mandi, formulate dynamic differential equations for heat & production rates, and optimize quality control risk using Bayes\' theorem.',
  context: 'Balance microeconomic calculus curves (AR, MR, MC, AC), evaluate market consumer/producer surplus, classify and solve dynamic differential equations, and compute reverse probabilities for factory defects.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In a competitive manufacturing plant, at which critical operational point does Average Cost (AC) reach its absolute minimum?',
  options: [
    'Where Marginal Cost (MC) = 0',
    'Where Marginal Cost intersects Average Cost from below (MC = AC)',
    'Where Total Revenue (R) = Total Cost (C)',
    'Where Marginal Revenue (MR) = 0',
  ],
  correctIndex: 1,
  hintAfter: 'Think about grade averages: if the score on your next exam (marginal) is lower than your average, your average drops; if it is higher, your average rises. The turning point happens exactly where the next score equals the average!',
};

// ─── INTERFACES ───
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_APPMATH_041,
  title: 'Applied Calculus, Differential Systems & Bayesian Inference',
  definition: 'Applied Calculus and Differential Modeling in ISC Class 12 encompasses curve sketching of economic cost/revenue functions, integration for market welfare surplus, classification and analytic solution of ordinary differential equations (separation of variables, homogeneous, and linear integrating factor methods), and probability models extending to Bayes theorem for inverse likelihood estimation.',
  eli5: 'Think of economics like driving a car: your speedometer is Marginal Cost, your trip average speed is Average Cost. When your instantaneous speed drops below average, the average drops. We also learn how to calculate fair market deals with integration, track rates of change with differential equations, and act like detectives updating our clues using Bayes rule.',
  misconceptions: [
    { misconception: 'Minimising Total Cost C(x) instead of Average Cost AC(x)', correction: 'Total cost C(x) generally grows monotonically with quantity; the economically optimal unit efficiency occurs at the minimum of Average Cost AC(x), where MC(x) = AC(x).' },
    { misconception: 'Reversing limits or subtraction in Consumer vs Producer Surplus integrals', correction: 'Consumer Surplus is buyer savings: CS = ∫[D(q) - p₀] dq. Producer Surplus is seller gain: PS = ∫[p₀ - S(q)] dq. Both represent positive physical areas.' },
    { misconception: 'Confusing order and degree of a differential equation', correction: 'Order is the highest derivative count (e.g., d²y/dx² has order 2). Degree is the power of that highest derivative after freeing the equation from radicals and rational exponents in derivatives.' },
    { misconception: 'Confusing mutually exclusive events with independent events', correction: 'Mutually exclusive means P(A ∩ B) = 0 (cannot happen together). Independent means P(A ∩ B) = P(A)·P(B). Non-trivial mutually exclusive events can never be independent!' },
    { misconception: 'Using Total Probability when a question asks for inverse cause (Bayes theorem)', correction: 'Total probability calculates the overall marginal probability P(Defective), while Bayes theorem computes the posterior conditional probability P(Machine | Defective).' },
  ],
  diagnosticQuestions: [
    { question: 'At what point does Average Cost (AC) achieve its minimum?', options: ['MC = 0', 'MC = AC', 'MR = MC', 'C(x) = 0'], correctIndex: 1 },
    { question: 'What is the formula for Consumer Surplus (CS)?', options: ['∫[p₀ - D(q)] dq', '∫[D(q) - p₀] dq', '∫[S(q) - p₀] dq', 'p₀ · q���'], correctIndex: 1 },
    { question: 'What is the degree of (d²y/dx²)³ + (dy/dx)⁴ = sin(x)?', options: ['4', '3', '2', 'Undefined'], correctIndex: 1 },
    { question: 'How many arbitrary constants exist in the general solution of a 2nd order ODE?', options: ['0', '1', '2', 'Infinite'], correctIndex: 2 },
    { question: 'Which substitution solves homogeneous equations dy/dx = f(y/x)?', options: ['y = vx', 'y = v + x', 'x = v²', 'y = e^(vx)'], correctIndex: 0 },
    { question: 'What is the Integrating Factor (IF) for dy/dx + (2/x)y = x³?', options: ['2 ln x', 'x²', 'e^(2x)', '1/x²'], correctIndex: 1 },
    { question: 'If P(A) = 0.5, P(B) = 0.4 and A, B are independent, what is P(A ∩ B)?', options: ['0.9', '0.1', '0.2', '0.0'], correctIndex: 2 },
    { question: 'Bayes\' theorem is primarily used to determine:', options: ['Prior likelihood', 'Posterior probability of a cause given observed evidence', 'Joint union probability', 'Variance of distributions'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student must demonstrate fluency across economic curve sketching, surplus integration, ODE classification/solution, and Bayesian conditional probability computation.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Economic Calculus: MC & AC Intersection',
    instruction: 'Adjust the fixed cost and variable parameter sliders to observe how the Marginal Cost (MC) line always cuts the Average Cost (AC) curve at its exact vertex minimum.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_APPMATH_041,
  },
  {
    title: '2. Market Equilibrium & Economic Welfare',
    instruction: 'Vary the market demand intercept and supply slope to visualize the dynamic equilibrium (q₀, p₀) and the shaded Consumer Surplus (CS) and Producer Surplus (PS) integral areas.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_APPMATH_042,
  },
  {
    title: '3. Differential Equations: Slope Field & Variable Separation',
    instruction: 'Modify the initial condition and rate constant to simulate trajectory curves y(x) evolving along the differential direction field dy/dx = k · x / y.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_APPMATH_045,
  },
  {
    title: '4. Linear Integrating Factor Flow',
    instruction: 'Select different P(x) coefficient functions and observe how multiplying by IF = e^(∫P dx) transforms the differential equation into an exact product derivative d/dx[y · IF].',
    interactionType: 'click-parts',
    nodeId: NODE_C12_APPMATH_047,
  },
  {
    title: '5. Bayesian Inverse Tree Visualizer',
    instruction: 'Adjust prior machine production shares (P(M₁), P(M₂)) and defective rates to see the posterior probability P(M₁ | Defective) update in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_APPMATH_050,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an enterprise doubles its Fixed Overhead Cost (FC), what happens to the output quantity q at which Average Cost is minimised?',
    options: [
      'Optimal quantity q increases (shifts right)',
      'Optimal quantity q decreases (shifts left)',
      'Optimal quantity remains strictly unchanged',
      'Average Cost becomes linear',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the Fixed Cost slider higher in the graph and verify that the minimum turning point of AC shifts to a larger quantity q!',
    nodeId: NODE_C12_APPMATH_041,
  },
  {
    question: 'Predict: If consumer demand becomes much more inelastic (steeper demand slope D(q)), what happens to Consumer Surplus (CS) at equilibrium?',
    options: [
      'Consumer Surplus increases significantly',
      'Consumer Surplus collapses to zero',
      'Consumer Surplus is transferred entirely to Producer Surplus',
      'Producer Surplus becomes negative',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Demand intercept and slope to verify how the area bounded above the price line expands dramatically.',
    nodeId: NODE_C12_APPMATH_042,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Industrial Quantitative Audit',
  description: 'Apply Applied Calculus, Differential Equations, and Bayesian analytics to a tier-1 Indian manufacturing enterprise in Pune.',
  steps: [
    'Model the factory cost function: C(q) = 3q² + 12q + 300. Calculate MC, AC, and find the cost-minimizing output scale.',
    'Given market demand p = 180 - 2q and supply p = 20 + 2q, evaluate consumer surplus in rupees in the wholesale market.',
    'Formulate the heat dissipation differential equation dT/dt + 0.05T = 1.5 and compute the equilibrium steady state.',
    'Audit quality control: If Plant A supplies 70% of auto components (1% defect) and Plant B supplies 30% (5% defect), evaluate P(Plant B | Defective) upon inspection.',
  ],
};

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the slope of the tangent line as you move along a curve from left to right?',
    observableOptions: [
      'The slope changes continuously, reflecting the instantaneous rate of change at each point (✓)',
      'The slope is constant everywhere on any curve (✗)',
      'The slope is always zero (✗)',
      'The slope only exists at the endpoints (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When you sketch the derivative graph f\'(x) from the original function f(x), what pattern emerges at local maxima?',
    observableOptions: [
      'The derivative crosses zero from positive to negative at local maxima (✓)',
      'The derivative reaches its maximum value (✗)',
      'The derivative is undefined at maxima (✗)',
      'The derivative becomes infinite (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // ─── FOUNDATION (Tier 1: 7 Questions) ───
  {
    id: 'ch_f_01',
    nodeId: NODE_C12_APPMATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Given total cost C(x) = 2x² + 6x + 50, what is the Marginal Cost (MC) function?',
    options: ['MC(x) = 4x + 6', 'MC(x) = 2x + 6 + 50/x', 'MC(x) = 4x² + 6', 'MC(x) = 4x'],
    correctIndex: 0,
    explanation: 'Marginal Cost is the first derivative of the total cost function with respect to output x: MC(x) = C\'(x) = d/dx(2x² + 6x + 50) = 4x + 6.',
    hints: [
      'Recall that Marginal indicates rate of change or instantaneous derivative dC/dx.',
      'Differentiate 2x² using the power rule (4x) and 6x (6); derivative of constant 50 is 0.',
      'Hence MC(x) = 4x + 6.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f_02',
    nodeId: NODE_C12_APPMATH_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the order and degree of the differential equation: (d²y/dx²)³ + 5(dy/dx)⁴ + y = cos(x)?',
    options: ['Order 2, Degree 3', 'Order 3, Degree 2', 'Order 2, Degree 4', 'Order 4, Degree 3'],
    correctIndex: 0,
    explanation: 'Order is determined by the highest derivative present (d²y/dx² → order 2). Degree is the exponent of this highest derivative in polynomial form (exponent is 3 → degree 3).',
    hints: [
      'Find the highest derivative first. Is it dy/dx or d²y/dx²?',
      'The second derivative d²y/dx² makes the order 2.',
      'Now look at the power to which d²y/dx² is raised: (d²y/dx²)³ gives degree 3.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f_03',
    nodeId: NODE_C12_APPMATH_048,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If events A and B satisfy P(A) = 0.6, P(B) = 0.5, and P(A ∩ B) = 0.3, what is the conditional probability P(A | B)?',
    options: ['0.6', '0.5', '0.3', '0.15'],
    correctIndex: 0,
    explanation: 'By the definition of conditional probability: P(A | B) = P(A ∩ B) / P(B) = 0.3 / 0.5 = 0.6. Notice P(A|B) = P(A), showing A and B are independent.',
    hints: [
      'Use the formula P(A | B) = P(A ∩ B) / P(B).',
      'Divide joint probability 0.3 by conditioning probability 0.5.',
      '0.3 / 0.5 = 0.6.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f_04',
    nodeId: NODE_C12_APPMATH_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How many arbitrary constants appear in the general solution of a 1st order differential equation, and how many differentiations are needed to form it from a family of curves with 1 constant?',
    options: [
      '1 constant; 1 differentiation',
      '2 constants; 2 differentiations',
      '1 constant; 2 differentiations',
      '0 constants; 1 differentiation',
    ],
    correctIndex: 0,
    explanation: 'The order of a differential equation equals the number of arbitrary constants in its general solution. Eliminating 1 constant requires exactly 1 differentiation.',
    hints: [
      'Think about y = Cx². It has 1 constant C.',
      'Differentiating once gives dy/dx = 2Cx; substituting C eliminates the single parameter.',
      '1 arbitrary constant implies a 1st order differential equation.',
    ],
  },
  {
    id: 'ch_f_05',
    nodeId: NODE_C12_APPMATH_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In market welfare calculus, what does Consumer Surplus (CS) geometrically represent on a price-quantity graph?',
    options: [
      'Area under the demand curve and ABOVE the equilibrium price line from q = 0 to q₀',
      'Area under the supply curve and below the price line',
      'Total rectangle area p₀ · q₀',
      'Area under the marginal cost curve',
    ],
    correctIndex: 0,
    explanation: 'Consumer Surplus is the integral CS = ∫₀^q₀ [D(q) - p₀] dq, which represents the geometric area under the demand curve and above the horizontal equilibrium price line p = p₀.',
    hints: [
      'Consumers gain when what they are willing to pay (demand D(q)) exceeds what they actually pay (p₀).',
      'Look at the region above the market price line bounded by the demand curve.',
      'The definite integral calculates the area under D(q) minus the rectangle p₀ · q₀.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f_06',
    nodeId: NODE_C12_APPMATH_047,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard Integrating Factor (IF) formula for the 1st order linear differential equation dy/dx + P(x)y = Q(x)?',
    options: ['IF = e^(∫ P(x) dx)', 'IF = ∫ P(x) dx', 'IF = e^(P(x))', 'IF = e^(∫ Q(x) dx)'],
    correctIndex: 0,
    explanation: 'The integrating factor is IF = e^(∫ P(x) dx). Multiplying by this factor allows the LHS to collapse into the exact derivative d/dx[y · IF].',
    hints: [
      'The factor must involve an exponential of an integral of P(x).',
      'Remember d/dx[y · e^(∫P dx)] = dy/dx · e^(∫P dx) + P · y · e^(∫P dx).',
      'Hence IF = e^(∫ P(x) dx).',
    ],
  },
  {
    id: 'ch_f_07',
    nodeId: NODE_C12_APPMATH_049,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If B₁ and B₂ form a complete partition of sample space S, and A is an event, what is the Theorem of Total Probability formula for P(A)?',
    options: [
      'P(A) = P(B₁)P(A|B₁) + P(B₂)P(A|B₂)',
      'P(A) = P(A|B₁) + P(A|B₂)',
      'P(A) = P(B₁) + P(B₂)',
      'P(A) = P(B₁ ∩ B₂) / P(A)',
    ],
    correctIndex: 0,
    explanation: 'By the Theorem of Total Probability, P(A) is the weighted sum of conditional probabilities across all partition pathways: P(A) = Σ P(Bᵢ)·P(A|Bᵢ) = P(B₁)P(A|B₁) + P(B₂)P(A|B₂).',
    hints: [
      'Think of total probability as summing weighted branches in a tree diagram.',
      'Each branch has prior P(Bᵢ) multiplied by likelihood P(A|Bᵢ).',
      'P(A) = P(B₁)P(A|B₁) + P(B₂)P(A|B₂).',
    ],
    misconceptionIndex: 4,
  },

  // ─── STANDARD (Tier 2: 7 Questions) ───
  {
    id: 'ch_s_01',
    nodeId: NODE_C12_APPMATH_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A textile mill in Surat has cost function C(x) = 3x² + 12x + 75. Calculate the output quantity x at which Average Cost AC(x) is minimised.',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'Average Cost AC(x) = C(x)/x = 3x + 12 + 75/x. Setting derivative dAC/dx = 3 - 75/x² = 0 gives 3 = 75/x² ⇒ x² = 25 ⇒ x = 5. (Alternatively, equate MC = AC: 6x + 12 = 3x + 12 + 75/x ⇒ 3x = 75/x ⇒ x = 5).',
    hints: [
      'Find AC(x) by dividing C(x) by x: AC(x) = 3x + 12 + 75/x.',
      'Either set d(AC)/dx = 0 or set MC(x) = AC(x).',
      '6x + 12 = 3x + 12 + 75/x leads to 3x² = 75, so x = 5.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_s_02',
    nodeId: NODE_C12_APPMATH_042,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Demand function is p = 40 - 2q and supply is p = 10 + q. Find the Consumer Surplus (CS) in rupees at market equilibrium.',
    correctAnswer: 100,
    tolerance: 1,
    unit: '₹',
    explanation: 'Equilibrium: 40 - 2q = 10 + q ⇒ 3q = 30 ⇒ q₀ = 10, p₀ = 20. CS = ∫₀¹⁰ [(40 - 2q) - 20] dq = ∫₀¹⁰ (20 - 2q) dq = [20q - q²]₀¹⁰ = 200 - 100 = 100.',
    hints: [
      'Find equilibrium by solving 40 - 2q = 10 + q to find q₀ = 10 and p₀ = 20.',
      'Integrate [D(q) - p₀] from 0 to 10: ∫₀¹⁰ (20 - 2q) dq.',
      '[20(10) - (10)²] = 200 - 100 = 100.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_s_03',
    nodeId: NODE_C12_APPMATH_045,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the mathematical terms to the correct step in solving the separable ODE: dy/dx = 2x · y.',
    dragItems: [
      { label: '(1/y) dy = 2x dx', targetId: 'step_sep' },
      { label: 'ln|y| = x² + C', targetId: 'step_int' },
      { label: 'y = A e^(x²)', targetId: 'step_sol' },
    ],
    correctMapping: {
      step_sep: '(1/y) dy = 2x dx',
      step_int: 'ln|y| = x² + C',
      step_sol: 'y = A e^(x²)',
    },
    explanation: 'Separating variables yields (1/y) dy = 2x dx. Integrating both sides gives ln|y| = x² + C. Exponentiating gives the explicit general solution y = A e^(x²).',
    hints: [
      'First step: separate all y to LHS and all x to RHS.',
      'Second step: integrate ∫(1/y)dy = ln|y| and ∫2x dx = x² + C.',
      'Third step: solve explicitly for y = e^(x² + C) = A e^(x²).',
    ],
  },
  {
    id: 'ch_s_04',
    nodeId: NODE_C12_APPMATH_047,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the general solution of the linear differential equation dy/dx + (1/x)y = 3x (for x > 0).',
    options: ['y = x² + C/x', 'y = x³ + C', 'y = 3x² + C/x', 'y = x²/2 + C/x'],
    correctIndex: 0,
    explanation: 'P(x) = 1/x ⇒ IF = e^(∫(1/x)dx) = e^(ln x) = x. Multiply ODE by x: d/dx[x · y] = 3x · x = 3x². Integrate: x · y = ∫ 3x² dx = x³ + C ⇒ y = x² + C/x.',
    hints: [
      'Compute IF = e^(ln x) = x.',
      'Multiply through: x dy/dx + y = 3x², which is d/dx[x y] = 3x².',
      'Integrate 3x² to get x³ + C, then divide by x to get y = x² + C/x.',
    ],
  },
  {
    id: 'ch_s_05',
    nodeId: NODE_C12_APPMATH_050,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Plant A makes 60% of transformers with 2% defect rate. Plant B makes 40% with 5% defect rate. Given a randomly chosen transformer is defective, what is the probability (in %) it came from Plant B?',
    correctAnswer: 62.5,
    tolerance: 0.5,
    unit: '%',
    explanation: 'P(A) = 0.60, P(D|A) = 0.02 ⇒ P(A ∩ D) = 0.012. P(B) = 0.40, P(D|B) = 0.05 ��� P(B ∩ D) = 0.020. Total P(D) = 0.012 + 0.020 = 0.032. Bayes\' rule: P(B|D) = 0.020 / 0.032 = 0.625 = 62.5%.',
    hints: [
      'Calculate P(D) = (0.60)(0.02) + (0.40)(0.05) = 0.012 + 0.020 = 0.032.',
      'Apply Bayes\' theorem: P(B | D) = P(B ∩ D) / P(D).',
      '0.020 / 0.032 = 5/8 = 62.5%.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s_06',
    nodeId: NODE_C12_APPMATH_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the differential equation dy/dx = (x² + 3y²)/(2xy) classified as homogeneous?',
    options: [
      'Every term in the numerator and denominator has the same total degree of 2',
      'It contains both x and y variables',
      'The right hand side equals zero',
      'It can be integrated directly without substitution',
    ],
    correctIndex: 0,
    explanation: 'A first-order ODE dy/dx = f(x,y) is homogeneous of degree zero if f(tx, ty) = f(x,y). Here x² (deg 2), 3y² (deg 2), and 2xy (deg 1+1=2) all share the identical algebraic degree 2.',
    hints: [
      'Examine the powers: x² has degree 2, y² has degree 2, xy has degree 1+1=2.',
      'Because all terms in numerator and denominator have degree 2, substituting x=tx, y=ty leaves the ratio unchanged.',
      'Hence it is homogeneous of degree 0, solvable via y = vx.',
    ],
  },
  {
    id: 'ch_s_07',
    nodeId: NODE_C12_APPMATH_049,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical steps to verify if three events A, B, C are mutually independent.',
    sortItems: [
      'Compute individual probabilities P(A), P(B), P(C)',
      'Verify pairwise independence: P(A∩B)=P(A)P(B), P(B∩C)=P(B)P(C), P(A∩C)=P(A)P(C)',
      'Verify the triple product condition: P(A∩B∩C) = P(A)P(B)P(C)',
      'Conclude mutual independence only if all four conditions hold',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Mutual independence for three events requires BOTH all 3 pairwise product tests AND the 1 triple product test to hold simultaneously.',
    hints: [
      'Start with the base individual probabilities.',
      'Check pairs first (pairwise independence).',
      'Check the triple intersection product.',
      'Final step is drawing the conclusion.',
    ],
    misconceptionIndex: 3,
  },

  // ─── ADVANCED (Tier 3: 7 Questions) ───
  {
    id: 'ch_a_01',
    nodeId: NODE_C12_APPMATH_041,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the exact mathematical condition for profit maximization of a firm given Revenue R(q) and Cost C(q).',
    availableParts: ['MR(q) = MC(q)', 'and', 'd²R/dq² < d²C/dq²', 'MR(q) = 0', 'AC(q) = MC(q)', 'd²P/dq² > 0'],
    targetState: 'MR(q) = MC(q) and d²R/dq² < d²C/dq²',
    validationHint: 'First order condition requires MR = MC; second order sufficiency requires d²P/dq² < 0, meaning d²R/dq² < d²C/dq².',
    explanation: 'Profit P(q) = R(q) - C(q). First derivative P\'(q) = R\'(q) - C\'(q) = 0 ⇒ MR = MC. Second derivative P\'\'(q) = R\'\'(q) - C\'\'(q) < 0 ⇒ d²R/dq² < d²C/dq² (i.e., MC cuts MR from below).',
    hints: [
      'Profit is maximized where marginal revenue equals marginal cost: MR(q) = MC(q).',
      'The second derivative of profit must be negative for a local maximum.',
      'P\'\'(q) = R\'\'(q) - C\'\'(q) < 0 gives d²R/dq² < d²C/dq².',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_a_02',
    nodeId: NODE_C12_APPMATH_044,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Form the differential equation for the family of curves y = A cos(3x) + B sin(3x), where A and B are arbitrary constants.',
    options: [
      'd²y/dx² + 9y = 0',
      'd²y/dx² - 9y = 0',
      'd²y/dx² + 3y = 0',
      'dy/dx + 3y = 0',
    ],
    correctIndex: 0,
    explanation: 'y = A cos 3x + B sin 3x. First derivative: dy/dx = -3A sin 3x + 3B cos 3x. Second derivative: d²y/dx² = -9A cos 3x - 9B sin 3x = -9(A cos 3x + B sin 3x) = -9y. Rearranging gives d²y/dx² + 9y = 0.',
    hints: [
      'Differentiate twice because there are two arbitrary constants (A and B).',
      'dy/dx = -3A sin 3x + 3B cos 3x.',
      'd²y/dx² = -9(A cos 3x + B sin 3x) = -9y, so d²y/dx² + 9y = 0.',
    ],
  },
  {
    id: 'ch_a_03',
    nodeId: NODE_C12_APPMATH_046,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Using the substitution y = vx, what transformed separable differential equation is obtained from dy/dx = (x² + y²)/(2xy)?',
    options: [
      '(2v / (1 - v²)) dv = dx / x',
      '(2v / (1 + v²)) dv = dx / x',
      '((1 - v²) / 2v) dv = dx / x',
      'v dv = dx / x',
    ],
    correctIndex: 0,
    explanation: 'dy/dx = v + x(dv/dx). RHS = (x² + v²x²)/(2x · vx) = (1 + v²)/(2v). Thus v + x(dv/dx) = (1 + v²)/(2v) ⇒ x(dv/dx) = (1 + v² - 2v²)/(2v) = (1 - v²)/(2v). Separating variables gives (2v / (1 - v²)) dv = dx/x.',
    hints: [
      'Replace y with vx and dy/dx with v + x(dv/dx).',
      'RHS simplifies to (1 + v²)/(2v).',
      'Subtract v: (1 + v²)/(2v) - v = (1 - v²)/(2v), then invert to separate with dv.',
    ],
  },
  {
    id: 'ch_a_04',
    nodeId: NODE_C12_APPMATH_047,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Solve the initial value problem dy/dx + 2y = 4 with y(0) = 5. What is the particular value of y when x = 1? (e ≈ 2.718, calculate to 2 decimal places)',
    correctAnswer: 2.41,
    tolerance: 0.05,
    unit: '',
    explanation: 'Linear ODE with P = 2, Q = 4. IF = e^(∫2 dx) = e^(2x). d/dx[y e^(2x)] = 4 e^(2x) ⇒ y e^(2x) = 2 e^(2x) + C ⇒ y = 2 + C e^(-2x). Initial condition y(0) = 5 gives 5 = 2 + C ⇒ C = 3. Particular solution: y(x) = 2 + 3 e^(-2x). At x = 1: y(1) = 2 + 3 e^(-2) = 2 + 3/(7.389) ≈ 2 + 0.406 = 2.41.',
    hints: [
      'Find integrating factor IF = e^(2x).',
      'Integrate to get y(x) = 2 + C e^(-2x).',
      'Use y(0) = 5 to find C = 3, then evaluate 2 + 3 e^(-2).',
    ],
  },
  {
    id: 'ch_a_05',
    nodeId: NODE_C12_APPMATH_042,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Given non-linear demand p = 100 - q² and linear supply p = 10 + q, evaluate the Producer Surplus (PS) in rupees at equilibrium (q₀ = 9, p₀ = 19).',
    correctAnswer: 40.5,
    tolerance: 0.5,
    unit: '₹',
    explanation: 'Equilibrium quantity q₀ = 9, price p₀ = 19. PS = ∫₀⁹ [p₀ - S(q)] dq = ∫₀⁹ [19 - (10 + q)] dq = ∫₀⁹ (9 - q) dq = [9q - q²/2]₀⁹ = 9(9) - (81/2) = 81 - 40.5 = 40.5.',
    hints: [
      'Producer Surplus formula: PS = ∫₀^q₀ [p₀ - S(q)] dq.',
      'Substitute S(q) = 10 + q and p₀ = 19 to get integrand (9 - q).',
      'Antiderivative is 9q - q²/2 evaluated from 0 to 9: 81 - 40.5 = 40.5.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_a_06',
    nodeId: NODE_C12_APPMATH_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A rare disease has 0.1% prevalence. A diagnostic test has 99% sensitivity and 95% specificity (5% false positive). If a patient tests positive, what is the approximate true posterior probability of having the disease?',
    options: ['~1.94% (less than 2%)', '~99%', '~95%', '~50%'],
    correctIndex: 0,
    explanation: 'Prior P(D) = 0.001, P(D\') = 0.999. P(+|D) = 0.99, P(+|D\') = 0.05. Total P(+) = (0.001)(0.99) + (0.999)(0.05) = 0.00099 + 0.04995 = 0.05094. Bayes\' posterior: P(D|+) = 0.00099 / 0.05094 ≈ 0.0194 = 1.94%. The overwhelming number of healthy individuals creates false positives that swamp true positives!',
    hints: [
      'Do not confuse test accuracy (99%) with posterior probability P(Disease | Positive).',
      'Compute true positives: 0.001 × 0.99 = 0.00099.',
      'Compute false positives: 0.999 × 0.05 = 0.04995. Total positives ≈ 0.05094. Ratio is ~0.00099 / 0.05094 ≈ 1.94%.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_a_07',
    nodeId: NODE_C12_APPMATH_049,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Three events A, B, C satisfy pairwise independence: P(A∩B)=P(A)P(B), P(B∩C)=P(B)P(C), P(A∩C)=P(A)P(C). Does this guarantee that P(A∩B∩C) = P(A)P(B)P(C)?',
    options: [
      'No, pairwise independence does NOT mathematically imply mutual independence',
      'Yes, pairwise independence is a necessary and sufficient condition',
      'Yes, because probability spaces are linear',
      'Only if all probabilities are rational numbers',
    ],
    correctIndex: 0,
    explanation: 'Pairwise independence is strictly weaker than mutual independence. Classic counterexamples (such as Bernstein\'s coin example) demonstrate pairwise independence where P(A∩B∩C) ≠ P(A)P(B)P(C).',
    hints: [
      'Recall the definition of mutual independence for 3 events: all 3 pairwise equations AND the triple product must hold.',
      'Pairwise independence only tests 2 events at a time.',
      'Hence pairwise independence alone does NOT guarantee mutual independence.',
    ],
    misconceptionIndex: 3,
  },
];

function C12_AppliedMathsApplicationCalculusSketchingSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Lab 1: Cost/Revenue Sliders
  const [fixedCost, setFixedCost] = useState(50);
  const [quadCostCoeff, setQuadCostCoeff] = useState(2);
  const [linearCostCoeff, setLinearCostCoeff] = useState(6);

  // Lab 2: Market Surplus Sliders
  const [demandIntercept, setDemandIntercept] = useState(60);
  const [demandSlope, setDemandSlope] = useState(2);
  const [supplyIntercept, setSupplyIntercept] = useState(10);
  const [supplySlope, setSupplySlope] = useState(2);

  // Lab 3: Differential Slope Field
  const [diffInitialY, setDiffInitialY] = useState(2);
  const [diffRateK, setDiffRateK] = useState(1);

  // Lab 4: Linear IF Selector
  const [selectedIFType, setSelectedIFType] = useState<'const' | 'inv_x' | 'linear'>('inv_x');

  // Lab 5: Bayes Sliders
  const [priorPlant1, setPriorPlant1] = useState(60);
  const [defectRate1, setDefectRate1] = useState(2);
  const [defectRate2, setDefectRate2] = useState(5);

  // Challenge Response States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Animation & Feedback States
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Active representation tab for multi-representation
  const [representationMode, setRepresentationMode] = useState<'graph' | 'algebra' | 'table'>('graph');

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED VALUES FOR LABS ───
  const minAC_Q = useMemo(() => {
    return Math.sqrt(Math.max(1, fixedCost) / Math.max(0.5, quadCostCoeff));
  }, [fixedCost, quadCostCoeff]);

  const minAC_Val = useMemo(() => {
    const q = minAC_Q;
    return quadCostCoeff * q + linearCostCoeff + fixedCost / q;
  }, [minAC_Q, quadCostCoeff, linearCostCoeff, fixedCost]);

  const marketEquilibrium = useMemo(() => {
    const q0 = Math.max(1, (demandIntercept - supplyIntercept) / (demandSlope + supplySlope));
    const p0 = demandIntercept - demandSlope * q0;
    const cs = 0.5 * (demandIntercept - p0) * q0;
    const ps = 0.5 * (p0 - supplyIntercept) * q0;
    return { q0: Math.round(q0 * 10) / 10, p0: Math.round(p0 * 10) / 10, cs: Math.round(cs * 10) / 10, ps: Math.round(ps * 10) / 10 };
  }, [demandIntercept, supplyIntercept, demandSlope, supplySlope]);

  const bayesCalculations = useMemo(() => {
    const p1 = priorPlant1 / 100;
    const p2 = 1 - p1;
    const d1 = defectRate1 / 100;
    const d2 = defectRate2 / 100;
    const totalDefect = p1 * d1 + p2 * d2;
    const postP1 = totalDefect > 0 ? (p1 * d1) / totalDefect : 0;
    const postP2 = totalDefect > 0 ? (p2 * d2) / totalDefect : 0;
    return {
      totalDefectPercent: (totalDefect * 100).toFixed(2),
      postP1Percent: (postP1 * 100).toFixed(1),
      postP2Percent: (postP2 * 100).toFixed(1),
    };
  }, [priorPlant1, defectRate1, defectRate2]);

  // ─── MOTIVATIONAL FEEDBACK TIER ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Flawless mastery across all calculus and probability concepts.';
    if (errors <= 3) return 'Great work! You demonstrated strong mathematical intuition.';
    if (errors <= 7) return 'Good effort! Review the step-by-step solutions to build deeper mastery.';
    return 'Do not give up — You WILL get this! Practice leads to complete mathematical confidence.';
  }, [errors]);

  // ─── MOUNT EFFECT: LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ───
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

  // ─── 2D CANVAS OSCILLATION ANIMATION EFFECT ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const renderAnim = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.sin(x * 0.04 + frame * 0.05) * 10 * Math.cos(frame * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const critX = (canvas.width / 2) + Math.sin(frame * 0.03) * 40;
      const critY = canvas.height / 2 + Math.sin(critX * 0.04 + frame * 0.05) * 10 * Math.cos(frame * 0.02);
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(critX, critY, 4 + Math.sin(frame * 0.1) * 1.5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(renderAnim);
    };

    renderAnim();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const hint = activeChallenge.hints[0];
        if (hint) {
          setCurrentHint(hint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(hint);
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, activeChallenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Excellent intuition! MC cuts AC at the minimum.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive calculus and differential modeling laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test your intuition in sandbox free exploration mode with all mathematical controls unlocked.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning adaptive mastery challenges. Think critically and verify derivatives!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis registered. Manipulate the parameters to verify your prediction.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hint = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hint);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hint);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const base = prev.length === activeChallenge.sortItems?.length ? prev : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const arr = [...base];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the applied calculus and differential systems simulation.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.01);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Rigorous mathematical deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + activeChallenge.nodeId, JSON.stringify(bktStateRef.current));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step calculus derivation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50"
            role="img"
            aria-label="calculator math"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs md:text-sm text-slate-400 font-medium">ISC Class 12 Applied Mathematics • Microeconomics, ODEs & Bayes</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700/60'
                : 'bg-gold-950/60 text-gold-400 border-gold-700/60'
            }`}
          >
            Tier: {difficulty}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300"
          >
            Mastery: <span className="text-gold-400 capitalize">{masteryLevel}</span>
          </motion.div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-6 space-y-6">
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/60 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-black text-gold-400 select-none">∫dy/dx</div>
            <h2 className="text-xl font-bold text-gold-300 mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-400/90 mt-3 font-semibold tracking-wide uppercase">Context: {SCENARIO.context}</p>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg" aria-hidden="true">💡</span>
              <h3 className="text-base font-bold text-white">Curiosity Challenge: Before We Begin</h3>
            </div>
            <p className="text-sm text-slate-200">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border flex items-center justify-between ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/70 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <div>
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </div>
                  {discoveryAnswered && (
                    <span className="ml-2 font-bold text-base">
                      {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <motion.div
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  className={`p-4 rounded-xl border text-xs md:text-sm leading-relaxed flex items-center gap-2 ${
                    discoveryCorrect ? 'bg-emerald-950/50 border-emerald-700 text-emerald-300' : 'bg-amber-950/50 border-amber-700 text-amber-300'
                  }`}
                >
                  <span className="text-lg font-bold">{discoveryCorrect ? '✓' : 'ℹ'}</span>
                  <span>{discoveryCorrect ? 'Spot on! Marginal quantities always dictate the slope of average quantities.' : DISCOVERY_QUESTION.hintAfter}</span>
                </motion.div>

                <div className="flex justify-end">
                  <motion.button
                    aria-label="Enter Interactive Lab Suite"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-xl font-bold shadow-lg shadow-gold-600/30 flex items-center gap-2 text-sm"
                  >
                    Enter Interactive Lab Suite →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-6">
          {/* Step Navigator */}
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800"
          >
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Go to ${step.title}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    currentSlide === idx ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {step.title.split(':')[0]}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-2 pl-2">
              <span className="text-xs text-slate-400 font-semibold">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            </div>
          </motion.div>

          {/* Active Lab Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-lg md:text-xl font-black text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs md:text-sm text-amber-400 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* Multi-Representation Switcher */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400 font-semibold mr-2">Representation:</span>
                {(['graph', 'algebra', 'table'] as const).map((mode) => (
                  <motion.button
                    key={mode}
                    aria-label={`Switch to ${mode} mode`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setRepresentationMode(mode);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                      representationMode === mode ? 'bg-gold-950 text-gold-300 border border-gold-700' : 'text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {mode}
                  </motion.button>
                ))}
              </div>

              {/* ─── LAB 1: COST CALCULUS ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Fixed Cost (FC):</span>
                        <span className="font-bold text-gold-400">₹{fixedCost}</span>
                      </div>
                      <input
                        aria-label="Fixed Cost Slider"
                        type="range"
                        min={10}
                        max={150}
                        step={5}
                        value={fixedCost}
                        onChange={(e) => {
                          setFixedCost(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Quadratic Coeff (a):</span>
                        <span className="font-bold text-gold-400">{quadCostCoeff}</span>
                      </div>
                      <input
                        aria-label="Quadratic Coefficient Slider"
                        type="range"
                        min={1}
                        max={5}
                        step={0.5}
                        value={quadCostCoeff}
                        onChange={(e) => {
                          setQuadCostCoeff(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Linear Coeff (b):</span>
                        <span className="font-bold text-gold-400">{linearCostCoeff}</span>
                      </div>
                      <input
                        aria-label="Linear Coefficient Slider"
                        type="range"
                        min={0}
                        max={15}
                        step={1}
                        value={linearCostCoeff}
                        onChange={(e) => {
                          setLinearCostCoeff(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {representationMode === 'graph' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <svg viewBox="0 0 500 280" className="w-full h-64 select-none">
                        <line x1="50" y1="240" x2="480" y2="240" stroke="#475569" strokeWidth="2" />
                        <line x1="50" y1="240" x2="50" y2="20" stroke="#475569" strokeWidth="2" />
                        <text x="480" y="255" fill="#94a3b8" fontSize="11" textAnchor="end">Output Quantity (q)</text>
                        <text x="45" y="20" fill="#94a3b8" fontSize="11" textAnchor="end">Cost (₹)</text>

                        {[50, 100, 150, 200].map((yVal) => (
                          <line key={yVal} x1="50" y1={240 - yVal} x2="480" y2={240 - yVal} stroke="#1e293b" strokeDasharray="3 3" />
                        ))}

                        {(() => {
                          let path = '';
                          for (let q = 1; q <= 15; q += 0.5) {
                            const ac = quadCostCoeff * q + linearCostCoeff + fixedCost / q;
                            const sx = 50 + q * 26;
                            const sy = Math.max(25, 240 - ac * 2.5);
                            path += (q === 1 ? 'M ' : 'L ') + `${sx} ${sy} `;
                          }
                          return <path d={path} fill="none" stroke="#38bdf8" strokeWidth="3" />;
                        })()}

                        {(() => {
                          const sx1 = 50 + 0 * 26;
                          const sy1 = 240 - linearCostCoeff * 2.5;
                          const sx2 = 50 + 15 * 26;
                          const sy2 = Math.max(25, 240 - (2 * quadCostCoeff * 15 + linearCostCoeff) * 2.5);
                          return <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} stroke="#f43f5e" strokeWidth="3" />;
                        })()}

                        {(() => {
                          const cx = 50 + minAC_Q * 26;
                          const cy = 240 - minAC_Val * 2.5;
                          return (
                            <g>
                              <line x1={cx} y1="240" x2={cx} y2={cy} stroke="#22c55e" strokeDasharray="4 4" strokeWidth="1.5" />
                              <circle cx={cx} cy={cy} r="6" fill="#22c55e" className="animate-pulse" />
                              <text x={cx} y={cy - 12} fill="#22c55e" fontSize="10" fontWeight="bold" textAnchor="middle">
                                Min AC (q={minAC_Q.toFixed(1)}, AC=₹{minAC_Val.toFixed(1)})
                              </text>
                            </g>
                          );
                        })()}

                        <rect x="330" y="25" width="140" height="50" rx="8" fill="#0f172a" stroke="#334155" />
                        <line x1="340" y1="40" x2="365" y2="40" stroke="#38bdf8" strokeWidth="3" />
                        <text x="375" y="44" fill="#38bdf8" fontSize="10" fontWeight="bold">Average Cost AC(q)</text>
                        <line x1="340" y1="60" x2="365" y2="60" stroke="#f43f5e" strokeWidth="3" />
                        <text x="375" y="64" fill="#f43f5e" fontSize="10" fontWeight="bold">Marginal Cost MC(q)</text>
                      </svg>
                    </motion.div>
                  )}

                  {representationMode === 'algebra' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs md:text-sm text-slate-300">
                      <p className="text-gold-400 font-bold">1. Total Cost Function: C(q) = {quadCostCoeff}q² + {linearCostCoeff}q + {fixedCost}</p>
                      <p className="text-rose-400">2. Marginal Cost: MC(q) = dC/dq = {2 * quadCostCoeff}q + {linearCostCoeff}</p>
                      <p className="text-gold-400">3. Average Cost: AC(q) = C(q)/q = {quadCostCoeff}q + {linearCostCoeff} + {fixedCost}/q</p>
                      <p className="text-emerald-400 font-bold">
                        4. Minimum AC Condition (MC = AC): {2 * quadCostCoeff}q + {linearCostCoeff} = {quadCostCoeff}q + {linearCostCoeff} + {fixedCost}/q ⇒ {quadCostCoeff}q = {fixedCost}/q ⇒ q = √({fixedCost}/{quadCostCoeff}) = {minAC_Q.toFixed(2)} units.
                      </p>
                    </motion.div>
                  )}

                  {representationMode === 'table' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <table className="w-full text-xs text-left text-slate-300 font-mono">
                        <thead className="text-slate-400 border-b border-slate-800">
                          <tr>
                            <th className="py-2">Quantity (q)</th>
                            <th className="py-2">Total Cost C(q)</th>
                            <th className="py-2">Marginal Cost MC(q)</th>
                            <th className="py-2">Average Cost AC(q)</th>
                            <th className="py-2">Behavior</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3, 4, 5, 6, 8, 10].map((q) => {
                            const c = quadCostCoeff * q * q + linearCostCoeff * q + fixedCost;
                            const mc = 2 * quadCostCoeff * q + linearCostCoeff;
                            const ac = c / q;
                            const isMin = Math.abs(q - minAC_Q) < 0.6;
                            return (
                              <tr key={q} className={`border-b border-slate-900 ${isMin ? 'bg-emerald-950/40 text-emerald-300 font-bold' : ''}`}>
                                <td className="py-2">{q}</td>
                                <td className="py-2">₹{c.toFixed(1)}</td>
                                <td className="py-2">₹{mc.toFixed(1)}</td>
                                <td className="py-2">₹{ac.toFixed(1)}</td>
                                <td className="py-2">{mc < ac ? 'MC < AC (Falling AC)' : mc > ac ? 'MC > AC (Rising AC)' : 'MC = AC (Minimum)'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </motion.div>
                  )}

                  {/* Predict-Then-Check Box */}
                  <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/60 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 text-sm" aria-hidden="true">🎯</span>
                      <h4 className="text-xs md:text-sm font-bold text-gold-300">Predict-Then-Check:</h4>
                    </div>
                    {!predictionMade ? (
                      <div className="space-y-2">
                        <p className="text-xs md:text-sm text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Predict option ${i + 1}: ${opt}`}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handlePrediction(i)}
                              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-left rounded-xl text-xs text-slate-300 border border-slate-800 hover:border-gold-500 transition-all"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <span>✓</span> Prediction registered! Now adjust Fixed Cost slider to test.
                        </p>
                        <p className="text-xs text-slate-300">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* ─── LAB 2: MARKET WELFARE ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Demand Intercept: {demandIntercept}</span>
                        <span>Demand Slope: {demandSlope}</span>
                      </div>
                      <input
                        aria-label="Demand Intercept Slider"
                        type="range"
                        min={40}
                        max={100}
                        step={5}
                        value={demandIntercept}
                        onChange={(e) => {
                          setDemandIntercept(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer mb-2"
                      />
                      <input
                        aria-label="Demand Slope Slider"
                        type="range"
                        min={1}
                        max={4}
                        step={0.5}
                        value={demandSlope}
                        onChange={(e) => {
                          setDemandSlope(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Supply Intercept: {supplyIntercept}</span>
                        <span>Supply Slope: {supplySlope}</span>
                      </div>
                      <input
                        aria-label="Supply Intercept Slider"
                        type="range"
                        min={0}
                        max={30}
                        step={5}
                        value={supplyIntercept}
                        onChange={(e) => {
                          setSupplyIntercept(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer mb-2"
                      />
                      <input
                        aria-label="Supply Slope Slider"
                        type="range"
                        min={1}
                        max={4}
                        step={0.5}
                        value={supplySlope}
                        onChange={(e) => {
                          setSupplySlope(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 500 280" className="w-full h-64 select-none">
                      <line x1="50" y1="240" x2="480" y2="240" stroke="#475569" strokeWidth="2" />
                      <line x1="50" y1="240" x2="50" y2="20" stroke="#475569" strokeWidth="2" />
                      <text x="480" y="255" fill="#94a3b8" fontSize="11" textAnchor="end">Quantity (q)</text>
                      <text x="45" y="20" fill="#94a3b8" fontSize="11" textAnchor="end">Price (₹)</text>

                      {(() => {
                        const q0 = marketEquilibrium.q0;
                        const p0 = marketEquilibrium.p0;
                        const eqX = 50 + q0 * 18;
                        const eqY = 240 - p0 * 2.2;
                        const dY0 = 240 - demandIntercept * 2.2;
                        const sY0 = 240 - supplyIntercept * 2.2;

                        return (
                          <g>
                            <polygon points={`50,${dY0} ${eqX},${eqY} 50,${eqY}`} fill="rgba(99, 102, 241, 0.35)" stroke="#6366f1" strokeWidth="1.5" />
                            <polygon points={`50,${sY0} ${eqX},${eqY} 50,${eqY}`} fill="rgba(34, 197, 94, 0.35)" stroke="#22c55e" strokeWidth="1.5" />

                            <line x1="50" y1={eqY} x2={eqX} y2={eqY} stroke="#fbbf24" strokeDasharray="3 3" strokeWidth="2" />
                            <line x1={eqX} y1="240" x2={eqX} y2={eqY} stroke="#fbbf24" strokeDasharray="3 3" strokeWidth="2" />

                            <line x1="50" y1={dY0} x2="450" y2={Math.max(20, 240 - (demandIntercept - demandSlope * 22) * 2.2)} stroke="#818cf8" strokeWidth="3" />
                            <line x1="50" y1={sY0} x2="450" y2={Math.max(20, 240 - (supplyIntercept + supplySlope * 22) * 2.2)} stroke="#4ade80" strokeWidth="3" />

                            <circle cx={eqX} cy={eqY} r="6" fill="#fbbf24" />
                            <text x={eqX + 10} y={eqY - 8} fill="#fbbf24" fontSize="11" fontWeight="bold">
                              Equilibrium (q₀={q0}, p₀=₹{p0})
                            </text>
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-800 text-xs">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-gold-950/50 rounded-xl border border-gold-800">
                        <span className="font-bold text-gold-400 block mb-1">Consumer Surplus (CS):</span>
                        <span className="text-lg font-black text-gold-300">₹{marketEquilibrium.cs}</span>
                        <p className="text-slate-400 mt-1">∫₀^{marketEquilibrium.q0} [D(q) - {marketEquilibrium.p0}] dq</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-emerald-950/50 rounded-xl border border-emerald-800">
                        <span className="font-bold text-emerald-400 block mb-1">Producer Surplus (PS):</span>
                        <span className="text-lg font-black text-emerald-300">₹{marketEquilibrium.ps}</span>
                        <p className="text-slate-400 mt-1">∫₀^{marketEquilibrium.q0} [{marketEquilibrium.p0} - S(q)] dq</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ─── LAB 3: SEPARATION OF VARIABLES ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">Differential Model: dy/dx = {diffRateK} · (x / y)</h4>
                        <p className="text-xs text-slate-400">Separable form: y dy = {diffRateK}x dx ⇒ y² - {diffRateK}x² = C (Hyperbolic Family)</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-xs text-slate-400">Initial y(0): {diffInitialY}</label>
                        <input
                          aria-label="Initial Y Slider"
                          type="range"
                          min={1}
                          max={5}
                          step={0.5}
                          value={diffInitialY}
                          onChange={(e) => {
                            setDiffInitialY(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="accent-gold-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <svg viewBox="0 0 500 240" className="w-full h-56 bg-slate-900 rounded-xl">
                      {(() => {
                        const lines = [];
                        for (let x = -8; x <= 8; x += 2) {
                          for (let y = -4; y <= 4; y += 1.5) {
                            if (y === 0) continue;
                            const slope = diffRateK * (x / y);
                            const angle = Math.atan(slope);
                            const len = 8;
                            const cx = 250 + x * 25;
                            const cy = 120 - y * 25;
                            const x1 = cx - Math.cos(angle) * len;
                            const y1 = cy + Math.sin(angle) * len;
                            const x2 = cx + Math.cos(angle) * len;
                            const y2 = cy - Math.sin(angle) * len;
                            lines.push(<line key={`${x}_${y}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="1.5" />);
                          }
                        }
                        return lines;
                      })()}

                      {(() => {
                        let pathUpper = '';
                        let pathLower = '';
                        for (let x = -8; x <= 8; x += 0.2) {
                          const yVal = Math.sqrt(diffInitialY * diffInitialY + diffRateK * x * x);
                          const sx = 250 + x * 25;
                          const syUpper = 120 - yVal * 25;
                          const syLower = 120 + yVal * 25;
                          pathUpper += (x === -8 ? 'M ' : 'L ') + `${sx} ${syUpper} `;
                          pathLower += (x === -8 ? 'M ' : 'L ') + `${sx} ${syLower} `;
                        }
                        return (
                          <g>
                            <path d={pathUpper} fill="none" stroke="#6366f1" strokeWidth="3" />
                            <path d={pathLower} fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="4 4" />
                            <circle cx="250" cy={120 - diffInitialY * 25} r="6" fill="#22c55e" />
                            <text x="260" y={115 - diffInitialY * 25} fill="#22c55e" fontSize="10" fontWeight="bold">
                              y(0) = {diffInitialY}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: LINEAR INTEGRATING FACTOR ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'inv_x' as const, label: 'P(x) = 1/x', desc: 'dy/dx + (1/x)y = x²', ifStr: 'IF = e^(ln x) = x' },
                      { id: 'const' as const, label: 'P(x) = 2', desc: 'dy/dx + 2y = e^x', ifStr: 'IF = e^(2x)' },
                      { id: 'linear' as const, label: 'P(x) = 2x', desc: 'dy/dx + 2x y = x', ifStr: 'IF = e^(x²)' },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        aria-label={`Select function ${item.label}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedIFType(item.id);
                          audioManager.play('tap');
                        }}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          selectedIFType === item.id ? 'bg-gold-950/80 border-gold-500 shadow-md' : 'bg-slate-950 border-slate-800 hover:bg-slate-900'
                        }`}
                      >
                        <h4 className="font-bold text-white text-sm mb-1">{item.label}</h4>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-gold-400">Step-by-Step Exact Derivative Collapse:</h4>
                    <div className="space-y-3 font-mono text-xs md:text-sm">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Step 1 (Integrating Factor):</span>{' '}
                        <span className="text-emerald-400 font-bold">
                          {selectedIFType === 'inv_x' ? 'IF = e^(∫(1/x)dx) = e^(ln x) = x' : selectedIFType === 'const' ? 'IF = e^(∫2 dx) = e^(2x)' : 'IF = e^(∫2x dx) = e^(x²)'}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Step 2 (Exact Product Derivative):</span>{' '}
                        <span className="text-gold-400 font-bold">
                          {selectedIFType === 'inv_x' ? 'd/dx[x · y] = x³' : selectedIFType === 'const' ? 'd/dx[y · e^(2x)] = e^(3x)' : 'd/dx[y · e^(x²)] = x e^(x²)'}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Step 3 (General Solution):</span>{' '}
                        <span className="text-amber-300 font-bold">
                          {selectedIFType === 'inv_x' ? 'y(x) = x³/4 + C/x' : selectedIFType === 'const' ? 'y(x) = (1/3)e^x + C e^(-2x)' : 'y(x) = 1/2 + C e^(-x²)'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ─── LAB 5: BAYESIAN REVERSE INFERENCE ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Plant 1 Production: {priorPlant1}%</span>
                        <span>Plant 2: {100 - priorPlant1}%</span>
                      </div>
                      <input
                        aria-label="Plant 1 Production Share"
                        type="range"
                        min={10}
                        max={90}
                        step={5}
                        value={priorPlant1}
                        onChange={(e) => {
                          setPriorPlant1(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Plant 1 Defect Rate:</span>
                        <span className="font-bold text-rose-400">{defectRate1}%</span>
                      </div>
                      <input
                        aria-label="Plant 1 Defect Rate"
                        type="range"
                        min={0.5}
                        max={10}
                        step={0.5}
                        value={defectRate1}
                        onChange={(e) => {
                          setDefectRate1(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Plant 2 Defect Rate:</span>
                        <span className="font-bold text-rose-400">{defectRate2}%</span>
                      </div>
                      <input
                        aria-label="Plant 2 Defect Rate"
                        type="range"
                        min={0.5}
                        max={10}
                        step={0.5}
                        value={defectRate2}
                        onChange={(e) => {
                          setDefectRate2(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Prior vs Posterior Breakdown</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Plant 1 (Prior: {priorPlant1}%)</span>
                            <span className="font-bold text-gold-400">Posterior: {bayesCalculations.postP1Percent}%</span>
                          </div>
                          <div className="h-3 bg-slate-900 rounded-full overflow-hidden flex">
                            <div style={{ width: `${priorPlant1}%` }} className="bg-gold-600/40 h-full" />
                            <div style={{ width: `${100 - priorPlant1}%` }} className="bg-slate-800 h-full" />
                          </div>
                          <div className="h-3 bg-slate-900 rounded-full overflow-hidden flex mt-1">
                            <div style={{ width: `${bayesCalculations.postP1Percent}%` }} className="bg-gold-500 h-full transition-all duration-300" />
                            <div style={{ width: `${bayesCalculations.postP2Percent}%` }} className="bg-rose-500 h-full transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">Total Defect Probability P(D) = {bayesCalculations.totalDefectPercent}%</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/60 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">Bayes\' Inversion Law</h4>
                        <p className="text-xs text-slate-300 font-mono">
                          P(Plant 1 | Defective) = [P(Plant 1) · P(D|Plant 1)] / P(Defective)
                        </p>
                        <p className="text-sm font-bold text-emerald-400 mt-2">
                          = ({priorPlant1 / 100} × {defectRate1 / 100}) / {parseFloat(bayesCalculations.totalDefectPercent) / 100} = {bayesCalculations.postP1Percent}%
                        </p>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Notice how high defect rates shift the posterior blame even with lower prior volume!</p>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs md:text-sm font-bold"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs md:text-sm font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Full Sandbox Playground</h3>
                <p className="text-xs text-slate-400 mt-1">Explore the dynamic calculus simulation freely with zero stakes or test timers.</p>
              </div>
              <motion.button
                aria-label="Begin Assessment Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
              >
                Ready for Assessment Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-gold-400 uppercase">Interactive Cost Vertex:</h4>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <span className="text-xs text-slate-400">Fixed Cost: ₹{fixedCost}</span>
                    <input
                      aria-label="Sandbox Fixed Cost"
                      type="range"
                      min={10}
                      max={200}
                      value={fixedCost}
                      onChange={(e) => setFixedCost(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-slate-400">Min AC Quantity:</span>
                    <p className="text-lg font-bold text-emerald-400">q = {minAC_Q.toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase">Live Total Surplus:</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400">Equilibrium Price:</span>
                    <p className="text-lg font-bold text-amber-400">p₀ = ₹{marketEquilibrium.p0}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Total Welfare:</span>
                    <p className="text-lg font-bold text-gold-400">₹{(marketEquilibrium.cs + marketEquilibrium.ps).toFixed(1)}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ASSESSMENT ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-6">
          <canvas ref={canvasRef} width={400} height={32} className="w-full rounded-xl bg-slate-900 border border-slate-800" />

          {/* Progress & Difficulty Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-gold-400 font-bold capitalize">NEP 2020: {activeChallenge.competencyLevel}</span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Challenge Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-600/80 shadow-rose-950/50 shadow-xl'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">{activeChallenge.question}</h3>

            {/* MCQ Type */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeChallenge.options.map((opt, i) => {
                    const isSelectedAndWrong = answerRevealed && i !== activeChallenge.correctIndex;
                    const isCorrectChoice = (showExplanation || answerRevealed) && i === activeChallenge.correctIndex;

                    return (
                      <motion.button
                        key={i}
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={showExplanation || answerRevealed}
                        onClick={() => handleAnswer(i)}
                        className={`p-4 rounded-2xl text-left text-xs md:text-sm font-medium transition-all border flex items-center justify-between ${
                          isCorrectChoice
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : isSelectedAndWrong
                            ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                            : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200 hover:border-gold-500'
                        }`}
                      >
                        <div>
                          <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                        </div>
                        {(showExplanation || answerRevealed) && (
                          <span className="font-bold text-base ml-2">
                            {isCorrectChoice ? '✓' : isSelectedAndWrong ? '✗' : ''}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}

            {/* Drag-Label Type */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Available Solution Equations (Drag below):</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable equation: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-gold-900/80 hover:bg-gold-800 text-gold-200 rounded-xl text-xs font-mono font-bold cursor-grab border border-gold-700"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['step_sep', 'step_int', 'step_sol'].map((targetId, idx) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 min-h-[90px] flex flex-col justify-center items-center text-center"
                    >
                      <span className="text-xs text-slate-500 mb-1">Step {idx + 1}:</span>
                      <span className="text-xs md:text-sm font-bold font-mono text-emerald-400">
                        {droppedLabels[targetId] || 'Drop Target Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Validate Solution Flow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation || answerRevealed}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Validate Solution Flow
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to re-order the logical sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                        setDraggedItem(null);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-1 bg-gold-950 text-gold-400 rounded-lg font-bold">{displayIdx + 1}</span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Ordering"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation || answerRevealed}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Check Ordering
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Numeric answer input"
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-gold-500 w-64"
                  />
                  <span className="text-sm font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    aria-label="Submit Numeric Answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={showExplanation || answerRevealed || !numericInput}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-2 bg-gold-950/80 border border-gold-700 hover:bg-gold-800 text-gold-300 rounded-xl text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gold-900 text-white rounded-lg text-xs font-mono flex items-center gap-2"
                    >
                      {part}
                      <motion.button
                        aria-label={`Remove part ${part}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 font-bold hover:text-rose-300"
                      >
                        ✕
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Assemble statement using parts above...</span>}
                </div>

                <motion.button
                  aria-label="Verify Formulation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation || answerRevealed || constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Formulation
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-gold-950/40 border border-gold-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300">Analytical Solution Walkthrough</h4>
                  <span className="text-xs text-slate-400">Step {revealedSteps + 1} of {activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length}</span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-gold-100 leading-relaxed font-sans">
                        <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Step"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setRevealedSteps((s) => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-2 bg-gold-800/80 hover:bg-gold-700 text-gold-200 rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Assessment' : 'Next Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY SUMMARY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="p-8 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-950 rounded-3xl border border-gold-700/60 text-center space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-black text-white">Applied Calculus & Bayesian Mastery Complete!</h2>
            <p className="text-sm text-slate-300">
              Assessment Score: <span className="text-emerald-400 font-bold text-xl">{Math.max(0, 100 - errors * 5)}%</span> • Mastery Tier: <span className="text-gold-400 font-bold capitalize">{masteryLevel}</span>
            </p>

            {/* Motivational Feedback */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-4 bg-gold-950/70 border border-gold-600 rounded-2xl text-xs md:text-sm text-gold-200 font-bold flex items-center justify-center gap-2"
            >
              <span className="text-lg">🎉</span>
              <span>{motivationalMessage}</span>
            </motion.div>
          </motion.div>

          {/* ─── SPACED REPETITION SCHEDULE VISIBILITY ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-3xl border border-gold-500/40 bg-gradient-to-br from-gold-950/40 via-slate-900 to-slate-900 space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="calendar">📅</span>
                <div>
                  <h3 className="text-base font-bold text-white">Spaced Repetition Schedule (SRS)</h3>
                  <p className="text-xs text-slate-400">SuperMemo SM-2 Memory Consolidation Interval</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Performance:</span>
                <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-xs font-mono font-bold text-gold-300">
                  {errors} {errors === 1 ? 'error' : 'errors'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                errors === 0
                  ? 'bg-emerald-950/70 border-emerald-500 shadow-lg shadow-emerald-950/50'
                  : 'bg-slate-950/60 border-slate-800 opacity-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">0 Errors (Mastery)</span>
                  {errors === 0 && <span className="text-xs bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded">ACTIVE</span>}
                </div>
                <div className="text-xl md:text-2xl font-black text-white">Review in 7 days</div>
                <p className="text-[11px] text-slate-400 mt-1">Long-term consolidation phase</p>
              </div>

              <div className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                errors >= 1 && errors <= 3
                  ? 'bg-gold-950/70 border-gold-500 shadow-lg shadow-gold-950/50'
                  : 'bg-slate-950/60 border-slate-800 opacity-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wide">1–3 Errors (Review)</span>
                  {errors >= 1 && errors <= 3 && <span className="text-xs bg-gold-500 text-white font-black px-1.5 py-0.5 rounded">ACTIVE</span>}
                </div>
                <div className="text-xl md:text-2xl font-black text-white">Review in 3 days</div>
                <p className="text-[11px] text-slate-400 mt-1">Medium-term retention reinforcement</p>
              </div>

              <div className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                errors >= 4
                  ? 'bg-amber-950/70 border-amber-500 shadow-lg shadow-amber-950/50'
                  : 'bg-slate-950/60 border-slate-800 opacity-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">4+ Errors (Needs Practice)</span>
                  {errors >= 4 && <span className="text-xs bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded">ACTIVE</span>}
                </div>
                <div className="text-xl md:text-2xl font-black text-white">Review in 1 day</div>
                <p className="text-[11px] text-slate-400 mt-1">Quick re-test to solidify concepts</p>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                🎯 Target Next Review:{' '}
                <strong className="text-gold-400 font-bold">
                  {errors === 0
                    ? 'Review in 7 days'
                    : errors <= 3
                    ? 'Review in 3 days'
                    : 'Review in 1 day'}
                </strong>
              </span>
              <span className="text-slate-500 text-[11px]">Synced with SM-2 Adaptive Deck</span>
            </div>
          </motion.div>

          {/* Reflection Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4"
          >
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span aria-hidden="true">💭</span> Conceptual Reflection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-gold-400 block">Surprise Point:</span>
                <p className="text-slate-300">What was the most surprising thing you learned about how MC cuts AC at minimum, or how Bayes updates probability?</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-emerald-400 block">Peer Explanation:</span>
                <p className="text-slate-300">How would you explain the difference between Consumer Surplus and Producer Surplus to a friend without using formulas?</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-amber-400 block">Real-World Application:</span>
                <p className="text-slate-300">Where in real life might you use linear integrating factors or Bayesian disease/defect screening models?</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-3xl border border-rose-900/60 space-y-4"
            >
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Diagnosed Misconception Profile
              </h3>
              <p className="text-xs text-slate-400">Targeted corrections based on your assessment responses:</p>
              <div className="space-y-3">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div key={idx} whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                      <p className="text-rose-400 font-semibold">✗ Trap: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Real-World Industry Case */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3"
          >
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="text-gold-400 font-bold mr-1.5">{idx + 1}.</span>
                  {step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_AppliedMathsApplicationCalculusSketchingSim;
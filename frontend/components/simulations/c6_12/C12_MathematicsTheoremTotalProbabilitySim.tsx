'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C12_MATH_091 = 'c12_math_091'; // Theorem of total probability
const NODE_C12_MATH_092 = 'c12_math_092'; // Bayes' theorem
const NODE_C12_MATH_093 = 'c12_math_093'; // Random variable and probability distribution
const NODE_C12_MATH_094 = 'c12_math_094'; // Mean of random variable
const NODE_C12_MATH_095 = 'c12_math_095'; // L'Hopital's rule for limits
const NODE_C12_MATH_096 = 'c12_math_096'; // Rolle's theorem and its applications
const NODE_C12_MATH_097 = 'c12_math_097'; // Lagrange's Mean Value Theorem
const NODE_C12_MATH_098 = 'c12_math_098'; // Scalar triple product and volume of parallelepiped
const NODE_C12_MATH_099 = 'c12_math_099'; // Vector triple product (a x (b x c))
const NODE_C12_MATH_100 = 'c12_math_100'; // Properties of definite integrals (King's rule, periodic)

const ALL_NODE_IDS = [
  NODE_C12_MATH_091,
  NODE_C12_MATH_092,
  NODE_C12_MATH_093,
  NODE_C12_MATH_094,
  NODE_C12_MATH_095,
  NODE_C12_MATH_096,
  NODE_C12_MATH_097,
  NODE_C12_MATH_098,
  NODE_C12_MATH_099,
  NODE_C12_MATH_100,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Satellite Subsystem Quality & Trajectory Control',
  intro: 'You are the Lead Flight Dynamics & Reliability Analyst for an ISRO lunar probe. Your mission requires synthesizing probability partitions for sensor failures, computing posterior failure sources via Bayes, evaluating trajectory limits via L\'Hopital, verifying smooth velocity profiles via Mean Value Theorems, and calculating 3D solar sail volumes using vector products.',
  context: 'Three automated production lines fabricate microchips for navigation telemetry. A defective chip has triggered an alert. You must isolate the source, optimize sensor expectations, and confirm satellite orientation.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Factory lines M1, M2, and M3 produce 20%, 30%, and 50% of telemetry chips, with defect rates 2%, 4%, and 1% respectively. If a randomly inspected chip is defective, which machine is MOST likely to have produced it?',
  options: [
    'Machine M3 (because it makes the most chips: 50%)',
    'Machine M2 (high defect rate of 4% outweighs its lower share)',
    'Machine M1 (because 2% is a balanced defect rate)',
    'All three machines are equally likely (33.3% each)',
  ],
  correctIndex: 1,
  hintAfter: 'Even though M3 makes 50% of all chips, M2 produces a huge proportion of all defectives! Let us interact with the probability area model to discover Bayes\' theorem visually.',
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

// ─── 22 CHALLENGES (ALL 10 NODES, NEP 2020 COMPETENCY ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Total Probability - Foundation
  {
    id: 'ch_tot_prob_01',
    nodeId: NODE_C12_MATH_091,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under what necessary conditions does the Theorem of Total Probability P(A) = ∑ P(Bi)·P(A|Bi) hold for sample space S?',
    options: [
      '{Bi} must be mutually exclusive and exhaustive partitions of S',
      '{Bi} can be any independent events with equal probability',
      '{Bi} only need to be non-empty without covering all of S',
      '{Bi} must all have conditional probability P(A|Bi) = 1',
    ],
    correctIndex: 0,
    explanation: 'Total probability requires {Bi} to form a partition: pairwise disjoint (mutually exclusive) and their union equals S (exhaustive).',
    hints: [
      'Think about whether every possible outcome must belong to exactly one room (event).',
      'The rooms must not overlap, and together they must fill the entire sample space hall.',
      'Events must be mutually exclusive (no overlap) and exhaustive (covering all of S).',
    ],
    misconceptionIndex: 2,
  },

  // 2. Total Probability - Standard (Numeric)
  {
    id: 'ch_tot_prob_02',
    nodeId: NODE_C12_MATH_091,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A factory has 3 machines producing 20%, 30%, and 50% of items with defect rates 2%, 4%, and 1%. Find the overall total defect probability P(Defective) in percentage (e.g., 2.1 for 2.1%).',
    correctAnswer: 2.1,
    tolerance: 0.05,
    unit: '%',
    explanation: 'P(D) = (0.20 × 0.02) + (0.30 × 0.04) + (0.50 × 0.01) = 0.004 + 0.012 + 0.005 = 0.021 = 2.1%.',
    hints: [
      'Multiply each machine share by its defect rate: P(Mi) × P(D|Mi).',
      'Calculate: 0.20×0.02 + 0.30×0.04 + 0.50×0.01.',
      'Sum = 0.004 + 0.012 + 0.005 = 0.021. Convert to percentage by multiplying by 100 to get 2.1%.',
    ],
    misconceptionIndex: 1,
  },

  // 3. Bayes Theorem - Foundation
  {
    id: 'ch_bayes_01',
    nodeId: NODE_C12_MATH_092,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does Bayes\' theorem fundamentally differ from the Theorem of Total Probability?',
    options: [
      'Total Probability computes forward marginal P(A), while Bayes computes inverse/posterior P(Bi|A)',
      'Bayes theorem applies only to independent events, whereas Total Probability applies to dependent events',
      'Total probability yields a vector, while Bayes theorem yields a scalar',
      'They are identical equations with different naming conventions',
    ],
    correctIndex: 0,
    explanation: 'Total probability moves forward from causes Bi to marginal effect A. Bayes theorem reverses conditioning to calculate the posterior P(Bi|A) given the observed effect A.',
    hints: [
      'Total probability finds the total pool of defective items.',
      'Bayes asks: given that an item is in the defect pool, which factory sent it?',
      'Total probability computes the denominator P(A); Bayes evaluates the inverse fraction P(Bi|A).',
    ],
    misconceptionIndex: 0,
  },

  // 4. Bayes Theorem - Standard (Drag-Sort Steps)
  {
    id: 'ch_bayes_02',
    nodeId: NODE_C12_MATH_092,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the sequential analytical steps required to calculate a posterior probability P(B2|A) using Bayes\' theorem.',
    sortItems: [
      'Identify and tabulate prior partition probabilities P(Bi) ensuring ∑P(Bi) = 1',
      'Identify conditional likelihoods P(A|Bi) for each partition branch',
      'Compute marginal total probability P(A) = ∑ P(Bi)·P(A|Bi)',
      'Divide joint probability P(B2 ∩ A) = P(B2)·P(A|B2) by total marginal P(A)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First establish priors, next determine likelihoods, compute the total probability denominator P(A), and finally calculate the Bayes fraction.',
    hints: [
      'Always start by defining the prior distribution over the partition.',
      'You need likelihoods before you can compute the total marginal probability.',
      'The final step is evaluating the ratio: (Prior × Likelihood) / Marginal.',
    ],
    misconceptionIndex: 0,
  },

  // 5. Bayes Theorem - Advanced
  {
    id: 'ch_bayes_03',
    nodeId: NODE_C12_MATH_092,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a medical diagnostic screening for a rare disease affecting 0.1% of people (prior = 0.001), a test has 99% sensitivity and 99% specificity. If an astronaut tests positive (+), what is P(Disease | +)?',
    options: [
      '~9% (approximately 0.0902 due to the dominant base-rate false positive pool)',
      '99% (because the test accuracy is stated as 99%)',
      '50% (equal chance between healthy and diseased)',
      '0.1% (identical to the prior prevalence)',
    ],
    correctIndex: 0,
    explanation: 'P(+) = (0.001 × 0.99) + (0.999 × 0.01) = 0.00099 + 0.00999 = 0.01098. P(D|+) = 0.00099 / 0.01098 ≈ 0.0902 (9%). This illustrates the base-rate fallacy.',
    hints: [
      'Do not assume test accuracy equals posterior probability.',
      'Calculate P(+) = 0.001×0.99 + 0.999×0.01 = 0.01098.',
      'Posterior is True Positives (0.00099) divided by Total Positives (0.01098) ≈ 9.02%.',
    ],
    misconceptionIndex: 0,
  },

  // 6. Random Variable - Foundation
  {
    id: 'ch_rv_01',
    nodeId: NODE_C12_MATH_093,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following defines a discrete Random Variable X on a sample space S?',
    options: [
      'A real-valued function X: S → ℝ assigning exactly one real number to each sample outcome',
      'An unpredictable variable that changes value arbitrarily during an experiment',
      'The set of all qualitative descriptions of experimental outcomes',
      'A continuous interval [0, 1] representing outcome frequencies',
    ],
    correctIndex: 0,
    explanation: 'A random variable is mathematically a function X: S → ℝ mapping experimental outcomes to real numbers.',
    hints: [
      'Recall that a random variable converts qualitative events (like "Heads-Tails") into numbers.',
      'It is a deterministic mathematical function from the sample space S to ℝ.',
      'Each outcome in S has exactly one numerical label.',
    ],
  },

  // 7. Random Variable Distribution - Standard (Drag-Label)
  {
    id: 'ch_rv_02',
    nodeId: NODE_C12_MATH_093,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Assign the correct probability values P(X = x) for tossing two fair coins where X is the number of heads obtained.',
    dragItems: [
      { label: 'P(X=0) = 1/4', targetId: 'box_x0' },
      { label: 'P(X=1) = 1/2', targetId: 'box_x1' },
      { label: 'P(X=2) = 1/4', targetId: 'box_x2' },
    ],
    correctMapping: {
      box_x0: 'P(X=0) = 1/4',
      box_x1: 'P(X=1) = 1/2',
      box_x2: 'P(X=2) = 1/4',
    },
    explanation: 'S = {TT (0 heads), HT (1 head), TH (1 head), HH (2 heads)}. P(X=0)=1/4, P(X=1)=2/4=1/2, P(X=2)=1/4. Sum = 1.',
    hints: [
      'Outcomes: TT has 0 heads (1 out of 4).',
      'HT and TH both give 1 head (2 out of 4 = 1/2).',
      'HH gives 2 heads (1 out of 4).',
    ],
  },

  // 8. Mean of Random Variable - Foundation
  {
    id: 'ch_mean_01',
    nodeId: NODE_C12_MATH_094,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When rolling a fair 6-sided die with faces 1 to 6, the mean (expected value) is μ = 3.5. What does this value represent?',
    options: [
      'The long-run average outcome if the die is rolled a large number of times',
      'A face value that is guaranteed to appear on every second roll',
      'The modal outcome with the highest individual probability',
      'An impossible calculation error since 3.5 is not an integer on the die',
    ],
    correctIndex: 0,
    explanation: 'Expected value E(X) = ∑ xi·pi is the center of mass / long-run theoretical average of the distribution, not necessarily a value X can take on any single trial.',
    hints: [
      'Can a single die show a 3.5? No.',
      'What happens if you roll the die 10,000 times and compute the average?',
      'The mean represents the long-run expected average outcome.',
    ],
  },

  // 9. Mean of Random Variable - Standard (Numeric)
  {
    id: 'ch_mean_02',
    nodeId: NODE_C12_MATH_094,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A discrete random variable X has distribution: P(X=1) = 0.2, P(X=2) = 0.3, P(X=3) = 0.1, P(X=4) = 0.4. Calculate the expected value E(X).',
    correctAnswer: 2.7,
    tolerance: 0.05,
    unit: '',
    explanation: 'E(X) = (1×0.2) + (2×0.3) + (3×0.1) + (4×0.4) = 0.2 + 0.6 + 0.3 + 1.6 = 2.7.',
    hints: [
      'Multiply each value xi by its probability pi.',
      'Sum the products: 1(0.2) + 2(0.3) + 3(0.1) + 4(0.4).',
      '0.2 + 0.6 + 0.3 + 1.6 = 2.7.',
    ],
  },

  // 10. L'Hopital's Rule - Foundation
  {
    id: 'ch_lhopital_01',
    nodeId: NODE_C12_MATH_095,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What MUST be verified before applying L\'Hopital\'s rule lim(x→a) f(x)/g(x) = lim(x→a) f\'(x)/g\'(x)?',
    options: [
      'Direct substitution must yield an indeterminate form 0/0 or ∞/∞, with f,g differentiable near a',
      'f(x) and g(x) must both be linear polynomial functions',
      'The quotient rule [f\'g - fg\']/g² must evaluate to zero',
      'The limit must be taken exclusively as x approaches infinity',
    ],
    correctIndex: 0,
    explanation: 'L\'Hopital\'s rule is strictly conditional upon obtaining the indeterminate form 0/0 or ∞/∞, and differentiability of f and g in a punctured neighborhood of a with g\'(x) ≠ 0.',
    hints: [
      'What happens if you differentiate a regular limit like lim(x→1) (x+1)/(x+2)? You get an incorrect answer!',
      'You must verify the indeterminate form first.',
      'The form must be 0/0 or ∞/∞.',
    ],
    misconceptionIndex: 3,
  },

  // 11. L'Hopital's Rule - Standard
  {
    id: 'ch_lhopital_02',
    nodeId: NODE_C12_MATH_095,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate the limit lim(x→0) (e^x - 1 - x) / x² using L\'Hopital\'s rule.',
    correctAnswer: 0.5,
    tolerance: 0.01,
    unit: '',
    explanation: 'Form 0/0 → 1st application: lim(x→0) (e^x - 1)/(2x) [still 0/0] → 2nd application: lim(x→0) e^x / 2 = 1/2 = 0.5.',
    hints: [
      'Check form: (1 - 1 - 0)/0 = 0/0.',
      'Differentiate top and bottom: (e^x - 1)/(2x). At x=0 this is still 0/0.',
      'Differentiate again: e^x / 2. As x→0, e^0 / 2 = 1/2 = 0.5.',
    ],
  },

  // 12. Rolle's Theorem - Foundation
  {
    id: 'ch_rolle_01',
    nodeId: NODE_C12_MATH_096,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following lists the complete hypotheses of Rolle\'s theorem on interval [a, b]?',
    options: [
      '(i) f continuous on [a, b], (ii) f differentiable on (a, b), (iii) f(a) = f(b)',
      '(i) f differentiable on [a, b], (ii) f\'(a) = f\'(b)',
      '(i) f continuous on (a, b), (ii) f(a) = 0 and f(b) = 0',
      '(i) f strictly increasing on [a, b], (ii) f(a) ≠ f(b)',
    ],
    correctIndex: 0,
    explanation: 'Rolle\'s theorem requires continuity on the closed interval [a, b], differentiability on the open interval (a, b), and equal endpoint values f(a) = f(b). Then ∃ c ∈ (a, b) such that f\'(c) = 0.',
    hints: [
      'Remember: continuity is on the CLOSED interval, differentiability on the OPEN interval.',
      'The endpoints must have equal y-values: f(a) = f(b).',
      'The conclusion guarantees a stationary point where the tangent is horizontal: f\'(c) = 0.',
    ],
    misconceptionIndex: 4,
  },

  // 13. Rolle's Theorem - Advanced (Construct)
  {
    id: 'ch_rolle_02',
    nodeId: NODE_C12_MATH_096,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the analytical justification that between any two consecutive real roots α and β of a polynomial f(x) = 0, there exists at least one root of f\'(x) = 0.',
    availableParts: [
      'f(α) = f(β) = 0',
      'f is continuous on [α, β]',
      'f is differentiable on (α, β)',
      'By Rolle\'s Theorem ∃ c ∈ (α, β)',
      'such that f\'(c) = 0',
    ],
    targetState: 'f(α) = f(β) = 0 f is continuous on [α, β] f is differentiable on (α, β) By Rolle\'s Theorem ∃ c ∈ (α, β) such that f\'(c) = 0',
    validationHint: 'Add all conditions in logical sequence: endpoint values, continuity, differentiability, invocation of theorem, conclusion.',
    explanation: 'Since α and β are roots, f(α) = f(β) = 0. Polynomial f is continuous on [α, β] and differentiable on (α, β). Rolle\'s theorem guarantees ∃ c ∈ (α, β) with f\'(c) = 0.',
    hints: [
      'Start with the fact that α and β are roots so f(α) = f(β) = 0.',
      'State continuity on [α, β] and differentiability on (α, β).',
      'Apply Rolle\'s theorem to conclude f\'(c) = 0 for some c in (α, β).',
    ],
  },

  // 14. LMVT - Foundation
  {
    id: 'ch_lmvt_01',
    nodeId: NODE_C12_MATH_097,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the geometric interpretation of Lagrange\'s Mean Value Theorem (LMVT)?',
    options: [
      'There is at least one point c ∈ (a, b) where the tangent line is parallel to the secant chord joining (a, f(a)) and (b, f(b))',
      'The curve must intersect the x-axis at least once inside the interval',
      'The area under the curve equals the rectangle formed by the endpoints',
      'The derivative is constant throughout the interval (a, b)',
    ],
    correctIndex: 0,
    explanation: 'LMVT states f\'(c) = [f(b) - f(a)] / (b - a). Geometrically, the instantaneous tangent slope at c equals the average chord slope over [a, b].',
    hints: [
      'Think about driving 200 km in 2 hours: average speed = 100 km/h.',
      'At some instant c, the speedometer read exactly 100 km/h (tangent parallel to chord).',
      'f\'(c) equals the slope of the secant chord joining the endpoints.',
    ],
  },

  // 15. LMVT - Standard (Numeric)
  {
    id: 'ch_lmvt_02',
    nodeId: NODE_C12_MATH_097,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the value of c guaranteed by LMVT for f(x) = x² - 2x on the interval [1, 3].',
    correctAnswer: 2,
    tolerance: 0.01,
    unit: '',
    explanation: 'f(1) = -1, f(3) = 3. Average slope = [3 - (-1)] / (3 - 1) = 4/2 = 2. f\'(x) = 2x - 2. Setting 2c - 2 = 2 gives 2c = 4 → c = 2 ∈ (1, 3).',
    hints: [
      'Compute f(1) = 1 - 2 = -1 and f(3) = 9 - 6 = 3.',
      'Average slope = (3 - (-1)) / (3 - 1) = 4 / 2 = 2.',
      'Solve f\'(c) = 2c - 2 = 2 → 2c = 4 → c = 2.',
    ],
  },

  // 16. Scalar Triple Product - Foundation
  {
    id: 'ch_stp_01',
    nodeId: NODE_C12_MATH_098,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The scalar triple product [a b c] = a · (b × c) geometrically represents which quantity?',
    options: [
      'The signed volume of the parallelepiped formed by coterminous vector edges a, b, and c',
      'The surface area of the triangular prism spanned by a and b',
      'A vector perpendicular to all three vectors a, b, and c',
      'The perimeter of the polygon spanned by the vectors',
    ],
    correctIndex: 0,
    explanation: '[a b c] is a scalar representing the signed volume of the parallelepiped formed by coterminous edges a, b, c. Volume V = |[a b c]|.',
    hints: [
      'Cross product (b × c) gives base area and normal direction.',
      'Dot product with a multiplies base area by the perpendicular height.',
      'The result is the volume of the parallelepiped.',
    ],
  },

  // 17. Scalar Triple Product - Standard (Numeric)
  {
    id: 'ch_stp_02',
    nodeId: NODE_C12_MATH_098,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the volume of the parallelepiped with coterminous edges a = 2i - 3j + k, b = i + j - k, and c = 3i + 2j + 4k.',
    correctAnswer: 32,
    tolerance: 0.1,
    unit: 'cubic units',
    explanation: 'Determinant |[2 -3 1; 1 1 -1; 3 2 4]| = 2(4 - (-2)) - (-3)(4 - (-3)) + 1(2 - 3) = 2(6) + 3(7) + 1(-1) = 12 + 21 - 1 = 32. Volume = |32| = 32.',
    hints: [
      'Set up the 3×3 determinant with rows [2, -3, 1], [1, 1, -1], [3, 2, 4].',
      'Expand along row 1: 2(4+2) - (-3)(4+3) + 1(2-3).',
      'Compute: 2(6) + 3(7) - 1 = 12 + 21 - 1 = 32.',
    ],
  },

  // 18. Vector Triple Product - Foundation
  {
    id: 'ch_vtp_01',
    nodeId: NODE_C12_MATH_099,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to the BAC-CAB identity, what is the expansion of a × (b × c), and which geometric plane does the resulting vector lie in?',
    options: [
      'b(a · c) - c(a · b), and it lies in the plane spanned by b and c',
      'a(b · c) - b(a · c), and it lies in the plane spanned by a and b',
      'c(a · b) - b(a · c), and it is perpendicular to the plane of b and c',
      '(a · b)(a · c) - (b · c), and it is a pure scalar',
    ],
    correctIndex: 0,
    explanation: 'BAC-CAB identity: a × (b × c) = b(a · c) - c(a · b). Because it is a linear combination of b and c, it always lies in the plane of b and c.',
    hints: [
      'Remember the mnemonic "BAC minus CAB": b(a·c) - c(a·b).',
      'Notice that the surviving vectors are b and c.',
      'A linear combination of b and c lies in the plane containing b and c.',
    ],
  },

  // 19. Vector Triple Product - Advanced
  {
    id: 'ch_vtp_02',
    nodeId: NODE_C12_MATH_099,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Evaluate the cyclic sum: a × (b × c) + b × (c × a) + c × (a × b).',
    options: [
      '0 (zero vector, since all 6 scalar product terms cancel pairwise via BAC-CAB)',
      '3(a · b × c)',
      '2 [a b c] (a + b + c)',
      '[a b c]²',
    ],
    correctIndex: 0,
    explanation: 'Expanding all three terms using BAC-CAB gives: [b(a·c) - c(a·b)] + [c(b·a) - a(b·c)] + [a(c·b) - b(c·a)]. Since dot product is commutative, all six terms cancel to 0.',
    hints: [
      'Expand each of the 3 terms using BAC-CAB.',
      'b(a·c) cancels with -b(c·a) because a·c = c·a.',
      'All pairs cancel out completely to yield the zero vector 0.',
    ],
  },

  // 20. Definite Integral King\'s Rule - Foundation
  {
    id: 'ch_kings_01',
    nodeId: NODE_C12_MATH_100,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'State King\'s Rule for definite integrals over the interval [0, a].',
    options: [
      '∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx',
      '∫₀ᵃ f(x) dx = - ∫₀ᵃ f(a - x) dx',
      '∫₀ᵃ f(x) dx = 2 ∫₀ᵃ f(x/2) dx',
      '∫₀ᵃ f(x) dx = f(a) - f(0)',
    ],
    correctIndex: 0,
    explanation: 'King\'s rule states ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx, proved by substituting t = a - x.',
    hints: [
      'Substitute x = a - t, dx = -dt.',
      'The limits swap from [0, a] to [a, 0], and the minus sign flips them back.',
      'Result: ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx.',
    ],
  },

  // 21. Definite Integral King\'s Rule - Standard (Numeric)
  {
    id: 'ch_kings_02',
    nodeId: NODE_C12_MATH_100,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate I = ∫₀^(π/2) [sin(x) / (sin(x) + cos(x))] dx. Enter the exact multiple of π (i.e. if answer is π/4, enter 0.25).',
    correctAnswer: 0.25,
    tolerance: 0.01,
    unit: '× π',
    explanation: 'By King\'s Rule, I = ∫₀^(π/2) [cos(x) / (cos(x) + sin(x))] dx. Adding: 2I = ∫₀^(π/2) 1 dx = π/2 → I = π/4 = 0.25π.',
    hints: [
      'Apply King\'s rule with a = π/2: replace x with π/2 - x.',
      'sin(π/2 - x) = cos(x) and cos(π/2 - x) = sin(x).',
      '2I = ∫₀^(π/2) 1 dx = π/2. Therefore I = π/4 = 0.25 π.',
    ],
  },

  // 22. Definite Integral Periodic Property - Advanced
  {
    id: 'ch_kings_03',
    nodeId: NODE_C12_MATH_100,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the definite integral ∫₀^(4π) |sin(x)| dx. (Note: |sin x| has fundamental period T = π, and ∫₀^π sin x dx = 2).',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: '',
    explanation: '|sin(x)| has period T = π. Over interval [0, 4π] there are n = 4 full periods. ∫₀^(4π) |sin x| dx = 4 × ∫₀^π sin x dx = 4 × [-cos x]₀^π = 4 × (1 - (-1)) = 4 × 2 = 8.',
    hints: [
      'What is the period of |sin x|? It repeats every π, not 2π.',
      'How many periods fit inside [0, 4π]? Exactly 4 periods.',
      'Integral over 1 period [0, π] is 2. Total = 4 × 2 = 8.',
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_MATH_091,
  title: 'Advanced ISC Mathematics: Probability, Calculus & Vector Geometry',
  definition: 'Comprehensive mastery of Total Probability, Bayes\' Inverse Theorem, Random Variables, Mean/Expectation, L\'Hopital\'s Limits, Rolle\'s and Lagrange Mean Value Theorems, Scalar/Vector Triple Products, and Definite Integral Symmetries (King\'s Rule & Periodicity).',
  eli5: 'Think of advanced math like navigation: Total probability adds up all possible paths, Bayes figures out which launchpad a rocket came from, derivatives and mean value theorems keep the flight smooth with no sudden jerks, and 3D vector products calculate solar sail volumes in deep space.',
  misconceptions: [
    { misconception: 'Total probability and Bayes\' theorem are the same formula', correction: 'Total probability finds forward marginal probability P(A); Bayes divides joint probability by P(A) to find reverse posterior P(Bi|A).' },
    { misconception: 'The expected value E(X) must be an integer value that X can actually take', correction: 'E(X) is a probability-weighted theoretical average / center of mass (e.g. 3.5 for a die roll) and need not equal any discrete outcome.' },
    { misconception: 'L\'Hopital\'s rule can be applied to any quotient limit by taking quotient derivatives', correction: 'L\'Hopital requires form 0/0 or ∞/∞, and differentiates top f\'(x) and bottom g\'(x) separately, NOT the quotient rule (f/g)\'.' },
    { misconception: 'Rolle\'s and LMVT require differentiability on the closed interval [a, b]', correction: 'Continuity is required on closed [a, b], but differentiability is strictly required only on the open interior (a, b).' },
    { misconception: 'Vector triple product is associative: a × (b × c) = (a × b) × c', correction: 'Vector triple product is non-associative. a × (b × c) lies in the plane of b and c, while (a × b) × c lies in the plane of a and b.' },
  ],
  diagnosticQuestions: [
    { question: 'If {B1, B2, B3} partition S, what is ∑ P(Bi)?', options: ['0.5', '1.0', 'Depends on event A', '3.0'], correctIndex: 1 },
    { question: 'What is the denominator of Bayes\' formula P(Bk|A)?', options: ['P(A ∩ Bk)', 'P(Bk)', 'P(A) = ∑ P(Bi)P(A|Bi)', 'P(A|Bk)'], correctIndex: 2 },
    { question: 'If X takes values 0 and 10 with probabilities 0.9 and 0.1, what is E(X)?', options: ['5', '1', '10', '0.9'], correctIndex: 1 },
    { question: 'What form must lim f/g have for L\'Hopital\'s rule?', options: ['0/1 or 1/0', '0/0 or ∞/∞', '1^0', '0 - 0'], correctIndex: 1 },
    { question: 'If f(1) = 4, f(3) = 10 on [1, 3], LMVT guarantees f\'(c) equals:', options: ['3', '6', '2', '14'], correctIndex: 0 },
    { question: 'If three vectors are coplanar, what is their scalar triple product [a b c]?', options: ['1', '0', 'π', '-1'], correctIndex: 1 },
    { question: 'The vector a × (b × c) always lies in the plane of which vectors?', options: ['a and b', 'b and c', 'a and c', 'perpendicular to all'], correctIndex: 1 },
    { question: '∫₀^(π/2) sin(x) / [sin(x) + cos(x)] dx equals:', options: ['π/2', 'π/4', '1', '0'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery of forward/inverse probability, discrete distributions, mean values, indeterminate limits, MVT theorems, 3D triple products, and King\'s definite integral symmetry.',
};

// ─── 5 INTERACTIVE BRILLIANT-STYLE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Partition & Total Probability Area Model',
    instruction: 'Adjust the production share of Machine 1 and Defect Rates to observe how the total defect pool P(A) expands in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_091,
  },
  {
    title: '2. Bayes\' Inverse Probability Inference',
    instruction: 'Toggle defect rates and observe how the posterior probability P(M2 | Defective) shifts dramatically despite M2\'s smaller total output.',
    interactionType: 'click-bayes',
    nodeId: NODE_C12_MATH_092,
  },
  {
    title: '3. Random Variable Expectation / Center of Mass',
    instruction: 'Adjust probabilities on the balance beam to see how the expected value E(X) functions as the physical center of gravity.',
    interactionType: 'balance-mass',
    nodeId: NODE_C12_MATH_094,
  },
  {
    title: '4. Lagrange MVT Tangent-Secant Parallelism',
    instruction: 'Drag the tangent point c along the curve until the tangent line slope f\'(c) matches the secant chord slope exactly.',
    interactionType: 'drag-mvt',
    nodeId: NODE_C12_MATH_097,
  },
  {
    title: '5. Vector Triple Product & BAC-CAB Plane Confinement',
    instruction: 'Rotate vectors b and c to observe that the double cross product a × (b × c) strictly remains confined to their 2D plane.',
    interactionType: 'vector-plane',
    nodeId: NODE_C12_MATH_099,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Machine 3 produces 70% of output with only 0.5% defect rate, while Machine 1 produces 10% with a massive 15% defect rate, which machine supplies more defective items to the pool?',
    options: [
      'Machine 1 (0.10 × 0.15 = 0.015 defect mass > 0.70 × 0.005 = 0.0035)',
      'Machine 3 (because 70% volume dominates completely)',
      'Both contribute exactly equal defective counts',
      'Impossible to determine without knowing total plant count',
    ],
    correctIndex: 0,
    verifyInstruction: 'Notice how the product P(Bi)·P(A|Bi) determines the defective mass, not production volume alone!',
  },
  {
    question: 'Predict: If a function f(x) has f(0) = 0 and f(4) = 16, what is the average slope, and what derivative must exist somewhere in (0, 4)?',
    options: [
      'Average slope = 4; LMVT guarantees f\'(c) = 4 for some c ∈ (0, 4)',
      'Average slope = 16; LMVT guarantees f\'(c) = 16',
      'Average slope = 0; Rolle\'s theorem guarantees f\'(c) = 0',
      'Average slope is undefined on an open interval',
    ],
    correctIndex: 0,
    verifyInstruction: 'Verify with LMVT: [f(4) - f(0)] / (4 - 0) = 16 / 4 = 4. Tangent slope must equal 4 at some interior point.',
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the posterior probability P(M1 | Defect) as you increase M1\'s defect rate while keeping production shares fixed?',
    observableOptions: [
      'P(M1 | Defect) increases monotonically as M1 accounts for a greater fraction of the total defect pool',
      'P(M1 | Defect) remains strictly unchanged because production share is fixed',
      'P(M1 | Defect) decreases because the other machines compensate',
      'P(M1 | Defect) drops to zero immediately',
    ],
    correctIndex: 0,
  },
  {
    question: 'What do you observe about the vector triple product a × (b × c) as you change vector a?',
    observableOptions: [
      'The length and direction of a × (b × c) change, but it NEVER leaves the 2D plane spanned by b and c',
      'It rotates completely out of the plane of b and c to point along vector a',
      'It always collapses to a zero vector regardless of vector a',
      'It becomes perpendicular to both b and c simultaneously',
    ],
    correctIndex: 0,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Mission Flight Dynamics & Reliability Dossier',
  description: 'Design a telemetry verification plan for an ISRO spacecraft subsystem with 3 redundant IMU sensor units. Calculate overall mission failure probability and write out the BAC-CAB vector control equations for thruster gimbal alignment.',
  steps: [
    'Assign failure rates to Primary, Secondary, and Tertiary IMUs (e.g. 0.01, 0.03, 0.08) with duty cycles (0.70, 0.20, 0.10).',
    'Calculate the total system failure probability using the Theorem of Total Probability.',
    'Given an alert, calculate Bayes\' posterior likelihood that the Secondary IMU was the failure origin.',
    'Formulate the attitude correction torque vector using the Vector Triple Product BAC-CAB expansion.',
  ],
};

// ─── MAIN COMPONENT ───
export function C12_MathematicsTheoremTotalProbabilitySim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── SUBJECT CONFIG ───
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── PHASE FLOW ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BRILLIANT INTERACTION STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── EXPLORATION & SIMULATION VARIABLES ───
  // Step 1: Probability Area Model
  const [shareM1, setShareM1] = useState(20); // %
  const [shareM2, setShareM2] = useState(30); // %
  const shareM3 = useMemo(() => Math.max(0, 100 - shareM1 - shareM2), [shareM1, shareM2]);
  const [rateM1, setRateM1] = useState(2.0); // %
  const [rateM2, setRateM2] = useState(4.0); // %
  const [rateM3, setRateM3] = useState(1.0); // %

  // Step 3: Random Variable Balance Beam
  const [probX0, setProbX0] = useState(0.25);
  const [probX1, setProbX1] = useState(0.50);
  const [probX2, setProbX2] = useState(0.25);

  // Step 4: LMVT Interactive Tangent
  const [mvtC, setMvtC] = useState(1.5); // x position of tangent
  const [mvtIntervalA] = useState(0);
  const [mvtIntervalB] = useState(3);

  // Step 5: Vector Triple Product Angles
  const [vecAngleB, setVecAngleB] = useState(30); // deg
  const [vecAngleC, setVecAngleC] = useState(120); // deg

  // ─── CHALLENGE & ADAPTIVE BKT STATES ───
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
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Non-MCQ states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Reflection responses state
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── PERSISTENT BKT & AUTO-HINT REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── REAL-TIME COMPUTED VALUES (USEMEMO) ───
  const totalDefectProb = useMemo(() => {
    const p1 = (shareM1 / 100) * (rateM1 / 100);
    const p2 = (shareM2 / 100) * (rateM2 / 100);
    const p3 = (shareM3 / 100) * (rateM3 / 100);
    return p1 + p2 + p3;
  }, [shareM1, shareM2, shareM3, rateM1, rateM2, rateM3]);

  const bayesPosteriors = useMemo(() => {
    if (totalDefectProb === 0) return { postM1: 0, postM2: 0, postM3: 0 };
    const p1 = (shareM1 / 100) * (rateM1 / 100);
    const p2 = (shareM2 / 100) * (rateM2 / 100);
    const p3 = (shareM3 / 100) * (rateM3 / 100);
    return {
      postM1: (p1 / totalDefectProb) * 100,
      postM2: (p2 / totalDefectProb) * 100,
      postM3: (p3 / totalDefectProb) * 100,
    };
  }, [shareM1, shareM2, shareM3, rateM1, rateM2, rateM3, totalDefectProb]);

  const expectedValueX = useMemo(() => {
    const totalP = probX0 + probX1 + probX2;
    if (totalP === 0) return 0;
    const nP0 = probX0 / totalP;
    const nP1 = probX1 / totalP;
    const nP2 = probX2 / totalP;
    return 0 * nP0 + 1 * nP1 + 2 * nP2;
  }, [probX0, probX1, probX2]);

  // LMVT cubic curve: f(x) = x^3 - 3x + 4
  const mvtSecantSlope = useMemo(() => {
    const f = (x: number) => x * x * x - 3 * x + 4;
    const fa = f(mvtIntervalA);
    const fb = f(mvtIntervalB);
    return (fb - fa) / (mvtIntervalB - mvtIntervalA);
  }, [mvtIntervalA, mvtIntervalB]);

  const mvtTangentSlope = useMemo(() => {
    return 3 * mvtC * mvtC - 3;
  }, [mvtC]);

  const mvtIsParallel = useMemo(() => {
    return Math.abs(mvtTangentSlope - mvtSecantSlope) < 0.4;
  }, [mvtTangentSlope, mvtSecantSlope]);

  // Motivational feedback calculated
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // Spaced repetition review recommendation
  const srsIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // ─── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
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

  // ─── 2D ANIMATED CANVAS EFFECT FOR FLIGHT DYNAMICS ───
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

      // Grid background
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Parallelepiped 3D Wireframe projection
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 10;
      const scale = 35;
      const rot = frame * 0.015;

      const project = (x: number, y: number, z: number) => {
        const rx = x * Math.cos(rot) - z * Math.sin(rot);
        const rz = x * Math.sin(rot) + z * Math.cos(rot);
        return {
          px: cx + rx * scale + y * 12,
          py: cy - y * scale - rz * 12,
        };
      };

      const origin = project(0, 0, 0);
      const va = project(1.5, 0.4, 0.2);
      const vb = project(0.3, 1.6, -0.4);
      const vc = project(0.4, 0.3, 1.5);
      const vab = project(1.8, 2.0, -0.2);
      const vac = project(1.9, 0.7, 1.7);
      const vbc = project(0.7, 1.9, 1.1);
      const vabc = project(2.2, 2.3, 1.3);

      // Draw Parallelepiped faces
      ctx.fillStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.beginPath();
      ctx.moveTo(origin.px, origin.py);
      ctx.lineTo(va.px, va.py);
      ctx.lineTo(vab.px, vab.py);
      ctx.lineTo(vb.px, vb.py);
      ctx.closePath();
      ctx.fill();

      // Draw Edges
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      const edges = [
        [origin, va], [origin, vb], [origin, vc],
        [va, vab], [va, vac], [vb, vab], [vb, vbc],
        [vc, vac], [vc, vbc], [vab, vabc], [vac, vabc], [vbc, vabc]
      ];
      edges.forEach(([p1, p2]) => {
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      });

      // Vector Labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('a (solar sail 1)', va.px + 4, va.py);
      ctx.fillStyle = '#34d399';
      ctx.fillText('b (gimbal vector)', vb.px + 4, vb.py);
      ctx.fillStyle = '#f472b6';
      ctx.fillText('c (normal)', vc.px + 4, vc.py);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── EVENT HANDLERS ───
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction! Let us examine why.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate the math parameters directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with probability and vector models.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning mission verification challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now verify with the live model.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Examine the distribution changes carefully.');
  }, []);

  const handleShareM1Change = useCallback((val: number) => {
    setShareM1(val);
    if (val + shareM2 > 95) setShareM2(95 - val);
    audioManager.play('count');
  }, [shareM2]);

  const handleRateM1Change = useCallback((val: number) => {
    setRateM1(val);
    audioManager.play('count');
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
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
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
    audioManager.play('celebration');
    speechManager.speak('Mission accomplished! You have mastered ISC Class 12 Probability, Calculus, and Vectors.');
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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analytical deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
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
        speechManager.speak('Let us review the complete step-by-step mathematical proof.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner" aria-label="Math icon">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/40">
                ISC Class 12
              </span>
              <span className="text-xs text-slate-400">10 Syllabus Nodes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-sky-300 to-emerald-300">
              {title}
            </h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800" role="navigation" aria-label="Phase navigation">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <span
              key={p}
              className={`text-xs px-3 py-1 rounded-xl font-semibold capitalize transition-colors ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-3xl border border-indigo-800/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-1 block">
              Mission Case Scenario
            </span>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              🛰️ Telemetry context: {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Curiosity Question */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500/20 text-amber-300 rounded-lg text-sm font-bold">Q</span>
              <h3 className="text-base font-bold text-slate-100">{DISCOVERY_QUESTION.question}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015, y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-2xl text-sm font-medium border transition-all flex items-start justify-between ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/60 text-slate-200 hover:border-indigo-500/50'
                  }`}
                >
                  <div className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-950 text-center leading-6 text-xs mr-2 font-bold text-indigo-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
              >
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Machine M2 contributes 0.30 × 0.04 = 0.012 defect mass, which is over 57% of all defects!'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter interactive laboratories"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION LABS (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-2" role="tablist" aria-label="Exploration labs selector">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                role="tab"
                aria-selected={currentSlide === idx}
                aria-label={`Switch to ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentSlide(idx)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {step.title.split('.')[0]} Lab
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6"
            >
              <div>
                <span className="text-xs uppercase tracking-widest font-black text-indigo-400">
                  Laboratory 0{currentSlide + 1}
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300/90 mt-1 flex items-center gap-2">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 1: TOTAL PROBABILITY AREA PARTITION MODEL ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Topic SVG Diagram 1: Partition of Sample Space S
                    </span>
                    {/* SVG DIAGRAM 1: Sample Space Partition & Event A */}
                    <svg viewBox="0 0 400 180" className="w-full h-44 bg-slate-900 rounded-2xl border border-slate-800 p-2 shadow-inner" aria-label="SVG diagram representing the partition of sample space S into events B1, B2, B3 with an intersecting defective event A">
                      {/* Outer boundary of S */}
                      <rect x="10" y="10" width="380" height="160" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <text x="22" y="30" fill="#64748b" fontSize="11" fontWeight="bold">Sample Space S</text>

                      {/* Dynamic Partition Lines based on slider values */}
                      {(() => {
                        const x1 = 10 + (shareM1 / 100) * 380;
                        const x2 = x1 + (shareM2 / 100) * 380;
                        return (
                          <g>
                            {/* Partitions */}
                            <line x1={x1} y1="10" x2={x1} y2="170" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
                            <line x1={x2} y1="10" x2={x2} y2="170" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />

                            <text x={10 + (x1 - 10) / 2} y="55" fill="#a5b4fc" fontSize="11" textAnchor="middle" fontWeight="bold">B₁ (M1: {shareM1}%)</text>
                            <text x={x1 + (x2 - x1) / 2} y="55" fill="#7dd3fc" fontSize="11" textAnchor="middle" fontWeight="bold">B₂ (M2: {shareM2}%)</text>
                            <text x={x2 + (390 - x2) / 2} y="55" fill="#6ee7b7" fontSize="11" textAnchor="middle" fontWeight="bold">B₃ (M3: {shareM3}%)</text>

                            {/* Intersecting Event A (Defect pool ellipse) */}
                            <ellipse cx="200" cy="115" rx="140" ry="35" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" strokeWidth="2" />
                            <text x="200" y="120" fill="#fecdd3" fontSize="11" textAnchor="middle" fontWeight="bold">
                              Event A (Defects): P(A) = {(totalDefectProb * 100).toFixed(2)}%
                            </text>
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-rose-500 rounded" />
                        <span className="text-slate-300">Pink Ellipse = Total Defect Pool P(A) = ∑ P(Bᵢ)·P(A|Bᵢ)</span>
                      </div>
                    </div>
                  </div>

                  {/* Sliders Control */}
                  <div className="lg:col-span-5 space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-300 uppercase">Parameters</span>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <label htmlFor="shareM1-slider">Machine 1 Share: {shareM1}%</label>
                        <span>M2: {shareM2}% | M3: {shareM3}%</span>
                      </div>
                      <input
                        id="shareM1-slider"
                        type="range"
                        aria-label="Adjust Machine 1 production share percentage"
                        min={5}
                        max={70}
                        value={shareM1}
                        onChange={(e) => handleShareM1Change(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <label htmlFor="rateM1-slider">M1 Defect Rate: {rateM1}%</label>
                        <span>M2 Rate: {rateM2}%</span>
                      </div>
                      <input
                        id="rateM1-slider"
                        type="range"
                        aria-label="Adjust Machine 1 defect rate percentage"
                        min={0.5}
                        max={10}
                        step={0.5}
                        value={rateM1}
                        onChange={(e) => handleRateM1Change(Number(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                    </div>

                    {/* Formula breakdown */}
                    <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 space-y-1">
                      <p className="text-indigo-400 font-bold">P(A) = ∑ P(Bi)·P(A|Bi)</p>
                      <p>M1: {(shareM1/100).toFixed(2)} × {(rateM1/100).toFixed(3)} = {(shareM1 * rateM1 / 10000).toFixed(4)}</p>
                      <p>M2: {(shareM2/100).toFixed(2)} × {(rateM2/100).toFixed(3)} = {(shareM2 * rateM2 / 10000).toFixed(4)}</p>
                      <p>M3: {(shareM3/100).toFixed(2)} × {(rateM3/100).toFixed(3)} = {(shareM3 * rateM3 / 10000).toFixed(4)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: BAYES' INVERSE PROBABILITY INFERENCE ── */}
              {currentSlide === 1 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* Topic SVG Diagram 2: Bayes Probability Tree Flow */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-2">
                      Topic SVG Diagram 2: Bayes Probability Tree & Posterior Inversion
                    </span>
                    <svg viewBox="0 0 500 160" className="w-full h-40 bg-slate-950 rounded-xl" aria-label="SVG Diagram of Bayes theorem tree branching from prior partition to conditional defect pool and posterior calculation">
                      {/* Root node */}
                      <circle cx="50" cy="80" r="16" fill="#4338ca" stroke="#6366f1" strokeWidth="2" />
                      <text x="50" y="84" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">Prior</text>

                      {/* Branches to M1, M2, M3 */}
                      <line x1="66" y1="75" x2="160" y2="35" stroke="#6366f1" strokeWidth="2" />
                      <line x1="66" y1="80" x2="160" y2="80" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="66" y1="85" x2="160" y2="125" stroke="#34d399" strokeWidth="2" />

                      <text x="105" y="48" fill="#a5b4fc" fontSize="9">P(M₁)={shareM1}%</text>
                      <text x="105" y="74" fill="#7dd3fc" fontSize="9">P(M₂)={shareM2}%</text>
                      <text x="105" y="118" fill="#6ee7b7" fontSize="9">P(M₃)={shareM3}%</text>

                      {/* Machine Nodes */}
                      <circle cx="175" cy="35" r="14" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="175" y="38" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">M₁</text>
                      <circle cx="175" cy="80" r="14" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                      <text x="175" y="83" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle">M₂</text>
                      <circle cx="175" cy="125" r="14" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                      <text x="175" y="128" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">M₃</text>

                      {/* Defect Likelihood Arrows */}
                      <line x1="189" y1="35" x2="310" y2="35" stroke="#f43f5e" strokeWidth="1.5" />
                      <line x1="189" y1="80" x2="310" y2="80" stroke="#f43f5e" strokeWidth="1.5" />
                      <line x1="189" y1="125" x2="310" y2="125" stroke="#f43f5e" strokeWidth="1.5" />

                      <text x="245" y="28" fill="#fda4af" fontSize="9">P(D|M₁)={rateM1}%</text>
                      <text x="245" y="73" fill="#fda4af" fontSize="9">P(D|M₂)={rateM2}%</text>
                      <text x="245" y="118" fill="#fda4af" fontSize="9">P(D|M₃)={rateM3}%</text>

                      {/* Bayes Inversion Box */}
                      <rect x="320" y="20" width="165" height="120" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="402" y="42" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">Bayes Posteriors P(Mᵢ|D)</text>
                      <text x="330" y="65" fill="#a5b4fc" fontSize="9">P(M₁|D) = {bayesPosteriors.postM1.toFixed(1)}%</text>
                      <text x="330" y="88" fill="#7dd3fc" fontSize="9">P(M₂|D) = {bayesPosteriors.postM2.toFixed(1)}%</text>
                      <text x="330" y="111" fill="#6ee7b7" fontSize="9">P(M₃|D) = {bayesPosteriors.postM3.toFixed(1)}%</text>
                    </svg>
                  </div>

                  {/* Predict then check */}
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/50 space-y-3">
                      <h4 className="text-sm font-bold text-indigo-300">{PREDICTION_QUESTIONS[0].question}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Select prediction: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800 hover:border-indigo-500"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-700/50 text-xs text-emerald-300">
                      ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* Posterior Breakdown Gauges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900 rounded-2xl border border-indigo-700/40 text-center space-y-2">
                      <span className="text-xs font-bold text-indigo-300 uppercase">P(M1 | Defective)</span>
                      <div className="text-2xl font-black text-indigo-400">
                        {bayesPosteriors.postM1.toFixed(1)}%
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-indigo-500 rounded-full"
                          animate={{ width: `${bayesPosteriors.postM1}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 block">Prior: {shareM1}%</span>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-2xl border border-sky-700/40 text-center space-y-2">
                      <span className="text-xs font-bold text-sky-300 uppercase">P(M2 | Defective)</span>
                      <div className="text-2xl font-black text-sky-400">
                        {bayesPosteriors.postM2.toFixed(1)}%
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-sky-500 rounded-full"
                          animate={{ width: `${bayesPosteriors.postM2}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 block">Prior: {shareM2}%</span>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-700/40 text-center space-y-2">
                      <span className="text-xs font-bold text-emerald-300 uppercase">P(M3 | Defective)</span>
                      <div className="text-2xl font-black text-emerald-400">
                        {bayesPosteriors.postM3.toFixed(1)}%
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500 rounded-full"
                          animate={{ width: `${bayesPosteriors.postM3}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 block">Prior: {shareM3}%</span>
                    </div>
                  </div>

                  {/* Observation Check */}
                  {predictionMade && !observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3"
                    >
                      <h4 className="text-sm font-bold text-slate-200">{OBSERVATION_QUESTIONS[0].question}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Select observation: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-3 text-left rounded-xl bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── LAB 3: RANDOM VARIABLE & EXPECTED VALUE BALANCE BEAM ── */}
              {currentSlide === 2 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl border border-slate-800 relative">
                    {/* Visual Physical Balance Beam */}
                    <div className="w-full max-w-lg h-32 relative flex flex-col justify-end items-center">
                      {/* Fulcrum indicator */}
                      <div
                        className="absolute bottom-6 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-amber-400 transition-all"
                        style={{ left: `calc(${(expectedValueX / 2) * 80 + 10}%)` }}
                      />
                      <span
                        className="absolute bottom-0 text-xs font-black text-amber-300 -translate-x-1/2"
                        style={{ left: `calc(${(expectedValueX / 2) * 80 + 10}%)` }}
                      >
                        μ = {expectedValueX.toFixed(2)}
                      </span>

                      {/* Beam */}
                      <div className="w-full h-3 bg-slate-700 rounded-full relative mb-12 shadow">
                        {/* Mass at X=0 */}
                        <div
                          className="absolute -top-10 left-[10%] -translate-x-1/2 flex flex-col items-center"
                        >
                          <div
                            className="bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-lg transition-all"
                            style={{ width: `${Math.max(24, probX0 * 80)}px`, height: `${Math.max(24, probX0 * 80)}px` }}
                          >
                            X=0
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1 font-mono">P={probX0.toFixed(2)}</span>
                        </div>

                        {/* Mass at X=1 */}
                        <div
                          className="absolute -top-10 left-[50%] -translate-x-1/2 flex flex-col items-center"
                        >
                          <div
                            className="bg-sky-500 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-lg transition-all"
                            style={{ width: `${Math.max(24, probX1 * 80)}px`, height: `${Math.max(24, probX1 * 80)}px` }}
                          >
                            X=1
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1 font-mono">P={probX1.toFixed(2)}</span>
                        </div>

                        {/* Mass at X=2 */}
                        <div
                          className="absolute -top-10 left-[90%] -translate-x-1/2 flex flex-col items-center"
                        >
                          <div
                            className="bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-lg transition-all"
                            style={{ width: `${Math.max(24, probX2 * 80)}px`, height: `${Math.max(24, probX2 * 80)}px` }}
                          >
                            X=2
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1 font-mono">P={probX2.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-2">
                      The fulcrum moves to the exact Center of Mass (Expected Value E(X) = ∑ x_i·p_i).
                    </p>
                  </div>

                  {/* Mass Weight Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label htmlFor="prob-x0-slider" className="text-xs text-slate-400 block mb-1">Weight P(X=0): {probX0.toFixed(2)}</label>
                      <input
                        id="prob-x0-slider"
                        type="range"
                        aria-label="Adjust probability weight for X equals 0"
                        min={0.05}
                        max={0.9}
                        step={0.05}
                        value={probX0}
                        onChange={(e) => setProbX0(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label htmlFor="prob-x1-slider" className="text-xs text-slate-400 block mb-1">Weight P(X=1): {probX1.toFixed(2)}</label>
                      <input
                        id="prob-x1-slider"
                        type="range"
                        aria-label="Adjust probability weight for X equals 1"
                        min={0.05}
                        max={0.9}
                        step={0.05}
                        value={probX1}
                        onChange={(e) => setProbX1(Number(e.target.value))}
                        className="w-full accent-sky-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label htmlFor="prob-x2-slider" className="text-xs text-slate-400 block mb-1">Weight P(X=2): {probX2.toFixed(2)}</label>
                      <input
                        id="prob-x2-slider"
                        type="range"
                        aria-label="Adjust probability weight for X equals 2"
                        min={0.05}
                        max={0.9}
                        step={0.05}
                        value={probX2}
                        onChange={(e) => setProbX2(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: LAGRANGE MEAN VALUE THEOREM ── */}
              {currentSlide === 3 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-400 uppercase block mb-2">
                        Topic SVG Diagram 3: Lagrange Mean Value Theorem (Tangent || Secant)
                      </span>
                      {/* SVG Curve Grapher (SVG Diagram 3) */}
                      <svg viewBox="0 0 400 240" className="w-full h-56 bg-slate-950 rounded-xl" aria-label="SVG interactive graph of Lagrange Mean Value Theorem showing secant chord and parallel tangent at point c">
                        {/* Axes */}
                        <line x1="30" y1="210" x2="380" y2="210" stroke="#334155" strokeWidth="1.5" />
                        <line x1="30" y1="210" x2="30" y2="20" stroke="#334155" strokeWidth="1.5" />

                        {/* Secant Chord [0, 4] to [3, 22] */}
                        <line x1="50" y1="190" x2="350" y2="40" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />

                        {/* Curve y = x^3 - 3x + 4 */}
                        <path
                          d="M 50 190 C 120 220, 220 150, 350 40"
                          fill="transparent"
                          stroke="#6366f1"
                          strokeWidth="3"
                        />

                        {/* Tangent Line at point c */}
                        {(() => {
                          const cx = 50 + (mvtC / 3) * 300;
                          const normC = mvtC / 3;
                          const cy = 190 - normC * 150 + Math.sin(normC * Math.PI) * 20;
                          const dx = 40;
                          const dy = dx * ((mvtTangentSlope / mvtSecantSlope) * 0.5);
                          return (
                            <g>
                              <line
                                x1={cx - dx}
                                y1={cy + dy}
                                x2={cx + dx}
                                y2={cy - dy}
                                stroke={mvtIsParallel ? '#10b981' : '#f43f5e'}
                                strokeWidth="3"
                              />
                              <circle cx={cx} cy={cy} r="6" fill={mvtIsParallel ? '#10b981' : '#f43f5e'} />
                            </g>
                          );
                        })()}

                        <text x="60" y="180" fill="#94a3b8" fontSize="10">(a, f(a))</text>
                        <text x="310" y="30" fill="#94a3b8" fontSize="10">(b, f(b))</text>
                      </svg>
                    </div>

                    {/* Controls & Feedback */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <label htmlFor="mvt-c-slider" className="text-xs font-bold text-slate-300 uppercase block">Interactive Tangent c</label>
                        <input
                          id="mvt-c-slider"
                          type="range"
                          aria-label="Drag point c along interval to align tangent slope"
                          min={0.1}
                          max={2.9}
                          step={0.05}
                          value={mvtC}
                          onChange={(e) => setMvtC(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                        <div className="text-xs font-mono text-slate-400 space-y-1">
                          <p>Point c: <span className="text-white font-bold">{mvtC.toFixed(2)}</span></p>
                          <p>Secant Chord Slope: <span className="text-amber-400 font-bold">{mvtSecantSlope.toFixed(2)}</span></p>
                          <p>Tangent Slope f'(c): <span className="text-indigo-400 font-bold">{mvtTangentSlope.toFixed(2)}</span></p>
                        </div>
                      </div>

                      <div className={`p-4 rounded-xl border transition-all text-xs flex items-center gap-2 ${
                        mvtIsParallel
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}>
                        <span>{mvtIsParallel ? '✓' : 'ℹ️'}</span>
                        <span>
                          {mvtIsParallel
                            ? 'PARALLEL TANGENT FOUND! f\'(c) equals the average chord rate [f(b)-f(a)]/(b-a).'
                            : 'Slide c until the tangent line turns green (parallel to the secant chord).'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: VECTOR TRIPLE PRODUCT & BAC-CAB ── */}
              {currentSlide === 4 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-6 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                      <canvas ref={canvasRef} width={340} height={200} className="rounded-xl" aria-label="3D projection canvas showing vectors a, b, c forming a parallelepiped" />
                      <span className="text-[11px] text-slate-400 mt-2 font-mono">
                        Real-time 3D Projection of Solar Sail & Gimbal Parallelepiped
                      </span>
                    </div>

                    <div className="lg:col-span-6 space-y-4">
                      <div className="p-4 bg-slate-900 rounded-2xl border border-indigo-700/50 space-y-2">
                        <span className="text-xs font-black uppercase text-indigo-300">The BAC-CAB Identity</span>
                        <div className="p-3 bg-slate-950 rounded-xl font-mono text-sm text-sky-300 font-bold border border-slate-800">
                          a × (b × c) = b(a · c) - c(a · b)
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Notice that the right side contains ONLY vectors <span className="text-emerald-300 font-bold">b</span> and <span className="text-sky-300 font-bold">c</span> scaled by scalar dot products. Thus, the resulting double cross product is strictly trapped in the plane spanned by b and c!
                        </p>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1">
                        <p className="text-slate-300 font-bold">Key ISC Exam Identities:</p>
                        <p>• [a b c] = a · (b × c) = Determinant (Scalar volume)</p>
                        <p>• [a b c] = [b c a] = [c a b] (Cyclic invariance)</p>
                        <p>• a × (b × c) + b × (c × a) + c × (a × b) = 0 (Cyclic sum)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Prev / Next Lab Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Go to previous laboratory"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs font-mono text-slate-400">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Advance to next laboratory"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter free sandbox exploration"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">
                  Ungraded Free Exploration
                </span>
                <h3 className="text-xl font-black text-white">Mathematical Sandbox Simulation</h3>
              </div>
              <motion.button
                aria-label="Proceed to verification challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black shadow-lg shadow-emerald-600/30"
              >
                Ready for Verification Challenges! →
              </motion.button>
            </div>
            <p className="text-sm text-slate-400">
              Manipulate all production partition shares, defect distributions, and test posteriors freely without any time limits or score tracking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="sandbox-m1-share" className="text-xs font-bold text-indigo-300 block">Machine 1 Settings</label>
                <input
                  id="sandbox-m1-share"
                  type="range"
                  aria-label="Sandbox Machine 1 Share slider"
                  min={10}
                  max={60}
                  value={shareM1}
                  onChange={(e) => handleShareM1Change(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <span className="text-xs text-slate-400 block">Share: {shareM1}% | Defect: {rateM1}%</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="sandbox-m2-rate" className="text-xs font-bold text-sky-300 block">Machine 2 Settings</label>
                <input
                  id="sandbox-m2-rate"
                  type="range"
                  aria-label="Sandbox Machine 2 Defect Rate slider"
                  min={1}
                  max={10}
                  step={0.5}
                  value={rateM2}
                  onChange={(e) => setRateM2(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
                <span className="text-xs text-slate-400 block">Share: {shareM2}% | Defect: {rateM2}%</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="sandbox-m3-rate" className="text-xs font-bold text-emerald-300 block">Machine 3 Settings</label>
                <input
                  id="sandbox-m3-rate"
                  type="range"
                  aria-label="Sandbox Machine 3 Defect Rate slider"
                  min={0.5}
                  max={5}
                  step={0.5}
                  value={rateM3}
                  onChange={(e) => setRateM3(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <span className="text-xs text-slate-400 block">Share: {shareM3}% | Defect: {rateM3}%</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap justify-around text-center gap-4">
              <div>
                <span className="text-xs text-slate-500">Total Defect P(A)</span>
                <p className="text-lg font-black text-rose-400">{(totalDefectProb * 100).toFixed(2)}%</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Bayes P(M1 | Defect)</span>
                <p className="text-lg font-black text-indigo-400">{bayesPosteriors.postM1.toFixed(1)}%</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Bayes P(M2 | Defect)</span>
                <p className="text-lg font-black text-sky-400">{bayesPosteriors.postM2.toFixed(1)}%</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Bayes P(M3 | Defect)</span>
                <p className="text-lg font-black text-emerald-400">{bayesPosteriors.postM3.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. ADAPTIVE CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-300 border border-rose-700/50'
                      : 'bg-sky-950 text-sky-300 border border-sky-700/50'
                  }`}
                >
                  {difficulty} tier
                </motion.span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">{challenge.question}</h3>
            </div>

            {/* Live Progress Ring / Percentage */}
            <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* ── MCQ CHALLENGE TYPE ── */}
          {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`grid grid-cols-1 gap-3 p-4 rounded-2xl transition-colors ${
                wrongFlash ? 'bg-rose-950/60 border-2 border-rose-500' : 'bg-transparent'
              }`}
            >
              {challenge.options.map((opt, i) => {
                const isThisCorrect = i === challenge.correctIndex;
                return (
                  <motion.button
                    key={i}
                    aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full p-4 text-left rounded-2xl text-sm font-medium border transition-all flex items-start justify-between ${
                      showExplanation && isThisCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : showExplanation && !isThisCorrect
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-50'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200 hover:border-indigo-500/60 shadow'
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-950 text-center leading-6 text-xs mr-2 font-bold text-indigo-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {showExplanation && (
                      <span className="ml-2 font-black text-sm">
                        {isThisCorrect ? '✓' : '✗'}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {/* ── DRAG-LABEL CHALLENGE TYPE ── */}
          {challenge.type === 'drag-label' && challenge.dragItems && (
            <div className="space-y-4 p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-bold">Palette: Drag labels onto targets</span>
              <div className="flex flex-wrap gap-2">
                {challenge.dragItems.map((item, i) => (
                  <motion.div
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable token: ${item.label}`}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl text-white text-xs font-bold cursor-grab shadow"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>

              {/* Target Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {['box_x0', 'box_x1', 'box_x2'].map((targetId, idx) => (
                  <div
                    key={targetId}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop(targetId)}
                    className="p-6 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500 text-center flex flex-col justify-center items-center min-h-[100px]"
                    aria-label={`Drop target for X = ${idx} Heads`}
                  >
                    <span className="text-xs font-mono text-slate-500 mb-1">Slot for X = {idx} Heads</span>
                    <span className="text-sm font-bold text-emerald-300">
                      {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop label here'}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                aria-label="Validate placed labels"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(droppedLabels)}
                disabled={Object.keys(droppedLabels).length < 3 || showExplanation}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                Validate Labels
              </motion.button>
            </div>
          )}

          {/* ── DRAG-SORT CHALLENGE TYPE ── */}
          {challenge.type === 'drag-sort' && challenge.sortItems && (
            <div className="space-y-3 p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-bold">Drag and re-order into correct sequential steps:</span>
              <div className="space-y-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-950 rounded-xl text-xs text-slate-200 border border-slate-800 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-900/80 text-indigo-300 font-bold text-center leading-5 text-[10px]">
                      {displayIdx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}
              </div>

              <motion.button
                aria-label="Verify sorted step sequence"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                  handleAnswer(ans);
                }}
                disabled={showExplanation}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Verify Sequence
              </motion.button>
            </div>
          )}

          {/* ── NUMERIC CHALLENGE TYPE ── */}
          {challenge.type === 'numeric' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="any"
                  aria-label="Numeric calculation answer input"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter computed value"
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 w-64"
                />
                <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                <motion.button
                  aria-label="Submit numeric computed value"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={!numericInput || showExplanation}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  Submit Value
                </motion.button>
              </div>
            </div>
          )}

          {/* ── CONSTRUCT CHALLENGE TYPE ── */}
          {challenge.type === 'construct' && challenge.availableParts && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs text-slate-400 uppercase font-bold">Palette: Click tokens to append to proof</span>
              <div className="flex flex-wrap gap-2">
                {challenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Add token ${part} to proof`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConstructParts(prev => [...prev, part])}
                    className="px-3 py-1.5 bg-indigo-900/70 hover:bg-indigo-800 border border-indigo-700/50 rounded-xl text-xs text-indigo-200"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              {/* Assembled Area */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                {constructParts.map((part, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-950 text-indigo-200 border border-indigo-700/60 rounded-lg text-xs font-mono flex items-center gap-1.5"
                  >
                    {part}
                    <button
                      aria-label={`Remove token ${part}`}
                      onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))}
                      className="text-rose-400 hover:text-rose-200 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {constructParts.length === 0 && (
                  <span className="text-xs text-slate-600">Click parts above to assemble step sequence</span>
                )}
              </div>

              <motion.button
                aria-label="Verify assembled proof construction"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={constructParts.length === 0 || showExplanation}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                Verify Construction
              </motion.button>
            </div>
          )}

          {/* ── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ── */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-amber-700/50 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="p-1 bg-amber-500/20 text-amber-300 rounded text-xs font-black">EXPLANATION</span>
                <span className="text-xs font-bold text-slate-300">Analytical Walkthrough</span>
              </div>

              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-300 leading-relaxed font-sans"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">Step {i + 1}:</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                <motion.button
                  aria-label="Reveal next step in explanation"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRevealedSteps(s => s + 1)}
                  className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                >
                  Reveal Next Logical Step →
                </motion.button>
              ) : (
                <motion.button
                  aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Score' : 'Proceed to next challenge'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextChallenge}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black shadow-lg shadow-emerald-600/30"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Score →' : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION, MOTIVATIONAL FEEDBACK, SRS & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Hero Score Badge */}
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/60 text-center space-y-3 relative overflow-hidden shadow-2xl">
            <span className="text-xs uppercase tracking-widest font-black text-indigo-400">
              Assessment Completed
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">ISC Flight Dynamics Mastery Certified</h2>
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
              {Math.max(0, 100 - errors * 5)}%
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Bayesian Knowledge Tracing Level: <span className="text-indigo-300 font-bold uppercase">{masteryLevel}</span>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK SECTION */}
          <div className="p-6 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-emerald-950/80 rounded-3xl border border-indigo-500/50 text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Performance Evaluation</span>
            <h3 className="text-2xl font-black text-white flex items-center justify-center gap-2">
              <span>{errors === 0 ? '🏆' : errors <= 3 ? '🌟' : errors <= 7 ? '👍' : '💪'}</span>
              <span>{motivationalFeedback}</span>
            </h3>
            <p className="text-xs text-slate-300">
              {errors === 0
                ? 'Flawless execution! You solved every challenge without an error.'
                : errors <= 3
                ? `You demonstrated solid command with only ${errors} mistake${errors > 1 ? 's' : ''}.`
                : errors <= 7
                ? `Good effort! You encountered ${errors} errors — review the proofs to lock in the concepts.`
                : `You encountered ${errors} errors during the mission. Keep practicing — You WILL get this!`}
            </p>
          </div>

          {/* SPACED REPETITION (SM-2) SCHEDULE VISIBILITY */}
          <div className="p-6 bg-indigo-950/40 rounded-3xl border border-indigo-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <span>📅</span> Spaced Repetition (SRS) Review Schedule
              </h3>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold font-mono">
                Review in {srsIntervalDays} day{srsIntervalDays > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your response accuracy and error profile, your optimal retention interval has been scheduled: <strong className="text-amber-300">review in {srsIntervalDays} day{srsIntervalDays > 1 ? 's' : ''}</strong> ({errors === 0 ? '0 errors = 7 days' : errors <= 3 ? '1-3 errors = 3 days' : '4+ errors = 1 day'}). Consistent SRS review reinforces neural pathways for long-term ISC exam retention.
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-base font-bold text-white">Mission Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">
              Consolidate your mathematical insights by considering these key reflection prompts:
            </p>

            <div className="space-y-4 pt-1">
              {/* Question 1 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="reflect-surprising" className="text-xs font-bold text-indigo-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="reflect-surprising"
                  aria-label="Reflection response for most surprising thing learned"
                  rows={2}
                  value={reflections.surprising}
                  onChange={(e) => setReflections({ ...reflections, surprising: e.target.value })}
                  placeholder="e.g., How a low-volume machine can dominate the total defect pool under Bayes' theorem..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Question 2 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="reflect-explain" className="text-xs font-bold text-sky-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="reflect-explain"
                  aria-label="Reflection response for explaining concepts to a friend"
                  rows={2}
                  value={reflections.explain}
                  onChange={(e) => setReflections({ ...reflections, explain: e.target.value })}
                  placeholder="e.g., LMVT is like average car speed: at some instant your speedometer must match the average speed..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Question 3 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="reflect-reallife" className="text-xs font-bold text-emerald-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="reflect-reallife"
                  aria-label="Reflection response for real life applications"
                  rows={2}
                  value={reflections.realLife}
                  onChange={(e) => setReflections({ ...reflections, realLife: e.target.value })}
                  placeholder="e.g., Sensor fault diagnosis, medical test accuracy, 3D robotics torque planning..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Identified Misconception Profile
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-rose-900/50 space-y-1">
                      <p className="text-xs font-bold text-rose-400">✗ {m.misconception}</p>
                      <p className="text-xs text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Activity Dossier */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Post-Mission Activity
            </span>
            <h3 className="text-lg font-black text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CONDITIONAL FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Successfully Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_MathematicsTheoremTotalProbabilitySim;
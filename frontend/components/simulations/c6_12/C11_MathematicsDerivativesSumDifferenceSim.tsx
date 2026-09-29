'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C11_MATH_092 = 'c11_math_092'; // Derivatives of sum, diff, prod, quot
const NODE_C11_MATH_093 = 'c11_math_093'; // Stats: Range & Mean Dev
const NODE_C11_MATH_094 = 'c11_math_094'; // Stats: SD & Variance
const NODE_C11_MATH_095 = 'c11_math_095'; // Stats: Combined Mean & SD
const NODE_C11_MATH_096 = 'c11_math_096'; // Prob: Exp, Sample Space, Events
const NODE_C11_MATH_097 = 'c11_math_097'; // Prob: Sure, Imposs, MutExcl, Exhaust
const NODE_C11_MATH_098 = 'c11_math_098'; // Prob: Addition Theorem
const NODE_C11_MATH_099 = 'c11_math_099'; // AM-GM Inequality
const NODE_C11_MATH_100 = 'c11_math_100'; // Cauchy-Schwarz Inequality
const NODE_C11_MATH_101 = 'c11_math_101'; // Derangements

const ALL_NODE_IDS = [
  NODE_C11_MATH_092, NODE_C11_MATH_093, NODE_C11_MATH_094, NODE_C11_MATH_095,
  NODE_C11_MATH_096, NODE_C11_MATH_097, NODE_C11_MATH_098, NODE_C11_MATH_099,
  NODE_C11_MATH_100, NODE_C11_MATH_101,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Flight Operations & Analytics',
  intro: 'You are the Lead Trajectory & Data Scientist at ISRO Telemetry Tracking & Command Network (ISTRAC), Bengaluru. From orbital rate calculus and fuel payload inequalities to telemetry dispersion statistics and communication packet error derangements, your mathematical models keep the lunar mission on course.',
  context: 'Calibrate propulsion gradients (calculus), model sensor telemetry noise (statistics), assess thruster failure risks (probability), optimize rocket mass ratios (AM-GM / Cauchy-Schwarz), and route cryptographic key swaps (derangements).',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Telemetry sensors show rocket velocity u(t) and mass m(t) both varying with time. What is the true rate of change of momentum d/dt [m(t) · u(t)]?',
  options: [
    'dm/dt · du/dt (Multiply rates directly)',
    '(dm/dt) · u(t) + m(t) · (du/dt) (Product Rule: two distinct rate terms)',
    'm(t) · (du/dt) only (Mass rate is ignored)',
    'dm/dt + du/dt (Sum the derivatives)',
  ],
  correctIndex: 1,
  hintAfter: 'Calculus derivatives do not multiply simply! Because both factors expand simultaneously, two separate rates emerge.',
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

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Derivatives (c11_math_092)
  {
    id: 'ch_01',
    nodeId: NODE_C11_MATH_092,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Differentiate f(x) = x³ + sin x - eˣ with respect to x.',
    options: [
      '3x² + cos x - eˣ',
      '3x² - cos x - eˣ',
      'x⁴/4 - cos x - eˣ',
      '3x² + cos x + eˣ',
    ],
    correctIndex: 0,
    explanation: 'By the sum and difference rule, d/dx[u ± v ± w] = u\' ± v\' ± w\'. Differentiating term by term: d/dx(x³) = 3x², d/dx(sin x) = cos x, and d/dx(eˣ) = eˣ, maintaining the respective signs.',
    hints: [
      'Differentiation is a linear operator: handle each term independently.',
      'Recall d/dx(xⁿ) = n·xⁿ⁻¹, d/dx(sin x) = cos x, and d/dx(eˣ) = eˣ.',
      'Combine: 3x² + cos x - eˣ.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Statistics Range (c11_math_093)
  {
    id: 'ch_02',
    nodeId: NODE_C11_MATH_093,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Telemetry recorded 5 temperature readings at the payload bay: 12°C, 18°C, 25°C, 31°C, 47°C. What is the Range?',
    correctAnswer: 35,
    tolerance: 0.1,
    unit: '°C',
    explanation: 'Range for ungrouped data is Maximum - Minimum = 47 - 12 = 35°C.',
    hints: [
      'Range is the difference between the single highest and lowest values.',
      'Max = 47, Min = 12.',
      '47 - 12 = 35.',
    ],
  },
  // 3. Foundation - Probability Definitions (c11_math_096)
  {
    id: 'ch_03',
    nodeId: NODE_C11_MATH_096,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a dual fair coin toss simulation, what is the exact sample space S of equally likely outcomes?',
    options: [
      '{HH, HT, TH, TT} with n(S) = 4',
      '{HH, HT, TT} with n(S) = 3',
      '{2 Heads, 1 Head, 0 Heads}',
      '{H, T} with n(S) = 2',
    ],
    correctIndex: 0,
    explanation: 'HT and TH are distinct ordered physical outcomes. Merging them produces unequally likely events, breaking Kolmogorov classical probability.',
    hints: [
      'Coin 1 and Coin 2 are distinguishable in sequence.',
      'Heads on first + Tails on second differs from Tails on first + Heads on second.',
      'S = {HH, HT, TH, TT} giving 4 outcomes.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Event Types (c11_math_097)
  {
    id: 'ch_04',
    nodeId: NODE_C11_MATH_097,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Two events A and B satisfy A ∩ B = ∅ and A ∪ B = S. What is the formal classification of the pair {A, B}?',
    options: [
      'Mutually exclusive and exhaustive (a Partition of S)',
      'Independent and sure events',
      'Exhaustive but overlapping events',
      'Impossible events',
    ],
    correctIndex: 0,
    explanation: 'A ∩ B = ∅ means they cannot co-occur (mutually exclusive). A ∪ B = S means they cover the entire outcome universe (exhaustive). Together they partition S.',
    hints: [
      'Disjoint sets that union to the universal sample space form a partition.',
      'Mutually exclusive = empty intersection; Exhaustive = union equals S.',
      'The pair is both mutually exclusive and exhaustive.',
    ],
  },
  // 5. Foundation - AM-GM Base Case (c11_math_099)
  {
    id: 'ch_05',
    nodeId: NODE_C11_MATH_099,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For any positive real numbers x > 0 and y > 0, which inequality is guaranteed with equality iff x = y?',
    options: [
      '(x + y)/2 ≥ √(xy)',
      '(x + y)/2 ≤ √(xy)',
      'x² + y² ≤ 2xy',
      'x + y = 2√(xy)',
    ],
    correctIndex: 0,
    explanation: 'The AM-GM inequality states Arithmetic Mean ≥ Geometric Mean. Derived directly from (√x - √y)² ≥ 0 ⇒ x + y ≥ 2√(xy).',
    hints: [
      'Think of non-negativity of squared real numbers.',
      'Expand (√x - √y)² ≥ 0.',
      '(x + y)/2 ≥ √(xy).',
    ],
  },
  // 6. Foundation - Derangement Small Values (c11_math_101)
  {
    id: 'ch_06',
    nodeId: NODE_C11_MATH_101,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many derangements D(4) exist for 4 distinct orbital sensor keys so that NO key is in its native slot?',
    correctAnswer: 9,
    tolerance: 0,
    unit: 'permutations',
    explanation: 'D(4) = 4!(1 - 1/1! + 1/2! - 1/3! + 1/4!) = 24(1 - 1 + 1/2 - 1/6 + 1/24) = 24(3/8) = 9.',
    hints: [
      'Use D(n) = (n-1)[D(n-1) + D(n-2)] with D(2)=1 and D(3)=2.',
      'D(4) = 3 · [D(3) + D(2)] = 3 · (2 + 1).',
      '3 × 3 = 9.',
    ],
  },
  // 7. Foundation - Drag-label Probability Venn (c11_math_098)
  {
    id: 'ch_07',
    nodeId: NODE_C11_MATH_098,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct probability region labels onto the Venn diagram zones.',
    dragItems: [
      { label: 'P(A only)', targetId: 'zone_left' },
      { label: 'P(A ∩ B)', targetId: 'zone_center' },
      { label: 'P(B only)', targetId: 'zone_right' },
      { label: 'P((A ∪ B)ᶜ)', targetId: 'zone_outer' },
    ],
    correctMapping: {
      zone_left: 'P(A only)',
      zone_center: 'P(A ∩ B)',
      zone_right: 'P(B only)',
      zone_outer: 'P((A ∪ B)ᶜ)',
    },
    explanation: 'A Venn diagram partitions S into: A only [P(A) - P(A∩B)], the overlap P(A∩B), B only [P(B) - P(A∩B)], and the outer complement P((A∪B)ᶜ).',
    hints: [
      'The central intersection lens is where both A and B occur simultaneously.',
      'The left crescent is A excluding B; the right crescent is B excluding A.',
      'The background rectangle represents neither event occurring.',
    ],
  },
  // 8. Standard - Product Rule (c11_math_092)
  {
    id: 'ch_08',
    nodeId: NODE_C11_MATH_092,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A rocket telemetry curve is modeled by y = x² · sin x. What is dy/dx?',
    options: [
      '2x · sin x + x² · cos x',
      '2x · cos x',
      '2x · sin x - x² · cos x',
      'x² · cos x',
    ],
    correctIndex: 0,
    explanation: 'By Leibniz Product Rule: d/dx(u·v) = u\'v + uv\'. Here u = x² (u\' = 2x) and v = sin x (v\' = cos x), yielding 2x sin x + x² cos x.',
    hints: [
      'Never differentiate products as u\' · v\'! Two distinct terms must appear.',
      'u\' = 2x, v = sin x; u = x², v\' = cos x.',
      'Combine: 2x sin x + x² cos x.',
    ],
    misconceptionIndex: 0,
  },
  // 9. Standard - Quotient Rule (c11_math_092)
  {
    id: 'ch_09',
    nodeId: NODE_C11_MATH_092,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the derivative of y = (sin x) / x² for x ≠ 0.',
    options: [
      '(x · cos x - 2 sin x) / x³',
      '(2 sin x - x · cos x) / x³',
      '(cos x) / (2x)',
      '(x² cos x + 2x sin x) / x⁴',
    ],
    correctIndex: 0,
    explanation: 'Quotient Rule: [v·u\' - u·v\'] / v² = [x²(cos x) - (sin x)(2x)] / x⁴ = x(x cos x - 2 sin x) / x⁴ = (x cos x - 2 sin x) / x³.',
    hints: [
      'Mnemonic: "Low d-High minus High d-Low, square the bottom and away we go".',
      'Numerator: x² · cos x - 2x · sin x.',
      'Factor out x and cancel with denominator x⁴.',
    ],
    misconceptionIndex: 2,
  },
  // 10. Standard - Mean Deviation (c11_math_093)
  {
    id: 'ch_10',
    nodeId: NODE_C11_MATH_093,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Compute the Mean Deviation about the Mean for orbital thruster burn times: {4, 8, 12, 16, 20} seconds.',
    correctAnswer: 4.8,
    tolerance: 0.1,
    unit: 's',
    explanation: 'Mean x̄ = (4+8+12+16+20)/5 = 60/5 = 12. Absolute deviations: |4-12|=8, |8-12|=4, |12-12|=0, |16-12|=4, |20-12|=8. Sum = 24. MD = 24/5 = 4.8 s.',
    hints: [
      'First compute the arithmetic mean x̄.',
      'Take the absolute value of each difference |xᵢ - x̄|.',
      'Sum deviations (8 + 4 + 0 + 4 + 8 = 24) and divide by n = 5.',
    ],
  },
  // 11. Standard - Variance & SD (c11_math_094)
  {
    id: 'ch_11',
    nodeId: NODE_C11_MATH_094,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For telemetry readings {2, 4, 6, 8, 10}, what is the exact Variance (σ²)?',
    correctAnswer: 8.0,
    tolerance: 0.1,
    unit: 'units²',
    explanation: 'Mean x̄ = 30/5 = 6. Squared deviations: (2-6)²=16, (4-6)²=4, (6-6)²=0, (8-6)²=4, (10-6)²=16. Sum = 40. Variance σ² = 40/5 = 8.',
    hints: [
      'Mean is (2+4+6+8+10)/5 = 6.',
      'Square each deviation from 6: 16, 4, 0, 4, 16.',
      'Average the squared deviations: 40 / 5 = 8.',
    ],
  },
  // 12. Standard - Combined Mean (c11_math_095)
  {
    id: 'ch_12',
    nodeId: NODE_C11_MATH_095,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Tracking Station 1 recorded n₁ = 40 signals with mean score 72. Station 2 recorded n₂ = 60 signals with mean score 68. What is the Combined Mean x̄₁₂?',
    correctAnswer: 69.6,
    tolerance: 0.1,
    unit: 'score',
    explanation: 'Combined mean x̄₁₂ = (n₁x̄₁ + n₂x̄₂) / (n₁ + n₂) = (40×72 + 60×68) / 100 = (2880 + 4080) / 100 = 6960 / 100 = 69.6.',
    hints: [
      'Do NOT simply average (72+68)/2 = 70. Weight by group sizes!',
      'Total sum = 40 × 72 + 60 × 68 = 2880 + 4080 = 6960.',
      '6960 / 100 = 69.6.',
    ],
    misconceptionIndex: 3,
  },
  // 13. Standard - Addition Theorem Card Probability (c11_math_098)
  {
    id: 'ch_13',
    nodeId: NODE_C11_MATH_098,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A card is drawn from a standard 52-card deck. What is P(King ∪ Heart)?',
    options: [
      '4/13 (i.e. 16/52)',
      '17/52',
      '1/52',
      '1/4',
    ],
    correctIndex: 0,
    explanation: 'P(King) = 4/52, P(Heart) = 13/52, P(King ∩ Heart) = 1/52 (King of Hearts). By addition theorem: P(K ∪ H) = 4/52 + 13/52 - 1/52 = 16/52 = 4/13.',
    hints: [
      'Kings and Hearts are NOT mutually exclusive: King of Hearts is in both!',
      'Apply P(A ∪ B) = P(A) + P(B) - P(A ∩ B).',
      '4/52 + 13/52 - 1/52 = 16/52 = 4/13.',
    ],
    misconceptionIndex: 4,
  },
  // 14. Standard - Cauchy-Schwarz Vector Bound (c11_math_100)
  {
    id: 'ch_14',
    nodeId: NODE_C11_MATH_100,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given real numbers a, b such that a² + b² = 25, find the maximum possible value of 3a + 4b.',
    correctAnswer: 25.0,
    tolerance: 0.1,
    unit: 'max',
    explanation: 'By Cauchy-Schwarz: (3a + 4b)² ≤ (3² + 4²)(a² + b²) = (25)(25) = 625. Thus |3a + 4b| ≤ 25, with maximum = 25 attained at (a, b) = (3, 4).',
    hints: [
      'Treat 3a + 4b as a dot product of vectors (3, 4) and (a, b).',
      '(3a + 4b)² ≤ (3² + 4²)(a² + b²).',
      '√(25 × 25) = 25.',
    ],
  },
  // 15. Standard - Drag-sort Derangement Recurrence Order (c11_math_101)
  {
    id: 'ch_15',
    nodeId: NODE_C11_MATH_101,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical steps to derive the derangement recurrence D(n) = (n-1)[D(n-1) + D(n-2)].',
    sortItems: [
      'Element 1 chooses any of (n-1) available slots, say slot k.',
      'Case 1: Element k takes slot 1 (mutual 2-cycle swap), leaving (n-2) items to derange.',
      'Case 2: Element k avoids slot 1, equivalent to deranging (n-1) remaining items.',
      'Combine disjoint cases and multiply by (n-1) choices: D(n) = (n-1)[D(n-1) + D(n-2)].',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The standard combinatorial proof considers whether element k returns to position 1 (D(n-2) subproblem) or does not (D(n-1) subproblem), multiplied by (n-1) slot choices.',
    hints: [
      'Start with the placement of element 1 in slot k.',
      'Branch into the swap case (k goes to 1) and non-swap case.',
      'Synthesize the two subproblems into the algebraic recurrence.',
    ],
  },
  // 16. Advanced - Mixed Calculus Product & Quotient (c11_math_092)
  {
    id: 'ch_16',
    nodeId: NODE_C11_MATH_092,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Differentiate y = (sin x · eˣ) / (x² + 1) with respect to x.',
    options: [
      'eˣ · [(sin x + cos x)(x² + 1) - 2x sin x] / (x² + 1)²',
      'eˣ · (cos x) / (2x)',
      '[eˣ sin x · 2x - (x² + 1) eˣ cos x] / (x² + 1)²',
      'eˣ · [(cos x)(x² + 1) - 2x sin x] / (x² + 1)',
    ],
    correctIndex: 0,
    explanation: 'Outer structure is quotient rule with u = sin x · eˣ, v = x² + 1. u\' = cos x · eˣ + sin x · eˣ = eˣ(sin x + cos x) via product rule. v\' = 2x. y\' = [u\'v - uv\'] / v² = eˣ[(sin x + cos x)(x² + 1) - 2x sin x] / (x² + 1)².',
    hints: [
      'Identify the outermost operation (quotient rule).',
      'Differentiate the numerator using the product rule: d/dx(sin x · eˣ) = eˣ(sin x + cos x).',
      'Assemble via [u\'v - uv\'] / v² and factor out eˣ.',
    ],
  },
  // 17. Advanced - Combined Standard Deviation (c11_math_095)
  {
    id: 'ch_17',
    nodeId: NODE_C11_MATH_095,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Two telemetry groups: n₁ = 50, x̄₁ = 80, σ₁ = 6 and n₂ = 50, x̄₂ = 70, σ₂ = 6. What is the Combined Standard Deviation σ₁₂? (Give to 2 decimal places)',
    correctAnswer: 7.81,
    tolerance: 0.1,
    unit: 'σ',
    explanation: 'Combined mean x̄₁₂ = 75. Deviations: d₁ = 80-75 = 5 (d₁²=25), d₂ = 70-75 = -5 (d₂²=25). Combined variance σ₁₂² = [50(6² + 25) + 50(6² + 25)] / 100 = 36 + 25 = 61. Combined SD = √61 ≈ 7.81.',
    hints: [
      'Combined mean is (80+70)/2 = 75.',
      'Between-group deviations: d₁² = 25, d₂² = 25.',
      'Combined variance = σ² + d² = 36 + 25 = 61. √61 ≈ 7.81.',
    ],
  },
  // 18. Advanced - AM-GM 3-term Optimization (c11_math_099)
  {
    id: 'ch_18',
    nodeId: NODE_C11_MATH_099,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Find the absolute minimum value of f(x) = x + 4/x for real x > 0.',
    correctAnswer: 4.0,
    tolerance: 0.05,
    unit: 'min',
    explanation: 'For x > 0, by AM-GM on {x, 4/x}: (x + 4/x)/2 ≥ √(x · 4/x) = √4 = 2. Thus x + 4/x ≥ 4. Equality holds at x = 4/x ⇒ x² = 4 ⇒ x = 2.',
    hints: [
      'Apply AM-GM to the two terms: a = x, b = 4/x.',
      'Their product a·b = 4 is constant.',
      'a + b ≥ 2√(ab) = 2√4 = 4.',
    ],
  },
  // 19. Advanced - Cauchy-Schwarz 3D Optimization (c11_math_100)
  {
    id: 'ch_19',
    nodeId: NODE_C11_MATH_100,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Find the maximum value of 2x + 3y + 6z on the unit sphere x² + y² + z² = 1.',
    correctAnswer: 7.0,
    tolerance: 0.1,
    unit: 'max',
    explanation: 'By Cauchy-Schwarz: (2x + 3y + 6z)² ≤ (2² + 3² + 6²)(x² + y² + z²) = (4 + 9 + 36)(1) = 49. Maximum = √49 = 7, attained at (x,y,z) = (2/7, 3/7, 6/7).',
    hints: [
      'Use vectors u = (2, 3, 6) and v = (x, y, z).',
      '||u||² = 2² + 3² + 6² = 49.',
      '|u · v| ≤ ||u|| ||v|| = √49 · √1 = 7.',
    ],
  },
  // 20. Advanced - Derangement Envelope Permutation (c11_math_101)
  {
    id: 'ch_20',
    nodeId: NODE_C11_MATH_101,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Five spacecraft antenna calibration codes are loaded into 5 receivers. In how many ways does EXACTLY ONE receiver get its correct code?',
    correctAnswer: 45,
    tolerance: 0,
    unit: 'ways',
    explanation: 'Select the 1 receiver with correct code in ⁵C₁ = 5 ways. The remaining 4 receivers must be deranged so none gets its own code: D(4) = 9. Total = 5 × 9 = 45 ways.',
    hints: [
      'Step 1: Choose which of the 5 receivers gets the correct code (⁵C₁ = 5).',
      'Step 2: Derange the remaining 4 receivers (D(4) = 9).',
      'Step 3: Multiply: 5 × 9 = 45.',
    ],
  },
  // 21. Advanced - Construct Step-Deviation Formula (c11_math_094)
  {
    id: 'ch_21',
    nodeId: NODE_C11_MATH_094,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct Step-Deviation Standard Deviation formula: σ = ?',
    availableParts: ['h ·', '√[', '(1/N)Σfu²', '-', '((1/N)Σfu)²', ']'],
    targetState: 'h · √[ (1/N)Σfu² - ((1/N)Σfu)² ]',
    validationHint: 'The common class factor h must multiply the square root of the mean squared deviations minus the square of the mean deviation in u.',
    explanation: 'In step deviation where u = (x - A)/h, the scaled variance is (1/N)Σfu² - ((1/N)Σfu)². Taking the root and multiplying by scale factor h restores original physical units.',
    hints: [
      'Start with the scale factor h outside the square root.',
      'Inside the square root: Mean of squares minus Square of mean.',
      'End with the closing bracket.',
    ],
  },
  // 22. Advanced - Evaluate Mutually Exclusive vs Independent (c11_math_097)
  {
    id: 'ch_22',
    nodeId: NODE_C11_MATH_097,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If events A and B have positive probabilities P(A) > 0 and P(B) > 0 and are mutually exclusive, can they also be independent?',
    options: [
      'No: P(A ∩ B) = 0 while P(A)·P(B) > 0, making them strongly dependent',
      'Yes: Mutually exclusive is identical to independence',
      'Yes: As long as P(A ∪ B) = 1',
      'Only if A and B are complementary events',
    ],
    correctIndex: 0,
    explanation: 'Mutually exclusive means P(A ∩ B) = 0 (knowing A occurred guarantees B cannot). Independent requires P(A ∩ B) = P(A)P(B) > 0. Since 0 ≠ P(A)P(B), mutually exclusive positive-probability events are NEVER independent.',
    hints: [
      'Check the mathematical definitions: Mutually exclusive ⇒ P(A ∩ B) = 0.',
      'Independence ⇒ P(A ∩ B) = P(A) · P(B).',
      'If both probabilities are > 0, their product is positive, so 0 ≠ product.',
    ],
    misconceptionIndex: 1,
  },
];

// ─── PROPS & DEFAULT PROPS ───
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
  nodeId: NODE_C11_MATH_092,
  title: 'Calculus, Statistics, Probability & Advanced Inequalities',
  definition: 'Comprehensive ISC Class 11 core mathematics suite covering differential calculus rules, statistical dispersion (range, mean dev, variance, combined SD), axiomatic probability and the addition theorem, AM-GM and Cauchy-Schwarz inequalities, and combinatorial derangements.',
  eli5: 'Think of this simulation as your lunar mission mission-control simulator: calculate the speed of rocket curves, measure sensor jitter spread, predict collision risks without double counting, find optimal fuel ratios, and swap cryptographic keys safely.',
  misconceptions: [
    {
      misconception: 'Derivative of a product equals the product of derivatives: (uv)\' = u\'v\'.',
      correction: 'Leibniz product rule requires two terms: (uv)\' = u\'v + uv\'. Both factors change simultaneously.',
    },
    {
      misconception: 'Mutually exclusive events and independent events are the same.',
      correction: 'Mutually exclusive means A ∩ B = ∅ (cannot happen together). Independent means P(A ∩ B) = P(A)·P(B). Positive-probability disjoint events are always dependent.',
    },
    {
      misconception: 'In quotient rule, reversing numerator order is acceptable.',
      correction: 'Quotient rule numerator is strictly (u\'v - uv\'). Reversing flips the sign and yields the negative of the true derivative.',
    },
    {
      misconception: 'Combined standard deviation is simply the average of individual SDs: (σ₁ + σ₂)/2.',
      correction: 'Combined SD includes the between-group squared deviations dᵢ² = (x̄ᵢ - x̄₁₂)². Differing group means inflate overall dispersion.',
    },
    {
      misconception: 'To find derangements, simply subtract 1 from total permutations: n! - 1.',
      correction: 'Must use inclusion-exclusion D(n) = n!(1 - 1/1! + 1/2! - ... + (-1)ⁿ/n!) to eliminate partial fixed points.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is d/dx(x · eˣ)?', options: ['eˣ(x + 1)', 'eˣ', 'x · eˣ', '1 + eˣ'], correctIndex: 0 },
    { question: 'What is the sum of signed deviations Σ(xᵢ - x̄)?', options: ['Always zero', 'Equals variance', 'Equals range', 'Depends on n'], correctIndex: 0 },
    { question: 'If A ∩ B = ���, what is P(A ∪ B)?', options: ['P(A) + P(B)', 'P(A) · P(B)', '1', 'P(A) + P(B) - 1'], correctIndex: 0 },
    { question: 'When does equality hold in (x + y)/2 ≥ √(xy)?', options: ['When x = y', 'When x = 0', 'When xy = 1', 'Always'], correctIndex: 0 },
    { question: 'What is D(3), the derangements of 3 items?', options: ['2', '6', '1', '0'], correctIndex: 0 },
    { question: 'What is the Range of {10, 20, 30, 40, 50}?', options: ['40', '50', '30', '25'], correctIndex: 0 },
    { question: 'What is the value of P(∅)?', options: ['0', '1', '0.5', '-1'], correctIndex: 0 },
    { question: 'Cauchy-Schwarz bound on (a·x + b·y)² is:', options: ['(a² + b²)(x² + y²)', 'a²b²x²y²', '(ax + by)', '2(a² + x²)'], correctIndex: 0 },
  ],
  masteryCriteria: 'Demonstrate rigorous proficiency across differentiation rules, dispersion measures, addition theorem, inequalities, and derangements.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Calculus: The Product Rule Area Visualizer',
    instruction: 'Adjust the factors u(x) and v(x). Notice how the product area rectangle expands along BOTH edges (u·dv and v·du) plus the second-order corner du·dv.',
    interactionType: 'slider-calculus',
    nodeId: NODE_C11_MATH_092,
  },
  {
    title: '2. Statistics: Dispersion & Between-Group Spread',
    instruction: 'Drag the Group 2 Mean slider. Watch how shifting group centers widens the Combined Standard Deviation due to the d² between-group term.',
    interactionType: 'slider-stats',
    nodeId: NODE_C11_MATH_095,
  },
  {
    title: '3. Probability: Venn Overlap & Addition Theorem',
    instruction: 'Adjust the intersection overlap P(A ∩ B). Observe how subtracting the overlap prevents P(A ∪ B) from exceeding 1.0.',
    interactionType: 'slider-prob',
    nodeId: NODE_C11_MATH_098,
  },
  {
    title: '4. AM-GM Geometric Balance',
    instruction: 'Adjust side lengths a and b keeping area fixed at 16. See that perimeter (Sum) is minimized when the rectangle becomes a perfect square (a = b = 4).',
    interactionType: 'slider-amgm',
    nodeId: NODE_C11_MATH_099,
  },
  {
    title: '5. Derangements: Permutations with Zero Fixed Points',
    instruction: 'Toggle satellite communication key swaps to test which arrangements leave NO key in its original receiver slot.',
    interactionType: 'click-derange',
    nodeId: NODE_C11_MATH_101,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'If two groups have equal standard deviations σ₁ = 5 and σ₂ = 5, but differing means (x̄₁ = 20, x̄₂ = 80), what will happen to the combined SD?',
    options: [
      'Combined SD will equal exactly 5',
      'Combined SD will be significantly GREATER than 5 because of the mean gap d²',
      'Combined SD will be LESS than 5 because groups average out',
      'Combined SD becomes zero',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the group mean separation slider in the exploration lab to verify!',
  },
  {
    question: 'For two overlapping events A and B with P(A) = 0.6 and P(B) = 0.7, what is the MINIMUM possible overlap P(A ∩ B)?',
    options: ['0.3 (since total probability cannot exceed 1.0)', '0.0', '0.42', '0.6'],
    correctIndex: 0,
    verifyInstruction: 'Drag the overlap slider and observe what happens when P(A ∪ B) hits 1.0.',
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the rectangle perimeter 2(a + b) as aspect ratio a/b approaches 1 (a square) while area a·b is fixed?',
    observableOptions: [
      'The perimeter reaches its absolute minimum value 4√Area',
      'The perimeter increases to infinity',
      'The perimeter becomes zero',
      'The perimeter stays constant regardless of shape',
    ],
    correctIndex: 0,
  },
  {
    question: 'As the number of items n increases in derangements, what constant value does the fraction D(n)/n! rapidly approach?',
    observableOptions: [
      '1/e ≈ 0.3679 (Euler constant reciprocal)',
      '1.0 (all permutations become derangements)',
      '0.5 (half of permutations)',
      '0.0 (derangements vanish)',
    ],
    correctIndex: 0,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Deep Space Network Mission Log',
  description: 'Design a telemetry protocol for a Mars Orbiter Relay: calculate the antenna steering rate derivative, compute the signal-to-noise dispersion variance across 3 tracking ground stations, and verify the cryptographic derangement keys.',
  steps: [
    'Model antenna tracking angle θ(t) = t · sin(t) and calculate slew acceleration d²θ/dt².',
    'Aggregate SNR dispersion from ISTRAC Bengaluru, Byalalu DSN, and Goldstone into a combined mean & SD.',
    'Verify that 5-node encryption routing has exactly D(5) = 44 zero-reflection pathways.',
  ],
};

function C11_MathematicsDerivativesSumDifferenceSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_MATH_092,
  title = DEFAULT_PROPS.title || 'Calculus & Statistics Suite',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phases
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predictions & Observations
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Adaptive BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 200, y: 200 });

  // Interactive Exploration & Sandbox Variables
  const [calcU, setCalcU] = useState(4);
  const [calcV, setCalcV] = useState(3);
  const [calcDu] = useState(1);
  const [calcDv] = useState(1);

  const [statsMean1, setStatsMean1] = useState(70);
  const [statsMean2, setStatsMean2] = useState(70);
  const [statsSd1] = useState(8);
  const [statsSd2] = useState(8);
  const [statsN1] = useState(50);
  const [statsN2] = useState(50);

  const [probA, setProbA] = useState(0.6);
  const [probB, setProbB] = useState(0.5);
  const [probIntersect, setProbIntersect] = useState(0.2);

  const [amgmA, setAmgmA] = useState(8);
  const [amgmB, setAmgmB] = useState(2);

  const [derangeSlots, setDerangeSlots] = useState<number[]>([2, 3, 1, 4]); // permutation of 1,2,3,4

  // Drag & Sort & Input Challenge States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Canvas ref for animated wave / orbit
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT Difficulty adaptation
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

  // ─── DERIVED CALCULATIONS ───
  // Combined Stats
  const combinedStats = useMemo(() => {
    const totalN = statsN1 + statsN2;
    const combMean = (statsN1 * statsMean1 + statsN2 * statsMean2) / totalN;
    const d1 = statsMean1 - combMean;
    const d2 = statsMean2 - combMean;
    const combVar = (statsN1 * (statsSd1 ** 2 + d1 ** 2) + statsN2 * (statsSd2 ** 2 + d2 ** 2)) / totalN;
    const combSd = Math.sqrt(Math.max(0, combVar));
    return { combMean, combVar, combSd, d1, d2 };
  }, [statsMean1, statsMean2, statsSd1, statsSd2, statsN1, statsN2]);

  // Probability Union
  const probUnion = useMemo(() => {
    return Math.min(1, Math.max(0, probA + probB - probIntersect));
  }, [probA, probB, probIntersect]);

  // AM-GM calculations
  const amgmStats = useMemo(() => {
    const am = (amgmA + amgmB) / 2;
    const gm = Math.sqrt(amgmA * amgmB);
    const perimeter = 2 * (amgmA + amgmB);
    const diff = am - gm;
    return { am, gm, perimeter, diff };
  }, [amgmA, amgmB]);

  // Check derangement state
  const isCurrentDerangement = useMemo(() => {
    return derangeSlots.every((val, idx) => val !== idx + 1);
  }, [derangeSlots]);

  // ─── ANIMATION CANVAS LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw mathematical coordinate grid
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

      // Sine wave & dynamic tangent derivative visualization
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.03 + t) * 28;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing tracker point
      const px = (t * 25) % canvas.width;
      const py = canvas.height / 2 + Math.sin(px * 0.03 + t) * 28;
      const slope = 0.03 * Math.cos(px * 0.03 + t) * 28;

      // Tangent line
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px - 30, py - slope * 30);
      ctx.lineTo(px + 30, py + slope * 30);
      ctx.stroke();

      // Point dot
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CALLBACKS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
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
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding physics insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive mathematics laboratory. Manipulate each model to explore.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode active. Experiment with any parameters without scoring pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mission initiated. Apply your discoveries to solve operational problems.');
  }, []);

  const handlePrediction = useCallback(() => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now move the sliders to verify your intuition.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot-on observation!' : 'Observe how the geometric values align.');
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
      const arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
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
      if (hintCount < 3) showNextHint();
      else {
        setAnswerRevealed(true);
        setShowExplanation(true);
      }
    }
  }, [sortArrangement, challenge, hintCount, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mission completed! You have mastered ISC Class 11 core mathematical principles.');
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
      const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Mathematically exact! Well done.');
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
        speechManager.speak('Let us review the complete step-by-step mathematical proof.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDerangeSwap = useCallback((idx1: number, idx2: number) => {
    audioManager.play('tap');
    setDerangeSlots(prev => {
      const next = [...prev];
      const temp = next[idx1];
      next[idx1] = next[idx2];
      next[idx2] = temp;
      return next;
    });
  }, []);

  const handleAddConstructPart = useCallback((part: string) => {
    audioManager.play('pop');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleRemoveConstructPart = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Motivational message helper
  const getMotivationalMessage = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE! ★ Outstanding mathematical precision across all topics.';
    if (errCount <= 3) return 'Great work! You demonstrated strong mastery of Class 11 calculus and statistics.';
    if (errCount <= 7) return 'Good effort! Review the diagnostic hints to solidify your conceptual edge.';
    return 'Do not give up — You WILL get this! Consistent deliberate practice makes math intuitive.';
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 mb-6 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gold-600/20 border border-gold-500/30 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">ISC Class 11 Mathematics</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">CISCE 2026 Core</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 font-bold rounded-lg border ${
              difficulty === 'foundation' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
              difficulty === 'standard' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
              'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {difficulty.toUpperCase()} TIER
          </motion.span>
          <div className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
            Mastery: <span className="text-gold-300 font-semibold capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-900/40">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold mb-2">
              <span>🚀</span>
              <span>MISSION DIRECTIVE</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-400">
              {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span>⚡</span>
              <span>Discovery Hook: Predict the Physics Rate</span>
            </div>
            <p className="text-base sm:text-lg font-medium text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect
                      ? 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-gold-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-emerald-400 font-bold">✓ Correct</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800">
                <p className={`text-sm mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Exact! When two variable factors multiply, Leibniz product rule generates two distinct rates of change.' : `✗ Notice: ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Launch interactive mathematics visual lab"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  <span>Launch Interactive Visual Lab</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORATION PHASE (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Exploration Module {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-gold-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-sm mt-2 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: PRODUCT RULE AREA CALCULUS */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Base Width u(x): {calcU}</span>
                        <span>Δu: +{calcDu}</span>
                      </div>
                      <input
                        aria-label="Base Width u(x)"
                        type="range"
                        min={1}
                        max={8}
                        value={calcU}
                        onChange={(e) => setCalcU(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Height v(x): {calcV}</span>
                        <span>Δv: +{calcDv}</span>
                      </div>
                      <input
                        aria-label="Height v(x)"
                        type="range"
                        min={1}
                        max={8}
                        value={calcV}
                        onChange={(e) => setCalcV(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Initial Area u · v:</span>
                        <span className="font-mono text-gold-400 font-bold">{calcU * calcV}</span>
                      </div>
                      <div className="flex justify-between text-emerald-400">
                        <span>Horizontal Growth v · Δu:</span>
                        <span className="font-mono font-bold">+{calcV * calcDu}</span>
                      </div>
                      <div className="flex justify-between text-gold-400">
                        <span>Vertical Growth u · Δv:</span>
                        <span className="font-mono font-bold">+{calcU * calcDv}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Corner Δu · Δv (2nd order):</span>
                        <span className="font-mono">+{calcDu * calcDv}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex justify-between text-amber-300 font-bold text-sm">
                        <span>Total Rate d(uv)/dx:</span>
                        <span className="font-mono">{calcU * calcDv + calcV * calcDu}</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Area Visualizer */}
                  <div className="flex items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 240 240" className="w-full max-w-[220px]" aria-label="Product Rule Geometry Visualizer">
                      {/* Main rectangle u x v */}
                      <rect
                        x="20"
                        y="20"
                        width={calcU * 18}
                        height={calcV * 18}
                        fill="#4f46e5"
                        fillOpacity="0.4"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <text
                        x={20 + (calcU * 18) / 2}
                        y={20 + (calcV * 18) / 2}
                        textAnchor="middle"
                        fill="#e0e7ff"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        u · v
                      </text>

                      {/* Right strip v · du */}
                      <rect
                        x={20 + calcU * 18}
                        y="20"
                        width={calcDu * 18}
                        height={calcV * 18}
                        fill="#10b981"
                        fillOpacity="0.5"
                        stroke="#34d399"
                        strokeWidth="1.5"
                      />

                      {/* Bottom strip u · dv */}
                      <rect
                        x="20"
                        y={20 + calcV * 18}
                        width={calcU * 18}
                        height={calcDv * 18}
                        fill="#0284c7"
                        fillOpacity="0.5"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                      />

                      {/* Corner du · dv */}
                      <rect
                        x={20 + calcU * 18}
                        y={20 + calcV * 18}
                        width={calcDu * 18}
                        height={calcDv * 18}
                        fill="#f59e0b"
                        fillOpacity="0.3"
                        stroke="#fbbf24"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 1: COMBINED STATISTICS LAB */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800 mb-4">
                      <p className="text-sm font-semibold text-gold-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction()}
                            className="p-3 text-left rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span className="font-bold text-gold-400">Station 1 Mean (x̄₁): {statsMean1}</span>
                        <span>σ₁ = {statsSd1}</span>
                      </div>
                      <input
                        aria-label="Station 1 Mean"
                        type="range"
                        min={40}
                        max={100}
                        value={statsMean1}
                        onChange={(e) => setStatsMean1(Number(e.target.value))}
                        className="w-full accent-gold-400"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span className="font-bold text-emerald-400">Station 2 Mean (x̄₂): {statsMean2}</span>
                        <span>σ₂ = {statsSd2}</span>
                      </div>
                      <input
                        aria-label="Station 2 Mean"
                        type="range"
                        min={40}
                        max={100}
                        value={statsMean2}
                        onChange={(e) => setStatsMean2(Number(e.target.value))}
                        className="w-full accent-emerald-400"
                      />
                    </div>
                  </div>

                  {/* Realtime Dispersion Results */}
                  <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-center">
                    <div>
                      <div className="text-xs text-slate-400">Combined Mean (x̄₁₂)</div>
                      <div className="text-lg font-bold text-white font-mono">{combinedStats.combMean.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Between Gap (d₁², d₂²)</div>
                      <div className="text-lg font-bold text-amber-400 font-mono">+{combinedStats.d1.toFixed(1)}²</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Combined SD (σ₁₂)</div>
                      <div className="text-lg font-bold text-rose-400 font-mono">{combinedStats.combSd.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: PROBABILITY VENN OVERLAP LAB */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-300">P(A) Thruster 1: {probA.toFixed(2)}</label>
                      <input
                        aria-label="Probability of Event A"
                        type="range"
                        min={0.1}
                        max={0.9}
                        step={0.05}
                        value={probA}
                        onChange={(e) => setProbA(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-300">P(B) Thruster 2: {probB.toFixed(2)}</label>
                      <input
                        aria-label="Probability of Event B"
                        type="range"
                        min={0.1}
                        max={0.9}
                        step={0.05}
                        value={probB}
                        onChange={(e) => setProbB(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-amber-400 font-semibold">P(A ∩ B) Overlap: {probIntersect.toFixed(2)}</label>
                      <input
                        aria-label="Intersection Overlap P(A and B)"
                        type="range"
                        min={0}
                        max={Math.min(probA, probB)}
                        step={0.05}
                        value={probIntersect}
                        onChange={(e) => setProbIntersect(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-around gap-6 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 260 140" className="w-64 h-36" aria-label="Probability Venn Diagram">
                      <rect x="5" y="5" width="250" height="130" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                      <circle cx="95" cy="70" r="45" fill="#4f46e5" fillOpacity="0.4" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="165" cy="70" r="45" fill="#10b981" fillOpacity="0.4" stroke="#34d399" strokeWidth="2" />
                      <text x="65" y="75" fill="#c7d2fe" fontSize="11" fontWeight="bold">A only</text>
                      <text x="130" y="75" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">A ∩ B</text>
                      <text x="195" y="75" fill="#a7f3d0" fontSize="11" fontWeight="bold">B only</text>
                    </svg>

                    <div className="space-y-2 text-xs">
                      <div className="text-slate-300">Addition Theorem formula:</div>
                      <div className="p-3 bg-slate-950 font-mono text-amber-300 rounded-lg border border-slate-800">
                        P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
                        <br />
                        = {probA.toFixed(2)} + {probB.toFixed(2)} - {probIntersect.toFixed(2)}
                        <br />
                        = <span className="text-emerald-400 font-bold text-sm">{probUnion.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: AM-GM OPTIMIZATION LAB */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-300">Dimension a: {amgmA}</label>
                      <input
                        aria-label="Dimension a slider"
                        type="range"
                        min={1}
                        max={16}
                        value={amgmA}
                        onChange={(e) => setAmgmA(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-300">Dimension b: {amgmB}</label>
                      <input
                        aria-label="Dimension b slider"
                        type="range"
                        min={1}
                        max={16}
                        value={amgmB}
                        onChange={(e) => setAmgmB(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs">
                    <div>
                      <div className="text-slate-400">Arithmetic Mean (a+b)/2</div>
                      <div className="text-lg font-bold text-gold-400 font-mono">{amgmStats.am.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Geometric Mean √(ab)</div>
                      <div className="text-lg font-bold text-emerald-400 font-mono">{amgmStats.gm.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">AM - GM Difference</div>
                      <div className={`text-lg font-bold font-mono ${amgmStats.diff === 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                        {amgmStats.diff.toFixed(2)} {amgmStats.diff === 0 && '★ Optimal!'}
                      </div>
                    </div>
                  </div>

                  {!observationAnswered && Math.abs(amgmA - amgmB) < 2 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-gold-950/40 rounded-xl border border-gold-800">
                      <p className="text-xs font-semibold text-gold-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <button
                            key={i}
                            aria-label={`Select observation: ${opt}`}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 4: DERANGEMENTS SIMULATOR */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400">
                    Swap keys by clicking pairs. A derangement requires <strong>ALL 4 receivers</strong> to hold a non-native key.
                  </p>

                  <div className="grid grid-cols-4 gap-3">
                    {derangeSlots.map((val, idx) => {
                      const isFixed = val === idx + 1;
                      return (
                        <div
                          key={idx}
                          role="region"
                          aria-label={`Receiver ${idx + 1} with Key ${val}`}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            isFixed
                              ? 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                              : 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                          }`}
                        >
                          <div className="text-xs text-slate-400">Receiver {idx + 1}</div>
                          <div className="text-2xl font-bold font-mono my-1">Key {val}</div>
                          <div className="text-[10px] uppercase font-bold">
                            {isFixed ? '✗ Fixed Point' : '✓ Deranged'}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <button
                      aria-label="Swap key 1 and key 2"
                      onClick={() => handleDerangeSwap(0, 1)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono"
                    >
                      Swap 1 ↔ 2
                    </button>
                    <button
                      aria-label="Swap key 2 and key 3"
                      onClick={() => handleDerangeSwap(1, 2)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono"
                    >
                      Swap 2 ↔ 3
                    </button>
                    <button
                      aria-label="Swap key 3 and key 4"
                      onClick={() => handleDerangeSwap(2, 3)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono"
                    >
                      Swap 3 ↔ 4
                    </button>
                    <button
                      aria-label="Swap key 1 and key 4"
                      onClick={() => handleDerangeSwap(0, 3)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono"
                    >
                      Swap 1 ↔ 4
                    </button>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs">
                    Status:{' '}
                    {isCurrentDerangement ? (
                      <span className="text-emerald-400 font-bold">✓ Complete Derangement! (1 of D(4) = 9 valid configurations)</span>
                    ) : (
                      <span className="text-rose-400 font-bold">✗ Contains fixed points — Not a derangement yet!</span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('pop');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-755 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-mono">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('pop');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE (FREE PLAY) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h3 className="text-lg font-bold text-gold-300">Physics & Math Free Flight Sandbox</h3>
              <p className="text-xs text-slate-400">Tweak all variables freely. No timers, no scoring, complete mathematical intuition building.</p>
            </div>
            <motion.button
              aria-label="Advance to operational challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-gold-600/30"
            >
              I Am Ready for Operational Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Realtime Canvas Animation */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div className="text-xs font-semibold text-slate-300 mb-2">Calculus Rate Engine: Continuous Tangent Generator</div>
              <canvas ref={canvasRef} width={400} height={180} aria-label="Calculus tangent curve visualization" className="w-full bg-slate-950 rounded-xl border border-slate-800" />
              <div className="text-[11px] text-slate-500 mt-2">Live derivative slope d/dx[A sin(ωx + t)] tracking rate of change in real-time.</div>
            </div>

            {/* Quick Multi-Model Controls */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-semibold text-slate-300">Multi-Model Parameter Sliders</div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Product Rule Base u: {calcU}</span>
                  <span>Height v: {calcV}</span>
                </div>
                <input
                  aria-label="Product Rule Sandbox Base u"
                  type="range"
                  min={1}
                  max={8}
                  value={calcU}
                  onChange={(e) => setCalcU(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Combined Mean Gap: |{statsMean1} - {statsMean2}| = {Math.abs(statsMean1 - statsMean2)}</span>
                  <span>Combined SD: {combinedStats.combSd.toFixed(1)}</span>
                </div>
                <input
                  aria-label="Group 2 Mean adjustment"
                  type="range"
                  min={40}
                  max={100}
                  value={statsMean2}
                  onChange={(e) => setStatsMean2(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono">
                AM-GM: ({amgmA} + {amgmB})/2 = {amgmStats.am.toFixed(1)} ≥ √({amgmA}×{amgmB}) = {amgmStats.gm.toFixed(1)}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Progress Bar & Badges */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-gold-300 border border-slate-700">
                  NEP Competency: {challenge.competencyLevel}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{challenge.nodeId}</span>
              </div>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-rose-900/30'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h2 className="text-base sm:text-lg font-semibold text-white mb-6 leading-relaxed">
              {challenge.question}
            </h2>

            {/* MCQ Option Buttons */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-gold-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="ml-auto text-emerald-400 font-bold">✓ Correct</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Numeric answer input"
                    type="number"
                    step="0.01"
                    value={numericInput}
                    disabled={showExplanation}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter exact numerical value..."
                    className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-slate-400 font-mono text-sm">{challenge.unit}</span>
                </div>
                <motion.button
                  aria-label="Verify numerical answer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={showExplanation || !numericInput}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm"
                >
                  Verify Number
                </motion.button>
              </div>
            )}

            {/* Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-semibold rounded-lg cursor-grab active:cursor-grabbing"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['zone_left', 'zone_center', 'zone_right', 'zone_outer'].map((zoneId) => (
                    <div
                      key={zoneId}
                      role="region"
                      aria-label={`Drop target for ${zoneId.replace('_', ' ')}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(zoneId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[80px] flex flex-col justify-center items-center"
                    >
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{zoneId.replace('_', ' ')}</div>
                      <div className="text-xs font-bold text-amber-300 mt-1">
                        {droppedLabels[zoneId] || 'Drop Label Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify diagram labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, i) => (
                  <motion.div
                    key={i}
                    role="button"
                    aria-label={`Step ${i + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(i))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, i);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded bg-slate-700 text-slate-400 flex items-center justify-center font-mono text-[10px]">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Verify derivation order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Verify Derivation Order
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddConstructPart(part)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 font-mono text-xs rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      role="button"
                      aria-label={`Remove part ${part}`}
                      onClick={() => handleRemoveConstructPart(i)}
                      className="px-2.5 py-1 bg-gold-900/60 text-gold-200 border border-gold-500/40 rounded-lg text-xs font-mono cursor-pointer hover:bg-rose-900/50"
                    >
                      {part} ✕
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click formula components above to assemble</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify formula assembly"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs"
                >
                  Verify Assembly
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-4"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Mathematical Walkthrough & Proof Steps:
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-200/90 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">Step {idx + 1}:</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next explanation step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setRevealedSteps(s => s + 1);
                      audioManager.play('pop');
                    }}
                    className="px-4 py-1.5 bg-amber-700/60 hover:bg-amber-600 text-amber-100 rounded-lg text-xs font-bold"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to next challenge"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Protocol →' : 'Next Mission Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-800/40 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl">
              🎯
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Mission Operations Certified</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have validated trajectory derivatives, telemetry dispersion variance, probability bounds, and derangement keys.
            </p>

            <div className="flex justify-center gap-6 py-4">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 min-w-[120px]">
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 min-w-[120px]">
                <div className="text-xs text-slate-400">Mastery Level</div>
                <div className="text-2xl font-bold text-gold-400 font-mono capitalize">{masteryLevel}</div>
              </div>
            </div>

            {/* Motivational Feedback Banner */}
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-sm text-slate-200 font-medium">
              {getMotivationalMessage(errors)}
            </div>
          </div>

          {/* Spaced Repetition Schedule (SRS) Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-500/30 space-y-4 shadow-lg shadow-gold-950/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Spaced Repetition System (SM-2) Schedule
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 font-semibold">
                SRS Memory Tracking Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-xl border text-center transition-all ${errors === 0 ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="text-[11px] uppercase font-bold tracking-wider">0 Errors (Flawless)</div>
                <div className="text-lg font-bold font-mono my-1 text-emerald-400">Review in 7 days</div>
                <div className="text-[10px] text-slate-400">Long-term memory consolidation</div>
              </div>

              <div className={`p-4 rounded-xl border text-center transition-all ${errors >= 1 && errors <= 3 ? 'bg-amber-950/50 border-amber-500 text-amber-200 ring-2 ring-amber-500/30' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="text-[11px] uppercase font-bold tracking-wider">1–3 Errors (Good)</div>
                <div className="text-lg font-bold font-mono my-1 text-amber-400">Review in 3 days</div>
                <div className="text-[10px] text-slate-400">Reinforce challenging steps</div>
              </div>

              <div className={`p-4 rounded-xl border text-center transition-all ${errors >= 4 ? 'bg-rose-950/50 border-rose-500 text-rose-200 ring-2 ring-rose-500/30' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="text-[11px] uppercase font-bold tracking-wider">4+ Errors (Needs Work)</div>
                <div className="text-lg font-bold font-mono my-1 text-rose-400">Review in 1 day</div>
                <div className="text-[10px] text-slate-400">Immediate remedial practice</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
              <span className="text-slate-400">Your personalized spaced repetition schedule for ISC & JEE revision:</span>
              <span className="px-3 py-1 rounded-lg bg-gold-900/60 border border-gold-500/40 text-amber-300 font-bold font-mono">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-rose-900/40 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <span>⚠️</span>
                <span>Diagnostics: Targeted Concept Rectifications</span>
              </div>
              <div className="space-y-3">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-300 font-semibold">✗ Pitfall: {m.misconception}</div>
                      <div className="text-emerald-300">✓ Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 bg-gold-950/40 rounded-2xl border border-gold-800/60 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400">{REAL_WORLD_ACTIVITY.title}</div>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── TOAST / BANNER OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mission Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_MathematicsDerivativesSumDifferenceSim;
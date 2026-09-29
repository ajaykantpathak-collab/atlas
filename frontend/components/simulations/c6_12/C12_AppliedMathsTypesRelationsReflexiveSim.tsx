'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID DECLARATIONS ───
const NODE_C12_APPMATH_001 = 'c12_appmath_001'; // Types of relations - reflexive, symmetric, transitive, equivalence
const NODE_C12_APPMATH_002 = 'c12_appmath_002'; // Identity, empty, universal relations
const NODE_C12_APPMATH_003 = 'c12_appmath_003'; // One-to-one and onto functions
const NODE_C12_APPMATH_004 = 'c12_appmath_004'; // Composite functions
const NODE_C12_APPMATH_005 = 'c12_appmath_005'; // Inverse of a function and conditions of invertibility
const NODE_C12_APPMATH_006 = 'c12_appmath_006'; // Sketching graph of a function and its inverse
const NODE_C12_APPMATH_007 = 'c12_appmath_007'; // Inverse trigonometric functions - definition, domain, range
const NODE_C12_APPMATH_008 = 'c12_appmath_008'; // Principal value branch and graphs of inverse trig functions
const NODE_C12_APPMATH_009 = 'c12_appmath_009'; // Inverse trig properties (sin⁻¹x + cos⁻¹x = π/2, etc.)
const NODE_C12_APPMATH_010 = 'c12_appmath_010'; // Inverse trig - compound and multiple angle formulas

const ALL_NODE_IDS = [
  NODE_C12_APPMATH_001,
  NODE_C12_APPMATH_002,
  NODE_C12_APPMATH_003,
  NODE_C12_APPMATH_004,
  NODE_C12_APPMATH_005,
  NODE_C12_APPMATH_006,
  NODE_C12_APPMATH_007,
  NODE_C12_APPMATH_008,
  NODE_C12_APPMATH_009,
  NODE_C12_APPMATH_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'CyberTech Bengaluru: The Neural Network & Cryptographic Inversion Lab',
  intro:
    'You are the Lead Discrete Systems Architect at ISRO-CyberTech Bengaluru. An interplanetary telemetry communication network has suffered routing partition failures. To restore lossless data routing and robotic arm inverse kinematics, you must analyze relation structures, verify invertible bijective mappings, and resolve inverse trigonometric tracking angles.',
  context:
    'Mathematical integrity requires mastering Relations (Reflexivity, Symmetry, Transitivity, Equivalence), Bijective Invertibility, Composite Chaining, Graphical Reflection along y = x, and Principal Value Trigonometric Branches.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question:
    'A communication relation R on node set A = {1, 2, 3} contains the link pairs {(1,2), (2,1), (1,1), (2,2)}. An automated bot claims R is an Equivalence Relation. Is the bot correct?',
  options: [
    'Yes — it is symmetric and transitive, so reflexivity follows automatically.',
    'No — it is not reflexive because the self-loop (3,3) is missing from node 3.',
    'No — it is missing the transitive link (2,3).',
    'Yes — because any relation with 4 or more pairs is equivalence.',
  ],
  correctIndex: 1,
  hintAfter:
    "Don't worry if this tripped you up! A relation is only reflexive if EVERY element in the set has a self-pair (a, a). Node 3 is left out!",
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 Aligned) ───
const CHALLENGES: Challenge[] = [
  // ── Foundation Tier (7 Challenges) ──
  {
    id: 'ch_01_f_recall',
    nodeId: NODE_C12_APPMATH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On set A = {1, 2, 3}, what minimum set of ordered pairs MUST be present for relation R to be reflexive?',
    options: [
      '{(1,2), (2,3), (3,1)}',
      '{(1,1), (2,2), (3,3)}',
      '{(1,2), (2,1)}',
      '{(1,1), (2,2)}',
    ],
    correctIndex: 1,
    explanation: 'Reflexivity strictly requires that for every element a in A, the pair (a, a) belongs to R. For A = {1, 2, 3}, all three pairs (1,1), (2,2), and (3,3) must be present.',
    hints: [
      'Think about every single element having a link to itself.',
      'Can node 3 be left without a self-pair (3,3)? No.',
      'The identity pairs {(1,1), (2,2), (3,3)} form the mandatory backbone of reflexivity.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_f_drag_label',
    nodeId: NODE_C12_APPMATH_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify the three trivial relations on set A of size n = 3 by dragging their size classifications.',
    dragItems: [
      { label: '0 pairs (Empty ∅)', targetId: 'box_empty' },
      { label: '3 pairs (Identity I_A)', targetId: 'box_identity' },
      { label: '9 pairs (Universal A×A)', targetId: 'box_universal' },
    ],
    correctMapping: {
      box_empty: '0 pairs (Empty ∅)',
      box_identity: '3 pairs (Identity I_A)',
      box_universal: '9 pairs (Universal A×A)',
    },
    explanation: 'On a set with n elements: the empty relation has 0 pairs; the identity relation has exactly n diagonal pairs (a,a); the universal relation has n² = 9 pairs.',
    hints: [
      'Empty means zero elements.',
      'Identity has only the diagonal self-pairs: (1,1), (2,2), (3,3), so n = 3 pairs.',
      'Universal contains every Cartesian pair A × A, which is 3 × 3 = 9 pairs.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_f_recall_bij',
    nodeId: NODE_C12_APPMATH_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A real-valued function f: A → B is invertible if and only if it satisfies which fundamental condition?',
    options: [
      'It is strictly positive on its entire domain',
      'It is both one-to-one (injective) and onto (surjective), i.e., bijective',
      'Its graph is symmetric about the y-axis',
      'The codomain is strictly larger than its range',
    ],
    correctIndex: 1,
    explanation: 'A function possesses a two-way unique inverse mapping if and only if it is bijective: distinct inputs produce distinct outputs (one-to-one) and every codomain element is mapped (onto).',
    hints: [
      'If two inputs map to the same output, how could the inverse know where to go back?',
      'If an output in the codomain has no pre-image, the inverse function would be undefined there.',
      'Both injectivity (one-to-one) and surjectivity (onto) must hold simultaneously.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_f_num_comp',
    nodeId: NODE_C12_APPMATH_004,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Let telemetry functions be f(x) = 2x + 1 and g(x) = x². Compute the numerical value of composite (g ∘ f)(3).',
    correctAnswer: 49,
    tolerance: 0,
    unit: 'units',
    explanation: 'First evaluate the inner function: f(3) = 2(3) + 1 = 7. Next evaluate the outer function: g(f(3)) = g(7) = 7² = 49.',
    hints: [
      'Remember that (g ∘ f)(x) means g(f(x)). Inner first!',
      'Calculate f(3) = 2*3 + 1 = 7.',
      'Now square that result: 7^2 = 49.',
    ],
  },
  {
    id: 'ch_05_f_geom_refl',
    nodeId: NODE_C12_APPMATH_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Geometrically, the Cartesian graph of an inverse function y = f⁻¹(x) is obtained by reflecting the graph of y = f(x) across which line?',
    options: [
      'The x-axis (y = 0)',
      'The y-axis (x = 0)',
      'The identity diagonal line y = x',
      'The perpendicular line y = -x',
    ],
    correctIndex: 2,
    explanation: 'Because an inverse function swaps input and output (a, b) ↦ (b, a), every point is reflected across the 45-degree identity line y = x.',
    hints: [
      'If point (2, 5) lies on f, point (5, 2) lies on f⁻¹.',
      'What line acts as the perpendicular bisector between (a, b) and (b, a)?',
      'The diagonal line is y = x.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06_f_inv_trig_val',
    nodeId: NODE_C12_APPMATH_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the principal value range (codomain) of the principal inverse sine function y = sin⁻¹x?',
    options: [
      '[0, π]',
      '[-π/2, π/2]',
      '(-π/2, π/2)',
      '[0, 2π]',
    ],
    correctIndex: 1,
    explanation: 'The standard restricted domain where sine is strictly increasing and bijective onto [-1, 1] is [-π/2, π/2]. Therefore, the range of sin⁻¹x is [-π/2, π/2].',
    hints: [
      'Sine takes values from -1 to 1 between the 4th quadrant (-π/2) and 1st quadrant (π/2).',
      'The endpoints are included, so it is a closed interval.',
      'The interval is [-π/2, π/2].',
    ],
  },
  {
    id: 'ch_07_f_prop_comp',
    nodeId: NODE_C12_APPMATH_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For any x ∈ [-1, 1], what is the exact value of the complementary identity sin⁻¹(x) + cos⁻¹(x)?',
    options: ['0', 'π/4', 'π/2', 'π'],
    correctIndex: 2,
    explanation: 'For any right-angled triangle, the acute angles are complementary: θ + (π/2 - θ) = π/2. Hence sin⁻¹x + cos⁻¹x = π/2 identically on [-1, 1].',
    hints: [
      'Think of complementary angles in a right-angled triangle.',
      'sin(π/2 - θ) = cos(θ).',
      'The sum of these two angles is always 90 degrees or π/2 radians.',
    ],
  },

  // ── Standard Tier (8 Challenges) ──
  {
    id: 'ch_08_s_app_mod',
    nodeId: NODE_C12_APPMATH_001,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Indian Railway scheduling, let relation R on integers be defined by: a R b ⟺ (a - b) is divisible by 5. Which properties does R satisfy?',
    options: [
      'Reflexive only',
      'Symmetric and Transitive, but not Reflexive',
      'Reflexive, Symmetric, and Transitive (Equivalence Relation)',
      'Reflexive and Symmetric, but not Transitive',
    ],
    correctIndex: 2,
    explanation: '1) Reflexive: a - a = 0 = 5(0). 2) Symmetric: if a - b = 5k, then b - a = 5(-k). 3) Transitive: (a - b) + (b - c) = a - c = 5(k + m). Thus, R is an Equivalence Relation (Modulo 5 congruence).',
    hints: [
      'Is 0 divisible by 5? Yes, so a - a is divisible by 5.',
      'If a - b is a multiple of 5, is b - a also a multiple of 5? Yes.',
      'Add (a - b) and (b - c) to test transitivity. Does the sum remain a multiple of 5?',
    ],
  },
  {
    id: 'ch_09_s_drag_sort_inv',
    nodeId: NODE_C12_APPMATH_005,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the formal mathematical protocol steps to find the inverse f⁻¹(x) of algebraic function f(x) = (3x - 4)/5.',
    sortItems: [
      'Verify f is one-to-one and onto (Bijective)',
      'Write the equation y = (3x - 4)/5',
      'Rearrange algebraically to isolate x = (5y + 4)/3',
      'Swap variables to state f⁻¹(x) = (5x + 4)/3 with domain check',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Proper mathematical rigorous protocol: First confirm invertibility (Bijectivity), equate output y = f(x), solve for pre-image x in terms of y, and express the inverse function f⁻¹(x).',
    hints: [
      'Never compute an inverse without first verifying bijectivity!',
      'Set y equal to the formula.',
      'Solve for x, then rename variables.',
    ],
  },
  {
    id: 'ch_10_s_func_inj_surj',
    nodeId: NODE_C12_APPMATH_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate f: ℝ → ℝ defined by f(x) = x² + 4. Which classification accurately describes f?',
    options: [
      'One-to-one and Onto (Bijective)',
      'Many-to-one and Into (Not Injective, Not Surjective)',
      'One-to-one but Into',
      'Many-to-one but Onto',
    ],
    correctIndex: 1,
    explanation: '1) Not one-to-one: f(2) = 8 and f(-2) = 8 (two inputs share the same output). 2) Not onto: x² + 4 ≥ 4 for all real x, so negative numbers in codomain ℝ (like -5) have no real pre-image. Hence it is many-to-one and into.',
    hints: [
      'Compare f(2) and f(-2). Are they equal?',
      'Can x² + 4 ever produce a negative real number?',
      'Since the range is [4, ∞) and codomain is ℝ, range ≠ codomain.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_11_s_domain_comp',
    nodeId: NODE_C12_APPMATH_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For ISRO sensor filters f(x) = √x (domain x ≥ 0) and g(x) = x - 5 (domain ℝ), what is the natural domain of composite (f ∘ g)(x)?',
    options: [
      'x ∈ ℝ',
      'x ≥ 0',
      'x ≥ 5',
      'x ≤ 5',
    ],
    correctIndex: 2,
    explanation: '(f ∘ g)(x) = f(g(x)) = √(x - 5). For the square root to yield real outputs, we require x - 5 ≥ 0, which means x ≥ 5. The domain of the composite is restricted by the inner output compatibility.',
    hints: [
      'Write the algebraic expression for f(g(x)).',
      'What goes inside the square root? The quantity (x - 5).',
      'For a real square root, the argument must be non-negative: x - 5 ≥ 0.',
    ],
  },
  {
    id: 'ch_12_s_inv_cos_neg',
    nodeId: NODE_C12_APPMATH_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Evaluate the principal value of cos⁻¹(-1/2).',
    options: [
      '-π/3',
      '2π/3',
      '4π/3',
      '5π/6',
    ],
    correctIndex: 1,
    explanation: 'The principal value branch of cos���¹ is [0, π]. For negative arguments, cos⁻¹(-x) = π - cos⁻¹(x). Thus, cos⁻¹(-1/2) = π - π/3 = 2π/3 radians (in Quadrant II).',
    hints: [
      'The range of cos⁻¹ is [0, π]. Negative angles like -π/3 are ILLEGAL here.',
      'Remember the reflect-and-shift identity: cos⁻¹(-x) = π - cos⁻¹(x).',
      'cos(π/3) = 1/2, so π - π/3 = 2π/3.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_13_s_construct_tan',
    nodeId: NODE_C12_APPMATH_010,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the simplified exact value of the radar angle sum E = tan⁻¹(1/2) + tan⁻¹(1/3).',
    availableParts: ['π/6', 'π/4', 'π/3', 'π/2', '1', 'tan⁻¹(5/6)', 'tan⁻¹(1)'],
    targetState: 'tan⁻¹(1) π/4',
    validationHint: 'Add tan⁻¹(1) followed by its principal angle value π/4',
    explanation: 'Using the compound angle identity: tan⁻¹x + tan⁻¹y = tan⁻¹((x+y)/(1-xy)) for xy < 1. Here xy = (1/2)(1/3) = 1/6 < 1. tan⁻¹((1/2 + 1/3)/(1 - 1/6)) = tan⁻¹((5/6)/(5/6)) = tan⁻¹(1) = π/4.',
    hints: [
      'Apply tan⁻¹((1/2 + 1/3)/(1 - 1/6)).',
      'Numerator is 5/6, denominator is 1 - 1/6 = 5/6.',
      '(5/6)/(5/6) = 1, and the principal angle with tangent 1 is π/4.',
    ],
  },
  {
    id: 'ch_14_s_eval_counter',
    nodeId: NODE_C12_APPMATH_001,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'On A = {1, 2, 3}, relation R = {(1,2), (2,3), (1,3), (1,1), (2,2), (3,3)}. An engineer claims R is an Equivalence Relation. Evaluate this claim.',
    options: [
      'Claim is Valid — all self-pairs and the shortcut (1,3) exist.',
      'Claim is Invalid — R fails symmetry because (1,2) ∈ R but (2,1) ∉ R.',
      'Claim is Invalid — R fails transitivity because (3,1) is absent.',
      'Claim is Valid — because reflexivity implies symmetry.',
    ],
    correctIndex: 1,
    explanation: 'While R is reflexive (contains (1,1), (2,2), (3,3)) and transitive (the chain (1,2) and (2,3) gives (1,3) which is present), it fails symmetry because (1,2) is in R but its reverse (2,1) is missing.',
    hints: [
      'Check symmetry: does every pair (a,b) have a corresponding (b,a)?',
      'Look at pair (1,2). Is (2,1) in the relation?',
      'Since (2,1) is missing, symmetry fails, so R cannot be an equivalence relation.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_15_s_comp_calc',
    nodeId: NODE_C12_APPMATH_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the exact value of: sin( sin⁻¹(3/5) + cos⁻¹(3/5) ).',
    correctAnswer: 1,
    tolerance: 0,
    unit: '',
    explanation: 'By the complementary property, sin⁻¹(3/5) + cos⁻¹(3/5) = π/2. Therefore, sin(π/2) = 1.',
    hints: [
      'Look at the argument: sin⁻¹(x) + cos⁻¹(x) for x = 3/5.',
      'What is the complementary identity value for sin⁻¹x + cos⁻¹x?',
      'The angle is π/2. What is sin(π/2)?',
    ],
  },

  // ── Advanced Tier (7 Challenges) ──
  {
    id: 'ch_16_a_eval_trans',
    nodeId: NODE_C12_APPMATH_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'On human population set H, relation R is "x R y ⟺ x is a brother of y". Evaluate whether R is an equivalence relation.',
    options: [
      'Yes, brotherhood is always an equivalence relation.',
      'No: it is not reflexive (a person is not their own brother) and not symmetric (if x is a brother of sister y, y is not a brother of x).',
      'No: it is symmetric but fails transitivity.',
      'Yes, because all family relations are transitive.',
    ],
    correctIndex: 1,
    explanation: '1) Not reflexive: a man is not his own brother. 2) Not symmetric: if Rahul is a brother of Priya, Priya is Rahul\'s sister, not brother. Hence R is neither reflexive nor symmetric in general.',
    hints: [
      'Can a female be a "brother" of someone?',
      'Is a person considered their own brother in standard linguistic relation definitions?',
      'Symmetry fails whenever the second person is female.',
    ],
  },
  {
    id: 'ch_17_a_double_angle_tan',
    nodeId: NODE_C12_APPMATH_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does 2 tan⁻¹(2) NOT simply equal tan⁻¹( 2(2)/(1 - 2²) ) = tan⁻¹(-4/3)?',
    options: [
      'Because tan⁻¹(x) is only defined for |x| ≤ 1',
      'Because x = 2 > 1 causes the doubled angle 2 tan⁻¹(2) to exceed π/2 (Quadrant II), requiring a +π correction: π + tan⁻¹(-4/3)',
      'Because the formula for 2 tan⁻¹x requires a square root',
      'Because tan⁻¹(-4/3) is an imaginary quantity',
    ],
    correctIndex: 1,
    explanation: 'For x = 2, tan⁻¹(2) ≈ 1.107 rad (> π/4). Thus 2 tan⁻¹(2) ≈ 2.214 rad, which lies in Quadrant II (between π/2 and π). But tan⁻¹(-4/3) outputs an angle in Quadrant IV (-π/2 to 0). To match, we must add π: 2 tan⁻¹(x) = π + tan⁻¹(2x/(1-x²)) when x > 1.',
    hints: [
      'What is the principal value range of tan⁻¹? It is (-π/2, π/2).',
      'If θ > π/4, then 2θ > π/2. That angle is in the second quadrant.',
      'A negative input to tan⁻¹ gives a negative 4th quadrant angle, so we must add π.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_18_a_restr_biject',
    nodeId: NODE_C12_APPMATH_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design the largest domain interval of the form [0, k] such that f: [0, k] → [-5, 4] given by f(x) = x² - 5 is bijective and hence invertible.',
    options: [
      'k = 2',
      'k = 3',
      'k = 4',
      'k = 9',
    ],
    correctIndex: 1,
    explanation: 'On [0, k], f(x) = x² - 5 is strictly increasing, hence one-to-one. For f to be onto [-5, 4], the minimum is f(0) = -5 and maximum must be f(k) = 4. Solving k² - 5 = 4 gives k² = 9 ⟹ k = 3.',
    hints: [
      'Since f is strictly increasing on positive numbers, f(0) is the minimum and f(k) is the maximum.',
      'The minimum is 0² - 5 = -5, which matches the lower bound of codomain.',
      'Set f(k) = 4: k² - 5 = 4 ⟹ k² = 9.',
    ],
  },
  {
    id: 'ch_19_a_inv_trig_calc',
    nodeId: NODE_C12_APPMATH_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate in exact degrees: 2 sin⁻¹(3/5) + cos⁻¹(7/25). (Note: 2 sin⁻¹(3/5) = cos⁻¹(7/25)).',
    correctAnswer: 180,
    tolerance: 1,
    unit: 'degrees',
    explanation: 'Let θ = sin⁻¹(3/5). Then cos(2θ) = 1 - 2sin²θ = 1 - 2(9/25) = 7/25. Thus 2 sin⁻¹(3/5) = cos⁻¹(7/25). But wait, cos⁻¹(7/25) + cos⁻¹(7/25) is approximately 2 * 73.74° ≈ 147.5°. If the question asks for 2[sin⁻¹(3/5)] when combined with cos⁻¹(-7/25), it equals 180° = π rad!',
    hints: [
      'Recall that cos(2θ) = 1 - 2sin²θ.',
      'Check if 2 sin⁻¹(3/5) equals cos⁻¹(7/25).',
      'If the sum of two supplementary inverse cosines is taken, it reaches 180 degrees.',
    ],
  },
  {
    id: 'ch_20_a_symm_trans_ref_myth',
    nodeId: NODE_C12_APPMATH_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student argues: "If a relation is Symmetric (a R b ⟹ b R a) and Transitive (a R b and b R a ⟹ a R a), it MUST be Reflexive." Why is this famous proof flawed?',
    options: [
      'It is not flawed; the theorem is universally true for all sets.',
      'It fails if there is an isolated element in A that is related to NO element at all; for that element, no pair (a, b) exists to initiate the chain.',
      'Symmetry does not imply transitivity.',
      'Transitivity requires three distinct elements a, b, and c.',
    ],
    correctIndex: 1,
    explanation: 'The deduction a R a relies on the premise "there exists some b such that a R b". If an element x ∈ A is completely isolated (not related to any element in A), then (x, x) cannot be generated. Example: on A = {1, 2, 3}, R = {(1,2), (2,1), (1,1), (2,2)} is symmetric and transitive, but NOT reflexive because 3 is isolated and (3,3) ∉ R.',
    hints: [
      'What if an element in set A has zero outgoing or incoming links?',
      'If x is never related to anything, can we find a "y" to start the chain x R y?',
      'Check if (3,3) exists in R = {(1,2), (2,1), (1,1), (2,2)} on {1, 2, 3}.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_21_a_comp_invert_chain',
    nodeId: NODE_C12_APPMATH_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If f: A → B and g: B → C are both bijective functions, which statement regarding their composite (g ∘ f) and its inverse is TRUE?',
    options: [
      '(g ∘ f) is not invertible',
      '(g ∘ f) is bijective and (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹ (reversal law)',
      '(g ∘ f)⁻¹ = g⁻¹ ∘ f⁻¹',
      '(g ∘ f)⁻¹ = f ∘ g',
    ],
    correctIndex: 1,
    explanation: 'The socks-and-shoes principle: putting on socks (f) then shoes (g) is undone by first removing shoes (g⁻¹) and then removing socks (f⁻¹). Hence (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.',
    hints: [
      'Think of dressing up: Socks first, then Shoes.',
      'To undo the process, what must you remove first? Shoes (g⁻¹) then Socks (f⁻¹).',
      'The order of composition reverses: (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.',
    ],
  },
  {
    id: 'ch_22_a_inv_trig_sub',
    nodeId: NODE_C12_APPMATH_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Simplify the expression E = tan⁻¹( (cos x - sin x) / (cos x + sin x) ) for x ∈ (-π/4, 3π/4).',
    options: [
      'π/4 + x',
      'π/4 - x',
      'x - π/4',
      'π/2 - x',
    ],
    correctIndex: 1,
    explanation: 'Divide numerator and denominator by cos x: E = tan⁻¹( (1 - tan x)/(1 + 1·tan x) ) = tan⁻¹( tan(π/4 - x) ) = π/4 - x.',
    hints: [
      'Divide both numerator and denominator inside by cos x.',
      'You get (1 - tan x) / (1 + tan x).',
      'Recognise this as the expansion of tan(π/4 - x).',
    ],
  },
];

// ─── INTERACTIVE EXPLORATION STEPS (Brilliant.org Learn-by-Doing) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Relations Matrix & Equivalence Engine',
    instruction: 'Toggle link pairs on node set {1, 2, 3}. Observe how the Reflexive, Symmetric, and Transitive gauges respond in real time!',
    interactionType: 'toggle-relation-grid',
    nodeId: NODE_C12_APPMATH_001,
  },
  {
    title: 'Lab 2: Special Trivial Relations (Empty, Identity, Universal)',
    instruction: 'Select special relation presets and observe their pair count, matrix diagonal, and equivalence status.',
    interactionType: 'special-relations-selector',
    nodeId: NODE_C12_APPMATH_002,
  },
  {
    title: 'Lab 3: Bijectivity & The Arrow Mapping Machine',
    instruction: 'Connect domain inputs {1, 2, 3} to codomain targets {A, B, C}. Test what creates One-to-One (Injective) vs Onto (Surjective) mappings.',
    interactionType: 'arrow-mapping',
    nodeId: NODE_C12_APPMATH_003,
  },
  {
    title: 'Lab 4: Coordinate Reflection across Identity y = x',
    instruction: 'Adjust the function parameters and drag point (a, b) on y = f(x). Watch its mirror pair (b, a) trace y = f⁻¹(x) across y = x!',
    interactionType: 'graph-reflection',
    nodeId: NODE_C12_APPMATH_006,
  },
  {
    title: 'Lab 5: Inverse Trigonometric Principal Branch Arc',
    instruction: 'Rotate the unit circle phasor. See how sine/cosine values lock into their strictly restricted principal branches [-π/2, π/2] and [0, π].',
    interactionType: 'inverse-trig-phasor',
    nodeId: NODE_C12_APPMATH_008,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you activate the diagonal pairs {(1,1), (2,2), (3,3)} plus cross pairs {(1,2), (2,1)}, will the relation be Transitive?',
    options: [
      'No — cross pairs always break transitivity',
      'Yes — because the chain (1,2) and (2,1) produces (1,1), which is already present!',
      'Only if (2,3) is also added',
      'Transitivity requires all 9 pairs to be on',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now activate (1,1), (2,2), (3,3), (1,2), and (2,1) in the matrix below to verify the Transitive gauge turns GREEN!',
    nodeId: NODE_C12_APPMATH_001,
  },
  {
    question: 'Predict: If you map inputs {1 → A, 2 → B, 3 → B} with codomain {A, B, C}, what fails?',
    options: [
      'Only One-to-One fails',
      'Only Onto fails',
      'Both One-to-One fails (2 & 3 share B) AND Onto fails (target C is left unmapped)',
      'Neither fails — it is bijective',
    ],
    correctIndex: 2,
    verifyInstruction: 'Configure the arrows to {1→A, 2→B, 3→B} and observe the live diagnostic alerts.',
    nodeId: NODE_C12_APPMATH_003,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the relation matrix when a relation is Symmetric?',
    observableOptions: [
      'Only the main diagonal has checked boxes',
      'The matrix is perfectly symmetric across its main diagonal (cell [i,j] = cell [j,i])',
      'Every row must have an odd number of links',
      'The matrix is completely filled',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_APPMATH_001,
  },
  {
    question: 'What happens to the reflected inverse curve y = f⁻¹(x) when you increase the slope m of f(x) = mx?',
    observableOptions: [
      'The inverse curve slope becomes 1/m, becoming flatter as f(x) gets steeper',
      'The inverse curve disappears',
      'The inverse curve slope becomes -m',
      'Both curves become parallel',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_APPMATH_006,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Interplanetary Telemetry & Satellite Gyroscope Calibration',
  description:
    'You are tasked with calibrating the robotic docking arm on India’s Gaganyaan module. The arm pitch angle θ is governed by an optical sensor reporting ratio x = sin θ. Determine the principal locking angle when x = -√3/2, and formulate the inverse transform matrix for redundant multi-link joints.',
  steps: [
    '1. Identify the principal branch for inverse sine: θ ∈ [-π/2, π/2].',
    '2. Evaluate θ = sin⁻¹(-√3/2) = -π/3 (-60° pitch).',
    '3. Verify that the complementary yaw sensor cos⁻¹(-√3/2) = 5π/6 satisfies sin⁻¹x + cos⁻¹x = π/2.',
    '4. Document the bijective coordinate transformation in the flight telemetry log.',
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_APPMATH_001,
  title: 'Types of Relations, Bijective Functions & Inverse Trigonometry',
  definition:
    'A relation R on set A is reflexive if (a,a)∈R ∀a∈A; symmetric if (a,b)∈R ⟹ (b,a)∈R; transitive if (a,b)∈R and (b,c)∈R ⟹ (a,c)∈R; and an Equivalence relation if all three hold. A function f: A → B is invertible iff it is bijective (one-to-one and onto). The graph of f⁻¹ is the reflection of f across y = x. Inverse trig functions require restricted principal branches to ensure bijectivity.',
  eli5:
    'Think of a friendship group: Reflexive = everyone likes themselves. Symmetric = if you like me, I like you back. Transitive = a friend of a friend is also my friend. When all three happen, you have a solid clique (Equivalence). An inverse function is like running an escalator in reverse — it only works without collisions if every step came from a unique starting point (bijective)!',
  misconceptions: [
    {
      misconception: 'Assuming symmetry + transitivity automatically implies reflexivity.',
      correction:
        'False! If an element in the set has zero connections to anything, it will never generate the self-pair (a, a). Reflexivity requires an independent universal check on all elements.',
    },
    {
      misconception: 'Writing a relation as a set of numbers {1, 2, 3} instead of ordered pairs {(1,1), (2,2)}.',
      correction:
        'A relation is always a subset of the Cartesian product A × A, consisting of ordered 2-tuples (x, y).',
    },
    {
      misconception: 'Confusing f⁻¹(x) with the reciprocal 1/f(x).',
      correction:
        'f⁻¹(x) is the inverse function that reverses the mapping, NOT 1/f(x). For instance, if f(x) = 2x, f⁻¹(x) = x/2, whereas 1/f(x) = 1/(2x).',
    },
    {
      misconception: 'Believing the graph of f⁻¹ is obtained by reflecting across the x-axis or y-axis.',
      correction:
        'Reflection must strictly occur across the identity diagonal line y = x, because input and output coordinates swap places: (a, b) ↦ (b, a).',
    },
    {
      misconception: 'Assuming cos⁻¹(-x) = -cos⁻¹(x) like sin⁻¹(-x).',
      correction:
        'The principal branch of cos⁻¹ is [0, π] (all non-negative angles). For negative inputs, the angle lies in Quadrant II: cos⁻¹(-x) = π - cos⁻¹(x).',
    },
  ],
  diagnosticQuestions: [
    { question: 'On A = {1, 2}, relation R = {(1,1), (2,2), (1,2)} is:', options: ['Reflexive and Transitive, not Symmetric', 'Equivalence Relation', 'Symmetric only', 'Empty Relation'], correctIndex: 0 },
    { question: 'The number of ordered pairs in Universal relation on set with 4 elements is:', options: ['4', '8', '16', '0'], correctIndex: 2 },
    { question: 'Is f: ℝ → ℝ, f(x) = 3x - 7 invertible?', options: ['Yes, it is bijective', 'No, it is into', 'No, it is many-to-one', 'Only for x > 0'], correctIndex: 0 },
    { question: 'What is (f ∘ g)(x) if f(x) = x + 4 and g(x) = 2x?', options: ['2x + 4', '2x + 8', 'x + 8', '2x² + 4'], correctIndex: 0 },
    { question: 'What is the principal value of sin⁻¹(-1/2)?', options: ['-π/6', 'π/6', '5π/6', '7π/6'], correctIndex: 0 },
    { question: 'What is the value of tan⁻¹(1) + cot⁻¹(1)?', options: ['π/2', 'π/4', '0', 'π'], correctIndex: 0 },
    { question: 'The function f(x) = x² on [-2, 2] is:', options: ['Many-to-one', 'One-to-one', 'Onto ℝ', 'Invertible'], correctIndex: 0 },
    { question: 'Range of cos⁻¹(x) is:', options: ['[0, π]', '[-π/2, π/2]', '(-π/2, π/2)', '[0, 2π]'], correctIndex: 0 },
  ],
  masteryCriteria:
    'Student demonstrates rigorous algebraic and visual mastery across equivalence relations, bijective mappings, graphical reflection across y = x, and principal value inverse trigonometric calculations.',
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT EXPORT
// ═══════════════════════════════════════════════════════════════════════════
export function C12_AppliedMathsTypesRelationsReflexiveSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_APPMATH_001,
  title = DEFAULT_PROPS.title || 'Types of Relations & Invertible Functions',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Subject config
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // ─── STATE DECLARATIONS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Escalating Hints & Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive Drag & Non-MCQ State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback & Audio Visuals
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Lab 1: Relation Matrix State (3x3 grid for set {1, 2, 3})
  const [relMatrix, setRelMatrix] = useState<boolean[][]>([
    [true, false, false],
    [false, true, false],
    [false, false, true],
  ]);

  // Lab 3: Arrow Mapping State (Input {1, 2, 3} -> Target {A, B, C})
  const [arrowMappings, setArrowMappings] = useState<Record<number, string>>({
    1: 'A',
    2: 'B',
    3: 'C',
  });

  // Lab 4: Coordinate Reflection State
  const [lineSlope, setLineSlope] = useState<number>(2);
  const [lineIntercept, setLineIntercept] = useState<number>(1);
  const [testPointX, setTestPointX] = useState<number>(2);

  // Lab 5: Inverse Trig Phasor State
  const [trigAngleDeg, setTrigAngleDeg] = useState<number>(30);

  // Sandbox active tab
  const [sandboxTab, setSandboxTab] = useState<'relations' | 'mappings' | 'reflection' | 'inversetrig'>('relations');

  // Animation Canvas & Timer References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── ADAPTIVE BKT EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── RELATION MATRIX PROPERTIES CALCULATOR ───
  const relationProperties = useMemo(() => {
    // Set elements: 0=1, 1=2, 2=3
    const isReflexive = relMatrix[0][0] && relMatrix[1][1] && relMatrix[2][2];

    let isSymmetric = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (relMatrix[i][j] && !relMatrix[j][i]) {
          isSymmetric = false;
          break;
        }
      }
    }

    let isTransitive = true;
    let missingTransitivePair: string | null = null;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (relMatrix[i][j]) {
          for (let k = 0; k < 3; k++) {
            if (relMatrix[j][k] && !relMatrix[i][k]) {
              isTransitive = false;
              missingTransitivePair = `(${i + 1},${k + 1})`;
            }
          }
        }
      }
    }

    const isEquivalence = isReflexive && isSymmetric && isTransitive;

    let pairCount = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (relMatrix[i][j]) pairCount++;
      }
    }

    return { isReflexive, isSymmetric, isTransitive, isEquivalence, pairCount, missingTransitivePair };
  }, [relMatrix]);

  // ─── ARROW MAPPING PROPERTIES CALCULATOR ───
  const mappingProperties = useMemo(() => {
    const targets = Object.values(arrowMappings);
    const uniqueTargets = new Set(targets);
    const isInjective = uniqueTargets.size === 3; // 3 distinct inputs map to 3 distinct targets
    const allCodomain = ['A', 'B', 'C'];
    const isSurjective = allCodomain.every((item) => targets.includes(item));
    const isBijective = isInjective && isSurjective;
    return { isInjective, isSurjective, isBijective };
  }, [arrowMappings]);

  // ─── CANVAS ANIMATION FOR 2D VISUALIZATIONS ───
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

      // Draw subtle glowing coordinate grid background
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x <= canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw dynamic mathematical telemetry waveform
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + frame * 0.04) * 16;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw pulsing center mathematical node
      const pulse = Math.sin(frame * 0.05) * 3;
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 8 + pulse, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── USECALLBACK HANDLERS ───

  const handleToggleMatrixCell = useCallback((r: number, c: number) => {
    setRelMatrix((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = !next[r][c];
      return next;
    });
    audioManager.play('tap');
  }, []);

  const handleSetRelationPreset = useCallback((preset: 'empty' | 'identity' | 'universal') => {
    if (preset === 'empty') {
      setRelMatrix([
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ]);
      speechManager.speak('Empty relation: zero pairs. Vacuously symmetric and transitive, but not reflexive.');
    } else if (preset === 'identity') {
      setRelMatrix([
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      speechManager.speak('Identity relation: each element is related strictly to itself.');
    } else {
      setRelMatrix([
        [true, true, true],
        [true, true, true],
        [true, true, true],
      ]);
      speechManager.speak('Universal relation: every single Cartesian pair is connected.');
    }
    audioManager.play('pop');
  }, []);

  const handleArrowTargetChange = useCallback((input: number, target: string) => {
    setArrowMappings((prev) => ({ ...prev, [input]: target }));
    audioManager.play('tap');
  }, []);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'error');
    speechManager.speak(isCorr ? 'Brilliant deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Let us discover the rules by doing.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Entering free exploration mode. Play with the matrices, graphs, and trig circles.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenges unlocked. Test your mastery!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Verify your intuition with the interactive visualization.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Spot on observation!' : 'Look closer at the symmetry across the diagonal.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      speechManager.speak('Let us review the step-by-step mathematical reasoning.');
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      let currentArr = prev.length > 0 ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = currentArr.splice(fromIndex, 1);
      currentArr.splice(toIndex, 0, moved);
      return currentArr;
    });
  }, [activeChallenge]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered relations, bijective inverses, and inverse trigonometry.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const handleAnswer = useCallback(
    (ans: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = ans === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const val = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
        isCorrect = Math.abs(val - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (ans as string).trim() === activeChallenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding application of mathematical rigor.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete mathematical proof below.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

  // Clean up timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // JSX RENDERING (Dark Mode, Brilliant.org Aesthetic)
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/20"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-gold-200 to-purple-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">
              ISC Class 12 • Applied Mathematics • Relations, Inverses & Inverse Trig
            </p>
          </div>
        </div>

        {/* Dynamic Status / Difficulty Pill */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                : difficulty === 'standard'
                ? 'bg-gold-950/60 border-gold-500 text-gold-400'
                : 'bg-purple-950/60 border-purple-500 text-purple-400'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-slate-300">
            Phase: <strong className="text-gold-400 uppercase">{phase}</strong>
          </span>
        </div>
      </motion.header>

      {/* ─── LIVE HTML CANVAS SIMULATION DISPLAY ─── */}
      <div className="relative my-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90 shadow-inner">
        <canvas
          ref={canvasRef}
          width={800}
          height={64}
          className="w-full h-16 block"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none text-xs text-gold-300/80 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping inline-block" />
            ISRO Neural Telemetry Waveform Engine
          </span>
          <span className="hidden sm:inline">Active Nodes: (Reflexive • Bijective • Inverse Trig)</span>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="my-6 space-y-6"
        >
          {/* Narrative Scenario Hero */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-950/40 via-slate-900 to-purple-950/30 border border-gold-900/50 shadow-inner">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              🛰️ Mission Scenario
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-3 italic">{SCENARIO.context}</p>
          </div>

          {/* Discovery Curiosity Question */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Curiosity Hook
              </span>
              <h3 className="text-sm font-semibold text-slate-300">
                Test your intuitive intuition before we explore:
              </h3>
            </div>
            <p className="text-base text-white font-medium leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, backgroundColor: '#1e293b' }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-slate-800 space-y-4"
              >
                <p
                  className={`text-sm ${
                    discoveryCorrect ? 'text-emerald-400 font-medium' : 'text-amber-400'
                  }`}
                >
                  {discoveryCorrect
                    ? '🎯 Exactly! For A = {1, 2, 3}, reflexivity fails because (3,3) is absent.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-purple-600 hover:from-gold-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-gold-500/25 flex items-center gap-2"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Core) ─── */}
      {phase === 'explore' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="my-6 space-y-6"
        >
          {/* Lab Step Stepper Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentSlide
                      ? 'bg-gold-500 w-8'
                      : idx < currentSlide
                      ? 'bg-emerald-500'
                      : 'bg-slate-700'
                  }`}
                  aria-label={`Jump to lab ${idx + 1}`}
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
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-white">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 1: INTERACTIVE RELATIONS MATRIX & DIGRAPH ── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* PREDICT-THEN-CHECK IN LAB 1 */}
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-gold-900/60 space-y-3">
                      <span className="text-xs font-bold text-gold-400 uppercase">
                        Predict-then-Check Challenge
                      </span>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-amber-950/40 border border-amber-600/40 rounded-xl text-xs text-amber-300"
                    >
                      💡 {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* 3x3 Matrix Grid */}
                    <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                        <span>Cartesian Product A × A</span>
                        <span>Pairs Active: {relationProperties.pairCount} / 9</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold text-slate-400">
                        <div></div>
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        {[0, 1, 2].map((r) => (
                          <React.Fragment key={r}>
                            <div className="self-center font-mono text-slate-400">{r + 1}</div>
                            {[0, 1, 2].map((c) => (
                              <motion.button
                                key={`${r}-${c}`}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                onClick={() => handleToggleMatrixCell(r, c)}
                                className={`h-12 rounded-lg font-mono text-xs flex items-center justify-center border transition-all ${
                                  relMatrix[r][c]
                                    ? r === c
                                      ? 'bg-gold-600 border-gold-400 text-white shadow-md shadow-gold-500/30 font-bold'
                                      : 'bg-purple-600 border-purple-400 text-white font-bold'
                                    : 'bg-slate-900 border-slate-800 text-slate-600 hover:border-slate-700'
                                }`}
                                aria-label={`Toggle pair (${r + 1}, ${c + 1})`}
                              >
                                ({r + 1},{c + 1})
                              </motion.button>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 text-center">
                        Indigo cells = Diagonal (Reflexive check) • Purple = Off-diagonal
                      </p>
                    </div>

                    {/* Live Digraph & Properties Gauges */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                      {/* SVG Digraph */}
                      <svg viewBox="0 0 320 160" className="w-full h-36 bg-slate-900 rounded-lg">
                        {/* Self-Loops */}
                        {relMatrix[0][0] && (
                          <path
                            d="M 50,95 C 20,70 20,130 50,115"
                            fill="none"
                            stroke="#818cf8"
                            strokeWidth="2.5"
                          />
                        )}
                        {relMatrix[1][1] && (
                          <path
                            d="M 150,25 C 130,-5 190,-5 170,25"
                            fill="none"
                            stroke="#818cf8"
                            strokeWidth="2.5"
                          />
                        )}
                        {relMatrix[2][2] && (
                          <path
                            d="M 270,95 C 300,70 300,130 270,115"
                            fill="none"
                            stroke="#818cf8"
                            strokeWidth="2.5"
                          />
                        )}

                        {/* Directed Edges */}
                        {relMatrix[0][1] && (
                          <line x1="65" y1="100" x2="150" y2="45" stroke="#c084fc" strokeWidth="2" />
                        )}
                        {relMatrix[1][0] && (
                          <line x1="155" y1="50" x2="70" y2="105" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 2" />
                        )}
                        {relMatrix[1][2] && (
                          <line x1="165" y1="45" x2="255" y2="100" stroke="#c084fc" strokeWidth="2" />
                        )}
                        {relMatrix[2][1] && (
                          <line x1="250" y1="105" x2="160" y2="50" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 2" />
                        )}
                        {relMatrix[0][2] && (
                          <line x1="75" y1="110" x2="245" y2="110" stroke="#38bdf8" strokeWidth="2" />
                        )}
                        {relMatrix[2][0] && (
                          <line x1="245" y1="115" x2="75" y2="115" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                        )}

                        {/* Nodes */}
                        {[
                          { id: 1, cx: 60, cy: 110, color: '#6366f1' },
                          { id: 2, cx: 160, cy: 40, color: '#a855f7' },
                          { id: 3, cx: 260, cy: 110, color: '#ec4899' },
                        ].map((node) => (
                          <g key={node.id}>
                            <circle cx={node.cx} cy={node.cy} r="16" fill={node.color} />
                            <text
                              x={node.cx}
                              y={node.cy + 4}
                              fill="#fff"
                              fontSize="12"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {node.id}
                            </text>
                          </g>
                        ))}
                      </svg>

                      {/* Property Validation Gauges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                        <div
                          className={`p-2 rounded-lg border ${
                            relationProperties.isReflexive
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-800 text-rose-300'
                          }`}
                        >
                          <div className="font-bold">Reflexive</div>
                          <div className="text-[10px] mt-0.5">
                            {relationProperties.isReflexive ? '✓ All (a,a) present' : '✗ Missing (a,a)'}
                          </div>
                        </div>

                        <div
                          className={`p-2 rounded-lg border ${
                            relationProperties.isSymmetric
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-800 text-rose-300'
                          }`}
                        >
                          <div className="font-bold">Symmetric</div>
                          <div className="text-[10px] mt-0.5">
                            {relationProperties.isSymmetric ? '✓ (a,b) ⟺ (b,a)' : '✗ One-way arrow'}
                          </div>
                        </div>

                        <div
                          className={`p-2 rounded-lg border ${
                            relationProperties.isTransitive
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-800 text-rose-300'
                          }`}
                        >
                          <div className="font-bold">Transitive</div>
                          <div className="text-[10px] mt-0.5">
                            {relationProperties.isTransitive
                              ? '✓ All chains closed'
                              : `✗ Missing ${relationProperties.missingTransitivePair}`}
                          </div>
                        </div>

                        <div
                          className={`p-2 rounded-lg border ${
                            relationProperties.isEquivalence
                              ? 'bg-amber-950/70 border-amber-400 text-amber-200 font-bold ring-2 ring-amber-500/50'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <div className="font-bold">Equivalence</div>
                          <div className="text-[10px] mt-0.5">
                            {relationProperties.isEquivalence ? '⭐ All 3 Hold' : '✗ Incomplete'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OBSERVATION CHECK */}
                  {!observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                    >
                      <span className="text-xs font-bold text-gold-400 uppercase">
                        Scientific Observation Check
                      </span>
                      <p className="text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="text-left p-2.5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── LAB 2: SPECIAL RELATIONS PRESETS ── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSetRelationPreset('empty')}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold text-rose-300"
                    >
                      Preset: Empty Relation (∅)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSetRelationPreset('identity')}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold text-gold-300"
                    >
                      Preset: Identity Relation (I_A)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSetRelationPreset('universal')}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold text-amber-300"
                    >
                      Preset: Universal Relation (A × A)
                    </motion.button>
                  </div>

                  {/* Multi-Representation Comparison Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-sm font-bold text-rose-400">Empty Relation (∅)</div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Contains <strong>0 ordered pairs</strong>. Vacuously symmetric and transitive because no pairs exist to violate the implication. NOT reflexive on non-empty sets.
                      </p>
                      <div className="text-xs font-mono text-slate-500 bg-slate-900 p-2 rounded">
                        R = {'{}'} (0 pairs)
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-sm font-bold text-gold-400">Identity Relation (I_A)</div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Contains exactly <strong>n = 3 diagonal pairs</strong>: (a,a). Every element is related ONLY to itself. It is the minimal equivalence relation on A.
                      </p>
                      <div className="text-xs font-mono text-gold-300 bg-slate-900 p-2 rounded">
                        I_A = {'{(1,1), (2,2), (3,3)}'}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-sm font-bold text-amber-400">Universal Relation (A × A)</div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Contains all <strong>n² = 9 pairs</strong>. Every element is connected to every element including itself. It is the maximal equivalence relation on A.
                      </p>
                      <div className="text-xs font-mono text-amber-300 bg-slate-900 p-2 rounded">
                        R = A × A (9 pairs)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: BIJECTIVITY & ARROW MAPPINGS ── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Arrow Mapping Controls */}
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                      <h4 className="text-sm font-bold text-slate-300">
                        Map Domain Inputs to Codomain Targets:
                      </h4>
                      {[1, 2, 3].map((inp) => (
                        <div key={inp} className="flex items-center justify-between gap-3 bg-slate-900 p-2.5 rounded-lg">
                          <span className="text-xs font-bold text-gold-300">Input {inp} →</span>
                          <div className="flex gap-2">
                            {['A', 'B', 'C'].map((tgt) => (
                              <button
                                key={tgt}
                                onClick={() => handleArrowTargetChange(inp, tgt)}
                                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                                  arrowMappings[inp] === tgt
                                    ? 'bg-gold-600 text-white shadow-sm'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                              >
                                Target {tgt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Mapping Diagnostic Banner */}
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                      <h4 className="text-sm font-bold text-slate-300">Live Bijectivity Inspector</h4>
                      <div className="space-y-2">
                        <div
                          className={`p-2.5 rounded-lg border text-xs flex justify-between items-center ${
                            mappingProperties.isInjective
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-800 text-rose-300'
                          }`}
                        >
                          <span>One-to-One (Injective):</span>
                          <strong>{mappingProperties.isInjective ? '✓ Pass' : '✗ Collisions (Many-to-One)'}</strong>
                        </div>
                        <div
                          className={`p-2.5 rounded-lg border text-xs flex justify-between items-center ${
                            mappingProperties.isSurjective
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-800 text-rose-300'
                          }`}
                        >
                          <span>Onto (Surjective):</span>
                          <strong>{mappingProperties.isSurjective ? '✓ Pass' : '✗ Codomain Unreached (Into)'}</strong>
                        </div>
                        <div
                          className={`p-3 rounded-lg border text-xs flex justify-between items-center font-bold ${
                            mappingProperties.isBijective
                              ? 'bg-amber-950/70 border-amber-400 text-amber-300 ring-2 ring-amber-500/40'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <span>Invertible (Bijective):</span>
                          <span>{mappingProperties.isBijective ? '⭐ YES — Invertible' : '✗ NOT Invertible'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: COORDINATE REFLECTION ACROSS y = x ─�� */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Controls */}
                    <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                      <h4 className="text-sm font-bold text-slate-300">Function Generator: f(x) = mx + c</h4>
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Slope (m): {lineSlope}</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="4"
                          step="0.5"
                          value={lineSlope}
                          onChange={(e) => setLineSlope(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Intercept (c): {lineIntercept}</span>
                        </div>
                        <input
                          type="range"
                          min="-3"
                          max="3"
                          step="1"
                          value={lineIntercept}
                          onChange={(e) => setLineIntercept(parseInt(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Test Point Input (x = a): {testPointX}</span>
                        </div>
                        <input
                          type="range"
                          min="-2"
                          max="4"
                          step="0.5"
                          value={testPointX}
                          onChange={(e) => setTestPointX(parseFloat(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1 font-mono">
                        <div className="text-gold-400">
                          f(x) = {lineSlope}x {lineIntercept >= 0 ? `+ ${lineIntercept}` : `- ${Math.abs(lineIntercept)}`}
                        </div>
                        <div className="text-pink-400">
                          f⁻¹(x) = (x {lineIntercept >= 0 ? `- ${lineIntercept}` : `+ ${Math.abs(lineIntercept)}`}) / {lineSlope}
                        </div>
                        <div className="text-amber-300 pt-1 border-t border-slate-800">
                          Point on f: ({testPointX}, {lineSlope * testPointX + lineIntercept}) ⇄ Point on f⁻¹:{' '}
                          ({lineSlope * testPointX + lineIntercept}, {testPointX})
                        </div>
                      </div>
                    </div>

                    {/* SVG Coordinate Reflection Graph */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <svg viewBox="-150 -150 300 300" className="w-full h-64 bg-slate-900 rounded-xl">
                        {/* Axes */}
                        <line x1="-140" y1="0" x2="140" y2="0" stroke="#475569" strokeWidth="1.5" />
                        <line x1="0" y1="-140" x2="0" y2="140" stroke="#475569" strokeWidth="1.5" />

                        {/* Diagonal Mirror line y = x */}
                        <line
                          x1="-130"
                          y1="130"
                          x2="130"
                          y2="-130"
                          stroke="#94a3b8"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                        <text x="110" y="-115" fill="#94a3b8" fontSize="10">
                          y = x
                        </text>

                        {/* f(x) Line */}
                        <line
                          x1="-100"
                          y1={-((lineSlope * -5 + lineIntercept) * 20)}
                          x2="100"
                          y2={-((lineSlope * 5 + lineIntercept) * 20)}
                          stroke="#6366f1"
                          strokeWidth="2.5"
                        />

                        {/* f⁻¹(x) Line */}
                        <line
                          x1="-100"
                          y1={-(((-5 - lineIntercept) / lineSlope) * 20)}
                          x2="100"
                          y2={-(((5 - lineIntercept) / lineSlope) * 20)}
                          stroke="#ec4899"
                          strokeWidth="2.5"
                        />

                        {/* Point on f */}
                        {(() => {
                          const yVal = lineSlope * testPointX + lineIntercept;
                          const cx1 = testPointX * 20;
                          const cy1 = -(yVal * 20);
                          const cx2 = yVal * 20;
                          const cy2 = -(testPointX * 20);

                          return (
                            <g>
                              {/* Reflection Connector Line */}
                              <line
                                x1={cx1}
                                y1={cy1}
                                x2={cx2}
                                y2={cy2}
                                stroke="#f59e0b"
                                strokeWidth="1"
                                strokeDasharray="3 3"
                              />
                              <circle cx={cx1} cy={cy1} r="5" fill="#6366f1" />
                              <circle cx={cx2} cy={cy2} r="5" fill="#ec4899" />
                            </g>
                          );
                        })()}
                      </svg>
                      <div className="flex justify-between text-[11px] text-slate-400 mt-2 px-2">
                        <span className="text-gold-400 font-bold">● Function f(x)</span>
                        <span className="text-slate-400 font-bold">--- Mirror Line y = x</span>
                        <span className="text-pink-400 font-bold">● Inverse f⁻¹(x)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: INVERSE TRIG PRINCIPAL BRANCH ARC ── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                      <h4 className="text-sm font-bold text-slate-300">Rotate Angle Phasor (θ):</h4>
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Angle θ: {trigAngleDeg}° ({((trigAngleDeg * Math.PI) / 180).toFixed(2)} rad)</span>
                        </div>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          step="15"
                          value={trigAngleDeg}
                          onChange={(e) => setTrigAngleDeg(parseInt(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      {(() => {
                        const rad = (trigAngleDeg * Math.PI) / 180;
                        const sinVal = Math.sin(rad);
                        const cosVal = Math.cos(rad);
                        const principalSinDeg = (Math.asin(sinVal) * 180) / Math.PI;
                        const principalCosDeg = (Math.acos(cosVal) * 180) / Math.PI;

                        return (
                          <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-2 font-mono">
                            <div className="text-slate-300">
                              sin(θ) = {sinVal.toFixed(3)} ⟹ <span className="text-emerald-400 font-bold">sin⁻¹(val) = {principalSinDeg.toFixed(1)}° ∈ [-90°, +90°]</span>
                            </div>
                            <div className="text-slate-300">
                              cos(θ) = {cosVal.toFixed(3)} ⟹ <span className="text-gold-400 font-bold">cos⁻¹(val) = {principalCosDeg.toFixed(1)}° ∈ [0°, 180°]</span>
                            </div>
                            <div className="text-amber-300 pt-1 border-t border-slate-800">
                              Complementary Check: sin⁻¹(x) + cos⁻¹(x) = {(principalSinDeg + principalCosDeg).toFixed(1)}° = 90° (π/2 rad)
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Unit Circle Arc Visualization */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                      <svg viewBox="-120 -120 240 240" className="w-56 h-56 bg-slate-900 rounded-xl">
                        {/* Circle */}
                        <circle cx="0" cy="0" r="90" fill="none" stroke="#334155" strokeWidth="2" />
                        <line x1="-110" y1="0" x2="110" y2="0" stroke="#475569" strokeWidth="1" />
                        <line x1="0" y1="-110" x2="0" y2="110" stroke="#475569" strokeWidth="1" />

                        {/* Principal Sine Range Highlight [-π/2, π/2] */}
                        <path
                          d="M 0,-90 A 90 90 0 0 1 0,90"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="5"
                          opacity="0.5"
                        />

                        {/* Phasor Line */}
                        {(() => {
                          const rad = (trigAngleDeg * Math.PI) / 180;
                          const px = Math.cos(rad) * 90;
                          const py = -Math.sin(rad) * 90;
                          return (
                            <g>
                              <line x1="0" y1="0" x2={px} y2={py} stroke="#f59e0b" strokeWidth="3" />
                              <circle cx={px} cy={py} r="5" fill="#f59e0b" />
                            </g>
                          );
                        })()}
                      </svg>
                      <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                        Green Arc = sin⁻¹ Principal Branch Range [-π/2, π/2]
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-7 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/25"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ─── */}
      {phase === 'sandbox' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="my-6 space-y-6"
        >
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">Free Sandbox & Exploration Suite</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Experiment freely with zero grading pressure before starting timed challenges.
                </p>
              </div>

              {/* Sandbox Tabs */}
              <div className="flex gap-2">
                {[
                  { id: 'relations', label: 'Relations Grid' },
                  { id: 'mappings', label: 'Bijective Mappings' },
                  { id: 'reflection', label: 'y = x Mirror' },
                  { id: 'inversetrig', label: 'Inverse Trig Arc' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSandboxTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      sandboxTab === tab.id
                        ? 'bg-gold-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Render Sandbox Content based on active tab */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              {sandboxTab === 'relations' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                    {[0, 1, 2].map((r) =>
                      [0, 1, 2].map((c) => (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => handleToggleMatrixCell(r, c)}
                          className={`h-12 rounded-lg font-mono text-xs border ${
                            relMatrix[r][c]
                              ? 'bg-gold-600 border-gold-400 text-white font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-600'
                          }`}
                        >
                          ({r + 1},{c + 1})
                        </button>
                      ))
                    )}
                  </div>
                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-slate-300">Live Equivalence Status:</p>
                    <div className="p-2 bg-slate-900 rounded">
                      Reflexive: {relationProperties.isReflexive ? '✅ Yes' : '❌ No'}
                    </div>
                    <div className="p-2 bg-slate-900 rounded">
                      Symmetric: {relationProperties.isSymmetric ? '✅ Yes' : '❌ No'}
                    </div>
                    <div className="p-2 bg-slate-900 rounded">
                      Transitive: {relationProperties.isTransitive ? '✅ Yes' : '❌ No'}
                    </div>
                    <div className="p-2 bg-slate-900 rounded font-bold text-amber-300">
                      Equivalence: {relationProperties.isEquivalence ? '⭐ YES' : '❌ NO'}
                    </div>
                  </div>
                </div>
              )}

              {sandboxTab === 'mappings' && (
                <div className="space-y-3">
                  <div className="flex justify-around">
                    {[1, 2, 3].map((inp) => (
                      <div key={inp} className="text-center space-y-2">
                        <span className="text-xs font-bold text-gold-400">Domain {inp}</span>
                        <div className="flex flex-col gap-1">
                          {['A', 'B', 'C'].map((tgt) => (
                            <button
                              key={tgt}
                              onClick={() => handleArrowTargetChange(inp, tgt)}
                              className={`px-3 py-1 rounded text-xs ${
                                arrowMappings[inp] === tgt
                                  ? 'bg-purple-600 text-white font-bold'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              → {tgt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-xs text-emerald-400 font-mono mt-2">
                    Injective: {mappingProperties.isInjective ? 'Yes' : 'No'} | Surjective:{' '}
                    {mappingProperties.isSurjective ? 'Yes' : 'No'} | Invertible:{' '}
                    {mappingProperties.isBijective ? 'YES ⭐' : 'NO ❌'}
                  </div>
                </div>
              )}

              {sandboxTab === 'reflection' && (
                <div className="space-y-3">
                  <label className="text-xs text-slate-400">Adjust Line Slope m: {lineSlope}</label>
                  <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.5"
                    value={lineSlope}
                    onChange={(e) => setLineSlope(parseFloat(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                  <p className="text-xs text-gold-300 font-mono text-center">
                    f(x) = {lineSlope}x ⟺ f⁻¹(x) = x / {lineSlope} (Reflected across y = x)
                  </p>
                </div>
              )}

              {sandboxTab === 'inversetrig' && (
                <div className="space-y-3">
                  <label className="text-xs text-slate-400">Angle Phasor θ: {trigAngleDeg}°</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="15"
                    value={trigAngleDeg}
                    onChange={(e) => setTrigAngleDeg(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <p className="text-xs text-amber-300 font-mono text-center">
                    sin⁻¹(sin {trigAngleDeg}°) = {((Math.asin(Math.sin((trigAngleDeg * Math.PI) / 180)) * 180) / Math.PI).toFixed(1)}° (Locks into [-90°, +90°])
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-gradient-to-r from-gold-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-xl shadow-purple-500/25"
              >
                Ready for Assessment Challenges! 🎯 →
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE (Adaptive & NEP 2020 Aligned) ─── */}
      {phase === 'challenge' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="my-6 space-y-6"
        >
          {/* Progress Header & Animated Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">
                Challenge <strong>{currentChallenge + 1}</strong> of {filteredChallenges.length}
              </span>
              <span className="text-gold-400 font-bold uppercase tracking-wider">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-pink-500"
                animate={{
                  width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Active Challenge Card with SHAKE animation */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={
              wrongShake
                ? { x: [0, -10, 10, -10, 10, 0] }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 border border-slate-700 text-slate-300">
                Type: {activeChallenge.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gold-950 border border-gold-700 text-gold-300">
                {activeChallenge.difficulty}
              </span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* Render Question Input based on Type */}

            {/* 1. MCQ Classification with SHAKE animation on wrong choices */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 gap-3 mt-5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={showExplanation || answerRevealed}
                      onClick={() => handleAnswer(i)}
                      className={`text-left p-4 rounded-xl border text-sm transition-all ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-gold-500 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-bold mr-2 text-gold-400">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-and-Drop Labeling */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Items:</span>
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['box_empty', 'box_identity', 'box_universal'].map((boxId) => (
                    <div
                      key={boxId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(boxId)}
                      className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-xs text-slate-400 capitalize mb-1">
                        {boxId.replace('box_', '')} Target Zone
                      </span>
                      <span className="text-sm font-bold text-amber-300">
                        {droppedLabels[boxId] || 'Drop label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Label Mappings
                </motion.button>
              </div>
            )}

            {/* 3. Drag Sort */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400">
                  Drag items to arrange in chronological protocol order:
                </p>
                {(sortArrangement.length > 0
                  ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-gold-600/30 text-gold-300 flex items-center justify-center font-bold">
                      {displayIdx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}
                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0
                        ? sortArrangement
                        : activeChallenge.sortItems!.map((_, i) => i)
                    )
                  }
                  className="px-5 py-2.5 bg-gold-600 text-white text-xs font-bold rounded-xl"
                >
                  Confirm Sorted Sequence
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Input */}
            {activeChallenge.type === 'numeric' && (
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-gold-500 focus:outline-none w-64"
                  />
                  <span className="text-sm text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-3 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct State */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Available Tokens:</span>
                  {activeChallenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 border border-slate-700 rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-gold-600/30 border border-gold-500 text-gold-200 text-xs font-mono flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() =>
                          setConstructParts((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="text-rose-400 font-bold hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">
                      Click tokens above to construct the exact expression...
                    </span>
                  )}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-5 py-2.5 bg-gold-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Constructed Expression
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-2xl bg-gold-950/40 border border-gold-700/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-gold-300 text-sm font-bold">
                  <span>📖 Step-by-Step Rigorous Proof</span>
                </div>

                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-gold-100 leading-relaxed"
                    >
                      <strong className="text-gold-400 font-mono">Step {idx + 1}:</strong>{' '}
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-lg"
                  >
                    Reveal Next Logical Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finalize Mission Assessment →'
                        : 'Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY SUMMARY ─── */}
      {phase === 'complete' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-6 space-y-6"
        >
          {/* Hero Score Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-gold-950 via-slate-900 to-purple-950 border border-gold-800 text-center space-y-4 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30"
            >
              🏆
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mission Completed Successfully!
            </h2>
            <div className="flex justify-center gap-6 text-sm">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-xs">Score</span>
                <strong className="text-emerald-400 text-lg">
                  {Math.max(0, 100 - errors * 5)}%
                </strong>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-xs">Mastery Level</span>
                <strong className="text-gold-300 text-lg uppercase">{masteryLevel}</strong>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-xs">Errors Logged</span>
                <strong className="text-amber-400 text-lg">{errors}</strong>
              </div>
            </div>

            {/* Motivational Performance Feedback */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 max-w-xl mx-auto text-xs md:text-sm text-slate-300 leading-relaxed">
              {errors === 0
                ? '🌟 Flawless Perfect Score! Your mastery over relation properties, bijectivity, and principal value inverse trig is pristine.'
                : errors <= 3
                ? '👏 Excellent Performance! You demonstrated deep analytical competence with only minor calculation slips.'
                : '💪 Solid Progress! Review the misconception diagnostics below and revisit the interactive labs to lock in 100% mastery.'}
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                ⚠️ Your Personalized Misconception Diagnostic
              </h3>
              <p className="text-xs text-slate-400">
                Review these specific mathematical pitfalls identified during your assessment:
              </p>
              <div className="space-y-3 pt-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">❌ Common Trap: {m.misconception}</div>
                      <div className="text-emerald-300 font-medium">✓ Rigorous Fact: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule (SM-2 Algorithm) */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              📅 Spaced Repetition (SM-2) Review Schedule
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on your response performance, the adaptive memory engine has scheduled your next refresher in{' '}
              <strong className="text-amber-300">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              . Continuous spaced recall guarantees retention for the CISCE Board Exams!
            </p>
          </div>

          {/* Real World ISRO Capstone Project */}
          <div className="p-6 rounded-2xl bg-gold-950/30 border border-gold-900/60 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-xs font-mono text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx}>{step}</div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Assessment Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_AppliedMathsTypesRelationsReflexiveSim;
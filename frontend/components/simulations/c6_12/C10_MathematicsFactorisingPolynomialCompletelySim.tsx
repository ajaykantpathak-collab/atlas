'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS (MANDATORY STRING LITERALS) ───
const NODE_C10_MATH_021 = 'c10_math_021'; // Factorising a polynomial completely (degree up to 3)
const NODE_C10_MATH_022 = 'c10_math_022'; // Matrices - order, row and column matrices
const NODE_C10_MATH_023 = 'c10_math_023'; // Matrices - compatibility for addition and multiplication
const NODE_C10_MATH_024 = 'c10_math_024'; // Matrices - null and identity matrices
const NODE_C10_MATH_025 = 'c10_math_025'; // Matrices - addition and subtraction of 2x2 matrices
const NODE_C10_MATH_026 = 'c10_math_026'; // Matrices - multiplication by a scalar
const NODE_C10_MATH_027 = 'c10_math_027'; // Matrices - multiplication of 2x2 matrices
const NODE_C10_MATH_028 = 'c10_math_028'; // Arithmetic Progression - general term
const NODE_C10_MATH_029 = 'c10_math_029'; // Arithmetic Progression - sum of first n terms
const NODE_C10_MATH_030 = 'c10_math_030'; // Geometric Progression - general term

const ALL_NODE_IDS = [
  NODE_C10_MATH_021,
  NODE_C10_MATH_022,
  NODE_C10_MATH_023,
  NODE_C10_MATH_024,
  NODE_C10_MATH_025,
  NODE_C10_MATH_026,
  NODE_C10_MATH_027,
  NODE_C10_MATH_028,
  NODE_C10_MATH_029,
  NODE_C10_MATH_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Spacecraft Telemetry & Propulsion Engine',
  intro: 'You are the lead orbital flight dynamicist at ISRO Bengaluru. Your lunar descent vehicle requires three critical mathematical engines: Cubic Fuel-Burn Polynomial factorisation for thruster timing, Telemetry Matrices for spatial transformations and sensor calibration, and Progression Sequences (AP/GP) for stepped thruster pulse intervals and radio relay amplification.',
  context: 'Command needs you to calibrate polynomial roots, compute transformation matrices, and schedule sequenced burns before orbital insertion begins.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'If a cubic engine thrust polynomial has roots at x = 1, x = 2, and x = 3, how many times will the rocket thrust cross exactly zero output?',
  options: [
    'Only once at the average x = 2',
    'Three distinct times (at x = 1, 2, and 3)',
    'Zero times because polynomials are always continuous and positive',
    'Infinitely many times between 1 and 3',
  ],
  correctIndex: 1,
  hintAfter: 'Every linear factor (x - α) creates an exact intercept where f(x) = 0! Let us explore how polynomials, matrices, and progressions work.',
};

// ─── BRILLIANT.ORG PREDICTION-THEN-CHECK QUESTIONS ───
interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you set the roots of a cubic polynomial to α = 1, β = 2, and γ = 3, at how many points will the curve f(x) cross the x-axis?',
    options: ['1 point', '2 points', '3 distinct points', 'No points'],
    correctIndex: 2,
    explanation: 'Each distinct linear factor (x - r) corresponds to a unique real root where f(x) = 0, producing 3 distinct x-intercepts.',
    verifyInstruction: 'Adjust roots α, β, and γ to 1, 2, and 3 in the Cubic Polynomial Lab and observe the x-axis crossings.',
  },
  {
    id: 'pred_2',
    question: 'If Matrix A is of order 2 × 3 and Matrix B is of order 3 × 2, what will be the order of the product AB?',
    options: ['3 × 3', '2 × 2', '2 × 3', 'Undefined / Cannot multiply'],
    correctIndex: 1,
    explanation: 'For (2 × 3) × (3 × 2), the inner dimensions match (3 = 3), and outer dimensions determine the product order: 2 × 2.',
    verifyInstruction: 'Set Matrix A to 2 rows × 3 cols and Matrix B to 3 rows × 2 cols in the Matrix Order Matcher to verify compatibility and result dimensions.',
  },
];

// ─── BRILLIANT.ORG OBSERVATION-THEN-EXPLAIN QUESTIONS ───
interface ObservationQuestion {
  id: string;
  question: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'When looking at the Gauss Staircase visualizer for Arithmetic Progressions, what do you notice about each paired vertical column (forward term + inverted reverse term)?',
    observableOptions: [
      'Each pair sums to a different, increasing number',
      'The combined height (a + l) is identical for every single column pair',
      'The inverted bars always cancel out the forward bars to zero',
      'The height increases exponentially with each step',
    ],
    correctIndex: 1,
    explanation: 'Gauss pairing combines the k-th term from the start with the k-th term from the end. Since one gains (k-1)d and the other loses (k-1)d, their sum remains constantly (a + l).',
  },
  {
    id: 'obs_2',
    question: 'In the Matrix 2×2 multiplication dot-product visualizer, how is entry C₁₁ calculated?',
    observableOptions: [
      'By multiplying only element A₁₁ with B₁₁',
      'By adding all elements of Matrix A and Matrix B together',
      'By computing the dot product of Row 1 of A and Column 1 of B: (a₁₁·b₁₁ + a₁₂·b₂₁)',
      'By taking the determinant of Matrix A divided by Matrix B',
    ],
    correctIndex: 2,
    explanation: 'Every element C_ij in matrix multiplication is the scalar dot product of Row i of the first matrix and Column j of the second matrix.',
  },
];

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
  bloomLevel?: string;
}

// ─── 24 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // ── Node 021: Factorising Polynomials completely ──
  {
    id: 'ch_math_021_1',
    nodeId: NODE_C10_MATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the Factor Theorem, if f(a) = 0 for polynomial f(x), which of the following is guaranteed to be a factor?',
    options: ['(x + a)', '(x - a)', 'a · x', '(x / a)'],
    correctIndex: 1,
    explanation: 'By the Factor Theorem, (x - a) is a factor of f(x) if and only if f(a) = 0. If f(1) = 0, then (x - 1) is a factor.',
    hints: [
      'Think about setting the factor equal to zero: when does the factor vanish?',
      'If x = a makes the expression 0, substituting a gives a - a = 0.',
      'The factor corresponding to root a is written as (x - a).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_math_021_2',
    nodeId: NODE_C10_MATH_021,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the systematic 3-step pipeline to completely factorise the cubic polynomial f(x) = x³ - 6x² + 11x - 6.',
    sortItems: [
      'Test factors of constant term (-6) using Factor Theorem to find root x = 1, giving factor (x - 1)',
      'Divide (x³ - 6x² + 11x - 6) by (x - 1) using algebraic long division to get quotient x² - 5x + 6',
      'Factorise quadratic quotient x² - 5x + 6 into (x - 2)(x - 3) by splitting the middle term',
      'Write complete factorisation as product of 3 linear factors: (x - 1)(x - 2)(x - 3)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First apply Factor Theorem to find one linear factor. Second, perform long division to obtain the quadratic quotient. Third, split the middle term to find the remaining linear factors.',
    hints: [
      'You cannot divide until you find the first linear factor via the Factor Theorem.',
      'Long division gives a quadratic quotient, which must then be factorised.',
      'The final step is writing out all 3 linear factors multiplied together.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_math_021_3',
    nodeId: NODE_C10_MATH_021,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'For the cubic f(x) = 2x³ + x² - 5x + 2, test the positive integer factor x = 1. What is the value of f(1)?',
    correctAnswer: 0,
    tolerance: 0.01,
    unit: '',
    explanation: 'f(1) = 2(1)³ + (1)² - 5(1) + 2 = 2 + 1 - 5 + 2 = 0. Since f(1) = 0, (x - 1) is confirmed as a factor.',
    hints: [
      'Substitute x = 1 into each term: 2(1)³ = 2, (1)² = 1, -5(1) = -5, + 2.',
      'Add: 2 + 1 - 5 + 2.',
      'The sum equals exactly 0.',
    ],
    misconceptionIndex: 0,
  },

  // ── Node 022: Matrices - Order, Row and Column ──
  {
    id: 'ch_math_022_1',
    nodeId: NODE_C10_MATH_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A sensor data matrix has 2 horizontal rows and 3 vertical columns. What is its order (dimension)?',
    options: ['3 × 2', '2 × 3', '6 × 1', '1 × 6'],
    correctIndex: 1,
    explanation: 'The order of a matrix is always stated as (number of rows) × (number of columns) — Rows first, Columns second (RC convention).',
    hints: [
      'Remember the cinema seating rule: Row first, Column second (RC).',
      'There are 2 horizontal rows and 3 vertical columns.',
      'Therefore, the order is 2 × 3.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_math_022_2',
    nodeId: NODE_C10_MATH_022,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each matrix classification to its matching mathematical representation.',
    dragItems: [
      { label: 'Row Matrix (1×3)', targetId: 'box_row' },
      { label: 'Column Matrix (3×1)', targetId: 'box_col' },
      { label: 'Square Matrix (2×2)', targetId: 'box_sq' },
      { label: 'Element a₂₁ (Row 2, Col 1)', targetId: 'box_elem' },
    ],
    correctMapping: {
      box_row: 'Row Matrix (1×3)',
      box_col: 'Column Matrix (3×1)',
      box_sq: 'Square Matrix (2×2)',
      box_elem: 'Element a₂₁ (Row 2, Col 1)',
    },
    explanation: 'A 1×n matrix is a Row matrix; an m×1 matrix is a Column matrix; an n×n matrix is Square; and a_ij denotes the entry at row i, column j.',
    hints: [
      'A single horizontal line of numbers is a Row matrix (1×3).',
      'A single vertical stack is a Column matrix (3×1).',
      'Equal rows and columns make a Square matrix.',
    ],
  },

  // ── Node 023: Compatibility for Addition & Multiplication ──
  {
    id: 'ch_math_023_1',
    nodeId: NODE_C10_MATH_023,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Can Matrix A of order 2 × 3 and Matrix B of order 3 × 2 be added together?',
    options: [
      'Yes, because both matrices contain 6 elements',
      'No, because addition requires matrices to have the exact same order (same rows and same columns)',
      'Yes, because addition is always commutative',
      'No, because matrix addition is only allowed for square matrices',
    ],
    correctIndex: 1,
    explanation: 'Matrix addition requires identical orders (m = p and n = q) so elements match position-by-position. 2×3 ≠ 3×2, so addition is undefined.',
    hints: [
      'Does having the same total count of numbers mean the shapes match?',
      'To add element-by-element, every box in grid A must have an identical box in grid B.',
      'A 2×3 grid is wide; a 3×2 grid is tall. They cannot overlay.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_023_2',
    nodeId: NODE_C10_MATH_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Matrix P has order 2 × 3 and Matrix Q has order 3 × 4. Is the product PQ defined, and what is its order?',
    options: [
      'Product undefined because inner dimensions do not match',
      'Defined, and resulting order is 2 × 4',
      'Defined, and resulting order is 3 × 3',
      'Defined, and resulting order is 4 × 2',
    ],
    correctIndex: 1,
    explanation: 'For multiplication (m × n) × (p × q), compatibility requires inner dimensions n = p (here 3 = 3). The product takes the outer dimensions m × q = 2 × 4.',
    hints: [
      'Check the inner dimensions: columns of P (3) vs rows of Q (3).',
      'Since 3 = 3, multiplication is valid.',
      'The outer dimensions (rows of P = 2, columns of Q = 4) dictate the result order: 2 × 4.',
    ],
    misconceptionIndex: 2,
  },

  // ── Node 024: Null and Identity Matrices ──
  {
    id: 'ch_math_024_1',
    nodeId: NODE_C10_MATH_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following defines the 2 × 2 multiplicative Identity Matrix I₂?',
    options: [
      '[[0, 0], [0, 0]]',
      '[[1, 1], [1, 1]]',
      '[[1, 0], [0, 1]]',
      '[[0, 1], [1, 0]]',
    ],
    correctIndex: 2,
    explanation: 'An identity matrix is a square matrix with 1s on the main (principal) diagonal and 0s in all off-diagonal positions: [[1, 0], [0, 1]].',
    hints: [
      'The identity matrix is the matrix analogue of the number 1.',
      'Main diagonal entries (a₁₁, a₂₂) must be 1.',
      'All other entries must be 0.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_math_024_2',
    nodeId: NODE_C10_MATH_024,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the 2 × 2 Null Matrix O by assembling four zero entries.',
    availableParts: ['0', '1', 'O₂', '[', ']'],
    targetState: '0 0 0 0',
    validationHint: 'A 2x2 null matrix consists of 4 zero entries.',
    explanation: 'In a null (zero) matrix O, every single element is 0: [[0, 0], [0, 0]]. Unlike identity matrices, null matrices can be of any order.',
    hints: [
      'Add four "0" entries into the construction grid.',
      'A 2×2 matrix has 4 positions, all containing 0.',
      'Select four "0" parts.',
    ],
  },

  // ── Node 025: Addition & Subtraction of 2x2 Matrices ──
  {
    id: 'ch_math_025_1',
    nodeId: NODE_C10_MATH_025,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Given A = [[3, 1], [4, 2]] and B = [[5, 7], [6, 8]], compute the (1, 2) entry of the sum matrix A + B.',
    correctAnswer: 8,
    tolerance: 0.01,
    unit: '',
    explanation: 'To add matrices, add corresponding entries. Entry (1,2) is a₁₂ + b₁₂ = 1 + 7 = 8.',
    hints: [
      'Locate row 1, column 2 in matrix A (value is 1).',
      'Locate row 1, column 2 in matrix B (value is 7).',
      'Add them together: 1 + 7 = 8.',
    ],
  },
  {
    id: 'ch_math_025_2',
    nodeId: NODE_C10_MATH_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'If A = [[3, 7], [2, 5]] and B = [[1, 4], [6, 8]], is matrix subtraction commutative (i.e. does A - B = B - A)?',
    options: [
      'Yes, subtraction is always commutative for matrices of same order',
      'No, because A - B = -(B - A); the signs of all elements flip',
      'Yes, provided both A and B are symmetric',
      'No, because matrix subtraction is not mathematically defined',
    ],
    correctIndex: 1,
    explanation: 'Matrix subtraction is NOT commutative: A - B = [[2, 3], [-4, -3]] while B - A = [[-2, -3], [4, 3]]. Notice B - A = -(A - B).',
    hints: [
      'Test the (1,1) element: 3 - 1 = 2, but 1 - 3 = -2.',
      '2 ≠ -2, so the matrices cannot be equal.',
      'Matrix addition is commutative, but matrix subtraction is non-commutative.',
    ],
  },

  // ── Node 026: Scalar Multiplication of 2x2 Matrices ──
  {
    id: 'ch_math_026_1',
    nodeId: NODE_C10_MATH_026,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'If telemetry matrix A = [[4, 7], [2, 5]] and scalar booster k = 5, what is the (1, 1) entry of kA?',
    correctAnswer: 20,
    tolerance: 0.01,
    unit: '',
    explanation: 'In scalar multiplication, every element is multiplied by k. Entry (1,1) becomes 5 × 4 = 20.',
    hints: [
      'Multiply the top-left element (4) by the scalar 5.',
      '5 × 4 = 20.',
      'Every single element in the 2×2 grid scales by 5.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_math_026_2',
    nodeId: NODE_C10_MATH_026,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which algebraic law is demonstrated by k(A + B) = kA + kB for scalar k and 2×2 matrices A, B?',
    options: [
      'Distributive property of scalar multiplication over matrix addition',
      'Commutative property of matrix multiplication',
      'Associative property of matrix subtraction',
      'Null matrix invariant property',
    ],
    correctIndex: 0,
    explanation: 'k(A + B) = kA + kB represents the Distributive Property: scaling the sum equals summing the individually scaled matrices.',
    hints: [
      'Notice the scalar k distributes to both matrix A and matrix B inside the brackets.',
      'This is called the Distributive Property.',
      'Option 1 correctly identifies this algebraic property.',
    ],
  },

  // ── Node 027: Matrix Multiplication (2x2) ──
  {
    id: 'ch_math_027_1',
    nodeId: NODE_C10_MATH_027,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For A = [[1, 2], [3, 4]] and B = [[5, 6], [7, 8]], compute element c₁₁ of the product C = AB.',
    correctAnswer: 19,
    tolerance: 0.01,
    unit: '',
    explanation: 'Row 1 of A [1, 2] dot Column 1 of B [5; 7] = (1 × 5) + (2 × 7) = 5 + 14 = 19.',
    hints: [
      'Matrix multiplication is Row × Column dot product, NOT element-wise.',
      'Take Row 1 of A: [1, 2] and Column 1 of B: [5, 7].',
      'Multiply pairs and add: 1(5) + 2(7) = 5 + 14 = 19.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_math_027_2',
    nodeId: NODE_C10_MATH_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For general 2 × 2 matrices A and B, is matrix multiplication commutative (i.e. does AB = BA)?',
    options: [
      'Always equal for all 2×2 matrices',
      'Generally NOT commutative (AB ≠ BA in general)',
      'Equal only when the determinant is negative',
      'Equal only for matrices with prime entries',
    ],
    correctIndex: 1,
    explanation: 'In general, matrix multiplication is non-commutative: AB ≠ BA. The row-column dot products yield completely different numbers when order is reversed.',
    hints: [
      'Recall our worked example: AB gave [[19, 22], [43, 50]] while BA gave [[23, 34], [31, 46]].',
      'Because row-column pairings change entirely when matrices swap positions, AB ≠ BA.',
      'Hence matrix multiplication is non-commutative in general.',
    ],
    misconceptionIndex: 5,
  },

  // ── Node 028: Arithmetic Progression - General Term ──
  {
    id: 'ch_math_028_1',
    nodeId: NODE_C10_MATH_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the formula for the nth term (Tₙ) of an AP with first term a and common difference d?',
    options: [
      'Tₙ = a + n·d',
      'Tₙ = a + (n - 1)d',
      'Tₙ = a · dⁿ⁻¹',
      'Tₙ = n/2 [2a + d]',
    ],
    correctIndex: 1,
    explanation: 'The general term is Tₙ = a + (n - 1)d. At n = 1, T₁ = a + (0)d = a.',
    hints: [
      'At position n = 1, how many common differences have been added to the start?',
      'Zero differences added at n = 1, so the multiplier of d must be (n - 1).',
      'Formula is Tₙ = a + (n - 1)d.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_math_028_2',
    nodeId: NODE_C10_MATH_028,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Thruster pulse sensor logs the AP: 3, 7, 11, 15, ... Find the 10th term (T₁₀).',
    correctAnswer: 39,
    tolerance: 0.01,
    unit: '',
    explanation: 'Here a = 3, d = 7 - 3 = 4, n = 10. T₁₀ = 3 + (10 - 1) × 4 = 3 + 9 × 4 = 3 + 36 = 39.',
    hints: [
      'Identify first term a = 3 and common difference d = 7 - 3 = 4.',
      'Use formula T₁₀ = a + 9d.',
      '3 + 9(4) = 3 + 36 = 39.',
    ],
  },
  {
    id: 'ch_math_028_3',
    nodeId: NODE_C10_MATH_028,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An AP has first term a = 1/2 and common difference d = -1/4. Which term number n equals -3?',
    correctAnswer: 15,
    tolerance: 0.01,
    unit: 'th term',
    explanation: 'Tₙ = 1/2 + (n - 1)(-1/4) = -3 => (n - 1)(-1/4) = -7/2 => n - 1 = (-7/2) × (-4) = 14 => n = 15.',
    hints: [
      'Set up equation: 1/2 + (n - 1)(-1/4) = -3.',
      'Subtract 1/2 from both sides: (n - 1)(-1/4) = -7/2.',
      'Multiply by -4: n - 1 = 14, so n = 15.',
    ],
  },

  // ── Node 029: Arithmetic Progression - Sum of First n Terms ──
  {
    id: 'ch_math_029_1',
    nodeId: NODE_C10_MATH_029,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When the first term a and last term l are known, which formula gives the sum of n terms Sₙ?',
    options: [
      'Sₙ = n(a + l)',
      'Sₙ = (n/2)(a + l)',
      'Sₙ = (n/2)(2a + l)',
      'Sₙ = (a + l) / (2n)',
    ],
    correctIndex: 1,
    explanation: 'The sum of an AP is the average of the first and last terms multiplied by the number of terms: Sₙ = (n/2)(a + l).',
    hints: [
      'Think of Gauss pairing: each pair sums to (a + l).',
      'There are n/2 such pairs.',
      'Therefore Sₙ = (n/2)(a + l).',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_math_029_2',
    nodeId: NODE_C10_MATH_029,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the sum of the first 20 terms of the AP: 1, 4, 7, 10, ...',
    correctAnswer: 590,
    tolerance: 0.01,
    unit: '',
    explanation: 'a = 1, d = 3, n = 20. S₂₀ = (20/2)[2(1) + (19)(3)] = 10[2 + 57] = 10 × 59 = 590.',
    hints: [
      'Use Sₙ = (n/2)[2a + (n - 1)d] with a = 1, d = 3, n = 20.',
      'S₂₀ = 10 × [2(1) + 19(3)] = 10 × [2 + 57].',
      '10 × 59 = 590.',
    ],
  },
  {
    id: 'ch_math_029_3',
    nodeId: NODE_C10_MATH_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The sum of first n terms of an AP with a = 2 and d = 3 is 155. Find the positive integer value of n.',
    correctAnswer: 10,
    tolerance: 0.01,
    unit: 'terms',
    explanation: 'Sₙ = (n/2)[2(2) + (n-1)3] = 155 => n(3n + 1) = 310 => 3n² + n - 310 = 0. Solving gives n = 10.',
    hints: [
      'Set 155 = (n/2)[4 + 3n - 3] = (n/2)[3n + 1].',
      'Multiply by 2: 3n² + n = 310 => 3n² + n - 310 = 0.',
      'Factorise or use quadratic formula: (3n + 31)(n - 10) = 0 => n = 10.',
    ],
  },

  // ── Node 030: Geometric Progression - General Term ──
  {
    id: 'ch_math_030_1',
    nodeId: NODE_C10_MATH_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the formula for the nth term of a Geometric Progression with first term a and common ratio r?',
    options: [
      'Tₙ = a · rⁿ',
      'Tₙ = a · rⁿ⁻¹',
      'Tₙ = (a · r)ⁿ⁻¹',
      'Tₙ = a + rⁿ⁻¹',
    ],
    correctIndex: 1,
    explanation: 'In a GP, T₁ = a · r⁰ = a, T₂ = ar¹, T₃ = ar². Thus the nth term is Tₙ = a · rⁿ⁻¹.',
    hints: [
      'For the first term n = 1, the ratio r has not multiplied yet (r⁰ = 1).',
      'The exponent of r must be (n - 1).',
      'Formula is Tₙ = a · rⁿ⁻¹.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_math_030_2',
    nodeId: NODE_C10_MATH_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A signal amplifier sequence follows GP: 1, 2, 4, 8, ... Find the 5th term (T₅).',
    correctAnswer: 16,
    tolerance: 0.01,
    unit: '',
    explanation: 'a = 1, r = 2/1 = 2, n = 5. T₅ = 1 × 2⁵⁻¹ = 1 × 2⁴ = 16.',
    hints: [
      'First term a = 1, common ratio r = 2.',
      'T₅ = 1 × 2^(5 - 1) = 2⁴.',
      '2⁴ = 16.',
    ],
  },
  {
    id: 'ch_math_030_3',
    nodeId: NODE_C10_MATH_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a GP, the 3rd term is 12 and the 6th term is 96. Find the common ratio r.',
    correctAnswer: 2,
    tolerance: 0.01,
    unit: '',
    explanation: 'T₆ / T₃ = (ar⁵) / (ar²) = r³ = 96 / 12 = 8 => r = ∛8 = 2.',
    hints: [
      'Divide T₆ by T₃: ar⁵ / ar² = r³.',
      'Calculate 96 / 12 = 8.',
      'Find the cube root of 8: r = 2.',
    ],
  },

  // ── NEP 2020 Competency-Focused Questions (Real-world / Analysis / Creativity) ──
  {
    id: 'ch_math_nep_1',
    nodeId: NODE_C10_MATH_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'ISRO engineers multiply satellite coordinate matrix Q = [[3, 2]] (3 optical, 2 radar sensors) by price/calibration vector P = [[10], [15]]. What is the total calibration cost?',
    options: ['₹50', '₹60', '₹75', '₹90'],
    correctIndex: 1,
    explanation: 'Matrix multiplication: (1×2) × (2×1) = 1×1 scalar. [3×10 + 2×15] = [30 + 30] = ₹60.',
    hints: [
      'Multiply row [3, 2] by column [10, 15].',
      'Compute (3 × 10) + (2 × 15) = 30 + 30.',
      'Total is ₹60.',
    ],
  },
  {
    id: 'ch_math_nep_2',
    nodeId: NODE_C10_MATH_028,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A satellite orbital altitude increases by 15 km during each orbital pass. If Pass 1 is at 400 km, what is altitude at Pass 20 (in km)?',
    correctAnswer: 685,
    tolerance: 0.01,
    unit: 'km',
    explanation: 'AP with a = 400 km, d = 15 km, n = 20. T₂₀ = 400 + (19 × 15) = 400 + 285 = 685 km.',
    hints: [
      'AP general term: T₂₀ = a + 19d.',
      '400 + (19 × 15) = 400 + 285.',
      'Result is 685 km.',
    ],
  },
  {
    id: 'ch_math_nep_3',
    nodeId: NODE_C10_MATH_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims that x³ - 3x² - 10x + 24 factorises to (x - 2)(x² - x - 12) and stops there. Is this factorisation complete for ICSE Class 10?',
    options: [
      'Yes, because one linear factor was extracted',
      'No, a cubic must be expressed as a product of THREE linear factors: (x - 2)(x - 4)(x + 3)',
      'Yes, quadratic factors cannot be split further',
      'No, because (x - 2) is not a valid factor',
    ],
    correctIndex: 1,
    explanation: 'The factorisation is incomplete because the quadratic quotient x² - x - 12 can be further split into (x - 4)(x + 3). Complete factorisation yields 3 linear factors.',
    hints: [
      'Can x² - x - 12 be split into two linear brackets?',
      'Yes: two numbers with product -12 and sum -1 are -4 and +3.',
      'Complete factorisation requires all linear factors.',
    ],
    misconceptionIndex: 0,
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
  nodeId: NODE_C10_MATH_021,
  title: 'Factorising Polynomials, Matrices & Progressions',
  definition: 'Comprehensive ICSE Class 10 Mathematics module covering complete cubic factorisation via the Factor Theorem & long division; matrix order, special matrices, addition/subtraction, and row-column multiplication; plus AP/GP general terms and series summations.',
  eli5: 'Think of factorisation as finding the three secret keys that unlock a cubic box. Matrices are structured data tables that transform vectors, and AP/GP are step-by-step number ladders that either climb by equal additions or blast off by multiplication!',
  misconceptions: [
    { misconception: 'After finding one factor with the Factor Theorem, the factorisation is complete.', correction: 'Finding one factor reduces the cubic to a quadratic; you must divide and then factorise that quadratic into two more linear factors.' },
    { misconception: 'Matrix order is columns × rows.', correction: 'Matrix order is always (Rows) × (Columns) — Rows first, Columns second (RC rule).' },
    { misconception: 'Matrices can be added as long as they have the same total number of elements.', correction: 'Addition requires the EXACT same order (same rows and same columns) for position-by-position matching.' },
    { misconception: 'Any matrix containing only 0s and 1s is an identity matrix.', correction: 'An identity matrix must be square with 1s exclusively on the main diagonal and 0s everywhere else.' },
    { misconception: 'Scalar multiplication only applies to the first row or diagonal.', correction: 'A scalar multiplies every single entry across all rows and columns in the matrix.' },
    { misconception: 'Matrix multiplication is done element-wise, like addition.', correction: 'Matrix multiplication uses row-by-column dot products: c_ij = sum of row i of A and column j of B.' },
    { misconception: 'AP nth term formula is T_n = a + nd.', correction: 'At n = 1, zero differences have been added; the formula is T_n = a + (n - 1)d.' },
    { misconception: 'In S_n = n/2(a + l), the letter l stands for common difference.', correction: 'The symbol l stands for the last (nth) term of the AP, l = a + (n - 1)d.' },
    { misconception: 'GP nth term formula is T_n = ar^n.', correction: 'The first term is ar^0 = a, so the nth term exponent is n - 1: T_n = ar^(n - 1).' },
  ],
  diagnosticQuestions: [
    { question: 'If f(2) = 0 for cubic f(x), what is a factor?', options: ['(x + 2)', '(x - 2)', '2x', 'x / 2'], correctIndex: 1 },
    { question: 'What is the order of a matrix with 3 rows and 2 columns?', options: ['3 × 2', '2 × 3', '6 × 1', '1 × 6'], correctIndex: 0 },
    { question: 'Which pair can be added together?', options: ['2×3 and 3×2', '2×2 and 2×2', '1×3 and 3×1', '2×3 and 2×4'], correctIndex: 1 },
    { question: 'What are the main diagonal elements of I₂?', options: ['0, 0', '1, 1', '1, 0', '0, 1'], correctIndex: 1 },
    { question: 'If A = [[2, 4], [1, 3]], what is 3A?', options: ['[[6, 12], [3, 9]]', '[[6, 4], [1, 3]]', '[[5, 7], [4, 6]]', '[[6, 12], [1, 3]]'], correctIndex: 0 },
    { question: 'For AP 2, 5, 8, 11... what is the common difference d?', options: ['2', '3', '5', '8'], correctIndex: 1 },
    { question: 'For AP with a = 5, d = 2, what is T₁₀?', options: ['23', '25', '20', '21'], correctIndex: 0 },
    { question: 'For GP with a = 3, r = 2, what is T₄?', options: ['24', '48', '12', '18'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master complete cubic factorisation, all 2x2 matrix operations and compatibility rules, plus AP and GP term and series formulations.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE — LEARN BY INTERACTING) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Cubic Polynomial Factorisation Lab',
    instruction: 'Drag root sliders α, β, γ to inspect how linear factors (x - α)(x - β)(x - γ) sculpt the curve f(x) and its x-axis intercepts in real-time.',
    interactionType: 'slider-roots',
    nodeId: NODE_C10_MATH_021,
  },
  {
    title: '2. Matrix Order & Dimension Matcher',
    instruction: 'Adjust the row/column dimensions of Matrix A and Matrix B to discover the exact condition needed for multiplication compatibility.',
    interactionType: 'matrix-dimension',
    nodeId: NODE_C10_MATH_023,
  },
  {
    title: '3. Matrix 2×2 Multiplication Dot-Product Visualizer',
    instruction: 'Click each cell in the result matrix to watch the laser beam row-by-column dot product (Row A · Col B) calculate live.',
    interactionType: 'matrix-mult',
    nodeId: NODE_C10_MATH_027,
  },
  {
    title: '4. AP Gauss Staircase & Summation Builder',
    instruction: 'Move the term slider n and step d to watch Gauss inverted pairing visually double into a perfect rectangular area.',
    interactionType: 'ap-sum',
    nodeId: NODE_C10_MATH_029,
  },
  {
    title: '5. GP Exponential Growth Blast-Off',
    instruction: 'Adjust the common ratio r slider to compare linear AP growth against explosive exponential GP multiplying power.',
    interactionType: 'gp-growth',
    nodeId: NODE_C10_MATH_030,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Flight Simulation Mission Log',
  description: 'Apply your mathematical tools to calculate a 3-stage orbital rocket burn: (1) Cubic fuel-drain polynomial roots, (2) Attitude transformation matrix, (3) Stepped AP vernier thruster bursts.',
  steps: [
    'Factorise the fuel polynomial f(t) = t³ - 9t² + 26t - 24 to find the 3 stage separation times (t = 2s, 3s, 4s).',
    'Calculate the 2×2 attitude correction matrix 2A + I₂ to reorient solar arrays.',
    'Schedule 10 vernier thruster burns with a = 5 ms and d = 3 ms, and calculate total burn time using S₁₀.',
  ],
};

// ─── COMPONENT IMPLEMENTATION ───
function C10_MathematicsFactorisingPolynomialCompletelySim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_MATH_021,
  title = DEFAULT_PROPS.title || 'Factorising Polynomials, Matrices & Progressions',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── RICH STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation Interactive State
  const [activePredictionIdx, setActivePredictionIdx] = useState<number | null>(null);
  const [predictionAnswered, setPredictionAnswered] = useState<Record<number, number>>({});
  const [activeObservationIdx, setActiveObservationIdx] = useState<number | null>(null);
  const [observationAnswered, setObservationAnswered] = useState<Record<number, number>>({});

  // Exploration Interactive Variables
  const [root1, setRoot1] = useState(1);
  const [root2, setRoot2] = useState(2);
  const [root3, setRoot3] = useState(3);
  const [testEvalX, setTestEvalX] = useState(1);

  // Matrix Interactive Variables
  const [matARows, setMatARows] = useState(2);
  const [matACols, setMatACols] = useState(2);
  const [matBRows, setMatBRows] = useState(2);
  const [matBCols, setMatBCols] = useState(2);
  const [matA, setMatA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [matB, setMatB] = useState<number[][]>([[5, 6], [7, 8]]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>({ r: 0, c: 0 });
  const [scalarK, setScalarK] = useState(2);

  // Progression Interactive Variables
  const [apA, setApA] = useState(2);
  const [apD, setApD] = useState(3);
  const [apN, setApN] = useState(6);
  const [gpA, setGpA] = useState(1);
  const [gpR, setGpR] = useState(2);
  const [gpN, setGpN] = useState(5);

  // Adaptive Difficulty & SRS
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Drag-and-drop & Non-MCQ states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EXPANDED POLYNOMIAL COMPUTATIONS ───
  const polyCoeffs = useMemo(() => {
    const a = 1;
    const b = -(root1 + root2 + root3);
    const c = root1 * root2 + root2 * root3 + root3 * root1;
    const d = -(root1 * root2 * root3);
    return { a, b, c, d };
  }, [root1, root2, root3]);

  const evaluatedVal = useMemo(() => {
    const x = testEvalX;
    return x * x * x + polyCoeffs.b * x * x + polyCoeffs.c * x + polyCoeffs.d;
  }, [testEvalX, polyCoeffs]);

  // ─── MATRIX PRODUCT COMPUTATIONS ───
  const matProduct = useMemo(() => {
    if (matACols !== matBRows) return null;
    const result: number[][] = [];
    for (let i = 0; i < matARows; i++) {
      result[i] = [];
      for (let j = 0; j < matBCols; j++) {
        let sum = 0;
        for (let k = 0; k < matACols; k++) {
          sum += (matA[i]?.[k] ?? 0) * (matB[k]?.[j] ?? 0);
        }
        result[i][j] = sum;
      }
    }
    return result;
  }, [matA, matB, matARows, matACols, matBRows, matBCols]);

  // ─── AP & GP TERMS COMPUTATIONS ───
  const apTerms = useMemo(() => {
    const terms: number[] = [];
    for (let i = 1; i <= apN; i++) {
      terms.push(apA + (i - 1) * apD);
    }
    return terms;
  }, [apA, apD, apN]);

  const apSum = useMemo(() => {
    return (apN / 2) * (2 * apA + (apN - 1) * apD);
  }, [apA, apD, apN]);

  const gpTerms = useMemo(() => {
    const terms: number[] = [];
    for (let i = 1; i <= gpN; i++) {
      terms.push(gpA * Math.pow(gpR, i - 1));
    }
    return terms;
  }, [gpA, gpR, gpN]);

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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding prediction! Let us explore the mechanics.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratory. Manipulate the parameters to discover mathematical relationships.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enjoy free exploration in the telemetry sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing flight telemetry calibration challenges. Solve each problem carefully.');
  }, []);

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
      const arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
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
    speechManager.speak('Simulation complete! You have demonstrated exceptional mathematical problem-solving.');
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
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding work.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ score: 100, date: Date.now() }));
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
        speechManager.speak('Let us study the complete step-by-step solution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleMatrixCellChange = useCallback((matrix: 'A' | 'B', r: number, c: number, val: number) => {
    if (matrix === 'A') {
      setMatA(prev => {
        const next = prev.map(row => [...row]);
        if (!next[r]) next[r] = [];
        next[r][c] = val;
        return next;
      });
    } else {
      setMatB(prev => {
        const next = prev.map(row => [...row]);
        if (!next[r]) next[r] = [];
        next[r][c] = val;
        return next;
      });
    }
    audioManager.play('count');
  }, []);

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
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => (prev !== newDifficulty ? newDifficulty : prev));
  }, [scoreBreakdown]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // 2D Canvas Animated Background Grid Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;

      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.sin(x * 0.03 + t) * 8 + Math.cos(x * 0.015 - t) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── SVG GRAPHING HELPER FOR CUBIC CURVE ───
  const graphWidth = 400;
  const graphHeight = 220;
  const originX = 200;
  const originY = 110;
  const scaleX = 30;
  const scaleY = 8;

  const cubicPath = useMemo(() => {
    let d = '';
    for (let px = 0; px <= graphWidth; px += 2) {
      const mathX = (px - originX) / scaleX;
      const mathY = (mathX - root1) * (mathX - root2) * (mathX - root3);
      const py = originY - mathY * scaleY;
      const clampedPy = Math.max(-20, Math.min(graphHeight + 20, py));
      if (px === 0) d += `M ${px} ${clampedPy}`;
      else d += ` L ${px} ${clampedPy}`;
    }
    return d;
  }, [root1, root2, root3]);

  // Motivational Feedback Message
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // Spaced Repetition Recommendation
  const srsRecommendation = useMemo(() => {
    if (errors === 0) return 'Review in 7 days';
    if (errors >= 1 && errors <= 3) return 'Review in 3 days';
    return 'Review in 1 day';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-indigo-900/40 relative overflow-hidden font-sans">
      {/* Background Decorative Canvas */}
      <canvas ref={canvasRef} width={600} height={100} className="absolute top-0 right-0 opacity-40 pointer-events-none" />

      {/* Header Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-6 flex flex-wrap items-center justify-between border-b border-slate-800/80 pb-4 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/40">
                ICSE Class 10 Math
              </span>
              <span className="text-xs font-mono text-slate-400">ISRO Mission Telemetry</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              {title}
            </h1>
          </div>
        </div>

        {/* Navigation Phase Pill */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'discovery') setPhase('discovery');
                if (p === 'explore') setPhase('explore');
                if (p === 'sandbox') setPhase('sandbox');
                if (p === 'challenge') setPhase('challenge');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Scenario Card */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/40 rounded-2xl border border-indigo-700/40 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2">
                <span className="animate-pulse">🛰️</span> Mission Objective
              </div>
              <h2 className="text-xl font-bold text-indigo-200">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-indigo-900/60 text-xs text-indigo-300">
                ⚡ <strong>Telemetry Context:</strong> {SCENARIO.context}
              </div>
            </motion.div>

            {/* Curiosity Hook Interaction */}
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-amber-900/60 text-amber-300 border border-amber-700/50">
                  Curiosity Check
                </span>
                <h3 className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-indigo-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs text-indigo-300 font-bold shrink-0">
                        {discoveryAnswered ? (idx === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗') : String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className="text-sm text-indigo-200 leading-relaxed">
                    {discoveryCorrect
                      ? '✓ 🎯 Spot on! Linear factors produce distinct x-intercepts where output vanishes.'
                      : '💡 ' + DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    aria-label="Enter Interactive Laboratory"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 shrink-0"
                  >
                    Enter Interactive Lab →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Exploration Slide Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Exploration Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h2>
              </div>
              <p className="text-xs text-amber-300/90 max-w-md bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-800/50">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>
            </div>

            {/* Prediction Challenge Banner (Predict-Then-Check Pattern) */}
            {currentSlide < PREDICTION_QUESTIONS.length && (
              <div className="p-4 bg-indigo-950/60 rounded-2xl border border-indigo-600/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <span>🔮 Prediction Question ({currentSlide + 1} of {PREDICTION_QUESTIONS.length})</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Predict before interacting</span>
                </div>
                <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[currentSlide].question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PREDICTION_QUESTIONS[currentSlide].options.map((opt, oIdx) => {
                    const isAnswered = predictionAnswered[currentSlide] !== undefined;
                    const isSelected = predictionAnswered[currentSlide] === oIdx;
                    const isCorrect = oIdx === PREDICTION_QUESTIONS[currentSlide].correctIndex;
                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswered}
                        onClick={() => {
                          setPredictionAnswered(prev => ({ ...prev, [currentSlide]: oIdx }));
                          audioManager.play(isCorrect ? 'success' : 'pop');
                        }}
                        className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          isAnswered
                            ? isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : isSelected
                              ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                              : 'bg-slate-900/60 border-slate-800 text-slate-500'
                            : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    );
                  })}
                </div>
                {predictionAnswered[currentSlide] !== undefined && (
                  <div className="text-xs text-indigo-200 bg-indigo-900/40 p-2.5 rounded-lg border border-indigo-800/60">
                    <strong>Check instruction:</strong> {PREDICTION_QUESTIONS[currentSlide].verifyInstruction}
                  </div>
                )}
              </div>
            )}

            {/* Interactive Lab Visual Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-6"
              >
                {/* ���─ STEP 1: CUBIC POLYNOMIAL LAB (TOPIC SVG 1) ── */}
                {currentSlide === 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Interactive Curve SVG Graph */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono text-slate-400">SVG 1: Real-time Polynomial Graph f(x)</span>
                        <span className="text-xs font-mono text-indigo-400">Scale: 1 unit = {scaleX}px</span>
                      </div>

                      <svg
                        role="img"
                        aria-label="Cubic polynomial graph showing roots and curve"
                        viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                        className="w-full h-auto bg-slate-950 rounded-xl"
                      >
                        <line x1={0} y1={originY} x2={graphWidth} y2={originY} stroke="#334155" strokeWidth="2" />
                        <line x1={originX} y1={0} x2={originX} y2={graphHeight} stroke="#334155" strokeWidth="2" />
                        <text x={graphWidth - 15} y={originY - 6} fill="#64748b" fontSize="10">x</text>
                        <text x={originX + 6} y={15} fill="#64748b" fontSize="10">f(x)</text>

                        {[-4, -3, -2, -1, 1, 2, 3, 4].map(t => (
                          <g key={t}>
                            <line x1={originX + t * scaleX} y1={originY - 4} x2={originX + t * scaleX} y2={originY + 4} stroke="#475569" strokeWidth="1.5" />
                            <text x={originX + t * scaleX} y={originY + 14} textAnchor="middle" fill="#64748b" fontSize="8">{t}</text>
                          </g>
                        ))}

                        <path d={cubicPath} fill="none" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />

                        {[
                          { r: root1, col: '#22c55e', label: 'α' },
                          { r: root2, col: '#38bdf8', label: 'β' },
                          { r: root3, col: '#f43f5e', label: 'γ' },
                        ].map((root, i) => (
                          <g key={i}>
                            <circle
                              cx={originX + root.r * scaleX}
                              cy={originY}
                              r="6"
                              fill={root.col}
                              stroke="#0f172a"
                              strokeWidth="2"
                              className="animate-pulse"
                            />
                            <text
                              x={originX + root.r * scaleX}
                              y={originY - 10}
                              textAnchor="middle"
                              fill={root.col}
                              fontSize="11"
                              fontWeight="bold"
                            >
                              {root.label}={root.r}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>

                    {/* Controls & Math Representation */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-4 bg-slate-950/80 rounded-xl border border-indigo-900/60 space-y-2">
                        <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Factored Form</div>
                        <div className="text-base font-mono text-emerald-400 font-bold">
                          f(x) = (x - {root1})(x - {root2})(x - {root3})
                        </div>
                        <div className="text-xs text-slate-400 pt-1 border-t border-slate-800">Expanded Form:</div>
                        <div className="text-sm font-mono text-purple-300">
                          x³ {polyCoeffs.b >= 0 ? `+ ${polyCoeffs.b}` : `- ${Math.abs(polyCoeffs.b)}`}x² {polyCoeffs.c >= 0 ? `+ ${polyCoeffs.c}` : `- ${Math.abs(polyCoeffs.c)}`}x {polyCoeffs.d >= 0 ? `+ ${polyCoeffs.d}` : `- ${Math.abs(polyCoeffs.d)}`}
                        </div>
                      </div>

                      {/* Root Sliders */}
                      <div className="space-y-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Root α (Linear factor: x - {root1}):</span>
                            <span className="text-emerald-400 font-bold">{root1}</span>
                          </div>
                          <input
                            aria-label="Root alpha slider"
                            type="range"
                            min={-3}
                            max={3}
                            step={1}
                            value={root1}
                            onChange={(e) => {
                              setRoot1(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Root β (Linear factor: x - {root2}):</span>
                            <span className="text-sky-400 font-bold">{root2}</span>
                          </div>
                          <input
                            aria-label="Root beta slider"
                            type="range"
                            min={-3}
                            max={3}
                            step={1}
                            value={root2}
                            onChange={(e) => {
                              setRoot2(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-sky-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Root γ (Linear factor: x - {root3}):</span>
                            <span className="text-rose-400 font-bold">{root3}</span>
                          </div>
                          <input
                            aria-label="Root gamma slider"
                            type="range"
                            min={-3}
                            max={3}
                            step={1}
                            value={root3}
                            onChange={(e) => {
                              setRoot3(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-rose-500 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Substitution Probe */}
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div className="text-xs text-slate-300">
                          Probe f(x) at x =
                          <select
                            aria-label="Probe f(x) at x value"
                            value={testEvalX}
                            onChange={(e) => {
                              setTestEvalX(Number(e.target.value));
                              audioManager.play('tap');
                            }}
                            className="ml-2 bg-slate-800 text-white rounded px-2 py-0.5 text-xs font-mono border border-slate-700"
                          >
                            {[-3, -2, -1, 0, 1, 2, 3, 4].map(v => (
                              <option key={v} value={v}>x = {v}</option>
                            ))}
                          </select>
                        </div>
                        <div className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                          evaluatedVal === 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-slate-800 text-amber-300'
                        }`}>
                          f({testEvalX}) = {evaluatedVal} {evaluatedVal === 0 ? '✓ (Root!)' : '✗'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: MATRIX COMPATIBILITY LAB ── */}
                {currentSlide === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Matrix A Dimensions */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/60 space-y-3">
                        <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                          <span>Matrix A Order:</span>
                          <span className="text-base font-mono text-emerald-400">{matARows} × {matACols}</span>
                        </h4>
                        <div className="flex gap-4">
                          <label className="text-xs text-slate-400">
                            Rows (m):
                            <input
                              aria-label="Matrix A rows"
                              type="number"
                              min={1}
                              max={3}
                              value={matARows}
                              onChange={(e) => setMatARows(Math.max(1, Math.min(3, Number(e.target.value))))}
                              className="ml-2 w-14 bg-slate-800 px-2 py-1 rounded text-white font-mono"
                            />
                          </label>
                          <label className="text-xs text-slate-400">
                            Cols (n):
                            <input
                              aria-label="Matrix A columns"
                              type="number"
                              min={1}
                              max={3}
                              value={matACols}
                              onChange={(e) => setMatACols(Math.max(1, Math.min(3, Number(e.target.value))))}
                              className="ml-2 w-14 bg-slate-800 px-2 py-1 rounded text-white font-mono"
                            />
                          </label>
                        </div>
                        {/* Visual Matrix Grid Representation */}
                        <div className="pt-2 flex justify-center">
                          <div
                            className="inline-grid gap-1.5 p-3 bg-slate-900 rounded-lg border-2 border-emerald-500/50"
                            style={{ gridTemplateColumns: `repeat(${matACols}, minmax(0, 1fr))` }}
                          >
                            {Array.from({ length: matARows * matACols }).map((_, i) => (
                              <div key={i} className="w-10 h-8 bg-emerald-950/80 border border-emerald-700/60 rounded flex items-center justify-center text-xs font-mono text-emerald-300">
                                a{Math.floor(i / matACols) + 1}{i % matACols + 1}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Matrix B Dimensions */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/60 space-y-3">
                        <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                          <span>Matrix B Order:</span>
                          <span className="text-base font-mono text-sky-400">{matBRows} × {matBCols}</span>
                        </h4>
                        <div className="flex gap-4">
                          <label className="text-xs text-slate-400">
                            Rows (p):
                            <input
                              aria-label="Matrix B rows"
                              type="number"
                              min={1}
                              max={3}
                              value={matBRows}
                              onChange={(e) => setMatBRows(Math.max(1, Math.min(3, Number(e.target.value))))}
                              className="ml-2 w-14 bg-slate-800 px-2 py-1 rounded text-white font-mono"
                            />
                          </label>
                          <label className="text-xs text-slate-400">
                            Cols (q):
                            <input
                              aria-label="Matrix B columns"
                              type="number"
                              min={1}
                              max={3}
                              value={matBCols}
                              onChange={(e) => setMatBCols(Math.max(1, Math.min(3, Number(e.target.value))))}
                              className="ml-2 w-14 bg-slate-800 px-2 py-1 rounded text-white font-mono"
                            />
                          </label>
                        </div>
                        {/* Visual Matrix Grid Representation */}
                        <div className="pt-2 flex justify-center">
                          <div
                            className="inline-grid gap-1.5 p-3 bg-slate-900 rounded-lg border-2 border-sky-500/50"
                            style={{ gridTemplateColumns: `repeat(${matBCols}, minmax(0, 1fr))` }}
                          >
                            {Array.from({ length: matBRows * matBCols }).map((_, i) => (
                              <div key={i} className="w-10 h-8 bg-sky-950/80 border border-sky-700/60 rounded flex items-center justify-center text-xs font-mono text-sky-300">
                                b{Math.floor(i / matBCols) + 1}{i % matBCols + 1}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Compatibility Live Status Banner */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Addition Status */}
                      <div className={`p-3 rounded-xl border flex items-center justify-between ${
                        matARows === matBRows && matACols === matBCols
                          ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                          : 'bg-rose-950/40 border-rose-800 text-rose-300'
                      }`}>
                        <div>
                          <div className="text-xs font-bold uppercase">Addition (A + B)</div>
                          <div className="text-xs mt-0.5">
                            {matARows === matBRows && matACols === matBCols
                              ? `✓ Compatible! Result is ${matARows} × ${matACols}`
                              : `✗ Incompatible (${matARows}×${matACols} ≠ ${matBRows}×${matBCols})`}
                          </div>
                        </div>
                        <span className="text-xl font-bold">{matARows === matBRows && matACols === matBCols ? '✓' : '✗'}</span>
                      </div>

                      {/* Multiplication Status */}
                      <div className={`p-3 rounded-xl border flex items-center justify-between ${
                        matACols === matBRows
                          ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                          : 'bg-rose-950/40 border-rose-800 text-rose-300'
                      }`}>
                        <div>
                          <div className="text-xs font-bold uppercase">Multiplication (A × B)</div>
                          <div className="text-xs mt-0.5">
                            {matACols === matBRows
                              ? `✓ Compatible! Inner dimensions match (${matACols} = ${matBRows}). Result is ${matARows} × ${matBCols}`
                              : `✗ Incompatible (Cols of A: ${matACols} ≠ Rows of B: ${matBRows})`}
                          </div>
                        </div>
                        <span className="text-xl font-bold">{matACols === matBRows ? '✓' : '✗'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: MATRIX 2x2 MULTIPLICATION LAB (TOPIC SVG 2) ── */}
                {currentSlide === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      {/* Matrix A */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/60">
                        <div className="text-xs font-bold text-emerald-400 mb-2">Matrix A (2×2)</div>
                        <div className="grid grid-cols-2 gap-2">
                          {[0, 1].map(r =>
                            [0, 1].map(c => (
                              <input
                                key={`a_${r}_${c}`}
                                aria-label={`Matrix A element row ${r + 1} column ${c + 1}`}
                                type="number"
                                value={matA[r]?.[c] ?? 0}
                                onChange={(e) => handleMatrixCellChange('A', r, c, Number(e.target.value))}
                                className={`w-full text-center py-2 bg-slate-900 font-mono font-bold rounded-lg border text-sm ${
                                  selectedCell?.r === r ? 'border-emerald-400 bg-emerald-950/50 text-emerald-200' : 'border-slate-700 text-white'
                                }`}
                              />
                            ))
                          )}
                        </div>
                      </div>

                      {/* Matrix B */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/60">
                        <div className="text-xs font-bold text-sky-400 mb-2">Matrix B (2×2)</div>
                        <div className="grid grid-cols-2 gap-2">
                          {[0, 1].map(r =>
                            [0, 1].map(c => (
                              <input
                                key={`b_${r}_${c}`}
                                aria-label={`Matrix B element row ${r + 1} column ${c + 1}`}
                                type="number"
                                value={matB[r]?.[c] ?? 0}
                                onChange={(e) => handleMatrixCellChange('B', r, c, Number(e.target.value))}
                                className={`w-full text-center py-2 bg-slate-900 font-mono font-bold rounded-lg border text-sm ${
                                  selectedCell?.c === c ? 'border-sky-400 bg-sky-950/50 text-sky-200' : 'border-slate-700 text-white'
                                }`}
                              />
                            ))
                          )}
                        </div>
                      </div>

                      {/* Matrix C = AB */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-purple-900/60">
                        <div className="text-xs font-bold text-purple-300 mb-2">Product C = AB (Click cell)</div>
                        <div className="grid grid-cols-2 gap-2">
                          {[0, 1].map(r =>
                            [0, 1].map(c => (
                              <motion.button
                                key={`c_${r}_${c}`}
                                aria-label={`Result matrix cell row ${r + 1} column ${c + 1}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setSelectedCell({ r, c });
                                  audioManager.play('tap');
                                }}
                                className={`w-full text-center py-2 font-mono font-extrabold rounded-lg border text-sm ${
                                  selectedCell?.r === r && selectedCell?.c === c
                                    ? 'bg-purple-900 border-purple-400 text-white shadow-lg shadow-purple-950'
                                    : 'bg-slate-900 border-slate-700 text-purple-200 hover:border-purple-600'
                                }`}
                              >
                                {matProduct ? matProduct[r]?.[c] : '?'}
                              </motion.button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SVG 2: Matrix Row × Column Dot Product Laser Visualizer */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/60">
                      <div className="text-xs font-mono text-slate-400 mb-2">SVG 2: Row-by-Column Dot Product Laser Map</div>
                      <svg
                        role="img"
                        aria-label="Laser beam representation of row times column dot product"
                        viewBox="0 0 500 110"
                        className="w-full h-auto bg-slate-900 rounded-lg p-2"
                      >
                        {/* Matrix A representation */}
                        <rect x="20" y="15" width="100" height="80" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
                        <text x="70" y="35" fill="#22c55e" fontSize="11" fontWeight="bold" textAnchor="middle">Row {selectedCell?.r ? selectedCell.r + 1 : 1} of A</text>
                        <text x="70" y="65" fill="#ffffff" fontSize="13" fontFamily="monospace" textAnchor="middle">
                          [{matA[selectedCell?.r || 0]?.[0]}, {matA[selectedCell?.r || 0]?.[1]}]
                        </text>

                        {/* Dot Product Symbol */}
                        <circle cx="160" cy="55" r="14" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="160" y="60" fill="#a5b4fc" fontSize="16" fontWeight="bold" textAnchor="middle">·</text>

                        {/* Matrix B representation */}
                        <rect x="200" y="15" width="100" height="80" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="250" y="35" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Col {selectedCell?.c ? selectedCell.c + 1 : 1} of B</text>
                        <text x="250" y="65" fill="#ffffff" fontSize="13" fontFamily="monospace" textAnchor="middle">
                          [{matB[0]?.[selectedCell?.c || 0]}; {matB[1]?.[selectedCell?.c || 0]}]
                        </text>

                        {/* Laser Arrow */}
                        <path d="M 315 55 L 355 55" stroke="#c084fc" strokeWidth="3" markerEnd="url(#arrow)" strokeDasharray="4 2" />

                        {/* Target Cell result */}
                        <rect x="370" y="15" width="110" height="80" rx="8" fill="#3b0764" stroke="#d8b4fe" strokeWidth="2" />
                        <text x="425" y="35" fill="#d8b4fe" fontSize="11" fontWeight="bold" textAnchor="middle">Entry C{selectedCell ? `${selectedCell.r + 1}${selectedCell.c + 1}` : '11'}</text>
                        <text x="425" y="68" fill="#fde047" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          {matProduct && selectedCell ? matProduct[selectedCell.r][selectedCell.c] : 0}
                        </text>
                      </svg>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: AP GAUSS SUMMATION LAB (TOPIC SVG 3) ── */}
                {currentSlide === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="text-xs text-slate-400 font-bold block mb-1">First Term (a): {apA}</label>
                        <input
                          aria-label="AP first term slider"
                          type="range"
                          min={1}
                          max={10}
                          value={apA}
                          onChange={(e) => setApA(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="text-xs text-slate-400 font-bold block mb-1">Common Difference (d): {apD}</label>
                        <input
                          aria-label="AP common difference slider"
                          type="range"
                          min={1}
                          max={8}
                          value={apD}
                          onChange={(e) => setApD(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="text-xs text-slate-400 font-bold block mb-1">Number of Terms (n): {apN}</label>
                        <input
                          aria-label="AP number of terms slider"
                          type="range"
                          min={2}
                          max={8}
                          value={apN}
                          onChange={(e) => setApN(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* SVG 3: Gauss Staircase & Geometric Area Model */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="text-xs font-mono text-slate-400">
                        SVG 3: Gauss Staircase Inverted Pairing Model [2·Sₙ = n(a + l)]
                      </div>

                      <svg
                        role="img"
                        aria-label="Geometric visualizer of arithmetic progression staircase pairing"
                        viewBox="0 0 500 140"
                        className="w-full h-auto bg-slate-900 rounded-xl p-2"
                      >
                        {apTerms.map((term, i) => {
                          const colW = 460 / apN - 6;
                          const xPos = 20 + i * (colW + 6);
                          const maxH = 90;
                          const largestTerm = apTerms[apTerms.length - 1];
                          const hForward = Math.max(15, (term / (largestTerm + apA)) * maxH);
                          const revTerm = apTerms[apTerms.length - 1 - i];
                          const hRev = Math.max(15, (revTerm / (largestTerm + apA)) * maxH);

                          return (
                            <g key={i}>
                              {/* Forward AP Bar */}
                              <rect
                                x={xPos}
                                y={120 - hForward}
                                width={colW}
                                height={hForward}
                                rx="3"
                                fill="#22c55e"
                                opacity="0.8"
                              />
                              <text x={xPos + colW / 2} y={115} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">{term}</text>

                              {/* Inverted Companion Bar (Gauss Pair) */}
                              <rect
                                x={xPos}
                                y={120 - hForward - hRev}
                                width={colW}
                                height={hRev}
                                rx="3"
                                fill="#38bdf8"
                                opacity="0.8"
                              />
                              <text x={xPos + colW / 2} y={130 - hForward - hRev} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">{revTerm}</text>
                            </g>
                          );
                        })}

                        {/* Top Line indicating Constant Height (a + l) */}
                        <line x1="15" y1="20" x2="485" y2="20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                        <text x="250" y="15" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                          Constant Height a + l = {apA + apTerms[apTerms.length - 1]}
                        </text>
                      </svg>

                      <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <div>
                          <span>Pair Sum = a + l = {apA} + {apTerms[apTerms.length - 1]} = </span>
                          <span className="text-amber-300 font-bold">{apA + apTerms[apTerms.length - 1]}</span>
                        </div>
                        <div>
                          <span>Total Sum S_{apN} = ({apN}/2) × {apA + apTerms[apTerms.length - 1]} = </span>
                          <span className="text-emerald-400 font-bold text-sm">{apSum}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 5: GP EXPONENTIAL BLAST-OFF LAB (TOPIC SVG 4) ── */}
                {currentSlide === 4 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="text-xs text-slate-400 font-bold block mb-1">First Term (a): {gpA}</label>
                        <input
                          aria-label="GP first term slider"
                          type="range"
                          min={1}
                          max={5}
                          value={gpA}
                          onChange={(e) => setGpA(Number(e.target.value))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="text-xs text-slate-400 font-bold block mb-1">Common Ratio (r): {gpR}</label>
                        <input
                          aria-label="GP common ratio slider"
                          type="range"
                          min={2}
                          max={4}
                          value={gpR}
                          onChange={(e) => setGpR(Number(e.target.value))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="text-xs text-slate-400 font-bold block mb-1">Terms (n): {gpN}</label>
                        <input
                          aria-label="GP number of terms slider"
                          type="range"
                          min={2}
                          max={6}
                          value={gpN}
                          onChange={(e) => setGpN(Number(e.target.value))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* SVG 4: GP Geometric Growth Curve */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="text-xs font-mono text-slate-400">
                        SVG 4: Geometric Progression Blast-Off Curve Tₙ = a · rⁿ⁻¹
                      </div>

                      <svg
                        role="img"
                        aria-label="Exponential growth curve for geometric progression"
                        viewBox="0 0 500 150"
                        className="w-full h-auto bg-slate-900 rounded-xl p-2"
                      >
                        <line x1="40" y1="130" x2="480" y2="130" stroke="#475569" strokeWidth="2" />
                        <line x1="40" y1="20" x2="40" y2="130" stroke="#475569" strokeWidth="2" />

                        {gpTerms.map((term, idx) => {
                          const maxVal = gpTerms[gpTerms.length - 1];
                          const x = 50 + idx * (420 / (gpN - 1 || 1));
                          const y = 130 - (term / maxVal) * 100;
                          return (
                            <g key={idx}>
                              <circle cx={x} cy={y} r="5" fill="#c084fc" stroke="#581c87" strokeWidth="2" />
                              <text x={x} y={y - 8} fill="#e9d5ff" fontSize="10" fontWeight="bold" textAnchor="middle">
                                {term}
                              </text>
                              <text x={x} y={142} fill="#94a3b8" fontSize="9" textAnchor="middle">
                                T{idx + 1}
                              </text>
                            </g>
                          );
                        })}

                        {/* Connecting exponential curve path */}
                        <path
                          d={gpTerms.map((term, idx) => {
                            const maxVal = gpTerms[gpTerms.length - 1];
                            const x = 50 + idx * (420 / (gpN - 1 || 1));
                            const y = 130 - (term / maxVal) * 100;
                            return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="2.5"
                          strokeDasharray="2 2"
                        />
                      </svg>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-center text-slate-300">
                        Formula check for term 5: T₅ = {gpA} · ({gpR})⁴ = {gpA * Math.pow(gpR, 4)}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Observation Check Banner (What do you notice? Pattern) */}
            {currentSlide < OBSERVATION_QUESTIONS.length && (
              <div className="p-4 bg-purple-950/40 rounded-2xl border border-purple-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                    <span>🔍 Observation Check ({currentSlide + 1} of {OBSERVATION_QUESTIONS.length})</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">What do you notice?</span>
                </div>
                <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[currentSlide].question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {OBSERVATION_QUESTIONS[currentSlide].observableOptions.map((opt, oIdx) => {
                    const isAnswered = observationAnswered[currentSlide] !== undefined;
                    const isSelected = observationAnswered[currentSlide] === oIdx;
                    const isCorrect = oIdx === OBSERVATION_QUESTIONS[currentSlide].correctIndex;
                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswered}
                        onClick={() => {
                          setObservationAnswered(prev => ({ ...prev, [currentSlide]: oIdx }));
                          audioManager.play(isCorrect ? 'success' : 'pop');
                        }}
                        className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          isAnswered
                            ? isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : isSelected
                              ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                              : 'bg-slate-900/60 border-slate-800 text-slate-500'
                            : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    );
                  })}
                </div>
                {observationAnswered[currentSlide] !== undefined && (
                  <div className="text-xs text-purple-200 bg-purple-900/40 p-2.5 rounded-lg border border-purple-800/60">
                    <strong>Explanation:</strong> {OBSERVATION_QUESTIONS[currentSlide].explanation}
                  </div>
                )}
              </div>
            )}

            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                aria-label="Previous interactive tool"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                ← Previous Tool
              </motion.button>

              <div className="flex gap-1.5">
                {EXPLORATION_STEPS.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Jump to Exploration step ${i + 1}`}
                    onClick={() => {
                      setCurrentSlide(i);
                      audioManager.play('tap');
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentSlide === i ? 'w-6 bg-indigo-500' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Next interactive tool"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/30 transition-all"
                >
                  Next Tool →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Open sandbox mode"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all"
                >
                  Open Sandbox Mode 🛠️
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Free Exploration Sandbox</span>
                <h3 className="text-lg font-bold text-white mt-0.5">ISRO Telemetry Playground</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Freely tweak cubic roots, 2×2 matrices, or sequences without grading. Test ideas before challenges!
                </p>
              </div>

              <motion.button
                aria-label="Ready for challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-green-600/30 shrink-0"
              >
                Ready for Graded Challenges! 🚀
              </motion.button>
            </div>

            {/* Multi-Sandbox Tabs */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mini Cubic Sandbox */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-indigo-300 uppercase">1. Polynomial Factorisation Tool</div>
                  <div className="flex gap-2">
                    {[-2, -1, 1, 2, 3].map(v => (
                      <button
                        key={v}
                        aria-label={`Set root alpha to ${v}`}
                        onClick={() => {
                          setRoot1(v);
                          audioManager.play('tap');
                        }}
                        className={`px-2.5 py-1 text-xs font-mono rounded-lg border ${
                          root1 === v ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        α = {v}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs font-mono text-emerald-400">
                    f(x) = (x - {root1})(x - {root2})(x - {root3})
                  </div>
                </div>

                {/* Mini Scalar Matrix Sandbox */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-sky-300 uppercase">2. Scalar Booster: k · A</div>
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-slate-400">Scale k = {scalarK}</label>
                    <input
                      aria-label="Scalar booster slider"
                      type="range"
                      min={-3}
                      max={5}
                      value={scalarK}
                      onChange={(e) => {
                        setScalarK(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="accent-sky-500 cursor-pointer"
                    />
                  </div>
                  <div className="text-xs font-mono text-sky-300">
                    {scalarK} × [[{matA[0][0]}, {matA[0][1]}], [{matA[1][0]}, {matA[1][1]}]] = [[{scalarK * matA[0][0]}, {scalarK * matA[0][1]}], [{scalarK * matA[1][0]}, {scalarK * matA[1][1]}]]
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: CHALLENGES (ADAPTIVE + BRILLIANT FEEDBACK) ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Top Challenge Header & Adaptive Difficulty Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">
                  Telemetry Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider rounded-full border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-400 border-rose-600'
                      : 'bg-indigo-950 text-indigo-400 border-indigo-600'
                  }`}
                >
                  {difficulty} tier
                </motion.span>
                <span className="px-2 py-0.5 text-xs font-mono rounded bg-slate-800 text-slate-300 border border-slate-700">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-48 h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Active Challenge Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-6 rounded-2xl border transition-colors shadow-2xl ${
                wrongFlash
                  ? 'bg-rose-950/60 border-2 border-rose-500'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed mb-4">
                {challenge.question}
              </h3>

              {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => {
                    const isSelectedAndCorrect = showExplanation && i === challenge.correctIndex;
                    return (
                      <motion.button
                        key={i}
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(i)}
                        disabled={answerRevealed || showExplanation}
                        className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 ${
                          isSelectedAndCorrect
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950'
                            : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-indigo-500/50'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs text-indigo-300 font-bold shrink-0 mt-0.5">
                          {showExplanation ? (i === challenge.correctIndex ? '✓' : '✗') : String.fromCharCode(65 + i)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* TYPE 2: Drag-Label Diagram */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-6">
                  {/* Palette of Draggable Tags */}
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable item: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg cursor-grab active:cursor-grabbing text-white text-xs font-bold border border-indigo-400/30 shadow-md shadow-indigo-950"
                      >
                        ⠿ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Drop Targets Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'box_row', label: '1. Single Row Matrix [3  -1  4]' },
                      { id: 'box_col', label: '2. Single Column Matrix [2; 5; 9]' },
                      { id: 'box_sq', label: '3. Equal Dimensions Grid (2×2)' },
                      { id: 'box_elem', label: '4. Entry in 2nd row, 1st column' },
                    ].map(target => (
                      <div
                        key={target.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        className={`p-4 rounded-xl border-2 border-dashed min-h-[90px] flex flex-col justify-between transition-colors ${
                          droppedLabels[target.id]
                            ? 'bg-emerald-950/40 border-emerald-500'
                            : 'bg-slate-950/60 border-slate-700 hover:border-indigo-500'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-400">{target.label}</span>
                        <div className="text-sm font-mono font-extrabold text-emerald-300 mt-2">
                          {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop matching label here'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Validate matching labels"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Validate Matching Labels ✓
                  </motion.button>
                </div>
              )}

              {/* TYPE 3: Drag-Sort Process Steps */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 font-mono">Drag or use arrows to rearrange into the correct sequence:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map(idx => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Sortable item ${displayIdx + 1}: ${item}`}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 text-slate-200 text-sm flex items-center justify-between gap-3 cursor-grab"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-700/60 flex items-center justify-center text-xs font-bold shrink-0">
                            {displayIdx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                        <span className="text-slate-500 text-xs">⠿ drag</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Confirm step order"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                      handleAnswer(answer);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Confirm Step Order ✓
                  </motion.button>
                </div>
              )}

              {/* TYPE 4: Numeric Entry */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      aria-label="Numeric calculation answer input"
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical answer"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 focus:outline-none w-56"
                    />
                    {challenge.unit && <span className="text-slate-400 text-sm font-mono">{challenge.unit}</span>}
                    <motion.button
                      aria-label="Submit numeric calculation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || numericInput.trim() === ''}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30"
                    >
                      Submit Calculation ✓
                    </motion.button>
                  </div>
                </div>
              )}

              {/* TYPE 5: Construct Matrix / Equation */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400">{challenge.validationHint}</div>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add part ${part}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('tap');
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-xs"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  {/* Assembled Construction Area */}
                  <div className="min-h-[80px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                    {constructParts.map((p, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-900 border border-indigo-700 rounded-lg text-white font-mono text-xs"
                      >
                        {p}
                        <button
                          aria-label={`Remove part ${p}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600 font-mono">Click buttons above to assemble matrix entries</span>
                    )}
                  </div>

                  <motion.button
                    aria-label="Verify construction"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Verify Construction ✓
                  </motion.button>
                </div>
              )}

              {/* ── PROGRESSIVE DISCLOSURE EXPLANATION ── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-700/60 rounded-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                      <span>💡 Step-by-Step Mathematical Explanation</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, sIdx) => (
                        <motion.p
                          key={sIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-indigo-100 leading-relaxed font-sans"
                        >
                          <span className="font-bold text-indigo-400 font-mono mr-2">{sIdx + 1}.</span>
                          {sentence}{!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        aria-label="Reveal next explanation step"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setRevealedSteps(s => s + 1);
                          audioManager.play('tap');
                        }}
                        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                      >
                        Reveal Next Step →
                      </motion.button>
                    ) : (
                      <div className="text-xs font-mono text-emerald-400">✓ All derivation steps revealed!</div>
                    )}

                    {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                      <motion.button
                        aria-label="Proceed to next challenge or finish"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission Score →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Score Banner */}
            <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-2xl border border-indigo-700/60 text-center space-y-3 shadow-2xl">
              <span className="text-4xl">🚀</span>
              <h2 className="text-2xl font-black text-white">ISRO Mission Telemetry Certified!</h2>
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Score: {Math.max(0, 100 - errors * 5)}%
              </div>
              <p className="text-xs font-mono text-indigo-300">
                Mastery Status: <span className="uppercase font-bold text-white">{masteryLevel}</span> • Errors: {errors}
              </p>
            </div>

            {/* Motivational Feedback Banner */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 ${
              errors === 0
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                : errors <= 3
                ? 'bg-sky-950/70 border-sky-500 text-sky-200'
                : errors <= 7
                ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                : 'bg-rose-950/70 border-rose-500 text-rose-200'
            }`}>
              <span className="text-2xl font-bold">{errors === 0 ? '✓' : '★'}</span>
              <div>
                <div className="text-base font-extrabold tracking-wide uppercase">{motivationalMessage}</div>
                <div className="text-xs opacity-90 mt-0.5">
                  {errors === 0
                    ? 'Flawless execution across polynomial factorisation, matrices, and sequences!'
                    : errors <= 3
                    ? 'You demonstrated solid command over ICSE Class 10 mathematics!'
                    : errors <= 7
                    ? 'Good effort throughout the mission problems. Review weak spots to improve speed.'
                    : 'Do not lose heart — consistent practice will make you a master of this topic!'}
                </div>
              </div>
            </div>

            {/* Misconception Diagnostics Review */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span>⚠️ Critical Misconceptions Identified During Mission:</span>
                </h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((mIdx, i) => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                        <div className="text-rose-400 font-bold">✗ {m.misconception}</div>
                        <div className="text-emerald-300">✓ {m.correction}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spaced Repetition (SRS) Status */}
            <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-800/50 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase">SM-2 Spaced Repetition Schedule</div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Based on memory retention decay,{' '}
                  <span className="font-bold text-amber-400">
                    {srsRecommendation}
                  </span>
                  .
                </div>
              </div>
              <span className="text-2xl">����</span>
            </div>

            {/* Real-World Activity */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
                <span>🛰️ {REAL_WORLD_ACTIVITY.title}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-2 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Restart Button */}
            <div className="flex justify-center pt-2">
              <motion.button
                aria-label="Re-enter simulation laboratory"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentChallenge(0);
                  setErrors(0);
                  audioManager.play('whoosh');
                }}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30"
              >
                Re-enter Simulation Laboratory 🔄
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION FEEDBACK COMPONENT OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C10_MathematicsFactorisingPolynomialCompletelySim;
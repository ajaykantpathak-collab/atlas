'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_MATH_011 = 'c12_math_011';
const NODE_C12_MATH_012 = 'c12_math_012';
const NODE_C12_MATH_013 = 'c12_math_013';
const NODE_C12_MATH_014 = 'c12_math_014';
const NODE_C12_MATH_015 = 'c12_math_015';
const NODE_C12_MATH_016 = 'c12_math_016';
const NODE_C12_MATH_017 = 'c12_math_017';
const NODE_C12_MATH_018 = 'c12_math_018';
const NODE_C12_MATH_019 = 'c12_math_019';
const NODE_C12_MATH_020 = 'c12_math_020';

const ALL_NODE_IDS = [
  NODE_C12_MATH_011,
  NODE_C12_MATH_012,
  NODE_C12_MATH_013,
  NODE_C12_MATH_014,
  NODE_C12_MATH_015,
  NODE_C12_MATH_016,
  NODE_C12_MATH_017,
  NODE_C12_MATH_018,
  NODE_C12_MATH_019,
  NODE_C12_MATH_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Robotics Kinematics & Coordinate Engine',
  intro: 'You are designing the trajectory control module for an autonomous ISRO lunar rover arm. The arm requires inverse trigonometric mappings for precision joint angle solving, and 3x3 matrix coordinate transformations for sensor alignments.',
  context: 'A single miscalculated principal value branch or transposed transformation matrix will cause the robotic end-effector to collide with the rover chassis.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If sin⁻¹(x) represents angle θ on the unit circle, what is the exact sum of sin⁻¹(x) + cos⁻¹(x) for any valid x in [-1, 1]?',
  options: [
    'It depends directly on x (changes between 0 and π)',
    'Always π/2 (90°), as they are complementary angles of a right triangle',
    'Always π (180°), because sine and cosine cancel each other',
    'Undefined for x < 0',
  ],
  correctIndex: 1,
  hintAfter: "Complementary acute angles in a right triangle always sum to 90° (π/2 radians). Let's see how this generalizes across all inverse trig identities and matrix transformations!",
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

// ─── CHALLENGES ARRAY (22 comprehensive challenges across all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // 1. c12_math_011 (Foundation - recall)
  {
    id: 'ch_011_f',
    nodeId: NODE_C12_MATH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For which interval of x is the complementary identity sin⁻¹(x) + cos⁻¹(x) = π/2 mathematically valid in the real number system?',
    options: ['(-∞, ∞)', '[-1, 1]', '[0, 1]', '(-π/2, π/2)'],
    correctIndex: 1,
    explanation: 'Both sin⁻¹(x) and cos⁻¹(x) are defined only when the input ratio x belongs to the domain [-1, 1]. Outside this interval, real-valued inverse sines do not exist.',
    hints: [
      'Think about the maximum and minimum values that standard sin(θ) and cos(θ) can output.',
      'The domain of an inverse function is the range of the original function.',
      'Since -1 ≤ sin(θ) ≤ 1, x must lie in [-1, 1].',
    ],
    misconceptionIndex: 0,
  },
  // 2. c12_math_011 (Standard - application)
  {
    id: 'ch_011_s',
    nodeId: NODE_C12_MATH_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate without a calculator: [sin⁻¹(0.4) + cos⁻¹(0.4) + tan⁻¹(√3) + cot⁻¹(√3)] / π. Enter the numerical value.',
    correctAnswer: 1,
    tolerance: 0.01,
    unit: 'multiple of π',
    explanation: 'By the complementary identities: sin⁻¹(0.4) + cos⁻¹(0.4) = π/2 and tan⁻¹(√3) + cot⁻¹(√3) = π/2. Sum = π/2 + π/2 = π. Dividing by π gives 1.0.',
    hints: [
      'Notice that each pair has identical arguments: (0.4, 0.4) and (√3, √3).',
      'Recall sin⁻¹x + cos⁻¹x = π/2 and tan⁻¹x + cot⁻¹x = π/2.',
      'π/2 + π/2 = π. Dividing by π gives 1.',
    ],
    misconceptionIndex: 1,
  },
  // 3. c12_math_012 (Foundation - understanding)
  {
    id: 'ch_012_f',
    nodeId: NODE_C12_MATH_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Evaluate sin⁻¹(3/5) + sin⁻¹(4/5). Note that (3/5)² + (4/5)² = 1.',
    options: ['π/4', 'π/3', 'π/2', 'sin⁻¹(7/5)'],
    correctIndex: 2,
    explanation: 'Since x² + y² = 9/25 + 16/25 = 1 ≤ 1, the identity gives sin⁻¹( (3/5)√(1-(4/5)²) + (4/5)√(1-(3/5)²) ) = sin⁻¹(9/25 + 16/25) = sin⁻¹(1) = π/2.',
    hints: [
      'Do not just add the arguments (3/5 + 4/5 = 7/5 is invalid!).',
      'Use the formula sin⁻¹(x√(1-y²) + y√(1-x²)).',
      'The argument simplifies to 3/5(3/5) + 4/5(4/5) = 1. sin⁻¹(1) = π/2.',
    ],
    misconceptionIndex: 2,
  },
  // 4. c12_math_012 (Standard - analysis)
  {
    id: 'ch_012_s',
    nodeId: NODE_C12_MATH_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When evaluating sin⁻¹(4/5) + sin⁻¹(4/5), we find x² + y² = 32/25 > 1 with x, y > 0. What is the correct principal value expression?',
    options: [
      'sin⁻¹(24/25)',
      'π - sin⁻¹(24/25)',
      'sin⁻¹(24/25) - π',
      'π/2 + sin⁻¹(24/25)',
    ],
    correctIndex: 1,
    explanation: 'Because both angles are in the first quadrant and their sum exceeds π/2 (since (4/5)² + (4/5)² > 1), the sum exits the principal value branch [-π/2, π/2]. We must reflect it back using π - sin⁻¹(24/25).',
    hints: [
      'sin⁻¹(4/5) ≈ 0.927 radians. Doubled, it is ~1.855 radians, which is > π/2 (~1.57).',
      'Since the true sum > π/2, the principal branch of sin⁻¹ cannot represent it directly without adjustment.',
      'The standard reflection formula for x>0, y>0, x²+y²>1 is π - sin⁻¹(...).',
    ],
    misconceptionIndex: 3,
  },
  // 5. c12_math_013 (Foundation - understanding)
  {
    id: 'ch_013_f',
    nodeId: NODE_C12_MATH_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Evaluate tan⁻¹(1/2) + tan⁻¹(1/3).',
    options: ['π/6', 'π/4', 'π/3', 'tan⁻¹(5/6)'],
    correctIndex: 1,
    explanation: 'Here xy = (1/2)(1/3) = 1/6 < 1. tan⁻¹((1/2 + 1/3) / (1 - 1/6)) = tan⁻¹((5/6)/(5/6)) = tan⁻¹(1) = π/4.',
    hints: [
      'Check xy = 1/6 < 1, so the unadjusted formula tan⁻¹((x+y)/(1-xy)) applies.',
      'Numerator is 1/2 + 1/3 = 5/6. Denominator is 1 - 1/6 = 5/6.',
      'The ratio is 1, and tan⁻¹(1) = π/4 (or 45°).',
    ],
    misconceptionIndex: 4,
  },
  // 6. c12_math_013 (Advanced - evaluation)
  {
    id: 'ch_013_a',
    nodeId: NODE_C12_MATH_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims tan⁻¹(2) + tan⁻¹(3) = tan⁻¹((2+3)/(1-6)) = tan⁻¹(-1) = -π/4. Why is this result mathematically invalid?',
    options: [
      'tan⁻¹(2) does not exist for arguments greater than 1',
      'The sum of two positive acute angles cannot be negative; since xy = 6 > 1, the result must be π + tan⁻¹(-1) = 3π/4',
      'The formula only applies when x = y',
      'The denominator should be 1 + xy instead of 1 - xy',
    ],
    correctIndex: 1,
    explanation: 'tan⁻¹(2) > 0 and tan⁻¹(3) > 0. Their sum must lie in (0, π). Since xy = 6 > 1, the angle crossed π/2 into quadrant II. The unadjusted formula gives -π/4, but adding π yields the true angle 3π/4.',
    hints: [
      'Can adding two positive angles give a negative angle?',
      'xy = 2 × 3 = 6 > 1, which triggers the π-adjustment condition.',
      'True sum = π + tan⁻¹(-1) = π - π/4 = 3π/4.',
    ],
    misconceptionIndex: 4,
  },
  // 7. c12_math_014 (Standard - application)
  {
    id: 'ch_014_s',
    nodeId: NODE_C12_MATH_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate 2tan⁻¹(1/3) as a simplified fraction a/b inside tan⁻¹(a/b). What is the value of (a + b) if a/b = 3/4?',
    correctAnswer: 7,
    tolerance: 0,
    unit: 'sum of numerator and denominator',
    explanation: '2tan⁻¹(1/3) = tan⁻¹( 2(1/3) / (1 - 1/9) ) = tan⁻¹( (2/3) / (8/9) ) = tan⁻¹( (2/3) × (9/8) ) = tan⁻¹(3/4). Here a = 3, b = 4, so a + b = 7.',
    hints: [
      'Use 2tan⁻¹x = tan⁻¹(2x / (1 - x²)) for |x| < 1.',
      'Numerator = 2/3. Denominator = 1 - 1/9 = 8/9.',
      '(2/3) / (8/9) = 6/8 = 3/4. Therefore a=3, b=4, a+b=7.',
    ],
    misconceptionIndex: 5,
  },
  // 8. c12_math_014 (Advanced - analysis)
  {
    id: 'ch_014_a',
    nodeId: NODE_C12_MATH_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the exact valid domain of x for the identity 2sin⁻¹(x) = sin⁻¹(2x√(1-x²)) without any branch shift?',
    options: ['[-1, 1]', '[-1/√2, 1/√2]', '[0, 1/√2]', '[-1/2, 1/2]'],
    correctIndex: 1,
    explanation: 'From the compound angle sin⁻¹x + sin⁻¹y with y = x, the condition x² + y² ≤ 1 becomes 2x² ≤ 1, which means x² ≤ 1/2, or -1/√2 ≤ x ≤ 1/√2.',
    hints: [
      'If x = 1, LHS = 2(π/2) = π, but RHS = sin⁻¹(0) = 0, so it fails at x = 1.',
      'We require 2sin⁻¹x to stay within [-π/2, π/2].',
      '-π/2 ≤ 2θ ≤ π/2 implies -π/4 ≤ θ ≤ π/4, so sin(-π/4) ≤ x ≤ sin(π/4) → [-1/√2, 1/√2].',
    ],
    misconceptionIndex: 6,
  },
  // 9. c12_math_015 (Standard - understanding)
  {
    id: 'ch_015_s',
    nodeId: NODE_C12_MATH_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'The triple angle formula 3tan⁻¹(x) = tan⁻¹((3x - x³)/(1 - 3x²)) holds directly without π adjustment only when |x| is:',
    options: ['< 1', '< 1/√3', '< √3', '< 1/2'],
    correctIndex: 1,
    explanation: 'When |x| < 1/√3, the angle tan⁻¹x is in (-π/6, π/6), so 3tan⁻¹x remains strictly inside the principal branch (-π/2, π/2), and 1 - 3x² > 0.',
    hints: [
      'Think about when 3θ reaches the boundary ±π/2.',
      '3θ = π/2 implies θ = π/6.',
      'tan(π/6) = 1/√3. Hence |x| < 1/√3.',
    ],
    misconceptionIndex: 7,
  },
  // 10. c12_math_015 (Advanced - application)
  {
    id: 'ch_015_a',
    nodeId: NODE_C12_MATH_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate 3tan⁻¹(1) using the adjusted formula. What is the correct value?',
    options: ['-π/4', 'π/4', '3π/4', '5π/4'],
    correctIndex: 2,
    explanation: 'Raw formula gives tan⁻¹((3(1) - 1³)/(1 - 3(1)²)) = tan⁻¹(2/(-2)) = tan⁻¹(-1) = -π/4. Since x = 1 > 1/√3, we add π: -π/4 + π = 3π/4.',
    hints: [
      'Directly: tan⁻¹(1) = π/4, so 3 × (π/4) = 3π/4.',
      'The raw formula gives tan⁻¹(-1) = -π/4.',
      'Adding π restores the quadrant II angle: -π/4 + π = 3π/4.',
    ],
    misconceptionIndex: 7,
  },
  // 11. c12_math_016 (Foundation - recall)
  {
    id: 'ch_016_f',
    nodeId: NODE_C12_MATH_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A matrix has 3 rows and 2 columns. What is its order and total number of elements?',
    options: ['Order 2x3 with 6 elements', 'Order 3x2 with 6 elements', 'Order 3x2 with 5 elements', 'Order 3x3 with 9 elements'],
    correctIndex: 1,
    explanation: 'Order is always written as (rows × columns) = 3 × 2. The total number of elements is 3 × 2 = 6.',
    hints: [
      'Remember the convention: Row first, Column second (RC like Remote Control).',
      '3 rows and 2 columns means 3 × 2.',
      'Total elements = 3 × 2 = 6.',
    ],
    misconceptionIndex: 8,
  },
  // 12. c12_math_016 (Standard - application)
  {
    id: 'ch_016_s',
    nodeId: NODE_C12_MATH_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If [[x + 3, 2y], [0, z - 1]] = [[7, 8], [0, 4]], find the value of x + y + z.',
    correctAnswer: 13,
    tolerance: 0,
    unit: 'sum',
    explanation: 'By matrix equality: x + 3 = 7 → x = 4; 2y = 8 → y = 4; z - 1 = 4 → z = 5. Therefore, x + y + z = 4 + 4 + 5 = 13.',
    hints: [
      'Equate corresponding entries: a₁₁ = b₁₁, a₁₂ = b₁₂, a₂₂ = b₂₂.',
      'x = 7 - 3 = 4, y = 8 / 2 = 4, z = 4 + 1 = 5.',
      '4 + 4 + 5 = 13.',
    ],
    misconceptionIndex: 8,
  },
  // 13. c12_math_017 (Foundation - understanding)
  {
    id: 'ch_017_f',
    nodeId: NODE_C12_MATH_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following matrices is a SCALAR matrix that is NOT the identity matrix?',
    options: [
      '[[5, 0], [0, 3]]',
      '[[4, 0, 0], [0, 4, 0], [0, 0, 4]]',
      '[[1, 0], [0, 1]]',
      '[[0, 4], [4, 0]]',
    ],
    correctIndex: 1,
    explanation: 'A scalar matrix is a diagonal matrix where all diagonal elements are equal to a constant k ≠ 1. [[4, 0, 0], [0, 4, 0], [0, 0, 4]] has all diagonal entries equal to 4 and all off-diagonal entries 0.',
    hints: [
      'A scalar matrix must first be a diagonal matrix (all off-diagonals are zero).',
      'All elements on the leading diagonal must be equal to each other.',
      'If the diagonal is all 4s and the rest 0s, it is a scalar matrix with k = 4.',
    ],
    misconceptionIndex: 9,
  },
  // 14. c12_math_017 (Standard - distinguish)
  {
    id: 'ch_017_s',
    nodeId: NODE_C12_MATH_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In an Upper Triangular Matrix of order n x n, which condition must hold for its elements a_ij?',
    options: [
      'a_ij = 0 whenever i > j (all entries below the main diagonal are zero)',
      'a_ij = 0 whenever i < j (all entries above the main diagonal are zero)',
      'a_ij = 0 whenever i = j (main diagonal is zero)',
      'a_ij = 1 for all entries',
    ],
    correctIndex: 0,
    explanation: 'Upper triangular means non-zero elements are in the upper triangle and main diagonal. The elements strictly below the diagonal (where row index i > column index j) must be zero.',
    hints: [
      'In row 2, column 1: i=2, j=1, so i > j. This is below the diagonal.',
      'Upper triangular keeps entries where i ≤ j non-zero (or potentially non-zero).',
      'Therefore, a_ij = 0 for all i > j.',
    ],
    misconceptionIndex: 9,
  },
  // 15. c12_math_018 (Foundation - recall)
  {
    id: 'ch_018_f',
    nodeId: NODE_C12_MATH_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If matrix A has order 2 x 3, what is the order of its transpose Aᵀ?',
    options: ['2 x 3', '3 x 2', '3 x 3', '2 x 2'],
    correctIndex: 1,
    explanation: 'Transposing a matrix swaps rows into columns and columns into rows. Thus an m x n matrix becomes an n x m matrix (2 x 3 becomes 3 x 2).',
    hints: [
      'Rows become columns, and columns become rows.',
      'The dimensions flip: m × n → n × m.',
      '2 × 3 flips to 3 × 2.',
    ],
    misconceptionIndex: 10,
  },
  // 16. c12_math_018 (Standard - drag-sort)
  {
    id: 'ch_018_s',
    nodeId: NODE_C12_MATH_018,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the steps to compute the transpose of A = [[1, 2, 3], [4, 5, 6]] and verify (Aᵀ)ᵀ = A.',
    sortItems: [
      'Identify initial order of A as 2 x 3',
      'Write row 1 [1, 2, 3] as column 1 and row 2 [4, 5, 6] as column 2 to form Aᵀ (3 x 2)',
      'Take transpose of Aᵀ by converting its 3 rows into 3 columns',
      'Verify the resulting 2 x 3 matrix is identical to original matrix A',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First determine the original shape (2x3), construct Aᵀ (3x2) by interchanging rows and columns, transpose again to get (Aᵀ)ᵀ, and confirm equality with A.',
    hints: [
      'Start with identifying the dimensions of matrix A.',
      'Form Aᵀ by writing rows as columns.',
      'Transpose Aᵀ again to test the involution property (Aᵀ)ᵀ = A.',
    ],
    misconceptionIndex: 10,
  },
  // 17. c12_math_019 (Foundation - understanding)
  {
    id: 'ch_019_f',
    nodeId: NODE_C12_MATH_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What MUST be true about every element on the main diagonal of a skew-symmetric matrix?',
    options: [
      'They must all equal 1',
      'They can be any real number',
      'They must all equal 0',
      'They must be strictly positive',
    ],
    correctIndex: 2,
    explanation: 'For a skew-symmetric matrix, Aᵀ = -A, which implies a_ij = -a_ji. On the main diagonal where i = j, this gives a_ii = -a_ii → 2a_ii = 0 → a_ii = 0 for all i.',
    hints: [
      'Apply the skew-symmetric condition a_ij = -a_ji for the case where i = j.',
      'a_11 = -a_11. What real number equals its own negative?',
      'Only 0 satisfies x = -x.',
    ],
    misconceptionIndex: 11,
  },
  // 18. c12_math_019 (Standard - application)
  {
    id: 'ch_019_s',
    nodeId: NODE_C12_MATH_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For any square matrix A, which statement about (A + Aᵀ) and (A - Aᵀ) is always universally true?',
    options: [
      '(A + Aᵀ) is skew-symmetric, (A - Aᵀ) is symmetric',
      '(A + Aᵀ) is symmetric, (A - Aᵀ) is skew-symmetric',
      'Both are symmetric matrices',
      'Both are skew-symmetric matrices',
    ],
    correctIndex: 1,
    explanation: '(A + Aᵀ)ᵀ = Aᵀ + (Aᵀ)ᵀ = Aᵀ + A = A + Aᵀ (symmetric). (A - Aᵀ)ᵀ = Aᵀ - A = -(A - Aᵀ) (skew-symmetric).',
    hints: [
      'Take the transpose of (A + Aᵀ): (A + Aᵀ)ᵀ = Aᵀ + A = A + Aᵀ.',
      'Take the transpose of (A - Aᵀ): (A - Aᵀ)ᵀ = Aᵀ - A = -(A - Aᵀ).',
      'Thus A + Aᵀ is symmetric, while A - Aᵀ is skew-symmetric.',
    ],
    misconceptionIndex: 12,
  },
  // 19. c12_math_019 (Advanced - evaluation)
  {
    id: 'ch_019_a',
    nodeId: NODE_C12_MATH_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Decompose A = [[3, 2], [6, 8]] into Symmetric part S + Skew-Symmetric part K. What is the entry K₁₂ (row 1, column 2 of the skew-symmetric part)?',
    correctAnswer: -2,
    tolerance: 0.1,
    unit: 'value of K₁₂',
    explanation: 'K = 1/2(A - Aᵀ). Aᵀ = [[3, 6], [2, 8]]. A - Aᵀ = [[3-3, 2-6], [6-2, 8-8]] = [[0, -4], [4, 0]]. Halving gives K = [[0, -2], [2, 0]]. Thus K₁₂ = -2.',
    hints: [
      'Formula for skew-symmetric component: K = 1/2 (A - Aᵀ).',
      'Compute A - Aᵀ: row 1 col 2 entry is 2 - 6 = -4.',
      'Divide -4 by 2 to obtain K₁₂ = -2.',
    ],
    misconceptionIndex: 12,
  },
  // 20. c12_math_020 (Foundation - recall)
  {
    id: 'ch_020_f',
    nodeId: NODE_C12_MATH_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Can a 2 x 3 matrix and a 3 x 2 matrix be added together?',
    options: [
      'Yes, because both matrices contain 6 elements',
      'No, matrix addition is defined ONLY between matrices of the exact same order',
      'Yes, by transposing the second matrix first automatically',
      'Yes, if all entries are integers',
    ],
    correctIndex: 1,
    explanation: 'Matrix addition is an entry-by-entry operation (c_ij = a_ij + b_ij). It is defined if and only if both matrices have identical dimensions (same number of rows and columns).',
    hints: [
      'Does having the same total number of cells mean the shapes match?',
      'A 2x3 matrix has 2 rows and 3 columns, whereas 3x2 has 3 rows and 2 columns.',
      'Corresponding positions do not align, so addition is undefined.',
    ],
    misconceptionIndex: 13,
  },
  // 21. c12_math_020 (Standard - application)
  {
    id: 'ch_020_s',
    nodeId: NODE_C12_MATH_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Let A = [[2, -1], [3, 4]] and B = [[1, 5], [-2, 0]]. Compute the element at (row 2, column 1) of the matrix 3A - 2B.',
    correctAnswer: 13,
    tolerance: 0,
    unit: 'value at (2,1)',
    explanation: 'Entry (2,1) of 3A is 3 × 3 = 9. Entry (2,1) of 2B is 2 × (-2) = -4. (3A - 2B)₂₁ = 9 - (-4) = 9 + 4 = 13.',
    hints: [
      'Work on position (2,1) independently: 3 × A₂₁ - 2 × B₂₁.',
      'A₂₁ = 3, B₂₁ = -2.',
      '3(3) - 2(-2) = 9 - (-4) = 13.',
    ],
    misconceptionIndex: 13,
  },
  // 22. c12_math_020 (Advanced - construct)
  {
    id: 'ch_020_a',
    nodeId: NODE_C12_MATH_020,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Drag the matrix algebraic property names to their corresponding formal mathematical identity.',
    dragItems: [
      { label: 'Commutative Law', targetId: 'prop_comm' },
      { label: 'Additive Identity', targetId: 'prop_id' },
      { label: 'Distributive Law', targetId: 'prop_dist' },
      { label: 'Additive Inverse', targetId: 'prop_inv' },
    ],
    correctMapping: {
      prop_comm: 'Commutative Law',
      prop_id: 'Additive Identity',
      prop_dist: 'Distributive Law',
      prop_inv: 'Additive Inverse',
    },
    explanation: 'A + B = B + A (Commutativity), A + O = A (Additive Identity), k(A + B) = kA + kB (Distributivity), and A + (-A) = O (Additive Inverse).',
    hints: [
      'A + B = B + A is about swapping order: Commutative.',
      'Adding O leaves the matrix unchanged: Identity.',
      'Multiplying scalar k across a sum is Distributive.',
    ],
    misconceptionIndex: 13,
  },
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Complementary Arc Balance: sin⁻¹x + cos⁻¹x = π/2',
    instruction: 'Drag the ratio slider x ∈ [-1, 1] on the unit circle. Observe how the sum of the vertical angle (arcsin) and horizontal complement (arccos) perpetually locks at 90° (π/2).',
    interactionType: 'unit-circle-slider',
    nodeId: NODE_C12_MATH_011,
  },
  {
    title: 'Tangent Addition & The π Branch Barrier',
    instruction: 'Adjust slopes x and y. Notice that as long as xy < 1, the merged tangent ramp is unadjusted. When xy > 1 (crossing π/2), observe the mandatory +π phase adjustment.',
    interactionType: 'arctan-combiner',
    nodeId: NODE_C12_MATH_013,
  },
  {
    title: 'Matrix Shape, Order & Equality Grid',
    instruction: 'Modify the dimensions and entries of Matrix A and Matrix B. Watch the element-by-element equality checker signal match or mismatch in real time.',
    interactionType: 'matrix-grid-editor',
    nodeId: NODE_C12_MATH_016,
  },
  {
    title: 'Matrix Transpose & Diagonal Reflection',
    instruction: 'Click "Transpose" to animate the row-to-column reflection across the main diagonal. Observe that diagonal entries a_ii remain invariant.',
    interactionType: 'transpose-animator',
    nodeId: NODE_C12_MATH_018,
  },
  {
    title: 'Symmetric & Skew-Symmetric Decomposition',
    instruction: 'Construct any 2x2 matrix and watch it dynamically split into its unique Symmetric component 1/2(A + Aᵀ) and Skew-Symmetric component 1/2(A - Aᵀ).',
    interactionType: 'matrix-decomposer',
    nodeId: NODE_C12_MATH_019,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you choose x = 0.6 and y = 0.8, what will be the exact value of sin⁻¹(0.6) + sin⁻¹(0.8)?',
    options: ['sin⁻¹(1.4) (invalid)', 'π/2 radians (90°)', 'π radians (180°)', '0 radians'],
    correctIndex: 1,
    verifyInstruction: 'Notice 0.6² + 0.8² = 0.36 + 0.64 = 1.0! The two ramps form complementary acute angles in a 3-4-5 right triangle, summing to exactly π/2.',
    nodeId: NODE_C12_MATH_012,
  },
  {
    question: 'Predict: If you transpose a 2x3 matrix twice in succession, what will be the order and contents of ((Aᵀ)ᵀ)?',
    options: [
      'Order 3x2, contents flipped',
      'Order 2x3, identical to original A',
      'Order 3x3 square matrix',
      'All elements become negative',
    ],
    correctIndex: 1,
    verifyInstruction: 'Transposing swaps rows and columns; doing it twice restores every entry a_ij back to position (i,j) and restores the 2x3 dimensions.',
    nodeId: NODE_C12_MATH_018,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'When adjusting the x slider in the sin⁻¹x + cos⁻¹x exploration, what happens to the sum as x moves from -1 to +1?',
    observableOptions: [
      'The sum fluctuates between -π/2 and +π/2',
      'The sum remains strictly invariant at π/2 (~1.5708 rad) everywhere in [-1, 1]',
      'The sum is zero at x = 0',
      'The sum increases linearly with x',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_MATH_011,
  },
  {
    question: 'In the Skew-Symmetric matrix decomposition, what invariant pattern do you observe on the main diagonal of 1/2(A - Aᵀ)?',
    observableOptions: [
      'All diagonal entries are always identically 0',
      'Diagonal entries equal the trace of A',
      'Diagonal entries are all equal to 1',
      'Diagonal entries alternate signs',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_019,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Chandrayaan Rover Joint Angle & Frame Calibration',
  description: 'Apply the dual toolkit of inverse trigonometric angle solving and 3x3 matrix rotation transformations to calculate a camera tilt angle and verify coordinate frame symmetry.',
  steps: [
    'Calculate joint angle θ = tan⁻¹(1/2) + tan⁻¹(1/3) to orient rover mast to exactly 45° (π/4).',
    'Set up 2x2 coordinate alignment matrix M = [[2, 4], [4, 5]] and verify Mᵀ = M (Symmetric sensor baseline).',
    'Decompose skew sensor reading S = [[1, 3], [7, 5]] into pure symmetric strain and skew-symmetric rotational vorticity.',
    'Formulate a scalar multiplied compensation matrix -2K to zero out rover tilt drift.',
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: 'c12_math_011',
  title: 'ISC Class 12: Inverse Trigonometric Properties & Matrix Algebra',
  definition:
    'Comprehensive mastery of inverse trigonometric elementary properties, compound identities, double/triple angle formulas, and matrix foundations including notation, special types, transposes, symmetric/skew-symmetric decompositions, and linear operations.',
  eli5:
    'Inverse trig functions act as angle finders that obey strict 90° balancing rules, while matrices are organized grids of numbers that transform space, mirror across diagonals, and combine cell-by-cell.',
  misconceptions: [
    { misconception: 'sin⁻¹x + cos⁻¹x = π/2 holds for all real numbers x.', correction: 'Valid only for x ∈ [-1, 1], because inverse sine and cosine are undefined for real numbers outside this domain.' },
    { misconception: 'sin⁻¹(3/5) + sin⁻¹(4/5) can be solved by adding 3/5 + 4/5 = 7/5.', correction: 'Inverse trig functions are not linear! Use the compound identity sin⁻¹(x√(1-y²) + y√(1-x²)).' },
    { misconception: 'tan⁻¹x + tan⁻¹y = tan⁻¹((x+y)/(1-xy)) works without any conditions.', correction: 'Valid unadjusted only when xy < 1. If xy > 1 with x,y > 0, an adjustment of +π is mandatory.' },
    { misconception: '2sin⁻¹x = sin⁻¹(2x√(1-x²)) holds for all x in [-1, 1].', correction: 'Holds directly only for |x| ≤ 1/√2; outside this, the doubled angle exceeds the principal range [-π/2, π/2].' },
    { misconception: 'Two matrices are equal if they contain the same total number of elements.', correction: 'Equality requires identical order (same rows and columns) AND identical corresponding elements at every position.' },
    { misconception: 'A skew-symmetric matrix can have non-zero elements on its main diagonal.', correction: 'a_ii = -a_ii forces 2a_ii = 0 → all diagonal entries of a skew-symmetric matrix must be 0.' },
    { misconception: 'Multiplying two matrices is done by multiplying matching elements.', correction: 'Matrix addition is element-wise, but matrix multiplication uses the row-by-column dot product rule.' },
  ],
  diagnosticQuestions: [
    { question: 'What is sin⁻¹(1/2) + cos⁻¹(1/2)?', options: ['π/3', 'π/2', 'π/6', 'π'], correctIndex: 1 },
    { question: 'What is tan⁻¹(1) + tan⁻¹(1)?', options: ['π/2 (direct evaluation)', 'tan⁻¹(2/0) (infinity)', 'π/4', '0'], correctIndex: 0 },
    { question: 'Order of matrix [[1, 2, 3], [4, 5, 6]] is:', options: ['3x2', '2x3', '6x1', '2x2'], correctIndex: 1 },
    { question: 'If A is 3x2, what is order of Aᵀ?', options: ['3x2', '2x3', '3x3', '2x2'], correctIndex: 1 },
    { question: 'What is the diagonal of any skew-symmetric matrix?', options: ['All 1s', 'All 0s', 'Any real numbers', 'All negative'], correctIndex: 1 },
    { question: 'If A = [[1, 2], [3, 4]], what is A + Aᵀ?', options: ['[[2, 5], [5, 8]] (Symmetric)', '[[0, -1], [1, 0]]', '[[2, 4], [6, 8]]', '[[1, 0], [0, 1]]'], correctIndex: 0 },
    { question: 'Can you add a 2x3 matrix to a 3x2 matrix?', options: ['Yes', 'No, orders differ', 'Only if transposed', 'Only if square'], correctIndex: 1 },
    { question: 'For what range of x does 3tan⁻¹x = tan⁻¹((3x-x³)/(1-3x²)) hold directly?', options: ['|x| < 1', '|x| < 1/√3', '|x| ≤ 1', 'All real x'], correctIndex: 1 },
  ],
  masteryCriteria:
    'Demonstrates rigorous understanding of inverse trigonometric domain restrictions, compound formulas, multi-angle reductions, and matrix order, transpositions, symmetry decompositions, and scalar operations.',
};

export function C12_MathematicsInverseTrigPropertiesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-Check State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);

  // Observation State
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating Hints & Progressive Disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual Feedback States
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive Exploration Simulation States
  // 1. Arc Complement Slider
  const [trigX, setTrigX] = useState(0.5); // x in [-1, 1]
  // 2. Arctan Slopes
  const [tanX, setTanX] = useState(0.5);
  const [tanY, setTanY] = useState(0.333);
  // 3. Matrix Builder
  const [matA, setMatA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [matB, setMatB] = useState<number[][]>([[1, 2], [3, 4]]);
  // 4. Matrix Transpose Animation State
  const [transposeAnimated, setTransposeAnimated] = useState(false);
  // 5. Matrix Decomposition
  const [decompA, setDecompA] = useState<number[][]>([[3, 2], [6, 8]]);
  // 6. Matrix Scalar Multiplier & Addition Lab
  const [scalarK, setScalarK] = useState(2);
  const [activeTab, setActiveTab] = useState<'trig' | 'matrix'>('trig');

  // Multi-Representation Tab State
  const [representationMode, setRepresentationMode] = useState<'geometric' | 'algebraic' | 'graphical'>('geometric');

  // Drag & Sort & Numeric State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived Values for Inverse Trig
  const asinVal = useMemo(() => Math.asin(Math.max(-1, Math.min(1, trigX))), [trigX]);
  const acosVal = useMemo(() => Math.acos(Math.max(-1, Math.min(1, trigX))), [trigX]);
  const sumVal = useMemo(() => asinVal + acosVal, [asinVal, acosVal]);

  const tanProduct = useMemo(() => tanX * tanY, [tanX, tanY]);
  const tanCombinedAngle = useMemo(() => {
    const raw = Math.atan((tanX + tanY) / (1 - tanX * tanY));
    if (tanProduct > 1 && tanX > 0 && tanY > 0) return Math.PI + raw;
    if (tanProduct > 1 && tanX < 0 && tanY < 0) return -Math.PI + raw;
    return raw;
  }, [tanX, tanY, tanProduct]);

  // Derived Values for Matrix Decomposer
  const decompSymmetric = useMemo(() => {
    return [
      [decompA[0][0], (decompA[0][1] + decompA[1][0]) / 2],
      [(decompA[1][0] + decompA[0][1]) / 2, decompA[1][1]],
    ];
  }, [decompA]);

  const decompSkew = useMemo(() => {
    return [
      [0, (decompA[0][1] - decompA[1][0]) / 2],
      [(decompA[1][0] - decompA[0][1]) / 2, 0],
    ];
  }, [decompA]);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
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

  // ─── BKT UPDATE EFFECT ───
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

  // ─── CANVAS ANIMATION LOOP (Live Unit Circle & Matrix Transformation Visualizer) ───
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

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;

      // Coordinate axes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(20, cy);
      ctx.lineTo(width - 20, cy);
      ctx.moveTo(cx, 20);
      ctx.lineTo(cx, height - 20);
      ctx.stroke();

      // Unit Circle
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // Current Point on Circle based on trigX
      const px = cx + trigX * radius;
      const py = cy - Math.sqrt(Math.max(0, 1 - trigX * trigX)) * radius;

      // Complementary Triangle
      ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, cy);
      ctx.lineTo(px, py);
      ctx.closePath();
      ctx.fill();

      // Radians Arc for sin⁻¹x
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.4, -asinVal, 0, false);
      ctx.stroke();

      // Arc for cos⁻¹x
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.55, -Math.PI / 2, -asinVal, false);
      ctx.stroke();

      // Target Vector
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Glowing Point
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Pulse indicator
      const pulse = Math.sin(frame * 0.08) * 3;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.beginPath();
      ctx.arc(px, py, 6 + pulse, 0, 2 * Math.PI);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [trigX, asinVal]);

  // ─── CALLBACK HANDLERS ───
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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((index: number) => {
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding prediction! You recognize complementary symmetry.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate the math models directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode active. Experiment with all identities and matrix transformations without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning adaptive mastery challenges. Read carefully and verify your domain boundaries.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now verify with the live calculation.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation!' : 'Look closer at the invariant sum value.');
  }, []);

  const handleTrigSliderChange = useCallback((val: number) => {
    setTrigX(val);
    audioManager.play('count');
  }, []);

  const handleTanSlidersChange = useCallback((x: number, y: number) => {
    setTanX(x);
    setTanY(y);
    audioManager.play('count');
  }, []);

  const handleMatrixCellChange = useCallback((mat: 'A' | 'B', row: number, col: number, val: number) => {
    if (mat === 'A') {
      setMatA(prev => {
        const next = prev.map(r => [...r]);
        next[row][col] = val;
        return next;
      });
    } else {
      setMatB(prev => {
        const next = prev.map(r => [...r]);
        next[row][col] = val;
        return next;
      });
    }
    audioManager.play('tap');
  }, []);

  const handleTransposeToggle = useCallback(() => {
    setTransposeAnimated(prev => !prev);
    audioManager.play('swoop');
  }, []);

  const handleDecompMatrixChange = useCallback((r: number, c: number, val: number) => {
    setDecompA(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = val;
      return next;
    });
    audioManager.play('tap');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 ? [0, 1, 2, 3] : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Correct sequencing!');
      setShowConfetti(true);
      setShowExplanation(true);
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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Module complete! You have mastered ISC Class 12 Inverse Trig and Matrix Properties.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
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
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Precise mathematical reasoning.');
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
          speechManager.speak('Let us study the complete step-by-step breakdown together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  const matricesEqual = useMemo(() => {
    return (
      matA.length === matB.length &&
      matA[0].length === matB[0].length &&
      matA.every((row, r) => row.every((val, c) => val === matB[r][c]))
    );
  }, [matA, matB]);

  // Personalized Motivational Feedback string
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <motion.div className="flex items-center gap-3" initial={{ x: -20 }} animate={{ x: 0 }}>
          <motion.span
            whileHover={{ rotate: 15 }}
            className="text-3xl p-2 bg-gold-950/80 rounded-xl border border-gold-700/50 cursor-pointer"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gold-300 via-gold-300 to-teal-200 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">ISC Class 12 • CISCE Core Curriculum Mastery</p>
          </div>
        </motion.div>

        {/* Phase Pill Navigation & BKT Badge */}
        <motion.div className="flex items-center gap-2" initial={{ x: 20 }} animate={{ x: 0 }}>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border border-rose-700'
                : 'bg-gold-950 text-gold-400 border border-gold-700'
            }`}
          >
            {difficulty}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700"
          >
            Phase: <strong className="text-gold-400 uppercase">{phase}</strong>
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg"
          >
            <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm mb-2">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              MISSION CONTEXT: {SCENARIO.title}
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">{SCENARIO.intro}</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs text-slate-400 mt-2 bg-slate-950/40 p-3 rounded-lg border border-slate-800"
            >
              ⚡ {SCENARIO.context}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
          >
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">🤔</span> Discovery Question (Ungraded Curiosity Check)
            </h3>
            <p className="text-slate-300 text-sm">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700/70 hover:bg-slate-700/80 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs opacity-60 mr-2">[{String.fromCharCode(65 + i)}]</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}
                >
                  {discoveryCorrect ? '✓ Excellent intuition! Let us unpack the rigorous derivations and matrices.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white rounded-xl font-bold shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800"
          >
            <span>Exploration Module {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{ scale: idx === currentSlide ? 1.2 : 1 }}
                  className={`w-5 h-1.5 rounded-full ${idx === currentSlide ? 'bg-gold-400' : 'bg-slate-700'}`}
                />
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: Unit Circle Arcsin/Arccos Complement Slider with Topic Specific SVG Diagram 1 */}
              {currentSlide === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800"
                >
                  {/* Visualizer Column: Topic-Specific SVG 1 & Canvas */}
                  <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-3">
                    <canvas ref={canvasRef} width={340} height={200} className="w-full max-w-sm rounded-lg bg-slate-900/50" />
                    
                    {/* TOPIC-SPECIFIC SVG DIAGRAM 1: Complementary Angle Right-Triangle & Unit Circle */}
                    <motion.svg
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      viewBox="0 0 400 130"
                      className="w-full max-w-md bg-slate-900/80 rounded-xl border border-gold-900/60 p-2"
                    >
                      <text x="200" y="16" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">
                        SVG 1: Unit Circle Geometry vs. Right-Triangle Complement
                      </text>
                      {/* Triangle representation */}
                      <path d="M 50 110 L 150 110 L 150 40 Z" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
                      <path d="M 140 110 L 140 100 L 150 100" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                      <text x="100" y="125" fill="#38bdf8" fontSize="10" textAnchor="middle">adjacent = √(1-x²)</text>
                      <text x="160" y="75" fill="#10b981" fontSize="10" textAnchor="start">opp = x</text>
                      <text x="90" y="70" fill="#f59e0b" fontSize="10" textAnchor="end">hyp = 1</text>
                      <text x="65" y="105" fill="#10b981" fontSize="10">θ = sin⁻¹(x)</text>
                      <text x="135" y="55" fill="#f59e0b" fontSize="10">ϕ = cos⁻¹(x)</text>
                      {/* Equation summary */}
                      <rect x="230" y="35" width="155" height="75" rx="8" fill="#0f172a" stroke="#334155" />
                      <text x="307" y="55" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">Complement Theorem</text>
                      <text x="307" y="75" fill="#a5b4fc" fontSize="11" textAnchor="middle">θ + ϕ = 90° = π/2</text>
                      <text x="307" y="95" fill="#34d399" fontSize="10" textAnchor="middle">sin⁻¹(x) + cos⁻¹(x) ≡ π/2</text>
                    </motion.svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Ratio input x:</span>
                        <strong className="text-gold-400 font-mono">{trigX.toFixed(2)}</strong>
                      </div>
                      <input
                        type="range"
                        min="-1"
                        max="1"
                        step="0.05"
                        value={trigX}
                        onChange={e => handleTrigSliderChange(parseFloat(e.target.value))}
                        className="w-full accent-gold-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Ratio input x for inverse trig functions"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-slate-900 rounded-xl space-y-2 border border-slate-800 text-xs font-mono"
                    >
                      <div className="flex justify-between text-emerald-400">
                        <span>sin⁻¹({trigX.toFixed(2)}):</span>
                        <span>{asinVal.toFixed(4)} rad ({(asinVal * 180 / Math.PI).toFixed(1)}°)</span>
                      </div>
                      <div className="flex justify-between text-amber-400">
                        <span>cos⁻¹({trigX.toFixed(2)}):</span>
                        <span>{acosVal.toFixed(4)} rad ({(acosVal * 180 / Math.PI).toFixed(1)}°)</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-800 text-white font-bold text-sm">
                        <span>Sum [sin⁻¹x + cos⁻¹x]:</span>
                        <span className="text-gold-400">{(sumVal / Math.PI).toFixed(4)}π (= π/2)</span>
                      </div>
                    </motion.div>

                    {/* Observation Question */}
                    {!observationAnswered ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/50"
                      >
                        <p className="text-xs text-gold-300 font-semibold mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 mb-1 bg-slate-900 hover:bg-gold-900/60 rounded text-xs text-slate-200 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800"
                      >
                        ✓ Exactly! The sum never deviates from π/2 for any x ∈ [-1, 1].
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* SLIDE 1: Arctan Addition with TOPIC-SPECIFIC SVG DIAGRAM 2 */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {/* TOPIC-SPECIFIC SVG DIAGRAM 2: Tangent Branch Jump Barrier */}
                  <motion.svg
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    viewBox="0 0 500 120"
                    className="w-full bg-slate-900/80 rounded-xl border border-gold-900/60 p-2"
                  >
                    <text x="250" y="15" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">
                      SVG 2: The Tangent Addition Branch Boundary (xy = 1 Barrier)
                    </text>
                    {/* Region xy < 1 */}
                    <rect x="20" y="30" width="220" height="75" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
                    <text x="130" y="50" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">Region I: xy &lt; 1</text>
                    <text x="130" y="70" fill="#cbd5e1" fontSize="10" textAnchor="middle">tan⁻¹x + tan⁻¹y</text>
                    <text x="130" y="90" fill="#6ee7b7" fontSize="10" textAnchor="middle">= tan⁻¹((x + y) / (1 - xy))</text>

                    {/* Barrier */}
                    <line x1="250" y1="25" x2="250" y2="110" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="250" y="70" fill="#fda4af" fontSize="9" textAnchor="middle" transform="rotate(-90 250 70)">xy = 1 Barrier</text>

                    {/* Region xy > 1 */}
                    <rect x="260" y="30" width="220" height="75" rx="8" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="370" y="50" fill="#fb7185" fontSize="11" textAnchor="middle" fontWeight="bold">Region II: xy &gt; 1 (x, y &gt; 0)</text>
                    <text x="370" y="70" fill="#cbd5e1" fontSize="10" textAnchor="middle">Exceeds π/2 boundary</text>
                    <text x="370" y="90" fill="#fecdd3" fontSize="10" textAnchor="middle">= π + tan⁻¹((x + y) / (1 - xy))</text>
                  </motion.svg>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Slope x:</span>
                        <strong className="text-gold-400 font-mono">{tanX.toFixed(2)}</strong>
                      </div>
                      <input
                        type="range"
                        min="-3"
                        max="3"
                        step="0.1"
                        value={tanX}
                        onChange={e => handleTanSlidersChange(parseFloat(e.target.value), tanY)}
                        className="w-full accent-gold-400"
                      />
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Slope y:</span>
                        <strong className="text-gold-400 font-mono">{tanY.toFixed(2)}</strong>
                      </div>
                      <input
                        type="range"
                        min="-3"
                        max="3"
                        step="0.1"
                        value={tanY}
                        onChange={e => handleTanSlidersChange(tanX, parseFloat(e.target.value))}
                        className="w-full accent-gold-400"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2"
                  >
                    <div className="flex justify-between">
                      <span>Condition Check xy:</span>
                      <strong className={tanProduct < 1 ? 'text-emerald-400' : 'text-rose-400'}>
                        {tanProduct.toFixed(3)} {tanProduct < 1 ? '< 1 (Unadjusted Branch)' : '> 1 (Needs +π Phase Adjustment)'}
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>tan⁻¹({tanX.toFixed(2)}) + tan⁻¹({tanY.toFixed(2)}):</span>
                      <span className="text-gold-300 font-bold">{tanCombinedAngle.toFixed(4)} rad ({(tanCombinedAngle * 180 / Math.PI).toFixed(1)}°)</span>
                    </div>
                  </motion.div>

                  {/* Predict Check */}
                  {!predictionMade ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/50 space-y-2"
                    >
                      <p className="text-xs text-gold-300 font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePrediction(i)}
                          className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-slate-200 border border-slate-800"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-gold-950/60 rounded-xl border border-gold-700 text-xs text-gold-200"
                    >
                      💡 {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* SLIDE 2: Matrix Grid Editor & Equality Checker */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Matrix A */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-3">Matrix A (2 x 2)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {matA.map((row, r) =>
                          row.map((val, c) => (
                            <div key={`a-${r}-${c}`} className="flex flex-col">
                              <span className="text-[10px] text-slate-500 font-mono">a_{r + 1}{c + 1}</span>
                              <input
                                type="number"
                                value={val}
                                onChange={e => handleMatrixCellChange('A', r, c, parseFloat(e.target.value) || 0)}
                                className="bg-slate-950 border border-slate-700 rounded p-2 text-center text-sm font-bold text-gold-300"
                              />
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>

                    {/* Matrix B */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-3">Matrix B (2 x 2)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {matB.map((row, r) =>
                          row.map((val, c) => (
                            <div key={`b-${r}-${c}`} className="flex flex-col">
                              <span className="text-[10px] text-slate-500 font-mono">b_{r + 1}{c + 1}</span>
                              <input
                                type="number"
                                value={val}
                                onChange={e => handleMatrixCellChange('B', r, c, parseFloat(e.target.value) || 0)}
                                className="bg-slate-950 border border-slate-700 rounded p-2 text-center text-sm font-bold text-gold-300"
                              />
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    animate={{ scale: matricesEqual ? [1, 1.02, 1] : 1 }}
                    className={`p-4 rounded-xl border text-center font-bold text-sm ${
                      matricesEqual
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                        : 'bg-rose-950/60 border-rose-500 text-rose-300'
                    }`}
                  >
                    {matricesEqual
                      ? '✓ Matrix A = Matrix B (Orders equal & all a_ij = b_ij)'
                      : '✗ Matrix A ≠ Matrix B (Mismatch in corresponding cell entries)'}
                  </motion.div>
                </motion.div>
              )}

              {/* SLIDE 3: Matrix Transpose Animator */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <p className="text-xs text-slate-400">
                    Watch the reflection of off-diagonal elements across the yellow main diagonal line:
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-8 py-4">
                    {/* Matrix A */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-slate-900 rounded-2xl border border-slate-800 inline-block shadow-lg"
                    >
                      <span className="text-xs text-slate-400 block mb-2 font-mono">A (2 x 3)</span>
                      <table className="border-collapse font-mono text-base">
                        <tbody>
                          <tr>
                            <td className="p-3 text-amber-400 font-bold border-b border-r border-slate-800">1</td>
                            <td className="p-3 text-gold-300 border-b border-r border-slate-800">2</td>
                            <td className="p-3 text-gold-300 border-b border-slate-800">3</td>
                          </tr>
                          <tr>
                            <td className="p-3 text-gold-300 border-r border-slate-800">4</td>
                            <td className="p-3 text-amber-400 font-bold border-r border-slate-800">5</td>
                            <td className="p-3 text-gold-300">6</td>
                          </tr>
                        </tbody>
                      </table>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTransposeToggle}
                      className="px-4 py-2 bg-gold-600 hover:bg-gold-500 rounded-xl text-xs font-bold text-white shadow-lg"
                    >
                      ⇄ Transpose A
                    </motion.button>

                    {/* Transposed Matrix */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-slate-900 rounded-2xl border border-gold-700/60 inline-block shadow-lg"
                    >
                      <span className="text-xs text-gold-400 block mb-2 font-mono">Aᵀ (3 x 2)</span>
                      <table className="border-collapse font-mono text-base">
                        <tbody>
                          <tr>
                            <td className="p-3 text-amber-400 font-bold border-b border-r border-slate-800">1</td>
                            <td className="p-3 text-gold-300 border-b border-slate-800">4</td>
                          </tr>
                          <tr>
                            <td className="p-3 text-gold-300 border-b border-r border-slate-800">2</td>
                            <td className="p-3 text-amber-400 font-bold border-b border-slate-800">5</td>
                          </tr>
                          <tr>
                            <td className="p-3 text-gold-300 border-r border-slate-800">3</td>
                            <td className="p-3 text-gold-300">6</td>
                          </tr>
                        </tbody>
                      </table>
                    </motion.div>
                  </div>
                  <p className="text-xs text-slate-400">
                    Row 1 [1, 2, 3] becomes Column 1. The order flips from 2x3 to 3x2.
                  </p>
                </motion.div>
              )}

              {/* SLIDE 4: Symmetric & Skew-Symmetric Decomposition with TOPIC-SPECIFIC SVG DIAGRAM 3 */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {/* TOPIC-SPECIFIC SVG DIAGRAM 3: Symmetric & Skew Decomposition Geometry */}
                  <motion.svg
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    viewBox="0 0 500 130"
                    className="w-full bg-slate-900/80 rounded-xl border border-gold-900/60 p-2"
                  >
                    <text x="250" y="16" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">
                      SVG 3: Unique Theorem Decomposition A = S + K
                    </text>
                    {/* Matrix A Box */}
                    <rect x="20" y="32" width="120" height="85" rx="6" fill="#0f172a" stroke="#6366f1" />
                    <text x="80" y="52" fill="#818cf8" fontSize="11" textAnchor="middle" fontWeight="bold">Matrix A</text>
                    <text x="80" y="75" fill="#e2e8f0" fontSize="10" textAnchor="middle">Any square matrix</text>
                    <text x="80" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">Order n × n</text>

                    <text x="160" y="80" fill="#f8fafc" fontSize="18" fontWeight="bold">=</text>

                    {/* Symmetric Part */}
                    <rect x="180" y="32" width="135" height="85" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" />
                    <text x="247" y="52" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">Symmetric S</text>
                    <text x="247" y="72" fill="#a7f3d0" fontSize="10" textAnchor="middle">½(A + Aᵀ)</text>
                    <text x="247" y="92" fill="#6ee7b7" fontSize="9" textAnchor="middle">Sᵀ = S (Mirror pairs equal)</text>

                    <text x="335" y="80" fill="#f8fafc" fontSize="18" fontWeight="bold">+</text>

                    {/* Skew Part */}
                    <rect x="355" y="32" width="130" height="85" rx="6" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" />
                    <text x="420" y="52" fill="#fb7185" fontSize="11" textAnchor="middle" fontWeight="bold">Skew-Symmetric K</text>
                    <text x="420" y="72" fill="#fecdd3" fontSize="10" textAnchor="middle">½(A - Aᵀ)</text>
                    <text x="420" y="92" fill="#fda4af" fontSize="9" textAnchor="middle">Kᵀ = -K (Diagonal = 0)</text>
                  </motion.svg>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                    {/* Original Matrix Input */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block mb-2 font-bold font-sans">Matrix A (Editable)</span>
                      <div className="grid grid-cols-2 gap-2">
                        {decompA.map((row, r) =>
                          row.map((val, c) => (
                            <input
                              key={`dec-${r}-${c}`}
                              type="number"
                              value={val}
                              onChange={e => handleDecompMatrixChange(r, c, parseFloat(e.target.value) || 0)}
                              className="bg-slate-950 border border-slate-700 rounded p-2 text-center font-bold text-gold-300"
                            />
                          ))
                        )}
                      </div>
                    </motion.div>

                    {/* Symmetric Component */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800">
                      <span className="text-emerald-400 block mb-2 font-bold font-sans">Symmetric Part: ½(A + Aᵀ)</span>
                      <div className="grid grid-cols-2 gap-2 text-center p-2 bg-slate-950 rounded">
                        <div>{decompSymmetric[0][0]}</div>
                        <div>{decompSymmetric[0][1]}</div>
                        <div>{decompSymmetric[1][0]}</div>
                        <div>{decompSymmetric[1][1]}</div>
                      </div>
                      <span className="text-[10px] text-emerald-500 mt-2 block">Mirror pairs equal (s₁₂ = s₂₁)</span>
                    </motion.div>

                    {/* Skew-Symmetric Component */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-rose-950/40 rounded-xl border border-rose-800">
                      <span className="text-rose-400 block mb-2 font-bold font-sans">Skew Part: ½(A - Aᵀ)</span>
                      <div className="grid grid-cols-2 gap-2 text-center p-2 bg-slate-950 rounded">
                        <div className="text-amber-400 font-bold">{decompSkew[0][0]}</div>
                        <div>{decompSkew[0][1]}</div>
                        <div>{decompSkew[1][0]}</div>
                        <div className="text-amber-400 font-bold">{decompSkew[1][1]}</div>
                      </div>
                      <span className="text-[10px] text-rose-400 mt-2 block">Diagonal ALWAYS zero! (k₁₂ = -k₂₁)</span>
                    </motion.div>
                  </div>
                </motion.div>
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
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl font-semibold text-sm"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-500 font-mono">Step {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX / PLAYGROUND & MULTI-REPRESENTATION PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-gold-400">🧪</span> Ungraded Master Sandbox & Multi-Representation Lab
                </h3>
                <p className="text-xs text-slate-400">Explore concept representations across Geometric, Algebraic, and Graphical views.</p>
              </div>

              {/* Lab Mode Tabs */}
              <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('trig')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'trig' ? 'bg-gold-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Inverse Trig Lab
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('matrix')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'matrix' ? 'bg-gold-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Matrix Operations Lab
                </motion.button>
              </div>
            </div>

            {/* MULTI-REPRESENTATION SELECTOR (Geometric vs Algebraic vs Graphical) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-gold-300 flex items-center gap-1.5">
                  <span>📊</span> Multi-Representation View: Complement Identity (sin⁻¹x + cos⁻¹x = π/2)
                </span>
                <div className="flex gap-2">
                  {(['geometric', 'algebraic', 'graphical'] as const).map(mode => (
                    <motion.button
                      key={mode}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRepresentationMode(mode)}
                      className={`px-2.5 py-1 rounded text-[11px] capitalize font-semibold ${
                        representationMode === mode ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {mode} Mode
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {representationMode === 'geometric' && (
                  <motion.div
                    key="rep-geo"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
                  >
                    <div className="text-xs text-slate-300 space-y-2">
                      <p className="font-semibold text-emerald-400">Representation 1: Unit Circle Geometry</p>
                      <p>For any input ratio x in [-1, 1], the arc corresponding to sin⁻¹(x) measured from the positive x-axis and the arc for cos⁻¹(x) measured from the positive y-axis complement each other into a perfect right-angle quadrant arc of 90° (π/2 radians).</p>
                      <div className="p-2.5 bg-slate-900 rounded font-mono text-emerald-300">
                        Current x = {trigX.toFixed(2)} → Arc��: {asinVal.toFixed(3)} rad + Arc₂: {acosVal.toFixed(3)} rad = 1.571 rad (π/2)
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <svg viewBox="0 0 200 120" className="w-full max-w-xs bg-slate-900 rounded-lg p-2 border border-slate-800">
                        <circle cx="100" cy="90" r="70" fill="none" stroke="#334155" strokeWidth="2" />
                        <path d="M 100 90 L 160 90 A 70 70 0 0 0 145 35 Z" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.5" />
                        <path d="M 100 90 L 145 35 A 70 70 0 0 0 100 20 Z" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5" />
                        <line x1="100" y1="90" x2="100" y2="15" stroke="#94a3b8" strokeDasharray="2 2" />
                        <text x="135" y="80" fill="#34d399" fontSize="9">sin⁻¹x</text>
                        <text x="120" y="35" fill="#fbbf24" fontSize="9">cos⁻¹x</text>
                      </svg>
                    </div>
                  </motion.div>
                )}

                {representationMode === 'algebraic' && (
                  <motion.div
                    key="rep-alg"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 bg-slate-900 rounded-xl space-y-2 text-xs font-mono"
                  >
                    <p className="font-semibold text-gold-400 font-sans">Representation 2: Formal Algebraic Derivation</p>
                    <div className="space-y-1 text-slate-300">
                      <div>1. Let θ = sin⁻¹(x)  ⟹  x = sin(θ) for θ ∈ [-π/2, π/2]</div>
                      <div>2. Using co-function identity: x = cos(π/2 - θ)</div>
                      <div>3. Since -π/2 ≤ θ ≤ π/2  ⟹  0 ≤ π/2 - θ ≤ π (exact principal branch of arccos)</div>
                      <div>4. Therefore, cos⁻¹(x) = π/2 - θ = π/2 - sin⁻¹(x)</div>
                      <div className="text-emerald-400 font-bold pt-1">5. Q.E.D: sin⁻¹(x) + cos⁻¹(x) ≡ π/2, ∀ x ∈ [-1, 1]</div>
                    </div>
                  </motion.div>
                )}

                {representationMode === 'graphical' && (
                  <motion.div
                    key="rep-graph"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 bg-slate-900 rounded-xl space-y-2 text-xs"
                  >
                    <p className="font-semibold text-amber-400">Representation 3: Cartesian Function Graph View</p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="text-slate-300 space-y-1">
                        <p>Graph of y = sin⁻¹(x) is monotonically increasing from (-1, -π/2) to (1, π/2).</p>
                        <p>Graph of y = cos⁻¹(x) is monotonically decreasing from (-1, π) to (1, 0).</p>
                        <p className="text-gold-300 font-bold">Sum Graph y = sin⁻¹(x) + cos⁻¹(x) forms a perfectly horizontal line y = π/2 across [-1, 1].</p>
                      </div>
                      <svg viewBox="0 0 220 90" className="w-full max-w-xs bg-slate-950 rounded p-1 border border-slate-800">
                        <line x1="20" y1="45" x2="200" y2="45" stroke="#475569" strokeWidth="1" />
                        <line x1="110" y1="10" x2="110" y2="80" stroke="#475569" strokeWidth="1" />
                        {/* Horizontal sum line */}
                        <line x1="40" y1="25" x2="180" y2="25" stroke="#38bdf8" strokeWidth="2.5" />
                        <text x="185" y="28" fill="#38bdf8" fontSize="8" fontWeight="bold">y = π/2</text>
                        {/* arcsin curve */}
                        <path d="M 40 70 Q 110 45 180 20" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                        {/* arccos curve */}
                        <path d="M 40 10 Q 110 45 180 70" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === 'trig' ? (
                <motion.div
                  key="tab-trig"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800"
                >
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gold-300 uppercase">Double & Triple Angle Explorer</h4>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Single ratio x: {trigX.toFixed(2)}</label>
                      <input
                        type="range"
                        min="-0.95"
                        max="0.95"
                        step="0.05"
                        value={trigX}
                        onChange={e => handleTrigSliderChange(parseFloat(e.target.value))}
                        className="w-full accent-gold-400"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl space-y-1 font-mono text-xs text-slate-300">
                      <div>2sin⁻¹(x) = {Math.abs(trigX) <= 1 / Math.SQRT2 ? (2 * Math.asin(trigX)).toFixed(4) : 'Exceeds [-π/2, π/2]!'} rad</div>
                      <div>2tan⁻¹(x) = {(2 * Math.atan(trigX)).toFixed(4)} rad</div>
                      <div>3tan⁻¹(x) = {(3 * Math.atan(trigX)).toFixed(4)} rad</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gold-300 uppercase">Complementary Verification</h4>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                      <div className="text-emerald-400">sin⁻¹({trigX.toFixed(2)}) + cos⁻¹({trigX.toFixed(2)}) = {(asinVal + acosVal).toFixed(4)} rad</div>
                      <div className="text-amber-400">tan⁻¹({trigX.toFixed(2)}) + cot⁻¹({trigX.toFixed(2)}) = {(Math.atan(trigX) + (Math.PI / 2 - Math.atan(trigX))).toFixed(4)} rad</div>
                      <div className="text-gold-300 font-bold pt-2 border-t border-slate-800">Invariant π/2 = {(Math.PI / 2).toFixed(4)} rad</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="tab-matrix"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 font-bold uppercase">Scalar Multiple k = {scalarK}</span>
                      <input
                        type="range"
                        min="-4"
                        max="4"
                        step="1"
                        value={scalarK}
                        onChange={e => setScalarK(parseInt(e.target.value))}
                        className="w-28 accent-gold-400"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl text-center font-mono text-sm">
                      <span className="text-xs text-slate-500 block mb-1">Matrix {scalarK}A</span>
                      [[{scalarK * matA[0][0]}, {scalarK * matA[0][1]}], [{scalarK * matA[1][0]}, {scalarK * matA[1][1]}]]
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs text-slate-400 font-bold uppercase block">Sum Matrix (A + B)</span>
                    <div className="p-3 bg-slate-900 rounded-xl text-center font-mono text-sm text-emerald-300">
                      <span className="text-xs text-slate-500 block mb-1">Element-by-Element Sum</span>
                      [[{matA[0][0] + matB[0][0]}, {matA[0][1] + matB[0][1]}], [{matA[1][0] + matB[1][0]}, {matA[1][1] + matB[1][1]}]]
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30"
              >
                Ready for Graded Challenges →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── 4. ADAPTIVE CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress */}
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-slate-400 font-mono">
                Competency: <strong className="text-gold-400 uppercase">{challenge.competencyLevel}</strong>
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
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
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <p className="text-sm sm:text-base font-semibold text-white mb-6 leading-relaxed">{challenge.question}</p>

            {/* MCQ Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                          : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-750 text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-xs opacity-60 mr-2">[{String.fromCharCode(65 + i)}]</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label Option */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-semibold cursor-grab text-white"
                      role="button"
                      aria-label={`Draggable property: ${item.label}`}
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {[
                    { id: 'prop_comm', eq: 'A + B = B + A' },
                    { id: 'prop_id', eq: 'A + O = A' },
                    { id: 'prop_dist', eq: 'k(A + B) = kA + kB' },
                    { id: 'prop_inv', eq: 'A + (-A) = O' },
                  ].map(target => (
                    <motion.div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      whileHover={{ scale: 1.01 }}
                      className={`p-4 rounded-xl border flex flex-col justify-between min-h-[80px] ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500'
                          : 'bg-slate-950 border-slate-800 border-dashed'
                      }`}
                    >
                      <span className="text-slate-400 font-bold">{target.eq}</span>
                      <span className="text-gold-300 font-semibold">{droppedLabels[target.id] || 'Drop matching property label here'}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Verify Property Mapping
                </motion.button>
              </div>
            )}

            {/* Drag Sort Option */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder into correct logical sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3]).map((itemIdx, pos) => (
                    <motion.div
                      key={pos}
                      draggable
                      onDragStart={() => setDraggedItem(String(pos))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromPos = parseInt(draggedItem || '0');
                        handleSortMove(fromPos, pos);
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-mono font-bold text-gold-400">
                        {pos + 1}
                      </span>
                      <span>{challenge.sortItems![itemIdx]}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Verify Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter exact integer/decimal"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48"
                  aria-label="Numeric answer input"
                />
                <span className="text-xs text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-lg"
                >
                  Submit Answer
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gold-950/40 border border-gold-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-gold-300 font-bold text-xs">
                  <span>📘</span> Step-by-Step Rigorous Mathematical Proof:
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
                      className="text-slate-200 text-xs leading-relaxed"
                    >
                      <strong className="text-gold-400 font-mono">Step {idx + 1}:</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="text-xs font-bold text-gold-400 hover:text-gold-300 underline block pt-1"
                  >
                    Show next logical step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg flex items-center gap-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Score →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY PROFILE PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 rounded-3xl border border-gold-700/60 shadow-2xl text-center space-y-4"
          >
            <motion.h2
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-2xl sm:text-3xl font-extrabold text-white"
            >
              🏆 Module Mastery Achieved!
            </motion.h2>

            <div className="flex justify-center gap-6 py-2 font-mono">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[110px]"
              >
                <span className="text-[10px] text-slate-400 uppercase block">Accuracy Score</span>
                <span className="text-2xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[110px]"
              >
                <span className="text-[10px] text-slate-400 uppercase block">BKT Mastery</span>
                <span className="text-2xl font-bold text-gold-400 capitalize">{masteryLevel}</span>
              </motion.div>
            </div>

            {/* MOTIVATIONAL FEEDBACK BANNER (Exact requirement matching) */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`p-5 rounded-2xl border max-w-xl mx-auto shadow-lg text-center ${
                errors === 0
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                  : errors <= 3
                  ? 'bg-gold-950/70 border-gold-500 text-gold-300'
                  : errors <= 7
                  ? 'bg-amber-950/70 border-amber-500 text-amber-300'
                  : 'bg-rose-950/70 border-rose-500 text-rose-300'
              }`}
            >
              <motion.div
                initial={{ y: -5 }}
                animate={{ y: 0 }}
                className="text-xl sm:text-2xl font-black tracking-wide uppercase mb-1"
              >
                {motivationalMessage}
              </motion.div>
              <p className="text-xs text-slate-200">
                {errors === 0
                  ? 'You demonstrated complete mastery over inverse trigonometric boundary conditions and matrix decompositions!'
                  : errors <= 3
                  ? 'Your algebraic fundamentals and inverse geometric principles are very strong.'
                  : errors <= 7
                  ? 'Keep going! Reviewing your diagnostic feedback will bridge any remaining gaps.'
                  : 'Persistence builds mathematical strength! Revisit the interactive labs and master the rules.'}
              </p>
            </motion.div>
          </motion.div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3"
            >
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Diagnostics: Your Targeted Misconception Review
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs"
                    >
                      <p className="text-rose-300 font-semibold mb-1">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/50 flex items-center justify-between gap-4 text-xs"
          >
            <div>
              <span className="font-bold text-amber-300 block">🗓️ Recommended Spaced Review Schedule</span>
              <span className="text-slate-400">
                Next retrieval session due in{' '}
                <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to
                lock into long-term memory.
              </span>
            </div>
          </motion.div>

          {/* Real-World Activity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
          >
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>🚀</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="list-decimal list-inside space-y-1 text-xs text-slate-400 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      )}

      {/* Persistent Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_MathematicsInverseTrigPropertiesSim;
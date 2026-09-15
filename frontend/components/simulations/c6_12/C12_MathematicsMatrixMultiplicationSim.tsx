'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ISC Class 12 Mathematics) ───
const NODE_C12_MATH_021 = 'c12_math_021'; // Matrix multiplication
const NODE_C12_MATH_022 = 'c12_math_022'; // Non-commutativity & zero-product
const NODE_C12_MATH_023 = 'c12_math_023'; // Invertible matrices & uniqueness
const NODE_C12_MATH_024 = 'c12_math_024'; // Determinants (up to 3x3)
const NODE_C12_MATH_025 = 'c12_math_025'; // Minors & cofactors
const NODE_C12_MATH_026 = 'c12_math_026'; // Properties of determinants
const NODE_C12_MATH_027 = 'c12_math_027'; // Area of triangle via determinants
const NODE_C12_MATH_028 = 'c12_math_028'; // Adjoint of square matrix
const NODE_C12_MATH_029 = 'c12_math_029'; // Inverse via adjoint
const NODE_C12_MATH_030 = 'c12_math_030'; // Martin's Rule for linear systems

const ALL_NODE_IDS = [
  NODE_C12_MATH_021,
  NODE_C12_MATH_022,
  NODE_C12_MATH_023,
  NODE_C12_MATH_024,
  NODE_C12_MATH_025,
  NODE_C12_MATH_026,
  NODE_C12_MATH_027,
  NODE_C12_MATH_028,
  NODE_C12_MATH_029,
  NODE_C12_MATH_030,
];

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you swap the order of matrix multiplication from AB to BA for square matrices of the same dimension, will the resulting product matrix always remain the same?',
    options: [
      'No, matrix multiplication is generally non-commutative (AB ≠ BA)',
      'Yes, matrix multiplication is always commutative just like scalar multiplication',
      'Yes, provided both matrices have non-zero determinants',
      'No, BA is always completely undefined whenever AB is defined',
    ],
    correctIndex: 0,
    explanation: 'Matrix multiplication is fundamentally non-commutative. Rows of A dotted with columns of B produce completely different numerical terms than rows of B dotted with columns of A.',
    verifyInstruction: 'Go to Lab 2 and switch between Product AB and Product BA to observe how the resulting entries change entirely.',
  },
  {
    id: 'pred_2',
    question: 'What happens to the area of a triangle formed by three coordinate vertices if the 3×3 determinant formed by their coordinates evaluates to exactly 0?',
    options: [
      'The area becomes 0 because the three points are collinear (lie on a single straight line)',
      'The area becomes infinite because parallel lines never meet',
      'The area defaults to 1 square unit by convention',
      'The determinant has no geometric connection to spatial area',
    ],
    correctIndex: 0,
    explanation: 'Triangle Area is (1/2)|det|. When det = 0, the enclosed geometric area is exactly 0, which means all three points lie on the exact same straight line (collinear).',
    verifyInstruction: 'In Lab 4, move the vertex coordinates to form a straight diagonal line to watch the live determinant evaluate to 0 and area collapse to 0.',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS (What Do You Notice? Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In Lab 1, when computing the single matrix entry (AB)₁₂ via row-by-column dot product, which elements are paired and summed?',
    observableOptions: [
      'Elements of Row 1 of Matrix A multiplied term-by-term with Column 2 of Matrix B',
      'Elements of Column 1 of Matrix A multiplied with Row 2 of Matrix B',
      'Elements of Row 1 of Matrix A multiplied with Row 2 of Matrix B',
      'Main diagonal entries of A multiplied with main diagonal entries of B',
    ],
    correctIndex: 0,
    explanation: 'The entry at position (i, j) of product AB is formed exclusively by the dot product of Row i of Matrix A with Column j of Matrix B.',
  },
  {
    id: 'obs_2',
    question: 'In Lab 3, what pattern do you notice in the signs of the cofactors (-1)^(i+j) as you traverse across adjacent rows and columns?',
    observableOptions: [
      'The sign factor strictly alternates in a checkerboard pattern (+, -, +, ...)',
      'All signs across any single row always stay positive (+, +, +)',
      'The sign depends solely on whether the numerical element a_ij itself is negative',
      'All cofactors are negative except the bottom-right corner entry',
    ],
    correctIndex: 0,
    explanation: 'Because (-1)^(i+j) has exponent (i+j) alternating between even and odd with each single horizontal or vertical step, it generates an invariant checkerboard sign pattern.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Trajectory & Telemetry Engine',
  intro: 'You are the Flight Dynamics Systems Specialist at ISRO Telemetry, Tracking and Command Network (ISTRAC), Bengaluru. The guidance computer transforms lunar landing coordinate systems using matrix operations, determinants for spatial volume checks, and Martin’s Rule matrix inversions to solve simultaneous thruster output equations in real time.',
  context: 'A single arithmetic slip in matrix multiplication order or a cofactor sign error could divert the lander by hundreds of kilometres. Master matrix algebra and determinants to execute a flawless lunar touchdown!',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If Thruster Transformation Matrix A has dimension 2×3 and Telemetry Matrix B has dimension 3×2, what is the dimension of product AB versus BA?',
  options: [
    'AB is 2×2, BA is 3×3 (Both defined, but entirely different shapes!)',
    'AB and BA are both 2×2 and identical because multiplication commutes',
    'AB is 2×3 and BA is undefined because dimensions mismatch',
    'Both products equal a single scalar number',
  ],
  correctIndex: 0,
  hintAfter: "Surprising, right? In matrix algebra, order matters completely! AB is 2×2 while BA is 3×3. Let's explore why!",
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

// ─── 22 CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C12_MATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Two matrices A of order 3×2 and B of order 2×4 are multiplied. What is the order of product AB?',
    options: ['3×4', '2×2', '3×2', 'Multiplication is not defined'],
    correctIndex: 0,
    explanation: 'For A (m×n) and B (n×p), the inner dimensions n match (2 = 2), so the product AB exists and has outer dimensions m×p = 3×4.',
    hints: [
      'Write orders side by side: (3×2) × (2×4).',
      'Check if inner dimensions match. Yes, 2 = 2.',
      'The outer numbers give the final dimension: 3 rows by 4 columns.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_MATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Given matrix A = [[1, 2], [3, 4]], what is the correct value of A²?',
    options: [
      '[[7, 10], [15, 22]]',
      '[[1, 4], [9, 16]]',
      '[[1, 2], [3, 4]]',
      '[[2, 4], [6, 8]]',
    ],
    correctIndex: 0,
    explanation: 'A² = A × A. (1,1) entry is 1(1) + 2(3) = 7; (1,2) entry is 1(2) + 2(4) = 10; (2,1) is 3(1) + 4(3) = 15; (2,2) is 3(2) + 4(4) = 22. Element-wise squaring is an error flagged in CISCE 2020.',
    hints: [
      'Remember: A² is A multiplied by A using row-by-column dot products, NOT element squaring!',
      'Row 1 dot Column 1 is 1×1 + 2×3 = 7.',
      'Row 1 dot Column 2 is 1×2 + 2×4 = 10.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_MATH_025,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct cofactor sign factor (-1)^(i+j) onto the 3×3 sign board grid positions.',
    dragItems: [
      { label: '+ (Positive)', targetId: 'sign_11' },
      { label: '- (Negative)', targetId: 'sign_12' },
      { label: '+ (Positive)', targetId: 'sign_22' },
      { label: '- (Negative)', targetId: 'sign_21' },
    ],
    correctMapping: {
      sign_11: '+ (Positive)',
      sign_12: '- (Negative)',
      sign_22: '+ (Positive)',
      sign_21: '- (Negative)',
    },
    explanation: 'The sign factor (-1)^(i+j) creates a checkerboard pattern: + at (1,1) since 1+1=2 (even), - at (1,2) since 1+2=3 (odd), - at (2,1), and + at (2,2).',
    hints: [
      'Position (1,1) has i+j = 2 (even) -> +.',
      'Position (1,2) has i+j = 3 (odd) -> -.',
      'The sign alternates across rows and columns like a chessboard.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_MATH_024,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Evaluate the 2×2 determinant: |A| = |[4, 7], [2, 5]|. Enter the integer value.',
    correctAnswer: 6,
    tolerance: 0,
    unit: '',
    explanation: '|A| = (4)(5) - (7)(2) = 20 - 14 = 6. The determinant is main diagonal product minus anti-diagonal product.',
    hints: [
      'Use formula |A| = ad - bc.',
      'Here a=4, d=5, b=7, c=2.',
      'Compute 4×5 - 7×2 = 20 - 14 = 6.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_MATH_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If A and B are two non-zero matrices such that AB = 0 (the zero matrix), what does this prove about matrix algebra?',
    options: [
      'The zero product property does not hold in matrix algebra (AB=0 does not require A=0 or B=0)',
      'Either A or B must be the identity matrix',
      'Matrix multiplication is always commutative',
      'Both matrices must have determinant equal to 1',
    ],
    correctIndex: 0,
    explanation: 'Unlike real numbers where ab=0 forces a=0 or b=0, matrices can have orthogonal rows and columns producing AB = 0 even when neither A nor B is zero.',
    hints: [
      'Think about real numbers: if xy = 0, x=0 or y=0.',
      'Is that true for matrices? No! Rows of A can be perpendicular to columns of B.',
      'This proves that the standard scalar zero-product rule fails for matrices.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_MATH_029,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 4 steps to compute the inverse A⁻¹ of a square matrix A in the correct sequential order.',
    sortItems: [
      'Calculate determinant |A| and confirm |A| ≠ 0',
      'Compute all cofactors C_ij = (-1)^(i+j) M_ij',
      'Form cofactor matrix [C_ij] and transpose it to obtain adj(A)',
      'Divide adj(A) by scalar |A|: A⁻¹ = (1/|A|) adj(A)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Step 1: Check |A| ≠ 0 (if zero, inverse does not exist). Step 2: Compute cofactors. Step 3: Transpose cofactor matrix for adj(A). Step 4: Multiply by 1/|A|.',
    hints: [
      'First ensure the matrix is invertible (|A| ≠ 0).',
      'Next compute all minors and cofactors.',
      'Remember: adjoint is transpose of cofactors, then divide by |A|.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_MATH_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If the determinant formed by three coordinate vertices [[x1, y1, 1], [x2, y2, 1], [x3, y3, 1]] equals 0, what is the geometric relationship between the three points?',
    options: [
      'The three points are collinear (lie on a single straight line, area = 0)',
      'The three points form an equilateral triangle',
      'The points are vertices of a right-angled triangle',
      'The points must all lie at the origin (0,0)',
    ],
    correctIndex: 0,
    explanation: 'Area = (1/2)|det|. When det = 0, enclosed area is 0, which means the three points are collinear.',
    hints: [
      'Triangle Area = (1/2)|det|.',
      'If Area = 0, the triangle has flattened completely.',
      'Flattened points lie on the same straight line (collinear).',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_MATH_027,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISRO telemetry tracking triangle has ground antennas at P(1, 1), Q(4, 5), and R(7, 1) in km. Using determinant formula, find the area of triangle PQR in sq km.',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'sq km',
    explanation: 'det = 1(5-1) - 1(4-7) + 1(4(1) - 5(7)) = 1(4) - 1(-3) + 1(4 - 35) = 4 + 3 - 31 = -24. Area = (1/2)|-24| = 12 sq km.',
    hints: [
      'Set up 3×3 determinant with rows [1, 1, 1], [4, 5, 1], [7, 1, 1].',
      'Expand along row 1: 1(5-1) - 1(4-7) + 1(4-35) = 4 + 3 - 31 = -24.',
      'Take (1/2) of absolute value: (1/2) × 24 = 12.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_MATH_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For matrix A = [[3, 5], [1, 2]], which of the following is the adjoint matrix adj(A)?',
    options: [
      '[[2, -5], [-1, 3]]',
      '[[-2, 5], [1, -3]]',
      '[[3, -5], [-1, 2]]',
      '[[2, 5], [1, 3]]',
    ],
    correctIndex: 0,
    explanation: 'For a 2×2 matrix [[a, b], [c, d]], adj(A) = [[d, -b], [-c, a]]. Swap diagonal entries (3 and 2 -> 2 and 3) and negate off-diagonal (5, 1 -> -5, -1). Result: [[2, -5], [-1, 3]].',
    hints: [
      'Remember the 2×2 shortcut: swap main diagonal elements.',
      'Change signs of anti-diagonal elements.',
      'a=3, d=2 become d=2, a=3; b=5, c=1 become -5, -1.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_MATH_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'If A is a 3×3 matrix with |A| = 5, what is the value of |2A|?',
    options: ['40', '10', '20', '50'],
    correctIndex: 0,
    explanation: 'For an n×n matrix, |kA| = kⁿ |A|. For n=3 and k=2, |2A| = 2³ |A| = 8 × 5 = 40. Scaling a 3×3 matrix scales each of its 3 rows by 2.',
    hints: [
      'Scalar multiplication of the whole matrix multiplies EVERY row by 2.',
      'Each row pulled out contributes a factor of 2: 2 × 2 × 2 = 2³.',
      'Compute 2³ × 5 = 8 × 5 = 40.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_MATH_023,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the formal algebraic steps proving uniqueness of matrix inverse: start with B and show B = C.',
    availableParts: ['B = BI', 'B = B(AC)', 'B = (BA)C', 'B = IC', 'B = C'],
    targetState: 'B = BI B = B(AC) B = (BA)C B = IC B = C',
    validationHint: 'Use identity, substitute I=AC, apply associativity, substitute BA=I, conclude B=C.',
    explanation: 'B = BI (identity) -> B = B(AC) (since AC=I) -> B = (BA)C (associativity) -> B = IC (since BA=I) -> B = C (identity). This proves uniqueness.',
    hints: [
      'Start with B = BI.',
      'Replace I with AC since C is an inverse.',
      'Regroup using associativity: (BA)C, then replace BA with I to get IC = C.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_MATH_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Given matrices A = [[1, 1], [-1, -1]] and B = [[1, -1], [-1, 1]], compute AB. What is the result?',
    options: [
      '[[0, 0], [0, 0]] (Zero matrix, showing non-zero factors can give zero product)',
      '[[2, 0], [0, 2]]',
      '[[1, 0], [0, 1]] (Identity matrix)',
      '[[0, -2], [-2, 0]]',
    ],
    correctIndex: 0,
    explanation: 'Row 1 dot Col 1 = 1(1) + 1(-1) = 0. Row 1 dot Col 2 = 1(-1) + 1(1) = 0. Row 2 dot Col 1 = -1(1) + -1(-1) = 0. Row 2 dot Col 2 = -1(-1) + -1(1) = 0. AB = 0.',
    hints: [
      'Perform dot products row by column.',
      'Check (1,1): 1×1 + 1×(-1) = 1 - 1 = 0.',
      'Check (1,2): 1×(-1) + 1×1 = -1 + 1 = 0. Every entry becomes 0!',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_MATH_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve linear system x + 2y = 5 and 3x - y = 1 using Martin’s Rule. What is the value of x?',
    correctAnswer: 1,
    tolerance: 0,
    unit: '',
    explanation: '|A| = 1(-1) - 2(3) = -7. A⁻¹ = (1/-7)[[-1, -2], [-3, 1]] = [[1/7, 2/7], [3/7, -1/7]]. X = A⁻¹B = [[1/7, 2/7], [3/7, -1/7]] [[5], [1]] = [[(5+2)/7], [(15-1)/7]] = [[1], [2]]. So x = 1, y = 2.',
    hints: [
      'Set up AX = B: A = [[1, 2], [3, -1]], B = [[5], [1]].',
      'Compute |A| = -1 - 6 = -7.',
      'x = (1×5 + 2×1)/7 = 7/7 = 1.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C12_MATH_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A student claims that (A + B)⁻¹ = A⁻¹ + B⁻¹. Evaluate this claim with mathematical rigor.',
    options: [
      'False — matrix inversion does not distribute over addition; counterexample A=I, B=I gives (2I)⁻¹ = 0.5I ≠ I + I',
      'True — inversion distributes linearly over all matrix operations',
      'True only when both A and B have positive determinant',
      'False only if A and B are rectangular',
    ],
    correctIndex: 0,
    explanation: 'Matrix inversion is a multiplicative operation, not additive. For A=I, B=I, (A+B)⁻¹ = (2I)⁻¹ = 0.5I, whereas A⁻¹ + B⁻¹ = I + I = 2I. 0.5I ≠ 2I.',
    hints: [
      'Test with the simplest matrix: A = I, B = I.',
      '(I + I)⁻¹ = (2I)⁻¹ = (1/2)I.',
      'I⁻¹ + I⁻¹ = I + I = 2I. (1/2)I ≠ 2I, so the claim is completely false.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C12_MATH_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Evaluate the Vandermonde determinant |[1, 1, 1], [a, b, c], [a², b², c²]| using determinant properties.',
    options: [
      '(a - b)(b - c)(c - a)',
      '(a + b)(b + c)(c + a)',
      'a³ + b³ + c³ - 3abc',
      '0 for all distinct values of a, b, c',
    ],
    correctIndex: 0,
    explanation: 'Applying C2 -> C2 - C1 and C3 -> C3 - C1 allows factoring (b-a) and (c-a). Expanding along row 1 gives (b-a)(c-a)(c-b) = (a-b)(b-c)(c-a).',
    hints: [
      'Use column operations: C2 -> C2 - C1, C3 -> C3 - C1.',
      'Factor (b-a) from col 2 and (c-a) from col 3.',
      'Expand row 1 to get (a-b)(b-c)(c-a).',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C12_MATH_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In ISRO propellant balancing, x + y + z = 6, 2x - y + z = 3, x + 2y - z = 2. Solve via Martin’s Rule and find z (amount in kilolitres).',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'kL',
    explanation: 'Determinant |A| = 7. Using A⁻¹ = (1/7) adj(A), X = A⁻¹ B = (1/7)[[7], [14], [21]] = [[1], [2], [3]]. Thus x=1, y=2, z=3.',
    hints: [
      'Write in matrix form AX = B with A = [[1,1,1],[2,-1,1],[1,2,-1]] and B = [[6],[3],[2]].',
      '|A| = 1(1-2) - 1(-2-1) + 1(4+1) = -1 + 3 + 5 = 7.',
      'Multiply row 3 of adj(A) with B: (5×6 + -1×3 + -3×2)/7 = (30 - 3 - 6)/7 = 21/7 = 3.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_MATH_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If A is a 3×3 matrix with |A| = 4, what is the determinant of its adjoint matrix |adj(A)|?',
    options: ['16', '4', '64', '1/4'],
    correctIndex: 0,
    explanation: 'For any n×n matrix, |adj(A)| = |A|^(n-1). For n=3 and |A|=4, |adj(A)| = 4^(3-1) = 4² = 16.',
    hints: [
      'Recall identity: A × adj(A) = |A| I.',
      'Take determinants on both sides: |A| |adj(A)| = | |A| I | = |A|ⁿ |I| = |A|ⁿ.',
      'Divide by |A|: |adj(A)| = |A|^(n-1) = 4² = 16.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C12_MATH_027,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Find the value of k such that the points (k, 0), (3, 4), and (5, 6) lie on the same straight satellite tracking trajectory (collinear).',
    correctAnswer: -1,
    tolerance: 0,
    unit: '',
    explanation: 'Set det |[k, 0, 1], [3, 4, 1], [5, 6, 1]| = 0. Expanding: k(4 - 6) - 0 + 1(18 - 20) = -2k - 2 = 0 -> -2k = 2 -> k = -1.',
    hints: [
      'For collinearity, set the 3��3 determinant equal to zero.',
      'det = k(4 - 6) - 0(3 - 5) + 1(18 - 20) = -2k - 2.',
      '-2k - 2 = 0 implies k = -1.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_MATH_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which of the following represents the reversal law for matrix inverse of product (AB)⁻¹?',
    options: [
      '(AB)⁻¹ = B⁻¹ A⁻¹ (Order must be reversed)',
      '(AB)⁻¹ = A⁻¹ B⁻¹',
      '(AB)⁻¹ = (BA)⁻¹',
      '(AB)⁻¹ = A⁻¹ + B⁻¹',
    ],
    correctIndex: 0,
    explanation: '(AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = A(I)A⁻¹ = AA⁻¹ = I. Because matrix multiplication does not commute, the operations must be undone in reverse order: B⁻¹ first, then A⁻¹.',
    hints: [
      'Think of putting on socks then shoes: to undo, you must take off shoes first, then socks!',
      'Multiply (AB) by (B⁻¹ A⁻¹): middle terms BB⁻¹ collapse to I.',
      'Therefore (AB)⁻¹ = B⁻¹ A⁻¹.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C12_MATH_025,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'For matrix A = [[2, 1, 3], [4, 0, -1], [2, 5, 1]], find the cofactor C₂₁ of element a₂₁ = 4.',
    correctAnswer: 14,
    tolerance: 0,
    unit: '',
    explanation: 'Minor M₂₁ = det |[1, 3], [5, 1]| = 1(1) - 3(5) = 1 - 15 = -14. Sign factor (-1)^(2+1) = -1. Cofactor C₂₁ = (-1) × (-14) = +14.',
    hints: [
      'Delete row 2 and column 1 from matrix A.',
      'The remaining 2×2 submatrix is [[1, 3], [5, 1]]. Minor = 1 - 15 = -14.',
      'Apply sign (-1)^(2+1) = -1. Cofactor C₂₁ = -(-14) = +14.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C12_MATH_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A candidate encounters system AX = B where |A| = 0 and immediately reports "The system has no solution". Why is this conclusion incomplete and potentially wrong?',
    options: [
      '|A| = 0 only means no UNIQUE solution; the system could either have NO solution or INFINITELY many solutions depending on (adj A)B',
      '|A| = 0 always guarantees infinitely many solutions, never no solution',
      'Martin’s Rule can still be applied by dividing by zero',
      'The determinant of a system can never equal zero',
    ],
    correctIndex: 0,
    explanation: 'When |A| = 0, the system lacks a unique inverse solution. If (adj A)B ≠ 0, it is inconsistent (no solution). If (adj A)B = 0, it is consistent with infinitely many solutions.',
    hints: [
      'Does determinant zero mean zero solutions or infinite solutions?',
      'Geometrically, two parallel planes have no solution, but two identical planes have infinitely many.',
      'Therefore, |A| = 0 means NO UNIQUE solution, requiring consistency checks with (adj A)B.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C12_MATH_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under what specific conditions do two square matrices A and B commute such that AB = BA?',
    options: [
      'When one is the identity matrix I, a scalar matrix, or when B is an integer power/inverse of A',
      'For all symmetric matrices of the same order',
      'Whenever both matrices have positive integer entries',
      'Only when both matrices are zero matrices',
    ],
    correctIndex: 0,
    explanation: 'While matrix multiplication is generally non-commutative, commutativity holds in special algebraic cases: scalar multiples of identity, powers Aⁿ, and inverses A⁻¹.',
    hints: [
      'Recall: AI = IA = A for the identity matrix.',
      'A × A² = A² × A = A³.',
      'Thus scalar matrices, identity, powers, and inverse commute with A.',
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
  nodeId: NODE_C12_MATH_021,
  title: 'Matrix Algebra, Determinants & Linear Inversion',
  definition:
    'Matrix multiplication combines rows of A with columns of B via dot products when inner dimensions match. Determinants assign a scalar value to square matrices, enabling area computation, singularity testing, adjoint construction, matrix inversion via A⁻�� = adj(A)/|A|, and solving linear systems AX = B via Martin’s Rule X = A⁻¹B.',
  eli5: 'Think of matrices as transformation boxes. Matrix multiplication chains operations, determinants measure how much volume scales (or if it collapses to zero!), the adjoint flips and balances cofactors, and the inverse is the master key that reverses transformations to solve simultaneous equations.',
  misconceptions: [
    {
      misconception: 'To square a matrix A², you just square each individual element.',
      correction: 'A² means A × A using row-by-column dot products. For [[1,2],[3,4]], A² is [[7,10],[15,22]], NOT [[1,4],[9,16]].',
    },
    {
      misconception: 'Minors and cofactors are identical.',
      correction: 'A minor M_ij is the raw sub-determinant. The cofactor C_ij includes the checkerboard sign factor (-1)^(i+j).',
    },
    {
      misconception: 'The 2×2 determinant is ad + bc.',
      correction: 'The formula is ad - bc (main diagonal minus anti-diagonal).',
    },
    {
      misconception: 'If AB = 0, then either A = 0 or B = 0.',
      correction: 'In matrix algebra, two non-zero matrices can multiply to the zero matrix if rows of A are orthogonal to columns of B.',
    },
    {
      misconception: 'Multiplying a 3×3 matrix by 2 doubles its determinant (|2A| = 2|A|).',
      correction: 'Each of the 3 rows is scaled by 2, so |2A| = 2³ |A| = 8|A|.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the condition for product AB to be defined?', options: ['Columns of A = Rows of B', 'Rows of A = Columns of B', 'Both matrices must be square', 'Determinant must be non-zero'], correctIndex: 0 },
    { question: 'Is matrix multiplication commutative in general?', options: ['No, AB ≠ BA in general', 'Yes, always', 'Only for 2×2 matrices', 'Only for odd dimension matrices'], correctIndex: 0 },
    { question: 'What is the determinant of a 2×2 singular matrix?', options: ['0', '1', '-1', 'Infinity'], correctIndex: 0 },
    { question: 'What is the formula for matrix inverse via adjoint?', options: ['A⁻¹ = adj(A) / |A|', 'A⁻¹ = |A| / adj(A)', 'A⁻¹ = adj(A) × |A|', 'A⁻¹ = Transpose(A) / |A|'], correctIndex: 0 },
    { question: 'What is the determinant formula for triangle area with vertices (x1,y1), (x2,y2), (x3,y3)?', options: ['(1/2) |det [[x1,y1,1],[x2,y2,1],[x3,y3,1]]|', 'det [[x1,y1],[x2,y2]]', '(1/2) (x1y1 + x2y2 + x3y3)', 'det [[x1,y1,0],[x2,y2,0],[x3,y3,1]]'], correctIndex: 0 },
    { question: 'In Martin’s Rule AX = B, what is the solution matrix X?', options: ['X = A⁻¹ B', 'X = B A⁻¹', 'X = adj(A) B', 'X = B / |A|'], correctIndex: 0 },
    { question: 'What is the cofactor sign of position (2, 3)?', options: ['- (Negative)', '+ (Positive)', '0', 'Depends on matrix entries'], correctIndex: 0 },
    { question: 'If |A| = 3 for a 2×2 matrix, what is |adj(A)|?', options: ['3', '9', '1/3', '6'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student understands matrix dot product multiplication, non-commutativity, determinant evaluation, area formula, adjoint and inverse construction, and solving linear systems via Martin’s Rule.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Row × Column Dot Product Engine',
    instruction: 'Click different rows of Matrix A and columns of Matrix B to watch the dot product compute in real time.',
    interactionType: 'matrix-dot-product',
    nodeId: NODE_C12_MATH_021,
  },
  {
    title: 'Lab 2: Non-Commutativity & Orthogonal Zero Product',
    instruction: 'Toggle between AB and BA, or test the Orthogonal Zero-Product pair to see non-zero matrices yield zeros.',
    interactionType: 'commutativity-zero-product',
    nodeId: NODE_C12_MATH_022,
  },
  {
    title: 'Lab 3: 3×3 Determinant & Checkerboard Cofactors',
    instruction: 'Select any entry a_ij to see its deleted row/column, 2×2 submatrix minor M_ij, and signed cofactor C_ij.',
    interactionType: 'cofactor-checkerboard',
    nodeId: NODE_C12_MATH_025,
  },
  {
    title: 'Lab 4: Geometric Triangle Area & Collinearity Plane',
    instruction: 'Drag triangle vertex pins A, B, or C across the radar grid. Watch the 3×3 determinant and area update live!',
    interactionType: 'triangle-area-interactive',
    nodeId: NODE_C12_MATH_027,
  },
  {
    title: 'Lab 5: Martin’s Rule Telemetry Thruster Solver',
    instruction: 'Adjust satellite thruster targets [d1, d2] to see Martin’s Rule X = A⁻¹B solve linear coordinates instantly.',
    interactionType: 'martins-rule-solver',
    nodeId: NODE_C12_MATH_030,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Flight Dynamics Trajectory Challenge',
  description: 'Design a 2×2 thrust reorientation matrix T for the Chandrayaan-4 lander such that det(T) = 1 (pure rotation preserving area/volume). Compute its inverse T⁻¹ and demonstrate that T T⁻¹ = I to ensure reversible attitude control.',
  steps: [
    'Choose an angle θ = 30° with matrix entries [cos 30°, -sin 30°; sin 30°, cos 30°].',
    'Calculate determinant |T| = cos² 30° - (-sin² 30°) = 1.',
    'Form adj(T) by swapping diagonal elements and changing signs of off-diagonal.',
    'Verify that T⁻¹ = adj(T)/1 restores original telemetry orientation [x, y]^T.',
  ],
};

function C12_MathematicsMatrixMultiplicationSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');

  // ─── PREDICTION & OBSERVATION STATE ───
  const [currentPredictionIdx, setCurrentPredictionIdx] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  const [currentObservationIdx, setCurrentObservationIdx] = useState(0);
  const [observationSelected, setObservationSelected] = useState<number | null>(null);
  const [observationSubmitted, setObservationSubmitted] = useState(false);

  // ─── INTERACTIVE LAB 1: MATRIX MULTIPLICATION STATE ───
  const [selectedRowA, setSelectedRowA] = useState(0);
  const [selectedColB, setSelectedColB] = useState(0);
  const [matA, setMatA] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  const [matB, setMatB] = useState<number[][]>([
    [7, 8],
    [9, 1],
    [2, 3],
  ]);

  // ─── INTERACTIVE LAB 2: COMMUTATIVITY & ZERO PRODUCT STATE ───
  const [lab2Mode, setLab2Mode] = useState<'standard' | 'zeroProduct'>('standard');

  // ─── INTERACTIVE LAB 3: 3×3 DETERMINANT & COFACTOR STATE ───
  const [selectedMinorRow, setSelectedMinorRow] = useState(0);
  const [selectedMinorCol, setSelectedMinorCol] = useState(0);
  const [mat3x3, setMat3x3] = useState<number[][]>([
    [2, 1, 3],
    [4, 0, -1],
    [2, 5, 1],
  ]);

  // ─── INTERACTIVE LAB 4: GEOMETRIC TRIANGLE VERTICES STATE ───
  const [vertexA, setVertexA] = useState<{ x: number; y: number }>({ x: 1, y: 1 });
  const [vertexB, setVertexB] = useState<{ x: number; y: number }>({ x: 5, y: 7 });
  const [vertexC, setVertexC] = useState<{ x: number; y: number }>({ x: 8, y: 2 });

  // ─── INTERACTIVE LAB 5: MARTIN'S RULE SOLVER STATE ───
  const [bConst1, setBConst1] = useState(5);
  const [bConst2, setBConst2] = useState(4);
  const [martinA11, setMartinA11] = useState(1);
  const [martinA12, setMartinA12] = useState(2);
  const [martinA21, setMartinA21] = useState(3);
  const [martinA22, setMartinA22] = useState(-1);

  // ─── SANDBOX INTERACTION STATE ───
  const [sandboxA, setSandboxA] = useState(2);
  const [sandboxB, setSandboxB] = useState(3);
  const [sandboxC, setSandboxC] = useState(1);
  const [sandboxD, setSandboxD] = useState(4);

  // ─── SCORING & HINTS STATE ───
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DRAG & DROP / CONSTRUCT / NUMERIC STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── REFLECTION STATE ───
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // ─── FEEDBACK VISUALS STATE ──���
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // ─── BKT & TIMERS REFS ───
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

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C12_MATH_021);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL TIME COMPUTATIONS FOR LAB 1 ───
  const computedProductMat = useMemo(() => {
    const rowsA = matA.length;
    const colsA = matA[0].length;
    const colsB = matB[0].length;
    const result: number[][] = Array.from({ length: rowsA }, () => Array(colsB).fill(0));
    for (let r = 0; r < rowsA; r++) {
      for (let c = 0; c < colsB; c++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += matA[r][k] * matB[k][c];
        }
        result[r][c] = sum;
      }
    }
    return result;
  }, [matA, matB]);

  const currentDotProductBreakdown = useMemo(() => {
    const r = selectedRowA;
    const c = selectedColB;
    const terms: string[] = [];
    let sum = 0;
    for (let k = 0; k < matA[0].length; k++) {
      const aVal = matA[r][k];
      const bVal = matB[k][c];
      const prod = aVal * bVal;
      sum += prod;
      terms.push(`(${aVal} × ${bVal})`);
    }
    return {
      formula: terms.join(' + ') + ` = ${sum}`,
      value: sum,
    };
  }, [matA, matB, selectedRowA, selectedColB]);

  // ─── REAL TIME COMPUTATIONS FOR LAB 3 (COFACTORS) ───
  const currentSubmatrix = useMemo(() => {
    const r = selectedMinorRow;
    const c = selectedMinorCol;
    const sub: number[][] = [];
    for (let i = 0; i < 3; i++) {
      if (i === r) continue;
      const rowVals: number[] = [];
      for (let j = 0; j < 3; j++) {
        if (j === c) continue;
        rowVals.push(mat3x3[i][j]);
      }
      sub.push(rowVals);
    }
    const minorVal = sub[0][0] * sub[1][1] - sub[0][1] * sub[1][0];
    const sign = (r + c) % 2 === 0 ? 1 : -1;
    const cofactorVal = sign * minorVal;
    return { sub, minorVal, sign, cofactorVal };
  }, [mat3x3, selectedMinorRow, selectedMinorCol]);

  // ─── REAL TIME COMPUTATIONS FOR LAB 4 (TRIANGLE AREA) ───
  const triangleAreaCalc = useMemo(() => {
    const det =
      vertexA.x * (vertexB.y - vertexC.y) +
      vertexB.x * (vertexC.y - vertexA.y) +
      vertexC.x * (vertexA.y - vertexB.y);
    const area = 0.5 * Math.abs(det);
    const isCollinear = Math.abs(det) < 0.001;
    return { det, area, isCollinear };
  }, [vertexA, vertexB, vertexC]);

  // ─── REAL TIME COMPUTATIONS FOR LAB 5 (MARTIN'S RULE) ───
  const martinsSolution = useMemo(() => {
    const det = martinA11 * martinA22 - martinA12 * martinA21;
    if (Math.abs(det) < 0.0001) {
      return { det: 0, invertible: false, x: 0, y: 0 };
    }
    const inv11 = martinA22 / det;
    const inv12 = -martinA12 / det;
    const inv21 = -martinA21 / det;
    const inv22 = martinA11 / det;

    const solX = inv11 * bConst1 + inv12 * bConst2;
    const solY = inv21 * bConst1 + inv22 * bConst2;
    return { det, invertible: true, x: solX, y: solY, inv11, inv12, inv21, inv22 };
  }, [martinA11, martinA12, martinA21, martinA22, bConst1, bConst2]);

  // ─── SANDBOX COMPUTATIONS ───
  const sandboxDet = useMemo(() => {
    return sandboxA * sandboxD - sandboxB * sandboxC;
  }, [sandboxA, sandboxB, sandboxC, sandboxD]);

  // ─── HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

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
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, activeChallenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent spatial intuition! Matrix dimensions determine conformability.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToPredictions = useCallback(() => {
    setPhase('predict');
    setCurrentPredictionIdx(0);
    setPredictionSelected(null);
    setPredictionSubmitted(false);
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Explore each concept hands-on!');
  }, []);

  const handleAdvanceToObservation = useCallback(() => {
    setPhase('observe');
    setCurrentObservationIdx(0);
    setObservationSelected(null);
    setObservationSubmitted(false);
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Change matrix values freely without scoring.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Solve CISCE-style competency questions.');
  }, []);

  const handleMatrixCellClick = useCallback((r: number, c: number) => {
    setSelectedRowA(r);
    setSelectedColB(c);
    audioManager.play('tap');
  }, []);

  const handleMinorCellSelect = useCallback((r: number, c: number) => {
    setSelectedMinorRow(r);
    setSelectedMinorCol(c);
    audioManager.play('tap');
  }, []);

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

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let arr = prev.length === activeChallenge.sortItems?.length ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [activeChallenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Trajectory calibration complete! Flawless lunar touchdown.');
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

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well done.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
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
          speechManager.speak('Let us study the complete step-by-step matrix derivation.');
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

  // ─── 2D CANVAS TELEMETRY ORBIT ANIMATION EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 35;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius + 20, radius, 0.2, 0, Math.PI * 2);
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 2;
      ctx.stroke();

      const angle = frame * 0.03;
      const satX = centerX + (radius + 20) * Math.cos(angle);
      const satY = centerY + radius * Math.sin(angle);

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(satX, satY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CLEANUP TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <motion.span
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700 inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 12 ISC • Mathematics</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700"
              >
                CISCE 2026 Aligned
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                : 'bg-indigo-950/80 text-indigo-300 border-indigo-600'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-right text-xs"
          >
            <span className="text-slate-400 block">Mastery Level</span>
            <span className="font-bold text-amber-400 capitalize">{masteryLevel}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🚀</span>
              <h2 className="text-lg font-bold text-indigo-300">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-amber-300"
            >
              ⚡ <strong>Mission Directive:</strong> {SCENARIO.context}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center"
          >
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 self-start">
              Telemetry Dimension Mapping Diagram
            </span>
            <svg viewBox="0 0 560 120" className="w-full max-w-lg bg-slate-950 rounded-xl border border-slate-800 p-2">
              <rect x="20" y="25" width="120" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
              <text x="80" y="52" fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="middle">Matrix A</text>
              <text x="80" y="74" fill="#818cf8" fontSize="14" fontWeight="bold" textAnchor="middle">2 × [3]</text>

              <text x="170" y="66" fill="#94a3b8" fontSize="20" fontWeight="bold" textAnchor="middle">×</text>

              <rect x="200" y="25" width="120" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="260" y="52" fill="#6ee7b7" fontSize="13" fontWeight="bold" textAnchor="middle">Matrix B</text>
              <text x="260" y="74" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">[3] × 2</text>

              <path d="M 335 60 L 375 60" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="355" y="50" fill="#fbbf24" fontSize="11" textAnchor="middle">Inner match!</text>

              <rect x="390" y="25" width="150" height="70" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
              <text x="465" y="52" fill="#fde68a" fontSize="13" fontWeight="bold" textAnchor="middle">Product AB</text>
              <text x="465" y="74" fill="#fbbf24" fontSize="14" fontWeight="bold" textAnchor="middle">2 × 2 Result</text>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
          >
            <span className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Curiosity Diagnostic Hook</span>
            <p className="text-base font-semibold text-white mt-2 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800 border-slate-700 hover:border-indigo-500 text-slate-200 hover:bg-slate-750'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '🎯 Perfect intuition! 2×3 times 3×2 produces 2×2, while 3×2 times 2×3 produces 3×3!'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToPredictions}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 text-sm flex items-center gap-2"
                >
                  Start Hypothesizing (Predict-Then-Check) →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE: PREDICTION QUESTIONS (Predict-Then-Check Pattern) ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Prediction Hypothesis {currentPredictionIdx + 1} of {PREDICTION_QUESTIONS.length}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700">
                Predict Before Testing
              </span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white">
              {PREDICTION_QUESTIONS[currentPredictionIdx].question}
            </h3>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {PREDICTION_QUESTIONS[currentPredictionIdx].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => !predictionSubmitted && setPredictionSelected(idx)}
                  className={`p-3.5 text-left rounded-xl text-sm transition-all border ${
                    predictionSelected === idx
                      ? 'bg-indigo-950/90 border-indigo-500 text-indigo-200'
                      : 'bg-slate-800 border-slate-700 hover:border-indigo-400 text-slate-200'
                  } ${predictionSubmitted && idx === PREDICTION_QUESTIONS[currentPredictionIdx].correctIndex ? 'ring-2 ring-emerald-500 bg-emerald-950/40 text-emerald-200' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            {!predictionSubmitted ? (
              <div className="pt-3">
                <button
                  onClick={() => {
                    if (predictionSelected !== null) {
                      setPredictionSubmitted(true);
                      audioManager.play(
                        predictionSelected === PREDICTION_QUESTIONS[currentPredictionIdx].correctIndex
                          ? 'success'
                          : 'pop'
                      );
                    }
                  }}
                  disabled={predictionSelected === null}
                  className="px-6 py-2.5 bg-indigo-600 disabled:opacity-40 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm"
                >
                  Lock In Prediction
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-3 border-t border-slate-800">
                <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/60 text-xs text-slate-300 space-y-2">
                  <p className="font-bold text-indigo-300">
                    ���� Explanation: {PREDICTION_QUESTIONS[currentPredictionIdx].explanation}
                  </p>
                  <p className="text-amber-300 font-semibold">
                    👉 Verification Guide: {PREDICTION_QUESTIONS[currentPredictionIdx].verifyInstruction}
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  {currentPredictionIdx < PREDICTION_QUESTIONS.length - 1 ? (
                    <button
                      onClick={() => {
                        setCurrentPredictionIdx((i) => i + 1);
                        setPredictionSelected(null);
                        setPredictionSubmitted(false);
                      }}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold"
                    >
                      Next Prediction →
                    </button>
                  ) : (
                    <button
                      onClick={handleAdvanceToExploration}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
                    >
                      Enter Interactive Labs to Verify →
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                  currentSlide === idx
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Lab {idx + 1}</span>
                <span className="hidden md:inline">{step.title.split(':')[1]}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Concept Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-xl font-black text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: ROW × COLUMN DOT PRODUCT VISUALIZER ─── */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-indigo-300">Matrix A (2×3)</span>
                        <span className="text-[10px] text-slate-500">Click a row</span>
                      </div>
                      <div className="space-y-1.5">
                        {matA.map((row, rIdx) => (
                          <motion.div
                            key={rIdx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedRowA(rIdx);
                              audioManager.play('tap');
                            }}
                            className={`flex gap-2 p-2 rounded-lg cursor-pointer transition-all border ${
                              selectedRowA === rIdx
                                ? 'bg-indigo-950 border-indigo-500 text-indigo-200 shadow-md'
                                : 'bg-slate-800/60 border-transparent hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <span className="text-xs text-indigo-400 font-mono font-bold">R{rIdx + 1}</span>
                            {row.map((val, cIdx) => (
                              <span key={cIdx} className="flex-1 text-center font-mono font-bold text-sm">
                                {val}
                              </span>
                            ))}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-emerald-300">Matrix B (3×2)</span>
                        <span className="text-[10px] text-slate-500">Click a column</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[0, 1].map((cIdx) => (
                          <motion.div
                            key={cIdx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedColB(cIdx);
                              audioManager.play('tap');
                            }}
                            className={`p-2 rounded-lg cursor-pointer transition-all border text-center space-y-1 ${
                              selectedColB === cIdx
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md'
                                : 'bg-slate-800/60 border-transparent hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <span className="text-xs text-emerald-400 font-mono font-bold block">C{cIdx + 1}</span>
                            {matB.map((row, rIdx) => (
                              <div key={rIdx} className="font-mono font-bold text-sm">
                                {row[cIdx]}
                              </div>
                            ))}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-amber-300">Product AB (2×2)</span>
                        <span className="text-[10px] text-slate-500">Result</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {computedProductMat.map((row, rIdx) =>
                          row.map((val, cIdx) => {
                            const isSelected = selectedRowA === rIdx && selectedColB === cIdx;
                            return (
                              <motion.div
                                key={`${rIdx}-${cIdx}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMatrixCellClick(rIdx, cIdx)}
                                className={`p-3 rounded-lg text-center cursor-pointer transition-all border ${
                                  isSelected
                                    ? 'bg-amber-950 border-amber-400 text-amber-200 ring-2 ring-amber-500/30'
                                    : 'bg-slate-800/40 border-slate-700 text-slate-300'
                                }`}
                              >
                                <span className="text-[10px] text-slate-400 block font-mono">
                                  ({rIdx + 1},{cIdx + 1})
                                </span>
                                <span className="text-lg font-mono font-black">{val}</span>
                              </motion.div>
                            );
                          })
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950/80 rounded-xl border border-indigo-900/60 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs text-slate-400 font-semibold block">
                        Computation for Entry (Row {selectedRowA + 1}, Col {selectedColB + 1}):
                      </span>
                      <p className="text-base font-mono font-bold text-indigo-300 mt-0.5">
                        (AB)
                        <sub>
                          {selectedRowA + 1}
                          {selectedColB + 1}
                        </sub>{' '}
                        = {currentDotProductBreakdown.formula}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-900/60 rounded-lg text-xs font-mono text-indigo-200 border border-indigo-700">
                      Dot Product of R{selectedRowA + 1} • C{selectedColB + 1}
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {/* ─── LAB 2: COMMUTATIVITY & ZERO PRODUCT ─── */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setLab2Mode('standard');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        lab2Mode === 'standard'
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Compare AB vs BA (Non-Commutativity)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setLab2Mode('zeroProduct');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        lab2Mode === 'zeroProduct'
                          ? 'bg-amber-600 border-amber-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Zero Product Property Lab (AB = 0 with A,B ≠ 0)
                    </motion.button>
                  </div>

                  {lab2Mode === 'standard' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Product AB</span>
                          <p className="text-xs text-slate-400 mt-1">
                            [[1, 2], [3, 4]] × [[5, 6], [7, 8]]
                          </p>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-center font-mono font-bold text-indigo-300">
                            <div className="p-2 bg-indigo-950/60 rounded-lg border border-indigo-800">19</div>
                            <div className="p-2 bg-indigo-950/60 rounded-lg border border-indigo-800">22</div>
                            <div className="p-2 bg-indigo-950/60 rounded-lg border border-indigo-800">43</div>
                            <div className="p-2 bg-indigo-950/60 rounded-lg border border-indigo-800">50</div>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Product BA (Reversed)</span>
                          <p className="text-xs text-slate-400 mt-1">
                            [[5, 6], [7, 8]] × [[1, 2], [3, 4]]
                          </p>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-center font-mono font-bold text-rose-300">
                            <div className="p-2 bg-rose-950/60 rounded-lg border border-rose-800">23</div>
                            <div className="p-2 bg-rose-950/60 rounded-lg border border-rose-800">34</div>
                            <div className="p-2 bg-rose-950/60 rounded-lg border border-rose-800">31</div>
                            <div className="p-2 bg-rose-950/60 rounded-lg border border-rose-800">46</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                        <span>
                          Comparing entries: <strong>19 ≠ 23</strong>, <strong>22 ≠ 34</strong>. AB ≠ BA proves non-commutativity!
                        </span>
                        <span className="text-amber-400 font-bold">AB ≠ BA</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <p className="text-xs text-slate-300">
                        In ordinary arithmetic, ab = 0 forces a=0 or b=0. For matrices, rows and columns can be perpendicular (dot product = 0)!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center font-mono">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                          <span className="text-xs text-slate-400 font-sans block mb-1">Matrix A ≠ 0</span>
                          <div className="grid grid-cols-2 gap-1 text-sm font-bold text-indigo-300">
                            <span>1</span>
                            <span>1</span>
                            <span>-1</span>
                            <span>-1</span>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-slate-500">×</div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                          <span className="text-xs text-slate-400 font-sans block mb-1">Matrix B ≠ 0</span>
                          <div className="grid grid-cols-2 gap-1 text-sm font-bold text-emerald-300">
                            <span>1</span>
                            <span>-1</span>
                            <span>-1</span>
                            <span>1</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-amber-950/60 rounded-xl border border-amber-800 text-center font-mono font-black text-amber-300 text-base">
                        AB = [[0, 0], [0, 0]] (The Zero Matrix!)
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ─── LAB 3: 3×3 DETERMINANT & COFACTORS ─── */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-indigo-400 uppercase">Cofactor Checkerboard Signs (-1)^(i+j)</span>
                      <p className="text-[11px] text-slate-400">Alternating sign grid applied to minors</p>
                    </div>
                    <svg viewBox="0 0 150 90" className="w-36 h-20 bg-slate-900 rounded-lg p-1 border border-slate-800">
                      {[
                        ['+', '-', '+'],
                        ['-', '+', '-'],
                        ['+', '-', '+']
                      ].map((row, r) =>
                        row.map((sign, c) => (
                          <g key={`${r}-${c}`}>
                            <rect
                              x={c * 48 + 4}
                              y={r * 28 + 3}
                              width="44"
                              height="24"
                              rx="4"
                              fill={sign === '+' ? '#064e3b' : '#881337'}
                              stroke={sign === '+' ? '#10b981' : '#f43f5e'}
                              strokeWidth="1"
                            />
                            <text
                              x={c * 48 + 26}
                              y={r * 28 + 19}
                              fill="#ffffff"
                              fontSize="14"
                              fontWeight="black"
                              textAnchor="middle"
                            >
                              {sign}
                            </text>
                          </g>
                        ))
                      )}
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-indigo-300 uppercase">3×3 Matrix: Click an element a_ij</span>
                      <div className="grid grid-cols-3 gap-2">
                        {mat3x3.map((row, r) =>
                          row.map((val, c) => {
                            const isSelected = selectedMinorRow === r && selectedMinorCol === c;
                            const isDeleted = selectedMinorRow === r || selectedMinorCol === c;
                            return (
                              <motion.button
                                key={`${r}-${c}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMinorCellSelect(r, c)}
                                className={`p-3 rounded-xl font-mono text-center transition-all border ${
                                  isSelected
                                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg ring-2 ring-indigo-400/40 font-black'
                                    : isDeleted
                                    ? 'bg-rose-950/40 border-rose-900/60 text-slate-500 line-through'
                                    : 'bg-slate-800 border-slate-700 text-emerald-300 font-bold hover:bg-slate-755'
                                }`}
                              >
                                <span className="text-[10px] text-slate-400 block font-sans">
                                  a<sub>{r + 1}{c + 1}</sub>
                                </span>
                                {val}
                              </motion.button>
                            );
                          })
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        Elements with strikethrough lie in row {selectedMinorRow + 1} or column {selectedMinorCol + 1} and are deleted.
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-amber-300 uppercase">
                        Minor M<sub>{selectedMinorRow + 1}{selectedMinorCol + 1}</sub> & Cofactor C<sub>{selectedMinorRow + 1}{selectedMinorCol + 1}</sub>
                      </span>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono text-sm">
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>Surviving 2×2 Submatrix:</span>
                          <span className="text-indigo-400">
                            [[{currentSubmatrix.sub[0][0]}, {currentSubmatrix.sub[0][1]}], [{currentSubmatrix.sub[1][0]}, {currentSubmatrix.sub[1][1]}]]
                          </span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg text-slate-200">
                          Minor M<sub>{selectedMinorRow + 1}{selectedMinorCol + 1}</sub> = ({currentSubmatrix.sub[0][0]})(
                          {currentSubmatrix.sub[1][1]}) - ({currentSubmatrix.sub[0][1]})(
                          {currentSubmatrix.sub[1][0]}) = <strong>{currentSubmatrix.minorVal}</strong>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg text-slate-200">
                          Sign Factor (-1)<sup>{selectedMinorRow + 1}+{selectedMinorCol + 1}</sup> ={' '}
                          <strong>{currentSubmatrix.sign > 0 ? '+1' : '-1'}</strong>
                        </div>
                        <div className="p-2 bg-indigo-950/80 rounded-lg border border-indigo-800 text-indigo-200 font-bold">
                          Cofactor C<sub>{selectedMinorRow + 1}{selectedMinorCol + 1}</sub> = ({currentSubmatrix.sign > 0 ? '+1' : '-1'}) × ({currentSubmatrix.minorVal}) ={' '}
                          <span className="text-amber-300 text-base">{currentSubmatrix.cofactorVal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 4: GEOMETRIC TRIANGLE AREA ─── */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-indigo-300 uppercase">Radar Grid (10×10 km)</span>
                    <svg viewBox="0 0 300 240" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                      {Array.from({ length: 11 }).map((_, i) => (
                        <g key={i}>
                          <line x1={i * 30} y1="0" x2={i * 30} y2="240" stroke="#1e293b" strokeWidth="1" />
                          <line x1="0" y1={i * 24} x2="300" y2={i * 24} stroke="#1e293b" strokeWidth="1" />
                        </g>
                      ))}

                      <polygon
                        points={`${vertexA.x * 30},${240 - vertexA.y * 24} ${vertexB.x * 30},${240 - vertexB.y * 24} ${vertexC.x * 30},${240 - vertexC.y * 24}`}
                        fill={triangleAreaCalc.isCollinear ? 'transparent' : 'rgba(99, 102, 241, 0.25)'}
                        stroke={triangleAreaCalc.isCollinear ? '#f43f5e' : '#6366f1'}
                        strokeWidth={triangleAreaCalc.isCollinear ? '3' : '2'}
                      />

                      {[
                        { v: vertexA, label: 'A', color: '#38bdf8' },
                        { v: vertexB, label: 'B', color: '#4ade80' },
                        { v: vertexC, label: 'C', color: '#f59e0b' },
                      ].map((item, idx) => (
                        <g key={idx}>
                          <circle
                            cx={item.v.x * 30}
                            cy={240 - item.v.y * 24}
                            r="6"
                            fill={item.color}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                          <text
                            x={item.v.x * 30 + 8}
                            y={240 - item.v.y * 24 - 4}
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="bold"
                          >
                            {item.label}({item.v.x},{item.v.y})
                          </text>
                        </g>
                      ))}
                    </svg>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] text-sky-400 block font-bold">Vertex A (X, Y)</label>
                        <div className="flex gap-1 mt-1">
                          <input
                            type="number"
                            min={0}
                            max={10}
                            value={vertexA.x}
                            onChange={(e) => setVertexA({ ...vertexA, x: Number(e.target.value) })}
                            className="w-1/2 p-1 bg-slate-800 rounded border border-slate-700 text-xs text-center"
                          />
                          <input
                            type="number"
                            min={0}
                            max={10}
                            value={vertexA.y}
                            onChange={(e) => setVertexA({ ...vertexA, y: Number(e.target.value) })}
                            className="w-1/2 p-1 bg-slate-800 rounded border border-slate-700 text-xs text-center"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-emerald-400 block font-bold">Vertex B (X, Y)</label>
                        <div className="flex gap-1 mt-1">
                          <input
                            type="number"
                            min={0}
                            max={10}
                            value={vertexB.x}
                            onChange={(e) => setVertexB({ ...vertexB, x: Number(e.target.value) })}
                            className="w-1/2 p-1 bg-slate-800 rounded border border-slate-700 text-xs text-center"
                          />
                          <input
                            type="number"
                            min={0}
                            max={10}
                            value={vertexB.y}
                            onChange={(e) => setVertexB({ ...vertexB, y: Number(e.target.value) })}
                            className="w-1/2 p-1 bg-slate-800 rounded border border-slate-700 text-xs text-center"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-amber-400 block font-bold">Vertex C (X, Y)</label>
                        <div className="flex gap-1 mt-1">
                          <input
                            type="number"
                            min={0}
                            max={10}
                            value={vertexC.x}
                            onChange={(e) => setVertexC({ ...vertexC, x: Number(e.target.value) })}
                            className="w-1/2 p-1 bg-slate-800 rounded border border-slate-700 text-xs text-center"
                          />
                          <input
                            type="number"
                            min={0}
                            max={10}
                            value={vertexC.y}
                            onChange={(e) => setVertexC({ ...vertexC, y: Number(e.target.value) })}
                            className="w-1/2 p-1 bg-slate-800 rounded border border-slate-700 text-xs text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-amber-300 uppercase">Determinant Formula & Collinearity</span>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                      <p className="text-slate-300">
                        Area = (1/2) |det [[{vertexA.x}, {vertexA.y}, 1], [{vertexB.x}, {vertexB.y}, 1], [{vertexC.x}, {vertexC.y}, 1]]|
                      </p>
                      <div className="p-2 bg-slate-950 rounded-lg text-indigo-300">
                        det = {vertexA.x}({vertexB.y} - {vertexC.y}) + {vertexB.x}({vertexC.y} - {vertexA.y}) + {vertexC.x}({vertexA.y} - {vertexB.y}) ={' '}
                        <strong>{triangleAreaCalc.det.toFixed(1)}</strong>
                      </div>
                      <div className="p-3 bg-indigo-950 rounded-lg border border-indigo-800 text-white font-bold text-sm">
                        Enclosed Area = (1/2) |{triangleAreaCalc.det.toFixed(1)}| ={' '}
                        <span className="text-amber-300 text-lg">{triangleAreaCalc.area.toFixed(2)} sq units</span>
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-xl border text-xs font-semibold ${
                        triangleAreaCalc.isCollinear
                          ? 'bg-rose-950/80 border-rose-600 text-rose-200'
                          : 'bg-emerald-950/80 border-emerald-600 text-emerald-200'
                      }`}
                    >
                      {triangleAreaCalc.isCollinear
                        ? '⚠️ Points are COLLINEAR (det = 0, points form a single straight line, zero triangle area)!'
                        : '✓ Non-collinear points: genuine positive triangle enclosed.'}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 5: MARTIN'S RULE SOLVER ─── */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-indigo-400 uppercase">System: AX = B</span>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={martinA11}
                            onChange={(e) => setMartinA11(Number(e.target.value))}
                            className="w-12 p-1 bg-slate-800 rounded text-center"
                          />
                          <span>x +</span>
                          <input
                            type="number"
                            value={martinA12}
                            onChange={(e) => setMartinA12(Number(e.target.value))}
                            className="w-12 p-1 bg-slate-800 rounded text-center"
                          />
                          <span>y =</span>
                          <input
                            type="number"
                            value={bConst1}
                            onChange={(e) => setBConst1(Number(e.target.value))}
                            className="w-12 p-1 bg-indigo-900 rounded text-center font-bold"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={martinA21}
                            onChange={(e) => setMartinA21(Number(e.target.value))}
                            className="w-12 p-1 bg-slate-800 rounded text-center"
                          />
                          <span>x +</span>
                          <input
                            type="number"
                            value={martinA22}
                            onChange={(e) => setMartinA22(Number(e.target.value))}
                            className="w-12 p-1 bg-slate-800 rounded text-center"
                          />
                          <span>y =</span>
                          <input
                            type="number"
                            value={bConst2}
                            onChange={(e) => setBConst2(Number(e.target.value))}
                            className="w-12 p-1 bg-indigo-900 rounded text-center font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                      <span className="text-xs font-bold text-amber-300 font-sans uppercase">Martin's Rule Solution (X = A⁻¹ B)</span>
                      <p className="text-slate-300">Determinant |A| = {martinsSolution.det}</p>
                      {martinsSolution.invertible ? (
                        <div className="space-y-2">
                          <div className="p-2 bg-slate-950 rounded-lg text-emerald-300">
                            A⁻¹ = (1/{martinsSolution.det}) [[{martinA22}, {-martinA12}], [{-martinA21}, {martinA11}]]
                          </div>
                          <div className="p-3 bg-emerald-950 rounded-xl border border-emerald-600 text-white font-bold text-sm">
                            Solution: x = <span className="text-amber-300">{martinsSolution.x.toFixed(2)}</span>, y ={' '}
                            <span className="text-amber-300">{martinsSolution.y.toFixed(2)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-rose-950 rounded-xl border border-rose-600 text-rose-200">
                          |A| = 0 (Singular): Martin's Rule cannot be used. No unique solution!
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide((s) => Math.max(0, s - 1));
                    audioManager.play('whoosh');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl border border-slate-700"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs font-mono text-slate-400">
                  {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide((s) => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToObservation}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                  >
                    Observe Patterns ("What Do You Notice?") →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE: OBSERVATION QUESTIONS (What Do You Notice? Pattern) ─── */}
      {phase === 'observe' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Observation Question {currentObservationIdx + 1} of {OBSERVATION_QUESTIONS.length}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700">
                What Did You Notice?
              </span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white">
              {OBSERVATION_QUESTIONS[currentObservationIdx].question}
            </h3>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {OBSERVATION_QUESTIONS[currentObservationIdx].observableOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => !observationSubmitted && setObservationSelected(idx)}
                  className={`p-3.5 text-left rounded-xl text-sm transition-all border ${
                    observationSelected === idx
                      ? 'bg-amber-950/90 border-amber-500 text-amber-200'
                      : 'bg-slate-800 border-slate-700 hover:border-amber-400 text-slate-200'
                  } ${observationSubmitted && idx === OBSERVATION_QUESTIONS[currentObservationIdx].correctIndex ? 'ring-2 ring-emerald-500 bg-emerald-950/40 text-emerald-200' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            {!observationSubmitted ? (
              <div className="pt-3">
                <button
                  onClick={() => {
                    if (observationSelected !== null) {
                      setObservationSubmitted(true);
                      audioManager.play(
                        observationSelected === OBSERVATION_QUESTIONS[currentObservationIdx].correctIndex
                          ? 'success'
                          : 'pop'
                      );
                    }
                  }}
                  disabled={observationSelected === null}
                  className="px-6 py-2.5 bg-amber-600 disabled:opacity-40 hover:bg-amber-500 text-white rounded-xl font-bold text-sm"
                >
                  Confirm Observation
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-3 border-t border-slate-800">
                <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/60 text-xs text-slate-300">
                  <p className="font-bold text-amber-300">
                    💡 Synthesis: {OBSERVATION_QUESTIONS[currentObservationIdx].explanation}
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  {currentObservationIdx < OBSERVATION_QUESTIONS.length - 1 ? (
                    <button
                      onClick={() => {
                        setCurrentObservationIdx((i) => i + 1);
                        setObservationSelected(null);
                        setObservationSubmitted(false);
                      }}
                      className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-bold"
                    >
                      Next Observation →
                    </button>
                  ) : (
                    <button
                      onClick={handleAdvanceToSandbox}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
                    >
                      Enter Free Sandbox Lab →
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (FREE PLAY) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sandbox Free Play</span>
                <h3 className="text-xl font-black text-white mt-0.5">2×2 Matrix Inversion & Determinant Lab</h3>
              </div>
              <span className="text-2xl">🧪</span>
            </div>
            <p className="text-xs text-slate-400">
              Manipulate matrix parameters freely. Watch determinant, adjoint, and inverse update instantly in real time!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-4">
                <span className="text-xs font-bold text-indigo-300 uppercase">Input Matrix A: [[a, b], [c, d]]</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">a = {sandboxA}</label>
                    <input
                      type="range"
                      min={-5}
                      max={5}
                      value={sandboxA}
                      onChange={(e) => setSandboxA(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">b = {sandboxB}</label>
                    <input
                      type="range"
                      min={-5}
                      max={5}
                      value={sandboxB}
                      onChange={(e) => setSandboxB(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">c = {sandboxC}</label>
                    <input
                      type="range"
                      min={-5}
                      max={5}
                      value={sandboxC}
                      onChange={(e) => setSandboxC(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">d = {sandboxD}</label>
                    <input
                      type="range"
                      min={-5}
                      max={5}
                      value={sandboxD}
                      onChange={(e) => setSandboxD(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs flex justify-between">
                  <span>Matrix A:</span>
                  <span className="text-indigo-300 font-bold">
                    [[{sandboxA}, {sandboxB}], [{sandboxC}, {sandboxD}]]
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Determinant |A| = ad - bc:</span>
                  <span className={`font-black text-sm ${sandboxDet === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    ({sandboxA})({sandboxD}) - ({sandboxB})({sandboxC}) = {sandboxDet}
                  </span>
                </div>

                <div className="p-2 bg-slate-950 rounded-lg text-slate-300">
                  Adjoint adj(A) = [[{sandboxD}, {-sandboxB}], [{-sandboxC}, {sandboxA}]]
                </div>

                {sandboxDet !== 0 ? (
                  <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-600 text-emerald-200">
                    A⁻¹ = (1/{sandboxDet}) [[{sandboxD}, {-sandboxB}], [{-sandboxC}, {sandboxA}]]
                  </div>
                ) : (
                  <div className="p-3 bg-rose-950/80 rounded-xl border border-rose-600 text-rose-200">
                    Singular Matrix (|A| = 0): Non-invertible!
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 text-sm flex items-center gap-2"
              >
                Ready for CISCE Board Challenges! →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800"
          >
            <div className="flex justify-between items-center mb-1 px-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">ISRO Lunar Telemetry Stream</span>
              <span className="text-[10px] font-mono text-indigo-400">Real-time Orbit Tracking</span>
            </div>
            <canvas ref={canvasRef} width={500} height={70} className="w-full rounded-xl bg-slate-950" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
                  NEP 2020: {activeChallenge.competencyLevel.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              </div>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {activeChallenge.question}
            </h3>

            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`p-3.5 text-left rounded-xl text-sm font-medium transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800 border-slate-700 hover:border-indigo-500 text-slate-200 hover:bg-slate-755'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {['sign_11', 'sign_12', 'sign_21', 'sign_22'].map((posId) => (
                    <div
                      key={posId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(posId)}
                      className="p-4 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 text-center flex flex-col items-center justify-center min-h-[70px]"
                    >
                      <span className="text-[10px] text-slate-500 font-mono block">Position: {posId}</span>
                      <span className="text-xs font-bold text-indigo-300 mt-1">
                        {droppedLabels[posId] || 'Drop Sign Factor Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Drag Placement
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange steps in chronological order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      whileHover={{ scale: 1.01 }}
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, idx);
                      }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 cursor-grab text-xs font-medium text-slate-200 flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 text-[10px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : activeChallenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Confirm Step Sequence
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numeric answer"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 outline-none w-48"
                  />
                  {activeChallenge.unit && <span className="text-xs text-slate-400 font-mono">{activeChallenge.unit}</span>}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-900/60 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-indigo-600 text-white rounded text-xs font-mono flex items-center gap-1.5"
                    >
                      {part}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 font-bold"
                      >
                        ×
                      </motion.button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above to chain proof steps</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Proof Construction
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 to-slate-950 rounded-xl border border-amber-800/80 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-sm">💡 Step-by-Step Mathematical Walkthrough:</span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-amber-200 text-xs md:text-sm leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">Step {i + 1}:</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between pt-2 gap-3">
                  {revealedSteps <
                    activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Derivation Step →
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="ml-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Mission & View Trajectory Review →' : 'Next Challenge →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MISSION COMPLETION & MASTERY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl border border-indigo-700 shadow-2xl text-center space-y-3"
          >
            <span className="text-5xl block">🌕 🚀</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Mission Accomplished: Lunar Orbit Locked!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Your telemetry guidance algorithms successfully executed every coordinate transformation, determinant check, and Martin's Rule linear solve.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2.5 bg-slate-950 rounded-2xl border border-indigo-800"
              >
                <span className="text-xs text-slate-400 block font-mono">Final Score</span>
                <span className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2.5 bg-slate-950 rounded-2xl border border-indigo-800"
              >
                <span className="text-xs text-slate-400 block font-mono">Mastery Rank</span>
                <span className="text-2xl font-black text-emerald-400 capitalize">{masteryLevel}</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-500'
                : errors <= 3
                ? 'bg-indigo-950/60 border-indigo-500'
                : errors <= 7
                ? 'bg-amber-950/60 border-amber-500'
                : 'bg-rose-950/60 border-rose-500'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">
                {errors === 0 ? '🏆' : errors <= 3 ? '⭐' : errors <= 7 ? '👍' : '🎯'}
              </span>
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              {errors === 0
                ? 'Flawless zero-error execution! Your mastery of matrix multiplication, cofactor signs, and Martin’s Rule matrix inversions is outstanding and fully exam-ready.'
                : errors <= 3
                ? 'You solved almost all telemetry coordinates accurately. Re-verifying minor signs and product orders will take you straight to 100%!'
                : errors <= 7
                ? 'You demonstrated solid conceptual effort across multiple matrix topics. Review the step-by-step notes below and re-attempt to solidify intuition.'
                : 'Matrix operations require patience, systematic bookkeeping, and active practice. Review the key misconception cards below — you will master this with another run!'}
            </p>
          </motion.div>

          {/* ─── PROMINENT SPACED REPETITION (SRS) VISIBILITY ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-r from-purple-950/70 via-indigo-950/80 to-slate-900 rounded-2xl border border-purple-600 shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-purple-300 block">
                  🧠 Spaced Repetition Calibration (SM-2 Algorithm)
                </span>
                <p className="text-base font-bold text-white">
                  Next Memory Retrieval Review:{' '}
                  <span className="text-amber-400 font-black underline">
                    {errors === 0 ? 'In 7 Days (Optimal Retention)' : errors <= 3 ? 'In 3 Days (Solidification)' : 'In 1 Day (Reinforcement)'}
                  </span>
                </p>
                <p className="text-xs text-slate-300">
                  {errors === 0
                    ? 'Long-term consolidation active. Scheduled for review in 7 days.'
                    : errors <= 3
                    ? 'Moderate decay curve detected. Review in 3 days to lock into long-term memory.'
                    : 'Targeted recovery active. Revisit within 24 hours to eliminate remaining traps.'}
                </p>
              </div>
              <div className="px-4 py-2 bg-slate-950/80 rounded-xl border border-purple-500/50 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Review Window</span>
                <span className="text-lg font-black text-purple-300">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* REFLECTION SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-base font-bold text-indigo-300">Mission Reflection & Knowledge Synthesis</h3>
            </div>
            <p className="text-xs text-slate-400">
              Deepen your cognitive retention by reflecting on how these mathematical principles connect to broader concepts.
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <label className="text-xs font-semibold text-amber-300 block mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="e.g. Non-zero matrices can multiply to zero, or order AB vs BA completely changes result..."
                  className="w-full bg-slate-900 text-xs text-slate-200 p-2.5 rounded-lg border border-slate-700 outline-none focus:border-indigo-500 min-h-[50px]"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <label className="text-xs font-semibold text-emerald-300 block mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="e.g. Determinants measure spatial scaling, and Martin's Rule is like dividing by a matrix using its inverse..."
                  className="w-full bg-slate-900 text-xs text-slate-200 p-2.5 rounded-lg border border-slate-700 outline-none focus:border-indigo-500 min-h-[50px]"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <label className="text-xs font-semibold text-sky-300 block mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="e.g. 3D computer graphics transformations, satellite orbital telemetry, economic input-output models..."
                  className="w-full bg-slate-900 text-xs text-slate-200 p-2.5 rounded-lg border border-slate-700 outline-none focus:border-indigo-500 min-h-[50px]"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-slate-400">
                {reflectionSaved ? '✓ Reflections recorded to telemetry log' : 'Type thoughts above'}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setReflectionSaved(true);
                  audioManager.play('drop-correct');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Save Reflections
              </motion.button>
            </div>
          </motion.div>

          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/80 space-y-3"
            >
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Identified Misconception Focus Areas:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1"
                    >
                      <p className="text-rose-300 font-semibold">❌ Trap: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-950 rounded-2xl border border-indigo-800 space-y-3"
          >
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>🚀</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400"
                >
                  <span className="font-bold text-indigo-400 mr-1.5">{idx + 1}.</span>
                  {step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── CONDITIONAL FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_MathematicsMatrixMultiplicationSim;
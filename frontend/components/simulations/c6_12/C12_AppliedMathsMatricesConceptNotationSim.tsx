'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ISC Class 12 Applied Mathematics) ───
const NODE_C12_APPMATH_011 = 'c12_appmath_011';
const NODE_C12_APPMATH_012 = 'c12_appmath_012';
const NODE_C12_APPMATH_013 = 'c12_appmath_013';
const NODE_C12_APPMATH_014 = 'c12_appmath_014';
const NODE_C12_APPMATH_015 = 'c12_appmath_015';
const NODE_C12_APPMATH_016 = 'c12_appmath_016';
const NODE_C12_APPMATH_017 = 'c12_appmath_017';
const NODE_C12_APPMATH_018 = 'c12_appmath_018';
const NODE_C12_APPMATH_019 = 'c12_appmath_019';
const NODE_C12_APPMATH_020 = 'c12_appmath_020';

const ALL_NODE_IDS = [
  NODE_C12_APPMATH_011,
  NODE_C12_APPMATH_012,
  NODE_C12_APPMATH_013,
  NODE_C12_APPMATH_014,
  NODE_C12_APPMATH_015,
  NODE_C12_APPMATH_016,
  NODE_C12_APPMATH_017,
  NODE_C12_APPMATH_018,
  NODE_C12_APPMATH_019,
  NODE_C12_APPMATH_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'IndiGo Fleet & Cargo Route Optimization',
  intro: 'You are the chief mathematical flight operations analyst for an Indian airline linking Delhi (DEL), Mumbai (BOM), and Bengaluru (BLR). Cargo tonnages, passenger demand matrices, fuel cost scaling factors, and survey triangular route sectors all rely on matrix algebra and determinants.',
  context: 'From calculating daily route revenues across 3 hubs to computing survey flight areas on radar coordinates, matrices are the bedrock of operational research.',
};

// ─── BRILLIANT-STYLE PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
export interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_mat_001',
    question: 'Before exploring the Transpose tool: If you swap the rows and columns of any square matrix A, what will happen to the elements sitting on the main diagonal (a₁₁, a₂₂, a₃₃)?',
    options: [
      'They will shift to the opposite corners of the matrix.',
      'They will remain in their exact same positions unchanged.',
      'Their signs will immediately invert into negatives.',
      'They will all transform into zeros.',
    ],
    correctIndex: 1,
    explanation: 'Because the transpose operation maps element a_{ij} to a_{ji}, when i = j (the main diagonal), the index stays a_{ii}. Diagonal entries never move!',
    verifyInstruction: 'Go to Lab 3 (Transpose & Symmetry Mirror) and toggle "Flip Transpose" to see the diagonal entries stay locked in place!',
  },
  {
    id: 'pred_mat_002',
    question: 'Before interacting with the radar plane: If three flight survey beacons P, Q, and R lie on the exact same straight line, what will the determinant area formula ½|det| evaluate to?',
    options: [
      'An infinite coordinate scalar',
      'Exactly 0 sq units (no 2D enclosed polygon)',
      'A negative area equal to the line length',
      'The average distance between the points',
    ],
    correctIndex: 1,
    explanation: 'When 3 points are collinear, the triangle formed by them has height 0, meaning the enclosed area is 0 and the 3×3 coordinate determinant equals 0.',
    verifyInstruction: 'Go to Lab 5 (Radar Triangle Area) and drag vertex C onto the line between A and B to observe the area drop to 0!',
  },
];

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS (What do you notice? Pattern) ───
export interface ObservationQuestion {
  id: string;
  prompt: string;
  observableOptions: string[];
  correctIndex: number;
  insight: string;
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_mat_001',
    prompt: 'Observe the Row-by-Column Vector Multiplication Flow (Lab 2): How does the resulting scalar cell in the product matrix get generated?',
    observableOptions: [
      'By multiplying all 4 numbers in Matrix A with all 4 numbers in Matrix B simultaneously.',
      'By taking a horizontal row from Matrix A and computing a term-by-term dot product with a vertical column from Matrix B.',
      'By simply adding the diagonal entries of Matrix A to Matrix B.',
      'By dividing the rows of Matrix A by the determinant of Matrix B.',
    ],
    correctIndex: 1,
    insight: 'Matrix multiplication is fundamentally a structured dot product: Row i of the first matrix dots with Column j of the second matrix to produce entry c_{ij}.',
  },
  {
    id: 'obs_mat_002',
    prompt: 'Observe the 3×3 Minor & Cofactor Visualizer (Lab 4) when you click on any element: What happens visually to the remaining cells?',
    observableOptions: [
      'All matrix values are inverted into reciprocals.',
      'The entire row and column containing that selected element are crossed out, leaving an isolated 2×2 submatrix.',
      'Only the main diagonal entries stay illuminated while the rest turn black.',
      'The matrix doubles in size from 3×3 to 6×6.',
    ],
    correctIndex: 1,
    insight: 'To compute the minor M_{ij}, you eliminate row i and column j, then evaluate the determinant of the remaining (n-1)×(n-1) submatrix.',
  },
];

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If Flight Route Matrix A has order 3×2 (3 hubs to 2 time slots) and Fare Matrix B has order 2×3, can you multiply AB and BA, and will the results be identical?',
  options: [
    'Both exist and are identical because order does not matter in multiplication.',
    'Neither exists because rectangular matrices cannot be multiplied.',
    'Both exist, but AB is 3×3 while BA is 2×2, proving matrix multiplication is non-commutative.',
    'Only AB exists because columns of A must match columns of B.',
  ],
  correctIndex: 2,
  hintAfter: 'Don\'t worry if you got that wrong — let us explore how row-by-column dimensions and transformations work in real time!',
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
  bloomLevel?: string;
}

// ─── CHALLENGES (21 progressive challenges) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Concept & Address (Recall)
  {
    id: 'ch_mat_001',
    nodeId: NODE_C12_APPMATH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a 3×2 passenger matrix M = [[120, 85], [210, 140], [95, 60]], what does the entry m₂₁ represent?',
    options: [
      'Row 1, Column 2 entry (= 85)',
      'Row 2, Column 1 entry (= 210)',
      'Column 2, Row 1 entry (= 140)',
      'The determinant of the submatrix',
    ],
    correctIndex: 1,
    explanation: 'The double suffix notation a_{ij} denotes the entry in the i-th row (horizontal) and j-th column (vertical). Hence m₂₁ is row 2, column 1, which is 210.',
    hints: [
      'Remember: row comes first, column comes second (RC / Roman Catholic).',
      'Look at row index 2 (second row down) and column index 1 (first column from left).',
      'The second row is [210, 140]. The first item in that row is 210.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag-label Matrix Types (Understanding)
  {
    id: 'ch_mat_002',
    nodeId: NODE_C12_APPMATH_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each special matrix category to its matching 2×2 description.',
    dragItems: [
      { label: 'Identity Matrix (I)', targetId: 'box_identity' },
      { label: 'Scalar Matrix', targetId: 'box_scalar' },
      { label: 'Upper Triangular', targetId: 'box_upper' },
      { label: 'Zero Matrix (O)', targetId: 'box_zero' },
    ],
    correctMapping: {
      box_identity: 'Identity Matrix (I)',
      box_scalar: 'Scalar Matrix',
      box_upper: 'Upper Triangular',
      box_zero: 'Zero Matrix (O)',
    },
    explanation: 'Identity has 1s on diagonal, 0s elsewhere. Scalar has equal constants k on diagonal. Upper triangular has 0s strictly below diagonal. Zero has all 0s.',
    hints: [
      'Identity matrix acts like number 1 with diagonal [1, 1].',
      'Scalar has matching non-zero numbers like [5, 5] on diagonal and 0s elsewhere.',
      'Upper triangular keeps all zero entries strictly below the main diagonal.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Transpose & Symmetry (Recall)
  {
    id: 'ch_mat_003',
    nodeId: NODE_C12_APPMATH_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is an essential structural requirement for any skew-symmetric matrix A (where A\' = -A)?',
    options: [
      'All off-diagonal elements must be equal to 1.',
      'Every main diagonal element a_{ii} must equal 0.',
      'The matrix must have an odd number of rows and columns only.',
      'Its determinant must always equal 1.',
    ],
    correctIndex: 1,
    explanation: 'Because a_{ii} = -a_{ii} for all diagonal elements under A\' = -A, 2a_{ii} = 0 implies a_{ii} = 0. Every diagonal entry must be zero.',
    hints: [
      'What number equals its own negative (x = -x)?',
      'On the diagonal, i = j, so a_{ii} = -a_{ii}.',
      'The only real number that satisfies 2x = 0 is 0.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Matrix Addition Compatibility (Understanding)
  {
    id: 'ch_mat_004',
    nodeId: NODE_C12_APPMATH_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Matrix A is of order 2×3 and Matrix B is of order 3×2. Is A + B defined?',
    options: [
      'Yes, because both contain 6 entries in total.',
      'Yes, by padding B with an extra row of zeros.',
      'No, matrix addition requires matrices to have the exact same order m×n.',
      'Yes, but only if both matrices are transposed first.',
    ],
    correctIndex: 2,
    explanation: 'Matrix addition is an entry-by-entry operation. Two matrices can only be added or subtracted if they share the exact same row and column dimensions.',
    hints: [
      'Check if every cell in A has a matching corresponding cell in B.',
      'A has 2 rows; B has 3 rows. The shapes do not match.',
      'Compatibility for addition strictly demands identical dimensions m×n.',
    ],
    misconceptionIndex: 0,
  },
  // 5. Foundation - 2x2 Determinant Numeric (Application)
  {
    id: 'ch_mat_005',
    nodeId: NODE_C12_APPMATH_018,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Compute the determinant |A| for the 2×2 fare scale matrix A = [[6, 4], [2, 5]].',
    correctAnswer: 22,
    tolerance: 0,
    unit: '',
    explanation: '|A| = (6 × 5) - (4 × 2) = 30 - 8 = 22.',
    hints: [
      'Apply the 2×2 formula: |A| = ad - bc.',
      'Multiply leading diagonal entries: 6 × 5 = 30.',
      'Subtract off-diagonal product: 30 - (4 × 2) = 22.',
    ],
  },
  // 6. Foundation - Drag Sort Determinant Properties (Understanding)
  {
    id: 'ch_mat_006',
    nodeId: NODE_C12_APPMATH_019,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the standard algebraic steps to evaluate a 3×3 determinant by Row 1 expansion.',
    sortItems: [
      'Identify elements a₁₁, a₁₂, a₁₃ along Row 1',
      'Compute 2×2 minors M₁₁, M₁₂, M₁₃ by deleting respective rows and columns',
      'Apply checkerboard sign pattern (+, -, +) to obtain cofactors C₁₁, C₁₂, C₁₃',
      'Sum the products: a₁₁C₁₁ + a₁₂C₁₂ + a₁₃C₁₃',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'To expand along Row 1: isolate elements, compute the remaining 2×2 submatrix determinants (minors), attach (-1)^{i+j} signs, and sum the three signed terms.',
    hints: [
      'Start by picking the row elements.',
      'Next form the 2×2 submatrices for each element.',
      'Attach signs before final dot product summation.',
    ],
  },
  // 7. Foundation - Area of Triangle Collinearity (Application)
  {
    id: 'ch_mat_007',
    nodeId: NODE_C12_APPMATH_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'If radar waypoints P(2, 3), Q(4, 7), and R(6, 11) yield det [[2,3,1],[4,7,1],[6,11,1]] = 0, what does this indicate about the flight path?',
    options: [
      'The triangle has an area of 12 sq units.',
      'The three waypoints lie on a single straight line (collinear); no enclosed triangle exists.',
      'The flight path is circular.',
      'The determinant indicates an invalid radar coordinate system.',
    ],
    correctIndex: 1,
    explanation: 'Triangle Area = 1/2 |det|. When det = 0, Area = 0, which means all three points are strictly collinear (they lie on y = 2x - 1).',
    hints: [
      'Area = (1/2) × |det|.',
      'When area is zero, the vertices do not form a 2D shape.',
      'Three points with zero enclosed area lie on the same straight line.',
    ],
  },
  // 8. Standard - Matrix Multiplication Dimension Check (Analysis)
  {
    id: 'ch_mat_008',
    nodeId: NODE_C12_APPMATH_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Tata Motors tracks supplier parts using Matrix S (order 3×4) and cost vector Matrix V (order 4×1). What is the order of the product matrix SV, and is VS defined?',
    options: [
      'SV has order 3×1; VS is undefined because columns of V (1) ≠ rows of S (3).',
      'SV has order 4×4; VS has order 3×3.',
      'Both SV and VS have order 3×1.',
      'SV is undefined; VS has order 1×3.',
    ],
    correctIndex: 0,
    explanation: 'For SV: (3×4) × (4×1) → inner dimensions match (4=4), resulting in a 3×1 matrix. For VS: (4×1) × (3×4) → inner dimensions (1 vs 3) do not match, so VS is undefined.',
    hints: [
      'Product (m×n) × (n×p) produces an (m×p) matrix.',
      'Check inner dimensions: 4 equals 4 for SV.',
      'Now flip to VS: (4×1) × (3×4). Does 1 equal 3?',
    ],
    misconceptionIndex: 0,
  },
  // 9. Standard - Non-Commutativity Real Proof (Analysis)
  {
    id: 'ch_mat_009',
    nodeId: NODE_C12_APPMATH_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Let A = [[1, 2], [0, 0]] and B = [[0, 0], [3, 4]]. Compute AB and BA. What do you conclude?',
    options: [
      'AB = [[6, 8], [0, 0]] and BA = [[0, 0], [3, 6]], so AB ≠ BA (non-commutative).',
      'AB = [[0, 0], [0, 0]] and BA = [[0, 0], [0, 0]], so AB = BA.',
      'AB = [[1, 2], [3, 4]] and BA = [[1, 2], [3, 4]].',
      'AB cannot be computed because B has a zero row.',
    ],
    correctIndex: 0,
    explanation: 'AB: row 1 dot col 1 is 1×0 + 2×3 = 6; row 1 dot col 2 is 1×0 + 2×4 = 8. Row 2 is [0, 0]. So AB = [[6,8],[0,0]]. BA: row 1 is [0,0]; row 2 is [3×1+4×0, 3×2+4×0] = [3, 6]. AB ≠ BA.',
    hints: [
      'Do row-by-column dot products for AB first.',
      'Row 1 of A is [1, 2]; Column 1 of B is [0, 3]ᵀ. 1(0) + 2(3) = 6.',
      'Now do BA: Row 2 of B is [3, 4]; Column 1 of A is [1, 0]ᵀ. 3(1) + 4(0) = 3.',
    ],
    misconceptionIndex: 1,
  },
  // 10. Standard - Zero Product Property Violation (Analysis)
  {
    id: 'ch_mat_010',
    nodeId: NODE_C12_APPMATH_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Given non-zero matrices C = [[0, 2], [0, 0]] and D = [[3, 0], [0, 0]], what is the product CD?',
    options: [
      'CD = [[0, 0], [0, 0]] (Null matrix), proving that CD = O does not require C = O or D = O.',
      'CD = [[0, 6], [0, 0]], a non-zero matrix.',
      'CD cannot be zero because neither matrix is the zero matrix.',
      'CD = [[6, 0], [0, 0]].',
    ],
    correctIndex: 0,
    explanation: 'Row 1 of C is [0, 2]. Dot with Col 1 of D [3, 0] is 0×3 + 2×0 = 0. Dot with Col 2 [0, 0] is 0. Row 2 of C is [0, 0]. Thus CD = [[0,0],[0,0]]. Matrix algebra violates the ordinary real-number zero product property!',
    hints: [
      'Multiply Row 1 of C [0, 2] with Column 1 of D [3, 0].',
      '0(3) + 2(0) = 0.',
      'All four dot products evaluate to 0, producing the zero matrix O.',
    ],
  },
  // 11. Standard - Symmetric & Skew-Symmetric Decomposition (Application)
  {
    id: 'ch_mat_011',
    nodeId: NODE_C12_APPMATH_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Express A = [[3, 5], [1, -1]] as S + K, where S is symmetric and K is skew-symmetric. What is the symmetric part S?',
    options: [
      'S = 1/2(A + A\') = [[3, 3], [3, -1]]',
      'S = 1/2(A - A\') = [[0, 2], [-2, 0]]',
      'S = [[3, 1], [5, -1]]',
      'S = [[6, 6], [6, -2]]',
    ],
    correctIndex: 0,
    explanation: 'A\' = [[3, 1], [5, -1]]. S = 1/2(A + A\') = 1/2[[6, 6], [6, -2]] = [[3, 3], [3, -1]]. Notice S\' = S.',
    hints: [
      'Formula for symmetric component is S = 1/2 (A + A\').',
      'Transpose A: A\' = [[3, 1], [5, -1]].',
      'Add A and A\': [[6, 6], [6, -2]], then divide every element by 2.',
    ],
    misconceptionIndex: 2,
  },
  // 12. Standard - Invertibility Test (Evaluation)
  {
    id: 'ch_mat_012',
    nodeId: NODE_C12_APPMATH_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'For what value of parameter k is the airline dispatch matrix M = [[k, 6], [2, 3]] singular (non-invertible)?',
    options: [
      'k = 4, because det(M) = 3k - 12 = 0',
      'k = 0, because a matrix with zero is singular',
      'k = -4, because 3(-4) - 12 = -24',
      'k = 6, because 6 matches the row entry',
    ],
    correctIndex: 0,
    explanation: 'A matrix is singular iff |M| = 0. Here |M| = 3k - (6 × 2) = 3k - 12. Setting 3k - 12 = 0 yields k = 4.',
    hints: [
      'Singular matrix means determinant = 0.',
      'Compute determinant: (k × 3) - (6 × 2).',
      'Solve 3k - 12 = 0 for k.',
    ],
  },
  // 13. Standard - Area of Triangle Numeric (Application)
  {
    id: 'ch_mat_013',
    nodeId: NODE_C12_APPMATH_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the area (in sq units) of the triangular flight corridor with vertices A(1, 1), B(4, 5), and C(7, 1).',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'sq units',
    explanation: 'det [[1,1,1],[4,5,1],[7,1,1]] = 1(5-1) - 1(4-7) + 1(4-35) = 4 - (-3) + (-31) = -24. Area = 1/2 | -24 | = 12 sq units.',
    hints: [
      'Area = 1/2 × |det [[1,1,1], [4,5,1], [7,1,1]]|.',
      'Expand the 3×3 determinant: 1(4) - 1(-3) + 1(-31) = -24.',
      'Take half of absolute value: 1/2 × 24 = 12.',
    ],
    misconceptionIndex: 3,
  },
  // 14. Standard - Determinant Property Scaling (Analysis)
  {
    id: 'ch_mat_014',
    nodeId: NODE_C12_APPMATH_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'If A is a 3×3 matrix with |A| = 5, what is the value of |3A|?',
    options: [
      '|3A| = 3 × 5 = 15',
      '|3A| = 3³ × |A| = 27 × 5 = 135',
      '|3A| = 3² × |A| = 9 × 5 = 45',
      '|3A| = 5/3',
    ],
    correctIndex: 1,
    explanation: 'For an n×n matrix, scaling the entire matrix by k scales each of the n rows by k, so |kA| = k^n |A|. For n=3, |3A| = 3³ |A| = 27 × 5 = 135.',
    hints: [
      'Multiplying a matrix by 3 multiplies EVERY row by 3.',
      'A is 3×3, so there are 3 rows scaled by 3.',
      'Use the formula: |kA| = kⁿ |A| where n is the matrix order.',
    ],
    misconceptionIndex: 4,
  },
  // 15. Advanced - Minor & Cofactor Calculation (Analysis)
  {
    id: 'ch_mat_015',
    nodeId: NODE_C12_APPMATH_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For A = [[2, -3, 5], [6, 0, 4], [1, 5, -7]], calculate minor M₂₁ and cofactor C₂₁.',
    options: [
      'M₂₁ = -4, C₂₁ = +4',
      'M₂₁ = -4, C₂₁ = -4',
      'M₂₁ = 4, C₂₁ = -4',
      'M₂₁ = 26, C₂₁ = -26',
    ],
    correctIndex: 0,
    explanation: 'Delete Row 2 and Col 1: submatrix is [[-3, 5], [5, -7]]. M₂₁ = (-3)(-7) - (5)(5) = 21 - 25 = -4. Sign factor is (-1)^{2+1} = -1. Thus C₂₁ = -(-4) = +4.',
    hints: [
      'Cross out the 2nd row and 1st column.',
      'Evaluate 2×2 determinant of remaining entries: [[-3, 5], [5, -7]].',
      '(-3)(-7) - (5)(5) = 21 - 25 = -4. Then apply sign (-1)^{2+1} = -1.',
    ],
  },
  // 16. Advanced - Uniqueness of Matrix Inverse Proof (Evaluation)
  {
    id: 'ch_mat_016',
    nodeId: NODE_C12_APPMATH_017,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Arrange the algebraic justification showing that if a matrix A has inverses B and C, then B must equal C (Uniqueness of Inverse).',
    sortItems: [
      'Assume both B and C are valid inverses of A, so AB = BA = I and AC = CA = I',
      'Start with identity expression: B = B · I',
      'Substitute I with (AC): B = B(AC)',
      'Apply associativity of matrix multiplication: B(AC) = (BA)C',
      'Substitute (BA) with I: (BA)C = I · C = C',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The classic proof uses associativity and the identity matrix: B = BI = B(AC) = (BA)C = IC = C. Hence the inverse is always unique.',
    hints: [
      'First state the assumption that B and C are two inverses.',
      'Express B using the identity matrix B = BI.',
      'Use associativity to group (BA) together.',
    ],
  },
  // 17. Advanced - Construct Skew-Symmetric 3x3 (Creativity)
  {
    id: 'ch_mat_017',
    nodeId: NODE_C12_APPMATH_013,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Build a valid 3×3 skew-symmetric matrix by selecting the correct structural tokens.',
    availableParts: ['Zero-Diagonal', 'a₁₂ = -a₂₁', 'a₁₃ = -a₃₁', 'a₂₃ = -a₃₂', 'Unit-Diagonal', 'Symmetric-Values'],
    targetState: 'Zero-Diagonal a₁₂ = -a₂₁ a₁₃ = -a₃₁ a₂₃ = -a₃₂',
    validationHint: 'Select the 4 rules that define a 3×3 skew-symmetric matrix (diagonal condition + 3 off-diagonal sign inversions).',
    explanation: 'A 3×3 skew-symmetric matrix must have 0 on all diagonal entries (a₁₁=a₂₂=a₃₃=0) and opposite signs for mirrored pairs (a₁₂ = -a₂₁, a₁₃ = -a₃₁, a₂₃ = -a₃₂).',
    hints: [
      'What must the diagonal entries be?',
      'How are mirrored entries across the diagonal related?',
      'Pick Zero-Diagonal and all three negative pairs.',
    ],
  },
  // 18. Advanced - 3x3 Determinant Expansion with Zeros (Application)
  {
    id: 'ch_mat_018',
    nodeId: NODE_C12_APPMATH_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate det(A) for A = [[3, 0, 2], [1, 4, 0], [2, 0, 5]] by expanding along the optimal row/column.',
    correctAnswer: 44,
    tolerance: 0,
    unit: '',
    explanation: 'Expanding along Column 2 (which has two zeros): det(A) = 4 × (-1)^{2+2} × det[[3, 2], [2, 5]] = 4 × 1 × (15 - 4) = 4 × 11 = 44.',
    hints: [
      'Pick Column 2 because it has zeros in row 1 and row 3.',
      'Only the element 4 in position (2,2) contributes!',
      'Compute 4 × [(3)(5) - (2)(2)] = 4 × (15 - 4).',
    ],
  },
  // 19. Advanced - Real-World Cargo Delivery Matrix Product (Application)
  {
    id: 'ch_mat_019',
    nodeId: NODE_C12_APPMATH_015,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Delhi cargo sends [50 crates, 20 palettes] to Mumbai and BLR. Cost per crate is ₹80, per palette is ₹300. What is the total freight cost in ₹?',
    correctAnswer: 10000,
    tolerance: 0,
    unit: '₹',
    explanation: '[50, 20] × [[80], [300]] = (50 × 80) + (20 × 300) = 4000 + 6000 = ₹10,000.',
    hints: [
      'Row vector [50, 20] multiplies column vector [[80], [300]].',
      '50 × 80 = 4000.',
      '20 × 300 = 6000. Add both products.',
    ],
  },
  // 20. Advanced - Reversible Price Adjustment Matrix (Evaluation)
  {
    id: 'ch_mat_020',
    nodeId: NODE_C12_APPMATH_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An airline converts base fares [Economy; Business] using A = [[1, 0.25], [0, 1]]. What is the inverse decoding matrix A⁻¹ to recover the base fares?',
    options: [
      'A⁻¹ = [[1, -0.25], [0, 1]]',
      'A⁻¹ = [[1, 4], [0, 1]]',
      'A⁻¹ = [[-1, -0.25], [0, -1]]',
      'A⁻¹ does not exist because determinant is 0',
    ],
    correctIndex: 0,
    explanation: 'det(A) = (1)(1) - (0.25)(0) = 1. A⁻¹ = (1/det) × [[d, -b], [-c, a]] = [[1, -0.25], [0, 1]]. Verifying: A · A⁻¹ = [[1, 0], [0, 1]] = I.',
    hints: [
      'For 2×2 matrix [[a,b],[c,d]], inverse is (1/ad-bc)[[d,-b],[-c,a]].',
      'Here a=1, b=0.25, c=0, d=1 and det=1.',
      'Swap diagonal (1,1) and negate off-diagonals (-0.25, 0).',
    ],
  },
  // 21. Advanced - Collinear Airspace Check (Creativity/Evaluation)
  {
    id: 'ch_mat_021',
    nodeId: NODE_C12_APPMATH_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To guarantee three flight navigation beacons A(k, 2), B(2, 4), and C(4, 6) form an emergency landing polygon with non-zero area, what condition must k satisfy?',
    options: [
      'k ≠ 0, because k = 0 makes the points collinear on the line y = x + 2',
      'k must be strictly positive',
      'k = 2 only',
      'k can be any real number without restriction',
    ],
    correctIndex: 0,
    explanation: 'det [[k,2,1],[2,4,1],[4,6,1]] = k(4-6) - 2(2-4) + 1(12-16) = -2k + 4 - 4 = -2k. For area > 0, det ≠ 0, hence -2k ≠ 0 ⇒ k ≠ 0. If k=0, (0,2), (2,4), (4,6) lie on y = x + 2.',
    hints: [
      'Set up det [[k,2,1], [2,4,1], [4,6,1]] and simplify.',
      'Expanding along row 1 yields -2k.',
      'For non-zero area, the determinant must NOT equal zero.',
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
  nodeId: NODE_C12_APPMATH_011,
  title: 'Matrices & Determinants: Core Concepts, Operations & Determinants',
  definition: 'A matrix is a structured rectangular array of real numbers of order m×n. Determinants are unique scalars associated with square matrices that measure scaling, invertibility, and geometric area.',
  eli5: 'Think of a matrix like a neat timetable of flights and fares. Determinants tell you if the timetable can be cleanly reversed or if two routes completely overlap.',
  misconceptions: [
    {
      misconception: 'Reversing row and column suffix (treating a_{ij} as column i, row j)',
      correction: 'a_{ij} always means Row i (horizontal) and Column j (vertical). Row comes first!',
    },
    {
      misconception: 'Squaring a matrix by squaring each element individually',
      correction: 'A² means the matrix product A × A via row-by-column dot products, NOT squaring individual cells.',
    },
    {
      misconception: 'Assuming skew-symmetric matrices can have non-zero diagonal entries',
      correction: 'A\' = -A forces a_{ii} = -a_{ii}, meaning 2a_{ii} = 0, so every diagonal entry MUST be 0.',
    },
    {
      misconception: 'Omitting the 1/2 factor or absolute value in determinant area formula',
      correction: 'Triangle Area is strictly 1/2 |det|. The determinant can be negative, but geometric area is always positive.',
    },
    {
      misconception: 'Assuming |kA| = k|A| for an n×n matrix',
      correction: 'Multiplying an n×n matrix by scalar k scales all n rows, so |kA| = k^n |A|.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the order of a matrix with 3 rows and 2 columns?', options: ['2×3', '3×2', '6×1', '3×3'], correctIndex: 1 },
    { question: 'Which matrix type has 1s on main diagonal and 0s elsewhere?', options: ['Zero matrix', 'Diagonal matrix', 'Identity matrix', 'Scalar matrix'], correctIndex: 2 },
    { question: 'For a skew-symmetric matrix A, what is the relation between A and A\'?', options: ['A\' = A', 'A\' = -A', 'A\' = I', 'A\' = A²'], correctIndex: 1 },
    { question: 'When is matrix product AB defined?', options: ['Rows of A = Rows of B', 'Columns of A = Rows of B', 'Orders must be identical', 'Columns of A = Columns of B'], correctIndex: 1 },
    { question: 'If det(A) = 0 for a square matrix A, the matrix is:', options: ['Symmetric', 'Identity', 'Singular', 'Orthogonal'], correctIndex: 2 },
    { question: 'What is the determinant of [[3, 2], [1, 4]]?', options: ['10', '14', '12', '7'], correctIndex: 0 },
    { question: 'If 3 points in a plane are collinear, what is their determinant area?', options: ['1 sq unit', '0 sq units', 'Infinite', '-1 sq unit'], correctIndex: 1 },
    { question: 'What is the cofactor C₁₂ of [[1, 2], [3, 4]]?', options: ['+3', '-3', '+2', '-2'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of matrix notation, special types, algebraic operations, non-commutativity, zero divisors, 2x2/3x3 determinants, cofactors, and triangular coordinate areas.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Matrix Architecture & Entry Addressing',
    instruction: 'Click on individual matrix cells to inspect their double-suffix address a_{ij} and operational role.',
    interactionType: 'click-cell',
    nodeId: NODE_C12_APPMATH_011,
  },
  {
    title: '2. Row-by-Column Dot Product Engine',
    instruction: 'Move the multiplier sliders to see how Row 1 of Matrix A dots with Column 1 of Matrix B in real-time.',
    interactionType: 'matrix-multiply',
    nodeId: NODE_C12_APPMATH_015,
  },
  {
    title: '3. Transpose & Symmetry Mirror',
    instruction: 'Toggle the Transpose switch to fold the matrix along the main diagonal.',
    interactionType: 'transpose-flip',
    nodeId: NODE_C12_APPMATH_013,
  },
  {
    title: '4. Determinant & Submatrix Minor Visualizer',
    instruction: 'Click any matrix element to highlight its deleted row & column and calculate its 2×2 minor.',
    interactionType: 'minor-cofactor',
    nodeId: NODE_C12_APPMATH_018,
  },
  {
    title: '5. Determinant Geometric Area on Radar Plane',
    instruction: 'Drag triangle vertex C on the radar grid and watch the determinant area update dynamically.',
    interactionType: 'triangle-area',
    nodeId: NODE_C12_APPMATH_020,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Airline Network Operations Director Challenge',
  description: 'Construct a 3×3 daily route connection matrix linking Delhi, Mumbai, and Bengaluru. Calculate total revenue under a 10% peak surcharge (scalar multiplication), verify non-singularity for fare recovery, and compute the emergency airspace triangular patrol sector area.',
  steps: [
    'Define 3×3 route frequency matrix F for DEL-BOM-BLR.',
    'Apply 1.10 scalar multiplication to project peak festive demand.',
    'Compute det(F) to verify the route network provides unique transit solutions.',
    'Plot 3 waypoint coordinates on the survey chart and calculate triangular airspace patrol area.',
  ],
};

// ─── MAIN COMPONENT FUNCTION ───
function C12_AppliedMathsMatricesConceptNotationSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_APPMATH_011,
  title = DEFAULT_PROPS.title || 'Matrices & Determinants',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → prediction → explore → observation → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'prediction' | 'explore' | 'observation' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prediction & Observation Interactive States
  const [predIndex, setPredIndex] = useState(0);
  const [predSelected, setPredSelected] = useState<number | null>(null);
  const [predSubmitted, setPredSubmitted] = useState(false);
  const [obsIndex, setObsIndex] = useState(0);
  const [obsSelected, setObsSelected] = useState<number | null>(null);
  const [obsSubmitted, setObsSubmitted] = useState(false);

  // Matrix Interactive Exploration State
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>({ r: 0, c: 0 });
  const [sliderA1, setSliderA1] = useState(2);
  const [sliderA2, setSliderA2] = useState(3);
  const [sliderB1, setSliderB1] = useState(4);
  const [sliderB2, setSliderB2] = useState(5);
  const [isTransposed, setIsTransposed] = useState(false);
  const [selectedMinorCell, setSelectedMinorCell] = useState<{ r: number; c: number }>({ r: 0, c: 1 });

  // Coordinate Radar Triangle Area State
  const [vertexA, setVertexA] = useState({ x: 1, y: 1 });
  const [vertexB, setVertexB] = useState({ x: 5, y: 2 });
  const [vertexC, setVertexC] = useState({ x: 2, y: 5 });

  // Scoring, Adaptation & Hints
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag-and-drop & Non-MCQ challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Visual feedback animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive Challenge Filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Dynamic Triangle Area calculation
  const calculatedTriangleDet = useMemo(() => {
    return (
      vertexA.x * (vertexB.y - vertexC.y) -
      vertexA.y * (vertexB.x - vertexC.x) +
      1 * (vertexB.x * vertexC.y - vertexC.x * vertexB.y)
    );
  }, [vertexA, vertexB, vertexC]);

  const calculatedTriangleArea = useMemo(() => {
    return Math.abs(calculatedTriangleDet) * 0.5;
  }, [calculatedTriangleDet]);

  // Real-time dot product computation
  const dotProductResult = useMemo(() => {
    return sliderA1 * sliderB1 + sliderA2 * sliderB2;
  }, [sliderA1, sliderA2, sliderB1, sliderB2]);

  // Spaced repetition schedule calculation
  const srsScheduleDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive effect
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
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas radar animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Radar grid background
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 20; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      for (let j = 20; j < canvas.height; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Sweeping radar beam
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 70, angle, angle + 0.5);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CALLBACK HANDLERS ───
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction! Let us build the full foundation.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToPrediction = useCallback(() => {
    setPhase('prediction');
    audioManager.play('whoosh');
    speechManager.speak('Make your intuitive prediction before entering the interactive lab.');
  }, []);

  const handlePredictionSubmit = useCallback((idx: number) => {
    setPredSelected(idx);
    setPredSubmitted(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[predIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, [predIndex]);

  const handleNextPredictionOrLab = useCallback(() => {
    if (predIndex + 1 < PREDICTION_QUESTIONS.length) {
      setPredIndex(i => i + 1);
      setPredSelected(null);
      setPredSubmitted(false);
    } else {
      setPhase('explore');
      audioManager.play('whoosh');
      speechManager.speak('Welcome to the interactive matrix flight operations console.');
    }
  }, [predIndex]);

  const handleAdvanceToObservation = useCallback(() => {
    setPhase('observation');
    setObsIndex(0);
    setObsSelected(null);
    setObsSubmitted(false);
    audioManager.play('whoosh');
    speechManager.speak('Now test your visual observations from the lab.');
  }, []);

  const handleObservationSubmit = useCallback((idx: number) => {
    setObsSelected(idx);
    setObsSubmitted(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, [obsIndex]);

  const handleNextObservationOrSandbox = useCallback(() => {
    if (obsIndex + 1 < OBSERVATION_QUESTIONS.length) {
      setObsIndex(i => i + 1);
      setObsSelected(null);
      setObsSubmitted(false);
    } else {
      setPhase('sandbox');
      audioManager.play('whoosh');
      speechManager.speak('Feel free to test matrices, determinants, and areas in the sandbox.');
    }
  }, [obsIndex]);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting competency challenges. Take your time and check each step.');
  }, []);

  const handleCellClick = useCallback((r: number, c: number) => {
    setSelectedCell({ r, c });
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      '0,0': 'Entry a₁₁: Row 1, Column 1. Delhi-to-Mumbai Passenger Load.',
      '0,1': 'Entry a₁₂: Row 1, Column 2. Delhi-to-BLR Passenger Load.',
      '1,0': 'Entry a₂₁: Row 2, Column 1. Mumbai-to-Delhi Passenger Load.',
      '1,1': 'Entry a₂₂: Row 2, Column 2. Mumbai-to-BLR Passenger Load.',
    };
    speechManager.speak(descriptions[`${r},${c}`] || `Matrix entry a subscript ${r + 1} ${c + 1}`);
  }, []);

  const handleMinorCellClick = useCallback((r: number, c: number) => {
    setSelectedMinorCell({ r, c });
    audioManager.play('tap');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the Matrices and Determinants curriculum.');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
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
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
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
          speechManager.speak('Let us study the complete step-by-step solution.');
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
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
      const current = prev.length === (challenge.sortItems?.length || 0) ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleToggleTranspose = useCallback(() => {
    setIsTransposed(prev => !prev);
    audioManager.play('whoosh');
  }, []);

  const handleResetRadarVertices = useCallback(() => {
    setVertexA({ x: 1, y: 1 });
    setVertexB({ x: 5, y: 2 });
    setVertexC({ x: 2, y: 5 });
    audioManager.play('pop');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // 3x3 Sample matrix for exploration step 4
  const matrix3x3Sample = [
    [2, -3, 5],
    [6, 0, 4],
    [1, 5, -7],
  ];

  // Personalized Motivational Feedback based on errors
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gold-900/60 border border-gold-700 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold-500/20 text-gold-400 border border-gold-500/30">
                ISC Class 12
              </span>
              <span className="text-xs font-semibold text-slate-400">Applied Mathematics</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 text-xs">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-300 border-rose-700/60'
                : 'bg-gold-950/60 text-gold-300 border-gold-700/60'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-slate-300">
            Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: NARRATIVE & DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          {/* Scenario Card */}
          <div className="p-5 md:p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">
              <span>✈️ Mission Briefing</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs md:text-sm text-slate-400 mt-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          {/* Discovery Question Card */}
          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🤔 Curiosity Hook (Ungraded)</span>
            </div>
            <p className="text-base md:text-lg text-white font-semibold mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 text-slate-500 border border-slate-800 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                  }`}
                >
                  <span className="inline-block w-6 text-slate-400 font-bold">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : ''}
                    {String.fromCharCode(65 + i)}.
                  </span>{' '}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800">
                <p className={`text-sm font-medium mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Brilliant deduction! Matrix algebra obeys its own dimensional geometry.'
                    : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Proceed to Predict & Check Phase"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToPrediction}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold shadow-lg shadow-gold-600/30 flex items-center gap-2 text-sm"
                >
                  Step 1: Make Your Hypotheses (Predict-Then-Check) →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 1.5: BRILLIANT-STYLE PREDICTION PHASE (Predict-Then-Check) ─── */}
      {phase === 'prediction' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-amber-400">🔮 Predict-Then-Check Protocol ({predIndex + 1} of {PREDICTION_QUESTIONS.length})</span>
            <span className="text-slate-500">Form a hypothesis before interacting</span>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-800/50 space-y-4">
            <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/40">
              Prediction Hypothesis #{predIndex + 1}
            </div>

            <p className="text-base md:text-lg text-white font-semibold">
              {PREDICTION_QUESTIONS[predIndex].question}
            </p>

            <div className="grid grid-cols-1 gap-3">
              {PREDICTION_QUESTIONS[predIndex].options.map((opt, i) => {
                const isSelected = predSelected === i;
                const isCorrect = i === PREDICTION_QUESTIONS[predIndex].correctIndex;
                return (
                  <motion.button
                    key={i}
                    disabled={predSubmitted}
                    onClick={() => handlePredictionSubmit(i)}
                    whileHover={{ scale: predSubmitted ? 1 : 1.01 }}
                    whileTap={{ scale: predSubmitted ? 1 : 0.99 }}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      predSubmitted && isCorrect
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                        : predSubmitted && isSelected && !isCorrect
                        ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-300'
                        : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {predSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className="text-xs text-slate-300">
                  <strong className="text-gold-400">Mathematical Theory:</strong> {PREDICTION_QUESTIONS[predIndex].explanation}
                </p>
                <div className="p-3 bg-gold-950/50 rounded-lg border border-gold-700/60 text-xs text-gold-300 font-mono">
                  🔍 <strong>How to Verify in Lab:</strong> {PREDICTION_QUESTIONS[predIndex].verifyInstruction}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNextPredictionOrLab}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  {predIndex + 1 < PREDICTION_QUESTIONS.length ? 'Next Prediction Question →' : 'Enter Interactive Lab to Verify →'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (Brilliant.org style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Progress Tracker */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Concept Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <span className="font-semibold text-gold-400">{EXPLORATION_STEPS[currentSlide].title}</span>
          </div>
          <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-purple-500"
              animate={{ width: `${((currentSlide + 1) / EXPLORATION_STEPS.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-xs md:text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── SLIDE 0: MATRIX NOTATION & DOUBLE SUFFIX ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800 items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      IndiGo Passenger Traffic Matrix M (Order: 2×2)
                    </p>
                    <div className="inline-block p-4 bg-slate-900 rounded-2xl border-2 border-gold-600/40 relative">
                      <div className="absolute left-1 top-2 bottom-2 w-2 border-l-4 border-t-4 border-b-4 border-slate-400 rounded-l" />
                      <div className="absolute right-1 top-2 bottom-2 w-2 border-r-4 border-t-4 border-b-4 border-slate-400 rounded-r" />

                      <div className="grid grid-cols-2 gap-3 px-3">
                        {[
                          { r: 0, c: 0, val: 120, label: 'a₁₁ (DEL→BOM)' },
                          { r: 0, c: 1, val: 85, label: 'a₁₂ (DEL→BLR)' },
                          { r: 1, c: 0, val: 210, label: 'a₂₁ (BOM→DEL)' },
                          { r: 1, c: 1, val: 140, label: 'a₂₂ (BOM→BLR)' },
                        ].map(cell => {
                          const isSel = selectedCell?.r === cell.r && selectedCell?.c === cell.c;
                          return (
                            <motion.button
                              key={`${cell.r}-${cell.c}`}
                              aria-label={`Matrix element ${cell.label} with value ${cell.val}`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleCellClick(cell.r, cell.c)}
                              className={`w-28 h-20 rounded-xl flex flex-col items-center justify-center p-2 transition-all ${
                                isSel
                                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/40 ring-2 ring-gold-400'
                                  : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700 border border-slate-700'
                              }`}
                            >
                              <span className="text-lg font-black">{cell.val}</span>
                              <span className="text-[10px] opacity-80 mt-1 font-mono">{cell.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Inspector Panel */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
                      Element Inspector Address
                    </div>
                    {selectedCell ? (
                      <div className="space-y-2">
                        <div className="text-2xl font-black text-white font-mono">
                          a_{`{${selectedCell.r + 1}${selectedCell.c + 1}}`} ={' '}
                          <span className="text-gold-400">
                            {selectedCell.r === 0 && selectedCell.c === 0 ? 120 :
                             selectedCell.r === 0 && selectedCell.c === 1 ? 85 :
                             selectedCell.r === 1 && selectedCell.c === 0 ? 210 : 140}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">
                          <strong>Row {selectedCell.r + 1}</strong> (Origin flight city),{' '}
                          <strong>Column {selectedCell.c + 1}</strong> (Destination hub).
                        </p>
                        <div className="text-[11px] text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40">
                          💡 <strong>CISCE Golden Rule:</strong> Double suffix a_{`{ij}`} means Row <em>i</em> first, Column <em>j</em> second. Total elements = m × n = 2 × 2 = 4.
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">Click any matrix box to inspect its address.</p>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: ROW-BY-COLUMN MULTIPLICATION & SVG 1 ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  {/* SVG DIAGRAM 1: Row-by-Column Vector Multiplication Flow */}
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-[11px] font-bold uppercase text-gold-400 mb-1">
                      SVG Diagram 1: Matrix Multiplication Flow (Row Vector × Column Vector)
                    </span>
                    <svg viewBox="0 0 460 120" className="w-full max-w-[460px] h-auto" aria-label="Matrix multiplication row by column dot product diagram">
                      <rect x="20" y="35" width="120" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="35" y="65" fill="#a5b4fc" fontSize="16" fontWeight="bold">[{sliderA1}, {sliderA2}]</text>
                      <text x="45" y="25" fill="#818cf8" fontSize="11" fontWeight="bold">Row 1 of A</text>

                      <text x="155" y="65" fill="#f8fafc" fontSize="20" fontWeight="bold">×</text>

                      <rect x="180" y="20" width="65" height="80" rx="8" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
                      <text x="202" y="50" fill="#e9d5ff" fontSize="16" fontWeight="bold">[{sliderB1}]</text>
                      <text x="202" y="80" fill="#e9d5ff" fontSize="16" fontWeight="bold">[{sliderB2}]</text>
                      <text x="180" y="15" fill="#c084fc" fontSize="11" fontWeight="bold">Col 1 of B</text>

                      <path d="M 260 60 L 295 60" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                        </marker>
                      </defs>

                      <rect x="310" y="25" width="130" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="325" y="55" fill="#6ee7b7" fontSize="13" fontWeight="bold">({sliderA1}×{sliderB1})+({sliderA2}×{sliderB2})</text>
                      <text x="350" y="80" fill="#a7f3d0" fontSize="16" fontWeight="bold">= {dotProductResult}</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Controls */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase text-gold-400">
                        Row 1 of A: [{sliderA1}, {sliderA2}]
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="sliderA1" className="text-[11px] text-slate-400 flex justify-between">
                          <span>a₁₁ (Delhi cargo volume):</span>
                          <span className="font-mono text-white">{sliderA1}</span>
                        </label>
                        <input
                          id="sliderA1"
                          aria-label="a11 Delhi cargo volume"
                          type="range"
                          min={1}
                          max={9}
                          value={sliderA1}
                          onChange={e => setSliderA1(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="sliderA2" className="text-[11px] text-slate-400 flex justify-between">
                          <span>a₁₂ (Mumbai cargo volume):</span>
                          <span className="font-mono text-white">{sliderA2}</span>
                        </label>
                        <input
                          id="sliderA2"
                          aria-label="a12 Mumbai cargo volume"
                          type="range"
                          min={1}
                          max={9}
                          value={sliderA2}
                          onChange={e => setSliderA2(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase text-purple-400">
                        Column 1 of B: [{sliderB1}, {sliderB2}]ᵀ
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="sliderB1" className="text-[11px] text-slate-400 flex justify-between">
                          <span>b₁₁ (Tariff rate ₹/kg):</span>
                          <span className="font-mono text-white">{sliderB1}</span>
                        </label>
                        <input
                          id="sliderB1"
                          aria-label="b11 tariff rate"
                          type="range"
                          min={1}
                          max={9}
                          value={sliderB1}
                          onChange={e => setSliderB1(Number(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="sliderB2" className="text-[11px] text-slate-400 flex justify-between">
                          <span>b₂₁ (Handling rate ₹/kg):</span>
                          <span className="font-mono text-white">{sliderB2}</span>
                        </label>
                        <input
                          id="sliderB2"
                          aria-label="b21 handling rate"
                          type="range"
                          min={1}
                          max={9}
                          value={sliderB2}
                          onChange={e => setSliderB2(Number(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dot Product Live Visualization */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                    <p className="text-xs text-slate-400">Dot Product Calculation: (Row 1 of A) • (Column 1 of B)</p>
                    <div className="text-lg md:text-xl font-mono text-white">
                      ({sliderA1} × {sliderB1}) + ({sliderA2} × {sliderB2}) ={' '}
                      <span className="text-emerald-400 font-bold">{sliderA1 * sliderB1} + {sliderA2 * sliderB2} = {dotProductResult}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Product entry <code className="text-gold-300">c₁₁</code> in (AB) receives the accumulated total <strong className="text-white">{dotProductResult}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: TRANSPOSE & SYMMETRY & SVG 2 ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  {/* SVG DIAGRAM 2: Diagonal Reflection / Transpose Geometry */}
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-[11px] font-bold uppercase text-amber-400 mb-1">
                      SVG Diagram 2: Main Diagonal Reflection Line (A vs Transpose A&apos;)
                    </span>
                    <svg viewBox="0 0 320 130" className="w-full max-w-[320px] h-auto" aria-label="Matrix transpose symmetry reflection line diagram">
                      <rect x="30" y="20" width="110" height="90" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                      <line x1="30" y1="20" x2="140" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />
                      <circle cx="55" cy="42" r="14" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="51" y="47" fill="#fef3c7" fontSize="13" fontWeight="bold">7</text>
                      <circle cx="115" cy="42" r="14" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="110" y="47" fill="#e0e7ff" fontSize="13" fontWeight="bold">{isTransposed ? -3 : 4}</text>
                      <circle cx="55" cy="88" r="14" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="50" y="93" fill="#e0e7ff" fontSize="13" fontWeight="bold">{isTransposed ? 4 : -3}</text>
                      <circle cx="115" cy="88" r="14" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="111" y="93" fill="#fef3c7" fontSize="13" fontWeight="bold">9</text>

                      <path d="M 165 65 Q 185 45 205 65" stroke="#38bdf8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                      <text x="165" y="35" fill="#38bdf8" fontSize="10" fontWeight="bold">Diagonal Flip</text>

                      <rect x="215" y="25" width="85" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="225" y="48" fill="#94a3b8" fontSize="10">Order: 2×2</text>
                      <text x="225" y="68" fill="#38bdf8" fontSize="11" fontWeight="bold">a_{`{ij}`} ⇄ a_{`{ji}`}</text>
                      <text x="225" y="88" fill="#f59e0b" fontSize="10">Diag: Fixed</text>
                    </svg>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold uppercase text-slate-400">
                      Matrix State: {isTransposed ? 'Transposed (A\')' : 'Original (A)'}
                    </div>
                    <motion.button
                      aria-label="Flip Transpose matrix"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleToggleTranspose}
                      className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow"
                    >
                      🔄 Flip Transpose (Swap Rows &amp; Cols)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    {[
                      { r: 0, c: 0, val: 7, diag: true },
                      { r: 0, c: 1, val: isTransposed ? -3 : 4, diag: false },
                      { r: 1, c: 0, val: isTransposed ? 4 : -3, diag: false },
                      { r: 1, c: 1, val: 9, diag: true },
                    ].map((cell, idx) => (
                      <motion.div
                        key={idx}
                        layout
                        className={`h-20 rounded-xl flex flex-col items-center justify-center font-mono ${
                          cell.diag
                            ? 'bg-amber-950/60 border-2 border-amber-500/60 text-amber-200'
                            : 'bg-gold-950/60 border border-gold-700/60 text-gold-200'
                        }`}
                      >
                        <span className="text-xl font-bold">{cell.val}</span>
                        <span className="text-[10px] text-slate-400">
                          {cell.diag ? 'Main Diagonal (Fixed)' : isTransposed ? 'Reflected Entry' : 'Off-diagonal'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-center text-slate-400">
                    Notice: Elements on the main diagonal (7 and 9) <strong>never change position</strong> when transposed!
                  </p>
                </div>
              )}

              {/* ─── SLIDE 3: DETERMINANTS & MINORS (3x3) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">
                    Click any cell to cross out its row &amp; column and view its 2×2 minor submatrix:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 inline-block mx-auto">
                      <div className="grid grid-cols-3 gap-2">
                        {matrix3x3Sample.map((row, r) =>
                          row.map((val, c) => {
                            const isSelected = selectedMinorCell.r === r && selectedMinorCell.c === c;
                            const isDeleted = selectedMinorCell.r === r || selectedMinorCell.c === c;
                            return (
                              <motion.button
                                key={`${r}-${c}`}
                                aria-label={`Matrix cell row ${r + 1} col ${c + 1} value ${val}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMinorCellClick(r, c)}
                                className={`w-16 h-14 rounded-lg font-mono font-bold text-sm flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-amber-500 text-black shadow-lg ring-2 ring-amber-300'
                                    : isDeleted
                                    ? 'bg-slate-800/40 text-slate-600 line-through border border-dashed border-slate-700'
                                    : 'bg-gold-900/60 text-white border border-gold-600'
                                }`}
                              >
                                {val}
                              </motion.button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-gold-400 uppercase">
                        Minor &amp; Cofactor for a_{`{${selectedMinorCell.r + 1}${selectedMinorCell.c + 1}}`}
                      </div>
                      <p className="text-slate-300">
                        Selected Element:{' '}
                        <strong className="text-white font-mono">
                          {matrix3x3Sample[selectedMinorCell.r][selectedMinorCell.c]}
                        </strong>
                      </p>
                      <p className="text-slate-300">
                        Sign Factor: (-1)^{`{${selectedMinorCell.r + 1} + ${selectedMinorCell.c + 1}}`} ={' '}
                        <strong className="text-amber-300">
                          {(selectedMinorCell.r + selectedMinorCell.c) % 2 === 0 ? '+1' : '-1'}
                        </strong>
                      </p>
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                        The four uncrossed entries form the 2×2 submatrix. Compute <code>ad - bc</code> to get the minor M_{`{${selectedMinorCell.r + 1}${selectedMinorCell.c + 1}}`}.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: RADAR TRIANGLE AREA & SVG 3 ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* SVG DIAGRAM 3: Interactive Radar Plane Coordinates & Area */}
                    <div className="relative bg-slate-900 p-2 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold uppercase text-gold-400 mb-1">
                        SVG Diagram 3: Radar Coordinates Flight Triangle Sector
                      </span>
                      <svg viewBox="0 0 240 240" className="w-full max-w-[240px] aspect-square" aria-label="Interactive radar triangular flight sector SVG diagram">
                        {[40, 80, 120, 160, 200].map(val => (
                          <React.Fragment key={val}>
                            <line x1={val} y1={0} x2={val} y2={240} stroke="#334155" strokeWidth="0.5" />
                            <line x1={0} y1={val} x2={240} y2={val} stroke="#334155" strokeWidth="0.5" />
                          </React.Fragment>
                        ))}
                        {/* Triangle Polygon */}
                        <polygon
                          points={`${vertexA.x * 30 + 20},${220 - vertexA.y * 30} ${vertexB.x * 30 + 20},${220 - vertexB.y * 30} ${vertexC.x * 30 + 20},${220 - vertexC.y * 30}`}
                          fill="rgba(99, 102, 241, 0.25)"
                          stroke="#6366f1"
                          strokeWidth="2"
                        />
                        {/* Vertices */}
                        <circle cx={vertexA.x * 30 + 20} cy={220 - vertexA.y * 30} r={5} fill="#22c55e" />
                        <text x={vertexA.x * 30 + 28} y={220 - vertexA.y * 30 - 4} fill="#22c55e" fontSize="9" fontWeight="bold">A({vertexA.x},{vertexA.y})</text>

                        <circle cx={vertexB.x * 30 + 20} cy={220 - vertexB.y * 30} r={5} fill="#3b82f6" />
                        <text x={vertexB.x * 30 + 28} y={220 - vertexB.y * 30 - 4} fill="#3b82f6" fontSize="9" fontWeight="bold">B({vertexB.x},{vertexB.y})</text>

                        <circle cx={vertexC.x * 30 + 20} cy={220 - vertexC.y * 30} r={6} fill="#f59e0b" />
                        <text x={vertexC.x * 30 + 28} y={220 - vertexC.y * 30 - 4} fill="#f59e0b" fontSize="9" fontWeight="bold">C({vertexC.x},{vertexC.y})</text>
                      </svg>
                    </div>

                    {/* Coordinates & Determinant Area Output */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase text-amber-400">
                        Vertex C Drag / Coordinate Sliders
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="vertexCX" className="text-[11px] text-slate-400 flex justify-between">
                          <span>Vertex C X-Coord:</span>
                          <span className="font-mono text-white">{vertexC.x}</span>
                        </label>
                        <input
                          id="vertexCX"
                          aria-label="Vertex C X-Coordinate"
                          type="range"
                          min={0}
                          max={6}
                          value={vertexC.x}
                          onChange={e => setVertexC(prev => ({ ...prev, x: Number(e.target.value) }))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="vertexCY" className="text-[11px] text-slate-400 flex justify-between">
                          <span>Vertex C Y-Coord:</span>
                          <span className="font-mono text-white">{vertexC.y}</span>
                        </label>
                        <input
                          id="vertexCY"
                          aria-label="Vertex C Y-Coordinate"
                          type="range"
                          min={0}
                          max={6}
                          value={vertexC.y}
                          onChange={e => setVertexC(prev => ({ ...prev, y: Number(e.target.value) }))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <div className="text-xs text-slate-400">det [[x,y,1]]: <span className="font-mono text-white">{calculatedTriangleDet}</span></div>
                        <div className="text-base font-bold text-emerald-400">
                          Area = ½ |det| = {calculatedTriangleArea} sq units
                        </div>
                        {calculatedTriangleArea === 0 && (
                          <div className="text-[11px] text-rose-400 font-bold">
                            ⚠️ Points A, B, and C are COLLINEAR! (Zero area)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Answer Observation Questions"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToObservation}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Step 2: 'What Did You Notice?' Observations →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2.5: BRILLIANT-STYLE OBSERVATION QUESTIONS ─── */}
      {phase === 'observation' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-gold-400">👀 Active Observation Check ({obsIndex + 1} of {OBSERVATION_QUESTIONS.length})</span>
            <span className="text-slate-500">Analyze the visual phenomena you witnessed</span>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-800/50 space-y-4">
            <div className="inline-block px-3 py-1 bg-gold-500/20 text-gold-300 text-xs font-bold rounded-lg border border-gold-500/40">
              Observation #{obsIndex + 1}
            </div>

            <p className="text-base md:text-lg text-white font-semibold">
              {OBSERVATION_QUESTIONS[obsIndex].prompt}
            </p>

            <div className="grid grid-cols-1 gap-3">
              {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, i) => {
                const isSelected = obsSelected === i;
                const isCorrect = i === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
                return (
                  <motion.button
                    key={i}
                    disabled={obsSubmitted}
                    onClick={() => handleObservationSubmit(i)}
                    whileHover={{ scale: obsSubmitted ? 1 : 1.01 }}
                    whileTap={{ scale: obsSubmitted ? 1 : 0.99 }}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      obsSubmitted && isCorrect
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                        : obsSubmitted && isSelected && !isCorrect
                        ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-300'
                        : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {obsSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className="text-xs text-emerald-300 font-medium">
                  💡 <strong>Core Mathematical Insight:</strong> {OBSERVATION_QUESTIONS[obsIndex].insight}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNextObservationOrSandbox}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  {obsIndex + 1 < OBSERVATION_QUESTIONS.length ? 'Next Observation →' : 'Enter Free Sandbox Workbench →'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (Zero pressure) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <span>🧪 Open Sandbox Simulator</span>
              </div>
              <h3 className="text-xl font-bold text-white">Live Flight Matrix &amp; Radar Workbench</h3>
              <p className="text-xs text-slate-400 mt-1">Manipulate variables freely with zero grading.</p>
            </div>
            <motion.button
              aria-label="Proceed to Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30 text-sm"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live 2x2 Matrix Invertibility Tester */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
                1. 2×2 Invertibility &amp; Determinant Live Test
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="sbSliderA1" className="text-[11px] text-slate-400">a₁₁: {sliderA1}</label>
                  <input
                    id="sbSliderA1"
                    aria-label="Sandbox a11 value"
                    type="range"
                    min={-5}
                    max={10}
                    value={sliderA1}
                    onChange={e => setSliderA1(Number(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="sbSliderA2" className="text-[11px] text-slate-400">a₁₂: {sliderA2}</label>
                  <input
                    id="sbSliderA2"
                    aria-label="Sandbox a12 value"
                    type="range"
                    min={-5}
                    max={10}
                    value={sliderA2}
                    onChange={e => setSliderA2(Number(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="sbSliderB1" className="text-[11px] text-slate-400">a₂₁: {sliderB1}</label>
                  <input
                    id="sbSliderB1"
                    aria-label="Sandbox a21 value"
                    type="range"
                    min={-5}
                    max={10}
                    value={sliderB1}
                    onChange={e => setSliderB1(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="sbSliderB2" className="text-[11px] text-slate-400">a₂₂: {sliderB2}</label>
                  <input
                    id="sbSliderB2"
                    aria-label="Sandbox a22 value"
                    type="range"
                    min={-5}
                    max={10}
                    value={sliderB2}
                    onChange={e => setSliderB2(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div>det(A) = ({sliderA1} × {sliderB2}) - ({sliderA2} × {sliderB1}) = <strong className="text-white">{sliderA1 * sliderB2 - sliderA2 * sliderB1}</strong></div>
                <div className={`font-bold ${sliderA1 * sliderB2 - sliderA2 * sliderB1 !== 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {sliderA1 * sliderB2 - sliderA2 * sliderB1 !== 0
                    ? '✓ Non-Singular (Invertible matrix exists!)'
                    : '✗ Singular (|A| = 0, no inverse exists!)'}
                </div>
              </div>
            </div>

            {/* Radar Coordinates Dynamic Area */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  2. Dynamic Radar Sector Area
                </h4>
                <button
                  aria-label="Reset radar points"
                  onClick={handleResetRadarVertices}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Reset Points
                </button>
              </div>

              <canvas ref={canvasRef} width={300} height={120} className="w-full rounded-xl bg-slate-950 border border-slate-800" />

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Triangle ABC Sector:</span>
                <span className="text-base font-bold text-emerald-400 font-mono">{calculatedTriangleArea} sq units</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: STRUCTURED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Challenge Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-base md:text-lg font-bold text-white mt-0.5">
                Competency Assessment
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-700/60">
                NEP: {challenge.competencyLevel}
              </span>
              <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg border ${
                challenge.difficulty === 'foundation'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                  : challenge.difficulty === 'advanced'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-700/60'
                  : 'bg-gold-950/80 text-gold-300 border-gold-700/60'
              }`}>
                {challenge.difficulty}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-pink-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-base md:text-lg text-white font-medium leading-relaxed">
              {challenge.question}
            </p>

            {/* ─── TYPE 1: MCQ (Classify / Distinguish / Match) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Choice ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/70 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    <span className="inline-block w-6 text-slate-400 font-bold">
                      {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                      {String.fromCharCode(65 + i)}.
                    </span>{' '}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── TYPE 2: DRAG-LABEL CHALLENGE ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels onto their targets below:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => {
                    const descriptions: Record<string, string> = {
                      box_identity: 'Diagonal is [1, 1], off-diagonals are 0',
                      box_scalar: 'Diagonal is [k, k] where k ≠ 1, off-diagonals 0',
                      box_upper: 'Entries strictly below diagonal are 0',
                      box_zero: 'All matrix entries are 0',
                    };
                    return (
                      <div
                        key={targetId}
                        role="region"
                        aria-label={`Drop target for ${descriptions[targetId] || targetId}`}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                      >
                        <span className="text-xs text-slate-400">{descriptions[targetId] || targetId}</span>
                        <div className="mt-2 text-sm font-bold text-gold-300 font-mono">
                          {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : '👉 Drop Matching Category Here'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  aria-label="Verify Matrix Placements"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Matrix Placements
                </motion.button>
              </div>
            )}

            {/* ─── TYPE 3: DRAG-SORT CHALLENGE ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Drag to arrange in logical sequential order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIndex + 1}: ${item}`}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800/90 hover:bg-slate-800 rounded-xl text-slate-200 text-xs md:text-sm font-medium border border-slate-700 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-900/60 text-gold-300 font-bold flex items-center justify-center text-xs">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Sequence"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* ─── TYPE 4: NUMERIC CHALLENGE ─── */}
            {challenge.type === 'numeric' && (
              <div className="pt-3 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Enter calculated numeric answer"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:outline-none focus:border-gold-500 w-48"
                  />
                  {challenge.unit && <span className="text-sm text-slate-400">{challenge.unit}</span>}
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow disabled:opacity-40"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── TYPE 5: CONSTRUCT CHALLENGE ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      aria-label={`Add token: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-900/80 hover:bg-gold-800 text-gold-200 rounded-lg text-xs font-bold border border-gold-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gold-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        aria-label={`Remove token ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-red-300 hover:text-white"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click the condition tokens above to build definition</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Definition"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow disabled:opacity-40"
                >
                  Verify Definition
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-950 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Step-by-Step Educational Solution:
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-100 leading-relaxed font-mono"
                      >
                        <span className="font-bold text-amber-400">Step {idx + 1}:</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Next Challenge or Finish"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Curriculum →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD RETENTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          {/* Hero Banner */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 rounded-3xl border border-gold-700/60 text-center space-y-3">
            <div className="text-4xl">🎉</div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Curriculum Mastery Achieved!</h2>
            <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
              You have mastered Matrix Algebra, Determinants, Transpose Symmetry, Invertibility, and Triangle Coordinate Areas.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Mastery Level</div>
                <div className="text-xl font-black text-gold-400 uppercase">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback Banner */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 text-xs md:text-sm text-emerald-300">
            <div className="text-base font-bold text-emerald-200 mb-1">
              ✓ {motivationalMessage}
            </div>
            <div>
              {errors === 0
                ? 'Flawless performance! You displayed perfect computational precision on row-by-column products and determinant expansions.'
                : errors <= 3
                ? 'Superb work! Your conceptual grasp of matrix non-commutativity and triangle area is solid.'
                : errors <= 7
                ? 'Good effort! You are making steady progress through tricky matrix proofs.'
                : 'Do not give up — You WILL get this! Every algebraic error is a step toward complete mathematical fluency.'}
            </div>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY CARD ─── */}
          <div className="p-5 md:p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-gold-950/60 rounded-2xl border-2 border-amber-600/60 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
                <span>🧠 Spaced Repetition System (SM-2)</span>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-mono font-bold border border-amber-500/40">
                Recommended Review
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                srsScheduleDays === 7 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg' : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
              }`}>
                <span className="text-xs font-bold uppercase">0 Errors (Mastery)</span>
                <span className="text-xl font-black mt-1">Review in 7 Days</span>
                <span className="text-[11px] mt-2">Long-term consolidation phase</span>
              </div>
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                srsScheduleDays === 3 ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-lg' : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
              }`}>
                <span className="text-xs font-bold uppercase">1 - 3 Errors (Proficient)</span>
                <span className="text-xl font-black mt-1">Review in 3 Days</span>
                <span className="text-[11px] mt-2">Reinforce matrix multiplication rules</span>
              </div>
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                srsScheduleDays === 1 ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg' : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
              }`}>
                <span className="text-xs font-bold uppercase">4+ Errors (Needs Practice)</span>
                <span className="text-xl font-black mt-1">Review in 1 Day</span>
                <span className="text-[11px] mt-2">Quick recall booster session</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              Your next review session for <strong>{title}</strong> is locked in for <span className="text-white font-bold">{srsScheduleDays} day{srsScheduleDays > 1 ? 's' : ''} from today</span>.
            </p>
          </div>

          {/* Misconception Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Personalized Review: Target Exam Misconceptions
              </h3>
              {hitMisconceptions.map(idx => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="text-rose-400 font-bold">✗ Common Trap: {m.misconception}</div>
                    <div className="text-emerald-400">✓ CISCE Standard: {m.correction}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_AppliedMathsMatricesConceptNotationSim;
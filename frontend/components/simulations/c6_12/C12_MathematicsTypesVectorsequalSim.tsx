'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 MATHEMATICS - VECTOR ALGEBRA & 3D GEOMETRY NODES ───
const NODE_C12_MATH_071 = 'c12_math_071'; // Types of vectors (equal, unit, zero, parallel, collinear)
const NODE_C12_MATH_072 = 'c12_math_072'; // Position vector and components of a vector
const NODE_C12_MATH_073 = 'c12_math_073'; // Vector addition and scalar multiplication
const NODE_C12_MATH_074 = 'c12_math_074'; // Section formula in vectors
const NODE_C12_MATH_075 = 'c12_math_075'; // Scalar (dot) product of vectors
const NODE_C12_MATH_076 = 'c12_math_076'; // Vector (cross) product of vectors
const NODE_C12_MATH_077 = 'c12_math_077'; // Direction cosines and direction ratios
const NODE_C12_MATH_078 = 'c12_math_078'; // 3D Geometry - equation of a line (Cartesian and vector)
const NODE_C12_MATH_079 = 'c12_math_079'; // 3D Geometry - coplanar and skew lines, shortest distance
const NODE_C12_MATH_080 = 'c12_math_080'; // 3D Geometry - equation of a plane

const ALL_NODE_IDS = [
  NODE_C12_MATH_071,
  NODE_C12_MATH_072,
  NODE_C12_MATH_073,
  NODE_C12_MATH_074,
  NODE_C12_MATH_075,
  NODE_C12_MATH_076,
  NODE_C12_MATH_077,
  NODE_C12_MATH_078,
  NODE_C12_MATH_079,
  NODE_C12_MATH_080,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Flight Dynamics Trajectory Lab',
  intro: 'You are a Flight Dynamics Specialist at ISRO Telemetry, Tracking and Command Network (ISTRAC) in Bengaluru. To guide orbital maneuvers, solar-sail orientation, and lunar descent planes, you need vector operations and 3D spatial geometry.',
  context: 'From calculating thrust vectors and collinear trajectory burns, to computing the shortest distance between orbital trajectories and finding normal vectors to solar arrays, master the geometry of spaceflight.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A spacecraft fires two thrusters creating vectors a = 3i + 4j and b = 6i + 8j. What is the precise geometric relationship between these two vectors?',
  options: [
    'They are completely equal vectors with identical thrust',
    'They are parallel and collinear vectors because b = 2a, but have different magnitudes',
    'They are perpendicular vectors because their cross product is non-zero',
    'They are skew vectors operating in different orbital planes'
  ],
  correctIndex: 1,
  hintAfter: 'Notice that b is exactly 2 times a! They point in the exact same direction, but b has twice the length (magnitude 10 vs 5). Let us explore all types of vectors and 3D geometry interactively!',
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

// ─── CHALLENGES ARRAY (21 Challenges: 7 Foundation, 7 Standard, 7 Advanced) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION 1: c12_math_071 (Recall)
  {
    id: 'ch_f01',
    nodeId: NODE_C12_MATH_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Two vectors u and v are defined to be "Equal Vectors" if and only if:',
    options: [
      'They have the same magnitude only, regardless of direction or position',
      'They have the same initial point and same direction',
      'They have both the same magnitude AND the same direction, regardless of initial points',
      'They are parallel and lie on the exact same supporting line'
    ],
    correctIndex: 2,
    explanation: 'Equal vectors require BOTH identical magnitude and identical direction. In vector algebra, vectors are free to translate in space; starting points do not need to coincide.',
    hints: [
      'Remember that a vector is fully defined by its magnitude (length) and direction.',
      'Vectors are free to translate anywhere in space without changing.',
      'Both magnitude and direction must match simultaneously for equality.'
    ],
    misconceptionIndex: 0
  },
  // ── FOUNDATION 2: c12_math_071 (Unit Vector calculation)
  {
    id: 'ch_f02',
    nodeId: NODE_C12_MATH_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the unit vector in the direction of the velocity vector v = 3i - 4j + 12k?',
    options: [
      '(3/13)i - (4/13)j + (12/13)k',
      '(3/5)i - (4/5)j + (12/5)k',
      '3i - 4j + 12k',
      '(3/169)i - (4/169)j + (12/169)k'
    ],
    correctIndex: 0,
    explanation: 'The magnitude |v| = sqrt(3^2 + (-4)^2 + 12^2) = sqrt(9 + 16 + 144) = sqrt(169) = 13. The unit vector v^ = v / |v| = (3/13)i - (4/13)j + (12/13)k.',
    hints: [
      'First calculate the magnitude using the 3D Pythagorean distance formula: sqrt(x^2 + y^2 + z^2).',
      'sqrt(9 + 16 + 144) = sqrt(169) = 13.',
      'Divide each component of v by 13.'
    ],
    misconceptionIndex: 1
  },
  // ── FOUNDATION 3: c12_math_072 (Position Vector & Displacement)
  {
    id: 'ch_f03',
    nodeId: NODE_C12_MATH_072,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A sensor beacon moves from point A(1, 2, 3) to B(4, 6, 3). What is the displacement vector AB and its dimension?',
    options: [
      'AB = 3i + 4j + 0k (2D vector in xy-plane, magnitude 5)',
      'AB = 5i + 8j + 6k (3D vector, magnitude sqrt(125))',
      'AB = -3i - 4j (2D vector pointing from B to A)',
      'AB = 3i + 4j + 6k (3D vector, magnitude sqrt(61))'
    ],
    correctIndex: 0,
    explanation: 'Vector AB = (x2 - x1)i + (y2 - y1)j + (z2 - z1)k = (4-1)i + (6-2)j + (3-3)k = 3i + 4j. Since the z-component is 0, it lies entirely in the xy-plane (2D) with magnitude sqrt(3^2 + 4^2) = 5.',
    hints: [
      'Always subtract tail coordinates from head coordinates: B - A.',
      '(4-1)i + (6-2)j + (3-3)k gives the components.',
      'Notice that the z-component is zero, meaning displacement is confined to the xy plane.'
    ],
    misconceptionIndex: 2
  },
  // ── FOUNDATION 4: c12_math_073 (Vector Addition)
  {
    id: 'ch_f04',
    nodeId: NODE_C12_MATH_073,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If force F1 = 2i + 3j - k and force F2 = i - 4j + 5k act on a satellite, what is the resultant force vector F1 + F2?',
    options: [
      '3i - j + 4k',
      'i + 7j - 6k',
      '3i + 7j + 4k',
      '2i - 12j - 5k'
    ],
    correctIndex: 0,
    explanation: 'Add component-by-component: (2+1)i + (3 + (-4))j + (-1 + 5)k = 3i - j + 4k.',
    hints: [
      'Vector addition operates independently along i, j, and k unit vectors.',
      'Add i components: 2 + 1 = 3.',
      'Add j components: 3 - 4 = -1; add k components: -1 + 5 = 4.'
    ],
    misconceptionIndex: 3
  },
  // ── FOUNDATION 5: c12_math_074 (Midpoint Formula - Application)
  {
    id: 'ch_f05',
    nodeId: NODE_C12_MATH_074,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Two tracking stations have position vectors a = 4i - 2j + 6k and b = 2i + 6j - 2k. What is the position vector of the relay satellite stationed exactly at their midpoint M?',
    options: [
      '3i + 2j + 2k',
      '6i + 4j + 4k',
      '2i - 8j + 8k',
      'i + 4j - 4k'
    ],
    correctIndex: 0,
    explanation: 'The midpoint formula is OM = (a + b) / 2 = ((4+2)i + (-2+6)j + (6-2)k) / 2 = (6i + 4j + 4k)/2 = 3i + 2j + 2k.',
    hints: [
      'The midpoint of two position vectors is their simple arithmetic average: (a + b)/2.',
      'Sum the vectors: (4+2)i + (-2+6)j + (6-2)k = 6i + 4j + 4k.',
      'Divide every component by 2.'
    ],
    misconceptionIndex: 4
  },
  // ── FOUNDATION 6: c12_math_077 (Direction Cosines Identity - Recall)
  {
    id: 'ch_f06',
    nodeId: NODE_C12_MATH_077,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If a directed line makes angles alpha, beta, gamma with the positive x, y, and z axes, which fundamental identity do its direction cosines l, m, n satisfy?',
    options: [
      'l^2 + m^2 + n^2 = 1',
      'l + m + n = 1',
      'l^2 + m^2 + n^2 = 0',
      'l*m*n = 1'
    ],
    correctIndex: 0,
    explanation: 'Direction cosines are the components of a unit vector along the line (l i + m j + n k). Since the magnitude of any unit vector is 1, sqrt(l^2 + m^2 + n^2) = 1, which gives l^2 + m^2 + n^2 = 1.',
    hints: [
      'Direction cosines l, m, n represent cos(alpha), cos(beta), cos(gamma).',
      'They form the unit vector u = l i + m j + n k.',
      'The length of a unit vector squared is 1^2 = 1.'
    ],
    misconceptionIndex: 2
  },
  // ── FOUNDATION 7: c12_math_075 (Dot Product Basics - Numeric)
  {
    id: 'ch_f07',
    nodeId: NODE_C12_MATH_075,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the scalar (dot) product a . b for vectors a = 2i + 3j + 4k and b = 5i - 2j + 1k.',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: '',
    explanation: 'a . b = a1*b1 + a2*b2 + a3*b3 = (2)(5) + (3)(-2) + (4)(1) = 10 - 6 + 4 = 8.',
    hints: [
      'Multiply corresponding components and add them together.',
      '(2 * 5) + (3 * -2) + (4 * 1).',
      '10 - 6 + 4 = 8.'
    ],
    misconceptionIndex: 0
  },

  // ── STANDARD 1: c12_math_074 (Section Formula Internal Division)
  {
    id: 'ch_s01',
    nodeId: NODE_C12_MATH_074,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the position vector of point P dividing the line segment joining A(a = 2i - j + 3k) and B(b = 4i + 3j - k) internally in the ratio 3 : 1.',
    options: [
      '(7/2)i + 2j + 0k',
      '(5/2)i + 1j + 2k',
      '5i + 5j - 3k',
      '(14i + 8j + 2k)/3'
    ],
    correctIndex: 0,
    explanation: 'By the section formula: OP = (1*a + 3*b)/(3 + 1) = ((2i - j + 3k) + 3(4i + 3j - k))/4 = ((2+12)i + (-1+9)j + (3-3)k)/4 = (14i + 8j + 0k)/4 = (7/2)i + 2j + 0k.',
    hints: [
      'For internal ratio m:n, OP = (n*a + m*b) / (m + n). Notice weights are swapped!',
      'm = 3, n = 1, so OP = (1*a + 3*b) / 4.',
      'Compute numerator: (2i - j + 3k) + (12i + 9j - 3k) = 14i + 8j. Divide by 4.'
    ],
    misconceptionIndex: 4
  },
  // ── STANDARD 2: c12_math_075 (Orthogonality Condition - Analysis)
  {
    id: 'ch_s02',
    nodeId: NODE_C12_MATH_075,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Two attitude control thruster vectors a = 2i + x*j + 4k and b = 3i - 2j - 1k must be orthogonal (perpendicular). What value must scalar x have?',
    correctAnswer: 1,
    tolerance: 0.05,
    unit: '',
    explanation: 'For orthogonal vectors, a . b = 0. Thus (2)(3) + (x)(-2) + (4)(-1) = 0 => 6 - 2x - 4 = 0 => 2 - 2x = 0 => 2x = 2 => x = 1.',
    hints: [
      'Perpendicularity in vector algebra means the dot product equals 0.',
      'Set a1*b1 + a2*b2 + a3*b3 = 0.',
      '(2*3) + (x * -2) + (4 * -1) = 0 => 6 - 2x - 4 = 0.'
    ],
    misconceptionIndex: 0
  },
  // ── STANDARD 3: c12_math_076 (Cross Product & Parallelogram Area - Application)
  {
    id: 'ch_s03',
    nodeId: NODE_C12_MATH_076,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A solar sail is spanned by adjacent vector sides a = 3i - j - k and b = 4i + 2j + 4k. What is the cross product a x b and the sail area?',
    options: [
      'a x b = -2i - 16j + 10k, Area = 6*sqrt(10) sq units',
      'a x b = 2i + 16j - 10k, Area = 3*sqrt(10) sq units',
      'a x b = -2i + 16j + 10k, Area = 18 sq units',
      'a x b = 6i - 2j - 4k, Area = sqrt(56) sq units'
    ],
    correctIndex: 0,
    explanation: 'Determinant expansion: i((-1)(4) - (-1)(2)) - j((3)(4) - (-1)(4)) + k((3)(2) - (-1)(4)) = -2i - 16j + 10k. Magnitude = sqrt((-2)^2 + (-16)^2 + 10^2) = sqrt(4 + 256 + 100) = sqrt(360) = 6*sqrt(10). Area of parallelogram = |a x b| = 6*sqrt(10).',
    hints: [
      'Set up the 3x3 determinant with [i, j, k] on row 1, [3, -1, -1] on row 2, and [4, 2, 4] on row 3.',
      'Remember the negative sign for the j cofactor: - ((3)(4) - (-1)(4)) = -16j.',
      'Parallelogram area is |a x b| = sqrt(4 + 256 + 100) = sqrt(360) = 6*sqrt(10).'
    ],
    misconceptionIndex: 1
  },
  // ���─ STANDARD 4: c12_math_078 (Line Equation Cartesian Conversion)
  {
    id: 'ch_s04',
    nodeId: NODE_C12_MATH_078,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A laser beam trajectory is given by the vector equation r = (2i - 3j + 4k) + lambda*(1i + 2j - 1k). What is its Cartesian symmetric form?',
    options: [
      '(x - 2)/1 = (y + 3)/2 = (z - 4)/(-1)',
      '(x - 2)/1 = (y - 3)/2 = (z - 4)/1',
      '(x + 2)/1 = (y - 3)/2 = (z + 4)/(-1)',
      '(x - 1)/2 = (y - 2)/(-3) = (z + 1)/4'
    ],
    correctIndex: 0,
    explanation: 'From r = (x1 i + y1 j + z1 k) + lambda*(a i + b j + c k), Cartesian form is (x - x1)/a = (y - y1)/b = (z - z1)/c. Here (x1,y1,z1)=(2,-3,4) so y - (-3) = y + 3, and direction ratios are (1, 2, -1).',
    hints: [
      'The fixed point is (x1, y1, z1) = (2, -3, 4) and direction ratios are (a, b, c) = (1, 2, -1).',
      'Be very careful with signs in the numerator: y - y1 = y - (-3) = y + 3.',
      'The denominators must be the direction ratios: 1, 2, and -1.'
    ],
    misconceptionIndex: 3
  },
  // ── STANDARD 5: c12_math_080 (Plane Equation from Point and Normal)
  {
    id: 'ch_s05',
    nodeId: NODE_C12_MATH_080,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the Cartesian equation of an antenna reflector plane passing through point P(1, -2, 3) and perpendicular to normal vector n = 2i + 3j - 6k?',
    options: [
      '2x + 3y - 6z + 22 = 0',
      '2x + 3y - 6z - 22 = 0',
      '2x + 3y - 6z = 0',
      '(x - 1)/2 = (y + 2)/3 = (z - 3)/(-6)'
    ],
    correctIndex: 0,
    explanation: 'Using a(x - x1) + b(y - y1) + c(z - z1) = 0: 2(x - 1) + 3(y - (-2)) - 6(z - 3) = 0 => 2x - 2 + 3y + 6 - 6z + 18 = 0 => 2x + 3y - 6z + 22 = 0.',
    hints: [
      'Use the one-point plane formula: a(x - x1) + b(y - y1) + c(z - z1) = 0.',
      'Substitute a=2, b=3, c=-6 and x1=1, y1=-2, z1=3.',
      'Expand: 2(x-1) + 3(y+2) - 6(z-3) = 2x - 2 + 3y + 6 - 6z + 18 = 2x + 3y - 6z + 22 = 0.'
    ],
    misconceptionIndex: 3
  },
  // ── STANDARD 6: c12_math_075 (Scalar Projection)
  {
    id: 'ch_s06',
    nodeId: NODE_C12_MATH_075,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the scalar projection of vector a = i + 2j + 3k onto vector b = 2i + j + 2k. (Enter as decimal to 2 decimal places, e.g. 3.33)',
    correctAnswer: 3.33,
    tolerance: 0.05,
    unit: '',
    explanation: 'Scalar projection = (a . b) / |b|. a . b = (1)(2) + (2)(1) + (3)(2) = 2 + 2 + 6 = 10. |b| = sqrt(2^2 + 1^2 + 2^2) = sqrt(9) = 3. Projection = 10/3 ~= 3.33.',
    hints: [
      'The scalar projection of a on b is given by (a . b) / |b|.',
      'Compute the dot product a . b: 1*2 + 2*1 + 3*2 = 10.',
      'Compute magnitude |b|: sqrt(4 + 1 + 4) = 3. Then 10/3 = 3.33.'
    ],
    misconceptionIndex: 0
  },
  // ── STANDARD 7: c12_math_079 (Drag-Sort: Shortest Distance Algorithm)
  {
    id: 'ch_s07',
    nodeId: NODE_C12_MATH_079,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of steps to compute the shortest distance between two skew lines r1 = a1 + lambda*b1 and r2 = a2 + mu*b2 in correct mathematical order.',
    sortItems: [
      'Extract position vectors a1, a2 and direction vectors b1, b2',
      'Compute the displacement joining vector (a2 - a1)',
      'Calculate the cross product of direction vectors: (b1 x b2)',
      'Compute the scalar triple product: (a2 - a1) . (b1 x b2)',
      'Divide the absolute value of scalar triple product by |b1 x b2|'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'To find shortest distance between skew lines, first extract points and directions, find the joining vector (a2 - a1), compute common normal (b1 x b2), project joining vector via dot product (scalar triple product), and normalise by dividing by |b1 x b2|.',
    hints: [
      'You must identify vectors a1, a2, b1, b2 before performing vector operations.',
      'The cross product (b1 x b2) gives the normal vector perpendicular to both lines.',
      'The final step is dividing the scalar projection numerator by the magnitude |b1 x b2|.'
    ],
  },

  // ── ADVANCED 1: c12_math_079 (Shortest Distance between Skew Lines - Analysis)
  {
    id: 'ch_a01',
    nodeId: NODE_C12_MATH_079,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Two probe trajectories are L1: r1 = (1i + 0j + 0k) + lambda*(1i + 1j + 1k) and L2: r2 = (0i + 1j + 0k) + mu*(1i + 2j + 3k). What is their geometric relationship and shortest distance?',
    options: [
      'Skew lines, Shortest Distance = sqrt(6)/2 units',
      'Intersecting lines, Shortest Distance = 0 units',
      'Parallel lines, Shortest Distance = 3 units',
      'Coplanar lines, Shortest Distance = 1/sqrt(6) units'
    ],
    correctIndex: 0,
    explanation: 'a2 - a1 = (-1, 1, 0). b1 x b2 = (1, 1, 1) x (1, 2, 3) = (1, -2, 1). Scalar triple product (a2 - a1) . (b1 x b2) = (-1)(1) + (1)(-2) + (0)(1) = -3 != 0 (Skew lines!). |b1 x b2| = sqrt(1 + 4 + 1) = sqrt(6). SD = |-3| / sqrt(6) = 3/sqrt(6) = sqrt(6)/2.',
    hints: [
      'First compute (a2 - a1) = (-1, 1, 0) and b1 x b2 = (1, -2, 1).',
      'Test coplanarity via dot product: (-1)(1) + (1)(-2) + 0 = -3. Since it is non-zero, lines are skew.',
      'SD = |-3| / sqrt(1^2 + (-2)^2 + 1^2) = 3 / sqrt(6) = sqrt(6)/2.'
    ],
    misconceptionIndex: 1
  },
  // ── ADVANCED 2: c12_math_077 (Direction Ratios to Cosines - Evaluation)
  {
    id: 'ch_a02',
    nodeId: NODE_C12_MATH_077,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A thrust vector connects P(2, -1, 3) to Q(4, 3, -1). What are its exact direction cosines (l, m, n)?',
    options: [
      '(1/3, 2/3, -2/3)',
      '(2, 4, -4)',
      '(1/sqrt(3), 2/sqrt(3), -2/sqrt(3))',
      '(2/6, 3/6, -1/6)'
    ],
    correctIndex: 0,
    explanation: 'Direction ratios = Q - P = (4-2, 3-(-1), -1-3) = (2, 4, -4). Distance PQ = sqrt(2^2 + 4^2 + (-4)^2) = sqrt(4 + 16 + 16) = sqrt(36) = 6. Normalising gives l = 2/6 = 1/3, m = 4/6 = 2/3, n = -4/6 = -2/3. Check: (1/3)^2 + (2/3)^2 + (-2/3)^2 = (1+4+4)/9 = 1.',
    hints: [
      'Find coordinate differences: (4 - 2, 3 - (-1), -1 - 3) = (2, 4, -4).',
      'Calculate length: sqrt(4 + 16 + 16) = sqrt(36) = 6.',
      'Divide each ratio by 6 to get (1/3, 2/3, -2/3).'
    ],
    misconceptionIndex: 2
  },
  // ── ADVANCED 3: c12_math_079 (Point to Line Distance - Numeric)
  {
    id: 'ch_a03',
    nodeId: NODE_C12_MATH_079,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Find the perpendicular distance from point P(2, 3, 5) to the line r = (1i + 1j + 1k) + lambda*(1i + 2j + 2k). Calculate d = 2*sqrt(5)/3 to 2 decimal places.',
    correctAnswer: 1.49,
    tolerance: 0.05,
    unit: 'units',
    explanation: 'Formula: d = |(p - a) x b| / |b|. p - a = (1, 2, 4). (p - a) x b = (1, 2, 4) x (1, 2, 2) = (-4, 2, 0). |(p - a) x b| = sqrt(16 + 4 + 0) = sqrt(20) = 2*sqrt(5). |b| = sqrt(1 + 4 + 4) = 3. Distance = 2*sqrt(5)/3 ~= 2*2.236/3 = 1.49 units.',
    hints: [
      'Form vector (p - a) = (2-1, 3-1, 5-1) = (1, 2, 4).',
      'Cross (1, 2, 4) with (1, 2, 2) = (-4, 2, 0). Magnitude = sqrt(20) = 2*sqrt(5).',
      'Divide by |b| = 3: 2*2.23606 / 3 ~= 1.49.'
    ],
    misconceptionIndex: 3
  },
  // ── ADVANCED 4: c12_math_080 (Plane Normal Identification & Simplification - Evaluation)
  {
    id: 'ch_a04',
    nodeId: NODE_C12_MATH_080,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Two engineers propose vector forms for the plane 6x - 3y + 12z = 36. Engineer A says r . (6i - 3j + 12k) = 36. Engineer B says r . (2i - j + 4k) = 12. Evaluate their claims:',
    options: [
      'Both describe the identical physical plane, but Engineer B provides the canonical simplified direction ratios (2, -1, 4)',
      'Engineer A is wrong because scalar multiples change the inclination of a plane',
      'Engineer B is wrong because the RHS constant was improperly divided',
      'Neither equation is correct because plane equations require cross products'
    ],
    correctIndex: 0,
    explanation: 'Multiplying or dividing a plane equation by a non-zero scalar yields the exact same plane in space. Dividing by GCD 3 yields 2x - y + 4z = 12, which gives the simplified canonical normal ratios (2, -1, 4). Both are mathematically valid, but simplified form is standard for exams.',
    hints: [
      'Check if 6x - 3y + 12z = 36 is an exact scalar multiple of 2x - y + 4z = 12.',
      'Dividing by 3 gives 2x - y + 4z = 12, so the set of satisfying points (x, y, z) is identical.',
      'Direction ratios are conventionally expressed in simplest integer form.'
    ],
    misconceptionIndex: 3
  },
  // ── ADVANCED 5: c12_math_076 (Drag-Label: Vector & 3D Geometry Components)
  {
    id: 'ch_a05',
    nodeId: NODE_C12_MATH_076,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Label each fundamental vector and 3D geometry construct on the ISRO Flight Control coordinate diagram.',
    dragItems: [
      { label: 'Normal Vector (n = a x b)', targetId: 'part_normal' },
      { label: 'Position Vector (OP = xi+yj+zk)', targetId: 'part_position' },
      { label: 'Trajectory Line (r = a + lambda*b)', targetId: 'part_line' },
      { label: 'Plane Surface (r . n = d)', targetId: 'part_plane' }
    ],
    correctMapping: {
      part_normal: 'Normal Vector (n = a x b)',
      part_position: 'Position Vector (OP = xi+yj+zk)',
      part_line: 'Trajectory Line (r = a + lambda*b)',
      part_plane: 'Plane Surface (r . n = d)'
    },
    explanation: 'The position vector points from origin to a point, the trajectory line follows r = a + lambda*b, the normal vector points perpendicular to the surface via cross product, and the plane is defined by r . n = d.',
    hints: [
      'The normal vector points perpendicular (upwards) from the plane.',
      'The position vector originates at (0, 0, 0) and reaches target point P.',
      'The trajectory line extends with parameter lambda along direction b.'
    ],
  },
  // ── ADVANCED 6: c12_math_074 (Collinearity Test - Analysis)
  {
    id: 'ch_a06',
    nodeId: NODE_C12_MATH_074,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Three navigation beacons have position vectors a = i + 2j + 3k, b = 3i + 6j + 9k, and c = 2i + 4j + 6k. Which statement rigorously proves their collinearity?',
    options: [
      'c is the exact midpoint (a + b)/2, proving C divides AB internally in ratio 1 : 1',
      'The vectors have the same magnitude sqrt(14)',
      'They are collinear because their dot product is zero',
      'c = a x b, so they lie in the same orbital plane'
    ],
    correctIndex: 0,
    explanation: '(a + b)/2 = ((1+3)i + (2+6)j + (3+9)k)/2 = (4i + 8j + 12k)/2 = 2i + 4j + 6k = c. Since c is a convex linear combination (the midpoint) of a and b, points A, B, and C are collinear.',
    hints: [
      'Calculate the arithmetic mean of a and b: (a + b) / 2.',
      '(i + 2j + 3k + 3i + 6j + 9k)/2 = (4i + 8j + 12k)/2 = 2i + 4j + 6k.',
      'Since c = (a + b)/2, C lies directly between A and B on the same straight line.'
    ],
    misconceptionIndex: 4
  },
  // ── ADVANCED 7: c12_math_078 (Construct Equation of Plane - Creativity)
  {
    id: 'ch_a07',
    nodeId: NODE_C12_MATH_080,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct Cartesian equation of a plane through (2, -1, 4) with normal direction ratios (1, 2, 2).',
    availableParts: ['x', '+ 2y', '+ 2z', '- 8 = 0', '+ 8 = 0', '- 4 = 0', '2x', '+ y'],
    targetState: 'x + 2y + 2z - 8 = 0',
    validationHint: 'Formula: 1*(x - 2) + 2*(y + 1) + 2*(z - 4) = 0 => x - 2 + 2y + 2 + 2z - 8 = 0 => x + 2y + 2z - 8 = 0.',
    explanation: 'Using 1(x - 2) + 2(y - (-1)) + 2(z - 4) = x - 2 + 2y + 2 + 2z - 8 = x + 2y + 2z - 8 = 0. Notice the constant is -8.',
    hints: [
      'Normal coefficients are a=1, b=2, c=2, so terms start with x + 2y + 2z.',
      'Constant term d = -(1*2 + 2*(-1) + 2*4) = -(2 - 2 + 8) = -8.',
      'Combine: x + 2y + 2z - 8 = 0.'
    ],
    misconceptionIndex: 3
  }
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
  nodeId: NODE_C12_MATH_071,
  title: 'Types of Vectors & 3D Spaceflight Geometry',
  definition: 'A vector has magnitude and direction. We classify vectors into equal, unit, zero, parallel, and collinear. Together with dot products, cross products, section formula, and 3D equations of lines and planes, they form the foundation of 3D spatial geometry.',
  eli5: 'Think of a vector as an arrow in space. Two arrows are equal if they have the exact same length and point the exact same way, no matter where they start. Parallel arrows point along the same track. A unit arrow is exactly 1 meter long. The dot product tests right angles, while the cross product builds an arrow standing straight up out of the floor!',
  misconceptions: [
    { misconception: 'Equal vectors must start at the same origin point', correction: 'Vectors are free to translate anywhere in space; they only need identical magnitude and direction.' },
    { misconception: 'The cross product of two vectors is commutative (a x b = b x a)', correction: 'Cross product is anti-commutative: a x b = -(b x a) due to the right-hand rule.' },
    { misconception: 'Direction cosines satisfy l + m + n = 1', correction: 'Direction cosines satisfy the Pythagorean sum of squares: l^2 + m^2 + n^2 = 1.' },
    { misconception: 'In a plane equation ax + by + cz + d = 0, (a, b, c) are direction ratios of a line in the plane', correction: '(a, b, c) are direction ratios of the NORMAL vector perpendicular to the plane.' },
    { misconception: 'The section formula internal division of a and b in ratio m:n is (ma + nb)/(m+n)', correction: 'Weights are swapped: OP = (na + mb)/(m+n) because the closer endpoint receives the opposite ratio weight.' },
  ],
  diagnosticQuestions: [
    { question: 'What condition makes two vectors equal?', options: ['Same length and direction', 'Same start point', 'Both are unit vectors', 'Perpendicular to each other'], correctIndex: 0 },
    { question: 'What is the magnitude of a zero (null) vector?', options: ['0', '1', 'Undefined', 'Infinity'], correctIndex: 0 },
    { question: 'If a . b = 0 for non-zero vectors, the angle between them is:', options: ['90 degrees', '0 degrees', '180 degrees', '45 degrees'], correctIndex: 0 },
    { question: 'If a x b = 0 for non-zero vectors, the vectors are:', options: ['Parallel / Collinear', 'Perpendicular', 'Unit vectors', 'Skew'], correctIndex: 0 },
    { question: 'The identity for direction cosines is:', options: ['l^2 + m^2 + n^2 = 1', 'l + m + n = 1', 'l^2 - m^2 = n^2', 'l*m*n = 0'], correctIndex: 0 },
    { question: 'The vector equation of a line through point a along direction b is:', options: ['r = a + lambda*b', 'r . b = a', 'r x a = b', '(r - a) . b = 0'], correctIndex: 0 },
    { question: 'The shortest distance between skew lines uses which operation in the numerator?', options: ['Scalar triple product (a2 - a1) . (b1 x b2)', 'Cross product magnitude only', 'Dot product of positions', 'Distance formula'], correctIndex: 0 },
    { question: 'In the plane equation 3x - 4y + 12z = 39, the normal vector direction ratios are:', options: ['(3, -4, 12)', '(3, 4, 12)', '(-3, 4, -12)', '(1/3, -1/4, 1/12)'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master classifications of vectors, dot and cross products, 3D line representations, skew lines shortest distance, and 3D plane equations.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Vector Classification & Scaling',
    instruction: 'Adjust the scaling factor slider to see how vector b = k*a changes magnitude, flips direction, and becomes collinear or equal to a.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_071,
  },
  {
    title: 'Lab 2: Vector Addition & Parallelogram Law',
    instruction: 'Drag vector components to observe the resultant diagonal vector a + b update in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_073,
  },
  {
    title: 'Lab 3: Scalar (Dot) Product & Orthogonality',
    instruction: 'Rotate the angle slider theta between 0° and 180°. Observe how the dot product a . b vanishes at exactly 90°!',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_075,
  },
  {
    title: 'Lab 4: Vector (Cross) Product & Normal Vector',
    instruction: 'Adjust vector lengths and angle. Watch the 3D cross product vector shoot perpendicular to the plane with magnitude equal to the parallelogram area.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_076,
  },
  {
    title: 'Lab 5: 3D Skew Lines & Shortest Distance',
    instruction: 'Vary the vertical offset between two non-parallel orbital paths to see the shortest distance segment perpendicular to both trajectories.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_079,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you multiply vector a = 3i + 4j by scalar k = -1, what happens to its magnitude and direction?',
    options: [
      'Magnitude becomes -5 and direction is unchanged',
      'Magnitude remains 5, but direction flips by exactly 180°',
      'Magnitude becomes 0 and vector collapses',
      'Both magnitude and direction double'
    ],
    correctIndex: 1,
    verifyInstruction: 'Set the scalar slider k to -1.0 in Lab 1 and verify that the magnitude remains 5 while the arrow flips to -3i - 4j!',
    nodeId: NODE_C12_MATH_071,
  },
  {
    question: 'Predict: If angle theta between two non-zero vectors is 90°, what will the dot product a . b and cross product magnitude |a x b| be?',
    options: [
      'Dot product = 0, Cross product magnitude = |a||b| (Maximum)',
      'Dot product = |a||b|, Cross product = 0',
      'Both dot product and cross product equal 0',
      'Both equal 1'
    ],
    correctIndex: 0,
    verifyInstruction: 'Move the angle slider to 90° in Lab 3 & 4 to verify that cos(90°)=0 (dot=0) while sin(90°)=1 (cross is maximum)!',
    nodeId: NODE_C12_MATH_075,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the cross product vector a x b as angle theta decreases to 0° (parallel vectors)?',
    observableOptions: [
      'Its magnitude collapses to 0, forming a null/zero vector',
      'Its magnitude increases to infinity',
      'It flips downwards',
      'It changes into a scalar number'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_076,
  },
  {
    question: 'What happens to the shortest distance between two trajectories when the scalar triple product (a2 - a1) . (b1 x b2) = 0?',
    observableOptions: [
      'The shortest distance becomes 0 (the lines intersect or are coplanar)',
      'The lines become skew lines',
      'The distance becomes infinite',
      'The lines become perpendicular'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_079,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Spacecraft Orbital Mission Design',
  description: 'Apply 3D vectors to design a satellite rendezvous maneuver: define initial position r1, velocity vector v1, normal vector to solar panels n, and compute shortest distance to space debris.',
  steps: [
    'Step 1: Write initial position vector r1 = 7000i + 0j + 0k km in Low Earth Orbit (LEO).',
    'Step 2: Define velocity vector v1 = 0i + 7.5j + 0k km/s.',
    'Step 3: Calculate the solar panel normal unit vector n = (r1 x v1) / |r1 x v1| to orient panels toward the Sun.',
    'Step 4: Check if space debris trajectory r2 = (7000i + 10j + 5k) + mu*(0i + 7.5j + 0.1k) is skew, and ensure shortest distance > 2 km.'
  ],
};

function C12_MathematicsTypesVectorsequalSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'blue' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant pattern state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);

  // Interactive Lab Visualisation Variables
  const [sliderK, setSliderK] = useState(2.0); // Scalar multiplier (-3 to 3)
  const [vecAx, setVecAx] = useState(3);
  const [vecAy, setVecAy] = useState(4);
  const [vecBx, setVecBx] = useState(4);
  const [vecBy, setVecBy] = useState(-2);
  const [angleTheta, setAngleTheta] = useState(60); // degrees
  const [magA, setMagA] = useState(4);
  const [magB, setMagB] = useState(3);
  const [skewOffsetZ, setSkewOffsetZ] = useState(2.5); // vertical separation of skew lines
  const [skewAngle, setSkewAngle] = useState(45); // angle between skew line projections
  const [planeNormalA, setPlaneNormalA] = useState(2);
  const [planeNormalB, setPlaneNormalB] = useState(3);
  const [planeNormalC, setPlaneNormalC] = useState(-6);

  // Adaptive difficulty & tracking
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

  // Challenge input types
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery & feedback state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT persistence ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Motivational feedback helper
  const getMotivationalMessage = (errorCount: number) => {
    if (errorCount === 0) return 'PERFECT SCORE! Outstanding mastery of Vector Algebra & 3D Geometry!';
    if (errorCount <= 3) return 'Great work! You demonstrated strong mathematical intuition.';
    if (errorCount <= 7) return 'Good effort! Keep practicing to solidify spatial vector concepts.';
    return 'Do not give up — You WILL get this! Review the concepts and try again.';
  };

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ───
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
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (3D Vector Orbit / Attitude Indicator) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Coordinate axes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Rotating vector arrow representation
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const rad = (angleTheta * Math.PI) / 180 + Math.sin(frame * 0.02) * 0.1;
      const length = magA * 12;

      const vx = cx + length * Math.cos(rad);
      const vy = cy - length * Math.sin(rad);

      // Vector a
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(vx, vy);
      ctx.stroke();

      // Vector b (stationary on x axis)
      const bx = cx + magB * 12;
      ctx.strokeStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(bx, cy);
      ctx.stroke();

      // Angle arc
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, -rad, true);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [angleTheta, magA, magB]);

  // ─── ESCALATING HINTS CALLBACK ───
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
      setShowExplanation(true);
      setShowHint(false);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great intuition! b is a scalar multiple of a.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the ISRO Trajectory Simulation Lab. Explore vectors by interacting directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Manipulate vectors and observation parameters with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Apply your vector skills to solve ISRO mission problems.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now adjust the visual controls to check.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent observation! The vector shrinks to zero.' : 'Look closely at the length of the cross-product vector.');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have completed ISC Class 12 Vector Algebra and 3D Geometry!');
  }, [errors, onComplete]);

  // ─��─ NEXT CHALLENGE HANDLER ───
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

  // ─── RESET INACTIVITY AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── ANSWER HANDLER ───
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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well done.');
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
        speechManager.speak('Let us review the step-by-step mathematical reasoning.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── DRAG & DROP HANDLERS ───
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
      const arr = prev.length === 0 ? challenge.sortItems?.map((_, i) => i) || [] : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── REAL-TIME COMPUTATIONS FOR VISUALISATIONS ───
  const computedDotProduct = useMemo(() => {
    return (magA * magB * Math.cos((angleTheta * Math.PI) / 180)).toFixed(2);
  }, [magA, magB, angleTheta]);

  const computedCrossMagnitude = useMemo(() => {
    return (magA * magB * Math.sin((angleTheta * Math.PI) / 180)).toFixed(2);
  }, [magA, magB, angleTheta]);

  const computedResultantMagnitude = useMemo(() => {
    const rx = vecAx + vecBx;
    const ry = vecAy + vecBy;
    return Math.sqrt(rx * rx + ry * ry).toFixed(2);
  }, [vecAx, vecAy, vecBx, vecBy]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── TOP HEADER ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="p-3 bg-blue-900/40 border border-blue-500/30 rounded-2xl text-2xl shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium">
                ISC Class 12
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">ISRO Telemetry Flight Dynamics & 3D Vector Geometry</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-semibold" role="navigation" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge') setPhase('challenge');
                else if (p === 'explore') setPhase('explore');
                else if (p === 'sandbox') setPhase('sandbox');
                else if (p === 'discovery') setPhase('discovery');
              }}
              aria-label={`Switch to ${p} phase`}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                phase === p ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-blue-950/60 to-slate-900/80 rounded-2xl border border-blue-800/40 shadow-lg">
            <div className="flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🚀 Mission Briefing</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-blue-300/80 mt-3 pt-3 border-t border-blue-900/40">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
              Curiosity Hook — Predict Before You Learn
            </h3>
            <p className="text-base text-white font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-blue-500/50'
                  }`}
                >
                  <span className="font-bold text-blue-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 mr-1.5 font-bold">✓</span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-slate-500 mr-1.5 font-bold">✗</span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on!' : '💡 Key Concept:'} {DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Flight Dynamics Labs"
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
                >
                  Enter Interactive Flight Dynamics Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Slide selector tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2" role="tablist" aria-label="Interactive Labs">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                role="tab"
                aria-selected={currentSlide === idx}
                aria-label={`Lab ${idx + 1}: ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[1] || step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-blue-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs px-2 py-1 bg-slate-800 rounded-md text-slate-400 font-mono">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-sm text-amber-300 mb-5 flex items-center gap-2 font-medium">
                <span>👉 Action:</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ── SLIDE 0: VECTOR TYPES & SCALAR MULTIPLIER ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="-200 -120 400 240" className="w-full h-64" aria-label="Vector scaling visual representation">
                      {/* Grid background */}
                      <line x1="-190" y1="0" x2="190" y2="0" stroke="#334155" strokeWidth="1.5" />
                      <line x1="0" y1="-110" x2="0" y2="110" stroke="#334155" strokeWidth="1.5" />
                      <text x="175" y="-6" fill="#64748b" fontSize="10">X</text>
                      <text x="6" y="-95" fill="#64748b" fontSize="10">Y</text>

                      {/* Vector a = (60, -45) */}
                      <defs>
                        <marker id="arrow-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L8,3 z" fill="#38bdf8" />
                        </marker>
                        <marker id="arrow-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L8,3 z" fill="#fbbf24" />
                        </marker>
                      </defs>

                      <line x1="0" y1="0" x2="60" y2="-45" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-a)" />
                      <text x="65" y="-50" fill="#38bdf8" fontSize="12" fontWeight="bold">a (3i + 4j)</text>

                      {/* Vector b = k * a */}
                      <line
                        x1="0"
                        y1="0"
                        x2={60 * sliderK}
                        y2={-45 * sliderK}
                        stroke="#fbbf24"
                        strokeWidth="2.5"
                        strokeDasharray={sliderK < 0 ? '4,4' : undefined}
                        markerEnd="url(#arrow-b)"
                      />
                      <text x={60 * sliderK + 10} y={-45 * sliderK} fill="#fbbf24" fontSize="12" fontWeight="bold">
                        b = {sliderK.toFixed(1)}a
                      </text>
                    </svg>

                    <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs font-mono">
                      <span className="text-blue-400">|a| = 5.0 units</span>
                      <span className="text-amber-400">|b| = {Math.abs(sliderK * 5).toFixed(1)} units</span>
                      <span className="text-purple-400">
                        {sliderK === 1
                          ? 'Equal Vectors (a = b)'
                          : sliderK === -1
                          ? 'Negative Vector (b = -a)'
                          : sliderK === 0
                          ? 'Zero Vector'
                          : 'Collinear / Parallel Vectors'}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1" htmlFor="scalar-slider">
                        Scalar Multiplier k: <span className="text-amber-400 font-bold">{sliderK.toFixed(1)}</span>
                      </label>
                      <input
                        id="scalar-slider"
                        aria-label="Scalar multiplier k slider"
                        type="range"
                        min={-3}
                        max={3}
                        step={0.5}
                        value={sliderK}
                        onChange={(e) => {
                          setSliderK(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-blue-500 cursor-pointer"
                      />

                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-slate-400">Classification</p>
                          <p className="font-bold text-white mt-0.5">
                            {sliderK === 1 ? 'Equal' : sliderK === -1 ? 'Opposite' : sliderK === 0 ? 'Null' : 'Collinear'}
                          </p>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-slate-400">Unit Vector a^</p>
                          <p className="font-bold text-blue-300 mt-0.5">0.6i + 0.8j</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-xl text-xs text-blue-200">
                      💡 <strong>Key Rule:</strong> Vectors are equal only when magnitude AND direction match. Parallel vectors satisfy b = k*a.
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 1: VECTOR ADDITION & PARALLELOGRAM LAW ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="-20 -20 280 200" className="w-full h-64" aria-label="Vector addition parallelogram visual">
                      {/* Grid */}
                      <line x1="0" y1="160" x2="240" y2="160" stroke="#334155" strokeWidth="1" />
                      <line x1="20" y1="0" x2="20" y2="180" stroke="#334155" strokeWidth="1" />

                      {/* Parallelogram dashed lines */}
                      <line
                        x1={20 + vecAx * 15}
                        y1={160 - vecAy * 15}
                        x2={20 + (vecAx + vecBx) * 15}
                        y2={160 - (vecAy + vecBy) * 15}
                        stroke="#64748b"
                        strokeDasharray="4,4"
                      />
                      <line
                        x1={20 + vecBx * 15}
                        y1={160 - vecBy * 15}
                        x2={20 + (vecAx + vecBx) * 15}
                        y2={160 - (vecAy + vecBy) * 15}
                        stroke="#64748b"
                        strokeDasharray="4,4"
                      />

                      {/* Vector a */}
                      <line x1="20" y1="160" x2={20 + vecAx * 15} y2={160 - vecAy * 15} stroke="#38bdf8" strokeWidth="3" />
                      <text x={20 + vecAx * 15 + 5} y={160 - vecAy * 15} fill="#38bdf8" fontSize="10">a</text>

                      {/* Vector b */}
                      <line x1="20" y1="160" x2={20 + vecBx * 15} y2={160 - vecBy * 15} stroke="#fbbf24" strokeWidth="3" />
                      <text x={20 + vecBx * 15 + 5} y={160 - vecBy * 15} fill="#fbbf24" fontSize="10">b</text>

                      {/* Resultant Vector R = a + b */}
                      <line
                        x1="20"
                        y1="160"
                        x2={20 + (vecAx + vecBx) * 15}
                        y2={160 - (vecAy + vecBy) * 15}
                        stroke="#22c55e"
                        strokeWidth="3.5"
                      />
                      <text
                        x={20 + (vecAx + vecBx) * 15 + 5}
                        y={160 - (vecAy + vecBy) * 15 - 5}
                        fill="#22c55e"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        R = a + b
                      </text>
                    </svg>
                    <div className="text-xs font-mono text-emerald-400 mt-2">
                      Resultant Vector R = ({vecAx + vecBx})i + ({vecAy + vecBy})j | Magnitude = {computedResultantMagnitude}
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <label className="text-slate-300 block">Vector a components: ({vecAx}i + {vecAy}j)</label>
                      <input aria-label="Vector A X component" type="range" min={1} max={8} value={vecAx} onChange={(e) => setVecAx(parseInt(e.target.value))} className="w-full accent-blue-400 mt-1" />
                      <input aria-label="Vector A Y component" type="range" min={1} max={8} value={vecAy} onChange={(e) => setVecAy(parseInt(e.target.value))} className="w-full accent-blue-400 mt-1" />
                    </div>
                    <div>
                      <label className="text-slate-300 block">Vector b components: ({vecBx}i + {vecBy}j)</label>
                      <input aria-label="Vector B X component" type="range" min={1} max={8} value={vecBx} onChange={(e) => setVecBx(parseInt(e.target.value))} className="w-full accent-amber-400 mt-1" />
                      <input aria-label="Vector B Y component" type="range" min={-4} max={6} value={vecBy} onChange={(e) => setVecBy(parseInt(e.target.value))} className="w-full accent-amber-400 mt-1" />
                    </div>
                    <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-emerald-200">
                      ⚠️ <strong>Triangle & Parallelogram Law:</strong> |a + b| != |a| + |b| in general. Magnitudes only add algebraically if vectors are collinear and point the same way.
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 2: SCALAR DOT PRODUCT & ORTHOGONALITY ── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <canvas ref={canvasRef} width={280} height={180} className="w-full h-48 bg-slate-900/50 rounded-xl" aria-label="Vector dot product angle visualization" />
                    <div className="grid grid-cols-3 gap-3 w-full mt-3 text-center text-xs font-mono">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Angle theta</span>
                        <p className="font-bold text-purple-300 text-sm">{angleTheta}°</p>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">cos(theta)</span>
                        <p className="font-bold text-white text-sm">{Math.cos((angleTheta * Math.PI) / 180).toFixed(3)}</p>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">a . b (Dot)</span>
                        <p className={`font-bold text-sm ${parseFloat(computedDotProduct) === 0 ? 'text-emerald-400 animate-pulse' : 'text-blue-300'}`}>
                          {computedDotProduct}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1" htmlFor="angle-slider">
                        Rotate Angle theta: <span className="text-purple-400 font-bold">{angleTheta}°</span>
                      </label>
                      <input
                        id="angle-slider"
                        aria-label="Angle theta slider"
                        type="range"
                        min={0}
                        max={180}
                        value={angleTheta}
                        onChange={(e) => {
                          setAngleTheta(parseInt(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>0° (Parallel)</span>
                        <span className="text-emerald-400 font-bold">90° (Perpendicular)</span>
                        <span>180° (Opposite)</span>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-950/40 border border-purple-800/40 rounded-xl text-xs text-purple-200">
                      ⚡ <strong>Orthogonality Theorem:</strong> For any two non-zero vectors, <code>a . b = 0 &lt;=&gt; theta = 90°</code>. This is the master test for perpendicular lines and planes.
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 3: CROSS PRODUCT & 3D NORMAL VECTOR ── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="-120 -100 240 200" className="w-full h-56" aria-label="Vector cross product 3D normal vector diagram">
                      {/* Plane parallelogram in perspective */}
                      <polygon points="-60,30 20,30 60,-10 -20,-10" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
                      {/* Vector a */}
                      <line x1="-20" y1="10" x2="40" y2="10" stroke="#38bdf8" strokeWidth="2.5" />
                      <text x="45" y="15" fill="#38bdf8" fontSize="9">a</text>
                      {/* Vector b */}
                      <line x1="-20" y1="10" x2="10" y2="-20" stroke="#fbbf24" strokeWidth="2.5" />
                      <text x="15" y="-20" fill="#fbbf24" fontSize="9">b</text>
                      {/* Normal Cross Product Vector (shooting straight up) */}
                      <line
                        x1="-20"
                        y1="10"
                        x2="-20"
                        y2={10 - parseFloat(computedCrossMagnitude) * 5}
                        stroke="#ec4899"
                        strokeWidth="3.5"
                      />
                      <circle cx="-20" cy={10 - parseFloat(computedCrossMagnitude) * 5} r="3" fill="#ec4899" />
                      <text x="-15" y={5 - parseFloat(computedCrossMagnitude) * 5} fill="#ec4899" fontSize="10" fontWeight="bold">
                        a x b (Normal)
                      </text>
                    </svg>
                    <div className="text-xs font-mono text-pink-400 mt-2">
                      |a x b| = |a||b|sin({angleTheta}°) = {computedCrossMagnitude} sq units (Parallelogram Area)
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                    <p className="text-slate-300">The vector cross product gives a new vector perpendicular to the entire plane spanned by a and b.</p>
                    <div className="p-3 bg-pink-950/30 border border-pink-800/40 rounded-xl text-pink-200">
                      🖐️ <strong>Right Hand Rule:</strong> Curl right-hand fingers from a to b; thumb points in direction of a x b. Note that <code>b x a = -(a x b)</code> (Anti-commutative!).
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Collinearity Test:</span>
                      <p className="font-bold text-white mt-0.5">a x b = 0 &lt;=&gt; a and b are collinear / parallel</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 4: 3D SKEW LINES & SHORTEST DISTANCE ── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="-120 -80 240 160" className="w-full h-56" aria-label="3D skew lines and shortest distance representation">
                      {/* Bottom orbital trajectory line L1 */}
                      <line x1="-90" y1="40" x2="90" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
                      <text x="95" y="45" fill="#38bdf8" fontSize="9">Line L1 (Orbit 1)</text>

                      {/* Top orbital trajectory line L2 */}
                      <line
                        x1="-70"
                        y1={40 - skewOffsetZ * 20}
                        x2="70"
                        y2={40 - skewOffsetZ * 20 - 15}
                        stroke="#fbbf24"
                        strokeWidth="2.5"
                      />
                      <text x="75" y={35 - skewOffsetZ * 20} fill="#fbbf24" fontSize="9">Line L2 (Orbit 2)</text>

                      {/* Shortest Distance Perpendicular Rod */}
                      <line
                        x1="0"
                        y1="40"
                        x2="0"
                        y2={40 - skewOffsetZ * 20}
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeDasharray="2,2"
                      />
                      <circle cx="0" cy="40" r="3" fill="#ef4444" />
                      <circle cx="0" cy={40 - skewOffsetZ * 20} r="3" fill="#ef4444" />
                      <text x="8" y={40 - (skewOffsetZ * 20) / 2} fill="#ef4444" fontSize="10" fontWeight="bold">
                        SD = {skewOffsetZ.toFixed(1)} km
                      </text>
                    </svg>
                    <div className="text-xs font-mono text-slate-300 mt-2">
                      Skew Lines: Neither parallel nor intersecting in 3D space!
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <label className="text-slate-300 block mb-1" htmlFor="skew-offset-slider">
                        Vertical Gap (Shortest Distance): <span className="text-rose-400 font-bold">{skewOffsetZ.toFixed(1)} km</span>
                      </label>
                      <input
                        id="skew-offset-slider"
                        aria-label="Skew lines vertical offset slider"
                        type="range"
                        min={0.5}
                        max={4.0}
                        step={0.1}
                        value={skewOffsetZ}
                        onChange={(e) => setSkewOffsetZ(parseFloat(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                    <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl text-rose-200">
                      📐 <strong>Master Formula:</strong>
                      <div className="font-mono text-[11px] mt-1 text-white bg-slate-900 p-2 rounded">
                        SD = |(a2 - a1) . (b1 x b2)| / |b1 x b2|
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              aria-label="Go to previous lab"
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-mono text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                aria-label="Go to next lab"
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-500"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter free sandbox mode"
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-500"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (FREE PLAY) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">🔬 ISRO Vector Flight Dynamics Sandbox</h3>
                <p className="text-xs text-slate-400">Experiment with parameters freely with zero score pressure.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Ready for CISCE challenges"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Ready for CISCE Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Controls */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-blue-400 uppercase tracking-wider">Vector Parameters</h4>
                <div>
                  <label className="text-slate-400">Vector A Magnitude: {magA}</label>
                  <input aria-label="Vector A magnitude in sandbox" type="range" min={1} max={10} value={magA} onChange={(e) => setMagA(parseInt(e.target.value))} className="w-full accent-blue-400 mt-1" />
                </div>
                <div>
                  <label className="text-slate-400">Vector B Magnitude: {magB}</label>
                  <input aria-label="Vector B magnitude in sandbox" type="range" min={1} max={10} value={magB} onChange={(e) => setMagB(parseInt(e.target.value))} className="w-full accent-amber-400 mt-1" />
                </div>
                <div>
                  <label className="text-slate-400">Angle theta: {angleTheta}°</label>
                  <input aria-label="Angle theta in sandbox" type="range" min={0} max={180} value={angleTheta} onChange={(e) => setAngleTheta(parseInt(e.target.value))} className="w-full accent-purple-400 mt-1" />
                </div>
              </div>

              {/* Live Calculations Display */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider font-sans">Live Flight Telemetry</h4>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400">Dot Product (a . b):</span>
                  <p className="text-blue-300 font-bold text-sm">{computedDotProduct}</p>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400">Cross Product Magnitude |a x b|:</span>
                  <p className="text-pink-300 font-bold text-sm">{computedCrossMagnitude}</p>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400">Orthogonal Status:</span>
                  <p className={angleTheta === 90 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {angleTheta === 90 ? '✓ Orthogonal (a . b = 0)' : '✗ Not Orthogonal'}
                  </p>
                </div>
              </div>

              {/* Predict-then-Check in Sandbox */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between text-xs">
                <h4 className="font-bold text-amber-400 uppercase tracking-wider">Predict & Verify</h4>
                <p className="text-slate-300">{PREDICTION_QUESTIONS[1].question}</p>
                <div className="space-y-1.5 mt-2">
                  {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handlePrediction(i)}
                      aria-label={`Prediction Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-2 rounded text-[11px] border ${
                        predictionMade
                          ? i === PREDICTION_QUESTIONS[1].correctIndex
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/50'
                      }`}
                    >
                      {predictionMade && (i === PREDICTION_QUESTIONS[1].correctIndex ? '✓ ' : '✗ ')}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Top Bar with Difficulty Badge and Progress */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Errors: <strong className="text-rose-400">{errors}</strong></span>
              <span className="text-xs text-slate-400">Mastery: <strong className="text-blue-400 capitalize">{masteryLevel}</strong></span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Main Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 text-xs text-blue-400 font-mono mb-2">
              <span>ISC Syllabus Node: {challenge.nodeId}</span>
            </div>
            <p className="text-base text-white font-medium mb-6 leading-relaxed">{challenge.question}</p>

            {/* TYPE 1: MCQ (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`p-4 rounded-xl text-left text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-blue-500/50'
                    }`}
                  >
                    <span className="font-bold text-blue-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {showExplanation && (
                      i === challenge.correctIndex ? (
                        <span className="text-emerald-400 font-bold mr-1.5">✓</span>
                      ) : (
                        <span className="text-slate-500 font-bold mr-1.5">✗</span>
                      )
                    )}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  step="0.01"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric answer"
                  aria-label="Numeric answer input"
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                />
                <span className="text-sm text-slate-400 font-mono">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  aria-label="Verify answer button"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl disabled:opacity-40"
                >
                  Verify Answer
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into the correct mathematical sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      onDragStart={() => handleDragStart(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center gap-3 active:cursor-grabbing hover:border-blue-500/50"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-300 font-bold flex items-center justify-center text-[10px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Check sequence order"
                  className="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      className="px-3 py-1.5 bg-indigo-900/60 border border-indigo-500/40 rounded-lg text-xs text-indigo-200 font-semibold cursor-grab"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      aria-label={`Drop target for ${item.targetId}`}
                      className="p-3 bg-slate-900 rounded-lg border border-dashed border-slate-700 min-h-[70px] flex flex-col justify-center items-center text-center text-xs"
                    >
                      <span className="text-[10px] text-slate-500 mb-1 font-mono">{item.targetId}</span>
                      <span className={droppedLabels[item.targetId] ? 'text-emerald-400 font-bold' : 'text-slate-400 italic'}>
                        {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : 'Drop label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Check diagram labels"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
                >
                  Check Diagram Labels
                </motion.button>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-blue-900/40 hover:bg-blue-800/60 border border-blue-500/30 text-blue-200 rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-blue-700 text-white rounded font-mono text-xs flex items-center gap-1.5">
                      {part}
                      <button aria-label={`Remove part ${part}`} onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-red-300 hover:text-white">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click mathematical terms above to construct equation...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify constructed equation"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
                >
                  Verify Equation
                </motion.button>
              </div>
            )}

            {/* ── ESCALATING HINTS BUBBLE DISPLAY ── */}
            {hintCount > 0 && !showExplanation && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200 flex items-start gap-2">
                <span className="text-amber-400 font-bold">Hint {hintCount}/3:</span>
                <span>{currentHint}</span>
              </motion.div>
            )}

            {/* ── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-blue-950/40 border border-blue-700/50 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-wider">
                  <span>📘 Step-by-Step Mathematical Explanation</span>
                </div>

                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-blue-100 leading-relaxed">
                    <strong className="text-blue-400 mr-1.5">{i + 1}.</strong>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show next explanation step"
                      className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'View Final Mission Results' : 'Next ISRO Challenge'}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Mission Results →' : 'Next ISRO Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-blue-950/80 to-slate-900 rounded-3xl border border-blue-800 shadow-2xl text-center">
            <span className="text-4xl" aria-hidden="true">🛰️</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Mission Accomplished!</h2>
            <p className="text-slate-300 text-sm mt-1">ISC Class 12 Vector Algebra & 3D Geometry Competency Verified</p>

            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="my-4 p-4 rounded-2xl bg-blue-900/40 border border-blue-500/40 max-w-xl mx-auto">
              <p className="text-lg font-black text-amber-300">
                {getMotivationalMessage(errors)}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mt-6">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Final Score</span>
                <p className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Errors</span>
                <p className="text-xl font-bold text-rose-400">{errors}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">BKT Mastery</span>
                <p className="text-xl font-bold text-blue-400 capitalize">{masteryLevel}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Review Due</span>
                <p className="text-xl font-bold text-amber-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</p>
              </div>
            </div>
          </div>

          {/* Misconceptions Profile Feedback */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-900 rounded-2xl">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider mb-2">
                Identified Conceptual Vulnerabilities
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 text-xs">
                      <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ ISC Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World ISRO Engineering Extension */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🚀 Real-World ISRO Mission Application</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 mt-3">
              {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-xs text-slate-300 font-mono">
                  {st}
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-2xl flex items-center justify-between">
            <div className="text-xs text-amber-200">
              📅 <strong>SM-2 Spaced Repetition Engine:</strong> Your next review session is scheduled in{' '}
              <span className="font-bold text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
              }}
              aria-label="Replay interactive labs"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl"
            >
              Replay Interactive Labs
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ── FEEDBACK OVERLAYS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ISC Competency Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_MathematicsTypesVectorsequalSim;
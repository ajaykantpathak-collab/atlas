'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C10_MATH_031 = 'c10_math_031'; // Geometric Progression - sum of first n terms
const NODE_C10_MATH_032 = 'c10_math_032'; // AP and GP - simple applications
const NODE_C10_MATH_033 = 'c10_math_033'; // Reflection of a point in a line (x=0, y=0, x=a, y=a)
const NODE_C10_MATH_034 = 'c10_math_034'; // Reflection of a point in the origin
const NODE_C10_MATH_035 = 'c10_math_035'; // Invariant points under reflection
const NODE_C10_MATH_036 = 'c10_math_036'; // Section formula (internal section) and midpoint formula
const NODE_C10_MATH_037 = 'c10_math_037'; // Centroid of a triangle
const NODE_C10_MATH_038 = 'c10_math_038'; // Slope of a line (gradient, tan theta)
const NODE_C10_MATH_039 = 'c10_math_039'; // Equation of a line - slope-intercept form (y = mx + c)
const NODE_C10_MATH_040 = 'c10_math_040'; // Equation of a line - two-point form

const ALL_NODE_IDS = [
  NODE_C10_MATH_031,
  NODE_C10_MATH_032,
  NODE_C10_MATH_033,
  NODE_C10_MATH_034,
  NODE_C10_MATH_035,
  NODE_C10_MATH_036,
  NODE_C10_MATH_037,
  NODE_C10_MATH_038,
  NODE_C10_MATH_039,
  NODE_C10_MATH_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Project Antariksh: The Smart Drone & Satellite Guidance Matrix',
  intro: 'ISRO-inspired Indian aerospace startup Antariksh Tech is calibrating autonomous survey drones over Bengaluru tech corridor. To navigate radar grids, calculate geometric energy transmissions, calibrate mirror optical sensors, and plot precise straight-line trajectory paths, your team needs mastery over Geometric Progressions and Coordinate Geometry.',
  context: 'You will simulate geometric signal amplification, test laser reflections across boundary mirrors, divide flight paths with section ratios, balance drone swarm centroids, and build line equations in real-time.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An optical drone sensor sends a laser pulse at Point P(3, 4). The signal reflects across the vertical boundary mirror x = 1. Where does the reflected signal land?',
  options: [
    "P'(-3, 4) — simply flip the x-coordinate sign",
    "P'(-1, 4) — reflect symmetrically across x = 1 using 2a - x",
    "P'(3, -4) — flip the y-coordinate sign",
    "P'(1, 4) — land directly on the mirror line",
  ],
  correctIndex: 1,
  hintAfter: 'Notice that reflection across x = a does not just negate x; it shifts the mirror line to x = a so the image is at 2a - x = 2(1) - 3 = -1!',
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

// ─── 20+ CHALLENGES (NEP 2020 & CISCE 2026 Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - GP Sum Formula (Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C10_MATH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the sum of the first n terms of a GP when common ratio r > 1 and first term is a?',
    options: [
      'Sn = a(r^n - 1) / (r - 1)',
      'Sn = a(r^(n-1) - 1) / (r - 1)',
      'Sn = n/2 [2a + (n-1)r]',
      'Sn = a(1 - r^n) / (r - 1)',
    ],
    correctIndex: 0,
    explanation: 'For r > 1, the GP sum formula is Sn = a(r^n - 1)/(r - 1). The exponent is n (the number of terms), not n-1.',
    hints: [
      'Recall the derivation: multiplying Sn by r shifts all powers up to r^n.',
      'The exponent inside the parenthesis must count all n terms, so it is r^n.',
      'To keep denominator positive when r > 1, use a(r^n - 1)/(r - 1).',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - GP vs AP Application (Understanding)
  {
    id: 'ch_02',
    nodeId: NODE_C10_MATH_032,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A solar battery charge in an electric vehicle in Pune degrades by 5% each year. Which mathematical progression models its capacity over successive years?',
    options: [
      'Geometric Progression (GP) with common ratio r = 0.95',
      'Arithmetic Progression (AP) with common difference d = -5',
      'Arithmetic Progression (AP) with d = -0.05',
      'Geometric Progression (GP) with common ratio r = 1.05',
    ],
    correctIndex: 0,
    explanation: 'A percentage reduction means multiplying the preceding amount by (1 - 0.05) = 0.95 each cycle. Constant multiplication represents a GP with r = 0.95.',
    hints: [
      'Is the decrease a constant subtracted number or a constant multiplying factor?',
      "Losing 5% leaves 95% of the preceding year's value.",
      'Multiplying by 0.95 each year forms a GP with common ratio r = 0.95.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Reflection in Y-axis (Recall)
  {
    id: 'ch_03',
    nodeId: NODE_C10_MATH_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When a drone waypoint P(4, -7) is reflected in the y-axis (line x = 0), what are the coordinates of its image P\'?',
    options: [
      "P'(-4, -7)",
      "P'(4, 7)",
      "P'(-4, 7)",
      "P'(-7, 4)",
    ],
    correctIndex: 0,
    explanation: 'Reflection across the y-axis (x = 0) flips the sign of the x-coordinate while preserving y: P(x, y) -> P\'(-x, y). Thus (4, -7) -> (-4, -7).',
    hints: [
      'The y-axis is a vertical mirror line.',
      'Horizontal distance from the y-axis is negated, vertical height remains unchanged.',
      'Apply (x, y) -> (-x, y) to (4, -7).',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Drag Label: Reflection Rules (Understanding)
  {
    id: 'ch_04',
    nodeId: NODE_C10_MATH_033,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each geometric transformation with its coordinate mapping rule.',
    dragItems: [
      { label: '(-x, y)', targetId: 'rule_yaxis' },
      { label: '(x, -y)', targetId: 'rule_xaxis' },
      { label: '(-x, -y)', targetId: 'rule_origin' },
      { label: '(2a - x, y)', targetId: 'rule_x_a' },
    ],
    correctMapping: {
      rule_yaxis: '(-x, y)',
      rule_xaxis: '(x, -y)',
      rule_origin: '(-x, -y)',
      rule_x_a: '(2a - x, y)',
    },
    explanation: 'Reflection in y-axis gives (-x, y); x-axis gives (x, -y); origin gives (-x, -y); and vertical line x=a gives (2a - x, y).',
    hints: [
      'y-axis (x=0) negates only the x coordinate.',
      'x-axis (y=0) negates only the y coordinate.',
      'Origin reflection changes the sign of BOTH coordinates.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Invariant Point on Mirror (Recall)
  {
    id: 'ch_05',
    nodeId: NODE_C10_MATH_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following points is invariant under reflection in the line y = 4?',
    options: [
      '(7, 4)',
      '(4, 7)',
      '(0, 0)',
      '(4, -4)',
    ],
    correctIndex: 0,
    explanation: 'A point is invariant under reflection in a line if and only if it lies ON that mirror line. Any point with y = 4 (such as (7, 4)) maps to itself.',
    hints: [
      'An invariant point has zero distance to the mirror.',
      'Substitute the point into the line equation y = 4.',
      'The y-coordinate must be 4.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Midpoint Formula Numeric (Application)
  {
    id: 'ch_06',
    nodeId: NODE_C10_MATH_036,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A fiber optic cable connects station A(2, 8) and station B(10, 20). Find the x-coordinate of the midpoint relay station.',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: '',
    explanation: 'Midpoint x-coordinate = (x1 + x2)/2 = (2 + 10)/2 = 12/2 = 6.',
    hints: [
      'Use the midpoint formula: Mx = (x1 + x2) / 2.',
      'Add the two x-coordinates: 2 + 10 = 12.',
      'Divide by 2 to find 6.',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - Triangle Centroid Coordinates (Recall)
  {
    id: 'ch_07',
    nodeId: NODE_C10_MATH_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a triangular survey zone with vertices A(x1, y1), B(x2, y2), and C(x3, y3), the centroid G divides each median from the vertex in what ratio?',
    options: [
      '2 : 1',
      '1 : 1',
      '3 : 1',
      '1 : 2',
    ],
    correctIndex: 0,
    explanation: 'The centroid G is the concurrency of medians and divides every median in the ratio 2 : 1 measured from vertex to midpoint of opposite side.',
    hints: [
      'The centroid is located two-thirds of the distance along the median from the corner vertex.',
      'It is closer to the side midpoint than to the vertex.',
      'The standard ratio is 2 : 1.',
    ],
    misconceptionIndex: 4,
  },
  // 8. Standard - GP Sum Calculation (Application)
  {
    id: 'ch_08',
    nodeId: NODE_C10_MATH_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the sum of the first 5 terms of the geometric sequence: 3, 6, 12, 24, 48.',
    correctAnswer: 93,
    tolerance: 0.5,
    unit: '',
    explanation: 'a = 3, r = 2, n = 5. Sn = 3(2^5 - 1)/(2 - 1) = 3(32 - 1)/1 = 3 * 31 = 93.',
    hints: [
      'Identify first term a = 3 and common ratio r = 6/3 = 2.',
      'Calculate 2^5 = 32. Then 2^5 - 1 = 31.',
      'Multiply by a = 3: 3 * 31 = 93.',
    ],
    misconceptionIndex: 0,
  },
  // 9. Standard - Reflection in vertical line x = a (Application)
  {
    id: 'ch_09',
    nodeId: NODE_C10_MATH_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A drone telemetry point P(-2, 5) is reflected across the line x = 3. What is the image P\'?',
    options: [
      "P'(8, 5)",
      "P'(2, 5)",
      "P'(4, 5)",
      "P'(8, -5)",
    ],
    correctIndex: 0,
    explanation: 'Reflection across x = a sends (x, y) -> (2a - x, y). With a = 3 and x = -2: x\' = 2(3) - (-2) = 6 + 2 = 8, y\' = 5. Image is (8, 5).',
    hints: [
      'The mirror line is x = 3, so a = 3.',
      'Formula for x-coordinate: 2a - x = 2(3) - (-2).',
      'x\' = 6 + 2 = 8. y remains 5.',
    ],
    misconceptionIndex: 2,
  },
  // 10. Standard - Origin Reflection vs Dual Axes (Analysis)
  {
    id: 'ch_10',
    nodeId: NODE_C10_MATH_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A radar target at P(5, -3) is reflected in the x-axis to P1, and P1 is subsequently reflected in the y-axis to P2. Which single transformation maps P directly to P2?',
    options: [
      'Reflection in the origin (0, 0)',
      'Reflection in the line y = x',
      'Reflection in the line x = 5',
      'Translation by 10 units left',
    ],
    correctIndex: 0,
    explanation: 'P(5, -3) reflected in x-axis -> (5, 3). Then reflected in y-axis -> (-5, 3). The combined transformation maps (x, y) -> (-x, -y), which is exactly reflection in the origin (equivalent to a 180° rotation).',
    hints: [
      'Step 1: x-axis reflection flips y: (5, 3).',
      'Step 2: y-axis reflection flips x: (-5, 3).',
      'Comparing (5, -3) to (-5, 3): both coordinates changed sign, representing reflection in the origin.',
    ],
    misconceptionIndex: 2,
  },
  // 11. Standard - Internal Section Formula (Application)
  {
    id: 'ch_11',
    nodeId: NODE_C10_MATH_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the coordinates of point P dividing segment joining A(1, 3) and B(6, 8) internally in ratio 2 : 3.',
    options: [
      'P(3, 5)',
      'P(4, 6)',
      'P(3.5, 5.5)',
      'P(2, 4)',
    ],
    correctIndex: 0,
    explanation: 'm = 2, n = 3. x = (2*6 + 3*1)/(2+3) = (12 + 3)/5 = 15/5 = 3. y = (2*8 + 3*3)/(2+3) = (16 + 9)/5 = 25/5 = 5. P = (3, 5).',
    hints: [
      'Use section formula: P = ((m*x2 + n*x1)/(m+n), (m*y2 + n*y1)/(m+n)).',
      'm=2 multiplies B(6, 8) and n=3 multiplies A(1, 3).',
      'x = (12+3)/5 = 3, y = (16+9)/5 = 5.',
    ],
    misconceptionIndex: 4,
  },
  // 12. Standard - Slope of Line tan theta (Understanding)
  {
    id: 'ch_12',
    nodeId: NODE_C10_MATH_038,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A road ramp rises with inclination angle theta = 45 degrees to the positive horizontal axis. What is its gradient (slope m)?',
    correctAnswer: 1,
    tolerance: 0.05,
    unit: '',
    explanation: 'Gradient m = tan(theta) = tan(45°) = 1.',
    hints: [
      'Slope relates to inclination through trigonometry: m = tan(theta).',
      'What is tan(45°)?',
      'tan(45°) = 1.',
    ],
    misconceptionIndex: 5,
  },
  // 13. Standard - Equation from Slope and Intercept (Application)
  {
    id: 'ch_13',
    nodeId: NODE_C10_MATH_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert the general linear equation 3x - 4y + 12 = 0 into slope-intercept form (y = mx + c). What are m and c?',
    options: [
      'm = 3/4, c = 3',
      'm = -3/4, c = -3',
      'm = 4/3, c = 4',
      'm = 3/4, c = -3',
    ],
    correctIndex: 0,
    explanation: 'Rearranging: 4y = 3x + 12 => y = (3/4)x + 3. Hence slope m = 3/4 and y-intercept c = 3.',
    hints: [
      'Isolate the y term: -4y = -3x - 12.',
      'Divide both sides by -4: y = (3/4)x + 3.',
      'Compare with y = mx + c.',
    ],
    misconceptionIndex: 5,
  },
  // 14. Standard - Drag-Sort: Steps in Finding Line Equation from 2 Points (Analysis)
  {
    id: 'ch_14',
    nodeId: NODE_C10_MATH_040,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the logical sequence to find the line equation through A(x1, y1) and B(x2, y2).',
    sortItems: [
      'Compute slope m = (y2 - y1) / (x2 - x1)',
      'Substitute m and point (x1, y1) into (y - y1) = m(x - x1)',
      'Expand the brackets on the right hand side',
      'Rearrange terms to standard form y = mx + c (or ax + by + d = 0)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First compute gradient m, substitute into point-slope form, expand terms, and rearrange to slope-intercept form.',
    hints: [
      'You cannot substitute slope until you calculate m from the two points.',
      'Point-slope equation comes before expanding algebraic brackets.',
      'Final simplification yields y = mx + c.',
    ],
    misconceptionIndex: 5,
  },
  // 15. Advanced - Reverse GP Sum: Find n (Application & Analysis)
  {
    id: 'ch_15',
    nodeId: NODE_C10_MATH_031,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The sum of the first n terms of a GP with a = 5 and r = 2 is 315. Find the number of terms n.',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: 'terms',
    explanation: 'Sn = a(r^n - 1)/(r - 1) => 315 = 5(2^n - 1)/(2 - 1) => 63 = 2^n - 1 => 2^n = 64 = 2^6. Thus n = 6.',
    hints: [
      'Plug into Sn = a(r^n - 1)/(r - 1): 315 = 5(2^n - 1)/1.',
      'Divide 315 by 5 to get 63 = 2^n - 1.',
      '2^n = 64. What power of 2 equals 64? (2^6 = 64, so n = 6).',
    ],
    misconceptionIndex: 0,
  },
  // 16. Advanced - Bouncing Ball GP Sum Distance (Application & Evaluation)
  {
    id: 'ch_16',
    nodeId: NODE_C10_MATH_032,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A test drone drops an acoustic sensor from 20 m height. Each bounce rebounds to half (0.5) of its previous height. Find total distance travelled when it hits the ground the 4th time. (Drop + 3 complete bounces up and down).',
    correctAnswer: 55,
    tolerance: 0.5,
    unit: 'meters',
    explanation: 'Initial drop = 20 m. Rebound 1: 10m up + 10m down = 20m. Rebound 2: 5m up + 5m down = 10m. Rebound 3: 2.5m up + 2.5m down = 5m. Total = 20 + 20 + 10 + 5 = 55 m.',
    hints: [
      'Initial drop is 20m (down only).',
      'Rebounds 1, 2, 3 have both an upward and downward journey: 2 * (10 + 5 + 2.5) = 35m.',
      'Total distance = 20 + 35 = 55 m.',
    ],
    misconceptionIndex: 1,
  },
  // 17. Advanced - Centroid Finding Missing Vertex (Analysis)
  {
    id: 'ch_17',
    nodeId: NODE_C10_MATH_037,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Two vertices of triangle ABC are A(2, 4) and B(5, -2). The center of mass (centroid) is located at G(3, 2). Find the coordinates of the third vertex C.',
    options: [
      'C(2, 4)',
      'C(4, 2)',
      'C(6, 0)',
      'C(1, 3)',
    ],
    correctIndex: 0,
    explanation: 'Gx = (x1 + x2 + x3)/3 => 3 = (2 + 5 + x3)/3 => 9 = 7 + x3 => x3 = 2. Gy = (y1 + y2 + y3)/3 => 2 = (4 - 2 + y3)/3 => 6 = 2 + y3 => y3 = 4. Vertex C is (2, 4).',
    hints: [
      'Use G = ((xA + xB + xC)/3, (yA + yB + yC)/3).',
      'For x: (2 + 5 + xC) = 3 * 3 = 9 => xC = 2.',
      'For y: (4 + (-2) + yC) = 3 * 2 = 6 => yC = 4.',
    ],
    misconceptionIndex: 4,
  },
  // 18. Advanced - Construct Equation of Line through 2 Points (Creativity)
  {
    id: 'ch_18',
    nodeId: NODE_C10_MATH_040,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the equation of the line passing through (2, 3) and (4, 7) into standard slope-intercept form.',
    availableParts: ['y', '=', '2x', '-1', '+1', '3x', '4x', '+5'],
    targetState: 'y = 2x -1',
    validationHint: 'Slope m = (7-3)/(4-2) = 2. Using (2,3): y - 3 = 2(x - 2) => y = 2x - 1.',
    explanation: 'm = (7 - 3)/(4 - 2) = 4/2 = 2. y - 3 = 2(x - 2) => y = 2x - 4 + 3 => y = 2x - 1.',
    hints: [
      'Calculate slope: (7 - 3) / (4 - 2) = 2.',
      'In y = mx + c, m = 2, so the term is 2x.',
      'At x = 2, y = 3 => 3 = 2(2) + c => c = -1.',
    ],
    misconceptionIndex: 5,
  },
  // 19. Advanced - Evaluation of Invariant Points & Dual Reflection (Evaluation)
  {
    id: 'ch_19',
    nodeId: NODE_C10_MATH_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A point P(k, 3) is invariant under reflection in the line x = 5. What must be the value of k, and is this point also invariant under reflection in the origin?',
    options: [
      'k = 5; not invariant under origin reflection because P(5,3) maps to (-5,-3)',
      'k = 3; invariant under origin reflection',
      'k = 0; invariant under origin reflection because (0,3) maps to (0,3)',
      'k = 5; invariant under origin reflection',
    ],
    correctIndex: 0,
    explanation: 'For P(k, 3) to be invariant in x = 5, it must lie on the line x = 5, so k = 5. P is (5, 3). Under origin reflection, (5, 3) becomes (-5, -3) != (5, 3). Only (0, 0) is invariant under origin reflection.',
    hints: [
      'Points on mirror x = 5 have x-coordinate equal to 5.',
      'So k = 5, giving point (5, 3).',
      'Only the origin (0, 0) is invariant under origin reflection.',
    ],
    misconceptionIndex: 3,
  },
  // 20. Advanced - Two-Point Collinearity via Slopes (Analysis & Evaluation)
  {
    id: 'ch_20',
    nodeId: NODE_C10_MATH_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Three drone telemetry beacons are placed at P(1, 2), Q(3, 6), and R(k, 14). If all three beacons lie on the same straight flight line, evaluate the value of k.',
    options: [
      'k = 7',
      'k = 6',
      'k = 8',
      'k = 5',
    ],
    correctIndex: 0,
    explanation: 'Collinear points have equal slopes: Slope(PQ) = (6 - 2)/(3 - 1) = 4/2 = 2. Slope(QR) = (14 - 6)/(k - 3) = 8/(k - 3) = 2 => 8 = 2k - 6 => 2k = 14 => k = 7.',
    hints: [
      'Collinear means slope(PQ) = slope(QR).',
      'Slope(PQ) = (6 - 2)/(3 - 1) = 2.',
      'Set (14 - 6)/(k - 3) = 2 and solve for k: 8 = 2(k - 3) => k = 7.',
    ],
    misconceptionIndex: 5,
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
  nodeId: NODE_C10_MATH_031,
  title: 'Geometric Progressions & Coordinate Geometry Mastery',
  definition: 'Mastery over finite GP sum Sn = a(r^n - 1)/(r - 1), line reflections across x=0, y=0, x=a, y=a, origin (0,0), invariant points, internal section and midpoint formula, triangle centroid G, slope m = tan theta, and equations of straight lines in slope-intercept and two-point forms.',
  eli5: 'Think of GP like doubling bacteria or bouncing balls where every step multiplies. Coordinate geometry is like a GPS map: reflections bounce your location across mirror lines, the section formula finds any spot along a drone flight line, and slope tells you how steep your climb is.',
  misconceptions: [
    {
      misconception: 'Using n - 1 in the exponent of GP sum formula Sn like the nth term formula.',
      correction: 'The sum formula uses r^n (not r^(n-1)) because adding n terms from ar^0 to ar^(n-1) leaves the highest power ar^n after subtraction.',
    },
    {
      misconception: 'Treating percentage increase or depreciation as an Arithmetic Progression by subtracting a fixed number.',
      correction: 'Percentage changes are multiplicative factors (1 ± rate), forming a Geometric Progression with common ratio r.',
    },
    {
      misconception: 'Reflecting in x = a simply negates x as (-x, y).',
      correction: 'Reflection across vertical mirror x = a maps x to 2a - x because the distance from x to a must equal the distance from a to x\'.',
    },
    {
      misconception: 'The origin (0, 0) is invariant under every single line reflection.',
      correction: 'A point is invariant only if it lies ON that specific mirror line. The origin is only invariant for reflections in axes passing through (0,0) or in the origin itself.',
    },
    {
      misconception: 'Swapping m and n weights in the section formula (multiplying m with the first point A).',
      correction: 'The ratio weight m multiplies the coordinates of the second point B, and n multiplies the first point A: P = (m*x2 + n*x1)/(m+n).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the sum formula for a GP with r > 1?', options: ['Sn = a(r^n - 1)/(r - 1)', 'Sn = a(r^(n-1) - 1)/(r - 1)', 'Sn = n/2(2a + (n-1)d)', 'Sn = ar^(n-1)'], correctIndex: 0 },
    { question: 'Does a 10% annual compound growth form an AP or GP?', options: ['GP with r = 1.10', 'AP with d = 10', 'GP with r = 0.10', 'AP with d = 1.10'], correctIndex: 0 },
    { question: 'What is the image of (3, -5) when reflected in the x-axis?', options: ['(3, 5)', '(-3, -5)', '(-3, 5)', '(5, -3)'], correctIndex: 0 },
    { question: 'What is the image of (2, 7) reflected in the origin?', options: ['(-2, -7)', '(-2, 7)', '(2, -7)', '(7, 2)'], correctIndex: 0 },
    { question: 'Which point is invariant under reflection in x = -3?', options: ['(-3, 9)', '(3, 9)', '(0, -3)', '(-3, 0) only'], correctIndex: 0 },
    { question: 'What is the midpoint between (-2, 4) and (6, 12)?', options: ['(2, 8)', '(4, 8)', '(2, 4)', '(4, 16)'], correctIndex: 0 },
    { question: 'Centroid of triangle with vertices (0,0), (6,0), (0,9) is:', options: ['(2, 3)', '(3, 4.5)', '(3, 3)', '(2, 4.5)'], correctIndex: 0 },
    { question: 'Slope of a line making 45° with positive x-axis is:', options: ['1', '0', 'sqrt(3)', 'undefined'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student accurately solves GP sums and real-world compounding problems, computes coordinates of reflected images and invariant lines, calculates internal division and centroid coordinates, and constructs equations of lines using slope-intercept and two-point forms.',
};

// ─── EXPLORATION STEPS (Learn by Doing) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Geometric Signal Amplification (GP Sum)',
    instruction: 'Adjust the first term a and common ratio r. Watch how the discrete terms and their cumulative sum Sn stack up exponentially!',
    interactionType: 'slider-gp',
    nodeId: NODE_C10_MATH_031,
  },
  {
    title: 'Lab 2: Coordinate Radar Reflection & Invariant Points',
    instruction: 'Drag point P(x, y) or change the mirror line. Observe how the reflected point P\' moves and verify that points directly on the mirror remain invariant!',
    interactionType: 'mirror-reflect',
    nodeId: NODE_C10_MATH_033,
  },
  {
    title: 'Lab 3: Section Formula & Midpoint Divider',
    instruction: 'Drag the ratio slider m : n along the line segment AB. Watch how point P shifts closer to B as m increases!',
    interactionType: 'section-slider',
    nodeId: NODE_C10_MATH_036,
  },
  {
    title: 'Lab 4: Drone Swarm Center of Mass (Centroid G)',
    instruction: 'Drag any of the three vertices A, B, or C. Observe how the 3 medians always intersect at G = ((x1+x2+x3)/3, (y1+y2+y3)/3) in a 2:1 ratio!',
    interactionType: 'triangle-centroid',
    nodeId: NODE_C10_MATH_037,
  },
  {
    title: 'Lab 5: Straight-Line Telemetry Matrix (y = mx + c)',
    instruction: 'Rotate the slope m and translate intercept c. Observe how angle theta = arctan(m) and the (0, c) intercept govern the entire line!',
    interactionType: 'line-matrix',
    nodeId: NODE_C10_MATH_039,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If common ratio r doubles from 2 to 4 while first term a=2 and n=3, how dramatically will the sum Sn increase?',
    options: [
      'Sn will increase from 14 to 42 (exactly 3 times)',
      'Sn will increase from 14 to 86 (more than 6 times)',
      'Sn will remain unchanged',
      'Sn will simply double from 14 to 28',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust r to 2 and then to 4 on the GP visualizer to watch the rapid exponential expansion!',
    nodeId: NODE_C10_MATH_031,
  },
  {
    question: 'Predict: If point P is placed at (3, 5) and we reflect it across horizontal line y = 2, where will the image P\' land?',
    options: [
      "P'(3, -1) because 2a - y = 2(2) - 5 = -1",
      "P'(3, -5) because y flips sign",
      "P'(-1, 5) because x changes",
      "P'(3, 2) because it lands on the mirror",
    ],
    correctIndex: 0,
    verifyInstruction: 'Select mirror y = 2 and drag P to (3, 5) in the reflection lab to verify P\'(3, -1)!',
    nodeId: NODE_C10_MATH_033,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the distance from P to the mirror line compared to the distance from P\' to the mirror line?',
    observableOptions: [
      'Both distances are always exactly equal; the mirror line is the perpendicular bisector',
      "P' is always twice as far from the mirror as P",
      "P' is closer to the origin than P",
      'The distance changes randomly depending on the sign of coordinates',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_MATH_033,
  },
  {
    question: 'What happens to the centroid G when vertex A is pulled higher in the y-direction?',
    observableOptions: [
      'G moves upward by exactly 1/3 of the vertical displacement of A',
      'G remains stationary at the center of the base',
      'G moves downward',
      'G moves by the full displacement of A',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_MATH_037,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Antariksh Space Systems: Drone Swarm Flight Path Designer',
  description: 'Design a 3-drone survey triangle over Bangalore Aerospace Park. Calculate the centroid G as the swarm relay hub, reflect the boundary across the airport security axis x = 4, and compute the geometric signal decay over 5 repeater relays.',
  steps: [
    'Choose 3 GPS coordinates for Drones A(2, 3), B(6, 7), and C(10, 2)',
    'Compute relay centroid G = ((2+6+10)/3, (3+7+2)/3) = (6, 4)',
    "Reflect drone A across airport boundary line x = 4 to find safety backup A'(2(4)-2, 3) = (6, 3)",
    'Calculate 5-stage signal propagation with initial power a = 100 mW and decay ratio r = 0.5 using GP sum Sn',
  ],
};

// ─── MAIN COMPONENT ───
function C10_MathematicsGeometricProgressionFirstSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_MATH_031,
  title = DEFAULT_PROPS.title || 'Geometric Progression & Coordinate Geometry',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── STATE DECLARATIONS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & observe
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Adaptive difficulty & mastery
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & interactive input state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Lab 1: GP Visualizer State
  const [gpA, setGpA] = useState(2);
  const [gpR, setGpR] = useState(2);
  const [gpN, setGpN] = useState(4);

  // Lab 2: Reflection Visualizer State
  const [ptX, setPtX] = useState(3);
  const [ptY, setPtY] = useState(4);
  const [mirrorType, setMirrorType] = useState<'x0' | 'y0' | 'xa' | 'ya' | 'origin'>('x0');
  const [mirrorA, setMirrorA] = useState(1);

  // Lab 3: Section Formula State
  const [secA] = useState({ x: 1, y: 2 });
  const [secB] = useState({ x: 7, y: 8 });
  const [ratioM, setRatioM] = useState(2);
  const [ratioN, setRatioN] = useState(1);

  // Lab 4: Triangle Centroid State
  const [triA, setTriA] = useState({ x: 2, y: 2 });
  const [triB, setTriB] = useState({ x: 8, y: 3 });
  const [triC, setTriC] = useState({ x: 5, y: 9 });

  // Lab 5: Line Matrix State
  const [lineM, setLineM] = useState(1.5);
  const [lineC, setLineC] = useState(-1);

  // Sandbox active lab tab
  const [sandboxTab, setSandboxTab] = useState<'gp' | 'reflection' | 'section' | 'centroid' | 'line'>('gp');

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── CALCULATED VALUES (Memoized) ───
  const gpTerms = useMemo(() => {
    const terms: number[] = [];
    let current = gpA;
    for (let i = 0; i < gpN; i++) {
      terms.push(current);
      current *= gpR;
    }
    return terms;
  }, [gpA, gpR, gpN]);

  const gpSum = useMemo(() => {
    if (gpR === 1) return gpA * gpN;
    return (gpA * (Math.pow(gpR, gpN) - 1)) / (gpR - 1);
  }, [gpA, gpR, gpN]);

  // Reflected Point Calculation
  const reflectedPt = useMemo(() => {
    switch (mirrorType) {
      case 'x0':
        return { x: -ptX, y: ptY, label: "P'(-x, y)" };
      case 'y0':
        return { x: ptX, y: -ptY, label: "P'(x, -y)" };
      case 'xa':
        return { x: 2 * mirrorA - ptX, y: ptY, label: "P'(2a - x, y)" };
      case 'ya':
        return { x: ptX, y: 2 * mirrorA - ptY, label: "P'(x, 2a - y)" };
      case 'origin':
        return { x: -ptX, y: -ptY, label: "P'(-x, -y)" };
      default:
        return { x: -ptX, y: ptY, label: "P'" };
    }
  }, [ptX, ptY, mirrorType, mirrorA]);

  const isPtInvariant = useMemo(() => {
    return ptX === reflectedPt.x && ptY === reflectedPt.y;
  }, [ptX, ptY, reflectedPt]);

  // Section Formula Point Calculation
  const sectionPoint = useMemo(() => {
    const total = ratioM + ratioN;
    if (total === 0) return { x: 0, y: 0 };
    const px = (ratioM * secB.x + ratioN * secA.x) / total;
    const py = (ratioM * secB.y + ratioN * secA.y) / total;
    return { x: Number(px.toFixed(2)), y: Number(py.toFixed(2)) };
  }, [secA, secB, ratioM, ratioN]);

  // Centroid Calculation
  const centroidPoint = useMemo(() => {
    const gx = (triA.x + triB.x + triC.x) / 3;
    const gy = (triA.y + triB.y + triC.y) / 3;
    return { x: Number(gx.toFixed(2)), y: Number(gy.toFixed(2)) };
  }, [triA, triB, triC]);

  // Midpoints of sides for centroid medians
  const midBC = useMemo(() => ({ x: (triB.x + triC.x) / 2, y: (triB.y + triC.y) / 2 }), [triB, triC]);
  const midAC = useMemo(() => ({ x: (triA.x + triC.x) / 2, y: (triA.y + triC.y) / 2 }), [triA, triC]);
  const midAB = useMemo(() => ({ x: (triA.x + triB.x) / 2, y: (triA.y + triB.y) / 2 }), [triA, triB]);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Motivational Feedback Helper
  const getMotivationalMessage = (errs: number) => {
    if (errs === 0) return 'PERFECT SCORE! 🌟';
    if (errs <= 3) return 'Great work! 👍';
    if (errs <= 7) return 'Good effort! 👏';
    return 'Do not give up — You WILL get this! 💪';
  };

  // ─── USEEFFECT HOOKS ───
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

      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const dotX = (frame * 2) % canvas.width;
      const dotY = canvas.height / 2 + Math.sin((dotX + frame * 2) * 0.05) * 8;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Escalating hint shower
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
      inactivityTimerRef.current = setTimeout(() => {
        showNextHint();
      }, 10000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallenge, phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HOOKS ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate prediction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Coordinate Geometry & GP Laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Play freely with any mathematical tool.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    setScoreBreakdown({ correct: 0, total: 0 });
    audioManager.play('whoosh');
    speechManager.speak('Challenge matrix activated. Test your skills on progressive problems.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[0].correctIndex;
    audioManager.play('tap');
    speechManager.speak(isCorrect ? 'Spot on prediction! Let us test with the sliders.' : 'Interesting hypothesis! Now drag the sliders to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation!' : 'Look closely at the perpendicular distance to the mirror.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have achieved mastery across Geometric Progressions and Coordinate Geometry.');
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
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding calculation.');
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
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete step-by-step resolution.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
    },
    [challenge, hintCount, showNextHint, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const initial = prev.length > 0 ? prev : (challenge.sortItems?.map((_, i) => i) || []);
        const arr = [...initial];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructAdd = useCallback((part: string) => {
    setConstructParts((prev) => [...prev, part]);
    audioManager.play('tap');
  }, []);

  const handleConstructRemove = useCallback((idx: number) => {
    setConstructParts((prev) => prev.filter((_, i) => i !== idx));
    audioManager.play('pop');
  }, []);

  const handleReset = useCallback(() => {
    setPhase('discovery');
    setCurrentChallenge(0);
    setCurrentSlide(0);
    setDiscoveryAnswered(false);
    setErrors(0);
    setScoreBreakdown({ correct: 0, total: 0 });
    bktStateRef.current = createBKTState();
    audioManager.play('whoosh');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-300 to-emerald-300">
              {title}
            </h1>
            <p className="text-xs text-slate-400">ICSE Class 10 Mathematics • Coordinate Geometry & GP Matrix</p>
          </div>
        </div>

        {/* Phase Badges */}
        <div className="flex items-center gap-2">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.span
              key={p}
              whileHover={{ scale: 1.05 }}
              className={`text-xs px-3 py-1 rounded-full capitalize font-semibold transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {p}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ─── CANVAS TELEMETRY DISPLAY ─── */}
      <div className="mb-6 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/50 p-2 relative">
        <canvas ref={canvasRef} width={800} height={40} className="w-full rounded-xl" />
        <div className="absolute top-3 left-4 flex items-center gap-2 text-xs text-gold-400 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>ISRO-ANTARIKSH GUIDANCE TELEMETRY: ACTIVE</span>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-3xl border border-gold-700/50 shadow-xl">
            <h2 className="text-xl font-black text-gold-300 flex items-center gap-2">
              <span>🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-300/90 mt-3 p-3 bg-amber-950/30 rounded-xl border border-amber-800/50">
              ⚡ {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800">
            <span className="text-xs font-bold tracking-wider text-gold-400 uppercase">Curiosity Discovery Hook</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-2xl border transition-all text-sm flex items-center justify-between ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <span className="font-mono text-gold-400 mr-2">[{String.fromCharCode(65 + i)}]</span> {opt}
                  </div>
                  {discoveryAnswered && (
                    <span className="font-bold ml-2">
                      {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-semibold' : 'text-amber-400 text-sm font-semibold'}>
                  {discoveryCorrect ? '✨ Outstanding spatial reasoning! Exactly how mirror symmetry works.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    aria-label="Launch Guided Exploration"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-2xl shadow-lg shadow-gold-600/30 flex items-center gap-2"
                  >
                    <span>Launch Guided Exploration</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                Interactive Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <p className="text-xs text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-700/40">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl"
            >
              {/* SLIDE 0: GP SERIES AMPLIFICATION */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>First Term (a):</span>
                        <span className="text-gold-400 font-mono font-bold">{gpA}</span>
                      </label>
                      <input
                        type="range"
                        aria-label="First Term a"
                        min={1}
                        max={10}
                        value={gpA}
                        onChange={(e) => {
                          setGpA(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500"
                      />
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Common Ratio (r):</span>
                        <span className="text-emerald-400 font-mono font-bold">{gpR}</span>
                      </label>
                      <input
                        type="range"
                        aria-label="Common Ratio r"
                        min={1}
                        max={4}
                        step={0.5}
                        value={gpR}
                        onChange={(e) => {
                          setGpR(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-emerald-500"
                      />
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Number of Terms (n):</span>
                        <span className="text-gold-400 font-mono font-bold">{gpN}</span>
                      </label>
                      <input
                        type="range"
                        aria-label="Number of Terms n"
                        min={2}
                        max={6}
                        value={gpN}
                        onChange={(e) => {
                          setGpN(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500"
                      />
                    </div>
                  </div>

                  {/* GP SVG Visualization */}
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 overflow-x-auto">
                    <svg viewBox="0 0 600 220" className="w-full h-52">
                      <line x1="40" y1="180" x2="580" y2="180" stroke="#334155" strokeWidth="2" />
                      <line x1="40" y1="20" x2="40" y2="180" stroke="#334155" strokeWidth="2" />

                      {gpTerms.map((term, i) => {
                        const maxVal = Math.max(...gpTerms, 100);
                        const barHeight = Math.min(150, (term / maxVal) * 140 + 10);
                        const x = 70 + i * (480 / gpN);
                        const y = 180 - barHeight;

                        return (
                          <g key={i}>
                            <motion.rect
                              initial={{ height: 0, y: 180 }}
                              animate={{ height: barHeight, y }}
                              width="40"
                              rx="6"
                              fill={`hsl(${220 + i * 25}, 85%, 60%)`}
                              opacity="0.85"
                            />
                            <text x={x + 20} y={y - 8} textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                              T{i + 1}={term}
                            </text>
                            <text x={x + 20} y="198" textAnchor="middle" fill="#94a3b8" fontSize="10">
                              Step {i + 1}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    <div className="mt-2 flex flex-wrap items-center justify-between p-3 bg-gold-950/40 rounded-xl border border-gold-800/40">
                      <div className="text-sm font-mono">
                        <span className="text-slate-400">Sum Equation: </span>
                        <span className="text-gold-300 font-bold">
                          Sn = {gpA}({gpR}^{gpN} - 1)/({gpR} - 1) =
                        </span>
                        <span className="text-emerald-400 font-extrabold ml-2">{gpSum}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        Terms: {gpTerms.join(' + ')} = <span className="text-emerald-300 font-bold">{gpSum}</span>
                      </div>
                    </div>
                  </div>

                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-gold-800">
                      <p className="text-sm font-bold text-gold-300 mb-2">🤔 {PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left bg-slate-900 hover:bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 1: REFLECTION & INVARIANT POINTS */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label className="text-xs text-slate-400">Select Mirror Line:</label>
                      <div className="grid grid-cols-2 gap-1.5 mt-2">
                        {[
                          { id: 'x0' as const, label: 'y-axis (x=0)' },
                          { id: 'y0' as const, label: 'x-axis (y=0)' },
                          { id: 'xa' as const, label: `x = ${mirrorA}` },
                          { id: 'ya' as const, label: `y = ${mirrorA}` },
                          { id: 'origin' as const, label: 'Origin (0,0)' },
                        ].map((m) => (
                          <motion.button
                            key={m.id}
                            aria-label={`Select mirror ${m.label}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setMirrorType(m.id);
                              audioManager.play('tap');
                            }}
                            className={`px-2 py-1.5 text-xs rounded-lg font-semibold transition-all ${
                              mirrorType === m.id
                                ? 'bg-gold-600 text-white'
                                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            {m.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Coordinate X:</span>
                        <span className="text-gold-400 font-mono font-bold">{ptX}</span>
                      </label>
                      <input
                        type="range"
                        aria-label="Point X coordinate"
                        min={-5}
                        max={5}
                        value={ptX}
                        onChange={(e) => {
                          setPtX(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500"
                      />
                      <label className="text-xs text-slate-400 flex justify-between mt-3">
                        <span>Coordinate Y:</span>
                        <span className="text-gold-400 font-mono font-bold">{ptY}</span>
                      </label>
                      <input
                        type="range"
                        aria-label="Point Y coordinate"
                        min={-5}
                        max={5}
                        value={ptY}
                        onChange={(e) => {
                          setPtY(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Line Offset (a):</span>
                        <span className="text-amber-400 font-mono font-bold">{mirrorA}</span>
                      </label>
                      <input
                        type="range"
                        aria-label="Mirror offset a"
                        min={-4}
                        max={4}
                        value={mirrorA}
                        onChange={(e) => {
                          setMirrorA(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-amber-500"
                      />
                      <div className="mt-4 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                        <span className="text-slate-400">Status: </span>
                        {isPtInvariant ? (
                          <span className="text-emerald-400 font-bold">✓ INVARIANT (Lies on mirror)</span>
                        ) : (
                          <span className="text-gold-300">Reflecting across mirror</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex justify-center">
                    <svg viewBox="-120 -120 240 240" className="w-full max-w-md h-64">
                      {[-80, -40, 0, 40, 80].map((coord) => (
                        <React.Fragment key={coord}>
                          <line x1={coord} y1="-110" x2={coord} y2="110" stroke="#1e293b" strokeWidth="1" />
                          <line x1="-110" y1={coord} x2="110" y2={coord} stroke="#1e293b" strokeWidth="1" />
                        </React.Fragment>
                      ))}

                      <line x1="-115" y1="0" x2="115" y2="0" stroke="#475569" strokeWidth="1.5" />
                      <line x1="0" y1="-115" x2="0" y2="115" stroke="#475569" strokeWidth="1.5" />

                      {mirrorType === 'x0' && <line x1="0" y1="-110" x2="0" y2="110" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 3" />}
                      {mirrorType === 'y0' && <line x1="-110" y1="0" x2="110" y2="0" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 3" />}
                      {mirrorType === 'xa' && <line x1={mirrorA * 20} y1="-110" x2={mirrorA * 20} y2="110" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 3" />}
                      {mirrorType === 'ya' && <line x1="-110" y1={-mirrorA * 20} x2="110" y2={-mirrorA * 20} stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 3" />}
                      {mirrorType === 'origin' && <circle cx="0" cy="0" r="5" fill="#ef4444" />}

                      <line x1={ptX * 20} y1={-ptY * 20} x2={reflectedPt.x * 20} y2={-reflectedPt.y * 20} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />

                      <motion.circle
                        animate={{ cx: ptX * 20, cy: -ptY * 20 }}
                        r="6"
                        fill="#38bdf8"
                      />
                      <text x={ptX * 20 + 8} y={-ptY * 20 - 4} fill="#38bdf8" fontSize="9" fontWeight="bold">
                        {`P(${ptX}, ${ptY})`}
                      </text>

                      <motion.circle
                        animate={{ cx: reflectedPt.x * 20, cy: -reflectedPt.y * 20 }}
                        r="6"
                        fill="#22c55e"
                      />
                      <text x={reflectedPt.x * 20 + 8} y={-reflectedPt.y * 20 - 4} fill="#22c55e" fontSize="9" fontWeight="bold">
                        {`P'(${reflectedPt.x}, ${reflectedPt.y})`}
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 2: SECTION FORMULA */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Ratio m (Weight toward B):</span>
                        <span className="text-gold-400 font-mono font-bold">{ratioM}</span>
                      </label>
                      <input
                        type="range"
                        aria-label="Ratio m slider"
                        min={1}
                        max={5}
                        value={ratioM}
                        onChange={(e) => {
                          setRatioM(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500"
                      />

                      <label className="text-xs text-slate-400 flex justify-between mt-3">
                        <span>Ratio n (Weight toward A):</span>
                        <span className="text-gold-400 font-mono font-bold">{ratioN}</span>
                      </label>
                      <input
                        type="range"
                        aria-label="Ratio n slider"
                        min={1}
                        max={5}
                        value={ratioN}
                        onChange={(e) => {
                          setRatioN(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center">
                      <span className="text-xs text-slate-400 uppercase font-bold">Section Calculation</span>
                      <div className="text-sm font-mono mt-2 space-y-1">
                        <p className="text-slate-300">
                          Px = ({ratioM}×{secB.x} + {ratioN}×{secA.x}) / ({ratioM}+{ratioN}) ={' '}
                          <span className="text-emerald-400 font-bold">{sectionPoint.x}</span>
                        </p>
                        <p className="text-slate-300">
                          Py = ({ratioM}×{secB.y} + {ratioN}×{secA.y}) / ({ratioM}+{ratioN}) ={' '}
                          <span className="text-emerald-400 font-bold">{sectionPoint.y}</span>
                        </p>
                      </div>
                      <div className="mt-2 text-xs text-amber-300">
                        {ratioM === ratioN ? '✨ Exactly at Midpoint (1 : 1)' : `Closer to point ${ratioM > ratioN ? 'B' : 'A'}`}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 500 180" className="w-full max-w-lg h-44">
                      <line x1="60" y1="120" x2="440" y2="40" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

                      <circle cx="60" cy="120" r="8" fill="#38bdf8" />
                      <text x="60" y="145" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                        A({secA.x}, {secA.y})
                      </text>

                      <circle cx="440" cy="40" r="8" fill="#a855f7" />
                      <text x="440" y="25" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold">
                        B({secB.x}, {secB.y})
                      </text>

                      {(() => {
                        const t = ratioM / (ratioM + ratioN);
                        const px = 60 + t * (440 - 60);
                        const py = 120 + t * (40 - 120);
                        return (
                          <g>
                            <motion.line
                              animate={{ x1: 60, y1: 120, x2: px, y2: py }}
                              stroke="#6366f1"
                              strokeWidth="4"
                            />
                            <motion.circle animate={{ cx: px, cy: py }} r="9" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                            <text x={px} y={py + 24} textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">
                              P({sectionPoint.x}, {sectionPoint.y}) [{ratioM}:{ratioN}]
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 3: CENTROID OF TRIANGLE */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-xs text-gold-400 font-bold">Vertex A({triA.x}, {triA.y})</span>
                      <input
                        type="range"
                        aria-label="Vertex A X"
                        min={1}
                        max={9}
                        value={triA.x}
                        onChange={(e) => setTriA((prev) => ({ ...prev, x: Number(e.target.value) }))}
                        className="w-full mt-2 accent-gold-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-xs text-gold-400 font-bold">Vertex B({triB.x}, {triB.y})</span>
                      <input
                        type="range"
                        aria-label="Vertex B X"
                        min={1}
                        max={9}
                        value={triB.x}
                        onChange={(e) => setTriB((prev) => ({ ...prev, x: Number(e.target.value) }))}
                        className="w-full mt-2 accent-gold-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-xs text-purple-400 font-bold">Vertex C({triC.x}, {triC.y})</span>
                      <input
                        type="range"
                        aria-label="Vertex C Y"
                        min={1}
                        max={9}
                        value={triC.y}
                        onChange={(e) => setTriC((prev) => ({ ...prev, y: Number(e.target.value) }))}
                        className="w-full mt-2 accent-purple-500"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 400 220" className="w-full max-w-md h-52">
                      <polygon
                        points={`${triA.x * 40},${220 - triA.y * 22} ${triB.x * 40},${220 - triB.y * 22} ${triC.x * 40},${220 - triC.y * 22}`}
                        fill="#312e81"
                        fillOpacity="0.3"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />

                      <line
                        x1={triA.x * 40}
                        y1={220 - triA.y * 22}
                        x2={midBC.x * 40}
                        y2={220 - midBC.y * 22}
                        stroke="#e2e8f0"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                      />
                      <line
                        x1={triB.x * 40}
                        y1={220 - triB.y * 22}
                        x2={midAC.x * 40}
                        y2={220 - midAC.y * 22}
                        stroke="#e2e8f0"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                      />
                      <line
                        x1={triC.x * 40}
                        y1={220 - triC.y * 22}
                        x2={midAB.x * 40}
                        y2={220 - midAB.y * 22}
                        stroke="#e2e8f0"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                      />

                      <circle cx={triA.x * 40} cy={220 - triA.y * 22} r="5" fill="#38bdf8" />
                      <circle cx={triB.x * 40} cy={220 - triB.y * 22} r="5" fill="#818cf8" />
                      <circle cx={triC.x * 40} cy={220 - triC.y * 22} r="5" fill="#c084fc" />

                      <circle cx={centroidPoint.x * 40} cy={220 - centroidPoint.y * 22} r="7" fill="#22c55e" />
                      <text
                        x={centroidPoint.x * 40 + 8}
                        y={220 - centroidPoint.y * 22 - 6}
                        fill="#22c55e"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        G({centroidPoint.x}, {centroidPoint.y})
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 4: LINE EQUATION MATRIX */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Slope (m = tan θ):</span>
                        <span className="text-gold-400 font-mono font-bold">{lineM}</span>
                      </label>
                      <input
                        type="range"
                        aria-label="Slope m slider"
                        min={-3}
                        max={3}
                        step={0.25}
                        value={lineM}
                        onChange={(e) => {
                          setLineM(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500"
                      />

                      <label className="text-xs text-slate-400 flex justify-between mt-3">
                        <span>Y-Intercept (c):</span>
                        <span className="text-gold-400 font-mono font-bold">{lineC}</span>
                      </label>
                      <input
                        type="range"
                        aria-label="Y Intercept c slider"
                        min={-4}
                        max={4}
                        value={lineC}
                        onChange={(e) => {
                          setLineC(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center">
                      <span className="text-xs text-slate-400 uppercase font-bold">Line Equation Model</span>
                      <div className="text-lg font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-emerald-300 mt-2">
                        y = {lineM}x {lineC >= 0 ? `+ ${lineC}` : `- ${Math.abs(lineC)}`}
                      </div>
                      <p className="text-xs text-slate-400 mt-2">
                        Angle of Inclination θ = {(Math.atan(lineM) * (180 / Math.PI)).toFixed(1)}°
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex justify-center">
                    <svg viewBox="-100 -80 200 160" className="w-full max-w-md h-48">
                      <line x1="-95" y1="0" x2="95" y2="0" stroke="#475569" strokeWidth="1.5" />
                      <line x1="0" y1="-75" x2="0" y2="75" stroke="#475569" strokeWidth="1.5" />

                      {(() => {
                        const x1 = -80;
                        const y1 = -(lineM * -4 + lineC) * 15;
                        const x2 = 80;
                        const y2 = -(lineM * 4 + lineC) * 15;
                        return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />;
                      })()}

                      <circle cx="0" cy={-lineC * 15} r="5" fill="#f59e0b" />
                      <text x="8" y={-lineC * 15 + 4} fill="#f59e0b" fontSize="9" fontWeight="bold">
                        (0, {lineC})
                      </text>
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-6 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Free Play Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                <span>Free Play Sandbox</span>
                <span>→</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-emerald-300">🎮 Free Play Math Simulator</h2>
              <p className="text-xs text-slate-400">Switch tabs and test any formula without grading pressure.</p>
            </div>
            <div className="flex gap-2">
              {(['gp', 'reflection', 'section', 'centroid', 'line'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  aria-label={`Select ${tab} sandbox tab`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSandboxTab(tab);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                    sandboxTab === tab
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-3xl border border-slate-800">
            {sandboxTab === 'gp' && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-slate-400">First Term a = {gpA}</label>
                    <input type="range" aria-label="First term slider" min={1} max={8} value={gpA} onChange={(e) => setGpA(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-slate-400">Ratio r = {gpR}</label>
                    <input type="range" aria-label="Ratio r slider" min={1} max={3} step={0.5} value={gpR} onChange={(e) => setGpR(Number(e.target.value))} className="w-full accent-emerald-500" />
                  </div>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl text-center font-mono text-gold-300">
                  Calculated GP Sum Sn = {gpSum} (Terms: {gpTerms.join(', ')})
                </div>
              </div>
            )}

            {sandboxTab === 'reflection' && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-slate-400">X = {ptX}</label>
                    <input type="range" aria-label="Point X slider" min={-5} max={5} value={ptX} onChange={(e) => setPtX(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-slate-400">Y = {ptY}</label>
                    <input type="range" aria-label="Point Y slider" min={-5} max={5} value={ptY} onChange={(e) => setPtY(Number(e.target.value))} className="w-full accent-purple-500" />
                  </div>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl text-center font-mono text-emerald-300">
                  Reflected Image = ({reflectedPt.x}, {reflectedPt.y}) | Invariant: {isPtInvariant ? 'YES ✓' : 'NO ✗'}
                </div>
              </div>
            )}

            {sandboxTab === 'section' && (
              <div className="p-4 bg-slate-950 rounded-2xl text-center font-mono text-gold-300">
                Segment A(1,2) to B(7,8) divided in {ratioM}:{ratioN} =&gt; P = ({sectionPoint.x}, {sectionPoint.y})
              </div>
            )}

            {sandboxTab === 'centroid' && (
              <div className="p-4 bg-slate-950 rounded-2xl text-center font-mono text-amber-300">
                Centroid G = ((xA+xB+xC)/3, (yA+yB+yC)/3) = ({centroidPoint.x}, {centroidPoint.y})
              </div>
            )}

            {sandboxTab === 'line' && (
              <div className="p-4 bg-slate-950 rounded-2xl text-center font-mono text-pink-300">
                Line: y = {lineM}x + {lineC} (m = {lineM}, c = {lineC})
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <motion.button
              aria-label="Ready for Challenge Mode"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-gold-600 to-emerald-600 text-white font-black rounded-2xl shadow-xl flex items-center gap-2"
            >
              <span>Ready for Challenge Mode</span>
              <span>🚀</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MATRIX ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-400">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                <span>⚡ Challenge Matrix</span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                      : difficulty === 'standard'
                      ? 'bg-gold-950 text-gold-400 border border-gold-700'
                      : 'bg-rose-950 text-rose-400 border border-rose-700'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  NEP: {challenge.competencyLevel}
                </span>
              </h2>
            </div>

            <div className="text-right font-mono text-xs text-slate-400">
              Score: <span className="text-emerald-400 font-bold">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
            </div>
          </div>

          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">{challenge.question}</h3>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-center justify-between gap-3 ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs px-2 py-1 rounded-lg bg-slate-900 text-gold-400 border border-slate-700">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </div>
                      {showExplanation && (
                        <span className="font-bold text-sm">
                          {i === challenge.correctIndex ? '✓ Correct' : '✗'}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Enter numeric answer"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="flex-1 p-3.5 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                  />
                  {challenge.unit && <span className="text-sm text-slate-400 font-mono">{challenge.unit}</span>}
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3.5 bg-gold-600 text-white font-bold rounded-2xl disabled:opacity-40"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable mapping rule: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      className="px-3.5 py-2 bg-gold-600/80 hover:bg-gold-500 text-white font-mono text-xs rounded-xl cursor-grab active:cursor-grabbing border border-gold-400/30"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'rule_yaxis', label: 'Reflection in y-axis' },
                    { id: 'rule_xaxis', label: 'Reflection in x-axis' },
                    { id: 'rule_origin', label: 'Reflection in Origin' },
                    { id: 'rule_x_a', label: 'Reflection in x = a' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center"
                    >
                      <span className="text-xs text-slate-400 block mb-2">{target.label}</span>
                      <div className="p-3 bg-slate-900 rounded-xl border border-dashed border-slate-700 min-h-[44px] flex items-center justify-center font-mono text-sm text-emerald-400 font-bold">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Rule Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Mappings"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="w-full py-3 bg-gold-600 text-white font-bold rounded-2xl"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length > 0
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, i) => (
                  <motion.div
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sortable step ${i + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(i))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, i);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-800 rounded-2xl border border-slate-700 text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-gold-900 text-gold-300 font-bold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Check Sequence"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="w-full py-3 bg-gold-600 text-white font-bold rounded-2xl"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructAdd(part)}
                      className="px-3 py-1.5 bg-gold-900/60 hover:bg-gold-800 text-gold-200 font-mono text-xs rounded-xl border border-gold-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Remove part ${part}`}
                      onClick={() => handleConstructRemove(i)}
                      className="px-3 py-1 bg-gold-600 text-white font-mono text-sm rounded-xl cursor-pointer hover:bg-rose-600 transition-all flex items-center gap-1"
                    >
                      {part} <span className="text-[10px]">✕</span>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 font-mono">Click pieces above to assemble equation</span>
                  )}
                </div>

                <motion.button
                  aria-label="Validate Assembly"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="w-full py-3 bg-gold-600 text-white font-bold rounded-2xl"
                >
                  Validate Assembly
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-gold-950/80 to-slate-900 rounded-2xl border border-gold-700 space-y-3"
              >
                <h4 className="text-sm font-bold text-gold-300">Detailed Step-by-Step Resolution:</h4>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-200 leading-relaxed font-sans"
                    >
                      <span className="font-mono text-gold-400 font-bold mr-2">[{i + 1}]</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Reveal Next Step"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-gold-800 text-white text-xs font-bold rounded-xl"
                  >
                    Reveal Next Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <div className="pt-2 flex justify-end">
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mastery' : 'Next Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mastery →' : 'Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE & MASTERY REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-emerald-950 rounded-3xl border border-gold-700/60 shadow-2xl text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">ICSE Mathematics Telemetry Certified!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="py-2 px-4 rounded-2xl bg-gold-900/60 border border-gold-400 max-w-md mx-auto">
              <p className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-gold-200 to-amber-300">
                {getMotivationalMessage(errors)}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Errors encountered: <span className="font-bold text-amber-300">{errors}</span>
              </p>
            </div>

            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have completed the ICSE Class 10 Geometric Progression & Coordinate Geometry Simulation Suite.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[140px]">
                <span className="text-xs text-slate-400 block uppercase">Final Accuracy</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[140px]">
                <span className="text-xs text-slate-400 block uppercase">BKT Mastery</span>
                <span className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* SPACED REPETITION (SRS) SCHEDULE - HIGH VISIBILITY BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-r from-gold-950/90 via-slate-900 to-gold-900/50 rounded-3xl border-2 border-gold-500/80 shadow-xl space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl p-2 bg-gold-800/60 rounded-xl">📅</span>
                <div>
                  <h3 className="text-base font-black text-white tracking-wide">
                    Spaced Repetition System (SRS) Review Schedule
                  </h3>
                  <p className="text-xs text-gold-300">SuperMemo SM-2 Optimal Cognitive Interval</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono uppercase">Target Interval:</span>
                <span
                  className={`px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider shadow-lg ${
                    errors === 0
                      ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                      : errors <= 3
                      ? 'bg-gold-400 text-slate-950 shadow-gold-400/30'
                      : 'bg-amber-400 text-slate-950 shadow-amber-400/30'
                  }`}
                >
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs text-slate-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
              <span>
                {errors === 0
                  ? '🌟 Flawless understanding! Your memory strength is maximum. Return in 7 days for quick revision.'
                  : errors <= 3
                  ? '👍 Great performance! Strengthening weak nodes in 3 days guarantees long-term retention.'
                  : '💪 Active review recommended! Practicing the reflection & GP formulas in 1 day will solidify understanding.'}
              </span>
              <span className="text-gold-400 font-mono font-bold whitespace-nowrap">
                Next Review: {errors === 0 ? 'Day +7' : errors <= 3 ? 'Day +3' : 'Day +1'}
              </span>
            </div>
          </motion.div>

          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/50 space-y-3">
              <h3 className="text-base font-bold text-rose-300">⚠️ Diagnostic Misconception Review:</h3>
              <p className="text-xs text-slate-400">Review the conceptual pitfalls encountered during the simulation:</p>
              {hitMisconceptions.map((idx) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-rose-900/50 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">✗ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300">🛰️ {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-mono text-gold-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center pt-2">
            <motion.button
              aria-label="Restart Simulation Session"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-8 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-2xl shadow-xl shadow-gold-600/30"
            >
              Restart Simulation Session ↺
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed with Precision!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_MathematicsGeometricProgressionFirstSim;
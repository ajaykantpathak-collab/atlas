'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (STRING LITERALS) ──────────────────��──────────────────────────
const NODE_C12_MATH_081 = 'c12_math_081'; // Forms of plane equation
const NODE_C12_MATH_082 = 'c12_math_082'; // Distance of a point from a plane
const NODE_C12_MATH_083 = 'c12_math_083'; // Angle between lines, planes, line and plane
const NODE_C12_MATH_084 = 'c12_math_084'; // Intersection of line and plane
const NODE_C12_MATH_085 = 'c12_math_085'; // Linear Programming - intro & terminology
const NODE_C12_MATH_086 = 'c12_math_086'; // Linear Programming - mathematical formulation
const NODE_C12_MATH_087 = 'c12_math_087'; // Linear Programming - graphical solution & feasible region
const NODE_C12_MATH_088 = 'c12_math_088'; // Linear Programming - bounded/unbounded & optimal solutions
const NODE_C12_MATH_089 = 'c12_math_089'; // Conditional probability
const NODE_C12_MATH_090 = 'c12_math_090'; // Multiplication theorem & independent events

const ALL_NODE_IDS = [
  NODE_C12_MATH_081,
  NODE_C12_MATH_082,
  NODE_C12_MATH_083,
  NODE_C12_MATH_084,
  NODE_C12_MATH_085,
  NODE_C12_MATH_086,
  NODE_C12_MATH_087,
  NODE_C12_MATH_088,
  NODE_C12_MATH_089,
  NODE_C12_MATH_090,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Mission Flight Path & Resource Optimizer: ISRO Flight Dynamics Lab',
  intro:
    'You are the lead mathematical operations analyst at ISRO Sriharikota. A spacecraft descent vector must intersect the atmospheric landing corridor plane at an exact point and angle. Simultaneously, fuel and payload constraints must be optimized via Linear Programming, and contingency communication sensors depend on conditional probability.',
  context:
    'You will manipulate 3D planes, compute perpendicular clearance distances, evaluate feasible convex regions for fuel payload, and calculate conditional signal probabilities during plasma blackout.',
};

// ─── DISCOVERY QUESTION ───────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question:
    'A radar beam travels along the line r = (i + 2j + 3k) + t(2i + j - k). A satellite solar array plane has normal vector n = (1, -2, 0). Before calculating, what is the geometric relationship between the beam direction and the array normal?',
  options: [
    'They are perpendicular (dot product is 0), meaning the beam is parallel to the plane',
    'They are identical (direction ratios are proportional), so the beam hits head-on',
    'They intersect at a 45 degree angle',
    'The beam must pierce the solar array at t = 2',
  ],
  correctIndex: 0,
  hintAfter:
    'Dot product: (2)(1) + (1)(-2) + (-1)(0) = 2 - 2 + 0 = 0. Perpendicular normal means the line runs parallel to the plane!',
};

// ─── CHALLENGE INTERFACE ──────────────────────────────────────────────────────
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

// ─── 22 CHALLENGES ────────────────────────────────────────────────────────────
const CHALLENGES: Challenge[] = [
  // 1. Plane normal form (Foundation - Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C12_MATH_081,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What are the direction ratios of the normal to the plane 3x - 4y + 12z = 39, and what is its perpendicular distance p from the origin?',
    options: [
      'Normal DRs = (3, -4, 12) and p = 3 units',
      'Normal DRs = (3, -4, 12) and p = 39 units',
      'Normal DRs = (3/13, -4/13, 12/13) and p = 39 units',
      'Normal DRs = (1, 1, 1) and p = 13 units',
    ],
    correctIndex: 0,
    explanation:
      'The coefficients (a, b, c) directly give direction ratios (3, -4, 12). Magnitude = sqrt(3^2 + (-4)^2 + 12^2) = 13. Dividing throughout by 13 yields (3/13)x - (4/13)y + (12/13)z = 3, so p = 3.',
    hints: [
      'Look at the coefficients of x, y, and z in the Cartesian equation.',
      'Compute sqrt(3^2 + (-4)^2 + 12^2) = sqrt(9 + 16 + 144) = 13.',
      'Divide constant 39 by 13 to get the perpendicular distance p = 3.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Intercept Form (Foundation - Understanding)
  {
    id: 'ch_02',
    nodeId: NODE_C12_MATH_081,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Convert the plane equation 2x + 3y - z = 6 into intercept form x/a + y/b + z/c = 1. What are the signed intercepts (a, b, c)?',
    options: [
      'a = 3, b = 2, c = -6',
      'a = 3, b = 2, c = 6',
      'a = 2, b = 3, c = -1',
      'a = 6, b = 6, c = -6',
    ],
    correctIndex: 0,
    explanation:
      'Dividing 2x + 3y - z = 6 by 6 yields x/3 + y/2 + z/(-6) = 1. The signed intercepts on the axes are 3, 2, and -6 respectively.',
    hints: [
      'Divide both sides of 2x + 3y - z = 6 by 6.',
      'Write the third term as + z/(-6) to match the standard form x/a + y/b + z/c = 1.',
      'Remember the negative sign belongs to the intercept c = -6.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Distance of point from plane (Numeric - Application)
  {
    id: 'ch_03',
    nodeId: NODE_C12_MATH_082,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Find the perpendicular distance from the point P(1, 2, 3) to the plane 2x - 3y + 6z + 5 = 0. Round to 2 decimal places.',
    correctAnswer: 2.71,
    tolerance: 0.05,
    unit: 'units',
    explanation:
      'Numerator = |2(1) - 3(2) + 6(3) + 5| = |2 - 6 + 18 + 5| = 19. Denominator = sqrt(2^2 + (-3)^2 + 6^2) = sqrt(49) = 7. Distance = 19/7 = 2.714 units.',
    hints: [
      'Substitute (1, 2, 3) into the expression |2x - 3y + 6z + 5|.',
      'Find the magnitude of normal vector: sqrt(2^2 + (-3)^2 + 6^2) = 7.',
      'Compute 19 / 7 ~= 2.71.',
    ],
  },
  // 4. Drag-label: 3D Geometry Equations (Foundation - Recall)
  {
    id: 'ch_04',
    nodeId: NODE_C12_MATH_081,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag each algebraic standard form to its correct mathematical label for a 3D plane.',
    dragItems: [
      { label: 'lx + my + nz = p', targetId: 'slot_normal' },
      { label: 'x/a + y/b + z/c = 1', targetId: 'slot_intercept' },
      { label: 'a(x-x1) + b(y-y1) + c(z-z1) = 0', targetId: 'slot_onepoint' },
      { label: '(r - a) . n = 0', targetId: 'slot_vector' },
    ],
    correctMapping: {
      slot_normal: 'lx + my + nz = p',
      slot_intercept: 'x/a + y/b + z/c = 1',
      slot_onepoint: 'a(x-x1) + b(y-y1) + c(z-z1) = 0',
      slot_vector: '(r - a) . n = 0',
    },
    explanation:
      'The normal form uses direction cosines (l,m,n) and distance p. Intercept form divides by axis intercepts. One-point form pins through (x1,y1,z1) with normal (a,b,c). Vector form uses dot product with position vector r.',
    hints: [
      'Look for the equation containing p (perpendicular distance from origin).',
      'Intercepts appear in denominators a, b, c.',
      'One-point form contains coordinate differences (x - x1).',
    ],
  },
  // 5. Line and Plane Angle (Standard - Application)
  {
    id: 'ch_05',
    nodeId: NODE_C12_MATH_083,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Find the angle theta between the line with direction ratios (1, 1, 1) and the plane 2x - y + 2z = 3.',
    options: [
      'sin^-1(1/sqrt(3)) (~ 35.26 deg)',
      'cos^-1(1/sqrt(3)) (~ 54.74 deg)',
      'sin^-1(1/3) (~ 19.47 deg)',
      'tan^-1(sqrt(3)) (~ 60.00 deg)',
    ],
    correctIndex: 0,
    explanation:
      'For a line with DRs (l,m,n) and plane normal (a,b,c), sin(theta) = |al + bm + cn| / (sqrt(a^2+b^2+c^2)*sqrt(l^2+m^2+n^2)) = |2(1) - 1(1) + 2(1)| / (sqrt(9)*sqrt(3)) = 3/(3*sqrt(3)) = 1/sqrt(3).',
    hints: [
      'Angle between line and plane uses SINE formula because normal is perpendicular to plane.',
      'Numerator: |2(1) + (-1)(1) + 2(1)| = 3.',
      'Denominator: sqrt(4+1+4) * sqrt(1+1+1) = 3 * sqrt(3).',
    ],
    misconceptionIndex: 1,
  },
  // 6. Intersection of line and plane (Numeric - Application)
  {
    id: 'ch_06',
    nodeId: NODE_C12_MATH_084,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'The rocket trajectory line is x = 1 + 2t, y = 2 + t, z = 3 - t. It penetrates the atmospheric boundary plane x - y + 2z = 5. Find the parameter value t at the intersection.',
    correctAnswer: 0,
    tolerance: 0.01,
    unit: 't',
    explanation:
      'Substitute: (1 + 2t) - (2 + t) + 2(3 - t) = 5 => 1 + 2t - 2 - t + 6 - 2t = 5 => 5 - t = 5 => t = 0. The intersection point is (1, 2, 3).',
    hints: [
      'Substitute x = 1 + 2t, y = 2 + t, z = 3 - t into x - y + 2z = 5.',
      'Expand: (1 - 2 + 6) + (2t - t - 2t) = 5.',
      '5 - t = 5, hence t = 0.',
    ],
  },
  // 7. Drag-sort: Steps to solve LPP Graphically (Foundation - Understanding)
  {
    id: 'ch_07',
    nodeId: NODE_C12_MATH_087,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Arrange the systematic steps for graphical solution of a 2-variable Linear Programming Problem.',
    sortItems: [
      'Formulate decision variables, objective Z = ax + by, and constraints',
      'Plot constraint boundary lines and test origin (0,0) to shade half-planes',
      'Identify the common feasible region (bounded or unbounded)',
      'Determine all corner points (vertices) by solving boundary lines simultaneously',
      'Evaluate Z at all vertices to find maximum or minimum',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'First formulate the LPP, then plot lines and half-planes, locate the feasible region intersection, calculate the corner vertices, and finally evaluate the objective function Z.',
    hints: [
      'Formulation must always come first before graphing.',
      'Plotting half-planes leads to finding the feasible region.',
      'Evaluating Z at vertices is the final optimization step.',
    ],
  },
  // 8. LPP Terminology & Formulation (Foundation - Recall)
  {
    id: 'ch_08',
    nodeId: NODE_C12_MATH_085,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'In an LPP, what is the mathematical term for the system of linear inequalities like 2x + y <= 100 and x + 2y <= 80 that restrict available resources?',
    options: ['Constraints', 'Objective function', 'Decision variables', 'Slack parameters'],
    correctIndex: 0,
    explanation:
      'Constraints are the linear inequalities that limit decision variables due to resource, labour, or capacity restrictions.',
    hints: [
      'They constrain or limit what values x and y can take.',
      'The objective function is what you maximize/minimize (e.g. Profit Z).',
      'These inequalities are called constraints.',
    ],
  },
  // 9. LPP Mathematical Formulation (Standard - Application)
  {
    id: 'ch_09',
    nodeId: NODE_C12_MATH_086,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A Jodhpur furniture shop makes tables (x) and chairs (y). Profit: Rs 500/table, Rs 300/chair. Wood limit: 2x + y <= 100. Labour limit: x + 2y <= 80. What is the complete standard formulation?',
    options: [
      'Maximise Z = 500x + 300y subject to 2x + y <= 100, x + 2y <= 80, x >= 0, y >= 0',
      'Minimise Z = 500x + 300y subject to 2x + y >= 100, x + 2y >= 80',
      'Maximise Z = 2x + y subject to 500x + 300y <= 100, x >= 0',
      'Maximise Z = 500x + 300y subject to 2x + y < 100, x + 2y < 80',
    ],
    correctIndex: 0,
    explanation:
      'Decision variables: x, y. Objective: Maximise Z = 500x + 300y. Resource limits give <= constraints. Non-negativity x >= 0, y >= 0 is mandatory.',
    hints: [
      'Profit is to be maximised, so Z = 500x + 300y.',
      'Limited wood and labour give less-than-or-equal (<=) inequalities.',
      'Always include non-negativity restrictions x >= 0, y >= 0.',
    ],
    misconceptionIndex: 3,
  },
  // 10. LPP Corner Point Optimization (Numeric - Application)
  {
    id: 'ch_10',
    nodeId: NODE_C12_MATH_088,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Maximize Z = 3x + 4y over the feasible region with vertices (0,0), (4,0), (3,1), and (0,2). What is the maximum value of Z?',
    correctAnswer: 13,
    tolerance: 0.1,
    unit: 'rupees/units',
    explanation:
      'Evaluate Z at each corner: Z(0,0)=0; Z(4,0)=3(4)+0=12; Z(3,1)=3(3)+4(1)=9+4=13; Z(0,2)=3(0)+4(2)=8. The maximum is 13 at (3, 1).',
    hints: [
      'Evaluate Z = 3x + 4y at each of the four given corner points.',
      'For (4,0): 3(4) + 4(0) = 12.',
      'For (3,1): 3(3) + 4(1) = 13, which is the highest value.',
    ],
  },
  // 11. Multiple Optimal Solutions (Advanced - Analysis)
  {
    id: 'ch_11',
    nodeId: NODE_C12_MATH_088,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'In an ISC board problem, Z = px + qy achieves its maximum at BOTH vertices (0, 60) and (10, 50). What is the relationship between p and q, and how many optimal solutions exist?',
    options: [
      'p = q; there are infinitely many optimal solutions along the line segment joining (0,60) and (10,50)',
      'p = 2q; there is exactly 1 optimal solution at the midpoint',
      'p = -q; the problem is infeasible',
      'p = 0; there is no optimal solution',
    ],
    correctIndex: 0,
    explanation:
      'Equating values: p(0) + q(60) = p(10) + q(50) => 60q = 10p + 50q => 10q = 10p => p = q. When the objective function is parallel to a boundary edge, every point along that edge gives the maximum value.',
    hints: [
      'Set Z(0, 60) = Z(10, 50) and solve for p in terms of q.',
      '60q = 10p + 50q simplifies to 10p = 10q.',
      'When two adjacent corners give the same maximum, all points on the segment between them are optimal.',
    ],
  },
  // 12. Unbounded Feasible Region Evaluation (Advanced - Evaluation)
  {
    id: 'ch_12',
    nodeId: NODE_C12_MATH_088,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A student minimizes Z = 2x + 3y over the unbounded region x + y >= 5, x >= 0, y >= 0 and declares: "Because the region is unbounded, no optimal solution exists." Evaluate this statement.',
    options: [
      'Incorrect: Minimum Z = 10 exists at (5, 0) because the open half-plane 2x + 3y < 10 does not intersect the feasible region',
      'Correct: Unbounded regions can NEVER have minimum or maximum values',
      'Incorrect: The maximum is 10, but the minimum is infinite',
      'Correct: The corner point method fails completely for unbounded regions',
    ],
    correctIndex: 0,
    explanation:
      'Corner points are (5,0) with Z=10 and (0,5) with Z=15. The line 2x + 3y = 10 has the half-plane 2x + 3y < 10 strictly outside the feasible region, so min Z = 10 is genuine. (Only maximum Z is unbounded).',
    hints: [
      'Test corner points (5,0) and (0,5): Z values are 10 and 15.',
      'Check if values smaller than 10 are feasible: does 2x + 3y < 10 touch x + y >= 5 in Q1?',
      'No point in the feasible region has Z < 10, so a minimum exists even though the region is unbounded.',
    ],
  },
  // 13. Conditional Probability - Die Roll (Foundation - Understanding)
  {
    id: 'ch_13',
    nodeId: NODE_C12_MATH_089,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'A fair 6-sided die is rolled. Event B is "the number is greater than 3" {4,5,6}. Event A is "the number is even" {2,4,6}. What is P(A|B)? (Express as a decimal rounded to 2 places, e.g. 0.67)',
    correctAnswer: 0.67,
    tolerance: 0.02,
    unit: 'prob',
    explanation:
      'Reduced sample space B = {4, 5, 6} (3 outcomes). Favourable even outcomes in B = {4, 6} (2 outcomes). P(A|B) = 2/3 ~= 0.67.',
    hints: [
      'The universe shrinks to outcomes greater than 3: {4, 5, 6}.',
      'Among {4, 5, 6}, how many are even numbers? {4, 6} = 2 outcomes.',
      'Divide favourable by total in reduced space: 2 / 3 ~= 0.67.',
    ],
  },
  // 14. Cards without replacement (Standard - Application)
  {
    id: 'ch_14',
    nodeId: NODE_C12_MATH_089,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Two cards are drawn successively without replacement from a standard 52-card deck. Given the first card is a King, what is the probability the second card is also a King, and are these events independent?',
    options: [
      'P = 3/51 (1/17); the events are dependent',
      'P = 4/52 (1/13); the events are independent',
      'P = 4/51; the events are independent',
      'P = 3/52; the events are mutually exclusive',
    ],
    correctIndex: 0,
    explanation:
      'Without replacement, 1 King and 1 card are gone. Reduced deck = 51 cards with 3 Kings. P(K2|K1) = 3/51 = 1/17 ~= 0.0588. Since P(K2|K1) != P(K2)=1/13, the events are dependent.',
    hints: [
      'After removing one King, count the remaining Kings (3) and total cards (51).',
      'Conditional probability is 3/51 = 1/17.',
      'Because the probability changed from 4/52 to 3/51, the draws are dependent.',
    ],
    misconceptionIndex: 4,
  },
  // 15. ISC Specimen Ticket Problem (Advanced - Analysis)
  {
    id: 'ch_15',
    nodeId: NODE_C12_MATH_089,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      '50 tickets numbered 00 to 49 are in a box. One ticket is drawn. Given that the sum of its digits is 8, find the probability that the product of its digits is 7. (Express as decimal, e.g. 0.20)',
    correctAnswer: 0.2,
    tolerance: 0.02,
    unit: 'prob',
    explanation:
      'Tickets in range 00-49 with digit sum = 8: {08, 17, 26, 35, 44} (5 tickets). Products: 0*8=0, 1*7=7, 2*6=12, 3*5=15, 4*4=16. Only "17" has product 7. P = 1/5 = 0.20.',
    hints: [
      'List all tickets between 00 and 49 whose digits sum to 8: 08, 17, 26, 35, 44.',
      'There are exactly 5 tickets in this reduced sample space.',
      'Only the ticket 17 has digit product 1 * 7 = 7. Probability = 1/5 = 0.2.',
    ],
  },
  // 16. Multiplication Theorem (Foundation - Recall)
  {
    id: 'ch_16',
    nodeId: NODE_C12_MATH_090,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'If P(A) = 0.4 and P(B|A) = 0.5, what is the joint probability P(A ∩ B) according to the multiplication theorem?',
    options: ['0.20', '0.90', '0.10', '0.80'],
    correctIndex: 0,
    explanation:
      'By the multiplication theorem: P(A ∩ B) = P(A) * P(B|A) = 0.4 * 0.5 = 0.20.',
    hints: [
      'Formula: P(A ∩ B) = P(A) * P(B|A).',
      'Multiply 0.4 by 0.5.',
      '0.4 * 0.5 = 0.20.',
    ],
  },
  // 17. Independent vs Mutually Exclusive (Standard - Evaluation)
  {
    id: 'ch_17',
    nodeId: NODE_C12_MATH_090,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'A student says: "If two non-impossible events A and B are mutually exclusive, they must be independent." Is this correct?',
    options: [
      'Incorrect: Mutually exclusive means P(A ∩ B) = 0, so if A occurs B cannot, making them strongly dependent (P(B|A) = 0 != P(B))',
      'Correct: Disjoint events have no influence on each other',
      'Correct: Independence is defined as P(A ∪ B) = 0',
      'Incorrect: Mutually exclusive events only exist in 3D geometry',
    ],
    correctIndex: 0,
    explanation:
      'Mutually exclusive events cannot happen together (P(A ∩ B) = 0). Since P(A)*P(B) > 0, P(A ∩ B) != P(A)*P(B), so they are never independent.',
    hints: [
      'Mutual exclusivity means P(A ∩ B) = 0.',
      'Independence requires P(A ∩ B) = P(A) * P(B) > 0.',
      'If A happens, B is impossible: that is maximum dependence!',
    ],
    misconceptionIndex: 4,
  },
  // 18. Independent Events Product Test (Numeric - Application)
  {
    id: 'ch_18',
    nodeId: NODE_C12_MATH_090,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Events A and B are independent with P(A) = 0.3 and P(B) = 0.6. Calculate P(A ∩ B).',
    correctAnswer: 0.18,
    tolerance: 0.01,
    unit: 'prob',
    explanation:
      'For independent events, P(A ∩ B) = P(A) * P(B) = 0.3 * 0.6 = 0.18.',
    hints: [
      'Use the independence product rule: P(A ∩ B) = P(A) * P(B).',
      'Multiply 0.3 by 0.6.',
      '0.3 * 0.6 = 0.18.',
    ],
  },
  // 19. Construct Plane from Point and Normal (Standard - Construct)
  {
    id: 'ch_19',
    nodeId: NODE_C12_MATH_081,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Construct the Cartesian equation of the plane passing through point (1, 0, 2) with normal vector (1, 2, -1).',
    availableParts: ['x', '+ 2y', '- z', '+ 1 = 0', '- 1 = 0', '+ 3 = 0'],
    targetState: 'x + 2y - z + 1 = 0',
    validationHint:
      'Use one-point formula: 1(x - 1) + 2(y - 0) - 1(z - 2) = 0 => x - 1 + 2y - z + 2 = 0 => x + 2y - z + 1 = 0.',
    explanation:
      'Using a(x-x1) + b(y-y1) + c(z-z1) = 0: 1(x-1) + 2(y-0) - 1(z-2) = 0 expands to x + 2y - z + 1 = 0.',
    hints: [
      'Substitute a=1, b=2, c=-1 and point (1, 0, 2).',
      'Expand: (x - 1) + 2y - (z - 2) = 0.',
      'Combine constants: -1 + 2 = +1, giving x + 2y - z + 1 = 0.',
    ],
  },
  // 20. Line Parallel to Plane Condition (Advanced - Analysis)
  {
    id: 'ch_20',
    nodeId: NODE_C12_MATH_083,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Under what exact algebraic conditions is the line (x - x1)/l = (y - y1)/m = (z - z1)/n completely contained inside the plane ax + by + cz + d = 0?',
    options: [
      'al + bm + cn = 0 AND ax1 + by1 + cz1 + d = 0',
      'al + bm + cn != 0 AND ax1 + by1 + cz1 + d = 0',
      'a/l = b/m = c/n',
      'al + bm + cn = 0 AND ax1 + by1 + cz1 + d != 0',
    ],
    correctIndex: 0,
    explanation:
      'al + bm + cn = 0 ensures the line direction is perpendicular to the normal (line parallel to plane). ax1 + by1 + cz1 + d = 0 ensures its base point lies on the plane, meaning the entire line lies in the plane.',
    hints: [
      'The line must be parallel to the plane (dot product with normal is 0).',
      'The base point of the line must also satisfy the plane equation.',
      'Both al + bm + cn = 0 and ax1 + by1 + cz1 + d = 0 must hold.',
    ],
  },
  // 21. Real-World Urn Contingency (Standard - Application)
  {
    id: 'ch_21',
    nodeId: NODE_C12_MATH_090,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'An urn contains 5 red and 3 black balls. Two balls are drawn without replacement. What is the probability that both balls are red? (Express as decimal rounded to 3 places)',
    correctAnswer: 0.357,
    tolerance: 0.01,
    unit: 'prob',
    explanation:
      'P(R1) = 5/8. P(R2|R1) = 4/7. P(R1 ∩ R2) = (5/8) * (4/7) = 20/56 = 5/14 ~= 0.3571.',
    hints: [
      'First draw probability: 5 red out of 8 total = 5/8.',
      'Second draw without replacement: 4 red out of 7 total = 4/7.',
      'Multiply (5/8) * (4/7) = 20/56 = 5/14 ~= 0.357.',
    ],
  },
  // 22. Creative LPP Diet Optimization (Advanced - Creativity)
  {
    id: 'ch_22',
    nodeId: NODE_C12_MATH_086,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'A hospital nutritionist in Delhi mixes Food A (x kg, Rs 40/kg, 1600 kcal) and Food B (y kg, Rs 120/kg, 600 kcal, 250g protein) to meet >= 2000 kcal and >= 100g protein at minimum cost. Why do the constraints have ">=" signs while manufacturing constraints have "<="?',
    options: [
      'Diet requirements represent minimum floors to satisfy (>=), whereas manufacturing resources represent maximum supply ceilings (<=)',
      'Diet problems always use negative profit',
      'The inequality signs are arbitrary and can be swapped without changing the result',
      '">= " is only used when protein is involved',
    ],
    correctIndex: 0,
    explanation:
      'Diet and nutrition problems require achieving AT LEAST a specified threshold of calories/nutrients (minimum floor => >=), whereas factory machines or raw materials have AT MOST a fixed available capacity (supply ceiling => <=).',
    hints: [
      'Think about what "at least 2000 kcal" means: you can eat 2000 or more.',
      'Think about factory capacity: you cannot exceed the machine hours available.',
      'Floor constraints use >=; ceiling constraints use <=.',
    ],
  },
];

// ─── PROPS INTERFACE ──────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ────────────────────���──────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_MATH_081,
  title: '3D Geometry, Linear Programming & Probability Lab',
  definition:
    'Covers 3D Geometry (plane forms, point-to-plane distance, line-plane angles and intersections), Linear Programming (formulation, feasible regions, bounded/unbounded corner optimization), and Probability (conditional probability, reduced sample space, multiplication theorem, independent vs mutually exclusive events).',
  eli5:
    'Think of 3D planes like flat sheets floating in a room tilted by an arrow (normal vector). Think of LPP like finding the best corner shop on a fenced market lot. Think of conditional probability like zooming into only the clue that already happened!',
  misconceptions: [
    {
      misconception:
        'Normal form distance p can be calculated without dividing the left side of the equation by |n|.',
      correction:
        'You must divide EVERY term by sqrt(a^2 + b^2 + c^2). Only then is the constant term equal to perpendicular distance p and the coefficients equal to direction cosines.',
    },
    {
      misconception: 'The angle between a line and a plane uses cos(theta).',
      correction:
        'The line-plane angle uses sin(theta) because the normal vector is perpendicular to the plane (sin theta = cos(90 - theta)).',
    },
    {
      misconception:
        'In intercept form x/3 + y/2 - z/6 = 1, the z-axis intercept is positive 6.',
      correction:
        'The intercept is the signed denominator c = -6. The minus sign carries essential geometric meaning (cuts negative z-axis).',
    },
    {
      misconception: 'Non-negativity restrictions x >= 0, y >= 0 in LPP are optional.',
      correction:
        'x >= 0 and y >= 0 are mandatory. Without them, feasible regions extend indefinitely into negative quadrants and solutions become invalid.',
    },
    {
      misconception: 'Mutually exclusive events are independent.',
      correction:
        'Mutually exclusive events cannot occur together (P(A ∩ B) = 0). They are strongly dependent because the occurrence of one completely prevents the other.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the perpendicular distance from origin to 3x - 4y + 12z = 39?',
      options: ['3 units', '39 units', '13 units', '1 unit'],
      correctIndex: 0,
    },
    {
      question: 'What is the z-intercept of 2x + 3y - z = 6?',
      options: ['-6', '6', '-1', '3'],
      correctIndex: 0,
    },
    {
      question: 'The distance of P(x1,y1,z1) from ax + by + cz + d = 0 uses which denominator?',
      options: ['sqrt(a^2 + b^2 + c^2)', 'a + b + c', 'sqrt(x1^2 + y1^2 + z1^2)', 'd'],
      correctIndex: 0,
    },
    {
      question: 'When is a line with DRs (l,m,n) parallel to plane with normal (a,b,c)?',
      options: ['al + bm + cn = 0', 'a/l = b/m = c/n', 'al + bm + cn = 1', 'l + m + n = 0'],
      correctIndex: 0,
    },
    {
      question: 'In an LPP, where does the optimal value always occur on a bounded polygon?',
      options: ['At a corner vertex', 'In the exact center', 'Along any curve', 'At the origin only'],
      correctIndex: 0,
    },
    {
      question: 'If P(A) = 0.4, P(B) = 0.5, and A, B are independent, what is P(A ∩ B)?',
      options: ['0.20', '0.90', '0.10', '0.00'],
      correctIndex: 0,
    },
    {
      question: 'If events A and B are mutually exclusive with P(A)>0 and P(B)>0, are they independent?',
      options: ['No, they are dependent', 'Yes, always', 'Only if P(A)=P(B)', 'Only in 3D'],
      correctIndex: 0,
    },
    {
      question: 'If two cards are drawn without replacement, does P(second is King) depend on the first?',
      options: ['Yes, sample space shrinks to 51', 'No, probability is always 4/52', 'Only if the first was an Ace', 'No'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Student demonstrates complete mastery of ISC Class 12 3D Plane equations, perpendicular distances, line-plane angles, LPP corner point optimization, and conditional probability calculations.',
};

// ─── EXPLORATION STEPS ────────────────────────────��───────────────────────────
const EXPLORATION_STEPS = [
  {
    title: '3D Plane Normal Vector & Distance p',
    instruction:
      'Adjust the normal vector components (a, b, c) and plane offset (d) to see how the plane tilts and shifts in 3D space relative to the origin.',
    interactionType: 'slider-plane',
    nodeId: NODE_C12_MATH_081,
  },
  {
    title: 'Perpendicular Distance from Point to Plane',
    instruction:
      'Drag the probe point P in 3D space to watch the perpendicular drop line and real-time distance calculation update dynamically.',
    interactionType: 'point-distance',
    nodeId: NODE_C12_MATH_082,
  },
  {
    title: 'Line Piercing Plane & Angle theta',
    instruction:
      'Rotate the flight vector line to observe the piercing intersection point and the acute angle theta = sin^-1(|al+bm+cn|/(|n||v|)).',
    interactionType: 'line-plane-angle',
    nodeId: NODE_C12_MATH_083,
  },
  {
    title: 'LPP Feasible Region & Corner Point Method',
    instruction:
      'Adjust the resource constraints (Wood and Labour). Watch the feasible polygon reshape and see the objective profit Z evaluated at each vertex.',
    interactionType: 'lpp-polygon',
    nodeId: NODE_C12_MATH_087,
  },
  {
    title: 'Conditional Probability & Sample Space Shrinkage',
    instruction:
      'Select conditioning event B to watch the universe collapse from sample space S to B, revealing the exact conditional ratio P(A|B).',
    interactionType: 'prob-venn',
    nodeId: NODE_C12_MATH_089,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ─────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If you double the distance constant d of the plane 2x - 3y + 6z + d = 0, what happens to the perpendicular distance from the origin?',
    options: [
      'It exactly doubles',
      'It quadruples (increases by 4x)',
      'It stays constant because the normal is unchanged',
      'It becomes 0',
    ],
    correctIndex: 0,
    verifyInstruction:
      'Use the plane slider to double d from 7 to 14. Observe the distance gauge scale from 1.0 to 2.0 units.',
    nodeId: NODE_C12_MATH_082,
  },
  {
    question:
      'Predict: In an LPP, if the objective function line Z = 50x + 50y has the exact same slope as the constraint edge x + y = 50, where will the maximum occur?',
    options: [
      'At both bounding vertices AND every single point along the edge joining them',
      'Only at (0, 50)',
      'Only at the origin (0,0)',
      'No maximum can ever exist',
    ],
    correctIndex: 0,
    verifyInstruction:
      'In the LPP lab, match the objective slope to the constraint boundary and check the vertex readout.',
    nodeId: NODE_C12_MATH_088,
  },
];

// ─── OBSERVATION QUESTIONS ────────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What do you notice about the perpendicular distance formula denominator sqrt(a^2 + b^2 + c^2)?',
    observableOptions: [
      'It is simply the magnitude (length) of the plane normal vector n = (a, b, c)',
      'It depends on the coordinates of the test point P',
      'It is always equal to 1 regardless of equation coefficients',
      'It changes when the constant term d changes',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_082,
  },
  {
    question:
      'In the conditional probability Venn diagram, what happens to the denominator when we condition on event B?',
    observableOptions: [
      'The denominator changes from total sample space N(S) to the size of event N(B)',
      'The denominator always becomes 0',
      'The denominator doubles',
      'The denominator stays fixed at 52',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_089,
  },
];

// ─── REAL WORLD ACTIVITY ──────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Trajectory & Launch Resource Director',
  description:
    'Design an integrated telemetry model for a PSLV payload launch. Compute the orbital plane equation, verify safe ground radar clearance, maximize satellite transponder mix using LPP constraints, and calculate redundant sensor survival probability.',
  steps: [
    'Define the 3D orbital insertion plane using normal unit vector components.',
    'Calculate the minimum clearance distance from ground mountain telemetry stations.',
    'Formulate an LPP for heavy vs light satellite transponders subject to payload weight and power caps.',
    'Compute conditional telemetry uplink reliability during thermal ionization entry.',
  ],
};

function C12_MathematicsGeometryFormsPlaneSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_MATH_081,
  title = DEFAULT_PROPS.title || '3D Geometry, Linear Programming & Probability Lab',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || {
    name: 'Mathematics',
    emoji: '📐',
    color: 'indigo',
  };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 3D Plane interactive state
  const [planeA, setPlaneA] = useState(2);
  const [planeB, setPlaneB] = useState(-3);
  const [planeC, setPlaneC] = useState(6);
  const [planeD, setPlaneD] = useState(14);
  const [pointX, setPointX] = useState(1);
  const [pointY, setPointY] = useState(2);
  const [pointZ, setPointZ] = useState(3);

  // Line 3D interactive state
  const [lineL, setLineL] = useState(1);
  const [lineM, setLineM] = useState(1);
  const [lineN, setLineN] = useState(1);

  // LPP interactive state
  const [woodLimit, setWoodLimit] = useState(100);
  const [labourLimit, setLabourLimit] = useState(80);
  const [profitX, setProfitX] = useState(500);
  const [profitY, setProfitY] = useState(300);

  // Probability interactive state
  const [probA, setProbA] = useState(0.6);
  const [probB, setProbB] = useState(0.5);
  const [probAandB, setProbAandB] = useState(0.3);
  const [selectedConditionEvent, setSelectedConditionEvent] = useState<'none' | 'B' | 'A'>('none');

  // Brilliant-style interaction state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Reflection questions state
  const [reflections, setReflections] = useState({
    surprising: '',
    friend: '',
    realLife: '',
  });

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Challenge input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback effects
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconceptions tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT persistence ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED 3D GEOMETRY CALCULATIONS ───────────────────────────────────────
  const planeNormalMag = useMemo(() => {
    return Math.sqrt(planeA * planeA + planeB * planeB + planeC * planeC) || 1;
  }, [planeA, planeB, planeC]);

  const originDistance = useMemo(() => {
    return Math.abs(planeD) / planeNormalMag;
  }, [planeD, planeNormalMag]);

  const pointDistance = useMemo(() => {
    const num = Math.abs(planeA * pointX + planeB * pointY + planeC * pointZ - planeD);
    return num / planeNormalMag;
  }, [planeA, planeB, planeC, planeD, pointX, pointY, pointZ, planeNormalMag]);

  const linePlaneAngleDeg = useMemo(() => {
    const num = Math.abs(planeA * lineL + planeB * lineM + planeC * lineN);
    const den = planeNormalMag * Math.sqrt(lineL * lineL + lineM * lineM + lineN * lineN);
    const sinTheta = Math.min(1, num / (den || 1));
    return (Math.asin(sinTheta) * 180) / Math.PI;
  }, [planeA, planeB, planeC, lineL, lineM, lineN, planeNormalMag]);

  // ─── DERIVED LPP CALCULATIONS ───────────────────────────────────────────────
  const lppVertices = useMemo(() => {
    const v0 = { x: 0, y: 0, label: 'O(0,0)' };
    const v1 = { x: woodLimit / 2, y: 0, label: `A(${woodLimit / 2}, 0)` };
    const v2 = { x: 0, y: labourLimit / 2, label: `B(0, ${labourLimit / 2})` };

    const interX = Math.max(0, (2 * woodLimit - labourLimit) / 3);
    const interY = Math.max(0, (2 * labourLimit - woodLimit) / 3);
    const v3 = { x: interX, y: interY, label: `C(${interX.toFixed(1)}, ${interY.toFixed(1)})` };

    const vertices = [v0, v1, v3, v2];
    const evaluated = vertices.map((v) => ({
      ...v,
      zVal: profitX * v.x + profitY * v.y,
    }));
    const maxVal = Math.max(...evaluated.map((e) => e.zVal));
    const optVertex = evaluated.find((e) => e.zVal === maxVal) || evaluated[0];

    return { evaluated, maxVal, optVertex };
  }, [woodLimit, labourLimit, profitX, profitY]);

  // ─── ADAPTIVE DIFFICULTY: FILTER CHALLENGES ─────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY INITIALIZATION ──────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
    speechManager.speak('Welcome to the ISRO Space Geometry, Optimization, and Probability Lab.');
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ──────────────────────────────────────────────
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

  // ─── CANVAS 2D ANIMATION EFFECT ─────────────────────────────────────────────
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

      ctx.strokeStyle = 'rgba(79, 70, 229, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 30) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(30, 20, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(
        `ISRO Active Telemetry | Frame: ${frame % 1000} | Mastery: ${masteryLevel.toUpperCase()}`,
        45,
        24
      );

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [masteryLevel]);

  // ─── HANDLERS ───────────────────────────────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent physical intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore 3D planes, optimization polygons, and sample spaces.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore the unified mathematical sandbox freely with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the rigorous ISC board and JEE challenge set.');
  }, []);

  const handlePlaneAChange = useCallback((v: number) => {
    setPlaneA(v);
    audioManager.play('count');
  }, []);

  const handlePlaneBChange = useCallback((v: number) => {
    setPlaneB(v);
    audioManager.play('count');
  }, []);

  const handlePlaneCChange = useCallback((v: number) => {
    setPlaneC(v);
    audioManager.play('count');
  }, []);

  const handlePlaneDChange = useCallback((v: number) => {
    setPlaneD(v);
    audioManager.play('count');
  }, []);

  const handlePointXChange = useCallback((v: number) => {
    setPointX(v);
    audioManager.play('tap');
  }, []);

  const handlePointYChange = useCallback((v: number) => {
    setPointY(v);
    audioManager.play('tap');
  }, []);

  const handlePointZChange = useCallback((v: number) => {
    setPointZ(v);
    audioManager.play('tap');
  }, []);

  const handleWoodLimitChange = useCallback((v: number) => {
    setWoodLimit(v);
    audioManager.play('balance');
  }, []);

  const handleLabourLimitChange = useCallback((v: number) => {
    setLabourLimit(v);
    audioManager.play('balance');
  }, []);

  const handleConditionSelect = useCallback((evt: 'none' | 'B' | 'A') => {
    setSelectedConditionEvent(evt);
    audioManager.play('tap');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    const isRight = idx === PREDICTION_QUESTIONS[0].correctIndex;
    audioManager.play('tap');
    speechManager.speak(
      isRight
        ? 'Great prediction! Now verify with the sliders.'
        : 'Good hypothesis. Let us check the visual response!'
    );
  }, []);

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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mission optimization complete! Outstanding analytical performance.');
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
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const base =
          prev.length === challenge.sortItems?.length
            ? [...prev]
            : challenge.sortItems?.map((_, i) => i) || [];
        const [moved] = base.splice(fromIndex, 1);
        base.splice(toIndex, 0, moved);
        return base;
      });
    },
    [challenge]
  );

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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Rigorous proof established.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, 'true');
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
          challenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(challenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step mathematical deduction.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 3500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // ─── CLEANUP TIMER ON UNMOUNT ─────────────────────────────────────────���────
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">
              ISC Class 12 Mathematics | ISRO Mission Flight Dynamics Lab
            </p>
          </div>
        </div>

        {/* Dynamic difficulty badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Adaptive Tier:</span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-300 border border-rose-700'
                : 'bg-sky-950 text-sky-300 border border-sky-700'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </motion.div>

      {/* Telemetry canvas HUD */}
      <div className="mb-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60">
        <canvas ref={canvasRef} width={640} height={36} className="w-full block" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-6"
        >
          <div className="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-200/70 mt-2 font-mono">{SCENARIO.context}</p>
          </div>

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Curiosity Discovery Hook (Ungraded)
            </p>
            <p className="text-base text-white font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${idx + 1}: ${opt}`}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80 hover:border-indigo-500'
                  }`}
                >
                  <span className="inline-block w-6 text-slate-400 font-mono">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p
                    className={
                      discoveryCorrect
                        ? 'text-emerald-400 font-semibold'
                        : 'text-amber-400 font-semibold'
                    }
                  >
                    {discoveryCorrect
                      ? '✓ Spot on! al + bm + cn = 0 reveals line-plane parallelism.'
                      : '✗ Excellent try! Dot product vanishes, so the line runs parallel to the plane.'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Guided Lab"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white text-sm font-bold rounded-xl shadow-lg whitespace-nowrap"
                >
                  Enter Guided Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ───────── */}
      {phase === 'explore' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Top navigation tabs for 5 steps */}
          <div className="grid grid-cols-5 gap-2 pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                aria-label={`Lab Step ${idx + 1}: ${step.title}`}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-900/60 border-indigo-400 text-indigo-200 font-bold shadow-md'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] uppercase font-mono tracking-wider opacity-70">
                  Step {idx + 1}
                </div>
                <div className="text-xs truncate">{step.title}</div>
              </motion.button>
            ))}
          </div>

          {/* Current Step Canvas */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                  Interactive Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300/90 mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── SLIDE 0: 3D Plane Equation Forms ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 420 280" className="w-full h-auto">
                      <line x1="210" y1="140" x2="380" y2="140" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="210" y1="140" x2="210" y2="20" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="210" y1="140" x2="80" y2="240" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="385" y="145" fill="#94a3b8" fontSize="10">Y</text>
                      <text x="215" y="25" fill="#94a3b8" fontSize="10">Z</text>
                      <text x="70" y="245" fill="#94a3b8" fontSize="10">X</text>

                      <motion.polygon
                        points={`${140 + planeA * 10},${80 - planeB * 8} ${280 + planeA * 10},${100 - planeB * 8} ${310 - planeA * 6},${210 + planeC * 6} ${110 - planeA * 6},${190 + planeC * 6}`}
                        fill="rgba(99, 102, 241, 0.25)"
                        stroke="#6366f1"
                        strokeWidth="2"
                        animate={{ opacity: [0.7, 0.9, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      <line
                        x1="210"
                        y1="140"
                        x2={210 + planeA * 15}
                        y2={140 - planeB * 12 - planeC * 8}
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      <circle cx={210 + planeA * 15} cy={140 - planeB * 12 - planeC * 8} r="4" fill="#10b981" />
                      <text
                        x={220 + planeA * 15}
                        y={135 - planeB * 12 - planeC * 8}
                        fill="#34d399"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        n = ({planeA}, {planeB}, {planeC})
                      </text>

                      <line x1="210" y1="140" x2={210 + (planeA * planeD) / 3} y2={140 - (planeC * planeD) / 4} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                      <text x="220" y="160" fill="#fbbf24" fontSize="10">
                        p = {originDistance.toFixed(2)} u
                      </text>
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Normal DR a:</span>
                        <span className="font-mono text-indigo-400 font-bold">{planeA}</span>
                      </div>
                      <input
                        type="range"
                        min={-5}
                        max={5}
                        value={planeA}
                        onChange={(e) => handlePlaneAChange(Number(e.target.value))}
                        aria-label="Plane normal component a"
                        className="w-full accent-indigo-500"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Normal DR b:</span>
                        <span className="font-mono text-indigo-400 font-bold">{planeB}</span>
                      </div>
                      <input
                        type="range"
                        min={-5}
                        max={5}
                        value={planeB}
                        onChange={(e) => handlePlaneBChange(Number(e.target.value))}
                        aria-label="Plane normal component b"
                        className="w-full accent-indigo-500"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Normal DR c:</span>
                        <span className="font-mono text-indigo-400 font-bold">{planeC}</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={8}
                        value={planeC}
                        onChange={(e) => handlePlaneCChange(Number(e.target.value))}
                        aria-label="Plane normal component c"
                        className="w-full accent-indigo-500"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Constant d (Offset):</span>
                        <span className="font-mono text-amber-400 font-bold">{planeD}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={30}
                        value={planeD}
                        onChange={(e) => handlePlaneDChange(Number(e.target.value))}
                        aria-label="Plane constant d"
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="p-3.5 bg-indigo-950/40 rounded-xl border border-indigo-800/50 space-y-1 text-xs">
                      <p className="font-bold text-indigo-300">Mathematical Representations:</p>
                      <p className="font-mono text-slate-200">
                        Cartesian: {planeA}x + ({planeB})y + {planeC}z = {planeD}
                      </p>
                      <p className="font-mono text-emerald-300">
                        Normal Form: ({(planeA / planeNormalMag).toFixed(2)})x + (
                        {(planeB / planeNormalMag).toFixed(2)})y + (
                        {(planeC / planeNormalMag).toFixed(2)})z = {originDistance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: Distance of Point from Plane ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 420 280" className="w-full h-auto">
                      <polygon points="60,180 240,180 360,100 180,100" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2" />
                      <text x="190" y="160" fill="#38bdf8" fontSize="11" fontWeight="bold">
                        Plane: {planeA}x + ({planeB})y + {planeC}z - {planeD} = 0
                      </text>

                      <circle cx={140 + pointX * 25} cy={90 - pointZ * 15 + pointY * 10} r="7" fill="#ec4899" />
                      <text x={152 + pointX * 25} y={85 - pointZ * 15 + pointY * 10} fill="#f472b6" fontSize="11" fontWeight="bold">
                        P({pointX}, {pointY}, {pointZ})
                      </text>

                      <line
                        x1={140 + pointX * 25}
                        y1={90 - pointZ * 15 + pointY * 10}
                        x2={140 + pointX * 25}
                        y2={155}
                        stroke="#fbbf24"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                      />
                      <circle cx={140 + pointX * 25} cy="155" r="4" fill="#fbbf24" />
                      <text x={148 + pointX * 25} y="140" fill="#fde68a" fontSize="11">
                        Perp Foot (dist = {pointDistance.toFixed(2)} u)
                      </text>
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Point Coordinate x:</span>
                        <span className="font-mono text-pink-400 font-bold">{pointX}</span>
                      </div>
                      <input
                        type="range"
                        min={-3}
                        max={5}
                        value={pointX}
                        onChange={(e) => handlePointXChange(Number(e.target.value))}
                        aria-label="Point X coordinate"
                        className="w-full accent-pink-500"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Point Coordinate y:</span>
                        <span className="font-mono text-pink-400 font-bold">{pointY}</span>
                      </div>
                      <input
                        type="range"
                        min={-3}
                        max={5}
                        value={pointY}
                        onChange={(e) => handlePointYChange(Number(e.target.value))}
                        aria-label="Point Y coordinate"
                        className="w-full accent-pink-500"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Point Coordinate z:</span>
                        <span className="font-mono text-pink-400 font-bold">{pointZ}</span>
                      </div>
                      <input
                        type="range"
                        min={-2}
                        max={6}
                        value={pointZ}
                        onChange={(e) => handlePointZChange(Number(e.target.value))}
                        aria-label="Point Z coordinate"
                        className="w-full accent-pink-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                      <p className="text-slate-400">Distance Formula Calculation:</p>
                      <p className="text-amber-300">
                        Numerator: |{planeA}({pointX}) + ({planeB})({pointY}) + {planeC}({pointZ}) - {planeD}| ={' '}
                        {Math.abs(planeA * pointX + planeB * pointY + planeC * pointZ - planeD).toFixed(1)}
                      </p>
                      <p className="text-sky-300">
                        Denominator: sqrt({planeA}^2 + ({planeB})^2 + {planeC}^2) = {planeNormalMag.toFixed(2)}
                      </p>
                      <p className="text-emerald-400 font-bold text-sm">
                        Perpendicular Dist = {pointDistance.toFixed(3)} units
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─��─ SLIDE 2: Line and Plane Angle ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 420 280" className="w-full h-auto">
                      <polygon points="50,160 220,160 370,120 200,120" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
                      <line x1="200" y1="140" x2="200" y2="40" stroke="#10b981" strokeWidth="2.5" />
                      <text x="208" y="55" fill="#34d399" fontSize="10">Normal n</text>

                      <line
                        x1={200 - lineL * 40}
                        y1={140 + lineM * 30 + lineN * 20}
                        x2={200 + lineL * 50}
                        y2={140 - lineM * 40 - lineN * 25}
                        stroke="#f43f5e"
                        strokeWidth="3"
                      />
                      <circle cx="200" cy="140" r="5" fill="#f43f5e" />
                      <text x="210" y="155" fill="#fb7185" fontSize="11" fontWeight="bold">
                        Intersection Point (t)
                      </text>

                      <path d="M 230,140 A 30 30 0 0 0 220,120" fill="none" stroke="#fbbf24" strokeWidth="2" />
                      <text x="235" y="130" fill="#fde68a" fontSize="11" fontWeight="bold">
                        theta = {linePlaneAngleDeg.toFixed(1)} deg
                      </text>
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Line DR l:</span>
                        <span className="font-mono text-rose-400 font-bold">{lineL}</span>
                      </div>
                      <input
                        type="range"
                        min={-3}
                        max={5}
                        value={lineL}
                        onChange={(e) => setLineL(Number(e.target.value))}
                        aria-label="Line direction ratio l"
                        className="w-full accent-rose-500"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Line DR m:</span>
                        <span className="font-mono text-rose-400 font-bold">{lineM}</span>
                      </div>
                      <input
                        type="range"
                        min={-3}
                        max={5}
                        value={lineM}
                        onChange={(e) => setLineM(Number(e.target.value))}
                        aria-label="Line direction ratio m"
                        className="w-full accent-rose-500"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Line DR n:</span>
                        <span className="font-mono text-rose-400 font-bold">{lineN}</span>
                      </div>
                      <input
                        type="range"
                        min={-3}
                        max={5}
                        value={lineN}
                        onChange={(e) => setLineN(Number(e.target.value))}
                        aria-label="Line direction ratio n"
                        className="w-full accent-rose-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                      <p className="text-slate-400">Line-Plane Angle Formula:</p>
                      <p className="text-amber-300">
                        sin(theta) = |al + bm + cn| / (|n| * |v|)
                      </p>
                      <p className="text-emerald-400 font-bold">
                        Calculated Angle theta = {linePlaneAngleDeg.toFixed(2)} deg
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: LPP Graphical Solution & Corner Point ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 380 280" className="w-full h-auto">
                      <line x1="40" y1="240" x2="350" y2="240" stroke="#64748b" strokeWidth="2" />
                      <line x1="40" y1="240" x2="40" y2="30" stroke="#64748b" strokeWidth="2" />
                      <text x="355" y="245" fill="#94a3b8" fontSize="10">x (Tables)</text>
                      <text x="25" y="25" fill="#94a3b8" fontSize="10">y (Chairs)</text>

                      <polygon
                        points={`40,240 ${40 + (woodLimit / 2) * 2.8},240 ${
                          40 + lppVertices.optVertex.x * 2.8
                        },${240 - lppVertices.optVertex.y * 2.8} 40,${
                          240 - (labourLimit / 2) * 2.8
                        }`}
                        fill="rgba(16, 185, 129, 0.3)"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />

                      {lppVertices.evaluated.map((v, i) => (
                        <g key={i}>
                          <circle cx={40 + v.x * 2.8} cy={240 - v.y * 2.8} r="5" fill="#f59e0b" />
                          <text
                            x={45 + v.x * 2.8}
                            y={230 - v.y * 2.8}
                            fill="#fde68a"
                            fontSize="9"
                            fontWeight="bold"
                          >
                            {v.label} (Z={v.zVal})
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Wood Limit (2x + y &lt;= W):</span>
                        <span className="font-mono text-emerald-400 font-bold">{woodLimit}</span>
                      </div>
                      <input
                        type="range"
                        min={60}
                        max={140}
                        value={woodLimit}
                        onChange={(e) => handleWoodLimitChange(Number(e.target.value))}
                        aria-label="LPP wood resource limit"
                        className="w-full accent-emerald-500"
                      />

                      <div className="flex justify-between">
                        <span className="text-slate-400">Labour Limit (x + 2y &lt;= L):</span>
                        <span className="font-mono text-sky-400 font-bold">{labourLimit}</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={120}
                        value={labourLimit}
                        onChange={(e) => handleLabourLimitChange(Number(e.target.value))}
                        aria-label="LPP labour resource limit"
                        className="w-full accent-sky-500"
                      />
                    </div>

                    <div className="p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-xs">
                      <p className="font-bold text-emerald-300">Optimal Feasible Solution:</p>
                      <p className="text-slate-200 mt-1">
                        Max Profit Z = <span className="font-mono font-bold text-emerald-400">Rs {lppVertices.maxVal.toFixed(0)}</span>
                      </p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Attained at vertex: {lppVertices.optVertex.label}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: Conditional Probability Venn ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 380 240" className="w-full h-auto">
                      <rect x="20" y="20" width="340" height="200" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <text x="35" y="45" fill="#64748b" fontSize="12" fontWeight="bold">Sample Space S</text>

                      <circle
                        cx="150"
                        cy="125"
                        r="65"
                        fill="rgba(99, 102, 241, 0.3)"
                        stroke="#6366f1"
                        strokeWidth={selectedConditionEvent === 'A' ? 3.5 : 2}
                      />
                      <text x="110" y="125" fill="#a5b4fc" fontSize="11" fontWeight="bold">
                        A ({probA})
                      </text>

                      <circle
                        cx="230"
                        cy="125"
                        r="65"
                        fill="rgba(244, 63, 94, 0.3)"
                        stroke="#f43f5e"
                        strokeWidth={selectedConditionEvent === 'B' ? 3.5 : 2}
                      />
                      <text x="255" y="125" fill="#fda4af" fontSize="11" fontWeight="bold">
                        B ({probB})
                      </text>

                      <text x="180" y="125" fill="#fde68a" fontSize="10" fontWeight="bold">
                        A∩B ({probAandB})
                      </text>
                    </svg>

                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleConditionSelect('none')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          selectedConditionEvent === 'none' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Full Space S
                      </button>
                      <button
                        onClick={() => handleConditionSelect('B')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          selectedConditionEvent === 'B' ? 'bg-rose-700 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Given B Happened
                      </button>
                      <button
                        onClick={() => handleConditionSelect('A')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          selectedConditionEvent === 'A' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Given A Happened
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                      <p className="font-bold text-amber-300">Reduced Space Calculation:</p>
                      {selectedConditionEvent === 'B' ? (
                        <>
                          <p className="text-slate-300">
                            Conditioning on Event B: Sample space collapses to B (P(B) = {probB}).
                          </p>
                          <p className="font-mono text-emerald-400 font-bold text-sm">
                            P(A|B) = P(A ∩ B) / P(B) = {probAandB} / {probB} = {(probAandB / probB).toFixed(2)}
                          </p>
                        </>
                      ) : selectedConditionEvent === 'A' ? (
                        <>
                          <p className="text-slate-300">
                            Conditioning on Event A: Sample space collapses to A (P(A) = {probA}).
                          </p>
                          <p className="font-mono text-emerald-400 font-bold text-sm">
                            P(B|A) = P(A ∩ B) / P(A) = {probAandB} / {probA} = {(probAandB / probA).toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className="text-slate-400">
                          Click "Given B Happened" or "Given A Happened" to see the reduced sample space ratio.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Predict-then-check prompt */}
              {currentSlide === 1 && !predictionMade && (
                <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60 mt-4 space-y-2">
                  <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    Predict-Then-Check
                  </p>
                  <p className="text-sm text-white">{PREDICTION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handlePrediction(i)}
                        className="text-left p-2.5 bg-slate-800/80 rounded-lg text-xs text-slate-200 hover:bg-slate-700"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {currentSlide === 1 && predictionMade && (
                <div className="p-3 bg-slate-950 rounded-xl border border-indigo-700 text-xs text-amber-300">
                  {PREDICTION_QUESTIONS[0].verifyInstruction}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Slide Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Step
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
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Next Step →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ──────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-6"
        >
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎛️</span> Free Exploration Sandbox
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero grading, zero timer. Manipulate all variables and observe real-time mathematical reactions.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg whitespace-nowrap"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Sandbox Panel 1: 3D Plane */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-indigo-300">3D Plane &amp; Distance Engine</h3>
              <div className="text-xs font-mono text-slate-300 space-y-1">
                <p>Normal vector: n = ({planeA}, {planeB}, {planeC})</p>
                <p>Magnitude: |n| = {planeNormalMag.toFixed(2)}</p>
                <p>Origin Clearance: p = {originDistance.toFixed(2)} u</p>
                <p className="text-amber-300 font-bold">
                  Distance of P({pointX},{pointY},{pointZ}) = {pointDistance.toFixed(3)} u
                </p>
              </div>
              <div className="space-y-2 text-xs">
                <label className="text-slate-400">Normal DR A: {planeA}</label>
                <input
                  type="range"
                  min={-4}
                  max={4}
                  value={planeA}
                  onChange={(e) => setPlaneA(Number(e.target.value))}
                  aria-label="Plane normal component A"
                  className="w-full accent-indigo-500"
                />
                <label className="text-slate-400">Offset D: {planeD}</label>
                <input
                  type="range"
                  min={0}
                  max={25}
                  value={planeD}
                  onChange={(e) => setPlaneD(Number(e.target.value))}
                  aria-label="Plane offset D"
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            {/* Sandbox Panel 2: LPP Optimization */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-300">LPP Corner-Point Engine</h3>
              <div className="text-xs font-mono text-slate-300 space-y-1">
                <p>Wood Constraint: 2x + y &lt;= {woodLimit}</p>
                <p>Labour Constraint: x + 2y &lt;= {labourLimit}</p>
                <p className="text-emerald-400 font-bold">
                  Global Max Z = Rs {lppVertices.maxVal.toFixed(0)} at {lppVertices.optVertex.label}
                </p>
              </div>
              <div className="space-y-2 text-xs">
                <label className="text-slate-400">Wood Capacity: {woodLimit}</label>
                <input
                  type="range"
                  min={50}
                  max={130}
                  value={woodLimit}
                  onChange={(e) => setWoodLimit(Number(e.target.value))}
                  aria-label="Wood capacity"
                  className="w-full accent-emerald-500"
                />
                <label className="text-slate-400">Labour Capacity: {labourLimit}</label>
                <input
                  type="range"
                  min={40}
                  max={110}
                  value={labourLimit}
                  onChange={(e) => setLabourLimit(Number(e.target.value))}
                  aria-label="Labour capacity"
                  className="w-full accent-sky-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (ADAPTIVE & COMPETENCY-BASED) ────────────── */}
      {phase === 'challenge' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-5"
        >
          {/* Challenge header & progress */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-indigo-400 font-bold">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <h2 className="text-sm md:text-base font-bold text-white mt-1">
                Node {challenge.nodeId.toUpperCase()}
              </h2>
            </div>

            <div className="w-full md:w-48">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Progress</span>
                <span>
                  {Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                  animate={{
                    width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-2 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-sm md:text-base text-white font-medium mb-4 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ TYPE (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80 hover:border-indigo-500'
                      }`}
                    >
                      <span className="inline-block w-6 text-slate-400 font-mono">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag available formulas:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Formula label: ${item.label}`}
                      className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg cursor-grab text-xs font-mono font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'slot_normal', name: 'Normal Form' },
                    { id: 'slot_intercept', name: 'Intercept Form' },
                    { id: 'slot_onepoint', name: 'One-Point Form' },
                    { id: 'slot_vector', name: 'Vector Dot Form' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-center items-center min-h-[70px]"
                    >
                      <span className="text-xs text-slate-400 font-bold">{target.name}</span>
                      <span className="text-xs font-mono text-emerald-400 mt-1 font-bold">
                        {droppedLabels[target.id] || '[Drop formula here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Validate drag labels"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Check Mapping
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder steps sequentially:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems[idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] font-bold font-mono">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || []
                    )
                  }
                  aria-label="Submit sequential sort"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Step Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 max-w-sm">
                  <input
                    type="number"
                    step="0.01"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    aria-label="Enter numeric calculated answer"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
                  />
                  {challenge.unit && (
                    <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  aria-label="Check numeric answer"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                >
                  Submit Calculated Value
                </motion.button>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add equation part: ${part}`}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-700 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-800 text-indigo-300 rounded-md text-xs font-mono font-bold flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() =>
                          setConstructParts((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click equation parts to assemble...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  aria-label="Validate assembled equation"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Validate Assembly
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Explanation & Progressive Disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-3"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Step-by-Step Mathematical Explanation:
                </p>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200/90 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 font-mono">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    aria-label="Show next explanation step"
                    className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Deduction Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to next challenge"
                    className="block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Complete Mission Optimization →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ──────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl border border-indigo-800 text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl font-bold text-white">Mission Optimization Complete!</h2>
            <p className="text-sm text-slate-300">
              Final Precision Score:{' '}
              <span className="font-mono font-bold text-emerald-400">
                {Math.max(0, 100 - errors * 5)}%
              </span>{' '}
              | BKT Mastery: <span className="uppercase text-sky-300 font-bold">{masteryLevel}</span>
            </p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-700 text-sm">
            <p className="text-emerald-300 font-bold">Performance Appraisal:</p>
            <p className="text-slate-300 mt-1">
              {errors === 0
                ? 'PERFECT SCORE! Flawless analytical mastery of ISC Class 12 3D Geometry, Linear Programming, and Probability.'
                : errors <= 3
                ? 'Outstanding work! Strong mathematical foundation. Review the specific feedback below for 100% board mastery.'
                : 'Great effort! You are making steady progress. Review the misconceptions profile below and retry the sim.'}
            </p>
          </div>

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-gradient-to-r from-amber-950/50 to-indigo-950/50 rounded-2xl border border-amber-500/40 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-amber-300 flex items-center gap-2 text-sm">
                <span>🔄</span> Spaced Repetition Schedule (SM-2)
              </h3>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-mono font-bold border border-amber-500/30">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Based on your response precision ({Math.max(0, 100 - errors * 5)}% with {errors} error{errors === 1 ? '' : 's'}), optimal memory consolidation recommends:
            </p>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Next Recommended Review:</span>
              <span className="font-bold text-amber-400">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>
          </div>

          {/* Structured Reflection Section */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-indigo-900/60 space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>💭</span> Reflective Conceptual Synthesis
            </h3>
            <p className="text-xs text-slate-400">
              Deepen your neural connections by reflecting on the core principles you explored.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflections.surprising}
                  onChange={(e) =>
                    setReflections((prev) => ({ ...prev, surprising: e.target.value }))
                  }
                  placeholder="e.g., How the line-plane angle formula uses sine instead of cosine because the normal is perpendicular..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflections.friend}
                  onChange={(e) =>
                    setReflections((prev) => ({ ...prev, friend: e.target.value }))
                  }
                  placeholder="e.g., LPP is like finding the most profitable corner peg on a fenced polygonal playground..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflections.realLife}
                  onChange={(e) =>
                    setReflections((prev) => ({ ...prev, realLife: e.target.value }))
                  }
                  placeholder="e.g., Calculating satellite re-entry vectors or allocating factory resources for max ROI..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                    <p className="text-rose-300 font-bold">❌ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>🛰️</span> Real-World Application: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="font-bold text-indigo-400">{i + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Sim engine banners & particle feedback */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Analytical Challenge Solved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C12_MathematicsGeometryFormsPlaneSim };
export const C12_MathematicsGeometryFormsPlane = C12_MathematicsGeometryFormsPlaneSim;
export default C12_MathematicsGeometryFormsPlaneSim;
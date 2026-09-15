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

// ─── NODE IDS CONSTANTS (ALL 10 ISC APPLIED MATHS NODES) ───
const NODE_C11_APPMATH_041 = 'c11_appmath_041'; // AP - general term, sum, arithmetic mean
const NODE_C11_APPMATH_042 = 'c11_appmath_042'; // GP - general term, sum, infinite GP, geometric mean
const NODE_C11_APPMATH_043 = 'c11_appmath_043'; // Special sums (Σn, Σn², Σn³) and method of differences
const NODE_C11_APPMATH_044 = 'c11_appmath_044'; // Straight lines - recall, shifting of origin, slope
const NODE_C11_APPMATH_045 = 'c11_appmath_045'; // Straight lines - various forms, general equation, distance
const NODE_C11_APPMATH_046 = 'c11_appmath_046'; // Straight lines - family of lines, locus
const NODE_C11_APPMATH_047 = 'c11_appmath_047'; // Section formula (internal/external), incentre, collinearity
const NODE_C11_APPMATH_048 = 'c11_appmath_048'; // Circles - standard, diameter, general, parametric forms
const NODE_C11_APPMATH_049 = 'c11_appmath_049'; // Parabola - standard equations and properties
const NODE_C11_APPMATH_050 = 'c11_appmath_050'; // Limits - notion, LHL, RHL, existence

const ALL_APPLIED_MATHS_NODES = [
  NODE_C11_APPMATH_041,
  NODE_C11_APPMATH_042,
  NODE_C11_APPMATH_043,
  NODE_C11_APPMATH_044,
  NODE_C11_APPMATH_045,
  NODE_C11_APPMATH_046,
  NODE_C11_APPMATH_047,
  NODE_C11_APPMATH_048,
  NODE_C11_APPMATH_049,
  NODE_C11_APPMATH_050,
];

// ─── BRILLIANT-STYLE PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_ap_gp_rate',
    question: 'If you double the common difference d in an AP while keeping first term constant, what happens to the total sum S_n?',
    options: [
      'The sum S_n increases quadratically with d.',
      'The sum S_n increases linearly with the increase in d.',
      'The sum S_n remains unchanged because first term a is constant.',
      'The sum S_n doubles exactly.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the AP Difference slider in Lab 1 from 3 to 6 and check how S₆ changes linearly.',
    explanation: 'In S_n = (n/2)[2a + (n-1)d], the variable d appears to the first power. Thus, changing d causes a strictly linear increase in S_n equal to [n(n-1)/2] × Δd.',
  },
  {
    id: 'pred_line_slope_rot',
    question: 'If you rotate a straight line until its inclination angle θ approaches 90°, what will happen to its numerical slope m = tan θ?',
    options: [
      'The slope approaches 0 as the line becomes vertical.',
      'The slope stabilizes at exactly 1.00.',
      'The slope grows infinitely large without bound (undefined at exactly 90°).',
      'The slope becomes negative immediately before 90°.',
    ],
    correctIndex: 2,
    verifyInstruction: 'Rotate the Inclination Angle slider in Lab 2 towards 85° and observe the rapid spike in slope m.',
    explanation: 'Because tan θ = sin θ / cos θ and cos(90°) = 0, as θ → 90° the denominator approaches zero, causing the slope m to surge towards infinity (+∞) and become undefined at 90° (vertical line).',
  },
];

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS (What Do You Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_ap_vs_gp_curves',
    question: 'In Lab 1, as index n advances from 1 to 6, what visual pattern do you observe between AP points (blue) and GP points (pink)?',
    options: [
      'AP points form a straight linear ramp, while GP points curve sharply upward exponentially.',
      'Both AP and GP points follow an identical straight diagonal line.',
      'GP points level off and flatten out while AP points accelerate faster.',
      'AP points grow faster than GP points across all values of n > 3.',
    ],
    observableOptions: [
      'AP points form a straight linear ramp, while GP points curve sharply upward exponentially.',
      'Both AP and GP points follow an identical straight diagonal line.',
      'GP points level off and flatten out while AP points accelerate faster.',
      'AP points grow faster than GP points across all values of n > 3.',
    ],
    correctIndex: 0,
    explanation: 'AP adds a constant difference d per step (constant rate of change / linear slope), whereas GP multiplies by common ratio r at each step (exponential acceleration).',
  },
  {
    id: 'obs_parabola_focus_directrix',
    question: 'In Lab 4 (Parabola Engine), when you increase focal parameter "a", what geometric shift do you observe regarding focus S and directrix x = -a?',
    options: [
      'The focus moves closer to the vertex while the directrix stays fixed.',
      'Focus S(a, 0) and directrix line x = -a move symmetrically further apart from the vertex at (0, 0).',
      'The directrix flips to the right of the y-axis while focus moves to the left.',
      'The parabola narrows into a sharp spike toward the vertical axis.',
    ],
    observableOptions: [
      'The focus moves closer to the vertex while the directrix stays fixed.',
      'Focus S(a, 0) and directrix line x = -a move symmetrically further apart from the vertex at (0, 0).',
      'The directrix flips to the right of the y-axis while focus moves to the left.',
      'The parabola narrows into a sharp spike toward the vertical axis.',
    ],
    correctIndex: 1,
    explanation: 'By standard equation y² = 4ax, the focus is at (a, 0) and the directrix is the line x = -a. Increasing a moves both geometric entities symmetrically outward by distance |a| from the origin vertex.',
  },
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Urban Infrastructure & Data Modeling Challenge: Smart City TechPark',
  intro:
    'You are the Chief Computational Architect designing the multi-billion rupee National Highway Corridor, Tech Hub Layout, and Data Pipeline in Bengaluru. From modeling fiber optic routing along straight lines and parabolic satellite dishes, to predicting compounding cloud revenue (GP) and analyzing real-time server load limits as traffic surges to peak capacity (Limits), your mathematical decisions dictate the structural integrity and economic success of the entire smart district.',
  context:
    'Synthesize Sequences (AP, GP, Special Sums), Coordinate Geometry (Lines, Conics, Circles, Section Formula), and Calculus Foundations (Limits) to optimize engineering blueprints.',
};

// ─── DISCOVERY HOOK QUESTION (Low-stakes curiosity hook) ───
const DISCOVERY_QUESTION = {
  question:
    'A metro rail expansion in Bengaluru lays 3 km of tracks in Month 1, 7 km in Month 2, 11 km in Month 3... Simultaneously, a server cluster starts with 2 nodes and triples its capacity each month (2, 6, 18...). At month 4, which grows faster, and why?',
  options: [
    'AP grows faster because adding a constant 4 creates a stable linear increase.',
    'GP grows exponentially faster because multiplying by 3 yields 54 vs APs 15.',
    'Both grow at the exact same rate because their starting difference is 1.',
    'Neither, because AP and GP formulas yield identical sums at n = 4.',
  ],
  correctIndex: 1,
  hintAfter:
    "Don't worry if you hesitated! Linear growth (AP) adds step-by-step, while Geometric growth (GP) multiplies exponentially. Let's master the visual mechanics behind all sequences, geometry, and limits!",
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

// ─── 22 RICH PROGRESSIVE CHALLENGES (NEP 2020 & CISCE 2026 SPEC) ───
const CHALLENGES: Challenge[] = [
  // 1. AP General Term (Foundation - Recall)
  {
    id: 'ch_ap_01',
    nodeId: NODE_C11_APPMATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In an AP where first term a = 5 and common difference d = 3, what is the 10th term T₁₀?',
    options: ['32', '35', '30', '38'],
    correctIndex: 0,
    explanation: 'Using the general term formula: T_n = a + (n - 1)d. For n = 10: T₁₀ = 5 + (10 - 1)×3 = 5 + 27 = 32. Do not write a + 10d!',
    hints: [
      'Recall that the first term already accounts for 1 step, so we add the difference only (n - 1) times.',
      'Substitute n = 10, a = 5, and d = 3 into T_n = a + (n - 1)d.',
      'Calculate 5 + 9 × 3 = 5 + 27 = 32.',
    ],
    misconceptionIndex: 0,
  },
  // 2. AP Insertion of Arithmetic Means (Standard - Application)
  {
    id: 'ch_ap_02',
    nodeId: NODE_C11_APPMATH_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A highway developer inserts 3 solar toll booths (Arithmetic Means) between milestone 2 km and milestone 18 km. What is the common gap d in km between successive booths?',
    correctAnswer: 4,
    tolerance: 0.1,
    unit: 'km',
    explanation: 'When inserting k means between A and B, the total number of terms is k + 2 = 5, creating k + 1 = 4 gaps. Thus, d = (B - A)/(k + 1) = (18 - 2)/4 = 16/4 = 4 km.',
    hints: [
      'Inserting 3 means creates 3 + 1 = 4 equal intervals between 2 and 18.',
      'Formula for common difference with k inserted means: d = (B - A) / (k + 1).',
      'Compute (18 - 2) / 4 = 16 / 4 = 4 km.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Symmetric Representation AP (Advanced - Analysis)
  {
    id: 'ch_ap_03',
    nodeId: NODE_C11_APPMATH_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Three numbers are in AP such that their sum is 15 and their product is 80. What is the smallest of these three numbers?',
    options: ['2', '5', '8', '1'],
    correctIndex: 0,
    explanation: 'Represent symmetric terms as (a - d), a, (a + d). Sum = 3a = 15 => a = 5. Product = (5 - d)(5)(5 + d) = 5(25 - d²) = 80 => 25 - d² = 16 => d = ±3. The numbers are 2, 5, 8. Smallest is 2.',
    hints: [
      'Use the symmetric form (a - d), a, (a + d) so the sum collapses to 3a = 15.',
      'Since a = 5, the product becomes 5(25 - d��) = 80, meaning 25 - d² = 16.',
      'Solve d² = 9 => d = 3. The numbers are 5 - 3 = 2, 5, and 5 + 3 = 8. Smallest is 2.',
    ],
    misconceptionIndex: 0,
  },
  // 4. GP General Term & Sum (Foundation - Understanding)
  {
    id: 'ch_gp_01',
    nodeId: NODE_C11_APPMATH_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A cloud database storage doubles every month: 3 TB, 6 TB, 12 TB... What is the total storage added over the first 5 months (S₅)?',
    options: ['93 TB', '48 TB', '96 TB', '60 TB'],
    correctIndex: 0,
    explanation: 'Here a = 3, r = 2, n = 5. Using S_n = a(rⁿ - 1)/(r - 1): S₅ = 3(2⁵ - 1)/(2 - 1) = 3(32 - 1)/1 = 3 × 31 = 93 TB.',
    hints: [
      'Identify first term a = 3, common ratio r = 2, and number of periods n = 5.',
      'Apply the finite GP sum formula: S_n = a(rⁿ - 1) / (r - 1).',
      'Calculate 3 × (32 - 1) / 1 = 3 × 31 = 93.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Infinite GP Convergence Condition (Standard - Evaluation)
  {
    id: 'ch_gp_02',
    nodeId: NODE_C11_APPMATH_042,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A financial analyst claims the infinite series 8 + 12 + 18 + 27 + ... converges to a finite value using S_∞ = a/(1 - r). Evaluate this claim.',
    options: [
      'Invalid: r = 1.5 >= 1, so terms diverge to infinity; S_∞ exists only when |r| < 1.',
      'Valid: The formula always yields a negative equilibrium price.',
      'Valid: S_∞ = 8 / (1 - 1.5) = -16.',
      'Invalid: Only arithmetic progressions have valid infinite sums.',
    ],
    correctIndex: 0,
    explanation: 'The infinite sum formula S_∞ = a/(1 - r) strictly requires |r| < 1. Here r = 12/8 = 1.5 > 1, so the series diverges without bound. Blind substitution yields nonsense (-16).',
    hints: [
      'Compute the common ratio r = 12/8 = 1.5.',
      'Check whether the absolute value |r| is strictly less than 1.',
      'Because |r| >= 1, terms grow infinitely; the series is divergent and S_∞ does not exist.',
    ],
    misconceptionIndex: 2,
  },
  // 6. Geometric Mean & AM-GM Inequality (Standard - Application)
  {
    id: 'ch_gp_03',
    nodeId: NODE_C11_APPMATH_042,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For two positive server bandwidth costs x = 4 Gbps and y = 36 Gbps, calculate their Geometric Mean G = √(xy).',
    correctAnswer: 12,
    tolerance: 0.1,
    unit: 'Gbps',
    explanation: 'The Geometric Mean of two positive numbers x and y is G = √(x × y) = √(4 × 36) = √144 = 12. Notice AM = (4+36)/2 = 20 >= GM = 12.',
    hints: [
      'Multiply the two given values: 4 × 36 = 144.',
      'Take the square root of the product: √(144).',
      'The positive square root is 12.',
    ],
    misconceptionIndex: 2,
  },
  // 7. Special Sums (Σn, Σn², Σn³) (Foundation - Recall)
  {
    id: 'ch_ss_01',
    nodeId: NODE_C11_APPMATH_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the exact algebraic relationship connecting Σn³ (sum of cubes) and Σn (sum of natural numbers)?',
    options: [
      'Σn³ = [Σn]² = [n(n + 1)/2]²',
      'Σn³ = (Σn)³',
      'Σn³ = 3 × Σn²',
      'Σn³ = [n(n + 1)(2n + 1)/6]²',
    ],
    correctIndex: 0,
    explanation: 'The sum of the first n cubes 1³ + 2³ + ... + n³ is identically equal to the square of the sum of first n natural numbers: [n(n + 1)/2]² = (Σn)²',
    hints: [
      'Test for n = 2: 1³ + 2³ = 9. Sum of numbers is 1 + 2 = 3. 3² = 9.',
      'Notice that adding cubes produces the exact square of the triangular numbers.',
      'The formula is [n(n + 1)/2]² = (Σn)².',
    ],
    misconceptionIndex: 3,
  },
  // 8. Method of Differences (Advanced - Analysis)
  {
    id: 'ch_ss_02',
    nodeId: NODE_C11_APPMATH_043,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the systematic steps of the Method of Differences to find the nth term of a sequence whose second difference is constant.',
    sortItems: [
      'Compute first differences d₁ = T_(k+1) - T_k',
      'Compute second differences d₂ = d₁_(k+1) - d₁_k and verify constancy',
      'Assume quadratic general term T_n = an² + bn + c',
      'Substitute initial terms n = 1, 2, 3 to solve linear system for a, b, c',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First find 1st differences, then 2nd differences. When 2nd differences are constant, T_n is quadratic (an² + bn + c). Solve for coefficients using known boundary terms.',
    hints: [
      'Always start by computing consecutive differences between raw sequence terms.',
      'Next check if the second differences settle to a constant number.',
      'Once constancy is confirmed at 2nd level, set up the polynomial model and solve for constants.',
    ],
    misconceptionIndex: 3,
  },
  // 9. Coordinate Shifting of Origin (Foundation - Understanding)
  {
    id: 'ch_sl_01',
    nodeId: NODE_C11_APPMATH_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If the origin O(0, 0) is shifted to new coordinates (h, k) = (3, 4), what do the coordinates of the landmark P(7, 9) become in the new (X, Y) frame?',
    options: ['(4, 5)', '(10, 13)', '(-4, -5)', '(21, 36)'],
    correctIndex: 0,
    explanation: 'Transformation formula for shifting origin: X = x - h and Y = y - k. Here X = 7 - 3 = 4, Y = 9 - 4 = 5. The new coordinates are (4, 5).',
    hints: [
      'Moving the observer to (h, k) means subtracting the shift from the original position.',
      'Use X = x - h and Y = y - k.',
      'Compute X = 7 - 3 = 4 and Y = 9 - 4 = 5.',
    ],
    misconceptionIndex: 4,
  },
  // 10. Slope & Perpendicularity Condition (Standard - Application)
  {
    id: 'ch_sl_02',
    nodeId: NODE_C11_APPMATH_044,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A railway track L₁ has slope m₁ = 0.25 (i.e., 1/4). A perpendicular drainage culvert L₂ is built across it. What is the numerical slope m₂ of the culvert?',
    correctAnswer: -4,
    tolerance: 0.01,
    unit: 'slope',
    explanation: 'For two non-vertical perpendicular lines, the product of their slopes satisfies m₁ × m₂ = -1. Thus, m₂ = -1 / m₁ = -1 / (0.25) = -4.',
    hints: [
      'Remember that perpendicular lines have negative reciprocal gradients: m₁ × m₂ = -1.',
      'Divide -1 by 0.25 (which is 1/4).',
      '-1 / (1/4) = -4.',
    ],
    misconceptionIndex: 4,
  },
  // 11. Distance Between Parallel Lines (Standard - Application)
  {
    id: 'ch_sl_03',
    nodeId: NODE_C11_APPMATH_045,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two parallel optical cables are laid along 3x + 4y - 10 = 0 and 6x + 8y + 5 = 0. What is the perpendicular distance between them?',
    correctAnswer: 2.5,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'First normalize second equation by dividing by 2: 3x + 4y + 2.5 = 0. Now A = 3, B = 4, C₁ = -10, C₂ = 2.5. Distance d = |C₁ - C₂| / √(A² + B²) = |-10 - 2.5| / √(9 + 16) = 12.5 / 5 = 2.5 units.',
    hints: [
      'Before applying d = |C₁ - C₂| / √(A² + B²), ensure the x and y coefficients are identical.',
      'Divide 6x + 8y + 5 = 0 by 2 to get 3x + 4y + 2.5 = 0.',
      'Calculate |-10 - 2.5| / 5 = 12.5 / 5 = 2.5.',
    ],
    misconceptionIndex: 5,
  },
  // 12. Drag-Label Standard Forms of Straight Line (Foundation - Understanding)
  {
    id: 'ch_sl_04',
    nodeId: NODE_C11_APPMATH_045,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each standard algebraic equation to its corresponding geometric form name.',
    dragItems: [
      { label: 'y = mx + c', targetId: 'form_slope_intercept' },
      { label: 'x/a + y/b = 1', targetId: 'form_intercept' },
      { label: 'y - y₁ = m(x - x₁)', targetId: 'form_point_slope' },
      { label: 'x cos α + y sin α = p', targetId: 'form_normal' },
    ],
    correctMapping: {
      form_slope_intercept: 'y = mx + c',
      form_intercept: 'x/a + y/b = 1',
      form_point_slope: 'y - y₁ = m(x - x₁)',
      form_normal: 'x cos α + y sin α = p',
    },
    explanation: 'Each line form exposes different parameters: slope-intercept has slope m and y-intercept c; intercept form gives axis intercepts a, b; normal form gives distance p from origin.',
    hints: [
      'Look for the form containing both x-intercept a and y-intercept b as denominators.',
      'The form with trigonometric angles cos α and sin α with length p is the normal/perpendicular form.',
      'Match (y - y₁) = m(x - x₁) to the point-slope form.',
    ],
    misconceptionIndex: 5,
  },
  // 13. Family of Lines L₁ + λL₂ = 0 (Advanced - Application)
  {
    id: 'ch_fol_01',
    nodeId: NODE_C11_APPMATH_046,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Find the equation of the line passing through the intersection of x + y - 4 = 0 and 2x - y - 2 = 0, and also passing through the origin (0, 0).',
    options: ['x - y = 0', 'x + y = 0', '2x - 3y = 0', '3x - y = 0'],
    correctIndex: 0,
    explanation: 'Family of lines is (x + y - 4) + λ(2x - y - 2) = 0. Substituting origin (0, 0): -4 + λ(-2) = 0 => -2λ = 4 => λ = -2. Substituting λ = -2: (x + y - 4) - 2(2x - y - 2) = 0 => -3x + 3y = 0 => x - y = 0.',
    hints: [
      'Write the family equation as L₁ + λL₂ = 0: (x + y - 4) + λ(2x - y - 2) = 0.',
      'Substitute x = 0, y = 0 to find the parameter λ = -2.',
      'Expand (x + y - 4) - 2(2x - y - 2) = 0 to get -3x + 3y = 0 => x - y = 0.',
    ],
    misconceptionIndex: 5,
  },
  // 14. Locus Perpendicular Bisector (Standard - Analysis)
  {
    id: 'ch_fol_02',
    nodeId: NODE_C11_APPMATH_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the locus of a point P(x, y) that moves such that it is always equidistant from two fixed points A(1, 2) and B(5, 4)?',
    options: [
      'Perpendicular bisector: 2x + y - 9 = 0',
      'Circle of radius 5 with centre at midpoint',
      'Straight line passing through A and B: x - 2y + 3 = 0',
      'Parabola with focus at A and directrix at B',
    ],
    correctIndex: 0,
    explanation: 'Condition PA² = PB² => (x - 1)² + (y - 2)² = (x - 5)² + (y - 4)² => x² - 2x + 1 + y² - 4y + 4 = x² - 10x + 25 + y² - 8y + 16 => 8x + 4y - 36 = 0 => 2x + y - 9 = 0 (perpendicular bisector).',
    hints: [
      'Equidistance from 2 points PA = PB leads to quadratic terms cancelling out when squared.',
      'Expand (x - 1)² + (y - 2)² = (x - 5)² + (y - 4)².',
      'Simplify 8x + 4y - 36 = 0 by dividing by 4 to get 2x + y - 9 = 0.',
    ],
    misconceptionIndex: 5,
  },
  // 15. Section Formula Internal/External (Foundation - Recall)
  {
    id: 'ch_sec_01',
    nodeId: NODE_C11_APPMATH_047,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Point P divides the line segment joining A(1, 2) and B(4, 8) internally in the ratio 2 : 1. What are the coordinates of P?',
    options: ['(3, 6)', '(2, 4)', '(3.5, 7)', '(2.5, 5)'],
    correctIndex: 0,
    explanation: 'Using internal section formula ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n)): P_x = (2×4 + 1×1)/(2 + 1) = 9/3 = 3. P_y = (2×8 + 1×2)/(2 + 1) = 18/3 = 6. Point is (3, 6).',
    hints: [
      'Use m = 2, n = 1, (x₁, y₁) = (1, 2) and (x₂, y₂) = (4, 8).',
      'P_x = (2 × 4 + 1 × 1) / 3 = 9 / 3 = 3.',
      'P_y = (2 × 8 + 1 × 2) / 3 = 18 / 3 = 6.',
    ],
    misconceptionIndex: 6,
  },
  // 16. Incentre of Triangle (Advanced - Application)
  {
    id: 'ch_sec_02',
    nodeId: NODE_C11_APPMATH_047,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A triangular park has vertices A(0, 0), B(6, 0), and C(0, 8). The sides are a = 10, b = 8, c = 6. What is the x-coordinate of the Incentre I?',
    correctAnswer: 2,
    tolerance: 0.05,
    unit: 'coordinate',
    explanation: 'Incentre formula: I_x = (a x₁ + b x₂ + c x₃) / (a + b + c) = (10×0 + 8×6 + 6×0) / (10 + 8 + 6) = 48 / 24 = 2. Similarly I_y = (10×0 + 8×0 + 6×8)/24 = 2. Incentre is (2, 2).',
    hints: [
      'Opposite side lengths: a = BC = 10, b = CA = 8, c = AB = 6. Total perimeter = 24.',
      'Weight each vertex x-coordinate by its opposite side length: I_x = (10×0 + 8×6 + 6×0) / 24.',
      '48 / 24 = 2.',
    ],
    misconceptionIndex: 6,
  },
  // 17. Circle Centre and Radius Extraction (Foundation - Understanding)
  {
    id: 'ch_circ_01',
    nodeId: NODE_C11_APPMATH_048,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For the general circle equation x² + y² - 4x + 6y - 12 = 0, what are the centre (h, k) and radius r?',
    options: [
      'Centre (2, -3), Radius 5',
      'Centre (-2, 3), Radius 5',
      'Centre (4, -6), Radius 12',
      'Centre (2, -3), Radius 25',
    ],
    correctIndex: 0,
    explanation: 'Compare with x² + y² + 2gx + 2fy + c = 0: 2g = -4 => g = -2; 2f = 6 => f = 3; c = -12. Centre is (-g, -f) = (2, -3). Radius r = √(g² + f² - c) = √(4 + 9 - (-12)) = √25 = 5.',
    hints: [
      'Complete the square: (x - 2)² - 4 + (y + 3)² - 9 - 12 = 0.',
      'Rewrite as (x - 2)² + (y + 3)² = 25.',
      'The centre is (2, -3) and radius is √25 = 5.',
    ],
    misconceptionIndex: 7,
  },
  // 18. Circle Diameter Form (Standard - Application)
  {
    id: 'ch_circ_02',
    nodeId: NODE_C11_APPMATH_048,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Build the expanded general equation of a circle having diameter endpoints A(1, 4) and B(-3, 2).',
    availableParts: ['x²', '+ y²', '+ 2x', '- 6y', '+ 5 = 0', '- 2x', '+ 6y', '- 5 = 0'],
    targetState: 'x² + y² + 2x - 6y + 5 = 0',
    validationHint: 'Diameter form is (x - x₁)(x - x₂) + (y - y₁)(y - y₂) = 0. Expand (x - 1)(x + 3) + (y - 4)(y - 2) = 0.',
    explanation: '(x - 1)(x + 3) + (y - 4)(y - 2) = x² + 2x - 3 + y² - 6y + 8 = x² + y² + 2x - 6y + 5 = 0.',
    hints: [
      'Multiply the x-factors: (x - 1)(x + 3) = x² + 2x - 3.',
      'Multiply the y-factors: (y - 4)(y - 2) = y² - 6y + 8.',
      'Add together: x² + y² + 2x - 6y + 5 = 0.',
    ],
    misconceptionIndex: 7,
  },
  // 19. Parabola Properties (Foundation - Recall)
  {
    id: 'ch_par_01',
    nodeId: NODE_C11_APPMATH_049,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For the standard parabola y² = 12x, what are the coordinates of its focus and the equation of its directrix?',
    options: [
      'Focus (3, 0), Directrix x = -3',
      'Focus (0, 3), Directrix y = -3',
      'Focus (12, 0), Directrix x = -12',
      'Focus (-3, 0), Directrix x = 3',
    ],
    correctIndex: 0,
    explanation: 'Compare with y² = 4ax: 4a = 12 => a = 3. Since y is squared and coefficient is positive, the parabola opens to the right. Focus is at (a, 0) = (3, 0) and directrix is x = -a = -3.',
    hints: [
      'Equate 4a = 12 to find a = 3.',
      'Because y is squared, the axis of symmetry is the x-axis (focus lies on x-axis).',
      'Focus is (3, 0) and directrix is x = -3.',
    ],
    misconceptionIndex: 8,
  },
  // 20. Parabola Reflective Solar Dish Design (Advanced - Creativity)
  {
    id: 'ch_par_02',
    nodeId: NODE_C11_APPMATH_049,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A Bengaluru clean-tech engineer designs a parabolic solar concentrator dish with equation x² = 16y. A thermal sensor is placed at the focus. At what y-coordinate (in meters) should the sensor be mounted?',
    correctAnswer: 4,
    tolerance: 0.05,
    unit: 'meters',
    explanation: 'For vertical upward opening parabola x² = 4ay, 4a = 16 => a = 4. The vertex is at (0, 0) and the focus is at (0, a) = (0, 4). The thermal sensor must be placed at y = 4 meters.',
    hints: [
      'Compare x² = 16y with standard upward form x² = 4ay.',
      'Solve 4a = 16 to find the focal distance a.',
      'a = 16 / 4 = 4 meters along the vertical y-axis.',
    ],
    misconceptionIndex: 8,
  },
  // 21. Notion of Limits & 0/0 Indeterminate Form (Foundation - Understanding)
  {
    id: 'ch_lim_01',
    nodeId: NODE_C11_APPMATH_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the value of lim(x → 2) (x² - 4) / (x - 2)?',
    options: ['4', '0', 'Undefined (0/0)', '2'],
    correctIndex: 0,
    explanation: 'Direct substitution yields the indeterminate form 0/0. Factor the numerator: (x - 2)(x + 2)/(x - 2). For x ≠ 2, this simplifies to (x + 2). As x → 2, limit = 2 + 2 = 4.',
    hints: [
      'Recognize that 0/0 means we must factor and simplify algebraically, not give up.',
      'Factor the difference of squares: x² - 4 = (x - 2)(x + 2).',
      'Cancel (x - 2) and evaluate lim(x → 2) (x + 2) = 4.',
    ],
    misconceptionIndex: 9,
  },
  // 22. Existence of Limits via LHL & RHL (Advanced - Evaluation)
  {
    id: 'ch_lim_02',
    nodeId: NODE_C11_APPMATH_050,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the existence of the limit lim(x → 0) |x| / x by analyzing Left Hand Limit (LHL) and Right Hand Limit (RHL).',
    options: [
      'Limit does not exist because LHL = -1 while RHL = +1 (LHL ≠ RHL).',
      'Limit exists and equals 1 because absolute value makes all outputs positive.',
      'Limit exists and equals 0 because x approaches 0.',
      'Limit exists and equals -1 because x comes from the left first.',
    ],
    correctIndex: 0,
    explanation: 'For x > 0: |x|/x = x/x = +1, so RHL = 1. For x < 0: |x|/x = -x/x = -1, so LHL = -1. Since LHL ≠ RHL (-1 ≠ 1), the two paths do not meet, and the two-sided limit does NOT exist.',
    hints: [
      'Break the absolute value function into pieces: |x| = x for x > 0 and |x| = -x for x < 0.',
      'Calculate RHL = lim(x → 0⁺) (x/x) = 1 and LHL = lim(x → 0⁻) (-x/x) = -1.',
      'Since LHL (-1) does not equal RHL (+1), the overall limit fails to exist.',
    ],
    misconceptionIndex: 9,
  },
];

// ─── MISCONCEPTIONS & CORRECTIONS ───
const MISCONCEPTIONS_DATA = [
  {
    misconception: 'Writing T_n = a + nd instead of a + (n - 1)d in Arithmetic Progression.',
    correction: 'The first term a already counts as term 1, so the difference d is added only (n - 1) times.',
  },
  {
    misconception: 'Dividing by k instead of (k + 1) when inserting k arithmetic means.',
    correction: 'Inserting k means creates (k + 1) equal gaps between the endpoints A and B.',
  },
  {
    misconception: 'Applying infinite GP sum S_∞ = a/(1 - r) when |r| >= 1.',
    correction: 'Infinite GP converges to a finite sum ONLY when |r| < 1. If |r| >= 1, the series diverges.',
  },
  {
    misconception: 'Assuming (Σn)² = Σn² (confusing sum of squares with square of sum).',
    correction: '(Σn)² equals Σn³ (sum of cubes), whereas Σn² = n(n + 1)(2n + 1)/6.',
  },
  {
    misconception: 'Sign reversal in origin shifting (writing X = x + h instead of X = x - h).',
    correction: 'New coordinate measures distance relative to new origin: X = x - h, Y = y - k.',
  },
  {
    misconception: 'Dropping normalization when computing distance between parallel lines or angle bisectors.',
    correction: 'Make coefficients of x and y identical before computing |C₁ - C₂| / √(A² + B²).',
  },
  {
    misconception: 'Weighting incentre coordinates with adjacent side instead of opposite side.',
    correction: 'Incentre I = (aA + bB + cC)/(a + b + c), where a = BC is strictly OPPOSITE to vertex A.',
  },
  {
    misconception: 'Treating the diameter length as the radius in circle equations.',
    correction: 'Radius is half the distance between diameter endpoints: r = (1/2)√((x₂ - x₁)² + (y₂ - y₁)²).',
  },
  {
    misconception: 'Confusing parabola orientation: sketching y² = 4ax as a vertical U-shape.',
    correction: 'When y is squared, axis of symmetry is x-axis (C-shape opening right/left). When x is squared, it is U-shape (up/down).',
  },
  {
    misconception: 'Believing that 0/0 form implies the limit does not exist.',
    correction: '0/0 is an indeterminate form indicating a removable factor. Simplify algebraically to find the true limit.',
  },
];

// ─── 5 INTERACTIVE EXPLORATION LAB STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: AP & GP Dynamic Wave Generator',
    instruction: 'Adjust the Sequence Multiplier / Step slider to watch AP (linear ramp) vs GP (exponential curve) diverge in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_041,
  },
  {
    title: 'Lab 2: Straight Line Angle & Slope Rotator',
    instruction: 'Rotate the slope angle θ to see how m = tan θ behaves, and observe the perpendicular normal m_perp = -1/m lock in.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_044,
  },
  {
    title: 'Lab 3: Section Formula & Incentre Weighting',
    instruction: 'Drag the division ratio slider m:n to see Point P shift internally and externally along the directed line segment.',
    interactionType: 'drag-position',
    nodeId: NODE_C11_APPMATH_047,
  },
  {
    title: 'Lab 4: Parabola Focus & Directrix Equidistance Engine',
    instruction: 'Drag the focal parameter "a" to see the parabolic boundary expand while verifying PS = PL everywhere.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_049,
  },
  {
    title: 'Lab 5: Limits Microscope (LHL vs RHL Convergence)',
    instruction: 'Slide the delta distance δ towards 0 to inspect whether the left path (LHL) and right path (RHL) meet at a common limit point.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_050,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Project Architect: Bengaluru Hyperloop & Solar TechPark Blueprint',
  description:
    'Synthesize your applied mathematics mastery by specifying real engineering parameters for a Smart City development:',
  steps: [
    'Calculate the compounding passenger traffic growth model using GP sum S₁₂ with r = 1.08 monthly.',
    'Align the hyperloop track equation 3x + 4y - 12 = 0 and determine the minimum clearance distance to an adjacent feeder road.',
    'Design a parabolic solar energy collector dish y² = 16x, locating the exact focal mounting point for maximum photovoltaic yield.',
    'Test network traffic surge limits lim(t → 0) to ensure zero server latency at midnight launch.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

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
  nodeId: NODE_C11_APPMATH_041,
  title: 'Applied Mathematics: Sequences, Coordinate Geometry & Limits Master Simulator',
  definition:
    'A unified analytical system combining Arithmetic and Geometric Progressions, Special Sums, Straight Lines, Section Formula, Circles, Parabolas, and Limit Continuity.',
  eli5:
    'Think of AP as walking up regular stairs, GP as a rocket doubling its speed, geometry as drawing perfect roads and satellite dishes on graph paper, and limits as zooming into a target to see where two paths meet.',
  misconceptions: MISCONCEPTIONS_DATA,
  masteryCriteria:
    'Mastery demonstrated by solving diverse competency challenges across AP/GP, Special Sums, Coordinate Lines/Conics, and Limit existence with 80%+ accuracy.',
};

function C11_AppliedMathsGeneralTermSumSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_APPMATH_041,
    title = DEFAULT_PROPS.title || 'Applied Mathematics Suite',
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['appmath'] || {
    name: 'Applied Mathematics',
    emoji: '📐',
    color: 'indigo',
  };

  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Prediction & Observation Interactive States
  const [predIndex, setPredIndex] = useState<number>(0);
  const [predSelected, setPredSelected] = useState<number | null>(null);
  const [predSubmitted, setPredSubmitted] = useState<boolean>(false);
  const [obsIndex, setObsIndex] = useState<number>(0);
  const [obsSelected, setObsSelected] = useState<number | null>(null);
  const [obsSubmitted, setObsSubmitted] = useState<boolean>(false);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Drag-and-drop & Non-MCQ states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery & Predict States
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Interactive Lab Sliders & Variables
  const [apFirstTerm] = useState<number>(2);
  const [apDiff, setApDiff] = useState<number>(3);
  const [gpRatio, setGpRatio] = useState<number>(2);
  const [lineAngleDeg, setLineAngleDeg] = useState<number>(45);
  const [lineC, setLineC] = useState<number>(2);
  const [sectionRatioM, setSectionRatioM] = useState<number>(2);
  const [sectionRatioN] = useState<number>(1);
  const [parabolaParamA, setParabolaParamA] = useState<number>(2);
  const [limitApproachDelta, setLimitApproachDelta] = useState<number>(0.5);
  const [limitFunctionType, setLimitFunctionType] = useState<'rational' | 'absolute'>('rational');

  // Sandbox Free-Play Sliders
  const [sandboxAngle, setSandboxAngle] = useState<number>(30);
  const [sandboxParabolaA, setSandboxParabolaA] = useState<number>(3);

  // Modal feedback states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeItem = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── ADAPTIVE DIFFICULTY EFFECT ───
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

  // ─── HTML5 CANVAS REAL-TIME 2D GRAPH ANIMATION ───
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

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = 20;

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += scale) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y <= canvas.height; y += scale) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(canvas.width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, canvas.height);
      ctx.stroke();

      if (phase === 'explore' || phase === 'sandbox') {
        const rad = (lineAngleDeg * Math.PI) / 180;
        const slope = Math.tan(rad);

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        const x1 = -10;
        const y1 = slope * x1 + lineC;
        const x2 = 10;
        const y2 = slope * x2 + lineC;
        ctx.moveTo(cx + x1 * scale, cy - y1 * scale);
        ctx.lineTo(cx + x2 * scale, cy - y2 * scale);
        ctx.stroke();

        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let py = -8; py <= 8; py += 0.2) {
          const px = (py * py) / (4 * parabolaParamA);
          const screenX = cx + px * scale;
          const screenY = cy - py * scale;
          if (py === -8) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.stroke();

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(cx + parabolaParamA * scale, cy, 5, 0, Math.PI * 2);
        ctx.fill();

        const pulse = 4 + Math.sin(frame * 0.08) * 2;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(cx + limitApproachDelta * scale, cy - 2 * scale, pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, lineAngleDeg, lineC, parabolaParamA, limitApproachDelta]);

  // ─── HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeItem.hints[nextLevel - 1]) {
      const hintText = currentChallengeItem.hints[nextLevel - 1];
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
  }, [hintCount, currentChallengeItem]);

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
    speechManager.speak(
      isCorrect
        ? 'Spot on! Geometric series outpace linear progressions through exponential multiplication.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToPredict = useCallback(() => {
    setPhase('predict');
    setPredIndex(0);
    setPredSelected(null);
    setPredSubmitted(false);
    audioManager.play('whoosh');
    speechManager.speak('Predict-then-Check Phase. Make a scientific hypothesis before testing it in the lab.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Applied Mathematics Discovery Labs.');
  }, []);

  const handleAdvanceToObserve = useCallback(() => {
    setPhase('observe');
    setObsIndex(0);
    setObsSelected(null);
    setObsSubmitted(false);
    audioManager.play('whoosh');
    speechManager.speak('Observation Check. What patterns did you notice during interactive exploration?');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with mathematical parameters without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode Activated. Apply your mathematical intuition!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_APPLIED_MATHS_NODES, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You achieved a score of ${finalScore} percent.`);
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;
      const ch = currentChallengeItem;

      if (ch.type === 'classify' || ch.type === 'distinguish' || ch.type === 'match') {
        isCorrect = answer === ch.correctIndex;
      } else if (ch.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(ch.correctMapping);
      } else if (ch.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(ch.correctOrder);
      } else if (ch.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (ch.correctAnswer || 0)) <= (ch.tolerance || 0.01);
      } else if (ch.type === 'construct') {
        isCorrect = answer === ch.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Brilliant! Correct derivation.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(ch.nodeId, ch.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + ch.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (ch.misconceptionIndex !== undefined && !hitMisconceptions.includes(ch.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, ch.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete mathematical proof together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(ch.nodeId, ch.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + ch.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [currentChallengeItem, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = currentChallengeItem.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, currentChallengeItem]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && currentChallengeItem.sortItems) {
          prev = currentChallengeItem.sortItems.map((_, i) => i);
        }
        const updated = [...prev];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        return updated;
      });
    },
    [currentChallengeItem]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : currentChallengeItem.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, currentChallengeItem, handleAnswer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((s) => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('tap');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
    audioManager.play('tap');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED AP & GP CALCULATIONS FOR LAB 1 ───
  const apSeries = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => apFirstTerm + i * apDiff);
  }, [apFirstTerm, apDiff]);

  const gpSeries = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => Math.round(apFirstTerm * Math.pow(gpRatio, i)));
  }, [apFirstTerm, gpRatio]);

  const apSum6 = useMemo(() => (6 / 2) * (2 * apFirstTerm + (6 - 1) * apDiff), [apFirstTerm, apDiff]);
  const gpSum6 = useMemo(() => {
    if (gpRatio === 1) return 6 * apFirstTerm;
    return (apFirstTerm * (Math.pow(gpRatio, 6) - 1)) / (gpRatio - 1);
  }, [apFirstTerm, gpRatio]);

  // ─── DERIVED SECTION FORMULA COORDINATES FOR LAB 3 ───
  const internalP = useMemo(() => {
    const x1 = 1, y1 = 2, x2 = 7, y2 = 8;
    const m = sectionRatioM, n = sectionRatioN;
    const px = (m * x2 + n * x1) / (m + n);
    const py = (m * y2 + n * y1) / (m + n);
    return { x: parseFloat(px.toFixed(2)), y: parseFloat(py.toFixed(2)) };
  }, [sectionRatioM, sectionRatioN]);

  // ─── DERIVED LIMIT CALCULATIONS FOR LAB 5 ───
  const limitValues = useMemo(() => {
    const xApproaching = 2;
    const leftX = xApproaching - limitApproachDelta;
    const rightX = xApproaching + limitApproachDelta;

    if (limitFunctionType === 'rational') {
      const fLeft = (leftX * leftX - 4) / (leftX - 2);
      const fRight = (rightX * rightX - 4) / (rightX - 2);
      return {
        leftVal: parseFloat(fLeft.toFixed(3)),
        rightVal: parseFloat(fRight.toFixed(3)),
        limitExists: true,
        limitVal: 4,
      };
    } else {
      const fLeft = Math.abs(leftX - 2) / (leftX - 2);
      const fRight = Math.abs(rightX - 2) / (rightX - 2);
      return {
        leftVal: parseFloat(fLeft.toFixed(3)),
        rightVal: parseFloat(fRight.toFixed(3)),
        limitExists: false,
        limitVal: 'DNE',
      };
    }
  }, [limitApproachDelta, limitFunctionType]);

  // Personalized motivational feedback
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE! Flawless analytical mastery across all domains.';
    if (errCount <= 3) return 'Great work! Solid mathematical intuition and strong problem solving.';
    if (errCount <= 7) return 'Good effort! Review the targeted misconceptions below to refine your ISC Applied Mathematics accuracy.';
    return 'Do not give up — You WILL get this! Study the proofs carefully and practice regularly.';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-3xl p-2 bg-indigo-950/70 border border-indigo-700/50 rounded-2xl inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">ISC Class 11 Applied Mathematics • CISCE 2026 Core Syllabus</p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                : 'bg-indigo-950/60 border-indigo-500/50 text-indigo-300'
            }`}
          >
            {difficulty.toUpperCase()} TIER
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 text-xs bg-slate-800 border border-slate-700 rounded-full text-slate-300"
          >
            Mastery: <strong className="text-white capitalize">{masteryLevel}</strong>
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: NARRATIVE & DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-800/60 rounded-2xl"
          >
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🏙️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mt-3 p-3 bg-indigo-900/30 rounded-xl border border-indigo-700/30 text-xs text-indigo-200"
            >
              📌 <strong>Objective:</strong> {SCENARIO.context}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold"
            >
              Curiosity Hook Challenge (Ungraded)
            </motion.span>
            <p className="text-base font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm p-3 rounded-xl border ${
                    discoveryCorrect
                      ? 'bg-emerald-950/50 border-emerald-700 text-emerald-300'
                      : 'bg-amber-950/50 border-amber-700 text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '✨ Spot on! Multiplying exponentially outstrips linear increments. Now let us formulate our scientific predictions!'
                    : DISCOVERY_QUESTION.hintAfter}
                </motion.p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToPredict}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-900/50 flex items-center gap-2"
                  >
                    Start Prediction Lab →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 1.5: BRILLIANT-STYLE PREDICTION PHASE (Predict-Then-Check) ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">
              Predict-Then-Check: Question {predIndex + 1} of {PREDICTION_QUESTIONS.length}
            </span>
            <div className="flex gap-1">
              {PREDICTION_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === predIndex ? 'w-6 bg-indigo-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={predIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4"
          >
            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-semibold">
              🔮 Make Your Prediction
            </span>
            <p className="text-base sm:text-lg font-semibold text-white">
              {PREDICTION_QUESTIONS[predIndex].question}
            </p>

            <div className="space-y-2.5">
              {PREDICTION_QUESTIONS[predIndex].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    if (!predSubmitted) {
                      setPredSelected(i);
                    }
                  }}
                  disabled={predSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    predSubmitted
                      ? i === PREDICTION_QUESTIONS[predIndex].correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : i === predSelected
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
                      : predSelected === i
                      ? 'bg-indigo-900/60 border-indigo-500 text-indigo-200 ring-2 ring-indigo-500'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {!predSubmitted && (
              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={predSelected === null}
                  onClick={() => {
                    setPredSubmitted(true);
                    const isCorrect = predSelected === PREDICTION_QUESTIONS[predIndex].correctIndex;
                    audioManager.play(isCorrect ? 'success' : 'pop');
                  }}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-900/50"
                >
                  Submit Prediction
                </motion.button>
              </div>
            )}

            {predSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="p-3 bg-amber-950/40 border border-amber-700/50 rounded-lg text-xs text-amber-200">
                  🔍 <strong>How to verify in lab:</strong> {PREDICTION_QUESTIONS[predIndex].verifyInstruction}
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-indigo-400">Mathematical Insight:</strong> {PREDICTION_QUESTIONS[predIndex].explanation}
                </p>
                <div className="flex justify-end pt-2">
                  {predIndex < PREDICTION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setPredIndex((i) => i + 1);
                        setPredSelected(null);
                        setPredSubmitted(false);
                      }}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                    >
                      Next Prediction →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToExploration}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/50 flex items-center gap-2"
                    >
                      Enter Interactive Labs to Verify →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-5 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">
              Interactive Concept Discovery ({currentSlide + 1} of {EXPLORATION_STEPS.length})
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{ scale: idx === currentSlide ? 1.2 : 1 }}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-indigo-400' : 'w-2 bg-slate-700'
                  }`}
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
              className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5"
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-lg font-bold text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </motion.div>

              {/* ─── SLIDE 0: AP & GP GENERATOR ─── */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                    >
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>First Term a = {apFirstTerm}</span>
                        <span>AP Difference d = +{apDiff}</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={apDiff}
                        onChange={(e) => setApDiff(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="AP Common Difference Slider"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-800/40"
                      >
                        <p className="text-xs font-semibold text-indigo-300 mb-1">
                          Arithmetic Progression (AP): T_n = a + (n - 1)d
                        </p>
                        <div className="flex gap-2 text-xs font-mono text-white flex-wrap">
                          {apSeries.map((term, i) => (
                            <motion.span
                              key={i}
                              whileHover={{ scale: 1.08 }}
                              className="px-2 py-1 bg-indigo-900/60 rounded"
                            >
                              T_{i + 1}={term}
                            </motion.span>
                          ))}
                        </div>
                        <p className="text-xs text-indigo-200 mt-2">
                          Sum S₆ = (6/2)(2a + 5d) = <strong className="text-amber-300">{apSum6}</strong>
                        </p>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                    >
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>First Term a = {apFirstTerm}</span>
                        <span>GP Ratio r = ×{gpRatio}</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={4}
                        step={0.5}
                        value={gpRatio}
                        onChange={(e) => setGpRatio(Number(e.target.value))}
                        className="w-full accent-pink-500 cursor-pointer"
                        aria-label="GP Common Ratio Slider"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-pink-950/40 rounded-lg border border-pink-800/40"
                      >
                        <p className="text-xs font-semibold text-pink-300 mb-1">
                          Geometric Progression (GP): T_n = a·r^(n-1)
                        </p>
                        <div className="flex gap-2 text-xs font-mono text-white flex-wrap">
                          {gpSeries.map((term, i) => (
                            <motion.span
                              key={i}
                              whileHover={{ scale: 1.08 }}
                              className="px-2 py-1 bg-pink-900/60 rounded"
                            >
                              T_{i + 1}={term}
                            </motion.span>
                          ))}
                        </div>
                        <p className="text-xs text-pink-200 mt-2">
                          Sum S₆ = a(r⁶ - 1)/(r - 1) = <strong className="text-amber-300">{gpSum6.toFixed(1)}</strong>
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Multi-Representation Visual Compare */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <svg viewBox="0 0 600 150" className="w-full bg-slate-950 rounded-xl border border-slate-800">
                      <line x1="40" y1="130" x2="580" y2="130" stroke="#475569" strokeWidth="1.5" />
                      <line x1="40" y1="130" x2="40" y2="10" stroke="#475569" strokeWidth="1.5" />
                      {apSeries.map((val, i) => {
                        const cx = 50 + i * 90;
                        const cyAp = 130 - Math.min(110, val * 2);
                        const cyGp = 130 - Math.min(110, gpSeries[i] * 1.5);
                        return (
                          <g key={i}>
                            <circle cx={cx} cy={cyAp} r="5" fill="#6366f1" />
                            <circle cx={cx} cy={cyGp} r="5" fill="#ec4899" />
                            <text x={cx} y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">
                              n={i + 1}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </motion.div>
                </motion.div>
              )}

              {/* ─── SLIDE 1: STRAIGHT LINE SLOPE & PERPENDICULARITY ─── */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                    >
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Inclination θ = {lineAngleDeg}°</span>
                        <span>
                          Slope m₁ = tan({lineAngleDeg}°) ={' '}
                          <strong className="text-indigo-400">{Math.tan((lineAngleDeg * Math.PI) / 180).toFixed(2)}</strong>
                        </span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={85}
                        value={lineAngleDeg}
                        onChange={(e) => setLineAngleDeg(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="Line Inclination Angle Slider"
                      />
                      <div className="text-xs text-slate-300">
                        Perpendicular Slope m₂ = -1/m₁ ={' '}
                        <strong className="text-rose-400">
                          {(-1 / Math.tan((lineAngleDeg * Math.PI) / 180)).toFixed(2)}
                        </strong>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                    >
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>y-Intercept c = {lineC}</span>
                        <span>Equation: y = {Math.tan((lineAngleDeg * Math.PI) / 180).toFixed(2)}x + {lineC}</span>
                      </div>
                      <input
                        type="range"
                        min={-5}
                        max={5}
                        value={lineC}
                        onChange={(e) => setLineC(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="y-Intercept Slider"
                      />
                      <p className="text-xs text-emerald-300">
                        Condition for perpendicularity: m₁ × m₂ = -1 (Angle = 90°)
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-44 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative"
                  >
                    <canvas ref={canvasRef} width={600} height={180} className="w-full h-full" />
                  </motion.div>
                </motion.div>
              )}

              {/* ─── SLIDE 2: SECTION FORMULA INTERACTIVE WEIGHTING ─── */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                  >
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Internal Ratio m : n = {sectionRatioM} : {sectionRatioN}</span>
                      <span>
                        Dividing Point P = ({internalP.x}, {internalP.y})
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={sectionRatioM}
                      onChange={(e) => setSectionRatioM(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                      aria-label="Section Ratio m Slider"
                    />
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <svg viewBox="0 0 500 120" className="w-full bg-slate-950 rounded-xl border border-slate-800">
                      <line x1="50" y1="60" x2="450" y2="60" stroke="#64748b" strokeWidth="3" />
                      <circle cx="50" cy="60" r="7" fill="#3b82f6" />
                      <text x="50" y="85" fill="#93c5fd" fontSize="11" textAnchor="middle">
                        A(1, 2)
                      </text>
                      <circle cx="450" cy="60" r="7" fill="#3b82f6" />
                      <text x="450" y="85" fill="#93c5fd" fontSize="11" textAnchor="middle">
                        B(7, 8)
                      </text>
                      {(() => {
                        const ratioFrac = sectionRatioM / (sectionRatioM + sectionRatioN);
                        const px = 50 + ratioFrac * 400;
                        return (
                          <g>
                            <circle cx={px} cy="60" r="8" fill="#10b981" />
                            <text x={px} y="40" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                              P({internalP.x}, {internalP.y})
                            </text>
                            <text x={(50 + px) / 2} y="52" fill="#fbbf24" fontSize="10" textAnchor="middle">
                              m = {sectionRatioM}
                            </text>
                            <text x={(px + 450) / 2} y="52" fill="#fbbf24" fontSize="10" textAnchor="middle">
                              n = {sectionRatioN}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </motion.div>
                </motion.div>
              )}

              {/* ─── SLIDE 3: PARABOLA FOCUS-DIRECTRIX ─── */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                  >
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Focal Parameter a = {parabolaParamA}</span>
                      <span>
                        Equation: y² = {4 * parabolaParamA}x | Focus S({parabolaParamA}, 0) | Directrix x = -{parabolaParamA}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={parabolaParamA}
                      onChange={(e) => setParabolaParamA(Number(e.target.value))}
                      className="w-full accent-pink-500 cursor-pointer"
                      aria-label="Parabola Focal Parameter a Slider"
                    />
                    <p className="text-xs text-pink-300">
                      Latus Rectum Length = 4a = <strong>{4 * parabolaParamA} units</strong>
                    </p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <svg viewBox="0 0 500 200" className="w-full bg-slate-950 rounded-xl border border-slate-800">
                      <line x1="200" y1="10" x2="200" y2="190" stroke="#475569" strokeWidth="1.5" />
                      <line x1="20" y1="100" x2="480" y2="100" stroke="#475569" strokeWidth="1.5" />

                      {(() => {
                        const dirX = 200 - parabolaParamA * 20;
                        const focX = 200 + parabolaParamA * 20;
                        return (
                          <g>
                            <line x1={dirX} y1="20" x2={dirX} y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                            <text x={dirX} y="15" fill="#f87171" fontSize="10" textAnchor="middle">
                              x = -{parabolaParamA}
                            </text>
                            <circle cx={focX} cy="100" r="5" fill="#fbbf24" />
                            <text x={focX} y="120" fill="#fde047" fontSize="10" textAnchor="middle">
                              Focus S({parabolaParamA}, 0)
                            </text>
                          </g>
                        );
                      })()}

                      <path
                        d={`M ${200 + (64 / (4 * parabolaParamA)) * 20} 20 Q 200 100 ${
                          200 + (64 / (4 * parabolaParamA)) * 20
                        } 180`}
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              )}

              {/* ─── SLIDE 4: LIMITS MICROSCOPE (LHL vs RHL) ─── */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setLimitFunctionType('rational')}
                      className={`px-3 py-1.5 text-xs rounded-lg font-bold border transition-colors ${
                        limitFunctionType === 'rational'
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      f(x) = (x² - 4)/(x - 2) [Continuous Limit]
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setLimitFunctionType('absolute')}
                      className={`px-3 py-1.5 text-xs rounded-lg font-bold border transition-colors ${
                        limitFunctionType === 'absolute'
                          ? 'bg-rose-600 border-rose-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      f(x) = |x - 2|/(x - 2) [Jump Discontinuity]
                    </motion.button>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                  >
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Proximity Step δ = {limitApproachDelta.toFixed(3)}</span>
                      <span>Target x → 2</span>
                    </div>
                    <input
                      type="range"
                      min={0.001}
                      max={1.0}
                      step={0.01}
                      value={limitApproachDelta}
                      onChange={(e) => setLimitApproachDelta(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                      aria-label="Limit Proximity Delta Slider"
                    />

                    <div className="grid grid-cols-3 gap-2 text-center pt-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-2 bg-indigo-950/50 rounded-lg border border-indigo-800"
                      >
                        <span className="text-[10px] text-indigo-300">LHL (x = 2 - δ)</span>
                        <p className="text-sm font-bold text-white font-mono">{limitValues.leftVal}</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-2 bg-slate-900 rounded-lg border border-slate-700"
                      >
                        <span className="text-[10px] text-slate-400">Limit Status</span>
                        <p
                          className={`text-sm font-bold font-mono ${
                            limitValues.limitExists ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {limitValues.limitVal}
                        </p>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-2 bg-indigo-950/50 rounded-lg border border-indigo-800"
                      >
                        <span className="text-[10px] text-indigo-300">RHL (x = 2 + δ)</span>
                        <p className="text-sm font-bold text-white font-mono">{limitValues.rightVal}</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold border border-slate-700"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-500 font-medium">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-900/50"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToObserve}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/50 flex items-center gap-1.5"
              >
                Observation Check 🔍
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2.5: BRILLIANT-STYLE OBSERVATION QUESTIONS (What Do You Notice?) ─── */}
      {phase === 'observe' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">
              Observation Analysis: Checkpoint {obsIndex + 1} of {OBSERVATION_QUESTIONS.length}
            </span>
            <div className="flex gap-1">
              {OBSERVATION_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === obsIndex ? 'w-6 bg-indigo-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={obsIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4"
          >
            <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-semibold">
              🧐 What Did You Observe?
            </span>
            <p className="text-base sm:text-lg font-semibold text-white">
              {OBSERVATION_QUESTIONS[obsIndex].question}
            </p>

            <div className="space-y-2.5">
              {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    if (!obsSubmitted) {
                      setObsSelected(i);
                    }
                  }}
                  disabled={obsSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    obsSubmitted
                      ? i === OBSERVATION_QUESTIONS[obsIndex].correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : i === obsSelected
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
                      : obsSelected === i
                      ? 'bg-indigo-900/60 border-indigo-500 text-indigo-200 ring-2 ring-indigo-500'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {!obsSubmitted && (
              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={obsSelected === null}
                  onClick={() => {
                    setObsSubmitted(true);
                    const isCorrect = obsSelected === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
                    audioManager.play(isCorrect ? 'success' : 'pop');
                  }}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-900/50"
                >
                  Verify Observation
                </motion.button>
              </div>
            )}

            {obsSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <p className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-emerald-400">Analytical Confirmation:</strong> {OBSERVATION_QUESTIONS[obsIndex].explanation}
                </p>
                <div className="flex justify-end pt-2">
                  {obsIndex < OBSERVATION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setObsIndex((i) => i + 1);
                        setObsSelected(null);
                        setObsSubmitted(false);
                      }}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                    >
                      Next Observation →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/50 flex items-center gap-2"
                    >
                      Proceed to Sandbox Mode 🚀
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE-PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-5 space-y-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-slate-900 border border-slate-800 rounded-2xl"
          >
            <h3 className="text-base font-bold text-indigo-300">🎨 Free-Play Mathematical Sandbox</h3>
            <p className="text-xs text-slate-400 mt-1">
              Test combinations of sequence generators, origin-shifted straight lines, and conics without grading.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3"
            >
              <span className="text-xs font-bold text-slate-300">Interactive Line & Parabola Controls</span>
              <div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Line Slope Angle θ = {sandboxAngle}°</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={80}
                  value={sandboxAngle}
                  onChange={(e) => setSandboxAngle(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                  aria-label="Sandbox Angle Slider"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Parabola Parameter a = {sandboxParabolaA}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={sandboxParabolaA}
                  onChange={(e) => setSandboxParabolaA(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                  aria-label="Sandbox Parabola Parameter Slider"
                />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3"
            >
              <span className="text-xs font-bold text-slate-300">Live Mathematical Outputs</span>
              <div className="space-y-1.5 text-xs text-slate-300">
                <p>• Line Equation: y = {Math.tan((sandboxAngle * Math.PI) / 180).toFixed(2)}x</p>
                <p>• Perpendicular Normal: m = {(-1 / Math.tan((sandboxAngle * Math.PI) / 180)).toFixed(2)}</p>
                <p>• Parabola: y² = {4 * sandboxParabolaA}x</p>
                <p>• Focus: ({sandboxParabolaA}, 0) | Directrix: x = -{sandboxParabolaA}</p>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/50"
            >
              Start Graded Challenges →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-5 space-y-5">
          {/* Progress Bar & Header */}
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={currentChallengeItem.competencyLevel}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-indigo-400 font-semibold uppercase"
              >
                {currentChallengeItem.competencyLevel} Competency
              </motion.span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>

          {/* Question Card with Shake Animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={
              wrongShake
                ? { x: [0, -10, 10, -10, 10, 0], opacity: 1, y: 0 }
                : { x: 0, opacity: 1, y: 0 }
            }
            transition={{ duration: 0.4 }}
            className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentChallengeItem.question}
            </p>

            {/* MCQ Types (classify, distinguish, match) */}
            {(currentChallengeItem.type === 'classify' ||
              currentChallengeItem.type === 'distinguish' ||
              currentChallengeItem.type === 'match') &&
              currentChallengeItem.options && (
                <div className="mt-4 space-y-2.5">
                  {currentChallengeItem.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                        showExplanation && i === currentChallengeItem.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Numeric Challenge Type */}
            {currentChallengeItem.type === 'numeric' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step={0.01}
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-indigo-500 outline-none"
                    aria-label="Numerical answer input"
                  />
                  <span className="text-xs text-slate-400 font-medium">{currentChallengeItem.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  Submit Value
                </motion.button>
              </motion.div>
            )}

            {/* Drag-Label Challenge Type */}
            {currentChallengeItem.type === 'drag-label' && currentChallengeItem.dragItems && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {currentChallengeItem.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-mono font-bold rounded-lg cursor-grab active:cursor-grabbing border border-indigo-500 shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentChallengeItem.dragItems.map((item) => (
                    <motion.div
                      key={item.targetId}
                      whileHover={{ scale: 1.02 }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-3 rounded-xl border-2 border-dashed flex items-center justify-between text-xs transition-colors ${
                        droppedLabels[item.targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="capitalize font-medium">
                        {item.targetId.replace('form_', '').replace('_', ' ')}
                      </span>
                      <span className="font-mono font-bold text-indigo-300">
                        {droppedLabels[item.targetId] || '[Drop Here]'}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  Check Mapping
                </motion.button>
              </motion.div>
            )}

            {/* Drag-Sort Challenge Type */}
            {currentChallengeItem.type === 'drag-sort' && currentChallengeItem.sortItems && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into the correct sequential order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === currentChallengeItem.sortItems.length
                    ? sortArrangement.map((idx) => currentChallengeItem.sortItems![idx])
                    : currentChallengeItem.sortItems
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
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab active:cursor-grabbing flex items-center gap-2"
                    >
                      <span className="font-bold text-indigo-400">{displayIdx + 1}.</span> {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Sequence Order
                </motion.button>
              </motion.div>
            )}

            {/* Construct Challenge Type */}
            {currentChallengeItem.type === 'construct' && currentChallengeItem.availableParts && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                <p className="text-xs text-slate-400">{currentChallengeItem.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeItem.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-mono font-bold border border-indigo-600"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-3 bg-slate-950 border border-slate-700 rounded-xl min-h-[50px] flex flex-wrap gap-1.5 items-center"
                >
                  {constructParts.map((p, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-900 border border-indigo-700 text-white text-xs font-mono rounded flex items-center gap-1"
                    >
                      {p}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200 font-bold ml-1"
                      >
                        ✕
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click building blocks above to compose equation</span>
                  )}
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  Verify Equation
                </motion.button>
              </motion.div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-slate-950 border border-indigo-800/80 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <motion.span
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-xs font-bold text-amber-300"
                  >
                    Step-by-Step Proof & Walkthrough
                  </motion.span>
                </div>

                {currentChallengeItem.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans"
                    >
                      <strong className="text-indigo-400">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps <
                  currentChallengeItem.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/50"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-emerald-950/60 border border-indigo-700/60 rounded-3xl text-center space-y-3"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Applied Mathematics Mission Complete!</h2>
            <p className="text-base text-slate-300">
              Final Accuracy Score:{' '}
              <strong className="text-emerald-400 text-xl">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-slate-400">
              Assessed Competencies: AP/GP Sequences, Special Sums, Line Forms & Distances, Locus, Section/Incentre,
              Circles, Parabolas, Limits.
            </p>
          </motion.div>

          {/* Motivational Feedback Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : errors <= 3
                ? 'bg-indigo-950/60 border-indigo-500/60 text-indigo-200'
                : errors <= 7
                ? 'bg-amber-950/60 border-amber-500/60 text-amber-200'
                : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
            }`}
          >
            <h3 className="text-base font-bold flex items-center gap-2">
              <span>{errors === 0 ? '🏆' : errors <= 3 ? '🚀' : errors <= 7 ? '⭐' : '💪'}</span>
              <span>
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </span>
            </h3>
            <p className="text-xs sm:text-sm mt-1.5 opacity-90">{getMotivationalFeedback(errors)}</p>
          </motion.div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3"
            >
              <h3 className="text-sm font-bold text-rose-300">Targeted Misconceptions Detected:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = MISCONCEPTIONS_DATA[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900 rounded-xl border border-rose-900/40 text-xs"
                    >
                      <p className="text-rose-400 font-semibold">❌ {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ {m.correction}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Spaced Repetition Notification */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-amber-950/30 border border-amber-700/40 rounded-2xl text-xs text-amber-200"
          >
            📅 <strong>Spaced Repetition Schedule:</strong> Based on your response profile, this suite will be scheduled
            for review in{' '}
            <strong>
              {errors === 0 ? REVIEW_INTERVAL_DAYS[2] : errors <= 3 ? REVIEW_INTERVAL_DAYS[1] : REVIEW_INTERVAL_DAYS[0]} days
            </strong>{' '}
            to consolidate long-term mathematical retention.
          </motion.div>

          {/* Real-World Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3"
          >
            <h3 className="text-base font-bold text-indigo-300">🌐 Real-World Capstone Exercise</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <motion.li key={i} whileHover={{ x: 3 }} className="flex gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span> {step}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}

      {/* ─── MODAL FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Accomplished!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AppliedMathsGeneralTermSumSim;
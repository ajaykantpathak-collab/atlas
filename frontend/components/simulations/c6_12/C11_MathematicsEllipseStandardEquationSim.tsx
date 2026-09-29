'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_MATH_082 = 'c11_math_082'; // Ellipse - standard equation & properties
const NODE_C11_MATH_083 = 'c11_math_083'; // Hyperbola - standard equation & properties
const NODE_C11_MATH_084 = 'c11_math_084'; // 3D Geometry - axes, planes, coordinates
const NODE_C11_MATH_085 = 'c11_math_085'; // 3D Geometry - distance & section formula
const NODE_C11_MATH_086 = 'c11_math_086'; // Limits - notion, meaning, fundamental theorems
const NODE_C11_MATH_087 = 'c11_math_087'; // LHL, RHL, existence of limit
const NODE_C11_MATH_088 = 'c11_math_088'; // Limits of alg, trig, exp, log functions
const NODE_C11_MATH_089 = 'c11_math_089'; // Derivative - meaning & geometrical interpretation
const NODE_C11_MATH_090 = 'c11_math_090'; // Differentiation using first principles
const NODE_C11_MATH_091 = 'c11_math_091'; // Derivatives of alg & trig functions

const ALL_NODE_IDS = [
  NODE_C11_MATH_082,
  NODE_C11_MATH_083,
  NODE_C11_MATH_084,
  NODE_C11_MATH_085,
  NODE_C11_MATH_086,
  NODE_C11_MATH_087,
  NODE_C11_MATH_088,
  NODE_C11_MATH_089,
  NODE_C11_MATH_090,
  NODE_C11_MATH_091,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Orbit & Trajectory Telemetry Lab',
  intro: 'You are a flight dynamics navigation engineer at ISRO Telemetry, Tracking and Command Network (ISTRAC) in Bengaluru. You are computing spacecraft transfer ellipses, hyperbolic gravity assists, 3D tracking vectors, and instantaneous velocity derivatives from telemetry limits.',
  context: 'From conic orbital paths to 3D radar fixes and rate-of-change calculus, your precision determines mission success.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An ISRO probe orbits Earth in an elliptical trajectory with major axis 2a = 10 units and minor axis 2b = 8 units (a > b). If the satellite is at any position P on the orbit, what is the exact sum of its distances from the two foci (SP + S\'P)?',
  options: [
    '8 units (equal to minor axis 2b)',
    '10 units (equal to major axis 2a)',
    '6 units (equal to focal distance 2ae)',
    'It varies continuously as the satellite speeds up at periapsis'
  ],
  correctIndex: 1,
  hintAfter: 'Remember the string-loop focal property: no matter where P is on the ellipse, SP + S\'P is constantly equal to 2a!',
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

// ─── CHALLENGES ARRAY (22 progressive challenges across all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Ellipse
  {
    id: 'ch_01',
    nodeId: NODE_C11_MATH_082,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For the standard ellipse equation x²/25 + y²/16 = 1 (a > b), what is the eccentricity e?',
    options: ['e = 3/5', 'e = 4/5', 'e = 5/4', 'e = 9/25'],
    correctIndex: 0,
    explanation: 'Here a² = 25 (a = 5) and b² = 16 (b = 4). Since a > b, e = √(1 - b²/a²) = √(1 - 16/25) = √(9/25) = 3/5. Notice 0 < e < 1.',
    hints: [
      'Identify a² and b² from denominators under x² and y².',
      'For a > b, the relation is b² = a²(1 - e²), so e = √(1 - b²/a²).',
      'Compute √(1 - 16/25) = √(9/25) = 3/5.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - Hyperbola
  {
    id: 'ch_02',
    nodeId: NODE_C11_MATH_083,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For the hyperbola x²/16 - y²/9 = 1, what is the value of eccentricity e?',
    options: ['e = 5/4', 'e = 7/16', 'e = 4/5', 'e = √7 / 4'],
    correctIndex: 0,
    explanation: 'For a hyperbola, b² = a²(e² - 1), which gives e = √(1 + b²/a²). Here a² = 16 and b² = 9, so e = √(1 + 9/16) = √(25/16) = 5/4. Note e > 1.',
    hints: [
      'Do not confuse the hyperbola formula with the ellipse formula; hyperbola uses a plus sign.',
      'e = √(1 + b²/a²) because e must be strictly greater than 1.',
      '√(1 + 9/16) = √(25/16) = 5/4.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - 3D Coordinates Octant
  {
    id: 'ch_03',
    nodeId: NODE_C11_MATH_084,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In which octant does the radar target coordinate (-4, 5, -7) lie?',
    options: [
      'Octant with sign pattern (-, +, -)',
      'Octant with sign pattern (+, -, +)',
      'The point lies directly on the yz-plane',
      'Octant with sign pattern (+, +, -)'
    ],
    correctIndex: 0,
    explanation: 'Point (-4, 5, -7) has x < 0, y > 0, z < 0. Its sign triplet is (-, +, -). In 3D geometry there are 2³ = 8 distinct octants.',
    hints: [
      'Read off the signs of x, y, and z in that exact order.',
      'x = -4 is negative, y = 5 is positive, z = -7 is negative.',
      'The sign combination is (-, +, -).',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Limits Notion
  {
    id: 'ch_04',
    nodeId: NODE_C11_MATH_086,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Consider f(x) = (x² - 1)/(x - 1). Which statement correctly distinguishes f(1) and lim(x→1) f(x)?',
    options: [
      'f(1) is undefined (0/0), but lim(x→1) f(x) = 2',
      'Both f(1) = 0 and lim(x→1) f(x) = 0',
      'The limit does not exist because f(1) is undefined',
      'f(1) = 2 and lim(x→1) f(x) = undefined'
    ],
    correctIndex: 0,
    explanation: 'At x = 1, denominator is 0, so f(1) is undefined. But for x ≠ 1, (x²-1)/(x-1) = x+1. As x approaches 1, x+1 approaches 2. Limits describe behaviour in the neighbourhood, not at the point.',
    hints: [
      'Remember limits evaluate what f(x) is approaching, not what happens at x = 1.',
      'Factorise x² - 1 as (x - 1)(x + 1).',
      'Cancel (x - 1) for x ≠ 1; as x → 1, x + 1 → 2.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation - Left Hand & Right Hand Limits
  {
    id: 'ch_05',
    nodeId: NODE_C11_MATH_087,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For f(x) = |x|/x at x = 0, what are the Left Hand Limit (LHL) and Right Hand Limit (RHL)?',
    options: [
      'LHL = -1, RHL = +1 (limit does not exist)',
      'LHL = 1, RHL = 1 (limit is 1)',
      'LHL = 0, RHL = 0 (limit is 0)',
      'LHL = -∞, RHL = +∞ (limit is ∞)'
    ],
    correctIndex: 0,
    explanation: 'For x < 0, |x|/x = -x/x = -1, so LHL = -1. For x > 0, |x|/x = x/x = 1, so RHL = 1. Since LHL ≠ RHL, the two-sided limit does not exist.',
    hints: [
      'Let x = 0 - h with h > 0 for LHL. |-h|/(-h) = h/(-h) = -1.',
      'Let x = 0 + h with h > 0 for RHL. |h|/h = 1.',
      'Since -1 ≠ 1, the limit does not exist.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation - Drag Label: Conic Elements
  {
    id: 'ch_06',
    nodeId: NODE_C11_MATH_082,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each geometric feature to its correct position on the horizontal ellipse diagram.',
    dragItems: [
      { label: 'Focus S (ae, 0)', targetId: 'target_focus' },
      { label: 'Vertex A (a, 0)', targetId: 'target_vertex' },
      { label: 'Directrix x = a/e', targetId: 'target_directrix' },
      { label: 'Minor Vertex B (0, b)', targetId: 'target_minor' },
    ],
    correctMapping: {
      target_focus: 'Focus S (ae, 0)',
      target_vertex: 'Vertex A (a, 0)',
      target_directrix: 'Directrix x = a/e',
      target_minor: 'Minor Vertex B (0, b)',
    },
    explanation: 'Foci lie inside the ellipse on the major axis (ae, 0). The vertex is at (a, 0). The directrix x = a/e is outside since a/e > a (as e < 1). The minor axis endpoint is (0, b).',
    hints: [
      'The focus is inside the curve on the horizontal axis.',
      'The vertex is where the ellipse cuts the x-axis.',
      'The directrix is the vertical line outside the ellipse.',
    ],
  },
  // 7. Foundation - Drag Sort: First Principles Step Sequence
  {
    id: 'ch_07',
    nodeId: NODE_C11_MATH_090,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Arrange the fundamental 4 steps of differentiation from first principles in the correct mathematical order.',
    sortItems: [
      'Compute the incremented function value f(x + h)',
      'Form the difference numerator f(x + h) - f(x)',
      'Divide by increment h to form the difference quotient [f(x + h) - f(x)] / h',
      'Evaluate the limit as h → 0 to obtain the instantaneous derivative f\'(x)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First principles requires: 1) write f(x+h), 2) form difference f(x+h)-f(x), 3) divide by h, 4) take lim(h→0). Skipping the limit step loses method marks.',
    hints: [
      'First evaluate f with the incremented variable (x + h).',
      'Then subtract the original f(x) and divide by h.',
      'The final step is always taking the limit as h tends to zero.',
    ],
  },
  // 8. Standard - Numeric 3D Distance
  {
    id: 'ch_08',
    nodeId: NODE_C11_MATH_085,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISRO ground station is at P(1, 2, 3) and a satellite beacon is at Q(4, 6, 15). Calculate the straight-line 3D distance PQ in km.',
    correctAnswer: 13,
    tolerance: 0.1,
    unit: 'km',
    explanation: 'PQ = √[(4-1)² + (6-2)² + (15-3)²] = √[3² + 4² + 12²] = √[9 + 16 + 144] = √169 = 13 km.',
    hints: [
      'Use the 3D distance formula: √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²].',
      'Differences are: Δx = 3, Δy = 4, Δz = 12.',
      'Square each: 9 + 16 + 144 = 169. √169 = 13.',
    ],
  },
  // 9. Standard - Section Formula
  {
    id: 'ch_09',
    nodeId: NODE_C11_MATH_085,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the coordinates of the point R that divides the line segment joining P(1, 2, 3) and Q(4, 6, 9) internally in the ratio 2 : 1.',
    options: ['(3, 14/3, 7)', '(2, 4, 5)', '(9/2, 7, 11)', '(3, 4, 6)'],
    correctIndex: 0,
    explanation: 'Using section formula R = [(m·x₂ + n·x₁)/(m+n), (m·y₂ + n·y₁)/(m+n), (m·z₂ + n·z₁)/(m+n)] with m=2, n=1: x = (2·4 + 1·1)/3 = 9/3 = 3; y = (2·6 + 1·2)/3 = 14/3; z = (2·9 + 1·3)/3 = 21/3 = 7. R = (3, 14/3, 7).',
    hints: [
      'Weight m = 2 multiplies Q(x₂, y₂, z₂) and n = 1 multiplies P(x₁, y₁, z₁).',
      'The denominator is m + n = 3.',
      'Coordinates: ( (2×4+1)/3, (2×6+2)/3, (2×9+3)/3 ) = (3, 14/3, 7).',
    ],
  },
  // 10. Standard - Standard Trig Limit
  {
    id: 'ch_10',
    nodeId: NODE_C11_MATH_088,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate the limit: lim(x→0) [sin(4x) / (2x · cos(x))].',
    options: ['2', '4', '1/2', '0'],
    correctIndex: 0,
    explanation: 'Rewrite as [sin(4x)/(4x)] · [4x / (2x · cos(x))] = 1 · [4 / (2 · cos(0))] = 4 / (2 · 1) = 2.',
    hints: [
      'Use the standard limit lim(u→0) sin(u)/u = 1 with u = 4x.',
      'Multiply and divide by 4 so sin(4x)/(4x) → 1.',
      'The remaining factors give 4/(2 · 1) = 2.',
    ],
  },
  // 11. Standard - Exponential & Logarithmic Limits
  {
    id: 'ch_11',
    nodeId: NODE_C11_MATH_088,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate the telemetry rate limit: lim(x→0) [(e^(5x) - 1) / ln(1 + 2x)].',
    options: ['5/2', '1', '2/5', '10'],
    correctIndex: 0,
    explanation: 'Divide numerator and denominator by x: [(e^(5x)-1)/x] / [ln(1+2x)/x]. As x→0, numerator → 5·1 = 5, and denominator → 2·1 = 2. Total limit = 5/2.',
    hints: [
      'Divide both numerator and denominator by x.',
      'lim(x→0) (e^(5x)-1)/(5x) · 5 = 5.',
      'lim(x→0) ln(1+2x)/(2x) · 2 = 2. Hence 5/2.',
    ],
  },
  // 12. Standard - Geometric Interpretation of Derivative
  {
    id: 'ch_12',
    nodeId: NODE_C11_MATH_089,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Geometrically, what does the difference quotient [f(a+h) - f(a)] / h represent as h approaches 0?',
    options: [
      'The secant line slope rotates into the exact slope of the tangent line at x = a',
      'The chord length shrinks to 0 so the slope becomes 0',
      'The tangent line itself, not its numerical slope',
      'The area under the curve between a and a+h'
    ],
    correctIndex: 0,
    explanation: 'The difference quotient is the slope of the secant line passing through (a, f(a)) and (a+h, f(a+h)). As h→0, the secant rotates and converges to the tangent line at (a, f(a)), so its slope equals f\'(a).',
    hints: [
      'Think of secant joining two points vs tangent touching at one point.',
      'The derivative is the gradient (slope) of the tangent line.',
      'As h tends to zero, the secant line rotates into the tangent line.',
    ],
  },
  // 13. Standard - Derivative of sin(x) from First Principles
  {
    id: 'ch_13',
    nodeId: NODE_C11_MATH_090,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In deriving d/dx(sin x) from first principles, which trigonometric identity is used to transform sin(x+h) - sin(x)?',
    options: [
      '2 cos(x + h/2) · sin(h/2)',
      '2 sin(x + h/2) · cos(h/2)',
      'cos(x) · sin(h) + sin(x) · cos(h)',
      'sin²(x+h) - sin²(x)'
    ],
    correctIndex: 0,
    explanation: 'The sum-to-product identity sin C - sin D = 2 cos((C+D)/2) sin((C-D)/2) gives sin(x+h) - sin(x) = 2 cos(x + h/2) sin(h/2). Pairing sin(h/2) / (h/2) gives 1 as h→0, yielding cos(x).',
    hints: [
      'Use the difference-of-sines formula: sin C - sin D.',
      'C = x + h, D = x, so (C-D)/2 = h/2 and (C+D)/2 = x + h/2.',
      'sin(x+h) - sin x = 2 cos(x + h/2) sin(h/2).',
    ],
  },
  // 14. Standard - Power & Trig Derivatives
  {
    id: 'ch_14',
    nodeId: NODE_C11_MATH_091,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Differentiate f(x) = 4x³ - 7x² + 6 sin(x) - 3 cos(x) + 5. What is the derivative f\'(x)?',
    options: [
      '12x² - 14x + 6 cos(x) + 3 sin(x)',
      '12x² - 14x + 6 cos(x) - 3 sin(x)',
      '12x² - 14x - 6 cos(x) + 3 sin(x) + 5',
      '4x² - 7x + 6 cos(x) + 3 sin(x)'
    ],
    correctIndex: 0,
    explanation: 'Term by term: d/dx(4x³) = 12x², d/dx(-7x²) = -14x, d/dx(6 sin x) = 6 cos x, d/dx(-3 cos x) = -3(-sin x) = +3 sin x, and d/dx(5) = 0.',
    hints: [
      'Power rule: d/dx(xⁿ) = n·xⁿ⁻¹.',
      'Derivative of cos(x) is -sin(x), so -3(-sin x) = +3 sin(x).',
      'Derivative of constant 5 is 0.',
    ],
  },
  // 15. Advanced - Hyperbola Focal Property
  {
    id: 'ch_15',
    nodeId: NODE_C11_MATH_083,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A deep space probe moves along the right branch of x²/9 - y²/16 = 1. If its distance from the left focus S\' is 14 units, what is its distance from the right focus S?',
    options: ['8 units', '20 units', '6 units', '11 units'],
    correctIndex: 0,
    explanation: 'For a hyperbola, the constant focal difference is |SP - S\'P| = 2a. Here a² = 9, so a = 3 and 2a = 6. On the right branch, S\'P - SP = 2a = 6. Given S\'P = 14, SP = 14 - 6 = 8 units.',
    hints: [
      'Focal difference property: |S\'P - SP| = 2a.',
      'From x²/9 - y²/16 = 1, a = 3, so 2a = 6.',
      'On the right branch, S\'P > SP, so 14 - SP = 6 → SP = 8.',
    ],
  },
  // 16. Advanced - Coordinate Plane Division
  {
    id: 'ch_16',
    nodeId: NODE_C11_MATH_085,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In what ratio does the yz-plane divide the line segment joining A(-2, 4, 7) and B(3, -5, 8)?',
    options: ['2 : 3 internally', '3 : 2 internally', '2 : 3 externally', '4 : 5 internally'],
    correctIndex: 0,
    explanation: 'The yz-plane is the plane x = 0. Let it divide AB in ratio k : 1. The x-coordinate of the intersection is (k·3 + 1·(-2))/(k+1) = 0. Thus 3k - 2 = 0 → k = 2/3. The ratio is 2 : 3 internally.',
    hints: [
      'On the yz-plane, every point has x = 0.',
      'Set the x-coordinate of the section formula to 0: (3k - 2)/(k+1) = 0.',
      'Solve for k: 3k = 2 → k = 2/3, so ratio is 2 : 3.',
    ],
  },
  // 17. Advanced - Construct: First Principles Expansion
  {
    id: 'ch_17',
    nodeId: NODE_C11_MATH_090,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Build the algebraic difference expansion for differentiating f(x) = x² from first principles.',
    availableParts: ['x²', '+', '2xh', '+', 'h²', '-', 'x²'],
    targetState: 'x² + 2xh + h² - x²',
    validationHint: 'Assemble: (x+h)² minus x², expanded as x² + 2xh + h² - x²',
    explanation: 'Expanding (x+h)² gives x² + 2xh + h². Subtracting f(x) = x² yields 2xh + h². Dividing by h gives 2x + h, whose limit as h→0 is 2x.',
    hints: [
      'First write (x + h)² in expanded form: x² + 2xh + h².',
      'Then append - x² to subtract f(x).',
      'Target sequence: x² + 2xh + h² - x².',
    ],
  },
  // 18. Advanced - Rationalisation Limit
  {
    id: 'ch_18',
    nodeId: NODE_C11_MATH_088,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate the limit by rationalisation: lim(x→0) [(√(1 + 3x) - 1) / x].',
    options: ['3/2', '3', '1/3', '2/3'],
    correctIndex: 0,
    explanation: 'Multiply numerator and denominator by conjugate (√(1+3x) + 1). Numerator becomes (1 + 3x) - 1 = 3x. Then 3x / [x(√(1+3x) + 1)] = 3 / (√(1+3x) + 1). As x→0, this tends to 3 / (1 + 1) = 3/2.',
    hints: [
      'Direct substitution gives 0/0 (indeterminate form).',
      'Multiply by (√(1+3x) + 1) / (√(1+3x) + 1).',
      'Numerator simplifies to 3x; cancel x with denominator and substitute x = 0.',
    ],
  },
  // 19. Advanced - Tangent Slope Evaluation
  {
    id: 'ch_19',
    nodeId: NODE_C11_MATH_091,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Find the slope of the tangent to the curve y = x³ - 5x² + 8x - 4 at the point where x = 2.',
    correctAnswer: 0,
    tolerance: 0.05,
    unit: 'slope (m)',
    explanation: 'dy/dx = 3x² - 10x + 8. At x = 2: dy/dx = 3(4) - 10(2) + 8 = 12 - 20 + 8 = 0. A slope of 0 indicates a horizontal tangent (turning point).',
    hints: [
      'Differentiate using power rule: dy/dx = 3x² - 10x + 8.',
      'Substitute x = 2 into the derivative expression.',
      '3(4) - 20 + 8 = 12 - 20 + 8 = 0.',
    ],
  },
  // 20. Advanced - Vertical Ellipse vs Horizontal Ellipse
  {
    id: 'ch_20',
    nodeId: NODE_C11_MATH_082,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For the ellipse x²/9 + y²/16 = 1, identify the orientation, foci coordinates, and latus rectum length.',
    options: [
      'Vertical major axis, foci at (0, ±√7), latus rectum = 9/2',
      'Horizontal major axis, foci at (±√7, 0), latus rectum = 32/3',
      'Vertical major axis, foci at (0, ±3), latus rectum = 8/3',
      'Horizontal major axis, foci at (±4, 0), latus rectum = 9/4'
    ],
    correctIndex: 0,
    explanation: 'Here a² = 9 under x² and b² = 16 under y², so a < b. The major axis is vertical along y. e = √(1 - a²/b²) = √(1 - 9/16) = √7/4. Foci are (0, ±be) = (0, ±4(√7/4)) = (0, ±√7). Latus rectum = 2a²/b = 2(9)/4 = 9/2.',
    hints: [
      'Check which denominator is larger: 16 > 9, so major axis is along y (vertical).',
      'Eccentricity uses e = √(1 - 9/16) = √7/4.',
      'Foci are on the y-axis at (0, ±be) = (0, ±√7), and latus rectum is 2a²/b = 18/4 = 9/2.',
    ],
    misconceptionIndex: 1,
  },
  // 21. Advanced - Hyperbola Orientation & Directrix
  {
    id: 'ch_21',
    nodeId: NODE_C11_MATH_083,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'For the hyperbola y²/25 - x²/144 = 1, where do the directrices lie?',
    options: ['y = ±25/13', 'x = ±25/13', 'y = ±13/5', 'x = ±144/13'],
    correctIndex: 0,
    explanation: 'The positive term is y²/25, so transverse axis is vertical along the y-axis. a² = 25 (a = 5), b² = 144 (b = 12). c = √(25 + 144) = 13. Eccentricity e = c/a = 13/5. Directrices are y = ±a/e = ±5/(13/5) = ±25/13.',
    hints: [
      'The minus sign is on x², so transverse axis is along y.',
      'a = 5, b = 12, c = √(25+144) = 13 → e = 13/5.',
      'Directrix equation is y = ±a/e = ±5/(13/5) = ±25/13.',
    ],
  },
  // 22. Advanced - Limit of Step Function at Integer
  {
    id: 'ch_22',
    nodeId: NODE_C11_MATH_087,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Let f(x) = [x] (the greatest integer function). Evaluate lim(x→3⁻) f(x) and lim(x→3⁺) f(x), and state if lim(x→3) f(x) exists.',
    options: [
      'LHL = 2, RHL = 3; limit does not exist',
      'LHL = 3, RHL = 3; limit exists and equals 3',
      'LHL = 3, RHL = 2; limit does not exist',
      'LHL = 2, RHL = 2; limit exists and equals 2'
    ],
    correctIndex: 0,
    explanation: 'As x approaches 3 from the left (e.g. 2.9, 2.99), [x] = 2, so LHL = 2. As x approaches 3 from the right (e.g. 3.1, 3.01), [x] = 3, so RHL = 3. Since LHL ≠ RHL, the two-sided limit does not exist.',
    hints: [
      'For x just below 3 (like 2.99), what is the greatest integer ≤ 2.99?',
      'For x just above 3 (like 3.01), what is the greatest integer ≤ 3.01?',
      'Compare LHL = 2 and RHL = 3. Since 2 ≠ 3, the limit fails to exist.',
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
  nodeId: NODE_C11_MATH_082,
  title: 'ISC Class 11 Conics, 3D Geometry & Calculus Telemetry Lab',
  definition: 'Comprehensive mastery of Ellipse, Hyperbola, 3D Cartesian coordinates, limit evaluation, and first-principles derivatives.',
  eli5: 'Conics shape the paths of space probes, 3D coordinates give their exact radar locations, and calculus limits reveal their instant speeds.',
  misconceptions: [
    {
      misconception: 'The hyperbola eccentricity uses e = √(1 - b²/a²) like an ellipse.',
      correction: 'Hyperbolas have e > 1, so e = √(1 + b²/a²). The plus sign is mandatory.',
    },
    {
      misconception: 'The foci of an ellipse are always on the x-axis at (±ae, 0).',
      correction: 'If b > a, the major axis is vertical, so foci are at (0, ±be) with e = √(1 - a²/b²).',
    },
    {
      misconception: 'The xy-plane means x = 0 and y = 0.',
      correction: 'On the xy-plane, z = 0. The x and y coordinates vary freely across the plane.',
    },
    {
      misconception: 'If f(a) is 0/0 or undefined, the limit lim(x→a) f(x) cannot exist.',
      correction: 'Limits describe behaviour in the neighbourhood of a. Simplifying (x²-1)/(x-1) gives 2 as x→1.',
    },
    {
      misconception: 'Derivative of cos(x) is sin(x) with a positive sign.',
      correction: 'd/dx(cos x) = -sin(x). The minus sign is required because cosine decreases after x = 0.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What defines an ellipse conically?', options: ['Eccentricity 0 < e < 1', 'Eccentricity e = 1', 'Eccentricity e > 1', 'Eccentricity e = 0'], correctIndex: 0 },
    { question: 'What is the sum of focal distances for an ellipse x²/a² + y²/b² = 1 (a > b)?', options: ['2a', '2b', '2ae', '2a/e'], correctIndex: 0 },
    { question: 'In 3D geometry, what is the equation of the zx-plane?', options: ['y = 0', 'x = 0', 'z = 0', 'x + z = 0'], correctIndex: 0 },
    { question: 'What is the distance between (0,0,0) and (2,3,6)?', options: ['7', '6', '√13', '11'], correctIndex: 0 },
    { question: 'What is the standard limit lim(x→0) sin(x)/x?', options: ['1', '0', '∞', 'Undefined'], correctIndex: 0 },
    { question: 'What is the condition for lim(x→a) f(x) to exist?', options: ['LHL = RHL (both finite)', 'f(a) is defined', 'LHL > 0', 'f\'(a) = 0'], correctIndex: 0 },
    { question: 'Geometrically, what is f\'(a)?', options: ['Slope of the tangent at x = a', 'Length of the curve', 'Area under curve', 'Secant chord length'], correctIndex: 0 },
    { question: 'What is d/dx(5x³ - 2x + 7)?', options: ['15x² - 2', '15x² - 2 + 7', '5x² - 2', '15x³ - 2'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master conics standard forms, 3D coordinate geometry, limits, and first-principles derivatives.',
};

// ─── EXPLORATION STEPS (Brilliant.org style) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Ellipse & Hyperbola Conic Geometry',
    instruction: 'Drag the semi-major axis (a), semi-minor axis (b), and eccentricity controls to inspect orbital foci and directrices in real time.',
    interactionType: 'slider-conic',
    nodeId: NODE_C11_MATH_082,
  },
  {
    title: 'Lab 2: 3D Telemetry Radar Coordinates & Planes',
    instruction: 'Adjust the (X, Y, Z) telemetry coordinates to watch the 3D projection onto the xy, yz, and zx reference planes and see its octant.',
    interactionType: 'slider-3d',
    nodeId: NODE_C11_MATH_084,
  },
  {
    title: 'Lab 3: Limit Neighbourhood & Indeterminate Forms',
    instruction: 'Slide the probe x towards 1 to observe how the secant quotient (x² - 1)/(x - 1) smoothly converges to 2 without 0/0 singularity.',
    interactionType: 'slider-limit',
    nodeId: NODE_C11_MATH_086,
  },
  {
    title: 'Lab 4: Left Hand vs Right Hand Limit Jump Discontinuity',
    instruction: 'Approach x = 0 from left (x < 0) and right (x > 0) to observe why |x|/x fails the two-sided limit existence condition.',
    interactionType: 'slider-onesided',
    nodeId: NODE_C11_MATH_087,
  },
  {
    title: 'Lab 5: First Principles Secant-to-Tangent Convergence',
    instruction: 'Shrink the secant increment h towards 0 and watch the chord rotate into the instantaneous tangent line with slope 2x.',
    interactionType: 'slider-derivative',
    nodeId: NODE_C11_MATH_089,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase eccentricity e towards 0.95 in an ellipse, what happens to the two foci relative to the center?',
    options: [
      'The foci move closer to the center (0,0)',
      'The foci move outward towards the major vertices (±a, 0)',
      'The foci move onto the minor y-axis',
      'The foci do not move at all'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide eccentricity e towards 0.95 in Lab 1 and observe the focal pegs S and S\' shifting outward towards the vertices!',
    nodeId: NODE_C11_MATH_082,
  },
  {
    question: 'Predict: For y = x², as the secant step h shrinks from 1.0 to 0.001 at point x = 1, what exact value does [f(1+h) - f(1)] / h approach?',
    options: ['1', '2', '0', 'Infinity'],
    correctIndex: 1,
    verifyInstruction: 'Drag the increment slider h down to 0 in Lab 5 and observe the slope gauge lock onto 2.000!',
    nodeId: NODE_C11_MATH_089,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the sum of distances SP + S\'P as the probe moves around the entire elliptical perimeter?',
    observableOptions: [
      'SP + S\'P remains perfectly constant and equal to 2a',
      'SP + S\'P fluctuates wildly between apogee and perigee',
      'SP + S\'P equals zero at the minor vertices',
      'SP + S\'P equals b² / a'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MATH_082,
  },
  {
    question: 'What happens to the 3D distance of point P(x, y, z) from the xy-plane as you vary z?',
    observableOptions: [
      'The distance from the xy-plane is purely |z| and is independent of x and y',
      'The distance depends equally on x, y, and z',
      'The distance becomes 0 whenever x = 0',
      'The distance equals √(x² + y²)'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MATH_084,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Trajectory Analyst Mission Debrief',
  description: 'Apply conics and calculus to plan a Lunar Transfer Trajectory (LTO) for Chandrayaan-4.',
  steps: [
    'Calculate the semi-major axis a and eccentricity e of the highly elliptical parking orbit.',
    'Use 3D coordinates (x, y, z) from Deep Space Network telemetry in Bengaluru to fix satellite position.',
    'Compute instantaneous velocity v(t) = dr/dt using first-principles limits at trans-lunar injection.',
    'Verify hyperbolic excess velocity e > 1 for lunar gravity assist escape vector.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_MathematicsEllipseStandardEquationSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_MATH_082,
  title = DEFAULT_PROPS.title || 'Math Sim',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Brilliant.org pattern states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Escalating hints and explanation
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Drag-and-drop & Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [selectedMcqAnswer, setSelectedMcqAnswer] = useState<number | null>(null);

  // Interactive Visualization Controls
  const [semiMajorA, setSemiMajorA] = useState(5); // a
  const [semiMinorB, setSemiMinorB] = useState(3); // b
  const [conicMode, setConicMode] = useState<'ellipse' | 'hyperbola'>('ellipse');
  const [probeAngle, setProbeAngle] = useState(45); // degrees on ellipse
  const [coordX, setCoordX] = useState(3);
  const [coordY, setCoordY] = useState(4);
  const [coordZ, setCoordZ] = useState(5);
  const [limitX, setLimitX] = useState(1.5);
  const [oneSidedX, setOneSidedX] = useState(-0.5);
  const [derivX, setDerivX] = useState(1.0);
  const [derivH, setDerivH] = useState(0.8);
  const [isAnimatingOrbit, setIsAnimatingOrbit] = useState(true);

  // Extra rich states
  const [selectedConicPoint, setSelectedConicPoint] = useState<string | null>(null);
  const [showDirectrix, setShowDirectrix] = useState(true);
  const [showFocalRays, setShowFocalRays] = useState(true);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // ─── DERIVED CONIC VALUES ───
  const conicEccentricity = useMemo(() => {
    if (conicMode === 'ellipse') {
      if (semiMajorA >= semiMinorB) {
        return Math.sqrt(Math.max(0, 1 - (semiMinorB * semiMinorB) / (semiMajorA * semiMajorA)));
      } else {
        return Math.sqrt(Math.max(0, 1 - (semiMajorA * semiMajorA) / (semiMinorB * semiMinorB)));
      }
    } else {
      // Hyperbola: e = √(1 + b²/a²)
      return Math.sqrt(1 + (semiMinorB * semiMinorB) / (semiMajorA * semiMajorA));
    }
  }, [semiMajorA, semiMinorB, conicMode]);

  const focalDistanceC = useMemo(() => {
    if (conicMode === 'ellipse') {
      return (semiMajorA >= semiMinorB ? semiMajorA : semiMinorB) * conicEccentricity;
    } else {
      return Math.sqrt(semiMajorA * semiMajorA + semiMinorB * semiMinorB);
    }
  }, [semiMajorA, semiMinorB, conicEccentricity, conicMode]);

  const latusRectumLength = useMemo(() => {
    if (conicMode === 'ellipse') {
      return semiMajorA >= semiMinorB
        ? (2 * semiMinorB * semiMinorB) / semiMajorA
        : (2 * semiMajorA * semiMajorA) / semiMinorB;
    } else {
      return (2 * semiMinorB * semiMinorB) / semiMajorA;
    }
  }, [semiMajorA, semiMinorB, conicMode]);

  // Current probe position on ellipse
  const probePos = useMemo(() => {
    const rad = (probeAngle * Math.PI) / 180;
    const px = semiMajorA * Math.cos(rad);
    const py = semiMinorB * Math.sin(rad);
    const focus1X = semiMajorA >= semiMinorB ? focalDistanceC : 0;
    const focus1Y = semiMajorA >= semiMinorB ? 0 : focalDistanceC;
    const focus2X = semiMajorA >= semiMinorB ? -focalDistanceC : 0;
    const focus2Y = semiMajorA >= semiMinorB ? 0 : -focalDistanceC;

    const d1 = Math.sqrt((px - focus1X) ** 2 + (py - focus1Y) ** 2);
    const d2 = Math.sqrt((px - focus2X) ** 2 + (py - focus2Y) ** 2);
    const sumD = d1 + d2;
    return { x: px, y: py, d1, d2, sumD };
  }, [probeAngle, semiMajorA, semiMinorB, focalDistanceC]);

  // Limit difference quotient: (x² - 1) / (x - 1)
  const limitValue = useMemo(() => {
    if (Math.abs(limitX - 1) < 0.0001) return 2.0;
    return (limitX * limitX - 1) / (limitX - 1);
  }, [limitX]);

  // Secant slope: [(x+h)² - x²] / h
  const secantSlope = useMemo(() => {
    if (Math.abs(derivH) < 0.0001) return 2 * derivX;
    return ((derivX + derivH) ** 2 - derivX ** 2) / derivH;
  }, [derivX, derivH]);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATE ───
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

  // ─── CANVAS 2D ANIMATION (Radar & Orbit Simulation) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Radar Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let r = 20; r <= 100; r += 20) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Radar Sweep
      const sweepAngle = (frame * 0.03) % (Math.PI * 2);
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.4)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * 110, cy + Math.sin(sweepAngle) * 110);
      ctx.stroke();

      // Satellite Blip
      const satX = cx + (semiMajorA * 10) * Math.cos((probeAngle * Math.PI) / 180);
      const satY = cy + (semiMinorB * 10) * Math.sin((probeAngle * Math.PI) / 180);

      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(satX, satY, 4 + Math.sin(frame * 0.1) * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`ISRO TELEMETRY RADAR | SAT BEARING: ${probeAngle.toFixed(1)}°`, 10, 18);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [semiMajorA, semiMinorB, probeAngle]);

  // ─── AUTO ORBIT ANIMATION EFFECT ───
  useEffect(() => {
    if (!isAnimatingOrbit) return;
    const interval = setInterval(() => {
      setProbeAngle((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAnimatingOrbit]);

  // ─── INACTIVITY AUTO-HINT ───
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

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    setSelectedDiscoveryOpt(selectedIndex);
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent intuition! The focal sum SP plus S-prime P is strictly constant and equal to 2a.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate each visual parameter to discover the laws.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with conics, 3D coordinates, and derivative slopes without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning flight telemetry challenges. Let us test your analytical reasoning.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now test your prediction by adjusting the simulation controls!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Check the geometric readouts carefully.');
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
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
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
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Telemetry mission complete! Excellent analytical mastery achieved.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setSelectedMcqAnswer(null);
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
        setSelectedMcqAnswer(answer as number);
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Telemetry locked.');
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
          speechManager.speak('Let us inspect the complete derivation step by step.');
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

  const handleSortSubmit = useCallback(() => {
    const currentOrder = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    handleAnswer(currentOrder);
  }, [sortArrangement, handleAnswer]);

  const handleConicPointClick = useCallback((pointName: string) => {
    setSelectedConicPoint(pointName);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      focus1: 'Primary Focus S (ae, 0) - gravitational center of mass.',
      focus2: 'Secondary Focus S\' (-ae, 0) - geometric focal reflection peg.',
      vertexA: 'Major Vertex A (a, 0) - apoapsis orbital extreme point.',
      vertexB: 'Minor Vertex B (0, b) - semi-minor axis clearance limit.',
      directrix: 'Directrix x = a/e - reference directrix plane where PS = e·PL.',
    };
    speechManager.speak(descriptions[pointName] || '');
  }, []);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-600/20 border border-gold-500/30 flex items-center justify-center text-2xl" aria-hidden="true">
            {subjectConfig.emoji}
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">{title}</h1>
            <p className="text-xs text-gold-400 font-mono">ISC Class 11 Mathematics | ISRO Telemetry Lab</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
            }`}
          >
            <span aria-hidden="true">{difficulty === 'foundation' ? '🟢' : difficulty === 'advanced' ? '🔴' : '🔵'}</span>
            <span>{difficulty} TIER</span>
          </motion.span>
          <div className="text-xs text-slate-400 font-mono bg-slate-800 px-3 py-1 rounded-lg">
            Score: <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 border border-gold-800/40 rounded-2xl shadow-inner">
            <div className="flex items-center gap-2 mb-2 text-gold-400 font-mono text-xs uppercase tracking-widest">
              <span>🚀 Flight Dynamics Scenario</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 bg-gold-950/40 p-3 rounded-xl border border-gold-900/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-base font-semibold text-amber-300 mb-2 font-mono">Curiosity Discovery Hook:</h3>
            <p className="text-white text-base md:text-lg mb-6 leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="group" aria-label="Discovery Question Options">
              {DISCOVERY_QUESTION.options.map((opt, i) => {
                const isSelected = selectedDiscoveryOpt === i;
                const isCorrect = i === DISCOVERY_QUESTION.correctIndex;
                return (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left rounded-xl text-sm transition-all border flex items-center justify-between ${
                      discoveryAnswered
                        ? isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                          : isSelected
                          ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400'
                        : 'bg-slate-800 border-slate-700 hover:border-gold-500 text-slate-200 hover:bg-slate-800/90'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center leading-6 text-xs mr-2 font-mono">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {discoveryAnswered && (
                      <span className="font-bold ml-2 text-sm">
                        {isCorrect ? '✓ Correct' : isSelected ? '✗ Incorrect' : ''}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm flex items-center gap-1.5 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <span>{discoveryCorrect ? '✓' : '💡'}</span>
                  <span>{discoveryCorrect ? 'Exactly right! SP + S\'P = 2a always.' : DISCOVERY_QUESTION.hintAfter}</span>
                </p>
                <motion.button
                  aria-label="Enter Interactive Flight Telemetry Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Interactive Flight Telemetry Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-lg md:text-xl font-bold text-gold-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <p className="text-amber-400 text-sm mb-6 flex items-center gap-2">
                <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── SLIDE 0: ELLIPSE & HYPERBOLA CONIC LAB ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* Predict then Check */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/40 border border-gold-800/40 rounded-xl">
                      <p className="text-sm font-semibold text-white mb-3">
                        🔮 Predict Before Interacting: {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2" role="group" aria-label="Prediction options">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 text-left bg-slate-800 rounded-lg text-xs text-slate-200 hover:bg-gold-900/40"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl flex items-center justify-between">
                      <p className="text-xs text-amber-300 flex items-center gap-1.5">
                        <span aria-hidden="true">🔍</span>
                        <span>{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      </p>
                      <motion.button
                        aria-label="Verify prediction"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPredictionVerified(true)}
                        className="px-3 py-1 bg-amber-600 text-white rounded text-xs font-bold"
                      >
                        ✓ Verified!
                      </motion.button>
                    </div>
                  )}

                  {/* Interactive Visual Canvas & SVG */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* SVG Conic Visualizer */}
                    <div className="lg:col-span-2 bg-slate-950 rounded-2xl p-4 border border-slate-800 relative">
                      <svg viewBox="-120 -100 240 200" className="w-full h-64 md:h-80" role="img" aria-label="Conic Section Visualizer">
                        {/* Grid & Axes */}
                        <line x1="-110" y1="0" x2="110" y2="0" stroke="#334155" strokeWidth="1" />
                        <line x1="0" y1="-90" x2="0" y2="90" stroke="#334155" strokeWidth="1" />
                        <text x="105" y="-5" fill="#64748b" fontSize="7" textAnchor="end">X (Major/Transverse)</text>
                        <text x="5" y="-82" fill="#64748b" fontSize="7">Y</text>

                        {/* Directrices */}
                        {showDirectrix && conicMode === 'ellipse' && (
                          <>
                            <line
                              x1={(semiMajorA / conicEccentricity) * 12}
                              y1="-85"
                              x2={(semiMajorA / conicEccentricity) * 12}
                              y2="85"
                              stroke="#ef4444"
                              strokeDasharray="3 3"
                              strokeWidth="1"
                            />
                            <line
                              x1={-(semiMajorA / conicEccentricity) * 12}
                              y1="-85"
                              x2={-(semiMajorA / conicEccentricity) * 12}
                              y2="85"
                              stroke="#ef4444"
                              strokeDasharray="3 3"
                              strokeWidth="1"
                            />
                            <text x={(semiMajorA / conicEccentricity) * 12 + 2} y="-70" fill="#ef4444" fontSize="6">
                              x = +a/e
                            </text>
                          </>
                        )}

                        {/* Ellipse Orbit Path */}
                        {conicMode === 'ellipse' ? (
                          <ellipse
                            cx="0"
                            cy="0"
                            rx={semiMajorA * 12}
                            ry={semiMinorB * 12}
                            fill="rgba(79, 70, 229, 0.08)"
                            stroke="#6366f1"
                            strokeWidth="2"
                          />
                        ) : (
                          // Hyperbola Right & Left Branches
                          <g stroke="#38bdf8" strokeWidth="2" fill="none">
                            <path
                              d={`M ${semiMajorA * 12} 0 Q ${semiMajorA * 12 + 30} 60 ${semiMajorA * 12 + 60} 80 M ${
                                semiMajorA * 12
                              } 0 Q ${semiMajorA * 12 + 30} -60 ${semiMajorA * 12 + 60} -80`}
                            />
                            <path
                              d={`M ${-semiMajorA * 12} 0 Q ${-semiMajorA * 12 - 30} 60 ${-semiMajorA * 12 - 60} 80 M ${
                                -semiMajorA * 12
                              } 0 Q ${-semiMajorA * 12 - 30} -60 ${-semiMajorA * 12 - 60} -80`}
                            />
                          </g>
                        )}

                        {/* Foci */}
                        <g
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Primary Focus S"
                          onClick={() => handleConicPointClick('focus1')}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleConicPointClick('focus1'); }}
                          className="cursor-pointer"
                        >
                          <circle cx={focalDistanceC * 12} cy="0" r="4" fill="#22c55e" />
                          <text x={focalDistanceC * 12} y="-8" fill="#22c55e" fontSize="7" textAnchor="middle">
                            Focus S
                          </text>
                        </g>

                        <g
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Secondary Focus S prime"
                          onClick={() => handleConicPointClick('focus2')}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleConicPointClick('focus2'); }}
                          className="cursor-pointer"
                        >
                          <circle cx={-focalDistanceC * 12} cy="0" r="4" fill="#22c55e" />
                          <text x={-focalDistanceC * 12} y="-8" fill="#22c55e" fontSize="7" textAnchor="middle">
                            Focus S'
                          </text>
                        </g>

                        {/* Major Vertices */}
                        <circle cx={semiMajorA * 12} cy="0" r="3" fill="#f59e0b" />
                        <circle cx={-semiMajorA * 12} cy="0" r="3" fill="#f59e0b" />
                        <text x={semiMajorA * 12 + 4} y="10" fill="#f59e0b" fontSize="6">A(a,0)</text>

                        {/* Minor Vertices */}
                        <circle cx="0" cy={semiMinorB * 12} r="3" fill="#ec4899" />
                        <circle cx="0" cy={-semiMinorB * 12} r="3" fill="#ec4899" />
                        <text x="6" y={-semiMinorB * 12} fill="#ec4899" fontSize="6">B(0,b)</text>

                        {/* Satellite Probe & Focal Rays */}
                        {conicMode === 'ellipse' && (
                          <>
                            {showFocalRays && (
                              <>
                                <line
                                  x1={focalDistanceC * 12}
                                  y1="0"
                                  x2={probePos.x * 12}
                                  y2={-probePos.y * 12}
                                  stroke="#22c55e"
                                  strokeWidth="1.2"
                                  strokeDasharray="2 2"
                                />
                                <line
                                  x1={-focalDistanceC * 12}
                                  y1="0"
                                  x2={probePos.x * 12}
                                  y2={-probePos.y * 12}
                                  stroke="#38bdf8"
                                  strokeWidth="1.2"
                                  strokeDasharray="2 2"
                                />
                              </>
                            )}
                            <circle cx={probePos.x * 12} cy={-probePos.y * 12} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                            <text x={probePos.x * 12 + 6} y={-probePos.y * 12 - 4} fill="#38bdf8" fontSize="6" fontWeight="bold">
                              ISRO SAT P
                            </text>
                          </>
                        )}
                      </svg>

                      {/* Selected element toast */}
                      {selectedConicPoint && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-2 left-2 right-2 bg-slate-900/90 border border-slate-700 p-2 rounded-lg text-xs text-gold-300">
                          {selectedConicPoint === 'focus1' && 'Focus S (+ae, 0) - Primary gravity attractor point.'}
                          {selectedConicPoint === 'focus2' && 'Focus S\' (-ae, 0) - Secondary focal node.'}
                        </motion.div>
                      )}
                    </div>

                    {/* Interactive Sliders & Live Telemetry Panel */}
                    <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                      <div className="flex gap-2">
                        <motion.button
                          aria-label="Switch to Ellipse mode (eccentricity less than 1)"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setConicMode('ellipse')}
                          className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 ${
                            conicMode === 'ellipse' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <span>{conicMode === 'ellipse' ? '✓' : '○'}</span>
                          <span>Ellipse (e &lt; 1)</span>
                        </motion.button>
                        <motion.button
                          aria-label="Switch to Hyperbola mode (eccentricity greater than 1)"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setConicMode('hyperbola')}
                          className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 ${
                            conicMode === 'hyperbola' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <span>{conicMode === 'hyperbola' ? '✓' : '○'}</span>
                          <span>Hyperbola (e &gt; 1)</span>
                        </motion.button>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Semi-major axis (a):</span>
                          <span className="font-mono text-gold-400 font-bold">{semiMajorA} units</span>
                        </div>
                        <input
                          aria-label="Semi-major axis a slider"
                          type="range"
                          min={3}
                          max={8}
                          step={0.5}
                          value={semiMajorA}
                          onChange={(e) => setSemiMajorA(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Semi-minor axis (b):</span>
                          <span className="font-mono text-gold-400 font-bold">{semiMinorB} units</span>
                        </div>
                        <input
                          aria-label="Semi-minor axis b slider"
                          type="range"
                          min={2}
                          max={6}
                          step={0.5}
                          value={semiMinorB}
                          onChange={(e) => setSemiMinorB(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Satellite Orbit Angle:</span>
                          <span className="font-mono text-gold-400 font-bold">{probeAngle}°</span>
                        </div>
                        <input
                          aria-label="Satellite Orbit Angle slider"
                          type="range"
                          min={0}
                          max={360}
                          value={probeAngle}
                          onChange={(e) => setProbeAngle(parseInt(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div className="pt-2 border-t border-slate-800 space-y-1 font-mono text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Eccentricity e:</span>
                          <span className="text-emerald-400 font-bold">{conicEccentricity.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Foci (±c, 0):</span>
                          <span className="text-emerald-400 font-bold">±{focalDistanceC.toFixed(2)}, 0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Latus Rectum (2b²/a):</span>
                          <span className="text-gold-400 font-bold">{latusRectumLength.toFixed(2)}</span>
                        </div>
                        {conicMode === 'ellipse' && (
                          <div className="p-2 bg-slate-900 rounded-lg mt-2 border border-slate-800 text-[10px]">
                            <span className="text-amber-400 font-bold">Focal Sum Invariance:</span>
                            <div className="flex justify-between mt-1 text-slate-300">
                              <span>SP + S'P:</span>
                              <span className="text-amber-300 font-bold">{probePos.sumD.toFixed(2)} = 2a ({2 * semiMajorA})</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Observation Question */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs font-semibold text-slate-300 mb-2 font-mono">
                      🔍 Scientific Observation: {OBSERVATION_QUESTIONS[0].question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2" role="group" aria-label="Observation Options">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => {
                        const isCorrect = i === OBSERVATION_QUESTIONS[0].correctIndex;
                        const isSelected = observationIndex === i;
                        return (
                          <motion.button
                            key={i}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className={`p-2 text-left rounded-lg text-xs flex items-center justify-between ${
                              observationAnswered
                                ? isCorrect
                                  ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-200 font-semibold'
                                  : isSelected
                                  ? 'bg-rose-950/60 border border-rose-500 text-rose-300'
                                  : 'bg-slate-800 text-slate-400'
                                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                            }`}
                          >
                            <span>{opt}</span>
                            {observationAnswered && (
                              <span className="font-bold ml-2">
                                {isCorrect ? '✓' : isSelected ? '✗' : ''}
                              </span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: 3D COORDINATES, PLANES & OCTANTS ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* SVG 3D Isometric Projection */}
                    <div className="lg:col-span-2 bg-slate-950 rounded-2xl p-4 border border-slate-800 relative">
                      <svg viewBox="-120 -100 240 200" className="w-full h-64 md:h-80" role="img" aria-label="3D Coordinate Isometric Projection Visualizer">
                        {/* 3D Isometric Axes */}
                        <line x1="0" y1="0" x2="-80" y2="60" stroke="#ef4444" strokeWidth="2" /> {/* X Axis */}
                        <line x1="0" y1="0" x2="90" y2="0" stroke="#22c55e" strokeWidth="2" />  {/* Y Axis */}
                        <line x1="0" y1="0" x2="0" y2="-90" stroke="#38bdf8" strokeWidth="2" /> {/* Z Axis */}

                        <text x="-85" y="65" fill="#ef4444" fontSize="8" fontWeight="bold">X Axis (Towards you)</text>
                        <text x="95" y="4" fill="#22c55e" fontSize="8" fontWeight="bold">Y Axis (Right)</text>
                        <text x="4" y="-85" fill="#38bdf8" fontSize="8" fontWeight="bold">Z Axis (Up)</text>

                        {/* Coordinate Planes shading */}
                        <polygon points="0,0 -60,45 20,45 80,0" fill="rgba(99, 102, 241, 0.12)" stroke="#6366f1" strokeWidth="0.8" />
                        <text x="-15" y="30" fill="#818cf8" fontSize="6">XY Plane (z = 0)</text>

                        {/* Projected 3D Point */}
                        {(() => {
                          const isoX = -coordX * 10 + coordY * 8;
                          const isoY = coordX * 7.5 - coordZ * 10;
                          const projXY_X = -coordX * 10 + coordY * 8;
                          const projXY_Y = coordX * 7.5;
                          return (
                            <g>
                              {/* Drop lines to XY plane */}
                              <line x1={isoX} y1={isoY} x2={projXY_X} y2={projXY_Y} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.2" />
                              {/* XY Projection Point */}
                              <circle cx={projXY_X} cy={projXY_Y} r="3" fill="#f59e0b" />
                              <text x={projXY_X + 4} y={projXY_Y + 8} fill="#f59e0b" fontSize="6">
                                Foot on XY: ({coordX}, {coordY}, 0)
                              </text>
                              {/* Point P */}
                              <circle cx={isoX} cy={isoY} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                              <text x={isoX + 6} y={isoY - 4} fill="#38bdf8" fontSize="7" fontWeight="bold">
                                P({coordX}, {coordY}, {coordZ})
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    </div>

                    {/* 3D Telemetry Controls */}
                    <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                      <h4 className="font-bold text-gold-300 uppercase tracking-wider">Radar Target Coordinates</h4>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>X (Distance from YZ plane):</span>
                          <span className="font-mono text-rose-400 font-bold">{coordX}</span>
                        </div>
                        <input
                          aria-label="Target X coordinate slider"
                          type="range"
                          min={-6}
                          max={6}
                          value={coordX}
                          onChange={(e) => setCoordX(parseInt(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Y (Distance from ZX plane):</span>
                          <span className="font-mono text-emerald-400 font-bold">{coordY}</span>
                        </div>
                        <input
                          aria-label="Target Y coordinate slider"
                          type="range"
                          min={-6}
                          max={6}
                          value={coordY}
                          onChange={(e) => setCoordY(parseInt(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Z (Distance from XY plane):</span>
                          <span className="font-mono text-gold-400 font-bold">{coordZ}</span>
                        </div>
                        <input
                          aria-label="Target Z coordinate slider"
                          type="range"
                          min={-6}
                          max={6}
                          value={coordZ}
                          onChange={(e) => setCoordZ(parseInt(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono space-y-1">
                        <div className="text-[10px] text-slate-400">Octant Sign Triplet:</div>
                        <div className="text-sm font-bold text-amber-400">
                          ({coordX >= 0 ? '+' : '-'}, {coordY >= 0 ? '+' : '-'}, {coordZ >= 0 ? '+' : '-'})
                        </div>
                        <div className="text-[10px] text-slate-400 pt-1">Projections:</div>
                        <div className="text-[10px] text-slate-300">On XY: ({coordX}, {coordY}, 0)</div>
                        <div className="text-[10px] text-slate-300">On YZ: (0, {coordY}, {coordZ})</div>
                        <div className="text-[10px] text-slate-300">On ZX: ({coordX}, 0, {coordZ})</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: LIMITS & INDETERMINATE FORMS ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* SVG Graph for (x²-1)/(x-1) */}
                    <div className="lg:col-span-2 bg-slate-950 rounded-2xl p-4 border border-slate-800">
                      <svg viewBox="-20 -20 240 160" className="w-full h-64 md:h-80" role="img" aria-label="Limit Function Graph">
                        {/* Axes */}
                        <line x1="0" y1="120" x2="200" y2="120" stroke="#334155" strokeWidth="1" />
                        <line x1="20" y1="0" x2="20" y2="130" stroke="#334155" strokeWidth="1" />
                        <text x="195" y="115" fill="#64748b" fontSize="7">x</text>
                        <text x="25" y="10" fill="#64748b" fontSize="7">f(x) = (x²-1)/(x-1)</text>

                        {/* Continuous line y = x + 1 */}
                        <line x1="20" y1="90" x2="160" y2="20" stroke="#6366f1" strokeWidth="2" />

                        {/* Removable discontinuity hole at (1, 2) */}
                        <circle cx="80" cy="60" r="4" fill="#020617" stroke="#ef4444" strokeWidth="2" />
                        <text x="85" y="55" fill="#ef4444" fontSize="7">Hole at (1, 2)</text>

                        {/* Current Probe Point */}
                        {(() => {
                          const px = 20 + limitX * 60;
                          const py = 120 - limitValue * 30;
                          return (
                            <g>
                              <line x1={px} y1="120" x2={px} y2={py} stroke="#38bdf8" strokeDasharray="2 2" />
                              <circle cx={px} cy={py} r="4" fill="#38bdf8" />
                              <text x={px + 4} y={py - 6} fill="#38bdf8" fontSize="6">
                                x = {limitX.toFixed(3)}, f(x) = {limitValue.toFixed(3)}
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    </div>

                    {/* Interactive Slider & Value Table */}
                    <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Approach x towards 1.0:</span>
                          <span className="font-mono text-gold-400 font-bold">{limitX.toFixed(3)}</span>
                        </div>
                        <input
                          aria-label="Approach variable x towards 1 slider"
                          type="range"
                          min={0.5}
                          max={1.5}
                          step={0.01}
                          value={limitX}
                          onChange={(e) => setLimitX(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">At exact x = 1:</span>
                          <span className="text-rose-400 font-bold">0/0 (Undefined ✗)</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Limiting Value (x→1):</span>
                          <span className="text-emerald-400 font-bold">{limitValue.toFixed(4)} ✓</span>
                        </div>
                        <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-800 leading-relaxed">
                          Notice how as x gets arbitrarily close to 1, f(x) smoothly reaches 2.000 without hitting the 0/0 barrier.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: ONE-SIDED LIMITS & JUMP DISCONTINUITY ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-950 rounded-2xl p-4 border border-slate-800">
                      <svg viewBox="-100 -60 200 120" className="w-full h-64 md:h-80" role="img" aria-label="One-Sided Jump Discontinuity Graph">
                        {/* Axes */}
                        <line x1="-90" y1="0" x2="90" y2="0" stroke="#334155" strokeWidth="1" />
                        <line x1="0" y1="-50" x2="0" y2="50" stroke="#334155" strokeWidth="1" />

                        {/* f(x) = |x|/x = -1 for x < 0, +1 for x > 0 */}
                        <line x1="-80" y1="30" x2="0" y2="30" stroke="#ef4444" strokeWidth="2.5" />
                        <line x1="0" y1="-30" x2="80" y2="-30" stroke="#22c55e" strokeWidth="2.5" />
                        <circle cx="0" cy="30" r="3.5" fill="#020617" stroke="#ef4444" strokeWidth="1.5" />
                        <circle cx="0" cy="-30" r="3.5" fill="#020617" stroke="#22c55e" strokeWidth="1.5" />

                        <text x="-70" y="24" fill="#ef4444" fontSize="7">LHL = -1 (x &lt; 0)</text>
                        <text x="20" y="-36" fill="#22c55e" fontSize="7">RHL = +1 (x &gt; 0)</text>

                        {/* Current approach pointer */}
                        <circle cx={oneSidedX * 50} cy={oneSidedX < 0 ? 30 : -30} r="5" fill="#f59e0b" />
                      </svg>
                    </div>

                    <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Probe Position x:</span>
                          <span className="font-mono text-amber-400 font-bold">{oneSidedX.toFixed(2)}</span>
                        </div>
                        <input
                          aria-label="One-sided probe position slider"
                          type="range"
                          min={-1}
                          max={1}
                          step={0.05}
                          value={oneSidedX}
                          onChange={(e) => setOneSidedX(parseFloat(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Current Side:</span>
                          <span className={oneSidedX < 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {oneSidedX < 0 ? '← Left Side (x < 0)' : '→ Right Side (x > 0)'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">One-Sided Value:</span>
                          <span className="text-white font-bold">{oneSidedX < 0 ? '-1.0' : '+1.0'}</span>
                        </div>
                        <div className="p-2 bg-rose-950/40 border border-rose-800/40 rounded text-[10px] text-rose-300 flex items-center gap-1.5">
                          <span aria-hidden="true">✗</span>
                          <span>Since LHL (-1) ≠ RHL (+1), lim(x→0) |x|/x does not exist!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: FIRST PRINCIPLES SECANT TO TANGENT ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* SVG Parabola & Secant/Tangent */}
                    <div className="lg:col-span-2 bg-slate-950 rounded-2xl p-4 border border-slate-800">
                      <svg viewBox="-20 -20 200 160" className="w-full h-64 md:h-80" role="img" aria-label="First Principles Secant to Tangent Rotation Graph">
                        {/* Axes */}
                        <line x1="0" y1="130" x2="180" y2="130" stroke="#334155" strokeWidth="1" />
                        <line x1="10" y1="0" x2="10" y2="140" stroke="#334155" strokeWidth="1" />

                        {/* Parabola y = x² */}
                        <path d="M 10 130 Q 70 130 150 10" stroke="#6366f1" strokeWidth="2" fill="none" />

                        {/* Secant line through P(x, x²) and Q(x+h, (x+h)²) */}
                        {(() => {
                          const px = 10 + derivX * 40;
                          const py = 130 - (derivX ** 2) * 20;
                          const qx = 10 + (derivX + derivH) * 40;
                          const qy = 130 - ((derivX + derivH) ** 2) * 20;
                          return (
                            <g>
                              {/* Secant line */}
                              <line
                                x1={px - 20}
                                y1={py + 20 * (secantSlope / 2)}
                                x2={qx + 20}
                                y2={qy - 20 * (secantSlope / 2)}
                                stroke="#f59e0b"
                                strokeWidth="1.5"
                              />
                              <circle cx={px} cy={py} r="4" fill="#38bdf8" />
                              <circle cx={qx} cy={qy} r="4" fill="#22c55e" />
                              <text x={px - 5} y={py - 6} fill="#38bdf8" fontSize="6">P({derivX}, {derivX ** 2})</text>
                              <text x={qx + 4} y={qy - 6} fill="#22c55e" fontSize="6">Q(x+h, y+Δy)</text>
                            </g>
                          );
                        })()}
                      </svg>
                    </div>

                    {/* Interactive Increment Slider */}
                    <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Point x:</span>
                          <span className="font-mono text-gold-400 font-bold">{derivX.toFixed(1)}</span>
                        </div>
                        <input
                          aria-label="Derivative evaluation point x slider"
                          type="range"
                          min={0.5}
                          max={2.0}
                          step={0.1}
                          value={derivX}
                          onChange={(e) => setDerivX(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Secant Increment h (→ 0):</span>
                          <span className="font-mono text-amber-400 font-bold">{derivH.toFixed(3)}</span>
                        </div>
                        <input
                          aria-label="Secant increment h slider"
                          type="range"
                          min={0.01}
                          max={1.5}
                          step={0.01}
                          value={derivH}
                          onChange={(e) => setDerivH(parseFloat(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Secant Slope Δy/h:</span>
                          <span className="text-amber-400 font-bold">{secantSlope.toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Exact Derivative (2x):</span>
                          <span className="text-emerald-400 font-bold">{(2 * derivX).toFixed(3)} ✓</span>
                        </div>
                        <p className="text-[10px] text-slate-400 pt-1 leading-relaxed">
                          As h shrinks to 0, secant slope converges exactly to tangent gradient 2x.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Previous Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-400 font-mono">
                  Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Next Lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide((s) => s + 1)}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter Free Sandbox"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gold-300">Free Flight Telemetry Sandbox</h3>
              <p className="text-xs text-slate-400">
                Explore all conic shapes, radar coordinates, and derivative tools without grading constraints.
              </p>
            </div>
            <motion.button
              aria-label="Proceed to Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            {/* Live 2D HTML Canvas Radar Display */}
            <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
              <canvas ref={canvasRef} width={400} height={260} aria-label="ISRO Telemetry Radar live canvas display" className="w-full max-w-md rounded-lg shadow-inner" />
            </div>

            {/* Sandbox Slider Controls */}
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Semi-Major a:</span>
                  <span className="font-mono text-gold-400 font-bold">{semiMajorA}</span>
                </div>
                <input
                  aria-label="Sandbox semi-major axis slider"
                  type="range"
                  min={3}
                  max={8}
                  value={semiMajorA}
                  onChange={(e) => setSemiMajorA(parseFloat(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Semi-Minor b:</span>
                  <span className="font-mono text-gold-400 font-bold">{semiMinorB}</span>
                </div>
                <input
                  aria-label="Sandbox semi-minor axis slider"
                  type="range"
                  min={2}
                  max={6}
                  value={semiMinorB}
                  onChange={(e) => setSemiMinorB(parseFloat(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span>Orbit Animation:</span>
                <motion.button
                  aria-label={isAnimatingOrbit ? "Pause orbit animation" : "Resume orbit animation"}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAnimatingOrbit(!isAnimatingOrbit)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1.5 ${
                    isAnimatingOrbit ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <span aria-hidden="true">{isAnimatingOrbit ? '⏸' : '▶'}</span>
                  <span>{isAnimatingOrbit ? 'Active' : 'Paused'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base md:text-lg font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </h2>
              <p className="text-xs text-slate-400 font-mono">Competency: {challenge.competencyLevel.toUpperCase()}</p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Progress: {Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}%
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="group" aria-label="Challenge Options">
                  {challenge.options.map((opt, i) => {
                    const isSelected = selectedMcqAnswer === i;
                    const isCorrect = i === challenge.correctIndex;
                    return (
                      <motion.button
                        key={i}
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation || answerRevealed}
                        className={`p-4 text-left rounded-xl text-sm transition-all border flex items-center justify-between ${
                          showExplanation
                            ? isCorrect
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold'
                              : isSelected
                              ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                              : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                            : 'bg-slate-800 border-slate-700 hover:border-gold-500 text-slate-200 hover:bg-slate-800/90'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center leading-6 text-xs mr-2 font-mono">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {showExplanation && (
                          <span className="font-bold ml-2 text-sm">
                            {isCorrect ? '✓ Correct' : isSelected ? '✗ Incorrect' : ''}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}

            {/* TYPE 2: DRAG-LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Draggable Conic Element Labels">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-gold-700 text-white rounded-lg cursor-grab text-xs font-bold"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 400 200" className="w-full h-48" role="img" aria-label="Conic Section Drop Target Diagram">
                    <ellipse cx="200" cy="100" rx="140" ry="70" fill="none" stroke="#475569" strokeWidth="2" />
                    {/* Focus Target */}
                    <rect
                      x="260"
                      y="85"
                      width="100"
                      height="30"
                      rx="6"
                      fill="#1e293b"
                      stroke="#6366f1"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_focus')}
                    />
                    <text x="310" y="104" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      {droppedLabels.target_focus ? `✓ ${droppedLabels.target_focus}` : 'Drop Focus S'}
                    </text>

                    {/* Vertex Target */}
                    <rect
                      x="320"
                      y="140"
                      width="70"
                      height="30"
                      rx="6"
                      fill="#1e293b"
                      stroke="#f59e0b"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_vertex')}
                    />
                    <text x="355" y="159" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      {droppedLabels.target_vertex ? `✓ ${droppedLabels.target_vertex}` : 'Drop Vertex A'}
                    </text>

                    {/* Directrix Target */}
                    <rect
                      x="10"
                      y="20"
                      width="110"
                      height="30"
                      rx="6"
                      fill="#1e293b"
                      stroke="#ef4444"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_directrix')}
                    />
                    <text x="65" y="39" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      {droppedLabels.target_directrix ? `✓ ${droppedLabels.target_directrix}` : 'Drop Directrix'}
                    </text>

                    {/* Minor Vertex Target */}
                    <rect
                      x="150"
                      y="10"
                      width="100"
                      height="30"
                      rx="6"
                      fill="#1e293b"
                      stroke="#ec4899"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_minor')}
                    />
                    <text x="200" y="29" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      {droppedLabels.target_minor ? `✓ ${droppedLabels.target_minor}` : 'Drop Minor Vertex'}
                    </text>
                  </svg>
                </div>

                <motion.button
                  aria-label="Verify Mapped Labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mapped Labels
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, i) => (
                  <motion.div
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${i + 1}: ${item}. Drag to reorder`}
                    draggable
                    onDragStart={() => setDraggedItem(String(i))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, i);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 cursor-grab flex items-center gap-3 text-xs md:text-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-mono text-xs">
                      {i + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Submit Order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Submit Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  aria-label={`Enter numerical telemetry value in ${challenge.unit || 'units'}`}
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
                <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                <motion.button
                  aria-label="Submit Telemetry numeric answer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl font-bold text-xs"
                >
                  Submit Telemetry
                </motion.button>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-mono">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Available algebraic tokens">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add token ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2" role="region" aria-label="Constructed expression">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-gold-600 text-white rounded font-mono text-xs flex items-center gap-1"
                    >
                      {part}
                      <button
                        aria-label={`Remove token ${part} at position ${i + 1}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 ml-1 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 font-mono">Click tokens above to construct sequence...</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Algebraic Construction"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Algebraic Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-950 border border-amber-800/40 rounded-xl space-y-3"
              >
                <h4 className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <span aria-hidden="true">✓</span>
                  <span>Step-by-Step Flight Telemetry Analysis:</span>
                </h4>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-300 leading-relaxed"
                    >
                      <span className="text-amber-400 font-bold">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Show Next Derivation Step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission' : 'Next Challenge'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-800/40 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              🎉 Telemetry Mission Accomplished!
            </h2>
            <p className="text-emerald-400 font-mono text-sm mb-4">
              Final Score: {Math.max(0, 100 - errors * 5)}% | Mastery Level: {masteryLevel.toUpperCase()}
            </p>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              {errors === 0
                ? 'Flawless precision! You have completely mastered conics, 3D vector coordinates, limit theorems, and first-principles derivatives.'
                : errors <= 3
                ? 'Outstanding performance! You possess robust analytical calculus and conics reasoning.'
                : 'Good effort! Review the misconception profile below to solidify your foundations before orbital re-entry.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-slate-900 border border-rose-800/40 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 font-mono">Your Targeted Misconception Profile:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">✗ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-5 bg-gradient-to-r from-gold-950/80 via-slate-900 to-gold-950/80 border border-gold-500/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-gold-950/50">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-2xl font-mono">
                📅
              </div>
              <div>
                <h4 className="text-sm font-bold text-gold-200 font-mono uppercase tracking-wider">
                  Spaced Repetition Schedule (SRS Active)
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Based on your performance ({errors} error{errors === 1 ? '' : 's'}), optimal retention review is in:{' '}
                  <span className="text-amber-300 font-bold underline decoration-amber-400/50 underline-offset-2">
                    {errors === 0 ? '7 days (Review in 7 days)' : errors <= 3 ? '3 days (Review in 3 days)' : '1 day (Review tomorrow)'}
                  </span>
                </p>
              </div>
            </div>
            <div className="px-4 py-2 bg-gold-900/50 border border-gold-600/40 rounded-xl font-mono text-center">
              <div className="text-[10px] text-gold-300 uppercase font-bold tracking-widest">Next Review</div>
              <div className="text-lg font-bold text-white">{errors === 0 ? '+7 Days' : errors <= 3 ? '+3 Days' : '+1 Day'}</div>
            </div>
          </div>

          {/* Real World Activity */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <h3 className="text-base font-bold text-white mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs md:text-sm text-slate-300 mb-4">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex gap-2">
                  <span className="font-mono text-gold-400 font-bold">{i + 1}.</span>
                  <span className="text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── TOAST FX COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Telemetry Locked!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_MathematicsEllipseStandardEquationSim;
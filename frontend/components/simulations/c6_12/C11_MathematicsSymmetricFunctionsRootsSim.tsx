'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC / JEE MATHEMATICS SYLLABUS NODES ───
const NODE_C11_MATH_102 = 'c11_math_102'; // Vieta's formulas & symmetric functions
const NODE_C11_MATH_103 = 'c11_math_103'; // Transformation of roots
const NODE_C11_MATH_104 = 'c11_math_104'; // Rotation theorem in complex numbers
const NODE_C11_MATH_105 = 'c11_math_105'; // Complex locus problems
const NODE_C11_MATH_106 = 'c11_math_106'; // Parabola tangents & normals
const NODE_C11_MATH_107 = 'c11_math_107'; // Ellipse & Hyperbola tangents/normals
const NODE_C11_MATH_108 = 'c11_math_108'; // Chords, Polars & Conic Polar form
const NODE_C11_MATH_109 = 'c11_math_109'; // General solution of trig equations

const ALL_MATH_NODES = [
  NODE_C11_MATH_102,
  NODE_C11_MATH_103,
  NODE_C11_MATH_104,
  NODE_C11_MATH_105,
  NODE_C11_MATH_106,
  NODE_C11_MATH_107,
  NODE_C11_MATH_108,
  NODE_C11_MATH_109,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The ISRO Trajectory & Optical Radar Lab',
  intro: 'You are a flight-dynamics and signals mathematician at ISRO Bengaluru. Deep-space orbiters, parabolic reflector antennas, radar wave rotations in the complex plane, and periodic telemetry tracking all demand flawless mastery of polynomial roots, conics, complex geometry, and trigonometric general solutions.',
  context: 'Your mission: Calibrate rocket staging polynomials, target hyperbolic orbital flybys, configure parabolic antenna normals, and synchronize periodic radar pings using exact algebraic-geometric transformations.',
};

// ─── BRILLIANT-STYLE PREDICTION QUESTIONS (PREDICT-THEN-CHECK) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_math_001',
    nodeId: NODE_C11_MATH_102,
    question: 'If you change coefficient b from -4 to -8 in the quadratic ax² + bx + c = 0 (with a = 1), what will happen to the sum of roots (α + β)?',
    options: [
      'The sum of roots (α + β) will double from 4 to 8',
      'The sum of roots (α + β) will decrease from 4 to -8',
      'The sum of roots remains constant because a does not change',
      'The sum of roots becomes imaginary',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 1, drag the Coefficient b slider from -4 to -8 and observe how the calculated Sum α + β updates to 8.00.',
    explanation: 'By Vieta’s formulas, sum of roots = -b/a. When a = 1, b = -4 gives sum = 4, and b = -8 gives sum = -(-8)/1 = 8. The sum strictly doubles.',
  },
  {
    id: 'pred_math_002',
    nodeId: NODE_C11_MATH_104,
    question: 'When rotating the vector (z₂ - z₁) by θ = 90° (π/2 rad) anticlockwise about pivot z₁, what happens to the modulus (length) of the vector?',
    options: [
      'The vector length remains strictly unchanged because |e^(iθ)| = 1',
      'The vector length is scaled by a factor of π/2',
      'The vector length doubles due to imaginary multiplication',
      'The vector length shrinks to zero at right angles',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 2, slide the Rotation Angle θ to 90° and note that the vector length circle radius is perfectly preserved.',
    explanation: 'Multiplication by e^(iθ) represents an isometric rotation because |e^(iθ)| = |cos θ + i sin θ| = √(cos²θ + sin²θ) = 1. Distances are invariant under pure complex rotation.',
  },
];

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS (WHAT DO YOU NOTICE?) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_math_001',
    nodeId: NODE_C11_MATH_102,
    question: 'In Lab 1, when the discriminant D = b² - 4ac drops below zero (e.g., a=1, b=-4, c=5 gives D = -4), what do you notice about the positions of roots α and β on the Argand plane?',
    options: [
      'They leave the real axis and mirror each other as a complex conjugate pair across the horizontal Re axis',
      'They collapse onto a single double root on the imaginary axis',
      'Both roots disappear entirely from the Argand coordinate space',
      'They move along the real axis in opposite directions towards infinity',
    ],
    observableOptions: [
      'They leave the real axis and mirror each other as a complex conjugate pair across the horizontal Re axis',
      'They collapse onto a single double root on the imaginary axis',
      'Both roots disappear entirely from the Argand coordinate space',
      'They move along the real axis in opposite directions towards infinity',
    ],
    correctIndex: 0,
    explanation: 'Complex roots of real polynomials always occur in conjugate pairs (u ± iv). On the Argand plane, they share the identical real coordinate u = -b/(2a) and have vertically opposite imaginary coordinates ±√(4ac - b²)/(2a).',
  },
  {
    id: 'obs_math_002',
    nodeId: NODE_C11_MATH_106,
    question: 'In Lab 4 (Parabola Tangent & Normal), as you increase the tangent slope m from 1.0 to 3.0, what do you observe about the y-intercept c = a/m of the tangent line?',
    options: [
      'The intercept c steadily decreases towards zero because c is inversely proportional to m',
      'The intercept c increases proportionally with the slope',
      'The intercept c remains fixed at y = a',
      'The intercept becomes negative immediately',
    ],
    observableOptions: [
      'The intercept c steadily decreases towards zero because c is inversely proportional to m',
      'The intercept c increases proportionally with the slope',
      'The intercept c remains fixed at y = a',
      'The intercept becomes negative immediately',
    ],
    correctIndex: 0,
    explanation: 'For a parabola y² = 4ax, the tangency condition in slope form is y = mx + a/m. As the line becomes steeper (increasing m), the y-intercept c = a/m decreases towards 0.',
  },
];

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In orbital design, a polynomial path satisfies 2x² - 6x + 5 = 0 with complex conjugate roots α and β. Without computing the imaginary square roots, what is the exact sum of the squared distances α² + β²?',
  options: [
    'α² + β² = 4  (Derived directly from (α+β)² - 2αβ = 3² - 2(2.5))',
    'α² + β² = 9  (Simply the square of the sum of roots: 3²)',
    'α² + β² = -1 (Cannot be computed because the roots are complex)',
    'α² + β² = 14 (Derived by squaring each coefficient)',
  ],
  correctIndex: 0,
  hintAfter: 'Francois Viète showed us in 1591: Symmetric functions work on ALL roots — real or imaginary — purely via coefficient ratios!',
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

// ─── 22 COMPREHENSIVE CHALLENGES ACROSS 8 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. NODE 102 - Vieta foundation
  {
    id: 'ch_math_001',
    nodeId: NODE_C11_MATH_102,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For the quadratic 3x² - 8x + 12 = 0 with roots α and β, what are the elementary symmetric values (α + β) and (αβ)?',
    options: [
      'α + β = 8/3, αβ = 4',
      'α + β = -8/3, αβ = 4',
      'α + β = 8/3, αβ = -4',
      'α + β = -8/3, αβ = 12',
    ],
    correctIndex: 0,
    explanation: 'Vieta’s formulas state α + β = -b/a = -(-8)/3 = 8/3, and αβ = c/a = 12/3 = 4. Always maintain the sign alternation: minus on b, plus on c.',
    hints: [
      'Recall α + β = -b/a and αβ = c/a for ax² + bx + c = 0.',
      'Here a = 3, b = -8, and c = 12.',
      'Substitute: -(-8)/3 = 8/3 and 12/3 = 4.',
    ],
    misconceptionIndex: 0,
  },

  // 2. NODE 102 - Symmetric identity application
  {
    id: 'ch_math_002',
    nodeId: NODE_C11_MATH_102,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If α, β are roots of x² - 5x + 3 = 0, evaluate 1/α + 1/β.',
    correctAnswer: 1.667,
    tolerance: 0.05,
    unit: 'ratio (5/3)',
    explanation: '1/α + 1/β = (α + β) / (αβ). By Vieta, α + β = 5, αβ = 3. Thus the ratio is 5/3 ≈ 1.667.',
    hints: [
      'Combine the fractions over a common denominator αβ.',
      '1/α + 1/β = (α + β)/(αβ).',
      'Read off α+β = 5 and αβ = 3 from x² - 5x + 3 = 0; divide 5 by 3 ≈ 1.667.',
    ],
    misconceptionIndex: 1,
  },

  // 3. NODE 103 - Reciprocal root transformation
  {
    id: 'ch_math_003',
    nodeId: NODE_C11_MATH_103,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'To form an equation whose roots are the reciprocals 1/α and 1/β of ax² + bx + c = 0 (c ≠ 0), which substitution is made?',
    options: [
      'Substitute x → 1/x, giving cx² + bx + a = 0',
      'Substitute x → -x, giving ax² - bx + c = 0',
      'Substitute x → x², giving a²x² + b²x + c² = 0',
      'Substitute x → -1/x, giving -cx² + bx - a = 0',
    ],
    correctIndex: 0,
    explanation: 'Replacing x by 1/x yields a(1/x)² + b(1/x) + c = 0. Multiplying through by x² produces cx² + bx + a = 0. The coefficients simply reverse order.',
    hints: [
      'If the new root is y = 1/x, then the old variable is x = 1/y.',
      'Substitute x = 1/y into the original equation ax² + bx + c = 0.',
      'Clear the y² denominator: you get cy² + by + a = 0.',
    ],
    misconceptionIndex: 2,
  },

  // 4. NODE 103 - Drag sort root transformation workflow
  {
    id: 'ch_math_004',
    nodeId: NODE_C11_MATH_103,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical steps to construct an equation with roots α² and β² from 2x² - 4x + 1 = 0 using symmetric functions:',
    sortItems: [
      'Calculate elementary symmetric sums: α + β = 2, αβ = 0.5',
      'Compute new sum: S = α² + β² = (α+β)² - 2αβ = 4 - 1 = 3',
      'Compute new product: P = (αβ)² = (0.5)² = 0.25',
      'Form new quadratic: y² - Sy + P = 0 → y² - 3y + 0.25 = 0 (or 4y² - 12y + 1 = 0)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First extract original sum and product, next compute the transformed sum S and transformed product P, then assemble into y² - Sy + P = 0.',
    hints: [
      'Start by finding α+β and αβ from the original quadratic.',
      'Next, use algebraic identities to find the new sum S = α² + β².',
      'Find the new product P, and write x² - Sx + P = 0.',
    ],
  },

  // 5. NODE 104 - Complex Rotation Theorem
  {
    id: 'ch_math_005',
    nodeId: NODE_C11_MATH_104,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The point z₂ = 4 + 2i is rotated anticlockwise by 90° (π/2) about the pivot point z₁ = 1 + 2i. What is the new complex coordinate z₃?',
    options: [
      'z₃ = 1 + 5i',
      'z₃ = 4 + 5i',
      'z₃ = -2 + 2i',
      'z₃ = 1 - i',
    ],
    correctIndex: 0,
    explanation: 'By the Rotation Theorem: z₃ = z₁ + (z₂ - z₁)e^{iπ/2} = (1 + 2i) + (4 + 2i - (1 + 2i)) · i = (1 + 2i) + (3) · i = 1 + 5i. The displaced vector of length 3 along the real axis swung 90° upward.',
    hints: [
      'Use the formula: z₃ = z₁ + (z₂ - z₁) · e^(iθ).',
      'Here z₂ - z₁ = (4 + 2i) - (1 + 2i) = 3.',
      'Multiply by e^(iπ/2) = i to get 3i, then add z₁ = 1 + 2i → 1 + 5i.',
    ],
    misconceptionIndex: 3,
  },

  // 6. NODE 104 - Equilateral triangle complex condition
  {
    id: 'ch_math_006',
    nodeId: NODE_C11_MATH_104,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If z₁, z₂, z₃ form the vertices of an equilateral triangle taken anticlockwise with ω = e^{i2π/3}, which algebraic condition is necessary and sufficient?',
    options: [
      'z₁ + ωz₂ + ω²z₃ = 0',
      'z₁ + z₂ + z₃ = 0',
      'z₁² + z₂² + z₃² = 0',
      'z₁z₂z₃ = 1',
    ],
    correctIndex: 0,
    explanation: 'Rotating vector (z₂ - z₁) by 60° (e^{iπ/3} = -ω²) gives (z₃ - z₁). Simplifying with 1 + ω + ω² = 0 yields the classic condition z₁ + ωz₂ + ω²z₃ = 0.',
    hints: [
      'Each internal angle of an equilateral triangle is π/3 (60°).',
      'Cube root of unity ω satisfies 1 + ω + ω² = 0 and ω³ = 1.',
      'The rotation of edges connects the vertices through linear combinations with powers of ω.',
    ],
  },

  // 7. NODE 105 - Complex Locus Circle
  {
    id: 'ch_math_007',
    nodeId: NODE_C11_MATH_105,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For a complex number z satisfying |z - 3 - 4i| = 2, what is the MAXIMUM possible value of |z| from the origin?',
    correctAnswer: 7,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'The locus is a circle centered at c = 3 + 4i with radius r = 2. Distance from origin to center is |c| = √(3² + 4²) = 5. Maximum distance is |c| + r = 5 + 2 = 7.',
    hints: [
      'Identify the center c and radius r of the circle |z - c| = r.',
      'Center c = 3 + 4i, so distance from origin |c| = √(3² + 4²) = 5.',
      'The furthest point on the circle lies collinear with origin and center: max |z| = |c| + r.',
    ],
  },

  // 8. NODE 105 - Perpendicular bisector locus
  {
    id: 'ch_math_008',
    nodeId: NODE_C11_MATH_105,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What geometric curve in the Argand plane is described by |z - 2| = |z + 2i|?',
    options: [
      'The perpendicular bisector line y = -x',
      'A circle of radius 2 centered at the origin',
      'An ellipse with foci at 2 and -2i',
      'The straight line segment connecting (2, 0) and (0, -2)',
    ],
    correctIndex: 0,
    explanation: '|z - z₁| = |z - z₂| represents the perpendicular bisector between z₁ = (2,0) and z₂ = (0,-2). Midpoint is (1, -1) and slope of segment is -1, so normal slope is +1 or algebraic expansion gives x + y = 0, i.e., y = -x.',
    hints: [
      'Equidistance from two fixed points defines a perpendicular bisector line.',
      'Substitute z = x + iy: (x-2)² + y² = x² + (y+2)².',
      'Expand: x² - 4x + 4 + y² = x² + y² + 4y + 4 → -4x = 4y → y = -x.',
    ],
    misconceptionIndex: 4,
  },

  // 9. NODE 106 - Parabola Tangent Point form
  {
    id: 'ch_math_009',
    nodeId: NODE_C11_MATH_106,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the point form equation of the tangent to the parabola y² = 4ax at the point (x₁, y₁)?',
    options: [
      'yy₁ = 2a(x + x₁)',
      'yy₁ = 4a(x + x₁)',
      'y - y₁ = 2a(x - x₁)',
      'xx₁ + yy₁ = 4a²',
    ],
    correctIndex: 0,
    explanation: 'By implicit differentiation 2y(dy/dx) = 4a ⇒ dy/dx = 2a/y₁. Tangent line is y - y₁ = (2a/y₁)(x - x₁). Multiplying by y₁ and using y₁² = 4ax₁ gives yy₁ = 2a(x + x₁).',
    hints: [
      'Apply the standard T = 0 replacement rule: y² → yy₁ and x → (x + x₁)/2.',
      'Multiply: 4a · (x + x₁)/2 = 2a(x + x₁).',
      'Hence yy₁ = 2a(x + x₁).',
    ],
  },

  // 10. NODE 106 - Parabola Slope Form & Tangency
  {
    id: 'ch_math_010',
    nodeId: NODE_C11_MATH_106,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For the parabola y² = 12x, which line with slope m = 3 is tangent to the curve?',
    options: [
      'y = 3x + 1',
      'y = 3x + 4',
      'y = 3x + 12',
      'y = 3x + 0.33',
    ],
    correctIndex: 0,
    explanation: 'Here 4a = 12 ⇒ a = 3. The slope form of tangent to y² = 4ax is y = mx + a/m. With m = 3 and a = 3, c = a/m = 3/3 = 1. Thus y = 3x + 1.',
    hints: [
      'Find the focal parameter a from 4a = 12.',
      'Formula for tangent in slope form is y = mx + a/m.',
      'Substitute m = 3 and a = 3: c = 3/3 = 1.',
    ],
  },

  // 11. NODE 106 - Parabola Director Circle Drag Label
  {
    id: 'ch_math_011',
    nodeId: NODE_C11_MATH_106,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Map the key geometric lines and loci of the parabola y² = 4ax to their correct analytical descriptions:',
    dragItems: [
      { label: 'Director Circle (Degenerate)', targetId: 'target_directrix' },
      { label: 'Tangent at Vertex', targetId: 'target_yaxis' },
      { label: 'Axis of Symmetry', targetId: 'target_xaxis' },
      { label: 'Focal Parameter a', targetId: 'target_focus' },
    ],
    correctMapping: {
      target_directrix: 'Director Circle (Degenerate)',
      target_yaxis: 'Tangent at Vertex',
      target_xaxis: 'Axis of Symmetry',
      target_focus: 'Focal Parameter a',
    },
    explanation: 'For a parabola, perpendicular tangents always intersect on the directrix x = -a (degenerate director circle). Vertex tangent is x = 0 (y-axis), axis of symmetry is y = 0, and focus is at (a, 0).',
    hints: [
      'Where do perpendicular tangents to a parabola meet? On the directrix!',
      'The tangent at (0,0) is vertical (the y-axis).',
      'The focus is located on the x-axis at distance a from vertex.',
    ],
  },

  // 12. NODE 107 - Ellipse vs Hyperbola Condition of Tangency
  {
    id: 'ch_math_012',
    nodeId: NODE_C11_MATH_107,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Contrast the condition of tangency for line y = mx + c touching an ellipse x²/a² + y²/b² = 1 versus a hyperbola x²/a² - y²/b² = 1:',
    options: [
      'Ellipse: c² = a²m² + b² ; Hyperbola: c² = a²m² - b²',
      'Ellipse: c² = a²m² - b² ; Hyperbola: c² = a²m² + b²',
      'Ellipse: c = a/m ; Hyperbola: c = -a/m',
      'Both have identical condition: c² = a²m² + b²',
    ],
    correctIndex: 0,
    explanation: 'The sign of y² directly dictates the sign in the discriminant. For an ellipse (+y²/b²), c² = a²m² + b². For a hyperbola (-y²/b²), c² = a²m² - b².',
    hints: [
      'Look at the signs in the standard equations.',
      'Ellipse has + between terms, so tangency has +b².',
      'Hyperbola has - between terms, so tangency has -b².',
    ],
    misconceptionIndex: 5,
  },

  // 13. NODE 107 - Hyperbola Tangent Slope restriction
  {
    id: 'ch_math_013',
    nodeId: NODE_C11_MATH_107,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For the hyperbola x²/16 - y²/9 = 1, why is it impossible to draw a real tangent with slope m = 0.5?',
    options: [
      'Because a²m² - b² = 16(0.25) - 9 = 4 - 9 = -5 < 0, giving imaginary intercept c',
      'Because a hyperbola cannot have any tangents with positive slope',
      'Because the slope m must be strictly greater than a/b = 4/3',
      'Because 0.5 is rational and tangent slopes on conics must be irrational',
    ],
    correctIndex: 0,
    explanation: 'For a hyperbola, c = √(a²m² - b²). Here a² = 16, b² = 9. With m = 0.5, a²m² - b² = 4 - 9 = -5. The intercept is imaginary because the slope m = 0.5 is flatter than the asymptote slope b/a = 3/4 = 0.75.',
    hints: [
      'Calculate a²m² - b² with a = 4, b = 3, m = 0.5.',
      'Check if the value inside the square root is positive or negative.',
      'A line flatter than the asymptotes (|m| < b/a) cuts both branches rather than touching.',
    ],
  },

  // 14. NODE 107 - Ellipse Normal Equation
  {
    id: 'ch_math_014',
    nodeId: NODE_C11_MATH_107,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'What is the equation of the normal to the ellipse x²/a² + y²/b² = 1 at the point (x₁, y₁)?',
    options: [
      '(a²x / x₁) - (b²y / y₁) = a² - b²',
      '(a²x / x₁) + (b²y / y₁) = a² + b²',
      '(x / x₁) - (y / y₁) = 1',
      '(xx₁ / a²) - (yy₁ / b²) = a² - b²',
    ],
    correctIndex: 0,
    explanation: 'The slope of tangent is -(b²x₁)/(a²y₁), so normal slope is (a²y₁)/(b²x₁). In point-slope form: y - y₁ = (a²y₁ / b²x₁)(x - x₁), which rearranges to (a²x/x₁) - (b²y/y₁) = a² - b².',
    hints: [
      'Normal is perpendicular to tangent: slope is negative reciprocal.',
      'For ellipse, the normal formula features minus signs on both sides: a²x/x₁ - b²y/y₁ = a² - b².',
      'Contrast with hyperbola normal which has plus signs: a²x/x₁ + b��y/y₁ = a² + b².',
    ],
    misconceptionIndex: 6,
  },

  // 15. NODE 108 - Chord of contact & Polar
  {
    id: 'ch_math_015',
    nodeId: NODE_C11_MATH_108,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Tangents are drawn from the external point (4, 3) to the parabola y² = 8x. What is the Cartesian equation of the chord of contact?',
    options: [
      '3y = 4(x + 4)  →  4x - 3y + 16 = 0',
      '3y = 8(x + 4)  →  8x - 3y + 32 = 0',
      'y - 3 = 4(x - 4)',
      'x² + y² = 25',
    ],
    correctIndex: 0,
    explanation: 'For y² = 4ax (here 4a = 8 ⇒ 2a = 4), the chord of contact from (x₁, y₁) is yy₁ = 2a(x + x₁). Substituting (4, 3) yields 3y = 4(x + 4) ⇒ 4x - 3y + 16 = 0.',
    hints: [
      'Use T = 0 formula: yy₁ = 2a(x + x₁).',
      'Here 4a = 8, so 2a = 4.',
      'Substitute x₁ = 4 and y₁ = 3: 3y = 4(x + 4).',
    ],
  },

  // 16. NODE 108 - Polar Conic Classification
  {
    id: 'ch_math_016',
    nodeId: NODE_C11_MATH_108,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A telemetry sensor records an orbital track in polar coordinates as r = 12 / (3 + 3 cos θ). By putting into standard form r = l / (1 + e cos θ), identify the conic and its eccentricity e:',
    options: [
      'Parabola with e = 1 (Standard form r = 4 / (1 + 1 cos θ))',
      'Ellipse with e = 0.5',
      'Hyperbola with e = 3',
      'Circle with e = 0',
    ],
    correctIndex: 0,
    explanation: 'Divide numerator and denominator by 3: r = 4 / (1 + 1 cos θ). Comparing with r = l / (1 + e cos θ) gives semi-latus rectum l = 4 and eccentricity e = 1. Since e = 1, it is a parabola.',
    hints: [
      'Normalize the denominator constant term to 1 by dividing top and bottom by 3.',
      'r = (12/3) / (3/3 + 3/3 cos θ) = 4 / (1 + 1 cos θ).',
      'e is the coefficient of cos θ in the normalized denominator. e = 1 indicates a parabola.',
    ],
  },

  // 17. NODE 108 - Pair of tangents SS₁ = T²
  {
    id: 'ch_math_017',
    nodeId: NODE_C11_MATH_108,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'For the ellipse S = x²/16 + y²/9 - 1 = 0 and point P(8, 6), evaluate the scalar factor S₁ in the pair-of-tangents equation SS₁ = T².',
    correctAnswer: 7,
    tolerance: 0.1,
    unit: 'scalar',
    explanation: 'S₁ is the value of S at (8, 6): S₁ = (8²)/16 + (6²)/9 - 1 = 64/16 + 36/9 - 1 = 4 + 4 - 1 = 7.',
    hints: [
      'S₁ is found by simply plugging (x₁, y₁) into S(x, y).',
      'Calculate 8²/16 = 64/16 = 4.',
      'Calculate 6²/9 = 36/9 = 4, then evaluate 4 + 4 - 1 = 7.',
    ],
  },

  // 18. NODE 109 - General Solution of sin x = sin α
  {
    id: 'ch_math_018',
    nodeId: NODE_C11_MATH_109,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the complete general solution of sin x = sin α for n ∈ ℤ?',
    options: [
      'x = nπ + (-1)ⁿ α',
      'x = 2nπ ± α',
      'x = nπ + α',
      'x = 2nπ + (-1)ⁿ α',
    ],
    correctIndex: 0,
    explanation: 'Because sine is positive in quadrants I and II and negative in III and IV, the solutions alternate: x = 2kπ + α (for even n) and x = (2k+1)π - α (for odd n). Compactly, x = nπ + (-1)ⁿ α.',
    hints: [
      'Sine shares values at α and π - α.',
      'The factor (-1)ⁿ automatically adds �� for even n and subtracts α for odd n.',
      'The correct formula is x = nπ + (-1)ⁿ α, n ∈ ℤ.',
    ],
    misconceptionIndex: 7,
  },

  // 19. NODE 109 - Squared Trig general solution
  {
    id: 'ch_math_019',
    nodeId: NODE_C11_MATH_109,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the general solution to sin² x = 3/4 (which is sin²(π/3)) for n ∈ ℤ?',
    options: [
      'x = nπ ± π/3',
      'x = 2nπ ± π/3',
      'x = nπ + (-1)ⁿ (π/3)',
      'x = 2nπ + π/3',
    ],
    correctIndex: 0,
    explanation: 'The squared trigonometric equations sin² x = sin² α, cos² x = cos² α, and tan² x = tan² α all possess the identical general solution x = nπ ± α because squaring halves the period from 2π to π.',
    hints: [
      'Squaring removes the sign distinction between quadrants.',
      'The period of sin² x is π.',
      'All squared trig forms collapse to x = nπ ± α.',
    ],
  },

  // 20. NODE 109 - R-method Equation
  {
    id: 'ch_math_020',
    nodeId: NODE_C11_MATH_109,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Solve the harmonic signal equation √3 sin x + cos x = √2 for general x (n ∈ ℤ):',
    options: [
      'x = nπ + (-1)ⁿ (π/4) - π/6',
      'x = 2nπ ± π/4 + π/6',
      'x = nπ + (-1)ⁿ (π/4) + π/6',
      'x = 2nπ ± π/3',
    ],
    correctIndex: 0,
    explanation: 'Divide by R = √( (√3)² + 1² ) = 2: (√3/2) sin x + (1/2) cos x = √2/2 ⇒ sin(x + π/6) = sin(π/4). Hence x + π/6 = nπ + (-1)ⁿ (π/4) ⇒ x = nπ + (-1)ⁿ (π/4) - π/6.',
    hints: [
      'Use the R-method: R = √(a² + b²) = √(3 + 1) = 2.',
      'Rewrite as 2 · [ (√3/2) sin x + (1/2) cos x ] = √2.',
      'Recognize sin(x + π/6) = sin(π/4), then apply sin θ = sin α general solution.',
    ],
  },

  // 21. NODE 102 & 103 - Construct Transformed Polynomial
  {
    id: 'ch_math_021',
    nodeId: NODE_C11_MATH_103,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the transformed quadratic whose roots are (-α) and (-β) where α, β are roots of 2x² - 7x + 5 = 0. Build the equation terms in order:',
    availableParts: ['2x²', '+ 7x', '- 7x', '+ 5', '- 5', '= 0', '4x²'],
    targetState: '2x² + 7x + 5 = 0',
    validationHint: 'For roots multiplied by -1, replace x by -x: 2(-x)² - 7(-x) + 5 = 2x² + 7x + 5 = 0.',
    explanation: 'Replacing x by -x negates odd powers of x while keeping even powers unchanged. Thus 2x² - 7x + 5 = 0 becomes 2x² + 7x + 5 = 0.',
    hints: [
      'If new roots are -α and -β, substitute x → -x into the quadratic.',
      '(-x)² = x², and -7(-x) = +7x.',
      'Assemble: 2x² then + 7x then + 5 then = 0.',
    ],
  },

  // 22. NODE 104 - Complex Multiplication Dilation & Rotation
  {
    id: 'ch_math_022',
    nodeId: NODE_C11_MATH_104,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'If z₁ = 3e^{iπ/6} and z₂ = 4e^{iπ/3}, what is the modulus |z₁ · z₂| of their product?',
    correctAnswer: 12,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'Modulus of a product is the product of moduli: |z₁ · z₂| = |z₁| · |z₂| = 3 · 4 = 12. Arguments simply add (π/6 + π/3 = π/2).',
    hints: [
      'Recall: |z₁ z₂| = |z₁| |z₂|.',
      '|z₁| = 3 and |z₂| = 4.',
      'Multiply 3 by 4 to get 12.',
    ],
  },
];

// ─── DEFAULT COMPONENT PROPS ───
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
  nodeId: NODE_C11_MATH_102,
  title: 'Symmetric Functions, Complex Geometry & Conics Mastery',
  definition: 'Comprehensive mastery of Vieta’s root formulas, algebraic root transformations, rotation theorem in Argand geometry, complex locus curves, parabola/ellipse/hyperbola tangents, polars, and trigonometric general solutions.',
  eli5: 'Think of equations like secret blueprints: Vieta lets you read root secrets without solving; complex numbers rotate vectors like radar needles; conics guide satellite reflectors and gravity flybys; and trig formulas track every infinite loop of a spinning radar.',
  misconceptions: [
    { misconception: 'alpha + beta = b/a and alphabeta = -c/a', correction: 'For ax² + bx + c = 0, sum is -b/a (minus) and product is c/a (plus).' },
    { misconception: 'To find alpha^2 + beta^2 you must first compute square roots of discriminant', correction: 'Always use the identity (alpha+beta)^2 - 2alphabeta — it works for all roots without solving!' },
    { misconception: 'To get reciprocal roots, substitute -1/x instead of 1/x', correction: 'Reciprocal transformation requires x -> 1/x, which simply reverses the coefficients: cx^2 + bx + a = 0.' },
    { misconception: 'Rotating z2 about z1 is simply z2 * e^(i theta)', correction: 'You must first translate pivot to origin: z3 = z1 + (z2 - z1) * e^(i theta).' },
    { misconception: 'The condition of tangency for hyperbola is c^2 = a^2 m^2 + b^2', correction: 'Hyperbola has negative y^2 term, so condition is c^2 = a^2 m^2 - b^2.' },
    { misconception: 'Director circle of a parabola is x^2 + y^2 = a^2', correction: 'Parabola director circle degenerates into the vertical line x + a = 0 (the directrix).' },
    { misconception: 'Normal to ellipse has plus signs like the curve', correction: 'Ellipse normal carries minus signs: a^2 x / x1 - b^2 y / y1 = a^2 - b^2.' },
    { misconception: 'General solution of sin x = sin alpha is 2n pi + alpha', correction: 'Sine has two families per cycle: x = n pi + (-1)^n alpha, n in Z.' },
  ],
  diagnosticQuestions: [
    { question: 'What is alpha^2 + beta^2 in terms of sum S and product P?', options: ['S^2 - 2P', 'S^2 + 2P', 'S^2 - P', '(S - P)^2'], correctIndex: 0 },
    { question: 'What is the reciprocal equation of 3x^2 - 5x + 2 = 0?', options: ['2x^2 - 5x + 3 = 0', '-3x^2 - 5x - 2 = 0', '2x^2 + 5x + 3 = 0', '3x^2 + 5x + 2 = 0'], correctIndex: 0 },
    { question: 'Multiplying by e^(i pi/2) rotates a complex vector by:', options: ['90 degrees anticlockwise', '180 degrees', '45 degrees clockwise', '270 degrees'], correctIndex: 0 },
    { question: 'The locus |z - 4| + |z + 4| = 10 represents:', options: ['Ellipse with foci (+/-4, 0)', 'Circle of radius 10', 'Hyperbola', 'Line segment'], correctIndex: 0 },
    { question: 'Condition of tangency for y = mx + c to y^2 = 4ax is:', options: ['c = a/m', 'c = am', 'c = a^2 m', 'c = -a/m'], correctIndex: 0 },
    { question: 'Director circle of ellipse x^2/16 + y^2/9 = 1 is:', options: ['x^2 + y^2 = 25', 'x^2 + y^2 = 7', 'x^2 + y^2 = 16', 'x = -4'], correctIndex: 0 },
    { question: 'Eccentricity e = 1 in polar form r = l/(1 + e cos theta) denotes:', options: ['Parabola', 'Ellipse', 'Hyperbola', 'Circle'], correctIndex: 0 },
    { question: 'General solution of cos x = cos alpha is:', options: ['x = 2n pi +/- alpha', 'x = n pi + (-1)^n alpha', 'x = n pi + alpha', 'x = 2n pi + alpha'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery of ISC Class 11 Advanced Mathematics: Vieta roots, complex geometry rotations, conic sections, and trigonometric general solutions.',
};

// ─── 5 INTERACTIVE EXPLORATION LABS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Vieta Roots Balance',
    instruction: 'Adjust coefficients a, b, c and watch how root positions in the complex plane relate to the sum -b/a and product c/a in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_102,
  },
  {
    title: 'Lab 2: Argand Plane Vector Radar (Rotation Theorem)',
    instruction: 'Drag the rotation angle slider θ to swing vector (z₂ - z₁) about pivot z₁ using z₃ = z₁ + (z₂ - z₁)e^{iθ}.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_104,
  },
  {
    title: 'Lab 3: Dynamic Complex Locus Generator',
    instruction: 'Switch between circle |z - c| = r, ellipse |z - f₁| + |z - f₂| = 2a, and perpendicular bisector |z - z₁| = |z - z₂|.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C11_MATH_105,
  },
  {
    title: 'Lab 4: Parabolic & Conic Ray Reflectors',
    instruction: 'Adjust the tangent slope m to see the tangent y = mx + a/m and the perpendicular normal on y² = 4ax.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_106,
  },
  {
    title: 'Lab 5: Trigonometric General Waveform Explorer',
    instruction: 'Slide angle α and cycle index n to see how x = nπ + (-1)ⁿ α traces every intersection on the continuous sine wave.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_109,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Deep-Space Telemetry Flight Director',
  description: 'Apply Vieta polynomial stability, complex Argand beam steering, and parabolic antenna feed alignments to calibrate an actual Chandrayaan/Aditya-L1 orbital transfer maneuver.',
  steps: [
    'Model orbit entry polynomial 3x² - 12x + 7 = 0 and extract instantaneous velocity via α + β = 4 km/s',
    'Steer phased array radar beam by 45° using Argand complex rotation vector e^{iπ/4}',
    'Align DSN 32-meter parabolic dish focus at y² = 4(8)x → Focus at (8, 0) meters',
    'Broadcast synchronization telemetry pulses solved by sin(2t) = 0.5 → t = nπ/2 + (-1)ⁿ (π/12)',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN REACT COMPONENT ───
function C11_MathematicsSymmetricFunctionsRootsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_MATH_102,
  title = DEFAULT_PROPS.title || 'Symmetric Functions & Conic Geometry',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [masteryLevel, setMasteryLevel] = useState('beginner');

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Score & Error Tracking
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating Hints & Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-Drop & Numeric & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback Animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive controls
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-4);
  const [coeffC, setCoeffC] = useState<number>(5);

  const [pivotX, setPivotX] = useState<number>(1);
  const [pivotY, setPivotY] = useState<number>(1);
  const [vectorLen, setVectorLen] = useState<number>(3);
  const [rotAngleDeg, setRotAngleDeg] = useState<number>(45);

  const [activeLocusType, setActiveLocusType] = useState<'circle' | 'ellipse' | 'bisector'>('circle');
  const [locusParamR, setLocusParamR] = useState<number>(3);
  const [locusParamA, setLocusParamA] = useState<number>(4);

  const [parabolaA, setParabolaA] = useState<number>(2);
  const [tangentM, setTangentM] = useState<number>(1);

  const [trigAlphaDeg, setTrigAlphaDeg] = useState<number>(30);
  const [trigN, setTrigN] = useState<number>(1);

  // Persistence Refs & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

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
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  const vietaSum = useMemo(() => -coeffB / coeffA, [coeffA, coeffB]);
  const vietaProd = useMemo(() => coeffC / coeffA, [coeffA, coeffC]);
  const vietaSumSq = useMemo(() => vietaSum * vietaSum - 2 * vietaProd, [vietaSum, vietaProd]);
  const discriminant = useMemo(() => coeffB * coeffB - 4 * coeffA * coeffC, [coeffA, coeffB, coeffC]);

  const rotatedPoint = useMemo(() => {
    const rad = (rotAngleDeg * Math.PI) / 180;
    const dx = vectorLen * Math.cos(rad);
    const dy = vectorLen * Math.sin(rad);
    return { x: pivotX + dx, y: pivotY + dy };
  }, [pivotX, pivotY, vectorLen, rotAngleDeg]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction! Vieta formulas apply universally.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Math Labs. Manipulate each visual to discover principles firsthand.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration sandbox active. Test any variables with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Structured challenges starting now. Think deeply before answering.');
  }, []);

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
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_MATH_NODES, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission Complete! You scored ${finalScore} percent mastery.`);
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
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

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
      speechManager.speak('Correct! Brilliant deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Explanations revealed. Study the step-by-step breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIdx, 1);
      base.splice(toIdx, 0, moved);
      return base;
    });
  }, [challenge]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  const handleResetLab = useCallback(() => {
    setCoeffA(1);
    setCoeffB(-4);
    setCoeffC(5);
    setRotAngleDeg(45);
    setTangentM(1);
    audioManager.play('pop');
  }, []);

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

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame) * 0.04) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const beadX = (frame * 2) % canvas.width;
      const beadY = canvas.height / 2 + Math.sin((beadX + frame) * 0.04) * 25;
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(beadX, beadY, 5 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans select-none"
    >
      {/* ─── SIMULATION TOP BAR ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-emerald-400">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">ISC Class 11 Mathematics • JEE Advanced Trajectory & Complex Conics</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 border-emerald-600 text-emerald-400'
                : difficulty === 'standard'
                ? 'bg-gold-950/60 border-gold-600 text-gold-400'
                : 'bg-rose-950/60 border-rose-600 text-rose-400'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-xs font-bold px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 rounded-full"
          >
            Mastery: {masteryLevel}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="py-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-5 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-950 rounded-2xl border border-gold-700/60"
            >
              <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
                <span>🚀</span> {SCENARIO.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-gold-400 mt-2 bg-gold-950/50 p-2.5 rounded-xl border border-gold-800/40">
                ⚡ Challenge Context: {SCENARIO.context}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <span className="text-amber-400 font-bold">Curiosity Probe:</span> {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left text-sm rounded-xl border transition-all duration-200 ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-900/40 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                    aria-label={`Option ${i + 1}`}
                  >
                    <span className="font-mono text-gold-400 mr-2">[{i + 1}]</span> {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-700 space-y-3"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! Vieta identities bypass explicit solving.' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-gold-600/30"
                  >
                    Enter Interactive Exploration Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT-STYLE LABS) ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Interactive Visual Discovery</span>
                <h2 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              </div>
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-xs font-mono px-3 py-1 bg-slate-900 rounded-full border border-slate-700 text-slate-400"
              >
                Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </motion.span>
            </div>

            <motion.p
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-sm text-amber-300 bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl flex items-center gap-2"
            >
              <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
              >
                {/* LAB 1: VIETA SYMMETRIC FUNCTIONS SIMULATOR */}
                {currentSlide === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 space-y-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-400 font-mono mb-2">QUADRATIC EQUATION:</p>
                        <p className="text-lg font-mono font-bold text-gold-400">
                          {coeffA}x² {coeffB >= 0 ? `+ ${coeffB}` : `- ${Math.abs(coeffB)}`}x {coeffC >= 0 ? `+ ${coeffC}` : `- ${Math.abs(coeffC)}`} = 0
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Coefficient a: <b>{coeffA}</b></span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={5}
                            step={1}
                            value={coeffA}
                            onChange={(e) => setCoeffA(Number(e.target.value))}
                            className="w-full accent-gold-500"
                            aria-label="Coefficient a"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Coefficient b: <b>{coeffB}</b></span>
                          </div>
                          <input
                            type="range"
                            min={-10}
                            max={10}
                            step={1}
                            value={coeffB}
                            onChange={(e) => setCoeffB(Number(e.target.value))}
                            className="w-full accent-gold-500"
                            aria-label="Coefficient b"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Coefficient c: <b>{coeffC}</b></span>
                          </div>
                          <input
                            type="range"
                            min={-10}
                            max={10}
                            step={1}
                            value={coeffC}
                            onChange={(e) => setCoeffC(Number(e.target.value))}
                            className="w-full accent-emerald-500"
                            aria-label="Coefficient c"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <motion.div whileHover={{ scale: 1.05 }} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="text-slate-400">Sum α + β</span>
                          <p className="text-emerald-400 font-bold font-mono text-sm">{vietaSum.toFixed(2)}</p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="text-slate-400">Product αβ</span>
                          <p className="text-gold-400 font-bold font-mono text-sm">{vietaProd.toFixed(2)}</p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="text-slate-400">Sum α² + β²</span>
                          <p className="text-gold-400 font-bold font-mono text-sm">{vietaSumSq.toFixed(2)}</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* SVG Argand Roots Visualizer */}
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
                      <svg viewBox="0 0 300 240" className="w-full max-w-[320px]">
                        <line x1="20" y1="120" x2="280" y2="120" stroke="#334155" strokeWidth="1.5" />
                        <line x1="150" y1="20" x2="150" y2="220" stroke="#334155" strokeWidth="1.5" />
                        <text x="270" y="115" fill="#64748b" fontSize="10">Re</text>
                        <text x="155" y="30" fill="#64748b" fontSize="10">Im</text>

                        {discriminant >= 0 ? (
                          <>
                            <circle
                              cx={150 + ((-coeffB + Math.sqrt(discriminant)) / (2 * coeffA)) * 15}
                              cy={120}
                              r="6"
                              fill="#22c55e"
                            />
                            <text
                              x={150 + ((-coeffB + Math.sqrt(discriminant)) / (2 * coeffA)) * 15}
                              y={105}
                              fill="#22c55e"
                              fontSize="10"
                              textAnchor="middle"
                            >
                              α
                            </text>

                            <circle
                              cx={150 + ((-coeffB - Math.sqrt(discriminant)) / (2 * coeffA)) * 15}
                              cy={120}
                              r="6"
                              fill="#38bdf8"
                            />
                            <text
                              x={150 + ((-coeffB - Math.sqrt(discriminant)) / (2 * coeffA)) * 15}
                              y={140}
                              fill="#38bdf8"
                              fontSize="10"
                              textAnchor="middle"
                            >
                              β
                            </text>
                          </>
                        ) : (
                          <>
                            <circle
                              cx={150 + (-coeffB / (2 * coeffA)) * 15}
                              cy={120 - (Math.sqrt(-discriminant) / (2 * coeffA)) * 15}
                              r="6"
                              fill="#a855f7"
                            />
                            <text
                              x={150 + (-coeffB / (2 * coeffA)) * 15 + 10}
                              y={120 - (Math.sqrt(-discriminant) / (2 * coeffA)) * 15}
                              fill="#a855f7"
                              fontSize="10"
                            >
                              α
                            </text>

                            <circle
                              cx={150 + (-coeffB / (2 * coeffA)) * 15}
                              cy={120 + (Math.sqrt(-discriminant) / (2 * coeffA)) * 15}
                              r="6"
                              fill="#a855f7"
                            />
                            <text
                              x={150 + (-coeffB / (2 * coeffA)) * 15 + 10}
                              y={120 + (Math.sqrt(-discriminant) / (2 * coeffA)) * 15}
                              fill="#a855f7"
                              fontSize="10"
                            >
                              β (conj)
                            </text>
                          </>
                        )}
                      </svg>
                      <p className="text-xs text-slate-400 mt-2 font-mono">
                        Discriminant D = {discriminant} ({discriminant >= 0 ? 'Distinct Real Roots' : 'Complex Conjugate Pair'})
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* LAB 2: ROTATION THEOREM IN COMPLEX PLANE */}
                {currentSlide === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 space-y-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-xs text-gold-400 font-mono">ROTATION THEOREM FORMULA:</p>
                        <p className="text-base font-mono font-bold text-white mt-1">
                          z₃ = z₁ + (z₂ - z₁) · e^(iθ)
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          e^(iθ) = cos(��) + i sin(θ) [Pure rotation of length |z₂ - z₁|]
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Rotation Angle θ: <b>{rotAngleDeg}°</b> ({(rotAngleDeg * (Math.PI / 180)).toFixed(2)} rad)</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={360}
                            step={5}
                            value={rotAngleDeg}
                            onChange={(e) => setRotAngleDeg(Number(e.target.value))}
                            className="w-full accent-gold-500"
                            aria-label="Rotation angle"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Vector Length: <b>{vectorLen} units</b></span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={5}
                            step={0.5}
                            value={vectorLen}
                            onChange={(e) => setVectorLen(Number(e.target.value))}
                            className="w-full accent-gold-500"
                            aria-label="Vector length"
                          />
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                        <p className="text-slate-300">Pivot z₁ = {pivotX} + {pivotY}i</p>
                        <p className="text-emerald-400 font-bold">
                          Rotated z₃ ≈ {rotatedPoint.x.toFixed(2)} + {rotatedPoint.y.toFixed(2)}i
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <svg viewBox="0 0 300 240" className="w-full max-w-[320px]">
                        <circle cx="150" cy="120" r="40" fill="none" stroke="#1e293b" strokeDasharray="3 3" />
                        <circle cx="150" cy="120" r="80" fill="none" stroke="#1e293b" strokeDasharray="3 3" />
                        <line x1="20" y1="120" x2="280" y2="120" stroke="#334155" />
                        <line x1="150" y1="20" x2="150" y2="220" stroke="#334155" />

                        <circle cx="150" cy="120" r="5" fill="#f59e0b" />
                        <text x="145" y="110" fill="#f59e0b" fontSize="10" textAnchor="end">z₁ Pivot</text>

                        <line
                          x1="150"
                          y1="120"
                          x2={150 + vectorLen * 20 * Math.cos((rotAngleDeg * Math.PI) / 180)}
                          y2={120 - vectorLen * 20 * Math.sin((rotAngleDeg * Math.PI) / 180)}
                          stroke="#6366f1"
                          strokeWidth="3"
                        />
                        <circle
                          cx={150 + vectorLen * 20 * Math.cos((rotAngleDeg * Math.PI) / 180)}
                          cy={120 - vectorLen * 20 * Math.sin((rotAngleDeg * Math.PI) / 180)}
                          r="6"
                          fill="#22c55e"
                        />
                        <text
                          x={150 + vectorLen * 20 * Math.cos((rotAngleDeg * Math.PI) / 180) + 8}
                          y={120 - vectorLen * 20 * Math.sin((rotAngleDeg * Math.PI) / 180)}
                          fill="#22c55e"
                          fontSize="10"
                        >
                          z₃
                        </text>
                      </svg>
                    </div>
                  </motion.div>
                )}

                {/* LAB 3: COMPLEX LOCUS EXPLORER */}
                {currentSlide === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex gap-2">
                      {(['circle', 'ellipse', 'bisector'] as const).map((type) => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveLocusType(type);
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-2 text-xs font-bold uppercase rounded-xl border transition-all ${
                            activeLocusType === type
                              ? 'bg-gold-600 border-gold-400 text-white'
                              : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="w-full md:w-1/2 space-y-3">
                        {activeLocusType === 'circle' && (
                          <>
                            <p className="text-sm font-mono font-bold text-gold-400">|z - c| = r</p>
                            <p className="text-xs text-slate-300">Set of all points with constant distance r from center c.</p>
                            <div>
                              <div className="flex justify-between text-xs text-slate-400">Radius r: {locusParamR}</div>
                              <input
                                type="range"
                                min={1}
                                max={5}
                                value={locusParamR}
                                onChange={(e) => setLocusParamR(Number(e.target.value))}
                                className="w-full accent-gold-500"
                              />
                            </div>
                          </>
                        )}

                        {activeLocusType === 'ellipse' && (
                          <>
                            <p className="text-sm font-mono font-bold text-emerald-400">|z - f₁| + |z - f₂| = 2a</p>
                            <p className="text-xs text-slate-300">Sum of distances to two foci f₁(-2,0) and f₂(2,0) is constant 2a.</p>
                            <div>
                              <div className="flex justify-between text-xs text-slate-400">Major axis 2a: {locusParamA * 2} (Focal dist = 4)</div>
                              <input
                                type="range"
                                min={3}
                                max={6}
                                value={locusParamA}
                                onChange={(e) => setLocusParamA(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                              />
                            </div>
                          </>
                        )}

                        {activeLocusType === 'bisector' && (
                          <>
                            <p className="text-sm font-mono font-bold text-amber-400">|z - z₁| = |z - z₂|</p>
                            <p className="text-xs text-slate-300">Equidistant points form the perpendicular bisector line.</p>
                            <p className="text-xs text-slate-400 font-mono">Equation: y = -x</p>
                          </>
                        )}
                      </div>

                      <div className="w-full md:w-1/2 flex justify-center">
                        <svg viewBox="0 0 240 180" className="w-full max-w-[240px]">
                          <line x1="20" y1="90" x2="220" y2="90" stroke="#334155" />
                          <line x1="120" y1="20" x2="120" y2="160" stroke="#334155" />

                          {activeLocusType === 'circle' && (
                            <circle cx="120" cy="90" r={locusParamR * 15} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                          )}

                          {activeLocusType === 'ellipse' && (
                            <ellipse cx="120" cy="90" rx={locusParamA * 15} ry={Math.sqrt(Math.max(1, locusParamA * locusParamA - 4)) * 15} fill="none" stroke="#22c55e" strokeWidth="2.5" />
                          )}

                          {activeLocusType === 'bisector' && (
                            <line x1="30" y1="180" x2="210" y2="0" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 4" />
                          )}
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* LAB 4: PARABOLA TANGENT & NORMAL */}
                {currentSlide === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 space-y-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-xs text-gold-400 font-mono">PARABOLA y² = 4ax (a = {parabolaA})</p>
                        <p className="text-sm font-mono font-bold text-white mt-1">
                          Tangent: y = mx + a/m &nbsp;|&nbsp; c = {(parabolaA / tangentM).toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Normal: y = mx - 2am - am³
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Tangent Slope m: <b>{tangentM.toFixed(2)}</b></span>
                        </div>
                        <input
                          type="range"
                          min={0.5}
                          max={3}
                          step={0.1}
                          value={tangentM}
                          onChange={(e) => setTangentM(Number(e.target.value))}
                          className="w-full accent-gold-500"
                          aria-label="Tangent slope"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                      <svg viewBox="0 0 260 200" className="w-full max-w-[260px]">
                        <line x1="20" y1="100" x2="240" y2="100" stroke="#334155" />
                        <line x1="50" y1="20" x2="50" y2="180" stroke="#334155" />

                        <path d="M 180 20 Q 50 100 180 180" fill="none" stroke="#64748b" strokeWidth="2" />

                        <line x1="30" y1="20" x2="30" y2="180" stroke="#ef4444" strokeDasharray="3 3" strokeWidth="1.5" />
                        <text x="25" y="30" fill="#ef4444" fontSize="8">x=-a</text>

                        <line
                          x1="30"
                          y1={100 - tangentM * (-20) - (parabolaA / tangentM) * 15}
                          x2="200"
                          y2={100 - tangentM * (150) - (parabolaA / tangentM) * 15}
                          stroke="#22c55e"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </motion.div>
                )}

                {/* LAB 5: TRIGONOMETRIC WAVE & GENERAL SOLUTION */}
                {currentSlide === 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-gold-400 font-mono">GENERAL SOLUTION FORMULA:</p>
                        <p className="text-base font-mono font-bold text-white">
                          sin x = sin α ⇒ x = nπ + (-1)ⁿ α, n ∈ ℤ
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="text-xs">
                          <span className="text-slate-400">Angle α: </span>
                          <b>{trigAlphaDeg}°</b>
                        </div>
                        <div className="text-xs">
                          <span className="text-slate-400">Cycle n: </span>
                          <b>{trigN}</b>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-300">Principal Angle α (°)</label>
                        <input
                          type="range"
                          min={10}
                          max={80}
                          step={5}
                          value={trigAlphaDeg}
                          onChange={(e) => setTrigAlphaDeg(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300">Integer Multiplier n</label>
                        <input
                          type="range"
                          min={0}
                          max={4}
                          step={1}
                          value={trigN}
                          onChange={(e) => setTrigN(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
                      Calculated Solution x = {trigN}·180° + (-1)^{trigN}·({trigAlphaDeg}°) ={' '}
                      <b>{trigN * 180 + Math.pow(-1, trigN) * trigAlphaDeg}°</b>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold text-sm rounded-xl"
              >
                ← Prev Lab
              </motion.button>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextSlide}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-gold-600/30"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30"
                >
                  Enter Sandbox Mode →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-black text-white">Interactive Sandbox & Wave Lab</h2>
                <p className="text-xs text-slate-400 mt-1">Freeform exploration with continuous telemetry 2D canvas visualization.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResetLab}
                className="px-4 py-2 bg-slate-800 text-xs font-bold rounded-lg border border-slate-700"
              >
                Reset Controls
              </motion.button>
            </motion.div>

            {/* HTML5 Canvas Wave Simulator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <span className="text-xs font-mono text-gold-400">LIVE TELEMETRY RADAR WAVEFORM:</span>
              <canvas ref={canvasRef} width={800} height={120} className="w-full bg-slate-950 rounded-xl border border-slate-800" />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdvanceToChallenge}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-gold-600 hover:from-emerald-500 hover:to-gold-500 text-white font-black text-base rounded-2xl shadow-xl shadow-emerald-600/30"
            >
              Ready for Challenges! Launch Exam Tiers →
            </motion.button>
          </motion.div>
        )}

        {/* ─── PHASE 4: STRUCTURED CHALLENGES ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-6 space-y-6"
          >
            {/* Challenge Header & Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={challenge.competencyLevel}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-gold-400 uppercase tracking-wider font-mono"
                >
                  Competency: {challenge.competencyLevel}
                </motion.span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Challenge Box */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 bg-slate-900 rounded-2xl border transition-all duration-300 space-y-5 ${
                wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'border-slate-800'
              }`}
            >
              <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
                {challenge.question}
              </h3>

              {/* MCQ OPTIONS */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full p-4 text-left text-sm rounded-xl border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-gold-400 mr-2">[{String.fromCharCode(65 + i)}]</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* DRAG-LABEL CHALLENGE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex items-center justify-between min-h-[56px]"
                      >
                        <span className="text-xs text-slate-400 font-mono">{item.targetId.replace('target_', '').toUpperCase()}</span>
                        <span className="text-xs font-bold text-gold-400">
                          {droppedLabels[item.targetId] || 'Drop Label Here'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Verify Mapping
                  </motion.button>
                </div>
              )}

              {/* DRAG-SORT CHALLENGE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-3 cursor-grab"
                    >
                      <span className="font-mono text-gold-400 font-bold">Step {displayIdx + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i))}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check Sequence
                  </motion.button>
                </div>
              )}

              {/* NUMERIC CHALLENGE */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter calculated value"
                      className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                    <span className="text-xs text-slate-400">{challenge.unit}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Submit Numeric Value
                  </motion.button>
                </div>
              )}

              {/* CONSTRUCT CHALLENGE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(p => [...p, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-lg border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    layout
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap items-center gap-2"
                  >
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="px-2.5 py-1 bg-gold-900/80 text-gold-300 font-mono text-xs rounded-lg border border-gold-700 cursor-pointer"
                      >
                        {part} ✕
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click equation components above to build equation</span>
                    )}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Verify Construction
                  </motion.button>
                </div>
              )}

              {/* Progressive Disclosure Explanation Card */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 rounded-2xl border border-amber-700/60 space-y-4"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Step-by-Step Analytical Proof:</p>

                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, i) => (
                        <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-slate-300 leading-relaxed font-mono">
                          <span className="text-amber-400 font-bold mr-1">[{i + 1}]</span>
                          {sentence}{!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white font-bold text-xs rounded-xl"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Score →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-6 space-y-6"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-3"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl inline-block"
              >
                🏆
              </motion.span>
              <h2 className="text-2xl font-black text-white">Mathematics Simulation Completed!</h2>
              <p className="text-3xl font-mono font-bold text-emerald-400">
                Score: {Math.max(0, 100 - errors * 5)}%
              </p>
              <p className="text-xs text-slate-400">Mastery Assessment: {masteryLevel.toUpperCase()}</p>
            </motion.div>

            {/* Personalized Motivational Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-2xl border ${
                errors === 0
                  ? 'bg-emerald-950/40 border-emerald-500/60'
                  : errors <= 3
                  ? 'bg-gold-950/40 border-gold-500/60'
                  : errors <= 7
                  ? 'bg-amber-950/40 border-amber-500/60'
                  : 'bg-rose-950/40 border-rose-500/60'
              }`}
            >
              <h4 className="font-bold text-base mb-1">
                {errors === 0 && '🌟 PERFECT SCORE! Flawless Mastery!'}
                {errors >= 1 && errors <= 3 && '🚀 Great work! Outstanding performance!'}
                {errors >= 4 && errors <= 7 && '📈 Good effort! Keep polishing your concepts!'}
                {errors >= 8 && '💪 Do not give up — You WILL get this! Practice makes perfect!'}
              </h4>
              <p className="text-xs md:text-sm text-slate-300">
                {errors === 0
                  ? 'You demonstrated comprehensive mastery across Vieta symmetric formulas, Argand rotation geometry, conic tangents & normals, and trigonometric wave general solutions.'
                  : errors <= 3
                  ? 'Highly proficient in algebraic transformations, Argand loci, and conic properties. Review any minor slips to lock in top JEE/ISC scores.'
                  : errors <= 7
                  ? 'Solid foundation established. Revisit the interactive labs and focus on the sign rules in Vieta and hyperbola tangency conditions.'
                  : 'Mathematical intuition takes deliberate practice. Study the step-by-step diagnostic breakdown below and give it another shot!'}
              </p>
            </motion.div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300">Targeted Misconception Review Profile:</h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1"
                      >
                        <p className="text-rose-400 font-semibold">❌ Trap: {m.misconception}</p>
                        <p className="text-emerald-400 font-medium">✓ Remedy: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition Schedule */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
            >
              <span className="text-slate-400">Next Spaced Repetition Review:</span>
              <span className="font-mono font-bold text-gold-400">
                In {errors === 0 ? REVIEW_INTERVAL_DAYS[2] : REVIEW_INTERVAL_DAYS[0]} Days (SM-2 Tracked)
              </span>
            </motion.div>

            {/* Real World Aerospace Activity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-950 rounded-2xl border border-gold-700/60 space-y-3"
            >
              <h3 className="text-sm font-bold text-gold-300">🛰️ {REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400"
                  >
                    <span className="text-gold-400 font-bold mr-1">{i + 1}.</span> {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION NOTIFICATION BANNERS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Exam Mastery Milestone Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C11_MathematicsSymmetricFunctionsRootsSim;
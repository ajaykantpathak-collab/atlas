'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C12_MATH_061 = 'c12_math_061';
const NODE_C12_MATH_062 = 'c12_math_062';
const NODE_C12_MATH_063 = 'c12_math_063';
const NODE_C12_MATH_064 = 'c12_math_064';
const NODE_C12_MATH_065 = 'c12_math_065';
const NODE_C12_MATH_066 = 'c12_math_066';
const NODE_C12_MATH_067 = 'c12_math_067';
const NODE_C12_MATH_068 = 'c12_math_068';
const NODE_C12_MATH_069 = 'c12_math_069';
const NODE_C12_MATH_070 = 'c12_math_070';

const ALL_NODE_IDS = [
  NODE_C12_MATH_061,
  NODE_C12_MATH_062,
  NODE_C12_MATH_063,
  NODE_C12_MATH_064,
  NODE_C12_MATH_065,
  NODE_C12_MATH_066,
  NODE_C12_MATH_067,
  NODE_C12_MATH_068,
  NODE_C12_MATH_069,
  NODE_C12_MATH_070,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The ISRO Trajectory & Solar Shield Project',
  intro: 'You are a mission flight dynamics lead at ISRO. Your team is computing orbital launch boundaries, calculating solar sail surface areas bounded by polynomial and conic curvatures, modelling cooling rates with linear differential equations, and orienting steering thruster vectors in 3D space.',
  context: 'Calculus and vectors are not just formulas on paper — they govern rocket velocity, area of satellite wings, heat loss differential rates, and multi-axis force vectors.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you compute the definite integral ∫ from -1 to 1 of x³ dx, the algebraic value is 0. Does the geometric area trapped between y = x³ and the x-axis on [-1, 1] equal 0?',
  options: [
    'Yes, because the curve cancels itself out symmetrically.',
    'No! Geometric area is always positive; the sub-zero area must be flipped and added (|∫₋₁⁰ x³ dx| + |∫₀¹ x³ dx| = 0.5).',
    'Yes, odd functions have no physical area on symmetric intervals.',
    'No, the area is undefined because y = x³ is not invertible at 0.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Definite integrals give SIGNED area (+ above x-axis, - below). True geometric area is always non-negative!',
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

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between the area under a curve and the definite integral?',
    observableOptions: [
      'The definite integral equals the signed area between the curve and the x-axis (✓)',
      'The area is always zero for any continuous function (✗)',
      'The area equals the derivative of the function (✗)',
      'The area is always positive regardless of curve position (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When you increase the number of rectangles in a Riemann sum approximation, what happens to the estimated area?',
    observableOptions: [
      'The approximation converges to the exact integral value (✓)',
      'The approximation diverges further from the true value (✗)',
      'The approximation stays the same regardless of rectangle count (✗)',
      'The area becomes infinite (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 PROGRESSIVE CHALLENGES (ALL 10 NODES COVERED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_math_061)
  {
    id: 'ch_01',
    nodeId: NODE_C12_MATH_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the geometric area bounded by the parabola y = x², the x-axis, and the vertical lines x = 0 and x = 3?',
    options: ['3 sq units', '6 sq units', '9 sq units', '27 sq units'],
    correctIndex: 2,
    explanation: 'Area = ∫₀³ x² dx = [x³/3]₀³ = 27/3 - 0 = 9 sq units.',
    hints: [
      'The parabola lies entirely above the x-axis on [0, 3].',
      'Use the power rule of integration: ∫ x² dx = x³/3.',
      'Evaluate [x³/3] from 0 to 3: (3³)/3 - 0 = 9.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag-label (c12_math_070)
  {
    id: 'ch_02',
    nodeId: NODE_C12_MATH_070,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify each physical quantity into either a Scalar (magnitude only) or Vector (magnitude + direction).',
    dragItems: [
      { label: 'Mass (5 kg)', targetId: 'box_scalar' },
      { label: 'Force (12 N East)', targetId: 'box_vector' },
      { label: 'Speed (40 km/h)', targetId: 'box_scalar' },
      { label: 'Velocity (40 km/h North)', targetId: 'box_vector' },
    ],
    correctMapping: {
      box_scalar: 'Mass (5 kg)',
      box_vector: 'Force (12 N East)',
    },
    explanation: 'Mass and speed are purely scalars requiring no direction. Force and velocity require both magnitude and direction.',
    hints: [
      'Does temperature or mass point in a direction? No, they are scalars.',
      'Displacement and velocity carry compass headings or angular directions.',
      'Match the scalar quantity to box_scalar and vector to box_vector.',
    ],
    misconceptionIndex: 4,
  },
  // 3. Foundation - Recall Order & Degree (c12_math_064)
  {
    id: 'ch_03',
    nodeId: NODE_C12_MATH_064,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Find the order and degree of the differential equation: (d²y/dx²)³ + (dy/dx)⁴ + y = 0.',
    options: ['Order 4, Degree 3', 'Order 2, Degree 3', 'Order 3, Degree 2', 'Order 2, Degree 4'],
    correctIndex: 1,
    explanation: 'The highest order derivative is d²y/dx² (order = 2). The power to which this highest order derivative is raised is 3 (degree = 3). The exponent 4 on dy/dx does NOT determine the degree.',
    hints: [
      'Order is the highest derivative level (d²y/dx² vs dy/dx).',
      'Degree is the exponent on THAT highest derivative only.',
      'Highest derivative is 2nd order, raised to power 3. So Order 2, Degree 3.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Numeric (c12_math_061)
  {
    id: 'ch_04',
    nodeId: NODE_C12_MATH_061,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Compute the area under y = eˣ between x = 0 and x = ln(4). (Enter exact numeric value)',
    correctAnswer: 3,
    tolerance: 0.05,
    unit: 'sq units',
    explanation: 'Area = ∫₀^{ln 4} eˣ dx = [eˣ]₀^{ln 4} = e^{ln 4} - e⁰ = 4 - 1 = 3 sq units.',
    hints: [
      'The antiderivative of eˣ is eˣ.',
      'Substitute limits: e^{ln 4} - e⁰.',
      'Note that e^{ln 4} = 4 and e⁰ = 1. 4 - 1 = 3.',
    ],
  },
  // 5. Foundation - Understanding (c12_math_066)
  {
    id: 'ch_05',
    nodeId: NODE_C12_MATH_066,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How many essential arbitrary constants are present in the general solution of a 3rd order differential equation?',
    options: ['1', '2', '3', 'Infinitely many'],
    correctIndex: 2,
    explanation: 'The general solution of an n-th order differential equation contains exactly n essential independent arbitrary constants.',
    hints: [
      'Recall: 1st order DE has 1 constant (C), 2nd order has 2 constants (A and B).',
      'The number of constants always equals the order of the differential equation.',
      'For order 3, there are exactly 3 arbitrary constants.',
    ],
  },
  // 6. Foundation - Drag-sort (c12_math_067)
  {
    id: 'ch_06',
    nodeId: NODE_C12_MATH_067,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of steps for solving a separable differential equation dy/dx = f(x)g(y).',
    sortItems: [
      'Rewrite equation into dy/g(y) = f(x) dx',
      'Integrate left side w.r.t y and right side w.r.t x',
      'Add a single arbitrary constant C to one side',
      'Substitute initial conditions if finding particular solution',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First separate variables with their respective differentials, integrate both sides, add one combined constant C, and finally apply boundary conditions if needed.',
    hints: [
      'You cannot integrate until variables are separated (y with dy, x with dx).',
      'Integration creates the general solution with constant C.',
      'Applying initial conditions is always the final step for particular solutions.',
    ],
  },
  // 7. Foundation - Modulus Area (c12_math_061)
  {
    id: 'ch_07',
    nodeId: NODE_C12_MATH_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The area bounded by y = |x| and the horizontal line y = 3 is:',
    options: ['4.5 sq units', '9 sq units', '18 sq units', '0 sq units'],
    correctIndex: 1,
    explanation: 'By symmetry, Area = 2 ∫₀³ (3 - x) dx = 2 [3x - x²/2]₀³ = 2(9 - 4.5) = 9 sq units. (Or triangle: 1/2 * base 6 * height 3 = 9).',
    hints: [
      'The line y = 3 intersects y = |x| at x = -3 and x = 3.',
      'The shape is an inverted triangle of base 6 and height 3.',
      'Area = (1/2) * 6 * 3 = 9 sq units.',
    ],
  },
  // 8. Standard - Area Between Curves (c12_math_062)
  {
    id: 'ch_08',
    nodeId: NODE_C12_MATH_062,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the area enclosed between the parabola y = x² and the line y = x.',
    options: ['1/2 sq units', '1/3 sq units', '1/6 sq units', '1/12 sq units'],
    correctIndex: 2,
    explanation: 'Intersections: x² = x => x = 0, 1. On [0,1], x >= x². Area = ∫₀¹ (x - x²) dx = [x²/2 - x³/3]₀¹ = 1/2 - 1/3 = 1/6 sq units.',
    hints: [
      'Find limits by setting x² = x.',
      'Test x = 0.5: line y = 0.5 is upper, parabola y = 0.25 is lower.',
      'Compute [1/2 - 1/3] = 1/6.',
    ],
    misconceptionIndex: 2,
  },
  // 9. Standard - Degree with Radicals (c12_math_064)
  {
    id: 'ch_09',
    nodeId: NODE_C12_MATH_064,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the degree of the differential equation: √(1 + (dy/dx)²) = d²y/dx² ?',
    options: ['Degree 1', 'Degree 2', 'Degree 1/2', 'Degree is undefined'],
    correctIndex: 1,
    explanation: 'To find the degree, the equation must be polynomial in derivatives. Squaring both sides: 1 + (dy/dx)² = (d²y/dx²)². The highest order derivative d²y/dx² is raised to power 2, so Degree = 2 (Order = 2).',
    hints: [
      'You cannot read the degree directly while a derivative is trapped under a square root.',
      'Square both sides to make the equation polynomial in derivatives.',
      'Right side becomes (d²y/dx²)², so the highest derivative has power 2.',
    ],
    misconceptionIndex: 1,
  },
  // 10. Standard - Formation by Elimination (c12_math_065)
  {
    id: 'ch_10',
    nodeId: NODE_C12_MATH_065,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Form the differential equation for the family of parabolas y = Cx² by eliminating the arbitrary constant C.',
    availableParts: ['dy/dx', '=', '2y/x', 'x²', 'y/x', '+', 'C'],
    targetState: 'dy/dx = 2y/x',
    validationHint: 'Differentiate y = Cx² to get dy/dx = 2Cx, then substitute C = y/x².',
    explanation: 'dy/dx = 2Cx. Since C = y/x², dy/dx = 2(y/x²)x = 2y/x, or x(dy/dx) - 2y = 0.',
    hints: [
      'Differentiate y = Cx² w.r.t x to get dy/dx = 2Cx.',
      'Express C from original equation: C = y/x².',
      'Replace C in the derivative equation: dy/dx = 2(y/x²)x = 2y/x.',
    ],
  },
  // 11. Standard - Separable DE (c12_math_067)
  {
    id: 'ch_11',
    nodeId: NODE_C12_MATH_067,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve the differential equation dy/dx = e^{x - y} with initial condition y(0) = 0.',
    options: ['eʸ = eˣ', 'eʸ = eˣ - 1', 'eʸ = eˣ + 1', 'y = x'],
    correctIndex: 0,
    explanation: 'eʸ dy = eˣ dx => eʸ = eˣ + C. At (0,0): e⁰ = e⁰ + C => 1 = 1 + C => C = 0. Hence eʸ = eˣ, which gives y = x.',
    hints: [
      'Rewrite e^{x - y} as (eˣ)/(eʸ).',
      'Separate: eʸ dy = eˣ dx and integrate both sides.',
      'eʸ = eˣ + C. Substitute x=0, y=0 to find C = 0.',
    ],
  },
  // 12. Standard - Homogeneous Lambda-Test (c12_math_068)
  {
    id: 'ch_12',
    nodeId: NODE_C12_MATH_068,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following differential equations is HOMOGENEOUS of degree zero?',
    options: [
      'dy/dx = (x² + y² + 1) / (2xy)',
      'dy/dx = (x² + y²) / (2xy)',
      'dy/dx = (x + y + 2) / (x - y)',
      'dy/dx = sin(x) + cos(y)',
    ],
    correctIndex: 1,
    explanation: 'For F(x,y) = (x² + y²)/(2xy), F(λx, λy) = λ²(x² + y²)/(2λ²xy) = F(x,y) (degree 0). Any constant term like +1 or +2 violates degree-zero homogeneity.',
    hints: [
      'Test scaling x -> λx, y -> λy.',
      'In a homogeneous fraction, every single term in numerator and denominator must have identical total powers.',
      'x² + y² has degree 2, 2xy has degree 2; λ² cancels cleanly.',
    ],
    misconceptionIndex: 3,
  },
  // 13. Standard - Linear DE Integrating Factor (c12_math_069)
  {
    id: 'ch_13',
    nodeId: NODE_C12_MATH_069,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For dy/dx + (3/x)y = x², the Integrating Factor IF = e^{∫ P dx} simplifies to xⁿ. What is the integer power n?',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'power',
    explanation: 'P(x) = 3/x. ∫ P dx = 3 ln x = ln(x³). IF = e^{ln(x³)} = x³. Thus n = 3.',
    hints: [
      'Identify P(x) as the coefficient of y, which is 3/x.',
      '∫ (3/x) dx = 3 ln|x| = ln|x³|.',
      'e^{ln(x³)} = x³, so n = 3.',
    ],
  },
  // 14. Standard - Vector Magnitude in 3D (c12_math_070)
  {
    id: 'ch_14',
    nodeId: NODE_C12_MATH_070,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given points A(1, 2, 3) and B(4, 2, 7) in ISRO coordinates, compute the magnitude |AB̄|.',
    correctAnswer: 5,
    tolerance: 0.05,
    unit: 'units',
    explanation: 'Vector AB̄ = (4-1)î + (2-2)ĵ + (7-3)k̂ = 3î + 0ĵ + 4k̂. Magnitude |AB̄| = √(3² + 0² + 4²) = √(9 + 16) = √25 = 5 units.',
    hints: [
      'Find components: Δx = 4-1 = 3, Δy = 2-2 = 0, Δz = 7-3 = 4.',
      'Magnitude = √(Δx² + Δy² + Δz²).',
      '√(9 + 0 + 16) = √25 = 5.',
    ],
  },
  // 15. Advanced - Area of Ellipse Quarter (c12_math_063)
  {
    id: 'ch_15',
    nodeId: NODE_C12_MATH_063,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Using integration, the area of the region bounded by the ellipse x²/16 + y²/9 = 1 in the FIRST quadrant is:',
    options: ['12π sq units', '6π sq units', '3π sq units', '4π sq units'],
    correctIndex: 2,
    explanation: 'Semi-major axis a = 4, semi-minor axis b = 3. Total area = πab = π(4)(3) = 12π. First quadrant = (12π)/4 = 3π sq units. Integral: ∫₀⁴ (3/4)√(16 - x²) dx = (3/4) * (π*16/4) = 3π.',
    hints: [
      'Standard ellipse area is πab with a² = 16 (a=4) and b² = 9 (b=3).',
      'First quadrant is one fourth of the entire ellipse.',
      '(π * 4 * 3) / 4 = 3π sq units.',
    ],
  },
  // 16. Advanced - Reducible to Separable (c12_math_067)
  {
    id: 'ch_16',
    nodeId: NODE_C12_MATH_067,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'To solve dy/dx = (4x + y + 1)², which substitution transforms it into a variable separable equation?',
    options: [
      'y = vx',
      'u = 4x + y + 1',
      'u = 4x + y',
      'y = u/x',
    ],
    correctIndex: 1,
    explanation: 'Let u = 4x + y + 1 => du/dx = 4 + dy/dx => dy/dx = du/dx - 4. Equation becomes du/dx - 4 = u² => du/(u² + 4) = dx, which is cleanly separable.',
    hints: [
      'Look at the argument inside the square: it is a linear combination (ax + by + c).',
      'This is NOT homogeneous (it has constant +1), so y=vx fails.',
      'Set u = 4x + y + 1 so du/dx = 4 + dy/dx.',
    ],
  },
  // 17. Advanced - Cross-over Trigonometric Area (c12_math_062)
  {
    id: 'ch_17',
    nodeId: NODE_C12_MATH_062,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student integrates ∫₀^{π/2} (sin x - cos x) dx and gets 0 for the area between sin x and cos x. Why is this evaluation wrong and what is the true area?',
    options: [
      'It is correct because the two trigonometric lobes have equal and opposite signed areas.',
      'Wrong because the curves cross at x = π/4; the integral must be split into [0, π/4] and [π/4, π/2], yielding 2(√2 - 1) sq units.',
      'Wrong because sin x is always above cos x, so the true area is 2 sq units.',
      'Wrong because trigonometric curves cannot enclose finite geometric areas.',
    ],
    correctIndex: 1,
    explanation: 'On [0, π/4], cos x > sin x. On [π/4, π/2], sin x > cos x. Area = ∫₀^{π/4} (cos x - sin x) dx + ∫_{π/4}^{π/2} (sin x - cos x) dx = (√2 - 1) + (√2 - 1) = 2(√2 - 1) ≈ 0.828 sq units.',
    hints: [
      'Plot sin x and cos x: they intersect at x = π/4.',
      'Before π/4 cos x is above; after π/4 sin x is above.',
      'A single unsplit integral cancels the two positive geometric regions to zero.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Advanced - Linear DE Mirror Form dx/dy (c12_math_069)
  {
    id: 'ch_18',
    nodeId: NODE_C12_MATH_069,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For the equation (x + 2y³) dy/dx = y (where y > 0), how should it be structured as a linear differential equation?',
    options: [
      'dy/dx + (1/x)y = 2y³',
      'dx/dy - (1/y)x = 2y²',
      'dx/dy + (1/y)x = 2y²',
      'It cannot be written in linear form.',
    ],
    correctIndex: 1,
    explanation: 'Invert derivative: dx/dy = (x + 2y³)/y = x/y + 2y³. Rearranging gives dx/dy - (1/y)x = 2y², which is linear in x with P(y) = -1/y and Q(y) = 2y².',
    hints: [
      'Notice that y appears to the 3rd power in the original form, preventing linearity in y.',
      'Invert dx/dy = (x + 2y³)/y.',
      'Split terms: dx/dy = x/y + 2y² => dx/dy - (1/y)x = 2y².',
    ],
  },
  // 19. Advanced - Vector Directed Segment Properties (c12_math_070)
  {
    id: 'ch_19',
    nodeId: NODE_C12_MATH_070,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the relationship between vectors AB̄ and BĀ: Are they equal, opposite, or unrelated?',
    options: [
      'They are equal because |AB̄| = |BĀ| and magnitude defines a vector.',
      'They have equal magnitude but opposite directions (AB̄ = -BĀ); they are opposite vectors.',
      'They are collinear and pointing in the identical direction.',
      'They are perpendicular vectors because their endpoint order is transposed.',
    ],
    correctIndex: 1,
    explanation: 'A vector is an ordered pair of magnitude AND direction. While lengths are equal (|AB̄| = |BĀ|), the arrow points from A to B in AB̄ and from B to A in BĀ. Thus AB̄ = -BĀ.',
    hints: [
      'Initial point (tail) and terminal point (head) are swapped.',
      'Reversing head and tail flips the direction by 180°.',
      'Equal magnitudes + opposite directions => AB̄ = -BĀ.',
    ],
    misconceptionIndex: 4,
  },
  // 20. Advanced - Homogeneous Solution (c12_math_068)
  {
    id: 'ch_20',
    nodeId: NODE_C12_MATH_068,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Solve dy/dx = (y² - x²)/(2xy). The family of solution curves represents:',
    options: [
      'A family of concentric ellipses',
      'A family of circles passing through the origin x² + y² = Cx',
      'A family of parabolas opening upward',
      'A family of orthogonal hyperbolas xy = C',
    ],
    correctIndex: 1,
    explanation: 'Substitute y = vx => v + x dv/dx = (v² - 1)/(2v) => x dv/dx = -(v² + 1)/(2v) => 2v/(v² + 1) dv = -dx/x. Integrating gives ln(v² + 1) = -ln x + ln C => x(v² + 1) = C => x² + y² = Cx, which is a family of circles tangent to the y-axis at the origin.',
    hints: [
      'Substitute y = vx and separate into 2v/(v² + 1) dv = -dx/x.',
      'Integrate: ln(v² + 1) + ln(x) = ln C.',
      'Back-substitute v = y/x to get x² + y² = Cx (circles through origin).',
    ],
  },
  // 21. Advanced - Real-world Cooling Model (c12_math_069)
  {
    id: 'ch_21',
    nodeId: NODE_C12_MATH_069,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A satellite battery cools according to dT/dt + 0.05 T = 1, with T(0) = 100°C. Find the temperature T at t = 20 seconds. (Use e⁻¹ ≈ 0.368, round to 1 decimal place)',
    correctAnswer: 49.4,
    tolerance: 0.5,
    unit: '°C',
    explanation: 'IF = e^{0.05 t}. T e^{0.05 t} = ∫ 1 e^{0.05 t} dt = 20 e^{0.05 t} + C => T(t) = 20 + C e^{-0.05 t}. At t=0, 100 = 20 + C => C = 80. Thus T(20) = 20 + 80 e^{-1} = 20 + 80(0.368) = 20 + 29.44 = 49.4°C.',
    hints: [
      'Linear DE in T with P = 0.05 and Q = 1.',
      'General solution is T(t) = 20 + C e^{-0.05 t}.',
      'Use T(0) = 100 to get C = 80, then compute T(20) = 20 + 80(0.368).',
    ],
  },
  // 22. Advanced - Synthesis (c12_math_063)
  {
    id: 'ch_22',
    nodeId: NODE_C12_MATH_063,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Find the area of the region in the first quadrant bounded by y = x, the circle x² + y² = 32, and the x-axis.',
    options: ['4π sq units', '8π sq units', '16 sq units', '4π - 4 sq units'],
    correctIndex: 0,
    explanation: 'Intersection of y = x and x² + y² = 32: 2x² = 32 => x = 4. The region splits at x = 4: Area = ∫₀⁴ x dx + ∫₄^{√32} √(32 - x²) dx = [x²/2]₀⁴ + [sector area from 4 to √32] = 8 + (1/2 * (√32)² * π/4 - 8) = 4π sq units. (Geometrically, sector of 45° with r = √32 has area (1/8)π(32) = 4π).',
    hints: [
      'The line y = x makes an angle of 45° (π/4 radians) with the x-axis.',
      'The circle radius R = √32.',
      'The region from the x-axis to the line y = x is a circular sector of angle π/4: Area = (1/2) R² θ = (1/2)(32)(π/4) = 4π.',
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
  nodeId: 'c12_math_061',
  title: 'Calculus Applications: Area Bounded & Differential Equations with Vectors',
  definition: 'Comprehensive mastery of computing geometric areas bounded by simple curves, parabolas, circles, and ellipses; classifying and solving differential equations via separation, homogeneity, and integrating factors; and representing 2D/3D vectors.',
  eli5: 'Think of area integration as gluing microscopic toothpicks under a curve to find the exact paint needed. Differential equations are rate-of-change blueprints that let you predict trajectories, and vectors are arrows showing both thrust power and compass direction.',
  misconceptions: [
    {
      misconception: 'Definite integrals always represent geometric area directly without splitting.',
      correction: 'Definite integrals calculate signed area. Regions dipping below the x-axis produce negative values and must be split and inverted.',
    },
    {
      misconception: 'Degree is the largest exponent found anywhere in the differential equation.',
      correction: 'Degree is ONLY the power of the highest order derivative, after removing radicals and fractions from all derivatives.',
    },
    {
      misconception: 'Area between two crossing curves can be computed in a single integral without splitting.',
      correction: 'When curves cross, upper and lower roles swap. You must split at intersection points to avoid positive and negative areas cancelling out.',
    },
    {
      misconception: 'Any equation with x and y fractions is homogeneous and solvable with y = vx.',
      correction: 'A differential equation is homogeneous ONLY if F(λx, λy) = F(x, y) (degree 0). Constants like +1 break homogeneity.',
    },
    {
      misconception: 'Vectors AB̄ and BĀ are identical because they have equal length.',
      correction: 'Vectors require BOTH magnitude and direction. AB̄ and BĀ have equal lengths but point in opposite directions (AB̄ = -BĀ).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the area under y = x from 0 to 4?', options: ['4 sq units', '8 sq units', '16 sq units', '2 sq units'], correctIndex: 1 },
    { question: 'What is the order of d³y/dx³ + (d²y/dx²)⁴ = 0?', options: ['4', '3', '7', '1'], correctIndex: 1 },
    { question: 'What is the degree of (d²y/dx²)³ + dy/dx = 0?', options: ['1', '2', '3', '4'], correctIndex: 2 },
    { question: 'Is mass a scalar or vector quantity?', options: ['Scalar', 'Vector', 'Tensor', 'Neither'], correctIndex: 0 },
    { question: 'What is the integrating factor for dy/dx + 2y = 4?', options: ['e²ˣ', '2x', 'eˣ', 'e⁴ˣ'], correctIndex: 0 },
    { question: 'If f(λx, λy) = λ² f(x, y), what is its degree of homogeneity?', options: ['0', '1', '2', '-1'], correctIndex: 2 },
    { question: 'Area bounded by y² = 4x and x = 1 is:', options: ['8/3 sq units', '4/3 sq units', '16/3 sq units', '2 sq units'], correctIndex: 0 },
    { question: 'What is the magnitude of vector v = 3î + 4ĵ?', options: ['7', '5', '1', '25'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student can compute areas under simple and composite curves, classify and solve 1st order DEs, and compute vector magnitudes.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Area Accumulation & Riemann Strips',
    instruction: 'Adjust the upper limit slider b and strip count n to see how thin rectangles converge to the exact integral ∫₀ᵇ x² dx.',
    interactionType: 'slider-integral',
    nodeId: NODE_C12_MATH_061,
  },
  {
    title: '2. Bounded Region Between Two Curves',
    instruction: 'Drag the curvature slider to adjust the upper curve y = k√x and see the enclosed lens area against y = x² in real-time.',
    interactionType: 'slider-curves',
    nodeId: NODE_C12_MATH_062,
  },
  {
    title: '3. Order & Degree Analyzer',
    instruction: 'Click different differential equation configurations to inspect the highest derivative floor (order) and its roof exponent (degree).',
    interactionType: 'click-de',
    nodeId: NODE_C12_MATH_064,
  },
  {
    title: '4. Linear DE Slope Field & Integrating Factor',
    instruction: 'Change the coefficient P in dy/dx + Py = Q to see the integrating factor e^{Px} transform the solution curve.',
    interactionType: 'slider-linear-de',
    nodeId: NODE_C12_MATH_069,
  },
  {
    title: '5. 3D Vector Thrust & Direction',
    instruction: 'Manipulate X, Y, and Z thruster force components to compute magnitude and observe the 3D directed line segment.',
    interactionType: 'slider-vector',
    nodeId: NODE_C12_MATH_070,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the upper limit of integration for y = x² from b = 2 to b = 4, how will the enclosed area change?',
    options: [
      'The area will double (2x)',
      'The area will quadruple (4x)',
      'The area will increase by 8x (since ∫ x² dx ~ b³)',
      'The area remains unchanged',
    ],
    correctIndex: 2,
    verifyInstruction: 'Now move the limit slider b in the interactive lab from 2 to 4 and observe the area jump from 8/3 (2.67) to 64/3 (21.33)!',
    nodeId: NODE_C12_MATH_061,
  },
  {
    question: 'Predict: For a vector with components (3, 4, 12), what will its magnitude be compared to the 2D vector (3, 4)?',
    options: [
      '5 units',
      '13 units (√(3² + 4² + 12²) = √(25 + 144) = √169 = 13)',
      '19 units',
      '12 units',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the 3D Vector sliders to X=3, Y=4, Z=12 to verify the resulting resultant magnitude of exactly 13 units.',
    nodeId: NODE_C12_MATH_070,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Solar Panel & Heat Shield Calculation',
  description: 'Design a parabolic solar concentrator wing bounded by y² = 8x and x = 2. Compute total reflective surface area, establish the differential heat dissipation rate equation, and verify the stabilizing vector thrust.',
  steps: [
    '1. Set up horizontal strip integration: Area = 2 ∫₀⁴ (2 - y²/8) dy = 32/3 ≈ 10.67 sq meters.',
    '2. Formulate cooling rate DE: dT/dt + 0.1(T - T_space) = 0.',
    '3. Find integrating factor: IF = e^{0.1 t} to calculate core temperature after 60 seconds.',
    '4. Calculate steering thruster vector magnitude for thrust coordinates (60N, 80N, 0N) => |F| = 100 N.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C12_MathematicsAreaUnderSimpleSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── Subject Config ───
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── Interactive State Declarations ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints and feedback states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag and drop / Interactive challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery & Predict-then-check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // Visual simulation interactive parameters (Sliders)
  const [sliderLimitB, setSliderLimitB] = useState<number>(3); // x-limit for y = x^2
  const [sliderRectanglesN, setSliderRectanglesN] = useState<number>(6); // Riemann strips
  const [sliderCurveK, setSliderCurveK] = useState<number>(1); // k for y = k*sqrt(x)
  const [selectedDeIndex, setSelectedDeIndex] = useState<number>(0); // DE inspector
  const [sliderPVal, setSliderPVal] = useState<number>(1); // P in dy/dx + Py = Q
  const [vectorX, setVectorX] = useState<number>(4);
  const [vectorY, setVectorY] = useState<number>(3);
  const [vectorZ, setVectorZ] = useState<number>(0);
  const [sandboxTab, setSandboxTab] = useState<'area' | 'curves' | 'de' | 'vector'>('area');

  // Animation & Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── Filtered Challenges by Adaptive Difficulty ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── Derived Calculations ───
  const exactAreaX2 = useMemo(() => (Math.pow(sliderLimitB, 3) / 3), [sliderLimitB]);
  const riemannSumX2 = useMemo(() => {
    const dx = sliderLimitB / sliderRectanglesN;
    let sum = 0;
    for (let i = 0; i < sliderRectanglesN; i++) {
      const midX = (i + 0.5) * dx;
      sum += (midX * midX) * dx;
    }
    return sum;
  }, [sliderLimitB, sliderRectanglesN]);

  const vectorMagnitude = useMemo(() => {
    return Math.sqrt(vectorX * vectorX + vectorY * vectorY + vectorZ * vectorZ);
  }, [vectorX, vectorY, vectorZ]);

  // ─── Initial Mastery Load ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── Adaptive Difficulty Update ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── Handlers ───
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

  // ─── Auto-Hint Inactivity Timer (10s) ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallenge, phase, resetInactivityTimer]);

  // ─── Canvas Animation Loop for 2D Particle Waves ───
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

      // Draw subtle grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw animated dynamic vector field / slope indicator
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      const originX = 40;
      const originY = canvas.height - 30;

      // Draw Axes
      ctx.beginPath();
      ctx.moveTo(originX, 10);
      ctx.lineTo(originX, originY);
      ctx.lineTo(canvas.width - 20, originY);
      ctx.strokeStyle = '#94a3b8';
      ctx.stroke();

      // Dynamic curve y = x^2 normalized
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      const scaleX = (canvas.width - 80) / 4;
      const scaleY = (originY - 20) / 16;

      for (let px = 0; px <= sliderLimitB; px += 0.05) {
        const py = px * px;
        const screenX = originX + px * scaleX;
        const screenY = originY - py * scaleY;
        if (px === 0) ctx.moveTo(screenX, screenY);
        else ctx.lineTo(screenX, screenY);
      }
      ctx.stroke();

      // Pulsing current limit marker
      const markerX = originX + sliderLimitB * scaleX;
      const markerY = originY - (sliderLimitB * sliderLimitB) * scaleY;
      const radius = 5 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(markerX, markerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [sliderLimitB]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate the parameters to discover calculus principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with areas, differential equations, and vectors with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenge tests!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the controls to verify your hypothesis.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
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
    speechManager.speak('Congratulations! You have mastered ISC Class 12 Area Integration, Differential Equations, and Vectors!');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant deduction.');
      setShowConfetti(true);
      setShowExplanation(true);

      // BKT update
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      // SRS update
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
      setTimeout(() => setWrongShake(false), 400);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the complete step-by-step resolution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-500/10 rounded-xl border border-gold-500/20">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-gold-400">ISC Class 12 Science</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">NEP 2020 Aligned</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white">{title}</h1>
          </div>
        </div>

        {/* Phase & Adaptive Status Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 rounded-full font-bold border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-300 border-rose-700'
                : 'bg-gold-950/60 text-gold-300 border-gold-700'
            }`}
          >
            {difficulty.toUpperCase()} LEVEL
          </motion.span>
          <span className="text-xs px-3 py-1 bg-slate-800 rounded-full text-slate-300 border border-slate-700">
            Phase: <strong className="text-amber-400 capitalize">{phase}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <h2 className="text-xl font-bold text-gold-300 flex items-center gap-2">
              🚀 {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400">
              💡 {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 font-bold text-sm">🤔 Curiosity Discovery Hook</span>
              <span className="text-xs text-slate-400">(Ungraded Intuition Check)</span>
            </div>
            <p className="text-white font-medium text-base mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-slate-950/60 text-xs font-mono text-gold-400">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800">
                <p className={`text-sm mb-4 font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Superb intuition! Areas below the axis must be treated with absolute values.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-purple-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Interactive Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-gold-500' : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 1: Area Under Curve & Riemann Sum Convergence */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* Real-time Graph SVG */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 240" className="w-full h-56">
                      {/* Grid & Axes */}
                      <line x1="40" y1="200" x2="460" y2="200" stroke="#475569" strokeWidth="1.5" />
                      <line x1="40" y1="20" x2="40" y2="200" stroke="#475569" strokeWidth="1.5" />
                      <text x="470" y="205" fill="#94a3b8" fontSize="11">x</text>
                      <text x="35" y="15" fill="#94a3b8" fontSize="11">y</text>

                      {/* Riemann Rectangles */}
                      {Array.from({ length: sliderRectanglesN }).map((_, i) => {
                        const dx = sliderLimitB / sliderRectanglesN;
                        const xStart = i * dx;
                        const midX = (i + 0.5) * dx;
                        const rectH = midX * midX; // y = x^2
                        const svgX = 40 + (xStart / 4) * 400;
                        const svgW = (dx / 4) * 400;
                        const svgH = (rectH / 16) * 180;
                        const svgY = 200 - svgH;

                        return (
                          <rect
                            key={i}
                            x={svgX}
                            y={svgY}
                            width={Math.max(1, svgW - 1)}
                            height={svgH}
                            fill="#6366f1"
                            opacity={0.35}
                            stroke="#818cf8"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* Exact Curve y = x^2 */}
                      <path
                        d={`M 40 200 ${Array.from({ length: 41 })
                          .map((_, i) => {
                            const px = (i / 40) * 4;
                            const py = px * px;
                            const sx = 40 + (px / 4) * 400;
                            const sy = 200 - (py / 16) * 180;
                            return `L ${sx} ${sy}`;
                          })
                          .join(' ')}`}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />

                      {/* Vertical Bound Line x = b */}
                      <line
                        x1={40 + (sliderLimitB / 4) * 400}
                        y1={20}
                        x2={40 + (sliderLimitB / 4) * 400}
                        y2={200}
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <text x={40 + (sliderLimitB / 4) * 400} y="215" fill="#f59e0b" textAnchor="middle" fontSize="12" fontWeight="bold">
                        x = {sliderLimitB}
                      </text>
                    </svg>

                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block">Exact Integral ∫₀ᵇ x² dx</span>
                        <span className="text-lg font-bold text-emerald-400">{exactAreaX2.toFixed(3)} sq units</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block">Riemann Sum ({sliderRectanglesN} strips)</span>
                        <span className="text-lg font-bold text-gold-400">{riemannSumX2.toFixed(3)} sq units</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block">Approximation Error</span>
                        <span className="text-lg font-bold text-amber-400">
                          {Math.abs(exactAreaX2 - riemannSumX2).toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-300 font-bold">Upper Limit (b): {sliderLimitB}</span>
                        <span className="text-gold-400">Domain [0, 4]</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={4}
                        step={0.1}
                        value={sliderLimitB}
                        aria-label="Upper limit slider"
                        onChange={(e) => {
                          setSliderLimitB(Number(e.target.value));
                          audioManager.play('count');
                          if (predictionMade && !predictionVerified) {
                            setPredictionVerified(true);
                          }
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-300 font-bold">Number of Strips (n): {sliderRectanglesN}</span>
                        <span className="text-gold-400">Convergence Speed</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={40}
                        step={1}
                        value={sliderRectanglesN}
                        aria-label="Riemann rectangles slider"
                        onChange={(e) => {
                          setSliderRectanglesN(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Predict-Then-Check Section */}
                  <div className="p-4 bg-gold-950/30 rounded-xl border border-gold-900/60">
                    <span className="text-xs font-bold text-gold-300 uppercase tracking-wider block mb-2">
                      🔮 Predict-Then-Check Investigation
                    </span>
                    <p className="text-sm text-slate-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                    {!predictionMade ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left bg-slate-900 border border-slate-700 hover:border-gold-500 rounded-lg text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 text-xs">
                        <p className="text-amber-300 mb-1">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                        <span className="text-emerald-400 font-bold">
                          Current Ratio: {(exactAreaX2 / (8 / 3)).toFixed(2)}x of baseline b=2!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 2: Area Between Two Curves */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 240" className="w-full h-56">
                      <line x1="40" y1="200" x2="460" y2="200" stroke="#475569" strokeWidth="1.5" />
                      <line x1="40" y1="20" x2="40" y2="200" stroke="#475569" strokeWidth="1.5" />

                      {/* Shaded Area Between Curves */}
                      <path
                        d={`M 40 200 
                          ${Array.from({ length: 31 })
                            .map((_, i) => {
                              const px = i / 30;
                              const pyUpper = sliderCurveK * Math.sqrt(px);
                              const sx = 40 + px * 350;
                              const sy = 200 - (pyUpper / 2) * 160;
                              return `L ${sx} ${sy}`;
                            })
                            .join(' ')}
                          ${Array.from({ length: 31 })
                            .map((_, i) => {
                              const px = 1 - i / 30;
                              const pyLower = px * px;
                              const sx = 40 + px * 350;
                              const sy = 200 - (pyLower / 2) * 160;
                              return `L ${sx} ${sy}`;
                            })
                            .join(' ')} Z`}
                        fill="#6366f1"
                        opacity={0.35}
                        stroke="#818cf8"
                        strokeWidth="1.5"
                      />

                      {/* Curves */}
                      <text x="360" y="50" fill="#38bdf8" fontSize="12" fontWeight="bold">
                        y = {sliderCurveK}√x (Upper)
                      </text>
                      <text x="360" y="170" fill="#f43f5e" fontSize="12" fontWeight="bold">
                        y = x² (Lower)
                      </text>
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-300 font-bold">Upper Curve Multiplier (k): {sliderCurveK}</span>
                      <span className="text-gold-400">Area Formula: ∫ [k√x - x²] dx</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      value={sliderCurveK}
                      aria-label="Curve K multiplier slider"
                      onChange={(e) => {
                        setSliderCurveK(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <div className="mt-3 p-3 bg-slate-900 rounded-lg text-xs text-slate-300 flex justify-between">
                      <span>Intersection Point: (1, 1)</span>
                      <span className="text-emerald-400 font-bold">
                        Calculated Lens Area: {((2 / 3) * sliderCurveK - 1 / 3).toFixed(3)} sq units
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Differential Equations - Order & Degree */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { eq: '(d²y/dx²)³ + (dy/dx)⁴ + y = 0', order: 2, degree: 3, desc: 'Polynomial in derivatives' },
                      { eq: '√(1 + (dy/dx)²) = d²y/dx²', order: 2, degree: 2, desc: 'Radical requires squaring' },
                      { eq: 'd³y/dx³ + sin(dy/dx) = 0', order: 3, degree: 'Undefined', desc: 'Non-polynomial transcendental' },
                    ].map((item, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDeIndex(idx)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selectedDeIndex === idx
                            ? 'bg-gold-950 border-gold-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs text-gold-400 font-mono block mb-2">Sample #{idx + 1}</span>
                        <div className="font-mono text-sm text-white font-bold mb-2">{item.eq}</div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Order: <strong className="text-amber-400">{item.order}</strong></span>
                          <span>Degree: <strong className="text-emerald-400">{item.degree}</strong></span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm space-y-2">
                    <span className="font-bold text-gold-300">🏛️ The Building Analogy:</span>
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                      • <strong>Order</strong> is the top floor of the building (the highest derivative level, like 2nd or 3rd derivative).
                      <br />
                      • <strong>Degree</strong> is the height of the antenna on THAT specific top floor (the exponent on the highest derivative, after all radicals on derivatives are squared away).
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Linear Differential Equations (dy/dx + Py = Q) */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="font-mono text-sm sm:text-base text-gold-300 font-bold text-center p-3 bg-slate-900 rounded-xl border border-gold-900/60">
                      dy/dx + ({sliderPVal})y = 0 ⟹ Integrating Factor IF = e^{`{${sliderPVal}x}`}
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <p>• General Solution: <code className="text-amber-400">y = C · e^{`{-${sliderPVal}x}`}</code></p>
                      <p>• For Initial Condition y(0) = 10, Particular Solution is: <code className="text-emerald-400">y(t) = 10 · e^{`{-${sliderPVal}x}`}</code></p>
                    </div>

                    <div className="pt-3">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-300 font-bold">Coefficient P: {sliderPVal}</span>
                        <span className="text-gold-400">Half-life Decay Speed</span>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={4}
                        step={0.5}
                        value={sliderPVal}
                        aria-label="Linear DE coefficient P slider"
                        onChange={(e) => {
                          setSliderPVal(Number(e.target.value));
                          audioManager.play('balance');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 5: 3D Vector Thrust & Magnitude */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-mono font-bold text-gold-300 mb-2">
                      v̄ = {vectorX}î + {vectorY}ĵ + {vectorZ}k̂
                    </div>
                    <div className="text-lg font-bold text-emerald-400">
                      Magnitude |v̄| = √({vectorX}² + {vectorY}² + {vectorZ}²) = {vectorMagnitude.toFixed(2)} units
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 block mb-1">X-Component (î): {vectorX}</span>
                      <input
                        type="range"
                        min={-10}
                        max={10}
                        value={vectorX}
                        aria-label="Vector X component"
                        onChange={(e) => {
                          setVectorX(Number(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 block mb-1">Y-Component (ĵ): {vectorY}</span>
                      <input
                        type="range"
                        min={-10}
                        max={10}
                        value={vectorY}
                        aria-label="Vector Y component"
                        onChange={(e) => {
                          setVectorY(Number(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 block mb-1">Z-Component (k̂): {vectorZ}</span>
                      <input
                        type="range"
                        min={-10}
                        max={10}
                        value={vectorZ}
                        aria-label="Vector Z component"
                        onChange={(e) => {
                          setVectorZ(Number(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm shadow-md"
                  >
                    Next Lab Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md"
                  >
                    Enter Free Play Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                🎮 Free Exploration Sandbox
              </h2>
              <p className="text-xs text-slate-400">Zero pressure, zero grading. Experiment with all models.</p>
            </div>

            <div className="flex gap-2">
              {(['area', 'curves', 'de', 'vector'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setSandboxTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    sandboxTab === tab ? 'bg-gold-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
            {sandboxTab === 'area' && (
              <div className="space-y-4">
                <canvas ref={canvasRef} width={480} height={200} className="w-full bg-slate-950 rounded-xl border border-slate-800" />
                <div className="flex justify-between items-center text-sm p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span>Upper Bound: <strong className="text-amber-400">x = {sliderLimitB}</strong></span>
                  <span>Calculated Area: <strong className="text-emerald-400">{exactAreaX2.toFixed(2)} sq units</strong></span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={4}
                  step={0.1}
                  value={sliderLimitB}
                  aria-label="Sandbox limit slider"
                  onChange={(e) => setSliderLimitB(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
            )}

            {sandboxTab === 'curves' && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-4">
                <span className="text-gold-300 font-bold">Lens Area Between y = {sliderCurveK}√x and y = x²</span>
                <div className="text-3xl font-mono text-emerald-400 font-bold">
                  {((2 / 3) * sliderCurveK - 1 / 3).toFixed(3)} sq units
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={2.5}
                  step={0.1}
                  value={sliderCurveK}
                  aria-label="Sandbox curve K slider"
                  onChange={(e) => setSliderCurveK(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
            )}

            {sandboxTab === 'de' && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-sm">
                <div className="text-gold-300 font-bold">Linear Differential Equation Solver:</div>
                <div className="p-3 bg-slate-900 rounded-lg text-slate-200">
                  dy/dx + ({sliderPVal})y = 4 ⟹ IF = e^{`{${sliderPVal}x}`}
                </div>
                <div className="text-emerald-400 text-xs">
                  General Solution: y(x) = {4 / sliderPVal} + C · e^{`{-${sliderPVal}x}`}
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={sliderPVal}
                  aria-label="Sandbox linear DE P slider"
                  onChange={(e) => setSliderPVal(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
            )}

            {sandboxTab === 'vector' && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
                <div className="text-xl font-mono text-gold-300">
                  Vector: {vectorX}î + {vectorY}ĵ + {vectorZ}k̂
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                  |v̄| = {vectorMagnitude.toFixed(3)}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    value={vectorX}
                    aria-label="Sandbox vector X"
                    onChange={(e) => setVectorX(Number(e.target.value))}
                    className="accent-gold-500"
                  />
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    value={vectorY}
                    aria-label="Sandbox vector Y"
                    onChange={(e) => setVectorY(Number(e.target.value))}
                    className="accent-gold-500"
                  />
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    value={vectorZ}
                    aria-label="Sandbox vector Z"
                    onChange={(e) => setVectorZ(Number(e.target.value))}
                    className="accent-gold-500"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg"
              >
                Ready for Graded Challenges! 🎯 →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Competency Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 font-mono capitalize">
                NEP 2020: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-purple-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Main Question Card with Motion Shake on Wrong */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-rose-900/30 shadow-lg'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="text-xs uppercase font-bold tracking-wider text-gold-400 mb-2">
              Node: {challenge.nodeId}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h2>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    animate={wrongShake && wrongFlash ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : showExplanation && i !== challenge.correctIndex
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="px-2 py-0.5 rounded bg-slate-950/60 text-xs font-mono text-gold-400">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items into the correct boxes:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('box_scalar')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                  >
                    <span className="text-xs text-slate-400 font-bold mb-1">SCALAR (Magnitude Only)</span>
                    <span className="text-sm font-bold text-gold-300">{droppedLabels.box_scalar || 'Drop Here'}</span>
                  </div>

                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('box_vector')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                  >
                    <span className="text-xs text-slate-400 font-bold mb-1">VECTOR (Magnitude + Direction)</span>
                    <span className="text-sm font-bold text-gold-300">{droppedLabels.box_vector || 'Drop Here'}</span>
                  </div>
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Verify Mapping ✓
                </motion.button>
              </div>
            )}

            {/* TYPE 3: Drag Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block mb-1">Drag and drop items to arrange in correct execution order:</span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-700 flex items-center gap-3 cursor-grab text-sm text-slate-200"
                  >
                    <span className="px-2 py-0.5 rounded bg-gold-900/60 text-gold-300 text-xs font-mono font-bold">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-2 px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Verify Sequence Order ✓
                </motion.button>
              </div>
            )}

            {/* TYPE 4: Numeric */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    aria-label="Numeric answer input"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-gold-500 focus:outline-none w-48"
                  />
                  <span className="text-slate-400 text-sm">{challenge.unit}</span>
                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-gold-600 text-white font-bold rounded-xl text-sm shadow-md disabled:opacity-50"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: Construct */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-white text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-gold-900/70 border border-gold-700 rounded text-xs font-mono text-white flex items-center gap-1">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200 ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click tiles above to build the equation</span>
                  )}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Test Construction ✓
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-800/80 rounded-2xl space-y-4"
              >
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <span>📖 Step-by-Step Formal Derivation</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-200/90 leading-relaxed"
                      >
                        <strong className="text-amber-400">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-800/80 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Test Arc 🏁' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950/70 to-slate-900 rounded-3xl border border-gold-800 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Calculus Mastery Attained!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You successfully solved areas under simple curves, bounded regions between crossing graphs, order & degree analysis, separation of variables, homogeneous forms, linear integrating factors, and 3D vectors!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left mt-4">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">BKT Mastery</span>
                <span className="text-xl font-bold text-gold-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Questions Solved</span>
                <span className="text-xl font-bold text-amber-400">{scoreBreakdown.correct} / {scoreBreakdown.total}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-purple-800/80 bg-purple-950/40 shadow-inner">
                <span className="text-xs text-purple-300 block font-bold">📅 Spaced Repetition</span>
                <span className="text-xl font-extrabold text-purple-300">
                  {errors === 0 ? 'Review in 7 Days' : errors <= 3 ? 'Review in 3 Days' : 'Review in 1 Day'}
                </span>
                <span className="text-[10px] text-purple-400/80 block mt-0.5">SM-2 Spaced Retrieval</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-800/80">
            <h3 className="text-sm font-bold text-emerald-300 mb-1">🌟 Performance Assessment</h3>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              {errors === 0
                ? 'Flawless execution! You demonstrated comprehensive mastery across all calculus application nodes with zero errors. Your next review is scheduled in 7 days for optimal memory retention.'
                : errors <= 3
                ? 'Superb performance! You have a firm command over integrals, differential equations, and vector geometry. Revisit in 3 days to consolidate your mastery.'
                : 'Good effort! Review the misconception points below to turn your weak spots into permanent strengths. A refresher is recommended tomorrow (1 day).'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/80 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                ⚠️ Your Diagnosed Learning Misconceptions:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-bold mb-1">❌ Trapped by: "{m.misconception}"</p>
                      <p className="text-emerald-300">✓ Mastered rule: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Completion Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              🛠️ {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {REAL_WORLD_ACTIVITY.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK MODALS & BURSTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Arc Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_MathematicsAreaUnderSimpleSim;
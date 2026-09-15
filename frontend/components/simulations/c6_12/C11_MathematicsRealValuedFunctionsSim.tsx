'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 MATHEMATICS NODE IDENTIFIERS ───
const NODE_C11_MATH_011 = 'c11_math_011';
const NODE_C11_MATH_012 = 'c11_math_012';
const NODE_C11_MATH_013 = 'c11_math_013';
const NODE_C11_MATH_014 = 'c11_math_014';
const NODE_C11_MATH_015 = 'c11_math_015';
const NODE_C11_MATH_016 = 'c11_math_016';
const NODE_C11_MATH_017 = 'c11_math_017';
const NODE_C11_MATH_018 = 'c11_math_018';
const NODE_C11_MATH_019 = 'c11_math_019';
const NODE_C11_MATH_020 = 'c11_math_020';

const ALL_NODE_IDS = [
  NODE_C11_MATH_011,
  NODE_C11_MATH_012,
  NODE_C11_MATH_013,
  NODE_C11_MATH_014,
  NODE_C11_MATH_015,
  NODE_C11_MATH_016,
  NODE_C11_MATH_017,
  NODE_C11_MATH_018,
  NODE_C11_MATH_019,
  NODE_C11_MATH_020,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Mission Flight Path & Signal Telemetry',
  intro: 'ISRO flight telemetry uses mathematical functions to model orbital trajectories, radar signals, and antenna rotations. From step-signals and hyperbolic attenuation to unit-circle satellite alignments, you are the Lead Telemetry Analyst.',
  context: 'Calibrate standard real-valued functions, diagnose domain singularities, and align circular radars using radian coordinates.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Radar pulse f(t) = √(t - 2) and beacon signal g(t) = √(6 - t) are combined into a joint signal (f + g)(t). On what time interval t is the combined telemetry stream valid?',
  options: [
    'All real numbers R — signals always overlap',
    '[2, 6] — only where both individual signals are defined simultaneously',
    '[2, ∞) — as long as the first radar starts',
    '(-∞, 6] — until the beacon shuts down',
  ],
  correctIndex: 1,
  hintAfter: 'A combined function exists only on the INTERSECTION of both domains. Let us explore real-valued functions interactively!',
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

// ─── 21 CURATED CHALLENGES (NEP 2020 & CISCE Standards) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION 1 (c11_math_011 - Recall)
  {
    id: 'ch_m11_01',
    nodeId: NODE_C11_MATH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the domain and range of the constant real-valued function f(x) = -7?',
    options: [
      'Domain: R, Range: {-7}',
      'Domain: {-7}, Range: R',
      'Domain: R, Range: -7 (a bare number, not a set)',
      'Domain: [-7, ∞), Range: R',
    ],
    correctIndex: 0,
    explanation: 'A constant function f(x) = c is defined for all real x, so its domain is R. Its range is the singleton set {c}, which must be written in proper set notation {-7}.',
    hints: [
      'Can you feed any real number into the formula f(x) = -7?',
      'What values can the output f(x) ever produce?',
      'Remember: In ISC marking, range must be written as a set {-7}, not a single bare number.',
    ],
    misconceptionIndex: 0,
  },
  // FOUNDATION 2 (c11_math_012 - Understanding)
  {
    id: 'ch_m11_02',
    nodeId: NODE_C11_MATH_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The signum function sgn(x) categorises signal voltage. What is the exact value of sgn(0)?',
    options: ['+1', '-1', '0', 'Undefined'],
    correctIndex: 2,
    explanation: 'By standard piecewise definition: sgn(x) = +1 for x > 0, -1 for x < 0, and sgn(0) = 0 exactly. Its range is the three-element set {-1, 0, 1}.',
    hints: [
      'Think of sgn(x) as a three-state traffic light: negative, zero, positive.',
      'At exactly zero, there is neither positive nor negative sign.',
      'sgn(0) = 0, giving range {-1, 0, 1}.',
    ],
    misconceptionIndex: 2,
  },
  // FOUNDATION 3 (c11_math_013 - Understanding)
  {
    id: 'ch_m11_03',
    nodeId: NODE_C11_MATH_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Evaluate the greatest integer floor function at a negative decimal: [-3.4].',
    options: ['-3', '-4', '-3.4', '3'],
    correctIndex: 1,
    explanation: '[x] is the greatest integer LESS than or equal to x. Integers ≤ -3.4 are -4, -5, -6... The largest of these is -4. Never just truncate the decimal for negative numbers!',
    hints: [
      'Draw a number line. Locate -3.4.',
      'Which integers lie to the LEFT of -3.4?',
      'The greatest integer to the left of -3.4 is -4.',
    ],
    misconceptionIndex: 1,
  },
  // FOUNDATION 4 (c11_math_014 - Drag-Label Diagram)
  {
    id: 'ch_m11_04',
    nodeId: NODE_C11_MATH_014,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each function family label to match its geometric graph signature.',
    dragItems: [
      { label: 'Modulus |x|', targetId: 'box_v' },
      { label: 'Hyperbola 1/x', targetId: 'box_hyp' },
      { label: 'Staircase [x]', targetId: 'box_step' },
      { label: 'Parabola x²', targetId: 'box_u' },
    ],
    correctMapping: {
      box_v: 'Modulus |x|',
      box_hyp: 'Hyperbola 1/x',
      box_step: 'Staircase [x]',
      box_u: 'Parabola x²',
    },
    explanation: '|x| forms a symmetric V-shape; 1/x forms a two-branched hyperbola with asymptotes at the axes; [x] forms a staircase with jump discontinuities; x² forms a smooth U-parabola.',
    hints: [
      'The V-shape with vertex at (0,0) belongs to absolute value.',
      'Curves avoiding both axes belong to the reciprocal function.',
      'Horizontal flat steps with jumps belong to greatest integer.',
    ],
  },
  // FOUNDATION 5 (c11_math_017 - Recall)
  {
    id: 'ch_m11_05',
    nodeId: NODE_C11_MATH_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'By universal mathematical convention, what determines the sign (+ or -) of a geometric angle?',
    options: [
      'The quadrant where the terminal ray ends up',
      'The direction of rotation: anticlockwise is positive, clockwise is negative',
      'Whether the angle is acute or obtuse',
      'The ratio of sine to cosine',
    ],
    correctIndex: 1,
    explanation: 'Angle sign is strictly determined by direction of rotation from the initial ray: anticlockwise = positive (+), clockwise = negative (-). Coterminal angles can land in the same quadrant with opposite signs.',
    hints: [
      'Think of winding a clock hand.',
      'Clockwise is considered negative (like a withdrawal).',
      'Anticlockwise rotation is defined as positive (+).',
    ],
  },
  // FOUNDATION 6 (c11_math_018 - Numeric Calculation)
  {
    id: 'ch_m11_06',
    nodeId: NODE_C11_MATH_018,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An ISRO radar dish of radius r = 14 m rotates through an angle θ = 0.5 radians. Calculate the arc length S swept by the dish tip in metres. (S = rθ)',
    correctAnswer: 7,
    tolerance: 0.1,
    unit: 'm',
    explanation: 'Arc length S = rθ = 14 m × 0.5 rad = 7.0 metres.',
    hints: [
      'Use the fundamental arc length relation S = rθ.',
      'θ is already provided in radians (0.5 rad).',
      'Multiply 14 by 0.5.',
    ],
  },
  // FOUNDATION 7 (c11_math_019 - Recall Cardinal)
  {
    id: 'ch_m11_07',
    nodeId: NODE_C11_MATH_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On the unit circle x² + y² = 1, what are the coordinates of point P at angle θ = π (180°)?',
    options: ['(0, 1)', '(-1, 0)', '(0, -1)', '(1, 0)'],
    correctIndex: 1,
    explanation: 'At θ = π, the terminal ray points along the negative x-axis. Hence P = (cos π, sin π) = (-1, 0). Cosine is -1 and Sine is 0.',
    hints: [
      'A rotation of π rad lands directly on the negative horizontal axis.',
      'Horizontal displacement x = -1, vertical height y = 0.',
      'Therefore (cos π, sin π) = (-1, 0).',
    ],
  },
  // STANDARD 8 (c11_math_011 - Quadratic Range Analysis)
  {
    id: 'ch_m11_08',
    nodeId: NODE_C11_MATH_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Find the exact range of the quadratic polynomial f(x) = 2x² - 8x + 11.',
    options: ['R (all real numbers)', '[3, ∞)', '[-3, ∞)', '[11, ∞)'],
    correctIndex: 1,
    explanation: 'Leading coefficient a = 2 > 0 (parabola opens upward). Vertex x = -b/(2a) = 8/4 = 2. Vertex y = f(2) = 2(4) - 8(2) + 11 = 8 - 16 + 11 = 3. Thus the range is [3, ∞).',
    hints: [
      'Does a quadratic parabola cover all of R or have a turning vertex?',
      'Find the vertex x-coordinate using x = -b/(2a).',
      'Evaluate f(2) to find the minimum value k, then range is [k, ∞).',
    ],
  },
  // STANDARD 9 (c11_math_012 - Rational Domain Analysis)
  {
    id: 'ch_m11_09',
    nodeId: NODE_C11_MATH_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student cancels (x + 1) in f(x) = (x² - 1)/(x + 1) and writes "Domain is all R". Why is this marked WRONG by ISC examiners?',
    options: [
      'The cancelled expression has degree 2, not 1',
      'Domain is determined by the ORIGINAL denominator before simplification: x = -1 causes division by 0 and must be excluded as a hole (removable discontinuity)',
      'The numerator was factored incorrectly',
      'Polynomials cannot be divided',
    ],
    correctIndex: 1,
    explanation: 'The domain of f(x) = p(x)/q(x) is R \\ {zeros of q(x)}. Even if a factor cancels algebraically, f(-1) is undefined (0/0) in the original function. The domain is R \\ {-1}.',
    hints: [
      'What happens if you plug x = -1 into the original denominator (x + 1)?',
      'Can we evaluate 0 / 0 in real arithmetic?',
      'Algebraic simplification reveals the limit, but the original domain excludes zeros of the original denominator.',
    ],
    misconceptionIndex: 0,
  },
  // STANDARD 10 (c11_math_013 - Logarithmic Domain Application)
  {
    id: 'ch_m11_010',
    nodeId: NODE_C11_MATH_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In sensor telemetry, signal attenuation is modeled by f(x) = ln(2x - 8). What is the mathematical domain of this function?',
    options: ['[4, ∞)', '(4, ∞)', '(-∞, 4)', 'R \\ {4}'],
    correctIndex: 1,
    explanation: 'The logarithmic argument must be strictly positive: 2x - 8 > 0 ⇒ 2x > 8 ⇒ x > 4. Notice x = 4 is excluded (open parenthesis) because ln(0) is undefined.',
    hints: [
      'Can you take the logarithm of zero or a negative number?',
      'Set the interior argument 2x - 8 > 0 (strict inequality).',
      'Solve for x: x > 4, giving open interval (4, ∞).',
    ],
    misconceptionIndex: 0,
  },
  // STANDARD 11 (c11_math_015 - Drag-Sort Function Combination Process)
  {
    id: 'ch_m11_011',
    nodeId: NODE_C11_MATH_015,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the systematic steps for finding the valid domain of a combined function (f + g)(x) = √(x - 3) + √(9 - x).',
    sortItems: [
      'Find domain of f(x): x - 3 ≥ 0 ⇒ [3, ∞)',
      'Find domain of g(x): 9 - x ≥ 0 ⇒ (-∞, 9]',
      'Intersect the individual domains: [3, ∞) ∩ (-∞, 9]',
      'State combined domain as the overlap interval [3, 9]',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'To find Dom(f + g), first determine Dom(f), then determine Dom(g), and finally intersect both sets. The combined function exists only where both ingredients exist.',
    hints: [
      'Always analyze the restrictions on each individual function first.',
      'Next, remember that pointwise addition requires both outputs simultaneously.',
      'Intersection of [3, ∞) and (-∞, 9] yields [3, 9].',
    ],
  },
  // STANDARD 12 (c11_math_016 - Quotient Domain Analysis)
  {
    id: 'ch_m11_012',
    nodeId: NODE_C11_MATH_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Determine the exact domain of the quotient function (f/g)(x) where f(x) = √(x - 1) and g(x) = x - 5.',
    options: [
      'R \\ {5}',
      '[1, ∞)',
      '[1, 5) ∪ (5, ∞)',
      '(1, 5) ∪ (5, ∞)',
    ],
    correctIndex: 2,
    explanation: 'Dom(f) = [1, ∞) and Dom(g) = R. Their intersection is [1, ∞). Next, exclude zeros of g(x): x - 5 = 0 ⇒ x = 5. Hence Dom(f/g) = [1, ∞) \\ {5} = [1, 5) ∪ (5, ∞).',
    hints: [
      'Step 1: What is the domain of √(x - 1)? (x ≥ 1)',
      'Step 2: Where does the denominator g(x) equal 0? (x = 5)',
      'Combine: Take x ≥ 1 and remove x = 5.',
    ],
  },
  // STANDARD 13 (c11_math_017 - Unit Conversion Application)
  {
    id: 'ch_m11_013',
    nodeId: NODE_C11_MATH_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert an anticlockwise rotation angle of 135° into radians expressed as a decimal multiplier of π (i.e., enter the fraction 135/180 as a decimal).',
    correctAnswer: 0.75,
    tolerance: 0.01,
    unit: '× π rad',
    explanation: '135° × (π / 180°) = 135π / 180 = 3π / 4 = 0.75π radians.',
    hints: [
      'Conversion formula: Multiply degrees by π / 180.',
      '135 / 180 simplifies to 3 / 4.',
      '3/4 in decimal is 0.75.',
    ],
  },
  // STANDARD 14 (c11_math_018 - Sector Area Application)
  {
    id: 'ch_m11_014',
    nodeId: NODE_C11_MATH_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A solar collector sector has radius r = 6 m and central angle θ = π/3 rad (60°). Compute the exact collector area in m² divided by π (i.e. find A / π where A = ½ r² θ).',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: '× π m²',
    explanation: 'A = ½ r² θ = ½ (36)(π/3) = ½ (12π) = 6π m². Therefore A / π = 6.',
    hints: [
      'Sector area formula: A = ½ r² θ (with θ in radians).',
      'r² = 6² = 36.',
      'A = ½ × 36 × (π/3) = 6π.',
    ],
  },
  // STANDARD 15 (c11_math_019 - ASTC Quadrant Evaluation)
  {
    id: 'ch_m11_015',
    nodeId: NODE_C11_MATH_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate sin(5π/3) using reference angles and the ASTC unit circle rule.',
    options: ['+√3 / 2', '-√3 / 2', '+1 / 2', '-1 / 2'],
    correctIndex: 1,
    explanation: '5π/3 = 300° lies in Quadrant IV. Reference angle = 2π - 5π/3 = π/3 (60°). In QIV, Sine is negative (ASTC: only Cosine is positive). Thus sin(5π/3) = -sin(π/3) = -√3/2.',
    hints: [
      'Which quadrant does 300° (5π/3) lie in? (Quadrant IV)',
      'What is the acute angle with the x-axis? (2π - 5π/3 = π/3)',
      'In Quadrant IV, is the y-coordinate (sine) positive or negative?',
    ],
    misconceptionIndex: 0,
  },
  // ADVANCED 16 (c11_math_020 - Identity Construct / Proof)
  {
    id: 'ch_m11_016',
    nodeId: NODE_C11_MATH_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the algebraic derivation of the secondary Pythagorean identity by dividing sin²x + cos²x = 1 by cos²x.',
    availableParts: ['sin²x/cos²x', '+', 'cos²x/cos²x', '=', '1/cos²x', '⇒', 'tan²x', '+ 1', '=', 'sec²x'],
    targetState: 'sin²x/cos²x + cos²x/cos²x = 1/cos²x ⇒ tan²x + 1 = sec²x',
    validationHint: 'Assemble: [sin²x/cos²x] [+] [cos²x/cos²x] [=] [1/cos²x] [⇒] [tan²x] [+ 1] [=] [sec²x]',
    explanation: 'Dividing sin²x + cos²x = 1 across by cos²x (for cos x ≠ 0) transforms the identity directly into tan²x + 1 = sec²x.',
    hints: [
      'Start by writing the quotient of each term divided by cos²x.',
      'Recall: sin x / cos x = tan x, and 1 / cos x = sec x.',
      'Assemble the full equation leading to tan²x + 1 = sec²x.',
    ],
  },
  // ADVANCED 17 (c11_math_020 - Trigonometric Quadrant Evaluation)
  {
    id: 'ch_m11_017',
    nodeId: NODE_C11_MATH_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Given sin x = -3/5 with angle x located in Quadrant III (π < x < 3π/2), find the exact value of sec x.',
    options: ['-5/4', '+5/4', '-4/5', '+4/3'],
    correctIndex: 0,
    explanation: 'From sin²x + cos²x = 1: cos²x = 1 - 9/25 = 16/25 ⇒ cos x = -4/5 (negative in QIII). Secant is reciprocal of cosine: sec x = 1/cos x = -5/4.',
    hints: [
      'Use cos²x = 1 - sin²x to find the magnitude of cos x.',
      'In Quadrant III, cosine is NEGATIVE.',
      'sec x is the reciprocal of cos x.',
    ],
  },
  // ADVANCED 18 (c11_math_014 - Symmetry & Even/Odd Evaluation)
  {
    id: 'ch_m11_018',
    nodeId: NODE_C11_MATH_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the symmetry properties of f(x) = |x| and g(x) = 1/x. Which statement is mathematically rigorous?',
    options: [
      'Both functions are even and symmetric about the y-axis',
      'f(x) is even (f(-x) = f(x), y-axis symmetry); g(x) is odd (g(-x) = -g(x), origin point symmetry)',
      'f(x) is odd; g(x) is even',
      'Neither function possesses algebraic symmetry',
    ],
    correctIndex: 1,
    explanation: 'f(-x) = |-x| = |x| = f(x) (Even function, symmetric across y-axis). g(-x) = 1/(-x) = -1/x = -g(x) (Odd function, 180° rotational symmetry about origin).',
    hints: [
      'Test f(-x): Does |-x| equal |x|?',
      'Test g(-x): Does 1/(-x) equal -(1/x)?',
      'Even functions reflect over y-axis; odd functions rotate 180° around origin.',
    ],
  },
  // ADVANCED 19 (c11_math_016 - Tangent Singularity Analysis)
  {
    id: 'ch_m11_019',
    nodeId: NODE_C11_MATH_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Using quotient function principles, why does tan x = sin x / cos x have vertical asymptotes at x = π/2 + nπ (n ∈ Z)?',
    options: [
      'Because sin x becomes infinite at these points',
      'Because the denominator cos x = 0 at odd multiples of π/2, making the quotient undefined and creating vertical asymptotes',
      'Because the unit circle has radius zero at π/2',
      'Because the angle rotates clockwise instead of anticlockwise',
    ],
    correctIndex: 1,
    explanation: 'The quotient (f/g)(x) is undefined wherever the denominator vanishes. Since cos(π/2 + nπ) = 0, tan x experiences division by zero, creating infinite vertical asymptotes.',
    hints: [
      'What happens to a quotient when its denominator approaches zero?',
      'At what angles does cos x equal 0?',
      'cos x = 0 at ±π/2, ±3π/2, creating vertical asymptotes for tan x.',
    ],
  },
  // ADVANCED 20 (c11_math_018 - Pendulum Real-World Modeling)
  {
    id: 'ch_m11_020',
    nodeId: NODE_C11_MATH_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A seismic sensor pendulum of length r = 50 cm swings through an angle of 18°. Calculate the arc length S traversed by the bob in cm. (Use π = 3.1416, round to 2 decimal places).',
    correctAnswer: 15.71,
    tolerance: 0.1,
    unit: 'cm',
    explanation: 'Convert angle to radians: 18° × (π / 180°) = π / 10 = 0.31416 rad. Arc length S = rθ = 50 cm × 0.31416 rad = 15.708 ≈ 15.71 cm.',
    hints: [
      'FIRST convert 18° to radians: θ = 18 × π / 180 = π/10 rad.',
      'Apply S = rθ with r = 50 cm and θ = 0.31416 rad.',
      '50 × 0.31416 = 15.708 ≈ 15.71 cm.',
    ],
    misconceptionIndex: 0,
  },
  // ADVANCED 21 (c11_math_019 - Real Angle Unit Circle Evaluation)
  {
    id: 'ch_m11_021',
    nodeId: NODE_C11_MATH_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "sin²(120°) + cos²(120°) = 1 cannot be true because a right triangle cannot contain a 120° angle." How should this claim be evaluated?',
    options: [
      'The claim is correct; the identity is only valid for 0° ≤ θ ≤ 90°',
      'The claim is false: on the unit circle x² + y² = 1, any angle θ corresponds to point (cos θ, sin θ). Since P lies on the circle by definition, cos²θ + sin²θ = 1 holds for ALL real θ.',
      'The identity only works in Quadrants I and IV where cosine is positive',
      'The identity requires 120° to be converted to negative degrees first',
    ],
    correctIndex: 1,
    explanation: 'Class 10 triangle proofs were restricted to acute angles, but the Class 11 unit circle definition establishes that P = (cos θ, sin θ) is ON the circle x² + y² = 1 for EVERY real angle θ without exception.',
    hints: [
      'Does the unit circle definition depend on acute right triangles?',
      'Point P(cos θ, sin θ) lies on x² + y² = 1 for any real rotation θ.',
      'Substituting gives cos²θ + sin²θ = 1 universally for all real numbers.',
    ],
    misconceptionIndex: 1,
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_MATH_011,
  title: 'Real-Valued Functions & Unit Circle Trigonometry',
  definition: 'A real-valued function maps inputs from a subset of R to a unique real output. Graph signatures, domain intersections, step discontinuities, and unit-circle coordinates (cos θ, sin θ) define modern mathematical telemetry.',
  eli5: 'Think of functions as signal machines: some stretch smoothly, some have forbidden divide-by-zero holes, and trigonometric functions are just your GPS coordinates as you walk around a unit circle!',
  misconceptions: [
    {
      misconception: 'Cancelling common factors in rational functions removes domain restrictions.',
      correction: 'Domain is strictly governed by the ORIGINAL denominator before algebraic cancellation.',
    },
    {
      misconception: '[-2.3] = -2 because we just truncate the fractional decimal.',
      correction: 'The floor function returns the greatest integer LESS than or equal to x: [-2.3] = -3.',
    },
    {
      misconception: 'The signum of zero is 1 or undefined.',
      correction: 'By precise definition, sgn(0) = 0 exactly. Its range is {-1, 0, 1}.',
    },
    {
      misconception: 'The identity sin²x + cos²x = 1 only applies to acute right triangles.',
      correction: 'Because P(cos x, sin x) lies on the unit circle x² + y² = 1, it holds for all real x.',
    },
    {
      misconception: 'Arc length S = rθ works with angles measured in degrees.',
      correction: 'S = rθ and A = ½r²θ are dimensionally valid ONLY when θ is in RADIANS.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the range of f(x) = 5?', options: ['{5}', 'R', '[5, ∞)', '5'], correctIndex: 0 },
    { question: 'What is the domain of f(x) = 1/(x - 3)?', options: ['R \\ {3}', 'R', '[3, ∞)', '(3, ∞)'], correctIndex: 0 },
    { question: 'Evaluate sgn(-4.5):', options: ['-1', '0', '+1', '-4.5'], correctIndex: 0 },
    { question: 'Evaluate floor [-1.1]:', options: ['-2', '-1', '1', '0'], correctIndex: 0 },
    { question: 'Convert 90° to radians:', options: ['π/2', 'π', '2π', 'π/4'], correctIndex: 0 },
    { question: 'What is the arc length for r = 10, θ = 2 rad?', options: ['20', '5', '10', '40'], correctIndex: 0 },
    { question: 'Point P on unit circle at θ = π/2 is:', options: ['(0, 1)', '(1, 0)', '(-1, 0)', '(0, -1)'], correctIndex: 0 },
    { question: 'Value of sin²(250°) + cos²(250°) is:', options: ['1', '0', '-1', 'Undefined'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master standard function families, domain intersections, floor operations, and unit circle ASTC quadrant evaluation.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION LAB STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Standard Function Morphing Lab',
    instruction: 'Select standard function families and adjust parameters to witness real-time curve transformations.',
    interactionType: 'function-morph',
    nodeId: NODE_C11_MATH_011,
  },
  {
    title: '2. Rational Asymptotes & Singularities',
    instruction: 'Drag the denominator zero slider to inspect vertical asymptotes and divide-by-zero holes.',
    interactionType: 'rational-asymptote',
    nodeId: NODE_C11_MATH_012,
  },
  {
    title: '3. Pointwise Arithmetic & Domain Overlap',
    instruction: 'Combine two signal functions f(x) and g(x) and observe the domain intersection in real time.',
    interactionType: 'domain-intersect',
    nodeId: NODE_C11_MATH_015,
  },
  {
    title: '4. Arc Length & Sector Geometry',
    instruction: 'Adjust the circle radius and radian angle to observe the arc crust S and sector area A.',
    interactionType: 'arc-sector-lab',
    nodeId: NODE_C11_MATH_018,
  },
  {
    title: '5. Dynamic Unit Circle & ASTC Coordinates',
    instruction: 'Rotate the terminal vector around the unit circle to inspect (cos θ, sin θ) and quadrant signs.',
    interactionType: 'unit-circle-trig',
    nodeId: NODE_C11_MATH_019,
  },
];

// ─── PREDICTION CHALLENGES ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you slide the floor function input x from -2.1 to -2.9, what happens to [x]?',
    options: [
      '[x] remains constant at -3 across the entire interval [-3, -2)',
      '[x] decreases continuously from -2.1 to -2.9',
      '[x] flips to +2 because magnitude grows',
      '[x] jumps between -2 and -3',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Floor Function slider below to verify the horizontal step behaviour!',
    nodeId: NODE_C11_MATH_013,
  },
  {
    question: 'Predict: When an angle θ moves from Quadrant I to Quadrant II, what happens to (cos θ, sin θ)?',
    options: [
      'Both coordinates become negative',
      'Cosine (x) becomes negative while Sine (y) remains positive',
      'Sine (y) becomes negative while Cosine (x) remains positive',
      'Both coordinates stay strictly positive',
    ],
    correctIndex: 1,
    verifyInstruction: 'Rotate the unit circle angle past 90° into Quadrant II and watch the coordinate indicators!',
    nodeId: NODE_C11_MATH_019,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the hyperbola y = 1/(x - c) as x approaches the singularity c?',
    observableOptions: [
      'The curve shoots towards positive or negative infinity without ever touching x = c',
      'The curve crosses the vertical line smoothly at zero',
      'The curve turns into a straight 45° diagonal line',
      'The graph disappears entirely everywhere',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MATH_012,
  },
  {
    question: 'What happens to the sum of squares (cos θ)² + (sin θ)² as you complete full revolutions?',
    observableOptions: [
      'It constantly oscillates between 0 and 2',
      'It remains EXACTLY equal to 1.0 at every single angle, confirming the Pythagorean circle identity',
      'It grows proportionally with the rotation angle θ',
      'It equals 1 only at 0°, 90°, 180°, and 270°',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_MATH_020,
  },
];

// ─── REAL WORLD TELEMETRY CAPSTONE ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Telemetry Station Calibration',
  description: 'Apply real-valued functions and circular trigonometry to calibrate an antenna tracking an Earth-observation satellite.',
  steps: [
    'Define the line-of-sight elevation function E(t) = √(t - 10) for acquisition pass time t ≥ 10 s.',
    'Align the parabolic dish by rotating θ = 2.4 radians (Quadrant II) with coordinates (cos 2.4, sin 2.4).',
    'Calculate total arc length swept on the 12-metre tracking track using S = rθ.',
    'Verify that the quadrature receiver satisfies sin²θ + cos²θ = 1.000 for signal integrity.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C11_MathematicsRealValuedFunctionsSim({
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

  // Phase State: 'discovery' -> 'explore' -> 'sandbox' -> 'challenge' -> 'complete'
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Brilliant.org Pedagogical States
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);
  const [predictionVerified, setPredictionVerified] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);

  // Adaptive BKT & Scoring State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Escalating Hint States
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Visual Feedback States
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Interactive Question Type States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Interactive Lab Variables (5+ Sliders & Controls)
  const [selectedFuncFamily, setSelectedFuncFamily] = useState<'identity' | 'quadratic' | 'modulus' | 'signum' | 'floor' | 'rational'>('quadratic');
  const [paramA, setParamA] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(0);
  const [paramC, setParamC] = useState<number>(-2);
  const [denominatorZero, setDenominatorZero] = useState<number>(2);
  const [testInputX, setTestInputX] = useState<number>(-2.4);
  const [domainA, setDomainA] = useState<number>(1);
  const [domainB, setDomainB] = useState<number>(7);
  const [circleRadius, setCircleRadius] = useState<number>(8);
  const [circleAngleDeg, setCircleAngleDeg] = useState<number>(135);
  const [activeTab, setActiveTab] = useState<'visual' | 'table' | 'algebra'>('visual');

  // Persistence Refs & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived Trigonometric & Circular Metrics
  const circleAngleRad = useMemo(() => (circleAngleDeg * Math.PI) / 180, [circleAngleDeg]);
  const unitCos = useMemo(() => Math.cos(circleAngleRad), [circleAngleRad]);
  const unitSin = useMemo(() => Math.sin(circleAngleRad), [circleAngleRad]);
  const unitTan = useMemo(() => (Math.abs(unitCos) > 0.001 ? unitSin / unitCos : Infinity), [unitCos, unitSin]);
  const arcLengthS = useMemo(() => circleRadius * circleAngleRad, [circleRadius, circleAngleRad]);
  const sectorAreaA = useMemo(() => 0.5 * circleRadius * circleRadius * circleAngleRad, [circleRadius, circleAngleRad]);
  const pythagoreanSum = useMemo(() => unitCos * unitCos + unitSin * unitSin, [unitCos, unitSin]);

  // Quadrant Identifier
  const currentQuadrant = useMemo(() => {
    const normalised = ((circleAngleDeg % 360) + 360) % 360;
    if (normalised > 0 && normalised < 90) return 'Quadrant I (All +)';
    if (normalised > 90 && normalised < 180) return 'Quadrant II (Sin +)';
    if (normalised > 180 && normalised < 270) return 'Quadrant III (Tan +)';
    if (normalised > 270 && normalised < 360) return 'Quadrant IV (Cos +)';
    if (normalised === 0 || normalised === 360) return 'Axis (+X)';
    if (normalised === 90) return 'Axis (+Y)';
    if (normalised === 180) return 'Axis (-X)';
    return 'Axis (-Y)';
  }, [circleAngleDeg]);

  // Adaptive Challenge Filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
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

  // ─── BKT ADAPTIVE DIFFICULTY HOOK ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : (mastery === 'developing' ? 'standard' : 'advanced');
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 2D ANIMATION LOOP (Telemetry Waveform) ───
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

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // Center axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      // Dynamic animated function trace
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const originX = canvas.width / 2;
      const originY = canvas.height / 2;
      const scale = 20;

      for (let px = 0; px < canvas.width; px++) {
        const xVal = (px - originX) / scale;
        let yVal = 0;

        if (selectedFuncFamily === 'identity') {
          yVal = paramA * xVal + paramB;
        } else if (selectedFuncFamily === 'quadratic') {
          yVal = paramA * xVal * xVal + paramB * xVal + paramC;
        } else if (selectedFuncFamily === 'modulus') {
          yVal = paramA * Math.abs(xVal) + paramB;
        } else if (selectedFuncFamily === 'signum') {
          yVal = xVal > 0 ? 1 : xVal < 0 ? -1 : 0;
        } else if (selectedFuncFamily === 'floor') {
          yVal = Math.floor(xVal);
        } else if (selectedFuncFamily === 'rational') {
          if (Math.abs(xVal - denominatorZero) < 0.1) continue;
          yVal = 1 / (xVal - denominatorZero);
        }

        const py = originY - yVal * scale;
        if (px === 0) ctx.moveTo(px, Math.max(-50, Math.min(canvas.height + 50, py)));
        else ctx.lineTo(px, Math.max(-50, Math.min(canvas.height + 50, py)));
      }
      ctx.stroke();

      // Animated scanner dot
      const scanX = (frame * 1.5) % canvas.width;
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(scanX, 15, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedFuncFamily, paramA, paramB, paramC, denominatorZero]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS & CALLBACKS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Mathematics Laboratory. Explore functions by doing!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode activated. Adjust parameters with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting competency challenges. Calibrate telemetry accurately!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the interactive control to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise mathematical observation!' : 'Inspect the asymptotes carefully.');
  }, []);

  const handleAngleSliderChange = useCallback((deg: number) => {
    setCircleAngleDeg(deg);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && deg > 90 && deg < 180) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission complete! You achieved ${finalScore} percent telemetry accuracy.`);
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Telemetry locked.');
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
        speechManager.speak('Let us analyze the step-by-step mathematical reasoning.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

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
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let current = [...prev];
      if (current.length === 0 && challenge.sortItems) {
        current = challenge.sortItems.map((_, i) => i);
      }
      const [moved] = current.splice(fromIdx, 1);
      current.splice(toIdx, 0, moved);
      return current;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructAdd = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleConstructRemove = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleTabSwitch = useCallback((tab: 'visual' | 'table' | 'algebra') => {
    setActiveTab(tab);
    audioManager.play('tap');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-xl border border-indigo-700/50">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium">ISC Class 11 Mathematics • Relations, Functions & Unit Circle</p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-400'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 border-rose-500/50 text-rose-400'
                : 'bg-indigo-950/70 border-indigo-500/50 text-indigo-400'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="px-3 py-1 bg-slate-800/80 rounded-full text-xs text-slate-300 font-mono border border-slate-700">
            Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider bg-indigo-900/50 px-2.5 py-1 rounded-md">
              Scenario Calibration
            </span>
            <h2 className="text-xl font-bold text-white mt-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 font-mono bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
              ⚡ {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">🔍 Discovery Challenge:</span>
              <span className="text-xs text-slate-400">(Low stakes curiosity hook)</span>
            </div>
            <p className="text-white font-medium text-base">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/40 border border-slate-700/40 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 space-y-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Both radicands require x ≥ 2 and x ≤ 6 simultaneously.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Laboratory →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
                </div>
                <p className="text-xs text-amber-300 bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-600/40">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: Function Morphing Lab */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-4 space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300">Select Family:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['identity', 'quadratic', 'modulus', 'signum', 'floor', 'rational'] as const).map(fam => (
                        <motion.button
                          key={fam}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedFuncFamily(fam);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                            selectedFuncFamily === fam
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {fam}
                        </motion.button>
                      ))}
                    </div>

                    {selectedFuncFamily === 'quadratic' && (
                      <div className="space-y-3 pt-2">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>a (Curvature): {paramA}</span>
                            <span>{paramA > 0 ? 'Opens Up' : 'Opens Down'}</span>
                          </div>
                          <input
                            type="range"
                            min={-3}
                            max={3}
                            step={0.5}
                            value={paramA}
                            onChange={e => setParamA(parseFloat(e.target.value) || 1)}
                            className="w-full accent-indigo-500"
                            aria-label="Quadratic curvature slider"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>c (Vertical Shift): {paramC}</span>
                          </div>
                          <input
                            type="range"
                            min={-5}
                            max={5}
                            step={1}
                            value={paramC}
                            onChange={e => setParamC(parseInt(e.target.value))}
                            className="w-full accent-indigo-500"
                            aria-label="Quadratic vertical shift slider"
                          />
                        </div>
                      </div>
                    )}

                    <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-800/40 text-xs text-indigo-300">
                      <strong>Mathematical Law:</strong>{' '}
                      {selectedFuncFamily === 'quadratic'
                        ? `f(x) = ${paramA}x² + ${paramC}. Domain = R, Range = [${paramC}, ∞).`
                        : selectedFuncFamily === 'modulus'
                        ? 'f(x) = |x|. Domain = R, Range = [0, ∞). V-shape symmetry.'
                        : selectedFuncFamily === 'signum'
                        ? 'sgn(x) = {-1 for x<0, 0 for x=0, 1 for x>0}. Range = {-1,0,1}.'
                        : selectedFuncFamily === 'floor'
                        ? '[x] = Floor step function. Discontinuous at every integer Z.'
                        : 'f(x) = x (Identity line through origin at 45°).'}
                    </div>
                  </div>

                  <div className="lg:col-span-8 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <canvas ref={canvasRef} width={420} height={240} className="w-full max-w-md rounded-lg shadow-inner" />
                    <span className="text-xs text-slate-500 mt-2">Real-time Cartesian Telemetry Plotter</span>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Rational Singularities & Asymptote Lab */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-5 space-y-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-sm font-bold text-white">Rational Singularity: f(x) = 1 / (x - {denominatorZero})</h4>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Singularity Pole c: {denominatorZero}</span>
                        <span className="text-rose-400 font-mono">x = {denominatorZero} forbidden</span>
                      </div>
                      <input
                        type="range"
                        min={-4}
                        max={4}
                        step={1}
                        value={denominatorZero}
                        onChange={e => setDenominatorZero(parseInt(e.target.value))}
                        className="w-full accent-rose-500"
                        aria-label="Denominator zero singularity pole slider"
                      />
                    </div>

                    <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800/40 text-xs text-rose-300">
                      <strong>Singularity Analysis:</strong> Domain is <code>R \ &#123;{denominatorZero}&#125;</code>. The vertical line <code>x = {denominatorZero}</code> is an asymptote where function values diverge to ±∞.
                    </div>

                    {!observationAnswered && (
                      <div className="pt-2 space-y-2">
                        <p className="text-xs font-bold text-amber-300">{OBSERVATION_QUESTIONS[0].question}</p>
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 320 200" className="w-full h-48">
                      {/* Grid & axes */}
                      <line x1="0" y1="100" x2="320" y2="100" stroke="#334155" strokeWidth="1.5" />
                      <line x1="160" y1="0" x2="160" y2="200" stroke="#334155" strokeWidth="1.5" />
                      {/* Asymptote */}
                      <line
                        x1={160 + denominatorZero * 25}
                        y1="0"
                        x2={160 + denominatorZero * 25}
                        y2="200"
                        stroke="#f43f5e"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <text x={165 + denominatorZero * 25} y="20" fill="#f43f5e" fontSize="10">
                        x = {denominatorZero}
                      </text>
                      {/* Hyperbola branches */}
                      <path
                        d={`M 10,${100 - (1 / ((-150 / 25) - denominatorZero)) * 25} Q ${160 + denominatorZero * 25 - 15},90 ${160 + denominatorZero * 25 - 5},200`}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <path
                        d={`M ${160 + denominatorZero * 25 + 5},0 Q ${160 + denominatorZero * 25 + 15},110 310,${100 - (1 / ((150 / 25) - denominatorZero)) * 25}`}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                    </svg>
                    <p className="text-center text-xs text-slate-400 mt-1">Rectangular Hyperbola with Dynamic Vertical Pole</p>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Domain Overlap & Function Sums */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-400">Signal f(x) = √(x - {domainA}): [a = {domainA}]</label>
                      <input
                        type="range"
                        min={0}
                        max={4}
                        value={domainA}
                        onChange={e => setDomainA(parseInt(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Domain start slider a"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Beacon g(x) = √({domainB} - x): [b = {domainB}]</label>
                      <input
                        type="range"
                        min={5}
                        max={10}
                        value={domainB}
                        onChange={e => setDomainB(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Domain end slider b"
                      />
                    </div>
                  </div>

                  {/* Visual Domain Number Line Intersect */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 120" className="w-full">
                      {/* Base axis */}
                      <line x1="20" y1="60" x2="380" y2="60" stroke="#475569" strokeWidth="2" />
                      {/* Interval f */}
                      <line x1={40 + domainA * 30} y1="40" x2="380" y2="40" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
                      <text x={40 + domainA * 30} y="30" fill="#10b981" fontSize="10">Dom(f) = [{domainA}, ∞)</text>
                      {/* Interval g */}
                      <line x1="20" y1="50" x2={40 + domainB * 30} y2="50" stroke="#6366f1" strokeWidth="6" strokeLinecap="round" />
                      <text x={40 + domainB * 30 - 60} y="75" fill="#6366f1" fontSize="10">Dom(g) = (-∞, {domainB}]</text>
                      {/* Intersection Shading */}
                      <rect
                        x={40 + domainA * 30}
                        y="85"
                        width={(domainB - domainA) * 30}
                        height="18"
                        rx="4"
                        fill="#ec4899"
                        opacity="0.8"
                      />
                      <text x={40 + domainA * 30 + 10} y="98" fill="white" fontSize="11" fontWeight="bold">
                        Dom(f + g) = [{domainA}, {domainB}]
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Arc Length & Sector Geometry */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-5 space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Radius r: {circleRadius} m</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={12}
                        value={circleRadius}
                        onChange={e => setCircleRadius(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Circle radius slider"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Angle θ: {circleAngleDeg}° ({circleAngleRad.toFixed(2)} rad)</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={345}
                        step={15}
                        value={circleAngleDeg}
                        onChange={e => handleAngleSliderChange(parseInt(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Angle in degrees slider"
                      />
                    </div>

                    <div className="space-y-2 pt-2 text-xs">
                      <div className="p-2.5 bg-slate-800 rounded-lg flex justify-between">
                        <span className="text-slate-400">Arc Length S = rθ:</span>
                        <span className="font-bold text-amber-400 font-mono">{arcLengthS.toFixed(2)} m</span>
                      </div>
                      <div className="p-2.5 bg-slate-800 rounded-lg flex justify-between">
                        <span className="text-slate-400">Sector Area A = ½r²θ:</span>
                        <span className="font-bold text-emerald-400 font-mono">{sectorAreaA.toFixed(2)} m²</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 240 240" className="w-56 h-56">
                      <circle cx="120" cy="120" r={circleRadius * 8} fill="none" stroke="#334155" strokeWidth="1.5" />
                      {/* Sector wedge */}
                      <path
                        d={`M 120,120 L ${120 + circleRadius * 8},120 A ${circleRadius * 8} ${circleRadius * 8} 0 ${
                          circleAngleDeg > 180 ? 1 : 0
                        } 0 ${120 + circleRadius * 8 * Math.cos(-circleAngleRad)} ${120 + circleRadius * 8 * Math.sin(-circleAngleRad)} Z`}
                        fill="#6366f1"
                        fillOpacity="0.25"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      {/* Arc highlighting */}
                      <path
                        d={`M ${120 + circleRadius * 8},120 A ${circleRadius * 8} ${circleRadius * 8} 0 ${
                          circleAngleDeg > 180 ? 1 : 0
                        } 0 ${120 + circleRadius * 8 * Math.cos(-circleAngleRad)} ${120 + circleRadius * 8 * Math.sin(-circleAngleRad)}`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="4"
                      />
                      <circle cx="120" cy="120" r="3" fill="white" />
                      <text x="125" y="115" fill="#f59e0b" fontSize="10" fontWeight="bold">
                        S = {arcLengthS.toFixed(1)}m
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Dynamic Unit Circle & ASTC */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-6 space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    {!predictionMade && (
                      <div className="p-3 bg-indigo-950/50 rounded-xl border border-indigo-800 space-y-2">
                        <p className="text-xs font-bold text-indigo-300">Predict-then-Check:</p>
                        <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[1].question}</p>
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Rotate Angle θ: {circleAngleDeg}°</span>
                        <span className="font-bold text-indigo-400">{currentQuadrant}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        step={5}
                        value={circleAngleDeg}
                        onChange={e => handleAngleSliderChange(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Unit circle rotation slider"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-800 rounded-lg">
                        <span className="text-slate-400 block">cos θ (x)</span>
                        <span className={`font-mono font-bold ${unitCos >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {unitCos.toFixed(3)}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-800 rounded-lg">
                        <span className="text-slate-400 block">sin θ (y)</span>
                        <span className={`font-mono font-bold ${unitSin >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {unitSin.toFixed(3)}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-800 rounded-lg">
                        <span className="text-slate-400 block">cos² + sin²</span>
                        <span className="font-mono font-bold text-amber-400">{pythagoreanSum.toFixed(3)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 220 220" className="w-52 h-52">
                      {/* Axes */}
                      <line x1="10" y1="110" x2="210" y2="110" stroke="#334155" strokeWidth="1.5" />
                      <line x1="110" y1="10" x2="110" y2="210" stroke="#334155" strokeWidth="1.5" />
                      <circle cx="110" cy="110" r="80" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 3" />
                      {/* Right triangle in unit circle */}
                      <line x1="110" y1="110" x2={110 + 80 * unitCos} y2="110" stroke="#10b981" strokeWidth="3" />
                      <line x1={110 + 80 * unitCos} y1="110" x2={110 + 80 * unitCos} y2={110 - 80 * unitSin} stroke="#f43f5e" strokeWidth="3" />
                      <line x1="110" y1="110" x2={110 + 80 * unitCos} y2={110 - 80 * unitSin} stroke="#fbbf24" strokeWidth="2" />
                      {/* Point P */}
                      <circle cx={110 + 80 * unitCos} cy={110 - 80 * unitSin} r="5" fill="#38bdf8" />
                      <text x={110 + 80 * unitCos + 8} y={110 - 80 * unitSin} fill="#38bdf8" fontSize="9" fontWeight="bold">
                        P({unitCos.toFixed(2)}, {unitSin.toFixed(2)})
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Prev Lab
                </motion.button>

                <div className="flex gap-1.5">
                  {EXPLORATION_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === i ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Free Sandbox Play →
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
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white">Free Sandbox Exploration</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manipulate the unit vector and telemetry signals with zero grading pressure.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
              >
                Ready for Competency Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-indigo-400">Unit Angle: {circleAngleDeg}°</span>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={circleAngleDeg}
                  onChange={e => setCircleAngleDeg(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                  aria-label="Sandbox angle degrees slider"
                />
                <p className="text-xs text-slate-400">Angle in Radians: {(circleAngleRad).toFixed(3)} rad</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400">Dish Radius: {circleRadius} m</span>
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={circleRadius}
                  onChange={e => setCircleRadius(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                  aria-label="Sandbox dish radius slider"
                />
                <p className="text-xs text-slate-400">Arc Swept S: {(circleRadius * circleAngleRad).toFixed(2)} m</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-200">Pythagorean Check:</span>
                <p className="font-mono text-emerald-400">cos²θ + sin²θ = {pythagoreanSum.toFixed(4)}</p>
                <p className="text-slate-400">Identity holds universally for all real rotations.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: COMPETENCY CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Progress & Telemetry Status Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">
                Challenge {currentChallenge + 1} of {filteredChallenges.length} •{' '}
                <span className="text-indigo-400 uppercase font-bold">{challenge.competencyLevel}</span>
              </span>
              <span className="text-slate-400 font-mono">
                Mastery: <strong className="text-white capitalize">{masteryLevel}</strong>
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 shadow-xl"
          >
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase bg-slate-800 text-indigo-300 border border-slate-700">
                {challenge.type}
              </span>
              <span className="text-xs text-slate-400">ISC Node: {challenge.nodeId}</span>
            </div>

            <h3 className="text-base md:text-lg font-semibold text-white leading-snug">{challenge.question}</h3>

            {/* MCQ INTERFACE */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2.5 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL INTERFACE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2.5 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'box_v', title: 'V-Shape Vertex' },
                    { id: 'box_hyp', title: 'Hyperbola' },
                    { id: 'box_step', title: 'Step Jumps' },
                    { id: 'box_u', title: 'U-Parabola' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-all ${
                        droppedLabels[target.id]
                          ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300'
                          : 'border-slate-700 bg-slate-950/60 text-slate-400'
                      }`}
                    >
                      <span className="text-xs text-slate-400 mb-1">{target.title}</span>
                      <strong className="text-xs font-mono">{droppedLabels[target.id] || 'Drop Here'}</strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg"
                >
                  Verify Diagram Labels →
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT INTERFACE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <div className="space-y-2">
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
                      className="p-3 bg-slate-800 hover:bg-slate-750 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-indigo-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg"
                >
                  Check Step Order →
                </motion.button>
              </div>
            )}

            {/* NUMERIC CALCULATION INTERFACE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step={0.01}
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg disabled:opacity-40"
                  >
                    Submit Telemetry →
                  </motion.button>
                </div>
              </div>
            )}

            {/* EQUATION CONSTRUCT INTERFACE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-indigo-300 font-medium">{challenge.validationHint}</p>

                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructAdd(part)}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-indigo-600/80 rounded-lg text-white font-mono text-xs flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button onClick={() => handleConstructRemove(i)} className="text-rose-300 hover:text-white">✕</button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Assemble formula tokens above...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg"
                >
                  Verify Construction →
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Step-by-Step Rigorous Walkthrough:</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200/90 leading-relaxed"
                    >
                      <strong className="text-amber-400 mr-1.5">{i + 1}.</strong>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Flight Path →' : 'Next Telemetry Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MISSION COMPLETION & CAPSTONE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 rounded-2xl border border-indigo-700/60 shadow-2xl space-y-4">
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/50">
              Flight Telemetry Completed
            </span>
            <h2 className="text-2xl font-black text-white">ISC Class 11 Telemetry Calibration Certified!</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Final Accuracy</span>
                <p className="text-xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Total Attempts</span>
                <p className="text-xl font-black text-indigo-400 mt-1">{scoreBreakdown.total}</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Errors Rectified</span>
                <p className="text-xl font-black text-rose-400 mt-1">{errors}</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Mastery Level</span>
                <p className="text-xl font-black text-amber-400 capitalize mt-1">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-700/50">
            <p className="text-emerald-300 text-xs md:text-sm font-semibold">
              {errors === 0
                ? 'PERFECT SCORE! Flawless mathematical rigor! Every real function and unit circle identity evaluated with perfect precision.'
                : errors <= 3
                ? 'Great work! High mathematical competency achieved. Review the few flagged steps below to lock in a 100% score.'
                : errors <= 7
                ? 'Good effort! You are actively building your function domain intuition. Re-examine the misconception cards below and replay the interactive labs!'
                : 'Do not give up — You WILL get this! Keep practicing and reviewing the steps to master these functions.'}
            </p>
          </div>

          {/* Misconception Diagnostics */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
              <h4 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h4>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 font-medium">✓ CISCE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Notice & Visibility */}
          <div className="p-5 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 rounded-2xl border border-indigo-600/60 shadow-lg space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="text-sm font-extrabold text-white uppercase tracking-wide">
                  Spaced Repetition System (SRS SM-2)
                </span>
              </div>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs rounded-full border border-indigo-400/40">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your performance ({errors} error{errors === 1 ? '' : 's'}), your optimal memory consolidation schedule has been calibrated:
            </p>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className={`p-3 rounded-xl border text-center transition-all ${
                errors === 0
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg ring-2 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
              }`}>
                <span className="text-xs font-semibold block">0 Errors</span>
                <strong className="text-sm md:text-base font-black text-emerald-300 block mt-0.5">7 Days</strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">Deep Long-Term Retention</span>
              </div>

              <div className={`p-3 rounded-xl border text-center transition-all ${
                errors >= 1 && errors <= 3
                  ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-lg ring-2 ring-amber-500/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
              }`}>
                <span className="text-xs font-semibold block">1–3 Errors</span>
                <strong className="text-sm md:text-base font-black text-amber-300 block mt-0.5">3 Days</strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">Reinforce Foundations</span>
              </div>

              <div className={`p-3 rounded-xl border text-center transition-all ${
                errors >= 4
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg ring-2 ring-rose-500/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
              }`}>
                <span className="text-xs font-semibold block">4+ Errors</span>
                <strong className="text-sm md:text-base font-black text-rose-300 block mt-0.5">1 Day</strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">Immediate Consolidation</span>
              </div>
            </div>
          </div>

          {/* Real World Telemetry Capstone */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mathematical Telemetry Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_MathematicsRealValuedFunctionsSim;
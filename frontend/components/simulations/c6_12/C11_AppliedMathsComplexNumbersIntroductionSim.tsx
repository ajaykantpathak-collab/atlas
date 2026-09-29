'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (STRING LITERALS) ───
const NODE_C11_APPMATH_021 = 'c11_appmath_021';
const NODE_C11_APPMATH_022 = 'c11_appmath_022';
const NODE_C11_APPMATH_023 = 'c11_appmath_023';
const NODE_C11_APPMATH_024 = 'c11_appmath_024';
const NODE_C11_APPMATH_025 = 'c11_appmath_025';
const NODE_C11_APPMATH_026 = 'c11_appmath_026';
const NODE_C11_APPMATH_027 = 'c11_appmath_027';
const NODE_C11_APPMATH_028 = 'c11_appmath_028';
const NODE_C11_APPMATH_029 = 'c11_appmath_029';
const NODE_C11_APPMATH_030 = 'c11_appmath_030';

const ALL_NODE_IDS = [
  NODE_C11_APPMATH_021,
  NODE_C11_APPMATH_022,
  NODE_C11_APPMATH_023,
  NODE_C11_APPMATH_024,
  NODE_C11_APPMATH_025,
  NODE_C11_APPMATH_026,
  NODE_C11_APPMATH_027,
  NODE_C11_APPMATH_028,
  NODE_C11_APPMATH_029,
  NODE_C11_APPMATH_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Telemetry & Radar Resonance Lab',
  intro: 'You are a Flight Dynamics Engineer at ISRO Bangalore tracking a sounding rocket payload. Radar impedance, damped aerodynamic vibrations, and orbital trajectory adjustments require solving quadratic equations and handling 2D complex phasors.',
  context: 'Real numbers track altitude along a line, but radar signal phase and oscillatory roots escape onto the 2D Complex Argand Plane where i² = -1.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a radar tuning circuit, the damping equation is x² + 2x + 5 = 0. What happens if you try to solve it on the standard real number line?',
  options: [
    'It has two positive real roots: x = 1 and x = 4',
    'Discriminant is negative (-16), so no real intersection exists — the roots live off the line as 2D complex numbers!',
    'The circuit simply stops working and has zero roots anywhere in mathematics',
    'It simplifies to a linear equation x = -5/2',
  ],
  correctIndex: 1,
  hintAfter: 'Whenever the discriminant D = b² - 4ac < 0, the solutions leave the 1D real axis and enter the 2D Argand plane as complex conjugate pairs!',
};

// ─── PREDICTION QUESTIONS (BRILLIANT PREDICT-THEN-CHECK) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you keep the real part a = 3 fixed and increase the imaginary part b from 4 to 8, what will happen to the modulus |z| and argument θ?',
    options: [
      'Modulus |z| decreases and angle θ approaches 0°',
      'Modulus |z| increases and angle θ rotates closer to +90° (vertical axis)',
      'Modulus |z| stays at 5 and only angle θ shifts',
      'Both modulus and angle stay constant',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Imaginary Part slider b up from 4 to 6 on the Argand plane and watch |z| and θ update in real-time!',
    explanation: 'Since |z| = √(a² + b²) and tan θ = b/a, increasing b increases the vector magnitude |z| and pulls the phase angle toward +90° along the imaginary axis.',
  },
  {
    id: 'pred_2',
    question: 'In the quadratic equation x² - 2x + c = 0 with a = 1, b = -2, what happens to the roots when the constant c is increased from 1 to 5?',
    options: [
      'The two roots remain real and move further apart',
      'The roots remain real and equal at x = 1',
      'Discriminant D drops below 0 (D = 4 - 4c < 0) and the roots split into complex conjugate pairs 1 ± ki',
      'The parabola inverts and opens downwards',
    ],
    correctIndex: 2,
    verifyInstruction: 'In the Quadratic Roots slider controls, set a = 1, b = -2, and drag c from 1 up to 5 to observe D becoming -16 with complex roots 1 ± 2i.',
    explanation: 'Discriminant D = (-2)² - 4(1)(c) = 4 - 4c. When c > 1, D < 0, which splits the real root into two symmetric complex conjugate roots x = 1 ± i√(c - 1).',
  },
];

// ─── OBSERVATION QUESTIONS (BRILLIANT 'WHAT DO YOU NOTICE?') ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Observe the complex conjugate z̄ when toggled on the Argand plane. What geometric transformation occurs?',
    options: [
      'Reflection across the imaginary vertical axis',
      'Reflection across the real horizontal axis while modulus |z| remains unchanged',
      '180° rotation about the origin',
      'Vector magnitude doubles in length',
    ],
    correctIndex: 1,
    observableOptions: [
      'Point reflects vertically across real axis: (a, b) -> (a, -b)',
      'Vector magnitude |z̄| = |z| remains identical',
      'Argument angle θ flips sign to -θ',
    ],
    explanation: 'Complex conjugation negates only the imaginary coordinate (b → -b), producing a clean geometric reflection across the real horizontal axis while preserving distance from the origin.',
  },
  {
    id: 'obs_2',
    question: 'Observe the quadratic parabola and live readout when a > 0 and D < 0 (Positive Definite). What do you notice?',
    options: [
      'The curve touches the x-axis at exactly one point',
      'The parabola floats entirely above the horizontal axis and never crosses f(x) = 0',
      'The parabola opens downward into negative values',
      'The discriminant D fluctuates between positive and negative',
    ],
    correctIndex: 1,
    observableOptions: [
      'The curve stays strictly in the positive half-plane: f(x) > 0 for all real x',
      'No real x-intercepts exist',
      'Discriminant readout shows D < 0 with complex conjugate roots',
    ],
    explanation: 'When leading coefficient a > 0 and D < 0, the parabola has no real zeros and its vertex lies above the x-axis, making the expression Positive Definite for all real x.',
  },
];

// ─── INTERFACES ───
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

interface MisconceptionItem {
  misconception: string;
  correction: string;
}

interface DiagnosticItem {
  question: string;
  options: string[];
  correctIndex: number;
}

interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: MisconceptionItem[];
  diagnosticQuestions?: DiagnosticItem[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_APPMATH_021,
  title: 'Complex Numbers & Quadratic Expressions Explorer',
  definition: 'A complex number z = a + bi extends real numbers into a 2D field where i² = -1. Quadratic equations ax² + bx + c = 0 always possess exactly 2 roots in the complex plane governed by the discriminant D = b² - 4ac and Vieta\'s relations.',
  eli5: 'Think of real numbers like walking forward and backward on a tightrope. Complex numbers give you a trampoline to leap up and down into 2D space. Quadratic equations with no real roots simply have their solutions floating in this 2D sky!',
  misconceptions: [
    {
      misconception: 'The imaginary part of z = a + bi is "bi".',
      correction: 'The imaginary part Im(z) is the real number coefficient b, NOT the term bi. For z = 3 + 4i, Im(z) = 4.',
    },
    {
      misconception: 'Argument is always tan⁻¹(b/a) without checking quadrants.',
      correction: 'tan⁻¹ returns angles in (-π/2, π/2). You must inspect the signs of a and b to adjust θ into the proper principal range (-π, π].',
    },
    {
      misconception: 'If D < 0, the quadratic equation has "no roots".',
      correction: 'By the Fundamental Theorem of Algebra, degree 2 polynomials ALWAYS have 2 roots. If D < 0, they are a pair of complex conjugates p ± qi.',
    },
    {
      misconception: 'When solving reducible equations like x⁴ - 5x² + 4 = 0, stopping at y = 1, 4 is sufficient.',
      correction: 'y is an auxiliary variable (y = x²). You must back-substitute to find the actual roots of the original variable: x = ±1, ±2.',
    },
    {
      misconception: 'If D < 0, the sign of ax² + bx + c changes depending on x.',
      correction: 'When D < 0, the parabola never crosses the x-axis. It is strictly positive definite if a > 0, or strictly negative definite if a < 0 for all real x.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the real part and imaginary part of z = -7 + 3i?',
      options: ['Re = -7, Im = 3i', 'Re = -7, Im = 3', 'Re = 3, Im = -7', 'Re = 7, Im = 3'],
      correctIndex: 1,
    },
    {
      question: 'What is the modulus |z| of z = 3 - 4i?',
      options: ['-1', '7', '5', '25'],
      correctIndex: 2,
    },
    {
      question: 'In which quadrant does z = -2 - 2i lie on the Argand plane, and what is its principal argument?',
      options: ['1st quadrant, π/4', '3rd quadrant, -3π/4', '2nd quadrant, 3π/4', '4th quadrant, -π/4'],
      correctIndex: 1,
    },
    {
      question: 'What is the product (1 + 2i)(3 - i)?',
      options: ['3 - 2i', '5 + 5i', '1 + 7i', '5 - 5i'],
      correctIndex: 1,
    },
    {
      question: 'What are the roots of the quadratic equation x² - 2x + 2 = 0?',
      options: ['x = 1 ± i', 'x = 2 ± 2i', 'x = -1 ± i', 'x = 1 ± 2i'],
      correctIndex: 0,
    },
    {
      question: 'If α and β are the roots of x² - 6x + 8 = 0, what is α + β and αβ?',
      options: ['Sum = -6, Product = 8', 'Sum = 6, Product = 8', 'Sum = 8, Product = 6', 'Sum = 6, Product = -8'],
      correctIndex: 1,
    },
    {
      question: 'What condition guarantees that two quadratics a₁x² + b₁x + c₁ = 0 and a₂x² + b₂x + c₂ = 0 share a common root?',
      options: [
        '(c₁a₂ - c₂a₁)² = (a₁b₂ - a₂b₁)(b₁c₂ - b₂c₁)',
        'b₁² - 4a₁c₁ = b₂² - 4a₂c₂',
        'a₁/a₂ = b₁/b₂ = c₁/c₂',
        'a₁a₂ + b₁b₂ + c₁c₂ = 0',
      ],
      correctIndex: 0,
    },
    {
      question: 'If a quadratic f(x) = ax² + bx + c has a > 0 and D < 0, what can be said about its sign for all real x?',
      options: ['Positive for x > 0 only', 'Negative for all real x', 'Strictly positive for all real x (Positive Definite)', 'Changes sign at x = 0'],
      correctIndex: 2,
    },
  ],
  masteryCriteria: 'Student understands algebraic, polar, and Argand representations of complex numbers, solves quadratic equations with complex roots, transforms roots via Vieta\'s formulas, applies common root conditions, and interprets quadratic sign definite behaviour.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The 2D Complex Argand Plane',
    instruction: 'Drag the real (a) and imaginary (b) sliders. Observe how z = a + bi maps as a vector on the Argand plane with modulus r and argument θ.',
    interactionType: 'slider-argand',
    nodeId: NODE_C11_APPMATH_021,
  },
  {
    title: '2. Conjugate Reflection & Modulus',
    instruction: 'Toggle the conjugate button. See how z̄ = a - bi reflects z across the real horizontal axis while preserving the exact magnitude |z|.',
    interactionType: 'toggle-conjugate',
    nodeId: NODE_C11_APPMATH_022,
  },
  {
    title: '3. Polar Phasors: r(cos θ + i sin θ)',
    instruction: 'Adjust the radius r and angle θ directly. Watch Euler\'s polar phasor rotate seamlessly in the 2D plane.',
    interactionType: 'slider-polar',
    nodeId: NODE_C11_APPMATH_023,
  },
  {
    title: '4. Damped Quadratic Roots in Complex Plane',
    instruction: 'Modify coefficients a, b, c in ax² + bx + c = 0. Notice how the roots slide along the real axis and split into the complex plane when D < 0.',
    interactionType: 'slider-roots',
    nodeId: NODE_C11_APPMATH_025,
  },
  {
    title: '5. Sign of Quadratic & Definiteness',
    instruction: 'Change the leading coefficient "a" and shift the vertex. Observe when the quadratic expression becomes Positive Definite (D < 0, a > 0).',
    interactionType: 'slider-sign',
    nodeId: NODE_C11_APPMATH_030,
  },
];

// ─── 20+ ADAPTIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // ─── FOUNDATION TIER (1-7) ───
  {
    id: 'ch_01',
    nodeId: NODE_C11_APPMATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For the complex impedance z = 5 - 12i ohms, identify the real part Re(z) and imaginary part Im(z).',
    options: [
      'Re(z) = 5, Im(z) = -12i',
      'Re(z) = 5, Im(z) = -12',
      'Re(z) = -12, Im(z) = 5',
      'Re(z) = 5, Im(z) = 12',
    ],
    correctIndex: 1,
    explanation: 'The real part is a = 5. The imaginary part is the real coefficient b = -12. Never include i in Im(z).',
    hints: [
      'Write the complex number in the standard form z = a + bi.',
      'Re(z) is the standalone real term.',
      'Im(z) is the coefficient of i, which is a real number (-12), not -12i.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_APPMATH_022,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Calculate the modulus |z| of the complex number z = 6 + 8i.',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: 'units',
    explanation: '|z| = √(a² + b²) = √(6² + 8²) = √(36 + 64) = √100 = 10.',
    hints: [
      'Recall the Pythagorean distance formula in the complex plane: |z| = √(a² + b²).',
      'Square the real part (6² = 36) and imaginary part (8² = 64).',
      'Add them: 36 + 64 = 100. Take the principal square root: √100 = 10.',
    ],
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_APPMATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Evaluate the fundamental property of the imaginary unit i: What is the value of i²?',
    options: ['+1', '-1', '√-1', '0'],
    correctIndex: 1,
    explanation: 'By definition, i = √-1, which means squaring both sides yields i² = -1.',
    hints: [
      'Recall why complex numbers were introduced.',
      'i is defined as the square root of negative one.',
      'Squaring the square root of -1 gives exactly -1.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_APPMATH_027,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For the quadratic equation 2x² - 12x + 10 = 0, find the sum of the roots using Vieta\'s formula (Sum = -b/a).',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: '',
    explanation: 'Sum of roots = -b/a = -(-12)/2 = 12/2 = 6.',
    hints: [
      'Identify coefficients: a = 2, b = -12, c = 10.',
      'Vieta\'s sum of roots relation is S = -b/a.',
      '-(-12) / 2 = 12 / 2 = 6.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_APPMATH_027,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For the same quadratic equation 2x² - 12x + 10 = 0, find the product of the roots (Product = c/a).',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: '',
    explanation: 'Product of roots = c/a = 10/2 = 5.',
    hints: [
      'Identify coefficients: a = 2, c = 10.',
      'Vieta\'s product formula is P = c/a.',
      '10 / 2 = 5.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_APPMATH_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the complex conjugate of z = -4 + 7i?',
    options: ['4 - 7i', '-4 - 7i', '4 + 7i', '-7 + 4i'],
    correctIndex: 1,
    explanation: 'The complex conjugate z̄ of a + bi is a - bi. The real part stays -4, and the imaginary part flips sign to -7i.',
    hints: [
      'To find the conjugate, reflect across the real axis.',
      'The real part remains unchanged.',
      'Only flip the sign of the imaginary coefficient: +7i becomes -7i.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_APPMATH_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to the Fundamental Theorem of Algebra, how many roots (counting multiplicity) does a quadratic equation of degree 2 have in the complex number system?',
    options: ['At most 1 root', 'Exactly 2 roots', 'Infinitely many roots', '0 roots if D < 0'],
    correctIndex: 1,
    explanation: 'Every polynomial equation of degree n has exactly n complex roots counting multiplicity. For degree 2, there are always exactly 2 roots.',
    hints: [
      'The Fundamental Theorem of Algebra guarantees existence of roots in the complex plane.',
      'The number of roots matches the degree of the polynomial.',
      'A quadratic equation has degree 2, so it has exactly 2 roots.',
    ],
    misconceptionIndex: 2,
  },

  // ─── STANDARD TIER (8-14) ───
  {
    id: 'ch_08',
    nodeId: NODE_C11_APPMATH_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An electrical telemetry filter has two series impedance stages: z₁ = 2 + 3i ohms and z₂ = 1 - 4i ohms. Calculate the combined product z₁ · z₂.',
    options: ['14 - 5i', '2 - 12i', '14 + 5i', '-10 - 5i'],
    correctIndex: 0,
    explanation: '(2 + 3i)(1 - 4i) = 2(1) + 2(-4i) + 3i(1) + 3i(-4i) = 2 - 8i + 3i - 12i² = 2 - 5i - 12(-1) = 2 + 12 - 5i = 14 - 5i.',
    hints: [
      'Use the distributive law (FOIL) to expand the brackets.',
      'Notice the cross terms: 2(-4i) + 3i(1) = -5i.',
      'Remember that -12i² becomes -12(-1) = +12, then add 2 + 12 = 14.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_APPMATH_023,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Drag each complex number to its correct Quadrant on the Argand plane.',
    dragItems: [
      { label: '3 + 2i', targetId: 'quad_1' },
      { label: '-4 + 3i', targetId: 'quad_2' },
      { label: '-2 - 5i', targetId: 'quad_3' },
      { label: '5 - 3i', targetId: 'quad_4' },
    ],
    correctMapping: {
      quad_1: '3 + 2i',
      quad_2: '-4 + 3i',
      quad_3: '-2 - 5i',
      quad_4: '5 - 3i',
    },
    explanation: 'Q1 has Re > 0, Im > 0; Q2 has Re < 0, Im > 0; Q3 has Re < 0, Im < 0; Q4 has Re > 0, Im < 0.',
    hints: [
      'Real part is horizontal (East/West), Imaginary part is vertical (North/South).',
      'Both positive = Q1 (Top-Right), Real negative + Imag positive = Q2 (Top-Left).',
      'Both negative = Q3 (Bottom-Left), Real positive + Imag negative = Q4 (Bottom-Right).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_APPMATH_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the multiplicative inverse (reciprocal) 1/z for z = 1 + i.',
    options: ['1 - i', '1/2 - (1/2)i', '1/2 + (1/2)i', '-1 - i'],
    correctIndex: 1,
    explanation: '1/(1 + i) = (1 - i)/((1 + i)(1 - i)) = (1 - i)/(1² + 1²) = (1 - i)/2 = 1/2 - (1/2)i.',
    hints: [
      'Multiply numerator and denominator by the complex conjugate 1 - i.',
      'Denominator becomes (1 + i)(1 - i) = 1² - i² = 1 + 1 = 2.',
      'Split into real and imaginary components: 1/2 - (1/2)i.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_APPMATH_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve the rocket altitude quadratic equation x² - 4x + 13 = 0 using the quadratic formula.',
    options: ['x = 2 ± 3i', 'x = -2 ± 3i', 'x = 4 ± 6i', 'x = 2 ± 9i'],
    correctIndex: 0,
    explanation: 'D = b² - 4ac = (-4)² - 4(1)(13) = 16 - 52 = -36. x = [-(-4) ± √(-36)] / 2 = [4 ± 6i] / 2 = 2 ± 3i.',
    hints: [
      'Compute discriminant D = (-4)² - 4(1)(13) = 16 - 52 = -36.',
      'Rewrite √(-36) as i√36 = 6i.',
      'Divide both terms by 2a = 2: (4 ± 6i)/2 = 2 ± 3i.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_APPMATH_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Frame the monic quadratic equation whose given roots are α = 3 and β = -7.',
    options: ['x² - 4x - 21 = 0', 'x² + 4x - 21 = 0', 'x² + 4x + 21 = 0', 'x² - 10x - 21 = 0'],
    correctIndex: 1,
    explanation: 'Sum S = 3 + (-7) = -4. Product P = 3(-7) = -21. The formula is x² - Sx + P = 0 => x² - (-4)x + (-21) = x² + 4x - 21 = 0.',
    hints: [
      'Calculate Sum: S = α + β = 3 - 7 = -4.',
      'Calculate Product: P = α · β = 3 · (-7) = -21.',
      'Substitute into x² - Sx + P = 0 => x² - (-4)x + (-21) = 0.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_APPMATH_026,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the systematic steps for solving the reducible biquadratic equation x⁴ - 10x² + 9 = 0 in order.',
    sortItems: [
      'Identify repeated power and introduce auxiliary variable y = x²',
      'Rewrite as quadratic y² - 10y + 9 = 0',
      'Solve reduced quadratic to find y = 1 and y = 9',
      'Back-substitute x² = 1 and x² = 9 to obtain x = ±1, ±3',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Substitution -> Solve auxiliary quadratic -> Back-substitute -> Final roots of x.',
    hints: [
      'First transform the 4th degree equation to 2nd degree by substitution.',
      'Solve the simple quadratic in y.',
      'Never stop at y; back-substitute to find x.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_APPMATH_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Examine the quadratic expression f(x) = 2x² - 4x + 7. Which statement accurately describes its sign for all real x?',
    options: [
      'It is negative for x < 1 and positive for x > 1',
      'It is Positive Definite (strictly f(x) > 0 for all real x)',
      'It is Negative Definite (strictly f(x) < 0 for all real x)',
      'It equals zero at two real points',
    ],
    correctIndex: 1,
    explanation: 'Here a = 2 > 0 and D = (-4)² - 4(2)(7) = 16 - 56 = -40 < 0. When a > 0 and D < 0, the parabola floats entirely above the x-axis, making it Positive Definite.',
    hints: [
      'Check the leading coefficient: a = 2 > 0.',
      'Calculate discriminant: D = b² - 4ac = 16 - 56 = -40 < 0.',
      'When a > 0 and D < 0, the expression is always positive (Positive Definite).',
    ],
    misconceptionIndex: 4,
  },

  // ─── ADVANCED TIER (15-21) ───
  {
    id: 'ch_15',
    nodeId: NODE_C11_APPMATH_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If α and β are roots of x² - 5x + 6 = 0, find the monic quadratic equation whose roots are reciprocal: 1/α and 1/β without finding α, β individually.',
    options: ['6x² - 5x + 1 = 0', 'x² - (5/6)x + 1/6 = 0', 'x² + 5x + 6 = 0', 'x² - (6/5)x + 6 = 0'],
    correctIndex: 1,
    explanation: 'Original S = 5, P = 6. New sum = 1/α + 1/β = (α+β)/(αβ) = S/P = 5/6. New product = 1/(αβ) = 1/P = 1/6. Monic equation: x² - (5/6)x + 1/6 = 0.',
    hints: [
      'Read off original sum S = 5 and product P = 6.',
      'New sum = 1/α + 1/β = (α+β)/(αβ) = S/P = 5/6.',
      'New product = 1/(αβ) = 1/P = 1/6. Equation is x² - (new S)x + (new P) = 0.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_APPMATH_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The equations x² - 5x + 6 = 0 and x² - 7x + k = 0 share a common root x = 2. Determine the exact value of the unknown parameter k.',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: '',
    explanation: 'Since x = 2 satisfies the second equation: 2² - 7(2) + k = 0 => 4 - 14 + k = 0 => -10 + k = 0 => k = 10.',
    hints: [
      'A common root must satisfy both equations simultaneously.',
      'Substitute x = 2 directly into x² - 7x + k = 0.',
      '4 - 14 + k = 0 => k = 10.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_APPMATH_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Convert the complex number z = -√3 + i into its standard polar representation r(cos θ + i sin θ).',
    options: [
      '2(cos(π/6) + i sin(π/6))',
      '2(cos(5π/6) + i sin(5π/6))',
      '2(cos(-π/6) + i sin(-π/6))',
      '4(cos(2π/3) + i sin(2π/3))',
    ],
    correctIndex: 1,
    explanation: 'r = √((-√3)² + 1²) = √(3 + 1) = 2. Since Re < 0 and Im > 0, z is in Quadrant 2. Reference angle is tan⁻¹(1/√3) = π/6. θ = π - π/6 = 5π/6.',
    hints: [
      'Modulus r = √((-√3)² + 1²) = √4 = 2.',
      'Plot (-√3, 1) on Argand plane: it is in the 2nd Quadrant (top-left).',
      'Argument in Q2 is π - reference angle = π - π/6 = 5π/6.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_APPMATH_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the expression for dividing complex numbers by rationalizing with the conjugate: [(a + bi)(c - di)] / ?',
    availableParts: ['c² + d²', 'c² - d²', 'a² + b²', '(c + di)²', 'c + d'],
    targetState: 'c² + d²',
    validationHint: 'What real value does the denominator (c + di)(c - di) simplify to?',
    explanation: '(c + di)(c - di) = c² - (di)² = c² - d²(-1) = c² + d².',
    hints: [
      'Multiply (c + di) by its conjugate (c - di).',
      'Notice difference of squares: c² - d²i².',
      'Replace i² with -1: c² - d²(-1) = c² + d².',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_APPMATH_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An ISRO flight simulator has a safety parameter where the quadratic equation ax² + bx + c = 0 must have reciprocal roots (α = 1/β). What relation between coefficients guarantees this?',
    options: ['b = 0', 'c = a', 'b² - 4ac = 0', 'c = -a'],
    correctIndex: 1,
    explanation: 'For reciprocal roots, product P = α · β = α · (1/α) = 1. By Vieta\'s formula, product P = c/a. Thus c/a = 1 => c = a.',
    hints: [
      'If roots are reciprocals, what is their product α · (1/α)?',
      'The product is 1.',
      'Vieta states Product = c/a. Setting c/a = 1 gives c = a.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_APPMATH_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the condition for a single common root: (c₁a₂ - c₂a₁)² = (a₁b₂ - a₂b₁)(b₁c₂ - b₂c₁). Where does this condition fundamentally originate?',
    options: [
      'From equating discriminants D₁ = D₂',
      'From eliminating the common root α between the simultaneous equations a₁α² + b₁α + c₁ = 0 and a₂α² + b₂α + c₂ = 0 via cross-multiplication',
      'From setting the sum of roots equal',
      'From the Pythagorean theorem on the Argand plane',
    ],
    correctIndex: 1,
    explanation: 'Treating a₁α² + b₁α + c₁ = 0 and a₂α² + b₂α + c₂ = 0 as linear in α² and α, cross-multiplication yields α² and α expressions whose consistency requires (c₁a₂ - c₂a₁)² = (a₁b₂ - a₂b₁)(b₁c₂ - b₂c₁).',
    hints: [
      'Let α be the shared root and write both equations in α.',
      'Eliminate α² and α by cross-multiplication ratios.',
      'Equate (α)² to α² to enforce algebraic consistency.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_APPMATH_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Find the minimum value of the parameter k such that the quadratic expression x² - 6x + k is Positive Definite for all real x. (Hint: D < 0 for strictly positive, find integer threshold k > 9). What is the smallest integer value of k?',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: '',
    explanation: 'For Positive Definite, a = 1 > 0 and D < 0. D = (-6)² - 4(1)(k) = 36 - 4k < 0 => 4k > 36 => k > 9. The smallest integer value is k = 10.',
    hints: [
      'Condition for positive definiteness is a > 0 and D < 0.',
      'D = 36 - 4k < 0 => 4k > 36 => k > 9.',
      'The smallest integer strictly greater than 9 is 10.',
    ],
    misconceptionIndex: 4,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'AC Circuit Resonance & Phasor Design Challenge',
  description: 'Design an RLC resonance circuit for an Indian satellite receiver. Choose Resistance R (Real) and Reactance X (Imaginary) such that total impedance Z = R + jX satisfies |Z| ≤ 50 Ω and Phase Angle θ lies within [-30°, +30°].',
  steps: [
    'Choose R = 40 Ω (Real damping)',
    'Choose X = 20 Ω (Net inductive reactance j20)',
    'Compute magnitude: |Z| = √(40² + 20²) = √2000 ≈ 44.72 Ω (Safe: < 50 Ω)',
    'Verify phase: θ = tan⁻¹(20/40) = 26.57° (Within tolerance limit)',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
export function C11_AppliedMathsComplexNumbersIntroductionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_APPMATH_021,
  title = DEFAULT_PROPS.title || 'Complex Numbers & Quadratics Lab',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Simulation Sliders & State (Real-time Slider-to-Visualization Connection)
  const [realA, setRealA] = useState<number>(3);
  const [imagB, setImagB] = useState<number>(4);
  const [isConjugate, setIsConjugate] = useState<boolean>(false);
  const [polarR, setPolarR] = useState<number>(5);
  const [polarThetaDeg, setPolarThetaDeg] = useState<number>(53);
  const [quadA, setQuadA] = useState<number>(1);
  const [quadB, setQuadB] = useState<number>(-2);
  const [quadC, setQuadC] = useState<number>(5);
  const [activeTab, setActiveTab] = useState<'argand' | 'roots' | 'sign'>('argand');

  // Prediction & Observation Interactive State
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(0);
  const [selectedObservation, setSelectedObservation] = useState<number | null>(null);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(0);

  // Difficulty & Mastery
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Challenge & Feedback State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES ───
  const currentModulus = useMemo(() => {
    const b = isConjugate ? -imagB : imagB;
    return Math.sqrt(realA * realA + b * b);
  }, [realA, imagB, isConjugate]);

  const currentArgRad = useMemo(() => {
    const b = isConjugate ? -imagB : imagB;
    return Math.atan2(b, realA);
  }, [realA, imagB, isConjugate]);

  const currentArgDeg = useMemo(() => {
    return (currentArgRad * 180) / Math.PI;
  }, [currentArgRad]);

  const quadDiscriminant = useMemo(() => {
    return quadB * quadB - 4 * quadA * quadC;
  }, [quadA, quadB, quadC]);

  const quadRoots = useMemo(() => {
    if (quadA === 0) return { type: 'linear', r1: -quadC / quadB, r2: null };
    const D = quadDiscriminant;
    if (D > 0) {
      return {
        type: 'real-distinct',
        r1: (-quadB + Math.sqrt(D)) / (2 * quadA),
        r2: (-quadB - Math.sqrt(D)) / (2 * quadA),
      };
    } else if (D === 0) {
      return {
        type: 'real-equal',
        r1: -quadB / (2 * quadA),
        r2: -quadB / (2 * quadA),
      };
    } else {
      const realPart = -quadB / (2 * quadA);
      const imagPart = Math.sqrt(-D) / (2 * Math.abs(quadA));
      return {
        type: 'complex-conjugate',
        realPart,
        imagPart,
      };
    }
  }, [quadA, quadB, quadC, quadDiscriminant]);

  // Adaptive challenges filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT: ADAPTIVE DIFFICULTY AFTER ATTEMPTS ───
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

  // ─── EFFECT: HTML CANVAS 2D ANIMATION ───
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

      // Draw radar grid
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;

      // Concentric circles
      for (let r = 20; r <= 80; r += 20) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating radar beam
      const angle = (frame * 0.03) % (Math.PI * 2);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * 80, cy + Math.sin(angle) * 80);
      ctx.stroke();

      // Pulsing vector tip
      const bEff = isConjugate ? -imagB : imagB;
      const vx = cx + realA * 12;
      const vy = cy - bEff * 12;

      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(vx, vy, 4 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [realA, imagB, isConjugate]);

  // ─── CALLBACKS ───
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Discriminant is negative, so roots live in the 2D complex plane.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Complex Numbers & Quadratics Lab. Manipulate the sliders to explore.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test any complex numbers or quadratic equations freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us test your skills with interactive challenges!');
  }, []);

  const handleRealChange = useCallback(
    (val: number) => {
      setRealA(val);
      audioManager.play('count');
      resetInactivityTimer();
    },
    [resetInactivityTimer]
  );

  const handleImagChange = useCallback(
    (val: number) => {
      setImagB(val);
      audioManager.play('count');
      resetInactivityTimer();
    },
    [resetInactivityTimer]
  );

  const handleConjugateToggle = useCallback(() => {
    setIsConjugate((prev) => !prev);
    audioManager.play('balance');
    speechManager.speak(isConjugate ? 'Original complex number restored.' : 'Reflected across the real axis as conjugate.');
  }, [isConjugate]);

  const handlePolarRChange = useCallback((val: number) => {
    setPolarR(val);
    audioManager.play('count');
  }, []);

  const handlePolarThetaChange = useCallback((val: number) => {
    setPolarThetaDeg(val);
    audioManager.play('count');
  }, []);

  const handleQuadAChange = useCallback((val: number) => {
    setQuadA(val);
    audioManager.play('count');
  }, []);

  const handleQuadBChange = useCallback((val: number) => {
    setQuadB(val);
    audioManager.play('count');
  }, []);

  const handleQuadCChange = useCallback((val: number) => {
    setQuadC(val);
    audioManager.play('count');
  }, []);

  const handleTabSwitch = useCallback((tab: 'argand' | 'roots' | 'sign') => {
    setActiveTab(tab);
    audioManager.play('tap');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed! Excellent mastery demonstrated.');
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
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
      const arr = prev.length === 0 ? [0, 1, 2, 3] : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    handleAnswer(answer);
  }, [sortArrangement, handleAnswer]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-gold-300 font-medium tracking-wide uppercase">ISC Class 11 • Applied Mathematics</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wider uppercase ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-400 border-rose-700'
                : 'bg-gold-950/80 text-gold-400 border-gold-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Mastery</span>
            <span className="text-sm font-bold text-amber-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-gold-950/70 to-slate-900/90 rounded-2xl border border-gold-800/60">
            <div className="flex items-center gap-2 text-gold-400 mb-2">
              <span className="text-lg">🚀</span>
              <h3 className="font-bold text-lg">{SCENARIO.title}</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-950/40 p-2 rounded-lg border border-slate-800">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Curiosity Discovery Hook</span>
              <span className="text-xs text-slate-400">Low Stakes • No Penalty</span>
            </div>
            <p className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/40 border border-emerald-500 text-emerald-300'
                      : 'bg-slate-900/80 text-slate-200 hover:bg-slate-750 border border-slate-700/60'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-700">
                <p className={`text-sm mb-4 font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Complex numbers unlock the 2D plane for negative discriminants.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration"
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-purple-600 hover:from-gold-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Exploration Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'bg-gold-500' : i < currentSlide ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── PREDICT-THEN-CHECK CARD (BRILLIANT PATTERN) ── */}
          <div className="p-4 bg-gradient-to-r from-gold-950/80 to-purple-950/70 rounded-2xl border border-gold-700/60 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-300 flex items-center gap-1.5">
                🔮 Prediction Challenge #{predictionIndex + 1}
              </span>
              <button
                onClick={() => {
                  setPredictionIndex((prev) => (prev + 1) % PREDICTION_QUESTIONS.length);
                  setSelectedPrediction(null);
                  setPredictionSubmitted(false);
                }}
                className="text-[11px] text-gold-400 hover:text-gold-200 underline"
              >
                Switch Prediction Question
              </button>
            </div>
            <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[predictionIndex].question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PREDICTION_QUESTIONS[predictionIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedPrediction(i);
                    setPredictionSubmitted(true);
                    audioManager.play(i === PREDICTION_QUESTIONS[predictionIndex].correctIndex ? 'success' : 'tap');
                  }}
                  className={`text-left p-2.5 rounded-xl text-xs font-medium transition-all ${
                    predictionSubmitted && i === PREDICTION_QUESTIONS[predictionIndex].correctIndex
                      ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-200'
                      : selectedPrediction === i
                      ? 'bg-gold-700 text-white'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
                  }`}
                >
                  <span className="font-bold text-gold-400 mr-1">{String.fromCharCode(65 + i)}.</span> {opt}
                </button>
              ))}
            </div>
            {predictionSubmitted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2.5 bg-slate-950/80 rounded-xl border border-gold-900/80 text-xs">
                <p className="text-amber-300 font-semibold mb-1">
                  🔍 Verify below: {PREDICTION_QUESTIONS[predictionIndex].verifyInstruction}
                </p>
                <p className="text-slate-400">{PREDICTION_QUESTIONS[predictionIndex].explanation}</p>
              </motion.div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-lg sm:text-xl font-black text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs px-2.5 py-1 bg-gold-950 text-gold-300 rounded-lg border border-gold-700 font-mono">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-sm text-amber-300 font-medium mb-4 bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/50">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* VISUALIZATION CANVAS & SVG WORKSPACE */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* SVG ARGAND & QUADRATIC DIAGRAM */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[320px] relative">
                  {(currentSlide === 0 || currentSlide === 1 || currentSlide === 2) && (
                    <svg viewBox="-150 -150 300 300" className="w-full max-w-[340px] aspect-square overflow-visible">
                      <circle cx="0" cy="0" r="100" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="0" cy="0" r="50" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="-140" y1="0" x2="140" y2="0" stroke="#475569" strokeWidth="1.5" />
                      <line x1="0" y1="-140" x2="0" y2="140" stroke="#475569" strokeWidth="1.5" />

                      <text x="135" y="-6" fill="#94a3b8" fontSize="10" textAnchor="end">
                        Re (Real)
                      </text>
                      <text x="6" y="-130" fill="#94a3b8" fontSize="10">
                        Im (Imaginary)
                      </text>

                      <motion.line
                        x1="0"
                        y1="0"
                        animate={{
                          x2: currentSlide === 2 ? polarR * 16 * Math.cos((polarThetaDeg * Math.PI) / 180) : realA * 16,
                          y2: currentSlide === 2 ? -polarR * 16 * Math.sin((polarThetaDeg * Math.PI) / 180) : -(isConjugate ? -imagB : imagB) * 16,
                        }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        stroke="#6366f1"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <motion.circle
                        animate={{
                          cx: currentSlide === 2 ? polarR * 16 * Math.cos((polarThetaDeg * Math.PI) / 180) : realA * 16,
                          cy: currentSlide === 2 ? -polarR * 16 * Math.sin((polarThetaDeg * Math.PI) / 180) : -(isConjugate ? -imagB : imagB) * 16,
                        }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        r="6"
                        fill="#22c55e"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />

                      {isConjugate && (
                        <g opacity="0.4">
                          <line x1="0" y1="0" x2={realA * 16} y2={-imagB * 16} stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
                          <circle cx={realA * 16} cy={-imagB * 16} r="4" fill="#f43f5e" />
                          <text x={realA * 16 + 8} y={-imagB * 16} fill="#f43f5e" fontSize="9">
                            Original z
                          </text>
                        </g>
                      )}

                      <motion.text
                        animate={{
                          x: currentSlide === 2 ? polarR * 16 * Math.cos((polarThetaDeg * Math.PI) / 180) + 10 : realA * 16 + 10,
                          y: currentSlide === 2 ? -polarR * 16 * Math.sin((polarThetaDeg * Math.PI) / 180) - 10 : -(isConjugate ? -imagB : imagB) * 16 - 10,
                        }}
                        fill="#fbbf24"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        {currentSlide === 2
                          ? `${polarR.toFixed(1)}∠${polarThetaDeg}°`
                          : `z = ${realA} ${isConjugate ? (imagB < 0 ? '+' : '-') : imagB >= 0 ? '+' : '-'} ${Math.abs(imagB)}i`}
                      </motion.text>
                    </svg>
                  )}

                  {(currentSlide === 3 || currentSlide === 4) && (
                    <svg viewBox="-100 -80 200 160" className="w-full max-w-[340px] aspect-video overflow-visible">
                      <line x1="-90" y1="0" x2="90" y2="0" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="0" y1="-70" x2="0" y2="70" stroke="#64748b" strokeWidth="1.5" />
                      <text x="85" y="-4" fill="#94a3b8" fontSize="8" textAnchor="end">
                        x
                      </text>
                      <text x="4" y="-60" fill="#94a3b8" fontSize="8">
                        f(x)
                      </text>

                      {(() => {
                        const points: string[] = [];
                        for (let px = -80; px <= 80; px += 2) {
                          const xVal = px / 15;
                          const yVal = quadA * xVal * xVal + quadB * xVal + quadC;
                          const py = -yVal * 8;
                          if (py >= -75 && py <= 75) {
                            points.push(`${px},${py}`);
                          }
                        }
                        return (
                          <motion.polyline
                            fill="none"
                            stroke="#818cf8"
                            strokeWidth="2.5"
                            points={points.join(' ')}
                            transition={{ duration: 0.2 }}
                          />
                        );
                      })()}

                      <rect x="-85" y="-65" width="70" height="22" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                      <text x="-50" y="-51" fill="#c7d2fe" fontSize="8" fontWeight="bold" textAnchor="middle">
                        D = {quadDiscriminant}
                      </text>
                    </svg>
                  )}

                  <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    <canvas ref={canvasRef} width={80} height={40} className="w-16 h-8 rounded" />
                    <span className="text-[10px] text-gold-300 font-mono">2D Phasor Live</span>
                  </div>
                </div>

                {/* CONTROLS & READOUT DASHBOARD WITH INSTANT SLIDER-TO-VISUALIZATION */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                  {(currentSlide === 0 || currentSlide === 1) && (
                    <>
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Real Part (a): {realA}</span>
                          <span className="text-gold-400 font-mono">Re(z) = {realA}</span>
                        </div>
                        <input
                          type="range"
                          min={-6}
                          max={6}
                          value={realA}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setRealA(val);
                            handleRealChange(val);
                          }}
                          aria-label="Set Real Part"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Imaginary Part (b): {imagB}</span>
                          <span className="text-gold-400 font-mono">Im(z) = {imagB}</span>
                        </div>
                        <input
                          type="range"
                          min={-6}
                          max={6}
                          value={imagB}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setImagB(val);
                            handleImagChange(val);
                          }}
                          aria-label="Set Imaginary Part"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      {currentSlide === 1 && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConjugateToggle}
                          aria-label="Toggle Complex Conjugate"
                          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                            isConjugate
                              ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                              : 'bg-slate-800 text-gold-300 border border-gold-700/60 hover:bg-slate-750'
                          }`}
                        >
                          {isConjugate ? '✓ Conjugate Active (z̄ = a - bi)' : '⚡ Reflect Conjugate (z̄ = a - bi)'}
                        </motion.button>
                      )}

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Modulus |z|:</span>
                          <span className="text-emerald-400 font-bold">{currentModulus.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Arg θ (deg):</span>
                          <span className="text-amber-400 font-bold">{currentArgDeg.toFixed(1)}°</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>z · z̄ = |z|²:</span>
                          <span className="text-gold-300 font-bold">{(currentModulus * currentModulus).toFixed(1)}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {currentSlide === 2 && (
                    <>
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Modulus Radius (r): {polarR.toFixed(1)}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={8}
                          step={0.2}
                          value={polarR}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPolarR(val);
                            handlePolarRChange(val);
                          }}
                          aria-label="Set Polar Radius"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Angle (θ): {polarThetaDeg}°</span>
                        </div>
                        <input
                          type="range"
                          min={-180}
                          max={180}
                          value={polarThetaDeg}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPolarThetaDeg(val);
                            handlePolarThetaChange(val);
                          }}
                          aria-label="Set Polar Angle"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono text-xs">
                        <p className="text-slate-400">Euler / Polar Form:</p>
                        <p className="text-gold-300 font-bold">
                          z = {polarR.toFixed(1)}(cos {polarThetaDeg}° + i sin {polarThetaDeg}°)
                        </p>
                        <p className="text-emerald-400 font-bold">z = {polarR.toFixed(1)} e^(i{((polarThetaDeg * Math.PI) / 180).toFixed(2)})</p>
                      </div>
                    </>
                  )}

                  {(currentSlide === 3 || currentSlide === 4) && (
                    <>
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Coefficient a: {quadA}</span>
                        </div>
                        <input
                          type="range"
                          min={-3}
                          max={3}
                          value={quadA}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setQuadA(val);
                            handleQuadAChange(val);
                          }}
                          aria-label="Set Quadratic Coefficient a"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Coefficient b: {quadB}</span>
                        </div>
                        <input
                          type="range"
                          min={-6}
                          max={6}
                          value={quadB}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setQuadB(val);
                            handleQuadBChange(val);
                          }}
                          aria-label="Set Quadratic Coefficient b"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Constant c: {quadC}</span>
                        </div>
                        <input
                          type="range"
                          min={-8}
                          max={8}
                          value={quadC}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setQuadC(val);
                            handleQuadCChange(val);
                          }}
                          aria-label="Set Quadratic Constant c"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>Nature:</span>
                          <span className="text-amber-400 font-bold">{quadRoots.type}</span>
                        </div>
                        {quadRoots.type === 'complex-conjugate' && (
                          <div className="text-emerald-400 font-bold">
                            Roots: {quadRoots.realPart?.toFixed(2)} ± {quadRoots.imagPart?.toFixed(2)}i
                          </div>
                        )}
                        {quadRoots.type === 'real-distinct' && (
                          <div className="text-emerald-400 font-bold">
                            Roots: {quadRoots.r1?.toFixed(2)}, {quadRoots.r2?.toFixed(2)}
                          </div>
                        )}
                        {currentSlide === 4 && (
                          <div className="text-gold-300 font-bold">
                            Sign: {quadA > 0 && quadDiscriminant < 0 ? 'POSITIVE DEFINITE (+)' : quadA < 0 && quadDiscriminant < 0 ? 'NEGATIVE DEFINITE (-)' : 'Sign Changing'}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── OBSERVATION CARD ('WHAT DO YOU NOTICE?') ── */}
              <div className="mt-4 p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    👀 What Do You Notice? (Observation #{observationIndex + 1})
                  </span>
                  <button
                    onClick={() => {
                      setObservationIndex((prev) => (prev + 1) % OBSERVATION_QUESTIONS.length);
                      setSelectedObservation(null);
                      setObservationSubmitted(false);
                    }}
                    className="text-[11px] text-emerald-400 hover:text-emerald-200 underline"
                  >
                    Next Observation Question
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[observationIndex].question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {OBSERVATION_QUESTIONS[observationIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedObservation(idx);
                        setObservationSubmitted(true);
                        audioManager.play(idx === OBSERVATION_QUESTIONS[observationIndex].correctIndex ? 'success' : 'tap');
                      }}
                      className={`text-left p-2 rounded-lg text-xs transition-all ${
                        observationSubmitted && idx === OBSERVATION_QUESTIONS[observationIndex].correctIndex
                          ? 'bg-emerald-900/70 border border-emerald-400 text-emerald-200 font-bold'
                          : selectedObservation === idx
                          ? 'bg-gold-700 text-white'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}. {opt}
                    </button>
                  ))}
                </div>
                {observationSubmitted && (
                  <div className="mt-2 p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-xs space-y-1">
                    <p className="text-emerald-300 font-bold">Key Observations in Visualization:</p>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                      {OBSERVATION_QUESTIONS[observationIndex].observableOptions.map((obs, i) => (
                        <li key={i}>{obs}</li>
                      ))}
                    </ul>
                    <p className="text-slate-400 mt-1">{OBSERVATION_QUESTIONS[observationIndex].explanation}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* EXPLORATION NAV BUTTONS */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous Exploration Slide"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                aria-label="Next Exploration Slide"
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Go to Free Sandbox Mode"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg flex items-center gap-2"
              >
                Enter Free Sandbox Mode 🚀
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-gold-300">Free Practice Sandbox</h3>
              <p className="text-xs text-slate-300 mt-1">Zero pressure playground. Switch tabs to inspect Phasors, Roots, or Signs.</p>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleTabSwitch('argand')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  activeTab === 'argand' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-300'
                }`}
              >
                Argand Plane
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleTabSwitch('roots')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  activeTab === 'roots' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-300'
                }`}
              >
                Complex Roots
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleTabSwitch('sign')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  activeTab === 'sign' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-300'
                }`}
              >
                Sign Definiteness
              </motion.button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Interactive Inputs</span>
              {activeTab === 'argand' && (
                <>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Real Part a: {realA}</label>
                    <input
                      type="range"
                      min={-6}
                      max={6}
                      value={realA}
                      onChange={(e) => setRealA(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Imaginary Part b: {imagB}</label>
                    <input
                      type="range"
                      min={-6}
                      max={6}
                      value={imagB}
                      onChange={(e) => setImagB(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConjugateToggle}
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white w-full"
                  >
                    Toggle Conjugate Reflection
                  </motion.button>
                </>
              )}

              {(activeTab === 'roots' || activeTab === 'sign') && (
                <>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Quadratic a: {quadA}</label>
                    <input
                      type="range"
                      min={-4}
                      max={4}
                      value={quadA}
                      onChange={(e) => setQuadA(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Quadratic b: {quadB}</label>
                    <input
                      type="range"
                      min={-8}
                      max={8}
                      value={quadB}
                      onChange={(e) => setQuadB(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Quadratic c: {quadC}</label>
                    <input
                      type="range"
                      min={-10}
                      max={10}
                      value={quadC}
                      onChange={(e) => setQuadC(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Readout Display */}
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live Mathematical Readout</span>
              {activeTab === 'argand' && (
                <div className="space-y-2">
                  <p className="text-slate-200">
                    Algebraic Form: <span className="text-gold-400 font-bold">{realA} + {imagB}i</span>
                  </p>
                  <p className="text-slate-200">
                    Conjugate z̄: <span className="text-rose-400 font-bold">{realA} - {imagB}i</span>
                  </p>
                  <p className="text-slate-200">
                    Modulus |z|: <span className="text-emerald-400 font-bold">{currentModulus.toFixed(3)}</span>
                  </p>
                  <p className="text-slate-200">
                    Principal Arg: <span className="text-amber-400 font-bold">{currentArgDeg.toFixed(2)}° ({currentArgRad.toFixed(3)} rad)</span>
                  </p>
                </div>
              )}

              {(activeTab === 'roots' || activeTab === 'sign') && (
                <div className="space-y-2">
                  <p className="text-slate-200">
                    Equation: <span className="text-gold-400 font-bold">{quadA}x² + ({quadB})x + ({quadC}) = 0</span>
                  </p>
                  <p className="text-slate-200">
                    Discriminant D: <span className="text-amber-400 font-bold">{quadDiscriminant}</span>
                  </p>
                  <p className="text-slate-200">
                    Vieta Sum (-b/a): <span className="text-emerald-400 font-bold">{quadA !== 0 ? (-quadB / quadA).toFixed(2) : 'N/A'}</span>
                  </p>
                  <p className="text-slate-200">
                    Vieta Prod (c/a): <span className="text-emerald-400 font-bold">{quadA !== 0 ? (quadC / quadA).toFixed(2) : 'N/A'}</span>
                  </p>
                  <p className="text-slate-200">
                    Definiteness: <span className="text-purple-400 font-bold">
                      {quadA > 0 && quadDiscriminant < 0
                        ? 'Positive Definite'
                        : quadA < 0 && quadDiscriminant < 0
                        ? 'Negative Definite'
                        : 'Not Definite (Sign changes)'}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            aria-label="Ready to Start Challenges"
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-gold-600 hover:from-emerald-500 hover:to-gold-500 text-white rounded-2xl font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2"
          >
            I Am Ready For Graded Challenges! 🎯 →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress and status header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-gold-300 border border-slate-700">
                {challenge.competencyLevel}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              Score: <span className="text-emerald-400 font-bold">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Active Challenge Card */}
          <div className="p-5 sm:p-6 bg-slate-800/95 rounded-2xl border border-slate-700 shadow-xl">
            <p className="text-base sm:text-lg font-semibold text-white mb-4 leading-snug">{challenge.question}</p>

            {/* MCQ OPTIONS */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                        wrongFlash
                          ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-900/80 text-slate-200 hover:bg-slate-750 border border-slate-700/60'
                      }`}
                    >
                      <span className="inline-block w-6 font-bold text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* NUMERIC INPUT */}
            {challenge.type === 'numeric' && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  step="0.1"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Type number..."
                  disabled={showExplanation}
                  aria-label="Numeric answer input"
                  className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                />
                <span className="text-slate-400 text-sm font-bold">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || numericInput.trim() === ''}
                  aria-label="Submit numeric answer"
                  className="px-5 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold shadow-md disabled:opacity-50"
                >
                  Check Value
                </motion.button>
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag item: ${item.label}`}
                      className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['quad_1', 'quad_2', 'quad_3', 'quad_4'].map((targetId, idx) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Quadrant {idx + 1}</span>
                      <span className="text-xs font-bold text-amber-300 mt-1">
                        {droppedLabels[targetId] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                  aria-label="Submit Quadrant Mapping"
                  className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-md disabled:opacity-40"
                >
                  Verify Quadrant Placements
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-4 space-y-3">
                {(sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3]).map((itemIdx, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => handleDragStart(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0', 10);
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-200 text-xs sm:text-sm font-medium flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 rounded-full bg-gold-950 text-gold-400 flex items-center justify-center font-bold text-xs">
                      {displayIdx + 1}
                    </span>
                    {challenge.sortItems![itemIdx]}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Check Sorted Order"
                  className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-gold-800 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 min-h-[50px] flex items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-900 text-emerald-300 rounded font-mono text-xs">
                      {part}
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click parts above to build...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Construction"
                  className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-md disabled:opacity-40"
                >
                  Check Assembled Expression
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE CLICK-TO-REVEAL EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">Step-by-Step Mathematical Walkthrough</span>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    aria-label="Reveal Next Mathematical Step"
                    className="px-4 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to Next Challenge"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize & View Results →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL WORLD ACTIVITY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-800/95 rounded-2xl border border-slate-700 text-center space-y-3">
            <span className="text-4xl block">🎓</span>
            <h2 className="text-2xl font-black text-white">Simulation Completed!</h2>
            <p className="text-sm text-slate-300">
              Final Mastery Score:{' '}
              <span className="text-emerald-400 font-bold text-lg">{Math.max(0, 100 - errors * 5)}%</span>
            </p>
            <p className="text-xs text-slate-400">Knowledge Tracing Status: <span className="text-gold-300 font-bold capitalize">{masteryLevel}</span></p>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-5 bg-emerald-950/40 border border-emerald-700/60 rounded-2xl">
            <p className="text-sm font-semibold text-emerald-300">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered 2D Argand phasors, complex roots, Vieta transformations, and quadratic definiteness!'
                : errors <= 3
                ? '👏 Excellent work! Your conceptual mastery of complex quadratics is strong. Review the reflection below for a 100% score.'
                : '💪 Solid effort! Quadratic and complex transformations take practice. Check your misconception summary below and revisit the labs.'}
            </p>
          </div>

          {/* MISCONCEPTION PROFILE */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Targeted Misconception Feedback:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                    <p className="text-rose-300 font-bold">❌ Common Trap: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Accurate Rule: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* REFLECTION & REVIEW SCHEDULE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-gold-950/40 border border-gold-800/60 rounded-2xl space-y-2 text-xs">
              <h3 className="font-bold text-gold-300 uppercase tracking-wider">Concept Reflection</h3>
              <ul className="space-y-1.5 text-slate-300">
                <li>1. Why is the 2D Argand plane required for negative discriminants?</li>
                <li>2. How do Vieta&apos;s relations (S = -b/a, P = c/a) transform for reciprocal roots?</li>
                <li>3. Why does a &gt; 0 and D &lt; 0 guarantee strict positive definiteness?</li>
              </ul>
            </div>

            <div className="p-5 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-2 text-xs">
              <h3 className="font-bold text-amber-300 uppercase tracking-wider">SM-2 Spaced Review Schedule</h3>
              <p className="text-slate-300">
                Next scheduled review in{' '}
                <span className="font-bold text-amber-400">
                  {errors === 0 ? REVIEW_INTERVAL_DAYS[2] : errors <= 3 ? REVIEW_INTERVAL_DAYS[1] : REVIEW_INTERVAL_DAYS[0]} days
                </span>
                . Spaced repetition solidifies long-term retrieval memory.
              </p>
            </div>
          </div>

          {/* REAL WORLD ACTIVITY */}
          <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-base font-bold text-gold-300">🛰️ {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-900 rounded-lg text-[11px] text-slate-300 border border-slate-800">
                  <span className="text-gold-400 font-bold mr-1">Step {i + 1}:</span> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Milestone Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AppliedMathsComplexNumbersIntroductionSim;
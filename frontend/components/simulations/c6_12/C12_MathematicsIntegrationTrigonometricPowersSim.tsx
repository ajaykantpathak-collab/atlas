'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── REQUIRED NODE CONSTANTS ───
const NODE_C12_MATH_051 = 'c12_math_051';
const NODE_C12_MATH_052 = 'c12_math_052';
const NODE_C12_MATH_053 = 'c12_math_053';
const NODE_C12_MATH_054 = 'c12_math_054';
const NODE_C12_MATH_055 = 'c12_math_055';
const NODE_C12_MATH_056 = 'c12_math_056';
const NODE_C12_MATH_057 = 'c12_math_057';
const NODE_C12_MATH_058 = 'c12_math_058';
const NODE_C12_MATH_059 = 'c12_math_059';
const NODE_C12_MATH_060 = 'c12_math_060';

const ALL_NODE_IDS = [
  NODE_C12_MATH_051, NODE_C12_MATH_052, NODE_C12_MATH_053, NODE_C12_MATH_054, NODE_C12_MATH_055,
  NODE_C12_MATH_056, NODE_C12_MATH_057, NODE_C12_MATH_058, NODE_C12_MATH_059, NODE_C12_MATH_060
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Orbit Accumulator',
  intro: 'You are a flight-dynamics specialist at ISRO Telemetry, Tracking and Command Network (ISTRAC) in Bengaluru. To compute delta-V propulsion integrals and energy dissipation through oscillatory gravity waves, you must resolve complex trigonometric powers, substitutions, special forms, and definite integrals.',
  context: 'A single miscalculated half-angle factor or dropped substitution differential du can send the lunar module into an unstable trajectory. Master each reduction technique to guide the orbital insertion!',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An ISRO telemetry sensor records an oscillatory signal f(x) = sin²(x). A trainee writes ∫ sin²(x) dx = (sin³(x))/3 + C. Why will this fail orbital simulation?',
  options: [
    'It is correct, but requires numerical evaluation',
    'Power rule applies to algebraic xⁿ, not composite functions without their derivative',
    'The answer must always contain only cosine functions',
    'Trigonometric functions cannot be integrated'
  ],
  correctIndex: 1,
  hintAfter: 'Power rule ∫ uⁿ du works ONLY when du = cos(x) dx is present. For sin²(x), we must step down the power using half-angle identity (1 - cos 2x)/2!'
};

// ─── OBSERVATION QUESTIONS (Brilliant.org "What do you notice?" pattern) ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    prompt: 'Look closely at the graph of y = sinⁿ(x) as power n increases from 1 to 4. What happens to the area above the horizontal axis versus below?',
    observableOptions: [
      'Even powers (n=2, 4) stay strictly non-negative (≥0), while odd powers (n=1, 3) oscillate between +1 and -1',
      'Odd powers stay strictly positive, while even powers become completely negative',
      'The period of the wave doubles every time the power increases by 1',
      'The curve becomes a flat straight line at y = 0'
    ],
    correctIndex: 0,
    explanation: 'When n is even, sinⁿ(x) ≥ 0 for all real x, producing only positive area lobes and a positive secular accumulation (e.g., x/2 for sin²x). For odd n, the negative half-cycles cancel symmetric positive lobes!',
    feedback: 'Spot on! Even powers shift the entire energy profile above zero, generating non-zero DC bias in orbital telemetry.'
  },
  {
    id: 'obs_2',
    prompt: 'Observe the King\'s Mirror symmetry diagram. When you slide the reflection probe across the midpoint (a+b)/2, what property is preserved?',
    observableOptions: [
      'The reflected integrand f(a+b-x) covers identical total area under the curve between bounds [a, b]',
      'The integral value flips sign from positive to negative',
      'The upper limit b becomes equal to 0',
      'The area doubles at every intermediate point'
    ],
    correctIndex: 0,
    explanation: 'King\'s Property ∫ₐᵇ f(x) dx = ∫ₐᵇ f(a+b-x) dx relies on the continuous geometric reflection about the midpoint (a+b)/2. Summing both forms produces 2I = ∫ₐᵇ [f(x) + f(a+b-x)] dx, frequently reducing the integrand to a trivial constant!',
    feedback: 'Precisely! Geometric reflection across the bound midpoint leaves the definite integral invariant.'
  }
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Real-World Flight Dynamics Lab: Chandrayaan Delta-V Burn Optimization',
  description: 'Apply trigonometric reduction and definite integral accumulation to evaluate propellant burn efficiency during an actual lunar orbital insertion maneuver.',
  steps: [
    'Measure the oscillating thrust profile F(t) = F₀ · cos²(ωt) delivered by four 800 N bipropellant thrusters over a burn duration of T = 120 seconds.',
    'Apply the half-angle reduction identity cos²(ωt) = (1 + cos(2ωt))/2 to isolate the constant mean thrust from the high-frequency oscillation.',
    'Integrate Δv = (1/m) ∫₀ᵀ F(t) dt to compute net velocity increment imparted to the spacecraft.',
    'Verify that symmetric oscillating terms (sin(2ωT)/(2ω)) contribute negligible perturbation compared to the secular accumulated term T/2.',
    'Calibrate fuel valve timing so thrust pulses align with the lunar orbital perigee to maximize delta-V efficiency (Oberth effect).'
  ]
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

// ─── 24 PROGRESSIVE CHALLENGES (Foundation, Standard, Advanced across 10 Nodes) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Node 051 (Recall)
  {
    id: 'ch_051_1',
    nodeId: NODE_C12_MATH_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which power-reduction identity is used to integrate sin²(x)?',
    options: ['(1 + cos 2x)/2', '(1 - cos 2x)/2', '2 sin(x) cos(x)', '(1 - cos² x)'],
    correctIndex: 1,
    explanation: 'From cos(2x) = 1 - 2sin²(x), rearranging gives sin²(x) = (1 - cos 2x)/2. Integrating gives x/2 - (sin 2x)/4 + C.',
    hints: [
      'Recall cos(2x) in terms of sin²(x).',
      'cos 2x = 1 - 2 sin² x. Solve for sin² x.',
      'sin² x = (1 - cos 2x)/2.'
    ],
    misconceptionIndex: 0
  },
  // 2. Foundation - Node 052 (Understanding)
  {
    id: 'ch_052_1',
    nodeId: NODE_C12_MATH_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'To integrate ∫ 2x (x² + 5)⁴ dx, what is the optimal substitution variable u?',
    options: ['u = 2x', 'u = (x² + 5)⁴', 'u = x² + 5', 'u = x'],
    correctIndex: 2,
    explanation: 'Letting u = x² + 5 yields du = 2x dx, which directly transforms the integral to ∫ u⁴ du = u⁵/5 + C.',
    hints: [
      'Look for the inner function whose derivative is multiplying dx.',
      'd/dx(x² + 5) = 2x, which is present in the integrand.',
      'Choose u = x² + 5 so du = 2x dx.'
    ],
    misconceptionIndex: 1
  },
  // 3. Foundation - Node 053 (Recall)
  {
    id: 'ch_053_1',
    nodeId: NODE_C12_MATH_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is ∫ tan(x) dx in standard logarithmic form?',
    options: ['ln|cos x| + C', '-ln|cos x| + C = ln|sec x| + C', 'ln|sin x| + C', 'sec² x + C'],
    correctIndex: 1,
    explanation: '∫ tan x dx = ∫ (sin x / cos x) dx. Letting u = cos x gives du = -sin x dx, yielding -ln|cos x| + C = ln|sec x| + C.',
    hints: [
      'Write tan x as sin x / cos x.',
      'Let u = cos x, then du = -sin x dx. Notice the minus sign!',
      'The result is -ln|cos x| + C = ln|sec x| + C.'
    ],
    misconceptionIndex: 2
  },
  // 4. Foundation - Node 054 (Recall)
  {
    id: 'ch_054_1',
    nodeId: NODE_C12_MATH_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard formula for ∫ dx / (x² + a²)?',
    options: ['tan⁻¹(x/a) + C', '(1/a) tan⁻¹(x/a) + C', '(1/2a) ln|(x-a)/(x+a)| + C', 'ln|x + √(x²+a²)| + C'],
    correctIndex: 1,
    explanation: 'Using substitution x = a tan θ, dx = a sec²θ dθ, the integral reduces to (1/a) ∫ dθ = (1/a) tan⁻¹(x/a) + C.',
    hints: [
      'Recall the derivative of tan⁻¹(x/a).',
      'd/dx [tan⁻¹(x/a)] = (1/(1+(x/a)²)) * (1/a) = a / (x² + a²).',
      'The prefactor 1/a is required: (1/a) tan⁻¹(x/a) + C.'
    ],
    misconceptionIndex: 3
  },
  // 5. Foundation - Drag Label (Node 058 LIATE) (Understanding)
  {
    id: 'ch_058_1',
    nodeId: NODE_C12_MATH_058,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each function category to its priority position in the LIATE rule for Integration by Parts (1st to 4th shown).',
    dragItems: [
      { label: 'Logarithmic (ln x)', targetId: 'liate_1' },
      { label: 'Inverse Trig (sin⁻¹x)', targetId: 'liate_2' },
      { label: 'Algebraic (x²)', targetId: 'liate_3' },
      { label: 'Exponential (eˣ)', targetId: 'liate_4' }
    ],
    correctMapping: {
      liate_1: 'Logarithmic (ln x)',
      liate_2: 'Inverse Trig (sin⁻¹x)',
      liate_3: 'Algebraic (x²)',
      liate_4: 'Exponential (eˣ)'
    },
    explanation: 'LIATE specifies priority for u: L (Logarithmic) → I (Inverse Trig) → A (Algebraic) → T (Trig) → E (Exponential).',
    hints: [
      'L stands for Logarithmic functions like ln(x).',
      'I stands for Inverse trigonometric functions.',
      'A is Algebraic, and E is Exponential at the end.'
    ]
  },
  // 6. Foundation - Node 059 (Recall)
  {
    id: 'ch_059_1',
    nodeId: NODE_C12_MATH_059,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the Fundamental Theorem of Calculus, if F\'(x) = f(x), then ∫ₐᵇ f(x) dx equals:',
    options: ['F(a) - F(b)', 'F(b) - F(a)', 'F(b) + F(a) + C', 'f(b) - f(a)'],
    correctIndex: 1,
    explanation: 'The Fundamental Theorem evaluates definite integrals as upper limit minus lower limit: F(b) - F(a). Constant C cancels.',
    hints: [
      'Upper limit is substituted first.',
      'Subtract the antiderivative at the lower limit.',
      'Result is F(b) - F(a).'
    ],
    misconceptionIndex: 4
  },
  // 7. Foundation - Node 060 (Understanding)
  {
    id: 'ch_060_1',
    nodeId: NODE_C12_MATH_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If f(x) is an odd function (f(-x) = -f(x)), what is the value of ∫₋ₐᵃ f(x) dx?',
    options: ['2 ∫₀ᵃ f(x) dx', '0', 'a · f(a)', 'Undefined'],
    correctIndex: 1,
    explanation: 'For an odd function over symmetric bounds [-a, a], positive and negative area lobes cancel perfectly to 0.',
    hints: [
      'Odd functions have rotational symmetry about the origin.',
      'The area from -a to 0 is the exact negative of the area from 0 to a.',
      'They sum to zero.'
    ]
  },
  // 8. Standard - Numeric (Node 059 Definite Integral) (Application)
  {
    id: 'ch_059_2',
    nodeId: NODE_C12_MATH_059,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISRO solar thruster delivers acceleration a(t) = 6t² m/s². Calculate the velocity increase Δv = ∫₀² 6t² dt (in m/s).',
    correctAnswer: 16,
    tolerance: 0.1,
    unit: 'm/s',
    explanation: '∫₀² 6t² dt = [6 · (t³/3)]₀² = [2t³]₀² = 2(2³) - 2(0) = 16 m/s.',
    hints: [
      'Antiderivative of 6t² is 6(t³/3) = 2t³.',
      'Evaluate at t = 2: 2(8) = 16.',
      'Evaluate at t = 0: 0. Net change = 16 - 0 = 16.'
    ]
  },
  // 9. Standard - Node 051 (Analysis)
  {
    id: 'ch_051_2',
    nodeId: NODE_C12_MATH_051,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'To integrate ∫ sin³(x) dx, what is the correct algebraic peeling and substitution method?',
    options: [
      'Use sin³(x) = (3 sin x - sin 3x)/4 or peel sin(x) and set u = cos(x)',
      'Set u = sin(x) so du = cos(x) dx',
      'Use power rule: sin⁴(x)/4 + C',
      'Set u = x³'
    ],
    correctIndex: 0,
    explanation: 'Peeling sin³ x = (1 - cos² x) sin x with u = cos x, du = -sin x dx gives -∫(1-u²)du = -cos x + (cos³ x)/3 + C.',
    hints: [
      'For odd powers, peel off one factor: sin³ x = sin² x · sin x.',
      'Convert sin² x to (1 - cos² x).',
      'Substitute u = cos x so du = -sin x dx absorbs the peeled factor.'
    ],
    misconceptionIndex: 0
  },
  // 10. Standard - Drag-Sort (Node 057 Partial Fractions) (Analysis)
  {
    id: 'ch_057_1',
    nodeId: NODE_C12_MATH_057,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of steps to integrate an improper rational function (P(x)/Q(x) where deg P ≥ deg Q).',
    sortItems: [
      'Perform polynomial long division: P(x)/Q(x) = Quotient(x) + R(x)/Q(x)',
      'Factorise denominator Q(x) into linear/quadratic factors',
      'Set up partial fraction template A/(x-a) + B/(x-b)...',
      'Solve constants A, B by equating coefficients or zero substitution',
      'Integrate quotient and each fraction into logarithms/arctangents'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Always divide improper fractions first, factor denominator, decompose proper remainder, solve constants, then integrate.',
    hints: [
      'Long division is step 1 when degree of numerator ≥ denominator.',
      'Next, factor the denominator of the remainder.',
      'Decompose, solve constants, and finally integrate term by term.'
    ]
  },
  // 11. Standard - Node 055 Linear/Quadratic (Application)
  {
    id: 'ch_055_1',
    nodeId: NODE_C12_MATH_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In ∫ (2x + 3)/(x² + 4x + 7) dx, how is the linear numerator split relative to the denominator derivative (2x + 4)?',
    options: [
      '2x + 3 = (2x + 4) - 1',
      '2x + 3 = 2(x² + 4x + 7) - 11',
      '2x + 3 = (2x + 4) + 1',
      '2x + 3 = 2(x + 2) + 3'
    ],
    correctIndex: 0,
    explanation: 'd/dx(x² + 4x + 7) = 2x + 4. Writing 2x + 3 = 1·(2x + 4) - 1 splits the integral into a log term and an arctan term.',
    hints: [
      'Find the derivative of the denominator: 2x + 4.',
      'Express 2x + 3 as A(2x + 4) + B.',
      '2x + 3 = 1(2x + 4) - 1, so A = 1 and B = -1.'
    ]
  },
  // 12. Standard - Node 056 Weierstrass (Understanding)
  {
    id: 'ch_056_1',
    nodeId: NODE_C12_MATH_056,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Under the Weierstrass substitution t = tan(x/2), what are cos(x) and dx transformed into?',
    options: [
      'cos x = (1-t²)/(1+t²), dx = 2 dt / (1+t²)',
      'cos x = 2t/(1+t²), dx = dt / (1+t²)',
      'cos x = 1 - t², dx = 2 dt',
      'cos x = (1+t²)/(1-t²), dx = dt / (1-t²)'
    ],
    correctIndex: 0,
    explanation: 'From double-angle tan formulas: cos x = (1-t²)/(1+t²), sin x = 2t/(1+t²), and dt = (1/2)sec²(x/2)dx → dx = 2 dt/(1+t²).',
    hints: [
      'Recall cos 2θ = (1 - tan² θ)/(1 + tan² θ).',
      'Let θ = x/2 and t = tan(x/2).',
      'Differentiating t gives dx = 2 dt / (1+t²).'
    ]
  },
  // 13. Standard - Node 058 Parts (Application)
  {
    id: 'ch_058_2',
    nodeId: NODE_C12_MATH_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluating ∫ x e²ˣ dx using integration by parts gives:',
    options: [
      '(x/2) e²ˣ - (1/4) e²ˣ + C',
      'x e²ˣ - e²ˣ + C',
      '(x²/2) e²ˣ + C',
      '(x/2) e²ˣ - (1/2) e²ˣ + C'
    ],
    correctIndex: 0,
    explanation: 'u = x, dv = e²ˣ dx → du = dx, v = (1/2)e²ˣ. ∫ u dv = (x/2)e²ˣ - ∫(1/2)e²ˣ dx = (x/2)e²ˣ - (1/4)e²ˣ + C.',
    hints: [
      'LIATE: Choose u = x and dv = e²ˣ dx.',
      'v = ∫ e²ˣ dx = (1/2)e²ˣ.',
      'uv - ��� v du = (x/2)e²ˣ - (1/2)∫ e²ˣ dx = (x/2)e²ˣ - (1/4)e²ˣ + C.'
    ]
  },
  // 14. Standard - Node 060 King\'s Property (Analysis)
  {
    id: 'ch_060_2',
    nodeId: NODE_C12_MATH_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Using King\'s Property ∫₀^(π/2) f(x) dx = ∫₀^(π/2) f(π/2 - x) dx, what is I = ∫₀^(π/2) (sin x)/(sin x + cos x) dx?',
    options: ['π/2', 'π/4', '1', '0'],
    correctIndex: 1,
    explanation: 'I = ∫₀^(π/2) cos x/(cos x + sin x) dx. Adding both forms: 2I = ∫₀^(π/2) 1 dx = π/2 → I = π/4.',
    hints: [
      'Replace x with π/2 - x. sin(π/2 - x) = cos x, cos(π/2 - x) = sin x.',
      'The reflected integral has cos x in numerator.',
      'Add I + I = 2I = ∫ 1 dx from 0 to π/2 = π/2. Thus I = π/4.'
    ]
  },
  // 15. Advanced - Construct (Node 051 Mixed Trigonometric Powers) (Creativity)
  {
    id: 'ch_051_3',
    nodeId: NODE_C12_MATH_051,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct algebraic reduction chain for ∫ sin²(x) cos²(x) dx.',
    availableParts: ['1/4 sin²(2x)', '(1 - cos 4x)/8', 'x/8 - (sin 4x)/32 + C', '1/2 sin(2x)'],
    targetState: '1/4 sin²(2x) (1 - cos 4x)/8 x/8 - (sin 4x)/32 + C',
    validationHint: 'sin x cos x = (1/2)sin 2x → square it → apply half-angle to sin²(2x) → integrate term by term',
    explanation: 'sin²x cos²x = (1/4)sin²(2x) = (1/4)[(1 - cos 4x)/2] = (1 - cos 4x)/8. Integrating yields x/8 - (sin 4x)/32 + C.',
    hints: [
      'Start with the double-angle identity for (sin x cos x)².',
      'Next, reduce the square with half-angle identity for angle 2x.',
      'Finally, integrate (1 - cos 4x)/8 to get the final antiderivative.'
    ]
  },
  // 16. Advanced - Node 054 Special Forms (Evaluation)
  {
    id: 'ch_054_2',
    nodeId: NODE_C12_MATH_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate ∫ dx / √(9 - 4x²). Which expression is mathematically correct?',
    options: [
      '(1/2) sin⁻¹(2x/3) + C',
      'sin⁻¹(2x/3) + C',
      '(1/3) sin⁻¹(2x/3) + C',
      '(1/2) ln|2x + √(9-4x²)| + C'
    ],
    correctIndex: 0,
    explanation: 'Factor 4 out of the square root: √(4(9/4 - x²)) = 2√((3/2)² - x²). Then ∫ dx / (2√((3/2)² - x²)) = (1/2) sin⁻¹(x/(3/2)) + C = (1/2) sin⁻¹(2x/3) + C.',
    hints: [
      'Rewrite denominator as √(4 · ((9/4) - x²)).',
      'Pull 2 out of the radical to get (1/2) ∫ dx / √((3/2)² - x²).',
      'Standard form ∫ dx/√(a² - x²) = sin⁻¹(x/a) with a = 3/2.'
    ]
  },
  // 17. Advanced - Node 058 Cyclic Parts (Analysis)
  {
    id: 'ch_058_3',
    nodeId: NODE_C12_MATH_058,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Applying integration by parts twice to I = ∫ eˣ sin(x) dx yields I = eˣ sin x - eˣ cos x - I. What is the value of I?',
    options: [
      '(eˣ/2)(sin x - cos x) + C',
      '(eˣ/2)(sin x + cos x) + C',
      'eˣ(sin x - cos x) + C',
      '0'
    ],
    correctIndex: 0,
    explanation: 'Rearranging 2I = eˣ(sin x - cos x) gives I = (eˣ/2)(sin x - cos x) + C. This is the classic cyclic algebraic recovery.',
    hints: [
      'Add I to both sides: 2I = eˣ sin x - eˣ cos x.',
      'Divide by 2.',
      'Append + C: I = (eˣ/2)(sin x - cos x) + C.'
    ]
  },
  // 18. Advanced - Node 057 Irreducible Quadratic (Evaluation)
  {
    id: 'ch_057_2',
    nodeId: NODE_C12_MATH_057,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why must the partial fraction decomposition of (2x + 1)/((x² + 4)(x - 1)) have the numerator (Ax + B) over (x² + 4)?',
    options: [
      'Because x² + 4 is an irreducible quadratic over ℝ and needs 2 degrees of freedom to match numerator powers',
      'Because all partial fraction numerators must be linear',
      'It is an arbitrary convention with no algebraic impact',
      'To prevent imaginary numbers from appearing in integration'
    ],
    correctIndex: 0,
    explanation: 'An irreducible quadratic factor of degree 2 requires a degree 1 numerator (Ax + B) so clearing fractions allows matching all coefficients of x² and x.',
    hints: [
      'Degree of partial fraction numerator must be one less than the factor degree.',
      'A constant A alone cannot span all possible linear numerators when clearing fractions.',
      'Two free parameters (Ax + B) are mathematically necessary.'
    ]
  },
  // 19. Advanced - Node 060 Absolute Splitting (Application)
  {
    id: 'ch_060_3',
    nodeId: NODE_C12_MATH_060,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate the definite integral ∫₀³ |x - 1| dx using interval partition property.',
    correctAnswer: 2.5,
    tolerance: 0.05,
    unit: 'sq units',
    explanation: 'Split at x = 1: ∫₀¹ (1 - x) dx + ∫₁³ (x - 1) dx = [x - x²/2]₀¹ + [x²/2 - x]₁³ = (1 - 0.5) + ((4.5 - 3) - (0.5 - 1)) = 0.5 + (1.5 - (-0.5)) = 0.5 + 2.0 = 2.5.',
    hints: [
      'For x in [0, 1], |x - 1| = 1 - x. ∫₀¹ (1 - x) dx = 0.5.',
      'For x in [1, 3], |x - 1| = x - 1. ∫₁³ (x - 1) dx = 2.0.',
      'Sum the two partitions: 0.5 + 2.0 = 2.5.'
    ]
  },
  // 20. Advanced - Node 055 Completing Square (Analysis)
  {
    id: 'ch_055_2',
    nodeId: NODE_C12_MATH_055,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In evaluating ∫ dx / (x² + 6x + 13), completing the square transforms the integrand into which standard form?',
    options: [
      '∫ dt / (t² + 4) with t = x + 3, giving (1/2) tan⁻¹((x+3)/2) + C',
      '�� dt / (t² - 4) with t = x + 3, giving (1/4) ln|(x+1)/(x+5)| + C',
      '∫ dt / (t² + 13) with t = x + 6',
      '∫ dt / √(t² + 4) with t = x + 3'
    ],
    correctIndex: 0,
    explanation: 'x² + 6x + 13 = (x + 3)² + 4 = t² + 2². Standard integral yields (1/2) tan⁻¹((x+3)/2) + C.',
    hints: [
      'Complete the square: (x + 3)² = x² + 6x + 9.',
      'x² + 6x + 13 = (x + 3)² + 4.',
      'With t = x + 3 and a = 2, ∫ dt/(t² + 2²) = (1/2)tan⁻¹(t/2) + C.'
    ]
  },
  // 21. Advanced - Node 053 Secant Integration (Evaluation)
  {
    id: 'ch_053_2',
    nodeId: NODE_C12_MATH_053,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does multiplying numerator and denominator by (sec x + tan x) solve ∫ sec(x) dx?',
    options: [
      'Because d/dx(sec x + tan x) = sec x tan x + sec² x = sec x (sec x + tan x), creating the form f\'(x)/f(x)',
      'Because sec² x - tan² x = 1 simplifies the denominator to 1',
      'It converts sec x into an algebraic polynomial in tan x',
      'It removes all trigonometric terms'
    ],
    correctIndex: 0,
    explanation: 'Multiplying by (sec x + tan x) makes the numerator exactly the derivative of the denominator, immediately giving ln|sec x + tan x| + C.',
    hints: [
      'Differentiate sec x + tan x.',
      'Derivative is sec x tan x + sec² x = sec x(tan x + sec x).',
      'Numerator is exactly derivative of denominator: ∫ du/u = ln|u| + C.'
    ]
  },
  // 22. Advanced - Node 056 Combined Harmonic (Creativity)
  {
    id: 'ch_056_2',
    nodeId: NODE_C12_MATH_056,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In ISRO signal processing, ∫ dx / (3 cos x + 4 sin x + 5) is evaluated by R cos(x - α) reduction. What are R and the transformed denominator?',
    options: [
      'R = 5, denominator = 5 cos(x - α) + 5 where tan α = 4/3',
      'R = 7, denominator = 7 cos(x - α) + 5',
      'R = 1, denominator = cos(x - α) + 5',
      'R = 25, denominator = 25 cos(x - α) + 5'
    ],
    correctIndex: 0,
    explanation: '3 cos x + 4 sin x = R cos(x - α) where R = √(3² + 4²) = 5, tan α = 4/3. Denominator becomes 5(1 + cos(x-α)), integrating via half-angle to (1/5) tan((x-α)/2) + C.',
    hints: [
      'R = √(a² + b²) = √(3² + 4²) = 5.',
      'tan α = b/a = 4/3.',
      'Expression becomes 5 cos(x - α) + 5.'
    ]
  },
  // 23. Standard - Matching (Node 054 Standard Forms) (Understanding)
  {
    id: 'ch_054_3',
    nodeId: NODE_C12_MATH_054,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the standard form: What is ∫ dx / √(a² - x²)?',
    options: [
      'sin⁻¹(x/a) + C',
      '(1/a) sin⁻¹(x/a) + C',
      'ln|x + √(a²-x²)| + C',
      'tan⁻¹(x/a) + C'
    ],
    correctIndex: 0,
    explanation: '∫ dx / √(a² - x²) = sin⁻¹(x/a) + C. Unlike arctan, the arcsin antiderivative does NOT have an external 1/a factor.',
    hints: [
      'Recall d/dx [sin⁻¹(x/a)] = 1/√(1 - (x/a)²) · (1/a) = 1/√(a² - x²).',
      'The 1/a from the chain rule exactly cancels the 1/a factored out of the radical.',
      'Therefore, the formula is simply sin⁻¹(x/a) + C.'
    ]
  },
  // 24. Advanced - Numeric (Node 059 Symmetrical Bounds) (Application)
  {
    id: 'ch_059_3',
    nodeId: NODE_C12_MATH_059,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate I = ∫₋₂² (x⁵ + 3x³ + 7) dx.',
    correctAnswer: 28,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'By splitting into odd and even parts: ∫₋₂² (x⁵ + 3x³) dx = 0 (odd function). Thus I = ∫₋₂² 7 dx = 7 × (2 - (-2)) = 28.',
    hints: [
      'Notice that x⁵ and 3x³ are odd powers.',
      'The integral of an odd function from -a to a is 0.',
      'Only the constant term 7 remains: 7 × (2 - (-2)) = 28.'
    ]
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
  nodeId: NODE_C12_MATH_051,
  title: 'Integral Calculus: Trigonometric Powers & Special Forms',
  definition: 'Integration of trigonometric powers and special forms involves reducing complex integrands into standard integrable anti-derivatives through power reduction, substitution, partial fractions, integration by parts, and symmetry properties.',
  eli5: 'Think of tough calculus integrals like tangled cables in a rocket harness. You use special adapters (trig identities, substitutions, LIATE rules) to untangle them into clean, straight standard cables that plug directly into known answer sockets.',
  misconceptions: [
    { misconception: '∫ sin²(x) dx = sin³(x)/3 + C using the power rule.', correction: 'Power rule applies only to pure xⁿ. For trigonometric powers, step down using cos(2x) identities or substitute u = cos(x) for odd powers.' },
    { misconception: 'When substituting u = g(x), dx can simply be replaced with du without computing g\'(x).', correction: 'Substitution is a full coordinate transform: du = g\'(x) dx, so dx = du / g\'(x). Dropping g\'(x) alters the integral value.' },
    { misconception: '∫ tan(x) dx = ln|cos(x)| + C without a negative sign.', correction: 'Because d/dx(cos x) = -sin x, the derivative introduces a minus sign: ∫ tan x dx = -ln|cos x| + C = ln|sec x| + C.' },
    { misconception: '∫ dx / (x² + a²) = tan⁻¹(x/a) + C (omitting the 1/a factor).', correction: 'The scaling factor produces (1/a) tan⁻¹(x/a) + C. Forgetting 1/a is the most penalised slip in ISC calculus.' },
    { misconception: 'Definite integrals require adding + C at the final step.', correction: 'In definite integrals [F(x)]ₐᵇ = (F(b)+C) - (F(a)+C) = F(b) - F(a). The arbitrary constant C cancels identically.' }
  ],
  diagnosticQuestions: [
    { question: 'What is ∫ cos²(x) dx?', options: ['x/2 + (sin 2x)/4 + C', 'x/2 - (sin 2x)/4 + C', 'cos³(x)/3 + C', 'sin²(x) + C'], correctIndex: 0 },
    { question: 'What is ∫ cot(x) dx?', options: ['ln|sin x| + C', '-ln|sin x| + C', 'ln|cos x| + C', '-cosec² x + C'], correctIndex: 0 },
    { question: 'What is ∫ dx / (x² - a²)?', options: ['(1/2a) ln|(x-a)/(x+a)| + C', '(1/a) tan⁻¹(x/a) + C', 'ln|x + √(x²-a²)| + C', 'sin⁻¹(x/a) + C'], correctIndex: 0 },
    { question: 'Which LIATE priority chooses u in ∫ x ln(x) dx?', options: ['u = ln(x)', 'u = x', 'u = x ln(x)', 'u = 1'], correctIndex: 0 },
    { question: 'What is ∫₀^(π/2) cos(x) dx?', options: ['1', '0', 'π/2', '-1'], correctIndex: 0 },
    { question: 'What is ∫₋₁¹ x³ dx?', options: ['0', '1/2', '2', '-1/4'], correctIndex: 0 }
  ],
  masteryCriteria: 'Student achieves 80%+ across trigonometric power reduction, substitutions, special forms, integration by parts, and definite integral properties.'
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Trigonometric Power Step-Down',
    instruction: 'Adjust the power slider (n = 1, 2, 3, 4) to watch how sinⁿ(x) is stepped down into standard integrable harmonic frequencies.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_051
  },
  {
    title: 'Coordinate Substitution Exchange',
    instruction: 'Drag the inner function power k to see how the differential du = 2x dx absorbs the extraneous x-factor in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_052
  },
  {
    title: 'The LIATE Lever (Parts)',
    instruction: 'Select different function pairs to see the integration by parts formula ∫ u dv = uv - ∫ v du dynamically balance the difficulty of the residual integral.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_MATH_058
  },
  {
    title: 'King\'s Mirror Property (Definite)',
    instruction: 'Toggle the reflection symmetry across the midpoint (a+b)/2 to observe why signed area remains identical under f(a+b-x).',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_060
  },
  {
    title: 'Fundamental Accumulator (FTC)',
    instruction: 'Drag the upper integration bound b from 0.1 to 2π to see the instantaneous accumulation of area F(b) - F(0).',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_059
  }
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the frequency of cos(2x) to cos(4x) during power reduction of sin⁴(x), what happens to its integral coefficient?',
    options: ['It halves (1/2)', 'It divides by 4 (1/4 chain rule factor)', 'It stays unchanged', 'It multiplies by 4'],
    correctIndex: 1,
    verifyInstruction: 'Notice how ∫ cos(kx) dx always introduces a 1/k factor due to inverse chain rule!',
    nodeId: NODE_C12_MATH_051
  },
  {
    question: 'Predict: If you integrate an even function like cos(x) from -π/2 to π/2, what is the geometric relationship to [0, π/2]?',
    options: ['The integral is 0', 'The integral is exactly DOUBLE the area from 0 to π/2', 'The integral is halved', 'The integral becomes negative'],
    correctIndex: 1,
    verifyInstruction: 'Even functions have y-axis symmetry: area[-a, a] = 2 · area[0, a]!',
    nodeId: NODE_C12_MATH_060
  }
];

// ─── SVG DIAGRAM 1: TRIGONOMETRIC POWER REDUCTION & HARMONIC DECOMPOSITION ───
function TrigPowerSvgDiagram({ power }: { power: number }) {
  const points: string[] = [];
  const width = 460;
  const height = 160;
  const centerY = height / 2;
  const numSamples = 60;

  for (let i = 0; i <= numSamples; i++) {
    const xVal = (i / numSamples) * Math.PI * 2;
    const yVal = Math.pow(Math.sin(xVal), power);
    const px = (i / numSamples) * (width - 60) + 30;
    const py = centerY - yVal * (height * 0.38);
    points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  const polylineStr = points.join(' ');
  const areaPath = `M 30,${centerY} L ${polylineStr} L ${width - 30},${centerY} Z`;

  return (
    <div className="bg-slate-950 p-3 rounded-2xl border border-indigo-900/40">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">SVG Model 1: Harmonic Spectrum & Envelope</span>
        <span className="text-[11px] font-mono text-emerald-400">n = {power}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36 select-none" role="img" aria-label={`Trigonometric power curve sin^${power}(x)`}>
        <defs>
          <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        <line x1="30" y1="20" x2="30" y2={height - 20} stroke="#334155" strokeDasharray="3 3" />
        <line x1="30" y1={centerY} x2={width - 30} y2={centerY} stroke="#64748b" strokeWidth="1.5" />
        <line x1={(width - 60) / 2 + 30} y1="20" x2={(width - 60) / 2 + 30} y2={height - 20} stroke="#334155" strokeDasharray="3 3" />
        <line x1={width - 30} y1="20" x2={width - 30} y2={height - 20} stroke="#334155" strokeDasharray="3 3" />

        {/* Shaded Area under curve */}
        <path d={areaPath} fill="url(#curveGrad)" />

        {/* The Curve */}
        <polyline fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={polylineStr} />

        {/* Labels */}
        <text x="30" y={height - 8} fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
        <text x={(width - 60) / 2 + 30} y={height - 8} fill="#94a3b8" fontSize="10" textAnchor="middle">π</text>
        <text x={width - 30} y={height - 8} fill="#94a3b8" fontSize="10" textAnchor="middle">2π</text>
        <text x="15" y={centerY + 3} fill="#94a3b8" fontSize="9" textAnchor="middle">0</text>
        <text x="15" y="30" fill="#a5b4fc" fontSize="9" textAnchor="middle">+1</text>
        {power % 2 !== 0 && <text x="15" y={height - 25} fill="#a5b4fc" fontSize="9" textAnchor="middle">-1</text>}
      </svg>
      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-mono">
        <span>Identity: {power === 1 ? 'sin(x)' : power === 2 ? '(1 - cos 2x)/2' : power === 3 ? '(3 sin x - sin 3x)/4' : '3/8 - (1/2)cos 2x + (1/8)cos 4x'}</span>
        <span className="text-amber-400">Secular Drift: {power % 2 === 0 ? `+${power === 2 ? '0.5' : '0.375'}x` : '0 (pure oscillation)'}</span>
      </div>
    </div>
  );
}

// ─── SVG DIAGRAM 2: INTEGRATION BY PARTS GEOMETRY (uv - ∫ v du) ───
function PartsSvgDiagram({ pair }: { pair: 'x_ex' | 'x_sinx' | 'x2_ex' }) {
  const uLabel = pair === 'x_ex' ? 'u = x' : pair === 'x_sinx' ? 'u = x' : 'u = x²';
  const vLabel = pair === 'x_ex' ? 'v = eˣ' : pair === 'x_sinx' ? 'v = -cos(x)' : 'v = eˣ';
  const uvFormula = pair === 'x_ex' ? 'x eˣ - ∫ eˣ dx' : pair === 'x_sinx' ? '-x cos(x) + ∫ cos(x) dx' : 'x² eˣ - 2∫ x eˣ dx';
  const finalResult = pair === 'x_ex' ? 'eˣ(x - 1) + C' : pair === 'x_sinx' ? '-x cos(x) + sin(x) + C' : 'eˣ(x² - 2x + 2) + C';

  return (
    <div className="bg-slate-950 p-3 rounded-2xl border border-indigo-900/40">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">SVG Model 2: Geometric Rectangle Decomposition</span>
        <span className="text-[11px] font-mono text-indigo-300">∫ u dv = uv - ∫ v du</span>
      </div>
      <svg viewBox="0 0 460 160" className="w-full h-36 select-none" role="img" aria-label="Integration by Parts Area Decomposition">
        {/* Outer Rectangle uv */}
        <rect x="50" y="20" width="360" height="110" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" rx="8" />
        
        {/* Shaded Area for ∫ u dv */}
        <path d="M 50,20 Q 200,100 410,130 L 410,20 Z" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" strokeWidth="1.5" />

        {/* Shaded Area for ∫ v du */}
        <path d="M 50,20 Q 200,100 410,130 L 50,130 Z" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Text Labels inside rectangles */}
        <text x="280" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold">∫ u dv (Target Area)</text>
        <text x="140" y="105" fill="#fb7185" fontSize="12" fontWeight="bold">∫ v du (Residual)</text>
        <text x="230" y="148" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontFamily="monospace">Total Area: [u · v]</text>

        {/* Coordinate markers */}
        <line x1="50" y1="130" x2="410" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="50" y1="20" x2="50" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
      <div className="flex flex-wrap justify-between items-center text-[10px] text-slate-300 mt-1 font-mono gap-1">
        <span>Choice: <b className="text-indigo-400">{uLabel}</b>, <b className="text-sky-400">{vLabel}</b></span>
        <span>Expansion: <b className="text-amber-400">{uvFormula}</b></span>
        <span>Output: <b className="text-emerald-400">{finalResult}</b></span>
      </div>
    </div>
  );
}

// ─── SVG DIAGRAM 3: KING'S PROPERTY & SYMMETRY REFLECTION ───
function KingsPropertySvgDiagram({ mirrorFrac }: { mirrorFrac: number }) {
  const width = 460;
  const height = 160;
  const a = 40;
  const b = 420;
  const mid = (a + b) / 2;
  const mirrorX = a + (b - a) * mirrorFrac;

  return (
    <div className="bg-slate-950 p-3 rounded-2xl border border-indigo-900/40">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">SVG Model 3: King&apos;s Mirror Symmetry f(a + b - x)</span>
        <span className="text-[11px] font-mono text-emerald-400">Midpoint = (a+b)/2</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36 select-none" role="img" aria-label="King's property reflection symmetry">
        {/* Base line */}
        <line x1={a} y1={120} x2={b} y2={120} stroke="#64748b" strokeWidth="1.5" />

        {/* f(x) curve (teal) */}
        <path d={`M ${a},120 C 130,30 200,90 ${b},40`} fill="none" stroke="#2dd4bf" strokeWidth="2.5" />

        {/* f(a+b-x) reflected curve (amber dashed) */}
        <path d={`M ${a},40 C 260,90 330,30 ${b},120`} fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 4" />

        {/* Midpoint line */}
        <line x1={mid} y1={20} x2={mid} y2={130} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x={mid} y={15} fill="#818cf8" fontSize="10" textAnchor="middle" fontWeight="bold">Axis of Reflection</text>

        {/* Interactive probe line */}
        <line x1={mirrorX} y1={25} x2={mirrorX} y2={125} stroke="#f43f5e" strokeWidth="2" />
        <circle cx={mirrorX} cy={75} r="4" fill="#f43f5e" />

        {/* Bound labels */}
        <text x={a} y={135} fill="#94a3b8" fontSize="10" textAnchor="middle">a (Lower Bound)</text>
        <text x={b} y={135} fill="#94a3b8" fontSize="10" textAnchor="middle">b (Upper Bound)</text>
        <text x={mid} y={135} fill="#a5b4fc" fontSize="10" textAnchor="middle">(a+b)/2</text>
      </svg>
      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-mono">
        <span className="text-teal-400">Original ∫ₐᵇ f(x) dx</span>
        <span className="text-amber-400">= Reflected ∫ₐᵇ f(a+b-x) dx</span>
        <span className="text-indigo-300">Sum = 2I = ∫ₐᵇ [f(x) + f(a+b-x)] dx</span>
      </div>
    </div>
  );
}

// ─── SVG DIAGRAM 4: WEIERSTRASS HALF-ANGLE UNIT CIRCLE GEOMETRY ───
function WeierstrassSvgDiagram() {
  return (
    <div className="bg-slate-950 p-3 rounded-2xl border border-indigo-900/40">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">SVG Model 4: Weierstrass Rational Substitution t = tan(x/2)</span>
        <span className="text-[11px] font-mono text-cyan-400">Stereographic Projection</span>
      </div>
      <svg viewBox="0 0 460 150" className="w-full h-32 select-none" role="img" aria-label="Weierstrass substitution unit circle representation">
        {/* Coordinate axes */}
        <line x1="50" y1="75" x2="330" y2="75" stroke="#475569" strokeWidth="1.2" />
        <line x1="190" y1="10" x2="190" y2="140" stroke="#475569" strokeWidth="1.2" />

        {/* Unit Circle */}
        <circle cx="190" cy="75" r="55" fill="none" stroke="#6366f1" strokeWidth="2" />

        {/* Tangent line at x = 1 (x-coordinate 245) */}
        <line x1="245" y1="10" x2="245" y2="140" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Ray from (-1, 0) through (cos x, sin x) to (1, t) */}
        <line x1="135" y1="75" x2="245" y2="30" stroke="#f43f5e" strokeWidth="1.8" />
        <circle cx="135" cy="75" r="3" fill="#f43f5e" />
        <circle cx="218" cy="42" r="3" fill="#22c55e" />
        <circle cx="245" cy="30" r="3" fill="#0ea5e9" />

        {/* Labels */}
        <text x="125" y="88" fill="#f43f5e" fontSize="9">(-1, 0)</text>
        <text x="218" y="36" fill="#22c55e" fontSize="9">(cos x, sin x)</text>
        <text x="252" y="32" fill="#38bdf8" fontSize="9">t = tan(x/2)</text>

        {/* Formulas on the right side */}
        <rect x="335" y="15" width="115" height="120" fill="#0f172a" stroke="#334155" rx="6" />
        <text x="342" y="35" fill="#a5b4fc" fontSize="9" fontWeight="bold">Rational Forms:</text>
        <text x="342" y="55" fill="#38bdf8" fontSize="8" fontFamily="monospace">sin x = 2t/(1+t²)</text>
        <text x="342" y="75" fill="#fbbf24" fontSize="8" fontFamily="monospace">cos x = (1-t²)/(1+t²)</text>
        <text x="342" y="95" fill="#34d399" fontSize="8" fontFamily="monospace">tan x = 2t/(1-t²)</text>
        <text x="342" y="115" fill="#f43f5e" fontSize="8" fontFamily="monospace">dx = 2dt/(1+t²)</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ───
function C12_MathematicsIntegrationTrigonometricPowersSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_MATH_051,
  title = DEFAULT_PROPS.title || 'Integral Calculus: Trigonometric Powers & Special Forms',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  onComplete
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant-style States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationIndex, setObservationIndex] = useState(0); // 0 or 1
  const [observationAnswered, setObservationAnswered] = useState<Record<number, boolean>>({});
  const [observationSelected, setObservationSelected] = useState<Record<number, number>>({});

  // Interactive Exploration Real-time Controls
  const [trigPowerN, setTrigPowerN] = useState<number>(2); // 1, 2, 3, 4
  const [subKFactor, setSubKFactor] = useState<number>(2);
  const [upperLimitB, setUpperLimitB] = useState<number>(Math.PI / 2);
  const [kingMirrorX, setKingMirrorX] = useState<number>(0.5); // 0 to 1
  const [selectedPartsPair, setSelectedPartsPair] = useState<'x_ex' | 'x_sinx' | 'x2_ex'>('x_ex');

  // Challenge Adaptive Engine & State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state (0 to 3)
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag-and-drop & Non-MCQ States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD EXISTING MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS GRAPH RENDERING ───
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

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      const scaleX = width / (2 * Math.PI);
      const scaleY = height / 3;

      // Draw Grid / Axes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Plot y = sin^n(x)
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let xPix = 0; xPix < width; xPix++) {
        const xVal = xPix / scaleX;
        let yVal = Math.sin(xVal);
        yVal = Math.pow(yVal, trigPowerN);
        const yPix = centerY - yVal * scaleY;
        if (xPix === 0) ctx.moveTo(xPix, yPix);
        else ctx.lineTo(xPix, yPix);
      }
      ctx.stroke();

      // Fill Integral Area from 0 to upperLimitB
      ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      const limitPixels = Math.min(width, upperLimitB * scaleX);
      for (let xPix = 0; xPix <= limitPixels; xPix++) {
        const xVal = xPix / scaleX;
        let yVal = Math.sin(xVal);
        yVal = Math.pow(yVal, trigPowerN);
        const yPix = centerY - yVal * scaleY;
        ctx.lineTo(xPix, yPix);
      }
      ctx.lineTo(limitPixels, centerY);
      ctx.closePath();
      ctx.fill();

      // Scanner dot
      const scanX = (frame * 1.5) % width;
      const scanXVal = scanX / scaleX;
      let scanYVal = Math.sin(scanXVal);
      scanYVal = Math.pow(scanYVal, trigPowerN);
      const scanYPix = centerY - scanYVal * scaleY;

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(scanX, scanYPix, 4, 0, 2 * Math.PI);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [trigPowerN, upperLimitB, phase]);

  // ─── ESCALATING HINTS CALLBACK ───
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
      speechManager.speak('Let us study the complete mathematical reduction.');
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand composite derivatives.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── OBSERVATION HANDLER ───
  const handleObservationAnswer = useCallback((qIdx: number, optIdx: number) => {
    const obsQ = OBSERVATION_QUESTIONS[qIdx];
    const isCorrect = optIdx === obsQ.correctIndex;
    setObservationSelected(prev => ({ ...prev, [qIdx]: optIdx }));
    setObservationAnswered(prev => ({ ...prev, [qIdx]: true }));
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? obsQ.feedback : obsQ.explanation);
  }, []);

  // ─── NAVIGATION CALLBACKS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive calculus laboratory. Manipulate variables to see real-time transformations.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test trigonometric identities and integral forms without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning adaptive flight-dynamics trajectory challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Verify your intuition with the interactive visual models.');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Mission accomplished with score ${finalScore} percent.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE ───
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

  // ─── INACTIVITY AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── ANSWER HANDLER WITH SHAKE ANIMATION ───
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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct evaluation! Superb work.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Let us review the step-by-step calculus derivation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── DRAG AND SORT HANDLERS ───
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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 ? (challenge.sortItems?.map((_, i) => i) || []) : [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Motivational Feedback String generator
  const getMotivationalFeedback = (errs: number) => {
    if (errs === 0) return 'PERFECT SCORE! Flawless orbital trajectory derivation and integral calculus execution!';
    if (errs >= 1 && errs <= 3) return 'Great work! Outstanding analytical precision with only minor slips.';
    if (errs >= 4 && errs <= 7) return 'Good effort! You grasp the reduction identities. Reinforce with more practice!';
    return 'Do not give up — You WILL get this! Step through the identity charts and retry.';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50" role="img" aria-label="Math icon">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium tracking-wide">ISC Class 12 • Integral Calculus & Special Forms</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span 
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
              difficulty === 'standard' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
              'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right">
            <span className="text-xs text-slate-400">Mastery: </span>
            <span className="text-xs font-semibold text-indigo-300 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── MULTI-REPRESENTATION COMPARISON TAB BAR ─── */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2.5 bg-slate-900/90 rounded-xl border border-indigo-900/50">
          <span className="text-indigo-400 font-semibold block">1. Harmonic Reduction</span>
          <span className="text-[11px] text-slate-300 font-mono">sin²x = (1-cos 2x)/2</span>
        </div>
        <div className="p-2.5 bg-slate-900/90 rounded-xl border border-sky-900/50">
          <span className="text-sky-400 font-semibold block">2. LIATE Rule</span>
          <span className="text-[11px] text-slate-300 font-mono">∫ u dv = uv - ∫ v du</span>
        </div>
        <div className="p-2.5 bg-slate-900/90 rounded-xl border border-emerald-900/50">
          <span className="text-emerald-400 font-semibold block">3. King&apos;s Property</span>
          <span className="text-[11px] text-slate-300 font-mono">∫ₐᵇ f(x)dx = ∫ₐᵇ f(a+b-x)dx</span>
        </div>
        <div className="p-2.5 bg-slate-900/90 rounded-xl border border-amber-900/50">
          <span className="text-amber-400 font-semibold block">4. Weierstrass Form</span>
          <span className="text-[11px] text-slate-300 font-mono">t = tan(x/2), dx = 2dt/(1+t²)</span>
        </div>
      </div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/40">
            <h2 className="text-xl font-bold text-indigo-300 mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-300/90 mt-3 font-mono bg-amber-950/30 p-2 rounded-lg border border-amber-800/30">
              ⚡ MISSION OBJECTIVE: {SCENARIO.context}
            </p>
          </div>

          {/* Embedded SVG 1 */}
          <TrigPowerSvgDiagram power={2} />

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-semibold text-white">Curiosity Challenge:</h3>
            <p className="text-sm text-slate-200">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border flex items-center justify-between ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span>
                    <span className="font-mono text-xs text-indigo-400 mr-2">[{String.fromCharCode(65 + idx)}]</span>
                    {opt}
                  </span>
                  {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                  )}
                  {discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-slate-500 font-bold ml-2">✗</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3">
                <p className={`text-sm mb-4 font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Precision confirmed! You spotted the composite chain-rule obstacle.' : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Calculus Interactive Labs"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30"
                >
                  Enter Calculus Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs text-slate-400 font-mono">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              </div>
              <p className="text-sm text-amber-300/90 font-medium bg-amber-950/20 p-2.5 rounded-xl border border-amber-800/30">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* DYNAMIC VISUALIZATION CANVAS & SVGs */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-4">
                <canvas ref={canvasRef} width={600} height={180} className="w-full bg-slate-900/60 rounded-xl border border-slate-800 shadow-inner" />

                {/* Step 0: Power Reduction */}
                {currentSlide === 0 && (
                  <div className="space-y-4">
                    <TrigPowerSvgDiagram power={trigPowerN} />
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Integrand: <b className="text-indigo-400 font-mono">y = sin^{trigPowerN}(x)</b></span>
                        <span>Harmonic Expansion: <b className="text-emerald-400 font-mono">
                          {trigPowerN === 1 ? 'sin(x)' : trigPowerN === 2 ? '(1 - cos 2x)/2' : trigPowerN === 3 ? '(3 sin x - sin 3x)/4' : '3/8 - 1/2 cos 2x + 1/8 cos 4x'}
                        </b></span>
                      </div>
                      <input
                        type="range"
                        aria-label="Trigonometric power slider n"
                        min={1}
                        max={4}
                        step={1}
                        value={trigPowerN}
                        onChange={(e) => setTrigPowerN(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                      <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-400">
                        Antiderivative: <span className="text-indigo-300 font-mono">
                          {trigPowerN === 1 ? '-cos(x) + C' : trigPowerN === 2 ? 'x/2 - (sin 2x)/4 + C' : trigPowerN === 3 ? '-3/4 cos(x) + (cos 3x)/12 + C' : '3x/8 - (sin 2x)/4 + (sin 4x)/32 + C'}
                        </span>
                      </div>
                    </div>

                    {/* Observation Question 1 */}
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-indigo-900/40 space-y-3 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">💡 Observation Probe 1</span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium">{OBSERVATION_QUESTIONS[0].prompt}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, optIdx) => (
                          <motion.button
                            key={optIdx}
                            aria-label={`Observation option ${optIdx + 1}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservationAnswer(0, optIdx)}
                            className={`w-full text-left p-2.5 rounded-lg text-xs border transition-all ${
                              observationAnswered[0]
                                ? optIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                                  : observationSelected[0] === optIdx
                                  ? 'bg-rose-950/50 border-rose-700 text-rose-300'
                                  : 'bg-slate-800/40 border-slate-700 text-slate-500'
                                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                            }`}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                      {observationAnswered[0] && (
                        <p className="text-xs text-emerald-400 font-mono pt-1">
                          ✓ {OBSERVATION_QUESTIONS[0].explanation}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 1: Substitution Exchange */}
                {currentSlide === 1 && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Inner Scale Factor k: <b className="text-indigo-400 font-mono">{subKFactor}</b></span>
                      <span>Transform: <b className="text-amber-400 font-mono">∫ x (x² + 1)^{subKFactor} dx = (1/2) ∫ u^{subKFactor} du</b></span>
                    </div>
                    <input
                      type="range"
                      aria-label="Substitution power factor k slider"
                      min={1}
                      max={5}
                      step={1}
                      value={subKFactor}
                      onChange={(e) => setSubKFactor(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-indigo-400 font-semibold block mb-1">Differential Transform</span>
                        <p className="text-slate-300 font-mono">u = x² + 1 → du = 2x dx → dx = du / (2x)</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-emerald-400 font-semibold block mb-1">Resulting Integral</span>
                        <p className="text-slate-300 font-mono">(1/2) u^{subKFactor + 1}/({subKFactor + 1}) + C</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: LIATE Selection */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    <PartsSvgDiagram pair={selectedPartsPair} />
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'x_ex', label: '∫ x eˣ dx' },
                        { id: 'x_sinx', label: '∫ x sin(x) dx' },
                        { id: 'x2_ex', label: '∫ x² eˣ dx (2-Pass)' }
                      ].map((item) => (
                        <motion.button
                          key={item.id}
                          aria-label={`Select integration by parts example ${item.label}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedPartsPair(item.id as 'x_ex' | 'x_sinx' | 'x2_ex')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${
                            selectedPartsPair === item.id ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {item.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: King's Reflection & Prediction & Observation Question 2 */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    <KingsPropertySvgDiagram mirrorFrac={kingMirrorX} />
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Mirror Probe Position: <b className="text-indigo-400 font-mono">{(kingMirrorX * 100).toFixed(0)}%</b></span>
                        <span className="text-emerald-400 font-mono">f(x) + f(a+b-x) = Const</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Reflection mirror probe position"
                        min={0.05}
                        max={0.95}
                        step={0.01}
                        value={kingMirrorX}
                        onChange={(e) => setKingMirrorX(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    {/* Observation Question 2 */}
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-indigo-900/40 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">💡 Observation Probe 2</span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium">{OBSERVATION_QUESTIONS[1].prompt}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, optIdx) => (
                          <motion.button
                            key={optIdx}
                            aria-label={`Observation 2 option ${optIdx + 1}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservationAnswer(1, optIdx)}
                            className={`w-full text-left p-2.5 rounded-lg text-xs border transition-all ${
                              observationAnswered[1]
                                ? optIdx === OBSERVATION_QUESTIONS[1].correctIndex
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                                  : observationSelected[1] === optIdx
                                  ? 'bg-rose-950/50 border-rose-700 text-rose-300'
                                  : 'bg-slate-800/40 border-slate-700 text-slate-500'
                                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                            }`}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                      {observationAnswered[1] && (
                        <p className="text-xs text-emerald-400 font-mono pt-1">
                          ✓ {OBSERVATION_QUESTIONS[1].explanation}
                        </p>
                      )}
                    </div>

                    {!predictionMade && (
                      <div className="p-3 bg-slate-900 rounded-xl border border-indigo-800/40 space-y-2">
                        <p className="text-xs font-semibold text-white">{PREDICTION_QUESTIONS[1].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Prediction choice ${i + 1}: ${opt}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="text-left p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-200 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                    {predictionMade && (
                      <p className="text-xs text-emerald-400 font-medium bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-800/40">
                        ✓ {PREDICTION_QUESTIONS[1].verifyInstruction}
                      </p>
                    )}
                  </div>
                )}

                {/* Step 4: FTC Accumulation & Weierstrass */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    <WeierstrassSvgDiagram />
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Upper Bound b: <b className="text-indigo-400 font-mono">{(upperLimitB / Math.PI).toFixed(2)}π</b></span>
                        <span>Accumulated Net Area: <b className="text-emerald-400 font-mono">
                          {trigPowerN === 1 ? (1 - Math.cos(upperLimitB)).toFixed(3) : (upperLimitB/2 - Math.sin(2*upperLimitB)/4).toFixed(3)}
                        </b></span>
                      </div>
                      <input
                        type="range"
                        aria-label="Definite integral upper bound slider"
                        min={0.1}
                        max={2 * Math.PI}
                        step={0.05}
                        value={upperLimitB}
                        onChange={(e) => setUpperLimitB(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <motion.button
              aria-label="Previous Lab Step"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl disabled:opacity-40 text-xs font-semibold"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-500 font-mono">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab Step"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Try Free Sandbox"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
              >
                Try Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY / SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-indigo-300">Orbit Simulation Sandbox</h3>
            <p className="text-xs text-slate-400">Explore continuous parameter sweeps across trigonometric powers and definite limits without scoring pressure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TrigPowerSvgDiagram power={trigPowerN} />
            <KingsPropertySvgDiagram mirrorFrac={kingMirrorX} />
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <canvas ref={canvasRef} width={600} height={180} className="w-full bg-slate-900/60 rounded-xl border border-slate-800" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sandbox-power" className="text-xs text-slate-400 block mb-1">Power n: {trigPowerN}</label>
                <input
                  id="sandbox-power"
                  type="range"
                  aria-label="Sandbox power slider"
                  min={1}
                  max={4}
                  value={trigPowerN}
                  onChange={(e) => setTrigPowerN(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="sandbox-limit" className="text-xs text-slate-400 block mb-1">Upper Limit b: {(upperLimitB / Math.PI).toFixed(2)}π</label>
                <input
                  id="sandbox-limit"
                  type="range"
                  aria-label="Sandbox upper limit slider"
                  min={0.1}
                  max={2 * Math.PI}
                  step={0.05}
                  value={upperLimitB}
                  onChange={(e) => setUpperLimitB(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>

          <motion.button
            aria-label="Proceed to Trajectory Challenges"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl"
          >
            Ready for Flight Dynamics Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── 4. ADAPTIVE CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Progress & Metadata */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span className="text-indigo-400 font-bold uppercase">{challenge.competencyLevel} • {challenge.difficulty}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card with Shake Animation */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-5 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h3 className="text-sm sm:text-base font-semibold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ Types */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Choice ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm border transition-all flex items-center justify-between ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>
                      <span className="font-mono text-xs text-indigo-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                      {opt}
                    </span>
                    {showExplanation && i === challenge.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      className="px-3 py-1.5 bg-indigo-700 rounded-lg text-xs font-semibold cursor-grab text-white select-none"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['liate_1', 'liate_2', 'liate_3', 'liate_4'].map((targetId, idx) => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop slot ${idx + 1}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-3 bg-slate-950 rounded-xl border border-dashed border-slate-700 text-center min-h-[60px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[10px] text-slate-500 font-mono uppercase">Slot {idx + 1}</span>
                      <span className="text-xs font-bold text-indigo-300 mt-1">{droppedLabels[targetId] || 'Drop Here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify LIATE Priority"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify LIATE Priority
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-2.5">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort step ${displayIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-2 select-none"
                  >
                    <span className="font-mono text-indigo-400 font-bold">{displayIdx + 1}.</span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Verify Execution Order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-3 px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Execution Order
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Numeric answer input"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-indigo-500 outline-none"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                </div>
                <motion.button
                  aria-label="Check Numerical Solution"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Check Numerical Solution
                </motion.button>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1 bg-indigo-800 hover:bg-indigo-700 rounded-lg text-xs font-mono text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-950 border border-indigo-700 rounded-md text-xs font-mono text-indigo-300 flex items-center gap-1">
                      {part}
                      <button aria-label={`Remove ${part}`} onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))} className="text-rose-400 hover:text-rose-300 ml-1">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click steps above to assemble reduction chain</span>}
                </div>

                <motion.button
                  aria-label="Verify Proof Chain"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Proof Chain
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Progressive Step Explanation Reveal */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-3"
            >
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Step-by-Step Mathematical Derivation:</h4>
              {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs sm:text-sm text-amber-200 leading-relaxed"
                >
                  <span className="font-mono text-amber-400 font-bold mr-1">[{idx + 1}]</span>
                  {sentence}{!sentence.endsWith('.') && '.'}
                </motion.p>
              ))}

              <div className="pt-2 flex gap-3">
                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal Next Proof Step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Proof Step ℹ
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Next Trajectory Challenge"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Orbit Insertion →' : 'Next Trajectory Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MOTIVATIONAL FEEDBACK ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 to-slate-900 rounded-3xl border border-indigo-700/50 text-center space-y-3">
            <h2 className="text-2xl font-black text-white">Mission Orbit Captured!</h2>
            <p className="text-sm text-slate-300">
              Trajectory Performance Score: <b className="text-emerald-400 font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</b>
            </p>
            <p className="text-xs text-indigo-300">BKT Knowledge State: {masteryLevel.toUpperCase()}</p>
          </div>

          {/* Personalized Motivational Message */}
          <div className="p-5 bg-indigo-900/30 border border-indigo-700/50 rounded-2xl">
            <h3 className="text-sm font-bold text-indigo-300 mb-1">Flight Controller Assessment:</h3>
            <p className="text-sm font-medium text-white">
              {getMotivationalFeedback(errors)}
            </p>
          </div>

          {/* Real-World Practical Application Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-indigo-800/60 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚀</span>
              <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex gap-2.5 items-start p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                  <span className="px-2 py-0.5 bg-indigo-900 text-indigo-300 rounded font-bold font-mono text-[11px]">{idx + 1}</span>
                  <span className="text-slate-300 leading-normal">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Diagnostic Misconception Log:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">✗ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-900/40 text-xs text-amber-200 space-y-1">
            <h4 className="font-bold text-amber-300">SM-2 Spaced Repetition Protocol:</h4>
            <p>Next orbital calculus review scheduled in <b className="text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</b>.</p>
          </div>

          {/* Multi-Representation Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TrigPowerSvgDiagram power={4} />
            <KingsPropertySvgDiagram mirrorFrac={0.5} />
          </div>
        </motion.div>
      )}

      {/* Floating UI Feedback Widgets */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Orbital Solution Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_MathematicsIntegrationTrigonometricPowersSim;
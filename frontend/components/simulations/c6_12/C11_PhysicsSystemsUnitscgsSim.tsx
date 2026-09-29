'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C11_PHY_001 = 'c11_phy_001';
const NODE_C11_PHY_002 = 'c11_phy_002';
const NODE_C11_PHY_003 = 'c11_phy_003';
const NODE_C11_PHY_004 = 'c11_phy_004';
const NODE_C11_PHY_005 = 'c11_phy_005';
const NODE_C11_PHY_006 = 'c11_phy_006';
const NODE_C11_PHY_007 = 'c11_phy_007';
const NODE_C11_PHY_008 = 'c11_phy_008';
const NODE_C11_PHY_009 = 'c11_phy_009';
const NODE_C11_PHY_010 = 'c11_phy_010';

const ALL_NODE_IDS = [
  NODE_C11_PHY_001,
  NODE_C11_PHY_002,
  NODE_C11_PHY_003,
  NODE_C11_PHY_004,
  NODE_C11_PHY_005,
  NODE_C11_PHY_006,
  NODE_C11_PHY_007,
  NODE_C11_PHY_008,
  NODE_C11_PHY_009,
  NODE_C11_PHY_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Trajectory & Telemetry Analysis',
  intro: 'You are the Lead Flight Dynamics Officer at ISRO Telemetry, Tracking and Command Network (ISTRAC) in Bengaluru. A lunar probe descent module is undergoing precision unit calibration, kinematic tracking, and vector thrust verification.',
  context: 'A single miscalculated unit (like mixing CGS dynes with SI Newtons), an unhandled systematic zero-error, or an unchecked vector component could cause a catastrophic landing anomaly. You must calibrate the instrumentation, verify dimensional consistency, integrate descent equations, and compute vector thrusts before green-lighting the descent burn.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 1999, NASA lost the $125M Mars Climate Orbiter because one team calculated thruster impulse in Imperial (Pound-force seconds) while navigation software expected Metric SI (Newton seconds). If an engine applies 4.45 N for 10 s, what is the impulse in CGS units (dyne·s)?',
  options: [
    '44.5 dyne·s (same numerical scale)',
    '4.45 × 10⁵ dyne·s (1 N = 10⁵ dynes)',
    '4.45 × 10⁶ dyne·s (1 N = 10⁵ dynes × 10 s)',
    '445 dyne·s (100 times larger)',
  ],
  correctIndex: 2,
  hintAfter: 'Let us see why! 1 Newton = 10⁵ dynes, so an impulse of 44.5 N·s equals 4.45 × 10⁶ dyne·s. Units and dimensions dictate survival in aerospace!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1 - 7)
  {
    id: 'ch_001_c11_001',
    nodeId: NODE_C11_PHY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to SI standards, how should the temperature of a liquid propellant tank at 295 kelvin be officially written in telemetry logs?',
    options: ['295° K', '295 deg K', '295 K', '295 k'],
    correctIndex: 2,
    explanation: 'The SI base unit of thermodynamic temperature is the kelvin, symbol K (capital K, no degree sign). The degree symbol is strictly reserved for Celsius (°C) and Fahrenheit (°F).',
    hints: [
      'Think about whether Kelvin is an absolute scale that uses a degree circle.',
      'Scientist symbols are uppercase, but the degree symbol is omitted for Kelvin.',
      'The correct SI notation is simply the number followed by capital K: 295 K.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_002_c11_002',
    nodeId: NODE_C11_PHY_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A laser rangefinder records four distance readings: 0.00520 km, 1008 m, 240.0 m, and 3500 m. How many significant figures does 0.00520 km possess?',
    options: ['2 significant figures', '3 significant figures', '5 significant figures', '6 significant figures'],
    correctIndex: 1,
    explanation: 'Leading zeros (0.00...) are not significant as they merely locate the decimal point. The digits 5 and 2 are non-zero, and the trailing zero after the decimal point is significant, yielding 3 significant figures (5, 2, 0).',
    hints: [
      'Do leading zeros count as significant digits in a decimal number?',
      'Leading zeros only set the decimal place, but trailing zeros after decimals show precision.',
      'The significant digits are 5, 2, and 0, making a total of 3.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_003_c11_003',
    nodeId: NODE_C11_PHY_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each physical quantity to its correct dimensional formula in mechanics.',
    dragItems: [
      { label: '[M L T⁻²]', targetId: 'box_force' },
      { label: '[M L² T⁻²]', targetId: 'box_work' },
      { label: '[M L⁻¹ T⁻²]', targetId: 'box_press' },
      { label: '[M L² T⁻³]', targetId: 'box_power' },
    ],
    correctMapping: {
      box_force: '[M L T⁻²]',
      box_work: '[M L² T⁻²]',
      box_press: '[M L⁻¹ T⁻²]',
      box_power: '[M L² T⁻³]',
    },
    explanation: 'Force = mass × accel = [M L T⁻²]; Work/Energy = Force × dist = [M L² T⁻²]; Pressure = Force / Area = [M L⁻¹ T⁻²]; Power = Work / Time = [M L² T⁻³].',
    hints: [
      'Recall Force = mass × acceleration = kg·m/s².',
      'Pressure is Force / Area = [M L T⁻²] / [L²].',
      'Power is Work / Time = [M L² T⁻²] / [T].',
    ],
  },
  {
    id: 'ch_004_c11_009',
    nodeId: NODE_C11_PHY_009,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A surveillance drone at Mumbai coast undergoes displacement vector r = (6 î + 8 ĵ) km. What is the magnitude of its total straight-line displacement |r| in km?',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: 'km',
    explanation: '|r| = √(6² + 8²) = √(36 + 64) = √100 = 10 km.',
    hints: [
      'In 2D, the magnitude of vector A = a î + b ĵ is given by √(a² + b²).',
      'Calculate 6² + 8² = 36 + 64.',
      'The square root of 100 is exactly 10.',
    ],
  },
  {
    id: 'ch_005_c11_005',
    nodeId: NODE_C11_PHY_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A test vehicle drives 400 m East along a straight proving ground, then reverses and drives 300 m West back along the same track in 50 seconds. Determine the magnitude of average velocity vs average speed.',
    options: [
      'Avg velocity = 2 m/s, Avg speed = 14 m/s',
      'Avg velocity = 14 m/s, Avg speed = 2 m/s',
      'Both are equal to 14 m/s',
      'Avg velocity = 0 m/s, Avg speed = 14 m/s',
    ],
    correctIndex: 0,
    explanation: 'Displacement = 400 m - 300 m = +100 m East. Total distance = 400 m + 300 m = 700 m. Average velocity = 100 m / 50 s = 2 m/s. Average speed = 700 m / 50 s = 14 m/s.',
    hints: [
      'Displacement is net change in position (final - initial), while distance is total odometer path.',
      'Displacement = 400 - 300 = 100 m. Total distance = 400 + 300 = 700 m.',
      'Divide both by 50 s: 100/50 = 2 m/s and 700/50 = 14 m/s.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_006_c11_008',
    nodeId: NODE_C11_PHY_008,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A steel calibration sphere is released from rest (u = 0) from the top of an 80 m drop tower. Taking g = 10 m/s² downwards, calculate the time t (in seconds) required to reach the ground.',
    correctAnswer: 4,
    tolerance: 0.1,
    unit: 's',
    explanation: 'h = 1/2 g t² ⇒ 80 = 1/2 (10) t² = 5 t² ⇒ t² = 16 ⇒ t = 4 seconds.',
    hints: [
      'Use the free-fall kinematic equation h = 1/2 g t² since initial velocity u = 0.',
      'Substitute: 80 = 0.5 × 10 × t² = 5 t².',
      't² = 80 / 5 = 16, so t = 4 s.',
    ],
  },
  {
    id: 'ch_007_c11_010',
    nodeId: NODE_C11_PHY_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Two tugboats pull a disabled barge in Kolkata port with equal forces of 5 kN each. When the angle between the two tow lines is θ = 180°, what is the resultant pulling force on the barge?',
    options: ['10 kN forward', '5 kN forward', '0 kN (forces cancel completely)', '7.07 kN at 45°'],
    correctIndex: 2,
    explanation: 'When θ = 180°, the forces are collinear and opposite in direction: R = |P - Q| = |5 - 5| = 0 kN. The resultant force is zero.',
    hints: [
      'Look at the parallelogram law: R = √(P² + Q² + 2PQ cos θ).',
      'cos 180° = -1, which reduces the equation to R = |P - Q|.',
      'Two equal forces pulling in exactly opposite directions cancel each other to 0 kN.',
    ],
  },

  // Standard Tier (8 - 15)
  {
    id: 'ch_008_c11_004',
    nodeId: NODE_C11_PHY_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert the energy of 2 Joules (SI: kg·m²·s⁻²) into CGS units (ergs: g·cm²·s⁻²). Express your answer as the exponent n in 2 × 10ⁿ ergs.',
    correctAnswer: 7,
    tolerance: 0,
    unit: 'power of 10',
    explanation: '1 J = (10³ g) × (10² cm)² × (1 s)⁻² = 10³ × 10⁴ = 10⁷ ergs. Therefore, 2 J = 2 × 10⁷ ergs (exponent is 7).',
    hints: [
      'Recall 1 kg = 10³ g and 1 m = 10² cm.',
      'Energy has dimensions M L² T⁻², so the conversion factor is (10³) × (10²)² = 10⁷.',
      'The power of 10 is 7.',
    ],
  },
  {
    id: 'ch_009_c11_002',
    nodeId: NODE_C11_PHY_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A digital micrometre has a zero error of +0.03 mm. A student measures the diameter of a solar panel wire 5 times and averages the raw values to get 2.45 mm. Which statement is physically sound regarding errors?',
    options: [
      'Averaging removed all errors; true diameter is 2.45 mm.',
      'The zero error is systematic (+0.03 mm) and was NOT removed by averaging; the true diameter is 2.42 mm.',
      'The zero error is random and cancels out after 5 readings.',
      'The true diameter is 2.48 mm because systematic errors are always added.',
    ],
    correctIndex: 1,
    explanation: 'Averaging repeated measurements reduces random fluctuations but leaves systematic bias untouched. A positive zero error (+0.03 mm) means the gauge over-reads, so correction requires subtracting 0.03 mm: 2.45 - 0.03 = 2.42 mm.',
    hints: [
      'Distinguish systematic errors (consistent offset) from random errors (scatter).',
      'Does averaging multiple readings eliminate a built-in zero shift?',
      'To correct a positive zero error of +0.03 mm, you must subtract it from the measured mean.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_010_c11_006',
    nodeId: NODE_C11_PHY_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The position of a high-speed train leaving New Delhi is given by x(t) = 3t³ - 2t² + 5t (meters, t in seconds). What is its instantaneous acceleration at t = 2 seconds in m/s²?',
    correctAnswer: 32,
    tolerance: 0.1,
    unit: 'm/s²',
    explanation: 'v(t) = dx/dt = 9t² - 4t + 5. a(t) = dv/dt = 18t - 4. At t = 2: a(2) = 18(2) - 4 = 36 - 4 = 32 m/s².',
    hints: [
      'Differentiate x(t) once with respect to time to get velocity v(t).',
      'Differentiate velocity v(t) to obtain acceleration a(t) = d²x/dt².',
      'a(t) = 18t - 4. For t = 2, calculate 18(2) - 4 = 32.',
    ],
  },
  {
    id: 'ch_011_c11_007',
    nodeId: NODE_C11_PHY_007,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the calculus derivation steps for the third kinematic equation v² = u² + 2as in correct logical order.',
    sortItems: [
      'Apply chain rule: a = dv/dt = (dv/ds)(ds/dt) = v (dv/ds)',
      'Separate variables: a ds = v dv',
      'Integrate with limits: ∫₀ˢ a ds = ∫ᵤᵛ v dv',
      'Evaluate integrals: a [s]₀ˢ = [v²/2]ᵤᵛ ⇒ a s = 1/2(v² - u²)',
      'Rearrange algebraically to obtain v² = u² + 2as',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The calculus derivation eliminates time by expressing acceleration via the chain rule as a = v(dv/ds), separating variables to a ds = v dv, integrating from initial conditions (s=0, v=u) to final (s, v), and rearranging to v² = u² + 2as.',
    hints: [
      'Start with the chain rule definition relating acceleration, velocity, and position.',
      'Next, separate differentials ds and dv onto opposite sides.',
      'Apply integration limits from initial to final states, then evaluate.',
    ],
  },
  {
    id: 'ch_012_c11_008',
    nodeId: NODE_C11_PHY_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A weather sounding rocket is projected vertically upward from Sriharikota with an initial launch speed u = 39.2 m/s. Taking g = 9.8 m/s², what is the total time of flight T (in seconds) until it returns to the launch pad?',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 's',
    explanation: 'Time to reach maximum height t_up = u / g = 39.2 / 9.8 = 4 s. By symmetry of constant gravity, total time of flight T = 2u / g = 2 × 4 = 8 seconds.',
    hints: [
      'At peak altitude, instantaneous vertical velocity v = 0.',
      'Time to ascend is t = u / g.',
      'Total round-trip time is 2 × (u / g) = 2 × 39.2 / 9.8 = 8 s.',
    ],
  },
  {
    id: 'ch_013_c11_010',
    nodeId: NODE_C11_PHY_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two thrusters on a satellite exert perpendicular forces F₁ = 12 N along +x and F₂ = 5 N along +y. Calculate the magnitude of the resultant thrust in Newtons.',
    correctAnswer: 13,
    tolerance: 0.1,
    unit: 'N',
    explanation: 'Since θ = 90°, R = √(F₁² + F₂²) = √(12² + 5²) = √(144 + 25) = √169 = 13 N.',
    hints: [
      'For perpendicular vectors (θ = 90°), cos 90° = 0.',
      'Use Pythagoras: R = √(12² + 5²).',
      '√(144 + 25) = √169 = 13.',
    ],
  },
  {
    id: 'ch_014_c11_004',
    nodeId: NODE_C11_PHY_004,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the dimensional formula of the Universal Gravitational Constant G from Newton’s Law F = G m₁ m₂ / r².',
    availableParts: ['M⁻¹', 'M¹', 'L³', 'L²', 'T⁻²', 'T⁻¹', 'L⁻¹'],
    targetState: 'M⁻¹ L³ T⁻²',
    validationHint: 'Rearrange G = F r² / (m₁ m₂) and substitute [F] = M L T⁻², [r²] = L², [m₁ m₂] = M².',
    explanation: '[G] = [F][r²]/[m₁m₂] = (M L T⁻²)(L²) / (M²) = M¹⁻² L¹⁺² T⁻² = [M⁻¹ L³ T⁻²].',
    hints: [
      'Rearrange Newton’s Law: G = F·r² / (m₁·m₂).',
      'Substitute: [F] = M L T⁻², [r²] = L², and [mass²] = M².',
      'Combine exponents: M^(1-2) L^(1+2) T^(-2) = M⁻¹ L³ T⁻².',
    ],
  },
  {
    id: 'ch_015_c11_006',
    nodeId: NODE_C11_PHY_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A test car’s velocity is given by v(t) = 6t² + 4t (m/s). Use definite integration ∫₁³ v(t) dt to compute the net displacement in meters between t = 1 s and t = 3 s.',
    correctAnswer: 68,
    tolerance: 0.5,
    unit: 'm',
    explanation: '∫ (6t² + 4t) dt = [2t³ + 2t²]₁³ = [2(27) + 2(9)] - [2(1) + 2(1)] = (54 + 18) - (2 + 2) = 72 - 4 = 68 m.',
    hints: [
      'Integrate 6t² dt to get 2t³ and integrate 4t dt to get 2t².',
      'Evaluate the antiderivative 2t³ + 2t² at upper limit t = 3: 2(27) + 2(9) = 72.',
      'Evaluate at lower limit t = 1: 2(1) + 2(1) = 4. Net displacement = 72 - 4 = 68 m.',
    ],
  },

  // Advanced Tier (16 - 22)
  {
    id: 'ch_016_c11_004',
    nodeId: NODE_C11_PHY_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student uses dimensional analysis to derive the period of a simple pendulum as T = k √(L/g). Which statement critically evaluates the fundamental limitations of this method?',
    options: [
      'Dimensional analysis is flawed because it fails to calculate dimensions of L and g.',
      'It correctly predicts the functional dependence √(L/g), but is blind to dimensionless constants like k = 2π and cannot handle large-angle non-linear terms like sin θ.',
      'Dimensional analysis can easily evaluate 2π by equating units of angle in radians.',
      'The method proves mass affects the time period through higher-order dimensional terms.',
    ],
    correctIndex: 1,
    explanation: 'Dimensional analysis yields the proportional relationship √(L/g), but cannot evaluate dimensionless numerical constants (such as 2π from differential equations) and cannot incorporate non-linear trigonometric arguments like sin(θ).',
    hints: [
      'Can pure dimensions tell you if the pre-factor is 2π, 4π, or 1/2?',
      'Angles in radians are dimensionless ratios (arc / radius), making trigonometric functions invisible to dimensional matching.',
      'Hence, dimensional analysis fixes the algebraic power law but cannot determine pure numeric constants.',
    ],
  },
  {
    id: 'ch_017_c11_007',
    nodeId: NODE_C11_PHY_007,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An experimental ion thruster accelerates with time-varying acceleration a(t) = 3t (m/s²). Starting from rest (u = 0 at t = 0), what is the total displacement s (in meters) covered after t = 4 seconds?',
    correctAnswer: 32,
    tolerance: 0.5,
    unit: 'm',
    explanation: 'a = dv/dt = 3t ⇒ v(t) = ∫ 3t dt = 1.5 t². Next, s(t) = ∫ v(t) dt = ∫ 1.5 t² dt = 1.5 (t³/3) = 0.5 t³. At t = 4 s: s(4) = 0.5 × 4³ = 0.5 × 64 = 32 m.',
    hints: [
      'Since acceleration is not constant, standard Class 9 algebraic formulas fail; you must integrate twice.',
      'First integration: v(t) = ∫ 3t dt = 3/2 t² = 1.5 t².',
      'Second integration: s(t) = ∫ 1.5 t² dt = 0.5 t³. Evaluate 0.5 × (4)³ = 32 m.',
    ],
  },
  {
    id: 'ch_018_c11_010',
    nodeId: NODE_C11_PHY_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Two vectors A and B have equal magnitudes |A| = |B| = 10 units. If the magnitude of their resultant |A + B| is also 10 units, what is the angle θ (in degrees) between vectors A and B?',
    correctAnswer: 120,
    tolerance: 1,
    unit: 'degrees',
    explanation: 'R² = A² + B² + 2AB cos θ ⇒ 10² = 10² + 10² + 2(10)(10) cos θ ⇒ 100 = 200 + 200 cos θ ⇒ -100 = 200 cos θ ⇒ cos θ = -0.5 ⇒ θ = 120°.',
    hints: [
      'Use the parallelogram law formula: R² = A² + B² + 2 A B cos θ.',
      'Substitute R = 10, A = 10, B = 10: 100 = 100 + 100 + 200 cos θ.',
      'Simplify: 200 cos θ = -100 ⇒ cos θ = -1/2. The angle whose cosine is -0.5 is 120°.',
    ],
  },
  {
    id: 'ch_019_c11_009',
    nodeId: NODE_C11_PHY_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Consider three 3D vectors: A = 2 î + 3 ĵ, B = 4 î - ĵ, and C = 5 î + 8 ĵ. A flight engineer asserts these vectors are co-planar. Is this assertion valid?',
    options: [
      'No, because 3 vectors in 3D can never be co-planar.',
      'Yes, because the k̂ (z-axis) component for all three vectors is exactly zero, confining them entirely to the xy-plane.',
      'No, because their magnitudes are all different.',
      'Yes, but only if they originate from the identical coordinate point.',
    ],
    correctIndex: 1,
    explanation: 'Vectors with a zero component along one axis (here z=0, k̂ = 0) all lie entirely within the plane defined by the other two axes (xy-plane). Thus, they are strictly co-planar regardless of magnitude or origin point.',
    hints: [
      'What plane do vectors with zero z-component (k̂ = 0) reside in?',
      'Since all three have no k̂ component, they lie in the z = 0 (xy) plane.',
      'Any set of vectors sharing a common 2D plane is co-planar.',
    ],
  },
  {
    id: 'ch_020_c11_008',
    nodeId: NODE_C11_PHY_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A capsule is dropped from a hovering helicopter at height H. In the final 1.0 second of its fall before impact, it traverses 44.1 m. Taking g = 9.8 m/s² and u = 0, find the total time of fall t in seconds.',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 's',
    explanation: 'Distance in n-th second sₙ = u + g/2 (2n - 1) ⇒ 44.1 = 0 + (9.8/2)(2t - 1) ⇒ 44.1 = 4.9(2t - 1) ⇒ 2t - 1 = 9 ⇒ 2t = 10 ⇒ t = 5.0 seconds.',
    hints: [
      'Use the formula for displacement in the n-th second: sₙ = u + g/2 (2n - 1).',
      'Here u = 0, so 44.1 = 4.9 (2t - 1).',
      '44.1 / 4.9 = 9 ⇒ 2t - 1 = 9 ⇒ t = 5 s.',
    ],
  },
  {
    id: 'ch_021_c11_002',
    nodeId: NODE_C11_PHY_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A technician adds three telemetry readings: 12.52 m, 3.4 m, and 0.018 m. Following CISCE significant figure rules for addition, what should be recorded in the official flight log?',
    options: ['15.938 m', '15.94 m', '15.9 m', '16 m'],
    correctIndex: 2,
    explanation: 'For addition and subtraction, the final result must retain only as many decimal places as the input with the fewest decimal places. Since 3.4 m has only 1 decimal place, the raw sum 15.938 m rounds to 15.9 m.',
    hints: [
      'Remember the rule for addition is based on decimal places, not significant figures.',
      'Check the decimal places: 12.52 (2 places), 3.4 (1 place), 0.018 (3 places).',
      'The least precise input has 1 decimal place, so 15.938 rounds to 15.9 m.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_022_c11_010',
    nodeId: NODE_C11_PHY_010,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the unit vector formula for A = 3 î + 4 ĵ in the form Â = A / |A|.',
    availableParts: ['0.6 î', '+ 0.8 ĵ', '0.5 î', '+ 0.5 ĵ', '3 î', '4 ĵ', '/ 5', '/ 7'],
    targetState: '0.6 î + 0.8 ĵ',
    validationHint: '|A| = √(3² + 4²) = 5. Divide each component by 5: (3/5) î + (4/5) ĵ = 0.6 î + 0.8 ĵ.',
    explanation: 'Unit vector Â = (3 î + 4 ĵ) / √(3² + 4²) = (3 î + 4 ĵ) / 5 = 0.6 î + 0.8 ĵ.',
    hints: [
      'Calculate the magnitude: √(3² + 4²) = 5.',
      'Divide both components by 5: 3/5 = 0.6 and 4/5 = 0.8.',
      'Assemble: 0.6 î + 0.8 ĵ.',
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
  nodeId: NODE_C11_PHY_001,
  title: 'Units, Measurements, Vectors & 1D Kinematics',
  definition: 'Foundational framework of classical mechanics encompassing systems of units (SI, CGS), error analysis, dimensional homogeneity, vector operations via parallelogram law, and calculus-based 1D kinematics.',
  eli5: 'Think of physics as a universal language. Units are the words, dimensional analysis checks the grammar, vectors give directions on a 3D map, and calculus tracks the exact speedometer and odometer changes continuously in real-time.',
  misconceptions: [
    {
      misconception: 'Writing the kilogram symbol as "Kg" or Kelvin as "°K".',
      correction: 'SI rules dictate lowercase "kg" for kilogram and capital "K" with no degree symbol for thermodynamic temperature.',
    },
    {
      misconception: 'Assuming average speed always equals the magnitude of average velocity.',
      correction: 'Average velocity is displacement/time, while average speed is total distance/time. They only match for non-reversing straight-line motion.',
    },
    {
      misconception: 'Believing that averaging multiple readings removes systematic zero errors.',
      correction: 'Averaging reduces random fluctuations, but systematic errors (like zero error) shift all readings equally and must be subtracted analytically.',
    },
    {
      misconception: 'Assuming dimensional consistency guarantees physical correctness.',
      correction: 'Dimensional homogeneity is necessary but not sufficient; it cannot detect missing dimensionless numbers (like 1/2 or 2π) or incorrect signs.',
    },
    {
      misconception: 'Treating vector addition like scalar arithmetic where 5 N + 5 N always equals 10 N.',
      correction: 'Vector addition depends on angle θ via R = √(P² + Q² + 2PQ cos θ), ranging from 0 N (at 180°) to 10 N (at 0°).',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which of the following represents a base SI unit?',
      options: ['Newton (N)', 'Joule (J)', 'Ampere (A)', 'Pascal (Pa)'],
      correctIndex: 2,
    },
    {
      question: 'The number of significant figures in 0.007050 is:',
      options: ['3', '4', '6', '7'],
      correctIndex: 1,
    },
    {
      question: 'What are the dimensions of Work and Energy?',
      options: ['[M L T⁻²]', '[M L² T⁻²]', '[M L² T⁻³]', '[M L⁻¹ T⁻²]'],
      correctIndex: 1,
    },
    {
      question: 'If position x(t) = 4t² + 2, the instantaneous velocity at t = 3 s is:',
      options: ['12 m/s', '24 m/s', '26 m/s', '38 m/s'],
      correctIndex: 1,
    },
    {
      question: 'The area under a Velocity-Time (v-t) graph represents:',
      options: ['Acceleration', 'Displacement', 'Instantaneous speed', 'Force'],
      correctIndex: 1,
    },
    {
      question: 'A ball thrown vertically upward has an acceleration at its peak of:',
      options: ['0 m/s²', '9.8 m/s² downward', '9.8 m/s² upward', 'Undefined'],
      correctIndex: 1,
    },
    {
      question: 'The resultant of two equal vectors P at 90° has magnitude:',
      options: ['P', '2P', '√2 P', 'P / √2'],
      correctIndex: 2,
    },
    {
      question: 'If a vector has components (3, 4, 12), its magnitude is:',
      options: ['19', '13', '15', '169'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Student can convert unit systems, propagate significant figures, verify dimensional homogeneity, differentiate/integrate kinematic equations, and add 2D/3D vectors.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Vector Parallelogram & Resultant Thrust',
    instruction: 'Drag the vector sliders to adjust Vector P, Vector Q, and the angle θ. Watch how the parallelogram diagonal R morphs in real-time.',
    interactionType: 'vector-sandbox',
    nodeId: NODE_C11_PHY_010,
  },
  {
    title: 'Lab 2: Calculus Kinematics (x-t, v-t, a-t)',
    instruction: 'Adjust the acceleration slider and time scrub to observe how integrating a(t) gives v(t) (slope of x-t) and displacement s(t) (area under v-t).',
    interactionType: 'calculus-motion',
    nodeId: NODE_C11_PHY_006,
  },
  {
    title: 'Lab 3: 1D Gravity Drop & Launch Chamber',
    instruction: 'Set the initial launch velocity u and drop height. Toggle between free-fall drop and upward projection to track peak height and flight time.',
    interactionType: 'gravity-chamber',
    nodeId: NODE_C11_PHY_008,
  },
  {
    title: 'Lab 4: Dimensional Homogeneity Verifier',
    instruction: 'Select terms in a proposed physics equation and check if both sides have identical [M^a L^b T^c] powers.',
    interactionType: 'dimensional-checker',
    nodeId: NODE_C11_PHY_003,
  },
  {
    title: 'Lab 5: Unit Prefix & CGS/SI Converter',
    instruction: 'Shift the prefix exponent scale from nano (10⁻⁹) to giga (10⁹) and convert Newtons/Joules into Dynes/Ergs dynamically.',
    interactionType: 'unit-ladder',
    nodeId: NODE_C11_PHY_001,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If two equal thruster vectors of 100 N each are angled at θ = 120°, what will the magnitude of the resultant thrust be?',
    options: ['200 N', '141.4 N', '100 N', '0 N'],
    correctIndex: 2,
    verifyInstruction: 'Set P = 100, Q = 100, and θ = 120° in the Vector Lab below to verify why R = 100 N!',
    nodeId: NODE_C11_PHY_010,
  },
  {
    question: 'Predict: A ball is thrown upward at 19.6 m/s. What will its velocity be exactly when it returns to the launcher?',
    options: ['0 m/s', '+19.6 m/s (upward)', '-19.6 m/s (downward)', '-9.8 m/s'],
    correctIndex: 2,
    verifyInstruction: 'Launch the projectile in Lab 3 at u = 19.6 m/s and inspect the final velocity gauge at landing.',
    nodeId: NODE_C11_PHY_008,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Vector Parallelogram visualization, what happens to the resultant R as the angle θ increases from 0° to 180°?',
    observableOptions: [
      'R increases continuously from |P - Q| to (P + Q)',
      'R decreases continuously from maximum (P + Q) to minimum |P - Q|',
      'R remains completely constant',
      'R becomes negative',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_PHY_010,
  },
  {
    question: 'On the Kinematics Graph, what does the geometric area under the v-t curve between t₁ and t₂ correspond to?',
    observableOptions: [
      'Instantaneous acceleration',
      'Total net displacement Δx',
      'Rate of change of acceleration (jerk)',
      'Total force applied',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_PHY_005,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Flight Officer Mission: Chandrayaan Descent Vector Audit',
  description: 'Apply your physics skills to simulate a lunar soft-landing thruster balancing problem. Verify that the two canted descent thrusters combine vectorially to counter lunar gravity (1.62 m/s²) exactly.',
  steps: [
    'Log on to ISRO Telemetry console: Select moon gravity g_moon = 1.62 m/s².',
    'Set Lander dry mass m = 600 kg. Required upward braking force F_req = m · g_moon = 972 N.',
    'Set two identical thrusters P = Q = 561 N inclined at θ = 60° to each other symmetrically.',
    'Verify: R = 2 · P · cos(30°) = 2 · 561 · 0.866 = 972 N vertical thrust. Touchdown successful!',
  ],
};

// ─── MAIN COMPONENT ───
export function C11_PhysicsSystemsUnitscgsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_PHY_001,
  title = DEFAULT_PROPS.title || 'Units, Measurements, Vectors & 1D Kinematics',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚛️', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery & Exploration Interactive States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Vector Simulator Lab State
  const [vecP, setVecP] = useState(12);
  const [vecQ, setVecQ] = useState(5);
  const [vecAngle, setVecAngle] = useState(90); // in degrees

  // Calculus Kinematics Lab State
  const [simAccel, setSimAccel] = useState(2.0); // m/s^2
  const [simInitVel, setSimInitVel] = useState(0); // m/s
  const [simTime, setSimTime] = useState(4.0); // s

  // Gravity Lab State
  const [gravU, setGravU] = useState(19.6);
  const [gravH, setGravH] = useState(50);
  const [gravMode, setGravMode] = useState<'drop' | 'projectile'>('projectile');

  // Dimensional Lab State
  const [dimFormulaSelected, setDimFormulaSelected] = useState<'F=ma' | 'E=mc2' | 'v2=u2+2as'>('v2=u2+2as');

  // Unit Ladder Lab State
  const [prefixExponent, setPrefixExponent] = useState(3); // kilo = 10^3

  // Challenge Adaptive Engine States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating Hints & Progressive Disclosure States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual Feedback & Micro-Interactions States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort / Construct / Numeric States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── VECTOR MATH MEMOS ───
  const vecResultant = useMemo(() => {
    const rad = (vecAngle * Math.PI) / 180;
    const mag = Math.sqrt(vecP * vecP + vecQ * vecQ + 2 * vecP * vecQ * Math.cos(rad));
    const tanAlpha = (vecQ * Math.sin(rad)) / (vecP + vecQ * Math.cos(rad) || 0.0001);
    let alphaDeg = (Math.atan(tanAlpha) * 180) / Math.PI;
    if (alphaDeg < 0) alphaDeg += 180;
    return {
      magnitude: parseFloat(mag.toFixed(2)),
      alpha: parseFloat(alphaDeg.toFixed(1)),
    };
  }, [vecP, vecQ, vecAngle]);

  // ─── KINEMATICS CALCULUS MEMOS ───
  const kinematicsData = useMemo(() => {
    const v = simInitVel + simAccel * simTime;
    const s = simInitVel * simTime + 0.5 * simAccel * simTime * simTime;
    return {
      currentVel: parseFloat(v.toFixed(2)),
      displacement: parseFloat(s.toFixed(2)),
    };
  }, [simInitVel, simAccel, simTime]);

  // ─── GRAVITY LAB MEMOS ───
  const gravityData = useMemo(() => {
    const g = 9.8;
    if (gravMode === 'drop') {
      const timeToFall = Math.sqrt((2 * gravH) / g);
      const impactVel = g * timeToFall;
      return {
        tMax: parseFloat(timeToFall.toFixed(2)),
        vImpact: parseFloat(impactVel.toFixed(2)),
        peakH: gravH,
      };
    } else {
      const tUp = gravU / g;
      const tTotal = (2 * gravU) / g;
      const maxH = (gravU * gravU) / (2 * g);
      return {
        tMax: parseFloat(tTotal.toFixed(2)),
        tPeak: parseFloat(tUp.toFixed(2)),
        peakH: parseFloat(maxH.toFixed(2)),
        vImpact: gravU,
      };
    }
  }, [gravU, gravH, gravMode]);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT 1: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT 2: ADAPT DIFFICULTY ON SCORE UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff: 'foundation' | 'standard' | 'advanced' =
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

  // ─── EFFECT 3: HTML CANVAS 2D ANIMATION LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid background
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

      // Dynamic telemetry sine carrier wave
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + tick * 2) * 0.05) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Satellite tracking beacon point
      const beaconX = (tick * 1.5) % canvas.width;
      const beaconY = canvas.height / 2 + Math.sin((beaconX + tick * 2) * 0.05) * 12;

      ctx.beginPath();
      ctx.arc(beaconX, beaconY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  // ─── EFFECT 4: AUTO-HINT TIMER ───
  useEffect(() => {
    if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        showNextHint();
      }, 12000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, hintCount, answerRevealed, showNextHint]);

  // ─── EFFECT 5: ESCALATE VOICE ON SLIDE CHANGE ───
  useEffect(() => {
    if (phase === 'explore') {
      speechManager.speak(EXPLORATION_STEPS[currentSlide].title);
    }
  }, [phase, currentSlide]);

  // ─── EFFECT 6: CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
  }, []);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Superb! You understand unit conversions.');
    } else {
      audioManager.play('error');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive telemetry laboratory. Explore each station.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Manipulate the parameters freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('chime');
    speechManager.speak('Initiating ISRO competency flight certification challenge.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Accurate observation! Vector resultant shrinks as the angle widens.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Inspect the diagonal arrow as angle increases to 180 degrees.');
    }
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
        setWrongShake(true);
        setTimeout(() => setWrongShake(false), 400);
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const base = prev.length > 0 ? [...prev] : [0, 1, 2, 3, 4];
      const [item] = base.splice(fromIdx, 1);
      base.splice(toIdx, 0, item);
      return base;
    });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission accomplished! Flight certification score: ${finalScore} percent.`);
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
      resetInactivityTimer();
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        const orderToTest = Array.isArray(answer) && answer.length > 0 ? answer : [0, 1, 2, 3, 4];
        isCorrect = JSON.stringify(orderToTest) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(val - (challenge.correctAnswer ?? 0)) <= (challenge.tolerance ?? 0.05);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState ?? '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('success');
        audioManager.play('drop-correct');
        speechManager.speak('Correct! Vector telemetry verified.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      } else {
        setErrors((e) => e + 1);
        audioManager.play('error');
        audioManager.play('drop-wrong');
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
          speechManager.speak('Let us review the step-by-step physical solution.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 6000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const triggerSparkleAt = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setShowSparkle(true);
    audioManager.play('sparkle');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans relative overflow-hidden">
      {/* ─── HEADER & TELEMETRY STATUS BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/30 flex items-center justify-center text-2xl shadow-inner cursor-pointer"
            onClick={triggerSparkleAt}
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">ISC Class 11 Physics</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">NEP 2020</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic Mode Switcher & Difficulty Badge */}
        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                  : difficulty === 'standard'
                  ? 'bg-gold-950/60 text-gold-400 border-gold-700'
                  : 'bg-rose-950/60 text-rose-400 border-rose-700'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
          <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            Phase: <span className="text-gold-300 font-semibold uppercase">{phase}</span>
          </div>
        </div>
      </div>

      {/* ─── PHASE 1: NARRATIVE & DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-gold-950/40 via-slate-900 to-slate-900 border border-gold-500/30 shadow-lg relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-300 text-xs font-semibold mb-3 border border-gold-500/20">
              🛰️ Flight Telemetry Scenario
            </div>
            <h2 className="text-xl font-bold text-gold-200 mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              🎯 <strong className="text-slate-200">Mission Requirement:</strong> {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">Curiosity Discovery Hook</span>
              <span className="text-xs text-slate-500">Not Graded</span>
            </div>
            <p className="text-sm md:text-base text-slate-200 font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-3.5 text-left text-sm rounded-xl transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-950/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500/50'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-lg bg-slate-700/60 text-center text-xs leading-6 mr-2 font-mono text-gold-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-3 border-t border-slate-800 space-y-3">
                <p className={`text-xs md:text-sm leading-relaxed ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Impulse = Force × time = 44.5 N·s = 4.45 × 10⁶ dyne·s.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Interactive Flight Telemetry Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: BRILLIANT INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Station Stepper */}
          <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800">
            <div className="flex gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    currentSlide === idx
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Lab {idx + 1}
                </motion.button>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Station {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs md:text-sm text-amber-300/90 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: VECTOR PARALLELOGRAM SIMULATOR ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/80 p-4 rounded-xl border border-slate-800/80">
                    <svg viewBox="0 0 360 260" className="w-full max-h-64 select-none">
                      <defs>
                        <marker id="arrowP" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L8,3 z" fill="#38bdf8" />
                        </marker>
                        <marker id="arrowQ" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L8,3 z" fill="#ec4899" />
                        </marker>
                        <marker id="arrowR" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto">
                          <path d="M0,0 L0,7 L9,3.5 z" fill="#10b981" />
                        </marker>
                      </defs>

                      {/* Origin Axes */}
                      <line x1="40" y1="200" x2="330" y2="200" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="40" y1="20" x2="40" y2="220" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="35" y="215" fill="#64748b" fontSize="10">O(0,0)</text>

                      {(() => {
                        const originX = 40;
                        const originY = 200;
                        const scale = 8;
                        const pLen = vecP * scale;
                        const qLen = vecQ * scale;
                        const rad = (vecAngle * Math.PI) / 180;
                        const pX = originX + pLen;
                        const pY = originY;
                        const qX = originX + qLen * Math.cos(rad);
                        const qY = originY - qLen * Math.sin(rad);
                        const rX = pX + qLen * Math.cos(rad);
                        const rY = originY - qLen * Math.sin(rad);

                        return (
                          <>
                            {/* Parallelogram Ghost Lines */}
                            <line x1={pX} y1={pY} x2={rX} y2={rY} stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
                            <line x1={qX} y1={qY} x2={rX} y2={rY} stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />

                            {/* Vector P */}
                            <line x1={originX} y1={originY} x2={pX} y2={pY} stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowP)" />
                            <text x={originX + pLen / 2} y={originY + 16} fill="#38bdf8" fontSize="11" fontWeight="bold">
                              P = {vecP} N
                            </text>

                            {/* Vector Q */}
                            <line x1={originX} y1={originY} x2={qX} y2={qY} stroke="#ec4899" strokeWidth="3" markerEnd="url(#arrowQ)" />
                            <text x={qX / 2 + 10} y={qY / 2 + 100} fill="#ec4899" fontSize="11" fontWeight="bold">
                              Q = {vecQ} N
                            </text>

                            {/* Resultant Vector R */}
                            <line x1={originX} y1={originY} x2={rX} y2={rY} stroke="#10b981" strokeWidth="4" markerEnd="url(#arrowR)" />
                            <text x={rX / 2 + 25} y={rY / 2 + 90} fill="#10b981" fontSize="12" fontWeight="bold">
                              R = {vecResultant.magnitude} N
                            </text>

                            {/* Angle Arc */}
                            <path
                              d={`M ${originX + 25} ${originY} A 25 25 0 0 0 ${originX + 25 * Math.cos(rad)} ${originY - 25 * Math.sin(rad)}`}
                              fill="none"
                              stroke="#f59e0b"
                              strokeWidth="2"
                            />
                            <text x={originX + 32} y={originY - 8} fill="#f59e0b" fontSize="10">
                              θ = {vecAngle}°
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    {/* Controls */}
                    <div className="space-y-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Vector P (Thruster 1):</span>
                          <span className="font-mono text-gold-400 font-bold">{vecP} N</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={20}
                          value={vecP}
                          onChange={(e) => setVecP(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Vector Q (Thruster 2):</span>
                          <span className="font-mono text-pink-400 font-bold">{vecQ} N</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={20}
                          value={vecQ}
                          onChange={(e) => setVecQ(Number(e.target.value))}
                          className="w-full accent-pink-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Included Angle θ:</span>
                          <span className="font-mono text-amber-400 font-bold">{vecAngle}°</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={180}
                          value={vecAngle}
                          onChange={(e) => setVecAngle(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>

                    {/* Formula Live Card */}
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1.5 font-mono">
                      <div className="text-slate-400 font-sans font-semibold">Parallelogram Law Formula:</div>
                      <div className="text-emerald-400">R = √(P² + Q² + 2PQ cos θ)</div>
                      <div className="text-slate-300">
                        = √({vecP}² + {vecQ}² + 2·{vecP}·{vecQ}·cos{vecAngle}°) = <strong className="text-emerald-300 text-sm">{vecResultant.magnitude} N</strong>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Direction α with P = <span className="text-gold-300 font-bold">{vecResultant.alpha}°</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: CALCULUS KINEMATICS INTEGRATOR ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 block mb-1">Constant Acceleration a = dv/dt</label>
                      <div className="flex justify-between text-sm font-mono text-gold-300 font-bold mb-1">
                        <span>{simAccel} m/s²</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.5}
                        value={simAccel}
                        onChange={(e) => setSimAccel(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 block mb-1">Initial Velocity u = v(0)</label>
                      <div className="flex justify-between text-sm font-mono text-gold-300 font-bold mb-1">
                        <span>{simInitVel} m/s</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={20}
                        step={1}
                        value={simInitVel}
                        onChange={(e) => setSimInitVel(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 block mb-1">Integration Time Horizon t</label>
                      <div className="flex justify-between text-sm font-mono text-amber-300 font-bold mb-1">
                        <span>{simTime} s</span>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={10}
                        step={0.5}
                        value={simTime}
                        onChange={(e) => setSimTime(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>

                  {/* Multi-representation Kinematics Graphs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* s-t graph */}
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                      <span className="text-xs text-slate-400 block mb-1">Position s(t) = ut + ½at²</span>
                      <svg viewBox="0 0 160 100" className="w-full h-24 bg-slate-950 rounded-lg p-1">
                        <path
                          d={`M 10 90 Q 80 ${90 - kinematicsData.displacement * 0.5} 150 ${Math.max(10, 90 - kinematicsData.displacement)}`}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        <text x="15" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold">
                          s = {kinematicsData.displacement} m
                        </text>
                      </svg>
                      <span className="text-[11px] text-slate-500 mt-1 block">Slope at t gives v(t)</span>
                    </div>

                    {/* v-t graph */}
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                      <span className="text-xs text-slate-400 block mb-1">Velocity v(t) = u + at</span>
                      <svg viewBox="0 0 160 100" className="w-full h-24 bg-slate-950 rounded-lg p-1">
                        {/* Area shading */}
                        <polygon
                          points={`10,90 10,${90 - simInitVel * 2} 150,${Math.max(10, 90 - kinematicsData.currentVel * 2)} 150,90`}
                          fill="#10b98122"
                          stroke="none"
                        />
                        <line
                          x1="10"
                          y1={90 - simInitVel * 2}
                          x2="150"
                          y2={Math.max(10, 90 - kinematicsData.currentVel * 2)}
                          stroke="#10b981"
                          strokeWidth="2.5"
                        />
                        <text x="15" y="20" fill="#10b981" fontSize="10" fontWeight="bold">
                          v = {kinematicsData.currentVel} m/s
                        </text>
                      </svg>
                      <span className="text-[11px] text-emerald-400 mt-1 block">Area = Displacement ({kinematicsData.displacement} m)</span>
                    </div>

                    {/* a-t graph */}
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                      <span className="text-xs text-slate-400 block mb-1">Acceleration a(t) = const</span>
                      <svg viewBox="0 0 160 100" className="w-full h-24 bg-slate-950 rounded-lg p-1">
                        <line x1="10" y1={90 - simAccel * 7} x2="150" y2={90 - simAccel * 7} stroke="#f59e0b" strokeWidth="2.5" />
                        <text x="15" y="20" fill="#f59e0b" fontSize="10" fontWeight="bold">
                          a = {simAccel} m/s²
                        </text>
                      </svg>
                      <span className="text-[11px] text-slate-500 mt-1 block">Area = Change in velocity Δv</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: 1D GRAVITY DROP & VERTICAL CANNON ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="md:col-span-5 space-y-4">
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setGravMode('projectile')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                          gravMode === 'projectile'
                            ? 'bg-gold-600 text-white border-gold-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        🚀 Upward Projection
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setGravMode('drop')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                          gravMode === 'drop'
                            ? 'bg-gold-600 text-white border-gold-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        🪂 Tower Free Fall (u=0)
                      </motion.button>
                    </div>

                    {gravMode === 'projectile' ? (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Initial Launch Velocity u:</span>
                          <span className="font-mono text-gold-300 font-bold">{gravU} m/s</span>
                        </div>
                        <input
                          type="range"
                          min={4.9}
                          max={49}
                          step={4.9}
                          value={gravU}
                          onChange={(e) => setGravU(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Drop Height H:</span>
                          <span className="font-mono text-gold-300 font-bold">{gravH} m</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={125}
                          step={5}
                          value={gravH}
                          onChange={(e) => setGravH(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                    )}

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="text-slate-400 font-bold uppercase tracking-wider">Flight Kinematics Metrics:</div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-300">Peak Height (H_max):</span>
                        <span className="font-mono text-emerald-400 font-bold">{gravityData.peakH} m</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-300">Total Duration (T_flight):</span>
                        <span className="font-mono text-amber-400 font-bold">{gravityData.tMax} s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Impact Speed (|v_impact|):</span>
                        <span className="font-mono text-rose-400 font-bold">{gravityData.vImpact} m/s</span>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Chamber Visualizer */}
                  <div className="md:col-span-7 bg-slate-900 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 200 220" className="w-full max-h-56">
                      {/* Vertical axis scale */}
                      <line x1="40" y1="20" x2="40" y2="200" stroke="#475569" strokeWidth="2" />
                      <line x1="30" y1="200" x2="170" y2="200" stroke="#334155" strokeWidth="3" />
                      <text x="50" y="200" fill="#64748b" fontSize="9">Ground (y=0)</text>

                      {/* Drop Tower / Launch Path */}
                      <line x1="100" y1="30" x2="100" y2="195" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />

                      {/* Ball position animation */}
                      <circle cx="100" cy="50" r="10" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />

                      {/* Velocity and Gravity Vectors */}
                      <line x1="100" y1="50" x2="100" y2="90" stroke="#fbbf24" strokeWidth="2.5" />
                      <polygon points="97,90 103,90 100,98" fill="#fbbf24" />
                      <text x="115" y="80" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        g = 9.8 m/s² ↓
                      </text>

                      {/* Peak annotation */}
                      <text x="60" y="30" fill="#10b981" fontSize="10" fontWeight="bold">
                        H_max = {gravityData.peakH} m
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: DIMENSIONAL HOMOGENEITY LAB ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {(['v2=u2+2as', 'F=ma', 'E=mc2'] as const).map((eq) => (
                      <motion.button
                        key={eq}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDimFormulaSelected(eq)}
                        className={`px-4 py-2 text-xs font-mono font-bold rounded-xl border ${
                          dimFormulaSelected === eq
                            ? 'bg-gold-600 text-white border-gold-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        Equation: {eq}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                    {dimFormulaSelected === 'v2=u2+2as' && (
                      <div className="space-y-2">
                        <div className="text-slate-300 font-bold">Checking Homogeneity of v² = u² + 2as:</div>
                        <div className="p-2.5 bg-slate-950 rounded-lg text-gold-400">
                          [LHS] [v²] = ([L T⁻¹])² = <strong className="text-white">[L² T⁻²]</strong>
                        </div>
                        <div className="p-2.5 bg-slate-950 rounded-lg text-pink-400">
                          [RHS Term 1] [u²] = ([L T⁻¹])² = <strong className="text-white">[L² T⁻²]</strong>
                        </div>
                        <div className="p-2.5 bg-slate-950 rounded-lg text-emerald-400">
                          [RHS Term 2] [2as] = (1) · ([L T⁻²]) · ([L]) = <strong className="text-white">[L² T⁻²]</strong>
                        </div>
                        <div className="text-emerald-300 text-xs font-sans mt-2">
                          ✓ All terms share dimensions [L² T⁻²]. The principle of homogeneity is satisfied!
                        </div>
                      </div>
                    )}

                    {dimFormulaSelected === 'F=ma' && (
                      <div className="space-y-2">
                        <div className="text-slate-300 font-bold">Checking Homogeneity of F = ma:</div>
                        <div className="p-2.5 bg-slate-950 rounded-lg text-gold-400">
                          [LHS] Force [F] = <strong className="text-white">[M L T⁻²]</strong> (Newton: kg·m·s⁻²)
                        </div>
                        <div className="p-2.5 bg-slate-950 rounded-lg text-emerald-400">
                          [RHS] Mass × Accel [m·a] = [M] · [L T⁻²] = <strong className="text-white">[M L T⁻²]</strong>
                        </div>
                        <div className="text-emerald-300 text-xs font-sans mt-2">
                          ✓ Dimensions match exactly on both sides!
                        </div>
                      </div>
                    )}

                    {dimFormulaSelected === 'E=mc2' && (
                      <div className="space-y-2">
                        <div className="text-slate-300 font-bold">Checking Homogeneity of E = mc²:</div>
                        <div className="p-2.5 bg-slate-950 rounded-lg text-gold-400">
                          [LHS] Energy [E] = <strong className="text-white">[M L² T⁻²]</strong> (Joule: kg·m²·s⁻²)
                        </div>
                        <div className="p-2.5 bg-slate-950 rounded-lg text-emerald-400">
                          [RHS] [m·c²] = [M] · ([L T⁻¹])² = <strong className="text-white">[M L² T⁻²]</strong>
                        </div>
                        <div className="text-emerald-300 text-xs font-sans mt-2">
                          ✓ Energy and mass-velocity-squared possess identical dimensions!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 5: UNIT PREFIX & CGS/SI CONVERTER ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>SI Prefix Scale Power of 10ⁿ:</span>
                      <span className="font-mono text-gold-300 font-bold">10^{prefixExponent}</span>
                    </div>
                    <input
                      type="range"
                      min={-15}
                      max={12}
                      step={3}
                      value={prefixExponent}
                      onChange={(e) => setPrefixExponent(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <span className="text-[11px] text-slate-400 block">Prefix Name</span>
                      <span className="text-base font-bold text-gold-300">
                        {prefixExponent === -15
                          ? 'Femto (f)'
                          : prefixExponent === -12
                          ? 'Pico (p)'
                          : prefixExponent === -9
                          ? 'Nano (n)'
                          : prefixExponent === -6
                          ? 'Micro (μ)'
                          : prefixExponent === -3
                          ? 'Milli (m)'
                          : prefixExponent === 0
                          ? 'Base (1)'
                          : prefixExponent === 3
                          ? 'Kilo (k)'
                          : prefixExponent === 6
                          ? 'Mega (M)'
                          : prefixExponent === 9
                          ? 'Giga (G)'
                          : 'Tera (T)'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <span className="text-[11px] text-slate-400 block">Power Multiplier</span>
                      <span className="text-sm font-mono text-emerald-400 font-bold">10^{prefixExponent}</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <span className="text-[11px] text-slate-400 block">1 Newton in Dynes</span>
                      <span className="text-sm font-mono text-gold-300 font-bold">10⁵ dynes</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <span className="text-[11px] text-slate-400 block">1 Joule in Ergs</span>
                      <span className="text-sm font-mono text-pink-300 font-bold">10⁷ ergs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Predict-Then-Check Container */}
              {currentSlide === 0 && (
                <div className="mt-4 p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <span>💡 Predict-Then-Check Experiment</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                  {!predictionMade ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(i)}
                          className="p-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2.5 bg-gold-950/40 border border-gold-700 rounded-lg text-xs text-gold-300">
                      Prediction saved! {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}
                </div>
              )}

              {/* Observation Question Container */}
              {currentSlide === 0 && (
                <div className="mt-4 p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-gold-400 block">🔍 What Do You Notice? (Observation)</span>
                  <p className="text-xs md:text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                  <div className="space-y-2">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleObservation(i)}
                        className={`w-full text-left p-2.5 text-xs rounded-lg border transition-all ${
                          observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-semibold shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: UNGUIDED SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold mb-1">
                🎮 Flight Simulator Sandbox
              </div>
              <h3 className="text-base md:text-lg font-bold text-white">Interactive Physics Sandbox Playground</h3>
              <p className="text-xs text-slate-400">Zero pressure, no evaluation. Test custom vector thrusts, projectile launches, and calculus rates.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2"
            >
              Ready for Certification Challenges! 🎯
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vector Free Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Dual Thruster Vector Resultant</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Thruster P: {vecP} N</span>
                  <span>Thruster Q: {vecQ} N</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={50}
                  value={vecP}
                  onChange={(e) => setVecP(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
                <input
                  type="range"
                  min={2}
                  max={50}
                  value={vecQ}
                  onChange={(e) => setVecQ(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Gimbal Angle: {vecAngle}°</span>
                  <span className="text-emerald-400 font-bold font-mono">Resultant R = {vecResultant.magnitude} N</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={180}
                  value={vecAngle}
                  onChange={(e) => setVecAngle(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            {/* Descent Module Kinematics */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Descent Velocity & Odometer</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Braking Decel: {simAccel} m/s²</span>
                  <span>Initial Speed: {simInitVel} m/s</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={0.5}
                  value={simAccel}
                  onChange={(e) => setSimAccel(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Scrub Time: {simTime} s</span>
                  <span className="text-emerald-400 font-bold font-mono">Displacement s = {kinematicsData.displacement} m</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={simTime}
                  onChange={(e) => setSimTime(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CERTIFICATION CHALLENGE ENGINE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Real-time Telemetry Carrier Canvas */}
          <canvas ref={canvasRef} width={600} height={40} className="w-full h-8 rounded-xl bg-slate-950 border border-slate-800 shadow-inner" />

          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">
              Flight Certification Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </span>
            <span className="font-mono text-gold-400">Competency: {challenge.competencyLevel.toUpperCase()}</span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="text-xs text-gold-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-5 md:p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-gold-300 text-[11px] font-mono mb-2 border border-slate-700">
              Target Node: {challenge.nodeId}
            </div>
            <h3 className="text-sm md:text-base font-semibold leading-relaxed mb-4 text-white">{challenge.question}</h3>

            {/* MCQ Option Buttons */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.012 }}
                      whileTap={{ scale: 0.988 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-3.5 text-xs md:text-sm rounded-xl transition-all border flex items-center justify-between ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-950/40 border-slate-800 text-slate-500'
                          : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-700 text-gold-300 font-mono text-xs flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold">✓</span>}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label Option */}
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
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-mono cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'box_force', title: 'Force (N)' },
                    { id: 'box_work', title: 'Work / Energy (J)' },
                    { id: 'box_press', title: 'Pressure (Pa)' },
                    { id: 'box_power', title: 'Power (W)' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col items-center justify-center transition-colors ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[11px] block font-semibold mb-1">{target.title}</span>
                      <span className="text-xs font-mono font-bold text-white">
                        {droppedLabels[target.id] || 'Drop Formula Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* Drag Sort Option */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or use arrow buttons to reorder derivation steps into logical flow:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(String(i))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, i);
                      }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 flex items-center justify-between cursor-grab"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-700 text-gold-300 font-mono flex items-center justify-center font-bold">
                          {i + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleSortMove(i, Math.max(0, i - 1))}
                          className="px-2 py-0.5 bg-slate-700 rounded text-[10px] text-slate-300"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSortMove(i, Math.min(challenge.sortItems!.length - 1, i + 1))}
                          className="px-2 py-0.5 bg-slate-700 rounded text-[10px] text-slate-300"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(sortArrangement)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Derivation Flow →
                </motion.button>
              </div>
            )}

            {/* Numeric Input Option */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    disabled={showExplanation}
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-gold-500 w-48"
                  />
                  <span className="text-xs font-mono text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md disabled:opacity-40"
                  >
                    Submit Telemetry →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Parts Option */}
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
                      disabled={showExplanation}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 text-xs font-mono rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-900/60 text-gold-200 border border-gold-700 rounded-md text-xs font-mono flex items-center gap-1.5">
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 text-xs"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600 font-mono">Click parts above to assemble formula</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md disabled:opacity-40"
                >
                  Verify Assembly →
                </motion.button>
              </div>
            )}

            {/* Step-By-Step Click-To-Reveal Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Step-By-Step Solution Walkthrough:</span>
                <div className="space-y-1.5">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-slate-300 leading-relaxed font-sans">
                        <span className="text-amber-400 font-bold font-mono mr-1.5">{i + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-750 text-amber-300 text-xs font-bold rounded-lg border border-slate-700"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 block"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Certification →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD MISSION DEBRIEF ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 md:p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto shadow-inner">
              🚀
            </div>
            <h2 className="text-2xl font-bold text-white">ISRO Flight Dynamics Certification Complete!</h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
              Your flight telemetry calculations, vector thruster additions, and calculus kinematics derivations have been officially recorded.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Final Score</span>
                <span className="text-xl font-bold text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Mastery Level</span>
                <span className="text-sm font-bold text-gold-400 uppercase font-mono">{masteryLevel}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Errors Caught</span>
                <span className="text-xl font-bold text-amber-400 font-mono">{errors}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Review Due In</span>
                <span className="text-sm font-bold text-gold-300 font-mono">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </span>
              </div>
            </div>
          </div>

          {/* Motivational Personalized Feedback */}
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/80">
            <h4 className="text-base font-bold text-emerald-300 mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h4>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              {errors === 0
                ? 'Flawless Telemetry! You demonstrated zero calculation errors across all dimensional, vector, and calculus kinematics challenges.'
                : errors <= 3
                ? 'Commendable Performance! You have strong grasp of vector mechanics and kinematic calculus.'
                : errors <= 7
                ? 'You made good progress through the flight simulation challenges. Keep reviewing key concepts.'
                : 'Every setback is a setup for a comeback. Practice makes perfect!'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>🤔 Reflection & Consolidation</span>
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-slate-300 mb-1">1. What was the most surprising thing you learned?</p>
                <p className="text-xs text-slate-400 italic">Think about unit conversions, systematic errors, or how vector angles change resultant force.</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-slate-300 mb-1">2. How would you explain this to a friend?</p>
                <p className="text-xs text-slate-400 italic">Try summarizing the parallelogram law of vectors or calculus in 1D kinematics simply in your own words.</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-slate-300 mb-1">3. Where in real life might you use this?</p>
                <p className="text-xs text-slate-400 italic">Consider navigation, aerospace rocketry, automotive telemetry, or structural engineering.</p>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Breakdown */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800/80 space-y-3">
              <h4 className="text-sm font-bold text-rose-300">Misconceptions Identified During Flight Sim:</h4>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/70 rounded-xl border border-rose-900/40 text-xs">
                      <div className="text-rose-400 font-semibold mb-1">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-300">✓ Scientific Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility Banner */}
          <div className="p-5 rounded-2xl bg-gold-950/40 border border-gold-800/80 text-xs space-y-1.5">
            <span className="text-gold-300 font-bold block">SM-2 Spaced Repetition Schedule:</span>
            <p className="text-slate-300">
              Based on your response latency and accuracy, this ISC Class 11 physics cluster is scheduled for automatic spaced review in{' '}
              <strong className="text-gold-200 font-mono">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </p>
          </div>

          {/* Real World Activity Capstone */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Telemetry Module Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PhysicsSystemsUnitscgsSim;
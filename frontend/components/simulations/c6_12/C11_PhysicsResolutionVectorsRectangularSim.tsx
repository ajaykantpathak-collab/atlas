'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 PHYSICS NODE CONSTANTS ───
const NODE_C11_PHY_011 = 'c11_phy_011';
const NODE_C11_PHY_012 = 'c11_phy_012';
const NODE_C11_PHY_013 = 'c11_phy_013';
const NODE_C11_PHY_014 = 'c11_phy_014';
const NODE_C11_PHY_015 = 'c11_phy_015';
const NODE_C11_PHY_016 = 'c11_phy_016';
const NODE_C11_PHY_017 = 'c11_phy_017';
const NODE_C11_PHY_018 = 'c11_phy_018';
const NODE_C11_PHY_019 = 'c11_phy_019';
const NODE_C11_PHY_020 = 'c11_phy_020';

const ALL_PHYSICS_NODES = [
  NODE_C11_PHY_011,
  NODE_C11_PHY_012,
  NODE_C11_PHY_013,
  NODE_C11_PHY_014,
  NODE_C11_PHY_015,
  NODE_C11_PHY_016,
  NODE_C11_PHY_017,
  NODE_C11_PHY_018,
  NODE_C11_PHY_019,
  NODE_C11_PHY_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Trajectory & Rover Dynamics Lab',
  intro: 'You are the Lead Flight Dynamics Officer at ISRO Telemetry, Tracking and Command Network (ISTRAC) Bengaluru. A lunar ascent module needs real-time vector thrust resolution, precise dot/cross product docking calculations, projectile trajectory corrections, and impulse-controlled landing thruster staging.',
  context: 'Manage forces, angular vectors, momentum transfers, and orbital banking to ensure mission success. Every command relies strictly on ISC Class 11 Classical Vector Mechanics & Laws of Motion.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An ISRO lunar lander thruster fires 1000 N at an angle of 60° with the VERTICAL y-axis. What is the horizontal component (Fx) driving sideways correction?',
  options: [
    'Fx = 1000 × cos(60°) = 500 N',
    'Fx = 1000 × sin(60°) = 866 N',
    'Fx = 1000 × tan(60°) = 1732 N',
    'Fx = 1000 N regardless of angle',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: the component along the axis of reference takes cosine, while the perpendicular axis takes sine! Since the angle is with the vertical (y-axis), Fx = F sin(60°).',
};

// ─── PREDICTION QUESTIONS (Predict-then-Check Pattern) ───
const PREDICTION_QUESTIONS = [
  {
    id: 'pred_01',
    question: 'If you launch two projectiles with identical initial speed u at complementary angles (30° and 60°), what do you predict will happen to their horizontal ranges?',
    options: [
      'The 60° launch will travel twice as far as the 30° launch',
      'Both launches will achieve the exact same horizontal range (R_30° = R_60°)',
      'The 30° launch will have triple the range of the 60° launch',
      'Neither will land because 60° exceeds orbital escape angle',
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 3 (Projectile Simulator). Set angle to 30° and observe the range, then change to 60° and observe how the horizontal landing mark matches exactly.',
    explanation: 'Complementary angles θ and (90° - θ) produce identical ranges because sin(2 × 30°) = sin(60°) = √3/2, and sin(2 × 60°) = sin(120°) = sin(180° - 60°) = √3/2.',
  },
  {
    id: 'pred_02',
    question: 'Predict: As you rotate a pulling force vector from 0° (horizontal) toward 90° (vertical), what happens to its horizontal component Ax?',
    options: [
      'Ax will continuously decrease and drop to exactly 0 N at 90°',
      'Ax will continuously increase until it equals the total magnitude',
      'Ax remains completely unchanged because magnitude is constant',
      'Ax oscillates randomly between positive and negative values',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 1 (Vector Decomposition), drag the Angle slider from 0° to 90° and watch the cyan Ax readout decrease to 0.0 N.',
    explanation: 'Horizontal component Ax = A cos θ. Since cos(0°) = 1 and cos(90°) = 0, Ax drops to zero as the force becomes purely vertical.',
  },
];

// ─── OBSERVATION QUESTIONS (Notice-and-Reflect Pattern) ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    question: 'What do you notice happens to the mechanical work (W = F · S) in Lab 2 when the force vector is oriented at exactly 90° to displacement?',
    options: [
      'Work reaches its peak maximum positive value',
      'Work drops to exactly 0.0 Joules because cos(90°) = 0',
      'Work turns negative and reverses the displacement',
      'Work becomes undefined due to vector divergence',
    ],
    observableOptions: [
      'Work reaches its peak maximum positive value',
      'Work drops to exactly 0.0 Joules because cos(90°) = 0',
      'Work turns negative and reverses the displacement',
      'Work becomes undefined due to vector divergence',
    ],
    correctIndex: 1,
    explanation: 'When force is perpendicular to displacement (θ = 90°), cos(90°) = 0, so W = F · S = F S cos(90°) = 0 J. No mechanical work is performed.',
  },
  {
    id: 'obs_02',
    question: 'Looking at the projectile apex in Lab 3, what do you observe about the vertical velocity (vy) and horizontal velocity (vx)?',
    options: [
      'Both vx and vy drop to zero at the highest apex point',
      'Vertical velocity vy becomes 0 while horizontal velocity vx persists continuously',
      'Horizontal velocity vx reverses direction while vy doubles',
      'Vertical velocity vy reaches maximum speed directed downward',
    ],
    observableOptions: [
      'Both vx and vy drop to zero at the highest apex point',
      'Vertical velocity vy becomes 0 while horizontal velocity vx persists continuously',
      'Horizontal velocity vx reverses direction while vy doubles',
      'Vertical velocity vy reaches maximum speed directed downward',
    ],
    correctIndex: 1,
    explanation: 'At the apex, vertical velocity vy momentarily ceases (vy = 0) as motion transitions from ascent to descent, but horizontal velocity vx = u cos θ remains active and constant.',
  },
];

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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_phy_01',
    nodeId: NODE_C11_PHY_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A force vector A has magnitude 50 N at 30° to the horizontal x-axis. What are its rectangular components (Ax, Ay)?',
    options: [
      'Ax = 43.3 N, Ay = 25.0 N',
      'Ax = 25.0 N, Ay = 43.3 N',
      'Ax = 50.0 N, Ay = 50.0 N',
      'Ax = 35.4 N, Ay = 35.4 N',
    ],
    correctIndex: 0,
    explanation: 'Ax = A cos(30°) = 50 × 0.866 = 43.3 N. Ay = A sin(30°) = 50 × 0.5 = 25.0 N. Recombination check: sqrt(43.3² + 25²) = 50 N.',
    hints: [
      'The reference angle is with the horizontal axis.',
      'Ax uses cosine of 30°: cos(30°) = √3/2 ≈ 0.866.',
      'Ay uses sine of 30°: sin(30°) = 0.5.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_phy_02',
    nodeId: NODE_C11_PHY_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A railway porter at Howrah Station carries a 30 kg suitcase horizontally over 50 m at constant height. What is the work done BY THE UPWARD SUPPORTING FORCE?',
    options: [
      '14,700 J',
      '1,500 J',
      '0 J',
      '-14,700 J',
    ],
    correctIndex: 2,
    explanation: 'Work W = F · S = F S cos(90°) = 0 J. Because the supporting force is vertical and displacement is horizontal, theta = 90°, so no mechanical work is done.',
    hints: [
      'Look at the angle between the upward force vector and the horizontal displacement vector.',
      'The angle is θ = 90° (perpendicular).',
      'cos(90°) = 0, therefore W = F · S = 0 Joules.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_03',
    nodeId: NODE_C11_PHY_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct force components and reaction labels onto the inclined plane diagram.',
    dragItems: [
      { label: 'mg sin θ', targetId: 'target_down_plane' },
      { label: 'mg cos θ', targetId: 'target_into_plane' },
      { label: 'Normal Reaction N', targetId: 'target_normal' },
      { label: 'Weight mg', targetId: 'target_gravity' },
    ],
    correctMapping: {
      target_down_plane: 'mg sin θ',
      target_into_plane: 'mg cos θ',
      target_normal: 'Normal Reaction N',
      target_gravity: 'Weight mg',
    },
    explanation: 'Weight mg acts vertically downward. It resolves into mg sin θ along the incline (accelerating the block) and mg cos θ perpendicular to the incline, balanced by Normal Reaction N.',
    hints: [
      'Weight always pulls straight down toward Earth’s centre.',
      'The normal reaction is always perpendicular (normal) to the surface.',
      'The component causing sliding parallel to the slope is mg sin θ.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_phy_04',
    nodeId: NODE_C11_PHY_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following statements about the vector cross product a × b is TRUE?',
    options: [
      'a × b = b × a (Commutative)',
      'a × b = -(b × a) (Anti-commutative)',
      'a × b is a scalar quantity',
      '|a × b| is maximum when theta = 0°',
    ],
    correctIndex: 1,
    explanation: 'The cross product is anti-commutative: a × b = -(b × a). Swapping vector order reverses the right-hand curl and flips the direction of the resulting axial unit vector n.',
    hints: [
      'Think about what happens to your right thumb when you curl from b to a instead of a to b.',
      'The direction reverses 180°, which gives a negative sign.',
      'Therefore, a × b = -(b × a).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_phy_05',
    nodeId: NODE_C11_PHY_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a DTC Delhi bus suddenly applies brakes, passengers lurch forward. What physical property is responsible?',
    options: [
      'A forward jerk force created by the brake pedal',
      'Inertia of motion (dynamic inertia) maintaining velocity',
      'Gravitational pull increasing instantaneously',
      'Static friction pushing the upper torso forward',
    ],
    correctIndex: 1,
    explanation: 'No forward force acts. Due to dynamic inertia (inertia of motion), the passenger’s upper body continues at the bus’s previous velocity while the bus decelerates.',
    hints: [
      'Is there an actual physical agent pushing the passenger forward?',
      'Newton’s First Law states bodies tend to preserve their uniform velocity.',
      'This resistance to stopping is called dynamic inertia.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_phy_06',
    nodeId: NODE_C11_PHY_018,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A Mumbai local train coach of mass 20,000 kg moves at 15 m/s. Calculate its linear momentum in kg·m/s.',
    correctAnswer: 300000,
    tolerance: 100,
    unit: 'kg·m/s',
    explanation: 'p = m × v = 20,000 kg × 15 m/s = 300,000 kg·m/s (or 3.0 × 10⁵ N·s).',
    hints: [
      'Use the formula p = m × v.',
      'Multiply 20,000 by 15.',
      '20,000 × 15 = 300,000.',
    ],
  },
  {
    id: 'ch_phy_07',
    nodeId: NODE_C11_PHY_017,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Order the derivation steps showing that F = ma is a special case of Newton’s Second Law:',
    sortItems: [
      'Start with the general law: F = dp/dt',
      'Substitute linear momentum definition p = mv into the derivative: F = d(mv)/dt',
      'Apply assumption of constant mass (dm/dt = 0) to factor out m: F = m(dv/dt)',
      'Recognise rate of change of velocity as acceleration: F = ma',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Newton’s fundamental law is F = dp/dt. Substituting p = mv and factoring out constant mass m yields m(dv/dt) = ma.',
    hints: [
      'Always start from the most fundamental law: F = dp/dt.',
      'Next express momentum in terms of mass and velocity.',
      'Pull out m assuming it is constant, leaving dv/dt which equals a.',
    ],
  },
  {
    id: 'ch_phy_08',
    nodeId: NODE_C11_PHY_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Chandrayaan rover is pulled with 100 N at 60° to the horizontal surface. What is the effective horizontal pulling force in Newtons? (cos 60° = 0.5)',
    correctAnswer: 50,
    tolerance: 0.5,
    unit: 'N',
    explanation: 'Fx = F cos(60°) = 100 × 0.5 = 50 N.',
    hints: [
      'Horizontal component Fx = F cos θ.',
      'Substitute F = 100 N and θ = 60°.',
      '100 × 0.5 = 50 N.',
    ],
  },
  {
    id: 'ch_phy_09',
    nodeId: NODE_C11_PHY_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In projectile motion on flat ground, at what launch angle θ is the horizontal range R maximum?',
    options: [
      '30°',
      '45°',
      '60°',
      '90°',
    ],
    correctIndex: 1,
    explanation: 'Range R = (u² sin 2θ)/g. The term sin 2θ reaches its maximum value of 1 when 2θ = 90°, which means θ = 45°. R_max = u²/g.',
    hints: [
      'Look at the range equation: R = (u² sin 2θ) / g.',
      'What angle makes sin(2θ) equal to 1?',
      '2θ = 90° implies θ = 45°.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_phy_10',
    nodeId: NODE_C11_PHY_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A cricket bowler bowls with the same speed u at angles 30° and 60°. What is the ratio of their horizontal ranges R(30°) : R(60°)?',
    options: [
      '1 : 1 (Equal ranges)',
      '1 : √3',
      '√3 : 1',
      '1 : 2',
    ],
    correctIndex: 0,
    explanation: 'Complementary angle property: sin(2 × 30°) = sin(60°) = √3/2, and sin(2 × 60°) = sin(120°) = √3/2. Angles θ and (90° - θ) yield identical horizontal ranges.',
    hints: [
      'Check the sine values: sin(2 × 30°) = sin(60°).',
      'sin(2 × 60°) = sin(120°) = sin(180° - 60°) = sin(60°).',
      'Since sin 2θ is equal, the ranges are exactly equal (1:1).',
    ],
  },
  {
    id: 'ch_phy_11',
    nodeId: NODE_C11_PHY_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A car traverses a circular track of radius 100 m at constant speed 20 m/s. What is its acceleration?',
    options: [
      '0 m/s² because speed is constant',
      '4 m/s² directed radially inward toward the centre',
      '4 m/s² directed along the forward tangent',
      '2 m/s² directed radially outward',
    ],
    correctIndex: 1,
    explanation: 'Although speed is constant, velocity direction changes continuously. Centripetal acceleration a = v²/r = (20²)/100 = 400/100 = 4 m/s², directed radially inward.',
    hints: [
      'Is velocity constant? No, direction is changing continuously!',
      'Use centripetal acceleration formula a = v² / r.',
      'a = 400 / 100 = 4 m/s² directed inward toward the centre.',
    ],
  },
  {
    id: 'ch_phy_12',
    nodeId: NODE_C11_PHY_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A turn on the Mumbai-Pune Expressway has radius r = 250 m and is designed for v = 25 m/s. What is tan θ for ideal banking without friction? (g = 10 m/s²)',
    correctAnswer: 0.25,
    tolerance: 0.02,
    unit: 'tan θ',
    explanation: 'tan θ = v² / (r g) = (25²) / (250 × 10) = 625 / 2500 = 0.25 (θ ≈ 14.04°).',
    hints: [
      'Formula for banking angle: tan θ = v² / (r g).',
      'Compute numerator: 25² = 625.',
      'Compute denominator: 250 × 10 = 2500. Then 625 / 2500 = 0.25.',
    ],
  },
  {
    id: 'ch_phy_13',
    nodeId: NODE_C11_PHY_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why does Virat Kohli pull his hands backward while catching a cricket ball travelling at 30 m/s?',
    options: [
      'To reduce the total impulse and change in momentum',
      'To increase contact time Δt, thereby reducing the average impact force F = Δp/Δt',
      'To decrease the mass of the ball during deceleration',
      'To make the ball bounce back into the air',
    ],
    correctIndex: 1,
    explanation: 'The momentum change Δp = mv is fixed. By drawing hands back, contact time Δt increases. Since F_avg = Δp / Δt, a larger Δt reduces the impact force on the hands.',
    hints: [
      'Can pulling hands back change the required momentum change Δp needed to stop the ball?',
      'No, Δp is fixed. What changes is the stopping time Δt.',
      'From J = F Δt = Δp, increasing Δt reduces F.',
    ],
  },
  {
    id: 'ch_phy_14',
    nodeId: NODE_C11_PHY_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two masses m1 = 3 kg and m2 = 2 kg hang over a frictionless pulley. What is their acceleration in m/s²? (g = 10 m/s²)',
    correctAnswer: 2,
    tolerance: 0.1,
    unit: 'm/s²',
    explanation: 'a = (m1 - m2)g / (m1 + m2) = (3 - 2)(10) / (3 + 2) = 10 / 5 = 2 m/s².',
    hints: [
      'Driving force = (m1 - m2)g.',
      'Total mass being accelerated = m1 + m2.',
      'a = (3 - 2) × 10 / (3 + 2) = 10 / 5 = 2 m/s².',
    ],
  },
  {
    id: 'ch_phy_15',
    nodeId: NODE_C11_PHY_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the work done by force F = (3i + 4j) N producing displacement S = (5i + 2j) m in Joules.',
    correctAnswer: 23,
    tolerance: 0.1,
    unit: 'J',
    explanation: 'W = F · S = Fx Sx + Fy Sy = (3 × 5) + (4 × 2) = 15 + 8 = 23 Joules.',
    hints: [
      'Component dot product formula: a · b = ax bx + ay by.',
      'Multiply x-components: 3 × 5 = 15.',
      'Multiply y-components: 4 × 2 = 8. Sum them: 15 + 8 = 23.',
    ],
  },
  {
    id: 'ch_phy_16',
    nodeId: NODE_C11_PHY_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For position vector r = (2i + 3j) m and force F = (4j + 5k) N, what is the torque vector tau = r × F?',
    options: [
      '15i - 10j + 8k N·m',
      '15i + 10j - 8k N·m',
      '-15i + 10j + 8k N·m',
      '8i + 15j + 10k N·m',
    ],
    correctIndex: 0,
    explanation: 'tau = |i j k; 2 3 0; 0 4 5| = i(3×5 - 0×4) - j(2×5 - 0×0) + k(2×4 - 3×0) = 15i - 10j + 8k N·m.',
    hints: [
      'Set up the 3x3 determinant with i, j, k in the top row.',
      'Row 2: (2, 3, 0). Row 3: (0, 4, 5).',
      'i-term = 15, j-term = -(10) = -10, k-term = 8.',
    ],
  },
  {
    id: 'ch_phy_17',
    nodeId: NODE_C11_PHY_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student argues: "Newton Third Law pairs (action and reaction) are equal and opposite, so they always cancel out and no object can ever accelerate." How do you evaluate this claim?',
    options: [
      'Correct; acceleration only happens when friction breaks Newton’s Third Law.',
      'Incorrect; action and reaction act on TWO DIFFERENT bodies, so they never cancel on a single body.',
      'Correct; all systems are in permanent static equilibrium.',
      'Incorrect; action is always slightly larger than reaction during motion.',
    ],
    correctIndex: 1,
    explanation: 'Action and reaction act on DIFFERENT objects (e.g. exhaust pushes rocket up, rocket pushes exhaust down). Each individual object experiences an unbalanced net force and accelerates!',
    hints: [
      'Think about what object receives the action force versus which receives the reaction force.',
      'Forces only cancel when they act simultaneously on the SAME object.',
      'Action and reaction act on two different bodies.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_phy_18',
    nodeId: NODE_C11_PHY_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 600 kg satellite in deep space expels 2 kg of gas at 300 m/s in 0.5 s. What recoil speed in m/s does the satellite gain?',
    correctAnswer: 1,
    tolerance: 0.05,
    unit: 'm/s',
    explanation: 'Total initial momentum = 0. By conservation: m_sat × v_sat + m_gas × v_gas = 0 => 600 × v_sat = 2 × 300 = 600 => v_sat = 1.0 m/s.',
    hints: [
      'Isolated system in deep space: P_initial = P_final = 0.',
      'Momentum of gas = m_gas × v_gas = 2 × 300 = 600 kg·m/s.',
      'Set m_sat × v_sat = 600 => 600 × v_sat = 600 => v_sat = 1 m/s.',
    ],
  },
  {
    id: 'ch_phy_19',
    nodeId: NODE_C11_PHY_019,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the Impulse-Momentum Theorem equation linking force, time interval, and momentum change:',
    availableParts: ['J', '=', 'F', 'Δt', 'Δp', 'm(v - u)'],
    targetState: 'J = F Δt = Δp = m(v - u)',
    validationHint: 'Connect Impulse (J), Force times time (F Δt), Momentum change (Δp), and mass times velocity change (m(v - u)).',
    explanation: 'The complete impulse-momentum identity states: J = F Δt = Δp = m(v - u), demonstrating that impulse equals the momentum change.',
    hints: [
      'Start with symbol J.',
      'Equate J to F Δt.',
      'Equate F Δt to Δp and then to m(v - u).',
    ],
  },
  {
    id: 'ch_phy_20',
    nodeId: NODE_C11_PHY_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the minimum speed v_top at the highest point of a vertical circle of radius r so that the string does not slacken (T ≥ 0)?',
    options: [
      'v_top = √(g r)',
      'v_top = √(5 g r)',
      'v_top = 2 g r',
      'v_top = 0',
    ],
    correctIndex: 0,
    explanation: 'At the top: T + mg = mv²/r. When string just goes slack (T = 0), mg = mv²/r => v_top = √(g r). At the bottom, critical speed is √(5gr).',
    hints: [
      'At the highest point, both tension T and weight mg point downward toward the centre.',
      'Centripetal equation: T + mg = m v² / r.',
      'Set tension T = 0 for the critical threshold: mg = m v² / r => v = √(g r).',
    ],
  },
  {
    id: 'ch_phy_21',
    nodeId: NODE_C11_PHY_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A projectile is launched with speed 50 m/s at 60° to the horizontal. What is its velocity vector at the APEX (highest point)?',
    options: [
      'v = 0 m/s (Stationary at apex)',
      'v = 25 m/s horizontally in the x-direction',
      'v = 43.3 m/s vertically upward',
      'v = 50 m/s at 30° to horizontal',
    ],
    correctIndex: 1,
    explanation: 'At the apex, only vertical velocity vy = 0. The horizontal velocity vx = u cos(60°) = 50 × 0.5 = 25 m/s remains completely unchanged throughout flight.',
    hints: [
      'Gravity acts ONLY vertically (ay = -g, ax = 0).',
      'At maximum height, vertical velocity vy becomes 0.',
      'Horizontal component vx = u cos θ = 50 cos(60°) = 25 m/s persists.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_phy_22',
    nodeId: NODE_C11_PHY_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A block of mass m rests on a horizontal table. A pulling force P is applied at an upward angle θ to horizontal. What is the normal reaction N?',
    options: [
      'N = mg + P sin θ',
      'N = mg - P sin θ',
      'N = mg cos θ',
      'N = mg',
    ],
    correctIndex: 1,
    explanation: 'Vertical equilibrium requires: ΣFy = N + P sin θ - mg = 0 => N = mg - P sin θ. The upward component of pull relieves surface contact pressure.',
    hints: [
      'Resolve pull P into horizontal P cos θ and vertical upward P sin θ.',
      'Balance all vertical forces: N + P sin θ = mg.',
      'Rearrange for Normal reaction: N = mg - P sin θ.',
    ],
    misconceptionIndex: 0,
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
  nodeId: NODE_C11_PHY_011,
  title: 'Vectors, Projectiles & Laws of Motion Master Sim',
  definition: 'Vector resolution splits a 2D vector into mutually perpendicular components Ax = A cos θ and Ay = A sin θ. Linear dynamics is governed by Newton’s laws where F = dp/dt and J = F Δt = Δp.',
  eli5: 'Think of vectors like walking across a grid: any diagonal walk is just east steps plus north steps. Forces work the same way — splitting them makes complex 2D motion as simple as two 1D equations!',
  misconceptions: [
    {
      misconception: 'The x-component is always A cos θ and y-component is always A sin θ regardless of axis reference.',
      correction: 'Cosine always accompanies the axis from which the angle is measured. If θ is measured with the vertical y-axis, Ay = A cos θ and Ax = A sin θ.',
    },
    {
      misconception: 'The vector cross product is commutative like regular multiplication.',
      correction: 'Cross product is anti-commutative: a × b = -(b × a). Direction reverses according to the right-hand rule.',
    },
    {
      misconception: 'Carrying a heavy load across a horizontal room does positive work.',
      correction: 'Mechanical work W = F · S = FS cos(90°) = 0 J because the upward supporting force is perpendicular to horizontal displacement.',
    },
    {
      misconception: 'Action and reaction forces cancel out and prevent objects from accelerating.',
      correction: 'Action and reaction act on TWO DIFFERENT bodies, so they never cancel out on an isolated body.',
    },
    {
      misconception: 'Velocity is zero at the highest point of a projectile.',
      correction: 'Only the vertical velocity vy is zero at the apex; the horizontal velocity vx = u cos θ remains active and constant.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the horizontal component of 100 N at 30° to horizontal?', options: ['86.6 N', '50 N', '100 N', '0 N'], correctIndex: 0 },
    { question: 'What is the dot product of two perpendicular vectors?', options: ['0', 'ab', '-ab', '1'], correctIndex: 0 },
    { question: 'What is the angle for maximum horizontal projectile range?', options: ['45°', '90°', '30°', '60°'], correctIndex: 0 },
    { question: 'What is centripetal acceleration formula?', options: ['v²/r', 'v/r', 'vr', 'v²/r²'], correctIndex: 0 },
    { question: 'Newton’s First Law defines which property?', options: ['Inertia', 'Momentum', 'Impulse', 'Torque'], correctIndex: 0 },
    { question: 'What is the general form of Newton’s Second Law?', options: ['F = dp/dt', 'F = ma', 'F = mv', 'F = m/a'], correctIndex: 0 },
    { question: 'What is the SI unit of impulse?', options: ['N·s (or kg·m/s)', 'N/s', 'J·s', 'Watts'], correctIndex: 0 },
    { question: 'Why do action-reaction pairs not cancel?', options: ['They act on different bodies', 'They act at different times', 'They are not equal', 'They act in same direction'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master vector resolution, dot/cross products, 2D projectile kinematics, circular dynamics, and Newton’s laws of motion with momentum conservation.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Rectangular Vector Decomposition',
    instruction: 'Drag the angle slider (0° to 90°) and vector magnitude to observe how Ax = A cos θ and Ay = A sin θ dynamically scale on the Cartesian plane.',
    interactionType: 'slider-vector',
    nodeId: NODE_C11_PHY_011,
  },
  {
    title: 'Lab 2: Dot Product & Mechanical Work Projection',
    instruction: 'Adjust the force angle relative to displacement. Notice how work W = F · S drops to exactly ZERO when θ = 90° (orthogonal vectors)!',
    interactionType: 'slider-dot',
    nodeId: NODE_C11_PHY_012,
  },
  {
    title: 'Lab 3: 2D Projectile Trajectory Simulator',
    instruction: 'Change launch angle and velocity. Compare the trajectory of complementary angles (e.g. 30° vs 60°) to verify identical horizontal ranges.',
    interactionType: 'slider-projectile',
    nodeId: NODE_C11_PHY_014,
  },
  {
    title: 'Lab 4: Centripetal Force & Banking Station',
    instruction: 'Adjust car velocity on the turn to see required centripetal acceleration a = v²/r and compute ideal frictionless banking angle tan θ = v²/(rg).',
    interactionType: 'slider-circular',
    nodeId: NODE_C11_PHY_015,
  },
  {
    title: 'Lab 5: Impulse Thruster Staging & Momentum Transfer',
    instruction: 'Vary thruster burn time Δt to see how extending contact duration dampens peak impact force F while preserving total impulse J = Δp.',
    interactionType: 'slider-impulse',
    nodeId: NODE_C11_PHY_019,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Telemetry Flight Director Mission Log',
  description: 'Design a staging sequence for a lunar lander thruster descent. Apply vector decomposition to resolve descent velocity, calculate required deceleration impulse J = F Δt, and evaluate bank angles for orbital re-entry.',
  steps: [
    'Measure descent velocity vector at 45°: resolve into horizontal vx and vertical vy.',
    'Calculate burn time Δt to reduce vy to zero under lunar gravity g = 1.62 m/s².',
    'Compute thruster impulse J = m Δv and verify minimum peak structural force on the chassis.',
    'Log your free-body diagram and submit parameters to ISRO mission control telemetry.',
  ],
};

function C11_PhysicsResolutionVectorsRectangularSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Simulation controls state
  const [vectorMag, setVectorMag] = useState(100);
  const [vectorAngle, setVectorAngle] = useState(30);
  const [dotForce, setDotForce] = useState(50);
  const [dotDisp, setDotDisp] = useState(10);
  const [dotAngle, setDotAngle] = useState(60);
  const [projSpeed, setProjSpeed] = useState(30);
  const [projAngle, setProjAngle] = useState(45);
  const [circSpeed, setCircSpeed] = useState(20);
  const [circRadius, setCircRadius] = useState(50);
  const [impulseForce, setImpulseForce] = useState(200);
  const [impulseTime, setImpulseTime] = useState(0.1);
  const [massObject] = useState(5);

  // Predictions & Observations interactive states
  const [predictionAnswers, setPredictionAnswers] = useState<Record<string, number>>({});
  const [predictionRevealed, setPredictionRevealed] = useState<Record<string, boolean>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number>>({});
  const [observationRevealed, setObservationRevealed] = useState<Record<string, boolean>>({});

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Progressive disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & drop / Construction / Numeric states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Reflections state
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Feedback FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs for BKT, Timers, Canvas
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trajectoryCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const circularCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES FOR REAL-TIME SIMULATIONS ───
  const radAngle = useMemo(() => (vectorAngle * Math.PI) / 180, [vectorAngle]);
  const compAx = useMemo(() => (vectorMag * Math.cos(radAngle)).toFixed(1), [vectorMag, radAngle]);
  const compAy = useMemo(() => (vectorMag * Math.sin(radAngle)).toFixed(1), [vectorMag, radAngle]);

  const dotRad = useMemo(() => (dotAngle * Math.PI) / 180, [dotAngle]);
  const scalarWork = useMemo(() => (dotForce * dotDisp * Math.cos(dotRad)).toFixed(1), [dotForce, dotDisp, dotRad]);

  const projRad = useMemo(() => (projAngle * Math.PI) / 180, [projAngle]);
  const projTimeFlight = useMemo(() => ((2 * projSpeed * Math.sin(projRad)) / 9.8).toFixed(2), [projSpeed, projRad]);
  const projMaxHeight = useMemo(() => ((Math.pow(projSpeed * Math.sin(projRad), 2)) / (2 * 9.8)).toFixed(2), [projSpeed, projRad]);
  const projRange = useMemo(() => ((Math.pow(projSpeed, 2) * Math.sin(2 * projRad)) / 9.8).toFixed(2), [projSpeed, projRad]);

  const centripetalAcc = useMemo(() => (Math.pow(circSpeed, 2) / circRadius).toFixed(2), [circSpeed, circRadius]);
  const bankingTan = useMemo(() => (Math.pow(circSpeed, 2) / (circRadius * 9.8)).toFixed(3), [circSpeed, circRadius]);

  const impulseJ = useMemo(() => (impulseForce * impulseTime).toFixed(1), [impulseForce, impulseTime]);
  const deltaV = useMemo(() => ((impulseForce * impulseTime) / massObject).toFixed(2), [impulseForce, impulseTime, massObject]);

  // Spaced repetition interval calculation based on errors
  const srsIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // Motivational message
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // Adaptive challenges filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
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

  // Canvas animations
  useEffect(() => {
    const canvas = trajectoryCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const g = 9.8;
    const u = projSpeed;
    const th = (projAngle * Math.PI) / 180;
    const totalT = (2 * u * Math.sin(th)) / g;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const scaleX = canvas.width / Math.max(120, parseFloat(projRange) * 1.2);
      const scaleY = canvas.height / Math.max(40, parseFloat(projMaxHeight) * 1.5);

      for (let step = 0; step <= totalT; step += 0.05) {
        const px = u * Math.cos(th) * step * scaleX;
        const py = canvas.height - (u * Math.sin(th) * step - 0.5 * g * step * step) * scaleY;
        if (step === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      t += 0.03;
      if (t > totalT) t = 0;
      const curX = u * Math.cos(th) * t * scaleX;
      const curY = canvas.height - (u * Math.sin(th) * t - 0.5 * g * t * t) * scaleY;

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(curX, curY, 6, 0, Math.PI * 2);
      ctx.fill();

      const curVx = u * Math.cos(th);
      const curVy = u * Math.sin(th) - g * t;

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(curX, curY);
      ctx.lineTo(curX + curVx * 0.8, curY);
      ctx.stroke();

      ctx.strokeStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(curX, curY);
      ctx.lineTo(curX, curY - curVy * 0.8);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [projSpeed, projAngle, projRange, projMaxHeight, phase, currentSlide]);

  useEffect(() => {
    const canvas = circularCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const rPix = Math.min(centerX - 30, circRadius * 1.2);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, rPix, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const omega = circSpeed / circRadius;
      angle += omega * 0.03;
      const posX = centerX + rPix * Math.cos(angle);
      const posY = centerY + rPix * Math.sin(angle);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(posX, posY);
      ctx.lineTo(posX - 40 * Math.cos(angle), posY - 40 * Math.sin(angle));
      ctx.stroke();

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(posX, posY);
      ctx.lineTo(posX - 40 * Math.sin(angle), posY + 40 * Math.cos(angle));
      ctx.stroke();

      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(posX, posY, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [circSpeed, circRadius, phase, currentSlide]);

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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! The y-reference means cosine goes to vertical and sine goes to horizontal!'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handlePredictionSelect = useCallback((predId: string, optIdx: number, correctIdx: number) => {
    setPredictionAnswers((prev) => ({ ...prev, [predId]: optIdx }));
    setPredictionRevealed((prev) => ({ ...prev, [predId]: true }));
    const isCorrect = optIdx === correctIdx;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleObservationSelect = useCallback((obsId: string, optIdx: number, correctIdx: number) => {
    setObservationAnswers((prev) => ({ ...prev, [obsId]: optIdx }));
    setObservationRevealed((prev) => ({ ...prev, [obsId]: true }));
    const isCorrect = optIdx === correctIdx;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive vector mechanics laboratory!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test any parameters without restrictions.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission challenges active. Solve each problem to verify system flight readiness.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_PHYSICS_NODES, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mission completed! You have mastered Class 11 vector mechanics and laws of motion.');
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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis! Excellent physics calculation.');
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
        const arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
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

  const handleVectorAngleChange = useCallback((angle: number) => {
    setVectorAngle(angle);
    audioManager.play('count');
  }, []);

  const handleVectorMagChange = useCallback((mag: number) => {
    setVectorMag(mag);
    audioManager.play('count');
  }, []);

  const handleDotAngleChange = useCallback((angle: number) => {
    setDotAngle(angle);
    audioManager.play('count');
  }, []);

  const handleProjAngleChange = useCallback((angle: number) => {
    setProjAngle(angle);
    audioManager.play('count');
  }, []);

  const handleProjSpeedChange = useCallback((speed: number) => {
    setProjSpeed(speed);
    audioManager.play('count');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="p-3 bg-indigo-900/40 border border-indigo-700/50 rounded-2xl text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">
                ISC Class 11 Physics (Mechanics Core)
              </span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded-full border border-slate-700"
              >
                NEP 2020 Compliant
              </motion.span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty Level */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-blue-950/60 text-blue-400 border-blue-700'
                : 'bg-rose-950/60 text-rose-400 border-rose-700'
            }`}
          >
            Tier: {difficulty.toUpperCase()}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400"
          >
            Phase: {phase.toUpperCase()}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── DISCOVERY PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-3xl border border-indigo-800/60 shadow-xl"
            >
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
                <span>🚀</span> MISSION BRIEFING
              </div>
              <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-slate-950/80 rounded-2xl border border-indigo-900/40 text-xs text-indigo-300"
              >
                📌 {SCENARIO.context}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400">Curiosity Discovery Hook</span>
                <span className="text-xs text-slate-500">Un-graded Pre-Flight Check</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-2xl text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/50 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/50 border border-slate-800 text-slate-500'
                        : 'bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-indigo-400">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold mr-1">✓ </span>
                    )}
                    {discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-rose-400 font-bold mr-1">✗ </span>
                    )}
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`p-4 rounded-2xl text-sm border flex items-center gap-2 ${
                      discoveryCorrect
                        ? 'bg-emerald-950/50 border-emerald-700 text-emerald-300'
                        : 'bg-amber-950/50 border-amber-700 text-amber-300'
                    }`}
                  >
                    <span>{discoveryCorrect ? '✓' : '⚠️'}</span>
                    <span>
                      {discoveryCorrect
                        ? '🎉 Excellent intuition! Angle measured from y-axis makes the x-projection use sine!'
                        : DISCOVERY_QUESTION.hintAfter}
                    </span>
                  </motion.div>

                  <div className="flex justify-end">
                    <motion.button
                      aria-label="Enter Interactive Vector Labs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToExploration}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                    >
                      Enter Interactive Vector Labs →
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── EXPLORATION PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">
                  Interactive Guided Discovery
                </span>
                <h2 className="text-xl font-black text-white">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
                </h2>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                {EXPLORATION_STEPS.map((_, i) => (
                  <motion.button
                    key={i}
                    role="button"
                    aria-label={`Go to lab step ${i + 1}`}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all border-0 ${
                      i === currentSlide ? 'bg-indigo-500 scale-125' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ─── PREDICT-THEN-CHECK SECTION (BRILLIANT PATTERN) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-r from-purple-950/40 to-slate-900 rounded-3xl border border-purple-800/50 space-y-3"
            >
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <span>🔮</span> Step Prediction Check: {PREDICTION_QUESTIONS[currentSlide % PREDICTION_QUESTIONS.length].id}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {PREDICTION_QUESTIONS[currentSlide % PREDICTION_QUESTIONS.length].question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PREDICTION_QUESTIONS[currentSlide % PREDICTION_QUESTIONS.length].options.map((opt, oIdx) => {
                  const predId = PREDICTION_QUESTIONS[currentSlide % PREDICTION_QUESTIONS.length].id;
                  const isAnswered = predictionRevealed[predId];
                  const isChosen = predictionAnswers[predId] === oIdx;
                  const isCorrect = oIdx === PREDICTION_QUESTIONS[currentSlide % PREDICTION_QUESTIONS.length].correctIndex;

                  return (
                    <motion.button
                      key={oIdx}
                      aria-label={`Predict option ${String.fromCharCode(65 + oIdx)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        handlePredictionSelect(
                          predId,
                          oIdx,
                          PREDICTION_QUESTIONS[currentSlide % PREDICTION_QUESTIONS.length].correctIndex
                        )
                      }
                      disabled={isAnswered}
                      className={`text-left p-3 rounded-xl text-xs font-medium transition-all ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-950/70 border border-emerald-500 text-emerald-200 font-bold'
                            : isChosen
                            ? 'bg-rose-950/60 border border-rose-500 text-rose-300'
                            : 'bg-slate-900/60 border border-slate-800 text-slate-500'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-1.5 text-purple-400">{String.fromCharCode(65 + oIdx)}.</span>
                      {isAnswered && isCorrect && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                      {isAnswered && isChosen && !isCorrect && <span className="text-rose-400 font-bold mr-1">✗ </span>}
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              {predictionRevealed[PREDICTION_QUESTIONS[currentSlide % PREDICTION_QUESTIONS.length].id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3 bg-purple-900/30 border border-purple-700/60 rounded-xl text-xs text-purple-200 space-y-1"
                >
                  <p className="font-semibold text-purple-300">
                    🔬 Verification Instruction: {PREDICTION_QUESTIONS[currentSlide % PREDICTION_QUESTIONS.length].verifyInstruction}
                  </p>
                  <p className="text-slate-300">
                    {PREDICTION_QUESTIONS[currentSlide % PREDICTION_QUESTIONS.length].explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-900/60 text-sm text-indigo-300 font-medium"
                >
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </motion.div>

                {/* ─── LAB 1: RECTANGULAR RESOLUTION SIM ─── */}
                {currentSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="lg:col-span-7 bg-slate-950 p-4 rounded-3xl border border-slate-800 flex justify-center"
                    >
                      <svg viewBox="0 0 400 300" className="w-full max-w-[420px]">
                        <line x1="50" y1="250" x2="380" y2="250" stroke="#64748b" strokeWidth="2" />
                        <line x1="50" y1="250" x2="50" y2="20" stroke="#64748b" strokeWidth="2" />
                        <text x="370" y="270" fill="#94a3b8" fontSize="12">
                          +X Axis
                        </text>
                        <text x="20" y="30" fill="#94a3b8" fontSize="12">
                          +Y Axis
                        </text>

                        {(() => {
                          const len = (vectorMag / 150) * 200;
                          const tipX = 50 + len * Math.cos(radAngle);
                          const tipY = 250 - len * Math.sin(radAngle);
                          return (
                            <g>
                              <line
                                x1={tipX}
                                y1={tipY}
                                x2={tipX}
                                y2="250"
                                stroke="#f43f5e"
                                strokeWidth="2"
                                strokeDasharray="4,4"
                              />
                              <line
                                x1={tipX}
                                y1={tipY}
                                x2="50"
                                y2={tipY}
                                stroke="#06b6d4"
                                strokeWidth="2"
                                strokeDasharray="4,4"
                              />
                              <line x1="50" y1="250" x2={tipX} y2="250" stroke="#06b6d4" strokeWidth="4" />
                              <line x1="50" y1="250" x2="50" y2={tipY} stroke="#f43f5e" strokeWidth="4" />
                              <line x1="50" y1="250" x2={tipX} y2={tipY} stroke="#818cf8" strokeWidth="4" />
                              <circle cx={tipX} cy={tipY} r="6" fill="#818cf8" />
                              <path
                                d={`M 90 250 A 40 40 0 0 0 ${50 + 40 * Math.cos(radAngle)} ${
                                  250 - 40 * Math.sin(radAngle)
                                }`}
                                fill="none"
                                stroke="#fbbf24"
                                strokeWidth="2"
                              />
                              <text x="100" y="240" fill="#fbbf24" fontSize="12" fontWeight="bold">
                                θ = {vectorAngle}°
                              </text>
                              <text x={(50 + tipX) / 2} y="275" fill="#06b6d4" fontSize="12" textAnchor="middle">
                                Ax = {compAx} N
                              </text>
                              <text x="25" y={(250 + tipY) / 2} fill="#f43f5e" fontSize="12" textAnchor="end">
                                Ay = {compAy} N
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    </motion.div>

                    <div className="lg:col-span-5 space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                      >
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                            <span>Vector Magnitude (A)</span>
                            <span className="text-indigo-400">{vectorMag} N</span>
                          </div>
                          <input
                            type="range"
                            min={20}
                            max={150}
                            aria-label="Adjust Vector Magnitude"
                            value={vectorMag}
                            onChange={(e) => handleVectorMagChange(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                            <span>Angle with X-Axis (θ)</span>
                            <span className="text-amber-400">{vectorAngle}°</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={90}
                            aria-label="Adjust Angle with X Axis"
                            value={vectorAngle}
                            onChange={(e) => handleVectorAngleChange(Number(e.target.value))}
                            className="w-full accent-amber-500"
                          />
                        </div>
                      </motion.div>

                      <div className="grid grid-cols-2 gap-3">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-2xl"
                        >
                          <span className="text-[10px] text-cyan-400 font-bold uppercase block">X-Component</span>
                          <div className="text-xl font-black text-white">{compAx} N</div>
                          <span className="text-xs text-slate-400">Ax = A cos({vectorAngle}°)</span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-2xl"
                        >
                          <span className="text-[10px] text-rose-400 font-bold uppercase block">Y-Component</span>
                          <div className="text-xl font-black text-white">{compAy} N</div>
                          <span className="text-xs text-slate-400">Ay = A sin({vectorAngle}°)</span>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400"
                      >
                        ⚡ Pythagorean Recombination: √({compAx}² + {compAy}²) = {vectorMag} N
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ─── LAB 2: DOT PRODUCT WORK LAB ─── */}
                {currentSlide === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="lg:col-span-7 bg-slate-950 p-4 rounded-3xl border border-slate-800 flex justify-center"
                    >
                      <svg viewBox="0 0 400 240" className="w-full max-w-[420px]">
                        <line x1="30" y1="190" x2="370" y2="190" stroke="#475569" strokeWidth="2" />
                        <rect x="80" y="140" width="80" height="40" rx="6" fill="#334155" stroke="#64748b" strokeWidth="2" />
                        <circle cx="95" cy="185" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                        <circle cx="145" cy="185" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                        <line x1="120" y1="160" x2="280" y2="160" stroke="#10b981" strokeWidth="3" />
                        <polygon points="280,155 292,160 280,165" fill="#10b981" />
                        <text x="210" y="150" fill="#10b981" fontSize="11" fontWeight="bold">
                          S = {dotDisp} m
                        </text>

                        {(() => {
                          const fx = 120 + 90 * Math.cos(dotRad);
                          const fy = 160 - 90 * Math.sin(dotRad);
                          return (
                            <g>
                              <line x1="120" y1="160" x2={fx} y2={fy} stroke="#f59e0b" strokeWidth="4" />
                              <circle cx={fx} cy={fy} r="5" fill="#f59e0b" />
                              <text x={fx + 10} y={fy} fill="#f59e0b" fontSize="12" fontWeight="bold">
                                F = {dotForce} N
                              </text>
                              <path
                                d={`M 150 160 A 30 30 0 0 0 ${120 + 30 * Math.cos(dotRad)} ${160 - 30 * Math.sin(dotRad)}`}
                                fill="none"
                                stroke="#fbbf24"
                                strokeWidth="2"
                              />
                              <text x="160" y="150" fill="#fbbf24" fontSize="11">
                                θ = {dotAngle}°
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    </motion.div>

                    <div className="lg:col-span-5 space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                      >
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                            <span>Angle θ between F and S</span>
                            <span className="text-amber-400">{dotAngle}°</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={180}
                            aria-label="Adjust Angle between Force and Displacement"
                            value={dotAngle}
                            onChange={(e) => handleDotAngleChange(Number(e.target.value))}
                            className="w-full accent-amber-500"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-950 rounded-2xl border border-indigo-800"
                      >
                        <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold block mb-1">
                          Scalar Dot Product Work:
                        </span>
                        <div className="text-3xl font-black text-white">{scalarWork} Joules</div>
                        <p className="text-xs text-slate-400 mt-2">
                          W = F · S = ({dotForce} N) × ({dotDisp} m) × cos({dotAngle}°)
                        </p>
                        {dotAngle === 90 && (
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="mt-2 p-2 bg-rose-950/60 border border-rose-700 rounded-lg text-xs text-rose-300 font-bold flex items-center gap-1"
                          >
                            <span>⚠️</span>
                            <span>θ = 90° (Perpendicular Force): Work = 0 J (Zero work principle)</span>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ─── LAB 3: 2D PROJECTILE SIMULATOR ─── */}
                {currentSlide === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="bg-slate-950 p-2 rounded-3xl border border-slate-800 overflow-hidden"
                    >
                      <canvas ref={trajectoryCanvasRef} width={700} height={240} className="w-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-slate-950 rounded-2xl border border-slate-800"
                      >
                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                          <span>Launch Angle (θ)</span>
                          <span className="text-amber-400">{projAngle}°</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={85}
                          aria-label="Adjust Projectile Launch Angle"
                          value={projAngle}
                          onChange={(e) => handleProjAngleChange(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-slate-950 rounded-2xl border border-slate-800"
                      >
                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                          <span>Launch Speed (u)</span>
                          <span className="text-cyan-400">{projSpeed} m/s</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={50}
                          aria-label="Adjust Projectile Launch Speed"
                          value={projSpeed}
                          onChange={(e) => handleProjSpeedChange(Number(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-indigo-950/50 border border-indigo-800 rounded-2xl text-xs space-y-1"
                      >
                        <div className="flex justify-between">
                          <span className="text-slate-400">Time of Flight (T):</span>
                          <span className="font-bold text-white">{projTimeFlight} s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Max Height (H):</span>
                          <span className="font-bold text-white">{projMaxHeight} m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Horizontal Range (R):</span>
                          <span className="font-bold text-amber-400">{projRange} m</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ─── LAB 4: CIRCULAR DYNAMICS ─── */}
                {currentSlide === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="lg:col-span-7 bg-slate-950 p-2 rounded-3xl border border-slate-800"
                    >
                      <canvas ref={circularCanvasRef} width={400} height={240} className="w-full" />
                    </motion.div>

                    <div className="lg:col-span-5 space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                      >
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                            <span>Linear Speed (v)</span>
                            <span className="text-emerald-400">{circSpeed} m/s</span>
                          </div>
                          <input
                            type="range"
                            min={5}
                            max={40}
                            aria-label="Adjust Linear Speed"
                            value={circSpeed}
                            onChange={(e) => setCircSpeed(Number(e.target.value))}
                            className="w-full accent-emerald-500"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                            <span>Radius (r)</span>
                            <span className="text-indigo-400">{circRadius} m</span>
                          </div>
                          <input
                            type="range"
                            min={20}
                            max={100}
                            aria-label="Adjust Track Radius"
                            value={circRadius}
                            onChange={(e) => setCircRadius(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>
                      </motion.div>

                      <div className="grid grid-cols-2 gap-3">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="p-4 bg-amber-950/40 border border-amber-800 rounded-2xl"
                        >
                          <span className="text-[10px] text-amber-400 font-bold uppercase block">Centripetal Acc</span>
                          <div className="text-xl font-black text-white">{centripetalAcc} m/s²</div>
                          <span className="text-[11px] text-slate-400">a = v² / r</span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="p-4 bg-indigo-950/40 border border-indigo-800 rounded-2xl"
                        >
                          <span className="text-[10px] text-indigo-400 font-bold uppercase block">Ideal Banking</span>
                          <div className="text-xl font-black text-white">{bankingTan}</div>
                          <span className="text-[11px] text-slate-400">tan θ = v²/(rg)</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── LAB 5: IMPULSE & MOMENTUM STAGING ─── */}
                {currentSlide === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="lg:col-span-7 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4"
                    >
                      <h4 className="text-sm font-bold text-indigo-400">Force-Time Impact Profile</h4>
                      <svg viewBox="0 0 360 160" className="w-full">
                        <line x1="30" y1="130" x2="340" y2="130" stroke="#64748b" strokeWidth="2" />
                        <line x1="30" y1="130" x2="30" y2="20" stroke="#64748b" strokeWidth="2" />
                        <text x="330" y="145" fill="#94a3b8" fontSize="10">
                          t (s)
                        </text>
                        <text x="10" y="25" fill="#94a3b8" fontSize="10">
                          F (N)
                        </text>
                        <rect
                          x="50"
                          y={130 - Math.min(100, impulseForce * 0.25)}
                          width={Math.min(250, impulseTime * 400)}
                          height={Math.min(100, impulseForce * 0.25)}
                          fill="#6366f1"
                          fillOpacity="0.3"
                          stroke="#818cf8"
                          strokeWidth="2"
                        />
                        <text
                          x={50 + Math.min(250, impulseTime * 400) / 2}
                          y={130 - Math.min(100, impulseForce * 0.25) / 2}
                          fill="#e0e7ff"
                          fontSize="11"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          Area = Impulse J
                        </text>
                      </svg>
                    </motion.div>

                    <div className="lg:col-span-5 space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                      >
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                            <span>Impact Duration Δt</span>
                            <span className="text-cyan-400">{impulseTime.toFixed(2)} s</span>
                          </div>
                          <input
                            type="range"
                            min={0.02}
                            max={0.5}
                            step={0.02}
                            aria-label="Adjust Impact Duration"
                            value={impulseTime}
                            onChange={(e) => setImpulseTime(Number(e.target.value))}
                            className="w-full accent-cyan-500"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl space-y-2"
                      >
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">Impulse J = F Δt:</span>
                          <span className="font-bold text-white">{impulseJ} N·s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">Velocity Gain Δv = J/m:</span>
                          <span className="font-bold text-emerald-400">+{deltaV} m/s</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* ─── OBSERVATION CHECK (WHAT DO YOU NOTICE PATTERN) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-r from-cyan-950/40 to-slate-900 rounded-3xl border border-cyan-800/50 space-y-3"
            >
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <span>🔍</span> Observation Check: What do you notice? ({OBSERVATION_QUESTIONS[currentSlide % OBSERVATION_QUESTIONS.length].id})
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {OBSERVATION_QUESTIONS[currentSlide % OBSERVATION_QUESTIONS.length].question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OBSERVATION_QUESTIONS[currentSlide % OBSERVATION_QUESTIONS.length].options.map((opt, oIdx) => {
                  const obsId = OBSERVATION_QUESTIONS[currentSlide % OBSERVATION_QUESTIONS.length].id;
                  const isAnswered = observationRevealed[obsId];
                  const isChosen = observationAnswers[obsId] === oIdx;
                  const isCorrect = oIdx === OBSERVATION_QUESTIONS[currentSlide % OBSERVATION_QUESTIONS.length].correctIndex;

                  return (
                    <motion.button
                      key={oIdx}
                      aria-label={`Observation option ${String.fromCharCode(65 + oIdx)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        handleObservationSelect(
                          obsId,
                          oIdx,
                          OBSERVATION_QUESTIONS[currentSlide % OBSERVATION_QUESTIONS.length].correctIndex
                        )
                      }
                      disabled={isAnswered}
                      className={`text-left p-3 rounded-xl text-xs font-medium transition-all ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-950/70 border border-emerald-500 text-emerald-200 font-bold'
                            : isChosen
                            ? 'bg-rose-950/60 border border-rose-500 text-rose-300'
                            : 'bg-slate-900/60 border border-slate-800 text-slate-500'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-1.5 text-cyan-400">{String.fromCharCode(65 + oIdx)}.</span>
                      {isAnswered && isCorrect && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                      {isAnswered && isChosen && !isCorrect && <span className="text-rose-400 font-bold mr-1">✗ </span>}
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              {observationRevealed[OBSERVATION_QUESTIONS[currentSlide % OBSERVATION_QUESTIONS.length].id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3 bg-cyan-900/30 border border-cyan-700/60 rounded-xl text-xs text-cyan-200"
                >
                  <p className="font-semibold text-cyan-300">💡 Key Observation Insight:</p>
                  <p className="text-slate-300">
                    {OBSERVATION_QUESTIONS[currentSlide % OBSERVATION_QUESTIONS.length].explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                aria-label="Previous Lab Step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-sm font-semibold"
              >
                ← Previous Lab
              </motion.button>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Next Lab Step"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => s + 1)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Open Free Sandbox"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
                >
                  Open Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SANDBOX PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-2"
            >
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                <span>🛠️</span> FREE FLIGHT SANDBOX SIMULATOR
              </div>
              <h3 className="text-xl font-bold text-white">Full Parameter Space Playground</h3>
              <p className="text-sm text-slate-400">
                Manipulate velocity, angles, and components with zero test grading. Explore corner cases before formal testing.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4"
              >
                <h4 className="text-sm font-bold text-indigo-400">Real-Time Trajectory Live Graph</h4>
                <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800">
                  <canvas ref={trajectoryCanvasRef} width={400} height={180} className="w-full" />
                </div>
                <div className="flex gap-4 text-xs text-slate-300">
                  <span>Range: {projRange} m</span>
                  <span>Max H: {projMaxHeight} m</span>
                  <span>T: {projTimeFlight} s</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4"
              >
                <h4 className="text-sm font-bold text-amber-400">Vector Resolution Live Visualiser</h4>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-cyan-400 font-bold">Ax = {compAx} N</div>
                    <div className="text-sm text-rose-400 font-bold">Ay = {compAy} N</div>
                    <div className="text-xs text-slate-500 mt-1">Magnitude = {vectorMag} N</div>
                  </div>
                  <div className="space-y-2 w-1/2">
                    <input
                      type="range"
                      min={0}
                      max={90}
                      aria-label="Sandbox Angle Adjustment"
                      value={vectorAngle}
                      onChange={(e) => handleVectorAngleChange(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <div className="text-right text-xs text-amber-400">θ = {vectorAngle}°</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-end pt-4">
              <motion.button
                aria-label="Proceed to Mastery Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30"
              >
                Ready for Mastery Challenges! →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            {/* Progress & Header */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-indigo-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-slate-400">
                  Score: {scoreBreakdown.correct} / {scoreBreakdown.total}
                </span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Challenge Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-6 rounded-3xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                  : 'bg-slate-900/90 border-slate-800 text-slate-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-800 border border-slate-700 text-slate-300"
                >
                  Competency: {challenge.competencyLevel}
                </motion.span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">{challenge.question}</h3>

              {/* MCQ Type */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
                challenge.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {challenge.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation}
                        className={`text-left p-4 rounded-2xl text-sm font-medium transition-all ${
                          showExplanation && i === challenge.correctIndex
                            ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200'
                        }`}
                      >
                        <span className="inline-block w-6 font-bold text-indigo-400">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {showExplanation && i === challenge.correctIndex && (
                          <span className="text-emerald-400 font-bold mr-1">✓ </span>
                        )}
                        {showExplanation && i !== challenge.correctIndex && (
                          <span className="text-slate-500 mr-1">✗ </span>
                        )}
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* Drag Label Type */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        aria-label={`Draggable label: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl cursor-grab text-white text-xs font-bold shadow-md"
                      >
                        ⠿ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-2 gap-3">
                    {[
                      { id: 'target_down_plane', title: 'Component Down Slope' },
                      { id: 'target_into_plane', title: 'Component Into Incline' },
                      { id: 'target_normal', title: 'Surface Reaction' },
                      { id: 'target_gravity', title: 'True Gravitational Pull' },
                    ].map((tgt) => (
                      <motion.div
                        key={tgt.id}
                        whileHover={{ scale: 1.01 }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(tgt.id)}
                        className="p-3 bg-slate-900 rounded-xl border border-dashed border-slate-700 text-center"
                      >
                        <span className="text-[10px] text-slate-500 block mb-1">{tgt.title}</span>
                        <div className="font-bold text-amber-300 text-xs">
                          {droppedLabels[tgt.id] || '[ Drop Label Here ]'}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Verify Dragged Labels"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold"
                  >
                    Verify Dragged Labels
                  </motion.button>
                </div>
              )}

              {/* Drag Sort Type */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      role="button"
                      aria-label={`Sort item ${dIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(dIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const f = parseInt(draggedItem || '0');
                        handleSortMove(f, dIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3 border border-slate-700"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center text-[10px]">
                        {dIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}

                  <motion.button
                    aria-label="Verify Ordered Steps"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold"
                  >
                    Verify Ordered Steps
                  </motion.button>
                </div>
              )}

              {/* Numeric Type */}
              {challenge.type === 'numeric' && (
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    aria-label="Enter numeric answer"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numeric value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  />
                  <span className="text-slate-400 text-sm font-bold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit Numeric Answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              )}

              {/* Construct Type */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add formula part: ${part}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-indigo-300 font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center"
                  >
                    {constructParts.map((part, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-indigo-900/60 border border-indigo-700 rounded-lg text-xs font-bold text-white flex items-center gap-1"
                      >
                        {part}
                        <motion.button
                          aria-label={`Remove ${part}`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts((prev) => prev.filter((_, k) => k !== idx))}
                          className="text-rose-400 font-black ml-1"
                        >
                          ×
                        </motion.button>
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.button
                    aria-label="Check Constructed Formula"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold"
                  >
                    Check Construction
                  </motion.button>
                </div>
              )}

              {/* Progressive Disclosure Step Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3"
                >
                  <div className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                    Step-by-Step ISC Physics Walkthrough:
                  </div>
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">{sIdx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="flex justify-between items-center pt-2">
                    {revealedSteps <
                      challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                      <motion.button
                        aria-label="Show next explanation step"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-4 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-bold"
                      >
                        Show Next Step →
                      </motion.button>
                    )}

                    {revealedSteps >=
                      challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                      <motion.button
                        aria-label="Proceed to next challenge"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="ml-auto px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── COMPLETION PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            {/* MOTIVATIONAL FEEDBACK HEADER */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700/60 text-center space-y-3"
            >
              <div className="text-4xl">🎖️</div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-2xl sm:text-3xl font-black text-amber-400"
              >
                {motivationalFeedback}
              </motion.div>
              <h2 className="text-2xl font-black text-white">Mission Readiness Certified!</h2>
              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                You have resolved vectors, computed scalar & vector products, analysed parabolic trajectories, and applied Newton’s laws of motion with momentum conservation.
              </p>
              <div className="flex justify-center gap-6 pt-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-slate-900 rounded-2xl border border-slate-800"
                >
                  <span className="text-xs text-slate-400 block">Final Score</span>
                  <span className="text-2xl font-black text-emerald-400">
                    {Math.max(0, 100 - errors * 5)}%
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-slate-900 rounded-2xl border border-slate-800"
                >
                  <span className="text-xs text-slate-400 block">Mastery Tier</span>
                  <span className="text-2xl font-black text-indigo-400 uppercase">{masteryLevel}</span>
                </motion.div>
              </div>
            </motion.div>

            {/* ─── SPACED REPETITION SCHEDULE VISIBILITY CARD ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 rounded-3xl border border-indigo-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Spaced Repetition Schedule (SuperMemo SM-2)
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {errors === 0
                    ? 'Review in 7 days (Optimal Mastery Retention)'
                    : errors <= 3
                    ? 'Review in 3 days (Reinforce Mechanics Patterns)'
                    : 'Review in 1 day (Critical Concept Consolidation)'}
                </div>
                <p className="text-xs text-slate-400">
                  Calculated based on {errors} recorded attempt error(s) and {scoreBreakdown.correct}/{scoreBreakdown.total} challenge accuracy. Reviewing on schedule maximizes long-term neural recall.
                </p>
              </div>
              <div className="px-5 py-3 bg-indigo-900/60 border border-indigo-600/60 rounded-2xl text-center self-stretch sm:self-auto flex sm:flex-col justify-between items-center">
                <span className="text-[10px] text-indigo-300 font-bold uppercase block">SRS Interval</span>
                <span className="text-2xl font-black text-amber-300">+{srsIntervalDays}d</span>
              </div>
            </motion.div>

            {/* REFLECTION SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <span>💭</span> POST-MISSION REFLECTION
              </div>
              <p className="text-xs text-slate-400">Consolidate your learning by answering these metacognitive questions:</p>

              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.01 }} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    1. What was the most surprising thing you learned?
                  </label>
                  <input
                    type="text"
                    aria-label="Reflection: What was the most surprising thing you learned?"
                    value={reflection1}
                    onChange={(e) => setReflection1(e.target.value)}
                    placeholder="e.g. Work is zero when moving horizontally with vertical weight..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    2. How would you explain vector resolution to a friend?
                  </label>
                  <input
                    type="text"
                    aria-label="Reflection: How would you explain this to a friend?"
                    value={reflection2}
                    onChange={(e) => setReflection2(e.target.value)}
                    placeholder="e.g. Decomposing any diagonal walk into independent east and north steps..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    3. Where in real life might you use this?
                  </label>
                  <input
                    type="text"
                    aria-label="Reflection: Where in real life might you use this?"
                    value={reflection3}
                    onChange={(e) => setReflection3(e.target.value)}
                    placeholder="e.g. Banking highway curves, rocket booster staging, catching cricket balls safely..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Misconceptions Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  Personalised Misconception Diagnostics
                </h3>
                {hitMisconceptions.map((mIdx, i) => {
                  const item = misconceptions[mIdx];
                  if (!item) return null;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1"
                    >
                      <p className="text-xs text-rose-300 font-bold">✗ {item.misconception}</p>
                      <p className="text-xs text-emerald-300">✓ {item.correction}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Real World Activity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-indigo-950/40 rounded-3xl border border-indigo-800 space-y-3"
            >
              <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 3 }}
                    className="text-xs text-slate-400 flex items-start gap-2"
                  >
                    <span className="text-indigo-400 font-bold">{i + 1}.</span> {st}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ISC Mechanics Module Cleared!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C11_PhysicsResolutionVectorsRectangularSim;
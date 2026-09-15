'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── CONSTANT NODE IDS ───
const NODE_C11_PHY_031 = 'c11_phy_031';
const NODE_C11_PHY_032 = 'c11_phy_032';
const NODE_C11_PHY_033 = 'c11_phy_033';
const NODE_C11_PHY_034 = 'c11_phy_034';
const NODE_C11_PHY_035 = 'c11_phy_035';
const NODE_C11_PHY_036 = 'c11_phy_036';
const NODE_C11_PHY_037 = 'c11_phy_037';
const NODE_C11_PHY_038 = 'c11_phy_038';
const NODE_C11_PHY_039 = 'c11_phy_039';
const NODE_C11_PHY_040 = 'c11_phy_040';

const ALL_NODE_IDS = [
  NODE_C11_PHY_031,
  NODE_C11_PHY_032,
  NODE_C11_PHY_033,
  NODE_C11_PHY_034,
  NODE_C11_PHY_035,
  NODE_C11_PHY_036,
  NODE_C11_PHY_037,
  NODE_C11_PHY_038,
  NODE_C11_PHY_039,
  NODE_C11_PHY_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The ISRO Orbital Salvage & Dynamics Testbed',
  intro: 'You are the Chief Dynamics Officer at the UR Rao Satellite Centre. A deep-space retrieval capsule is navigating docking impacts, mechanical energy exchange, power-thrust balancing, centre of mass shifts, and rotational momentum conservation before final atmospheric capture.',
  context: 'Every system parameter—from collision elasticity and motor power to rotational inertia and spin rate—governs whether the mission succeeds or drifts into chaos.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An orbital repair rover fires its thruster to catch a spinning space capsule. When an astronaut extends robotic arms outward to catch it, what happens to her rotational speed if no outside torque acts?',
  options: [
    'Her spin rate increases because her mass is spread wider',
    'Her spin rate decreases because her moment of inertia increases while angular momentum is conserved',
    'Her spin rate stays exactly identical because mechanical mass cannot vanish',
    'Her kinetic energy doubles while her angular momentum drops to zero',
  ],
  correctIndex: 1,
  hintAfter: 'Think about figure skaters pulling in or spreading their arms! Let us discover the exact physics together.',
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

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: c11_phy_031 (Recall)
  {
    id: 'ch_001',
    nodeId: NODE_C11_PHY_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under what strict condition does the law of conservation of mechanical energy (E = KE + PE = constant) hold true?',
    options: [
      'It holds in all physical processes without any restriction',
      'Only when the net work done on the system by non-conservative forces is zero (only conservative forces do work)',
      'Only when kinetic energy equals zero at every instant',
      'Only during perfectly inelastic collisions',
    ],
    correctIndex: 1,
    explanation: 'From the work-energy theorem, W_net = Delta KE. If only conservative forces act, W_c = -Delta PE, so Delta KE + Delta PE = 0, giving E = KE + PE = constant. If non-conservative forces like friction act, mechanical energy is dissipated as heat (Delta E = W_nc).',
    hints: [
      'Think about what happens to mechanical energy when friction or air drag is present.',
      'Recall the relationship between conservative forces and potential energy (Wc = -DeltaPE).',
      'Mechanical energy is conserved specifically when only conservative forces perform work on the system.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation: c11_phy_032 (Recall)
  {
    id: 'ch_002',
    nodeId: NODE_C11_PHY_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following physical quantities are conserved simultaneously during a perfectly elastic collision?',
    options: [
      'Only total linear momentum, while kinetic energy decreases',
      'Both total linear momentum and total kinetic energy',
      'Only total kinetic energy, while momentum changes sign',
      'Total potential energy only',
    ],
    correctIndex: 1,
    explanation: 'An elastic collision is defined by the simultaneous conservation of both total linear momentum (m1u1 + m2u2 = m1v1 + m2v2) and total kinetic energy (1/2 m1 u1^2 + 1/2 m2 u2^2 = 1/2 m1 v1^2 + 1/2 m2 v2^2).',
    hints: [
      'Elastic means no kinetic energy is converted into heat, sound, or permanent deformation.',
      'Linear momentum is always conserved in isolated systems with no external impulsive force.',
      'Therefore, both momentum and kinetic energy remain constant.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation: c11_phy_033 (Understanding)
  {
    id: 'ch_003',
    nodeId: NODE_C11_PHY_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Two space probes of equal mass m collide in deep space and stick together. If probe 1 had speed u and probe 2 was stationary, what is their combined final speed?',
    options: ['u', 'u / 2', '2u', 'u / 4'],
    correctIndex: 1,
    explanation: 'By conservation of linear momentum: m*u + m*0 = (m + m)*v_final => mu = 2m*v_final => v_final = u/2. Kinetic energy is partially converted into internal deformation and heat.',
    hints: [
      'Apply momentum conservation: Initial momentum = Final momentum.',
      'Initial momentum = m * u. Combined final mass = 2m.',
      'v = (m * u) / (2m) = u / 2.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation: c11_phy_034 (Recall)
  {
    id: 'ch_004',
    nodeId: NODE_C11_PHY_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the correct SI dimensional formula for mechanical power P = dW/dt = F . v?',
    options: ['[M L^2 T^-2]', '[M L^2 T^-3]', '[M L T^-2]', '[M L^3 T^-3]'],
    correctIndex: 1,
    explanation: 'Work has dimensions [M L^2 T^-2]. Dividing by time [T] yields [M L^2 T^-3]. Alternatively, Force [M L T^-2] multiplied by velocity [L T^-1] gives [M L^2 T^-3].',
    hints: [
      'Power is rate of doing work: Work / Time.',
      'Dimensions of Work = Force * Displacement = [M L T^-2] * [L] = [M L^2 T^-2].',
      'Divide [M L^2 T^-2] by [T] to get [M L^2 T^-3].',
    ],
  },
  // 5. Foundation: c11_phy_035 (Understanding)
  {
    id: 'ch_005',
    nodeId: NODE_C11_PHY_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Two particles of masses 1 kg and 3 kg are located at x = 0 m and x = 8 m respectively. Where is their centre of mass located?',
    options: ['x = 4 m', 'x = 6 m', 'x = 2 m', 'x = 5.33 m'],
    correctIndex: 1,
    explanation: 'x_cm = (m1*x1 + m2*x2) / (m1 + m2) = (1*0 + 3*8) / (1 + 3) = 24 / 4 = 6 m. Notice it lies closer to the heavier 3 kg mass.',
    hints: [
      'Use the mass-weighted average formula: x_cm = (m1*x1 + m2*x2) / (m1 + m2).',
      'Numerator = (1)(0) + (3)(8) = 24.',
      'Denominator = 1 + 3 = 4. 24 / 4 = 6 m.',
    ],
  },
  // 6. Foundation: c11_phy_036 (Recall)
  {
    id: 'ch_006',
    nodeId: NODE_C11_PHY_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For which of the following symmetrical bodies does the centre of mass lie entirely outside its solid material in empty space?',
    options: ['A uniform solid sphere', 'A thin uniform circular ring', 'A solid rectangular wooden block', 'A solid iron cylinder'],
    correctIndex: 1,
    explanation: 'A uniform circular ring has its centre of mass located at its geometric centre, which is completely empty space containing no physical matter.',
    hints: [
      'Think about where the geometric centre of symmetry lies.',
      'Does a ring or donut have material at its very centre?',
      'The centre of mass of a thin uniform ring is in the hole at its centre.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Foundation: c11_phy_037 (Recall)
  {
    id: 'ch_007',
    nodeId: NODE_C11_PHY_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If a force F is applied directly along the position vector r (pointing towards or away from the pivot, theta = 0 deg or 180 deg), what is the resulting torque?',
    options: ['Maximum torque tau = r * F', 'Zero torque (tau = 0 N m)', 'tau = r * F / 2', 'tau = F / r'],
    correctIndex: 1,
    explanation: 'Torque magnitude is tau = r * F * sin(theta). When theta = 0 deg or 180 deg, sin(theta) = 0, so tau = 0 N m. This is why pushing directly into a door hinge cannot turn the door.',
    hints: [
      'Remember tau = r x F, with magnitude r*F*sin(theta).',
      'What is sin(0 deg) or sin(180 deg)?',
      'Zero! A radial force produces no rotational turning effect.',
    ],
  },
  // 8. Foundation: c11_phy_040 (Recall)
  {
    id: 'ch_008',
    nodeId: NODE_C11_PHY_040,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the formula for the moment of inertia of a uniform solid sphere of mass M and radius R about any diameter passing through its centre?',
    options: ['(1/2) M R^2', '(2/5) M R^2', '(2/3) M R^2', 'M R^2'],
    correctIndex: 1,
    explanation: 'For a uniform solid sphere about a diameter, I = (2/5) M R^2. For a thin hollow spherical shell, I = (2/3) M R^2 because mass is concentrated farther out at radius R.',
    hints: [
      'Solid sphere has mass distributed throughout from r = 0 to R.',
      'The coefficient is 0.4 (2/5) for solid, while hollow shell is ~0.67 (2/3).',
      'Formula is I = (2/5) M R^2.',
    ],
  },
  // 9. Standard: c11_phy_031 (Application)
  {
    id: 'ch_009',
    nodeId: NODE_C11_PHY_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 2 kg satellite tool drops from rest from a height of 45 m in a vacuum test facility (g = 10 m/s^2). Using conservation of mechanical energy, find its impact speed.',
    correctAnswer: 30,
    tolerance: 0.5,
    unit: 'm/s',
    explanation: 'Total initial PE = mgh = 2 * 10 * 45 = 900 J. At the ground, all PE converts to KE: (1/2) m v^2 = 900 J => v = sqrt(2gh) = sqrt(2 * 10 * 45) = sqrt(900) = 30 m/s.',
    hints: [
      'Set initial potential energy (mgh) equal to final kinetic energy (1/2 m v^2).',
      'Notice mass m cancels out: v = sqrt(2 * g * h).',
      'Compute sqrt(2 * 10 * 45) = sqrt(900) = 30 m/s.',
    ],
  },
  // 10. Standard: c11_phy_032 (Application)
  {
    id: 'ch_010',
    nodeId: NODE_C11_PHY_032,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 2 kg rover probe moving at 6 m/s collides head-on elastically with a stationary 4 kg docking module (u2 = 0). What are the final velocities v1 and v2?',
    options: [
      'v1 = -2 m/s (rebounds), v2 = +4 m/s',
      'v1 = +2 m/s, v2 = +2 m/s',
      'v1 = 0 m/s, v2 = +6 m/s',
      'v1 = -6 m/s, v2 = +3 m/s',
    ],
    correctIndex: 0,
    explanation: 'Using 1D elastic equations: v1 = (m1 - m2)u1 / (m1 + m2) = (2 - 4)(6) / (2 + 4) = (-2)(6)/6 = -2 m/s. v2 = 2*m1*u1 / (m1 + m2) = 2(2)(6)/6 = 24/6 = 4 m/s. Momentum check: 2(6) = 12 = 2(-2) + 4(4) = -4 + 16 = 12 kg m/s.',
    hints: [
      'Formula for incoming mass: v1 = (m1 - m2)u1 / (m1 + m2).',
      'Substitute m1 = 2, m2 = 4, u1 = 6: (2 - 4)*6 / 6 = -2 m/s.',
      'Formula for target mass: v2 = 2*m1*u1 / (m1 + m2) = 2(2)(6) / 6 = 4 m/s.',
    ],
  },
  // 11. Standard: c11_phy_034 (Application)
  {
    id: 'ch_011',
    nodeId: NODE_C11_PHY_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An electric locomotive pulls a freight train with a steady driving force of 40,000 N at a constant cruising speed of 25 m/s. What mechanical power is delivered by the locomotive in kilowatts (kW)?',
    correctAnswer: 1000,
    tolerance: 5,
    unit: 'kW',
    explanation: 'Instantaneous power P = F . v = 40,000 N * 25 m/s = 1,000,000 W = 1000 kW (or 1 MW). At constant speed, this power balances the resisting frictional forces.',
    hints: [
      'Use the dot-product power formula: P = F * v when force and velocity are parallel.',
      'Calculate P in Watts: 40,000 * 25 = 1,000,000 W.',
      'Convert Watts to kW by dividing by 1000: 1,000,000 / 1000 = 1000 kW.',
    ],
  },
  // 12. Standard: c11_phy_037 (Analysis)
  {
    id: 'ch_012',
    nodeId: NODE_C11_PHY_037,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A technician applies a 50 N force to a wrench of length 0.4 m at an angle of 30 degrees to the handle. Calculate the magnitude of torque produced about the bolt.',
    correctAnswer: 10,
    tolerance: 0.2,
    unit: 'N m',
    explanation: 'Torque magnitude is tau = r * F * sin(theta) = 0.4 m * 50 N * sin(30 deg) = 20 * 0.5 = 10 N m. Only the perpendicular component (50 * sin 30 deg = 25 N) creates rotation.',
    hints: [
      'Formula: tau = r * F * sin(theta).',
      'sin(30 deg) = 0.5.',
      'tau = 0.4 * 50 * 0.5 = 10 N m.',
    ],
  },
  // 13. Standard: c11_phy_038 (Understanding)
  {
    id: 'ch_013',
    nodeId: NODE_C11_PHY_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Starting from L = r x p, differentiating with respect to time yields dL/dt = (dr/dt x p) + (r x dp/dt). Why does the first term (dr/dt x p) equal zero?',
    options: [
      'Because velocity dr/dt = v is parallel to linear momentum p = mv, and the cross product of parallel vectors is zero',
      'Because position vector r is always constant in time',
      'Because linear momentum p is always perpendicular to velocity',
      'Because force F is zero for all rotating systems',
    ],
    correctIndex: 0,
    explanation: 'dr/dt = v. Since p = mv, we have v x (mv) = m(v x v). The cross product of any vector with itself or any parallel vector is identically zero (|v||v| sin 0 = 0). Thus dL/dt = r x (dp/dt) = r x F = tau.',
    hints: [
      'What is dr/dt physically? It is the velocity vector v.',
      'What is p? It is mass times velocity (m * v).',
      'The angle between v and mv is 0 degrees, and sin(0 deg) = 0.',
    ],
  },
  // 14. Standard: c11_phy_039 (Application)
  {
    id: 'ch_014',
    nodeId: NODE_C11_PHY_039,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A figure skater spinning on frictionless ice has an initial moment of inertia I1 = 4.0 kg m^2 and spins at omega1 = 3.0 rad/s. She pulls her arms in so that I2 = 1.5 kg m^2. What is her new angular speed omega2 in rad/s?',
    correctAnswer: 8.0,
    tolerance: 0.1,
    unit: 'rad/s',
    explanation: 'Since no external torque acts about the vertical axis, angular momentum is conserved: I1 * omega1 = I2 * omega2 => (4.0 kg m^2)(3.0 rad/s) = (1.5 kg m^2)(omega2) => omega2 = 12.0 / 1.5 = 8.0 rad/s.',
    hints: [
      'Apply conservation of angular momentum: I1 * omega1 = I2 * omega2.',
      'Initial angular momentum L = 4.0 * 3.0 = 12.0 kg m^2/s.',
      'Solve for omega2: 12.0 / 1.5 = 8.0 rad/s.',
    ],
  },
  // 15. Standard: c11_phy_040 (Drag-Sort)
  {
    id: 'ch_015',
    nodeId: NODE_C11_PHY_040,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange these 4 symmetrical objects of identical mass M and outer radius R in order of INCREASING moment of inertia (lowest I to highest I):',
    sortItems: [
      'Solid Sphere (I = 2/5 M R^2 = 0.40 MR^2)',
      'Uniform Disc / Solid Cylinder (I = 1/2 M R^2 = 0.50 MR^2)',
      'Hollow Spherical Shell (I = 2/3 M R^2 = 0.67 MR^2)',
      'Thin Circular Ring / Hollow Cylinder (I = 1.0 MR^2)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Comparing coefficients of MR^2: Solid Sphere (0.40) < Disc (0.50) < Hollow Shell (0.67) < Thin Ring (1.00). Objects with mass concentrated farther from the axis have larger moments of inertia.',
    hints: [
      'Look at the numerical fractions multiplying MR^2.',
      '2/5 = 0.40, 1/2 = 0.50, 2/3 = 0.67, 1/1 = 1.00.',
      'The solid sphere has the lowest rotational inertia; the thin ring has the highest.',
    ],
  },
  // 16. Standard: c11_phy_036 (Drag-Label)
  {
    id: 'ch_016',
    nodeId: NODE_C11_PHY_036,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the geometric shape with its exact Centre of Mass (COM) coordinates or formula:',
    dragItems: [
      { label: 'Midpoint (x = L/2)', targetId: 'target_rod' },
      { label: 'Geometric Centre (Empty Space)', targetId: 'target_ring' },
      { label: 'Centroid (h/3 from base)', targetId: 'target_triangle' },
      { label: 'Center (4R / 3pi from base)', targetId: 'target_semidisc' },
    ],
    correctMapping: {
      target_rod: 'Midpoint (x = L/2)',
      target_ring: 'Geometric Centre (Empty Space)',
      target_triangle: 'Centroid (h/3 from base)',
      target_semidisc: 'Center (4R / 3pi from base)',
    },
    explanation: 'A uniform rod has its COM at L/2 by integral x dm / M. A ring has its COM at its central empty hole by symmetry. A triangular lamina sits at centroid h/3, and a semicircular disc sits at 4R/(3*pi).',
    hints: [
      'A uniform rod of length L balances right at its midpoint L/2.',
      'A ring has no mass at its centre, yet its COM sits there in empty space.',
      'A triangle balances at 1/3 of its height from the base.',
    ],
  },
  // 17. Advanced: c11_phy_031 (Evaluation)
  {
    id: 'ch_017',
    nodeId: NODE_C11_PHY_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "A car skids to a complete halt on asphalt. Total energy is destroyed, proving conservation of energy is violated." Evaluate this claim from fundamental thermodynamics and mechanics.',
    options: [
      'The claim is correct; friction permanently destroys all kinetic energy from the universe',
      'The claim is incorrect; total energy is universally conserved, but mechanical energy (KE + PE) is non-conserved because friction (non-conservative) converts KE into microscopic thermal energy (heat and sound)',
      'The claim is correct because potential energy increased by an equal amount',
      'The claim is incorrect because the car gained momentum during skidding',
    ],
    correctIndex: 1,
    explanation: 'The universal principle of conservation of energy states energy cannot be created or destroyed. However, the conservation of MECHANICAL energy (Delta E = 0) applies ONLY to conservative forces. Friction does negative work W_nc = -KE_initial, dissipating mechanical energy into thermal vibration of molecules (heat in brake pads and road) and acoustic sound waves.',
    hints: [
      'Distinguish between Universal Energy Conservation and Mechanical Energy Conservation.',
      'What happens to the temperature of the tyres and road surface when a vehicle skids?',
      'Mechanical energy is converted into heat; total energy of the universe remains constant.',
    ],
    misconceptionIndex: 0,
  },
  // 18. Advanced: c11_phy_033 (Application - Kinetic Energy Loss)
  {
    id: 'ch_018',
    nodeId: NODE_C11_PHY_033,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 4 kg module moving at 10 m/s collides with a stationary 6 kg module and they lock together in a perfectly inelastic collision. Calculate the kinetic energy lost (in Joules) during the impact.',
    correctAnswer: 120,
    tolerance: 1.0,
    unit: 'J',
    explanation: 'Initial KE = (1/2)(4)(10^2) = 200 J. Common final velocity v = (4*10 + 6*0)/(4 + 6) = 40/10 = 4 m/s. Final KE = (1/2)(4 + 6)(4^2) = (1/2)(10)(16) = 80 J. Delta KE lost = 200 J - 80 J = 120 J. Alternatively, Delta KE = (1/2)[(m1*m2)/(m1+m2)]*(u1 - u2)^2 = (1/2)(24/10)(10^2) = 1.2 * 100 = 120 J.',
    hints: [
      'Find the common velocity v after collision using momentum conservation (m1*u1 = (m1+m2)*v).',
      'Calculate Initial KE = 1/2 * 4 * 10^2 = 200 J.',
      'Calculate Final KE = 1/2 * 10 * 4^2 = 80 J, then find the difference: 200 - 80 = 120 J.',
    ],
    misconceptionIndex: 2,
  },
  // 19. Advanced: c11_phy_039 (Analysis - Rotational Kinetic Energy Change)
  {
    id: 'ch_019',
    nodeId: NODE_C11_PHY_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When a spinning ballerina pulls her arms closer to her body, her moment of inertia halves (I2 = I1 / 2). If no external torque acts, what happens to her rotational kinetic energy K = 1/2 I omega^2?',
    options: [
      'Rotational kinetic energy remains exactly unchanged',
      'Rotational kinetic energy doubles (K2 = 2 * K1)',
      'Rotational kinetic energy halves (K2 = K1 / 2)',
      'Rotational kinetic energy becomes zero',
    ],
    correctIndex: 1,
    explanation: 'Since L = I * omega is constant, omega doubles (omega2 = 2 * omega1). Rotational KE is K = L^2 / (2I). When I is halved, K becomes L^2 / (2*(I/2)) = 2 * (L^2 / (2I)) = 2 * K1. The extra kinetic energy is supplied by the muscular internal work done by the ballerina in pulling her arms inward against the centrifugal inertia.',
    hints: [
      'Express rotational kinetic energy in terms of angular momentum: K = L^2 / (2 * I).',
      'Angular momentum L is strictly constant because external torque is zero.',
      'If the denominator I is halved, the whole fraction K doubles!',
    ],
    misconceptionIndex: 4,
  },
  // 20. Advanced: c11_phy_035 (Evaluation - Internal Forces on COM)
  {
    id: 'ch_020',
    nodeId: NODE_C11_PHY_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Two astronauts of masses 60 kg and 90 kg are connected by a light rope on frictionless ice. The 60 kg astronaut pulls the rope with 150 N. How does the Centre of Mass of the two-astronaut system move?',
    options: [
      'The COM accelerates towards the 60 kg astronaut',
      'The COM accelerates towards the 90 kg astronaut',
      'The COM remains completely stationary (zero acceleration) because the pulling tension is an internal action-reaction pair',
      'The COM accelerates at a rate of 150 / 150 = 1.0 m/s^2 forward',
    ],
    correctIndex: 2,
    explanation: 'By Newton\'s third law, the rope tension exerts equal and opposite internal forces on the two astronauts (+150 N and -150 N). Summing external forces: F_ext = 0 => M * a_cm = 0 => a_cm = 0. Since the system started from rest, the COM position stays completely fixed in space while the two astronauts glide toward each other and meet at the COM.',
    hints: [
      'Are the forces between the astronauts internal or external to the two-person system?',
      'Internal forces always sum to zero vectorially (Newton\'s 3rd Law: action = -reaction).',
      'F_ext = M * a_cm. With zero external force, a_cm = 0.',
    ],
    misconceptionIndex: 3,
  },
  // 21. Advanced: c11_phy_040 (Numeric - Radius of Gyration)
  {
    id: 'ch_021',
    nodeId: NODE_C11_PHY_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A uniform circular disc of mass 8 kg and radius 0.6 m rotates about its central axis (I = 1/2 M R^2). Calculate its radius of gyration k in metres (round to 3 decimal places or use k = R / sqrt(2)).',
    correctAnswer: 0.424,
    tolerance: 0.01,
    unit: 'm',
    explanation: 'By definition, I = M * k^2 => (1/2) M R^2 = M * k^2 => k = R / sqrt(2) = 0.6 / 1.4142 ~= 0.424 m. The radius of gyration is the effective root-mean-square distance of the mass distribution from the rotation axis.',
    hints: [
      'Use the formula: k = sqrt(I / M).',
      'For a disc, I = (1/2) M R^2, so k = sqrt( (1/2) R^2 ) = R / sqrt(2).',
      'Compute 0.6 / 1.4142 ~= 0.424 m.',
    ],
  },
  // 22. Advanced: c11_phy_038 (Construct/Equation)
  {
    id: 'ch_022',
    nodeId: NODE_C11_PHY_038,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the rotational analogue of Newton\'s Second Law (Force = rate of change of linear momentum) using the available vector parts:',
    availableParts: ['tau', '=', 'dL/dt', 'F', 'dp/dt', 'r x F', 'I', 'alpha'],
    targetState: 'tau = dL/dt',
    validationHint: 'Select the rotational torque vector, the equals sign, and the time derivative of angular momentum.',
    explanation: 'Just as linear force equals the time derivative of linear momentum (F = dp/dt), net external torque equals the time rate of change of angular momentum (tau = dL/dt). When tau = 0, L remains strictly constant.',
    hints: [
      'What is the rotational analogue of force F? It is torque tau.',
      'What is the rotational analogue of linear momentum p? It is angular momentum L.',
      'Assemble: tau = dL/dt.',
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
  nodeId: NODE_C11_PHY_031,
  title: 'Conservation of Mechanical Energy & Rotational Mechanics',
  definition: 'In an isolated conservative system, total mechanical energy (E = KE + PE) remains constant. When extended to rotational and multi-particle systems, linear momentum (P = M v_cm) and angular momentum (L = r x p = I omega) are conserved in the absence of net external forces and torques.',
  eli5: 'Think of energy as money you can swap between a "speed pocket" (KE) and a "height/stretch pocket" (PE) without losing a rupee. In collisions, momentum always balances, and when you spin like a skater, pulling in your mass makes you spin faster to keep your total spin quantity constant!',
  misconceptions: [
    {
      misconception: 'Mechanical energy is always conserved in every collision and real-world process.',
      correction: 'Mechanical energy is conserved only when all active forces are conservative. Friction and inelastic deformation convert mechanical energy into heat and sound.',
    },
    {
      misconception: 'In an elastic collision, kinetic energy can change while momentum stays constant.',
      correction: 'An elastic collision is explicitly defined by the simultaneous conservation of BOTH linear momentum and kinetic energy.',
    },
    {
      misconception: 'In a perfectly inelastic collision, all kinetic energy is destroyed.',
      correction: 'Only the kinetic energy of relative motion is dissipated; the combined mass still moves at v = (m1u1 + m2u2)/(m1 + m2) and retains translational KE.',
    },
    {
      misconception: 'Internal forces between interacting particles can accelerate their Centre of Mass.',
      correction: 'Internal forces are equal and opposite by Newton\'s 3rd Law and sum to zero. Only net external forces can accelerate the Centre of Mass (F_ext = M a_cm).',
    },
    {
      misconception: 'When a spinning skater pulls arms in, rotational kinetic energy is conserved.',
      correction: 'Angular momentum L is conserved, but rotational KE (1/2 I omega^2 = L^2 / (2I)) increases because the skater does positive muscular work pulling inward.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the condition for conservation of mechanical energy?', options: ['Only conservative forces do work', 'Velocity is zero', 'Friction is maximum', 'Momentum is zero'], correctIndex: 0 },
    { question: 'What is conserved in a 1D elastic collision?', options: ['Momentum only', 'Kinetic energy only', 'Both momentum and kinetic energy', 'Neither'], correctIndex: 2 },
    { question: 'What happens to two objects in a perfectly inelastic collision?', options: ['They bounce elastically', 'They stick together', 'They stop completely', 'They gain kinetic energy'], correctIndex: 1 },
    { question: 'Mechanical power delivered by a force F moving at velocity v is:', options: ['F / v', 'F . v', '1/2 F v^2', 'F + v'], correctIndex: 1 },
    { question: 'Where is the Centre of Mass of a uniform thin rod located?', options: ['At one end', 'At its geometric midpoint L/2', 'At 1/3 L', 'Outside the rod'], correctIndex: 1 },
    { question: 'Magnitude of torque produced by force F at distance r is:', options: ['r F cos(theta)', 'r F sin(theta)', 'r / F', 'F / r'], correctIndex: 1 },
    { question: 'If net external torque on a system is zero, which quantity is conserved?', options: ['Linear momentum only', 'Angular momentum L', 'Kinetic energy only', 'Potential energy'], correctIndex: 1 },
    { question: 'Moment of inertia of a uniform thin ring of mass M and radius R is:', options: ['1/2 M R^2', 'M R^2', '2/5 M R^2', '2/3 M R^2'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery of conservation of mechanical energy, elastic/inelastic collisions, power, centre of mass, torque, angular momentum, and moment of inertia.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Mechanical Energy Interchange (Rollercoaster / Pendulum)',
    instruction: 'Drag the drop height slider and observe how Potential Energy (PE = mgh) and Kinetic Energy (KE = 1/2 mv^2) trade off while total E remains constant.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PHY_031,
  },
  {
    title: '2. 1D Collision Simulator (Elastic vs Inelastic)',
    instruction: 'Adjust the collision elasticity and mass ratio. Watch momentum and kinetic energy bars update in real time before and after impact.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PHY_032,
  },
  {
    title: '3. Centre of Mass of Two Particles',
    instruction: 'Move Mass 1 and Mass 2 along the track or change their masses. Notice how the COM (red marker) shifts towards the heavier body.',
    interactionType: 'drag-position',
    nodeId: NODE_C11_PHY_035,
  },
  {
    title: '4. Torque & Moment Arm (tau = r x F)',
    instruction: 'Change the wrench length and application angle. See how the perpendicular lever arm (r sin theta) controls the turning power.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PHY_037,
  },
  {
    title: '5. Spinning Skater & Angular Momentum (I1 omega1 = I2 omega2)',
    instruction: 'Change the radius of the extended weights. Watch the spin rate skyrocket as the moment of inertia drops, preserving L!',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PHY_039,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a 1 kg ball at 10 m/s hits a stationary 1 kg ball head-on elastically, what will happen to the first ball?',
    options: [
      'It will stop dead (v1 = 0 m/s) and transfer all speed to ball 2 (v2 = 10 m/s)',
      'Both balls will move forward together at 5 m/s',
      'The first ball will bounce straight backward at 10 m/s',
      'Both balls will explode with kinetic energy',
    ],
    correctIndex: 0,
    verifyInstruction: 'Set Mass 1 = 1 kg, Mass 2 = 1 kg in the collision simulator below with 100% elasticity and test it!',
    nodeId: NODE_C11_PHY_032,
  },
  {
    question: 'Predict: When an orbiting space satellite halves its moment of inertia by folding solar panels inward, what happens to its spin rate?',
    options: [
      'It spins at half the speed',
      'It spins twice as fast (angular velocity doubles)',
      'It stops spinning completely',
      'Its spin rate quadruples',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the mass radius slider from 1.0 m to 0.707 m (halving I = mr^2) in Step 5 to verify the 2x spin increase!',
    nodeId: NODE_C11_PHY_039,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What pattern do you notice about total mechanical energy (green bar) as the pendulum/rollercoaster swings from peak height to the bottom?',
    observableOptions: [
      'Total energy stays completely flat and constant; only the split between PE (blue) and KE (amber) changes',
      'Total energy drops to zero at the bottom',
      'Potential energy increases at the bottom',
      'Kinetic energy is constant everywhere',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_PHY_031,
  },
  {
    question: 'In the torque interactive, when you adjust the force angle theta to 90 degrees (perpendicular to handle), what do you observe?',
    observableOptions: [
      'Torque reaches its absolute maximum value for that radius and force',
      'Torque drops to zero',
      'The lever arm vanishes',
      'The wrench breaks without turning',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_PHY_037,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Aerospace Dynamics Mission Brief',
  description: 'Apply the 10 conservation principles to design an ISRO satellite docking manoeuvre: specify collision dampers to convert relative KE into controlled heat, balance the centre of mass during fuel expenditure, and fire reaction wheels using conservation of angular momentum.',
  steps: [
    'Model the 500 kg docking probe approaching the 2000 kg orbital lab at 0.4 m/s.',
    'Calculate the total kinetic energy that must be absorbed by hydraulic dampers during an inelastic latch.',
    'Calculate the new combined Centre of Mass relative to the lab origin.',
    'Determine the reaction wheel moment of inertia needed to slew the combined satellite through 90 degrees in 12 seconds.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_PhysicsConservationMechanicalEnergySim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);

  // Predict-Then-Check & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox Sliders
  const [heightDrop, setHeightDrop] = useState(20); // 0 to 50 m
  const [ballMass, setBallMass] = useState(2); // kg
  const [colMass1, setColMass1] = useState(2); // kg
  const [colMass2, setColMass2] = useState(4); // kg
  const [colU1] = useState(6); // m/s
  const [elasticity, setElasticity] = useState(1.0); // 0 (inelastic) to 1.0 (elastic)
  const [comM1, setComM1] = useState(2); // kg
  const [comM2, setComM2] = useState(6); // kg
  const [comX1, setComX1] = useState(2); // m
  const [comX2, setComX2] = useState(10); // m
  const [wrenchRadius, setWrenchRadius] = useState(0.4); // m
  const [wrenchForce, setWrenchForce] = useState(50); // N
  const [wrenchAngle, setWrenchAngle] = useState(60); // deg
  const [skaterMassArm, setSkaterMassArm] = useState(0.8); // m radius
  const [skaterBodyI] = useState(1.5); // kg m^2
  const [skaterInitialOmega] = useState(2.0); // rad/s
  const [activeTab, setActiveTab] = useState<'sim' | 'math' | 'realworld'>('sim');

  // Reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Challenge Input & Interactive States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual Effects & Feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Animation States
  const [, setSimTime] = useState(0);

  // BKT & Inactivity Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const collisionCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subject Configuration
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C11_PHY_031);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED ADAPTIVE DIFFICULTY ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard'
      : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME CALCULATIONS (DERIVED VALUES) ───
  const energyPE = useMemo(() => ballMass * 9.8 * heightDrop, [ballMass, heightDrop]);
  const energySpeed = useMemo(() => Math.sqrt(2 * 9.8 * heightDrop), [heightDrop]);
  const energyKE = useMemo(() => 0.5 * ballMass * energySpeed * energySpeed, [ballMass, energySpeed]);
  const energyTotal = useMemo(() => energyPE + energyKE, [energyPE, energyKE]);

  // 1D Collision
  const collisionResults = useMemo(() => {
    const v1 = ((colMass1 - elasticity * colMass2) * colU1) / (colMass1 + colMass2);
    const v2 = ((1 + elasticity) * colMass1 * colU1) / (colMass1 + colMass2);
    const initKE = 0.5 * colMass1 * colU1 * colU1;
    const finalKE = 0.5 * colMass1 * v1 * v1 + 0.5 * colMass2 * v2 * v2;
    const lostKE = Math.max(0, initKE - finalKE);
    const initP = colMass1 * colU1;
    const finalP = colMass1 * v1 + colMass2 * v2;
    return { v1, v2, initKE, finalKE, lostKE, initP, finalP };
  }, [colMass1, colMass2, colU1, elasticity]);

  // Centre of Mass
  const calculatedCOM = useMemo(() => {
    const totalMass = comM1 + comM2;
    const xcm = (comM1 * comX1 + comM2 * comX2) / totalMass;
    return { xcm, totalMass };
  }, [comM1, comM2, comX1, comX2]);

  // Torque
  const calculatedTorque = useMemo(() => {
    const rad = (wrenchAngle * Math.PI) / 180;
    const leverArm = wrenchRadius * Math.sin(rad);
    const tau = wrenchRadius * wrenchForce * Math.sin(rad);
    return { leverArm, tau };
  }, [wrenchRadius, wrenchForce, wrenchAngle]);

  // Skater / Angular Momentum
  const calculatedSkater = useMemo(() => {
    const armDumbbellMass = 2.0;
    const I1 = skaterBodyI + armDumbbellMass * 0.8 * 0.8;
    const I2 = skaterBodyI + armDumbbellMass * skaterMassArm * skaterMassArm;
    const L = I1 * skaterInitialOmega;
    const newOmega = L / I2;
    const initRotKE = 0.5 * I1 * skaterInitialOmega * skaterInitialOmega;
    const finalRotKE = 0.5 * I2 * newOmega * newOmega;
    const workDone = finalRotKE - initRotKE;
    return { I1, I2, L, newOmega, initRotKE, finalRotKE, workDone };
  }, [skaterBodyI, skaterMassArm, skaterInitialOmega]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete step-by-step physical solution together.');
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
    setSelectedDiscoveryOpt(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant intuition! Angular momentum is conserved, so spreading mass slows spin.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive dynamics testbed. Manipulate each simulation to discover the conservation laws!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase begins! Let us test your analytical mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation to see physics in action.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect ? 'Excellent observation! The visual graph proves total energy is invariant.' : 'Look closely at the combined height of the energy bars.'
    );
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
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
      const arr = prev.length === (challenge.sortItems?.length || 0) ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
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
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Mission accomplished! You have mastered ISC Class 11 Mechanical & Rotational Dynamics.');
  }, [errors, onComplete]);

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
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('success');
        audioManager.play('sparkle');
        setSparklePos({ x: 400, y: 300 });
        setShowSparkle(true);
        setShowConfetti(true);
        setShowExplanation(true);
        speechManager.speak('Outstanding! That is physically exact.');

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
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
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 5000);
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
    const currentOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems || []).map((_, i) => i);
    handleAnswer(currentOrder);
  }, [sortArrangement, challenge, handleAnswer]);

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

  // ─── CANVAS ANIMATION EFFECT: Energy & Pendulum Waveform ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      setSimTime(t);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Pendulum / Energy Simulation
      const pivotX = canvas.width / 2;
      const pivotY = 30;
      const length = 120;
      const maxAngle = Math.min(Math.PI / 2.2, Math.sqrt((2 * 9.8 * heightDrop) / (9.8 * 5)) * 0.4);
      const currentAngle = maxAngle * Math.cos(t * 2.5);

      const bobX = pivotX + length * Math.sin(currentAngle);
      const bobY = pivotY + length * Math.cos(currentAngle);

      // Rod
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Pivot
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Bob
      const currentKEPercent = Math.pow(Math.sin(currentAngle) / (Math.sin(maxAngle) || 1), 2);
      ctx.fillStyle = currentAngle > 0 ? '#f59e0b' : '#38bdf8';
      ctx.shadowColor = '#6366f1';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(bobX, bobY, 14 + ballMass * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Energy Bar graph overlay on canvas
      const barX = 20;
      const barY = 160;
      const barW = 30;
      const maxBarH = 100;
      const peH = (1 - currentKEPercent) * maxBarH;
      const keH = currentKEPercent * maxBarH;

      // PE bar
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(barX, barY - peH, barW, peH);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('PE', barX + 6, barY + 12);

      // KE bar
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(barX + 45, barY - keH, barW, keH);
      ctx.fillText('KE', barX + 51, barY + 12);

      // Total E bar
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(barX + 90, barY - maxBarH, barW, maxBarH);
      ctx.fillText('E_tot', barX + 91, barY + 12);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [heightDrop, ballMass]);

  // ─── CANVAS ANIMATION EFFECT: Collision Physics ───
  useEffect(() => {
    const canvas = collisionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Track line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(20, 100);
      ctx.lineTo(canvas.width - 20, 100);
      ctx.stroke();

      const phaseCycle = (t % 3) / 3;
      let x1 = 60;
      let x2 = 220;

      if (phaseCycle < 0.45) {
        const p = phaseCycle / 0.45;
        x1 = 60 + p * (140 - 60);
        x2 = 220;
      } else if (phaseCycle < 0.55) {
        x1 = 140;
        x2 = 180;
      } else {
        const p = (phaseCycle - 0.55) / 0.45;
        x1 = 140 + collisionResults.v1 * p * 15;
        x2 = 180 + collisionResults.v2 * p * 15;
      }

      // Ball 1
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(x1, 80, 12 + colMass1 * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px sans-serif';
      ctx.fillText(`m1:${colMass1}kg`, x1 - 18, 55);

      // Ball 2
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(x2, 80, 12 + colMass2 * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`m2:${colMass2}kg`, x2 - 18, 55);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [colMass1, colMass2, colU1, elasticity, collisionResults]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER / NAVIGATION ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-xl shadow-lg shadow-indigo-500/20"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-indigo-400 font-semibold tracking-wide uppercase">
              ISC Class 11 Physics &bull; 10 Integrated Mechanics Nodes
            </p>
          </div>
        </div>

        {/* Phase Pill Indicators */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p, idx) => (
            <motion.div
              key={p}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {idx + 1}. {p}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="my-6 space-y-6"
        >
          {/* Narrative Hero Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900/80 to-purple-950/40 border border-indigo-500/30 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
              Live Mission Simulation Hook
            </span>
            <h2 className="text-2xl font-black text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-sm md:text-base text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic font-mono bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Curiosity Probe */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <h3 className="text-base font-bold text-amber-300">Curiosity Discovery Check (Ungraded)</h3>
            </div>
            <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`text-left p-4 rounded-2xl text-sm font-semibold transition-all border ${
                    selectedDiscoveryOpt === i
                      ? discoveryCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? 'Spot on! Angular momentum L = I omega stays fixed, so spreading mass lowers spin rate.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 text-sm shrink-0"
                >
                  Enter Interactive Laboratories &rarr;
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="my-6 space-y-6"
        >
          {/* Step Selector & Progress */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Guided Discovery Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex items-center gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentSlide(i);
                    audioManager.play('tap');
                  }}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === i ? 'w-8 bg-indigo-500' : 'w-2.5 bg-slate-700'
                  }`}
                  aria-label={`Jump to step ${i + 1}`}
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
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl"
            >
              <div>
                <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 font-medium mt-1">
                  &bull; {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── SLIDE 0: MECHANICAL ENERGY CONSERVATION ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <canvas ref={canvasRef} width={450} height={200} className="w-full max-w-md rounded-xl bg-slate-900/50" />
                    <p className="text-xs text-slate-400 mt-2 font-mono">
                      Real-time Oscillation: Dynamic interchange of PE &harr; KE
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">Drop Height (h):</span>
                        <span className="text-indigo-400 font-mono">{heightDrop} m</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={50}
                        value={heightDrop}
                        onChange={e => {
                          setHeightDrop(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="Adjust drop height"
                      />

                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">Mass (m):</span>
                        <span className="text-indigo-400 font-mono">{ballMass} kg</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={ballMass}
                        onChange={e => {
                          setBallMass(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="Adjust object mass"
                      />
                    </div>

                    {/* Live Physical Readout Grid */}
                    <div className="grid grid-cols-3 gap-2 text-center font-mono">
                      <div className="p-3 bg-sky-950/40 border border-sky-800/50 rounded-xl">
                        <span className="text-[10px] text-sky-400 font-bold block">PE = mgh</span>
                        <span className="text-sm font-black text-sky-200">{energyPE.toFixed(1)} J</span>
                      </div>
                      <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-xl">
                        <span className="text-[10px] text-amber-400 font-bold block">KE = 1/2mv^2</span>
                        <span className="text-sm font-black text-amber-200">{energyKE.toFixed(1)} J</span>
                      </div>
                      <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl">
                        <span className="text-[10px] text-emerald-400 font-bold block">E = PE + KE</span>
                        <span className="text-sm font-black text-emerald-200">{energyTotal.toFixed(1)} J</span>
                      </div>
                    </div>

                    {/* Observation Question Card */}
                    <div className="p-4 bg-indigo-950/40 border border-indigo-800/60 rounded-2xl space-y-2">
                      <p className="text-xs font-bold text-indigo-300">Scientific Observation Query:</p>
                      <p className="text-xs text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5 pt-1">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleObservation(idx)}
                            className={`w-full text-left text-xs p-2 rounded-xl transition-all border ${
                              observationIndex === idx
                                ? idx === OBSERVATION_QUESTIONS[0].correctIndex
                                  ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                                  : 'bg-rose-900/60 border-rose-500 text-rose-200'
                                : 'bg-slate-900 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: ELASTIC VS INELASTIC COLLISIONS ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <canvas ref={collisionCanvasRef} width={450} height={140} className="w-full max-w-md rounded-xl bg-slate-900/50" />

                    {!predictionMade ? (
                      <div className="w-full mt-4 p-4 rounded-2xl bg-indigo-950/50 border border-indigo-800/70 space-y-2">
                        <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                          &#9889; Predict-Then-Verify Challenge:
                        </span>
                        <p className="text-xs text-white">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left text-xs p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono flex justify-between">
                        <span>Prediction checked! Velocity swap occurs for m1 = m2 in 1D elastic collisions.</span>
                        <span className="text-emerald-400 font-bold">&#10003; Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">Elasticity Coefficient (e):</span>
                        <span className="text-indigo-400 font-mono">
                          {elasticity === 1 ? '1.0 (Elastic)' : elasticity === 0 ? '0.0 (Inelastic)' : elasticity.toFixed(2)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={elasticity}
                        onChange={e => {
                          setElasticity(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="Adjust collision elasticity"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 font-bold">Mass 1 (m1): {colMass1} kg</label>
                          <input
                            type="range"
                            min={1}
                            max={6}
                            value={colMass1}
                            onChange={e => setColMass1(Number(e.target.value))}
                            className="w-full accent-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-bold">Mass 2 (m2): {colMass2} kg</label>
                          <input
                            type="range"
                            min={1}
                            max={6}
                            value={colMass2}
                            onChange={e => setColMass2(Number(e.target.value))}
                            className="w-full accent-pink-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Final Velocity v1:</span>
                        <span className={collisionResults.v1 < 0 ? 'text-rose-400 font-bold' : 'text-blue-400 font-bold'}>
                          {collisionResults.v1.toFixed(2)} m/s
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Final Velocity v2:</span>
                        <span className="text-emerald-400 font-bold">{collisionResults.v2.toFixed(2)} m/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Kinetic Energy Lost (&Delta;KE):</span>
                        <span className="text-amber-400 font-bold">{collisionResults.lostKE.toFixed(2)} J</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-800 pt-1">
                        <span className="text-slate-400">Total Momentum (P):</span>
                        <span className="text-indigo-300 font-bold">{collisionResults.initP.toFixed(1)} kg m/s</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: CENTRE OF MASS (2-PARTICLE SYSTEM) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 relative">
                    <svg viewBox="0 0 600 120" className="w-full h-32">
                      <line x1="40" y1="60" x2="560" y2="60" stroke="#475569" strokeWidth="4" />
                      {[0, 2, 4, 6, 8, 10, 12].map((x, i) => {
                        const px = 50 + (x / 12) * 500;
                        return (
                          <g key={i}>
                            <line x1={px} y1="50" x2={px} y2="70" stroke="#64748b" strokeWidth="2" />
                            <text x={px} y="85" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                              {x}m
                            </text>
                          </g>
                        );
                      })}

                      {/* Mass 1 */}
                      <circle cx={50 + (comX1 / 12) * 500} cy="60" r={10 + comM1 * 2} fill="#3b82f6" />
                      <text
                        x={50 + (comX1 / 12) * 500}
                        y="35"
                        textAnchor="middle"
                        fill="#60a5fa"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        m1:{comM1}kg
                      </text>

                      {/* Mass 2 */}
                      <circle cx={50 + (comX2 / 12) * 500} cy="60" r={10 + comM2 * 2} fill="#ec4899" />
                      <text
                        x={50 + (comX2 / 12) * 500}
                        y="35"
                        textAnchor="middle"
                        fill="#f472b6"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        m2:{comM2}kg
                      </text>

                      {/* Centre of Mass Marker */}
                      <g transform={`translate(${50 + (calculatedCOM.xcm / 12) * 500}, 60)`}>
                        <polygon points="0,-18 -8,-2 8,-2" fill="#ef4444" />
                        <circle cx="0" cy="0" r="4" fill="#ffffff" />
                        <text x="0" y="25" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold" fontFamily="monospace">
                          COM ({calculatedCOM.xcm.toFixed(2)}m)
                        </text>
                      </g>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-800/70 rounded-2xl border border-slate-700/60">
                      <label className="text-xs text-slate-300 font-bold block mb-1">Mass 1: {comM1} kg</label>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={comM1}
                        onChange={e => setComM1(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>
                    <div className="p-4 bg-slate-800/70 rounded-2xl border border-slate-700/60">
                      <label className="text-xs text-slate-300 font-bold block mb-1">Position x1: {comX1} m</label>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.5}
                        value={comX1}
                        onChange={e => setComX1(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>
                    <div className="p-4 bg-slate-800/70 rounded-2xl border border-slate-700/60">
                      <label className="text-xs text-slate-300 font-bold block mb-1">Mass 2: {comM2} kg</label>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={comM2}
                        onChange={e => setComM2(Number(e.target.value))}
                        className="w-full accent-pink-500"
                      />
                    </div>
                    <div className="p-4 bg-slate-800/70 rounded-2xl border border-slate-700/60">
                      <label className="text-xs text-slate-300 font-bold block mb-1">Position x2: {comX2} m</label>
                      <input
                        type="range"
                        min={2}
                        max={12}
                        step={0.5}
                        value={comX2}
                        onChange={e => setComX2(Number(e.target.value))}
                        className="w-full accent-pink-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: TORQUE & LEVER ARM ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 350 220" className="w-full max-w-sm">
                      <circle cx="60" cy="110" r="14" fill="#475569" stroke="#94a3b8" strokeWidth="3" />
                      <circle cx="60" cy="110" r="6" fill="#1e293b" />

                      {(() => {
                        const len = wrenchRadius * 400;
                        const endX = 60 + len;
                        const angleRad = (wrenchAngle * Math.PI) / 180;
                        const forceVecLen = (wrenchForce / 100) * 80;
                        const forceEndX = endX + forceVecLen * Math.cos(angleRad - Math.PI / 2);
                        const forceEndY = 110 + forceVecLen * Math.sin(angleRad - Math.PI / 2);

                        return (
                          <g>
                            <line x1="60" y1="110" x2={endX} y2="110" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
                            <line x1={endX} y1="110" x2={forceEndX} y2={forceEndY} stroke="#f59e0b" strokeWidth="4" />
                            <text x={forceEndX + 5} y={forceEndY} fill="#fbbf24" fontSize="12" fontWeight="bold">
                              F = {wrenchForce}N
                            </text>
                            <line x1={endX} y1="110" x2={endX} y2={110 - wrenchRadius * 400 * Math.sin(angleRad)} stroke="#38bdf8" strokeDasharray="4 4" strokeWidth="2" />
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                      <div>
                        <label className="text-xs text-slate-300 font-bold block mb-1">
                          Wrench Arm Length (r): {wrenchRadius} m
                        </label>
                        <input
                          type="range"
                          min={0.1}
                          max={0.8}
                          step={0.05}
                          value={wrenchRadius}
                          onChange={e => setWrenchRadius(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300 font-bold block mb-1">
                          Applied Force (F): {wrenchForce} N
                        </label>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={wrenchForce}
                          onChange={e => setWrenchForce(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300 font-bold block mb-1">
                          Force Angle (&theta;): {wrenchAngle}&deg;
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={180}
                          value={wrenchAngle}
                          onChange={e => setWrenchAngle(Number(e.target.value))}
                          className="w-full accent-sky-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Effective Lever Arm (r sin &theta;):</span>
                        <span className="text-sky-300 font-bold">{calculatedTorque.leverArm.toFixed(3)} m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Torque Magnitude (&tau;):</span>
                        <span className="text-amber-300 font-bold text-sm">{calculatedTorque.tau.toFixed(2)} N m</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-800 pt-1 text-slate-400">
                        <span>Max Possible (&theta; = 90&deg;):</span>
                        <span>{(wrenchRadius * wrenchForce).toFixed(2)} N m</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: ANGULAR MOMENTUM & SPINNING SKATER ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: Math.max(0.2, 6 / calculatedSkater.newOmega), repeat: Infinity, ease: 'linear' }}
                      className="w-48 h-48 rounded-full border-2 border-dashed border-indigo-500/50 flex items-center justify-center relative"
                    >
                      <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-600/50">
                        Body
                      </div>
                      <div
                        className="absolute w-6 h-6 rounded-full bg-amber-400 shadow-md shadow-amber-400/50"
                        style={{ transform: `translateX(-${skaterMassArm * 80}px)` }}
                      />
                      <div
                        className="absolute w-6 h-6 rounded-full bg-amber-400 shadow-md shadow-amber-400/50"
                        style={{ transform: `translateX(${skaterMassArm * 80}px)` }}
                      />
                    </motion.div>
                    <p className="text-xs text-indigo-300 font-mono mt-4">
                      Spin Rate: {calculatedSkater.newOmega.toFixed(2)} rad/s ({(calculatedSkater.newOmega / (2 * Math.PI)).toFixed(2)} rev/s)
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-300">Dumbbell Arm Radius (r):</span>
                          <span className="text-indigo-400 font-mono">{skaterMassArm} m</span>
                        </div>
                        <input
                          type="range"
                          min={0.15}
                          max={1.0}
                          step={0.05}
                          value={skaterMassArm}
                          onChange={e => {
                            setSkaterMassArm(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-indigo-500 cursor-pointer"
                          aria-label="Adjust arm extension"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1 font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Moment of Inertia (I):</span>
                          <span className="text-white font-bold">{calculatedSkater.I2.toFixed(3)} kg m^2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Conserved L = I&omega;:</span>
                          <span className="text-emerald-400 font-bold">{calculatedSkater.L.toFixed(2)} kg m^2/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Rotational KE (1/2 I&omega;^2):</span>
                          <span className="text-amber-400 font-bold">{calculatedSkater.finalRotKE.toFixed(1)} J</span>
                        </div>
                        <div className="flex justify-between text-indigo-300 border-t border-slate-800 pt-1">
                          <span>Muscular Work Done:</span>
                          <span>+{calculatedSkater.workDone.toFixed(1)} J</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-sm font-bold text-white transition-all"
            >
              &larr; Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold text-white transition-all shadow-lg shadow-indigo-600/30"
              >
                Next Laboratory &rarr;
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white transition-all shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode &rarr;
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="my-6 space-y-6"
        >
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                  Zero Pressure Free Play
                </span>
                <h3 className="text-xl font-black text-white mt-2">Comprehensive Mechanics Dynamic Workbench</h3>
                <p className="text-xs text-slate-400">
                  Switch between physics modes to freely combine translational energy, collisions, centre of mass, and rotational dynamics.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                {(['sim', 'math', 'realworld'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                      activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'sim' ? 'Interactive Simulation' : tab === 'math' ? 'Multi-Representation' : 'Real-World Systems'}
                  </button>
                ))}
              </div>
            </div>

            {/* Sandbox Content Tabs */}
            {activeTab === 'sim' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase">Mechanical Energy Lab</h4>
                  <label className="text-xs text-slate-300 block">Height: {heightDrop} m</label>
                  <input
                    type="range"
                    min={2}
                    max={50}
                    value={heightDrop}
                    onChange={e => setHeightDrop(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                  <div className="text-xs font-mono text-slate-400 space-y-1">
                    <div>v = &radic;(2gh) = {energySpeed.toFixed(2)} m/s</div>
                    <div>E_total = {energyTotal.toFixed(1)} J</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-pink-400 uppercase">Collisions Lab</h4>
                  <label className="text-xs text-slate-300 block">Elasticity: {elasticity.toFixed(2)}</label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={elasticity}
                    onChange={e => setElasticity(Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                  <div className="text-xs font-mono text-slate-400 space-y-1">
                    <div>v1 = {collisionResults.v1.toFixed(2)} m/s</div>
                    <div>v2 = {collisionResults.v2.toFixed(2)} m/s</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase">Spin & Torque Lab</h4>
                  <label className="text-xs text-slate-300 block">Arm Radius: {skaterMassArm} m</label>
                  <input
                    type="range"
                    min={0.2}
                    max={1.0}
                    step={0.05}
                    value={skaterMassArm}
                    onChange={e => setSkaterMassArm(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="text-xs font-mono text-slate-400 space-y-1">
                    <div>&omega; = {calculatedSkater.newOmega.toFixed(2)} rad/s</div>
                    <div>L = {calculatedSkater.L.toFixed(2)} kg m^2/s</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'math' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 font-bold block">Translational vs Rotational Analogues</span>
                  <div className="text-slate-300 space-y-1">
                    <div>Displacement x &harr; Angular displacement &theta;</div>
                    <div>Velocity v = dx/dt &harr; Angular velocity &omega; = d&theta;/dt</div>
                    <div>Mass m &harr; Moment of inertia I = &Sigma; m r^2</div>
                    <div>Force F = dp/dt &harr; Torque &tau; = dL/dt = r x F</div>
                    <div>Linear momentum p = mv &harr; Angular momentum L = I&omega; = r x p</div>
                    <div>Translational KE = 1/2 mv^2 &harr; Rotational KE = 1/2 I&omega;^2</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block">Conservation Law Matrix</span>
                  <div className="text-slate-300 space-y-1">
                    <div>W_nc = 0 &rArr; &Delta;(KE + PE) = 0 (Mech Energy Conserved)</div>
                    <div>F_ext = 0 &rArr; P_total = M v_cm = constant (Linear Momentum)</div>
                    <div>&tau;_ext = 0 &rArr; L_total = I&omega; = constant (Angular Momentum)</div>
                    <div>Continuous Body COM: x_cm = &int; x dm / M</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'realworld' && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
                <h4 className="font-bold text-white text-sm">Real-World Engineering Implementations:</h4>
                <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                  <li><strong>Automotive Crumple Zones:</strong> Engineered inelastic collapse absorbs vehicle KE (&Delta;KE = 1/2 m v^2), mitigating passenger deceleration.</li>
                  <li><strong>ISRO Satellite Reaction Wheels:</strong> Internal electric motors alter wheel spin (&Delta;&omega;), rotating the satellite without expending propellant.</li>
                  <li><strong>Heavy Locomotive Freight Hauling:</strong> High torque (&tau; = F &times; r) delivers mega-watt power (P = F &times; v) against gradient and rail drag.</li>
                </ul>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/20 text-sm flex items-center gap-2"
              >
                Ready for Graded Challenges! &rarr;
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="my-6 space-y-6"
        >
          {/* Challenge Status Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : difficulty === 'standard'
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                NEP 2020: {challenge.competencyLevel}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-400">
                Accuracy: {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
              </span>
              <span className="text-indigo-400 font-bold">Mastery: {masteryLevel}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-colors shadow-2xl ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-indigo-400">Node Ref: [{challenge.nodeId}]</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
              {challenge.question}
            </h3>

            {/* ─── CHALLENGE TYPE 1: MCQ (Classify / Distinguish / Match) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-4 rounded-2xl text-sm font-semibold transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* ─── CHALLENGE TYPE 2: DRAG-LABEL ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold block w-full mb-1">Draggable Formulas:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl cursor-grab text-white text-xs font-bold shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => {
                    const titles: Record<string, string> = {
                      target_rod: '1. Uniform Rod (Length L)',
                      target_ring: '2. Thin Circular Ring (Radius R)',
                      target_triangle: '3. Triangular Lamina (Height h)',
                      target_semidisc: '4. Semicircular Disc (Radius R)',
                    };
                    return (
                      <div
                        key={targetId}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[100px] text-center"
                      >
                        <span className="text-xs font-bold text-slate-400 mb-2">{titles[targetId]}</span>
                        <div className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-indigo-300">
                          {droppedLabels[targetId] || 'Drop matching formula here'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-lg"
                >
                  Verify Mappings &rarr;
                </motion.button>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 3: DRAG-SORT ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <p className="text-xs text-indigo-300 font-mono">
                  Drag items up or down to reorder from lowest to highest moment of inertia:
                </p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 bg-slate-800/80 hover:bg-slate-800 rounded-2xl text-slate-200 text-xs font-bold flex items-center gap-3 cursor-grab border border-slate-700/60"
                    >
                      <span className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center text-xs">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-lg"
                >
                  Confirm Sorted Order &rarr;
                </motion.button>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 4: NUMERIC ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-sm w-64 focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-slate-400 font-mono text-sm font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-lg"
                  >
                    Check Calculation &rarr;
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 5: CONSTRUCT ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-mono">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-xs font-bold font-mono shadow-md"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex items-center gap-2 flex-wrap">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono font-bold text-indigo-300 flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble equation...</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-lg"
                  >
                    Validate Equation &rarr;
                  </motion.button>
                  <button
                    onClick={() => setConstructParts([])}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold rounded-2xl"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* ─── CLICK-TO-REVEAL STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 rounded-3xl bg-slate-950/80 border border-amber-500/30 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    &#128218; Step-by-Step Rigorous Physics Solution:
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-200"
                      >
                        <span className="text-amber-400 font-bold mr-2">[{i + 1}]</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.div>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-5 py-2 bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 rounded-xl text-xs font-bold"
                    >
                      Show Next Proof Step &rarr;
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission &rarr;' : 'Next Challenge &rarr;'}
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-6 space-y-6"
        >
          {/* Performance Hero Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">&#127942;</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Mission Mastery Certified!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have successfully completed all challenges across Conservation of Mechanical Energy, Collisions, Centre of Mass, Torque, and Angular Momentum.
            </p>

            <div className="flex justify-center gap-6 pt-4 font-mono">
              <div className="px-6 py-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 block">BKT Mastery Level</span>
                <span className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-indigo-500/40 space-y-5 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-xl">&#128161;</span>
              <h3 className="text-base font-bold text-indigo-300 uppercase tracking-wide">
                Critical Reflection & Metacognitive Deep Dive
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Solidify your neural pathways by reflecting on your mechanics findings before completing the mission debrief.
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  placeholder="e.g. How spinning skaters actually increase their rotational KE by doing muscular work..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                  placeholder="e.g. Energy is never lost, it just changes forms between speed and height, while momentum always stays conserved..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  placeholder="e.g. Designing safer cars with crumple zones or orienting spacecraft using reaction wheels..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  {reflectionSubmitted ? 'Reflection Saved ✓' : 'Save Reflection Notes'}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-800/60">
            <h3 className="text-sm font-bold text-emerald-300 uppercase mb-1">Personalised Performance Assessment</h3>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! Exceptional conceptual rigor and flawless analytical execution across all 10 mechanics nodes.'
                : errors <= 3
                ? 'High Distinction! Strong command of physical conservation laws and rotational dynamics. Review minor edge cases below.'
                : 'Good solid effort! Physical intuition is developing nicely. Re-visit the interactive laboratories and review the misconception profile below.'}
            </p>
          </div>

          {/* Misconception Gap Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 rounded-3xl bg-rose-950/30 border border-rose-800/60 space-y-4">
              <h3 className="text-sm font-bold text-rose-300 uppercase">Targeted Conceptual Clarifications</h3>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                      <p className="text-rose-400 font-bold">&#10060; Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 font-semibold">&#10003; Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SRS) Status */}
          <div className="p-6 rounded-3xl bg-amber-950/30 border border-amber-800/60 space-y-2">
            <h3 className="text-sm font-bold text-amber-300 uppercase">Spaced Repetition Review Schedule (SM-2)</h3>
            <p className="text-xs text-slate-300">
              Optimal memory retention interval computed:{' '}
              <span className="text-amber-400 font-bold">
                {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
              </span>
              . An automated review prompt will be scheduled to reinforce long-term neurological encoding.
            </p>
          </div>

          {/* Real-World Activity Capstone */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              &#128640; {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
                  <span className="text-indigo-400 font-bold mr-2">[{idx + 1}]</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS (sim-engine components) ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PhysicsConservationMechanicalEnergySim;
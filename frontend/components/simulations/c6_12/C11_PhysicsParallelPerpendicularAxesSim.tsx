'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C11_PHY_041 = 'c11_phy_041'; // Parallel and perpendicular axes theorems
const NODE_C11_PHY_042 = 'c11_phy_042'; // Rotational motion equations (tau = Ialpha)
const NODE_C11_PHY_043 = 'c11_phy_043'; // Kepler's laws of planetary motion
const NODE_C11_PHY_044 = 'c11_phy_044'; // Universal law of gravitation (F = Gm_1m_2/r^2)
const NODE_C11_PHY_045 = 'c11_phy_045'; // Variation of g with altitude, depth, and latitude
const NODE_C11_PHY_046 = 'c11_phy_046'; // Gravitational field and intensity
const NODE_C11_PHY_047 = 'c11_phy_047'; // Gravitational potential
const NODE_C11_PHY_048 = 'c11_phy_048'; // Gravitational potential energy
const NODE_C11_PHY_049 = 'c11_phy_049'; // Escape velocity
const NODE_C11_PHY_050 = 'c11_phy_050'; // Orbital velocity and satellites

const ALL_NODE_IDS = [
  NODE_C11_PHY_041,
  NODE_C11_PHY_042,
  NODE_C11_PHY_043,
  NODE_C11_PHY_044,
  NODE_C11_PHY_045,
  NODE_C11_PHY_046,
  NODE_C11_PHY_047,
  NODE_C11_PHY_048,
  NODE_C11_PHY_049,
  NODE_C11_PHY_050,
];

// ─── PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    nodeId: NODE_C11_PHY_041,
    question: 'If you double the distance (d) of a parallel rotation axis from the center of mass, how will the shift term in moment of inertia change?',
    options: ['It will double (2x)', 'It will quadruple (4x)', 'It remains constant', 'It will halve (1/2x)'],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, drag the Parallel Shift slider from 0.5 m to 1.0 m and verify how the Md² term quadruples.',
    explanation: 'By the Parallel Axis Theorem (I = I_cm + Md²), the shift term depends quadratically on distance d. Therefore, doubling d increases Md² by 2² = 4 times.',
  },
  {
    id: 'pred_2',
    nodeId: NODE_C11_PHY_045,
    question: 'What happens to the acceleration due to gravity (g) as a probe travels from Earth’s surface straight to its geometric center?',
    options: ['It increases to infinity', 'It remains 9.8 m/s²', 'It decreases linearly to 0 m/s²', 'It drops abruptly to zero at the core boundary'],
    correctIndex: 2,
    verifyInstruction: 'In Lab 4, drag the Probe Distance slider inside the planet (r < 1.0 R) and observe g decreasing in direct proportion to r down to 0 at r = 0.',
    explanation: 'Inside a uniform sphere, the enclosed mass M(r) ∝ r³, while the gravitational force formula has r² in denominator. Thus g(r) = GM(r)/r² ∝ r, dropping linearly to zero at the center.',
  },
];

// ─── OBSERVATION QUESTIONS (What Do You Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    nodeId: NODE_C11_PHY_043,
    question: 'Observe the Keplerian elliptical orbit simulation in Lab 3. What do you notice about the planet’s orbital speed at perihelion (closest to Sun) versus aphelion (farthest)?',
    observableOptions: [
      'The planet sweeps fastest near perihelion and slowest near aphelion',
      'The planet travels at perfectly uniform speed along the entire ellipse',
      'The planet halts completely at both focal points',
      'The planet moves fastest at aphelion due to lower gravitational pull',
    ],
    correctIndex: 0,
    explanation: 'Because central gravitational forces exert zero torque, angular momentum L = m·r·v_perp is conserved. As r decreases at perihelion, v must increase, sweeping equal areas in equal times.',
  },
  {
    id: 'obs_2',
    nodeId: NODE_C11_PHY_046,
    question: 'In Lab 4, observe the vector arrows representing gravitational field intensity outside the planet surface (r ≥ 1.0 R). What is their spatial pattern?',
    observableOptions: [
      'They point radially inward toward the planet center and decrease in length as 1/r²',
      'They point radially outward and grow infinitely long at large distances',
      'They form closed rotational rings concentric with Earth’s equator',
      'They remain identical in direction and magnitude regardless of altitude',
    ],
    correctIndex: 0,
    explanation: 'Gravitational field intensity I = -GM/r² r̂ is always attractive (directed toward the center of mass) and diminishes with the inverse square of distance.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Deep Space & Orbital Dynamics Command',
  intro: 'You are the Chief Flight Dynamics Engineer at ISRO designing the next-generation interplanetary probe and satellite deployment mechanism. You must calibrate the reaction wheels (moment of inertia & torque), map gravitational fields across varying altitudes, compute escape velocities, and balance centripetal orbital velocities to achieve stable orbital insertion.',
  context: 'Rigid body rotational mechanics coupled with Newtonian gravitation and Keplerian orbital laws dictate whether your spacecraft achieves precise orbital capture or tumbles into the void.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you double the distance of an axis of rotation from the Centre of Mass (CM) of a satellite antenna of mass M, by how much does the parallel-axis shift term (Md²) increase?',
  options: [
    'It doubles (2x)',
    'It quadruples (4x)',
    'It increases by √2 times',
    'It remains unchanged because Icm is constant',
  ],
  correctIndex: 1,
  hintAfter: 'Remember the shift term is M·d². Since d is squared, doubling d multiplies the term by (2)² = 4! Let us explore both rotational and gravitational mechanics interactively.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_PHY_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under what strict geometric condition is the Perpendicular Axis Theorem (Iz = Ix + Iy) valid?',
    options: [
      'Only for planar (two-dimensional) laminar bodies',
      'For any 3D rigid body including solid spheres and cylinders',
      'Only when the body is in translational acceleration',
      'Only for spherical shells of uniform density',
    ],
    correctIndex: 0,
    explanation: 'The perpendicular axis theorem Iz = Ix + Iy is strictly valid only for 2D laminar (planar) bodies where z = 0 for all mass elements, so r² = x² + y².',
    hints: [
      'Think about whether a solid 3D sphere has mass spread out in the z-direction.',
      'For 3D bodies, Ix, Iy, and Iz each include parts of the third coordinate.',
      'The theorem requires the mass distribution to lie entirely in a single 2D plane (lamina).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_PHY_041,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the standard Moment of Inertia formulas for a body of mass M and radius/length R or L to their respective axes.',
    dragItems: [
      { label: 'ML²/12', targetId: 't_rod_cm' },
      { label: 'ML²/3', targetId: 't_rod_end' },
      { label: 'MR²/2', targetId: 't_disc_cm' },
      { label: '5MR²/4', targetId: 't_disc_tan' },
    ],
    correctMapping: {
      t_rod_cm: 'ML²/12',
      t_rod_end: 'ML²/3',
      t_disc_cm: 'MR²/2',
      t_disc_tan: '5MR²/4',
    },
    explanation: 'Rod through CM is ML²/12. By parallel axis theorem, shifting to end (d=L/2) gives ML²/12 + M(L/2)² = ML²/3. Disc through CM is MR²/2; tangent in plane is MR²/4 (diameter) + MR² = 5MR²/4.',
    hints: [
      'A rod about its centre has the lowest moment of inertia ML²/12.',
      'Shift the rod axis by L/2 using I = Icm + M(L/2)² to get ML²/3.',
      'For a disc, diameter is MR²/4 via perpendicular axis theorem, and parallel tangent adds MR² giving 5MR²/4.',
    ],
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_PHY_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which fundamental rotational law mirrors Newton’s Second Law (F = ma) for a rigid body with constant moment of inertia I?',
    options: [
      'τ = I · α',
      'L = I · ω²',
      'τ = dK/dt',
      'W = τ · α',
    ],
    correctIndex: 0,
    explanation: 'τ = Iα is the exact rotational counterpart to F = ma, where torque τ replaces force F, moment of inertia I replaces mass m, and angular acceleration α replaces linear acceleration a.',
    hints: [
      'Torque produces angular acceleration just as force produces linear acceleration.',
      'Replace m with I and a with α in F = ma.',
      'The scalar formula is τ = Iα.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_PHY_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does a planet sweep out equal areas in equal intervals of time (Kepler’s 2nd Law)?',
    options: [
      'Because the gravitational force is central, producing zero net torque and conserving angular momentum (dA/dt = L/2m)',
      'Because gravitational potential is constant along an elliptical trajectory',
      'Because centrifugal acceleration balances the Sun’s gravitational pull at all points',
      'Because orbital speed is uniform along the ellipse',
    ],
    correctIndex: 0,
    explanation: 'Since gravity acts along the radius vector (r || F), the torque τ = r × F = 0. Consequently, angular momentum L is constant, leading to constant areal velocity dA/dt = L/(2m).',
    hints: [
      'Consider the cross product of the position vector r and the gravitational force F.',
      'If force is directed towards the centre, what is the torque about that centre?',
      'Zero torque implies conservation of angular momentum L, which directly proves dA/dt = constant.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_PHY_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the correct dimensional formula of the Universal Gravitational Constant G?',
    options: [
      '[M⁻¹ L³ T⁻²]',
      '[M¹ L² T⁻²]',
      '[M⁻¹ L² T⁻¹]',
      '[M⁰ L³ T⁻²]',
    ],
    correctIndex: 0,
    explanation: 'From G = F·r² / (m₁m₂), dimensions are [MLT⁻²]·[L²] / [M²] = [M⁻¹ L³ T⁻²].',
    hints: [
      'Rearrange Newton’s law: G = F·r² / m².',
      'Substitute [F] = [M L T⁻²], [r²] = [L²], and [m²] = [M²].',
      'Combine exponents: M^(1-2) L^(1+2) T^(-2) = [M⁻¹ L³ T⁻²].',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_PHY_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the acceleration due to gravity g at the exact geometric centre of the Earth (assuming uniform density)?',
    options: [
      '0 m/s²',
      '9.8 m/s²',
      'Infinity',
      '4.9 m/s²',
    ],
    correctIndex: 0,
    explanation: 'At the centre of the Earth (d = R), the depth formula g(d) = g(1 - d/R) yields g(R) = g(1 - 1) = 0 m/s² as symmetric pulls from surrounding mass cancel out.',
    hints: [
      'Use the variation of g with depth: g(d) = g(1 - d/R).',
      'At the centre, depth d equals Earth radius R.',
      'The enclosed mass at r=0 is zero, so net gravitational pull is zero.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_PHY_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the SI unit of gravitational field intensity I (or E_g)?',
    options: [
      'N/kg (equivalent to m/s²)',
      'J/kg',
      'N·m²/kg²',
      'kg·m/s',
    ],
    correctIndex: 0,
    explanation: 'Gravitational field intensity is defined as force per unit mass (I = F/m₀), having units N/kg, which is dimensionally equivalent to acceleration (m/s²).',
    hints: [
      'Field intensity is the force experienced by a unit test mass.',
      'Divide force (Newtons) by mass (kilograms).',
      'N/kg = (kg·m/s²)/kg = m/s².',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_PHY_047,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is the gravitational potential V(r) = -GM/r defined with a negative sign everywhere?',
    options: [
      'Because gravitational force is attractive; the field does positive work as mass arrives from infinity, so external agent work is negative',
      'It is an arbitrary mathematical convention with no physical meaning',
      'Because kinetic energy of the test mass is always negative',
      'Because the mass of Earth is defined as negative in general relativity',
    ],
    correctIndex: 0,
    explanation: 'Because gravity is purely attractive, an external agent must apply an outward retarding force to bring a mass in from infinity without acceleration, doing negative work.',
    hints: [
      'Recall reference zero is at infinity (V = 0).',
      'As a body falls inward, does the gravitational field attract it or repel it?',
      'Attraction means the field pulls it in, so the external agent must extract energy (negative work).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_PHY_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A uniform satellite solar boom has mass M = 3 kg and length L = 2 m. Calculate its moment of inertia about a transverse axis passing through one of its ENDS in kg·m².',
    correctAnswer: 4,
    tolerance: 0.1,
    unit: 'kg·m²',
    explanation: 'About one end, I = ML²/3 = (3 kg)·(2 m)² / 3 = 12 / 3 = 4 kg·m².',
    hints: [
      'About the CM, Icm = ML²/12.',
      'By parallel axis theorem, I = Icm + M(L/2)² = ML²/3.',
      'Substitute M = 3 and L = 2: (3 * 4) / 3 = 4 kg·m².',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_PHY_042,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A reaction control flywheel of moment of inertia I = 2.5 kg·m² experiences a constant torque τ = 15 N·m. Starting from rest, what is its angular velocity ω after 4 seconds (in rad/s)?',
    correctAnswer: 24,
    tolerance: 0.5,
    unit: 'rad/s',
    explanation: 'α = τ/I = 15 / 2.5 = 6 rad/s². Using ω = ω₀ + αt with ω₀ = 0: ω = 0 + (6)·(4) = 24 rad/s.',
    hints: [
      'First find angular acceleration α using τ = Iα.',
      'α = 15 / 2.5 = 6 rad/s².',
      'Now use rotational kinematics: ω = α · t = 6 · 4 = 24 rad/s.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_PHY_043,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An exoplanet is discovered orbiting a sun-like star at 4 times the orbital radius of Earth (r = 4 AU). What is its orbital period T in Earth years?',
    options: [
      '8 years',
      '16 years',
      '2 years',
      '64 years',
    ],
    correctIndex: 0,
    explanation: 'By Kepler’s Third Law, T² ∝ r³. (T_planet / T_earth)² = (4 / 1)³ = 64. Taking the square root gives T_planet = √64 = 8 years.',
    hints: [
      'Kepler’s 3rd Law states T² is proportional to r³.',
      'Cube the radius ratio: 4³ = 64.',
      'Take the square root: √64 = 8 years.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_PHY_045,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'At what altitude h (in terms of Earth radius R) does the acceleration due to gravity drop to exactly 25% (g/4) of its surface value? Enter the numerical multiple of R.',
    correctAnswer: 1,
    tolerance: 0.05,
    unit: 'R',
    explanation: 'g(h) = g · [R / (R + h)]² = g/4 ⇒ R / (R + h) = 1/2 ⇒ R + h = 2R ⇒ h = 1R.',
    hints: [
      'Use the exact altitude formula: g(h) = g [R / (R + h)]².',
      'Set [R / (R + h)]² = 1/4.',
      'Take square root: R / (R + h) = 1/2, meaning R + h = 2R, so h = 1R.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_PHY_045,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the effective acceleration due to gravity g minimum at the Equator and maximum at the Poles?',
    options: [
      'Due to Earth’s rotation (centrifugal reduction ω²R at equator) AND Earth’s equatorial bulge (greater distance from centre)',
      'Because atmospheric pressure is higher at the poles',
      'Because magnetic field lines cancel out gravity at the equator',
      'Because solar radiation reduces gravitational force at low latitudes',
    ],
    correctIndex: 0,
    explanation: 'Two compounding factors reduce g at the equator: (1) Earth spins causing maximum centrifugal reduction g\' = g - ω²R, and (2) equatorial radius is ~21 km greater than polar radius.',
    hints: [
      'Consider both the rotation of Earth on its axis and its oblate spheroid shape.',
      'At the poles, the distance to the rotation axis is zero, so no centripetal force is subtracted.',
      'The equatorial bulge puts surface mass farther from the centre (R_eq > R_polar).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_PHY_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How does the exact gravitational potential energy formula U = -GMm/r reduce to ΔU = mgh for small heights h << R above Earth’s surface?',
    options: [
      'By writing ΔU = GMm·h / [R(R+h)] and approximating R(R+h) ≈ R², then substituting g = GM/R²',
      'By neglecting the Earth’s radius entirely',
      'By assuming the gravitational constant G increases linearly with height',
      'By setting kinetic energy equal to potential energy at the surface',
    ],
    correctIndex: 0,
    explanation: 'ΔU = U(R+h) - U(R) = GMm[1/R - 1/(R+h)] = GMmh/[R(R+h)]. When h << R, R(R+h) ≈ R², giving (GM/R²)·m·h = mgh.',
    hints: [
      'Write U(R+h) - U(R) and find a common denominator.',
      'The exact numerator is GMmh and the denominator is R(R+h).',
      'For small h, replace R+h with R, leaving GMm/R² · h = mgh.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_PHY_049,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given Earth radius R = 6.4 × 10⁶ m and surface gravity g = 9.8 m/s², calculate the escape velocity v_esc from Earth’s surface in km/s (round to 1 decimal place).',
    correctAnswer: 11.2,
    tolerance: 0.2,
    unit: 'km/s',
    explanation: 'v_esc = √(2gR) = √(2 × 9.8 × 6.4 × 10⁶) = √(1.2544 × 10⁸) ≈ 11200 m/s = 11.2 km/s.',
    hints: [
      'Use the formula v_esc = √(2gR).',
      '2 × 9.8 × 6,400,000 = 125,440,000.',
      '√125,440,000 ≈ 11,200 m/s = 11.2 km/s.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_PHY_050,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the exact relationship between the orbital velocity v₀ of a satellite in near-Earth orbit and the escape velocity v_esc from Earth’s surface?',
    options: [
      'v_esc = √2 · v₀ (or v₀ = v_esc / √2 ≈ 7.9 km/s)',
      'v_esc = 2 · v₀',
      'v₀ = √2 · v_esc',
      'v_esc = v₀²',
    ],
    correctIndex: 0,
    explanation: 'v₀ = √(GM/R) = √(gR) ≈ 7.9 km/s, while v_esc = √(2GM/R) = √(2gR) ≈ 11.2 km/s. Therefore v_esc = √2 · v₀.',
    hints: [
      'Near-Earth orbital speed is v₀ = √(gR).',
      'Escape velocity from surface is v_esc = √(2gR).',
      'The factor difference inside the square root is 2, giving a ratio of √2.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_PHY_042,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An ISRO spinning satellite deploys two scientific magnetometers on extensible booms, increasing its moment of inertia by a factor of 3. What happens to its angular velocity and rotational kinetic energy?',
    options: [
      'Angular velocity decreases to ω/3 (conserving L); Rotational KE decreases to K/3 (work done by boom dampers)',
      'Angular velocity triples to 3ω; Rotational KE increases by 9x',
      'Both angular velocity and rotational kinetic energy remain completely unchanged',
      'Angular velocity drops to ω/√3; Rotational KE is conserved',
    ],
    correctIndex: 0,
    explanation: 'No external torque acts, so L = Iω = constant. If I becomes 3I, ω becomes ω/3. Kinetic energy K = L²/(2I) decreases by a factor of 3 because internal work is absorbed as the booms extend.',
    hints: [
      'Angular momentum L = Iω is strictly conserved since net external torque is zero.',
      'If I triples, ω must drop to 1/3.',
      'Rotational kinetic energy is K = (1/2)Iω² = L² / (2I). Since I is in the denominator, K drops to 1/3.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_PHY_049,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why the Moon has no atmosphere while Earth retains a thick nitrogen-oxygen atmosphere.',
    options: [
      'The Moon’s escape velocity (~2.4 km/s) is comparable to thermal RMS molecular speeds at daytime lunar temperatures (~400 K), causing gases to leak away over geological time',
      'Because the Moon has zero gravitational force at its surface',
      'Because solar wind creates a permanent vacuum around all rocky satellites regardless of mass',
      'Because lunar rocks chemically consume all nitrogen and oxygen molecules upon contact',
    ],
    correctIndex: 0,
    explanation: 'Because the Moon’s mass is ~1/81 of Earth’s, its escape velocity is only ~2.4 km/s. The Maxwell-Boltzmann tail of thermal speeds of O₂/N₂ exceeds 2.4 km/s at ~400 K, allowing the atmosphere to bleed into space.',
    hints: [
      'Compare the Moon’s escape velocity (2.4 km/s) with Earth’s (11.2 km/s).',
      'Recall kinetic theory of gases: v_rms ∝ √(T/M_mol).',
      'At lunar temperatures, gas molecules in the high-speed tail easily exceed 2.4 km/s.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_PHY_050,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the steps in the formal derivation of the orbital period formula T = 2π√(r³/GM) in the correct logical sequence.',
    sortItems: [
      'Equate gravitational pull to required centripetal force: GMm/r² = mv²/r',
      'Solve for orbital speed: v = √(GM/r)',
      'Express orbital period as circumference over orbital speed: T = 2πr / v',
      'Substitute v to arrive at Kepler’s relation: T = 2πr / √(GM/r) = 2π√(r³/GM)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First equate gravitational force to centripetal force to obtain v = √(GM/r). Then relate distance (2πr) and speed (v) to get period T = 2π√(r³/GM).',
    hints: [
      'Every circular orbit derivation starts with F_gravity = F_centripetal.',
      'After finding orbital speed v, use kinematics: time = distance / speed.',
      'Combine the radius terms to obtain the r^(3/2) dependency.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_PHY_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do astronauts aboard the International Space Station (altitude ~400 km) feel completely weightless, even though gravity at that altitude is ~8.7 m/s² (nearly 90% of surface g)?',
    options: [
      'Because the astronaut and the station are in continuous mutual free-fall around Earth, so the normal contact reaction force between them is zero',
      'Because Earth’s gravity ceases to exist beyond 100 km (Kármán line)',
      'Because the spacecraft engine produces an anti-gravity thrust force',
      'Because magnetic shielding cancels gravitational mass in low Earth orbit',
    ],
    correctIndex: 0,
    explanation: 'Weightlessness is NOT zero gravity. Both the ISS and astronaut accelerate toward Earth’s centre at g\' = 8.7 m/s². Because both fall together, the floor exerts zero normal reaction force on the astronaut.',
    hints: [
      'Check whether g is actually zero at 400 km altitude.',
      'g(400km) = 9.8 × (6400/6800)² ≈ 8.7 m/s² — gravity is very strong!',
      'Apparent weight is measured by the normal reaction force. If both fall at identical rates, normal force is zero.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_PHY_046,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the piecewise mathematical model of gravitational field intensity I(r) from r = 0 to r = ∞ for a solid planet of uniform mass M and radius R.',
    availableParts: ['I = GMr/R³ (r < R)', 'I = GM/r² (r ≥ R)', 'I = 0 (at r = 0)', 'I = GM/R² (at r = R)'],
    targetState: 'I = 0 (at r = 0) I = GMr/R³ (r < R) I = GM/R² (at r = R) I = GM/r² (r ≥ R)',
    validationHint: 'Add in order: centre value, inside regime, surface boundary, outside regime.',
    explanation: 'Inside a uniform solid sphere, field intensity rises linearly from 0 at the centre: I(r) = GMr/R³. At the surface r = R it reaches GM/R², and outside it decays as 1/r².',
    hints: [
      'Start at the very centre r = 0 where I = 0.',
      'Inside the planet (r < R), the field is proportional to r: GMr/R³.',
      'At and beyond the surface (r >= R), all mass is enclosed, so it behaves like a point mass: GM/r².',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C11_PHY_047,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 1000 kg communication payload is moved from Earth’s surface (r₁ = R) to a geosynchronous transfer orbit injection point at r₂ = 4R. If GMm/R = 6.25 × 10¹⁰ J, what is the change in gravitational potential energy ΔU in units of 10¹��� Joules?',
    correctAnswer: 4.69,
    tolerance: 0.1,
    unit: '× 10¹⁰ J',
    explanation: 'ΔU = U(4R) - U(R) = -GMm/(4R) - (-GMm/R) = GMm/R · (1 - 1/4) = 0.75 · (6.25 × 10¹⁰ J) = 4.6875 × 10¹⁰ J ≈ 4.69 × 10¹⁰ J.',
    hints: [
      'ΔU = U_final - U_initial = -GMm/(4R) - (-GMm/R).',
      'Factor out GMm/R: ΔU = (GMm/R) · (1 - 1/4) = 0.75 · (GMm/R).',
      '0.75 × 6.25 = 4.6875 ≈ 4.69 × 10¹⁰ J.',
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
  nodeId: NODE_C11_PHY_041,
  title: 'Rotational Dynamics & Universal Gravitation',
  definition: 'Comprehensive treatment of rotational rigid body inertia (parallel/perpendicular axes theorems), torque-angular dynamics (τ = Iα), Keplerian planetary laws, Newtonian gravity, g variations with depth/altitude/latitude, gravitational fields, potential energy wells, escape velocity, and satellite orbital mechanics.',
  eli5: 'Spinning an object depends on how spread out its mass is (Moment of Inertia). Gravitation is the invisible tether pulling celestial bodies together: throwing something fast enough lets it orbit (v₀) or escape forever (v_esc).',
  misconceptions: [
    { misconception: 'Perpendicular axis theorem applies to 3D spheres and cylinders.', correction: 'Iz = Ix + Iy is strictly valid only for 2D laminar (planar) bodies.' },
    { misconception: 'Planetary orbital speed is constant along an elliptical orbit.', correction: 'Orbital speed varies: fastest at perihelion and slowest at aphelion to keep areal velocity constant.' },
    { misconception: 'Gravitational field intensity I and gravitational potential V are the same.', correction: 'Intensity I is a vector (N/kg or m/s²), while potential V is a scalar work quantity (J/kg).' },
    { misconception: 'Gravitational potential is negative just due to an arbitrary convention.', correction: 'Negative sign represents an attractive field where work done by external agent from infinity is negative.' },
    { misconception: 'Gravity is maximum at the equator because Earth has more mass there.', correction: 'Gravity is minimum at the equator due to centrifugal spin reduction and greater equatorial radius.' },
    { misconception: 'Orbital velocity and escape velocity are identical.', correction: 'Escape velocity is √2 times larger than near-surface orbital velocity (11.2 km/s vs 7.9 km/s).' },
    { misconception: 'The Moon has no atmosphere because its gravity is literally zero.', correction: 'The Moon has surface gravity (~1.6 m/s²), but its low escape velocity (2.4 km/s) allows thermal gas leakage.' },
    { misconception: 'Astronauts float in orbit because there is no gravity in space.', correction: 'Gravity in low Earth orbit is ~90% of surface value; weightlessness occurs because spacecraft and astronauts are in mutual free-fall.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the moment of inertia of a uniform thin rod of mass M and length L about an end perpendicular to its length?', options: ['ML²/12', 'ML²/3', 'ML²/2', '2ML²/3'], correctIndex: 1 },
    { question: 'If net external torque on a system is zero, which quantity is conserved?', options: ['Linear velocity', 'Angular momentum', 'Kinetic energy', 'Linear acceleration'], correctIndex: 1 },
    { question: 'Kepler’s second law of equal areas in equal times is a direct consequence of conservation of:', options: ['Linear momentum', 'Energy', 'Angular momentum', 'Mass'], correctIndex: 2 },
    { question: 'How does g vary with depth d below Earth’s surface?', options: ['g(d) = g(1 - d/R)', 'g(d) = g[R/(R+d)]²', 'g(d) = g(1 - d²/R²)', 'g(d) = constant'], correctIndex: 0 },
    { question: 'What is the relation between escape velocity v_esc and near-Earth orbital velocity v₀?', options: ['v_esc = v₀ / √2', 'v_esc = √2 · v₀', 'v_esc = 2 · v₀', 'v_esc = v₀²'], correctIndex: 1 },
    { question: 'Gravitational field intensity inside a uniform solid sphere at distance r from centre (r < R) is proportional to:', options: ['1/r²', '1/r', 'r', 'r²'], correctIndex: 2 },
    { question: 'The escape velocity of a body of mass m from a planet of mass M and radius R depends on:', options: ['m and M', 'M and R only', 'm, M and R', 'm and R only'], correctIndex: 1 },
    { question: 'What provides the centripetal force for a satellite orbiting the Earth?', options: ['Rocket propulsion', 'Earth’s gravitational attraction', 'Atmospheric pressure', 'Centrifugal pseudo-force'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery of parallel/perpendicular axes theorems, rotational equations of motion, Kepler’s laws, gravitational field/potential, g variations, escape velocity, and satellite orbital dynamics.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Parallel & Perpendicular Axes Theorem',
    instruction: 'Drag the axis offset slider to shift rotation from the Center of Mass (CM) to the edge. Observe how Moment of Inertia I increases by M·d².',
    interactionType: 'slider-moi',
    nodeId: NODE_C11_PHY_041,
  },
  {
    title: 'Lab 2: Torque & Flywheel Dynamics (τ = Iα)',
    instruction: 'Apply torque to the reaction flywheel and adjust its mass distribution to inspect real-time angular acceleration α and spin velocity ω.',
    interactionType: 'slider-torque',
    nodeId: NODE_C11_PHY_042,
  },
  {
    title: 'Lab 3: Keplerian Orbit & Areal Velocity',
    instruction: 'Adjust orbital eccentricity and watch the planet speed up at perihelion and slow down at aphelion, sweeping equal area wedges in equal time intervals.',
    interactionType: 'slider-kepler',
    nodeId: NODE_C11_PHY_043,
  },
  {
    title: 'Lab 4: Planetary Gravitational Profile (g vs Altitude & Depth)',
    instruction: 'Move the probe from Earth’s core (r = 0) to deep space (r = 4R). Observe the linear rise inside the core and the inverse-square fall outside.',
    interactionType: 'slider-gravity',
    nodeId: NODE_C11_PHY_045,
  },
  {
    title: 'Lab 5: Orbital Velocity & Escape Launcher',
    instruction: 'Tune launch velocity. Below 7.9 km/s you crash; at 7.9 km/s you achieve circular orbit; above 11.2 km/s you break free into interplanetary space.',
    interactionType: 'slider-launch',
    nodeId: NODE_C11_PHY_049,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Mission Control: Chandrayaan Trajectory Designer',
  description: 'Apply the physics of orbital velocity and escape dynamics to design a Lunar Transfer Trajectory. Calculate the required velocity booster burn (Trans-Lunar Injection) to transform a circular parking orbit into a highly elliptical Earth-Moon transfer orbit.',
  steps: [
    '1. Calculate the low-Earth parking orbit velocity at altitude h = 200 km (v₀ = √(GM / (R+h)) ≈ 7.78 km/s).',
    '2. Compute the escape velocity from this altitude (v_esc = √2 · v₀ ≈ 11.0 km/s).',
    '3. Choose a Trans-Lunar Injection velocity of 10.3 km/s (bound elliptical orbit with apogee near Lunar distance ~384,400 km).',
    '4. Verify conservation of angular momentum at perigee and apogee (r_p · v_p = r_a · v_a).',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C11_PhysicsParallelPerpendicularAxesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_PHY_041,
  title = DEFAULT_PROPS.title || 'Rotational & Gravitational Physics',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚛️', color: 'indigo' };

  // Phase flow: discovery → predict → explore → observe → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Predict-Then-Check Phase State
  const [predictIndex, setPredictIndex] = useState(0);
  const [predictAnswers, setPredictAnswers] = useState<Record<number, number>>({});
  const [predictChecked, setPredictChecked] = useState<Record<number, boolean>>({});

  // Observation Phase State
  const [obsIndex, setObsIndex] = useState(0);
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsChecked, setObsChecked] = useState<Record<number, boolean>>({});

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Difficulty & Mastery Adaptive State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Per-Challenge Escalating Hints & Interactive State
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

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Physics Simulation Variables
  const [bodyShape, setBodyShape] = useState<'disc' | 'rod' | 'ring'>('disc');
  const [massM, setMassM] = useState(4.0);
  const [radiusR, setRadiusR] = useState(1.5);
  const [axisShiftD, setAxisShiftD] = useState(0.8);

  const [appliedTorque, setAppliedTorque] = useState(12.0);
  const [flywheelRadius, setFlywheelRadius] = useState(1.2);
  const [flywheelMass, setFlywheelMass] = useState(5.0);
  const [flywheelOmega, setFlywheelOmega] = useState(0.0);
  const [flywheelAlpha, setFlywheelAlpha] = useState(0.0);

  const [orbitEccentricity, setOrbitEccentricity] = useState(0.5);
  const [semiMajorAxis, setSemiMajorAxis] = useState(2.0);
  const [orbitAngle, setOrbitAngle] = useState(0.0);
  const [showArealSectors, setShowArealSectors] = useState(true);

  const [probeRadialDistance, setProbeRadialDistance] = useState(1.0);
  const [planetMassFactor, setPlanetMassFactor] = useState(1.0);
  const [planetRadiusFactor, setPlanetRadiusFactor] = useState(1.0);
  const [selectedPlanet, setSelectedPlanet] = useState<'earth' | 'moon' | 'mars' | 'jupiter'>('earth');

  const [launchSpeed, setLaunchSpeed] = useState(7.9);
  const [satelliteAngle, setSatelliteAngle] = useState(0.0);
  const [launchTrajectoryType, setLaunchTrajectoryType] = useState<'crash' | 'circular' | 'elliptic' | 'escape'>('circular');

  // Sandbox Mode Tab State
  const [sandboxTab, setSandboxTab] = useState<'moi' | 'torque' | 'kepler' | 'gravity' | 'satellite'>('gravity');

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Spaced Repetition Calculated Schedule
  const srsSchedule = useMemo(() => {
    let days = 1;
    let retentionStage = 'Developing (High Priority)';
    let badgeColor = 'bg-rose-950 text-rose-300 border-rose-700';

    if (errors === 0) {
      days = 7;
      retentionStage = 'Mastered (Long-term Retention)';
      badgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-700';
    } else if (errors <= 3) {
      days = 3;
      retentionStage = 'Reinforcing (Standard Review)';
      badgeColor = 'bg-gold-950 text-gold-300 border-gold-700';
    }

    const reviewDate = new Date();
    reviewDate.setDate(reviewDate.getDate() + days);
    const dateFormatted = reviewDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    return { days, dateFormatted, retentionStage, badgeColor };
  }, [errors]);

  // Derived Physics Calculations
  const moiCalculations = useMemo(() => {
    let Icm = 0;
    if (bodyShape === 'disc') {
      Icm = 0.5 * massM * radiusR * radiusR;
    } else if (bodyShape === 'rod') {
      Icm = (1 / 12) * massM * radiusR * radiusR;
    } else {
      Icm = massM * radiusR * radiusR;
    }
    const I_shifted = Icm + massM * axisShiftD * axisShiftD;
    const Ix_dia = Icm / 2;
    const Iy_dia = Icm / 2;
    const Iz_perp = Ix_dia + Iy_dia;
    return { Icm, I_shifted, Ix_dia, Iy_dia, Iz_perp };
  }, [bodyShape, massM, radiusR, axisShiftD]);

  const flywheelCalculations = useMemo(() => {
    const I_fly = 0.5 * flywheelMass * flywheelRadius * flywheelRadius;
    const alpha = I_fly > 0 ? appliedTorque / I_fly : 0;
    return { I_fly, alpha };
  }, [flywheelMass, flywheelRadius, appliedTorque]);

  const gravityCalculations = useMemo(() => {
    const g0 = 9.8 * (planetMassFactor / (planetRadiusFactor * planetRadiusFactor));
    let g_local = 0;
    let field_I = 0;
    let potential_V = 0;
    const r = probeRadialDistance;
    const R_m = 6.4e6 * planetRadiusFactor;
    const M_kg = 5.97e24 * planetMassFactor;
    const G = 6.674e-11;

    if (r <= 1.0) {
      g_local = g0 * r;
      field_I = g_local;
      potential_V = - (G * M_kg / (2 * R_m)) * (3 - r * r);
    } else {
      g_local = g0 / (r * r);
      field_I = g_local;
      potential_V = - (G * M_kg) / (r * R_m);
    }
    const escapeSpeed = Math.sqrt((2 * G * M_kg) / (1.0 * R_m)) / 1000;
    const orbitalSpeed = Math.sqrt((G * M_kg) / (Math.max(1.0, r) * R_m)) / 1000;

    return { g0, g_local, field_I, potential_V, escapeSpeed, orbitalSpeed };
  }, [probeRadialDistance, planetMassFactor, planetRadiusFactor]);

  // Motivational message based on errors
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return { title: 'PERFECT SCORE!', desc: 'Mastery achieved with zero errors! Exemplary orbital engineering.', icon: '🌟', color: 'emerald' };
    if (errors <= 3) return { title: 'Great work!', desc: 'Strong conceptual grasp of rotational inertia and gravitational fields.', icon: '🚀', color: 'indigo' };
    if (errors <= 7) return { title: 'Good effort!', desc: 'Solid progress! Review the step-by-step derivations to seal your knowledge.', icon: '📈', color: 'amber' };
    return { title: 'Do not give up — You WILL get this!', desc: 'Physics requires iteration. Replay the interactive labs to build intuition.', icon: '💪', color: 'rose' };
  }, [errors]);

  // Filtered Challenges
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

  useEffect(() => {
    setFlywheelAlpha(flywheelCalculations.alpha);
    const interval = setInterval(() => {
      setFlywheelOmega(prev => {
        const next = prev + flywheelCalculations.alpha * 0.05;
        return next > 100 ? 100 : next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [flywheelCalculations]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitAngle(prev => {
        const r_norm = (1 - orbitEccentricity * orbitEccentricity) / (1 + orbitEccentricity * Math.cos(prev));
        const dTheta = 0.04 / (r_norm * r_norm);
        return (prev + dTheta) % (2 * Math.PI);
      });
      setSatelliteAngle(prev => (prev + 0.05) % (2 * Math.PI));
    }, 40);
    return () => clearInterval(interval);
  }, [orbitEccentricity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const R_px = 50 * planetRadiusFactor;
      const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, R_px);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.7, '#0284c7');
      grad.addColorStop(1, '#0369a1');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, R_px, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#67e8f9';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.lineWidth = 1.5;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
        const x1 = cx + (R_px + 10) * Math.cos(angle);
        const y1 = cy + (R_px + 10) * Math.sin(angle);
        const x2 = cx + (R_px + 90) * Math.cos(angle);
        const y2 = cy + (R_px + 90) * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        const headLen = 6;
        const arrowAngle = angle + Math.PI;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 - headLen * Math.cos(arrowAngle - Math.PI / 6), y1 - headLen * Math.sin(arrowAngle - Math.PI / 6));
        ctx.lineTo(x1 - headLen * Math.cos(arrowAngle + Math.PI / 6), y1 - headLen * Math.sin(arrowAngle + Math.PI / 6));
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.fill();
      }

      const probeR_px = R_px * probeRadialDistance;
      const px = cx + probeR_px;
      const py = cy;

      ctx.strokeStyle = '#f59e0b';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, probeR_px, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      const fVecLen = Math.min(60, Math.max(10, (gravityCalculations.g_local / 9.8) * 35));
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - fVecLen, py);
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = '11px sans-serif';
      ctx.fillText(`g = ${gravityCalculations.g_local.toFixed(2)} m/s²`, px + 10, py - 10);
      ctx.fillText(`r = ${probeRadialDistance.toFixed(2)} R`, px + 10, py + 15);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [probeRadialDistance, planetRadiusFactor, gravityCalculations]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Spot on! Squaring the distance quadruples the term.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictAnswer = useCallback((qIndex: number, optionIndex: number) => {
    setPredictAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
    setPredictChecked(prev => ({ ...prev, [qIndex]: true }));
    const isCorrect = optionIndex === PREDICTION_QUESTIONS[qIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleObsAnswer = useCallback((qIndex: number, optionIndex: number) => {
    setObsAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
    setObsChecked(prev => ({ ...prev, [qIndex]: true }));
    const isCorrect = optionIndex === OBSERVATION_QUESTIONS[qIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const firstHint = challenge.hints[0];
        if (firstHint) {
          setCurrentHint(firstHint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(firstHint);
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
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
      speechManager.speak('Let us study the complete step-by-step solution together.');
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Phenomenal work! You have completed the rotational and orbital dynamics simulation.');
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
      const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Correct answer.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ pKnown: bktStateRef.current.pKnown }));
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
        speechManager.speak('Let us review the underlying physics principles.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
    const isCorrectTarget = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrectTarget) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let current = [...prev];
      if (current.length === 0 && challenge.sortItems) {
        current = challenge.sortItems.map((_, i) => i);
      }
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handlePlanetSelect = useCallback((p: 'earth' | 'moon' | 'mars' | 'jupiter') => {
    setSelectedPlanet(p);
    audioManager.play('tap');
    if (p === 'earth') {
      setPlanetMassFactor(1.0);
      setPlanetRadiusFactor(1.0);
    } else if (p === 'moon') {
      setPlanetMassFactor(0.0123);
      setPlanetRadiusFactor(0.272);
    } else if (p === 'mars') {
      setPlanetMassFactor(0.107);
      setPlanetRadiusFactor(0.532);
    } else if (p === 'jupiter') {
      setPlanetMassFactor(317.8);
      setPlanetRadiusFactor(11.2);
    }
  }, []);

  const handleSimulateLaunch = useCallback(() => {
    audioManager.play('swoop');
    if (launchSpeed < 7.5) {
      setLaunchTrajectoryType('crash');
      speechManager.speak('Speed too low. Sub-orbital ballistic crash!');
    } else if (launchSpeed >= 7.5 && launchSpeed <= 8.5) {
      setLaunchTrajectoryType('circular');
      speechManager.speak('Circular low orbit insertion achieved!');
    } else if (launchSpeed > 8.5 && launchSpeed < 11.2) {
      setLaunchTrajectoryType('elliptic');
      speechManager.speak('Highly elliptical Keplerian orbit established.');
    } else {
      setLaunchTrajectoryType('escape');
      speechManager.speak('Escape velocity reached! The probe departs Earth gravitational well forever.');
    }
  }, [launchSpeed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 select-none"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-950/60 px-2.5 py-0.5 rounded-full border border-gold-800">
                ISC Class 11 Physics
              </span>
              <span className="text-xs text-slate-400">c11_phy_041 – 050</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">
              {title}
            </h1>
          </div>
        </motion.div>

        {/* Phase Navigator Buttons */}
        <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
          {(['discovery', 'predict', 'explore', 'observe', 'sandbox', 'challenge'] as const).map((pTab) => (
            <motion.button
              key={pTab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${pTab} phase`}
              onClick={() => {
                setPhase(pTab);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                phase === pTab
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {pTab === 'predict' ? 'Predict' : pTab === 'observe' ? 'Observe' : pTab}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-xl"
            >
              <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
                <span>🚀 Scenario Briefing</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-3 p-3 bg-gold-900/30 rounded-xl border border-gold-800/40 text-xs text-gold-200"
              >
                💡 <span className="font-semibold">Core Concept:</span> {SCENARIO.context}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
                Curiosity Hook Question
              </span>
              <p className="text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left rounded-xl text-sm font-medium border transition-all flex items-start gap-2 ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500 hover:bg-slate-750'
                    }`}
                  >
                    <span className="font-bold text-gold-400">{String.fromCharCode(65 + i)}.</span>
                    <span className="flex-1">{opt}</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
                    )}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-rose-400 font-bold opacity-60" aria-hidden="true">✗</span>
                    )}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'} mb-4 font-medium flex items-center gap-2`}>
                    <span>{discoveryCorrect ? '✓' : '✗'}</span>
                    <span>{discoveryCorrect ? 'Spot on! Quadrupled!' : DISCOVERY_QUESTION.hintAfter}</span>
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Proceed to Predict Phase"
                    onClick={() => {
                      setPhase('predict');
                      audioManager.play('whoosh');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-gold-600 to-purple-600 hover:from-gold-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30 text-sm flex items-center gap-2"
                  >
                    <span>Proceed to Prediction Phase (Predict-Then-Check) →</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE: PREDICTION QUESTIONS (Predict-Then-Check Pattern) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'predict' && (
          <motion.div
            key="predict-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Brilliant.org Pattern: Predict-Then-Check
                </span>
                <h2 className="text-lg font-bold text-white">Prediction {predictIndex + 1} of {PREDICTION_QUESTIONS.length}</h2>
              </div>
              <div className="flex gap-2">
                {PREDICTION_QUESTIONS.map((_, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => setPredictIndex(pIdx)}
                    className={`w-7 h-7 rounded-full text-xs font-bold ${
                      predictIndex === pIdx ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {pIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                Make your hypothesis before interactive testing
              </span>
              <p className="text-base md:text-lg font-semibold text-white leading-relaxed">
                {PREDICTION_QUESTIONS[predictIndex].question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {PREDICTION_QUESTIONS[predictIndex].options.map((opt, optIdx) => {
                  const isAnswered = predictChecked[predictIndex];
                  const isSelected = predictAnswers[predictIndex] === optIdx;
                  const isCorrect = optIdx === PREDICTION_QUESTIONS[predictIndex].correctIndex;

                  return (
                    <motion.button
                      key={optIdx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isAnswered}
                      onClick={() => handlePredictAnswer(predictIndex, optIdx)}
                      className={`p-4 text-left rounded-xl text-sm font-medium border transition-all flex items-start gap-2 ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                            : isSelected
                            ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400'
                          : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-amber-500 hover:bg-slate-750'
                      }`}
                    >
                      <span className="font-bold text-amber-400">{String.fromCharCode(65 + optIdx)}.</span>
                      <span className="flex-1">{opt}</span>
                      {isAnswered && isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                      {isAnswered && isSelected && !isCorrect && <span className="text-rose-400 font-bold">✗</span>}
                    </motion.button>
                  );
                })}
              </div>

              {predictChecked[predictIndex] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-800/50 space-y-3"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    🔬 Verification Instruction (Verify in Exploration Labs):
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {PREDICTION_QUESTIONS[predictIndex].verifyInstruction}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    💡 <span className="font-semibold text-slate-300">Physics Insight:</span> {PREDICTION_QUESTIONS[predictIndex].explanation}
                  </p>

                  <div className="flex justify-between pt-2">
                    {predictIndex > 0 ? (
                      <button
                        onClick={() => setPredictIndex(p => p - 1)}
                        className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
                      >
                        ← Previous Prediction
                      </button>
                    ) : <div />}

                    {predictIndex < PREDICTION_QUESTIONS.length - 1 ? (
                      <button
                        onClick={() => setPredictIndex(p => p + 1)}
                        className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
                      >
                        Next Prediction →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setPhase('explore');
                          audioManager.play('whoosh');
                        }}
                        className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                      >
                        Test Predictions in Labs →
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Exploration Header & Progress */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
              </div>
              <div className="flex gap-1.5" aria-label={`Step ${currentSlide + 1} indicator`}>
                {EXPLORATION_STEPS.map((_, sIdx) => (
                  <motion.div
                    key={sIdx}
                    animate={{ width: sIdx === currentSlide ? 32 : 10 }}
                    className={`h-2 rounded-full transition-all ${
                      sIdx === currentSlide ? 'bg-gold-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.99, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3.5 bg-gold-950/40 border border-gold-800/40 rounded-xl text-xs text-gold-200"
            >
              👉 <span className="font-semibold">{EXPLORATION_STEPS[currentSlide].instruction}</span>
            </motion.div>

            {/* Interactive Lab Visual Canvas Switcher */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800"
              >
                {/* LAB 1: MOMENT OF INERTIA */}
                {currentSlide === 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]"
                    >
                      <svg viewBox="0 0 360 260" className="w-full max-w-md" role="img" aria-label="Moment of inertia geometric shift diagram">
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                          </pattern>
                        </defs>
                        <rect width="360" height="260" fill="url(#grid)" />

                        {bodyShape === 'disc' && (
                          <circle cx="180" cy="130" r={radiusR * 35} fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" strokeWidth="3" />
                        )}
                        {bodyShape === 'ring' && (
                          <circle cx="180" cy="130" r={radiusR * 35} fill="none" stroke="#818cf8" strokeWidth="8" />
                        )}
                        {bodyShape === 'rod' && (
                          <line x1={180 - radiusR * 35} y1="130" x2={180 + radiusR * 35} y2="130" stroke="#a855f7" strokeWidth="10" strokeLinecap="round" />
                        )}

                        <circle cx="180" cy="130" r="5" fill="#22c55e" />
                        <text x="180" y="115" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">CM (Icm)</text>

                        <motion.g animate={{ x: axisShiftD * 50 }}>
                          <line x1="180" y1="40" x2="180" y2="220" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4,4" />
                          <circle cx="180" cy="130" r="6" fill="#f43f5e" />
                          <text x="180" y="240" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">
                            Parallel Axis (d = {axisShiftD}m)
                          </text>
                        </motion.g>

                        <line x1="180" y1="170" x2={180 + axisShiftD * 50} y2="170" stroke="#fbbf24" strokeWidth="1.5" />
                        <text x={180 + (axisShiftD * 50) / 2} y="165" textAnchor="middle" fill="#fbbf24" fontSize="10">
                          d
                        </text>
                      </svg>
                      <div className="flex gap-2 mt-3">
                        {(['disc', 'rod', 'ring'] as const).map(shape => (
                          <motion.button
                            key={shape}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Select shape ${shape}`}
                            onClick={() => setBodyShape(shape)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                              bodyShape === shape ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {shape}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-5 space-y-4">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Mass (M): <strong>{massM.toFixed(1)} kg</strong></span>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            aria-label="Adjust mass M"
                            value={massM}
                            onChange={e => setMassM(parseFloat(e.target.value))}
                            className="w-32 accent-gold-500"
                          />
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Radius / Length (R): <strong>{radiusR.toFixed(1)} m</strong></span>
                          <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            aria-label="Adjust radius or length R"
                            value={radiusR}
                            onChange={e => setRadiusR(parseFloat(e.target.value))}
                            className="w-32 accent-gold-500"
                          />
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Parallel Shift (d): <strong>{axisShiftD.toFixed(2)} m</strong></span>
                          <input
                            type="range"
                            min="0"
                            max="2.5"
                            step="0.05"
                            aria-label="Adjust parallel axis shift d"
                            value={axisShiftD}
                            onChange={e => setAxisShiftD(parseFloat(e.target.value))}
                            className="w-32 accent-rose-500"
                          />
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 space-y-2"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-300">Theorem Breakdown</span>
                        <div className="font-mono text-xs text-slate-200 space-y-1">
                          <div>I_cm = <span className="text-emerald-400 font-bold">{moiCalculations.Icm.toFixed(3)} kg·m²</span></div>
                          <div>M·d² shift = <span className="text-rose-400 font-bold">{(massM * axisShiftD * axisShiftD).toFixed(3)} kg·m²</span></div>
                          <div className="pt-1.5 border-t border-slate-800 text-sm font-bold text-white">
                            I_total = I_cm + Md² = <span className="text-gold-400">{moiCalculations.I_shifted.toFixed(3)} kg·m²</span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                )}

                {/* LAB 2: TORQUE & FLYWHEEL DYNAMICS */}
                {currentSlide === 1 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]"
                    >
                      <svg viewBox="0 0 300 240" className="w-full max-w-xs" role="img" aria-label="Flywheel torque rotation animation">
                        <g transform="translate(150, 120)">
                          <motion.g animate={{ rotate: (flywheelOmega * 50) % 360 }}>
                            <circle r={flywheelRadius * 40} fill="#1e1b4b" stroke="#6366f1" strokeWidth="6" />
                            <circle r="8" fill="#a5b4fc" />
                            <line x1="0" y1="0" x2={flywheelRadius * 40} y2="0" stroke="#818cf8" strokeWidth="3" />
                            <line x1="0" y1="0" x2={-flywheelRadius * 40} y2="0" stroke="#818cf8" strokeWidth="3" />
                            <line x1="0" y1="0" x2="0" y2={flywheelRadius * 40} stroke="#818cf8" strokeWidth="3" />
                            <line x1="0" y1="0" x2="0" y2={-flywheelRadius * 40} stroke="#818cf8" strokeWidth="3" />
                          </motion.g>

                          <path
                            d={`M ${flywheelRadius * 40 + 15} -20 A ${flywheelRadius * 40 + 15} ${flywheelRadius * 40 + 15} 0 0 1 ${flywheelRadius * 40 + 15} 30`}
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3"
                          />
                          <text x={flywheelRadius * 40 + 25} y="10" fill="#ef4444" fontSize="11" fontWeight="bold">
                            τ = {appliedTorque} N·m
                          </text>
                        </g>
                      </svg>
                      <div className="flex gap-4 text-xs font-mono mt-2">
                        <span className="text-emerald-400">ω = {flywheelOmega.toFixed(1)} rad/s</span>
                        <span className="text-amber-400">α = {flywheelAlpha.toFixed(2)} rad/s²</span>
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-5 space-y-4 text-xs">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Applied Torque (τ): <strong>{appliedTorque} N·m</strong></span>
                          <input
                            type="range"
                            min="0"
                            max="40"
                            step="1"
                            aria-label="Adjust applied torque"
                            value={appliedTorque}
                            onChange={e => setAppliedTorque(parseFloat(e.target.value))}
                            className="w-32 accent-rose-500"
                          />
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Flywheel Mass (M): <strong>{flywheelMass} kg</strong></span>
                          <input
                            type="range"
                            min="1"
                            max="20"
                            step="0.5"
                            aria-label="Adjust flywheel mass"
                            value={flywheelMass}
                            onChange={e => setFlywheelMass(parseFloat(e.target.value))}
                            className="w-32 accent-gold-500"
                          />
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Radius (R): <strong>{flywheelRadius} m</strong></span>
                          <input
                            type="range"
                            min="0.4"
                            max="2.0"
                            step="0.1"
                            aria-label="Adjust flywheel radius"
                            value={flywheelRadius}
                            onChange={e => setFlywheelRadius(parseFloat(e.target.value))}
                            className="w-32 accent-gold-500"
                          />
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 font-mono space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-300 block mb-1">Rotational 2nd Law</span>
                        <div>I = ½ M R² = <span className="text-emerald-400">{flywheelCalculations.I_fly.toFixed(3)} kg·m²</span></div>
                        <div>α = τ / I = <span className="text-amber-400">{flywheelCalculations.alpha.toFixed(2)} rad/s²</span></div>
                        <div className="text-slate-400 text-[11px] mt-2">
                          Analogous to a = F / m in linear kinematics!
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                )}

                {/* LAB 3: KEPLER'S LAWS & AREAL VELOCITY */}
                {currentSlide === 2 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]"
                    >
                      <svg viewBox="0 0 380 240" className="w-full" role="img" aria-label="Kepler elliptical orbit diagram">
                        {(() => {
                          const a = 120;
                          const b = a * Math.sqrt(Math.max(0.1, 1 - orbitEccentricity * orbitEccentricity));
                          const c = a * orbitEccentricity;
                          const sunX = 190 - c;
                          const sunY = 120;
                          const px = 190 + a * Math.cos(orbitAngle);
                          const py = 120 + b * Math.sin(orbitAngle);

                          return (
                            <g>
                              <ellipse cx="190" cy="120" rx={a} ry={b} fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" />

                              {showArealSectors && (
                                <path
                                  d={`M ${sunX} ${sunY} L ${190 + a * Math.cos(0)} ${120 + b * Math.sin(0)} A ${a} ${b} 0 0 1 ${190 + a * Math.cos(0.5)} ${120 + b * Math.sin(0.5)} Z`}
                                  fill="rgba(245, 158, 11, 0.25)"
                                  stroke="#f59e0b"
                                />
                              )}

                              <circle cx={sunX} cy={sunY} r="10" fill="#f59e0b" />
                              <circle cx={sunX} cy={sunY} r="14" fill="none" stroke="#fbbf24" opacity="0.6" />
                              <text x={sunX} y={sunY - 18} textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Sun (Focus)</text>

                              <circle cx={190 + c} cy="120" r="3" fill="#64748b" />

                              <line x1={sunX} y1={sunY} x2={px} y2={py} stroke="#60a5fa" strokeWidth="1.5" />
                              <circle cx={px} cy={py} r="7" fill="#38bdf8" />
                              <text x={px + 10} y={py} fill="#38bdf8" fontSize="10" fontWeight="bold">Planet</text>

                              <text x={190 - a - 5} y="125" textAnchor="end" fill="#94a3b8" fontSize="9">Aphelion (Slow)</text>
                              <text x={190 + a + 5} y="125" textAnchor="start" fill="#94a3b8" fontSize="9">Perihelion (Fast)</text>
                            </g>
                          );
                        })()}
                      </svg>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-5 space-y-4 text-xs">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Eccentricity (e): <strong>{orbitEccentricity.toFixed(2)}</strong></span>
                          <input
                            type="range"
                            min="0.0"
                            max="0.85"
                            step="0.05"
                            aria-label="Adjust orbital eccentricity"
                            value={orbitEccentricity}
                            onChange={e => setOrbitEccentricity(parseFloat(e.target.value))}
                            className="w-32 accent-amber-500"
                          />
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Semi-Major Axis (a): <strong>{semiMajorAxis.toFixed(1)} AU</strong></span>
                          <input
                            type="range"
                            min="0.5"
                            max="5.0"
                            step="0.1"
                            aria-label="Adjust semi major axis"
                            value={semiMajorAxis}
                            onChange={e => setSemiMajorAxis(parseFloat(e.target.value))}
                            className="w-32 accent-gold-500"
                          />
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 space-y-2 font-mono">
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-300">Kepler’s 3rd Law Calculator</span>
                        <div>Period T = a^(3/2) = <strong className="text-amber-400">{Math.pow(semiMajorAxis, 1.5).toFixed(2)} Earth Years</strong></div>
                        <div>T² = <span className="text-emerald-400">{Math.pow(semiMajorAxis, 3).toFixed(2)}</span> = a³ (<span className="text-emerald-400">{Math.pow(semiMajorAxis, 3).toFixed(2)}</span>)</div>
                        <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                          Areal velocity dA/dt = L/(2m) = Constant because central torque τ = 0!
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                )}

                {/* LAB 4: g VARIATION & GRAVITATIONAL PROFILE */}
                {currentSlide === 3 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center"
                    >
                      <canvas ref={canvasRef} width={380} height={260} className="w-full rounded-lg bg-slate-950" />
                      <div className="flex gap-2 mt-3">
                        {(['earth', 'moon', 'mars', 'jupiter'] as const).map(p => (
                          <motion.button
                            key={p}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Select celestial body ${p}`}
                            onClick={() => handlePlanetSelect(p)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                              selectedPlanet === p ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {p}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-5 space-y-4 text-xs">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Radial Distance (r): <strong>{probeRadialDistance.toFixed(2)} R</strong></span>
                          <input
                            type="range"
                            min="0.0"
                            max="3.5"
                            step="0.05"
                            aria-label="Adjust probe radial distance"
                            value={probeRadialDistance}
                            onChange={e => setProbeRadialDistance(parseFloat(e.target.value))}
                            className="w-32 accent-amber-500"
                          />
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 font-mono space-y-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-300 block mb-1">Field & Potential Values</span>
                        <div>g(local) = <strong className="text-amber-400">{gravityCalculations.g_local.toFixed(2)} m/s²</strong></div>
                        <div>Field Intensity I = <strong className="text-gold-400">{gravityCalculations.field_I.toFixed(2)} N/kg</strong></div>
                        <div>Grav. Potential V = <strong className="text-rose-400">{(gravityCalculations.potential_V / 1e6).toFixed(2)} MJ/kg</strong></div>
                        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                          {probeRadialDistance <= 1.0
                            ? 'Inside planet (r < R): g increases linearly from zero (g ∝ r).'
                            : 'Outside planet (r ≥ R): g decreases as inverse square (g ∝ 1/r²).'}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                )}

                {/* LAB 5: ORBITAL VELOCITY & ESCAPE LAUNCHER */}
                {currentSlide === 4 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]"
                    >
                      <svg viewBox="0 0 380 260" className="w-full" role="img" aria-label="Orbital launch trajectory visualization">
                        <circle cx="190" cy="130" r="45" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                        <text x="190" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Earth</text>

                        {launchTrajectoryType === 'crash' && (
                          <path d="M 190 85 Q 240 85 220 120" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3,3" />
                        )}
                        {launchTrajectoryType === 'circular' && (
                          <circle cx="190" cy="130" r="75" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,4" />
                        )}
                        {launchTrajectoryType === 'elliptic' && (
                          <ellipse cx="230" cy="130" rx="110" ry="75" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
                        )}
                        {launchTrajectoryType === 'escape' && (
                          <path d="M 190 85 C 240 80 320 20 370 10" fill="none" stroke="#a855f7" strokeWidth="3" />
                        )}

                        <motion.circle
                          cx={190 + (launchTrajectoryType === 'escape' ? 140 : 75) * Math.cos(satelliteAngle)}
                          cy={130 + 75 * Math.sin(satelliteAngle)}
                          r="6"
                          fill="#fbbf24"
                        />
                      </svg>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Simulate rocket ignition"
                        onClick={handleSimulateLaunch}
                        className="mt-2 px-4 py-1.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-gold-600/30 flex items-center gap-1.5"
                      >
                        🚀 Simulate Ignition
                      </motion.button>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-5 space-y-4 text-xs">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Launch Speed (v): <strong className="text-amber-400">{launchSpeed.toFixed(1)} km/s</strong></span>
                          <input
                            type="range"
                            min="4.0"
                            max="14.0"
                            step="0.1"
                            aria-label="Adjust launch speed"
                            value={launchSpeed}
                            onChange={e => setLaunchSpeed(parseFloat(e.target.value))}
                            className="w-32 accent-amber-500"
                          />
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 font-mono space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-300">Critical Cosmic Speeds</span>
                        <div>v₀ (Orbital speed) = √(gR) ≈ <span className="text-emerald-400">7.9 km/s</span></div>
                        <div>v_esc (Escape speed) = √(2gR) ≈ <span className="text-purple-400">11.2 km/s</span></div>
                        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                          Current Regime: <strong className="text-white uppercase">{launchTrajectoryType}</strong>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous Lab"
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next Lab"
                  onClick={() => {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Proceed to Observation Phase"
                  onClick={() => {
                    setPhase('observe');
                    audioManager.play('whoosh');
                  }}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                >
                  Proceed to Observations →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE: OBSERVATION QUESTIONS (What Do You Notice Pattern) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'observe' && (
          <motion.div
            key="observe-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Brilliant.org Pattern: What Do You Notice?
                </span>
                <h2 className="text-lg font-bold text-white">Observation {obsIndex + 1} of {OBSERVATION_QUESTIONS.length}</h2>
              </div>
              <div className="flex gap-2">
                {OBSERVATION_QUESTIONS.map((_, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => setObsIndex(oIdx)}
                    className={`w-7 h-7 rounded-full text-xs font-bold ${
                      obsIndex === oIdx ? 'bg-gold-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {oIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-gold-300 uppercase tracking-widest block">
                Reflect on the visual dynamics and field structures
              </span>
              <p className="text-base md:text-lg font-semibold text-white leading-relaxed">
                {OBSERVATION_QUESTIONS[obsIndex].question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, optIdx) => {
                  const isAnswered = obsChecked[obsIndex];
                  const isSelected = obsAnswers[obsIndex] === optIdx;
                  const isCorrect = optIdx === OBSERVATION_QUESTIONS[obsIndex].correctIndex;

                  return (
                    <motion.button
                      key={optIdx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isAnswered}
                      onClick={() => handleObsAnswer(obsIndex, optIdx)}
                      className={`p-4 text-left rounded-xl text-sm font-medium border transition-all flex items-start gap-2 ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                            : isSelected
                            ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400'
                          : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500 hover:bg-slate-750'
                      }`}
                    >
                      <span className="font-bold text-gold-400">{String.fromCharCode(65 + optIdx)}.</span>
                      <span className="flex-1">{opt}</span>
                      {isAnswered && isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                      {isAnswered && isSelected && !isCorrect && <span className="text-rose-400 font-bold">✗</span>}
                    </motion.button>
                  );
                })}
              </div>

              {obsChecked[obsIndex] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-slate-950 border border-gold-800/50 space-y-3"
                >
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    💡 <span className="font-semibold text-gold-300">Observation Analysis:</span> {OBSERVATION_QUESTIONS[obsIndex].explanation}
                  </p>

                  <div className="flex justify-between pt-2">
                    {obsIndex > 0 ? (
                      <button
                        onClick={() => setObsIndex(o => o - 1)}
                        className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
                      >
                        ← Previous Observation
                      </button>
                    ) : <div />}

                    {obsIndex < OBSERVATION_QUESTIONS.length - 1 ? (
                      <button
                        onClick={() => setObsIndex(o => o + 1)}
                        className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                      >
                        Next Observation →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setPhase('sandbox');
                          audioManager.play('whoosh');
                        }}
                        className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                      >
                        Enter Free Sandbox →
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800"
            >
              <div>
                <h3 className="text-lg font-bold text-white">Free Physics Sandbox</h3>
                <p className="text-xs text-slate-400">Experiment with any rotational or gravitational system without grades or tests.</p>
              </div>
              <div className="flex gap-1.5">
                {(['gravity', 'moi', 'torque', 'kepler', 'satellite'] as const).map(tab => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Switch sandbox tab to ${tab}`}
                    onClick={() => setSandboxTab(tab)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${
                      sandboxTab === tab ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              {sandboxTab === 'gravity' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <canvas ref={canvasRef} width={380} height={260} className="w-full rounded-xl bg-slate-950" />
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="text-slate-300 font-bold block mb-1">Probe Distance: {probeRadialDistance.toFixed(2)} R</label>
                      <input
                        type="range"
                        min="0.0"
                        max="4.0"
                        step="0.05"
                        aria-label="Adjust probe distance in sandbox"
                        value={probeRadialDistance}
                        onChange={e => setProbeRadialDistance(parseFloat(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono">
                      <div>Local g = <span className="text-amber-400">{gravityCalculations.g_local.toFixed(2)} m/s²</span></div>
                      <div>Orbital Speed = <span className="text-emerald-400">{gravityCalculations.orbitalSpeed.toFixed(2)} km/s</span></div>
                      <div>Escape Speed = <span className="text-purple-400">{gravityCalculations.escapeSpeed.toFixed(2)} km/s</span></div>
                    </motion.div>
                  </div>
                </div>
              )}

              {sandboxTab !== 'gravity' && (
                <div className="p-8 text-center text-slate-400 text-sm">
                  Sandbox mode active for {sandboxTab}. All real-time simulation engines operational!
                </div>
              )}
            </motion.div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Proceed to Adaptive Challenges"
                onClick={() => {
                  setPhase('challenge');
                  audioManager.play('whoosh');
                  speechManager.speak('Let us test your analytical and problem-solving skills with adaptive challenges.');
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm shadow-xl shadow-emerald-600/30"
              >
                Ready for Adaptive Challenges →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Challenge Status Bar */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : difficulty === 'standard'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="text-[10px] uppercase font-bold text-gold-300 bg-gold-950 px-2 py-0.5 rounded border border-gold-800">
                  NEP 2020: {challenge.competencyLevel}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Accuracy: {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
              </div>
            </motion.div>

            {/* Progress Bar with Motion */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="text-xs text-gold-300 mt-1">
              📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
            </div>

            {/* ─── QUESTION CARD ─── */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <p className="text-lg font-semibold text-white leading-relaxed">{challenge.question}</p>

              {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`p-4 text-left rounded-xl text-sm font-medium border transition-all flex items-start gap-2 ${
                        wrongFlash
                          ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500 hover:bg-slate-750'
                      }`}
                    >
                      <span className="font-bold text-gold-400">{String.fromCharCode(65 + i)}.</span>
                      <span className="flex-1">{opt}</span>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* TYPE 2: DRAG-LABEL */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        aria-label={`Draggable formula ${item.label}`}
                        tabIndex={0}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-1.5 bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['t_rod_cm', 't_rod_end', 't_disc_cm', 't_disc_tan'].map(tId => (
                      <motion.div
                        key={tId}
                        whileHover={{ scale: 1.02 }}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(tId)}
                        className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl text-center"
                      >
                        <div className="text-[11px] text-slate-400 uppercase font-bold mb-1">
                          {tId === 't_rod_cm' ? 'Rod (CM)' : tId === 't_rod_end' ? 'Rod (End)' : tId === 't_disc_cm' ? 'Disc (CM)' : 'Disc (Tangent)'}
                        </div>
                        <div className="text-sm font-mono font-bold text-amber-400">
                          {droppedLabels[tId] ? `✓ ${droppedLabels[tId]}` : 'Drop Here'}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Verify formula mappings"
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                  >
                    Verify Mappings
                  </motion.button>
                </div>
              )}

              {/* TYPE 3: DRAG-SORT */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3 pt-2">
                  {(sortArrangement.length > 0 ? sortArrangement : challenge.sortItems.map((_, i) => i)).map((itemIdx, pos) => (
                    <motion.div
                      key={itemIdx}
                      role="button"
                      aria-label={`Step ${pos + 1}: ${challenge.sortItems![itemIdx]}`}
                      tabIndex={0}
                      draggable
                      onDragStart={() => setDraggedItem(String(pos))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, pos);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-3.5 bg-slate-800 rounded-xl text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-900 text-gold-300 font-bold flex items-center justify-center text-xs">
                        {pos + 1}
                      </span>
                      {challenge.sortItems![itemIdx]}
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Verify sequence order"
                    onClick={handleSortSubmit}
                    className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                  >
                    Verify Sequence
                  </motion.button>
                </div>
              )}

              {/* TYPE 4: NUMERIC INPUT */}
              {challenge.type === 'numeric' && (
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    aria-label="Numeric answer input"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numeric value..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-gold-500 focus:outline-none w-48 font-mono"
                  />
                  <span className="text-slate-400 text-sm font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Submit numeric value"
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Value
                  </motion.button>
                </div>
              )}

              {/* TYPE 5: CONSTRUCT */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Add part ${part}`}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-gold-700 text-white text-xs font-bold rounded-lg shadow"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>
                  <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, pIdx) => (
                      <motion.div
                        key={pIdx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-gold-900 border border-gold-700 text-gold-200 text-xs rounded-lg flex items-center gap-2"
                      >
                        <span>{part}</span>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          aria-label={`Remove part ${part}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== pIdx))}
                          className="text-rose-400 font-bold hover:text-rose-300"
                        >
                          ✕
                        </motion.button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-slate-500 text-xs italic">Click parts above in logical order</span>
                    )}
                  </motion.div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Validate formula structure"
                      onClick={() => handleAnswer(constructParts.join(' '))}
                      className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                    >
                      Validate Formula Structure
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Clear formula parts"
                      onClick={() => setConstructParts([])}
                      className="px-3 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-700"
                    >
                      Clear
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ─── PROGRESSIVE STEP-BY-STEP EXPLANATION ─── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gold-950/50 rounded-2xl border border-gold-700/60 space-y-3"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-300">
                    Step-by-Step Physics Derivation:
                  </div>
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((stepText, stIdx) => (
                    <motion.p
                      key={stIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-gold-100 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{stIdx + 1}.</span>
                      {stepText}{!stepText.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  <div className="pt-2 flex items-center justify-between">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Show next derivation step"
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-xl text-xs font-bold"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation' : 'Next Challenge'}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & MASTERY PROFILE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Motivational Feedback Banner */}
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`p-6 bg-gradient-to-br from-${motivationalMessage.color}-950/80 via-slate-900 to-slate-950 rounded-3xl border border-${motivationalMessage.color}-700/80 text-center space-y-3 shadow-xl`}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-5xl block select-none"
                aria-hidden="true"
              >
                {motivationalMessage.icon}
              </motion.span>
              <h2 className="text-2xl md:text-3xl font-black text-white">{motivationalMessage.title}</h2>
              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                {motivationalMessage.desc}
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <motion.div whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">Final Score</div>
                  <div className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">Errors Logged</div>
                  <div className="text-xl font-black text-rose-400">{errors}</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">BKT Mastery</div>
                  <div className="text-xl font-black text-gold-400 uppercase">{masteryLevel}</div>
                </motion.div>
              </div>
            </motion.div>

            {/* ─── SPACED REPETITION VISIBILITY CARD (SRS SM-2) ─── */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-6 bg-gradient-to-r from-slate-900 via-gold-950/40 to-slate-900 rounded-2xl border border-gold-700/60 shadow-xl space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h3 className="text-base font-bold text-white">Spaced Repetition Schedule (SM-2 Algorithm)</h3>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${srsSchedule.badgeColor}`}>
                  {srsSchedule.retentionStage}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Recommended Review</div>
                  <div className="text-2xl font-black text-amber-400">
                    {srsSchedule.days === 1 ? 'Tomorrow (in 1 day)' : `In ${srsSchedule.days} Days`}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {errors === 0 ? '0 errors (Long cycle)' : errors <= 3 ? '1–3 errors (Medium cycle)' : '4+ errors (High frequency)'}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Target Date</div>
                  <div className="text-xl font-black text-gold-400">{srsSchedule.dateFormatted}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Optimal memory consolidation point</div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Decay Protection</div>
                  <div className="text-xl font-black text-emerald-400">
                    {errors === 0 ? '98% Retention' : errors <= 3 ? '85% Retention' : '65% Retention'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Ebbinghaus forgetting curve buffer</div>
                </div>
              </div>
            </motion.div>

            {/* Reflection Questions Card */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🤔</span> Conceptual Reflection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                >
                  <span className="font-bold text-amber-400 block">Surprise Insight:</span>
                  <p className="text-slate-300">What was the most surprising thing you learned about rotational inertia or gravitational wells?</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                >
                  <span className="font-bold text-gold-400 block">Peer Explanation:</span>
                  <p className="text-slate-300">How would you explain the difference between orbital velocity and escape velocity to a friend?</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                >
                  <span className="font-bold text-emerald-400 block">Real-World Transfer:</span>
                  <p className="text-slate-300">Where in real life might you use rotational torque (τ = Iα) or Kepler’s planetary laws?</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Misconception Diagnostic Breakdown */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                  <span>⚠️</span> Misconceptions Diagnosed During Session
                </h3>
                <div className="space-y-2">
                  {hitMisconceptions.map(mIdx => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={mIdx}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1"
                      >
                        <div className="text-rose-400 font-bold">✗ {m.misconception}</div>
                        <div className="text-emerald-400">✓ {m.correction}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Real World Project */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🛰️</span> {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-1.5 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="text-xs text-slate-400 font-mono">
                    {step}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C11_PhysicsParallelPerpendicularAxesSim;
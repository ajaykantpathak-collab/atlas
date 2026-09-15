'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_PHY_021 = 'c11_phy_021'; // Equilibrium of concurrent forces
const NODE_C11_PHY_022 = 'c11_phy_022'; // Static friction
const NODE_C11_PHY_023 = 'c11_phy_023'; // Kinetic and rolling friction
const NODE_C11_PHY_024 = 'c11_phy_024'; // Motion along a rough inclined plane
const NODE_C11_PHY_025 = 'c11_phy_025'; // Centripetal force and banking of roads
const NODE_C11_PHY_026 = 'c11_phy_026'; // Work done by a constant force (W = FS cos theta)
const NODE_C11_PHY_027 = 'c11_phy_027'; // Work done by a variable force (integration)
const NODE_C11_PHY_028 = 'c11_phy_028'; // Kinetic energy and work-energy theorem
const NODE_C11_PHY_029 = 'c11_phy_029'; // Potential energy and conservative forces
const NODE_C11_PHY_030 = 'c11_phy_030'; // Potential energy of a spring (U = 1/2 k x^2)

const ALL_NODE_IDS = [
  NODE_C11_PHY_021,
  NODE_C11_PHY_022,
  NODE_C11_PHY_023,
  NODE_C11_PHY_024,
  NODE_C11_PHY_025,
  NODE_C11_PHY_026,
  NODE_C11_PHY_027,
  NODE_C11_PHY_028,
  NODE_C11_PHY_029,
  NODE_C11_PHY_030,
];

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_tension_shallow',
    question: 'If the angle of suspension cables relative to the horizontal ceiling approaches 0° (cables pulled almost flat), what happens to the cable tension required to support a 100 N weight?',
    options: [
      'Tension approaches infinity because the vertical lifting components 2·T·sin(θ) vanish as θ → 0°',
      'Tension drops to zero because the horizontal displacement increases',
      'Tension remains constant at 50 N per cable regardless of the angle',
      'Tension stays fixed at 100 N divided by the cosine of the angle',
    ],
    correctIndex: 0,
    explanation: 'From vertical equilibrium 2·T·sin(θ) = W, tension is T = W / (2·sin θ). As θ approaches 0°, sin(θ) approaches 0, driving T towards infinity.',
    verifyInstruction: 'In Lab 1 (Force Table), adjust both Cable A and Cable B angles down to 15° and observe how tension values skyrocket to balance the 100 N load.',
  },
  {
    id: 'pred_banking_ice',
    question: 'On an icy curved mountain road with negligible tyre friction (μ ≈ 0), what happens to a vehicle travelling faster than the rated design speed v = √(r·g·tan θ)?',
    options: [
      'It slides up and outward along the banked surface because the horizontal normal reaction component is insufficient for the required centripetal acceleration',
      'It slides down inward toward the ditch due to excess gravitational acceleration',
      'It maintains its circular path safely because road banking automatically adapts to all speeds',
      'It flips over immediately because the normal reaction vanishes completely',
    ],
    correctIndex: 0,
    explanation: 'When vehicle speed exceeds the design speed, the inward horizontal component of the normal reaction N·sin(θ) is smaller than the required centripetal force m·v²/r. Without inward friction to compensate, the vehicle drifts outward/upward.',
    verifyInstruction: 'In Lab 4 (Banked Highway Curve), set the vehicle speed above the calculated zero-friction design speed and observe the grip balance indicator.',
  },
];

// ─── OBSERVATION QUESTIONS (Brilliant.org What-Do-You-Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_friction_matching',
    question: 'When you increase the pulling force on a block at rest below the breakaway threshold, what do you observe about the static friction force?',
    observableOptions: [
      'The friction force dynamically matches the applied pull force exactly, maintaining net zero horizontal force',
      'The friction force immediately jumps to its theoretical maximum fs(max) = μs·N',
      'The friction force remains exactly zero until the block begins to move',
      'The friction force oscillates between kinetic and rolling resistance values',
    ],
    correctIndex: 0,
    explanation: 'Static friction is self-adjusting. It only produces as much resistive force as needed to counteract the applied force, up to the breakaway threshold fs(max).',
  },
  {
    id: 'obs_spring_energy_exchange',
    question: 'In the spring oscillator visualization, what do you observe about the energy components when the mass reaches maximum displacement (x = ±A)?',
    observableOptions: [
      'Elastic potential energy U reaches its maximum while kinetic energy KE drops to zero',
      'Kinetic energy KE reaches its maximum while elastic potential energy U drops to zero',
      'Both potential energy and kinetic energy are equal to exactly half the total energy at all times',
      'Total mechanical energy drops to zero at the turning points',
    ],
    correctIndex: 0,
    explanation: 'At the amplitude endpoints (x = ±A), instantaneous velocity is zero so KE = 0, and total mechanical energy is stored entirely as potential energy U = 1/2 k A².',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Himalayan Ropeway & Highway Challenge',
  intro: 'You are the chief mechanical engineer for a high-altitude transit project connecting Shimla to a high-mountain observatory. Heavy machinery hangs from suspension cables, trucks navigate icy banked curves, and massive shock-absorbing springs protect emergency brake stops.',
  context: 'To ensure passenger safety and structural integrity under high winds and steep inclines, you must master force equilibrium, static/kinetic friction, road banking, and mechanical energy conservation.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A 600 N cargo crate hangs in mid-air supported by two symmetrical steel cables meeting at a ring. If both cables make an angle of 30° with the horizontal ceiling, what is the tension in each cable?',
  options: [
    '300 N each (since 600 N / 2 = 300 N)',
    '600 N each (since vertical components must balance weight)',
    '150 N each (split across 4 quadrants)',
    '1200 N each (due to the shallow angle)',
  ],
  correctIndex: 1,
  hintAfter: 'Curious? When cables are at shallow angles, tension skyrockets! Let us explore vector equilibrium and find out why 2 × T × sin(30°) = 600 N requires T = 600 N.',
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

// ─── 22 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Concurrent forces recall
  {
    id: 'ch_01_concurrent_eq',
    nodeId: NODE_C11_PHY_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Three coplanar forces acting at a single point O keep a body in equilibrium. What must be true about their vector sum?',
    options: [
      'The vector sum ΣF = 0, and the forces form a closed vector triangle',
      'The scalar sum of their magnitudes must equal zero (|F1| + |F2| + |F3| = 0)',
      'The resultant must point vertically downward matching gravity',
      'At least two forces must be strictly perpendicular to each other',
    ],
    correctIndex: 0,
    explanation: 'For translational equilibrium of concurrent forces, the vector sum ΣF = 0. When placed head-to-tail, three balanced concurrent forces form a closed triangle.',
    hints: [
      'Equilibrium means net force is zero: F_net = ma = 0.',
      'Forces are vectors, so directions must cancel out in 2D space.',
      'According to the triangle law of forces, balanced coplanar vectors form a closed loop (triangle).',
    ],
    misconceptionIndex: 0,
  },

  // 2. Foundation - Static friction self-adjusting
  {
    id: 'ch_02_static_fric_rule',
    nodeId: NODE_C11_PHY_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A 10 kg block rests on a rough horizontal floor with μs = 0.5. A horizontal pushing force of 20 N is applied. (Take g = 9.8 m/s²). What is the actual frictional force exerted by the floor?',
    options: [
      '49 N (which is μs × N)',
      '20 N (opposing the push)',
      '0 N (since the block has not moved yet)',
      '29 N (the difference between μsN and applied force)',
    ],
    correctIndex: 1,
    explanation: 'Static friction is self-adjusting. The limiting value is fs(max) = μs N = 0.5 × (10 × 9.8) = 49 N. Since the applied force (20 N) < 49 N, static friction adjusts to exactly 20 N to keep the block at rest.',
    hints: [
      'Calculate the maximum possible grip: fs(max) = μs × mg = 49 N.',
      'Does static friction always exert its maximum value, or does it match the push?',
      'Because the push (20 N) is less than the 49 N ceiling, the friction matches the 20 N push exactly.',
    ],
    misconceptionIndex: 1,
  },

  // 3. Foundation - Drag Label FBD of Incline
  {
    id: 'ch_03_drag_fbd_incline',
    nodeId: NODE_C11_PHY_024,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the resolved force components for a block sliding DOWN a rough inclined plane at angle θ.',
    dragItems: [
      { label: 'mg cos θ (Normal Push)', targetId: 'perp_down' },
      { label: 'mg sin θ (Down-slope pull)', targetId: 'parallel_down' },
      { label: 'Normal Reaction N', targetId: 'normal_up' },
      { label: 'Kinetic Friction fk', targetId: 'friction_up' },
    ],
    correctMapping: {
      perp_down: 'mg cos θ (Normal Push)',
      parallel_down: 'mg sin θ (Down-slope pull)',
      normal_up: 'Normal Reaction N',
      friction_up: 'Kinetic Friction fk',
    },
    explanation: 'Weight mg resolves into mg cos θ perpendicular into the plane and mg sin θ along the slope. Normal reaction balances mg cos θ. Since motion is down the plane, friction acts up the plane.',
    hints: [
      'The component pressing into the incline involves the cosine of the slope angle.',
      'The component dragging the mass along the incline is mg sin θ.',
      'Friction always opposes the sliding direction, so it points up the slope.',
    ],
  },

  // 4. Foundation - Constant work calculation
  {
    id: 'ch_04_work_const_dot',
    nodeId: NODE_C11_PHY_026,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A worker pulls a sled with a tension of 50 N at an angle of 60° above the horizontal over a displacement of 10 m. Calculate the work done in Joules. (cos 60° = 0.5)',
    correctAnswer: 250,
    tolerance: 1,
    unit: 'J',
    explanation: 'Work W = F × S × cos θ = 50 N × 10 m × cos 60° = 500 × 0.5 = 250 J.',
    hints: [
      'Use the scalar work formula: W = F S cos θ.',
      'F = 50 N, S = 10 m, θ = 60°.',
      '50 × 10 × 0.5 = 250 Joules.',
    ],
  },

  // 5. Foundation - Work done by centripetal force
  {
    id: 'ch_05_centripetal_work',
    nodeId: NODE_C11_PHY_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does the centripetal force doing uniform circular motion on an orbiting satellite do ZERO work?',
    options: [
      'Because the force is strictly perpendicular (90°) to the instantaneous displacement vector at every point',
      'Because gravitational forces are conservative and eliminate all kinetic energy',
      'Because satellite velocity is constant and therefore force must be zero',
      'Because satellites travel in a vacuum where no mechanical reactions exist',
    ],
    correctIndex: 0,
    explanation: 'Work W = F · S = F S cos θ. For uniform circular motion, centripetal force acts radially inward while displacement is tangential. Thus θ = 90°, cos 90° = 0, and W = 0.',
    hints: [
      'Consider the angle between the radial centripetal force and the tangential path.',
      'What is cos(90°)?',
      'Since cos 90° = 0, any force perpendicular to velocity does zero work.',
    ],
    misconceptionIndex: 2,
  },

  // 6. Foundation - Spring Potential Energy Formula
  {
    id: 'ch_06_spring_pe_calc',
    nodeId: NODE_C11_PHY_030,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An emergency arrester spring with spring constant k = 800 N/m is compressed by 0.2 m. What is the elastic potential energy stored in the spring in Joules?',
    correctAnswer: 16,
    tolerance: 0.5,
    unit: 'J',
    explanation: 'Elastic potential energy U = (1/2) k x² = 0.5 × 800 × (0.2)² = 400 × 0.04 = 16 Joules.',
    hints: [
      'Formula for spring potential energy is U = (1/2) k x².',
      'Square the compression first: (0.2)² = 0.04 m².',
      'Multiply: 0.5 × 800 × 0.04 = 16 J.',
    ],
    misconceptionIndex: 3,
  },

  // 7. Foundation - Drag sort friction types
  {
    id: 'ch_07_sort_friction_magnitudes',
    nodeId: NODE_C11_PHY_023,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the following resistive forces for a steel cylinder on a steel runway in order from LARGEST to SMALLEST magnitude for the same normal load.',
    sortItems: [
      'Limiting Static Friction (fs,max = μs N)',
      'Kinetic / Sliding Friction (fk = μk N)',
      'Rolling Friction (f_roll = μr N / R)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Limiting static friction is highest (breakaway grip), followed by sliding kinetic friction (μk < μs), and rolling friction is lowest (often 100 to 1000 times smaller).',
    hints: [
      'Which force is hardest to overcome: starting from rest or keeping it sliding?',
      'Why do we put heavy machinery on wheels or ball bearings?',
      'Order: Static max > Kinetic > Rolling.',
    ],
  },

  // 8. Standard - Numeric Two-rope Equilibrium (Lami's / Resolution)
  {
    id: 'ch_08_two_rope_tensions',
    nodeId: NODE_C11_PHY_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 100 N light fixture is suspended symmetrically by two cables making equal 45° angles with the horizontal ceiling. What is the tension T in each cable in Newtons? (Round to nearest integer. sin 45° = 0.707)',
    correctAnswer: 71,
    tolerance: 2,
    unit: 'N',
    explanation: 'Vertical equilibrium: 2 T sin 45° = W = 100 N. Thus T = 100 / (2 × 0.707) = 100 / 1.414 ≈ 70.7 N ≈ 71 N.',
    hints: [
      'Both cables pull upward with component T sin 45°.',
      'Equation: T sin 45° + T sin 45° = 100 N.',
      '2 T (0.707) = 100 => T = 100 / 1.414 ≈ 70.7 N.',
    ],
  },

  // 9. Standard - Level road max speed
  {
    id: 'ch_09_flat_road_skid',
    nodeId: NODE_C11_PHY_025,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A truck rounds a flat horizontal bend of radius r = 40 m. The tyre-road static friction coefficient is μs = 0.4. What is the maximum safe speed in m/s without skidding? (Take g = 10 m/s²)',
    correctAnswer: 12.65,
    tolerance: 0.5,
    unit: 'm/s',
    explanation: 'On a flat road, centripetal force is provided solely by friction: m v² / r = μs m g. Thus v_max = √(μs g r) = √(0.4 × 10 × 40) = √160 ≈ 12.65 m/s (approx 45.5 km/h).',
    hints: [
      'Equate centripetal force to maximum static friction: m v² / r = μs m g.',
      'Mass cancels out: v = √(μs × g × r).',
      'Compute √(0.4 × 10 × 40) = √160 ≈ 12.65 m/s.',
    ],
  },

  // 10. Standard - Banked road angle derivation
  {
    id: 'ch_10_banked_road_angle',
    nodeId: NODE_C11_PHY_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'On an icy highway curve designed for speed v and radius r, engineers bank the turn by angle θ so vehicles do NOT rely on friction. What is the relationship for θ?',
    options: [
      'tan θ = v² / (r g)',
      'sin θ = v² / (r g)',
      'cos θ = (r g) / v²',
      'tan θ = μs × v / (r g)',
    ],
    correctIndex: 0,
    explanation: 'Resolving normal reaction: N cos θ = mg (vertical) and N sin θ = m v² / r (horizontal centripetal). Dividing horizontal by vertical yields tan θ = v² / (r g).',
    hints: [
      'The horizontal component of the normal reaction N sin θ turns the vehicle.',
      'The vertical component N cos θ supports the weight mg.',
      'Divide N sin θ by N cos θ to eliminate N and find tan θ.',
    ],
  },

  // 11. Standard - Work done by variable force (integration)
  {
    id: 'ch_11_variable_force_integral',
    nodeId: NODE_C11_PHY_027,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A variable force F(x) = (3 x² + 2 x) N acts on a particle moving from x = 1 m to x = 3 m. Calculate the total work done in Joules.',
    correctAnswer: 34,
    tolerance: 0.5,
    unit: 'J',
    explanation: 'W = ∫[1 to 3] (3x² + 2x) dx = [x³ + x²] from 1 to 3 = (3³ + 3²) - (1³ + 1²) = (27 + 9) - (1 + 1) = 36 - 2 = 34 J.',
    hints: [
      'Integrate each term: ∫ 3x² dx = x³, and ∫ 2x dx = x².',
      'Evaluate [x³ + x²] at x = 3: 27 + 9 = 36.',
      'Subtract the value at x = 1: (1 + 1) = 2. Work = 36 - 2 = 34 J.',
    ],
  },

  // 12. Standard - Work-Energy Theorem Braking Car
  {
    id: 'ch_12_work_energy_stopping',
    nodeId: NODE_C11_PHY_028,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 1200 kg car travelling at 20 m/s slams on brakes and stops over a distance of 50 m. Using the Work-Energy Theorem (W_net = ΔK), find the magnitude of the average braking force in Newtons.',
    correctAnswer: 4800,
    tolerance: 50,
    unit: 'N',
    explanation: 'Initial KE = (1/2) m v² = 0.5 × 1200 × 400 = 240,000 J. Final KE = 0. Work done by brakes = -F × d = -240,000 J. Thus F = 240,000 / 50 = 4800 N.',
    hints: [
      'Find initial kinetic energy: K_i = 0.5 × 1200 × (20)² = 240,000 J.',
      'Work done by friction is W = -F_brake × d = ΔK = -240,000 J.',
      'Divide: F_brake = 240,000 / 50 = 4800 N.',
    ],
  },

  // 13. Standard - Pulling vs Pushing a Lawn Roller
  {
    id: 'ch_13_pull_vs_push',
    nodeId: NODE_C11_PHY_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is it mechanically easier to PULL a heavy roller at an upward angle θ than to PUSH it at a downward angle θ?',
    options: [
      'Pulling creates an upward vertical component F sin θ that REDUCES normal reaction (N = mg - F sin θ), lowering friction',
      'Pushing increases the gravitational pull on the roller because gravity accelerates the push',
      'Pulling switches the contact from sliding friction to zero rolling resistance automatically',
      'Pushing causes the roller to decelerate due to centrifugal reaction against the ground',
    ],
    correctIndex: 0,
    explanation: 'When pulling at an angle θ, the upward force component F sin θ reduces the normal reaction to N = mg - F sin θ, reducing friction μN. When pushing downward, N = mg + F sin θ, which increases friction.',
    hints: [
      'Draw the vertical forces when pulling: N + F sin θ = mg => N = mg - F sin θ.',
      'Draw the vertical forces when pushing: N = mg + F sin θ.',
      'Since friction is directly proportional to normal reaction (f = μN), smaller N means less friction.',
    ],
  },

  // 14. Standard - Conservative vs Non-conservative Force
  {
    id: 'ch_14_conservative_proof',
    nodeId: NODE_C11_PHY_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following is the defining property of a CONSERVATIVE force in mechanics?',
    options: [
      'The work done along any closed loop is zero (∮ F · dr = 0), and work is strictly path-independent',
      'The force always conserves mechanical energy by converting it into heat',
      'The force must always point in the direction of increasing potential',
      'The force magnitude must remain constant regardless of position',
    ],
    correctIndex: 0,
    explanation: 'A force is conservative if the work done in moving a particle between two points depends only on endpoints, not the path. Equivalently, the work done around any closed loop is zero.',
    hints: [
      'Think of gravity or an ideal spring: lifting an object up and lowering it back returns all work.',
      'Does a conservative force dissipate energy as heat?',
      'Path independence and zero loop work ∮ F · dr = 0 define conservative forces.',
    ],
  },

  // 15. Advanced - Angle of Repose and Friction Equivalence
  {
    id: 'ch_15_angle_of_repose',
    nodeId: NODE_C11_PHY_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct the proof showing that at the angle of repose (θ_r), the tangent of the incline angle equals the static friction coefficient (tan θ_r = μs).',
    availableParts: ['mg sin θ', '=', 'μs N', 'N = mg cos θ', 'tan θ = μs'],
    targetState: 'mg sin θ = μs N N = mg cos θ tan θ = μs',
    validationHint: 'Assemble: Downslope force = Max friction, then substitute Normal reaction, then simplify to tan θ = μs.',
    explanation: 'At the verge of slipping: mg sin θ = fs,max = μs N. Since N = mg cos θ, mg sin θ = μs mg cos θ. Dividing both sides by mg cos θ yields tan θ = μs.',
    hints: [
      'First part: balance the forces along the plane at the slipping verge.',
      'Second part: replace N with mg cos θ.',
      'Third part: divide sin θ by cos θ to get tan θ = μs.',
    ],
  },

  // 16. Advanced - Vertical Circle Tension at Top and Bottom
  {
    id: 'ch_16_vertical_circle_speeds',
    nodeId: NODE_C11_PHY_025,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For a mass m whirled on a string of radius r in a vertical circle, match the critical condition to its formula.',
    options: [
      'Top min speed = √(gr), Bottom min speed = √(5gr), Tension diff (T_bot - T_top) = 6mg',
      'Top min speed = √(2gr), Bottom min speed = √(4gr), Tension diff = 4mg',
      'Top min speed = 0, Bottom min speed = √(2gr), Tension diff = 2mg',
      'Top min speed = √(gr), Bottom min speed = √(3gr), Tension diff = 3mg',
    ],
    correctIndex: 0,
    explanation: 'To avoid slack at top: T_top ≥ 0 => v_top = √(gr). By energy conservation, v_bot = √(5gr). T_bot = m(5gr)/r + mg = 6mg, T_top = 0, so T_bot - T_top = 6mg.',
    hints: [
      'At the top, gravity alone supplies centripetal force: mg = m v²/r => v = √(gr).',
      'Use conservation of energy from top (height 2r) to bottom.',
      'Tension at bottom is 6mg when top tension is zero.',
    ],
  },

  // 17. Advanced - Motion up a rough incline acceleration
  {
    id: 'ch_17_motion_up_incline',
    nodeId: NODE_C11_PHY_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A crate is projected UP an incline of angle θ with coefficient of kinetic friction μk. What is its deceleration magnitude?',
    options: [
      'a = g (sin θ + μk cos θ)',
      'a = g (sin θ - μk cos θ)',
      'a = g (cos θ + μk sin θ)',
      'a = g (tan θ + μk)',
    ],
    correctIndex: 0,
    explanation: 'When moving up the plane, both gravity (mg sin θ) and kinetic friction (μk mg cos θ) point DOWN the slope, retarding the crate: F_net = m a = mg(sin θ + μk cos θ) => a = g(sin θ + μk cos θ).',
    hints: [
      'Which direction does gravity pull along the slope? Downward.',
      'Which direction does friction act when moving upward? Also downward.',
      'Both forces reinforce each other down the slope: a = g(sin θ + μk cos θ).',
    ],
  },

  // 18. Advanced - Spring Mass Oscillating Speed
  {
    id: 'ch_18_spring_osc_speed',
    nodeId: NODE_C11_PHY_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 0.5 kg block oscillates on a frictionless table attached to a spring with k = 200 N/m and amplitude A = 0.1 m. What is the speed of the block in m/s when its displacement is x = 0.06 m?',
    correctAnswer: 1.6,
    tolerance: 0.05,
    unit: 'm/s',
    explanation: 'Total E = (1/2) k A² = 0.5 × 200 × (0.1)² = 1.0 J. At x = 0.06 m, U = 0.5 × 200 × (0.06)² = 0.36 J. KE = E - U = 1.0 - 0.36 = 0.64 J. Since KE = (1/2) m v², (1/2)(0.5) v² = 0.64 => 0.25 v² = 0.64 => v² = 2.56 => v = 1.6 m/s.',
    hints: [
      'Total mechanical energy is E = (1/2) k A² = 1.0 J.',
      'Potential energy at x = 0.06 m is U = 0.5 × 200 × 0.0036 = 0.36 J.',
      'Kinetic energy is K = 1.0 - 0.36 = 0.64 J. Solve 0.5 × 0.5 × v² = 0.64 => v = 1.6 m/s.',
    ],
  },

  // 19. Advanced - Ladder on smooth wall concurrency
  {
    id: 'ch_19_ladder_concurrency',
    nodeId: NODE_C11_PHY_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A uniform ladder leans against a smooth vertical wall on a rough floor. Why must the resultant reaction from the floor R pass through the intersection of the ladder weight W and the wall reaction N?',
    options: [
      'For any rigid body in equilibrium under three coplanar non-parallel forces, their lines of action MUST be concurrent at a single point to prevent net torque',
      'Because the floor friction is always equal to the weight of the ladder',
      'Because normal reaction from a smooth wall is zero',
      'Because gravitational acceleration acts perpendicular to the ladder length',
    ],
    correctIndex: 0,
    explanation: 'If three coplanar forces act on a body in equilibrium and are not parallel, their lines of action must meet at a single point (concurrency). Otherwise, taking moments about the intersection of any two forces would produce an unbalanced torque from the third force.',
    hints: [
      'What prevents the ladder from rotating?',
      'If two forces meet at point P, what must the third force do so the net torque about P is zero?',
      'The third force line of action must pass through P (three-force concurrency principle).',
    ],
  },

  // 20. Advanced - Real-world NEP Competency: Highway Banking with Friction
  {
    id: 'ch_20_nep_highway_eval',
    nodeId: NODE_C11_PHY_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A mountain highway in Himachal Pradesh is banked at θ = 15° for radius r = 80 m with μs = 0.3. Which factor dictates whether a slow-moving vehicle will slide DOWNHILL during heavy black ice conditions (μs -> 0)?',
    options: [
      'If tan θ > μs, the vehicle will slide down the incline when stationary or moving very slowly',
      'Vehicle mass alone determines sliding since heavier trucks press harder into the road',
      'Downhill sliding is impossible because banking only affects outward centrifugal tendencies',
      'The radius of the curve prevents inward slipping regardless of banking angle',
    ],
    correctIndex: 0,
    explanation: 'When stationary or moving below design speed, gravity tends to pull the car downhill along the slope (mg sin θ). Static friction opposes this with μs mg cos θ. If tan θ > μs, the slope is steeper than the angle of repose, causing slow vehicles to slide inward into the ditch on icy days.',
    hints: [
      'Think about what happens when a car stops completely on a banked icy road.',
      'Compare the downhill weight component mg sin θ with maximum friction μs mg cos θ.',
      'Slipping occurs if mg sin θ > μs mg cos θ, which simplifies to tan θ > μs.',
    ],
  },

  // 21. Advanced - Mass-Energy Equivalence Concept
  {
    id: 'ch_21_mass_energy_calc',
    nodeId: NODE_C11_PHY_028,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'According to Einstein\'s mass-energy equivalence E = m c², how much energy in Joules is equivalent to a mass deficit of 1 milligram (1 × 10⁻⁶ kg)? (Take c = 3 × 10⁸ m/s). Enter as exponent factor (e.g. 9 × 10¹⁰ J => 90000000000 J or 9e10).',
    correctAnswer: 9e10,
    tolerance: 1e9,
    unit: 'J',
    explanation: 'E = m c² = (1 × 10⁻⁶ kg) × (3 × 10⁸ m/s)² = 10⁻⁶ × 9 × 10¹⁶ = 9 × 10¹⁰ J (90 Billion Joules!).',
    hints: [
      'Convert 1 mg to kg: 1 mg = 10⁻⁶ kg.',
      'c² = (3 × 10⁸)² = 9 × 10¹⁶ m²/s².',
      'Multiply: 10⁻⁶ × 9 × 10¹⁶ = 9 × 10¹⁰ J.',
    ],
  },

  // 22. Advanced - Kinetic friction path dependence
  {
    id: 'ch_22_friction_nonconservative',
    nodeId: NODE_C11_PHY_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A 2 kg mass is dragged along a rough horizontal table around a complete closed square loop of perimeter 4 m (μk = 0.2, g = 10 m/s²). What is the total work done by friction over the round trip?',
    options: [
      '-16 Joules (energy dissipated permanently as heat)',
      '0 Joules (since the displacement vector around a closed loop is zero)',
      '+16 Joules (energy restored to kinetic potential)',
      '-4 Joules (only the final leg counts)',
    ],
    correctIndex: 0,
    explanation: 'Friction is NON-CONSERVATIVE. Work done by kinetic friction is always negative along each segment: W = -fk × distance = -(μk mg) × (perimeter) = -(0.2 × 20 N) × 4 m = -16 J. It never cancels to zero on a closed loop.',
    hints: [
      'Does friction oppose motion on every single side of the square?',
      'Friction force fk = μk mg = 0.2 × 20 = 4 N.',
      'Total distance is 4 m. Work = -4 N × 4 m = -16 J.',
    ],
    misconceptionIndex: 4,
  },
];

// ─── DEFAULT PROPS ───
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
  nodeId: NODE_C11_PHY_021,
  title: 'Equilibrium of Concurrent Forces & Work-Energy Mechanics',
  definition: 'Equilibrium of concurrent forces occurs when multiple forces acting through a common point sum vectorially to zero (ΣF = 0). Combined with friction laws, banking of roads, and the Work-Energy Theorem (W_net = ΔK), this establishes the foundational mechanics governing rigid body stability and energy conservation.',
  eli5: 'Think of a ring being pulled by multiple strings: if the ring stays still, all pulls in all directions perfectly cancel out! If you push a box, static friction pushes back until you overpower it. And whenever forces do work, they bank or withdraw moving energy (kinetic) or stored energy (potential).',
  misconceptions: [
    {
      misconception: 'Forces can be balanced by simply adding their numerical magnitudes to zero without vectors.',
      correction: 'Forces are vectors! Three forces like 3N, 4N, 5N balance only if they form a closed triangle with right-angled directions, not scalars.',
    },
    {
      misconception: 'Static friction is always equal to μs × N.',
      correction: 'μs N is only the MAXIMUM ceiling! Actual static friction matches whatever pushing force is applied, up to that ceiling.',
    },
    {
      misconception: 'Centripetal force does work on an orbiting object to keep it moving.',
      correction: 'Centripetal force is strictly perpendicular (90°) to instantaneous motion, so cos 90° = 0 and work is always exactly ZERO.',
    },
    {
      misconception: 'Spring potential energy is U = k x².',
      correction: 'The factor of 1/2 is essential because spring force ramps up linearly from 0 to kx. Average force is (kx)/2, giving U = (1/2) k x².',
    },
    {
      misconception: 'Friction work over a closed round trip is zero because displacement is zero.',
      correction: 'Friction is non-conservative! It opposes velocity at every instant, continuously dissipating energy as heat along the entire path length.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the resultant of three forces in equilibrium?', options: ['Zero vector', 'Maximum vector', 'Gravity', 'Normal force'], correctIndex: 0 },
    { question: 'What is the unit of spring constant k?', options: ['N/m', 'J/m', 'N·m', 'kg/s'], correctIndex: 0 },
    { question: 'At what angle does work done by a force become zero?', options: ['90°', '0°', '180°', '45°'], correctIndex: 0 },
    { question: 'What provides centripetal force on a flat unbanked road?', options: ['Static friction', 'Air pressure', 'Gravity', 'Kinetic friction'], correctIndex: 0 },
    { question: 'On an incline of angle θ, the normal reaction N is:', options: ['mg cos θ', 'mg sin θ', 'mg tan θ', 'mg'], correctIndex: 0 },
    { question: 'The work done by a net force on a particle equals change in its:', options: ['Kinetic energy', 'Potential energy', 'Momentum', 'Acceleration'], correctIndex: 0 },
    { question: 'Rolling friction is typically:', options: ['Much smaller than sliding friction', 'Equal to static friction', 'Larger than sliding friction', 'Zero in real life'], correctIndex: 0 },
    { question: 'The area under a Force vs Displacement graph represents:', options: ['Work done', 'Power', 'Impulse', 'Acceleration'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master translational equilibrium, resolution of forces, static/kinetic friction, road banking angle derivations, and the work-energy theorem.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Force Table Vector Equilibrium',
    instruction: 'Adjust the angles and weights of strings A & B to balance the central 100 N downward load. Watch ΣFx and ΣFy reach zero!',
    interactionType: 'force-balance',
    nodeId: NODE_C11_PHY_021,
  },
  {
    title: '2. Friction Threshold & Breakaway',
    instruction: 'Gradually increase the horizontal pulling force. Observe static friction self-adjust until you reach the limiting breakaway threshold fs(max)!',
    interactionType: 'friction-slider',
    nodeId: NODE_C11_PHY_022,
  },
  {
    title: '3. Rough Inclined Plane Dynamics',
    instruction: 'Tilt the incline angle θ and adjust the friction coefficient. Watch the weight split into mg sin θ and mg cos θ in real-time!',
    interactionType: 'incline-simulator',
    nodeId: NODE_C11_PHY_024,
  },
  {
    title: '4. Banked Highway Curve & Speed Limits',
    instruction: 'Adjust vehicle speed and banking angle on this Himalayan turn. Find the ideal speed where lateral tyre friction is zero!',
    interactionType: 'banking-simulator',
    nodeId: NODE_C11_PHY_025,
  },
  {
    title: '5. Work-Energy & Spring Potential Energy',
    instruction: 'Compress the heavy arrester spring and release it. Watch potential energy U = 1/2 k x² convert seamlessly into kinetic energy 1/2 m v²!',
    interactionType: 'spring-energy',
    nodeId: NODE_C11_PHY_030,
  },
];

// ─── REFLECTION QUESTIONS ───
const REFLECTION_QUESTIONS = [
  'What was the most surprising thing you learned?',
  'How would you explain this to a friend?',
  'Where in real life might you use this?',
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Himalayan Transit Engineering Challenge',
  description: 'Design a safe high-altitude mountain road curve for a 15,000 kg passenger bus operating in wet monsoon and winter conditions.',
  steps: [
    'Measure the local curve radius: r = 120 metres on a sharp ridge turn.',
    'Select a safety design speed of 54 km/h (15 m/s) where vehicles require zero lateral tyre friction.',
    'Calculate ideal banking angle: tan θ = v² / (r g) = (15)² / (120 × 9.8) = 225 / 1176 ≈ 0.1913 => θ ≈ 10.8°.',
    'Verify safety during black ice (μs = 0.1): verify that tan(10.8°) ≈ 0.19 does not exceed critical tipping or inward sliding limits for stationary vehicles.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_PhysicsEquilibriumConcurrentForcesSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_PHY_021,
    title = DEFAULT_PROPS.title || 'Equilibrium of Concurrent Forces',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── INTERACTIVE SIMULATION VARIABLES ───
  // Lab 1: Vector Force Table
  const [angleA, setAngleA] = useState(30);
  const [angleB, setAngleB] = useState(45);
  const [weightLoad, setWeightLoad] = useState(100);
  const [tensionA, setTensionA] = useState(70.7);
  const [tensionB, setTensionB] = useState(70.7);
  const [netFx, setNetFx] = useState(0);
  const [netFy, setNetFy] = useState(0);

  // Lab 2: Friction Threshold
  const [pullForce, setPullForce] = useState(25);
  const [blockMass, setBlockMass] = useState(10);
  const [muStatic, setMuStatic] = useState(0.5);
  const [muKinetic, setMuKinetic] = useState(0.35);
  const [isSlipping, setIsSlipping] = useState(false);
  const [actualFriction, setActualFriction] = useState(25);

  // Lab 3: Rough Incline
  const [inclineAngle, setInclineAngle] = useState(30);
  const [inclineMu, setInclineMu] = useState(0.3);
  const [inclineMass, setInclineMass] = useState(5);
  const [inclineAcc, setInclineAcc] = useState(0);

  // Lab 4: Banked Road
  const [bankAngle, setBankAngle] = useState(15);
  const [curveRadius, setCurveRadius] = useState(80);
  const [carSpeedKmH, setCarSpeedKmH] = useState(60);

  // Lab 5: Spring Oscillation
  const [springK, setSpringK] = useState(200);
  const [springAmplitude, setSpringAmplitude] = useState(0.1);
  const [springPos, setSpringPos] = useState(0.1);
  const [springMass] = useState(0.5);
  const [isOscillating, setIsOscillating] = useState(false);

  // ─── ADAPTIVE & PEDAGOGY STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Discovery
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Drag & Sort & Input
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback Visuals
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT Ref & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const springAnimRef = useRef<number | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ───
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

  // ─── REAL-TIME CALCULATIONS: LAB 1 (Force Table) ───
  useEffect(() => {
    const radA = (angleA * Math.PI) / 180;
    const radB = (angleB * Math.PI) / 180;
    const denom = Math.cos(radB) * Math.tan(radA) + Math.sin(radB);
    if (denom > 0.001) {
      const tb = weightLoad / denom;
      const ta = (tb * Math.cos(radB)) / Math.cos(radA);
      setTensionA(parseFloat(ta.toFixed(1)));
      setTensionB(parseFloat(tb.toFixed(1)));
      const fx = ta * Math.cos(radA) - tb * Math.cos(radB);
      const fy = ta * Math.sin(radA) + tb * Math.sin(radB) - weightLoad;
      setNetFx(parseFloat(fx.toFixed(2)));
      setNetFy(parseFloat(fy.toFixed(2)));
    }
  }, [angleA, angleB, weightLoad]);

  // ─── REAL-TIME CALCULATIONS: LAB 2 (Friction Threshold) ───
  useEffect(() => {
    const normal = blockMass * 9.8;
    const fsMax = muStatic * normal;
    const fk = muKinetic * normal;
    if (pullForce > fsMax) {
      setIsSlipping(true);
      setActualFriction(parseFloat(fk.toFixed(1)));
    } else {
      setIsSlipping(false);
      setActualFriction(pullForce);
    }
  }, [pullForce, blockMass, muStatic, muKinetic]);

  // ─── REAL-TIME CALCULATIONS: LAB 3 (Inclined Plane) ───
  useEffect(() => {
    const rad = (inclineAngle * Math.PI) / 180;
    const g = 9.8;
    const driving = inclineMass * g * Math.sin(rad);
    const maxStatic = inclineMu * inclineMass * g * Math.cos(rad);
    if (driving > maxStatic) {
      const netForce = driving - maxStatic;
      const a = netForce / inclineMass;
      setInclineAcc(parseFloat(a.toFixed(2)));
    } else {
      setInclineAcc(0);
    }
  }, [inclineAngle, inclineMu, inclineMass]);

  // ─── REAL-TIME CALCULATIONS: LAB 5 (Spring Canvas Animation) ───
  useEffect(() => {
    if (!isOscillating) return;
    let t = 0;
    const omega = Math.sqrt(springK / springMass);
    const animate = () => {
      t += 0.03;
      const x = springAmplitude * Math.cos(omega * t);
      setSpringPos(parseFloat(x.toFixed(3)));
      springAnimRef.current = requestAnimationFrame(animate);
    };
    springAnimRef.current = requestAnimationFrame(animate);
    return () => {
      if (springAnimRef.current) cancelAnimationFrame(springAnimRef.current);
    };
  }, [isOscillating, springK, springMass, springAmplitude]);

  // ─── CANVAS DRAWING EFFECT FOR OSCILLATION & ENERGY ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw energy parabola
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const baseY = h - 20;

      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      for (let px = 20; px < w - 20; px++) {
        const xVal = (px - cx) / (w / 3);
        const u = 0.5 * springK * xVal * xVal * 0.05;
        const py = baseY - Math.min(u * 15, h - 30);
        if (px === 20) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Draw active mass position marker
      const markerX = cx + (springPos / springAmplitude) * (w / 3 - 20);
      const curU = 0.5 * springK * springPos * springPos;
      const curE = 0.5 * springK * springAmplitude * springAmplitude;
      const curK = Math.max(0, curE - curU);

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(markerX, baseY - 8, 8, 0, Math.PI * 2);
      ctx.fill();

      // Energy Bar indicator
      ctx.fillStyle = '#10b981';
      ctx.font = '10px monospace';
      ctx.fillText(`Total E: ${curE.toFixed(2)}J | PE: ${curU.toFixed(2)}J | KE: ${curK.toFixed(2)}J`, 10, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [springK, springPos, springAmplitude]);

  // ─── HANDLERS ───
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding physics intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive physics labs. Manipulate each simulation to discover the core laws.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with high loads and steep angles without time limits.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Prove your engineering mastery!');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation complete! You have conquered forces, friction, and energy conservation.');
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
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well calculated.');
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
        speechManager.speak('Let us study the complete physical derivation together.');
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

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleResetLabValues = useCallback(() => {
    setAngleA(30);
    setAngleB(45);
    setWeightLoad(100);
    setPullForce(25);
    setInclineAngle(30);
    setInclineMu(0.3);
    setBankAngle(15);
    setCurveRadius(80);
    setCarSpeedKmH(60);
    setSpringK(200);
    setSpringAmplitude(0.1);
    setIsOscillating(false);
    audioManager.play('tap');
    speechManager.speak('Simulation parameters reset to standard initial conditions.');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED VALUES ───
  const idealBankSpeed = useMemo(() => {
    const rad = (bankAngle * Math.PI) / 180;
    const vMs = Math.sqrt(curveRadius * 9.8 * Math.tan(rad));
    return parseFloat((vMs * 3.6).toFixed(1));
  }, [bankAngle, curveRadius]);

  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium">ISC Class 11 Physics • Mechanics Master Lab</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border border-rose-700'
                : 'bg-indigo-950 text-indigo-400 border border-indigo-700'
            }`}
          >
            {difficulty} Tier
          </motion.div>

          {phase === 'challenge' && (
            <div className="px-3 py-1 bg-slate-900 rounded-full border border-slate-700 text-xs text-slate-300">
              Q: {currentChallenge + 1} / {filteredChallenges.length}
            </div>
          )}
        </div>
      </motion.header>

      {/* ─── PHASE 1: NARRATIVE DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/80 shadow-lg">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-bold uppercase tracking-wide">
              Engineering Mission
            </span>
            <h2 className="text-2xl font-black text-white mt-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-indigo-300 text-xs mt-2 italic bg-indigo-950/50 p-2.5 rounded-xl border border-indigo-900/50">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-black text-lg">💡 Curiosity Challenge:</span>
              <span className="text-xs text-slate-400">(Warm-up: Test your intuition before we dive into the math!)</span>
            </div>

            <p className="text-white font-semibold text-base">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 text-slate-500 border border-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400 font-medium'}`}>
                  {discoveryCorrect ? '✓ Spot on! 2 × T × sin 30° = 600 N => T = 600 N.' : DISCOVERY_QUESTION.hintAfter}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION (5 Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Navigator Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s === currentSlide ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-700'
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
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-amber-400 text-sm mt-1 font-medium">
                    👉 {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetLabValues}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold border border-slate-700"
                >
                  Reset Defaults
                </motion.button>
              </div>

              {/* ─── LAB 1: FORCE TABLE VECTOR EQUILIBRIUM ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 400 300" className="w-full max-h-[260px]">
                      <circle cx="200" cy="150" r="12" fill="#312e81" stroke="#6366f1" strokeWidth="3" />
                      <circle cx="200" cy="150" r="4" fill="#a5b4fc" />

                      {(() => {
                        const len = Math.min(110, tensionA * 0.9);
                        const rad = (angleA * Math.PI) / 180;
                        const ax = 200 - len * Math.cos(rad);
                        const ay = 150 - len * Math.sin(rad);
                        return (
                          <g>
                            <line x1="200" y1="150" x2={ax} y2={ay} stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                            <polygon points={`${ax},${ay} ${ax + 8},${ay + 4} ${ax + 4},${ay + 10}`} fill="#38bdf8" />
                            <text x={ax - 10} y={ay - 8} fill="#38bdf8" fontSize="11" fontWeight="bold">
                              T_A = {tensionA} N ({angleA}°)
                            </text>
                          </g>
                        );
                      })()}

                      {(() => {
                        const len = Math.min(110, tensionB * 0.9);
                        const rad = (angleB * Math.PI) / 180;
                        const bx = 200 + len * Math.cos(rad);
                        const by = 150 - len * Math.sin(rad);
                        return (
                          <g>
                            <line x1="200" y1="150" x2={bx} y2={by} stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
                            <polygon points={`${bx},${by} ${bx - 8},${by + 4} ${bx - 4},${by + 10}`} fill="#a855f7" />
                            <text x={bx - 20} y={by - 8} fill="#a855f7" fontSize="11" fontWeight="bold">
                              T_B = {tensionB} N ({angleB}°)
                            </text>
                          </g>
                        );
                      })()}

                      {(() => {
                        const wy = 150 + Math.min(100, weightLoad * 0.8);
                        return (
                          <g>
                            <line x1="200" y1="150" x2="200" y2={wy} stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                            <polygon points={`200,${wy + 6} 195,${wy - 6} 205,${wy - 6}`} fill="#ef4444" />
                            <text x="210" y={wy} fill="#ef4444" fontSize="11" fontWeight="bold">
                              W = {weightLoad} N
                            </text>
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="flex gap-4 text-xs font-mono mt-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className={Math.abs(netFx) < 0.1 ? 'text-emerald-400' : 'text-amber-400'}>
                        ΣFx: {netFx} N
                      </span>
                      <span className={Math.abs(netFy) < 0.1 ? 'text-emerald-400' : 'text-amber-400'}>
                        ΣFy: {netFy} N
                      </span>
                      <span className="text-indigo-400">
                        Status: {Math.abs(netFx) < 0.1 && Math.abs(netFy) < 0.1 ? 'EQUILIBRIUM ✓' : 'UNBALANCED'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Cable A Angle (θA)</span>
                        <span className="text-sky-400">{angleA}°</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={75}
                        value={angleA}
                        onChange={e => setAngleA(Number(e.target.value))}
                        className="w-full mt-1 accent-sky-500"
                        aria-label="Cable A Angle"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Cable B Angle (θB)</span>
                        <span className="text-purple-400">{angleB}°</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={75}
                        value={angleB}
                        onChange={e => setAngleB(Number(e.target.value))}
                        className="w-full mt-1 accent-purple-500"
                        aria-label="Cable B Angle"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Suspended Load Weight (W)</span>
                        <span className="text-rose-400">{weightLoad} N</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={200}
                        step={10}
                        value={weightLoad}
                        onChange={e => setWeightLoad(Number(e.target.value))}
                        className="w-full mt-1 accent-rose-500"
                        aria-label="Suspended Load Weight"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                      <p className="text-slate-200 font-bold">Lami’s Theorem Relation:</p>
                      <p className="font-mono text-indigo-300">T_A / sin(90° + θB) = T_B / sin(90° + θA) = W / sin(180° - θA - θB)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: STATIC & KINETIC FRICTION BREAKAWAY ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 400 220" className="w-full max-h-[220px]">
                      <rect x="20" y="150" width="360" height="20" fill="#334155" />
                      <line x1="20" y1="150" x2="380" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />

                      <motion.rect
                        x={isSlipping ? 210 : 160}
                        y="90"
                        width="80"
                        height="60"
                        rx="6"
                        fill="#4f46e5"
                        stroke="#818cf8"
                        strokeWidth="2"
                        animate={{ x: isSlipping ? 200 : 160 }}
                        transition={{ duration: 0.3 }}
                      />
                      <text x={isSlipping ? 240 : 200} y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                        {blockMass} kg
                      </text>

                      {pullForce > 0 && (
                        <g>
                          <line
                            x1={isSlipping ? 280 : 240}
                            y1="120"
                            x2={(isSlipping ? 280 : 240) + Math.min(90, pullForce * 1.2)}
                            y2="120"
                            stroke="#10b981"
                            strokeWidth="4"
                          />
                          <text x={(isSlipping ? 280 : 240) + 10} y="112" fill="#10b981" fontSize="10" fontWeight="bold">
                            F_pull = {pullForce} N
                          </text>
                        </g>
                      )}

                      <g>
                        <line
                          x1={isSlipping ? 200 : 160}
                          y1="150"
                          x2={(isSlipping ? 200 : 160) - Math.min(80, actualFriction * 1.2)}
                          y2="150"
                          stroke="#f59e0b"
                          strokeWidth="4"
                        />
                        <text x={(isSlipping ? 200 : 160) - 75} y="165" fill="#f59e0b" fontSize="10" fontWeight="bold">
                          f = {actualFriction} N
                        </text>
                      </g>
                    </svg>

                    <div className="w-full mt-3 flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <span className="text-slate-300">
                        Max Static fs(max): <b className="text-amber-400">{(muStatic * blockMass * 9.8).toFixed(1)} N</b>
                      </span>
                      <span className="text-slate-300">
                        Kinetic fk: <b className="text-sky-400">{(muKinetic * blockMass * 9.8).toFixed(1)} N</b>
                      </span>
                      <span className={`px-2 py-0.5 rounded font-bold ${isSlipping ? 'bg-rose-950 text-rose-400' : 'bg-emerald-950 text-emerald-400'}`}>
                        {isSlipping ? 'SLIDING ACCELERATING' : 'STATIC REST'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Applied Pull Force (F_applied)</span>
                        <span className="text-emerald-400">{pullForce} N</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={80}
                        value={pullForce}
                        onChange={e => setPullForce(Number(e.target.value))}
                        className="w-full mt-1 accent-emerald-500"
                        aria-label="Applied Pull Force"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Static Friction Coefficient (μs)</span>
                        <span className="text-amber-400">{muStatic}</span>
                      </div>
                      <input
                        type="range"
                        min={0.2}
                        max={0.8}
                        step={0.05}
                        value={muStatic}
                        onChange={e => setMuStatic(Number(e.target.value))}
                        className="w-full mt-1 accent-amber-500"
                        aria-label="Static Friction Coefficient"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Block Mass</span>
                        <span className="text-indigo-400">{blockMass} kg</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={20}
                        value={blockMass}
                        onChange={e => setBlockMass(Number(e.target.value))}
                        className="w-full mt-1 accent-indigo-500"
                        aria-label="Block Mass"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: ROUGH INCLINED PLANE DYNAMICS ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 400 240" className="w-full max-h-[240px]">
                      {(() => {
                        const rad = (inclineAngle * Math.PI) / 180;
                        const bx = 50;
                        const by = 200;
                        const len = 300;
                        const tx = bx + len * Math.cos(rad);
                        const ty = by - len * Math.sin(rad);
                        return (
                          <g>
                            <polygon points={`${bx},${by} ${tx},${by} ${tx},${ty}`} fill="#1e293b" stroke="#475569" strokeWidth="2" />
                            <path d={`M ${bx + 40} ${by} A 40 40 0 0 0 ${bx + 40 * Math.cos(rad)} ${by - 40 * Math.sin(rad)}`} fill="none" stroke="#fbbf24" strokeWidth="2" />
                            <text x={bx + 48} y={by - 10} fill="#fbbf24" fontSize="10" fontWeight="bold">
                              θ = {inclineAngle}°
                            </text>

                            {(() => {
                              const mx = bx + (len / 2) * Math.cos(rad);
                              const my = by - (len / 2) * Math.sin(rad);
                              return (
                                <g transform={`translate(${mx}, ${my}) rotate(${-inclineAngle})`}>
                                  <rect x="-25" y="-30" width="50" height="30" rx="4" fill="#6366f1" stroke="#a5b4fc" strokeWidth="2" />
                                  <text x="0" y="-12" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                                    {inclineMass} kg
                                  </text>

                                  <line x1="0" y1="-30" x2="0" y2="-60" stroke="#38bdf8" strokeWidth="3" />
                                  <text x="5" y="-50" fill="#38bdf8" fontSize="8" fontWeight="bold">
                                    N = {(inclineMass * 9.8 * Math.cos(rad)).toFixed(1)} N
                                  </text>

                                  <line x1="-25" y1="-15" x2="-65" y2="-15" stroke="#ef4444" strokeWidth="3" />
                                  <text x="-65" y="-20" fill="#ef4444" fontSize="8" fontWeight="bold">
                                    mg sin θ = {(inclineMass * 9.8 * Math.sin(rad)).toFixed(1)} N
                                  </text>

                                  <line x1="25" y1="-15" x2="55" y2="-15" stroke="#f59e0b" strokeWidth="3" />
                                  <text x="30" y="-20" fill="#f59e0b" fontSize="8" fontWeight="bold">
                                    f = {(inclineMu * inclineMass * 9.8 * Math.cos(rad)).toFixed(1)} N
                                  </text>
                                </g>
                              );
                            })()}
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="w-full mt-2 flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <span className="text-slate-300">
                        tan θ: <b className="text-amber-400">{Math.tan((inclineAngle * Math.PI) / 180).toFixed(3)}</b>
                      </span>
                      <span className="text-slate-300">
                        μ: <b className="text-purple-400">{inclineMu}</b>
                      </span>
                      <span className={`px-2 py-0.5 rounded font-bold ${inclineAcc > 0 ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'}`}>
                        {inclineAcc > 0 ? `a = ${inclineAcc} m/s² (Sliding)` : 'At Rest (tan θ ≤ μ)'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Incline Angle (θ)</span>
                        <span className="text-amber-400">{inclineAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={60}
                        value={inclineAngle}
                        onChange={e => setInclineAngle(Number(e.target.value))}
                        className="w-full mt-1 accent-amber-500"
                        aria-label="Incline Angle"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Friction Coefficient (μ)</span>
                        <span className="text-purple-400">{inclineMu}</span>
                      </div>
                      <input
                        type="range"
                        min={0.1}
                        max={0.8}
                        step={0.05}
                        value={inclineMu}
                        onChange={e => setInclineMu(Number(e.target.value))}
                        className="w-full mt-1 accent-purple-500"
                        aria-label="Friction Coefficient"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-400">
                      <p className="text-slate-200 font-bold">Equations for Motion Down Incline:</p>
                      <p className="font-mono text-emerald-400">N = mg cos θ</p>
                      <p className="font-mono text-rose-400">F_net = mg sin θ - μ mg cos θ = m a</p>
                      <p className="font-mono text-indigo-400">a = g(sin θ - μ cos θ)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: BANKED HIGHWAY CURVE ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 400 240" className="w-full max-h-[240px]">
                      {(() => {
                        const rad = (bankAngle * Math.PI) / 180;
                        const bx = 40;
                        const by = 190;
                        const rx = 360;
                        const ry = by - (rx - bx) * Math.sin(rad);

                        return (
                          <g>
                            <polygon points={`${bx},${by} ${rx},${by} ${rx},${ry}`} fill="#334155" stroke="#64748b" strokeWidth="2" />
                            <line x1={bx} y1={by} x2={rx} y2={ry} stroke="#38bdf8" strokeWidth="6" />

                            <text x={bx + 50} y={by - 8} fill="#fbbf24" fontSize="11" fontWeight="bold">
                              θ = {bankAngle}°
                            </text>

                            {(() => {
                              const cx = (bx + rx) / 2;
                              const cy = (by + ry) / 2;
                              return (
                                <g transform={`translate(${cx}, ${cy}) rotate(${-bankAngle})`}>
                                  <rect x="-30" y="-35" width="60" height="35" rx="6" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
                                  <text x="0" y="-15" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    {carSpeedKmH} km/h
                                  </text>

                                  <line x1="0" y1="-35" x2="0" y2="-75" stroke="#38bdf8" strokeWidth="3" />
                                  <text x="8" y="-60" fill="#38bdf8" fontSize="9" fontWeight="bold">
                                    N
                                  </text>
                                </g>
                              );
                            })()}
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="w-full mt-2 flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <span className="text-slate-300">
                        Design Speed (Zero Friction): <b className="text-emerald-400">{idealBankSpeed} km/h</b>
                      </span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        Math.abs(carSpeedKmH - idealBankSpeed) < 5
                          ? 'bg-emerald-950 text-emerald-400'
                          : carSpeedKmH > idealBankSpeed
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-sky-950 text-sky-400'
                      }`}>
                        {Math.abs(carSpeedKmH - idealBankSpeed) < 5
                          ? 'IDEAL BALANCE ✓'
                          : carSpeedKmH > idealBankSpeed
                          ? 'Tyres grip inward'
                          : 'Tyres grip outward'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Banking Angle (θ)</span>
                        <span className="text-sky-400">{bankAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={35}
                        value={bankAngle}
                        onChange={e => setBankAngle(Number(e.target.value))}
                        className="w-full mt-1 accent-sky-500"
                        aria-label="Banking Angle"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Turn Radius (r)</span>
                        <span className="text-indigo-400">{curveRadius} m</span>
                      </div>
                      <input
                        type="range"
                        min={40}
                        max={200}
                        step={10}
                        value={curveRadius}
                        onChange={e => setCurveRadius(Number(e.target.value))}
                        className="w-full mt-1 accent-indigo-500"
                        aria-label="Turn Radius"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Vehicle Speed</span>
                        <span className="text-rose-400">{carSpeedKmH} km/h</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={120}
                        value={carSpeedKmH}
                        onChange={e => setCarSpeedKmH(Number(e.target.value))}
                        className="w-full mt-1 accent-rose-500"
                        aria-label="Vehicle Speed"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                      <p className="text-slate-200 font-bold">Key Banking Derivation:</p>
                      <p className="font-mono text-indigo-300">N sin θ = m v² / r</p>
                      <p className="font-mono text-emerald-400">N cos θ = m g</p>
                      <p className="font-mono text-amber-300">tan θ = v² / (r g)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: WORK-ENERGY & SPRING POTENTIAL ENERGY ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <canvas ref={canvasRef} width={360} height={180} className="w-full rounded-xl bg-slate-900 border border-slate-800" />

                    <div className="flex items-center gap-3 mt-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOscillating(!isOscillating)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          isOscillating ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {isOscillating ? 'Pause Oscillation' : 'Release & Oscillate'}
                      </motion.button>

                      <span className="text-xs text-slate-400">
                        x = <b className="text-amber-400">{springPos} m</b>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Spring Constant (k)</span>
                        <span className="text-sky-400">{springK} N/m</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={500}
                        step={25}
                        value={springK}
                        onChange={e => setSpringK(Number(e.target.value))}
                        className="w-full mt-1 accent-sky-500"
                        aria-label="Spring Constant"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Initial Stretch / Amplitude (A)</span>
                        <span className="text-purple-400">{springAmplitude} m</span>
                      </div>
                      <input
                        type="range"
                        min={0.05}
                        max={0.25}
                        step={0.01}
                        value={springAmplitude}
                        onChange={e => {
                          setSpringAmplitude(Number(e.target.value));
                          setSpringPos(Number(e.target.value));
                        }}
                        className="w-full mt-1 accent-purple-500"
                        aria-label="Initial Stretch Amplitude"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                      <p className="text-slate-200 font-bold">Conservation of Mechanical Energy:</p>
                      <p className="font-mono text-emerald-400">U_max = (1/2) k A² = {(0.5 * springK * springAmplitude * springAmplitude).toFixed(2)} J</p>
                      <p className="font-mono text-sky-400">K_max = (1/2) m v_max² = U_max</p>
                      <p className="font-mono text-indigo-300">v_max = √(k/m) · A = {(Math.sqrt(springK / springMass) * springAmplitude).toFixed(2)} m/s</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Exploration Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs disabled:opacity-40 border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-semibold">
              Step {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold uppercase tracking-wide">
                  Free Play Sandbox
                </span>
                <h3 className="text-xl font-black text-white mt-1">Multi-System Physics Workbench</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
              >
                Ready for Assessment Challenges! →
              </motion.button>
            </div>
            <p className="text-slate-400 text-xs">
              Explore combined multi-variable reactions with zero grading stress. Test limit values: extreme angles, maximum friction loads, or steep banked loops.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-indigo-300">Inclined Plane & Friction Sandbox</h4>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>θ: {inclineAngle}°</span>
                  <span>μ: {inclineMu}</span>
                  <span>a: {inclineAcc} m/s²</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={75}
                  value={inclineAngle}
                  onChange={e => setInclineAngle(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                  aria-label="Sandbox Incline Angle"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-sky-300">Spring Energy Converter</h4>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>k: {springK} N/m</span>
                  <span>A: {springAmplitude} m</span>
                  <span>E: {(0.5 * springK * springAmplitude * springAmplitude).toFixed(2)} J</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={500}
                  value={springK}
                  onChange={e => setSpringK(Number(e.target.value))}
                  className="w-full accent-sky-500"
                  aria-label="Sandbox Spring Constant"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES & NEP COMPETENCY ASSESSMENT ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Card */}
          <div
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-bold uppercase tracking-wider">
                NEP 2020 Competency: {challenge.competencyLevel}
              </span>
              <span className="text-xs text-slate-400">Node: {challenge.nodeId}</span>
            </div>

            <p className="text-white text-base sm:text-lg font-bold leading-relaxed">{challenge.question}</p>

            {/* MCQ / Classify / Distinguish / Match with FRAMER-MOTION SHAKE ANIMATION */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3 mt-4">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg cursor-grab active:cursor-grabbing shadow"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'perp_down', label: 'Perpendicular Down Component (into plane)' },
                    { id: 'parallel_down', label: 'Parallel Down Component (along slope)' },
                    { id: 'normal_up', label: 'Normal Reaction (perpendicular out)' },
                    { id: 'friction_up', label: 'Resistive Surface Friction' },
                  ].map(slot => (
                    <div
                      key={slot.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center min-h-[70px] transition-colors ${
                        droppedLabels[slot.id]
                          ? 'bg-indigo-950/60 border-indigo-500'
                          : 'bg-slate-950/50 border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{slot.label}</span>
                      <span className="text-sm font-bold text-white mt-1">
                        {droppedLabels[slot.id] || '➕ Drop matching force here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Verify Force Placement
                </motion.button>
              </div>
            )}

            {/* Drag Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(dIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, dIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-sm font-medium flex items-center justify-between cursor-grab"
                    >
                      <span>
                        <b className="text-indigo-400 mr-2">#{dIdx + 1}</b> {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Submit Order
                </motion.button>
              </div>
            )}

            {/* Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                  aria-label="Numeric answer input"
                />
                <span className="text-slate-300 font-bold text-sm">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                >
                  Check Numerical Solution
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-700 text-white rounded-md text-xs font-mono font-bold">
                      {p}
                    </span>
                  ))}
                  {constructParts.length > 0 && (
                    <button
                      onClick={() => setConstructParts([])}
                      className="text-xs text-rose-400 hover:text-rose-300 ml-auto"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Validate Proof Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-indigo-950/40 border border-indigo-800/80 rounded-2xl space-y-4"
              >
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Physics Walkthrough & Explanation:
                </span>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-slate-200 text-sm leading-relaxed"
                      >
                        <span className="text-indigo-400 font-bold mr-2">Step {sIdx + 1}:</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Assessment →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK, REFLECTIONS & MISCONCEPTIONS ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Main Completion & Motivational Hero */}
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-black text-white">Mechanics Mastery Achieved!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="py-2 px-4 inline-block rounded-2xl bg-indigo-900/60 border border-indigo-500">
              <p className="text-lg font-black text-amber-300 tracking-wide uppercase">
                {motivationalMessage}
              </p>
            </div>

            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have completed the full simulation suite across concurrent force equilibrium, friction regimes, inclined plane dynamics, road banking, and the work-energy theorem.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center min-w-[120px]">
                <span className="text-xs text-slate-400 font-bold uppercase">Final Score</span>
                <p className="text-2xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center min-w-[120px]">
                <span className="text-xs text-slate-400 font-bold uppercase">BKT Mastery</span>
                <p className="text-2xl font-black text-indigo-400 mt-1 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>🤔</span> Reflection & Conceptual Synthesis:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {REFLECTION_QUESTIONS.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <p className="text-sm font-semibold text-slate-200">{q}</p>
                  <textarea
                    rows={3}
                    placeholder="Reflect on this question..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-800/80 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Specific Physics Concepts To Solidify:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                      <p className="text-rose-400 font-bold">❌ Common Trap: {m.misconception}</p>
                      <p className="text-emerald-400 font-medium leading-relaxed">✓ Scientific Reality: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SRS) Schedule */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-indigo-300">📅 Spaced Repetition Memory Schedule (SM-2):</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on your response latency and score, your next review session is scheduled in{' '}
              <b className="text-amber-400">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</b>.
              Revisiting this topic on schedule cements deep conceptual mastery for ISC & JEE exams.
            </p>
          </div>

          {/* Real World Transit Challenge Arc */}
          <div className="p-6 bg-indigo-950/50 rounded-3xl border border-indigo-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">🏔️ {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span> {st}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── TOAST & OVERLAY FEEDBACK ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Assessment Section Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C11_PhysicsEquilibriumConcurrentForcesSim;
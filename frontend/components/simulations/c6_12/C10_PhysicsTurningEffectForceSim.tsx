'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (ALL 10 MANDATORY NODES) ───
const NODE_C10_PHY_001 = 'c10_phy_001'; // Turning effect of force and principle of moments
const NODE_C10_PHY_002 = 'c10_phy_002'; // Centre of gravity
const NODE_C10_PHY_003 = 'c10_phy_003'; // Types of equilibrium (stable, unstable, neutral)
const NODE_C10_PHY_004 = 'c10_phy_004'; // Work done (W = FS costheta)
const NODE_C10_PHY_005 = 'c10_phy_005'; // Power and its relation to work
const NODE_C10_PHY_006 = 'c10_phy_006'; // Conservation of energy (U + K = constant)
const NODE_C10_PHY_007 = 'c10_phy_007'; // Different forms of energy
const NODE_C10_PHY_008 = 'c10_phy_008'; // Energy conversion between forms
const NODE_C10_PHY_009 = 'c10_phy_009'; // Mechanical advantage (MA = L/E)
const NODE_C10_PHY_010 = 'c10_phy_010'; // Velocity ratio (VR = dE/dL)

const ALL_NODE_IDS = [
  NODE_C10_PHY_001,
  NODE_C10_PHY_002,
  NODE_C10_PHY_003,
  NODE_C10_PHY_004,
  NODE_C10_PHY_005,
  NODE_C10_PHY_006,
  NODE_C10_PHY_007,
  NODE_C10_PHY_008,
  NODE_C10_PHY_009,
  NODE_C10_PHY_010,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Mission: The Great Indian Engineering Rescue',
  intro: 'A construction team in Mumbai needs to lift a 1200 N boulder, balance a crane arm over uneven terrain, and calibrate an energy-efficient pulley rig without burning out the motor. As the lead physicist, you must analyse torques, locate centres of gravity, verify energy conservation, and choose the right mechanical advantage.',
  context: 'Master the principles of moments, equilibrium, work vectors, power rates, and simple machines to solve real engineering bottlenecks.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'A 60 kg worker pushes with 200 N at the extreme end of a 2 m spanner to loosen a rusted bolt. If another worker pushes with 400 N at the 0.5 m mark, who creates a greater turning effect (torque)?',
  options: [
    'Worker 1 (200 N at 2.0 m) creates more torque (400 N·m vs 200 N·m)',
    'Worker 2 (400 N at 0.5 m) creates more torque because force is doubled',
    'Both produce exactly the same turning effect (200 N·m)',
    'Neither, because torque depends only on the bolt radius',
  ],
  correctIndex: 0,
  hintAfter: 'Remember: Turning effect (torque) = Force × Perpendicular distance from pivot! Distance is just as powerful as force.',
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

// ─── 22 CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_phy_001',
    nodeId: NODE_C10_PHY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the SI unit of moment of force (torque) and its relation to the CGS unit dyne·cm?',
    options: [
      'N·m, where 1 N·m = 10^7 dyne·cm',
      'Joule, where 1 J = 10^5 dyne·cm',
      'N/m, where 1 N/m = 10^3 dyne/cm',
      'dyne·m, where 1 dyne·m = 10^2 N·m',
    ],
    correctIndex: 0,
    explanation: 'Moment of force has SI unit Newton-metre (N·m). Since 1 N = 10^5 dyne and 1 m = 10^2 cm, 1 N·m = 10^5 × 10^2 = 10^7 dyne·cm.',
    hints: [
      'Recall: Moment = Force (Newtons) × Perpendicular distance (metres).',
      'Convert 1 N to dynes (10^5) and 1 m to cm (10^2).',
      'Multiply the conversion factors: 10^5 × 10^2 = 10^7.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_phy_002',
    nodeId: NODE_C10_PHY_001,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A uniform metre rule is pivoted at the 50 cm mark. A 4 N weight hangs at the 80 cm mark (30 cm to right). What weight (in N) must be hung at the 20 cm mark (30 cm to left) to achieve rotational equilibrium?',
    correctAnswer: 4,
    tolerance: 0.1,
    unit: 'N',
    explanation: 'By the Principle of Moments: Clockwise Moment = Anticlockwise Moment. Here, 4 N × 0.3 m = W_left × 0.3 m, so W_left = 4 N.',
    hints: [
      'Find distance from the pivot (50 cm) for both sides: |80 - 50| = 30 cm and |50 - 20| = 30 cm.',
      'Clockwise moment = Force × distance = 4 N × 30 cm = 120 N·cm.',
      'Set Anticlockwise moment = Clockwise moment: W × 30 cm = 120 N·cm, solve for W.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_phy_003',
    nodeId: NODE_C10_PHY_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct Centre of Gravity location to each geometrical shape.',
    dragItems: [
      { label: 'Centroid (Median Intersection)', targetId: 'target_triangle' },
      { label: 'Diagonal Intersection', targetId: 'target_rectangle' },
      { label: 'Geometrical Centre', targetId: 'target_circle' },
    ],
    correctMapping: {
      target_triangle: 'Centroid (Median Intersection)',
      target_rectangle: 'Diagonal Intersection',
      target_circle: 'Geometrical Centre',
    },
    explanation: 'For uniform laminas, the CG coincides with the geometric symmetry points: centroid for triangles, diagonal intersection for rectangles, and central point for circles/rings.',
    hints: [
      'A triangle has medians intersecting at its centroid.',
      'A rectangle balances at the intersection of its diagonals.',
      'A circular disc or ring has its CG at its geometric center.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_phy_004',
    nodeId: NODE_C10_PHY_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When a solid cone resting on its apex is slightly tilted, what happens to its Centre of Gravity (CG) and why does it topple?',
    options: [
      'Its CG falls, and the torque due to weight acts in the direction of tilt (Unstable)',
      'Its CG rises, and a restoring torque pulls it back (Stable)',
      'Its CG stays at the same vertical level with zero net moment (Neutral)',
      'Its CG shifts outside the universe, creating translational acceleration',
    ],
    correctIndex: 0,
    explanation: 'For a cone balanced on its apex, any displacement lowers its CG (CG falls). The weight line falls outside the support point, creating an overturning moment, making it unstable equilibrium.',
    hints: [
      'Think about the CG-height test: Does the CG go higher, lower, or remain level when tilted?',
      'If you tip a pencil on its sharp point, the CG drops downward.',
      'When CG falls on displacement, the equilibrium is unstable.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_005',
    nodeId: NODE_C10_PHY_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A railway coolie pulls a trolley with a force of 100 N at an angle of 60° to the horizontal floor. If the trolley moves 10 m horizontally, calculate the work done in Joules. (cos 60° = 0.5)',
    correctAnswer: 500,
    tolerance: 1,
    unit: 'J',
    explanation: 'Work done W = F × S × cos(θ) = 100 N × 10 m × cos(60°) = 1000 × 0.5 = 500 J.',
    hints: [
      'Use the formula: W = F · S · cos θ.',
      'Substitute F = 100 N, S = 10 m, and cos(60°) = 0.5.',
      'Multiply 100 × 10 × 0.5 to find work in Joules.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_phy_006',
    nodeId: NODE_C10_PHY_004,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'evaluation',
    question: 'A porter carries a 30 kg suitcase on his head while walking 50 m horizontally along a level platform. What is the mechanical work done BY THE PORTER ON THE SUITCASE against gravity?',
    options: [
      '0 Joules (since upward lifting force is perpendicular to horizontal displacement, θ = 90°)',
      '14,700 Joules (W = mgh)',
      '1500 Joules (W = F × d)',
      '294 Joules (due to muscle friction)',
    ],
    correctIndex: 0,
    explanation: 'The porter applies an upward vertical force to balance weight, while the displacement is horizontal. Since θ = 90°, cos(90°) = 0, so mechanical work done on the suitcase is 0 J.',
    hints: [
      'Identify the direction of the force: Upward.',
      'Identify the direction of motion: Horizontal.',
      'The angle between upward and horizontal is 90°. cos 90° = 0.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_phy_007',
    nodeId: NODE_C10_PHY_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An electric pump in a Bengaluru apartment lifts 600 kg of water to an overhead tank 20 m high in 60 seconds. Taking g = 10 m/s², what is the power output of the pump in Watts?',
    correctAnswer: 2000,
    tolerance: 10,
    unit: 'W',
    explanation: 'Work done W = mgh = 600 × 10 × 20 = 120,000 J. Power P = W / t = 120,000 J / 60 s = 2000 W (or 2 kW).',
    hints: [
      'Step 1: Calculate work W = mgh = 600 kg × 10 m/s² × 20 m.',
      'W = 120,000 Joules.',
      'Step 2: Power P = W / t = 120,000 / 60 seconds.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_phy_008',
    nodeId: NODE_C10_PHY_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'An agricultural irrigation motor is rated at 5 Horsepower (hp). What is this power in Watts?',
    options: ['3,730 W', '5,000 W', '746 W', '1,492 W'],
    correctIndex: 0,
    explanation: '1 Horsepower (hp) = 746 Watts. Therefore, 5 hp = 5 × 746 W = 3,730 W.',
    hints: [
      'Recall the conversion constant: 1 hp = 746 W.',
      'Multiply 5 by 746.',
      '5 × 700 = 3500; 5 × 46 = 230; 3500 + 230 = 3730 W.',
    ],
  },
  {
    id: 'ch_phy_009',
    nodeId: NODE_C10_PHY_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A 1 kg stone is dropped from a cliff 80 m high (g = 10 m/s²). At what height above the ground will its Kinetic Energy (K) be exactly equal to its Potential Energy (U)?',
    options: [
      '40 m above the ground (where U = 400 J and K = 400 J)',
      '20 m above the ground',
      '60 m above the ground',
      '80 m above the ground',
    ],
    correctIndex: 0,
    explanation: 'Total initial energy E_total = mgH = 1 × 10 × 80 = 800 J. When K = U, each must equal half the total energy: U = 400 J. Since U = mgh, h = 400 / (1 × 10) = 40 m (the exact midpoint).',
    hints: [
      'Total mechanical energy is constant: E = U + K = mgH = 800 J.',
      'If K = U, then 2U = 800 J, meaning U = 400 J.',
      'Solve mgh = 400 J -> 1 × 10 × h = 400 -> h = 40 m.',
    ],
  },
  {
    id: 'ch_phy_010',
    nodeId: NODE_C10_PHY_007,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the speed-energy stages of an oscillating pendulum bob starting from the extreme left position to extreme right.',
    sortItems: [
      'Extreme Left: Speed = 0, Max Potential Energy (U), Zero Kinetic Energy (K)',
      'Falling Down: PE transforms into KE, Speed increasing',
      'Mean Position (Bottom): Min PE, Max Kinetic Energy (K), Max Speed',
      'Rising Up: KE transforms back into PE, Speed decreasing',
      'Extreme Right: Speed = 0, Max Potential Energy (U), Zero Kinetic Energy (K)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'As a pendulum swings, PE is maximum at the extremes where the bob pauses, completely converting to maximum KE at the lowest mean position, before converting back to PE.',
    hints: [
      'Start at the extreme left where it is momentarily at rest (Max PE).',
      'Next, it accelerates downward toward the mean center (Max KE).',
      'Finally, it ascends to the opposite extreme stopping again (Max PE).',
    ],
  },
  {
    id: 'ch_phy_011',
    nodeId: NODE_C10_PHY_008,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct the complete energy transformation chain in a Hydroelectric Power Plant from dam water to lit home bulb.',
    availableParts: [
      'Gravitational PE (Dam)',
      'Kinetic Energy (Water Flow)',
      'Mechanical Energy (Turbine)',
      'Electrical Energy (Generator)',
      'Light & Heat Energy (Bulb)',
    ],
    targetState: 'Gravitational PE (Dam) Kinetic Energy (Water Flow) Mechanical Energy (Turbine) Electrical Energy (Generator) Light & Heat Energy (Bulb)',
    validationHint: 'Connect in sequence: Dam height → Falling water → Rotating turbine → Generator current → Home bulb.',
    explanation: 'Hydroelectric energy flow: Stored water PE -> Flowing water KE -> Turbine rotation (Mechanical) -> Generator output (Electrical) -> Bulb emission (Light + Heat).',
    hints: [
      'Step 1: Stored water at height has Gravitational PE.',
      'Step 2: Water rushes down gaining Kinetic Energy.',
      'Step 3: Water turns the turbine (Mechanical) which drives the generator (Electrical) to light the bulb.',
    ],
  },
  {
    id: 'ch_phy_012',
    nodeId: NODE_C10_PHY_009,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A crowbar is used to lift a rock weighing 900 N by applying an effort force of 150 N. What is the Mechanical Advantage (MA) of this lever?',
    correctAnswer: 6,
    tolerance: 0.05,
    unit: '',
    explanation: 'Mechanical Advantage MA = Load / Effort = 900 N / 150 N = 6. It is dimensionless (no units).',
    hints: [
      'Formula: MA = Load (L) / Effort (E).',
      'L = 900 N, E = 150 N.',
      '900 / 150 = 6.',
    ],
  },
  {
    id: 'ch_phy_013',
    nodeId: NODE_C10_PHY_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a pulley system, the effort rope is pulled through 8 m to raise a load through 2 m. The actual load is 300 N using 100 N effort. Calculate the Velocity Ratio (VR) and actual Mechanical Advantage (MA).',
    options: [
      'VR = 4, MA = 3 (Practical machine with friction, MA < VR)',
      'VR = 3, MA = 4 (Impossible, machine generates extra energy)',
      'VR = 0.25, MA = 3',
      'VR = 4, MA = 4 (Ideal frictionless machine)',
    ],
    correctIndex: 0,
    explanation: 'Velocity Ratio VR = dE / dL = 8 m / 2 m = 4. Mechanical Advantage MA = Load / Effort = 300 N / 100 N = 3. Because of friction, MA (3) < VR (4).',
    hints: [
      'VR = distance of effort / distance of load = 8 / 2 = 4.',
      'MA = Load / Effort = 300 / 100 = 3.',
      'Notice MA < VR in any real practical machine with friction.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_phy_014',
    nodeId: NODE_C10_PHY_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A crane mechanism has a Velocity Ratio VR = 5 and an efficiency of 80% (0.80). What load (in N) can this crane lift if an effort of 250 N is applied?',
    correctAnswer: 1000,
    tolerance: 5,
    unit: 'N',
    explanation: 'Efficiency η = MA / VR => MA = η × VR = 0.80 × 5 = 4.0. Since MA = Load / Effort, Load = MA × Effort = 4.0 × 250 N = 1000 N.',
    hints: [
      'Recall: Efficiency η = MA / VR.',
      'Calculate MA: MA = 0.80 × 5 = 4.',
      'Find Load: Load = MA × Effort = 4 × 250 N.',
    ],
  },
  {
    id: 'ch_phy_015',
    nodeId: NODE_C10_PHY_001,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A mechanic at a Tata Motors workshop in Pune struggles to loosen a rusted truck lug nut. Which action is scientifically best to double the loosening torque WITHOUT applying more physical force?',
    options: [
      'Fit an extension metal pipe over the spanner handle to double its effective length (d)',
      'Push the spanner at a 30° angle instead of 90°',
      'Use a shorter wrench so the force travels faster',
      'Hit the bolt with grease to decrease its mass',
    ],
    correctIndex: 0,
    explanation: 'Torque = F × d × sin(θ). If force F is constant and θ = 90°, doubling the lever arm length (d) with an extension pipe doubles the turning effect effortlessly.',
    hints: [
      'Torque τ = F × d.',
      'If F cannot increase, what else in the formula can you increase?',
      'Extending the handle increases the perpendicular distance d.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_phy_016',
    nodeId: NODE_C10_PHY_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why are Mumbai BEST double-decker buses designed with heavy chassis batteries at the very bottom and strict restrictions against standing on the upper deck?',
    options: [
      'To keep the Centre of Gravity as low as possible, ensuring a large restoring torque when tilting (Stable Equilibrium)',
      'To increase the velocity ratio of the bus wheels',
      'To make the bus lighter so it uses less power',
      'To convert kinetic energy into chemical energy during turns',
    ],
    correctIndex: 0,
    explanation: 'Lowering the Centre of Gravity increases stability. When the bus tilts during sharp turns, a low CG causes the weight vector to stay inside the wide wheel track, generating a restoring moment that prevents toppling.',
    hints: [
      'Think about where the CG is when heavy mass is at the bottom.',
      'A low CG requires a much larger tilt angle before it passes outside the wheel base.',
      'This promotes stable equilibrium.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_017',
    nodeId: NODE_C10_PHY_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Mahindra Thar jeep of mass 1200 kg increases its highway speed from 10 m/s (36 km/h) to 20 m/s (72 km/h). By what factor did its Kinetic Energy increase?',
    correctAnswer: 4,
    tolerance: 0.1,
    unit: 'times',
    explanation: 'K = 1/2 m v². Because velocity is squared, doubling speed (20/10 = 2) increases kinetic energy by 2² = 4 times. Initial K = 60,000 J; Final K = 240,000 J (240k/60k = 4).',
    hints: [
      'Notice the formula: K = 1/2 · m · v².',
      'Ratio of K = (v_final / v_initial)² = (20 / 10)².',
      '2² = 4.',
    ],
  },
  {
    id: 'ch_phy_018',
    nodeId: NODE_C10_PHY_006,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 0.5 kg roller-coaster cart starts from rest at the top of a 45 m high track. Assuming no friction and g = 10 m/s², what is its velocity (in m/s) when it reaches a height of 25 m?',
    correctAnswer: 20,
    tolerance: 0.5,
    unit: 'm/s',
    explanation: 'Loss in PE = Gain in KE: mg(H - h) = 1/2 m v² => v² = 2g(H - h) = 2 × 10 × (45 - 25) = 20 × 20 = 400 => v = 20 m/s.',
    hints: [
      'Height fallen = 45 m - 25 m = 20 m.',
      'Kinetic energy gained = mg × (height fallen).',
      '1/2 m v² = m g (20) => v = √(2 × 10 × 20) = √400 = 20 m/s.',
    ],
  },
  {
    id: 'ch_phy_019',
    nodeId: NODE_C10_PHY_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the state of Centre of Gravity upon displacement with the equilibrium type.',
    dragItems: [
      { label: 'CG Rises (Restoring Torque)', targetId: 'target_stable' },
      { label: 'CG Falls (Toppling Torque)', targetId: 'target_unstable' },
      { label: 'CG Stays at Same Height', targetId: 'target_neutral' },
    ],
    correctMapping: {
      target_stable: 'CG Rises (Restoring Torque)',
      target_unstable: 'CG Falls (Toppling Torque)',
      target_neutral: 'CG Stays at Same Height',
    },
    explanation: 'Stable: CG rises and gravity restores it. Unstable: CG falls and gravity pulls it further away. Neutral: CG height is constant (e.g. rolling ball).',
    hints: [
      'Stable equilibrium always raises the center of mass when tilted.',
      'Unstable lowers the center of mass when disturbed.',
      'Neutral keeps the center of mass at a constant plane.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_020',
    nodeId: NODE_C10_PHY_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Can any machine have a Mechanical Advantage greater than 1 and simultaneously multiply speed (gain in speed)?',
    options: [
      'No, because by conservation of work, gaining force (MA > 1) requires moving a greater distance (sacrificing speed)',
      'Yes, by using super-conductive frictionless oils',
      'Yes, if the load is lighter than the effort',
      'No, because Velocity Ratio is always equal to 0',
    ],
    correctIndex: 0,
    explanation: 'A machine can either be a force multiplier (MA > 1, effort moves farther than load) OR a speed multiplier (MA < 1, load moves farther/faster than effort). It can never do both, as that would violate energy conservation.',
    hints: [
      'Recall the trade-off: Work Input = Effort × distance.',
      'If you save force (MA > 1), you MUST move through more distance.',
      'Moving more distance in the same time means the effort moves faster, not the load.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_phy_021',
    nodeId: NODE_C10_PHY_002,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the laboratory steps to locate the Centre of Gravity of an irregular cardboard lamina using a plumb line.',
    sortItems: [
      'Make 3 small pin-holes (A, B, C) near the outer edges of the lamina',
      'Suspend the lamina freely from hole A on a fixed clamp stand',
      'Hang a plumb line from the same pin and trace the vertical line on the lamina',
      'Repeat the suspension and plumb line tracing from hole B and hole C',
      'Locate the intersection point of the traced plumb lines — this point is the CG',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'When hung freely, the CG always rests vertically below the pivot so that the moment of weight is zero. The intersection of plumb lines from multiple pivots pinpoints the unique CG.',
    hints: [
      'Start by punching holes near the periphery.',
      'Hang freely from hole A with a plumb line and draw the vertical.',
      'Repeat for holes B and C; the common intersection is the CG.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_phy_022',
    nodeId: NODE_C10_PHY_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Rohan (mass 50 kg) runs up a flight of 40 stairs, each 15 cm high, in 10 seconds. Taking g = 10 m/s², calculate the power developed by Rohan in Watts.',
    correctAnswer: 300,
    tolerance: 5,
    unit: 'W',
    explanation: 'Total height h = 40 steps �� 0.15 m = 6.0 m. Work W = mgh = 50 × 10 × 6.0 = 3000 J. Power P = W / t = 3000 J / 10 s = 300 W.',
    hints: [
      'Calculate total height in metres: 40 × 0.15 m = 6 m.',
      'Work W = mgh = 50 kg × 10 m/s² × 6 m = 3000 J.',
      'Power P = W / time = 3000 / 10 s = 300 W.',
    ],
    misconceptionIndex: 4,
  },
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Metre Rule Seesaw (Principle of Moments)',
    instruction: 'Drag the left and right weights or shift their distances to balance the seesaw in rotational equilibrium.',
    interactionType: 'slider-balance',
    nodeId: NODE_C10_PHY_001,
  },
  {
    title: 'Lab 2: Centre of Gravity & Stability Test',
    instruction: 'Tilt the cone or modify the base width to observe whether the CG rises (stable) or falls (unstable).',
    interactionType: 'tilt-stability',
    nodeId: NODE_C10_PHY_002,
  },
  {
    title: 'Lab 3: Work Vector & Force Angle',
    instruction: 'Rotate the pulling force vector from 0° to 90° and watch how W = F·S·cos(θ) decreases to zero.',
    interactionType: 'angle-work',
    nodeId: NODE_C10_PHY_004,
  },
  {
    title: 'Lab 4: Conservation of Energy (Falling Mass & Pendulum)',
    instruction: 'Release the ball from different heights and observe the real-time trade-off between PE (mgh) and KE (½mv²).',
    interactionType: 'energy-fall',
    nodeId: NODE_C10_PHY_006,
  },
  {
    title: 'Lab 5: Pulley System Trade-Off (MA vs VR)',
    instruction: 'Adjust the pulley setup to see how trading distance (VR) allows smaller effort force (MA).',
    interactionType: 'pulley-tradeoff',
    nodeId: NODE_C10_PHY_009,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you move a 5 N weight twice as far from the pivot, what happens to its turning torque?',
    options: ['Torque doubles', 'Torque stays the same', 'Torque is halved', 'Torque becomes zero'],
    correctIndex: 0,
    verifyInstruction: 'Drag the weight slider to double distance on the balance beam to verify!',
    nodeId: NODE_C10_PHY_001,
  },
  {
    question: 'Predict: When an object is pulled horizontally by an upward vertical rope (θ = 90°), how much work is done by the rope?',
    options: ['Zero Joules', 'Maximum possible work', 'Half of F × S', 'Negative work'],
    correctIndex: 0,
    verifyInstruction: 'Set the force angle slider to 90° in the Work Lab and observe the work gauge.',
    nodeId: NODE_C10_PHY_004,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the sum of Potential Energy and Kinetic Energy at every point during the pendulum swing?',
    observableOptions: [
      'Total Mechanical Energy (U + K) remains strictly constant throughout the motion',
      'Total energy increases as speed increases',
      'Potential energy is highest at the bottom',
      'Kinetic energy is destroyed at the top',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_PHY_006,
  },
  {
    question: 'What do you observe about the ratio MA/VR in any realistic machine with friction?',
    observableOptions: [
      'MA is always less than VR (Efficiency < 100%)',
      'MA is always greater than VR',
      'MA is always equal to VR',
      'VR changes with lubrication',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_PHY_010,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Home & Workshop Physics Audit',
  description: 'Apply what you learned to 3 real mechanical tools in your home or school lab:',
  steps: [
    'Measure the effort arm and load arm of a pair of scissors or pliers, and calculate its MA.',
    'Test the stability of 3 household items (a bottle standing upright, on its side, and upside down). Note which has a rising or falling CG on tilt.',
    'Time yourself walking vs running up a 3-metre staircase to calculate your personal muscle power output in Watts and Horsepower.',
  ],
};

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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_PHY_001,
  title: 'ICSE Class 10: Force, Work, Power & Energy Mastery',
  definition: 'Turning effect of force (Torque = F × d), Centre of Gravity, Types of Equilibrium, Work done (W = FS cos��), Power (P = W/t), Conservation of Energy (U + K = constant), and Simple Machines (MA = L/E, VR = dE/dL).',
  eli5: 'Torque is how hard a push turns things (farther from the pivot is easier!). Energy cannot disappear; it just trades places between height (PE) and speed (KE). Machines trade force for distance so you can lift heavy things easily.',
  misconceptions: [
    { misconception: 'Using straight-line distance instead of perpendicular distance to the line of action.', correction: 'Torque requires the perpendicular distance from pivot to line of action: τ = F · d · sin(θ).' },
    { misconception: 'Centre of Gravity must always lie inside the solid material of a body.', correction: 'CG can lie in empty space outside the material (e.g. at the centre of a hollow ring or boomerang).' },
    { misconception: 'A stationary object is always in stable equilibrium.', correction: 'An object at rest can be unstable (e.g. pencil balanced on tip) if its CG falls upon the slightest displacement.' },
    { misconception: 'Carrying a heavy bag while walking horizontally does mechanical work against gravity.', correction: 'Since upward supporting force is at 90° to horizontal displacement, cos 90° = 0, so mechanical work on the bag is 0 J.' },
    { misconception: 'A more powerful machine does more total work.', correction: 'Power is the RATE of doing work (P = W/t). A 100 W bulb does work faster than a 50 W bulb, but both can do the same total work if the 50 W runs longer.' },
    { misconception: 'A machine can multiply both force and speed at the same time.', correction: 'Due to conservation of energy, gaining force (MA > 1) always requires moving through a greater distance (sacrificing speed).' },
  ],
  diagnosticQuestions: [
    { question: 'What is the SI unit of torque?', options: ['Newton-metre (N·m)', 'Joule (J)', 'Watt (W)', 'Pascal (Pa)'], correctIndex: 0 },
    { question: 'Where is the CG of a uniform circular ring?', options: ['At its geometric centre (empty space)', 'On the outer rim', 'At the bottom edge', 'It has no CG'], correctIndex: 0 },
    { question: 'What happens to the CG of a cone on its base when tilted?', options: ['It rises', 'It falls', 'It remains level', 'It vanishes'], correctIndex: 0 },
    { question: 'What is the work done by centripetal force on a body moving in a circle?', options: ['Zero (θ = 90°)', 'Maximum', 'Negative', 'Infinite'], correctIndex: 0 },
    { question: '1 Horsepower is equal to how many Watts?', options: ['746 W', '1000 W', '500 W', '100 W'], correctIndex: 0 },
    { question: 'For a freely falling body, what remains constant throughout?', options: ['Sum of PE and KE (U + K)', 'Only Velocity', 'Only Height', 'Acceleration increases'], correctIndex: 0 },
    { question: 'If a machine has MA = 4 and VR = 5, what is its efficiency?', options: ['80%', '125%', '20%', '100%'], correctIndex: 0 },
    { question: 'Which energy conversion occurs in an electric motor?', options: ['Electrical to Mechanical', 'Mechanical to Electrical', 'Chemical to Heat', 'Sound to Light'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master torque balance, CG stability, work vectors, power rates, energy conservation, and machine trade-offs.',
};

function C10_PhysicsTurningEffectForceSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_PHY_001,
  title = DEFAULT_PROPS.title || 'Force, Work, Power & Energy Sim',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery & Predict-Check States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);

  // Escalating hints & Explanation
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback Animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Reflection State
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── INTERACTIVE SIMULATION LAB VARIABLES ───
  // Lab 1: Seesaw Moments
  const [leftWeight, setLeftWeight] = useState(4);
  const [leftDist, setLeftDist] = useState(30);
  const [rightWeight, setRightWeight] = useState(6);
  const [rightDist, setRightDist] = useState(20);

  // Lab 2: Cone Tilt & Stability
  const [tiltAngle, setTiltAngle] = useState(15);
  const [baseRadius, setBaseRadius] = useState(40);
  const [coneHeight] = useState(100);

  // Lab 3: Work at Angle
  const [pullForce, setPullForce] = useState(100);
  const [pullDist] = useState(10);
  const [pullAngle, setPullAngle] = useState(30);

  // Lab 4: Conservation of Energy
  const [dropMass] = useState(1);
  const [dropHeight, setDropHeight] = useState(50);
  const [currentFallPos, setCurrentFallPos] = useState(25);
  const [isSimRunning, setIsSimRunning] = useState(false);

  // Lab 5: Machines (MA & VR)
  const [machineLoad, setMachineLoad] = useState(600);
  const [machineEffort, setMachineEffort] = useState(150);
  const [effortDistance, setEffortDistance] = useState(8);
  const [loadDistance] = useState(2);

  // BKT State & Timer Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES FOR REAL-TIME SIMULATION ───
  const anticlockwiseTorque = useMemo(() => leftWeight * (leftDist / 100), [leftWeight, leftDist]);
  const clockwiseTorque = useMemo(() => rightWeight * (rightDist / 100), [rightWeight, rightDist]);
  const netTorque = useMemo(() => clockwiseTorque - anticlockwiseTorque, [clockwiseTorque, anticlockwiseTorque]);
  const isBalanced = useMemo(() => Math.abs(netTorque) < 0.05, [netTorque]);

  const calculatedWork = useMemo(() => {
    const rad = (pullAngle * Math.PI) / 180;
    return pullForce * pullDist * Math.cos(rad);
  }, [pullForce, pullDist, pullAngle]);

  const totalMechanicalEnergy = useMemo(() => dropMass * 10 * dropHeight, [dropMass, dropHeight]);
  const currentPE = useMemo(() => dropMass * 10 * currentFallPos, [dropMass, currentFallPos]);
  const currentKE = useMemo(() => Math.max(0, totalMechanicalEnergy - currentPE), [totalMechanicalEnergy, currentPE]);
  const currentVelocity = useMemo(() => Math.sqrt((2 * currentKE) / dropMass), [currentKE, dropMass]);

  const calculatedMA = useMemo(() => (machineEffort > 0 ? machineLoad / machineEffort : 0), [machineLoad, machineEffort]);
  const calculatedVR = useMemo(() => (loadDistance > 0 ? effortDistance / loadDistance : 0), [effortDistance, loadDistance]);
  const calculatedEfficiency = useMemo(() => (calculatedVR > 0 ? (calculatedMA / calculatedVR) * 100 : 0), [calculatedMA, calculatedVR]);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
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
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

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

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.04 + frame * 0.05) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const cx = canvas.width - 35;
      const cy = 25;
      const orbitR = 12;
      const px = cx + Math.cos(frame * 0.08) * orbitR;
      const py = cy + Math.sin(frame * 0.08) * orbitR;

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Active Physics Engine | Frame: ${frame}`, 10, 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isSimRunning) {
      timer = setInterval(() => {
        setCurrentFallPos(prev => {
          if (prev <= 1) {
            setIsSimRunning(false);
            return 0;
          }
          return Math.max(0, prev - 2);
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isSimRunning]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
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
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding physics intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Drag variables to explore!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox mode: test and play freely with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Show your mastery.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now verify it using the live sliders!');
  }, []);

  const handleCompleteSim = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the ICSE Physics mechanics master simulation.');
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
      handleCompleteSim();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSim, resetInactivityTimer]);

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
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        setShowConfetti(true);
        setShowExplanation(true);
        speechManager.speak('Brilliant work! That is completely correct.');

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
          speechManager.speak('Let us study the complete step-by-step resolution.');
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
    [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
      setSortArrangement(prev => {
        const arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleResetFallSim = useCallback(() => {
    setCurrentFallPos(dropHeight);
    setIsSimRunning(false);
    audioManager.play('tap');
  }, [dropHeight]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30 text-2xl">
            {subjectConfig.emoji}
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">ICSE Physics Class 10</span>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Dynamic Navigation Mode Badges */}
        <div className="flex items-center gap-2">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} mode`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-indigo-800/50 rounded-2xl space-y-3">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider">
              Engineering Narrative Scenario
            </span>
            <h2 className="text-2xl font-bold text-indigo-200">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-400 font-semibold">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-lg font-bold text-white">Curiosity Challenge: Before We Begin</h3>
            </div>
            <p className="text-slate-200 text-sm md:text-base">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 text-left rounded-xl text-sm font-medium border transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-indigo-500'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && ' ✓'}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-slate-800/80 border border-indigo-700/50 rounded-xl space-y-3"
              >
                <p className={discoveryCorrect ? 'text-emerald-400 font-semibold text-sm' : 'text-amber-400 font-semibold text-sm'}>
                  {discoveryCorrect ? '✓ Correct! Torque = Force × Distance.' : `✗ Notice: ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Proceed to interactive labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 text-sm"
                >
                  Let us Explore the Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                aria-label="Previous Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                className="px-3 py-1.5 bg-slate-800 disabled:opacity-40 text-white rounded-lg text-xs font-bold"
              >
                ← Prev Lab
              </motion.button>
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === EXPLORATION_STEPS.length - 1}
                onClick={() => setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1))}
                className="px-3 py-1.5 bg-indigo-600 disabled:opacity-40 text-white rounded-lg text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            </div>
          </div>

          <div className="p-4 bg-indigo-950/30 border border-indigo-800/40 rounded-xl">
            <p className="text-amber-300 text-sm font-semibold">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
          </div>

          {/* ─── LAB 1: METRE RULE SEESAW ─── */}
          {currentSlide === 0 && (
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
              {!predictionMade ? (
                <div className="p-4 bg-slate-800/70 border border-slate-700 rounded-xl space-y-2">
                  <p className="text-white text-sm font-bold">{PREDICTION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Prediction option: ${opt}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePrediction(i)}
                        className="p-2 bg-slate-700 hover:bg-indigo-700 text-left rounded-lg text-xs text-slate-200"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/40 border border-emerald-600/40 rounded-xl text-xs text-emerald-300">
                  ✓ Prediction recorded! Manipulate the sliders below to confirm that τ = F × d.
                </div>
              )}

              {/* Dynamic SVG Balance Beam */}
              <div className="relative w-full h-64 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 600 240" className="w-full h-full">
                  <line x1="50" y1="180" x2="550" y2="180" stroke="#334155" strokeWidth="2" />
                  <polygon points="300,120 270,180 330,180" fill="#475569" stroke="#64748b" strokeWidth="2" />
                  <circle cx="300" cy="120" r="5" fill="#f59e0b" />
                  <text x="300" y="200" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
                    Pivot (50 cm mark)
                  </text>

                  <g
                    transform={`rotate(${Math.max(-18, Math.min(18, netTorque * 12))}, 300, 120)`}
                    className="transition-transform duration-300 ease-out"
                  >
                    <rect x="60" y="114" width="480" height="12" rx="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
                    {Array.from({ length: 9 }).map((_, i) => {
                      const x = 100 + i * 50;
                      return (
                        <g key={i}>
                          <line x1={x} y1="114" x2={x} y2="126" stroke="#ffffff" strokeWidth="1.5" />
                          <text x={x} y="110" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                            {10 + i * 10}cm
                          </text>
                        </g>
                      );
                    })}

                    <g transform={`translate(${300 - leftDist * 4}, 126)`}>
                      <line x1="0" y1="0" x2="0" y2="25" stroke="#ef4444" strokeWidth="2" />
                      <rect x="-18" y="25" width="36" height={16 + leftWeight * 4} rx="4" fill="#ef4444" />
                      <text x="0" y={38 + leftWeight * 2} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                        {leftWeight}N
                      </text>
                    </g>

                    <g transform={`translate(${300 + rightDist * 4}, 126)`}>
                      <line x1="0" y1="0" x2="0" y2="25" stroke="#10b981" strokeWidth="2" />
                      <rect x="-18" y="25" width="36" height={16 + rightWeight * 4} rx="4" fill="#10b981" />
                      <text x="0" y={38 + rightWeight * 2} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                        {rightWeight}N
                      </text>
                    </g>
                  </g>
                </svg>

                <div
                  className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                    isBalanced
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-rose-950 border-rose-500 text-rose-300'
                  }`}
                >
                  {isBalanced ? '✓ ROTATIONAL EQUILIBRIUM (Balanced)' : '✗ ROTATING (Unbalanced)'}
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="space-y-3 p-3 bg-slate-900 rounded-lg border border-red-900/40">
                  <span className="text-xs text-red-400 font-bold uppercase">Left Force & Distance (Anticlockwise)</span>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Left Weight: {leftWeight} N</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      aria-label="Left weight in Newtons"
                      value={leftWeight}
                      onChange={e => setLeftWeight(Number(e.target.value))}
                      className="w-full accent-red-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Left Distance: {leftDist} cm</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={45}
                      step={5}
                      aria-label="Left distance from pivot in cm"
                      value={leftDist}
                      onChange={e => setLeftDist(Number(e.target.value))}
                      className="w-full accent-red-500"
                    />
                  </div>
                  <p className="text-xs font-mono text-red-300">
                    τ_anticlockwise = {leftWeight} N × {leftDist} cm = <b>{(leftWeight * leftDist).toFixed(1)} N·cm</b> (
                    {anticlockwiseTorque.toFixed(2)} N·m)
                  </p>
                </div>

                <div className="space-y-3 p-3 bg-slate-900 rounded-lg border border-emerald-900/40">
                  <span className="text-xs text-emerald-400 font-bold uppercase">Right Force & Distance (Clockwise)</span>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Right Weight: {rightWeight} N</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      aria-label="Right weight in Newtons"
                      value={rightWeight}
                      onChange={e => setRightWeight(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Right Distance: {rightDist} cm</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={45}
                      step={5}
                      aria-label="Right distance from pivot in cm"
                      value={rightDist}
                      onChange={e => setRightDist(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <p className="text-xs font-mono text-emerald-300">
                    τ_clockwise = {rightWeight} N × {rightDist} cm = <b>{(rightWeight * rightDist).toFixed(1)} N·cm</b> (
                    {clockwiseTorque.toFixed(2)} N·m)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB 2: CENTRE OF GRAVITY & EQUILIBRIUM STABILITY ─── */}
          {currentSlide === 1 && (
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="h-64 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 300 220" className="w-full h-full">
                    <line x1="20" y1="180" x2="280" y2="180" stroke="#475569" strokeWidth="3" />
                    <g transform={`translate(150, 180) rotate(${tiltAngle}) translate(-150, -180)`}>
                      <polygon
                        points={`150,${180 - coneHeight} ${150 - baseRadius},180 ${150 + baseRadius},180`}
                        fill="#38bdf8"
                        fillOpacity="0.4"
                        stroke="#0284c7"
                        strokeWidth="2"
                      />
                      <ellipse cx="150" cy="180" rx={baseRadius} ry="6" fill="#0284c7" />
                      <circle cx="150" cy={180 - coneHeight / 4} r="6" fill="#f43f5e" />
                      <text x="165" y={185 - coneHeight / 4} fill="#f43f5e" fontSize="11" fontWeight="bold">
                        CG (h/4)
                      </text>
                      <line
                        x1="150"
                        y1={180 - coneHeight / 4}
                        x2="150"
                        y2={180 - coneHeight / 4 + 60}
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                    </g>
                  </svg>

                  <div className="absolute top-2 left-2 p-2 bg-slate-900/90 rounded-lg text-xs space-y-1">
                    <p className="text-sky-300 font-bold">CG Height: {(coneHeight / 4).toFixed(1)} px</p>
                    <p className={tiltAngle > 30 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {tiltAngle > 30 ? '✗ Topples! (Weight line outside base)' : '✓ Restores upright (Stable)'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-white">Stability Parameters</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Tilt Angle: {tiltAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      aria-label="Tilt angle in degrees"
                      value={tiltAngle}
                      onChange={e => setTiltAngle(Number(e.target.value))}
                      className="w-full accent-sky-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Base Width: {baseRadius * 2} px</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={60}
                      aria-label="Base radius in pixels"
                      value={baseRadius}
                      onChange={e => setBaseRadius(Number(e.target.value))}
                      className="w-full accent-sky-500"
                    />
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 leading-relaxed">
                    <b>Physics Rule:</b> Stable equilibrium occurs when tilting causes the CG to <b>rise</b> and the
                    vertical line of action of weight remains <b>inside the base of support</b>.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB 3: WORK VECTOR & FORCE ANGLE ─── */}
          {currentSlide === 2 && (
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="h-64 bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-center">
                  <svg viewBox="0 0 320 200" className="w-full h-full">
                    <line x1="20" y1="150" x2="300" y2="150" stroke="#475569" strokeWidth="2" />
                    <rect x="60" y="100" width="60" height="50" rx="4" fill="#6366f1" stroke="#4f46e5" strokeWidth="2" />
                    <text x="90" y="130" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                      Mass
                    </text>
                    <line x1="120" y1="155" x2="260" y2="155" stroke="#22c55e" strokeWidth="3" />
                    <text x="190" y="175" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">
                      S = {pullDist} m
                    </text>
                    {(() => {
                      const len = 90;
                      const rad = (pullAngle * Math.PI) / 180;
                      const fx = 120 + len * Math.cos(rad);
                      const fy = 125 - len * Math.sin(rad);
                      return (
                        <g>
                          <line x1="120" y1="125" x2={fx} y2={fy} stroke="#f59e0b" strokeWidth="3" />
                          <circle cx={fx} cy={fy} r="4" fill="#f59e0b" />
                          <text x={fx + 10} y={fy} fill="#f59e0b" fontSize="11" fontWeight="bold">
                            F = {pullForce} N
                          </text>
                          <path
                            d={`M 150 125 A 30 30 0 0 0 ${120 + 30 * Math.cos(rad)} ${125 - 30 * Math.sin(rad)}`}
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="1.5"
                          />
                          <text x="160" y="115" fill="#fbbf24" fontSize="10">
                            θ = {pullAngle}°
                          </text>
                        </g>
                      );
                    })()}
                  </svg>

                  <div className="absolute top-2 right-2 p-3 bg-slate-900/90 rounded-xl border border-amber-600/30 text-xs">
                    <p className="text-slate-400">Calculated Work (W = FS cosθ):</p>
                    <p className="text-xl font-black text-amber-400">{calculatedWork.toFixed(1)} Joules</p>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Angle (θ): {pullAngle}°</span>
                      <span className="text-amber-400 font-mono">cos({pullAngle}°) = {Math.cos((pullAngle * Math.PI) / 180).toFixed(3)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      aria-label="Force pull angle in degrees"
                      value={pullAngle}
                      onChange={e => setPullAngle(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Force (F): {pullForce} N</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={200}
                      aria-label="Pull force in Newtons"
                      value={pullForce}
                      onChange={e => setPullForce(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
                    <p className="text-emerald-400">
                      ✓ <b>Special Case θ = 0°:</b> Maximum work W = F × S ({pullForce * pullDist} J).
                    </p>
                    <p className="text-rose-400">
                      ✗ <b>Special Case θ = 90°:</b> Zero work W = 0 J (Porter carrying luggage horizontally).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB 4: CONSERVATION OF ENERGY ─── */}
          {currentSlide === 3 && (
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="h-72 bg-slate-950 rounded-xl border border-slate-800 relative flex overflow-hidden p-4">
                  <div className="w-16 border-r border-slate-800 flex flex-col justify-between text-[10px] text-slate-400 font-mono py-2">
                    <span>H = {dropHeight} m</span>
                    <span>37.5 m</span>
                    <span>25.0 m</span>
                    <span>12.5 m</span>
                    <span>Ground (0 m)</span>
                  </div>

                  <div className="flex-1 relative">
                    <motion.div
                      animate={{
                        top: `${((dropHeight - currentFallPos) / dropHeight) * 80 + 5}%`,
                      }}
                      transition={{ duration: 0.05 }}
                      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-lg shadow-yellow-500/40 border border-yellow-200" />
                      <span className="text-[10px] text-yellow-300 font-bold mt-1">h = {currentFallPos.toFixed(1)} m</span>
                    </motion.div>
                  </div>

                  <div className="w-40 bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col justify-between text-xs space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] text-sky-300 mb-1">
                        <span>PE (U):</span>
                        <b>{currentPE.toFixed(0)} J</b>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-sky-500 rounded-full"
                          animate={{ width: `${(currentPE / totalMechanicalEnergy) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-emerald-300 mb-1">
                        <span>KE (K):</span>
                        <b>{currentKE.toFixed(0)} J</b>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500 rounded-full"
                          animate={{ width: `${(currentKE / totalMechanicalEnergy) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <p className="text-[10px] text-slate-400">Total Energy (U + K):</p>
                      <p className="text-sm font-black text-white">{totalMechanicalEnergy.toFixed(0)} Joules</p>
                      <p className="text-[10px] text-indigo-400 font-bold mt-1">Speed: {currentVelocity.toFixed(1)} m/s</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Release Height: {dropHeight} m</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      step={5}
                      aria-label="Release height in metres"
                      value={dropHeight}
                      onChange={e => {
                        setDropHeight(Number(e.target.value));
                        setCurrentFallPos(Number(e.target.value));
                      }}
                      className="w-full accent-yellow-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Manual Height Position: {currentFallPos.toFixed(1)} m</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={dropHeight}
                      step={1}
                      aria-label="Current falling height in metres"
                      value={currentFallPos}
                      onChange={e => setCurrentFallPos(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      aria-label={isSimRunning ? 'Pause Free Fall' : 'Drop Mass'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSimRunning(r => !r)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold text-white ${
                        isSimRunning ? 'bg-amber-600' : 'bg-emerald-600'
                      }`}
                    >
                      {isSimRunning ? 'Pause Free Fall' : '▶ Drop Mass'}
                    </motion.button>
                    <motion.button
                      aria-label="Reset Free Fall Simulation"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleResetFallSim}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold"
                    >
                      Reset
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB 5: SIMPLE MACHINES ─── */}
          {currentSlide === 4 && (
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-center p-4">
                  <svg viewBox="0 0 300 220" className="w-full h-full">
                    <line x1="40" y1="20" x2="260" y2="20" stroke="#64748b" strokeWidth="4" />
                    <circle cx="120" cy="50" r="22" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="120" y1="20" x2="120" y2="50" stroke="#64748b" strokeWidth="2" />
                    <circle cx="120" cy="140" r="22" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="98" y1="50" x2="98" y2="140" stroke="#fbbf24" strokeWidth="2.5" />
                    <line x1="142" y1="50" x2="142" y2="140" stroke="#fbbf24" strokeWidth="2.5" />
                    <line x1="142" y1="50" x2="210" y2="160" stroke="#fbbf24" strokeWidth="2.5" />

                    <g transform="translate(120, 162)">
                      <rect x="-25" y="0" width="50" height="35" rx="4" fill="#3b82f6" />
                      <text x="0" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                        {machineLoad} N
                      </text>
                      <text x="0" y="48" textAnchor="middle" fill="#60a5fa" fontSize="9">
                        dL = {loadDistance} m
                      </text>
                    </g>

                    <g transform="translate(210, 160)">
                      <circle cx="0" cy="0" r="6" fill="#f59e0b" />
                      <text x="25" y="5" fill="#f59e0b" fontSize="11" fontWeight="bold">
                        E = {machineEffort} N
                      </text>
                      <text x="25" y="18" fill="#fbbf24" fontSize="9">
                        dE = {effortDistance} m
                      </text>
                    </g>
                  </svg>

                  <div className="absolute top-2 right-2 p-3 bg-slate-900/90 rounded-xl border border-slate-700 text-xs space-y-1">
                    <p className="text-slate-300">
                      MA = L/E: <b className="text-white">{calculatedMA.toFixed(2)}</b>
                    </p>
                    <p className="text-slate-300">
                      VR = dE/dL: <b className="text-white">{calculatedVR.toFixed(2)}</b>
                    </p>
                    <p className={calculatedEfficiency <= 100 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      Efficiency η: {calculatedEfficiency.toFixed(1)}% {calculatedEfficiency <= 100 ? '✓' : '✗'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Load (L): {machineLoad} N</span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={1200}
                      step={50}
                      aria-label="Load weight in Newtons"
                      value={machineLoad}
                      onChange={e => setMachineLoad(Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Effort (E): {machineEffort} N</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={600}
                      step={25}
                      aria-label="Effort force in Newtons"
                      value={machineEffort}
                      onChange={e => setMachineEffort(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Effort Distance (dE): {effortDistance} m</span>
                      <span>Load Distance (dL): {loadDistance} m</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={12}
                      step={1}
                      aria-label="Effort distance in metres"
                      value={effortDistance}
                      onChange={e => setEffortDistance(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <span className="text-xs text-slate-400">Step {currentSlide + 1} of 5</span>
            {currentSlide === EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Proceed to Free Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30 text-sm"
              >
                Proceed to Free Sandbox →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Next Lab Step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 text-sm"
              >
                Next Lab →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase">
              Free Play Playground
            </span>
            <h3 className="text-2xl font-black text-white">Full Mechanical Sandbox</h3>
            <p className="text-slate-300 text-sm">
              Combine all variables: adjust torque weights, force angles, and machine load simultaneously without timer or grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <span className="text-xs text-indigo-400 font-bold uppercase">Torque Balancer</span>
              <p className="text-xs text-slate-400">Left: {leftWeight} N @ {leftDist} cm</p>
              <input
                type="range"
                min={1}
                max={10}
                aria-label="Sandbox left weight"
                value={leftWeight}
                onChange={e => setLeftWeight(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <p className="text-xs text-slate-400">Right: {rightWeight} N @ {rightDist} cm</p>
              <input
                type="range"
                min={1}
                max={10}
                aria-label="Sandbox right weight"
                value={rightWeight}
                onChange={e => setRightWeight(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <p className="text-xs font-mono text-amber-300">Net: {netTorque.toFixed(2)} N·m {isBalanced ? '✓' : '✗'}</p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <span className="text-xs text-amber-400 font-bold uppercase">Work at Angle (cosθ)</span>
              <p className="text-xs text-slate-400">Angle: {pullAngle}°</p>
              <input
                type="range"
                min={0}
                max={90}
                aria-label="Sandbox pull angle"
                value={pullAngle}
                onChange={e => setPullAngle(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-xs font-mono text-emerald-400">Work: {calculatedWork.toFixed(1)} J</p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <span className="text-xs text-sky-400 font-bold uppercase">Pulley Efficiency</span>
              <p className="text-xs text-slate-400">Effort: {machineEffort} N</p>
              <input
                type="range"
                min={50}
                max={500}
                aria-label="Sandbox machine effort"
                value={machineEffort}
                onChange={e => setMachineEffort(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
              <p className="text-xs font-mono text-indigo-300">η = {calculatedEfficiency.toFixed(1)}%</p>
            </div>
          </div>

          <motion.button
            aria-label="Start challenges"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-black text-base shadow-xl shadow-indigo-600/30"
          >
            I am Ready for the Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={600} height={40} className="w-full rounded-xl bg-slate-950 border border-slate-800" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : difficulty === 'advanced'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 uppercase">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-400">
                Score: <b className="text-emerald-400">{scoreBreakdown.correct}</b> / {scoreBreakdown.total}
              </span>
              <span className="text-slate-400">
                Mastery: <b className="text-indigo-400 capitalize">{masteryLevel}</b>
              </span>
            </div>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* CHALLENGE CARD */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 border rounded-2xl space-y-6 transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">{challenge.question}</h3>

            {/* 1. MCQ OPTIONS */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      disabled={showExplanation || answerRevealed}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-4 text-left rounded-xl text-sm font-medium border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-indigo-500'
                      }`}
                    >
                      <span className="font-bold mr-3">{String.fromCharCode(65 + i)}.</span> {opt}
                      {showExplanation && i === challenge.correctIndex && ' ✓'}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold cursor-grab"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(targetKey => (
                    <div
                      key={targetKey}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-4 bg-slate-950 border border-dashed border-slate-700 rounded-xl text-center space-y-2 min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-xs text-slate-400 capitalize">{targetKey.replace('target_', '')}</span>
                      <p className="text-xs font-bold text-amber-300">
                        {droppedLabels[targetKey] ? `✓ ${droppedLabels[targetKey]}` : '[ Drop Label Here ]'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify drag and drop labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={showExplanation}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Labels
                </motion.button>
              </div>
            )}

            {/* 3. DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag/Reorder steps into the correct scientific sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort step ${displayIndex + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-bold">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={showExplanation}
                  onClick={handleSortSubmit}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Numerical answer input"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value..."
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-indigo-500 outline-none w-64"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={showExplanation || !numericInput}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Click items in order to build the correct conversion chain:</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((p, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${p}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, p])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs"
                    >
                      + {p}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-indigo-900/60 border border-indigo-700 text-indigo-200 rounded-lg text-xs flex items-center gap-2"
                    >
                      {p}
                      <button
                        aria-label={`Remove part: ${p}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Constructed chain will appear here...</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Constructed Chain"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={showExplanation || constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Constructed Chain
                </motion.button>
              </div>
            )}

            {/* STEPWISE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-amber-950/40 border border-amber-700/50 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Step-by-Step Resolution
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((stepSentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-200/90 leading-relaxed"
                      >
                        <b className="text-amber-400 mr-2">Step {idx + 1}:</b> {stepSentence}
                        {!stepSentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex gap-3 pt-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Reveal next step of explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700/60 hover:bg-amber-700 text-amber-100 rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Advance to next challenge or completion"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
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

      {/* ─── PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 border border-emerald-500/40 rounded-3xl text-center space-y-4 shadow-2xl">
            <span className="text-4xl">🏆</span>
            <h2 className="text-3xl font-black text-white">ICSE Physics Mechanics Mastery Attained!</h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm">
              You calculated torques, verified energy conservation, inspected stability, and mastered mechanical trade-offs.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl min-w-[120px]">
                <span className="text-xs text-slate-400">Final Score</span>
                <p className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl min-w-[120px]">
                <span className="text-xs text-slate-400">Mastery Level</span>
                <p className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-6 bg-slate-900 border border-indigo-700/40 rounded-2xl text-center space-y-2">
            <h3 className="text-lg font-black text-white">
              {errors === 0
                ? '🌟 PERFECT SCORE!'
                : errors <= 3
                ? '👏 Great work!'
                : errors <= 7
                ? '👍 Good effort!'
                : '💪 Do not give up — You WILL get this!'}
            </h3>
            <p className="text-slate-300 text-xs md:text-sm max-w-lg mx-auto">
              {errors === 0
                ? 'You demonstrated complete mastery over all physics principles without a single mistake!'
                : errors <= 3
                ? 'You grasped torque balance and energy conservation with high precision. Outstanding analytical thinking.'
                : errors <= 7
                ? 'You solved several complex mechanics problems. Consistent practice will make these concepts second nature.'
                : 'Physics requires patience and iteration. Review the labs and try again to build your core mechanical intuition!'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h3 className="text-base font-bold text-white">Student Reflection</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionAnswers.surprising}
                  aria-label="Reflection: Most surprising thing learned"
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. Carrying horizontal loads does zero work against gravity..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500 h-16 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionAnswers.explain}
                  aria-label="Reflection: How to explain to a friend"
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Levers let you trade distance for effort force..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500 h-16 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionAnswers.realLife}
                  aria-label="Reflection: Where in real life might you use this"
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. Using a longer wrench on stubborn car lug nuts..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500 h-16 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 border border-rose-800/40 rounded-2xl space-y-3">
              <h4 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Review:</h4>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-semibold">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-5 bg-indigo-950/40 border border-indigo-800/50 rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-indigo-300">Spaced Repetition Review Schedule</h4>
              <p className="text-xs text-slate-400">
                Recommended return: in <b>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</b> to lock this into long-term memory.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ICSE Challenge Solved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_PhysicsTurningEffectForceSim;
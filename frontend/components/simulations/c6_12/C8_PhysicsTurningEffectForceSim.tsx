'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C8_PHY_011 = 'c8_phy_011'; // Turning effect of force (moment of force)
const NODE_C8_PHY_012 = 'c8_phy_012'; // Pressure (definition, unit, calculation)
const NODE_C8_PHY_013 = 'c8_phy_013'; // Concept of work and its unit (joule)
const NODE_C8_PHY_014 = 'c8_phy_014'; // Kinetic energy (calculation)
const NODE_C8_PHY_015 = 'c8_phy_015'; // Potential energy (gravitational PE)
const NODE_C8_PHY_016 = 'c8_phy_016'; // Energy transformation in daily life
const NODE_C8_PHY_017 = 'c8_phy_017'; // Difference between energy and power
const NODE_C8_PHY_018 = 'c8_phy_018'; // Refraction of light
const NODE_C8_PHY_019 = 'c8_phy_019'; // Curved mirrors (concave & convex)
const NODE_C8_PHY_020 = 'c8_phy_020'; // Dispersion of white light (VIBGYOR)

const ALL_NODE_IDS = [
  NODE_C8_PHY_011,
  NODE_C8_PHY_012,
  NODE_C8_PHY_013,
  NODE_C8_PHY_014,
  NODE_C8_PHY_015,
  NODE_C8_PHY_016,
  NODE_C8_PHY_017,
  NODE_C8_PHY_018,
  NODE_C8_PHY_019,
  NODE_C8_PHY_020,
];

// ─── PREDICTION QUESTIONS (Predict-then-Check Pattern) ───
interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you double the distance from the pivot while applying the same force on a lever, what happens to the turning effect (moment)?',
    options: [
      'It stays the same',
      'It doubles (2×)',
      'It quadruples (4×)',
      'It is halved (0.5×)',
    ],
    correctIndex: 1,
    explanation: 'Moment of force = Force × Perpendicular distance (M = F·d). Doubling the distance directly doubles the moment.',
    verifyInstruction: 'Adjust the Left Distance slider from 1.0 m to 2.0 m in Lab 1 and observe the moment double from 600 N·m to 1200 N·m.',
  },
  {
    id: 'pred_2',
    question: 'If you reduce the contact surface area of an object by half while keeping the thrust force constant, what happens to the pressure exerted on the surface?',
    options: [
      'Pressure is halved',
      'Pressure remains unchanged',
      'Pressure doubles',
      'Pressure increases fourfold',
    ],
    correctIndex: 2,
    explanation: 'Pressure = Force / Area (P = F/A). Halving the surface area concentrates the thrust force, doubling the pressure.',
    verifyInstruction: 'Move the Contact Area slider in Lab 2 to half its value and watch the pressure readout double in real-time.',
  },
];

// ─── OBSERVATION QUESTIONS ('What do you notice?' Pattern) ───
interface ObservationQuestion {
  id: string;
  question: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In the oscillating pendulum simulation, what do you observe about the total mechanical energy (PE + KE) throughout the entire swing?',
    observableOptions: [
      'Total energy peaks at the highest extreme and drops to zero at the bottom',
      'Total energy remains constant as PE and KE smoothly convert back and forth',
      'Both kinetic energy and potential energy increase simultaneously at the mean position',
      'Total energy steadily decreases due to the pull of gravity',
    ],
    correctIndex: 1,
    explanation: 'According to the law of conservation of mechanical energy, Total Energy = PE + KE remains 100% constant throughout the cycle.',
  },
  {
    id: 'obs_2',
    question: 'In the Refraction Tank, what happens to the light ray when it passes obliquely from air into denser glass (n = 1.5)?',
    observableOptions: [
      'The ray bends away from the normal such that angle r > angle i',
      'The ray bends towards the normal such that angle r < angle i',
      'The ray bounces completely backwards with no transmission',
      'The ray proceeds in a straight line with zero angular bending',
    ],
    correctIndex: 1,
    explanation: 'Light slows down in the optically denser glass medium, causing the wavefront to bend towards the normal line (r < i).',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Physics Engineering Workshop',
  intro: 'Welcome, Apprentice Engineer! You have been appointed chief troubleshooter at the Kolkata Science & Engineering Hub. From lifting massive railway axles and testing high-pressure foundation pins to designing precision telescope mirrors and solar power plants, your understanding of mechanics, energy, and optics will be put to the test.',
  context: 'Master 10 core concepts: Turning Moments, Pressure, Work, Kinetic & Potential Energy, Conservation, Power, Refraction, Curved Mirrors, and Rainbow Dispersion to earn your Master Physicist Badge!',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A mechanic struggles to loosen a jammed truck lug nut using a short 15 cm wrench with 100 N force. How can he DOUBLE the turning moment without applying more muscular force?',
  options: [
    'Push twice as fast on the 15 cm wrench',
    'Use a longer 30 cm wrench and push perpendicularly at the far end',
    'Push at a 30° angle to the wrench handle',
    'Stand on the middle of the wrench (7.5 cm from the nut)',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Turning effect (Moment) = Force × Perpendicular Distance! Double the distance, double the turning effect.',
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

// ─── CHALLENGES ARRAY (24 Comprehensive ICSE Challenges) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Moment of Force (Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C8_PHY_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the SI unit of moment of force, and what is its exact conversion to the CGS unit (dyn·cm)?',
    options: [
      'N/m and 1 N/m = 10⁵ dyn/cm',
      'N·m and 1 N·m = 10⁷ dyn·cm',
      'Joule and 1 J = 10⁵ dyn·cm',
      'N·m² and 1 N·m² = 10⁷ dyn·cm',
    ],
    correctIndex: 1,
    explanation: 'Moment of force = Force (N) × Perpendicular distance (m), giving the SI unit N·m. Since 1 N = 10⁵ dyn and 1 m = 10² cm, 1 N·m = 10⁵ × 10² = 10⁷ dyn·cm.',
    hints: [
      'Recall that Moment = Force × Distance.',
      '1 N = 100,000 dynes and 1 m = 100 cm.',
      'Multiply 10⁵ dyn by 10² cm to get 10⁷ dyn·cm with unit N·m.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Pressure Formula (Recall)
  {
    id: 'ch_02',
    nodeId: NODE_C8_PHY_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How is pressure defined in physics, and what is 1 Pascal (Pa) equal to?',
    options: [
      'Thrust × Area; 1 Pa = 1 N·m²',
      'Thrust / Area; 1 Pa = 1 N/m²',
      'Force / Volume; 1 Pa = 1 N/m³',
      'Mass / Area; 1 Pa = 1 kg/m²',
    ],
    correctIndex: 1,
    explanation: 'Pressure is the thrust (perpendicular force) acting per unit area (P = F/A). 1 Pascal is exactly 1 Newton per square metre (1 N/m²).',
    hints: [
      'Pressure measures how concentrated a perpendicular force is over an area.',
      'The formula is P = Force / Area.',
      'Force in Newtons divided by area in square metres gives 1 N/m² = 1 Pa.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Work Conditions (Understanding)
  {
    id: 'ch_03',
    nodeId: NODE_C8_PHY_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A railway coolie carries a heavy 40 kg trunk horizontally across Howrah Station platform for 50 metres. What is the work done by his vertical lifting force on the trunk?',
    options: [
      '20,000 Joules because he walked 50 metres',
      '2,000 Joules because of gravity',
      '0 Joules because the vertical lifting force is perpendicular (90°) to the horizontal displacement',
      '40 Joules equal to the mass of the trunk',
    ],
    correctIndex: 2,
    explanation: 'Work W = F × s × cos(θ). Here the lifting force acts vertically upward while displacement is horizontal (θ = 90°). Since cos(90°) = 0, no mechanical work is done by the lifting force on the trunk.',
    hints: [
      'Check the direction of the lifting force (upward) versus displacement (forward).',
      'Work is done only when displacement occurs IN THE DIRECTION of the force.',
      'When force and motion are at right angles (90°), work done by that force is exactly 0 J.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Kinetic Energy Formula (Understanding)
  {
    id: 'ch_04',
    nodeId: NODE_C8_PHY_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If the speed of a Vande Bharat express train is doubled, what happens to its kinetic energy (KE = ½mv²)?',
    options: [
      'It doubles (increases by 2×)',
      'It triples (increases by 3×)',
      'It quadruples (increases by 4×, i.e., 2²)',
      'It remains unchanged because mass is constant',
    ],
    correctIndex: 2,
    explanation: 'Kinetic energy is directly proportional to the square of velocity (KE ∝ v²). If velocity is multiplied by 2, KE is multiplied by 2² = 4.',
    hints: [
      'Look at the power of velocity in KE = ½mv².',
      'Velocity is squared, so (2v)² = 4v².',
      'Doubling speed quadruples (4×) the kinetic energy.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation - Potential Energy (Recall)
  {
    id: 'ch_05',
    nodeId: NODE_C8_PHY_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is gravitational potential energy, and what is its formula for an object of mass m at height h?',
    options: [
      'Energy of motion; PE = ½mv²',
      'Energy stored due to position/height in a gravitational field; PE = mgh',
      'Energy stored due to elastic compression; PE = m/gh',
      'Rate of doing work; PE = mgh/t',
    ],
    correctIndex: 1,
    explanation: 'Gravitational Potential Energy (PE) is the work done against gravity in raising an object to height h, given by PE = mgh (mass × g × height).',
    hints: [
      'Potential energy relates to position or elevation.',
      'Lifting weight mg through height h requires work W = F × h.',
      'Thus PE = m × g × h in Joules.',
    ],
  },
  // 6. Foundation - Light Dispersion & VIBGYOR (Recall)
  {
    id: 'ch_06',
    nodeId: NODE_C8_PHY_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When white light passes through a glass prism, which colour deviates (bends) the MOST, and which deviates the LEAST?',
    options: [
      'Red deviates most; Violet deviates least',
      'Violet deviates most; Red deviates least',
      'Green deviates most; Yellow deviates least',
      'All constituent colours deviate at the identical angle',
    ],
    correctIndex: 1,
    explanation: 'Violet light has the shortest wavelength and slows down most in glass (highest refractive index), so it deviates MOST. Red light has the longest wavelength and highest speed, so it deviates LEAST.',
    hints: [
      'Remember the order VIBGYOR from base (most bent) to top (least bent).',
      'Shorter wavelength (Violet) refracts more sharply than longer wavelength (Red).',
      'Violet bends the most; Red bends the least.',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - Drag Label (Curved Mirror Terms)
  {
    id: 'ch_07',
    nodeId: NODE_C8_PHY_019,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Identify the key points on the concave mirror principal axis by matching labels to positions.',
    dragItems: [
      { label: 'Pole (P)', targetId: 'part_p' },
      { label: 'Focus (F)', targetId: 'part_f' },
      { label: 'Centre of Curvature (C)', targetId: 'part_c' },
      { label: 'Principal Axis', targetId: 'part_axis' },
    ],
    correctMapping: {
      part_p: 'Pole (P)',
      part_f: 'Focus (F)',
      part_c: 'Centre of Curvature (C)',
      part_axis: 'Principal Axis',
    },
    explanation: 'Pole (P) is the mirror surface vertex, Focus (F) is halfway between P and C (f = R/2), and Centre of Curvature (C) is the geometric centre of the hollow sphere.',
    hints: [
      'Pole (P) sits directly on the centre of the reflective surface.',
      'Focus (F) lies exactly in the middle between P and C.',
      'Centre of Curvature (C) is at distance R = 2f from the pole along the principal axis.',
    ],
  },
  // 8. Standard - Moment Numerical (Application)
  {
    id: 'ch_08',
    nodeId: NODE_C8_PHY_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A uniform metre scale is balanced on a knife-edge at its 50 cm mark. A weight of 4.0 N is suspended at the 10 cm mark. What weight (in Newtons) must be hung at the 90 cm mark to achieve horizontal equilibrium?',
    correctAnswer: 4.0,
    tolerance: 0.1,
    unit: 'N',
    explanation: 'Anticlockwise distance d₁ = 50 - 10 = 40 cm. Clockwise distance d₂ = 90 - 50 = 40 cm. By Principle of Moments: W₁ × d₁ = W₂ × d₂ → 4.0 × 40 = W₂ × 40 → W₂ = 4.0 N.',
    hints: [
      'Calculate the distance from the pivot (50 cm) to the left mass (10 cm): 40 cm.',
      'Calculate the distance from the pivot (50 cm) to the right mass (90 cm): 40 cm.',
      'Equate Anticlockwise Moment = Clockwise Moment: 4.0 N × 40 cm = W₂ × 40 cm.',
    ],
  },
  // 9. Standard - Off-centre Metre Ruler Balance (Analysis)
  {
    id: 'ch_09',
    nodeId: NODE_C8_PHY_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A uniform metre scale of weight 0.5 N has its centre of gravity at the 50 cm mark. It is pivoted at the 40 cm mark. A 2.0 N weight is placed at the 10 cm mark. Calculate the clockwise moment produced by the ruler\'s own weight about the pivot (in N·m).',
    correctAnswer: 0.05,
    tolerance: 0.005,
    unit: 'N·m',
    explanation: 'The weight of the ruler (0.5 N) acts at its centre of mass (50 cm mark). Distance from pivot (40 cm) = 50 - 40 = 10 cm = 0.10 m. Moment = 0.5 N × 0.10 m = 0.05 N·m clockwise.',
    hints: [
      'The ruler\'s weight acts at its midpoint (50 cm mark).',
      'Find the distance from pivot (40 cm) to 50 cm: 10 cm = 0.10 m.',
      'Multiply Force (0.5 N) × Distance (0.10 m) = 0.05 N·m.',
    ],
  },
  // 10. Standard - Pressure Calculation (Application)
  {
    id: 'ch_10',
    nodeId: NODE_C8_PHY_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A brick weighing 30 N has dimensions 0.2 m × 0.1 m × 0.05 m. Calculate the maximum pressure (in Pascals) it can exert when resting on its smallest face (0.1 m × 0.05 m).',
    correctAnswer: 6000,
    tolerance: 10,
    unit: 'Pa',
    explanation: 'Smallest face area A = 0.1 m × 0.05 m = 0.005 m². Maximum Pressure P = F / A = 30 N / 0.005 m² = 6000 Pa.',
    hints: [
      'Maximum pressure occurs on the minimum base area.',
      'Area = 0.1 × 0.05 = 0.005 m².',
      'P = 30 / 0.005 = 6000 Pa.',
    ],
  },
  // 11. Standard - Elephant vs Stiletto Heel (Evaluation)
  {
    id: 'ch_11',
    nodeId: NODE_C8_PHY_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'An elephant weighing 40,000 N stands on 4 feet (total contact area = 0.4 m²). A 500 N woman balances on stiletto heels (total area = 0.0001 m²). Who exerts greater pressure on the floor?',
    options: [
      'Elephant (40,000 Pa) vs Woman (5,000 Pa) → Elephant exerts 8× higher pressure',
      'Woman (5,000,000 Pa) vs Elephant (100,000 Pa) → Woman exerts 50× higher pressure',
      'Both exert identical pressure because weight balances area',
      'Elephant because greater mass always produces greater pressure',
    ],
    correctIndex: 1,
    explanation: 'Elephant pressure = 40,000 N / 0.4 m² = 100,000 Pa. Woman heel pressure = 500 N / 0.0001 m² = 5,000,000 Pa. The woman exerts 50 times greater pressure due to the tiny surface area!',
    hints: [
      'Calculate P_elephant = 40,000 / 0.4 = 100,000 Pa.',
      'Calculate P_woman = 500 / 0.0001 = 5,000,000 Pa.',
      'Compare: 5,000,000 Pa is 50 times larger than 100,000 Pa.',
    ],
    misconceptionIndex: 1,
  },
  // 12. Standard - Work Calculation on Incline (Application)
  {
    id: 'ch_12',
    nodeId: NODE_C8_PHY_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A worker pushes a 25 N crate with a steady force of 20 N along a 6.0 m long ramp into a truck. How much work is done by the applied force along the ramp (in Joules)?',
    correctAnswer: 120,
    tolerance: 1,
    unit: 'J',
    explanation: 'Work done = Force in direction of displacement × Displacement = 20 N × 6.0 m = 120 J.',
    hints: [
      'Use W = F × s where F is the applied force along the ramp.',
      'Force = 20 N and displacement = 6.0 m.',
      'Multiply 20 × 6 = 120 J.',
    ],
  },
  // 13. Standard - Energy vs Power in Appliances (Analysis)
  {
    id: 'ch_13',
    nodeId: NODE_C8_PHY_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Device A is a 2000 W electric geyser run for 3 minutes (180 s). Device B is a 10 W LED tube run for 10 hours (36,000 s). Which device consumes more electrical energy, and which has higher power?',
    options: [
      'Device A has higher power AND consumes more total energy',
      'Device A has higher power (2000 W vs 10 W), but Device B consumes more total energy (360,000 J vs 360,000 J → they consume equal energy!)',
      'Device B has higher power because it operated for 10 hours',
      'Device B uses 360,000 J; Device A uses 360,000 J → identical energy consumed, but Device A has 200× the power rate',
    ],
    correctIndex: 3,
    explanation: 'Geyser energy = 2000 W × 180 s = 360,000 J. LED energy = 10 W × 36,000 s = 360,000 J. Both consume EXACTLY 360 kJ of energy, but the geyser delivers that energy 200 times faster (higher power rate).',
    hints: [
      'Compute Energy = Power × Time in seconds for both devices.',
      'Geyser: 2000 × 180 = 360,000 J. LED: 10 × 36,000 = 360,000 J.',
      'Both use 360,000 J, but Geyser power (2000 W) is 200× greater than LED power (10 W).',
    ],
  },
  // 14. Standard - Snell\'s Law & Refractive Index (Application)
  {
    id: 'ch_14',
    nodeId: NODE_C8_PHY_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Light travels in a vacuum at 3.0 × 10⁸ m/s. In a dense flint glass block, light slows to 1.875 × 10⁸ m/s. Calculate the refractive index (n = c / v) of the glass.',
    correctAnswer: 1.6,
    tolerance: 0.05,
    unit: '',
    explanation: 'Refractive index n = speed in vacuum (c) / speed in medium (v) = (3.0 × 10⁸) / (1.875 × 10⁸) = 1.60.',
    hints: [
      'Use the formula n = c / v.',
      'Divide 3.0 × 10⁸ by 1.875 × 10⁸.',
      '3.0 / 1.875 = 1.60.',
    ],
  },
  // 15. Standard - Real & Apparent Depth (Application)
  {
    id: 'ch_15',
    nodeId: NODE_C8_PHY_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A swimming pool has a real depth of 2.4 metres. Water has a refractive index n = 1.33 (approx 4/3). What is the apparent depth of the pool as seen from above (in metres)?',
    correctAnswer: 1.8,
    tolerance: 0.05,
    unit: 'm',
    explanation: 'Refractive index n = Real Depth / Apparent Depth → Apparent Depth = Real Depth / n = 2.4 / 1.333 = 1.80 m.',
    hints: [
      'Formula: Apparent Depth = Real Depth / Refractive Index.',
      'Substitute: 2.4 m / 1.333.',
      '2.4 × 3 / 4 = 1.80 metres.',
    ],
  },
  // 16. Standard - Concave Mirror Shaving Magnification (Understanding)
  {
    id: 'ch_16',
    nodeId: NODE_C8_PHY_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Where must a person position their face relative to a concave mirror (focal length = f) to use it as a shaving/makeup mirror that produces an erect and magnified image?',
    options: [
      'Beyond the Centre of Curvature (u > 2f)',
      'Exactly at the Principal Focus (u = f)',
      'Between the Focus and Pole (u < f)',
      'Between Centre of Curvature and Focus (f < u < 2f)',
    ],
    correctIndex: 2,
    explanation: 'A concave mirror forms a VIRTUAL, ERECT, and MAGNIFIED image only when the object is placed between the Principal Focus (F) and the Pole (P). In all other real positions beyond F, the image is inverted.',
    hints: [
      'An inverted image cannot be used for shaving.',
      'Placing the face closer than the focal length (between F and P) makes reflected rays diverge.',
      'Their backward extensions produce an upright, magnified virtual image behind the mirror.',
    ],
    misconceptionIndex: 5,
  },
  // 17. Standard - Energy Chain Drag-Sort (Hydroelectric) (Analysis)
  {
    id: 'ch_17',
    nodeId: NODE_C8_PHY_016,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of energy transformations in the Bhakra Nangal Hydroelectric Power Plant in correct chronological order.',
    sortItems: [
      'Gravitational PE of water stored high in the reservoir',
      'Kinetic energy of water rushing down the penstock pipes',
      'Rotational mechanical kinetic energy of the spinning turbine blades',
      'Electrical energy generated by electromagnetic induction in the dynamo',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Stored Gravitational PE (reservoir) → Kinetic Energy (falling water) → Mechanical Energy (turbine rotation) → Electrical Energy (generator dynamo).',
    hints: [
      'Start with the water resting high up behind the dam.',
      'Next, gravity pulls the water down with high speed through penstocks.',
      'The rushing water turns the turbine, which spins the electric generator.',
    ],
  },
  // 18. Advanced - Free-fall Conservation of Mechanical Energy (Analysis)
  {
    id: 'ch_18',
    nodeId: NODE_C8_PHY_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A 0.5 kg ball is dropped from a cliff 20 metres high (g = 10 m/s²). Neglecting air resistance, what is the kinetic energy of the ball when it has fallen halfway (at height 10 m)?',
    correctAnswer: 50,
    tolerance: 1,
    unit: 'J',
    explanation: 'Initial Total Mechanical Energy = mgh_initial = 0.5 × 10 × 20 = 100 J. At height 10 m: PE = 0.5 × 10 × 10 = 50 J. By Conservation of Mechanical Energy: Total = PE + KE → 100 = 50 + KE → KE = 50 J.',
    hints: [
      'Calculate total initial potential energy: PE = 0.5 × 10 × 20 = 100 J.',
      'Halfway down, exactly half of the potential energy (50 J) has converted into kinetic energy.',
      'Therefore KE = 100 - 50 = 50 Joules.',
    ],
  },
  // 19. Advanced - Speed of Pendulum at Mean Position (Application)
  {
    id: 'ch_19',
    nodeId: NODE_C8_PHY_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A simple pendulum bob is released from a height of 0.20 m (20 cm) above its lowest mean position (g = 10 m/s²). Calculate the velocity of the bob (in m/s) as it swings through the lowest point.',
    correctAnswer: 2.0,
    tolerance: 0.1,
    unit: 'm/s',
    explanation: 'By conservation of energy: PE_top = KE_bottom → mgh = ½mv² → v = √(2gh) = √(2 × 10 × 0.20) = √4 = 2.0 m/s.',
    hints: [
      'Equate initial PE at extreme to KE at bottom: mgh = ½mv².',
      'Notice mass cancels out: v² = 2gh.',
      'v = √(2 × 10 × 0.20) = √4 = 2.0 m/s.',
    ],
  },
  // 20. Advanced - Water Pump Power Calculation (Application)
  {
    id: 'ch_20',
    nodeId: NODE_C8_PHY_017,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An agricultural pump lifts 600 kg of water from a 15 m deep well to an overhead tank in 45 seconds (take g = 10 m/s²). Calculate the useful power output of the pump motor in Kilowatts (kW).',
    correctAnswer: 2.0,
    tolerance: 0.1,
    unit: 'kW',
    explanation: 'Work W = mgh = 600 × 10 × 15 = 90,000 J. Power P = W / t = 90,000 J / 45 s = 2000 W = 2.0 kW.',
    hints: [
      'Find work done against gravity: W = 600 kg × 10 m/s² × 15 m = 90,000 J.',
      'Divide work by time: Power = 90,000 / 45 = 2000 Watts.',
      'Convert Watts to Kilowatts by dividing by 1000: 2000 W = 2.0 kW.',
    ],
  },
  // 21. Advanced - Rainbow Formation Evaluation (Evaluation)
  {
    id: 'ch_21',
    nodeId: NODE_C8_PHY_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "A rainbow in the sky is caused purely by scattering of sunlight by dust particles." Evaluate this claim according to the CISCE physics syllabus.',
    options: [
      'Correct; scattering separates light into 7 colors based on Rayleigh scattering',
      'Incorrect; a rainbow is formed by Refraction, Dispersion, and Total Internal Reflection inside spherical raindrops',
      'Partially correct; rainbows form by diffraction and interference in clouds without refraction',
      'Incorrect; raindrops act as flat mirrors reflecting all colours equally',
    ],
    correctIndex: 1,
    explanation: 'CISCE examiner reports strictly penalise confusing scattering with rainbow formation. A rainbow is produced when sunlight enters raindrops, undergoes Refraction + Dispersion, followed by Total Internal Reflection at the inner back surface, and refracts again into the observer\'s eye.',
    hints: [
      'Scattering explains why the sky is blue, NOT how a rainbow splits white light.',
      'Raindrops act as tiny optical prisms.',
      'The three essential optical processes are: Refraction, Dispersion, and Total Internal Reflection.',
    ],
    misconceptionIndex: 6,
  },
  // 22. Advanced - Concave Mirror Ray Diagram Construction (Construct)
  {
    id: 'ch_22',
    nodeId: NODE_C8_PHY_019,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct optical description for an object placed at the Centre of Curvature (C) of a concave mirror.',
    availableParts: ['Real', 'Virtual', 'Inverted', 'Erect', 'Same Size', 'Magnified', 'Diminished', 'At C', 'Behind Mirror'],
    targetState: 'Real Inverted Same Size At C',
    validationHint: 'Select Nature, Orientation, Size, and Position for an object at C.',
    explanation: 'When an object is placed at C in front of a concave mirror, the reflected rays converge at C to form a Real, Inverted image of the Same Size as the object.',
    hints: [
      'Light rays reflecting from an object at C re-converge at C.',
      'Because real light rays intersect, the image is Real and Inverted.',
      'The magnification is exactly 1.0 (Same Size).',
    ],
  },
  // 23. Advanced - Commercial Unit of Energy kWh (Analysis)
  {
    id: 'ch_23',
    nodeId: NODE_C8_PHY_017,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Express 1 Kilowatt-hour (1 kWh, the commercial Board of Trade Unit of electricity) in Joules in scientific exponential form (e.g., 3.6 × 10⁶ J → enter value in Megajoules: 3.6).',
    correctAnswer: 3.6,
    tolerance: 0.1,
    unit: 'MJ',
    explanation: '1 kWh = 1 Kilowatt × 1 Hour = 1000 W × 3600 s = 3,600,000 J = 3.6 × 10⁶ J = 3.6 MJ.',
    hints: [
      '1 Kilowatt = 1000 Joules/second.',
      '1 Hour = 60 × 60 = 3600 seconds.',
      'Multiply 1000 × 3600 = 3,600,000 Joules = 3.6 Megajoules.',
    ],
  },
  // 24. Advanced - Normal Incidence Refraction (Evaluation)
  {
    id: 'ch_24',
    nodeId: NODE_C8_PHY_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A ray of monochromatic light strikes a dense glass slab along the normal (angle of incidence i = 0°). What happens to the ray\'s speed and direction?',
    options: [
      'Speed decreases and the ray bends 90° into the slab',
      'Speed decreases, but the ray passes straight through with zero deviation (no bending)',
      'Speed remains constant at 3 × 10⁸ m/s because i = 0°',
      'The ray is 100% absorbed and no light enters the glass',
    ],
    correctIndex: 1,
    explanation: 'When light enters an optically denser medium normally (i = 0°), all points on the wavefront slow down simultaneously. Therefore, the speed decreases to c/n, but the ray continues in a straight line with angle of refraction r = 0° without bending.',
    hints: [
      'Refraction bending requires an oblique angle so one side of the wavefront slows first.',
      'Along the normal (i = 0°), the entire wavefront hits the glass at the exact same instant.',
      'The ray slows down inside glass, but does NOT bend (angle r = 0°).',
    ],
    misconceptionIndex: 7,
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C8_PHY_011,
  title: 'Class 8 Physics: Forces, Energy & Light Master Lab',
  definition:
    'Comprehensive mastery of turning moments (M = F·d), pressure (P = F/A), mechanical work (W = F·s), kinetic energy (KE = ½mv²), gravitational potential energy (PE = mgh), conservation of energy, power (P = W/t), refraction & Snell\'s law, curved mirror optics, and white light dispersion (VIBGYOR).',
  eli5:
    'Think of this lab like a super toolkit: Use long wrenches to multiply your turn, spread heavy weights so they do not sink, trade height for speed on rollercoasters, bend light beams through glass, and crack white sunlight into rainbow beams!',
  misconceptions: [
    {
      misconception: 'Defining moment of force as merely "turning effect" without specifying axis of rotation and perpendicular distance.',
      correction: 'Moment of force is the turning effect about a specific axis of rotation equal to Force × Perpendicular distance to the line of action (M = F·d in N·m).',
    },
    {
      misconception: 'Believing an elephant always exerts more pressure than a woman in heels because it is heavier.',
      correction: 'Pressure depends on force divided by area (P = F/A). A tiny stiletto heel area concentrates 500 N into 5,000,000 Pa, vastly exceeding the elephant\'s 100,000 Pa.',
    },
    {
      misconception: 'Thinking a person carrying luggage horizontally does work on the luggage because they feel tired.',
      correction: 'Mechanical work requires displacement in the direction of the force. Upward lifting force is perpendicular (90°) to horizontal movement, so work done by lift is 0 J.',
    },
    {
      misconception: 'Assuming doubling speed doubles the kinetic energy of a moving vehicle.',
      correction: 'Kinetic energy depends on the square of velocity (KE = ½mv²). Doubling speed quadruples (4×) kinetic energy and braking distance.',
    },
    {
      misconception: 'Believing red light bends the most in a prism because it is the brightest colour.',
      correction: 'Refractive index is highest for violet (shortest wavelength), so violet deviates the most. Red has the longest wavelength and deviates least.',
    },
    {
      misconception: 'Assuming a concave mirror always forms an inverted real image.',
      correction: 'When the object is placed between the Focus and Pole (u < f), a concave mirror forms an erect, magnified, virtual image used in shaving/dentistry.',
    },
    {
      misconception: 'Attributing rainbow formation to scattering of light in the atmosphere.',
      correction: 'Rainbows are formed by refraction, dispersion, and total internal reflection of sunlight inside spherical raindrops, NOT by scattering.',
    },
    {
      misconception: 'Thinking light rays always bend when passing into a new medium regardless of incident angle.',
      correction: 'Light entering normally along the normal (i = 0°) slows down but does not bend at all; angle of refraction r = 0°.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the formula for the moment of a force about a pivot?',
      options: ['M = Force / Distance', 'M = Force × Perpendicular Distance', 'M = Mass × Acceleration', 'M = Force × Time'],
      correctIndex: 1,
    },
    {
      question: 'What is the SI unit of pressure?',
      options: ['Newton (N)', 'Joule (J)', 'Pascal (Pa)', 'Watt (W)'],
      correctIndex: 2,
    },
    {
      question: 'How much mechanical work is done by gravity on a satellite in a circular orbit?',
      options: ['Infinite Joules', '0 Joules (force is perpendicular to velocity)', 'Equal to its mass × speed', 'Equal to potential energy'],
      correctIndex: 1,
    },
    {
      question: 'If an object of mass 2 kg moves at 4 m/s, what is its kinetic energy?',
      options: ['8 J', '16 J', '32 J', '4 J'],
      correctIndex: 1,
    },
    {
      question: 'What is the commercial unit of electrical energy?',
      options: ['Kilowatt (kW)', 'Kilowatt-hour (kWh)', 'Joule-second', 'Horsepower'],
      correctIndex: 1,
    },
    {
      question: 'When light travels from air into glass at an angle, the refracted ray:',
      options: ['Bends away from the normal', 'Bends towards the normal', 'Reflects 100% back', 'Speeds up'],
      correctIndex: 1,
    },
    {
      question: 'Which mirror is universally used as a rear-view mirror in automobiles because of its wide field of view?',
      options: ['Concave mirror', 'Plane mirror', 'Convex mirror', 'Cylindrical mirror'],
      correctIndex: 2,
    },
    {
      question: 'What is the correct order of rainbow colours from least deviated to most deviated?',
      options: ['Violet to Red', 'Red to Violet (ROYGBIV)', 'Green to Violet', 'Indigo to Yellow'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Mastery achieved: Student demonstrates quantitative accuracy in Moments, Pressure, Work-Energy theorems, Power, Snell\'s Refraction, Mirror Ray Optics, and Dispersion.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Moment of Force & The Seesaw Balance',
    instruction: 'Adjust the left effort distance or force slider to see how torque balances clockwise and anticlockwise turning moments.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_PHY_011,
  },
  {
    title: 'Lab 2: Pressure & Contact Area (Knife vs Snowshoes)',
    instruction: 'Change the contact surface area slider to observe how the pressure and surface penetration change in real-time under identical thrust.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_PHY_012,
  },
  {
    title: 'Lab 3: Energy Transformation in an Oscillating Pendulum',
    instruction: 'Drag the pendulum release height to observe the continuous exchange between Potential Energy (mgh) and Kinetic Energy (½mv²).',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_PHY_016,
  },
  {
    title: 'Lab 4: Snell\'s Law & Refraction Tank',
    instruction: 'Adjust the incident angle slider and change medium refractive index to watch light bend towards or away from the normal.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_PHY_018,
  },
  {
    title: 'Lab 5: Concave Mirror Ray Tracer & Prism Dispersion',
    instruction: 'Move the candle along the principal axis to discover where images turn from real & inverted to virtual & magnified, then view white light disperse into VIBGYOR.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_PHY_019,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Physicist Audit: Home & School Energy & Optics Audit',
  description:
    'Apply your Class 8 Physics concepts to your real-world surroundings! Complete this 4-step practical audit and note your calculations:',
  steps: [
    'Measure the door width in your room. Calculate the moment required to push the handle (far edge) vs pushing 5 cm from the hinge with a 20 N push.',
    'Examine a kitchen knife or drawing pin. Estimate the contact area and calculate the pressure generated when pushing with 15 N force.',
    'Check electricity rating labels on 3 home appliances (e.g., 1000 W geyser, 60 W fan, 10 W LED). Calculate energy in kWh if each runs 2 hours daily.',
    'Look at your reflection in the front (bowl) and back of a shiny stainless steel soup spoon. Observe how the concave inner bowl flips your image upside down until held right next to your eye!',
  ],
};

// ─── MAIN COMPONENT ───
function C8_PhysicsTurningEffectForceSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_PHY_011,
  title = DEFAULT_PROPS.title || 'Class 8 Physics: Forces, Energy & Light Master Lab',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sandboxTab, setSandboxTab] = useState<'moments' | 'pressure' | 'energy' | 'refraction' | 'optics'>('moments');

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction state
  const [currentPrediction, setCurrentPrediction] = useState(0);
  const [predictionAnswered, setPredictionAnswered] = useState(false);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);

  // Observation state
  const [currentObservation, setCurrentObservation] = useState(0);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationSelected, setObservationSelected] = useState<number | null>(null);

  // Adaptive Difficulty & Performance
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hint & Explanation
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Sort & Construct
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── SIMULATION LAB VARIABLES ───
  const [leftForce, setLeftForce] = useState(600); // Newtons
  const [leftDistance, setLeftDistance] = useState(1.0); // metres
  const [rightForce, setRightForce] = useState(300); // Newtons
  const [rightDistance, setRightDistance] = useState(2.0); // metres

  const [appliedForce, setAppliedForce] = useState(100); // Newtons
  const [contactArea, setContactArea] = useState(0.005); // m²

  const [pendulumMass, setPendulumMass] = useState(0.5); // kg
  const [pendulumHeight, setPendulumHeight] = useState(0.8); // metres
  const [pendulumAngle, setPendulumAngle] = useState(0); // animated theta

  const [incidentAngle, setIncidentAngle] = useState(45); // degrees
  const [mediumRefractiveIndex, setMediumRefractiveIndex] = useState(1.5); // glass

  const [objectDistance, setObjectDistance] = useState(25); // cm
  const [mirrorFocalLength, setMirrorFocalLength] = useState(15); // cm

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pendulumAnimRef = useRef<number | null>(null);

  // ─── CALCULATED PHYSICAL VALUES ───
  const leftMoment = useMemo(() => leftForce * leftDistance, [leftForce, leftDistance]);
  const rightMoment = useMemo(() => rightForce * rightDistance, [rightForce, rightDistance]);
  const seesawTilt = useMemo(() => {
    const netMoment = rightMoment - leftMoment;
    return Math.max(-15, Math.min(15, netMoment * 0.05));
  }, [leftMoment, rightMoment]);

  const calculatedPressure = useMemo(() => {
    return Math.round(appliedForce / contactArea);
  }, [appliedForce, contactArea]);

  const calculatedPE = useMemo(() => {
    return +(pendulumMass * 9.8 * pendulumHeight).toFixed(2);
  }, [pendulumMass, pendulumHeight]);

  const maxPendulumVelocity = useMemo(() => {
    return +Math.sqrt(2 * 9.8 * pendulumHeight).toFixed(2);
  }, [pendulumHeight]);

  const refractedAngle = useMemo(() => {
    const radInc = (incidentAngle * Math.PI) / 180;
    const sinR = Math.sin(radInc) / mediumRefractiveIndex;
    if (sinR > 1) return 90;
    return +(Math.asin(sinR) * (180 / Math.PI)).toFixed(1);
  }, [incidentAngle, mediumRefractiveIndex]);

  const mirrorImageProps = useMemo(() => {
    const u = objectDistance;
    const f = mirrorFocalLength;
    if (u === f) {
      return { v: Infinity, nature: 'At Infinity', size: 'Highly Magnified', orientation: 'Parallel' };
    }
    const v = (u * f) / (u - f);
    const m = -v / u;
    const nature = u > f ? 'Real' : 'Virtual';
    const orientation = u > f ? 'Inverted' : 'Erect';
    const size = Math.abs(m) > 1.05 ? 'Magnified' : Math.abs(m) < 0.95 ? 'Diminished' : 'Same Size';
    return { v: +v.toFixed(1), m: +m.toFixed(2), nature, orientation, size };
  }, [objectDistance, mirrorFocalLength]);

  // ─── MOTIVATIONAL FEEDBACK TEXT ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY CHECK ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ───
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

  // ─── PENDULUM CANVAS ANIMATION ───
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame += 0.05;
      const angle = Math.sin(frame) * (pendulumHeight * 35);
      setPendulumAngle(angle);
      pendulumAnimRef.current = requestAnimationFrame(animate);
    };
    pendulumAnimRef.current = requestAnimationFrame(animate);
    return () => {
      if (pendulumAnimRef.current) cancelAnimationFrame(pendulumAnimRef.current);
    };
  }, [pendulumHeight]);

  // ─── CANVAS WAVE/PARTICLE MONITOR EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;
    const draw = () => {
      t += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.sin(x * 0.04 + t) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint: ${challenge.hints[nextLevel - 1]}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete solution step by step.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! A longer lever arm doubles the turning effect with zero extra force.'
        : 'Good try! Let us explore how perpendicular distance multiplies force.'
    );
  }, []);

  const handlePredictionAnswer = useCallback((idx: number) => {
    setPredictionSelected(idx);
    setPredictionAnswered(true);
    const pred = PREDICTION_QUESTIONS[currentPrediction];
    const isCorrect = idx === pred.correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, [currentPrediction]);

  const handleNextPrediction = useCallback(() => {
    setPredictionAnswered(false);
    setPredictionSelected(null);
    if (currentPrediction + 1 < PREDICTION_QUESTIONS.length) {
      setCurrentPrediction((p) => p + 1);
      audioManager.play('swoop');
    } else {
      setPhase('explore');
      audioManager.play('whoosh');
    }
  }, [currentPrediction]);

  const handleObservationAnswer = useCallback((idx: number) => {
    setObservationSelected(idx);
    setObservationAnswered(true);
    const obs = OBSERVATION_QUESTIONS[currentObservation];
    const isCorrect = idx === obs.correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, [currentObservation]);

  const handleNextObservation = useCallback(() => {
    setObservationAnswered(false);
    setObservationSelected(null);
    if (currentObservation + 1 < OBSERVATION_QUESTIONS.length) {
      setCurrentObservation((o) => o + 1);
      audioManager.play('swoop');
    } else {
      setPhase('sandbox');
      audioManager.play('whoosh');
    }
  }, [currentObservation]);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
    speechManager.speak('Make your scientific prediction first before testing!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('observe');
    audioManager.play('whoosh');
    speechManager.speak('What did you notice during the experiments? Answer the observation check.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode activated. Put your conceptual mastery to the test!');
  }, []);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide((s) => s + 1);
      audioManager.play('swoop');
    }
  }, [currentSlide]);

  const handlePrevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((s) => s - 1);
      audioManager.play('swoop');
    }
  }, [currentSlide]);

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
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Magnificent work! You scored ${finalScore} percent and completed your physics engineering certification.`);
  }, [errors, onComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        const orderToCheck = Array.isArray(answer) && answer.length > 0 ? answer : [0, 1, 2, 3];
        isCorrect = JSON.stringify(orderToCheck) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        setShowConfetti(true);
        setShowExplanation(true);
        speechManager.speak('Correct answer! Brilliant deduction.');
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
          speechManager.speak('Here is the full solution explanation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

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

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.2 }}
            className="text-3xl p-2 bg-gold-900/40 border border-gold-700/50 rounded-2xl"
            role="img"
            aria-label="Physics Logo"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <span className="text-xs font-semibold tracking-wider text-gold-400 uppercase">
              ICSE Class 8 Physics
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty */}
        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : difficulty === 'advanced'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold text-slate-300"
          >
            Phase: {phase.toUpperCase()}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 space-y-6">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg"
          >
            <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>🔧</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-400/90 mt-3 font-medium">{SCENARIO.context}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
              <span>⚡</span> Real-World Curiosity Hook:
            </div>
            <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 hover:border-gold-500 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : ''}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex ? '✗ ' : ''}
                    {String.fromCharCode(65 + i)}.
                  </span>{' '}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gold-950/40 border border-gold-800/50 rounded-xl space-y-3"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}
                >
                  {discoveryCorrect
                    ? '✓ Spot on! Perpendicular distance is the secret multiplier of turning force.'
                    : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Discovery Labs"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PREDICTION PHASE (Brilliant.org Predict-then-Check) ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="text-amber-400 uppercase tracking-wider">
              🔮 Step 1: Predict Before You Test ({currentPrediction + 1} of {PREDICTION_QUESTIONS.length})
            </span>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white">
              {PREDICTION_QUESTIONS[currentPrediction].question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PREDICTION_QUESTIONS[currentPrediction].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePredictionAnswer(i)}
                  disabled={predictionAnswered}
                  className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    predictionAnswered && i === PREDICTION_QUESTIONS[currentPrediction].correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : predictionAnswered && i === predictionSelected
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {predictionAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gold-950/50 border border-gold-800/60 rounded-xl space-y-3"
              >
                <p className="text-xs text-slate-300">
                  <span className="font-bold text-emerald-400">Concept: </span>
                  {PREDICTION_QUESTIONS[currentPrediction].explanation}
                </p>
                <p className="text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/40">
                  <span className="font-bold">🔬 Verification Guide: </span>
                  {PREDICTION_QUESTIONS[currentPrediction].verifyInstruction}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNextPrediction}
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  {currentPrediction + 1 < PREDICTION_QUESTIONS.length ? 'Next Prediction →' : 'Launch Interactive Labs →'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 space-y-6">
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <motion.div
                  key={idx}
                  layout
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-gold-500' : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-slate-800 pb-3"
              >
                <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-gold-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </motion.div>

              {/* ─── LAB 1: MOMENTS SEESAW VISUALIZATION ─── */}
              {currentSlide === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 180" className="w-full max-w-xl" aria-label="Moments Seesaw Diagram">
                      <polygon points="250,150 235,180 265,180" fill="#4f46e5" stroke="#818cf8" strokeWidth="2" />
                      <circle cx="250" cy="150" r="4" fill="#fbbf24" />

                      <g transform={`rotate(${seesawTilt}, 250, 150)`}>
                        <rect x="50" y="144" width="400" height="12" rx="4" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />

                        <circle cx={250 - leftDistance * 80} cy="130" r={Math.max(12, leftForce * 0.03)} fill="#ef4444" />
                        <text x={250 - leftDistance * 80} y="134" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                          {leftForce}N
                        </text>
                        <text x={250 - leftDistance * 80} y="110" textAnchor="middle" fill="#fca5a5" fontSize="8">
                          {leftDistance}m
                        </text>

                        <circle cx={250 + rightDistance * 80} cy="130" r={Math.max(12, rightForce * 0.03)} fill="#10b981" />
                        <text x={250 + rightDistance * 80} y="134" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                          {rightForce}N
                        </text>
                        <text x={250 + rightDistance * 80} y="110" textAnchor="middle" fill="#6ee7b7" fontSize="8">
                          {rightDistance}m
                        </text>
                      </g>
                    </svg>

                    <div className="grid grid-cols-2 gap-4 w-full mt-4 text-center">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl"
                      >
                        <span className="text-xs text-rose-400 font-bold">Anticlockwise Moment (Left)</span>
                        <p className="text-lg font-black text-rose-300">{leftMoment} N·m</p>
                        <span className="text-xs text-slate-400">Force {leftForce}N × {leftDistance}m</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl"
                      >
                        <span className="text-xs text-emerald-400 font-bold">Clockwise Moment (Right)</span>
                        <p className="text-lg font-black text-emerald-300">{rightMoment} N·m</p>
                        <span className="text-xs text-slate-400">Force {rightForce}N × {rightDistance}m</span>
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 flex justify-between">
                        <span>Left Distance (m): {leftDistance}m</span>
                        <span className="text-rose-400">{leftForce} N</span>
                      </label>
                      <input
                        type="range"
                        min={0.5}
                        max={2.4}
                        step={0.1}
                        value={leftDistance}
                        aria-label="Adjust left distance in meters"
                        onChange={(e) => {
                          setLeftDistance(parseFloat(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-rose-500 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 flex justify-between">
                        <span>Right Distance (m): {rightDistance}m</span>
                        <span className="text-emerald-400">{rightForce} N</span>
                      </label>
                      <input
                        type="range"
                        min={0.5}
                        max={2.4}
                        step={0.1}
                        value={rightDistance}
                        aria-label="Adjust right distance in meters"
                        onChange={(e) => {
                          setRightDistance(parseFloat(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-emerald-500 mt-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 2: PRESSURE & CONTACT AREA ─── */}
              {currentSlide === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 400 160" className="w-full max-w-md" aria-label="Pressure Penetration Diagram">
                      <rect x="50" y="100" width="300" height="50" fill="#1e293b" rx="4" />
                      <text x="200" y="130" textAnchor="middle" fill="#64748b" fontSize="10">
                        Deformable Soft Clay Layer
                      </text>

                      <rect
                        x={200 - Math.max(4, contactArea * 5000) / 2}
                        y={40 + Math.min(40, calculatedPressure / 2000)}
                        width={Math.max(4, contactArea * 5000)}
                        height="60"
                        fill="#38bdf8"
                        stroke="#0284c7"
                        strokeWidth="1.5"
                        rx="2"
                      />

                      <line
                        x1="200"
                        y1="10"
                        x2="200"
                        y2={35 + Math.min(40, calculatedPressure / 2000)}
                        stroke="#f59e0b"
                        strokeWidth="4"
                        markerEnd="url(#arrow)"
                      />
                      <text x="220" y="25" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        {appliedForce} N
                      </text>
                    </svg>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="mt-3 text-center p-3 bg-slate-900 border border-slate-800 rounded-xl w-full"
                    >
                      <span className="text-xs text-slate-400">Calculated Pressure (P = F / A)</span>
                      <p className="text-2xl font-black text-amber-300">{calculatedPressure.toLocaleString()} Pa (N/m²)</p>
                      <span className="text-xs text-gold-400">
                        Penetration Depth is proportional to Pressure, NOT just Force alone!
                      </span>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-300">
                        Contact Area (m²): {contactArea} m²
                      </label>
                      <input
                        type="range"
                        min={0.0005}
                        max={0.02}
                        step={0.0005}
                        value={contactArea}
                        aria-label="Adjust contact surface area in square meters"
                        onChange={(e) => {
                          setContactArea(parseFloat(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-gold-500 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300">
                        Thrust Force (N): {appliedForce} N
                      </label>
                      <input
                        type="range"
                        min={20}
                        max={300}
                        step={10}
                        value={appliedForce}
                        aria-label="Adjust thrust force in Newtons"
                        onChange={(e) => {
                          setAppliedForce(parseFloat(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-amber-500 mt-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 3: PENDULUM ENERGY EXCHANGE ─── */}
              {currentSlide === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6">
                    <svg viewBox="0 0 250 200" className="w-56" aria-label="Oscillating Pendulum Diagram">
                      <line x1="125" y1="20" x2="125" y2="180" stroke="#334155" strokeDasharray="3,3" />
                      <g transform={`rotate(${pendulumAngle}, 125, 20)`}>
                        <line x1="125" y1="20" x2="125" y2="160" stroke="#cbd5e1" strokeWidth="2" />
                        <circle cx="125" cy="160" r={12 + pendulumMass * 8} fill="#6366f1" stroke="#a5b4fc" strokeWidth="2" />
                      </g>
                    </svg>

                    <div className="space-y-3 w-full max-w-xs">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300">
                          <span>Max Potential Energy (mgh):</span>
                          <span className="text-gold-400">{calculatedPE} J</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            className="h-full bg-gold-500 rounded-full"
                            style={{ width: `${Math.min(100, (calculatedPE / 10) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300">
                          <span>Max Speed at Lowest Point:</span>
                          <span className="text-emerald-400">{maxPendulumVelocity} m/s</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${Math.min(100, (maxPendulumVelocity / 5) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-gold-950/30 border border-gold-800/40 rounded-xl text-xs text-gold-300"
                      >
                        <span className="font-bold">Conservation of Mechanical Energy:</span> At highest extreme, KE = 0, PE = max. At lowest mean position, PE = 0, KE = max! Total (PE + KE) remains 100% constant.
                      </motion.div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs font-semibold text-slate-300 flex justify-between">
                      <span>Release Height (h): {pendulumHeight} m</span>
                      <span className="text-gold-400">Mass: {pendulumMass} kg</span>
                    </label>
                    <input
                      type="range"
                      min={0.2}
                      max={1.5}
                      step={0.05}
                      value={pendulumHeight}
                      aria-label="Adjust pendulum release height in meters"
                      onChange={(e) => {
                        setPendulumHeight(parseFloat(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-gold-500 mt-1"
                    />
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 4: REFRACTION TANK ─── */}
              {currentSlide === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 400 200" className="w-full max-w-lg" aria-label="Snell's Law Refraction Tank">
                      <rect x="0" y="100" width="400" height="100" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                      <text x="20" y="85" fill="#94a3b8" fontSize="10">Medium 1: Air (n₁ = 1.0)</text>
                      <text x="20" y="125" fill="#38bdf8" fontSize="10">
                        Medium 2: Dense Glass (n₂ = {mediumRefractiveIndex})
                      </text>

                      <line x1="200" y1="10" x2="200" y2="190" stroke="#64748b" strokeDasharray="3,3" />

                      <line
                        x1={200 - Math.tan((incidentAngle * Math.PI) / 180) * 80}
                        y1="20"
                        x2="200"
                        y2="100"
                        stroke="#fbbf24"
                        strokeWidth="3"
                      />

                      <line
                        x1="200"
                        y1="100"
                        x2={200 + Math.tan((refractedAngle * Math.PI) / 180) * 80}
                        y2="180"
                        stroke="#38bdf8"
                        strokeWidth="3"
                      />

                      <text x="180" y="70" fill="#fbbf24" fontSize="10">i = {incidentAngle}°</text>
                      <text x="210" y="140" fill="#38bdf8" fontSize="10">r = {refractedAngle}°</text>
                    </svg>

                    <div className="grid grid-cols-2 gap-4 w-full mt-3 text-center text-xs">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-2 bg-amber-950/30 border border-amber-800/40 rounded-lg text-amber-300"
                      >
                        Angle of Incidence: <span className="font-bold">{incidentAngle}°</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-2 bg-gold-950/30 border border-gold-800/40 rounded-lg text-gold-300"
                      >
                        Angle of Refraction: <span className="font-bold">{refractedAngle}°</span> (Bends Towards Normal!)
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-300">
                        Angle of Incidence i (°): {incidentAngle}°
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={80}
                        step={1}
                        value={incidentAngle}
                        aria-label="Adjust incident ray angle in degrees"
                        onChange={(e) => {
                          setIncidentAngle(parseInt(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-amber-500 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300">
                        Refractive Index n₂: {mediumRefractiveIndex}
                      </label>
                      <input
                        type="range"
                        min={1.2}
                        max={2.4}
                        step={0.05}
                        value={mediumRefractiveIndex}
                        aria-label="Adjust refractive index of medium 2"
                        onChange={(e) => {
                          setMediumRefractiveIndex(parseFloat(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-gold-500 mt-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 5: CONCAVE MIRROR RAY TRACER ─── */}
              {currentSlide === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 450 160" className="w-full max-w-lg" aria-label="Concave Mirror Optical Bench">
                      <line x1="20" y1="80" x2="430" y2="80" stroke="#475569" strokeWidth="1.5" />

                      <path d="M 380,20 Q 360,80 380,140" fill="none" stroke="#38bdf8" strokeWidth="4" />
                      <line x1="380" y1="20" x2="390" y2="15" stroke="#64748b" />
                      <line x1="380" y1="80" x2="390" y2="80" stroke="#64748b" />
                      <line x1="380" y1="140" x2="390" y2="145" stroke="#64748b" />

                      <circle cx="370" cy="80" r="3" fill="#ffffff" />
                      <text x="370" y="95" fill="#ffffff" fontSize="8" textAnchor="middle">P</text>

                      <circle cx="280" cy="80" r="3" fill="#fbbf24" />
                      <text x="280" y="95" fill="#fbbf24" fontSize="8" textAnchor="middle">F (15cm)</text>

                      <circle cx="190" cy="80" r="3" fill="#f43f5e" />
                      <text x="190" y="95" fill="#f43f5e" fontSize="8" textAnchor="middle">C (30cm)</text>

                      <line
                        x1={370 - objectDistance * 6}
                        y1="80"
                        x2={370 - objectDistance * 6}
                        y2="45"
                        stroke="#22c55e"
                        strokeWidth="3"
                        markerEnd="url(#green-arrow)"
                      />
                      <text x={370 - objectDistance * 6} y="40" fill="#4ade80" fontSize="8" textAnchor="middle">
                        Object (u={objectDistance}cm)
                      </text>
                    </svg>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900 border border-slate-800 rounded-xl w-full text-center mt-2 grid grid-cols-3 gap-2 text-xs"
                    >
                      <div>
                        <span className="text-slate-400">Image Nature:</span>
                        <p className="font-bold text-gold-300">{mirrorImageProps.nature}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Orientation:</span>
                        <p className="font-bold text-amber-300">{mirrorImageProps.orientation}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Size:</span>
                        <p className="font-bold text-emerald-300">{mirrorImageProps.size}</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs font-semibold text-slate-300 flex justify-between">
                      <span>Object Distance u (cm): {objectDistance} cm</span>
                      <span className="text-gold-400">Focal Length f: {mirrorFocalLength} cm</span>
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={45}
                      step={1}
                      value={objectDistance}
                      aria-label="Adjust candle object distance in centimeters"
                      onChange={(e) => {
                        setObjectDistance(parseInt(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-green-500 mt-1"
                    />
                  </div>
                </motion.div>
              )}

              {/* Lab Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  aria-label="Go to previous lab"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-xl text-sm font-semibold"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextSlide}
                    aria-label="Go to next lab"
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold shadow-lg"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Proceed to observation questions"
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg"
                  >
                    Proceed to Observations →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── OBSERVATION PHASE ('What Do You Notice?') ─── */}
      {phase === 'observe' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="text-gold-400 uppercase tracking-wider">
              👀 Step 2: What Did You Notice? ({currentObservation + 1} of {OBSERVATION_QUESTIONS.length})
            </span>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white">
              {OBSERVATION_QUESTIONS[currentObservation].question}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {OBSERVATION_QUESTIONS[currentObservation].observableOptions.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleObservationAnswer(i)}
                  disabled={observationAnswered}
                  className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    observationAnswered && i === OBSERVATION_QUESTIONS[currentObservation].correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : observationAnswered && i === observationSelected
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {observationAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gold-950/50 border border-gold-800/60 rounded-xl space-y-3"
              >
                <p className="text-xs text-slate-300">
                  <span className="font-bold text-gold-400">Scientific Law: </span>
                  {OBSERVATION_QUESTIONS[currentObservation].explanation}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNextObservation}
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  {currentObservation + 1 < OBSERVATION_QUESTIONS.length ? 'Next Observation →' : 'Enter Sandbox Free Play →'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 space-y-6">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-lg font-bold text-white">⚡ Physics Master Sandbox (Zero Grading)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Freely manipulate levers, pressure pistons, energy pendulums, and light rays to build intuition!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Challenges"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold shadow-lg"
            >
              Ready for Challenges! →
            </motion.button>
          </motion.div>

          {/* Sandbox Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'moments', label: '1. Moments (M=F·d)' },
              { id: 'pressure', label: '2. Pressure (P=F/A)' },
              { id: 'energy', label: '3. Energy Exchange' },
              { id: 'refraction', label: '4. Refraction Tank' },
              { id: 'optics', label: '5. Mirror & VIBGYOR' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSandboxTab(tab.id as 'moments' | 'pressure' | 'energy' | 'refraction' | 'optics');
                  audioManager.play('tap');
                }}
                aria-label={`Open ${tab.label}`}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  sandboxTab === tab.id
                    ? 'bg-gold-600 text-white shadow-md'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Active Sandbox Workspace */}
          <AnimatePresence mode="wait">
            <motion.div
              key={sandboxTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800"
            >
              {sandboxTab === 'moments' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-300">
                    <span>Balance Equation: W₁ × d₁ = W₂ × d₂</span>
                    <span className={leftMoment === rightMoment ? 'text-emerald-400' : 'text-amber-400'}>
                      {leftMoment === rightMoment ? '✓ PERFECT EQUILIBRIUM' : '⚖ TILTED'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                    >
                      <label className="text-xs text-rose-400 font-bold">Left Force: {leftForce} N</label>
                      <input
                        type="range"
                        min={100}
                        max={800}
                        step={50}
                        value={leftForce}
                        aria-label="Adjust left weight force"
                        onChange={(e) => setLeftForce(parseInt(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                      <label className="text-xs text-rose-400 font-bold">Left Arm: {leftDistance} m</label>
                      <input
                        type="range"
                        min={0.2}
                        max={2.5}
                        step={0.1}
                        value={leftDistance}
                        aria-label="Adjust left lever arm distance"
                        onChange={(e) => setLeftDistance(parseFloat(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                    >
                      <label className="text-xs text-emerald-400 font-bold">Right Force: {rightForce} N</label>
                      <input
                        type="range"
                        min={100}
                        max={800}
                        step={50}
                        value={rightForce}
                        aria-label="Adjust right weight force"
                        onChange={(e) => setRightForce(parseInt(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                      <label className="text-xs text-emerald-400 font-bold">Right Arm: {rightDistance} m</label>
                      <input
                        type="range"
                        min={0.2}
                        max={2.5}
                        step={0.1}
                        value={rightDistance}
                        aria-label="Adjust right lever arm distance"
                        onChange={(e) => setRightDistance(parseFloat(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </motion.div>
                  </div>
                </div>
              )}

              {sandboxTab === 'pressure' && (
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="text-center p-4 bg-slate-950 rounded-xl border border-slate-800"
                  >
                    <p className="text-xs text-slate-400">Current Pressure</p>
                    <p className="text-3xl font-black text-amber-400">{calculatedPressure.toLocaleString()} Pa</p>
                    <p className="text-xs text-slate-500 mt-1">1 Pascal = 1 Newton applied over 1 Square Metre</p>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-bold">Applied Force (N): {appliedForce} N</label>
                      <input
                        type="range"
                        min={10}
                        max={1000}
                        step={10}
                        value={appliedForce}
                        aria-label="Adjust applied thrust force"
                        onChange={(e) => setAppliedForce(parseInt(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-bold">Contact Area (m²): {contactArea} m²</label>
                      <input
                        type="range"
                        min={0.0001}
                        max={0.05}
                        step={0.0005}
                        value={contactArea}
                        aria-label="Adjust contact base area"
                        onChange={(e) => setContactArea(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {sandboxTab === 'energy' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40"
                    >
                      <span className="text-xs text-gold-300">Gravitational PE (mgh)</span>
                      <p className="text-2xl font-black text-gold-400">{calculatedPE} J</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40"
                    >
                      <span className="text-xs text-emerald-300">Max Kinetic Velocity v = √(2gh)</span>
                      <p className="text-2xl font-black text-emerald-400">{maxPendulumVelocity} m/s</p>
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-300 font-bold">Release Elevation h (m): {pendulumHeight} m</label>
                    <input
                      type="range"
                      min={0.1}
                      max={3.0}
                      step={0.1}
                      value={pendulumHeight}
                      aria-label="Adjust pendulum height in meters"
                      onChange={(e) => setPendulumHeight(parseFloat(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                </div>
              )}

              {sandboxTab === 'refraction' && (
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center"
                  >
                    <span className="text-xs text-slate-400">Snell's Law: sin(i) / sin(r) = n</span>
                    <p className="text-xl font-bold text-gold-300">
                      Angle i: {incidentAngle}° → Angle r: {refractedAngle}°
                    </p>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 font-bold">Incident Ray Angle i (°)</label>
                      <input
                        type="range"
                        min={0}
                        max={85}
                        step={1}
                        value={incidentAngle}
                        aria-label="Adjust incident ray angle"
                        onChange={(e) => setIncidentAngle(parseInt(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-bold">Medium Refractive Index n</label>
                      <input
                        type="range"
                        min={1.0}
                        max={2.5}
                        step={0.05}
                        value={mediumRefractiveIndex}
                        aria-label="Adjust refractive index of the medium"
                        onChange={(e) => setMediumRefractiveIndex(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {sandboxTab === 'optics' && (
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs text-slate-400">Object Position: u = {objectDistance} cm (f = 15 cm)</span>
                      <p className="text-lg font-bold text-white">
                        {mirrorImageProps.nature}, {mirrorImageProps.orientation}, {mirrorImageProps.size}
                      </p>
                    </div>
                    <div className="flex gap-1 text-xs">
                      {['#9333ea', '#4f46e5', '#3b82f6', '#10b981', '#eab308', '#f97316', '#ef4444'].map((col, idx) => (
                        <div key={idx} className="w-4 h-8 rounded-sm" style={{ backgroundColor: col }} />
                      ))}
                    </div>
                  </motion.div>
                  <div>
                    <label className="text-xs text-slate-300 font-bold">Move Candle Distance u (cm): {objectDistance} cm</label>
                    <input
                      type="range"
                      min={4}
                      max={50}
                      step={1}
                      value={objectDistance}
                      aria-label="Adjust candle object distance from mirror"
                      onChange={(e) => setObjectDistance(parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 space-y-6">
          <canvas ref={canvasRef} width={400} height={24} className="w-full rounded-lg bg-slate-900/60" />

          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between text-xs font-bold text-slate-400"
          >
            <span>
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </span>
            <span className="text-gold-400">
              Competency: {challenge.competencyLevel.toUpperCase()}
            </span>
          </motion.div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-pink-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* ─── CHALLENGE CARD ─── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-base md:text-lg font-bold text-white leading-relaxed">
                {challenge.question}
              </h2>
              <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-xs font-semibold text-slate-400 whitespace-nowrap">
                Node: {challenge.nodeId}
              </span>
            </div>

            {/* MCQ Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-2.5 mt-5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 border-slate-700/80 hover:border-gold-500 text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-bold mr-2 text-gold-400">
                        {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                        {String.fromCharCode(65 + i)}.
                      </span>{' '}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Numeric Challenge Input */}
            {challenge.type === 'numeric' && (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  aria-label="Enter numeric answer value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-gold-500 outline-none w-48"
                />
                <span className="text-slate-300 font-bold text-sm">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  aria-label="Verify numerical answer"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Verify Answer
                </motion.button>
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each label to its target slot:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold cursor-grab text-white shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'part_p', label: 'Vertex on mirror surface' },
                    { id: 'part_f', label: 'Midpoint (f = R/2)' },
                    { id: 'part_c', label: 'Sphere Centre (R = 2f)' },
                    { id: 'part_axis', label: 'Central Horizontal Axis' },
                  ].map((target) => (
                    <motion.div
                      key={target.id}
                      whileHover={{ scale: 1.02 }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-3 rounded-xl border text-center transition-all min-h-[70px] flex flex-col justify-center ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/60 border-emerald-500'
                          : 'bg-slate-950 border-dashed border-slate-700'
                      }`}
                    >
                      <span className="text-xs text-slate-400">{target.label}</span>
                      <p className="text-xs font-bold text-emerald-300 mt-1">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Here'}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  aria-label="Confirm diagram labels"
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Confirm Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder into chronological sequence:</p>
                {(sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3]).map((itemIdx, pos) => (
                  <motion.div
                    key={pos}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Position ${pos + 1}: ${challenge.sortItems![itemIdx]}`}
                    onDragStart={() => setDraggedItem(String(pos))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, pos);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 border border-slate-800 hover:border-gold-500 rounded-xl flex items-center gap-3 cursor-grab text-xs font-medium text-slate-200"
                  >
                    <span className="w-6 h-6 rounded-full bg-gold-900/60 text-gold-300 flex items-center justify-center font-bold text-xs">
                      {pos + 1}
                    </span>
                    <span>{challenge.sortItems![itemIdx]}</span>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(sortArrangement)}
                  disabled={showExplanation}
                  aria-label="Verify Sequence Order"
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Verify Sequence Order
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add descriptor part: ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-gold-700 border border-slate-700 rounded-lg text-xs font-bold text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-gold-900/80 border border-gold-600 rounded-lg text-xs font-bold text-gold-200 flex items-center gap-1.5"
                    >
                      {part}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        aria-label={`Remove ${part}`}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click parts above to construct your ray diagram solution...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Submit Optical Construction"
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Submit Optical Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-gold-950/60 to-slate-950 border border-gold-800/60 rounded-2xl space-y-3"
              >
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  📖 Step-by-Step Physics Breakdown:
                </span>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-gold-400 mr-1.5">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    aria-label="Reveal Next Step"
                    className="px-4 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to Next Challenge or Certification"
                    className="mt-2 block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Complete Certification →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & AUDIT ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 border border-gold-700 rounded-3xl text-center space-y-3 shadow-2xl"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-4xl inline-block"
              role="img"
              aria-label="Trophy"
            >
              🏆
            </motion.span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Physics Mastery Certification Complete!
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have demonstrated proficiency across all 10 ICSE Class 8 Physics competency nodes!
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-slate-900 rounded-xl border border-slate-800"
              >
                <span className="text-xs text-slate-400">Final Score</span>
                <p className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-slate-900 rounded-xl border border-slate-800"
              >
                <span className="text-xs text-slate-400">Mastery Level</span>
                <p className="text-2xl font-black text-gold-400">{masteryLevel.toUpperCase()}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Motivational Feedback Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl border ${
              errors === 0
                ? 'bg-emerald-950/40 border-emerald-800/60'
                : errors <= 3
                ? 'bg-gold-950/40 border-gold-800/60'
                : errors <= 7
                ? 'bg-amber-950/40 border-amber-800/60'
                : 'bg-rose-950/40 border-rose-800/60'
            }`}
          >
            <p className="text-sm font-bold text-center">
              <span className="mr-2">{errors <= 3 ? '✓' : 'ℹ'}</span>
              <span
                className={
                  errors === 0
                    ? 'text-emerald-300'
                    : errors <= 3
                    ? 'text-gold-300'
                    : errors <= 7
                    ? 'text-amber-300'
                    : 'text-rose-300'
                }
              >
                {motivationalMessage}
              </span>
            </p>
          </motion.div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3"
            >
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>🔍</span> Targeted Conceptual Review (Misconception Profile):
              </h3>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions?.[mIdx];
                if (!m) return null;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-900/80 rounded-xl border border-rose-900/40 space-y-1"
                  >
                    <p className="text-xs font-bold text-rose-400">✗ Misconception: {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✓ Scientific Law: {m.correction}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Reflection Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-gold-950/40 border border-gold-800/50 rounded-2xl space-y-2"
          >
            <h3 className="text-sm font-bold text-gold-300">💭 Metacognitive Reflection:</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5 leading-relaxed">
              <li>Why does moving your hand to the end of a spanner double the turning moment without extra effort?</li>
              <li>How does the inverse-square area law explain why an elephant on 4 feet exerts less pressure than a stiletto heel?</li>
              <li>Why is the commercial unit of electricity (1 kWh = 3.6 × 10⁶ J) a unit of energy rather than power?</li>
            </ul>
          </motion.div>

          {/* Spaced Repetition Visibility */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-amber-950/40 border border-amber-800/50 rounded-2xl flex items-center justify-between text-xs"
          >
            <span className="text-slate-300">
              Spaced Repetition Review scheduled in:{' '}
              <span className="text-amber-300 font-bold">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
            </span>
            <span className="text-slate-400">SM-2 Memory Retention Active</span>
          </motion.div>

          {/* Real-World Activity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🏠</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300"
                >
                  <span className="font-bold text-gold-400 mr-1.5">Step {idx + 1}:</span> {step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── PLATFORM FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C8_PhysicsTurningEffectForceSim;
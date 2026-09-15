'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (MANDATORY STRING LITERALS) ───
const NODE_C9_PHY_011 = 'c9_phy_011'; // Equations of uniformly accelerated motion
const NODE_C9_PHY_012 = 'c9_phy_012'; // Contact forces (frictional, normal, tension)
const NODE_C9_PHY_013 = 'c9_phy_013'; // Non-contact forces (gravitational, electric, magnetic)
const NODE_C9_PHY_014 = 'c9_phy_014'; // Newton's First Law of Motion (inertia)
const NODE_C9_PHY_015 = 'c9_phy_015'; // Newton's Second Law of Motion (F = ma)
const NODE_C9_PHY_016 = 'c9_phy_016'; // Linear momentum (p = mv)
const NODE_C9_PHY_017 = 'c9_phy_017'; // Rate of change of momentum (F = Deltap/Deltat)
const NODE_C9_PHY_018 = 'c9_phy_018'; // Newton's Third Law of Motion (action-reaction)
const NODE_C9_PHY_019 = 'c9_phy_019'; // Universal Law of Gravitation
const NODE_C9_PHY_020 = 'c9_phy_020'; // Acceleration due to gravity (free fall)

const ALL_NODE_IDS = [
  NODE_C9_PHY_011,
  NODE_C9_PHY_012,
  NODE_C9_PHY_013,
  NODE_C9_PHY_014,
  NODE_C9_PHY_015,
  NODE_C9_PHY_016,
  NODE_C9_PHY_017,
  NODE_C9_PHY_018,
  NODE_C9_PHY_019,
  NODE_C9_PHY_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Mission Dynamics Lab',
  intro: 'You are an aerospace trainee at the Vikram Sarabhai Space Centre (ISRO). Before launching the next lunar lander, you must verify all dynamic equations, calibrate thrusters against inertia, compute impact momenta, and evaluate lunar free fall.',
  context: 'From horizontal braking tracks on Earth to rocket thrust in deep space and vertical touchdown on the Moon, master the 3 equations of motion, Newton’s 3 laws, momentum, and universal gravitation.',
};

// ─── DISCOVERY QUESTION (HOOK BEFORE LESSON) ───
const DISCOVERY_QUESTION = {
  question: 'On Earth, a 1 kg stone and a 0.01 kg feather are dropped in an evacuated vacuum chamber (zero air resistance). What happens?',
  options: [
    'The stone hits first because gravity pulls heavier masses harder (F = mg).',
    'Both hit the ground at the EXACT same instant because g = GM/R² is independent of the falling body mass.',
    'The feather hits first because it encounters less inertia resistance.',
    'The stone accelerates at 9.8 m/s² while the feather floats weightlessly in vacuum.',
  ],
  correctIndex: 1,
  hintAfter: 'Surprised? Gravitational force IS 100x bigger on the stone, but its inertia is ALSO 100x bigger! Let us explore why they cancel out.',
};

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (PREDICT THEN CHECK) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you double the acceleration (a) from 2 m/s² to 4 m/s² while keeping initial velocity (u = 5 m/s) and time (t = 4 s) constant, what happens to the upper triangular area (½at²) on the v-t graph?',
    options: [
      'It doubles (from 16 m to 32 m)',
      'It quadruples (from 16 m to 64 m)',
      'It stays the same because time did not change',
      'It halves because higher acceleration takes less time',
    ],
    correctIndex: 0,
    explanation: 'Displacement from acceleration is given by Area_tri = ½at². Since it is linearly proportional to acceleration a, doubling a doubles this triangular area directly.',
    verifyInstruction: 'Go to Lab 1, set Acceleration (a) slider to 4 m/s², and watch the yellow triangular area change from 16.0m to 32.0m!',
  },
  {
    id: 'pred_2',
    question: 'In the vacuum free fall experiment, if you drop a 5 kg iron ball and a 0.01 kg feather with air resistance turned OFF, which reaches the bottom first?',
    options: [
      'The 5 kg iron ball because gravity pulls it 500x harder',
      'Both hit the bottom at the exact same instant',
      'The feather because it has less inertia',
      'Neither, they float in vacuum weightlessly',
    ],
    correctIndex: 1,
    explanation: 'In vacuum, gravitational acceleration g = GM/R² is identical for all masses because inertial resistance (m) cancels gravitational attraction (mg).',
    verifyInstruction: 'Go to Lab 5, select "Vacuum (Pure g)", click "Drop Both Objects!", and observe both reaching the bottom plate together!',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS ('WHAT DO YOU NOTICE?') ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Look at the shaded areas on the v-t graph in Lab 1. What do you notice about the total displacement composition?',
    observableOptions: [
      'The blue rectangle represents initial speed contribution (u·t) and the yellow triangle represents acceleration contribution (½a·t²).',
      'The blue rectangle represents acceleration while the triangle represents friction.',
      'The entire area is always circular regardless of acceleration.',
      'The area decreases as time increases.',
    ],
    correctIndex: 0,
    explanation: 'Displacement S = ut + ½at² geometrically splits into the rectangular area below initial speed (u·t) and the upper triangular area from acceleration (½a·t²).',
  },
  {
    id: 'obs_2',
    question: 'In Lab 3 (Action & Reaction Skaters), when Astronaut A (60 kg) pushes Astronaut B (90 kg), what do you notice about their forces and resulting accelerations?',
    observableOptions: [
      'Astronaut A experiences greater force because of smaller mass.',
      'Both feel equal and opposite forces (60 N), but the lighter 60 kg astronaut accelerates faster (|a₁| > |a₂|).',
      'Astronaut B does not move at all because B is heavier.',
      'Both accelerate at the exact same speed in the same direction.',
    ],
    correctIndex: 1,
    explanation: 'Newton’s 3rd Law guarantees forces are equal in magnitude and opposite in direction (F₁ = -F₂), but Newton’s 2nd law (a = F/m) produces greater acceleration on the smaller mass.',
  },
];

// ─── CHALLENGE DATA INTERFACE ───
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

// ─── 22 COMPREHENSIVE CHALLENGES (NEP 2020 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation Recall - c9_phy_011
  {
    id: 'ch_011_f1',
    nodeId: NODE_C9_PHY_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On a velocity-time (v-t) graph of uniformly accelerated motion, what physical quantity does the AREA under the line represent?',
    options: ['Instantaneous acceleration', 'Total displacement (S)', 'Final velocity (v)', 'Rate of change of momentum'],
    correctIndex: 1,
    explanation: 'The area under a v-t graph equals total displacement (S). The slope represents acceleration (a).',
    hints: [
      'Think about multiplying the units on y-axis (m/s) and x-axis (s): (m/s) × s = metres.',
      'Slope gives rise/run = (m/s)/s = acceleration, while area splits into rectangle (ut) + triangle (½at²).',
      'The area under the graph is the integral of velocity over time, giving displacement S.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation Drag-Label - c9_phy_012 (Contact Forces)
  {
    id: 'ch_012_f2',
    nodeId: NODE_C9_PHY_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct contact force name onto each labeled zone on the block resting on a pulled surface.',
    dragItems: [
      { label: 'Normal Reaction (N)', targetId: 'target_top' },
      { label: 'Tension (T)', targetId: 'target_right' },
      { label: 'Friction (f)', targetId: 'target_bottom' },
    ],
    correctMapping: {
      target_top: 'Normal Reaction (N)',
      target_right: 'Tension (T)',
      target_bottom: 'Friction (f)',
    },
    explanation: 'Normal reaction acts perpendicular upwards from surface, Tension pulls horizontally along the taut string, and Friction opposes relative motion along the contact plane.',
    hints: [
      'Normal means perpendicular to the contact surface.',
      'Tension always pulls along the string or cable.',
      'Friction acts tangentially along the bottom boundary opposing motion.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation Numeric - c9_phy_016 (Momentum)
  {
    id: 'ch_016_f3',
    nodeId: NODE_C9_PHY_016,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A cricket ball of mass 0.16 kg is bowled at 30 m/s towards the batsman. Calculate its linear momentum magnitude in kg·m/s.',
    correctAnswer: 4.8,
    tolerance: 0.1,
    unit: 'kg·m/s',
    explanation: 'Linear momentum p = m × v = 0.16 kg × 30 m/s = 4.8 kg·m/s.',
    hints: [
      'Use the formula for linear momentum: p = m × v.',
      'Multiply mass (0.16) by velocity (30).',
      '0.16 × 30 = 4.8 kg·m/s (or N·s).',
    ],
    misconceptionIndex: 3,
  },
  // 4. Foundation Classify - c9_phy_014 (Inertia)
  {
    id: 'ch_014_f4',
    nodeId: NODE_C9_PHY_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a Mumbai BEST bus driver brakes suddenly, passengers lurch forward. What is the precise physical cause?',
    options: [
      'Inertia of rest keeps their feet stationary while the bus accelerates.',
      'Inertia of motion makes their upper bodies continue moving forward at original speed while the bus slows.',
      'A forward centrifugal contact force pushed from the seat cushions.',
      'The normal reaction from the bus floor vanished momentarily.',
    ],
    correctIndex: 1,
    explanation: 'Due to dynamic inertia (inertia of motion), the passengers’ upper bodies tend to stay in their state of uniform motion even as braking stops the bus floor.',
    hints: [
      'Consider the state of the passengers before the brakes were pressed: they were moving.',
      'Newton’s 1st Law states moving bodies resist changes to their velocity unless acted on by external force.',
      'This is dynamic inertia (inertia of motion), not static inertia.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation Sort - c9_phy_011 (Derivation sequence)
  {
    id: 'ch_011_f5',
    nodeId: NODE_C9_PHY_011,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Arrange the steps in order to derive the 1st equation of motion (v = u + at) from a v-t graph:',
    sortItems: [
      'Identify slope of v-t line as acceleration: a = Rise / Run',
      'Write rise as change in velocity: Rise = (v - u)',
      'Write run as elapsed time interval: Run = t',
      'Equate a = (v - u)/t and rearrange to v = u + at',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Slope = acceleration = (v - u)/t. Cross-multiplying gives at = v - u, so v = u + at.',
    hints: [
      'Start with the definition of the graph feature: slope = acceleration.',
      'Break slope into Rise and Run.',
      'Finally isolate final velocity v.',
    ],
  },
  // 6. Foundation Construct - c9_phy_015 (F=ma)
  {
    id: 'ch_015_f6',
    nodeId: NODE_C9_PHY_015,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Construct the definition of 1 Newton force using standard SI base units:',
    availableParts: ['1 kg', '×', '1 m/s²', '1 g', '1 cm/s²', '10⁵ dyne', '÷'],
    targetState: '1 kg × 1 m/s²',
    validationHint: 'Select mass in kg multiplied by acceleration in m/s²',
    explanation: '1 Newton is defined as the force which produces an acceleration of 1 m/s² in a body of mass 1 kg (1 N = 1 kg·m/s² = 10⁵ dynes).',
    hints: [
      'Newton is SI unit. SI unit of mass is kg, acceleration is m/s².',
      'Force = mass × acceleration.',
      'Combine: 1 kg × 1 m/s².',
    ],
  },
  // 7. Foundation Classify - c9_phy_013 (Non-contact inverse square)
  {
    id: 'ch_013_f7',
    nodeId: NODE_C9_PHY_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If the distance r between two magnetic poles or electric charges is TRIPLED (3r), what happens to the non-contact force between them?',
    options: ['Becomes 1/3 of original', 'Becomes 1/9 of original', 'Becomes 1/6 of original', 'Triples (3x)'],
    correctIndex: 1,
    explanation: 'All non-contact field forces follow the inverse square law: F ∝ 1/r². If r → 3r, F → 1/(3)² = 1/9 of original.',
    hints: [
      'Non-contact forces obey the inverse SQUARE law, not an inverse linear law.',
      'Calculate (1/3) squared.',
      '(1/3)² = 1/9.',
    ],
  },
  // 8. Standard Application - c9_phy_011 (Stopping train)
  {
    id: 'ch_011_s1',
    nodeId: NODE_C9_PHY_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Vande Bharat train travelling at 20 m/s applies brakes uniformly and stops in 100 m. What is the magnitude of its deceleration in m/s²?',
    correctAnswer: 2,
    tolerance: 0.1,
    unit: 'm/s²',
    explanation: 'Using v² = u² + 2aS: 0 = 20² + 2(a)(100) ⇒ 0 = 400 + 200a ⇒ a = -2 m/s². Deceleration magnitude is 2 m/s².',
    hints: [
      'Identify knowns: u = 20 m/s, v = 0 m/s, S = 100 m. Unknown: a.',
      'Time t is not given, so choose the shortcut equation: v² = u² + 2aS.',
      '0 = 400 + 200a ⇒ 200a = -400 ⇒ |a| = 2 m/s².',
    ],
  },
  // 9. Standard Application - c9_phy_017 (Impulse / F = dp/dt)
  {
    id: 'ch_017_s2',
    nodeId: NODE_C9_PHY_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 1500 kg Tata Nexon car moving at 72 km/h (20 m/s) is stopped by brakes in 4.0 s. Calculate the average retarding force in Newtons.',
    correctAnswer: 7500,
    tolerance: 50,
    unit: 'N',
    explanation: 'Initial momentum p₁ = 1500 × 20 = 30,000 kg·m/s. Final p₂ = 0. Δp = -30,000 kg·m/s. F = Δp/Δt = -30,000 / 4 = -7500 N.',
    hints: [
      'Ensure speed is converted to m/s: 72 × (5/18) = 20 m/s.',
      'Find change in momentum Δp = m(v - u) = 1500(0 - 20) = -30,000 kg·m/s.',
      'Force F = Δp / Δt = 30000 / 4 = 7500 N magnitude.',
    ],
  },
  // 10. Standard Analysis - c9_phy_018 (Action-Reaction cancellation myth)
  {
    id: 'ch_018_s3',
    nodeId: NODE_C9_PHY_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do Newton’s 3rd Law Action and Reaction forces NEVER cancel each other out to produce zero net force?',
    options: [
      'Because action occurs first and reaction occurs with a slight microsecond time delay.',
      'Because action and reaction act on TWO DIFFERENT bodies, so they cannot be added on a single free-body diagram.',
      'Because reaction force is always slightly smaller than action due to friction loss.',
      'Because action is a contact force while reaction is always non-contact.',
    ],
    correctIndex: 1,
    explanation: 'Cancellation requires balanced forces acting on the SAME body. Action and reaction act simultaneously on two distinct interacting bodies (FAB acts on B, FBA acts on A).',
    hints: [
      'When you walk, your foot pushes the road backward, and the road pushes your foot forward.',
      'Can you add a force acting on the Earth to a force acting on a human shoe?',
      'No! They act on different bodies and therefore never cancel each other.',
    ],
    misconceptionIndex: 0,
  },
  // 11. Standard Application - c9_phy_020 (Free Fall Height)
  {
    id: 'ch_020_s4',
    nodeId: NODE_C9_PHY_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A wrench is dropped from an ISRO launch tower (u = 0) and takes exactly 3.0 s to strike the ground. Taking g = 9.8 m/s², find the tower height in metres.',
    correctAnswer: 44.1,
    tolerance: 0.5,
    unit: 'm',
    explanation: 'h = ut + ½gt² = 0 + ½(9.8)(3)² = 4.9 × 9 = 44.1 m.',
    hints: [
      'Use 2nd equation of motion under gravity: h = ut + ½gt².',
      'Since dropped from rest, u = 0, so h = ½gt².',
      'h = 0.5 × 9.8 × 9 = 44.1 m.',
    ],
  },
  // 12. Standard Evaluation - c9_phy_015 (Cricket catch technique)
  {
    id: 'ch_015_s5',
    nodeId: NODE_C9_PHY_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why does an Indian cricket fielder (e.g., Virat Kohli) draw his hands backward while catching a fast cricket ball?',
    options: [
      'To increase the change in momentum (Δp) of the incoming ball.',
      'To increase the contact time interval (Δt), thereby reducing the impact force F = Δp/Δt on his palms.',
      'To reduce the velocity of the ball before it actually touches his gloves.',
      'To decrease the mass of the hand-ball combined system.',
    ],
    correctIndex: 1,
    explanation: 'The ball’s momentum change Δp is fixed. By pulling hands back, Δt is increased from ~0.05s to ~0.25s. Because F = Δp/Δt, increasing Δt dramatically decreases the force felt.',
    hints: [
      'Think about Newton’s 2nd law: F = Δp / Δt.',
      'Δp is fixed (mass × velocity drops to zero). What parameter is the fielder manipulating?',
      'Extending the stopping time (Δt) reduces the required stopping force.',
    ],
  },
  // 13. Standard Drag-Label - c9_phy_019 (Gravitation Law Parts)
  {
    id: 'ch_019_s6',
    nodeId: NODE_C9_PHY_019,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Label each term in Newton’s Universal Gravitation Equation: F = G · (m₁ · m₂) / r²',
    dragItems: [
      { label: '6.67 × 10⁻¹¹ N·m²/kg²', targetId: 'term_G' },
      { label: 'Product of Interacting Masses', targetId: 'term_masses' },
      { label: 'Centre-to-Centre Distance Squared', targetId: 'term_dist' },
    ],
    correctMapping: {
      term_G: '6.67 × 10⁻¹¹ N·m²/kg²',
      term_masses: 'Product of Interacting Masses',
      term_dist: 'Centre-to-Centre Distance Squared',
    },
    explanation: 'G is the Universal Gravitational Constant (6.67×10⁻¹¹ N·m²/kg²), m₁m₂ is the mass product, and r² is the square of distance between their centres.',
    hints: [
      'G is the tiny universal constant with units N·m²/kg².',
      'm₁ · m₂ sits in the numerator representing mass product.',
      'r² sits in denominator representing inverse square separation.',
    ],
  },
  // 14. Standard Analysis - c9_phy_012 (Unit conversions)
  {
    id: 'ch_012_s7',
    nodeId: NODE_C9_PHY_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How many dynes (cgs unit of force) equal 3.5 Newtons? (Enter in terms of 10⁵ dynes, e.g. for 3.5 × 10⁵ enter 350000)',
    correctAnswer: 350000,
    tolerance: 1000,
    unit: 'dyne',
    explanation: '1 N = 1 kg × 1 m/s² = 1000 g × 100 cm/s² = 10⁵ dynes. Therefore, 3.5 N = 3.5 × 10⁵ = 350,000 dynes.',
    hints: [
      'Recall: 1 kg = 1000 g and 1 m = 100 cm.',
      '1 N = 10³ g × 10² cm/s² = 10⁵ dyne.',
      '3.5 × 100,000 = 350,000 dynes.',
    ],
  },
  // 15. Advanced Application - c9_phy_020 (g derivation on planet)
  {
    id: 'ch_020_a1',
    nodeId: NODE_C9_PHY_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An exoplanet has DOUBLE the mass of Earth (2M) and DOUBLE the radius of Earth (2R). If Earth’s g = 9.8 m/s², what is surface g on this exoplanet in m/s²?',
    correctAnswer: 4.9,
    tolerance: 0.1,
    unit: 'm/s²',
    explanation: 'g_planet = G(2M)/(2R)² = G(2M)/(4R²) = ½ (GM/R²) = ½ × 9.8 = 4.9 m/s².',
    hints: [
      'Recall surface gravity formula: g = GM/R².',
      'Substitute M_new = 2M and R_new = 2R: g_new = G(2M)/(2R)² = 2GM / (4R²).',
      'This simplifies to 2/4 = 1/2 of Earth’s g. 9.8 / 2 = 4.9 m/s².',
    ],
  },
  // 16. Advanced Analysis - c9_phy_011 (Two-stage motion)
  {
    id: 'ch_011_a2',
    nodeId: NODE_C9_PHY_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A rocket sled starts from rest, accelerates at 4 m/s² for 5 s, and then coasts at constant velocity for 10 s. What is the TOTAL distance covered in metres?',
    correctAnswer: 250,
    tolerance: 2,
    unit: 'm',
    explanation: 'Stage 1 (accel): S₁ = ut + ½at² = 0 + ½(4)(5)² = 50 m. Velocity reached: v = u + at = 0 + 4(5) = 20 m/s. Stage 2 (uniform): S₂ = v × t = 20 × 10 = 200 m. Total S = 50 + 200 = 250 m.',
    hints: [
      'Break into two phases: Accelerated phase (t = 5s) and Uniform velocity phase (t = 10s).',
      'Phase 1 distance: S₁ = ½(4)(25) = 50 m. Speed at end of Phase 1: v = 4 × 5 = 20 m/s.',
      'Phase 2 distance: S₂ = 20 m/s × 10 s = 200 m. Total = 50 + 200 = 250 m.',
    ],
  },
  // 17. Advanced Evaluation - c9_phy_019 (Moon mass vs radius effect)
  {
    id: 'ch_019_a3',
    nodeId: NODE_C9_PHY_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The Moon’s mass is 1/81 of Earth’s mass, yet its surface gravity is ~1/6 of Earth’s (not 1/81). How does the Universal Law of Gravitation account for this?',
    options: [
      'The Moon has an atmospheric pressure buffer that amplifies surface gravity.',
      'The Moon’s radius is much smaller (~1/3.7 of Earth), and because R appears squared in the denominator (1/R²), the smaller radius boosts g by factor of ~(3.7)² ≈ 13.7.',
      'The Universal Gravitational Constant G is larger on the Moon due to proximity to solar wind.',
      'The Moon’s core is composed purely of heavy lead and uranium.',
    ],
    correctIndex: 1,
    explanation: 'g = GM/R². Mass ratio makes g 81x smaller, but radius ratio (1/3.7)² makes g ~13.7x larger. Net ratio = 13.7 / 81 ≈ 1/6.',
    hints: [
      'Look at both variables in g = GM/R²: M in numerator, R² in denominator.',
      'A smaller radius puts the surface much closer to the centre of mass.',
      '(1/81) × (3.7)² ≈ 13.7 / 81 ≈ 1/6 ≈ 1.62 m/s².',
    ],
  },
  // 18. Advanced Construct - c9_phy_017 (Derive F=ma from momentum)
  {
    id: 'ch_017_a4',
    nodeId: NODE_C9_PHY_017,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the mathematical proof showing F = Δp/Δt reduces to F = ma for constant mass:',
    sortItems: [
      'F = Δp / Δt = (p_final - p_initial) / Δt',
      'Substitute p = mv: F = (m·v - m·u) / Δt',
      'Factor out constant mass: F = m·(v - u) / Δt',
      'Recognise acceleration a = (v - u) / Δt to obtain F = m·a',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'F = Δp/Δt = (mv - mu)/Δt = m(v - u)/Δt = ma (since a = Δv/Δt). This holds strictly when mass m is constant.',
    hints: [
      'Start with the definition of rate of change of momentum.',
      'Substitute initial and final momenta.',
      'Factor out constant mass m and substitute acceleration definition.',
    ],
  },
  // 19. Advanced Creativity - c9_phy_018 (Rocket recoil physics)
  {
    id: 'ch_018_a5',
    nodeId: NODE_C9_PHY_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design an ISRO propulsion control rule: When rocket engine nozzles expel high-speed exhaust gas downwards, what propels the rocket upward in vacuum?',
    options: [
      'The exhaust gases push against atmospheric air beneath the launch pad.',
      'By Newton’s 3rd Law, the force exerted by the engine accelerating exhaust downward creates an equal & opposite upward reaction force on the rocket.',
      'Gravitational attraction between exhaust cloud and earth pulls the rocket up.',
      'The expanding vacuum behind the rocket pulls the nose cone upward.',
    ],
    correctIndex: 1,
    explanation: 'Rockets work purely by Newton’s 3rd Law (action-reaction). Downward force on exhaust gases = Upward thrust on rocket structure. No atmospheric push is required.',
    hints: [
      'Does a rocket work in deep space vacuum where there is no air to push against?',
      'Yes, because action-reaction is internal to the rocket-fuel interaction.',
      'Force on gas downward = Force on rocket upward.',
    ],
  },
  // 20. Advanced Application - c9_phy_011 (Vertical Throw Max Height)
  {
    id: 'ch_011_a6',
    nodeId: NODE_C9_PHY_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A ball is thrown vertically upward with initial velocity u = 29.4 m/s. Taking upward as positive and g = 9.8 m/s², calculate the maximum height reached in metres.',
    correctAnswer: 44.1,
    tolerance: 0.5,
    unit: 'm',
    explanation: 'At max height, v = 0. Using v² = u² + 2aS with a = -g = -9.8 m/s²: 0 = (29.4)² + 2(-9.8)H ⇒ 19.6 H = 864.36 ⇒ H = 44.1 m.',
    hints: [
      'At highest point, final velocity v = 0.',
      'Sign convention: upward is positive, so a = -g = -9.8 m/s².',
      '0 = (29.4)² - 2(9.8)H ⇒ H = 864.36 / 19.6 = 44.1 m.',
    ],
  },
  // 21. Advanced Classify - c9_phy_014 (Inertia vs Mass)
  {
    id: 'ch_014_a7',
    nodeId: NODE_C9_PHY_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 10,000 kg loaded freight truck and a 1000 kg electric car both travel at 20 m/s. Which statement correctly evaluates their inertia and stopping effort?',
    options: [
      'Both have identical inertia because both travel at the exact same velocity.',
      'The truck possesses 10x greater inertia because mass is the sole measure of inertia; hence it requires 10x more retarding force to stop in the same time.',
      'The car has more inertia because electric motors exert higher instantaneous torque.',
      'Inertia is a vector force that depends on velocity squared.',
    ],
    correctIndex: 1,
    explanation: 'Mass is the quantitative measure of inertia. The truck has 10x the mass, so 10x the inertia and 10x the momentum at the same speed.',
    hints: [
      'What physical quantity is the quantitative measure of inertia?',
      'Mass alone measures inertia. Speed determines momentum, but inertia is intrinsic mass resistance.',
      '10,000 kg is 10x 1000 kg.',
    ],
  },
  // 22. Advanced Drag-Sort - c9_phy_013 (Forces by range & type)
  {
    id: 'ch_013_a8',
    nodeId: NODE_C9_PHY_013,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Sort the following force interactions from ONLY ATTRACTIVE to CAN BE BOTH ATTRACTIVE & REPULSIVE:',
    sortItems: [
      'Gravitational Force (between two masses)',
      'Electrostatic Force (between electric charges)',
      'Magnetic Force (between magnetic poles)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Gravitational force is strictly attractive in our universe. Electrostatic (like repel, unlike attract) and Magnetic (like poles repel, unlike attract) can both attract and repel.',
    hints: [
      'Does gravity ever repel matter? No, it is universally attractive.',
      'Electric and magnetic forces exhibit both attraction and repulsion based on sign/polarity.',
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
  nodeId: NODE_C9_PHY_011,
  title: 'Equations of Motion, Dynamics & Gravitation',
  definition:
    'Uniformly accelerated motion describes straight-line kinematics with constant acceleration (v=u+at, S=ut+½at², v²=u²+2aS). Newton’s laws quantify inertia, force as rate of change of momentum (F=ma), and action-reaction pairs, culminating in Universal Gravitation (F=Gm₁m₂/r²) and mass-independent free-fall acceleration (g=GM/R²).',
  eli5: 'Speeding up smoothly follows simple math: your new speed is start speed plus acceleration times time. Heavier things are harder to speed up (inertia), every push has an equal push back, and gravity pulls all falling things in vacuum at the exact same rate!',
  misconceptions: [
    {
      misconception: 'The velocity-time graph for uniformly accelerated motion is curved.',
      correction: 'Uniform acceleration means constant rate of velocity change, resulting in a straight line with constant slope.',
    },
    {
      misconception: 'The area under a v-t graph represents instantaneous speed.',
      correction: 'The area under a velocity-time graph represents total displacement S (metres), not speed.',
    },
    {
      misconception: 'Action and reaction forces cancel each other out to produce zero net force.',
      correction: 'Action and reaction act on two DIFFERENT bodies simultaneously; they never cancel on a single object.',
    },
    {
      misconception: 'Heavier objects fall faster in vacuum because Earth pulls them with greater force.',
      correction: 'While Earth pulls heavier objects with more force (F=mg), their inertia (m) is proportionally larger; hence acceleration g = F/m = GM/R² is identical for all masses.',
    },
    {
      misconception: 'A continuous force is required to keep an object moving at constant velocity in space.',
      correction: 'By Newton’s First Law, an object in uniform motion continues indefinitely unless an unbalanced external force acts on it.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the slope of a velocity-time graph equal to?', options: ['Displacement', 'Acceleration', 'Force', 'Momentum'], correctIndex: 1 },
    { question: 'What is the SI unit of linear momentum?', options: ['kg·m/s²', 'kg·m/s', 'N/m', 'Joule'], correctIndex: 1 },
    { question: 'If distance between two masses is halved, the gravitational force becomes:', options: ['Half', 'Double', 'Four times', 'One fourth'], correctIndex: 2 },
    { question: 'Which contact force acts perpendicular to the surface of support?', options: ['Frictional force', 'Normal reaction', 'Tension', 'Gravitational force'], correctIndex: 1 },
    { question: 'The formula v² = u² + 2aS is derived by eliminating which variable?', options: ['Acceleration a', 'Displacement S', 'Time t', 'Initial velocity u'], correctIndex: 2 },
    { question: 'On the Moon, which physical quantity of a rover remains unchanged?', options: ['Weight', 'Acceleration due to gravity', 'Mass', 'Normal reaction'], correctIndex: 2 },
    { question: '1 Newton is equivalent to how many dynes?', options: ['10³', '10⁵', '10⁶', '10⁸'], correctIndex: 1 },
    { question: 'Why does a rocket accelerate in deep space vacuum?', options: ['Exhaust gas pushes against space dust', 'Newton’s 3rd law reaction from expelled high-speed exhaust gas', 'Zero gravity sucks it forward', 'Solar wind pressure'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student can derive and apply equations of motion, calculate force and momentum from F=ma and F=Δp/Δt, identify action-reaction pairs, and solve gravitation and free-fall problems.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Kinematics: v-t Graph & Equations of Motion',
    instruction: 'Adjust Initial Velocity (u), Acceleration (a), and Time (t). Observe how the shaded Area (ut + ½at²) and Slope directly generate the 3 equations of motion.',
    interactionType: 'slider-kinematics',
    nodeId: NODE_C9_PHY_011,
  },
  {
    title: 'Dynamics: Newton’s 2nd Law & Friction Track',
    instruction: 'Apply pulling force F and adjust surface friction. Watch the crate accelerate in real-time and observe F_net = ma and rate of momentum change p = mv.',
    interactionType: 'slider-dynamics',
    nodeId: NODE_C9_PHY_015,
  },
  {
    title: 'Newton’s 3rd Law: Action & Reaction Skaters',
    instruction: 'Click "Push Off!" to observe two astronauts on low-friction ice. Notice how forces are equal & opposite (-F) while accelerations depend on individual masses!',
    interactionType: 'interactive-thirdlaw',
    nodeId: NODE_C9_PHY_018,
  },
  {
    title: 'Universal Gravitation & Inverse Square Field',
    instruction: 'Drag the distance slider (r) between Satellite and Earth. See the gravitational force vector shrink quadratically according to F = Gm₁m₂/r².',
    interactionType: 'slider-gravitation',
    nodeId: NODE_C9_PHY_019,
  },
  {
    title: 'Free Fall Vacuum Chamber: Coin vs Feather',
    instruction: 'Toggle Air Resistance ON and OFF, then click "Drop!". Discover why hammer/coin and feather hit the ground together only in vacuum!',
    interactionType: 'interactive-freefall',
    nodeId: NODE_C9_PHY_020,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Chandrayaan Lander Telemetry Audit',
  description: 'Apply your physics mastery to evaluate lunar landing telemetry: A 600 kg lander descends from 50 m above the Moon surface at 10 m/s downward. Calculate the retrorocket thrust force needed to bring it to a soft touchdown (v = 0) at the surface.',
  steps: [
    'Identify Lunar g = 1.62 m/s² downward; initial velocity u = -10 m/s, final v = 0, displacement S = -50 m.',
    'Use v² = u² + 2aS to find required net upward acceleration: 0 = 100 + 2a(-50) ⇒ a_net = +1.0 m/s².',
    'Calculate required rocket upward acceleration: a_thrust = a_net + g_moon = 1.0 + 1.62 = 2.62 m/s².',
    'Compute required thrust force: F_thrust = m · a_thrust = 600 kg × 2.62 m/s² = 1572 N.',
  ],
};

function C9_PhysicsEquationsUniformlyAcceleratedSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_PHY_011,
  title = DEFAULT_PROPS.title || 'Equations of Motion & Dynamics',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚛️', color: 'cyan' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction questions state
  const [predictionAnswers, setPredictionAnswers] = useState<Record<string, number | null>>({});
  const [predictionFeedback, setPredictionFeedback] = useState<Record<string, boolean>>({});

  // Observation questions state
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number | null>>({});
  const [observationFeedback, setObservationFeedback] = useState<Record<string, boolean>>({});

  // Difficulty & BKT adaptive state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Interactive challenge input state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection responses
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // ─── LAB SIMULATION STATE VARIABLES ───
  // 1. Kinematics simulation
  const [simU, setSimU] = useState(5); // Initial velocity (m/s)
  const [simA, setSimA] = useState(2); // Acceleration (m/s²)
  const [simT, setSimT] = useState(4); // Time (s)
  const [kinematicsPlaying, setKinematicsPlaying] = useState(false);
  const [kinematicsCurrentT, setKinematicsCurrentT] = useState(0);

  // 2. Dynamics simulation
  const [dynMass, setDynMass] = useState(5); // kg
  const [dynForce, setDynForce] = useState(20); // N
  const [dynFrictionCoeff, setDynFrictionCoeff] = useState(0.1); // mu
  const [dynTrolleyPos, setDynTrolleyPos] = useState(10); // %
  const [dynVelocity, setDynVelocity] = useState(0); // m/s
  const [dynIsPushing, setDynIsPushing] = useState(false);

  // 3. Newton 3rd law simulation
  const [skater1Mass, setSkater1Mass] = useState(60); // kg
  const [skater2Mass, setSkater2Mass] = useState(90); // kg
  const [skater1Pos, setSkater1Pos] = useState(180);
  const [skater2Pos, setSkater2Pos] = useState(220);
  const [thirdLawPushed, setThirdLawPushed] = useState(false);

  // 4. Gravitation simulation
  const [gravMass1, setGravMass1] = useState(1000);
  const [gravMass2, setGravMass2] = useState(500);
  const [gravDistance, setGravDistance] = useState(10);

  // 5. Free Fall vacuum simulation
  const [airResistanceOn, setAirResistanceOn] = useState(true);
  const [fallObj1Y, setFallObj1Y] = useState(20);
  const [fallObj2Y, setFallObj2Y] = useState(20);
  const [isFalling, setIsFalling] = useState(false);
  const [freeFallTime, setFreeFallTime] = useState(0);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // ─── DERIVED KINEMATICS CALCULATIONS ───
  const calcFinalV = useMemo(() => simU + simA * simT, [simU, simA, simT]);
  const calcDisp = useMemo(() => simU * simT + 0.5 * simA * simT * simT, [simU, simA, simT]);
  const calcRectArea = useMemo(() => simU * simT, [simU, simT]);
  const calcTriArea = useMemo(() => 0.5 * simA * simT * simT, [simA, simT]);

  // Dynamics derived
  const dynFrictionForce = useMemo(() => dynFrictionCoeff * dynMass * 9.8, [dynFrictionCoeff, dynMass]);
  const dynNetForce = useMemo(() => Math.max(0, dynForce - dynFrictionForce), [dynForce, dynFrictionForce]);
  const dynAccel = useMemo(() => dynNetForce / dynMass, [dynNetForce, dynMass]);
  const dynMomentum = useMemo(() => dynMass * dynVelocity, [dynMass, dynVelocity]);

  // Gravitation derived
  const calcGravForceRatio = useMemo(() => {
    return ((gravMass1 * gravMass2) / (gravDistance * gravDistance)) * 0.1;
  }, [gravMass1, gravMass2, gravDistance]);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
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

  // ─── HTML CANVAS 2D ANIMATION (KINEMATICS MOTION GRAPH) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const ox = 45;
      const oy = canvas.height - 30;
      const graphW = canvas.width - 65;
      const graphH = canvas.height - 50;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ox, 10);
      ctx.lineTo(ox, oy);
      ctx.lineTo(canvas.width - 15, oy);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px sans-serif';
      ctx.fillText('v (m/s)', 10, 20);
      ctx.fillText('Time t (s) →', canvas.width - 70, oy + 20);

      const maxT = 10;
      const maxV = 35;
      const scaleX = graphW / maxT;
      const scaleY = graphH / maxV;

      const ptU_x = ox;
      const ptU_y = oy - simU * scaleY;

      const ptV_x = ox + simT * scaleX;
      const ptV_y = oy - calcFinalV * scaleY;

      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(ptV_x, oy);
      ctx.lineTo(ptV_x, ptU_y);
      ctx.lineTo(ox, ptU_y);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(234, 179, 8, 0.35)';
      ctx.beginPath();
      ctx.moveTo(ox, ptU_y);
      ctx.lineTo(ptV_x, ptU_y);
      ctx.lineTo(ptV_x, ptV_y);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(ptU_x, ptU_y);
      ctx.lineTo(ptV_x, ptV_y);
      ctx.stroke();

      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(ptU_x, ptU_y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(`u=${simU}`, ptU_x - 30, ptU_y + 4);

      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(ptV_x, ptV_y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(`v=${calcFinalV.toFixed(1)}`, ptV_x - 10, ptV_y - 8);

      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(ox, ptU_y);
      ctx.lineTo(ptV_x, ptU_y);
      ctx.lineTo(ptV_x, ptV_y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#eab308';
      ctx.fillText(`Slope = a = ${simA} m/s²`, ptV_x - 90, ptU_y - 10);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [simU, simA, simT, calcFinalV]);

  // ─── DYNAMICS TROLLEY MOTION EFFECT ───
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (dynIsPushing) {
      interval = setInterval(() => {
        setDynVelocity(v => v + dynAccel * 0.05);
        setDynTrolleyPos(p => (p >= 85 ? 10 : p + (dynVelocity + 0.5) * 0.4));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [dynIsPushing, dynAccel, dynVelocity]);

  // ─── FREE FALL RUNNER EFFECT ───
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isFalling) {
      const g = 9.8;
      const kAir = airResistanceOn ? 0.35 : 0.0;
      timer = setInterval(() => {
        setFreeFallTime(t => {
          const nextT = t + 0.05;
          const y1 = 20 + 0.5 * g * nextT * nextT * 12;
          const effectiveG2 = Math.max(0.5, g - kAir * nextT * 3.5);
          const y2 = 20 + 0.5 * effectiveG2 * nextT * nextT * 12;

          if (y1 >= 220) {
            setIsFalling(false);
            audioManager.play('drop-correct');
            speechManager.speak(airResistanceOn ? 'Notice the feather lagged due to air drag!' : 'In vacuum, both struck simultaneously!');
            return nextT;
          }
          setFallObj1Y(Math.min(220, y1));
          setFallObj2Y(Math.min(220, y2));
          return nextT;
        });
      }, 40);
    }
    return () => clearInterval(timer);
  }, [isFalling, airResistanceOn]);

  // ─── CALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeObj.hints[nextLevel - 1]) {
      const hintText = currentChallengeObj.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
      speechManager.speak('Let us study the complete physical explanation together.');
    }
  }, [hintCount, currentChallengeObj]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding physics intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictionAnswer = useCallback((qId: string, optionIdx: number, correctIdx: number) => {
    const isCorrect = optionIdx === correctIdx;
    setPredictionAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setPredictionFeedback(prev => ({ ...prev, [qId]: isCorrect }));
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great prediction! Now verify it interactively in the simulation.' : 'Check the interactive lab to verify what actually happens.');
  }, []);

  const handleObservationAnswer = useCallback((qId: string, optionIdx: number, correctIdx: number) => {
    const isCorrect = optionIdx === correctIdx;
    setObservationAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setObservationFeedback(prev => ({ ...prev, [qId]: isCorrect }));
    audioManager.play(isCorrect ? 'drop-correct' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! That aligns with physical laws.' : 'Look closely at the telemetry values and force vectors.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive dynamics laboratory. Manipulate variables to discover physical laws.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test extreme variables without time limits or grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing competency challenges. Test your mastery!');
  }, []);

  const handleKinematicsSlider = useCallback((type: 'u' | 'a' | 't', val: number) => {
    if (type === 'u') setSimU(val);
    if (type === 'a') setSimA(val);
    if (type === 't') setSimT(val);
    setKinematicsCurrentT(0);
    audioManager.play('count');
  }, []);

  const handleThirdLawPush = useCallback(() => {
    setThirdLawPushed(true);
    audioManager.play('balance');
    speechManager.speak('Forces applied: equal and opposite! The lighter astronaut accelerates faster.');
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setSkater1Pos(p => Math.max(40, p - 3));
      setSkater2Pos(p => Math.min(360, p + 2));
      if (step >= 30) {
        clearInterval(interval);
      }
    }, 40);
  }, []);

  const handleResetThirdLaw = useCallback(() => {
    setSkater1Pos(180);
    setSkater2Pos(220);
    setThirdLawPushed(false);
    audioManager.play('pop');
  }, []);

  const handleTriggerFreeFall = useCallback(() => {
    setFallObj1Y(20);
    setFallObj2Y(20);
    setFreeFallTime(0);
    setIsFalling(true);
    audioManager.play('whoosh');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission accomplished! Final dynamics score: ${finalScore} percent.`);
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

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') {
        isCorrect = answer === currentChallengeObj.correctIndex;
      } else if (currentChallengeObj.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctMapping);
      } else if (currentChallengeObj.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctOrder);
      } else if (currentChallengeObj.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (currentChallengeObj.correctAnswer || 0)) <= (currentChallengeObj.tolerance || 0.1);
      } else if (currentChallengeObj.type === 'construct') {
        isCorrect = answer === currentChallengeObj.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis! Well reasoned.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (currentChallengeObj.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)) {
          setHitMisconceptions(prev => [...prev, currentChallengeObj.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Review the step-by-step physical solution below.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
          const updatedSrs = sm2Update(srsItem, 1, 5000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [currentChallengeObj, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        if (prev.length === 0 && currentChallengeObj.sortItems) {
          prev = currentChallengeObj.sortItems.map((_, i) => i);
        }
        const copy = [...prev];
        const [moved] = copy.splice(fromIdx, 1);
        copy.splice(toIdx, 0, moved);
        return copy;
      });
    },
    [currentChallengeObj]
  );

  // ─── SRS SCHEDULE COMPUTATION ───
  const srsReviewSchedule = useMemo(() => {
    if (errors === 0) {
      return {
        days: 7,
        label: 'review in 7 days',
        badgeColor: 'bg-emerald-950 border-emerald-500 text-emerald-300',
        message: 'Mastery retained exceptionally well. Next spaced retrieval scheduled in 7 days.',
      };
    } else if (errors <= 3) {
      return {
        days: 3,
        label: 'review in 3 days',
        badgeColor: 'bg-amber-950 border-amber-500 text-amber-300',
        message: 'Good comprehension. Target reinforcement scheduled in 3 days to consolidate retention.',
      };
    } else {
      return {
        days: 1,
        label: 'review in 1 day',
        badgeColor: 'bg-rose-950 border-rose-500 text-rose-300',
        message: 'Foundational concepts require near-term strengthening. Scheduled for review tomorrow (1 day).',
      };
    }
  }, [errors]);

  // ─── RENDER MAIN UI ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-cyan-950/80 border border-cyan-700/50 rounded-2xl">🚀</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                ICSE Class 9 • Physics
              </span>
              <span className="text-xs text-slate-400">Chapters 2 & 3</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Difficulty badge & Phase progress */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 border-rose-500/40 text-rose-300'
                : 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Phase: <strong className="text-slate-200 capitalize">{phase}</strong>
          </span>
        </div>
      </header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-cyan-800/40">
            <div className="flex items-center gap-2 mb-2 text-cyan-400 font-semibold text-sm">
              <span>🛰️</span> Mission Briefing: {SCENARIO.title}
            </div>
            <p className="text-slate-200 text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span>🤔</span> Pre-Lab Discovery Puzzle (Not Graded)
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700/70 hover:border-cyan-500 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-semibold' : 'text-amber-400 text-sm font-semibold'}>
                  {discoveryCorrect ? '✓ Spot on! Newton and Galileo proved that all bodies accelerate equally under gravity alone.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Physics Lab"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/40"
                >
                  Enter Interactive Physics Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step selector tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                aria-label={`Step ${idx + 1}: ${step.title}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentSlide === idx
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/50'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          {/* Active Lab Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">Interactive Station {currentSlide + 1} of 5</span>
                <h2 className="text-xl font-bold text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-sm text-amber-300/90 mt-1.5 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: KINEMATICS */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <canvas ref={canvasRef} width={420} height={240} className="w-full max-w-[420px] rounded-lg shadow-inner bg-slate-950" />
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-sky-500/40 rounded-sm"></span> Rect Area = u·t ({calcRectArea.toFixed(1)}m)</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-amber-500/40 rounded-sm"></span> Tri Area = ½a·t² ({calcTriArea.toFixed(1)}m)</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Initial Velocity (u)</span>
                          <span className="text-cyan-400 font-mono">{simU} m/s</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={15}
                          step={1}
                          value={simU}
                          onChange={e => handleKinematicsSlider('u', Number(e.target.value))}
                          aria-label="Set Initial Velocity"
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Acceleration (a = slope)</span>
                          <span className="text-amber-400 font-mono">{simA} m/s²</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={5}
                          step={0.5}
                          value={simA}
                          onChange={e => handleKinematicsSlider('a', Number(e.target.value))}
                          aria-label="Set Acceleration"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-300">Time Interval (t)</span>
                          <span className="text-emerald-400 font-mono">{simT} s</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={8}
                          step={1}
                          value={simT}
                          onChange={e => handleKinematicsSlider('t', Number(e.target.value))}
                          aria-label="Set Time Interval"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1.5 font-mono">
                      <div className="text-cyan-300 font-sans font-bold">Equations Derived in Real-Time:</div>
                      <div>1. v = u + at ⇒ <span className="text-cyan-400">{simU} + ({simA}×{simT}) = {calcFinalV.toFixed(1)} m/s</span></div>
                      <div>2. S = ut + ½at² ⇒ <span className="text-amber-400">{calcRectArea} + {calcTriArea} = {calcDisp.toFixed(1)} m</span></div>
                      <div>3. v² = u² + 2aS ⇒ <span className="text-emerald-400">({simU})² + 2({simA})({calcDisp.toFixed(1)}) = {(calcFinalV * calcFinalV).toFixed(1)} (m/s)²</span></div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: DYNAMICS */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 140" className="w-full h-36">
                      <rect x="20" y="100" width="460" height="15" fill="#1e293b" />
                      <line x1="20" y1="100" x2="480" y2="100" stroke="#475569" strokeWidth="2" />
                      {Array.from({ length: 23 }).map((_, i) => (
                        <line key={i} x1={30 + i * 20} y1="102" x2={20 + i * 20} y2="114" stroke="#334155" strokeWidth="1.5" />
                      ))}

                      <g transform={`translate(${20 + (dynTrolleyPos * 4.2)}, 55)`}>
                        <rect x="0" y="0" width="65" height="45" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                        <text x="32" y="27" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                          {dynMass} kg
                        </text>
                        <circle cx="15" cy="45" r="5" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
                        <circle cx="50" cy="45" r="5" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />

                        {dynForce > 0 && (
                          <g>
                            <line x1="65" y1="22" x2={65 + Math.min(80, dynForce * 1.8)} y2="22" stroke="#22c55e" strokeWidth="3" />
                            <text x={70 + Math.min(80, dynForce * 1.8)} y="26" fill="#22c55e" fontSize="10" fontWeight="bold">
                              F={dynForce}N
                            </text>
                          </g>
                        )}

                        {dynFrictionForce > 0 && (
                          <g>
                            <line x1="0" y1="44" x2={-Math.min(45, dynFrictionForce * 1.8)} y2="44" stroke="#f43f5e" strokeWidth="2.5" />
                            <text x={-Math.min(45, dynFrictionForce * 1.8) - 5} y="47" textAnchor="end" fill="#f43f5e" fontSize="9">
                              f={dynFrictionForce.toFixed(1)}N
                            </text>
                          </g>
                        )}
                      </g>

                      <text x="30" y="25" fill="#38bdf8" fontSize="11" fontFamily="monospace">
                        v = {dynVelocity.toFixed(2)} m/s | p = mv = {dynMomentum.toFixed(1)} kg·m/s
                      </text>
                      <text x="30" y="42" fill="#eab308" fontSize="11" fontFamily="monospace">
                        F_net = {dynNetForce.toFixed(1)} N ⇒ a = F_net/m = {dynAccel.toFixed(2)} m/s²
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Applied Pull Force (F)</span>
                        <span className="text-emerald-400 font-mono">{dynForce} N</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={60}
                        step={5}
                        value={dynForce}
                        onChange={e => setDynForce(Number(e.target.value))}
                        aria-label="Set Pull Force"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Mass of Crate (m)</span>
                        <span className="text-cyan-400 font-mono">{dynMass} kg</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={20}
                        step={1}
                        value={dynMass}
                        onChange={e => setDynMass(Number(e.target.value))}
                        aria-label="Set Crate Mass"
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-slate-300">Motion State</div>
                        <div className="text-xs text-slate-400">{dynIsPushing ? 'Active Acceleration' : 'At Rest / Coasting'}</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setDynIsPushing(!dynIsPushing);
                          audioManager.play(dynIsPushing ? 'pop' : 'whoosh');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          dynIsPushing ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {dynIsPushing ? 'Stop Force' : 'Apply Force →'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: NEWTON'S 3RD LAW */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 420 160" className="w-full h-40">
                      <rect x="10" y="120" width="400" height="8" fill="#38bdf8" opacity="0.4" />
                      <line x1="10" y1="120" x2="410" y2="120" stroke="#0ea5e9" strokeWidth="2" />

                      <g transform={`translate(${skater1Pos}, 60)`}>
                        <circle cx="0" cy="0" r="14" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
                        <rect x="-12" y="14" width="24" height="35" rx="4" fill="#1e40af" />
                        <line x1="-15" y1="58" x2="15" y2="58" stroke="#cbd5e1" strokeWidth="3" />
                        <text x="0" y="32" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                          {skater1Mass}kg
                        </text>

                        {thirdLawPushed && (
                          <g>
                            <line x1="-15" y1="20" x2="-60" y2="20" stroke="#f43f5e" strokeWidth="3" />
                            <text x="-65" y="24" textAnchor="end" fill="#f43f5e" fontSize="9" fontWeight="bold">
                              F₁ = -60N
                            </text>
                            <text x="-65" y="38" textAnchor="end" fill="#f43f5e" fontSize="8">
                              a₁ = -{(60 / skater1Mass).toFixed(2)} m/s²
                            </text>
                          </g>
                        )}
                      </g>

                      <g transform={`translate(${skater2Pos}, 60)`}>
                        <circle cx="0" cy="0" r="14" fill="#10b981" stroke="#6ee7b7" strokeWidth="2" />
                        <rect x="-14" y="14" width="28" height="35" rx="4" fill="#047857" />
                        <line x1="-15" y1="58" x2="15" y2="58" stroke="#cbd5e1" strokeWidth="3" />
                        <text x="0" y="32" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                          {skater2Mass}kg
                        </text>

                        {thirdLawPushed && (
                          <g>
                            <line x1="15" y1="20" x2="60" y2="20" stroke="#10b981" strokeWidth="3" />
                            <text x="65" y="24" fill="#10b981" fontSize="9" fontWeight="bold">
                              F₂ = +60N
                            </text>
                            <text x="65" y="38" fill="#10b981" fontSize="8">
                              a₂ = +{(60 / skater2Mass).toFixed(2)} m/s²
                            </text>
                          </g>
                        )}
                      </g>

                      {!thirdLawPushed && (
                        <circle cx="200" cy="80" r="6" fill="#fbbf24" opacity="0.8" />
                      )}
                    </svg>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-slate-400">Astronaut A Mass:</span> <strong className="text-blue-400">{skater1Mass} kg</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Astronaut B Mass:</span> <strong className="text-emerald-400">{skater2Mass} kg</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleThirdLawPush}
                        disabled={thirdLawPushed}
                        aria-label="Push Off"
                        className="px-5 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold rounded-xl text-xs disabled:opacity-50"
                      >
                        Push Off! (Action-Reaction)
                      </motion.button>
                      {thirdLawPushed && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleResetThirdLaw}
                          className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                        >
                          Reset Positions
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: GRAVITATION */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 160" className="w-full h-40">
                      <circle cx="70" cy="80" r="45" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                      <text x="70" y="84" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                        Earth (M₁)
                      </text>

                      <g transform={`translate(${70 + gravDistance * 12}, 80)`}>
                        <rect x="-10" y="-10" width="20" height="20" rx="3" fill="#f59e0b" />
                        <line x1="-20" y1="0" x2="-10" y2="0" stroke="#38bdf8" strokeWidth="4" />
                        <line x1="10" y1="0" x2="20" y2="0" stroke="#38bdf8" strokeWidth="4" />
                        <text x="0" y="-15" textAnchor="middle" fill="#f59e0b" fontSize="10">
                          Satellite (m₂)
                        </text>

                        <line
                          x1="-12"
                          y1="0"
                          x2={-12 - Math.max(15, calcGravForceRatio * 1.5)}
                          y2="0"
                          stroke="#ef4444"
                          strokeWidth="3"
                        />
                      </g>

                      <line x1="70" y1="135" x2={70 + gravDistance * 12} y2="135" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
                      <text x={70 + (gravDistance * 12) / 2} y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Separation r = {gravDistance * 1000} km
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Distance r between centres</span>
                        <span className="text-amber-400 font-mono">{gravDistance * 1000} km</span>
                      </div>
                      <input
                        type="range"
                        min={6}
                        max={30}
                        step={2}
                        value={gravDistance}
                        onChange={e => setGravDistance(Number(e.target.value))}
                        aria-label="Set Gravitational Distance"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                      <div className="text-cyan-400 font-sans font-bold">Inverse Square Law Telemetry:</div>
                      <div>F = G·(m₁·m₂)/r² ∝ <span className="text-amber-400">1/({gravDistance})²</span> = {(1 / (gravDistance * gravDistance)).toFixed(4)}</div>
                      <div className="text-slate-400 text-[11px]">If distance r doubles (2r), Force F drops to ¼ (25%)!</div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: FREE FALL */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 260 260" className="w-full max-w-[260px] h-64">
                      <rect x="30" y="10" width="200" height="235" rx="20" fill={airResistanceOn ? '#0f172a' : '#020617'} stroke="#38bdf8" strokeWidth="3" />
                      <line x1="130" y1="10" x2="130" y2="245" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />

                      <text x="130" y="28" textAnchor="middle" fill={airResistanceOn ? '#f59e0b' : '#38bdf8'} fontSize="10" fontWeight="bold">
                        {airResistanceOn ? 'AIR FILLED CHAMBER' : 'EVACUATED VACUUM CHAMBER'}
                      </text>

                      <g transform={`translate(75, ${fallObj1Y})`}>
                        <circle cx="0" cy="0" r="12" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
                        <text x="0" y="3" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">5 kg</text>
                      </g>

                      <g transform={`translate(185, ${fallObj2Y})`}>
                        <path d="M 0 -12 C 6 -6 8 6 0 14 C -8 6 -6 -6 0 -12 Z" fill="#ec4899" stroke="#f472b6" strokeWidth="1.5" />
                        <text x="0" y="24" textAnchor="middle" fill="#f472b6" fontSize="7">0.01 kg</text>
                      </g>

                      <line x1="35" y1="230" x2="225" y2="230" stroke="#475569" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="md:col-span-5 space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                      <div className="text-xs font-semibold text-slate-300">Chamber Atmospheric Valve</div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setAirResistanceOn(true);
                            audioManager.play('pop');
                          }}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                            airResistanceOn ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          Air ON (Drag)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setAirResistanceOn(false);
                            audioManager.play('pop');
                          }}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                            !airResistanceOn ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          Vacuum (Pure g)
                        </motion.button>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTriggerFreeFall}
                      disabled={isFalling}
                      aria-label="Drop Objects in Chamber"
                      className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-cyan-900/40 disabled:opacity-50"
                    >
                      {isFalling ? 'Falling Under Gravity...' : 'Drop Both Objects! ⏬'}
                    </motion.button>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                      <strong className="text-cyan-300">Physics Principle:</strong>
                      <p>g = GM/R² is totally independent of the falling mass m. In vacuum, both accelerate at exactly 9.8 m/s²!</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ─── BRILLIANT.ORG PREDICTION & OBSERVATION CHECKS ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Predictions Card */}
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-cyan-800/40 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔮</span> Brilliant.org Predict-Then-Check Section
              </div>
              <p className="text-xs text-slate-400">Make your prediction, then manipulate the lab slider or interact to verify.</p>

              {PREDICTION_QUESTIONS.map((pq, idx) => {
                const userAns = predictionAnswers[pq.id];
                const hasAnswered = userAns !== undefined && userAns !== null;
                const isCorrect = predictionFeedback[pq.id];

                return (
                  <div key={pq.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="text-xs font-bold text-cyan-300 flex items-center justify-between">
                      <span>Prediction {idx + 1}</span>
                      {hasAnswered && (
                        <span className={isCorrect ? 'text-emerald-400' : 'text-amber-400'}>
                          {isCorrect ? '✓ Correct Prediction' : 'ℹ️ Verified by lab'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-slate-200">{pq.question}</p>

                    <div className="space-y-1.5">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          disabled={hasAnswered}
                          onClick={() => handlePredictionAnswer(pq.id, oIdx, pq.correctIndex)}
                          className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border ${
                            hasAnswered && oIdx === pq.correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : hasAnswered && userAns === oIdx && !isCorrect
                              ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 hover:border-cyan-500 text-slate-300'
                          }`}
                        >
                          <span className="font-bold mr-1.5 text-slate-400">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>

                    {hasAnswered && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2.5 bg-slate-900 rounded-lg text-xs space-y-1 text-slate-300 border border-slate-800">
                        <p className="text-cyan-300 font-semibold">{pq.explanation}</p>
                        <p className="text-amber-300 font-mono text-[11px]">👉 Verification: {pq.verifyInstruction}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Observations Card */}
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-indigo-800/40 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <span>👁️</span> 'What Do You Notice?' Observation Analysis
              </div>
              <p className="text-xs text-slate-400">Carefully observe the visual graphs and physics telemetry above to answer.</p>

              {OBSERVATION_QUESTIONS.map((oq, idx) => {
                const userAns = observationAnswers[oq.id];
                const hasAnswered = userAns !== undefined && userAns !== null;
                const isCorrect = observationFeedback[oq.id];

                return (
                  <div key={oq.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="text-xs font-bold text-indigo-300 flex items-center justify-between">
                      <span>Observation {idx + 1}</span>
                      {hasAnswered && (
                        <span className={isCorrect ? 'text-emerald-400' : 'text-amber-400'}>
                          {isCorrect ? '✓ Verified Pattern' : 'ℹ️ Study physical pattern'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-slate-200">{oq.question}</p>

                    <div className="space-y-1.5">
                      {oq.observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          disabled={hasAnswered}
                          onClick={() => handleObservationAnswer(oq.id, oIdx, oq.correctIndex)}
                          className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border ${
                            hasAnswered && oIdx === oq.correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : hasAnswered && userAns === oIdx && !isCorrect
                              ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 hover:border-indigo-500 text-slate-300'
                          }`}
                        >
                          <span className="font-bold mr-1.5 text-slate-400">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>

                    {hasAnswered && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2.5 bg-slate-900 rounded-lg text-xs space-y-1 text-slate-300 border border-slate-800">
                        <p className="text-indigo-300 font-semibold">{oq.explanation}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-cyan-300">🚀 Free Sandbox Exploration (Zero Grading Stress)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Test multi-variable interactions freely. Change initial speed, launch forces, or toggle vacuum modes before facing board exam challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-amber-400">Kinematics Rapid Playground</h4>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Velocity u</span>
                    <span className="text-cyan-400">{simU} m/s</span>
                  </div>
                  <input type="range" min={0} max={20} value={simU} onChange={e => setSimU(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Acceleration a</span>
                    <span className="text-amber-400">{simA} m/s²</span>
                  </div>
                  <input type="range" min={-5} max={10} value={simA} onChange={e => setSimA(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Time t</span>
                    <span className="text-emerald-400">{simT} s</span>
                  </div>
                  <input type="range" min={1} max={10} value={simT} onChange={e => setSimT(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-cyan-400">Calculated Physics Metrics</h4>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Final Velocity v = u + at:</span>
                  <span className="text-cyan-300 font-bold">{calcFinalV.toFixed(2)} m/s</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Displacement S = ut + ½at²:</span>
                  <span className="text-amber-300 font-bold">{calcDisp.toFixed(2)} m</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Average Velocity (u + v)/2:</span>
                  <span className="text-emerald-300 font-bold">{((simU + calcFinalV) / 2).toFixed(2)} m/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kinetic Energy Factor (v²):</span>
                  <span className="text-rose-300 font-bold">{(calcFinalV * calcFinalV).toFixed(1)} (m/s)²</span>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdvanceToChallenge}
            aria-label="Ready for Challenges"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-600 via-indigo-600 to-emerald-600 text-white font-black rounded-2xl text-sm shadow-xl shadow-cyan-900/40"
          >
            I am Ready for the Competency Challenges! 🎯 →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-slate-400 uppercase font-semibold">
                NEP Competency: <strong className="text-cyan-400">{currentChallengeObj.competencyLevel}</strong>
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-6 bg-slate-900/95 rounded-2xl border border-slate-800 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-bold text-white leading-relaxed">{currentChallengeObj.question}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                {currentChallengeObj.nodeId}
              </span>
            </div>

            {/* MCQ / Classify / Distinguish */}
            {(currentChallengeObj.type === 'classify' ||
              currentChallengeObj.type === 'distinguish' ||
              currentChallengeObj.type === 'match') &&
              currentChallengeObj.options && (
                <div className="space-y-2.5">
                  {currentChallengeObj.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                        wrongFlash
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : showExplanation && i === currentChallengeObj.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                          : 'bg-slate-800/80 border-slate-700/80 hover:border-cyan-500 hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Numeric Input */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <motion.input
                    type="number"
                    step="any"
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    aria-label="Numerical answer input"
                    className={`px-4 py-3 bg-slate-950 border rounded-xl text-white font-mono text-base focus:outline-none w-56 ${
                      wrongFlash ? 'border-rose-500 bg-rose-950/30' : 'border-slate-700 focus:border-cyan-500'
                    }`}
                  />
                  <span className="text-cyan-400 font-bold">{currentChallengeObj.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(parseFloat(numericInput))}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm shadow-md shadow-cyan-900/40 disabled:opacity-40"
                  >
                    Verify Calculation ✓
                  </motion.button>
                </div>
              </div>
            )}

            {/* Drag-Label Challenge */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg cursor-grab active:cursor-grabbing border border-indigo-400/30"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 400 180" className="w-full h-44">
                    <rect x="150" y="60" width="100" height="60" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <text x="200" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">BLOCK</text>

                    <rect
                      x="140"
                      y="10"
                      width="120"
                      height="34"
                      rx="6"
                      fill="#0f172a"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_top')}
                    />
                    <text x="200" y="31" textAnchor="middle" fill="#38bdf8" fontSize="10">
                      {droppedLabels.target_top || 'Drop Normal Reaction ↑'}
                    </text>

                    <rect
                      x="270"
                      y="73"
                      width="120"
                      height="34"
                      rx="6"
                      fill="#0f172a"
                      stroke="#22c55e"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_right')}
                    />
                    <text x="330" y="94" textAnchor="middle" fill="#22c55e" fontSize="10">
                      {droppedLabels.target_right || 'Drop Tension →'}
                    </text>

                    <rect
                      x="140"
                      y="135"
                      width="120"
                      height="34"
                      rx="6"
                      fill="#0f172a"
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_bottom')}
                    />
                    <text x="200" y="156" textAnchor="middle" fill="#f43f5e" fontSize="10">
                      {droppedLabels.target_bottom || 'Drop Friction ←'}
                    </text>
                  </svg>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs"
                >
                  Submit Target Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length === currentChallengeObj.sortItems.length
                  ? sortArrangement.map(idx => currentChallengeObj.sortItems![idx])
                  : currentChallengeObj.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0
                        ? sortArrangement
                        : currentChallengeObj.sortItems!.map((_, i) => i)
                    )
                  }
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs mt-2"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{currentChallengeObj.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-700/80 hover:bg-indigo-600 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[60px] p-4 bg-slate-950 rounded-xl border border-slate-700 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-cyan-950 border border-cyan-500 text-cyan-300 rounded-lg text-xs font-mono flex items-center gap-1.5"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-500 text-xs italic">Click parts above to build formula</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs"
                >
                  Validate Construction
                </motion.button>
              </div>
            )}

            {/* Explanation card */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 rounded-2xl border border-amber-600/40 space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <span>💡</span> Step-by-Step Examiner Solution
                </div>

                {currentChallengeObj.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans"
                    >
                      <strong className="text-amber-400 mr-1.5">Step {idx + 1}:</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setRevealedSteps(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Working Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/40 mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission Report →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 rounded-3xl border border-cyan-800/40 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Dynamics & Gravitation Mastered!</h2>
            <div className="flex justify-center gap-6 text-sm">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-xs">Final Score</div>
                <div className="text-2xl font-black text-cyan-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-xs">Mastery Level</div>
                <div className="text-2xl font-black text-emerald-400 capitalize">{masteryLevel}</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-xs">Total Errors</div>
                <div className="text-2xl font-black text-amber-400">{errors}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 max-w-xl mx-auto text-xs md:text-sm text-slate-300">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered all 3 equations of motion, Newton’s laws, and gravitation with zero errors!'
                : errors <= 3
                ? '🚀 Great work! You possess high competency in kinematics and dynamics. Review the misconceptions below to reach 100%.'
                : '💪 Solid effort! Mechanics is demanding. Review the step-by-step notes and retry to cement your foundational physics intuition.'}
            </div>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY CARD (SRS SYSTEM) ─── */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-cyan-700/50 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">���</span>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white">Spaced Repetition Review Schedule</h3>
                  <p className="text-xs text-slate-400">SM-2 Adaptive Memory Retention Algorithm</p>
                </div>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${srsReviewSchedule.badgeColor}`}>
                {srsReviewSchedule.label}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-xs font-semibold">Scheduled Retrieval</div>
                <div className="text-lg font-bold text-cyan-400">{srsReviewSchedule.days} Day{srsReviewSchedule.days > 1 ? 's' : ''} from now</div>
                <p className="text-[11px] text-slate-400">{srsReviewSchedule.message}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-xs font-semibold">Retention Rule</div>
                <div className="text-xs font-mono text-slate-300">
                  0 errors → <span className="text-emerald-400 font-bold">7 days</span><br />
                  1-3 errors → <span className="text-amber-400 font-bold">3 days</span><br />
                  4+ errors → <span className="text-rose-400 font-bold">1 day</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-xs font-semibold">Active Flashcard Deck</div>
                <div className="text-xs text-slate-300 font-medium">10 Linked ICSE Physics Nodes:</div>
                <div className="text-[11px] text-cyan-400 font-mono">c9_phy_011 through c9_phy_020</div>
              </div>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-indigo-500/30 space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>💭</span> Key Learning Reflections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400">Reflection 1</span>
                <p className="text-sm text-slate-200 font-medium">What was the most surprising thing you learned?</p>
                <textarea
                  value={reflection1}
                  onChange={e => setReflection1(e.target.value)}
                  placeholder="e.g., Objects of all masses fall at identical acceleration in vacuum..."
                  className="w-full h-24 p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400">Reflection 2</span>
                <p className="text-sm text-slate-200 font-medium">How would you explain this to a friend?</p>
                <textarea
                  value={reflection2}
                  onChange={e => setReflection2(e.target.value)}
                  placeholder="e.g., Action and reaction never cancel because they act on separate bodies..."
                  className="w-full h-24 p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400">Reflection 3</span>
                <p className="text-sm text-slate-200 font-medium">Where in real life might you use this?</p>
                <textarea
                  value={reflection3}
                  onChange={e => setReflection3(e.target.value)}
                  placeholder="e.g., Calculating braking distance in vehicles or rocket thrust for satellite orbits..."
                  className="w-full h-24 p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Diagnosed Physics Conceptual Gaps:
              </h3>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 font-semibold">✓ ICSE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🛰️</span> Real-World ISRO Case Study: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-cyan-400 font-mono">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE MODALS & BURSTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_PhysicsEquationsUniformlyAcceleratedSim;
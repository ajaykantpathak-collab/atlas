'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (ALL 10 ICSE NODES) ───
const NODE_C9_PHY_001 = 'c9_phy_001'; // SI, cgs, fps systems & fundamental units
const NODE_C9_PHY_002 = 'c9_phy_002'; // Least count of measuring instruments
const NODE_C9_PHY_003 = 'c9_phy_003'; // Vernier callipers
const NODE_C9_PHY_004 = 'c9_phy_004'; // Micrometer screw gauge
const NODE_C9_PHY_005 = 'c9_phy_005'; // Simple pendulum & measurement of time
const NODE_C9_PHY_006 = 'c9_phy_006'; // Scalar and vector quantities
const NODE_C9_PHY_007 = 'c9_phy_007'; // Distance and displacement
const NODE_C9_PHY_008 = 'c9_phy_008'; // Speed and velocity
const NODE_C9_PHY_009 = 'c9_phy_009'; // Acceleration and retardation
const NODE_C9_PHY_010 = 'c9_phy_010'; // Distance-time & velocity-time graphs

const ALL_NODE_IDS = [
  NODE_C9_PHY_001,
  NODE_C9_PHY_002,
  NODE_C9_PHY_003,
  NODE_C9_PHY_004,
  NODE_C9_PHY_005,
  NODE_C9_PHY_006,
  NODE_C9_PHY_007,
  NODE_C9_PHY_008,
  NODE_C9_PHY_009,
  NODE_C9_PHY_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Precision Engineering Lab',
  intro: 'You have been appointed as a junior payload engineer at ISRO Sriharikota. A rover component is experiencing critical sensor drift during lunar descent simulation. To calibrate the lander touchdown telemetry, you must master fundamental physical units, micro-measurements (Vernier & Screw gauge), timing dynamics (pendulums), and the kinematic vectors of descent.',
  context: 'Calibrate precision instruments, verify vectors against scalars, compute least counts, and analyze real-time descent graphs before the lunar launch window closes.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An ISRO test rover travels 30 m East towards the lunar drill site, then reverses 40 m West to avoid a boulder crater. What is its displacement from the lander?',
  options: [
    '70 m West (Total distance covered)',
    '10 m West (Net straight-line change with direction)',
    '10 m East (Direction of first step)',
    'Zero (Because it returned past the start)',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Distance adds up all footsteps, but displacement only measures the straight arrow from initial start to final position with direction!',
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  scenarioContext?: string;
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

// ─── CHALLENGES ARRAY (22 Progressive Challenges) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c9_phy_001)
  {
    id: 'ch_01_si_units',
    nodeId: NODE_C9_PHY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following contains ONLY fundamental SI base units with correct ICSE symbol notation?',
    options: [
      'Metre (m), Kilogram (Kg), Second (sec), Kelvin (°K)',
      'Metre (m), Kilogram (kg), Second (s), Kelvin (K)',
      'Centimetre (cm), Gram (g), Second (s), Ampere (amp)',
      'Metre (m), Newton (N), Second (s), Joule (J)',
    ],
    correctIndex: 1,
    explanation: 'The 7 SI base units must follow exact symbol conventions: kilogram is kg (lowercase), second is s (never sec), and kelvin is K (no degree symbol and capital K). Newton and Joule are derived units.',
    hints: [
      'Look closely at the capitalization: is kilogram written as "Kg" or "kg"?',
      'Remember the ICSE board rule: Kelvin never takes a degree symbol (°K is wrong), and second is s, not sec.',
      'Metre (m), Kilogram (kg), Second (s), and Kelvin (K) are the fundamental SI base units.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c9_phy_002)
  {
    id: 'ch_02_least_count_stopwatch',
    nodeId: NODE_C9_PHY_002,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A laboratory analog stopwatch has its main dial graduated such that 1 second is divided into 10 equal subdivisions. Calculate its least count in seconds.',
    correctAnswer: 0.1,
    tolerance: 0.01,
    unit: 's',
    explanation: 'Least Count = (Value of 1 Main Scale Division) / (Number of subdivisions) = 1 s / 10 = 0.1 s.',
    hints: [
      'Use the formula: Least Count = (1 Main Division Value) / (Number of parts).',
      'The main division represents 1 second, split into 10 tick marks.',
      'Calculate 1 / 10 = 0.1 s.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Drag-label Vernier anatomy (c9_phy_003)
  {
    id: 'ch_03_vernier_drag_anatomy',
    nodeId: NODE_C9_PHY_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each Vernier calliper part to its correct functional location on the inspection schematic.',
    dragItems: [
      { label: 'Inside Jaws (Internal Dia)', targetId: 'top_jaws' },
      { label: 'Outside Jaws (External Dia)', targetId: 'bottom_jaws' },
      { label: 'Main Scale (Fixed mm)', targetId: 'main_beam' },
      { label: 'Vernier Scale (10 divs)', targetId: 'sliding_vernier' },
    ],
    correctMapping: {
      top_jaws: 'Inside Jaws (Internal Dia)',
      bottom_jaws: 'Outside Jaws (External Dia)',
      main_beam: 'Main Scale (Fixed mm)',
      sliding_vernier: 'Vernier Scale (10 divs)',
    },
    explanation: 'Top jaws measure internal diameters of cylinders, bottom jaws clamp external dimensions, the main scale provides whole mm readings, and the sliding vernier resolves 0.1 mm increments.',
    hints: [
      'The upper small jaws point outwards to measure internal diameters of pipes and beakers.',
      'The lower large heavy jaws clamp around solid spheres or cylinders.',
      'The fixed beam has the main scale; the movable sleeve carries the Vernier markings.',
    ],
  },
  // 4. Foundation - Recall (c9_phy_006)
  {
    id: 'ch_04_scalar_vector_sort',
    nodeId: NODE_C9_PHY_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Select the group that consists EXCLUSIVELY of vector quantities.',
    options: [
      'Distance, Speed, Mass, Time',
      'Displacement, Velocity, Acceleration, Weight',
      'Speed, Velocity, Force, Temperature',
      'Displacement, Speed, Mass, Force',
    ],
    correctIndex: 1,
    explanation: 'Displacement, Velocity, Acceleration, and Weight (gravitational force towards earth center) are vectors because they require both magnitude and direction.',
    hints: [
      'Recall: Speed, mass, distance, and temperature only have magnitude (scalars).',
      'Weight is the force of gravity, which always acts downwards -- it is a vector!',
      'Displacement, velocity, acceleration, and weight all require a direction to be fully defined.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Understanding (c9_phy_005)
  {
    id: 'ch_05_pendulum_factors',
    nodeId: NODE_C9_PHY_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A student doubles the mass of the bob from 25 g to 50 g while keeping the length of the string strictly at 1.0 m. How does the time period T change?',
    options: [
      'Time period doubles (T becomes 2T)',
      'Time period is halved (T becomes T/2)',
      'Time period remains unchanged',
      'Time period increases by √2 times',
    ],
    correctIndex: 2,
    explanation: 'The time period of a simple pendulum T = 2π√(l/g) is independent of the mass of the bob and the amplitude (for small swings < 10°).',
    hints: [
      'Check the formula T = 2π√(l/g). Is there any mass term "m" in the equation?',
      'Galileo discovered that all bobs of the same length swing with the exact same period regardless of weight.',
      'Because mass cancels out in the equation of motion, T remains completely unchanged.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Application (c9_phy_007)
  {
    id: 'ch_06_circular_lap_displacement',
    nodeId: NODE_C9_PHY_007,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An ISRO lunar rover completes 3 full circular laps around a crater of circumference 400 m and stops exactly at its launch point. What is the magnitude of its net displacement in metres?',
    correctAnswer: 0,
    tolerance: 0.1,
    unit: 'm',
    explanation: 'Displacement is the straight line from start to finish. Since the rover returned to its exact starting point, initial and final coordinates coincide, giving displacement = 0 m (while total distance = 1200 m).',
    hints: [
      'Differentiate between total path distance and net straight-line displacement.',
      'Where did the rover end up relative to where it started?',
      'When initial position equals final position, displacement is exactly 0 m.',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - Drag-sort (c9_phy_003)
  {
    id: 'ch_07_vernier_measuring_steps',
    nodeId: NODE_C9_PHY_003,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of steps to measure the diameter of a cylinder using Vernier Callipers with zero error correction.',
    sortItems: [
      'Find least count LC = 1 MSD / Total Vernier Divisions',
      'Close jaws and record Zero Error (with sign ±)',
      'Place cylinder between jaws and read Main Scale Reading (MSR)',
      'Find coinciding Vernier Division (VSR) and compute Observed Reading = MSR + (VSR × LC)',
      'Compute Corrected Reading = Observed Reading - (Zero Error)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Instrument calibration requires determining LC first, noting zero error before insertion, taking raw measurements, and finally subtracting zero error with its algebraic sign.',
    hints: [
      'You must always know the least count and zero error before clamping the test specimen.',
      'Read MSR and VSR together to form the observed reading.',
      'The final step is always applying the universal correction: Corrected = Observed - (Zero Error).',
    ],
  },
  // 8. Standard - Application (c9_phy_003)
  {
    id: 'ch_08_vernier_reading_calc',
    nodeId: NODE_C9_PHY_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Vernier calliper (LC = 0.01 cm), the main scale reads 4.2 cm and the 7th vernier mark coincides with a main scale line. If the instrument has a positive zero error of +0.03 cm, find the corrected diameter in cm.',
    correctAnswer: 4.24,
    tolerance: 0.005,
    unit: 'cm',
    explanation: 'Observed Reading = MSR + (Coincidence × LC) = 4.2 cm + (7 × 0.01 cm) = 4.27 cm. Corrected Reading = Observed - Zero Error = 4.27 - (+0.03) = 4.24 cm.',
    hints: [
      'Step 1: Calculate raw reading = 4.2 + (7 × 0.01) = 4.27 cm.',
      'Step 2: Positive zero error means the instrument over-reads, so you must subtract it.',
      'Compute 4.27 - 0.03 = 4.24 cm.',
    ],
    misconceptionIndex: 5,
  },
  // 9. Standard - Application (c9_phy_004)
  {
    id: 'ch_09_screw_gauge_pitch_calc',
    nodeId: NODE_C9_PHY_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A micrometer screw gauge has a pitch of 1 mm and 100 circular scale divisions. While measuring a satellite antenna wire, MSR is 2.5 mm and the 46th circular division aligns with the baseline. What is the measured diameter in mm (zero error = 0)?',
    correctAnswer: 2.96,
    tolerance: 0.005,
    unit: 'mm',
    explanation: 'Least Count = Pitch / Divisions = 1 mm / 100 = 0.01 mm. Reading = MSR + (CSR × LC) = 2.5 mm + (46 × 0.01 mm) = 2.5 + 0.46 = 2.96 mm.',
    hints: [
      'First calculate LC = 1 mm / 100 = 0.01 mm.',
      'Circular contribution = 46 × 0.01 mm = 0.46 mm.',
      'Total reading = 2.5 mm + 0.46 mm = 2.96 mm.',
    ],
  },
  // 10. Standard - Analysis (c9_phy_004)
  {
    id: 'ch_10_screw_gauge_negative_zero',
    nodeId: NODE_C9_PHY_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When the anvil and spindle of a screw gauge (LC = 0.01 mm) are brought into contact, the zero of the circular scale lies ABOVE the reference line, with the 96th division coinciding. What is the zero error and how is it corrected?',
    options: [
      'Zero error = +0.96 mm; Subtract 0.96 mm from observed reading',
      'Zero error = -0.04 mm; Add 0.04 mm to observed reading',
      'Zero error = +0.04 mm; Subtract 0.04 mm from observed reading',
      'Zero error = -0.96 mm; Add 0.96 mm to observed reading',
    ],
    correctIndex: 1,
    explanation: 'When circular zero is above the reference line, the error is negative: -(100 - 96) × 0.01 mm = -0.04 mm. Using Corrected = Observed - (-0.04 mm) = Observed + 0.04 mm.',
    hints: [
      'If zero has not yet reached the reference line (it is above), it is a negative zero error.',
      'The number of divisions missing from 100 is (100 - 96) = 4 divisions.',
      'Zero error is -(4 × 0.01) = -0.04 mm. Corrected = Observed - (-0.04) = Observed + 0.04 mm.',
    ],
    misconceptionIndex: 5,
  },
  // 11. Standard - Application (c9_phy_005)
  {
    id: 'ch_11_pendulum_seconds_length',
    nodeId: NODE_C9_PHY_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A "seconds pendulum" is defined as a pendulum with a time period T = 2.0 s (one tick per half-cycle). Taking g = 9.8 m/s² and π² ≈ 9.87, calculate its effective length l in metres.',
    correctAnswer: 0.99,
    tolerance: 0.03,
    unit: 'm',
    explanation: 'T² = 4π²l / g  =>  l = (g × T²) / (4π²) = (9.8 × 4) / (4 × 9.87) = 39.2 / 39.48 ≈ 0.993 m (approx 1 metre).',
    hints: [
      'Start with T = 2π√(l/g), square both sides to get T² = 4π²l / g.',
      'Substitute T = 2 s, so T² = 4.',
      'l = (9.8 × 4) / (4 × 9.87) ≈ 0.99 m.',
    ],
  },
  // 12. Standard - Analysis (c9_phy_008)
  {
    id: 'ch_12_speed_vs_velocity_trip',
    nodeId: NODE_C9_PHY_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A drone delivers a payload 600 m East in 30 s, then turns back and flies 200 m West in 10 s. Compare its average speed with the magnitude of its average velocity.',
    options: [
      'Avg Speed = 20 m/s; Avg Velocity = 10 m/s East (Speed is twice the velocity magnitude)',
      'Avg Speed = 10 m/s; Avg Velocity = 20 m/s East',
      'Avg Speed = 20 m/s; Avg Velocity = 20 m/s East',
      'Avg Speed = 15 m/s; Avg Velocity = 5 m/s East',
    ],
    correctIndex: 0,
    explanation: 'Total Distance = 600 + 200 = 800 m. Total Time = 30 + 10 = 40 s. Average Speed = 800 / 40 = 20 m/s. Net Displacement = 600 - 200 = 400 m East. Average Velocity = 400 / 40 = 10 m/s due East.',
    hints: [
      'Average Speed = Total Path Distance / Total Time taken.',
      'Average Velocity = Net Straight-Line Displacement / Total Time taken.',
      'Distance = 800 m (Speed = 20 m/s), Displacement = 400 m (Velocity = 10 m/s East).',
    ],
  },
  // 13. Standard - Application (c9_phy_009)
  {
    id: 'ch_13_retardation_braking',
    nodeId: NODE_C9_PHY_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Vande Bharat train travelling at 36 m/s applies brakes uniformly and comes to a complete halt at a signal in 12 seconds. Calculate the retardation of the train in m/s².',
    correctAnswer: 3,
    tolerance: 0.1,
    unit: 'm/s²',
    explanation: 'Acceleration a = (v - u) / t = (0 - 36) / 12 = -3 m/s². Retardation is the positive magnitude of negative acceleration, so Retardation = 3 m/s².',
    hints: [
      'Formula: a = (final velocity - initial velocity) / time = (0 - 36) / 12.',
      'Acceleration is -3 m/s².',
      'Retardation is stated as a positive value: 3 m/s².',
    ],
  },
  // 14. Standard - Analysis (c9_phy_010)
  {
    id: 'ch_14_vt_graph_displacement',
    nodeId: NODE_C9_PHY_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'On a velocity-time graph, a lunar lander accelerates from 10 m/s to 30 m/s over an 8-second interval. Calculate the total displacement covered during these 8 seconds from the area of the trapezium.',
    correctAnswer: 160,
    tolerance: 1,
    unit: 'm',
    explanation: 'Area under v-t graph = Trapezium Area = 1/2 × (Sum of parallel velocity sides) × (time base) = 1/2 × (10 + 30) × 8 = 1/2 × 40 × 8 = 160 m.',
    hints: [
      'Displacement = Area under velocity-time graph.',
      'Area of trapezium = 1/2 × (u + v) × t.',
      'Compute 1/2 × (10 + 30) × 8 = 20 × 8 = 160 m.',
    ],
  },
  // 15. Advanced - Evaluation (c9_phy_001 & c9_phy_002)
  {
    id: 'ch_15_instrument_selection_eval',
    nodeId: NODE_C9_PHY_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An engineer needs to measure the internal bore of an engine cylinder (~50.4 mm) and the thickness of a gold plating sheet (~0.04 mm). Which instrument pair is scientifically optimal?',
    options: [
      'Engine bore: Metre Rule (LC 1 mm); Gold sheet: Vernier Calliper (LC 0.1 mm)',
      'Engine bore: Vernier Calliper (LC 0.1 mm); Gold sheet: Micrometer Screw Gauge (LC 0.01 mm)',
      'Engine bore: Micrometer Screw Gauge (LC 0.01 mm); Gold sheet: Metre Rule (LC 1 mm)',
      'Engine bore: Simple Pendulum; Gold sheet: Vernier Calliper',
    ],
    correctIndex: 1,
    explanation: 'Vernier callipers have inside jaws designed for internal bores (~0.1 mm precision), while a screw gauge (LC 0.01 mm) is required to resolve thin sheets (~0.04 mm, which would only be a fraction of 1 division on a ruler or Vernier).',
    hints: [
      'Consider the least count needed: a 0.04 mm sheet cannot be measured with an instrument of LC 0.1 mm or 1 mm.',
      'Which instrument possesses special inside jaws specifically engineered for hollow bores?',
      'Vernier inside jaws for the bore, and screw gauge for the thin plating.',
    ],
  },
  // 16. Advanced - Analysis (c9_phy_005)
  {
    id: 'ch_16_pendulum_graph_slope',
    nodeId: NODE_C9_PHY_005,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In a school lab, a student plots length l (in metres, y-axis) against T² (in s², x-axis) for a pendulum. If the slope of the best-fit straight line is 0.248 m/s², calculate the experimental value of g in m/s² (Take π = 3.1416).',
    correctAnswer: 9.79,
    tolerance: 0.1,
    unit: 'm/s²',
    explanation: 'From l = (g / 4π²) T², the slope of l vs T² is S = g / 4π². Therefore, g = 4π² × S = 4 × (3.1416)² × 0.248 = 4 × 9.8696 × 0.248 = 9.79 m/s².',
    hints: [
      'Recall: l = (g / 4π²) × T², which is the equation of a straight line y = m x.',
      'Slope m = g / 4π².',
      'g = 4 × π² × slope = 4 × 9.87 × 0.248 ≈ 9.79 m/s².',
    ],
  },
  // 17. Advanced - Construct (c9_phy_001)
  {
    id: 'ch_17_force_derived_unit_construct',
    nodeId: NODE_C9_PHY_001,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the derived SI base unit breakdown for the Newton (Unit of Force, F = m × a) by selecting the base units in order.',
    availableParts: ['kg', 'm', 's^-1', 's^-2', 'm^2', 'K'],
    targetState: 'kg m s^-2',
    validationHint: 'Force = Mass (kg) × Acceleration (m/s²)',
    explanation: 'Force = mass × acceleration. The base unit of mass is kg, and acceleration is m s^-2. Thus, 1 N = 1 kg m s^-2.',
    hints: [
      'Look at Newton\'s second law: Force = mass × acceleration.',
      'Mass is measured in kg, and acceleration is measured in metres per second squared (m s^-2).',
      'Assemble: kg + m + s^-2.',
    ],
  },
  // 18. Advanced - Analysis (c9_phy_010)
  {
    id: 'ch_18_graph_gradient_meaning',
    nodeId: NODE_C9_PHY_010,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the graphical property with its physical interpretation: (1) Slope of Distance-Time, (2) Slope of Velocity-Time, (3) Area under Velocity-Time.',
    options: [
      '1: Acceleration, 2: Speed, 3: Force',
      '1: Speed, 2: Acceleration, 3: Displacement',
      '1: Displacement, 2: Retardation, 3: Velocity',
      '1: Speed, 2: Displacement, 3: Acceleration',
    ],
    correctIndex: 1,
    explanation: 'Slope of d-t is speed (Δd/Δt), slope of v-t is acceleration (Δv/Δt), and area under v-t is displacement (v × t).',
    hints: [
      'What do you get when you divide distance by time? (Speed)',
      'What do you get when you divide velocity by time? (Acceleration)',
      'What do you get when you multiply velocity by time? (Displacement)',
    ],
  },
  // 19. Advanced - Application (c9_phy_007 & c9_phy_008)
  {
    id: 'ch_19_circular_speed_velocity',
    nodeId: NODE_C9_PHY_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A satellite orbits Earth in a circular orbit at a constant speed of 7.5 km/s. Is its velocity constant, and is it accelerating?',
    options: [
      'Velocity is constant; Acceleration is zero',
      'Velocity is continuously changing; Acceleration is non-zero (Centripetal)',
      'Velocity is constant; Acceleration is non-zero',
      'Neither speed nor velocity is well-defined in space',
    ],
    correctIndex: 1,
    explanation: 'Even though the scalar speed is uniform (7.5 km/s), the direction of motion changes continuously at every point of the circle. Hence velocity is non-uniform, meaning the satellite is accelerating towards the center.',
    hints: [
      'Remember: Velocity is a vector (speed + direction). Does a circular path have constant direction?',
      'Since the direction is changing at every instant, velocity is NOT constant.',
      'A change in velocity over time means acceleration is definitely present.',
    ],
    misconceptionIndex: 2,
  },
  // 20. Advanced - Application (c9_phy_009)
  {
    id: 'ch_20_multistage_motion_calc',
    nodeId: NODE_C9_PHY_009,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A rocket model launches from rest with uniform acceleration of 4 m/s² for 5 s, then coasts at constant velocity for 10 s. What is the total distance covered in metres?',
    correctAnswer: 250,
    tolerance: 2,
    unit: 'm',
    explanation: 'Stage 1: v = u + at = 0 + 4(5) = 20 m/s. Distance s1 = 1/2 a t² = 1/2 (4)(25) = 50 m. Stage 2: s2 = v × t = 20 × 10 = 200 m. Total distance = 50 + 200 = 250 m.',
    hints: [
      'Calculate the velocity reached at t = 5 s: v = 0 + 4 × 5 = 20 m/s.',
      'Distance in first 5 s is s1 = 1/2 × 4 × 5² = 50 m.',
      'Distance during 10 s coasting is s2 = 20 × 10 = 200 m. Total = 250 m.',
    ],
  },
  // 21. Advanced - Evaluation (c9_phy_005)
  {
    id: 'ch_21_pendulum_reaction_time_eval',
    nodeId: NODE_C9_PHY_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does an ICSE lab manual mandate timing 20 complete oscillations instead of just 1 oscillation when measuring pendulum period T?',
    options: [
      'The string stretches and reaches true equilibrium only after 20 swings',
      'Human stopwatch reaction time (~0.2 s) is divided across 20 cycles, reducing fractional timing error by a factor of 20',
      'The value of acceleration due to gravity g increases after 20 oscillations',
      'Air resistance cancels out only after 20 oscillations',
    ],
    correctIndex: 1,
    explanation: 'A human reaction error of ~0.2 s on a single 2-second oscillation creates a massive 10% error in T (and 20% in g). Timing 20 oscillations spreads the 0.2 s error over 40 s, reducing it to ~0.01 s per cycle.',
    hints: [
      'Think about the experimenter\'s finger pressing the stopwatch button: human reaction time is about 0.1 to 0.2 seconds.',
      'How does 0.2 s compare to a 2.0 s single swing vs a 40 s series of swings?',
      'Averaging over 20 oscillations spreads human reaction error over a much longer duration.',
    ],
  },
  // 22. Advanced - Analysis (c9_phy_010)
  {
    id: 'ch_22_dt_graph_interpretation',
    nodeId: NODE_C9_PHY_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Examine two graphs: Graph A is a horizontal line on a Distance-Time plot; Graph B is a horizontal line on a Velocity-Time plot (at v = 15 m/s). What states of motion do they represent?',
    options: [
      'Graph A: Uniform Motion; Graph B: Body at rest',
      'Graph A: Body at rest (speed = 0); Graph B: Uniform Motion (speed = 15 m/s, zero acceleration)',
      'Graph A: Uniform Acceleration; Graph B: Uniform Retardation',
      'Both graphs represent stationary bodies',
    ],
    correctIndex: 1,
    explanation: 'On a d-t graph, zero slope means distance is unchanging, so body is at rest. On a v-t graph, zero slope means velocity is constant (uniform motion at 15 m/s, acceleration = 0).',
    hints: [
      'Always check what is on the vertical axis: Distance or Velocity?',
      'Distance staying constant over time means no movement (rest).',
      'Velocity staying constant at 15 m/s means constant speed with zero acceleration.',
    ],
    misconceptionIndex: 6,
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
  nodeId: NODE_C9_PHY_001,
  title: 'ICSE Class 9 Physics: International System of Units, Instruments & Kinematics',
  definition:
    'A comprehensive exploration of SI/cgs/fps unit standards, least counts of precision instruments (Vernier callipers & screw gauge), simple pendulum dynamics, vector vs scalar quantities, and 1D kinematic graphs.',
  eli5:
    'Think of physics like an ultra-precise space mission. You need the right measuring tape (SI units), microscopes for tiny gaps (Vernier and Screw gauge), rhythmic clocks (pendulum), and clear roadmaps with direction arrows (vectors, speed, acceleration, and graphs).',
  misconceptions: [
    {
      misconception: 'Writing units incorrectly such as "Kg", "sec", or "°K".',
      correction: 'SI standards are rigid: kilogram is "kg", second is "s", and kelvin is "K" without degree signs.',
    },
    {
      misconception: 'Least count is just an abstract number without units.',
      correction: 'Least count is a physical measurement and must always carry the unit of the instrument (e.g., 0.1 mm or 0.01 s).',
    },
    {
      misconception: 'Speed and velocity are identical and both are scalars.',
      correction: 'Speed is a scalar (distance/time), but velocity is a vector (displacement/time with mandatory direction).',
    },
    {
      misconception: 'A heavier pendulum bob swings faster with a shorter time period.',
      correction: 'Time period T = 2π√(l/g) is completely independent of the mass of the bob and depends only on length and gravity.',
    },
    {
      misconception: 'Displacement is always equal to total distance.',
      correction: 'Displacement is strictly the shortest vector between start and finish. Returning to the start gives zero displacement despite non-zero distance.',
    },
    {
      misconception: 'Negative zero error is subtracted directly without sign handling.',
      correction: 'Corrected reading = Observed reading - (Zero Error). Subtracting a negative error adds its magnitude: Obs - (-e) = Obs + e.',
    },
    {
      misconception: 'A horizontal line on any motion graph always means the object is stationary.',
      correction: 'A horizontal line on a distance-time graph means rest, but on a velocity-time graph it means constant speed with zero acceleration.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the SI unit of thermodynamic temperature?', options: ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)', 'Joule (J)'], correctIndex: 2 },
    { question: 'What is the least count of a standard school Vernier calliper?', options: ['1 mm', '0.1 mm (0.01 cm)', '0.01 mm', '0.001 mm'], correctIndex: 1 },
    { question: 'What is the least count of a standard ICSE micrometer screw gauge (pitch 1 mm, 100 circular divisions)?', options: ['0.1 mm', '0.01 mm (0.001 cm)', '0.001 mm', '1 mm'], correctIndex: 1 },
    { question: 'If a pendulum length is quadrupled (×4), what happens to its time period T?', options: ['T is quadrupled (×4)', 'T is doubled (×2)', 'T is halved', 'T remains same'], correctIndex: 1 },
    { question: 'Which of the following is a scalar quantity?', options: ['Displacement', 'Acceleration', 'Work / Energy', 'Weight'], correctIndex: 2 },
    { question: 'What does the area under a velocity-time graph represent?', options: ['Acceleration', 'Displacement', 'Speed', 'Force'], correctIndex: 1 },
    { question: 'What does the slope of a distance-time graph represent?', options: ['Speed', 'Acceleration', 'Displacement', 'Work'], correctIndex: 0 },
    { question: 'If a car brakes from 20 m/s to 0 m/s in 4 s, what is its retardation?', options: ['-5 m/s²', '5 m/s²', '80 m/s²', '0 m/s²'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master all 10 core ICSE Class 9 physics units: units, measurement instruments, pendulum dynamics, vectors, and kinematic graphing.',
};

// ─── EXPLORATION STEPS (5 Interactive Virtual Labs) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Vernier Calliper Precision Simulator',
    instruction: 'Drag the slider to adjust object width and see the main scale and coinciding Vernier divisions lock in real time.',
    interactionType: 'slider-vernier',
    nodeId: NODE_C9_PHY_003,
  },
  {
    title: 'Lab 2: Micrometer Screw Gauge Simulator',
    instruction: 'Rotate the thimble circular scale to measure wire thickness down to 0.01 mm accuracy.',
    interactionType: 'slider-micrometer',
    nodeId: NODE_C9_PHY_004,
  },
  {
    title: 'Lab 3: Simple Pendulum Harmonic Oscillations',
    instruction: 'Change the string length and gravity to observe oscillation frequency and period T = 2π√(l/g).',
    interactionType: 'pendulum-interactive',
    nodeId: NODE_C9_PHY_005,
  },
  {
    title: 'Lab 4: 1D Vector Rover: Distance vs Displacement',
    instruction: 'Drive the lunar rover East (+) and West (-) to see how total distance accumulates while displacement vectors cancel.',
    interactionType: 'rover-vectors',
    nodeId: NODE_C9_PHY_007,
  },
  {
    title: 'Lab 5: Real-Time Kinematics & Graph Analyzer',
    instruction: 'Adjust vehicle acceleration and initial speed to generate synchronized d-t and v-t graph curves live.',
    interactionType: 'kinematics-grapher',
    nodeId: NODE_C9_PHY_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase the length of a simple pendulum from 0.25 m to 1.0 m (4 times longer), what will happen to its time period?',
    options: [
      'It will quadruple (become 4 times longer)',
      'It will double (become exactly 2 times longer, since √4 = 2)',
      'It will stay exactly the same',
      'It will decrease by half',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the pendulum length slider to 1.0 m and watch the live period timer confirm T ≈ 2.0 s!',
    nodeId: NODE_C9_PHY_005,
  },
  {
    question: 'Predict: If an object moves at a constant speed of 10 m/s for 5 seconds, what will the slope of its velocity-time graph be?',
    options: [
      'Slope = 10 m/s²',
      'Slope = 50 m/s²',
      'Slope = 0 m/s² (because velocity does not change, acceleration = 0)',
      'Slope = 2 m/s²',
    ],
    correctIndex: 2,
    verifyInstruction: 'Set acceleration to 0 on the motion grapher and observe the flat horizontal line on the v-t graph!',
    nodeId: NODE_C9_PHY_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the Vernier calliper simulator, what happens to the Vernier coincidence mark as you smoothly slide the jaw from 2.30 cm to 2.37 cm?',
    observableOptions: [
      'All Vernier lines stay aligned simultaneously',
      'Only one single Vernier division aligns perfectly at any given position (the 7th line for 2.37 cm)',
      'The main scale marks shrink in width',
      'No lines ever align',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_PHY_003,
  },
  {
    question: 'Observation: When the rover returns back to its origin (x = 0), what do you notice about Distance vs Displacement?',
    observableOptions: [
      'Both Distance and Displacement become zero',
      'Distance keeps growing with every step, but Displacement resets to exactly zero',
      'Displacement becomes negative while Distance becomes zero',
      'Neither quantity changes',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_PHY_007,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Telemetry & Calibration Report',
  description:
    'Calibrate your home kitchen and study measurements using scientific standards. Measure 3 everyday household items (e.g. coin thickness, cup diameter, phone dimensions) using a standard ruler and estimate what precision a Vernier or Screw gauge would yield.',
  steps: [
    'Find a 1 mm graduated ruler and measure the thickness of 10 stacked coins to calculate single-coin thickness (averaging method).',
    'Calculate the least count of your ruler (1 mm) and compare it with the 0.01 mm of a screw gauge.',
    'Build a DIY pendulum using a string and a metal key ring; measure 20 oscillations with your phone stopwatch and compute g.',
    'Sketch a distance-time graph of your walk from your front door to the kitchen and back.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
export function C9_PhysicsInternationalSystemUnitsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_PHY_001,
  title = DEFAULT_PROPS.title || 'Physics: System of Units & Motion',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚛️', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Interactive UI and feedback state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery & Predict-Then-Check State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge Sub-States (Drag-Label, Drag-Sort, Numeric, Construct)
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── SIMULATOR LAB INTERACTIVE CONTROLS ───
  // Lab 1: Vernier Calliper Controls (values in mm)
  const [vernierValueMm, setVernierValueMm] = useState<number>(23.4); // 2.34 cm
  const [vernierZeroError, setVernierZeroError] = useState<number>(0.0);

  // Lab 2: Screw Gauge Controls (values in mm)
  const [screwGaugeMm, setScrewGaugeMm] = useState<number>(3.46);
  const [screwZeroError, setScrewZeroError] = useState<number>(0.0);

  // Lab 3: Pendulum Controls
  const [pendulumLength, setPendulumLength] = useState<number>(1.0); // metres
  const [pendulumGravity, setPendulumGravity] = useState<number>(9.8); // m/s²
  const [pendulumAngle, setPendulumAngle] = useState<number>(10); // degrees
  const [pendulumIsPlaying, setPendulumIsPlaying] = useState<boolean>(true);
  const [pendulumTimeElapsed, setPendulumTimeElapsed] = useState<number>(0);

  // Lab 4: Rover Distance vs Displacement
  const [roverPosition, setRoverPosition] = useState<number>(0); // in metres along x-axis
  const [roverPathHistory, setRoverPathHistory] = useState<number[]>([0]);
  const [roverTotalDistance, setRoverTotalDistance] = useState<number>(0);

  // Lab 5: Kinematics Grapher
  const [kinInitialVelocity, setKinInitialVelocity] = useState<number>(5); // m/s
  const [kinAcceleration, setKinAcceleration] = useState<number>(2); // m/s²
  const [kinTimeSpan, setKinTimeSpan] = useState<number>(6); // seconds
  const [activeGraphTab, setActiveGraphTab] = useState<'dt' | 'vt'>('vt');

  // Sandbox active tool selection
  const [sandboxTool, setSandboxTool] = useState<'vernier' | 'screw' | 'pendulum' | 'rover' | 'kinematics'>('vernier');

  // References
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendulumAnimRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Motivational message helper
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE!';
    if (errCount <= 3) return 'Great work!';
    if (errCount <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  // ─── INITIAL LOAD FROM LOCAL STORAGE MASTERY ───
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

  // ─── PENDULUM ANIMATION LOOP (HTML5 Canvas + Real-time Physics) ───
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox') return;

    let lastTimestamp = performance.now();

    const updatePhysics = (now: number) => {
      const dt = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (pendulumIsPlaying) {
        setPendulumTimeElapsed((t) => t + dt);
      }
      pendulumAnimRef.current = requestAnimationFrame(updatePhysics);
    };

    pendulumAnimRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (pendulumAnimRef.current) cancelAnimationFrame(pendulumAnimRef.current);
    };
  }, [pendulumIsPlaying, phase]);

  // ─── 2D CANVAS DRAWING (Kinematics / Oscilloscope effect) ───
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

      // Draw active telemetry grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
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

      // Draw animated harmonic pulse
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.05) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextLevel = 1;
        if (challenge && challenge.hints && challenge.hints[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(nextLevel);
          audioManager.play('hint');
          speechManager.speak('Need a boost? Here is a hint to guide you.');
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

  // ─── ESCALATING HINTS HANDLER ───
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
      setShowExplanation(true);
      setShowHint(false);
      audioManager.play('chime');
      speechManager.speak('Let us study the complete solution breakdown.');
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Outstanding! You grasped displacement right away.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the ISRO Physics Lab. Manipulate the tools to explore physical laws.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all instruments without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time to put your mastery to the test. Let us begin the flight certification challenges.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(EXPLORATION_STEPS.length - 1, prev + 1));
    audioManager.play('tap');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
    audioManager.play('tap');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closely at the scale marks again.');
  }, []);

  // ─── DRAG & DROP HANDLERS (Drag-Label) ───
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

  // ─── SORT HANDLERS (Drag-Sort) ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const items = prev.length > 0 ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [challenge]);

  // ─── ROVER DRIVE HANDLER (1D Vector Movement) ───
  const handleRoverMove = useCallback((step: number) => {
    setRoverPosition((prev) => {
      const next = Math.max(-100, Math.min(100, prev + step));
      setRoverPathHistory((hist) => [...hist, next]);
      setRoverTotalDistance((dist) => dist + Math.abs(step));
      audioManager.play('count');
      return next;
    });
  }, []);

  const handleRoverReset = useCallback(() => {
    setRoverPosition(0);
    setRoverPathHistory([0]);
    setRoverTotalDistance(0);
    audioManager.play('pop');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Mission accomplished! You have officially certified in ICSE Physics Units and Kinematics.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  // ─── MAIN ANSWER SUBMISSION HANDLER ───
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        const submitted = Array.isArray(answer) && answer.length > 0 ? answer : (challenge.sortItems || []).map((_, i) => i);
        isCorrect = JSON.stringify(submitted) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Splendid! That is mathematically and physically exact.');
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
          speechManager.speak('Let us inspect the complete physics breakdown.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // Derived calculations for Vernier Calliper
  const vernierMSR_mm = Math.floor(vernierValueMm);
  const vernierCoincidence = Math.round((vernierValueMm - vernierMSR_mm) * 10);
  const vernierCalculatedMm = vernierMSR_mm + vernierCoincidence * 0.1;

  // Derived calculations for Screw Gauge
  const screwMSR_mm = Math.floor(screwGaugeMm * 2) / 2; // In 0.5 mm steps
  const screwCircularDiv = Math.round(((screwGaugeMm - screwMSR_mm) / 0.01) % 100);

  // Derived calculations for Pendulum
  const pendulumPeriodCalculated = useMemo(() => {
    return 2 * Math.PI * Math.sqrt(pendulumLength / pendulumGravity);
  }, [pendulumLength, pendulumGravity]);

  const pendulumFrequency = useMemo(() => {
    return pendulumPeriodCalculated > 0 ? 1 / pendulumPeriodCalculated : 0;
  }, [pendulumPeriodCalculated]);

  const currentPendulumTheta = useMemo(() => {
    if (!pendulumIsPlaying) return (pendulumAngle * Math.PI) / 180;
    const omega = Math.sqrt(pendulumGravity / pendulumLength);
    return ((pendulumAngle * Math.PI) / 180) * Math.cos(omega * pendulumTimeElapsed);
  }, [pendulumAngle, pendulumGravity, pendulumLength, pendulumTimeElapsed, pendulumIsPlaying]);

  // Derived calculations for Kinematics Grapher
  const kinFinalVelocity = kinInitialVelocity + kinAcceleration * kinTimeSpan;
  const kinDisplacement = kinInitialVelocity * kinTimeSpan + 0.5 * kinAcceleration * Math.pow(kinTimeSpan, 2);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner"
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400">ICSE Class 9 Physics Core</span>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-cyan-950/60 text-cyan-400 border-cyan-700'
            }`}
          >
            Tier: {difficulty}
          </motion.div>

          <div className="px-3 py-1.5 bg-slate-900 rounded-full border border-slate-800 text-xs font-medium text-slate-300">
            Score: <span className="font-bold text-amber-400">{Math.max(0, 100 - errors * 5)}%</span>
          </div>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-8 space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/40 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
              <span>🚀 Telemetry Mission Brief</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-indigo-900/30 rounded-xl border border-indigo-700/30 text-xs text-indigo-200">
              💡 <strong>Objective:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-xs font-bold uppercase">Discovery Hook</span>
              <span className="text-xs text-slate-400">Curiosity check — No penalty</span>
            </div>
            <h3 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    discoveryCorrect
                      ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-700 text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '🎉 Superb intuition! You recognized that 30 m East + 40 m West leaves a net straight vector of 10 m West.'
                    : DISCOVERY_QUESTION.hintAfter}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <span>Enter Virtual Science Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION (5 Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          {/* Lab Progress Navigation Bar */}
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400">LAB {currentSlide + 1} OF 5</span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                {EXPLORATION_STEPS[currentSlide].title}
              </span>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Jump to lab ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-sm text-cyan-300 mt-1 flex items-center gap-1.5">
                  <span>👉</span>
                  <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
                </p>
              </div>

              {/* ── LAB 1: VERNIER CALLIPER SIMULATOR ── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs font-mono text-slate-400">
                        Object Jaw Opening: <span className="text-amber-400 font-bold text-sm">{(vernierValueMm / 10).toFixed(2)} cm</span> ({vernierValueMm.toFixed(1)} mm)
                      </div>
                      <div className="text-xs font-mono text-cyan-400">
                        Formula: TR = MSR ({vernierMSR_mm} mm) + [VSR ({vernierCoincidence}) × LC (0.1 mm)]
                      </div>
                    </div>

                    <label className="block text-xs font-medium text-slate-400">
                      Drag to slide Vernier Movable Jaw:
                      <input
                        type="range"
                        min={0}
                        max={60}
                        step={0.1}
                        value={vernierValueMm}
                        onChange={(e) => {
                          setVernierValueMm(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Vernier caliper slider"
                      />
                    </label>

                    {/* SVG Vernier Interactive Graphic */}
                    <svg viewBox="0 0 700 240" className="w-full bg-slate-900/90 rounded-xl border border-slate-800 p-2 select-none">
                      {/* Fixed Main Beam */}
                      <rect x="50" y="40" width="600" height="70" fill="#1e293b" stroke="#475569" strokeWidth="2" rx="4" />
                      {/* Fixed Left Jaw (Outside & Inside) */}
                      <path d="M 50 20 L 70 20 L 70 40 L 70 180 L 50 180 Z" fill="#334155" stroke="#64748b" strokeWidth="2" />
                      <text x="60" y="200" textAnchor="middle" fill="#94a3b8" fontSize="10">Fixed Jaw</text>

                      {/* Main Scale Ticks (mm) */}
                      {Array.from({ length: 61 }).map((_, i) => {
                        const x = 70 + i * 9;
                        const isCm = i % 10 === 0;
                        const isHalfCm = i % 5 === 0 && !isCm;
                        return (
                          <g key={i}>
                            <line
                              x1={x}
                              y1={40}
                              x2={x}
                              y2={isCm ? 65 : isHalfCm ? 56 : 49}
                              stroke={isCm ? '#38bdf8' : '#64748b'}
                              strokeWidth={isCm ? 2 : 1}
                            />
                            {isCm && (
                              <text x={x} y={78} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                                {i / 10}
                              </text>
                            )}
                          </g>
                        );
                      })}
                      <text x="630" y="78" fill="#38bdf8" fontSize="10" fontWeight="bold">cm</text>

                      {/* Movable Vernier Slider Jaw */}
                      {(() => {
                        const sliderX = 70 + vernierValueMm * 9;
                        return (
                          <g transform={`translate(${sliderX}, 0)`}>
                            {/* Movable Jaw Body */}
                            <path d="M 0 40 L 110 40 L 110 110 L 25 110 L 25 180 L 0 180 Z" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                            {/* Upper Inside Jaw */}
                            <path d="M 0 40 L 25 40 L 25 20 L 0 20 Z" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />

                            {/* Vernier Scale Ticks (10 divs = 9 MSD = 81 px => 8.1 px per div) */}
                            {Array.from({ length: 11 }).map((_, vi) => {
                              const vx = vi * 8.1;
                              const isAligned = vi === vernierCoincidence;
                              return (
                                <g key={vi}>
                                  <line
                                    x1={vx}
                                    y1={40}
                                    x2={vx}
                                    y2={isAligned ? 62 : 52}
                                    stroke={isAligned ? '#22c55e' : '#f59e0b'}
                                    strokeWidth={isAligned ? 2.5 : 1.2}
                                  />
                                  {isAligned && (
                                    <circle cx={vx} cy={66} r="3" fill="#22c55e" />
                                  )}
                                  {vi % 5 === 0 && (
                                    <text x={vx} y={34} textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace">
                                      {vi}
                                    </text>
                                  )}
                                </g>
                              );
                            })}

                            <text x="50" y="100" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="bold">
                              Vernier (LC=0.1mm)
                            </text>
                          </g>
                        );
                      })()}

                      {/* Measured Sample Object */}
                      <rect
                        x="70"
                        y="120"
                        width={Math.max(1, vernierValueMm * 9)}
                        height="45"
                        fill="url(#specimenPattern)"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        rx="2"
                      />
                      <defs>
                        <pattern id="specimenPattern" width="6" height="6" patternUnits="userSpaceOnUse">
                          <path d="M 0 6 L 6 0 M 0 0 L 6 6" stroke="#fbbf24" strokeWidth="0.8" opacity="0.4" />
                        </pattern>
                      </defs>
                    </svg>

                    {/* Real-time Readings Matrix */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block">1 MSD</span>
                        <span className="text-sm font-bold text-white">1.0 mm (0.1 cm)</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block">Vernier Divs</span>
                        <span className="text-sm font-bold text-white">10 Divisions</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block">Coinciding Mark</span>
                        <span className="text-sm font-bold text-emerald-400">{vernierCoincidence}th Division</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-indigo-700/50 bg-indigo-950/30">
                        <span className="text-xs text-indigo-300 block">Total Reading</span>
                        <span className="text-sm font-black text-amber-300">{vernierCalculatedMm.toFixed(2)} mm</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: MICROMETER SCREW GAUGE SIMULATOR ── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs font-mono text-slate-400">
                        Spindle Linear Advance: <span className="text-amber-400 font-bold text-sm">{screwGaugeMm.toFixed(2)} mm</span>
                      </div>
                      <div className="text-xs font-mono text-cyan-400">
                        Pitch = 1.0 mm | Divs = 100 | LC = 0.01 mm
                      </div>
                    </div>

                    <label className="block text-xs font-medium text-slate-400">
                      Rotate Micrometer Thimble:
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.01}
                        value={screwGaugeMm}
                        onChange={(e) => {
                          setScrewGaugeMm(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Screw gauge slider"
                      />
                    </label>

                    {/* SVG Micrometer Graphic */}
                    <svg viewBox="0 0 700 220" className="w-full bg-slate-900/90 rounded-xl border border-slate-800 p-2 select-none">
                      {/* Heavy U-Frame */}
                      <path
                        d="M 120 40 L 80 40 A 70 70 0 0 0 80 180 L 220 180 A 60 60 0 0 0 280 120 L 280 90 L 120 90 Z"
                        fill="#1e293b"
                        stroke="#475569"
                        strokeWidth="3"
                      />
                      {/* Fixed Anvil */}
                      <rect x="120" y="65" width="20" height="25" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
                      <text x="130" y="110" textAnchor="middle" fill="#64748b" fontSize="9">Anvil</text>

                      {/* Movable Spindle */}
                      {(() => {
                        const spindleGap = Math.max(2, screwGaugeMm * 14);
                        return (
                          <g>
                            <rect x={140 + spindleGap} y="65" width={140 - spindleGap} height="25" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
                            {/* Clamped Specimen Wire */}
                            <rect x="140" y="66" width={spindleGap} height="23" fill="#f59e0b" rx="2" />
                            <text x={140 + spindleGap / 2} y="110" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">
                              Wire
                            </text>
                          </g>
                        );
                      })()}

                      {/* Main Sleeve (Fixed Barrel) */}
                      <rect x="280" y="60" width="160" height="35" fill="#334155" stroke="#64748b" strokeWidth="2" />
                      <line x1="280" y1="77.5" x2="440" y2="77.5" stroke="#38bdf8" strokeWidth="1.5" />

                      {/* Sleeve Graduations (0 to 10 mm in 0.5 mm ticks) */}
                      {Array.from({ length: 21 }).map((_, i) => {
                        const sx = 290 + i * 7;
                        const isWhole = i % 2 === 0;
                        return (
                          <g key={i}>
                            <line
                              x1={sx}
                              y1={77.5}
                              x2={sx}
                              y2={isWhole ? 66 : 89}
                              stroke="#cbd5e1"
                              strokeWidth={isWhole ? 1.5 : 1}
                            />
                            {isWhole && (
                              <text x={sx} y={62} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                                {i / 2}
                              </text>
                            )}
                          </g>
                        );
                      })}

                      {/* Rotating Thimble & Ratchet */}
                      {(() => {
                        const thimbleX = 290 + screwGaugeMm * 14;
                        return (
                          <g transform={`translate(${thimbleX}, 0)`}>
                            {/* Bevelled Thimble Head */}
                            <path d="M 0 50 L 30 55 L 110 55 L 110 100 L 30 100 L 0 105 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                            {/* Circular Scale Tick Marks */}
                            {Array.from({ length: 11 }).map((_, ci) => {
                              const cy = 57 + ci * 4.2;
                              const divLabel = (screwCircularDiv - 5 + ci + 100) % 100;
                              const isCenter = ci === 5;
                              return (
                                <g key={ci}>
                                  <line
                                    x1={5}
                                    y1={cy}
                                    x2={isCenter ? 25 : 15}
                                    stroke={isCenter ? '#22c55e' : '#fbbf24'}
                                    strokeWidth={isCenter ? 2 : 1}
                                  />
                                  {ci % 2 === 0 && (
                                    <text x={28} y={cy + 3} fill={isCenter ? '#22c55e' : '#94a3b8'} fontSize="7" fontFamily="monospace">
                                      {divLabel}
                                    </text>
                                  )}
                                </g>
                              );
                            })}
                            {/* Ratchet Cap */}
                            <rect x="110" y="65" width="30" height="25" fill="#475569" stroke="#64748b" strokeWidth="1" rx="2" />
                            <text x="125" y="81" textAnchor="middle" fill="#cbd5e1" fontSize="7">Ratchet</text>
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Sleeve MSR</span>
                        <span className="text-sm font-bold text-white">{screwMSR_mm.toFixed(1)} mm</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Circular CSR</span>
                        <span className="text-sm font-bold text-emerald-400">{screwCircularDiv} Divs</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Least Count</span>
                        <span className="text-sm font-bold text-cyan-300">0.01 mm (0.001 cm)</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-cyan-800/50 bg-cyan-950/30">
                        <span className="text-cyan-300 block">Total Diameter</span>
                        <span className="text-sm font-black text-amber-300">
                          {(screwMSR_mm + screwCircularDiv * 0.01).toFixed(2)} mm
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: SIMPLE PENDULUM OSCILLATIONS ── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* PREDICT-THEN-CHECK HOOK */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/60 rounded-2xl border border-indigo-800 space-y-3">
                      <span className="px-2 py-0.5 bg-indigo-500/30 text-indigo-300 text-xs font-bold rounded">
                        Predict-Then-Check
                      </span>
                      <h4 className="text-sm font-bold text-white">{PREDICTION_QUESTIONS[0].question}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left text-xs rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    {/* SVG Pendulum Animation */}
                    <div className="flex flex-col items-center justify-center bg-slate-900 rounded-2xl border border-slate-800 p-4 relative min-h-[260px]">
                      <svg viewBox="0 0 300 240" className="w-full h-full max-h-[240px] select-none">
                        {/* Rigid Support Clamp */}
                        <rect x="110" y="10" width="80" height="12" fill="#475569" stroke="#64748b" strokeWidth="2" rx="3" />
                        <circle cx="150" cy="16" r="4" fill="#38bdf8" />

                        {/* Mean Reference Line */}
                        <line x1="150" y1="16" x2="150" y2="210" stroke="#475569" strokeDasharray="3,3" strokeWidth="1" />

                        {/* Swinging String & Bob */}
                        {(() => {
                          const pxLen = 40 + pendulumLength * 130;
                          const bobX = 150 + pxLen * Math.sin(currentPendulumTheta);
                          const bobY = 16 + pxLen * Math.cos(currentPendulumTheta);
                          return (
                            <g>
                              <line x1="150" y1="16" x2={bobX} y2={bobY} stroke="#f8fafc" strokeWidth="1.5" />
                              <circle cx={bobX} cy={bobY} r="14" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                              <circle cx={bobX - 4} cy={bobY - 4} r="3" fill="#fef3c7" opacity="0.6" />
                            </g>
                          );
                        })()}
                      </svg>

                      <div className="flex items-center gap-3 mt-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPendulumIsPlaying(!pendulumIsPlaying)}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
                        >
                          {pendulumIsPlaying ? '⏸ Pause Swing' : '▶ Release Swing'}
                        </motion.button>
                        <span className="text-xs font-mono text-slate-400">
                          Elapsed: <strong className="text-white">{pendulumTimeElapsed.toFixed(1)}s</strong>
                        </span>
                      </div>
                    </div>

                    {/* Pendulum Interactive Sliders */}
                    <div className="space-y-4 justify-center flex flex-col text-xs">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Length (l): <strong>{pendulumLength.toFixed(2)} m</strong></span>
                          <span className="text-indigo-400">Range: 0.2m - 2.0m</span>
                        </div>
                        <input
                          type="range"
                          min={0.2}
                          max={2.0}
                          step={0.05}
                          value={pendulumLength}
                          onChange={(e) => {
                            setPendulumLength(parseFloat(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg"
                          aria-label="Pendulum length slider"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Gravity (g): <strong>{pendulumGravity.toFixed(1)} m/s²</strong></span>
                          <span className="text-cyan-400">Earth (9.8) / Moon (1.6)</span>
                        </div>
                        <input
                          type="range"
                          min={1.6}
                          max={15.0}
                          step={0.1}
                          value={pendulumGravity}
                          onChange={(e) => {
                            setPendulumGravity(parseFloat(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg"
                          aria-label="Pendulum gravity slider"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 font-mono">
                        <div className="text-slate-400">Formula: T = 2π√(l / g)</div>
                        <div className="text-white text-sm">
                          Time Period T: <strong className="text-amber-400">{pendulumPeriodCalculated.toFixed(2)} s</strong>
                        </div>
                        <div className="text-white text-sm">
                          Frequency f: <strong className="text-emerald-400">{pendulumFrequency.toFixed(2)} Hz</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: 1D VECTOR ROVER (Distance vs Displacement) ── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="text-slate-400">
                        Total Path Length (Distance): <strong className="text-emerald-400 text-sm">{roverTotalDistance} m</strong> (Scalar)
                      </div>
                      <div className="text-slate-400">
                        Net Change (Displacement):{' '}
                        <strong className={`text-sm ${roverPosition >= 0 ? 'text-indigo-400' : 'text-rose-400'}`}>
                          {Math.abs(roverPosition)} m {roverPosition > 0 ? 'East (+)' : roverPosition < 0 ? 'West (-)' : 'Origin'}
                        </strong>{' '}
                        (Vector)
                      </div>
                    </div>

                    {/* 1D Number Line Road */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 relative overflow-hidden min-h-[160px] flex flex-col justify-center">
                      <svg viewBox="0 0 600 120" className="w-full select-none">
                        {/* Number Line Axis */}
                        <line x1="30" y1="60" x2="570" y2="60" stroke="#64748b" strokeWidth="2" />

                        {/* Major Ticks */}
                        {[-60, -40, -20, 0, 20, 40, 60].map((val) => {
                          const x = 300 + (val / 60) * 240;
                          const isOrigin = val === 0;
                          return (
                            <g key={val}>
                              <line x1={x} y1={50} x2={x} y2={70} stroke={isOrigin ? '#38bdf8' : '#64748b'} strokeWidth={isOrigin ? 3 : 1.5} />
                              <text x={x} y={85} textAnchor="middle" fill={isOrigin ? '#38bdf8' : '#94a3b8'} fontSize="9" fontFamily="monospace">
                                {val}m
                              </text>
                            </g>
                          );
                        })}

                        {/* Displacement Vector Arrow from origin to rover */}
                        {roverPosition !== 0 && (
                          <line
                            x1="300"
                            y1="40"
                            x2={300 + (roverPosition / 60) * 240}
                            y2="40"
                            stroke="#818cf8"
                            strokeWidth="3"
                            markerEnd="url(#arrowhead)"
                          />
                        )}
                        <defs>
                          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <polygon points="0 0, 6 3, 0 6" fill="#818cf8" />
                          </marker>
                        </defs>

                        {/* Rover Icon */}
                        {(() => {
                          const rx = 300 + (roverPosition / 60) * 240;
                          return (
                            <g transform={`translate(${rx}, 42)`}>
                              <rect x="-14" y="-12" width="28" height="18" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" rx="3" />
                              <circle cx="-8" cy="8" r="4" fill="#334155" />
                              <circle cx="8" cy="8" r="4" fill="#334155" />
                              <text x="0" y="0" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="black">ISRO</text>
                            </g>
                          );
                        })()}
                      </svg>
                    </div>

                    {/* Rover Steering Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRoverMove(-20)}
                          className="px-4 py-2 bg-rose-600/80 hover:bg-rose-500 text-white rounded-xl text-xs font-bold"
                        >
                          ← Reverse West (-20m)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRoverMove(-10)}
                          className="px-3 py-2 bg-rose-700/60 hover:bg-rose-600 text-white rounded-xl text-xs font-bold"
                        >
                          -10m
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRoverReset}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
                      >
                        Reset to Origin
                      </motion.button>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRoverMove(10)}
                          className="px-3 py-2 bg-emerald-700/60 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold"
                        >
                          +10m
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRoverMove(20)}
                          className="px-4 py-2 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                        >
                          Forward East (+20m) →
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: REAL-TIME KINEMATICS & GRAPH ANALYZER ── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveGraphTab('vt')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            activeGraphTab === 'vt' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Velocity-Time (v-t)
                        </button>
                        <button
                          onClick={() => setActiveGraphTab('dt')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            activeGraphTab === 'dt' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Distance-Time (d-t)
                        </button>
                      </div>

                      <div className="text-xs font-mono text-cyan-300">
                        {activeGraphTab === 'vt'
                          ? `Slope = a = ${kinAcceleration} m/s² | Area = s = ${kinDisplacement.toFixed(1)} m`
                          : `Curvature indicates acceleration`}
                      </div>
                    </div>

                    {/* Live SVG Graph Renderer */}
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-3">
                      <svg viewBox="0 0 500 200" className="w-full select-none">
                        {/* Grid lines */}
                        {Array.from({ length: 6 }).map((_, i) => (
                          <line key={i} x1="40" y1={20 + i * 30} x2="480" y2={20 + i * 30} stroke="#334155" strokeWidth="1" />
                        ))}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <line key={i} x1={40 + i * 55} y1="20" x2={40 + i * 55} y2="170" stroke="#334155" strokeWidth="1" />
                        ))}

                        {/* Axes */}
                        <line x1="40" y1="170" x2="480" y2="170" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="40" y1="20" x2="40" y2="170" stroke="#94a3b8" strokeWidth="2" />
                        <text x="475" y="185" fill="#94a3b8" fontSize="9">Time (s)</text>
                        <text x="10" y="30" fill="#94a3b8" fontSize="9">
                          {activeGraphTab === 'vt' ? 'v (m/s)' : 's (m)'}
                        </text>

                        {/* Velocity-Time Plot */}
                        {activeGraphTab === 'vt' && (
                          <g>
                            {/* Area Under Curve (Trapezium) */}
                            {(() => {
                              const y0 = 170 - kinInitialVelocity * 4;
                              const y1 = 170 - kinFinalVelocity * 4;
                              const x1 = 40 + kinTimeSpan * 55;
                              return (
                                <polygon
                                  points={`40,170 40,${y0} ${x1},${y1} ${x1},170`}
                                  fill="rgba(99, 102, 241, 0.25)"
                                  stroke="#6366f1"
                                  strokeWidth="1.5"
                                />
                              );
                            })()}
                            {/* Line graph */}
                            <line
                              x1="40"
                              y1={170 - kinInitialVelocity * 4}
                              x2={40 + kinTimeSpan * 55}
                              y2={170 - kinFinalVelocity * 4}
                              stroke="#38bdf8"
                              strokeWidth="3"
                            />
                          </g>
                        )}

                        {/* Distance-Time Plot (Parabolic Curve) */}
                        {activeGraphTab === 'dt' && (
                          <path
                            d={Array.from({ length: 40 })
                              .map((_, idx) => {
                                const t = (idx / 40) * kinTimeSpan;
                                const s = kinInitialVelocity * t + 0.5 * kinAcceleration * t * t;
                                const x = 40 + t * 55;
                                const y = 170 - Math.min(150, s * 1.5);
                                return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                              })
                              .join(' ')}
                            fill="none"
                            stroke="#ec4899"
                            strokeWidth="3"
                          />
                        )}
                      </svg>
                    </div>

                    {/* Kinematic Sliders */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Initial Velocity (u): {kinInitialVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={25}
                          value={kinInitialVelocity}
                          onChange={(e) => setKinInitialVelocity(parseInt(e.target.value))}
                          className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg"
                          aria-label="Initial velocity slider"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Acceleration (a): {kinAcceleration} m/s²</span>
                        </div>
                        <input
                          type="range"
                          min={-5}
                          max={8}
                          value={kinAcceleration}
                          onChange={(e) => setKinAcceleration(parseInt(e.target.value))}
                          className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg"
                          aria-label="Acceleration slider"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Time Duration (t): {kinTimeSpan} s</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={8}
                          value={kinTimeSpan}
                          onChange={(e) => setKinTimeSpan(parseInt(e.target.value))}
                          className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg"
                          aria-label="Time duration slider"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Exploration Navigation Bar Footer */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleNextSlide}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
              >
                Unlock Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold uppercase">
                  Free Play Sandbox
                </span>
                <h2 className="text-xl font-bold text-white mt-1">Instrument Workshop & Verification</h2>
              </div>

              {/* Tool Switcher Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'vernier', name: 'Vernier' },
                  { id: 'screw', name: 'Screw Gauge' },
                  { id: 'pendulum', name: 'Pendulum' },
                  { id: 'rover', name: 'Vector Rover' },
                  { id: 'kinematics', name: 'Graphs' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSandboxTool(t.id as any);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      sandboxTool === t.id
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sandbox Instrument Render */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              {sandboxTool === 'vernier' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>MSR: {vernierMSR_mm} mm | VSR Coincidence: {vernierCoincidence}</span>
                    <span className="text-amber-400 font-bold">Total: {vernierCalculatedMm.toFixed(2)} mm</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={0.1}
                    value={vernierValueMm}
                    onChange={(e) => setVernierValueMm(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg"
                    aria-label="Sandbox vernier slider"
                  />
                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300">
                    Least count LC = 1 MSD / 10 = 0.1 mm. Move the slider and notice how only one Vernier line matches a main scale mark at any instant.
                  </div>
                </div>
              )}

              {sandboxTool === 'screw' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Pitch: 1 mm | Circular Div: {screwCircularDiv}</span>
                    <span className="text-cyan-400 font-bold">Reading: {(screwMSR_mm + screwCircularDiv * 0.01).toFixed(2)} mm</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.01}
                    value={screwGaugeMm}
                    onChange={(e) => setScrewGaugeMm(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg"
                    aria-label="Sandbox screw gauge slider"
                  />
                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300">
                    Least count LC = Pitch / 100 = 0.01 mm. Each circular division represents a linear travel of 10 micrometres!
                  </div>
                </div>
              )}

              {sandboxTool === 'pendulum' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Length: {pendulumLength.toFixed(2)} m | g: {pendulumGravity} m/s²</span>
                    <span className="text-amber-400 font-bold">Period T = {pendulumPeriodCalculated.toFixed(2)} s</span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={2.0}
                    step={0.05}
                    value={pendulumLength}
                    onChange={(e) => setPendulumLength(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg"
                    aria-label="Sandbox pendulum slider"
                  />
                </div>
              )}

              {sandboxTool === 'rover' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Distance (Total Path): <strong className="text-emerald-400">{roverTotalDistance} m</strong></span>
                    <span>Displacement (Vector): <strong className="text-indigo-400">{roverPosition} m</strong></span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleRoverMove(-10)} className="px-3 py-1.5 bg-rose-700 text-white rounded-lg text-xs">West (-10m)</button>
                    <button onClick={() => handleRoverMove(10)} className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs">East (+10m)</button>
                    <button onClick={handleRoverReset} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs">Reset</button>
                  </div>
                </div>
              )}

              {sandboxTool === 'kinematics' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>v = u + at = {kinFinalVelocity} m/s</span>
                    <span className="text-cyan-400 font-bold">Displacement s = {kinDisplacement.toFixed(1)} m</span>
                  </div>
                  <input
                    type="range"
                    min={-4}
                    max={6}
                    value={kinAcceleration}
                    onChange={(e) => setKinAcceleration(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg"
                    aria-label="Sandbox acceleration slider"
                  />
                </div>
              )}
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAdvanceToChallenge}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 text-sm flex items-center justify-center gap-2"
              >
                <span>Ready for Flight Certification Challenges!</span>
                <span>→</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          {/* Animated 2D Telemetry Wave Header */}
          <canvas ref={canvasRef} width={600} height={28} className="w-full rounded-xl bg-slate-900 border border-slate-800" />

          {/* Progress Tracker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>
                CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 uppercase">NEP Level: {challenge.competencyLevel}</span>
            </div>

            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Active Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
              wrongFlash ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-xs font-bold uppercase">
                {challenge.type}
              </span>
              <span className="text-xs text-slate-500">Node: {challenge.nodeId}</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white leading-snug">{challenge.question}</h3>

            {/* MCQ Option Renderers */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-2.5 pt-4">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`p-4 rounded-xl text-left text-sm font-medium border transition-all flex items-start gap-3 ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : wrongFlash
                          ? 'bg-rose-950/40 border-rose-600 text-rose-200'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Numeric Input Challenge */}
            {challenge.type === 'numeric' && (
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value..."
                    className="p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-indigo-500 focus:outline-none w-full max-w-xs"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-slate-300 font-bold text-sm">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm disabled:opacity-40"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="pt-4 space-y-4">
                {/* Palette */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg cursor-grab select-none shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Zones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, idx) => (
                    <div
                      key={idx}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-indigo-500 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-xs text-slate-500 uppercase font-semibold">Target: {item.targetId.replace('_', ' ')}</span>
                      {droppedLabels[item.targetId] ? (
                        <span className="text-sm font-bold text-emerald-400 mt-1">✓ {droppedLabels[item.targetId]}</span>
                      ) : (
                        <span className="text-xs text-slate-400 mt-1">Drop matching label here</span>
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify All Targets
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="pt-4 space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder steps into correct scientific sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-indigo-400 flex items-center justify-center font-bold text-xs">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i)
                    )
                  }
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Confirm Order
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="pt-4 space-y-3">
                <p className="text-xs text-slate-400">Assemble parts to build the exact unit structure:</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-white rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 min-h-[50px] items-center">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-indigo-700 text-white rounded-lg text-xs font-mono flex items-center gap-1">
                      {p}
                      <button onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))} className="text-rose-300 font-bold ml-1">
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click building blocks above</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Explanation Card */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-indigo-950/40 rounded-2xl border border-indigo-700 space-y-3">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase">
                  <span>🔬 Scientific Solution Breakdown</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-indigo-400">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold"
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
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Certification →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE & MISSION DEBRIEF ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-3xl">
              🚀
            </div>

            {/* Motivational Feedback Banner */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-amber-300 font-extrabold text-sm uppercase tracking-wider">
              {getMotivationalFeedback(errors)}
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white">Payload Telemetry Certified!</h2>
            <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
              You have completed the full ICSE Class 9 physics calibration sequence across SI units, precision instruments, pendulums, and kinematic vectors.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="px-5 py-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-bold text-amber-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="px-5 py-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block">BKT Mastery Level</span>
                <span className="text-xl font-bold text-emerald-400 uppercase">{masteryLevel}</span>
              </div>
              <div className="px-5 py-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block">Errors Corrected</span>
                <span className="text-xl font-bold text-cyan-400">{errors}</span>
              </div>
            </div>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                ⚠️ Your Targeted Conceptual Review Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-medium">❌ Slip: {m.misconception}</div>
                      <div className="text-emerald-400 font-bold">✓ ICSE Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reflection Questions Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>💭</span>
              <span>Post-Lab Reflection</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 font-bold rounded uppercase">
                  Reflection 1
                </span>
                <p className="text-slate-200 font-medium">What was the most surprising thing you learned?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 font-bold rounded uppercase">
                  Reflection 2
                </span>
                <p className="text-slate-200 font-medium">How would you explain this to a friend?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 font-bold rounded uppercase">
                  Reflection 3
                </span>
                <p className="text-slate-200 font-medium">Where in real life might you use this?</p>
              </div>
            </div>
          </div>

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800 text-xs text-indigo-300 flex items-center justify-between">
            <span>📅 <strong>Spaced Repetition Schedule:</strong> Review due in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>
            <span className="font-mono text-cyan-300">Algorithm: SM-2</span>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx}>• {step}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Precision Standard Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_PhysicsInternationalSystemUnitsSim;
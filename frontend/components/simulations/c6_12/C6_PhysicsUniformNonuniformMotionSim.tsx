'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C6_PHY_011 = 'c6_phy_011';
const NODE_C6_PHY_012 = 'c6_phy_012';
const NODE_C6_PHY_013 = 'c6_phy_013';
const NODE_C6_PHY_014 = 'c6_phy_014';
const NODE_C6_PHY_015 = 'c6_phy_015';
const NODE_C6_PHY_016 = 'c6_phy_016';
const NODE_C6_PHY_017 = 'c6_phy_017';
const NODE_C6_PHY_018 = 'c6_phy_018';
const NODE_C6_PHY_019 = 'c6_phy_019';
const NODE_C6_PHY_020 = 'c6_phy_020';

const ALL_NODE_IDS = [
  NODE_C6_PHY_011,
  NODE_C6_PHY_012,
  NODE_C6_PHY_013,
  NODE_C6_PHY_014,
  NODE_C6_PHY_015,
  NODE_C6_PHY_016,
  NODE_C6_PHY_017,
  NODE_C6_PHY_018,
  NODE_C6_PHY_019,
  NODE_C6_PHY_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Physics Expedition',
  intro: 'You are an engineer assisting the Vande Bharat Express and Bhakra Nangal Hydroelectric teams! From train motion on straight tracks to mountain pressure and clean energy generators, every decision depends on fundamental physics laws.',
  context: 'Analyse motion, forces, pressure, mechanical energy transformations, and light beams to keep our transport and power systems running safely.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A Vande Bharat train travels 20 km in its 1st 15 mins, 20 km in the 2nd 15 mins, and 20 km in the 3rd 15 mins. Meanwhile, a DTC bus travels 300 m, then 50 m, then 0 m at a signal. Which vehicle is in UNIFORM motion?',
  options: [
    'The DTC bus because it moves faster in spurts',
    'The Vande Bharat train because it covers equal distances in equal time intervals',
    'Both are uniform because they travel on straight roads',
    'Neither, because all vehicles on roads are non-uniform'
  ],
  correctIndex: 1,
  hintAfter: 'Uniform motion requires EQUAL distances in EQUAL intervals of time. Let us explore the laboratory to see how this works!',
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
  // 1. Uniform Motion - Foundation
  {
    id: 'ch_001_phy',
    nodeId: NODE_C6_PHY_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the precise scientific definition of uniform motion in ICSE Class 6 Physics?',
    options: [
      'An object moving at very high speed along a curved path',
      'An object covering equal distances in equal intervals of time',
      'An object moving without any force acting on it',
      'An object changing its speed every second at a steady rate'
    ],
    correctIndex: 1,
    explanation: 'Uniform motion is strictly defined as the motion of an object when it travels equal distances in equal intervals of time, regardless of path or speed magnitude.',
    hints: [
      'Focus on the relationship between distance covered and chunks of time.',
      'Remember the twin words: equal distances in equal intervals of time.',
      'Speed magnitude does not matter as long as the interval distances remain identical.'
    ],
    misconceptionIndex: 0,
  },
  // 2. Motion Types - Foundation Drag-Label
  {
    id: 'ch_002_phy',
    nodeId: NODE_C6_PHY_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the motion type labels to the correct real-world vehicle tracking profiles.',
    dragItems: [
      { label: 'Uniform Motion', targetId: 'slot_steady' },
      { label: 'Non-Uniform Motion', targetId: 'slot_jerky' },
    ],
    correctMapping: {
      slot_steady: 'Uniform Motion',
      slot_jerky: 'Non-Uniform Motion',
    },
    explanation: 'Track A covers exactly 20 m every 2 seconds (uniform motion). Track B covers 10 m, then 40 m, then 0 m (non-uniform motion).',
    hints: [
      'Check which track has identical distance intervals every 2 seconds.',
      'A bus stopping at traffic signals has fluctuating distances in equal time chunks.',
      'Steady intervals = Uniform; fluctuating or zero intervals = Non-Uniform.'
    ],
    misconceptionIndex: 0,
  },
  // 3. Speed & Average Speed - Foundation
  {
    id: 'ch_003_phy',
    nodeId: NODE_C6_PHY_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the SI unit of speed, and what is its standard formula?',
    options: [
      'Kilometre per hour (km/h); Speed = Time / Distance',
      'Metre per second (m/s); Speed = Total Distance / Total Time',
      'Newton (N); Speed = Force / Area',
      'Joule (J); Speed = Mass × Distance'
    ],
    correctIndex: 1,
    explanation: 'The SI unit of speed is the metre per second (m/s). Speed is defined as the ratio of total distance travelled to the total time taken.',
    hints: [
      'SI unit of distance is metre (m) and time is second (s).',
      'Speed represents how much distance is covered per unit time.',
      'The formula is Total Distance divided by Total Time.'
    ],
    misconceptionIndex: 1,
  },
  // 4. Numeric Average Speed - Standard
  {
    id: 'ch_004_phy',
    nodeId: NODE_C6_PHY_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A car travels 120 km in 2 hours, stops at a dhaba for 30 minutes (0.5 h), and then travels 60 km in 1 hour. Calculate its average speed in km/h.',
    correctAnswer: 51.4,
    tolerance: 0.5,
    unit: 'km/h',
    explanation: 'Total Distance = 120 + 60 = 180 km. Total Time = 2 + 0.5 + 1 = 3.5 h. Average Speed = 180 / 3.5 = 51.43 km/h. Stop time MUST be included in total time!',
    hints: [
      'Step 1: Calculate total distance: 120 km + 60 km = 180 km.',
      'Step 2: Add all elapsed times including the 30 min stop: 2 + 0.5 + 1 = 3.5 hours.',
      'Step 3: Divide 180 km by 3.5 h to get approximately 51.4 km/h.'
    ],
    misconceptionIndex: 2,
  },
  // 5. Speed Conversion - Standard
  {
    id: 'ch_005_phy',
    nodeId: NODE_C6_PHY_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert a train speed of 72 km/h into metres per second (m/s). (Hint: Multiply by 5/18)',
    correctAnswer: 20,
    tolerance: 0.1,
    unit: 'm/s',
    explanation: 'To convert km/h to m/s, multiply by 5/18: 72 × (5/18) = 4 × 5 = 20 m/s.',
    hints: [
      'Use the conversion factor: 1 km/h = 5/18 m/s.',
      'Multiply 72 by 5, then divide by 18.',
      '72 divided by 18 is 4; 4 multiplied by 5 gives 20.'
    ],
  },
  // 6. Harmonic Mean Speed - Advanced
  {
    id: 'ch_006_phy',
    nodeId: NODE_C6_PHY_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A delivery scooter travels from Mumbai to Thane (60 km) at 30 km/h, and returns (60 km) at 60 km/h. Why is its average speed 40 km/h and NOT the arithmetic mean 45 km/h?',
    options: [
      'Because average speed is total distance / total time, and the slower leg took twice as much time (2 h vs 1 h)',
      'Because speed drops when returning due to tire wear and friction',
      'Because arithmetic mean only applies when distances are unequal',
      'Because gravitational potential energy reduces return velocity'
    ],
    correctIndex: 0,
    explanation: 'Total distance = 120 km. Outward time = 60/30 = 2 h. Return time = 60/60 = 1 h. Total time = 3 h. Average speed = 120 / 3 = 40 km/h. The scooter spent more time at the slower speed, pulling the average down.',
    hints: [
      'Calculate time taken for each half of the journey separately.',
      'Outward: 60/30 = 2 hours. Return: 60/60 = 1 hour.',
      'Total distance is 120 km and total time is 3 hours; 120 / 3 = 40 km/h.'
    ],
    misconceptionIndex: 1,
  },
  // 7. Force Effects - Foundation
  {
    id: 'ch_007_phy',
    nodeId: NODE_C6_PHY_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT an effect that a force can produce on a body?',
    options: [
      'Starting a stationary object or stopping a moving object',
      'Changing the chemical atomic identity of elements inside the body',
      'Speeding up, slowing down, or changing the direction of motion',
      'Changing the shape or dimensions of an object (e.g., squeezing a sponge)'
    ],
    correctIndex: 1,
    explanation: 'Forces can change the state of motion (start, stop, accelerate, decelerate, change direction) and change shape/size. They do not alter fundamental atomic elements.',
    hints: [
      'Recall the five motion effects plus shape deformation.',
      'A force is a mechanical push or pull.',
      'Transmuting atoms is nuclear physics, not an effect of applied mechanical force.'
    ],
  },
  // 8. Force Direction & State - Standard
  {
    id: 'ch_008_phy',
    nodeId: NODE_C6_PHY_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When a cricket fielder catches a fast-moving ball, what force acts, in what direction, and what is its effect?',
    options: [
      'A forward push in direction of motion that accelerates the ball',
      'A pull/push opposing the direction of motion that decelerates the ball to rest (stops it)',
      'A gravitational non-contact force that deflects the ball sideways',
      'A magnetic force acting from a distance to store potential energy'
    ],
    correctIndex: 1,
    explanation: 'The fielder hands exert a contact force opposite to the ball velocity vector, causing negative acceleration (deceleration) until its speed reaches 0 m/s.',
    hints: [
      'Think about whether the hand opposes or assists the incoming ball motion.',
      'Opposing force reduces speed to zero.',
      'The effect is changing state of motion from moving to stationary.'
    ],
  },
  // 9. Contact vs Non-Contact Forces - Foundation Drag-Label
  {
    id: 'ch_009_phy',
    nodeId: NODE_C6_PHY_014,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each force into its correct category: Contact Force or Non-Contact Force.',
    dragItems: [
      { label: 'Muscular Force', targetId: 'box_contact' },
      { label: 'Frictional Force', targetId: 'box_contact_fric' },
      { label: 'Gravitational Force', targetId: 'box_noncontact_grav' },
      { label: 'Magnetic Force', targetId: 'box_noncontact_mag' },
    ],
    correctMapping: {
      box_contact: 'Muscular Force',
      box_contact_fric: 'Frictional Force',
      box_noncontact_grav: 'Gravitational Force',
      box_noncontact_mag: 'Magnetic Force',
    },
    explanation: 'Muscular and Frictional forces require physical surface contact. Gravitational and Magnetic forces act across empty space at a distance.',
    hints: [
      'Does the force require direct physical touch between the interacting bodies?',
      'Friction happens strictly where surfaces touch.',
      'Earth gravity and magnets pull objects across gaps without touching first.'
    ],
    misconceptionIndex: 3,
  },
  // 10. Magnetic Force Misconception - Standard
  {
    id: 'ch_010_phy',
    nodeId: NODE_C6_PHY_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student claims: "A magnet picking up iron pins is a contact force because the pins stick to the magnet at the end." Is this correct?',
    options: [
      'Yes, because all forces that produce contact are contact forces',
      'No, because the magnetic pull begins across a distance before any contact occurs',
      'Yes, but only if the magnet is an electromagnet connected to a battery',
      'No, because iron is non-magnetic and only moves due to gravity'
    ],
    correctIndex: 1,
    explanation: 'Classification depends strictly on whether physical touch is mandatory for the force to BEGIN acting. The magnet attracts pins across a gap; sticking together is the result, not the prerequisite.',
    hints: [
      'When did the iron pins start jumping towards the magnet?',
      'The force was already active across empty air before touching.',
      'Therefore, magnetic force is firmly a non-contact force.'
    ],
    misconceptionIndex: 3,
  },
  // 11. Weight vs Mass - Foundation
  {
    id: 'ch_011_phy',
    nodeId: NODE_C6_PHY_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is weight, what is its SI unit, and which instrument measures it?',
    options: [
      'Amount of matter inside a body; kilogram (kg); beam balance',
      'Gravitational force exerted by Earth on an object; newton (N); spring balance',
      'Pressure exerted on floor; pascal (Pa); barometer',
      'Kinetic capacity of motion; joule (J); speedometer'
    ],
    correctIndex: 1,
    explanation: 'Weight is the downward gravitational force acting on mass. Measured in newtons (N) using a spring balance that extends under force.',
    hints: [
      'Weight is a gravitational pull, meaning it is a force.',
      'All forces share the SI unit named after Sir Isaac Newton (N).',
      'A spring extends when pulled by weight, making the spring balance the correct tool.'
    ],
    misconceptionIndex: 4,
  },
  // 12. Moon Weight Numeric - Standard
  {
    id: 'ch_012_phy',
    nodeId: NODE_C6_PHY_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An astronaut weighs 600 N on Earth (where gravity is ~10 N/kg). If the Moon gravity is 1/6th of Earth, what is her weight on the Moon in newtons?',
    correctAnswer: 100,
    tolerance: 1,
    unit: 'N',
    explanation: 'Weight on Moon = (Weight on Earth) / 6 = 600 N / 6 = 100 N. Note: Her mass (60 kg) remains strictly unchanged on both bodies.',
    hints: [
      'Divide the Earth weight of 600 N by 6.',
      '600 / 6 = 100.',
      'Weight changes with local gravitational pull, while mass in kg stays constant.'
    ],
  },
  // 13. Pressure Definition - Foundation
  {
    id: 'ch_013_phy',
    nodeId: NODE_C6_PHY_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the formula and SI unit for Pressure in physics?',
    options: [
      'Pressure = Force × Area; SI unit = newton-metre (N·m)',
      'Pressure = Force / Area; SI unit = pascal (Pa, where 1 Pa = 1 N/m²)',
      'Pressure = Mass / Volume; SI unit = kg/m³',
      'Pressure = Energy / Time; SI unit = watt (W)'
    ],
    correctIndex: 1,
    explanation: 'Pressure is defined as perpendicular force acting per unit area: P = F / A. Its SI unit is the pascal (Pa) = 1 N/m².',
    hints: [
      'Pressure measures how concentrated a force is over a contact area.',
      'Divide force in newtons by surface area in square metres.',
      'The unit is named after French scientist Blaise Pascal.'
    ],
  },
  // 14. Pressure Calculation - Standard Numeric
  {
    id: 'ch_014_phy',
    nodeId: NODE_C6_PHY_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A school bag of weight 60 N has broad straps with total contact area of 0.02 m². Calculate the pressure exerted on the student shoulders in Pascals (Pa).',
    correctAnswer: 3000,
    tolerance: 10,
    unit: 'Pa',
    explanation: 'Pressure P = Force / Area = 60 N / 0.02 m² = 3000 Pa. (Compare this to thin string straps of 0.002 m² which create 30,000 Pa of painful pressure!)',
    hints: [
      'Use formula P = F / A.',
      'F = 60 N, A = 0.02 m².',
      '60 divided by 0.02 equals 3000 Pa.'
    ],
  },
  // 15. Sharp Knife vs Blunt Knife - Advanced
  {
    id: 'ch_015_phy',
    nodeId: NODE_C6_PHY_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does a sharp chef knife cut a tomato easily while a blunt knife squashes it when pushed with the SAME 20 N force?',
    options: [
      'The sharp knife creates greater muscular force than the blunt knife',
      'The tiny contact area of the sharp edge produces enormous pressure (P = F/A) that slices fibers easily',
      'The blunt knife generates high friction which dissolves the tomato skin',
      'The sharp knife converts kinetic energy into potential energy faster'
    ],
    correctIndex: 1,
    explanation: 'Hand force F is identical (20 N). A sharp edge has area 0.0001 m² -> P = 200,000 Pa. A blunt edge has area 0.001 m² -> P = 20,000 Pa. Ten times higher pressure pierces the surface cleanly.',
    hints: [
      'Hand force F is exactly the same in both cases.',
      'What is different? The contact area of the cutting edge.',
      'Smaller area in denominator makes pressure vastly larger.'
    ],
  },
  // 16. Energy Definition - Foundation
  {
    id: 'ch_016_phy',
    nodeId: NODE_C6_PHY_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is Energy, and what is the relationship between 1 Joule, Newtons, and Metres?',
    options: [
      'Energy is force applied per second; 1 J = 1 N / 1 m',
      'Energy is the capacity to do work; 1 J = 1 N × 1 m',
      'Energy is the speed of electricity; 1 J = 1 N + 1 m',
      'Energy is gravity stored in mass; 1 J = 10 N × 10 m'
    ],
    correctIndex: 1,
    explanation: 'Energy is defined as the capacity to do work. Work and energy share the SI unit Joule (J), where 1 J = 1 N × 1 m.',
    hints: [
      'Think of energy as stored ability to cause displacement.',
      'Work = Force × Displacement.',
      '1 Joule is work done when 1 Newton moves a body by 1 Metre.'
    ],
  },
  // 17. Doorbell Energy Misconception - Standard
  {
    id: 'ch_017_phy',
    nodeId: NODE_C6_PHY_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A student argues: "Because an electric doorbell is mounted 2 metres high on the wall, it operates using Gravitational Potential Energy." Evaluate this argument.',
    options: [
      'Correct, because everything mounted at a height uses potential energy to ring',
      'Incorrect; while it possesses some potential energy due to height, it OPERATES by converting electrical energy into sound energy',
      'Correct, because gravity pulls the internal hammer against the gong',
      'Incorrect, because sound is not a form of physical energy'
    ],
    correctIndex: 1,
    explanation: 'CISCE examiner reports warn against confusing an object position with the operating input energy. An electric current activates an electromagnet that rings the gong (Electrical -> Sound).',
    hints: [
      'What powers the doorbell? Electricity from wires or batteries.',
      'Does the doorbell fall down when it rings?',
      'The height is irrelevant to the working mechanism of electrical to sound conversion.'
    ],
  },
  // 18. Kinetic Energy Dependence - Standard
  {
    id: 'ch_018_phy',
    nodeId: NODE_C6_PHY_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A loaded 5000 kg Tata truck and a 15 kg bicycle are both moving at 20 km/h. Which has more kinetic energy, and why?',
    options: [
      'The bicycle, because lighter objects accelerate with less air resistance',
      'Both have identical kinetic energy because both move at the same speed (20 km/h)',
      'The truck, because kinetic energy depends on both mass and speed; at equal speed, the heavier mass has vastly more energy of motion',
      'Neither possesses kinetic energy until they brake to a complete stop'
    ],
    correctIndex: 2,
    explanation: 'Kinetic energy is energy of motion and depends directly on mass and speed. At identical speed (20 km/h), the massive truck carries far more kinetic energy, which is why truck collisions cause heavy damage.',
    hints: [
      'Kinetic energy depends on TWO factors: Mass and Speed.',
      'Speed is equal (20 km/h) for both.',
      'The object with larger mass holds greater kinetic energy.'
    ],
  },
  // 19. Drag-Sort: Energy Transformation in Hydroelectric Plant - Advanced Drag-Sort
  {
    id: 'ch_019_phy',
    nodeId: NODE_C6_PHY_019,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of energy transformations at the Bhakra Nangal Dam from storage to power generation.',
    sortItems: [
      'Water stored high in reservoir behind dam (Potential Energy)',
      'Water rushing down penstock pipes (Kinetic Energy of flowing water)',
      'Rushing water spins turbine blades (Mechanical Rotational Energy)',
      'Turbine drives generator to supply power grid (Electrical Energy)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: '1. Water stored high holds Gravitational Potential Energy -> 2. Falling water converts to Kinetic Energy -> 3. Water spins turbines (Mechanical) -> 4. Generator outputs Electrical Energy.',
    hints: [
      'Start with where water sits before release (height in dam reservoir).',
      'Follow water moving downhill gaining speed.',
      'End with electricity flowing into power lines.'
    ],
  },
  // 20. Potential Energy Forms - Standard
  {
    id: 'ch_020_phy',
    nodeId: NODE_C6_PHY_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following demonstrates potential energy stored due to DEFORMATION of SHAPE (rather than height)?',
    options: [
      'A coconut hanging 10 metres high on a palm tree',
      'Water stored behind the Hirakud dam reservoir',
      'A stretched catapult rubber band held stationary ready to launch a pellet',
      'A Boeing 747 cruising at 35,000 feet altitude'
    ],
    correctIndex: 2,
    explanation: 'Potential energy has two varieties: position due to height (gravitational) and condition/deformation of shape (elastic). A stretched rubber band stores potential energy in its altered shape.',
    hints: [
      'Look for an object whose physical shape was stretched, bent, or compressed.',
      'A rubber band stores energy when pulled back.',
      'Releasing the shape transforms stored potential into pellet kinetic energy.'
    ],
  },
  // 21. Light Energy & Moon Classification - Foundation
  {
    id: 'ch_021_phy',
    nodeId: NODE_C6_PHY_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is the Moon scientifically classified as a NON-LUMINOUS object even though it looks bright at night?',
    options: [
      'Because it only produces light during full moon nights',
      'Because it does not generate light of its own, but merely reflects sunlight falling on its surface',
      'Because it is too cold to emit thermal nuclear radiation',
      'Because light travels in curved arcs around Earth gravitational field'
    ],
    correctIndex: 1,
    explanation: 'Luminous bodies generate their own light (Sun, stars, firefly, lit candle). Non-luminous bodies emit no internal light; the Moon is visible solely by reflected sunlight.',
    hints: [
      'Does the Moon have an internal power plant or burning gas like the Sun?',
      'It reflects sunlight like a giant dusty mirror in space.',
      'Only self-emitting objects are called luminous.'
    ],
    misconceptionIndex: 5,
  },
  // 22. Light Rectilinear Propagation - Advanced Construct
  {
    id: 'ch_022_phy',
    nodeId: NODE_C6_PHY_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the scientific principle of Rectilinear Propagation of Light by arranging the key terms in logical sequence.',
    availableParts: ['Light', 'travels', 'in straight lines', 'and forms sharp shadows', 'when obstructed by opaque bodies'],
    targetState: 'Light travels in straight lines and forms sharp shadows when obstructed by opaque bodies',
    validationHint: 'Combine all 5 parts to state the straight-line propagation and shadow formation rule.',
    explanation: 'Rectilinear propagation states that light travels strictly in straight lines. Because it cannot bend around obstacles on its own, opaque objects cast distinct shadows.',
    hints: [
      'Start with "Light", followed by "travels", then "in straight lines".',
      'Add the consequence: "and forms sharp shadows".',
      'Finish with the cause: "when obstructed by opaque bodies".'
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
  nodeId: NODE_C6_PHY_011,
  title: 'Motion, Forces, Pressure & Energy Lab',
  definition: 'An interactive exploration of uniform/non-uniform motion, speed formulas, contact/non-contact forces, weight, pressure (P=F/A), mechanical kinetic & potential energy, and rectilinear light propagation.',
  eli5: 'Explore moving trains, pushing forces, sharp knives, roller coasters, and sunbeams in one interconnected physics playground!',
  misconceptions: [
    { misconception: 'Speed magnitude decides uniformity (fast = uniform, slow = non-uniform)', correction: 'Uniformity depends strictly on equal distances in equal time intervals. A slow 10 km/h train can be uniform if distances per interval are identical.' },
    { misconception: 'Average speed is the simple arithmetic average (mean) of speeds', correction: 'Average speed is strictly Total Distance divided by Total Time. Slower legs take more time and weigh more heavily.' },
    { misconception: 'Rest time at stops should be ignored when calculating average speed', correction: 'Total time in average speed includes all stops and rest intervals from start to finish.' },
    { misconception: 'Magnetic force is a contact force because iron pins stick to the magnet in the end', correction: 'Classification depends on whether touch is required to START acting. Magnetic attraction acts across empty air before touching.' },
    { misconception: 'Weight and mass are the same thing measured in kg', correction: 'Mass is quantity of matter in kg (constant everywhere). Weight is gravitational pull in Newtons (N = kg·m/s²) and changes on the Moon.' },
    { misconception: 'The Moon is a luminous body because it shines brightly at night', correction: 'The Moon is non-luminous; it produces zero light of its own and only reflects sunlight.' },
  ],
  diagnosticQuestions: [
    { question: 'What defines uniform motion?', options: ['Moving fast', 'Equal distances in equal time intervals', 'Moving in a circle', 'Moving with no friction'], correctIndex: 1 },
    { question: 'What is the SI unit of speed?', options: ['km/h', 'm/s', 'Newton', 'Pascal'], correctIndex: 1 },
    { question: 'Which is a non-contact force?', options: ['Muscular force', 'Frictional force', 'Gravitational force', 'Brake pad pressure'], correctIndex: 2 },
    { question: 'What is weight?', options: ['Amount of matter in kg', 'Force of gravity on an object in Newtons', 'Density of object', 'Volume of shape'], correctIndex: 1 },
    { question: 'Formula for pressure:', options: ['P = Force × Area', 'P = Force / Area', 'P = Mass / Area', 'P = Work / Time'], correctIndex: 1 },
    { question: 'Energy is defined as:', options: ['Push or pull', 'Capacity to do work', 'Distance per second', 'Weight per unit area'], correctIndex: 1 },
    { question: 'A stretched rubber band held still possesses:', options: ['Kinetic energy', 'Potential energy (shape)', 'Sound energy', 'Zero energy'], correctIndex: 1 },
    { question: 'Light travels in:', options: ['Curved loops', 'Straight lines (rectilinear)', 'Zig-zag waves only', 'Spirals around corners'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student understands and applies definitions, calculations, and classifications across uniform motion, forces, pressure, mechanical energy, and light.',
};

// ─── EXPLORATION STEPS (Interactive Brilliant.org Style) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Uniform vs Non-Uniform Motion',
    instruction: 'Toggle between Uniform and Non-Uniform tracks and adjust speed to watch interval distances.',
    interactionType: 'motion-track',
    nodeId: NODE_C6_PHY_011,
  },
  {
    title: 'Lab 2: Contact vs Non-Contact Forces',
    instruction: 'Drag the distance slider of the magnet and observe how force acts across empty space before touching.',
    interactionType: 'force-field',
    nodeId: NODE_C6_PHY_014,
  },
  {
    title: 'Lab 3: Pressure & Surface Area (P = F / A)',
    instruction: 'Adjust the strap width or knife sharpness slider to see how area directly controls pressure.',
    interactionType: 'pressure-gauge',
    nodeId: NODE_C6_PHY_016,
  },
  {
    title: 'Lab 4: Kinetic & Potential Energy Transformation',
    instruction: 'Pull the pendulum bob or dam water level to watch Potential and Kinetic energy bars exchange in real-time.',
    interactionType: 'energy-bars',
    nodeId: NODE_C6_PHY_018,
  },
  {
    title: 'Lab 5: Rectilinear Propagation of Light',
    instruction: 'Align the three barrier slits in a straight line to let the light ray reach the optical detector.',
    interactionType: 'light-ray',
    nodeId: NODE_C6_PHY_020,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you cut the contact area of a knife edge by 10× while applying the same 20 N hand force, what happens to the pressure?',
    options: [
      'Pressure drops to 1/10th',
      'Pressure remains unchanged because hand force is 20 N',
      'Pressure increases by 10× (P = F / A)',
      'Pressure becomes zero'
    ],
    correctIndex: 2,
    verifyInstruction: 'Adjust the Knife Sharpness slider in Lab 3 to test your prediction!',
    nodeId: NODE_C6_PHY_016,
  },
  {
    question: 'Predict: When a roller-coaster car rolls from the top of a 50m hill down to ground level, what happens to its mechanical energy?',
    options: [
      'Potential energy transforms into Kinetic energy as speed increases',
      'Both potential and kinetic energy disappear completely',
      'Kinetic energy becomes potential energy at the bottom',
      'Total energy doubles because speed is high'
    ],
    correctIndex: 0,
    verifyInstruction: 'Release the roller coaster cart in the simulation to see the live energy exchange!',
    nodeId: NODE_C6_PHY_018,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the distance ticks in Uniform Motion mode?',
    observableOptions: [
      'Distance covered in every 1-second interval is strictly equal',
      'Distance increases with time exponentially',
      'The vehicle comes to a complete halt every 2 seconds',
      'The car moves backwards periodically'
    ],
    correctIndex: 0,
    nodeId: NODE_C6_PHY_011,
  },
  {
    question: 'What happens to the light beam when any ONE of the three cardboard slits is pushed out of alignment?',
    observableOptions: [
      'The light beam curves around the cardboard to reach the screen',
      'The beam is blocked because light travels only in straight lines',
      'The light splits into a rainbow spectrum',
      'The light energy turns into magnetic force'
    ],
    correctIndex: 1,
    nodeId: NODE_C6_PHY_020,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Junior Chief Engineer Challenge: The Shimla Mountain Rail & Dam',
  description: 'Apply your physics skills to real Indian engineering challenges! Design high-traction railway tracks, calculate snowshoe surface areas for Himalayan treks, and balance reservoir potential energy at the Bhakra dam.',
  steps: [
    'Measure uniform speed on a 100m straight railway stretch using a stopwatch',
    'Calculate the pressure of your school bag with thin vs padded broad straps',
    'Demonstrate potential-to-kinetic energy conversion using a simple rubber catapult',
    'Perform the classic 3-cardboard pinhole experiment to prove straight-line light travel'
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

export function C6_PhysicsUniformNonuniformMotionSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // ─── 30+ STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Numeric & Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Lab Interactive Physical Variables
  const [simMotionMode, setSimMotionMode] = useState<'uniform' | 'non-uniform'>('uniform');
  const [simTrainSpeed, setSimTrainSpeed] = useState(20); // m/s or km/h
  const [simTrainPos, setSimTrainPos] = useState(0);
  const [magnetDistance, setMagnetDistance] = useState(80); // mm
  const [knifeForce, setKnifeForce] = useState(20); // N
  const [knifeArea, setKnifeArea] = useState(0.0005); // m^2
  const [pendulumHeight, setPendulumHeight] = useState(45); // degrees / height
  const [slit1Offset, setSlit1Offset] = useState(0);
  const [slit2Offset, setSlit2Offset] = useState(0);
  const [slit3Offset, setSlit3Offset] = useState(0);
  const [isPlayingSim, setIsPlayingSim] = useState(true);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED CALCULATIONS ───
  const livePressure = useMemo(() => {
    if (knifeArea <= 0) return 0;
    return Math.round(knifeForce / knifeArea);
  }, [knifeForce, knifeArea]);

  const magneticAttractionPower = useMemo(() => {
    if (magnetDistance > 100) return 0;
    return Math.max(0, Math.round((1 - magnetDistance / 100) * 100));
  }, [magnetDistance]);

  const lightPathAligned = useMemo(() => {
    return Math.abs(slit1Offset) < 4 && Math.abs(slit2Offset) < 4 && Math.abs(slit3Offset) < 4;
  }, [slit1Offset, slit2Offset, slit3Offset]);

  // ─── 5+ USEEFFECT CALLS ───

  // 1. Initial Load of Mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. BKT Adapt Difficulty on Score Update
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // 3. Canvas Simulation Loop (Train Track Animation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localPos = 0;
    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw railway track
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(20, 60);
      ctx.lineTo(canvas.width - 20, 60);
      ctx.stroke();

      // Sleepers
      for (let x = 25; x < canvas.width - 20; x += 25) {
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, 48);
        ctx.lineTo(x, 72);
        ctx.stroke();
      }

      // Interval Distance Markers
      for (let i = 0; i <= 5; i++) {
        const markerX = 40 + i * 85;
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.fillText(`${i * 10}m`, markerX - 8, 90);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(markerX, 60, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Move train
      if (isPlayingSim) {
        if (simMotionMode === 'uniform') {
          localPos = (localPos + simTrainSpeed * 0.05) % (canvas.width - 80);
        } else {
          // Non-uniform: speeds up, slows down, stops
          const cycle = (frameCount % 240);
          if (cycle < 80) localPos += (simTrainSpeed * 0.08);
          else if (cycle < 160) localPos += (simTrainSpeed * 0.02);
          else localPos += 0; // Stop
          if (localPos > canvas.width - 80) localPos = 0;
        }
        setSimTrainPos(localPos);
      }

      // Draw Vande Bharat Engine
      const trainX = 30 + localPos;
      ctx.fillStyle = '#0284c7';
      ctx.roundRect(trainX, 35, 60, 24, [6, 12, 4, 4]);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Train Windshield & stripe
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(trainX + 40, 38, 14, 10);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(trainX, 50, 60, 3);

      // Wheels
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(trainX + 15, 62, 5, 0, Math.PI * 2);
      ctx.arc(trainX + 45, 62, 5, 0, Math.PI * 2);
      ctx.fill();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlayingSim, simMotionMode, simTrainSpeed]);

  // 4. Auto-Speech for Phase Changes
  useEffect(() => {
    if (phase === 'discovery') {
      speechManager.speak('Welcome to the Physics Lab! Let us start with an intriguing question.');
    } else if (phase === 'explore') {
      speechManager.speak(EXPLORATION_STEPS[currentSlide].title + '. ' + EXPLORATION_STEPS[currentSlide].instruction);
    } else if (phase === 'sandbox') {
      speechManager.speak('Free exploration mode active. Test and manipulate variables freely!');
    } else if (phase === 'challenge') {
      speechManager.speak(`Challenge ${currentChallenge + 1}: ` + challenge.question);
    }
  }, [phase, currentSlide, currentChallenge]);

  // 5. Cleanup on Unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── 14 USECALLBACK HANDLERS ───

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
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak('Here is a hint: ' + hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      audioManager.play('chime');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now adjust the controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closely at the data intervals.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping && challenge.correctMapping[targetId] === draggedItem;
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
      let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered motion, forces, pressure, and energy!');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Correct physics reasoning.');
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
        speechManager.speak('Let us review the complete step-by-step physics explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/60 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider text-gold-400 uppercase">
              ICSE Class 6 Physics • {subjectConfig.name}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all capitalize ${
                phase === p
                  ? 'bg-gradient-to-r from-gold-500 to-gold-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={`Switch to ${p} phase`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          key="discovery-phase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-6 space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            <span className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-xs font-bold uppercase tracking-widest border border-gold-500/40">
              Curiosity Hook
            </span>
            <h2 className="text-2xl font-black text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs sm:text-sm text-gold-300/80 mt-2 italic font-mono">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="text-gold-400 font-mono">Q:</span> {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm sm:text-base font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700/80 hover:border-gold-500 text-slate-200 hover:bg-slate-800'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <span className="font-mono text-xs mr-3 text-slate-400">[{String.fromCharCode(65 + i)}]</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Correct! Uniform motion means equal distances in equal time chunks.' : 'ℹ ' + DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div
          key="explore-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gold-400 tracking-wider uppercase">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-gold-500' : 'w-2 bg-slate-800'
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
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6 shadow-xl"
            >
              <div>
                <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-sm mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: UNIFORM VS NON-UNIFORM MOTION CANVAS */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <canvas ref={canvasRef} width={600} height={110} className="w-full rounded-lg bg-slate-900/50" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Motion Pattern Mode
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSimMotionMode('uniform');
                            audioManager.play('tap');
                          }}
                          className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                            simMotionMode === 'uniform'
                              ? 'bg-gold-950 border-gold-500 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          Uniform (Equal Distances)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSimMotionMode('non-uniform');
                            audioManager.play('tap');
                          }}
                          className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                            simMotionMode === 'non-uniform'
                              ? 'bg-amber-950 border-amber-500 text-amber-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          Non-Uniform (Traffic/Stops)
                        </motion.button>
                      </div>

                      <div className="pt-2">
                        <label className="text-xs text-slate-400 flex justify-between">
                          <span>Target Speed:</span>
                          <span className="font-mono text-gold-400 font-bold">{simTrainSpeed} m/s ({Math.round(simTrainSpeed * 3.6)} km/h)</span>
                        </label>
                        <input
                          type="range"
                          min={5}
                          max={40}
                          value={simTrainSpeed}
                          onChange={(e) => {
                            setSimTrainSpeed(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full mt-1 accent-gold-500"
                          aria-label="Adjust target speed"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                      <span className="font-bold text-gold-300 uppercase tracking-wider block">Live Telemetry</span>
                      <p>• Distance per 1s: <span className="font-mono text-gold-400 font-bold">{simMotionMode === 'uniform' ? `${simTrainSpeed} m (Constant)` : 'Fluctuating (20m -> 5m -> 0m)'}</span></p>
                      <p>• Rectilinear Status: <span className="font-mono text-emerald-400">Straight Line Path</span></p>
                      <p>• Classification: <span className="font-mono font-bold text-amber-300">{simMotionMode === 'uniform' ? 'Uniform Motion' : 'Non-Uniform Motion'}</span></p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: CONTACT VS NON-CONTACT FORCES */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 min-h-[160px] flex items-center justify-between relative overflow-hidden">
                    {/* Magnet on Left */}
                    <motion.div
                      animate={{ x: 100 - magnetDistance }}
                      className="flex items-center gap-1 z-10"
                    >
                      <div className="w-16 h-20 bg-rose-700 rounded-l-lg flex items-center justify-center font-black text-white shadow-lg">
                        N
                      </div>
                      <div className="w-16 h-20 bg-gold-700 rounded-r-lg flex items-center justify-center font-black text-white shadow-lg">
                        S
                      </div>
                    </motion.div>

                    {/* Magnetic Field Waves */}
                    {magneticAttractionPower > 10 && (
                      <motion.div
                        animate={{ opacity: [0.3, 0.9, 0.3], scaleX: [0.8, 1.2, 0.8] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute left-1/3 top-1/2 -translate-y-1/2 w-32 h-16 border-2 border-dashed border-gold-400/40 rounded-full pointer-events-none"
                      />
                    )}

                    {/* Iron Pin on Right */}
                    <motion.div
                      animate={{
                        x: magneticAttractionPower > 60 ? -(magneticAttractionPower * 0.6) : 0,
                        rotate: magneticAttractionPower > 30 ? 15 : 0
                      }}
                      className="p-3 bg-slate-700 border border-slate-500 rounded-lg flex items-center gap-2 shadow-md z-10"
                    >
                      <span className="text-xl">���</span>
                      <span className="text-xs font-mono font-bold text-slate-200">Iron Pin</span>
                    </motion.div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Magnet Distance Gap:</span>
                      <span className="font-mono text-gold-400 font-bold">{magnetDistance} mm (Force Power: {magneticAttractionPower}%)</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={120}
                      value={magnetDistance}
                      onChange={(e) => {
                        setMagnetDistance(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-gold-500"
                      aria-label="Adjust magnet distance"
                    />
                    <p className="text-xs text-slate-400">
                      💡 Observe: The non-contact magnetic force begins pulling the pin across empty air long before they touch!
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 2: PRESSURE LAB */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* Predict Then Check Hook */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/60 border border-gold-800 rounded-xl space-y-3">
                      <p className="text-sm font-bold text-gold-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <label className="text-xs text-slate-400 flex justify-between">
                          <span>Applied Force (F):</span>
                          <span className="font-mono text-amber-400 font-bold">{knifeForce} N</span>
                        </label>
                        <input
                          type="range"
                          min={5}
                          max={100}
                          value={knifeForce}
                          onChange={(e) => setKnifeForce(Number(e.target.value))}
                          className="w-full accent-amber-500"
                          aria-label="Set applied force"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 flex justify-between">
                          <span>Contact Edge Area (A):</span>
                          <span className="font-mono text-gold-400 font-bold">{(knifeArea * 10000).toFixed(1)} cm² ({knifeArea} m²)</span>
                        </label>
                        <input
                          type="range"
                          min={0.0001}
                          max={0.002}
                          step={0.0001}
                          value={knifeArea}
                          onChange={(e) => setKnifeArea(Number(e.target.value))}
                          className="w-full accent-gold-500"
                          aria-label="Set contact area"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center items-center text-center space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Calculated Pressure (P = F / A)</span>
                      <motion.span
                        key={livePressure}
                        initial={{ scale: 1.2, color: '#38bdf8' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-3xl sm:text-4xl font-black font-mono text-white"
                      >
                        {livePressure.toLocaleString()} <span className="text-lg text-gold-400 font-normal">Pa (N/m²)</span>
                      </motion.span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        livePressure > 50000 ? 'bg-rose-950 text-rose-300 border border-rose-700' : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      }`}>
                        {livePressure > 50000 ? 'High Pressure (Slices easily / painful strap)' : 'Low Pressure (Spreads load safely)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: KINETIC & POTENTIAL ENERGY */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    {/* SVG Hydroelectric Reservoir Simulation */}
                    <svg viewBox="0 0 260 140" className="w-full rounded-lg bg-slate-900 border border-slate-800">
                      {/* Dam Wall */}
                      <polygon points="120,20 160,130 110,130 100,20" fill="#475569" />
                      {/* Water behind dam */}
                      <path
                        d={`M 10,${120 - pendulumHeight} L 105,${120 - pendulumHeight} L 110,130 L 10,130 Z`}
                        fill="#0284c7"
                        opacity={0.8}
                      />
                      <text x="50" y="70" fill="#bae6fd" fontSize="9" fontWeight="bold">Reservoir Height</text>
                      {/* Penstock rush */}
                      <path d="M 115,100 Q 150,110 180,120" stroke="#38bdf8" strokeWidth="6" fill="none" strokeDasharray="4 2" />
                      {/* Turbine */}
                      <circle cx="190" cy="120" r="10" fill="#f59e0b" />
                      <text x="180" y="105" fill="#fde68a" fontSize="8">Turbine</text>
                    </svg>

                    {/* Live Energy Bars */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-emerald-400 mb-1">
                          <span>Gravitational Potential Energy (Height):</span>
                          <span>{pendulumHeight}%</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500 rounded-full"
                            animate={{ width: `${pendulumHeight}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-amber-400 mb-1">
                          <span>Kinetic Energy (Motion of rushing water):</span>
                          <span>{100 - pendulumHeight}%</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-amber-500 rounded-full"
                            animate={{ width: `${100 - pendulumHeight}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="text-xs text-slate-400 block mb-1">Adjust Water Reservoir Head Level:</label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={pendulumHeight}
                          onChange={(e) => setPendulumHeight(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                          aria-label="Set reservoir head height"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: RECTILINEAR LIGHT PROPAGATION */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 relative overflow-hidden">
                    <svg viewBox="0 0 400 130" className="w-full">
                      {/* Light Source Torch */}
                      <rect x="10" y="50" width="35" height="25" rx="4" fill="#f59e0b" />
                      <circle cx="45" cy="62" r="8" fill="#fef08a" />
                      <text x="15" y="65" fill="#000" fontSize="8" fontWeight="bold">Torch</text>

                      {/* 3 Cardboards with slits */}
                      {[
                        { x: 110, offset: slit1Offset, label: 'Card 1' },
                        { x: 200, offset: slit2Offset, label: 'Card 2' },
                        { x: 290, offset: slit3Offset, label: 'Card 3' },
                      ].map((card, i) => (
                        <g key={i}>
                          <rect x={card.x} y={15} width="12" height="100" rx="2" fill="#475569" />
                          <circle cx={card.x + 6} cy={62 + card.offset} r="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                          <text x={card.x - 4} y="125" fill="#94a3b8" fontSize="8">{card.label}</text>
                        </g>
                      ))}

                      {/* Optical Detector Target */}
                      <rect x="365" y="45" width="20" height="35" rx="3" fill={lightPathAligned ? '#22c55e' : '#334155'} />
                      <text x="368" y="66" fill="#fff" fontSize="8">{lightPathAligned ? 'ON' : 'OFF'}</text>

                      {/* Straight Light Ray Beam */}
                      {lightPathAligned ? (
                        <motion.line
                          x1="45"
                          y1="62"
                          x2="365"
                          y2="62"
                          stroke="#fef08a"
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                        />
                      ) : (
                        <line x1="45" y1="62" x2="110" y2="62" stroke="#fef08a" strokeWidth="3" opacity="0.6" />
                      )}
                    </svg>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[
                        { label: 'Card 1 Shift', val: slit1Offset, setter: setSlit1Offset },
                        { label: 'Card 2 Shift', val: slit2Offset, setter: setSlit2Offset },
                        { label: 'Card 3 Shift', val: slit3Offset, setter: setSlit3Offset },
                      ].map((ctrl, i) => (
                        <div key={i} className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                          <label className="text-[11px] text-slate-400 block mb-1">{ctrl.label}</label>
                          <input
                            type="range"
                            min={-20}
                            max={20}
                            value={ctrl.val}
                            onChange={(e) => ctrl.setter(Number(e.target.value))}
                            className="w-full accent-gold-500"
                            aria-label={ctrl.label}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-center font-bold mt-2 text-gold-300">
                      {lightPathAligned ? '🌟 Beam Aligned: Light travels in a straight line through all 3 pinholes!' : '⚠️ Beam Blocked: Light cannot curve around unaligned slits!'}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 rounded-xl font-bold text-xs sm:text-sm"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div
          key="sandbox-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-6"
        >
          <div className="p-5 bg-gradient-to-r from-slate-900 via-gold-950/40 to-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <span>🛠️</span> Multi-Variable Physics Playground
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Explore force, speed, pressure, and energy without constraints or test pressure. Observe how physical laws respond in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Speed & Distance Sandbox */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">1. Speed & Average Speed Lab</span>
              <p className="text-xs text-slate-300">Set distance legs to compute average speed with stops:</p>
              <div className="space-y-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span>Leg 1 (120 km in 2 h):</span>
                  <span className="text-gold-400">60 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>Signal Halt:</span>
                  <span className="text-amber-400">30 mins (0.5 h)</span>
                </div>
                <div className="flex justify-between">
                  <span>Leg 2 (60 km in 1 h):</span>
                  <span className="text-gold-400">60 km/h</span>
                </div>
                <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-emerald-400">
                  <span>Average Speed (180 km / 3.5 h):</span>
                  <span>51.4 km/h (14.3 m/s)</span>
                </div>
              </div>
            </div>

            {/* Pressure Sandbox */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">2. Pressure Calculator (P = F / A)</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Force: {knifeForce} N</label>
                  <input
                    type="range"
                    min={10}
                    max={200}
                    value={knifeForce}
                    onChange={(e) => setKnifeForce(Number(e.target.value))}
                    className="w-full accent-gold-500"
                    aria-label="Sandbox force input"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Area: {(knifeArea * 10000).toFixed(1)} cm²</label>
                  <input
                    type="range"
                    min={0.0001}
                    max={0.005}
                    step={0.0002}
                    value={knifeArea}
                    onChange={(e) => setKnifeArea(Number(e.target.value))}
                    className="w-full accent-gold-500"
                    aria-label="Sandbox area input"
                  />
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
                <span className="text-xs text-slate-400">Generated Pressure: </span>
                <span className="text-xl font-bold text-emerald-400">{livePressure.toLocaleString()} Pa</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-bold shadow-xl flex items-center gap-2"
            >
              Start Graded Challenge Deck →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES & MASTERY ─── */}
      {phase === 'challenge' && (
        <motion.div
          key="challenge-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Top Progress & Difficulty Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">NEP Competency:</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold-950 text-gold-300 border border-gold-700 capitalize font-bold">
                {challenge.competencyLevel}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950 text-rose-400 border border-rose-700'
                    : 'bg-gold-950 text-gold-400 border border-gold-700'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border space-y-5 shadow-xl transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
              {challenge.question}
            </h3>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 border-slate-700/80 hover:border-gold-500 text-slate-200 hover:bg-slate-800'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <span className="font-mono text-xs mr-3 text-slate-400">[{String.fromCharCode(65 + i)}]</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: DRAG-LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels onto their matching target boxes:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg cursor-grab font-bold text-xs shadow"
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-between min-h-[60px]"
                    >
                      <span className="text-xs font-mono text-slate-400 capitalize">{item.targetId.replace('slot_', '').replace('box_', '').replace('_', ' ')}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                        droppedLabels[item.targetId] ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-slate-900 text-slate-500'
                      }`}>
                        {droppedLabels[item.targetId] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block">Drag or reorder steps into correct physical order:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs sm:text-sm font-medium flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-950 text-gold-300 flex items-center justify-center font-mono font-bold text-xs border border-gold-700">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-gold-500 outline-none w-48"
                    aria-label="Enter numeric answer"
                  />
                  <span className="text-slate-400 font-mono text-sm">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-900/80 border border-gold-600 rounded-lg text-xs text-gold-200 flex items-center gap-1.5">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-gold-400 hover:text-rose-400 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click blocks above to assemble phrase</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow"
                >
                  Verify Assembly
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Banner */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">💡</span>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Scientific Explanation Breakdown:
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2"
                    >
                      <span className="font-mono text-amber-400 font-bold">[{i + 1}]</span>
                      <span>{sentence}{!sentence.endsWith('.') && '.'}</span>
                    </motion.p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow"
                    >
                      Next Scientific Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL WORLD ACTIVITY ─── */}
      {phase === 'complete' && (
        <motion.div
          key="complete-phase"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 rounded-3xl border border-gold-700 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Laboratory Exploration Mastered!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BASED ON ERRORS */}
            <div className="my-3">
              <span className={`text-lg sm:text-xl font-black px-4 py-2 rounded-2xl border inline-block shadow-lg ${
                errors === 0
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60'
                  : errors <= 3
                  ? 'bg-gold-950/90 text-gold-300 border-gold-500/60'
                  : errors <= 7
                  ? 'bg-amber-950/90 text-amber-300 border-amber-500/60'
                  : 'bg-rose-950/90 text-rose-300 border-rose-500/60'
              }`}>
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have completed comprehensive investigations covering uniform motion, speeds, force types, mass vs weight, pressure concentration, mechanical energy transformations, and light propagation.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto pt-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase block">Final Score</span>
                <span className="text-xl font-mono font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase block">Mastery Tier</span>
                <span className="text-xl font-bold text-gold-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 uppercase block">Next Spaced Review</span>
                <span className="text-xl font-bold text-amber-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</span>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostics */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Specific Misconceptions Addressed During Lab:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions && misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-black text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="font-mono text-gold-400 font-bold">0{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                setCurrentChallenge(0);
                setErrors(0);
                audioManager.play('tap');
              }}
              className="px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-600 text-white font-bold rounded-2xl shadow-xl"
            >
              Replay Simulation Laboratory ↻
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Floating Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Physics Node Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_PhysicsUniformNonuniformMotionSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C10_PHY_011 = 'c10_phy_011'; // Efficiency of machines (eta = MA/VR)
const NODE_C10_PHY_012 = 'c10_phy_012'; // Levers (classes I, II, III with MA and VR)
const NODE_C10_PHY_013 = 'c10_phy_013'; // Pulley systems (single fixed, single movable, block and tackle)
const NODE_C10_PHY_014 = 'c10_phy_014'; // Refraction of light through glass block & real/apparent depth
const NODE_C10_PHY_015 = 'c10_phy_015'; // Refractive index & wave relation (u = c/V, V = f*lambda)
const NODE_C10_PHY_016 = 'c10_phy_016'; // Total internal reflection and critical angle (sin C = 1/u)
const NODE_C10_PHY_017 = 'c10_phy_017'; // Lenses (convex/concave, ray diagrams, 1/f = 1/v - 1/u)
const NODE_C10_PHY_018 = 'c10_phy_018'; // Power of a lens (P = 1/f) and magnifying glass
const NODE_C10_PHY_019 = 'c10_phy_019'; // Dispersion and visible spectrum (VIBGYOR, scattering)
const NODE_C10_PHY_020 = 'c10_phy_020'; // Electromagnetic spectrum (order, properties, UV/IR uses)

const ALL_NODE_IDS = [
  NODE_C10_PHY_011,
  NODE_C10_PHY_012,
  NODE_C10_PHY_013,
  NODE_C10_PHY_014,
  NODE_C10_PHY_015,
  NODE_C10_PHY_016,
  NODE_C10_PHY_017,
  NODE_C10_PHY_018,
  NODE_C10_PHY_019,
  NODE_C10_PHY_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Deep-Space Rover & Optical Telemetry Payload',
  intro: 'You are the Chief Mission Specialist preparing the Vikram-III lunar rover. You must calibrate mechanical load lifters (levers and block & tackle pulleys with realistic friction) and align high-precision optical sensors (prisms, lenses, and TIR fibre conduits) before liftoff.',
  context: 'Energy efficiency is vital in space. Any mechanical loss generates wasted heat, and any optical aberration causes telemetry failure.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An engineer designs a 4-pulley block-and-tackle hoist. With zero friction, it lifts 400 N using 100 N effort. In the lunar dust, friction wastes 25% of input work. What effort is now needed to lift the 400 N load?',
  options: [
    '100 N (Velocity ratio never changes)',
    '133.3 N (Efficiency drops to 75%, so MA = 3.0)',
    '75 N (Friction reduces the required effort)',
    '300 N (Friction adds 200 N)',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Real machines have efficiency η = (MA / VR) × 100% < 100%. While VR stays locked at 4 (geometric constant), MA drops to 3.0 because friction opposes motion!',
};

// ─── OBSERVATION QUESTIONS (BRILLIANT.ORG 'WHAT DO YOU NOTICE?' PATTERN) ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    prompt: 'What do you notice when you increase the bearing friction slider in the pulley simulation?',
    observableOptions: [
      'Velocity Ratio (VR) stays constant at 4, but Mechanical Advantage (MA) and useful load decrease',
      'Both Velocity Ratio (VR) and Mechanical Advantage (MA) drop proportionally to zero',
      'Velocity Ratio (VR) increases to compensate for the lost mechanical power',
      'The applied effort automatically decreases as friction increases',
    ],
    correctIndex: 0,
    explanation: 'Velocity Ratio depends purely on the machine geometry (number of pulley strands supporting the load) and never changes with friction. Friction reduces Mechanical Advantage (MA) and efficiency η = MA/VR.',
  },
  {
    id: 'obs_02',
    prompt: 'What do you notice when the angle of incidence inside the glass exceeds the Critical Angle (~41.8°)?',
    observableOptions: [
      'Light bends at 90° along the boundary and splits into rainbow colours',
      'The refracted ray disappears entirely into air and 100% of light undergoes Total Internal Reflection',
      'Light penetrates deeper into the air with doubled speed and amplitude',
      'The light beam undergoes complete absorption at the glass boundary',
    ],
    correctIndex: 1,
    explanation: 'When light travels from an optically denser medium to a rarer medium and the angle of incidence i exceeds the critical angle C, no refraction into air is physically possible. 100% of the light undergoes lossless Total Internal Reflection back into the glass.',
  },
];

// ─── TYPES & INTERFACES ───
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

// ─── DEFAULT PROPS WITH ENRICHMENT ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_PHY_011,
  title: 'CISCE Class 10 Physics: Machines & Optics Mastery Suite',
  definition: 'Comprehensive physics framework covering mechanical advantage, velocity ratio, efficiency (eta = MA/VR), lever classes, pulley dynamics, refraction laws, Snell\'s law, refractive index, TIR, lens optics (1/f = 1/v - 1/u), lens power (P = 1/f), dispersion, and the complete electromagnetic spectrum.',
  eli5: 'Simple machines let you trade distance for force, but friction always takes a tax. Light bends when slowing down in glass or water, can get trapped completely by total internal reflection, focuses through lenses to magnify tiny worlds, and splits into rainbow spectra through prisms.',
  misconceptions: [
    {
      misconception: 'Efficiency can be written as eta = (VR / MA) x 100%',
      correction: 'Because real machines have MA < VR due to friction, efficiency is always eta = (MA / VR) x 100% < 100%. MA goes on top.',
    },
    {
      misconception: 'A single fixed pulley halves the effort required to lift a load.',
      correction: 'A single fixed pulley has MA = 1 and VR = 1; it merely changes the direction of effort so you can pull downward with gravity.',
    },
    {
      misconception: 'When light enters glass, its frequency decreases along with its speed.',
      correction: 'Frequency is determined solely by the emitting source and remains constant across all media. Only wave speed and wavelength change: v = f * lambda.',
    },
    {
      misconception: 'The lens formula is 1/f = 1/u + 1/v.',
      correction: 'Under the Cartesian sign convention, the lens formula is 1/f = 1/v - 1/u. A real object has negative u, turning -1/u into a positive term.',
    },
    {
      misconception: 'The sky is blue because of prism dispersion of sunlight in the atmosphere.',
      correction: 'The blue sky is caused by Rayleigh scattering by gas molecules (intensity ~ 1/lambda^4), NOT dispersion by prisms or raindrops.',
    },
    {
      misconception: 'Total internal reflection occurs when light goes from air into denser glass at large angles.',
      correction: 'TIR can ONLY occur when light travels from an optically denser medium into a rarer medium (e.g. glass to air) with angle of incidence i > C.',
    },
  ],
  diagnosticQuestions: [
    { question: 'A machine has MA = 3 and VR = 4. What is its efficiency?', options: ['133%', '75%', '12%', '0.75%'], correctIndex: 1 },
    { question: 'Which lever class ALWAYS acts as a speed multiplier with MA < 1?', options: ['Class I', 'Class II', 'Class III', 'Both Class I and II'], correctIndex: 2 },
    { question: 'What is the velocity ratio (VR) of a block-and-tackle system with 5 pulleys?', options: ['2.5', '4', '5', '10'], correctIndex: 2 },
    { question: 'If water has u = 1.33, what is the apparent depth of a coin at a real depth of 4.0 m?', options: ['5.32 m', '3.01 m', '2.67 m', '1.33 m'], correctIndex: 1 },
    { question: 'What is the power of a convex lens with a focal length of +25 cm?', options: ['+0.04 D', '+4.0 D', '-4.0 D', '+25 D'], correctIndex: 1 },
    { question: 'Which colour of visible light experiences the largest deviation in a glass prism?', options: ['Red (700 nm)', 'Green (550 nm)', 'Yellow (580 nm)', 'Violet (400 nm)'], correctIndex: 3 },
    { question: 'Which radiation of the EM spectrum produces strong heating effects and is used in night-vision cameras?', options: ['Ultraviolet', 'Infrared', 'X-rays', 'Microwaves'], correctIndex: 1 },
    { question: 'What condition is mandatory for Total Internal Reflection to occur?', options: ['Light travels from rare to dense medium', 'Angle of incidence is less than critical angle', 'Light travels from dense to rare medium with i > C', 'Light travels parallel to the normal'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student scores >= 85% across all 10 CISCE physics competency domains, demonstrating mastery of mechanical systems, refraction dynamics, lens calculations, and electromagnetic spectra.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Mechanical Efficiency & Friction (eta = MA/VR)',
    instruction: 'Drag the friction slider and observe how useful work drops while Velocity Ratio (VR) stays constant.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_PHY_011,
  },
  {
    title: 'Lab 2: Lever Classes & Moment Equilibrium',
    instruction: 'Switch between Class I, II, and III levers. Shift the fulcrum to see how force vs speed multiplication trade off.',
    interactionType: 'click-parts',
    nodeId: NODE_C10_PHY_012,
  },
  {
    title: 'Lab 3: Snell\'s Law & Total Internal Reflection',
    instruction: 'Rotate the light ray beyond the critical angle (C = arcsin(1/u)) to trigger 100% Total Internal Reflection.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_PHY_016,
  },
  {
    title: 'Lab 4: Precision Lens Ray Tracer & Sign Convention',
    instruction: 'Move the object along the principal axis. Notice how real images invert (v > 0) and virtual magnifying images enlarge (v < 0).',
    interactionType: 'drag-position',
    nodeId: NODE_C10_PHY_017,
  },
  {
    title: 'Lab 5: Prism Dispersion & Electromagnetic Spectrum',
    instruction: 'Pass white light through the flint prism. Observe how refractive index varies with wavelength (VIBGYOR).',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_PHY_019,
  },
];

// ─── PREDICTION SCENARIOS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If you increase the friction in a 4-pulley system while lifting a constant 200 N load, what happens to the Velocity Ratio (VR)?',
    options: [
      'VR increases because the machine gets harder to pull',
      'VR decreases because friction wastes distance',
      'VR stays strictly at 4 because VR depends only on physical geometry',
      'VR becomes zero when efficiency drops below 50%',
    ],
    correctIndex: 2,
    verifyInstruction: 'Now move the friction slider in the lab. Watch the VR readout remain locked at 4 while MA decreases.',
    nodeId: NODE_C10_PHY_011,
  },
  {
    question: 'Prediction: If a ray of green light inside glass (u = 1.50, C = 41.8°) strikes the glass-air boundary at an incidence angle of 45°, what happens?',
    options: [
      'It refracts out into air at 90° along the boundary',
      'It totally internally reflects back into glass at 45° with 100% energy',
      'It gets absorbed completely by the glass surface',
      'It splits into yellow and blue components',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the incidence angle slider to 45°. Notice the refracted ray disappears and a crisp 100% reflected ray reflects at 45°!',
    nodeId: NODE_C10_PHY_016,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Rover Mission Diagnostic Report',
  description: 'Design the optical telemetry antenna and solar crane hoist for the Vikram-III lunar rover based on the physics principles mastered today.',
  steps: [
    'Calculate the required effort for a 6-pulley lunar crane operating at 85% efficiency to lift a 1200 N rock sample.',
    'Specify the critical angle of a quartz optical fibre (u = 1.46) to guarantee lossless laser transmission.',
    'Select a +5.0 D convex objective lens for the rover camera and calculate its focal length in cm.',
    'Explain why the lunar sky appears pitch black during the day (Hint: Absence of Rayleigh atmospheric scattering).',
  ],
};

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-7) ──
  {
    id: 'ch_f01',
    nodeId: NODE_C10_PHY_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the correct mathematical relationship connecting Mechanical Advantage (MA), Velocity Ratio (VR), and Efficiency (η)?',
    options: [
      'η = (VR / MA) × 100%',
      'η = (MA / VR) × 100%',
      'η = MA × VR × 100%',
      'η = (MA + VR) / 2',
    ],
    correctIndex: 1,
    explanation: 'Efficiency is defined as (Useful Work Output / Total Work Input) × 100% = (L × dL) / (E × dE) × 100% = (MA / VR) × 100%. For ideal machines η = 100% (MA = VR); for real machines MA < VR due to friction.',
    hints: [
      'Think about which ratio must be less than 100% in a real machine with friction.',
      'MA is reduced by friction, while VR is fixed by the machine\'s geometry.',
      'Since MA < VR, MA must be in the numerator: η = (MA / VR) × 100%.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C10_PHY_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In which class of lever is the LOAD (L) positioned strictly between the fulcrum (F) and the effort (E)?',
    options: [
      'Class I Lever (e.g., Crowbar, Scissors)',
      'Class II Lever (e.g., Wheelbarrow, Nutcracker)',
      'Class III Lever (e.g., Sugar Tongs, Human Forearm)',
      'Class IV Lever',
    ],
    correctIndex: 1,
    explanation: 'Remember the acronym "FLE 1-2-3": In Class I, Fulcrum is in the middle; in Class II, Load is in the middle; in Class III, Effort is in the middle. Class II always has effort arm > load arm, making MA > 1 (force multiplier).',
    hints: [
      'Use the standard mnemonic: F - L - E for classes 1 - 2 - 3.',
      'Which component is in the middle for number 2?',
      'Load in the middle = Class II (e.g., wheelbarrow where load rests between the wheel pivot and the handles).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C10_PHY_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary mechanical function of a Single Fixed Pulley (MA = 1, VR = 1)?',
    options: [
      'Multiplies the applied force by 2 times',
      'Multiplies the speed of lifting by 2 times',
      'Only changes the direction of the applied effort to a convenient direction (downwards)',
      'Eliminates all frictional losses to achieve 100% efficiency',
    ],
    correctIndex: 2,
    explanation: 'A single fixed pulley does not provide any force multiplication (MA = 1) or speed multiplication (VR = 1). Its sole advantage is enabling the operator to pull downwards (using body weight) rather than lifting directly upwards.',
    hints: [
      'Calculate MA = L / E = 1. Is any force multiplied?',
      'Think about whether pulling downward is easier than lifting directly upward.',
      'It simply redirects the force downwards without multiplying load capacity.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C10_PHY_014,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each optical term to its correct position on the glass block refraction diagram.',
    dragItems: [
      { label: 'Incident Ray', targetId: 'ray_inc' },
      { label: 'Lateral Shift', targetId: 'shift_lat' },
      { label: 'Emergent Ray', targetId: 'ray_em' },
      { label: 'Normal Line', targetId: 'line_norm' },
    ],
    correctMapping: {
      ray_inc: 'Incident Ray',
      shift_lat: 'Lateral Shift',
      ray_em: 'Emergent Ray',
      line_norm: 'Normal Line',
    },
    explanation: 'Light entering a parallel-sided glass block bends towards the normal at the first surface and away from the normal at the second surface. The emergent ray is parallel to the incident ray but displaced sideways by the lateral displacement.',
    hints: [
      'The incoming ray from air is the Incident Ray.',
      'The perpendicular dashed reference is the Normal Line.',
      'The ray exiting back into air is the Emergent Ray, and the perpendicular gap between original path and emergent path is Lateral Shift.',
    ],
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C10_PHY_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When yellow light of frequency 5.0 × 10¹⁴ Hz passes from air into water (u = 1.33), which property remains COMPLETELY UNCHANGED?',
    options: [
      'Wave speed (V)',
      'Wavelength (lambda)',
      'Frequency (f)',
      'Amplitude (A)',
    ],
    correctIndex: 2,
    explanation: 'Frequency of light depends exclusively on the atomic oscillations of the source and is strictly invariant during refraction across any boundary. Speed decreases (V = c/u) and wavelength shortens proportionally (lambda_m = lambda/u).',
    hints: [
      'Which property is fixed at the moment light is generated by its source?',
      'Does the color (frequency) of a laser change underwater?',
      'Frequency f remains constant. Speed and wavelength both decrease.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C10_PHY_018,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An optometrist prescribes a convex lens with a focal length of +50 cm for reading. Calculate the optical power of this lens in Dioptres (D).',
    correctAnswer: 2,
    tolerance: 0.1,
    unit: 'D',
    explanation: 'Power P = 1 / f(in metres). Convert focal length: +50 cm = +0.50 m. Therefore P = 1 / (+0.50) = +2.0 D. The positive sign denotes a converging (convex) lens.',
    hints: [
      'First convert focal length from centimetres to metres: 50 cm = ? m.',
      'Use the formula P = 1 / f (in metres).',
      'P = 1 / 0.5 = +2 D.',
    ],
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C10_PHY_019,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the visible spectrum colours in order of INCREASING deviation when dispersed by a triangular glass prism (least deviated first to most deviated last).',
    sortItems: ['Red (700 nm)', 'Yellow (580 nm)', 'Green (540 nm)', 'Violet (400 nm)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'In glass, red light has the longest wavelength, travels fastest, experiences the lowest refractive index (u_red < u_violet), and deviates least. Violet light has the shortest wavelength, travels slowest, and deviates most.',
    hints: [
      'Red has the longest wavelength and bends the least.',
      'Violet has the shortest wavelength and bends the sharpest.',
      'Order from least bent to most bent: Red -> Yellow -> Green -> Violet.',
    ],
  },

  // ── STANDARD TIER (8-15) ──
  {
    id: 'ch_s01',
    nodeId: NODE_C10_PHY_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A mechanical crane system with Velocity Ratio VR = 5 has an efficiency of 80%. What load (in Newtons) can it lift when an effort of 60 N is applied?',
    correctAnswer: 240,
    tolerance: 2,
    unit: 'N',
    explanation: 'Actual MA = (η / 100) × VR = (80 / 100) × 5 = 4.0. Since MA = Load / Effort, Load = MA × Effort = 4.0 × 60 N = 240 N.',
    hints: [
      'Calculate the actual Mechanical Advantage first: MA = (η × VR) / 100.',
      'MA = 0.80 × 5 = 4.0.',
      'Load = MA × Effort = 4.0 × 60 N = 240 N.',
    ],
  },
  {
    id: 'ch_s02',
    nodeId: NODE_C10_PHY_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the human forearm classified as a Class III lever, and what mechanical advantage does it offer to biological motion?',
    options: [
      'Fulcrum is in middle; it acts as a high-power force multiplier (MA > 5)',
      'Biceps effort is inserted between the elbow fulcrum and hand load; MA < 1, which acts as a speed and displacement multiplier',
      'Hand load is in middle; MA > 1, lifting heavy weights with tiny muscular effort',
      'It has no mechanical advantage or speed advantage',
    ],
    correctIndex: 1,
    explanation: 'In the forearm, the fulcrum is at the elbow joint, the biceps muscle exerts effort just past the elbow, and the load is in the hand. Because effort is between fulcrum and load, it is Class III. Effort arm < load arm, so MA < 1. Although the muscle must exert large force, a tiny contraction moves the hand rapidly through a wide arc.',
    hints: [
      'Identify where the biceps tendon connects relative to the elbow pivot and the hand.',
      'Effort is in the middle -> Class III.',
      'Class III levers sacrifice force to gain speed and reach of movement.',
    ],
  },
  {
    id: 'ch_s03',
    nodeId: NODE_C10_PHY_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A block-and-tackle system has 4 pulleys. An effort of 150 N lifts a load of 480 N by 2.0 m. Calculate the work wasted against friction (in Joules).',
    correctAnswer: 240,
    tolerance: 5,
    unit: 'J',
    explanation: 'For 4 pulleys, VR = 4. Effort distance dE = VR × dL = 4 × 2.0 m = 8.0 m. Work Input = Effort × dE = 150 N × 8.0 m = 1200 J. Useful Work Output = Load × dL = 480 N × 2.0 m = 960 J. Wasted Work = 1200 J - 960 J = 240 J.',
    hints: [
      'Find the effort distance: dE = VR × dL = 4 × 2 m = 8 m.',
      'Calculate Total Work Input = E × dE = 150 × 8 J, and Useful Work Output = L × dL = 480 × 2 J.',
      'Wasted Work = Work Input - Work Output = 1200 J - 960 J = 240 J.',
    ],
  },
  {
    id: 'ch_s04',
    nodeId: NODE_C10_PHY_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A rover camera views an optical marker at the bottom of a liquid hydrocarbon tank (u = 1.40). If the tank\'s real depth is 2.80 m, what is the apparent depth (in metres)?',
    correctAnswer: 2.0,
    tolerance: 0.05,
    unit: 'm',
    explanation: 'Apparent Depth = Real Depth / Refractive Index (u) = 2.80 m / 1.40 = 2.00 m. Refraction away from the normal as light exits into air creates a virtual image raised by 0.80 m.',
    hints: [
      'Use the formula: Apparent Depth = Real Depth / u.',
      'Substitute Real Depth = 2.80 and u = 1.40.',
      '2.80 / 1.40 = 2.00 m.',
    ],
  },
  {
    id: 'ch_s06',
    nodeId: NODE_C10_PHY_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An illuminated object is placed 30 cm in front of a convex lens with a focal length of +20 cm. Using the Cartesian sign convention (1/f = 1/v - 1/u with u = -30 cm), find the image distance v (in cm).',
    correctAnswer: 60,
    tolerance: 1,
    unit: 'cm',
    explanation: 'Lens formula: 1/f = 1/v - 1/u. Here f = +20 cm, u = -30 cm. 1/20 = 1/v - 1/(-30) => 1/20 = 1/v + 1/30 => 1/v = 1/20 - 1/30 = (3 - 2)/60 = 1/60. Thus v = +60 cm (real, inverted image formed 60 cm behind the lens).',
    hints: [
      'Set u = -30 cm and f = +20 cm.',
      'Rearrange: 1/v = 1/f + 1/u = 1/20 + 1/(-30) = 1/20 - 1/30.',
      '1/v = (3 - 2)/60 = 1/60, so v = +60 cm.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_s07',
    nodeId: NODE_C10_PHY_020,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the electromagnetic radiation to its primary diagnostic or industrial application based on physical properties.',
    options: [
      'Infrared: Thermal night vision & remote controls; Ultraviolet: Water purification & counterfeit note detection',
      'Infrared: Sterilising surgical scalpels; Ultraviolet: Cooking food in ovens',
      'Infrared: Radio broadcasting; Ultraviolet: Long distance radar',
      'Infrared: Nuclear medicine; Ultraviolet: Submarine sound signalling',
    ],
    correctIndex: 0,
    explanation: 'Infrared produces heating effects and penetrates haze/darkness for thermal imaging and short-range remote controls. Ultraviolet carries higher photon energy that destroys microbial DNA for sterilisation and excites fluorescence in counterfeit currency security dyes.',
    hints: [
      'Which radiation is associated with heat detection and remote controls?',
      'Which higher-energy radiation causes chemical and fluorescent effects to kill germs?',
      'IR = Heat & Thermal Vision; UV = Germicidal sterilization & Currency Fluorescence.',
    ],
  },
  {
    id: 'ch_s08',
    nodeId: NODE_C10_PHY_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why does the midday sky on Earth appear blue while clouds appear white, and what accounts for this difference?',
    options: [
      'Sky: Rayleigh scattering by gas molecules (d << lambda, blue scatters 16x more than red); Clouds: Large water droplets (d >> lambda) scatter all wavelengths equally',
      'Sky: Atmospheric prism dispersion; Clouds: Total internal reflection in ice crystals',
      'Sky: Reflection off ocean water; Clouds: Absorption of ultraviolet light',
      'Sky: Doppler shift of sunlight; Clouds: Atmospheric diffraction only',
    ],
    correctIndex: 0,
    explanation: 'Air molecules are much smaller than visible light wavelengths (d << lambda), causing Rayleigh scattering where intensity ~ 1/lambda^4 (short blue/violet waves scatter 16 times more intensely than red). Cloud droplets are much larger than light wavelengths (d >> lambda), causing non-selective uniform scattering of all visible colors together, producing white light.',
    hints: [
      'Consider the size of gas molecules vs the size of cloud droplets relative to light wavelength.',
      'Rayleigh scattering law: Scattering intensity is proportional to 1 / lambda^4.',
      'Small particles scatter blue preferentially; large droplets scatter all colors equally into white.',
    ],
    misconceptionIndex: 4,
  },

  // ── ADVANCED TIER (16-22) ──
  {
    id: 'ch_a01',
    nodeId: NODE_C10_PHY_011,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the algebraic derivation steps that prove η = (MA / VR) × 100% from first physical principles of Work.',
    availableParts: [
      'W_out = L × dL',
      'W_in = E × dE',
      'η = (W_out / W_in) × 100%',
      'η = (L/E) × (dL/dE) × 100%',
      'Substitute MA=L/E and 1/VR=dL/dE',
      'η = (MA / VR) × 100%',
    ],
    targetState: 'W_out = L × dL W_in = E × dE η = (W_out / W_in) × 100% η = (L/E) × (dL/dE) × 100% Substitute MA=L/E and 1/VR=dL/dE η = (MA / VR) × 100%',
    validationHint: 'Click all 6 steps in logical sequence from definitions of work to final formula.',
    explanation: 'Useful work output is L × dL and total work input is E × dE. Dividing them gives η = (L/E) × (dL/dE) × 100%. Substituting MA = L/E and VR = dE/dL (so dL/dE = 1/VR) yields η = (MA / VR) × 100%.',
    hints: [
      'Start with the definition of Work Output and Work Input.',
      'Then express efficiency as their ratio.',
      'Regroup terms into (L/E) and (dL/dE), then substitute MA and 1/VR.',
    ],
  },
  {
    id: 'ch_a02',
    nodeId: NODE_C10_PHY_015,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Light of wavelength 600 nm in air enters a flint glass prism of refractive index u = 1.60. Calculate the wavelength of this light INSIDE the glass (in nanometres).',
    correctAnswer: 375,
    tolerance: 2,
    unit: 'nm',
    explanation: 'Because frequency f is constant, u = c / V = (f × lambda_air) / (f × lambda_glass) = lambda_air / lambda_glass. Therefore lambda_glass = lambda_air / u = 600 nm / 1.60 = 375 nm.',
    hints: [
      'Recall that refractive index relates wavelengths: u = lambda_air / lambda_medium.',
      'Rearrange for lambda_glass = lambda_air / u.',
      'lambda_glass = 600 / 1.60 = 375 nm.',
    ],
  },
  {
    id: 'ch_a03',
    nodeId: NODE_C10_PHY_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The refractive index of an optical core in a submarine fibre cable is u = 1.414 (sqrt(2)). Calculate the Critical Angle C (in degrees) for total internal reflection against an air cladding.',
    correctAnswer: 45,
    tolerance: 0.5,
    unit: '°',
    explanation: 'From Snell\'s law at the grazing angle of refraction (r = 90°): sin C = 1 / u = 1 / 1.4142 = 0.7071. Thus Critical Angle C = arcsin(0.7071) = 45.0°.',
    hints: [
      'Use the formula sin C = 1 / u.',
      'sin C = 1 / 1.414 = 0.7071.',
      'arcsin(0.7071) = 45°.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_a04',
    nodeId: NODE_C10_PHY_017,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student places a postage stamp 8.0 cm in front of a convex lens with focal length +12.0 cm to use it as a magnifying glass. Describe the nature, location, and magnification of the resulting image.',
    options: [
      'Virtual, erect, magnified (m = +3.0) formed at v = -24.0 cm on the same side as the object',
      'Real, inverted, diminished (m = -0.5) formed at v = +24.0 cm on the opposite side',
      'Virtual, inverted, same size (m = -1.0) formed at infinity',
      'Real, erect, magnified (m = +1.5) formed at v = +12.0 cm',
    ],
    correctIndex: 0,
    explanation: 'Here u = -8.0 cm, f = +12.0 cm. 1/v = 1/f + 1/u = 1/12 - 1/8 = (2 - 3)/24 = -1/24 => v = -24.0 cm. Negative v indicates a virtual image on the same side as the object. Linear magnification m = v / u = (-24.0) / (-8.0) = +3.0 (erect and magnified 3x).',
    hints: [
      'Substitute u = -8 cm and f = +12 cm into 1/v = 1/f + 1/u.',
      '1/v = 1/12 - 1/8 = -1/24, so v = -24 cm.',
      'Magnification m = v / u = -24 / -8 = +3.0 (virtual, erect, magnified).',
    ],
  },
  {
    id: 'ch_a05',
    nodeId: NODE_C10_PHY_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A thin concave lens used for correcting severe myopia has a focal length of -20 cm. Calculate its optical power in Dioptres (include the minus sign).',
    correctAnswer: -5,
    tolerance: 0.1,
    unit: 'D',
    explanation: 'Convert focal length to metres with Cartesian sign: f = -20 cm = -0.20 m. Power P = 1 / f = 1 / (-0.20) = -5.0 D. The negative sign signifies a diverging (concave) lens.',
    hints: [
      'Convert -20 cm to metres: f = -0.20 m.',
      'Power P = 1 / f.',
      'P = 1 / (-0.20) = -5.0 D.',
    ],
  },
  {
    id: 'ch_a06',
    nodeId: NODE_C10_PHY_020,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the following electromagnetic spectrum bands in order of INCREASING PHOTON ENERGY / FREQUENCY (lowest energy first to highest energy last).',
    sortItems: ['Radio Waves', 'Microwaves', 'Infrared', 'Visible Light', 'Ultraviolet', 'X-rays', 'Gamma Rays'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    explanation: 'Photon energy E = h*f and frequency f are inversely proportional to wavelength (c = f*lambda). The order of increasing frequency and photon energy is: Radio -> Microwave -> Infrared -> Visible -> Ultraviolet -> X-rays -> Gamma Rays.',
    hints: [
      'Radio waves have kilometer-long wavelengths and the lowest energy.',
      'Gamma rays have sub-picometer wavelengths, highest frequency, and highest penetrating energy.',
      'Mnemonic: Radio -> Micro -> IR -> Visible -> UV -> X-ray -> Gamma.',
    ],
  },
  {
    id: 'ch_a07',
    nodeId: NODE_C10_PHY_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A diver with a speargun aims at a fish resting at real depth H underwater. Due to refraction at the water-air interface, how should the diver aim to hit the fish?',
    options: [
      'Aim directly at the apparent image of the fish',
      'Aim slightly BELOW the apparent image of the fish because real depth is greater than apparent depth',
      'Aim slightly ABOVE the apparent image of the fish because apparent depth is greater',
      'Aim 45° away to account for dispersion',
    ],
    correctIndex: 1,
    explanation: 'Refraction away from the normal makes the fish appear raised at an Apparent Depth = Real Depth / 1.33. The virtual image seen by the diver is higher up in the water than the fish\'s true physical location. Therefore, the diver must aim BELOW the observed image.',
    hints: [
      'Apparent depth is LESS than real depth (water appears shallower).',
      'The actual fish is physically deeper down than where its image appears.',
      'To hit the real fish, aim below the virtual image.',
    ],
  },
];

// ─── MAIN REACT COMPONENT ───
function C10_PhysicsEfficiencyMachinesetaSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_PHY_011,
  title = DEFAULT_PROPS.title || 'Physics Mastery Simulation',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚛️', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org style states
  const [predictionMade, setPredictionMade] = useState(false);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Observation question states
  const [observedAnswers, setObservedAnswers] = useState<Record<string, number>>({});
  const [observedSubmitted, setObservedSubmitted] = useState<Record<string, boolean>>({});

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Interactive Machine Lab states
  const [frictionPercent, setFrictionPercent] = useState(20);
  const [appliedEffort, setAppliedEffort] = useState(50);
  const [pulleyCount, setPulleyCount] = useState(4);
  const [leverClass, setLeverClass] = useState<'I' | 'II' | 'III'>('I');
  const [leverFulcrumPos, setLeverFulcrumPos] = useState(50);
  const [leverLoadPos, setLeverLoadPos] = useState(20);
  const [leverEffortPos, setLeverEffortPos] = useState(90);
  const [leverLoadWeight, setLeverLoadWeight] = useState(100);

  // Interactive Optics Lab states
  const [incidenceAngle, setIncidenceAngle] = useState(30);
  const [selectedMedium, setSelectedMedium] = useState<'water' | 'crown_glass' | 'flint_glass' | 'diamond'>('crown_glass');
  const [lensType, setLensType] = useState<'convex' | 'concave'>('convex');
  const [lensFocalLength, setLensFocalLength] = useState(20);
  const [lensObjectDistance, setLensObjectDistance] = useState(35);
  const [lensObjectHeight, setLensObjectHeight] = useState(10);
  const [emWavelengthExp, setEmWavelengthExp] = useState(-7);

  // Drag-and-drop & sorting states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref & auto-hint timer
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED MACHINE CALCULATIONS ───
  const machineVR = pulleyCount;
  const machineEfficiency = Math.max(10, 100 - frictionPercent);
  const machineMA = (machineEfficiency / 100) * machineVR;
  const maxLoadLifted = machineMA * appliedEffort;
  const workInput = appliedEffort * machineVR;
  const workOutput = (machineMA * appliedEffort) * 1.0;
  const workLostToFriction = workInput - workOutput;

  // Lever calculations
  const effortArm = Math.abs(leverEffortPos - leverFulcrumPos);
  const loadArm = Math.abs(leverLoadPos - leverFulcrumPos);
  const leverMA = loadArm > 0 ? effortArm / loadArm : 1;
  const leverRequiredEffort = leverMA > 0 ? leverLoadWeight / leverMA : leverLoadWeight;

  // Optics calculations
  const currentMediumIndex = useMemo(() => {
    switch (selectedMedium) {
      case 'water': return 1.33;
      case 'crown_glass': return 1.50;
      case 'flint_glass': return 1.62;
      case 'diamond': return 2.42;
      default: return 1.50;
    }
  }, [selectedMedium]);

  const criticalAngleDeg = useMemo(() => {
    return (Math.asin(1 / currentMediumIndex) * 180) / Math.PI;
  }, [currentMediumIndex]);

  const isTIR = incidenceAngle > criticalAngleDeg;
  const refractionAngleDeg = useMemo(() => {
    if (isTIR) return 90;
    const sinR = Math.sin((incidenceAngle * Math.PI) / 180) / currentMediumIndex;
    return (Math.asin(Math.min(1, Math.max(0, sinR))) * 180) / Math.PI;
  }, [incidenceAngle, currentMediumIndex, isTIR]);

  // Lens calculations
  const lensSignedF = lensType === 'convex' ? lensFocalLength : -lensFocalLength;
  const lensSignedU = -lensObjectDistance;
  const lensSignedV = useMemo(() => {
    const invV = (1 / lensSignedF) + (1 / lensSignedU);
    if (Math.abs(invV) < 0.0001) return 9999;
    return 1 / invV;
  }, [lensSignedF, lensSignedU]);

  const lensMagnification = useMemo(() => {
    return lensSignedV / lensSignedU;
  }, [lensSignedV, lensSignedU]);

  const lensImageHeight = useMemo(() => {
    return lensObjectHeight * lensMagnification;
  }, [lensObjectHeight, lensMagnification]);

  const lensPowerDioptres = useMemo(() => {
    return (1 / (lensSignedF / 100)).toFixed(2);
  }, [lensSignedF]);

  // ─── FILTER CHALLENGES BY ADAPTIVE DIFFICULTY ───
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

  // ─── BKT ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner'
      ? 'foundation'
      : mastery === 'developing'
      ? 'standard'
      : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
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
      setShowExplanation(true);
      setShowHint(false);
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

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallenge]);

  // ─── DISCOVERY & PHASE ADVANCE HANDLERS ───
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
    speechManager.speak('Welcome to the interactive physics laboratory. Move the controls to discover how machines and light behave.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test any lever arm, pulley load, or lens focal length with zero time pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission calibration challenges initiated. Let us test your physics mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction. Now test the live controls to verify!');
  }, []);

  const handleObservationSubmit = useCallback((qId: string, optionIdx: number, correctIdx: number) => {
    setObservedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setObservedSubmitted(prev => ({ ...prev, [qId]: true }));
    if (optionIdx === correctIdx) {
      audioManager.play('success');
      speechManager.speak('Sharp observation! Your scientific analysis is accurate.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Take another close look at the visualization parameters.');
    }
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission accomplished! You achieved a mastery rating of ${finalScore} percent.`);
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

  // ─── ANSWER VALIDATION HANDLER ───
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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete step-by-step physical solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── DRAG & SORT HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
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
      const initial = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = initial.splice(fromIndex, 1);
      initial.splice(toIndex, 0, moved);
      return initial;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── 2D CANVAS ANIMATION LOOP ───
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

      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x * 0.05) - (frame * 0.04)) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulseX = (frame * 2) % canvas.width;
      const pulseY = canvas.height / 2 + Math.sin((pulseX * 0.05) - (frame * 0.04)) * 12;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            className="p-3 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                ICSE Class 10 Physics
              </span>
              <span className="text-xs text-slate-400">Nodes c10_phy_011 — c10_phy_020</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              {title}
            </h1>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider border shadow-sm ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50'
                : difficulty === 'standard'
                ? 'bg-sky-950/60 text-sky-300 border-sky-600/50'
                : 'bg-purple-950/60 text-purple-300 border-purple-600/50'
            }`}
          >
            {difficulty} Tier
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3.5 py-1.5 bg-slate-900 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300"
          >
            Score: <span className="text-amber-400 font-bold">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
          </motion.div>
        </div>
      </motion.header>

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
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/40 shadow-xl"
            >
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold tracking-wide uppercase mb-1">
                <span>🚀</span> Mission Scenario Hook
              </div>
              <h2 className="text-2xl font-extrabold text-white">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-indigo-300/90 mt-2 bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800/40">
                💡 {SCENARIO.context}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg text-xs font-bold">PRE-LAB QUESTION</span>
                <h3 className="text-base font-semibold text-white">Test your physical intuition before experimenting</h3>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`text-left p-3.5 rounded-xl text-sm transition-all border ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                        : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-indigo-500/50'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-lg bg-slate-950 text-center leading-6 text-xs font-bold mr-2 text-indigo-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && <span className="mr-1 text-emerald-400">✓</span>}
                    {discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex && <span className="mr-1 text-rose-400">✗</span>}
                    {option}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-medium' : 'text-amber-400'}`}>
                    {discoveryCorrect
                      ? '✓ Spot on! Velocity ratio is fixed by geometry, while friction reduces MA.'
                      : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    aria-label="Enter Interactive Labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Progress stepper */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Go to ${step.title}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex-1 min-w-[120px] p-2 rounded-xl text-xs font-bold transition-all border text-left ${
                    currentSlide === idx
                      ? 'bg-indigo-950 border-indigo-500 text-white shadow-md shadow-indigo-950'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-indigo-400 uppercase">Step {idx + 1}</div>
                  <div className="truncate">{step.title.split(':')[0]}</div>
                </motion.button>
              ))}
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
                  <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-bold">
                    {EXPLORATION_STEPS[currentSlide].nodeId}
                  </span>
                  <h2 className="text-xl font-extrabold text-white mt-1">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h2>
                  <p className="text-amber-300/90 text-sm mt-1">
                    👉 {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>

                {/* ── LAB 1: MACHINES & EFFICIENCY ── */}
                {currentSlide === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                        <svg viewBox="0 0 400 280" className="w-full max-w-md h-auto" role="img" aria-label="Pulley System Mechanics Diagram">
                          <rect width="400" height="280" rx="12" fill="#020617" />
                          <rect x="50" y="20" width="300" height="14" rx="4" fill="#334155" />
                          <line x1="80" y1="20" x2="80" y2="40" stroke="#64748b" strokeWidth="3" />
                          <line x1="160" y1="20" x2="160" y2="40" stroke="#64748b" strokeWidth="3" />

                          <circle cx="80" cy="55" r="18" fill="#1e293b" stroke="#6366f1" strokeWidth="3" />
                          <circle cx="160" cy="55" r="18" fill="#1e293b" stroke="#6366f1" strokeWidth="3" />

                          <g transform={`translate(0, ${50 + frictionPercent * 0.4})`}>
                            <circle cx="80" cy="140" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
                            <circle cx="160" cy="140" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
                            <rect x="65" y="155" width="110" height="12" rx="3" fill="#475569" />

                            <rect x="80" y="175" width="80" height="40" rx="6" fill="#f59e0b" />
                            <text x="120" y="200" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
                              Load: {maxLoadLifted.toFixed(0)} N
                            </text>
                          </g>

                          <line x1="80" y1="55" x2="80" y2={190 + frictionPercent * 0.4} stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="4 2" />
                          <line x1="98" y1="55" x2="98" y2={190 + frictionPercent * 0.4} stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="4 2" />
                          <line x1="160" y1="55" x2="160" y2={190 + frictionPercent * 0.4} stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="4 2" />
                          <line x1="178" y1="55" x2="178" y2={190 + frictionPercent * 0.4} stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="4 2" />

                          <line x1="178" y1="55" x2="320" y2="180" stroke="#e2e8f0" strokeWidth="2.5" />
                          <g transform="translate(320, 180)">
                            <circle cx="0" cy="0" r="14" fill="#6366f1" />
                            <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
                              {appliedEffort}N
                            </text>
                            <path d="M 0 16 L 0 35 M -5 28 L 0 35 L 5 28" stroke="#6366f1" strokeWidth="2.5" fill="none" />
                          </g>
                        </svg>

                        <div className="w-full grid grid-cols-3 gap-2 mt-3 text-center">
                          <motion.div whileHover={{ scale: 1.03 }} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                            <div className="text-[10px] text-slate-400">Velocity Ratio (VR)</div>
                            <div className="text-sm font-bold text-sky-400">{machineVR} (Fixed)</div>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.03 }} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                            <div className="text-[10px] text-slate-400">Mechanical Adv (MA)</div>
                            <div className="text-sm font-bold text-amber-400">{machineMA.toFixed(2)}</div>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.03 }} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                            <div className="text-[10px] text-slate-400">Efficiency (η)</div>
                            <div className="text-sm font-bold text-emerald-400">{machineEfficiency}%</div>
                          </motion.div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-4">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                          <div>
                            <div className="flex justify-between text-xs font-semibold mb-1">
                              <span className="text-slate-300">Bearing Friction Loss:</span>
                              <span className="text-rose-400 font-bold">{frictionPercent}%</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={60}
                              aria-label="Bearing Friction Loss"
                              value={frictionPercent}
                              onChange={e => {
                                setFrictionPercent(Number(e.target.value));
                                audioManager.play('count');
                              }}
                              className="w-full accent-rose-500 cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-semibold mb-1">
                              <span className="text-slate-300">Applied Effort:</span>
                              <span className="text-indigo-400 font-bold">{appliedEffort} N</span>
                            </div>
                            <input
                              type="range"
                              min={20}
                              max={150}
                              aria-label="Applied Effort"
                              value={appliedEffort}
                              onChange={e => {
                                setAppliedEffort(Number(e.target.value));
                                audioManager.play('count');
                              }}
                              className="w-full accent-indigo-500 cursor-pointer"
                            />
                          </div>

                          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1 text-xs">
                            <div className="flex justify-between text-slate-400">
                              <span>Total Work Input:</span>
                              <span className="font-mono text-white">{workInput.toFixed(0)} J</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>Useful Work Output:</span>
                              <span className="font-mono text-emerald-400">{workOutput.toFixed(0)} J</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>Energy Lost to Heat:</span>
                              <span className="font-mono text-rose-400">{workLostToFriction.toFixed(0)} J</span>
                            </div>
                          </div>
                        </motion.div>

                        {/* Prediction Trigger */}
                        {!predictionMade ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3.5 bg-indigo-950/50 rounded-xl border border-indigo-700/50 space-y-2">
                            <p className="text-xs font-semibold text-indigo-200">{PREDICTION_QUESTIONS[0].question}</p>
                            {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                aria-label={`Prediction option ${i + 1}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handlePrediction(i)}
                                className="w-full text-left p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700/70"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700/50 text-xs text-emerald-300">
                            ✓ Prediction locked! Notice how moving the friction slider changes MA and load lifted, but VR remains exactly 4.
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Brilliant.org Pattern: Observation Question 1 */}
                    <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-700/40 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          🔍 WHAT DO YOU NOTICE? (Observation)
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white">{OBSERVATION_QUESTIONS[0].prompt}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, optIdx) => (
                          <motion.button
                            key={optIdx}
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            onClick={() => handleObservationSubmit(OBSERVATION_QUESTIONS[0].id, optIdx, OBSERVATION_QUESTIONS[0].correctIndex)}
                            className={`p-3 rounded-xl text-left text-xs transition-all border ${
                              observedSubmitted[OBSERVATION_QUESTIONS[0].id]
                                ? optIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                                  : observedAnswers[OBSERVATION_QUESTIONS[0].id] === optIdx
                                  ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                  : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-60'
                                : 'bg-slate-950/80 hover:bg-slate-800 border-slate-700/70 text-slate-200'
                            }`}
                          >
                            <span className="font-bold mr-2 text-indigo-300">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                      {observedSubmitted[OBSERVATION_QUESTIONS[0].id] && (
                        <p className="text-xs text-indigo-300 bg-indigo-950/80 p-3 rounded-xl border border-indigo-700/40 mt-2">
                          💡 <strong>Physical Insight:</strong> {OBSERVATION_QUESTIONS[0].explanation}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── LAB 2: LEVER CLASSES ── */}
                {currentSlide === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex gap-2">
                      {(['I', 'II', 'III'] as const).map(cls => (
                        <motion.button
                          key={cls}
                          aria-label={`Select Class ${cls} Lever`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setLeverClass(cls);
                            if (cls === 'I') {
                              setLeverFulcrumPos(50);
                              setLeverLoadPos(20);
                              setLeverEffortPos(90);
                            } else if (cls === 'II') {
                              setLeverFulcrumPos(10);
                              setLeverLoadPos(50);
                              setLeverEffortPos(95);
                            } else {
                              setLeverFulcrumPos(10);
                              setLeverEffortPos(50);
                              setLeverLoadPos(95);
                            }
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                            leverClass === cls
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-900'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          Class {cls} Lever
                        </motion.button>
                      ))}
                    </div>

                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 500 160" className="w-full h-auto" role="img" aria-label="Lever Equilibrium Diagram">
                        <rect x="40" y="70" width="420" height="10" rx="3" fill="#64748b" />
                        <polygon
                          points={`${40 + leverFulcrumPos * 4.2},80 ${30 + leverFulcrumPos * 4.2},115 ${50 + leverFulcrumPos * 4.2},115`}
                          fill="#6366f1"
                        />
                        <text x={40 + leverFulcrumPos * 4.2} y="130" textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="bold">
                          Fulcrum (F)
                        </text>

                        <rect x={25 + leverLoadPos * 4.2} y="40" width="30" height="30" rx="4" fill="#f59e0b" />
                        <text x={40 + leverLoadPos * 4.2} y="60" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
                          {leverLoadWeight}N
                        </text>
                        <text x={40 + leverLoadPos * 4.2} y="32" textAnchor="middle" fill="#fbbf24" fontSize="10">
                          Load (L)
                        </text>

                        <g transform={`translate(${40 + leverEffortPos * 4.2}, 75)`}>
                          <line x1="0" y1="0" x2="0" y2="40" stroke="#22c55e" strokeWidth="3" />
                          <polygon points="0,45 -5,35 5,35" fill="#22c55e" />
                          <text x="0" y="60" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">
                            E = {leverRequiredEffort.toFixed(1)}N
                          </text>
                        </g>
                      </svg>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400">Effort Arm</div>
                          <div className="text-sm font-bold text-emerald-400">{effortArm.toFixed(0)} cm</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400">Load Arm</div>
                          <div className="text-sm font-bold text-amber-400">{loadArm.toFixed(0)} cm</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400">Mechanical Adv (MA)</div>
                          <div className="text-sm font-bold text-sky-400">{leverMA.toFixed(2)}</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400">Classification Role</div>
                          <div className="text-xs font-bold text-purple-400">
                            {leverMA > 1 ? 'Force Multiplier' : leverMA < 1 ? 'Speed Multiplier' : 'Direction Change'}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── LAB 3: REFRACTION & CRITICAL ANGLE (TIR) ── */}
                {currentSlide === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <svg viewBox="0 0 400 280" className="w-full h-auto" role="img" aria-label="TIR Refraction Diagram">
                          <rect x="20" y="140" width="360" height="120" fill="rgba(30, 58, 138, 0.4)" stroke="#3b82f6" strokeWidth="1.5" rx="6" />
                          <text x="40" y="170" fill="#93c5fd" fontSize="11" fontWeight="bold">
                            {selectedMedium.replace('_', ' ').toUpperCase()} (u = {currentMediumIndex})
                          </text>
                          <text x="40" y="125" fill="#94a3b8" fontSize="11">
                            Air (u = 1.00)
                          </text>

                          <line x1="20" y1="140" x2="380" y2="140" stroke="#60a5fa" strokeWidth="2" />
                          <line x1="200" y1="30" x2="200" y2="250" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />

                          {(() => {
                            const radI = (incidenceAngle * Math.PI) / 180;
                            const startX = 200 - Math.sin(radI) * 100;
                            const startY = 140 + Math.cos(radI) * 100;
                            return (
                              <line x1={startX} y1={startY} x2="200" y2="140" stroke="#f59e0b" strokeWidth="3" />
                            );
                          })()}

                          {!isTIR ? (
                            (() => {
                              const radR = (refractionAngleDeg * Math.PI) / 180;
                              const endX = 200 + Math.sin(radR) * 100;
                              const endY = 140 - Math.cos(radR) * 100;
                              return (
                                <line x1="200" y1="140" x2={endX} y2={endY} stroke="#22c55e" strokeWidth="3" />
                              );
                            })()
                          ) : (
                            (() => {
                              const radI = (incidenceAngle * Math.PI) / 180;
                              const endX = 200 + Math.sin(radI) * 100;
                              const endY = 140 + Math.cos(radI) * 100;
                              return (
                                <g>
                                  <line x1="200" y1="140" x2={endX} y2={endY} stroke="#ef4444" strokeWidth="3.5" />
                                  <text x="210" y="190" fill="#f87171" fontSize="11" fontWeight="bold">
                                    100% Total Internal Reflection!
                                  </text>
                                </g>
                              );
                            })()
                          )}
                        </svg>
                      </div>

                      <div className="lg:col-span-5 space-y-4">
                        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                          <div>
                            <label className="text-xs text-slate-300 font-semibold" htmlFor="medium-select">Select Denser Medium:</label>
                            <select
                              id="medium-select"
                              aria-label="Select Denser Optical Medium"
                              value={selectedMedium}
                              onChange={e => {
                                setSelectedMedium(e.target.value as 'water' | 'crown_glass' | 'flint_glass' | 'diamond');
                                audioManager.play('pop');
                              }}
                              className="w-full mt-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                            >
                              <option value="water">Water (u = 1.33)</option>
                              <option value="crown_glass">Crown Glass (u = 1.50)</option>
                              <option value="flint_glass">Flint Glass (u = 1.62)</option>
                              <option value="diamond">Diamond (u = 2.42)</option>
                            </select>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-semibold mb-1">
                              <span className="text-slate-300">Angle of Incidence (i):</span>
                              <span className="text-amber-400 font-bold">{incidenceAngle}°</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={75}
                              aria-label="Angle of Incidence in degrees"
                              value={incidenceAngle}
                              onChange={e => {
                                setIncidenceAngle(Number(e.target.value));
                                audioManager.play('count');
                              }}
                              className="w-full accent-amber-500 cursor-pointer"
                            />
                          </div>

                          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1 text-xs">
                            <div className="flex justify-between text-slate-400">
                              <span>Critical Angle (C = arcsin 1/u):</span>
                              <span className="font-mono text-indigo-300 font-bold">{criticalAngleDeg.toFixed(1)}°</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>Refraction Angle (r):</span>
                              <span className="font-mono text-emerald-400">{isTIR ? 'No transmission (90°+)' : `${refractionAngleDeg.toFixed(1)}°`}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>State:</span>
                              <span className={`font-bold ${isTIR ? 'text-rose-400' : 'text-emerald-400'}`}>
                                {isTIR ? '✗ Total Internal Reflection' : '✓ Standard Refraction'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Brilliant.org Pattern: Observation Question 2 */}
                    <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-700/40 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          🔍 WHAT DO YOU NOTICE? (Observation)
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white">{OBSERVATION_QUESTIONS[1].prompt}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, optIdx) => (
                          <motion.button
                            key={optIdx}
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            onClick={() => handleObservationSubmit(OBSERVATION_QUESTIONS[1].id, optIdx, OBSERVATION_QUESTIONS[1].correctIndex)}
                            className={`p-3 rounded-xl text-left text-xs transition-all border ${
                              observedSubmitted[OBSERVATION_QUESTIONS[1].id]
                                ? optIdx === OBSERVATION_QUESTIONS[1].correctIndex
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                                  : observedAnswers[OBSERVATION_QUESTIONS[1].id] === optIdx
                                  ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                  : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-60'
                                : 'bg-slate-950/80 hover:bg-slate-800 border-slate-700/70 text-slate-200'
                            }`}
                          >
                            <span className="font-bold mr-2 text-indigo-300">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                      {observedSubmitted[OBSERVATION_QUESTIONS[1].id] && (
                        <p className="text-xs text-indigo-300 bg-indigo-950/80 p-3 rounded-xl border border-indigo-700/40 mt-2">
                          💡 <strong>Physical Insight:</strong> {OBSERVATION_QUESTIONS[1].explanation}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── LAB 4: LENS RAY TRACER & SIGN CONVENTION ── */}
                {currentSlide === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex gap-2">
                      <motion.button
                        aria-label="Select Convex Lens"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setLensType('convex');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                          lensType === 'convex'
                            ? 'bg-indigo-600 text-white border-indigo-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        Convex (Converging, f &gt; 0)
                      </motion.button>
                      <motion.button
                        aria-label="Select Concave Lens"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setLensType('concave');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                          lensType === 'concave'
                            ? 'bg-indigo-600 text-white border-indigo-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        Concave (Diverging, f &lt; 0)
                      </motion.button>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 500 200" className="w-full h-auto" role="img" aria-label="Lens Optics Ray Diagram">
                        <line x1="20" y1="100" x2="480" y2="100" stroke="#475569" strokeWidth="1.5" />
                        <line x1="250" y1="20" x2="250" y2="180" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
                        {lensType === 'convex' ? (
                          <path d="M 250 20 Q 265 100 250 180 Q 235 100 250 20" fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" strokeWidth="2" />
                        ) : (
                          <path d="M 245 20 Q 255 100 245 180 L 255 180 Q 245 100 255 20 Z" fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" strokeWidth="2" />
                        )}

                        <circle cx={250 - lensFocalLength * 3} cy="100" r="3" fill="#38bdf8" />
                        <text x={250 - lensFocalLength * 3} y="115" fill="#38bdf8" fontSize="8" textAnchor="middle">F1</text>
                        <circle cx={250 + lensFocalLength * 3} cy="100" r="3" fill="#38bdf8" />
                        <text x={250 + lensFocalLength * 3} y="115" fill="#38bdf8" fontSize="8" textAnchor="middle">F2</text>

                        {(() => {
                          const objX = 250 - lensObjectDistance * 3;
                          const objTop = 100 - lensObjectHeight * 2;
                          return (
                            <g>
                              <line x1={objX} y1="100" x2={objX} y2={objTop} stroke="#f59e0b" strokeWidth="3" />
                              <polygon points={`${objX},${objTop - 4} ${objX - 4},${objTop + 4} ${objX + 4},${objTop + 4}`} fill="#f59e0b" />
                              <text x={objX} y="95" fill="#fbbf24" fontSize="8" textAnchor="middle">Object</text>
                            </g>
                          );
                        })()}

                        {lensSignedV !== 9999 && Math.abs(lensSignedV) < 150 && (
                          (() => {
                            const imgX = 250 + lensSignedV * 3;
                            const imgTop = 100 - lensImageHeight * 2;
                            const isVirtual = lensSignedV < 0;
                            return (
                              <g>
                                <line
                                  x1={imgX}
                                  y1="100"
                                  x2={imgX}
                                  y2={imgTop}
                                  stroke={isVirtual ? '#a855f7' : '#22c55e'}
                                  strokeWidth="3"
                                  strokeDasharray={isVirtual ? '4 2' : undefined}
                                />
                                <text x={imgX} y={imgTop > 100 ? imgTop + 10 : imgTop - 4} fill={isVirtual ? '#c084fc' : '#4ade80'} fontSize="8" textAnchor="middle">
                                  Image ({isVirtual ? 'Virtual' : 'Real'})
                                </text>
                              </g>
                            );
                          })()
                        )}
                      </svg>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-center text-xs">
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-slate-400">Object Distance (u)</div>
                          <div className="font-mono font-bold text-amber-400">{-lensObjectDistance} cm</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-slate-400">Image Distance (v)</div>
                          <div className="font-mono font-bold text-emerald-400">{lensSignedV.toFixed(1)} cm</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-slate-400">Magnification (m)</div>
                          <div className="font-mono font-bold text-sky-400">{lensMagnification.toFixed(2)}x</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-slate-400">Lens Power (P = 1/f)</div>
                          <div className="font-mono font-bold text-purple-400">{lensPowerDioptres} D</div>
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-slate-300">Object Distance (|u|):</span>
                            <span className="text-amber-400 font-bold">{lensObjectDistance} cm</span>
                          </div>
                          <input
                            type="range"
                            min={5}
                            max={60}
                            aria-label="Object Distance in cm"
                            value={lensObjectDistance}
                            onChange={e => {
                              setLensObjectDistance(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-amber-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-slate-300">Focal Length (|f|):</span>
                            <span className="text-indigo-400 font-bold">{lensFocalLength} cm</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={40}
                            aria-label="Focal Length in cm"
                            value={lensFocalLength}
                            onChange={e => {
                              setLensFocalLength(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-indigo-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── LAB 5: PRISM DISPERSION & EM SPECTRUM ── */}
                {currentSlide === 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center">
                      <svg viewBox="0 0 450 180" className="w-full max-w-lg h-auto" role="img" aria-label="Prism Dispersion Spectrum Diagram">
                        <polygon points="120,30 60,150 180,150" fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth="2" />
                        <line x1="10" y1="110" x2="85" y2="100" stroke="#ffffff" strokeWidth="4" />
                        <text x="25" y="95" fill="#e2e8f0" fontSize="10" fontWeight="bold">White Light</text>

                        <line x1="85" y1="100" x2="135" y2="92" stroke="#ef4444" strokeWidth="1.5" />
                        <line x1="135" y1="92" x2="320" y2="60" stroke="#ef4444" strokeWidth="2" />
                        <text x="330" y="64" fill="#ef4444" fontSize="9" fontWeight="bold">Red (~700 nm) - Least Bent</text>

                        <line x1="85" y1="100" x2="135" y2="95" stroke="#f59e0b" strokeWidth="1.5" />
                        <line x1="135" y1="95" x2="320" y2="75" stroke="#f59e0b" strokeWidth="2" />

                        <line x1="85" y1="100" x2="135" y2="98" stroke="#eab308" strokeWidth="1.5" />
                        <line x1="135" y1="98" x2="320" y2="90" stroke="#eab308" strokeWidth="2" />

                        <line x1="85" y1="100" x2="135" y2="101" stroke="#22c55e" strokeWidth="1.5" />
                        <line x1="135" y1="101" x2="320" y2="105" stroke="#22c55e" strokeWidth="2" />

                        <line x1="85" y1="100" x2="135" y2="104" stroke="#06b6d4" strokeWidth="1.5" />
                        <line x1="135" y1="104" x2="320" y2="120" stroke="#06b6d4" strokeWidth="2" />

                        <line x1="85" y1="100" x2="135" y2="107" stroke="#3b82f6" strokeWidth="1.5" />
                        <line x1="135" y1="107" x2="320" y2="135" stroke="#3b82f6" strokeWidth="2" />

                        <line x1="85" y1="100" x2="135" y2="110" stroke="#a855f7" strokeWidth="1.5" />
                        <line x1="135" y1="110" x2="320" y2="150" stroke="#a855f7" strokeWidth="2" />
                        <text x="330" y="154" fill="#a855f7" fontSize="9" fontWeight="bold">Violet (~400 nm) - Most Bent</text>
                      </svg>
                    </div>

                    <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Wavelength Scale: 10^{emWavelengthExp} m</span>
                        <span className="text-indigo-400 font-bold">
                          {emWavelengthExp <= -12
                            ? 'Gamma Rays (Nuclear)'
                            : emWavelengthExp <= -9
                            ? 'X-Rays (Medical)'
                            : emWavelengthExp <= -7
                            ? 'Ultraviolet & Visible Light'
                            : emWavelengthExp <= -4
                            ? 'Infrared (Thermal)'
                            : emWavelengthExp <= -2
                            ? 'Microwaves (Radar/Ovens)'
                            : 'Radio Waves (Telecom)'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={-14}
                        max={2}
                        aria-label="Electromagnetic wavelength order"
                        value={emWavelengthExp}
                        onChange={e => {
                          setEmWavelengthExp(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Stepper Navigation */}
            <div className="flex justify-between items-center pt-2">
              <motion.button
                aria-label="Previous Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs text-slate-400">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Next Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('whoosh');
                  }}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Enter Free Sandbox"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
                >
                  Enter Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">🔬 Free Physics Sandbox Mode</h2>
                <p className="text-xs text-slate-400">Experiment freely with all interactive parameters without grading.</p>
              </div>
              <motion.button
                aria-label="Ready for Calibration Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
              >
                Ready for Calibration Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Machine Sandbox */}
              <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-indigo-300">⚙️ Pulley & Machine Efficiency Sandbox</h3>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Pulleys (VR): {pulleyCount}</span>
                  <span>Friction: {frictionPercent}%</span>
                  <span>MA: {machineMA.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  aria-label="Sandbox Pulley Count"
                  value={pulleyCount}
                  onChange={e => setPulleyCount(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <input
                  type="range"
                  min={0}
                  max={50}
                  aria-label="Sandbox Friction Percent"
                  value={frictionPercent}
                  onChange={e => setFrictionPercent(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-400">
                  Max Lifted Load = {maxLoadLifted.toFixed(1)} N (Effort: {appliedEffort} N)
                </div>
              </motion.div>

              {/* Optics Sandbox */}
              <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-sky-300">🔍 Lens & Refraction Sandbox</h3>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Incidence: {incidenceAngle}°</span>
                  <span>Critical Angle: {criticalAngleDeg.toFixed(1)}°</span>
                  <span>Lens Power: {lensPowerDioptres} D</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={80}
                  aria-label="Sandbox Incidence Angle"
                  value={incidenceAngle}
                  onChange={e => setIncidenceAngle(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <input
                  type="range"
                  min={10}
                  max={50}
                  aria-label="Sandbox Lens Focal Length"
                  value={lensFocalLength}
                  onChange={e => setLensFocalLength(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-sky-400">
                  Image v = {lensSignedV.toFixed(1)} cm | Magnification = {lensMagnification.toFixed(2)}x
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CALIBRATION CHALLENGES ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Animated EM Wave Canvas Banner */}
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
              <canvas ref={canvasRef} width={600} height={35} className="w-full block" />
            </div>

            {/* Progress Header */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Challenge <span className="text-white font-bold">{currentChallenge + 1}</span> of{' '}
                <span className="text-white font-bold">{filteredChallenges.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-indigo-300"
                >
                  {challenge.competencyLevel}
                </motion.span>
                <span className="text-xs text-slate-400">Node: {challenge.nodeId}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-sky-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Challenge Box */}
            <motion.div
              layout
              className={`p-6 rounded-2xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                  : 'bg-slate-900 border-slate-800 text-slate-100'
              }`}
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
                {challenge.question}
              </h3>

              {/* MCQ Options */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
                challenge.options && (
                  <div className="space-y-3">
                    {challenge.options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={wrongShake ? { duration: 0.4 } : {}}
                        onClick={() => handleAnswer(idx)}
                        disabled={showExplanation || answerRevealed}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                          showExplanation && idx === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold shadow-md shadow-emerald-950'
                            : 'bg-slate-950/70 hover:bg-slate-800/80 border-slate-800 text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <span className="inline-block w-6 h-6 rounded-lg bg-slate-900 text-center leading-6 text-xs font-bold mr-3 text-indigo-300">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {showExplanation && idx === challenge.correctIndex && <span className="mr-1 text-emerald-400 font-bold">✓ </span>}
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* Numeric Challenge */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      aria-label="Enter numeric answer"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter calculated value"
                      className="flex-1 max-w-xs p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-indigo-500 outline-none"
                    />
                    <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                    <motion.button
                      aria-label="Submit Numeric Answer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(parseFloat(numericInput))}
                      disabled={!numericInput || showExplanation}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-600/30"
                    >
                      Submit Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Drag-Label Challenge */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        aria-label={`Draggable label: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-2 bg-indigo-600/90 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow-sm"
                      >
                        :: {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ borderColor: '#6366f1' }}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                      >
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Target Zone</span>
                        <span className="text-xs font-bold text-sky-400">
                          {droppedLabels[item.targetId] || 'Drop Here'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Verify All Dropped Targets"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs"
                  >
                    Verify All Targets
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Challenge */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3 pt-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-sm flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-xs font-bold text-indigo-300">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    aria-label="Verify Sequence Order"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs"
                  >
                    Verify Sequence
                  </motion.button>
                </div>
              )}

              {/* Construct Challenge */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4 pt-2">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add derivation term: ${part}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-indigo-200 font-mono"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 bg-indigo-950 border border-indigo-700 text-indigo-200 rounded-md text-xs font-mono flex items-center gap-2"
                      >
                        {part}
                        <motion.button
                          aria-label={`Remove part: ${part}`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          ×
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600 italic">Click derivation parts above to assemble formula</span>
                    )}
                  </div>

                  <motion.button
                    aria-label="Verify Assembled Proof"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs"
                  >
                    Verify Proof
                  </motion.button>
                </div>
              )}

              {/* Progressive Step-by-Step Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-indigo-950/40 rounded-xl border border-indigo-700/50 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                      Step-by-Step Physical Walkthrough
                    </h4>
                    <span className="text-xs text-slate-400">
                      Step {revealedSteps + 1} of{' '}
                      {challenge.explanation.split('. ').filter(s => s.trim()).length}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-slate-200">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim())
                      .slice(0, revealedSteps + 1)
                      .map((step, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-2.5 bg-slate-900/60 p-3 rounded-lg border border-slate-800"
                        >
                          <span className="w-5 h-5 rounded-full bg-indigo-600/50 text-indigo-200 text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <p className="leading-relaxed">{step}{!step.endsWith('.') && '.'}</p>
                        </motion.div>
                      ))}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                      <motion.button
                        aria-label="Show Next Step"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setRevealedSteps(s => s + 1);
                          audioManager.play('tap');
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <div />
                    )}

                    {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim()).length - 1 && (
                      <motion.button
                        aria-label="Proceed to Next Challenge"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Assessment →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: MISSION COMPLETION & MASTERY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/50 text-center space-y-4 shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6 }}
                className="inline-block p-4 bg-emerald-500/20 text-emerald-400 rounded-2xl text-4xl mb-1"
              >
                🏆
              </motion.div>
              <h2 className="text-3xl font-black text-white">Mission Calibration Complete!</h2>

              {/* Personalized Motivational Feedback Banner */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-xl border text-sm font-bold max-w-md mx-auto ${
                  errors === 0
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : errors <= 3
                    ? 'bg-sky-950/80 border-sky-500 text-sky-300'
                    : errors <= 7
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                    : 'bg-rose-950/80 border-rose-500 text-rose-300'
                }`}
              >
                {errors === 0 && '🌟 PERFECT SCORE! Outstanding physics mastery!'}
                {errors >= 1 && errors <= 3 && '👏 Great work! You have a solid conceptual grasp!'}
                {errors >= 4 && errors <= 7 && '💪 Good effort! A little more practice will solidify these concepts!'}
                {errors >= 8 && '🚀 Do not give up — You WILL get this with practice!'}
              </motion.div>

              {/* Spaced Repetition Schedule (SRS) Prominent Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 bg-indigo-950/80 rounded-2xl border-2 border-indigo-500/50 max-w-lg mx-auto shadow-xl space-y-2 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    <span>🧠</span> Spaced Repetition Memory Schedule
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/30 text-indigo-200 border border-indigo-400/40">
                    SRS Active
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-sm text-slate-300">Target Retention Interval:</span>
                  <span className="text-lg font-black text-emerald-400">
                    {errors === 0 ? 'Review in 7 Days' : errors <= 3 ? 'Review in 3 Days' : 'Review in 1 Day'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {errors === 0
                    ? 'Optimal retention achieved! Reviewing in 7 days consolidates this topic directly into long-term memory.'
                    : errors <= 3
                    ? 'Good recall! Reviewing in 3 days reinforces subtle edge cases and formula derivations.'
                    : 'Reinforcement required. Reviewing tomorrow prevents exponential memory decay.'}
                </p>
              </motion.div>

              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                You have validated all 10 core CISCE physics domains covering mechanical force multipliers, Snell\'s refraction laws, lens optics, and the electromagnetic spectrum.
              </p>

              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Final Mastery Score</div>
                  <div className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Mastery Level</div>
                  <div className="text-2xl font-black text-indigo-400 uppercase">{masteryLevel}</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Total Errors</div>
                  <div className="text-2xl font-black text-rose-400">{errors}</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Misconception Diagnostic Card */}
            {hitMisconceptions.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-4">
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span>⚠️</span> Specific Misconceptions Diagnosed:
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((mIdx, i) => {
                    const m = misconceptions[mIdx];
                    if (!m) return null;
                    return (
                      <motion.div key={i} whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                        <div className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</div>
                        <div className="text-emerald-300 font-semibold pt-1">✓ Correction: {m.correction}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Real World Mission Activity */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>📋</span> {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.02 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex gap-2">
                    <span className="font-bold text-indigo-400 shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="text-center">
              <motion.button
                aria-label="Revisit Laboratory and Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentSlide(0);
                  audioManager.play('whoosh');
                }}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/30"
              >
                Revisit Laboratory & Sandbox Mode ↺
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Calibration Step Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_PhysicsEfficiencyMachinesetaSim;